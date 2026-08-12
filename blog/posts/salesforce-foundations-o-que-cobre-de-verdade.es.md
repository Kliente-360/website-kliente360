---
title: "Salesforce Foundations: qué cubre el paquete gratuito (y dónde se detiene)"
slug: "salesforce-foundations-o-que-cobre-de-verdade"
pillar: "sf"
date: "2026-08-12"
readMinutes: 7
excerpt: "Foundations libera Agentforce, Data 360 y Commerce gratis en Enterprise Edition — pero Commerce ni llega a Brasil, y el crédito de IA se agota rápido."
tldr: "Salesforce Foundations es un add-on de costo cero (SKU $0) que Salesforce otorga a clientes de Sales Cloud y/o Service Cloud en Enterprise Edition o superior, incluyendo funciones básicas de ventas, servicio, marketing, Commerce, Data 360 y Agentforce sin licencia adicional. El paquete salió en septiembre de 2024 y sumó Agentforce meses después, pero los límites reales —2 mil correos al mes, un pool de créditos de IA que varía según la fuente consultada, y una tienda de venta directa que ni está disponible para empresas brasileñas— definen rápido dónde el gratuito deja de resolver. La pregunta que importa no es si Foundations es gratis, es hasta qué punto del caso de uso lo sostiene antes de convertirse en upsell."
keywords: ["Salesforce Foundations", "Agentforce gratis", "Flex Credits", "Enterprise Edition", "créditos Data 360", "add-on Salesforce $0"]
---

**Todo add-on gratuito** de una plataforma enterprise carga la misma pregunta implícita: gratis hasta dónde. Salesforce Foundations es la versión más reciente de esa prueba. Lanzado en septiembre de 2024 como un SKU de costo cero para quien ya paga Enterprise Edition de Sales Cloud o Service Cloud, el paquete ganó peso real durante 2025 cuando empezó a incluir Agentforce —y se volvió, para muchas empresas que ya tenían el contrato base, la puerta de entrada más barata para probar un agente de IA en producción sin firmar una licencia nueva.

El problema es que "gratuito" y "suficiente" rara vez coinciden en una plataforma enterprise, y Foundations no es la excepción. El paquete resuelve una prueba de concepto o un caso de uso pequeño con margen de sobra. Decidir si resuelve la operación real de la empresa exige mirar los cuatro límites que la página de marketing no destaca con el mismo tamaño de letra que el "$0".

## Qué entra gratis — y por qué no es poco

Foundations no es un trial disfrazado. Es un conjunto de capacidades reales, liberadas de forma permanente, sin contrato adicional, para quien ya está en la edición correcta:

1. **Sales.** Sales Console completo, gestión de lead y oportunidad, herramientas de cotización y enlaces de pago seguro (Pay Now) directo desde la cotización o la oportunidad.
2. **Service.** Consola de atención, gestión de caso, macros de automatización de tarea repetitiva y soporte multicanal.
3. **Marketing.** Editor de correo drag-and-drop, analítica de campaña integrada y hasta 2.000 envíos de correo al mes.
4. **Commerce.** Una tienda digital direct-to-consumer, checkout gestionado, herramientas de merchandising y los mismos enlaces de pago seguro del módulo Sales.
5. **Data 360.** Perfil unificado de cliente entre sistemas, segmentación de hasta cinco flujos de datos y 10.000 créditos anuales de segmentación y activación.
6. **Agentforce.** Agent Builder, Prompt Builder, al menos una skill de agente configurada y un pool de créditos (Flex Credits) compartido con Data 360 para probar un caso de uso real, no solo una demo.

> Foundations no es un gancho de venta — es capacidad de producción real, solo que con el medidor de uso encendido desde el primer día.

Eso ya es más de lo que ofrece gratis la mayoría de los competidores de CRM enterprise. Pero "capacidad real" no es sinónimo de "capacidad suficiente" —y ahí es donde entran los cuatro límites.

## Dónde se detiene lo gratuito: los cuatro límites que deciden si alcanza

Ninguno de los límites de abajo está escondido —todos aparecen en letra pequeña en la documentación oficial. Lo que cambia es cuánto pesa cada uno según el tamaño y el caso de uso de la empresa.

1. **La edición mínima exige Enterprise.** Foundations solo existe para quien ya paga Enterprise Edition o superior de Sales Cloud y/o Service Cloud. El cliente en Starter Suite o Professional Edition —el segmento que más necesitaría un empujón gratuito— no tiene acceso. Los clientes de Government Cloud y de Industry Clouds también quedan fuera, sin importar la edición.
2. **Marketing se traba en 2.000 correos al mes.** Suficiente para un newsletter de base pequeña, insuficiente para cualquier operación de email marketing con cadencia de nutrición real. Pasar el límite significa upgrade pago, no un excedente discreto.
3. **El crédito de IA y de datos comparte el mismo pool.** Agentforce y Data 360 compiten por el mismo saldo de Flex Credits. Quien usa segmentación pesada en Data 360 deja menos crédito para correr un agente —y viceversa. Esto reproduce, en una escala menor, [el mismo multiplicador de operación que ya vimos decidir el presupuesto de Data Cloud pago](/blog/es/data-cloud-pricing-creditos-2026.html): el costo real no está en el precio de entrada, está en qué función consume el crédito más rápido.
4. **Commerce no llega a todos los países —Brasil incluido.** La tienda direct-to-consumer del módulo Commerce está disponible oficialmente solo para Estados Unidos, según un relevamiento de Salesforce Ben. La empresa brasileña que veía en el Commerce gratuito un motivo para activar Foundations descubre, al momento de configurarlo, que ese módulo específico no existe para ella.

