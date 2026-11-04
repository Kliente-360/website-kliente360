---
title: "Dreamforce 2026: qué es GA, beta y piloto en Agentforce"
slug: "dreamforce-2026-agentforce-ga-beta-piloto"
excerpt: "Dreamforce 2026 mezcló lo que ya se compra con lo que sigue en piloto. Un filtro de cuatro etapas para separar anuncio de producto antes de presupuestar."
tldr: "Leer un anuncio de Dreamforce es clasificarlo en cuatro etapas de disponibilidad — GA, beta abierto, piloto y anunciado sin fecha — porque solo la primera se compra, se presupuesta y entra en un roadmap. En Dreamforce 2026, Agentforce Coworker ya era GA, Agent Optimizer y Slackforce tenían GA prometido para octubre, los agentes de largo horizonte estaban en piloto, el modelo Koa en piloto restringido y AIforce sin fecha. La decisión útil no es adoptar todo ni ignorar todo: es instrumentar lo que ya es GA, pilotear lo cercano y tratar el resto como dirección del proveedor."
keywords: ["Dreamforce 2026", "Agentforce GA beta piloto", "Agentforce Coworker", "Koa Salesforce", "roadmap Agentforce", "Agent Optimizer"]
---

**Dreamforce 2026** puso en un mismo escenario productos que ya se compran y productos que siguen en piloto restringido. El resumen oficial y la cobertura de prensa tratan todo con el mismo tono de lanzamiento. Para quien debe aprobar presupuesto de Agentforce en el primer trimestre, esa uniformidad es el problema: una diapositiva de keynote no dice qué ítem se puede contratar el lunes.

La diferencia entre etapas de disponibilidad define plazo, costo y riesgo. Un ítem en piloto no tiene precio público, no tiene SLA y cambia antes de llegar a GA. Un ítem en GA tiene documentación, licenciamiento y soporte. Planificar 2027 sobre el primer grupo es planificar sobre una intención.

## Las cuatro etapas que puede tener un anuncio

Todo anuncio de plataforma cae en una de cuatro etapas. Conocerlas evita la lectura más común y más cara: tomar la demostración por disponibilidad.

1. **GA (disponibilidad general).** Contratable hoy, con documentación, precio y soporte. Es la única etapa sobre la que se arma presupuesto.
2. **Beta abierto.** Cualquier cliente elegible lo activa, pero sin garantía de estabilidad, sin precio cerrado y con cambios de comportamiento entre releases. Sirve para aprender, no para operar un proceso crítico.
3. **Piloto.** Acceso por invitación, normalmente con el equipo del proveedor al lado. Los resultados mostrados en el escenario vienen de aquí. No son replicables por cualquier cliente.
4. **Anunciado sin fecha.** Dirección de producto. Útil para entender hacia dónde va la plataforma; inútil para un cronograma.

> Un anuncio de keynote no es disponibilidad. Solo lo que tiene GA, precio y documentación entra en el presupuesto del próximo trimestre.

## Qué era cada anuncio en realidad

