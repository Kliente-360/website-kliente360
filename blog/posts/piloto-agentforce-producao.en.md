---
title: "Agentforce pilots: where 90% stall and what the 10% do differently"
slug: "piloto-agentforce-producao"
pillar: "sf"
date: "2026-09-15"
readMinutes: 7
excerpt: "Under 10% of Salesforce's own customers scale Agentforce past a pilot — real production takes 5 to 11 months, not the promised 3 to 6 weeks."
tldr: "An Agentforce pilot that never reaches production is an agent that clears proof of concept but never becomes part of the company's real operation — today the fate of over 90% of Salesforce customers who test the platform. An independent 2026 analysis puts real time-to-production between 5 and 11 months, against the 3 to 6 weeks of the sales pitch, and points to process redesign and a formally named agent owner — not technical limitation — as what separates the ones who scale from the ones who stall. A broader industry survey confirms the pattern: 78% of enterprises already run some AI agent pilot, but only 14% have scaled one to real organizational use."
keywords: ["Agentforce pilot", "Agentforce production", "pilot to production", "scaling AI agents", "agent governance", "Agentforce adoption"]
---

**Under** 10% of Salesforce's own customers who tested Agentforce have scaled the agent past the pilot. The number doesn't come from a competitor or a skeptical analyst — it comes from market analysis that cross-referenced real adoption data against the platform's own sales pitch. Most companies that sign up for the pilot never reach the second phase.

The pattern isn't unique to Agentforce. A March 2026 survey of 650 enterprise technology leaders found 78% of companies already running at least one AI agent pilot — but only 14% had scaled an agent to real organizational use. The gap between those two numbers is the most expensive funnel of 2026: not the cost of testing an agent, but the cost of never deciding whether it becomes an operation.

## The symptom: the pilot gets approved, production never arrives

The pattern repeats in nearly every Agentforce pilot that stalls: the technical team approves the agent because it performed well within the tested scope, someone presents the result in a meeting, everyone agrees it "worked" — and the project stops right there. Not because the agent failed. Because no one decided, before the pilot began, what needed to be true for it to become part of the operation.

Deloitte's 2026 Tech Trends report documents the scale of the problem: 89% of AI agent pilots fail before reaching production, and only 11% cross that line. The cause isn't the language model behind the agent — it's the absence of a defined path between "the pilot worked" and "this now runs every day, with someone accountable for it." Without that path, a pilot that performed well simply has nowhere to go.

> The pilot doesn't fail when the agent makes a mistake — it fails when no one decided, beforehand, what needed to be true for it to leave proof of concept.

## Five to eleven real months, against three to six promised weeks

The first source of friction is the gap between what the sales proposal promises and what the operation actually requires. Salesforce sells three-to-six-week implementation cycles. An independent analysis of real 2026 Agentforce projects puts time to production — with a systems integrator involved in most cases — between 5 and 11 months.

That gap isn't sales exaggeration or customer slowness. It's the time process redesign actually consumes — time the three-to-six-week proposal never included as a step. [The same pattern already showed up in the promise of a six-week Salesforce implementation](/blog/en/implementacao-salesforce-seis-semanas.html): the short timeline covers technical configuration, not the process change that decides whether the project sticks.

