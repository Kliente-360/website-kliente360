---
title: "Engenharia de contexto para agentes: cache, compactação e o custo da memória"
slug: "engenharia-de-contexto-agentes-cache-compactacao"
pillar: "ai"
date: "2026-10-21"
readMinutes: 7
excerpt: "Engenharia de contexto decide o que o agente vê a cada chamada. Veja como cache, compactação e limpeza de ferramentas controlam custo e qualidade."
tldr: "Engenharia de contexto é o desenho do que entra na janela do modelo a cada chamada de um agente: instruções, ferramentas, histórico e resultados. Como o agente reenvia esse contexto inteiro em cada passo, ele domina a fatura e a qualidade da resposta. Três mecanismos controlam isso — cache de prefixo estável, limpeza de resultados de ferramentas e compactação por resumo — e a ordem em que se aplicam importa mais do que a escolha do provedor."
keywords: ["engenharia de contexto", "prompt caching", "compactação de contexto", "memória de agentes de IA", "custo de agentes de IA", "janela de contexto"]
---

**Agente** de IA não tem memória: tem um texto que cresce. A cada passo do loop — chamar ferramenta, ler resultado, decidir o próximo movimento — o histórico inteiro volta ao modelo como entrada. Engenharia de contexto é o desenho do que entra nessa janela a cada chamada: instruções, definições de ferramentas, histórico, documentos recuperados e saídas anteriores. Num chat de três mensagens, o detalhe passa despercebido. Num agente que faz vinte chamadas para fechar uma tarefa, ele é a maior linha da fatura e a causa mais comum de resposta que "se perde" no meio do caminho.

O assunto ficou prático em 2026 porque os provedores passaram a oferecer as peças como recurso de API — cache explícito, compactação no servidor, limpeza de resultados por regra. O que não veio pronto é o critério de quando usar cada uma.

## Por que o agente paga o contexto várias vezes

O custo de um agente não vem do que ele escreve, e sim do que ele relê. Um exemplo com números nossos, só para dar ordem de grandeza: um agente com prefixo fixo de 30 mil tokens (instruções, ferramentas, documentos de referência) que acrescenta 2 mil tokens por passo e roda 20 passos envia, no total, cerca de 980 mil tokens de entrada. O que o modelo gera de saída é uma fração disso.

