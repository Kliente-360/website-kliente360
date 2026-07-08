---
title: "Data Catalog que ninguém usa: sintoma do problema real (não é a ferramenta)"
slug: "data-catalog-ninguem-usa"
pillar: "data"
date: "2026-03-31"
readMinutes: 6
excerpt: "Empresa compra Alation/Collibra, paga consultoria, popula com 800 tabelas. Em 6 meses, analista volta pra perguntar no Slack. O problema não é a ferramenta — é o que se pediu dela."
tldr: "Data Catalog vira ornamento na maioria das empresas que adota porque a ferramenta tenta resolver problema que não é dela: cultura de documentação. Sem cultura, qualquer catalog vira lista de tabelas vazias. Cinco condições que separam catalog útil de catalog decorativo — e por que dbt resolve 80% do problema sem o nome bonito."
keywords: ["Data Catalog", "Alation", "Collibra", "data governance", "documentação de dados"]
---

A pergunta de qualquer reunião de avaliação de Data Catalog em 2026: *quantas vezes alguém consultou o catalog na última semana?* Resposta honesta na maioria das empresas: "uns 12 acessos, mas a maioria foi do time de governança verificando se está atualizado". Tradução prática: a empresa pagou Alation ou Collibra ou similar (US$ 200k+/ano), passou 6 meses populando, e ninguém usa. O analista que precisa entender uma tabela continua perguntando no Slack.

A culpa não é da ferramenta. Catalog é categoria madura, com produtos competentes. A culpa é do diagnóstico errado: empresa achou que comprar catalog ia resolver problema de cultura. Não resolve. Esse texto é sobre o problema real, e por que dbt sozinho resolve 80% do caso sem ter o nome bonito.

## Por que catalog falha em produzir uso real

O modelo mental que vende catalog é: "se tivermos um lugar único com toda a documentação, todo mundo vai consultar". Lógica de prateleira de biblioteca. Falha porque três coisas têm que ser verdade pra funcionar — e raramente são.

**Documentação tem que existir.** Catalog vazio é só interface bonita. Popular o catalog exige que alguém escreva a descrição de cada tabela, cada coluna, cada métrica. Catalog não escreve por você.

**Documentação tem que estar atualizada.** Documentação que envelhece é pior que ausente — usuário consulta, age, descobre que estava errado, perde confiança. Manter requer disciplina contínua, geralmente subestimada.

**Documentação tem que ser melhor que perguntar no Slack.** Custo de consultar catalog (abrir ferramenta, navegar, ler) precisa ser menor que custo de perguntar no Slack. Em catalog desorganizado ou desatualizado, o Slack vence sempre.

Quando as três falham simultaneamente — que é o caso de 80% das implementações que vejo — catalog vira lista de tabelas vazias com nome corporativo.

## O problema que catalog *parece* resolver, mas não resolve

A frustração organizacional que motiva compra de catalog tem nome: *ninguém sabe o que cada tabela significa*. A intuição é que ter um lugar pra documentar resolve. Não resolve. O problema raiz é cultural, não infraestrutural.

Empresa que não tem cultura de documentação vai popular o catalog com descrições genéricas ("tabela de clientes"), abandonar manutenção em 3 meses, e culpar a ferramenta em 6. Empresa que tem cultura de documentação tem ela no Git, no dbt, na wiki — o catalog é só visualização, não substituto.

> Data Catalog não cria cultura de documentação. Só amplifica a que já existe. Empresa sem cultura prévia compra catalog e amplifica zero.

## O que catalog faz bem (quando faz)

Não confundir o argumento. Há contextos onde catalog premium tem valor real:

**Empresa grande com 5+ times de dados independentes.** Quando o catálogo precisa atravessar fronteiras organizacionais (várias áreas de negócio, várias subsidiárias, várias plataformas), catalog enterprise oferece governança cruzada que ferramenta única não dá.

**Necessidade regulatória explícita.** Empresa em setor regulado (financeiro, saúde) onde auditor exige documentação centralizada com trilha de aprovação. Aqui catalog é compliance, não produtividade.

**Lineage cross-stack.** Quando dado flui entre 5+ sistemas distintos (Salesforce, ERP, warehouse, ML platform, BI), catalog enterprise rastreia lineage de jeito que dbt sozinho não rastreia.

Fora desses três contextos, catalog premium tende a ser overshoot — e o uso real cai conforme o entusiasmo inicial passa.

## Por que dbt resolve 80% do caso

Pra maioria das empresas de médio porte brasileiras, [dbt com disciplina de documentação](/blog/dbt-na-pratica.html) resolve o caso de uso que o catalog tentaria. Cinco motivos:

- **Documentação vive ao lado do código.** Description de cada modelo, cada coluna, no .yml versionado em Git. Quem muda o modelo atualiza a doc no mesmo PR.
- **`dbt docs` gera site navegável.** Lineage visual, descrições, testes, fonte. O que catalog promete entregar, dbt entrega — pra modelos que estão no warehouse.
- **Owner explícito no `.yml`.** Quem é dono de cada modelo. Quando algo muda ou quebra, tem nome.
- **Source freshness embutido.** Catalog mostra "última atualização"; dbt monitora ativamente e alerta.
- **Custo: zero.** dbt é open source. Documentação é trabalho de equipe, mas a infra é gratuita.

