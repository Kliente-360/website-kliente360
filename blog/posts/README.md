# Blog Kliente 360 — guia para autores (humanos e agentes)

Este diretório guarda **os posts do blog em Markdown**. O build os converte em HTML estilizado, listagens, sitemap e manifest de dados — tudo automaticamente.

> Antes de criar HTML/CSS novo (se for o caso), leia também **[/DESIGN.md](../../DESIGN.md)** na raiz. Posts em Markdown não precisam disso — o template do post já usa os primitivos do design system. Mas se você for tocar em layout, é leitura obrigatória.

## Receita rápida (do zero ao deploy)

```
1. cp _template.md  meu-novo-post.md
2. Edite o frontmatter e escreva o corpo (em Markdown)
3. cp _template.md meu-novo-post.en.md  e traduza   (obrigatório)
4. cp _template.md meu-novo-post.es.md  e traduza   (obrigatório)
5. git add . && git commit -m "blog: meu-novo-post — ai"
6. git push origin main
7. Netlify roda `npm run build` automaticamente
8. Em ~1min o post aparece em /blog/, /blog/en/, /blog/es/
   e nos 3 destaques da home (substitui o mais antigo se for o caso)
```

**Política**: todo post novo sai nos 3 idiomas no mesmo commit. Sem versão "só PT" — Felipe não precisa validar lote de tradução porque ela é parte do entregável, não etapa opcional posterior.

Pra rodar local: `npm install && npm run build`.

## Pipeline

```
blog/posts/<slug>.md          ──►  blog/<slug>.html             (PT)
blog/posts/<slug>.en.md       ──►  blog/en/<slug>.html          (EN)
blog/posts/<slug>.es.md       ──►  blog/es/<slug>.html          (ES)
                              ──►  blog/index.html              (listagem PT)
                              ──►  blog/en/index.html           (listagem EN)
                              ──►  blog/es/index.html           (listagem ES)
                              ──►  sitemap.xml                  (URLs + lastmod)
                              ──►  assets/data/posts.json       (manifest)
                              ──►  og-image.png                 (re-render)
```

O teaser da home (`index.html`) **lê `assets/data/posts.json` em runtime** e mostra os 3 posts mais recentes no idioma atual. O agente nunca toca em `index.html`.

## Estrutura de um post

Todo post é um arquivo `.md` com duas partes:

### 1. Frontmatter YAML (obrigatório)

```yaml
---
title:       "Título declarativo, 50–80 caracteres"
slug:        "kebab-case-sem-acento"        # = nome do arquivo
pillar:      "ai"                            # sf | data | ai
date:        "2026-05-22"                    # ISO YYYY-MM-DD
readMinutes: 6                               # opcional (calcula sozinho)
excerpt:     "Resumo de uma linha (≤160 chars)."
tldr:        "Resumo de 2–3 frases. Pensa em LLM lendo (GEO)."
keywords:    ["termo1", "termo2", "termo3"]  # opcional
---
```

### 2. Corpo em Markdown

#### Regra de hierarquia (importante)

Para o post não virar "heading-soup", siga essa hierarquia visual:

- **H2** (`##`) — seções principais. Use quando a seção tiver pelo menos 3–4 parágrafos. Espera-se 3–6 H2 num post de 5–8 min.
- **H3** (`###`) — subseções **com pelo menos 2 parágrafos próprios**. Se a subseção tem só uma frase ou um parágrafo curto, **NÃO use H3** — use o padrão de **bold-lead-in**:

```markdown
<!-- Ruim — virou 4 H3s grudados visualmente -->
### Semana 1 — Mapear
Sentamos com o operador...

### Semana 2 — Prototipar
Construímos um agente...

<!-- Bom — bold-lead-in mantém o ritmo do parágrafo -->
**Semana 1 — Mapear.** Sentamos com o operador...

**Semana 2 — Prototipar.** Construímos um agente...
```

Resultado: ritmo de leitura mais fluido, sem saltos visuais grandes entre tipografias.

#### Markdown suportado

Padrão CommonMark + GFM. Suportado e estilizado:

