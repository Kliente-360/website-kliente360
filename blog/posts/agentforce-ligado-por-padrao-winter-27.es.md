---
title: "Agentforce activado por defecto: lo que el admin decide en Winter '27"
slug: "agentforce-ligado-por-padrao-winter-27"
pillar: "sf"
date: "2026-10-06"
readMinutes: 7
excerpt: "Winter '27 activa Agentforce por sí solo en las ediciones elegibles. Ningún agente corre, pero quién puede construir uno pasa a ser decisión tuya."
tldr: "La autohabilitación de Agentforce es el cambio de Winter '27 en el que Salesforce activa por defecto su plataforma de agentes en las ediciones Enterprise, Performance, Unlimited y Agentforce 1, sin acción del administrador y sin costo adicional. Activar la plataforma no pone ningún agente en operación ni genera consumo: lo que cambia es que quien tenga el permiso Manage AI Agents pasa a poder construir agentes sobre los datos de la org. Lo que le queda al admin es una decisión de gobierno — quién construye, sobre qué datos y con qué dueño — y debe tomarse antes de la ventana de actualización, no después."
keywords: ["Agentforce Winter '27", "autohabilitación Agentforce", "Manage AI Agents", "gobierno Salesforce", "release Salesforce", "Agentforce admin"]
---

**Agentforce** dejó de ser algo que el administrador activa. En el release Winter '27, Salesforce habilita por sí sola la plataforma de agentes en las orgs elegibles, y el interruptor correspondiente sale de Setup. Para quien administra una org Enterprise, Performance, Unlimited o Agentforce 1, la pregunta ya no es "¿vamos a adoptarlo?" sino "¿quién puede construir un agente a partir de ahora?".

El tema ha generado más ruido del que merece el cambio, en ambos sentidos. Hay quien lo trata como el inicio de una IA sin control en la org, y hay quien dice que no cambia nada. Ninguna de las dos lecturas es correcta. El cambio es pequeño en lo técnico y grande en gobierno, porque elimina el último punto en el que alguien tenía que decidir a propósito.

## Qué activa la autohabilitación — y qué deja apagado

Salesforce viene aplicando el cambio de forma gradual desde comienzos de septiembre de 2026, con las olas de producción de Winter '27 llegando hasta mediados de octubre. La fecha de tu org está en la pestaña de mantenimiento de Salesforce Trust, no en una lista pública. Según la cobertura de [Salesforce Ben](https://www.salesforceben.com/salesforce-to-auto-enable-agentforce-in-winter-27-what-that-means-for-you/) y de partners que probaron el preview, lo que ocurre y lo que no ocurre está bien delimitado:

1. **Activa:** la plataforma Agentforce queda disponible, y Agentforce Builder se abre para quien ya tiene permiso de construcción, en orgs donde la IA generativa de Einstein ya estaba activa.
2. **No activa ningún agente:** cada agente sigue inactivo hasta que alguien lo construye y lo activa. Ningún agente empieza a responder a clientes por su cuenta.
3. **No activa canales:** nada se publica en chat, WhatsApp ni correo por causa del cambio.
4. **No altera permisos de usuario ni facturación:** Salesforce afirma que la habilitación no tiene costo adicional. El consumo empieza cuando un agente efectivamente ejecuta trabajo.

Todo eso es cierto y tranquilizador. Lo que la lista no dice es que el cuello de botella de adopción cambia de lugar. Antes, "nunca lo activamos" funcionaba como política informal de gobierno. Ahora esa política deja de existir sin que nadie la haya revocado.

> Cuando la plataforma llega activada por defecto, la ausencia de decisión se vuelve una decisión — tomada por Salesforce, no por ti.

## Dónde vive ahora la decisión

Con el interruptor fuera del camino, el control real se distribuye en tres capas, y es allí donde un administrador debe mirar:

**El interruptor maestro.** La configuración de Einstein, en su página de Setup, sigue desactivando toda la plataforma. Para la mayoría de las empresas apagar todo no es la respuesta correcta, pero conviene saber que la salida existe y es deliberada.

**El permiso Manage AI Agents.** Define quién, además de los administradores, puede construir agentes. Es la capa más importante y la más descuidada: en muchas orgs, permisos creados en ciclos anteriores se distribuyeron por perfil sin revisión. Quien lo tiene puede armar un agente que lee y actúa sobre los datos que ese usuario ve.

**La activación, agente por agente.** Ningún agente funciona sin ser activado, y ahí ocurre el gobierno de verdad, porque cada activación es un evento que puede exigir aprobación, dueño y criterio de aceptación.

