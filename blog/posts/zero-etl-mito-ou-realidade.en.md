---
title: "Zero-ETL: is the promise to kill the pipeline real or hyperscaler marketing?"
slug: "zero-etl-mito-ou-realidade"
pillar: "data"
date: "2026-07-28"
readMinutes: 8
excerpt: "Zero-ETL promises to kill the pipeline between database and warehouse. It removes the custom connector — not the modeling, nor the lock-in."
tldr: "Zero-ETL is native, near-real-time replication between a transactional database and an analytical warehouse, offered directly by the cloud provider, with no custom pipeline in between. The gain is real where it exists today: less homegrown CDC connector code, latency dropping from minutes to seconds. But the name hides two points — the work of modeling and governing data doesn't disappear, it just migrates into the warehouse, and every zero-ETL integration only works between two products from the same provider. The question that decides whether it's worth it isn't 'does this kill the pipeline', it's 'does this lock me deeper into a single cloud than I already was'."
keywords: ["zero-ETL", "AWS zero-ETL", "Databricks Lakeflow", "Snowflake Openflow", "data lock-in", "CDC"]
---

**Zero-ETL** is not the absence of a pipeline. It's a pipeline the cloud provider manages, operates and maintains inside its own ecosystem — and bills for in a different way than before. AWS has offered zero-ETL between Aurora and Redshift since 2022 and reached general availability in 2026. Databricks launched Lakeflow, unifying ingestion and transformation under Unity Catalog. Snowflake answered with Openflow, connecting directly to Kafka and Kinesis with no intermediate layer. All three market readings agree on one point: zero-ETL is the main differentiation argument of the three hyperscalers in 2026. What they don't say as clearly is what still counts as manual work after the pipeline "disappears".

This piece separates the real gain of zero-ETL from what is a marketing reframe of a problem data engineering had already been solving for years with custom CDC (change data capture).

## What zero-ETL actually solves

The most mature case is AWS's native integration between Aurora and Redshift, now available for Aurora MySQL and Aurora PostgreSQL. Within seconds of data being written to the transactional base, it shows up ready for analytical querying in Redshift — no extraction job, no intermediate staging, no hand-written connector. Aurora MySQL sustains over one million transactions per minute replicated with p50 latency under 15 seconds. Pionex, a crypto exchange, reported a 98% drop in analytics latency — from minutes to under 15 seconds — and a 90% reduction in pipeline maintenance complexity.

Databricks took the consolidation path: Lakeflow unifies ingestion, transformation and orchestration under Unity Catalog, with Lakeflow Connect offering more than 100 native high-performance connectors. Snowflake bet on direct streaming — Openflow connects to Kafka and Kinesis with no intermediary, and Snowpipe Streaming sustains up to 10 GB per second per table with a predictable, ingestion-based pricing model.

The gain common to all three is genuine: less integration code written and maintained by the data team to solve a problem that was already solved — just handcrafted, with Debezium, Fivetran or a homegrown CDC script. Replacing that code with a managed service from the provider itself reduces maintenance surface and cuts latency from minutes to seconds in simple replication scenarios between transactional database and warehouse.

> Zero-ETL replaces the custom connector with a managed service. That's real engineering savings — it just isn't the same thing as eliminating data work.

## What disappears is the pipeline — not the modeling

Here's the point the marketing message blurs: zero-ETL removes the plumbing, not the logic that ran inside it. [The same argument already held when ELT beat ETL](/blog/en/elt-vs-etl.html) — the real gain wasn't in the acronym, it was in separating ingestion (commodity) from modeling (where the value lives). Zero-ETL takes that argument to its limit: ingestion stopped being even a commodity you contract for — it became a native service from the provider. But modeling, quality and semantics of the data don't disappear. They just migrate into the destination warehouse, run on demand in SQL, instead of running in a separate transformation layer.

This means raw data arrives faster — but it's still raw. Teams that read "zero-ETL" as "zero data work" discover, months later, that the warehouse is full of replicated tables with no schema contract, no test, no owner. It's the same mistake teams made adopting ELT without discipline, just with one extra ingredient: native replication doesn't expose the intermediate schema a custom pipeline used to expose, so the team loses a control point it used to have — the place to filter sensitive data or apply a business rule before load.

**The practical consequence** is that teams adopting zero-ETL without rethinking the modeling layer trade a visible problem (fragile pipeline, breaks in production, 3 a.m. alert) for a silent one (replicated data with no contract, no masking, no owner — discovered only when someone uses the wrong number in an executive report).

## Does zero-ETL eliminate lock-in or deepen it?

