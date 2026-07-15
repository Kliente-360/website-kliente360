---
title: "Apache Iceberg venceu a disputa de table format — o que muda no lakehouse"
slug: "apache-iceberg-table-format-lakehouse"
pillar: "data"
date: "2026-07-15"
readMinutes: 7
excerpt: "Databricks, Snowflake e BigQuery convergiram em Apache Iceberg como padrão de table format — o que muda pra quem decide arquitetura de dado."
tldr: "Apache Iceberg é o table format aberto que virou padrão de facto do lakehouse em 2026, com suporte nativo de Databricks, Snowflake, BigQuery e da maioria dos motores de query relevantes. A disputa que dividia arquitetura de dado em 2023–2024 já não existe mais como escolha técnica — existe como escolha de catálogo e de operação. Este texto explica o que convergiu, o que ainda diverge, e o que muda no planejamento de quem está montando ou revisando uma stack de dado agora."
keywords: ["Apache Iceberg", "table format", "lakehouse", "Delta Lake", "Databricks", "Snowflake"]
---

**Apache** Iceberg venceu. Não no sentido de ter eliminado concorrentes do mercado — Delta Lake continua vivo, Apache Hudi continua vivo — mas no sentido que importa pra quem decide arquitetura: se você está desenhando um lakehouse novo em 2026 e não está pensando em Iceberg como o formato de tabela padrão, está fazendo algo fora da curva.

A disputa de table format que dividia conferência de dados em 2023 e 2024 — Iceberg, Delta Lake ou Hudi, escolha uma vez e conviva com a decisão — deixou de ser uma escolha de arquitetura de armazenamento. Virou escolha de catálogo e de operação. Isso é uma mudança boa pra quem compra tecnologia de dado, mas exige entender onde a convergência é real e onde ainda existe diferença que decide projeto.

## O que convergiu de fato

O sinal mais claro da vitória de Iceberg não é adoção isolada de um vendor — é o fato de que os três maiores concorrentes de warehouse do mercado pararam de tratar Iceberg como ameaça e passaram a construir suporte nativo pra ele.

A **Databricks** — dona do Delta Lake, formato concorrente direto — expõe hoje tabelas Delta como Iceberg (e como Hudi) via Delta Lake UniForm, sem duplicar dado. Unity Catalog passou a gerenciar tabela Iceberg nativamente, e a empresa já avança no suporte a Iceberg v3, com row lineage, deletion vectors e tipo `VARIANT`. Quem construiu confiando só em Delta Lake, sem interoperabilidade, hoje tem esse caminho aberto sem reescrever pipeline.

A **Snowflake** respondeu de um jeito mais estrutural: criou o Polaris Catalog, catálogo REST open-source pra Iceberg, e doou o projeto pra Apache Software Foundation. A mensagem por trás da doação é direta — o cliente pode manter o dado em Iceberg aberto, no próprio storage, e ainda ter o motor de query e a governança da Snowflake por cima. É um convite pra reduzir a fricção de sair, não de prender.

O **BigQuery** entrou pelo caminho mais pragmático: suporta tabela Iceberg como tabela externa e como tabela gerenciada via BigLake, encaixando o formato aberto dentro da mesma superfície de SQL que o cliente já usa.

O resto do ecossistema segue o mesmo movimento. Spark, Trino, Presto, Flink, Hive, Impala, DuckDB, ClickHouse, StarRocks e Dremio têm suporte nativo ou quase-nativo a Iceberg — o que significa que a escolha de motor de query deixou de travar a escolha de formato de tabela, e vice-versa.

> A disputa que era "qual formato escolher" virou "qual catálogo opera esse formato melhor pro seu caso". É uma pergunta mais fácil de responder — e mais fácil de errar sem perceber.

## O que ainda não convergiu

Convergência de formato não é convergência de operação. Três pontos continuam sendo decisão real, não commodity:

1. **Catálogo é onde a disputa comercial migrou.** Polaris (Snowflake/Apache), Unity Catalog (Databricks) e o catálogo nativo do BigQuery competem por ser o lugar onde governança, controle de acesso e descoberta de dado acontecem. Escolher Iceberg como formato não resolve essa escolha — só a adia pra uma camada acima.
2. **Performance de escrita concorrente ainda varia por engine.** Iceberg define o formato da tabela, não como cada motor lida com merge concorrente, compaction automática ou latência de commit. Um mesmo dataset Iceberg pode ter comportamento de escrita bem diferente rodando em Spark versus rodando em Snowflake versus rodando em Flink.
3. **Iceberg v4 promete convergência de metadado — mas ainda não chegou.** A Databricks já sinalizou que a próxima versão do formato vai repensar a estrutura de metadado com uma árvore adaptativa, propondo que Delta 5.0 e Iceberg compartilhem o mesmo layout de metadado no futuro. É a promessa mais ambiciosa da história recente do table format — e, como toda promessa de convergência total, vale tratar como direção, não como estado atual.

