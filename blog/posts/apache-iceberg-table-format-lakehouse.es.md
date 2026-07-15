---
title: "Apache Iceberg ganó la disputa de table format — qué cambia en el lakehouse"
slug: "apache-iceberg-table-format-lakehouse"
excerpt: "Databricks, Snowflake y BigQuery convergieron en Apache Iceberg como estándar de table format — qué cambia para quien decide arquitectura de datos."
tldr: "Apache Iceberg es el table format abierto que se convirtió en el estándar de facto del lakehouse en 2026, con soporte nativo de Databricks, Snowflake, BigQuery y la mayoría de los motores de consulta relevantes. La disputa que dividía la arquitectura de datos en 2023–2024 ya no existe como elección técnica — existe como elección de catálogo y de operación. Este texto explica qué convergió, qué todavía diverge, y qué cambia en la planificación de quien está armando o revisando un stack de datos ahora."
keywords: ["Apache Iceberg", "table format", "lakehouse", "Delta Lake", "Databricks", "Snowflake"]
---

**Apache** Iceberg ganó. No en el sentido de haber eliminado competidores del mercado — Delta Lake sigue vivo, Apache Hudi sigue vivo — sino en el sentido que importa para quien decide arquitectura: si estás diseñando un lakehouse nuevo en 2026 y no estás pensando en Iceberg como el formato de tabla por defecto, estás haciendo algo fuera de la curva.

La disputa de table format que dividía las conferencias de datos en 2023 y 2024 — Iceberg, Delta Lake o Hudi, elegí uno y conviví con la decisión — dejó de ser una elección de arquitectura de almacenamiento. Se convirtió en elección de catálogo y de operación. Es un cambio bueno para quien compra tecnología de datos, pero exige entender dónde la convergencia es real y dónde todavía existe una diferencia que decide un proyecto.

## Qué convergió de hecho

La señal más clara de la victoria de Iceberg no es la adopción aislada de un vendor — es el hecho de que los tres mayores competidores de warehouse del mercado dejaron de tratar a Iceberg como amenaza y pasaron a construir soporte nativo para él.

**Databricks** — dueña de Delta Lake, formato competidor directo — expone hoy tablas Delta como Iceberg (y como Hudi) vía Delta Lake UniForm, sin duplicar datos. Unity Catalog pasó a gestionar tablas Iceberg de forma nativa, y la empresa ya avanza en el soporte a Iceberg v3, con row lineage, deletion vectors y el tipo `VARIANT`. Quien construyó confiando solo en Delta Lake, sin interoperabilidad, hoy tiene ese camino abierto sin reescribir pipeline.

**Snowflake** respondió de un modo más estructural: creó Polaris Catalog, catálogo REST open-source para Iceberg, y donó el proyecto a la Apache Software Foundation. El mensaje detrás de la donación es directo — el cliente puede mantener el dato en Iceberg abierto, en su propio storage, y aun así tener el motor de consulta y la gobernanza de Snowflake encima. Es una invitación a reducir la fricción de salida, no a retener.

**BigQuery** entró por el camino más pragmático: soporta tablas Iceberg como tabla externa y como tabla gestionada vía BigLake, encajando el formato abierto dentro de la misma superficie de SQL que el cliente ya usa.

El resto del ecosistema sigue el mismo movimiento. Spark, Trino, Presto, Flink, Hive, Impala, DuckDB, ClickHouse, StarRocks y Dremio tienen soporte nativo o casi nativo a Iceberg — lo que significa que la elección de motor de consulta dejó de trabar la elección de formato de tabla, y viceversa.

> La disputa que era "qué formato elegir" se convirtió en "qué catálogo opera ese formato mejor para tu caso". Es una pregunta más fácil de responder — y más fácil de errar sin darse cuenta.

## Qué todavía no convergió

Convergencia de formato no es convergencia de operación. Tres puntos siguen siendo decisión real, no commodity:

1. **El catálogo es donde la disputa comercial migró.** Polaris (Snowflake/Apache), Unity Catalog (Databricks) y el catálogo nativo de BigQuery compiten por ser el lugar donde ocurren gobernanza, control de acceso y descubrimiento de datos. Elegir Iceberg como formato no resuelve esa elección — solo la posterga a una capa superior.
2. **El rendimiento de escritura concurrente todavía varía por motor.** Iceberg define el formato de la tabla, no cómo cada motor maneja el merge concurrente, la compactación automática o la latencia de commit. Un mismo dataset Iceberg puede tener un comportamiento de escritura bien distinto corriendo en Spark versus Snowflake versus Flink.
3. **Iceberg v4 promete convergencia de metadato — pero todavía no llegó.** Databricks ya señaló que la próxima versión del formato va a repensar la estructura de metadato con un árbol adaptativo, proponiendo que Delta 5.0 e Iceberg compartan el mismo layout de metadato en el futuro. Es la promesa más ambiciosa de la historia reciente del table format — y, como toda promesa de convergencia total, vale tratarla como dirección, no como estado actual.

