---
title: "Data Cloud Pricing 2026: The New Credit Model and What It Changes"
slug: "data-cloud-pricing-creditos-2026"
pillar: "sf"
date: "2026-07-22"
readMinutes: 7
excerpt: "In March 2026 Salesforce replaced four segmented credit types with one pool and added a profile-based SKU — what that changes in your Data Cloud budget."
tldr: "Data Cloud pricing 2026 is the overhaul Salesforce rolled out on March 2, replacing four segmented credit types with a single fungible pool — Data Services Credits — and adding a fixed profile-based SKU as an alternative to variable consumption. Native data ingestion (Sales Cloud, Service Cloud, Marketing Cloud, Commerce) stopped consuming credits, a direct answer to the complaint about paying twice for your own data. But the credit multiplier per operation — from 2 credits per million rows for a query to 100,000 for identity resolution — still concentrates budget-overrun risk in specific workloads. Choosing between credit consumption and profile-based SKU became a budgeting decision, not a contract default."
keywords: ["Data Cloud pricing", "Data Services Credits", "profile-based SKU", "Salesforce Data 360", "Flex Credits", "Data Cloud budget"]
---

Data Cloud changed its name and its price list in the same year. It became Data 360 in October 2025; on March 2, 2026, Salesforce overhauled the entire pricing structure — four segmented credit types became one pool, and a fixed profile-based SKU arrived as an alternative to variable consumption. The question budget owners had been asking for two years — how much does Data Cloud really cost — finally has a clearer answer. Only the answer isn't "cheaper." It's "it depends on which of the three models you pick, and picking wrong still blows the budget the same way it used to."

