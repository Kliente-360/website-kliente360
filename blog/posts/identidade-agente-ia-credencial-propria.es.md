---
title: "Identidad de agente de IA: el login prestado es el mayor riesgo"
slug: "identidade-agente-ia-credencial-propria"
excerpt: "La identidad de agente de IA es la credencial propia, con alcance y dueño, que cada agente necesita — y la mayoría opera hoy con un login prestado de un humano."
tldr: "La identidad de agente de IA es la credencial propia — con alcance mínimo, fecha de vencimiento y un dueño nombrado — que permite a un agente acceder a sistemas sin hacerse pasar por una persona ni por un usuario de integración genérico. En 2026 solo el 16% de las empresas dice gobernar bien el acceso de la IA a sistemas centrales como Salesforce y SAP, y menos de una cuarta parte trata al agente como identidad distinta. El riesgo no está en el modelo: está en el login prestado con el que el agente entra al CRM, al ERP y al data warehouse."
keywords: ["identidad de agente de IA", "identidad no humana", "mínimo privilegio", "credenciales de agentes", "gobernanza de agentes", "Salesforce"]
---

**Todo** agente de IA que abre Salesforce, consulta el ERP o lee el data warehouse entra por una puerta — y, en la mayoría de los pilotos, esa puerta es la credencial de otra persona. Un token personal del desarrollador que armó el prototipo, un usuario de integración compartido con perfil amplio, una única clave de API que sirve a todos los agentes. Funciona en el piloto, pasa la demostración y se convierte en el mayor riesgo silencioso de la operación cuando el agente gana volumen. La identidad de agente de IA — la credencial propia de cada agente — es el control que separa un piloto que escala de un incidente esperando fecha.

