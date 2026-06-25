---
title: "Customer 360 vs CDP: diferenças que mudam o roadmap de dados"
slug: "customer-360-vs-cdp"
pillar: "sf"
date: "2026-02-04"
readMinutes: 6
excerpt: "Empresa compra um, descobre que precisa do outro. Quando Customer 360 substitui CDP, quando complementa, e quando os dois viraram o mesmo lugar."
tldr: "Customer 360 e CDP nasceram de problemas diferentes — visão unificada de cliente versus ativação para marketing. Em 2026, Salesforce uniu os dois sob Data Cloud, e o mercado ficou confuso. O que é decisão de roadmap real, o que é detalhe de vendor, e como não comprar duas vezes a mesma coisa."
keywords: ["Customer 360", "CDP", "Data Cloud", "Salesforce", "roadmap de dados"]
---

A pergunta que volta a cada quarter em empresa de médio porte: "a gente precisa de CDP, ou o Customer 360 do Salesforce já resolve?". A pergunta é justa, e a maioria das respostas que circulam é vendor-driven — vem da consultoria que vende um ou outro. A resposta honesta exige separar três coisas que viraram quase sinônimas no marketing dos últimos cinco anos: visão unificada de cliente, plataforma de dados de marketing, e camada operacional de contexto. São três problemas diferentes que costumam ser embrulhados no mesmo nome.

Esse texto desembrulha os três, mostra onde cada um vale, e onde a Salesforce mudou o jogo ao consolidá-los sob Data Cloud em 2026.

## O problema original do Customer 360

Customer 360, como conceito, nasceu de um problema simples: a mesma pessoa é cliente em dois sistemas (Sales Cloud e Service Cloud, por exemplo) e os dois sistemas não sabem disso. Vendedor abre a conta e vê histórico de venda. Atendente abre a conta e vê histórico de chamado. Nenhum dos dois vê o outro lado.

A solução é estrutural: identificar que é a mesma entidade, expor o histórico unificado, e disponibilizar isso onde cada operador trabalha. Customer 360 é a visão. Implementar isso pode envolver várias coisas — federação de identidade, replicação seletiva, query em runtime, indexação. Por anos, era um projeto de integração feito sob medida em cada empresa.

O ponto: Customer 360 é um *objetivo* (cliente único, em todos os sistemas), não um produto. Quando a Salesforce começou a usar "Customer 360" como nome de plataforma, gerou confusão — virou simultaneamente um conceito e um SKU.

## O problema original do CDP

CDP (Customer Data Platform) tem outro nascimento. Veio do marketing, lá pelos anos 2015–2018, pra resolver uma dor específica: ativar campanhas multi-canal com segmentação baseada em comportamento. Marketing tinha dado quente em ferramenta de e-mail, dado de navegação em web analytics, dado de venda em CRM, dado de impressão em DSP. Nenhuma dessas peças conversava na velocidade que campanha precisava.

CDP juntou esses dados, normalizou identidade, e expôs APIs de segmentação. Casos de uso clássicos: cesta abandonada, look-alike, retargeting baseado em estágio do funil, jornada cross-channel. CDPs como Segment, mParticle, Tealium ganharam mercado nessa fronteira.

O ponto: CDP nasceu *operacional pra marketing*, não pra atendimento ou pra venda. O foco é ativação rápida com latência baixa, e o cliente final do dado é uma ferramenta de campanha — não um relatório.

## Onde os dois colidiram

Em 2020–2023, a fronteira começou a embaçar. CDPs viraram "Customer Data Platform" pra todas as áreas, não só marketing. Customer 360 ganhou ferramentas de ativação. Salesforce lançou Customer 360 Data Manager, depois CDP, depois renomeou pra Data Cloud, e em 2025 consolidou tudo sob a mesma marca. Adobe, Oracle, SAP fizeram movimentos similares. O mercado virou sopa.

Em 2026, a fronteira útil pra decisão não é mais "CDP vs Customer 360". É:

- **Camada de identidade e perfil unificado** (o problema que Customer 360 resolveu primeiro)
- **Camada de ativação operacional** (o problema que CDP resolveu primeiro)
- **Camada de contexto pra agentes e aplicações** (o problema que Data Cloud está resolvendo agora)

Empresa que toma decisão pensando em "CDP ou não CDP" está numa pergunta de 2020. A decisão de 2026 é qual dessas três camadas você precisa primeiro — e como elas se conectam.

