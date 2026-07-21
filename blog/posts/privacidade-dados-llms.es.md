---
title: "Privacidad de datos en LLMs: el checklist de gobernanza que falta en el piloto"
slug: "privacidade-dados-llms"
pillar: "ai"
date: "2026-04-01"
readMinutes: 6
excerpt: "El equipo pilotea LLM con dato real de cliente, sin pensar en la ley de privacidad. En tres meses, se vuelve incidente público. Siete ítems que hay que responder antes del primer prompt."
tldr: "Los pilotos de LLM con dato de cliente se hacen sin gobernanza de privacidad porque \"es solo una prueba\". No es solo prueba para LGPD/GDPR ni para reputación. Siete ítems de checklist que separan piloto responsable de pasivo legal naciendo. Aplicable independiente de dónde corra el modelo."
keywords: ["LGPD", "GDPR", "privacidad", "LLM", "gobernanza de IA", "compliance"]
---

La historia típica de incidente de IA en 2026 sigue el mismo arco. El equipo interno prueba LLM con dato real de cliente — porque "necesita dato realista para el POC", "va a quedar interno igual", "después ponemos gobernanza". El piloto se vuelve proyecto, el proyecto se vuelve producto. En algún momento, alguien nota que dato personal de 15 mil clientes pasó por API de vendor americano sin consentimiento explícito, sin DPIA, sin registro. Eso se vuelve incidente. Puede volverse noticia. Puede volverse multa.

Este texto es el checklist de gobernanza que necesita estar resuelto *antes* del primer prompt en cualquier proyecto de LLM con dato real. No es compliance burocrático — es el mínimo para que el proyecto no se vuelva pasivo legal.

## Por qué el problema escala en silencio

El LLM amplifica el riesgo de privacidad de tres maneras que los sistemas tradicionales no amplificaban.

**El dato entra en formato libre.** Distinto a un form con campos fijos, el prompt acepta cualquier cosa. El operador puede pegar mail de cliente, transcripción de llamada, contrato entero. Todo eso sale del perímetro de la empresa cuando va a API externa.

**Los logs del vendor pueden retener prompts.** La política varía por provider, por plan, por región. Sin checkeo específico, dato sensible queda en log de tercero por 30 días — o indefinidamente.

**El reuso para entrenamiento puede pasar.** OpenAI, Anthropic, Google tienen políticas que separan API empresarial de producto consumer. Pero la configuración default varía, y empresa que no verifica puede estar alimentando entrenamiento sin saber.

Los tres combinados crean superficie de riesgo que no existía en sistema tradicional. Subestimar eso es generar incidente en plazo corto.

> Piloto de LLM con dato real sin gobernanza no es "agilidad". Es pasivo naciendo. Y a diferencia de otros pasivos, este aparece en titular antes de aparecer en factura.

## Los siete ítems del checklist

La regla que aplicamos antes de cualquier proyecto de IA con dato real. Faltando dos o más, el proyecto no debería salir del papel.

1. **Mapa del dato: ¿qué va a entrar al prompt?** PII (nombre, CUIT, mail), dato sensible (salud, financiero), dato comercial confidencial. Escribir explícitamente. Sin esa lista, es imposible juzgar el riesgo.
2. **Base legal para cada categoría de dato.** Consentimiento, ejecución de contrato, interés legítimo, u otra. Cada categoría de dato necesita base legal mapeada. Sin eso, los reguladores van a venir.
3. **Política del vendor sobre retención y entrenamiento.** Confirmación por escrito (no diapositiva de vendedor) de que los prompts no entran a entrenamiento, que la retención es cero o X días, que el dato queda en región específica. Sin documento, es suposición.
4. **DPIA cuando aplica.** Evaluación de Impacto en la Protección de Datos para usos de alto riesgo — IA tomando decisión sobre cliente, perfilado, análisis predictivo. Los reguladores vienen fiscalizando esto en 2026.
5. **Pseudo-anonimización o redaction en el camino.** Cuando posible, remover o enmascarar PII antes de enviar al LLM. Librerías como Microsoft Presidio lo hacen. Reduce la superficie de riesgo y simplifica compliance.
6. **Log propio de lo que se envió.** Registro local (no del vendor) de todo prompt + respuesta + usuario + timestamp. Necesario para auditoría, para investigación de incidente, para responder a titular que pide info bajo ley de privacidad.
7. **Política de bypass humano en decisiones automatizadas.** Las leyes de privacidad garantizan el derecho a revisión humana en decisión automatizada relevante. Sistema serio tiene botón "escalar a humano" desde el día 1, y proceso definido para revisión.

Esos siete no son teoría — son lo que va a aparecer en la primera auditoría. La empresa que los tiene entrega rápido. La empresa que no los tiene entrega rápido también, pero paga después.

## Lo que cambia con LLM corriendo interno

Para empresas que corren LLM propio (on-prem, [modelo abierto auto-hospedado](/blog/es/open-source-vs-proprietary-llms.html), instancia dedicada), parte del checklist cambia. No desaparece.

**El vendor no está en el camino.** Los ítems 3 y parte del 6 (logs del vendor) desaparecen. Pero surgen nuevos: gobernanza del modelo interno, control de acceso al servidor, hardening.

**PII puede ser más tolerable.** En modelo interno bien gobernado, la sensibilidad del dato es menor que en API externa. Pero solo "menor" — no cero. Filtración interna también es filtración.

**El compliance regulatorio continúa.** La ley de privacidad no diferencia dónde corre el modelo. Bases legales, DPIA, log propio, derecho de revisión — todo sigue valiendo.