Dois efeitos se somam. O primeiro é financeiro: o preço de entrada é cobrado a cada reenvio. O segundo é de qualidade: a documentação da Anthropic registra que [a qualidade da resposta degrada à medida que a conversa cresce](https://platform.claude.com/docs/en/build-with-claude/compaction), e é por isso que manter o contexto pequeno aparece como objetivo próprio, além da economia. Em outras palavras: contexto inchado custa mais e entrega menos.

> O agente não paga pelo que escreve; paga pelo que relê a cada passo do loop.

Quem já trabalhou [os cinco padrões de custo de inferência](/blog/custos-reais-de-inferencia.html) reconhece o problema: o truncamento de contexto e o cache estavam lá. A diferença é que, em agente, o contexto não é uma entrada que você controla na origem — ele é produzido pelo próprio loop.

## Camada 1: cache de prefixo estável

O cache de prompt reaproveita o trecho inicial que se repete entre chamadas. Segundo a [documentação de prompt caching da Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), escrever no cache de 5 minutos custa 1,25 vez o preço base de entrada, e ler do cache custa 0,1 vez na maioria dos modelos (menos nos mais novos). O prazo padrão é de 5 minutos, renovado sem custo a cada uso, com opção de 1 hora a custo maior. Prompts abaixo de um mínimo de tokens — que varia por modelo — simplesmente não são cacheados, sem erro algum.

No exemplo anterior, cachear só o prefixo fixo leva o gasto equivalente de 980 mil para cerca de 475 mil tokens. Cachear também o histórico, de forma incremental, leva para perto de 180 mil. É estimativa nossa, mas o padrão é robusto: a economia vem de manter o começo do contexto idêntico.

Isso cria uma regra de desenho que pouca gente respeita:

1. **Ordem do contexto: do mais estável ao mais volátil.** Instruções, ferramentas e documentos fixos primeiro; histórico depois; a pergunta atual por último.
2. **Nada que muda no começo.** Data e hora, ID de usuário ou contador de sessão no topo do prompt de sistema invalidam o cache inteiro a cada chamada.
3. **Ferramentas em ordem fixa.** Reordenar a lista de ferramentas quebra o prefixo.
4. **Conferir o uso, não a intenção.** Os campos de uso da resposta mostram quantos tokens foram lidos do cache; zero nos dois contadores significa que nada foi cacheado.

## Camada 2: limpar o que a ferramenta devolveu

Em agente, o maior inchaço raramente é a conversa; é o resultado de ferramenta. Uma consulta SQL que devolve 300 linhas, uma página HTML inteira, um JSON de CRM com cinquenta campos que o agente nunca mais consulta. Esse material fica no histórico e é relido em todo passo seguinte.

A limpeza por regra — apagar resultados antigos de ferramenta, manter só o rastro de que a chamada aconteceu — é a forma mais segura de reduzir contexto, porque não depende de um modelo decidir o que importa. A própria documentação da Anthropic separa [limpeza por regra de resumo por modelo](https://platform.claude.com/docs/en/build-with-claude/compaction) como mecanismos diferentes. O risco é apagar o dado que um passo futuro precisaria; por isso a regra deve ser explícita ("resultados com mais de N passos, exceto da ferramenta X") e testada.

A melhor limpeza, porém, acontece antes: ferramenta que devolve só os campos pedidos, em vez do registro inteiro. É o mesmo princípio de [recuperar bem em vez de gerar mais](/blog/rag-na-pratica.html) — o gargalo está no que chega ao modelo.

## Camada 3: compactar por resumo, com critério

Compactação substitui os turnos antigos por um resumo escrito pelo próprio modelo. Segundo a documentação, ela tem [modalidades sob demanda e por limite de tokens, ambas em beta](https://platform.claude.com/docs/en/build-with-claude/compaction), e permite manter os turnos recentes literais e escrever o seu próprio prompt de resumo. Esse último ponto importa: o resumo padrão pode descartar justamente o que um passo futuro precisa, como um identificador, uma decisão do usuário ou uma restrição combinada no início.

A compactação tem custo escondido: o resumo reescreve o início do histórico e, com isso, invalida parte do cache. Um relato de engenharia baseado em avaliações de um produto de tutoria, [publicado por Louis Bouchard](https://www.louisbouchard.ai/context-engineering-2026/), defende que com cache ativo manter tudo costuma ser mais barato, mais rápido e melhor para lembrar do que resumir. É um caso, não uma lei — mas muda a pergunta de "quando compactar?" para "qual limite concreto me obriga a compactar?".

Nossa ordem de decisão, nessa sequência:

1. Reduzir o que as ferramentas devolvem.
2. Estabilizar o prefixo e ligar o cache.
3. Limpar por regra os resultados antigos.
4. Compactar só quando a janela ou a degradação de qualidade exigir, com prompt de resumo próprio e uma lista do que nunca pode ser perdido.
5. Tirar o que for permanente do contexto e guardar fora (banco, arquivo de notas), recuperando sob demanda.

## Como saber se o contexto está funcionando

Contexto bem desenhado se mede, não se presume. Duas métricas bastam para começar: tokens de entrada por tarefa concluída (não por chamada) e taxa de leitura de cache. Para qualidade, o instrumento é o mesmo de [avaliar agentes com casos reais](/blog/avaliacao-de-agentes.html): rodar a mesma suíte antes e depois de cada mudança de contexto, porque limpar ou compactar errado só aparece como tarefa que falha 10 passos depois. Sem a suíte, otimização de contexto é aposta.

## Perguntas que sempre voltam

Dúvidas frequentes de times que começam a levar agentes para produção.

## O que é engenharia de contexto?

Engenharia de contexto é o desenho do que entra na janela do modelo a cada chamada de um agente: instruções, ferramentas, histórico, documentos recuperados e resultados anteriores. Diferente de engenharia de prompt, que cuida da redação da instrução, ela cuida da composição, da ordem e do tamanho de tudo que o modelo lê, e de quando cada parte é cacheada, limpa ou resumida.

## Prompt caching reduz mesmo o custo de um agente?

Reduz, e mais do que em aplicações de uma chamada só, porque o agente reenvia o mesmo prefixo várias vezes. Na documentação da Anthropic, ler do cache custa 0,1 vez o preço base de entrada na maioria dos modelos. O ganho depende de manter o começo do contexto idêntico entre chamadas; qualquer valor variável no topo do prompt anula o efeito.

## Quando compactar o histórico de um agente?

Quando o contexto se aproxima do limite da janela ou quando a qualidade começa a cair em tarefas longas, e depois de já ter reduzido saída de ferramenta e ligado o cache. Compactar cedo demais pode custar mais, porque o resumo invalida parte do cache, e arrisca perder detalhes que a tarefa ainda usa. Defina o que nunca pode ser resumido e meça antes e depois.
