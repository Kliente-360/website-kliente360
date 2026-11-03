---
title: "LLM como juiz: consistência não é validade — valide o avaliador"
slug: "llm-como-juiz-validar-o-avaliador"
pillar: "ai"
date: "2026-11-03"
readMinutes: 7
excerpt: "LLM como juiz escala a avaliação de agentes, mas só vale se o próprio juiz for validado. Veja o que o estudo de 21 juízes mostra e como testar o seu."
tldr: "LLM como juiz é um modelo de linguagem que dá nota às respostas de outro modelo ou agente, no lugar de revisores humanos. Ele escala a avaliação, mas um juiz pode ser perfeitamente consistente e ainda assim discordar dos especialistas, por viés de posição ou por métrica de concordância inflada. A saída é tratar o juiz como instrumento de medição: calibrar contra rótulos humanos com kappa, trocar a ordem das respostas e medir o ruído entre execuções antes de comparar agentes."
keywords: ["LLM como juiz", "LLM-as-a-judge", "avaliação de agentes de IA", "viés de posição", "kappa de Cohen", "eval set"]
---

**LLM como juiz** parece a solução óbvia para o gargalo da avaliação de agentes. Revisar 100 interações por semana com especialista custa tempo; pedir a um modelo que dê nota às mesmas 100 custa centavos e termina em minutos. O problema é a pergunta que quase ninguém faz em seguida: quem avalia o juiz? Um modelo que dá nota é um instrumento de medição, e instrumento de medição se calibra. Sem isso, o painel de qualidade passa a mostrar uma opinião consistente, não um fato.

O assunto ganhou dados em junho de 2026, quando um estudo em larga escala mediu o comportamento de juízes de vários provedores. O resultado é incômodo para quem já automatizou a avaliação: consistência alta e validade baixa convivem bem no mesmo juiz.

## O que o estudo de 21 juízes mostra

