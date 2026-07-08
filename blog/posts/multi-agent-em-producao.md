---
title: "Multi-agent em produção: o que aprendemos rodando 5 agentes por 90 dias"
slug: "multi-agent-em-producao"
pillar: "ai"
date: "2026-05-05"
readMinutes: 9
excerpt: "Diário de campo de 90 dias com 5 agentes rodando em produção. O que funcionou, o que quebrou, e o custo real de manter sistema multi-agent vivo."
tldr: "Multi-agent é vendido como arquitetura inevitável. Na operação real, é frágil, caro e exige musculação organizacional que ninguém antecipa. Cinco agentes rodando juntos por 90 dias nos ensinaram que coordenação, observabilidade e definição rigorosa de domínio são mais críticas que escolha de framework. Esse texto é o diário, com os erros nominados."
keywords: ["multi-agent", "agentes de IA", "produção", "LLM", "orquestração de agentes"]
---

**E**m fevereiro de 2026, colocamos cinco agentes pra trabalhar juntos num caso de uso real — não piloto, não demo, produção com SLA. Em maio, completamos 90 dias dessa operação. Esse texto é o diário do que aprendemos. Não tem moral da história triunfal — tem o relato de erros nominados, decisões revertidas, e a fatura técnica que nenhum white-paper de framework menciona.

O cenário: empresa B2B usando os 5 agentes pra [fluxo de pré-venda assistido por IA generativa](/blog/ia-generativa-vendas.html). Um agente extrai contexto de e-mail recebido. Outro pesquisa a empresa do remetente em fontes externas. Outro classifica intenção. Outro propõe próxima ação. Outro escreve rascunho de resposta. Volume real: cerca de 3.000 interações/mês. Modelos usados: Claude Sonnet pros 4 primeiros, GPT-4o-mini pro último. Orquestração: framework próprio em Python (testamos LangGraph e CrewAI antes — voltamos pra solução custom).

## Semana 1 — A ilusão da independência

Começamos achando que cada agente seria um microserviço independente, comunicando por contratos JSON simples. O primeiro problema apareceu no dia 3: o agente de extração de contexto produzia output que o de classificação de intenção interpretava errado em ~15% dos casos. Não por bug — por diferença sutil entre o que um considerava "campo de assunto" e o outro considerava "tópico principal".

A lição: contratos de dados entre agentes não são triviais. Cada agente tem modelo mental próprio do mundo (vindo do prompt + treinamento + contexto da chamada). Quando dois agentes operam sobre o mesmo conceito sem definição rigorosa compartilhada, eles divergem silenciosamente. Esse problema não aparece em demo (volume pequeno, cherry-picking) — aparece em produção.

Solução adotada na semana 2: cada agente passou a emitir output em schema JSON estrito (Pydantic em Python), com validador explicito e fallback documentado. Custo: 30% mais tokens por chamada (output mais verboso). Benefício: erros silenciosos caíram de 15% pra <2%. Não eliminou — reduziu a ponto de virar gerenciável.

## Semana 3 — O custo escondido da coordenação

Quando você tem 5 agentes em série, a latência é a soma das latências. Quando tem em paralelo, a latência é a do mais lento. Nas duas configurações, custo é a soma dos custos. Isso é trivial no papel. Não é trivial quando o usuário final espera resposta em < 5s e o sistema demora 22s.

Investimos a semana 3 inteira em otimização: prefetch agressivo (agentes que podem rodar antes da requisição final), cache local com chave por hash do input, redução de prompt em 40% via embedding pré-computado de contexto fixo. Latência caiu pra 7s. Ainda alto. A solução real veio na semana 4 — repensar a arquitetura.

> Multi-agent em série é sequência de latências e sequência de custos. Cada agente novo multiplica os dois. Quem propõe sistema multi-agent sem considerar isso está vendendo arquitetura sem tocar a fatura.

## Semana 4 — O que matamos

