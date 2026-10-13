---
title: "Aposentadoria de modelo de LLM: o incidente de produção com data marcada"
slug: "aposentadoria-modelo-llm-migracao-producao"
pillar: "ai"
date: "2026-10-13"
readMinutes: 7
excerpt: "Aposentadoria de modelo de LLM é o fim do acesso a uma versão que seu agente usa. Veja o calendário, o que quebra na troca e como migrar sem incidente."
tldr: "Aposentadoria de modelo de LLM é o desligamento programado, pelo provedor, de uma versão específica de modelo que sua aplicação chama por API. Ela chega com data marcada — a Anthropic se compromete com no mínimo 60 dias de aviso em modelos públicos —, e a troca por um sucessor nunca é só mudar um identificador: formato de saída, tom, custo e comportamento em casos extremos mudam. Quem mantém inventário de modelos, uma suíte de avaliação rodando e um plano de rollback transforma a aposentadoria em tarefa de rotina; quem não mantém descobre o problema na janela do aviso."
keywords: ["aposentadoria de modelo de LLM", "depreciação de modelos de IA", "migração de modelo LLM", "regressão de modelo", "versionamento de modelos", "agentes de IA em produção"]
---

**Todo** modelo de linguagem usado em produção tem uma data de aposentadoria — só que a maioria dos times descobre isso quando o e-mail do provedor chega. Aposentadoria de modelo de LLM é o desligamento programado de uma versão específica: a chamada de API que funcionava ontem passa a devolver erro, ou, pior, é redirecionada para um sucessor que se comporta de outro jeito. Para um agente que roda atendimento, triagem ou análise todos os dias, isso é um incidente de produção com data marcada e aviso prévio — e ainda assim costuma ser tratado como imprevisto.

O assunto saiu do rodapé da documentação em 2026. O ritmo de lançamento dos laboratórios encurtou o ciclo de vida de cada versão, e as janelas de aviso são curtas perto do prazo de um projeto corporativo de IA.

## O calendário que ninguém pôs na agenda

