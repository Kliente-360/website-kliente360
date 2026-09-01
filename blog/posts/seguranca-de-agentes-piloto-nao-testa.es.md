---
title: "Seguridad de agentes: el piloto no prueba prompt injection ni tool poisoning"
slug: "seguranca-de-agentes-piloto-nao-testa"
excerpt: "82% de los ejecutivos confía en la política de seguridad del agente; solo 21% tiene visibilidad real sobre prompt injection y tool poisoning."
tldr: "Prompt injection es la manipulación de un agente mediante instrucciones maliciosas incrustadas en el contenido que procesa; tool poisoning es la manipulación de la descripción o el comportamiento de una herramienta después de que el agente ya fue autorizado a usarla. Ninguno de los dos aparece en el piloto, porque el piloto corre sobre dato curado, herramienta estable y revisión humana de cada salida — exactamente las tres condiciones que producción elimina a medida que el agente escala. Un relevamiento de 2026 con más de 900 ejecutivos y profesionales técnicos encontró 82% confiados en que la política de seguridad protege contra acción no autorizada del agente, pero solo 21% con visibilidad completa sobre permiso, herramienta y dato que el agente realmente usa."
keywords: ["seguridad de agentes de IA", "prompt injection", "tool poisoning", "gobernanza de agentes", "piloto de agente de IA", "MCP"]
---

**Ochenta y dos** por ciento de los ejecutivos dice confiar en que la política de seguridad de la empresa protege contra acción no autorizada de un agente de IA. Solo veintiuno por ciento tiene visibilidad completa sobre qué permiso tiene ese agente, qué herramienta llama y qué dato accede. Los dos números vienen del mismo relevamiento — el *State of AI Agent Security 2026*, hecho con más de 900 ejecutivos y profesionales técnicos — y describen a la misma empresa respondiendo dos preguntas distintas: una sobre la política escrita, otra sobre el comportamiento real del agente en producción.

Esa brecha no nace de negligencia. Nace de dónde se calibró la confianza en seguridad de agentes: en el piloto. Un piloto corre sobre un conjunto de herramientas conocido, dato curado por el propio equipo y revisión humana de cada salida antes de que se convierta en acción — exactamente las tres condiciones que producción elimina, una por una, a medida que el agente escala. Prompt injection y tool poisoning, dos de los vectores de ataque más citados en la literatura de seguridad de 2026, son invisibles bajo esas condiciones controladas. Solo aparecen cuando alguien — a propósito o no — expone al agente a lo que el piloto nunca expuso.

## El síntoma: el piloto aprueba, producción descubre el ataque

El patrón se repite en casi todo incidente documentado: el equipo aprobó el piloto porque el agente se comportó bien dentro del alcance probado. Nadie intentó, a propósito, que el agente desobedeciera su propia instrucción. Nadie cambió la versión de una herramienta a mitad del test para ver si el agente lo notaba. El piloto midió competencia en una tarea conocida — no resistencia a un adversario desconocido.

El costo de esa brecha ya apareció a escala: 88% de las organizaciones reportó un incidente de seguridad confirmado o sospechado con agente de IA en el último año, según el mismo relevamiento. Y la aprobación formal no sigue el ritmo del despliegue — solo 14,4% de las organizaciones pone agentes en producción con aprobación completa de seguridad o TI. La mayoría escala primero y formaliza controles después, generalmente después del primer incidente que expone lo que faltaba.

> El piloto prueba si el agente funciona. Rara vez prueba si resiste a alguien que intenta hacer que funcione mal.

## Prompt injection: el piloto nunca leyó contenido hostil

Prompt injection es la técnica de incrustar instrucciones maliciosas dentro del contenido que un agente procesa — un correo, un documento, una página web, la respuesta de una herramienta — de forma que el modelo interpreta eso como comando, no como dato. [Ya detallamos ese vector al mapear la arquitectura de un servidor MCP](/blog/es/arquitetura-servidor-mcp.html): cuando un resource devuelve contenido de terceros, ese contenido entra al contexto del modelo con la misma autoridad que una instrucción del usuario — y el modelo no tiene, por defecto, cómo distinguir las dos fuentes.

La gravedad del vector está confirmada fuera de nuestro propio argumento. El OWASP GenAI Security Project mantiene prompt injection en el primer puesto del LLM Top 10 desde que la lista existe, y la edición 2026 mapea el vector en seis de las diez categorías del Top 10 específico para aplicaciones agenticas — señal de que el problema dejó de ser un ítem aislado de checklist y ahora atraviesa casi toda superficie de decisión de un agente.

Un piloto procesa dato que el propio equipo seleccionó — generalmente limpio, generalmente confiable. Producción procesa lo que el mundo manda: correo de cliente, adjunto de proveedor, resultado de búsqueda, contenido de un servidor MCP que la empresa ni siquiera opera. Ninguna de esas fuentes pasó por el mismo filtro que el dato del piloto pasó. La primera vez que el agente encuentra contenido realmente hostil suele ser en producción — justo cuando el costo del error deja de ser hipotético.

## Tool poisoning: la herramienta cambia después de que el piloto la aprobó

Tool poisoning es la manipulación de la descripción de una herramienta — o del comportamiento detrás de ella — después de que el agente ya está autorizado a llamarla. El modelo lee la descripción en lenguaje natural de la tool como instrucción, no como metadato, y nada en el protocolo [que sostiene la adopción enterprise de MCP](/blog/es/model-context-protocol-servidor-mcp.html) impide que esa descripción cambie en una conexión posterior, sin que el cliente reevalúe el consentimiento original.

