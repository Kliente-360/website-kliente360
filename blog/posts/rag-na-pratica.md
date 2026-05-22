---
title: "RAG na prática: a recuperação é o gargalo, não o LLM"
slug: "rag-na-pratica"
pillar: "ai"
date: "2026-01-13"
readMinutes: 7
excerpt: "Times gastam meses afinando prompt e modelo enquanto o retrieval entrega o documento errado. Por que recuperar é mais difícil que gerar — e o que medir."
tldr: "Quase todo projeto de RAG que falha não falha no LLM: falha em recuperar o trecho certo no momento certo. A geração tornou-se commodity; a recuperação não. Cinco razões pelas quais o retrieval quebra, três métricas para medir o que importa, e um padrão de avaliação que evita o piloto eterno."
keywords: ["RAG", "retrieval", "recuperação", "embeddings", "LLM"]
---

A frase que se repete no piloto de RAG quando o resultado decepciona é "o modelo errou". Quase nunca é verdade. O modelo gerou exatamente o que o contexto pedia — só que o contexto era o documento errado, o trecho errado, ou os dois certos sem o terceiro que muda a resposta. A culpa não é da geração; é da recuperação. E como retrieval é menos sexy que LLM, o time gasta semanas afinando prompt e trocando modelo enquanto o problema mora no `top-k`.

Esse texto é sobre por que RAG é difícil onde ninguém olha. Não contra RAG — é a arquitetura certa pra colocar conhecimento próprio dentro de respostas de modelo. Mas o desbalanço entre quanto se fala de geração e quanto se fala de recuperação está custando projetos.

## A geração virou commodity, a recuperação não

Em 2023 escolher LLM era decisão estratégica. Em 2026 é commodity: Claude, GPT, Gemini, Llama — todos respondem bem se o contexto for bom. A fronteira do que diferencia projeto bom de projeto medíocre saiu do modelo e foi pra **o que entra no contexto**.

Recuperação parece simples no slide: usuário pergunta, sistema busca documentos similares por embedding, top-k vai pro LLM, LLM responde. Cada uma dessas etapas tem armadilha. Cada armadilha individual perdoa 5–10% de qualidade. Empilhadas, o sistema entrega resposta certa em 60% dos casos e ninguém entende por quê.

Pior: o LLM esconde o problema. Ele *parece* certo quando responde sobre o documento errado, porque a geração é fluente e confiante. O usuário só percebe que algo está mal calibrado quando bate uma resposta contra a realidade — e aí já está em produção há três meses.

> Em RAG, gerar é a parte fácil. Recuperar o trecho certo, no momento certo, na ordem certa, com o contexto adicional certo — é onde o sistema quebra.

A consequência prática: time que aborda RAG como "problema de LLM" otimiza o que dá menos retorno. Time que aborda como "problema de retrieval" investe onde dói.

## Cinco razões pelas quais retrieval quebra na produção

São os modos de falha que aparecem em quase todo projeto. Vale catalogar antes de começar.

1. **Chunking ingênuo.** Quebrar documento em pedaços de 500 tokens por janela deslizante é o default e raramente o certo. Pedaço corta no meio da definição, perde o título da seção, separa pergunta da resposta. Chunking precisa respeitar a estrutura semântica do documento — capítulos, seções, blocos lógicos — não o relógio de tokens.
2. **Embeddings genéricos sobre vocabulário específico.** Modelos de embedding pré-treinados são bons em linguagem geral. Em domínio técnico (jurídico, médico, financeiro, código), a distância vetorial entre "rescisão" e "encerramento" pode não capturar a nuance que muda a resposta. Sem fine-tuning ou modelos de domínio, o ranking sai enviesado.
3. **Top-k cego.** Pegar os 5 ou 10 trechos mais próximos por similaridade vetorial parece razoável, mas ignora dois fatos: trechos podem ser quase idênticos (redundância) e o trecho que importa pode estar em 12º lugar (perda). Sem reranking, top-k vira loteria.
4. **Falta de query rewriting.** A pergunta que o usuário faz raramente é a pergunta que recupera bem. "O que mudou no contrato?" é vago, pequeno, sem termos técnicos. O sistema precisa reformular a query — expandir, decompor, reescrever em vocabulário do corpus — antes de buscar. Pular essa etapa é entregar busca ruim por design.
5. **Avaliação só na geração.** Time mede qualidade pela resposta final do LLM e tenta otimizar o sistema inteiro pelo output. É como medir um carro inteiro só pela cor: você nunca descobre se o motor é bom. Retrieval precisa ser avaliado *separadamente* da geração — com métricas próprias.

Esses cinco modos respondem por 80% dos pilotos de RAG que ficam presos em "quase funciona". Não tem solução única; tem disciplina de medir cada camada.

