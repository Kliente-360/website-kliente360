---
title: "ELT vs ETL: why the fashion changed and what actually matters"
slug: "elt-vs-etl"
pillar: "data"
date: "2026-01-28"
readMinutes: 6
excerpt: "ELT became consensus in almost every architecture deck. But swapping letters isn't the real win — and copying the pattern without understanding why blocks more projects than it unblocks."
tldr: "ELT beat ETL because warehouse compute grew, not because transforming later is virtuous. The real gain is separating ingestion from modeling — and that can be done in any order. A team that adopts ELT without that clarity just swaps one silo for another."
keywords: ["ELT", "ETL", "data warehouse", "data engineering", "Fivetran"]
---

The 2026 data architecture meeting almost always has the same slide: ELT in the spotlight, ETL marked as legacy. The argument that comes with it is "transform later, let the warehouse do the heavy lifting". Sounds modern. And in most cases it's the right call. But the explanation that usually accompanies it — "ELT is better than ETL" — is simplistic and hides the real point. What changed wasn't the virtue of transforming before or after. It was the relative cost of warehouse compute, and what that allowed teams to organize differently.

This text is about why ELT won, what that actually means for a data team, and where blind copying of the pattern still gets in the way.

## What changed since 2018

ETL was born in a world where storing was cheap and processing was expensive. Local storage + compute on a dedicated server meant transforming data before loading made sense — you didn't want to load 100 GB to extract 10 GB of KPI. The transformation was a cost filter.

In 2026, the math inverted. [Cloud warehouses — Snowflake, BigQuery, Databricks](/blog/en/snowflake-bigquery-databricks.html) — charge very cheap storage and elastic compute on demand. Loading raw data costs almost nothing; processing when needed costs what usage costs. Keeping raw historical data became economically trivial. And then transforming before loading stopped making sense — you're paying twice (compute on the prior transformation + load) to save storage that's no longer expensive.

That's the underlying technical reason. It's not "ELT is more modern". It's "the cost bottleneck moved".

## The real gain: separating ingestion from modeling

The most valuable consequence of ELT isn't in E-L-T vs. E-T-L. It's in breaking the operation into two independent projects.

**Ingestion (EL).** Pulling data from Salesforce, Stripe, Postgres, spreadsheets, external APIs. Ideally automated by tooling (Fivetran, Airbyte, Meltano). Schedule, schema, retry, monitoring. It's commodity. Whoever still writes a custom Python connector for SaaS ingestion is throwing money away.

**Modeling (T).** Transforming raw data into a business model: staging → intermediate → marts. [Here dbt becomes the central piece](/blog/en/dbt-na-pratica.html), with versioned SQL, tests, documentation, lineage.

Teams organized this way stop paying consultancies to reinvent the Salesforce connector and spend time where value is — modeling the business. ELT became consensus because that separation became cheap. In ETL, ingestion and transformation were coupled in the same job — breaking one broke the other.

> ELT didn't win because transforming later is virtuous. It won because it allows separating ingestion (commodity) from modeling (value) — and organizing each one properly.

## Where blind ELT still hurts

Cargo-culted ELT adoption, without understanding why, creates three common problems.

**Loading everything "because storage is cheap".** True, storage is cheap, but *finding* data in 800 raw tables isn't. Teams load every schema from every system, and six months later nobody knows which table to use. Quantity becomes noise. Better principle: ingest what serves a use case, expand when another case appears.

**Transforming inside the warehouse without dbt.** Teams migrate from ETL to ELT but write transformations as loose `CREATE TABLE AS SELECT` statements, no versioning, no tests, no documentation. It's just worse ETL, now running inside the warehouse. ELT without discipline is ETL with more mess.

**Forgetting compliance.** In classic ETL, sensitive data (national IDs, email, card numbers) could be filtered *before* loading. In ELT, the raw data goes to the warehouse — including the sensitive parts. Without masking, encryption-at-rest and tagging from day 1, ELT can create privacy liability that ETL avoided by design.

These three cases don't invalidate ELT. They invalidate *bad* ELT, the same way well-done ETL still exists and works in some niches.

## When ETL is still the right answer

The public conversation makes it sound like ETL died. It didn't. There are three contexts where it's still the right call.

**Restrictive compliance where sensitive data can't travel.** Healthcare, finance with specific rules, personal data under jurisdictions that prohibit certain storage. Here filtering before loading is design, not a technical choice.

**Volume so large that raw cloud storage gets expensive.** IoT at scale, financial transaction logs at millions of TPS, industrial sensor data. In some of those, aggregating before loading changes the order of magnitude in cost. Not the rule; an exception worth calculating.

**Old source system with high latency.** When extracting data already takes hours and the destination needs ready data, transforming along the way saves a step. Common in legacy mainframe integration.

Outside these contexts, ELT is the reasonable default.

## The right question, instead of ELT vs ETL

The conversation that matters isn't "which acronym". It's: **who owns the modeling, and how is it versioned**. That applies in both ETL and ELT. A team with a clear owner, transformations in Git, automated tests and living documentation delivers value. A team without those will deliver a mess — regardless of the acronym in the architecture.

[The clean-data myth still applies to both](/blog/en/dado-limpo-e-um-mito.html) — quality is relative to use, not absolute. ELT makes iteration easier (you can remodel without redoing ingestion), but it doesn't change the fundamental rule.

If your company is discussing ELT vs ETL as a strategic decision, it's probably on the wrong question. The strategic decision is how to organize ingestion (buy, don't build) and modeling (versioned, tested, documented). The acronym is a detail.

## Questions that keep coming back

Before wrapping up, the questions that come up most often when this topic hits the table.

## Does ETL still make sense in 2026?

Yes, in three specific contexts. Restrictive compliance where sensitive data can't travel (healthcare, finance with specific rules) — there, filtering before load is design, not a technical preference. Volume so large that raw cloud storage gets expensive (industrial IoT, transaction logs at millions of TPS), where aggregating first changes the order of magnitude of the cost. And legacy source systems with high latency, where transforming in transit saves a step.

Outside those three, ELT is the reasonable default. But well-built ETL still exists and works in those niches — the "ETL is dead" narrative is simplistic.

## Why did ELT become the standard?

Because the relative cost of compute flipped, not because transforming later is a virtue. ETL was born when storing was cheap and processing was expensive; cloud warehouses made storage nearly free and compute elastic on demand, so transforming before load became paying twice to save on something that no longer costs much.

The real gain lives elsewhere: ELT lets you separate ingestion (a commodity — Fivetran, Airbyte, Meltano handle it) from modeling (where the value lives, with dbt, versioned SQL, and tests). In ETL, the two were coupled in the same job — breaking one broke the other.

## What are the risks of adopting ELT blindly?

Three show up often: loading everything "because storage is cheap" and ending up with 800 raw tables nobody knows how to use; transforming inside the warehouse without dbt — loose `CREATE TABLE AS SELECT`, no versioning, no tests, which is just worse ETL; and forgetting compliance, because in ELT sensitive data lands raw in the warehouse and, without masking and tagging from day 1, becomes a privacy liability that ETL avoided by design.

None of these invalidates ELT — they invalidate ELT done badly. The question that matters is still who owns the modeling and how it's versioned, regardless of the acronym.
