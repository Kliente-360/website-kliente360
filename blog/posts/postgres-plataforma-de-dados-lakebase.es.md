---
title: "Postgres en la plataforma de datos: cuándo la base de la app se muda"
slug: "postgres-plataforma-de-dados-lakebase"
pillar: "data"
date: "2026-11-18"
readMinutes: 7
excerpt: "Lakebase y Snowflake Postgres llevan la base de datos de la aplicación a la plataforma de datos. Cinco preguntas para decidir cuándo conviene."
tldr: "Lakebase (Databricks) y Snowflake Postgres son bases de datos PostgreSQL gestionadas por el propio proveedor de la plataforma de datos, con un camino nativo entre el dato transaccional y el analítico. No fusionan OLTP y OLAP en un solo motor: cambian quién opera el puente entre los dos y bajo qué gobierno. El cambio conviene para aplicaciones nuevas, memoria de agentes y datos servidos a modelos; para la base central de un sistema legado con carga pesada, la base dedicada sigue siendo más segura."
keywords: ["Postgres en la plataforma de datos", "Databricks Lakebase", "Snowflake Postgres", "OLTP y OLAP", "pg_lake", "base de datos para agentes"]
---

**Postgres en la plataforma de datos** era una idea extraña hasta 2025. La base de datos de la aplicación vivía de un lado, el warehouse del otro, y entre ambos corría un pipeline de captura de cambios que alguien del equipo tenía que mantener. En mayo de 2025, Databricks anunció la compra de Neon, empresa de Postgres serverless, por cerca de US$ 1.000 millones. Poco después, Snowflake compró Crunchy Data, por un valor reportado de cerca de US$ 250 millones. En 2026, los dos productos que salieron de esas compras llegaron a disponibilidad general.

La pregunta que llega al decisor es directa: ¿la base de datos de mi aplicación debería vivir dentro de la plataforma de datos que ya pago? La respuesta corta es "a veces". Este texto separa lo que estos productos entregan de verdad, lo que sigue igual y cinco preguntas para decidir caso por caso. Donde el número es del proveedor, lo decimos.

## Qué son de verdad Lakebase y Snowflake Postgres

Los dos son PostgreSQL gestionado, operado por el proveedor de la plataforma de datos, con un camino nativo hacia el lado analítico. La diferencia está en el diseño de ese camino.

