---
title: "Data Cloud pricing 2026: o novo modelo de créditos e o que muda no orçamento"
slug: "data-cloud-pricing-creditos-2026"
pillar: "sf"
date: "2026-07-22"
readMinutes: 7
excerpt: "Em março de 2026 a Salesforce trocou quatro créditos segmentados por um pool único e criou SKU por perfil — o que isso muda no orçamento de Data Cloud."
tldr: "Data Cloud pricing 2026 é a reformulação que a Salesforce aplicou em 2 de março, substituindo quatro tipos de crédito segmentado por um pool único e fungível — os Data Services Credits — e adicionando um SKU fixo por perfil como alternativa ao consumo variável. A ingestão de dado nativo (Sales Cloud, Service Cloud, Marketing Cloud, Commerce) deixou de consumir crédito, resposta direta à queixa de pagar duas vezes pelo próprio dado. Mas o multiplicador de crédito por operação — de 2 créditos por milhão de linhas numa consulta a 100.000 numa resolução de identidade — continua concentrando o risco de orçamento estourado em cargas específicas. A escolha entre consumo por crédito e SKU por perfil virou decisão de orçamento, não default de contrato."
keywords: ["Data Cloud pricing", "Data Services Credits", "SKU por perfil", "Salesforce Data 360", "Flex Credits", "orçamento de Data Cloud"]
---

Data Cloud trocou de nome e de tabela de preço no mesmo ano. Virou Data 360 em outubro de 2025; em 2 de março de 2026, a Salesforce reformulou a precificação inteira — quatro tipos de crédito segmentado viraram um pool único, e um SKU fixo por perfil entrou como alternativa ao consumo variável. A pergunta que decisor de orçamento vinha fazendo há dois anos — quanto Data Cloud custa de verdade — finalmente tem resposta mais clara. Só que a resposta não é "mais barato". É "depende de qual dos três modelos você escolhe, e a escolha errada ainda estoura orçamento do jeito que estourava antes".

Isso importa mais agora do que importava há um ano. Data Cloud deixou de ser só camada de unificação de perfil — [é a fundação de contexto que qualquer agente Agentforce consulta pra decidir](/blog/data-cloud-nervo-central.html). Errar o modelo de pricing deixou de ser custo isolado de uma iniciativa de CDP: virou custo estrutural embutido em cada agente que a empresa colocar pra rodar.

## O que mudou de fato em 2 de março

Antes da reforma, Data Cloud pricing herdava um problema de 2023: crédito segmentado em quatro categorias diferentes, separadas entre sandbox e produção, cada uma com regra própria de consumo. Ninguém fora do time de licenciamento conseguia prever gasto com confiança — e o modelo anterior chegava a cobrar US$ 108 mil anuais só de licença-base de Data Cloud for Marketing, segundo levantamentos de mercado, antes de processar uma única linha de dado externo.

A reforma resolve parte disso com três movimentos:

1. **Pool único de crédito.** Os quatro tipos segmentados viraram um só — os Data Services Credits, fungíveis entre qualquer função de Data 360. US$ 500 rendem 100 mil créditos, usáveis em ingestão, transformação, segmentação ou resolução de identidade, sem categoria travada.
2. **SKU fixo por perfil.** Alternativa ao consumo variável: US$ 240 por mil perfis no plano básico, US$ 420 no premium, cobrados por ano. Troca previsibilidade de orçamento por rigidez de uso — quem sabe quantos perfis vai gerenciar, mas não sabe quanto vai processar, ganha com esse modelo.
3. **Ingestão nativa sem custo de crédito.** Dado que já mora em Sales Cloud, Service Cloud, Marketing Cloud Engagement, Marketing Cloud Personalization ou Commerce entra em Data Cloud sem consumir crédito. É resposta direta à queixa mais repetida do ciclo anterior: pagar de novo por um dado que a empresa já pagou pra gerar dentro da própria Salesforce.

> A reforma resolve o preço de entrada. Não resolve sozinha o risco de orçamento que mora dentro da operação.

## Por que o pool único não elimina a imprevisibilidade

O ganho real do pool único é eliminar a fricção de categoria — antes, sobrar crédito de um tipo e faltar de outro travava operação sem motivo técnico. Isso acabou. Mas o consumo por crédito continua variável por natureza, e o multiplicador por tipo de operação é onde o risco de orçamento se esconde agora.

Uma consulta simples sobre dado já ingerido consome 2 créditos por milhão de linhas processadas. Resolução de identidade — o processo que unifica múltiplos registros duplicados num perfil só — consome até 100.000 créditos por milhão de linhas. A diferença entre as duas operações é de cinco ordens de grandeza. Empresa que estima orçamento pelo caso de uso mais barato (consulta) e descobre no meio do trimestre que o volume real de resolução de identidade é 10x o esperado tem a mesma surpresa de fatura de antes da reforma — só que agora com um pool só, o estouro em identidade drena crédito que também alimentava segmentação e ativação.

Isso não é falha da reforma. É a mesma lição que qualquer decisão de plataforma enterprise carrega: [o custo real aparece na operação, não na proposta comercial](/blog/salesforce-roi-matriz.html). O pool único trocou "imprevisível por categoria travada" por "imprevisível por multiplicador de operação" — melhor, mas não resolvido.

## Três perguntas pra decidir entre os três modelos

A decisão certa não é "qual modelo é mais barato" — é "qual modelo combina com o padrão de consumo real da operação". Três perguntas, na ordem em que valem a pena checar:

