---
title: "Context engineering for agents: caching, compaction and the cost of memory"
slug: "engenharia-de-contexto-agentes-cache-compactacao"
excerpt: "Context engineering decides what the agent sees on every call. See how caching, compaction and tool-result clearing control cost and answer quality."
tldr: "Context engineering is the design of what enters the model's window on each call of an agent: instructions, tools, history and results. Because the agent resends that whole context at every step, it dominates both the bill and the quality of the answer. Three mechanisms control it — a stable cached prefix, clearing of tool results and summary-based compaction — and the order in which you apply them matters more than the choice of provider."
keywords: ["context engineering", "prompt caching", "context compaction", "AI agent memory", "AI agent cost", "context window"]
---

**An** AI agent has no memory: it has a text that keeps growing. At every step of the loop — call a tool, read the result, decide the next move — the entire history goes back to the model as input. Context engineering is the design of what enters that window on each call: instructions, tool definitions, history, retrieved documents and earlier outputs. In a three-message chat the detail goes unnoticed. In an agent that makes twenty calls to close one task, it is the largest line on the bill and the most common reason an answer "loses the thread" midway.

The topic became practical in 2026 because providers started shipping the pieces as API features — explicit caching, server-side compaction, rule-based clearing of results. What did not ship ready-made is the criterion for when to use each one.

## Why the agent pays for the context many times over

An agent's cost does not come from what it writes, but from what it rereads. An example with our own numbers, only to give an order of magnitude: an agent with a fixed 30,000-token prefix (instructions, tools, reference documents) that adds 2,000 tokens per step and runs 20 steps sends about 980,000 input tokens in total. What the model generates as output is a fraction of that.

Two effects add up. The first is financial: the input price is charged on every resend. The second is quality: Anthropic's documentation notes that [response quality degrades as a conversation grows](https://platform.claude.com/docs/en/build-with-claude/compaction), which is why keeping the context small shows up as a goal in itself, beyond savings. Bloated context costs more and delivers less.

> The agent does not pay for what it writes; it pays for what it rereads at every step of the loop.

Anyone who has worked through [the five inference cost patterns](/blog/en/custos-reais-de-inferencia.html) recognizes the problem: context truncation and caching were already there. The difference is that in an agent the context is not an input you control at the source — the loop itself produces it.

## Layer 1: a stable cached prefix

Prompt caching reuses the opening segment that repeats across calls. According to [Anthropic's prompt caching documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), writing to the 5-minute cache costs 1.25 times the base input price, and reading from the cache costs 0.1 times on most models (less on the newest ones). The default lifetime is 5 minutes, refreshed at no cost on each use, with a 1-hour option at higher cost. Prompts below a minimum token count — which varies by model — are simply not cached, with no error.

In the earlier example, caching only the fixed prefix takes the equivalent spend from 980,000 to about 475,000 tokens. Caching the history too, incrementally, brings it to around 180,000. It is our estimate, but the pattern is robust: the savings come from keeping the start of the context identical.

That creates a design rule few teams follow:

1. **Context order: most stable to most volatile.** Fixed instructions, tools and documents first; history next; the current question last.
2. **Nothing that changes at the top.** A timestamp, user ID or session counter at the top of the system prompt invalidates the whole cache on every call.
3. **Tools in a fixed order.** Reordering the tool list breaks the prefix.
4. **Check usage, not intent.** The usage fields of the response show how many tokens were read from the cache; zero in both counters means nothing was cached.

## Layer 2: clear what the tool returned

In an agent, the biggest bloat is rarely the conversation; it is the tool result. A SQL query that returns 300 rows, a full HTML page, a CRM JSON with fifty fields the agent never consults again. That material stays in the history and is reread at every later step.

Rule-based clearing — deleting old tool results, keeping only the trace that the call happened — is the safest way to shrink context, because it does not depend on a model deciding what matters. Anthropic's own documentation separates [rule-based clearing from model summarization](https://platform.claude.com/docs/en/build-with-claude/compaction) as different mechanisms. The risk is deleting data a future step would need, so the rule must be explicit ("results older than N steps, except from tool X") and tested.

The best clearing, though, happens earlier: a tool that returns only the requested fields instead of the whole record. It is the same principle as [retrieving well instead of generating more](/blog/en/rag-na-pratica.html) — the bottleneck is what reaches the model.

## Layer 3: compact by summary, with criteria

Compaction replaces old turns with a summary written by the model itself. According to the documentation, it comes in [on-demand and token-threshold variants, both in beta](https://platform.claude.com/docs/en/build-with-claude/compaction), and lets you keep recent turns verbatim and write your own summarization prompt. That last point matters: the default summary may drop exactly what a future step needs, such as an identifier, a user decision or a constraint agreed at the start.

Compaction has a hidden cost: the summary rewrites the beginning of the history and thereby invalidates part of the cache. An engineering write-up based on evaluations of a tutoring product, [published by Louis Bouchard](https://www.louisbouchard.ai/context-engineering-2026/), argues that with caching on, keeping everything is usually cheaper, faster and better at remembering than summarizing. It is one case, not a law — but it changes the question from "when to compact?" to "which concrete limit forces me to compact?".

Our decision order, in sequence:

1. Reduce what tools return.
2. Stabilize the prefix and turn caching on.
3. Clear old results by rule.
4. Compact only when the window or quality degradation demands it, with your own summary prompt and a list of what must never be lost.
5. Move anything permanent out of the context and store it elsewhere (database, notes file), retrieving on demand.

## How to know the context is working

Well-designed context is measured, not assumed. Two metrics are enough to start: input tokens per completed task (not per call) and cache read rate. For quality, the instrument is the same one used to [evaluate agents with real cases](/blog/en/avaliacao-de-agentes.html): run the same suite before and after each context change, because clearing or compacting wrongly only shows up as a task that fails ten steps later. Without the suite, context optimization is a bet.

## Questions that keep coming back

Frequent questions from teams starting to take agents to production.

## What is context engineering?

Context engineering is the design of what enters the model's window on each call of an agent: instructions, tools, history, retrieved documents and earlier results. Unlike prompt engineering, which handles how the instruction is worded, it handles the composition, order and size of everything the model reads, and when each part is cached, cleared or summarized.

## Does prompt caching really reduce an agent's cost?

It does, and by more than in single-call applications, because the agent resends the same prefix many times. In Anthropic's documentation, reading from the cache costs 0.1 times the base input price on most models. The gain depends on keeping the start of the context identical between calls; any variable value at the top of the prompt cancels the effect.

## When should you compact an agent's history?

When the context nears the window limit or quality starts to drop on long tasks, and after you have already reduced tool output and turned caching on. Compacting too early can cost more, because the summary invalidates part of the cache, and risks losing details the task still uses. Define what must never be summarized and measure before and after.
