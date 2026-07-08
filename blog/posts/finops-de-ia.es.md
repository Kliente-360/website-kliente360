---
title: "FinOps de IA: cómo cobrar inferencia de LLM al cliente interno sin pelear con TI"
slug: "finops-de-ia"
pillar: "ai"
date: "2026-05-24"
readMinutes: 7
excerpt: "Inferencia de LLM tiene costo variable y atribución difusa. Sin modelo de cobro, se vuelve factura de TI a fin de mes. Cuatro modelos de FinOps de IA que funcionan."
tldr: "La adopción de IA dentro de la empresa multiplica casos de uso más rápido de lo que el presupuesto aguanta. Sin FinOps de IA — asignar costo de inferencia a quien consume — TI se vuelve el villano de la cuenta inflada y el equipo de producto no tiene incentivo para optimizar. Cuatro modelos de cobro interno que funcionan, con ventajas y trampas de cada uno."
keywords: ["FinOps de IA", "costos de LLM", "AI FinOps", "cobro interno", "inferencia"]
---

**E**n la primera fase de adopción de IA dentro de la empresa, nadie pregunta cuánto cuesta. Los pilotos son pequeños, la factura mensual cabe en el presupuesto de innovación, y la conversación es sobre si la tecnología funciona. Seis meses después, cuando cinco equipos diferentes tienen casos de uso en producción y la factura mensual se triplicó, la conversación cambia. Inevitablemente, se vuelve pelea: TI quiere que cada equipo pague lo que consume; producto quiere que TI absorba; nadie quiere ser el primero en poner un límite. (La capa técnica detrás de esto — [cómo los costos reales de inferencia explotan en producción](/blog/es/custos-reais-de-inferencia.html) — es tema complementario.)

Ese es el problema que FinOps de IA resuelve. Cobrar inferencia de LLM internamente parece simple — dividir la factura — pero es uno de los ejercicios más delicados de gobierno financiero en tecnología hoy, porque mezcla costo variable real, atribución multi-tenant e incentivos de comportamiento. Este texto enumera cuatro modelos de cobro interno, cuándo funciona cada uno, y qué evitar.

## El problema de la factura única

Sin FinOps, la factura de OpenAI, Anthropic o Bedrock llega a un único cost center — generalmente TI o Plataforma de Datos. Tres consecuencias, todas malas.

La primera es que el costo queda invisible para los equipos que deciden. El PM que elige usar GPT-4o en producción sin chequear volumen estimado paga cero de su presupuesto. El CFO que aprueba inversión de IA no ve cuánto cuesta cada caso de uso por mes. Decisión sin señal de costo genera consumo sin tope.

La segunda es que TI se vuelve el villano. Cuando la factura sobrepasa el límite, la conversación no es "cómo optimizamos ese caso de uso" — es "TI gastó de más". Se conserva la centralización de costo mientras se rompe la centralización de mérito. Equipo que entrega ROI se queda con el crédito; TI se queda con la factura.

La tercera es que no hay incentivo de optimización. PM que sabe que el costo recae en otro cost center no va a invertir tiempo en prompt engineering, en elegir modelo más barato, en cache, en [evaluar fine-tuning vs RAG vs prompt](/blog/es/fine-tuning-vs-rag-vs-prompt.html). Optimización sin dolor no sucede.

> Costo de inferencia absorbido por TI es la manera más barata de garantizar que nadie optimice nada. El equipo que paga es el que piensa en desperdicio.

## Cuatro modelos de FinOps de IA

Cuatro arquitecturas de cobro interno que vimos funcionar. Cada una es trade-off entre simplicidad contable y precisión de atribución.

**Modelo 1 — Pool central con showback.** La factura sigue llegando a TI, pero todos los meses un reporte muestra cuánto consumió cada equipo (tokens, llamadas, costo en USD). No hay débito real, pero hay visibilidad. Funciona como puente: crea conciencia sin crear proceso financiero nuevo. Limitación: showback sin chargeback raramente cambia comportamiento — es información sin consecuencia.

**Modelo 2 — Chargeback proporcional basado en volumen.** Costo total del mes se divide entre equipos proporcionalmente al volumen de tokens consumido. Fácil de implementar (sólo necesita logs con tag de team) y da señal real. Limitación: equipo que usa modelo caro (GPT-4o, Claude Opus) paga lo mismo por-token que equipo que usa modelo barato (GPT-4o-mini, Haiku). No premia la elección de modelo eficiente.

**Modelo 3 — Chargeback por costo real, con markup.** Cada llamada se loguea con modelo, input tokens, output tokens, y costo calculado en USD. El equipo es debitado por el costo real + markup de 10–20% para cubrir infra y gobierno (gateway, observabilidad, vault de claves). Es el modelo más justo y más caro de operar — exige gateway de inferencia centralizado con billing por requisición. Cuando funciona, premia al equipo que elige el modelo correcto, optimiza prompts y usa cache.

**Modelo 4 — Budget asignado upfront por caso de uso.** Cada caso de uso aprobado recibe budget mensual de inferencia (ej.: USD 2.000/mes para el agente de atención, USD 800/mes para el asistente interno de ventas). Equipo consume libremente dentro del límite; superó, necesita aprobación o throttle automático. Funciona bien en empresas con cultura fuerte de presupuesto por iniciativa. Limitación: budget mal calibrado se vuelve o freno al crecimiento o cheque en blanco.

## Cómo elegir entre los cuatro

La elección no es estética. Depende de tres variables.

**Madurez de la operación de IA.** Empresa con 1–3 casos de uso en producción y factura < USD 10k/mes: modelo 1 (showback) es suficiente. Por arriba de eso, showback se vuelve teatro. Empresa con 10+ casos de uso o factura > USD 50k/mes necesita modelo 3 (costo real) o 4 (budget) — caso contrario, la distorsión compensatoria crece.

