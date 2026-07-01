---
title: "Lakehouse no es la bala de plata: cuándo el warehouse sencillo sigue ganando"
slug: "lakehouse-vs-warehouse"
pillar: "data"
date: "2026-07-01"
readMinutes: 7
excerpt: "¿Lakehouse o warehouse sencillo? La respuesta depende del volumen, la variedad del dato y la madurez del equipo — no del discurso del vendor."
tldr: "Lakehouse agrega capas de ingeniería que solo tienen sentido cuando el volumen y la variedad del dato lo justifican. La mayoría de las empresas medianas todavía no llegó a ese punto. Antes de adoptarlo, respondé tres preguntas sobre tu caso de uso y decidí con un TCO honesto — no con una presentación de vendor."
keywords: ["lakehouse", "data warehouse", "Databricks", "Snowflake", "arquitectura de datos"]
---

Toda conferencia de datos tiene al menos un slide con la arquitectura lakehouse en el centro. Delta Lake sobre S3, Apache Iceberg gestionando schema, Databricks o Spark procesando SQL y Python en el mismo lugar. Es una arquitectura elegante que resuelve un problema real — y que se convirtió en plantilla de ventas para resolver *cualquier* problema, incluidos aquellos para los que no es la respuesta correcta.

Si sos CTO o decisor técnico en una empresa mediana, probablemente recibiste la propuesta en los últimos meses. Este texto es sobre cuándo lakehouse es la elección correcta, cuándo el warehouse sencillo sigue ganando, y cómo separar los dos sin caer en ideología de plataforma.

## Lo que lakehouse resuelve — y lo que no resuelve

Lakehouse nació de un problema legítimo: los data lakes en S3 almacenan dato barato y en cualquier formato, pero no hacen queries SQL bien. Los warehouses como BigQuery y Snowflake hacen queries excelentes, pero son caros para almacenar dato crudo voluminoso y no soportan ML workloads nativamente. La arquitectura lakehouse, popularizada por el Delta Lake de Databricks y luego por Apache Iceberg, propone una capa transaccional sobre almacenamiento de objetos — ACID, schema enforcement, SQL sobre Parquet en el mismo lugar que los notebooks de ML.

Para quienes tienen los tres problemas simultáneamente — volumen industrial, workload analítico *y* ML en producción, equipo mixto de ingenieros y científicos — lakehouse es la respuesta correcta. El error está en asumir que "lo que funciona para una empresa con decenas de ingenieros de datos funciona para una empresa con dos".

> La arquitectura correcta es la más simple que resuelve tu caso de uso. Un lakehouse demasiado elegante para el problema que tenés es deuda técnica con nombre bonito.

## Cuándo lakehouse tiene sentido de verdad

Tres condiciones deben existir simultáneamente para que lakehouse sea la elección racional:

1. **Volumen y variedad que el warehouse gestionado no soporta con costo razonable.** Dato de IoT a escala industrial, log de eventos en cientos de millones de registros por día, dato de streaming continuo, múltiples fuentes con schemas radicalmente distintos. Si la empresa tiene un CRM, un ERP y algunas integraciones de SaaS, el warehouse gestionado lo resuelve con margen.
2. **ML corriendo en producción — no en piloto, no en un plan.** Lakehouse tiene sentido cuando la misma plataforma de dato debe servir queries SQL analíticas *y* feature stores de modelos *y* entrenamiento. Si el equipo es de analistas de BI con interés eventual en ML, el warehouse es suficiente y lo será por años. "Planes de ML" no justifican arquitectura — modelos en producción, sí.
3. **Ingeniería madura para operar lo que lakehouse exige.** Delta Lake e Iceberg tienen conceptos que no existen en el warehouse gestionado: compaction, Z-ordering, vacuum, time travel con retención gestionada, schema evolution con compatibilidad backward. Son decisiones tomadas cada semana. Un equipo pequeño sin experiencia en este stack se ahoga, y la plataforma se convierte en problema de mantenimiento en vez de ganancia de escala.

Si falta una de las tres, estás agregando complejidad sin la ganancia que la justifica.

## Lo que el warehouse sencillo sigue entregando — y mejor

Para la mayoría de las empresas medianas latinoamericanas, el perfil del dato es transaccional y estructurado: CRM, ERP, e-commerce, SaaS B2B. Volumen en el rango de pocos terabytes, a lo sumo algunas decenas. [Snowflake, BigQuery, Databricks SQL Warehouse](/blog/es/snowflake-bigquery-databricks.html) operan cómodamente en este alcance, con SQL estándar, compute elástico y operaciones esencialmente nulas.

