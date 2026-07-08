---
title: "Integração Salesforce ↔ ERP: por que projetos travam no contrato, não na arquitetura"
slug: "integracao-salesforce-erp"
pillar: "sf"
date: "2026-03-17"
readMinutes: 6
excerpt: "Quase toda integração Salesforce-ERP que atrasa atrasou no acordo de quem responde pelo dado — não no técnico. O fracasso é organizacional, vestido de arquitetura."
tldr: "Integração Salesforce ↔ ERP raramente trava na engenharia. Trava na zona cinza de ownership: quem é dono do cliente, do pedido, do estoque, da regra de cálculo. Sem isso definido antes, qualquer arquitetura (MuleSoft, middleware, native) entrega o mesmo atraso. Cinco perguntas que destravam."
keywords: ["Salesforce", "ERP", "integração", "MuleSoft", "middleware"]
---

A reunião de status de toda integração Salesforce-ERP atrasada tem o mesmo formato: time técnico apresenta arquitetura, diretoria pergunta "por que está atrasado", time mostra mapa de campos e parece complexo. A explicação implícita é "é difícil tecnicamente". Em 90% dos casos, é mentira gentil. O atraso real vem de outro lugar — e até esse lugar ser nomeado, a integração não vai entregar, qualquer que seja a ferramenta escolhida.

Esse texto é sobre por que projetos de integração Salesforce-ERP travam, e a régua honesta pra destravar — que tem mais a ver com governança organizacional que com arquitetura técnica.

## O verdadeiro motivo do atraso

Em quase toda integração Salesforce-ERP que vejo arrastando, o problema está em um conjunto pequeno e específico de zonas cinzas:

- **Quem é dono do cadastro de cliente?** Salesforce diz que cliente nasce na venda; ERP diz que nasce no faturamento. Quem manda em endereço, e-mail, status fiscal? Sem resposta, sincronização vira disputa.
- **Quem decide preço final?** Sales Cloud tem pricebook; ERP tem cadastro de preço; CPQ tem regra própria. Quando os três discordam, qual ganha?
- **Quem é dono do pedido?** Sales fecha oportunidade; ERP emite nota fiscal. O pedido fica no Salesforce até quando? E depois?
- **Como tratar dado conflitante?** Cliente Joao Silva no Salesforce, JOAO SILVA no ERP, João Silva em outro lugar. Quem é a verdade?
- **Quem responde quando integração quebra?** Time de Salesforce ou time de ERP ou time de integração? Sem dono nominal, vira ping-pong.

Essas cinco perguntas, em quase todo projeto, ficam num "depois a gente alinha" — e o "depois" vira a fronteira que atrasa todo o resto. Engenheiro pode construir API perfeita, middleware pode rodar sem erro, mapeamento pode estar 100% correto. Se essas perguntas não foram respondidas antes, o projeto trava em decisão pendente — não em código.

> A arquitetura técnica de integração Salesforce-ERP é o quinto problema. Os quatro primeiros são quem decide o quê — e isso não se resolve no Sprint Planning.

## Por que isso vira armadilha repetida

Tem três razões pelas quais o problema persiste em quase todo cliente.

**Time técnico não tem mandato organizacional.** Engenheiro de Salesforce e engenheiro de ERP raramente têm autoridade pra decidir governança de dado entre áreas. Eles tentam, falham, viram mediadores. Sem sponsor com autoridade cross-funcional, a decisão não acontece.

**A pergunta "quem é dono" é política.** Cadastro de cliente é poder. Área de venda quer ser dona; área financeira quer ser dona; CX quer ser dono. A discussão técnica esconde a discussão política. Time vai fingir que é "definição de master" enquanto na verdade é negociação de poder.

**Discovery insuficiente vira fato consumado.** [Como em qualquer rollout Salesforce sério](/blog/mapear-processos-antes-do-salesforce.html), pular o discovery é a fonte número um de problema. Em integração, isso se manifesta como "começamos a construir e descobrimos as decisões pendentes na hora de testar".

## As cinco perguntas que precisam ser respondidas antes

A régua que aplicamos em todo kickoff de integração Salesforce-ERP, e que destrava 80% dos casos.

1. **Quem é o sistema de registro pra cliente?** Não "ambos" — um. O outro vira reflexo. Decisão executiva, com autoridade pra valer pra todas as áreas.
2. **Quem é o sistema de registro pra pedido?** Mesma régua. Sales no Salesforce até X; depois ERP. X precisa ser definido com critério claro (status, aprovação, evento).
3. **Quem decide preço final, e qual a regra de override?** Pricebook do Salesforce, tabela do ERP, [CPQ entregando proposta real e não só cotação](/blog/cpq-saas-b2b.html), exceção manual. Hierarquia explícita, sem ambiguidade.
4. **Qual a frequência aceitável de sincronização por entidade?** Cliente em tempo real? Pedido a cada 15 min? Estoque a cada hora? Critério: o que o caso de uso de negócio exige, não o que a ferramenta consegue.
5. **Quem é o dono operacional da integração em produção?** Quando quebra, quem investiga primeiro? Nome no fluxo, não "o time de integração". Sem isso, MTTR explode no primeiro incidente.

Quem responde os cinco antes de a sprint começar entrega em prazo. Quem responde durante a construção atrasa 2–4 meses. Quem responde depois do go-live entra no projeto vivo eterno.

