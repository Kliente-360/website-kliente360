---
title: "The Data Catalog nobody uses: a symptom of the real problem (not the tool)"
slug: "data-catalog-ninguem-usa"
pillar: "data"
date: "2026-03-31"
readMinutes: 6
excerpt: "Company buys Alation/Collibra, pays consultancy, populates with 800 tables. In 6 months, the analyst goes back to asking on Slack. The problem isn't the tool — it's what was asked of it."
tldr: "Data Catalog becomes ornament at most companies that adopt it because the tool tries to solve a problem that isn't its own: documentation culture. Without culture, any catalog becomes a list of empty tables. Five conditions that separate useful catalog from decorative one — and why dbt solves 80% of the problem without the fancy name."
keywords: ["Data Catalog", "Alation", "Collibra", "data governance", "data documentation"]
---

The question in every Data Catalog assessment meeting in 2026: *how many times did someone query the catalog last week?* Honest answer at most companies: "about 12 hits, but most were the governance team verifying it's current". Practical translation: the company paid for Alation or Collibra or similar (USD 200k+/year), spent 6 months populating it, and nobody uses it. The analyst who needs to understand a table still asks on Slack.

The fault isn't the tool. Catalog is a mature category with competent products. The fault is the wrong diagnosis: the company thought buying a catalog would solve a culture problem. It doesn't. This text is about the real problem, and why dbt alone solves 80% of the case without the fancy name.

## Why catalog fails to produce real usage

The mental model selling catalog is: "if we have one place with all documentation, everyone will check it". Library-shelf logic. Fails because three things have to be true to work — and rarely are.

**Documentation has to exist.** An empty catalog is just a pretty UI. Populating the catalog requires someone to write the description of each table, each column, each metric. Catalog doesn't write for you.

**Documentation has to be current.** Aging documentation is worse than missing — the user checks, acts, finds it was wrong, loses trust. Maintaining requires ongoing discipline, usually underestimated.

**Documentation has to beat asking on Slack.** Cost of using the catalog (open tool, navigate, read) has to be lower than asking on Slack. In a disorganized or stale catalog, Slack always wins.

When all three fail simultaneously — which is the case for 80% of implementations I see — the catalog becomes a list of empty tables with a corporate name.

## The problem catalog *seems* to solve but doesn't

The organizational frustration that motivates a catalog purchase has a name: *nobody knows what each table means*. The intuition is that having a place to document solves it. It doesn't. The root problem is cultural, not infrastructural.

A company without a documentation culture will populate the catalog with generic descriptions ("customer table"), abandon maintenance in 3 months, and blame the tool in 6. A company with a documentation culture has it in Git, in dbt, in the wiki — the catalog is just visualization, not substitute.

> Data Catalog doesn't create documentation culture. It only amplifies the one that exists. A company with no prior culture buys a catalog and amplifies zero.

## What catalog does well (when it does)

Don't confuse the argument. There are contexts where a premium catalog has real value:

**Large company with 5+ independent data teams.** When the catalog has to cross organizational boundaries (multiple business areas, subsidiaries, platforms), enterprise catalog offers cross-cutting governance that a single tool doesn't.

**Explicit regulatory need.** Company in a regulated sector (financial, healthcare) where auditors require centralized documentation with approval trail. Here catalog is compliance, not productivity.

**Cross-stack lineage.** When data flows across 5+ distinct systems (Salesforce, ERP, warehouse, ML platform, BI), enterprise catalog tracks lineage in a way dbt alone doesn't.

Outside these three contexts, premium catalog tends to be overshoot — and real usage drops as the initial enthusiasm fades.

## Why dbt solves 80% of the case

For most Brazilian mid-market companies, [dbt with documentation discipline](/blog/en/dbt-na-pratica.html) solves the use case a catalog would try to. Five reasons:

- **Documentation lives next to code.** Description of each model, each column, in the versioned .yml in Git. Whoever changes the model updates the doc in the same PR.
- **`dbt docs` generates a navigable site.** Visual lineage, descriptions, tests, source. What catalog promises to deliver, dbt delivers — for models in the warehouse.
- **Explicit owner in the `.yml`.** Who owns each model. When something changes or breaks, there's a name.
- **Built-in source freshness.** Catalog shows "last update"; dbt actively monitors and alerts.
- **Cost: zero.** dbt is open source. Documentation is team work, but the infra is free.

