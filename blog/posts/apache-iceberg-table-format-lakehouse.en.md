---
title: "Apache Iceberg won the table format fight — what changes in the lakehouse"
slug: "apache-iceberg-table-format-lakehouse"
excerpt: "Databricks, Snowflake and BigQuery converged on Apache Iceberg as the table format standard — what that changes for whoever decides data architecture."
tldr: "Apache Iceberg is the open table format that became the de facto lakehouse standard in 2026, with native support from Databricks, Snowflake, BigQuery and most relevant query engines. The fight that split data architecture in 2023–2024 no longer exists as a technical choice — it exists as a catalog and operations choice. This piece explains what converged, what still diverges, and what changes in the planning of anyone building or reviewing a data stack now."
keywords: ["Apache Iceberg", "table format", "lakehouse", "Delta Lake", "Databricks", "Snowflake"]
---

**Apache** Iceberg won. Not in the sense of eliminating competitors from the market — Delta Lake is still alive, Apache Hudi is still alive — but in the sense that matters for whoever decides architecture: if you're designing a new lakehouse in 2026 and not thinking of Iceberg as the default table format, you're doing something outside the curve.

The table format fight that split data conferences in 2023 and 2024 — Iceberg, Delta Lake or Hudi, pick one and live with the decision — stopped being a storage architecture choice. It became a catalog and operations choice. That's a good change for whoever buys data technology, but it requires understanding where convergence is real and where a difference that still decides a project remains.

## What actually converged

The clearest sign of Iceberg's win isn't isolated adoption by one vendor — it's the fact that the three biggest warehouse competitors in the market stopped treating Iceberg as a threat and started building native support for it.

**Databricks** — owner of Delta Lake, a direct competing format — now exposes Delta tables as Iceberg (and as Hudi) via Delta Lake UniForm, without duplicating data. Unity Catalog started natively managing Iceberg tables, and the company already advances support for Iceberg v3, with row lineage, deletion vectors and the `VARIANT` type. Whoever built trusting only Delta Lake, without interoperability, now has that path open without rewriting pipelines.

**Snowflake** answered in a more structural way: it created Polaris Catalog, an open-source REST catalog for Iceberg, and donated the project to the Apache Software Foundation. The message behind the donation is direct — the customer can keep data in open Iceberg format, in their own storage, and still get Snowflake's query engine and governance on top. It's an invitation to reduce exit friction, not lock people in.

**BigQuery** took the more pragmatic path: it supports Iceberg tables as external tables and as managed tables via BigLake, fitting the open format inside the same SQL surface the customer already uses.

The rest of the ecosystem follows the same movement. Spark, Trino, Presto, Flink, Hive, Impala, DuckDB, ClickHouse, StarRocks and Dremio have native or near-native support for Iceberg — which means the choice of query engine stopped locking the choice of table format, and vice versa.

> The fight that used to be "which format to choose" became "which catalog operates that format best for your case." It's an easier question to answer — and an easier one to get wrong without noticing.

## What hasn't converged yet

Format convergence isn't operations convergence. Three points remain real decisions, not commodity:

1. **The catalog is where the commercial fight migrated to.** Polaris (Snowflake/Apache), Unity Catalog (Databricks) and BigQuery's native catalog compete to be the place where governance, access control and data discovery happen. Choosing Iceberg as format doesn't resolve that choice — it just pushes it up one layer.
2. **Concurrent write performance still varies by engine.** Iceberg defines the table's format, not how each engine handles concurrent merges, automatic compaction or commit latency. The same Iceberg dataset can behave quite differently running on Spark versus Snowflake versus Flink.
3. **Iceberg v4 promises metadata convergence — but hasn't arrived yet.** Databricks has already signaled that the format's next version will rethink metadata structure with an adaptive tree, proposing that Delta 5.0 and Iceberg share the same metadata layout in the future. It's the most ambitious promise in the recent history of table formats — and, like any promise of full convergence, worth treating as direction, not current state.

