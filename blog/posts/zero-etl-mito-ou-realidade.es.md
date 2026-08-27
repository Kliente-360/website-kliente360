---
title: "Zero-ETL: ¿la promesa de matar el pipeline es real o marketing de hyperscaler?"
slug: "zero-etl-mito-ou-realidade"
pillar: "data"
date: "2026-07-28"
readMinutes: 8
excerpt: "Zero-ETL promete eliminar el pipeline entre base de datos y warehouse. Elimina el conector a medida — no el modelado ni el lock-in entre las dos puntas."
tldr: "Zero-ETL es la replicación nativa y casi en tiempo real entre una base de datos transaccional y un warehouse analítico, ofrecida directamente por el proveedor de nube, sin pipeline a medida en el medio. La ganancia es real donde existe hoy: menos conector casero de CDC, latencia bajando de minutos a segundos. Pero el nombre esconde dos puntos — el trabajo de modelar y gobernar el dato no desaparece, solo migra dentro del warehouse, y cada integración zero-ETL solo funciona entre dos productos del mismo proveedor. La pregunta que decide si vale la pena no es 'esto mata el pipeline', es 'esto me encierra más en una sola nube de lo que ya estaba'."
keywords: ["zero-ETL", "AWS zero-ETL", "Databricks Lakeflow", "Snowflake Openflow", "lock-in de datos", "CDC"]
---

**Zero-ETL** no es ausencia de pipeline. Es un pipeline que el proveedor de nube administra, opera y mantiene dentro de su propio ecosistema — y cobra de una forma distinta a como cobraba antes. AWS ofrece zero-ETL entre Aurora y Redshift desde 2022 y llegó a disponibilidad general en 2026. Databricks lanzó Lakeflow, uniendo ingesta y transformación bajo Unity Catalog. Snowflake respondió con Openflow, conexión directa a Kafka y Kinesis sin capa intermedia. Las tres lecturas de mercado coinciden en un punto: zero-ETL es el principal argumento de diferenciación de los tres hyperscalers en 2026. Lo que no dicen con la misma claridad es qué sigue siendo trabajo manual después de que el pipeline "desaparece".

Este texto separa la ganancia real del zero-ETL de lo que es una reformulación de marketing sobre un problema que la ingeniería de datos ya venía resolviendo hace años con CDC (change data capture) a medida.

## Lo que el zero-ETL resuelve de verdad

El caso más maduro es la integración nativa de AWS entre Aurora y Redshift, hoy disponible para Aurora MySQL y Aurora PostgreSQL. Segundos después de que un dato se escribe en la base transaccional, aparece listo para consulta analítica en Redshift — sin job de extracción, sin staging intermedio, sin conector escrito a mano. Aurora MySQL sostiene más de un millón de transacciones por minuto replicadas con latencia p50 por debajo de 15 segundos. Pionex, un exchange de criptomonedas, reportó una caída del 98% en la latencia de análisis — de minutos a menos de 15 segundos — y una reducción del 90% en la complejidad de mantenimiento de pipeline.

Databricks tomó el camino de la consolidación: Lakeflow unifica ingesta, transformación y orquestación bajo Unity Catalog, con Lakeflow Connect ofreciendo más de 100 conectores nativos de alto rendimiento. Snowflake apostó por streaming directo — Openflow conecta Kafka y Kinesis sin intermediario, y Snowpipe Streaming sostiene hasta 10 GB por segundo por tabla con un modelo de precio basado en ingesta previsible.

La ganancia común a los tres es genuina: menos código de integración escrito y mantenido por el equipo de datos para resolver un problema que ya estaba resuelto — solo que artesanalmente, con Debezium, Fivetran o script propio de CDC. Reemplazar ese código por un servicio gestionado del propio proveedor reduce la superficie de mantenimiento y recorta la latencia de minutos a segundos en escenarios de replicación simple entre base transaccional y warehouse.

> Zero-ETL reemplaza el conector a medida por un servicio gestionado. Eso es ahorro de ingeniería real — solo que no es lo mismo que eliminar el trabajo de datos.

