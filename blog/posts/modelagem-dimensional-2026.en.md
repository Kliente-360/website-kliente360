---
title: "Does dimensional modeling still matter in 2026? Yes — a defense against lakehouse-for-everything"
slug: "modelagem-dimensional-2026"
pillar: "data"
date: "2026-04-22"
readMinutes: 6
excerpt: "Lakehouse became the standard of the moment. But dimensional modeling (Kimball) hasn't died — it's more relevant than ever. Where it beats raw lakehouse."
tldr: "Dimensional modeling (Kimball, star schema) is still the best way to organize data for analytical consumption in 2026 — because lakehouse solved storage and format, not semantic modeling. Dimensional wins in four situations: metrics reused across executive BI, predictable performance (5–50× faster than raw lakehouse), dimension history (SCD) and semantic governance. Teams that skip modeling to move faster spend the next 18 months rebuilding it inside the lakehouse. The architecture that works: lakehouse as storage, dimensional in the gold layer."
keywords: ["dimensional modeling", "Kimball", "lakehouse", "data warehouse", "dimensional"]
---

The question showing up in data committees in 2026: "is dimensional modeling still worth it? doesn't lakehouse solve everything?". The honest answer — yes, it's still worth it — goes against some of the fashion. But the fashion is wrong, or at least selling lakehouse for a problem that isn't a lakehouse one. Dimensional modeling (Kimball, star schema, fact + dimension) continues to be the best way to organize data for analytical consumption — and confusing "store data anyhow" with "model for use" costs dearly for companies that haven't lived the full cycle yet.

This text is the defense of dimensional modeling in 2026. It's not nostalgia — it's a practical argument about where the approach still wins and why abandoning it has a strong rework comeback. [When lakehouse is genuinely the right architecture — and when it isn't — has its own separate criteria](/blog/en/lakehouse-vs-warehouse.html).

## What changed and what didn't

In 2018, dimensional modeling was the undisputed standard. In 2022, lakehouse (Databricks Delta, Snowflake Iceberg, Apache Iceberg on any storage) became a serious alternative. In 2026, part of the market declared "modeling is dead" — and that declaration is wrong because it confuses two separate problems.

**What changed: storage and format.** Lakehouse allows storing raw, semi-structured data in open parquet. Storage cost dropped. Schema-on-read replaces schema-on-write in many cases. Heavy ETL to organize storage became unnecessary.

**What did NOT change: the need for semantic modeling.** Even in lakehouse, at some point someone needs to decide: what's an "active customer"? How do you count revenue? How does the "product" dimension relate to the "sale" fact? That decision is semantic — it doesn't go away by changing storage format.

Whoever confuses the two thinks lakehouse replaces modeling. It doesn't. It just delays. And delaying semantic modeling is the most expensive way to discover in 18 months that you needed it.

> Lakehouse solved storage. It didn't solve semantic modeling — and no technology will, because modeling is a business decision. Companies confusing the two buy lakehouse and find the gap in production.

## Where dimensional modeling wins in 2026

Four specific situations where dimensional (even on top of lakehouse) is still the right approach.

**1. Executive BI with metrics reused across N dashboards.** When 20 different dashboards compute "quarterly revenue", that logic needs to live in a single model — sales fact × time dim × product dim, with pre-computed aggregates. Without it, [each dashboard has its own version of the metric](/blog/en/self-service-bi.html), and leadership loses confidence. Dimensional solves it.

**2. Predictable performance on analytical queries.** Raw lakehouse with schema-on-read works well for ad-hoc exploration. For recurring analytical queries (dashboard, report, executive dashboard), pre-aggregated dimensional is 5–50× faster. Predictable performance matters when 100 users hit the same dashboard at noon.

**3. Dimension change history (SCD).** "Customer John moved from Premium to Enterprise segment in March". You need a sales report for Q1 considering the segment at the time — not the current one. SCD Type 2 in dimensional solves this elegantly. Raw lakehouse without modeling forces custom code in every query. In 18 months of operation, that becomes a nightmare.

**4. Institutionalized semantic governance.** Dimensional model forces documentation ([dbt mart is the modern expression](/blog/en/dbt-na-pratica.html)). Whoever maintains the dimensional model maintains the company's semantic glossary. Raw lakehouse without semantic modeling invites "each one with their interpretation" — and [data catalog doesn't solve it](/blog/en/data-catalog-ninguem-usa.html), it only amplifies what exists.

