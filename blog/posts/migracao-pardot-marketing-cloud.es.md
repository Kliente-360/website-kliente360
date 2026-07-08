---
title: "Migración de Pardot a Marketing Cloud Engagement: lo que el proyecto no revela"
slug: "migracao-pardot-marketing-cloud"
pillar: "sf"
date: "2026-06-10"
readMinutes: 6
excerpt: "Pardot y Marketing Cloud Engagement no son el mismo producto. Qué cambia, qué hay que reconstruir y cuándo migrar no compensa."
tldr: "Pardot (MCAE) y Marketing Cloud Engagement tienen arquitecturas distintas: el modelo de datos, los templates y la lógica de journey deben reconstruirse, no convertirse. La migración exige un inventario de programas activos, la definición del Subscriber Key y el calentamiento de IP antes de que empiece el proyecto. Tiene sentido si el uso real es B2C o multicanal a escala — no si el marketing es B2B puro orientado a pipeline."
keywords: ["migración Pardot", "Marketing Cloud Engagement", "Pardot a Marketing Cloud", "MCAE", "automatización de marketing Salesforce"]
---

La propuesta llega en dos contextos habituales: renovación de licencia con una sugerencia de upgrade, o revisión del stack de marketing que detecta un crecimiento que excede las capacidades de Pardot. En ambos casos, el partner de Salesforce enmarca el cambio como "migración" — y ahí es donde el proyecto empieza a acumular sorpresas.

Pardot, rebautizado como Marketing Cloud Account Engagement (MCAE) en 2022, y Marketing Cloud Engagement no son versiones del mismo producto en escalas distintas. Son plataformas con arquitecturas diferentes, modelos de datos distintos y perfiles de uso originalmente separados.

> Lo que parece una migración casi siempre es una reimplementación — con el presupuesto y el plazo de un proyecto nuevo.

## Pardot y Marketing Cloud Engagement parten de supuestos distintos

El MCAE fue construido para marketing B2B: leads conectados a oportunidades en el CRM, nurture basado en puntuación de engagement, formularios que alimentan el pipeline comercial. La entidad de dato central es el Lead — el mismo objeto de Sales Cloud, con sincronización nativa y sin configuración adicional.

Marketing Cloud Engagement fue construido para operaciones de marketing B2C a escala: envío de email en lote, journeys multicanal (email, SMS, push, anuncios), segmentación en Data Extensions, templates dinámicos con AMPscript. La entidad de dato central no es el Lead — es el Subscriber, con clave independiente y vínculo al CRM a través de Marketing Cloud Connect, configurado por separado.

Esta diferencia de supuesto se propaga en cascada por todo el proyecto:

1. **Modelo de datos.** El MCAE usa los objetos de Salesforce directamente (Lead, Contact, Account, Opportunity). El MCE usa Data Extensions — tablas relacionales configurables sin vínculo nativo con el CRM. La sincronización requiere Marketing Cloud Connect, que debe configurarse, probarse y monitorizarse como parte del alcance.

2. **Sintaxis de template.** El MCAE usa HML (Handlebars Merge Language). El MCE usa AMPscript — un lenguaje propietario con lógica condicional, bucles y llamadas a API inline. Los templates HML no se convierten en AMPscript: deben reescribirse.

3. **Lógica de journey.** El Engagement Studio del MCAE está orientado a condiciones del CRM: puntuación de lead, etapa de oportunidad, valores de campo. El Journey Builder del MCE está orientado a eventos: entrada por flujo de datos, desencadenante externo, ramificación por atributo de Data Extension. La lógica de negocio existe en ambas herramientas — pero los desencadenantes disponibles y las condiciones de salida son suficientemente distintos para exigir un rediseño de los programas, no una conversión.

## Qué debe ocurrir antes de que empiece el proyecto

Los proyectos de migración que encuentran sorpresas a mitad del camino casi siempre se saltaron la fase de diagnóstico. Cuatro inventarios son obligatorios antes de aprobar el alcance y el plazo:

