---
title: "RAG in practice: retrieval is the bottleneck, not the LLM"
slug: "rag-na-pratica"
pillar: "ai"
date: "2026-01-13"
readMinutes: 7
excerpt: "Teams spend months tuning prompts and models while retrieval keeps returning the wrong document. Why retrieving is harder than generating — and what to measure."
tldr: "Almost every failing RAG project fails not on the LLM but on retrieving the right passage at the right moment. Generation became commodity; retrieval didn't. Five reasons retrieval breaks, three metrics that matter, and an evaluation pattern that avoids the eternal pilot."
keywords: ["RAG", "retrieval", "embeddings", "LLM", "vector search"]
---

The sentence that keeps coming up in a RAG pilot when the result disappoints is "the model got it wrong". It almost never is. The model generated exactly what the context asked for — except the context was the wrong document, the wrong passage, or two right ones missing a third that would have changed the answer. The blame isn't generation; it's retrieval. And because retrieval is less sexy than LLM, the team spends weeks tuning the prompt and swapping models while the problem lives in `top-k`.

This text is about why RAG is hard where no one looks. Not against RAG — it's the right architecture for grounding model answers in proprietary knowledge. But the imbalance between how much we talk about generation and how much we talk about retrieval is costing projects.

## Generation became commodity, retrieval didn't

In 2023, picking an LLM was a strategic decision. In 2026 it's commodity: Claude, GPT, Gemini, Llama — all of them answer well if the context is good. The frontier separating good projects from mediocre ones moved out of the model and into **what enters the context**.

Retrieval looks simple on the slide: user asks, system searches similar documents by embedding, top-k goes into the LLM, LLM answers. Each of these steps has a trap. Each individual trap forgives 5–10% of quality. Stacked, the system delivers correct answers in 60% of cases and no one understands why.

Worse: the LLM hides the problem. It *looks* right when it answers about the wrong document, because generation is fluent and confident. The user only notices something is miscalibrated when they push an answer against reality — and by then it's been in production for three months.

> In RAG, generating is the easy part. Retrieving the right passage, at the right time, in the right order, with the right additional context — that's where the system breaks.

The practical consequence: a team that approaches RAG as a "LLM problem" optimizes the thing with the smallest return. A team that approaches it as a "retrieval problem" invests where it hurts.

## Five reasons retrieval breaks in production

These are the failure modes that show up in almost every project. Worth cataloging before starting.

1. **Naive chunking.** Splitting documents into 500-token pieces by sliding window is the default and rarely the right answer. Pieces cut definitions in half, lose section titles, separate questions from answers. Chunking has to respect the semantic structure of the document — chapters, sections, logical blocks — not the token clock.
2. **Generic embeddings over specific vocabulary.** Pre-trained embedding models are good at general language. In technical domains (legal, medical, financial, code), the vector distance between "termination" and "rescission" may not capture the nuance that changes the answer. Without fine-tuning or domain models, the ranking comes out biased — and [fine-tuning on a domain corpus is precisely the pattern that beats RAG on closed technical terminology](/blog/en/quando-fine-tuning-supera-rag.html).
3. **Blind top-k.** Taking the 5 or 10 closest passages by vector similarity sounds reasonable, but ignores two facts: passages can be near-duplicates (redundancy), and the one that matters might be in 12th place (loss). Without reranking, top-k is a lottery.
4. **No query rewriting.** The question the user asks is rarely the question that retrieves well. "What changed in the contract?" is vague, short, lacks technical terms. The system has to reformulate the query — expand, decompose, rewrite in the corpus's vocabulary — before searching. Skipping this step is delivering bad search by design.
5. **Evaluation only on generation.** The team measures quality by the LLM's final answer and tries to optimize the whole system by output. It's like rating a car only by color: you never find out if the engine is good. Retrieval has to be evaluated *separately* from generation — with its own metrics.

These five modes explain 80% of RAG pilots stuck in "almost works". No single fix; just the discipline of measuring each layer.

## What to measure, in three metrics that matter

Talking about RAG metrics is where the team's maturity shows. Three metrics solve 90% of cases.

**Recall@k.** Of the documents that *should* appear in top-k to answer well, how many showed up. If you have a set of questions with ground truth (10–50 questions with correct documents marked), recall@10 below 80% means the system leaves critical context out. Switching model or tweaking the prompt won't fix it — it's a search problem.

**MRR (Mean Reciprocal Rank).** At what position, on average, does the right passage show up in the ranking. If MRR is at 0.3, the right passage is usually third or fourth — the LLM reads the wrong context first and contaminates the answer. Reranking lifts MRR more than swapping embeddings.

**Faithfulness of the answer to the retrieved context.** Even with good retrieval, the LLM can hallucinate or infer beyond what the context supports. Metric: percentage of claims in the answer that have direct support in the context. Below 90%, the system is generating beyond the evidence — high risk in regulated domains.

