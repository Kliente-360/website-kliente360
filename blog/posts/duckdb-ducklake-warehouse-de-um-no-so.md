---
title: "DuckDB e DuckLake: quando um warehouse de um nó só resolve"
slug: "duckdb-ducklake-warehouse-de-um-no-so"
pillar: "data"
date: "2026-11-10"
readMinutes: 7
excerpt: "DuckLake 1.0 deixou o DuckDB com cara de lakehouse. Cinco checagens para saber se um nó só basta ou se o warehouse gerenciado ainda é a escolha certa."
tldr: "DuckDB é um motor analítico embutido que roda no próprio processo, sem servidor, e o DuckLake 1.0 (abril de 2026) adicionou a ele um formato de tabela com catálogo em banco SQL e dados em Parquet no object storage. Para volumes de até algumas centenas de GB e dezenas de usuários, esse conjunto cobre o que muita empresa de médio porte paga como warehouse gerenciado. Concorrência alta, governança nativa e escrita pesada continuam favorecendo o warehouse em nuvem, e o desenho híbrido costuma ser o ponto de partida mais seguro."
keywords: ["DuckDB", "DuckLake", "data warehouse", "lakehouse", "custo de warehouse", "Parquet"]
---

**DuckDB** é o motor analítico que a maioria dos times de dados já usa no notebook e quase nenhum considera como backend de produção. A pergunta mudou em abril de 2026, quando a equipe do DuckDB declarou o DuckLake 1.0 pronto para produção. Com um formato de tabela transacional e catálogo próprio, o motor de um nó só passou a competir, para volumes moderados, com o warehouse que a empresa assina por crédito.

Este texto não defende trocar o Snowflake por um servidor. Ele propõe cinco checagens para decidir quando um nó só basta, e onde o warehouse gerenciado continua sendo a resposta certa. Onde há número de fornecedor, dizemos que é de fornecedor; onde há opinião, dizemos que é nossa.

## O que o DuckLake 1.0 muda no DuckDB

