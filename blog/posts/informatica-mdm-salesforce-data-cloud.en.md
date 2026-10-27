---
title: "MDM on Salesforce: what the Informatica deal changes for Data Cloud"
slug: "informatica-mdm-salesforce-data-cloud"
pillar: "sf"
date: "2026-10-27"
readMinutes: 7
excerpt: "Salesforce bought Informatica and brought MDM onto the platform. Learn how MDM differs from Data Cloud identity resolution and when a golden record pays off."
tldr: "MDM (Master Data Management) is the practice of keeping one master record, the golden record, for each customer, product or supplier, with a defined owner and survivorship rule. Salesforce completed its Informatica acquisition on November 18, 2025 and said it will integrate Informatica's MDM into a single pipeline with Data Cloud (now Data 360). This does not replace Data Cloud identity resolution: that unifies profiles for activation, while MDM decides which value is correct and who answers for it. Teams already on Data Cloud should first decide whether they have a master data problem, and only then buy the tool."
keywords: ["Salesforce MDM", "Informatica Salesforce", "golden record", "Data Cloud identity resolution", "Data 360", "master data management"]
---

**MDM on Salesforce** has stopped being a data-architecture topic and become a steering-committee one. On November 18, 2025, Salesforce [completed its acquisition of Informatica](https://investor.salesforce.com/news/news-details/2025/Salesforce-Completes-Acquisition-of-Informatica/) and said catalog, integration, quality, governance, metadata and master data management become part of the platform, with a promised single pipeline with MDM on Data Cloud, which the company now calls Data 360.

Anyone running Data Cloud has heard the usual question: "does this fix the duplicate-customer mess?" The honest answer is that it fixes part of it, and the other part is an organizational decision no license makes for you.

## MDM and identity resolution are not the same thing

The two terms appear side by side in sales material, and the confusion is expensive. The difference fits in two definitions:

**Identity resolution** (what Data Cloud does) groups records that look like the same person into one unified profile, using matching rules. The goal is activation: segmenting, personalizing, feeding an agent context. Source records keep existing, and the unified profile is a view built on top of them.

**MDM** (what Informatica does) decides which value is correct for each attribute and writes it to a master record, the golden record. It defines survivorship rules (if the ERP says one address and the CRM another, which one wins), assigns an owner and returns the corrected data to the source systems.

> Identity resolution answers "who is this customer?". MDM answers "which version of this data is the official one, and who answers for it?".

The distinction matters because Data Cloud can unify two records and still expose two different tax IDs for the same account, without saying which is right. For a campaign, that is tolerable. For billing, credit or an agent talking to a customer, it is not. We have already covered the [difference between Customer 360 and a CDP](/blog/en/customer-360-vs-cdp.html); MDM is the third layer of that conversation, and the one that depends most on people.

## What the acquisition changes in practice

What is confirmed is the direction: Salesforce says it will quickly integrate Informatica's stack, including integration, quality, governance and unified metadata. Informatica itself cited more than 5,000 customers in nearly 100 countries before the deal, which points to a large base already using the product outside the Salesforce ecosystem.

What is not yet confirmed, and deserves caution: integration timelines, the licensing model for MDM inside Data 360, and what happens to existing contracts for those running Informatica with other CRMs. Any proposal promising a fixed date and price for this integration is selling roadmap. In our reading, the short-term effect is more commercial than technical: MDM enters the renewal and pricing conversation, the same ground already weighing on [how Data Cloud is billed today](/blog/en/data-cloud-pricing-creditos-2026.html).

This reinforces a thesis we have held since [Data Cloud became Salesforce's central nervous system](/blog/en/data-cloud-nervo-central.html): the platform is heading toward being where customer data is governed, not just activated. For agents, that is the layer that decides whether an answer can be trusted.

## When a golden record pays off

MDM is a program, not a tool. In projects we have followed, the dominant cost is not the license, it is defining rules and owners. Five signs indicate the problem is already master data and not configuration:

1. **The same customer has divergent records in three or more systems** (CRM, ERP, billing) and sales argues about which one counts in every meeting.
2. **More than one "official" source exists for a critical field**, such as legal name, tax ID, credit limit or account hierarchy.
3. **An agent or automation acts on the data**, so a record error now becomes a wrong action, not just a crooked report.
4. **Account merging is manual and recurring**, consuming fixed hours from the operations team every month.
5. **There is a regulatory obligation over the data**, such as consent and deletion rights under Brazil's LGPD, which requires knowing where each data subject appears.

If none of these apply, the pain is probably about [clean data that will never be perfect](/blog/en/dado-limpo-e-um-mito.html), and a well-built set of deduplication rules solves it for a fraction of the cost. If two or more apply, MDM tends to pay for itself. This cutoff is our own estimate from projects we have seen, not a market benchmark.

## How to decide without buying the tool first

Order matters more than the product. The sequence we recommend:

1. **List the five attributes that cannot be wrong.** Usually tax ID, legal name, billing address, account hierarchy and customer status.
2. **Name one owner per attribute.** Without a responsible person, the survivorship rule becomes a dispute every time.
3. **Define the survivorship rule in one sentence per attribute.** If it does not fit in a sentence, the data is not ready to automate.
4. **Measure current duplication.** The percentage of duplicate accounts and time spent on manual merges make the business case.
5. **Only then choose the layer.** Rules in Data Cloud, dedicated MDM or both, depending on the measurement.

## What to do while the integration matures

There is no reason to pause a Data Cloud project waiting for MDM. The cost of waiting exceeds the cost of designing the boundary now: separating, in the design, what is a profile for activation and what is master data with an owner. Teams that do this now can move to the integrated MDM, if they choose it, without reworking the model.

It is also worth revisiting the assumption that Informatica solves [Salesforce-to-ERP integration](/blog/en/integracao-salesforce-erp.html). It helps move and qualify data, but the contract between systems remains the bottleneck, and no platform writes it for you.

## Questions that keep coming back

The doubts that come up most when MDM, Informatica and Data Cloud land in the same sentence.

## Does Data Cloud already do MDM?

No. Data Cloud does identity resolution: it unifies records into a profile for activation and context. It does not define an official value per attribute or return corrected data to source systems. The announced Informatica integration is Salesforce's attempt to cover that gap inside the platform.

## What happens to existing Informatica customers after the acquisition?

Salesforce completed the acquisition on November 18, 2025 and said it will integrate Informatica's technology into the platform. Public communication does not detail changes to existing contracts. The practical step is to review renewals and dependencies before signing long terms, since pricing and packaging tend to change.

## Does every company on Salesforce need MDM?

No. Companies with few customer data sources and well-maintained deduplication rules usually do fine without dedicated MDM. It pays off when several official sources conflict, agents act on the data or a regulation requires tracing each data subject. Before buying, measure current duplication and the cost of manual merging.
