---
title: "Salesforce ROI — la matriz que el vendedor de licencia no muestra"
slug: "salesforce-roi-matriz"
pillar: "sf"
date: "2026-06-23"
readMinutes: 7
excerpt: "El ROI de Salesforce tiene tres costos que la propuesta comercial omite. La matriz que separa la inversión que rinde de la que sangra."
tldr: "El ROI real de Salesforce incluye licencia, implementación, operación continua y costo de oportunidad — no solo los dos primeros. Una matriz de cuatro variables (ticket promedio, complejidad del proceso, madurez operacional y horizonte de retorno) decide si la inversión tiene sentido. Sin ella, la comparación siempre favorece a Salesforce — en la presentación del vendedor."
keywords: ["Salesforce", "ROI", "CRM", "costo total de implementación", "Sales Cloud"]
---

ROI es la palabra que abre y cierra toda conversación de Salesforce Enterprise. El deck del vendedor trae los números: productividad del vendedor aumenta 38%, el ciclo promedio se reduce 24%, la retención mejora 27%. Números reales, de investigaciones reales — pero en una base de clientes que ya usan Salesforce, es decir, una base con sesgo de selección significativo.

La pregunta no es si Salesforce entrega ROI. Lo entrega, cuando la decisión es correcta. La pregunta es que el modelo del vendedor calcula ingresos proyectados desde arriba y costo de licencia desde abajo, y lo llama TCO. No es TCO. Es costo de entrada. El costo que determina si la inversión funciona es el que aparece después del go-live.

## Lo que el deck del vendedor no incluye

La propuesta comercial típica de Salesforce lista tres líneas de costo: licencia anual, implementación y capacitación inicial. Rara vez incluyen las tres líneas que determinan si los números cierran en 36 meses.

**Costo de operación continua.** Admin certificado interno o socio de sustentación. En empresas medianas (30–150 licencias), este costo varía entre R$ 8.000 y R$ 25.000 al mes — dependiendo del volumen de releases, integraciones que requieren mantenimiento y Flows que necesitan revisión. Este número no aparece en la propuesta. Aparece en la segunda factura del socio.

**Costo de adaptación organizacional.** Proceso nuevo, cambio de comportamiento y retrabajo de datos heredados. No existe proyecto de Salesforce sin estos tres. El número que vemos en diagnóstico: 1,5x el costo de implementación, diluido en 12–18 meses. Es el costo de hacer que Salesforce diga la verdad — porque en el go-live dice lo que la empresa migró, no lo que la empresa hace de verdad.

**Costo de oportunidad de la alternativa.** Hubspot o Pipedrive, bien configurados, resuelven el 60–80% de las necesidades de una operación mediana por el 15–25% del costo total. Este costo de oportunidad debería aparecer en la comparación. Rara vez aparece. El vendedor tiene interés en no mostrarlo — y el cliente rara vez tiene un benchmark independiente.

> El costo de Salesforce no es el que está en la propuesta. Es el que aparece en la operación dos años después del go-live.

## La matriz de cuatro variables

Existe una forma estructurada de decidir si el ROI cierra — sin depender del modelo del vendedor. Cuatro variables determinan el resultado:

1. **Ticket promedio anual por cliente.** Salesforce empieza a tener sentido financiero cuando el cliente promedio genera R$ 150k+ en ingresos anuales. Por debajo de eso, la proporción entre costo de la plataforma y margen generada rara vez cierra en 36 meses. Las pymes de ticket bajo, como se detalla en el análisis de [cuándo NO usar Salesforce](/blog/es/quando-nao-usar-salesforce.html), se convierten en una ecuación mala por diseño — independientemente de cuántas funciones ofrezca la plataforma.

2. **Complejidad del proceso comercial.** Número de etapas de venta, cantidad de tomadores de decisión en el cliente, ciclo promedio en días, reglas de precios distintas por producto. Salesforce es excelente en alta complejidad — pero lleva costos de operación proporcionales a la complejidad que trajiste. Proceso simple en plataforma compleja genera gastos sin retorno equivalente.

3. **Madurez operacional del equipo.** Admin certificado (o contratableble), proceso de release definido, capacidad de traducir demanda de negocio en requisito de CRM. Sin ese músculo, Salesforce no es una plataforma — es deuda técnica con una interfaz bonita. El costo de operación continua sube cuando el equipo no tiene esta estructura, porque cada personalización nueva genera retrabajo en el siguiente trimestre.

