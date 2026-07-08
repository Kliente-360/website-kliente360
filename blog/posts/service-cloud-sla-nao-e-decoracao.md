---
title: "Service Cloud: SLA não é decoração — medir capacidade antes de prometer"
slug: "service-cloud-sla-nao-e-decoracao"
pillar: "sf"
date: "2026-01-27"
readMinutes: 6
excerpt: "Empresa promete SLA de 4 horas e descobre que o time entrega em 14. A causa quase nunca é o Service Cloud — é o número que ninguém calculou antes."
tldr: "SLA é promessa medida em capacidade. A maioria das empresas configura Service Cloud com SLA pedido pelo cliente, não calculado pela operação. Resultado: violação crônica, fila esquecida, NPS em queda. Como calcular capacidade real, e como negociar SLA que cabe."
keywords: ["Service Cloud", "Salesforce", "SLA", "atendimento", "capacidade operacional"]
---

A reunião de revisão de Service Cloud quase sempre tem o mesmo gráfico: SLA prometido em 4 horas, SLA realizado em 14, com pico de 28 nas terças. A diretoria pergunta "por que o sistema não está cumprindo o que prometemos?". O time de TI tem a resposta certa, mas costuma ficar em silêncio: o sistema cumpre o que dá pra cumprir. O problema é que o número prometido nunca foi calculado — foi escolhido em reunião comercial, antes da operação ser medida.

SLA não é decoração no contrato. É promessa medida em capacidade. Esse texto é sobre o erro mais caro e mais comum de implantação de Service Cloud: configurar regras de SLA sem ter calculado a capacidade real do time que vai atender.

## A genealogia do SLA fictício

Quase todo SLA mal calibrado em Service Cloud nasce do mesmo lugar: o comercial fechou um deal prometendo "atendimento em 4 horas" porque o concorrente prometia 6. Foi pro contrato. Time de operação descobriu seis meses depois. A configuração no Service Cloud reflete a promessa, não a realidade — Entitlements, Milestones, Escalation Rules tudo apontando pra uma meta que ninguém testou contra a capacidade.

A consequência tem três faces. Primeira: violação crônica de SLA. O dashboard fica vermelho permanente, todo mundo aprende a ignorar — e quando uma violação importante acontece, ela some no ruído. Segunda: time de atendimento sob pressão constante, com burnout previsível em 6–12 meses. Terceira: NPS que cai no segundo trimestre, sem explicação clara — porque cliente percebe SLA não cumprido como quebra de promessa, não como problema de configuração.

> SLA mal calibrado polui o Service Cloud inteiro. Quando todo case está em violação, nenhum case está. O sistema vira semáforo perpetuamente quebrado.

## O cálculo que ninguém faz antes

A conta pra calibrar SLA é razoavelmente simples, e quase ninguém faz antes da implantação. Cinco números bastam pra ter o piso.

1. **Volume médio diário de casos.** Histórico de 3–6 meses de tickets que entraram (qualquer canal). Distribuído por hora do dia, dia da semana.
2. **Tempo médio de atendimento (TMA) por tipo.** Não a média geral — média *por categoria*. Caso simples (10 min), caso médio (40 min), caso complexo (3h). Categorizar antes faz diferença de duas vezes no cálculo final.
3. **Tempo produtivo do atendente.** Não 8 horas. Descontar treinamento, reunião, intervalo, ferramenta lenta, escalonamento que paralisa. Realista: 5–6 horas de trabalho efetivo por jornada.
4. **Pico vs. média.** Operação dimensionada pela média quebra no pico. Calcular pico semanal/mensal e dimensionar pra cobrir 80–90% dos picos, não a média.
5. **% de casos que precisam escalonar.** Casos que param na fila do nível 2/3 contam diferente — tempo de atendimento explode, e capacidade efetiva cai.

Com esses cinco, dá pra calcular *capacidade efetiva por hora* e *SLA atingível por categoria*. Tipicamente o número que sai é mais alto do que o prometido, e às vezes muito mais. Aceitar isso antes de implantar evita o resto.

## Como configurar Service Cloud em cima de capacidade real

Quando o cálculo foi feito, Service Cloud entrega o que deve. Quatro decisões de configuração que importam.

**SLA por categoria, não SLA único.** Caso simples tem SLA de 2 horas. Caso médio, 8 horas. Caso complexo, 24 horas. Entitlements e Milestones suportam isso nativamente. Promessa única pra tudo é o caminho mais rápido pra falhar.

**Roteamento que respeita skill, não só disponibilidade.** Omni-Channel com queues por skill, não fila única. Atendente que sabe resolver o problema termina em 30 minutos; quem não sabe escalona em 2 horas. SLA por skill é mais realista que SLA por canal.

**Escalation baseada em tempo *e* em sintoma.** Não só "passou de X horas, escalona". Também "cliente respondeu duas vezes sem resolução, escalona". Essa segunda regra captura o caso ruim antes do SLA estourar — geralmente quando o atendente já entrou em ciclo improdutivo.

