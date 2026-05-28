---
title: "Privacidade de dados em LLMs: a checklist de governança que falta no piloto"
slug: "privacidade-dados-llms"
pillar: "ai"
date: "2026-04-01"
readMinutes: 6
excerpt: "Time piloteia LLM com dado real de cliente, sem pensar na LGPD. Em três meses, vira incidente público. Sete itens que precisam ser respondidos antes do primeiro prompt."
tldr: "Pilotos de LLM com dado de cliente são feitos sem governança de privacidade porque \"é só um teste\". Não é só um teste pra LGPD nem pra reputação. Sete itens de checklist que separam piloto responsável de passivo legal nascendo. Aplicável independente de onde o modelo roda."
keywords: ["LGPD", "privacidade", "LLM", "governança de IA", "compliance"]
---

A história tipica de incidente de IA em 2026 segue o mesmo arco. Time interno testa LLM com dado real de cliente — porque "precisa de dado realista pro POC", "vai ficar interno mesmo", "depois a gente coloca governança". O piloto vira projeto, projeto vira produto. Em algum momento, alguém percebe que dado pessoal de 15 mil clientes passou por API de vendor americano sem consentimento explícito, sem DPIA, sem registro. Isso vira incidente. Pode virar notícia. Pode virar multa LGPD.

Esse texto é o checklist de governança que precisa estar resolvido *antes* do primeiro prompt em qualquer projeto de LLM com dado real. Não é compliance burocrática — é o mínimo pra projeto não virar passivo legal.

## Por que o problema escala silenciosamente

LLM amplifica risco de privacidade de três maneiras que sistemas tradicionais não amplificavam.

**Dado entra em formato livre.** Diferente de form com campos fixos, prompt aceita qualquer coisa. Operador pode colar e-mail de cliente, transcrição de ligação, contrato inteiro. Tudo isso sai do perímetro da empresa quando vai pra API externa.

**Logs do vendor podem reter prompt.** Política varia por provider, por plano, por região. Sem checagem específica, dado sensível fica em log de terceiro por 30 dias — ou indefinidamente.

**Reuso pra treino pode acontecer.** OpenAI, Anthropic, Google têm políticas que separam API empresarial de produto consumer. Mas a configuração padrão varia, e empresa que não verifica pode estar alimentando treinamento sem saber.

Os três combinados criam superfície de risco que não existia em sistema tradicional. Subestimar isso é gerar incidente em prazo curto.

> Piloto de LLM com dado real sem governança não é "agilidade". É passivo nascendo. E ao contrário de outros passivos, esse aparece em manchete antes de aparecer em fatura.

## Os sete itens da checklist

A régua que aplicamos antes de qualquer projeto de IA com dado real. Faltando dois ou mais, o projeto não deveria sair do papel.

1. **Mapa do dado: o que vai entrar no prompt?** PII (nome, CPF, e-mail), dado sensível (saúde, financeiro), dado comercial confidencial. Escrever explicitamente. Sem essa lista, é impossível julgar risco.
2. **Base legal pra cada categoria de dado.** Consentimento, execução de contrato, interesse legítimo, ou outra. Cada categoria de dado precisa de base legal mapeada. Sem isso, LGPD virá cobrar.
3. **Política do vendor sobre retenção e treino.** Confirmação por escrito (não slide de vendedor) de que prompts não entram em treinamento, que retenção é zero ou X dias, que dado fica em região específica. Sem documento, é assunção.
4. **DPIA quando aplicável.** Avaliação de Impacto à Proteção de Dados pra usos de alto risco — IA tomando decisão sobre cliente, perfilagem, análise preditiva. ANPD vem fiscalizando isso em 2026.
5. **Pseudo-anonimização ou redaction no caminho.** Quando possível, remover ou mascarar PII antes de enviar pro LLM. Bibliotecas como Microsoft Presidio fazem isso. Reduz superfície de risco e simplifica compliance — em domínios com dado estável, [fine-tuning elimina a necessidade de índice persistente](/blog/quando-fine-tuning-supera-rag.html).
6. **Log próprio do que foi enviado.** Registro local (não do vendor) de todo prompt + resposta + usuário + timestamp. Necessário pra auditoria, pra investigação de incidente, pra responder a titular que pede info LGPD.
7. **Política de bypass humano em decisões automatizadas.** LGPD garante direito a revisão humana em decisão automatizada relevante. Sistema sério tem botão "escalar pra humano" desde o dia 1, e processo definido pra revisão.

