---
title: "Dado limpo é um mito: convivendo com qualidade imperfeita"
slug: "dado-limpo-e-um-mito"
pillar: "data"
date: "2026-01-07"
readMinutes: 6
excerpt: "Esperar dado 100% limpo pra começar é o jeito mais elegante de nunca entregar. O que separa empresas que andam das que ficam em projeto eterno de qualidade."
tldr: "Dado limpo, no sentido absoluto, não existe em empresa que opera. Existe dado *bom o suficiente pra decisão X*. Quem entende essa diferença move o roadmap; quem espera limpeza universal fica em projeto eterno de qualidade. Três regras práticas pra parar de travar."
keywords: ["data quality", "qualidade de dados", "data governance", "roadmap de dados", "MDM"]
---

A frase mais cara de uma reunião de dados é "antes a gente precisa limpar a base". Soa responsável. Soa madura. E é, na maioria das vezes, o argumento que mata o projeto de analytics, [de Salesforce](/blog/mapear-processos-antes-do-salesforce.html), de IA — sem que ninguém perceba que matou. Porque a base nunca termina de limpar. Sempre tem mais um campo, mais uma duplicidade, mais um sistema legado. E a empresa que decidiu esperar continua tomando decisão no Excel paralelo enquanto o "projeto de qualidade" entra no terceiro ano.

Esse texto é contra o mito de que dado precisa estar limpo pra ser útil. Não é contra qualidade — qualidade importa, e muito. É contra a *forma de buscar qualidade* que paralisa o resto da operação.

## O mito e por que ele sobrevive

O mito tem três pilares. Vale nomear cada um, porque enquanto eles ficam implícitos, o argumento não muda.

O primeiro é o **mito da limpeza absoluta**. A ideia de que existe um estado final de dado correto — sem duplicidade, sem campo vazio, sem inconsistência entre sistemas. Esse estado não existe em empresa que ainda opera. Toda operação gera entropia: cliente muda de endereço, vendedor digita errado, sistema externo manda lixo. Limpeza é trabalho contínuo, não fase com fim.

O segundo é o **mito da universalidade**. A ideia de que se o dado de cliente está sujo, então todo projeto que toca cliente precisa esperar. Falso. Um dashboard de churn precisa de qualidade alta no campo "data de cancelamento" e tolera ruído em "telefone secundário". Um agente de cobrança precisa de qualidade alta em "valor em aberto" e tolera ruído em "segmento de mercado". *Qualidade é sempre relativa ao uso.*

O terceiro é o **mito da sequência**. A ideia de que primeiro se limpa, depois se usa. Na prática, é o uso que revela quais sujeiras importam. Empresa que limpa antes de usar limpa o que a equipe técnica acha que importa — e descobre, seis meses depois, que limpou as coisas erradas. Quem usa primeiro vê o que dói e ataca o que dói.

> Dado limpo no absoluto não existe. Existe dado bom o suficiente pra decisão X. Tudo o mais é projeto sem fim disfarçado de governança.

O mito sobrevive porque é confortável. Adia decisão difícil, terceiriza responsabilidade pra "a base", e dá ao time uma sensação de rigor. O custo aparece em silêncio: oportunidades não tomadas, projetos cancelados, decisões feitas em planilha paralela com dado pior do que o do sistema oficial.

## Três regras para conviver com imperfeição

Uma consultoria de dados decente trabalha assim. Sem mágica, sem ferramenta nova.

