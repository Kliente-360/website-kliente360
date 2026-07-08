---
title: "Métricas de produto: por que north star vira \"north dust\" em 6 meses"
slug: "metricas-de-produto-north-dust"
pillar: "data"
date: "2026-03-10"
readMinutes: 6
excerpt: "Times de produto adoram definir uma north star metric. Seis meses depois, ninguém olha. O motivo não é a métrica errada — é o que falta em volta dela."
tldr: "North star metric não falha por estar errada. Falha porque vira número solto, sem desdobramento operacional, sem ritmo de revisão, sem dono. O que separa empresa que opera por métrica de empresa que tem métrica decorativa é o sistema em volta — não o KPI."
keywords: ["métricas de produto", "north star", "KPI", "OKR", "product analytics"]
---

A história típica do ano de produto: janeiro, off-site, time de produto se junta com fundadores e CMO pra escolher *a* métrica que define sucesso. Discussão de dois dias, framework de Sean Ellis ou Reforge, votação. Sai uma north star — *Weekly Active Teams*, *Activation Rate*, *Monthly Recurring Engagement Score*. Cola na parede. Vira slide na all-hands. Por três meses, todo mundo cita.

Em junho, ninguém mais olha. O dashboard existe mas ficou desatualizado. As decisões voltaram a ser tomadas pelo barulho da semana — cliente reclamou, board cobrou, comercial pediu. A north star virou north dust. E a culpa, na grande maioria dos casos, *não está na escolha da métrica*. Está no que faltou construir em volta dela.

Esse texto é sobre por que isso acontece e o que separa empresa que opera por métrica de empresa que decora a parede.

## O problema não é a métrica

A primeira tentação após uma north star morrer é trocar de métrica. Off-site novo, framework novo, agora sim. Em seis meses, a mesma morte. Trocar de métrica é como trocar de tipografia num livro mal escrito.

A métrica é a camada visível. Embaixo dela tem que ter um sistema — e o sistema é o que falta na maioria das empresas. Quatro elementos formam esse sistema, e a ausência de um deles é o que faz north star virar enfeite.

> North star metric isoladamente é uma frase numa parede. Sem desdobramento, ritmo, dono e ação, a métrica não muda decisão alguma — vira o dashboard que diretoria olha uma vez por trimestre.

## Os quatro elementos que faltam

A régua que aplicamos antes de aprovar qualquer projeto de "definir north star". Faltando dois ou mais, o projeto vai falhar — não importa qual métrica escolheram.

1. **Desdobramento em métricas operacionais.** North star é alta demais pra ser acionável. Activation Rate global é abstração — não diz o que vendedor deve fazer hoje. Precisa ter 4–7 métricas operacionais embaixo (taxa de cadastro completo, % usuários que ativam recurso X em 7 dias, retenção D7) que *causam* a north star. Sem isso, o time olha o número mas não sabe o que mover.
2. **Ritmo de revisão calibrado.** Reunião semanal pra olhar north star é overkill — ela não move tão rápido. Reunião trimestral é tarde demais — o problema já cresceu. O ritmo que funciona: revisão semanal das métricas operacionais (15 min), revisão mensal da north star com causa-raiz (1h), revisão trimestral pra recalibrar (meio-dia). Sem esse ritmo, métrica olha-se quando "lembra" — e ninguém lembra.
3. **Dono nominal por métrica.** Cada métrica operacional tem *uma pessoa* responsável. Não "o time de produto", não "growth". Nominal: Maria responde pela retenção D7, João pela taxa de cadastro. Quando degrada, ela explica e age. Sem dono, a métrica vira responsabilidade difusa — que é o mesmo que nenhuma responsabilidade.
4. **Loop de ação pra cada degradação.** Quando a métrica cai 10%, o que acontece? Sem playbook, vira reunião pra discutir reunião. Com playbook: análise nas primeiras 48h, hipótese em uma semana, experimento em duas. Não é roteiro de papel — é músculo organizacional. Empresa que tem isso reage a sinal; empresa que não tem só registra histórico.

Esses quatro são chatos de implementar. É por isso que empresas pulam pra "vamos definir uma boa métrica" — é mais glamouroso. E é por isso que north stars morrem em seis meses.

## Os três sintomas de north star moribunda

Antes da morte completa, três sinais aparecem. Vale identificar cedo.

**Sintoma 1: discussão sobre como calcular a métrica volta toda vez.** "Espera, mas usuário ativo é quem fez login ou quem usou X?". Se essa pergunta volta no segundo trimestre, a métrica não tem definição firme. Vai morrer por ambiguidade — cada um vai medir do seu jeito e o número vai divergir entre relatórios.

**Sintoma 2: dashboard desatualizado por mais de 2 semanas.** Build quebrou, fonte mudou, ninguém arrumou. Se a empresa tolera 2+ semanas sem atualização, a métrica não é central — é referência. Métricas centrais são consertadas em horas porque alguém precisa delas.

