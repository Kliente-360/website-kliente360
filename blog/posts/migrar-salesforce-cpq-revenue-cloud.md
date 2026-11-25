---
title: "Salesforce CPQ em fim de venda: migrar para Revenue Cloud agora ou esperar"
slug: "migrar-salesforce-cpq-revenue-cloud"
pillar: "sf"
date: "2026-11-25"
readMinutes: 7
excerpt: "O Salesforce CPQ não vende mais licença nova, mas não tem data de fim. Quando migrar para o Revenue Cloud compensa e quando esperar é a decisão certa."
tldr: "Fim de venda do Salesforce CPQ significa que o produto não recebe licença nova nem funcionalidade nova, mas continua suportado e renovável, sem data de fim de vida anunciada. Migrar para o Revenue Cloud (antes Revenue Cloud Advanced) não é troca de ferramenta: é redesenho de catálogo, preço e contrato, porque objetos, regras de preço e scripts do CPQ não têm equivalente direto. Compensa migrar agora quem está mudando o modelo de receita ou carrega CPQ muito customizado; quem tem modelo estável pode esperar, desde que use o tempo para limpar o catálogo."
keywords: ["migrar Salesforce CPQ", "Salesforce CPQ fim de venda", "Revenue Cloud Advanced", "migração CPQ para Revenue Cloud", "Salesforce Revenue Cloud"]
---

**Migrar do Salesforce CPQ para o Revenue Cloud** virou pauta obrigatória em toda conversa de renovação desde que a Salesforce colocou o CPQ em fim de venda, em março de 2025. A empresa que cota pelo CRM ouve a mesma pergunta do executivo de contas e do parceiro: quando vocês vão migrar? A resposta honesta, para boa parte dessas empresas, é "não agora". Para outra parte, é "já estão atrasados". O que separa uma da outra não é a idade da implementação, é o modelo de receita.