Hay un cuarto punto fácil de olvidar: el agente predeterminado que acompaña a la plataforma. Conviene abrirlo y revisar su estado antes de la ventana, en vez de descubrirlo después.

## La lista de seis ítems para antes de la ventana de actualización

Consultoras y partners publicaron checklists parecidos en las últimas semanas. La versión que usamos con clientes cabe en seis pasos, en el orden en que suelen rendir más:

1. **Averigua la fecha real de tu org** en Salesforce Trust y trátala como plazo de gobierno, no de TI.
2. **Revisa quién tiene Manage AI Agents** y reduce la lista a quienes aceptarías ver construyendo un agente en producción. Si hoy nadie tiene ese perfil, la respuesta es una sola persona nombrada, no "el equipo de admins".
3. **Define tu posición por escrito:** "lo activamos y lo controlamos con el permiso" o "lo mantenemos apagado hasta que exista un primer caso de uso". Ambas son defendibles; la indefinición no.
4. **Reabre la seguridad a nivel de campo** de los campos sensibles. Un agente hereda el acceso de quien lo construye y del contexto en que corre, así que un campo de documento de identidad o de margen que "nadie miraba" pasa a tener un lector automático.
5. **Prueba en el sandbox de preview** lo que cambió, incluidas las otras actualizaciones obligatorias del release que nada tienen que ver con IA, como la nueva exigencia de permiso para la autenticación vía SOAP en usuarios de integración.
6. **Elige el primer caso de uso con dueño nombrado** antes de que alguien elija por su cuenta. Un agente sin dueño es el punto de partida de lo que describimos en [dueño del agente](/blog/es/dono-do-agente-cargo-2026.html).

## El costo que el cambio no muestra

La afirmación de que activarlo no cuesta nada es correcta e incompleta. Habilitar no genera consumo, pero el consumo de Agentforce existe y la cuenta crece con el uso, no con la licencia. Las empresas que ya tienen [Salesforce Foundations y acceso gratuito a parte de Agentforce](/blog/es/salesforce-foundations-o-que-cobre-de-verdade.html) saben con qué rapidez desaparece el crédito inicial, y la [variedad de modelos de precio de Agentforce](/blog/es/agentforce-pricing-seis-modelos.html) dificulta prever el gasto de un agente que nadie planificó.

El riesgo concreto de la autohabilitación no es la factura de octubre. Es un administrador entusiasta, o un partner de implementación con acceso, construyendo un agente de prueba que queda activo, consumiendo crédito y leyendo datos, sin que presupuesto o seguridad hayan sido consultados. Por el mismo motivo, conviene monitorear el consumo de créditos de IA desde el primer mes, aunque la expectativa sea cero.

## Una buena decisión no necesita ser rápida, necesita ser consciente

Nada de esto pide pánico, y nada pide ignorarlo. En empresas medianas, lo que funciona es tratar Winter '27 como un plazo para una conversación corta y específica entre TI, seguridad y el área dueña del proceso, y salir de ella con tres respuestas: quién construye, sobre qué datos y quién responde por el resultado. Una hora de reunión y una revisión de permisos evitan la mayor parte de los problemas que el cambio podría traer.

## Preguntas que siempre vuelven

Las dudas más comunes de quienes se preparan para la autohabilitación de Agentforce.

## ¿Se cobrará Agentforce solo porque se activó automáticamente?

No. Salesforce afirma que la autohabilitación no tiene costo adicional y no altera los acuerdos de facturación existentes. El consumo empieza cuando un agente se construye, se activa y ejecuta trabajo, como resolver un caso o calificar un lead. Por eso el punto de atención no es la habilitación en sí, sino quién puede activar un agente y si alguien está siguiendo el consumo de créditos.

## ¿Se puede desactivar Agentforce después de la autohabilitación?

Sí. La configuración de Einstein, en su página de Setup, sigue funcionando como interruptor maestro y desactiva toda la plataforma. En general es más útil mantener la plataforma activa y restringir el permiso Manage AI Agents, que controla quién puede construir agentes, pero la opción de apagar existe y puede ser la elección correcta mientras la empresa define su política.

## ¿Tengo que hacer algo antes de la ventana de actualización de Winter '27?

Sí, y poco: confirmar la fecha de tu org en Salesforce Trust, revisar quién tiene el permiso Manage AI Agents, comprobar la seguridad a nivel de campo de los datos sensibles y probar el release en el sandbox de preview. Ninguno de estos pasos exige un proyecto, pero todos son más baratos antes de la ventana que después de que alguien ya construyó el primer agente.