1. **Inventario de programas activos.** ¿Cuántos Engagement Programs están en marcha en el MCAE? ¿Con cuántos pasos? ¿Con cuántos leads dentro? Cada programa activo necesita un equivalente en Journey Builder — y el mapeo de la lógica es manual, no importable.

2. **Inventario de templates.** Listar los emails HML activos y de uso frecuente (bienvenida, nurture, reactivación). Los templates abandonados no necesitan migrarse; los de uso frecuente deben reescribirse en AMPscript o convertirse al editor de arrastrar y soltar de Content Builder. La cantidad de templates es el principal factor del plazo — no la configuración de la plataforma.

3. **Mapeo del modelo de contactos.** En el MCAE, la clave sigue el modelo de Salesforce (Lead ID o Contact ID). En el MCE, la clave es el Subscriber Key — configurable como email, CRM ID o un identificador propio. Definir esta clave antes de importar datos evita el problema más costoso: suscriptores duplicados con historial fragmentado.

4. **Historial de reputación de IP.** Para volúmenes superiores a 100.000 emails al mes, la migración requiere el calentamiento de IP en MCE — un proceso gradual de 4 a 8 semanas que no puede comprimirse sin riesgo de aparecer en listas negras. El calentamiento debe incluirse en el cronograma con margen real, no como una línea paralela al go-live.

## Trampas que aparecen después del go-live

Incluso con un buen diagnóstico, algunas dificultades surgen en el uso real:

**Marketing Cloud Connect no es plug-and-play.** La integración con Salesforce CRM requiere configurar Synchronized Data Sources, mapeo de campos y pruebas de latencia. En implementaciones apresuradas, el Connect funciona en sandbox y falla bajo carga real — especialmente cuando hay un volumen alto de actualizaciones simultáneas de Lead y Contact.

**Los permisos siguen su propio modelo.** En el MCAE, los permisos siguen los perfiles de Salesforce. En el MCE, el modelo es interno: Roles, Business Units y permisos de Content Builder deben configurarse por separado. Los equipos con varias marcas o líneas de producto necesitan rediseñar la estructura de acceso — no limitarse a replicar lo que existía en el CRM.

**Los informes no migran.** Los reportes de campaña del MCAE (open rate, click rate, pipeline generado) no tienen equivalente automático en el MCE. Intelligence Reports usa un modelo diferente, y el historial de campañas antiguas rara vez migra con fidelidad al nuevo sistema.

**El coste de licencia sube.** El MCE es un producto enterprise con una estructura de precios diferente a la del MCAE. Los proyectos que tratan la migración como un "upgrade" frecuentemente descubren en el contrato final que el coste anual aumentó entre un 40 y un 100% — con una justificación válida, pero que debería haberse incluido en el business case desde el principio.

## Cuándo la migración no compensa

[La misma lógica para evaluar cuándo no usar Salesforce](/blog/es/quando-nao-usar-salesforce.html) se aplica a la elección entre MCAE y MCE: el coste de licencia y operación debe justificar la capacidad adicional.

Si el modelo de uso es principalmente B2B — cualificación de leads con scoring, nurture basado en pipeline, reportes de campaña vinculados a oportunidades — el MCAE es el producto más adecuado. La integración nativa con el CRM, la lógica de puntuación y el Engagement Studio fueron construidos exactamente para ese caso. Migrar a MCE en ese escenario supone pagar más por una plataforma construida para otro perfil de uso.

El MCE compensa cuando el marketing opera con alto volumen de comunicación transaccional o multicanal — campañas B2C con segmentación comportamental compleja, o cuando [Marketing Cloud necesita consumir datos del Data Cloud](/blog/es/marketing-cloud-data-cloud.html) para una personalización granular a escala. En esos escenarios, la arquitectura del MCE entrega lo que el MCAE no puede.

