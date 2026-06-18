---
title: "Quando NÃO usar Salesforce: 4 cenários em que o custo de licença supera o ROI"
slug: "quando-nao-usar-salesforce"
pillar: "sf"
date: "2026-05-24"
readMinutes: 7
excerpt: "Salesforce resolve muita coisa. Não resolve tudo. Quatro cenários em que a licença consome mais valor do que devolve — e o que usar no lugar."
tldr: "Salesforce é caro por design: a plataforma entrega valor proporcional ao tamanho do negócio. Quando o ICP é PME de ticket baixo, quando o processo comercial cabe em planilha, quando o gargalo é dado e não CRM, ou quando o time é pequeno demais pra absorver a curva de adoção — a licença vira passivo, não ativo."
keywords: ["Salesforce", "CRM", "ROI", "implementação CRM", "alternativas Salesforce"]
---

Quase todo cliente que chega na Kliente perguntando por Salesforce já decidiu que vai usar Salesforce. A pergunta verdadeira é se deveria. Como sócios que implementam a plataforma há anos, temos um interesse comercial claro em dizer que sim — e é exatamente por isso que esse post existe. Confiança técnica se constrói dizendo "não" quando "não" é a resposta certa.

Salesforce é a melhor plataforma de CRM do mercado pra um conjunto específico de cenários. Fora desse conjunto, o custo de licença consome valor mais rápido do que o produto devolve. Esse texto enumera os quatro cenários onde a recomendação honesta é não comprar Salesforce — e o que usar no lugar.

## Cenário 1 — ICP é PME com ticket baixo

A matemática que ninguém faz no momento da decisão: dividir o custo anual de Salesforce (licenças + implementação + sustentação) pela margem por cliente novo que o CRM ajuda a converter. Se o número não cabe em 6–10% do ticket médio anual, a plataforma é desproporcional.

Empresa B2B vendendo SaaS de R$ 800/mês com 200 clientes não consegue justificar Sales Cloud Enterprise em US$ 165/usuário/mês × 10 usuários × 12 meses + implementação. O Hubspot Sales Hub Starter, ou mesmo o Pipedrive bem configurado, devolvem 80% do valor por 20% do custo. A operação só vai sentir falta do Salesforce quando o ticket subir.

O sinal claro: se o LTV/CAC ainda não comporta investimento em time de RevOps dedicado, Salesforce está em estágio errado da maturidade comercial. Trocar mais cedo é caro; trocar tarde é mais caro ainda — mas adotar antes da hora é desperdício que ninguém percebe porque está embutido no orçamento de TI.

## Cenário 2 — O processo comercial cabe em planilha

Esse cenário aparece quando o cliente tem 3–8 vendedores, ciclo de vendas curto (menos de 30 dias), pipeline simples (1 produto, 1 segmento, 1 motion), e o gestor já consegue olhar pra todos os deals abertos numa única vista mental. CRM nesse caso não automatiza — formaliza. E formalizar processo simples geralmente é overhead, não ganho.

O sintoma que detectamos em diagnóstico: vendedores fazem "double entry" — anotam o cliente no WhatsApp/caderno e depois transcrevem pro CRM porque o gestor exige. Resultado: dado de baixa qualidade no CRM, decisão real continua acontecendo fora dele.

A resposta honesta nesse cenário: usar planilha colaborativa por mais 12 meses, focar a energia em definir bem o processo comercial (estágios, critérios de avanço, gatilhos de qualificação), e migrar pra CRM quando o crescimento tornar planilha inviável — não antes.

> Implementar CRM antes de ter processo é eternizar caos com interface bonita. A planilha que dói força definição; o CRM que abriga indefinição mascara.

## Cenário 3 — O gargalo é dado, não CRM

Empresa com Salesforce instalado há 5 anos, dado fragmentado entre Salesforce, ERP, marketing automation, planilhas de Customer Success e e-commerce. Diretor chega achando que "o problema é o CRM" — porque a vista dele do cliente está incompleta. Reimplantar Salesforce não resolve.