Según el [resumen oficial de Salesforce](https://www.salesforce.com/blog/dreamforce-2026-announcements/), publicado el 28 de septiembre, el cuadro de etapas era este:

- **Agentforce Coworker:** GA. Asistente autónomo dentro de Salesforce que busca respuestas en CRM, Slack y otras fuentes conectadas.
- **Agent Optimizer:** GA prometido para octubre. Construye, prueba y refina otros agentes.
- **Slackforce:** GA prometido para octubre. La misma idea dentro de Slack.
- **Agentes de largo horizonte:** piloto, con GA prometido para noviembre. Persiguen metas de días a meses, con puntos de aprobación humana.
- **Koa:** piloto. El primer modelo de razonamiento de Salesforce para CRM, construido sobre NVIDIA Nemotron, con GA esperado solo en el invierno del hemisferio norte y, según el [análisis de Beri](https://www.beri.net/article/dreamforce-2026-agent-operations-koa-pilot-claudeforce-open-beta), solo en regiones de EE. UU.
- **Claudeforce:** beta abierto, distribuido por AppExchange.
- **AIforce:** capa de interfaz que lleva datos de Data 360 y acciones de Agentforce a otras superficies de IA. Sin fecha de GA.

Dos observaciones. Primero, las fechas de octubre ya pasaron: revisa en las release notes de tu edición si el ítem realmente llegó, porque "prometido" y "activo en tu org" son cosas distintas. Segundo, las cifras de desempeño de Koa, como la promesa de "tres veces menos errores", vienen de un benchmark de la propia Salesforce, sin metodología publicada. Es información del proveedor, no una medición independiente.

## Dónde está el valor que ya se puede usar

El patrón de Dreamforce 2026 repite el de años anteriores: las revelaciones más destacadas, Koa y AIforce, son las que menos se pueden comprar hoy. Lo que ya está disponible, y rinde más a quien tiene un agente en producción, es la capa de operación: observabilidad de sesión, trazabilidad de acciones, latencia y el Optimizer para diagnosticar fallas.

Es la parte menos vistosa y la más útil. Un agente que nadie puede inspeccionar no escala, y la [observabilidad de agentes](/blog/es/observabilidade-de-agentes.html) es el requisito previo para que cualquiera de las novedades de largo horizonte funcione: un agente que corre durante semanas sin rastro de lo que decidió es riesgo acumulándose.

La segunda razón de cautela es el costo. Con precio de lista de Flex Credits, cada crédito cuesta US$ 0,005 y una acción estándar consume 20 créditos, unos US$ 0,10. Las acciones de más de 10.000 tokens pueden contar como varias acciones, de modo que una arquitectura multiagente puede multiplicar la factura sin que cambie el número de conversaciones. Esa mecánica, y las seis formas de comprar Agentforce, están en nuestro texto sobre [los seis modelos de pricing de Agentforce](/blog/es/agentforce-pricing-seis-modelos.html).

## Cinco preguntas para cualquier anuncio de plataforma

Aplica estas preguntas a cada ítem antes de ponerlo en un roadmap. Sirven para Salesforce y para cualquier proveedor.

1. **¿Cuál es la etapa, escrita por el proveedor?** Si la página no declara GA, beta o piloto, trátalo como anunciado sin fecha.
2. **¿Hay precio publicado?** Sin precio no se puede calcular el retorno. Pregunta al ejecutivo de cuentas y registra la respuesta por escrito.
3. **¿Qué restricción de región, edición o idioma tiene?** Un GA solo en EE. UU., o solo en inglés, no es GA para una operación latinoamericana.
4. **¿El resultado mostrado es reproducible?** Un caso de cliente de piloto, con el equipo del proveedor dentro del proyecto, muestra el techo, no el promedio.
5. **¿Qué pasa con lo que ya tenemos?** Todo ítem nuevo toca algo que ya corre: automatización, permisos, datos. Evalúa el impacto antes de la ganancia.

## Cómo convertir esto en un plan

Con las etapas claras, el plan deja de ser "lo que prometió Dreamforce" y pasa a ser tres colas.

**Cola 1 — GA ahora.** Instrumenta lo que ya corre: observabilidad, trazabilidad y métricas por agente. Si la empresa sigue en el [piloto que no escala](/blog/es/piloto-agentforce-producao.html), aquí se gana tiempo.

**Cola 2 — cerca de GA.** Los agentes de largo horizonte y los ítems con fecha prometida entran como piloto interno limitado, con criterio de salida definido, y solo después de que la cola 1 esté estable.

**Cola 3 — dirección.** Koa, AIforce y lo que no tenga fecha pasan a ser tema de seguimiento trimestral, sin presupuesto. Si alguno llega a GA con precio y región compatibles, sube de cola.

El error simétrico también existe: ignorarlo todo porque una parte sigue en piloto. La plataforma se movió, y la decisión de arquitectura de hoy, como datos, permisos e integraciones, es la que definirá cuánto de lo que llegue a GA será aprovechable.

## Preguntas que siempre vuelven

Las dudas más frecuentes de quien debe decidir qué de Dreamforce 2026 entra en la planificación.

## ¿Qué es GA en Salesforce y por qué importa?

GA, de general availability, es la etapa en que un producto está disponible para todos los clientes elegibles, con documentación, precio y soporte oficiales. Importa porque solo esa etapa permite presupuestar y contratar con previsibilidad. Beta y piloto pueden cambiar de alcance, de precio y de comportamiento antes del lanzamiento.

## ¿Agentforce Coworker ya está disponible?

Según el resumen oficial de Dreamforce 2026, sí: Agentforce Coworker se presentó como GA, a diferencia de Koa, AIforce y los agentes de largo horizonte. Aun así, confirma en las release notes y en el contrato de tu edición, porque la disponibilidad puede variar por edición y región.

## ¿Vale la pena esperar el GA antes de empezar con Agentforce?

No. Esperar el GA de todo retrasa el trabajo que más importa, que es preparar datos, permisos y observabilidad. Lo que ya es GA permite empezar, y esa preparación es la misma que exigirán los ítems futuros. Esperar tiene sentido solo para decisiones que dependen de un ítem específico en piloto.
