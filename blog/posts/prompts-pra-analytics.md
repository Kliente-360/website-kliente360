---
title: "Engenharia de prompts pra analytics: o pipeline esquecido entre dado e relatório"
slug: "prompts-pra-analytics"
pillar: "data"
date: "2026-04-08"
readMinutes: 6
excerpt: "Analista joga pergunta no ChatGPT, recebe SQL, roda no warehouse, manda gráfico pro diretor. Em metade dos casos, o número está errado — e ninguém percebe."
tldr: "LLM virou parte do pipeline de analytics em quase toda empresa em 2026 — e quase ninguém trata como pipeline. Sem disciplina de prompt, validação de output e ciclo de revisão, dado certo vira insight errado. Cinco práticas que separam analytics aumentado por IA de teatro de produtividade."
keywords: ["LLM analytics", "engenharia de prompts", "SQL generation", "validação de dados", "IA"]
---

A cena nova em sala de reunião de 2026: diretor pergunta sobre métrica, analista pergunta pro ChatGPT como buscar, ChatGPT entrega SQL, analista roda no warehouse, slide vai pra reunião. Tempo total de "pergunta" a "slide": 15 minutos. Em 2022 esse fluxo levava 2 dias. Ganho enorme — e perigo igual.

Porque em pelo menos metade dos casos, o SQL gerado pelo LLM tem erro sutil: filtro errado, JOIN incompleto, métrica calculada com lógica que parece certa e não é. O número sai com cara de oficial, vira decisão, e ninguém percebe que está errado por semanas. Esse texto é sobre como tratar LLM em analytics como parte do pipeline — com a disciplina equivalente. Sem isso, o ganho de velocidade vira passivo silencioso.

## O problema do "ChatGPT que escreve SQL"

LLM ficou bom em gerar SQL em 2025–2026. Bom o suficiente pra parecer útil sempre. Não bom o suficiente pra parecer útil *sempre que parece útil*. Três modos de falha aparecem com regularidade:

**Falha 1: erro de schema sutil.** LLM acha que `orders.total` existe quando na verdade é `orders.amount_total`. O SQL roda em outra tabela parecida, retorna número que faz sentido, mas mede coisa errada.

**Falha 2: lógica de negócio embutida no prompt.** Analista pergunta "quantos clientes ativos?". LLM gera SQL com sua própria definição de "ativo" (logou em 30 dias). A empresa define ativo como "fez transação em 90 dias". Número sai 3× maior.

**Falha 3: aggregation incorreta com JOIN.** LLM gera SQL com JOIN entre fato e dimensão, mas dimensão tem duplicidade. Agregação inflate. Ninguém percebe porque o número não está absurdo — só está errado em ~15%.

Esses três combinados produzem o que eu chamo de "número parece certo, decisão sai errada". E como o LLM apresenta SQL com confiança, o analista valida menos do que validaria um SQL escrito por colega. Confiança sintética vence revisão crítica.

> Em analytics aumentado por LLM, a velocidade vem com risco escondido: SQL parece certo porque foi gerado com confiança. Sem disciplina de validação, "vou perguntar pro ChatGPT" vira "vou tomar decisão em cima de número não verificado".

## As cinco práticas que separam ganho de teatro

A disciplina que empresa séria adota quando incorpora LLM em pipeline analítico. Sem essas cinco, o ganho de velocidade vira passivo silencioso.

1. **Contexto schema-aware no prompt.** Não joga pergunta crua no LLM. Constrói prompt com schema do warehouse, descrição das tabelas-chave, definições de métricas oficiais. [dbt docs como camada semântica](/blog/dbt-na-pratica.html) alimenta isso bem. Sem contexto, LLM inventa colunas.
2. **Definições de negócio injetadas no system prompt.** "Cliente ativo = transação em 90 dias. Receita = subtotal antes de imposto e desconto. Churn = ausência de transação em 90 dias". 5–10 definições core como parte do prompt fixo. Sem isso, LLM usa definição genérica e o número diverge.
3. **Validação automática de output antes do uso.** SQL gerado roda em sandbox, validado contra eval set conhecido. "Pergunta X retorna número Y entre 1000 e 1500?". Sem validação, drift no LLM degrada output sem aviso. Mesmo princípio do [eval set pra avaliar agentes](/blog/avaliacao-de-agentes.html).
4. **Restrição a query read-only com governança.** LLM não escreve em produção. Conexão usada é read-only, com permissão restrita a tabelas analíticas. Sem isso, prompt malicioso ou erro pode causar dano real.
5. **Log de toda interação prompt → SQL → resultado.** Pra auditoria, pra entender drift, pra debugar incidente. Quem usou o quê, quando, com qual resposta. Sem log, governança de IA em analytics não existe.

Implementar os cinco transforma "ChatGPT pra SQL" em pipeline de analytics aumentado. Sem eles, é improvisação que vira incidente em 3–6 meses.

## Onde LLM em analytics realmente acelera

Não confundir o argumento. Há três contextos onde LLM bem implementado economiza tempo enorme com risco controlado:

**Tradução de pergunta de negócio em SQL.** Quem não é analista pode formular pergunta em linguagem natural, LLM gera SQL, sistema executa, devolve resposta. [Como argumentei sobre LLM como agente interno](/blog/llm-como-agente-interno.html), esse caso é um dos mais consistentes em ROI. Funciona bem com schema-aware prompt + validação.

**Geração de documentação de modelo.** dbt model novo precisa de description em 30 colunas? LLM gera primeiro draft baseado em SQL e dado de exemplo. Analista revisa. 80% do trabalho automatizado.

