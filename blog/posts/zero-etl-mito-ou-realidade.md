---
title: "Zero-ETL: a promessa de matar pipeline é real ou é marketing de hyperscaler?"
slug: "zero-etl-mito-ou-realidade"
pillar: "data"
date: "2026-07-28"
readMinutes: 8
excerpt: "Zero-ETL promete eliminar pipeline entre banco e warehouse. Elimina o conector customizado — não elimina modelagem, nem o lock-in entre as duas pontas."
tldr: "Zero-ETL é a replicação nativa e quase-tempo-real entre um banco transacional e um warehouse analítico, oferecida direto pelo provedor de nuvem, sem pipeline customizado no meio. O ganho é real onde existe hoje: menos conector caseiro de CDC, latência de minutos caindo para segundos. Mas o nome esconde dois pontos — o trabalho de modelar e governar o dado não desaparece, só migra pra dentro do warehouse, e cada integração zero-ETL só funciona entre dois produtos do mesmo provedor. A pergunta que decide se vale a pena não é 'isso mata o pipeline', é 'isso me prende mais numa única nuvem do que eu já estava'."
keywords: ["zero-ETL", "AWS zero-ETL", "Databricks Lakeflow", "Snowflake Openflow", "lock-in de dados", "CDC"]
---

**Zero-ETL** não é ausência de pipeline. É pipeline que o provedor de nuvem administra, opera e mantém dentro do próprio ecossistema — e cobra por isso de um jeito diferente de como cobrava antes. A AWS oferece zero-ETL entre Aurora e Redshift desde 2022 e chegou à disponibilidade geral em 2026. A Databricks lançou o Lakeflow, unindo ingestão e transformação sob o Unity Catalog. A Snowflake respondeu com Openflow, conexão direta a Kafka e Kinesis sem camada intermediária. As três leituras de mercado concordam num ponto: zero-ETL é o principal argumento de diferenciação dos três hyperscalers em 2026. O que elas não dizem com a mesma clareza é o que continua sendo trabalho manual depois que o pipeline "some".

Esse texto separa o ganho real do zero-ETL do que é reformulação de marketing sobre um problema que a engenharia de dados já vinha resolvendo há anos com CDC (change data capture) customizado.

## O que o zero-ETL resolve de verdade

O caso mais maduro é a integração nativa da AWS entre Aurora e Redshift, hoje disponível para Aurora MySQL e Aurora PostgreSQL. Dentro de segundos após um dado ser escrito na base transacional, ele aparece pronto pra consulta analítica no Redshift — sem job de extração, sem staging intermediário, sem conector escrito à mão. A Aurora MySQL sustenta mais de um milhão de transações por minuto replicadas com latência p50 abaixo de 15 segundos. A Pionex, uma corretora, reportou queda de 98% na latência de análise — de minutos para menos de 15 segundos — e redução de 90% na complexidade de manutenção de pipeline.

A Databricks foi pelo caminho da consolidação: o Lakeflow unifica ingestão, transformação e orquestração sob o Unity Catalog, com o Lakeflow Connect oferecendo mais de 100 conectores nativos de alta performance. A Snowflake apostou em streaming direto — o Openflow conecta Kafka e Kinesis sem intermediário, e o Snowpipe Streaming sustenta até 10 GB por segundo por tabela com um modelo de preço baseado em ingestão previsível.

O ganho comum aos três é genuíno: menos código de integração escrito e mantido pelo time de dados pra resolver um problema que já era resolvido — só que artesanalmente, com Debezium, Fivetran ou script próprio de CDC. Substituir esse código por um serviço gerenciado do próprio provedor reduz superfície de manutenção e corta a latência de minutos para segundos em cenários de replicação simples entre banco transacional e warehouse.

> Zero-ETL substitui o conector customizado por um serviço gerenciado. Isso é economia de engenharia real — só não é a mesma coisa que eliminar trabalho de dado.

