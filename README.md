# website-kliente360

Site institucional da **Kliente 360** — consultoria especializada em Salesforce, Data & Analytics e IA Aplicada.

**Live**: [kliente360.com](https://kliente360.com)

## O que é

Single-page em HTML, CSS e JS puros + seção de blog estática gerada de Markdown. Sem framework, sem runtime de servidor (exceto a function `/contact`). Build estático no Netlify a cada push em `main`.

Três idiomas (PT/EN/ES) com hreflang real. **Brand &amp; Design System v1.0** — guia definitivo em [`design-system/README.md`](design-system/README.md) (porta de entrada), companion narrativo em [`DESIGN.md`](DESIGN.md) e showcase visual em [`styleguide.html`](https://kliente360.com/styleguide.html).

## Estrutura

```
.
├── index.html                  # home single-page
├── pilares/<slug>/             # 3 pillar pages (salesforce, data, ai)
├── como-trabalhamos/           # página comercial
├── glossario/                  # 26+ termos filtráveis
├── blog/
│   ├── index.html              # listagem
│   ├── posts/                  # fonte Markdown (.md) + README editorial
│   └── *.html                  # gerados pelo build
├── en/, es/                    # variantes internacionalizadas
├── assets/
│   ├── css/   (tokens, reset, main)
│   ├── js/    (i18n, main, blog)
│   ├── img/   (logo, og dinâmica por post)
│   ├── fonts/ (Inter + JetBrains Mono self-hosted)
│   └── data/  (posts.json manifest)
├── netlify/functions/contact.js   # form de contato (Resend + task app)
├── scripts/build-blog.mjs         # MD → HTML × 3 idiomas + schemas + OG
├── design-system/                  # porta de entrada do Brand & Design System
├── research/                       # competitive brief, css audit
├── PLAN.md     DESIGN.md    EDITORIAL.md
└── netlify.toml   _headers   sitemap.xml   robots.txt
```

## Documentação canônica

| Doc | Escopo |
|---|---|
| [`PLAN.md`](PLAN.md) | Plano vivo: contexto, decisões, próximos passos, parking lot, histórico de sessões |
| [`design-system/README.md`](design-system/README.md) | **Porta de entrada do Brand &amp; Design System** — pra quem chega de fora e quer adotar o sistema em outro projeto |
| [`DESIGN.md`](DESIGN.md) | Companion narrativo do design system — tokens, primitivos, modificadores, anti-padrões |
| [`EDITORIAL.md`](EDITORIAL.md) | Plano editorial 01-52, fila de posts, state tracker de backlink-pass |
| [`blog/posts/README.md`](blog/posts/README.md) | Anatomia de post, frontmatter, routines (publicação + backlink-pass) |
| [`research/seo-competitive-brief.md`](research/seo-competitive-brief.md) | Brief competitivo (Indicium, Everymind, Sottelli) + quick wins ordenados |

## Como rodar local

```bash
npm install
npm run build      # gera blog/*.html × 3 idiomas + OG images + sitemap
npx serve .        # serve a raiz
```

Sem watch mode — re-rodar `npm run build` após editar `blog/posts/*.md`.

## Form de contato

`netlify/functions/contact.js` valida payload, aplica honeypot anti-spam, dispara e-mail via Resend e cria task no app interno (fire-and-forget).

Env vars necessárias (configurar no Netlify):

| Var | Descrição |
|---|---|
| `RESEND_API_KEY` | API key Resend com sending access |
| `CONTACT_FROM` | Remetente verificado, ex. `Kliente 360 <contato@kliente360.com>` |
| `CONTACT_TO` | Destinatários separados por vírgula (felipe@, rafael@…) |
| `TASK_APP_URL` | Endpoint Supabase `ingest-task` |
| `TASK_APP_TOKEN` | Bearer token do task app |
| `TASK_APP_RESPONSAVEL_ID` | UUID do sócio responsável padrão |

## Routines automatizadas

| Routine | Cadência | Trigger |
|---|---|---|
| **Publicação de blog** | Tue + Wed BRT (skip feriado BR + Aniversário SP) | Step 0 verifica precondições: dia válido, sem feriado, lote pendente em `EDITORIAL.md` |
| **Backlink-pass editorial** | Quinzenal (2ª e 4ª quinta) | Prompt em `.claude/agents/backlink-pass.md`; varre lote dos últimos 14 dias e insere links inversos em posts antigos |
| **Build Netlify** | A cada push em `main` | `npm run build` automático |

## Decisor

Felipe Silva — felipe@kliente360.com
