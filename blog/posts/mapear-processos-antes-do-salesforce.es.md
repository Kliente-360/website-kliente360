---
title: "Mapear procesos antes de Salesforce: el checklist que ahorra meses"
slug: "mapear-processos-antes-do-salesforce"
pillar: "sf"
date: "2026-01-06"
readMinutes: 6
excerpt: "Implementar Salesforce sin mapear el proceso es pagar dos veces: una a la consultora y otra en retrabajo. El checklist que separa un rollout caro de uno que rinde."
tldr: "La mayoría de los proyectos de Salesforce se traban en el mes 4 — no por un bug, sino por un proceso que nadie escribió. Mapear antes de configurar es el trabajo más barato de todo el proyecto. Siete preguntas, tres artefactos, una regla para saber cuándo se puede empezar a tocar el Setup."
keywords: ["Salesforce", "implementación Salesforce", "mapeo de procesos", "discovery", "CRM"]
---

La pregunta que define si un proyecto de Salesforce va a cumplir plazo no es "cuántas licencias vamos a comprar". Es "quién diseñó el proceso que esas licencias van a automatizar". En siete de cada diez kickoffs que llegan acá ya atrasados, el diagnóstico es el mismo: empezaron a configurar antes de entender. En algún momento alguien abrió el Setup con la sensación de que mapear era *paja* — y tres meses después el equipo entero paga ese apuro en retrabajo.

Este texto es el checklist que usamos antes de tocar cualquier org. No es metodología propietaria, no es framework con nombre. Es el mínimo de discovery que separa un rollout que rinde de uno que se convierte en "proyecto vivo" durante los próximos dos años.

## Por qué el proceso suele estar implícito

En casi toda empresa de tamaño medio, el proceso de venta, atención o post-venta **vive en la cabeza de tres personas**. Un vendedor sénior sabe cuándo dar descuento, el gerente sabe cuándo aprobar excepción, el equipo de operaciones sabe qué lead es "basura" sin necesidad de abrirlo. Nada de eso está escrito en ningún lado — funciona porque esas tres personas llevan años en la misma sala (o en el mismo WhatsApp).

Salesforce no tiene cabeza. Tiene objeto, campo, regla de validación, flow. Para que decida, alguien tiene que escribir la decisión. Y ahí es donde el proyecto se traba: no en lo técnico, sino en lo *no escrito*. El consultor pregunta "¿cuándo el lead se vuelve oportunidad?" y recibe tres respuestas distintas. Cada una se vuelve un camino en el flow. El flow se vuelve laberinto. El usuario abandona.

> Salesforce no automatiza el proceso: automatiza la versión escrita del proceso. Si la versión escrita no existe, el proyecto está inventando proceso, no implementando CRM.

La diferencia entre un proyecto barato y uno caro vive justamente acá. Mapear antes cuesta dos a cuatro semanas. Mapear después — cuando el usuario ya se quejó, el sponsor ya cobró, el consultor ya configuró — cuesta tres a seis meses.

## Siete preguntas antes de abrir el Setup

La regla que aplicamos en todo kickoff. Si la respuesta a tres o más es "no lo tenemos documentado", **paramos** — discovery se vuelve sprint dedicada antes de cualquier configuración.

1. **¿Cuál es el camino feliz, en pasos numerados?** El lead llega, califica, se vuelve oportunidad, cierra, se vuelve cuenta. Escribí los pasos. No los subprocesos — los pasos. Si pasa de 12, estás describiendo dos procesos mezclados.
2. **¿Cuáles son los tres caminos no felices más comunes?** Lead reclama, oportunidad se traba en aprobación, cuenta vuelve a renegociación. Esos caminos cubren 60–70% del volumen real. Si nadie sabe cuáles son, nadie miró el histórico.
3. **¿Quién decide qué, en cada paso?** Quién aprueba descuento por encima de X. Quién reabre oportunidad cerrada-perdida. Quién cambia el owner de una cuenta estratégica. Cargo, no nombre.
4. **¿Cuál es el SLA real (no el prometido) en cada etapa?** Tiempo medio que un lead pasa en Calificación hoy. Tiempo medio de aprobación de propuesta. Si nadie lo mide, Salesforce va a exponerlo en el primer mes — generalmente en reunión de board.
5. **¿Qué dato tiene que estar cargado para que un registro avance?** No todo campo importa en toda etapa. Pero al menos 3–5 campos por etapa son obligatorios para que el proceso tenga sentido. ¿Cuáles?
6. **¿Qué sistemas alimentan o consumen ese proceso?** ERP, billing, marketing automation, la planilla del área financiera. La integración mal mapeada es la causa #1 de atraso en el go-live. En arquitecturas Salesforce modernas, [Data Cloud entra como capa de contexto que unifica parte de esos sistemas](/blog/es/data-cloud-nervo-central.html) — pero solo funciona si el proceso por debajo está diseñado.
7. **¿Quién va a usar esto en el día a día, y qué hace esa persona en 5 minutos?** El proceso tiene que caber en el flujo real del usuario, no en el ideal del consultor. Si la vendedora abre Salesforce 20 veces por día, cada pantalla tiene que servir a esos 20 momentos — no a las 20 etapas.

