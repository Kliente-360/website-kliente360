---
title: "Ingeniería de contexto para agentes: caché, compactación y costo de memoria"
slug: "engenharia-de-contexto-agentes-cache-compactacao"
excerpt: "La ingeniería de contexto decide qué ve el agente en cada llamada. Mira cómo caché, compactación y limpieza de herramientas controlan costo y calidad."
tldr: "La ingeniería de contexto es el diseño de lo que entra en la ventana del modelo en cada llamada de un agente: instrucciones, herramientas, historial y resultados. Como el agente reenvía ese contexto completo en cada paso, domina tanto la factura como la calidad de la respuesta. Tres mecanismos lo controlan — caché de prefijo estable, limpieza de resultados de herramientas y compactación por resumen — y el orden en que se aplican importa más que la elección del proveedor."
keywords: ["ingeniería de contexto", "prompt caching", "compactación de contexto", "memoria de agentes de IA", "costo de agentes de IA", "ventana de contexto"]
---

**Un** agente de IA no tiene memoria: tiene un texto que crece. En cada paso del loop — llamar una herramienta, leer el resultado, decidir el siguiente movimiento — el historial completo vuelve al modelo como entrada. La ingeniería de contexto es el diseño de lo que entra en esa ventana en cada llamada: instrucciones, definiciones de herramientas, historial, documentos recuperados y salidas anteriores. En un chat de tres mensajes el detalle pasa inadvertido. En un agente que hace veinte llamadas para cerrar una tarea, es la mayor línea de la factura y la causa más común de una respuesta que "se pierde" a mitad de camino.

El tema se volvió práctico en 2026 porque los proveedores empezaron a ofrecer las piezas como recursos de API — caché explícito, compactación en el servidor, limpieza de resultados por regla. Lo que no vino listo es el criterio de cuándo usar cada una.

## Por qué el agente paga el contexto varias veces

El costo de un agente no viene de lo que escribe, sino de lo que relee. Un ejemplo con números nuestros, solo para dar orden de magnitud: un agente con prefijo fijo de 30 mil tokens (instrucciones, herramientas, documentos de referencia) que agrega 2 mil tokens por paso y corre 20 pasos envía, en total, cerca de 980 mil tokens de entrada. Lo que el modelo genera de salida es una fracción de eso.