- Headings `##` e `###` (cada `##` ganha barra colorida no tom do pilar)
- Listas `-` e `1.` (marcadores tomam a cor do pilar)
- Blockquote `>` (vira pull quote grande em Inter peso 500, com barra lateral colorida)
- Ênfase `**negrito**` e `*itálico*`
- Inline code `` `código` ``
- Links `[texto](url)` (sublinhados na cor do pilar)
- **Primeira letra do primeiro parágrafo** ganha automaticamente negrito + cor do pilar

Não usar (ainda): tabelas, blocos de código, imagens. Não estão estilizados no tema.

## Pilares

Cada post pertence a **um pilar primário**. O pilar define a cor temática (pílula, barra lateral, marcadores, drop-cap simples, link colors).

| Valor    | Pilar               | Cor       |
|----------|---------------------|-----------|
| `sf`     | Salesforce          | `#0B5394` |
| `data`   | Data & Analytics    | `#C9A227` |
| `ai`     | IA Aplicada         | `#6D28D9` |

## Traduções (multi-idioma)

Cada post pode ter variantes por idioma:

```
quando-agente-e-resposta.md       → PT (padrão, obrigatório)
quando-agente-e-resposta.en.md    → EN (opcional)
quando-agente-e-resposta.es.md    → ES (opcional)
```

Todos os arquivos do mesmo post compartilham o **mesmo `slug`** no frontmatter. Os campos a traduzir são `title`, `excerpt`, `tldr`, `keywords` e o **corpo**. O `pillar` e o `date` ficam no arquivo PT e valem para todas as variantes.

URLs geradas:

- `/blog/<slug>.html` (PT, sempre presente)
- `/blog/en/<slug>.html` (somente se `<slug>.en.md` existir)
- `/blog/es/<slug>.html` (somente se `<slug>.es.md` existir)

A listagem `/blog/`, `/blog/en/` e `/blog/es/` mostra apenas posts com tradução para o idioma da página. O teaser da home só mostra um post quando há tradução no idioma atual; caso contrário, cai pro PT como fallback.

## Arquivos especiais

- `_template.md` — esqueleto. Ignorado pelo build.
- `README.md` — esta documentação. Ignorada pelo build.
- Qualquer arquivo iniciado por `_` é ignorado (use para rascunhos: `_draft-meu-post.md`).

## Cadência de publicação

O blog tem um ritmo definido — **1 post na terça + 1 post na quarta, toda semana**. O agente de publicação deve respeitar esse padrão ao escolher a `date:` do novo post.

### Regras

1. **Apenas terças ou quartas** — nunca segunda, quinta, sexta, fim de semana.
2. **Pular feriados** nacionais brasileiros e municipais da cidade de São Paulo:
   - **Nacionais fixos**: 01/01, 21/04, 01/05, 07/09, 12/10, 02/11, 15/11, 20/11, 25/12.
   - **Nacionais móveis**: Carnaval (segunda + terça), Quarta-feira de Cinzas (meio expediente), Sexta-feira Santa, Corpus Christi (quinta, 60 dias após a Páscoa).
   - **Município SP**: 25/01 (Aniversário de São Paulo).
   - Se a terça ou quarta cair em feriado, **pula essa data** e publica só a outra do par naquela semana.
3. **Alternar pilares** — não publicar 2 posts do mesmo pilar na mesma semana, salvo justificativa editorial.
4. **Datas no passado** — ao backdate posts (criar back-catálogo), seguir essas mesmas regras. Datas plausíveis: 2–6 meses para trás. Não datar no futuro.

### Próximas datas válidas (referência)

Calcule a partir da última `date` publicada em `posts/`. Se já houver post nessa data, vá pro próximo slot Tue/Wed válido.

```
data mais recente em posts/  →  encontrar próxima Tue/Wed disponível
                              →  checar feriados (acima)
                              →  se válida, usar; senão pular pra próxima
```

### Estado atual

Back-catálogo backdated estabelecido — **37 posts publicados** entre fev/2026 e mai/2026, com rotação balanceada entre os 3 pilares (sf/data/ai) e respeitando feriados. Última publicação: **2026-05-22**.

