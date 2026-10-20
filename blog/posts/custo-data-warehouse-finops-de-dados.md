---
title: "Custo de data warehouse: FinOps de dados começa no modelo, não na fatura"
slug: "custo-data-warehouse-finops-de-dados"
pillar: "data"
date: "2026-10-20"
readMinutes: 7
excerpt: "A conta do data warehouse cresce mais rápido que o orçamento do time. Cinco alavancas de FinOps de dados que cortam custo sem travar o roadmap."
tldr: "FinOps de dados é a prática de atribuir e reduzir o custo de processamento do warehouse no nível do modelo e da consulta, não só na fatura mensal. A conta cresce porque o consumo escala com o uso e o orçamento do time não acompanha: em um levantamento da dbt Labs, 57% dos profissionais relatam gasto maior com warehouse e computação, contra 36% com orçamento maior de equipe. As alavancas que mais rendem são tag de custo por dono, rightsizing por teste de tempo, auto-suspend, materialização incremental e revisão de consultas recorrentes, nessa ordem."
keywords: ["FinOps de dados", "custo de data warehouse", "otimização de custo Snowflake", "custo BigQuery", "dbt incremental", "showback"]
---

**O** custo de data warehouse é o item de infraestrutura de dados que mais cresce sem que ninguém tenha decidido que cresceria. Ninguém aprova um aumento de 40% na conta de Snowflake ou BigQuery: ele acontece, consulta a consulta, quando mais gente passa a usar o dado e mais modelos passam a rodar de hora em hora. Quando a fatura chega ao financeiro, a causa já está espalhada por centenas de objetos e de donos.

A resposta de muitas empresas é cortar licença ou pausar projetos. Não resolve, porque o gasto raramente está onde o corte é fácil. Este texto trata de FinOps de dados como prática de engenharia: atribuir custo ao dono, medir por modelo e agir nas poucas alavancas que concentram o desperdício.

## Por que a conta do warehouse cresce mais que o orçamento

O consumo de um warehouse cresce com a adoção, e a adoção é justamente o que a empresa quer. Mais dashboards, mais modelos, mais agentes consultando tabelas: tudo isso é custo variável. O orçamento do time de dados, por outro lado, é quase sempre fixo e definido uma vez por ano.

