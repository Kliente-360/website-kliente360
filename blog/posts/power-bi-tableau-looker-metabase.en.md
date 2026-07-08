---
title: "Power BI vs Tableau vs Looker vs Metabase: a matrix by size"
slug: "power-bi-tableau-looker-metabase"
pillar: "data"
date: "2026-06-03"
readMinutes: 7
excerpt: "Four BI tools, three decision dimensions, and a size-based matrix. In Brazil, the answer is never just about features — it's about total cost in local currency."
tldr: "Power BI, Tableau, Looker, and Metabase serve distinct contexts, not a quality hierarchy. The right choice depends on three factors: existing cloud stack, data team maturity, and total cost of ownership in local currency. This matrix organizes all four by company size and Brazilian context, with five questions to decide without making a costly first swap."
keywords: ["Power BI", "Tableau", "Looker", "Metabase", "BI tools comparison", "business intelligence"]
---

When the BI tool decision reaches the table, it almost always brings the wrong question: which one is best? Power BI, Tableau, Looker, and Metabase appear in every market comparison with aligned features, similar benchmarks, and success stories across all industries. The honest answer is that the best tool is the one that fits your context — and in Brazil there is an additional variable: the cost in local currency of dollar-denominated licenses in a constantly shifting exchange rate.

This piece builds the matrix. It is not a feature analysis — it is a decision guide by company size and context. If you already know the tools and want the direct answer, jump to "Matrix by size." If you want to understand the criteria, read from the beginning.

## What all four share — and where they actually diverge

All four tools connect to the same set of warehouses (Snowflake, BigQuery, Redshift, Databricks), produce visually comparable dashboards, and have APIs for product embedding. The confusion in market benchmarks comes exactly from this: on the surface, they do similar things.

The real divergences are in three dimensions:

1. **Total cost of ownership.** Licensing + infrastructure + human cost to operate. This calculation varies widely across the four — and even more depending on the exchange rate at contract time.
2. **Integration with existing stack.** Power BI is native to the Microsoft ecosystem (Azure, M365, SQL Server). Looker is native to Google Cloud (BigQuery). Tableau and Metabase are warehouse-agnostic: they fit any stack, with no native advantage in any particular one.
3. **Technical requirements to operate.** Metabase requires no BI specialist — any analyst with basic SQL can operate it. Looker requires an engineer with LookML, a data engineer profile. Tableau and Power BI sit in the middle: they need a BI analyst, not a data engineer.

## Anatomy of the four tools

**Power BI** is the Microsoft ecosystem bet. Anyone already running M365 + Azure gets Pro included or at marginal cost — bundled licensing is its greatest competitive advantage. The DAX data model is learnable by a BI analyst in a few weeks. The limitation appears at scale: sharing dashboards outside M365 requires Premium Per User or Premium Per Capacity, and that cost jump is significant in contract negotiations.

**Tableau** has no peer in visual flexibility and ad hoc exploration. Tableau Prep + Desktop + Server/Cloud delivers a complete enterprise visualization pipeline. The limitation is direct: it is the most expensive of the four. At current exchange rates, Tableau Creator runs between R$ 1,500 and R$ 2,500 per user per month in Brazil, making it prohibitive for mid-size companies without a dedicated BI team. [Building executive analytics that drives real decisions with Tableau](/blog/en/tableau-linguagem-executiva.html) requires more than a license — it requires a solid data model underneath.

**Looker** is Google's bet on the semantic layer. LookML creates a single source of truth for metric definitions — exactly [the problem that the semantic layer solves in today's data stack](/blog/en/modern-data-stack-2026.html), and where most companies still improvise. BigQuery + Looker is the most integrated combination available on a public platform. The LookML requirement is real: it is not a self-service tool; it is a product of a data team with a dedicated engineer.

**Metabase** is the fastest path to BI without a specialist. The open-source version runs on any cloud VM; the Cloud version starts at around USD 500/month. SQL or no-SQL interface, it connects to any warehouse. The limitation is scale: governance, granular permissions, and complex embedding start requiring workarounds above ~200 active users.

## Matrix by size and Brazilian context

**Startup and SME (up to ~200 employees).** Metabase or Power BI. Metabase when there is no dedicated BI analyst and whoever operates BI is the business itself with SQL. Power BI when there is already a Microsoft 365 dependency and the finance team lives in Excel. Tableau and Looker have licensing and operational costs incompatible with this size.

**Mid-market (200–1,000 employees).** Power BI if the stack is Microsoft; Tableau if there is a BI team and the budget allows. At this range, the decision almost always follows the primary cloud: if IT already runs Azure + SQL Server, Power BI licensing is marginal. If the stack is mixed or AWS, Tableau enters with the visual flexibility advantage — if the contract fits the annual budget.

**Large enterprise (above 1,000 employees, multiple data teams).** Tableau or Looker. Tableau when the team has BI analysts doing visualization. Looker when there are data engineers maintaining LookML models. At this scale, governance and the semantic layer matter more than visualization flexibility.

