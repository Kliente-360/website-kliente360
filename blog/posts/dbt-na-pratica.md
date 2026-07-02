---
title: "dbt na prática: o pulo do gato é a documentação, não o modelo"
slug: "dbt-na-pratica"
pillar: "data"
date: "2026-01-20"
readMinutes: 6
excerpt: "Times adotam dbt pelo SQL versionado e testes — e descobrem em seis meses que o valor real está em outro lugar: na documentação que mantém o warehouse vivo."
tldr: "dbt entrega versionamento, testes e modularidade em SQL. Mas o ganho que distingue uso amador de uso maduro está na disciplina de documentar — descrições, contratos, ownership. Sem isso, dbt vira só ETL com sintaxe nova. Com isso, vira o sistema operacional do warehouse."
keywords: ["dbt", "data warehouse", "data engineering", "documentação de dados", "data modeling"]
---

A primeira reação ao adotar dbt costuma ser técnica e justa: SQL versionado, testes que rodam no CI, lineage automático, modularidade que substitui aquele script de 800 linhas. Tudo isso é real e vale o esforço de migrar. Mas seis meses depois, time olha pra trás e percebe que o ganho que mudou o jogo foi outro — e quase ninguém vendeu dbt por esse ângulo na adoção. O verdadeiro pulo do gato é a **documentação**: a coluna `description`, o schema YAML, a obrigação cultural de descrever o que um modelo significa antes que ele entre em produção.

Esse texto é sobre por que documentação em dbt vale mais que qualquer outro recurso, e o que fazer pra extrair esse valor de propósito — não por acaso.

## O que dbt entrega de cara

Antes de ir pra documentação, vale reconhecer o pacote técnico que dbt entrega — porque tem valor real. SQL em arquivos versionados no Git substitui scripts soltos no editor do warehouse. Testes declarativos (`unique`, `not_null`, `accepted_values`, `relationships`) capturam regressões antes do dashboard quebrar. Macros e Jinja permitem reuso sem copiar SQL. `ref()` resolve dependências automaticamente — fim do `DROP TABLE` no lugar errado. CI gera o lineage e roda testes a cada PR.

Tudo isso já justifica adoção. Mas é o piso, não o teto. Time que para nesse pacote tem uma versão melhor do mesmo ETL que tinha antes. Time que avança pra documentação tem outra coisa.

## Por que documentação muda o jogo

Toda empresa de médio porte tem o mesmo problema com warehouse: ninguém sabe o que cada tabela significa. A coluna `status` na tabela `orders` quer dizer o quê — fluxo logístico, financeiro, comercial? Pode ter três significados em três schemas, e o analista escolhe um por intuição. Resultado: relatórios que parecem certos mas medem coisas diferentes, métricas que divergem entre áreas, e seis meses por ano gasto em "por que esse número é diferente naquele dashboard".

dbt não resolve esse problema sozinho — ele oferece a *infraestrutura* pra resolver. Cada modelo tem um arquivo `.yml` com descrição do modelo, descrição de cada coluna, testes associados, owner. Cada coluna pode ter `meta` com tags de domínio, sensibilidade, fonte. O `dbt docs` gera um site navegável com lineage visual + descrições + testes + freshness. Quando preenchido, esse site vira o **dicionário canônico** do warehouse — [resolvendo 80% do que um Data Catalog premium tentaria entregar](/blog/data-catalog-ninguem-usa.html), sem a licença anual.

> dbt sem documentação é ETL com sintaxe nova. dbt com documentação é o sistema operacional do warehouse — o lugar onde a empresa concorda sobre o que cada número significa.

A diferença operacional aparece três meses depois: novo analista entra, lê o `dbt docs`, entende o que cada modelo faz. Métrica que parecia divergente é resolvida em 5 minutos no lineage. Time de produto pergunta "o que conta como cliente ativo?" e a resposta está no `description` do modelo, escrita pelo dono. Conversa que antes durava reunião agora dura 2 minutos.

