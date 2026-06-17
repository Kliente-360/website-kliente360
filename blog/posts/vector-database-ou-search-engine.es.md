---
title: "Vector database no es obligatorio en RAG — cuando el índice clásico gana"
slug: "vector-database-ou-search-engine"
pillar: "ai"
date: "2026-06-17"
readMinutes: 7
excerpt: "RAG no exige vector database. BM25 y búsqueda híbrida ganan en consultas exactas y docs estructurados — con menor latencia y menor complejidad operacional."
tldr: "El vector database se ha convertido en el supuesto estándar en las arquitecturas RAG, pero no es un requisito. Cuando el corpus contiene identificadores exactos, campos estructurados o consultas de términos específicos, BM25 y la búsqueda híbrida recuperan mejor — con menor latencia e infraestructura más simple. Cinco preguntas determinan qué arquitectura usar."
keywords: ["vector database", "RAG", "BM25", "búsqueda híbrida", "motor de búsqueda", "recuperación semántica"]
---

El tutorial estándar de RAG siempre sigue el mismo pipeline: divide el documento en fragmentos, genera un embedding para cada uno, los almacena en un vector database, busca por similitud semántica e inyecta el resultado en el prompt. El pipeline funciona suficientemente bien para una demo. En producción, el supuesto de que "RAG = vector database" genera complejidad operacional innecesaria y, en muchos casos, una recuperación peor que la que entregaría un índice de texto simple.

Un vector database es una herramienta excelente — para el problema correcto. El problema es cuando se convierte en la herramienta predeterminada antes de cualquier análisis del tipo de documentos y el tipo de consultas. Este texto trata sobre cuándo el índice clásico — BM25, Elasticsearch, índice invertido — tiene más sentido que el embedding semántico, y cómo la búsqueda híbrida captura lo mejor de ambos mundos en la mayoría de los casos corporativos.

## Lo que resuelve el vector database — y dónde se rompe el supuesto

Un vector database almacena representaciones matemáticas (embeddings) de fragmentos de texto y busca por proximidad semántica: "¿qué fragmento es más *parecido* a lo que preguntó el usuario?". Funciona excepcionalmente bien cuando la pregunta y la respuesta usan vocabularios distintos que expresan la misma idea. "¿Cómo cancelo mi plan?" debe recuperar documentos que describen "procedimiento de rescisión de contrato" — sin vector, la coincidencia por palabra clave fallaría.

Pero existe una clase grande de consultas corporativas que no funciona así. El usuario pregunta "¿cuál es el plazo de garantía del producto X47-BR?" — y la respuesta está literalmente escrita como "producto X47-BR: garantía de 12 meses". Aquí, la similitud semántica no agrega nada. Lo que importa es que el documento *contenga exactamente* los términos de la consulta. La búsqueda por palabra clave resuelve esto mejor y más rápido.

El supuesto se desmorona cuando se observa el corpus real de las empresas:

- **Documentos técnicos** con codificación específica: SKUs, RFC/NIT, números de contrato, referencias de cláusulas.
- **Bases de FAQ** con preguntas y respuestas estandarizadas y vocabulario controlado.
- **Manuales de producto** donde el título de la sección mapea directamente a la consulta posible del usuario.
- **Tablas regulatorias** donde "tasa para el servicio X" es un dato exacto, no semántico.

En estos casos, el embedding agrega latencia (generar el vector de la consulta en cada petición), costo (modelo de embedding más infraestructura del vector store) sin entregar ventaja de recuperación. [La recuperación es el cuello de botella en RAG, no el LLM](/blog/es/rag-na-pratica.html) — y elegir el método de recuperación incorrecto es el modo de fallo más subestimado en proyectos atascados en "casi funciona".

## ¿Cuándo BM25 recupera mejor que el embedding?

BM25 (Best Match 25) es el algoritmo de relevancia estándar de Elasticsearch, OpenSearch y la mayoría de los sistemas de búsqueda maduros. Es un perfeccionamiento de TF-IDF: clasifica documentos por la frecuencia de los términos de la consulta, ajustada por la rareza del término en el corpus y el tamaño del documento.

Parece simple. Y lo es — lo cual es una ventaja, no un defecto. Cuatro escenarios específicos en los que BM25 gana:

1. **Consultas con términos exactos y raros.** Números de pedido, códigos de producto, referencias legales ("art. 5, §2"), identificadores técnicos. La rareza del término en el corpus ya es una señal fuerte de relevancia — el vector no agrega nada sobre "qué fragmento menciona exactamente este código".
2. **Corpus con vocabulario controlado.** Documentos técnicos donde los autores usan terminología estandarizada: manual del fabricante, reglas de negocio documentadas, procedimientos operativos estándar. El usuario que conoce el vocabulario busca exactamente los términos correctos. La coincidencia directa supera a la similitud coseno aquí.
3. **Latencia crítica.** Generar el embedding de la consulta en tiempo real agrega 100–300ms con un modelo alojado, más con on-premise. BM25 sobre un índice invertido es sub-milisegundo. En chatbots de alta carga o aplicaciones conversacionales de voz, la diferencia es percibida directamente por el usuario.
4. **Corpus pequeño y estable.** Reindexar un vector store cuando los documentos cambian tiene un costo real — requiere re-embeddear los fragmentos modificados mientras se versiona el modelo de embedding. Para un corpus de 200 documentos de bajo turnover, un índice Elasticsearch es operacionalmente más simple e igualmente eficaz.

