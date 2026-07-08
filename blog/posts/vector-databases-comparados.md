---
title: "Vector databases comparados: Pinecone, Weaviate, pgvector — quando cada um faz sentido"
slug: "vector-databases-comparados"
pillar: "ai"
date: "2026-03-03"
readMinutes: 6
excerpt: "Toda discussão de RAG mira o LLM. Mas onde os embeddings vivem decide latência, custo e escala. Comparação honesta dos três caminhos populares em 2026."
tldr: "A escolha entre Pinecone, Weaviate e pgvector se decide pelo contexto operacional, não pela performance bruta — em benchmark os três entregam parecido. Pinecone otimiza pra operação grande e gerenciada, acima de ~50M de embeddings ou multi-região. Weaviate entrega flexibilidade open-source com RAG nativo e filtragem híbrida pesada. pgvector é a opção que ninguém quer admitir que basta em 70% dos casos de médio porte, até ~10M de embeddings."
keywords: ["vector database", "Pinecone", "Weaviate", "pgvector", "RAG"]
---

A reunião de arquitetura de RAG quase sempre tem o mesmo desvio: 80% do tempo discutindo qual LLM usar, 20% discutindo qual vector database. A proporção devia ser inversa. [Em RAG, a recuperação é o gargalo](/blog/rag-na-pratica.html), e onde os embeddings vivem decide latência, custo, escala e operabilidade da solução em produção. Trocar de LLM em 2026 é commodity; trocar de vector DB depois de ter 50 milhões de embeddings indexados não é.

Esse texto compara as três opções populares — **Pinecone**, **Weaviate** e **pgvector** — com a régua que importa: contexto operacional, não benchmark bruto.

## O que três caminhos diferentes realmente são

Antes de comparar, vale separar o que cada um representa em design.

**Pinecone.** Serviço gerenciado, fully cloud, otimizado pra operação grande sem ter que pensar em infra. Pay-as-you-go por vetor armazenado e por query. Foco em estabilidade operacional, baixa latência consistente, escala horizontal automática. É a opção que vende pro CTO que não quer time de infra dedicado pra vetor.

**Weaviate.** Open-source com versão cloud gerenciada. Mais que vector DB — entrega RAG nativo (módulos de embedding, geração, reranking embutidos), filtragem híbrida, schema-aware. Foco em flexibilidade de arquitetura e em quem quer rodar próprio (on-prem ou nuvem privada). É a opção que agrada engineer que gosta de configurar.

**pgvector.** Extensão do PostgreSQL. Não é "vector DB" — é Postgres com suporte a vetor. Não escala como Pinecone, não tem features de RAG nativas como Weaviate. Mas é Postgres — que sua empresa já roda, sua equipe já conhece, seu backup já cobre. É a opção que ninguém menciona em conferência mas que resolve mais casos do que admitem.

A escolha entre os três raramente é "qual é mais rápido" (todos são rápidos o suficiente em escopo médio). É "qual cabe na sua operação".

## Quando Pinecone faz sentido

Três contextos onde Pinecone se justifica:

**Operação em escala já-grande ou previsível-grande.** Acima de ~50M de embeddings, ou com necessidade de latência consistente sub-50ms global. Pinecone é arquiteturalmente otimizado pra esse range.

**Time sem appetite pra operar infra de vetor.** Quando o trade-off de pagar 3× mais pra não cuidar de cluster, sharding, scaling, backup do índice vetorial vale o dinheiro. Time pequeno focado em produto, não em platform.

**Multi-região com SLA agressivo.** Se a aplicação precisa servir RAG com baixa latência em América, Europa, Ásia, Pinecone tem replicação global gerenciada que custaria muito caro pra replicar com Weaviate ou pgvector.

Fora desses três, Pinecone tende a ser overshoot. Time já tem capacidade técnica e operação não é gigante? Vale considerar os outros dois.

## Quando Weaviate faz sentido

Weaviate ocupa o meio-termo:

**Necessidade de RAG nativo no banco.** Weaviate embute módulos de embedding, geração e reranking. Se sua arquitetura quer pipeline RAG completo dentro do banco — em vez de orquestrar Python externo — Weaviate entrega isso. Pinecone exige stack adicional; pgvector também.

**Filtragem híbrida pesada.** Quando query precisa combinar busca vetorial + filtro estruturado complexo (categoria + data + tenant + tag), Weaviate tem otimização forte. Pinecone tem filtragem mas com limites; pgvector depende de Postgres puro.

**Soberania de dado / on-prem.** Empresa precisa rodar o banco em sua própria infra (compliance, custo, controle). Weaviate open-source roda em Kubernetes, Docker, máquina dedicada. Pinecone é só cloud.

