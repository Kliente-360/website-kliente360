---
title: "Multi-agent in production: what we learned running 5 agents for 90 days"
slug: "multi-agent-em-producao"
pillar: "ai"
date: "2026-05-05"
readMinutes: 9
excerpt: "Field diary of 90 days with 5 agents running in production. What worked, what broke, and the real cost of keeping a multi-agent system alive."
tldr: "Multi-agent is sold as inevitable architecture. In real operation, it's fragile, expensive, and demands organizational muscle nobody anticipates. Five agents running together for 90 days taught us that coordination, observability and rigorous domain definition are more critical than framework choice. This text is the diary, with errors named."
keywords: ["multi-agent", "AI agents", "production", "LLM", "agent orchestration"]
---

**I**n February 2026, we put five agents to work together on a real use case — not pilot, not demo, production with SLA. In May, we completed 90 days of that operation. This text is the diary of what we learned. There's no triumphant moral — it's the report of named errors, reverted decisions, and the technical bill that no framework white-paper mentions.

The scenario: a B2B company using 5 agents for a [pre-sales flow assisted by generative AI](/blog/en/ia-generativa-vendas.html). One agent extracts context from incoming email. Another researches the sender's company in external sources. Another classifies intent. Another proposes next action. Another writes a draft response. Real volume: about 3,000 interactions/month. Models used: Claude Sonnet for the first 4, GPT-4o-mini for the last. Orchestration: own framework in Python (we tested LangGraph and CrewAI before — we went back to custom solution).

## Week 1 — The illusion of independence

We started thinking each agent would be an independent microservice, communicating through simple JSON contracts. The first problem appeared on day 3: the context extraction agent produced output that the intent classification agent misinterpreted in ~15% of cases. Not because of a bug — because of subtle difference between what one considered "subject field" and the other considered "main topic".

The lesson: data contracts between agents are not trivial. Each agent has its own mental model of the world (coming from prompt + training + call context). When two agents operate over the same concept without rigorous shared definition, they diverge silently. This problem doesn't appear in demos (small volume, cherry-picking) — it appears in production.

Solution adopted in week 2: each agent began emitting output in strict JSON schema (Pydantic in Python), with explicit validator and documented fallback. Cost: 30% more tokens per call (more verbose output). Benefit: silent errors dropped from 15% to <2%. Didn't eliminate — reduced to the point of becoming manageable.

## Week 3 — The hidden cost of coordination

When you have 5 agents in series, latency is the sum of latencies. When you have them in parallel, latency is the slowest one. In both configurations, cost is the sum of costs. That's trivial on paper. It's not trivial when the end user expects response in < 5s and the system takes 22s.

We invested the entire week 3 in optimization: aggressive prefetch (agents that can run before the final request), local cache with key by input hash, prompt reduction by 40% via pre-computed embedding of fixed context. Latency dropped to 7s. Still high. The real solution came in week 4 — rethink the architecture.

> Multi-agent in series is a sequence of latencies and a sequence of costs. Each new agent multiplies both. Whoever proposes a multi-agent system without considering this is selling architecture without touching the bill.

## Week 4 — What we killed

In week 4, we killed an agent. The "intent classification" one was producing output that the next agent (action proposal) consumed but rarely used in a differentiated way. It was cost without value delivery. We removed the agent, inlined the function into the action proposal agent as a prompt instruction, and the system's final accuracy went up marginally. We reduced cost by 22% and latency by 4s.

Expensive lesson: specialized agents seem right in architecture (separation of concerns principle), but are frequently organizational luxury. In cases where two contiguous agents have the same "mental perspective" (same model, similar prompts, output of one goes directly into the other), merge them. Each extra agent is budget — it's only worth it if specialization really pays.

## Week 6 — Observability was the real bottleneck

In any serious project, observability enters the roadmap as "ah, later". Here it became the most important thing. Without tracking each call (input, output, time, cost, model, decision), none of the diagnostics above would have been done. We invested in [evals and observability](/blog/en/avaliacao-de-agentes.html) as much as in agent logic itself.

In practice, we decided to invest in three layers:

1. **Structured log in warehouse.** Each call logs: timestamp, agent, model, input (truncated at 1000 chars), output (truncated), tokens IN/OUT, cost in USD, latency, final decision. From this base comes a dashboard of [real inference cost](/blog/en/custos-reais-de-inferencia.html) per agent.
2. **Distributed tracing.** OpenTelemetry with each agent call being a span. Shows where time was spent. Without it, optimization is guesswork.
3. **Eval set per agent.** 50–80 cases with ground truth. Runs at each release. Without it, changing prompt is a lottery.

Without these three layers, the system would have stopped working well at some point between weeks 5 and 7 and nobody would have known exactly why. With them, we diagnosed regression within 1 day.

## Week 8 — The cultural problem