## O que medir, em três métricas que importam

Discussão de métrica em RAG é onde a maturidade do time aparece. Três métricas resolvem 90% dos casos.

**Recall@k.** Dos documentos que *deveriam* aparecer no top-k pra responder bem, quantos apareceram. Se você tem um conjunto de perguntas com gabarito (10–50 perguntas com os documentos corretos marcados), recall@10 abaixo de 80% significa que o sistema deixa contexto crítico de fora. Subir modelo ou ajustar prompt não resolve — é problema de busca.

**MRR (Mean Reciprocal Rank).** Em que posição, na média, o trecho certo aparece no ranking. Se MRR está em 0.3, o trecho certo geralmente está em terceiro ou quarto lugar — o LLM lê primeiro o contexto errado e contamina a resposta. Reranking sobe MRR mais do que trocar embedding.

**Faithfulness da resposta ao contexto recuperado.** Mesmo com retrieval bom, o LLM pode alucinar ou inferir além do que o contexto suporta. Métrica: percentual de afirmações na resposta que têm suporte direto no contexto. Abaixo de 90%, o sistema está gerando além da evidência — risco alto em domínios regulados.

Essas três têm que aparecer no dashboard antes de qualquer ajuste fino de prompt. Quem mede só "satisfação do usuário" otimiza no escuro.

## Anatomia de uma pipeline que funciona

A consultoria decente monta RAG em camadas, não como uma chamada de API. O esqueleto que entregamos em projeto sério tem cinco passos, cada um instrumentado.

**Chunking informado pela estrutura.** Quebrar respeitando headings, parágrafos, blocos lógicos. Sobreposição de 10–20% entre chunks adjacentes pra evitar perda de contexto na fronteira. Metadados embutidos: título da seção, hierarquia, fonte, data.

**Indexação híbrida.** Vetor (embedding) + texto (BM25 ou similar). Vetor pega semântica; texto pega termos exatos (nome de produto, código, número de cláusula). Top-k combinado de ambos cobre mais que cada um isolado.

**Query rewriting antes da busca.** Mesmo LLM que vai gerar a resposta — ou um modelo menor dedicado — reformula a pergunta do usuário em 2–3 variantes, expande termos, decompõe pergunta composta. Cada variante busca; resultados se combinam.

**Reranking sobre o top-k expandido.** Pegar top-30 da busca inicial e rodar um reranker (cross-encoder ou LLM com prompt de scoring) que reordena pelos 5–10 mais relevantes pra essa pergunta específica. Esse passo sobe MRR de 0.3 pra 0.6+ na maioria dos domínios. É o melhor retorno por hora de engenharia.

**Geração com citação de fonte.** O LLM responde *e cita o trecho exato* que sustenta cada afirmação. Não é só UX — é o que permite medir faithfulness depois. Sem citação, não há auditoria.

[Como já argumentei sobre quando faz sentido implantar agente](/blog/quando-agente-e-resposta.html), nada disso elimina a necessidade de processo desenhado. RAG amplifica conhecimento existente; não inventa conhecimento que não foi escrito. Se o corpus está vazio, ruim ou desatualizado, o sistema só amplifica essa pobreza.

## Onde a qualidade do corpus entra

E aqui mora a tensão honesta. RAG depende de corpus, e [corpus perfeito não existe](/blog/dado-limpo-e-um-mito.html) — o mesmo princípio que se aplica a dados estruturados se aplica a documentos não estruturados. A pergunta certa não é "o nosso corpus está limpo?", é "o nosso corpus é bom o suficiente pra responder *esse conjunto de perguntas*?".

Operacionalmente, isso significa: comece com o caso de uso, monte o conjunto de avaliação (50 perguntas com gabarito), rode retrieval e veja o gap. Se recall@10 está em 50%, o problema pode ser duas coisas: o corpus não tem a resposta (problema de conteúdo, não de RAG) ou o corpus tem mas não recupera (problema de retrieval). Sem essa separação, o time fica otimizando o sistema errado.

## Para o sponsor que pergunta "por que tão complicado?"

Porque parece simples na demo. Na demo o usuário pergunta o que o engenheiro testou; o sistema acerta. Em produção, a distribuição de perguntas é mais ampla, os documentos são mais sujos, e cada modo de falha aparece. RAG bem feito não é mais caro que RAG mal feito — só é distribuído diferente no tempo. Time que investe duas a três semanas em retrieval evita seis meses de "por que essa resposta tá errada?".

A boa notícia: as cinco razões de falha são conhecidas, as três métricas são padrão, a pipeline em cinco camadas cabe em qualquer projeto sério. O que separa quem entrega de quem fica em piloto é tratar retrieval como produto, não como detalhe de implementação.