A próxima publicação esperada é **terça 26/05/2026** (próximo Tue), seguida de **quarta 27/05/2026**.

## Tom de voz

Consultoria informada falando com decisor informado. Direto, técnico, sem chavões.

**Usar**: "uma prática única", "agentes onde já existe dado", "conversa direta com quem entrega", nomes próprios (Salesforce, Tableau, Agentforce, Data Cloud).

**Evitar**: "transformação digital", "jornada", "experiência fluida", "soluções inovadoras", "costurar", "ladainha", "no fim do dia", "alavancar", auto-elogio.

## SEO & GEO — playbook completo

Otimização para mecanismos de busca tradicionais (SEO) e para mecanismos generativos (GEO — AI Overviews do Google, Perplexity, ChatGPT Search, Claude). As duas convergem em conteúdo bem estruturado, mas têm ênfases distintas.

### SEO clássico — o que o build já faz automaticamente

Esses pontos saem de graça, o agente não precisa se preocupar:

- `<title>` com formato `<post title> | Kliente 360`
- `<meta name="description">` derivado do `excerpt`
- `<link rel="canonical">` apontando pra URL do post (por idioma)
- Open Graph (og:title/description/image/type/published_time)
- Twitter Card summary_large_image
- **JSON-LD `Article`** schema.org embutido (headline, description, datePublished, inLanguage, articleSection, keywords, author, publisher)
- `<time datetime="ISO">` semântico
- `<html lang="pt-BR|en-US|es-ES">` correto por variante
- Entrada no `sitemap.xml` por URL/idioma
- URLs limpas (sem query strings, sem `index.html` redundante)

### SEO — o que o agente precisa fazer

1. **Title (50–80 chars)** — declarativo, com a **palavra-chave primária nos primeiros 60 caracteres**. Evite stopwords no começo ("Sobre", "O que", "Como"). Exemplo bom: *"Data Cloud não é mais CDP — é o nervo central do Salesforce"*. Exemplo ruim: *"Sobre Data Cloud e a importância de entender o que ele faz"*.

2. **Slug** — kebab-case, com 3–6 palavras, contendo a palavra-chave. Não traduzir slug entre idiomas — mantém o mesmo slug para o post em PT/EN/ES.

3. **Excerpt (≤160 chars)** — vira meta description. Inclua a palavra-chave primária e uma ação ou benefício. Frase completa, sem reticências.

4. **Primeiro parágrafo** — repita a palavra-chave **no primeiro ou segundo parágrafo**. Não force; integre na frase de abertura quando possível.

5. **Hierarquia de headings** — exatamente um `<h1>` (que vem do `title` automaticamente). H2 para seções principais, H3 para subseções. Não pule de H2 para H4.

6. **Internal linking** — ver seção dedicada "Estratégia de links internos" mais abaixo. Em resumo: 1–3 forward links por post, embutidos na prosa, com texto descritivo (nunca "clique aqui"). O build já gera dois blocos automáticos no rodapé ("Continue explorando" com pilar + comercial + glossário; "Próximas leituras" com 3 posts relacionados) — links manuais são *contextuais*, embutidos na prosa, e não substituem nenhum dos dois blocos.

7. **Links externos** — para fontes autoritativas (documentação oficial, papers, dados de mercado). Reforça topical authority.

8. **Keywords no frontmatter** — 3–6 termos. Estes alimentam o JSON-LD. Use a palavra-chave primária + 2–4 semanticamente relacionadas (LSI).

9. **Densidade** — palavra-chave primária aparece de forma natural em: título, URL/slug, primeiro parágrafo, pelo menos um H2, e na conclusão. Não force repetições — Google penaliza keyword stuffing.

10. **Tamanho** — posts entre 1000–1700 palavras (5–8 min de leitura) tendem a rankear melhor para queries informativas / consultivas. Posts muito curtos competem mal; muito longos diluem.

### GEO — otimização para mecanismos generativos

