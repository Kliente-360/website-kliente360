---
title: "Data Catalog que nadie usa: síntoma del problema real (no es la herramienta)"
slug: "data-catalog-ninguem-usa"
pillar: "data"
date: "2026-03-31"
readMinutes: 6
excerpt: "La empresa compra Alation/Collibra, paga consultora, pobla con 800 tablas. En 6 meses, el analista vuelve a preguntar por Slack. El problema no es la herramienta — es lo que se le pidió."
tldr: "El Data Catalog se vuelve ornamento en la mayoría de las empresas que lo adoptan porque la herramienta intenta resolver un problema que no es suyo: cultura de documentación. Sin cultura, cualquier catalog se vuelve lista de tablas vacías. Cinco condiciones que separan catalog útil de decorativo — y por qué dbt resuelve el 80% sin el nombre lindo."
keywords: ["Data Catalog", "Alation", "Collibra", "gobernanza de datos", "documentación de datos"]
---

La pregunta de cualquier reunión de evaluación de Data Catalog en 2026: *¿cuántas veces alguien consultó el catalog en la última semana?* Respuesta honesta en la mayoría de las empresas: "unos 12 accesos, pero la mayoría fue del equipo de gobernanza verificando si está actualizado". Traducción práctica: la empresa pagó Alation o Collibra o similar (USD 200k+/año), pasó 6 meses poblando, y nadie lo usa. El analista que necesita entender una tabla sigue preguntando por Slack.

La culpa no es de la herramienta. El catalog es categoría madura, con productos competentes. La culpa es del diagnóstico equivocado: la empresa creyó que comprar catalog iba a resolver problema de cultura. No lo resuelve. Este texto va sobre el problema real, y por qué dbt solo resuelve el 80% del caso sin el nombre lindo.

## Por qué el catalog fracasa en producir uso real

El modelo mental que vende catalog es: "si tenemos un lugar único con toda la documentación, todos van a consultar". Lógica de estantería de biblioteca. Falla porque tres cosas tienen que ser verdad para funcionar — y rara vez lo son.

**La documentación tiene que existir.** Catalog vacío es solo interfaz linda. Poblar el catalog exige que alguien escriba la descripción de cada tabla, cada columna, cada métrica. El catalog no escribe por vos.

**La documentación tiene que estar actualizada.** Documentación que envejece es peor que ausente — el usuario consulta, actúa, descubre que estaba mal, pierde confianza. Mantener requiere disciplina continua, generalmente subestimada.

**La documentación tiene que ser mejor que preguntar por Slack.** El costo de consultar el catalog (abrir herramienta, navegar, leer) tiene que ser menor que el costo de preguntar por Slack. En catalog desorganizado o desactualizado, el Slack gana siempre.

Cuando los tres fallan simultáneamente — que es el caso del 80% de las implementaciones que veo — el catalog se vuelve lista de tablas vacías con nombre corporativo.

## El problema que el catalog *parece* resolver, pero no resuelve

La frustración organizacional que motiva la compra del catalog tiene nombre: *nadie sabe qué significa cada tabla*. La intuición es que tener un lugar para documentar lo resuelve. No lo resuelve. El problema raíz es cultural, no infraestructural.

Empresa sin cultura de documentación va a poblar el catalog con descripciones genéricas ("tabla de clientes"), abandonar mantenimiento en 3 meses, y culpar a la herramienta en 6. Empresa con cultura de documentación la tiene en Git, en dbt, en la wiki — el catalog es solo visualización, no sustituto.

> Data Catalog no crea cultura de documentación. Solo amplifica la que ya existe. Empresa sin cultura previa compra catalog y amplifica cero.

## Lo que el catalog hace bien (cuando lo hace)

No confundir el argumento. Hay contextos donde el catalog premium tiene valor real:

**Empresa grande con 5+ equipos de datos independientes.** Cuando el catálogo necesita atravesar fronteras organizacionales (varias áreas de negocio, varias subsidiarias, varias plataformas), el catalog enterprise ofrece gobernanza cruzada que una herramienta única no da.

**Necesidad regulatoria explícita.** Empresa en sector regulado (financiero, salud) donde el auditor exige documentación centralizada con trazabilidad de aprobación. Acá el catalog es compliance, no productividad.

**Lineage cross-stack.** Cuando el dato fluye entre 5+ sistemas distintos (Salesforce, ERP, warehouse, ML platform, BI), el catalog enterprise rastrea lineage de forma que dbt solo no rastrea.

Fuera de esos tres contextos, el catalog premium tiende a ser overshoot — y el uso real cae conforme el entusiasmo inicial pasa.

## Por qué dbt resuelve el 80% del caso

Para la mayoría de las empresas de tamaño medio, [dbt con disciplina de documentación](/blog/es/dbt-na-pratica.html) resuelve el caso de uso que el catalog intentaría. Cinco motivos:

- **La documentación vive al lado del código.** Description de cada modelo, cada columna, en el .yml versionado en Git. Quien cambia el modelo actualiza la doc en el mismo PR.
- **`dbt docs` genera sitio navegable.** Lineage visual, descripciones, tests, fuente. Lo que el catalog promete entregar, dbt lo entrega — para modelos que están en el warehouse.
- **Owner explícito en el `.yml`.** Quién es dueño de cada modelo. Cuando algo cambia o se rompe, hay nombre.
- **Source freshness embebido.** El catalog muestra "última actualización"; dbt monitorea activamente y alerta.
- **Costo: cero.** dbt es open source. La documentación es trabajo de equipo, pero la infra es gratuita.

