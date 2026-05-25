---
title: "Mapear processos antes do Salesforce: o checklist que economiza meses"
slug: "mapear-processos-antes-do-salesforce"
pillar: "sf"
date: "2026-01-06"
readMinutes: 6
excerpt: "Implantar Salesforce sem mapear processo é pagar duas vezes: uma na consultoria, outra no retrabalho. O checklist que separa rollout caro de rollout que rende."
tldr: "A maioria dos projetos de Salesforce trava no mês 4 — não por bug, por processo que ninguém escreveu. Mapear antes de configurar é o trabalho mais barato do projeto inteiro. Sete perguntas, três artefatos, uma régua para validar quando dá pra começar a clicar no Setup."
keywords: ["Salesforce", "implementação Salesforce", "mapeamento de processos", "discovery", "CRM"]
---

A pergunta que define se um projeto de Salesforce vai cumprir prazo não é "quanta licença vamos comprar". É "quem desenhou o processo que essa licença vai automatizar". Em sete de cada dez kickoffs que entram aqui depois de já estarem atrasados, o diagnóstico é o mesmo: começou a configurar antes de entender. Em algum momento alguém abriu o Setup com a sensação de que mapear era *enrolação* — e três meses depois o time inteiro paga essa pressa em retrabalho.

Esse texto é o checklist que a gente usa antes de tocar em qualquer org. Não é metodologia proprietária, não é framework com nome. É o mínimo de discovery que separa rollout que rende de rollout que vira "projeto vivo" pelos próximos dois anos.

## Por que o processo costuma estar implícito

Em quase toda empresa de médio porte, o processo de venda, atendimento ou pós-venda **existe na cabeça de três pessoas**. Um vendedor sênior sabe quando dá desconto, o gerente sabe quando aprovar exceção, o time de operações sabe qual lead é "lixo" sem precisar abrir. Nada disso está escrito em lugar nenhum — funciona porque essas três pessoas estão na mesma sala (ou no mesmo WhatsApp) há anos.

Salesforce não tem cabeça. Tem objeto, campo, regra de validação, flow. Pra ele decidir, alguém precisa escrever a decisão. E é aí que o projeto trava: não no técnico, no *não-escrito*. O consultor pergunta "quando o lead vira oportunidade?" e recebe três respostas diferentes. Cada uma vira um caminho no flow. O flow vira labirinto. O usuário desiste.

> Salesforce não automatiza processo: automatiza a versão escrita do processo. Se a versão escrita não existe, o projeto está inventando processo, não implantando CRM.

A diferença entre projeto barato e projeto caro mora exatamente aqui. Mapear antes custa duas a quatro semanas. Mapear depois — quando o usuário já reclamou, o sponsor já cobrou, o consultor já configurou — custa três a seis meses.

## Sete perguntas antes de abrir o Setup

A régua que aplicamos em todo kickoff. Se a resposta a três ou mais é "não temos isso documentado", **paramos** — discovery vira sprint dedicada antes de qualquer configuração.

1. **Qual é o caminho feliz, em passos numerados?** Lead chega, qualifica, vira oportunidade, fecha, vira conta. Escreva os passos. Não os subprocessos — os passos. Se passa de 12, está descrevendo dois processos misturados.
2. **Quais são os três caminhos não-felizes mais comuns?** Lead reclama, oportunidade trava em aprovação, conta volta pra renegociação. Esses caminhos cobrem 60–70% do volume real. Se ninguém sabe quais são, ninguém olhou o histórico.
3. **Quem decide o quê, em cada passo?** Quem aprova desconto acima de X. Quem reabre oportunidade fechada-perdida. Quem muda o owner de uma conta estratégica. Cargo, não nome.
4. **Qual o SLA real (não o prometido) em cada etapa?** Tempo médio que lead fica no estágio Qualificação hoje. Tempo médio de aprovação de proposta. Se ninguém mede, Salesforce vai expor isso no primeiro mês — geralmente em reunião de board. (E [SLA mal calibrado em Service Cloud nasce desse mesmo gap entre promessa e capacidade](/blog/service-cloud-sla-nao-e-decoracao.html).)
5. **Que dado precisa estar preenchido pra um registro avançar?** Nem todo campo importa em todo estágio. Mas pelo menos 3–5 campos por estágio são obrigatórios pro processo fazer sentido. Quais?
6. **Quais sistemas alimentam ou consomem esse processo?** ERP, billing, marketing automation, planilha do financeiro. Integração mal mapeada é a causa #1 de atraso no go-live. Em arquiteturas Salesforce modernas, [Data Cloud entra como camada de contexto que unifica parte desses sistemas](/blog/data-cloud-nervo-central.html) — mas só funciona se o processo abaixo dela estiver desenhado.
7. **Quem vai usar isso no dia a dia, e o que essa pessoa faz em 5 minutos?** O processo precisa caber no fluxo de trabalho real do usuário, não no fluxo ideal do consultor. Se a vendedora abre Salesforce 20 vezes por dia, cada tela tem que servir aos 20 momentos — não aos 20 estágios.

