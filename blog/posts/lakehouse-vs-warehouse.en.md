---
title: "Lakehouse Is Not a Silver Bullet: When Plain Warehouse Still Wins"
slug: "lakehouse-vs-warehouse"
pillar: "data"
date: "2026-07-01"
readMinutes: 7
excerpt: "Lakehouse or plain warehouse? The answer depends on data volume, variety, and team maturity — not on the vendor pitch."
tldr: "Lakehouse adds engineering layers that only make sense when data volume and variety justify them. Most mid-market companies haven't reached that point yet. Before adopting, answer three questions about your use case and decide with honest TCO — not a vendor deck."
keywords: ["lakehouse", "data warehouse", "Databricks", "Snowflake", "data architecture"]
---

Every data conference has at least one slide with lakehouse architecture at the center. Delta Lake on S3, Apache Iceberg managing schema, Databricks or Spark processing SQL and Python in the same place. It's an elegant architecture that solves a real problem — and that has become a sales template to solve *any* problem, including those it isn't the right answer for.

If you're a CTO or technical decision-maker at a mid-market company, you've probably received the proposal in recent months. This piece is about when lakehouse is the right choice, when a plain warehouse still wins, and how to tell the two apart without falling into platform ideology.

## What Lakehouse Solves — and What It Doesn't

Lakehouse was born from a legitimate problem: data lakes on S3 store data cheaply in any format but don't run SQL queries well. Warehouses like BigQuery and Snowflake run queries excellently but are expensive for storing large volumes of raw data and don't support ML workloads natively. The lakehouse architecture, popularized by Databricks' Delta Lake and later by Apache Iceberg, proposes a transactional layer on top of object storage — ACID, schema enforcement, SQL over Parquet in the same place as ML notebooks.

For organizations that have all three problems simultaneously — industrial-scale volume, analytical *and* ML workloads in production, mixed teams of engineers and scientists — lakehouse is the right answer. The mistake is assuming "what works for a company with dozens of data engineers works for a company with two."

> The right architecture is the simplest one that solves your use case. An overly elegant lakehouse for the problem you have is technical debt with a pretty name.

## When Lakehouse Actually Makes Sense

Three conditions must exist simultaneously for lakehouse to be the rational choice:

1. **Volume and variety that managed warehouse can't handle at reasonable cost.** IoT data at industrial scale, event logs at hundreds of millions of records per day, continuous streaming data, multiple sources with radically different schemas. If the company has a CRM, an ERP, and a few SaaS integrations, managed warehouse handles it comfortably.
2. **ML running in production — not in pilot, not in a plan.** Lakehouse makes sense when the same data platform needs to serve SQL analytics queries *and* model feature stores *and* training workloads. If the team is BI analysts with eventual interest in ML, a warehouse is sufficient and will be for years. "ML plans" don't justify architecture — production models do.
3. **Mature engineering to operate what lakehouse demands.** Delta Lake and Iceberg have concepts that don't exist in managed warehouses: compaction, Z-ordering, vacuum, time travel with managed retention, schema evolution with backward compatibility. These are weekly engineering decisions. A small team without experience in this stack drowns, and the platform becomes a maintenance burden instead of a scale gain.

If any one of the three is missing, you're adding complexity without the corresponding gain.

## What Plain Warehouse Still Delivers — and Better

For most Brazilian mid-market companies, the data profile is transactional and structured: CRM, ERP, e-commerce, B2B SaaS. Volume in the low-terabyte range, at most a few dozen terabytes. [Snowflake, BigQuery, Databricks SQL Warehouse](/blog/en/snowflake-bigquery-databricks.html) operate comfortably in this scope with standard SQL, elastic compute, and essentially zero operations overhead.

Stack [ELT on top — ingestion tooling to move data, dbt for modeling](/blog/en/elt-vs-etl.html) — and the team delivers reliable analytics in four to six weeks. The same setup in lakehouse takes three to four months, requires an engineer familiar with Iceberg or Delta, and demands compaction governance from day one. The analytical output is equivalent; the cost to get there is not.

Three concrete advantages of managed warehouse for this profile:

- **Built-in SaaS operations.** Vacuum, compaction, upgrades, performance monitoring: included in the license. In self-managed lakehouse, these are weekly engineering routines that consume time that could go toward modeling data.
- **SQL as a shared language.** In a warehouse, a functional business analyst learns to operate in days. In lakehouse with Spark SQL or PySpark notebooks, the minimum functional team requires more specialization.
- **Predictable cost at mid-scale.** Lakehouse becomes competitive at petabyte scale. At terabyte scale, managed warehouse typically has lower TCO once engineering operations are factored into the calculation.

[Well-built dimensional modeling on top of managed warehouse](/blog/en/modelagem-dimensional-2026.html) covers 90% of mid-market analytical use cases. The remainder rarely justifies the difference in cost and implementation lead time.

## Two Profiles That Call for Different Answers

Companies arriving with a request to "migrate to lakehouse" typically fall into one of two scenarios.

**Profile A: the company genuinely grew.** Volume tripled, the data team has an ML scientist in production, the warehouse is struggling with complex queries or raw data storage costs. Here, evaluating migration makes sense — but evaluating it alongside a tier upgrade on the current warehouse, not as automatic replacement. In many cases, increasing the tier or restructuring the billing model solves the problem for another one or two years at lower TCO than a full stack migration.

**Profile B: the CTO went to a conference.** Came back wanting lakehouse. The company's data fits in two well-organized marts. The team is three analysts and one engineer. The vendor proposal has twelve slides with a reference architecture from a company with three hundred engineers. The work of a specialized consultancy in this case is honest: the architecture is elegant, but the problem it solves is not yours.

The signal that warehouse is still sufficient: modeling is working, marts serve the active use cases, and the real bottleneck isn't the architecture — it's missing data ownership, a quality process, or a modeling contract with the business.

## Three Questions Before Any Platform Evaluation

Before entering a demo, before asking for a benchmark, before requesting a proposal:

1. **What specific workload can't you run today that lakehouse would solve?** If the answer is vague — "scale better," "be more modern," "support ML in the future" — the problem isn't defined. A new platform doesn't define problems; it amplifies what already exists.
2. **Who will be operating it in twelve months?** If the answer is the same two already-overloaded engineers, the operational risk is real. Lakehouse without a dedicated team becomes a maintenance liability. And hiring a senior Iceberg engineer in the Brazilian market carries its own costs and timelines.
3. **Is the total cost of migration and operations in your three-year plan?** Moving from warehouse to lakehouse is not a lift-and-shift — it's pipeline rewrites, a learning curve on a new stack, a different observability layer, potentially a new hiring profile. That cost rarely shows up in the vendor deck and rarely fits in the initial budget.

In specialized consultancy practice, most mid-market companies that honestly answer these three questions conclude that managed warehouse is still the right call. This diagnosis isn't conservative — it's what the numbers show when the calculation is done without platform ideology.

## The Right Decision Is Less Elegant

A well-operated warehouse, with [dbt for versioning, documentation, and model testing](/blog/en/dbt-na-pratica.html), covers mid-market analytics for years. Lakehouse has its place — in event-intensive data environments, in operations with mature ML, in teams with solid engineering that needs what managed warehouses don't deliver well.

The conversation that matters isn't which architecture has more conference slides. It's who owns the data, how modeling is versioned, and which use cases the platform serves today. Buying lakehouse without the workload that justifies it is paying for a jet engine in a city car — the car moves, the engine doesn't help, and the maintenance bill shows up at the next service.