> El vector resuelve lo que la palabra clave no alcanza. La palabra clave resuelve lo que el vector complica. Combinar ambos — búsqueda híbrida — es la arquitectura que cubre los dos casos sin elegir un único ganador.

## Búsqueda híbrida — el tercer camino

La buena noticia: en los sistemas de producción modernos la elección no tiene que ser exclusiva. La **búsqueda híbrida** combina el ranking por palabras clave (BM25) con el ranking por embeddings (vectorial) y fusiona los resultados mediante Reciprocal Rank Fusion (RRF) o weighted blending.

Elasticsearch y OpenSearch tienen búsqueda híbrida nativa desde 2023–2024. pgvector combinado con `pg_trgm` implementa la misma lógica sin salir de PostgreSQL. Pinecone y Weaviate tienen modo sparse/dense hybrid. La mayoría de las stacks de RAG corporativo maduras hoy usan híbrido como predeterminado — no por moda, sino porque cubre más casos sin sacrificar una latencia aceptable.

El patrón que recomendamos en proyectos corporativos:

1. **BM25 como ancla.** Se ejecuta primero, trae los candidatos con alta coincidencia de palabras clave — especialmente crítico para consultas con términos exactos o identificadores.
2. **Embedding como re-ranker semántico.** Sobre el top-50 de BM25, aplica similitud vectorial para reordenar los 10–15 candidatos finales — captura la variación semántica que BM25 perdería.
3. **Cross-encoder opcional.** En dominios de alta precisión (cumplimiento normativo, soporte técnico especializado, jurídico), agregar un reranker cross-encoder sobre el top-15 final mejora significativamente la calidad — al costo de 150–400ms adicionales.

Este diseño usa el vector database donde es bueno (reordenación semántica fina) y BM25 donde es superior (filtrado por términos exactos y escala). [La elección entre Pinecone, Weaviate y pgvector impacta más el costo operacional y el modelo de despliegue que el rendimiento bruto de recuperación](/blog/es/vector-databases-comparados.html) — y en muchos casos, pgvector dentro del PostgreSQL existente ya es suficiente para el componente vectorial del híbrido, sin infraestructura adicional.

## ¿Qué preguntas determinan la arquitectura de recuperación?

Antes de elegir vector database, búsqueda clásica o híbrida, cinco preguntas posicionan correctamente el proyecto:

1. **¿Los documentos contienen identificadores o campos exactos que las consultas van a referenciar?** SKUs, RFC/NIT, códigos, fechas, referencias contractuales. Si es así, BM25 debe estar en el pipeline — sin él, las consultas con esos términos recuperarán sistemáticamente mal.
2. **¿El vocabulario del corpus es controlado o varía libremente?** Manual técnico estandarizado → BM25 fuerte. Corpus de correos, notas de reunión, textos libres → el embedding es necesario para capturar la variación semántica entre términos.
3. **¿Con qué frecuencia se actualiza el corpus?** Alto turnover de documentos → el costo de re-embedding es real; evaluar si BM25 solo cubre el caso de uso. Corpus estable → el vector store se justifica más con menor costo de mantenimiento.
4. **¿Hay un requisito de latencia que el pipeline debe cumplir?** Sub-200ms por respuesta → eliminar o minimizar los pasos de embedding en tiempo de ejecución. Latencia relajada → híbrido completo sin restricciones.
5. **¿El equipo tiene capacidad operacional para mantener un vector store en producción?** La infraestructura de vector database requiere versionado de embeddings, monitoreo de deriva semántica y actualización del modelo cuando una versión se descontinúa. Sin un equipo con esa especialidad, pgvector en la base de datos existente o Elasticsearch simple es una decisión técnica defendible.

Estas preguntas también protegen de un error adyacente: escalar a vector database en un proyecto pequeño donde ninguna de las condiciones que justifican la inversión está presente.

## Cuando la elección se vuelve reflejo, no decisión

Una observación sobre lo que suele salir mal. La elección entre vector database y motor de búsqueda clásico frecuentemente no es una decisión técnica — es una decisión de referencia. El tutorial usó Pinecone; el notebook de ejemplo usó ChromaDB; el predeterminado de LangChain era FAISS. Nadie se detuvo a preguntar si era el correcto para el corpus específico en cuestión.

El resultado: proyectos RAG en producción con vector database ejecutándose sobre un corpus de 300 documentos técnicos con campos exactos, donde Elasticsearch con BM25 habría entregado un 15% mejor recall, latencia 5× menor y cero infraestructura adicional. Ese costo técnico no aparece en el piloto — aparece en la primera semana de producción cuando el agente no encuentra "producto X47-BR" y el equipo de datos no sabe explicar por qué.

[La decisión entre RAG y fine-tuning tiene un framework estructurado](/blog/es/quando-fine-tuning-supera-rag.html) que cubre la elección arquitectural en el nivel más alto. La decisión dentro de RAG — qué mecanismo de recuperación usar — merece el mismo rigor. El vector database es una pieza excelente de infraestructura. No es la única pieza, y raramente debe ser la primera elección sin analizar lo que el corpus y las consultas realmente exigen.
