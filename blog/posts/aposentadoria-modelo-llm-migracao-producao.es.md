---
title: "Retiro de modelo de LLM: el incidente de producción con fecha marcada"
slug: "aposentadoria-modelo-llm-migracao-producao"
excerpt: "El retiro de un modelo de LLM es el fin del acceso a una versión que usa tu agente. Mira el calendario, qué se rompe al cambiar y cómo migrar sin incidentes."
tldr: "El retiro de un modelo de LLM es el apagado programado, por parte del proveedor, de una versión específica de modelo que tu aplicación llama por API. Llega con fecha — Anthropic se compromete a un mínimo de 60 días de aviso en modelos públicos — y cambiarlo por un sucesor nunca es solo modificar un identificador: formato de salida, tono, costo y comportamiento en casos extremos cambian. Quien mantiene inventario de modelos, una suite de evaluación corriendo y un plan de rollback convierte el retiro en tarea de rutina; quien no, descubre el problema dentro de la ventana del aviso."
keywords: ["retiro de modelo de LLM", "deprecación de modelos de IA", "migración de modelo LLM", "regresión de modelo", "versionado de modelos", "agentes de IA en producción"]
---

**Todo** modelo de lenguaje usado en producción tiene una fecha de retiro — y aun así la mayoría de los equipos lo descubre cuando llega el correo del proveedor. El retiro de un modelo de LLM es el apagado programado de una versión específica: la llamada de API que funcionaba ayer pasa a devolver error o, peor, se redirige a un sucesor que se comporta distinto. Para un agente que atiende soporte, triaje o análisis todos los días, es un incidente de producción con fecha y aviso previo — y todavía suele tratarse como imprevisto.

El tema salió del pie de la documentación en 2026. El ritmo de lanzamientos de los laboratorios acortó el ciclo de vida de cada versión, y las ventanas de aviso son cortas frente al plazo de un proyecto corporativo de IA.

## El calendario que nadie puso en la agenda

