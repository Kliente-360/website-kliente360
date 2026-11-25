---
title: "Salesforce CPQ en fin de venta: migrar a Revenue Cloud ahora o esperar"
slug: "migrar-salesforce-cpq-revenue-cloud"
pillar: "sf"
date: "2026-11-25"
readMinutes: 7
excerpt: "Salesforce CPQ ya no vende licencias nuevas, pero no tiene fecha de fin. Cuándo conviene migrar a Revenue Cloud y cuándo esperar es lo correcto."
tldr: "El fin de venta de Salesforce CPQ significa que el producto no recibe licencias ni funcionalidades nuevas, pero sigue con soporte y renovable, sin fecha de fin de vida anunciada. Migrar a Revenue Cloud (antes Revenue Cloud Advanced) no es cambiar de herramienta: es rediseñar catálogo, precios y contratos, porque los objetos, reglas de precio y scripts de CPQ no tienen equivalente directo. Conviene migrar ahora a quien está cambiando su modelo de ingresos o carga un CPQ muy personalizado; quien tiene un modelo estable puede esperar, siempre que use el tiempo para limpiar el catálogo."
keywords: ["migrar Salesforce CPQ", "Salesforce CPQ fin de venta", "Revenue Cloud Advanced", "migración de CPQ a Revenue Cloud", "Salesforce Revenue Cloud"]
---

**Migrar de Salesforce CPQ a Revenue Cloud** se volvió tema obligatorio en toda conversación de renovación desde que Salesforce puso CPQ en fin de venta, en marzo de 2025. La empresa que cotiza desde el CRM escucha la misma pregunta del ejecutivo de cuentas y del partner: ¿cuándo van a migrar? La respuesta honesta, para buena parte de esas empresas, es "ahora no". Para otra parte, es "ya van tarde". Lo que separa a unas de otras no es la antigüedad de la implementación, es el modelo de ingresos.

