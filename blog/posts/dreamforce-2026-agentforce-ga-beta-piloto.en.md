---
title: "Dreamforce 2026: what is GA, beta and pilot in Agentforce"
slug: "dreamforce-2026-agentforce-ga-beta-piloto"
excerpt: "Dreamforce 2026 mixed what you can buy today with what is still a pilot. A four-stage filter to separate announcement from product before budgeting Agentforce."
tldr: "Reading a Dreamforce announcement means sorting it into four availability stages — GA, open beta, pilot and announced with no date — because only the first is something you can buy, budget and put on a roadmap. At Dreamforce 2026, Agentforce Coworker was already GA, Agent Optimizer and Slackforce had GA promised for October, long-horizon agents were in pilot, the Koa model was in restricted pilot and AIforce had no date. The useful decision is neither adopting everything nor ignoring everything: instrument what is GA, pilot what is close and treat the rest as vendor direction."
keywords: ["Dreamforce 2026", "Agentforce GA beta pilot", "Agentforce Coworker", "Koa Salesforce", "Agentforce roadmap", "Agent Optimizer"]
---

**Dreamforce 2026** put products you can buy today and products still in restricted pilot on the same stage. The official recap and the press coverage treat all of it with the same launch tone. For anyone who has to approve an Agentforce budget in the first quarter, that uniformity is the problem: a keynote slide does not say which item you can contract on Monday.

The difference between availability stages decides schedule, cost and risk. A pilot item has no public price, no SLA and will change before it reaches GA. A GA item has documentation, licensing and support. Planning 2027 on top of the first group is planning on intent.

## The four stages an announcement can have

Every platform announcement falls into one of four stages. Knowing them avoids the most common and most expensive reading: taking the demo for availability.

1. **GA (general availability).** Contractable today, with documentation, price and support. It is the only stage you build a budget on.
2. **Open beta.** Any eligible customer can turn it on, but with no stability guarantee, no final price and behavior that shifts between releases. Good for learning, not for running a critical process.
3. **Pilot.** Invitation-only access, usually with the vendor's team alongside. The results shown on stage come from here. Not reproducible by any customer.
4. **Announced with no date.** Product direction. Useful to understand where the platform is heading; useless for a schedule.

> A keynote announcement is not availability. Only what has GA, a price and documentation belongs in next quarter's budget.

## What each announcement actually was

According to [Salesforce's official recap](https://www.salesforce.com/blog/dreamforce-2026-announcements/), published on September 28, the stages looked like this:

- **Agentforce Coworker:** GA. An autonomous assistant inside Salesforce that finds answers across CRM, Slack and other connected sources.
- **Agent Optimizer:** GA promised for October. Builds, tests and refines other agents.
- **Slackforce:** GA promised for October. The same idea inside Slack.
- **Long-horizon agents:** pilot, with GA promised for November. They pursue goals lasting days to months, with human approval checkpoints.
- **Koa:** pilot. Salesforce's first reasoning model for CRM, built on NVIDIA Nemotron, with GA expected only in the northern-hemisphere winter and, per [Beri's analysis](https://www.beri.net/article/dreamforce-2026-agent-operations-koa-pilot-claudeforce-open-beta), only in US regions.
- **Claudeforce:** open beta, distributed through AppExchange.
- **AIforce:** an interface layer that carries Data 360 data and Agentforce actions into other AI surfaces. No GA date.

Two observations. First, the October dates have already passed: check your edition's release notes to see whether the item actually arrived, because "promised" and "active in your org" are different things. Second, Koa's performance numbers, such as the claim of "three times fewer errors", come from a Salesforce benchmark with no published methodology. That is vendor information, not independent measurement.

## Where the value you can use today sits

The Dreamforce 2026 pattern repeats earlier years: the headline reveals, Koa and AIforce, are the ones you can buy least today. What is already available, and pays off most for anyone with an agent in production, is the operations layer: session observability, action tracing, latency and the Optimizer for diagnosing failures.

That is the least glamorous part and the most useful. An agent nobody can inspect does not scale, and [agent observability](/blog/en/observabilidade-de-agentes.html) is the prerequisite for any of the long-horizon news to work: an agent running for weeks with no trace of what it decided is risk piling up.

The second reason for caution is cost. At list price for Flex Credits, each credit costs US$0.005 and a standard action consumes 20 credits, about US$0.10. Actions above 10,000 tokens can count as multiple actions, so a multi-agent architecture can multiply the bill without the number of conversations changing. That mechanic, and the six ways of buying Agentforce, are in our piece on [the six Agentforce pricing models](/blog/en/agentforce-pricing-seis-modelos.html).

## Five questions for any platform announcement

Apply these questions to each item before putting it on a roadmap. They work for Salesforce and for any vendor.

1. **What is the stage, as written by the vendor?** If the page does not declare GA, beta or pilot, treat it as announced with no date.
2. **Is there a published price?** Without a price you cannot calculate return. Ask the account executive and record the answer in writing.
3. **What are the region, edition or language restrictions?** A GA only in the US, or only in English, is not GA for a Brazilian operation.
4. **Is the result shown reproducible?** A pilot customer story, with the vendor's team inside the project, shows the ceiling, not the average.
5. **What happens to what we already have?** Every new item touches something already running: automation, permissions, data. Assess the impact before the gain.

## Turning this into a plan

With the stages clear, the plan stops being "what Dreamforce promised" and becomes three queues.

**Queue 1 — GA now.** Instrument what already runs: observability, tracing and per-agent metrics. If the company is still in the [pilot that does not scale](/blog/en/piloto-agentforce-producao.html), this is where time is gained.

**Queue 2 — close to GA.** Long-horizon agents and items with a promised date enter as a limited internal pilot, with a defined exit criterion, and only after queue 1 is stable.

**Queue 3 — direction.** Koa, AIforce and anything without a date become a quarterly watch topic, with no budget. If one reaches GA with a price and region that fit, it moves up a queue.

The mirror-image mistake also exists: ignoring everything because part of it is still a pilot. The platform has moved, and today's architecture decisions, such as data, permissions and integrations, are what will define how much of what reaches GA you can actually use.

## Questions that keep coming back

The most frequent doubts from people deciding what from Dreamforce 2026 goes into planning.

## What does GA mean at Salesforce and why does it matter?

GA, for general availability, is the stage where a product is available to all eligible customers, with official documentation, price and support. It matters because only this stage lets you budget and contract with predictability. Beta and pilot can change scope, price and behavior before launch.

## Is Agentforce Coworker already available?

According to the official Dreamforce 2026 recap, yes: Agentforce Coworker was presented as GA, unlike Koa, AIforce and long-horizon agents. Still, confirm in the release notes and in your edition's contract, because availability can vary by edition and region.

## Is it worth waiting for GA before starting with Agentforce?

No. Waiting for GA on everything delays the work that matters most, which is preparing data, permissions and observability. What is already GA lets you start, and that preparation is the same one future items will require. Waiting makes sense only for decisions that depend on one specific pilot item.