**Lakebase** hereda la arquitectura de Neon: almacenamiento separado del cómputo, escalado automático, apagado cuando está ocioso (*scale-to-zero*) y copias instantáneas de la base para desarrollo (*branching*). Según el [anuncio de disponibilidad general de Databricks](https://www.databricks.com/blog/databricks-lakebase-generally-available), de febrero de 2026, soporta hasta 8 TB por instancia, Postgres 17 con pgvector, recuperación a un punto en el tiempo y *sync tables* que mantienen el dato operativo sincronizado con el lakehouse bajo Unity Catalog. La disponibilidad general empezó en AWS, llegó a Azure en marzo y a Google Cloud a fines de octubre.

**Snowflake Postgres** parte de la tecnología de Crunchy Data y de pg_lake, extensión que Snowflake liberó bajo licencia Apache en noviembre de 2025. Con ella, el propio Postgres lee y escribe tablas Apache Iceberg y archivos Parquet en object storage. Snowflake afirma compatibilidad con aplicaciones Postgres existentes y soporte a extensiones como pgvector y PostGIS, y el servicio está en disponibilidad general en AWS y Azure.

> Ninguno de los dos fusiona transaccional y analítico en un solo motor. Cambian quién opera el puente entre ambos.

Este punto importa porque la tesis de que "OLAP no vive en OLTP", que defendimos al revisar [lo que sobrevivió del Modern Data Stack en 2026](/blog/es/modern-data-stack-2026.html), sigue en pie. La base transaccional sigue siendo Postgres, con los límites de Postgres. El warehouse sigue siendo warehouse. Lo que cambia es la dirección y la factura.

## Por qué los proveedores de datos quieren la base de la app

El argumento comercial tiene dos lados. El primero es el puente. Quien leyó nuestro análisis sobre [la promesa del zero-ETL](/blog/es/zero-etl-mito-ou-realidade.html) reconoce el patrón: el proveedor asume la replicación entre la base y el analítico, y el equipo deja de mantener conectores de CDC escritos a mano. Es una ganancia real para quien hoy opera ese puente con dos o tres pipelines frágiles.

El segundo lado son los agentes. En la compra de Neon, Databricks informó que más del 80% de las bases creadas en la plataforma eran aprovisionadas por agentes de IA, no por personas. Es un dato de la propia empresa, no una medición independiente, pero indica la dirección: los agentes y las aplicaciones generadas por IA necesitan bases pequeñas, baratas y descartables, creadas y borradas en segundos. Memoria persistente de agentes, datos servidos a modelos en tiempo real y analytics embebido en la aplicación son los casos de uso que destacan ambos proveedores.

Para el proveedor hay además un tercer motivo, menos dicho: la base operativa es donde nace el dato. Quien hospeda el nacimiento del dato tiene ventaja para hospedar todo lo demás.

## Qué no cambia cuando Postgres entra en la plataforma de datos

El Postgres gestionado por la plataforma de datos sigue siendo Postgres. Eso trae buenas y malas noticias.

La buena es la salida. Al ser compatible con Postgres, la base puede exportarse con las herramientas de siempre, como `pg_dump` y la replicación lógica. El riesgo de quedar atrapado es menor que con un formato propietario.

La mala es que las funciones que justifican el cambio (sincronización con el lakehouse, *branching*, gobierno unificado) son del proveedor, no de Postgres. Salir de la base es fácil; salir de la forma de trabajar construida a su alrededor, no. Es la misma lógica que describimos en [lock-in y costos de salida entre Databricks, Snowflake y BigQuery](/blog/es/databricks-snowflake-bigquery-lock-in.html), ahora aplicada a la capa que sostiene la aplicación en producción.

Tres límites prácticos también permanecen:

1. **Capacidad por instancia.** El techo de 8 TB de Lakebase atiende a la mayoría de las aplicaciones nuevas, pero no a la base central de un ERP que crece hace diez años.
2. **Latencia de arranque.** Escalar a cero ahorra dinero en entornos ociosos y lo cobra en tiempo de respuesta en la primera conexión. En aplicaciones de cara al cliente, esto se mide, no se presume.
3. **Cambio de esquema.** El puente gestionado replica el dato, pero no impide que una columna renombrada en la app rompa el modelo analítico. El contrato entre quien escribe y quien lee sigue siendo trabajo del equipo.

## Cinco preguntas para decidir si la base de la app se muda

La regla que usamos: el cambio conviene cuando al menos cuatro de las cinco respuestas apuntan a la plataforma de datos. Con menos, la base dedicada (RDS, Aurora, Cloud SQL, Azure Database) sigue siendo el estándar más seguro.

1. **¿Quién consume el dato que genera la app?** Si analytics, modelos o agentes necesitan el dato en minutos, el puente gestionado vale mucho. Si el dato solo alimenta un informe mensual, un pipeline simple resuelve.
2. **¿Cuál es el tamaño y el perfil de la carga transaccional?** Las aplicaciones nuevas, de volumen moderado y con picos irregulares, combinan con el escalado automático. Una carga de escritura alta y constante, miles de conexiones y una base cerca del techo de capacidad piden base dedicada.
3. **¿La plataforma de datos ya está elegida?** El producto solo tiene sentido en la plataforma que la empresa ya opera. Elegir Databricks o Snowflake por el Postgres embebido es invertir el orden de la decisión.
4. **¿Quién atiende el incidente a las 3 de la mañana?** Una base de aplicación en producción tiene guardia. Si pasa a vivir en la cuenta de la plataforma de datos, el equipo de datos hereda parte de esa guardia, o la responsabilidad queda sin dueño. Defínalo antes de migrar.
5. **¿Cuánto cuesta salir?** Liste lo que depende de funciones exclusivas del proveedor: sincronización, *branching*, permisos en el catálogo. Si la lista es larga, trate la elección como de largo plazo, con la misma seriedad que la elección del warehouse.

## Dónde conviene empezar, y dónde no

El punto de entrada de menor riesgo son las cargas nuevas. Aplicaciones internas de datos, memoria y estado de agentes, datos servidos a modelos en tiempo real y entornos de desarrollo que necesitan copias de la base en segundos. En esos casos, la ganancia de no mantener un puente propio aparece rápido, y equivocarse cuesta poco.

El punto de mayor riesgo es migrar la base central de un sistema legado que funciona. Una base transaccional madura tiene rutina de backup, guardia, ajuste fino y gente que conoce sus vicios. Moverla para ganar un puente automático cambia un problema conocido por uno desconocido. Nuestra estimación, a partir de los proyectos que acompañamos: para la empresa mediana, la primera aplicación en la plataforma de datos debe ser una aplicación nueva, y la decisión sobre el legado llega después de seis meses de operación real.

> Empiece por la app nueva, no por la base que paga la nómina. El puente gestionado se prueba donde equivocarse es barato.

El movimiento de ambos proveedores es serio y va a continuar. Eso no obliga a nadie a mudarse ahora. Sí obliga a dejar de tratar la base de la aplicación y la plataforma de datos como decisiones que nunca se encuentran.

## Preguntas que siempre vuelven

Tres dudas aparecen en casi toda conversación sobre Postgres dentro de la plataforma de datos.

## ¿Qué es Databricks Lakebase?

Databricks Lakebase es una base de datos PostgreSQL gestionada y serverless, construida sobre la tecnología de Neon, que corre dentro de la plataforma Databricks. Separa almacenamiento y cómputo, escala a cero cuando está ociosa, crea copias instantáneas de la base y sincroniza el dato operativo con el lakehouse bajo Unity Catalog. Está en disponibilidad general en AWS, Azure y Google Cloud.

## ¿Lakebase o Snowflake Postgres reemplazan la base de datos de la aplicación?

La reemplazan en aplicaciones nuevas y de volumen moderado, sobre todo cuando el dato necesita llegar rápido a analytics, modelos o agentes. Para la base central de un sistema legado, con carga pesada y operación madura, la base dedicada sigue siendo más segura. El criterio principal es quién consume el dato y quién atiende el incidente.

## ¿Cuál es la diferencia entre Lakebase y Snowflake Postgres?

Los dos son Postgres gestionado por el proveedor de la plataforma de datos, pero conectan el lado analítico de formas distintas. Lakebase hereda la arquitectura serverless de Neon y sincroniza tablas con el lakehouse de Databricks. Snowflake Postgres viene de Crunchy Data y usa pg_lake para leer y escribir Iceberg y Parquet desde el propio Postgres. En la práctica, la elección sigue a la plataforma que la empresa ya opera.