Quien responde las siete sin dudar está listo para configurar. Quien duda en tres o más sigue en discovery, aunque el cronograma diga lo contrario — y tiende a caer en [uno de los cinco antipatrones clásicos de Sales Cloud](/blog/es/sales-cloud-cinco-antipadroes.html) en la fase siguiente.

## Los tres artefactos que vale la pena producir

Discovery no tiene que volverse un libro. Tres artefactos resuelven el 90% de lo que el equipo de configuración va a necesitar.

**Mapa de proceso en una página.** Diagrama lineal (no flujograma con mil decisiones) de las etapas del camino feliz, con SLA esperado en cada una y los tres caminos alternativos saliendo de los puntos de decisión. En una página. Si no entra, está demasiado detallado — va a convertirse en manual que nadie lee. La regla: si la vendedora sénior lo mira y reconoce su trabajo, está listo. Si dice "esto no es como funciona", el mapa todavía es fantasía.

**Matriz de campos por etapa.** Tabla simple: filas son los campos del objeto, columnas son las etapas, celdas indican *obligatorio*, *opcional*, *solo lectura* u *oculto*. Ese documento se vuelve input directo para page layouts, validation rules y reglas de transición. Es el artefacto que más tiempo ahorra en la configuración — y el más frecuentemente saltado.

**Lista de integraciones con responsable y SLA.** Cada sistema que intercambia datos con Salesforce, en qué dirección (entrada, salida, bidireccional), con qué frecuencia (real-time, cada hora, diario), quién es dueño del lado externo, y qué pasa cuando la integración se rompe. Sin esa lista, la integración se vuelve proyecto-dentro-del-proyecto y retrasa a todos.

Esos tres artefactos entran en dos a tres semanas de trabajo enfocado con 4–6 personas. Es la inversión más barata del proyecto entero, y casi siempre la primera que se recorta cuando el sponsor quiere "arrancar ya".

## La trampa del "después ajustamos"

El argumento contra mapeo serio suele ser: *"pongamos lo básico en el aire y después ajustamos con el uso real"*. En teoría, ágil. En la práctica, tres trampas se repiten:

- **Lo básico se vuelve definitivo.** El usuario aprende el flujo equivocado, el proceso se cristaliza, rehacerlo cuesta cambio de comportamiento — mucho más caro que cambio de configuración.
- **Las métricas salen distorsionadas desde el día 1.** Si la etapa "Calificación" significa cosas distintas para cada vendedor, el funnel reportado es ficción. La dirección toma decisiones sobre ficción durante seis meses.
- **La primera integración rompe la confianza.** Cuando el pedido no cuadra en el ERP porque nadie mapeó la regla de tax exemption, el equipo cuestiona el proyecto entero — no la integración específica.

El ajuste continuo es saludable. Saltar discovery no es ajuste continuo, es deuda técnica naciendo capitalizada.

## Cómo presentar el checklist al sponsor

El sponsor ejecutivo suele ver discovery como costo, no como inversión. La conversación que funciona es mostrar el trade-off en números concretos: cada semana de mapeo bien hecho evita unas cuatro a seis semanas de retrabajo post go-live. La cuenta sale positiva ya en el primer camino alternativo que el equipo evitó descubrir en producción.

Otra forma de enmarcarlo: discovery no es fase del proyecto Salesforce, es el proyecto de **definir el proceso que Salesforce va a sostener**. Si la empresa decide que no vale hacerlo, la pregunta siguiente no es "¿cómo reducimos discovery?", es "¿por qué estamos comprando licencias para un proceso que nadie quiere escribir?". Generalmente esa pregunta sola destraba el presupuesto — o abre [la conversación honesta sobre cuándo NO usar Salesforce](/blog/es/quando-nao-usar-salesforce.html), porque mapeo bien hecho a veces muestra que la herramienta correcta para ese momento es otra.

El mejor proyecto de Salesforce es el que parece aburrido en el mes 1 — porque el equipo está escribiendo, dibujando, validando — y impresiona en el mes 4, cuando el go-live ocurre sin el circo de incidentes que se volvió normal en el mercado. Discovery no es la parte glamorosa. Es la parte que hace la configuración predecible, y la predictibilidad es lo que el sponsor está comprando cuando contrata Salesforce. (Junto a eso, [estrategia de sandbox bien diseñada](/blog/es/sandbox-strategy.html) y [elección cuidadosa del partner Salesforce](/blog/es/salesforce-partner-program.html) cierran el trío que define rollout sólido.)
