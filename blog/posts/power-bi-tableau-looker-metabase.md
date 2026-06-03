---
title: "Power BI vs Tableau vs Looker vs Metabase — matriz por porte"
slug: "power-bi-tableau-looker-metabase"
pillar: "data"
date: "2026-06-03"
readMinutes: 7
excerpt: "Quatro ferramentas de BI, três dimensões de decisão e uma matriz Brasil-específica por porte. A resposta raramente é a mais cara."
tldr: "Power BI, Tableau, Looker e Metabase servem contextos distintos, não uma hierarquia de qualidade. A escolha depende de três fatores: stack de nuvem existente, maturidade do time de dados e custo total em reais. Esta matriz organiza as quatro por porte e contexto brasileiro, com cinco perguntas que decidem sem erro."
keywords: ["Power BI", "Tableau", "Looker", "Metabase", "comparativo BI", "ferramentas de BI"]
---

Quando a decisão de ferramenta de BI chega à mesa, quase sempre traz a pergunta errada: qual é a melhor? Power BI, Tableau, Looker e Metabase aparecem em todo comparativo de mercado com features alinhadas, benchmarks parecidos e casos de sucesso em todos os setores. A resposta honesta é que a melhor ferramenta é a que cabe no seu contexto — e no Brasil há uma variável extra: o custo em reais de licenças dolarizadas num câmbio que não para de oscilar.

Esse texto monta a matriz. Não é análise de features — é guia de decisão por porte e contexto. Se você já conhece as ferramentas e quer a resposta direta, vá para "Matriz por porte". Se quiser entender os critérios, leia do começo.

## O que as quatro têm em comum — e onde divergem de fato

Todas as quatro ferramentas conectam ao mesmo conjunto de warehouses (Snowflake, BigQuery, Redshift, Databricks), geram dashboards visualmente comparáveis e têm APIs para embed em produto. A confusão nos comparativos de mercado vem exatamente daí: na superfície, fazem coisas parecidas.

As divergências reais estão em três dimensões:

1. **Custo total de propriedade.** Licensing + infraestrutura + custo humano de operar. Essa conta muda muito entre as quatro — e mais ainda dependendo do câmbio no trimestre do contrato.
2. **Integração com stack existente.** Power BI é nativo no ecossistema Microsoft (Azure, M365, SQL Server). Looker é nativo em Google Cloud (BigQuery). Tableau e Metabase são warehouse-agnósticos: encaixam em qualquer stack, sem vantagem nativa em nenhum.
3. **Exigência técnica de operação.** Metabase não exige especialista de BI — qualquer analista com SQL básico opera. Looker exige engenheiro com LookML, perfil de data engineer. Tableau e Power BI ficam no meio: precisam de analista de BI, não de engenheiro de dados.

## Anatomia das quatro ferramentas

**Power BI** é a aposta do ecossistema Microsoft. Quem já roda M365 + Azure recebe o Pro incluído ou com custo marginal — o licensing bundled é a maior vantagem competitiva no Brasil. O modelo de dados em DAX é aprendível por analista de BI em poucas semanas. A limitação aparece na escala: compartilhar dashboards fora do M365 exige Premium Per User ou capacidade Premium Per Capacity, e esse salto de custo é relevante na negociação.

**Tableau** não tem par em flexibilidade visual e exploração ad hoc. Tableau Prep + Desktop + Server/Cloud entrega pipeline completo de visualização enterprise. A limitação é direta: é a mais cara das quatro. No câmbio atual, Tableau Creator fica entre R$ 1.500 e R$ 2.500 por usuário por mês, o que torna proibitivo para médio porte sem time de BI dedicado. [Construir analítica executiva que vira decisão com Tableau](/blog/tableau-linguagem-executiva.html) exige mais que a licença — exige modelo de dados sólido abaixo.

**Looker** é a aposta da Google na camada semântica. LookML cria fonte única de verdade para definições de métricas — exatamente [o problema que a camada semântica resolve na stack de dados atual](/blog/modern-data-stack-2026.html), e onde a maioria das empresas ainda improvisa. BigQuery + Looker é a combinação mais integrada em plataforma pública. A exigência de LookML é real: não é ferramenta de self-service; é produto de time de dados com engenheiro dedicado.

**Metabase** é o caminho mais rápido para BI sem especialista. A versão open-source roda em qualquer VM cloud; a versão Cloud começa em cerca de USD 500/mês. Interface SQL ou sem SQL, conecta a qualquer warehouse. A limitação é de escala: governance, permissões granulares e embed complexo começam a exigir workarounds acima de ~200 usuários ativos.

## Matriz por porte e contexto brasileiro

