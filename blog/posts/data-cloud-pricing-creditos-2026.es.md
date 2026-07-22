---
title: "Data Cloud pricing 2026: el nuevo modelo de créditos y qué cambia"
slug: "data-cloud-pricing-creditos-2026"
pillar: "sf"
date: "2026-07-22"
readMinutes: 7
excerpt: "En marzo de 2026 Salesforce reemplazó cuatro créditos segmentados por un único pool y creó un SKU por perfil — qué cambia en el presupuesto de Data Cloud."
tldr: "Data Cloud pricing 2026 es la reforma que Salesforce aplicó el 2 de marzo, que sustituye cuatro tipos de crédito segmentado por un pool único y fungible —los Data Services Credits— y añade un SKU fijo por perfil como alternativa al consumo variable. La ingesta de dato nativo (Sales Cloud, Service Cloud, Marketing Cloud, Commerce) dejó de consumir crédito, respuesta directa a la queja de pagar dos veces por el propio dato. Pero el multiplicador de crédito por operación —de 2 créditos por millón de filas en una consulta a 100.000 en una resolución de identidad— sigue concentrando el riesgo de presupuesto desbordado en cargas específicas. Elegir entre consumo por crédito y SKU por perfil se volvió decisión de presupuesto, no default de contrato."
keywords: ["Data Cloud pricing", "Data Services Credits", "SKU por perfil", "Salesforce Data 360", "Flex Credits", "presupuesto de Data Cloud"]
---

Data Cloud cambió de nombre y de tabla de precio en el mismo año. Se volvió Data 360 en octubre de 2025; el 2 de marzo de 2026, Salesforce reformuló toda la tarifación —cuatro tipos de crédito segmentado se convirtieron en un pool único, y un SKU fijo por perfil entró como alternativa al consumo variable. La pregunta que el responsable de presupuesto venía haciendo hace dos años —cuánto cuesta Data Cloud de verdad— finalmente tiene una respuesta más clara. Solo que la respuesta no es "más barato". Es "depende de cuál de los tres modelos elijas, y elegir mal sigue desbordando el presupuesto igual que antes".

Esto importa más ahora que hace un año. Data Cloud dejó de ser solo capa de unificación de perfil —[es la base de contexto que cualquier agente de Agentforce consulta para decidir](/blog/es/data-cloud-nervo-central.html). Equivocar el modelo de pricing dejó de ser un costo aislado de una iniciativa de CDP: se volvió un costo estructural incrustado en cada agente que la empresa ponga a operar.

## Qué cambió de verdad el 2 de marzo

Antes de la reforma, el pricing de Data Cloud heredaba un problema de 2023: crédito segmentado en cuatro categorías distintas, separadas entre sandbox y producción, cada una con su propia regla de consumo. Nadie fuera del equipo de licenciamiento podía prever el gasto con confianza —y el modelo anterior llegaba a cobrar US$ 108.000 anuales solo de licencia base de Data Cloud for Marketing, según relevamientos de mercado, antes de procesar una sola fila de dato externo.

La reforma resuelve parte de esto con tres movimientos:

1. **Pool único de crédito.** Los cuatro tipos segmentados se convirtieron en uno solo —los Data Services Credits, fungibles entre cualquier función de Data 360. US$ 500 rinden 100.000 créditos, usables en ingesta, transformación, segmentación o resolución de identidad, sin categoría fija.
2. **SKU fijo por perfil.** Alternativa al consumo variable: US$ 240 por mil perfiles en el plan básico, US$ 420 en el premium, cobrados por año. Cambia previsibilidad de presupuesto por rigidez de uso —quien sabe cuántos perfiles va a gestionar, pero no cuánto va a procesar, gana con este modelo.
3. **Ingesta nativa sin costo de crédito.** El dato que ya vive en Sales Cloud, Service Cloud, Marketing Cloud Engagement, Marketing Cloud Personalization o Commerce entra a Data Cloud sin consumir crédito. Es respuesta directa a la queja más repetida del ciclo anterior: pagar de nuevo por un dato que la empresa ya pagó para generar dentro de la propia Salesforce.