Every zero-ETL integration on the market today works between two ends owned by the same vendor. Aurora to Redshift is AWS to AWS. Lakeflow Connect delivers data straight into Unity Catalog — which only exists inside Databricks. Openflow delivers data straight into Snowflake. None of the three has a mature production zero-ETL integration that crosses providers — the "zero" in the plumbing only pays off within the boundary of whoever built both sides.

This [mirrors the same lock-in axis that already applies in the comparison between the three warehouses](/blog/en/databricks-snowflake-bigquery-lock-in.html): the real dependency no longer lives in the data format — [Apache Iceberg resolved much of that by becoming the standard across all three](/blog/en/apache-iceberg-table-format-lakehouse.html) — it lives in the integration layer that only exists inside one closed ecosystem. The more zero-ETL a company adopts, the less practical reason it has to keep a second provider running in parallel, because every new integration raises the cost of leaving, not of entering.

The tooling market's own consolidation reinforces the point. In June 2026, Fivetran merged with dbt Labs — after already acquiring Census in 2025 — bringing ingestion, transformation and activation under a single vendor. The same consolidation instinct driving independent vendors to merge is what drives hyperscalers to push zero-ETL: fewer loose ends between ingestion and consumption means less chance the customer switches provider along the way.

> The pipeline that disappears is the one the team used to maintain. What stays, and grows, is the dependency that both ends of the zero-ETL integration belong to the same owner.

## Three questions to decide if zero-ETL fits your case

This isn't a "is zero-ETL good or bad" question — it's about where it fits your real operating pattern.

1. **Do both ends already live on the same provider?** If the transactional database and the warehouse are already on the same cloud — Aurora and Redshift, or any equivalent native pair — zero-ETL delivers real latency gain with no added lock-in cost, because the platform dependency already existed before the integration.
2. **Is the use case simple replication or heavy transformation?** Zero-ETL handles "bring transactional data into the warehouse near real-time" well. It doesn't handle complex joins across multiple sources, deduplication, or business rules that need to run before load — that still requires dbt, testing and a defined owner, just executed inside the destination warehouse now.
3. **Has leaving the current provider already been ruled out?** If the answer is yes — the company already decided to stay, for any strategic reason — zero-ETL is net engineering gain with no extra decision cost. If the answer is "we don't know yet", every new zero-ETL integration adds a vote toward never leaving.

None of the three, alone, closes the decision — but the third is usually the one the engineering team considers least before turning the integration on, because the latency gain shows up on day one and the exit cost only shows up the day someone tries to migrate.

## The name sells the absence of work — the real operation is something else

Zero-ETL delivers what it promises in a narrow, real slice of the problem: near-real-time replication of transactional data into the warehouse, with no hand-written connector. That's genuine engineering gain, measurable in latency and in maintenance hours that stop existing. But treating it as "eliminates data work" is the same mistake as reading "simplified pricing" as "budget under control" — the label simplifies the visible surface and shifts the real work elsewhere, it doesn't eliminate it.

Whoever adopts zero-ETL after running the three questions above enters the integration knowing what they gained (latency, maintenance) and what they didn't (modeling, governance, freedom to switch provider). Whoever reads the name as a literal promise — zero work — finds the real bill six months later: replicated data with no schema contract, and one more integration that makes leaving the current provider more expensive than it was before turning the "zero" on.

## Questions that keep coming back

Closing out, the three most common doubts about zero-ETL in practice.

## What is zero-ETL?

Zero-ETL is the native, near-real-time replication of data between a transactional system (like an operational database) and an analytical platform (like a data warehouse), offered directly by the cloud provider as a managed service — with no custom extract-transform-load pipeline in between. Mature examples include AWS's Aurora–Redshift integration (general availability in 2026, with p50 latency under 15 seconds), Databricks's Lakeflow Connect and Snowflake's Openflow.

## Does zero-ETL eliminate the need for dbt and data modeling?

No. Zero-ETL eliminates the custom ingestion pipeline — the hand-written CDC connector, the scheduled extraction job. It doesn't eliminate data modeling, quality or semantics, which remain necessary work. The difference is that this work migrates into the destination warehouse, run on demand in SQL, instead of running in a separate transformation layer before load. Teams that skip this step accumulate replicated data with no schema contract, no test and no defined owner.

## Does zero-ETL increase cloud lock-in?

In practice, yes, because every mature zero-ETL integration on the market today connects two ends of the same provider — Aurora to Redshift inside AWS, Lakeflow Connect to Unity Catalog inside Databricks, Openflow to Snowflake. Every new integration adopted raises the cost of migrating to another provider later, because it replaces a pipeline that was portable (written in a neutral tool, like Fivetran or Airbyte) with a native service that only exists inside one ecosystem. The latency gain is real; so is the exit cost.
