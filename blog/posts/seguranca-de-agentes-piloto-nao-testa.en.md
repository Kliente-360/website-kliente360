---
title: "Agent Security: the Pilot Never Tests Prompt Injection or Tool Poisoning"
slug: "seguranca-de-agentes-piloto-nao-testa"
excerpt: "82% of executives trust their agent security policy; only 21% have real visibility into prompt injection and tool poisoning."
tldr: "Prompt injection is the manipulation of an agent through malicious instructions embedded in the content it processes; tool poisoning is the manipulation of a tool's description or behavior after the agent has already been authorized to call it. Neither shows up in the pilot, because a pilot runs on curated data, stable tools, and human review of every output — exactly the three conditions production removes as the agent scales. A 2026 survey of more than 900 executives and technical practitioners found 82% confident their security policy protects against unauthorized agent action, but only 21% with full visibility into the permissions, tools, and data the agent actually uses."
keywords: ["AI agent security", "prompt injection", "tool poisoning", "agent governance", "AI agent pilot", "MCP"]
---

**Eighty-two** percent of executives say they trust that their company's security policy protects against unauthorized AI agent action. Only twenty-one percent have full visibility into what permissions that agent holds, what tools it calls, and what data it accesses. Both numbers come from the same survey — the *State of AI Agent Security 2026*, drawn from more than 900 executives and technical practitioners — and describe the same company answering two different questions: one about the written policy, the other about the agent's actual behavior in production.

That gap doesn't come from negligence. It comes from where confidence in agent security was calibrated: the pilot. A pilot runs on a known set of tools, data curated by the team itself, and human review of every output before it becomes an action — exactly the three conditions production removes, one at a time, as the agent scales. Prompt injection and tool poisoning, two of the most cited attack vectors in 2026 security literature, are invisible under those controlled conditions. They only show up once someone — deliberately or not — exposes the agent to what the pilot never exposed it to.

## The symptom: the pilot passes, production discovers the attack

The pattern repeats across nearly every documented incident: the team approved the pilot because the agent behaved well within the tested scope. Nobody deliberately tried to make the agent disobey its own instructions. Nobody swapped a tool's version mid-test to see if the agent noticed. The pilot measured competence on a known task — not resistance to an unknown adversary.

The cost of that gap has already shown up at scale: 88% of organizations reported a confirmed or suspected AI agent security incident in the past year, according to the same survey. And formal approval isn't keeping pace with deployment speed — only 14.4% of organizations put agents into production with full security or IT approval. Most scale first and formalize controls afterward, usually after the first incident exposes what was missing.

> The pilot tests whether the agent works. It rarely tests whether it resists someone trying to make it work wrong.

## Prompt injection: the pilot never read hostile content

Prompt injection is the technique of embedding malicious instructions inside content an agent processes — an email, a document, a web page, a tool's response — in a way the model interprets as a command, not as data. [We already detailed this vector when mapping the architecture of an MCP server](/blog/en/arquitetura-servidor-mcp.html): when a resource returns third-party content, that content enters the model's context with the same authority as a user instruction — and by default the model has no way to tell the two sources apart.

The severity of this vector is confirmed outside our own argument. The OWASP GenAI Security Project has kept prompt injection in first place on the LLM Top 10 since the list has existed, and the 2026 edition maps the vector into six of the ten categories in the Top 10 specific to agentic applications — a sign the problem has stopped being an isolated checklist item and now cuts across nearly every decision surface an agent has.

A pilot processes data the team itself selected — usually clean, usually trusted. Production processes whatever the world sends: a customer email, a vendor attachment, a search result, content from an MCP server the company doesn't even operate. None of those sources went through the same filter the pilot's data did. The first time the agent encounters genuinely hostile content tends to be in production — exactly when the cost of the error stops being hypothetical.

## Tool poisoning: the tool changes after the pilot approved it

