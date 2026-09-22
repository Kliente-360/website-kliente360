---
title: "AI agent platform lock-in: the cost nobody measures"
slug: "lock-in-plataforma-de-agentes"
excerpt: "AI agent platform lock-in never shows up on the monthly invoice — it only shows up when the company tries to switch vendors and finds the real price."
tldr: "AI agent platform lock-in is the set of technical and operational dependencies — orchestration, accumulated memory, and integration with the rest of the stack — that makes switching vendors more expensive than the sales proposal lets on. An April 2026 analysis cross-referenced vendor trust with degree of lock-in and found the two axes moving independently: not every trustworthy vendor is easy to leave, and not every flexible vendor is trustworthy. The model behind the agent became a swappable commodity — the real dependency moved up to the orchestration and memory layer wrapped around it."
keywords: ["AI agent lock-in", "Agentforce", "vendor lock-in", "agent harness", "Model Context Protocol", "trust vs lock-in"]
---

**Most** companies compare agent platform contracts on price per conversation, message caps, and response SLA. None of those lines measure what actually decides the real cost of the choice over the next five years: how much it costs to leave. In April 2026, analyst Kai Waehner published the most complete mapping yet of this blind spot — cross-referencing vendor trust with degree of lock-in — and the conclusion is uncomfortable for anyone who already signed: the most trustworthy vendors are not necessarily the easiest to leave.

The question every agent platform sales proposal avoids answering is simple: if the company wants to switch vendors three years from now, how much does that cost — in money, in time, in context rebuilt from scratch? The answer is never in the pricing table. It's spread across four different layers, and each one locks you in a different way.

## The map that separates trust from lock-in

Waehner's framework cross-references two axes the market usually treats as the same thing: trust — model safety governance, data handling, regulatory posture — and lock-in — technical dependency that raises the cost of switching. These are independent axes. According to his classification, vendors like Microsoft, Salesforce, AWS, and SAP fall into the quadrant of lower trust and higher lock-in — not because the model is worse, but because integration with the rest of the ecosystem (cloud, CRM, productivity suite) pushes the exit cost up regardless of the agent's technical quality.

> Trusting an agent vendor and being locked into one are different decisions — treating them as the same choice is the mistake that only gets expensive three years into the contract.

On the other side of the map, technically more open options carry greater doubt about governance and data sovereignty. No vendor solves both axes for free — there's just the vendor that hides which quadrant it's in better, usually behind an integration pitch that sounds like convenience and works like a lock.

## The four vectors that trap you, not the vendor's pitch

The mapping identifies four lock-in mechanisms that apply to any agent platform, regardless of the brand on the contract:

1. **API dependency.** The agent's architecture bends around the vendor's design choices — call format, context limits, retry behavior — and every technical decision built around that becomes a rewrite when the vendor changes.
2. **Framework capture.** The proprietary orchestration layer — how the agent decides which tool to call, in what order, with which guardrail — compounds over time, with no simple export path to another engine.
3. **Data gravity.** Accumulated context, conversation history, fine-tuning done on top of the agent: the more the company invests in getting the agent "calibrated," the more expensive it gets to rebuild that learning elsewhere.
4. **Ecosystem entanglement.** Native integration of the agent with cloud, CRM, ERP, or productivity suite — switching the agent stops being an isolated project and becomes a renegotiation of everything around it.

These are the same four vectors, adapted to the agent world, that [we already mapped between Databricks, Snowflake, and BigQuery](/blog/en/databricks-snowflake-bigquery-lock-in.html) in the data warehouse world — the lock-in logic repeats, only the layer it lives in changes.

## The model became a commodity — lock-in moved up a floor

One market data point confirms that at least one vector is genuinely weakening: according to Menlo Ventures research, OpenAI's share of enterprise LLM API spend dropped from around 50% in 2023 to 27% by late 2025, while Anthropic climbed to nearly 40% over the same period. Companies switch models at a frequency that would have been unthinkable two years ago — the model, in isolation, became a configuration item.

