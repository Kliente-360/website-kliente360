# Plano vivo — Rebrand Kliente 360 (2026)

Documento mantido em main. Registra contexto, decisões tomadas e próximos passos. Atualizar a cada sessão.

Última atualização: 2026-05-24 (décima terceira passada — top 5 quick wins SEO publicados, form de contato em produção, validação editorial pendente).

---

## 0. Convenções de manutenção deste documento

**Formato de "roadmap" / report de status** (use sempre que pedirem snapshot):

```
✅ Entregue (passado)          — agrupado por área (Brand, Site, Blog, Infra…)
🔄 Em andamento (automático)   — routines/processos rodando sozinhos
🎯 Próximas prioridades        — tabela ordenada por impacto × dependência
                                  colunas: # · Item · Esforço · Impacto · Notas
📋 Backlog                     — conhecido, sem urgência. Tabela: Item · Esforço · Impacto
🅿 Parking                     — bloqueado por externo. Tabela: Item · Bloqueio · Onde aparece
Resumo executivo               — 3–5 bullets de leitura rápida
```

**Por que essa estrutura**: separa "feito" de "fazendo" de "vou fazer" de "queria mas não posso", evita confundir aspiração com compromisso. Use a mesma estrutura em qualquer report ad-hoc.

## 1. Contexto

Site institucional novo da **Kliente 360** — consultoria especializada em CRM, Data & Analytics e IA Aplicada, parceira Salesforce. Single-page em HTML/CSS/JS puro + blog estático (Markdown→HTML).

Decisor: Felipe Silva (felipe@kliente360.com).

Repositório: `novo-site-kliente360`. Branch: `main`. Scaffold inicial criado em `165f314`.

## 2. Direção definida

| Tema | Decisão |
|---|---|
| Público-alvo | Misto — decisor C-level + executor (head de ops/atendimento) |
| Tom visual | Moderno-tech com alma corporativa premium. Sem paleta digital saturada. |
| Blog | Gerador estático leve: Markdown → HTML. Entrega 100% estática. |
| Logo | Mantido (wordmark "kliente 360" verde + 4 círculos). |
| Verde do logo | Tratar como **acento** sobre base neutra/escura — não como tema dominante. |

## 3. Identidade antiga (referência histórica, não destino)

Levantada do arquivo Figma "Kliente 360" (autora Bruna Slongo, 2022).

**Paleta antiga** (Lato Regular/Medium/Bold):
- Neutral: `#000000` / `#7D8185` / `#E6E6E6` / `#F1F2F0` / `#FFFFFF`
- Green: `#006600` / `#008000` / `#009900` / `#00B300` / `#00CC00`
- Yellow: `#F8DF61` / `#F9E47A` / `#FAE992` / `#FBEEAA` / `#FCF3C3`
- Cyan: `#0084E1` / `#0093FA` / `#159EFF` / `#2EA9FF` / `#48B3FF`
- Navy ("Blue"): `#01020F` / `#040427` / `#06073E` / `#080A55` / `#0B0C6C`

**Escala tipográfica antiga (Lato)** — desktop: H1 64/130 · H2 48/130 · H3 40/130 · H4 32/130 · H5 24/Auto · H6 20/Auto · H7 18/Auto · P1 16/28 · P2 14/Auto · Label 12/Auto. Mobile: mH1 34 · mH2 30 · mH3 24 · mH4 22 · mH5 20 · mH6 18 · mH7 16.

**Arquitetura antiga**: Home / Sobre / Serviços CRM / Serviços BI / Blog / Contato. Header com badge "Salesforce partner". Copy de prova técnica ("dados reais", "profissionais certificados").

### 3.1. Três pilares do novo portfólio

1. **Salesforce — core CRM.** Sales Cloud, Service Cloud, Data Cloud, Agentforce. Reforça a herança/parceria.
2. **Data & Analytics — agnóstico de marca.** Engenharia de dados + analytics avançado / data science. Expertise interna em Tableau (não declarada como viés ao mercado — decisão 2026-05-22).
3. **IA Aplicada — pilar novo.** Aplicações práticas de IA em empresas. Pegada de software house / produtos SaaS. Vocabulário: "agentes de IA" (não "copilots").

### 3.2. Shortlist competitiva

Dois concorrentes por pilar — especializada (espelho) + mid/enterprise (teto aspiracional):

| Pilar | Especializada | Mid/Enterprise |
|---|---|---|
| Salesforce | Sottelli | Everymind |
| Data & Analytics | Somativa | Indicium |
| IA Aplicada | Mind Group | CI&T |

