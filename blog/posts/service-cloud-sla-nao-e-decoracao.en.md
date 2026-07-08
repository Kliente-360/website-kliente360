---
title: "Service Cloud: SLA isn't decoration — measure capacity before promising"
slug: "service-cloud-sla-nao-e-decoracao"
pillar: "sf"
date: "2026-01-27"
readMinutes: 6
excerpt: "Company promises 4-hour SLA and discovers the team delivers in 14. The cause is almost never Service Cloud — it's the number nobody calculated up front."
tldr: "SLA is a promise measured in capacity. Most companies configure Service Cloud with the SLA the customer asked for, not the one operations can deliver. Result: chronic violations, forgotten queues, dropping NPS. How to calculate real capacity, and how to negotiate an SLA that fits."
keywords: ["Service Cloud", "Salesforce", "SLA", "customer service", "operational capacity"]
---

The Service Cloud review meeting almost always has the same chart: promised SLA 4 hours, realized SLA 14, with peaks of 28 on Tuesdays. Leadership asks "why isn't the system meeting what we promised?". The IT team has the right answer but usually stays quiet: the system delivers what's deliverable. The problem is the promised number was never calculated — it was picked in a sales meeting, before operations were measured.

SLA isn't decoration in the contract. It's a promise measured in capacity. This text is about the most expensive and most common Service Cloud implementation mistake: configuring SLA rules without calculating the real capacity of the team that has to deliver.

## The genealogy of fictional SLAs

Almost every miscalibrated SLA in Service Cloud is born in the same place: sales closed a deal promising "4-hour service" because the competitor promised 6. It went into the contract. Operations discovered six months later. The Service Cloud config reflects the promise, not reality — Entitlements, Milestones, Escalation Rules all pointing to a target no one tested against capacity.

The consequence has three faces. First: chronic SLA violation. The dashboard stays permanently red, everyone learns to ignore it — and when an important violation happens, it dissolves into the noise. Second: support team under constant pressure, with predictable burnout in 6–12 months. Third: NPS dropping in the second quarter, with no clear reason — because the customer perceives an unmet SLA as a broken promise, not a configuration issue.

> A miscalibrated SLA pollutes the entire Service Cloud. When every case is in violation, no case is. The system becomes a permanently broken traffic light.

## The math nobody runs up front

The math to calibrate SLA is reasonably simple, and almost nobody runs it before implementation. Five numbers are enough for the floor.

1. **Average daily case volume.** 3–6 months of historical tickets in any channel. Distributed by hour of day, day of week.
2. **Average handle time (AHT) per type.** Not the overall average — average *by category*. Simple case (10 min), medium case (40 min), complex case (3h). Categorizing first makes a 2x difference in the final number.
3. **Agent productive time.** Not 8 hours. Subtract training, meetings, breaks, slow tooling, escalations that pause work. Realistic: 5–6 hours of effective work per shift.
4. **Peak vs. average.** Operations sized for average break at peak. Calculate weekly/monthly peak and size to cover 80–90% of peaks, not the average.
5. **% of cases that escalate.** Cases that hit the L2/L3 queue count differently — handle time explodes and effective capacity drops.

With those five, you can compute *effective capacity per hour* and *achievable SLA by category*. The number that comes out is typically higher than the promised one, sometimes much higher. Accepting that before deploying avoids everything else.

## How to configure Service Cloud on top of real capacity

When the math is done, Service Cloud delivers what it should. Four configuration decisions that matter.

**SLA by category, not a single SLA.** Simple case has 2-hour SLA. Medium case, 8 hours. Complex case, 24 hours. Entitlements and Milestones support this natively. A single promise for everything is the fastest path to failure.

**Routing that respects skill, not just availability.** Omni-Channel with queues by skill, not a single queue. An agent who knows how to solve the problem finishes in 30 minutes; one who doesn't escalates in 2 hours. SLA by skill is more realistic than SLA by channel.

**Escalation based on time *and* on symptom.** Not just "passed X hours, escalate". Also "customer replied twice without resolution, escalate". The second rule catches bad cases before SLA breaks — usually when the agent has entered an unproductive loop.