> Em 2026, "Customer 360 vs CDP" virou uma pergunta de marketing de vendor. A pergunta de roadmap real é qual camada de dado de cliente sua operação precisa primeiro.

## A consolidação sob Data Cloud

Salesforce fez um movimento explícito: tratou Customer 360 e CDP como dois lados do mesmo problema e os juntou sob Data Cloud. [Não é mais CDP — é o nervo central do Salesforce](/blog/data-cloud-nervo-central.html). Para empresa já investida em Salesforce, isso muda o cálculo. Antes, a escolha era 'compro [CDP da Segment](/blog/customer-data-platform-commodity.html) ou monto Customer 360 com integração?'. Hoje, se você já paga Sales, Service e Marketing Cloud, Data Cloud entrega as três camadas como parte da plataforma — sem integração custom.

A consequência prática: empresas que estavam pra comprar CDP externo em 2024–2025 e que já são clientes Salesforce têm que reavaliar. O cálculo não é "Data Cloud é melhor que Segment" (em features brutas, depende do caso). É: "considerando que vou pagar a integração com Sales/Service Cloud de qualquer jeito, qual é o TCO real?". Costuma virar a balança pra Data Cloud quando o ecossistema já é Salesforce.

Pra quem *não* é Salesforce-first — empresa que usa HubSpot, ou customizou em CRM próprio — a equação muda. Aí CDP externo continua fazendo sentido, ou Customer 360 vira projeto de integração mesmo.

## O que decidir antes de qualquer compra

A régua que funciona pra empresas avaliando essas decisões:

1. **Qual é o caso de uso primário?** Ativação de marketing? Visão unificada pra atendimento? Contexto pra agente de IA? Cada um tem peso diferente em cada plataforma — e nenhum tem nota máxima em todas.
2. **Qual stack já existe?** Empresa Salesforce-first ganha com Data Cloud por integração. Empresa multi-stack ganha com CDP independente. Empresa em transição precisa calcular o TCO honestamente — não o folheto.
3. **Qual o roadmap de IA?** Se a próxima fronteira é Agentforce ou agente próprio, [a camada de contexto vira crítica](/blog/quando-agente-e-resposta.html) — e Data Cloud é desenhado pra isso. CDPs tradicionais não foram, e estão correndo atrás.
4. **Quem é dono do projeto?** CDP nasceu marketing-led; tende a ser comprado e operado pelo CMO. Customer 360 é cross-functional; precisa de sponsor que tenha autoridade em vendas, atendimento e marketing simultaneamente. Sponsor errado é o motivo #1 de projetos travados.
5. **Qual o nível de unificação de identidade necessário?** Marketing tolera matching probabilístico ("provavelmente é a mesma pessoa"). Atendimento e venda exigem matching determinístico ("essa pessoa é o cliente X"). Se você precisa do segundo, [identidade vira projeto separado, independente de plataforma](/blog/mapear-processos-antes-do-salesforce.html).

Quem responde os cinco com clareza tem decisão. Quem responde "depende" em três ou mais ainda não tem caso de uso definido — e qualquer plataforma vai virar projeto eterno.

## O movimento honesto pra 2026

Se você está parado nessa decisão hoje, três movimentos práticos antes de qualquer assinatura de contrato:

**Mapear caso de uso por caso de uso.** Não "queremos CDP". Mas "queremos rodar segmentação de cesta abandonada com latência de 1h", "queremos visão unificada no Service Cloud com histórico de marketing visível", "queremos agente que sabe contexto do cliente sem ETL noturno". Cada um desses tem peso diferente em cada plataforma.

**Pilotar com volume real, não com demo.** Demo de CDP e demo de Data Cloud são igualmente impressionantes. Pilotar com 1–2 casos de uso reais, 30–60 dias, mede o que o folheto não mede — performance no seu volume, complexidade de operação, custo real.

**Decidir com cabeça de TCO de 3 anos.** Custo de licença + custo de integração + custo de operação + custo de migração. Esse cálculo costuma mudar a decisão em 30–40% das empresas que fazem antes da compra.

A camada de cliente unificado é uma das peças mais importantes de stack moderno. Mas é peça — não estratégia. Comprar plataforma sem o resto do roadmap claro é o jeito mais caro de empurrar a decisão pra frente sem resolvê-la.
