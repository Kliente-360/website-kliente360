---
title: "AI FinOps: how to charge LLM inference back to internal customers without fighting IT"
slug: "finops-de-ia"
pillar: "ai"
date: "2026-05-24"
readMinutes: 7
excerpt: "LLM inference has variable cost and diffuse attribution. Without a chargeback model, it becomes an IT invoice at month-end. Four AI FinOps models that work."
tldr: "AI adoption inside a company multiplies use cases faster than the budget can absorb. Without AI FinOps — allocating inference cost to who consumes it — IT becomes the villain of the inflated bill, and the product team has no incentive to optimize. Four internal chargeback models that work, with advantages and pitfalls of each."
keywords: ["AI FinOps", "LLM costs", "inference billing", "internal chargeback", "AI cost management"]
---

**I**n the first phase of AI adoption inside a company, nobody asks how much it costs. Pilots are small, the monthly bill fits the innovation budget, and the conversation is about whether the technology works. Six months later, when five different teams have use cases in production and the monthly bill has tripled, the conversation changes. Inevitably, it becomes a fight: IT wants each team to pay what it consumes; product wants IT to absorb it; nobody wants to be the first to set a limit.

This is the problem AI FinOps solves. Charging LLM inference back internally sounds simple — split the bill — but it's one of the most delicate exercises of financial governance in tech today, because it mixes real variable cost, multi-tenant attribution, and behavioral incentives. This post enumerates four internal chargeback models, when each one works, and what to avoid.

## The single-invoice problem

Without FinOps, the OpenAI, Anthropic or Bedrock bill lands in a single cost center — usually IT or Data Platform. Three consequences, all bad.

The first is that cost is invisible to the teams that decide. The PM who picks GPT-4o in production without checking estimated volume pays zero from their budget. The CFO who approves AI investment doesn't see how much each use case costs per month. Decision without cost signal generates consumption without ceiling.

The second is that IT becomes the villain. When the bill exceeds the limit, the conversation isn't "how do we optimize this use case" — it's "IT overspent". Cost centralization is kept while merit centralization is broken. The team that delivers ROI keeps the credit; IT keeps the bill.

The third is that there's no optimization incentive. A PM who knows the cost lands in another cost center won't invest time in prompt engineering, in picking a cheaper model, in caching, in [evaluating fine-tuning vs RAG vs prompt](/blog/en/fine-tuning-vs-rag-vs-prompt.html). Optimization without pain doesn't happen.

> Inference cost absorbed by IT is the cheapest way to ensure nobody optimizes anything. The team that pays is the team that thinks about waste.

## Four AI FinOps models

Four chargeback architectures we've seen work. Each is a trade-off between accounting simplicity and attribution precision.

**Model 1 — Central pool with showback.** The bill still lands at IT, but every month a report shows how much each team consumed (tokens, calls, cost in USD). No real debit, but visibility exists. Works as a bridge: creates awareness without creating a new financial process. Limitation: showback without chargeback rarely changes behavior — it's information without consequence.

**Model 2 — Proportional chargeback based on volume.** Total monthly cost is split among teams proportionally to consumed token volume. Easy to implement (only needs logs with team tag) and gives real signal. Limitation: a team using an expensive model (GPT-4o, Claude Opus) pays the same per-token as one using a cheap model (GPT-4o-mini, Haiku). Doesn't reward efficient model choice.

**Model 3 — Chargeback by real cost, with markup.** Each call is logged with model, input tokens, output tokens, and cost calculated in USD. The team is debited the real cost + a 10–20% markup to cover infra and governance (gateway, observability, key vault). It's the fairest and most expensive model to operate — requires a centralized inference gateway with per-request billing. When it works, it rewards teams that pick the right model, optimize prompts and use cache.

**Model 4 — Upfront budget allocated per use case.** Each approved use case gets a monthly inference budget (e.g. USD 2,000/month for the customer service agent, USD 800/month for the internal sales assistant). The team consumes freely within the limit; exceeded, it needs approval or automatic throttle. Works well in companies with strong initiative-budget culture. Limitation: a poorly calibrated budget becomes either a growth brake or a blank check.

## How to choose among the four

The choice is not aesthetic. It depends on three variables.

**Maturity of the AI operation.** Company with 1–3 production use cases and bill < USD 10k/month: model 1 (showback) is enough. Above that, showback becomes theater. Company with 10+ use cases or bill > USD 50k/month needs model 3 (real cost) or 4 (budget) — otherwise compensatory distortion grows.

**Financial culture of the company.** Companies with mature cloud FinOps already (per-team chargeback in AWS/GCP) adopt models 2 and 3 faster. Companies that still treat everything as annual IT CapEx absorb model 4 (upfront budget) better, which resembles the traditional budgetary model.

**Heterogeneity of usage.** If all use cases use the same model and similar token patterns (e.g. chat with short prompts), model 2 (proportional) is OK. If there's wide mix — some use cases with huge input (RAG over documents), others with long output (report generation), others using fine-tuning — model 3 (real cost) is the only one that avoids glaring unfairness.

## Three common pitfalls

Some decisions look good on paper and die in execution.

The first: **including inference cost without including infra cost**. The visible OpenAI bill is only part of the real total. There's gateway, logging, key vault, observability, governance team. Those costs prorated among teams complete the equation. Charging only inference creates sub-optimization (team invests in complex pipeline, gateway explodes, and nobody pays).

The second: **not tagging calls from day zero**. Without a team/use-case tag on every request, no model works. Technical setup (inference gateway, SDK hook, HTTP header) needs to be in production from the first call — adding it later means painful retrofit.

The third: **debiting exactly what the provider charges**. Providers change prices (OpenAI cut prices 4 times in 2024–2025; it can go up too). If chargeback is exactly real cost, the team faces unpredictable swings. Stabilize with markup or monthly snapshot — predictability inside the company matters more than penny-precision.

## Step zero is log with tag

Without inference log with team tag, model, input/output tokens and calculated cost, none of this is executable. That's the technical investment that unlocks everything else.

In practice, three paths: (1) self-hosted inference gateway (LiteLLM, Portkey, Helicone), (2) provider-native logging (OpenAI Usage API, Anthropic console with tags), or (3) SDK wrapper that logs to your own data warehouse. Path (1) gives the most control and is the most common in mature operations. Path (3) is lighter but requires discipline so every team uses the wrapper.

With structured log in warehouse, a dashboard of [real inference costs](/blog/en/custos-reais-de-inferencia.html) by team/use-case/model ships in a week. From there, any of the four models is a policy decision, not an engineering one.

## Where AI FinOps silently fails

The signal that the model isn't working: the finance team still calls IT when the bill goes up. That means cost distribution didn't reach the visibility level that changes behavior. Diagnostic for who's implementing: ask each PM to say, without checking the dashboard, how much their use case cost last month. If nobody knows, FinOps exists on paper, not in decisions.

The tipping point happens when a PM starts asking "would this cheaper model work for this case?" before IT suggests it. There the system is working. Until then, it's in cultural translation phase — and cultural translation takes longer than technical implementation.
