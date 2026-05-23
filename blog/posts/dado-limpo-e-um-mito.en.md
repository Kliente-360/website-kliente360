---
title: "Clean data is a myth: living with imperfect quality"
slug: "dado-limpo-e-um-mito"
pillar: "data"
date: "2026-01-07"
readMinutes: 6
excerpt: "Waiting for 100% clean data before starting is the most elegant way to never ship. What separates companies that move from companies stuck in eternal quality projects."
tldr: "Clean data, in the absolute sense, doesn't exist in a company that operates. What exists is data *good enough for decision X*. Companies that understand this move the roadmap; the ones waiting for universal cleanliness stay in eternal quality projects. Three practical rules to stop stalling."
keywords: ["data quality", "data governance", "data roadmap", "MDM", "master data"]
---

The most expensive sentence in a data meeting is "we need to clean the base first". It sounds responsible. It sounds mature. And it is, more often than not, the argument that kills the analytics project, [the Salesforce project](/blog/en/mapear-processos-antes-do-salesforce.html), the AI project — without anyone noticing it killed it. Because the base never finishes getting cleaned. There's always one more field, one more duplicate, one more legacy system. And the company that decided to wait keeps making decisions in the parallel spreadsheet while the "quality project" enters its third year.

This text is against the myth that data has to be clean to be useful. It isn't against quality — quality matters, a lot. It's against the *way of pursuing quality* that paralyzes the rest of the operation.

## The myth and why it survives

The myth has three pillars. Worth naming each one, because as long as they stay implicit, the argument doesn't change.

The first is the **myth of absolute cleanliness**. The idea that there's a final state of correct data — no duplicates, no empty fields, no inconsistency between systems. That state doesn't exist in any company that still operates. Every operation generates entropy: a customer changes address, a rep types it wrong, an external system sends junk. Cleansing is continuous work, not a phase with an end.

The second is the **myth of universality**. The idea that if customer data is dirty, then every project that touches customers has to wait. False. A churn dashboard needs high quality on the "cancellation date" field and tolerates noise in "secondary phone". A collections agent needs high quality on "open amount" and tolerates noise in "market segment". *Quality is always relative to use.*

The third is the **myth of sequence**. The idea that first you clean, then you use. In practice, it's use that reveals which dirt actually matters. A company that cleans before using cleans what the technical team thinks matters — and discovers, six months later, that it cleaned the wrong things. The company that uses first sees what hurts and attacks what hurts.

> Clean data in absolute terms doesn't exist. What exists is data good enough for decision X. Everything else is an endless project disguised as governance.

The myth survives because it's comfortable. It postpones hard decisions, outsources responsibility to "the base", and gives the team a sense of rigor. The cost shows up quietly: opportunities not taken, projects cancelled, decisions made on a parallel spreadsheet with worse data than the official system.

## Three rules for living with imperfection

A decent data consultancy works like this. No magic, no new tool.

1. **Define "good enough" for each use case.** Before any project, write down: for this decision, which fields need to be correct in what percentage of records? For [an executive dashboard that drives decisions](/blog/en/tableau-linguagem-executiva.html), 98% on `amount` and `close date` solves it. For an email campaign, 90% on `primary email` solves it. For a churn model, it depends — but you need the number before starting.
2. **Use real, dirty data in parallel with cleansing.** Don't block the use case waiting for cleanliness. Run the report, build the agent, launch the campaign — with what exists. The first run will show exactly where the noise hurts. *Then* clean. That's ten times cheaper than cleaning in the dark.
3. **Make [data observability](/blog/en/observabilidade-de-dados.html) the permanent piece, not the cleansing.** Cleansing is an event. Observability is a process. Set up alerts for "% of records without tax ID on the Account object went from 5% to 12%", "average value of the Proposal stage dropped 30% without funnel variation". Those alerts tell you what to clean, when, and the real business impact. [In a modern warehouse, dbt delivers that observability via `freshness` and declarative tests](/blog/en/dbt-na-pratica.html) — it isn't a separate project.

Companies that apply those three rules start treating quality as operational practice, not as project. And the classic quality project — six-month, with consultancy, with "initial cleansing" package — becomes what it always should have been: an exception for specific problems, not the general rule.

## Where serious cleansing still makes sense

Don't confuse the argument. There are cases where upfront cleansing is necessary and worth the cost.

**System migration.** Switching CRMs, consolidating two ERPs after a merger, moving from spreadsheet to warehouse. Here cleansing is part of the migration — you don't want to carry historical junk into the new system and resurrect dead problems. But even here, "clean" means *clean for this use* — records that will operate from now on, not the 15 years of history nobody will open.

**Customer identity.** When the problem is genuinely identity — "is this customer the same one from the other system?" — a serious master data project with matching rules, dedup, golden record pays off. Without it, every downstream use case suffers, from dashboard to agent. But this is an exception, not the rule. Most companies don't need full MDM; they need good matching rules across 3–5 critical entities.

**Regulatory.** Financial services, healthcare, sensitive personal data. Here there's no choice — quality is compliance, and compliance doesn't negotiate. But the scope is narrow: the fields the regulator looks at. The rest of the base follows the "good enough" rule.

Outside those three contexts, a universal cleansing project is almost always an escape from the decision to ship.

## The invisible cost of waiting

The math nobody runs in the governance meeting: while the cleansing project runs, *decisions keep getting made*. They don't stop because data is dirty. They just migrate to the manager's parallel Excel, to the report the intern builds by hand, to the gut of the director with 20 years in the company.

That invisible cost has three components. Senior time reinventing analyses the system should deliver — easily 10–20% of a middle manager's week. Decisions made on worse data than the official system, because the parallel version never has the same history or the same rules. And loss of credibility for the data team, which becomes "the team that takes forever to deliver" while the rest of the company improvises.

When you add those three over six months of "let's clean first", you reach a number that is usually larger than the cost of the use-case project that was waiting.

## What to change in the next conversation

In the next meeting where someone says "we need to clean the base first", the question that unblocks is simple: *clean for what*. If the answer is vague ("to have a reliable base", "to ensure quality"), the project isn't ready — cleansing isn't missing, the use case is. If the answer is specific ("to run that dashboard with confidence on `contract value`"), then the cleansing scope is specific too: that field, in those records, with that threshold.

Good data isn't clean data. It's data fit for use. Companies that understand the difference move the roadmap. Those still chasing universal cleanliness will deliver their third governance plan in 2027 — and keep making decisions in a spreadsheet.