**Capacity dashboard, not just SLA dashboard.** Service Cloud delivers a [capacity dashboard](/blog/en/tableau-linguagem-executiva.html) in a few clicks: open cases per agent, average queue age, SLA projection for the next hour. That panel helps the manager redistribute before the violation — not after.

## The hard conversation: renegotiating SLA with the customer

When the math shows that the promised SLA is impossible, the honest path is to renegotiate — not pretend the system will catch up. The conversation works best in three steps.

**Show the math, not the excuse.** Customers respect numbers, not justifications. Present: "we operate with X agents, real capacity of Y cases/day, weekly peak of Z, achievable SLA on 90% of cases is W hours, not 4". A numerical argument is hard to refute.

**Offer SLA by category.** Customers rarely need 4 hours on *everything*. They need 4 hours on critical cases and tolerate 12 on routine ones. SLA tiered by severity solves the tension between cost and expectation.

**Tie aggressive SLA to investment.** If the customer *really* needs an aggressive general SLA, that changes operations sizing — more agents, specialized tooling, [Agentforce absorbing what can be automated in service](/blog/en/agentforce-atendimento-humano.html). Then the price changes. SLA is a cost, not a free promise.

## Where Service Cloud doesn't help

Worth saying what a well-configured SLA doesn't fix. It doesn't fix a broken process — an agent without authority to resolve keeps escalating, [as I argued about process before tooling](/blog/en/mapear-processos-antes-do-salesforce.html). It doesn't fix a bad product — if 30% of tickets are about the same bug, a tighter SLA doesn't change the number of tickets, just makes them arrive faster. It doesn't replace AI when volume justifies it — in large operations, an automated agent on [cases where data is enough](/blog/en/quando-agente-e-resposta.html) absorbs 30–50% of volume and frees capacity.

A well-deployed Service Cloud is one of the best service platforms on the market. But it's a platform — and a platform demands numbers before promises. Companies that accept this logic deliver reliable SLA and confident customers. Companies that keep picking SLA in sales meetings will spend the next two years explaining a red dashboard.

## Questions that keep coming back

To close, the questions I hear most often when SLA comes up.

## How do I figure out what SLA my operation can actually deliver?

By running the math before promising — five numbers are enough for the floor. Average daily case volume (3–6 months of history, distributed by hour and day of week), average handle time by category (not the overall average — splitting simple, medium, and complex cases makes a 2x difference in the result), real agent productive time (5–6 effective hours per shift, not 8), peak vs. average (size to cover 80–90% of peaks), and the percentage of cases that escalate to L2/L3.

With those five, you get effective capacity per hour and achievable SLA by category. The number that comes out is typically higher than what was promised — and accepting that before deploying is what avoids the permanently red dashboard later.

## Should I set a single SLA or an SLA per category?

Per category, always. A single promise for everything is the fastest path to failure: a simple case can carry a 2-hour SLA, a medium case 8 hours, a complex case 24 — and Entitlements and Milestones support that natively in Service Cloud. Customers rarely need 4 hours on everything; they need 4 hours on critical cases and tolerate 12 on routine ones.

Tiering by severity also defuses the commercial tension: instead of refusing the aggressive SLA, you confine it to where it matters — and if the customer genuinely needs aggressive coverage across the board, that changes operations sizing and the price. SLA is a cost, not a free promise.

## What do I do when the SLA promised in the contract is impossible to meet?

Renegotiate with numbers on the table — don't pretend the system will catch up. Customers respect math, not excuses: "we operate with X agents, real capacity of Y cases/day, weekly peak of Z, achievable SLA on 90% of cases is W hours, not 4". A numerical argument is hard to refute — and it's more honest than configuring Entitlements against a target no one tested against capacity.

Leaving it as-is costs more: chronic violations everyone learns to ignore (so the important one dissolves into the noise), predictable team burnout within 6–12 months, and NPS dropping in the second quarter, because the customer reads a blown SLA as a broken promise, not a configuration issue.
