---
title: "Postgres na plataforma de dados: quando o banco do app muda de casa"
slug: "postgres-plataforma-de-dados-lakebase"
pillar: "data"
date: "2026-11-18"
readMinutes: 7
excerpt: "Lakebase e Snowflake Postgres levam o banco da aplicação para dentro da plataforma de dados. Cinco perguntas para decidir quando a mudança compensa."
tldr: "Lakebase (Databricks) e Snowflake Postgres são bancos PostgreSQL gerenciados pelo próprio fornecedor da plataforma de dados, com um caminho nativo entre o dado transacional e o analítico. Eles não fundem OLTP e OLAP em um motor só: mudam quem opera a ponte entre os dois e sob qual governança. A mudança compensa para aplicações novas, memória de agentes e dados servidos a modelos; para o banco central de um sistema legado com carga pesada, o banco dedicado continua mais seguro."
keywords: ["Postgres na plataforma de dados", "Databricks Lakebase", "Snowflake Postgres", "OLTP e OLAP", "pg_lake", "banco de dados para agentes"]
---

**Postgres na plataforma de dados** era uma ideia estranha até 2025. O banco da aplicação morava de um lado, o warehouse do outro, e entre os dois corria um pipeline de captura de mudanças que alguém do time precisava manter. Em maio de 2025, a Databricks anunciou a compra da Neon, empresa de Postgres serverless, por cerca de US$ 1 bilhão. Pouco depois, a Snowflake comprou a Crunchy Data, com valor reportado de cerca de US$ 250 milhões. Em 2026, os dois produtos que saíram dessas compras chegaram à disponibilidade geral.

A pergunta que chega ao decisor é direta: o banco da minha aplicação deveria morar dentro da plataforma de dados que eu já pago? A resposta curta é "às vezes". Este texto separa o que esses produtos de fato entregam, o que continua igual e cinco perguntas para decidir caso a caso. Onde o número é de fornecedor, dizemos que é de fornecedor.

## O que Lakebase e Snowflake Postgres são, de fato

Os dois são PostgreSQL gerenciado, operado pelo fornecedor da plataforma de dados, com um caminho nativo para o lado analítico. A diferença está no desenho desse caminho.

