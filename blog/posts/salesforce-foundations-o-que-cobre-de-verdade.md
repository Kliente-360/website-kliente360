---
title: "Salesforce Foundations: o que o pacote gratuito cobre (e onde ele para)"
slug: "salesforce-foundations-o-que-cobre-de-verdade"
pillar: "sf"
date: "2026-08-12"
readMinutes: 7
excerpt: "Foundations libera Agentforce, Data 360 e Commerce de graça no Enterprise Edition — mas o Commerce nem chega ao Brasil, e o crédito de IA some rápido."
tldr: "Salesforce Foundations é um add-on de custo zero (SKU $0) que a Salesforce libera para clientes de Sales Cloud e/ou Service Cloud em Enterprise Edition ou superior, incluindo funcionalidades básicas de vendas, atendimento, marketing, Commerce, Data 360 e Agentforce sem licença adicional. O pacote foi ao ar em setembro de 2024 e ganhou Agentforce meses depois, mas os limites reais — 2 mil e-mails por mês, um pool de créditos de IA que varia de fonte para fonte, e uma loja de comércio direto que nem está disponível para empresas brasileiras — decidem rápido onde o gratuito para de resolver. A pergunta que importa não é se Foundations é grátis, é até que ponto do caso de uso ele sustenta antes de virar upsell."
keywords: ["Salesforce Foundations", "Agentforce gratuito", "Flex Credits", "Enterprise Edition", "Data 360 créditos", "add-on Salesforce $0"]
---

**Todo add-on gratuito** de plataforma enterprise carrega a mesma pergunta implícita: gratuito até onde? Salesforce Foundations é a versão mais recente desse teste. Lançado em setembro de 2024 como um SKU de custo zero para quem já paga Enterprise Edition de Sales Cloud ou Service Cloud, o pacote ganhou peso real ao longo de 2025 quando passou a incluir Agentforce — e virou, pra muita empresa que já tinha o contrato base, a porta de entrada mais barata pra testar agente de IA em produção sem assinar licença nova.

O problema é que "gratuito" e "suficiente" raramente coincidem em plataforma enterprise, e Foundations não é exceção. O pacote resolve proof of concept e caso de uso pequeno com folga. Decidir se ele resolve a operação real da empresa exige olhar pros quatro limites que a página de marketing não destaca com o mesmo tamanho de fonte do "$0".

## O que entra de graça — e por que não é pouco

Foundations não é trial disfarçado. É um conjunto de capacidades reais, liberadas permanentemente, sem contrato adicional, pra quem já está na edição certa:

1. **Sales.** Sales Console completo, gestão de lead e oportunidade, ferramentas de cotação e links de pagamento seguro (Pay Now) direto do orçamento ou da oportunidade.
2. **Service.** Console de atendimento, gestão de caso, macros de automação de tarefa repetitiva e suporte multicanal.
3. **Marketing.** Editor de e-mail drag-and-drop, analytics de campanha embutido e até 2.000 disparos de e-mail por mês.
4. **Commerce.** Uma loja digital direct-to-consumer, checkout gerenciado, ferramentas de merchandising e os mesmos links de pagamento seguro do módulo Sales.
5. **Data 360.** Perfil unificado de cliente entre sistemas, segmentação de até cinco fluxos de dado e 10.000 créditos anuais de segmentação e ativação.
6. **Agentforce.** Agent Builder, Prompt Builder, pelo menos uma skill de agente configurada e um pool de créditos (Flex Credits) compartilhado com Data 360 pra testar caso de uso real, não só demo.

> Foundations não é isca de venda — é capacidade de produção real, só que com o medidor de uso ligado desde o primeiro dia.

Isso já é mais do que a maioria dos concorrentes oferece de graça em CRM enterprise. Mas "capacidade real" não é sinônimo de "capacidade suficiente" — e é aí que os quatro limites entram.

## Onde o gratuito para: os quatro limites que decidem se basta

Nenhum dos limites abaixo é escondido — todos aparecem em letra pequena na documentação oficial. O que muda é o quanto cada um pesa dependendo do porte e do caso de uso da empresa.

1. **Edição mínima exige Enterprise.** Foundations só existe pra quem já paga Enterprise Edition ou superior de Sales Cloud e/ou Service Cloud. Cliente em Starter Suite ou Professional Edition — o segmento que mais precisaria de um empurrão gratuito — não tem acesso. Clientes de Government Cloud e de Industry Clouds também ficam de fora, independente da edição.
2. **Marketing trava em 2.000 e-mails por mês.** Suficiente pra newsletter de base pequena, insuficiente pra qualquer operação de e-mail marketing com cadência de nutrição real. Passar do limite significa upgrade pago, não overage discreto.
3. **Crédito de IA e de dado compartilha o mesmo pool.** Agentforce e Data 360 disputam o mesmo saldo de Flex Credits. Quem usa segmentação pesada em Data 360 sobra menos crédito pra rodar agente — e vice-versa. Isso reproduz, numa escala menor, [o mesmo multiplicador de operação que já vimos decidir o orçamento de Data Cloud pago](/blog/data-cloud-pricing-creditos-2026.html): o custo real não está no preço de entrada, está em qual função consome o crédito mais rápido.
4. **Commerce não chega a todo país — Brasil incluso.** A loja direct-to-consumer do módulo Commerce está disponível oficialmente só para os Estados Unidos, segundo levantamento da Salesforce Ben. Empresa brasileira que via no Commerce gratuito um motivo pra ativar Foundations descobre, na hora de configurar, que esse módulo específico não existe pra ela.