**Google Cloud shop (any size).** Looker native. BigQuery + Looker is a complete, integrated offering. Switching BI tools in that stack is technical friction that rarely justifies itself.

**Microsoft enterprise (above 2,000 employees + Power Platform).** Power BI Premium. At this scale, Power BI Embedded + Power Platform + Azure makes sense as a data product platform — not just a dashboard layer.

> The size matrix is a starting point, not a verdict. What decides at the second layer is the maturity of the data that will feed the tool.

## The five questions that decide

1. **Is your cloud stack predominantly Microsoft or Google?** Microsoft → Power BI. Google Cloud → Looker. Neither → Tableau or Metabase, by size and budget.

2. **Do you have a dedicated BI analyst — or will the business operate it independently?** Self-service by the business → Metabase or Power BI. Dedicated BI team → any of the four; refine by stack and cost.

3. **What is the cost in local currency per year, including storage, compute, and team hours?** Calculate full TCO. For Brazilian mid-market companies, Tableau and Looker often sum to R$ 200–400k/year in licensing + operations. Power BI Premium can come close depending on user count. Metabase Cloud sits in the R$ 30–80k/year range.

4. **Is the main problem ad hoc exploration or standardized reporting?** Ad hoc exploration → Tableau has the best interface. Standardized metrics with governance → Looker (LookML). Fast operational reporting → Power BI or Metabase.

5. **Do you already have the problem of "each team with its own number"?** If yes, the priority is the semantic layer before the BI tool. None of the four solves this alone — [self-service without governance reproduces exactly that problem](/blog/en/self-service-bi.html), regardless of which tool is in front. Solve the data model first; the visualization tool is the last decision, not the first.

## The three anti-patterns that cost projects and budget

**Choosing the tool before the architecture.** BI tool is the last stack decision, not the first. Warehouse, transformation layer (dbt or native), semantic layer — in that order. Projects that start with "we'll use Tableau" frequently discover that the data model doesn't support the expected semantic complexity, and the implementation turns into two years of model corrections.

**Buying Tableau or Looker without a data engineer.** Tableau without a modeled dataset delivers beautiful and inaccurate dashboards. Looker without a LookML engineer is an empty shell. Both tools require investment in data infrastructure — not just a visualization license.

**Using Metabase beyond the right size.** Metabase is an excellent entry point. It is not an enterprise tool. Above ~200–300 active users, governance failures, granular permission issues, and slow queries appear. Growing beyond Metabase is maturity — not failure.

## The question that comes before the license contract

The BI decision is, in practice, a data architecture decision with a visual interface. Whoever licenses the tool without solving what sits beneath — fragmented data, no semantic layer, no metric owner — will switch tools in two years and reproduce the same problem on a new stack.

The question a specialized consultancy asks before recommending any tool: "Is the data that will feed this BI modeled, governed, and with a clear owner?" If the answer is not yes, that conversation needs to happen before the conversation with the license vendor.

## Questions that keep coming back

Before wrapping up, the questions that come up most often when this decision hits the table.

## Is Tableau worth it for a mid-size company in Brazil?

In most cases, no — unless you have a dedicated BI team and a budget that supports the contract. At current exchange rates, Tableau Creator runs between R$ 1,500 and R$ 2,500 per user per month in Brazil, and the TCO of Tableau or Looker at mid-market size often adds up to R$ 200–400k per year across licensing and operations. Without a BI analyst to extract value from that visual flexibility, you're paying enterprise prices for Metabase-level results.

The exception: a mixed or AWS stack, an established BI team, and a genuine ad hoc exploration problem. In that scenario, Tableau has the best interface of the four and the contract can justify itself. Outside it, Power BI (if the stack is Microsoft) or Metabase covers the need at a fraction of the cost.

## Can I start with Metabase and switch tools later?

Yes, and that is exactly the healthy trajectory — growing beyond Metabase is maturity, not failure. Metabase is the fastest path to BI without a specialist: any analyst with basic SQL can operate it, the open-source version runs on any VM, and Cloud starts at around USD 500/month. For startups and SMEs, it is a hard entry point to beat.

The signal that it's time to migrate is clear: above ~200–300 active users, governance failures, granular permission issues, and slow queries start appearing. If the data underneath is modeled and owned, swapping the tool on top is the easy part — what makes migrations expensive is business logic trapped inside dashboards.

## What do I need to solve before picking a BI tool?

The data architecture — the visualization tool is the last stack decision, not the first. The order is: warehouse, transformation layer (dbt or native), semantic layer with single metric definitions, and only then the BI tool. Projects that start with "we'll use Tableau" tend to discover the data model can't support what's expected of it, and turn into two years of corrections.

The practical test: if each team already has its own number for the same metric, none of the four tools fixes that alone. Solve the model, governance, and metric ownership first; otherwise you'll switch tools in two years and reproduce the same problem on a new stack.
