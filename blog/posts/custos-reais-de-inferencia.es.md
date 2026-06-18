---
title: "Costos reales de inferencia: cómo evitar sorpresa de USD a fin de mes"
slug: "custos-reais-de-inferencia"
pillar: "ai"
date: "2026-03-24"
readMinutes: 6
excerpt: "POC costó USD 200 al mes. La producción llegó a USD 18.000 en el tercer mes. La diferencia rara vez es volumen — es arquitectura que nadie calibró."
tldr: "El costo de inferencia LLM en producción es difícil de prever por la naturaleza variable del consumo. Pero es evitable: cinco patrones controlan el 80% del gasto — tamaño del contexto, elección de modelo, caching, batching y protocolo de retry. Sin ellos, la factura del tercer mes explica la reunión difícil."
keywords: ["costos de inferencia", "LLM", "OpenAI", "Anthropic", "FinOps de IA"]
---

La historia que se repite a fin de cada trimestre en cualquier empresa que puso LLM en producción: el equipo celebró POC exitoso en enero, decidió expandir en febrero, recibió la primera factura de producción en marzo. El POC había costado USD 200/mes. La producción cerró en USD 18.000. La dirección pregunta cómo, y la respuesta técnica honesta es "nadie calculó de verdad". El cálculo no se hizo porque parecía trivial — *es solo multiplicar tokens por precio*. Pero lo que nadie vio en el POC se vuelve factura en el tercer mes.

Este texto va sobre los cinco patrones que controlan la mayor parte del costo de inferencia en producción. No es técnico-bajo-nivel — es lo que separa proyecto que escala económicamente de proyecto que se vuelve slide de "lecciones aprendidas".

## Por qué el cálculo del POC engaña

El POC corre en volumen bajo, con prompts controlados, en casos cuidadosamente elegidos. La producción corre en volumen real, con prompts generados dinámicamente, en casos que nadie previó. Cinco cosas distintas pasan al escalar:

- **El contexto crece.** En el POC, el prompt tenía 500 tokens. En producción, alguien agregó historial, RAG, instrucciones de seguridad. Se vuelve 3.500 tokens.
- **Aparecen casos malos.** En el POC, el agente entrega en 1 round. En producción, los casos difíciles hacen que el agente reintente 3–5 veces. El costo se multiplica.
- **Aparecen casos largos.** En el POC, la respuesta tenía 300 tokens. En producción, los usuarios alargan la conversación, la respuesta se vuelve 1.500.
- **Las fallas se vuelven costo.** Error de parse, alucinación detectada, retry automático. Cada falla cuesta tokens completos.
- **El volumen varía.** Pico del lunes genera 10× el tráfico promedio. El modelo elegido para "promedio" se atora y cuesta más por requisición.

El cálculo honesto de producción necesita multiplicar el número del POC por 5–10× — no 1.5×. Quien presupuesta con 1.5× descubre el resto en la factura.

> La diferencia entre POC y producción en costo de LLM no es volumen — es todo lo que el POC esconde: contexto inflado, retries, fallas, casos no previstos. El multiplicador realista es 5–10×.

## Los cinco patrones que controlan el gasto

Los controles que separan proyecto que escala económicamente de proyecto que sangra. No exigen herramienta nueva — exigen disciplina arquitectónica desde el inicio.

1. **Tamaño del contexto con regla dura.** Cada token de input cuesta. Sistema serio calibra: contexto fijo (system prompt) ≤ 500 tokens, contexto dinámico (RAG, historial) ≤ 2.000 tokens, con truncamiento explícito. Sin truncamiento, el contexto crece hasta el límite del modelo, y la factura también.
2. **Elección de modelo por caso de uso, no global.** Usar GPT-4o o Claude Sonnet para clasificar intent es desperdicio. Para generación de respuesta compleja, vale. Para summarización corta, modelo medio (Haiku, GPT-4o mini) entrega 90% de la calidad por 10% del precio. Sistema que usa el mismo modelo para todo paga 5–10× más que sistema con routing.
3. **Caching agresivo donde aplicable.** Prompt cache (Anthropic, OpenAI) reduce costo de input en 90% para contexto repetido. RAG cacheado para preguntas frecuentes elimina la llamada LLM entera. Implementar caching antes de producción es trabajo de 2 semanas que paga 50% de la factura.
4. **Batching en workflows asíncronos.** Batch API (Anthropic, OpenAI) cobra la mitad del precio. Workflows que no exigen tiempo real (reporte nocturno, clasificación de fila, summarización de logs) deberían usar batch — ahorro automático de 50%. Casi nadie usa porque "se olvida de implementar".
5. **Protocolo de retry inteligente.** Retry ciego en falla duplica costo. Retry inteligente (solo en falla transient, con backoff, con límite de intentos) controla. Combinado con [eval riguroso de calidad para detectar cuándo retry vale](/blog/es/avaliacao-de-agentes.html), separa costo controlado de factura explotando en silencio.

