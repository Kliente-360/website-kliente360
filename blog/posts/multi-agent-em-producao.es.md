---
title: "Multi-agent en producción: qué aprendimos corriendo 5 agentes por 90 días"
slug: "multi-agent-em-producao"
pillar: "ai"
date: "2026-05-05"
readMinutes: 9
excerpt: "Diario de campo de 90 días con 5 agentes corriendo en producción. Qué funcionó, qué se rompió, y el costo real de mantener vivo un sistema multi-agent."
tldr: "Multi-agent se vende como arquitectura inevitable. En la operación real, es frágil, caro y exige musculatura organizacional que nadie anticipa. Cinco agentes corriendo juntos por 90 días nos enseñaron que coordinación, observabilidad y definición rigurosa de dominio son más críticas que la elección de framework. Este texto es el diario, con los errores nombrados."
keywords: ["multi-agent", "agentes de IA", "producción", "LLM", "orquestación de agentes"]
---

**E**n febrero de 2026, pusimos cinco agentes a trabajar juntos en un caso de uso real — no piloto, no demo, producción con SLA. En mayo, completamos 90 días de esa operación. Este texto es el diario de lo que aprendimos. No tiene moraleja triunfal — tiene el reporte de errores nombrados, decisiones revertidas, y la factura técnica que ningún white-paper de framework menciona.

El escenario: empresa B2B usando los 5 agentes para [flujo de pre-venta asistido por IA generativa](/blog/es/ia-generativa-vendas.html). Un agente extrae contexto de e-mail recibido. Otro investiga la empresa del remitente en fuentes externas. Otro clasifica intención. Otro propone próxima acción. Otro escribe borrador de respuesta. Volumen real: cerca de 3.000 interacciones/mes. Modelos usados: Claude Sonnet para los 4 primeros, GPT-4o-mini para el último. Orquestación: framework propio en Python (probamos LangGraph y CrewAI antes — volvimos a solución custom).

## Semana 1 — La ilusión de la independencia

Empezamos creyendo que cada agente sería un microservicio independiente, comunicando por contratos JSON simples. El primer problema apareció en el día 3: el agente de extracción de contexto producía output que el de clasificación de intención interpretaba mal en ~15% de los casos. No por bug — por diferencia sutil entre lo que uno consideraba "campo de asunto" y lo otro consideraba "tópico principal".

La lección: contratos de datos entre agentes no son triviales. Cada agente tiene modelo mental propio del mundo (que viene del prompt + entrenamiento + contexto de la llamada). Cuando dos agentes operan sobre el mismo concepto sin definición rigurosa compartida, divergen silenciosamente. Ese problema no aparece en demo (volumen pequeño, cherry-picking) — aparece en producción.

Solución adoptada en la semana 2: cada agente pasó a emitir output en schema JSON estricto (Pydantic en Python), con validador explícito y fallback documentado. Costo: 30% más tokens por llamada (output más verboso). Beneficio: errores silenciosos cayeron de 15% a <2%. No eliminó — redujo al punto de volverse manejable.

## Semana 3 — El costo escondido de la coordinación

Cuando tienes 5 agentes en serie, la latencia es la suma de las latencias. Cuando los tienes en paralelo, la latencia es la del más lento. En las dos configuraciones, costo es la suma de los costos. Eso es trivial en el papel. No es trivial cuando el usuario final espera respuesta en < 5s y el sistema demora 22s.

Invertimos la semana 3 entera en optimización: prefetch agresivo (agentes que pueden correr antes de la requisición final), cache local con clave por hash del input, reducción de prompt en 40% vía embedding pre-computado de contexto fijo. Latencia cayó a 7s. Aún alta. La solución real vino en la semana 4 — repensar la arquitectura.

> Multi-agent en serie es secuencia de latencias y secuencia de costos. Cada agente nuevo multiplica los dos. Quien propone sistema multi-agent sin considerar eso está vendiendo arquitectura sin tocar la factura.

## Semana 4 — Lo que matamos

En la semana 4, matamos un agente. El de "clasificación de intención" estaba produciendo output que el agente siguiente (propuesta de acción) consumía pero raramente usaba de forma diferenciada. Era costo sin entrega de valor. Removimos el agente, inlinamos la función en el agente de propuesta de acción como instrucción en el prompt, y la precisión final del sistema subió marginalmente. Redujimos costo 22% y latencia 4s.