## Lo que desaparece es el pipeline — no el modelado

Aquí está el punto que el mensaje de marketing difumina: zero-ETL elimina la tubería, no la lógica que corría dentro de ella. [El mismo argumento ya valía cuando ELT le ganó a ETL](/blog/es/elt-vs-etl.html) — la ganancia real no estaba en la sigla, estaba en separar ingesta (commodity) de modelado (donde vive el valor). Zero-ETL lleva ese argumento al límite: la ingesta dejó de ser incluso un commodity contratado — se convirtió en servicio nativo del proveedor. Pero el modelado, la calidad y la semántica del dato no desaparecen. Solo migran dentro del warehouse de destino, ejecutados bajo demanda en SQL, en vez de correr en una capa de transformación separada.

Esto significa que el dato crudo llega más rápido — pero sigue siendo crudo. Los equipos que leen "zero-ETL" como "cero trabajo de datos" descubren, meses después, que el warehouse está lleno de tablas replicadas sin contrato de esquema, sin test, sin dueño. Es el mismo error que cometían los equipos adoptando ELT sin disciplina, solo que ahora con un ingrediente más: la replicación nativa no expone el esquema intermedio que un pipeline a medida solía exponer, así que el equipo pierde un punto de control que tenía antes — el lugar donde filtrar dato sensible o aplicar una regla de negocio antes de la carga.

**La consecuencia práctica** es que los equipos que adoptan zero-ETL sin repensar la capa de modelado cambian un problema visible (pipeline frágil, se rompe en producción, alerta a las 3 de la madrugada) por uno silencioso (dato replicado sin contrato, sin masking, sin dueño — descubierto solo cuando alguien usa el número equivocado en un reporte ejecutivo).

## ¿Zero-ETL elimina el lock-in o lo profundiza?

Toda integración zero-ETL madura en el mercado hoy funciona entre dos puntas del mismo dueño. Aurora a Redshift es AWS a AWS. Lakeflow Connect entrega dato directo a Unity Catalog — que solo existe dentro de Databricks. Openflow entrega dato directo a Snowflake. Ninguno de los tres tiene una integración zero-ETL madura de producción que atraviese proveedores — el "zero" de la tubería solo se paga dentro de la frontera de quien construyó ambos lados.

Esto [refleja el mismo eje de lock-in que ya vale en la comparación entre los tres warehouses](/blog/es/databricks-snowflake-bigquery-lock-in.html): la dependencia real ya no vive en el formato del dato — [Apache Iceberg resolvió buena parte de eso al convertirse en el estándar entre los tres](/blog/es/apache-iceberg-table-format-lakehouse.html) — vive en la capa de integración que solo existe dentro de un ecosistema cerrado. Cuanto más zero-ETL adopta una empresa, menos motivo práctico tiene para mantener un segundo proveedor corriendo en paralelo, porque cada integración nueva aumenta el costo de salir, no de entrar.

El movimiento de consolidación del propio mercado de herramientas refuerza este punto. En junio de 2026, Fivetran se fusionó con dbt Labs — después de haber adquirido Census en 2025 — juntando ingesta, transformación y activación bajo un único proveedor. El mismo instinto de consolidación que motiva a proveedores independientes a fusionarse es el que motiva a los hyperscalers a impulsar zero-ETL: menos cabos sueltos entre ingesta y consumo significa menos chance de que el cliente cambie de proveedor en el camino.

> El pipeline que desaparece es el que el equipo mantenía. Lo que queda, y crece, es la dependencia de que las dos puntas del zero-ETL pertenezcan al mismo dueño.

## Tres preguntas para decidir si zero-ETL sirve tu caso

No es una pregunta de "zero-ETL es bueno o malo" — es sobre dónde encaja en tu patrón real de operación.

