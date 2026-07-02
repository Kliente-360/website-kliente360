---
title: "Customer 360 vs CDP: diferencias que cambian el roadmap de datos"
slug: "customer-360-vs-cdp"
pillar: "sf"
date: "2026-02-04"
readMinutes: 6
excerpt: "La empresa compra uno, descubre que necesita el otro. Cuándo Customer 360 reemplaza al CDP, cuándo lo complementa, y cuándo los dos se volvieron el mismo lugar."
tldr: "Customer 360 y CDP nacieron de problemas distintos — visión unificada de cliente vs. activación para marketing. En 2026, Salesforce unió los dos bajo Data Cloud, y el mercado quedó confundido. Qué es decisión de roadmap real, qué es detalle de vendor, y cómo no comprar dos veces la misma cosa."
keywords: ["Customer 360", "CDP", "Data Cloud", "Salesforce", "roadmap de datos"]
---

La pregunta que vuelve cada quarter en empresa de tamaño medio: "¿necesitamos CDP, o el Customer 360 de Salesforce ya resuelve?". La pregunta es justa, y la mayoría de las respuestas que circulan son vendor-driven — vienen de la consultora que vende uno u otro. La respuesta honesta exige separar tres cosas que se volvieron casi sinónimos en el marketing de los últimos cinco años: visión unificada de cliente, plataforma de datos de marketing, y capa operacional de contexto. Son tres problemas distintos que suelen empaquetarse bajo el mismo nombre.

Este texto desempaqueta los tres, muestra dónde rinde cada uno, y dónde Salesforce cambió el juego al consolidarlos bajo Data Cloud en 2026.

## El problema original de Customer 360

Customer 360, como concepto, nació de un problema simple: la misma persona es cliente en dos sistemas (Sales Cloud y Service Cloud, por ejemplo) y los dos sistemas no lo saben. El vendedor abre la cuenta y ve historial de venta. El atendente abre la cuenta y ve historial de caso. Ninguno de los dos ve el otro lado.

La solución es estructural: identificar que es la misma entidad, exponer el historial unificado, y dejarlo disponible donde trabaja cada operador. Customer 360 es la visión. Implementarla puede involucrar varias cosas — federación de identidad, replicación selectiva, query en runtime, indexación. Por años fue un proyecto de integración a medida en cada empresa.

El punto: Customer 360 es un *objetivo* (cliente único, en todos los sistemas), no un producto. Cuando Salesforce empezó a usar "Customer 360" como nombre de plataforma, generó confusión — se volvió simultáneamente concepto y SKU.

## El problema original del CDP

El CDP (Customer Data Platform) tiene otro nacimiento. Vino del marketing, allá por 2015–2018, para resolver un dolor específico: activar campañas multi-canal con segmentación basada en comportamiento. Marketing tenía dato caliente en herramienta de e-mail, dato de navegación en web analytics, dato de venta en CRM, dato de impresión en DSP. Ninguna de esas piezas hablaba a la velocidad que la campaña necesitaba.

Los CDP juntaron esos datos, normalizaron identidad, y expusieron APIs de segmentación. Casos de uso clásicos: carrito abandonado, look-alike, retargeting basado en etapa del funnel, jornada cross-channel. CDPs como Segment, mParticle, Tealium ganaron mercado en esa frontera.

El punto: el CDP nació *operativo para marketing*, no para atención ni para venta. El foco es activación rápida con latencia baja, y el cliente final del dato es una herramienta de campaña — no un reporte.

## Dónde los dos chocaron

En 2020–2023, la frontera empezó a borrarse. Los CDPs se volvieron "Customer Data Platform" para todas las áreas, no solo marketing. Customer 360 ganó herramientas de activación. Salesforce lanzó Customer 360 Data Manager, después CDP, después lo renombró a Data Cloud, y en 2025 consolidó todo bajo la misma marca. Adobe, Oracle, SAP hicieron movimientos similares. El mercado se volvió sopa.

En 2026, la frontera útil para la decisión ya no es "CDP vs Customer 360". Es:

- **Capa de identidad y perfil unificado** (el problema que Customer 360 resolvió primero)
- **Capa de activación operacional** (el problema que CDP resolvió primero)
- **Capa de contexto para agentes y aplicaciones** (el problema que Data Cloud está resolviendo ahora)

La empresa que decide pensando "CDP o no CDP" está en una pregunta de 2020. La decisión de 2026 es cuál de esas tres capas necesitás primero — y cómo se conectan. [CRM, dato e IA funcionan como un engranaje](/blog/es/crm-dados-ia-engrenagem.html), no como proyectos aislados — cada capa realimenta la siguiente.