LLMs (ChatGPT, Claude, Perplexity, Gemini, AI Overviews do Google) **citam e resumem** conteúdo de forma diferente. O que ajuda:

1. **TL;DR no topo** — caixa explícita logo após o título. LLMs priorizam essa estrutura ao sumarizar. **Já temos `tldr` no frontmatter** — capriche, é o resumo mais lido. 2–4 frases, autoexplicativo, **sem CTA**. Pense: "se o leitor sair daqui, ele já tem 80% do valor".
   **Regra da primeira frase (obrigatória desde jul/2026)**: a primeira frase do TL;DR é **definicional ou tese autossuficiente** — o leitor (ou LLM) entende o claim sem ler o título. Padrões: *"X é/são Y que Z…"*, *"X falha/resolve porque Y…"*, *"A escolha entre X e Y se decide por Z…"*. Proibido teaser ("Entenda como…", "Descubra por que…", "O que você precisa saber…").

1b. **FAQ no fim do post (opcional, recomendado em temas de busca alta)** — seção `## Perguntas que sempre voltam` (EN: `## Questions that keep coming back` / ES: `## Preguntas que siempre vuelven`) com 1 frase de transição + 3 headings `##` em forma de pergunta terminando em `?`, resposta de 1–2 parágrafos cada. **O build converte automaticamente H2 terminados em `?` (≥2) em FAQPage JSON-LD** — as perguntas devem ser as que um usuário real faria a um LLM, e a primeira frase de cada resposta responde direto (forma definicional). Respostas derivam do próprio post — nunca claims novos.

2. **H2 em forma de pergunta ou afirmação curta** — facilita featured snippets e AI Overviews. Em vez de "Diagnóstico", use "O sintoma e o diagnóstico". Em vez de "Conclusão", "Por que IA sem governança vira passivo".

3. **Listas numeradas para passos/regras** — LLMs citam listas com altíssima frequência. Use `1.`, `2.`, `3.` para checklists, frameworks, perguntas de validação. Cada item começando com **negrito** no conceito.

4. **Definições explícitas** — quando introduzir um termo técnico, defina em uma frase. Ex.: *"Um agente é uma camada de execução: pega um processo, conecta a sistemas, decide pequenas coisas e age."* LLMs colhem essas definições para responder "o que é X".

5. **Pull quotes citáveis** — uma frase de 10–20 palavras que sintetiza um insight. Use `>` em Markdown. Vira blockquote estilizado, mas o valor extra é que **LLMs costumam citar verbatim**. Tese forte + frase curta = citação.

6. **Anchors factuais** — números concretos, datas, percentuais, nomes próprios. Em vez de "muitas empresas falham", "60–80% dos dashboards executivos não geram decisão". LLMs preferem citar afirmações ancoradas em dados.

7. **Estrutura previsível** — abertura (tese) → diagnóstico → argumento → prática → fechamento. LLMs identificam padrão e extraem o que pediram.

8. **Vocabulário consistente** — padrão Kliente 360 é **"agente"** ou **"agentes de IA"** quando é auto-descrição. "Copilot" só como referência a categoria de mercado (Microsoft Copilot, etc.). Não troque os termos arbitrariamente no mesmo post — cadência semântica ajuda LLMs a manter contexto.

9. **Sem clickbait** — LLMs penalizam (na prática) conteúdo que promete e não entrega. Title fiel ao conteúdo > title sensacionalista.

10. **`inLanguage` no schema** — já gerado automaticamente por variante (`pt-BR`, `en-US`, `es-ES`). Garante que o LLM ofereça a versão certa por região.

11. **H2 em forma de pergunta dispara FAQ schema automático.** O build detecta H2 terminando em `?` e, quando o post tem **2 ou mais** dessas seções, injeta `FAQPage` JSON-LD apontando cada pergunta → resposta (o corpo até o próximo H2). Ganho fácil em AI Overview e featured snippets. Não force estilo interrogativo só pra ativar — mas quando o H2 cabe natural como pergunta, prefira pergunta a substantivo abstrato.

### Padrões de título que funcionam bem