A limitação honesta: dbt cobre o que está no warehouse. Pra fontes externas (Salesforce, Mixpanel, planilhas), o catalog precisa abranger algo que dbt sozinho não cobre. Mas se 80% das tabelas usadas estão no warehouse, dbt resolve 80% do problema.

## A régua antes de comprar catalog

Cinco perguntas pra responder antes de assinar contrato anual de US$ 200k:

1. **A cultura de documentação existe hoje?** Olhar rápido: as 20 tabelas mais usadas estão documentadas? Se não, comprar catalog é amplificar ausência.
2. **Quem vai popular o catalog inicialmente?** Time de dados, sob qual sponsor, com qual prazo? Sem dono nominal e prazo, o povoamento nunca termina.
3. **Quem vai manter atualizado?** Não "o time todo". Nome, processo, ferramenta. Sem isso, drift de 6 meses garantido.
4. **Qual o caso de uso primário?** Analista buscando metadata? Auditor verificando governança? Lineage entre sistemas? Cada caso pede config diferente.
5. **dbt resolveria essa necessidade?** Honestamente. Se 80% dos modelos estão no warehouse e o caso é interno, [dbt + disciplina de description é resposta mais barata](/blog/dbt-na-pratica.html). Catalog vira upgrade quando dbt esgota.

Quem responde as cinco com clareza decide com convicção. Quem responde "depende" em três ou mais não tem caso de uso definido — e qualquer compra vai virar ornamento.

## A relação com data contracts e dbt

[Data contracts](/blog/data-contracts.html) e dbt complementam catalog — não substituem entre si. Em arquitetura madura:

- **dbt** documenta o que está no warehouse, descreve modelos, testa.
- **[Data contracts que viraram prática operacional em 2026](/blog/tendencias-data-management-2026.html)** versionam acordos entre produtor e consumidor de dado.
- **Catalog enterprise**, se justificado, é a camada de governança cruzada que atravessa tudo.

A maioria das empresas brasileiras de médio porte não precisa da terceira camada. Precisa das duas primeiras feitas direito. Pular as duas primeiras pra ir direto pra catalog é construir prédio sem fundação.

## A decisão pra 2026

Se sua empresa está avaliando data catalog premium, três movimentos honestos antes da compra:

**Tente dbt com disciplina por 6 meses primeiro.** Documentation enforced no CI, owner nominal, source freshness ativo. Em 6 meses você sabe se o problema é falta de cultura ou falta de ferramenta.

**Se decidir comprar catalog, monte o time antes.** Não dá pra comprar catalog e esperar que "o time de dados vai popular". Pessoa nominal, prazo, sponsor com autoridade pra cobrar áreas a documentar.

**Reavalie em 12 meses pelo uso, não pela cobertura.** Catalog com 100% das tabelas e 5 acessos por semana é catalog morto. Catalog com 60% das tabelas e 500 acessos por semana é catalog vivo. Métrica de sucesso é uso, não inventário.

Data Catalog em 2026 é ferramenta legítima — mas é último degrau de uma escada de cultura de documentação. Empresa que pula degraus paga catalog caro e continua perguntando no Slack. Empresa que sobe pela escada chega no degrau alto sabendo se vale ou não.

## Perguntas que sempre voltam

Antes de fechar, as dúvidas que mais aparecem quando esse assunto entra na mesa.

## Vale a pena comprar um data catalog tipo Alation ou Collibra?

Só em três contextos: empresa grande com 5+ times de dados independentes, exigência regulatória de documentação centralizada com trilha de aprovação, ou lineage atravessando 5+ sistemas distintos. Fora disso, catalog premium tende a ser overshoot — você paga US$ 200k+/ano por uma ferramenta cujo uso real despenca quando o entusiasmo inicial passa.

O pré-requisito que ninguém checa: cultura de documentação. Se as suas 20 tabelas mais usadas não estão documentadas hoje, comprar catalog é amplificar ausência. A ferramenta não escreve descrição por você e não cria disciplina que não existe.

## dbt substitui um data catalog?

Pra maioria das empresas de médio porte, sim — dbt com disciplina de documentação cobre uns 80% do que o catalog tentaria resolver. Description versionada em Git ao lado do código, `dbt docs` gerando site navegável com lineage visual, owner explícito no `.yml`, source freshness com alerta ativo. E a infra custa zero, porque dbt é open source.

A limitação honesta: dbt só cobre o que está no warehouse. Se boa parte do seu dado crítico vive em fontes externas (Salesforce, Mixpanel, planilhas) ou o lineage precisa cruzar vários sistemas, aí o catalog cobre algo que dbt sozinho não cobre. Catalog vira upgrade quando dbt esgota — não o contrário.

## Como saber se a implantação do catalog deu certo?

Pelo uso, não pela cobertura — e a reavaliação honesta é em 12 meses. Catalog com 100% das tabelas documentadas e 5 acessos por semana é catalog morto; catalog com 60% das tabelas e 500 acessos por semana é catalog vivo. Inventário completo não prova nada se o analista continua perguntando no Slack.

O teste prático: quantas vezes alguém consultou o catalog na última semana, descontando o próprio time de governança verificando se está atualizado? Se a resposta constrange, o problema não vai se resolver com mais povoamento — vai se resolver com dono nominal, processo de manutenção e um caso de uso primário definido antes de qualquer renovação de contrato.