4. **Horizonte de retorno aceptable.** El ROI de Salesforce cierra — pero rara vez antes de 24 meses de operación estabilizada. Una empresa que necesita retorno en 12 meses tendrá frustración antes que ROI. El modelo del vendedor normalmente proyecta retorno a partir del mes 6, que es el mes del go-live, no el mes en que la operación funciona de verdad con datos limpios y adopción real.

## Cómo usar la matriz antes de firmar

El ejercicio es directo: completar las cuatro variables con números reales, no proyecciones de deck.

1. **Calcula el costo total en 36 meses:** licencia + implementación + operación continua + adaptación organizacional. Regla de bolsillo conservadora: el costo real del primer ciclo equivale a 2,5–3x el costo anual de licencia. Si el socio de implementación da un número menor, pide la justificación detallada.

2. **Calcula el costo de la alternativa en el mismo período:** Hubspot Pro, Pipedrive Advanced, o el equivalente para tu tamaño. Incluye configuración y personalización necesaria. La diferencia entre las dos cuentas es la prima que estás pagando por Salesforce.

3. **Calcula la ganancia diferencial que solo Salesforce entrega en este escenario:** automatización que la alternativa no cubre, integración nativa que ahorra tiempo de ingeniería, datos unificados que la alternativa no tiene. Sé honesto sobre lo que es diferencial real y lo que es una función que el equipo nunca usará.

4. **Verifica si la ganancia diferencial justifica la prima** en el horizonte de 36 meses — con un 20% de margen para imprevistos. Si cierra holgadamente: decisión robusta. Si cierra con margen ajustado: el proyecto necesita control de alcance riguroso. Si no cierra: el proceso probablemente no es lo suficientemente complejo para justificar la plataforma.

Como deja claro el [mapeo de procesos antes de Salesforce](/blog/es/mapear-processos-antes-do-salesforce.html), el momento correcto para hacer este ejercicio es antes del RFP, no después. Cuando el vendedor ya está en la mesa con propuesta lista, el sesgo de confirmación hace que los números siempre cierren — porque todo número incierto se estima del lado favorable.

## Cinco preguntas que el vendedor de licencia no traerá a la reunión

Además de la matriz, cinco preguntas que cambian la cuenta:

1. **¿Cuál es el costo mensual de operación continua con un admin certificado, post go-live?** Si la respuesta es "depende", pide un rango basado en casos comparables a tu tamaño. No cierres el contrato sin ese número.

2. **¿Cuál es el costo de migración de datos heredados — y quién paga si los datos están sucios?** Los datos sucios son la regla, no la excepción. La propuesta que no menciona este costo está omitiendo el mayor riesgo del proyecto.

3. **¿Cuál es el modelo de soporte después del go-live?** El socio de implementación y el socio de sustentación rara vez son el mismo contrato. El [modelo de socios de Salesforce](/blog/es/salesforce-partner-program.html) tiene tiers y obligaciones que el cliente solo entiende cuando necesita soporte urgente — y ya pagó por la sorpresa.

4. **¿Cuál es la métrica de adopción que indica éxito a los 90 días?** Si la respuesta es "inicio de sesión del usuario", el proyecto va mal. La adopción real es proceso registrado, datos útiles para decisiones y gestión usando el pipeline — no vendedores conectados.

5. **¿Qué pasa si el proyecto se retrasa 3 meses?** El contrato de licencia generalmente comienza a correr en la firma, no en el go-live. Tres meses de retraso son tres meses de licencia pagada antes de la entrega. ¿Quién absorbe ese costo?

## ROI honesto rinde más que ROI optimista

Una empresa que entra al proyecto con expectativas calibradas, proceso definido y equipo con músculo operacional generalmente extrae ROI real. No el de la presentación del vendedor, sino ROI medible: productividad del vendedor, previsibilidad de ingresos, datos confiables para decisiones.

Quien entra con el modelo del vendedor y descubre el costo real dos años después no se va — porque migrar es demasiado caro. Tercerizará la culpa al producto, recortará la inversión en operaciones y cosechará lo peor de ambos mundos: licencia cara, operación mal sustentada, datos poco confiables.

> La diferencia entre un proyecto de Salesforce que rinde y uno que sangra rara vez está en el producto. Está en la calidad del diagnóstico antes de la firma.

La matriz no garantiza ROI. Garantiza que la decisión se tomó con los números correctos — y cuando el retorno sea menor de lo esperado, al menos no es una sorpresa.
