---
title: "Salesforce en 6 Semanas: Qué Cabe de Verdad en un MVP"
slug: "implementacao-salesforce-seis-semanas"
pillar: "sf"
date: "2026-06-02"
readMinutes: 6
excerpt: "Seis semanas es el mínimo honesto para un MVP de Salesforce funcional. Qué entra en el alcance, qué no, y cómo validarlo antes de firmar el contrato."
tldr: "Una implementación de Salesforce en 6 semanas es posible — con un alcance honesto. Qué cabe en un MVP real: Sales Cloud con proceso comercial mapeado, pipeline configurado, reportes básicos y adopción estructurada. Qué no cabe: integraciones con ERP, Flows complejos, múltiples Clouds, personalizaciones pesadas de objetos. Las propuestas de '14 días' entregan configuración, no implementación."
keywords: ["implementación Salesforce", "Salesforce MVP", "Sales Cloud", "proyecto Salesforce", "plazo CRM"]
---

Toda propuesta de "Salesforce en 14 días" es real en algún sentido — y engañosa en el sentido que importa. Lo que se entrega en 14 días es una org configurada, no una implementación. La diferencia es la misma que separa una planilla de un proceso comercial real: una tiene interfaz, la otra tiene lógica.

Seis semanas es el mínimo honesto para un MVP de Salesforce que sirva como base real de operación. Más puede ser necesario dependiendo del alcance. Menos es configuración con fecha de vencimiento de 90 días.

## Qué entrega realmente "14 días"

Una "implementación express" en dos semanas típicamente entrega: creación de la org, configuración de objetos estándar (Account, Contact, Opportunity), importación de leads desde una planilla, uno o dos dashboards básicos y acceso de usuario. Es una instalación guiada, no una implementación.

Lo que no entrega: proceso comercial mapeado en las etapas de Salesforce, validación de campos por etapa del embudo, automatización básica probada, integración de correo capturada como actividad, reporte que el gerente usará en la reunión semanal, ni un rollout con adopción real. Estos elementos llevan tiempo — no porque la herramienta sea complicada, sino porque dependen de decisiones humanas sobre el proceso.

La promesa de 14 días tiene sentido cuando el cliente ya sabe exactamente qué quiere, tiene datos limpios para migrar y no necesita nada más allá de la configuración estándar. Ese cliente existe. Pero no es la mayoría. Para quien todavía está definiendo su proceso, 14 días entrega una herramienta que nadie usa — y a los 90 días la org está en estado de abandono.

## Qué cabe en 6 semanas

Un MVP honesto de Salesforce en seis semanas puede entregar un conjunto bien definido:

1. **Proceso comercial mapeado.** Etapas de Oportunidad que reflejan el embudo real de la empresa — no la plantilla predeterminada de Salesforce. Incluye criterios de entrada y salida por etapa, campos obligatorios por fase y una guía de calificación inline.

2. **Pipeline configurado.** Sales Cloud con vista kanban funcionando, filtros por segmento, ordenación por fecha de cierre y, sobre todo, un reporte de embudo que el gerente puede leer en 5 minutos al inicio de la semana. Un reporte que genera decisiones, no uno que simplemente "está ahí".

3. **Registro de actividades integrado.** Correo conectado (Gmail u Outlook vía Einstein Activity Capture), registro de llamadas si el equipo usa softphone y una plantilla básica de seguimiento que los vendedores realmente usen — no la que quedó en las diapositivas del entrenamiento.

4. **Adopción estructurada.** No entrenamiento — adopción. Dos sesiones con el equipo, seguimiento de uso durante las primeras dos semanas post-go-live y, fundamental, el gerente usando el reporte de Salesforce en las reuniones semanales como herramienta oficial de gestión. Esto es lo que separa una org que se convierte en hábito de una que se abandona.

5. **Ciclo mínimo de sandbox.** Todo cambio va primero a sandbox, validado por un usuario clave, luego a producción. [Una estrategia de sandbox no es un lujo de las grandes empresas](/blog/es/sandbox-strategy.html) — es lo que evita que el proyecto aparezca meses después con cambios sin control y sin que nadie sepa quién configuró qué.

Este alcance es específico por diseño. Cinco bloques claros. Si alguno no está en el contrato, el MVP depende de que quien entrega haga lo correcto voluntariamente — y eso es fragilidad de gestión, no colaboración.

## Qué NO cabe en 6 semanas

Saber qué excluir es tan importante como saber qué incluir — y comunicarlo antes de firmar.

No cabe en seis semanas:

- **Integración con ERP.** Salesforce ↔ SAP, Totvs, Oracle o cualquier ERP son proyectos con contrato propio. Intentar embutir la integración en un MVP de 6 semanas resulta en datos inconsistentes en ambos extremos y depuración que consume el tiempo del go-live.

- **Automatización compleja de Flows.** Automatización que envía correos al cliente, genera documentos de propuesta o mueve etapas automáticamente requiere mapeo de excepciones y pruebas de carga. En el MVP, automatice notificaciones internas; deje las automatizaciones externas para el siguiente ciclo.

