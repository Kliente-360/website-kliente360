---
title: "DuckDB and DuckLake: when a single-node warehouse is enough"
slug: "duckdb-ducklake-warehouse-de-um-no-so"
pillar: "data"
date: "2026-11-10"
readMinutes: 7
excerpt: "DuckLake 1.0 gave DuckDB a lakehouse's shape. Five checks to tell whether one node is enough or a managed cloud warehouse is still the right call."
tldr: "DuckDB is an embedded analytical engine that runs inside your process with no server, and DuckLake 1.0 (April 2026) added a table format to it, with the catalog in a SQL database and the data as Parquet in object storage. For volumes up to a few hundred GB and a few dozen users, that pairing covers what many mid-sized companies pay for as a managed warehouse. High concurrency, native governance and heavy writes still favor the cloud warehouse, and a hybrid design is usually the safest starting point."
keywords: ["DuckDB", "DuckLake", "data warehouse", "lakehouse", "warehouse cost", "Parquet"]
---

**DuckDB** is the analytical engine most data teams already use on a laptop and almost none consider as a production backend. The question changed in April 2026, when the DuckDB team declared DuckLake 1.0 production-ready. With a transactional table format and its own catalog, the single-node engine now competes, for moderate volumes, with the warehouse a company subscribes to by the credit.

This text does not argue for replacing Snowflake with a server. It proposes five checks for deciding when one node is enough, and where the managed warehouse is still the right answer. Where a number comes from a vendor, we say so; where it is opinion, we say that too.

## What DuckLake 1.0 changes for DuckDB

