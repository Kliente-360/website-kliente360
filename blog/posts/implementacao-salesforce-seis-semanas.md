---
title: "Salesforce em 6 semanas: o que cabe de verdade num MVP"
slug: "implementacao-salesforce-seis-semanas"
pillar: "sf"
date: "2026-06-02"
readMinutes: 6
excerpt: "Seis semanas é o mínimo honesto para um MVP de Salesforce funcional. O que cabe, o que não cabe, e como validar escopo antes de assinar."
tldr: "Implementação de Salesforce em 6 semanas é possível — com escopo honesto. O que cabe num MVP real: Sales Cloud com processo comercial mapeado, pipeline configurado, relatórios básicos e adoção estruturada. O que não cabe: integrações com ERP, Flows complexos, múltiplos Clouds, customizações pesadas de objeto. Propostas de '14 dias' entregam configuração, não implementação."
keywords: ["implementação Salesforce", "Salesforce MVP", "Sales Cloud", "projeto Salesforce", "prazo CRM"]
---

Toda proposta de "Salesforce em 14 dias" é real em algum sentido — e enganosa no sentido que importa. O que entrega em 14 dias é uma org configurada, não uma implementação. A diferença é a mesma que separa planilha de processo comercial: uma tem visual, a outra tem lógica.

Seis semanas é o mínimo honesto para um MVP de Salesforce que sirva de base real de operação. Mais que isso pode ser necessário dependendo do escopo. Menos que isso é configuração com prazo de validade de 90 dias.

## O que "14 dias" entrega de fato

"Implementação express" em duas semanas geralmente entrega: criação de org, configuração dos objetos padrão (Account, Contact, Opportunity), importação de leads de planilha, um ou dois dashboards básicos e acesso de usuário. É uma instalação guiada, não uma implementação.

O que ela não entrega: processo comercial mapeado nos estágios do Salesforce, validação de campos por etapa de funil, automação básica testada, integração de e-mail coletada em atividade, relatório que o gerente vai usar em reunião semanal, rollout com adoção real. Esses elementos levam tempo — não porque a ferramenta é complicada, mas porque dependem de decisão humana sobre processo.

A promessa de 14 dias faz sentido quando o cliente já sabe exatamente o que quer, tem dados limpos para migrar e não precisa de nada além do padrão. Esse cliente existe. Mas não é a maioria. Para quem ainda está definindo processo, 14 dias entrega ferramenta sem uso — e em 90 dias a org está em estado de abandono.

## O que cabe em 6 semanas

Um MVP de Salesforce honesto em seis semanas pode entregar um conjunto bem definido:

1. **Processo comercial mapeado.** Estágios de Oportunidade refletindo o funil real da empresa — não o template padrão do Salesforce. Inclui critérios de entrada e saída por estágio, campos obrigatórios por fase e guia de qualificação inline.

2. **Pipeline configurado.** Sales Cloud com vista kanban funcionando, filtros por segmento, ordenação por data de fechamento e, principalmente, um relatório de funil que o gerente consegue ler em 5 minutos no início da semana. Um relatório que gera decisão, não que "tem lá".

3. **Atividades integradas.** E-mail conectado (Gmail ou Outlook via Einstein Activity Capture), log de chamadas se o time usa softphone e template de follow-up mínimo que o vendedor usa de fato — não o que ficou no slides do treinamento.

4. **Adoção estruturada.** Não treinamento — adoção. Duas sessões com o time, acompanhamento de uso nas primeiras duas semanas pós-go-live e, fundamental, o gerente usando o relatório do Salesforce na reunião semanal como instrumento de gestão oficial. Esse ponto é o que separa org que vira hábito de org que apodrece.

5. **Ciclo mínimo de sandbox.** Toda mudança vai para sandbox primeiro, validação com usuário-chave, depois para produção. [A estratégia de sandbox não é luxo de empresa grande](/blog/sandbox-strategy.html) — é o que evita que o projeto acorde meses depois com alterações sem controle e ninguém sabendo quem configurou o quê.

Esse escopo é específico por design. Cinco blocos claros. Se algum deles não está no contrato, o MVP vai depender de quem entrega fazer o certo voluntariamente — e isso é fragilidade de gestão, não parceria.

## O que NÃO cabe em 6 semanas

Tão importante quanto saber o que cabe é saber o que excluir — e comunicar isso antes de assinar.

Não cabe em seis semanas:

- **Integração com ERP.** Salesforce ↔ SAP, Totvs, Oracle ou qualquer ERP são projetos com contrato próprio. Tentativas de embutir integração num MVP de 6 semanas resultam em dados inconsistentes nas duas pontas e debug que consome o tempo de go-live.