## O trabalho que some é o pipeline — não é a modelagem

Aqui está o ponto que a mensagem de marketing borra: zero-ETL remove a tubulação, não a lógica que rodava dentro dela. [O mesmo argumento já valia quando ELT venceu ETL](/blog/elt-vs-etl.html) — o ganho real não estava na sigla, estava em separar ingestão (commodity) de modelagem (onde o valor mora). Zero-ETL é esse argumento levado ao limite: a ingestão deixou de ser até́ commodity contratada — virou serviço nativo do provedor. Mas a modelagem, a qualidade e a semântica do dado não desaparecem. Elas só migram pra dentro do warehouse de destino, executadas sob demanda em SQL, em vez de rodarem numa camada de transformação separada.

Isso significa que o dado bruto chega mais rápido — mas continua bruto. Times que leem "zero-ETL" como "zero trabalho de dado" descobrem, meses depois, que o warehouse está cheio de tabela replicada sem contrato de schema, sem teste, sem dono. É o mesmo erro que times cometiam adotando ELT sem disciplina, só que agora com um ingrediente a mais: a replicação nativa não expõe o schema intermediário que um pipeline customizado expunha, então o time perde um ponto de controle que tinha antes — o lugar onde filtrar dado sensível ou aplicar uma regra de negócio antes da carga.

**A consequência prática** é que times que adotam zero-ETL sem repensar a camada de modelagem trocam um problema visível (pipeline frágil, quebra em produção, alerta às 3 da manhã) por um problema silencioso (dado replicado sem contrato, sem masking, sem dono — descoberto só quando alguém usa o número errado num relatório executivo).

## Zero-ETL elimina lock-in ou aprofunda?

Toda integração zero-ETL hoje no mercado funciona entre duas pontas do mesmo dono. Aurora para Redshift é AWS para AWS. Lakeflow Connect entrega dado direto pro Unity Catalog — que só existe dentro da Databricks. Openflow entrega dado direto pro Snowflake. Não existe, em nenhum dos três, uma integração zero-ETL de produção madura que atravesse provedores — o "zero" da tubulação só se paga dentro da fronteira de quem construiu os dois lados.

Isso [espelha o mesmo eixo de lock-in que já vale na comparação entre os três warehouses](/blog/databricks-snowflake-bigquery-lock-in.html): a dependência real não mora mais no formato do dado — [Apache Iceberg resolveu boa parte disso ao virar padrão entre os três](/blog/apache-iceberg-table-format-lakehouse.html) — mora na camada de integração que só existe dentro de um ecossistema fechado. Quanto mais zero-ETL uma empresa adota, menos motivo prático ela tem pra manter um segundo provedor rodando em paralelo, porque cada integração nova aumenta o custo de sair, não de entrar.

O movimento de consolidação do próprio mercado de ferramentas reforça esse ponto. Em junho de 2026, a Fivetran fundiu-se com a dbt Labs — depois de já ter adquirido a Census em 2025 — juntando ingestão, transformação e ativação num único fornecedor. O mesmo instinto de consolidação que motiva vendors independentes a se fundirem é o que motiva hyperscaler a empurrar zero-ETL: quanto menos pontas soltas entre ingestão e consumo, menos chance de o cliente trocar de fornecedor no meio do caminho.

> O pipeline que desaparece é o que o time mantinha. O que fica, e cresce, é a dependência de que as duas pontas do zero-ETL pertençam ao mesmo dono.

## Três perguntas pra decidir se zero-ETL serve seu caso

Não é pergunta de "zero-ETL é bom ou ruim" — é sobre onde ele encaixa no seu padrão real de operação.

