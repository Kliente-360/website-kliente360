---
title: "Real inference cost: how to avoid the end-of-month USD surprise"
slug: "custos-reais-de-inferencia"
pillar: "ai"
date: "2026-03-24"
readMinutes: 6
excerpt: "POC cost USD 200/month. Production hit USD 18,000 in the third month. The difference rarely is volume — it's architecture nobody calibrated."
tldr: "LLM inference cost in production is hard to predict because of variable consumption. But it's avoidable: five patterns control 80% of the spend — context size, model choice, caching, batching and retry protocol. Without them, the third-month bill explains the hard meeting."
keywords: ["inference cost", "LLM", "OpenAI", "Anthropic", "AI FinOps"]
---

The story that repeats at the end of every quarter at any company that put LLM in production: team celebrated successful POC in January, decided to roll out broadly in February, got the first production invoice in March. POC had cost USD 200/month. Production closed at USD 18,000. Leadership asks how, and the honest technical answer is "nobody really calculated". The math wasn't done because it seemed trivial — *just multiply tokens by price*. But what nobody saw in the POC becomes the bill in the third month.

This text is about the five patterns that control most of the inference cost in production. It isn't deeply technical — it's what separates a project that scales economically from one that becomes a "lessons learned" slide.

## Why the POC math fools you

POC runs in low volume, with controlled prompts, in carefully chosen cases. Production runs in real volume, with dynamically generated prompts, in cases nobody foresaw. Five things change at scale:

- **Context grows.** In the POC, the prompt had 500 tokens. In production, someone added history, RAG, safety instructions. It becomes 3,500 tokens.
- **Bad cases appear.** In the POC, the agent delivers in 1 round. In production, hard cases make the agent retry 3–5 times. Cost multiplies.
- **Long cases appear.** In the POC, the answer had 300 tokens. In production, users keep the conversation going, the answer becomes 1,500.
- **Failures become cost.** Parse error, detected hallucination, automatic retry. Each failure costs full tokens.
- **Volume varies.** Monday peak generates 10× the average traffic. Model picked for "average" struggles and costs more per request.

The honest production math needs to multiply the POC number by 5–10× — not 1.5×. Whoever budgets at 1.5× finds the rest on the bill.

> The difference between POC and production in LLM cost isn't volume — it's everything the POC hides: inflated context, retries, failures, unforeseen cases. The realistic multiplier is 5–10×.

## Five patterns that control the spend

The controls separating projects that scale economically from projects that bleed. They don't require new tools — they require architectural discipline from the start.

1. **Context size under hard rule.** Every input token costs. Serious systems calibrate: fixed context (system prompt) ≤ 500 tokens, dynamic context (RAG, history) ≤ 2,000 tokens, with explicit truncation. Without truncation, context grows to the model limit, and the bill does too.
2. **Model choice by use case, not global.** Using GPT-4o or Claude Sonnet to classify intent is waste. For complex response generation, worth it. For short summarization, a mid-tier model (Haiku, GPT-4o mini) delivers 90% of the quality at 10% of the price. Systems using the same model for everything pay 5–10× more than systems with routing.
3. **Aggressive caching where applicable.** Prompt cache (Anthropic, OpenAI) cuts input cost by 90% for repeated context. RAG cached for frequent questions eliminates the LLM call entirely. Implementing caching before production is 2 weeks of work that pays back 50% of the bill.
4. **Batching in async workflows.** Batch API (Anthropic, OpenAI) charges half. Workflows that don't need real time (nightly reports, queue classification, log summarization) should use batch — automatic 50% savings. Almost nobody uses it because they "forget to implement".
5. **Smart retry protocol.** Blind retry on failure doubles cost. Smart retry (only on transient failure, with backoff, with attempt limit) controls. Combined with [rigorous quality eval to detect when retry pays](/blog/en/avaliacao-de-agentes.html), separates controlled cost from a silently exploding bill.

These five implemented with discipline control 80% of cost. Without them, any "cheap" model choice becomes expensive in aggregate.

## The cost × quality relation nobody calculates

The LLM cost discussion usually ends in "let's switch to the cheaper model". Wrong call in 70% of cases. [Baking behavior into the model via fine-tuning instead of injecting context via RAG](/blog/en/quando-fine-tuning-supera-rag.html) is another lever that lowers cost per interaction without switching providers — shorter prompts plus trained behavior replace long instructions repeated on every call. The right math is cost *per successfully resolved interaction*, not cost per token.

