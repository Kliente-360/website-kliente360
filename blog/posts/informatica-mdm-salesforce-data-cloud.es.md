---
title: "MDM en Salesforce: qué cambia la compra de Informatica en Data Cloud"
slug: "informatica-mdm-salesforce-data-cloud"
pillar: "sf"
date: "2026-10-27"
readMinutes: 7
excerpt: "Salesforce compró Informatica y trajo el MDM a la plataforma. Cómo se diferencia del Data Cloud en identidad y cuándo compensa tener un golden record."
tldr: "MDM (Master Data Management) es la práctica de mantener un registro maestro, el golden record, de cada cliente, producto o proveedor, con dueño y regla de supervivencia definidos. Salesforce completó la compra de Informatica el 18 de noviembre de 2025 y declaró que integrará el MDM de la empresa en un pipeline único con Data Cloud (hoy Data 360). Esto no reemplaza la resolución de identidad de Data Cloud: esta unifica perfiles para activación, mientras que el MDM decide qué valor es el correcto y quién responde por él. Quien ya tiene Data Cloud debe decidir primero si tiene un problema de dato maestro y solo después comprar la herramienta."
keywords: ["MDM Salesforce", "Informatica Salesforce", "golden record", "resolución de identidad Data Cloud", "Data 360", "master data management"]
---