1. **As duas pontas já vivem no mesmo provedor?** Se o banco transacional e o warehouse já estão na mesma nuvem — Aurora e Redshift, ou qualquer par nativo equivalente — zero-ETL entrega ganho de latência real sem custo adicional de lock-in, porque a dependência de plataforma já existia antes da integração.
2. **O caso de uso é replicação simples ou transformação pesada?** Zero-ETL resolve bem "trazer dado transacional pro warehouse quase em tempo real" — [o mesmo frescor que um agente autônomo exige](/blog/dado-pronto-para-ia-arquitetura-agente.html) do dado que consome. Não resolve join complexo entre múltiplas fontes, deduplicação, nem regra de negócio que precisa rodar antes da carga — isso continua exigindo dbt, teste e dono definido, só que executado dentro do warehouse de destino.
3. **Sair do provedor atual é um cenário que a empresa já descartou?** Se a resposta é sim — a empresa já decidiu ficar, por qualquer motivo estratégico — zero-ETL é ganho líquido de engenharia sem custo extra de decisão. Se a resposta é "ainda não sabemos", cada integração zero-ETL nova adiciona um voto a favor de nunca sair.

Nenhuma das três, isolada, fecha a decisão — mas a terceira costuma ser a que a equipe de engenharia menos considera antes de ativar a integração, porque o ganho de latência aparece no primeiro dia e o custo de saída só aparece no dia em que alguém tenta migrar.

## O nome vende ausência de trabalho — a operação real é outra

Zero-ETL entrega o que promete numa fatia estreita e real do problema: replicação de dado transacional pro warehouse, quase em tempo real, sem conector escrito à mão. É ganho de engenharia genuíno, mensurável em latência e em horas de manutenção que deixam de existir. Mas tratar isso como "elimina o trabalho de dado" é o mesmo erro de ler "pricing simplificado" como "orçamento sob controle" — o rótulo simplifica a superfície visível e desloca o trabalho real pra outro lugar, não o elimina.

Quem adota zero-ETL calculando as três perguntas acima entra a integração sabendo o que ganhou (latência, manutenção) e o que não ganhou (modelagem, governança, liberdade de trocar de provedor). Quem lê o nome como promessa literal — zero trabalho — descobre a fatura real seis meses depois: dado replicado sem contrato de schema e uma integração a mais que torna a saída do provedor atual mais cara do que era antes de ativar o "zero".

## Perguntas que sempre voltam

Fechando, as três dúvidas mais comuns sobre zero-ETL na prática.

## O que é zero-ETL?

Zero-ETL é a replicação nativa e quase em tempo real de dado entre um sistema transacional (como um banco de dados operacional) e uma plataforma analítica (como um data warehouse), oferecida diretamente pelo provedor de nuvem como serviço gerenciado — sem pipeline de extração, transformação e carga customizado no meio. Exemplos maduros incluem a integração Aurora–Redshift da AWS (geral disponibilidade em 2026, com latência p50 abaixo de 15 segundos), o Lakeflow Connect da Databricks e o Openflow da Snowflake.

## Zero-ETL elimina a necessidade de dbt e modelagem de dado?

Não. Zero-ETL elimina o pipeline de ingestão customizado — o conector de CDC escrito à mão, o job de extração agendado. Não elimina a modelagem, a qualidade nem a semântica do dado, que continuam sendo trabalho necessário. A diferença é que esse trabalho migra pra dentro do warehouse de destino, executado sob demanda em SQL, em vez de rodar numa camada de transformação separada antes da carga. Times que pulam essa etapa acumulam dado replicado sem contrato de schema, sem teste e sem dono definido.

## Zero-ETL aumenta o lock-in de nuvem?

Na prática, sim, porque toda integração zero-ETL madura hoje no mercado conecta duas pontas do mesmo provedor — Aurora a Redshift dentro da AWS, Lakeflow Connect ao Unity Catalog dentro da Databricks, Openflow ao Snowflake. Cada integração nova adotada aumenta o custo de migrar pra outro provedor no futuro, porque substitui um pipeline que era portável (escrito em ferramenta neutra, como Fivetran ou Airbyte) por um serviço nativo que só existe dentro de um ecossistema. O ganho de latência é real; o custo de saída também.
