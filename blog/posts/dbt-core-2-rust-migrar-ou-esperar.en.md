---
title: "dbt Core 2.0 in Rust and Apache 2.0: migrate now or wait for GA?"
slug: "dbt-core-2-rust-migrar-ou-esperar"
pillar: "data"
date: "2026-10-07"
readMinutes: 7
excerpt: "dbt Core 2.0 swaps Python for Rust and ships under Apache 2.0. See what gets faster, what breaks and the rule for migrating now or waiting for GA."
tldr: "dbt Core 2.0 is the Rust rewrite of dbt Labs' open-source transformation engine, released under the Apache 2.0 license and built on the same code as the Fusion engine. The main gain is parsing and compilation, which get much faster on large projects; the cost is adapters that must be rewritten, third-party packages and v1 deprecations that turn into errors. The decision is not binary: preparing the project now, on v1.12, is cheap and worthwhile for everyone, while moving production to 2.0 only makes sense after GA and after your warehouse is covered."
keywords: ["dbt Core 2.0", "dbt Fusion", "dbt migration", "dbt Rust", "analytics engineering", "dbt v1.12"]
---

**dbt Core 2.0** is the biggest change to the tool since it became the standard for SQL transformation: the engine moves from Python to Rust, shares code with the Fusion engine and ships entirely under the Apache 2.0 license. The first alpha came out on June 1, 2026, and ever since, every data team running dbt in production has been asking the same thing: do we migrate now or wait?

The short answer is that both happen at once. Some preparation work is worth starting today, and the production migration still deserves patience. This article separates the two, shows what actually changes and proposes a rule that fits in a half-hour conversation with the team.

## What changed in dbt Core 2.0

Four changes define the release, and only the first one makes the headlines.

1. **Rust engine.** Parsing and compilation, the bottleneck of large projects, no longer depend on Python. Installation also gets simpler: no more managing a virtual environment.
2. **Code shared with Fusion.** Core 2.0 and Fusion use the same base. Fusion is the superset: it adds, for example, native SQL parsing, which enables column-level lineage and editor features. According to dbt Labs, Core 2.0 is "a strict upgrade" over v1.
3. **Parquet artifacts.** The huge JSON manifest and results files give way to Parquet, which can be queried directly with DuckDB.
4. **Adapters via ADBC.** Building connectors for new warehouses goes through the Arrow and ADBC ecosystem instead of Python packages.

There is also a licensing change that matters more than it looks. Core 2.0 is Apache 2.0 end to end. The Fusion binary sits under a license more permissive than the ELv2 used at first: free to use locally and in production, with premium features unlocked by a free login or a paid dbt platform account. dbt Labs, which now operates together with Fivetran, states that Core stays open source indefinitely and that packages remain public.

> dbt Core 2.0 changes the engine, not the language: the team's SQL and YAML remain the asset.

## How much faster, and for whom

The number going around is "30 times faster". It helps to understand what it refers to. According to datadriven.io's analysis of figures released by dbt Labs, the gain is in **parsing**: a 10,000-model project drops from over 60 seconds to under 600 milliseconds. Full-project compilation is around 2 times faster, and recompiling a single file in the editor becomes nearly instant. None of that is runtime in the warehouse, which still depends on your query and your cluster.

The practical consequence is that the gain grows with project size. In a 500-model project, parsing that takes a few seconds today becomes a fraction of a second: noticeable in development, irrelevant on the bill. That is our own estimate, not an independent measurement. In a project with thousands of models, with CI running on every pull request, the math changes: minutes of parsing per run, multiplied by dozens of runs a day, add up to hours of engineer waiting time.

The other number that comes up, a 30% or greater reduction in compute cost, comes from **dbt State**, a paid caching layer that consolidates tests and avoids reprocessing; dbt Labs reports 64% savings in its own internal use. It works with dbt Core and Airflow from v1.7 with a plugin, and natively from v1.12. It is a v1.x feature too, so it is not an argument for moving to 2.0.

## What breaks in the migration

2.0 is a strict upgrade in capability, but not in compatibility. Four points concentrate the risk:

1. **Adapters.** v1 adapters are Python packages and do not work on 2.0. In mid-2026, Snowflake, BigQuery, Databricks and Redshift were in preview; PostgreSQL, MySQL and Oracle were not ready yet. If your warehouse is not on the list, the migration cannot start.
2. **Deprecations become errors.** Everything v1 warned about as deprecated now fails. The `--models` flag (and `-m`) goes away in favor of `--select`. Teams that ignored warnings for two years get the bill all at once.
3. **Third-party packages.** `dbt_utils` and `audit_helper` are already ready for 2.0; smaller packages, maintained by a single person, may not be.
4. **Asymmetric manifest.** 2.0 reads v1 manifests, but v1 cannot read those from 2.0. Any tool that consumes the manifest (catalog, observability, orchestrator) must be checked beforehand.

On the support side, v1 is not going anywhere: dbt Labs says migration is not forced. v1.12, released on July 16, 2026, has active support until July 15, 2027, and versions v1.3 through v1.7 leave the platform on January 31, 2027. In other words, whoever is on an old version has a deadline, and whoever is on v1.11 or v1.12 has time.

## How to decide: prepare now, migrate later

dbt Labs' official recommendation, which we agree with, is to wait for GA for production. The alpha exists for testing and to give the ecosystem time. What does not need to wait is preparation, and it follows five steps.

1. **Move to v1.12.** The version applies 2.0 behavior early and brings the Fusion-based parser. It is the starting point for any path.
2. **Run the compatibility test.** The `dbt parse --use-v2-parser` command shows what the new parser rejects without touching production.
3. **Clear the deprecations.** Fix the accumulated warnings; the `dbt-autofix` package automates much of the cleanup.
4. **Take a dependency inventory.** List adapters, packages and tools that read the manifest, and mark which have a 2.0-compatible version.
5. **Pick a pilot project off the critical path.** A small domain with a clear owner, where a day of red CI takes nothing down.

Also pin versions in the environment. On the first alpha, installing without a pinned version made `pip` resolve straight to the pre-release; a `dbt-core>=1.10,<2.0` avoids the surprise.

This preparation work has a useful property: it improves the project even if you never migrate. [A project with up-to-date descriptions, owners and contracts](/blog/en/dbt-na-pratica.html) is the one that passes cleanly through the new parser, and it is almost always the project that accumulated the least deprecation debt.

## An open license does not remove vendor dependence

Apache 2.0 on Core is good news, but it helps to read precisely what it guarantees. It guarantees the engine stays free to use, modify and embed. It does not guarantee that the features your team will want, such as column-level lineage, dbt State caching and the code assistant, stay in the open-source code. Those live in Fusion and on the paid platform, and dbt Labs itself recommends Fusion as the default distribution for having "more capabilities out of the box".

That is not a criticism; it is how the business model works. The point is to decide consciously. [The same logic applies to warehouse choice, where the exit cost only shows up after signing](/blog/en/databricks-snowflake-bigquery-lock-in.html), and it applies to the transformation layer, which in recent years has concentrated much of the data business logic. Anyone who today considers dbt "neutral" because it is open source needs to revisit the premise: the core is neutral, but the set of features you use may not be. And after the Fivetran merger, [part of the stack that used to be called the Modern Data Stack](/blog/en/modern-data-stack-2026.html) has fewer independent vendors than it had in 2021.

A simple rule helps: if a proprietary feature enters the workflow, record it as an explicit dependency and document the alternative. Keeping the exit designed costs little; rediscovering it under pressure does not.

## Questions that keep coming back

To close, the most frequent questions from dbt teams evaluating 2.0.

## What is dbt Core 2.0?

dbt Core 2.0 is the new major version of dbt Core, rewritten in Rust and released under the Apache 2.0 license. It shares its codebase with the Fusion engine, uses Parquet artifacts and connects to warehouses through ADBC adapters. The first alpha came out on June 1, 2026, and dbt Labs recommends waiting for GA before using it in production.

## Do I need to migrate to dbt Core 2.0 now?

No. v1.x remains supported: v1.12 has active support until July 15, 2027, and migration is not forced. What is worth doing now is preparing the project: move to v1.12, run `dbt parse --use-v2-parser`, clear deprecations and inventory adapters and packages. That preparation reduces migration risk and improves the project either way.

## Is dbt Core 2.0 really 30 times faster?

The 30x figure applies to parsing, not to execution in the warehouse. In 10,000-model projects, parsing drops from over 60 seconds to under 600 milliseconds, according to an analysis based on dbt Labs data. Full compilation is about 2 times faster. In small or mid-sized projects the gain exists, but it is too small to justify migrating on its own.
