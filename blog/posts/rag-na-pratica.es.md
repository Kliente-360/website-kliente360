---
title: "RAG en la práctica: la recuperación es el cuello de botella, no el LLM"
slug: "rag-na-pratica"
pillar: "ai"
date: "2026-01-13"
readMinutes: 7
excerpt: "Los equipos gastan meses afinando prompt y modelo mientras el retrieval entrega el documento equivocado. Por qué recuperar es más difícil que generar — y qué medir."
tldr: "Casi todo proyecto de RAG que falla no falla en el LLM: falla en recuperar el fragmento correcto en el momento correcto. La generación se volvió commodity; la recuperación no. Cinco razones por las que el retrieval rompe, tres métricas para medir lo que importa, y un patrón de evaluación que evita el piloto eterno."
keywords: ["RAG", "retrieval", "recuperación", "embeddings", "LLM"]
---

La frase que se repite en el piloto de RAG cuando el resultado decepciona es "el modelo se equivocó". Casi nunca es verdad. El modelo generó exactamente lo que el contexto pedía — solo que el contexto era el documento equivocado, el fragmento equivocado, o los dos correctos sin el tercero que cambia la respuesta. La culpa no es de la generación; es de la recuperación. Y como el retrieval es menos sexy que el LLM, el equipo gasta semanas afinando el prompt y cambiando de modelo mientras el problema vive en el `top-k`.

Este texto va sobre por qué RAG es difícil donde nadie mira. No contra RAG — es la arquitectura correcta para meter conocimiento propio dentro de respuestas de modelo. Pero el desequilibrio entre cuánto se habla de generación y cuánto se habla de recuperación está costando proyectos.

## La generación se volvió commodity, la recuperación no

En 2023 elegir LLM era decisión estratégica. En 2026 es commodity: Claude, GPT, Gemini, Llama — todos responden bien si el contexto es bueno. La frontera entre proyecto bueno y mediocre se movió fuera del modelo y entró en **lo que llega al contexto**.

La recuperación parece simple en la diapositiva: el usuario pregunta, el sistema busca documentos similares por embedding, el top-k va al LLM, el LLM responde. Cada uno de esos pasos tiene trampa. Cada trampa individual perdona 5–10% de calidad. Apiladas, el sistema entrega respuesta correcta en el 60% de los casos y nadie entiende por qué.

Peor: el LLM esconde el problema. *Parece* correcto cuando responde sobre el documento equivocado, porque la generación es fluida y confiada. El usuario solo nota que algo está mal calibrado cuando contrasta una respuesta con la realidad — y para entonces ya lleva tres meses en producción.

> En RAG, generar es la parte fácil. Recuperar el fragmento correcto, en el momento correcto, en el orden correcto, con el contexto adicional correcto — ahí es donde el sistema rompe.

La consecuencia práctica: equipo que aborda RAG como "problema de LLM" optimiza lo que da menos retorno. Equipo que lo aborda como "problema de retrieval" invierte donde duele.

## Cinco razones por las que el retrieval rompe en producción

Son los modos de falla que aparecen en casi todo proyecto. Vale catalogarlos antes de empezar.

1. **Chunking ingenuo.** Partir el documento en pedazos de 500 tokens por ventana deslizante es el default y rara vez lo correcto. El pedazo corta a la mitad la definición, pierde el título de la sección, separa la pregunta de la respuesta. El chunking tiene que respetar la estructura semántica del documento — capítulos, secciones, bloques lógicos — no el reloj de tokens.
2. **Embeddings genéricos sobre vocabulario específico.** Los modelos de embedding pre-entrenados son buenos en lenguaje general. En dominios técnicos (jurídico, médico, financiero, código), la distancia vectorial entre "rescisión" y "terminación" puede no capturar el matiz que cambia la respuesta. Sin fine-tuning o modelos de dominio, el ranking sale sesgado — y [el fine-tuning en corpus de dominio es exactamente el patrón que supera a RAG en terminología técnica cerrada](/blog/es/quando-fine-tuning-supera-rag.html).
3. **Top-k a ciegas.** Tomar los 5 o 10 fragmentos más cercanos por similitud vectorial suena razonable, pero ignora dos hechos: los fragmentos pueden ser casi idénticos (redundancia) y el que importa puede estar en el puesto 12 (pérdida). Sin reranking, el top-k es lotería.
4. **Falta de query rewriting.** La pregunta que el usuario hace rara vez es la pregunta que recupera bien. "¿Qué cambió en el contrato?" es vaga, corta, sin términos técnicos. El sistema tiene que reformular la consulta — expandir, descomponer, reescribir en el vocabulario del corpus — antes de buscar. Saltarse ese paso es entregar búsqueda mala por diseño.
5. **Evaluación solo en la generación.** El equipo mide calidad por la respuesta final del LLM e intenta optimizar el sistema entero por el output. Es como evaluar un auto entero solo por el color: nunca descubrís si el motor es bueno. El retrieval tiene que evaluarse *aparte* de la generación — con métricas propias.

