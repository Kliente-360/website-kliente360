---
title: "Salesforce ROI — a matriz que vendedor de licença não mostra"
slug: "salesforce-roi-matriz"
pillar: "sf"
date: "2026-06-23"
readMinutes: 7
excerpt: "ROI de Salesforce tem três custos que a proposta comercial omite. A matriz que separa investimento que rende de investimento que sangra."
tldr: "O ROI real de Salesforce inclui licença, implementação, operação contínua e custo de oportunidade — não só os dois primeiros. Uma matriz de quatro variáveis (ticket médio, complexidade de processo, maturidade operacional e horizonte de retorno) decide se o investimento faz sentido. Sem ela, a comparação favorece sempre Salesforce — na apresentação do vendor."
keywords: ["Salesforce", "ROI", "CRM", "custo total de implementação", "Sales Cloud"]
---

ROI é a palavra que abre e fecha toda conversa de Salesforce Enterprise. O deck do vendor traz os números: produtividade de vendedor aumenta 38%, ciclo médio reduz 24%, retenção melhora 27%. Números reais, de pesquisas reais — mas em base de clientes que já estão usando Salesforce, ou seja, base com viés de seleção significativo.

A questão não é se Salesforce entrega ROI. Entrega, quando a decisão está certa. A questão é que o modelo do vendor calcula receita projetada de cima e custo de licença de baixo, e chama de TCO. Não é TCO. É custo de entrada. O custo que transforma a conta é o que aparece depois do go-live.

## O que o deck do vendor não inclui

A proposta comercial típica de Salesforce lista três linhas de custo: licença anual, implementação e treinamento inicial. Raramente incluem as três linhas que determinam se a conta fecha em 36 meses.

**Custo de operação contínua.** Admin certificado interno ou parceiro de sustentação. Em empresas de médio porte (30–150 licenças), esse custo varia entre R$ 8.000 e R$ 25.000/mês — dependendo do volume de releases, integrações que precisam de manutenção e Flows que precisam de revisão. Esse número não aparece na proposta. Aparece na segunda fatura do parceiro.

**Custo de adaptação organizacional.** Processo novo, mudança de comportamento e retrabalho de dado legado. Não existe projeto de Salesforce sem esses três. O número que vemos em diagnóstico: 1,5x o custo de implementação, diluído em 12–18 meses. É o custo de fazer o Salesforce dizer a verdade — porque no go-live ele diz o que a empresa migrou, não o que a empresa faz de fato.

**Custo de oportunidade da alternativa.** Hubspot ou Pipedrive, bem configurados, resolvem 60–80% das necessidades de uma operação de médio porte por 15–25% do custo total. Esse custo de oportunidade deveria aparecer na conta comparativa. Raramente aparece. O vendor tem interesse em não mostrar — e o cliente raramente tem benchmark.

> O custo de Salesforce não é o que está na proposta. É o que está na operação dois anos depois do go-live.

## A matriz de quatro variáveis

Existe uma forma estruturada de decidir se o ROI fecha — sem depender do modelo do vendor. Quatro variáveis determinam o resultado:

1. **Ticket médio anual por cliente.** Salesforce começa a fazer sentido financeiro quando o cliente médio gera R$ 150k+ em receita anual. Abaixo disso, a proporção entre custo da plataforma e margem gerada raramente fecha em 36 meses. PME de ticket baixo, como detalhado na análise de [quando NÃO usar Salesforce](/blog/quando-nao-usar-salesforce.html), vira equação ruim por design — independente de quantas features a plataforma oferece.

2. **Complexidade do processo comercial.** Número de estágios de venda, quantidade de tomadores de decisão no cliente, ciclo médio em dias, regras de precificação distintas por produto. Salesforce é excelente em complexidade alta — mas carrega custo de operação proporcional à complexidade que você trouxe pra dentro. Processo simples em plataforma complexa gera despesa sem retorno equivalente.

3. **Maturidade operacional do time.** Admin certificado (ou contratável), processo de release definido, capacidade de traduzir demanda de negócio em requisito de CRM. Sem esse músculo, Salesforce não é plataforma — é dívida técnica com interface bonita. O custo de operação contínua sobe quando o time não tem essa estrutura, porque cada customização nova gera retrabalho no trimestre seguinte.

4. **Horizonte de retorno aceitável.** ROI de Salesforce fecha — mas raramente antes de 24 meses de operação estabilizada. Empresa que precisa de retorno em 12 meses vai ter frustração antes de ter ROI. O modelo do vendor normalmente projeta retorno a partir do mês 6, que é o mês do go-live, não o mês em que a operação está rodando de verdade com dado limpo e adoção real.

## Como usar a matriz antes de assinar

O exercício é direto: preencher as quatro variáveis com números reais, não projeções de deck.

1. **Calcule o custo total em 36 meses:** licença + implementação + operação contínua + adaptação organizacional. Regra de bolso conservadora: o custo real do primeiro ciclo equivale a 2,5–3x o custo de licença anual. Se o parceiro de implementação der número menor, peça a justificativa detalhada.

2. **Calcule o custo da alternativa pelo mesmo período:** Hubspot Pro, Pipedrive Advanced, ou equivalente para o porte. Inclua configuração e customização necessária. A diferença entre as duas contas é o prêmio que você está pagando por Salesforce.

