---
title: "Salesforce Flow vs Apex: quando código vale mais que clique"
slug: "flow-vs-apex"
pillar: "sf"
date: "2026-03-04"
readMinutes: 6
excerpt: "Salesforce diz pra usar Flow sempre que possível. A regra é boa — até virar dogma e o time configurar Flow gigante onde 30 linhas de Apex resolveriam em metade do tempo."
tldr: "Flow venceu como ferramenta padrão de automação em Salesforce, e tem motivo. Mas \"low-code primeiro\" virou dogma que custa caro em casos específicos. Quatro padrões onde Apex ainda é a escolha certa, três armadilhas de Flow gigante que ninguém te conta no pitch."
keywords: ["Salesforce", "Flow", "Apex", "automação", "low-code"]
---

A diretriz oficial da Salesforce desde 2022 é simples: use Flow sempre que possível, Apex só quando não tiver jeito. Em tese, faz sentido — Flow é declarativo, mais fácil de manter, sobrevive a upgrade, qualquer admin entende. Mas em 2026, em quase todo cliente Salesforce maduro, vejo o mesmo padrão repetir: Flow gigante de 40 elementos tentando resolver problema que 30 linhas de Apex bem escritas resolveriam em metade do tempo, com metade da complexidade visual, e com governança melhor.

A diretriz "Flow primeiro" virou dogma. E dogma em arquitetura de Salesforce custa caro. Esse texto é sobre quando ela funciona, e os quatro padrões onde Apex continua sendo a escolha certa em 2026.

## Por que Flow venceu (e o ganho é real)

A vantagem que Flow trouxe é estrutural. Quatro coisas concretas:

- **Manutenção sem dependência de dev.** Admin sênior consegue ler, alterar e debugar Flow. Apex exige consultor com licença de developer ou contratação de fora.
- **Sobrevive a release.** Flow é declarativo, Salesforce migra automaticamente em upgrade. Apex precisa ser revalidado a cada major release, especialmente API version.
- **Test coverage automático.** Flow não exige 75% de coverage manual como Apex. Em projetos pequenos, isso economiza semanas.
- **Auditável visualmente.** Olhar Flow e entender o que faz é mais rápido que ler 200 linhas de Apex bem escrito (e infinitamente mais rápido que ler Apex mal escrito).

Esses quatro são reais. Em 60–70% dos casos de automação típica — atualizar campo quando outro muda, criar registro relacionado, enviar e-mail, validar dado — Flow é a escolha certa. Sem polêmica.

O problema começa nos outros 30–40%.

## Quatro padrões onde Apex ainda vence

Os contextos onde insistir em Flow custa mais do que admite o pitch.

1. **Lógica complexa com muitos caminhos condicionais.** Quando o processo tem 8–15 ramificações, cada uma com 3–5 ações condicionais, o Flow vira árvore visual gigante. 40+ elementos numa tela que ninguém entende. A mesma lógica em Apex cabe em 80–150 linhas legíveis. Manutenção fica mais fácil em código que em árvore visual além de certo tamanho.
2. **Operação em massa com performance crítica.** Flow é otimizado pra registros únicos ou poucos. Quando precisa processar 10k+ registros num batch, Apex com SOQL otimizado é 10–50× mais rápido — e cabe nos limites de governor sem hack. Tentar fazer batch grande em Flow é fonte número um de "Too many SOQL queries" no log.
3. **Integração com sistema externo via callout.** Flow tem HTTP callout, mas a interface é primitiva pra tratamento de erro, retry, parsing complexo, autenticação não-trivial. Apex com classes well-designed encapsula bem. Tentar fazer integração séria via Flow gera código não-código difícil de testar.
4. **Lógica que outros sistemas vão consumir.** Quando a lógica vai ser chamada por Sales Cloud, Service Cloud, Marketing Cloud e API externa — Apex com Invocable Methods é mais limpo. Cada chamador invoca o mesmo método, sem duplicação. Em Flow, a lógica acaba copiada em 3 fluxos diferentes que divergem com o tempo.

Esses quatro padrões cobrem maioria dos casos onde times caem na armadilha do "vamos fazer em Flow porque é a diretriz".

## Três armadilhas de Flow gigante

Quando Flow extrapola seu escopo natural, três problemas aparecem. Vale catalogar.

**Limites de governor invisíveis.** Flow conta SOQL, DML, CPU exatamente como Apex. Mas o cálculo não é transparente — você não sabe quantas queries seu Flow está fazendo até o erro chegar em produção. Apex te força a ser explícito; Flow esconde até quebrar.

**Performance que degrada silenciosamente.** Flow é interpretado, não compilado. Em loop com 1.000 iterações, cada elemento adiciona overhead que em Apex seria zero. Operação que rodava em 2s vira 12s, e ninguém entende por quê. Diagnóstico exige Flow Debug, que não dá métricas comparáveis.

**Manutenção que vira labirinto.** Flow visual em 5 elementos é melhor que Apex em 50 linhas. Flow visual em 40 elementos é pior que Apex em 200 linhas. O ponto de virada está entre 15 e 20 elementos. Quando o Flow cresce além disso, manter vira pesadelo — e a tentação de copiar Flow inteiro pra fazer pequena variação acelera o caos.

