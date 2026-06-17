---
title: "Vector database is not mandatory in RAG — when the classic index wins"
slug: "vector-database-ou-search-engine"
pillar: "ai"
date: "2026-06-17"
readMinutes: 7
excerpt: "RAG does not require a vector database. BM25 and hybrid search win on exact queries and structured docs — with lower latency and simpler infrastructure."
tldr: "Vector database has become the default assumption in RAG architectures, but it is not a requirement. When the corpus contains exact identifiers, structured fields or specific-term queries, BM25 and hybrid search retrieve better — with lower latency and simpler infrastructure. Five questions determine which architecture to use."
keywords: ["vector database", "RAG", "BM25", "hybrid search", "search engine", "semantic retrieval"]
---

The standard RAG tutorial always follows the same pipeline: split the document into chunks, generate an embedding for each chunk, store them in a vector database, search by semantic similarity, inject the result into the prompt. The pipeline works well enough for demos. In production, the assumption that "RAG = vector database" creates unnecessary operational complexity and, in many cases, worse retrieval than a simple text index would deliver.

A vector database is an excellent tool — for the right problem. The problem is when it becomes the default tool before any analysis of the type of documents and the type of queries. This text is about when the classic index — BM25, Elasticsearch, inverted index — makes more sense than semantic embedding, and how hybrid search captures the best of both worlds in most corporate scenarios.

## What vector database solves — and where the assumption breaks

A vector database stores mathematical representations (embeddings) of text chunks and searches by semantic proximity: "which chunk is most *similar* to what the user asked?". It works exceptionally well when the question and the answer use different vocabularies expressing the same idea. "How do I cancel my plan?" should retrieve documents describing "contract termination procedure" — without a vector, keyword matching would fail.

But there is a large class of corporate queries that does not work this way. The user asks "what is the warranty period for product X47-BR?" — and the answer is literally written as "product X47-BR: 12-month warranty". Here, semantic similarity adds nothing. What matters is that the document *contains exactly* the query terms. Keyword search solves this better and faster.

The assumption breaks when you look at the real corpus of companies:

- **Technical documents** with specific coding: SKUs, tax IDs, contract numbers, clause references.
- **FAQ bases** with standardized questions and answers and controlled vocabulary.
- **Product manuals** where the section title maps directly to the likely user query.
- **Regulatory tables** where "rate for service X" is exact data, not semantic.

In these cases, embedding adds latency (generating a vector for the query on every request), cost (embedding model plus vector store infrastructure) without delivering retrieval advantages. [Retrieval is the bottleneck in RAG, not the LLM](/blog/en/rag-na-pratica.html) — and choosing the wrong retrieval method is the most underestimated failure mode in projects stuck at "almost working."

## When does BM25 retrieve better than embedding?

BM25 (Best Match 25) is the standard relevance algorithm used by Elasticsearch, OpenSearch and most mature search systems. It is a refinement of TF-IDF: it ranks documents by the frequency of query terms, adjusted for term rarity in the corpus and document length.

It seems simple. And it is — which is an advantage, not a defect. Four specific scenarios where BM25 wins:

1. **Queries with exact and rare terms.** Order numbers, product codes, legal references ("art. 5, §2"), technical identifiers. The term's rarity in the corpus is already a strong relevance signal — a vector adds nothing about "which chunk mentions exactly this code."
2. **Corpus with controlled vocabulary.** Technical documents where authors use standardized terminology: manufacturer manuals, documented business rules, standard operating procedures. Users who know the vocabulary search for exactly the right terms. Direct matching beats cosine similarity here.
3. **Critical latency requirements.** Generating query embeddings in real time adds 100–300ms with a hosted model, more with on-premise. BM25 over an inverted index is sub-millisecond. In high-load chatbots or voice conversational applications, the difference is directly perceived by the user.
4. **Small and stable corpus.** Reindexing a vector store when documents change has real cost — it requires re-embedding the changed chunks while versioning the embedding model. For a corpus of 200 low-turnover documents, an Elasticsearch index is operationally simpler and equally effective.

