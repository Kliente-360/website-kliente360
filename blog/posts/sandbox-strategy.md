---
title: "Sandbox strategy: como evitar \"a última sandbox foi há 4 meses\""
slug: "sandbox-strategy"
pillar: "sf"
date: "2026-03-25"
readMinutes: 6
excerpt: "Sandbox no Salesforce é grátis — em licença. Caro em disciplina. Empresa que não trata sandbox como produto entrega bug em produção e descobre que ninguém atualiza ambiente há meses."
tldr: "Sandbox no Salesforce não é só ambiente de teste — é o sistema operacional de qualquer rollout sério. Sem estratégia clara (quantas sandboxes, pra que cada uma, quem mantém atualizada), o time vai testar em produção sem saber. Quatro tipos de sandbox, três regras de operação, e o sinal de que a estratégia tá quebrada."
keywords: ["Salesforce", "sandbox", "DevOps", "ambiente de teste", "Salesforce DX"]
---

A pergunta que toda equipe de Salesforce evita responder com sinceridade: *quando foi a última vez que a sandbox foi atualizada com dado de produção?* Resposta típica: "uns 4 meses, talvez 6". Tradução prática: ninguém está testando em ambiente que reflete a realidade. Bugs vão pra produção, são descobertos por usuários, time apaga incêndio. A diretoria pergunta o que aconteceu e a resposta técnica é "passou no QA na sandbox". Verdade incompleta — passou na sandbox que estava 6 meses atrás da produção.

Esse texto é sobre estratégia de sandbox no Salesforce. Não é tutorial de tipos — é decisão arquitetural que separa empresa que entrega com previsibilidade de empresa que vive em modo apaga-fogo.

## Os quatro tipos e onde cada um faz sentido

Salesforce oferece quatro tipos de sandbox, com diferenças que muita gente esquece sob pressão de prazo.

**Developer Sandbox.** Só metadata (sem dado), 200MB. Ideal pra dev individual fazendo desenvolvimento isolado. Refresh frequente (toda semana). Custo: zero, incluído nas licenças.

**Developer Pro Sandbox.** Metadata + 1GB de dado. Bom pra teste de unidade funcional com dado mínimo. Mesmo perfil de uso que Developer, com mais espaço.

**Partial Copy Sandbox.** Metadata + amostra de dado (subset configurável). Refresh a cada 5 dias. Ideal pra UAT (user acceptance test) com dado representativo. É onde a maioria dos projetos médios deveria viver — equilíbrio entre realismo e custo de manutenção.

**Full Sandbox.** Cópia completa da produção (metadata + dado integral). Refresh a cada 29 dias. Único ambiente que reflete produção fielmente. Caro em licença, mas indispensável pra teste de carga, regressão completa, treinamento que precisa de cenário real.

Cada projeto sério usa pelo menos três desses. Quem usa só Developer Sandbox economiza licença e descobre os bugs em produção.

## A estratégia que funciona em empresa de médio porte

A configuração que vejo dar certo na maioria dos clientes Salesforce de médio porte:

**Pilha de Developer Sandbox por desenvolvedor.** Um por dev, refresh sob demanda. Dev faz suas alterações isoladas, não trava ninguém.

**Uma Partial Copy de integração contínua.** Recebe merge de todos os Developer Sandboxes via Git/Salesforce DX. Onde se testa interação entre features. Refresh a cada 5 dias com amostra realista.

**Uma Full Sandbox de UAT/staging.** Espelha produção. Onde o cliente testa antes de aprovar deploy. Refresh a cada 29 dias.

**Produção.** Onde o usuário trabalha.

Esse pipeline cobre 95% das necessidades. Empresa que mistura tudo numa única sandbox compartilhada tem dev pisando na alteração do colega, UAT com dado desatualizado, e bug em produção como rotina.

> Sandbox no Salesforce não é detalhe operacional. É o sistema operacional do rollout. Empresa que não tem estratégia clara opera no escuro — e descobre isso quando o usuário reporta o bug em produção.

## As três regras que separam pipeline saudável de teatro

Ter os tipos certos não é suficiente. Três disciplinas operacionais.

