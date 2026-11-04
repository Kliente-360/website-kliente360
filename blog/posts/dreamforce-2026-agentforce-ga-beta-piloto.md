---
title: "Dreamforce 2026: o que é GA, beta e piloto no Agentforce"
slug: "dreamforce-2026-agentforce-ga-beta-piloto"
pillar: "sf"
date: "2026-11-04"
readMinutes: 7
excerpt: "Dreamforce 2026 misturou o que já se compra com o que ainda é piloto. Um filtro de quatro estágios para separar anúncio de produto antes de orçar Agentforce."
tldr: "Ler um anúncio de Dreamforce é separar quatro estágios de disponibilidade — GA, beta aberto, piloto e anunciado sem data — porque só o primeiro é algo que se compra, se orça e se coloca em roadmap. No Dreamforce 2026, Agentforce Coworker já era GA, o Agent Optimizer e o Slackforce tinham GA prometido para outubro, os agentes de longo horizonte estavam em piloto, o modelo Koa em piloto restrito e o AIforce sem data. A decisão útil não é adotar tudo nem ignorar tudo: é instrumentar o que já é GA, pilotar o que está próximo e tratar o resto como direção do fornecedor."
keywords: ["Dreamforce 2026", "Agentforce GA beta piloto", "Agentforce Coworker", "Koa Salesforce", "roadmap Agentforce", "Agent Optimizer"]
---

**Dreamforce 2026** entregou, em um único palco, produtos que já se compram e produtos que ainda estão em piloto restrito. O recap oficial e a cobertura da imprensa tratam tudo com o mesmo tom de lançamento. Para quem precisa aprovar orçamento de Agentforce no primeiro trimestre, essa uniformidade é o problema: o slide de keynote não diz qual item você pode contratar na segunda-feira.

A diferença entre os estágios de disponibilidade decide prazo, custo e risco. Um item em piloto não tem preço público, não tem SLA e muda antes de chegar ao GA. Um item em GA tem documentação, licenciamento e suporte. Planejar 2027 em cima do primeiro grupo é planejar sobre intenção.

## Os quatro estágios que um anúncio pode ter

Todo anúncio de plataforma cai em um de quatro estágios. Conhecê-los evita a leitura mais comum e mais cara: tomar a demonstração como disponibilidade.

1. **GA (disponibilidade geral).** Contratável hoje, com documentação, preço e suporte. É o único estágio sobre o qual se faz orçamento.
2. **Beta aberto.** Qualquer cliente elegível ativa, mas sem garantia de estabilidade, sem preço fechado e com mudança de comportamento entre releases. Serve para aprender, não para operar processo crítico.
3. **Piloto.** Acesso por convite, normalmente com a equipe do fornecedor junto. Os resultados mostrados no palco vêm daqui. Não é replicável por qualquer cliente.
4. **Anunciado sem data.** Direção de produto. Útil para entender para onde a plataforma vai; inútil para cronograma.

> Anúncio de keynote não é disponibilidade. Só o que tem GA, preço e documentação entra no orçamento do próximo trimestre.

## O que cada anúncio era, de fato

