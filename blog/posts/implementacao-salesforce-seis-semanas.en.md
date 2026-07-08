---
title: "Salesforce in 6 Weeks: What Actually Fits in an MVP"
slug: "implementacao-salesforce-seis-semanas"
pillar: "sf"
date: "2026-06-02"
readMinutes: 6
excerpt: "Six weeks is the honest minimum for a functional Salesforce MVP. What belongs in scope, what doesn't, and how to validate before signing the contract."
tldr: "A Salesforce implementation in 6 weeks is achievable — with an honest scope. What fits in a real MVP: Sales Cloud with a mapped sales process, configured pipeline, basic reporting, and structured adoption. What doesn't fit: ERP integrations, complex Flows, multiple Clouds, heavy object customizations. Proposals promising '14 days' deliver configuration, not implementation."
keywords: ["Salesforce implementation", "Salesforce MVP", "Sales Cloud", "Salesforce project", "CRM timeline"]
---

Every "Salesforce in 14 days" proposal is real in some sense — and misleading in the sense that matters. What gets delivered in 14 days is a configured org, not an implementation. The difference is the same as between a spreadsheet and an actual sales process: one has an interface, the other has logic.

Six weeks is the honest minimum for a Salesforce MVP that serves as a real operational foundation. More than that may be needed depending on scope. Less than that is configuration with a 90-day expiration date.

## What "14 Days" Actually Delivers

An "express implementation" in two weeks typically delivers: org creation, default object configuration (Account, Contact, Opportunity), lead import from a spreadsheet, one or two basic dashboards, and user access. That's a guided installation, not an implementation.

What it doesn't deliver: a sales process mapped to Salesforce stages, field validation by funnel stage, basic automation that has been tested, email integration captured as activity, a report the sales manager will actually use in weekly reviews, or a rollout with genuine adoption. These elements take time — not because the tool is complicated, but because they depend on human decisions about process.

The 14-day promise makes sense when the client already knows exactly what they want, has clean data to migrate, and doesn't need anything beyond the standard configuration. That client exists. But it's not the majority. For companies still defining their process, 14 days delivers a tool no one uses — and within 90 days the org is in a state of abandonment.

## What Fits in 6 Weeks

An honest Salesforce MVP in six weeks can deliver a well-defined set of outcomes:

1. **Mapped sales process.** Opportunity stages that reflect the company's actual funnel — not Salesforce's default template. Includes entry and exit criteria per stage, mandatory fields per phase, and an inline qualification guide.

2. **Configured pipeline.** Sales Cloud with a working kanban view, filters by segment, sorting by close date, and — most importantly — a funnel report the manager can read in 5 minutes at the start of each week. A report that drives decisions, not one that just "exists somewhere."

3. **Integrated activity logging.** Email connected (Gmail or Outlook via Einstein Activity Capture), call logging if the team uses a softphone, and a basic follow-up template that salespeople actually use — not one that stayed in the training slides.

4. **Structured adoption.** Not training — adoption. Two sessions with the team, usage monitoring during the first two weeks post-go-live, and the manager using the Salesforce report as the official management tool in weekly reviews. This is what separates an org that becomes a habit from one that slowly dies.