**E**l MDM en Salesforce dejó de ser un tema de arquitectura de datos y pasó a la agenda del comité. El 18 de noviembre de 2025, Salesforce [completó la adquisición de Informatica](https://investor.salesforce.com/news/news-details/2025/Salesforce-Completes-Acquisition-of-Informatica/) y dijo que catálogo, integración, calidad, gobernanza, metadatos y master data management pasan a formar parte de la plataforma, con la promesa de un pipeline único con MDM sobre Data Cloud, que la empresa ahora llama Data 360.

Quien opera Data Cloud escuchó la pregunta de siempre: "¿esto resuelve el desorden de clientes duplicados?". La respuesta honesta es que resuelve una parte, y que la otra es una decisión de organización que ninguna licencia toma por usted.

## MDM y resolución de identidad no son lo mismo

Los dos términos aparecen juntos en el material de ventas, y la confusión sale cara. La diferencia cabe en dos definiciones:

**La resolución de identidad** (lo que hace Data Cloud) reúne registros que parecen ser de la misma persona en un perfil unificado, usando reglas de correspondencia. El objetivo es activar: segmentar, personalizar, dar contexto a un agente. Los registros de origen siguen existiendo, y el perfil unificado es una vista construida encima de ellos.

**El MDM** (lo que hace Informatica) decide cuál es el valor correcto de cada atributo y lo graba en un registro maestro, el golden record. Define reglas de supervivencia (si el ERP dice una dirección y el CRM otra, cuál vale), asigna un responsable y devuelve el dato corregido a los sistemas de origen.

> La resolución de identidad responde "¿quién es este cliente?". El MDM responde "¿qué versión de este dato es la oficial y quién responde por ella?".

La distinción importa porque Data Cloud puede unificar dos registros y aun así exponer dos identificadores fiscales distintos para la misma cuenta, sin decir cuál es el correcto. Para una campaña, eso es tolerable. Para facturación, crédito o un agente que responde a un cliente, no lo es. Ya discutimos la [diferencia entre Customer 360 y CDP](/blog/es/customer-360-vs-cdp.html); el MDM es la tercera capa de esa conversación, y la que más depende de las personas.

## Qué cambia la compra en la práctica

Lo confirmado es la dirección: Salesforce dice que integrará rápidamente la pila de Informatica, incluyendo integración, calidad, gobernanza y metadatos unificados. La propia Informatica citaba más de 5.000 clientes en casi 100 países antes de la compra, lo que indica una base grande de empresas que ya usan el producto fuera del ecosistema Salesforce.

Lo que aún no está confirmado, y conviene tratar con cautela: plazos de integración, el modelo de licenciamiento del MDM dentro de Data 360 y qué pasa con los contratos vigentes de quienes usan Informatica con otros CRM. Toda propuesta que prometa fecha y precio cerrados para esa integración está vendiendo roadmap. En nuestra lectura, el efecto de corto plazo es más comercial que tecnológico: el MDM entra en la conversación de renovación y pricing, el mismo terreno que ya pesa en [cómo se cobra Data Cloud hoy](/blog/es/data-cloud-pricing-creditos-2026.html).

Esto refuerza una tesis que sostenemos desde que [Data Cloud se volvió el nervio central de Salesforce](/blog/es/data-cloud-nervo-central.html): la plataforma camina hacia ser el lugar donde el dato del cliente se gobierna, no solo se activa. Para los agentes, esa es la capa que decide si la respuesta es confiable.

## Cuándo compensa el golden record

El MDM es un programa, no una herramienta. En los proyectos que acompañamos, el costo dominante no es la licencia, es definir reglas y dueños. Cinco señales indican que el problema ya es de dato maestro y no de configuración:

1. **El mismo cliente tiene registros divergentes en tres o más sistemas** (CRM, ERP, facturación) y el área comercial discute en cada reunión cuál vale.
2. **Hay más de una fuente "oficial" para un campo crítico**, como razón social, identificador fiscal, límite de crédito o jerarquía de cuentas.
3. **Un agente o automatización actúa sobre el dato**, y el error de registro ahora se convierte en una acción equivocada, no solo en un informe torcido.
4. **La fusión de cuentas es manual y recurrente**, y consume horas fijas del equipo de operaciones cada mes.
5. **Existe una obligación regulatoria sobre el dato**, como el consentimiento y el derecho de eliminación de la LGPD brasileña, que exige saber dónde aparece cada titular.

Si ninguna señal aplica, el dolor probablemente es de [dato limpio que nunca será perfecto](/blog/es/dado-limpo-e-um-mito.html), y un conjunto de reglas de deduplicación bien hecho lo resuelve por una fracción del costo. Si aplican dos o más, el MDM tiende a pagar la cuenta. Este corte es una estimación nuestra a partir de los proyectos que vimos, no un benchmark de mercado.

## Cómo decidir sin comprar primero la herramienta

El orden importa más que el producto. La secuencia que recomendamos:

1. **Liste los cinco atributos que no pueden estar mal.** Normalmente son identificador fiscal, razón social, dirección de facturación, jerarquía de cuentas y estado del cliente.
2. **Nombre un dueño por atributo.** Sin una persona responsable, la regla de supervivencia se vuelve una disputa en cada caso.
3. **Defina la regla de supervivencia en una frase por atributo.** Si no cabe en una frase, el dato aún no está listo para automatizar.
4. **Mida la duplicidad actual.** El porcentaje de cuentas duplicadas y el tiempo gastado en fusiones manuales dan el caso de negocio.
5. **Solo entonces elija la capa.** Reglas en Data Cloud, MDM dedicado o ambos, según la medición.

## Qué hacer mientras madura la integración

No hay motivo para pausar un proyecto de Data Cloud esperando al MDM. El costo de esperar es mayor que el de diseñar la frontera desde ya: separar, en el diseño, lo que es perfil para activación y lo que es dato maestro con dueño. Quien lo hace ahora migra al MDM integrado, si decide adoptarlo, sin rehacer el modelo.

También conviene revisar la premisa de que Informatica resuelve la [integración de Salesforce con el ERP](/blog/es/integracao-salesforce-erp.html). Ayuda a mover y calificar el dato, pero el contrato entre los sistemas sigue siendo el cuello de botella, y ninguna plataforma lo escribe por usted.

## Preguntas que siempre vuelven

Las dudas que más aparecen cuando MDM, Informatica y Data Cloud caen en la misma frase.

## ¿Data Cloud ya hace MDM?

No. Data Cloud hace resolución de identidad: unifica registros en un perfil para activación y contexto. No define un valor oficial por atributo ni devuelve el dato corregido a los sistemas de origen. La integración anunciada con Informatica es justamente el intento de Salesforce de cubrir esa brecha dentro de la plataforma.

## ¿Qué pasa con quienes ya usan Informatica después de la compra?

Salesforce completó la adquisición el 18 de noviembre de 2025 y declaró que integrará la tecnología de Informatica a la plataforma. Sobre los contratos vigentes, la comunicación pública no detalla cambios. El paso práctico es revisar renovaciones y dependencias antes de firmar plazos largos, ya que precio y empaquetado tienden a cambiar.

## ¿Toda empresa con Salesforce necesita MDM?

No. Las empresas con pocas fuentes de dato de cliente y reglas de deduplicación bien mantenidas suelen pasar sin MDM dedicado. Compensa cuando varias fuentes oficiales entran en conflicto, hay agentes actuando sobre el dato u obligación regulatoria de rastrear a cada titular. Antes de comprar, conviene medir la duplicidad actual y el costo de la fusión manual.
