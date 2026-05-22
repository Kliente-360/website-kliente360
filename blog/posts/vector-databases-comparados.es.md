---
title: "Vector databases comparados: Pinecone, Weaviate, pgvector — cuándo sirve cada uno"
slug: "vector-databases-comparados"
pillar: "ai"
date: "2026-03-03"
readMinutes: 6
excerpt: "Toda discusión de RAG apunta al LLM. Pero dónde viven los embeddings decide latencia, costo y escala. Comparación honesta de los tres caminos populares en 2026."
tldr: "Pinecone optimiza para operación grande gestionada. Weaviate entrega flexibilidad open-source con features de RAG nativas. pgvector es la opción que nadie quiere admitir que alcanza en el 70% de los casos. Criterios de elección que dependen más del contexto operativo que de la performance bruta."
keywords: ["vector database", "Pinecone", "Weaviate", "pgvector", "RAG"]
---

La reunión de arquitectura de RAG casi siempre tiene el mismo desvío: 80% del tiempo discutiendo qué LLM usar, 20% qué vector database. La proporción debería ser inversa. [En RAG, la recuperación es el cuello de botella](/blog/es/rag-na-pratica.html), y dónde viven los embeddings decide latencia, costo, escala y operabilidad en producción. Cambiar de LLM en 2026 es commodity; cambiar de vector DB después de tener 50 millones de embeddings indexados no.

Este texto compara las tres opciones populares — **Pinecone**, **Weaviate** y **pgvector** — con la regla que importa: contexto operativo, no benchmark bruto.

## Qué representan realmente tres caminos distintos

Antes de comparar, vale separar lo que cada uno representa en diseño.

**Pinecone.** Servicio gestionado, fully cloud, optimizado para operación grande sin pensar en infra. Pay-as-you-go por vector almacenado y por query. Foco en estabilidad operativa, latencia baja consistente, escala horizontal automática. Es la opción que se vende al CTO que no quiere equipo de infra dedicado para vector.

**Weaviate.** Open-source con versión cloud gestionada. Más que vector DB — entrega RAG nativo (módulos de embedding, generación, reranking embebidos), filtrado híbrido, schema-aware. Foco en flexibilidad de arquitectura y en quien quiere correr propio (on-prem o nube privada). Es la opción que le gusta al engineer que disfruta configurar.

**pgvector.** Extensión de PostgreSQL. No es "vector DB" — es Postgres con soporte a vector. No escala como Pinecone, no tiene features de RAG nativas como Weaviate. Pero es Postgres — que tu empresa ya corre, tu equipo ya conoce, tu backup ya cubre. Es la opción que nadie menciona en conferencia pero que resuelve más casos de los que admiten.

La elección entre los tres rara vez es "cuál es más rápido" (todos son rápidos suficiente en alcance medio). Es "cuál encaja en tu operación".

## Cuándo Pinecone tiene sentido

Tres contextos donde Pinecone se justifica:

**Operación a escala ya-grande o previsiblemente-grande.** Por encima de ~50M de embeddings, o con necesidad de latencia consistente sub-50ms global. Pinecone está arquitectónicamente optimizado para ese rango.

**Equipo sin apetito para operar infra de vector.** Cuando el trade-off de pagar 3× más para no cuidar cluster, sharding, scaling, backup del índice vectorial vale el dinero. Equipo chico enfocado en producto, no en platform.

**Multi-región con SLA agresivo.** Si la aplicación necesita servir RAG con baja latencia en América, Europa, Asia, Pinecone tiene replicación global gestionada que costaría muy caro replicar con Weaviate o pgvector.

Fuera de esos tres, Pinecone tiende a ser overshoot. ¿El equipo ya tiene capacidad técnica y la operación no es gigante? Vale considerar los otros dos.

## Cuándo Weaviate tiene sentido

Weaviate ocupa el medio:

**Necesidad de RAG nativo en el banco.** Weaviate embebe módulos de embedding, generación y reranking. Si tu arquitectura quiere pipeline RAG completo dentro del banco — en vez de orquestar Python externo — Weaviate lo entrega. Pinecone exige stack adicional; pgvector también.

**Filtrado híbrido pesado.** Cuando la query necesita combinar búsqueda vectorial + filtro estructurado complejo (categoría + fecha + tenant + tag), Weaviate tiene optimización fuerte. Pinecone tiene filtrado pero con límites; pgvector depende de Postgres puro.

**Soberanía de dato / on-prem.** La empresa necesita correr el banco en su propia infra (compliance, costo, control). Weaviate open-source corre en Kubernetes, Docker, máquina dedicada. Pinecone es solo cloud.

