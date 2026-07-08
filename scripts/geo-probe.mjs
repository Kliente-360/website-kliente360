#!/usr/bin/env node
/**
 * Kliente 360 — GEO mention probe (rotina mensal).
 *
 * Roda a bateria de research/geo-mentions/prompts.json contra as APIs
 * com busca/grounding dos 4 engines e registra menção/citação da marca:
 *
 *   Engine      API                                    Env var
 *   Perplexity  api.perplexity.ai (sonar)              PERPLEXITY_API_KEY
 *   OpenAI      Responses API + web_search             OPENAI_API_KEY
 *   Gemini      generateContent + google_search        GEMINI_API_KEY
 *   Claude      Messages API + web_search server tool  ANTHROPIC_API_KEY
 *
 * Engine sem chave no ambiente → marcado "no-key" (não é erro).
 * Saída: merge em research/geo-mentions/<YYYY-MM>.json (campo engines
 * de cada probe + summary recalculado). Campos searchVisible/searchNotes
 * são preservados se já existirem no arquivo do mês.
 *
 * Uso:  node scripts/geo-probe.mjs [--month YYYY-MM] [--only P01,P02]
 *
 * Modelos padrão (override por env):
 *   OPENAI_MODEL     (default gpt-4o)
 *   GEMINI_MODEL     (default gemini-2.0-flash)
 *   ANTHROPIC_MODEL  (default claude-sonnet-5)
 *   PERPLEXITY_MODEL (default sonar)
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIR = join(ROOT, 'research', 'geo-mentions');

const args = process.argv.slice(2);
const argVal = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};
const month = argVal('--month')
  || new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }).slice(0, 7);
const only = argVal('--only')?.split(',') ?? null;

const battery = JSON.parse(readFileSync(join(DIR, 'prompts.json'), 'utf-8'));
const BRAND_RE = /kliente\s?360/i;
const DOMAIN = battery.domain;

// Instrução comum: resposta como o engine daria a um usuário final,
// sem viés — NÃO mencionamos a marca no prompt (mediria contaminação).
const wrap = (prompt) => prompt;

const detect = (text, urls) => ({
  mentioned: BRAND_RE.test(text || ''),
  cited: (urls || []).some((u) => (u || '').includes(DOMAIN)),
});

// ---------- engines ----------

async function probePerplexity(prompt) {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) return { skipped: 'no-key' };
  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.PERPLEXITY_MODEL || 'sonar',
      messages: [{ role: 'user', content: wrap(prompt) }],
    }),
  });
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  const urls = data.citations || data.search_results?.map((r) => r.url) || [];
  return detect(text, urls);
}

async function probeOpenAI(prompt) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { skipped: 'no-key' };
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      tools: [{ type: 'web_search' }],
      input: wrap(prompt),
    }),
  });
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const data = await res.json();
  // Responses API: output é lista de items; message.content[].text + annotations url_citation
  let text = '';
  const urls = [];
  for (const item of data.output || []) {
    for (const c of item.content || []) {
      if (c.text) text += c.text + '\n';
      for (const a of c.annotations || []) {
        if (a.url) urls.push(a.url);
      }
    }
  }
  return detect(text, urls);
}

async function probeGemini(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { skipped: 'no-key' };
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: wrap(prompt) }] }],
        tools: [{ google_search: {} }],
      }),
    },
  );
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const data = await res.json();
  const cand = data.candidates?.[0];
  const text = (cand?.content?.parts || []).map((p) => p.text || '').join('\n');
  const urls = (cand?.groundingMetadata?.groundingChunks || [])
    .map((c) => c.web?.uri || '')
    .filter(Boolean);
  return detect(text, urls);
}

async function probeClaude(prompt) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { skipped: 'no-key' };
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5',
      max_tokens: 1024,
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
      messages: [{ role: 'user', content: wrap(prompt) }],
    }),
  });
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const data = await res.json();
  let text = '';
  const urls = [];
  for (const block of data.content || []) {
    if (block.type === 'text') {
      text += block.text + '\n';
      for (const c of block.citations || []) if (c.url) urls.push(c.url);
    }
    if (block.type === 'web_search_tool_result') {
      for (const r of block.content || []) if (r.url) urls.push(r.url);
    }
  }
  return detect(text, urls);
}

const ENGINES = {
  perplexity: probePerplexity,
  chatgpt: probeOpenAI,
  gemini: probeGemini,
  claude: probeClaude,
};

// ---------- run ----------

const outPath = join(DIR, `${month}.json`);
const existing = existsSync(outPath)
  ? JSON.parse(readFileSync(outPath, 'utf-8'))
  : { period: month, probes: [] };

const byId = new Map(existing.probes.map((p) => [p.id, p]));

console.log(`📡 GEO probe — ${month}`);
const available = Object.entries(ENGINES)
  .filter(([name]) => {
    const envs = { perplexity: 'PERPLEXITY_API_KEY', chatgpt: 'OPENAI_API_KEY', gemini: 'GEMINI_API_KEY', claude: 'ANTHROPIC_API_KEY' };
    return !!process.env[envs[name]];
  })
  .map(([n]) => n);
console.log(`   engines com chave: ${available.length ? available.join(', ') : 'NENHUM (tudo vira no-key)'}`);

for (const probe of battery.probes) {
  if (only && !only.includes(probe.id)) continue;
  const row = byId.get(probe.id) || { ...probe, searchVisible: null, searchNotes: '' };
  row.lang = probe.lang; row.type = probe.type; row.prompt = probe.prompt;
  row.engines = row.engines || {};

  for (const [name, fn] of Object.entries(ENGINES)) {
    try {
      const r = await fn(probe.prompt);
      if (r.skipped) {
        row.engines[name] = row.engines[name]?.mentioned != null
          ? row.engines[name] // preserva resultado manual anterior
          : { mentioned: null, cited: null, notes: r.skipped };
      } else if (r.error) {
        row.engines[name] = { mentioned: null, cited: null, notes: r.error };
      } else {
        row.engines[name] = { mentioned: r.mentioned, cited: r.cited, notes: 'api' };
      }
    } catch (e) {
      row.engines[name] = { mentioned: null, cited: null, notes: `erro: ${e.message}` };
    }
  }
  byId.set(probe.id, row);
  const flags = Object.entries(row.engines)
    .map(([n, v]) => `${n}:${v.mentioned === null ? '–' : v.mentioned ? (v.cited ? '★' : '✓') : '✗'}`)
    .join(' ');
  console.log(`   ${probe.id} ${flags}`);
}

// summary
const probes = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
const flat = probes.flatMap((p) => Object.values(p.engines || {}));
const measured = flat.filter((e) => e.mentioned !== null);
const summary = {
  searchVisibility: existing.summary?.searchVisibility ?? null,
  mentionRate: measured.length ? +(measured.filter((e) => e.mentioned).length / measured.length).toFixed(3) : null,
  citationRate: measured.length ? +(measured.filter((e) => e.cited).length / measured.length).toFixed(3) : null,
  engineProbesMeasured: measured.length,
};

writeFileSync(outPath, JSON.stringify({
  period: month,
  ranAt: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }),
  note: existing.note || '',
  summary,
  probes,
}, null, 2) + '\n');

console.log(`✅ ${outPath}`);
console.log(`   mention rate: ${summary.mentionRate ?? 'n/d'} · citation rate: ${summary.citationRate ?? 'n/d'} · medições: ${summary.engineProbesMeasured}`);