Esos cinco patrones implementados con disciplina controlan el 80% del costo. Sin ellos, cualquier elección de modelo "barato" se vuelve caro en agregado.

## La relación costo × calidad que nadie calcula

La discusión de costo de LLM suele terminar en "cambiemos al modelo más barato". Decisión equivocada en el 70% de los casos. [Incorporar comportamiento via fine-tuning en vez de inyectar contexto via RAG](/blog/es/quando-fine-tuning-supera-rag.html) es otra palanca que reduce costo por interacción sin cambiar de provider — prompt más corto más comportamiento entrenado reemplazan instrucción larga repetida en cada llamada. El cálculo correcto es costo *por interacción resuelta con éxito*, no costo por token.

Modelo barato con acertividad de 60% cuesta más que modelo caro con acertividad de 90% — porque el usuario vuelve, rehace, escala a humano. Costo total (LLM + tiempo humano + retrabajo) supera lo que parecía ahorro.

[Como argumenté sobre fine-tuning vs RAG vs prompt](/blog/es/fine-tuning-vs-rag-vs-prompt.html), la métrica que importa es total cost of ownership del caso de uso. No precio por millón de tokens.

## Qué medir desde el día 1

Cuatro métricas que dicen si estás en control del costo. Si no estás midiendo, estás perdiendo plata sin saber.

**Costo por interacción completa.** No costo por llamada — costo por interacción punta-a-punta, incluyendo retries, fallbacks, escalamientos. Es la unidad económica real.

**Distribución de tamaño de contexto.** Histograma. Si el 10% de los casos consume el 50% del costo (contexto largo), es donde invertir en truncamiento o routing.

**Razón costo / valor entregado.** En RAG: costo por pregunta respondida correctamente. En agente: costo por resolución. En generación: costo por documento aprobado. Sin esa métrica, la optimización se vuelve intuición.

**Drift de costo por release.** Todo cambio de prompt o modelo afecta el costo. Sistema serio mide y alerta cuando el costo unitario sube 20% sin motivo declarado. Sin eso, el costo erosiona en silencio.

## La trampa del "modelo más nuevo es mejor"

Septiembre de cada año el vendor lanza modelo nuevo, más capaz y — frecuentemente — más caro por token. La tentación es migrar. Antes, calculá:

**¿El caso de uso necesita la capacidad nueva?** Generación de texto técnico puede necesitar. Clasificación simple no. No cambies de modelo solo porque es el más nuevo.

**¿El precio por interacción va a subir o a bajar?** El modelo nuevo puede ser más inteligente (menos retries, menos contexto) y por lo tanto más barato en agregado, aun con precio por token más alto. Calculá antes de migrar.

**¿El modelo viejo sigue disponible?** Los modelos se deprecan en 12–18 meses. Migración forzada se vuelve proyecto, no opción. Planificá antes.

## La decisión para 2026

Si estás en una empresa con LLM en producción, tres movimientos prácticos:

**Calcular el costo unitario real, no la factura agregada.** Costo por interacción resuelta o producto entregado. Sin eso, cualquier optimización se vuelve intento a ciegas.

**Implementar los cinco patrones antes de escalar.** Truncamiento de contexto, routing por caso de uso, caching, batching donde aplicable, retry inteligente. 2–4 semanas de trabajo que ahorran 50–70% de la factura.

**Traer FinOps al stack de IA.** Como ya existe FinOps para cloud, la IA necesita el equivalente. Dashboards, alertas, ciclos de revisión. Sin eso, la factura cuenta la historia después — siempre tarde para prevenir el impacto de este trimestre. Cuando el volumen crece y múltiples equipos consumen inferencia, [el problema se vuelve asignación de costo entre equipos — FinOps de IA como disciplina de gobierno](/blog/es/finops-de-ia.html).

El costo de LLM en 2026 es controlable. Quien crece con IA y mantiene economics sano no tiene modelo secreto — tiene disciplina de cinco patrones. Quien no la tiene ve el piloto exitoso volverse factura inviable en el tercer mes de producción. La diferencia no está en el LLM. Está en el control a su alrededor.