Esos cinco modos explican el 80% de los pilotos de RAG atascados en "casi funciona". No hay solución única; hay disciplina de medir cada capa.

## Qué medir, en tres métricas que importan

La discusión de métricas en RAG es donde aparece la madurez del equipo. Tres métricas resuelven el 90% de los casos.

**Recall@k.** De los documentos que *deberían* aparecer en el top-k para responder bien, cuántos aparecieron. Si tenés un conjunto de preguntas con ground truth (10–50 preguntas con los documentos correctos marcados), recall@10 por debajo del 80% significa que el sistema deja contexto crítico afuera. Subir de modelo o ajustar el prompt no lo resuelve — es problema de búsqueda.

**MRR (Mean Reciprocal Rank).** En qué posición, en promedio, aparece el fragmento correcto en el ranking. Si MRR está en 0.3, el fragmento correcto suele estar tercero o cuarto — el LLM lee primero el contexto equivocado y contamina la respuesta. El reranking sube el MRR más que cambiar de embedding.

**Faithfulness de la respuesta al contexto recuperado.** Aun con buen retrieval, el LLM puede alucinar o inferir más allá de lo que el contexto soporta. Métrica: porcentaje de afirmaciones en la respuesta con soporte directo en el contexto. Por debajo del 90%, el sistema está generando más allá de la evidencia — riesgo alto en dominios regulados.

Esas tres tienen que estar en el dashboard antes de cualquier afinado de prompt. Quien mide solo "satisfacción del usuario" optimiza a ciegas.

## Anatomía de una pipeline que funciona

La consultoría decente arma RAG en capas, no como una llamada de API. El esqueleto que entregamos en proyecto serio tiene cinco pasos, cada uno instrumentado.

**Chunking informado por la estructura.** Cortar respetando headings, párrafos, bloques lógicos. Superposición del 10–20% entre chunks adyacentes para evitar pérdida de contexto en el borde. Metadatos embebidos: título de la sección, jerarquía, fuente, fecha.

**Indexación híbrida.** Vector (embedding) + texto (BM25 o similar). El vector capta semántica; el texto capta términos exactos (nombre de producto, código, número de cláusula). El top-k combinado cubre más que cada uno por separado. [La elección del vector database — Pinecone, Weaviate o pgvector — depende más del contexto operativo que de la performance bruta](/blog/es/vector-databases-comparados.html).

**Query rewriting antes de la búsqueda.** El mismo LLM que va a generar la respuesta — o un modelo más chico dedicado — reformula la pregunta del usuario en 2–3 variantes, expande términos, descompone preguntas compuestas. Cada variante busca; los resultados se combinan.

**Reranking sobre el top-k expandido.** Tomar top-30 de la búsqueda inicial y correr un reranker (cross-encoder o LLM con prompt de scoring) que reordena por los 5–10 más relevantes para esa pregunta específica. Ese paso sube el MRR de 0.3 a 0.6+ en la mayoría de los dominios. Es el mejor retorno por hora de ingeniería.

**Generación con cita de fuente.** El LLM responde *y cita el fragmento exacto* que sustenta cada afirmación. No es solo UX — es lo que permite medir faithfulness después. Sin cita, no hay auditoría.

[Como ya argumenté sobre cuándo tiene sentido implantar un agente](/blog/es/quando-agente-e-resposta.html), nada de esto elimina la necesidad de proceso diseñado. RAG amplifica conocimiento existente; no inventa conocimiento que no fue escrito. Si el corpus está vacío, malo o desactualizado, el sistema solo amplifica esa pobreza.

## Dónde entra la calidad del corpus

Y acá vive la tensión honesta. RAG depende del corpus, y [un corpus perfecto no existe](/blog/es/dado-limpo-e-um-mito.html) — el mismo principio que se aplica a datos estructurados se aplica a documentos no estructurados. La pregunta correcta no es "¿nuestro corpus está limpio?", es "¿nuestro corpus es bueno suficiente para responder *este conjunto de preguntas*?".

Operativamente, eso significa: empezá por el caso de uso, armá el conjunto de evaluación (50 preguntas con ground truth), corré retrieval y ve el gap. Si recall@10 está en 50%, el problema puede ser dos cosas: el corpus no tiene la respuesta (problema de contenido, no de RAG) o el corpus la tiene pero no la recupera (problema de retrieval). Sin esa separación, el equipo sigue optimizando el sistema equivocado.

## Para el sponsor que pregunta "¿por qué tan complicado?"

Porque parece simple en la demo. En la demo el usuario pregunta lo que el ingeniero probó; el sistema acierta. En producción, la distribución de preguntas es más amplia, los documentos están más sucios, y cada modo de falla aparece. RAG bien hecho no es más caro que RAG mal hecho — solo está distribuido distinto en el tiempo. El equipo que invierte dos o tres semanas en retrieval evita seis meses de "¿por qué esta respuesta está mal?".

La buena noticia: las cinco razones de falla son conocidas, las tres métricas son estándar, la pipeline en cinco capas entra en cualquier proyecto serio. Lo que separa a quien entrega de quien queda en piloto es tratar el retrieval como producto, no como detalle de implementación.