Aprendizaje caro: agentes especializados parecen correcto en la arquitectura (principio de separación de responsabilidades), pero frecuentemente son lujo organizacional. En casos donde dos agentes contiguos tienen misma "perspectiva mental" (mismo modelo, prompts similares, output de uno entra directo en el otro), fúndelos. Cada agente extra es presupuesto — sólo vale si la especialización realmente paga.

## Semana 6 — Observabilidad era el cuello de botella real

En cualquier proyecto serio, observabilidad entra en el roadmap como "ah, después". Aquí se volvió la cosa más importante. Sin rastrear cada llamada (input, output, tiempo, costo, modelo, decisión), nada del diagnóstico de arriba habría sido hecho. Invertimos en [evals y observabilidad](/blog/es/avaliacao-de-agentes.html) tanto como en la lógica de los propios agentes.

En práctica, decidimos invertir en tres capas:

1. **Log estructurado en warehouse.** Cada llamada loguea: timestamp, agente, modelo, input (truncado en 1000 chars), output (truncado), tokens IN/OUT, costo en USD, latencia, decisión final. Sobre esa base sale dashboard de [costo real de inferencia](/blog/es/custos-reais-de-inferencia.html) por agente.
2. **Tracing distribuido.** OpenTelemetry con cada llamada de agente siendo un span. Da para ver dónde se gastó el tiempo. Sin eso, optimización se vuelve adivinanza.
3. **Eval set por agente.** 50–80 casos con gabarito. Corre en cada release. Sin eso, cambiar prompt se vuelve lotería.

Sin esas tres capas, el sistema habría parado de funcionar bien en algún momento entre las semanas 5 y 7 y nadie sabría exactamente por qué. Con ellas, logramos diagnosticar regresión dentro de 1 día.

## Semana 8 — El problema cultural

La sorpresa de medio del proyecto: el cuello de botella no era técnico. Era cultural. Los usuarios internos (vendedores) empezaron a confiar demasiado en el borrador generado por el último agente. Empezaron a aprobar respuesta sin leer. En ~6% de los casos, eso generó e-mail enviado con hecho equivocado (alucinación no detectada, o contexto extraído incorrectamente de la etapa 1).

La solución no fue mejorar el agente — fue cambiar la UI. Cambiamos para exhibir el borrador con cinco campos marcados en amarillo (entidades extraídas — nombre, empresa, valor, fecha, acción propuesta) que el vendedor tenía que confirmar individualmente antes de aprobar. Latencia humana subió (de 10s a 45s para revisar y aprobar), pero errores cayeron a <1%.

La lección más cara: agentes en producción cambian comportamiento humano. Antes de medir la métrica del agente, hay que medir la métrica del usuario usando el agente. Sistemas multi-agent que parecen óptimos en el benchmark interno fallan porque cambian lo que humano hace con el output.

## Semana 12 — La cuenta total

A los 90 días, el costo total de la operación:

| Item | USD/mes |
|---|---|
| Inferencia (5 agentes × 3.000 interacciones × 5 llamadas/interacción) | ~2.400 |
| Infraestructura (gateway, orquestación, observabilidad) | ~600 |
| Sostenimiento técnico (1 ingeniero 30% del tiempo) | ~3.500 |
| Gobierno (revisión semanal de evals, calibración) | ~1.200 |
| **Total** | **~7.700** |

Ese número no cabía en el presupuesto inicial. Cabía el ROI mensual estimado (USD ~12k en horas economizadas + deals mejor priorizados), entonces cerró la ecuación. Pero el presupuesto inicial de "unos USD 3k/mes de inferencia" estaba equivocado por más de 2× — sostenimiento y gobierno son las líneas que nadie anticipa.

## Qué haríamos diferente

Si volviéramos a la semana 1 con el conocimiento de 90 días, haríamos 5 cosas diferente.

**Empezaríamos con menos agentes.** 3 en vez de 5. Cada agente extra cuesta coordinación. Empieza minimal, agrega sólo cuando el caso de uso pruebe que sin el agente extra no funciona.

