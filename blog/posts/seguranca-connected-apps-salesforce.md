---
title: "Connected apps no Salesforce: o token OAuth esquecido é a porta aberta"
slug: "seguranca-connected-apps-salesforce"
pillar: "sf"
date: "2026-11-17"
readMinutes: 7
excerpt: "Os maiores vazamentos de Salesforce de 2025–2026 entraram por connected apps já autorizadas. Como auditar tokens OAuth sem parar integrações."
tldr: "Uma connected app é a autorização que deixa um sistema externo ler e gravar na org Salesforce via OAuth, e o token que ela recebe costuma valer até alguém revogá-lo. Entre agosto de 2025 e junho de 2026, três ataques em cadeia (Salesloft Drift, Gainsight e Klue) chegaram a dados de centenas de organizações (mais de 700 só no caso Salesloft Drift) sem explorar falha da plataforma, usando tokens de integrações confiáveis que nenhum monitoramento de login detectou. A defesa é tratar cada integração como conta privilegiada: inventário, escopo mínimo, validade curta de token, dono nomeado e revogação quando o uso acaba."
keywords: ["connected apps Salesforce", "segurança Salesforce OAuth", "token OAuth Salesforce", "integrações Salesforce", "Salesloft Drift", "auditoria de connected apps"]
---

**Connected apps no Salesforce** viraram o caminho preferido de quem quer roubar dados de CRM. Não por falha da plataforma: porque cada integração autorizada carrega um token OAuth que, por padrão, vale até alguém lembrar de revogá-lo. E quase ninguém lembra. A ferramenta de prospecção testada em 2022, o conector de pesquisa de satisfação que o marketing abandonou, a prova de conceito de um fornecedor que nunca virou contrato. Todas continuam com acesso de leitura ao dado mais completo que a empresa tem sobre clientes.

Entre agosto de 2025 e junho de 2026, isso deixou de ser hipótese. Segundo a [nota de pesquisa da Cloud Security Alliance de julho de 2026](https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/07/CSA_research_note_shinyhunters_oauth_saas_abuse_20260716-csa-styled.pdf), três ataques sucessivos usaram tokens de integrações confiáveis para extrair dados de orgs Salesforce: mais de 700 organizações via Salesloft Drift, mais de 200 instâncias via Gainsight e 195 clientes via Klue. Nenhum dos três explorou vulnerabilidade da Salesforce. Todos exploraram autorização dada e esquecida.

## Por que o ataque não aparece no monitoramento de login

O modelo mental de segurança da maioria das empresas ainda é o de pessoas fazendo login. MFA obrigatório, alerta de acesso de país estranho, bloqueio depois de tentativas erradas. Tudo isso protege a porta da frente. Uma connected app entra por outra porta.

Quando um usuário autoriza uma integração, o Salesforce emite um token de acesso e, na maioria dos casos, um **refresh token**: a credencial que permite à integração pedir novos tokens sem nenhum humano envolvido. A política padrão é que esse refresh token vale até ser revogado. Quem rouba o token herda o acesso da integração, sem senha, sem MFA, sem login novo para disparar alerta.

É por isso que, segundo a CSA, nenhum dos três incidentes foi detectado pelo monitoramento de autenticação. As consultas chegavam por sessões de connected app já autorizadas, com volume e horário parecidos com o tráfego legítimo do fornecedor. No caso Klue, a extração automatizada rodou cerca de 24 horas antes da detecção. No caso Salesloft, a janela foi de 8 a 18 de agosto de 2025, mais de uma semana.

> A integração autorizada é o perímetro que ninguém audita. O token não pede MFA, não troca de senha e não sai da empresa.

## Três incidentes, a mesma falha de governança

Vale olhar os casos de perto, porque cada um mostra um tipo diferente de integração esquecida.

**Salesloft Drift (agosto de 2025).** Os atacantes acessaram o GitHub da Salesloft ainda em março, pularam para o ambiente AWS da empresa e de lá colheram os tokens OAuth que o chatbot Drift usava para gravar leads no Salesforce dos clientes. Salesloft e Salesforce revogaram todos os tokens do Drift em 20 de agosto. O ponto incômodo: muitas das empresas afetadas usavam o Drift como chat de site, sem perceber que ele tinha acesso de leitura ao CRM inteiro.

**Gainsight (novembro de 2025).** A Salesforce detectou atividade anômala de API em aplicações publicadas pela Gainsight e desabilitou todas elas no ecossistema. Parte da cobertura indica que os atacantes reaproveitaram tokens obtidos no incidente anterior. Ou seja: um token revogado num lugar e não revisado em outro.

**Klue (junho de 2026).** O caso mais didático. A Klue tinha criado, anos antes, uma credencial para prototipar uma integração que nunca saiu do papel. Ninguém a desativou. Em 11 de junho de 2026, os atacantes usaram essa credencial de quatro anos para publicar código capaz de colher tokens OAuth de clientes e consultar a API REST do Salesforce por um dia inteiro.

O padrão comum não é técnico, é de gestão. Em todos os casos havia uma credencial durável que ninguém revisava ativamente. A mesma CSA cita sua pesquisa de 2025–2026 com 420 profissionais de segurança: 58% têm dificuldade de aplicar menor privilégio em integrações SaaS e 46% não têm visibilidade adequada de identidades não humanas, como connected apps. Na nossa leitura, isso combina com o que vemos em orgs reais, onde a lista de integrações autorizadas costuma ter o dobro do que a TI acredita existir (estimativa nossa, a partir de revisões de org).

## O que uma connected app concede de fato