Segundo o [recap oficial da Salesforce](https://www.salesforce.com/blog/dreamforce-2026-announcements/), publicado em 28 de setembro, o quadro de estágios era o seguinte:

- **Agentforce Coworker:** GA. Assistente autônomo dentro do Salesforce, que busca respostas em CRM, Slack e outras fontes conectadas.
- **Agent Optimizer:** GA prometido para outubro. Constrói, testa e refina outros agentes.
- **Slackforce:** GA prometido para outubro. A mesma ideia dentro do Slack.
- **Agentes de longo horizonte:** piloto, com GA prometido para novembro. Perseguem metas de dias a meses, com checkpoints de aprovação humana.
- **Koa:** piloto. O primeiro modelo de raciocínio da Salesforce para CRM, construído sobre o NVIDIA Nemotron, com GA esperado só no inverno do hemisfério norte e, segundo a [análise do Beri](https://www.beri.net/article/dreamforce-2026-agent-operations-koa-pilot-claudeforce-open-beta), apenas em regiões dos EUA.
- **Claudeforce:** beta aberto, distribuído pelo AppExchange.
- **AIforce:** camada de interface que leva dados do Data 360 e ações do Agentforce para outras superfícies de IA. Sem data de GA.

Duas observações. Primeiro, as datas de outubro já passaram: confira nas release notes da sua edição se o item de fato chegou, porque "prometido" e "ativo na sua org" são coisas diferentes. Segundo, os números de desempenho do Koa, como a promessa de "três vezes menos erros", vêm de um benchmark da própria Salesforce, sem metodologia publicada. É informação de fornecedor, não medição independente.

## Onde está o valor que já dá para usar

O padrão do Dreamforce 2026 repete o dos anteriores: as revelações de maior destaque, Koa e AIforce, são as que menos se podem comprar agora. O que já está disponível, e que rende mais para quem tem agente em produção, é a camada de operação: observabilidade de sessão, rastreio de ações, latência e o Optimizer para diagnosticar falhas.

Essa é a parte menos glamorosa e a mais útil. Um agente que ninguém consegue inspecionar não escala, e [observabilidade de agentes](/blog/observabilidade-de-agentes.html) é o pré-requisito para qualquer das novidades de longo horizonte funcionar: agente que roda por semanas, sem rastro do que decidiu, é risco acumulando.

A segunda razão para cautela é o custo. Pelo preço de tabela de Flex Credits, cada crédito custa US$ 0,005 e uma ação padrão consome 20 créditos, cerca de US$ 0,10. Ações com mais de 10.000 tokens podem contar como múltiplas ações, de modo que uma arquitetura multiagente pode multiplicar a cobrança sem que o número de conversas mude. Essa mecânica, e as seis formas de comprar Agentforce, estão no nosso texto sobre [os seis modelos de pricing do Agentforce](/blog/agentforce-pricing-seis-modelos.html).

## Cinco perguntas para qualquer anúncio de plataforma

Aplique estas perguntas a cada item antes de colocá-lo em roadmap. Elas servem para Salesforce e para qualquer fornecedor.

1. **Qual é o estágio, escrito pelo fornecedor?** Se a página não declara GA, beta ou piloto, trate como anunciado sem data.
2. **Existe preço publicado?** Sem preço, não há como calcular retorno. Pergunte ao executivo de contas e registre a resposta por escrito.
3. **Qual a restrição de região, edição ou idioma?** Um GA só nos EUA, ou só em inglês, não é GA para uma operação brasileira.
4. **O resultado mostrado é reproduzível?** Caso de cliente de piloto, com equipe do fornecedor dentro do projeto, mostra o teto, não a média.
5. **O que acontece com o que já temos?** Todo item novo toca algo que já roda: automação, permissões, dados. Avalie o impacto antes do ganho.

## Como transformar isso em plano

Com os estágios claros, o plano deixa de ser "o que o Dreamforce prometeu" e vira três filas.

**Fila 1 — GA agora.** Instrumente o que já roda: observabilidade, rastreio e métricas por agente. Se a empresa ainda está no [piloto que não escala](/blog/piloto-agentforce-producao.html), é aqui que se ganha tempo.

**Fila 2 — próximo do GA.** Agentes de longo horizonte e itens com data prometida entram como piloto interno limitado, com critério de saída definido, e só depois de a fila 1 estar estável.

**Fila 3 — direção.** Koa, AIforce e o que não tem data viram tema de acompanhamento trimestral, sem orçamento. Se algum chegar ao GA com preço e região compatíveis, sobe de fila.

O erro simétrico também existe: ignorar tudo porque parte ainda é piloto. A plataforma mudou de lugar, e a decisão de arquitetura de hoje, como dado, permissões e integrações, é a que vai definir quanto do que chegar ao GA será aproveitável.

## Perguntas que sempre voltam

As dúvidas mais frequentes de quem precisa decidir o que do Dreamforce 2026 entra no planejamento.

## O que é GA no Salesforce e por que importa?

GA, de general availability, é o estágio em que um produto está disponível para todos os clientes elegíveis, com documentação, preço e suporte oficiais. Importa porque só esse estágio permite orçar e contratar com previsibilidade. Beta e piloto podem mudar de escopo, de preço e de comportamento antes do lançamento.

## Agentforce Coworker já está disponível?

Segundo o recap oficial do Dreamforce 2026, sim: o Agentforce Coworker foi apresentado como GA, ao contrário de Koa, AIforce e dos agentes de longo horizonte. Mesmo assim, confirme nas release notes e no contrato da sua edição, porque a disponibilidade pode variar por edição e por região.

## Vale esperar o GA antes de começar com Agentforce?

Não. Esperar o GA de tudo adia o trabalho que mais importa, que é preparar dados, permissões e observabilidade. O que já está em GA permite começar, e essa preparação é a mesma que os itens futuros vão exigir. A espera faz sentido apenas para decisões que dependem de um item específico em piloto.
