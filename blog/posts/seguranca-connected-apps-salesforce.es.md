---
title: "Connected apps en Salesforce: el token OAuth olvidado es la puerta abierta"
slug: "seguranca-connected-apps-salesforce"
pillar: "sf"
date: "2026-11-17"
readMinutes: 7
excerpt: "Las mayores filtraciones de Salesforce de 2025–2026 entraron por connected apps ya autorizadas. Cómo auditar tokens OAuth sin romper integraciones."
tldr: "Una connected app es la autorización que permite a un sistema externo leer y escribir en la org de Salesforce vía OAuth, y el token que recibe suele valer hasta que alguien lo revoque. Entre agosto de 2025 y junio de 2026, tres ataques encadenados (Salesloft Drift, Gainsight y Klue) llegaron a datos de cientos de organizaciones (más de 700 solo en el caso Salesloft Drift) sin explotar fallas de la plataforma, usando tokens de integraciones confiables que ningún monitoreo de login detectó. La defensa es tratar cada integración como cuenta privilegiada: inventario, alcance mínimo, validez corta del token, dueño nombrado y revocación cuando el uso termina."
keywords: ["connected apps Salesforce", "seguridad Salesforce OAuth", "token OAuth Salesforce", "integraciones Salesforce", "Salesloft Drift", "auditoría de connected apps"]
---

**Las connected apps en Salesforce** se volvieron el camino preferido de quien quiere robar datos de CRM. No por una falla de la plataforma: porque cada integración autorizada lleva un token OAuth que, por defecto, vale hasta que alguien se acuerde de revocarlo. Y casi nadie se acuerda. La herramienta de prospección probada en 2022, el conector de encuestas de satisfacción que marketing abandonó, la prueba de concepto de un proveedor que nunca se volvió contrato. Todas siguen con acceso de lectura al dato más completo que la empresa tiene sobre sus clientes.

Entre agosto de 2025 y junio de 2026, esto dejó de ser hipótesis. Según la [nota de investigación de la Cloud Security Alliance de julio de 2026](https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/07/CSA_research_note_shinyhunters_oauth_saas_abuse_20260716-csa-styled.pdf), tres ataques sucesivos usaron tokens de integraciones confiables para extraer datos de orgs de Salesforce: más de 700 organizaciones vía Salesloft Drift, más de 200 instancias vía Gainsight y 195 clientes vía Klue. Ninguno de los tres explotó una vulnerabilidad de Salesforce. Todos explotaron una autorización otorgada y olvidada.

## Por qué el ataque no aparece en el monitoreo de login

El modelo mental de seguridad de la mayoría de las empresas sigue siendo el de personas iniciando sesión. MFA obligatorio, alerta de acceso desde un país extraño, bloqueo tras intentos fallidos. Todo eso protege la puerta principal. Una connected app entra por otra puerta.

Cuando un usuario autoriza una integración, Salesforce emite un token de acceso y, en la mayoría de los casos, un **refresh token**: la credencial que permite a la integración pedir nuevos tokens sin ningún humano involucrado. La política por defecto es que ese refresh token vale hasta ser revocado. Quien roba el token hereda el acceso de la integración, sin contraseña, sin MFA, sin login nuevo que dispare una alerta.

Por eso, según la CSA, ninguno de los tres incidentes fue detectado por el monitoreo de autenticación. Las consultas llegaban por sesiones de connected app ya autorizadas, con volumen y horario parecidos al tráfico legítimo del proveedor. En el caso Klue, la extracción automatizada corrió cerca de 24 horas antes de la detección. En el caso Salesloft, la ventana fue del 8 al 18 de agosto de 2025, más de una semana.

> La integración autorizada es el perímetro que nadie audita. El token no pide MFA, no cambia de contraseña y no se va de la empresa.

## Tres incidentes, la misma falla de gobierno

Vale mirar los casos de cerca, porque cada uno muestra un tipo distinto de integración olvidada.