DuckDB alone reads and writes files, but it does not offer what a warehouse offers: versioned tables, transactions across several tables and snapshot views. DuckLake fills that gap with a simple idea: the data stays in Parquet files in object storage, and the metadata (schema, snapshots, file list, statistics) lives in an ordinary SQL database such as PostgreSQL, MySQL, SQLite or DuckDB itself, according to the [DuckLake documentation](https://book.st-hakky.com/en/data-platform/ducklake-1-0-iceberg-difference).

That removes the dedicated catalog server, one of the most awkward parts of operating a lakehouse. Version 1.0 also brought sorted tables, bucket partitioning and *data inlining* (small writes stored directly in the catalog, without producing tiny files).

There is an important exit: data and deletion files are compatible with Apache Iceberg, so you can migrate to Iceberg by swapping only the catalog, without rewriting data. Readers of our analysis of [Apache Iceberg as the table-format standard](/blog/en/apache-iceberg-table-format-lakehouse.html) will recognize the gain: choosing the engine no longer locks in the choice of format.

> For moderate volumes, a SQL-database catalog and Parquet data deliver the essentials of a lakehouse without running a cluster.

## When one node is enough: five checks

Our rule is conservative: DuckDB is the right backend only when all five checks below point to it. If one points to the warehouse, a hybrid design is usually better.

1. **Volume.** Below roughly 100 GB compressed, DuckDB almost certainly copes. Between 100 GB and a few TB, it works with careful partitioning, but the warehouse may be simpler. Above that, and growing, go with a warehouse. These bands come from [Basedash's analysis](https://www.basedash.com/blog/duckdb-for-bi-when-single-node-analytics-beats-a-cloud-warehouse), a BI vendor, and match our experience as an order of magnitude.
2. **Concurrency.** Up to a few dozen BI users, the one-process-per-query model holds. Hundreds of simultaneous users call for a warehouse or a hosted service such as MotherDuck. A single process serving 500 dashboards at once will queue.
3. **Multi-tenancy and governance.** DuckDB has no native row-level access control, roles, column masking or audit trail. If compliance requires those in the engine, the warehouse already ships them.
4. **Freshness and writes.** DuckDB is optimized for batch and interactive analytical queries, not for high-volume continuous ingestion or change data capture (CDC). In DuckLake, updates go through `MERGE INTO`, and without a primary key deduplication is not guaranteed.
5. **Workload shape.** Joins between very large fact tables tend to favor a distributed engine that splits the work across nodes. On one node, memory and time grow together.

DuckLake itself also has maturity limits: engine support is still mostly DuckDB (Spark, Trino and DataFusion are in development) and there are no indexes, primary keys or foreign keys. A DuckDB-based catalog serves a single client; for shared reads and writes, use PostgreSQL or SQLite.

## What about cost? A vendor number, treated as one

The comparison that circulates is tempting: a small Snowflake warehouse would cost between US$1,500 and US$5,000 a month for the same work, against about US$200 for a dedicated server. That is a BI vendor's estimate, not an independent measurement, and it leaves out the most real line on the bill: the time of whoever operates it.

What we stand behind is narrower. Your own server costs less in infrastructure but moves the cost to people: backup, upgrades, monitoring, memory control and a plan for when the node goes down. For a company without a dedicated data engineer, that cost can exceed the savings on the invoice. The math favors a single node only when someone already has the time and appetite to operate it, or when a hosted service covers that part.

If your problem is the warehouse bill, start with the measures in [data FinOps starting at the model, not the invoice](/blog/en/custo-data-warehouse-finops-de-dados.html). Switching engines to escape a poorly designed model only changes the address of the waste.

## The hybrid pattern: warehouse for the whole, DuckDB for the hot path

In practice, the best use we see is not replacement but division of labor. The warehouse stays as the system of record, with governance and concurrency. DuckDB enters where cost per query weighs and the data is stable:

1. **Export to Parquet** the datasets that feed high-traffic dashboards, in a partitioned directory.
2. **Serve those queries from DuckDB**, inside the BI tool or a small service, instead of waking the warehouse on every click.
3. **Set the memory and thread limits** of each process. Without that, a single user can take down a shared server.
4. **Keep the warehouse as the single source** and treat the exported Parquet as a disposable copy, rebuildable in minutes.

The market report is that this arrangement cuts 60% to 80% of the warehouse spend attributed to dashboard traffic. The figure comes from the same vendor analysis and should be checked against your own query pattern before becoming a target. The risk the arrangement brings is that of any copy: two places holding the same data, and the question of which one is right. That is a good reason to treat exported Parquet with [data contracts](/blog/en/data-contracts.html) from day one.

## When to keep the managed warehouse

There are cases where the honest answer is to leave things alone. If the company already has [a well-modeled, governed warehouse](/blog/en/lakehouse-vs-warehouse.html), with dozens of teams consuming it and audit requirements, the savings from swapping the engine rarely justify the risk. The same holds when volume passes a few TB and keeps growing, or when the workload is continuous ingestion.

DuckDB makes the most sense in three scenarios: internal data products of medium volume, development and test environments that currently burn warehouse credits, and exploratory analysis that should not compete for resources with production. In all three, the cost of being wrong is low and the gain from learning the engine is real.

## Questions that keep coming back

Three questions come up in almost every conversation on this topic.

## What is DuckLake?

DuckLake is an open table format, released as version 1.0 in April 2026 by the DuckDB team, that stores data as Parquet files in object storage and metadata in a SQL database such as PostgreSQL or SQLite. The reference implementation is a DuckDB extension. Its files are compatible with Apache Iceberg, so you can migrate by swapping only the catalog.

## Does DuckDB replace Snowflake or BigQuery?

Only in a narrow profile: volume up to a few hundred GB, a few dozen users, little continuous writing and governance solved outside the engine. Outside that profile, the managed warehouse remains safer. For most mid-sized companies, the useful answer is hybrid: the warehouse as the system of record and DuckDB serving hot traffic and test environments.

## How much data can DuckDB handle?

There is no single ceiling, because the limit depends on memory, partitioning and the shape of the queries. As an order of magnitude, below 100 GB compressed is comfortable, and between 100 GB and a few TB needs careful partitioning. Above that, the combination of large joins and continuous growth favors a distributed engine.
