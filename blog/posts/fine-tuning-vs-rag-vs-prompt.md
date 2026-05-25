---
title: "Fine-tuning vs RAG vs prompt engineering: como decidir sem queimar caixa"
slug: "fine-tuning-vs-rag-vs-prompt"
pillar: "ai"
date: "2026-02-11"
readMinutes: 6
excerpt: "Três caminhos pra adaptar LLM ao seu negócio. Custos, prazos e riscos diferentes — e a escolha errada paga em três a seis meses de retrabalho."
tldr: "Prompt engineering resolve 60% dos casos, RAG resolve 30%, fine-tuning resolve 5–10% específicos. A maioria das empresas tenta fine-tuning antes de esgotar as duas anteriores e queima caixa. Critérios práticos pra escolher na ordem certa — e o sinal de quando subir o degrau."
keywords: ["fine-tuning", "RAG", "prompt engineering", "LLM", "adaptação de modelo"]
---

A pergunta que entra no comitê de IA toda terça: "vamos treinar nosso modelo próprio?". A resposta honesta em quase todos os casos é "ainda não — e talvez nunca". Não porque fine-tuning seja ruim. Porque é a opção mais cara, mais lenta e mais arriscada das três disponíveis pra adaptar LLM a um negócio específico — e quase sempre existe um caminho mais barato que resolve o problema antes de chegar lá.

Esse texto é o framework de decisão entre **prompt engineering**, **RAG** e **fine-tuning**. Não é técnico — é gerencial. A decisão entre os três define se o projeto entrega valor em três semanas ou em nove meses.

## O que cada um resolve, em uma frase

Antes da régua, é preciso ter clareza do que cada técnica faz.

**Prompt engineering** é mudar como você *fala* com o modelo. Instrução de sistema, exemplos few-shot, estrutura de resposta. Custo: hora de quem escreve o prompt. Prazo: dias. Risco: baixo.

**RAG (Retrieval-Augmented Generation)** é dar ao modelo *contexto* que ele não tinha — buscar trechos relevantes em uma base de documentos e injetar na hora da pergunta. [Como argumentei sobre RAG na prática](/blog/rag-na-pratica.html), a parte difícil não é gerar; é recuperar. Custo: infraestrutura + corpus + retrieval. Prazo: 4–8 semanas pra produção. Risco: médio.

**Fine-tuning** é mudar *o modelo* — re-treinar pesos com seus dados próprios. Custo: dados de treino curados + compute + iteração. Prazo: 2–6 meses. Risco: alto (modelo pode piorar em tarefas que antes acertava).

A diferença não é apenas técnica. É *o que você está dispondo a investir antes de saber se vai funcionar*. Prompt eng falha barato. Fine-tuning falha caro.

> A pergunta certa nunca é "qual técnica é melhor". É "qual a técnica mais barata que resolve o caso a 80%". Sobe degrau só quando esgota o atual.

## A ordem que funciona

A régua que aplicamos antes de qualquer projeto de IA com adaptação ao negócio. Sempre nessa ordem.

1. **Esgotar prompt engineering primeiro.** Antes de mexer em corpus ou em modelo, tente resolver com instrução melhor. Few-shot examples bem escolhidos sobem acurácia em 10–25% em quase todo caso. Estrutura de resposta forçada (JSON, lista numerada) elimina ambiguidade. Chain-of-thought explícito melhora raciocínio. Quem pula essa etapa investe em RAG/fine-tuning pra resolver problema que era de prompt. (O mesmo princípio vale pra [engenharia de prompts em pipelines de analytics](/blog/prompts-pra-analytics.html), onde SQL gerado por LLM precisa do mesmo rigor.)
2. **Subir pra RAG quando o modelo precisa de conhecimento que não tem.** Documento interno, política da empresa, base de produto, histórico de cliente. Se a pergunta exige fato que o LLM não sabe, RAG é o caminho. Não fine-tuning — fine-tuning ensina *padrão*, não *fato*.
3. **Subir pra fine-tuning quando o problema é estilo, formato ou domínio muito específico.** Quando o modelo precisa escrever no jargão da sua empresa, gerar código no seu padrão interno, ou responder em um formato estruturado raro. Fine-tuning muda comportamento; não muda conhecimento.

O erro mais comum: usar fine-tuning pra resolver problema de RAG ("o modelo não sabe nossas regras"). Não vai funcionar. Modelo fine-tuned esquece da metade das regras na semana seguinte ou alucina respostas plausíveis sobre regras que mudaram.