O ponto de partida precisa ser preciso, porque o mercado está cheio de versões alarmistas. Segundo a [página oficial da Salesforce sobre o tema, atualizada em julho de 2026](https://www.salesforce.com/sales/cpq/end-of-life/), o CPQ está em **fim de venda, não em fim de vida**. Cliente atual continua usando, compra usuário adicional, renova contrato e recebe suporte e correções críticas. O que acabou foi a licença para cliente novo e a funcionalidade nova. Não existe data de desligamento anunciada nem migração forçada.

## O que fim de venda muda de fato no Salesforce CPQ

Fim de venda é um relógio sem mostrador. Nada quebra amanhã, mas a plataforma parou de andar no ponto em que o CPQ está. Toda a inovação de preço, cotação, pedido e faturamento passou a ir para o Revenue Cloud e o Revenue Cloud Billing. O CPQ entrou em fase de manutenção.

Na prática, isso tem três consequências que aparecem antes de qualquer data oficial:

- **O que o negócio pedir de novo, o CPQ não vai ganhar.** Preço por consumo, modelos híbridos, venda por parceiro e por e-commerce, integração nativa com agentes. Tudo isso a Salesforce constrói no Revenue Cloud.
- **A customização vira a única forma de evoluir.** Sem funcionalidade nova, cada pedido do comercial vira regra de preço, script de cálculo (o famoso QCP, em JavaScript) ou campo customizado. A dívida cresce exatamente onde a migração vai doer depois.
- **O mercado de profissionais encolhe devagar.** Quem está começando carreira estuda Revenue Cloud. O especialista em CPQ fica mais raro e mais caro a cada ano.

Datas de fim de vida que circulam por aí, como "2029 ou 2030", são estimativas de consultorias e fornecedores de ferramenta, não anúncio da Salesforce. Vale tratá-las como hipótese de planejamento, nunca como prazo.

> Fim de venda não é prazo para migrar. É aviso de que cada customização nova no CPQ encarece a saída.

## Por que migrar não é trocar de ferramenta

O erro mais caro nessa decisão é imaginar a migração como upgrade de versão. O CPQ é um **pacote gerenciado** instalado sobre a plataforma, com objetos próprios e lógica de cotação presa à interface. O Revenue Cloud é nativo do core da Salesforce, com API primeiro e modelo de dados padrão. A própria comparação publicada pela Salesforce mostra o tamanho da distância:

1. **Catálogo.** O CPQ trabalha com bundles e opções por SKU. O Revenue Cloud trabalha com catálogo baseado em atributos. Um catálogo com 3.000 SKUs que são, na verdade, 40 produtos com variações não se transporta: precisa ser remodelado.
2. **Preço.** Regras de preço e scripts customizados do CPQ dão lugar a procedimentos de preço declarativos. A lógica de negócio precisa ser reescrita, não copiada.
3. **Configurador.** Regras de produto viram modelo de restrições.
4. **Assinaturas.** Aditivos e renovações no CPQ partem do contrato. No Revenue Cloud, partem do ativo. Isso afeta como a base instalada é migrada e como o financeiro enxerga receita recorrente.

A Salesforce é explícita: objetos, campos customizados, regras de preço e scripts específicos do CPQ **não mapeiam diretamente** para o Revenue Cloud. Objetos padrão migram com facilidade; o resto exige migração estruturada. A Salesforce estima de 3 a 6 meses para uma migração típica, do discovery ao go-live, e mais para implementações complexas. Pela nossa experiência com orgs de médio porte, o que estoura esse prazo é quase sempre o catálogo, não a tecnologia.

Há ainda o ruído de nome. O produto já se chamou Revenue Lifecycle Management, Revenue Cloud Advanced, Agentforce Revenue Management e, nas páginas mais recentes da Salesforce, voltou a aparecer como Revenue Cloud. No [post sobre a troca de Sales Cloud por Agentforce Sales](/blog/sales-cloud-vira-agentforce-sales.html) registramos a fase "Agentforce". É o mesmo produto em todas as etapas; o que importa é o escopo contratado, não a etiqueta.

## Quando migrar agora compensa e quando esperar é a decisão certa

A decisão fica mais simples quando sai do campo da tecnologia e entra no da receita. Na nossa leitura, quatro sinais indicam que esperar custa mais do que migrar:

1. **O modelo de receita está mudando.** Entrada de cobrança por consumo, planos híbridos, venda por canal de parceiros ou autoatendimento. O CPQ cobre mal consumo e foi desenhado para venda direta; cada adaptação vira código que não vai migrar.
2. **O CPQ já é mais script do que configuração.** Se o QCP tem milhares de linhas e só uma pessoa entende, a migração é também uma chance de tirar a regra de negócio da cabeça de alguém. Esse é o mesmo padrão da [dívida técnica de automação sobreposta no Salesforce](/blog/divida-tecnica-salesforce-automacao.html): camadas que ninguém mais consegue explicar.
3. **Há um redesenho comercial em curso.** Novo catálogo, nova política de desconto, nova linha de produto. Fazer isso no CPQ e depois de novo no Revenue Cloud é pagar duas vezes.
4. **Faturamento é o gargalo.** Se o pós-venda depende de planilha entre CPQ e ERP, o par Revenue Cloud e Revenue Cloud Billing ataca a causa, não o sintoma.

O contrário também vale. Esperar é legítimo quando o modelo comercial é estável, o CPQ tem pouca customização, a cotação funciona e há prioridades maiores na fila, como qualidade de dados ou o próprio rollout de agentes. Nesse caso, o CPQ continua suportado e a migração pode ser planejada para uma janela de renovação futura.

O que não é legítimo é esperar sem fazer nada. Quem adia a migração deveria usar o tempo para congelar customizações novas no CPQ e limpar o catálogo.

> O catálogo limpo é o único trabalho de CPQ que sobrevive intacto à migração para o Revenue Cloud.

## Seis passos para preparar a migração sem parar a cotação

Seja agora ou em dois anos, a sequência que recomendamos é a mesma:

1. **Inventarie a lógica, não só os objetos.** Liste regras de preço, regras de produto, scripts de cálculo, fluxos e integrações que tocam cotação. Para cada item, anote a regra de negócio que ele implementa, em português, sem jargão.
2. **Racionalize o catálogo antes de tudo.** Agrupe SKUs em produtos com atributos, aposente o que não vende há 12 meses e defina dono para cada família. É o passo que mais reduz prazo e o que mais depende do comercial, não da TI.
3. **Escolha a abordagem pelo que o negócio vai mudar.** A Salesforce descreve quatro: transposição com redesenho mínimo (*lift and shift*), transformação seletiva, racionalização completa, ou começar pelo Revenue Cloud numa unidade ou linha de produto nova. Transpor um catálogo bagunçado só muda a bagunça de lugar.
4. **Prefira a ponte ao big bang.** CPQ e Revenue Cloud podem coexistir na mesma org com as licenças certas. Negócio novo entra no Revenue Cloud; contratos existentes seguem no CPQ até a renovação. Reduz o risco de parar a cotação.
5. **Migre contratos e ativos por último.** Produto e preço precisam estar configurados antes de qualquer dado transacional. Inverter essa ordem é a forma mais comum de retrabalho. Atenção redobrada à integração com o ERP, onde o problema costuma ser contrato de dados, não arquitetura.
6. **Leve a decisão para a mesa de renovação.** A migração é argumento comercial. Créditos de implementação, período de licenças em paralelo e congelamento de preço são negociáveis, e a Gartner orientou compradores, em nota de setembro de 2026, a esperar reajustes de 12% ou mais nas renovações Salesforce. Negociar sem plano de migração é abrir mão do principal argumento.

Vale lembrar o que o [post sobre CPQ em SaaS B2B](/blog/cpq-saas-b2b.html) já defendia: o valor de uma ferramenta de cotação está na proposta que o cliente entende e assina, não no PDF que o vendedor gera. Essa régua não muda com a plataforma.

## A migração é redesenho de receita, não de sistema

A Salesforce informa que cerca de 15% dos clientes de Revenue Cloud vieram do CPQ. Ou seja, a grande maioria da base CPQ ainda não se mexeu, e não há urgência técnica imposta. A urgência, quando existe, vem do negócio: um modelo de receita que o CPQ não acompanha mais.

Quem tratar a migração como projeto de TI vai transpor regras velhas para uma plataforma nova e descobrir, seis meses depois, que nada melhorou. Quem tratar como revisão de catálogo, preço e contrato sai com uma operação comercial mais simples, e o Revenue Cloud vira consequência, não objetivo.

## Perguntas que sempre voltam

As dúvidas que mais aparecem quando a renovação do Salesforce traz o tema CPQ para a mesa.

## O Salesforce CPQ vai deixar de funcionar?

Não há data para isso. O Salesforce CPQ está em fim de venda desde março de 2025: não vende licença para cliente novo e não recebe funcionalidade nova, mas clientes atuais continuam usando, comprando usuários, renovando e recebendo suporte e correções críticas. Datas de fim de vida que circulam no mercado são estimativas de terceiros, não anúncio da Salesforce.

## Quanto tempo leva migrar do Salesforce CPQ para o Revenue Cloud?

A Salesforce estima de 3 a 6 meses para uma migração típica, do discovery ao go-live, com prazos maiores para implementações complexas. Na prática, o fator que mais pesa é o estado do catálogo de produtos e a quantidade de regras de preço e scripts customizados, porque esses elementos não mapeiam diretamente e precisam ser redesenhados.

## Dá para usar o Salesforce CPQ e o Revenue Cloud na mesma org?

Sim. A Salesforce permite a coexistência dos pacotes de CPQ e Billing com o Revenue Cloud na mesma org, desde que as licenças e funcionalidades necessárias estejam habilitadas. Isso viabiliza a abordagem de ponte, em que negócio novo entra no Revenue Cloud e contratos existentes seguem no CPQ até a renovação.
