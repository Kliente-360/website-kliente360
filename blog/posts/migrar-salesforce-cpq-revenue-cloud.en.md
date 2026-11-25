---
title: "Salesforce CPQ end of sale: migrate to Revenue Cloud now or wait"
slug: "migrar-salesforce-cpq-revenue-cloud"
pillar: "sf"
date: "2026-11-25"
readMinutes: 7
excerpt: "Salesforce CPQ no longer sells new licenses, but it has no end date. When migrating to Revenue Cloud pays off and when waiting is the right call."
tldr: "End of sale for Salesforce CPQ means the product gets no new licenses and no new features, but remains supported and renewable, with no end-of-life date announced. Migrating to Revenue Cloud (formerly Revenue Cloud Advanced) is not a tool swap: it is a redesign of catalog, pricing and contracts, because CPQ objects, price rules and scripts have no direct equivalent. Migrating now pays off for companies changing their revenue model or carrying a heavily customized CPQ; companies with a stable model can wait, as long as they use the time to clean up the catalog."
keywords: ["migrate Salesforce CPQ", "Salesforce CPQ end of sale", "Revenue Cloud Advanced", "CPQ to Revenue Cloud migration", "Salesforce Revenue Cloud"]
---

**Migrating from Salesforce CPQ to Revenue Cloud** has become a mandatory item in every renewal conversation since Salesforce put CPQ into end of sale in March 2025. Companies that quote through their CRM hear the same question from the account executive and from partners: when are you migrating? The honest answer, for many of them, is "not now". For others, it is "you are already late". What separates the two is not the age of the implementation, it is the revenue model.

