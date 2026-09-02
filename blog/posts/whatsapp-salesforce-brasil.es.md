---
title: "WhatsApp en Salesforce: el fin del mensaje de servicio gratis"
slug: "whatsapp-salesforce-brasil"
pillar: "sf"
date: "2026-09-02"
readMinutes: 7
excerpt: "Desde el 1 de octubre de 2026, Meta cobra por mensaje de servicio en WhatsApp — el fin de la ventana gratis que sostenía a Agentforce."
tldr: "Mensaje de servicio en WhatsApp es la respuesta de texto libre — no plantilla — que una empresa manda dentro de la ventana de atención de 24 horas, escrita por un agente humano, un bot de reglas o una IA de terceros como Agentforce. Ese mensaje es gratuito desde noviembre de 2024, pero eso cambia a partir del 1 de octubre de 2026: Meta empieza a cobrar por unidad, al mismo valor que ya cobra hoy por plantilla de utilidad y autenticación en cada país, sin descuento por volumen. Para quien ya integró Agentforce a WhatsApp vía Salesforce, la cuenta que hoy es cero dentro de la ventana de atención se vuelve línea de costo recurrente en menos de un mes después de la publicación de este texto. La pregunta que decide el presupuesto deja de ser solo qué licencia firmar — pasa a incluir cuántos mensajes de servicio intercambia la operación por día."
keywords: ["mensaje de servicio WhatsApp", "WhatsApp Business Platform pricing", "Agentforce WhatsApp", "Service Cloud Digital Engagement", "Meta Business Agent", "WhatsApp Salesforce Brasil"]
---

**A partir** del 1 de octubre de 2026, toda respuesta que una empresa manda por WhatsApp dentro de la ventana de atención de 24 horas — texto libre, no plantilla, escrita por un agente humano o generada por una IA como Agentforce — deja de ser gratis. Meta va a cobrar por mensaje de servicio, al mismo valor que ya cobra hoy por plantilla de utilidad y autenticación en cada país, sin descuento por volumen.

Eso cambia la cuenta de cualquier empresa que ya decidió integrar WhatsApp con Salesforce — y cambia más todavía para quien puso a Agentforce respondiendo clientes dentro de esa ventana. Es justo ahí, en la respuesta de rutina dentro de la atención abierta, donde la operación hoy no paga nada más allá de la licencia del canal.

## Qué es un mensaje de servicio — y por qué era gratis hasta ahora

Mensaje de servicio es cualquier respuesta que reúne tres características a la vez: es texto libre (no una plantilla preaprobada), ocurre dentro de la ventana de 24 horas que abrió el cliente, y no fue generada por el agente de IA de la propia Meta. Consulta de estado de pedido, confirmación de agendamiento, duda sobre un error de cobro — la mayor parte de una conversación de atención en WhatsApp es, técnicamente, mensaje de servicio.

Ese tipo de mensaje es gratuito desde noviembre de 2024, cuando Meta eliminó el cobro por conversación de servicio que existía antes. Esa gratuidad fue lo que hizo que WhatsApp fuera barato de operar a escala: una empresa brasileña que ya usa la app como canal principal — 82% de las microempresas y pequeñas empresas del país, según relevamientos de mercado, muchas veces sin ningún sistema detrás, solo la aplicación y la memoria de quien atiende — no paga nada por el intercambio del mensaje en sí, solo por la licencia o por la herramienta que conecta el canal al sistema. Es el mismo síntoma de doble digitación que ya mapeamos en operaciones pequeñas, donde [el vendedor anota en WhatsApp y transcribe al CRM después porque el gestor lo exige](/blog/es/quando-nao-usar-salesforce.html) — solo que aquí el costo que estaba escondido no es el del proceso, es el de la propia mensajería que Meta cobraba cero hasta ahora.

Con 82% de los usuarios de WhatsApp en Brasil habiendo hablado ya con una empresa por la app y 88% reportando haber sido atendidos por un bot en esa conversación, la escala de mensajes de servicio intercambiados cada día en el país no es pequeña. Es justamente esa escala la que hace que el cambio de octubre pese en el presupuesto — no el precio unitario, que es bajo, sino el volumen que lo multiplica.

## Qué cambia el 1 de octubre de 2026

Cuatro puntos resumen el cambio, directo de la documentación de la propia Meta sobre pricing de mensajes no-plantilla:

1. **El mensaje de servicio deja de ser gratis.** Pasa a cobrarse por unidad, al mismo valor que Meta ya cobra hoy por plantilla de utilidad y autenticación en ese país — sin el descuento por volumen (tier) que reciben las plantillas de utilidad y autenticación.
2. **La plantilla de utilidad pierde la exención dentro de la ventana.** Hoy, una plantilla de utilidad enviada dentro de una conversación de atención ya abierta no se cobra. Eso termina junto con el cambio de octubre.
3. **No es lo mismo que el Meta Business Agent.** La IA propia de Meta dentro de WhatsApp — producto distinto de Agentforce — ya pasa a cobrarse por token (US$ 2 cada 1 millón de tokens, entre 4 y 5 centavos por respuesta) desde el 1 de agosto de 2026, en un cronograma separado. El mensaje generado por Agentforce o por cualquier otra IA de terceros entra en la categoría de mensaje de servicio, cobrado por unidad a partir de octubre — no en el esquema de tokens de Meta.
4. **El valor exacto por país sale hasta el 1 de septiembre de 2026.** La propia documentación de Meta usa, como ejemplo ilustrativo para Brasil, un cobro cercano a US$ 0,0068 por mensaje de servicio — un orden de magnitud bastante por debajo de la plantilla de marketing (cerca de US$ 0,0625), pero igual un valor que hoy es cero.

