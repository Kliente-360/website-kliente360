---
title: "Databricks vs Snowflake vs BigQuery: lock-in, custos de saída e o que o parceiro oficial não fala"
slug: "databricks-snowflake-bigquery-lock-in"
pillar: "data"
date: "2026-05-06"
readMinutes: 8
excerpt: "Os três warehouses entregam performance equivalente. A diferença real está no que cada um custa pra abandonar — e nenhum parceiro oficial vai te contar isso na proposta."
tldr: "A escolha entre Databricks, Snowflake e BigQuery se decide menos por performance — os três estão em paridade técnica ampla — e mais por lock-in: formato de armazenamento, camada de processamento e integração com o ecossistema da cloud. Databricks usa formato aberto (Delta), mas prende via notebooks, MLflow e Unity Catalog; Snowflake e BigQuery usam formato proprietário — migração reversa de 50TB do Snowflake custa US$ 200k–500k em consultoria. Como medir os três vetores antes de assinar, e por que parceiro oficial nunca pode ser a fonte da resposta."
keywords: ["Databricks", "Snowflake", "BigQuery", "lock-in", "data warehouse"]
---

**A** pergunta que toda empresa faz antes de escolher warehouse é "qual é melhor?". A pergunta que ninguém faz, mas devia, é "qual é mais caro de abandonar?". Em 2026, com Databricks, Snowflake e BigQuery em paridade técnica ampla, a diferença prática que vai pesar nos próximos 5–10 anos é lock-in — e cada um dos três tem padrão de aprisionamento diferente, com custo de saída diferente, e camada de marketing diferente pra obscurecer isso.

Esse texto enumera os três vetores de lock-in que importam, mostra como cada warehouse pontua em cada um, e explica por que comparativo de parceiro oficial é, por definição, parcial. Não porque o parceiro mente — porque ele só consegue ver bem a tecnologia que entrega.

## O viés estrutural do parceiro oficial

Antes de entrar nos vetores, vale entender por que comparativos de parceiros são problemáticos. Parceiro Databricks Gold ganha receita treinando time em Spark, otimizando Delta Lake, vendendo Unity Catalog. Parceiro Snowflake Premier ganha receita estruturando warehouses Snowflake, otimizando warehouses de cluster, vendendo Streamlit. Parceiro Google Cloud ganha receita em BigQuery + Looker + Vertex AI.

Nenhum dos três pode honestamente recomendar que o cliente saia da sua plataforma — não por má-fé, mas porque a expertise está toda concentrada num lado da escolha. Pedir a um parceiro Databricks pra comparar com Snowflake é pedir a um treinador de futebol pra recomendar academia de natação. A resposta pode ser tecnicamente correta na superfície e estruturalmente enviesada na conclusão.

Consultoria agnóstica — sem incentivo de revenda — é o único arranjo em que a comparação consegue ser honesta. Não é o caso geral do mercado. Daí esse texto.

> A pergunta "qual warehouse é melhor?" tem 80% da resposta no comparativo público. Os 20% que decidem são lock-in — e ninguém com incentivo de revenda vai te entregar esse pedaço.

## Vetor 1 — Formato de armazenamento

Aqui mora o lock-in mais antigo e mais sério. Quando dado está em formato proprietário fechado, migrar exige reescrever, reprocessar, e validar tudo.

**Snowflake** usa formato proprietário interno (FDN — Flexible Data Network). Cliente Snowflake puro tem todos os dados num formato que só Snowflake lê. Recentemente, Snowflake passou a suportar Iceberg (formato aberto) como mesa externa, mas a operação default ainda é interna. Saída plena exige `COPY INTO` de todas as tabelas pra S3 em Parquet, depois reingestão em outro warehouse. Em volume de 50TB, projeto de migração reversa custa US$ 200k–500k em consultoria especializada.

**Databricks** com Delta Lake usa formato aberto (Delta) sobre storage do cliente (S3/ADLS/GCS). Dado fica no cloud storage do cliente, em formato que Spark, DuckDB, Trino e outros leem. Migração reversa pra outro engine processador é trivial — basta apontar engine novo pro mesmo bucket. Lock-in do Databricks está em outro lugar (próximo vetor), não no formato.

**BigQuery** usa formato proprietário (Capacitor). Suporta exportação pra Parquet em GCS, mas dado interno é fechado. Saída plena exige extração completa via export jobs, similar ao Snowflake. Diferença vs Snowflake: BigQuery Storage Read API permite leitura externa sem exportação intermediária — facilita stack híbrido, mas não elimina lock-in.

Pontuação prática:
1. **Databricks**: lock-in baixo (formato aberto).
2. **BigQuery**: lock-in médio (proprietário, mas com API de leitura externa).
3. **Snowflake**: lock-in alto (proprietário, exportação custosa, embora Iceberg esteja entrando).

## Vetor 2 — Camada de processamento e SQL específico

Mesmo com dado portável, a camada de compute e a sintaxe SQL criam dependências sutis.

**Snowflake** tem SQL ANSI bem aderente, com extensões proprietárias (Snowpark, JavaScript UDFs, Streamlit, Cortex AI) que não migram. Empresa que adota Cortex pra análise generativa fica presa nesse vendor pra essa função. Stored procedures em Snowflake JavaScript são reescrita total em outra plataforma.