Quem responde os sete sem hesitação está pronto pra configurar. Quem hesita em três ou mais ainda está em discovery, mesmo que o cronograma diga o contrário — e tende a cair em [um dos cinco antipadrões clássicos de Sales Cloud](/blog/sales-cloud-cinco-antipadroes.html) na fase seguinte.

## Os três artefatos que valem a pena produzir

Discovery não precisa virar livro. Três artefatos resolvem 90% do que o time de configuração vai precisar.

**Mapa de processo em uma página.** Diagrama linear (não fluxograma com mil decisões) dos estágios do caminho feliz, com SLA esperado em cada um e os três caminhos alternativos saindo dos pontos de decisão. Em uma página. Se não cabe, está detalhado demais — vai virar manual que ninguém lê. A regra: se a vendedora sênior olha e reconhece o trabalho dela, está pronto. Se ela diz "isso aqui não é como funciona", o mapa ainda é fantasia.

**Matriz de campos por estágio.** Tabela simples: linhas são os campos do objeto, colunas são os estágios, células indicam *obrigatório*, *opcional*, *somente leitura* ou *escondido*. Esse documento vira input direto pra page layouts, validation rules e regras de transição. É o artefato que mais economiza tempo na configuração — e o mais frequentemente pulado.

**Lista de integrações com responsável e SLA.** Cada sistema que troca dado com Salesforce, qual direção (entrada, saída, bidirecional), qual frequência (real-time, hora em hora, diário), quem é dono do lado externo, e o que acontece quando a integração quebra. Sem essa lista, integração vira projeto-dentro-do-projeto e atrasa todo mundo.

Esses três artefatos cabem em duas a três semanas de trabalho focado com 4–6 pessoas. É o investimento mais barato do projeto inteiro, e quase sempre o primeiro a ser cortado quando o sponsor quer "começar logo".

## A armadilha do "depois a gente ajusta"

O argumento contra mapeamento sério costuma ser: *"vamos colocar o básico no ar, depois ajustamos com o uso real"*. Em teoria, ágil. Na prática, três armadilhas se repetem:

- **O básico vira definitivo.** Usuário aprende o fluxo errado, processo se cristaliza, refazer custa mudança de comportamento — muito mais caro que mudança de config.
- **Métricas saem distorcidas desde o dia 1.** Se o estágio "Qualificação" significa coisas diferentes pra cada vendedor, o funil reportado é ficção. Diretoria toma decisão em cima de ficção por seis meses.
- **A primeira integração quebra a confiança.** Quando o pedido não bate no ERP porque ninguém mapeou a regra de tax exemption, o time questiona o projeto inteiro — não a integração específica.

Ajuste contínuo é saudável. Pular discovery não é ajuste contínuo, é dívida técnica nascendo capitalizada.

## Como apresentar o checklist pro sponsor

Sponsor executivo costuma ver discovery como custo, não investimento. A conversa que funciona é mostrar o trade-off em números concretos: cada semana de mapeamento bem feito evita cerca de quatro a seis semanas de retrabalho pós go-live. A conta sai positiva já no primeiro caminho alternativo que o time evitou descobrir em produção.

Outra forma de enquadrar: discovery não é fase do projeto Salesforce, é o projeto de **definir o processo que o Salesforce vai sustentar**. Se a empresa decidir que não vale fazer, a pergunta seguinte não é "como reduzir discovery?", é "por que estamos comprando licença pra um processo que ninguém quer escrever?". Geralmente essa pergunta sozinha destrava o orçamento — ou abre [a conversa honesta sobre quando NÃO usar Salesforce](/blog/quando-nao-usar-salesforce.html), porque mapeamento bem-feito às vezes mostra que a ferramenta certa pra esse momento é outra.

O melhor projeto de Salesforce é o que parece chato no mês 1 — porque o time está escrevendo, desenhando, validando — e impressiona no mês 4, quando o go-live acontece sem o circo de incidentes que virou normal no mercado. Discovery não é a parte glamorosa. É a parte que faz a configuração ser previsível, e previsibilidade é o que o sponsor compra quando contrata Salesforce. (Junto disso, [estratégia de sandbox bem desenhada](/blog/sandbox-strategy.html) e [escolha cuidadosa do partner Salesforce](/blog/salesforce-partner-program.html) fecham o trio que define rollout sólido.)
