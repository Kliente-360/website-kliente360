---
title: "Evaluación de agentes: la métrica que nadie quiere publicar"
slug: "avaliacao-de-agentes"
pillar: "ai"
date: "2026-02-03"
readMinutes: 6
excerpt: "Los pilotos de IA agéntica mueren por falta de evaluación seria. No mueren por bug — mueren porque nadie quiso medir la tasa real de acierto."
tldr: "La mayoría de los proyectos de agente que fallan en producción fallaron en la evaluación mucho antes. El equipo mide satisfacción subjetiva y CSAT del canal — no la métrica incómoda: porcentaje de respuestas correctas en el caso de uso definido. Tres métricas, dos protocolos, una regla cultural para frenar el piloto eterno."
keywords: ["evaluación de agentes", "evals", "IA generativa", "agentes", "métricas de IA"]
---

En casi todo proyecto de agente que veo trabado después del piloto, la historia es la misma: el equipo tiene satisfacción alta en las encuestas a usuarios, buenas métricas de uso, y ningún número sobre la tasa real de acierto. Pregunto "¿en qué porcentaje de interacciones el agente respondió correctamente?", y la respuesta es silencio, o una estimación suelta — "como 80%, creo". Y ahí el proyecto no escala. No porque la tecnología no dé — porque nadie sabe si está dando, y eso impide tomar decisión sobre expansión, gobernanza o precio.

La métrica que nadie quiere publicar es el porcentaje de acierto en casos reales. Este texto va sobre por qué desaparece, cómo construirla, y cómo convivir con el número que va a mostrar.

## Por qué nadie quiere publicar

La razón es política, no técnica. Cuando un piloto de IA se vende a la dirección, la promesa suele ser implícita: "va a salir bien". Publicar la métrica real es asumir que puede salir mal — y eso amenaza el presupuesto que costó política levantar. Es más fácil mostrar gráfico de uso ("crecimos 40% en el mes"), NPS del usuario ("90% le gustó la experiencia"), tiempo de respuesta ("3 segundos promedio"). Todo eso es verdad y ninguno de esos números dice si el agente está respondiendo bien.

La consecuencia: el piloto se vuelve eterno. El equipo no logra defender la expansión porque no tiene número, y no construye el número porque defender la expansión se vuelve aún más difícil cuando aparece. El círculo vicioso tiene nombre: *teatro de IA*.

Romperlo exige decisión consciente: medir sabiendo que el número inicial va a ser incómodo. La buena noticia es que el número incómodo es trampolín — sin él, no hay próximo paso. Con él, hay camino.

## Tres métricas que importan de verdad

Las métricas de agente se dividen en tres familias. Cada una responde a una pregunta distinta, y la mayoría de los proyectos solo mide una.

**Acertividad de la respuesta (task success rate).** De los N casos en que el agente respondió, ¿en cuántos la respuesta fue correcta según un juez humano competente? Es la métrica que nadie quiere. Exige juez que conoce el dominio, protocolo de revisión, muestra estadísticamente significativa. Todo eso es trabajo — y es exactamente el trabajo que cataliza al resto.

**Cobertura (resolution rate sin escalamiento).** De los N casos que llegaron al agente, ¿en cuántos resolvió sin necesidad de escalar a humano? Ese número es más fácil de obtener — sale del log del sistema. Pero aislado engaña: el agente puede estar "resolviendo" respondiendo mal y el usuario desistiendo, lo cual cuenta como cobertura alta con baja acertividad.

**Costo por interacción resuelta.** Costo total (inferencia + infra + gobernanza) dividido por interacciones con acertividad confirmada. En proyectos con volumen, es el número que define si la unidad económica cierra. [Sin esta métrica, se puede escalar un piloto que pierde plata en cada llamada](/blog/es/quando-agente-e-resposta.html) — común cuando el equipo solo mira cobertura.

Acertividad × cobertura × costo = proyecto sustentable. Falta uno de los tres y el proyecto se vuelve hobby caro.

> Cobertura sin acertividad es la forma más barata de mentir en un dashboard de IA. El agente "resolvió" todos los casos — y respondió mal en la mitad.

## Los dos protocolos que destraban

Medir acertividad parece pesado, pero se hace con disciplina. Dos protocolos cubren el 90% de los casos.

**Eval set fijo, corrido en cada release.** Curar 50–200 preguntas representativas del caso de uso, con ground truth (respuesta correcta) revisado por especialista. Cada vez que el sistema cambia — prompt nuevo, modelo nuevo, RAG ajustado — correr el eval set y comparar contra el baseline. Ese protocolo captura regresión. Costo: alto para armar (una a dos semanas), trivial para correr. Es la inversión técnica más rentable de cualquier proyecto de IA.

**Muestreo ad-hoc de producción, revisión humana.** Seleccionar aleatoriamente 50–100 interacciones reales por semana. El especialista revisa cada una y la marca como correcta, parcialmente correcta o equivocada. Se calcula tasa de acierto por categoría de pregunta. Ese protocolo captura *drift* — cuando el sistema funciona en el laboratorio y degrada en producción (distribución de preguntas reales distinta del eval set, cambio de comportamiento del modelo, decay del corpus en [RAG](/blog/es/rag-na-pratica.html)).

