---
title: "WhatsApp no Salesforce: o fim da mensagem de serviço grátis"
slug: "whatsapp-salesforce-brasil"
pillar: "sf"
date: "2026-09-02"
readMinutes: 7
excerpt: "A partir de 1º de outubro de 2026, a Meta cobra por mensagem de serviço no WhatsApp — o fim da janela grátis que sustentava o Agentforce."
tldr: "Mensagem de serviço no WhatsApp é a resposta de texto livre — não template — que uma empresa manda dentro da janela de atendimento de 24 horas, enviada por atendente humano, bot de regra ou IA de terceiros como o Agentforce. Essa mensagem é gratuita desde novembro de 2024, mas isso muda a partir de 1º de outubro de 2026: a Meta passa a cobrar por unidade, no mesmo valor que já cobra hoje por template de utilidade e autenticação no país, sem desconto de volume. Pra quem já integrou Agentforce ao WhatsApp via Salesforce, a conta que hoje é zero na janela de atendimento vira linha de custo recorrente em menos de um mês depois da publicação deste texto. A pergunta que decide o orçamento deixa de ser só qual licença assinar — passa a incluir quantas mensagens de serviço a operação troca por dia."
keywords: ["WhatsApp mensagem de serviço", "WhatsApp Business Platform pricing", "Agentforce WhatsApp", "Service Cloud Digital Engagement", "Meta Business Agent", "WhatsApp Salesforce Brasil"]
---

**A partir** de 1º de outubro de 2026, toda resposta que uma empresa manda no WhatsApp dentro da janela de atendimento de 24 horas — texto livre, não template, escrito por atendente humano ou gerado por uma IA como o Agentforce — deixa de ser grátis. A Meta vai cobrar por mensagem de serviço, no mesmo valor que já cobra hoje por template de utilidade e autenticação em cada país, sem desconto por volume.

Isso muda a conta de qualquer empresa que já decidiu integrar WhatsApp ao Salesforce — e muda mais ainda pra quem colocou o Agentforce respondendo cliente dentro dessa janela. É justamente aí, na resposta de rotina dentro do atendimento aberto, que a operação hoje não paga nada além da licença do canal.

## O que é mensagem de serviço — e por que ela era grátis até agora

Mensagem de serviço é qualquer resposta que reúne três características ao mesmo tempo: é texto livre (não um template pré-aprovado), acontece dentro da janela de 24 horas aberta pelo cliente, e não foi gerada pelo agente de IA da própria Meta. Consulta de status de pedido, confirmação de agendamento, dúvida sobre erro de cobrança — a maior parte de uma conversa de atendimento no WhatsApp é, tecnicamente, mensagem de serviço.

Esse tipo de mensagem é gratuito desde novembro de 2024, quando a Meta eliminou a cobrança por conversa de serviço que existia antes. Foi essa gratuidade que tornou o WhatsApp barato de operar em escala: empresa brasileira que já usa o app como canal principal — 82% das micro e pequenas empresas do país, segundo levantamento de mercado, muitas vezes sem nenhum sistema por trás, só o aplicativo e a memória de quem atende — não paga nada pela troca de mensagem em si, só pela licença ou pela ferramenta que conecta o canal ao sistema. É o mesmo sintoma de dupla digitação que já mapeamos em operação pequena, onde [vendedor anota no WhatsApp e transcreve pro CRM depois porque o gestor exige](/blog/quando-nao-usar-salesforce.html) — só que aqui o custo que estava escondido não é o do processo, é o da própria mensageria que a Meta cobrava zero até agora.

Com 82% dos usuários de WhatsApp no Brasil já tendo falado com uma empresa pelo app e 88% relatando já ter sido atendidos por um robô nessa conversa, a escala de mensagem de serviço trocada todo dia no país não é pequena. É justamente essa escala que faz a mudança de outubro pesar no orçamento — não o preço unitário, que é baixo, mas o volume que passa a multiplicar por ele.

## O que muda em 1º de outubro de 2026

Quatro pontos resumem a mudança, direto da documentação da própria Meta sobre pricing de mensagem não-template:

1. **Mensagem de serviço deixa de ser grátis.** Passa a ser cobrada por unidade, no mesmo valor que a Meta já cobra hoje por template de utilidade e autenticação naquele país — sem o desconto por volume (tier) que os templates de utilidade e autenticação recebem.
2. **Template de utilidade perde a isenção dentro da janela.** Hoje, um template de utilidade enviado dentro de uma conversa de atendimento já aberta não é cobrado. Isso acaba junto com a mudança de outubro.
3. **Não é a mesma coisa que o Meta Business Agent.** A IA própria da Meta dentro do WhatsApp — produto distinto do Agentforce — já passa a ser cobrada por token (US$ 2 a cada 1 milhão de tokens, algo entre 4 e 5 centavos por resposta) desde 1º de agosto de 2026, num cronograma separado. Mensagem gerada pelo Agentforce ou por qualquer outra IA de terceiros entra na categoria de mensagem de serviço, cobrada por unidade a partir de outubro — não no esquema de token da Meta.
4. **O valor exato por país sai até 1º de setembro de 2026.** A própria documentação da Meta usa, como exemplo ilustrativo pro Brasil, uma cobrança perto de US$ 0,0068 por mensagem de serviço — uma ordem de grandeza bem abaixo do template de marketing (cerca de US$ 0,0625), mas ainda assim um valor que hoje é zero.

