---
title: "Postgres in the data platform: when the app database changes address"
slug: "postgres-plataforma-de-dados-lakebase"
pillar: "data"
date: "2026-11-18"
readMinutes: 7
excerpt: "Lakebase and Snowflake Postgres move the application database into the data platform. Five questions to decide when the move pays off."
tldr: "Lakebase (Databricks) and Snowflake Postgres are PostgreSQL databases managed by the data platform vendor itself, with a native path between transactional and analytical data. They do not merge OLTP and OLAP into a single engine: they change who operates the bridge between the two and under which governance. The move pays off for new applications, agent memory and data served to models; for the core database of a legacy system under heavy load, a dedicated database remains the safer choice."
keywords: ["Postgres in the data platform", "Databricks Lakebase", "Snowflake Postgres", "OLTP and OLAP", "pg_lake", "database for AI agents"]
---

**Postgres in the data platform** was an odd idea until 2025. The application database lived on one side, the warehouse on the other, and between them ran a change data capture pipeline someone on the team had to maintain. In May 2025, Databricks announced the purchase of Neon, a serverless Postgres company, for about US$1 billion. Shortly after, Snowflake bought Crunchy Data, at a reported value of about US$250 million. In 2026, the two products that came out of those deals reached general availability.

The question that reaches the decision-maker is direct: should my application database live inside the data platform I already pay for? The short answer is "sometimes". This piece separates what these products actually deliver, what stays the same, and five questions to decide case by case. Where a number comes from a vendor, we say so.

## What Lakebase and Snowflake Postgres actually are

Both are managed PostgreSQL, operated by the data platform vendor, with a native path to the analytical side. The difference lies in how that path is designed.

