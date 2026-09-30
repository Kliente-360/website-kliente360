---
title: "Identidade de agente de IA: o login emprestado é o maior risco"
slug: "identidade-agente-ia-credencial-propria"
pillar: "ai"
date: "2026-09-30"
readMinutes: 7
excerpt: "Identidade de agente de IA é a credencial própria, com escopo e dono, que cada agente precisa ter — e a maioria opera hoje com login emprestado de humano."
tldr: "Identidade de agente de IA é a credencial própria — com escopo mínimo, prazo de validade e um dono nomeado — que permite a um agente acessar sistemas sem se passar por uma pessoa ou por um usuário de integração genérico. Em 2026, só 16% das empresas dizem governar bem o acesso de IA a sistemas centrais como Salesforce e SAP, e menos de um quarto trata o agente como identidade distinta. O risco não está no modelo: está no login emprestado com que o agente entra no CRM, no ERP e no data warehouse."
keywords: ["identidade de agente de IA", "identidade não humana", "menor privilégio", "credenciais de agentes", "governança de agentes", "Salesforce"]
---

**Todo** agente de IA que abre o Salesforce, consulta o ERP ou lê o data warehouse entra por uma porta — e, na maioria dos pilotos, essa porta é a credencial de outra pessoa. Um token pessoal do desenvolvedor que montou o protótipo, um usuário de integração compartilhado com perfil largo, uma chave de API única que serve a todos os agentes. Funciona no piloto, passa na demonstração e vira o maior risco silencioso da operação quando o agente ganha volume. A identidade de agente de IA — a credencial própria de cada agente — é o controle que separa um piloto que escala de um incidente esperando data.