- **"X não é Y — é Z"** (reframe): *Data Cloud não é mais CDP — é o nervo central do Salesforce*
- **"Quando X é Y — e quando é Z"** (dicotomia útil): *Quando um agente é a resposta — e quando ele é fuga de problema mal modelado*
- **"X como Y: matando Z"** (manifesto + ação): *Tableau como linguagem executiva: matando o dashboard de vaidade*
- **"O custo invisível de X"** / **"O que ninguém te diz sobre X"** — abre curiosidade autêntica
- **"5 perguntas para validar X"** — listicle informativo, alto CTR

### Anti-padrões que rebaixam o conteúdo

- Títulos com "Tudo o que você precisa saber sobre…" (fraco em SEO e GEO)
- Abrir com "Neste post vamos…" (LLMs descartam)
- "Conclusão" como H2 final (substitua por uma síntese nominada)
- Bullets sem início em negrito (LLMs perdem a hierarquia)
- Excerpt = primeira frase do post (duplica conteúdo; faça único)
- Keywords só com termos genéricos ("dados", "tecnologia") sem especificidade

## Estratégia de links internos

O blog cresce em rede, não em lista. Cada post deve aumentar a densidade de ligações com o que já foi publicado — isso ajuda SEO (PageRank interno), GEO (LLMs entendem o contexto temático do site) e o leitor (descobre mais conteúdo).

### Regras

1. **Forward links (novo → antigo): obrigatório quando há cruzamento real.** Antes de finalizar um post novo, scaneie o `EDITORIAL.md` em busca de 2–3 candidatos a link. Alvo: 1–3 links contextuais por post, embutidos na prosa. Se nenhum candidato natural aparecer, o post pode estar isolado demais do resto do blog — vale revisar o ângulo.

2. **Backward links (editar antigo → apontar pro novo): seletivo, não obrigatório.** Só vale editar um post antigo quando o novo se tornou *o tratamento canônico* de um conceito que o antigo só toca de passagem. Não editar mais de 2–3 posts antigos por novo lançamento — caso contrário, vira churn.

3. **Texto do link: descritivo, integrado à frase.** Bom: *"como argumentei sobre [Data Cloud como nervo central do Salesforce](/blog/data-cloud-nervo-central.html)"*. Ruim: *"leia mais sobre Data Cloud [aqui](...)"* ou *"veja [este post](...)"*. O texto-âncora vira sinal pra Google e pra LLMs.

4. **Formato técnico do link.** Três tipos de target válidos no site:

   **Posts de blog** (cruzamento temático com outro post):
   - PT: `/blog/<slug>.html`
   - EN: `/blog/en/<slug>.html`
   - ES: `/blog/es/<slug>.html`

   **Pillar pages** (use quando o link aponta pro pilar como conceito amplo, não pra um post específico):
   - PT: `/pilares/salesforce/` · `/pilares/data/` · `/pilares/ia/`
   - EN: `/en/pilares/salesforce/` · `/en/pilares/data/` · `/en/pilares/ia/`
   - ES: `/es/pilares/salesforce/` · `/es/pilares/data/` · `/es/pilares/ia/`

   **Glossário e Como Trabalhamos** (use quando o post menciona termo técnico ou metodologia que merece definição centralizada, não expansão local):
   - PT: `/glossario/` · `/como-trabalhamos/`
   - EN: `/en/glossario/` · `/en/como-trabalhamos/`
   - ES: `/es/glossario/` · `/es/como-trabalhamos/`

   Em cada variante de idioma, linke para a variante do mesmo idioma. Se o post-alvo não tiver tradução no idioma da variante, linke o PT (fallback).

5. **Blocos automáticos do rodapé não substituem links na prosa.** O build gera dois blocos no fim de todo post:
   - **"Continue explorando"** — 3 cards fixos (pillar page do post, `/como-trabalhamos/`, `/glossario/?pilar=<pilar>`). Garante ligação mínima com as páginas estratégicas em todo post.
   - **"Próximas leituras"** — 3 cards de posts (preferem mesmo pilar).

   Esses blocos são algorítmicos. Os links manuais são *contextuais* — aparecem onde o tema cruza, dentro da argumentação, com texto-âncora descritivo. Funções diferentes; um não dispensa o outro.