These four are well covered by dimensional modeling. Lakehouse covers 60–70% of them partially, but with governance cost that becomes liability.

## The "lakehouse-for-everything" trap

The thesis sold by some players: "store everything raw, modeling is overhead, analysts model when they need to". Sounds modern. In practice, three problems show up in 12–18 months.

**Problem 1: every analyst becomes an architect.** Without central modeling, each one decides how to join fact and dimension. Result: 10 different versions of the same analysis, chronic divergence. Equivalent to what [badly governed self-service BI produces](/blog/en/self-service-bi.html), at a deeper layer.

**Problem 2: performance degrades silently.** Query that ran in a second on dimensional warehouse becomes 30 seconds on raw lakehouse. The team tries to optimize with cache, materialized view, partition — and reinvents dimensional modeling case by case, without the fancy name.

**Problem 3: history becomes spaghetti.** Without well-designed SCD, "customer in March" and "customer today" get confused. Historical analysis becomes incorrect. The team finds out at audit, at the worst time.

These three combined produce the same effect: a company that skipped dimensional modeling to "go faster" spends the next year reconstructing dimensional modeling inside the lakehouse, with different names but same structure. The shortcut wasn't a shortcut.

## The approach that works in 2026

It isn't "lakehouse vs dimensional". It's **lakehouse as storage, dimensional as semantics**. Layered:

- **Bronze (raw lakehouse).** Data ingested without modeling, in open format. Cheap storage, flexible schema, source of truth for reprocessing.
- **Silver (modeled lakehouse, still flexible).** Cleansing, deduplication, basic conforming. Still flexible, but with defined schema.
- **Gold (dimensional, dbt mart, semantic layer).** Fact + dimension, pre-computed metrics, strong governance. Where dashboards and executive BI consume.

That pattern (medallion architecture popularized by Databricks) is the consensus today among those who operated both worlds. Lakehouse doesn't replace dimensional — they complement.

Companies implementing only bronze + silver have a chaotic warehouse masked as modern lakehouse. Companies implementing bronze + silver + gold have the best of both worlds.

## The rule before dropping dimensional modeling

Five questions to answer before accepting the "let's go lakehouse and no modeling" thesis:

1. **How many executive dashboards does the company have?** Above 20, dimensional modeling in the gold layer is almost mandatory. Without it, chronic divergence.
2. **Do you need dimension change history?** Customer who changed segment, product that changed category, rep who changed team. If yes, SCD in dimensional is cleaner than custom code.
3. **How many technical users will model?** If above 10 people modeling, central semantic governance is necessary. Otherwise, each one invents.
4. **Does the company already have [dbt running](/blog/en/dbt-na-pratica.html)?** If yes, dimensional modeling via dbt mart is the natural path. Doesn't require new tech — just discipline.
5. **Is query performance critical in any case?** Dashboard with 100 concurrent users, real-time operational report. If yes, dimensional pre-aggregation beats raw schema-on-read.

Answering the five with yes or "it depends", dimensional modeling still pays off. Refusing the rule is entering the 18-month cycle to rediscover what it would solve.

## The decision for 2026

If your company is debating "lakehouse and modeling is overhead", three honest moves:

**Adopt medallion architecture.** Bronze + silver in lakehouse, gold in dimensional via dbt mart. Not trade-off — complementary.

**Identify the 10 critical gold models.** Central metrics (revenue, churn, activation, conversion) deserve careful dimensional modeling, with SCD where applicable, serious documentation. Others can stay lighter.

**Resist "let's model later".** [Same mistake as clean data later](/blog/en/dado-limpo-e-um-mito.html). Modeling when the problem explodes is 5× more expensive than modeling when use begins.

Dimensional modeling in 2026 isn't nostalgia. It's the method tested for 30 years to organize data for analytical consumption — and no storage evolution made it obsolete. Lakehouse is a new piece; dimensional is still the method. Whoever combines the two delivers a solid platform. Whoever tries to substitute one for the other finds the gap in 18 months, usually in a hard meeting about a diverging number.