**Sintoma 3: discussões de produto não citam a métrica.** Roadmap quarter novo, alguém pergunta "como isso move nossa north star?" e silêncio. A métrica virou ornamento. Time prioriza por intuição, cliente que gritou, e voltou ao caos. Sintoma terminal.

Quando os três aparecem juntos, a métrica está morta — independente do que o dashboard mostra. Vale matar formalmente e refazer o sistema.

## Como construir o sistema antes de escolher a métrica

A sequência que evita o problema desde o início. Inversa do que se faz na maioria das empresas.

**Primeiro: definir como produto vai operar com métrica.** Quem revisa, quando, com que cadência, que ação esperada. Antes de qualquer número. Se a empresa não tem cabeça pra esse compromisso, qualquer métrica vai virar decoração.

**Segundo: definir as métricas operacionais.** As 4–7 métricas que o time *de fato* move em sprint. Cadastro, ativação, retenção, monetização. Cada uma com dono, definição firme, dashboard funcionando.

**Terceiro, e só agora: definir a north star.** Que sintetiza as operacionais e responde "estamos crescendo de verdade?". A north star vira função das operacionais, não substituto delas.

Quem faz nessa ordem mantém north star viva. Quem faz o inverso (north star primeiro, esperando que o resto se monte sozinho) descobre em seis meses que a métrica virou ornamento.

## O paralelo com BI executivo

A mesma armadilha aparece em [dashboards executivos que mostram número mas não viram decisão](/blog/tableau-linguagem-executiva.html). North star sem sistema é dashboard sem decisão — visualmente impressiona, operacionalmente vazio.

E ressoa com o problema mais geral de [dado limpo ser mito quando não há caso de uso definido](/blog/dado-limpo-e-um-mito.html): métrica perfeita sem sistema operacional é o equivalente em produto. Sem o uso ao redor, qualquer número vira "número certo, decisão nenhuma".

## A decisão honesta pra 2026

Se sua empresa tem north star e ninguém olha mais, a opção certa não é trocar a métrica. É montar o sistema em volta. Quatro perguntas pra autodiagnóstico:

1. Cada métrica operacional tem dono nominal? Se não, comece por aí.
2. Existe ritmo de revisão (semanal/mensal/trimestral) calibrado e calendarizado? Se não, defina antes de qualquer mudança.
3. Quando a métrica degrada, existe playbook de ação? Se não, escreva o primeiro — mesmo que rascunho.
4. As decisões de produto da última quarter citaram explicitamente a métrica? Se sim, está viva. Se não, está moribunda.

Respondendo as quatro com sinceridade, fica claro se o problema é a métrica (raro) ou o sistema em volta dela (quase sempre). Empresa que aceita essa lógica gasta menos tempo escolhendo a próxima north star perfeita e mais tempo construindo o músculo de operar por métrica — que é o que de fato move o ponteiro. [O mesmo princípio vale pra análise de churn](/blog/analise-de-churn.html): definição antes de modelo, sistema em volta antes de dashboard.

## Perguntas que sempre voltam

Antes de encerrar, as dúvidas que mais escuto quando esse tema aparece.

## Vale a pena trocar a north star quando ela para de funcionar?

Quase nunca — trocar de métrica sem consertar o sistema em volta é garantir a mesma morte em seis meses. O problema raramente é a escolha (o off-site novo com framework novo produz outra métrica que vai morrer igual); o problema é o que falta embaixo: desdobramento em métricas operacionais, ritmo de revisão, dono nominal e playbook de ação.

O caminho honesto é o autodiagnóstico primeiro: cada métrica operacional tem dono? Existe cadência calendarizada? Existe playbook quando degrada? As decisões da última quarter citaram a métrica? Se a resposta revela sistema ausente — que é o caso quase sempre —, monte o sistema. Trocar a métrica só se justifica no caso raro em que ela de fato está errada.

## Com que frequência revisar a north star?

Mensal, com análise de causa-raiz, em cerca de 1 hora — nem semanal (overkill, ela não move tão rápido), nem trimestral (tarde demais, o problema já cresceu). Quem se olha toda semana são as métricas operacionais, em revisão curta de 15 minutos, porque são elas que o time move em sprint.

Fecha o ciclo a revisão trimestral de recalibração, de meio dia. Sem esse ritmo em três camadas, calendarizado, a métrica passa a ser olhada "quando alguém lembra" — e ninguém lembra. Ritmo sem calendário é intenção, não sistema.

## Como saber se a nossa north star ainda está viva?

O teste mais direto: as decisões de produto da última quarter citaram a métrica explicitamente? Se alguém pergunta "como isso move nossa north star?" no planejamento de roadmap e a resposta é silêncio, ela virou ornamento — sintoma terminal.

Antes disso, dois sinais de alerta aparecem: a discussão sobre como calcular a métrica volta toda hora (definição ambígua, cada relatório mede de um jeito), e o dashboard fica desatualizado por mais de 2 semanas sem ninguém consertar (métrica central se conserta em horas, porque alguém precisa dela). Quando os três sinais aparecem juntos, a métrica está morta independente do que o dashboard mostra — vale matar formalmente e refazer o sistema.
