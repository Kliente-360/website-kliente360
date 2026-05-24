# Plano vivo — Rebrand Kliente 360 (2026)

Documento mantido em main. Registra contexto, decisões tomadas e próximos passos. Atualizar a cada sessão.

Última atualização: 2026-05-22 (sétima passada — design system fechado, **`DESIGN.md` é fonte única**).

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
- ⏳ Validar conteúdo de pillar pages, glossário e comercial em produção (tom, exemplos, calibração de copy).
- ⏳ Acompanhar a routine continuar publicando 2 posts/semana.
- ⏳ Resolver itens do parking lot (§8.1) conforme bloqueios externos destravarem.
- ⏳ Refator do `styleguide.html` para usar o design system real (em vez de CSS inline isolado) — não bloqueante, mas vira showcase mais útil.

## 6. Roadmap SEO/Conteúdo

Derivado do audit pós-#10. Quick wins do Bloco A já aplicados. Pendências organizadas por dono.

### 6.1. Conteúdo a escrever (sessões dedicadas com agente)

| Item | Esforço | Impacto | Notas |
|---|---|---|---|
| ~~3 pillar pages~~ (Salesforce, Data, IA Aplicada) | ✅ PT (quinta) + EN/ES (oitava) — `/pilares/<slug>/`, `/en/pilares/<slug>/`, `/es/pilares/<slug>/` |
| ~~Glossário Kliente 360~~ | ✅ PT (quinta) + EN/ES (oitava) — 26+ termos com filtro por pilar |
| **Cases-âncora** (Sem Parar, Bodytech) | 2 sessões | Alto | **Bloqueado** por input do Felipe sobre escopo, números aprovados e o que pode ser dito publicamente. |
| ~~Página comercial~~ (`/como-trabalhamos/`) | ✅ PT (quinta) + EN/ES (oitava) |
| **Pass de backlinks dedicado** após cada lote de 5 posts | 0,5 sessão/lote | Médio | Revisar posts antigos pra linkar novos onde fizer sentido. |

### 6.2. Build/Infra (Felipe ou outro mantenedor — fora do escopo do agente de blog)

| Item | Esforço | Impacto | Onde |
|---|---|---|---|
| **Confirmar hreflang** entre PT/EN/ES + `x-default` | 30 min | Médio | `scripts/build-blog.mjs` — injetar `<link rel="alternate" hreflang="...">` no `<head>` de cada variante |
| **Verificar robots.txt** permite `/blog/*`, `/blog/en/*`, `/blog/es/*` e o sitemap | 5 min | Crítico se errado | raiz |
| ~~FAQ schema auto-injetado~~ | ✅ feito (oitava passada) — `extractFaqs()` em `scripts/build-blog.mjs` detecta H2 terminados em `?` e emite `FAQPage` JSON-LD (mín. 2 perguntas) |
| ~~BreadcrumbList schema~~ | ✅ feito (oitava passada) — `breadcrumbSchema()` injetado em todo post (Blog › Pilar › Post) |
| ~~OG image dinâmica por post~~ | ✅ feito (oitava passada) — template SVG variante A (título à esquerda, mark Aperture na cor do pilar, pílula de pilar). Gera `/assets/img/og/<slug>-<lang>.png` no build |
| **Rodar PageSpeed Insights** em 2–3 posts típicos | 15 min | Médio | Calibrar Core Web Vitals reais |

### 6.3. Competitive SEO (futuro)

Rodar competitive-brief específico de SEO contra Indicium, Everymind e Sottelli (shortlist §3.2 que mantêm blog ativo). Identificar keyword overlap e gaps.

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

- **Faixas de preço / ordem de grandeza de investimento**: removidas do site (`/como-trabalhamos/` não fala mais sobre Sprint/Projeto/AMS nem números). Decisão 2026-05-22: não combinava com a mensagem de "consultoria especializada que não vende em catálogo". Reavaliar se em algum momento quisermos transparência comercial pública. Conteúdo removido pode ser recuperado via Git em commit `[antes desta passada]`.

- **WhatsApp**: número `5511961875594` é provisório. Trocar pelo número oficial quando definido. Aparece em `index.html` (Contato + footer) e `scripts/build-blog.mjs` (footer das páginas geradas).
- **Badge "Salesforce Partner"**: pílula textual hoje. Trocar pelo badge oficial recomendado pelo branding Salesforce (SVG/PNG oficial + requisitos de uso da marca).
- **Cases com métricas reais**: Sem Parar e Bodytech como placeholders dashed em `index.html`. Trocar `—` pela métrica e o `lbl` pelo dado quando aprovados.
- **Endpoint do form de contato**: hoje só feedback visual no submit (`assets/js/main.js`). Integrar com Formspree / Netlify Forms / API própria.
- ~~OG image PNG dinâmica por post~~: feito (oitava passada). Atualizar template caso queira variante B/C no futuro.
- **EN/ES de novos posts**: routine deve produzir as 3 variantes simultaneamente. Validar lote de #11+ quando publicar.