5. **Minimum sandbox cycle.** Every change goes to sandbox first, validated by a key user, then promoted to production. [A sandbox strategy isn't a luxury for large enterprises](/blog/en/sandbox-strategy.html) — it's what prevents the project from surfacing months later with uncontrolled changes and no one knowing who configured what.

This scope is specific by design. Five clear building blocks. If any of them isn't in the contract, the MVP depends on whoever is delivering it to do the right thing voluntarily — and that's a management fragility, not a partnership.

## What Does NOT Fit in 6 Weeks

Knowing what to exclude is just as important as knowing what to include — and communicating that before signing.

Does not fit in six weeks:

- **ERP integration.** Salesforce ↔ SAP, Totvs, Oracle, or any ERP are separate projects with their own contracts. Trying to embed integration into a 6-week MVP results in inconsistent data on both sides and debugging that consumes the go-live window.

- **Complex Flow automation.** Automation that sends customer-facing emails, generates proposal documents, or moves stages automatically requires exception mapping and load testing. In an MVP, automate internal notifications; leave external automation for the next cycle.

- **Multiple Clouds simultaneously.** Sales Cloud + Service Cloud + Marketing Cloud in a 6-week sprint isn't an MVP — it's a sprint to failure. Each Cloud has its own adoption curve and configuration complexity. Start with Sales Cloud, stabilize, then expand. The same compressed timeline shows up in [Pardot to Marketing Cloud Engagement migrations](/blog/en/migracao-pardot-marketing-cloud.html) — the proposal promises a quick upgrade, and the real project reveals a full reimplementation.

- **Heavy object customization.** Custom objects beyond Account, Contact, Opportunity, and Lead belong in an MVP only if the process genuinely can't work without them. In most cases, [mapping the process before configuration](/blog/en/mapear-processos-antes-do-salesforce.html) reveals that a well-configured standard object solves the problem — and saves 2 to 4 weeks of project time.

- **Executive-level reporting.** Cross-object dashboards, historical trends, conversion cohorts — that comes in the second wave, once you have 60 or more days of real data. An MVP dashboard is tactical, not strategic.

> An MVP isn't a poor version of the product. It's the version that delivers complete value within a smaller scope — and survives 90 days of real use without needing to be patched.

## How to Validate Whether the Scope Fits in 6 Weeks

Before signing, run the scope through four questions:

1. **How many custom objects?** More than 2 non-standard objects in the MVP, and the timeline is already at real risk.

2. **Does it involve integration with a legacy system?** Any integration beyond Salesforce's documented OAuth/APIs (like Gmail and Outlook) multiplies timeline risk by a factor of at least 2x.

3. **Is the sales process mapped before the project starts?** If the answer is "we'll define it during the project," a 6-week timeline will become 12. Undocumented process is the number-one cause of blown timelines in CRM implementations.

4. **How many users at go-live?** Above 30 users, the adoption rollout needs its own budget and schedule — it can't be a single training session on the last day of the project.

If more than two answers are "no" or "above the limit," the honest scope is 10 to 12 weeks. Saying so upfront isn't a problem. Discovering it in week 5 is.

## The First 14 Days of a 6-Week Project

Ironically, the 14 days that an express implementation delivers as a complete product are the 14 days of diagnosis and mapping in a proper 6-week project. They're the foundation — not the result.

**Weeks 1–2 — Diagnosis and mapping.** Understand the sales process, map the stages, inventory data to migrate, define mandatory fields, validate email integration. This work is invisible to anyone looking from the outside. It's conversations, workshops, and process documents. Nothing appears on the Salesforce screen yet — but this is what determines whether the project moves forward cleanly or becomes rework in 60 days.

**Weeks 3–4 — Configuration in sandbox.** Everything mapped in phase 1 goes into the test org. Key users test with real data. Adjustments based on feedback from whoever will actually use the system, not just from whoever signed the contract. That distinction matters.

**Weeks 5–6 — Phased go-live and adoption.** Go-live with a pilot group, adoption-focused training (not a tutorial), usage monitoring. The manager starts using the Salesforce report in weekly reviews. Salespeople start seeing that logging in the system saves time rather than adding to it.

[The antipatterns that sink Sales Cloud projects](/blog/en/sales-cloud-cinco-antipadroes.html) appear precisely when this structure gets compressed by a 14-day promise — fields accumulating without owners, untested automation going live in production, adoption treated as a last-day training session.

## Six Weeks as a Floor, Not a Ceiling

The right question before signing a contract isn't "what's the shortest timeline possible?" It's "what's the shortest timeline for an MVP that will last 12 months without needing to be rebuilt?"

Six weeks delivers that — if the scope is honest from the start. The company that enters the project with calibrated expectations, a process mapped before the project begins, and a manager committed to adoption will end up with a working org and a foundation to grow. The company that expects 14 days because the proposal promised 14 days will end up with a configured org that needs to be reimplemented.

The difference isn't Salesforce. It's what actually fits in a project — and the willingness to say so before signing.

## Questions that keep coming back

To wrap up, the questions that come up most whenever implementation timelines are on the table.

## Can you really implement Salesforce in 14 days?

You can configure it — you can't implement it. What an "express implementation" delivers in two weeks is org creation, standard objects configured, leads imported from a spreadsheet, one or two basic dashboards, and user access. A guided installation. What's missing is exactly what makes a CRM work: a sales process mapped to stages, field validation per funnel phase, tested automation, a report the manager actually uses in weekly reviews, and a rollout with genuine adoption.

The 14-day promise only makes sense when the client already knows exactly what they want, has clean data, and needs nothing beyond the standard configuration. That client exists, but it's not the majority. For companies still defining their process, 14 days delivers a tool no one uses — and within 90 days the org is abandoned.

## What gets left out of a 6-week Salesforce MVP?

Five things, and they're worth communicating before signing: ERP integration (Salesforce ↔ SAP, Totvs, Oracle is a separate project with its own contract), complex Flow automation that emails customers or generates documents, multiple Clouds at once (Sales + Service + Marketing in 6 weeks isn't an MVP, it's a sprint to failure), heavy customization beyond the standard objects, and sophisticated executive reporting — boardroom dashboards come in the second wave, once you have 60+ days of real data.

An MVP isn't a poor version of the product. It's the version that delivers complete value within a smaller scope — and survives 90 days of real use without needing to be patched.

## How do I know if my scope actually fits in 6 weeks?

Run the scope through four questions before signing: how many custom objects (more than 2 non-standard ones puts the timeline at real risk); whether there's legacy system integration (anything beyond Salesforce's documented OAuth/APIs multiplies timeline risk by at least 2x); whether the sales process is mapped before the project starts (undocumented process is the number-one cause of blown CRM timelines); and how many users at go-live (above 30, adoption needs its own budget and schedule).

If more than two answers are "no" or "above the limit," the honest scope is 10 to 12 weeks. Saying so upfront isn't a problem. Discovering it in week 5 is.