**Salesloft Drift (agosto de 2025).** Los atacantes accedieron al GitHub de Salesloft ya en marzo, saltaron al entorno AWS de la empresa y de ahí recolectaron los tokens OAuth que el chatbot Drift usaba para grabar leads en el Salesforce de los clientes. Salesloft y Salesforce revocaron todos los tokens de Drift el 20 de agosto. Lo incómodo: muchas de las empresas afectadas usaban Drift como chat del sitio, sin darse cuenta de que tenía acceso de lectura a todo el CRM.

**Gainsight (noviembre de 2025).** Salesforce detectó actividad anómala de API en aplicaciones publicadas por Gainsight y las deshabilitó todas en el ecosistema. Parte de la cobertura indica que los atacantes reutilizaron tokens obtenidos en el incidente anterior. Es decir: un token revocado en un lugar y no revisado en otro.

**Klue (junio de 2026).** El caso más didáctico. Años antes, Klue había creado una credencial para prototipar una integración que nunca salió del papel. Nadie la desactivó. El 11 de junio de 2026, los atacantes usaron esa credencial de cuatro años para publicar código capaz de recolectar tokens OAuth de clientes y consultar la API REST de Salesforce durante un día entero.

El patrón común no es técnico, es de gestión. En todos los casos había una credencial duradera que nadie revisaba activamente. La misma CSA cita su encuesta 2025–2026 con 420 profesionales de seguridad: el 58% tiene dificultades para aplicar mínimo privilegio en integraciones SaaS y el 46% no tiene visibilidad adecuada de identidades no humanas, como las connected apps. En nuestra lectura, esto coincide con lo que vemos en orgs reales, donde la lista de integraciones autorizadas suele tener el doble de lo que TI cree que existe (estimación nuestra, a partir de revisiones de org).

## Qué concede de verdad una connected app

Parte del problema es que la pantalla de autorización parece inofensiva. "Permitir acceso a tus datos" no dice cuánto. En la práctica, tres decisiones técnicas definen el tamaño del daño posible:

- **Alcance OAuth.** Una integración con alcance `full` o `api` lee todo lo que lee el usuario que la autorizó. Si quien autorizó fue un admin, la integración tiene la visión de un admin. Existen alcances más restringidos, pero dependen de que el proveedor los soporte.
- **Usuario detrás del token.** El token hereda los permisos de quien autorizó. Una integración autorizada con el login personal del gerente de ventas ve lo que él ve y se rompe el día en que sale de la empresa, o peor, sigue funcionando.
- **Validez del refresh token.** "Válido hasta revocar" es el valor por defecto. Expirar tras un plazo, o tras un período sin uso, cierra la ventana de los tokens olvidados sin costo para las integraciones activas.

Este tercer punto conversa con [la deuda técnica de la automatización superpuesta en Salesforce](/blog/es/divida-tecnica-salesforce-automacao.html): integraciones que nadie recuerda que existen son el mismo fenómeno, con riesgo de filtración en lugar de riesgo de regresión. Y Salesforce ya reaccionó en la propia plataforma: desde septiembre de 2025, el uso de connected apps no instaladas en la org quedó bloqueado para la mayoría de los usuarios, respuesta directa a las campañas de phishing telefónico que convencían a empleados de autorizar un falso Data Loader.

## Cómo auditar connected apps en seis pasos

Una auditoría de connected apps no exige herramienta nueva ni proyecto largo. Para una org mediana, cabe en dos a tres semanas de trabajo, estimación nuestra. La secuencia que recomendamos:

