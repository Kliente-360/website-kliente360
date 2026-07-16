---
title: "Databricks vs Snowflake vs BigQuery: lock-in, costos de salida y lo que el partner oficial no cuenta"
slug: "databricks-snowflake-bigquery-lock-in"
pillar: "data"
date: "2026-05-06"
readMinutes: 8
excerpt: "Los tres warehouses entregan performance equivalente. La diferencia real está en lo que cada uno cuesta abandonar — y ningún partner oficial te lo va a contar en la propuesta."
tldr: "La elección entre Databricks, Snowflake y BigQuery se decide menos por performance — los tres están en amplia paridad técnica — y más por lock-in: formato de almacenamiento, capa de procesamiento e integración con el ecosistema de la nube. Databricks usa formato abierto (Delta), pero te ata vía notebooks, MLflow y Unity Catalog; Snowflake y BigQuery usan formato propietario — la migración reversa de 50TB desde Snowflake cuesta US$ 200k–500k en consultoría. Cómo medir los tres vectores antes de firmar, y por qué un partner oficial nunca puede ser la fuente de la respuesta."
keywords: ["Databricks", "Snowflake", "BigQuery", "lock-in", "data warehouse"]
---

**L**a pregunta que toda empresa hace antes de elegir warehouse es "¿cuál es mejor?". La pregunta que nadie hace, pero debería, es "¿cuál es más caro abandonar?". En 2026, con Databricks, Snowflake y BigQuery en paridad técnica amplia, la diferencia práctica que va a pesar en los próximos 5–10 años es lock-in — y cada uno de los tres tiene patrón de aprisionamiento diferente, con costo de salida diferente, y capa de marketing diferente para obscurecer eso.

Este texto enumera los tres vectores de lock-in que importan, muestra cómo cada warehouse puntúa en cada uno, y explica por qué comparativo de partner oficial es, por definición, parcial. No porque el partner mienta — porque sólo logra ver bien la tecnología que entrega.

## El sesgo estructural del partner oficial

Antes de entrar a los vectores, vale entender por qué comparativos de partners son problemáticos. Partner Databricks Gold gana ingresos entrenando equipos en Spark, optimizando Delta Lake, vendiendo Unity Catalog. Partner Snowflake Premier gana ingresos estructurando warehouses Snowflake, optimizando warehouses de cluster, vendiendo Streamlit. Partner Google Cloud gana ingresos en BigQuery + Looker + Vertex AI.

Ninguno de los tres puede honestamente recomendar que el cliente salga de su plataforma — no por mala fe, sino porque la expertise está toda concentrada en un lado de la elección. Pedirle a un partner Databricks que compare con Snowflake es pedirle a un entrenador de fútbol que recomiende academia de natación. La respuesta puede ser técnicamente correcta en la superficie y estructuralmente sesgada en la conclusión.

Consultoría agnóstica — sin incentivo de reventa — es el único arreglo donde la comparación logra ser honesta. No es el caso general del mercado. De ahí este texto.

> La pregunta "¿qué warehouse es mejor?" tiene 80% de la respuesta en el comparativo público. El 20% que decide es lock-in — y nadie con incentivo de reventa te va a entregar ese pedazo.

## Vector 1 — Formato de almacenamiento

Aquí mora el lock-in más antiguo y más serio. Cuando el dato está en formato propietario cerrado, migrar exige reescribir, reprocesar y validar todo.

**Snowflake** usa formato propietario interno (FDN — Flexible Data Network). Cliente Snowflake puro tiene todos los datos en un formato que sólo Snowflake lee. Recientemente, Snowflake empezó a soportar Iceberg (formato abierto) como tablas externas, pero la operación default sigue siendo interna. Salida plena exige `COPY INTO` de todas las tablas a S3 en Parquet, después reingestión en otro warehouse. En volumen de 50TB, proyecto de migración reversa cuesta USD 200k–500k en consultoría especializada. Esa convergencia alrededor de Iceberg, de hecho, [ya desplazó dónde vive el lock-in de verdad — del formato de tabla al catálogo que lo gestiona](/blog/es/apache-iceberg-table-format-lakehouse.html), lo que refuerza este vector sin eliminar los otros dos.

**Databricks** con Delta Lake usa formato abierto (Delta) sobre el storage del cliente (S3/ADLS/GCS). Dato vive en el cloud storage del cliente, en formato que Spark, DuckDB, Trino y otros leen. Migración reversa hacia otro motor de procesamiento es trivial — basta apuntar motor nuevo al mismo bucket. El lock-in de Databricks está en otro lugar (próximo vector), no en el formato.