O quarto ponto é o que mais surpreende gestor brasileiro. Não é limite de uso — é ausência de disponibilidade regional, e só aparece depois que a empresa já decidiu, no papel, que Foundations valia a pena pelo pacote completo.

## Por que o número de crédito muda a cada fonte que você consulta

Vale registrar um sintoma, não só um limite: pesquisar "quantos Flex Credits o Foundations inclui" devolve respostas diferentes dependendo da data da fonte — 100 mil, 200 mil, 450 mil. Não é erro de digitação generalizado. É a Salesforce revisando a régua de crédito de Agentforce em múltiplas rodadas desde o lançamento, a mesma dinâmica que [já reformulou o pricing de Data Cloud em créditos únicos e SKU por perfil em março de 2026](/blog/data-cloud-pricing-creditos-2026.html) e que acompanhou [o rebranding que trocou Sales Cloud por Agentforce Sales](/blog/sales-cloud-vira-agentforce-sales.html) no mesmo ciclo.

Pra quem decide orçamento, a lição prática é simples: não trave o caso de negócio num número de crédito lido num blog de terceiro publicado há seis meses. Confirme o saldo vigente na própria org antes de projetar quanto o piloto vai durar até precisar de compra adicional.

## Três perguntas pra decidir se Foundations resolve ou só atrasa a decisão real

Foundations é uma ferramenta de teste barato, não de operação definitiva. Três perguntas, na ordem que vale a pena checar antes de tratá-lo como estratégia de longo prazo:

1. **O caso de uso cabe dentro dos limites, ou já nasce maior que eles?** Se o volume real de e-mail, segmentação ou conversa de agente passa do teto no primeiro mês, Foundations não é a base certa — é só o piloto que confirma que o investimento pago é necessário.
2. **A empresa já está em Enterprise Edition, ou precisaria subir de edição só pra qualificar?** Subir de edição pra acessar um add-on gratuito é decisão de custo real, não de custo zero — [a mesma régua de ROI que decide qualquer investimento em Salesforce](/blog/salesforce-roi-matriz.html) se aplica aqui igual.
3. **O módulo que interessa está disponível na região da empresa?** Antes de desenhar o piloto em torno do Commerce, confirme disponibilidade regional. Descobrir a restrição depois de comprometer o roadmap do trimestre custa mais caro do que a licença que a empresa estava tentando evitar pagar.

Nenhuma das três perguntas invalida Foundations — só evita o erro de tratá-lo como substituto permanente de um investimento que a operação real vai exigir de qualquer jeito.

## O gratuito prova o caso de uso — não substitui a decisão de investimento

Foundations cumpre bem o papel que a Salesforce desenhou pra ele: dar a cliente que já paga Enterprise Edition uma forma de testar Agentforce, Data 360 e automação de e-mail sem assinar contrato novo. Isso tem valor real, principalmente pra empresa que ainda está decidindo se agente de IA resolve um problema concreto ou é só tendência de mercado.

O erro é ler "gratuito" como "resolvido". Os quatro limites — edição mínima, teto de e-mail, pool de crédito compartilhado e disponibilidade regional — não são letra pequena acidental. São o desenho deliberado de um produto de aquisição: mostrar valor rápido, o suficiente pra justificar a conversa comercial sobre o que vem depois. Empresa que trata Foundations como fase 1 de um plano, não como destino final, tira o valor certo dele.

## Perguntas que sempre voltam

Fechando, as dúvidas mais comuns sobre o que Salesforce Foundations cobre de verdade.

## O que é Salesforce Foundations?

Salesforce Foundations é um add-on gratuito (SKU de custo $0) que a Salesforce libera para clientes de Sales Cloud e/ou Service Cloud em Enterprise Edition ou superior, sem cobrança de licença adicional. Ele inclui funcionalidades básicas de vendas, atendimento, marketing (e-mail), Commerce, unificação de dado via Data 360 e um pool inicial de créditos de Agentforce para testar agente de IA em produção. Lançado em setembro de 2024, ganhou Agentforce como módulo meses depois do anúncio original.

## Quem pode usar Salesforce Foundations de graça?

Só clientes que já pagam Enterprise Edition ou superior de Sales Cloud e/ou Service Cloud. Clientes em Starter Suite, Essentials ou Professional Edition não qualificam, mesmo pagando por Salesforce — Agentforce, em particular, exige Enterprise Edition como piso técnico, o que deixa empresa pequena de fora tanto da versão paga quanto da gratuita. Clientes de Government Cloud e de Industry Clouds também estão fora da elegibilidade, independente da edição.

## Salesforce Foundations serve para empresa brasileira?

Serve, com uma ressalva concreta: o módulo Commerce — loja digital direct-to-consumer com checkout e pagamento integrado — está disponível oficialmente só para os Estados Unidos, o que exclui empresa brasileira desse módulo específico. Os demais módulos (Sales, Service, Marketing, Data 360 e Agentforce) não têm essa restrição regional e funcionam normalmente para quem já está na edição elegível no Brasil.
