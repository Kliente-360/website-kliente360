---
title: "Vector databases compared: Pinecone, Weaviate, pgvector — when each one fits"
slug: "vector-databases-comparados"
pillar: "ai"
date: "2026-03-03"
readMinutes: 6
excerpt: "Every RAG discussion focuses on the LLM. But where the embeddings live decides latency, cost and scale. Honest comparison of the three popular paths in 2026."
tldr: "Pinecone optimizes for large managed operations. Weaviate delivers open-source flexibility with native RAG features. pgvector is the option nobody wants to admit is enough in 70% of cases. Choice criteria depend more on operational context than on raw performance."
keywords: ["vector database", "Pinecone", "Weaviate", "pgvector", "RAG"]
---

The RAG architecture meeting almost always has the same skew: 80% of time discussing which LLM to use, 20% discussing which vector database. The ratio should be inverted. [In RAG, retrieval is the bottleneck](/blog/en/rag-na-pratica.html), and where the embeddings live decides latency, cost, scale and operability in production. Switching LLMs in 2026 is commodity; switching vector DBs after 50 million embeddings indexed isn't.

This text compares the three popular options — **Pinecone**, **Weaviate** and **pgvector** — with the ruler that matters: operational context, not raw benchmark.

## What three different paths really are

Before comparing, worth separating what each one represents in design.

**Pinecone.** Managed service, fully cloud, optimized for large operations without thinking about infra. Pay-as-you-go per stored vector and per query. Focus on operational stability, low consistent latency, automatic horizontal scaling. The option that sells to the CTO who doesn't want a dedicated infra team for vectors.

**Weaviate.** Open-source with a managed cloud version. More than a vector DB — delivers native RAG (embedded embedding, generation and reranking modules), hybrid filtering, schema-aware. Focus on architectural flexibility and on whoever wants to run their own (on-prem or private cloud). The option that pleases the engineer who likes to configure.

**pgvector.** PostgreSQL extension. Not a "vector DB" — it's Postgres with vector support. Doesn't scale like Pinecone, doesn't have native RAG features like Weaviate. But it's Postgres — which your company already runs, your team already knows, your backup already covers. The option nobody mentions at conferences but that solves more cases than admitted.

Choice rarely is "which is fastest" (all are fast enough at mid-scale). It's "which fits your operation".

## When Pinecone makes sense

Three contexts where Pinecone is justified:

**Operation at already-large or predictably-large scale.** Above ~50M embeddings, or with consistent sub-50ms global latency requirement. Pinecone is architecturally optimized for that range.

**Team with no appetite for operating vector infra.** When the trade-off of paying 3× more to not handle cluster, sharding, scaling, vector index backup is worth the money. Small team focused on product, not platform.

**Multi-region with aggressive SLA.** If the application has to serve RAG with low latency in America, Europe, Asia, Pinecone has managed global replication that would be very expensive to replicate with Weaviate or pgvector.

Outside these three, Pinecone tends to be overshoot. Team already has technical capacity and operations aren't huge? Worth considering the other two.

## When Weaviate makes sense

Weaviate sits in the middle:

**Need for native RAG in the database.** Weaviate embeds embedding, generation and reranking modules. If your architecture wants a complete RAG pipeline inside the database — instead of orchestrating external Python — Weaviate delivers it. Pinecone requires an additional stack; pgvector too.

**Heavy hybrid filtering.** When queries need to combine vector search + complex structured filter (category + date + tenant + tag), Weaviate has strong optimization. Pinecone has filtering but with limits; pgvector depends on plain Postgres.

**Data sovereignty / on-prem.** Company needs to run the database in its own infra (compliance, cost, control). Open-source Weaviate runs on Kubernetes, Docker, dedicated machine. Pinecone is cloud-only.

Weaviate suffers when the team has no expertise operating distributed databases. Configuring it well requires knowledge — different from Pinecone (no configuration) and from pgvector (known Postgres).

## When pgvector makes sense (more often than admitted)

The least discussed and most underestimated case in 2026:

**Medium volume (up to ~10M embeddings).** Postgres with pgvector + ivfflat or HNSW resolves queries in <100ms in that range. Above that, it starts to struggle. But most mid-market companies sit below that ceiling.

**Company already has Postgres in production.** Same team, same backup, same observability. Adding pgvector is configuring an extension, not adopting new tech. Incremental operational cost: near zero.

**RAG over relational data.** When embeddings need to be cross-referenced with structured data (customer, product, transaction tables), pgvector allows native JOIN. Pinecone and Weaviate require external orchestration.

The common objection: "but pgvector doesn't scale". True — it doesn't scale like Pinecone. For a company with 5M embeddings growing 10% a year, it'll work very well for 4–5 years. Why buy a Ferrari to go to the corner store?

> In 70% of mid-market cases, pgvector solves the use case. The other 30% justify Pinecone or Weaviate. Inverting that ratio is the most expensive RAG mistake in 2026.

## The honest criteria to choose

The ruler we apply before any project:

1. **Volume expected in 18 months, not today.** Underestimating leads to migration; overestimating leads to overspend. Calculate: docs × chunks per doc × average embedding size × safety multiplier (1.5–2×).
2. **Latency acceptable for the use case.** Internal chatbot tolerates 500ms. Real-time research assistant requires <100ms. Sub-50ms global costs a lot. Calibrate by use, not desire.
3. **Query pattern.** Pure vector search? Combined with filter? JOIN with relational data? The answer completely changes the choice.
4. **Team operational capacity.** Small team without distributed expertise = Pinecone or pgvector (if it fits). Strong Kubernetes/database team = Weaviate becomes viable. Forcing against that profile costs dearly.
5. **Compliance and location.** Sensitive data, geographic restriction, on-prem requirement. Pinecone (cloud-only) drops out automatically in restricted cases.

Whoever answers the five without hesitating knows how to choose. Whoever hesitates doesn't have a defined use case — and the choice will be made by hype, not by need.

## The "let's start with X and migrate later" trap

The phrase that looks pragmatic and costs dearly: "let's start with Pinecone, and if it gets expensive we migrate to pgvector". Migrating a vector DB with productive volume is a serious project — reindexing 20M embeddings with new generation, validating parity, redirecting traffic without loss. Costs 6–12 weeks of senior engineering.

The cheaper version: start simple (pgvector) and step up to Pinecone/Weaviate when it *actually* stops fitting. Migrating up is cheaper than migrating down (because the new requirements that justify the upgrade are already clear). Migrating down is cutting features and losing operationally.

Whoever picks Pinecone "for safety" spends 5–10× more in the first year and rarely uses the capacity. Whoever picks pgvector and scales later pays progressively, as the use case proves value.

## The decision for 2026

If you're stuck on this choice today, three honest moves before signing:

**Calculate real volume in 18 months.** If it fits in pgvector, start with pgvector. If it crosses 50M, jump to Pinecone. Between those, it depends on criteria 3–5.

**Pilot with real data, not synthetic benchmark.** The three deliver ~similar in benchmark. With real data, real queries, real filters, the differences show. A 2-week pilot with 1M real embeddings already shows which fits.

**Remember vector DB is a piece, not a strategy.** [Retrieval is the bottleneck](/blog/en/rag-na-pratica.html), but inside retrieval, the database choice is one layer. Without good chunking, suitable embedding and reranking, any database will deliver mediocre results.

The worst decision is to spend three months choosing the perfect vector DB and three weeks implementing bad RAG. The best is to choose a "good enough" database and invest the saved time in pipeline quality.