El punto de partida tiene que ser preciso, porque el mercado está lleno de versiones alarmistas. Según la [página oficial de Salesforce sobre el tema, actualizada en julio de 2026](https://www.salesforce.com/sales/cpq/end-of-life/), CPQ está en **fin de venta, no en fin de vida**. El cliente actual sigue usándolo, compra usuarios adicionales, renueva contrato y recibe soporte y correcciones críticas. Lo que terminó fue la licencia para clientes nuevos y la funcionalidad nueva. No hay fecha de apagado anunciada ni migración forzada.

## Qué cambia de verdad el fin de venta en Salesforce CPQ

El fin de venta es un reloj sin esfera. Nada se rompe mañana, pero la plataforma dejó de avanzar en el punto donde está CPQ. Toda la innovación en precios, cotización, pedidos y facturación pasó a Revenue Cloud y Revenue Cloud Billing. CPQ entró en fase de mantenimiento.

En la práctica, esto tiene tres consecuencias que aparecen antes de cualquier fecha oficial:

- **Lo que el negocio pida de nuevo, CPQ no lo va a recibir.** Precio por consumo, modelos híbridos, venta por partners y por e-commerce, integración nativa con agentes. Todo eso Salesforce lo construye en Revenue Cloud.
- **La personalización se vuelve la única forma de evolucionar.** Sin funcionalidad nueva, cada pedido del área comercial se convierte en regla de precio, script de cálculo (el famoso QCP, en JavaScript) o campo personalizado. La deuda crece justo donde la migración va a doler después.
- **El mercado de profesionales se achica despacio.** Quien empieza su carrera estudia Revenue Cloud. El especialista en CPQ es más escaso y más caro cada año.

Las fechas de fin de vida que circulan, como "2029 o 2030", son estimaciones de consultoras y proveedores de herramientas, no anuncios de Salesforce. Conviene tratarlas como hipótesis de planificación, nunca como plazo.

> El fin de venta no es un plazo para migrar. Es un aviso de que cada personalización nueva en CPQ encarece la salida.

## Por qué migrar no es cambiar de herramienta

El error más caro en esta decisión es imaginar la migración como una actualización de versión. CPQ es un **paquete gestionado** instalado sobre la plataforma, con objetos propios y lógica de cotización atada a la interfaz. Revenue Cloud es nativo del core de Salesforce, API primero y con el modelo de datos estándar. La propia comparación publicada por Salesforce muestra el tamaño de la distancia:

1. **Catálogo.** CPQ trabaja con bundles y opciones por SKU. Revenue Cloud trabaja con un catálogo basado en atributos. Un catálogo de 3.000 SKUs que en realidad son 40 productos con variaciones no se traslada: hay que remodelarlo.
2. **Precios.** Las reglas de precio y los scripts personalizados de CPQ dan paso a procedimientos de precio declarativos. La lógica de negocio hay que reescribirla, no copiarla.
3. **Configurador.** Las reglas de producto pasan a ser un modelo de restricciones.
4. **Suscripciones.** En CPQ, enmiendas y renovaciones parten del contrato. En Revenue Cloud, parten del activo. Eso afecta cómo se migra la base instalada y cómo finanzas ve el ingreso recurrente.

Salesforce es explícita: los objetos, campos personalizados, reglas de precio y scripts específicos de CPQ **no se mapean directamente** a Revenue Cloud. Los objetos estándar migran con facilidad; el resto exige una migración estructurada. Salesforce estima entre 3 y 6 meses para una migración típica, del discovery al go-live, y más para implementaciones complejas. Según nuestra experiencia con orgs medianas, lo que hace estallar ese plazo casi siempre es el catálogo, no la tecnología.

Además está el ruido del nombre. El producto ya se llamó Revenue Lifecycle Management, Revenue Cloud Advanced, Agentforce Revenue Management y, en las páginas más recientes de Salesforce, volvió a aparecer como Revenue Cloud. En el [post sobre el cambio de Sales Cloud a Agentforce Sales](/blog/es/sales-cloud-vira-agentforce-sales.html) registramos la fase "Agentforce". Es el mismo producto en todas las etapas; lo que importa es el alcance contratado, no la etiqueta.

## Cuándo conviene migrar ahora y cuándo esperar es lo correcto

La decisión se simplifica cuando sale del terreno de la tecnología y entra en el de los ingresos. En nuestra lectura, cuatro señales indican que esperar cuesta más que migrar:

1. **El modelo de ingresos está cambiando.** Llegada del cobro por consumo, planes híbridos, venta por canal de partners o autoservicio. CPQ cubre mal el consumo y fue diseñado para venta directa; cada adaptación se vuelve código que no va a migrar.
2. **CPQ ya es más script que configuración.** Si el QCP tiene miles de líneas y solo una persona lo entiende, la migración es también la oportunidad de sacar la regla de negocio de la cabeza de alguien. Es el mismo patrón de la [deuda técnica por automatización superpuesta en Salesforce](/blog/es/divida-tecnica-salesforce-automacao.html): capas que ya nadie sabe explicar.
3. **Hay un rediseño comercial en marcha.** Catálogo nuevo, nueva política de descuentos, nueva línea de producto. Hacerlo en CPQ y luego otra vez en Revenue Cloud es pagar dos veces.
4. **La facturación es el cuello de botella.** Si la posventa depende de planillas entre CPQ y el ERP, la dupla Revenue Cloud y Revenue Cloud Billing ataca la causa, no el síntoma.

Lo contrario también vale. Esperar es legítimo cuando el modelo comercial es estable, CPQ tiene poca personalización, la cotización funciona y hay prioridades mayores en la fila, como la calidad de datos o el propio despliegue de agentes. En ese caso, CPQ sigue con soporte y la migración puede planificarse para una ventana de renovación futura.

Lo que no es legítimo es esperar sin hacer nada. Quien posterga la migración debería usar el tiempo para congelar personalizaciones nuevas en CPQ y limpiar el catálogo.

> El catálogo limpio es el único trabajo de CPQ que sobrevive intacto a la migración a Revenue Cloud.

## Seis pasos para preparar la migración sin detener la cotización

Sea ahora o en dos años, la secuencia que recomendamos es la misma:

1. **Inventaría la lógica, no solo los objetos.** Lista reglas de precio, reglas de producto, scripts de cálculo, flujos e integraciones que tocan la cotización. Para cada ítem, anota la regla de negocio que implementa, en lenguaje simple, sin jerga.
2. **Racionaliza el catálogo antes que nada.** Agrupa SKUs en productos con atributos, retira lo que no se vende hace 12 meses y define un dueño para cada familia. Es el paso que más reduce el plazo y el que más depende del área comercial, no de TI.
3. **Elige el enfoque según lo que va a cambiar el negocio.** Salesforce describe cuatro: traslado con rediseño mínimo (*lift and shift*), transformación selectiva, racionalización completa, o empezar con Revenue Cloud en una unidad o línea de producto nueva. Trasladar un catálogo desordenado solo cambia el desorden de lugar.
4. **Prefiere el puente al big bang.** CPQ y Revenue Cloud pueden convivir en la misma org con las licencias correctas. El negocio nuevo entra en Revenue Cloud; los contratos existentes siguen en CPQ hasta la renovación. Reduce el riesgo de detener la cotización.
5. **Migra contratos y activos al final.** Producto y precio deben estar configurados antes de cualquier dato transaccional. Invertir ese orden es la forma más común de retrabajo. Atención especial a la integración con el ERP, donde el problema suele ser el contrato de datos, no la arquitectura.
6. **Lleva la decisión a la mesa de renovación.** La migración es un argumento comercial. Créditos de implementación, períodos de licencias en paralelo y congelamiento de precios son negociables, y Gartner orientó a los compradores, en una nota de septiembre de 2026, a esperar aumentos de 12% o más en las renovaciones de Salesforce. Negociar sin plan de migración es renunciar al principal argumento.

Vale recordar lo que el [post sobre CPQ en SaaS B2B](/blog/es/cpq-saas-b2b.html) ya defendía: el valor de una herramienta de cotización está en la propuesta que el cliente entiende y firma, no en el PDF que genera el vendedor. Esa vara no cambia con la plataforma.

## La migración es un rediseño de ingresos, no de sistema

Salesforce informa que cerca del 15% de los clientes de Revenue Cloud vinieron de CPQ. Es decir, la gran mayoría de la base CPQ todavía no se movió, y no hay urgencia técnica impuesta. La urgencia, cuando existe, viene del negocio: un modelo de ingresos que CPQ ya no acompaña.

Quien trate la migración como proyecto de TI va a trasladar reglas viejas a una plataforma nueva y descubrir, seis meses después, que nada mejoró. Quien la trate como revisión de catálogo, precios y contratos sale con una operación comercial más simple, y Revenue Cloud se vuelve consecuencia, no objetivo.

## Preguntas que siempre vuelven

Las dudas que más aparecen cuando la renovación de Salesforce pone el tema CPQ sobre la mesa.

## ¿Salesforce CPQ va a dejar de funcionar?

No hay fecha para eso. Salesforce CPQ está en fin de venta desde marzo de 2025: no vende licencias a clientes nuevos y no recibe funcionalidades nuevas, pero los clientes actuales siguen usándolo, comprando usuarios, renovando y recibiendo soporte y correcciones críticas. Las fechas de fin de vida que circulan en el mercado son estimaciones de terceros, no anuncios de Salesforce.

## ¿Cuánto tiempo lleva migrar de Salesforce CPQ a Revenue Cloud?

Salesforce estima entre 3 y 6 meses para una migración típica, del discovery al go-live, con plazos mayores para implementaciones complejas. En la práctica, el factor que más pesa es el estado del catálogo de productos y la cantidad de reglas de precio y scripts personalizados, porque esos elementos no se mapean directamente y hay que rediseñarlos.

## ¿Se pueden usar Salesforce CPQ y Revenue Cloud en la misma org?

Sí. Salesforce permite la convivencia de los paquetes de CPQ y Billing con Revenue Cloud en la misma org, siempre que las licencias y funcionalidades necesarias estén habilitadas. Eso hace posible el enfoque de puente, en el que el negocio nuevo entra en Revenue Cloud y los contratos existentes siguen en CPQ hasta la renovación.
