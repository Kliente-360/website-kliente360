# Plano vivo — Rebrand Kliente 360 (2026)

Documento mantido em main. Registra contexto, decisões tomadas e próximos passos. Atualizar a cada sessão.

Última atualização: 2026-05-21.

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

## 4. Sequência de trabalho

1. ✅ Levantamento da marca antiga (Figma).
2. ✅ Direção visual macro definida (premium corporativo, verde como acento).
3. 🔄 **Repensar o portfólio** — em andamento. Skill escolhida: `product-management:competitive-brief`. Analisar 2–4 referências do mercado CRM/BI antes de definir ofertas, posicionamento e copy.
4. ⏳ Redesenhar arquitetura de seções do site com base no novo portfólio.
5. ⏳ Definir sistema visual (tokens, tipografia, paleta refinada).
6. ⏳ Implementar `index.html` + `assets/css/tokens.css` + páginas.
7. ⏳ Build do blog Markdown→HTML.

## 5. Próximos passos imediatos

- Felipe lista 2–4 concorrentes/referências para o competitive-brief (consultorias Salesforce no Brasil, boutiques CRM/BI, ou players globais admirados).
- Rodar o brief; consolidar gaps de mercado e oportunidades de diferenciação.
- A partir do brief, definir 3–5 ofertas-núcleo, tagline e diferenciais.

## 6. Decisões em aberto

- Tagline / posicionamento curto.
- Manter badge "Salesforce partner" no hero ou só no rodapé?
- Existem cases públicos para uma seção dedicada, ou usar depoimentos?
- Tipografia nova — explorar serif editorial (Fraunces / GT Sectra) + sans (Inter / Söhne)?

## 7. Notas técnicas

- Stack: HTML5 + CSS (com `tokens.css`, `reset.css`, `main.css`) + JS módulo. Sem frameworks.
- Estrutura de pastas já criada: `assets/{css,js,img,fonts}/`, `blog/posts/`.
- Blog usará build Markdown→HTML (script Node minimal, sem dependências pesadas — definir na fase 7).

## 8. Histórico de sessões

- **2026-05-21** — Scaffold criado. Levantamento Figma feito. Direção visual macro acordada. Portfólio entrou em revisão (competitive-brief). Documento PLAN.md criado em main.
