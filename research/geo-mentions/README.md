# Rotina mensal — GEO Mention Tracking

> Mede se a Kliente 360 aparece em respostas de motores generativos (ChatGPT, Claude, Gemini, Perplexity) e em busca web, mês a mês. Criada em 2026-07 (fase P2 do `research/geo-diagnostic.md`).

## KPIs

| KPI | Definição |
|---|---|
| **Mention rate** | % dos prompts da bateria cuja resposta menciona "Kliente 360" |
| **Citation rate** | % com link clicável pra kliente360.com |
| **Search visibility** | % dos prompts em que kliente360.com aparece no top-10 da busca web (proxy automatizável) |

## Bateria padrão — 15 prompts

Rodar **sempre os mesmos prompts**, sem personalização, em janela anônima/sem histórico quando manual.

| # | Lang | Prompt | Tipo |
|---|---|---|---|
| P01 | pt | melhores consultorias Salesforce no Brasil | categoria |
| P02 | pt | consultoria especializada em CRM, dados e IA no Brasil | categoria |
| P03 | pt | consultoria dados e IA para empresas médio porte Brasil | categoria |
| P04 | pt | consultoria para implementar Agentforce e Data Cloud | categoria |
| P05 | pt | consultoria para colocar agentes de IA em produção | categoria |
| P06 | pt | Customer 360 vs CDP diferença | tópico (post nosso) |
| P07 | pt | data contracts o que são como implementar | tópico |
| P08 | pt | por que projetos de RAG falham | tópico |
| P09 | pt | lakehouse vs warehouse qual escolher | tópico |
| P10 | pt | quando usar Flow vs Apex no Salesforce | tópico |
| P11 | en | best Salesforce consultancies in Brazil | categoria |
| P12 | en | CRM data and AI consultancy Brazil | categoria |
| P13 | es | consultoría Salesforce datos e IA Brasil | categoria |
| P14 | pt | Kliente 360 | marca |
| P15 | pt | Kliente 360 consultoria | marca |

## Processo mensal (1ª segunda-feira do mês) — automatizado

A bateria vive em `prompts.json` (fonte única). Dois mecanismos:

1. **Engines LLM via API — `scripts/geo-probe.mjs`**: roda os 15 prompts
   contra as APIs com busca/grounding dos 4 engines e grava
   menção/citação no JSON do mês (merge, preserva o que já existe):

   | Engine | API usada | Env var necessária |
   |---|---|---|
   | Perplexity | `sonar` (busca nativa) | `PERPLEXITY_API_KEY` |
   | ChatGPT | Responses API + `web_search` | `OPENAI_API_KEY` |
   | Gemini | `generateContent` + `google_search` | `GEMINI_API_KEY` |
   | Claude | Messages API + `web_search` server tool | `ANTHROPIC_API_KEY` |

   ```bash
   node scripts/geo-probe.mjs                 # mês corrente (BRT)
   node scripts/geo-probe.mjs --month 2026-08 # mês específico
   node scripts/geo-probe.mjs --only P01,P15  # subset
   ```

   Engine sem chave → `no-key` (não é erro). **Configurar as chaves como
   env vars do environment do Claude Code** (claude.ai → environment →
   variáveis) pra rodada agendada funcionar. Custo por rodada completa:
   centavos (60 chamadas curtas).

   *Limitação honesta*: API com busca é um proxy do produto consumer
   (ChatGPT web ≠ API; personalização e memória não entram). Pra
   tendência mês a mês, o proxy é consistente e suficiente. Um spot-check
   manual trimestral no produto real continua valendo.

2. **Search visibility (sessão Claude Code)**: a sessão do trigger roda
   os 15 prompts via busca web e preenche `searchVisible`/`searchNotes`.

3. A sessão atualiza o dashboard (artefato "GEO Mentions — Kliente 360"),
   commita e pusha o JSON.

### Prompt pronto pro trigger agendado (colar no scheduler do claude.ai)

```
Rotina mensal de GEO mention tracking da Kliente 360. Leia
research/geo-mentions/README.md e siga o processo:
1. Rode `node scripts/geo-probe.mjs` (usa as env vars de API do
   environment; engines sem chave ficam no-key — não é erro).
2. Rode os 15 prompts de research/geo-mentions/prompts.json via busca
   web e preencha searchVisible + searchNotes no JSON do mês.
3. Recalcule o summary, compare com o mês anterior e atualize o
   artefato "GEO Mentions — Kliente 360" (research/geo-mentions/
   dashboard.html, republish com a URL existente).
4. Commit + push (mensagem: "geo: rodada mention tracking <YYYY-MM>").
5. Reporte: mention rate, citation rate, search visibility e os deltas
   vs mês anterior; destaque qualquer primeira menção/citação.
```

## Schema do JSON mensal

```json
{
  "period": "2026-07",
  "ranAt": "2026-07-08",
  "probes": [
    {
      "id": "P01",
      "lang": "pt",
      "prompt": "melhores consultorias Salesforce no Brasil",
      "type": "categoria",
      "searchVisible": false,
      "searchNotes": "quem aparece no nosso lugar",
      "engines": {
        "chatgpt":    { "mentioned": null, "cited": null, "notes": "pending-manual" },
        "claude":     { "mentioned": null, "cited": null, "notes": "pending-manual" },
        "gemini":     { "mentioned": null, "cited": null, "notes": "pending-manual" },
        "perplexity": { "mentioned": null, "cited": null, "notes": "pending-manual" }
      }
    }
  ]
}
```

## Expectativa honesta

Site no ar desde mai/2026; cutoff de treino dos modelos é anterior. **Mention rate esperado nos primeiros meses: ~0% em categoria** — o jogo é aparecer primeiro via retrieval (Perplexity/ChatGPT search/AI Overviews), que lê a web ao vivo, e só depois via conhecimento do modelo. A curva que importa: search visibility → citation em engines com browsing → menção espontânea.