The mid-project surprise: the bottleneck wasn't technical. It was cultural. Internal users (salespeople) started trusting the draft generated by the last agent too much. They started approving response without reading. In ~6% of cases, this generated emails sent with wrong fact (undetected hallucination, or context extracted incorrectly from step 1).

The solution wasn't to improve the agent — it was to change the UI. We switched to displaying the draft with five fields marked in yellow (extracted entities — name, company, amount, date, proposed action) that the salesperson had to confirm individually before approving. Human latency went up (from 10s to 45s to review and approve), but errors dropped to <1%.

The most expensive lesson: agents in production change human behavior. Before measuring the agent's metric, you need to measure the metric of the user using the agent. Multi-agent systems that look great on internal benchmark fail because they change what humans do with the output.

## Week 12 — The full bill

At 90 days, the total cost of the operation:

| Item | USD/month |
|---|---|
| Inference (5 agents × 3,000 interactions × 5 calls/interaction) | ~2,400 |
| Infrastructure (gateway, orchestration, observability) | ~600 |
| Technical sustaining (1 engineer 30% of time) | ~3,500 |
| Governance (weekly eval review, calibration) | ~1,200 |
| **Total** | **~7,700** |

That number didn't fit the initial budget. It fit the estimated monthly ROI (USD ~12k in saved hours + better prioritized deals), so it closed the equation. But the initial "about USD 3k/month of inference" budget was wrong by more than 2× — sustaining and governance are the lines nobody anticipates.

## What we would do differently

If we went back to week 1 with the knowledge of 90 days, we'd do 5 things differently.

**We'd start with fewer agents.** 3 instead of 5. Each extra agent costs coordination. Start minimal, add only when the use case proves that without the extra agent it doesn't work.

**Strict schema from day zero.** Pydantic + validator between each agent, output in JSON with versioned schema. Costs 30% more tokens, avoids 80% of bugs.

**Observability before logic.** Structured log, tracing and eval set should exist before the first agent ships to production. Building an agent without it is building a blind system.

**Invest in UI as much as in the agent.** Agent-generated response needs UI that forces human review. Without that, [the "when an agent is the answer" thesis reverses](/blog/en/quando-agente-e-resposta.html) — the agent becomes a masked problem.

**Budget 3× the initial estimated cost.** Inference is part of it. Sustaining, governance, observability and cloud costs add up the rest. Presenting the full bill from day 1 is what prevents bitter renegotiation in month 6.

## The question that unlocks

Multi-agent works. But it works expensive, with real fragility, and demanding a team with continuous-operation muscle. Before proposing a multi-agent system to a client, the question that unlocks the decision is: do you have a team that will take care of this for 12 months without complaining? If the answer is no, the honest recommendation is to simplify — maybe a single well-designed agent delivers 70% of the value with 30% of the complexity.

Cases where multi-agent pays off: high volume (> 5,000 interactions/month), high value per interaction (each error is expensive), and existence of dedicated technical team. Outside that, it's paper architecture — pretty, citable, and expensive to maintain.

90 days later, we keep the 4 remaining agents in production, with predictable cost and reliable metrics. But the honest version of the story is not "it worked out" — it's "it worked out after revising architecture 3 times, killing 1 agent, and investing in observability nobody sold as a priority". That's the real way multi-agent systems thrive.

## Questions that keep coming back

Three questions everyone asks after reading this diary — with the answers the 90 days gave us.

## How much does it cost to run a multi-agent system in production?

In our case, about USD 7,700 a month — more than double the initial budget of "about USD 3k of inference". Inference was only ~2,400; the rest came from infrastructure (~600), technical sustaining with one engineer at 30% of their time (~3,500), and eval governance (~1,200). Sustaining and governance are the lines nobody anticipates.

The practical rule we kept: budget 3× the initial estimated cost. Presenting the full bill from day 1 is what prevents a bitter renegotiation in month 6 — in our case, the equation only closed because the estimated monthly ROI (~USD 12k) covered the total.

## How many agents should you start with?

Fewer than you think — if we went back to week 1, we'd start with 3 instead of 5. Every extra agent is coordination budget: it adds latency, adds cost, and creates one more data contract that can fail silently. In week 4 we killed an agent whose output was rarely used, and the system got 22% cheaper, 4s faster, and marginally more accurate.

The merge criterion: when two contiguous agents share the same "mental perspective" — same model, similar prompts, one's output feeding straight into the other — specialization is luxury, not architecture. Start minimal and add an agent only when the use case proves it can't work without it.

## Is multi-agent worth it for my company?

It's worth it if you have high volume (more than 5,000 interactions/month), high value per interaction, and a dedicated technical team that will care for the system for 12 months without complaining. Outside those three conditions, it's paper architecture — pretty, citable, and expensive to maintain.

If the answer to any of them is no, the honest recommendation is to simplify: a single well-designed agent tends to deliver 70% of the value with 30% of the complexity. Multi-agent works — but it works expensive, with real fragility, demanding observability and continuous-operation muscle that no framework white-paper mentions.