These three have to be on the dashboard before any prompt fine-tuning. Whoever measures only "user satisfaction" optimizes in the dark.

## Anatomy of a pipeline that works

A decent consultancy builds RAG in layers, not as a single API call. The skeleton we deliver in serious projects has five steps, each instrumented.

**Structure-aware chunking.** Splitting that respects headings, paragraphs, logical blocks. 10–20% overlap between adjacent chunks to avoid context loss at the boundary. Metadata embedded: section title, hierarchy, source, date.

**Hybrid indexing.** Vector (embedding) + text ([BM25 or similar](/blog/en/vector-database-ou-search-engine.html)). Vector catches semantics; text catches exact terms (product name, code, clause number). Combined top-k covers more than either alone. [The vector database choice — Pinecone, Weaviate or pgvector — depends more on operational context than on raw performance](/blog/en/vector-databases-comparados.html).

**Query rewriting before searching.** Same LLM that will generate the answer — or a smaller dedicated model — reformulates the user question into 2–3 variants, expands terms, decomposes composite questions. Each variant searches; results combine.

**Reranking over the expanded top-k.** Take top-30 from initial search and run a reranker (cross-encoder or LLM with a scoring prompt) that reorders for the 5–10 most relevant to this specific question. This step lifts MRR from 0.3 to 0.6+ in most domains. Best return per engineering hour.

**Generation with source citation.** The LLM answers *and cites the exact passage* supporting each claim. Not just UX — it's what enables measuring faithfulness later. Without citation, there's no audit.

[As I've argued about when it makes sense to deploy an agent](/blog/en/quando-agente-e-resposta.html), none of this eliminates the need for designed process. RAG amplifies existing knowledge; it doesn't invent knowledge that wasn't written down. If the corpus is empty, bad or outdated, the system just amplifies that poverty.

## Where corpus quality enters

And here lives the honest tension. RAG depends on corpus, and [a perfect corpus doesn't exist](/blog/en/dado-limpo-e-um-mito.html) — the same principle that applies to structured data applies to unstructured documents. The right question isn't "is our corpus clean?", it's "is our corpus good enough to answer *this set of questions*?".

Operationally, that means: start with the use case, build the eval set (50 questions with ground truth), run retrieval and see the gap. If recall@10 is 50%, the problem can be two things: the corpus doesn't have the answer (content problem, not RAG problem) or the corpus has it but doesn't retrieve it (retrieval problem). Without that separation, the team keeps optimizing the wrong system.

## For the sponsor asking "why so complicated?"

Because it looks simple in the demo. In the demo the user asks what the engineer tested; the system gets it right. In production, the question distribution is broader, the documents are dirtier, and each failure mode shows up. Well-built RAG isn't more expensive than badly-built RAG — it's just distributed differently in time. A team that invests two to three weeks in retrieval avoids six months of "why is this answer wrong?".

The good news: the five failure reasons are known, the three metrics are standard, the five-layer pipeline fits any serious project. What separates teams that ship from teams stuck in pilot is treating retrieval as product, not as implementation detail.

## Questions that keep coming back

Before wrapping up, the questions that come up most often when this topic hits the table.

## Why does my RAG system answer wrong if the LLM is good?

Because the problem is almost never in generation — it's in retrieval. The model answers well about whatever context it receives; if retrieval delivers the wrong document, a chunk cut in the wrong place, or leaves out the passage that changes the answer, the output comes out wrong while looking right. Swapping models or polishing the prompt won't fix that.

The most common failure modes are well known: naive chunking, generic embeddings over domain vocabulary, blind top-k without reranking, missing query rewriting, and evaluation done only on the final answer. Together they account for 80% of pilots stuck at "almost works".

## What should I measure to know if retrieval is working?

Three metrics cover 90% of cases: recall@k, MRR, and faithfulness. Recall@k tells you whether the necessary documents are reaching the context (below 80% at recall@10, the system is leaving critical context out). MRR tells you where the right passage lands in the ranking — if it's low, the LLM reads the wrong context first. Faithfulness measures how much of the answer has direct support in what was retrieved.

The prerequisite is an evaluation set with ground truth — somewhere between 10 and 50 questions with the correct documents marked. Without it, every tweak is optimizing in the dark; measuring only "user satisfaction" can't separate a corpus problem from a search problem.

## Is reranking worth the investment?

Yes — it's the best return per engineering hour in almost any RAG project. Running a reranker (cross-encoder or an LLM with a scoring prompt) over the top-30 from the initial search and reordering to the 5–10 most relevant raises MRR from 0.3 to 0.6+ in most domains — more than switching embedding models would.

The reason: top-k by pure vector similarity is a lottery. Near-identical passages eat up positions, and the passage that matters may sit in 12th place. Reranking fixes exactly that, without touching the rest of the pipeline.
