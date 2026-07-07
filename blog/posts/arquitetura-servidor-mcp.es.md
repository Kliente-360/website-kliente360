---
title: "Arquitectura de un servidor MCP: transporte, autenticación y dónde se rompe"
slug: "arquitetura-servidor-mcp"
excerpt: "Por dentro de un servidor MCP: las tres primitivas del protocolo, stdio vs HTTP remoto, y los riesgos de seguridad que el checklist suele ignorar."
tldr: "Un servidor MCP expone tools, resources y prompts vía JSON-RPC, con dos transportes principales —stdio local y HTTP remoto con streaming. La superficie de riesgo real no es el protocolo en sí, es lo que automatiza: descubrimiento dinámico de herramientas y ejecución con poca fricción humana. Este texto detalla la arquitectura y el checklist de seguridad antes de ir a producción."
keywords: ["MCP", "arquitectura MCP", "seguridad de agentes", "Model Context Protocol", "JSON-RPC"]
---

Como [ya vimos al mapear la adopción del MCP a escala enterprise](/blog/es/model-context-protocol-servidor-mcp.html), el protocolo pasó de curiosidad técnica a infraestructura estándar en poco más de un año. Lo que esa conversación sobre adopción no cubre es la parte que decide si un servidor MCP es seguro de publicar o es una puerta abierta: la arquitectura por dentro, el transporte elegido, y la superficie de ataque que el protocolo introduce al automatizar lo que antes exigía fricción humana.

Publicar un servidor MCP parece, en la documentación oficial, tan simple como exponer un endpoint REST con un decorador. En la práctica, un servidor mal diseñado convierte a cualquier agente conectado en un vector de ejecución con acceso amplio y poca auditoría. Este texto entra en la capa de implementación: las tres primitivas del protocolo, los dos transportes disponibles, y el checklist de seguridad antes de ir a producción.

## Las tres primitivas que expone todo servidor MCP

Un servidor MCP no expone "una API" —expone tres tipos de capacidad, cada una con semántica propia que el cliente descubre en tiempo de ejecución.

- **Tools.** Funciones que el modelo puede invocar con efecto colateral —crear un ticket, actualizar un registro, disparar un workflow. Cada tool se describe en JSON Schema (nombre, parámetros, descripción en lenguaje natural). Es la descripción en lenguaje natural, no el schema, la que el modelo usa para decidir cuándo llamarla —y ahí es justo donde entra el primer vector de riesgo descrito más abajo.
- **Resources.** Datos que el cliente puede leer —un documento, una fila de base de datos, un archivo de log— direccionados por una URI propia del servidor. A diferencia de una tool, un resource no ejecuta acción; solo devuelve contenido, que entra al contexto del modelo como cualquier otro texto.
- **Prompts.** Plantillas parametrizadas que el servidor ofrece para que el cliente armé una instrucción completa —útil cuando quien mantiene el sistema quiere estandarizar cómo el agente pregunta algo específico de ese dominio, en vez de dejar que cada cliente reinvente el prompt.

Un servidor no necesita exponer las tres. Un servidor de lectura de documentación, por ejemplo, solo expone resources; un servidor de automatización de CRM expone mayoritariamente tools.

## JSON-RPC por debajo del capó

Toda comunicación MCP corre sobre JSON-RPC 2.0. La sesión arranca con un handshake `initialize`, donde cliente y servidor intercambian versión de protocolo soportada y capacidades —el servidor declara si soporta tools, resources, prompts, suscripciones a cambios de recurso. Después del handshake, el cliente lista lo disponible (`tools/list`, `resources/list`) e invoca (`tools/call`, `resources/read`).

Esa negociación de capacidades es lo que permite versionar sin romper al cliente antiguo: un servidor puede agregar una tool nueva en una versión, y un cliente que no la conoce simplemente no la lista. El problema aparece cuando el servidor *cambia el comportamiento* de una tool existente sin cambiar el nombre —el cliente que aprendió el contrato viejo sigue llamándola, ahora con un resultado distinto al esperado. No hay verificación de versionado semántico integrada en el protocolo; es responsabilidad de quien mantiene el servidor.

## Stdio local o HTTP remoto — dos transportes, dos riesgos

MCP define el transporte separado de la semántica del mensaje —la misma primitiva `tools/call` funciona sobre dos canales bien distintos.

**Stdio** conecta cliente y servidor en el mismo proceso local, vía stdin/stdout. Es el transporte estándar para herramientas de desarrollador (editor, CLI) corriendo en la misma máquina que el agente. No hay red involucrada —el riesgo de interceptación es bajo, pero el servidor hereda los mismos privilegios del proceso que lo invocó, lo que significa que un bug de path traversal o de inyección de comandos en el servidor tiene acceso directo al sistema de archivos local.