## Sobre arquitetura — só depois das cinco perguntas

Depois das cinco respondidas, a discussão de arquitetura técnica fica trivial. Três padrões cobrem 90% dos casos:

**Integração native (MuleSoft Anypoint, Salesforce Connect, Data Cloud).** Vale quando empresa já está investida no ecossistema Salesforce. Custo mais alto de licença, menor de implementação. [Data Cloud em 2026 absorve parte do que MuleSoft fazia](/blog/data-cloud-nervo-central.html), simplificando arquitetura.

**Middleware genérico (Boomi, Workato, Tray).** Vale quando integração precisa servir múltiplos sistemas além do par Salesforce-ERP. Stack agnóstica, custo recorrente, manutenção compartilhada.

**Integração custom (Lambda, API Gateway, mensageria).** Vale quando volume é altíssimo, latência crítica, ou exige lógica que ferramenta padrão não cobre. Custo de implementação alto, manutenção contínua, mas controle total.

A escolha entre os três depende mais do contexto operacional (skills do time, ecossistema existente, volume) que de feature comparison. Esse debate técnico só faz sentido depois das cinco perguntas resolvidas.

## O sinal de que a integração vai falhar

Antes de começar a construir, três sinais quase garantem o atraso:

**Sinal 1: sponsor não tem autoridade cross-funcional.** Diretor de vendas patrocinando integração que afeta financeiro = vai travar. Diretor de TI patrocinando = vai virar projeto técnico sem decisão de negócio. Ideal: sponsor com peso em vendas + ops + finanças.

**Sinal 2: discovery cabe em duas semanas.** Discovery sério de integração Salesforce-ERP de empresa de médio porte exige 4–6 semanas. Quem orça duas vai entregar superficial e descobrir o resto custando 10× mais durante a implementação.

**Sinal 3: ninguém escreveu as cinco perguntas acima.** Se na sprint planning o time não tem resposta documentada pra essas cinco, qualquer estimativa é palpite. Vai atrasar — só não dá pra dizer quantas semanas.

## A decisão pra 2026

Se sua empresa está pra começar integração Salesforce-ERP, três movimentos antes da arquitetura:

**Sponsor com autoridade real.** Diretor com peso pra atravessar áreas. Sem isso, pare e resolva o sponsor antes do projeto.

**Discovery dedicado de 4–6 semanas focado nas cinco perguntas.** Não na arquitetura. Não no mapa de campos. Nas decisões de governança que vão atravessar todas as escolhas técnicas.

**Decisão arquitetural só depois.** Native, middleware, custom — escolher com base no contexto, não na moda. Volume, skills, ecossistema, tolerância a latência. Cada um pesa diferente em empresa diferente.

Integração Salesforce-ERP bem implantada é uma das peças mais valiosas de arquitetura empresarial moderna — destrava previsibilidade comercial, contábil e operacional. Mal implantada, é a integração que vira projeto vivo por dois anos. A diferença raramente está no MuleSoft escolhido. Está em quem foi dono do quê desde o dia 1.

## Perguntas que sempre voltam

Pra fechar, as três dúvidas que mais aparecem quando esse tema entra na pauta.

## MuleSoft, middleware ou integração custom: qual escolher pra conectar Salesforce ao ERP?

Depende do contexto operacional, não de feature comparison — e três padrões cobrem 90% dos casos. Native (MuleSoft Anypoint, Salesforce Connect, Data Cloud) vale quando a empresa já está investida no ecossistema Salesforce: licença mais cara, implementação mais barata. Middleware genérico (Boomi, Workato, Tray) vale quando a integração precisa servir vários sistemas além do par Salesforce-ERP. Custom (Lambda, API Gateway, mensageria) vale pra volume altíssimo, latência crítica ou lógica que ferramenta padrão não cobre — controle total, manutenção contínua.

O que pesa na escolha são skills do time, ecossistema existente e volume. E o debate só faz sentido depois de resolver as cinco perguntas de governança — antes disso, qualquer arquitetura entrega o mesmo atraso.

## Quanto tempo leva o discovery de uma integração Salesforce-ERP?

Pra empresa de médio porte, um discovery sério exige 4–6 semanas — dedicado às cinco perguntas de governança (quem é dono de cliente, de pedido, de preço, frequência de sync, dono operacional), não à arquitetura nem ao mapa de campos. Quem orça duas semanas entrega superficial e descobre o resto durante a implementação, custando 10× mais.

A conta do lado de lá também é conhecida: time que responde as cinco perguntas antes da sprint entrega no prazo; quem responde durante a construção atrasa 2–4 meses; quem responde depois do go-live entra no projeto vivo eterno.

## Como saber antes de começar se a integração vai atrasar?

Três sinais quase garantem o atraso. Primeiro: sponsor sem autoridade cross-funcional — diretor de vendas patrocinando algo que afeta o financeiro trava, diretor de TI vira projeto técnico sem decisão de negócio. Segundo: discovery orçado em duas semanas. Terceiro: ninguém escreveu as cinco perguntas de governança — se na sprint planning não há resposta documentada, qualquer estimativa é palpite.

Se qualquer um dos três aparecer, o movimento certo é parar e resolver antes da arquitetura. O ideal é sponsor com peso em vendas + ops + finanças, e as decisões de ownership documentadas desde o dia 1.