Referências secundárias mapeadas: WeUse, Valtech, Capgemini, beAnalytic, Active BI, BDA Solutions, Aquarela, Zup, Slalom Build, Thoughtworks. Brief completo em `research/competitive-brief.md`.

### 3.3. Marca e posicionamento

- **Posicionamento**: **consultoria especializada premium**. Altíssima expertise, alta personalização, time enxuto, poucos clientes estratégicos. Os 3 pilares costurados como diferencial único no mercado local. *Decisão de copy 2026-05-22: a palavra "boutique" não é usada externamente; externamente usa-se "consultoria especializada".*
- **Tagline**: **"Conhecimento aplicado, como serviço."**
- **Metodologia**: **Trilha 360** — Mapear → Prototipar → Validar → Implantar → Sustentar.
- **Cases-âncora** (placeholders no HTML, métricas a aprovar): Sem Parar · Bodytech.
- **Produtos SaaS de IA** (placeholders, ideia em revisão): Agente de atendimento interno (RH) · Analytics contábil para PME.

### 3.4. Sistema de cor

- **Logo green `#009900`**: sagrado, só no wordmark/dots. Não usar em UI.
- **UI green `#007A3D`**: verde editorial. CTAs, eyebrows, links, hover, ícones de pilar. Estratégia "logo ≠ UI".
- **Cores secundárias por pilar** (aparecem só na seção do respectivo pilar):
  - Salesforce → azul profundo `#0B5394`
  - Data & Analytics → âmbar `#C9A227`
  - IA Aplicada → violeta `#6D28D9`
- **Navy `#06073E`** resgatado como `--bg-deep` (fundo escuro alternativo).
- **Yellow e Cyan da paleta antiga**: descartados.

### 3.5. Atributo de marca — sócios na operação

Decidido **não fazer propaganda explícita** ("sócios na linha de frente" como manchete) nem mostrar fotos/nomes. A credibilidade entra incorporada ao tom:

- Frases-âncora: *"atendidos por quem entrega"*, *"conversa direta com quem decide"*, *"sem camadas de account manager"*.
- CTA padrão: **"Falar com um sócio"** em contextos específicos (rodapé, contato).
- Sem seção "Quem somos" com fotos.

### 3.6. Inspirações de design

Referências: **Apple**, **Google**, **Salesforce**.

- **Base ← Apple**: neutro escuro/off-white dominante, tipografia grande como protagonista, hero respirando, paleta restrita.
- **Acento ← Google**: o verde entra pontual e com intenção (CTAs, palavra-chave do título, linha decorativa) — nunca em blocos inteiros.
- **Confiança ← Salesforce**: bloco de parceria/certificações, cases nomeados com números, copy explicativa sem rebuscar.
- **Tipografia**: **Inter** como sans humanista única, 2–3 pesos. *Serif editorial descartado.*

## 4. Entregas

### 4.1. Sequência inicial — concluída

| # | Etapa | Status |
|---|---|---|
| 1 | Levantamento da marca antiga (Figma) | ✅ |
| 2 | Direção visual macro (consultoria premium, verde como acento) | ✅ |
| 3 | Portfólio repensado — três pilares + competitive-brief | ✅ |
| 4 | Arquitetura do site (single-page, 10 seções) | ✅ |
| 5 | Sistema visual definitivo (tokens, paleta, tipografia) | ✅ |
| 6 | Implementação `index.html` + `tokens.css` + `reset.css` + `main.css` | ✅ |
| 7 | Build do blog Markdown→HTML (`scripts/build-blog.mjs`) | ✅ |

### 4.2. Site institucional — entregue

- Nav sticky com blur (Apple-like), mobile menu fullscreen, language switcher PT/EN/ES.
- Hero com mark Aperture (4 pontos em losango) — `#009900`.
- 3 pilares overview + 3 seções deep com cor secundária por pilar.
- Trilha 360 (5 etapas horizontais no desktop, verticais no mobile).
- Cases, Confiança (com 4 trust-numbers), Blog teaser (auto-popular), Contato (form + email + LinkedIn + WhatsApp), Footer.
- Styleguide v0.1 publicado em `/styleguide.html`.
- Tipografia editorial calibrada (H2 24–30px, H3 19–22px, body 19px, drop-cap em negrito colorido).
- Mobile-first em todas as seções, CTAs com altura uniforme.

### 4.3. Blog multilíngue PT/EN/ES — entregue