O artigo [Reliability without Validity](https://arxiv.org/abs/2606.19544), de Norman, Rivera e Hughes, avaliou 21 juízes de nove provedores em três benchmarks públicos (MT-Bench, JudgeBench e RewardBench), em 118 execuções e cerca de 541 mil julgamentos. Três achados importam para quem opera agentes.

1. **Concordância exata infla a qualidade.** Contar quantas vezes o juiz coincide com o rótulo humano não desconta o acerto por acaso. No MT-Bench, a diferença entre concordância exata e kappa de Cohen ficou entre 33 e 41 pontos percentuais em todos os juízes. Um juiz que parece acertar 80% pode estar bem mais perto de um juiz mediano.
2. **Consistente não é imparcial.** Dois juízes já em uso em produção tiveram confiabilidade de reteste acima de 0,95 e, ao mesmo tempo, viés de posição acima de 0,10, isto é, tendência a preferir a resposta pela ordem em que ela aparece. Rodar o mesmo juiz duas vezes e obter a mesma nota prova só que ele repete o mesmo erro.
3. **O ranking de juízes muda com o benchmark.** A posição de um juiz variou em até 14 colocações entre benchmarks. Escolher o "melhor juiz" por ranking público e levar para o seu domínio é uma aposta.

Há um limite honesto: o estudo usa benchmarks estáticos, não rastros de agentes reais. Aplicar as conclusões ao seu agente é inferência nossa, mas é uma inferência conservadora, porque o agente adiciona variáveis (ferramentas, múltiplos passos) que só aumentam o ruído.

> Um juiz que repete sempre a mesma nota não é um juiz confiável; é um juiz previsível, e previsibilidade não corrige viés.

## Onde o juiz de LLM falha em agentes

No [protocolo de eval set fixo](/blog/avaliacao-de-agentes.html), a nota decide se uma release sobe ou não. Se essa nota vem de um juiz não validado, as falhas abaixo entram na decisão sem que ninguém perceba.

**Viés de posição.** Em comparações pareadas (resposta A contra resposta B), o juiz tende a favorecer uma das posições. Quando você compara o agente novo contra o antigo e o novo sempre aparece em segundo lugar, uma parte da diferença que você mede é da ordem, não do agente.

**Juiz que avalia o resultado e ignora o caminho.** A resposta final pode estar certa por sorte, com uma chamada de ferramenta errada no meio, ou errada por causa de um passo anterior. O juiz que só lê o texto final não vê isso. Para o caminho, o instrumento é o trace, como na [observabilidade de agentes](/blog/observabilidade-de-agentes.html).

**Rubrica vaga.** "A resposta é útil?" dá ao juiz liberdade para premiar o que soa bem. Critério verificável ("citou a política correta? devolveu o valor certo? escalou quando devia?") reduz a variância e torna a discordância com o humano diagnosticável.

**Mesma família de modelo.** Quando o juiz e o agente usam o mesmo modelo, existe risco de afinidade de estilo: o juiz reconhece e premia a própria forma de escrever. É uma hipótese de trabalho, não um achado do estudo, e justamente por isso vale testar no seu caso.

## Como validar o juiz antes de confiar na nota

Validar um juiz custa uma fração do que custa avaliar tudo com humanos, porque o humano entra só na amostra de calibração. A sequência que usamos em projetos:

1. **Rotule uma amostra com especialistas.** Entre 100 e 200 casos reais, com nota humana por critério, feita por quem conhece o domínio e não construiu o agente.
2. **Meça concordância com kappa, não com percentual.** Compare as notas do juiz com as humanas usando kappa de Cohen (ou kappa ponderado, para escalas ordinais). Se o número exato parecer bom e o kappa for baixo, o juiz está acertando por acaso.
3. **Troque a ordem em toda comparação pareada.** Rode cada par duas vezes, invertendo as posições, e conte quantas vezes o veredito muda. Veredito instável vira empate, não vitória.
4. **Meça o ruído entre execuções.** Rode o mesmo conjunto várias vezes. A faixa de variação é o piso de diferença que você pode considerar real; ganho menor que o ruído é ruído.
5. **Reserve o humano para os casos de fronteira.** Onde o juiz hesita ou discorda de si mesmo, encaminhe para revisão humana. O custo humano cai, e o humano passa a ver só o que importa.
6. **Revalide a cada troca.** Mudou o juiz, a rubrica ou o modelo do agente? Refaça a calibração. É o mesmo cuidado de qualquer [mudança de contexto, que deve rodar a mesma suíte antes e depois](/blog/engenharia-de-contexto-agentes-cache-compactacao.html).

Uma regra de bolso: se o kappa entre juiz e especialista não for bem melhor que o kappa entre dois especialistas escolhidos ao acaso, o juiz serve para triagem e para alertas, não para decidir release.

## Onde o juiz de LLM é uma boa ideia

Nada disso é argumento contra usar juiz automático. É argumento contra usá-lo sem calibração. Ele funciona bem para triagem em volume (separar os 5% de respostas suspeitas para revisão humana), para detectar regressão grosseira entre releases e para checar critérios objetivos, como formato, presença de citação e aderência a uma política escrita.

Funciona mal como árbitro final de qualidade subjetiva e como única fonte de verdade para ROI. O número que vai ao board precisa de rótulo humano por trás; a [conta de ROI de agente](/blog/roi-agente-ia-metricas-board.html) aguenta métrica ruim por pouco tempo. Juiz automático é o que permite medir sempre; o humano é o que permite acreditar na medida.

## Perguntas que sempre voltam

Dúvidas comuns de times que estão automatizando a avaliação de agentes.

## O que é LLM como juiz?

LLM como juiz (LLM-as-a-judge) é o uso de um modelo de linguagem para avaliar as respostas de outro modelo ou agente, atribuindo notas ou escolhendo a melhor entre duas respostas segundo uma rubrica. Serve para escalar a avaliação além do que revisores humanos conseguem cobrir, desde que o juiz seja calibrado contra rótulos humanos.

## O juiz de LLM substitui o revisor humano?

Não substitui; muda o papel do humano. O juiz cobre volume e triagem, e o especialista passa a rotular a amostra de calibração e a revisar os casos de fronteira. O estudo de 21 juízes mostra que concordância aparente pode superar a real em 33 a 41 pontos percentuais, o que torna a validação humana o que sustenta o número.

## Como saber se meu juiz é confiável?

Compare as notas dele com as de especialistas em 100 a 200 casos reais usando kappa de Cohen, rode cada comparação pareada nas duas ordens e meça a variação entre execuções repetidas. Se o kappa for baixo, se o veredito mudar com a ordem ou se a variação for maior que as diferenças que você quer detectar, o juiz ainda não está pronto para decidir release.