**Dashboard de capacidade, não só de SLA.** Service Cloud entrega [dashboard executivo de capacidade](/blog/tableau-linguagem-executiva.html) em poucos cliques: casos abertos por atendente, idade média da fila, projeção de SLA na próxima hora. Esse painel ajuda gerente a redistribuir antes da violação — não depois.

## A conversa difícil: renegociar SLA com o cliente

Quando o cálculo mostra que o SLA prometido é impossível, o caminho honesto é renegociar — não fingir que o sistema vai dar conta. A conversa funciona melhor quando segue três passos.

**Mostrar o cálculo, não a desculpa.** Cliente respeita número, não justificativa. Apresentar: "operamos com X atendentes, capacidade real de Y casos/dia, pico semanal de Z, SLA atingível em 90% dos casos é de W horas, não 4". Argumento numérico é difícil de refutar.

**Oferecer SLA por categoria.** Cliente raramente precisa de 4 horas em *tudo*. Precisa de 4 horas em casos críticos, e tolera 12 em rotineiros. SLA escalonado por severidade resolve a tensão entre custo e expectativa.

**Vincular SLA mais agressivo a investimento.** Se cliente *de fato* precisa de SLA agressivo geral, isso muda o dimensionamento da operação — mais atendentes, ferramenta especializada, [Agentforce absorvendo o que pode ser automatizado em atendimento](/blog/agentforce-atendimento-humano.html). Aí muda o preço. SLA é custo, não promessa grátis.

## Onde Service Cloud não resolve

Vale dizer o que SLA bem configurado não conserta. Não conserta processo torto — atendente sem autoridade pra resolver continua escalonando, [como já argumentei sobre processo antes da ferramenta](/blog/mapear-processos-antes-do-salesforce.html). Não conserta produto ruim — se o cliente tem 30% de chamados sobre o mesmo bug, SLA mais apertado não muda o número de chamados, só os faz chegar mais rápido. Não substitui IA quando o volume justifica — em operação grande, agente automatizado em [casos onde dado é suficiente](/blog/quando-agente-e-resposta.html) absorve 30–50% do volume e libera capacidade.

Service Cloud bem implantado é uma das melhores plataformas de atendimento do mercado. Mas é plataforma — e plataforma exige número antes de promessa. Empresa que aceita essa lógica entrega SLA confiável e cliente confiante. Empresa que continua escolhendo SLA em reunião comercial vai gastar os próximos dois anos explicando dashboard vermelho.

## Perguntas que sempre voltam

Pra fechar, as dúvidas que mais escuto quando SLA entra na pauta.

## Como saber qual SLA minha operação consegue cumprir?

Fazendo a conta antes de prometer — cinco números bastam pra ter o piso. Volume médio diário de casos (histórico de 3–6 meses, distribuído por hora e dia da semana), tempo médio de atendimento por categoria (não a média geral — separar caso simples, médio e complexo muda o cálculo em duas vezes), tempo produtivo real do atendente (5–6 horas efetivas por jornada, não 8), pico vs. média (dimensionar pra cobrir 80–90% dos picos) e o percentual de casos que escalona pro nível 2/3.

Com esses cinco, sai a capacidade efetiva por hora e o SLA atingível por categoria. Tipicamente o número é mais alto do que o prometido — e aceitar isso antes de implantar evita o dashboard vermelho depois.

## Devo usar um SLA único ou SLA por categoria?

Por categoria, sempre. Promessa única pra tudo é o caminho mais rápido pra falhar: caso simples pode ter SLA de 2 horas, caso médio de 8, caso complexo de 24 — e Entitlements e Milestones suportam isso nativamente no Service Cloud. Cliente raramente precisa de 4 horas em tudo; precisa de 4 horas nos casos críticos e tolera 12 nos rotineiros.

O escalonamento por severidade também resolve a tensão comercial: em vez de recusar o SLA agressivo, você o restringe a onde ele importa — e se o cliente de fato precisa de agressividade geral, isso muda dimensionamento e preço. SLA é custo, não promessa grátis.

## O que fazer quando o SLA prometido no contrato é impossível de cumprir?

Renegociar com número na mesa, não fingir que o sistema vai dar conta. Cliente respeita cálculo, não desculpa: "operamos com X atendentes, capacidade real de Y casos/dia, pico semanal de Z, SLA atingível em 90% dos casos é W horas, não 4". Argumento numérico é difícil de refutar — e é mais honesto que configurar Entitlements apontando pra uma meta que ninguém testou contra a capacidade.

Deixar como está sai mais caro: violação crônica que todo mundo aprende a ignorar (e a violação importante some no ruído), burnout previsível do time em 6–12 meses e NPS caindo no segundo trimestre, porque o cliente lê SLA estourado como quebra de promessa, não como problema de configuração.
