---
title: "Fine-tuning vs RAG vs prompt engineering: cómo decidir sin quemar caja"
slug: "fine-tuning-vs-rag-vs-prompt"
pillar: "ai"
date: "2026-02-11"
readMinutes: 6
excerpt: "Tres caminos para adaptar un LLM a tu negocio. Costos, plazos y riesgos distintos — y la elección equivocada se paga en tres a seis meses de retrabajo."
tldr: "El prompt engineering resuelve el 60% de los casos, RAG el 30%, fine-tuning un 5–10% específico. La mayoría de las empresas intenta fine-tuning antes de agotar las dos anteriores y quema caja. Criterios prácticos para elegir en el orden correcto — y la señal para subir el escalón."
keywords: ["fine-tuning", "RAG", "prompt engineering", "LLM", "adaptación de modelo"]
---

La pregunta que entra al comité de IA cada martes: "¿vamos a entrenar nuestro modelo propio?". La respuesta honesta en casi todos los casos es "todavía no — y tal vez nunca". No porque fine-tuning sea malo. Porque es la opción más cara, más lenta y más riesgosa de las tres disponibles para adaptar un LLM a un negocio específico — y casi siempre existe un camino más barato que resuelve el problema antes de llegar ahí.

Este texto es el framework de decisión entre **prompt engineering**, **RAG** y **fine-tuning**. No es técnico — es gerencial. La elección entre los tres define si el proyecto entrega valor en tres semanas o en nueve meses.

## Qué resuelve cada uno, en una frase

Antes de la regla, hace falta claridad sobre qué hace cada técnica.

**Prompt engineering** es cambiar cómo *le hablás* al modelo. Instrucción de sistema, ejemplos few-shot, estructura de respuesta. Costo: horas de quien escribe el prompt. Plazo: días. Riesgo: bajo.

**RAG (Retrieval-Augmented Generation)** es darle al modelo *contexto* que no tenía — buscar fragmentos relevantes en una base de documentos e inyectarlos al momento de la consulta. [Como argumenté sobre RAG en la práctica](/blog/es/rag-na-pratica.html), la parte difícil no es generar; es recuperar. Costo: infra + corpus + retrieval. Plazo: 4–8 semanas a producción. Riesgo: medio.

**Fine-tuning** es cambiar *el modelo* — re-entrenar pesos con tus datos propios. Costo: datos de entrenamiento curados + compute + iteración. Plazo: 2–6 meses. Riesgo: alto (el modelo puede empeorar en tareas que antes acertaba).

La diferencia no es solo técnica. Es *lo que estás dispuesto a invertir antes de saber si va a funcionar*. Prompt eng falla barato. Fine-tuning falla caro.

> La pregunta correcta nunca es "qué técnica es mejor". Es "cuál es la técnica más barata que resuelve el caso al 80%". Subís escalón solo cuando agotás el actual.

## El orden que funciona

La regla que aplicamos antes de cualquier proyecto de IA con adaptación al negocio. Siempre en ese orden.

1. **Agotar prompt engineering primero.** Antes de tocar el corpus o el modelo, intentá resolver con mejor instrucción. Ejemplos few-shot bien elegidos suben acertividad en 10–25% en casi todo caso. Estructura de respuesta forzada (JSON, lista numerada) elimina ambigüedad. Chain-of-thought explícito mejora razonamiento. Quien se saltea esta etapa invierte en RAG/fine-tuning para resolver problema que era de prompt. (El mismo principio aplica a la [ingeniería de prompts en pipelines de analytics](/blog/es/prompts-pra-analytics.html), donde el SQL generado por LLM exige el mismo rigor.)
2. **Subir a RAG cuando el modelo necesita conocimiento que no tiene.** Documento interno, política de la empresa, base de producto, historial del cliente. Si la pregunta exige un hecho que el LLM no sabe, RAG es el camino. No fine-tuning — fine-tuning enseña *patrón*, no *hecho*.
3. **Subir a fine-tuning cuando el problema es estilo, formato o dominio muy específico.** Cuando el modelo necesita escribir en la jerga de tu empresa, generar código en tu estándar interno, o responder en un formato estructurado raro. Fine-tuning cambia comportamiento; no cambia conocimiento.

El error más común: usar fine-tuning para resolver un problema de RAG ("el modelo no sabe nuestras reglas"). No va a funcionar. Un modelo fine-tuned se olvida de la mitad de las reglas a la semana siguiente o alucina respuestas plausibles sobre reglas que cambiaron.