Weaviate sofre quando time não tem expertise em operar banco distribuído. Configurar bem exige conhecimento — diferente de Pinecone (sem configuração) e de pgvector (Postgres conhecido).

## Quando pgvector faz sentido (mais vezes do que se admite)

O caso menos discutido e mais subestimado em 2026:

**Volume médio (até ~10M de embeddings).** Postgres com pgvector + ivfflat ou HNSW resolve queries em <100ms nesse range. Acima disso, começa a sofrer. Mas a maioria das empresas brasileiras de médio porte está abaixo desse teto.

**Empresa já tem Postgres em produção.** Mesmo time, mesmo backup, mesma observabilidade. Adicionar pgvector é configurar uma extensão, não adotar nova tecnologia. Custo operacional incremental: próximo de zero.

**RAG sobre dado relacional.** Quando os embeddings precisam ser cruzados com dados estruturados (tabela de clientes, produtos, transações), pgvector permite JOIN nativo. Pinecone e Weaviate exigem orquestração externa.

A objeção comum: "mas pgvector não escala". Verdade — não escala como Pinecone. Pra empresa com 5M de embeddings e crescendo 10% ao ano, vai funcionar muito bem por 4–5 anos. Por que comprar Ferrari pra ir ao mercado?

> Em 70% dos casos brasileiros de médio porte, pgvector resolve o caso de uso. Os outros 30% justificam Pinecone ou Weaviate. Inverter essa proporção é o erro mais caro de RAG em 2026.

## Os critérios honestos pra escolher

A régua que aplicamos antes de qualquer projeto:

1. **Volume esperado em 18 meses, não hoje.** Subestimar leva a migração; superestimar leva a overspend. Calcular: nº de documentos × chunks por doc × tamanho médio de embedding × multiplicador de safety (1.5–2×).
2. **Latência aceitável pelo caso de uso.** Chatbot interno tolera 500ms. Assistente de pesquisa em tempo real exige <100ms. Sub-50ms global custa muito. Calibrar pelo uso, não pelo desejo.
3. **Padrão de query.** Busca vetorial pura? Combinada com filtro? JOIN com dado relacional? Resposta muda completamente a escolha.
4. **Capacidade operacional do time.** Time pequeno sem expertise em distribuído = Pinecone ou pgvector (se cabe). Time forte em Kubernetes/banco = Weaviate vira viável. Forçar contra esse perfil custa caro.
5. **Compliance e localização.** Dado sensível, restrição de geografia, requisito de on-prem. Pinecone (cloud-only) sai automaticamente em casos restritos.

Quem responde os cinco sem hesitar sabe escolher. Quem hesita ainda não tem caso de uso definido — e a escolha vai ser feita por hype, não por necessidade.

## A armadilha do "vamos começar com X e migrar depois"

A frase que parece pragmática e que custa caro: "vamos começar com Pinecone, e se ficar caro migramos pra pgvector". Migração de vector DB com volume produtivo é projeto sério — reindexar 20M de embeddings com geração nova, validar paridade, redirecionar tráfego sem perda. Custa 6–12 semanas de engenharia sênior.

A versão menos cara: começar simples (pgvector) e subir pra Pinecone/Weaviate quando *de fato* não couber mais. Migrar pra cima é mais barato que migrar pra baixo (porque os requisitos novos que justificam upgrade já estão claros). Migrar pra baixo é cortar features e perder operacionalmente.

Quem escolhe Pinecone "por garantia" gasta 5–10× mais no primeiro ano e raramente usa a capacidade. Quem escolhe pgvector e escala depois paga progressivo, conforme o caso de uso provar valor.

## A decisão pra 2026

Se você está parado nessa escolha hoje, três movimentos honestos antes de assinar:

**Calcular volume real em 18 meses.** Se cabe em pgvector, comece em pgvector. Se passa de 50M, pule pra Pinecone. Entre os dois, depende dos critérios 3–5.

**Pilotar com dado real, não benchmark sintético.** Os três entregam ~similar em benchmark. Em dado real, com query real, com filtro real, as diferenças aparecem. Piloto de 2 semanas com 1M de embeddings reais já mostra qual encaixa.

**Lembrar que vector DB é peça, não estratégia.** [O retrieval é o gargalo](/blog/rag-na-pratica.html), mas dentro do retrieval, a escolha do banco é só uma camada. Sem chunking bom, embedding adequado e reranking, qualquer banco vai entregar resultado medíocre.

A pior decisão é gastar três meses escolhendo o vector DB perfeito e três semanas implementando RAG ruim. A melhor é escolher o banco "bom o suficiente pro caso de uso" e investir o tempo economizado na qualidade do pipeline.
