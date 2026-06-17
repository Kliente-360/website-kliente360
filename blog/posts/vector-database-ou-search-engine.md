---
title: "Vector database não é obrigatório em RAG — quando o índice clássico ganha"
slug: "vector-database-ou-search-engine"
pillar: "ai"
date: "2026-06-17"
readMinutes: 7
excerpt: "RAG não exige vector database. BM25 e busca híbrida ganham em queries exatas e docs estruturados — com menos custo e complexidade operacional."
tldr: "Vector database virou pressuposto padrão em arquiteturas RAG, mas não é requisito. Quando o corpus tem identificadores exatos, campos estruturados ou queries de termos específicos, BM25 e busca híbrida recuperam melhor — com latência menor e infra mais simples. Cinco perguntas decidem qual arquitetura usar."
keywords: ["vector database", "RAG", "BM25", "busca híbrida", "search engine", "recuperação semântica"]
---

O tutorial padrão de RAG tem sempre o mesmo pipeline: divide o documento em chunks, gera embedding de cada chunk, guarda no vector database, busca por similaridade semântica, injeta o resultado no prompt. O pipeline funciona bem o suficiente pra demo. Em produção, o pressuposto de que "RAG = vector database" produz complexidade operacional desnecessária e, em muitos casos, recuperação pior do que um índice simples de texto entregaria.

Vector database é uma ferramenta excelente — para o problema certo. O problema é quando vira ferramenta padrão antes de qualquer análise do tipo de documentos e do tipo de consultas. Esse texto é sobre quando o índice clássico — BM25, Elasticsearch, índice invertido — faz mais sentido que embedding semântico, e como busca híbrida captura o melhor dos dois mundos na maioria dos casos corporativos.

## O que vector database resolve — e onde o pressuposto quebra

Vector database armazena representações matemáticas (embeddings) de trechos de texto e busca por proximidade semântica: "qual chunk é mais *parecido* com o que o usuário perguntou?". Funciona excepcionalmente bem quando a pergunta e a resposta usam vocabulários diferentes que expressam a mesma ideia. "Como cancelar meu plano?" deve recuperar documentos que descrevem "procedimento de rescisão" — sem vetor, o match por keyword falharia.

Mas há uma classe grande de consultas corporativas que não funciona assim. O usuário pergunta "qual é o prazo de garantia do produto X47-BR?" — e a resposta está literalmente escrita como "produto X47-BR: garantia de 12 meses". Aqui, similaridade semântica não adiciona nada. O que importa é que o documento *contém exatamente* os termos da query. Busca por palavra-chave resolve isso melhor e mais rápido.

O pressuposto desmorona quando você olha para o corpus real das empresas:

- **Documentos técnicos** com codificação específica: SKUs, CNPJ, número de contrato, referência de cláusula.
- **Bases de FAQ** com pergunta e resposta padronizadas e vocabulário controlado.
- **Manuais de produto** onde o título da seção já mapeia diretamente para a query possível.
- **Tabelas regulatórias** onde "alíquota para serviço X" é dado exato, não semântico.

Nesses casos, embedding adiciona latência (gerar vetor da query em cada requisição), custo (modelo de embedding mais infra do vector store) sem entregar vantagem de recuperação. [A recuperação é o gargalo em RAG, não o LLM](/blog/rag-na-pratica.html) — e escolher o método de recuperação errado é o modo de falha mais subestimado em projetos que ficam presos em "quase funcionando".

## Quando BM25 recupera melhor que embedding?

BM25 (Best Match 25) é o algoritmo de relevância padrão do Elasticsearch, OpenSearch e da maioria dos sistemas de busca maduros. É aperfeiçoamento de TF-IDF: ranqueia documentos pela frequência dos termos da query, ajustada pela raridade do termo no corpus e pelo tamanho do documento.

Parece simples. E é — o que é uma vantagem, não um defeito. Quatro cenários específicos em que BM25 ganha:

1. **Queries com termos exatos e raros.** Número de pedido, código de produto, referência legal ("art. 5º, §2º"), identificador técnico. A raridade do termo no corpus já é sinal forte de relevância — vetor não adiciona nada sobre "qual chunk menciona exatamente esse código".
2. **Corpus com vocabulário controlado.** Documentos técnicos onde os autores usam terminologia padronizada: manual do fabricante, regras de negócio documentadas, procedimento operacional padrão. O usuário que conhece o vocabulário busca exatamente os termos certos. Matching direto supera similaridade cossenoidal aqui.
3. **Latência crítica.** Gerar embedding da query em tempo real adiciona 100–300ms com modelo hosted, mais com on-premise. BM25 sobre índice invertido é sub-milissegundo. Em chatbots de alta carga ou aplicações conversacionais de voz, a diferença é percebida diretamente pelo usuário.
4. **Corpus pequeno e estável.** Reindexar vector store quando documentos mudam tem custo real — é necessário re-embedar os chunks alterados, versionando o modelo de embedding. Para corpus de 200 documentos com baixo turnover, um índice Elasticsearch é operacionalmente mais simples e igualmente eficaz.