1. **Levanta el inventario real.** En Setup, la página de uso de OAuth de connected apps lista cada aplicación con tokens activos y cuántos usuarios la autorizaron. Expórtala y crúzala con la lista de contratos de software. Lo que no tiene contrato vigente es candidato a revocación.
2. **Revoca lo que no tiene uso ni dueño.** Prueba de concepto terminada, herramienta reemplazada, proveedor que se fue. Revocar el token, y no solo desactivar el usuario, es lo que termina el acceso persistente.
3. **Pasa de "todos pueden autorizar" a "preautorizado por el admin".** En las políticas de cada connected app instalada, restringe el acceso a perfiles o permission sets específicos. Limita también a pocos admins los permisos que permiten aprobar apps no instaladas.
4. **Cambia login personal por usuario de integración.** Cada integración relevante recibe un usuario dedicado, con licencia de integración y permisos mínimos. Eso da un objetivo claro para monitorear y desacopla la integración de la rotación de personas, el mismo principio de [darle al agente de IA una credencial propia en lugar de un login prestado](/blog/es/identidade-agente-ia-credencial-propria.html).
5. **Acorta la validez de los tokens.** Configura la expiración del refresh token por plazo o por inactividad y restringe rangos de IP cuando el proveedor publica los suyos. La integración activa renueva sin notarlo; el token olvidado muere solo.
6. **Nombra dueño y fecha de recertificación.** Cada connected app tiene un responsable de negocio, una justificación escrita y una revisión semestral. Sin este paso, el inventario vuelve a inflarse en un año.

Para orgs con Event Monitoring (incluido en Shield o contratado aparte), vale ir más allá: monitorear el volumen de consultas por connected app, no solo por usuario, y alertar cuando una integración consulta objetos que nunca consultó. Es la capa que habría acortado las ventanas de ataque descritas arriba.

## Qué cambia cuando el agente pide su propio token

La presión sobre este tema va a aumentar, no a disminuir. Cada agente de IA que lee y actúa en el CRM necesita alguna autorización, y buena parte llega por el mismo mecanismo OAuth. El [marketplace de agentes y servidores MCP de AgentExchange](/blog/es/agentexchange-mcp-salesforce.html) vuelve instalar una integración tan simple como instalar una app en el celular, y cada instalación es un token más que gobernar.

La recomendación de la propia CSA es extender ahora, a las integraciones de agentes, la disciplina que faltó en los tres incidentes: dueño, justificación, recertificación y revocación automática. Quien haga la auditoría de connected apps hoy ya tendrá el proceso listo cuando crezca el volumen de agentes.

El dato del CRM es el activo que justifica la inversión en Salesforce. Dejar el acceso a él disperso en tokens sin dueño es aceptar que la seguridad de la org depende de la higiene de credenciales de cada proveedor que alguna vez tuvo acceso a ella.

## Preguntas que siempre vuelven

Las dudas que más aparecen cuando la dirección pide una revisión de las integraciones de Salesforce.

## ¿Qué es una connected app en Salesforce?

Una connected app es el registro que autoriza a un sistema externo a acceder a la org de Salesforce por APIs usando OAuth. Define quién puede autorizar la integración, qué alcances de acceso se conceden y por cuánto tiempo valen los tokens. Las herramientas de prospección, chat, firma electrónica y BI suelen conectarse de esta forma.

## ¿Las filtraciones de Salesloft Drift y Klue fueron una falla de Salesforce?

No. Según Salesforce y el análisis de la Cloud Security Alliance, ninguno de los incidentes explotó una vulnerabilidad de la plataforma. Los atacantes comprometieron proveedores que ya tenían tokens OAuth válidos en las orgs de los clientes y usaron esa autorización legítima. La responsabilidad por el alcance, la revisión y la revocación de esas integraciones recae en el cliente y en el proveedor.

## ¿Revocar un token de connected app rompe la integración?

La rompe si la integración está en uso, y por eso la revocación viene después del inventario. Para integraciones activas, revocar exige reautorizar con un usuario de integración y el alcance correcto, lo que toma minutos. Para integraciones sin uso, revocar no rompe nada y cierra una puerta que estaba abierta sin motivo.