**Databricks** tem múltiplos engines (Spark SQL, Photon, próprio SQL serverless). Spark é portável (qualquer cloud, OSS). Photon é proprietário mas, sendo otimização sob a hood, não cria lock-in sintático. UDFs em Python/Scala são portáveis (qualquer Spark roda). Lock-in real do Databricks: notebooks, MLflow, Unity Catalog, e Workflows — esses são caminho exclusivo. Equipe que se acostuma com Databricks Notebooks tem fricção alta em outra ferramenta.

**BigQuery** tem SQL standard próximo do ANSI, com extensões (ARRAY, STRUCT nativos, BQML, BigQuery ML). BQML pra modelos de machine learning é função poderosa mas exclusiva — migração pra outro engine exige reescrever modelos em Python/Spark. Geo functions e ARRAY/STRUCT são mais flexíveis que em Snowflake mas, ao mesmo tempo, criam código que não roda em outro lugar sem refatoração.

Pontuação prática:
1. **Databricks**: lock-in médio (Spark portável, mas notebook/MLflow/Unity Catalog grudam).
2. **Snowflake**: lock-in médio-alto (SQL portável, UDFs e Cortex não).
3. **BigQuery**: lock-in médio-alto (SQL próximo do padrão, BQML e funções específicas não).

## Vetor 3 — Integração com ecossistema da cloud

O lock-in mais subestimado: quanto o warehouse está costurado com outros serviços da mesma cloud.

**BigQuery** vive dentro do Google Cloud. Integração nativa com Looker, Vertex AI, Pub/Sub, Dataflow, Cloud Storage. Migração reversa não é só warehouse — é renegociar todo o stack de dados que ficou em torno. Empresa com Looker + BigQuery + Vertex AI tem que migrar três produtos juntos. Custo de saída cresce exponencialmente com tempo dentro do GCP.

**Snowflake** roda multi-cloud (AWS, Azure, GCP). Esse é o argumento de marketing principal — "Snowflake é neutro entre clouds". É verdade no compute — mas [arquitetura multi-cloud intencional tem overhead operacional que vai muito além de escolher warehouse neutro de cloud](/blog/multi-cloud-mito-ou-estrategia.html). Não é verdade em integrações: Snowflake Native Apps, Snowpark Container Services, Streamlit, Cortex são exclusivos. Time que adota essas camadas re-cria lock-in em outro nível.

**Databricks** roda em AWS, Azure e GCP nativamente. Tem integrações profundas com cada uma (especialmente Azure, via Microsoft partnership), mas o motor é portável entre clouds — workspace em AWS migra pra Azure com custo menor que outras opções. Lock-in real está em Unity Catalog (camada de governança) e Workflows (orquestração) — esses se migram com refatoração, não com simples export.

Pontuação prática:
1. **Databricks**: lock-in baixo-médio em ecosistema (multi-cloud + motor portável).
2. **Snowflake**: lock-in médio (compute multi-cloud, mas features novas grudam).
3. **BigQuery**: lock-in alto (vive dentro do GCP, integrações nativas criam dependência composta).

## Como medir antes de assinar

Quatro perguntas práticas pra fazer antes de fechar contrato anual.

1. **Qual % dos dados ficam em formato aberto?** Se < 50%, lock-in técnico significativo. Negociar suporte explícito a Iceberg/Delta como tabelas externas.
2. **Quanto código SQL é portável (ANSI puro)?** Audita as 50 queries mais críticas. Se mais de 30% usa funções proprietárias, migração é refatoração, não export.
3. **Quantas integrações nativas com outros produtos da mesma cloud?** Se a stack inteira vive numa cloud só, mover warehouse é mover stack inteiro.
4. **Qual o custo estimado de exportação completa?** Pedir ao parceiro a estimativa de US$/TB pra `COPY INTO`/`EXPORT`. Se ele não souber ou desviar, é sinal vermelho.

Empresa que faz essas 4 perguntas antes de assinar paga mais barato, negocia cláusulas melhores, e quase nunca precisa migrar. Empresa que não faz, paga 3 anos no warehouse errado e descobre o custo de saída quando o orçamento dobra.

## A escolha honesta em 2026

Sem viés de revenda, a recomendação por contexto:

**Greenfield com prioridade em portabilidade**: Databricks com Delta Lake. Storage do próprio cliente, formato aberto, motor multi-cloud. Lock-in mínimo possível pra warehouse moderno.

**Empresa já em Azure ou multi-cloud com cargas mistas**: Databricks ou Snowflake. Decisão por força do time existente.

**Empresa already-Google-cloud**: BigQuery, sem hesitação — mas ciente de que está aceitando lock-in alto em troca de integração nativa profunda. Não é decisão errada, é decisão informada.

**Caso de uso analytical puro, sem ML pesado, time pequeno**: Snowflake. Operação mais simples, SQL puro, sem necessidade de gerir Spark.

**Caso de uso analytical + ML em escala**: Databricks (ou BigQuery + Vertex se já no Google). Snowflake com Snowpark resolve só parcialmente.

Importante: nenhuma dessas recomendações vem de [comparativo de mid-market](/blog/snowflake-bigquery-databricks.html) puro. Vem de lock-in específico. Pra cada caso, a pergunta "quanto custa sair?" é tão importante quanto "quanto custa rodar?". Parceiros oficiais respondem a segunda. A primeira fica pro cliente pesquisar — ou pra consultor agnóstico responder. Há razão estrutural pra esse arranjo.