1. **Cadência de refresh planejada e respeitada.** Partial Copy refresh quinta-feira de manhã, semana sim semana não. Full Sandbox refresh primeiro domingo do mês. Calendarizada, anunciada, com janela de manutenção definida. Sem cadência, refresh acontece quando alguém lembra — geralmente tarde demais.
2. **Donos nominais por sandbox.** Cada sandbox tem um responsável humano. Quando degrada (dado fica velho, metadata diverge, integração para de funcionar), tem nome pra cobrar. "Time inteiro responsável" = ninguém responsável.
3. **Política de uso por sandbox.** Quem pode mexer no quê. Developer Sandbox = dev livre. Partial Copy = só CI/CD ou mudança aprovada. Full Sandbox = só UAT, sem dev raw. Sem essa política, qualquer um sobrescreve o trabalho do outro e a confiabilidade do ambiente desce a zero.

Esses três combinados separam pipeline que entrega previsível de pipeline que vive em modo emergência.

## Os sintomas de estratégia quebrada

Antes da catástrofe completa, três sinais que a estratégia está moribunda:

**Sinal 1: dev pede acesso a produção pra "testar uma coisa rápida".** Quando isso vira recorrente, a sandbox não é mais útil. Dev sabe que não reflete realidade, então pula. Investigar isso é diagnóstico do pipeline.

**Sinal 2: refresh da Full Sandbox é evento traumático.** Vira projeto de uma semana, com prep, plano, escalação. Sinal de que está sendo feito raramente, e tudo acumulou. Refresh saudável é evento de 4–6 horas, automatizado, ninguém perde sono.

**Sinal 3: time não sabe onde testar mudança específica.** "Faz isso na sandbox X". "Não, faz na Y". "Espera, a Z é a atualizada?". Confusão sobre qual sandbox usar = falta de estratégia clara. Resolve documentando, não improvisando.

## Como integrar sandbox com governança de mudança

Sandbox é só uma peça. O resto da governança importa igual:

**Git como fonte da verdade.** Metadata vive em Git, não nas sandboxes. Sandboxes refletem o estado do Git. [Como em qualquer projeto Salesforce sério](/blog/sales-cloud-cinco-antipadroes.html), versionamento é base.

**CI/CD com deploy entre sandboxes.** Push pra branch deploya na Partial Copy. Merge pra main deploya na Full Sandbox. Aprovação manual final pra produção. Pipeline automatizado evita o "esquemão na unha".

**Scratch Orgs pra exploração isolada.** Quando dev precisa explorar mudança radical sem afetar ninguém, Scratch Org (parte do Salesforce DX) é mais barato que sandbox dedicada. Vida útil curta, criação em minutos.

**Política clara de Flow vs Apex.** Aplicada em sandbox antes de virar regra em produção. [A escolha entre Flow e Apex](/blog/flow-vs-apex.html) testa primeiro em ambiente realista.

## A decisão pra 2026

Se sua organização Salesforce tem sintomas de estratégia quebrada — bug recorrente em produção, refresh atrasado, time inseguro sobre onde testar — três movimentos práticos:

**Defina a pilha de sandbox formalmente.** Quantas, de que tipo, com que dono, com que cadência de refresh. Documento de 2 páginas, aprovado por sponsor de TI + arquiteto Salesforce.

**Implemente Salesforce DX se ainda não tem.** Git como fonte da verdade, CI/CD entre sandboxes, Scratch Orgs pra exploração. É padrão moderno e elimina 70% do caos operacional.

**Auditoria semestral.** A cada 6 meses, time olha: sandboxes ativas, dono nominal, último refresh, uso real. Aposenta as obsoletas (cada uma custa licença), reorganiza as ativas. Sem essa rotina, vira cemitério.

A sandbox no Salesforce é o ambiente onde você tem direito a errar. Empresa que opera bem na sandbox entrega com previsibilidade. Empresa que opera mal — ou pula sandbox por pressa — descobre o erro no primeiro lugar onde não tem direito: produção. A diferença entre os dois mundos é estratégia, não talento técnico.