> Vector search solves what keyword cannot reach. Keyword search solves what vector complicates. Combining both — hybrid search — is the architecture that covers both cases without having to pick a single winner.

## Hybrid search — the third path

The good news: in modern production systems, the choice does not need to be exclusive. **Hybrid search** combines keyword ranking (BM25) with embedding ranking (vector) and merges results via Reciprocal Rank Fusion (RRF) or weighted blending.

Elasticsearch and OpenSearch have native hybrid search since 2023–2024. pgvector combined with `pg_trgm` implements the same logic without leaving PostgreSQL. Pinecone and Weaviate have sparse/dense hybrid mode. Most mature corporate RAG stacks today use hybrid as the default — not because it is fashionable, but because it covers more cases without sacrificing acceptable latency.

The pattern we recommend for corporate projects:

1. **BM25 as anchor.** Runs first, brings in candidates with high keyword match — especially critical for queries with exact terms or identifiers.
2. **Embedding as semantic re-ranker.** Over the top-50 from BM25, applies vector similarity to reorder the final 10–15 candidates — captures semantic variation that BM25 would miss.
3. **Cross-encoder optional.** In high-precision domains (compliance, specialized technical support, legal), adding a cross-encoder reranker over the final top-15 improves quality significantly — at the cost of an extra 150–400ms.

This design uses vector database where it excels (fine-grained semantic reordering) and BM25 where it is superior (exact-term filtering and scale). [The choice between Pinecone, Weaviate and pgvector impacts operational cost and deployment model more than raw recall performance](/blog/en/vector-databases-comparados.html) — and in many cases, pgvector inside an existing PostgreSQL instance is already sufficient for the vector component of the hybrid, with no additional infrastructure.

## What questions determine the retrieval architecture?

Before choosing a vector database, classic search, or hybrid, five questions correctly position the project:

1. **Do the documents contain exact identifiers or fields that queries will reference?** SKUs, tax IDs, codes, dates, contractual references. If yes, BM25 must be in the pipeline — without it, queries with those terms will systematically retrieve poorly.
2. **Is the corpus vocabulary controlled or does it vary freely?** Standardized technical manual → strong BM25. Corpus of emails, meeting notes, free-form text → embedding is needed to capture semantic variation between terms.
3. **How frequently does the corpus change?** High document turnover → re-embedding cost is real; consider whether BM25 alone covers the use case. Stable corpus → vector store becomes more justified with lower maintenance overhead.
4. **Is there a latency requirement the pipeline must meet?** Sub-200ms per response → eliminate or minimize runtime embedding steps. Relaxed latency → full hybrid without constraints.
5. **Does the team have the operational capacity to maintain a vector store in production?** Vector database infrastructure requires embedding versioning, semantic drift monitoring, and model updates when a version is discontinued. Without a team with that expertise, pgvector in an existing database or plain Elasticsearch is a technically defensible choice.

These questions also protect against an adjacent error: scaling to vector database in a small project where none of the conditions that justify the investment are present.

## When the choice becomes reflex, not decision

An observation about what tends to go wrong. The choice between vector database and classic search engine is often not a technical decision — it is a reference decision. The tutorial used Pinecone; the example notebook used ChromaDB; the LangChain default was FAISS. Nobody stopped to ask whether it was the right choice for the specific corpus at hand.

The result: RAG projects in production running a vector database over a corpus of 300 technical documents with exact fields, where Elasticsearch with BM25 would have delivered 15% better recall, 5× lower latency, and zero additional infrastructure. That technical cost does not show up in the pilot — it shows up in the first week of production when the agent cannot find "product X47-BR" and the data team cannot explain why.

[The decision between RAG and fine-tuning has a structured framework](/blog/en/quando-fine-tuning-supera-rag.html) that covers the architectural choice at the highest level. The decision within RAG — which retrieval mechanism to use — deserves the same rigor. Vector database is an excellent piece of infrastructure. It is not the only piece, and it should rarely be the first choice without analyzing what the corpus and queries actually require.