**Cultura financiera de la empresa.** Empresas con FinOps de cloud ya maduro (chargeback por team en AWS/GCP) adaptan más rápido modelos 2 y 3. Empresas que aún tratan todo como CapEx anual de TI absorben mejor modelo 4 (budget upfront), que se parece al modelo presupuestario tradicional.

**Heterogeneidad de uso.** Si todos los casos de uso usan el mismo modelo y patrón similar de tokens (ej.: chat con prompts cortos), modelo 2 (proporcional) está OK. Si hay mezcla grande — algunos casos con input enorme (RAG sobre documentos), otros con salida larga (generación de reportes), otros usando fine-tuning — modelo 3 (costo real) es el único que evita injusticia gritante.

## Tres trampas comunes

Algunas decisiones parecen buenas en el papel y mueren en la ejecución.

La primera: **incluir costo de inferencia sin incluir costo de infra**. La factura visible de OpenAI es sólo parte del total real. Hay gateway, logging, vault de claves, observabilidad, equipo de gobierno. Esos costos prorrateados entre equipos completan la ecuación. Cobrar sólo inferencia crea sub-optimización (equipo invierte en pipeline complejo, gateway revienta, y nadie paga).

La segunda: **no taggear llamadas desde el día cero**. Sin tag de team/caso-de-uso en cada requisición, ningún modelo funciona. Setup técnico (gateway de inferencia, hook en el SDK, header HTTP) necesita estar en producción desde la primera llamada — agregarlo después implica retrofit doloroso.

La tercera: **debitar exactamente lo que el provider cobra**. Provider cambia precio (OpenAI cortó precio 4 veces en 2024–2025; puede subir también). Si el chargeback es exactamente costo real, el equipo tiene oscilación impredecible. Estabiliza con markup o snapshot mensual — previsibilidad dentro de la empresa importa más que precisión centavo-a-centavo.

## El paso cero es log con tag

Sin log de inferencia con tag de team, modelo, input/output tokens y costo calculado, nada de esto es ejecutable. Esa es la inversión técnica que desbloquea todo lo demás.

En la práctica, tres caminos: (1) gateway de inferencia self-hosted (LiteLLM, Portkey, Helicone), (2) provider-native logging (OpenAI Usage API, consola de Anthropic con tags), o (3) wrapper en el SDK que loguea en data warehouse propio. El camino (1) da mayor control y es el más común en operaciones maduras. El (3) es más liviano pero exige disciplina para que todo equipo use el wrapper.

Con log estructurado en warehouse, un dashboard de [costos reales de inferencia](/blog/es/custos-reais-de-inferencia.html) por team/caso-de-uso/modelo sale en una semana. A partir de ahí, cualquiera de los cuatro modelos es decisión de política, no de ingeniería.

## Dónde FinOps de IA falla en silencio

La señal que indica que el modelo no está funcionando: el equipo financiero sigue llamando a TI cuando la factura sube. Eso significa que la distribución de costo no llegó al nivel de visibilidad que cambia comportamiento. Diagnóstico para quien está implantando: pide a cada PM decir, sin consultar dashboard, cuánto le costó el caso de uso suyo el mes pasado. Si nadie sabe, FinOps existe en el papel, no en la decisión.

El punto de inflexión sucede cuando PM empieza a preguntar "¿ese modelo más barato funcionaría para ese caso?" antes que TI lo sugiera. Ahí el sistema está funcionando. Hasta ahí, está en fase de traducción cultural — y la traducción cultural lleva más tiempo que la implementación técnica.

## Preguntas que siempre vuelven

Tres dudas que aparecen en casi toda conversación sobre este tema.

## ¿Vale la pena implementar chargeback de IA en una operación chica?

No — con pocos casos de uso y factura baja, showback alcanza. Si la empresa tiene 1–3 casos de uso en producción y gasta menos de USD 10k/mes en inferencia, armar un proceso de débito real es burocracia desproporcionada: un reporte mensual mostrando cuánto consumió cada equipo ya crea la conciencia de costo que falta en esa fase.

Lo que no sirve es quedarte en showback para siempre. Por arriba de 10 casos de uso o USD 50k/mes, información sin consecuencia se vuelve teatro — ahí el camino es chargeback por costo real o budget por caso de uso, si no la distorsión entre equipos sigue creciendo.

## ¿Por dónde empezás si hoy nadie sabe cuánto gasta cada equipo?

Por el log de inferencia con tag — nada funciona antes de eso. Cada llamada necesita registrar team, caso de uso, modelo, tokens de input/output y costo calculado. Sin eso, cualquier modelo de cobro es adivinanza; con eso, elegir entre los cuatro se vuelve decisión de política, no de ingeniería.

En la práctica hay tres caminos: gateway de inferencia self-hosted (LiteLLM, Portkey, Helicone), logging nativo del provider, o wrapper en el SDK que escribe en tu propio warehouse. El gateway da más control y es el estándar en operaciones maduras. Y el timing importa: taggear desde la primera llamada es barato; agregarlo después es un retrofit doloroso.

## ¿Cómo sabés si el FinOps de IA está funcionando de verdad?

Por el comportamiento de los PMs, no por el dashboard. El test es simple: pedile a cada PM que diga, sin consultar nada, cuánto costó su caso de uso el mes pasado. Si nadie sabe, el modelo existe en el papel pero no llegó a la decisión — y el síntoma clásico es que finanzas siga llamando a TI cuando la factura sube.

El punto de inflexión es cuando el propio equipo de producto empieza a preguntar si un modelo más barato serviría, antes de que TI lo sugiera. Hasta llegar ahí, estás en traducción cultural — que lleva más tiempo que la implementación técnica, y es normal que así sea.
