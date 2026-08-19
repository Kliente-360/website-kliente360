---
title: "Agent Observability: Who Answers When the Agent Fails Alone"
slug: "observabilidade-de-agentes"
pillar: "ai"
date: "2026-08-19"
readMinutes: 7
excerpt: "48% of AI agents in production run unmonitored, and only 7% of companies have someone named to answer when it fails."
tldr: "Agent observability is the continuous instrumentation that tracks every decision, tool call, and outcome of an AI agent in production — different from evaluation, which measures accuracy in periodic samples. A Gravitee survey of more than 900 executives and technical practitioners found average agent monitoring coverage at 52%, leaving 48% of the fleet uninstrumented, and that only 7.2% of companies have a person formally accountable for an agent's behavior. The gap isn't shrinking over time: it grows alongside the number of agents in production, because deployment speed is outpacing instrumentation."
keywords: ["agent observability", "AI agent monitoring", "agent tracing", "agent owner", "AI agent governance"]
---

**An AI agent** approves the wrong refund at three in the morning. Nobody sees it — there's no structured log for that decision, only the customer complaint logged two days later, in a channel nobody cross-references with the agent's behavior. This isn't a worst-case hypothetical: it's the industry average in 2026, when most AI agents in production run with insufficient visibility into what happened, when, and why.

The fleet of AI agents in production doubled since December 2025, according to the *State of AI Agent Security 2026*, a Gravitee survey of more than 900 executives and technical practitioners. Monitoring coverage didn't keep pace — it stayed stagnant near 50% while the number of agents grew. In practice, that means the absolute number of unmonitored agents didn't fall: it rose, because deployment speed outpaced instrumentation speed.

## The symptom: the agent fails and the first signal comes from the customer

The pattern repeats in nearly every operation that's had a real agent incident: nobody on the technical team saw the drift before it became a visible problem. The first signal arrives through the wrong channel — a support complaint, a screenshot in an internal group, a board question after a news story. When someone finally investigates, the basic question ("what did the agent decide, and why, in this specific interaction") has no answer, because the execution left no trace.

That vacuum is different from the classic system-monitoring problem. API uptime, database latency, HTTP error rate — most operations already measure that well. What's missing is visibility into the agent's *decision*: which tool it called, in what order, with what data, and why it chose that path over another. An agent can have 99.9% uptime and, at the same time, decide wrong in 15% of interactions — the two numbers live in different dashboards, and most companies only look at the first one.

The cost of that vacuum isn't just the isolated incident — it's the inability to answer, with data, the question every executive asks after the first visible error: "had this already happened before, at smaller scale?" Without a structured trace, the answer is always a reconstruction from memory, and that doesn't convince an auditor, a board, or a customer.

## 48% of the fleet runs unmonitored — and the gap is growing

The central number in Gravitee's survey is direct: average monitoring coverage for AI agents in production is 52%, leaving 48% of the fleet running without instrumentation. Only 9.5% of organizations monitor more than 81% of the agents they've deployed — most operate with patchy coverage, seeing part of the fleet and flying blind on the rest.

The most revealing data point isn't the isolated percentage — it's the trend. Average coverage has barely moved since December 2025 (from ~47% to the current 52%) in the same period the total agent fleet doubled. That confirms, with market data, the pattern we already logged in the [90-day field diary of running 5 agents in production](/blog/en/multi-agent-em-producao.html): coordination and observability break before the model does, and when a company scales agents faster than it scales instrumentation, the gap doesn't close on its own — it accumulates.

> An unobserved agent isn't cheaper — it just hides the cost until the incident shows up.

Accountability pressure makes it worse. The same survey found that only 7.2% of organizations have a person formally accountable for a specific agent's behavior — most describe accountability as unclear, shared without definition, or simply never discussed. Without an execution trace, even a company that named that person wouldn't give them much to work with: an [agent owner](/blog/en/dono-do-agente-cargo-2026.html) without instrumentation is a title without an instrument — the person has formal authority and no data to exercise it in time.

## What agent observability is — and why it isn't an uptime dashboard

Agent observability is the practice of instrumenting every execution of an AI agent so that, after the fact, you can reconstruct the full decision path: which tool was called, in what order, with what input data, where the flow deviated or escalated to a human, and what the final outcome was. It differs from classic infrastructure monitoring, which measures whether the system is up; agent observability measures whether the decision the system made made sense.

