---
title: "Agentforce: cuánto cuesta con seis modelos que no se mezclan"
slug: "agentforce-pricing-seis-modelos"
pillar: "sf"
date: "2026-08-25"
readMinutes: 7
excerpt: "Agentforce tiene seis modelos comerciales, de un nivel gratis a $550/usuario — pero conversación a $2 y Flex Credits nunca coexisten."
tldr: "El pricing de Agentforce en 2026 se divide en seis modelos comerciales distintos — Salesforce Foundations gratuito, conversaciones a $2, Flex Credits por acción consumida, licencia de usuario, add-on de uso ilimitado y la edición empaquetada Agentforce 1 — y dos de ellos, conversaciones y Flex Credits, son mutuamente excluyentes dentro de la misma org. Elegir mal entre esos dos no es cosmético: el punto de equilibrio está cerca de 20 acciones por conversación, y las organizaciones que se equivocan de lado pagan sustancialmente más por el mismo volumen de uso. Las otras cuatro capas resuelven escenarios distintos de adopción — del piloto gratuito al empleado con uso intensivo — y elegir la incorrecta cuesta tanto como equivocarse entre conversación y crédito."
keywords: ["Agentforce pricing", "Flex Credits", "conversaciones Agentforce", "Agentforce User License", "Agentforce 1", "Salesforce Foundations"]
---

**El pricing** es la pregunta que todo decisor hace antes de aprobar un piloto de Agentforce — y también la que la documentación oficial responde de forma más fragmentada. No existe "el precio de Agentforce". Existen seis modelos comerciales conviviendo en el catálogo de Salesforce de 2026, cada uno pensado para un patrón de uso distinto, y elegir el modelo equivocado cuesta tan caro como elegir la herramienta equivocada.

El problema no es falta de opciones — es lo contrario. Con seis caminos y una regla de exclusión mutua escondida en el medio, la pregunta que decide el presupuesto no es "cuánto cuesta Agentforce", es "cuál de esos seis modelos combina con el patrón de uso que la empresa ya tiene".

## Seis modelos, una decisión por org

Ninguno de los seis es hipotético — todos están activos en el catálogo comercial de 2026. La diferencia entre ellos es lo que cada uno mide como unidad de consumo:

1. **Salesforce Foundations (gratis).** Add-on de costo cero para quien ya paga Enterprise Edition de Sales Cloud o Service Cloud. Incluye un pool inicial de Flex Credits, créditos de Data 360 y acceso a Agent Builder y Prompt Builder — el piloto sin costo de licencia adicional.
2. **Conversaciones a $2 cada una.** Modelo pensado para agente orientado al cliente externo. Una conversación es la ventana de interacción entre usuario y agente — desde el primer mensaje hasta la resolución, la escalada a un humano o 24 horas de inactividad — cobrada como unidad cerrada, sin importar cuántos mensajes o acciones ocurrieron dentro de ella. Cuando el canal es WhatsApp, desde octubre de 2026 este costo se suma [al cobro por mensaje de servicio que la propia Meta empieza a aplicar](/blog/es/whatsapp-salesforce-brasil.html) — dos capas de costo variable apiladas en la misma conversación.
3. **Flex Credits por acción.** Modelo de consumo: US$ 500 rinden 100 mil créditos, y cada acción estándar que el agente ejecuta consume 20 créditos (cerca de US$ 0,10). Una acción de voz consume 30 créditos (cerca de US$ 0,15).
4. **Agentforce User License.** Licencia por usuario interno, alrededor de US$ 5 al mes, que igual depende de Flex Credits para cubrir el consumo real de acción.
5. **Agentforce como add-on de uso ilimitado.** Entre US$ 125 y US$ 150 por usuario al mes, sin medidor de acción — pensado para el empleado con uso intenso y predecible, donde el consumo variable saldría más caro que una licencia fija.
6. **Agentforce 1.** Edición empaquetada que incluye el add-on de Agentforce junto con Flex Credits y créditos de Data 360 en un solo SKU, para la empresa que consolida inversión de IA y CRM en un contrato único en vez de comprar cada pieza por separado.

> Seis modelos no es generosidad de menú — es Salesforce reconociendo que agente de cliente y agente de empleado consumen de formas incompatibles entre sí.

El primer filtro para cualquier decisión de presupuesto es simple: los modelos 2 y 3 no coexisten en la misma org. El resto — Foundations, licencia, add-on, Agentforce 1 — resuelve capas distintas de adopción interna. Es el par conversación-versus-crédito el que concentra el riesgo real de equivocar la cuenta.

## $2 por conversación o Flex Credits — la exclusión mutua que decide el resto

Conversaciones y Flex Credits miden lo mismo — uso de agente — de formas incompatibles, y Salesforce no permite correr los dos modelos en la misma org al mismo tiempo. La elección es estructural, no táctica: cambia cómo se presupuesta toda la operación de agente de ahí en adelante.

La matemática detrás de la elección es directa. Una acción estándar en Flex Credits cuesta cerca de US$ 0,10. Una conversación completa, sin importar cuántas acciones ocurran dentro de ella, cuesta US$ 2 fijos. El punto de equilibrio cae cerca de 20 acciones por conversación — por debajo, Flex Credits sale más barato; por encima, la conversación a precio fijo gana.