Ese cuarto punto es el que más sorprende a un gestor brasileño. No es un límite de uso —es ausencia de disponibilidad regional, y solo aparece después de que la empresa ya decidió, en el papel, que Foundations valía la pena por el paquete completo.

## Por qué el número de crédito cambia según la fuente que consultes

Vale registrar un síntoma, no solo un límite: buscar "cuántos Flex Credits incluye Foundations" devuelve respuestas distintas según la fecha de la fuente —100 mil, 200 mil, 450 mil. No es un error de tipeo generalizado. Es Salesforce revisando la regla de crédito de Agentforce en varias rondas desde el lanzamiento, la misma dinámica que [ya reformuló el pricing de Data Cloud en créditos únicos y SKU por perfil en marzo de 2026](/blog/es/data-cloud-pricing-creditos-2026.html) y que acompañó [el rebranding que cambió Sales Cloud por Agentforce Sales](/blog/es/sales-cloud-vira-agentforce-sales.html) en el mismo ciclo.

Para quien decide el presupuesto, la lección práctica es simple: no ates el caso de negocio a un número de crédito leído en un blog de terceros publicado hace seis meses. Confirma el saldo vigente en tu propia org antes de proyectar cuánto va a durar el piloto hasta necesitar una compra adicional.

## Tres preguntas para decidir si Foundations resuelve o solo posterga la decisión real

Foundations es una herramienta de prueba barata, no de operación definitiva. Tres preguntas, en el orden que conviene revisar antes de tratarlo como estrategia de largo plazo:

1. **¿El caso de uso cabe dentro de los límites, o ya nace más grande que ellos?** Si el volumen real de correo, segmentación o conversación de agente supera el techo en el primer mes, Foundations no es la base correcta —es solo el piloto que confirma que la inversión pagada es necesaria.
2. **¿La empresa ya está en Enterprise Edition, o tendría que subir de edición solo para calificar?** Subir de edición para acceder a un add-on gratuito es una decisión de costo real, no de costo cero —[la misma regla de ROI que decide cualquier inversión en Salesforce](/blog/es/salesforce-roi-matriz.html) se aplica igual aquí.
3. **¿El módulo que interesa está disponible en la región de la empresa?** Antes de diseñar el piloto alrededor de Commerce, confirma la disponibilidad regional. Descubrir la restricción después de comprometer el roadmap del trimestre cuesta más caro que la licencia que la empresa intentaba evitar pagar.

Ninguna de las tres preguntas invalida a Foundations —solo evitan el error de tratarlo como sustituto permanente de una inversión que la operación real va a exigir de todos modos.

## Lo gratuito prueba el caso de uso — no sustituye la decisión de inversión

Foundations cumple bien el papel para el que la Salesforce lo diseñó: darle a un cliente que ya paga Enterprise Edition una forma de probar Agentforce, Data 360 y automatización de correo sin firmar contrato nuevo. Eso tiene valor real, sobre todo para una empresa que todavía está decidiendo si un agente de IA resuelve un problema concreto o es solo tendencia de mercado.

El error es leer "gratuito" como "resuelto". Los cuatro límites —edición mínima, techo de correo, pool de crédito compartido y disponibilidad regional— no son letra pequeña accidental. Son el diseño deliberado de un producto de adquisición: mostrar valor rápido, lo suficiente para justificar la conversación comercial sobre lo que viene después. La empresa que trata a Foundations como fase 1 de un plan, no como destino final, le saca el valor correcto.

## Preguntas que siempre vuelven

Para cerrar, las dudas más comunes sobre qué cubre de verdad Salesforce Foundations.

## ¿Qué es Salesforce Foundations?

Salesforce Foundations es un add-on gratuito (SKU de costo $0) que Salesforce otorga a clientes de Sales Cloud y/o Service Cloud en Enterprise Edition o superior, sin costo de licencia adicional. Incluye funciones básicas de ventas, atención, marketing (correo), Commerce, unificación de datos vía Data 360 y un pool inicial de créditos de Agentforce para probar un agente de IA en producción. Lanzado en septiembre de 2024, sumó Agentforce como módulo meses después del anuncio original.

## ¿Quién puede usar Salesforce Foundations gratis?

Solo los clientes que ya pagan Enterprise Edition o superior de Sales Cloud y/o Service Cloud. Los clientes en Starter Suite, Essentials o Professional Edition no califican, aunque paguen por Salesforce —Agentforce, en particular, exige Enterprise Edition como piso técnico, lo que deja a la empresa pequeña fuera tanto de la versión pagada como de la gratuita. Los clientes de Government Cloud y de Industry Clouds también quedan fuera de la elegibilidad, sin importar la edición.

## ¿Salesforce Foundations sirve para una empresa brasileña?

Sirve, con una salvedad concreta: el módulo Commerce —tienda digital direct-to-consumer con checkout y pago integrado— está disponible oficialmente solo para Estados Unidos, lo que excluye a la empresa brasileña de ese módulo específico. Los demás módulos (Sales, Service, Marketing, Data 360 y Agentforce) no tienen esa restricción regional y funcionan normalmente para quien ya está en la edición elegible en Brasil.
