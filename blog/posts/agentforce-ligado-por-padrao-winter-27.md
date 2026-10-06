---
title: "Agentforce ligado por padrão: o que o admin precisa decidir no Winter '27"
slug: "agentforce-ligado-por-padrao-winter-27"
pillar: "sf"
date: "2026-10-06"
readMinutes: 7
excerpt: "No Winter '27 a Salesforce liga o Agentforce sozinha nas edições elegíveis. Nenhum agente roda, mas quem pode construir um passa a ser decisão sua."
tldr: "Auto-habilitação do Agentforce é a mudança do Winter '27 em que a Salesforce ativa a plataforma de agentes por padrão nas edições Enterprise, Performance, Unlimited e Agentforce 1, sem ação do administrador e sem custo adicional. Ligar a plataforma não coloca nenhum agente em operação nem gera consumo: o que muda é que quem tiver a permissão Manage AI Agents passa a poder construir agentes sobre os dados da org. A decisão que sobra pro admin é de governança — quem constrói, sobre quais dados e com qual dono — e ela precisa ser tomada antes da janela de upgrade, não depois."
keywords: ["Agentforce Winter '27", "auto-habilitação Agentforce", "Manage AI Agents", "governança Salesforce", "Salesforce release", "Agentforce admin"]
---

**Agentforce** deixou de ser algo que o administrador liga. Na release Winter '27, a Salesforce habilita a plataforma de agentes sozinha nas orgs elegíveis, e o interruptor correspondente sai do Setup. Para quem administra uma org Enterprise, Performance, Unlimited ou Agentforce 1, a pergunta deixou de ser "vamos adotar?" e virou "quem pode construir um agente a partir de agora?".

O assunto gerou mais ruído do que a mudança merece, nos dois sentidos. Há quem trate como o início da IA descontrolada na org, e há quem diga que não muda nada. Nenhuma das duas leituras está certa. A mudança é pequena na técnica e grande na governança, porque tira da frente o último ponto em que alguém precisava decidir de propósito.

## O que a auto-habilitação liga — e o que deixa desligado

A Salesforce vem aplicando a mudança de forma gradual desde o início de setembro de 2026, com as ondas de produção do Winter '27 indo até meados de outubro. A data da sua org está na aba de manutenção do Salesforce Trust, não numa lista pública. Segundo a cobertura da [Salesforce Ben](https://www.salesforceben.com/salesforce-to-auto-enable-agentforce-in-winter-27-what-that-means-for-you/) e de parceiros que testaram o preview, o que acontece e o que não acontece é bem delimitado:

1. **Liga:** a plataforma Agentforce fica disponível, e o Agentforce Builder abre para quem já tem permissão de construir, em orgs onde a IA generativa da Einstein já estava ativa.
2. **Não liga nenhum agente:** cada agente continua inativo até alguém construí-lo e ativá-lo. Nenhum agente passa a responder cliente sozinho.
3. **Não ativa canais:** nada é publicado em chat, WhatsApp ou e-mail por causa da mudança.
4. **Não altera permissões de usuário nem cobrança:** a Salesforce afirma que a habilitação não tem custo adicional. O consumo começa quando um agente de fato executa trabalho.

Tudo isso é verdade e tranquilizador. O que a lista não diz é que o gargalo de adoção sai de lugar. Antes, "nunca ligamos" funcionava como política informal de governança. Agora essa política deixa de existir sem que ninguém a tenha revogado.

> Quando a plataforma vem ligada por padrão, a ausência de decisão vira uma decisão — tomada pela Salesforce, não por você.

## Onde a decisão passa a morar

Com o interruptor fora do caminho, o controle real se distribui em três camadas, e é nelas que um administrador deve olhar:

**O interruptor mestre.** A configuração de Einstein, na página de Setup correspondente, continua desligando a plataforma inteira. Para a maioria das empresas, desligar tudo não é a resposta certa, mas vale saber que a saída existe e que ela é deliberada.

**A permissão Manage AI Agents.** Ela define quem, além dos administradores, pode construir agentes. É a camada mais importante e a mais negligenciada: em muita org, permissões criadas em ciclos anteriores foram distribuídas por perfil sem revisão. Quem a tem pode montar um agente que lê e age sobre os dados que o próprio usuário enxerga.

**A ativação, agente por agente.** Nenhum agente funciona sem ser ativado, e é aí que a governança de verdade acontece, porque cada ativação é um evento que pode exigir aprovação, dono e critério de aceite.