## Custos reais — a conta que ninguém faz

Os custos de cada técnica não são apenas dinheiro. São tempo do time, risco operacional e dificuldade de iterar. Vale catalogar.

**Prompt engineering — custos.** Hora de quem escreve (1–3 dias por iteração). Eval set pra medir antes/depois (1–2 semanas pra montar). Custo de inferência por token, contínuo mas pequeno em volume médio. Total típico: R$ 5–20 mil pra rodar um caso de uso decente em piloto.

**RAG — custos.** Infra de vetor + indexação + retrieval (R$ 500–5 mil/mês a depender do volume). Engenharia de pipeline (4–8 semanas de time sênior). Curadoria do corpus (subestimada, costuma ser metade do esforço). Manutenção do índice (drift do corpus, freshness). Total típico: R$ 80–250 mil até produção, mais R$ 10–30 mil/mês.

**Fine-tuning — custos.** Dados de treino curados (5–15 mil exemplos de qualidade, geralmente humanos rotulando: R$ 30–100 mil). Compute de treino (R$ 5–50 mil por iteração, e você vai precisar de 3–10 iterações). Eval rigoroso (essencial — sem ele, fine-tuning piora invisivelmente). Total típico: R$ 200 mil–1 milhão até modelo em produção, e o modelo precisa ser retreinado a cada 6–12 meses.

O ratio que vejo na prática: fine-tuning custa entre 5× e 20× mais que RAG, que custa entre 5× e 15× mais que prompt engineering. Saltar etapas pula esse ratio na conta sem aviso.

## Os sinais de que está na hora de subir o degrau

Saber quando *parar* em cada degrau é metade da decisão. Sinais práticos:

**Quando subir de prompt pra RAG.** Quando o modelo erra por *falta de informação específica* — não por estilo. Pergunta: "o modelo erraria menos se eu colasse o documento certo no contexto?". Se sim, RAG. Se a resposta erra por estilo, formato ou raciocínio, prompt eng ainda dá conta.

**Quando subir de RAG pra fine-tuning.** Três sinais combinados: (a) você já tem RAG funcionando bem na recuperação (recall@k > 80%); (b) o problema é de *como o modelo escreve* após receber o contexto; (c) você tem 5 mil+ exemplos rotulados de qualidade do output desejado. Se algum dos três falta, fine-tuning não vai resolver.

**Quando *não* subir pra fine-tuning, mesmo com pressão.** Quando o problema é de conhecimento (RAG resolve), quando o caso de uso muda de mês em mês (modelo fine-tuned vira dívida), quando você não tem [protocolo de avaliação sério](/blog/avaliacao-de-agentes.html) (sem eval, fine-tuning é fé). Esses três contextos cobrem 80% dos pedidos de fine-tuning que recebemos.

## O case típico que esclarece

A história que se repete em três de cada cinco projetos. Empresa quer "treinar nosso ChatGPT" pra responder dúvidas internas. Time técnico orça fine-tuning: R$ 400 mil + 5 meses. Sponsor aprova.

Três meses depois, modelo treinado responde bem nas perguntas do eval set inicial — e mal em quase tudo o resto. Diagnóstico real: o problema era de conhecimento (modelo não tem acesso à política interna), não de estilo. RAG sobre os documentos teria resolvido em 6 semanas por R$ 80 mil, com qualidade superior. Fine-tuning agora vira passivo de manutenção.

Esse case é evitável com a régua simples acima. Não é falta de competência técnica; é falta de ordem.

## A decisão de quem decide

Se você está num comitê discutindo "fine-tuning ou não", a pergunta certa pra fazer ao time técnico não é "qual é melhor". É: *já esgotamos prompt engineering? já tentamos RAG?*. Em 80% dos casos, a resposta vai ser "não na profundidade necessária". Aí volta um degrau, faz direito, e a maioria dos casos para ali — com 1/10 do custo e em 1/4 do tempo.

Fine-tuning é a ferramenta certa pra casos específicos. Só não é o default — e tratar como default é o jeito mais caro de adiar a entrega de valor de IA na sua empresa. (Quando justificável, [a escolha entre open source self-hosted e proprietary muda a equação de custo](/blog/open-source-vs-proprietary-llms.html) — vale calcular antes de comprometer.)