**Análise exploratória rápida.** Dataset novo chegou, time precisa entender estrutura, distribuição, outliers. LLM com Code Interpreter ou equivalente faz EDA em minutos. Não substitui análise séria, mas acelera entender o terreno.

Esses três casos compartilham característica: erro é tolerável e detectável, output é revisado por humano antes de virar decisão. Onde o output vira decisão sem revisão (como o caso de SQL pra slide direto), a disciplina dos cinco itens vira obrigatória.

## A armadilha do "ele entende meu negócio"

Erro mais frequente em equipes que adotam LLM em analytics: depois de 2–3 perguntas que o LLM responde bem, analista para de validar. "Ele entende como medimos receita". Mentira. Ele entende como medimos receita *nesse contexto específico, nessa formulação específica*. Mudou o prompt, mudou a tabela, mudou o trimestre — pode estar errado de novo.

A confiança que se constrói com LLM em analytics é diferente da confiança que se constrói com colega. Colega aprende com o erro. LLM não aprende — ele performa bem em conjuntos parecidos com o treino, mal em fronteiras. Tratar com a mesma confiança gera o pior dos cenários: velocidade alta + revisão baixa.

## Como medir se está rendendo

Quatro métricas dizem se LLM em analytics está sendo bem aproveitado:

**Taxa de SQL gerado que precisa correção manual.** Acima de 30%, schema-aware prompt está fraco ou eval set é insuficiente. Abaixo de 10%, o pipeline está maduro.

**Tempo médio de validação por query.** Se passa de 5 minutos, ferramenta perdeu propósito. Validação automatizada precisa cobrir 80% dos casos pra valer a pena.

**Incidentes de "número errado descoberto depois".** Conta os casos onde decisão foi tomada em SQL gerado e depois descobriu-se erro. Acima de 1/mês, governança está quebrada.

**Adoção por persona.** Analista usa? Diretor usa? Quem usa qual interface? Se só engenheiro de dados usa, a democratização não aconteceu — virou ferramenta especializada.

## A decisão pra 2026

Se sua empresa tem analistas usando ChatGPT/Claude pra gerar SQL sem governança, três movimentos:

**Crie interface controlada.** Não "abre o ChatGPT". Mas tool interna com schema-aware prompt + definições de negócio embutidas + execução em sandbox + log automático. Equivalente a "ChatGPT pra analytics" da empresa. Custos altos no início, ROI claro em 6 meses.

**Treine o time pra desconfiar.** Sessão de 1 hora mostrando os três modos de falha (schema, definição, JOIN). Quando o time entende como o LLM erra, o uso fica mais cuidadoso.

**Integre com camada semântica.** [dbt mart ou semantic layer](/blog/dbt-na-pratica.html) define métricas; LLM consulta a camada, não o warehouse cru. Reduz erro de definição em 80%.

LLM em analytics em 2026 é uma das oportunidades mais claras de produtividade — e uma das mais perigosas sem disciplina. A diferença entre as duas posturas não está em qual modelo é escolhido. Está no pipeline construído em volta, com validação, contexto e log que tratam LLM como ferramenta crítica — não como assistente confiável por inércia.

## Perguntas que sempre voltam

Pra fechar, as três dúvidas que mais escuto quando esse assunto aparece.

## Dá pra confiar no SQL que o ChatGPT gera?

Não sem validação — em pelo menos metade dos casos, o SQL gerado tem erro sutil que passa despercebido. Os três modos de falha mais comuns: coluna que não existe no schema (o LLM inventa `orders.total` quando é `orders.amount_total`), definição de negócio genérica que diverge da sua ("ativo" em 30 dias vs. 90 dias) e agregação inflada por JOIN com dimensão duplicada. Nenhum desses produz número absurdo — produz número plausível e errado.

O agravante é comportamental: como o LLM apresenta o SQL com confiança, o analista revisa menos do que revisaria o SQL de um colega. A regra prática: SQL gerado é rascunho até passar por validação — sandbox, eval set ou pelo menos revisão contra as definições oficiais de métrica.

## O que colocar no prompt pra o LLM errar menos SQL?

Duas coisas: schema do warehouse e definições oficiais de negócio — nunca a pergunta crua sozinha. O prompt precisa carregar a estrutura das tabelas-chave com descrições (dbt docs alimenta isso bem) e as 5–10 definições core como parte fixa do system prompt: o que é cliente ativo, como se calcula receita, o que conta como churn. Sem schema, o LLM inventa colunas; sem definições, usa a genérica e o número diverge.

O passo seguinte é apontar o LLM pra camada semântica (dbt mart ou semantic layer) em vez do warehouse cru — isso reduz erro de definição em 80%. Prompt bom não é frase mágica; é contexto estruturado.

## Vale a pena construir uma ferramenta interna em vez de deixar o time usar o ChatGPT direto?

Vale, se o time já gera SQL com LLM no dia a dia — o "ChatGPT aberto" sem governança é improvisação que vira incidente em 3–6 meses. A interface controlada empacota o que o uso avulso não tem: schema-aware prompt, definições de negócio embutidas, execução em sandbox read-only e log automático de toda interação. Custo alto no início, ROI claro em 6 meses.

Se ainda não dá pra construir, comece pelos movimentos baratos: conexão read-only restrita a tabelas analíticas, sessão de 1 hora treinando o time nos três modos de falha, e log de quem gerou o quê. Sem log, governança de IA em analytics simplesmente não existe.
