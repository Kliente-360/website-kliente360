# Plano vivo — Rebrand Kliente 360 (2026)

Documento mantido em main. Registra contexto, decisões tomadas e próximos passos. Atualizar a cada sessão.

Última atualização: 2026-05-22.

---

## 1. Contexto

Site institucional novo da **Kliente 360** — consultoria CRM/BI, parceira Salesforce. Single-page em HTML/CSS/JS puro + blog estático (Markdown→HTML).

Decisor: Felipe Silva (felipe@kliente360.com).

Repositório: `novo-site-kliente360`. Branch: `main`. Scaffold inicial já criado (commit `165f314`).

## 2. Direção definida

| Tema | Decisão |
|---|---|
| Público-alvo | Misto — decisor C-level + executor (head de ops/atendimento) |
| Tom visual | Moderno-tech com alma corporativa premium. Sem paleta digital saturada. |
| Blog | Gerador estático leve: Markdown → HTML. Entrega final 100% estática. |
| Logo | Mantido (wordmark "kliente 360" verde + 4 círculos). PNG fornecido pelo Felipe. |
| Verde do logo | Tratar como **acento** sobre base neutra/escura — não como tema dominante. |

## 3. Identidade antiga (referência histórica, não destino)

Levantado do arquivo Figma "Kliente 360" (autora Bruna Slongo, 2022).

**Paleta antiga** (Lato Regular/Medium/Bold):
- Neutral: `#000000` / `#7D8185` / `#E6E6E6` / `#F1F2F0` / `#FFFFFF`
- Green: `#006600` / `#008000` / `#009900` / `#00B300` / `#00CC00`
- Yellow: `#F8DF61` / `#F9E47A` / `#FAE992` / `#FBEEAA` / `#FCF3C3`
- Cyan: `#0084E1` / `#0093FA` / `#159EFF` / `#2EA9FF` / `#48B3FF`
- Navy ("Blue"): `#01020F` / `#040427` / `#06073E` / `#080A55` / `#0B0C6C`

**Escala tipográfica antiga (Lato)** — desktop: H1 64/130 · H2 48/130 · H3 40/130 · H4 32/130 · H5 24/Auto · H6 20/Auto · H7 18/Auto · P1 16/28 · P2 14/Auto · Label 12/Auto. Mobile: mH1 34 · mH2 30 · mH3 24 · mH4 22 · mH5 20 · mH6 18 · mH7 16.

**Arquitetura antiga**: Home / Sobre / Serviços CRM / Serviços BI / Blog / Contato. Header com badge "Salesforce partner". Copy de prova técnica ("dados reais", "profissionais certificados").

## 3.1. Três pilares do novo portfólio (definidos 2026-05-22)

1. **Salesforce — core CRM.** Sales Cloud, Service Cloud, Data Cloud, Agentforce. Reforça a herança/parceria.
2. **Data & Analytics — agnóstico de marca.** Engenharia de dados + analytics avançado / data science. Viés de ferramenta de visualização: **Tableau**.
3. **IA & Aplicações — pilar novo.** Aplicações práticas de IA em empresas de segmentos diversos. Pegada de **software house / produtos SaaS**.

## 3.2. Shortlist competitiva (para o brief)

Dois concorrentes por pilar, mistura de boutique + mid/enterprise:

| Pilar | Boutique (espelho) | Mid/Enterprise (teto aspiracional) |
|---|---|---|
| Salesforce | Sottelli | Everymind |
| Data & Analytics | Somativa | Indicium |
| IA & Aplicações | Mind Group | CI&T |

Referências secundárias mapeadas, fora do recorte: WeUse, Valtech, Capgemini, beAnalytic, Active BI, BDA Solutions, Aquarela, Zup, Slalom Build, Thoughtworks.

## 3.3. Marca e posicionamento (definidos 2026-05-22)