Los dos juntos cubren prueba y operación. Equipo que hace solo el eval set captura regresión en el release pero pierde drift. Equipo que hace solo muestreo en producción capta drift pero no aísla causa. Los dos protocolos juntos son la parte aburrida y necesaria de la operación seria de IA.

## La regla cultural — el juez no es el equipo que construyó

Detalle que mata la métrica: si el equipo que construyó el agente es el mismo que evalúa, el número queda sesgado. No por mala fe — por sesgo cognitivo predecible. El constructor mira respuesta parcialmente correcta y tiende a marcarla como correcta ("en el fondo está bien"). El constructor sabe qué preguntó y completa mentalmente lo que el agente no dijo.

La regla que funciona: la evaluación la hace un tercero con dominio del tema, sin acceso al código ni al prompt. En proyectos chicos, es un analista de operación. En proyectos medios, es un par dedicado de revisión (rotativo si se puede). En proyectos grandes, es célula separada, reportando fuera del equipo de IA.

Sin esa separación, el número va para arriba — y el piloto sigue eterno, porque la métrica no está mostrando lo que necesita mostrar para forzar la próxima decisión.

## Qué hacer con el número incómodo

Suponé que mediste y el resultado fue 65% de acertividad. Ni bueno ni terrible. Tres caminos prácticos.

**Descomponer el error.** No basta con saber la tasa global. Categorizá: ¿qué tipo de pregunta tiene mayor tasa de error? ¿Es problema de retrieval (el corpus no tiene), de generation (el LLM ignora el contexto), o de prompt (el agente no interpretó la pregunta)? Cada categoría exige inversión distinta.

**Definir el piso aceptable por caso de uso.** Soporte de bajo riesgo, 70% puede alcanzar con escalamiento bien diseñado. Atención financiera regulada, 95% es mínimo. Ese piso es decisión de producto, no de ingeniería.

**Invertir en la capa donde duele más.** Si el error es de retrieval, mejorar reranking o ampliar corpus. Si es de generation, ajustar prompt o cambiar modelo. Si es de prompt, refinar la instrucción del agente. Iteraciones de 2–3 semanas con medición al final muestran tendencia clara.

La combinación que funciona: medición rigurosa + iteración enfocada + transparencia ante la dirección sobre el número y el camino. Ese trío es lo que separa proyecto de IA que prospera de proyecto que entra en el tercer plan de gobernanza en 2027.

La métrica incómoda no es el problema. Es la única herramienta para salir de él. (Combinada con [control riguroso del costo de inferencia](/blog/es/custos-reais-de-inferencia.html), entrega la ecuación completa de IA económica en producción.)

## Preguntas que siempre vuelven

Tres dudas que aparecen en casi toda conversación sobre evaluación de agentes.

## ¿Cuánto cuesta y cuánto tarda armar un eval set?

Una a dos semanas para armarlo — y después de eso, correrlo es trivial. El trabajo pesado es curar 50–200 preguntas representativas del caso de uso, con ground truth revisado por un especialista del dominio. Hecho eso, cada cambio del sistema (prompt nuevo, modelo nuevo, RAG ajustado) corre contra el mismo baseline en minutos.

Parece caro para un piloto, pero es la inversión técnica más rentable de cualquier proyecto de IA: sin eval set, cada release es una apuesta, y la regresión solo aparece cuando el usuario se queja. Vale recordar que no reemplaza el muestreo semanal de producción — el eval set captura regresión, el muestreo captura drift.

## ¿Qué tasa de acierto alcanza para ir a producción?

Depende del riesgo del caso de uso — y es decisión de producto, no de ingeniería. Soporte de bajo riesgo puede operar con 70% de acertividad, siempre que el escalamiento a humano esté bien diseñado. Atención financiera regulada exige 95% como mínimo. El error es no definir piso alguno y escalar a ciegas.

Y un número intermedio — digamos 65% — no es veredicto final: es punto de partida. Descomponer el error por categoría (retrieval, generation o prompt) e iterar en ciclos de 2–3 semanas con medición al final muestra si la curva sube. Lo que mata el proyecto no es la acertividad inicial baja; es no saber cuál es.

## ¿Quién debería evaluar las respuestas del agente?

Un tercero con dominio del tema — nunca el equipo que lo construyó. No es cuestión de mala fe: el constructor tiende a marcar una respuesta parcialmente correcta como correcta y completa mentalmente lo que el agente no dijo. El sesgo es predecible e infla el número, y un número inflado no fuerza la próxima decisión.

El formato escala con el proyecto: analista de operación en proyecto chico, par dedicado de revisión (rotativo si se puede) en proyecto medio, célula separada reportando fuera del equipo de IA en proyecto grande. El criterio común: el juez no tiene acceso al código ni al prompt.