Agregá [ELT encima — herramienta de ingesta para mover datos, dbt para modelado](/blog/es/elt-vs-etl.html) — y el equipo entrega analytics confiable en cuatro a seis semanas. El mismo setup en lakehouse lleva de tres a cuatro meses, requiere un ingeniero familiarizado con Iceberg o Delta, y exige gobernanza de compaction desde el día 1. El resultado analítico es equivalente; el costo de llegar no lo es.

Tres ventajas concretas del warehouse gestionado para este perfil:

- **Operaciones SaaS incluidas.** Vacuum, compaction, upgrades, monitoreo de performance: vienen en la licencia. En lakehouse self-managed, son rutinas semanales de ingeniería que consumen tiempo que podría ir al modelado de dato.
- **SQL como lengua franca.** En un warehouse, un analista de negocio funcional aprende a operar en días. En lakehouse con Spark SQL o notebooks PySpark, el equipo mínimo funcional requiere mayor especialización.
- **Costo predecible a escala media.** Lakehouse se vuelve competitivo a escala de petabyte. A escala de terabyte, el warehouse gestionado suele tener menor TCO cuando se suma la ingeniería de operación al cálculo.

[El modelado dimensional bien hecho sobre warehouse gestionado](/blog/es/modelagem-dimensional-2026.html) cubre el 90% de los casos analíticos de empresas medianas. El resto rara vez justifica la diferencia de costo y tiempo de implementación.

## Dos perfiles que piden respuestas distintas

Las empresas que llegan con el pedido de "migrar a lakehouse" suelen ser uno de dos perfiles.

**Perfil A: la empresa creció de verdad.** El volumen se triplicó, el equipo de datos tiene un científico de ML en producción, el warehouse está sufriendo con queries complejas o costos de almacenamiento de dato crudo. Aquí tiene sentido evaluar la migración — pero evaluarla junto a un upgrade de tier del warehouse actual, no como sustituto automático. En muchos casos, aumentar el tier o reorganizar el modelo de facturación resuelve el problema por uno o dos años más, con menor TCO que una migración completa de stack.

**Perfil B: el CTO fue a una conferencia.** Volvió queriendo lakehouse. El dato de la empresa cabe en dos marts bien organizados. El equipo son tres analistas y un ingeniero. La propuesta del vendor tiene doce slides con arquitectura de referencia de una empresa con trescientos ingenieros. El trabajo de una consultoría especializada en este caso es honesto: la arquitectura es elegante, pero el problema que resuelve no es el tuyo.

La señal de que el warehouse todavía es suficiente: el modelado está funcionando, los marts sirven los casos de uso activos, y el cuello de botella real no es la arquitectura — es falta de dueño del dato, proceso de calidad, o contrato de modelado con el negocio.

## Tres preguntas antes de cualquier evaluación de plataforma

Antes de entrar a una demo, antes de pedir un benchmark, antes de pedir una propuesta:

1. **¿Qué workload específico no podés correr hoy que lakehouse resolvería?** Si la respuesta es vaga — "escalar mejor", "ser más moderno", "soportar ML en el futuro" — el problema no está definido. Una plataforma nueva no define problemas; amplifica los que ya existen.
2. **¿Quién va a operar en doce meses?** Si la respuesta es el mismo equipo de dos ingenieros ya sobrecargados, el riesgo operacional es real. Lakehouse sin equipo dedicado se convierte en pasivo de mantenimiento. Y contratar un ingeniero senior de Iceberg en el mercado regional tiene su propio costo y tiempo.
3. **¿El costo total de migración y operación está en tu plan de tres años?** Migrar de warehouse a lakehouse no es lift-and-shift — es reescritura de pipelines, curva de aprendizaje de nuevo stack, capa de observabilidad diferente, posiblemente un nuevo perfil de contratación. Ese costo rara vez aparece en el deck del vendor y rara vez está en el presupuesto inicial.

En la práctica de consultoría especializada, la mayoría de las empresas medianas que responden honestamente estas tres preguntas concluye que el warehouse gestionado sigue siendo la decisión correcta. Este diagnóstico no es conservador — es lo que muestran los números cuando la cuenta se hace sin ideología de plataforma.

## La decisión correcta es menos elegante

Un warehouse bien operado, con [dbt para versionado, documentación y tests de modelos](/blog/es/dbt-na-pratica.html), cubre el analítico de empresas medianas por años. Lakehouse tiene su lugar — en datos intensivos de eventos, en operaciones con ML maduro, en equipos con ingeniería sólida que necesita lo que los warehouses gestionados no entregan bien.

La conversación que importa no es qué arquitectura tiene más slides en conferencias. Es quién es dueño del dato, cómo está versionado el modelado, y qué casos de uso sirve la plataforma hoy. Comprar lakehouse sin el workload que lo justifica es pagar por motor de avión en un auto de ciudad — el auto anda, el motor no ayuda, y el mantenimiento aparece en la próxima revisión.
