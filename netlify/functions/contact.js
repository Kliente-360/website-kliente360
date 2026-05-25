/**
 * /netlify/functions/contact
 *
 * Recebe POST do form de contato da home, envia e-mail aos sócios via Resend
 * e (opcionalmente) cria um card no app de tasks do Felipe.
 *
 * Env vars necessárias (Netlify → Site settings → Environment variables):
 *   RESEND_API_KEY   → chave do Resend (https://resend.com/api-keys)
 *   CONTACT_FROM     → remetente verificado (ex: "Kliente 360 <contato@kliente360.com>")
 *   CONTACT_TO       → destinatário(s) separados por vírgula
 *                       (ex: "felipe@kliente360.com,outrosocio@kliente360.com")
 *   TASK_APP_URL     → opcional. URL do endpoint do app de tasks.
 *   TASK_APP_TOKEN   → opcional. Bearer token de autenticação no app.
 *   TASK_APP_HEADER  → opcional. Nome do header (default: "Authorization", valor "Bearer <TOKEN>").
 *                       Se o app usa header próprio (ex: X-API-Key), define aqui.
 */

const MAX_FIELD = 2000;

const escapeHtml = (s) => String(s ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const trim = (s) => String(s ?? '').trim().slice(0, MAX_FIELD);

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const sendEmail = async ({ name, email, company, message }) => {
  const to = (process.env.CONTACT_TO || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!to.length) throw new Error('CONTACT_TO env var não configurada.');
  const from = process.env.CONTACT_FROM || 'Kliente 360 <contato@kliente360.com>';

  const subject = `Novo lead — ${name}${company ? ` (${company})` : ''}`;
  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;color:#1d1d1f;max-width:560px;line-height:1.5">
      <h2 style="margin:0 0 16px;font-size:18px">Novo lead pelo site</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 12px 6px 0;color:#6e6e73">Nome</td><td><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6e6e73">E-mail</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding:6px 12px 6px 0;color:#6e6e73">Empresa</td><td>${escapeHtml(company)}</td></tr>` : ''}
      </table>
      ${message ? `<div style="margin-top:16px;padding:12px 16px;background:#f5f5f7;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>` : ''}
      <p style="margin-top:24px;color:#86868b;font-size:12px">Enviado via kliente360.com</p>
    </div>`;
  const text = [
    `Novo lead pelo site`,
    ``,
    `Nome: ${name}`,
    `E-mail: ${email}`,
    company ? `Empresa: ${company}` : null,
    message ? `\nMensagem:\n${message}` : null,
  ].filter(Boolean).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, reply_to: email, subject, html, text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${body}`);
  }
  return res.json();
};

const createTask = async ({ name, email, company, message }) => {
  const url = process.env.TASK_APP_URL;
  if (!url) return null; // opcional
  const token = process.env.TASK_APP_TOKEN;
  const headerName = process.env.TASK_APP_HEADER || 'Authorization';
  const headerValue = headerName.toLowerCase() === 'authorization' && token
    ? `Bearer ${token}`
    : token;

  const payload = {
    source: 'site-kliente360',
    title: `Lead: ${name}${company ? ` — ${company}` : ''}`,
    lead: { name, email, company: company || null, message: message || null },
    received_at: new Date().toISOString(),
  };
  const headers = { 'Content-Type': 'application/json' };
  if (headerValue) headers[headerName] = headerValue;

  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Task app ${res.status}: ${body}`);
  }
  return res.json().catch(() => ({}));
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'method_not_allowed' });

  let payload;
  try { payload = JSON.parse(event.body || '{}'); }
  catch { return json(400, { error: 'invalid_json' }); }

  // Honeypot — se preencheu o campo escondido, é bot. Retornamos OK sem fazer nada
  // pra não dar feedback ao spammer.
  if (trim(payload.website)) return json(200, { ok: true });

  const name    = trim(payload.name);
  const email   = trim(payload.email);
  const company = trim(payload.company);
  const message = trim(payload.message);

  // Validação mínima
  if (!name || !email) return json(400, { error: 'missing_required_fields' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: 'invalid_email' });

  // E-mail é o que importa pro sócio responder. Task é fire-and-forget — se falhar,
  // log no console (visível em Netlify Functions logs) mas não bloqueia o lead.
  try {
    await sendEmail({ name, email, company, message });
  } catch (err) {
    console.error('[contact] sendEmail failed:', err);
    return json(502, { error: 'email_failed' });
  }

  try {
    await createTask({ name, email, company, message });
  } catch (err) {
    console.error('[contact] createTask failed (não-bloqueante):', err);
  }

  return json(200, { ok: true });
};