> En 2026, "Customer 360 vs CDP" se volvió pregunta de marketing de vendor. La pregunta de roadmap real es qué capa de dato de cliente necesita tu operación primero.

## La consolidación bajo Data Cloud

Salesforce hizo un movimiento explícito: trató a Customer 360 y CDP como dos lados del mismo problema y los unió bajo Data Cloud. [Ya no es CDP — es el nervio central de Salesforce](/blog/es/data-cloud-nervo-central.html). Para una empresa ya invertida en Salesforce, eso cambia la cuenta. Antes, la elección era "¿compro [CDP de Segment](/blog/es/customer-data-platform-commodity.html) o armo Customer 360 con integración?". Hoy, si ya pagás Sales, Service y Marketing Cloud, Data Cloud entrega las tres capas como parte de la plataforma — sin integración custom.

La consecuencia práctica: empresas que iban a comprar CDP externo en 2024–2025 y que ya son clientes Salesforce tienen que reevaluar. La cuenta no es "Data Cloud es mejor que Segment" (en features brutos, depende del caso). Es: "considerando que voy a pagar la integración con Sales/Service Cloud de cualquier forma, ¿cuál es el TCO real?". Suele inclinar la balanza hacia Data Cloud cuando el ecosistema ya es Salesforce.

Para quien *no* es Salesforce-first — empresa que usa HubSpot, o customizó CRM propio — la ecuación cambia. Ahí CDP externo sigue teniendo sentido, o Customer 360 se vuelve proyecto de integración igual.

## Qué decidir antes de cualquier compra

La regla que funciona para empresas evaluando esas decisiones:

1. **¿Cuál es el caso de uso primario?** ¿Activación de marketing? ¿Visión unificada para atención? ¿Contexto para agente de IA? Cada uno tiene peso distinto en cada plataforma — y ninguno tiene puntaje máximo en todas.
2. **¿Qué stack ya existe?** Empresa Salesforce-first gana con Data Cloud por integración. Empresa multi-stack gana con CDP independiente. Empresa en transición necesita calcular TCO honestamente — no el folleto.
3. **¿Cuál es el roadmap de IA?** Si la próxima frontera es Agentforce o agente propio, [la capa de contexto se vuelve crítica](/blog/es/quando-agente-e-resposta.html) — y Data Cloud está diseñado para eso. Los CDPs tradicionales no lo estaban, y están corriendo atrás.
4. **¿Quién es dueño del proyecto?** El CDP nació marketing-led; suele ser comprado y operado por el CMO. Customer 360 es cross-functional; necesita sponsor con autoridad en ventas, atención y marketing simultáneamente. El sponsor equivocado es la razón #1 de proyectos trabados.
5. **¿Qué nivel de unificación de identidad hace falta?** Marketing tolera matching probabilístico ("probablemente es la misma persona"). Atención y venta exigen matching determinístico ("esta persona es el cliente X"). Si necesitás el segundo, [la identidad se vuelve proyecto separado, independiente de la plataforma](/blog/es/mapear-processos-antes-do-salesforce.html).

Quien responde las cinco con claridad tiene decisión. Quien responde "depende" en tres o más todavía no tiene caso de uso definido — y cualquier plataforma se va a volver proyecto eterno.

## El movimiento honesto para 2026

Si estás trabado en esta decisión hoy, tres movimientos prácticos antes de cualquier firma de contrato:

**Mapear caso de uso por caso de uso.** No "queremos CDP". Sino "queremos correr segmentación de carrito abandonado con latencia de 1h", "queremos visión unificada en Service Cloud con historial de marketing visible", "queremos agente que sepa contexto del cliente sin ETL nocturno". Cada uno de esos tiene peso distinto en cada plataforma.

**Pilotar con volumen real, no con demo.** La demo de CDP y la demo de Data Cloud son igualmente impresionantes. Pilotear con 1–2 casos de uso reales, 30–60 días, mide lo que el folleto no mide — performance en tu volumen, complejidad de operación, costo real.

**Decidir con cabeza de TCO de 3 años.** Costo de licencia + costo de integración + costo de operación + costo de migración. Esa cuenta suele cambiar la decisión en 30–40% de las empresas que la hacen antes de la compra.

La capa de cliente unificado es una de las piezas más importantes del stack moderno. Pero es pieza — no estrategia. Comprar plataforma sin el resto del roadmap claro es la forma más cara de empujar la decisión hacia adelante sin resolverla.
