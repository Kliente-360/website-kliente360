---
title: "Avaliação de agentes: a métrica que ninguém quer publicar"
slug: "avaliacao-de-agentes"
pillar: "ai"
date: "2026-02-03"
readMinutes: 6
excerpt: "Pilotos de IA agentiva morrem por falta de avaliação séria. Não morrem por bug — morrem porque ninguém quis medir a taxa real de acerto."
tldr: "A maioria dos projetos de agente que falham em produção falhou na avaliação muito antes. Time mede satisfação subjetiva e CSAT do canal — não a métrica desconfortável: percentual de respostas corretas no caso de uso definido. Três métricas, dois protocolos, uma regra cultural pra parar o piloto eterno."
keywords: ["avaliação de agentes", "evaluation", "IA generativa", "agentes", "métricas de IA"]
---

Em quase todo projeto de agente que vejo travado depois do piloto, a história é a mesma: o time tem satisfação alta nas pesquisas com usuários, métricas de uso boas, e nenhum número sobre a taxa real de acerto. Pergunto "em quantos por cento das interações o agente respondeu corretamente?", e a resposta é silêncio, ou uma estimativa solta — "uns 80%, acho". Aí o projeto não escala. Não porque a tecnologia não dê conta — porque ninguém sabe se ela está dando conta, e isso impede tomar decisão sobre expansão, governança ou preço.

A métrica que ninguém quer publicar é o percentual de acerto em casos reais. Esse texto é sobre por que ela some, como construir, e como conviver com o número que ela vai mostrar.

## Por que ninguém quer publicar

A razão é política, não técnica. Quando um piloto de IA é vendido pra diretoria, a promessa costuma ser implícita: "vai dar certo". Publicar a métrica real é assumir que pode dar errado — e isso ameaça o orçamento que custou política levantar. Mais fácil mostrar gráfico de uso ("crescemos 40% no mês"), NPS do usuário ("90% gostou da experiência"), tempo de resposta ("3 segundos médios"). Tudo isso é verdade e nenhum desses números diz se o agente está respondendo certo.

A consequência: o piloto vira eterno. Time não consegue defender expansão porque não tem número, e não constrói o número porque defender expansão fica mais difícil ainda quando ele aparece. O ciclo vicioso tem nome: *teatro de IA*.

Quebrar isso exige decisão consciente: medir mesmo sabendo que o número inicial vai ser desconfortável. A boa notícia é que o número desconfortável é trampolim — sem ele, não há próximo passo. Com ele, há caminho.

## Três métricas que importam de verdade

Métricas de agente se dividem em três famílias. Cada uma responde a uma pergunta diferente, e a maioria dos projetos só mede uma.

**Acurácia da resposta (task success rate).** Dos N casos em que o agente respondeu, em quantos a resposta foi correta segundo um juiz humano competente? É a métrica que ninguém quer. Exige juiz que conhece o domínio, exige protocolo de revisão, exige amostra estatisticamente significativa. Tudo isso é trabalho — e é exatamente o trabalho que cataliza o resto.

**Cobertura (resolution rate sem escalonamento).** Dos N casos que chegaram ao agente, em quantos ele resolveu sem precisar escalonar pra humano? Esse número é mais fácil de obter — sai do log do sistema. Mas isolado engana: o agente pode estar "resolvendo" respondendo errado e o usuário desistindo, o que conta como cobertura alta com acurácia baixa.

**Custo por interação resolvida.** Custo total (inferência + infra + governança) dividido por interações com acurácia confirmada. Em projetos com volume, é o número que define se a unidade econômica fecha. [Sem essa métrica, dá pra escalar piloto que perde dinheiro a cada chamada](/blog/quando-agente-e-resposta.html) — comum quando o time só olha cobertura.

Acurácia × cobertura × custo = projeto sustentável. Falta um dos três e o projeto vira hobby caro.

> Cobertura sem acurácia é o jeito mais barato de mentir num dashboard de IA. O agente "resolveu" todos os casos — e respondeu errado em metade.

## Os dois protocolos que destravam

Medir acurácia parece pesado, mas dá pra fazer com disciplina. Dois protocolos cobrem 90% dos casos.

**Eval set fixo, rodado em cada release.** Curar 50–200 perguntas representativas do caso de uso, com gabarito (resposta correta) revisado por especialista. Toda vez que o sistema muda — prompt novo, modelo novo, RAG ajustado — rodar o eval set e comparar contra o baseline. Esse protocolo captura regressão. Custo: alto pra montar (uma a duas semanas), trivial pra rodar. É o investimento técnico mais lucrativo de qualquer projeto de IA.

**Amostragem ad-hoc de produção, revisão humana.** Selecionar aleatoriamente 50–100 interações reais por semana. Especialista revisa cada uma e marca como correta, parcialmente correta ou errada. Calcula-se taxa de acerto por categoria de pergunta. Esse protocolo captura *drift* — quando o sistema funciona no laboratório e degrada em produção (distribuição de perguntas reais diferente do eval set, mudança de comportamento do modelo, decay do corpus em [RAG](/blog/rag-na-pratica.html)).

Os dois juntos cobrem teste e operação. Time que faz só o eval set descobre regressão na release mas perde drift. Time que faz só amostragem em produção pega drift mas não isola causa. Os dois protocolos juntos são a parte chata e necessária da operação séria de IA.

## A regra cultural — o juiz não é o time que construiu

Detalhe que mata a métrica: se o time que construiu o agente é o mesmo que avalia, o número fica enviesado. Não por má-fé — por viés cognitivo previsível. Construtor olha resposta parcialmente certa e tende a marcar como correta ("ah, mas no fundo tá certo"). Construtor sabe o que perguntou e completa mentalmente o que o agente não disse.

A regra que funciona: avaliação é feita por terceiro com domínio do assunto, sem acesso ao código nem ao prompt. Em projetos pequenos, é um analista de operação. Em projetos médios, é um par dedicado de revisão (rotativo se possível). Em projetos grandes, é célula separada, reportando fora do time de IA.

Sem essa separação, o número vai pra cima — e o piloto continua eterno, porque a métrica não está mostrando o que precisa mostrar pra forçar a próxima decisão.

## O que fazer com o número desconfortável

Suponha que você mediu e o resultado foi 65% de acurácia. Não bom; não terrível. Três caminhos práticos.

**Decompor o erro.** Não basta saber a taxa global. Categoriza: qual tipo de pergunta tem maior taxa de erro? É problema de retrieval (corpus não tem), de generation (o LLM ignora o contexto), ou de prompt (o agente não interpretou a pergunta)? Cada categoria exige investimento diferente.

**Definir o piso aceitável por caso de uso.** Suporte de baixo risco, 70% pode ser suficiente com escalonamento bem desenhado. Atendimento financeiro regulado, 95% é mínimo. Esse piso é decisão de produto, não de engenharia.

**Investir na camada onde dói mais.** Se erro é de retrieval, melhorar reranking ou ampliar corpus. Se é de generation, ajustar prompt ou trocar modelo. Se é de prompt, refinar instrução do agente. Iterações de 2–3 semanas com medição ao final mostram tendência clara.

A combinação que funciona: medição rigorosa + iteração focada + transparência pra diretoria sobre o número e o caminho. Esse trio é o que separa projeto de IA que vinga de projeto que entra no terceiro plano de governança em 2027.

A métrica desconfortável não é o problema. É a única ferramenta pra sair dele.