That matters more now than it did a year ago. Data Cloud stopped being just a profile-unification layer — [it's the context foundation every Agentforce agent queries to decide](/blog/en/data-cloud-nervo-central.html). Getting the pricing model wrong stopped being an isolated CDP-initiative cost: it became a structural cost baked into every agent the company puts into production.

## What actually changed on March 2

Before the overhaul, Data Cloud pricing inherited a 2023 problem: credit segmented into four different categories, split between sandbox and production, each with its own consumption rule. Nobody outside the licensing team could forecast spend with any confidence — and the old model could run up to US$ 108,000 a year just in base license for Data Cloud for Marketing, according to market surveys, before processing a single row of external data.

The overhaul addresses part of that with three moves:

1. **Single credit pool.** The four segmented credit types became one — Data Services Credits, fungible across any Data 360 function. US$ 500 buys 100,000 credits, usable for ingestion, transformation, segmentation, or identity resolution, with no locked category.
2. **Fixed profile-based SKU.** An alternative to variable consumption: US$ 240 per thousand profiles on the baseline plan, US$ 420 on premium, billed annually. It trades budget predictability for rigidity of use — whoever knows how many profiles they'll manage, but not how much they'll process, wins with this model.
3. **Native ingestion at no credit cost.** Data that already lives in Sales Cloud, Service Cloud, Marketing Cloud Engagement, Marketing Cloud Personalization, or Commerce enters Data Cloud without consuming credit. It's a direct answer to the most repeated complaint of the previous cycle: paying again for data the company already paid to generate inside Salesforce itself.

> The overhaul fixes the entry price. It doesn't by itself fix the budget risk that lives inside the operation.

## Why the single pool doesn't eliminate unpredictability

The real gain of the single pool is eliminating category friction — before, having leftover credit of one type and running short of another used to lock operations for no technical reason. That's gone. But credit consumption is still variable by nature, and the multiplier by operation type is where budget risk hides now.

A simple query on already-ingested data consumes 2 credits per million rows processed. Identity resolution — the process that unifies multiple duplicate records into a single profile — consumes up to 100,000 credits per million rows. The gap between the two operations is five orders of magnitude. A company that budgets for the cheapest use case (query) and discovers mid-quarter that its real identity-resolution volume is 10x expected gets the same billing surprise it had before the overhaul — except now, with a single pool, the identity overrun drains credit that also fed segmentation and activation.

That's not a flaw in the overhaul. It's the same lesson any enterprise platform decision carries: [the real cost shows up in operation, not in the sales proposal](/blog/en/salesforce-roi-matriz.html). The single pool traded "unpredictable by locked category" for "unpredictable by operation multiplier" — better, but not solved.

## Three questions to decide between the three models

The right decision isn't "which model is cheaper" — it's "which model matches the operation's real consumption pattern." Three questions, in the order worth checking:

1. **How many profiles does the company manage, and is that count stable?** If the answer is "yes, we know the number and it varies little month to month," the profile-based SKU gives fixed, predictable budget — no billing surprise even if processing volume swings.
2. **What fraction of data volume goes through identity resolution?** If the operation does heavy matching — multiple sources, high duplication, third-party data arriving frequently — the 100,000-credits-per-million-rows multiplier dominates the bill, and variable consumption becomes concentrated risk. The profile-based SKU neutralizes that risk because the price doesn't change with internal processing complexity.
3. **Does the company already use Agentforce or Slack on the same contract?** If so, Flex Credits — the fungible pool shared across Data 360, Agentforce, Slack, and other products — avoids buying duplicate credit in separate silos. Whoever uses Data Cloud in isolation gains nothing from this third model; whoever already buys the other products gains real reallocation flexibility.

None of the three questions, alone, decides everything — but the second usually outweighs the other two combined, because it's the one that exposes the five-order-of-magnitude multiplier.

## Where each model wins in practice

Applying the criteria to real scenarios:

**An operation with few data sources and identity already resolved** (small to mid-size company, one dominant source system) tolerates credit consumption well. The identity multiplier risk doesn't materialize because matching volume is low. Here the single credit pool, on its own, already solves it — no need for the fixed SKU.

**An operation with multiple sources and continuous matching** (system mergers, acquisition integration, third-party data arriving every week) is where the profile-based SKU earns its own premium. US$ 240–420 per thousand profiles looks expensive against the credit model's entry price — until the company runs the math on how many credits a quarter of heavy identity resolution would burn under the variable model.

**A low-ticket operation that only considered Data Cloud because of agent-vendor pressure** deserves the harder question: [the same math that already decides whether Salesforce makes sense overall](/blog/en/quando-nao-usar-salesforce.html) applies equally to Data Cloud on its own. If the agent use case doesn't justify the investment in a full CRM, it doesn't justify the parallel investment in a context layer either — no matter how simplified the pricing became.

1. **Few sources, light matching:** credit consumption alone solves it, no SKU needed.
2. **Multiple sources, heavy matching, stable profile count:** the profile-based SKU neutralizes multiplier risk.
3. **Contract already includes Agentforce or Slack:** Flex Credits avoids a duplicate credit silo across products.

> Simplified pricing isn't synonymous with budget under control — the operation multiplier is still the variable that decides real cost.

## The overhaul fixed the entry price, not the budget risk

The complaint that drove the overhaul was real — four segmented credits, a high base price, and ingestion billed twice for the same data were genuine friction, and Salesforce addressed all three. But whoever reads "simplified pricing" as "budget under control" will repeat the mistake made before: assuming the cheapest consumption scenario and discovering the identity multiplier mid-quarter.

The work left for the customer is the same as always — map the actual consumption pattern before picking a model, not after. Whoever runs that math with the operation multiplier in hand enters the rest of 2026 with a calibrated Data Cloud budget. Whoever signs off the simplified price list without running their own scenario finds the real ruler in the second-quarter invoice — just like before the overhaul, only now in a single pool.

## Questions that keep coming back

To close, the three most common doubts about the new Data Cloud pricing.

## What changed in Data Cloud pricing in 2026?

On March 2, 2026, Salesforce consolidated four segmented credit types (split between sandbox and production) into a single fungible pool — Data Services Credits — and launched a fixed profile-based SKU (US$ 240 to US$ 420 per thousand profiles per year) as an alternative to variable consumption. Native data ingestion from Sales Cloud, Service Cloud, Marketing Cloud, and Commerce stopped consuming credit. The overhaul follows the rebranding of Data Cloud to Data 360, which happened in October 2025.

## Consolidated credit or profile-based SKU — which should I choose?

It depends on the consumption pattern, not the entry price. Credit consumption favors an operation with few data sources and light matching, because the identity-resolution multiplier (up to 100,000 credits per million rows, versus 2 credits for a simple query) doesn't weigh on the bill. The profile-based SKU favors an operation with heavy matching and a stable profile count — the fixed price neutralizes variable-multiplier risk. A company that already uses Agentforce or Slack on the same contract gains further with Flex Credits, the fungible pool shared across products.

## Does ingesting Salesforce's own data still consume credit in Data Cloud?

No, not since the March 2026 overhaul. Structured data coming from native connectors — Sales Cloud, Service Cloud, Marketing Cloud Engagement, Marketing Cloud Personalization, and Commerce — enters Data 360 at no credit cost. It's a direct answer to the most repeated complaint about the previous model: customers paying again for data they had already generated (and paid to generate) inside the platform itself. Data from an external or third-party source still consumes credit as usual.