Há um quarto ponto fácil de esquecer: o agente padrão que acompanha a plataforma. Convém abrir e conferir o estado dele antes da janela, em vez de descobrir depois.

## A lista de seis itens para antes da janela de upgrade

Consultorias e parceiros publicaram checklists parecidos nas últimas semanas. A versão que usamos com clientes cabe em seis passos, na ordem em que costumam render mais:

1. **Descubra a data real da sua org** no Salesforce Trust e trate essa data como prazo de governança, não de TI.
2. **Revise quem tem Manage AI Agents** e reduza a lista a quem você aceitaria ver construindo um agente em produção. Se ninguém tem esse perfil hoje, a resposta é uma só pessoa nomeada, não "o time de admins".
3. **Decida sua posição, por escrito:** "ligamos e controlamos pela permissão" ou "mantemos desligado até existir um primeiro caso de uso". As duas são defensáveis; a indefinição não.
4. **Reabra a segurança em nível de campo** dos campos sensíveis. Um agente herda o acesso de quem o constrói e do contexto em que roda, então um campo de CPF ou de margem que "ninguém olhava" passa a ter um leitor automático.
5. **Teste no sandbox de preview** o que mudou, incluindo as outras atualizações obrigatórias da release que não têm nada a ver com IA, como a nova exigência de permissão para autenticação via SOAP em usuários de integração.
6. **Escolha o primeiro caso de uso com dono nomeado** antes que alguém escolha por conta própria. Um agente sem dono é o ponto de partida do que descrevemos em [dono do agente](/blog/dono-do-agente-cargo-2026.html).

## O custo que a mudança não mostra

A afirmação de que ligar não custa nada é correta e incompleta. Habilitar não gera consumo, mas o consumo de Agentforce existe e a conta cresce com o uso, não com a licença. Empresas que já têm [Salesforce Foundations e acesso gratuito a parte do Agentforce](/blog/salesforce-foundations-o-que-cobre-de-verdade.html) sabem como o crédito inicial some rápido, e a [diversidade de modelos de preço do Agentforce](/blog/agentforce-pricing-seis-modelos.html) torna difícil prever o gasto de um agente que ninguém planejou.

O risco concreto da auto-habilitação não é a fatura de outubro. É um administrador entusiasmado, ou um parceiro de implantação com acesso, construindo um agente de teste que fica ativo, consumindo crédito e lendo dados, sem que o orçamento ou a segurança tenham sido consultados. Pelo mesmo motivo, vale monitorar o consumo de crédito de IA já no primeiro mês, mesmo que a expectativa seja zero.

## Decisão boa não precisa ser rápida, precisa ser consciente

Nada aqui pede pânico, e nada pede ignorar. Em empresas médias, o que funciona é tratar o Winter '27 como um prazo para uma conversa curta e específica entre TI, segurança e a área dona do processo, e sair dela com três respostas: quem constrói, sobre quais dados e quem responde pelo resultado. Uma hora de reunião e uma revisão de permissões evitam a maior parte dos problemas que a mudança poderia trazer.

## Perguntas que sempre voltam

As dúvidas mais comuns de quem está se preparando para a auto-habilitação do Agentforce.

## O Agentforce vai ser cobrado só porque foi ligado automaticamente?

Não. A Salesforce afirma que a auto-habilitação não tem custo adicional e não altera os contratos de cobrança existentes. O consumo começa quando um agente é construído, ativado e executa trabalho, como resolver um caso ou qualificar um lead. Por isso o ponto de atenção não é a habilitação em si, mas quem consegue ativar um agente e se há alguém acompanhando o consumo de crédito.

## Dá para desligar o Agentforce depois da auto-habilitação?

Sim. A configuração de Einstein, na página de Setup, continua funcionando como interruptor mestre e desativa a plataforma inteira. Em geral é mais útil manter a plataforma ligada e restringir a permissão Manage AI Agents, que controla quem pode construir agentes, mas a opção de desligar existe e pode ser a escolha certa enquanto a empresa define sua política.

## Preciso fazer algo antes da janela de upgrade do Winter '27?

Precisa, e pouca coisa: confirmar a data da sua org no Salesforce Trust, revisar quem tem a permissão Manage AI Agents, conferir a segurança em nível de campo dos dados sensíveis e testar a release no sandbox de preview. Nenhum desses passos exige projeto, mas todos são mais baratos antes da janela do que depois que alguém já construiu o primeiro agente.
