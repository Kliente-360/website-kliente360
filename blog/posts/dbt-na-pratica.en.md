---
title: "dbt in practice: documentation is the real win, not the model"
slug: "dbt-na-pratica"
pillar: "data"
date: "2026-01-20"
readMinutes: 6
excerpt: "Teams adopt dbt for versioned SQL and tests — and discover six months later that the real value lives elsewhere: in the documentation that keeps the warehouse alive."
tldr: "dbt delivers versioning, tests and modularity in SQL. But the gain that separates amateur use from mature use lives in the discipline of documenting — descriptions, contracts, ownership. Without it, dbt is just ETL with new syntax. With it, it becomes the warehouse's operating system."
keywords: ["dbt", "data warehouse", "data engineering", "data documentation", "data modeling"]
---

The first reaction to adopting dbt is usually technical and fair: versioned SQL, tests running in CI, automatic lineage, modularity replacing that 800-line script. All of that is real and worth the migration. But six months later, the team looks back and notices the gain that changed the game was a different one — and almost no one sold dbt from that angle during adoption. The real win is **documentation**: the `description` column, the schema YAML, the cultural obligation to describe what a model means before it ships to production.

This text is about why documentation in dbt is worth more than any other feature, and what to do to extract that value on purpose — not by accident.

## What dbt delivers out of the box

Before going to documentation, worth acknowledging the technical package dbt delivers — it has real value. SQL in versioned files on Git replaces loose scripts in the warehouse editor. Declarative tests (`unique`, `not_null`, `accepted_values`, `relationships`) catch regressions before the dashboard breaks. Macros and Jinja allow reuse without copying SQL. `ref()` resolves dependencies automatically — no more `DROP TABLE` in the wrong place. CI builds the lineage and runs tests on every PR.

All of that already justifies adoption. But it's the floor, not the ceiling. A team that stops at this package has a better version of the same ETL they had before. A team that goes further to documentation has something else.

## Why documentation changes the game

Every mid-market company has the same warehouse problem: nobody knows what each table means. The `status` column on `orders` means what — logistical, financial, sales flow? It can have three meanings across three schemas, and the analyst picks one by intuition. Result: reports that look right but measure different things, metrics that diverge between teams, and six months a year spent on "why is this number different in that dashboard".

dbt doesn't solve this problem alone — it provides the *infrastructure* to solve it. Each model has a `.yml` file with model description, column descriptions, associated tests, owner. Each column can have `meta` with domain tags, sensitivity, source. `dbt docs` generates a navigable site with visual lineage + descriptions + tests + freshness. When filled out, this site becomes the **canonical dictionary** of the warehouse — [solving 80% of what a premium Data Catalog would try to deliver](/blog/en/data-catalog-ninguem-usa.html), without the annual license.

> dbt without documentation is ETL with new syntax. dbt with documentation is the warehouse's operating system — the place where the company agrees on what each number means.

The operational difference shows up three months later: a new analyst joins, reads the `dbt docs`, understands what each model does. A seemingly divergent metric is resolved in 5 minutes in the lineage. The product team asks "what counts as an active customer?" and the answer is in the model's `description`, written by the owner. A conversation that used to take a meeting now takes 2 minutes.

## Five rules to extract the real value

The difference between a team that gets value from dbt and a team that doesn't is discipline. Five rules we see work.

1. **Description is a PR blocker.** A model without a description doesn't pass CI. A column without a description in a `mart` model (the layer the business consumes) doesn't pass CI. Sounds rigid — it's rigid on purpose. Without this rule, description becomes a perpetual backlog.
2. **Explicit owner in the `.yml`.** Each model has a human responsible (tag `owner` in `meta`). When something breaks, it's clear who to call. Without owners, an orphan model becomes an abandoned model in 6 months.
3. **Source freshness as a test.** Set `freshness` on each `source` (Salesforce, Stripe, Segment, etc.) with an explicit SLA. When the source falls behind, the team knows before the dashboard goes wrong. This is one of dbt's most undervalued tests — the simplest foundation of the [five axes of data observability](/blog/en/observabilidade-de-dados.html): freshness catches the largest share of pipeline failures with the least instrumentation effort.
4. **Explicit layers: staging / intermediate / marts.** Staging is raw renamed and typed. Intermediate is reusable logic. Marts is what the business consumes. Mixing layers is the fastest way for the warehouse to become a mess. dbt makes separation easy — using it is discipline.
5. **Documented exposures.** The `exposure` tag points to the dashboard or app that consumes the model. When someone is about to change the model, they see what will break downstream. Combined with lineage, it closes the loop between warehouse and [BI that drives decisions](/blog/en/tableau-linguagem-executiva.html).