Na semana 4, matamos um agente. O de "classificação de intenção" estava produzindo output que o agente seguinte (proposta de ação) consumia mas raramente usava de forma diferenciada. Era custo sem entrega de valor. Removemos o agente, inlinamos a função no agente de proposta de ação como instrução no prompt, e a precisão final do sistema subiu marginalmente. Reduzimos custo 22% e latência 4s.

Aprendizado caro: agentes especializados parecem certo na arquitetura (princípio da separação de responsabilidades), mas frequentemente são luxo organizacional. Em casos onde dois agentes contíguos têm mesma "perspectiva mental" (mesmo modelo, prompts similares, output de um entra direto no outro), funde-os. Cada agente extra é orçamento — só vale se a especialização realmente paga.

## Semana 6 — Observabilidade era o gargalo real

Em qualquer projeto sério, observabilidade entra no roadmap como "ah, depois". Aqui virou a coisa mais importante. Sem rastrear cada chamada (input, output, tempo, custo, modelo, decisão), nada do diagnóstico acima teria sido feito. Investimos em [evals e observabilidade](/blog/avaliacao-de-agentes.html) tanto quanto na lógica dos próprios agentes.

Em prática, decidimos investir em três camadas:

1. **Log estruturado em warehouse.** Cada chamada loga: timestamp, agente, modelo, input (truncado em 1000 chars), output (truncado), tokens IN/OUT, custo em US$, latência, decisão final. Sobre essa base sai dashboard de [custo real de inferência](/blog/custos-reais-de-inferencia.html) por agente.
2. **Tracing distribuído.** OpenTelemetry com cada chamada de agente sendo um span. Dá pra ver onde o tempo foi gasto. Sem isso, otimização vira chute.
3. **Eval set por agente.** 50–80 casos com gabarito. Roda em cada release. Sem isso, mudar prompt vira loteria.

Sem essas três camadas, o sistema teria parado de funcionar bem em algum momento entre as semanas 5 e 7 e ninguém saberia exatamente por quê. Com elas, conseguimos diagnosticar regressão dentro de 1 dia.

## Semana 8 — O problema cultural

A surpresa de meio do projeto: o gargalo não era técnico. Era cultural. Os usuários internos (vendedores) começaram a confiar demais no rascunho gerado pelo último agente. Começaram a aprovar resposta sem ler. Em ~6% dos casos, isso gerou e-mail enviado com fato errado (alucinação não detectada, ou contexto extraído incorretamente da etapa 1).

A solução não foi melhorar o agente — foi mudar a UI. Mudamos pra exibir o rascunho com cinco campos marcados em amarelo (entidades extraídas — nome, empresa, valor, data, ação proposta) que o vendedor tinha que confirmar individualmente antes de aprovar. Latência humana subiu (de 10s pra 45s pra revisar e aprovar), mas erros caíram pra <1%.

A lição mais cara: agentes em produção mudam comportamento humano. Antes de medir a métrica do agente, precisa medir a métrica do usuário usando o agente. Sistemas multi-agent que parecem ótimos no benchmark interno falham porque mudam o que humano faz com o output.

## Semana 12 — A conta total

Aos 90 dias, o custo total da operação:

| Item | US$/mês |
|---|---|
| Inferência (5 agentes × 3.000 interações × 5 chamadas/interação) | ~2.400 |
| Infraestrutura (gateway, orquestração, observabilidade) | ~600 |
| Sustentação técnica (1 engenheiro 30% do tempo) | ~3.500 |
| Governança (revisão semanal de evals, calibração) | ~1.200 |
| **Total** | **~7.700** |

Esse número não cabia no orçamento inicial. Cabia ROI mensal estimado (US$ ~12k em horas economizadas + deals melhor priorizados), então fechou a equação. Mas o orçamento inicial de "uns US$ 3k/mês de inferência" estava errado por mais de 2× — sustentação e governança são as linhas que ninguém antecipa.

## O que faríamos diferente

Se voltássemos pra semana 1 com o conhecimento de 90 dias, fariam-se 5 coisas diferente.

**Começaríamos com menos agentes.** 3 em vez de 5. Cada agente extra custa coordenação. Comece minimal, adicione só quando o caso de uso provar que sem o agente extra não dá.

