---
title: "AgentExchange y MCP en Salesforce: el marketplace se volvió capa de arquitectura"
slug: "agentexchange-mcp-salesforce"
excerpt: "AgentExchange fusionó AppExchange, Slack Marketplace y la vitrina de agentes en un solo catálogo — 10.000 apps y 1.000+ agentes y servidores MCP juntos."
tldr: "AgentExchange es el marketplace único que Salesforce lanzó en TDX 2026 fusionando AppExchange, Slack Marketplace y la vitrina original de agentes, reuniendo más de 10.000 apps, 2.600+ apps de Slack y 1.000+ agentes, herramientas y servidores MCP bajo una sola capa de descubrimiento y compra. El cambio traslada parte de la decisión de comprar listo o construir desde cero hacia dentro del catálogo — solo que la velocidad de armar una solución con piezas listas del marketplace ya supera la velocidad con la que la mayoría de las empresas logra aprobar consumo nuevo. Un servidor MCP listado en AgentExchange se vuelve pieza de arquitectura permanente, no integración puntual, y hereda los mismos vectores de lock-in de cualquier otra dependencia de ecosistema."
keywords: ["AgentExchange", "MCP en Salesforce", "AppExchange", "marketplace de agentes", "servidores MCP", "gobernanza de compras de IA"]
---

**Hasta** la TDX 2026, un cliente Salesforce navegaba tres lugares distintos para encontrar una app, un bot de Slack o un agente listo: AppExchange, Slack Marketplace y la vitrina original de agentes. En abril, Salesforce fusionó los tres en un solo catálogo — AgentExchange — y la dirección antigua (appexchange.salesforce.com) hoy redirige hacia él. El número que resume la escala de la fusión: más de 10.000 apps, 2.600+ apps de Slack y 1.000+ agentes, herramientas y servidores MCP, todo bajo la misma búsqueda.

Unir tres vitrinas en una parece, a primera vista, una decisión de UX. No lo es. Cuando un servidor MCP se convierte en ítem de catálogo junto a una app lista, la pregunta que todo decisor de tecnología se hace — "¿compro listo o construyo?" — cambia de forma, porque ambas opciones aparecen ahora en el mismo estante, con el mismo clic de instalación.

## De tres vitrinas a una: qué cambia de verdad la fusión

La unificación no es solo estética de marca. Salesforce reorganizó la búsqueda por intención de negocio en vez de palabra clave, y prometió modo de búsqueda conversacional para el otoño de 2026 — el cliente pregunta qué necesita resolver, y el marketplace responde con una combinación de app, agente y servidor MCP, no con una lista de productos aislados. Junto llegó la AgentExchange Builders Initiative, un aporte de US$ 50 millones para que el partner ISV construya y escale solución nativa de IA dentro del catálogo.

El efecto práctico: el marketplace dejó de ser el lugar para comprar una extensión de un sistema ya decidido y pasó a ser el lugar donde la arquitectura del agente se arma, pieza por pieza, antes incluso de que exista un proyecto formal. [Buena parte de lo que separa una consultoría seria de una reventa disfrazada ya pasaba por el Partner Program y el AppExchange](/blog/es/salesforce-partner-program.html) — la fusión en AgentExchange sube la vara, porque ahora no solo las apps llevan sello de partner, también los agentes autónomos y los servidores MCP.

> El marketplace que antes vendía extensiones para una decisión ya tomada hoy es el lugar donde la decisión de arquitectura se toma primero.

## Un servidor MCP en el estante cambia el cálculo de comprar listo o construir

Hasta hace poco, adoptar Model Context Protocol significaba, en la práctica, levantar servidor propio o integrar uno de los pocos catálogos abiertos disponibles. Con más de 1.000 agentes, herramientas y servidores MCP listados dentro de AgentExchange — con una capa declarada de confianza de Salesforce detrás —, la decisión de construir un servidor MCP desde cero ahora compite, lado a lado, con la opción de instalar uno ya revisado por el marketplace.

Eso no elimina la complejidad técnica del protocolo — solo desplaza dónde aparece. [La arquitectura interna de un servidor MCP](/blog/es/arquitetura-servidor-mcp.html) — transporte, autenticación, la superficie de riesgo del descubrimiento dinámico de herramientas — sigue existiendo aunque el servidor venga listo del marketplace. Lo que cambia es que el cliente hereda esa arquitectura de un tercero, con la debida diligencia de seguridad y el mantenimiento de largo plazo dependiendo de quien publicó el ítem, no de quien lo construyó internamente.

Salesforce describe seis capas de integración MCP dentro de la plataforma — desde Agentforce funcionando de forma nativa como cliente MCP hasta MuleSoft convirtiendo una API existente en servidor MCP expuesto en el catálogo. Eso significa que una API interna, ya construida, puede literalmente convertirse en ítem de AgentExchange sin pasar por reescritura — lo que acelera la distribución, pero también acelera el número de conexiones automatizadas que una empresa necesita auditar antes de que llegue a producción.

1. **Instalar un servidor MCP listo de AgentExchange** resuelve velocidad — el servidor ya existe, ya fue listado, ya tiene alguna capa de revisión del marketplace detrás.
2. **Construir un servidor MCP propio** resuelve control — la empresa decide transporte, alcance de herramienta expuesta y quién audita la superficie de riesgo.
3. **Ninguna de las dos opciones resuelve sola el problema de gobernanza** — instalar rápido sin auditar, o construir sin seguir el mismo rigor de seguridad que promete un ítem de catálogo, llegan al mismo riesgo por caminos distintos.

## La velocidad de armar ya superó la velocidad de aprobar