1. **Agente de soporte simple, pocas idas y vueltas.** Una consulta de seguimiento de pedido resuelta en 3–5 acciones consume bastante menos de US$ 2 en Flex Credits. Aquí, el crédito por acción es la elección racional.
2. **Agente de atención compleja, múltiples herramientas por sesión.** Un caso que exige consultar historial, cruzar sistemas y escalar contexto fácilmente supera las 20 acciones. Aquí, la conversación a US$ 2 fijos protege contra la factura de crédito acumulado.
3. **Volumen alto y predecible de conversaciones simples.** Cuando el patrón de uso es estable y las acciones por conversación se mantienen consistentemente bajas, Flex Credits da control fino — pero exige monitoreo constante de consumo, algo que la conversación fija evita.

> Elegir entre conversación y crédito no es elegir lo más barato — es elegir el modelo que combina con la varianza real del caso de uso, no con su escenario más optimista.

Es el mismo patrón de riesgo que [ya apareció en la reforma de pricing de Data Cloud](/blog/es/data-cloud-pricing-creditos-2026.html): un modelo de consumo variable parece más barato en la propuesta y se vuelve impredecible en la operación cuando la empresa no mapea antes su volumen real.

## Las tres capas orientadas al empleado, no al cliente

Conversaciones y Flex Credits resuelven el agente orientado hacia afuera — cliente, prospecto, usuario externo. Pero Agentforce también se vende para uso interno, y ahí entran las otras tres capas del modelo:

**Agentforce User License** cubre al empleado que usa el agente ocasionalmente, con el consumo real de acción todavía debitado del pool de Flex Credits de la org. Es la entrada más barata para dar acceso a un número grande de usuarios sin comprometer un presupuesto alto por persona.

**El add-on de uso ilimitado** cambia el medidor por un precio fijo por usuario — entre US$ 125 y US$ 150 al mes. Tiene sentido cuando el empleado usa el agente con intensidad predecible: un vendedor que consulta al agente en cada oportunidad, un analista de soporte que resuelve caso tras caso. Pagar por acción en ese perfil de uso normalmente sale más caro que la licencia fija.

**Agentforce 1** es la apuesta de quien ya decidió consolidar. Al incluir el add-on, Flex Credits y créditos de Data 360 en un SKU único, elimina la gestión de tres contratos separados — al costo de comprometer un presupuesto de salida mayor, [la misma regla de ROI que decide cualquier inversión mayor en Salesforce](/blog/es/salesforce-roi-matriz.html).

## Tres preguntas para elegir sin quemar presupuesto

Antes de firmar cualquiera de los seis modelos, tres preguntas resuelven la mayor parte del riesgo de presupuesto:

1. **¿El agente habla con cliente externo o con empleado interno?** Esa respuesta ya elimina la mitad de las opciones — conversación y Flex Credits compiten por el caso externo; licencia, add-on y Agentforce 1 compiten por el caso interno.
2. **¿El promedio de acciones por conversación queda por encima o por debajo de 20?** Si la empresa todavía no lo sabe, el piloto dentro de [Foundations gratuito](/blog/es/salesforce-foundations-o-que-cobre-de-verdade.html) es el lugar correcto para medir antes de comprometerse con uno de los dos modelos excluyentes.
3. **¿El uso por empleado es ocasional o intenso y predecible?** El uso ocasional favorece la licencia con Flex Credits; el uso intenso favorece el add-on de precio fijo — invertir la elección paga lo peor de los dos mundos.

Ninguna de las tres preguntas cambia dato real por estimación de vendedor. La respuesta correcta está en el patrón de uso de la propia operación, no en la tabla de precios aislada.

## Seis modelos resuelven seis escenarios — no uno solo

La fragmentación de pricing de Agentforce no es un accidente de comunicación — refleja que el agente de IA en producción no tiene un único patrón de consumo. Cliente externo consume distinto que empleado interno; caso simple consume distinto que caso complejo; piloto consume distinto que operación madura.

El error más caro no es elegir un modelo específico — es firmar el primero que recomienda el vendedor sin medir, antes, en cuál de los seis escenarios encaja realmente la operación. Quien mapea el patrón de uso antes de comprar entra a la conversación comercial sabiendo cuál de las seis preguntas hacer primero.

## Preguntas que siempre vuelven

Para cerrar, las dudas más comunes sobre cuánto cuesta Agentforce en realidad.

## ¿Cuánto cuesta Agentforce por conversación?

El modelo de conversaciones cobra US$ 2 por conversación completa, sin importar cuántas acciones o mensajes ocurran dentro de ella. Una conversación se define como la ventana de interacción entre usuario y agente — desde el primer mensaje hasta la resolución, la escalada a un humano o 24 horas de inactividad. Es el modelo recomendado para agentes orientados al cliente con casos que involucran múltiples acciones por sesión.

## ¿Puedo usar Flex Credits y conversaciones al mismo tiempo en Agentforce?

No. Conversaciones y Flex Credits son mutuamente excluyentes dentro de la misma org — Salesforce exige elegir uno de los dos modelos, no permite alternar caso por caso. La decisión depende del promedio de acciones por conversación: por debajo de aproximadamente 20 acciones, Flex Credits (cerca de US$ 0,10 por acción estándar) tiende a salir más barato; por encima, la conversación a US$ 2 fijos protege contra el consumo acumulado.

## ¿Existe una forma gratuita de probar Agentforce?

Sí, dentro de Salesforce Foundations — add-on de costo cero para clientes de Sales Cloud o Service Cloud en Enterprise Edition o superior, que incluye un pool inicial de Flex Credits, créditos de Data 360 y acceso a Agent Builder y Prompt Builder. Es el camino correcto para medir el patrón real de uso — acciones por conversación, volumen de empleados — antes de comprometerse con uno de los modelos pagos.
