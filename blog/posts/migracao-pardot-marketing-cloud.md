---
title: "Migração Pardot para Marketing Cloud Engagement: o que o projeto não revela"
slug: "migracao-pardot-marketing-cloud"
pillar: "sf"
date: "2026-06-10"
readMinutes: 6
excerpt: "Pardot e Marketing Cloud Engagement não são o mesmo produto. O que muda, o que precisa ser refeito e quando migrar não compensa."
tldr: "Pardot (MCAE) e Marketing Cloud Engagement têm arquiteturas distintas: modelo de dados, templates e lógica de jornada precisam ser reconstruídos, não convertidos. A migração exige inventário de programas ativos, definição de Subscriber Key e aquecimento de IP antes do projeto começar. Faz sentido se o uso for B2C ou multicanal em escala — não se o marketing for B2B puro orientado a pipeline."
keywords: ["migração Pardot", "Marketing Cloud Engagement", "Pardot para Marketing Cloud", "MCAE", "automação de marketing Salesforce"]
---

A proposta chega em dois contextos típicos: renovação de licença com sugestão de upgrade, ou revisão de stack de marketing que detecta crescimento além do Pardot. Nos dois casos, o parceiro Salesforce enquadra a mudança como "migração" — e é aí que o projeto começa a acumular surpresas.

Pardot, rebatizado como Marketing Cloud Account Engagement (MCAE) em 2022, e Marketing Cloud Engagement não são versões do mesmo produto em escalas diferentes. São plataformas com arquiteturas distintas, modelos de dados diferentes e perfis de uso originalmente separados.

> O que parece migração quase sempre é reimplementação — com custo e prazo de projeto novo.

## Pardot e Marketing Cloud Engagement não partem do mesmo pressuposto

O MCAE foi construído para marketing B2B: leads conectados a oportunidades no CRM, nurture baseado em pontuação de engajamento, formulários que alimentam pipeline comercial. O modelo de dado central é o Lead — a mesma entidade do Sales Cloud, com sincronização nativa e sem configuração adicional.

Marketing Cloud Engagement foi construído para operação de marketing em escala B2C: envio de e-mail em lote, jornadas multicanal (e-mail, SMS, push, anúncios), segmentação em Data Extensions, templates dinâmicos com AMPscript. O modelo de dado central não é o Lead — é o Subscriber, com chave independente e vínculo ao CRM via Marketing Cloud Connect, configurado separadamente.

Essa diferença de pressuposto se propaga em cascata por todo o projeto:

1. **Modelo de dados.** MCAE usa os objetos do Salesforce diretamente (Lead, Contact, Account, Opportunity). MCE usa Data Extensions — tabelas relacionais configuráveis, sem ligação nativa com o CRM. A sincronização exige o Marketing Cloud Connect, que precisa ser configurado, testado e monitorado como parte do escopo.

2. **Sintaxe de template.** MCAE usa HML (Handlebars Merge Language). MCE usa AMPscript — linguagem proprietária com lógica condicional, loops e chamadas de API inline. Templates HML não convertem para AMPscript: precisam ser reescritos.

3. **Lógica de jornada.** O Engagement Studio do MCAE é orientado a condições de CRM: pontuação de lead, estágio de oportunidade, campos de objeto. O Journey Builder do MCE é orientado a eventos: entrada por fluxo de dados, gatilho externo, bifurcação por atributo de Data Extension. A lógica de negócio existe nas duas ferramentas — mas os gatilhos disponíveis e as condições de saída são diferentes o suficiente para exigir redesenho dos programas, não conversão.

## O que precisa acontecer antes do projeto começar

Projetos de migração que encontram surpresa na metade geralmente pularam a fase de diagnóstico. Quatro inventários são obrigatórios antes de aprovar escopo e prazo:

1. **Inventário de programas ativos.** Quantos Engagement Programs estão rodando no MCAE? Com quantas etapas? Quantos leads dentro? Cada programa ativo precisa de equivalente em Journey Builder — e o mapeamento de lógica é manual, não importável.

2. **Inventário de templates.** Listar e-mails HML ativos e de uso recorrente (boas-vindas, nurture, reengajamento). Templates abandonados não precisam migrar; os de uso frequente precisam ser reescritos em AMPscript ou convertidos para o Content Builder de arrastar-e-soltar. A quantidade de templates é o principal driver de prazo — não a configuração da plataforma.

3. **Mapeamento do modelo de contatos.** No MCAE, a chave segue o modelo do Salesforce (Lead ID ou Contact ID). No MCE, a chave é o Subscriber Key — configurável como e-mail, CRM ID ou identificador próprio. Definir essa chave antes de importar dados evita o problema mais caro: duplicidade de assinante com histórico fragmentado.

4. **Histórico de reputação de IP.** Para volumes acima de 100 mil e-mails por mês, a migração exige aquecimento de IP no MCE — processo gradual de 4 a 8 semanas que não pode ser comprimido sem risco de cair em blacklists. Aquecimento precisa constar no cronograma com folga real, não como linha paralela ao go-live.

## Armadilhas que aparecem depois do go-live

Mesmo com diagnóstico bem feito, algumas dificuldades emergem no uso real:

**Marketing Cloud Connect não é plug-and-play.** A integração com o Salesforce CRM exige configuração de Synchronized Data Sources, mapeamento de campos e testes de latência. Em implementações com pressa, o Connect funciona no sandbox e falha em carga real — especialmente quando há volume alto de atualizações simultâneas de Lead e Contact.