> El mensaje que hoy cuesta cero dentro de la ventana de atención se vuelve línea de presupuesto en octubre — el precio unitario es bajo, el volumen es lo que decide la cuenta.

Ninguno de los cuatro puntos depende de una decisión de la empresa — es un cambio de tabla de Meta, que vale para cualquier negocio que opere la WhatsApp Business Platform, con o sin Salesforce en el medio.

## Qué cambia para quien ya corre Agentforce en WhatsApp vía Salesforce

Hoy, el costo de una conversación de soporte por WhatsApp dentro de Salesforce tiene dos capas: la licencia del Service Cloud Digital Engagement — en torno a US$ 75 por usuario al mes — y el consumo del propio Agentforce, cobrado en Flex Credits o por conversación según el modelo contratado. A partir de octubre, entra una tercera capa: cada respuesta que Agentforce manda dentro de la ventana de atención — la misma respuesta de rutina que hoy es gratis para Meta — pasa a tener un costo por mensaje cobrado directo por la propia Meta.

Eso se acumula en cualquier caso de uso que ya dependa de conversaciones largas en el canal. Es el mismo patrón que ya aparece [con el Buyer Agent cerrando pedidos B2B recurrentes directo por WhatsApp](/blog/es/agentforce-commerce-vender-sem-humano.html): cada confirmación de SKU, cada precio de contrato revisado, cada pregunta de aclaración se vuelve un mensaje de servicio separado — hoy gratis, a partir de octubre cobrado por unidad.

El riesgo no es el costo por mensaje aislado, que es bajo. Es el mismo riesgo de consumo variable que [ya detallamos en la cuenta de pricing del propio Agentforce](/blog/es/agentforce-pricing-seis-modelos.html): parece pequeño en la propuesta y se vuelve impredecible en la operación cuando nadie mide, antes, cuántos mensajes de servicio consume realmente una conversación típica.

## Cuatro preguntas antes de octubre de 2026

El cambio ya tiene fecha marcada — lo que queda es decidir cómo se prepara la operación antes de que llegue:

1. **¿Cuántos mensajes de servicio intercambia la operación por conversación hoy, sumando agente humano y Agentforce?** Sin ese número, no hay forma de estimar el impacto del cambio — solo reaccionar a la factura después de que llegue.
2. **¿Cuántos de esos turnos se pueden resolver con una recolección única — WhatsApp Flow, formulario embebido — en vez de varias idas y vueltas?** Cada intercambio de mensaje evitado es un mensaje de servicio menos cobrado por unidad.
3. **¿Qué actualizaciones estructuradas — confirmación de pedido, estado, recordatorio — tienen más sentido como plantilla que como respuesta suelta?** La plantilla de utilidad también empieza a cobrarse dentro de la ventana, pero todavía mantiene el descuento por volumen que el mensaje de servicio no tiene.
4. **¿Quién en el equipo — Salesforce, atención, finanzas — va a ser dueño del techo de gasto mensual de mensajería después de octubre?** Hoy ese techo no existe porque la cuenta es cero. A partir de octubre, alguien necesita ser responsable de ella.

Ninguna de las cuatro respuestas está en la tabla de precios de Meta o de Salesforce de forma aislada — está en el patrón de conversación que la propia operación ya tiene, medido antes de que el cambio entre en vigor.

## La ventana gratis se volvió excepción, no regla

Durante casi dos años, el mensaje de servicio en WhatsApp fue la pieza gratuita de una cuenta que ya cobraba plantilla, licencia de canal y consumo de agente. Eso cambia en octubre de 2026, y cambia para toda empresa que opera el canal — con Salesforce, con otro CRM, o sin ningún CRM.

Quien ya mide hoy cuántos mensajes de servicio consume una conversación típica entra al cambio sabiendo el tamaño real del impacto. Quien solo descubre el cambio en la factura de octubre va a gastar el mes siguiente tratando de reconstruir un número que se podía haber medido en septiembre.

## Preguntas que siempre vuelven

Para cerrar, las dudas más comunes sobre el cobro de mensaje de servicio en WhatsApp.

## ¿Qué es un mensaje de servicio en WhatsApp y cuándo deja de ser gratis?

Mensaje de servicio es una respuesta de texto libre — no una plantilla preaprobada — enviada dentro de la ventana de atención de 24 horas que abrió el cliente, por un agente humano, un bot de reglas o una IA de terceros como Agentforce. Es gratuita desde noviembre de 2024, pero deja de serlo a partir del 1 de octubre de 2026, cuando Meta empieza a cobrar por unidad, al mismo valor que ya cobra hoy por plantilla de utilidad y autenticación en cada país, sin descuento por volumen.

## ¿El Meta Business Agent y el mensaje de servicio de Agentforce se cobran de la misma forma?

No. Son productos y cronogramas distintos. El Meta Business Agent es la IA propia de Meta dentro de WhatsApp, cobrada por token — US$ 2 cada 1 millón de tokens, cerca de 4 a 5 centavos por respuesta — desde el 1 de agosto de 2026. El mensaje generado por Agentforce o por cualquier otra IA de terceros entra en la categoría de mensaje de servicio, cobrado por unidad a partir del 1 de octubre de 2026, al valor equivalente a la plantilla de utilidad y autenticación del país.

## ¿Cuánto va a costar cada mensaje de servicio en Brasil?

La documentación de Meta usa como ejemplo ilustrativo para Brasil un cobro cercano a US$ 0,0068 por mensaje de servicio — bastante por debajo de la plantilla de marketing, que ronda los US$ 0,0625. El valor definitivo por categoría y volumen solo se cierra con la tabla oficial que Meta publica hasta el 1 de septiembre de 2026, así que el número final puede variar respecto al ejemplo.
