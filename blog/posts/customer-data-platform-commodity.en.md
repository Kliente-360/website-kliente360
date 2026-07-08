---
title: "Customer Data Platform became a commodity — what's left"
slug: "customer-data-platform-commodity"
pillar: "data"
date: "2026-06-24"
readMinutes: 6
excerpt: "In 2026 the CDP category was absorbed by the big players. It didn't die — it became a platform feature. What changes for companies evaluating customer data."
tldr: "Customer Data Platform as a standalone category lost substance in 2026. Segment was acquired by Twilio and then resold; Tealium and mParticle survive in niches; Salesforce, Adobe, and Microsoft absorbed the function into their platforms. The choice today is not 'CDP or no CDP' — it's which layer of customer data your operation needs first: identity, activation, or agent context."
keywords: ["Customer Data Platform", "CDP", "Data Cloud", "Segment", "customer data"]
---

In 2019, Gartner and Forrester analysts debated which CDP to choose — Segment, mParticle, Tealium, Lytics, Simon Data. In 2022, the question shifted to "external CDP or Salesforce Data Cloud?" In 2026, the right question is different: is Customer Data Platform still a product category, or has it become a feature embedded in a larger platform?

The answer has two sides. The *function* of CDP — unifying customer data, resolving identity, activating segments for marketing channels — is more present and more executed than ever. The *standalone product category* called Customer Data Platform has shrunk in ways that can no longer be ignored. These are different things, and confusing them leads to poor stack decisions.

## Why the category shrank

Consolidation came fast and from multiple directions. Segment, the most influential independent CDP, was acquired by Twilio in 2020 for $3.2 billion — then sold back to the market in 2023, when Twilio realized martech and CPaaS didn't belong in the same company. Segment returned as an independent product, but the arc revealed something: a standalone CDP doesn't have enough platform leverage to survive as the primary product of a large technology company. It becomes a feature or a secondary product.

The major platforms made the opposite move. Salesforce absorbed the CDP function into [Data Cloud, which transcended the original CDP concept](/blog/en/data-cloud-nervo-central.html). Adobe built Real-Time CDP as a pillar of the Adobe Experience Platform — without calling it a "CDP": it's the Experience Platform. Microsoft embedded customer data into Dynamics 365 Customer Insights. SAP consolidated the SAP Customer Data Cloud into its suite. In each case, the function exists; the standalone product is gone.

What remains as an independent category: Tealium, mParticle, RudderStack, Bloomreach. All survive — but in specific niches: multi-cloud companies without a dominant vendor, marketing operations with heterogeneous stacks that don't want lock-in, data teams that need platform mobility. Outside those cases, an independent CDP is an answer to a question the stack has already answered.

> Customer Data Platform didn't die — it was reabsorbed. The category vanished; the function stayed.

## Where each piece of the classic CDP went

A classic CDP solved five functions. Each went somewhere different in 2026.

1. **First-party data collection** (web, mobile, backend events). Went to Segment, RudderStack, and direct warehouse ingest. Snowflake, BigQuery, and Databricks accept event streams natively. In 2026, you don't need a CDP to collect data — you need a decision about where that data lands.

2. **Identity resolution** (unifying the same person across multiple systems). Went to Data Cloud (Salesforce ecosystem), Snowflake Horizon, and Databricks Unity Catalog. An old technical problem, now solved as a warehouse or platform layer — not a separate product.

3. **Behavioral segmentation** (segmenting by real-time behavior). Went to Data Cloud, Adobe Real-Time CDP, and any modern warehouse with fast enough SQL. dbt + Snowflake runs on-demand segmentation without a dedicated CDP. The criterion today is not the tool — it's acceptable latency.

4. **Marketing channel activation** (sending segments to email, ads, push). Went to the direct APIs of Braze, Iterable, and Customer.io, and to reverse ETL embedded in the warehouse itself. Reverse ETL as a standalone category is in the same shrinkage pattern as the classic CDP — same root cause.

5. **Context for applications and agents**. This fifth function is new — and this is where consolidation was clearest. Traditional CDPs weren't designed to serve high-speed context to AI agents. Data Cloud was. The gap is architectural: classic CDP is batch-friendly; agents need context materialized in real time. This function didn't "go somewhere" — it was created by Data Cloud and equivalents, and the classic CDP was left behind by design.

## The commoditization pattern repeats