Os números de 2026 mostram o tamanho do buraco. O *2026 CISO AI Risk Report*, da Cybersecurity Insiders com a Saviynt, ouviu 235 líderes de segurança de grandes empresas dos EUA e do Reino Unido e [encontrou um descompasso](https://securityledger.com/2026/04/the-ungoverned-workforce-cybersecurity-insiders-finds-92-lack-visibility-into-ai-identities/): 71% dizem que ferramentas de IA já acessam sistemas centrais como Salesforce e SAP, mas só 16% governam esse acesso de forma efetiva. Além disso, 92% não têm visibilidade completa das identidades de IA e apenas 5% confiam que conseguiriam conter um agente comprometido.

## O agente é uma identidade, não uma funcionalidade

Uma identidade não humana é qualquer entidade que se autentica em um sistema sem ser uma pessoa: conta de serviço, chave de API, robô de integração. Agentes de IA entram nessa categoria, com uma diferença que muda o cálculo de risco — decidem o que fazer em tempo de execução. Uma conta de serviço tradicional executa um script previsível; um agente escolhe qual ferramenta chamar e com que parâmetros, e por isso o perímetro do que ele *pode* fazer precisa ser definido antes, não descoberto depois.

O State of AI Agent Security 2026, da Gravitee, ouviu 919 profissionais e apontou o mesmo padrão pelo ângulo da engenharia: só 21,9% das organizações tratam agentes como entidades com identidade própria, e 45,6% ainda usam chaves de API compartilhadas para autenticação entre agentes. O modelo mental dominante continua sendo "o agente é uma feature do sistema", quando ele funciona, para efeito de segurança, como um funcionário novo que ninguém contratou formalmente.

> Agente sem identidade própria não tem trilha de auditoria, não tem escopo e não tem botão de desligar — só tem o acesso de quem emprestou a senha.

## Os quatro atalhos de credencial que aparecem em todo piloto

Em projetos que acompanhamos, os atalhos se repetem com pouca variação. Nenhum nasce de má-fé; todos nascem da pressa de mostrar resultado:

1. **Token pessoal de quem construiu o protótipo.** O agente age com as permissões de uma pessoa específica — e deixa de funcionar, ou pior, continua funcionando com acesso indevido, quando essa pessoa muda de área ou sai da empresa.
2. **Usuário de integração compartilhado com perfil largo.** Um único usuário, muitas vezes com perfil de administrador "para não travar o teste", serve a três agentes e a duas integrações legadas. No log, tudo parece a mesma pessoa.
3. **Chave de API única entre agentes.** Um vazamento compromete todos ao mesmo tempo, e revogar a chave derruba a operação inteira — o que, na prática, faz ninguém revogar.
4. **Credencial sem prazo de validade.** O segredo criado para a demonstração fica anos em produção, num repositório ou numa variável de ambiente que ninguém audita.

O efeito comum é a perda de atribuição. Quando algo dá errado — um registro apagado, um dado sensível enviado ao lugar errado —, o log mostra uma conta genérica e a investigação começa por descobrir *qual* agente, *qual* execução e *quem* autorizou. Esse é o mesmo problema de fundo que [a observabilidade de agentes](/blog/observabilidade-de-agentes.html) tenta resolver depois do fato; com identidade própria, boa parte dele deixa de existir.

## Como é uma identidade decente de agente

Consultoria especializada em agentes acaba repetindo o mesmo conjunto de regras. Seis delas cobrem a grande maioria dos casos:

1. **Uma identidade por agente, nunca por equipe.** Cada agente tem credencial própria, nomeada de forma legível (`agente-triagem-rh`, não `svc-integracao-02`). Isso dá atribuição e permite revogar um sem derrubar os outros.
2. **Menor privilégio por tarefa, não por conveniência.** O escopo nasce do que o agente precisa fazer: ler contas, mas não excluí-las; criar casos, mas não alterar contratos. Perfil de administrador para agente é exceção que exige justificativa escrita.
3. **Credencial de curta duração.** Tokens que expiram em minutos ou horas, renovados automaticamente, limitam a janela de dano de um vazamento. Segredo estático de longa vida é o padrão a evitar.
4. **Dono nomeado.** Toda identidade de agente tem uma pessoa responsável por ela — o mesmo raciocínio de [ter um dono do agente](/blog/dono-do-agente-cargo-2026.html), aplicado à credencial. Sem dono, ninguém renova, ninguém revisa, ninguém desliga.
5. **Revogação testada.** Desligar um agente comprometido precisa levar minutos, e a empresa precisa ter ensaiado isso pelo menos uma vez. Só 5% confiam que conseguiriam conter um agente, segundo o relatório citado acima; ensaiar é o que muda esse número.
6. **Log atribuível.** Cada ação do agente registrada com o identificador do agente, a execução e a origem do pedido — o que também sustenta auditoria e conformidade.

## Identidade própria ou delegação do usuário?

Há um caso legítimo em que o agente age *em nome de* uma pessoa: o assistente que resume os e-mails de um vendedor, por exemplo. A regra segura é que o agente atue com a **interseção** das duas permissões — o que o agente pode fazer e o que aquele usuário pode ver — e nunca com a soma. Delegação sem essa trava é o padrão que [descrevemos em servidores MCP como "confused deputy"](/blog/arquitetura-servidor-mcp.html): o agente herda permissões que o usuário nunca teria concedido a uma máquina.

No ecossistema Salesforce, o ponto de atenção prático é o usuário de integração. Num projeto de agente, é tentador reaproveitar o usuário que já conecta o ERP ao CRM. Ele costuma acumular permission sets de anos de integrações, e o agente passa a herdar todos. Quanto mais antiga a org, maior a chance de o escopo real superar o necessário. Criar um usuário dedicado ao agente, com permission sets mínimos e revisáveis, custa um dia de trabalho; descobrir o excesso depois de um incidente custa bem mais.

## Por onde começar em 30 dias

Regularizar agentes já em operação não exige projeto grande. Uma sequência enxuta, em ordem de retorno:

1. **Inventariar.** Listar todo agente e toda credencial que ele usa, incluindo chaves em repositórios e variáveis de ambiente. É a etapa que mais surpreende, porque a lista real quase sempre passa da lista oficial.
2. **Separar as credenciais compartilhadas.** Quebrar cada chave ou usuário compartilhado em uma identidade por agente.
3. **Cortar escopo.** Começar pelas identidades com perfil de administrador e reduzir até o que o agente realmente usa nos últimos 30 dias de log.
4. **Colocar prazo de validade e dono.** Rotação automática onde a plataforma permite; revisão trimestral onde não permite.

Esse trabalho é o pré-requisito silencioso de tudo o que vem depois. [Uma auditoria de segurança do piloto](/blog/seguranca-de-agentes-piloto-nao-testa.html) que testa prompt injection, mas ignora com que credencial o agente age, mede a parte menos perigosa do problema.

## Perguntas que sempre voltam

Fechando, as dúvidas mais comuns sobre identidade e acesso de agentes de IA.

## O que é identidade de agente de IA?

Identidade de agente de IA é a credencial própria de um agente — conta, token ou certificado — com escopo de acesso definido, prazo de validade e um responsável nomeado. Ela permite atribuir cada ação ao agente certo, revogar um agente sem afetar os outros e limitar o que ele alcança nos sistemas da empresa.

## O agente pode usar a credencial do usuário que o acionou?

Pode, quando a delegação é explícita e limitada: o agente age com a interseção entre o que ele tem permissão de fazer e o que aquele usuário pode acessar. O que não deve acontecer é o agente herdar a credencial completa de uma pessoa, porque então ele passa a agir com privilégios que ninguém aprovou para uma máquina e a trilha de auditoria deixa de distinguir humano e agente.

## Quanto tempo leva para regularizar agentes que já estão em produção?

Depende mais do número de credenciais compartilhadas do que do número de agentes. Pela nossa experiência, o inventário leva de uma a duas semanas, a separação de identidades e o corte de escopo mais uma a três, e a rotação automática depende do que cada plataforma suporta. É estimativa nossa, não benchmark de mercado: o que muda o prazo é a existência de um dono para cada credencial.
