---
title: "AgentExchange e MCP no Salesforce: o marketplace virou camada de arquitetura"
slug: "agentexchange-mcp-salesforce"
pillar: "sf"
date: "2026-09-23"
readMinutes: 7
excerpt: "AgentExchange fundiu AppExchange, Slack Marketplace e a vitrine de agentes num só catálogo — 10 mil apps e 1.000+ agentes e servidores MCP juntos."
tldr: "AgentExchange é o marketplace único que a Salesforce lançou na TDX 2026 fundindo AppExchange, Slack Marketplace e a antiga vitrine de agentes, reunindo mais de 10 mil apps, 2.600+ apps de Slack e 1.000+ agentes, ferramentas e servidores MCP sob uma única camada de descoberta e compra. A mudança desloca parte da decisão de comprar pronto ou construir do zero pra dentro do catálogo — só que a velocidade de montar solução com peça pronta do marketplace já ultrapassa a velocidade que a maioria das empresas consegue aprovar consumo novo. Servidor MCP listado no AgentExchange vira peça de arquitetura permanente, não integração pontual, e herda os mesmos vetores de lock-in de qualquer outra dependência de ecossistema."
keywords: ["AgentExchange", "MCP no Salesforce", "AppExchange", "marketplace de agentes", "servidores MCP", "governança de compras de IA"]
---

**Até** a TDX 2026, um cliente Salesforce navegava três lugares diferentes pra achar um app, um bot de Slack ou um agente pronto: AppExchange, Slack Marketplace e a vitrine original de agentes. Em abril, a Salesforce fundiu os três num catálogo só — AgentExchange — e o endereço antigo (appexchange.salesforce.com) hoje redireciona pra ele. O número que resume a escala da fusão: mais de 10 mil apps, 2.600+ apps de Slack e 1.000+ agentes, ferramentas e servidores MCP, tudo sob a mesma busca.

Juntar três vitrines numa parece, à primeira vista, decisão de UX. Não é. Quando servidor MCP vira item de catálogo ao lado de app pronto, a pergunta que todo decisor de tecnologia faz — "compro pronto ou construo?" — muda de forma, porque as duas opções passam a aparecer na mesma prateleira, com o mesmo clique de instalação.

## De três vitrines pra uma: o que a fusão muda de fato

A unificação não é só estética de marca. A Salesforce reorganizou a busca por intenção de negócio em vez de palavra-chave, e prometeu modo de busca conversacional pra outono de 2026 — o cliente pergunta o que precisa resolver, o marketplace responde com combinação de app, agente e servidor MCP, não com lista de produtos isolados. Junto veio o AgentExchange Builders Initiative, aporte de US$ 50 milhões pra parceiro ISV construir e escalar solução nativa de IA dentro do catálogo.

O efeito prático: o marketplace deixou de ser lugar de comprar extensão pra um sistema já decidido e passou a ser lugar onde a arquitetura de agente se monta, peça por peça, antes mesmo de existir um projeto formal. [Boa parte do que separa consultoria séria de revenda mascarada já passava pelo Partner Program e pelo AppExchange](/blog/salesforce-partner-program.html) — a fusão em AgentExchange aumenta a régua, porque agora não é só app que carrega selo de parceiro, é agente autônomo e servidor MCP também.

> O marketplace que antes vendia extensão pra decisão já tomada virou o lugar onde a decisão de arquitetura se toma primeiro.

## Servidor MCP na prateleira muda o cálculo de comprar pronto ou construir

Até pouco tempo, adotar Model Context Protocol significava, na prática, subir servidor próprio ou integrar um dos poucos catálogos abertos disponíveis. Com mais de 1.000 agentes, ferramentas e servidores MCP listados dentro do AgentExchange — com camada declarada de confiança da Salesforce por trás —, a decisão de construir servidor MCP do zero passa a competir, lado a lado, com a opção de instalar um já revisado pelo marketplace.

Isso não elimina a complexidade técnica do protocolo — só desloca onde ela aparece. [A arquitetura por dentro de um servidor MCP](/blog/arquitetura-servidor-mcp.html) — transporte, autenticação, superfície de risco de descoberta dinâmica de ferramenta — continua existindo mesmo quando o servidor vem pronto do marketplace. O que muda é que o cliente herda essa arquitetura de um terceiro, com a due diligence de segurança e a manutenção de longo prazo dependendo de quem publicou o item, não de quem construiu internamente.

A Salesforce descreve seis camadas de integração MCP dentro da plataforma — do Agentforce funcionando nativamente como cliente MCP até o MuleSoft convertendo API existente em servidor MCP exposto no catálogo. Isso significa que uma API interna, já construída, pode literalmente virar item de AgentExchange sem passar por reescrita — o que acelera distribuição, mas também acelera o número de conexões automatizadas que uma empresa precisa auditar antes que vire produção.

1. **Instalar servidor MCP pronto do AgentExchange** resolve velocidade — o servidor já existe, já foi listado, já tem alguma camada de revisão do marketplace por trás.
2. **Construir servidor MCP próprio** resolve controle — a empresa decide transporte, escopo de ferramenta exposta e quem audita a superfície de risco.
3. **Nenhuma das duas opções resolve o problema de governança sozinha** — instalar rápido sem auditar, ou construir sem seguir o mesmo rigor de segurança que o item de catálogo promete, chega no mesmo risco por caminhos diferentes.