**Schema estrito desde o dia zero.** Pydantic + validador entre cada agente, output em JSON com schema versionado. Custos 30% mais tokens, evita 80% dos bugs.

**Observabilidade antes da lógica.** Log estruturado, tracing e eval set devem existir antes do primeiro agente subir pra produção. Construir agente sem isso é construir sistema cego.

**Investir na UI tanto quanto no agente.** Resposta gerada por agente precisa de UI que force revisão humana. Sem isso, [a tese de "quando agente é resposta" se inverte](/blog/quando-agente-e-resposta.html) — o agente passa a ser problema mascarado.

**Orçar 3× o custo inicial estimado.** Inferência é parte. Sustentação, governança, observabilidade e custos de cloud somam o resto. Apresentar a conta cheia desde o dia 1 é o que evita renegociação amarga no mês 6.

## A pergunta que destrava

Multi-agent funciona. Mas funciona caro, com fragilidade real, e exigindo time com músculo de operação contínua. Antes de propor sistema multi-agent a um cliente, a pergunta que destrava a decisão é: você tem time que vai cuidar disso por 12 meses sem reclamar? Se a resposta é não, a recomendação honesta é simplificar — talvez um agente único bem desenhado entregue 70% do valor com 30% da complexidade.

Casos onde multi-agent compensa: volume alto (> 5.000 interações/mês), valor por interação alto (cada erro é caro), e existência de equipe técnica dedicada. Fora disso, é arquitetura de paper — bonita, citável e cara de manter.

90 dias depois, mantemos os 4 agentes restantes em produção, com custo previsível e métricas confiáveis. Mas a versão honesta da história não é "deu certo" — é "deu certo depois de revisar arquitetura 3 vezes, matar 1 agente, e investir em observabilidade que ninguém vendeu como prioridade". Esse é o jeito real de sistemas multi-agent vingarem.

## Perguntas que sempre voltam

Três perguntas que todo mundo faz depois de ler esse diário — com as respostas que os 90 dias deram.

## Quanto custa manter um sistema multi-agent em produção?

No nosso caso, cerca de US$ 7.700 por mês — mais que o dobro do orçamento inicial de "uns US$ 3k de inferência". Inferência foi só ~US$ 2.400; o resto veio de infraestrutura (~600), sustentação técnica com um engenheiro a 30% do tempo (~3.500) e governança de evals (~1.200). Sustentação e governança são as linhas que ninguém antecipa.

A regra prática que ficou: orce 3× o custo inicial estimado. Apresentar a conta cheia desde o dia 1 é o que evita renegociação amarga no mês 6 — no nosso caso, a equação só fechou porque o ROI mensal estimado (~US$ 12k) cobria o total.

## Quantos agentes fazem sentido pra começar?

Menos do que você acha — se voltássemos pra semana 1, começaríamos com 3 em vez de 5. Cada agente extra é orçamento de coordenação: soma latência, soma custo e cria mais um contrato de dados pra falhar silenciosamente. Na semana 4, matamos um agente cujo output raramente era usado, e o sistema ficou 22% mais barato, 4s mais rápido e marginalmente mais preciso.

O critério pra fundir: quando dois agentes contíguos têm a mesma "perspectiva mental" — mesmo modelo, prompts similares, output de um entrando direto no outro —, a especialização é luxo, não arquitetura. Comece minimal e adicione agente só quando o caso de uso provar que sem ele não dá.

## Vale a pena multi-agent pra minha empresa?

Vale se você tem volume alto (mais de 5.000 interações/mês), valor alto por interação e time técnico dedicado que vai cuidar do sistema por 12 meses sem reclamar. Fora dessas três condições, é arquitetura de paper — bonita, citável e cara de manter.

Se a resposta pra alguma delas é não, a recomendação honesta é simplificar: um agente único bem desenhado tende a entregar 70% do valor com 30% da complexidade. Multi-agent funciona — mas funciona caro, com fragilidade real, exigindo observabilidade e músculo de operação contínua que nenhum white-paper de framework menciona.