O **Lakebase** herda a arquitetura da Neon: armazenamento separado da computação, escala automática, desligamento quando ocioso (*scale-to-zero*) e cópias instantâneas do banco para desenvolvimento (*branching*). Segundo o [anúncio de disponibilidade geral da Databricks](https://www.databricks.com/blog/databricks-lakebase-generally-available), de fevereiro de 2026, ele suporta até 8 TB por instância, Postgres 17 com pgvector, recuperação a um ponto no tempo e *sync tables* que mantêm o dado operacional sincronizado com o lakehouse sob o Unity Catalog. A disponibilidade geral começou pela AWS, chegou ao Azure em março e ao Google Cloud no fim de outubro.

O **Snowflake Postgres** parte da tecnologia da Crunchy Data e do pg_lake, extensão que a Snowflake abriu sob licença Apache em novembro de 2025. Com ela, o próprio Postgres lê e escreve tabelas Apache Iceberg e arquivos Parquet no object storage. A Snowflake afirma compatibilidade com aplicações Postgres existentes, suporte a extensões como pgvector e PostGIS, e o serviço está em disponibilidade geral na AWS e no Azure.

> Nenhum dos dois funde transacional e analítico em um motor só. Eles mudam quem opera a ponte entre os dois.

Esse ponto importa porque a tese de que "OLAP não vive no OLTP", que defendemos ao revisar [o que sobreviveu do Modern Data Stack em 2026](/blog/modern-data-stack-2026.html), continua de pé. O banco transacional segue sendo Postgres, com os limites de Postgres. O warehouse segue sendo warehouse. O que muda é o endereço e a conta.

## Por que os fornecedores de dados querem o banco do app

O argumento comercial tem dois lados. O primeiro é a ponte. Quem já leu nossa análise sobre [a promessa do zero-ETL](/blog/zero-etl-mito-ou-realidade.html) reconhece o padrão: o fornecedor assume a replicação entre banco e analítico, e o time deixa de manter conector de CDC escrito à mão. É um ganho real para quem hoje opera essa ponte com dois ou três pipelines frágeis.

O segundo lado são os agentes. Na compra da Neon, a Databricks informou que mais de 80% dos bancos criados na plataforma eram provisionados por agentes de IA, não por pessoas. É dado da própria empresa, não medição independente, mas indica a direção: agentes e aplicações geradas por IA precisam de bancos pequenos, baratos e descartáveis, criados e apagados em segundos. Memória persistente de agente, dados servidos a modelos em tempo real e analytics embarcado em aplicação são os casos de uso que os dois fornecedores destacam.

Para o fornecedor, há ainda um terceiro motivo, menos dito: o banco operacional é o lugar onde o dado nasce. Quem hospeda o nascimento do dado tem vantagem para hospedar todo o resto.

## O que não muda quando o Postgres entra na plataforma de dados

O Postgres gerenciado pela plataforma de dados continua sendo Postgres. Isso traz boas e más notícias.

A boa é a saída. Por ser compatível com Postgres, o banco pode ser exportado com as ferramentas de sempre, como `pg_dump` e replicação lógica. O risco de ficar preso é menor do que em um formato proprietário.

A má é que os recursos que justificam a mudança (sincronização com o lakehouse, *branching*, governança unificada) são do fornecedor, não do Postgres. Sair do banco é fácil; sair do jeito de trabalhar construído em volta dele, não. É a mesma lógica que descrevemos em [lock-in e custos de saída entre Databricks, Snowflake e BigQuery](/blog/databricks-snowflake-bigquery-lock-in.html), agora aplicada à camada que sustenta a aplicação em produção.

Três limites práticos também permanecem:

1. **Capacidade por instância.** O teto de 8 TB do Lakebase atende a maioria das aplicações novas, mas não o banco central de um ERP que cresce há dez anos.
2. **Latência de partida.** Escala até zero economiza dinheiro em ambiente ocioso e cobra em tempo de resposta na primeira conexão. Em aplicação voltada ao cliente, isso precisa ser medido, não presumido.
3. **Mudança de esquema.** A ponte gerenciada replica o dado, mas não impede que uma coluna renomeada no app quebre o modelo analítico. O contrato entre quem escreve e quem lê continua sendo trabalho do time.

## Cinco perguntas para decidir se o banco do app muda de casa

A regra que usamos: a mudança compensa quando pelo menos quatro das cinco respostas apontam para a plataforma de dados. Com menos que isso, o banco dedicado (RDS, Aurora, Cloud SQL, Azure Database) continua sendo o padrão mais seguro.

1. **Quem consome o dado que o app gera?** Se analytics, modelos ou agentes precisam do dado em minutos, a ponte gerenciada vale muito. Se o dado só alimenta um relatório mensal, um pipeline simples resolve.
2. **Qual o tamanho e o perfil da carga transacional?** Aplicações novas, de volume moderado e com picos irregulares combinam com escala automática. Carga de escrita alta e constante, milhares de conexões e banco perto do teto de capacidade pedem banco dedicado.
3. **A plataforma de dados já está escolhida?** O produto só faz sentido na plataforma que a empresa já opera. Escolher Databricks ou Snowflake por causa do Postgres embutido é inverter a ordem da decisão.
4. **Quem atende o incidente às 3h da manhã?** Banco de aplicação em produção tem plantão. Se ele passa a morar na conta da plataforma de dados, o time de dados herda parte desse plantão, ou a responsabilidade fica sem dono. Defina isso antes de migrar.
5. **Quanto custa sair?** Liste o que depende de recurso exclusivo do fornecedor: sincronização, *branching*, permissões no catálogo. Se a lista for longa, trate a escolha como de longo prazo, com a mesma seriedade da escolha do warehouse.

## Onde faz sentido começar, e onde não

O ponto de entrada de menor risco são cargas novas. Aplicações internas de dados, memória e estado de agentes, dados servidos a modelos em tempo real e ambientes de desenvolvimento que precisam de cópias do banco em segundos. Nesses casos, o ganho de não manter uma ponte própria aparece rápido, e errar custa pouco.

O ponto de maior risco é migrar o banco central de um sistema legado que funciona. Um banco transacional maduro tem rotina de backup, plantão, ajuste fino e gente que conhece seus vícios. Movê-lo para ganhar uma ponte automática troca um problema conhecido por um desconhecido. Nossa estimativa, a partir dos projetos que acompanhamos: para a empresa de médio porte, a primeira aplicação na plataforma de dados deve ser uma aplicação nova, e a decisão sobre o legado vem depois de seis meses de operação real.

> Comece pelo app novo, não pelo banco que paga a folha. A ponte gerenciada se prova onde errar é barato.

O movimento dos dois fornecedores é sério e vai continuar. Isso não obriga ninguém a se mudar agora. Obriga a parar de tratar o banco da aplicação e a plataforma de dados como decisões que nunca se encontram.

## Perguntas que sempre voltam

Três dúvidas aparecem em quase toda conversa sobre Postgres dentro da plataforma de dados.

## O que é o Databricks Lakebase?

Databricks Lakebase é um banco PostgreSQL gerenciado e serverless, construído sobre a tecnologia da Neon, que roda dentro da plataforma Databricks. Ele separa armazenamento e computação, escala até zero quando ocioso, cria cópias instantâneas do banco e sincroniza o dado operacional com o lakehouse sob o Unity Catalog. Está em disponibilidade geral na AWS, no Azure e no Google Cloud.

## Lakebase ou Snowflake Postgres substituem o banco de dados da aplicação?

Substituem para aplicações novas e de volume moderado, especialmente quando o dado precisa chegar rápido ao analytics, a modelos ou a agentes. Para o banco central de um sistema legado, com carga pesada e operação madura, o banco dedicado continua mais seguro. O critério principal é quem consome o dado e quem atende o incidente.

## Qual a diferença entre Lakebase e Snowflake Postgres?

Os dois são Postgres gerenciado pelo fornecedor da plataforma de dados, mas ligam o lado analítico de jeitos diferentes. O Lakebase herda a arquitetura serverless da Neon e sincroniza tabelas com o lakehouse da Databricks. O Snowflake Postgres vem da Crunchy Data e usa o pg_lake para ler e escrever Iceberg e Parquet a partir do próprio Postgres. Na prática, a escolha segue a plataforma que a empresa já opera.
