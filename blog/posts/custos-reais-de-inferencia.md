---
title: "Custos reais de inferência: como evitar surpresa de US$ no fim do mês"
slug: "custos-reais-de-inferencia"
pillar: "ai"
date: "2026-03-24"
readMinutes: 6
excerpt: "POC de LLM custou US$ 200 no mês. Produção chegou em US$ 18.000 no terceiro mês. A diferença raramente é volume — é arquitetura que ninguém calibrou."
tldr: "Custo de inferência LLM em produção é difícil de prever pela natureza variável do consumo. Mas é evitável: cinco padrões controlam 80% do gasto — tamanho do contexto, escolha de modelo, caching, batching e protocolo de retry. Sem eles, fatura no terceiro mês explica reunião difícil."
keywords: ["custos de inferência", "LLM", "OpenAI", "Anthropic", "FinOps de IA"]
---

A história que se repete no fim do trimestre em qualquer empresa que botou LLM em produção: time celebrou POC bem-sucedido em janeiro, decidiu rolar pra geral em fevereiro, recebeu primeira fatura de produção em março. POC tinha custado US$ 200/mês. Produção fechou em US$ 18.000. A diretoria pergunta como, e a resposta técnica honesta é "ninguém calculou de verdade". O cálculo não foi feito porque parecia trivial — *é só multiplicar tokens por preço*. Mas o que ninguém viu no POC vira fatura no terceiro mês.

Esse texto é sobre os cinco padrões que controlam a maior parte do custo de inferência em produção. Não é técnico-baixo-nível — é o que separa projeto que escala economicamente de projeto que vira slide de "lições aprendidas".

## Por que o cálculo do POC engana

POC roda em volume baixo, com prompts controlados, em casos cuidadosamente escolhidos. Produção roda em volume real, com prompts gerados dinamicamente, em casos que ninguém previu. Cinco coisas diferentes acontecem ao escalar:

- **Contexto cresce.** No POC, prompt tinha 500 tokens. Em produção, alguém adicionou histórico, RAG, instruções de segurança. Vira 3.500 tokens.
- **Casos ruins aparecem.** No POC, o agente entrega em 1 round. Em produção, casos difíceis fazem o agente retry 3–5 vezes. Custo multiplica.
- **Casos longos aparecem.** No POC, resposta tinha 300 tokens. Em produção, usuários puxam conversa, resposta vira 1.500.
- **Falhas viram custos.** Erro de parse, alucinação detectada, retry automático. Cada falha custa tokens completos.
- **Volume varia.** Pico de segunda-feira gera 10× o tráfego médio. Modelo escolhido pra "média" engasga e custa mais por requisição.

O cálculo honesto de produção precisa multiplicar o número do POC por 5–10× — não 1.5×. Quem orça com 1.5× descobre o resto na fatura.

> A diferença entre POC e produção em custo de LLM não é volume — é tudo o que o POC esconde: contexto inflado, retries, falhas, casos não previstos. O multiplicador realista é 5–10×.

## Os cinco padrões que controlam o gasto

Os controles que separam projeto que escala economicamente de projeto que sangra. Não exigem ferramenta nova — exigem disciplina arquitetural desde o início.

1. **Tamanho do contexto sob régua dura.** Cada token de input custa. Sistema sério calibra: contexto fixo (system prompt) ≤ 500 tokens, contexto dinâmico (RAG, histórico) ≤ 2.000 tokens, com truncamento explícito. Sem truncamento, o contexto cresce até o limite do modelo, e fatura também.
2. **Escolha de modelo por caso de uso, não global.** Usar GPT-4o ou Claude Sonnet pra classificar intent é desperdício. Pra geração de resposta complexa, vale. Pra summarização curta, modelo médio (Haiku, GPT-4o mini) entrega 90% da qualidade por 10% do preço. Sistema que usa o mesmo modelo pra tudo paga 5–10× mais que sistema com routing.
3. **Caching agressivo onde aplicável.** Prompt cache (Anthropic, OpenAI) reduz custo de input em 90% pra contexto repetido. RAG cacheado pra perguntas frequentes elimina o LLM call inteiro. Implementar caching antes de produção é trabalho de 2 semanas que paga 50% da fatura.
4. **Batching em workflows assíncronos.** Batch API (Anthropic, OpenAI) cobra metade do preço. Workflows que não exigem tempo real (relatório noturno, classificação de fila, summarization de logs) deveriam usar batch — economia automática de 50%. Quase ninguém usa porque "esquece de implementar".
5. **Protocolo de retry inteligente.** Retry cego em falha duplica custo. Retry inteligente (só em falha transient, com backoff, com limite de tentativas) controla. Combinado com [eval rigoroso de qualidade pra detectar quando retry vale](/blog/avaliacao-de-agentes.html), separa custo controlado de fatura explodindo silenciosamente.

Esses cinco padrões implementados de forma disciplinada controlam 80% do custo. Sem eles, qualquer escolha de modelo "barato" vira caro no agregado.

## A relação custo × qualidade que ninguém calcula

A discussão de custo de LLM costuma terminar em "vamos trocar pro modelo mais barato". Decisão errada em 70% dos casos. [Incorporar comportamento via fine-tuning em vez de injetar contexto via RAG](/blog/quando-fine-tuning-supera-rag.html) é outra alavanca que reduz custo por interação sem trocar de provider — prompt menor mais comportamento treinado substituem instrução longa repetida em cada chamada. O cálculo certo é custo *por interação resolvida com sucesso*, não custo por token.