El error común acá es leer "Iceberg ganó" como "ya no importa qué plataforma elijo". Es lo opuesto: la plataforma [todavía importa — solo que la decisión migró a otro lugar](/blog/es/lakehouse-vs-warehouse.html). Antes elegías formato y quedabas atado a él. Ahora elegís catálogo, motor de escritura y operación — y el formato dejó de ser el factor de lock-in.

## Dónde esto cambia la planificación de arquitectura

Para quien está decidiendo stack de datos ahora, la convergencia de Iceberg desplaza tres preguntas que antes ni formaban parte de la conversación:

**Migrar entre plataformas se volvió más barato — no gratis.** Si el dato ya está en Iceberg, cambiar el motor de consulta que lee esa tabla es una operación de configuración, no de reescritura de pipeline entero. Esto reduce el costo de cambiar de vendor en el mediano plazo, pero no elimina el trabajo de migrar catálogo, política de acceso y job de compactación — que siguen siendo específicos de cada operador.

**La pregunta "qué formato elegir" se volvió "qué catálogo elegir".** Equipos que ya tenían Delta Lake no necesitan migrar formato para ganar interoperabilidad — UniForm resuelve eso. Lo que todavía exige decisión es dónde vive el catálogo y quién controla la política de acceso sobre él.

**El lock-in no desapareció, solo cambió de capa.** La misma lógica que ya vale [en la comparación entre Databricks, Snowflake y BigQuery](/blog/es/databricks-snowflake-bigquery-lock-in.html) sigue en pie — solo que el eje de aprisionamiento ya no es "en qué formato está atrapado mi dato", sino "en qué catálogo está atrapada mi gobernanza". Evaluar el TCO de salida hoy significa preguntar sobre portabilidad de catálogo, no de tabla.

1. **Si todavía no elegiste formato:** Iceberg es la elección por defecto hoy — soporte amplio, ecosistema maduro, sin la pregunta "y si necesito cambiar de motor después" pesando en la decisión.
2. **Si ya tenés Delta Lake:** evaluá UniForm antes de considerar migración de formato — puede resolver la interoperabilidad que necesitás sin reescribir pipeline.
3. **Si la preocupación real es el lock-in:** dirigí la due diligence hacia el catálogo (Polaris, Unity Catalog, el nativo de BigQuery), no hacia el formato de tabla — ahí es donde se decide la portabilidad real ahora.

## La convergencia de formato no elimina la due diligence — la desplaza

La ganancia práctica de que Iceberg se haya vuelto estándar es real: menos riesgo de elegir el formato equivocado, más libertad para cambiar de motor de consulta sin reescribir la capa de almacenamiento. Pero [decidir arquitectura de datos](/blog/es/multi-cloud-mito-ou-estrategia.html) sigue siendo un ejercicio de entender dónde vive la dependencia real — y esa dependencia solo migró de "formato de tabla" a "catálogo y operación".

Quien trate la victoria de Iceberg como "problema resuelto, ya no necesito evaluar plataforma" va a descubrir la fricción real el día que necesite migrar catálogo entre dos proveedores que implementan la misma especificación de formas sutilmente distintas. La due diligence no terminó. Solo quedó una capa más arriba — y, para la mayoría de los equipos, es más fácil de hacer bien de lo que era elegir formato a ciegas en 2023.

## Preguntas que siempre vuelven

Para cerrar, las dudas más comunes sobre qué cambia en la práctica la convergencia en Iceberg.

## ¿Qué es Apache Iceberg?

Apache Iceberg es un table format abierto — una especificación de cómo organizar metadato, schema y archivos de datos sobre almacenamiento de objeto (S3, GCS, Azure Blob) para que múltiples motores de consulta lean y escriban la misma tabla con garantías transaccionales (ACID), evolución de schema y time travel. A diferencia de una base de datos, Iceberg no es un motor de ejecución — es la capa que permite que Spark, Trino, Snowflake, BigQuery y otros operen sobre el mismo dato sin copiarlo ni convertirlo.

## ¿Necesito migrar mi Delta Lake a Iceberg ahora?

En la mayoría de los casos, no hace falta migrar formato — hace falta activar interoperabilidad. Si tu stack ya corre Delta Lake, el Delta Lake UniForm de Databricks expone esas mismas tablas como Iceberg (y Hudi) sin duplicar datos, lo que resuelve la mayor parte del dolor de compatibilidad que motivaría una migración completa. La migración de formato solo se justifica cuando el motivo real es cambiar de operador de catálogo, no ganar lectura cruzada — y eso vale evaluarlo caso por caso, no por default de mercado.

## ¿Que Iceberg se vuelva estándar elimina el riesgo de lock-in?

No lo elimina — lo desplaza. Antes, el riesgo de aprisionamiento estaba concentrado en el formato de tabla: cambiar de plataforma significaba reescribir el pipeline de almacenamiento. Con Iceberg ampliamente soportado, ese riesgo específico bajó. Pero el catálogo que gestiona la tabla Iceberg — Polaris, Unity Catalog, o el nativo de cada proveedor — se convirtió en el nuevo eje de dependencia: gobernanza, control de acceso y descubrimiento de datos siguen siendo específicos de cada operador, y migrar eso todavía exige trabajo real.