- **Posicionamento**: boutique premium. Altíssima expertise, alta personalização, time enxuto, poucos clientes estratégicos. Os 3 pilares costurados como diferencial único no mercado local.
- **Tagline**: **"Conhecimento aplicado, como serviço."** *(evolução sutil de "Conhecimento como serviço")*
- **Metodologia própria**: **Trilha 360** — narrativa de jornada do cliente ao longo dos pilares. Detalhamento das etapas a definir.
- **Cases para o site** (conteúdo a alimentar depois — placeholders no HTML):
  - Sem Parar
  - Bodytech
- **Produtos SaaS de IA** (pilar 3 — placeholders, ideia ainda em revisão):
  - Agente autônomo de atendimento interno (RH)
  - Analytics contábil para PME

## 3.4. Inspirações de design (definidas 2026-05-22)

Referências: **Apple**, **Google**, **Salesforce**. Síntese aplicada:

- **Base visual ← Apple**: neutro escuro ou off-white dominante, tipografia grande como protagonista, hero respirando, paleta restrita.
- **Acento de cor ← Google**: o verde do logo entra pontual e com intenção (CTAs, palavra-chave do título, linha decorativa) — nunca em blocos inteiros.
- **Camada de confiança ← Salesforce**: bloco de parceria/certificações, cases nomeados com números, copy explicativa sem rebuscar.
- **Tipografia**: sans humanista única, 2 pesos. Candidatos: **Inter**, **Söhne**, **GT America**. Reverte a sugestão anterior de serif editorial — não combina com o trio.

## 4. Sequência de trabalho

1. ✅ Levantamento da marca antiga (Figma).
2. ✅ Direção visual macro definida (premium corporativo, verde como acento).
3. ✅ **Repensar o portfólio** — três pilares definidos, brief competitivo rodado (ver `research/competitive-brief.md`), marca consolidada (§3.3).
4. 🔄 Redesenhar arquitetura de seções do site com base no novo portfólio. **Próximo passo.**
5. ⏳ Definir sistema visual (tokens, tipografia, paleta refinada).
6. ⏳ Implementar `index.html` + `assets/css/tokens.css` + páginas.
7. ⏳ Build do blog Markdown→HTML.

## 5. Próximos passos imediatos

- Desenhar arquitetura de seções do site (home + páginas de pilar). Estrutura proposta a validar.
- Travar copy do hero, dos 3 pilares e da seção de metodologia (Trilha 360).
- Definir sistema visual mínimo (tokens, tipografia, paleta refinada) suficiente pra começar a implementar.

## 6. Decisões em aberto

- Tagline / posicionamento curto.
- Manter badge "Salesforce partner" no hero ou só no rodapé?
- Existem cases públicos para uma seção dedicada, ou usar depoimentos?
- Tipografia nova — sans humanista única (Inter / Söhne / GT America). *Serif editorial descartado em §3.4.*

## 7. Notas técnicas

- Stack: HTML5 + CSS (com `tokens.css`, `reset.css`, `main.css`) + JS módulo. Sem frameworks.
- Estrutura de pastas já criada: `assets/{css,js,img,fonts}/`, `blog/posts/`.
- Blog usará build Markdown→HTML (script Node minimal, sem dependências pesadas — definir na fase 7).

## 8. Histórico de sessões

- **2026-05-21** — Scaffold criado. Levantamento Figma feito. Direção visual macro acordada. Portfólio entrou em revisão (competitive-brief). Documento PLAN.md criado em main.
- **2026-05-22** — Três pilares do portfólio definidos (Salesforce / Data & Analytics / IA & Aplicações). Shortlist de 6 concorrentes consolidada. Brief competitivo rodado — resultados em `research/competitive-brief.md`. Marca consolidada: tagline "Conhecimento aplicado, como serviço.", metodologia "Trilha 360", posicionamento boutique premium. Cases-âncora: Sem Parar, Bodytech (métricas a alimentar). Produtos SaaS placeholders: agente RH, analytics contábil PME. Inspirações de design definidas: Apple (base), Google (acento), Salesforce (confiança).
