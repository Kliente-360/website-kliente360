---
title: "Shadow AI en la empresa: por qué prohibir no funciona y qué poner en su lugar"
slug: "shadow-ai-empresa-proibir-nao-funciona"
pillar: "ai"
date: "2026-11-24"
readMinutes: 7
excerpt: "La mitad de los empleados ya usa IA no autorizada y bloquearla solo la lleva a la cuenta personal. Cómo mapear, ofrecer alternativa y proteger el dato."
tldr: "Shadow AI es el uso de herramientas de IA generativa por empleados sin aprobación ni visibilidad de la empresa, casi siempre en cuentas personales y con datos corporativos. Prohibir no elimina ese uso: migra al celular y a la cuenta personal, donde la empresa pierde todo control. Lo que reduce el riesgo es inventariar el uso real, ofrecer una alternativa corporativa igual de buena, clasificar qué datos pueden entrar en IA y solo entonces aplicar controles técnicos."
keywords: ["shadow AI", "IA no autorizada", "gobernanza de IA", "uso de IA por empleados", "LGPD", "política de uso de IA"]
---

**Shadow AI** es el nombre que el mercado le dio a algo que casi todo gerente conoce: el equipo usa ChatGPT, Gemini, Claude o alguna extensión de navegador con IA para trabajar, en cuenta personal, sin que TI sepa qué, con qué datos ni para qué. No es un desvío de unos pocos. Es la norma. Y la reacción más común de las empresas, bloquear el dominio y mandar un comunicado, es también la que menos funciona.