- **Automação complexa de Flows.** Automação que dispara e-mail para cliente, gera documento de proposta ou move estágios automaticamente precisa de mapeamento de exceções e testes sob carga. Em MVP, automatize notificações internas; deixe automações externas para o próximo ciclo.

- **Múltiplos Clouds ao mesmo tempo.** Sales Cloud + Service Cloud + Marketing Cloud num sprint de 6 semanas não é MVP — é corrida. Cada Cloud tem sua curva de adoção e sua complexidade de configuração. Começar com Sales Cloud, estabilizar e expandir é o padrão que dura. O mesmo prazo comprimido aparece em [migração de Pardot para Marketing Cloud Engagement](/blog/migracao-pardot-marketing-cloud.html) — a proposta promete upgrade rápido, e o projeto real revela reimplementação completa.

- **Customização pesada de objetos.** Objetos customizados além de Account, Contact, Opportunity e Lead entram no MVP só se o processo não funciona sem eles. Em geral, [mapear o processo antes da configuração](/blog/mapear-processos-antes-do-salesforce.html) revela que o objeto padrão bem configurado resolve — e economiza de 2 a 4 semanas de projeto.

- **Reporting executivo sofisticado.** Dashboards de boardroom com cross-object, tendência histórica, cohort de conversão — isso vem na segunda onda, quando já há 60 ou mais dias de dados reais. Dashboard de MVP é tático, não estratégico.

> MVP não é versão ruim do produto. É a versão que entrega valor completo num escopo menor — e que sobrevive 90 dias de uso real sem precisar de remendo.

## Como validar se o escopo cabe em 6 semanas

Antes de assinar, passe o escopo por quatro perguntas:

1. **Quantos objetos customizados?** Acima de 2 objetos não-padrão no MVP, o prazo já corre risco real.

2. **Tem integração com sistema legado?** Toda integração que vai além de OAuth/API documentada da Salesforce (como Gmail e Outlook) multiplica o risco de prazo por fator mínimo de 2x.

3. **O processo comercial está mapeado antes do projeto?** Se a resposta for "vamos definir durante o projeto", o prazo de 6 semanas vai virar 12. Processo não documentado é a causa número um de estouro de prazo em implementação de CRM.

4. **Quantos usuários no go-live?** Acima de 30 usuários, o rollout de adoção precisa de orçamento e cronograma próprio — não pode ser uma sessão de treinamento no último dia do projeto.

Se mais de duas respostas forem "não" ou "acima do limite", o escopo honesto é 10 a 12 semanas. Não é problema assumir isso antes. É problema descobrir na semana 5.

## Os primeiros 14 dias do projeto de 6 semanas

Ironicamente, os 14 dias que a implementação express entrega como produto completo são os 14 dias de diagnóstico e mapeamento de um projeto de 6 semanas. São a fundação — não o resultado.

**Semanas 1–2 — Diagnóstico e mapeamento.** Levantar o processo comercial, mapear estágios, inventariar dados a migrar, definir campos obrigatórios, validar integração de e-mail. Esse trabalho é invisível para quem olha de fora. São conversas, workshops e documentos de processo. Nada aparece na tela do Salesforce ainda — mas é o que decide se o projeto vai para frente com saúde ou vira retrabalho em 60 dias.

**Semanas 3–4 — Configuração em sandbox.** Tudo que foi mapeado na fase 1 vai para a org de teste. Usuário-chave testa com dado real. Ajustes baseados em feedback de quem vai usar, não de quem contratou. Essa distinção importa.

**Semanas 5–6 — Go-live faseado e adoção.** Go-live com grupo piloto, treinamento de adoção (não tutorial), acompanhamento de uso. O gerente começa a cobrar o Salesforce na reunião semanal. O vendedor começa a ver que registrar no sistema economiza tempo, não adiciona.

[Os antipadrões que afundam projetos de Sales Cloud](/blog/sales-cloud-cinco-antipadroes.html) aparecem exatamente quando essa estrutura é comprimida por promessa de 14 dias — campos sem dono acumulando, automação sem teste em produção, adoção tratada como treinamento de último dia.

## Seis semanas como base, não como teto

A pergunta certa antes de contratar não é "qual o menor prazo possível?". É "qual o menor prazo para um MVP que vai durar 12 meses sem precisar ser refeito?".

Seis semanas entregam isso — se o escopo for honesto desde o início. A empresa que entra no projeto com expectativa calibrada, processo mapeado antes do projeto começar e gerente comprometido com adoção sai com org funcionando e base para crescer. A que entra esperando 14 dias porque a proposta prometeu 14 dias sai com org configurada que vai precisar ser reimplantada.

A diferença não está no Salesforce. Está no que cabe num projeto — e na disposição de dizer isso antes de assinar.