6. **Commit de backlink: separado.** Backlinks em posts antigos vão em commit próprio, mensagem: `blog: backlink <slug-antigo> → <slug-novo>`. Não misturar com o commit do post novo — facilita reverter caso o link envelheça mal.

### Routine de backlink-pass

Posts novos entram com **forward links** (1–3 links pra posts publicados antes). Mas o caminho inverso — posts antigos recebendo links pros novos — exige um pass editorial separado. Senão posts antigos viram "ilhas" SEO sem receber authority dos novos.

**Cadência**: a cada 2 semanas (lote de ~4 posts publicados na quinzena). Roda toda 2ª e 4ª quinta-feira do mês — uma semana depois da publicação Tue/Wed pra dar tempo do Google indexar o novo.

**Estado**: coluna `Backlink pass` no `EDITORIAL.md` marca `[x]` quando o post novo já foi processado pra receber links contextuais dos posts publicados depois dele.

**Operação** (cada execução):

1. Listar os 4 posts mais recentes com `Status = [x]` e `Backlink pass = [ ]` no EDITORIAL.md.
2. Pra cada post novo, identificar 2–5 posts antigos onde o tema cruza naturalmente (grep por keywords/conceitos do post novo no corpo dos antigos).
3. Em cada post antigo identificado, adicionar **1** link inline na prosa pro post novo. Texto-âncora descritivo (nunca "leia mais"/"saiba sobre").
4. Aplicar nas 3 variantes (PT/EN/ES). Se o post antigo não tem tradução em algum idioma, linkar só onde existe.
5. **1 commit separado por post antigo**, mensagem `blog: backlink <slug-antigo> → <slug-novo>`. Facilita reverter se um link envelhecer mal.
6. Após processar os 4 posts novos, marcar `Backlink pass = [x]` no EDITORIAL.md em commit final `editorial: backlink-pass lote <YYYY-MM-DD>`.

**Guardrails (críticos pra não virar spam)**:

- **Cruzamento natural obrigatório**: só linkar se o post antigo já MENCIONA o conceito específico do post novo. "Tem a ver" não basta. Exemplo bom: post novo sobre "FinOps de IA" → post antigo sobre "custos de inferência" (ambos discutem custos/orçamento). Exemplo ruim: mesmo post novo → post antigo sobre "Sales Cloud antipadrões" (ambos são empresariais — não basta).
- **Cap 1 link por post antigo por execução**. Não transformar parágrafos em mar de links.
- **Cap 3 backlinks abertos por post novo**. Se só 1–2 posts antigos cruzam, fica em 1–2. Forçar 3 é spam.
- **Pular post antigo com 5+ backlinks acumulados** (já saturado).
- **Pular post novo se nenhum antigo cruza naturalmente**. Marca `Backlink pass = [x]` mesmo assim (foi processado, só não rendeu).
- **Não tocar posts com `no-backlink: true` no frontmatter** — escape hatch pra congelar.

**Edge cases**:

- **Lote incompleto** (publicou só 3 na quinzena por feriado): processa os 3.
- **Lote zero**: pula a execução, não roda.
- **Conflito com routine de publicação no mesmo dia**: backlink-pass roda DEPOIS (quinta), e pula commits do mesmo dia que ainda não estejam no `main`.

### Pré-flight de links

Antes de marcar `[x]` no EDITORIAL, confirmar:

- [ ] O post novo tem 1–3 forward links pra posts publicados, com texto-âncora descritivo
- [ ] Os links existem nas 3 variantes (PT/EN/ES) apontando pra variante de mesmo idioma quando houver
- [ ] Se algum post antigo se beneficia de backlink, decidir agora — em commit separado

## Checklist antes de publicar