Tool poisoning is the manipulation of a tool's description — or the behavior behind it — after the agent has already been authorized to call it. The model reads a tool's natural-language description as an instruction, not as metadata, and nothing in the protocol [behind MCP's enterprise adoption](/blog/en/model-context-protocol-servidor-mcp.html) stops that description from changing on a later connection, without the client re-evaluating its original consent.

Two documented 2026 cases show this already happened outside the lab. CVE-2026-22708, against the Cursor editor, allowed poisoning the agent's execution environment so that supposedly safe commands — like `git branch` — delivered arbitrary payloads. And the `postmark-mcp` package published fifteen clean versions, building trust, before adding a single line of code that silently exfiltrated data.

> A tool approved once doesn't stay approved forever — it just stops being reviewed.

Neither attack shows up in a pilot, because a pilot tests a tool at the version it had on test day, not the version it might assume six months later, from a vendor the company doesn't re-audit with every update. Trusting a tool once isn't the same as trusting it forever — and that difference is exactly what separates an integration checklist from continuous security discipline.

## Five questions the pilot should answer and usually doesn't

Before treating a pilot as validated for production, five questions separate a competence test from a security test:

1. **Did the pilot expose the agent to content the company doesn't control?** External email, third-party document, search result — if the answer is "only curated internal data," the pilot never tested real prompt injection.
2. **Did anyone deliberately try to make the agent disobey its own instruction?** Prompt injection red-teaming is different from functionality testing — it requires a simulated adversary, not a cooperative user.
3. **Is the tool the agent calls today the same, at the same version, it will call six months from now?** Without audited versioning, the answer is "we don't know" — and "we don't know" is the precondition for every documented tool poisoning case.
4. **Is there a structured log of every tool call, or only the final aggregated result?** [Without that trace, a security incident becomes a memory reconstruction](/blog/en/observabilidade-de-agentes.html) instead of a data-backed investigation.
5. **Who reviews the agent's behavior after the pilot becomes production — and how often?** A pilot has a validation deadline; production doesn't have a deadline to stop being reviewed.

## Confidence in agent security measures the pilot, not production

The gap between 82% and 21% isn't about dishonest executives — it's about measuring the wrong thing. The written policy, the formal approval, the pilot that passed: all of them answer "the agent is working." None of them answers "the agent resists someone trying to make it work against the company." The 88% of organizations that already reported a confirmed or suspected security incident didn't discover it in the pilot — they discovered it afterward, because the pilot never tested for that scenario.

Closing that gap costs less before the agent scales than after the first incident. Prompt injection red-teaming, audited versioning of every external tool, mandatory human review of irreversible actions — none of the three requires rebuilding the agent. It requires testing against the adversary the pilot never simulated, before production simulates it on its own.

## Questions that keep coming back

To close, the questions that come up most often about AI agent security, prompt injection, and tool poisoning.

## What is prompt injection in AI agents?

Prompt injection is the technique of embedding malicious instructions inside content an AI agent processes — an email, document, web page, or tool response — so the model interprets that content as a command rather than as data. The OWASP GenAI Security Project has kept prompt injection in first place on the LLM Top 10 since the list has existed, and the 2026 edition maps the vector into six of the ten categories in the Top 10 specific to agentic applications — a sign the risk cuts across nearly every decision surface an agent has, not just direct user text input.

## What is tool poisoning and how does it differ from prompt injection?

Tool poisoning is the manipulation of a tool's description — or the behavior behind it — after an agent or client has already approved its use, while prompt injection attacks the content an agent reads during execution. Both exploit the same blind spot: the model treats tool descriptions and external content as trustworthy information by default. Documented 2026 cases, like CVE-2026-22708 against the Cursor editor and the `postmark-mcp` package that added data exfiltration after fifteen clean versions, show the attack usually arrives after trust has already been built — not on the first interaction.

## Why doesn't an agent pilot catch these risks?

Because pilots and production test against different adversaries. A pilot runs on data curated by the team itself, a tool at its tested version, and human review of every output before it becomes an action — the three conditions that eliminate, by design, both prompt injection and tool poisoning. Production removes those three protections progressively as the agent scales: it processes data the company doesn't control, calls tools that can change without notice, and acts with less human review per call, because volume doesn't allow it. The pilot measures competence on a known task; it doesn't measure resistance to an adversary that only shows up once the pilot ends.
