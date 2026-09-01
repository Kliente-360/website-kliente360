---
title: "Segurança de agentes: o piloto não testa prompt injection nem tool poisoning"
slug: "seguranca-de-agentes-piloto-nao-testa"
pillar: "ai"
date: "2026-09-01"
readMinutes: 7
excerpt: "82% dos executivos confiam na política de segurança do agente; só 21% têm visibilidade real sobre prompt injection e tool poisoning."
tldr: "Prompt injection é a manipulação de um agente por meio de instrução maliciosa embutida no conteúdo que ele processa; tool poisoning é a manipulação da descrição ou do comportamento de uma ferramenta depois que o agente já foi autorizado a chamá-la. Nenhum dos dois aparece no piloto, porque piloto roda sobre dado curado, ferramenta estável e revisão humana de cada saída — exatamente as três condições que produção remove à medida que o agente escala. Um levantamento de 2026 com mais de 900 executivos e profissionais técnicos encontrou 82% confiantes de que a política de segurança protege contra ação não autorizada do agente, mas só 21% com visibilidade completa sobre permissão, ferramenta e dado que ele realmente usa."
keywords: ["segurança de agentes de IA", "prompt injection", "tool poisoning", "governança de agentes", "piloto de agente de IA", "MCP"]
---

**Oitenta e dois** por cento dos executivos dizem confiar que a política de segurança da empresa protege contra ação não autorizada de um agente de IA. Apenas vinte e um por cento têm visibilidade completa sobre que permissão esse agente tem, que ferramenta ele chama e que dado ele acessa. Os dois números vêm do mesmo levantamento — o *State of AI Agent Security 2026*, feito com mais de 900 executivos e profissionais técnicos — e descrevem a mesma empresa respondendo duas perguntas diferentes: uma sobre a política escrita, outra sobre o comportamento real do agente em produção.

Essa lacuna não nasce de negligência. Nasce de onde a confiança em segurança de agentes foi calibrada: no piloto. Um piloto roda sobre um conjunto de ferramentas conhecido, dado curado pelo próprio time e revisão humana de cada saída antes dela virar ação — exatamente as três condições que produção remove, uma de cada vez, à medida que o agente escala. Prompt injection e tool poisoning, dois dos vetores de ataque mais citados na literatura de segurança de 2026, são invisíveis nessas condições controladas. Eles só aparecem quando alguém — de propósito ou não — expõe o agente ao que o piloto nunca expôs.

## O sintoma: o piloto aprova, a produção descobre o ataque

O padrão se repete em quase todo incidente documentado: o time aprovou o piloto porque o agente se comportou bem dentro do escopo testado. Ninguém tentou, de propósito, fazer o agente desobedecer a própria instrução. Ninguém trocou a versão de uma ferramenta no meio do teste pra ver se o agente notava. O piloto mediu competência numa tarefa conhecida — não resistência a um adversário desconhecido.

O custo dessa lacuna já apareceu em escala: 88% das organizações relataram incidente de segurança confirmado ou suspeito envolvendo agente de IA no último ano, segundo o mesmo levantamento. E a aprovação formal não acompanha o ritmo do deploy — só 14,4% das organizações colocam agente em produção com aprovação completa de segurança ou TI. A maioria escala primeiro e formaliza controle depois, geralmente depois do primeiro incidente que expõe o que faltava.

> O piloto testa se o agente funciona. Raramente testa se ele resiste a alguém tentando fazer com que funcione errado.

## Prompt injection: o piloto nunca leu conteúdo hostil

Prompt injection é a técnica de embutir instrução maliciosa dentro do conteúdo que um agente processa — um e-mail, um documento, uma página web, a resposta de uma ferramenta — de um jeito que o modelo interpreta aquilo como comando, não como dado. [Já detalhamos esse vetor ao mapear a arquitetura de um servidor MCP](/blog/arquitetura-servidor-mcp.html): quando um resource devolve conteúdo de terceiro, esse conteúdo entra no contexto do modelo com a mesma autoridade que uma instrução do usuário — e o modelo não tem, por padrão, como distinguir as duas fontes.

A gravidade do vetor está confirmada fora do nosso próprio argumento. O OWASP GenAI Security Project mantém prompt injection na primeira posição do LLM Top 10 desde que a lista existe, e a edição de 2026 mapeia o vetor em seis das dez categorias do Top 10 específico pra aplicações agenticas — sinal de que o problema deixou de ser item isolado de checklist e passa a atravessar quase toda superfície de decisão de um agente.

Um piloto processa dado que o próprio time selecionou — geralmente limpo, geralmente confiável. Produção processa o que o mundo manda: e-mail de cliente, anexo de fornecedor, resultado de busca, conteúdo de um servidor MCP que a empresa nem opera. Nenhuma dessas fontes passou pelo mesmo filtro que o dado do piloto passou. A primeira vez que o agente encontra conteúdo hostil de verdade tende a ser em produção — exatamente quando o custo do erro deixa de ser hipotético.

## Tool poisoning: a ferramenta muda depois que o piloto aprovou

Tool poisoning é a manipulação da descrição de uma ferramenta — ou do comportamento por trás dela — depois que o agente já está autorizado a chamá-la. O modelo lê a descrição em linguagem natural da tool como instrução, não como metadado, e nada no protocolo [que sustenta a adoção enterprise do MCP](/blog/model-context-protocol-servidor-mcp.html) impede que essa descrição mude numa conexão seguinte, sem que o cliente reavalie o consentimento original.