[As the Modern Data Stack analysis showed in 2026](/blog/en/modern-data-stack-2026.html): when a stack layer commoditizes, the product category loses, the work continues. Independent ELT (Fivetran, Stitch) became a commodity — prices dropped 60% since 2022, differentiation evaporated, self-hosted became viable. The work of moving data exists; the category as a separate strategic product shrank. Reverse ETL is on the same path. CDP is next.

The difference is that CDP had more ambition: it wanted to be *the layer* for customer data, not just an ingest tool. That ambition is what the major players co-opted. Salesforce didn't need to kill CDP — it just needed Data Cloud to be sufficiently better within the Salesforce ecosystem to make a separate purchase no longer make financial sense. That was enough to hollow out the category in enterprise accounts.

## What changes for those deciding now

Four questions that usefully reformulate the decision.

1. **Does your stack already have a dominant vendor?** A Salesforce-first company already has Data Cloud available or available to negotiate. An independent CDP would be a second customer data layer with high integration cost and little differential over what's already in the contract. In that scenario, a separate CDP rarely closes the TCO case.

2. **Do you need mobility across clouds and CRMs?** A company with Sales Cloud, HubSpot, SAP, and Shopify coexisting needs a customer data layer that doesn't belong to any single vendor. There, an independent CDP (RudderStack, Tealium) still has a clear argument: platform neutrality is worth the integration cost.

3. **Is the primary use case marketing activation or agent context?** Marketing activation for channels: independent CDP solves it well. Real-time agent context: requires an architecture that classic CDP doesn't deliver by design. Data Cloud or equivalent.

4. **What's the acceptable dependency horizon?** Buying Data Cloud means betting on the Salesforce ecosystem for at least 3–5 years. Buying Tealium means betting that the independent category survives consolidation. Both bets carry different risks. A company that doesn't think through this horizon switches customer data platforms every two years and pays integration tax every cycle — a cost that rarely appears in the technology budget, but always appears on the data team's calendar.

## Commoditization is good news

When a stack function becomes a commodity, the signal is that the problem has been solved well enough to stop being a competitive differentiator. No more CDP-specific consultant, separate implementation project, or isolated martech budget needed. The customer data layer is available as part of the stack you already have — or as an add-on inside platforms you already pay for.

What hasn't commoditized — and still requires careful decision-making — is identity architecture. What is the canonical customer key in your operation? How do you resolve identity conflicts between Sales Cloud, ERP, and the product platform? That decision comes before any CDP or Data Cloud purchase, [as the Customer 360 versus CDP diagnostic already details](/blog/en/customer-360-vs-cdp.html). The commoditization of the tool didn't commoditize the identity problem — it still requires careful technical decisions before the contract is signed.

> The CDP function became a platform. Identity architecture remains the work of specialized consultancy.

In 2026, a company still asking "which CDP should we buy?" is asking the wrong question. The right question is: which layer of customer data does my stack already have, and what does it not cover yet? From there, the decision is about gaps — not categories. And filling gaps costs less than switching platforms.

## Questions that keep coming back

To close, the three questions I hear most whenever this topic comes up.

## Is an independent CDP still worth buying in 2026?

Only in specific niches. Multi-cloud companies without a dominant vendor, marketing operations with heterogeneous stacks that won't accept lock-in, data teams that need platform mobility — in those three cases, the neutrality of a RudderStack or Tealium still pays for the integration cost. Outside them, an independent CDP is an answer to a question your stack has already answered.

Before looking at vendors, check the use case: independent CDPs handle marketing channel activation well; real-time agent context requires an architecture the classic CDP doesn't deliver by design.

## If we're already on Salesforce, do we need a separate CDP?

Almost never. A Salesforce-first company already has Data Cloud available — or available to negotiate — and an independent CDP would become a second customer data layer, with high integration cost and little differential over what's already in the contract. In that scenario, the TCO case rarely closes for a separate CDP.

What the decision does require is awareness of the horizon: buying Data Cloud means betting on the Salesforce ecosystem for at least 3–5 years. If that horizon is acceptable, the CDP discussion is over; if it isn't, the right question goes back to platform mobility.

## What hasn't commoditized in customer data?

Identity architecture. The tool became a platform feature, but deciding what the canonical customer key is and how to resolve identity conflicts between Sales Cloud, ERP, and the product platform still demands careful technical decisions — and that comes before any CDP or Data Cloud contract.

That's why commoditization is good news without being the end of the work: the solved problem left the budget, the identity problem stayed. Get that layer wrong and any platform — bought or embedded — delivers a duplicated view of the customer.
