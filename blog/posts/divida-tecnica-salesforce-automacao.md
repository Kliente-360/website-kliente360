---
title: "Dívida técnica no Salesforce: a automação sobreposta é a conta"
slug: "divida-tecnica-salesforce-automacao"
pillar: "sf"
date: "2026-10-14"
readMinutes: 7
excerpt: "A dívida técnica no Salesforce mora menos no Apex e mais em automação sobreposta. Como achar, priorizar e pagar sem parar a operação nem refazer a org."
tldr: "Dívida técnica no Salesforce é o acúmulo de configuração, automação e código que funciona hoje mas encarece cada mudança de amanhã. Na prática, ela se concentra em automação sobreposta — Workflow Rules, Process Builder, Flows e Apex disparando no mesmo objeto sem ordem definida — e não em código mal escrito. A pesquisa de 2026 da Salesforce Ben aponta a dívida técnica como a tarefa mais difícil para 56,3% dos admins, e o fim do suporte a Workflow Rules e Process Builder em 31/12/2025 tirou o prazo da mesa e deixou só o risco. Pagar a dívida é um trabalho de inventário, priorização por risco e migração em ondas, não um projeto de reescrita."
keywords: ["dívida técnica Salesforce", "Workflow Rules Process Builder fim de suporte", "migrar para Flow", "limpeza de org Salesforce", "automação Salesforce", "Salesforce Flow"]
---

**Dívida técnica no Salesforce** quase nunca aparece como um problema de código. Aparece como uma frase repetida no comitê: "mexer nisso é arriscado". Um campo obrigatório novo quebra uma integração que ninguém lembrava existir. Uma mudança de fase da oportunidade dispara três automações, duas delas de 2019. O admin que sabia como tudo funcionava saiu, e a org passou a ser administrada por tentativa e erro.

