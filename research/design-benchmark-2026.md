# Design Benchmark & Upgrade Plan — Kliente 360 · 2026

> **v1.0 · 2026-06-10** — benchmark de design de última geração + plano interativo de evolução.
> Companion de `DESIGN.md` (sistema atual) e `PLAN.md` (roadmap geral).
> Princípio inegociável: evoluir **sem abandonar** a identidade "Apple como base, Google no acento, Salesforce na confiança" — e sem regredir o PageSpeed 100/100.

---

## 0. Diagnóstico honesto do site atual

### O que já está em nível alto
- Sistema de tokens disciplinado (cores, espaço, raio, tipografia fluida com clamp).
- Identidade tipográfica coesa (Inter única + JetBrains Mono pra dados).
- Acento editorial verde no heading (assinatura visual própria).
- Cor por pilar via `data-pillar` + CSS vars — arquitetura elegante.
- i18n real PT/EN/ES, performance 100/100, SEO técnico completo.
- Copy assertiva ("CRM sem dado é cego. Dados sem ativação é desperdício.") — nível raro.

### O gap mensurável vs estado da arte 2026
| Dimensão | Estado atual | Estado da arte (Linear/Stripe/Vercel/awwwards) |
|---|---|---|
| **Motion** | 0 keyframes, 0 scroll-driven, 16 hover transitions | Motion como competência central: reveal on scroll, kinetic type, micro-interações em tudo |
| **Scroll storytelling** | Página = pilha de seções estáticas | Conteúdo se revela e transforma conforme o scroll (Apple product pages) |
| **Transições de página** | Hard navigation entre páginas | View Transitions API — navegação cinemática em site estático |
| **Profundidade visual** | Flat, branco/cinza/preto chapados | Camadas: gradientes sutis, glassmorphism pontual, bordas 1px inset, sombras coloridas |
| **Marca viva** | Mark Aperture estático (watermark no hero) | Marca como elemento vivo que reage (Lando Norris site / Stripe gradient) |
| **Layout** | Grid de cards uniforme 3 cols | Bento grids assimétricos (+23% scroll depth medido), editorial asymmetry |
| **Hero** | Título + sub + 2 CTAs (padrão universal) | Hero que *demonstra* (Vercel mostra deploy real; Linear mostra o produto) |
| **Acessibilidade de motion** | Sem `prefers-reduced-motion` | Obrigatório em qualquer motion novo |

**Tese do plano**: nosso vetor não é virar portfolio 3D WebGL (errado pro segmento — consultoria enterprise B2B). É a família **"editorial restraint" do Linear/Stripe**: movimento preciso, denso, quietamente luxuoso. Motion que sussurra autoridade, não grita.

---

## 1. Benchmark — referências escolhidas e o que roubar de cada

### Tier 1 — mesma família de linguagem (restraint editorial B2B)

**Linear (linear.app)** — o mais estudado em B2B SaaS.
- Inter Variable em pesos customizados (510/590) — "preciso mas não bold".
- Headlines display em weight 300: autoridade por contenção, anti-loud.
- Acento cromático **racionado**: 1 cor de ação por tela. Cards ganham presença com borda 1px inset + sombra suave, nunca fill.
- *Roubar*: disciplina de peso tipográfico; cards com inset border; densidade instrument-panel nas seções técnicas.

**Stripe (stripe.com)** — referência há uma década.
- Gradient animado como assinatura de marca (o "Stripe ramp").
- Documentação como superfície de marketing — código real na homepage.
- *Roubar*: a ideia de assinatura de movimento única e reconhecível (nosso candidato: a Aperture que "abre"); blocos de prova técnica no meio do marketing.

**Vercel (vercel.com)** — dual-audience (dev + CTO) resolvido.
- Hero que *demonstra* o produto (build log animado) em vez de declarar.
- Dark mode funcional, não decorativo: contraste pra screenshots.
- *Roubar*: hero demonstrativo — nossa Trilha 360 pode "executar" no hero; seções dark com propósito (já temos `.section.dark`, subutilizada).

### Tier 2 — awwwards-grade (sinal de tendência, dosar)

**Lando Norris / OFF+BRAND** (Site of the Year 2025) — marca como sistema vivo, motion idiom consistente em todas as páginas.
**The Renaissance Edition** (SOTM mar/2026) — editorial layout com tipografia oversized e grid quebrado controlado.
**MindMarket** (SOTM dez/2025) — bento grids com micro-interações por célula.
- *Roubar (com freio)*: kinetic type **apenas** em headings de hero; bento pro portfólio de ofertas; nada de cursor custom/preloader/som.