1. **Defina o "bom o suficiente" para cada caso de uso.** Antes de qualquer projeto, escreva: pra essa decisão, quais campos precisam estar corretos em quantos % dos registros? Pra [um dashboard executivo que ativa decisão](/blog/tableau-linguagem-executiva.html), 98% no `valor` e na `data de fechamento` resolve. Pra uma campanha de e-mail, 90% no `e-mail principal` resolve. Pra um modelo de churn, depende — mas você precisa do número antes de começar.
2. **Use dado real ruim em paralelo com a limpeza.** Não trave o caso de uso esperando limpeza. Rode o relatório, monte o agente, publique a campanha — com o que existe. A primeira execução vai mostrar exatamente onde o ruído atrapalha. *Aí* limpa. Isso é dez vezes mais barato que limpar no escuro.
3. **Faça da [observabilidade de dados](/blog/observabilidade-de-dados.html) a peça permanente, não da limpeza.** Limpeza é evento. Observabilidade é processo. Monte alertas pra "% de registros sem CNPJ no objeto Conta passou de 5% pra 12%", "valor médio do estágio Proposta caiu 30% sem variação no funil". Esses alertas dizem o que limpar, quando, e o impacto real no negócio. [Em warehouse moderno, dbt entrega esse tipo de observabilidade via `freshness` e testes declarativos](/blog/dbt-na-pratica.html) — não é projeto à parte.

Empresas que aplicam essas três regras passam a tratar qualidade como prática operacional — [um dos fundamentos que não mudaram em 2026](/blog/tendencias-data-management-2026.html) — não como projeto. E projeto de qualidade clássico — aquele de seis meses, com consultoria, com pacote de "limpeza inicial" — vira o que sempre deveria ter sido: uma exceção pra problemas específicos, não a regra geral.

## Onde a limpeza séria ainda faz sentido

Não confundir o argumento. Há casos em que limpeza upfront é necessária e vale o custo.

**Migração de sistema.** Trocar de CRM, consolidar dois ERPs após fusão, mover de planilha pra warehouse. Aqui a limpeza é parte da migração — você não quer carregar lixo histórico pro sistema novo e ressuscitar problemas mortos. Mas mesmo aqui, "limpo" significa *limpo pra esse uso* — registros que vão operar dali em diante, não os 15 anos de histórico que ninguém vai abrir.

**Identidade de cliente.** Quando o problema é genuinamente de identidade — "esse cliente é o mesmo do outro sistema?" — vale projeto sério de master data com regras de matching, deduplicação, golden record. Sem isso, todo caso de uso downstream sofre, do dashboard ao agente. Mas isso é uma exceção, não a regra. A maioria das empresas não precisa de MDM completo; precisa de regras de matching boas em 3–5 entidades críticas.

**Regulatório.** Setor financeiro, saúde, dado pessoal sensível. Aqui não tem escolha — qualidade é compliance, e compliance não negocia. Mas o escopo é estreito: os campos que o regulador olha. O resto da base segue a regra do "bom o suficiente".

Fora desses três contextos, projeto de limpeza universal é quase sempre fuga da decisão de fazer.

## O custo invisível de esperar

A conta que ninguém faz na reunião de governança: enquanto o projeto de limpeza roda, *as decisões continuam sendo tomadas*. Não param porque o dado está sujo. Apenas migram pro Excel paralelo do gerente, pro relatório que o estagiário monta na mão, pra intuição do diretor com 20 anos de empresa.

Esse custo invisível tem três componentes. Tempo de pessoas seniores reinventando análise que o sistema deveria entregar — facilmente 10–20% da semana dos middle managers. Decisões com dado pior do que o do sistema oficial, porque o paralelo nunca tem o mesmo histórico nem as mesmas regras. E perda de credibilidade da área de dados, que vira "aquele time que demora pra entregar" enquanto o resto da empresa improvisa.

Quando você soma esses três por seis meses de "vamos limpar antes", chega num número que costuma ser maior que o custo do próprio projeto de uso que estava esperando.

## O que mudar na próxima conversa

Na próxima reunião em que alguém disser "antes a gente precisa limpar a base", a pergunta que destrava é simples: *limpar pra quê*. Se a resposta é vaga ("ter uma base confiável", "garantir qualidade"), o projeto não está pronto — não falta limpeza, falta caso de uso. Se a resposta é específica ("pra rodar esse dashboard com confiança no `valor de contrato`"), então o escopo de limpeza é específico também: esse campo, nesses registros, com esse threshold.

Dado bom não é dado limpo. É dado adequado ao uso. Empresa que entende essa diferença move o roadmap. Quem ainda persegue limpeza universal vai entregar o terceiro plano de governança em 2027 — e seguir tomando decisão em planilha.