The honest limitation: dbt covers what's in the warehouse. For external sources (Salesforce, Mixpanel, spreadsheets), the catalog covers something dbt alone doesn't. But if 80% of used tables are in the warehouse, dbt solves 80% of the problem.

## The rule before buying catalog

Five questions to answer before signing an annual USD 200k contract:

1. **Does the documentation culture exist today?** Quick look: are the 20 most-used tables documented? If not, buying a catalog amplifies absence.
2. **Who'll populate the catalog initially?** Which data team, under which sponsor, with which deadline? Without a named owner and deadline, population never finishes.
3. **Who'll keep it current?** Not "the whole team". Name, process, tool. Without that, 6-month drift guaranteed.
4. **What's the primary use case?** Analyst looking for metadata? Auditor verifying governance? Lineage across systems? Each case calls for different config.
5. **Would dbt cover this need?** Honestly. If 80% of models are in the warehouse and the case is internal, [dbt + description discipline is the cheaper answer](/blog/en/dbt-na-pratica.html). Catalog becomes an upgrade when dbt is exhausted.

Whoever answers the five clearly decides with conviction. Whoever answers "it depends" on three or more doesn't have a defined use case — and any purchase becomes ornament.

## Relationship with data contracts and dbt

[Data contracts](/blog/en/data-contracts.html) and dbt complement catalog — they don't replace one another. In mature architecture:

- **dbt** documents what's in the warehouse, describes models, tests.
- **[Data contracts that became operational practice in 2026](/blog/en/tendencias-data-management-2026.html)** version agreements between data producer and consumer.
- **Enterprise catalog**, if justified, is the cross-cutting governance layer above everything.

Most Brazilian mid-market companies don't need the third layer. They need the first two done right. Skipping the first two to jump straight to catalog is building a building without foundation.

## The decision for 2026

If your company is evaluating a premium data catalog, three honest moves before buying:

**Try dbt with discipline for 6 months first.** Enforced documentation in CI, named owner, active source freshness. In 6 months you know whether the problem is lack of culture or lack of tooling.

**If you decide to buy, build the team first.** You can't buy a catalog and expect "the data team to populate". Named person, deadline, sponsor with authority to push teams to document.

**Reassess at 12 months by usage, not coverage.** Catalog with 100% of tables and 5 hits per week is dead catalog. Catalog with 60% of tables and 500 hits per week is live catalog. Success metric is use, not inventory.

Data Catalog in 2026 is a legitimate tool — but it's the last rung of a documentation-culture ladder. Companies skipping rungs pay catalog price and keep asking on Slack. Companies climbing the ladder reach the top rung knowing whether it's worth it or not.

## Questions that keep coming back

Before wrapping up, the questions that come up most whenever this topic hits the table.

## Is a data catalog like Alation or Collibra worth buying?

Only in three contexts: a large company with 5+ independent data teams, an explicit regulatory requirement for centralized documentation with an approval trail, or lineage crossing 5+ distinct systems. Outside those, a premium catalog tends to be overshoot — you pay USD 200k+/year for a tool whose real usage collapses once the initial enthusiasm fades.

The prerequisite nobody checks: documentation culture. If your 20 most-used tables aren't documented today, buying a catalog amplifies absence. The tool doesn't write descriptions for you, and it doesn't create discipline that isn't there.

## Does dbt replace a data catalog?

For most mid-market companies, yes — dbt with documentation discipline covers about 80% of what a catalog would try to solve. Descriptions versioned in Git next to the code, `dbt docs` generating a navigable site with visual lineage, explicit owner in the `.yml`, source freshness with active alerting. And the infrastructure costs zero, because dbt is open source.

The honest limitation: dbt only covers what's in the warehouse. If a good chunk of your critical data lives in external sources (Salesforce, Mixpanel, spreadsheets) or lineage has to cross multiple systems, the catalog covers something dbt alone doesn't. Catalog is the upgrade once dbt is exhausted — not the other way around.

## How do you know a catalog rollout actually worked?

By usage, not coverage — and the honest checkpoint is at 12 months. A catalog with 100% of tables documented and 5 hits per week is a dead catalog; one with 60% of tables and 500 hits per week is alive. A complete inventory proves nothing if the analyst is still asking on Slack.

The practical test: how many times did someone query the catalog last week, excluding the governance team checking whether it's current? If the answer stings, more populating won't fix it — a named owner, a maintenance process, and a defined primary use case will, and all of that comes before any contract renewal.
