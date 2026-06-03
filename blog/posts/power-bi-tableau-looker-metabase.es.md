---
title: "Power BI vs Tableau vs Looker vs Metabase — matriz por tamaño"
slug: "power-bi-tableau-looker-metabase"
pillar: "data"
date: "2026-06-03"
readMinutes: 7
excerpt: "Cuatro herramientas de BI, tres dimensiones de decisión y una matriz por tamaño de empresa. La respuesta raramente es la más cara."
tldr: "Power BI, Tableau, Looker y Metabase sirven contextos distintos, no una jerarquía de calidad. La elección depende de tres factores: stack de nube existente, madurez del equipo de datos y costo total de operación en moneda local. Esta matriz organiza las cuatro por tamaño de empresa y contexto, con cinco preguntas para decidir sin error."
keywords: ["Power BI", "Tableau", "Looker", "Metabase", "comparativo BI", "herramientas de inteligencia de negocio"]
---

Cuando la decisión de herramienta de BI llega a la mesa, casi siempre trae la pregunta equivocada: ¿cuál es la mejor? Power BI, Tableau, Looker y Metabase aparecen en todo comparativo de mercado con features alineadas, benchmarks parecidos y casos de éxito en todos los sectores. La respuesta honesta es que la mejor herramienta es la que cabe en tu contexto — y en los mercados latinoamericanos hay una variable adicional: el costo en moneda local de licencias dolarizadas con un tipo de cambio que no para de oscilar.

Este texto construye la matriz. No es análisis de features — es guía de decisión por tamaño y contexto. Si ya conoces las herramientas y quieres la respuesta directa, ve a "Matriz por tamaño". Si quieres entender los criterios, lee desde el principio.

## Lo que las cuatro tienen en común — y dónde divergen de verdad

Las cuatro herramientas se conectan al mismo conjunto de warehouses (Snowflake, BigQuery, Redshift, Databricks), generan dashboards visualmente comparables y tienen APIs para embed en producto. La confusión en los comparativos de mercado viene exactamente de ahí: en la superficie, hacen cosas parecidas.

Las divergencias reales están en tres dimensiones:

1. **Costo total de propiedad.** Licenciamiento + infraestructura + costo humano de operar. Esta cuenta varía mucho entre las cuatro — y aún más dependiendo del tipo de cambio al momento del contrato.
2. **Integración con el stack existente.** Power BI es nativo en el ecosistema Microsoft (Azure, M365, SQL Server). Looker es nativo en Google Cloud (BigQuery). Tableau y Metabase son warehouse-agnósticos: encajan en cualquier stack, sin ventaja nativa en ninguno.
3. **Exigencia técnica de operación.** Metabase no requiere especialista en BI — cualquier analista con SQL básico puede operarlo. Looker requiere un ingeniero con LookML, perfil de data engineer. Tableau y Power BI están en el medio: necesitan analista de BI, no ingeniero de datos.

## Anatomía de las cuatro herramientas

**Power BI** es la apuesta del ecosistema Microsoft. Quien ya corre M365 + Azure recibe el Pro incluido o a costo marginal — el licenciamiento bundled es su mayor ventaja competitiva. El modelo de datos en DAX es aprendible por un analista de BI en pocas semanas. La limitación aparece en la escala: compartir dashboards fuera de M365 requiere Premium Per User o capacidad Premium Per Capacity, y ese salto de costo es relevante en la negociación.

**Tableau** no tiene par en flexibilidad visual y exploración ad hoc. Tableau Prep + Desktop + Server/Cloud entrega un pipeline completo de visualización enterprise. La limitación es directa: es la más cara de las cuatro. Al tipo de cambio actual, Tableau Creator puede resultar prohibitivo para empresas medianas sin equipo de BI dedicado. [Construir analítica ejecutiva que se convierte en decisión con Tableau](/blog/es/tableau-linguagem-executiva.html) requiere más que la licencia — requiere un modelo de datos sólido por debajo.

**Looker** es la apuesta de Google en la capa semántica. LookML crea una fuente única de verdad para las definiciones de métricas — exactamente [el problema que la capa semántica resuelve en el stack de datos actual](/blog/es/modern-data-stack-2026.html), y donde la mayoría de las empresas todavía improvisa. BigQuery + Looker es la combinación más integrada disponible en plataforma pública. La exigencia de LookML es real: no es una herramienta de self-service; es un producto del equipo de datos con un ingeniero dedicado.

**Metabase** es el camino más rápido hacia BI sin especialista. La versión open-source corre en cualquier VM en la nube; la versión Cloud comienza en alrededor de USD 500/mes. Interfaz SQL o sin SQL, se conecta a cualquier warehouse. La limitación es de escala: governance, permisos granulares y embedding complejo empiezan a requerir workarounds por encima de ~200 usuarios activos.

## Matriz por tamaño y contexto empresarial