El punto que la cobertura más técnica de la TDX 2026 dejó pasar — y que un análisis independiente del evento capturó bien — es organizacional, no de producto: AgentExchange expone un desfase entre la velocidad con la que hoy se arma una solución funcional, combinando app, agente y servidor MCP listos, y la velocidad con la que la mayoría de las empresas logra aprobar formalmente el consumo que esa solución genera. Un equipo técnico arma un prototipo funcional en un día. La aprobación de compra, la revisión de seguridad y el presupuesto recurrente toman semanas — cuando llegan a suceder.

Este desfase no es exclusivo de AgentExchange. [Los mismos cuatro vectores de aprisionamiento que aplican a cualquier plataforma de agentes](/blog/es/lock-in-plataforma-de-agentes.html) — dependencia de API, captura de framework, gravedad de datos, entrelazamiento de ecosistema — se aplican aquí con fuerza extra: cada agente o servidor MCP instalado desde el marketplace profundiza el entrelazamiento con el resto del stack de Salesforce, y el costo de cambiar crece junto con la conveniencia de instalar rápido.

Salesforce respondió, en parte, con gobernanza integrada en la propia plataforma — AI Gateway ganó control centralizado de uso de tokens, permisos y aprobaciones. Pero el control de plataforma resuelve el problema técnico, no el organizacional: alguien dentro de la empresa todavía necesita decidir, ítem por ítem del catálogo, qué se puede instalar sin pasar por comité y qué exige revisión formal antes del primer uso en producción.

## Cuatro preguntas antes de instalar un agente o servidor MCP de AgentExchange

Antes de hacer clic en "instalar" en un ítem del catálogo, cuatro preguntas separan una decisión informada de una apuesta de velocidad:

1. **¿Quién publicó el ítem, y qué nivel de revisión pasó?** El sello de partner de Salesforce no es una garantía uniforme — como en el antiguo AppExchange, existe un gradiente de rigor entre un partner Crest y uno recién acreditado.
2. **¿A qué accede este agente o servidor MCP, y eso necesita aprobación formal antes de la primera ejecución?** El alcance de herramienta expuesto vía MCP suele ser más amplio de lo que sugiere la descripción comercial.
3. **¿Cuánto entrelazamiento con el resto del stack crea este ítem?** Cada integración nativa aumenta el costo de cambiar después — vale la pena preguntarlo antes de instalar, no después de tres meses de uso.
4. **¿Quién, dentro de la empresa, es dueño de la decisión de mantener este ítem instalado?** Sin esa respuesta, el catálogo crece más rápido de lo que la gobernanza logra acompañar — y nadie lo nota hasta el primer incidente.

Ninguna de las cuatro preguntas exige una función nueva de la plataforma. Exige el mismo hábito organizacional que ya separa a quien escala un agente de quien se estanca en el piloto: decisión tomada antes de instalar, no después de que el ítem ya está corriendo en producción.

## El marketplace se volvió capa de arquitectura, no pestaña de compras

AgentExchange no es solo AppExchange con nombre nuevo y catálogo más grande. Es el reconocimiento, de la propia Salesforce, de que app, agente y servidor MCP hoy compiten por el mismo presupuesto y la misma decisión de arquitectura — y que separar esas tres cosas en vitrinas distintas ya no reflejaba cómo las empresas realmente arman una solución. Para quien decide tecnología, eso significa tratar cada instalación del marketplace como una decisión de arquitectura, con dueño, alcance y criterio de salida definidos — no como la compra de una app que solo extiende un sistema ya cerrado.

La consultoría que ayuda al cliente a navegar este catálogo con criterio — sin incentivo de comisión de ningún proveedor específico del otro lado de la mesa — es la que logra distinguir el ítem que resuelve el problema real del que solo parece resolverlo porque está bien posicionado en la búsqueda.

## Preguntas que siempre vuelven

Para cerrar, las dudas más comunes sobre AgentExchange y el papel de MCP dentro de él.

## ¿Qué es AgentExchange de Salesforce?

AgentExchange es el marketplace único que Salesforce creó en la TDX 2026 fusionando AppExchange, Slack Marketplace y la vitrina original de agentes en un solo catálogo, reuniendo más de 10.000 apps, 2.600+ apps de Slack y 1.000+ agentes, herramientas y servidores MCP bajo la misma búsqueda. La dirección antigua de AppExchange redirige hacia él, y la búsqueda se reorganizó por intención de negocio, con un modo conversacional previsto para el otoño de 2026.

## ¿Un servidor MCP listado en AgentExchange es más seguro que construir uno desde cero?

No necesariamente — depende del nivel de revisión que pasó el publicador y del alcance de herramienta que expone el servidor, que suele ser más amplio de lo que sugiere la descripción comercial. Instalar un ítem listo resuelve velocidad, pero no sustituye la auditoría propia de transporte, autenticación y superficie de riesgo antes de poner el servidor en producción. La debida diligencia de seguridad sigue siendo responsabilidad de quien instala, no solo de quien publicó.

## ¿Cómo decidir entre comprar un agente listo de AgentExchange o construir uno internamente?

Con cuatro preguntas objetivas antes de instalar: quién publicó el ítem y qué rigor de revisión pasó, a qué accede y si eso necesita aprobación formal, cuánto entrelazamiento con el resto del stack crea, y quién dentro de la empresa es dueño de la decisión de mantenerlo instalado. Comprar listo resuelve velocidad; construir resuelve control — ninguna de las dos opciones, por sí sola, resuelve el problema de gobernanza si la decisión no tiene dueño definido antes de la instalación.