Esses sete não são teoria — são o que vai aparecer na primeira auditoria. Empresa que tem entrega rápido. Empresa que não tem entrega rápido também, mas paga depois.

## A diferença que muda em LLM rodando interno

Pra empresas que rodam LLM próprio (on-prem, [modelo aberto auto-hospedado](/blog/open-source-vs-proprietary-llms.html), instância dedicada), parte da checklist muda. Não some.

**Vendor não está no caminho.** Itens 3 e parte do 6 (logs do vendor) somem. Mas surgem novos: governança do modelo interno, controle de acesso ao servidor, hardening.

**PII pode ser mais tolerável.** Em modelo interno bem governado, sensibilidade do dado é menor que em API externa. Mas só "menor" — não zero. Vazamento interno também é vazamento.

**Compliance regulatório continua.** LGPD não diferencia onde o modelo roda. Bases legais, DPIA, log próprio, direito de revisão — tudo continua valendo.

[Como argumentei sobre LLM como agente interno](/blog/llm-como-agente-interno.html), rodar próprio é mais seguro em uma dimensão (perímetro) mas não dispensa governança nas outras.

## A armadilha do "vamos ver o que acontece"

A frase que mata governança: "é só um piloto, depois a gente formaliza". Em 2025 ainda passava em algumas empresas. Em 2026 não passa mais. Três motivos:

**ANPD começou a fiscalizar IA especificamente.** Não é mais ameaça hipotética. Empresas no Brasil já tomaram multa por uso de LLM com dado pessoal sem base legal. A norma alemã equivalente teve casos públicos. A coisa virou real.

**Cliente começou a perguntar.** Em contratos B2B, cláusulas explícitas sobre uso de IA, sub-processadores, retenção. Empresa que não responde perde negócio antes de tomar multa.

**Mídia presta atenção.** Incidente de IA com vazamento de dado pessoal vira notícia. Reputação custa mais que multa em empresa B2C.

Esses três combinados eliminam o argumento "vamos ver". Quem ainda usa esse argumento em 2026 está medindo risco com calibragem de 2022.

## Como integrar com [avaliação de agentes](/blog/avaliacao-de-agentes.html) e [custos](/blog/custos-reais-de-inferencia.html)

Governança não é silo. Em arquitetura madura de IA:

**Eval set inclui casos de privacidade.** Perguntas que tentam fazer o agente revelar dado sensível, vazar instrução de sistema, comportar-se mal. Falha aqui é tão crítica quanto falha de acurácia.

**Custo de governança entra no cálculo de TCO.** Log próprio, redaction, monitoramento — tudo isso custa. Esquecer disso é orçar piloto com 20–30% de custo invisível.

**Auditoria periódica do que está sendo enviado.** Sample mensal de prompts reais, revisado por DPO ou time de governança. Sem isso, drift de comportamento (usuário começa a colar dado que não devia) passa despercebido.

## A decisão pra 2026

Se sua empresa está prestes a piloto de LLM com dado real, três movimentos antes do primeiro prompt:

**Checklist dos sete itens, respondido por escrito.** Não verbal em reunião — documento de 2–3 páginas, aprovado por DPO e responsável técnico. Vira artefato pra auditoria.

**Política mínima de uso aceitável.** Quem pode enviar o quê pro LLM. Quais dados são proibidos. Treinamento curto pro time. 1 hora de treinamento previne 80% dos incidentes.

**Sponsor com mandato de pausar piloto se necessário.** Quando algo der errado — e algo vai dar errado em algum piloto — alguém precisa ter autoridade pra pausar antes da escalada. Sem esse sponsor, time vai esconder problema até virar incidente.

Governança de privacidade em LLM em 2026 é parte do projeto, não fase adicional. Empresa que aceita essa lógica entrega IA responsável e cresce com confiança. Empresa que ainda trata como burocracia opcional vai estar na manchete antes de estar no business case. A diferença não está em ter compliance — está em ter compliance *desde o primeiro prompt*.