**Schema estricto desde el día cero.** Pydantic + validador entre cada agente, output en JSON con schema versionado. Cuesta 30% más tokens, evita 80% de los bugs.

**Observabilidad antes de la lógica.** Log estructurado, tracing y eval set deben existir antes del primer agente subir a producción. Construir agente sin eso es construir sistema ciego.

**Invertir en la UI tanto como en el agente.** Respuesta generada por agente necesita UI que fuerce revisión humana. Sin eso, [la tesis de "cuándo agente es respuesta" se invierte](/blog/es/quando-agente-e-resposta.html) — el agente pasa a ser problema enmascarado.

**Presupuestar 3× el costo inicial estimado.** Inferencia es parte. Sostenimiento, gobierno, observabilidad y costos de cloud suman el resto. Presentar la cuenta llena desde el día 1 es lo que evita renegociación amarga en el mes 6.

## La pregunta que desbloquea

Multi-agent funciona. Pero funciona caro, con fragilidad real, y exigiendo equipo con músculo de operación continua. Antes de proponer sistema multi-agent a un cliente, la pregunta que desbloquea la decisión es: ¿tienes equipo que va a cuidar de esto por 12 meses sin reclamar? Si la respuesta es no, la recomendación honesta es simplificar — quizás un agente único bien diseñado entregue 70% del valor con 30% de la complejidad.

Casos donde multi-agent compensa: volumen alto (> 5.000 interacciones/mes), valor por interacción alto (cada error es caro), y existencia de equipo técnico dedicado. Fuera de eso, es arquitectura de paper — bonita, citable y cara de mantener.

90 días después, mantenemos los 4 agentes restantes en producción, con costo previsible y métricas confiables. Pero la versión honesta de la historia no es "salió bien" — es "salió bien después de revisar arquitectura 3 veces, matar 1 agente, e invertir en observabilidad que nadie vendió como prioridad". Esa es la manera real de sistemas multi-agent salir adelante.

## Preguntas que siempre vuelven

Tres preguntas que todos hacen después de leer este diario — con las respuestas que dieron los 90 días.

## ¿Cuánto cuesta mantener un sistema multi-agent en producción?

En nuestro caso, cerca de USD 7.700 por mes — más del doble del presupuesto inicial de "unos USD 3k de inferencia". Inferencia fue solo ~2.400; el resto vino de infraestructura (~600), sostenimiento técnico con un ingeniero al 30% del tiempo (~3.500) y gobierno de evals (~1.200). Sostenimiento y gobierno son las líneas que nadie anticipa.

La regla práctica que quedó: presupuesta 3× el costo inicial estimado. Presentar la cuenta llena desde el día 1 es lo que evita renegociación amarga en el mes 6 — en nuestro caso, la ecuación solo cerró porque el ROI mensual estimado (~USD 12k) cubría el total.

## ¿Con cuántos agentes conviene empezar?

Con menos de los que crees — si volviéramos a la semana 1, empezaríamos con 3 en vez de 5. Cada agente extra es presupuesto de coordinación: suma latencia, suma costo y crea un contrato de datos más para fallar silenciosamente. En la semana 4 matamos un agente cuyo output raramente era usado, y el sistema quedó 22% más barato, 4s más rápido y marginalmente más preciso.

El criterio para fundir: cuando dos agentes contiguos tienen la misma "perspectiva mental" — mismo modelo, prompts similares, output de uno entrando directo en el otro —, la especialización es lujo, no arquitectura. Empieza minimal y agrega agente solo cuando el caso de uso pruebe que sin él no funciona.

## ¿Vale la pena multi-agent para mi empresa?

Vale si tienes volumen alto (más de 5.000 interacciones/mes), valor alto por interacción y equipo técnico dedicado que va a cuidar el sistema por 12 meses sin reclamar. Fuera de esas tres condiciones, es arquitectura de paper — bonita, citable y cara de mantener.

Si la respuesta a alguna es no, la recomendación honesta es simplificar: un agente único bien diseñado tiende a entregar 70% del valor con 30% de la complejidad. Multi-agent funciona — pero funciona caro, con fragilidad real, exigiendo observabilidad y músculo de operación continua que ningún white-paper de framework menciona.
