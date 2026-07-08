---
title: "ELT vs ETL: por que a moda mudou e o que importa de fato"
slug: "elt-vs-etl"
pillar: "data"
date: "2026-01-28"
readMinutes: 6
excerpt: "ELT virou consenso em quase todo deck de arquitetura. Mas a troca de letras não é o ganho real — e copiar o padrão sem entender o motivo trava mais projetos do que destrava."
tldr: "ELT venceu ETL porque warehouse cresceu em compute, não porque transformar depois é virtude. O ganho real é separar ingestão de modelagem — e isso pode ser feito em qualquer ordem. Time que adota ELT sem essa clareza só troca um silo por outro."
keywords: ["ELT", "ETL", "data warehouse", "engenharia de dados", "Fivetran"]
---

A reunião de arquitetura de dados em 2026 quase sempre tem o mesmo slide: ELT em destaque, ETL marcado como legado. O argumento que vem junto é "transforma depois, deixa o warehouse fazer o trabalho pesado". Soa moderno. E é, na maioria dos casos, a escolha certa. Mas a explicação que costuma acompanhar — "ELT é melhor que ETL" — é simplista e mascara o ponto real. O que mudou não foi a virtude de transformar antes ou depois. Foi o custo relativo do compute do warehouse, e o que isso permite organizar diferente.

Esse texto é sobre por que ELT venceu, o que isso realmente significa pra um time de dados, e onde a copiagem cega do padrão ainda atrapalha.

## O que mudou desde 2018

ETL nasceu num mundo em que armazenar era barato e processar era caro. Storage local + compute em servidor dedicado significava que transformar dado antes de carregar fazia sentido — você não queria carregar 100 GB pra extrair 10 GB de KPI. A transformação era um filtro de custo.

Em 2026, o cálculo inverteu. [Warehouse cloud — Snowflake, BigQuery, Databricks](/blog/snowflake-bigquery-databricks.html) — cobra storage muito barato e compute elástico sob demanda. Carregar dado bruto custa quase nada; processar quando necessário custa o que custa o uso. Manter dado bruto histórico ficou economicamente trivial. E aí a transformação antes da carga deixou de fazer sentido — você está pagando duas vezes (compute na transformação prévia + carga), pra economizar storage que já não é caro.

Esse é o motivo técnico de fundo. Não é "ELT é mais moderno". É "o gargalo de custo migrou".

## O ganho real: separar ingestão de modelagem

A consequência mais valiosa de ELT não está no E-L-T versus E-T-L. Está em quebrar a operação em dois projetos independentes.

**Ingestão (EL).** Trazer dado de Salesforce, Stripe, Postgres, planilhas, APIs externas. Idealmente automatizado por ferramenta (Fivetran, Airbyte, Meltano). Schedule, schema, retry, monitoring. É commodity. Quem ainda escreve conector próprio em Python pra ingestão de SaaS está gastando dinheiro à toa.

**Modelagem (T).** Transformar dado bruto em modelo de negócio: staging → intermediate → marts. [Aqui dbt vira a peça central](/blog/dbt-na-pratica.html), com SQL versionado, testes, documentação, lineage.

Time que organiza assim para de pagar consultoria pra reinventar conector de Salesforce e gasta o tempo onde o valor está — modelar o negócio. ELT virou consenso porque essa separação virou possível barata. Em ETL, ingestão e transformação ficavam acopladas no mesmo job — quebrar uma quebrava a outra.

> ELT não venceu porque transformar depois é virtude. Venceu porque permite separar ingestão (commodity) de modelagem (valor) — e organizar cada uma como deve.

## Onde ELT cego ainda atrapalha

Adoção de ELT por cargo-culture, sem entender o porquê, gera três problemas comuns.

**Carregar tudo "porque storage é barato".** Verdade, storage é barato, mas *encontrar* dado em meio a 800 tabelas brutas não é. Time carrega todos os schemas de todos os sistemas, e seis meses depois ninguém sabe qual tabela usar. Quantidade vira ruído. Princípio melhor: ingerir o que serve a caso de uso, expandir quando outro caso aparece.

**Transformar dentro do warehouse sem dbt.** Times migram de ETL pra ELT mas escrevem transformação como `CREATE TABLE AS SELECT` solto, sem versionamento, sem teste, sem documentação. É só ETL pior, agora rodando dentro do warehouse. ELT sem disciplina é ETL com mais bagunça.

