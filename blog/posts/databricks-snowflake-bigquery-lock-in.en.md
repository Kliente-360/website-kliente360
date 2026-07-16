---
title: "Databricks vs Snowflake vs BigQuery: lock-in, exit costs and what the official partner doesn't say"
slug: "databricks-snowflake-bigquery-lock-in"
pillar: "data"
date: "2026-05-06"
readMinutes: 8
excerpt: "The three warehouses deliver equivalent performance. The real difference is what each costs to abandon — and no official partner will tell you that in the proposal."
tldr: "The choice between Databricks, Snowflake and BigQuery comes down less to performance — the three are in broad technical parity — and more to lock-in: storage format, processing layer and cloud ecosystem integration. Databricks uses an open format (Delta) but locks you in via notebooks, MLflow and Unity Catalog; Snowflake and BigQuery use proprietary formats — reverse-migrating 50TB out of Snowflake costs US$ 200k–500k in consulting. How to measure the three vectors before signing, and why an official partner can never be the source of the answer."
keywords: ["Databricks", "Snowflake", "BigQuery", "lock-in", "data warehouse"]
---

**T**he question every company asks before choosing a warehouse is "which is best?". The question no one asks, but should, is "which is most expensive to abandon?". In 2026, with Databricks, Snowflake and BigQuery in broad technical parity, the practical difference that will matter over the next 5–10 years is lock-in — and each of the three has a different aprisonment pattern, with a different exit cost, and a different marketing layer to obscure it.

This text enumerates the three lock-in vectors that matter, shows how each warehouse scores in each, and explains why an official partner's comparison is, by definition, partial. Not because the partner lies — because they can only see well the technology they deliver.

## The structural bias of the official partner

Before we get into the vectors, it's worth understanding why partner comparisons are problematic. A Databricks Gold partner earns revenue training teams on Spark, optimizing Delta Lake, selling Unity Catalog. A Snowflake Premier partner earns revenue structuring Snowflake warehouses, optimizing cluster warehouses, selling Streamlit. A Google Cloud partner earns revenue in BigQuery + Looker + Vertex AI.

None of the three can honestly recommend the client leave their platform — not out of bad faith, but because expertise is all concentrated on one side of the choice. Asking a Databricks partner to compare with Snowflake is like asking a soccer coach to recommend a swimming academy. The answer may be technically correct on the surface and structurally biased in the conclusion.

Agnostic consultancy — without resale incentive — is the only arrangement where the comparison can be honest. It is not the general case of the market. Hence this text.

> The question "which warehouse is best?" has 80% of the answer in the public comparative. The 20% that decide are lock-in — and no one with resale incentive will give you that piece.

## Vector 1 — Storage format

Here lives the oldest and most serious lock-in. When data is in a proprietary closed format, migrating requires rewriting, reprocessing, and validating everything.

**Snowflake** uses a proprietary internal format (FDN — Flexible Data Network). A pure Snowflake client has all data in a format only Snowflake reads. Recently, Snowflake started supporting Iceberg (open format) as external tables, but the default operation is still internal. A full exit requires `COPY INTO` of all tables to S3 in Parquet, then re-ingest in another warehouse. At 50TB volume, reverse migration project costs US$ 200k–500k in specialized consulting. That convergence around Iceberg, in fact, [already shifted where lock-in actually lives — from table format to the catalog that manages it](/blog/en/apache-iceberg-table-format-lakehouse.html), which reinforces this vector without eliminating the other two.

**Databricks** with Delta Lake uses open format (Delta) on the client's storage (S3/ADLS/GCS). Data lives in the client's cloud storage, in a format that Spark, DuckDB, Trino and others read. Reverse migration to another processing engine is trivial — just point the new engine to the same bucket. Databricks' lock-in is elsewhere (next vector), not in format.

**BigQuery** uses a proprietary format (Capacitor). It supports export to Parquet in GCS, but internal data is closed. A full exit requires complete extraction via export jobs, similar to Snowflake. Difference vs Snowflake: BigQuery Storage Read API allows external reading without intermediate export — facilitates hybrid stack, but doesn't eliminate lock-in.

Practical scoring:
1. **Databricks**: low lock-in (open format).
2. **BigQuery**: medium lock-in (proprietary, but with external read API).
3. **Snowflake**: high lock-in (proprietary, costly export, although Iceberg is entering).

## Vector 2 — Processing layer and specific SQL

Even with portable data, compute layer and SQL syntax create subtle dependencies.

**Snowflake** has well-adherent ANSI SQL, with proprietary extensions (Snowpark, JavaScript UDFs, Streamlit, Cortex AI) that don't migrate. A company adopting Cortex for generative analysis stays locked into that vendor for that function. Stored procedures in Snowflake JavaScript are total rewrite on another platform.

**Databricks** has multiple engines (Spark SQL, Photon, own serverless SQL). Spark is portable (any cloud, OSS). Photon is proprietary but, being under-the-hood optimization, doesn't create syntactic lock-in. UDFs in Python/Scala are portable (any Spark runs). Real Databricks lock-in: notebooks, MLflow, Unity Catalog, and Workflows — those are an exclusive path. A team that gets used to Databricks Notebooks faces high friction in another tool.

**BigQuery** has SQL standard close to ANSI, with extensions (native ARRAY, STRUCT, BQML, BigQuery ML). BQML for machine learning models is a powerful but exclusive function — migration to another engine requires rewriting models in Python/Spark. Geo functions and ARRAY/STRUCT are more flexible than in Snowflake but, at the same time, create code that doesn't run elsewhere without refactoring.

Practical scoring:
1. **Databricks**: medium lock-in (Spark portable, but notebook/MLflow/Unity Catalog stick).
2. **Snowflake**: medium-high lock-in (SQL portable, UDFs and Cortex not).
3. **BigQuery**: medium-high lock-in (SQL close to standard, BQML and specific functions not).

