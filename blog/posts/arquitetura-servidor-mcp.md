---
title: "Arquitetura de um servidor MCP: transporte, autenticação e onde ele quebra"
slug: "arquitetura-servidor-mcp"
pillar: "ai"
date: "2026-07-08"
readMinutes: 8
excerpt: "Por dentro de um servidor MCP: as três primitivas do protocolo, stdio vs HTTP remoto, e os riscos de segurança que checklist de integração costuma ignorar."
tldr: "Um servidor MCP expõe tools, resources e prompts via JSON-RPC, com dois transportes principais — stdio local e HTTP remoto com streaming. A superfície de risco real não é o protocolo em si, é o que ele automatiza: descoberta dinâmica de ferramenta e execução com pouca fricção humana. Este texto detalha a arquitetura e o checklist de segurança antes de ir pra produção."
keywords: ["MCP", "arquitetura MCP", "segurança de agentes", "Model Context Protocol", "JSON-RPC"]
---

Como [já vimos ao mapear a adoção do MCP em escala enterprise](/blog/model-context-protocol-servidor-mcp.html), o protocolo passou de curiosidade técnica a infraestrutura padrão em pouco mais de um ano. O que a conversa sobre adoção não cobre é a parte que decide se um servidor MCP é seguro de publicar ou é uma porta aberta: a arquitetura por dentro, o transporte escolhido, e a superfície de ataque que o protocolo introduz por automatizar o que antes exigia fricção humana.

Publicar um servidor MCP parece, na documentação oficial, tão simples quanto expor um endpoint REST com decorator. Na prática, um servidor mal desenhado transforma qualquer agente conectado num vetor de execução com acesso amplo e pouca auditoria. Esse texto entra na camada de implementação: as três primitivas do protocolo, os dois transportes disponíveis, e o checklist de segurança antes de ir pra produção.

## As três primitivas que todo servidor MCP expõe

Um servidor MCP não expõe "uma API" — expõe três tipos de capacidade, cada um com semântica própria que o cliente descobre em tempo de execução.

- **Tools.** Funções que o modelo pode invocar com efeito colateral — criar um chamado, atualizar um registro, disparar um workflow. Cada tool é descrita em JSON Schema (nome, parâmetros, descrição em linguagem natural). É a descrição em linguagem natural, não o schema, que o modelo usa pra decidir quando chamar — e é justamente aí que entra o primeiro vetor de risco descrito mais abaixo.
- **Resources.** Dados que o cliente pode ler — um documento, uma linha de banco, um arquivo de log — endereçados por URI própria do servidor. Diferente de tool, resource não executa ação; só devolve conteúdo, que entra no contexto do modelo como qualquer outro texto.
- **Prompts.** Templates parametrizados que o servidor oferece pro cliente montar uma instrução completa — útil quando o mantenedor do sistema quer padronizar como o agente pergunta algo específico daquele domínio, em vez de deixar cada cliente reinventar o prompt.

Um servidor não precisa expor as três. Um servidor de leitura de documentação, por exemplo, só expõe resources; um servidor de automação de CRM expõe majoritariamente tools.

## JSON-RPC por baixo do capô

Toda comunicação MCP roda sobre JSON-RPC 2.0. A sessão começa com um handshake `initialize`, onde cliente e servidor trocam versão do protocolo suportada e capacidades — o servidor declara se suporta tools, resources, prompts, subscrições a mudança de recurso. Depois do handshake, o cliente lista o que está disponível (`tools/list`, `resources/list`) e invoca (`tools/call`, `resources/read`).

Essa negociação de capacidade é o que permite versionar sem quebrar cliente antigo: um servidor pode adicionar uma tool nova numa versão, e cliente que não conhece essa tool simplesmente não a lista. O problema aparece quando o servidor *muda o comportamento* de uma tool existente sem mudar o nome — cliente que aprendeu o contrato antigo continua chamando, agora com resultado diferente do esperado. Não há verificação de versão semântica embutida no protocolo; é responsabilidade de quem mantém o servidor.

## Stdio local ou HTTP remoto — dois transportes, dois riscos

MCP define transporte separado da semântica da mensagem — a mesma primitiva `tools/call` funciona sobre dois canais bem diferentes.

**Stdio** conecta cliente e servidor no mesmo processo local, via stdin/stdout. É o transporte padrão pra ferramentas de desenvolvedor (editor, CLI) rodando na mesma máquina que o agente. Não há rede envolvida — o risco de interceptação é baixo, mas o servidor herda os mesmos privilégios do processo que o invocou, o que significa que um bug de path traversal ou de injeção de comando no servidor tem acesso direto ao sistema de arquivos local.

**Streamable HTTP** (que substituiu a combinação HTTP+SSE da revisão anterior da especificação) é o transporte pra servidor remoto, multi-tenant, atendendo clientes que não compartilham processo nem máquina. Aqui a superfície muda: autenticação vira obrigatória (tipicamente OAuth 2.1), cada requisição precisa de escopo e rate limit, e o servidor precisa isolar sessão de cliente A de sessão de cliente B — sem isso, um bug de vazamento de contexto entre sessões expõe dado de um tenant pro outro.

A escolha não é estética. Servidor que só vai ser consumido localmente não precisa da complexidade de OAuth e multi-tenência. Servidor que vai ser consumido por agentes de clientes diferentes precisa, desde o primeiro deploy, de isolamento de sessão e autenticação real — retrofit depois é caro.

## Onde a maioria das implementações quebra?

O protocolo em si é simples. A superfície de risco vem do que ele automatiza: descoberta dinâmica de ferramenta e execução com pouca fricção humana entre a decisão do modelo e o efeito no mundo real. Quatro padrões de falha aparecem com frequência.