**Startup y PyME (hasta ~200 empleados).** Metabase o Power BI. Metabase cuando no hay analista de BI dedicado y quien opera el BI es el propio negocio con SQL. Power BI cuando ya existe dependencia de Microsoft 365 y el equipo financiero vive en Excel. Tableau y Looker tienen costos de licencia y operación incompatibles con este tamaño.

**Mediana empresa (200–1.000 empleados).** Power BI si el stack es Microsoft; Tableau si hay equipo de BI y el presupuesto lo permite. En este rango, la decisión casi siempre sigue la nube principal: si IT ya corre Azure + SQL Server, el licenciamiento de Power BI es marginal. Si el stack es mixto o AWS, Tableau entra con ventaja en flexibilidad visual — si el contrato cabe en el presupuesto anual.

**Gran empresa (más de 1.000 empleados, múltiples equipos de datos).** Tableau o Looker. Tableau cuando el equipo tiene analistas de BI que hacen visualización. Looker cuando hay ingenieros de datos que mantienen modelos LookML. A esta escala, governance y capa semántica importan más que la flexibilidad de visualización.

**Google Cloud shop (cualquier tamaño).** Looker nativo. BigQuery + Looker es una oferta completa e integrada. Cambiar de herramienta de BI en ese stack es fricción técnica que raramente se justifica.

**Enterprise Microsoft (más de 2.000 empleados + Power Platform).** Power BI Premium. A esta escala, Power BI Embedded + Power Platform + Azure tiene sentido como plataforma de producto de datos — no solo capa de dashboard.

> La matriz por tamaño es punto de partida, no veredicto. Lo que decide en la segunda capa es la madurez del dato que va a alimentar la herramienta.

## Las cinco preguntas que deciden

1. **¿Tu stack de nube es predominantemente Microsoft o Google?** Microsoft → Power BI. Google Cloud → Looker. Ninguno de los dos → Tableau o Metabase, por tamaño y presupuesto.

2. **¿Tienes analista de BI dedicado — o el negocio va a operar solo?** Self-service por el negocio → Metabase o Power BI. Equipo de BI dedicado → cualquiera de las cuatro; refina por stack y costo.

3. **¿Cuál es el costo en moneda local por año, incluyendo storage, compute y horas del equipo?** Calcula el TCO completo. Para empresas medianas en Latinoamérica, Tableau y Looker suman con frecuencia entre USD 50k y USD 100k/año en licenciamiento + operación. Power BI Premium puede acercarse dependiendo del número de usuarios. Metabase Cloud está en el rango de USD 6k–15k/año.

4. **¿El problema principal es exploración ad hoc o respuesta estandarizada?** Exploración ad hoc → Tableau tiene la mejor interfaz. Métricas estandarizadas con governance → Looker (LookML). Reportes operacionales rápidos → Power BI o Metabase.

5. **¿Ya tienes el problema de "cada área con su propio número"?** Si es así, la prioridad es la capa semántica antes que la herramienta de BI. Ninguna de las cuatro lo resuelve sola — [el self-service sin governance reproduce exactamente ese problema](/blog/es/self-service-bi.html), independientemente de qué herramienta esté al frente. Resuelve el modelo de datos primero; la herramienta de visualización es la última decisión, no la primera.

## Los tres antipatrones que cuestan proyecto y presupuesto

**Elegir la herramienta antes de la arquitectura.** La herramienta de BI es la última decisión del stack, no la primera. Warehouse, capa de transformación (dbt o nativa), capa semántica — en ese orden. Los proyectos que empiezan con "vamos a usar Tableau" frecuentemente descubren que el modelo de datos no soporta la complejidad semántica esperada, y la implementación se convierte en dos años de corrección del modelo.

**Comprar Tableau o Looker sin ingeniero de datos.** Tableau sin datos modelados entrega dashboards bonitos e imprecisos. Looker sin ingeniero LookML es una cáscara vacía. Las dos herramientas requieren inversión en infraestructura de datos — no solo en licencia de visualización.

**Usar Metabase más allá del tamaño adecuado.** Metabase es un excelente punto de entrada. No es una herramienta enterprise. Por encima de ~200–300 usuarios activos, aparecen fallas de governance, problemas de permisos granulares y consultas lentas. Crecer más allá de Metabase es madurez — no es fracaso.

## La pregunta que viene antes del contrato de licencia

La decisión de BI es, en la práctica, una decisión de arquitectura de datos con interfaz visual. Quien licencia la herramienta sin resolver lo que está por debajo — dato fragmentado, sin capa semántica, sin dueño de métricas — va a cambiar de herramienta en dos años y reproducirá el mismo problema en un stack nuevo.

La pregunta que una consultoría especializada hace antes de recomendar cualquier herramienta: "¿El dato que va a alimentar este BI está modelado, gobernado y con un dueño claro?" Si la respuesta no es sí, esa conversación tiene que ocurrir antes que la conversación con el vendedor de licencias.