### Tier 3 — tendências 2026 com suporte nativo no browser (custo baixo, ganho alto)

| Técnica | Status plataforma | Aplicação no nosso site |
|---|---|---|
| **CSS scroll-driven animations** (`animation-timeline: view()`) | Chrome/Edge estável desde 2025 | Reveal de cards, stats, trilha — sem JS |
| **View Transitions API** (`@view-transition { navigation: auto }`) | Chrome/Edge; progressive enhancement | Navegação entre páginas com crossfade/morph do mark |
| **`@starting-style`** | Baseline 2025 | Entrada suave de elementos que aparecem (FAQ, menu) |
| **Variable font animation** (Inter Variable) | Universal | Kinetic type no hero: peso anima 300→700 na entrada |
| **`text-wrap: balance`** | Baseline | Headlines multi-linha sem viúvas |
| **Bento grid** | CSS Grid puro | Seção de pilares/ofertas na home |
| **Scroll-linked progress** | CSS puro | Indicador de leitura em posts do blog |

Tudo acima degrada graciosamente (Safari/Firefox veem o site atual) e respeita `prefers-reduced-motion`.

---

## 2. O plano — 4 ondas interativas

> Formato: cada item tem checkbox, esforço (S/M/L), impacto (★..★★★) e dependência.
> Regra de ouro por onda: **medir PageSpeed antes/depois — se sair de 100, o item volta.**

### Onda 1 — Fundação de motion (1 sessão, S/M, sem risco)

A base que destrava todo o resto. CSS-only, zero JS novo.

- [ ] **1.1** (S, ★★★) Tokens de motion em `tokens.css`: `--dur-1/2/3` (150/300/600ms), `--ease-out` (já existe), `--ease-spring`. Documentar em DESIGN.md.
- [ ] **1.2** (S, ★★★) Bloco global `@media (prefers-reduced-motion: reduce)` que zera animações — pré-requisito ético/legal de tudo abaixo.
- [ ] **1.3** (M, ★★★) **Reveal on scroll** via `animation-timeline: view()`: cards, stats, steps da trilha sobem 12px + fade na entrada do viewport. Classe utilitária `.reveal` no main.css. Fallback: sem animação (estado final direto).
- [ ] **1.4** (S, ★★) Micro-interações de botão: `.btn` ganha translate-y(-1px) + sombra no hover, scale(0.98) no active. Setas de `.btn-link` deslizam 4px no hover.
- [ ] **1.5** (S, ★★) `text-wrap: balance` em todos os headings; `text-wrap: pretty` em `.lead`.
- [ ] **1.6** (M, ★★) Stats com contagem animada (`@property` + CSS counter animation, sem JS) na entrada do viewport.

### Onda 2 — Assinatura de marca viva (1-2 sessões, M/L, médio risco)

O que nos diferencia. A Aperture vira o "Stripe gradient" da Kliente.

- [ ] **2.1** (M, ★★★) **Aperture entrance**: no load do hero, os 4 círculos do mark animam de raio 0 → raio final em sequência horária (stagger 80ms), opacidades chegando em cascata. É a marca "abrindo a abertura". Mesma animação em micro nos `.mark-aperture` da nav no hover.
- [ ] **2.2** (L, ★★★) **Hero kinetic type**: "Conhecimento aplicado," entra com Inter Variable animando weight 300→650; "como serviço" (verde) entra 200ms depois. Uma vez só, no load — nada de loop.
- [ ] **2.3** (M, ★★) **View Transitions** entre páginas: `@view-transition { navigation: auto }` + `view-transition-name: brand-mark` no lockup da nav — o mark persiste/morfa entre páginas. Chrome/Edge only, fallback = navegação normal.
- [ ] **2.4** (M, ★★) Scroll-driven na **Trilha 360** da home: a linha conectora dos 5 verbos se desenha conforme o scroll (`animation-timeline: view()` num pseudo-elemento de progresso), steps acendem em sequência.
- [ ] **2.5** (S, ★) Watermark Aperture do hero ganha parallax sutil de 8-12px no scroll (CSS scroll-driven, não JS).

### Onda 3 — Layout de última geração (2 sessões, L, exige decisão de design)

