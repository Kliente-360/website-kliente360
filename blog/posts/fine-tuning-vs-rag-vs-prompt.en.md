---
title: "Fine-tuning vs RAG vs prompt engineering: how to choose without burning cash"
slug: "fine-tuning-vs-rag-vs-prompt"
pillar: "ai"
date: "2026-02-11"
readMinutes: 6
excerpt: "Three paths to adapt an LLM to your business. Different costs, timelines and risks — and the wrong choice pays in three to six months of rework."
tldr: "Prompt engineering solves 60% of cases, RAG solves 30%, fine-tuning solves a specific 5–10%. Most companies try fine-tuning before exhausting the other two and burn cash. Practical criteria to choose in the right order — and the signal to climb the ladder."
keywords: ["fine-tuning", "RAG", "prompt engineering", "LLM", "model adaptation"]
---

The question that hits the AI committee every Tuesday: "are we training our own model?". The honest answer in almost every case is "not yet — and maybe never". Not because fine-tuning is bad. Because it's the most expensive, slowest, and riskiest of the three options to adapt an LLM to a specific business — and there's almost always a cheaper path that solves the problem before you get there.

This text is the decision framework between **prompt engineering**, **RAG**, and **fine-tuning**. It's not technical — it's managerial. The choice between the three defines whether the project delivers value in three weeks or in nine months.

## What each one solves, in a sentence

Before the rule, you need clarity on what each technique does.

**Prompt engineering** is changing how you *speak* to the model. System instruction, few-shot examples, response structure. Cost: prompt-writer hours. Timeline: days. Risk: low.

**RAG (Retrieval-Augmented Generation)** is giving the model *context* it didn't have — fetching relevant snippets from a document base and injecting them at query time. [As I argued about RAG in practice](/blog/en/rag-na-pratica.html), the hard part isn't generating; it's retrieving. Cost: infra + corpus + retrieval. Timeline: 4–8 weeks to production. Risk: medium.

**Fine-tuning** is changing *the model* — retraining weights with your own data. Cost: curated training data + compute + iteration. Timeline: 2–6 months. Risk: high (the model can get worse at tasks it used to handle).

The difference isn't only technical. It's *what you're willing to invest before you know it'll work*. Prompt eng fails cheap. Fine-tuning fails expensive.

> The right question is never "which technique is best". It's "what's the cheapest technique that solves the case to 80%". You climb the ladder only when you've exhausted the current rung.

## The order that works

The rule we apply before any AI project with business adaptation. Always in this order.

1. **Exhaust prompt engineering first.** Before touching the corpus or the model, try solving with a better instruction. Well-chosen few-shot examples lift accuracy by 10–25% in almost every case. Forced response structure (JSON, numbered list) removes ambiguity. Explicit chain-of-thought improves reasoning. Whoever skips this step invests in RAG/fine-tuning to solve a prompt problem. (The same principle applies to [prompt engineering for analytics pipelines](/blog/en/prompts-pra-analytics.html), where LLM-generated SQL needs the same rigor.)
2. **Climb to RAG when the model needs knowledge it doesn't have.** Internal document, company policy, product base, customer history. If the question requires a fact the LLM doesn't know, RAG is the path. Not fine-tuning — fine-tuning teaches *patterns*, not *facts*.
3. **Climb to fine-tuning when the problem is style, format, or very specific domain.** When the model needs to write in your company's jargon, generate code in your internal standard, or respond in a rare structured format. Fine-tuning changes behavior; it doesn't change knowledge.

The most common mistake: using fine-tuning to solve a RAG problem ("the model doesn't know our rules"). It won't work. A fine-tuned model forgets half the rules in the next week or hallucinates plausible answers about rules that changed.

## Real costs — the math nobody runs

The costs of each technique aren't just money. They're team time, operational risk, and difficulty of iterating. Worth cataloging.

**Prompt engineering — costs.** Writer hours (1–3 days per iteration). Eval set to measure before/after (1–2 weeks to assemble). Inference cost per token, ongoing but small in medium volume. Typical total: USD 1–5k to run a decent use case in pilot.

**RAG — costs.** Vector infra + indexing + retrieval (USD 100–1k/month depending on volume). Pipeline engineering (4–8 weeks of senior time). Corpus curation (underestimated, often half the effort). Index maintenance (corpus drift, freshness). Typical total: USD 20–60k to production, plus USD 2–7k/month.

**Fine-tuning — costs.** Curated training data (5–15k quality examples, usually humans labeling: USD 8–25k). Training compute (USD 1–10k per iteration, and you'll need 3–10 iterations). Rigorous eval (essential — without it, fine-tuning gets worse invisibly). Typical total: USD 50k–250k to model in production, and the model needs retraining every 6–12 months.

The ratio I see in practice: fine-tuning costs 5×–20× more than RAG, which costs 5×–15× more than prompt engineering. Skipping rungs jumps that ratio in the bill without warning.

## The signals it's time to climb

Knowing when to *stop* at each rung is half the decision. Practical signals:

**When to climb from prompt to RAG.** When the model errs by *lack of specific information* — not by style. Ask: "would the model err less if I pasted the right document into the context?". If yes, RAG. If the answer errs by style, format, or reasoning, prompt eng still handles it.

**When to climb from RAG to fine-tuning.** Three combined signals: (a) you already have RAG retrieving well (recall@k > 80%); (b) the problem is in *how the model writes* after receiving context; (c) you have 5k+ quality labeled examples of the desired output. If any of the three is missing, fine-tuning won't fix it.

**When *not* to climb to fine-tuning, even under pressure.** When the problem is knowledge (RAG solves), when the use case changes month to month (a fine-tuned model becomes debt), when you don't have a [serious evaluation protocol](/blog/en/avaliacao-de-agentes.html) (without eval, fine-tuning is faith). These three contexts cover 80% of fine-tuning requests we receive.

## The typical case that clarifies

The story that repeats in three out of five projects. Company wants to "train our ChatGPT" to answer internal questions. Tech team quotes fine-tuning: USD 100k + 5 months. Sponsor approves.

Three months in, the trained model answers the eval set well — and badly on almost everything else. Real diagnosis: the problem was knowledge (the model has no access to internal policy), not style. RAG over the documents would have solved it in 6 weeks for USD 20k, with higher quality. Fine-tuning now becomes maintenance liability.

This case is avoidable with the simple rule above. It's not lack of technical skill; it's lack of order.

## The decision for whoever decides

If you're on a committee debating "fine-tuning or not", the right question to ask the technical team isn't "which is better". It's: *have we exhausted prompt engineering? have we tried RAG?*. In 80% of cases, the answer will be "not to the needed depth". Then you step back a rung, do it right, and most cases stop there — with 1/10 of the cost and 1/4 of the time.

Fine-tuning is the right tool for specific cases — [six patterns where it beats RAG](/blog/en/quando-fine-tuning-supera-rag.html). It just isn't the default — and treating it as the default is the most expensive way to delay your company's AI value delivery. (When justifiable, [the choice between self-hosted open source and proprietary changes the cost equation](/blog/en/open-source-vs-proprietary-llms.html) — worth calculating before committing.)