La pregunta de calificación antes de cualquier propuesta de migración: **¿el caso de uso real es B2C o multicanal a escala?** Si es así, la migración tiene fundamento técnico sólido. Si el marketing sigue orientado al pipeline B2B, la recomendación honesta es optimizar el MCAE en lugar de migrar.

## El alcance real de un proyecto de migración

Para referencia de plazo: una migración con 10 a 20 programas activos, 30 a 50 templates y un equipo de marketing de tamaño mediano requiere entre 12 y 20 semanas en proyectos bien gestionados. No seis — y no con el mismo equipo que realizó la implementación original de Salesforce.

El diagnóstico ocupa las primeras 4 semanas: inventario de programas, mapeo del modelo de datos, decisión sobre el Subscriber Key, diseño de Data Extensions. La reescritura de templates y la reconstrucción de journeys ocupa las siguientes 6 a 10 semanas. El calentamiento de IP y las pruebas de Marketing Cloud Connect se ejecutan en paralelo. Un go-live por fases — empezando por los programas más simples — cierra el proyecto con menor riesgo.

[Mapear lo existente antes de configurar](/blog/es/mapear-processos-antes-do-salesforce.html) es la disciplina que distingue las implementaciones de CRM exitosas de las que necesitan rehacerse en dos años. En una migración de plataforma de marketing, el diagnóstico no es overhead — es el trabajo que determina si el proyecto termina en go-live o en reproceso.

## Preguntas que siempre vuelven

Antes de cerrar, las dudas que más aparecen cuando esta migración entra en la conversación.

## ¿Cuánto tarda una migración de Pardot a Marketing Cloud?

Entre 12 y 20 semanas en un proyecto bien gestionado con 10 a 20 programas activos y 30 a 50 templates — no seis semanas, y no con el mismo equipo que hizo la implementación original de Salesforce. Las primeras 4 semanas son diagnóstico: inventario de programas, mapeo del modelo de datos, decisión sobre el Subscriber Key y diseño de Data Extensions. La reescritura de templates y la reconstrucción de journeys ocupan las 6 a 10 semanas siguientes, con el calentamiento de IP y las pruebas de Marketing Cloud Connect corriendo en paralelo.

El principal factor del plazo no es la configuración de la plataforma — es la cantidad de templates a reescribir. Y si enviás más de 100.000 emails al mes, el calentamiento de IP suma de 4 a 8 semanas que no pueden comprimirse sin riesgo de caer en listas negras.

## ¿Se pueden reaprovechar los templates y journeys de Pardot en Marketing Cloud?

No — templates y journeys deben reconstruirse, no convertirse. El MCAE usa HML (Handlebars Merge Language) y el MCE usa AMPscript: los templates HML no se convierten, hay que reescribirlos o rehacerlos en Content Builder. Lo mismo aplica a los journeys: el Engagement Studio está orientado a condiciones del CRM, mientras que el Journey Builder está orientado a eventos — los desencadenantes y las condiciones de salida son suficientemente distintos para exigir el rediseño de cada programa, con mapeo manual de la lógica.

Por eso lo que el mercado llama "migración" es, en la práctica, una reimplementación — con el presupuesto y el plazo de un proyecto nuevo. La parte buena: los templates abandonados no necesitan migrarse, así que un inventario honesto reduce el alcance real.

## ¿Sube el coste de licencia al pasar de Pardot a Marketing Cloud?

Sí, y de forma relevante: el MCE es un producto enterprise con una estructura de precios diferente, y los proyectos que tratan el cambio como un "upgrade" suelen descubrir en el contrato final que el coste anual aumentó entre un 40 y un 100%. La justificación puede ser válida — capacidad multicanal, escala B2C, personalización granular — pero ese número debería estar en el business case desde el principio, no aparecer como sorpresa en la renovación.

La pregunta de calificación antes de aceptar cualquier propuesta: ¿el caso de uso real es B2C o multicanal a escala? Si el marketing sigue orientado al pipeline B2B, la recomendación honesta es optimizar el MCAE en lugar de pagar más por una plataforma construida para otro perfil de uso.