La página de deprecaciones de Anthropic [se compromete a un mínimo de 60 días de aviso](https://platform.claude.com/docs/en/about-claude/model-deprecations) antes de retirar modelos públicos en la API de la propia empresa; en nubes asociadas como Amazon Bedrock y Google Cloud, el calendario es otro y lo definen ellas. En la práctica, el plazo ronda el piso: según [la cobertura de Mixed](https://mixed-news.com/en/anthropic-deprecates-claude-sonnet-4-5-61-days-notice/), Claude Sonnet 4.5 fue marcado como deprecado el 30 de septiembre con retiro previsto para el 30 de noviembre de 2026 — 61 días.

OpenAI mantiene [una página pública de deprecaciones](https://platform.openai.com/docs/deprecations) con fechas por modelo. Los snapshots antiguos de las familias GPT-5 y o3 salen el 11 de diciembre de 2026, y varios snapshots heredados de GPT-4 y GPT-3.5 se apagan el 23 de octubre de 2026. Resúmenes de terceros indican plazos mínimos mayores para modelos de disponibilidad general (seis meses), pero no localizamos la política en la redacción del propio proveedor, y el plazo suele ser menor para versiones en preview y variantes especializadas.

Dos puntos importan más que la fecha exacta. El primero es que 60 días es menos que un trimestre: en una empresa con ciclo de cambios, aprobación de seguridad y ventana de despliegue, el plazo se esfuma en trámites antes de que alguien abra el código. El segundo es que el calendario es de cada proveedor — quien usa tres modelos de dos proveedores sigue al menos tres fechas.

> El retiro de un modelo no es sorpresa: es la única parte del ciclo de vida del agente que viene con aviso por escrito.

## Qué se rompe cuando el modelo cambia

El error más caro es tratar la migración como una actualización de versión. En software tradicional, un minor release preserva el contrato; en un modelo de lenguaje, el sucesor es otro sistema con el mismo nombre de familia. Cuatro categorías de cambio aparecen con regularidad:

1. **Formato de salida.** El nuevo modelo es más rígido o más laxo con JSON y esquemas, agrega una frase antes del bloque estructurado o cambia el orden de los campos. El parser que leía la respuesta se rompe en silencio, sin error de API.
2. **Peso de las instrucciones.** Un prompt de sistema calibrado durante meses pasa a obedecerse de otra forma. Reglas que el modelo anterior seguía por inercia dejan de valer, y restricciones que ignoraba pasan a aplicarse al pie de la letra.
3. **Longitud y tono.** Las respuestas quedan más largas o más cortas, más cautelosas o más asertivas. En atención al cliente, eso cambia el producto sin que nadie haya tocado una línea de código.
4. **Costo y latencia.** El sucesor puede tener otro precio por token y usar más tokens de razonamiento para la misma tarea. La factura cambia con el mismo volumen, lo que reabre la conversación sobre [costos reales de inferencia](/blog/es/custos-reais-de-inferencia.html).

El caso más peligroso es el alias: apuntar a un nombre genérico, sin versión fijada, significa que el proveedor puede cambiar el modelo por debajo sin aviso. Nada se rompe con estruendo; el comportamiento deriva. Fijar la versión evita el cambio silencioso, pero solo aplaza el problema — todo snapshot fijado tiene fecha final.

## La rutina que vuelve aburrido el retiro

Una consultoría especializada en agentes termina recomendando la misma disciplina, y tiene que existir *antes* del correo de aviso. Seis prácticas cubren lo esencial:

1. **Inventario de modelos.** Una planilla con cada identificador de modelo en uso, el sistema que lo llama, el proveedor, la fecha de retiro anunciada y un dueño. Parece trivial y casi ningún equipo la tiene.
2. **Versión fijada en producción.** Alias genérico solo en desarrollo. En producción, la versión es explícita y el cambio es una decisión registrada.
3. **Suite de evaluación continua.** Un conjunto de casos reales, con criterio de aprobación, corriendo contra el modelo actual. Sin esa línea base no hay forma de decir si el sucesor es mejor, igual o peor — solo si "se ve bien". Es el mismo razonamiento de [evaluar agentes con la métrica que nadie quiere publicar](/blog/es/avaliacao-de-agentes.html), aplicado al momento del cambio.
4. **Meta de migración 30 días antes de la fecha final.** Si el aviso es de 60 días, la mitad del plazo es holgura para lo imprevisto, no margen para aplazar.
5. **Despliegue por etapas.** Tráfico sombra primero, después una porción pequeña de usuarios, con un disparador de rollback definido por métrica — no por impresión.
6. **Modelo de contingencia en el mismo calendario.** Un segundo modelo, de otro proveedor o de otra familia, ya probado contra la suite. Cuando llega la fecha final sin que la migración haya terminado, existe un plan B de verdad.

El punto 3 es lo que separa a los equipos. Quien corre la evaluación por primera vez dentro de la ventana del aviso arma el instrumento y hace la medición al mismo tiempo, bajo presión de plazo.

## Arquitectura que facilita el cambio

Parte del costo de la migración es arquitectónica. Cuando el nombre del modelo está esparcido en veinte archivos y cada prompt fue escrito para las manías de una versión específica, cualquier cambio se vuelve reforma. Tres decisiones de diseño reducen ese costo:

**Una capa de enrutamiento.** Un único punto donde se decide qué modelo atiende cada tarea. Es el mismo mecanismo que sostiene [el uso de modelos pequeños en el pipeline de agentes](/blog/es/slm-pipeline-de-agentes.html): si cambiar de modelo es cambiar una configuración, el retiro deja de ser un proyecto.

**Prompts versionados junto con el modelo.** El prompt es parte del contrato. Guarda cada uno con el identificador del modelo para el que fue calibrado y el resultado de la última evaluación.

**Salida estructurada validada.** Un validador de esquema entre el modelo y el resto del sistema convierte un cambio de formato en error visible, no en dato corrupto.

Hay también un argumento de portabilidad. El retiro es una de las formas más concretas de [lock-in en plataforma de agentes](/blog/es/lock-in-plataforma-de-agentes.html): cuanto más dependen el prompt, el flujo y las herramientas de las particularidades de un modelo, más caro es salir cuando lo discontinúan. Eso no pide abstracción total — pide saber, en cada agente, cuánto cuesta cambiar.

## Preguntas que siempre vuelven

Para cerrar, las dudas más frecuentes de equipos con agentes o aplicaciones de IA en producción.

## ¿Qué es el retiro de un modelo de LLM?

El retiro de un modelo de LLM es el apagado programado, por parte del proveedor, de una versión específica de modelo ofrecida por API. Pasada la fecha final, las llamadas a esa versión fallan o se redirigen, y la aplicación debe migrar a un sucesor. El proveedor suele anunciar la fecha con antelación; Anthropic, por ejemplo, se compromete a un mínimo de 60 días de aviso para modelos públicos.

## ¿Fijar la versión del modelo resuelve el problema?

Resuelve la mitad. Fijar la versión evita que el proveedor cambie el comportamiento por debajo sin aviso, que es la forma de regresión más difícil de detectar. Pero un snapshot fijado sigue teniendo fecha final, así que la migración solo se aplaza. La práctica completa combina versión fijada, suite de evaluación continua y un calendario con la fecha de retiro de cada modelo en uso.

## ¿Cuánto tarda migrar un agente a un nuevo modelo?

Depende más de la madurez de la evaluación que del tamaño del agente. Por nuestra experiencia, con suite de pruebas lista y prompts versionados, una migración simple lleva de unos días a dos semanas, incluido el despliegue por etapas; sin suite, el mismo agente puede consumir toda la ventana de 60 días solo para armar la línea base. Es estimación nuestra, no un benchmark de mercado.
