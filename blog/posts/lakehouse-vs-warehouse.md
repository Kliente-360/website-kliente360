---
title: "Lakehouse não é silver bullet: quando warehouse simples ainda ganha"
slug: "lakehouse-vs-warehouse"
pillar: "data"
date: "2026-07-01"
readMinutes: 7
excerpt: "Lakehouse ou warehouse simples? A resposta depende de volume, diversidade de dado e maturidade de time — não da conversa do vendor."
tldr: "Lakehouse acrescenta camadas de engenharia que só fazem sentido quando volume e diversidade de dado justificam. A maioria das empresas de médio porte ainda não chegou nesse ponto. Antes de adotar, responda três perguntas sobre seu caso de uso e decida com TCO honesto — não com apresentação de vendor."
keywords: ["lakehouse", "data warehouse", "Databricks", "Snowflake", "arquitetura de dados"]
---

Toda conferência de dados tem pelo menos um slide com a arquitetura lakehouse no centro. Delta Lake sobre S3, Apache Iceberg gerenciando schema, Databricks ou Spark processando SQL e Python no mesmo lugar. É uma arquitetura elegante que resolve um problema real — e que virou padrão de vendas pra resolver *qualquer* problema, incluindo os que ela não é a resposta certa.

Se você é CTO ou decisor técnico de médio porte, provavelmente recebeu a proposta nos últimos meses. Esse texto é sobre quando lakehouse é a escolha correta, quando warehouse simples ainda ganha, e como separar os dois sem cair em ideologia de plataforma.

## O que lakehouse resolve — e o que não resolve

Lakehouse nasceu de um problema legítimo: data lakes em S3 armazenam dado barato e em qualquer formato, mas não fazem query SQL bem. Warehouses como BigQuery e Snowflake fazem query excelente, mas são caros para armazenar dado bruto volumoso e não suportam ML workload nativamente. A arquitetura lakehouse, popularizada pelo Delta Lake do Databricks e depois pelo Apache Iceberg, propõe uma camada transacional sobre armazenamento de objeto — ACID, schema enforcement, SQL sobre Parquet no mesmo lugar que notebooks de ML. Essa disputa entre formatos, aliás, [já convergiu — Iceberg virou o padrão de fato do table format em 2026](/blog/apache-iceberg-table-format-lakehouse.html), o que muda onde a due diligence de arquitetura precisa mirar.

Para quem tem os três problemas simultaneamente — volume industrial, workload analítico *e* ML em produção, time misto de engenheiros e cientistas — lakehouse é a resposta certa. O erro está em assumir que "o que funciona pra empresa com dezenas de engenheiros de dados é o que funciona pra empresa com dois".

> A arquitetura correta é a mais simples que resolve seu caso de uso. Lakehouse elegante demais para o problema que você tem é dívida técnica com nome bonito.

## Quando lakehouse faz sentido de fato

Três condições precisam existir simultaneamente para lakehouse ser a escolha racional:

1. **Volume e variedade que warehouse gerenciado não comporta com custo razoável.** Dado de IoT em escala industrial, log de evento em centenas de milhões de registros por dia, dado de streaming contínuo, múltiplas fontes com schema radicalmente diferente. Se a empresa tem um CRM, um ERP, e algumas integrações de SaaS, warehouse gerenciado resolve com folga.
2. **ML rodando em produção — não em piloto, não em plano.** Lakehouse faz sentido quando a mesma plataforma de dado precisa servir query SQL analítica *e* feature store de modelo *e* treinamento. Se o time é de analistas de BI com interesse eventual em ML, warehouse é suficiente e será por anos. "Planos de ML" não justificam arquitetura — modelos em produção, sim.
3. **Engenharia madura para operar o que lakehouse exige.** Delta Lake e Iceberg têm conceitos que não existem em warehouse gerenciado: compaction, Z-ordering, vacuum, time travel com retenção gerenciada, schema evolution com compatibilidade backward. São decisões feitas toda semana. Time pequeno sem experiência nessa stack se afoga, e a plataforma vira problema de manutenção em vez de ganho de escala.

Se uma das três faltar, você está adicionando complexidade sem o ganho que a justifica.

## O que warehouse simples ainda entrega — e melhor

Para a maioria das empresas de médio porte brasileiras, o perfil de dado é transacional e estruturado: CRM, ERP, e-commerce, SaaS B2B. Volume na casa de alguns terabytes, no máximo dezenas. [Snowflake, BigQuery, Databricks SQL Warehouse](/blog/snowflake-bigquery-databricks.html) operam confortavelmente nesse escopo, com SQL padrão, compute elástico e operação essencialmente zero.

Coloque [ELT em cima — ferramenta de ingestão pra mover dado, dbt para modelagem](/blog/elt-vs-etl.html) — e o time entrega analytics confiável em quatro a seis semanas. O mesmo setup em lakehouse leva de três a quatro meses, exige engenheiro familiarizado com Iceberg ou Delta, e requer governança de compaction desde o dia 1. O resultado analítico é equivalente; o custo de chegar lá não é.

Três vantagens concretas de warehouse gerenciado para esse perfil:

- **Operação SaaS embutida.** Vacuum, compaction, upgrade, monitoramento de performance: vêm incluídos na licença. Em lakehouse self-managed, são rotinas de engenharia semanais que consomem tempo de quem poderia estar modelando dado.
- **SQL como língua franca.** Em warehouse, analista de negócio funcional aprende a operar em dias. Em lakehouse com Spark SQL ou notebooks PySpark, o time mínimo funcional exige mais especialização.
- **Custo previsível em escala média.** Lakehouse fica competitivo em petabyte. Em terabyte, warehouse gerenciado costuma ter TCO menor quando se soma engenharia de operação ao cálculo.