## Cinco regras pra extrair o valor real

A diferença entre time que aproveita dbt e time que não aproveita é disciplina. Cinco regras que vemos funcionar.

1. **Description é PR-blocker.** Modelo sem descrição não passa no CI. Coluna sem descrição em modelo `mart` (a camada que negócio consome) não passa no CI. Soa rígido — é rígido de propósito. Sem essa régua, descrição vira backlog perpétuo.
2. **Owner explícito no `.yml`.** Cada modelo tem um humano responsável (tag `owner` no `meta`). Quando alguém quebra, é claro quem chamar. Sem owner, modelo órfão vira modelo abandonado em 6 meses.
3. **Source freshness como teste.** Definir `freshness` em cada `source` (Salesforce, Stripe, segment, etc.) com SLA explícito. Quando a fonte atrasa, o time sabe antes do dashboard sair errado. Esse é um dos testes mais subvalorizados do dbt — e a base mais simples dos [cinco eixos de observabilidade de dados](/blog/observabilidade-de-dados.html): frescor detecta a maior fatia de falhas de pipeline com o menor esforço de instrumentação.
4. **Camadas explícitas: staging / intermediate / marts.** Staging é raw renomeado e tipado. Intermediate é lógica reutilizável. Marts é o que o negócio consome. Misturar camadas é a forma mais rápida de o warehouse virar bagunça. dbt facilita a separação — usar é disciplina.
5. **Exposições documentadas.** Tag `exposure` aponta para o dashboard ou aplicação que consome o modelo. Quando alguém vai mudar o modelo, vê o que vai quebrar a jusante. Combinado com lineage, fecha o ciclo entre warehouse e [BI que ativa decisão](/blog/tableau-linguagem-executiva.html).

Cinco regras simples — nenhuma exige plugin novo. Exigem cultura. Sem elas, dbt vira repositório com SQL bonito e dicionário vazio.

## O argumento contra: "vamos documentar depois"

A objeção previsível em todo projeto: "vamos primeiro montar os modelos, depois a gente documenta". Soa pragmático. Em três meses, ninguém documentou. Em seis meses, o time esqueceu por que aquele modelo existe. Em doze meses, o analista novo recria modelo paralelo porque não confia no existente.

Documentar depois não funciona pela mesma razão que [esperar dado limpo antes de usar não funciona](/blog/dado-limpo-e-um-mito.html) — é trabalho contínuo, não fase com fim. A diferença é que dbt já tem o lugar pra colocar a descrição. Não escrever no momento de criar o modelo é deixar dívida nascendo capitalizada. Cinco minutos no PR economizam três meses no próximo trimestre.

## Como começar bem

Se você está adotando dbt agora, três movimentos práticos que rendem mais que escolher a versão do dbt-core:

**Setup com schema YAML obrigatório desde o dia 1.** Configurar o CI pra falhar quando modelo `mart` não tem description completo. Brigar com o time uma vez no início é mais barato que recuperar documentação seis meses depois.

**Comece pelo mart, não pelo staging.** Defina o que o negócio precisa consumir, escreva descrição antes de criar o modelo, depois construa as camadas que alimentam. Disciplinariamente backward é mais barato que tecnicamente forward.

**Trate `dbt docs` como produto interno.** Apresente em reunião de área, deixe o link na intranet, treine analista pra usar antes do warehouse. Documentação que ninguém abre é overhead. Documentação que vira primeiro recurso de consulta paga seis vezes o esforço de manter.

dbt sem essa disciplina é só uma versão melhor do ETL antigo — e melhor do ETL antigo já é alguma coisa. Com essa disciplina, vira a peça que faz o warehouse parar de ser uma caixa-preta. A diferença entre os dois usos é uma cultura, não uma feature. ([No mapa do que sobreviveu do Modern Data Stack em 2026](/blog/modern-data-stack-2026.html), transformação versionada como código é uma das três peças que passaram o teste — e dbt foi quem provou a tese.)
