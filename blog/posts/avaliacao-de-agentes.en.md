---
title: "Agent evaluation: the metric nobody wants to publish"
slug: "avaliacao-de-agentes"
pillar: "ai"
date: "2026-02-03"
readMinutes: 6
excerpt: "Agentic AI pilots die from lack of serious evaluation. They don't die from bugs — they die because nobody wanted to measure the real accuracy rate."
tldr: "Most agent projects that fail in production failed at evaluation long before. Teams measure subjective satisfaction and channel CSAT — not the uncomfortable metric: percentage of correct responses on the defined use case. Three metrics, two protocols, one cultural rule to stop the eternal pilot."
keywords: ["agent evaluation", "evals", "generative AI", "agents", "AI metrics"]
---

In almost every agent project I see stuck after the pilot, the story is the same: the team has high satisfaction scores in user surveys, good usage metrics, and no number on the real accuracy rate. I ask "in what percentage of interactions did the agent answer correctly?", and the answer is silence, or a loose estimate — "around 80%, I think". Then the project doesn't scale. Not because the tech can't handle it — because nobody knows whether it's handling it, and that prevents decisions on expansion, governance or pricing.

The metric nobody wants to publish is the percentage of correct responses on real cases. This text is about why it disappears, how to build it, and how to live with the number it'll show.

## Why nobody wants to publish

The reason is political, not technical. When an AI pilot is sold to leadership, the promise is usually implicit: "it'll work". Publishing the real metric is admitting it might not — and that threatens the budget that took political capital to raise. Easier to show a usage chart ("we grew 40% this month"), user NPS ("90% liked the experience"), response time ("3 seconds average"). All of that is true and none of those numbers says whether the agent is answering correctly.

The consequence: the pilot becomes eternal. The team can't defend expansion because there's no number, and they don't build the number because defending expansion becomes even harder when it appears. The vicious cycle has a name: *AI theater*.

Breaking it requires a conscious decision: measure even knowing the initial number will be uncomfortable. The good news is that the uncomfortable number is a springboard — without it, there's no next step. With it, there's a path.

## Three metrics that really matter

Agent metrics split into three families. Each answers a different question, and most projects only measure one.

**Response accuracy (task success rate).** Of N cases the agent answered, in how many was the answer correct according to a competent human judge? This is the metric nobody wants. It requires a judge who knows the domain, a review protocol, a statistically significant sample. All of that is work — and it's exactly the work that catalyzes the rest.

**Coverage (resolution rate without escalation).** Of N cases that reached the agent, in how many did it resolve without escalating to a human? This number is easier to get — it comes out of system logs. But isolated it lies: the agent might be "resolving" by answering wrong and the user giving up, which counts as high coverage with low accuracy.

**Cost per resolved interaction.** Total cost (inference + infra + governance) divided by interactions with confirmed accuracy. In high-volume projects, it's the number that defines whether unit economics close. [Without this metric, you can scale a pilot that loses money on every call](/blog/en/quando-agente-e-resposta.html) — common when the team only watches coverage.

Accuracy × coverage × cost = sustainable project. Miss one of the three and the project becomes an expensive hobby.

> Coverage without accuracy is the cheapest way to lie on an AI dashboard. The agent "resolved" every case — and answered wrong in half.

## Two protocols that unblock

Measuring accuracy looks heavy, but it's doable with discipline. Two protocols cover 90% of cases.

**Fixed eval set, run on every release.** Curate 50–200 questions representative of the use case, with ground truth (correct answer) reviewed by a specialist. Every time the system changes — new prompt, new model, tuned RAG — run the eval set and compare against baseline. This protocol catches regressions. Cost: high to assemble (one to two weeks), trivial to run. It's the most profitable technical investment in any AI project.

**Ad-hoc production sampling, human review.** Randomly select 50–100 real interactions per week. A specialist reviews each and marks them as correct, partially correct or wrong. Accuracy by category is calculated. This protocol catches *drift* — when the system works in the lab and degrades in production (distribution of real questions different from the eval set, model behavior change, corpus decay in [RAG](/blog/en/rag-na-pratica.html)).