Los números de 2026 muestran el tamaño del agujero. El *2026 CISO AI Risk Report*, de Cybersecurity Insiders con Saviynt, consultó a 235 líderes de seguridad de grandes empresas de EE. UU. y Reino Unido y [encontró un desajuste](https://securityledger.com/2026/04/the-ungoverned-workforce-cybersecurity-insiders-finds-92-lack-visibility-into-ai-identities/): el 71% dice que las herramientas de IA ya acceden a sistemas centrales como Salesforce y SAP, pero solo el 16% gobierna ese acceso de forma efectiva. Además, el 92% no tiene visibilidad completa de las identidades de IA y apenas el 5% confía en poder contener a un agente comprometido.

## El agente es una identidad, no una funcionalidad

Una identidad no humana es cualquier entidad que se autentica en un sistema sin ser una persona: cuenta de servicio, clave de API, robot de integración. Los agentes de IA entran en esa categoría, con una diferencia que cambia el cálculo de riesgo — deciden qué hacer en tiempo de ejecución. Una cuenta de servicio tradicional ejecuta un script previsible; un agente elige qué herramienta llamar y con qué parámetros, y por eso el perímetro de lo que *puede* hacer debe definirse antes, no descubrirse después.

El State of AI Agent Security 2026, de Gravitee, consultó a 919 profesionales y señaló el mismo patrón desde la ingeniería: solo el 21,9% de las organizaciones trata a los agentes como entidades con identidad propia, y el 45,6% todavía usa claves de API compartidas para la autenticación entre agentes. El modelo mental dominante sigue siendo "el agente es una feature del sistema", cuando a efectos de seguridad funciona como un empleado nuevo que nadie contrató formalmente.

> Un agente sin identidad propia no tiene rastro de auditoría, no tiene alcance y no tiene botón de apagado — solo tiene el acceso de quien prestó la contraseña.

## Los cuatro atajos de credencial que aparecen en todo piloto

En los proyectos que vemos, los atajos se repiten con poca variación. Ninguno nace de mala fe; todos nacen de la prisa por mostrar resultados:

1. **Token personal de quien armó el prototipo.** El agente actúa con los permisos de una persona concreta — y deja de funcionar, o peor, sigue funcionando con acceso indebido, cuando esa persona cambia de área o se va de la empresa.
2. **Usuario de integración compartido con perfil amplio.** Un solo usuario, muchas veces con perfil de administrador "para que no se trabe la prueba", sirve a tres agentes y a dos integraciones heredadas. En el log, todo parece la misma persona.
3. **Clave de API única entre agentes.** Una filtración compromete a todos a la vez, y revocar la clave tumba toda la operación — lo que en la práctica hace que nadie la revoque.
4. **Credencial sin fecha de vencimiento.** El secreto creado para la demostración queda años en producción, en un repositorio o en una variable de entorno que nadie audita.

El efecto común es la pérdida de atribución. Cuando algo sale mal — un registro borrado, un dato sensible enviado al lugar equivocado —, el log muestra una cuenta genérica y la investigación empieza por descubrir *qué* agente, *qué* ejecución y *quién* lo autorizó. Es el mismo problema de fondo que [la observabilidad de agentes](/blog/es/observabilidade-de-agentes.html) intenta resolver después del hecho; con identidad propia, buena parte de él deja de existir.

## Cómo es una identidad decente de agente

Una consultoría especializada en agentes termina repitiendo el mismo conjunto de reglas. Seis de ellas cubren la gran mayoría de los casos:

1. **Una identidad por agente, nunca por equipo.** Cada agente tiene credencial propia, con nombre legible (`agente-triaje-rrhh`, no `svc-integracion-02`). Eso da atribución y permite revocar uno sin tumbar los demás.
2. **Mínimo privilegio por tarea, no por conveniencia.** El alcance nace de lo que el agente necesita hacer: leer cuentas, pero no eliminarlas; crear casos, pero no alterar contratos. El perfil de administrador para un agente es una excepción que exige justificación escrita.
3. **Credencial de corta duración.** Tokens que expiran en minutos u horas, renovados automáticamente, limitan la ventana de daño de una filtración. El secreto estático de larga vida es el patrón a evitar.
4. **Dueño nombrado.** Toda identidad de agente tiene una persona responsable — el mismo razonamiento de [tener un dueño del agente](/blog/es/dono-do-agente-cargo-2026.html), aplicado a la credencial. Sin dueño, nadie renueva, nadie revisa, nadie apaga.
5. **Revocación probada.** Apagar un agente comprometido debe tomar minutos, y la empresa debe haberlo ensayado al menos una vez. Solo el 5% confía en poder contener a un agente, según el informe citado arriba; ensayar es lo que cambia ese número.
6. **Log atribuible.** Cada acción del agente registrada con el identificador del agente, la ejecución y el origen de la solicitud — lo que también sostiene la auditoría y el cumplimiento.

## ¿Identidad propia o delegación del usuario?

Hay un caso legítimo en el que el agente actúa *en nombre de* una persona: el asistente que resume los correos de un vendedor, por ejemplo. La regla segura es que el agente actúe con la **intersección** de los dos conjuntos de permisos — lo que el agente puede hacer y lo que ese usuario puede ver — y nunca con la suma. La delegación sin ese freno es el patrón que [describimos en servidores MCP como "confused deputy"](/blog/es/arquitetura-servidor-mcp.html): el agente hereda permisos que el usuario nunca habría concedido a una máquina.

En el ecosistema Salesforce, el punto de atención práctico es el usuario de integración. En un proyecto de agente es tentador reutilizar el usuario que ya conecta el ERP con el CRM. Suele acumular permission sets de años de integraciones, y el agente pasa a heredarlos todos. Cuanto más antigua la org, mayor la probabilidad de que el alcance real supere lo necesario. Crear un usuario dedicado al agente, con permission sets mínimos y revisables, cuesta un día de trabajo; descubrir el exceso después de un incidente cuesta bastante más.

## Por dónde empezar en 30 días

Regularizar agentes que ya operan no exige un proyecto grande. Una secuencia acotada, en orden de retorno:

1. **Inventariar.** Listar todo agente y toda credencial que usa, incluidas las claves en repositorios y variables de entorno. Es la etapa que más sorprende, porque la lista real casi siempre supera a la oficial.
2. **Separar las credenciales compartidas.** Partir cada clave o usuario compartido en una identidad por agente.
3. **Recortar alcance.** Empezar por las identidades con perfil de administrador y reducirlas a lo que el agente realmente usó en los últimos 30 días de logs.
4. **Poner vencimiento y dueño.** Rotación automática donde la plataforma lo permita; revisión trimestral donde no.

Este trabajo es el prerrequisito silencioso de todo lo que viene después. [Una auditoría de seguridad del piloto](/blog/es/seguranca-de-agentes-piloto-nao-testa.html) que prueba prompt injection pero ignora con qué credencial actúa el agente mide la parte menos peligrosa del problema.

## Preguntas que siempre vuelven

Para cerrar, las dudas más comunes sobre identidad y acceso de agentes de IA.

## ¿Qué es la identidad de agente de IA?

La identidad de agente de IA es la credencial propia de un agente — cuenta, token o certificado — con alcance de acceso definido, fecha de vencimiento y un responsable nombrado. Permite atribuir cada acción al agente correcto, revocar un agente sin afectar a los otros y limitar lo que alcanza en los sistemas de la empresa.

## ¿Puede el agente usar la credencial del usuario que lo activó?

Puede, cuando la delegación es explícita y limitada: el agente actúa con la intersección entre lo que tiene permitido hacer y lo que ese usuario puede acceder. Lo que no debe ocurrir es que el agente herede la credencial completa de una persona, porque entonces actúa con privilegios que nadie aprobó para una máquina y el rastro de auditoría deja de distinguir humano de agente.

## ¿Cuánto tiempo lleva regularizar agentes que ya están en producción?

Depende más del número de credenciales compartidas que del número de agentes. En nuestra experiencia, el inventario lleva de una a dos semanas, la separación de identidades y el recorte de alcance otra a tres, y la rotación automática depende de lo que soporte cada plataforma. Es una estimación nuestra, no un benchmark de mercado: lo que cambia el plazo es que cada credencial tenga un dueño.
