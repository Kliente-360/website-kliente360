---
title: "DuckDB y DuckLake: cuándo alcanza un warehouse de un solo nodo"
slug: "duckdb-ducklake-warehouse-de-um-no-so"
pillar: "data"
date: "2026-11-10"
readMinutes: 7
excerpt: "DuckLake 1.0 le dio a DuckDB forma de lakehouse. Cinco chequeos para saber si un nodo alcanza o si el warehouse gestionado sigue siendo la mejor opción."
tldr: "DuckDB es un motor analítico embebido que corre dentro del propio proceso, sin servidor, y DuckLake 1.0 (abril de 2026) le sumó un formato de tabla con catálogo en una base SQL y datos en Parquet sobre object storage. Para volúmenes de hasta unos cientos de GB y algunas decenas de usuarios, ese conjunto cubre lo que muchas empresas medianas pagan como warehouse gestionado. La concurrencia alta, el gobierno nativo y la escritura intensiva siguen favoreciendo al warehouse en la nube, y el diseño híbrido suele ser el punto de partida más seguro."
keywords: ["DuckDB", "DuckLake", "data warehouse", "lakehouse", "costo de warehouse", "Parquet"]
---

**DuckDB** es el motor analítico que la mayoría de los equipos de datos ya usa en el notebook y casi ninguno considera como backend de producción. La pregunta cambió en abril de 2026, cuando el equipo de DuckDB declaró DuckLake 1.0 listo para producción. Con un formato de tabla transaccional y catálogo propio, el motor de un solo nodo pasó a competir, para volúmenes moderados, con el warehouse que la empresa contrata por crédito.

Este texto no defiende reemplazar Snowflake por un servidor. Propone cinco chequeos para decidir cuándo alcanza un nodo y dónde el warehouse gestionado sigue siendo la respuesta correcta. Donde hay un número de proveedor, lo decimos; donde hay opinión, también.

## Qué cambia DuckLake 1.0 en DuckDB