The starting point needs to be precise, because the market is full of alarmist versions. According to [Salesforce's official page on the subject, updated in July 2026](https://www.salesforce.com/sales/cpq/end-of-life/), CPQ is in **end of sale, not end of life**. Existing customers keep using it, buy additional users, renew contracts and receive support and critical fixes. What ended is licensing for new customers and new functionality. There is no announced shutdown date and no forced migration.

## What end of sale actually changes in Salesforce CPQ

End of sale is a clock without a dial. Nothing breaks tomorrow, but the platform stopped moving where CPQ stands. All innovation in pricing, quoting, ordering and billing now goes to Revenue Cloud and Revenue Cloud Billing. CPQ is in maintenance mode.

In practice, this has three consequences that show up before any official date:

- **Whatever the business asks for next, CPQ will not get.** Consumption pricing, hybrid models, partner and e-commerce sales, native agent integration. Salesforce builds all of that in Revenue Cloud.
- **Customization becomes the only way to evolve.** With no new features, every sales request turns into a price rule, a calculation script (the well-known QCP, in JavaScript) or a custom field. Debt grows exactly where the migration will hurt later.
- **The talent pool shrinks slowly.** People starting their careers study Revenue Cloud. CPQ specialists get rarer and more expensive every year.

End-of-life dates circulating in the market, such as "2029 or 2030", are estimates from consultancies and tool vendors, not Salesforce announcements. Treat them as a planning hypothesis, never as a deadline.

> End of sale is not a deadline to migrate. It is a warning that every new CPQ customization makes leaving more expensive.

## Why migrating is not a tool swap

The most expensive mistake in this decision is picturing the migration as a version upgrade. CPQ is a **managed package** installed on top of the platform, with its own objects and quoting logic tied to the interface. Revenue Cloud is native to the Salesforce core, API-first, on the standard data model. Salesforce's own published comparison shows how wide the gap is:

1. **Catalog.** CPQ works with SKU-based bundles and options. Revenue Cloud works with an attribute-based catalog. A catalog of 3,000 SKUs that are really 40 products with variations does not carry over: it has to be remodeled.
2. **Pricing.** CPQ price rules and custom scripts give way to declarative pricing procedures. Business logic has to be rewritten, not copied.
3. **Configurator.** Product rules become a constraint model.
4. **Subscriptions.** Amendments and renewals in CPQ start from the contract. In Revenue Cloud, they start from the asset. That affects how the installed base is migrated and how finance sees recurring revenue.

Salesforce is explicit: CPQ-specific objects, custom fields, price rules and scripts **do not map directly** to Revenue Cloud. Standard objects migrate easily; the rest requires a structured migration. Salesforce estimates 3 to 6 months for a typical migration, from discovery to go-live, and longer for complex implementations. In our experience with mid-sized orgs, what blows that timeline is almost always the catalog, not the technology.

Then there is the naming noise. The product has been called Revenue Lifecycle Management, Revenue Cloud Advanced, Agentforce Revenue Management and, on Salesforce's most recent pages, Revenue Cloud again. In the [post on Sales Cloud becoming Agentforce Sales](/blog/en/sales-cloud-vira-agentforce-sales.html) we recorded the "Agentforce" phase. It is the same product at every stage; what matters is the contracted scope, not the label.

## When migrating now pays off and when waiting is the right call

The decision gets simpler when it leaves technology and moves to revenue. In our reading, four signals show that waiting costs more than migrating:

1. **The revenue model is changing.** Consumption billing, hybrid plans, partner channel or self-service sales. CPQ handles consumption poorly and was designed for direct sales; every adaptation becomes code that will not migrate.
2. **CPQ is already more script than configuration.** If the QCP has thousands of lines and only one person understands it, the migration is also a chance to get business rules out of someone's head. It is the same pattern as [technical debt from overlapping automation in Salesforce](/blog/en/divida-tecnica-salesforce-automacao.html): layers nobody can explain anymore.
3. **A commercial redesign is underway.** New catalog, new discount policy, new product line. Doing it in CPQ and then again in Revenue Cloud means paying twice.
4. **Billing is the bottleneck.** If post-sale depends on spreadsheets between CPQ and the ERP, Revenue Cloud plus Revenue Cloud Billing attacks the cause, not the symptom.

The opposite also holds. Waiting is legitimate when the commercial model is stable, CPQ has little customization, quoting works and there are bigger priorities in line, such as data quality or the agent rollout itself. In that case, CPQ remains supported and the migration can be planned for a future renewal window.

What is not legitimate is waiting and doing nothing. Whoever postpones the migration should use the time to freeze new CPQ customizations and clean up the catalog.

> A clean catalog is the only CPQ work that survives the migration to Revenue Cloud intact.

## Six steps to prepare the migration without stopping quoting

Whether now or in two years, the sequence we recommend is the same:

1. **Inventory the logic, not just the objects.** List price rules, product rules, calculation scripts, flows and integrations that touch quoting. For each item, write down the business rule it implements, in plain language, without jargon.
2. **Rationalize the catalog first.** Group SKUs into products with attributes, retire what has not sold in 12 months and assign an owner to each family. This is the step that cuts the most time and depends most on sales, not IT.
3. **Pick the approach based on what the business will change.** Salesforce describes four: lift and shift with minimal redesign, selective transformation, full rationalization, or starting Revenue Cloud in a new business unit or product line. Lifting a messy catalog just moves the mess.
4. **Prefer a bridge over a big bang.** CPQ and Revenue Cloud can coexist in the same org with the right licenses. New business goes into Revenue Cloud; existing contracts stay in CPQ until renewal. It lowers the risk of stopping quoting.
5. **Migrate contracts and assets last.** Products and pricing must be configured before any transactional data. Reversing that order is the most common source of rework. Pay extra attention to the ERP integration, where the problem is usually the data contract, not the architecture.
6. **Bring the decision to the renewal table.** The migration is a commercial argument. Implementation credits, parallel license periods and price freezes are negotiable, and Gartner advised buyers, in a September 2026 note, to expect increases of 12% or more on Salesforce renewals. Negotiating without a migration plan means giving up your strongest argument.

It is worth recalling what the [post on CPQ in B2B SaaS](/blog/en/cpq-saas-b2b.html) already argued: the value of a quoting tool lies in the proposal the customer understands and signs, not in the PDF the rep generates. That yardstick does not change with the platform.

## The migration is a revenue redesign, not a system swap

Salesforce reports that about 15% of Revenue Cloud customers came from CPQ. In other words, most of the CPQ base has not moved yet, and there is no imposed technical urgency. Urgency, when it exists, comes from the business: a revenue model CPQ can no longer keep up with.

Those who treat the migration as an IT project will move old rules to a new platform and find out, six months later, that nothing improved. Those who treat it as a review of catalog, pricing and contracts come out with a simpler commercial operation, and Revenue Cloud becomes a consequence, not a goal.

## Questions that keep coming back

The questions that come up most often when a Salesforce renewal puts CPQ on the table.

## Will Salesforce CPQ stop working?

There is no date for that. Salesforce CPQ has been in end of sale since March 2025: it sells no licenses to new customers and gets no new features, but existing customers keep using it, buying users, renewing and receiving support and critical fixes. End-of-life dates circulating in the market are third-party estimates, not Salesforce announcements.

## How long does it take to migrate from Salesforce CPQ to Revenue Cloud?

Salesforce estimates 3 to 6 months for a typical migration, from discovery to go-live, with longer timelines for complex implementations. In practice, the biggest factor is the state of the product catalog and the number of custom price rules and scripts, because those elements do not map directly and have to be redesigned.

## Can Salesforce CPQ and Revenue Cloud run in the same org?

Yes. Salesforce allows the CPQ and Billing packages to coexist with Revenue Cloud in the same org, as long as the required licenses and features are enabled. That makes the bridge approach possible, where new business goes into Revenue Cloud and existing contracts stay in CPQ until renewal.
