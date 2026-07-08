# Diagnóstico GEO + SEO — Kliente 360 · 2026

> **v1.0 · 2026-07-08** — diagnóstico de Generative Engine Optimization (aparecer em respostas de ChatGPT, Claude, Gemini, Perplexity) + gaps de SEO clássico remanescentes.
> Companion do `research/seo-competitive-brief.md` (SEO) e do `EDITORIAL.md` (conteúdo).

---

## 0. O conceito

**GEO (Generative Engine Optimization)** é o termo consolidado: otimizar pra ser **citado e mencionado em respostas geradas por LLMs** — ChatGPT, Claude, Gemini, Perplexity, Copilot. Sinônimos que aparecem no mercado: AEO (Answer Engine Optimization), LLMO. A métrica muda: em vez de ranking/clique, mede-se **mention rate** (% de respostas que citam a marca), **citation rate** (% com link clicável) e **posição na resposta**.

Diferenças práticas vs SEO:
- LLMs recuperam **passagens**, não páginas — cada seção precisa se sustentar sozinha.
- Estrutura definicional ("X é um Y que Z") na abertura tem peso alto no retrieval (pesquisa CMU/GEO framework).
- Perplexity cita ~22 fontes por resposta; ChatGPT ~8 — a barra de entrada é diferente por engine.
- Frescor importa mais: sinais de atualização a cada 7–14 dias mantêm prioridade de citação.
- Estatísticas, citações e fontes nomeadas no texto aumentam visibilidade em ~30–40% (estudo GEO original).

---

## 1. O que JÁ temos a favor (e é muito)

| Sinal | Estado | Por quê importa pra GEO |
|---|---|---|
| **HTML estático server-side** | ✅ 100% do conteúdo em HTML puro, zero JS pra renderizar | Crawlers de LLM (a maioria não executa JS) leem tudo. Vantagem estrutural rara |
| **robots.txt aberto** | ✅ `User-agent: * / Allow: /` | Nenhum crawler de IA bloqueado — elegível pra retrieval em todos os engines |
| **TL;DR em todo post** | ✅ frontmatter `tldr` renderizado como aside no topo | É exatamente o "quick answer block" que GEO recomenda above the fold |
| **JSON-LD denso** | ✅ 138 Article + BreadcrumbList + Organization + WebPage; FAQPage (como-trabalhamos ×3); DefinedTermSet (glossário ×3) | Schema é como engines desambiguam entidades |
| **Glossário como DefinedTermSet** | ✅ 30+ termos, 1 parágrafo, definicional, com link canônico | Formato ideal de retrieval — cada termo é uma passagem autossuficiente |
| **Cadência 2 posts/semana** | ✅ ter/qua desde jan/2026, 57 posts | Frescor contínuo, o sinal que decai mais rápido |
| **hreflang PT/EN/ES real** | ✅ | Triplica superfície de retrieval por língua |
| **Sitemap + canonical + excerpt/keywords** | ✅ 157 URLs | Higiene básica pronta |
| **Copy com opinião e números** | ✅ posts assertivos, específicos | LLMs preferem citar afirmações concretas a marketing vago |

**Diagnóstico honesto: a fundação GEO é forte** — herança do rigor de SEO + arquitetura estática. Os gaps são de camada fina, não estruturais.

---

## 2. Gaps encontrados — priorizados

### P0 — custo baixo, impacto direto

**G1 · Sem `llms.txt`** ❌
Markdown na raiz que apresenta o site e aponta o conteúdo canônico pra LLMs. Caveat honesto: é convenção proposta, nenhum provider confirmou uso em produção — mas custa 30 min, zero risco, e posiciona pro momento em que passar a ser lido. Gerar `llms.txt` (índice: pilares, glossário, top posts por tema) e opcional `llms-full.txt`.

**G2 · robots.txt sem política explícita pra crawlers de IA** ⚠️
Hoje `Allow: /` cobre tudo — funciona, mas é decisão implícita. O padrão 2026 distingue: crawlers de **busca/retrieval** (OAI-SearchBot, Claude-SearchBot, PerplexityBot → citam e trazem tráfego) vs crawlers de **treino** (GPTBot, ClaudeBot, Google-Extended, CCBot → alimentam modelo sem retorno direto).
**Recomendação pro nosso caso**: permitir TUDO explicitamente, inclusive treino — somos marca pequena buscando presença; estar no modelo É o objetivo. Documentar a decisão com comentários no robots.txt.