A pesquisa de 2026 da [Salesforce Ben com mais de 1.100 admins](https://www.salesforceben.com/top-10-insights-from-sf-bens-mega-2026-salesforce-admin-survey/) mostra que isso não é exceção: 56,3% apontam a dívida técnica como a responsabilidade mais difícil do cargo, cerca de 31% classificam a própria dívida como alta ou muito alta, e só 2% descrevem a org como limpa e bem mantida. O que a pesquisa não diz, e nossa experiência em projetos diz, é onde essa dívida costuma estar.

## Onde a dívida de verdade se acumula

A imagem popular da dívida técnica é um Apex mal escrito. Existe, mas é a parte menor. Nas orgs que revisamos, a maior parte do custo vem de **automação sobreposta**: várias camadas de lógica reagindo ao mesmo evento no mesmo objeto, sem ninguém responsável pela ordem em que elas rodam.

A anatomia é conhecida. Uma Workflow Rule criada em 2016 atualiza um campo. Um Process Builder de 2019 lê esse campo e cria uma tarefa. Um Flow de 2023 faz uma checagem parecida porque quem o construiu não sabia do processo. Um trigger de Apex, de um parceiro anterior, recalcula o campo depois de tudo. Cada peça faz sentido isolada. Juntas, produzem um comportamento que só se prevê rodando, e cada alteração vira uma aposta.

Três sinais indicam que a sua org já está nesse ponto:

1. **Ninguém consegue dizer o que acontece ao salvar uma oportunidade.** Se a resposta exige abrir cinco telas de Setup, a ordem de execução é conhecimento tribal.
2. **Erros intermitentes de limite** (CPU, muitas consultas, atualização em loop) que somem quando se tenta reproduzir. São o efeito de várias automações somando custo na mesma transação.
3. **Mudanças pequenas levam semanas.** O gasto está no teste de regressão manual, porque ninguém confia em prever o impacto.

> Dívida técnica é o custo de cada mudança futura. Código feio sem ninguém tocando nele não custa nada; automação sobreposta em um objeto central custa toda semana.

## O que mudou: o prazo virou risco

A Salesforce anunciou o fim de suporte a **Workflow Rules e Process Builder em 31 de dezembro de 2025**. Isso não desligou nada: as automações existentes continuam rodando. O que acabou foi a correção de bugs e o atendimento de casos de suporte sobre essas ferramentas. O desenvolvimento de automação declarativa da plataforma está concentrado no Flow.

Para quem adiava a migração esperando o prazo, o efeito prático é desconfortável: o prazo passou, nada quebrou, e a dívida continua lá, agora sem rede de segurança. É o tipo de risco que não dispara alarme. Ele aparece no dia em que um comportamento inesperado cai em uma ferramenta sem suporte, justamente em um objeto crítico.

O Winter '27 também mexeu no mesmo terreno. Segundo a cobertura da comunidade, a release traz melhorias de gestão de Flows, como filtro de recursos não usados no Flow Manager, e entra com [Agentforce ligado por padrão](/blog/agentforce-ligado-por-padrao-winter-27.html). Esse segundo ponto importa para a dívida: um agente que lê e age sobre uma org com automação sobreposta herda toda a imprevisibilidade dela. Limpar antes é mais barato que depurar depois.

## Como pagar sem parar a operação

Projeto de reescrita total costuma falhar: demora, congela o roadmap e entrega uma org nova com os mesmos vícios em dois anos. O que funciona é trabalhar em ondas curtas, com critério de risco. A sequência que usamos cabe em seis passos:

1. **Inventarie tudo que dispara por objeto.** Para cada objeto central (Lead, Conta, Oportunidade, Caso), liste Workflow Rules, Process Builders, Flows, triggers e validações ativos. Em Setup, ordenar a lista de Workflow Rules e Process Builder pela coluna de ativos já mostra o tamanho do problema.
2. **Marque o que está ativo mas morto.** Automações que não executam há meses, Flows inativos e versões antigas acumuladas. Desativar é reversível; apagar vem depois de um período de observação.
3. **Priorize por risco, não por idade.** O critério é: quanto custa errar neste objeto e quantas camadas se sobrepõem nele. Oportunidade com quatro camadas vem antes de um objeto de baixo uso com uma regra velha.
4. **Migre por objeto, consolidando.** O objetivo não é traduzir regra por regra, é chegar a um fluxo claro por objeto e por momento (antes de salvar, depois de salvar). A ferramenta Migrate to Flow ajuda nos casos simples, mas em automações complexas tende a gerar fluxos parciais que exigem ajuste manual e teste cuidadoso.
5. **Teste em sandbox com dados que se parecem com produção.** Aqui a disciplina de [sandbox strategy](/blog/sandbox-strategy.html) decide se a migração é segura ou uma aposta com data marcada.
6. **Documente a ordem de execução e nomeie um dono.** Sem o último passo, a dívida volta a crescer em 12 a 18 meses, e esse prazo é uma estimativa nossa a partir dos projetos que acompanhamos.

## Flow ou Apex: a escolha que evita a próxima dívida

Migrar para Flow não resolve a dívida se o Flow for construído como as ferramentas antigas: um por requisito, sem dono, sem convenção. Orgs com centenas de Flows inativos e nomes como "Teste_2" são a mesma dívida em formato novo. A regra de [quando código vale mais que clique](/blog/flow-vs-apex.html) continua valendo: lógica com muitas ramificações, alto volume ou necessidade de teste automatizado pertence ao Apex, e o que é simples e visível para o negócio pertence ao Flow.

Antes de decidir a ferramenta, convém voltar à origem do problema. Muita automação sobreposta nasce de processo mal definido, e [mapear o processo antes de configurar](/blog/mapear-processos-antes-do-salesforce.html) evita construir três soluções para a mesma pergunta. Duas convenções baratas já reduzem boa parte da dívida futura: nomear Flows por objeto, momento e propósito, e exigir descrição preenchida antes de ativar.

## Quanto custa e quando vale

A pergunta da diretoria é sempre quanto custa. Não existe número universal, mas o raciocínio é simples: a dívida se paga em horas de mudança. Se uma alteração rotineira em Oportunidade leva duas semanas por causa de regressão manual e deveria levar três dias, a diferença multiplicada pelo número de mudanças do ano é o custo da dívida, e é esse número que compara com o custo da limpeza. Em projetos médios, uma limpeza concentrada em dois ou três objetos críticos costuma caber em algumas semanas, uma estimativa nossa, e não em meses.

Vale pagar antes de qualquer iniciativa grande sobre a org: um novo módulo, uma integração com o ERP, um agente de IA. Construir em cima de dívida é o caminho mais caro de todos.

## Perguntas que sempre voltam

As dúvidas mais frequentes de quem decide o que fazer com Workflow Rules, Process Builder e a automação acumulada da org.

## Workflow Rules e Process Builder pararam de funcionar?

Não. Segundo o que a Salesforce comunicou, as automações existentes continuam executando depois de 31 de dezembro de 2025. O que acabou foi o suporte: bugs não são corrigidos e casos de suporte sobre essas ferramentas não são atendidos. O risco é gerenciar uma automação crítica sem apoio do fornecedor, não uma interrupção imediata.

## Vale migrar tudo para Flow de uma vez?

Raramente. Migrar tudo de uma vez congela o roadmap e concentra o risco em um único corte. O caminho mais seguro é priorizar por objeto e por risco, consolidar a lógica em vez de traduzi-la regra por regra e migrar em ondas, testando cada uma em sandbox. Automação de baixo uso e sem sobreposição pode esperar sem prejuízo.

## Como medir se a dívida técnica diminuiu?

Meça o custo de mudança, não a contagem de componentes. Três indicadores bastam: tempo médio entre pedir e publicar uma alteração rotineira, número de erros de limite por mês em objetos críticos e percentual de automações com dono e descrição. Se os dois primeiros caem e o terceiro sobe, a dívida está diminuindo, mesmo que o total de Flows não mude.