Dois casos documentados em 2026 mostram que isso já aconteceu fora de laboratório. O CVE-2026-22708, contra o editor Cursor, permitiu envenenar o ambiente de execução do agente pra que comandos supostamente seguros — como `git branch` — entregassem payload arbitrário. E o pacote `postmark-mcp` publicou quinze versões limpas, construindo confiança, antes de adicionar uma única linha de código que exfiltrava dado silenciosamente.

> Uma ferramenta aprovada uma vez não fica aprovada para sempre — ela só para de ser revisada.

Nenhum dos dois ataques aparece num piloto, porque piloto testa a ferramenta na versão que ela tinha no dia do teste, não na versão que ela pode assumir seis meses depois, num fornecedor que a empresa não audita de novo a cada atualização. Confiar numa ferramenta uma vez não é o mesmo que confiar nela pra sempre — e é exatamente essa diferença que separa checklist de integração de disciplina de segurança contínua.

## Cinco perguntas que o piloto deveria responder e normalmente não responde

Antes de tratar um piloto como validado pra produção, cinco perguntas separam teste de competência de teste de segurança:

1. **O piloto expôs o agente a conteúdo que a empresa não controla?** E-mail externo, documento de terceiro, resultado de busca — se a resposta é "só dado interno curado", o piloto nunca testou prompt injection de verdade.
2. **Alguém tentou, de propósito, fazer o agente desobedecer a própria instrução?** Red-team de prompt injection é diferente de teste de funcionalidade — exige adversário simulado, não usuário cooperativo.
3. **A ferramenta que o agente chama hoje é a mesma, na mesma versão, que ele vai chamar daqui a seis meses?** Sem versionamento auditado, a resposta é "não sabemos" — e "não sabemos" é a pré-condição de todo caso de tool poisoning documentado.
4. **Existe log estruturado de toda chamada de ferramenta, ou só do resultado final agregado?** [Sem esse trace, um incidente de segurança vira reconstrução de memória](/blog/observabilidade-de-agentes.html) em vez de investigação com dado.
5. **Quem revisa o comportamento do agente depois que o piloto vira produção — e com que frequência?** Piloto tem prazo de validação; produção não tem prazo pra parar de ser revisada.

## A confiança em segurança de agentes mede o piloto, não a produção

A lacuna de 82% contra 21% não é sobre executivo desonesto — é sobre medir a coisa errada. A política escrita, a aprovação formal, o piloto que passou: todos respondem "o agente está funcionando". Nenhum responde "o agente resiste a alguém tentando fazer com que funcione contra a empresa". Os 88% de organizações que já relataram incidente de segurança confirmado ou suspeito não descobriram isso no piloto — descobriram depois, porque o piloto nunca testou pra esse cenário.

Fechar essa lacuna custa menos antes do agente escalar do que depois do primeiro incidente. Red-team de prompt injection, versionamento auditado de cada ferramenta externa, revisão humana de ação irreversível — nenhum dos três exige reconstruir o agente. Exige testar contra o adversário que o piloto nunca simulou, antes que a produção simule por conta própria.

## Perguntas que sempre voltam

Fechando, as dúvidas mais comuns sobre segurança de agentes de IA, prompt injection e tool poisoning.

## O que é prompt injection em agentes de IA?

Prompt injection é a técnica de embutir instrução maliciosa dentro do conteúdo que um agente de IA processa — um e-mail, documento, página web ou resposta de ferramenta — de forma que o modelo interprete aquele conteúdo como comando, não como dado. O OWASP GenAI Security Project mantém prompt injection na primeira posição do LLM Top 10 desde que a lista existe, e a edição 2026 mapeia o vetor em seis das dez categorias do Top 10 específico pra aplicações agenticas — sinal de que o risco atravessa quase toda superfície de decisão de um agente, não só a entrada de texto direta do usuário.

## O que é tool poisoning e como ele difere de prompt injection?

Tool poisoning é a manipulação da descrição de uma ferramenta — ou do comportamento por trás dela — depois que um agente ou cliente já aprovou seu uso, enquanto prompt injection ataca o conteúdo que o agente lê durante a execução. Os dois exploram o mesmo ponto cego: o modelo trata descrição de ferramenta e conteúdo externo como informação confiável por padrão. Casos documentados em 2026, como o CVE-2026-22708 contra o editor Cursor e o pacote `postmark-mcp` que adicionou exfiltração de dado depois de quinze versões limpas, mostram que o ataque geralmente chega depois que a confiança já foi construída — não na primeira interação.

## Por que um piloto de agente não detecta esses riscos?

Porque piloto e produção testam contra adversários diferentes. Um piloto roda sobre dado curado pelo próprio time, ferramenta na versão testada e revisão humana de cada saída antes de virar ação — as três condições que eliminam, por desenho, tanto prompt injection quanto tool poisoning. Produção remove essas três proteções progressivamente à medida que o agente escala: processa dado que a empresa não controla, chama ferramenta que pode mudar sem aviso, e age com menos revisão humana por chamada, porque o volume não permite. O piloto mede competência numa tarefa conhecida; não mede resistência a um adversário que só aparece depois que o piloto termina.
