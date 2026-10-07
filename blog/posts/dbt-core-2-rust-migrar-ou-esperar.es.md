---
title: "dbt Core 2.0 en Rust y Apache 2.0: ¿migrar ahora o esperar al GA?"
slug: "dbt-core-2-rust-migrar-ou-esperar"
pillar: "data"
date: "2026-10-07"
readMinutes: 7
excerpt: "dbt Core 2.0 cambia Python por Rust y pasa a Apache 2.0. Vea qué se acelera, qué se rompe y el criterio para migrar ahora o esperar al GA."
tldr: "dbt Core 2.0 es la reescritura en Rust del motor de transformación open source de dbt Labs, publicada bajo licencia Apache 2.0 y construida sobre el mismo código del engine Fusion. La ganancia principal está en el parseo y la compilación, que se aceleran mucho en proyectos grandes; el costo está en los adapters, que deben reescribirse, en los paquetes de terceros y en las deprecaciones de v1 que pasan a ser errores. La decisión no es binaria: preparar el proyecto ahora, en v1.12, cuesta poco y sirve a todos, mientras que mover producción a 2.0 solo tiene sentido después del GA y de la cobertura de su warehouse."
keywords: ["dbt Core 2.0", "dbt Fusion", "migración dbt", "dbt Rust", "analytics engineering", "dbt v1.12"]
---

**dbt Core 2.0** es el mayor cambio en la herramienta desde que se volvió estándar de transformación en SQL: el motor sale de Python, entra en Rust, comparte código con el engine Fusion y queda entero bajo licencia Apache 2.0. La primera alpha salió el 1 de junio de 2026, y desde entonces la pregunta que llega a cualquier equipo de datos con dbt en producción es la misma: ¿migramos ahora o esperamos?

La respuesta corta es que las dos cosas ocurren a la vez. Hay un trabajo de preparación que vale empezar ya y una migración de producción que todavía merece espera. Este texto separa ambas, muestra qué cambia de verdad y propone un criterio que cabe en una conversación de media hora con el equipo.

## Qué cambió en dbt Core 2.0

Cuatro cambios definen la versión, y solo el primero aparece en los anuncios.

1. **Motor en Rust.** El parseo y la compilación, que eran el cuello de botella de los proyectos grandes, dejan de depender de Python. La instalación también se simplifica: desaparece la necesidad de gestionar un entorno virtual.
2. **Código compartido con Fusion.** Core 2.0 y Fusion usan la misma base. Fusion es el superset: agrega, por ejemplo, el parseo nativo de SQL que habilita lineage a nivel de columna y recursos de editor. Según dbt Labs, Core 2.0 es "una mejora estricta" sobre v1.
3. **Artefactos en Parquet.** Los enormes archivos JSON de manifest y resultados dan paso a Parquet, que puede consultarse directamente con DuckDB.
4. **Adapters vía ADBC.** Construir conectores para nuevos warehouses pasa por el ecosistema Arrow y ADBC, en lugar de paquetes Python.

Hay además un cambio de licencia que pesa más de lo que parece. Core 2.0 es Apache 2.0 de punta a punta. El binario de Fusion queda bajo una licencia más permisiva que la ELv2 usada al comienzo: uso gratuito local y en producción, con recursos premium habilitados por un login gratuito o una cuenta paga en la plataforma dbt. dbt Labs, que hoy opera junto con Fivetran, afirma que Core sigue siendo open source por tiempo indefinido y que los paquetes continúan públicos.

> dbt Core 2.0 cambia el motor, no el lenguaje: el SQL y el YAML del equipo siguen siendo el activo.

## Cuánto más rápido, y para quién importa

El número que circula es "30 veces más rápido". Conviene entender a qué se refiere. Según el análisis de datadriven.io, basado en los datos divulgados por dbt Labs, la ganancia está en el **parseo**: un proyecto de 10 mil modelos pasa de más de 60 segundos a menos de 600 milisegundos. La compilación del proyecto completo queda alrededor de 2 veces más rápida, y la recompilación de un solo archivo en el editor se vuelve casi instantánea. Nada de eso es tiempo de ejecución en el warehouse, que sigue dependiendo de su consulta y de su clúster.

La consecuencia práctica es que la ganancia crece con el tamaño del proyecto. En un proyecto de 500 modelos, el parseo que hoy tarda unos segundos pasa a una fracción de segundo: perceptible en el desarrollo, irrelevante en la factura. Esta es una estimación nuestra, no una medición independiente. En un proyecto de miles de modelos, con CI corriendo en cada pull request, la cuenta cambia: minutos de parseo por ejecución, multiplicados por decenas de ejecuciones al día, suman horas de espera de ingeniero.

El otro número que se menciona, una reducción de 30% o más en el costo de cómputo, viene de **dbt State**, una capa de caché paga que consolida pruebas y evita reprocesamiento; dbt Labs informa un ahorro de 64% en su uso interno. Funciona con dbt Core y Airflow desde v1.7 con plugin, y de forma nativa desde v1.12. Es un recurso de v1.x también, así que no es argumento para migrar a 2.0.

## Qué se rompe en la migración

2.0 es una mejora estricta en capacidad, pero no en compatibilidad. Cuatro puntos concentran el riesgo:

1. **Adapters.** Los adapters de v1 son paquetes Python y no funcionan en 2.0. A mediados de 2026, Snowflake, BigQuery, Databricks y Redshift estaban en preview; PostgreSQL, MySQL y Oracle todavía no estaban listos. Si su warehouse no está en la lista, la migración no empieza.
2. **Las deprecaciones pasan a ser errores.** Todo lo que v1 avisaba como deprecated pasa a fallar. El flag `--models` (y `-m`) desaparece a favor de `--select`. Los equipos que ignoraron avisos durante dos años reciben la cuenta de una sola vez.
3. **Paquetes de terceros.** `dbt_utils` y `audit_helper` ya están listos para 2.0; paquetes menores, mantenidos por una sola persona, pueden no estarlo.
4. **Manifest asimétrico.** 2.0 lee manifests de v1, pero v1 no lee los de 2.0. Cualquier herramienta que consuma el manifest (catálogo, observabilidad, orquestador) debe revisarse antes.

Del lado del soporte, v1 no se va a ninguna parte: dbt Labs dice que la migración no es forzada. v1.12, lanzada el 16 de julio de 2026, tiene soporte activo hasta el 15 de julio de 2027, y las versiones v1.3 a v1.7 salen de la plataforma el 31 de enero de 2027. Es decir, quien está en una versión antigua tiene plazo, y quien está en v1.11 o v1.12 tiene tiempo.

## Cómo decidir: preparar ahora, migrar después

La recomendación oficial de dbt Labs, con la que coincidimos, es esperar al GA para producción. La alpha existe para pruebas y para dar tiempo al ecosistema. Lo que no necesita esperar es la preparación, y sigue una secuencia de cinco pasos.

1. **Suba a v1.12.** La versión aplica temprano el comportamiento de 2.0 y trae el parser basado en Fusion. Es el punto de partida de cualquier camino.
2. **Ejecute la prueba de compatibilidad.** El comando `dbt parse --use-v2-parser` muestra qué rechaza el nuevo parser sin tocar producción.
3. **Elimine las deprecaciones.** Corrija los avisos acumulados; el paquete `dbt-autofix` automatiza buena parte de la limpieza.
4. **Haga el inventario de dependencias.** Liste adapters, paquetes y herramientas que leen el manifest, y marque cuáles tienen versión compatible con 2.0.
5. **Elija un proyecto piloto fuera del camino crítico.** Un dominio pequeño, con dueño claro, en el que un día de CI en rojo no derribe nada.

Fije también las versiones en el entorno. En la primera alpha, instalar sin versión fijada hizo que `pip` resolviera directo al pre-lanzamiento; un `dbt-core>=1.10,<2.0` evita la sorpresa.

Este trabajo de preparación tiene una propiedad útil: mejora el proyecto aunque nunca migre. [Un proyecto con descripciones, owners y contratos al día](/blog/es/dbt-na-pratica.html) es el que pasa limpio por el parser nuevo, y casi siempre es el proyecto que menos deuda de deprecación acumuló.

## Licencia abierta no elimina la dependencia de proveedor

El Apache 2.0 de Core es una buena noticia, pero hay que leer con precisión qué garantiza. Garantiza que el motor sigue libre para usar, modificar e incorporar. No garantiza que los recursos que su equipo va a querer, como el lineage a nivel de columna, la caché de dbt State y el asistente de código, queden en el código abierto. Esos quedan en Fusion y en la plataforma paga, y la propia dbt Labs recomienda Fusion como distribución estándar por tener "más capacidades listas".

Esto no es una crítica; es cómo funciona el modelo de negocio. El punto es decidir de forma consciente. [La misma lógica vale para la elección de warehouse, donde el costo de salida solo aparece después de la firma](/blog/es/databricks-snowflake-bigquery-lock-in.html), y vale para la capa de transformación, que en los últimos años concentró buena parte de la lógica de negocio de datos. Quien hoy considera a dbt "neutral" por ser open source necesita revisar la premisa: el núcleo es neutral, pero el conjunto de recursos que usted usa puede no serlo. Y, tras la fusión con Fivetran, [parte del stack que se llamaba Modern Data Stack](/blog/es/modern-data-stack-2026.html) tiene menos proveedores independientes que en 2021.

Una regla simple ayuda: si un recurso propietario entra al flujo de trabajo, regístrelo como dependencia explícita y documente la alternativa. Mantener la salida diseñada cuesta poco; redescubrirla bajo presión, no.

## Preguntas que siempre vuelven

Para cerrar, las dudas más frecuentes de equipos que usan dbt y evalúan 2.0.

## ¿Qué es dbt Core 2.0?

dbt Core 2.0 es la nueva versión major de dbt Core, reescrita en Rust y publicada bajo licencia Apache 2.0. Comparte la base de código con el engine Fusion, usa artefactos en Parquet y se conecta a los warehouses mediante adapters ADBC. La primera alpha salió el 1 de junio de 2026 y dbt Labs recomienda esperar al GA para usarlo en producción.

## ¿Necesito migrar a dbt Core 2.0 ahora?

No. v1.x sigue con soporte: v1.12 tiene soporte activo hasta el 15 de julio de 2027 y la migración no es forzada. Lo que vale la pena hacer ahora es preparar el proyecto: subir a v1.12, ejecutar `dbt parse --use-v2-parser`, eliminar las deprecaciones e inventariar adapters y paquetes. Esa preparación reduce el riesgo de la migración y mejora el proyecto de todos modos.

## ¿dbt Core 2.0 es realmente 30 veces más rápido?

El número de 30 veces se aplica al parseo, no a la ejecución en el warehouse. En proyectos de 10 mil modelos, el parseo baja de más de 60 segundos a menos de 600 milisegundos, según un análisis basado en datos de dbt Labs. La compilación completa queda cerca de 2 veces más rápida. En proyectos pequeños o medianos la ganancia existe, pero es pequeña para justificar la migración por sí sola.
