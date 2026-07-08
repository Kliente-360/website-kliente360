---
title: "Integración Salesforce ↔ ERP: los proyectos se traban en el contrato, no en la arquitectura"
slug: "integracao-salesforce-erp"
pillar: "sf"
date: "2026-03-17"
readMinutes: 6
excerpt: "Casi toda integración Salesforce-ERP que se atrasa, se atrasó en el acuerdo de quién responde por el dato — no en lo técnico. El fracaso es organizacional, vestido de arquitectura."
tldr: "La integración Salesforce ↔ ERP rara vez se traba en ingeniería. Se traba en la zona gris de ownership: quién es dueño del cliente, del pedido, del stock, de la regla de cálculo. Sin eso definido antes, cualquier arquitectura (MuleSoft, middleware, native) entrega el mismo atraso. Cinco preguntas que destraban."
keywords: ["Salesforce", "ERP", "integración", "MuleSoft", "middleware"]
---

La reunión de status de toda integración Salesforce-ERP atrasada tiene la misma forma: el equipo técnico presenta arquitectura, la dirección pregunta "¿por qué está atrasado?", el equipo muestra mapa de campos y parece complejo. La explicación implícita es "es difícil técnicamente". En el 90% de los casos, es mentira amable. El atraso real viene de otro lugar — y hasta que ese lugar sea nombrado, la integración no va a entregar, cualquiera sea la herramienta elegida.

Este texto va sobre por qué los proyectos de integración Salesforce-ERP se traban, y la regla honesta para destrabar — que tiene más que ver con gobernanza organizacional que con arquitectura técnica.

## El verdadero motivo del atraso

En casi toda integración Salesforce-ERP que veo arrastrándose, el problema está en un conjunto chico y específico de zonas grises:

- **¿Quién es dueño del cadastro de cliente?** Salesforce dice que el cliente nace en la venta; el ERP dice que nace en facturación. ¿Quién manda en dirección, mail, status fiscal? Sin respuesta, la sincronización se vuelve disputa.
- **¿Quién decide el precio final?** Sales Cloud tiene pricebook; el ERP tiene cadastro de precio; CPQ tiene regla propia. Cuando los tres discrepan, ¿cuál gana?
- **¿Quién es dueño del pedido?** Sales cierra la oportunidad; el ERP emite la factura. ¿Hasta cuándo el pedido queda en Salesforce? ¿Y después?
- **¿Cómo tratar el dato conflictivo?** Cliente Joao Silva en Salesforce, JOAO SILVA en el ERP, João Silva en otro lugar. ¿Quién es la verdad?
- **¿Quién responde cuando la integración se rompe?** ¿Equipo de Salesforce, equipo de ERP o equipo de integración? Sin dueño nominal, se vuelve ping-pong.

Esas cinco preguntas, en casi todo proyecto, quedan en un "después alineamos" — y el "después" se vuelve la frontera que atrasa todo lo demás. El ingeniero puede construir API perfecta, el middleware puede correr sin error, el mapping puede estar 100% correcto. Si esas preguntas no se respondieron antes, el proyecto se traba en decisión pendiente — no en código.

> La arquitectura técnica de integración Salesforce-ERP es el quinto problema. Los cuatro primeros son quién decide qué — y eso no se resuelve en el Sprint Planning.

## Por qué se vuelve trampa repetida

Hay tres razones por las que el problema persiste en casi todo cliente.

**El equipo técnico no tiene mandato organizacional.** El ingeniero de Salesforce y el ingeniero de ERP rara vez tienen autoridad para decidir gobernanza de dato entre áreas. Intentan, fallan, se vuelven mediadores. Sin sponsor con autoridad cross-funcional, la decisión no ocurre.

**La pregunta "quién es dueño" es política.** El cadastro de cliente es poder. El área de venta quiere ser dueña; el área financiera quiere ser dueña; CX quiere ser dueño. La discusión técnica esconde la discusión política. El equipo va a fingir que es "definición de master" cuando en realidad es negociación de poder.

**Discovery insuficiente se vuelve hecho consumado.** [Como en cualquier rollout Salesforce serio](/blog/es/mapear-processos-antes-do-salesforce.html), saltearse el discovery es la fuente número uno de problema. En integración, eso se manifiesta como "empezamos a construir y descubrimos las decisiones pendientes al testear".

## Las cinco preguntas que hay que responder antes

La regla que aplicamos en todo kickoff de integración Salesforce-ERP, y que destraba el 80% de los casos.

1. **¿Quién es el sistema de registro para cliente?** No "ambos" — uno. El otro se vuelve reflejo. Decisión ejecutiva, con autoridad para valer en todas las áreas.
2. **¿Quién es el sistema de registro para pedido?** Misma regla. Sales en Salesforce hasta X; después ERP. X necesita estar definido con criterio claro (status, aprobación, evento).
3. **¿Quién decide precio final, y cuál es la regla de override?** Pricebook de Salesforce, tabla del ERP, [CPQ entregando propuesta real y no solo cotización](/blog/es/cpq-saas-b2b.html), excepción manual. Jerarquía explícita, sin ambigüedad.
4. **¿Cuál es la frecuencia aceptable de sincronización por entidad?** ¿Cliente en tiempo real? ¿Pedido cada 15 min? ¿Stock cada hora? Criterio: lo que el caso de uso de negocio exige, no lo que la herramienta puede.
5. **¿Quién es el dueño operativo de la integración en producción?** Cuando se rompe, ¿quién investiga primero? Nombre en el flujo, no "el equipo de integración". Sin eso, el MTTR explota en el primer incidente.