Dos casos documentados en 2026 muestran que esto ya pasó fuera del laboratorio. El CVE-2026-22708, contra el editor Cursor, permitió envenenar el entorno de ejecución del agente para que comandos supuestamente seguros — como `git branch` — entregaran payload arbitrario. Y el paquete `postmark-mcp` publicó quince versiones limpias, construyendo confianza, antes de agregar una sola línea de código que exfiltraba dato silenciosamente.

> Una herramienta aprobada una vez no queda aprobada para siempre — solo deja de ser revisada.

Ninguno de los dos ataques aparece en un piloto, porque el piloto prueba la herramienta en la versión que tenía el día del test, no en la versión que puede asumir seis meses después, con un proveedor que la empresa no vuelve a auditar en cada actualización. Confiar en una herramienta una vez no es lo mismo que confiar en ella para siempre — y esa diferencia es justo la que separa un checklist de integración de una disciplina de seguridad continua.

## Cinco preguntas que el piloto debería responder y normalmente no responde

Antes de tratar un piloto como validado para producción, cinco preguntas separan una prueba de competencia de una prueba de seguridad:

1. **¿El piloto expuso al agente a contenido que la empresa no controla?** Correo externo, documento de terceros, resultado de búsqueda — si la respuesta es "solo dato interno curado", el piloto nunca probó prompt injection de verdad.
2. **¿Alguien intentó, a propósito, que el agente desobedeciera su propia instrucción?** El red-team de prompt injection es distinto de una prueba de funcionalidad — exige un adversario simulado, no un usuario cooperativo.
3. **¿La herramienta que el agente llama hoy es la misma, en la misma versión, que va a llamar dentro de seis meses?** Sin versionado auditado, la respuesta es "no lo sabemos" — y "no lo sabemos" es la precondición de todo caso de tool poisoning documentado.
4. **¿Existe un log estructurado de cada llamada a herramienta, o solo del resultado final agregado?** [Sin ese trace, un incidente de seguridad se convierte en reconstrucción de memoria](/blog/es/observabilidade-de-agentes.html) en vez de investigación con dato.
5. **¿Quién revisa el comportamiento del agente después de que el piloto se convierte en producción — y con qué frecuencia?** El piloto tiene plazo de validación; producción no tiene plazo para dejar de ser revisada.

## La confianza en seguridad de agentes mide el piloto, no la producción

La brecha entre 82% y 21% no es sobre ejecutivos deshonestos — es sobre medir la cosa equivocada. La política escrita, la aprobación formal, el piloto que pasó: todos responden "el agente está funcionando". Ninguno responde "el agente resiste a alguien que intenta hacer que funcione contra la empresa". El 88% de organizaciones que ya reportó un incidente de seguridad confirmado o sospechado no lo descubrió en el piloto — lo descubrió después, porque el piloto nunca probó ese escenario.

Cerrar esa brecha cuesta menos antes de que el agente escale que después del primer incidente. Red-team de prompt injection, versionado auditado de cada herramienta externa, revisión humana obligatoria de acciones irreversibles — ninguno de los tres exige reconstruir el agente. Exige probar contra el adversario que el piloto nunca simuló, antes de que producción lo simule por su cuenta.

## Preguntas que siempre vuelven

Para cerrar, las dudas más comunes sobre seguridad de agentes de IA, prompt injection y tool poisoning.

## ¿Qué es prompt injection en agentes de IA?

Prompt injection es la técnica de incrustar instrucciones maliciosas dentro del contenido que un agente de IA procesa — un correo, documento, página web o respuesta de herramienta — de forma que el modelo interpreta ese contenido como comando en vez de dato. El OWASP GenAI Security Project mantiene prompt injection en el primer puesto del LLM Top 10 desde que la lista existe, y la edición 2026 mapea el vector en seis de las diez categorías del Top 10 específico para aplicaciones agenticas — señal de que el riesgo atraviesa casi toda superficie de decisión de un agente, no solo la entrada de texto directa del usuario.

## ¿Qué es tool poisoning y en qué se diferencia de prompt injection?

Tool poisoning es la manipulación de la descripción de una herramienta — o del comportamiento detrás de ella — después de que un agente o cliente ya aprobó su uso, mientras que prompt injection ataca el contenido que un agente lee durante la ejecución. Ambos explotan el mismo punto ciego: el modelo trata la descripción de herramienta y el contenido externo como información confiable por defecto. Casos documentados en 2026, como el CVE-2026-22708 contra el editor Cursor y el paquete `postmark-mcp` que agregó exfiltración de dato después de quince versiones limpias, muestran que el ataque suele llegar después de que la confianza ya fue construida — no en la primera interacción.

## ¿Por qué un piloto de agente no detecta estos riesgos?

Porque piloto y producción prueban contra adversarios distintos. Un piloto corre sobre dato curado por el propio equipo, herramienta en la versión probada y revisión humana de cada salida antes de que se convierta en acción — las tres condiciones que eliminan, por diseño, tanto prompt injection como tool poisoning. Producción elimina esas tres protecciones progresivamente a medida que el agente escala: procesa dato que la empresa no controla, llama herramientas que pueden cambiar sin aviso, y actúa con menos revisión humana por llamada, porque el volumen no lo permite. El piloto mide competencia en una tarea conocida; no mide resistencia a un adversario que solo aparece después de que el piloto termina.