DuckDB sozinho lê e escreve arquivos, mas não oferece o que um warehouse oferece: tabelas versionadas, transações entre várias tabelas e visão de snapshot. O DuckLake preenche essa lacuna com uma ideia simples: os dados ficam em arquivos Parquet no object storage, e os metadados (esquema, snapshots, lista de arquivos, estatísticas) ficam em um banco SQL comum, como PostgreSQL, MySQL, SQLite ou o próprio DuckDB, segundo a [documentação do DuckLake](https://book.st-hakky.com/en/data-platform/ducklake-1-0-iceberg-difference).

Isso elimina o servidor de catálogo dedicado, que é uma das partes mais incômodas de operar em um lakehouse. A versão 1.0 trouxe também tabelas ordenadas, particionamento por bucket e *data inlining* (escritas pequenas guardadas direto no catálogo, sem gerar arquivos minúsculos).

Há um ponto de saída importante: os arquivos de dados e de deleção são compatíveis com Apache Iceberg, o que permite migrar para Iceberg trocando apenas o catálogo, sem reescrever dado. Quem leu nossa análise sobre [o Apache Iceberg como padrão de table format](/blog/apache-iceberg-table-format-lakehouse.html) reconhece o ganho: a escolha do motor deixa de prender a escolha do formato.

> Para volumes moderados, o catálogo em banco SQL e o dado em Parquet entregam o essencial do lakehouse sem a operação de um cluster.

## Quando um nó só basta: cinco checagens

A regra que usamos é conservadora: o DuckDB só é o backend certo quando as cinco checagens abaixo apontam para ele. Se uma delas aponta para o warehouse, o desenho híbrido costuma ser melhor.

1. **Volume.** Abaixo de cerca de 100 GB comprimidos, o DuckDB quase certamente dá conta. Entre 100 GB e poucos TB, funciona com particionamento cuidadoso, mas o warehouse pode ser mais simples. Acima disso, e crescendo, vá de warehouse. As faixas são da [análise da Basedash](https://www.basedash.com/blog/duckdb-for-bi-when-single-node-analytics-beats-a-cloud-warehouse), um fornecedor de BI, e batem com nossa experiência como ordem de grandeza.
2. **Concorrência.** Até algumas dezenas de usuários de BI, o modelo de um processo por consulta aguenta. Centenas de usuários simultâneos pedem warehouse ou um serviço hospedado como o MotherDuck. Um único processo atendendo 500 dashboards ao mesmo tempo vai formar fila.
3. **Multi-tenancy e governança.** O DuckDB não traz controle de acesso por linha, papéis, mascaramento de coluna nem trilha de auditoria nativos. Se a LGPD exige isso no motor, o warehouse já entrega pronto.
4. **Frescor e escrita.** O DuckDB é otimizado para consulta analítica em lote e interativa, não para ingestão contínua de alto volume nem captura de mudanças (CDC). No DuckLake, atualizações passam por `MERGE INTO`, e sem chave primária a deduplicação não é garantida.
5. **Forma da carga.** Junções entre tabelas de fatos muito grandes tendem a favorecer um motor distribuído, que divide o trabalho entre nós. Em um nó só, memória e tempo crescem juntos.

Há ainda limites de maturidade do próprio DuckLake: o suporte de motores ainda é majoritariamente DuckDB (Spark, Trino e DataFusion estão em desenvolvimento) e não há índices, chaves primárias ou estrangeiras. Um catálogo em DuckDB serve a um único cliente; para leitura e escrita compartilhadas, use PostgreSQL ou SQLite.

## E o custo? Um número de fornecedor, tratado como tal

A comparação que circula é tentadora: um warehouse pequeno em Snowflake custaria entre US$ 1.500 e US$ 5.000 por mês no mesmo trabalho, contra cerca de US$ 200 de um servidor dedicado. É estimativa de um fornecedor de BI, não medição independente, e omite o custo mais real da conta: o tempo de quem opera.

O que sustentamos é mais estreito. Um servidor próprio custa menos em infraestrutura, mas move o custo para pessoas: backup, atualização, monitoramento, controle de memória e um plano para quando o nó cair. Para uma empresa sem engenheiro de dados dedicado, esse custo pode superar a economia da fatura. A conta só fecha a favor do nó único quando já existe alguém com tempo e gosto por operar, ou quando o serviço hospedado cobre essa parte.

Se o problema que você tem é a fatura do warehouse, comece antes pelas medidas descritas em [FinOps de dados no modelo, não na fatura](/blog/custo-data-warehouse-finops-de-dados.html). Trocar de motor para fugir de um modelo mal desenhado só muda o endereço do desperdício.

## O padrão híbrido: warehouse para o todo, DuckDB para o quente

Na prática, o melhor uso que vemos não é substituição, é divisão de trabalho. O warehouse segue como sistema de registro, com governança e concorrência. O DuckDB entra onde o custo por consulta pesa e o dado é estável:

1. **Exporte para Parquet** os conjuntos que alimentam dashboards de alto tráfego, em um diretório particionado.
2. **Sirva essas consultas pelo DuckDB**, no próprio BI ou em um serviço pequeno, em vez de acordar o warehouse a cada clique.
3. **Defina o limite de memória e de threads** de cada processo. Sem isso, um único usuário pode derrubar um servidor compartilhado.
4. **Mantenha o warehouse como fonte única** e trate o Parquet como cópia descartável, reconstruível em minutos.

O relato de mercado é de que esse arranjo corta de 60% a 80% do gasto de warehouse atribuído a tráfego de dashboard. O número vem da mesma análise de fornecedor e deve ser verificado contra o seu padrão de consulta antes de virar meta. O risco que o arranjo traz é o de qualquer cópia: dois lugares com o mesmo dado, e a pergunta de qual deles é o certo. É um bom motivo para tratar o Parquet exportado com [contratos de dados](/blog/data-contracts.html) desde o início.

## Quando manter o warehouse gerenciado

Há casos em que a resposta honesta é não mexer. Se a empresa já tem [um warehouse bem modelado e governado](/blog/lakehouse-vs-warehouse.html), com dezenas de times consumindo e requisitos de auditoria, a economia de trocar o motor raramente compensa o risco. O mesmo vale quando o volume passa de poucos TB e cresce, ou quando a carga é de ingestão contínua.

O DuckDB faz mais sentido em três cenários: produtos de dados internos de médio volume, ambientes de desenvolvimento e teste que hoje queimam crédito do warehouse, e análises exploratórias que não deveriam disputar recurso com a produção. Nesses três, o custo de errar é baixo e o ganho de aprender o motor é real.

## Perguntas que sempre voltam

Três dúvidas aparecem em quase toda conversa sobre o tema.

## O que é DuckLake?

DuckLake é um formato de tabela aberto, lançado em versão 1.0 em abril de 2026 pela equipe do DuckDB, que guarda os dados em arquivos Parquet no object storage e os metadados em um banco SQL como PostgreSQL ou SQLite. A implementação de referência é uma extensão do DuckDB. Seus arquivos são compatíveis com Apache Iceberg, o que permite migrar apenas trocando o catálogo.

## DuckDB substitui Snowflake ou BigQuery?

Só em um perfil estreito: volume de até algumas centenas de GB, dezenas de usuários, pouca escrita contínua e governança resolvida fora do motor. Fora desse perfil, o warehouse gerenciado continua mais seguro. Para a maioria das empresas de médio porte, a resposta útil é híbrida: o warehouse como sistema de registro e o DuckDB atendendo o tráfego quente e os ambientes de teste.

## Qual o tamanho máximo de dado que o DuckDB aguenta?

Não há um teto único, porque o limite depende de memória, partição e forma das consultas. Como ordem de grandeza, abaixo de 100 GB comprimidos costuma ser tranquilo, e entre 100 GB e poucos TB exige particionamento cuidadoso. Acima disso, a combinação de junções grandes e crescimento contínuo favorece um motor distribuído.