The common mistake here is reading "Iceberg won" as "the platform I choose no longer matters." It's the opposite: the platform [still matters — the decision just migrated somewhere else](/blog/en/lakehouse-vs-warehouse.html). Before, you chose a format and stayed locked to it. Now you choose catalog, write engine and operations — and format stopped being the lock-in factor.

## Where this changes architecture planning

For whoever is deciding a data stack now, Iceberg's convergence shifts three questions that weren't even part of the conversation before:

**Migrating between platforms got cheaper — not free.** If the data is already in Iceberg, swapping the query engine that reads that table is a configuration operation, not a full pipeline rewrite. This reduces the mid-term cost of switching vendors, but doesn't eliminate the work of migrating catalog, access policy and compaction jobs — which remain specific to each operator.

**The question "which format to choose" became "which catalog to choose."** Teams that already had Delta Lake don't need to migrate format to gain interoperability anymore — UniForm solves that. What still requires a decision is where the catalog lives and who controls access policy over it.

**Lock-in didn't disappear, it just changed layers.** The same logic that already applies [in the comparison between Databricks, Snowflake and BigQuery](/blog/en/databricks-snowflake-bigquery-lock-in.html) still stands — except the lock-in axis is no longer "which format is my data stuck in," it's "which catalog is my governance stuck in." Evaluating exit TCO today means asking about catalog portability, not table portability.

1. **If you haven't chosen a format yet:** Iceberg is the default choice today — broad support, mature ecosystem, without the "what if I need to switch engines later" question weighing on the decision.
2. **If you already have Delta Lake:** evaluate UniForm before considering format migration — it may solve the interoperability you need without rewriting pipelines.
3. **If the real concern is lock-in:** direct due diligence toward the catalog (Polaris, Unity Catalog, BigQuery's native one), not the table format anymore — that's where real portability is decided now.

## Format convergence doesn't eliminate due diligence — it moves it

The practical gain of Iceberg becoming standard is real: less risk of choosing the wrong format, more freedom to switch query engines without rewriting the storage layer. But [deciding data architecture](/blog/en/multi-cloud-mito-ou-estrategia.html) remains an exercise in understanding where the real dependency lives — and that dependency just migrated from "table format" to "catalog and operations."

Whoever treats Iceberg's win as "problem solved, I don't need to evaluate platforms anymore" will discover the real friction the day they need to migrate catalogs between two providers that implement the same format spec in subtly different ways. Due diligence didn't end. It just moved one layer up — and, for most teams, it's easier to get right than choosing a format blindly was in 2023.

## Questions that keep coming back

Closing out, the most common doubts about what convergence on Iceberg changes in practice.

## What is Apache Iceberg?

Apache Iceberg is an open table format — a specification for organizing metadata, schema and data files over object storage (S3, GCS, Azure Blob) so multiple query engines can read and write the same table with transactional guarantees (ACID), schema evolution and time travel. Unlike a database, Iceberg isn't an execution engine — it's the layer that lets Spark, Trino, Snowflake, BigQuery and others operate on the same data without copying or converting it.

## Do I need to migrate my Delta Lake to Iceberg now?

In most cases, no — you don't need to migrate format, you need to enable interoperability. If your stack already runs Delta Lake, Databricks' Delta Lake UniForm exposes those same tables as Iceberg (and Hudi) without duplicating data, which solves most of the compatibility pain that would motivate a full migration. Format migration only makes sense when the real reason is switching catalog operators, not gaining cross-reading — and that's worth evaluating case by case, not by market default.

## Does Iceberg becoming standard eliminate lock-in risk?

It doesn't eliminate it — it shifts it. Before, lock-in risk was concentrated in the table format: switching platforms meant rewriting your storage pipeline. With Iceberg widely supported, that specific risk dropped. But the catalog managing the Iceberg table — Polaris, Unity Catalog, or each provider's native one — became the new dependency axis: governance, access control and data discovery remain specific to each operator, and migrating that still requires real work.