**Esquecer compliance.** Em ETL clássico, dado sensível (CPF, e-mail, cartão) podia ser filtrado *antes* da carga. Em ELT, o dado bruto vai pro warehouse — incluindo o sensível. Sem masking, encryption-at-rest e tagging desde o dia 1, ELT pode criar passivo de LGPD que ETL evitava por design.

Esses três casos não invalidam ELT. Invalidam ELT *mal feito*, do mesmo jeito que ETL bem feito ainda existe e funciona em alguns nichos.

## Quando ETL ainda é a resposta certa

A discussão pública faz parecer que ETL morreu. Não morreu. Há três contextos onde ainda é a escolha certa.

**Compliance restritivo onde o dado sensível não pode trafegar.** Saúde, financeiro com regras específicas, dado pessoal sob jurisdição que proíbe certo tipo de armazenamento. Aqui filtrar antes da carga é design, não escolha técnica.

**Volume tão grande que storage cloud bruto fica caro.** IoT em escala, log de transação financeira em milhões de TPS, dados de sensor industrial. Em alguns desses, agregar antes de carregar muda a ordem de grandeza do custo. Não é regra; é exceção que vale calcular.

**Sistema fonte velho com latência alta.** Quando extrair dado já custa horas e o destino precisa de dado pronto, transformar no caminho economiza um passo. Comum em integração com legados mainframe.

Fora desses contextos, ELT é o default razoável.

## A pergunta certa, em vez de ELT vs ETL

A conversa que importa não é "qual sigla". É: **quem é dono da modelagem, e como ela é versionada**. Isso vale tanto em ETL quanto em ELT. Time que tem dono claro, transformação no Git, testes automatizados e documentação viva entrega valor. Time que não tem isso vai entregar bagunça — independente da sigla na arquitetura.

[O mito do dado limpo segue valendo em ambos](/blog/dado-limpo-e-um-mito.html) — qualidade é relativa ao uso, não absoluta. ELT facilita iterar (você pode remodelar sem refazer a ingestão), mas não muda a regra fundamental.

Se a sua empresa está discutindo ELT vs ETL como decisão estratégica, provavelmente está na pergunta errada. A decisão estratégica é como organizar ingestão (compre, não construa) e modelagem (versionada, testada, documentada). A sigla é detalhe.

## Perguntas que sempre voltam

Antes de fechar, as dúvidas que mais aparecem quando esse assunto entra na mesa.

## ETL ainda faz sentido em 2026?

Sim, em três contextos específicos. Compliance restritivo onde dado sensível não pode trafegar (saúde, financeiro com regras próprias) — aí filtrar antes da carga é design, não escolha técnica. Volume tão grande que storage cloud bruto fica caro (IoT industrial, log de transação em milhões de TPS), onde agregar antes muda a ordem de grandeza do custo. E sistema fonte legado com latência alta, onde transformar no caminho economiza um passo.

Fora desses três, ELT é o default razoável. Mas ETL bem feito ainda existe e funciona nesses nichos — a narrativa de que "ETL morreu" é simplista.

## Por que ELT virou o padrão?

Porque o custo relativo do compute inverteu, não porque transformar depois é virtude. ETL nasceu quando armazenar era barato e processar era caro; warehouse cloud tornou storage quase gratuito e compute elástico sob demanda, então transformar antes da carga virou pagar duas vezes pra economizar o que já não custa.

O ganho real está em outro lugar: ELT permite separar ingestão (commodity — Fivetran, Airbyte, Meltano resolvem) de modelagem (onde o valor mora, com dbt, SQL versionado e testes). Em ETL, as duas ficavam acopladas no mesmo job — quebrar uma quebrava a outra.

## Quais os riscos de adotar ELT sem critério?

Três aparecem com frequência: carregar tudo "porque storage é barato" e acabar com 800 tabelas brutas que ninguém sabe usar; transformar dentro do warehouse sem dbt — `CREATE TABLE AS SELECT` solto, sem versionamento nem teste, que é só ETL pior; e esquecer compliance, porque em ELT o dado sensível vai bruto pro warehouse e, sem masking e tagging desde o dia 1, vira passivo de LGPD que o ETL evitava por design.

Nenhum desses invalida ELT — invalida ELT mal feito. A pergunta que importa segue sendo quem é dono da modelagem e como ela é versionada, independente da sigla.