## A velocidade de montar já passou a velocidade de aprovar

O ponto que a cobertura mais técnica da TDX 2026 deixou passar — e que análise independente do evento capturou bem — é organizacional, não de produto: AgentExchange expõe um descompasso entre a velocidade com que hoje se monta uma solução funcional, combinando app, agente e servidor MCP prontos, e a velocidade com que a maioria das empresas consegue aprovar formalmente o consumo que essa solução gera. Time técnico monta protótipo funcional num dia. Aprovação de compra, revisão de segurança e orçamento recorrente levam semanas — quando levam.

Esse descompasso não é exclusividade do AgentExchange. [Os mesmos quatro vetores de aprisionamento que valem pra qualquer plataforma de agente](/blog/lock-in-plataforma-de-agentes.html) — dependência de API, captura de framework, gravidade de dado, entrelaçamento de ecossistema — se aplicam com força extra aqui: cada agente ou servidor MCP instalado do marketplace aumenta o entrelaçamento com o resto da stack Salesforce, e o custo de trocar cresce junto com a conveniência de instalar rápido.

A Salesforce respondeu, em parte, com governança embutida na própria plataforma — AI Gateway ganhou controle centralizado de uso de token, permissão e aprovação. Mas controle de plataforma resolve o problema técnico, não o organizacional: alguém dentro da empresa ainda precisa decidir, item por item do catálogo, o que pode ser instalado sem passar por comitê e o que exige revisão formal antes do primeiro uso em produção.

## Quatro perguntas antes de instalar um agente ou servidor MCP do AgentExchange

Antes de clicar em "instalar" num item do catálogo, quatro perguntas separam decisão informada de aposta de velocidade:

1. **Quem publicou o item, e qual o nível de revisão que ele passou?** Selo de parceiro Salesforce não é garantia uniforme — como no AppExchange antigo, existe gradiente de rigor entre parceiro Crest e parceiro recém-credenciado.
2. **O que esse agente ou servidor MCP acessa, e isso precisa de aprovação formal antes da primeira execução?** Escopo de ferramenta exposta via MCP costuma ser mais amplo do que a descrição comercial do item sugere.
3. **Quanto de entrelaçamento com o resto da stack esse item cria?** Cada integração nativa aumenta o custo de trocar depois — vale perguntar isso antes de instalar, não depois de três meses de uso.
4. **Quem, dentro da empresa, é dono da decisão de manter esse item instalado?** Sem essa resposta, o catálogo cresce mais rápido do que a governança consegue acompanhar — e ninguém percebe até o primeiro incidente.

Nenhuma das quatro perguntas exige feature nova da plataforma. Exige o mesmo hábito organizacional que já separa quem escala agente de quem trava no piloto: decisão tomada antes de instalar, não depois que o item já está rodando em produção.

## O marketplace virou camada de arquitetura, não aba de compras

AgentExchange não é só AppExchange com nome novo e catálogo maior. É o reconhecimento, pela própria Salesforce, de que app, agente e servidor MCP competem hoje pelo mesmo orçamento e pela mesma decisão de arquitetura — e que separar essas três coisas em vitrines diferentes já não refletia como empresa de verdade monta solução. Pra quem decide tecnologia, isso significa tratar toda instalação do marketplace como decisão de arquitetura, com dono, escopo e critério de saída definidos — não como compra de app que só estende um sistema já fechado.

A consultoria que ajuda o cliente a navegar esse catálogo com critério — sem incentivo de comissão de nenhum fornecedor específico do outro lado da mesa — é quem consegue separar o item que resolve o problema real do item que só parece resolver porque está bem posicionado na busca.

## Perguntas que sempre voltam

Fechando, as dúvidas mais comuns sobre AgentExchange e o papel do MCP dentro dele.

## O que é o AgentExchange da Salesforce?

AgentExchange é o marketplace único que a Salesforce criou na TDX 2026 fundindo o AppExchange, o Slack Marketplace e a vitrine original de agentes num só catálogo, reunindo mais de 10 mil apps, 2.600+ apps de Slack e 1.000+ agentes, ferramentas e servidores MCP sob a mesma busca. O endereço antigo do AppExchange redireciona pra ele, e a busca passou a ser organizada por intenção de negócio, com modo conversacional previsto pra outono de 2026.

## Servidor MCP listado no AgentExchange é mais seguro que construir um do zero?

Não necessariamente — depende do nível de revisão que o publicador passou e do escopo de ferramenta que o servidor expõe, que costuma ser mais amplo do que a descrição comercial sugere. Instalar item pronto resolve velocidade, mas não substitui auditoria própria de transporte, autenticação e superfície de risco antes de colocar o servidor em produção. A due diligence de segurança continua sendo responsabilidade de quem instala, não só de quem publicou.

## Como decidir entre comprar um agente pronto do AgentExchange ou construir um internamente?

Com quatro perguntas objetivas antes de instalar: quem publicou o item e qual rigor de revisão ele passou, o que ele acessa e se isso precisa de aprovação formal, quanto de entrelaçamento com o resto da stack ele cria, e quem dentro da empresa é dono da decisão de mantê-lo instalado. Comprar pronto resolve velocidade; construir resolve controle — nenhuma das duas opções, sozinha, resolve o problema de governança se a decisão não tiver dono definido antes da instalação.