O erro comum aqui é ler "Iceberg venceu" como "não importa mais qual plataforma eu escolho". É o oposto: a plataforma [ainda importa — só que a decisão migrou pra outro lugar](/blog/lakehouse-vs-warehouse.html). Antes você escolhia formato e ficava preso a ele. Agora você escolhe catálogo, motor de escrita e operação — e o formato deixou de ser o fator de lock-in.

## Onde isso muda o planejamento de arquitetura

Pra quem está decidindo stack de dado agora, a convergência de Iceberg desloca três perguntas que antes nem faziam parte da conversa:

**Migração entre plataforma ficou mais barata — não gratuita.** Se o dado já está em Iceberg, trocar o motor de query que lê essa tabela é operação de configuração, não de reescrita de pipeline inteiro. Isso reduz o custo de trocar de vendor no médio prazo, mas não elimina o trabalho de migrar catálogo, política de acesso e job de compaction — que continuam específicos de cada operador.

**A pergunta "qual formato escolher" virou "qual catálogo escolher".** Times que já tinham Delta Lake não precisam mais migrar formato pra ganhar interoperabilidade — UniForm resolve isso. O que ainda exige decisão é onde o catálogo vive e quem controla a política de acesso sobre ele.

**Lock-in não desapareceu, só mudou de camada.** A mesma lógica que já vale [na comparação entre Databricks, Snowflake e BigQuery](/blog/databricks-snowflake-bigquery-lock-in.html) continua de pé — só que o eixo de aprisionamento não é mais "em que formato meu dado está preso", e sim "em que catálogo minha governança está presa". Avaliar TCO de saída hoje significa perguntar sobre portabilidade de catálogo, não de tabela.

1. **Se você ainda não escolheu formato:** Iceberg é a escolha padrão hoje — suporte amplo, ecossistema maduro, sem a pergunta "e se eu precisar trocar de motor depois" pesando na decisão.
2. **Se você já tem Delta Lake:** avalie UniForm antes de considerar migração de formato — pode resolver a interoperabilidade que você precisa sem reescrever pipeline.
3. **Se a preocupação real é lock-in:** direcione a due diligence pro catálogo (Polaris, Unity Catalog, nativo do BigQuery), não mais pro formato de tabela — é aí que a portabilidade real se decide agora.

## A convergência de formato não elimina a due diligence — desloca ela

O ganho prático de Iceberg ter virado padrão é real: menos risco de escolher o formato errado, mais liberdade pra trocar motor de query sem reescrever a camada de armazenamento. Mas [decidir arquitetura de dado](/blog/multi-cloud-mito-ou-estrategia.html) continua sendo um exercício de entender onde a dependência real mora — e essa dependência só migrou de "formato de tabela" pra "catálogo e operação".

Quem trata a vitória de Iceberg como "problema resolvido, não preciso mais avaliar plataforma" vai descobrir a fricção real no dia em que precisar migrar catálogo entre dois provedores que implementam a mesma especificação de formas sutilmente diferentes. A due diligence não acabou. Só ficou uma camada mais alta — e, pra maioria dos times, mais fácil de fazer direito do que era escolher formato às cegas em 2023.

## Perguntas que sempre voltam

Fechando, as dúvidas mais comuns sobre o que a convergência em Iceberg muda na prática.

## O que é Apache Iceberg?

Apache Iceberg é um table format aberto — uma especificação de como organizar metadado, schema e arquivos de dado sobre armazenamento de objeto (S3, GCS, Azure Blob) pra que múltiplos motores de query leiam e escrevam a mesma tabela com garantias transacionais (ACID), evolução de schema e time travel. Diferente de um banco de dado, Iceberg não é um motor de execução — é a camada que permite que Spark, Trino, Snowflake, BigQuery e outros operem sobre o mesmo dado sem cópia nem conversão.

## Preciso migrar meu Delta Lake pra Iceberg agora?

Na maioria dos casos, não é preciso migrar formato — é preciso ativar interoperabilidade. Se sua stack já roda Delta Lake, o Delta Lake UniForm da Databricks expõe as mesmas tabelas como Iceberg (e Hudi) sem duplicar dado, o que resolve a maior parte da dor de compatibilidade que motivaria uma migração completa. Migração de formato só se justifica quando o motivo real é trocar de operador de catálogo, não ganhar leitura cruzada — e isso vale avaliar caso a caso, não por padrão de mercado.

## Iceberg virar padrão elimina o risco de lock-in?

Não elimina — desloca. Antes, o risco de aprisionamento estava concentrado no formato de tabela: trocar de plataforma significava reescrever pipeline de armazenamento. Com Iceberg amplamente suportado, esse risco específico caiu. Mas o catálogo que gerencia a tabela Iceberg — Polaris, Unity Catalog, ou o nativo de cada provedor — virou o novo eixo de dependência: governança, controle de acesso e descoberta de dado continuam específicos de cada operador, e migrar isso ainda exige trabalho real.
