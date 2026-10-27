---
title: "MDM no Salesforce: o que a compra da Informatica muda no Data Cloud"
slug: "informatica-mdm-salesforce-data-cloud"
pillar: "sf"
date: "2026-10-27"
readMinutes: 7
excerpt: "A Salesforce comprou a Informatica e trouxe o MDM para a plataforma. Veja a diferença entre MDM e identidade no Data Cloud e quando o golden record paga."
tldr: "MDM (Master Data Management) é a prática de manter um registro mestre, o golden record, de cada cliente, produto ou fornecedor, com dono e regra de sobrevivência definidos. A Salesforce concluiu a compra da Informatica em 18 de novembro de 2025 e declarou que vai integrar o MDM da empresa em um pipeline único com o Data Cloud (hoje Data 360). Isso não substitui a resolução de identidade do Data Cloud: ela unifica perfis para ativação, enquanto o MDM decide qual valor é o correto e quem responde por ele. Quem já tem Data Cloud deve decidir primeiro se tem um problema de dado mestre, e só depois comprar a ferramenta."
keywords: ["MDM Salesforce", "Informatica Salesforce", "golden record", "Data Cloud resolução de identidade", "Data 360", "master data management"]
---

**MDM no Salesforce** deixou de ser assunto de arquitetura de dados e virou pauta de comitê. Em 18 de novembro de 2025, a Salesforce [concluiu a aquisição da Informatica](https://investor.salesforce.com/news/news-details/2025/Salesforce-Completes-Acquisition-of-Informatica/) e disse que catálogo, integração, qualidade, governança, metadados e master data management passam a compor a plataforma, com a promessa de um pipeline único com MDM sobre o Data Cloud, que a empresa agora chama de Data 360.

Quem já opera Data Cloud ouviu a pergunta de sempre: "isso resolve a bagunça de cliente duplicado?". A resposta honesta é que resolve uma parte, e que a outra parte é uma decisão de organização que nenhuma licença toma por você.

## MDM e resolução de identidade não são a mesma coisa

Os dois termos aparecem juntos nos materiais de venda, e a confusão custa caro. A diferença cabe em duas definições:

**Resolução de identidade** (o que o Data Cloud faz) reúne registros que parecem ser da mesma pessoa em um perfil unificado, usando regras de correspondência. O objetivo é ativar: segmentar, personalizar, alimentar um agente com contexto. Os registros de origem continuam existindo, e o perfil unificado é uma visão construída por cima deles.

**MDM** (o que a Informatica faz) decide qual é o valor correto de cada atributo e grava isso em um registro mestre, o golden record. Define regras de sobrevivência (se o ERP diz um endereço e o CRM outro, qual vale), atribui um responsável e devolve o dado corrigido aos sistemas de origem.

> Resolução de identidade responde "quem é este cliente?". MDM responde "qual versão deste dado é a oficial, e quem responde por ela?".

A distinção importa porque o Data Cloud pode unificar dois registros e ainda assim expor dois CNPJs diferentes para a mesma conta, sem dizer qual está certo. Para uma campanha, isso é tolerável. Para faturamento, crédito ou um agente que responde ao cliente, não é. Já discutimos a [diferença entre Customer 360 e CDP](/blog/customer-360-vs-cdp.html); o MDM é a terceira camada dessa conversa, e a que mais depende de gente.

## O que a compra muda na prática

O que está confirmado é a direção: Salesforce declara que vai integrar rapidamente a pilha da Informatica, incluindo integração, qualidade, governança e metadados unificados. A própria Informatica citava mais de 5.000 clientes em quase 100 países antes da compra, o que indica uma base grande de empresas que já usam o produto fora do ecossistema Salesforce.

O que ainda não está confirmado, e vale tratar com cautela: prazos de integração, modelo de licenciamento do MDM dentro de Data 360 e o que acontece com contratos existentes de quem usa Informatica com outros CRMs. Qualquer proposta que prometa data e preço fechados para essa integração está vendendo roadmap. Na nossa leitura, o efeito de curto prazo é menos tecnológico e mais comercial: o MDM entra na conversa de renovação e de pricing, o mesmo terreno que já pesa em [como o Data Cloud é cobrado hoje](/blog/data-cloud-pricing-creditos-2026.html).

Isso reforça uma tese que defendemos desde que [o Data Cloud virou o nervo central do Salesforce](/blog/data-cloud-nervo-central.html): a plataforma está caminhando para ser o lugar onde o dado do cliente é governado, não só ativado. Para agentes, essa é a camada que decide se a resposta é confiável.

## Quando o golden record compensa

MDM é um programa, não uma ferramenta. Em projetos que acompanhamos, o custo dominante não é a licença, é a definição de regras e donos. Cinco sinais indicam que o problema já é de dado mestre e não de configuração:

1. **O mesmo cliente tem cadastros divergentes em três ou mais sistemas** (CRM, ERP, faturamento) e a área comercial discute qual vale em toda reunião.
2. **Há mais de uma fonte "oficial" para um campo crítico**, como razão social, CNPJ, limite de crédito ou hierarquia de contas.
3. **Um agente ou automação age sobre o dado** e o erro de cadastro agora vira ação errada, não só relatório torto.
4. **A fusão de contas é manual e recorrente**, consumindo horas fixas do time de operações todo mês.
5. **Existe obrigação regulatória sobre o dado**, como consentimento e direito de exclusão da LGPD, que exige saber onde cada titular aparece.

Se nenhum desses sinais se aplica, a dor provavelmente é de [dado limpo que nunca será perfeito](/blog/dado-limpo-e-um-mito.html), e um conjunto de regras de deduplicação bem feitas resolve por uma fração do custo. Se dois ou mais se aplicam, MDM tende a pagar a conta. Esse corte é uma estimativa nossa a partir dos projetos que vimos, não um benchmark de mercado.

## Como decidir sem comprar a ferramenta primeiro

A ordem importa mais que o produto. A sequência que recomendamos:

1. **Liste os cinco atributos que não podem estar errados.** Normalmente são identificador fiscal, razão social, endereço de cobrança, hierarquia de contas e status do cliente.
2. **Nomeie um dono por atributo.** Sem pessoa responsável, a regra de sobrevivência vira disputa a cada ocorrência.
3. **Defina a regra de sobrevivência em uma frase por atributo.** Se ela não cabe em uma frase, o dado ainda não está pronto para automatizar.
4. **Meça a duplicidade atual.** Percentual de contas duplicadas e tempo gasto em fusão manual dão o caso de negócio.
5. **Só então escolha a camada.** Regras no Data Cloud, MDM dedicado ou ambos, conforme a medição.

## O que fazer enquanto a integração amadurece

Não existe motivo para pausar projeto de Data Cloud esperando o MDM. O custo de esperar é maior que o de projetar a fronteira desde já: separar, no desenho, o que é perfil para ativação e o que é dado mestre com dono. Quem faz essa separação agora migra para o MDM integrado, se decidir adotá-lo, sem refazer o modelo.

Também vale revisar a premissa de que o Informatica resolve [integração Salesforce com o ERP](/blog/integracao-salesforce-erp.html). Ele ajuda a mover e qualificar dado, mas o contrato entre os sistemas continua sendo o gargalo, e nenhuma plataforma o escreve por você.

## Perguntas que sempre voltam

As dúvidas que mais aparecem quando o assunto é MDM, Informatica e Data Cloud na mesma frase.

## O Data Cloud já faz MDM?

Não. O Data Cloud faz resolução de identidade: unifica registros em um perfil para ativação e contexto. Ele não define um valor oficial por atributo nem devolve o dado corrigido aos sistemas de origem. A integração anunciada com a Informatica é justamente a tentativa da Salesforce de cobrir essa lacuna dentro da plataforma.

## O que acontece com quem já usa Informatica depois da compra?

A Salesforce concluiu a aquisição em 18 de novembro de 2025 e declarou que vai integrar a tecnologia da Informatica à plataforma. Sobre contratos existentes, a comunicação pública não detalha mudanças. O ponto prático é revisar renovações e dependências antes de assinar prazos longos, já que preço e empacotamento tendem a mudar.

## Toda empresa com Salesforce precisa de MDM?

Não. Empresas com poucas fontes de dado de cliente e regras de deduplicação bem mantidas costumam passar sem MDM dedicado. Ele compensa quando há várias fontes oficiais em conflito, agentes agindo sobre o dado ou obrigação regulatória de rastrear cada titular. Antes de comprar, vale medir a duplicidade atual e o custo da fusão manual.