O descompasso aparece nos números. Segundo o levantamento State of Analytics Engineering 2026 da dbt Labs (363 profissionais, abril de 2026), 57% relataram aumento de gasto com warehouse e computação, enquanto 36% relataram aumento de orçamento da equipe. Citamos o dado pela [análise da eCorpIT](https://ecorpit.com/data-engineering-services/), já que não conseguimos acessar o relatório original; trate-o como indicativo de direção, não como medida precisa.

Dois fatores agravam. O primeiro é que o preço unitário parece pequeno: algo entre US$ 2 e US$ 4 por crédito no Snowflake, dependendo da edição, e US$ 6,25 por TiB lido no BigQuery sob demanda, segundo preços de lista de agosto de 2026. O segundo é que a conta deixou de ser só de warehouse. O custo agora inclui serverless, armazenamento, transferência e consumo de tokens de IA, e um painel que olha só os créditos do warehouse enxerga uma parte do total.

> Custo de warehouse não explode por uma consulta ruim: cresce porque ninguém é dono do gasto de cada modelo.

## Atribuição primeiro: sem dono, não há otimização

A primeira alavanca não reduz um centavo e mesmo assim vem antes das outras. Sem saber quem gerou cada parcela do gasto, qualquer otimização vira negociação política. O time de dados corta o que ele acha caro, o time de negócio reclama da lentidão, e a conta continua subindo.

A prática mínima de atribuição tem quatro passos:

1. **Um warehouse (ou projeto) por carga de trabalho.** Separar ingestão, transformação, BI e exploração ad hoc permite ver quanto cada um custa e dimensionar cada um do jeito certo.
2. **Tag de custo por dono e por domínio.** Todo warehouse, schema e job precisa de um responsável nomeado. Objeto sem tag é objeto sem dono.
3. **Showback antes de chargeback.** Mostrar ao time quanto ele gasta, sem cobrar, já muda comportamento. A cobrança interna só entra quando a atribuição está estável; a mesma lógica vale para [a cobrança de inferência de IA, que discutimos em FinOps de IA](/blog/finops-de-ia.html).
4. **Revisão mensal de 30 minutos.** Os dez modelos ou consultas mais caros do mês, com o dono presente. Quase sempre a lista repete de um mês para o outro, o que é boa notícia: o alvo é pequeno.

Em projetos que acompanhamos, a distribuição costuma ser a de sempre: uma fração pequena dos modelos responde pela maior parte do gasto. É uma estimativa nossa, não um dado de mercado, e é o que torna a revisão mensal rentável.

## As cinco alavancas que concentram a economia

Com a atribuição no lugar, a otimização deixa de ser achismo. Em ordem de esforço crescente, estas são as alavancas que mais rendem em warehouse de nuvem.

**Rightsizing por teste de tempo.** Warehouse maior não é só mais caro: só vale a pena se reduzir o tempo de execução na mesma proporção. O handbook de dados da GitLab usa um critério simples: descer um tamanho só é eficiente se o tempo de execução cair em pelo menos 40%. No exemplo deles, um ganho de 20% de velocidade custando 60% a mais é ineficiente. Teste cada carga de trabalho nos dois tamanhos e escolha pelo custo por execução.

**Auto-suspend agressivo.** O Snowflake cobra por segundo de execução, com mínimo de 60 segundos por ativação. Um warehouse de transformação que fica ligado entre uma execução e outra só queima crédito. Comece em 60 segundos e aumente apenas em cargas interativas, em que o cache quente compensa.

**Materialização incremental.** Um modelo que reprocessa a tabela inteira a cada execução é o desperdício mais comum em projeto com [dbt](/blog/dbt-na-pratica.html). Um caso publicado pela Hightouch relata que trocar um modelo de gargalo para incremental cortou cerca de 10 créditos por dia; combinado a um downsize, rendeu economia de milhares de dólares por mês. O ganho depende do projeto, mas a regra é geral: tabelas grandes com chave de data pedem carga incremental.

**Revisão das consultas recorrentes.** Dashboards que atualizam a cada 15 minutos para um público que olha uma vez por dia, e consultas com `SELECT *` sobre tabelas largas, são o equivalente analítico de luz acesa em sala vazia. No BigQuery, em que o custo é por dado lido, particionar e agrupar tabelas muda o gasto diretamente.

**Separar o que precisa de warehouse do que não precisa.** Nem toda transformação exige a computação mais cara. A dbt Labs anunciou no dbt Summit 2026 o Lake Compute, ainda em beta privado, justamente porque a maioria das empresas roda do modelo de staging simples ao join pesado no mesmo warehouse. Mesmo sem esse produto, [formatos abertos como o Iceberg](/blog/apache-iceberg-table-format-lakehouse.html) permitem mover cargas leves para motores mais baratos.

## Como começar sem travar o roadmap

FinOps de dados falha quando vira projeto paralelo, com time próprio e prazo de seis meses. Funciona quando entra no ritmo normal do time de analytics. Uma sequência que cabe em um mês:

1. **Semana 1:** separar warehouses por carga de trabalho e aplicar tags de dono.
2. **Semana 2:** levantar os dez modelos e as dez consultas mais caras do último mês, com dono ao lado de cada um.
3. **Semana 3:** aplicar rightsizing e auto-suspend nas três cargas de maior gasto; migrar para incremental os modelos candidatos.
4. **Semana 4:** publicar o primeiro showback e agendar a revisão mensal.

Há um limite importante: otimizar custo sem [observabilidade dos pipelines](/blog/observabilidade-de-dados.html) é arriscado. Um modelo que passa a rodar de forma incremental e erra a lógica de merge economiza crédito e entrega dado errado. Toda mudança de materialização precisa de teste de equivalência contra a versão anterior.

O critério que usamos para decidir quanto investir nisso é prático. Se o gasto com warehouse cresce mais rápido que o uso que ele sustenta, existe desperdício estrutural. Se cresce na mesma proporção, o problema é de orçamento, não de eficiência, e a conversa certa é com o financeiro, não com o time de engenharia.

## Perguntas que sempre voltam

Três dúvidas aparecem em quase toda conversa sobre custo de warehouse.

## O que é FinOps de dados?

FinOps de dados é a prática de atribuir, medir e reduzir o custo de processamento e armazenamento de uma plataforma de dados, com responsabilidade distribuída entre engenharia, analytics e financeiro. Na prática, significa saber quanto cada modelo, consulta e time custa, e agir nas poucas alavancas que concentram o gasto, em vez de cortar orçamento de forma linear.

## Como reduzir o custo do Snowflake ou do BigQuery sem perder desempenho?

Comece por atribuição, depois aplique cinco alavancas: rightsizing por teste de tempo, auto-suspend de 60 segundos, materialização incremental, revisão de consultas recorrentes e separação de cargas leves. No Snowflake o foco é crédito por execução; no BigQuery, o volume de dado lido, que particionamento e clusterização reduzem diretamente. Teste cada mudança contra a versão anterior para não trocar economia por dado errado.

## Quando o aumento da conta do warehouse é saudável?

O aumento é saudável quando acompanha o uso que gera valor: mais usuários ativos, mais decisões apoiadas em dado, mais produtos de dados em produção. É sinal de desperdício quando a conta cresce mais rápido que o consumo útil, ou quando nenhum dono consegue explicar os dez maiores itens do mês. O teste é a pergunta de dono: quem responde por este gasto?