1. **Weeks 1 to 4 (what the proposal covers).** Configure the agent, connect the data source, validate in a controlled environment with a curated test case.
2. **Months 2 to 6 (what the proposal doesn't cover).** Redesign who approves what when the agent acts on its own, decide where human review stays mandatory, train whoever operates the agent day to day — not just whoever monitors it.
3. **Months 6 to 11 (where most stall).** Formalize an agent owner, build continuous evaluation infrastructure, approve a recurring maintenance budget — none of these three steps is in the original proposal, and all three are prerequisites to leaving the pilot.

## What stalls isn't the agent — it's the process around it

An Agentforce pilot almost always runs on a controlled slice of the operation: [data curated by the team itself, a stable tool set, and human review of every output before it becomes an action](/blog/en/seguranca-de-agentes-piloto-nao-testa.html) — the same three conditions production removes, one at a time, as the agent scales. A successful pilot measures competence on a known task. It doesn't measure whether the company redesigned the process around it enough to withstand the agent deciding on its own, at scale.

This is where most companies confuse two different problems. The first — does the agent work technically — the pilot already answered. The second — who approves what when the agent errs, who has authority to pause it, who answers for the outcome — usually hasn't even been asked yet. [Without one person formally accountable for the agent from day one until decommissioning](/blog/en/dono-do-agente-cargo-2026.html), the decision to scale has no one to make it — and the pilot dies of starvation, not formal rejection.

The governance part of the problem is measurable: only 21% of companies report having a mature governance model for agentic AI, per the same Deloitte report. Governance here doesn't mean a committee or a written policy sitting in an intranet — it means a prior decision about where the agent can act alone, where it needs human approval, and who revisits that boundary as the agent gains new scope. A company that treats an autonomous agent like a dashboard — deploy it, approve it, forget it — discovers the gap only after the first visible incident.

## What the 10% do differently

The minority that scales doesn't have access to different technology than everyone else — the model behind Agentforce is the same for every customer. The difference is operational, and it repeats across four points:

1. **They name an agent owner before approving the pilot, not after.** The question "who answers for this when it goes wrong" has a defined answer before the first real case passes through the agent — it isn't debated in a crisis meeting after the first visible error.
2. **They redesign the approval flow, not just configure the agent.** They decide, by decision category, where the agent acts without intervention and where human review stays mandatory — instead of keeping the old approval process identical and simply inserting the agent in the middle of it.
3. **They build continuous evaluation before they need it.** They measure the agent's accuracy in production, not just on demo day — the same discipline missing from most AI reports today.
4. **They budget recurring maintenance from the pilot onward.** They know, before approving the next phase, that an agent in production consumes ongoing prompt review, tool updates, and scope adjustment — it isn't a project that ends when the pilot "works."

None of these four points requires a new platform feature. It requires an organizational decision made while the pilot is still running — not after it has already proven it works technically and no one knows the next step.

## Scaling isn't luck — it's a decision someone needs to make

A pilot that never becomes production isn't, in most cases, a pilot that failed. It's a pilot that worked well enough not to die — and wasn't defined well enough for someone to decide to scale it. Meanwhile, commercial demand for Agentforce keeps growing: paid deals grew 50% quarter over quarter in fiscal Q3 2026, a sign that pilot-to-contract conversion is happening — just concentrated in a small slice of customers who solved the organizational problem before asking for the next budget.

The question that decides whether a company stays in the 90% or joins the 10% isn't technical. It's whether someone, before the pilot ended, took responsibility for deciding what needed to be true for it to leave proof of concept.

## Questions that keep coming back

To close, the most common doubts about why Agentforce pilots don't reach production.

## Why don't most Agentforce pilots turn into production?

Because the pilot measures whether the agent works technically within a controlled scope — curated data, a stable tool set, human review of every output — and doesn't measure whether the company redesigned its approval process, named a formal owner, and budgeted the recurring maintenance real operation requires. Under 10% of Salesforce's own customers scale past that phase, and the most cited reason in 2026 research is organizational, not technical: there's no defined path between "the pilot worked" and "this is now part of daily operation."

## How long does it actually take an Agentforce pilot to reach production?

Between 5 and 11 months, according to independent analysis of real projects — well beyond the 3 to 6 weeks the sales proposal typically announces, and almost always with a systems integrator involved. The short timeline covers technical configuration; the additional time is consumed by process redesign, defining an agent owner, and building continuous evaluation — steps that rarely appear in the initial proposal.

## What's different between a company that scales the agent and one that stalls at the pilot?

Four practices concentrate the difference: naming an agent owner before approving the pilot (not after an incident), redesigning the approval flow by decision category instead of keeping the old process with the agent slotted into the middle of it, continuously measuring the agent's accuracy in production, and budgeting recurring maintenance from the pilot phase onward. None of these practices depends on a new platform feature — they depend on an organizational decision made while the pilot is still running.