**Lakebase** inherits Neon's architecture: storage separated from compute, autoscaling, shutdown when idle (*scale-to-zero*) and instant copies of the database for development (*branching*). According to [Databricks' general availability announcement](https://www.databricks.com/blog/databricks-lakebase-generally-available), from February 2026, it supports up to 8 TB per instance, Postgres 17 with pgvector, point-in-time recovery and *sync tables* that keep operational data synchronized with the lakehouse under Unity Catalog. General availability started on AWS, reached Azure in March and Google Cloud at the end of October.

**Snowflake Postgres** builds on Crunchy Data's technology and on pg_lake, an extension Snowflake open-sourced under the Apache license in November 2025. With it, Postgres itself reads and writes Apache Iceberg tables and Parquet files in object storage. Snowflake claims compatibility with existing Postgres applications and support for extensions such as pgvector and PostGIS, and the service is generally available on AWS and Azure.

> Neither of them merges transactional and analytical into one engine. They change who operates the bridge between the two.

This matters because the thesis that "OLAP does not live in OLTP", which we defended when reviewing [what survived of the Modern Data Stack in 2026](/blog/en/modern-data-stack-2026.html), still stands. The transactional database is still Postgres, with Postgres' limits. The warehouse is still a warehouse. What changes is the address and the bill.

## Why data vendors want the app database

The commercial argument has two sides. The first is the bridge. Anyone who read our analysis of [the zero-ETL promise](/blog/en/zero-etl-mito-ou-realidade.html) will recognize the pattern: the vendor takes over replication between the database and analytics, and the team stops maintaining hand-written CDC connectors. That is a real gain for anyone running that bridge today with two or three fragile pipelines.

The second side is agents. When it bought Neon, Databricks said more than 80% of the databases created on the platform were provisioned by AI agents, not by people. It is the company's own data, not an independent measurement, but it points in a direction: agents and AI-generated applications need small, cheap, disposable databases, created and deleted in seconds. Persistent agent memory, data served to models in real time and analytics embedded in applications are the use cases both vendors highlight.

For the vendor there is also a third, less spoken reason: the operational database is where data is born. Whoever hosts the birth of the data has an advantage in hosting everything else.

## What does not change when Postgres enters the data platform

Postgres managed by the data platform is still Postgres. That brings good and bad news.

The good news is the exit. Because it is Postgres-compatible, the database can be exported with the usual tools, such as `pg_dump` and logical replication. The risk of being stuck is lower than with a proprietary format.

The bad news is that the features that justify the move (lakehouse sync, *branching*, unified governance) belong to the vendor, not to Postgres. Leaving the database is easy; leaving the way of working built around it is not. It is the same logic we described in [lock-in and exit costs across Databricks, Snowflake and BigQuery](/blog/en/databricks-snowflake-bigquery-lock-in.html), now applied to the layer that holds up the application in production.

Three practical limits also remain:

1. **Capacity per instance.** Lakebase's 8 TB ceiling covers most new applications, but not the core database of an ERP that has been growing for ten years.
2. **Cold-start latency.** Scaling to zero saves money in idle environments and charges for it in response time on the first connection. In customer-facing applications, this has to be measured, not assumed.
3. **Schema change.** The managed bridge replicates data, but it does not stop a column renamed in the app from breaking the analytical model. The contract between whoever writes and whoever reads is still the team's job.

## Five questions to decide whether the app database should move

The rule we use: the move pays off when at least four of the five answers point to the data platform. With fewer, a dedicated database (RDS, Aurora, Cloud SQL, Azure Database) remains the safer default.

1. **Who consumes the data the app generates?** If analytics, models or agents need the data within minutes, the managed bridge is worth a lot. If the data only feeds a monthly report, a simple pipeline will do.
2. **What is the size and profile of the transactional load?** New applications with moderate volume and irregular peaks fit autoscaling. High, constant write load, thousands of connections and a database close to the capacity ceiling call for a dedicated database.
3. **Has the data platform already been chosen?** The product only makes sense on the platform the company already runs. Choosing Databricks or Snowflake because of the embedded Postgres reverses the order of the decision.
4. **Who answers the incident at 3 a.m.?** A production application database has on-call. If it now lives in the data platform account, the data team inherits part of that on-call, or the responsibility ends up with no owner. Settle this before migrating.
5. **How much does leaving cost?** List what depends on vendor-exclusive features: sync, *branching*, catalog permissions. If the list is long, treat the choice as long term, with the same seriousness as choosing the warehouse.

## Where it makes sense to start, and where it does not

The lowest-risk entry point is new workloads. Internal data applications, agent memory and state, data served to models in real time and development environments that need copies of the database in seconds. In those cases, the gain from not maintaining your own bridge shows up quickly, and mistakes are cheap.

The highest-risk move is migrating the core database of a legacy system that works. A mature transactional database has backup routines, on-call, fine-tuning and people who know its quirks. Moving it to gain an automatic bridge trades a known problem for an unknown one. Our estimate, based on the projects we follow: for a mid-sized company, the first application on the data platform should be a new one, and the decision about the legacy system comes after six months of real operation.

> Start with the new app, not with the database that runs payroll. The managed bridge proves itself where mistakes are cheap.

The move by both vendors is serious and will continue. That does not oblige anyone to move now. It does oblige you to stop treating the application database and the data platform as decisions that never meet.

## Questions that keep coming back

Three doubts come up in almost every conversation about Postgres inside the data platform.

## What is Databricks Lakebase?

Databricks Lakebase is a managed, serverless PostgreSQL database, built on Neon's technology, that runs inside the Databricks platform. It separates storage and compute, scales to zero when idle, creates instant copies of the database and syncs operational data with the lakehouse under Unity Catalog. It is generally available on AWS, Azure and Google Cloud.

## Do Lakebase or Snowflake Postgres replace the application database?

They do for new, moderate-volume applications, especially when data needs to reach analytics, models or agents quickly. For the core database of a legacy system, with heavy load and mature operations, a dedicated database remains safer. The main criterion is who consumes the data and who answers the incident.

## What is the difference between Lakebase and Snowflake Postgres?

Both are Postgres managed by the data platform vendor, but they connect to the analytical side in different ways. Lakebase inherits Neon's serverless architecture and syncs tables with the Databricks lakehouse. Snowflake Postgres comes from Crunchy Data and uses pg_lake to read and write Iceberg and Parquet from Postgres itself. In practice, the choice follows the platform the company already runs.
