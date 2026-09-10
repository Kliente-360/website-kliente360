---
title: "Agentforce custa quanto: seis modelos de pricing que não se misturam"
slug: "agentforce-pricing-seis-modelos"
pillar: "sf"
date: "2026-08-25"
readMinutes: 7
excerpt: "Agentforce tem seis modelos comerciais, de um tier grátis a $550/usuário — mas conversa a $2 e Flex Credits nunca coexistem na mesma org."
tldr: "Agentforce pricing em 2026 se divide em seis modelos comerciais distintos — Salesforce Foundations gratuito, conversas a $2 cada, Flex Credits por ação consumida, licença de usuário, add-on de uso ilimitado e a edição bundled Agentforce 1 — e dois deles, conversas e Flex Credits, são mutuamente exclusivos dentro da mesma org. A escolha errada entre esses dois não é cosmética: o ponto de equilíbrio fica em torno de 20 ações por conversa, e organizações que erram o lado pagam substancialmente mais pelo mesmo volume de uso. As outras quatro camadas resolvem cenários diferentes — do piloto gratuito ao funcionário com uso ilimitado — e escolher a errada custa tanto quanto escolher entre conversa e crédito."
keywords: ["Agentforce pricing", "Flex Credits", "Agentforce conversas", "Agentforce User License", "Agentforce 1", "Salesforce Foundations"]
---

**Pricing** é a pergunta que todo decisor faz antes de aprovar um piloto de Agentforce — e é também a que a documentação oficial responde de forma mais fragmentada. Não existe "o preço do Agentforce". Existem seis modelos comerciais coexistindo no catálogo da Salesforce, cada um desenhado pra um padrão de uso diferente, e escolher o modelo errado custa tão caro quanto escolher a ferramenta errada.

O problema não é falta de opção — é o oposto. Com seis caminhos e uma regra de exclusão mútua escondida no meio deles, a pergunta que decide o orçamento não é "quanto custa Agentforce", é "qual desses seis modelos combina com o padrão de uso que a empresa já tem".

## Seis modelos, uma decisão por org

Nenhum dos seis é hipotético — todos aparecem ativos no catálogo comercial de 2026. A diferença entre eles é o que cada um mede como unidade de consumo:

1. **Salesforce Foundations (grátis).** Add-on de custo zero pra quem já paga Enterprise Edition de Sales Cloud ou Service Cloud. Inclui um pool inicial de Flex Credits, créditos de Data 360 e acesso a Agent Builder e Prompt Builder — o piloto sem custo de licença adicional.
2. **Conversas a $2 cada.** Modelo pensado pra agente voltado ao cliente externo. Uma conversa é a janela de interação entre usuário e agente — da primeira mensagem até a resolução, a escalada pra humano ou 24 horas de inatividade — cobrada como unidade fechada, não importa quantas mensagens ou ações aconteceram dentro dela. Quando o canal é o WhatsApp, esse custo se soma, a partir de outubro de 2026, [à cobrança por mensagem de serviço que a própria Meta passa a aplicar](/blog/whatsapp-salesforce-brasil.html) — duas camadas de custo variável empilhadas na mesma conversa.
3. **Flex Credits por ação.** Modelo de consumo: US$ 500 rendem 100 mil créditos, e cada ação padrão que o agente executa consome 20 créditos (cerca de US$ 0,10). Ação de voz consome 30 créditos (cerca de US$ 0,15).
4. **Agentforce User License.** Licença por usuário interno, na casa de US$ 5 por mês, que ainda depende de Flex Credits pra cobrir o consumo real de ação.
5. **Agentforce como add-on de uso ilimitado.** Entre US$ 125 e US$ 150 por usuário por mês, sem medidor de ação — pensado pra funcionário com uso intenso e prevísivel, onde consumo variável sairia mais caro que uma licença fixa.
6. **Agentforce 1.** Edição bundled que embute o add-on de Agentforce junto com Flex Credits e créditos de Data 360 numa SKU só, pra empresa consolidando investimento de IA e CRM num contrato único em vez de comprar cada peça separada.

> Seis modelos não é generosidade de menu — é a Salesforce reconhecendo que agente de cliente e agente de funcionário consomem de formas incompatíveis entre si.

O primeiro filtro pra qualquer decisão de orçamento é simples: os modelos 2 e 3 não coexistem na mesma org. O resto — Foundations, licença, add-on, Agentforce 1 — resolve camadas diferentes de adoção interna. É o par conversa-versus-crédito que concentra o risco real de errar a conta.

## $2 por conversa ou Flex Credits — a exclusão mútua que decide o resto

Conversas e Flex Credits medem a mesma coisa — uso de agente — de formas incompatíveis, e a Salesforce não permite rodar os dois modelos na mesma org ao mesmo tempo. A escolha é estrutural, não tática: muda como toda a operação de agente é orçada daqui pra frente.

A matemática por trás da escolha é direta. Uma ação padrão em Flex Credits custa cerca de US$ 0,10. Uma conversa completa, não importa quantas ações aconteçam dentro dela, custa US$ 2 fixos. O ponto de equilíbrio cai perto de 20 ações por conversa — abaixo disso, Flex Credits sai mais barato; acima, a conversa a preço fechado vence.