Los números son consistentes entre fuentes. Una [encuesta de Sapio Research para BlackFog](https://www.blackfog.com/blackfog-research-shadow-ai-threat-grows/), con 2.000 empleados de empresas de más de 500 personas en EE. UU. y Reino Unido, mostró que el 49% usa herramientas de IA no autorizadas por su empleador, el 63% considera aceptable usar IA sin supervisión de TI cuando la empresa no ofrece una opción aprobada y el 51% ya conectó herramientas de IA a otros sistemas de trabajo sin aprobación. Del lado de quien gobierna, Gartner encuestó a 302 líderes de seguridad en 2025: el 69% sospecha o tiene evidencia de que los empleados usan IA generativa pública prohibida.

## Por qué prohibir la IA en la empresa no funciona

Bloquear el acceso parece la respuesta prudente. En la práctica, cambia un riesgo visible por uno invisible. Tres razones lo explican.

**El uso migra, no desaparece.** Bloquear ChatGPT en la red corporativa no saca la herramienta del celular del empleado. El texto del contrato, la planilla de clientes o el fragmento de código siguen yendo a la IA, ahora por captura de pantalla, copia por WhatsApp o login personal en casa. La empresa pierde incluso la telemetría parcial que tenía. Datos de Harmonic Security sobre 22 millones de prompts corporativos, recopilados en una [nota de investigación de la Cloud Security Alliance](https://labs.cloudsecurityalliance.org/research/csa-research-note-shadow-ai-apps-enterprise-20260530-csa-sty/), muestran que el 73,8% del uso de ChatGPT en empresas ocurre en cuentas personales.

**La demanda es real.** El empleado no usa IA por rebeldía. La usa porque resume una reunión en dos minutos, revisa un correo en otro idioma, escribe la primera versión de una consulta SQL. Prohibir sin ofrecer alternativa es pedirle a la persona que trabaje más lento por una regla cuyo motivo nadie explicó. La va a esquivar.

**Quien más la esquiva es quien decide.** En la misma encuesta de BlackFog, el 69% de los encuestados de nivel C y presidencia dijo que la velocidad pesa más que la privacidad o la seguridad, frente al 37% en cargos administrativos. La política que aprueba la dirección es, muchas veces, la que la dirección menos sigue.

> Prohibir la IA no elimina el uso; elimina la visibilidad sobre el uso, el único control que la empresa tenía.

## El riesgo real de la shadow AI está en el dato y el acceso

El debate suele detenerse en "el empleado pegó datos de clientes en ChatGPT". Ese riesgo existe, pero es el menor de tres.

El primero es, de hecho, **dato sensible fuera del perímetro**: datos personales de clientes, información financiera no divulgada, código fuente, borradores legales. En una cuenta personal gratuita, la empresa no controla la retención, no tiene contrato con el proveedor y, según la configuración, el contenido puede usarse para entrenar el modelo. Para quien trata datos personales en Brasil, eso es tratamiento sin base legal clara y sin registro, y la [ANPD ya puso la IA como eje de fiscalización](/blog/es/anpd-fiscalizacao-ia-brasil.html) aun sin el marco legal aprobado.

El segundo es **conexión sin dueño**. Las herramientas de IA modernas piden acceso al correo, al drive, al calendario, al CRM. Cuando el 51% de los empleados ya conectó IA a sistemas de trabajo sin aprobación, existen tokens OAuth con acceso a datos corporativos emitidos por personas que no saben que eso es una decisión de seguridad. Es el mismo problema que discutimos sobre [agentes de IA que operan con login prestado en lugar de identidad propia](/blog/es/identidade-agente-ia-credencial-propria.html), solo que creado de abajo hacia arriba.

El tercero es el **costo del incidente**. El [Cost of a Data Breach 2025 de IBM](https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls), con 600 organizaciones que sufrieron una filtración, estimó US$ 670.000 adicionales en el costo medio de filtraciones en empresas con alto nivel de shadow AI. Entre las organizaciones que tuvieron un incidente con modelos o aplicaciones de IA, el 97% no tenía controles de acceso adecuados para IA.

## Cómo sacar la shadow AI a la luz

El objetivo no es llevar a cero el uso no autorizado, que es imposible. Es lograr que el camino aprobado sea más fácil que el atajo. La secuencia que aplicamos:

1. **Inventaria sin caza de brujas.** Antes de cualquier política, descubre qué está en uso: logs de proxy y DNS, extensiones de navegador, apps conectadas en Google Workspace o Microsoft 365 y, sobre todo, una encuesta interna anónima que pregunte qué usa la gente y para qué. Si el inventario viene con castigo, nadie responde con sinceridad.
2. **Ofrece una alternativa corporativa a la altura.** Una licencia empresarial de un asistente de IA, con SSO, contrato que excluya el uso de los datos para entrenamiento y retención configurable, resuelve la mayoría de los casos de uso. Si la herramienta aprobada es visiblemente peor que la gratuita, la shadow AI sigue.
3. **Clasifica el dato en tres niveles.** Lo público o interno de bajo riesgo puede entrar en cualquier herramienta aprobada. Lo confidencial (financiero, estratégico, código) solo en la herramienta corporativa. Los datos personales sensibles y los secretos regulados solo en flujos diseñados para ello, con base legal y registro. Es la misma lógica del [checklist de privacidad de datos en LLMs que falta en los pilotos](/blog/es/privacidade-dados-llms.html), aplicada al uso diario.
4. **Escribe una política de una página y comunícala.** Qué se puede, qué no, qué herramienta usar, a quién preguntar. Una política de 20 páginas en la intranet no cambia comportamientos; una página explicada por el gerente en la reunión de equipo, sí.
5. **Crea un canal de solicitudes con plazo.** Cuando alguien encuentra una herramienta nueva útil, debe existir un camino para pedir su evaluación, con respuesta en días, no en trimestres. Sin eso, el inventario envejece a la semana siguiente.
6. **Solo entonces aplica control técnico.** Con la alternativa disponible, tiene sentido bloquear el login de cuentas personales en servicios de IA en los dispositivos corporativos, aplicar DLP en el navegador y revisar periódicamente las apps OAuth conectadas. Control técnico sin alternativa es el bloqueo del inicio de este texto con otro nombre.

## Qué medir para saber si la gobernanza de IA funcionó

Una política sin métrica se vuelve documento. Cuatro números cuentan la historia:

1. **Proporción del uso en cuentas corporativas.** Cuánto del tráfico hacia servicios de IA pasa por la herramienta aprobada y no por cuentas personales. Es el indicador principal.
2. **Tiempo de respuesta a solicitudes de herramientas nuevas.** Si supera algunas semanas, el canal oficial perdió frente al atajo.
3. **Apps de IA conectadas sin dueño.** Cuántos tokens OAuth de herramientas de IA existen sin un responsable nombrado, y si ese número baja en cada revisión.
4. **Eventos de datos sensibles bloqueados.** Cuántas veces el DLP impidió que datos confidenciales fueran a la IA. Un número alto al principio indica que el control funciona; un número alto durante meses indica que falta una alternativa para esa tarea.

Una referencia práctica nuestra, estimación y no benchmark: en empresas medianas que ofrecen una alternativa corporativa con SSO y comunican la política en persona, la mayor parte del uso visible migra a la cuenta corporativa en dos o tres meses. Lo que queda es la cola de herramientas de nicho, y esa cola es justo lo que el canal de solicitudes existe para atender.

## La shadow AI es señal de demanda, no solo de riesgo

Todo inventario de shadow AI es también un mapa de dónde la gente está perdiendo tiempo. El analista que usa IA a escondidas para consolidar reportes está diciendo que ese proceso debería automatizarse. El equipo comercial que pega actas de reunión en un chatbot está pidiendo una integración que el CRM todavía no tiene.

Las empresas que tratan la shadow AI solo como incidente de seguridad gastan energía persiguiendo el uso. Las que la tratan como investigación de demanda usan el inventario para decidir dónde invertir en IA gobernada, con dueño, datos clasificados y herramienta aprobada. El riesgo baja porque el uso sale de la sombra, no porque se prohibió.

> Cada uso escondido de IA señala un proceso que la empresa todavía no resolvió de la forma correcta.

## Preguntas que siempre vuelven

Dudas comunes de quien necesita decidir qué hacer con el uso de IA no autorizada en la empresa.

## ¿Qué es shadow AI?

Shadow AI es el uso de herramientas de inteligencia artificial, especialmente IA generativa, por empleados sin aprobación, contrato ni visibilidad del área de TI y seguridad. Normalmente ocurre en cuentas personales gratuitas, con datos corporativos, e incluye también extensiones de navegador y apps de IA conectadas al correo, al drive o al CRM sin revisión.

## ¿La empresa debe bloquear ChatGPT y otras IA?

Bloquear sin ofrecer alternativa no funciona: el uso migra al celular y a la cuenta personal, y la empresa pierde la poca visibilidad que tenía. El camino más eficaz es ofrecer una herramienta corporativa con SSO y contrato adecuado, clasificar qué datos pueden entrar en IA y, solo después, bloquear cuentas personales en los dispositivos corporativos.

## ¿Que un empleado use IA con datos de clientes viola la LGPD?

Puede violarla, cuando se envían datos personales a un servicio de IA sin base legal, sin contrato con el proveedor y sin registro del tratamiento, como ocurre en la mayoría de los usos en cuenta personal. La responsabilidad ante la ANPD es de la empresa controladora de los datos, no del empleado, por eso la clasificación de datos y la herramienta corporativa aprobada son la protección práctica.