[Modelagem dimensional bem feita em cima de warehouse gerenciado](/blog/modelagem-dimensional-2026.html) cobre 90% dos casos analíticos de médio porte. O restante raramente justifica a diferença de custo e de lead time de implantação.

## Dois perfis que pedem respostas diferentes

Empresas que chegam com pedido de "migrar para lakehouse" costumam ter um de dois cenários.

**Perfil A: a empresa cresceu de fato.** Volume triplicou, time de dados tem cientista de ML em produção, warehouse está sofrendo com queries complexas ou custo de armazenamento de dado bruto. Aqui faz sentido avaliar migração — mas avaliar ao lado de um upgrade de tier do warehouse atual, não como substituto automático. Em muitos casos, aumentar o tier ou reorganizar o modelo de cobrança resolve por mais um ou dois anos com TCO menor que uma migração completa de stack.

**Perfil B: o CTO foi em conferência.** Voltou querendo lakehouse. O dado da empresa cabe em dois marts bem organizados. O time é de três analistas e um engenheiro. A proposta do vendor tem doze slides com arquitetura de referência de empresa com trezentos engenheiros. O trabalho de uma consultoria especializada nesse caso é honesto: a arquitetura é elegante, mas o problema que ela resolve não é o seu.

O sinal de que warehouse ainda é suficiente: a modelagem está funcionando, os marts servem os casos de uso ativos, e o gargalo real não é a arquitetura — é falta de dono de dado, processo de qualidade, ou contrato de modelagem com o negócio.

## Três perguntas antes de qualquer avaliação de plataforma

Antes de entrar em demo, antes de pedir benchmark, antes de pedir proposta:

1. **Qual workload específico você não consegue rodar hoje que lakehouse resolveria?** Se a resposta é vaga — "escalar melhor", "ser mais moderno", "suportar ML no futuro" — o problema não está definido. Plataforma nova não define problema; amplifica o que já existe.
2. **Quem vai operar em doze meses?** Se a resposta for o mesmo time de dois engenheiros já sobrecarregados, o risco operacional é real. Lakehouse sem time dedicado vira passivo de manutenção. E contratar engenheiro sênior de Iceberg no mercado brasileiro tem custo e lead time próprios.
3. **O custo total de migração e operação está no seu plano de três anos?** Migração de warehouse para lakehouse não é lift-and-shift — é reescrita de pipeline, curva de aprendizado de stack nova, camada de observabilidade diferente, possivelmente novo perfil de contratação. Esse custo raramente aparece no deck do vendor e raramente está no budget inicial.

Em prática de consultoria especializada, a maioria das empresas de médio porte que respondem honestamente as três perguntas conclui que warehouse gerenciado ainda é o certo. Esse diagnóstico não é conservador — é o que os dados apontam quando a conta é feita sem ideologia de plataforma.

## A decisão certa é menos elegante

Warehouse bem operado, com [dbt para versionamento, documentação e testes de modelo](/blog/dbt-na-pratica.html), cobre o analítico de médio porte por anos. Lakehouse tem lugar — em dado intensivo de evento, em operação com ML maduro, em times com engenharia sólida que precisa do que warehouses gerenciados não entregam bem.

A conversa que importa não é qual arquitetura tem mais slides em conferência. É quem é dono do dado, como a modelagem está versionada, e quais casos de uso a plataforma serve hoje. Comprar lakehouse sem o workload que o justifica é pagar por motor de avião num carro de cidade — o carro anda, o motor não ajuda, e a manutenção aparece na próxima revisão.

## Perguntas que sempre voltam

Antes de fechar, as dúvidas que mais aparecem quando esse assunto entra na mesa.

## Quando vale a pena migrar pra lakehouse?

Quando três condições existem ao mesmo tempo: volume e variedade que warehouse gerenciado não comporta com custo razoável (IoT industrial, centenas de milhões de eventos por dia, streaming contínuo); ML rodando em produção — não em piloto, não em plano; e engenharia madura pra operar compaction, Z-ordering, vacuum e schema evolution como rotina semanal.

Se uma das três falta, você está adicionando complexidade sem o ganho que a justifica. "Planos de ML" e "ser mais moderno" não definem workload — e plataforma nova não define problema, só amplifica o que já existe.

## Warehouse gerenciado dá conta de uma empresa de médio porte?

Na grande maioria dos casos, sim — e por anos. O perfil típico de médio porte é dado transacional e estruturado (CRM, ERP, e-commerce, SaaS) na casa de alguns terabytes, escopo em que Snowflake, BigQuery ou Databricks SQL operam com folga, SQL padrão e operação essencialmente zero. Modelagem dimensional bem feita em cima disso cobre 90% dos casos analíticos.

Em escala de terabytes, o warehouse gerenciado costuma ter TCO menor que lakehouse quando se soma a engenharia de operação à conta — vacuum, compaction e upgrades vêm na licença, e analista funcional aprende a operar em dias. Lakehouse só fica competitivo em custo lá perto do petabyte.

## Quanto tempo leva pra ter analytics rodando em cada arquitetura?

Com warehouse gerenciado, ELT e dbt, um time entrega analytics confiável em quatro a seis semanas. O mesmo setup em lakehouse leva de três a quatro meses, exige engenheiro familiarizado com Iceberg ou Delta — perfil com custo e lead time próprios no mercado brasileiro — e requer governança de compaction desde o dia 1.

O resultado analítico é equivalente; o custo de chegar lá não é. E migração de warehouse pra lakehouse não é lift-and-shift: é reescrita de pipeline, curva de aprendizado de stack nova e camada de observabilidade diferente — custo que raramente aparece no deck do vendor.