1. **¿Las dos puntas ya viven en el mismo proveedor?** Si la base de datos transaccional y el warehouse ya están en la misma nube — Aurora y Redshift, o cualquier par nativo equivalente — zero-ETL entrega ganancia real de latencia sin costo adicional de lock-in, porque la dependencia de plataforma ya existía antes de la integración.
2. **¿El caso de uso es replicación simple o transformación pesada?** Zero-ETL resuelve bien "traer dato transaccional al warehouse casi en tiempo real" — [la misma frescura que un agente autónomo exige](/blog/es/dado-pronto-para-ia-arquitetura-agente.html) del dato que consume. No resuelve join complejo entre múltiples fuentes, deduplicación, ni regla de negocio que necesita correr antes de la carga — eso sigue exigiendo dbt, test y un dueño definido, solo que ejecutado ahora dentro del warehouse de destino.
3. **¿Ya se descartó salir del proveedor actual como escenario?** Si la respuesta es sí — la empresa ya decidió quedarse, por cualquier motivo estratégico — zero-ETL es ganancia neta de ingeniería sin costo extra de decisión. Si la respuesta es "todavía no sabemos", cada integración zero-ETL nueva suma un voto a favor de nunca salir.

Ninguna de las tres, aislada, cierra la decisión — pero la tercera suele ser la que el equipo de ingeniería menos considera antes de activar la integración, porque la ganancia de latencia aparece el primer día y el costo de salida solo aparece el día que alguien intenta migrar.

## El nombre vende ausencia de trabajo — la operación real es otra

Zero-ETL entrega lo que promete en una porción estrecha y real del problema: replicación de dato transaccional al warehouse, casi en tiempo real, sin conector escrito a mano. Es ganancia de ingeniería genuina, medible en latencia y en horas de mantenimiento que dejan de existir. Pero tratarlo como "elimina el trabajo de datos" es el mismo error que leer "pricing simplificado" como "presupuesto bajo control" — la etiqueta simplifica la superficie visible y desplaza el trabajo real a otro lugar, no lo elimina.

Quien adopta zero-ETL después de calcular las tres preguntas anteriores entra a la integración sabiendo qué ganó (latencia, mantenimiento) y qué no ganó (modelado, gobernanza, libertad de cambiar de proveedor). Quien lee el nombre como promesa literal — cero trabajo — descubre la factura real seis meses después: dato replicado sin contrato de esquema, y una integración más que vuelve más caro salir del proveedor actual de lo que era antes de activar el "zero".

## Preguntas que siempre vuelven

Para cerrar, las tres dudas más comunes sobre zero-ETL en la práctica.

## ¿Qué es zero-ETL?

Zero-ETL es la replicación nativa y casi en tiempo real de dato entre un sistema transaccional (como una base de datos operacional) y una plataforma analítica (como un data warehouse), ofrecida directamente por el proveedor de nube como servicio gestionado — sin pipeline de extracción, transformación y carga a medida en el medio. Ejemplos maduros incluyen la integración Aurora–Redshift de AWS (disponibilidad general en 2026, con latencia p50 por debajo de 15 segundos), Lakeflow Connect de Databricks y Openflow de Snowflake.

## ¿Zero-ETL elimina la necesidad de dbt y modelado de datos?

No. Zero-ETL elimina el pipeline de ingesta a medida — el conector de CDC escrito a mano, el job de extracción programado. No elimina el modelado, la calidad ni la semántica del dato, que siguen siendo trabajo necesario. La diferencia es que ese trabajo migra dentro del warehouse de destino, ejecutado bajo demanda en SQL, en vez de correr en una capa de transformación separada antes de la carga. Los equipos que se saltan este paso acumulan dato replicado sin contrato de esquema, sin test y sin dueño definido.

## ¿Zero-ETL aumenta el lock-in de nube?

En la práctica, sí, porque toda integración zero-ETL madura en el mercado hoy conecta dos puntas del mismo proveedor — Aurora a Redshift dentro de AWS, Lakeflow Connect a Unity Catalog dentro de Databricks, Openflow a Snowflake. Cada integración nueva adoptada aumenta el costo de migrar a otro proveedor más adelante, porque reemplaza un pipeline que era portable (escrito en herramienta neutral, como Fivetran o Airbyte) por un servicio nativo que solo existe dentro de un ecosistema. La ganancia de latencia es real; el costo de salida también.