DuckDB solo lee y escribe archivos, pero no ofrece lo que ofrece un warehouse: tablas versionadas, transacciones entre varias tablas y vista de snapshot. DuckLake cubre esa brecha con una idea simple: los datos quedan en archivos Parquet en el object storage, y los metadatos (esquema, snapshots, lista de archivos, estadísticas) viven en una base SQL común, como PostgreSQL, MySQL, SQLite o el propio DuckDB, según la [documentación de DuckLake](https://book.st-hakky.com/en/data-platform/ducklake-1-0-iceberg-difference).

Eso elimina el servidor de catálogo dedicado, una de las partes más incómodas de operar en un lakehouse. La versión 1.0 trajo además tablas ordenadas, particionado por bucket y *data inlining* (escrituras pequeñas guardadas directo en el catálogo, sin generar archivos minúsculos).

Hay una salida importante: los archivos de datos y de borrado son compatibles con Apache Iceberg, lo que permite migrar a Iceberg cambiando solo el catálogo, sin reescribir datos. Quien leyó nuestro análisis sobre [Apache Iceberg como estándar de table format](/blog/es/apache-iceberg-table-format-lakehouse.html) reconoce la ganancia: elegir el motor ya no ata la elección del formato.

> Para volúmenes moderados, el catálogo en una base SQL y el dato en Parquet entregan lo esencial del lakehouse sin operar un clúster.

## Cuándo alcanza un nodo: cinco chequeos

La regla que usamos es conservadora: DuckDB es el backend correcto solo cuando los cinco chequeos apuntan a él. Si uno apunta al warehouse, el diseño híbrido suele ser mejor.

1. **Volumen.** Por debajo de unos 100 GB comprimidos, DuckDB casi seguro alcanza. Entre 100 GB y pocos TB funciona con particionado cuidadoso, pero el warehouse puede ser más simple. Por encima, y creciendo, vaya a warehouse. Las franjas son del [análisis de Basedash](https://www.basedash.com/blog/duckdb-for-bi-when-single-node-analytics-beats-a-cloud-warehouse), un proveedor de BI, y coinciden con nuestra experiencia como orden de magnitud.
2. **Concurrencia.** Hasta unas decenas de usuarios de BI, el modelo de un proceso por consulta aguanta. Cientos de usuarios simultáneos piden warehouse o un servicio alojado como MotherDuck. Un único proceso atendiendo 500 dashboards a la vez formará cola.
3. **Multi-tenancy y gobierno.** DuckDB no trae control de acceso por fila, roles, enmascaramiento de columnas ni auditoría nativos. Si el cumplimiento exige eso en el motor, el warehouse ya lo entrega.
4. **Frescura y escritura.** DuckDB está optimizado para consulta analítica por lotes e interactiva, no para ingesta continua de alto volumen ni captura de cambios (CDC). En DuckLake, las actualizaciones pasan por `MERGE INTO`, y sin clave primaria la deduplicación no está garantizada.
5. **Forma de la carga.** Los joins entre tablas de hechos muy grandes tienden a favorecer un motor distribuido, que reparte el trabajo entre nodos. En un solo nodo, memoria y tiempo crecen juntos.

DuckLake también tiene límites de madurez: el soporte de motores sigue siendo mayormente DuckDB (Spark, Trino y DataFusion están en desarrollo) y no hay índices, claves primarias ni foráneas. Un catálogo en DuckDB sirve a un único cliente; para lectura y escritura compartidas, use PostgreSQL o SQLite.

## ¿Y el costo? Un número de proveedor, tratado como tal

La comparación que circula es tentadora: un warehouse pequeño en Snowflake costaría entre US$ 1.500 y US$ 5.000 por mes para el mismo trabajo, contra cerca de US$ 200 de un servidor dedicado. Es una estimación de un proveedor de BI, no una medición independiente, y omite la línea más real de la cuenta: el tiempo de quien opera.

Lo que sostenemos es más acotado. Un servidor propio cuesta menos en infraestructura, pero traslada el costo a las personas: backup, actualizaciones, monitoreo, control de memoria y un plan para cuando el nodo caiga. Para una empresa sin ingeniero de datos dedicado, ese costo puede superar el ahorro de la factura. La cuenta solo cierra a favor del nodo único cuando ya hay alguien con tiempo y gusto por operar, o cuando un servicio alojado cubre esa parte.

Si su problema es la factura del warehouse, empiece por las medidas descritas en [FinOps de datos en el modelo, no en la factura](/blog/es/custo-data-warehouse-finops-de-dados.html). Cambiar de motor para escapar de un modelo mal diseñado solo cambia la dirección del desperdicio.

## El patrón híbrido: warehouse para el todo, DuckDB para lo caliente

En la práctica, el mejor uso que vemos no es sustitución sino división de trabajo. El warehouse sigue como sistema de registro, con gobierno y concurrencia. DuckDB entra donde el costo por consulta pesa y el dato es estable:

1. **Exporte a Parquet** los conjuntos que alimentan dashboards de alto tráfico, en un directorio particionado.
2. **Sirva esas consultas desde DuckDB**, en la propia herramienta de BI o en un servicio pequeño, en lugar de despertar al warehouse en cada clic.
3. **Defina el límite de memoria y de threads** de cada proceso. Sin eso, un solo usuario puede tumbar un servidor compartido.
4. **Mantenga el warehouse como fuente única** y trate el Parquet exportado como copia desechable, reconstruible en minutos.

El reporte de mercado es que este arreglo recorta entre 60% y 80% del gasto de warehouse atribuido al tráfico de dashboards. La cifra viene del mismo análisis de proveedor y debe verificarse contra su patrón de consultas antes de volverse meta. El riesgo del arreglo es el de toda copia: dos lugares con el mismo dato y la pregunta de cuál es el correcto. Es un buen motivo para tratar el Parquet exportado con [contratos de datos](/blog/es/data-contracts.html) desde el inicio.

## Cuándo mantener el warehouse gestionado

Hay casos en que la respuesta honesta es no tocar. Si la empresa ya tiene [un warehouse bien modelado y gobernado](/blog/es/lakehouse-vs-warehouse.html), con decenas de equipos consumiéndolo y requisitos de auditoría, el ahorro de cambiar el motor rara vez compensa el riesgo. Lo mismo vale cuando el volumen supera unos pocos TB y sigue creciendo, o cuando la carga es de ingesta continua.

DuckDB tiene más sentido en tres escenarios: productos de datos internos de volumen medio, entornos de desarrollo y prueba que hoy queman crédito del warehouse, y análisis exploratorios que no deberían competir por recursos con producción. En los tres, el costo de equivocarse es bajo y la ganancia de aprender el motor es real.

## Preguntas que siempre vuelven

Tres dudas aparecen en casi toda conversación sobre el tema.

## ¿Qué es DuckLake?

DuckLake es un formato de tabla abierto, lanzado en versión 1.0 en abril de 2026 por el equipo de DuckDB, que guarda los datos en archivos Parquet en el object storage y los metadatos en una base SQL como PostgreSQL o SQLite. La implementación de referencia es una extensión de DuckDB. Sus archivos son compatibles con Apache Iceberg, lo que permite migrar cambiando solo el catálogo.

## ¿DuckDB reemplaza a Snowflake o BigQuery?

Solo en un perfil acotado: volumen de hasta unos cientos de GB, algunas decenas de usuarios, poca escritura continua y gobierno resuelto fuera del motor. Fuera de ese perfil, el warehouse gestionado sigue siendo más seguro. Para la mayoría de las empresas medianas, la respuesta útil es híbrida: el warehouse como sistema de registro y DuckDB atendiendo el tráfico caliente y los entornos de prueba.

## ¿Cuántos datos aguanta DuckDB?

No hay un techo único, porque el límite depende de memoria, particionado y forma de las consultas. Como orden de magnitud, por debajo de 100 GB comprimidos es cómodo, y entre 100 GB y pocos TB exige particionado cuidadoso. Por encima, la combinación de joins grandes y crecimiento continuo favorece a un motor distribuido.
