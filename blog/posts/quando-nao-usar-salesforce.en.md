---
title: "When NOT to use Salesforce: 4 scenarios where license cost beats ROI"
slug: "quando-nao-usar-salesforce"
pillar: "sf"
date: "2026-05-24"
readMinutes: 7
excerpt: "Salesforce solves a lot. It doesn't solve everything. Four scenarios where the license consumes more value than it returns — and what to use instead."
tldr: "Salesforce is expensive by design: the platform delivers value proportional to the size of the business. When your ICP is low-ticket SMB, when the sales process fits in a spreadsheet, when the bottleneck is data and not CRM, or when the team is too small to absorb the adoption curve — the license becomes a liability, not an asset."
keywords: ["Salesforce", "CRM", "ROI", "CRM implementation", "Salesforce alternatives"]
---

Almost every client who comes to Kliente asking about Salesforce has already decided to use Salesforce. The real question is whether they should. As partners who implement the platform every day, we have a clear commercial interest in saying yes — and that's exactly why this post exists. Technical trust is built by saying "no" when "no" is the right answer.

Salesforce is the best CRM platform on the market for a specific set of scenarios. Outside that set, the license cost consumes value faster than the product returns it. This post enumerates the four scenarios where the honest recommendation is to not buy Salesforce — and what to use instead.

## Scenario 1 — ICP is low-ticket SMB

The math nobody runs at decision time: divide the annual cost of Salesforce (licenses + implementation + sustaining) by the margin per new customer the CRM helps convert. If the number doesn't fit in 6–10% of the average annual ticket, the platform is disproportionate.

A B2B company selling SaaS at R$ 800/month with 200 customers cannot justify Sales Cloud Enterprise at US$ 165/user/month × 10 users × 12 months + implementation. Hubspot Sales Hub Starter, or even a well-configured Pipedrive, deliver 80% of the value at 20% of the cost. The operation will only miss Salesforce when the ticket grows.

The clear signal: if LTV/CAC doesn't yet support investment in a dedicated RevOps team, Salesforce is at the wrong maturity stage of commercial operations. Switching later is expensive; switching too late is more expensive still — but adopting before the right time is waste that nobody notices because it's buried in the IT budget.

## Scenario 2 — The sales process fits in a spreadsheet

This scenario appears when the client has 3–8 salespeople, short sales cycle (under 30 days), simple pipeline (1 product, 1 segment, 1 motion), and the manager can already keep all open deals in a single mental view. CRM here doesn't automate — it formalizes. And formalizing a simple process is usually overhead, not gain.

The symptom we detect in diagnostic: salespeople do "double entry" — note the customer in WhatsApp/notebook and then transcribe to CRM because the manager requires it. Result: low-quality data in the CRM, real decisions still happen outside of it.

The honest answer in this scenario: use collaborative spreadsheet for another 12 months, focus energy on defining the sales process well (stages, advance criteria, qualification gates), and migrate to CRM when growth makes the spreadsheet unviable — not before.

> Implementing CRM before having a process means perpetuating chaos with a nice interface. The spreadsheet that hurts forces definition; the CRM that hides indecision masks it.

## Scenario 3 — The bottleneck is data, not CRM

Company with Salesforce installed for 5 years, fragmented data between Salesforce, ERP, marketing automation, Customer Success spreadsheets and e-commerce. The director arrives thinking "the problem is the CRM" — because their view of the customer is incomplete. Re-implementing Salesforce doesn't solve it.

The real problem is data architecture: each system is source of truth for something, but nobody consolidated customer ID, nobody modeled the unique customer, nobody placed data contracts between teams. The CRM, however perfect, only shows the piece it has.

The honest technical solution runs through [Customer 360 and Data Cloud](/blog/en/customer-360-vs-cdp.html), [data contracts](/blog/en/data-contracts.html) and clean dimensional modeling — *before* touching Salesforce. Swapping Salesforce for Salesforce doesn't solve the root problem, and the client leaves the project with more tooling and the same gap. In some cases, the existing Salesforce is fine; what's missing is the data layer underneath. That diagnosis is uncomfortable to deliver but it's what moves the needle.

## Scenario 4 — Team too small to absorb the curve

Salesforce rewards mature operations: certified admin, release process, custom field governance, Flow and Apex management. A company without that muscle enters the platform and 18 months later has 400 ownerless custom fields, 60 Flows nobody understands, and a sustaining contract outside the original budget.

The blind spot: the total cost of Salesforce is not the license. It's the continuous operation. A team of 3 in sales and zero people dedicated to CRM doesn't have capacity to absorb the maintenance. The system becomes a source of growing technical debt, and the ROI vanishes inside the partner's monthly invoice — and [picking that partner by Partner Program tier alone](/blog/en/salesforce-partner-program.html) is a separate trap.

Before buying Salesforce, the honest partner asks: do you have (or will you hire) a certified admin in the next 6 months? If the answer is no and it's not even a priority, the recommendation is to defer the decision. There is productive life with [Flow vs Apex](/blog/en/flow-vs-apex.html) configured by a senior admin — but there is no productive life without any admin at all.

## What to use instead — honest choices

The answer is not one. It depends on the scenario:

**For scenario 1 (low-ticket SMB):** Hubspot Sales Hub (Starter or Professional), Pipedrive, Freshsales. For B2C with volume, RD Station or Zoho. Criterion: total cost fits in 6–10% of average annual ticket.

**For scenario 2 (process in spreadsheet):** Notion or Airtable with pipeline view + light automation (n8n, Make). Don't try to swap spreadsheet for CRM — formalize process first, tool later.

**For scenario 3 (bottleneck is data):** Before any new CRM, data unification project. Could be Customer 360 + Data Cloud (if you already have Salesforce), could be modern warehouse (Snowflake/Databricks/BigQuery) with semantic layer in dbt, could be open-source CDP.

**For scenario 4 (no operational muscle):** Defer Salesforce. Invest in simpler CRM + train first internal admin. When that admin has 12+ months of operation, reassess.

## The question that separates good decisions from fashion decisions

The right question before buying Salesforce is not "is Salesforce good?" — it's "does Salesforce solve my problem better than the 10%-cost alternative, considering that I'll pay for the difference for 5–10 years?". For much of mid-market and complex enterprise, the answer is yes, no debate. For many companies that arrive thinking they need it, the answer is no — and those who sell Salesforce professionally should say so first.

Not selling Salesforce when it's not the answer is what builds long-term relationships. A client who bought the wrong tool never forgets who sold it. A client who heard "not now" comes back when the time comes — and they come back to whoever was honest in the first conversation. When the decision to implement is correct, [a Salesforce MVP in six weeks with honest scope](/blog/en/implementacao-salesforce-seis-semanas.html) is the starting point: not a full delivery in 14 days, but the foundation that holds up under real use.