> La reforma resuelve el precio de entrada. No resuelve por sí sola el riesgo de presupuesto que vive dentro de la operación.

## Por qué el pool único no elimina la imprevisibilidad

La ganancia real del pool único es eliminar la fricción de categoría —antes, sobrar crédito de un tipo y faltar de otro trababa la operación sin motivo técnico. Eso terminó. Pero el consumo por crédito sigue siendo variable por naturaleza, y el multiplicador por tipo de operación es donde el riesgo de presupuesto se esconde ahora.

Una consulta simple sobre dato ya ingerido consume 2 créditos por millón de filas procesadas. La resolución de identidad —el proceso que unifica múltiples registros duplicados en un solo perfil— consume hasta 100.000 créditos por millón de filas. La diferencia entre las dos operaciones es de cinco órdenes de magnitud. Una empresa que estima presupuesto por el caso de uso más barato (consulta) y descubre a mitad de trimestre que el volumen real de resolución de identidad es 10 veces el esperado tiene la misma sorpresa de factura que antes de la reforma —solo que ahora, con un pool único, el desborde en identidad drena crédito que también alimentaba segmentación y activación.

Esto no es falla de la reforma. Es la misma lección que carga cualquier decisión de plataforma enterprise: [el costo real aparece en la operación, no en la propuesta comercial](/blog/es/salesforce-roi-matriz.html). El pool único cambió "imprevisible por categoría fija" por "imprevisible por multiplicador de operación" —mejor, pero no resuelto.

## Tres preguntas para decidir entre los tres modelos

La decisión correcta no es "cuál modelo es más barato" —es "cuál modelo combina con el patrón de consumo real de la operación". Tres preguntas, en el orden en que vale la pena revisarlas:

1. **¿Cuántos perfiles gestiona la empresa, y ese conteo es estable?** Si la respuesta es "sí, sabemos el número y varía poco mes a mes", el SKU por perfil da presupuesto fijo y previsible —sin sorpresa de factura aunque el volumen de procesamiento oscile.
2. **¿Qué fracción del volumen de dato pasa por resolución de identidad?** Si la operación hace matching pesado —múltiples fuentes, alta duplicidad, dato de terceros entrando con frecuencia—, el multiplicador de 100.000 créditos por millón de filas domina la cuenta, y el consumo variable se vuelve riesgo concentrado. El SKU por perfil neutraliza ese riesgo porque el precio no cambia con la complejidad del procesamiento interno.
3. **¿La empresa ya usa Agentforce o Slack en el mismo contrato?** Si es así, Flex Credits —el pool fungible entre Data 360, Agentforce, Slack y otros productos— evita comprar crédito duplicado en silos separados. Quien solo usa Data Cloud de forma aislada no gana nada con este tercer modelo; quien ya compra los otros productos gana flexibilidad real de reasignación.

Ninguna de las tres preguntas, aislada, decide sola —pero la segunda suele pesar más que las otras dos juntas, porque es la que expone el multiplicador de cinco órdenes de magnitud.

## Dónde gana cada modelo en la práctica

Aplicando el criterio a escenarios reales:

**Una operación con pocas fuentes de dato e identidad ya resuelta** (empresa pequeña a mediana, un sistema de origen dominante) tolera bien el consumo por crédito. El riesgo del multiplicador de identidad no se materializa porque el volumen de matching es bajo. Aquí el pool único de crédito, aislado, ya resuelve —sin necesitar el SKU fijo.

**Una operación con múltiples fuentes y matching continuo** (fusión de sistemas, integración de adquisición, dato de terceros entrando cada semana) es donde el SKU por perfil paga su propia prima. US$ 240–420 por mil perfiles parece caro contra el precio de entrada del crédito —hasta que la empresa calcula cuántos créditos consumiría un trimestre de resolución de identidad pesada bajo el modelo variable.