1. **Quantos perfis a empresa gerencia, e essa contagem é estável?** Se a resposta é "sim, sabemos o número e ele varia pouco mês a mês", o SKU por perfil dá orçamento fixo e previsível — sem surpresa de fatura mesmo que o volume de processamento oscile.
2. **Qual fração do volume de dado passa por resolução de identidade?** Se a operação faz matching pesado — múltiplas fontes, alta duplicidade, dado de terceiro entrando com frequência — o multiplicador de 100.000 créditos por milhão de linhas domina a conta, e o consumo variável vira risco concentrado. SKU por perfil neutraliza esse risco porque o preço não muda com a complexidade do processamento interno.
3. **A empresa já usa Agentforce ou Slack no mesmo contrato?** Se sim, Flex Credits — o pool fungível entre Data 360, Agentforce, Slack e outros produtos — evita comprar crédito duplicado em silos separados. Quem só usa Data Cloud isolado não ganha nada com esse terceiro modelo; quem já compra os outros produtos ganha flexibilidade real de realocação.

Nenhuma das três perguntas, isolada, decide sozinha — mas a segunda costuma pesar mais que as outras duas juntas, porque é ela que expõe o multiplicador de cinco ordens de grandeza.

## Onde cada modelo ganha na prática

Aplicando o critério a cenários reais:

**Operação com poucas fontes de dado e identidade já resolvida** (empresa pequena a média, um sistema de origem dominante) tolera bem o consumo por crédito. O risco do multiplicador de identidade não se materializa porque o volume de matching é baixo. Aqui o pool único de crédito, isolado, já resolve — sem precisar do SKU fixo.

**Operação com múltiplas fontes e matching contínuo** (fusão de sistemas, integração de aquisição, dado de terceiro entrando toda semana) é onde o SKU por perfil paga o próprio prêmio. US$ 240–420 por mil perfis parece caro contra o preço de entrada do crédito — até a empresa rodar a conta de quantos créditos um trimestre de resolução de identidade pesada consumiria no modelo variável.

**Operação de ticket baixo que só cogitou Data Cloud pela pressão do vendor de agente** merece a pergunta mais dura: [o cálculo que já decide se Salesforce faz sentido no geral](/blog/quando-nao-usar-salesforce.html) vale igual pra Data Cloud isolado. Se o caso de uso de agente não justifica o investimento em CRM completo, ele também não justifica o investimento paralelo em camada de contexto — não importa quão simplificado ficou o pricing.

1. **Poucas fontes, matching leve:** consumo por crédito isolado resolve, sem SKU.
2. **Múltiplas fontes, matching pesado, contagem de perfil estável:** SKU por perfil neutraliza o risco do multiplicador.
3. **Contrato já inclui Agentforce ou Slack:** Flex Credits evita silo de crédito duplicado entre produtos.

> Preço simplificado não é sinônimo de orçamento sob controle — o multiplicador de operação continua sendo a variável que decide o custo real.

## A reforma resolveu o preço de entrada, não o risco de orçamento

A queixa que motivou a reforma era real — quatro créditos segmentados, preço-base alto e ingestão cobrada duas vezes pelo próprio dado eram atrito genuíno, e a Salesforce endereçou os três. Mas quem lê "pricing simplificado" como "orçamento sob controle" vai repetir o erro que fazia antes: assumir o cenário mais barato de consumo e descobrir o multiplicador de identidade no meio do trimestre.

O trabalho que sobra pro cliente é o mesmo de sempre — mapear o próprio padrão de consumo antes de escolher modelo, não depois. Quem faz essa conta com o multiplicador de operação em mãos entra o resto de 2026 com orçamento de Data Cloud calibrado. Quem assina pela tabela de preço simplificada sem rodar o próprio cenário descobre a régua real na fatura do segundo trimestre — igual descobria antes da reforma, só que agora num pool só.

## Perguntas que sempre voltam

Fechando, as três dúvidas mais comuns sobre o novo pricing de Data Cloud.

## O que mudou no pricing do Data Cloud em 2026?

Em 2 de março de 2026, a Salesforce consolidou quatro tipos de crédito segmentado (divididos entre sandbox e produção) num pool único e fungível — os Data Services Credits — e lançou um SKU fixo por perfil (US$ 240 a US$ 420 por mil perfis ao ano) como alternativa ao consumo variável. Ingestão de dado nativo de Sales Cloud, Service Cloud, Marketing Cloud e Commerce deixou de consumir crédito. A reforma acompanha o rebranding de Data Cloud para Data 360, ocorrido em outubro de 2025.

## Crédito consolidado ou SKU por perfil — qual escolher?

Depende do padrão de consumo, não do preço de entrada. Consumo por crédito favorece operação com poucas fontes de dado e matching leve, porque o multiplicador de resolução de identidade (até 100.000 créditos por milhão de linhas, contra 2 créditos numa consulta simples) não pesa na conta. SKU por perfil favorece operação com matching pesado e contagem de perfil estável — o preço fixo neutraliza o risco do multiplicador variável. Empresa que já usa Agentforce ou Slack no mesmo contrato ganha ainda com Flex Credits, o pool fungível entre produtos.

## Ingestão de dado da própria Salesforce ainda consome crédito no Data Cloud?

Não, desde a reforma de março de 2026. Dado estruturado vindo de conectores nativos — Sales Cloud, Service Cloud, Marketing Cloud Engagement, Marketing Cloud Personalization e Commerce — entra em Data 360 sem custo de crédito. É resposta direta à queixa mais repetida do modelo anterior: cliente pagava de novo por um dado que já tinha gerado (e pago para gerar) dentro da própria plataforma. Dado de fonte externa ou de terceiro continua consumindo crédito normalmente.