Parte do problema é que a tela de autorização parece inofensiva. "Permitir acesso aos seus dados" não diz quanto. Na prática, três decisões técnicas definem o tamanho do estrago possível:

- **Escopo OAuth.** Uma integração com escopo `full` ou `api` lê tudo o que o usuário autorizador lê. Se quem autorizou foi um admin, a integração tem a visão de um admin. Escopos mais restritos existem, mas dependem de o fornecedor suportá-los.
- **Usuário por trás do token.** O token herda as permissões de quem autorizou. Integração autorizada com o login pessoal do gerente de vendas enxerga o que ele enxerga e quebra no dia em que ele sai da empresa, ou pior, continua funcionando.
- **Validade do refresh token.** "Válido até revogar" é o padrão. Expirar depois de um prazo, ou após um período sem uso, fecha a janela de tokens esquecidos sem custo para integrações ativas.

Esse terceiro ponto conversa com a [dívida técnica da automação sobreposta no Salesforce](/blog/divida-tecnica-salesforce-automacao.html): integrações que ninguém lembra existir são o mesmo fenômeno, só que com risco de vazamento no lugar de risco de regressão. E a Salesforce já reagiu na própria plataforma: desde setembro de 2025, o uso de connected apps não instaladas na org passou a ser bloqueado para a maioria dos usuários, resposta direta às campanhas de phishing por telefone que convenciam funcionários a autorizar um falso Data Loader.

## Como auditar connected apps em seis passos

Uma auditoria de connected apps não exige ferramenta nova nem projeto longo. Para uma org de médio porte, cabe em duas a três semanas de trabalho, uma estimativa nossa. A sequência que recomendamos:

1. **Levante o inventário real.** Em Setup, a página de uso de OAuth de connected apps lista cada aplicação com tokens ativos e quantos usuários a autorizaram. Exporte e cruze com a lista de contratos de software. O que não tem contrato vigente é candidato a revogação.
2. **Revogue o que não tem uso nem dono.** Prova de conceito encerrada, ferramenta substituída, fornecedor que saiu. Revogar o token, e não só desativar o usuário, é o que encerra o acesso persistente.
3. **Mude de "todos podem autorizar" para "pré-autorizado pelo admin".** Nas políticas de cada connected app instalada, restrinja o acesso a perfis ou permission sets específicos. Limite também as permissões que permitem aprovar apps não instaladas a poucos admins.
4. **Troque login pessoal por usuário de integração.** Cada integração relevante ganha um usuário dedicado, com licença de integração e permissões mínimas. Isso dá um alvo claro para monitorar e desacopla a integração da rotatividade de pessoas, o mesmo princípio de [dar ao agente de IA uma credencial própria em vez de login emprestado](/blog/identidade-agente-ia-credencial-propria.html).
5. **Encurte a validade dos tokens.** Configure expiração de refresh token por prazo ou por inatividade e restrinja faixas de IP quando o fornecedor publica as suas. Integração ativa renova sem perceber; token esquecido morre sozinho.
6. **Nomeie dono e data de recertificação.** Cada connected app tem um responsável de negócio, uma justificativa escrita e uma revisão semestral. Sem esse passo, o inventário volta a inchar em um ano.

Para orgs com Event Monitoring (incluído no Shield ou contratado à parte), vale ir além: monitorar volume de consultas por connected app, não só por usuário, e alertar quando uma integração consulta objetos que nunca consultou. É a camada que teria encurtado as janelas de ataque descritas acima.

## O que muda quando o agente pede o próprio token

A pressão sobre esse tema vai aumentar, não diminuir. Cada agente de IA que lê e age no CRM precisa de alguma autorização, e boa parte dela chega pelo mesmo mecanismo OAuth. O [marketplace de agentes e servidores MCP do AgentExchange](/blog/agentexchange-mcp-salesforce.html) torna instalar uma integração tão simples quanto instalar um app no celular, e cada instalação é mais um token a governar.

A recomendação da própria CSA é estender agora, para integrações de agentes, a disciplina que faltou nos três incidentes: dono, justificativa, recertificação e revogação automática. Quem fizer a auditoria de connected apps hoje já terá o processo pronto quando o volume de agentes crescer.

O dado do CRM é o ativo que justifica o investimento em Salesforce. Deixar o acesso a ele espalhado em tokens sem dono é aceitar que a segurança da org depende da higiene de credenciais de cada fornecedor que um dia teve acesso a ela.

## Perguntas que sempre voltam

As dúvidas que mais aparecem quando a diretoria pede uma revisão das integrações do Salesforce.

## O que é uma connected app no Salesforce?

Uma connected app é o registro que autoriza um sistema externo a acessar a org Salesforce por APIs usando OAuth. Ela define quem pode autorizar a integração, quais escopos de acesso são concedidos e por quanto tempo os tokens valem. Ferramentas de prospecção, chat, assinatura eletrônica e BI costumam se conectar dessa forma.

## Os vazamentos de Salesloft Drift e Klue foram falha do Salesforce?

Não. Segundo a Salesforce e a análise da Cloud Security Alliance, nenhum dos incidentes explorou vulnerabilidade da plataforma. Os atacantes comprometeram fornecedores que já tinham tokens OAuth válidos nas orgs dos clientes e usaram essa autorização legítima. A responsabilidade por escopo, revisão e revogação dessas integrações fica com o cliente e com o fornecedor.

## Revogar um token de connected app quebra a integração?

Quebra, se a integração estiver em uso, e é por isso que a revogação vem depois do inventário. Para integrações ativas, a revogação exige reautorizar com um usuário de integração e escopo correto, o que leva minutos. Para integrações sem uso, revogar não quebra nada e fecha uma porta que estava aberta sem motivo.