Modelo barato com acurácia de 60% custa mais que modelo caro com acurácia de 90% — porque o usuário volta, refaz, escala pra humano. Custo total (LLM + tempo humano + retrabalho) supera o que parecia economia.

[Como argumentei sobre fine-tuning vs RAG vs prompt](/blog/fine-tuning-vs-rag-vs-prompt.html), a métrica que importa é total cost of ownership do caso de uso. Não preço por milhão de tokens.

## O que medir desde o dia 1

Quatro métricas que dizem se você está no controle do custo. Se não estiver medindo, está perdendo dinheiro sem saber.

**Custo por interação completa.** Não custo por chamada — custo por interação ponta-a-ponta, incluindo retries, fallbacks, escalonamentos. É a unidade econômica real.

**Distribuição de tamanho de contexto.** Histograma. Se 10% dos casos consomem 50% do custo (contexto longo), é onde investir em truncamento ou routing.

**Razão custo / valor entregue.** Em RAG: custo por pergunta respondida corretamente. Em agente: custo por resolução. Em geração: custo por documento aprovado. Sem essa métrica, otimização vira intuição.

**Drift de custo por release.** Toda mudança de prompt ou modelo afeta custo. Sistema sério mede e alerta quando custo unitário sobe 20% sem motivo declarado. Sem isso, custo erode silenciosamente.

## A armadilha do "modelo mais novo é melhor"

Setembro de cada ano vendor lança modelo novo, mais capaz e — frequentemente — mais caro por token. Tentação é migrar. Antes, calcule:

**O caso de uso precisa da capacidade nova?** Geração de texto técnico pode precisar. Classificação simples não. Não trocar de modelo só porque é o mais novo.

**O preço por interação vai subir ou descer?** Modelo novo pode ser mais inteligente (menos retries, menos contexto) e portanto mais barato no agregado, mesmo com preço por token mais alto. Calcular antes de migrar.

**O modelo antigo continua disponível?** Modelos são deprecated em 12–18 meses. Migração forçada vira projeto, não opção. Planejar antes.

## A decisão pra 2026

Se você está numa empresa que tem LLM em produção, três movimentos práticos:

**Calcular o custo unitário real, não fatura agregada.** Custo por interação resolvida ou produto entregue. Sem isso, qualquer otimização vira tentativa às cegas.

**Implementar os cinco padrões antes de escalar.** Truncamento de contexto, routing por caso de uso, caching, batching onde aplicável, retry inteligente. 2–4 semanas de trabalho que economizam 50–70% da fatura.

**Trazer FinOps pro stack de IA.** Como já existe FinOps pra cloud, IA precisa do equivalente. Dashboards, alertas, ciclos de revisão. Sem isso, a fatura conta a história depois — sempre tarde demais pra prevenir o impacto desse trimestre. Quando o volume cresce e múltiplos times consomem inferência, [o problema vira alocação de custo entre times — FinOps de IA como disciplina de governança](/blog/finops-de-ia.html).

Custo de LLM em 2026 é controlável. Quem cresce com IA e mantém economics saudável não tem modelo secreto — tem disciplina de cinco padrões. Quem não tem essa disciplina vê o piloto bem-sucedido virar fatura inviável no terceiro mês de produção. A diferença não está no LLM. Está no controle em volta dele.

## Perguntas que sempre voltam

Três dúvidas que aparecem em quase toda conversa sobre custo de LLM em produção.

## Quanto devo orçar pra produção a partir do custo do POC?

Multiplique o número do POC por 5–10× — não por 1.5×. O POC roda em volume baixo, com prompts controlados e casos escolhidos a dedo; produção traz contexto que cresce de 500 pra 3.500 tokens, casos difíceis com 3–5 retries, conversas longas, falhas que custam tokens completos e picos de 10× o tráfego médio.

Quem orça com 1.5× não está errando por descuido — está usando a conta que parecia trivial ("multiplicar tokens por preço") e descobrindo o resto na fatura. O multiplicador de 5–10× não é pessimismo: é o que o POC esconde por desenho.

## Trocar pro modelo mais barato resolve o custo?

Na maioria das vezes, não — é a decisão errada em 70% dos casos. Modelo barato com 60% de acurácia sai mais caro que modelo caro com 90%, porque o usuário volta, refaz e escala pra humano: o custo total (LLM + tempo humano + retrabalho) supera a economia aparente. A métrica certa é custo por interação resolvida com sucesso, não preço por milhão de tokens.

O que funciona é routing por caso de uso: modelo médio pra classificação e summarização curta (90% da qualidade por 10% do preço), modelo caro só onde a geração complexa exige. Sistema que usa o mesmo modelo pra tudo paga 5–10× mais que sistema com routing.

## Quanto tempo leva pra implementar os controles de custo?

Duas a quatro semanas de trabalho — que economizam 50–70% da fatura. São os cinco padrões: truncamento de contexto, routing por caso de uso, caching, batching onde aplicável e retry inteligente. Nenhum exige ferramenta nova; exigem disciplina arquitetural desde o início.

Se precisar priorizar, caching e batching têm o retorno mais direto: prompt cache reduz custo de input em 90% pra contexto repetido (implementar é trabalho de ~2 semanas que paga 50% da fatura), e Batch API cobra metade do preço em workflow que não exige tempo real — economia que quase ninguém captura porque "esquece de implementar".