**Permissões seguem modelo próprio.** No MCAE, permissões seguem os perfis do Salesforce. No MCE, o modelo é interno: Roles, Business Units e permissões de Content Builder precisam ser configurados separadamente. Times com múltiplas marcas ou linhas de produto precisam redesenhar a estrutura de acesso — não apenas replicar o que existia no CRM.

**Relatórios não migram.** Os relatórios de campanha do MCAE (open rate, click rate, pipeline gerado) não têm equivalente automático no MCE. O Intelligence Reports usa modelo diferente, e o histórico de campanhas antigas raramente migra com fidelidade para o novo sistema.

**Custo de licença sobe.** MCE é produto enterprise com precificação diferente do MCAE. Projetos que tratam a migração como "upgrade" frequentemente descobrem no contrato final que o custo anual aumentou 40 a 100% — com justificativa válida, mas que deveria estar no business case desde o início, não na surpresa da renovação.

## Quando a migração não compensa

[A mesma lógica de avaliar quando não usar Salesforce](/blog/quando-nao-usar-salesforce.html) se aplica à escolha entre MCAE e MCE: o custo de licença e de operação precisa justificar a capacidade adicional.

Se o modelo de uso for principalmente B2B — qualificação de leads com scoring, nurture baseado em pipeline, relatórios de campanha vinculados a oportunidades — o MCAE é o produto mais adequado. A integração nativa com o CRM, a lógica de pontuação e o Engagement Studio foram construídos exatamente para esse caso. Migrar para MCE nesse cenário é pagar mais por uma plataforma construída para outro perfil de uso.

MCE compensa quando o marketing opera com volume alto de comunicação transacional ou multicanal — campanhas B2C com segmentação comportamental complexa, ou quando [Marketing Cloud precisa consumir dados do Data Cloud](/blog/marketing-cloud-data-cloud.html) para personalização granular em escala. Nesses cenários, a arquitetura do MCE entrega o que o MCAE não consegue.

A pergunta de qualificação antes de qualquer proposta de migração: **o caso de uso real é B2C ou multicanal em escala?** Se sim, a migração tem argumento técnico sólido. Se o marketing continua orientado a pipeline B2B, a recomendação honesta é otimizar o MCAE em vez de migrar.

## O escopo real de um projeto de migração

Para referência de prazo: uma migração com 10 a 20 programas ativos, 30 a 50 templates e time de marketing de médio porte leva de 12 a 20 semanas em projetos bem gerenciados. Não seis — e não com o mesmo time que fez a implementação original do Salesforce.

O diagnóstico ocupa as primeiras 4 semanas: inventário de programas, mapeamento de modelo de dados, decisão de Subscriber Key, design de Data Extensions. A reescrita de templates e reconstrução de jornadas ocupa as 6 a 10 semanas seguintes. O aquecimento de IP e os testes do Marketing Cloud Connect rodam em paralelo. Go-live faseado — com os programas mais simples primeiro — fecha o projeto com menor risco.

[Mapear o que existe antes de configurar](/blog/mapear-processos-antes-do-salesforce.html) é a disciplina que distingue implementações de CRM bem-sucedidas das que precisam ser refeitas em dois anos. Em migração de plataforma de marketing, o diagnóstico não é overhead — é o trabalho que decide se o projeto termina em go-live ou em retrabalho.

## Perguntas que sempre voltam

Antes de encerrar, as dúvidas que mais aparecem quando essa migração entra na pauta.

## Quanto tempo demora uma migração de Pardot pra Marketing Cloud?

De 12 a 20 semanas num projeto bem gerenciado com 10 a 20 programas ativos e 30 a 50 templates — não seis semanas, e não com o mesmo time que implementou o Salesforce original. As primeiras 4 semanas são diagnóstico: inventário de programas, mapeamento de modelo de dados, decisão de Subscriber Key e design de Data Extensions. A reescrita de templates e a reconstrução de jornadas ocupam as 6 a 10 semanas seguintes, com aquecimento de IP e testes do Marketing Cloud Connect rodando em paralelo.

O principal driver de prazo não é a configuração da plataforma — é a quantidade de templates a reescrever. E se o volume passa de 100 mil e-mails por mês, o aquecimento de IP adiciona 4 a 8 semanas que não podem ser comprimidas sem risco de blacklist.

## Dá pra reaproveitar templates e jornadas do Pardot no Marketing Cloud?

Não — templates e jornadas precisam ser reconstruídos, não convertidos. O MCAE usa HML (Handlebars Merge Language) e o MCE usa AMPscript: templates HML não convertem, precisam ser reescritos ou refeitos no Content Builder. O mesmo vale pra jornadas: o Engagement Studio é orientado a condições de CRM, enquanto o Journey Builder é orientado a eventos — gatilhos e condições de saída são diferentes o suficiente pra exigir redesenho de cada programa, com mapeamento manual de lógica.

Por isso o que o mercado chama de "migração" é, na prática, reimplementação — com custo e prazo de projeto novo. A parte boa: templates abandonados não precisam migrar, então um inventário honesto reduz o escopo real.

## O custo de licença aumenta ao trocar Pardot por Marketing Cloud?

Sim, e de forma relevante: MCE é produto enterprise com precificação diferente, e projetos que tratam a mudança como "upgrade" costumam descobrir no contrato final um aumento de 40 a 100% no custo anual. A justificativa pode ser válida — capacidade multicanal, escala B2C, personalização granular — mas esse número deveria estar no business case desde o início, não aparecer como surpresa na renovação.

A pergunta de qualificação antes de aceitar qualquer proposta: o caso de uso real é B2C ou multicanal em escala? Se o marketing continua orientado a pipeline B2B, a recomendação honesta é otimizar o MCAE em vez de pagar mais por uma plataforma construída pra outro perfil de uso.