**Streamable HTTP** (que reemplazó la combinación HTTP+SSE de la revisión anterior de la especificación) es el transporte para un servidor remoto, multi-tenant, que atiende clientes que no comparten proceso ni máquina. Aquí la superficie cambia: la autenticación se vuelve obligatoria (típicamente OAuth 2.1), cada request necesita alcance y rate limit, y el servidor necesita aislar la sesión del cliente A de la del cliente B —sin eso, un bug de fuga de contexto entre sesiones expone el dato de un tenant a otro.

La elección no es estética. Un servidor que solo va a ser consumido localmente no necesita la complejidad de OAuth y multi-tenencia. Un servidor que va a ser consumido por agentes de clientes distintos necesita, desde el primer deploy, aislamiento de sesión real y autenticación real —el retrofit después sale caro.

## ¿Dónde se rompe la mayoría de las implementaciones?

El protocolo en sí es simple. La superficie de riesgo viene de lo que automatiza: descubrimiento dinámico de herramientas y ejecución con poca fricción humana entre la decisión del modelo y el efecto en el mundo real. Cuatro patrones de falla aparecen con frecuencia.

**Tool poisoning.** La descripción en lenguaje natural de una tool es, ella misma, un vector de prompt injection —un servidor malicioso, o comprometido, puede describir una tool inofensiva de un modo que instruya al modelo a hacer algo más allá de lo esperado. El modelo lee la descripción como instrucción, no solo como metadato.

**Confused deputy vía OAuth pass-through.** Cuando un servidor MCP reenvía el token OAuth del usuario a otro sistema downstream sin validar el alcance, el agente hereda permiso más allá de lo que la tarea requiere —y cualquier llamada a esa tool se ejecuta con el privilegio total del usuario, no con el mínimo necesario para esa acción específica.

**Rug-pull de la definición de tool.** Un cliente aprueba el uso de una tool con base en la descripción vista en la primera conexión. Nada impide que el servidor altere esa descripción —o el comportamiento detrás de ella— en una conexión posterior, sin que el cliente reevalúe el consentimiento original.

**Contenido de resource como inyección indirecta.** Un resource devuelve contenido de terceros —un documento, un correo, una página web— que entra al contexto del modelo como texto confiable. Si ese contenido trae una instrucción disfrazada, el modelo puede obedecerla con la misma autoridad con la que obedecería al usuario.

> El riesgo del MCP no es el protocolo —es la distancia que crea entre la decisión de un modelo y la revisión de un humano.

## Checklist antes de producción

Ninguno de estos riesgos es motivo para no publicar un servidor MCP. Son motivo para publicarlo con control. Seis puntos separan una implementación amateur de una lista para producción:

1. **Alcance mínimo por tool, nunca el token completo del usuario.** Cada llamada debe llevar solo el permiso necesario para esa acción específica —nunca reenviar el token de sesión completo al sistema downstream.
2. **Allow-list de clientes conocidos**, especialmente en servidor remoto multi-tenant. Un cliente nuevo entra en modo observación antes de ganar acceso a tools con efecto colateral real.
3. **Log estructurado de cada llamada a tool** —argumento, cliente, timestamp, resultado. Sin eso, un incidente no es investigable después del hecho.
4. **Revisión humana obligatoria en acciones destructivas o irreversibles** —borrar un registro, enviar una comunicación externa, mover dinero. Una acción reversible y de bajo impacto puede correr autónoma; el resto, no.
5. **Versionado explícito del contrato de la tool**, con changelog visible —un cambio de comportamiento sin cambio de identificador rompe el consentimiento implícito del cliente que ya aprobó esa tool.
6. **Sanitizar el contenido del resource antes de que entre al contexto**, tratando cualquier dato externo como no confiable hasta probar lo contrario —el mismo principio que ya vale para [cualquier pipeline de RAG que maneja documentos de terceros](/blog/es/rag-na-pratica.html).

## La arquitectura decide cuánto confiás en el agente

Lo que queda después de este checklist es que MCP no introduce un riesgo nuevo en esencia —introduce velocidad y escala para riesgos que ya existían en cualquier integración automatizada. Lo que cambia es que, en un mundo de descubrimiento dinámico de herramientas, esos riesgos dejan de evaluarse una vez por integración y empiezan a necesitar evaluación continua —porque el conjunto de tools disponibles para el agente puede cambiar sin que nadie del equipo lo revise de nuevo.

Ese es el mismo argumento detrás de [tratar la gobernanza de agentes como parte del diseño, no como una capa posterior](/blog/es/privacidade-dados-llms.html): quien publica un servidor MCP hoy está decidiendo, de hecho, cuánto va a confiar en código que no escribió para actuar en nombre de un agente que tal vez ni siquiera mantuvo.