**G3 · Sem `dateModified` no Article schema** ❌
Só temos `datePublished`. Frescor é o sinal GEO que mais decai; posts atualizados (backlink-pass já toca posts antigos!) não declaram a atualização. Adicionar `dateModified` no build usando o commit date do arquivo `.md` (git log).

### P1 — mexe em template/processo, impacto alto

**G4 · Aberturas 100% narrativas** ⚠️
Nossos posts abrem com cena/história (ótimo pra humano, nosso TOV). Mas retrieval favorece estrutura definicional na primeira passagem. **Não trocar o estilo** — resolver com camada: o TL;DR (que já existe) deve sempre conter a forma definicional "X é/faz Y". Auditar os 57 TL;DRs; ajustar os que são só teaser. Regra nova no `blog/posts/README.md`.

**G5 · FAQPage schema só em como-trabalhamos** ⚠️
Posts não têm bloco FAQ. Perguntas explícitas alinham com prompts reais de usuários ("prompt-aligned FAQ"). Proposta: seção opcional `## Perguntas frequentes` no frontmatter/corpo dos posts (2–3 QAs), build gera FAQPage schema automaticamente. Aplicar nos ~10 posts de maior potencial primeiro.

**G6 · Autoria anônima (Organization)** ⚠️
`author: Organization Kliente 360` em tudo. E-E-A-T e GEO favorecem Person com credencial (sócio com nome, bio, LinkedIn). **Decisão de negócio**: expor os sócios como autores? Se sim: página `/quem-somos/` + `Person` schema + `author` nos posts. Se não: manter, aceitando o custo.

### P2 — processo contínuo

**G7 · Zero medição de mention rate** ❌
Não sabemos se LLMs já nos citam. Criar rotina mensal: bateria de ~15 prompts padrão ("melhores consultorias Salesforce no Brasil", "como implementar Data Cloud", "consultoria dados e IA mid-market", PT/EN) rodada em ChatGPT/Claude/Gemini/Perplexity, registrando menção/citação/posição numa planilha. Baseline primeiro, depois tendência.

**G8 · Estatísticas sem fonte nos posts** ⚠️
Nossos números ("60% dos casos", "5–10% de qualidade") raramente citam fonte nomeada. Citações com fonte aumentam citabilidade — engines preferem repassar afirmação atribuível. Regra editorial: número forte → fonte nomeada ou marcar como estimativa nossa.

**G9 · Refresh de conteúdo sem sinal visível** ⚠️
Backlink-pass atualiza posts, mas nada muda no HTML além do link. Combinar com G3: `dateModified` visível ("Atualizado em…") no post quando houver mudança material.

---

## 3. Plano de execução sugerido

| Fase | Itens | Esforço |
|---|---|---|
| **Agora (1 sessão)** | G1 llms.txt + G2 robots.txt comentado + G3 dateModified no build | S/M |
| **Sessão 2** | G4 auditoria dos 57 TL;DRs + regra no README editorial | M |
| **Sessão 3** | G5 FAQ schema em posts (build + 10 posts piloto) | M |
| **Decisão sua** | G6 autoria Person (expor sócios?) | — |
| **Rotina mensal** | G7 baseline de mention rate + G8/G9 nas passadas editoriais | S recorrente |

## 4. Fontes

- [Search Engine Land — Mastering GEO in 2026](https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142)
- [LLMrefs — GEO: The 2026 Guide](https://llmrefs.com/generative-engine-optimization) · [WordStream — GEO vs SEO](https://www.wordstream.com/blog/generative-engine-optimization)
- [GenOptima — GEO Best Practices 2026](https://www.gen-optima.com/geo/generative-engine-optimization-best-practices-2026/) (KPIs: mention rate, citation rate, position)
- [NextGrowth — GEO Best Practices for AI Citations](https://nextgrowth.ai/geo-best-practices-ai-citations/) · [Pixelmojo — How to Get Cited (2026)](https://www.pixelmojo.io/blogs/geo-playbook-get-cited-chatgpt-perplexity-claude)
- [Anagram — AI Crawlers Explained (2026)](https://www.anagram.ai/blog/ai-crawlers-explained-gptbot-claudebot-perplexitybot-and-how-to-let-them-in-2026) · [Digital Applied — AI Crawler Decision Matrix](https://www.digitalapplied.com/blog/ai-crawler-access-control-2026-robots-llms-txt-decision-matrix)