Weaviate sufre cuando el equipo no tiene expertise para operar banco distribuido. Configurarlo bien exige conocimiento — distinto de Pinecone (sin configuración) y de pgvector (Postgres conocido).

## Cuándo pgvector tiene sentido (más veces de lo que se admite)

El caso menos discutido y más subestimado en 2026:

**Volumen medio (hasta ~10M de embeddings).** Postgres con pgvector + ivfflat o HNSW resuelve queries en <100ms en ese rango. Por encima, empieza a sufrir. Pero la mayoría de las empresas de tamaño medio están por debajo de ese techo.

**La empresa ya tiene Postgres en producción.** Mismo equipo, mismo backup, misma observabilidad. Agregar pgvector es configurar una extensión, no adoptar tecnología nueva. Costo operativo incremental: cerca de cero.

**RAG sobre dato relacional.** Cuando los embeddings necesitan cruzarse con datos estructurados (tabla de clientes, productos, transacciones), pgvector permite JOIN nativo. Pinecone y Weaviate exigen orquestación externa.

La objeción común: "pero pgvector no escala". Cierto — no escala como Pinecone. Para empresa con 5M de embeddings creciendo 10% al año, va a funcionar muy bien por 4–5 años. ¿Para qué comprar Ferrari para ir al kiosco?

> En el 70% de los casos de tamaño medio, pgvector resuelve el caso de uso. El otro 30% justifica Pinecone o Weaviate. Invertir esa proporción es el error más caro de RAG en 2026.

## Los criterios honestos para elegir

La regla que aplicamos antes de cualquier proyecto:

1. **Volumen esperado en 18 meses, no hoy.** Subestimar lleva a migración; sobrestimar lleva a overspend. Calcular: documentos × chunks por doc × tamaño promedio de embedding × multiplicador de safety (1.5–2×).
2. **Latencia aceptable por el caso de uso.** Chatbot interno tolera 500ms. Asistente de búsqueda en tiempo real exige <100ms. Sub-50ms global cuesta mucho. Calibrar por el uso, no por el deseo.
3. **Patrón de query.** ¿Búsqueda vectorial pura? ¿Combinada con filtro? ¿JOIN con dato relacional? La respuesta cambia completamente la elección.
4. **Capacidad operativa del equipo.** Equipo chico sin expertise en distribuido = Pinecone o pgvector (si entra). Equipo fuerte en Kubernetes/banco = Weaviate se vuelve viable. Forzar contra ese perfil cuesta caro.
5. **Compliance y ubicación.** Dato sensible, restricción de geografía, requisito de on-prem. Pinecone (solo cloud) sale automáticamente en casos restringidos.

Quien responde los cinco sin dudar sabe elegir. Quien duda todavía no tiene caso de uso definido — y la elección se va a hacer por hype, no por necesidad.

## La trampa del "empezamos con X y migramos después"

La frase que parece pragmática y cuesta caro: "empecemos con Pinecone, y si queda caro migramos a pgvector". Migración de vector DB con volumen productivo es proyecto serio — reindexar 20M de embeddings con generación nueva, validar paridad, redirigir tráfico sin pérdida. Cuesta 6–12 semanas de ingeniería sénior.

La versión menos cara: empezar simple (pgvector) y subir a Pinecone/Weaviate cuando *de hecho* ya no entra más. Migrar hacia arriba es más barato que hacia abajo (porque los requisitos nuevos que justifican el upgrade ya están claros). Migrar hacia abajo es cortar features y perder operativamente.

Quien elige Pinecone "por garantía" gasta 5–10× más en el primer año y rara vez usa la capacidad. Quien elige pgvector y escala después paga progresivo, según el caso de uso pruebe valor.

## La decisión para 2026

Si estás trabado en esta elección hoy, tres movimientos honestos antes de firmar:

**Calcular volumen real en 18 meses.** Si entra en pgvector, empezá con pgvector. Si pasa de 50M, saltá a Pinecone. Entre los dos, depende de los criterios 3–5.

**Pilotar con dato real, no benchmark sintético.** Los tres entregan ~similar en benchmark. Con dato real, query real, filtro real, las diferencias aparecen. Piloto de 2 semanas con 1M de embeddings reales ya muestra cuál encaja.

**Recordar que vector DB es pieza, no estrategia.** [La recuperación es el cuello de botella](/blog/es/rag-na-pratica.html), pero dentro de la recuperación, la elección del banco es solo una capa. Sin chunking bueno, embedding adecuado y reranking, cualquier banco va a entregar resultado mediocre.

La peor decisión es gastar tres meses eligiendo el vector DB perfecto y tres semanas implementando RAG malo. La mejor es elegir el banco "bueno suficiente para el caso de uso" e invertir el tiempo ahorrado en la calidad del pipeline.
