---
title: "Deuda técnica en Salesforce: la automatización superpuesta es la factura"
slug: "divida-tecnica-salesforce-automacao"
pillar: "sf"
date: "2026-10-14"
readMinutes: 7
excerpt: "La deuda técnica en Salesforce vive menos en Apex y más en automatización superpuesta. Cómo encontrarla, priorizarla y pagarla sin frenar la operación."
tldr: "La deuda técnica en Salesforce es la acumulación de configuración, automatización y código que funciona hoy pero encarece cada cambio de mañana. En la práctica se concentra en automatización superpuesta — Workflow Rules, Process Builder, Flows y Apex disparando sobre el mismo objeto sin orden definido — y no en código mal escrito. La encuesta 2026 de Salesforce Ben señala la deuda técnica como la tarea más difícil para el 56,3% de los admins, y el fin del soporte de Workflow Rules y Process Builder el 31/12/2025 quitó el plazo y dejó solo el riesgo. Pagarla es inventario, priorización por riesgo y migración por olas, no un proyecto de reescritura."
keywords: ["deuda técnica Salesforce", "fin de soporte Workflow Rules Process Builder", "migrar a Flow", "limpieza de org Salesforce", "automatización Salesforce", "Salesforce Flow"]
---

**La deuda técnica en Salesforce** casi nunca aparece como un problema de código. Aparece como una frase repetida en el comité: "tocar eso es arriesgado". Un campo obligatorio nuevo rompe una integración que nadie recordaba. Un cambio de etapa de la oportunidad dispara tres automatizaciones, dos de ellas de 2019. El admin que sabía cómo funcionaba todo se fue, y la org pasó a administrarse por prueba y error.

