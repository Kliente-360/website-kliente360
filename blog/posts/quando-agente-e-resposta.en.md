---
title: "When an agent is the answer — and when it's an escape from a poorly modeled problem"
slug: "quando-agente-e-resposta"
pillar: "ai"
date: "2026-05-20"
readMinutes: 6
excerpt: "An AI agent does not fix a broken process. Five questions to validate readiness, and the MVP path in four weeks."
tldr: "An AI agent does not fix a broken process — it amplifies it. Before deploying, validate five questions. If you pass, build an MVP in four weeks with a clear KPI. If you don't, fix the process first."
keywords: ["AI", "agents", "agentforce", "automation", "operations"]
---

Every week we get a request for an agent. Customer service, sales, HR, legal. The question almost always comes wrapped in urgency — "the competitor already has one", "the board asked", "OpenAI's pilot cleared the committee". The honest answer isn't always yes. And when it is yes, it's rarely the agent they were asking for.

An agent is an execution layer. It takes a process, connects to systems, decides small things and acts. If the process underneath is broken — ambiguous, poorly documented, with inflated SLA hiding capacity issues — the agent will amplify the problem, not solve it. It will respond fast to wrong things, escalate even earlier, and create governance liability.

This piece is not against agents. It's against agents in the wrong place. Let's break it down.

## The symptom and the diagnosis

The symptom is usually *expensive operations that don't scale*. Customer service queues, manual flow in spreadsheets, small teams reacting to SLA. The CEO hears about Agentforce, corporate ChatGPT, copilots. The solution looks obvious: deploy an agent.

The real diagnosis is rarely "we lack an agent". It tends to be a combination of:

- **Poorly designed process** — unwritten steps, uncatalogued exceptions, rules that live in people's heads.
- **Dirty or fragmented data** — the agent needs context, and context lives in silos no one has integrated. Not to be confused with chasing [absolute cleanliness before any project](/blog/en/dado-limpo-e-um-mito.html): what stalls the agent is fragmentation and quality insufficient *for the use case*, not imperfection itself.
- **Miscalibrated SLA** — the team doesn't have capacity to meet the promised deadline. The agent becomes a buffer and hides the problem.
- **No feedback loop** — no one measures what the team does today. How do you measure what the agent will do tomorrow?

Deploying an agent before fixing this is the equivalent of putting autopilot in a plane with deferred maintenance.

> A good agent amplifies a good process. An agent glued onto a bad process just becomes noise, faster.

## Five questions to validate

Before approving any agent project, we run five checks. If three or more fail, an agent is not the next decision.

1. **Is the process written down?** It isn't enough to live in someone's head. It needs to be in a flow readable by a non-expert human and by an LLM.
2. **Do the data the agent will query exist, are they trustworthy, and accessible via API?** No magic here — an agent without data is a confident guess. When the knowledge lives in documents rather than systems, you're in [RAG territory — and there retrieval becomes the bottleneck, not the LLM](/blog/en/rag-na-pratica.html).
3. **Is there a current operational KPI?** Average time, resolution rate, NPS, cost per contact. Without baseline, you can't prove value later — and [serious agent evaluation requires its own metrics beyond channel ones](/blog/en/avaliacao-de-agentes.html).
4. **Is there a human owner of the process?** Not the "executive sponsor" — the senior operator who knows where it hurts. Without that person, the project becomes theater.
5. **Is the risk of an agent being wrong tolerable?** [In customer service, yes — with a clear boundary between what to automate and what not to](/blog/en/agentforce-atendimento-humano.html). In legal escalation, maybe not. In credit decisions, certainly not without specific governance.

## The four-week MVP path

Passed all five? Here's what we deliver. Four weeks, controlled cost, KPI at the end.

**Week 1 — Map.** We sit with the senior operator, model the process, identify the 3–5 most frequent paths (covering ~80% of cases), and the points where AI can decide versus where it needs to escalate.

**Week 2 — Prototype.** We build an agent that covers only the simplest path (1 of 5). We connect it to data via API, instrument metrics, run it on 10 real cases offline.

**Week 3 — Validate.** We release the agent into production with human supervision — every response is reviewed before going out. We collect accuracy rate, error types, escalated cases. We compare with the operation's baseline.

**Week 4 — Decide.** Stop/go meeting. If the KPI hit (typically: 80%+ accuracy on the simplest path, with average time <30% of current), we expand to the other paths. If it didn't hit, the problem is rarely the agent — it's one of the five questions at the start.

## Why AI without governance becomes liability

One last observation. Even when the agent works, it needs governance from day 1 — not as a future project. Logs of every interaction, audit of decisions, kill switch, clear definition of when to escalate to human, [privacy policy applied before the first prompt](/blog/en/privacidade-dados-llms.html), incident process.

Without that, what seemed like efficiency gain becomes silent operational risk. Gains disappear in the first months; liability shows up in the first incident — usually public.

Good enterprise AI is AI with auditing built in. It's not overhead — it's what separates a project that survives a new board from one that becomes a "lessons learned" slide.

## Questions that keep coming back

Three questions that surface in almost every conversation about agents — answered with this piece's argument.

## Is it worth deploying an AI agent in my operation?

It's worth it if the operation passes the five validation questions — if three or more fail, an agent is not the next decision. The five: a written process (not just in someone's head), trustworthy data accessible via API, a baseline KPI for the current operation, a human owner of the process (the senior operator, not the executive sponsor), and a tolerable risk of error for the use case.

What's not worth it is using an agent to dodge diagnosis. The symptom is usually expensive operations that don't scale, but the cause is rarely "we lack an agent" — it tends to be a poorly designed process, fragmented data, miscalibrated SLA, or no feedback loop. An agent glued onto a bad process just becomes noise, faster.

## How long does it take to get an AI agent into production?

Four weeks to the stop/go decision, if the five validations already passed. Week 1: map the process with the senior operator and identify the 3–5 paths covering ~80% of cases. Week 2: prototype only the simplest path, connected to data via API and tested on 10 real cases offline. Week 3: production with human supervision, every response reviewed before going out. Week 4: stop/go meeting against the baseline.

The typical "go" criterion is 80%+ accuracy on the simplest path with average time under 30% of current. If it doesn't hit, the problem is rarely the agent — it's one of the five questions at the start that passed without being truly resolved.

## Do I need perfect data before deploying an agent?

No — what stalls an agent is data that's fragmented or insufficient *for the use case*, not imperfection itself. Chasing absolute cleanliness before any project is just another way to postpone the decision. The right question is narrower: do the data the agent will query exist, are they trustworthy, and are they accessible via API?

If the answer is no, an agent without data is a confident guess — and then the prior work is integration, not AI. If the knowledge lives in documents rather than systems, the path is RAG, and the bottleneck becomes retrieval, not the LLM.