**Startup e PME (até ~200 funcionários).** Metabase ou Power BI. Metabase quando não há analista de BI dedicado e quem opera o BI é o próprio negócio com SQL. Power BI quando já há dependência de Microsoft 365 e o time financeiro vive no Excel. Tableau e Looker têm custo de licença e operação incompatíveis com esse porte.

**Médio porte (200–1.000 funcionários).** Power BI se o stack é Microsoft; Tableau se há time de BI e o orçamento suporta. Nessa faixa, a decisão quase sempre segue a nuvem principal: se IT já roda Azure + SQL Server, Power BI tem licensing marginal. Se o stack é misto ou AWS, Tableau entra com vantagem em flexibilidade visual — se o contrato couber no orçamento anual.

**Grande porte (acima de 1.000 funcionários, múltiplos times de dados).** Tableau ou Looker. Tableau quando o time tem analistas de BI que fazem visualização. Looker quando há engenheiros de dados que mantêm modelos LookML. Nessa escala, governance e camada semântica importam mais que flexibilidade de visualização.

**Google Cloud shop (qualquer porte).** Looker nativo. BigQuery + Looker é oferta completa e integrada. Trocar de ferramenta de BI nesse stack é fricção técnica que raramente se justifica.

**Enterprise Microsoft (acima de 2.000 funcionários + Power Platform).** Power BI Premium. Nessa escala, Power BI Embedded + Power Platform + Azure faz sentido como plataforma de produto de dados — não apenas camada de dashboard.

> A matriz por porte é ponto de partida, não veredito. O que decide na segunda camada é a maturidade do dado que vai alimentar a ferramenta.

## As cinco perguntas que decidem

1. **Seu stack de nuvem é predominantemente Microsoft ou Google?** Microsoft → Power BI. Google Cloud → Looker. Nenhum dos dois → Tableau ou Metabase, por porte e orçamento.

2. **Tem analista de BI dedicado — ou o negócio vai operar sozinho?** Self-service pelo negócio → Metabase ou Power BI. Time de BI dedicado → qualquer uma das quatro; refine por stack e custo.

3. **Qual é o custo em reais por ano, incluindo storage, compute e hora de time?** Calcule o TCO completo. Em médio porte brasileiro, Tableau e Looker somam com frequência R$ 200–400 mil/ano em licensing + operação. Power BI Premium pode chegar perto dependendo do número de usuários. Metabase Cloud fica na faixa de R$ 30–80 mil/ano.

4. **O problema principal é exploração ad hoc ou resposta padronizada?** Exploração ad hoc → Tableau tem a melhor interface. Métricas padronizadas com governance → Looker (LookML). Relatórios operacionais rápidos → Power BI ou Metabase.

5. **Já tem o problema de "cada área com seu número"?** Se sim, a prioridade é a camada semântica antes da ferramenta de BI. Nenhuma das quatro resolve sozinha — [self-service sem governança reproduz exatamente esse problema](/blog/self-service-bi.html), independente de qual ferramenta está na frente. Resolva o modelo de dados primeiro; a ferramenta de visualização é a última decisão, não a primeira.

## Os três antipadrões que custam projeto e orçamento

**Escolher a ferramenta antes da arquitetura.** BI tool é a última decisão de stack, não a primeira. Warehouse, camada de transformação (dbt ou nativa), camada semântica — nessa ordem. Projetos que começam com "vamos usar Tableau" frequentemente descobrem que o modelo de dados não suporta a complexidade semântica esperada, e a implementação vira dois anos de correção de modelo.

**Comprar Tableau ou Looker sem engenheiro de dados.** Tableau sem dado modelado entrega dashboard bonito e impreciso. Looker sem engenheiro LookML é casca vazia. As duas ferramentas exigem investimento em infraestrutura de dados — não só em licença de visualização.

**Usar Metabase além do porte.** Metabase é excelente ponto de entrada. Não é ferramenta enterprise. Acima de ~200–300 usuários ativos, falhas de governance, problemas de permissão granular e queries lentas aparecem. Crescer além do Metabase é maturidade — não é fracasso.

## A pergunta que vem antes do contrato de licença

A decisão de BI é, na prática, uma decisão de arquitetura de dados com interface visual. Quem licencia a ferramenta sem resolver o que está abaixo — dado fragmentado, sem modelo semântico, sem dono de métricas — vai trocar de ferramenta em dois anos e reproduzir o mesmo problema num stack novo.

A pergunta que uma consultoria especializada faz antes de recomendar qualquer ferramenta: "o dado que vai alimentar esse BI está modelado, governado e com dono claro?". Se a resposta não for sim, essa conversa precisa acontecer antes da conversa com o vendedor de licença.