## Vector 3 — Integration with the cloud ecosystem

The most underestimated lock-in: how much the warehouse is sewn together with other services from the same cloud.

**BigQuery** lives inside Google Cloud. Native integration with Looker, Vertex AI, Pub/Sub, Dataflow, Cloud Storage. Reverse migration is not just warehouse — it's renegotiating the entire data stack that grew around it. A company with Looker + BigQuery + Vertex AI must migrate three products together. Exit cost grows exponentially with time inside GCP.

**Snowflake** runs multi-cloud (AWS, Azure, GCP). That's the main marketing argument — "Snowflake is neutral between clouds". True at compute — but [intentional multi-cloud architecture carries operational overhead that goes well beyond choosing a cloud-neutral warehouse](/blog/en/multi-cloud-mito-ou-estrategia.html). Not true at integrations: Snowflake Native Apps, Snowpark Container Services, Streamlit, Cortex are exclusive. A team adopting those layers re-creates lock-in at another level.

**Databricks** runs on AWS, Azure and GCP natively. Has deep integrations with each (especially Azure, via Microsoft partnership), but the engine is portable between clouds — workspace in AWS migrates to Azure with lower cost than other options. Real lock-in is in Unity Catalog (governance layer) and Workflows (orchestration) — those migrate with refactoring, not simple export.

Practical scoring:
1. **Databricks**: low-medium lock-in in ecosystem (multi-cloud + portable engine).
2. **Snowflake**: medium lock-in (multi-cloud compute, but new features stick).
3. **BigQuery**: high lock-in (lives within GCP, native integrations create compound dependency).

## How to measure before signing

Four practical questions to ask before closing an annual contract.

1. **What % of data lives in open format?** If < 50%, significant technical lock-in. Negotiate explicit support for Iceberg/Delta as external tables.
2. **How much SQL code is portable (pure ANSI)?** Audit the 50 most critical queries. If more than 30% uses proprietary functions, migration is refactoring, not export.
3. **How many native integrations with other products of the same cloud?** If the entire stack lives in a single cloud, moving warehouse is moving the entire stack.
4. **What's the estimated cost of full export?** Ask the partner for an estimate of US$/TB for `COPY INTO`/`EXPORT`. If they don't know or deflect, it's a red signal.

A company that asks these 4 questions before signing pays cheaper, negotiates better clauses, and almost never needs to migrate. A company that doesn't, pays 3 years on the wrong warehouse and discovers the exit cost when the budget doubles.

## The honest choice in 2026

Without resale bias, recommendation by context:

**Greenfield with portability priority**: Databricks with Delta Lake. Client's own storage, open format, multi-cloud engine. Minimum possible lock-in for a modern warehouse.

**Company already on Azure or multi-cloud with mixed workloads**: Databricks or Snowflake. Decision by existing team strength.

**Already-Google-cloud company**: BigQuery, without hesitation — but aware that it's accepting high lock-in in exchange for deep native integration. It's not the wrong decision, it's the informed decision.

**Pure analytical use case, no heavy ML, small team**: Snowflake. Simpler operation, pure SQL, no need to manage Spark.

**Analytical + ML at scale use case**: Databricks (or BigQuery + Vertex if already on Google). Snowflake with Snowpark only partially solves it.

Important: none of these recommendations come from [mid-market comparative](/blog/en/snowflake-bigquery-databricks.html) alone. They come from specific lock-in. For each case, the question "how much does it cost to leave?" is as important as "how much does it cost to run?". Official partners answer the second. The first is for the client to research — or for an agnostic consultant to answer. There's a structural reason for that arrangement.

## Questions that keep coming back

To close, the questions that come up most when this decision lands on the table.

## How much does it cost to migrate from one warehouse to another?

It depends on the lock-in vector, but here's the sobering benchmark: reverse-migrating 50TB out of Snowflake costs US$ 200k–500k in specialized consulting, because it requires `COPY INTO` of every table to Parquet and re-ingestion at the destination. BigQuery's exit looks similar (the Capacitor format is closed, full extraction via export jobs), softened somewhat by the Storage Read API for external reads.

And data is only one part. If more than 30% of your critical queries use proprietary functions (Cortex, BQML, JavaScript UDFs), migration is refactoring, not export. And if the entire stack lives in a single cloud — say Looker + BigQuery + Vertex AI — moving the warehouse means moving the whole stack. That's why "how much does it cost to leave?" has to be asked before signing, not after.

## Which of the three has the least lock-in?

Databricks, on the vector that weighs most: data sits in Delta (open format) on the client's own storage, readable by Spark, DuckDB, Trino and others — switching engines means pointing the new one at the same bucket. Snowflake and BigQuery keep data in proprietary formats, and a full exit goes through costly export.

Least lock-in isn't zero lock-in. Databricks grips you another way: notebooks, MLflow, Unity Catalog and Workflows are exclusive, and a team used to them faces high friction anywhere else. The difference is that this kind of lock-in resolves through process refactoring, not data rescue — which is the expensive kind.

## Can you trust the official partner's comparison?

As the sole basis for the decision, no — and it's not about bad faith. A Databricks Gold, Snowflake Premier or Google Cloud partner earns revenue delivering the platform they represent; their expertise sits entirely on one side of the choice, and they structurally cannot recommend you leave it. The comparison can be technically correct on the surface and biased in the conclusion.

The right way to use the partner: ask the four measurement questions (% of data in open format, % of pure ANSI SQL, native integrations with the same cloud, estimated US$/TB for a full export) and watch the answer. If they don't know or deflect on the fourth, that's a red flag. An honest comparison only comes from someone with no resale incentive.