> A mensagem que hoje custa zero na janela de atendimento vira linha de orçamento em outubro — o preço unitário é baixo, o volume é que decide a conta.

Nenhum dos quatro pontos depende de decisão da empresa — é mudança de tabela da Meta, que vale pra qualquer negócio operando WhatsApp Business Platform, com ou sem Salesforce no meio.

## O que isso muda pra quem já roda Agentforce no WhatsApp via Salesforce

Hoje, o custo de uma conversa de suporte pelo WhatsApp dentro do Salesforce tem duas camadas: a licença do Service Cloud Digital Engagement — na casa de US$ 75 por usuário por mês — e o consumo do próprio Agentforce, cobrado em Flex Credits ou por conversa dependendo do modelo contratado. A partir de outubro, entra uma terceira camada: cada resposta que o Agentforce manda dentro da janela de atendimento — a mesma resposta de rotina que hoje é de graça pra Meta — passa a ter um custo por mensagem cobrado direto pela própria Meta.

Isso empilha em qualquer caso de uso que já depende de conversa longa no canal. É o mesmo padrão que já aparece [no Buyer Agent fechando pedido B2B recorrente pelo WhatsApp](/blog/agentforce-commerce-vender-sem-humano.html): cada confirmação de SKU, cada preço de contrato revisado, cada pergunta de esclarecimento vira uma mensagem de serviço separada — hoje grátis, a partir de outubro cobrada por unidade.

O risco não é o custo por mensagem isolado, que é baixo. É o mesmo risco de consumo variável que [já detalhamos na conta de pricing do próprio Agentforce](/blog/agentforce-pricing-seis-modelos.html): parece pequeno na proposta e vira imprevisível na operação quando ninguém mede, antes, quantas mensagens de serviço uma conversa típica realmente consome.

## Quatro perguntas antes de outubro de 2026

A mudança já tem data marcada — o que resta é decidir como a operação se prepara antes dela chegar:

1. **Quantas mensagens de serviço a operação troca por conversa hoje, somando atendente humano e Agentforce?** Sem esse número, não dá pra estimar o impacto da mudança — só reagir à fatura depois que ela chegar.
2. **Quantos desses turnos dá pra resolver com uma coleta única — WhatsApp Flow, formulário embutido — em vez de várias idas e vindas?** Cada troca de mensagem evitada é uma mensagem de serviço a menos cobrada por unidade.
3. **Quais atualizações estruturadas — confirmação de pedido, status, lembrete — fazem mais sentido virar template do que resposta solta?** O template de utilidade também passa a ser cobrado dentro da janela, mas ainda mantém desconto por volume que a mensagem de serviço não tem.
4. **Quem no time — Salesforce, atendimento, financeiro — vai ficar dono do teto de gasto mensal de mensageria depois de outubro?** Hoje esse teto não existe porque a conta é zero. A partir de outubro, alguém precisa ser responsável por ela.

Nenhuma das quatro respostas está na tabela de preço da Meta ou do Salesforce isoladamente — está no padrão de conversa que a própria operação já tem, medido antes da mudança entrar em vigor.

## A janela grátis virou exceção, não regra

Durante quase dois anos, mensagem de serviço no WhatsApp foi a peça gratuita de uma conta que já cobrava template, licença de canal e consumo de agente. Isso muda em outubro de 2026, e muda pra toda empresa que opera o canal — com Salesforce, com outro CRM, ou sem CRM nenhum.

Quem já mede hoje quantas mensagens de serviço uma conversa típica consome entra na mudança sabendo o tamanho real do impacto. Quem só descobre a mudança na fatura de outubro vai gastar o mês seguinte tentando reconstruir um número que dava pra ter medido em setembro.

## Perguntas que sempre voltam

Fechando, as dúvidas mais comuns sobre a cobrança de mensagem de serviço no WhatsApp.

## O que é mensagem de serviço no WhatsApp e quando ela deixa de ser grátis?

Mensagem de serviço é uma resposta de texto livre — não um template pré-aprovado — enviada dentro da janela de atendimento de 24 horas aberta pelo cliente, por atendente humano, bot de regra ou IA de terceiros como o Agentforce. É gratuita desde novembro de 2024, mas deixa de ser a partir de 1º de outubro de 2026, quando a Meta passa a cobrar por unidade, no mesmo valor que já cobra hoje por template de utilidade e autenticação em cada país, sem desconto por volume.

## Meta Business Agent e mensagem de serviço do Agentforce são cobrados da mesma forma?

Não. São produtos e cronogramas diferentes. O Meta Business Agent é a IA própria da Meta dentro do WhatsApp, cobrada por token — US$ 2 a cada 1 milhão de tokens, cerca de 4 a 5 centavos por resposta — desde 1º de agosto de 2026. Mensagem gerada pelo Agentforce ou por qualquer outra IA de terceiros entra na categoria de mensagem de serviço, cobrada por unidade a partir de 1º de outubro de 2026, no valor equivalente ao template de utilidade e autenticação do país.

## Quanto vai custar cada mensagem de serviço no Brasil?

A documentação da Meta usa como exemplo ilustrativo pro Brasil uma cobrança perto de US$ 0,0068 por mensagem de serviço — bem abaixo do template de marketing, que gira em torno de US$ 0,0625. O valor definitivo por categoria e volume só fecha com a tabela oficial que a Meta publica até 1º de setembro de 2026, então o número final pode variar em relação ao exemplo.