**BigQuery** usa formato propietario (Capacitor). Soporta exportación a Parquet en GCS, pero el dato interno es cerrado. Salida plena exige extracción completa vía export jobs, similar a Snowflake. Diferencia vs Snowflake: BigQuery Storage Read API permite lectura externa sin exportación intermedia — facilita stack híbrido, pero no elimina lock-in.

Puntuación práctica:
1. **Databricks**: lock-in bajo (formato abierto).
2. **BigQuery**: lock-in medio (propietario, pero con API de lectura externa).
3. **Snowflake**: lock-in alto (propietario, exportación costosa, aunque Iceberg está entrando).

## Vector 2 — Capa de procesamiento y SQL específico

Aún con dato portable, la capa de compute y la sintaxis SQL crean dependencias sutiles.

**Snowflake** tiene SQL ANSI bien adherente, con extensiones propietarias (Snowpark, JavaScript UDFs, Streamlit, Cortex AI) que no migran. Empresa que adopta Cortex para análisis generativo queda atrapada en ese vendor para esa función. Stored procedures en Snowflake JavaScript son reescritura total en otra plataforma.

**Databricks** tiene múltiples motores (Spark SQL, Photon, propio SQL serverless). Spark es portable (cualquier cloud, OSS). Photon es propietario pero, siendo optimización bajo el hood, no crea lock-in sintáctico. UDFs en Python/Scala son portables (cualquier Spark corre). Lock-in real de Databricks: notebooks, MLflow, Unity Catalog, y Workflows — esos son camino exclusivo. Equipo que se acostumbra con Databricks Notebooks tiene fricción alta en otra herramienta.

**BigQuery** tiene SQL standard cercano al ANSI, con extensiones (ARRAY, STRUCT nativos, BQML, BigQuery ML). BQML para modelos de machine learning es función poderosa pero exclusiva — migración a otro motor exige reescribir modelos en Python/Spark. Geo functions y ARRAY/STRUCT son más flexibles que en Snowflake pero, al mismo tiempo, crean código que no corre en otro lugar sin refactorización.

Puntuación práctica:
1. **Databricks**: lock-in medio (Spark portable, pero notebook/MLflow/Unity Catalog pegan).
2. **Snowflake**: lock-in medio-alto (SQL portable, UDFs y Cortex no).
3. **BigQuery**: lock-in medio-alto (SQL cercano al standard, BQML y funciones específicas no).

## Vector 3 — Integración con ecosistema de la cloud

El lock-in más subestimado: cuánto el warehouse está cosido con otros servicios de la misma cloud.

**BigQuery** vive dentro de Google Cloud. Integración nativa con Looker, Vertex AI, Pub/Sub, Dataflow, Cloud Storage. Migración reversa no es sólo warehouse — es renegociar todo el stack de datos que quedó alrededor. Empresa con Looker + BigQuery + Vertex AI tiene que migrar tres productos juntos. Costo de salida crece exponencialmente con el tiempo dentro de GCP.

**Snowflake** corre multi-cloud (AWS, Azure, GCP). Ese es el argumento de marketing principal — "Snowflake es neutro entre clouds". Es cierto en compute — pero [la arquitectura multi-cloud intencional tiene un overhead operativo que va mucho más allá de elegir un warehouse neutro de nube](/blog/es/multi-cloud-mito-ou-estrategia.html). No es cierto en integraciones: Snowflake Native Apps, Snowpark Container Services, Streamlit, Cortex son exclusivos. Equipo que adopta esas capas re-crea lock-in en otro nivel.

**Databricks** corre en AWS, Azure y GCP nativamente. Tiene integraciones profundas con cada una (especialmente Azure, vía Microsoft partnership), pero el motor es portable entre clouds — workspace en AWS migra a Azure con costo menor que otras opciones. Lock-in real está en Unity Catalog (capa de gobierno) y Workflows (orquestación) — esos se migran con refactorización, no con simple export.

Puntuación práctica:
1. **Databricks**: lock-in bajo-medio en ecosistema (multi-cloud + motor portable).
2. **Snowflake**: lock-in medio (compute multi-cloud, pero features nuevos pegan).
3. **BigQuery**: lock-in alto (vive dentro de GCP, integraciones nativas crean dependencia compuesta).

## Cómo medir antes de firmar

Cuatro preguntas prácticas para hacer antes de cerrar contrato anual.