- [ ] Frontmatter completo, com todos os campos obrigatórios.
- [ ] Slug em kebab-case, sem acentos.
- [ ] Pilar correto (sf | data | ai).
- [ ] Title declarativo, sem ponto final.
- [ ] Excerpt em uma linha, ≤160 caracteres.
- [ ] TL;DR em 2–4 frases (cabeça, não chamada para ação) — **primeira frase definicional/autossuficiente** (regra GEO 1).
- [ ] Primeiro parágrafo abre direto na tese, sem "neste post".
- [ ] H2 em forma de sentença declarativa ou pergunta, nunca "Introdução"/"Conclusão".
- [ ] Pelo menos um blockquote forte para sintetizar um ponto.
- [ ] Sem palavras da lista de evitar.
- [ ] 5–8 minutos de leitura, salvo justificativa.
- [ ] **Arquivos `.en.md` e `.es.md` com mesmo `slug`** (obrigatório — todo post sai nos 3 idiomas).
- [ ] **SEO**: palavra-chave primária no title, no slug, no primeiro parágrafo e em pelo menos 1 H2. **1–3 forward links pra posts publicados** (ver "Estratégia de links internos"), com texto-âncora descritivo.
- [ ] **GEO**: TL;DR autoexplicativo (sem CTA), H2 em forma de pergunta/afirmação curta, pelo menos 1 blockquote citável, listas numeradas para passos/regras, números/dados concretos quando aplicável.

## Para agentes de redação

Se você é um agente automatizado escrevendo um post:

1. Leia `_template.md` integralmente — ele tem regras editoriais que vão além do schema.
2. Verifique 2–3 posts publicados nesta pasta como referência de tom.
3. Use os pilares conforme tabela acima — não invente cor ou label.
4. Datas devem ser realistas (não futuras além de poucos dias).
5. Slug = nome do arquivo (sem `.md`). Devem ser idênticos entre as 3 variantes (`<slug>.md`, `<slug>.en.md`, `<slug>.es.md`).
6. **Gere as 3 variantes (`.md`, `.en.md`, `.es.md`) no mesmo commit.** Não publique só PT. Traduzir é parte do entregável, não etapa posterior — Felipe não revisa traduções em batch. Mantenha `pillar` e `date` apenas no `.md` (PT); traduza `title`, `excerpt`, `tldr`, `keywords` e o corpo.
7. **Não** crie HTML por conta própria. **Não** edite `assets/`, `scripts/`, `index.html`, `netlify.toml` ou qualquer arquivo fora de `blog/posts/`. **Não** suba dependências.
8. Após criar os 3 arquivos, commite em `main` com a mensagem: `blog: <slug> — <pilar>`.
9. Não rode `npm run build` localmente — o Netlify faz isso no deploy.

## Para agentes de revisão

- Cheque o checklist acima.
- Marque sugestões inline no PR (se houver) ou em comentário no commit.
- Aprove apenas se o tom estiver fiel ao guia.

## Anatomia visual da página do post (referência rápida)

| Elemento                | Tratamento                                                     |
|-------------------------|----------------------------------------------------------------|
| Pílula do pilar         | Fundo translúcido + cor do pilar                              |
| H1 do post              | Display grande, tracking apertado                              |
| Linha de metadados      | Data + tempo de leitura + autor, em mono                       |
| TL;DR                   | Caixa com tint do pilar + barra lateral                        |
| Primeira letra          | Negrito + cor do pilar (sem drop-cap serif)                    |
| Corpo                   | Inter 18–19px, line-height generoso, barra lateral colorida    |
| H2                      | Tracking apertado + barra horizontal curta no tom do pilar     |
| Lista (ul)              | Marcador = traço colorido                                      |
| Lista (ol)              | Numeração mono `01`, `02`... no tom do pilar                   |
| Blockquote              | Inter peso 500 grande + barra lateral colorida                 |
| Links                   | Sublinhado fino no tom do pilar                                |
| Card de CTA final       | Bloco com tint do pilar + link "Conversar com um sócio"        |
| Continue explorando     | 3 cards: pilar relacionado, /como-trabalhamos/, glossário (auto-gerado) |
| Próximas leituras       | 3 cards de posts (preferem mesmo pilar, depois outros)         |