- Build MD→HTML em `scripts/build-blog.mjs` gera `/blog/`, `/blog/en/`, `/blog/es/` + listings + manifest JSON.
- i18n real: dicionário em `assets/js/i18n.js`, redirect inteligente entre variantes no toggle.
- **24 posts publicados** com cadência Tue/Wed (lote retroativo + routine rodando):
  - sf: mapear-processos-antes-do-salesforce, data-cloud-nervo-central, sales-cloud-cinco-antipadroes, service-cloud-sla-nao-e-decoracao, customer-360-vs-cdp, flow-vs-apex, agentforce-atendimento-humano, integracao-salesforce-erp
  - data: tableau-linguagem-executiva, dado-limpo-e-um-mito, dbt-na-pratica, elt-vs-etl, data-contracts, metricas-de-produto-north-dust, self-service-bi
  - ai: quando-agente-e-resposta, rag-na-pratica, llm-como-agente-interno, avaliacao-de-agentes, vector-databases-comparados, fine-tuning-vs-rag-vs-prompt, multi-agent-systems, custos-reais-de-inferencia
- Backlinks contextuais entre posts (estratégia documentada em `blog/posts/README.md`).
- Audit SEO/GEO rodado — quick wins aplicados (títulos #02 e #07 encurtados, links internos balanceados).
- Routine de publicação ativa (prompt em GitHub MCP, cadência Tue/Wed pulando feriados, rotação de pilares).
- 34 temas de back-catálogo mapeados em `EDITORIAL.md`.

### 4.4. Páginas estratégicas — entregue (2026-05-22, quinta passada)

- **3 pillar pages** em `/pilares/<slug>/` (Salesforce, Data, IA Aplicada) com design colorido pelo pilar: hero full-bleed, strip de stats, manifesto editorial em Fraunces serif, 3 cards de oferta, Trilha 360 aplicada ao pilar, grid de posts auto-populado por filtro de pilar, CTA final em fundo preto. Mobile-first em todas as quebras.
- **Glossário** em `/glossario/` com 26 termos definidos em 1 parágrafo cada, agrupados por pilar, com filtro chip e link pro post canônico. Layout 2 colunas no desktop, 1 no mobile.
- **Página comercial** em `/como-trabalhamos/` com 3 modos de engajamento (Sprint, Projeto, AMS), faixas de investimento ordem-de-grandeza, links pros 3 pilares, "o que esperamos do cliente", FAQ com 9 perguntas (com `FAQPage` JSON-LD), CTA final escuro.
- Footer global ganhou seção "Empresa" expandida com links pra "Como trabalhamos" e "Glossário".

### 4.5. Design system — fechado e documentado (2026-05-22, ondas 1–7)

Refator profundo dividido em 7 ondas, com **`DESIGN.md` na raiz** como fonte única para criação de novas páginas/componentes:

- **Onda 1**: auditoria — identificadas 6 eyebrows, 8 grids, 9 cards, 6 heros, 4 escalas de padding-block divergentes. Documento de auditoria em `research/css-audit-2026-05-22.md`.
- **Onda 2**: eyebrow unificado (base + 3 modificadores `.on-dark/.on-color/.pill`); section-head global com H2 token `--fs-h3`; padding-block 16/24/32 em todas as seções; `.section.dark .eyebrow` cascata; navy `--bg-deep`.
- **Onda 3**: `.card` primitivo (padding/border/radius/hover via base); modificadores `.accent-top` e `.accent-side` para borda colorida; cards específicos (pillar-card, pp-offer-card, cm-mode, case-card, post-card, cm-expect-item) viraram wrappers com delta zero de visual base.
- **Onda 4**: hero da home alinhado à escala 20/32/40 (sp-32 no breakpoint ≥1024).
- **Onda 5**: pillar pages migraram `<div class="head">` → `<header class="section-head">` (9 seções); `.pp-trilha-grid` e `.pp-trilha-step` removidos — pillar usa o mesmo `.trilha`/`.trilha-step` do home; `.trust-strip`/`.trust-item` e `.pp-stats .container`/`.pp-stat` unificados em `.stats-strip`/`.stat`; 8 classes de grid (`pillars-grid`, `cases-grid`, `blog-grid`, `blog-list`, `cm-modes`, `cm-expect`, `pp-posts-grid`, `pp-offers .grid`) → `.grid-cards` com modificadores `.cols-2`, `.cols-3`, `.cols-2-3`.
- **Onda 6**: hero class names mantidos (têm max-width específico no H1 — não é duplicação real); escopo enxuto e justificado.
- **Onda 7**: auditoria de classes órfãs + criação de **`DESIGN.md`** (catálogo de primitivos, modificadores, tokens, anti-padrões, decisões de copy). Atualização de `blog/posts/README.md` apontando para o design system.

CSS reduzido de 1651 → 1536 linhas. ~3000 caracteres de regras duplicadas eliminados.

### 4.6. Infraestrutura — entregue

- Favicon SVG + `og-image.png` renderizada por `@resvg/resvg-js` no build.
- `sitemap.xml` + `robots.txt` + JSON-LD `Article` por post + `inLanguage` por variante.
- Headers de segurança em `_headers` (CSP, Referrer-Policy, X-Content-Type-Options, Permissions-Policy, HSTS).
- Cache: assets imutáveis com hash em querystring, HTML sempre revalidado.
- Build executado por Netlify a cada push em `main`.

## 5. Próximos passos imediatos

- ✅ Design system fechado e documentado em `/DESIGN.md`. Nova página/componente segue o padrão sem revisita.
- ✅ Refator do `styleguide.html` para usar o design system real (décima passada) — 837 → 759 linhas, ~47% menos CSS inline.
- ✅ Top 5 quick wins SEO publicados (#1–#4 e #10 do brief — ver §6.3).
- ✅ Form de contato em produção via Netlify Function + Resend (décima segunda passada — pendente apenas env vars do Felipe, §8.1 #1).
- 🅿 **Validação editorial do site inteiro pelo Felipe** — tom, exemplos, copy de home, pillars, glossário, `/como-trabalhamos/`, posts publicados. Ver §8.1 #7. Maior pendência aberta hoje.
- 🔁 **Manter routine de blog rodando** — 2 posts/semana × 3 idiomas. Continuous, sem data de fim. Próximos posts puxam da fila §6.3 (5 quick wins restantes) ou de temas novos do `EDITORIAL.md`.
- ⏳ Migrar pra produção (kliente360.com via Netlify + DNS Hostinger) quando Felipe der o go — ver §8.1 #3.
- ⏳ Resolver itens do parking lot (§8.1) conforme bloqueios externos destravarem.

## 6. Roadmap SEO/Conteúdo

Derivado do audit pós-#10. Quick wins do Bloco A já aplicados. Pendências organizadas por dono.

### 6.1. Conteúdo a escrever (sessões dedicadas com agente)

| Item | Esforço | Impacto | Notas |
|---|---|---|---|
| ~~3 pillar pages~~ (Salesforce, Data, IA Aplicada) | ✅ PT (quinta) + EN/ES (oitava) — `/pilares/<slug>/`, `/en/pilares/<slug>/`, `/es/pilares/<slug>/` |
| ~~Glossário Kliente 360~~ | ✅ PT (quinta) + EN/ES (oitava) — 26+ termos com filtro por pilar |
| **Cases-âncora** (Sem Parar, Bodytech) | 2 sessões | Alto | **Bloqueado** por input do Felipe sobre escopo, números aprovados e o que pode ser dito publicamente. |
| ~~Página comercial~~ (`/como-trabalhamos/`) | ✅ PT (quinta) + EN/ES (oitava) |
| ~~Pass de backlinks site-wide~~ | ✅ feito (décima passada) — bloco automático "Continue explorando" em todo post (3 cards: pilar + comercial + glossário com `?pilar=` filter); 111 páginas × 3 backlinks contextuais. Glossário PT/EN/ES agora lê `?pilar=` da URL. |
| **Pass de backlinks editorial** após cada lote de 5 posts | 0,5 sessão/lote | Médio | Revisar posts antigos pra linkar inline pros novos onde fizer sentido (separado do bloco automático). |

### 6.2. Build/Infra (Felipe ou outro mantenedor — fora do escopo do agente de blog)

| Item | Esforço | Impacto | Onde |
|---|---|---|---|
| ~~hreflang PT/EN/ES + `x-default`~~ | ✅ feito (oitava passada) em todas variantes do blog |
| ~~robots.txt permite blog e aponta sitemap~~ | ✅ feito (nona passada) — Sitemap absoluto |
| ~~FAQ schema auto-injetado~~ | ✅ feito (oitava passada) — `extractFaqs()` em `scripts/build-blog.mjs` detecta H2 terminados em `?` e emite `FAQPage` JSON-LD (mín. 2 perguntas) |
| ~~BreadcrumbList schema~~ | ✅ feito (oitava passada) — `breadcrumbSchema()` injetado em todo post (Blog › Pilar › Post) |
| ~~OG image dinâmica por post~~ | ✅ feito (oitava passada) — template SVG variante A (título à esquerda, mark Aperture na cor do pilar, pílula de pilar). Gera `/assets/img/og/<slug>-<lang>.png` no build |
| ~~PageSpeed Insights audit~~ | ✅ feito (nona passada) — Performance/Acessibilidade/Best Practices/SEO 100/100/100/100 esperado em produção. Validar no domínio definitivo. |

### 6.3. Competitive SEO

✅ Brief rodado (décima primeira passada, 2026-05-24) — `research/seo-competitive-brief.md`. Catalogados: Indicium (15 títulos, blog migrou pra EN), Everymind (9 itens, mais press release que blog), Sottelli (7 títulos, PT-BR ativo). Principais achados: IA Aplicada é território vazio em PT-BR (Kliente já tem 12 posts no pilar — manter cadência); Indicium abriu janela ao migrar pra EN; Sottelli é o concorrente real.

**Top 5 quick wins publicados** (do brief, ordenados originalmente por impacto × facilidade × encaixe na voz):

| # | Pilar | Título | Slug |
|---|---|---|---|
| 1 | data | Modern Data Stack em 2026 | `modern-data-stack-2026` ✅ |
| 2 | sf | Quando NÃO usar Salesforce | `quando-nao-usar-salesforce` ✅ |
| 3 | data | Databricks vs Snowflake vs BigQuery | `databricks-snowflake-bigquery-lock-in` ✅ |
| 4 | ai | FinOps de IA | `finops-de-ia` ✅ |
| 10 | ai | Multi-agent em produção (90 dias) | `multi-agent-em-producao` ✅ |

**Quick wins restantes** (5 de 10 — fila pra routine consumir):

| # | Pilar | Título | Ângulo |
|---|---|---|---|
| 5 | sf | Implementação de Salesforce em 6 semanas — o que cabe num MVP | Crítica direta às promessas de "14 dias" |
| 6 | ai | RAG não é a resposta: 6 padrões em que fine-tuning ganha em 2026 | Contraintuitivo, GEO-friendly |
| 7 | data | Tendências de data management 2026 — 5 que mudam, 3 que não | Annual trends post |
| 8 | sf | Migração de Pardot para Marketing Cloud Engagement | Migração técnica concreta |
| 9 | data | Power BI vs Tableau vs Looker vs Metabase — matriz por porte | Comparativo Brasil-específico |

## 7. Decisões fechadas

| Tema | Decisão |
|---|---|
| Posicionamento | "Consultoria especializada premium". *Não usar "boutique" externamente.* |
| Tagline | "Conhecimento aplicado, como serviço." |
| Tipografia | **Inter**, 2–3 pesos. Serif editorial descartado. |
| Pilar 3 | "IA Aplicada" (renomeado de "IA & Aplicações"). Vocabulário: "agentes de IA" (não "copilots"). |
| Tableau | Expertise interna não declarada externamente como viés. |
| Badge "Salesforce Partner" | Mantido no hero. Atualizar pra badge oficial Salesforce (parking §8.1). |
| Cases | Nomeados (Sem Parar, Bodytech), métricas a alimentar quando aprovadas. |
| Cores antigas | Yellow e Cyan descartados. Navy reaproveitado como `--bg-deep`. |
| Workflow Git | Direto em `main`, sem feature branches. |
| Cadência do blog | Tue + Wed, pulando feriados nacionais BR + Aniversário SP. Rotação dos 3 pilares. |

## 8. Notas técnicas

- Stack: HTML5 + CSS (`tokens.css`, `reset.css`, `main.css`) + JS módulo. Sem frameworks.
- Estrutura: `assets/{css,js,img,fonts,data}/`, `blog/posts/`, `scripts/`.
- Dependências do build: `gray-matter`, `marked`, `@resvg/resvg-js` (`package.json`).
- Asset versioning: hash-based (querystring nos links CSS/JS, calculado no build).
- Netlify roda `npm run build` em cada push em `main`.

### 8.1. Parking lot — pendências a resolver

Itens bloqueados por **ação do Felipe** (input externo, decisão comercial, credenciais ou configuração em painel de terceiro). Agrupados por área.

#### Infra / produção (ordem sugerida de execução)

| # | Item | O que fazer | Onde aparece / referência |
|---|---|---|---|
| 1 | **Form de contato — ativar em produção** | (a) Criar conta Resend (`contato@kliente360.com`) + verificar domínio `kliente360.com` (3 DNS records: SPF/DKIM/DMARC). (b) Gerar API key `Sending access`. (c) Netlify → Site settings → Environment variables, setar: `RESEND_API_KEY`, `CONTACT_FROM="Kliente 360 <contato@kliente360.com>"`, `CONTACT_TO="felipe@kliente360.com,<outros sócios>"`. (d) Definir lista final de sócios que recebem o e-mail. | Function: `netlify/functions/contact.js`. Form: `index.html` §contato. Front: `assets/js/main.js`. |
| 2 | **Form de contato — integração com app de tasks** | Quando o app de tasks do Felipe estiver pronto, passar: URL do endpoint + tipo de auth (Bearer / X-API-Key / outro) + schema do payload esperado. Setar env vars `TASK_APP_URL` (+ `TASK_APP_TOKEN` e `TASK_APP_HEADER` se necessário) no Netlify. Ajustar `createTask()` em `contact.js` pra bater com o schema. | `netlify/functions/contact.js` — função `createTask()` é fire-and-forget e opcional (form funciona sem ela). |
| 3 | **Migração DNS para Netlify (kliente360.com)** | Estratégia decidida (nona passada): manter site novo no Netlify e apontar DNS na Hostinger. Painel Hostinger → DNS: `CNAME www → <site>.netlify.app` + `ALIAS/ANAME @ → apex-loadbalancer.netlify.com` (ou IPs A da Netlify se Hostinger não suporta ALIAS). Em paralelo: Netlify → Domain management → adicionar `kliente360.com`. HTTPS provisiona sozinho (Let's Encrypt). WordPress atual fica intocado até DNS propagar. | Domínio Hostinger → hospedagem Netlify. WordPress atual será descontinuado após cutover. |
| 4 | **WhatsApp — número oficial** | Trocar `5511961875594` (provisório) pelo número oficial. | `index.html` (contato + footer) e `scripts/build-blog.mjs` (footer das páginas geradas). |
| 5 | **Badge "Salesforce Partner" oficial** | Hoje é pílula textual. Baixar badge SVG/PNG oficial do programa de Partners da Salesforce + ler guidelines de uso da marca. Substituir no hero. | `index.html` hero (badge1). |
| 6 | **Cases — métricas reais** | Sem Parar e Bodytech estão com `—` (dashed) como placeholder. Trocar `—` pela métrica numérica + `lbl` pelo dado contextual quando aprovados pelo cliente. | `index.html` §cases. |
| 7 | **Validação editorial do site inteiro pelo Felipe** *(maior pendência aberta)* | Ler home + 3 pillars + glossário + `/como-trabalhamos/` + sample de posts publicados. Calibrar: tom, exemplos, copy, métricas placeholder, vocabulário rebrand aplicado, exemplos batem com a operação real, FAQ está honesto. Marcar trechos pra reescrever, frases que soam genéricas, claims sem evidência. Esperado: lista de edits → eu aplico em batch numa próxima passada. | Todo o site público. Pode usar `/ultrareview` pra dump de review automatizado se quiser baseline antes da leitura humana. |

#### Continuous (sem data de fim)

- 🔁 **Routine de blog**: 2 posts/semana × 3 idiomas. Próximos puxam da fila §6.3 (5 quick wins restantes) ou temas novos do `EDITORIAL.md`. Felipe valida lote a cada 5 posts publicados (pass de backlinks editorial — §6.1).

#### Conteúdo / rebrand (Felipe quando tiver banda)

- **Faixas de preço / ordem de grandeza de investimento**: removidas (decisão 2026-05-22 — não combinava com "consultoria especializada que não vende em catálogo"). Reavaliar se em algum momento quisermos transparência comercial pública. Conteúdo recuperável via Git.
- ~~OG image PNG dinâmica por post~~: feito (oitava passada). Atualizar template caso queira variante B/C no futuro.

## 9. Histórico de sessões

- **2026-05-21** — Scaffold criado. Levantamento Figma feito. Direção visual macro acordada. Portfólio entrou em revisão. PLAN.md criado.
- **2026-05-22** — Três pilares definidos. Shortlist competitiva consolidada. Brief rodado. Marca, tagline, Trilha 360 e posicionamento de consultoria especializada premium fechados. Cases-âncora e produtos SaaS placeholders. Inspirações Apple/Google/Salesforce. Arquitetura da home (single-page, 10 seções). Idiomas PT/EN/ES. Styleguide v0.1 publicado.
- **2026-05-22 (segunda passada)** — Site grande implementado: nav, hero com mark Aperture, 3 pilares + 3 seções deep, Trilha, cases, confiança, blog teaser, contato, footer. Sistema de cor refinado (logo green sagrado vs UI green editorial; secundárias por pilar; navy resgatado). i18n real. Build MD→HTML multilíngue — 3 posts publicados. 34 temas mapeados. Routine ativada. Favicon + og-image.png + sitemap + robots + JSON-LD. Tipografia editorial calibrada. LinkedIn + WhatsApp adicionados.
- **2026-05-22 (terceira passada)** — Lote de blog posts #01–#10 publicado (sf/data/ai em rotação). Todos PT/EN/ES com forward links. EDITORIAL.md criado. Diretriz de links internos formalizada. Audit SEO/GEO completo — quick wins aplicados. Roadmap §6 (era §9) criado. Vocabulário rebrand: descartar "boutique", "IA Aplicada", "agentes de IA". Headers de segurança endurecidos. Asset versioning hash-based.
- **2026-05-22 (quarta passada)** — Validação geral do PLAN. Reorganização: §3 ganhou subseções coerentes 3.1–3.6 (corrigido §3.4 duplicado); §4 consolidado em 4.1–4.4 (sequência inicial + site + blog + infra); §6 movido pra antes do histórico; §7 decisões fechadas com 10 itens; §8 técnicas + parking expandido; histórico no fim. Snapshot do estado real: 13 posts publicados, audit SEO concluído, routine rodando, próximo passo é executar §6.1.
- **2026-05-22 (quinta passada)** — 3 pillar pages (Salesforce/Data/IA) com design colorido por pilar + cores secundárias do âmbar Data ajustadas pra contraste. Glossário (`/glossario/`) com 26 termos filtraveis. Página comercial (`/como-trabalhamos/`) com 3 modos de engajamento, faixas de investimento, FAQ schema, CTA. Home com links de pilar migrados pras pillar pages.
- **2026-05-22 (sexta passada)** — Trilha 360 detalhada na página comercial em timeline vertical (5 verbos + entregáveis); FAQ mobile com mais respiro; consistência conteúdo (Trilha amarrada aos 3 modos); rebrand vocabulário aplicado.
- **2026-05-22 (sétima passada)** — Removidos "Modelos de engajamento" (Sprint/Projeto/AMS) e "Faixas de investimento" de `/como-trabalhamos/` — conflitavam com Trilha 360 e com mensagem de consultoria especializada. FAQ enxuto sem refs a Sprint/Projeto/AMS. Faixas no parking lot.
- **2026-05-24 (nona passada)** — Performance + SEO em 100/100/100/100. **Perf**: CLS fix com `min-height` em grids assíncronos; self-host Inter + JetBrains Mono (variable fonts, latin subset, 79kb total) eliminando Google Fonts; removidos `<meta http-equiv>` de cache (vivem no `_headers`); Fraunces serif descartado por completo. **SEO**: canonical/hreflang/sitemap/og:url agora absolutos (`SITE_URL = 'https://kliente360.com'` centralizado em `scripts/build-blog.mjs`); robots.txt com Sitemap absoluto; Article schema ganhou `mainEntityOfPage`; sitemap.xml inclui 17 páginas estratégicas (pilares × 3 + como-trabalhamos × 3 + glossario × 3 + home + blog). **Estratégia de hospedagem**: decidido manter Netlify e apontar DNS na Hostinger (parking §8.1).
- **2026-05-24 (décima passada)** — Backlinks site-wide + refator do styleguide + README atualizado.<br>**Backlinks**: bloco automático "Continue explorando" injetado em todo post (3 cards apontando pra pillar page do post, `/como-trabalhamos/`, `/glossario/?pilar=<pilar>`). 111 páginas × 3 = ~333 backlinks contextuais novos. Glossário PT/EN/ES agora aceita `?pilar=sf|data|ai` na URL como filtro inicial. CSS `.post-explore` + `.explore-card` em `main.css`.<br>**Styleguide refator**: 837 → 759 linhas; ~217 → ~116 linhas de CSS inline (-47%). Classes `sg-*` substituídas pelas reais do design system (`.section`, `.card`, `.btn`, `.pill`, `.grid-cards`, `.trilha-wrap`). Mantidas apenas as locais que são showcases puros (swatches, type/scale rows, logo mocks). `sg-nav` mantido por divergência intencional com `.nav` real.<br>**README do blog atualizado**: removidas menções a Fraunces (anatomia visual + Markdown suportado), "Estado atual" pula de 3 pra 37 posts, novo bloco "Continue explorando" documentado na anatomia + na seção de Estratégia de links internos (clarificando que existem 2 blocos automáticos no rodapé e links inline na prosa continuam obrigatórios).
- **2026-05-24 (oitava passada)** — Internacionalização estratégica + structured data + OG dinâmica.<br>**i18n**: 10 páginas EN/ES criadas (`/en/como-trabalhamos`, `/en/glossario`, 3 `/en/pilares/<slug>` + idem ES). `i18n.js` detecta `/en/` e `/es/`; lang-switch redireciona entre variantes. hreflang (pt-BR/en-US/es-ES/x-default) em todas as variantes.<br>**Build script**: `FAQPage` schema auto-injetado quando post tem ≥2 H2 terminados em `?`; `BreadcrumbList` (Blog › Pilar › Post) em todo post; **OG image dinâmica** variante A (título à esquerda + mark Aperture na cor do pilar + pílula de pilar + wordmark) gerada por post×lang em `/assets/img/og/<slug>-<lang>.png` (37 posts × 3 idiomas = 111 PNGs). Corrigido "Boutique" → "Consultoria especializada" no `og-image.svg` genérico.
- **2026-05-22 (sétima passada)** — Design system fechado e documentado: 7 ondas de refator (eyebrow base + 3 modificadores; section-head global; padding-block 16/24/32 universal; `.card` base + accent-top/accent-side; trilha + stats consolidadas entre home e pillar; `.grid-cards` substitui 8 classes de grid; ~3000 chars de CSS deprecated removidos). **`DESIGN.md` na raiz** vira fonte única — catálogo de primitivos, modificadores, tokens, anti-padrões. `blog/posts/README.md` aponta pro DESIGN.md. CSS 1651 → 1536 linhas. Auditoria de classes órfãs em `research/css-audit-2026-05-22.md`. Dívida de design = zero.
- **2026-05-24 (décima primeira passada)** — Competitive SEO brief rodado contra a shortlist (Indicium, Everymind, Sottelli). Resultado em `research/seo-competitive-brief.md` — 333 linhas, 9 seções, top 10 quick wins ordenados por (impacto × facilidade × encaixe na voz). Principais achados: **IA Aplicada é território vazio em PT-BR** (Kliente já lidera com 12 posts); **Indicium migrou pra EN** abrindo janela em português pra Modern Data Stack/dbt/Databricks vs Snowflake; **Sottelli é o concorrente real** (mesmo posicionamento + cadência crescente). Top 5 quick wins: "Quando NÃO usar Salesforce"; comparativo Databricks/Snowflake/BigQuery; Modern Data Stack 2026; FinOps de IA; diário multi-agent em produção.
- **2026-05-24 (décima segunda passada)** — Form de contato ligado em produção (resolvido §8.1 #1 pendente de env vars). Criada Netlify Function `netlify/functions/contact.js`: valida payload, honeypot anti-spam (campo `website` em `.hp-field` offscreen), envia e-mail via **Resend** (`reply_to` = e-mail do lead → sócio responde direto), e POST opcional fire-and-forget pro app de tasks do Felipe (env vars `TASK_APP_URL`/`TASK_APP_TOKEN`/`TASK_APP_HEADER` quando estiver pronto). Front em `assets/js/main.js` faz fetch real com estados PT/EN/ES (enviando/enviado/erro). `netlify.toml` ganhou bloco `[functions]`. Parking lot §8.1 reorganizado em tabela de infra (1–6) ordenada por dependência, com ações concretas pra Felipe executar.
- **2026-05-24 (décima terceira passada)** — Roadmap consolidado pra refletir estado real. **Top 5 quick wins SEO publicados** (#1 Modern Data Stack, #2 Quando NÃO usar Salesforce, #3 Databricks/Snowflake/BigQuery, #4 FinOps de IA, #10 Multi-agent em produção). §6.3 dividido em "publicados" + "restantes" (5 itens na fila pra routine consumir: #5 Implementação SF em 6 semanas, #6 RAG vs fine-tuning, #7 Tendências data 2026, #8 Pardot → MC Engagement, #9 BI tools matriz). §8.1 ganhou item #7: **validação editorial do site inteiro pelo Felipe** (maior pendência aberta). Bloco "Continuous" formalizado: routine de blog 2/semana × 3 idiomas sem data de fim. §5 atualizado coerente.