> Flow é excelente em escala pequena e média. Em escala grande, Apex é mais legível, mais performático e mais auditável. A diretriz "Flow primeiro" não deveria ser "Flow sempre".

## Como decidir, caso a caso

A régua que aplicamos antes de implementar automação:

1. **Quantos elementos o Flow vai ter?** Estimativa rápida. Se passa de 20, considerar Apex. Se passa de 35, quase sempre Apex.
2. **Vai processar quantos registros por execução?** Até ~200, Flow ok. Mais que isso, avaliar bulkificação séria — frequentemente Apex.
3. **Precisa de integração com sistema externo?** Callout simples, Flow. Callout com retry, OAuth complexo, parsing pesado, Apex.
4. **Qual a velocidade esperada de mudança?** Se é regra que vai mudar toda semana, Flow (admin altera). Se é regra estável de longo prazo, Apex bem escrito ganha em legibilidade.
5. **Quem vai manter em 12 meses?** Admin = Flow. Dev = Apex. Se a empresa tem ambos, escolher pelo critério técnico, não pelo cargo.

Quem responde os cinco sem hesitar sabe escolher. Quem segue regra única (sempre Flow / sempre Apex) está otimizando pra ideologia, não pra resultado.

## A armadilha do "vamos refatorar depois"

A frase que parece pragmática: "começamos com Flow simples, se ficar grande migramos pra Apex". Migrar Flow já em produção pra Apex é projeto sério — reescrever lógica, atualizar todos os pontos de invocação, testar paridade, congelar mudanças durante transição. Tipicamente 4–8 semanas pra Flow de complexidade média.

A versão menos cara: escolher na arquitetura inicial, com base nos 5 critérios acima. Refatorar Flow pra Apex depois é caro; escolher Apex desde o início custa apenas o trabalho de desenvolver, sem o passivo de migração.

[Como argumentei nos antipadrões de Sales Cloud](/blog/sales-cloud-cinco-antipadroes.html), a tentação de fazer "o básico" e ajustar depois é fonte recorrente de retrabalho. Vale igual em Flow vs Apex.

## A decisão pra 2026

Salesforce Architect maduro escolhe pela necessidade, não pela diretriz. Flow ganhou seu espaço — em 60–70% dos casos é a escolha certa. Mas tratar "Flow primeiro" como dogma é o jeito mais lento de descobrir que aqueles outros 30–40% pediam Apex desde o começo.

A pergunta certa não é "Flow ou Apex". É: *qual é a lógica, qual o volume, qual o ciclo de mudança, quem mantém*. Respondidas essas, a escolha aparece. Sem responder, a escolha vira religião — e religião em Salesforce vira projeto eterno.

[Como em qualquer rollout sério](/blog/mapear-processos-antes-do-salesforce.html), o discovery vale mais que a escolha técnica. Time que faz discovery direito raramente erra em Flow vs Apex. Time que pula pra implementação descobre o erro no terceiro mês de produção.

## Perguntas que sempre voltam

Antes de fechar, as dúvidas que mais aparecem quando esse assunto entra na mesa.

## Quando usar Apex em vez de Flow?

Em quatro padrões: lógica complexa com muitos caminhos condicionais (a partir de 8–15 ramificações, o Flow vira árvore de 40+ elementos que ninguém entende, enquanto o mesmo em Apex cabe em 80–150 linhas legíveis); operação em massa com performance crítica; integração externa que exige retry, OAuth complexo ou parsing pesado; e lógica que vários sistemas vão consumir — Apex com Invocable Methods evita a duplicação em três Flows que divergem com o tempo.

Fora desses padrões, Flow segue sendo a escolha certa em 60–70% da automação típica. A régua rápida: se a estimativa passa de 20 elementos, considere Apex; se passa de 35, é quase sempre Apex.

## Flow aguenta processar milhares de registros?

Não bem. Flow é otimizado pra registros únicos ou poucos — até uns 200 por execução funciona; acima disso, é hora de avaliar bulkificação séria. Em batch de 10k+ registros, Apex com SOQL otimizado é 10–50× mais rápido e cabe nos limites de governor sem hack. Batch grande em Flow é a fonte número um de "Too many SOQL queries" em produção.

Tem um agravante: Flow conta SOQL, DML e CPU exatamente como Apex, mas sem transparência — você não sabe quantas queries está fazendo até o erro chegar em produção. Apex te força a ser explícito; Flow esconde até quebrar.

## Dá pra começar com Flow e migrar pra Apex depois se crescer?

Dá, mas sai caro — e a frase "se ficar grande a gente migra" costuma ser a parte cara do projeto. Migrar Flow em produção pra Apex significa reescrever a lógica, atualizar todos os pontos de invocação, testar paridade e congelar mudanças durante a transição: tipicamente 4–8 semanas pra um Flow de complexidade média.

O caminho mais barato é decidir na arquitetura inicial, com base em cinco critérios: quantos elementos, quantos registros por execução, se há integração externa, qual a velocidade de mudança da regra e quem mantém em 12 meses. Escolher Apex desde o início custa só o desenvolvimento — sem o passivo de migração.
