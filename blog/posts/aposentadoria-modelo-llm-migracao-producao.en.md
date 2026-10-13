---
title: "LLM model retirement: the production incident with a date on it"
slug: "aposentadoria-modelo-llm-migracao-producao"
excerpt: "LLM model retirement is the end of access to a version your agent uses. See the calendar, what breaks when you switch and how to migrate without an incident."
tldr: "LLM model retirement is the scheduled shutdown, by the provider, of a specific model version your application calls through an API. It arrives with a date — Anthropic commits to at least 60 days' notice for public models — and swapping in a successor is never just changing an identifier: output format, tone, cost and edge-case behavior all shift. Teams that keep a model inventory, a running evaluation suite and a rollback plan turn retirement into a routine task; teams that don't find the problem inside the notice window."
keywords: ["LLM model retirement", "AI model deprecation", "LLM model migration", "model regression", "model versioning", "AI agents in production"]
---

**Every** language model used in production has a retirement date — yet most teams find out when the provider's email lands. LLM model retirement is the scheduled shutdown of a specific version: the API call that worked yesterday starts returning an error or, worse, gets redirected to a successor that behaves differently. For an agent that handles support, triage or analysis every day, this is a production incident with a date and advance notice — and it still tends to be treated as a surprise.

The topic moved out of the documentation footer in 2026. Labs' release pace has shortened the life cycle of each version, and notice windows are short next to the timeline of a corporate AI project.

## The calendar nobody put on the agenda

Anthropic's deprecations page [commits to at least 60 days' notice](https://platform.claude.com/docs/en/about-claude/model-deprecations) before retiring public models on the company's own API; on partner clouds such as Amazon Bedrock and Google Cloud, the calendar is different and set by them. In practice the notice sits close to the floor: according to [Mixed's coverage](https://mixed-news.com/en/anthropic-deprecates-claude-sonnet-4-5-61-days-notice/), Claude Sonnet 4.5 was marked deprecated on September 30 with retirement scheduled for November 30, 2026 — 61 days.

OpenAI keeps [a public deprecations page](https://platform.openai.com/docs/deprecations) with dates per model. Older snapshots of the GPT-5 and o3 families go on December 11, 2026, and several legacy GPT-4 and GPT-3.5 snapshots shut down on October 23, 2026. Third-party summaries point to longer minimum notice for generally available models (six months), but we did not locate the policy in the provider's own wording, and notice tends to be shorter for previews and specialized variants.

Two points matter more than the exact date. First, 60 days is less than a quarter: in a company with change cycles, security approvals and deploy windows, the deadline disappears into process before anyone opens the code. Second, the calendar belongs to each vendor — whoever uses three models from two providers tracks at least three dates.

> A model retirement is no surprise: it is the only part of an agent's life cycle that comes with written notice.

## What breaks when the model changes

The costliest mistake is treating migration as a version update. In traditional software, a minor release preserves the contract; with a language model, the successor is a different system with the same family name. Four categories of change show up regularly:

1. **Output format.** The new model is stricter or looser with JSON and schemas, adds a sentence before the structured block or reorders fields. The parser that read the response breaks silently, with no API error.
2. **Instruction weight.** A system prompt calibrated over months is obeyed differently. Rules the old model followed by inertia stop holding, and constraints it ignored start being applied to the letter.
3. **Length and tone.** Responses get longer or shorter, more cautious or more assertive. In customer service, that changes the product without anyone touching a line of code.
4. **Cost and latency.** The successor may have a different price per token and use more reasoning tokens for the same task. The bill changes at the same volume, which reopens the conversation on [real inference costs](/blog/en/custos-reais-de-inferencia.html).

The most dangerous case is the alias: pointing to a generic name, with no pinned version, means the provider can swap the model underneath without notice. Nothing breaks loudly; behavior drifts. Pinning the version prevents the silent swap but only postpones the problem — every pinned snapshot has an end date.

## The routine that makes retirement boring

A specialized consultancy in agents ends up recommending the same discipline, and it has to exist *before* the notice email. Six practices cover the essentials:

1. **Model inventory.** A spreadsheet with every model identifier in use, the system that calls it, the provider, the announced retirement date and an owner. It sounds trivial and almost no team has one.
2. **Pinned version in production.** Generic aliases only in development. In production the version is explicit and changing it is a recorded decision.
3. **Continuous evaluation suite.** A set of real cases, with pass criteria, running against the current model. Without that baseline there is no way to say whether the successor is better, equal or worse — only whether it "looks fine". It is the same reasoning as [evaluating agents with the metric nobody wants to publish](/blog/en/avaliacao-de-agentes.html), applied at the moment of the switch.
4. **Migration target 30 days before the final date.** If the notice is 60 days, half the window is slack for the unexpected, not margin to postpone.
5. **Staged rollout.** Shadow traffic first, then a small slice of users, with a rollback trigger defined by metric — not by impression.
6. **Fallback model on the same calendar.** A second model, from another provider or family, already tested against the suite. When the final date arrives before the migration is done, there is a real plan B.

Item 3 is what separates teams. Whoever runs the evaluation for the first time inside the notice window is building the instrument and taking the measurement at the same time, under deadline pressure.

## Architecture that makes switching easier

Part of the migration cost is architectural. When the model name is scattered across twenty files and each prompt was written for the quirks of one version, any switch becomes a renovation. Three design decisions reduce that cost:

**A routing layer.** A single place that decides which model serves each task. It is the same mechanism that underpins [using small models in the agent pipeline](/blog/en/slm-pipeline-de-agentes.html): if switching models is a configuration change, retirement stops being a project.

**Prompts versioned with the model.** The prompt is part of the contract. Store each one with the identifier of the model it was calibrated for and the result of the latest evaluation.

**Validated structured output.** A schema validator between the model and the rest of the system turns a format change into a visible error, not corrupted data.

There is a portability argument here too. Retirement is one of the most concrete forms of [lock-in on an agent platform](/blog/en/lock-in-plataforma-de-agentes.html): the more the prompt, the flow and the tools depend on one model's particularities, the costlier it is to leave when it is discontinued. That does not call for total abstraction — it calls for knowing, for each agent, what switching costs.

## Questions that keep coming back

To close, the most common questions from teams with AI agents or applications in production.

## What is LLM model retirement?

LLM model retirement is the scheduled shutdown, by the provider, of a specific model version offered through an API. After the final date, calls to that version fail or are redirected, and the application must migrate to a successor. The provider usually announces the date in advance; Anthropic, for example, commits to at least 60 days' notice for public models.

## Does pinning the model version solve the problem?

It solves half of it. Pinning the version stops the provider from changing behavior underneath you without notice, which is the hardest kind of regression to detect. But a pinned snapshot still has an end date, so the migration is only postponed. The full practice combines a pinned version, a continuous evaluation suite and a calendar with the retirement date of every model in use.

## How long does it take to migrate an agent to a new model?

It depends more on evaluation maturity than on the size of the agent. In our experience, with a test suite ready and versioned prompts, a simple migration takes from a few days to two weeks, including staged rollout; without a suite, the same agent can burn the whole 60-day window just building the baseline. This is our estimate, not a market benchmark.
