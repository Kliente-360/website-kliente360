---
title: "dbt Core 2.0 em Rust e Apache 2.0: migrar agora ou esperar o GA?"
slug: "dbt-core-2-rust-migrar-ou-esperar"
pillar: "data"
date: "2026-10-07"
readMinutes: 7
excerpt: "O dbt Core 2.0 troca Python por Rust e fica sob Apache 2.0. Veja o que acelera, o que quebra e o critério para migrar agora ou esperar o GA."
tldr: "O dbt Core 2.0 é a reescrita em Rust do motor de transformação open source da dbt Labs, publicada sob licença Apache 2.0 e construída sobre o mesmo código do engine Fusion. O ganho principal está no parse e na compilação, que ficam muito mais rápidos em projetos grandes; o custo está nos adapters, que precisam ser reescritos, nos pacotes de terceiros e nas deprecações do v1 que viram erro. A decisão não é binária: preparar o projeto agora, no v1.12, custa pouco e vale para todo mundo, enquanto mover produção para o 2.0 só faz sentido depois do GA e da cobertura do seu warehouse."
keywords: ["dbt Core 2.0", "dbt Fusion", "migração dbt", "dbt Rust", "analytics engineering", "dbt v1.12"]
---

O **dbt Core 2.0** é a maior mudança na ferramenta desde que ela virou padrão de transformação em SQL: o motor sai de Python, entra em Rust, passa a compartilhar código com o engine Fusion e fica inteiro sob licença Apache 2.0. A primeira alpha saiu em 1º de junho de 2026, e desde então a pergunta que chega a qualquer time de dados com dbt em produção é a mesma: migramos agora ou esperamos?

A resposta curta é que as duas coisas acontecem ao mesmo tempo. Existe um trabalho de preparação que vale começar já e uma migração de produção que ainda merece espera. Este texto separa as duas, mostra o que muda de fato e propõe um critério que cabe numa conversa de meia hora com o time.

## O que mudou no dbt Core 2.0

Quatro mudanças definem a versão, e só a primeira é aquela que aparece nos anúncios.

1. **Motor em Rust.** O parse e a compilação, que eram o gargalo de projetos grandes, deixam de depender de Python. A instalação também simplifica: some a necessidade de gerenciar ambiente virtual.
2. **Código compartilhado com o Fusion.** O Core 2.0 e o Fusion usam a mesma base. O Fusion é o superset: acrescenta, por exemplo, o parse nativo de SQL que habilita lineage em nível de coluna e recursos de editor. Segundo a dbt Labs, o Core 2.0 é "um upgrade estrito" sobre o v1.
3. **Artefatos em Parquet.** Os arquivos JSON enormes de manifest e resultados dão lugar a Parquet, que pode ser consultado diretamente com DuckDB.
4. **Adapters via ADBC.** Construir conectores para novos warehouses passa pelo ecossistema Arrow e ADBC, em vez de pacotes Python.

Há ainda uma mudança de licença que pesa mais do que parece. O Core 2.0 é Apache 2.0 de ponta a ponta. O binário do Fusion fica sob uma licença mais permissiva que a ELv2 usada no início: uso gratuito local e em produção, com recursos premium liberados por login gratuito ou conta paga na plataforma dbt. A dbt Labs, que hoje opera junto com a Fivetran, afirma que o Core segue open source por tempo indeterminado e que os pacotes continuam públicos.

> O dbt Core 2.0 muda o motor, não a linguagem: o SQL e o YAML do time continuam sendo o ativo.

## Quanto mais rápido, e para quem importa

O número que circula é "30 vezes mais rápido". Vale entender a que ele se refere. Segundo a análise do datadriven.io, com base nos dados divulgados pela dbt Labs, o ganho é de **parse**: um projeto de 10 mil modelos sai de mais de 60 segundos para menos de 600 milissegundos. A compilação do projeto inteiro fica por volta de 2 vezes mais rápida, e a recompilação de um único arquivo no editor fica quase instantânea. Nada disso é tempo de execução no warehouse, que continua dependendo da sua consulta e do seu cluster.

A consequência prática é que o ganho cresce com o tamanho do projeto. Em um projeto de 500 modelos, o parse que hoje leva alguns segundos vira uma fração de segundo: perceptível no desenvolvimento, irrelevante na fatura. Essa é uma estimativa nossa, não uma medição independente. Em um projeto de milhares de modelos, com CI rodando a cada pull request, a conta muda: minutos de parse por execução, multiplicados por dezenas de execuções por dia, somam horas de espera de engenheiro.

O outro número de que se fala, uma redução de 30% ou mais no custo de computação, vem do **dbt State**, uma camada de cache paga que consolida testes e evita reprocessamento; a dbt Labs relata 64% de economia no uso interno. Funciona com o dbt Core e o Airflow a partir do v1.7 com plugin, e nativamente a partir do v1.12. É um recurso do v1.x também, então não é argumento para migrar para o 2.0.

## O que quebra na migração

O 2.0 é um upgrade estrito em capacidade, mas não em compatibilidade. Quatro pontos concentram o risco:

1. **Adapters.** Os adapters do v1 são pacotes Python e não funcionam no 2.0. Em meados de 2026, Snowflake, BigQuery, Databricks e Redshift estavam em preview; PostgreSQL, MySQL e Oracle ainda não estavam prontos. Se o seu warehouse não está na lista, a migração não começa.
2. **Deprecações viram erro.** Tudo o que o v1 avisava como deprecated passa a falhar. A flag `--models` (e `-m`) some em favor de `--select`. Times que ignoraram avisos por dois anos recebem a conta de uma vez.
3. **Pacotes de terceiros.** `dbt_utils` e `audit_helper` já estão prontos para o 2.0; pacotes menores, mantidos por uma pessoa só, podem não estar.
4. **Manifest assimétrico.** O 2.0 lê manifests do v1, mas o v1 não lê os do 2.0. Qualquer ferramenta que consome o manifest (catálogo, observabilidade, orquestrador) precisa ser conferida antes.

Do lado do suporte, o v1 não vai a lugar nenhum: a dbt Labs diz que a migração não é forçada. O v1.12, lançado em 16 de julho de 2026, tem suporte ativo até 15 de julho de 2027, e as versões v1.3 a v1.7 saem da plataforma em 31 de janeiro de 2027. Ou seja, quem está em versão antiga tem prazo, e quem está no v1.11 ou no v1.12 tem tempo.

## Como decidir: preparar agora, migrar depois

A recomendação oficial da dbt Labs, que concordamos, é esperar o GA para produção. A alpha existe para teste e para dar tempo ao ecossistema. O que não precisa esperar é a preparação, e ela segue uma sequência de cinco passos.

1. **Suba para o v1.12.** A versão aplica cedo o comportamento do 2.0 e traz o parser baseado no Fusion. É o ponto de partida de qualquer caminho.
2. **Rode o teste de compatibilidade.** O comando `dbt parse --use-v2-parser` mostra o que o novo parser rejeita sem tocar em produção.
3. **Zere as deprecações.** Corrija os avisos acumulados; o pacote `dbt-autofix` automatiza boa parte da limpeza.
4. **Faça o inventário de dependências.** Liste adapters, pacotes e ferramentas que leem o manifest, e marque quais têm versão compatível com o 2.0.
5. **Escolha um projeto-piloto fora do caminho crítico.** Um domínio pequeno, com dono claro, em que um dia de CI vermelho não derruba nada.

Fixe também as versões no ambiente. Na primeira alpha, instalar sem versão travada fez o `pip` resolver direto para o pré-lançamento; um `dbt-core>=1.10,<2.0` evita a surpresa.

Esse trabalho de preparação tem uma propriedade útil: ele melhora o projeto mesmo que você nunca migre. [Um projeto com descrições, owners e contratos em dia](/blog/dbt-na-pratica.html) é o que passa limpo pelo parser novo, e é quase sempre o projeto que menos acumulou dívida de deprecação.

## Licença aberta não elimina a dependência de fornecedor

O Apache 2.0 do Core é uma boa notícia, mas é preciso ler com precisão o que ele garante. Ele garante que o motor continua livre para usar, modificar e embarcar. Não garante que os recursos que o seu time vai querer, como lineage em nível de coluna, o cache do dbt State e o assistente de código, fiquem no código aberto. Esses ficam no Fusion e na plataforma paga, e a própria dbt Labs recomenda o Fusion como distribuição padrão por ter "mais capacidades prontas".

Isso não é crítica; é como o modelo de negócio funciona. O ponto é decidir conscientemente. [A mesma lógica vale para a escolha de warehouse, em que o custo de saída só aparece depois da assinatura](/blog/databricks-snowflake-bigquery-lock-in.html), e vale para a camada de transformação, que nos últimos anos concentrou boa parte da lógica de negócio de dados. Quem hoje considera o dbt "neutro" por ser open source precisa revisar a premissa: o núcleo é neutro, o conjunto de recursos que você usa pode não ser. E, depois da fusão com a Fivetran, [parte da pilha que se chamava Modern Data Stack](/blog/modern-data-stack-2026.html) tem menos fornecedores independentes do que tinha em 2021.

Uma regra simples ajuda: se um recurso proprietário entrar no fluxo de trabalho, registre-o como dependência explícita e documente a alternativa. O custo de manter a saída desenhada é pequeno; o de redescobri-la sob pressão não é.

## Perguntas que sempre voltam

Fechando, as dúvidas mais frequentes de times que usam dbt e estão avaliando o 2.0.

## O que é o dbt Core 2.0?

O dbt Core 2.0 é a nova versão major do dbt Core, reescrita em Rust e publicada sob licença Apache 2.0. Ele compartilha a base de código com o engine Fusion, usa artefatos em Parquet e conecta aos warehouses por adapters ADBC. A primeira alpha saiu em 1º de junho de 2026 e a dbt Labs recomenda aguardar o GA para uso em produção.

## Preciso migrar para o dbt Core 2.0 agora?

Não. O v1.x continua suportado: o v1.12 tem suporte ativo até 15 de julho de 2027, e a migração não é forçada. O que vale fazer agora é preparar o projeto: subir para o v1.12, rodar `dbt parse --use-v2-parser`, zerar as deprecações e inventariar adapters e pacotes. Essa preparação reduz o risco da migração e melhora o projeto de qualquer forma.

## O dbt Core 2.0 é realmente 30 vezes mais rápido?

O número de 30 vezes se aplica ao parse, não à execução no warehouse. Em projetos de 10 mil modelos, o parse cai de mais de 60 segundos para menos de 600 milissegundos, segundo análise baseada em dados da dbt Labs. A compilação completa fica cerca de 2 vezes mais rápida. Em projetos pequenos ou médios, o ganho existe, mas é pequeno para justificar a migração por si só.