The two together cover test and operation. A team running only the eval set catches regressions at release but misses drift. A team running only production sampling catches drift but can't isolate cause. The two protocols together are the boring and necessary part of serious AI operations.

## The cultural rule — the judge isn't the team that built

A detail that kills the metric: if the team that built the agent is the same that evaluates, the number gets biased. Not out of bad faith — out of predictable cognitive bias. The builder looks at a partially correct response and tends to mark it as correct ("well, deep down it's right"). The builder knows what they asked and mentally completes what the agent didn't say.

The rule that works: evaluation is done by a third party with domain expertise, without access to the code or the prompt. In small projects, that's an operations analyst. In medium ones, it's a dedicated review pair (rotating if possible). In large ones, it's a separate cell, reporting outside the AI team.

Without this separation, the number goes up — and the pilot stays eternal, because the metric isn't showing what it needs to show to force the next decision.

## What to do with the uncomfortable number

Suppose you measured and got 65% accuracy. Not good; not terrible. Three practical paths.

**Decompose the error.** Knowing the global rate isn't enough. Categorize: which type of question has the highest error rate? Is it retrieval (corpus doesn't have it), generation (the LLM ignores the context), or prompt (the agent misinterpreted the question)? Each category requires different investment.

**Define the acceptable floor by use case.** Low-risk support, 70% can be enough with well-designed escalation. Regulated financial customer service, 95% is the minimum. That floor is a product decision, not engineering.

**Invest in the layer that hurts most.** If the error is in retrieval, improve reranking or expand the corpus. If it's in generation, tune the prompt or change the model. If it's in the prompt, refine the agent's instruction. 2–3 week iterations with measurement at the end show clear trends.

The combination that works: rigorous measurement + focused iteration + transparency with leadership on the number and the path. That trio separates an AI project that ships from one that lands in the third governance plan in 2027.

The uncomfortable metric isn't the problem. It's the only tool for getting out of it. (Combined with [rigorous inference-cost control](/blog/en/custos-reais-de-inferencia.html), it delivers the complete equation of economic AI in production.)

## Questions that keep coming back

Three doubts that surface in almost every conversation about agent evaluation.

## How much does it cost and how long does it take to build an eval set?

One to two weeks to assemble — and after that, running it is trivial. The heavy lifting is curating 50–200 questions representative of the use case, with ground truth reviewed by a domain specialist. Once that's done, every system change (new prompt, new model, tuned RAG) runs against the same baseline in minutes.

It sounds expensive for a pilot, but it's the most profitable technical investment in any AI project: without an eval set, every release is a gamble, and regressions only surface when users complain. Worth remembering it doesn't replace weekly production sampling — the eval set catches regressions, sampling catches drift.

## What accuracy rate is good enough for production?

It depends on the risk of the use case — and it's a product decision, not an engineering one. Low-risk support can operate at 70% accuracy, as long as escalation to a human is well designed. Regulated financial customer service demands 95% at minimum. The mistake is defining no floor at all and scaling blind.

And a middling number — say 65% — isn't a final verdict: it's a starting point. Decomposing the error by category (retrieval, generation or prompt) and iterating in 2–3 week cycles with measurement at the end shows whether the curve is rising. What kills the project isn't low initial accuracy; it's not knowing what it is.

## Who should evaluate the agent's responses?

A third party with domain expertise — never the team that built it. It's not about bad faith: builders tend to mark partially correct answers as correct and mentally fill in what the agent didn't say. The bias is predictable and inflates the number, and an inflated number doesn't force the next decision.

The format scales with the project: an operations analyst on a small project, a dedicated review pair (rotating if possible) on a medium one, a separate cell reporting outside the AI team on a large one. The common criterion: the judge has no access to the code or the prompt.