- **Múltiples Clouds simultáneos.** Sales Cloud + Service Cloud + Marketing Cloud en un sprint de 6 semanas no es un MVP — es una carrera al fracaso. Cada Cloud tiene su propia curva de adopción y complejidad de configuración. Comience con Sales Cloud, estabilícelo y luego expanda. El mismo plazo comprimido aparece en [migraciones de Pardot a Marketing Cloud Engagement](/blog/es/migracao-pardot-marketing-cloud.html) — la propuesta promete un upgrade rápido, y el proyecto real revela una reimplementación completa.

- **Personalización pesada de objetos.** Los objetos personalizados más allá de Account, Contact, Opportunity y Lead solo pertenecen al MVP si el proceso genuinamente no funciona sin ellos. En la mayoría de los casos, [mapear el proceso antes de la configuración](/blog/es/mapear-processos-antes-do-salesforce.html) revela que un objeto estándar bien configurado resuelve el problema — y ahorra de 2 a 4 semanas del proyecto.

- **Reporting ejecutivo sofisticado.** Dashboards con cross-object, tendencias históricas, cohortes de conversión — eso viene en la segunda ola, cuando ya hay 60 o más días de datos reales. El dashboard del MVP es táctico, no estratégico.

> Un MVP no es una versión inferior del producto. Es la versión que entrega valor completo en un alcance menor — y que sobrevive 90 días de uso real sin necesitar parches.

## Cómo validar si el alcance cabe en 6 semanas

Antes de firmar, pase el alcance por cuatro preguntas:

1. **¿Cuántos objetos personalizados?** Más de 2 objetos no estándar en el MVP y el plazo ya enfrenta riesgo real.

2. **¿Hay integración con un sistema legado?** Toda integración más allá de las APIs/OAuth documentadas de Salesforce (como Gmail y Outlook) multiplica el riesgo de plazo por un factor mínimo de 2x.

3. **¿Está el proceso comercial mapeado antes de iniciar el proyecto?** Si la respuesta es "lo definiremos durante el proyecto", el plazo de 6 semanas se convertirá en 12. El proceso no documentado es la principal causa de desbordamientos de plazo en implementaciones de CRM.

4. **¿Cuántos usuarios en el go-live?** Por encima de 30 usuarios, el rollout de adopción necesita presupuesto y cronograma propio — no puede ser una única sesión de entrenamiento el último día del proyecto.

Si más de dos respuestas son "no" o "por encima del límite", el alcance honesto es de 10 a 12 semanas. Decirlo de antemano no es un problema. Descubrirlo en la semana 5, sí.

## Los primeros 14 días del proyecto de 6 semanas

Irónicamente, los 14 días que la implementación express entrega como producto completo son los 14 días de diagnóstico y mapeo de un proyecto de 6 semanas. Son la base — no el resultado.

**Semanas 1–2 — Diagnóstico y mapeo.** Levantar el proceso comercial, mapear etapas, inventariar datos a migrar, definir campos obligatorios, validar la integración de correo. Este trabajo es invisible para quien lo mira desde afuera. Son conversaciones, talleres y documentos de proceso. Nada aparece todavía en la pantalla de Salesforce — pero es lo que decide si el proyecto avanza con salud o se convierte en retrabajo a los 60 días.

**Semanas 3–4 — Configuración en sandbox.** Todo lo mapeado en la fase 1 va a la org de prueba. El usuario clave prueba con datos reales. Ajustes basados en feedback de quien va a usar el sistema, no de quien firmó el contrato. Esa distinción importa.

**Semanas 5–6 — Go-live faseado y adopción.** Go-live con un grupo piloto, entrenamiento enfocado en adopción (no en tutorial), seguimiento de uso. El gerente empieza a usar el reporte de Salesforce en las reuniones semanales. Los vendedores comienzan a ver que registrar en el sistema ahorra tiempo en lugar de sumarlo.

[Los antipatrones que hunden los proyectos de Sales Cloud](/blog/es/sales-cloud-cinco-antipadroes.html) aparecen exactamente cuando esta estructura se comprime por una promesa de 14 días — campos sin dueño acumulándose, automatización sin pruebas en producción, adopción tratada como entrenamiento del último día.

## Seis semanas como base, no como techo

La pregunta correcta antes de contratar no es "¿cuál es el plazo mínimo posible?". Es "¿cuál es el plazo mínimo para un MVP que durará 12 meses sin necesitar ser rehecho?".

Seis semanas lo logran — si el alcance es honesto desde el inicio. La empresa que entra al proyecto con expectativas calibradas, un proceso mapeado antes de comenzar y un gerente comprometido con la adopción saldrá con una org funcionando y una base para crecer. La que entra esperando 14 días porque la propuesta prometió 14 días saldrá con una org configurada que necesitará ser reimplementada.

La diferencia no está en Salesforce. Está en lo que cabe en un proyecto — y en la disposición de decirlo antes de firmar.