O problema real é arquitetura de dados: cada sistema é fonte da verdade pra alguma coisa, mas ninguém consolidou customer ID, ninguém modelou o cliente único, ninguém colocou contrato de dados entre os times. O CRM, por mais perfeito que esteja, só mostra o pedaço que tem.

A solução técnica honesta passa por [Customer 360 e Data Cloud](/blog/customer-360-vs-cdp.html), [data contracts](/blog/data-contracts.html) e modelagem dimensional limpa — *antes* de mexer no Salesforce. Trocar Salesforce por Salesforce não resolve o problema de raiz, e o cliente sai do projeto com mais ferramenta e o mesmo gap. Em alguns casos, o Salesforce existente está OK; o que falta é a camada de dados abaixo dele. Esse diagnóstico é desconfortável de entregar mas é o que move a agulha.

## Cenário 4 — Time pequeno demais pra absorver a curva

Salesforce premia operação madura: admin certificado, processo de release, governança de campos customizados, gestão de Flow e Apex. Empresa sem esse músculo entra na plataforma e em 18 meses está com 400 campos customizados sem dono, 60 Flows que ninguém entende, e contrato de sustentação fora do orçamento original.

O ponto cego: o custo total de Salesforce não é a licença. É a operação contínua. Time de 3 pessoas no comercial e zero pessoa dedicada a CRM não tem capacidade de absorver a manutenção. O sistema vira fonte de débito técnico crescente, e o ROI desaparece dentro da fatura mensal do parceiro de sustentação — sendo que [escolher esse parceiro pelo tier do Partner Program](/blog/salesforce-partner-program.html) é uma armadilha à parte.

Antes de comprar Salesforce, o sócio honesto pergunta: você tem (ou vai contratar) admin certificado nos próximos 6 meses? Se a resposta é não e nem é prioridade, a recomendação é diferir a decisão. Existe vida produtiva com [Flow vs Apex](/blog/flow-vs-apex.html) configurado por admin sênior — mas não existe vida produtiva sem admin algum.

## O que usar no lugar — escolhas honestas

A resposta não é uma só. Depende do cenário:

**Pra cenário 1 (PME ticket baixo):** Hubspot Sales Hub (Starter ou Professional), Pipedrive, Freshsales. Pra B2C com volume, RD Station ou Zoho. Critério: custo total cabe em 6–10% do ticket anual médio.

**Pra cenário 2 (processo em planilha):** Notion ou Airtable com vista de pipeline + automações leves (n8n, Make). Não tente trocar planilha por CRM — formalize processo primeiro, ferramente depois.

**Pra cenário 3 (gargalo é dado):** Antes de qualquer CRM novo, projeto de unificação de dados. Pode ser Customer 360 + Data Cloud (se já tem Salesforce), pode ser warehouse moderno (Snowflake/Databricks/BigQuery) com camada semântica em dbt, pode ser CDP open-source.

**Pra cenário 4 (sem músculo de operação):** Adiar Salesforce. Investir em CRM mais simples + treinar primeiro admin interno. Quando esse admin tiver 12+ meses de operação, reavaliar.

## A pergunta que separa decisão boa de decisão por moda

A pergunta certa antes de comprar Salesforce não é "Salesforce é bom?" — é "Salesforce resolve o meu problema melhor que a alternativa de 10% do custo, considerando que vou pagar pela diferença por 5–10 anos?". Pra grande parte do mercado mid-market e enterprise complexo, a resposta é sim, sem discussão. Pra muita empresa que chega achando que precisa, a resposta é não — e quem vende Salesforce profissionalmente deveria dizer isso primeiro.

Não vender Salesforce quando ele não é a resposta é o que constrói relação de longo prazo. Cliente que comprou ferramenta errada nunca esquece quem vendeu. Cliente que ouviu "agora não" volta quando a hora chegar — e volta pra quem foi honesto na primeira conversa. Quando a decisão de implementar é correta, [um MVP de Salesforce em seis semanas com escopo honesto](/blog/implementacao-salesforce-seis-semanas.html) é o ponto de partida: não uma entrega completa em 14 dias, mas a fundação que resiste ao uso real.