> Vetor resolve o que keyword não alcança. Keyword resolve o que vetor complica. Misturar os dois é a arquitetura que cobre os dois casos sem escolher um único vencedor.

## Busca híbrida — o terceiro caminho

A boa notícia: em sistemas de produção modernos a escolha não precisa ser exclusiva. **Busca híbrida** combina ranking de keyword (BM25) com ranking de embedding (vetorial) e mescla os resultados via Reciprocal Rank Fusion (RRF) ou weighted blending.

Elasticsearch e OpenSearch têm busca híbrida nativa desde 2023–2024. pgvector combinado com `pg_trgm` implementa a mesma lógica sem sair do PostgreSQL. Pinecone e Weaviate têm sparse/dense hybrid mode. A maioria das stacks de RAG corporativo madura hoje usa híbrido como default — não por moda, mas porque cobre mais casos sem abrir mão de latência aceitável.

O padrão que recomendamos em projetos corporativos:

1. **BM25 como âncora.** Executa primeiro, traz os candidatos com alto match de keyword — especialmente crítico para queries com termos exatos ou identificadores.
2. **Embedding como re-ranker semântico.** Sobre o top-50 do BM25, aplica similaridade vetorial para reordenar os 10–15 candidatos finais — captura a variação semântica que BM25 perderia.
3. **Cross-encoder opcional.** Em domínios de alta precisão (compliance, suporte técnico especializado, jurídico), adicionar um reranker cross-encoder sobre o top-15 final sobe qualidade de forma significativa — ao custo de 150–400ms extras.

Esse desenho usa vector database onde ele é bom (reordenação semântica fina) e BM25 onde ele é superior (filtragem por termo exato e escala). [A escolha entre Pinecone, Weaviate e pgvector impacta mais custo operacional e modelo de deploy do que performance bruta de recall](/blog/vector-databases-comparados.html) — e em muitos casos, o pgvector dentro do PostgreSQL existente já é suficiente para o componente vetorial do híbrido, sem infra adicional.

## Quais perguntas decidem a arquitetura de recuperação?

Antes de escolher vector database, busca clássica ou híbrido, cinco perguntas posicionam o projeto corretamente:

1. **Os documentos têm identificadores ou campos exatos que as queries vão referenciar?** SKUs, CPFs, códigos, datas, referências contratuais. Se sim, BM25 precisa estar no pipeline — sem ele, queries com esses termos recuperam sistematicamente mal.
2. **O vocabulário do corpus é controlado ou varia livremente?** Manual técnico padronizado → BM25 forte. Corpus de e-mails, notas de reunião, textos livres → embedding é necessário para capturar variação semântica entre termos.
3. **Qual é a frequência de atualização do corpus?** Alto turnover de documentos → custo de re-embedding é real; considerar se BM25 puro não atende. Corpus estável → vector store se justifica mais com menor custo de manutenção.
4. **Há requisito de latência que o pipeline precisa atender?** Sub-200ms por resposta → eliminar ou minimizar etapas de embedding em tempo de execução. Latência relaxada → híbrido completo sem concessões.
5. **O time tem capacidade operacional de manter vector store em produção?** Infra de vector database exige versionamento de embeddings, monitoramento de drift semântico e atualização do modelo quando versão descontinua. Sem equipe com essa especialidade, pgvector no banco existente ou Elasticsearch puro é decisão técnica defensável.

Essas perguntas também protegem de um erro adjacente: escalar para vector database em projeto pequeno onde nenhuma das condições que justificam o investimento está presente.

## Quando a escolha vira reflexo, não decisão

Uma observação sobre o que costuma andar errado. A escolha de vector database versus search engine clássico frequentemente não é decisão técnica — é decisão de referência. O tutorial usou Pinecone; o notebook de exemplo usou ChromaDB; o default do LangChain era FAISS. Ninguém parou para perguntar se é o certo para o corpus específico em questão.

O resultado: projetos de RAG em produção com vector database rodando sobre corpus de 300 documentos técnicos com campos exatos, onde Elasticsearch com BM25 teria entregado recall 15% melhor, latência 5× menor e zero infra adicional. Esse custo técnico não aparece no piloto — aparece na primeira semana de produção quando o agente não encontra "produto X47-BR" e o time de dados não sabe explicar por quê.

[A decisão entre RAG e fine-tuning tem um framework estruturado](/blog/quando-fine-tuning-supera-rag.html) que cobre a escolha arquitetural no nível mais alto. A decisão dentro de RAG — qual mecanismo de recuperação usar — merece o mesmo rigor. Vector database é uma peça excelente de infraestrutura. Não é a única peça, e raramente deve ser a primeira escolha sem análise do que o corpus e as queries realmente exigem.