## 9. Histórico de sessões

- **2026-05-21** — Scaffold criado. Levantamento Figma feito. Direção visual macro acordada. Portfólio entrou em revisão. PLAN.md criado.
- **2026-05-22** — Três pilares definidos. Shortlist competitiva consolidada. Brief rodado. Marca, tagline, Trilha 360 e posicionamento de consultoria especializada premium fechados. Cases-âncora e produtos SaaS placeholders. Inspirações Apple/Google/Salesforce. Arquitetura da home (single-page, 10 seções). Idiomas PT/EN/ES. Styleguide v0.1 publicado.
- **2026-05-22 (segunda passada)** — Site grande implementado: nav, hero com mark Aperture, 3 pilares + 3 seções deep, Trilha, cases, confiança, blog teaser, contato, footer. Sistema de cor refinado (logo green sagrado vs UI green editorial; secundárias por pilar; navy resgatado). i18n real. Build MD→HTML multilíngue — 3 posts publicados. 34 temas mapeados. Routine ativada. Favicon + og-image.png + sitemap + robots + JSON-LD. Tipografia editorial calibrada. LinkedIn + WhatsApp adicionados.
- **2026-05-22 (terceira passada)** — Lote de blog posts #01–#10 publicado (sf/data/ai em rotação). Todos PT/EN/ES com forward links. EDITORIAL.md criado. Diretriz de links internos formalizada. Audit SEO/GEO completo — quick wins aplicados. Roadmap §6 (era §9) criado. Vocabulário rebrand: descartar "boutique", "IA Aplicada", "agentes de IA". Headers de segurança endurecidos. Asset versioning hash-based.
- **2026-05-22 (quarta passada)** — Validação geral do PLAN. Reorganização: §3 ganhou subseções coerentes 3.1–3.6 (corrigido §3.4 duplicado); §4 consolidado em 4.1–4.4 (sequência inicial + site + blog + infra); §6 movido pra antes do histórico; §7 decisões fechadas com 10 itens; §8 técnicas + parking expandido; histórico no fim. Snapshot do estado real: 13 posts publicados, audit SEO concluído, routine rodando, próximo passo é executar §6.1.
- **2026-05-22 (quinta passada)** — 3 pillar pages (Salesforce/Data/IA) com design colorido por pilar + cores secundárias do âmbar Data ajustadas pra contraste. Glossário (`/glossario/`) com 26 termos filtraveis. Página comercial (`/como-trabalhamos/`) com 3 modos de engajamento, faixas de investimento, FAQ schema, CTA. Home com links de pilar migrados pras pillar pages.
- **2026-05-22 (sexta passada)** — Trilha 360 detalhada na página comercial em timeline vertical (5 verbos + entregáveis); FAQ mobile com mais respiro; consistência conteúdo (Trilha amarrada aos 3 modos); rebrand vocabulário aplicado.
- **2026-05-22 (sétima passada)** — Removidos "Modelos de engajamento" (Sprint/Projeto/AMS) e "Faixas de investimento" de `/como-trabalhamos/` — conflitavam com Trilha 360 e com mensagem de consultoria especializada. FAQ enxuto sem refs a Sprint/Projeto/AMS. Faixas no parking lot.
- **2026-05-24 (oitava passada)** — Internacionalização estratégica + structured data + OG dinâmica.<br>**i18n**: 10 páginas EN/ES criadas (`/en/como-trabalhamos`, `/en/glossario`, 3 `/en/pilares/<slug>` + idem ES). `i18n.js` detecta `/en/` e `/es/`; lang-switch redireciona entre variantes. hreflang (pt-BR/en-US/es-ES/x-default) em todas as variantes.<br>**Build script**: `FAQPage` schema auto-injetado quando post tem ≥2 H2 terminados em `?`; `BreadcrumbList` (Blog › Pilar › Post) em todo post; **OG image dinâmica** variante A (título à esquerda + mark Aperture na cor do pilar + pílula de pilar + wordmark) gerada por post×lang em `/assets/img/og/<slug>-<lang>.png` (37 posts × 3 idiomas = 111 PNGs). Corrigido "Boutique" → "Consultoria especializada" no `og-image.svg` genérico.
- **2026-05-22 (sétima passada)** — Design system fechado e documentado: 7 ondas de refator (eyebrow base + 3 modificadores; section-head global; padding-block 16/24/32 universal; `.card` base + accent-top/accent-side; trilha + stats consolidadas entre home e pillar; `.grid-cards` substitui 8 classes de grid; ~3000 chars de CSS deprecated removidos). **`DESIGN.md` na raiz** vira fonte única — catálogo de primitivos, modificadores, tokens, anti-padrões. `blog/posts/README.md` aponta pro DESIGN.md. CSS 1651 → 1536 linhas. Auditoria de classes órfãs em `research/css-audit-2026-05-22.md`. Dívida de design = zero.