1. **Agente de suporte simples, poucas idas e vindas.** Uma dúvida de rastreamento de pedido resolvida em 3–5 ações consome bem menos que US$ 2 em Flex Credits. Aqui, crédito por ação é a escolha racional.
2. **Agente de atendimento complexo, múltiplas ferramentas por sessão.** Um caso que exige consultar histórico, cruzar sistemas e escalar contexto facilmente passa de 20 ações. Aqui, a conversa a US$ 2 fixos protege contra a fatura de crédito acumulado.
3. **Volume alto e previsível de conversas simples.** Quando o padrão de uso é estável e as ações por conversa ficam consistentemente baixas, Flex Credits dá controle fino — mas exige monitoramento constante de consumo, algo que a conversa fixa dispensa.

> Escolher entre conversa e crédito não é escolher o mais barato — é escolher o modelo que combina com a variância real do caso de uso, não com o cenário mais otimista dele.

Esse é o mesmo padrão de risco que [já apareceu na reforma de pricing do Data Cloud](/blog/data-cloud-pricing-creditos-2026.html): um modelo de consumo variável parece mais barato na proposta e vira imprevisível na operação quando a empresa não mapeia antes o próprio volume real.

## As três camadas voltadas pro funcionário, não pro cliente

Conversas e Flex Credits resolvem o agente voltado pra fora — cliente, prospect, usuário externo. Mas Agentforce também vende pro uso interno, e aí entram as outras três camadas do modelo:

**Agentforce User License** cobre o funcionário que usa agente ocasionalmente, com o consumo real de ação ainda debitado do pool de Flex Credits da org. É a entrada mais barata pra dar acesso a um número grande de usuários sem comprometer orçamento alto por cabeça.

**O add-on de uso ilimitado** troca o medidor por um preço fixo por usuário — entre US$ 125 e US$ 150 por mês. Faz sentido quando o funcionário usa o agente com intensidade previsível: um vendedor que consulta o agente em toda oportunidade, um analista de suporte que resolve caso atrás de caso. Pagar por ação nesse perfil de uso normalmente sai mais caro que a licença fixa.

**Agentforce 1** é a aposta de quem já decidiu consolidar. Ao embutir o add-on, Flex Credits e créditos de Data 360 numa SKU única, elimina a gestão de três contratos separados — ao custo de comprometer orçamento maior de saída, [a mesma régua de ROI que decide qualquer investimento maior em Salesforce](/blog/salesforce-roi-matriz.html).

## Três perguntas pra escolher sem queimar orçamento

Antes de assinar qualquer um dos seis modelos, três perguntas decidem a maior parte do risco de orçamento:

1. **O agente fala com cliente externo ou com funcionário interno?** Essa resposta já elimina metade das opções — conversa e Flex Credits competem pelo caso externo; licença, add-on e Agentforce 1 competem pelo caso interno.
2. **A média de ações por conversa fica acima ou abaixo de 20?** Se a empresa ainda não sabe, o piloto dentro do [Foundations gratuito](/blog/salesforce-foundations-o-que-cobre-de-verdade.html) é o lugar certo pra medir antes de comprometer um dos dois modelos exclusivos.
3. **O uso por funcionário é ocasional ou intenso e previsível?** Uso ocasional favorece licença com Flex Credits; uso intenso favorece o add-on de preço fixo — inverter a escolha paga o pior dos dois mundos.

Nenhuma das três perguntas troca dado real por estimativa de vendedor. A resposta certa está no padrão de uso da própria operação, não na tabela de preço isolada.

## Seis modelos resolvem seis cenários — não um deles sozinho

A fragmentação de pricing do Agentforce não é acidente de comunicação — é reflexo de que agente de IA em produção não tem um único padrão de consumo. Cliente externo consome diferente de funcionário interno; caso simples consome diferente de caso complexo; piloto consome diferente de operação madura.

O erro mais caro não é escolher um modelo específico — é assinar o primeiro que o vendedor recomenda sem medir, antes, em qual dos seis cenários a operação realmente se encaixa. Quem mapeia o padrão de uso antes de comprar entra a conversa comercial sabendo qual das seis perguntas fazer primeiro.

## Perguntas que sempre voltam

Fechando, as dúvidas mais comuns sobre quanto Agentforce custa de verdade.

## Quanto custa o Agentforce por conversa?

O modelo de conversas cobra US$ 2 por conversa completa, independente de quantas ações ou mensagens aconteçam dentro dela. Uma conversa é definida como a janela de interação entre usuário e agente — da primeira mensagem até a resolução, a escalada para humano ou 24 horas de inatividade. É o modelo recomendado para agente voltado a cliente externo com casos que envolvem múltiplas ações por sessão.

## Posso usar Flex Credits e conversas ao mesmo tempo no Agentforce?

Não. Conversas e Flex Credits são mutuamente exclusivos dentro da mesma org — a Salesforce exige escolher um dos dois modelos, não permite alternar caso a caso. A decisão depende da média de ações por conversa: abaixo de aproximadamente 20 ações, Flex Credits (cerca de US$ 0,10 por ação padrão) tende a sair mais barato; acima disso, a conversa a US$ 2 fixos protege contra consumo acumulado.

## Existe uma forma gratuita de testar o Agentforce?

Existe, dentro do Salesforce Foundations — add-on de custo zero para clientes de Sales Cloud ou Service Cloud em Enterprise Edition ou superior, que inclui um pool inicial de Flex Credits, créditos de Data 360 e acesso a Agent Builder e Prompt Builder. É o caminho certo para medir o padrão real de uso — ações por conversa, volume de funcionário — antes de comprometer um dos modelos pagos.