[Como argumenté sobre LLM como agente interno](/blog/es/llm-como-agente-interno.html), correr propio es más seguro en una dimensión (perímetro) pero no dispensa gobernanza en las otras.

## La trampa del "veamos qué pasa"

La frase que mata la gobernanza: "es solo un piloto, después formalizamos". En 2025 todavía pasaba en algunas empresas. En 2026 ya no. Tres motivos:

**[Los reguladores empezaron a fiscalizar IA específicamente](/blog/es/anpd-fiscalizacao-ia-brasil.html).** Ya no es amenaza hipotética. Empresas tomaron multa por uso de LLM con dato personal sin base legal. Casos públicos. La cosa se volvió real.

**El cliente empezó a preguntar.** En contratos B2B, cláusulas explícitas sobre uso de IA, sub-procesadores, retención. Empresa que no responde pierde negocio antes de tomar multa.

**La prensa presta atención.** Incidente de IA con filtración de dato personal se vuelve noticia. La reputación cuesta más que la multa en empresa B2C.

Esos tres combinados eliminan el argumento "veamos". Quien todavía lo usa en 2026 está midiendo riesgo con calibración de 2022.

## Cómo integrar con [evaluación de agentes](/blog/es/avaliacao-de-agentes.html) y [costos](/blog/es/custos-reais-de-inferencia.html)

La gobernanza no es silo. En arquitectura madura de IA:

**El eval set incluye casos de privacidad.** Preguntas que intentan hacer al agente revelar dato sensible, filtrar instrucción de sistema, comportarse mal. Fallar acá es tan crítico como fallar en acertividad.

**El costo de gobernanza entra en el cálculo de TCO.** Log propio, redaction, monitoreo — todo eso cuesta. Olvidarse de eso es presupuestar el piloto con 20–30% de costo invisible.

**Auditoría periódica de lo que se está enviando.** Muestreo mensual de prompts reales, revisado por DPO o equipo de gobernanza. Sin eso, el drift de comportamiento (el usuario empieza a pegar dato que no debía) pasa desapercibido.

## La decisión para 2026

Si tu empresa está por pilotear LLM con dato real, tres movimientos antes del primer prompt:

**Checklist de los siete ítems, respondido por escrito.** No verbal en reunión — documento de 2–3 páginas, aprobado por DPO y responsable técnico. Se vuelve artefacto para auditoría.

**Política mínima de uso aceptable.** Quién puede enviar qué al LLM. Qué datos están prohibidos. Capacitación corta para el equipo. 1 hora de capacitación previene el 80% de los incidentes.

**Sponsor con mandato de pausar el piloto si hace falta.** Cuando algo salga mal — y algo va a salir mal en algún piloto — alguien necesita tener autoridad para pausar antes de la escalada. Sin ese sponsor, el equipo va a esconder el problema hasta volverse incidente.

La gobernanza de privacidad en LLM en 2026 es parte del proyecto, no fase adicional. Empresa que acepta esa lógica entrega IA responsable y crece con confianza. Empresa que todavía lo trata como burocracia opcional va a estar en el titular antes de estar en el business case. La diferencia no está en tener compliance — está en tener compliance *desde el primer prompt*.

## Preguntas que siempre vuelven

Tres dudas que aparecen en toda conversación sobre privacidad y LLM — respondidas con lo que este texto argumenta.

## ¿Puedo usar dato real de cliente en un piloto de LLM?

Podés, pero solo después de resolver la gobernanza — usar dato real "porque es solo una prueba" es exactamente como nacen los incidentes. El arco es siempre el mismo: el piloto se vuelve proyecto, el proyecto se vuelve producto, y en algún momento alguien descubre que dato personal de miles de clientes pasó por API externa sin base legal, sin DPIA, sin registro.

El camino responsable es responder por escrito los siete ítems del checklist antes del primer prompt: mapa del dato, base legal por categoría, política del vendor documentada, DPIA cuando aplica, redaction en el camino, log propio y bypass humano. Faltando dos o más, el piloto no debería salir del papel. Y cuando puedas enmascarar PII antes de enviar, mejor todavía — reduce riesgo y simplifica compliance.

## ¿Correr el LLM on-premise resuelve el problema de privacidad?

No lo resuelve — cambia parte del problema, pero la gobernanza no desaparece. Con modelo propio, el vendor sale del camino: desaparece la preocupación por retención y entrenamiento de tercero. A cambio, surgen otras: gobernanza del modelo interno, control de acceso al servidor, hardening. Y la filtración interna sigue siendo filtración.

El punto central es que la ley de privacidad no diferencia dónde corre el modelo. Bases legales, DPIA, log propio y derecho a revisión humana siguen valiendo igual. Correr propio es más seguro en una dimensión (perímetro), pero no dispensa el resto del checklist.

## ¿Cuánto cuesta poner gobernanza en un proyecto de LLM?

Menos de lo que parece, y mucho menos que la alternativa — pero tiene que entrar al presupuesto desde el inicio. Log propio, redaction y monitoreo tienen costo real: olvidarse de eso es presupuestar el piloto con 20–30% de costo invisible. Del lado del proceso, el esfuerzo es modesto: un documento de 2–3 páginas con el checklist respondido, aprobado por DPO y responsable técnico, más 1 hora de capacitación del equipo — que previene el 80% de los incidentes.

El contrapunto es el costo de no tenerla: en 2026, reguladores fiscalizando IA específicamente, cliente B2B exigiendo cláusulas sobre uso de IA en contrato, y la prensa transformando filtración en titular. La empresa sin gobernanza pierde negocio antes de tomar multa — y la reputación cuesta más que la multa.