Dos efectos se suman. El primero es financiero: el precio de entrada se cobra en cada reenvío. El segundo es de calidad: la documentación de Anthropic registra que [la calidad de la respuesta se degrada a medida que la conversación crece](https://platform.claude.com/docs/en/build-with-claude/compaction), y por eso mantener el contexto pequeño aparece como objetivo propio, más allá del ahorro. Contexto inflado cuesta más y entrega menos.

> El agente no paga por lo que escribe; paga por lo que relee en cada paso del loop.

Quien ya trabajó [los cinco patrones de costo de inferencia](/blog/es/custos-reais-de-inferencia.html) reconoce el problema: el truncamiento de contexto y el caché ya estaban ahí. La diferencia es que, en un agente, el contexto no es una entrada que controlas en el origen — lo produce el propio loop.

## Capa 1: caché de prefijo estable

El caché de prompt reutiliza el tramo inicial que se repite entre llamadas. Según la [documentación de prompt caching de Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), escribir en el caché de 5 minutos cuesta 1,25 veces el precio base de entrada, y leer del caché cuesta 0,1 veces en la mayoría de los modelos (menos en los más nuevos). El plazo por defecto es de 5 minutos, renovado sin costo en cada uso, con opción de 1 hora a mayor costo. Los prompts por debajo de un mínimo de tokens — que varía por modelo — simplemente no se cachean, sin error alguno.

En el ejemplo anterior, cachear solo el prefijo fijo lleva el gasto equivalente de 980 mil a unos 475 mil tokens. Cachear también el historial, de forma incremental, lo deja cerca de 180 mil. Es estimación nuestra, pero el patrón es robusto: el ahorro viene de mantener idéntico el comienzo del contexto.

Eso crea una regla de diseño que pocos respetan:

1. **Orden del contexto: de lo más estable a lo más volátil.** Instrucciones, herramientas y documentos fijos primero; historial después; la pregunta actual al final.
2. **Nada que cambie al comienzo.** Fecha y hora, ID de usuario o contador de sesión arriba del prompt de sistema invalidan todo el caché en cada llamada.
3. **Herramientas en orden fijo.** Reordenar la lista de herramientas rompe el prefijo.
4. **Revisar el uso, no la intención.** Los campos de uso de la respuesta muestran cuántos tokens se leyeron del caché; cero en ambos contadores significa que nada se cacheó.

## Capa 2: limpiar lo que devolvió la herramienta

En un agente, la mayor hinchazón rara vez es la conversación; es el resultado de herramienta. Una consulta SQL que devuelve 300 filas, una página HTML entera, un JSON de CRM con cincuenta campos que el agente nunca vuelve a consultar. Ese material queda en el historial y se relee en cada paso siguiente.

La limpieza por regla — borrar resultados antiguos de herramienta, conservar solo el rastro de que la llamada ocurrió — es la forma más segura de reducir contexto, porque no depende de que un modelo decida qué importa. La propia documentación de Anthropic separa [limpieza por regla de resumen por modelo](https://platform.claude.com/docs/en/build-with-claude/compaction) como mecanismos distintos. El riesgo es borrar el dato que un paso futuro necesitaría; por eso la regla debe ser explícita ("resultados con más de N pasos, salvo los de la herramienta X") y probada.

La mejor limpieza, sin embargo, ocurre antes: una herramienta que devuelve solo los campos pedidos, en lugar del registro completo. Es el mismo principio de [recuperar bien en lugar de generar más](/blog/es/rag-na-pratica.html) — el cuello de botella está en lo que llega al modelo.

## Capa 3: compactar por resumen, con criterio

La compactación reemplaza los turnos antiguos por un resumen escrito por el propio modelo. Según la documentación, tiene [modalidades bajo demanda y por umbral de tokens, ambas en beta](https://platform.claude.com/docs/en/build-with-claude/compaction), y permite mantener los turnos recientes literales y escribir tu propio prompt de resumen. Este último punto importa: el resumen por defecto puede descartar justo lo que un paso futuro necesita, como un identificador, una decisión del usuario o una restricción acordada al inicio.

La compactación tiene un costo oculto: el resumen reescribe el comienzo del historial y, con eso, invalida parte del caché. Un relato de ingeniería basado en evaluaciones de un producto de tutoría, [publicado por Louis Bouchard](https://www.louisbouchard.ai/context-engineering-2026/), sostiene que con caché activo mantener todo suele ser más barato, más rápido y mejor para recordar que resumir. Es un caso, no una ley — pero cambia la pregunta de "¿cuándo compactar?" a "¿qué límite concreto me obliga a compactar?".

Nuestro orden de decisión, en secuencia:

1. Reducir lo que devuelven las herramientas.
2. Estabilizar el prefijo y activar el caché.
3. Limpiar por regla los resultados antiguos.
4. Compactar solo cuando la ventana o la degradación de calidad lo exijan, con prompt de resumen propio y una lista de lo que nunca puede perderse.
5. Sacar lo permanente del contexto y guardarlo fuera (base de datos, archivo de notas), recuperándolo bajo demanda.

## Cómo saber si el contexto está funcionando

El contexto bien diseñado se mide, no se presume. Dos métricas bastan para empezar: tokens de entrada por tarea concluida (no por llamada) y tasa de lectura de caché. Para calidad, el instrumento es el mismo que para [evaluar agentes con casos reales](/blog/es/avaliacao-de-agentes.html): correr la misma suite antes y después de cada cambio de contexto, porque limpiar o compactar mal solo aparece como una tarea que falla diez pasos después. Sin la suite, optimizar contexto es una apuesta.

## Preguntas que siempre vuelven

Dudas frecuentes de equipos que empiezan a llevar agentes a producción.

## ¿Qué es la ingeniería de contexto?

La ingeniería de contexto es el diseño de lo que entra en la ventana del modelo en cada llamada de un agente: instrucciones, herramientas, historial, documentos recuperados y resultados anteriores. A diferencia de la ingeniería de prompts, que cuida la redacción de la instrucción, cuida la composición, el orden y el tamaño de todo lo que el modelo lee, y cuándo cada parte se cachea, se limpia o se resume.

## ¿El prompt caching realmente reduce el costo de un agente?

Sí, y más que en aplicaciones de una sola llamada, porque el agente reenvía el mismo prefijo muchas veces. En la documentación de Anthropic, leer del caché cuesta 0,1 veces el precio base de entrada en la mayoría de los modelos. La ganancia depende de mantener idéntico el comienzo del contexto entre llamadas; cualquier valor variable arriba del prompt anula el efecto.

## ¿Cuándo compactar el historial de un agente?

Cuando el contexto se acerca al límite de la ventana o la calidad empieza a caer en tareas largas, y después de haber reducido la salida de herramientas y activado el caché. Compactar demasiado pronto puede costar más, porque el resumen invalida parte del caché, y arriesga perder detalles que la tarea aún usa. Define qué nunca puede resumirse y mide antes y después.