Five simple rules — none requires a new plugin. They require culture. Without them, dbt becomes a repo with pretty SQL and an empty dictionary.

## The argument against: "let's document later"

The predictable objection on every project: "let's build the models first, then document". Sounds pragmatic. Three months in, nobody documented. Six months in, the team forgot why that model exists. Twelve months in, the new analyst recreates a parallel model because they don't trust the existing one.

Documenting later doesn't work for the same reason [waiting for clean data before using doesn't](/blog/en/dado-limpo-e-um-mito.html) — it's continuous work, not a phase with an end. The difference is that dbt already has the place to put the description. Not writing it when creating the model is letting debt be born capitalized. Five minutes on the PR save three months next quarter.

## How to start well

If you're adopting dbt now, three practical moves that pay back more than picking the right `dbt-core` version:

**Setup with mandatory schema YAML from day 1.** Configure CI to fail when a `mart` model lacks a complete description. Fighting with the team once at the start is cheaper than recovering documentation six months later.

**Start from marts, not staging.** Define what the business needs to consume, write the description before creating the model, then build the layers feeding it. Disciplinarily backward is cheaper than technically forward.

**Treat `dbt docs` as an internal product.** Present it in team meetings, put the link on the intranet, train analysts to use it before the warehouse. Documentation no one opens is overhead. Documentation that becomes the first lookup pays six times the effort to keep.

dbt without that discipline is just a better version of the old ETL — and better ETL is already something. With that discipline, it becomes the piece that stops the warehouse from being a black box. The difference between the two uses is a culture, not a feature. ([On the map of what survived from the Modern Data Stack in 2026](/blog/en/modern-data-stack-2026.html), versioned transformation as code is one of three pieces that passed the test — and dbt was the one that proved the thesis.)

## Questions that keep coming back

Before wrapping up, the questions that come up most often when this topic hits the table.

## Is dbt worth adopting just for versioning and tests?

It is — but that's the floor, not the ceiling. SQL versioned in Git, declarative tests in CI, automatic lineage, and `ref()` resolving dependencies already justify adoption on their own. But a team that stops at that package ends up with a better version of the same ETL it had before.

The game-changing gain shows up in documentation: schema YAML with model and column descriptions, explicit owners, `dbt docs` as the warehouse's canonical dictionary. That's the usage that lets a new analyst walk in and understand the warehouse alone, and a diverging metric get resolved in minutes on the lineage instead of in a meeting.

## Can we document after the models are built?

In practice, no — "document later" is the pattern that never happens. In three months nobody has documented, in six the team has forgotten why the model exists, in twelve the new analyst rebuilds a parallel model because they don't trust the existing one. Documentation is continuous work, not a phase with an end.

The antidote is making descriptions a PR-blocker from day 1: a model without a description doesn't pass CI, and neither does an undescribed column in a `mart` model. It's rigid on purpose — five minutes in the PR save three months next quarter, and fighting with the team once at the start is cheaper than recovering documentation six months later.

## Does dbt replace a data catalog?

For most mid-market companies, yes — a filled-in `dbt docs` covers 80% of what a premium data catalog would try to deliver, without the annual license. Visual lineage, descriptions, tests, and freshness in a navigable site cover the real usage: finding out what each table means and what breaks downstream of a change.

The condition is the word "filled-in". `dbt docs` with empty descriptions is as useless as a catalog nobody opens. The value comes from discipline — mandatory descriptions, an owner per model, documented exposures — and from treating the site as an internal product, presented to and used by the team, not as a technical byproduct.