The problem is lock-in didn't drop along with it — it moved up a floor. In February 2026, the term "harness engineering" entered common industry vocabulary, popularized by Mitchell Hashimoto and the formula LangChain helped spread: agent equals model plus harness. The harness is everything between the model call and the business outcome — tool connectivity, context memory, agent loop logic, guardrails, runtime infrastructure. After eighteen months of operation, the model becomes a configuration line; the harness becomes the real architecture — and that's where the hardest layer to rip out lives: accumulated context memory.

[A well-designed MCP server](/blog/en/arquitetura-servidor-mcp.html) is today the force restoring some portability to the connection between agent and tool — the one harness layer moving toward an open standard instead of a proprietary format. The rest — decision loop, guardrail, memory — remains proprietary by design, and that's where every agent platform vendor bets its customer retention.

## Four questions before signing an agent contract

Before closing an annual agent platform contract, four questions separate an informed decision from a bet:

1. **How much of the harness is exportable without a rewrite?** Proprietary orchestration, guardrails, and loop logic become a full rewrite when the vendor changes — ask for that estimate before signing, not after.
2. **How much accumulated context is locked into the vendor's format?** Conversation history, embeddings, and fine-tuning done inside the platform rarely export in a format another engine can read.
3. **How many native integrations with the rest of the stack depend specifically on this agent?** If the agent is entangled with the company's own CRM, ERP, or productivity suite, switching the agent means switching the whole surrounding environment.
4. **What's the real timeline for a full migration — including the system around it, not just the agent?** The sales proposal measures deployment time; it rarely measures exit time.

In Agentforce's case, [the six pricing models that don't mix with each other](/blog/en/agentforce-pricing-seis-modelos.html) already function, on their own, as an additional lock-in vector — switching agent platforms there means rebuilding the entire budgeting logic, not just the technical integration.

## The lock-in nobody is pricing

The exit cost is rarely abstract — it usually comes bundled into another project the company wouldn't even call "switching agents." Leaving Agentforce, for example, means evaluating a simultaneous CRM migration — a project that typically runs 18 to 36 months, according to a switching-cost analysis published in 2026. On the other side, Copilot penetration sat at around 3.3% of Microsoft 365 enterprise seats in fiscal Q3 2026 — a number read, at first glance, as stalled adoption. In practice, it masks workflow dependency accumulating regardless of usage volume: every automation built on Copilot Studio, every piece of corporate data indexed, deepens the ecosystem vector even with low formal adoption.

> Peak lock-in exposure is rarely company-wide — it's account-specific, and no one inside the company formally owns adding it up before the contract renews.

Most agent pilots never even get this far: MIT research found in 2025 that 95% of enterprise AI pilots fail to scale, with only 5% delivering measurable profit impact. The detail that goes unnoticed is that the 5% that do scale rarely audited lock-in before signing — technical success makes exposure grow along with usage, not shrink. A specialized consultancy, with no resale incentive on either side, is what can run that audit looking at the four vectors — not at the sales pitch from whichever vendor is across the table.

## Questions that keep coming back

To close, the most common questions about AI agent platform lock-in.

## What is lock-in in an AI agent platform?

Agent platform lock-in is the technical and operational dependency accumulated across four vectors — API dependency, orchestration framework capture, context data gravity, and entanglement with the rest of the ecosystem — that makes switching vendors more expensive than the original contract suggests. It's not a single clause in the contract; it's the sum of technical decisions made over the course of using the platform.

## Does vendor trust guarantee less lock-in?

No. An April 2026 mapping cross-referenced both axes and showed they move independently: vendors with solid security governance and regulatory posture — high trust — can carry equally high lock-in when their integration with cloud, CRM, or productivity suite runs deep. The reverse also holds: technically more flexible options tend to raise bigger doubts about governance. Evaluating only one of the two axes leaves the decision incomplete.

## How do you measure lock-in before signing an agent contract?

With four objective questions: how much of the harness (orchestration, guardrails, loop logic) is exportable without a rewrite; how much accumulated context — history, embeddings, fine-tuning — is locked into the vendor's format; how many native integrations with the rest of the stack depend specifically on this agent; and what's the real timeline for a full migration, including the surrounding system, not just the isolated agent. A vendor that can't answer the fourth question, or dodges it, is a red flag.