- [ ] **3.1** (L, ★★★) **Bento grid na home**: substituir a grid uniforme de 3 pilares por bento assimétrico — Salesforce em célula 2×1 (pilar âncora, Partner badge), Data e IA em 1×1, célula extra com stat vivo ("45+ posts publicados") e célula com micro-CTA. Benchmark: +23% scroll depth medido em bento vs grid tradicional.
- [ ] **3.2** (M, ★★) **Hero demonstrativo**: sob o subtítulo, uma linha mono tipo terminal que cicla 3 outputs reais (`pipeline ✓ 2.3M rows`, `agent deployed · KPI +18%`, `dashboard live · 4 squads`) — o "build log" da Vercel traduzido pra consultoria. Respeita reduced-motion (mostra 1 estático).
- [ ] **3.3** (M, ★★) Seções com **profundidade Linear**: `.section.dark` ganha gradient radial sutil de fundo + cards com inset border 1px branco-alpha. Aplicar na stats strip e CTA final.
- [ ] **3.4** (M, ★★) **Pillar pages**: número gigante do hero (`02`) vira elemento scroll-driven — desloca e esmaece conforme entra o conteúdo. Editorial asymmetry: manifesto em 2 colunas desalinhadas (texto + pull-quote).
- [ ] **3.5** (S, ★★) Blog post: barra de progresso de leitura scroll-linked (CSS puro) + TL;DR em card sticky no desktop.

### Onda 4 — Refinos e prova social (contínuo, S/M)

- [ ] **4.1** (M, ★★★) Template de **case study** com narrativa scroll (contexto → intervenção → métrica), métricas em stats animados. Destrava quando houver case aprovado (parking lot do PLAN.md).
- [ ] **4.2** (S, ★★) Logos de clientes em faixa com `mask-image` fade nas bordas (quando autorizados).
- [ ] **4.3** (S, ★) FAQ accordion: chevron rotaciona, conteúdo expande com `@starting-style` + `transition-behavior: allow-discrete`.
- [ ] **4.4** (S, ★) Lang-switch e nav mobile com transições suaves (já tem estrutura, falta motion).
- [ ] **4.5** (M, ★) Dark mode opt-in (`prefers-color-scheme`) — temos todos os tokens `on-dark` prontos; avaliar custo/benefício antes.

---

## 3. Governança — pra não virar circo

1. **Orçamento de motion**: máx. 1 animação "hero" por página; reveal padrão pra todo o resto. Nada anima em loop infinito (exceto o terminal do 3.2, que é conteúdo).
2. **Performance gate**: PageSpeed 100/100 é pré-condição de merge. Scroll-driven CSS roda no compositor — não deve regredir; medir mesmo assim.
3. **`prefers-reduced-motion` é lei** (item 1.2 bloqueia o resto).
4. **Progressive enhancement only**: View Transitions e scroll-driven são Chrome/Edge hoje; Safari/Firefox recebem o site atual, 100% funcional.
5. **Tudo vira primitivo**: `.reveal`, tokens de motion, bento grid entram em `main.css` + DESIGN.md — nunca CSS de página.
6. **A identidade manda**: verde sagrado intocável, Inter única, copy assertiva. Tendência que brigar com isso, perde.

## 4. Sequência recomendada

```
Sessão 1  → Onda 1 completa (1.1–1.6)            [fundação, risco zero]
Sessão 2  → 2.1 + 2.2 (assinatura Aperture+type) [o "uau" controlado]
Sessão 3  → 2.3 + 2.4 + 2.5                      [scroll storytelling]
Sessão 4  → 3.1 (bento) — decisão de design antes [maior mexida visual]
Sessão 5  → 3.2–3.5                              [profundidade + editorial]
Contínuo  → Onda 4 conforme destravas             [cases, logos]
```

## 5. Fontes do benchmark

- Awwwards — [Site of the Year 2025 (Lando Norris / OFF+BRAND)](https://www.awwwards.com/annual-awards/), [Sites of the Month](https://www.awwwards.com/websites/sites_of_the_month/), [Editorial layout collection](https://www.awwwards.com/inspiration/editorial-layout)
- [LogRocket — Linear design: the SaaS trend](https://blog.logrocket.com/ux-design/linear-design/) · [Linear Brand Guidelines](https://linear.app/brand) · [designmd.co — Linear tokens analysis](https://www.designmd.co/d/linear.app)
- [Cubitrek — Web Design Trends 2026](https://cubitrek.com/blog/top-10-website-design-trends-for-2026-the-ultimate-guide) (scroll-driven CSS + View Transitions shipping)
- [Pravin Kumar — Bento grids B2B 2026](https://www.pravinkumar.co/blog/bento-grids-b2b-saas-homepage-design-trend-2026) (+23% scroll depth)
- [TheeDigital — 20 Web Design Trends 2026](https://www.theedigital.com/blog/web-design-trends) (kinetic type, variable fonts)
- [Insaim — Best B2B SaaS websites](https://www.insaim.design/blog/best-b2b-saas-websites) (Stripe/Vercel/Linear analysis)