**Tool poisoning.** A descrição em linguagem natural de uma tool é, ela mesma, um vetor de prompt injection — um servidor malicioso, ou comprometido, pode descrever uma tool inofensiva de um jeito que instrui o modelo a fazer algo além do esperado. O modelo lê a descrição como instrução, não só como metadado.

**Confused deputy via OAuth pass-through.** Quando um servidor MCP repassa um token OAuth do usuário pra outro sistema downstream sem validar escopo, o agente herda permissão além do que a tarefa exige — e qualquer chamada da tool executa com privilégio total do usuário, não com o mínimo necessário pra aquela ação específica.

**Rug-pull de definição de tool.** Um cliente aprova o uso de uma tool com base na descrição vista na primeira conexão. Nada impede o servidor de alterar essa descrição — ou o comportamento por trás dela — numa conexão seguinte, sem que o cliente reavalie o consentimento original.

**Conteúdo de resource como injeção indireta.** Um resource devolve conteúdo de terceiro — um documento, um e-mail, uma página web — que entra no contexto do modelo como texto confiável. Se esse conteúdo contém instrução disfarçada, o modelo pode obedecer a ela com a mesma autoridade que obedeceria ao usuário.

> O risco do MCP não é o protocolo — é a distância que ele cria entre a decisão de um modelo e a revisão de um humano.

## Checklist antes de produção

Nenhum desses riscos é motivo pra não publicar um servidor MCP. São motivo pra publicar com controle. Seis itens separam implementação amadora de implementação pronta pra produção:

1. **Escopo mínimo por tool, nunca token de usuário completo.** Cada chamada deve carregar só a permissão necessária pra aquela ação específica — nunca repassar o token de sessão inteiro pro sistema downstream.
2. **Allow-list de clientes conhecidos**, especialmente em servidor remoto multi-tenant. Cliente novo entra em modo de observação antes de ganhar acesso a tools com efeito colateral real.
3. **Log estruturado de toda chamada de tool** — argumento, cliente, timestamp, resultado. Sem isso, um incidente não é investigável depois do fato.
4. **Revisão humana obrigatória em ações destrutivas ou irreversíveis** — deletar registro, enviar comunicação externa, mover dinheiro. Ação reversível e de baixo impacto pode rodar autônoma; o resto, não.
5. **Versionamento explícito de contrato de tool**, com changelog visível — mudança de comportamento sem mudança de identificador quebra o consentimento implícito do cliente que já aprovou aquela tool.
6. **Sanitização de conteúdo de resource antes de entrar no contexto**, tratando qualquer dado externo como não confiável até prova em contrário — o mesmo princípio que já vale pra [qualquer pipeline de RAG que lida com documento de terceiro](/blog/rag-na-pratica.html).

## A arquitetura decide o quanto você confia no agente

O ponto que fica depois desse checklist é que MCP não introduz um risco novo em essência — introduz velocidade e escala pra riscos que já existiam em qualquer integração automatizada. O que muda é que, num mundo de descoberta dinâmica de ferramenta, esses riscos deixam de ser avaliados uma vez por integração e passam a precisar de avaliação contínua — porque o conjunto de tools disponíveis pro agente pode mudar sem que ninguém do time revise de novo.

Isso é o mesmo argumento por trás de [tratar governança de agente como parte do design, não como camada posterior](/blog/privacidade-dados-llms.html): quem publica um servidor MCP hoje está decidindo, de fato, o quanto vai confiar em código que não escreveu pra agir em nome de um agente que talvez nem tenha mantido.

## Perguntas que sempre voltam

Três dúvidas que aparecem em quase toda conversa antes de publicar um servidor MCP.

## Quando usar stdio e quando usar HTTP remoto?

Stdio é pra quando cliente e servidor rodam na mesma máquina — ferramenta de desenvolvedor, editor, CLI; Streamable HTTP é pra servidor remoto e multi-tenant, atendendo agentes que não compartilham processo nem máquina. A escolha não é estética: cada transporte carrega um perfil de risco diferente.

No stdio não há rede envolvida, mas o servidor herda os privilégios do processo que o invocou — um bug de path traversal ou de injeção de comando vira acesso direto ao sistema de arquivos. No HTTP remoto, autenticação (tipicamente OAuth 2.1), escopo por requisição e isolamento de sessão entre tenants são obrigatórios desde o primeiro deploy — retrofit depois sai caro.

## Dá pra confiar na descrição das tools que um servidor expõe?

Não sem tratá-la como conteúdo potencialmente hostil. O modelo lê a descrição em linguagem natural como instrução, não só como metadado — e é exatamente por isso que tool poisoning funciona: um servidor malicioso ou comprometido descreve uma tool aparentemente inofensiva de um jeito que induz o modelo a fazer mais do que o esperado.

E o problema não termina na primeira conexão. Nada no protocolo impede o rug-pull: o servidor pode alterar a descrição — ou o comportamento por trás dela — depois que o cliente já aprovou a tool. Por isso o checklist pede versionamento explícito de contrato com changelog visível, e por isso a avaliação de risco precisa ser contínua, não feita uma vez por integração.

## Quais ações um agente pode executar sem revisão humana?

Só as reversíveis e de baixo impacto. Deletar registro, enviar comunicação externa e mover dinheiro exigem revisão humana obrigatória — é um dos seis itens do checklist de produção, e não é burocracia: o risco central do MCP é justamente a distância que ele cria entre a decisão do modelo e a revisão de um humano.

Na prática, essa regra se combina com escopo mínimo por tool (nunca repassar o token completo do usuário pro sistema downstream) e log estruturado de toda chamada. Sem log, incidente não é investigável depois do fato; sem escopo mínimo, qualquer ação do agente roda com o privilégio total de quem o autorizou.