A página de depreciações da Anthropic [se compromete com no mínimo 60 dias de aviso](https://platform.claude.com/docs/en/about-claude/model-deprecations) antes da aposentadoria de modelos públicos na API da própria empresa; em nuvens parceiras como Amazon Bedrock e Google Cloud, o calendário é outro e definido por elas. Na prática, o prazo gira perto do piso: segundo [a cobertura do Mixed](https://mixed-news.com/en/anthropic-deprecates-claude-sonnet-4-5-61-days-notice/), o Claude Sonnet 4.5 foi marcado como depreciado em 30 de setembro com aposentadoria prevista para 30 de novembro de 2026 — 61 dias.

A OpenAI mantém [uma página pública de depreciações](https://platform.openai.com/docs/deprecations) com datas por modelo. Snapshots antigos das famílias GPT-5 e o3 saem em 11 de dezembro de 2026, e vários snapshots legados de GPT-4 e GPT-3.5 têm desligamento em 23 de outubro de 2026. Resumos de terceiros indicam prazos mínimos maiores para modelos de disponibilidade geral (seis meses), mas não localizamos a política na redação do próprio provedor, e o prazo costuma ser menor para versões em preview e variantes especializadas.

Dois pontos importam mais do que a data exata. O primeiro é que 60 dias é menos do que um trimestre: em empresa com ciclo de mudança, aprovação de segurança e janela de deploy, o prazo some em burocracia antes de alguém abrir o código. O segundo é que o calendário é de cada fornecedor — quem usa três modelos de dois provedores acompanha pelo menos três datas.

> A aposentadoria de um modelo não é surpresa: é a única parte do ciclo de vida do agente que vem com aviso por escrito.

## O que quebra quando o modelo troca

O erro mais caro é tratar a migração como atualização de versão. Em software tradicional, um minor release preserva o contrato; em modelo de linguagem, o sucessor é outro sistema com o mesmo nome de família. Quatro categorias de mudança aparecem com regularidade:

1. **Formato de saída.** O novo modelo é mais rígido ou mais frouxo com JSON e schemas, acrescenta uma frase antes do bloco estruturado ou muda a ordem dos campos. O parser que lia a resposta quebra em silêncio, sem erro de API.
2. **Peso das instruções.** Um prompt de sistema calibrado ao longo de meses passa a ser obedecido de outro jeito. Regras que o modelo antigo seguia por inércia deixam de valer, e restrições que ele ignorava passam a ser aplicadas à risca.
3. **Comprimento e tom.** Respostas ficam mais longas ou mais curtas, mais cautelosas ou mais assertivas. Em atendimento ao cliente, isso muda o produto sem que ninguém tenha alterado uma linha de código.
4. **Custo e latência.** O sucessor pode ter preço por token diferente e usar mais tokens de raciocínio para a mesma tarefa. A fatura muda mesmo com o mesmo volume, o que reabre a conversa de [custos reais de inferência](/blog/custos-reais-de-inferencia.html).

O mais perigoso é o caso do alias: apontar para um nome genérico, sem versão fixada, significa que o provedor pode trocar o modelo por baixo sem aviso. Nada quebra com alarde; o comportamento deriva. Fixar a versão evita a troca silenciosa, mas só adia o problema — todo snapshot fixado tem uma data final.

## A rotina que torna a aposentadoria entediante

Consultoria especializada em agentes acaba recomendando a mesma disciplina, e ela precisa existir *antes* do e-mail de aviso. Seis práticas cobrem o essencial:

1. **Inventário de modelos.** Uma planilha com cada identificador de modelo em uso, o sistema que o chama, o provedor, a data de aposentadoria anunciada e um dono. Parece trivial e quase nenhum time tem.
2. **Versão fixada em produção.** Alias genérico só em ambiente de desenvolvimento. Em produção, a versão é explícita e a troca é uma decisão registrada.
3. **Suíte de avaliação contínua.** Um conjunto de casos reais, com critério de aprovação, rodando contra o modelo atual. Sem essa linha de base, não há como dizer se o sucessor é melhor, igual ou pior — apenas se "parece bem". É o mesmo raciocínio de [avaliar agentes com a métrica que ninguém quer publicar](/blog/avaliacao-de-agentes.html), aplicado ao momento da troca.
4. **Meta de migração 30 dias antes da data final.** Se o aviso é de 60 dias, metade do prazo é folga para o imprevisto, não margem para adiar.
5. **Rollout em estágios.** Tráfego sombra primeiro, depois uma fatia pequena de usuários, com gatilho de rollback definido por métrica — não por impressão.
6. **Modelo de contingência no mesmo calendário.** Um segundo modelo, de outro provedor ou de outra família, já testado contra a suíte. Quando a data final chega sem que a migração termine, existe um plano B de verdade.

O item 3 é o que separa as equipes. Quem roda a avaliação pela primeira vez na janela do aviso está montando o instrumento e fazendo a medição ao mesmo tempo, sob pressão de prazo.

## Arquitetura que facilita a troca

Parte do custo da migração é arquitetural. Quando o nome do modelo está espalhado em vinte arquivos e cada prompt foi escrito para as manias de uma versão específica, qualquer troca vira reforma. Três decisões de desenho reduzem esse custo:

**Uma camada de roteamento.** Um ponto único onde se decide qual modelo atende cada tarefa. É o mesmo mecanismo que sustenta [o uso de modelos pequenos no pipeline de agentes](/blog/slm-pipeline-de-agentes.html): se trocar de modelo é mudar uma configuração, a aposentadoria deixa de ser projeto.

**Prompts versionados junto com o modelo.** O prompt é parte do contrato. Guarde cada um com o identificador do modelo para o qual foi calibrado e o resultado da última avaliação.

**Saída estruturada validada.** Um validador de schema entre o modelo e o resto do sistema transforma uma mudança de formato em erro visível, não em dado corrompido.

Há aqui também um argumento de portabilidade. A aposentadoria é uma das formas mais concretas de [lock-in em plataforma de agentes](/blog/lock-in-plataforma-de-agentes.html): quanto mais o prompt, o fluxo e as ferramentas dependem das particularidades de um modelo, mais caro é sair quando ele sai de linha. Isso não pede abstração total — pede saber, em cada agente, quanto custa trocar.

## Perguntas que sempre voltam

Fechando, as dúvidas mais frequentes de times que têm agentes ou aplicações de IA em produção.

## O que é aposentadoria de modelo de LLM?

Aposentadoria de modelo de LLM é o desligamento programado, pelo provedor, de uma versão específica de modelo oferecida por API. Depois da data final, as chamadas àquela versão falham ou são redirecionadas, e a aplicação precisa migrar para um sucessor. O provedor costuma anunciar a data com antecedência; a Anthropic, por exemplo, se compromete com no mínimo 60 dias de aviso para modelos públicos.

## Fixar a versão do modelo resolve o problema?

Resolve metade. Fixar a versão evita que o provedor troque o comportamento por baixo sem aviso, o que é a forma mais difícil de detectar de regressão. Mas um snapshot fixado continua tendo data final, então a migração só é adiada. A prática completa combina versão fixada, suíte de avaliação contínua e um calendário com a data de aposentadoria de cada modelo em uso.

## Quanto tempo leva migrar um agente para um novo modelo?

Depende mais da maturidade da avaliação do que do tamanho do agente. Pela nossa experiência, com suíte de testes pronta e prompts versionados, uma migração simples leva de alguns dias a duas semanas, incluindo o rollout em estágios; sem suíte, o mesmo agente pode consumir o prazo inteiro de 60 dias só para montar a linha de base. É estimativa nossa, não benchmark de mercado.
