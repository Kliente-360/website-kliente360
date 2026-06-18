---
title: "Map the process before Salesforce: the checklist that saves months"
slug: "mapear-processos-antes-do-salesforce"
pillar: "sf"
date: "2026-01-06"
readMinutes: 6
excerpt: "Rolling out Salesforce without mapping the process means paying twice — once for the consultancy, once for the rework. The checklist that separates costly rollouts from rollouts that pay back."
tldr: "Most Salesforce projects stall in month 4 — not because of a bug, but because no one wrote the process down. Mapping before configuring is the cheapest work of the entire project. Seven questions, three artifacts, one rule for knowing when it's safe to start clicking in Setup."
keywords: ["Salesforce", "Salesforce implementation", "process mapping", "discovery", "CRM"]
---

The question that decides whether a Salesforce project will hit its deadline is not "how many licenses are we buying". It's "who designed the process those licenses will automate". In seven out of ten kickoffs that land here already behind schedule, the diagnosis is the same: someone started configuring before understanding. At some point a person opened Setup with the feeling that mapping was *fluff* — and three months later the whole team pays for that hurry in rework.

This text is the checklist we use before touching any org. It isn't a proprietary methodology, it isn't a branded framework. It's the minimum discovery that separates a rollout that pays back from a rollout that turns into a "living project" for the next two years.

## Why the process is usually implicit

In almost every mid-market company, the sales, service or post-sales process **lives inside three people's heads**. A senior rep knows when to offer a discount, the manager knows when to approve an exception, the ops team knows which lead is "garbage" without opening it. None of that is written down anywhere — it works because those three people have been in the same room (or the same WhatsApp group) for years.

Salesforce has no head. It has objects, fields, validation rules, flows. To decide anything, someone has to write the decision. And that's where the project stalls: not on the technical side, but on the *unwritten*. The consultant asks "when does a lead become an opportunity?" and gets three different answers. Each one becomes a branch in the flow. The flow becomes a maze. The user gives up.

> Salesforce doesn't automate the process: it automates the written version of the process. If the written version doesn't exist, the project is inventing process, not rolling out CRM.

The difference between a cheap project and an expensive one lives exactly here. Mapping upfront costs two to four weeks. Mapping after the fact — once the user has complained, the sponsor has escalated, the consultant has already configured — costs three to six months.

## Seven questions before opening Setup

The ruler we apply at every kickoff. If the answer to three or more is "we don't have that documented", **we stop** — discovery becomes a dedicated sprint before any configuration.

1. **What's the happy path, in numbered steps?** Lead arrives, gets qualified, becomes an opportunity, closes, becomes an account. Write the steps down. Not the sub-processes — the steps. If it goes past 12, you're describing two processes mashed together.
2. **What are the three most common non-happy paths?** Lead complains, opportunity stalls in approval, account comes back for renegotiation. Those paths cover 60–70% of real volume. If no one knows which they are, no one has looked at the history.
3. **Who decides what, at each step?** Who approves discounts above X. Who reopens a closed-lost opportunity. Who changes the owner of a strategic account. Role, not name.
4. **What's the real (not promised) SLA at each stage?** Average time leads spend in Qualification today. Average time for proposal approval. If no one measures it, Salesforce will expose it in month one — usually in a board meeting. (And [miscalibrated SLA in Service Cloud is born from the same gap between promise and capacity](/blog/en/service-cloud-sla-nao-e-decoracao.html).)
5. **What data has to be filled in for a record to advance?** Not every field matters at every stage. But at least 3–5 fields per stage are mandatory for the process to make sense. Which?
6. **Which systems feed or consume this process?** ERP, billing, marketing automation, the finance team's spreadsheet. Badly mapped integrations are the #1 cause of go-live slippage. In modern Salesforce architectures, [Data Cloud comes in as the context layer that unifies part of those systems](/blog/en/data-cloud-nervo-central.html) — but only works if the process underneath is designed.
7. **Who's going to use this day-to-day, and what does that person do in 5 minutes?** The process has to fit the user's real workflow, not the consultant's ideal one. If the rep opens Salesforce 20 times a day, every screen has to serve those 20 moments — not the 20 stages.