1. **¿Qué % de los datos quedan en formato abierto?** Si < 50%, lock-in técnico significativo. Negociar soporte explícito a Iceberg/Delta como tablas externas.
2. **¿Cuánto código SQL es portable (ANSI puro)?** Audita las 50 queries más críticas. Si más de 30% usa funciones propietarias, migración es refactorización, no export.
3. **¿Cuántas integraciones nativas con otros productos de la misma cloud?** Si el stack entero vive en una sola cloud, mover warehouse es mover stack entero.
4. **¿Cuál es el costo estimado de exportación completa?** Pedirle al partner la estimación de USD/TB para `COPY INTO`/`EXPORT`. Si no sabe o desvía, es señal roja.

Empresa que hace esas 4 preguntas antes de firmar paga más barato, negocia cláusulas mejores, y casi nunca necesita migrar. Empresa que no hace, paga 3 años en el warehouse equivocado y descubre el costo de salida cuando el presupuesto se duplica.

## La elección honesta en 2026

Sin sesgo de reventa, la recomendación por contexto:

**Greenfield con prioridad en portabilidad**: Databricks con Delta Lake. Storage del propio cliente, formato abierto, motor multi-cloud. Lock-in mínimo posible para warehouse moderno.

**Empresa ya en Azure o multi-cloud con cargas mixtas**: Databricks o Snowflake. Decisión por fuerza del equipo existente.

**Empresa already-Google-cloud**: BigQuery, sin titubear — pero consciente de que está aceptando lock-in alto a cambio de integración nativa profunda. No es decisión equivocada, es decisión informada.

**Caso de uso analytical puro, sin ML pesado, equipo pequeño**: Snowflake. Operación más simple, SQL puro, sin necesidad de gestionar Spark.

**Caso de uso analytical + ML en escala**: Databricks (o BigQuery + Vertex si ya está en Google). Snowflake con Snowpark resuelve sólo parcialmente.

Importante: ninguna de estas recomendaciones viene de [comparativo de mid-market](/blog/es/snowflake-bigquery-databricks.html) puro. Viene de lock-in específico. Para cada caso, la pregunta "¿cuánto cuesta salir?" es tan importante como "¿cuánto cuesta correr?". Partners oficiales responden la segunda. La primera queda para el cliente investigar — o para consultor agnóstico responder. Hay razón estructural para ese arreglo.

## Preguntas que siempre vuelven

Para cerrar, las preguntas que más aparecen cuando esta decisión llega a la mesa.

## ¿Cuánto cuesta migrar de un warehouse a otro?

Depende del vector de lock-in, pero la referencia que asusta: la migración reversa de 50TB saliendo de Snowflake cuesta USD 200k–500k en consultoría especializada, porque exige `COPY INTO` de todas las tablas a Parquet y reingestión en el destino. BigQuery tiene salida parecida (el formato Capacitor es cerrado, extracción completa vía export jobs), con el atenuante de la Storage Read API para lectura externa.

Y el dato es sólo una parte. Si más del 30% de tus queries críticas usa funciones propietarias (Cortex, BQML, JavaScript UDFs), la migración es refactorización, no export. Y si el stack entero vive en una sola cloud — tipo Looker + BigQuery + Vertex AI —, mover el warehouse es mover el stack entero. Por eso la pregunta "¿cuánto cuesta salir?" hay que hacerla antes de firmar, no después.

## ¿Cuál de los tres tiene menos lock-in?

Databricks, en el vector que más pesa: el dato queda en Delta (formato abierto) en el storage del propio cliente, legible por Spark, DuckDB, Trino y otros — cambiar de motor es apuntar el nuevo al mismo bucket. Snowflake y BigQuery guardan el dato en formato propietario, y la salida plena pasa por exportación costosa.

Menos lock-in no es cero lock-in. Databricks te ata por otro camino: notebooks, MLflow, Unity Catalog y Workflows son exclusivos, y un equipo acostumbrado a ellos tiene fricción alta en cualquier otra herramienta. La diferencia es que ese aprisionamiento se resuelve con refactorización de proceso, no con rescate de dato — que es el tipo más caro.

## ¿Se puede confiar en el comparativo del partner oficial?

Como fuente única de decisión, no — y no es cuestión de mala fe. Un partner Databricks Gold, Snowflake Premier o Google Cloud gana ingresos entregando la plataforma que representa; su expertise está toda de un lado de la elección, y estructuralmente no puede recomendar que salgas de ella. El comparativo puede ser técnicamente correcto en la superficie y sesgado en la conclusión.

El uso correcto del partner: hacerle las cuatro preguntas de medición (% de dato en formato abierto, % de SQL ANSI puro, integraciones nativas con la misma cloud, costo estimado de USD/TB para exportación completa) y observar la respuesta. Si no sabe o desvía en la cuarta, es señal roja. La comparación honesta sólo sale de quien no tiene incentivo de reventa.