La limitación honesta: dbt cubre lo que está en el warehouse. Para fuentes externas (Salesforce, Mixpanel, planillas), el catalog cubre algo que dbt solo no cubre. Pero si el 80% de las tablas usadas están en el warehouse, dbt resuelve el 80% del problema.

## La regla antes de comprar catalog

Cinco preguntas para responder antes de firmar contrato anual de USD 200k:

1. **¿La cultura de documentación existe hoy?** Mirada rápida: ¿las 20 tablas más usadas están documentadas? Si no, comprar catalog es amplificar ausencia.
2. **¿Quién va a poblar el catalog inicialmente?** Equipo de datos, bajo qué sponsor, con qué plazo? Sin dueño nominal y plazo, la población nunca termina.
3. **¿Quién va a mantenerlo actualizado?** No "el equipo todo". Nombre, proceso, herramienta. Sin eso, drift de 6 meses garantizado.
4. **¿Cuál es el caso de uso primario?** ¿Analista buscando metadata? ¿Auditor verificando gobernanza? ¿Lineage entre sistemas? Cada caso pide config distinto.
5. **¿dbt resolvería esa necesidad?** Honestamente. Si el 80% de los modelos están en el warehouse y el caso es interno, [dbt + disciplina de description es respuesta más barata](/blog/es/dbt-na-pratica.html). El catalog se vuelve upgrade cuando dbt se agota.

Quien responde las cinco con claridad decide con convicción. Quien responde "depende" en tres o más no tiene caso de uso definido — y cualquier compra se va a volver ornamento.

## La relación con data contracts y dbt

[Data contracts](/blog/es/data-contracts.html) y dbt complementan al catalog — no se sustituyen entre sí. En arquitectura madura:

- **dbt** documenta lo que está en el warehouse, describe modelos, testea.
- **[Data contracts que se volvieron práctica operacional en 2026](/blog/es/tendencias-data-management-2026.html)** versiona acuerdos entre productor y consumidor de dato.
- **Catalog enterprise**, si se justifica, es la capa de gobernanza cruzada que atraviesa todo.

La mayoría de las empresas de tamaño medio no necesita la tercera capa. Necesita las dos primeras hechas bien. Saltearse las dos primeras para ir directo al catalog es construir edificio sin cimientos.

## La decisión para 2026

Si tu empresa está evaluando data catalog premium, tres movimientos honestos antes de la compra:

**Probá dbt con disciplina por 6 meses primero.** Documentación enforced en el CI, owner nominal, source freshness activo. En 6 meses sabés si el problema es falta de cultura o falta de herramienta.

**Si decidís comprar catalog, armá el equipo antes.** No se puede comprar catalog y esperar que "el equipo de datos pueble". Persona nominal, plazo, sponsor con autoridad para cobrar áreas a documentar.

**Reevaluá a los 12 meses por el uso, no por la cobertura.** Catalog con 100% de las tablas y 5 accesos por semana es catalog muerto. Catalog con 60% de las tablas y 500 accesos por semana es catalog vivo. La métrica de éxito es uso, no inventario.

Data Catalog en 2026 es herramienta legítima — pero es último escalón de una escalera de cultura de documentación. Empresa que se saltea escalones paga catalog caro y sigue preguntando por Slack. Empresa que sube por la escalera llega al escalón alto sabiendo si vale o no.

## Preguntas que siempre vuelven

Antes de cerrar, las dudas que más aparecen cuando este tema entra en la mesa.

## ¿Vale la pena comprar un data catalog tipo Alation o Collibra?

Solo en tres contextos: empresa grande con 5+ equipos de datos independientes, exigencia regulatoria de documentación centralizada con trazabilidad de aprobación, o lineage que atraviesa 5+ sistemas distintos. Fuera de eso, el catalog premium tiende a ser overshoot — pagás USD 200k+/año por una herramienta cuyo uso real se desploma cuando el entusiasmo inicial pasa.

El prerequisito que nadie chequea: cultura de documentación. Si tus 20 tablas más usadas no están documentadas hoy, comprar catalog es amplificar ausencia. La herramienta no escribe descripciones por vos y no crea disciplina que no existe.

## ¿dbt sustituye a un data catalog?

Para la mayoría de las empresas de tamaño medio, sí — dbt con disciplina de documentación cubre un 80% de lo que el catalog intentaría resolver. Descriptions versionadas en Git al lado del código, `dbt docs` generando sitio navegable con lineage visual, owner explícito en el `.yml`, source freshness con alerta activa. Y la infra cuesta cero, porque dbt es open source.

La limitación honesta: dbt solo cubre lo que está en el warehouse. Si buena parte de tu dato crítico vive en fuentes externas (Salesforce, Mixpanel, planillas) o el lineage necesita cruzar varios sistemas, ahí el catalog cubre algo que dbt solo no cubre. El catalog es el upgrade cuando dbt se agota — no al revés.

## ¿Cómo saber si la implementación del catalog funcionó?

Por el uso, no por la cobertura — y la reevaluación honesta es a los 12 meses. Catalog con 100% de las tablas documentadas y 5 accesos por semana es catalog muerto; catalog con 60% de las tablas y 500 accesos por semana es catalog vivo. Inventario completo no prueba nada si el analista sigue preguntando por Slack.

El test práctico: ¿cuántas veces alguien consultó el catalog en la última semana, descontando al propio equipo de gobernanza verificando si está actualizado? Si la respuesta incomoda, el problema no se resuelve con más población — se resuelve con dueño nominal, proceso de mantenimiento y un caso de uso primario definido antes de cualquier renovación de contrato.