## Costos reales — la cuenta que nadie hace

Los costos de cada técnica no son solo dinero. Son tiempo del equipo, riesgo operacional y dificultad de iterar. Vale catalogar.

**Prompt engineering — costos.** Horas de quien escribe (1–3 días por iteración). Eval set para medir antes/después (1–2 semanas para armar). Costo de inferencia por token, continuo pero chico en volumen medio. Total típico: USD 1–5 mil para correr un caso de uso decente en piloto.

**RAG — costos.** Infra de vector + indexación + retrieval (USD 100–1.000/mes según volumen). Ingeniería de pipeline (4–8 semanas de equipo sénior). Curaduría del corpus (subestimada, suele ser la mitad del esfuerzo). Mantenimiento del índice (drift del corpus, freshness). Total típico: USD 20–60 mil hasta producción, más USD 2–7 mil/mes.

**Fine-tuning — costos.** Datos de entrenamiento curados (5–15 mil ejemplos de calidad, generalmente humanos etiquetando: USD 8–25 mil). Compute de entrenamiento (USD 1–10 mil por iteración, y vas a necesitar 3–10 iteraciones). Eval riguroso (esencial — sin él, el fine-tuning empeora invisiblemente). Total típico: USD 50–250 mil hasta modelo en producción, y el modelo necesita reentrenamiento cada 6–12 meses.

El ratio que veo en la práctica: fine-tuning cuesta entre 5× y 20× más que RAG, que cuesta entre 5× y 15× más que prompt engineering. Saltearse etapas saltea ese ratio en la cuenta sin aviso.

## Las señales de que es hora de subir el escalón

Saber cuándo *parar* en cada escalón es la mitad de la decisión. Señales prácticas:

**Cuándo subir de prompt a RAG.** Cuando el modelo se equivoca por *falta de información específica* — no por estilo. Pregunta: "¿el modelo se equivocaría menos si le pegara el documento correcto en el contexto?". Si sí, RAG. Si la respuesta se equivoca por estilo, formato o razonamiento, prompt eng todavía da.

**Cuándo subir de RAG a fine-tuning.** Tres señales combinadas: (a) ya tenés RAG recuperando bien (recall@k > 80%); (b) el problema es de *cómo el modelo escribe* después de recibir el contexto; (c) tenés 5 mil+ ejemplos etiquetados de calidad del output deseado. Si falta alguna de las tres, fine-tuning no lo va a resolver.

**Cuándo *no* subir a fine-tuning, aun con presión.** Cuando el problema es de conocimiento (RAG resuelve), cuando el caso de uso cambia de mes en mes (modelo fine-tuned se vuelve deuda), cuando no tenés [protocolo de evaluación serio](/blog/es/avaliacao-de-agentes.html) (sin eval, fine-tuning es fe). Esos tres contextos cubren el 80% de los pedidos de fine-tuning que recibimos.

## El caso típico que esclarece

La historia que se repite en tres de cada cinco proyectos. La empresa quiere "entrenar nuestro ChatGPT" para responder dudas internas. El equipo técnico cotiza fine-tuning: USD 100 mil + 5 meses. El sponsor aprueba.

Tres meses después, el modelo entrenado responde bien las preguntas del eval set inicial — y mal en casi todo el resto. Diagnóstico real: el problema era de conocimiento (el modelo no tiene acceso a la política interna), no de estilo. RAG sobre los documentos lo hubiera resuelto en 6 semanas por USD 20 mil, con calidad superior. El fine-tuning ahora se vuelve pasivo de mantenimiento.

Ese caso es evitable con la regla simple de arriba. No es falta de competencia técnica; es falta de orden.

## La decisión de quien decide

Si estás en un comité discutiendo "fine-tuning o no", la pregunta correcta para hacerle al equipo técnico no es "cuál es mejor". Es: *¿ya agotamos prompt engineering? ¿ya probamos RAG?*. En el 80% de los casos, la respuesta va a ser "no en la profundidad necesaria". Ahí volvés un escalón, lo hacés bien, y la mayoría de los casos para ahí — con 1/10 del costo y en 1/4 del tiempo.

Fine-tuning es la herramienta correcta para casos específicos. Solo no es el default — y tratarlo como default es la forma más cara de demorar la entrega de valor de IA en tu empresa. (Cuando se justifica, [la elección entre open source self-hosted y proprietary cambia la ecuación de costo](/blog/es/open-source-vs-proprietary-llms.html) — vale calcular antes de comprometerse.)