3. **Calcule o ganho diferencial que só Salesforce entrega nesse cenário:** automação que a alternativa não cobre, integração nativa que economiza time de engenharia, dados unificados que a alternativa não tem. Seja honesto sobre o que é diferencial real e o que é feature que o time nunca vai usar.

4. **Veja se o ganho diferencial justifica o prêmio** no horizonte de 36 meses — com 20% de margem para imprevistos de projeto. Se fechar com folga: decisão robusta. Se fechar na margem: o projeto precisa de controle de escopo rigoroso. Se não fechar: o processo provavelmente não é complexo o suficiente para justificar a plataforma.

Como o [mapeamento de processo antes do Salesforce](/blog/mapear-processos-antes-do-salesforce.html) deixa claro, o momento certo para rodar esse exercício é antes da RFP, não depois. Quando o vendor já está na mesa com proposta pronta, o viés de confirmação faz a conta sempre fechar — porque todo número incerto é estimado para o lado favorável.

## Cinco perguntas que o vendedor de licença não vai trazer

Além da matriz, cinco perguntas que mudam a conta:

1. **Qual o custo mensal de operação contínua com admin certificado, pós go-live?** Se a resposta for "isso depende", peça range baseado em casos comparáveis ao seu porte. Não feche contrato sem esse número.

2. **Qual o custo de migração de dado legado — e quem paga se o dado estiver sujo?** Dado sujo é regra, não exceção. A proposta que não menciona esse custo está omitindo o maior risco do projeto. [A migração de Pardot para Marketing Cloud Engagement](/blog/migracao-pardot-marketing-cloud.html) é exemplo concreto: a maior parte do custo real só aparece depois da assinatura.

3. **Qual o modelo de suporte após o go-live?** Parceiro de implementação e parceiro de sustentação raramente são a mesma conta. O [modelo de parceiros do Salesforce](/blog/salesforce-partner-program.html) tem tiers e obrigações que o cliente só entende quando precisa de suporte urgente — e já pagou pela surpresa.

4. **Qual a métrica de adoção que indica sucesso em 90 dias?** Se a resposta for "login de usuário", o projeto vai mal. Adoção real é processo registrado, dado útil para decisão e gestor usando o funil — não vendedor logado.

5. **O que acontece se o projeto atrasar 3 meses?** Contrato de licença geralmente começa a correr na assinatura, não no go-live. Três meses de atraso são três meses de licença paga antes da entrega. Quem absorve esse custo?

## ROI honesto rende mais que ROI otimista

Empresa que entra no projeto com expectativas calibradas, processo definido e time com músculo de operação geralmente extrai ROI real. Não o da apresentação de vendor, mas ROI mensurável: produtividade de vendedor, previsibilidade de receita, dado confiável para decisão.

Quem entra com o modelo de vendor e descobre o custo real dois anos depois não vai embora — porque migrar é caro demais. Vai terceirizar a culpa ao produto, cortar investimento em operação e colher o pior dos mundos: licença cara, operação mal sustentada, dado pouco confiável.

> A diferença entre projeto de Salesforce que rende e projeto que sangra raramente está no produto. Está na qualidade do diagnóstico antes da assinatura.

A matriz não garante ROI. Garante que a decisão foi tomada com os números certos — e quando o retorno for menor que o esperado, pelo menos não é surpresa.

## Perguntas que sempre voltam

Antes de fechar, as três dúvidas que mais aparecem quando essa conta entra na mesa.

## Quanto custa Salesforce de verdade, além da licença?

Regra de bolso conservadora: o custo real do primeiro ciclo equivale a 2,5–3x o custo de licença anual. A proposta comercial lista licença, implementação e treinamento — mas omite as três linhas que decidem se a conta fecha em 36 meses: operação contínua (R$ 8.000–25.000/mês em empresa de 30–150 licenças), adaptação organizacional (cerca de 1,5x o custo de implementação, diluído em 12–18 meses) e o custo de oportunidade da alternativa mais barata.

Por isso a conta certa é sempre o total de 36 meses — licença + implementação + operação + adaptação. Se o parceiro de implementação der número menor que esse múltiplo, peça a justificativa detalhada antes de assinar.

## Em quanto tempo o ROI de Salesforce aparece?

Raramente antes de 24 meses de operação estabilizada. O modelo do vendor costuma projetar retorno a partir do mês 6 — mas esse é o mês do go-live, não o mês em que a operação está rodando de verdade com dado limpo e adoção real. Empresa que precisa de retorno em 12 meses vai ter frustração antes de ter ROI.

E adoção real não é login de usuário: é processo registrado, dado útil pra decisão e gestor usando o funil. Quem entra com expectativa calibrada e time com músculo de operação extrai ROI mensurável; quem entra com o modelo do vendor descobre o custo real dois anos depois — e migrar já é caro demais.

## Vale mais a pena Hubspot ou Pipedrive do que Salesforce?

Depende das quatro variáveis da matriz — mas pra boa parte das operações de médio porte, sim. Hubspot ou Pipedrive bem configurados resolvem 60–80% das necessidades por 15–25% do custo total. A diferença entre as duas contas é o prêmio que você paga por Salesforce, e esse prêmio só se justifica pelo ganho diferencial que a alternativa não entrega.

O corte financeiro mais direto: Salesforce começa a fazer sentido quando o cliente médio gera R$ 150k+ de receita anual e o processo comercial é de complexidade alta. Ticket baixo com processo simples em plataforma complexa é equação ruim por design — despesa sem retorno equivalente, independente das features.