**Una operación de ticket bajo que solo consideró Data Cloud por presión del vendor de agentes** merece la pregunta más dura: [el cálculo que ya decide si Salesforce tiene sentido en general](/blog/es/quando-nao-usar-salesforce.html) aplica igual a Data Cloud de forma aislada. Si el caso de uso de agente no justifica la inversión en un CRM completo, tampoco justifica la inversión paralela en una capa de contexto —sin importar cuán simplificado quedó el pricing.

1. **Pocas fuentes, matching liviano:** el consumo por crédito aislado resuelve, sin SKU.
2. **Múltiples fuentes, matching pesado, conteo de perfil estable:** el SKU por perfil neutraliza el riesgo del multiplicador.
3. **Contrato ya incluye Agentforce o Slack:** Flex Credits evita un silo de crédito duplicado entre productos.

> Precio simplificado no es sinónimo de presupuesto bajo control —el multiplicador de operación sigue siendo la variable que decide el costo real.

## La reforma resolvió el precio de entrada, no el riesgo de presupuesto

La queja que motivó la reforma era real —cuatro créditos segmentados, precio base alto e ingesta cobrada dos veces por el mismo dato eran fricción genuina, y Salesforce abordó las tres. Pero quien lee "pricing simplificado" como "presupuesto bajo control" va a repetir el error que cometía antes: asumir el escenario más barato de consumo y descubrir el multiplicador de identidad a mitad de trimestre.

El trabajo que le queda al cliente es el mismo de siempre —mapear el propio patrón de consumo antes de elegir modelo, no después. Quien hace esa cuenta con el multiplicador de operación en mano entra al resto de 2026 con presupuesto de Data Cloud calibrado. Quien firma por la tabla de precio simplificada sin correr su propio escenario descubre la regla real en la factura del segundo trimestre —igual que descubría antes de la reforma, solo que ahora en un pool único.

## Preguntas que siempre vuelven

Para cerrar, las tres dudas más comunes sobre el nuevo pricing de Data Cloud.

## ¿Qué cambió en el pricing de Data Cloud en 2026?

El 2 de marzo de 2026, Salesforce consolidó cuatro tipos de crédito segmentado (divididos entre sandbox y producción) en un pool único y fungible —los Data Services Credits— y lanzó un SKU fijo por perfil (US$ 240 a US$ 420 por mil perfiles al año) como alternativa al consumo variable. La ingesta de dato nativo de Sales Cloud, Service Cloud, Marketing Cloud y Commerce dejó de consumir crédito. La reforma acompaña el rebranding de Data Cloud a Data 360, ocurrido en octubre de 2025.

## ¿Crédito consolidado o SKU por perfil —cuál elegir?

Depende del patrón de consumo, no del precio de entrada. El consumo por crédito favorece una operación con pocas fuentes de dato y matching liviano, porque el multiplicador de resolución de identidad (hasta 100.000 créditos por millón de filas, contra 2 créditos en una consulta simple) no pesa en la cuenta. El SKU por perfil favorece una operación con matching pesado y conteo de perfil estable —el precio fijo neutraliza el riesgo del multiplicador variable. Una empresa que ya usa Agentforce o Slack en el mismo contrato gana además con Flex Credits, el pool fungible entre productos.

## ¿La ingesta de dato de la propia Salesforce sigue consumiendo crédito en Data Cloud?

No, desde la reforma de marzo de 2026. El dato estructurado que viene de conectores nativos —Sales Cloud, Service Cloud, Marketing Cloud Engagement, Marketing Cloud Personalization y Commerce— entra a Data 360 sin costo de crédito. Es respuesta directa a la queja más repetida del modelo anterior: el cliente pagaba de nuevo por un dato que ya había generado (y pagado para generar) dentro de la propia plataforma. El dato de fuente externa o de terceros sigue consumiendo crédito normalmente.