Quien responde las cinco antes de que empiece el sprint entrega en plazo. Quien responde durante la construcción se atrasa 2–4 meses. Quien responde después del go-live entra al proyecto vivo eterno.

## Sobre arquitectura — solo después de las cinco preguntas

Después de las cinco respondidas, la discusión de arquitectura técnica se vuelve trivial. Tres patrones cubren el 90% de los casos:

**Integración native (MuleSoft Anypoint, Salesforce Connect, Data Cloud).** Vale cuando la empresa ya está invertida en el ecosistema Salesforce. Costo más alto de licencia, más bajo de implementación. [Data Cloud en 2026 absorbe parte de lo que MuleSoft hacía](/blog/es/data-cloud-nervo-central.html), simplificando arquitectura.

**Middleware genérico (Boomi, Workato, Tray).** Vale cuando la integración necesita servir múltiples sistemas además del par Salesforce-ERP. Stack agnóstica, costo recurrente, mantenimiento compartido.

**Integración custom (Lambda, API Gateway, mensajería).** Vale cuando el volumen es altísimo, la latencia crítica, o exige lógica que la herramienta estándar no cubre. Costo de implementación alto, mantenimiento continuo, pero control total.

La elección entre los tres depende más del contexto operativo (skills del equipo, ecosistema existente, volumen) que del feature comparison. Ese debate técnico solo tiene sentido después de las cinco preguntas resueltas.

## La señal de que la integración va a fallar

Antes de empezar a construir, tres señales casi garantizan el atraso:

**Señal 1: el sponsor no tiene autoridad cross-funcional.** Director de ventas patrocinando integración que afecta a financiero = se va a trabar. Director de TI patrocinando = se va a volver proyecto técnico sin decisión de negocio. Ideal: sponsor con peso en ventas + ops + finanzas.

**Señal 2: el discovery entra en dos semanas.** Discovery serio de integración Salesforce-ERP en empresa de tamaño medio exige 4–6 semanas. Quien cotiza dos va a entregar superficial y descubrir el resto costando 10× más durante la implementación.

**Señal 3: nadie escribió las cinco preguntas de arriba.** Si en el sprint planning el equipo no tiene respuesta documentada para esas cinco, cualquier estimación es palpito. Se va a atrasar — solo no se puede decir cuántas semanas.

## La decisión para 2026

Si tu empresa está por empezar una integración Salesforce-ERP, tres movimientos antes de la arquitectura:

**Sponsor con autoridad real.** Director con peso para atravesar áreas. Sin eso, parar y resolver el sponsor antes del proyecto.

**Discovery dedicado de 4–6 semanas enfocado en las cinco preguntas.** No en la arquitectura. No en el mapa de campos. En las decisiones de gobernanza que van a atravesar todas las elecciones técnicas.

**Decisión arquitectónica solo después.** Native, middleware, custom — elegir con base en el contexto, no en la moda. Volumen, skills, ecosistema, tolerancia a latencia. Cada uno pesa distinto en empresa distinta.

Integración Salesforce-ERP bien implementada es una de las piezas más valiosas de arquitectura empresarial moderna — destraba previsibilidad comercial, contable y operativa. Mal implementada, es la integración que se vuelve proyecto vivo por dos años. La diferencia rara vez está en el MuleSoft elegido. Está en quién fue dueño de qué desde el día 1.

## Preguntas que siempre vuelven

Para cerrar, las tres dudas que más aparecen cuando este tema entra en la mesa.

## ¿MuleSoft, middleware o integración custom: cuál elegir para conectar Salesforce con el ERP?

Depende del contexto operativo, no del feature comparison — y tres patrones cubren el 90% de los casos. Native (MuleSoft Anypoint, Salesforce Connect, Data Cloud) vale cuando la empresa ya está invertida en el ecosistema Salesforce: licencia más cara, implementación más barata. Middleware genérico (Boomi, Workato, Tray) vale cuando la integración necesita servir varios sistemas además del par Salesforce-ERP. Custom (Lambda, API Gateway, mensajería) vale para volumen altísimo, latencia crítica o lógica que la herramienta estándar no cubre — control total, mantenimiento continuo.

Lo que pesa en la elección son los skills del equipo, el ecosistema existente y el volumen. Y el debate solo tiene sentido después de resolver las cinco preguntas de gobernanza — antes de eso, cualquier arquitectura entrega el mismo atraso.

## ¿Cuánto lleva el discovery de una integración Salesforce-ERP?

Para una empresa de tamaño medio, un discovery serio exige 4–6 semanas — dedicado a las cinco preguntas de gobernanza (quién es dueño del cliente, del pedido, del precio, frecuencia de sync, dueño operativo), no a la arquitectura ni al mapa de campos. Quien cotiza dos semanas entrega superficial y descubre el resto durante la implementación, costando 10× más.

La cuenta del otro lado también es conocida: el equipo que responde las cinco preguntas antes del sprint entrega en plazo; quien responde durante la construcción se atrasa 2–4 meses; quien responde después del go-live entra al proyecto vivo eterno.

## ¿Cómo sabés antes de empezar si la integración se va a atrasar?

Tres señales casi garantizan el atraso. Primera: sponsor sin autoridad cross-funcional — director de ventas patrocinando algo que afecta a financiero se traba, y director de TI lo vuelve proyecto técnico sin decisión de negocio. Segunda: discovery cotizado en dos semanas. Tercera: nadie escribió las cinco preguntas de gobernanza — si en el sprint planning no hay respuesta documentada, cualquier estimación es palpito.

Si aparece cualquiera de las tres, el movimiento correcto es parar y resolver antes de la arquitectura. Lo ideal: sponsor con peso en ventas + ops + finanzas, y las decisiones de ownership documentadas desde el día 1.