The framework consolidating in the market organizes the practice around four complementary axes: **tracing** (the structured record of the execution path, now mostly standardized on OpenTelemetry), **continuous evaluation** (a quality signal in production, not just isolated testing), **cost** (latency and inference spend per interaction, not aggregated by batch), and **governance** (the policy defining who reviews what and how often). Missing any one of the four leaves a blind spot: trace without evaluation shows what happened but not whether it was right; evaluation without trace shows the accuracy rate but not where the error started.

Many companies confuse "we have an observability tool" with "we've instrumented the agent" when in practice they just turned on a latency-and-HTTP-error panel — the same one they already use for any API. That measures whether the agent is up. Not whether it's right.

## Four signs your agent operation actually observes

Few operations have all four signs below at once — and it's precisely the combination, not any single item, that closes the gap between incident and response.

1. **Full trace per execution, not per batch.** Every tool call, routing decision, and intermediate result is logged individually — not just the final output aggregated into a weekly report.
2. **Cost and latency per interaction.** Without per-conversation granularity, nobody isolates which specific interaction blew the inference budget or hung — [the same problem that shows up when a company tries to charge internal AI consumption without measuring it by user](/blog/en/finops-de-ia.html).
3. **Continuous quality signal, not just periodic evals.** A fixed eval set catches regression between releases; [production sampling reviewed by a third party catches the drift that only shows up after the system is live](/blog/en/avaliacao-de-agentes.html). Observability without that second protocol sees the execution, but not whether it was right.
4. **Alerts that reach a named person, not a generic channel.** A drift detected at 3am that only shows up on a dashboard nobody checks until Monday hasn't closed the gap — it's just changed its shape.

## Without instrumentation, the agent owner decides in the dark

The agent owner role — now present at 56% of companies running AI at scale, per market research — solves half the problem: it gives a specific agent a named person with authority and budget to answer for it. But authority without signal doesn't produce a better decision, it produces a faster one in the dark. An agent owner without an execution trace discovers the drift the same way they would with no role at all: through the incident, not the instrumentation.

That explains why Gravitee's two numbers move together: 48% of the fleet unmonitored and 7.2% of companies with a named owner aren't two separate problems — they're the same gap seen from two angles. Instrumenting without naming an owner leaves the data with nobody to decide on it; naming an owner without instrumenting leaves the decision without data to support it. Both need to exist together — and most companies, today, don't have meaningful coverage of either.

> Seven in a hundred companies know, today, who answers when the agent fails. The rest find out during the incident.

Closing that gap isn't a six-month project. It's an architecture decision made before the next agent goes into production: instrumenting tracing, cost, and continuous evaluation as part of the deployment — not as a separate initiative "we'll do after the pilot proves value." Once the pilot becomes production at scale, instrumenting gets more expensive, and the gap has already produced the first unexplained incident.

## Questions that keep coming back

To close, the most common questions about AI agent observability.

## What is AI agent observability?

AI agent observability is the instrumentation that structurally records every decision, tool call, and outcome of an agent during its execution in production — allowing you to reconstruct after the fact what happened, when, and why. Unlike infrastructure monitoring, which measures whether the system is up, agent observability measures whether the decision it made made sense. The framework consolidating in the market organizes the practice around four complementary axes: execution tracing, continuous quality evaluation, cost per interaction, and governance over who reviews what.

## Does observability replace agent evaluation?

No — the two answer different questions and complement each other. [Evaluation measures, in a sample, whether the agent's response was correct](/blog/en/avaliacao-de-agentes.html), typically with a fixed eval set run on every release and periodic production sampling reviewed by a third party. Observability captures the full trace of every execution, in real time, letting you investigate a specific interaction after something goes wrong. A company that only evaluates knows the aggregate accuracy rate but can't reconstruct a specific incident; one that only instruments trace sees what happened but doesn't know if it was right without the second, evaluation layer on top.

## Who should own agent observability?

The same person who answers for the agent — the [agent owner](/blog/en/dono-do-agente-cargo-2026.html), when that role exists, or whoever informally carries the function. Observability shouldn't be a project isolated inside the platform team, disconnected from whoever has the authority to pause or fix the agent: data with nobody to decide on it produces a dashboard nobody checks, and an owner without data decides without an instrument. A company that formally separates the two responsibilities tends to repeat, in observability, the same vacuum that motivated creating the agent owner role in the first place.
