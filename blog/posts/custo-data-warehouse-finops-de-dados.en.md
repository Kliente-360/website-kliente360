---
title: "Data warehouse cost: data FinOps starts at the model, not the invoice"
slug: "custo-data-warehouse-finops-de-dados"
pillar: "data"
date: "2026-10-20"
readMinutes: 7
excerpt: "Warehouse bills grow faster than team budgets. Five data FinOps levers that cut cost without stalling the analytics roadmap."
tldr: "Data FinOps is the practice of attributing and reducing warehouse compute cost at the model and query level, not just on the monthly invoice. The bill grows because consumption scales with usage while team budgets do not keep up: in a dbt Labs survey, 57% of practitioners report higher warehouse and compute spend, against 36% reporting larger team budgets. The levers that pay off most are cost tagging by owner, rightsizing by runtime test, auto-suspend, incremental materialization and review of recurring queries, in that order."
keywords: ["data FinOps", "data warehouse cost", "Snowflake cost optimization", "BigQuery cost", "dbt incremental", "showback"]
---

**D**ata warehouse cost is the data infrastructure line item that grows the most without anyone deciding it should. Nobody approves a 40% increase in the Snowflake or BigQuery bill: it happens query by query, as more people use the data and more models run every hour. By the time the invoice reaches finance, the cause is spread across hundreds of objects and owners.

Many companies respond by cutting licenses or pausing projects. It does not work, because the spend is rarely where the easy cut is. This article treats data FinOps as an engineering practice: attribute cost to an owner, measure it by model and act on the few levers that concentrate the waste.

## Why the warehouse bill grows faster than the budget

Warehouse consumption grows with adoption, and adoption is exactly what the company wants. More dashboards, more models, more agents querying tables: all of it is variable cost. The data team's budget, on the other hand, is almost always fixed and set once a year.

The mismatch shows in the numbers. According to dbt Labs' State of Analytics Engineering 2026 survey (363 practitioners, April 2026), 57% reported higher warehouse and compute spend, while 36% reported larger team budgets. We cite the figure via [eCorpIT's analysis](https://ecorpit.com/data-engineering-services/), since we could not access the original report; treat it as a directional indicator, not a precise measure.

Two factors make it worse. The first is that the unit price looks small: roughly US$ 2 to US$ 4 per credit on Snowflake depending on the edition, and US$ 6.25 per TiB scanned on BigQuery on-demand, per August 2026 list prices. The second is that the bill is no longer only about the warehouse. Cost now includes serverless, storage, transfer and AI token consumption, and a dashboard that watches only warehouse credits sees part of the total.

> Warehouse cost does not explode because of one bad query: it grows because nobody owns the spend of each model.

## Attribution first: without an owner, there is no optimization

The first lever does not save a cent, yet it comes before the others. Without knowing who generated each slice of spend, any optimization turns into a political negotiation. The data team cuts what it thinks is expensive, the business complains about slowness, and the bill keeps climbing.

The minimum attribution practice has four steps:

1. **One warehouse (or project) per workload.** Separating ingestion, transformation, BI and ad hoc exploration shows how much each costs and lets you size each one properly.
2. **Cost tags by owner and domain.** Every warehouse, schema and job needs a named owner. An object without a tag is an object without an owner.
3. **Showback before chargeback.** Showing a team what it spends, without billing it, already changes behavior. Internal billing only comes in once attribution is stable; the same logic applies to [charging back AI inference, which we covered in AI FinOps](/blog/en/finops-de-ia.html).
4. **A 30-minute monthly review.** The ten most expensive models or queries of the month, with the owner in the room. The list almost always repeats from one month to the next, which is good news: the target is small.

In projects we have followed, the distribution is the usual one: a small fraction of models accounts for most of the spend. That is our estimate, not a market figure, and it is what makes the monthly review pay off.

## The five levers that concentrate the savings

With attribution in place, optimization stops being guesswork. In increasing order of effort, these are the levers that pay off most in a cloud warehouse.

**Rightsizing by runtime test.** A bigger warehouse is not just more expensive: it only pays off if it cuts runtime proportionally. GitLab's data handbook uses a simple rule: dropping one size is only efficient if runtime falls by at least 40%. In their example, a 20% speedup costing 60% more is inefficient. Test each workload at both sizes and choose by cost per run.

**Aggressive auto-suspend.** Snowflake bills per second of runtime, with a 60-second minimum per activation. A transformation warehouse left on between runs just burns credits. Start at 60 seconds and raise it only for interactive workloads, where a warm cache pays for itself.

**Incremental materialization.** A model that reprocesses the whole table on every run is the most common waste in a [dbt](/blog/en/dbt-na-pratica.html) project. A case published by Hightouch reports that switching a bottleneck model to incremental cut about 10 credits per day; combined with a downsize, it saved thousands of dollars a month. The gain depends on the project, but the rule is general: large tables with a date key call for incremental loads.

**Review of recurring queries.** Dashboards that refresh every 15 minutes for an audience that looks once a day, and `SELECT *` queries over wide tables, are the analytics equivalent of leaving the lights on in an empty room. On BigQuery, where cost is per data scanned, partitioning and clustering tables changes spend directly.

**Separating what needs a warehouse from what does not.** Not every transformation requires the most expensive compute. dbt Labs announced Lake Compute at dbt Summit 2026, still in private beta, precisely because most companies run everything from simple staging models to heavy joins on the same warehouse. Even without that product, [open formats such as Iceberg](/blog/en/apache-iceberg-table-format-lakehouse.html) let you move light workloads to cheaper engines.

## How to start without stalling the roadmap

Data FinOps fails when it becomes a parallel project, with its own team and a six-month deadline. It works when it enters the analytics team's normal rhythm. A sequence that fits in one month:

1. **Week 1:** separate warehouses by workload and apply owner tags.
2. **Week 2:** list the ten most expensive models and ten most expensive queries of the last month, with an owner beside each.
3. **Week 3:** apply rightsizing and auto-suspend to the three highest-spend workloads; move candidate models to incremental.
4. **Week 4:** publish the first showback and schedule the monthly review.

There is an important limit: optimizing cost without [data pipeline observability](/blog/en/observabilidade-de-dados.html) is risky. A model that goes incremental and gets the merge logic wrong saves credits and delivers wrong data. Every materialization change needs an equivalence test against the previous version.

The criterion we use to decide how much to invest is practical. If warehouse spend grows faster than the usage it supports, there is structural waste. If it grows in proportion, the problem is budget, not efficiency, and the right conversation is with finance, not with the engineering team.

## Questions that keep coming back

Three questions come up in almost every conversation about warehouse cost.

## What is data FinOps?

Data FinOps is the practice of attributing, measuring and reducing the processing and storage cost of a data platform, with responsibility shared across engineering, analytics and finance. In practice, it means knowing how much each model, query and team costs, and acting on the few levers that concentrate the spend instead of cutting budget linearly.

## How do you reduce Snowflake or BigQuery cost without losing performance?

Start with attribution, then apply five levers: rightsizing by runtime test, 60-second auto-suspend, incremental materialization, review of recurring queries and separation of light workloads. On Snowflake the focus is credits per run; on BigQuery, the volume of data scanned, which partitioning and clustering reduce directly. Test each change against the previous version so you do not trade savings for wrong data.

## When is a growing warehouse bill healthy?

Growth is healthy when it tracks the usage that creates value: more active users, more decisions backed by data, more data products in production. It signals waste when the bill grows faster than useful consumption, or when no owner can explain the ten biggest items of the month. The test is the owner question: who answers for this spend?