La [encuesta 2026 de Salesforce Ben con más de 1.100 admins](https://www.salesforceben.com/top-10-insights-from-sf-bens-mega-2026-salesforce-admin-survey/) muestra que no es una excepción: el 56,3% señala la deuda técnica como la responsabilidad más difícil del cargo, cerca del 31% clasifica su propia deuda como alta o muy alta, y solo el 2% describe su org como limpia y bien mantenida. Lo que la encuesta no dice, y nuestra experiencia en proyectos sí, es dónde suele estar esa deuda.

## Dónde se acumula la deuda de verdad

La imagen popular de la deuda técnica es un Apex mal escrito. Existe, pero es la parte menor. En las orgs que revisamos, la mayor parte del costo viene de la **automatización superpuesta**: varias capas de lógica reaccionando al mismo evento en el mismo objeto, sin nadie responsable del orden en que corren.

La anatomía es conocida. Una Workflow Rule creada en 2016 actualiza un campo. Un Process Builder de 2019 lee ese campo y crea una tarea. Un Flow de 2023 hace una verificación parecida porque quien lo construyó no conocía el proceso. Un trigger de Apex, de un partner anterior, recalcula el campo después de todo. Cada pieza tiene sentido aislada. Juntas producen un comportamiento que solo se prevé ejecutándolo, y cada cambio se vuelve una apuesta.

Tres señales de que tu org ya está en ese punto:

1. **Nadie sabe decir qué ocurre al guardar una oportunidad.** Si la respuesta exige abrir cinco pantallas de Setup, el orden de ejecución es conocimiento tribal.
2. **Errores intermitentes de límite** (CPU, demasiadas consultas, actualización en bucle) que desaparecen cuando intentas reproducirlos. Son el efecto de varias automatizaciones sumando costo en la misma transacción.
3. **Los cambios pequeños tardan semanas.** El gasto está en la prueba de regresión manual, porque nadie confía en prever el impacto.

> Deuda técnica es el costo de cada cambio futuro. El código feo que nadie toca no cuesta nada; la automatización superpuesta en un objeto central cuesta cada semana.

## Qué cambió: el plazo se volvió riesgo

Salesforce anunció el fin del soporte de **Workflow Rules y Process Builder el 31 de diciembre de 2025**. No se apagó nada: las automatizaciones existentes siguen corriendo. Lo que terminó fue la corrección de bugs y la atención de casos de soporte sobre esas herramientas. El desarrollo de automatización declarativa de la plataforma está concentrado en Flow.

Para quien posponía la migración esperando el plazo, el efecto práctico es incómodo: el plazo pasó, nada se rompió, y la deuda sigue ahí, ahora sin red de seguridad. Es el tipo de riesgo que no dispara alarma. Aparece el día en que un comportamiento inesperado cae en una herramienta sin soporte, justo en un objeto crítico.

Winter '27 también tocó el mismo terreno. Según la cobertura de la comunidad, el release trae mejoras de gestión de Flows, como un filtro de recursos no usados en Flow Manager, y llega con [Agentforce activado por defecto](/blog/es/agentforce-ligado-por-padrao-winter-27.html). Ese segundo punto importa para la deuda: un agente que lee y actúa sobre una org con automatización superpuesta hereda toda su imprevisibilidad. Limpiar antes es más barato que depurar después.

## Cómo pagarla sin frenar la operación

Los proyectos de reescritura total suelen fracasar: demoran, congelan el roadmap y entregan una org nueva con los mismos vicios en dos años. Lo que funciona es trabajar en olas cortas, con criterio de riesgo. La secuencia que usamos cabe en seis pasos:

1. **Inventaría todo lo que se dispara por objeto.** Para cada objeto central (Lead, Cuenta, Oportunidad, Caso), lista Workflow Rules, Process Builders, Flows, triggers y validaciones activos. En Setup, ordenar la lista de Workflow Rules y Process Builder por la columna de activos ya muestra el tamaño del problema.
2. **Marca lo que está activo pero muerto.** Automatizaciones que no se ejecutan hace meses, Flows inactivos y versiones antiguas acumuladas. Desactivar es reversible; borrar viene después de un período de observación.
3. **Prioriza por riesgo, no por antigüedad.** El criterio es cuánto cuesta equivocarse en este objeto y cuántas capas se superponen en él. Oportunidad con cuatro capas va antes que un objeto de poco uso con una regla vieja.
4. **Migra por objeto, consolidando.** El objetivo no es traducir regla por regla, sino llegar a un flujo claro por objeto y por momento (antes de guardar, después de guardar). La herramienta Migrate to Flow ayuda en los casos simples, pero en automatizaciones complejas tiende a generar flujos parciales que exigen ajuste manual y pruebas cuidadosas.
5. **Prueba en sandbox con datos parecidos a producción.** Aquí la disciplina de una [estrategia de sandbox](/blog/es/sandbox-strategy.html) decide si la migración es segura o una apuesta con fecha marcada.
6. **Documenta el orden de ejecución y nombra un responsable.** Sin el último paso, la deuda vuelve a crecer en 12 a 18 meses, y ese plazo es una estimación nuestra a partir de los proyectos que acompañamos.

## Flow o Apex: la elección que evita la próxima deuda

Migrar a Flow no resuelve la deuda si el Flow se construye como las herramientas antiguas: uno por requisito, sin responsable, sin convención. Las orgs con cientos de Flows inactivos y nombres como "Prueba_2" son la misma deuda en formato nuevo. La regla de [cuándo el código vale más que el clic](/blog/es/flow-vs-apex.html) sigue vigente: la lógica con muchas ramificaciones, alto volumen o necesidad de pruebas automatizadas pertenece a Apex, y lo que es simple y visible para el negocio pertenece a Flow.

Antes de decidir la herramienta, conviene volver al origen del problema. Mucha automatización superpuesta nace de un proceso mal definido, y [mapear el proceso antes de configurar](/blog/es/mapear-processos-antes-do-salesforce.html) evita construir tres soluciones a la misma pregunta. Dos convenciones baratas ya reducen buena parte de la deuda futura: nombrar los Flows por objeto, momento y propósito, y exigir una descripción completa antes de activar.

## Cuánto cuesta y cuándo vale

La pregunta de la dirección siempre es cuánto cuesta. No existe un número universal, pero el razonamiento es simple: la deuda se paga en horas de cambio. Si un cambio rutinario en Oportunidad lleva dos semanas por la regresión manual y debería llevar tres días, esa diferencia multiplicada por el número de cambios del año es el costo de la deuda, y ese es el número que se compara con el costo de la limpieza. En proyectos medianos, una limpieza concentrada en dos o tres objetos críticos suele caber en algunas semanas, una estimación nuestra, y no en meses.

Vale la pena pagarla antes de cualquier iniciativa grande sobre la org: un nuevo módulo, una integración con el ERP, un agente de IA. Construir sobre deuda es el camino más caro de todos.

## Preguntas que siempre vuelven

Las dudas más frecuentes de quien decide qué hacer con Workflow Rules, Process Builder y la automatización acumulada de la org.

## ¿Workflow Rules y Process Builder dejaron de funcionar?

No. Según lo que comunicó Salesforce, las automatizaciones existentes siguen ejecutándose después del 31 de diciembre de 2025. Lo que terminó fue el soporte: los bugs no se corrigen y los casos de soporte sobre esas herramientas no se atienden. El riesgo es operar una automatización crítica sin respaldo del proveedor, no una interrupción inmediata.

## ¿Vale la pena migrar todo a Flow de una vez?

Rara vez. Migrar todo de una vez congela el roadmap y concentra el riesgo en un único corte. El camino más seguro es priorizar por objeto y por riesgo, consolidar la lógica en vez de traducirla regla por regla y migrar en olas, probando cada una en sandbox. La automatización de poco uso y sin superposición puede esperar sin perjuicio.

## ¿Cómo medir si la deuda técnica disminuyó?

Mide el costo de cambio, no el conteo de componentes. Bastan tres indicadores: tiempo promedio entre pedir y publicar un cambio rutinario, número de errores de límite por mes en objetos críticos y porcentaje de automatizaciones con responsable y descripción. Si los dos primeros bajan y el tercero sube, la deuda está disminuyendo, aunque el total de Flows no cambie.
