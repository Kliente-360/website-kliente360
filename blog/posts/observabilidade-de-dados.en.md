---
title: "Data observability: catching pipeline failures before stakeholders do"
slug: "observabilidade-de-dados"
pillar: "data"
date: "2026-06-30"
readMinutes: 6
excerpt: "Pipelines fail silently. Data observability catches quality failures before the business finds out through a wrong report."
tldr: "Data observability is the ability to detect failures — in volume, freshness, distribution, and schema — before the business feels them. Most teams discover problems when someone complains; with the right instrumentation, you detect first. It's not just infrastructure monitoring: it's knowing what's normal in your data and alerting when it deviates."
keywords: ["data observability", "data quality", "data pipeline", "data monitoring", "data reliability"]
---

Every Monday morning, someone on the analytics team answers the same kind of message: "the number of closed contracts on the dashboard looks wrong." Sometimes it's a pipeline bug that ran with a silent failure. Sometimes it's a schema change in the source system that wasn't communicated. Sometimes data arrived 18 hours late — and the dashboard, faithfully, showed what was there. In all cases, the person who discovered the problem was the user — not the data team.

Data observability is the practice of instrumenting pipelines so that these problems appear on the team's radar before they reach the inbox. It's not about having perfect data — [it's already consensus that clean data is a myth and living with imperfect quality is the real work](/blog/en/dado-limpo-e-um-mito.html). It's about knowing, in near-real time, when data has deviated from expected behavior.

## What data observability is not

The most common confusion is treating data observability as synonymous with infrastructure monitoring. A job that finishes successfully in Airflow or dbt Cloud — no execution error, no timeout, no connectivity failure — can have produced completely wrong data. Columns with 100% nulls where they should have values. A table with 40% fewer records than the historical average. A `updated_at` timestamp from yesterday in data that should have arrived this morning.

Infrastructure monitoring ensures the pipeline *ran*. Observability ensures the data *is correct*. They are different layers — and the second is the one that catches the problems that actually reach users. The distinction matters because investing only in the first creates a sense of control that Wednesday's incident will dispel.

Observability is also not a one-time validation at project delivery. A team that spins up a new pipeline, validates it in the first week, and considers the work done will discover, three months later, that the distribution of values changed, that the backend team renamed a field, that the update frequency from the source system was altered without notice. Observability is a permanent process — not a delivery event.

## The five axes of data observability

The most widely adopted model, popularized by companies like Monte Carlo, organizes observability into five dimensions. These are independent axes, instrumented in increasing order of sophistication:

1. **Freshness.** Did the data arrive when it should have? A table that normally updates at 6am and still hasn't changed at 9am has a freshness problem. It's the simplest axis to instrument and the one that catches the largest share of pipeline failures — estimates from teams with basic instrumentation indicate that 50–60% of incidents are latency or data absence issues, not incorrect data.

2. **Volume.** Does the table have the expected number of records? A 40% drop in order volume could be a pipeline silently cutting data — not an actual drop in sales. This deviation rarely shows up in execution logs: the job finished, the table exists, but it's incomplete.

3. **Distribution.** Are values within the expected range? Null percentage above the historical average, a categorical column with new unmapped values, a numeric field with an absurd outlier — distribution deviations are the slowest to surface in production because the pipeline runs normally; it's just the content that's wrong.

4. **Schema.** Were columns added, removed, or renamed in the source system? This is the category that most often causes silent failures in ELT pipelines: the source changes, the pipeline keeps running, and the destination table becomes partial or misinterpreted data. Without schema checks, a column rename passes invisibly until someone opens the report.

5. **Lineage.** Given a failure, which downstream tables were impacted? Which dashboards are consuming compromised data? Without lineage, problems spread by contagion — first one dashboard, then another, then a CRM export. Lineage turns "I know something is wrong" into "I know what is wrong and what is at risk."

> Data observability isn't about finding bad data — it's knowing data might be bad before anyone uses it.

## Where most teams start wrong

The most common mistake is buying or installing an observability tool without first documenting the expected behavior of the data. A tool that doesn't know what "normal" looks like has no baseline for alerting. It will generate either complete silence or a cascade of false positives — and neither is operationally useful. A team that receives 50 alerts per day learns to ignore all of them.

The second mistake is confusing alerting with resolution. Observability detects; the resolution process needs to be designed separately. Who receives the alert? Who has the authority to pause dependent dashboards while investigating? How is the incident status communicated to the stakeholder? Without this workflow, the alert becomes an ignored notification in the first week of silence.

The third mistake is trying to instrument all five axes at once, across all models. Teams that attempt full coverage from the start usually stall in the first month. The approach that works is sequential: freshness and volume first — quick, high impact — then distribution, then schema, then lineage. Each axis only once the previous one is stable and monitored.

## How to instrument without rewriting the pipeline

The sequence that a specialized consultancy applies in practice, from simplest to most sophisticated:

1. **Native dbt tests.** If you're already using dbt, you already have 80% of the path — `not_null`, `unique`, `accepted_values`, `relationships`. The problem is that teams install and don't expand beyond the default tests. [The key to dbt is in documentation and custom tests](/blog/en/dbt-na-pratica.html) — and custom tests are where business observability lives, not just technical observability.

2. **Freshness check via SQL.** A simple query per critical table: `MAX(updated_at) < CURRENT_TIMESTAMP - INTERVAL '3 hours'` catches 60% of pipeline problems without any additional tooling. Runs as a step in the pipeline itself or as a separate periodic check job.

3. **Volume baseline with historical window.** Calculate the median daily record count over the last 30 days for each critical table. Alert if today's volume falls below 70% of that history. Cost: one metadata table and a 10-line SQL job. Catches cut partitions, incorrect joins, accidental filters.

4. **Data contracts as a schema protection layer.** Defining an explicit contract between data producers and consumers creates the formal baseline for any schema alert. Without a contract, there's no deviation — only surprise. [Data contracts are the least painful way to avoid breaking production](/blog/en/data-contracts.html) and are the natural complement of observability: contracts prevent undisclosed changes; observability detects when they slip through anyway.

5. **Specialized tools when scale justifies it.** Monte Carlo, Soda, Acceldata, Anomalo come into play when the operation has dozens of pipelines and distributed teams. For smaller teams, dbt with custom tests and SQL checks cover what's needed without additional licensing. The tool only delivers real gains if the expected-behavior baseline is already documented.

## The question before any tool

Before evaluating any observability stack, the basic question is: have you documented the expected behavior of your data? Typical volume per table, update frequency, mandatory fields, relationships between entities, valid values per column. Without this baseline, any tool monitors in the dark.

The practical paradox: the exercise of documenting expected behavior already reveals, on its own, much of the quality problems. Teams that go through this exercise rarely need to buy a tool at first — they discover the most serious problems during the documentation and resolve them without automated instrumentation. The tool comes later, when data and pipeline volume makes manual checks unviable.

Most critical data quality problems that reach users are detectable with three simple checks: freshness, volume, and nulls in required fields. The advanced stack matters when the basics are solved and you need statistical coverage of distribution and full lineage. Start with what detects the most failures with the least instrumentation; the rest comes naturally as maturity grows.

The signal that observability is working is not zero incidents — it's the team detecting before the user does. When the ratio of "we detected first" exceeds "user found it through the dashboard," the layer is delivering value. That simple metric is the most honest proxy for data maturity in any operation.