Cheap model with 60% accuracy costs more than expensive model with 90% — because the user comes back, redoes, escalates to human. Total cost (LLM + human time + rework) exceeds the apparent savings.

[As I argued about fine-tuning vs RAG vs prompt](/blog/en/fine-tuning-vs-rag-vs-prompt.html), the metric that matters is total cost of ownership for the use case. Not price per million tokens.

## What to measure from day 1

Four metrics telling whether you're in control of cost. If you're not measuring, you're losing money without knowing.

**Cost per complete interaction.** Not cost per call — cost per end-to-end interaction, including retries, fallbacks, escalations. The real economic unit.

**Distribution of context size.** Histogram. If 10% of cases consume 50% of the cost (long context), that's where to invest in truncation or routing.

**Cost / delivered value ratio.** In RAG: cost per correctly answered question. In agent: cost per resolution. In generation: cost per approved document. Without this metric, optimization becomes intuition.

**Cost drift per release.** Every prompt or model change affects cost. Serious systems measure and alert when unit cost rises 20% with no declared reason. Without that, cost erodes silently.

## The "new model is better" trap

Every September a vendor launches a new model, more capable and — often — more expensive per token. The temptation is to migrate. Before that, calculate:

**Does the use case need the new capability?** Technical text generation might. Simple classification doesn't. Don't switch models just because it's the newest.

**Will price per interaction rise or fall?** The new model can be smarter (fewer retries, less context) and therefore cheaper in aggregate, even with higher price per token. Calculate before migrating.

**Is the old model still available?** Models get deprecated in 12–18 months. Forced migration becomes a project, not an option. Plan ahead.

## The decision for 2026

If you're at a company with LLM in production, three practical moves:

**Calculate real unit cost, not aggregate invoice.** Cost per resolved interaction or delivered product. Without this, any optimization becomes blind guess.

**Implement the five patterns before scaling.** Context truncation, routing by use case, caching, batching where applicable, smart retry. 2–4 weeks of work that save 50–70% of the bill.

**Bring FinOps to the AI stack.** Just as cloud FinOps exists, AI needs its equivalent. Dashboards, alerts, review cycles. Without it, the bill tells the story after — always too late to prevent this quarter's impact. When volume grows and multiple teams consume inference, [the problem becomes cost allocation between teams — AI FinOps as a governance discipline](/blog/en/finops-de-ia.html).

LLM cost in 2026 is controllable. Whoever grows with AI and keeps healthy economics doesn't have a secret model — they have discipline on five patterns. Whoever doesn't sees the successful pilot become an unviable bill in the third month of production. The difference isn't in the LLM. It's in the controls around it.

## Questions that keep coming back

Three doubts that surface in almost every conversation about LLM cost in production.

## How much should I budget for production based on the POC cost?

Multiply the POC number by 5–10× — not by 1.5×. The POC runs at low volume, with controlled prompts and hand-picked cases; production brings context that grows from 500 to 3,500 tokens, hard cases with 3–5 retries, long conversations, failures that cost full tokens, and peaks of 10× the average traffic.

Whoever budgets at 1.5× isn't being careless — they're using the math that seemed trivial ("just multiply tokens by price") and finding the rest on the bill. The 5–10× multiplier isn't pessimism: it's what the POC hides by design.

## Does switching to the cheaper model fix the cost?

Most of the time, no — it's the wrong call in 70% of cases. A cheap model at 60% accuracy ends up more expensive than an expensive model at 90%, because the user comes back, redoes, escalates to a human: total cost (LLM + human time + rework) exceeds the apparent savings. The right metric is cost per successfully resolved interaction, not price per million tokens.

What works is routing by use case: a mid-tier model for classification and short summarization (90% of the quality at 10% of the price), an expensive model only where complex generation demands it. A system using the same model for everything pays 5–10× more than one with routing.

## How long does it take to implement the cost controls?

Two to four weeks of work — which save 50–70% of the bill. They're the five patterns: context truncation, routing by use case, caching, batching where applicable, and smart retry. None requires new tooling; they require architectural discipline from the start.

If you need to prioritize, caching and batching have the most direct payback: prompt caching cuts input cost by 90% for repeated context (implementing it is roughly 2 weeks of work that pays back 50% of the bill), and the Batch API charges half price on workflows that don't need real time — savings almost nobody captures because they "forget to implement".