Whoever answers the seven without hesitating is ready to configure. Whoever hesitates on three or more is still in discovery, no matter what the project plan says — and tends to fall into [one of the five classic Sales Cloud antipatterns](/blog/en/sales-cloud-cinco-antipadroes.html) in the next phase.

## The three artifacts worth producing

Discovery doesn't have to become a book. Three artifacts solve 90% of what the configuration team will need.

**One-page process map.** A linear diagram (not a flowchart with a thousand decisions) of the happy path stages, with expected SLA at each one and the three alternate paths branching off the decision points. On one page. If it doesn't fit, it's over-detailed — it'll become a manual no one reads. The test: if the senior rep looks at it and recognizes her own work, it's ready. If she says "that's not how it actually works", the map is still fantasy.

**Field-by-stage matrix.** Simple table: rows are object fields, columns are stages, cells indicate *required*, *optional*, *read-only* or *hidden*. This document becomes direct input for page layouts, validation rules and transition rules. It's the artifact that saves the most time in configuration — and the most frequently skipped.

**Integration list with owner and SLA.** Every system that exchanges data with Salesforce, in which direction (inbound, outbound, bidirectional), at which cadence (real-time, hourly, daily), who owns the external side, and what happens when the integration breaks. Without this list, integration becomes a project-within-the-project and delays everyone.

These three artifacts fit into two to three weeks of focused work with 4–6 people. It's the cheapest investment in the entire project, and almost always the first one cut when the sponsor wants to "just get started".

## The "we'll adjust later" trap

The argument against serious mapping usually goes: *"let's get the basics live, then we'll adjust based on real usage"*. In theory, agile. In practice, three traps repeat themselves:

- **The basics become permanent.** Users learn the wrong flow, the process crystallizes, redoing it costs behavior change — far more expensive than config change.
- **Metrics come out distorted from day one.** If the "Qualification" stage means different things to different reps, the reported funnel is fiction. Leadership makes decisions on fiction for six months.
- **The first integration breaks trust.** When an order doesn't reconcile in the ERP because no one mapped the tax-exemption rule, the team questions the entire project — not the specific integration.

Continuous adjustment is healthy. Skipping discovery isn't continuous adjustment, it's technical debt being born capitalized. An honest Salesforce MVP — with process mapped before configuration — [shows what actually fits in a six-week implementation](/blog/en/implementacao-salesforce-seis-semanas.html) and what has to wait for the next cycle.

## How to pitch the checklist to the sponsor

Executive sponsors usually see discovery as cost, not investment. The conversation that works is showing the trade-off in concrete numbers: every week of solid mapping prevents about four to six weeks of post-go-live rework. The math turns positive at the first alternate path the team avoided discovering in production.

Another framing: discovery isn't a phase of the Salesforce project, it *is* the project of **defining the process Salesforce will sustain**. If the company decides it's not worth doing, the next question isn't "how do we shorten discovery?", it's "why are we buying licenses for a process no one wants to write down?". That question alone usually unblocks the budget — or opens [the honest conversation about when NOT to use Salesforce](/blog/en/quando-nao-usar-salesforce.html), because a well-done mapping sometimes shows the right tool for this moment is another one.

The best Salesforce project is the one that looks boring in month one — because the team is writing, drawing, validating — and impresses in month four, when go-live happens without the circus of incidents that became normal in the market. Discovery isn't the glamorous part. It's the part that makes configuration predictable, and predictability is what the sponsor is buying when they sign Salesforce. (Together with [a well-designed sandbox strategy](/blog/en/sandbox-strategy.html) and [careful Salesforce partner choice](/blog/en/salesforce-partner-program.html), it closes the trio defining a solid rollout.)
