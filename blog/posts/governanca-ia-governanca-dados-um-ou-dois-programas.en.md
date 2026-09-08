---
title: "AI Governance and Data Governance: One Program or Two?"
slug: "governanca-ia-governanca-dados-um-ou-dois-programas"
excerpt: "AI committees spring up alongside data governance — but most agent incidents trace back to poorly governed data."
tldr: "AI governance is the set of policy, committee, and control that decides how a model or agent gets approved, monitored, and shut down — a discipline distinct from data governance, which covers the quality, access, and lineage of the data feeding that same model. In 2026, 55% of companies already have a dedicated AI board or committee, often set up in parallel to a data program that already existed, and spending on AI governance platforms is projected to reach US$492 million this year — more than double 2024. The open debate at the Gartner Data & Analytics Summit 2026 isn't whether AI needs governance — it's whether it deserves its own program, since most agent incidents originate in a data failure, not a model failure."
keywords: ["AI governance", "data governance", "AI governance committee", "DataGovOps", "data organizational structure", "agent governance"]
---

**Two** governance committees coexist today in most companies already running some AI agent in production: an older one, focused on data quality, access, and lineage; a newer one, set up in a hurry when the first generative AI pilot slipped out of control, focused on model risk, bias, and use-case approval. Both have similar mandates — decide what can run, under what control, under whose responsibility — but they rarely share a meeting, a risk spreadsheet, or a vocabulary.

This layout wasn't planned. It came from speed: the data governance program had already existed for years when the autonomous-agent wave arrived too fast to wait for a committee with a full agenda to restructure itself. The result is two parallel structures — and a gray zone in the middle, where nobody decides who approves the agent acting on data the other committee already oversees.

## The symptom: two committees, one gray zone in between

The pattern shows up as soon as an agent errs in production: the AI committee reviews the model, the prompt, the decision log — and concludes the model "behaved as expected" given what it received. The data committee never saw the case, because in everyone's mind it was "an AI problem," not "a data problem." The incident ends up with no real owner: each committee investigated the half of the problem that fit its own mandate.

The numbers show the same fragmentation at scale. A 2026 McKinsey survey found that 70% of Fortune 500 companies already have an AI risk committee, and 41% built a dedicated AI governance team — almost always reporting outside the line that already owned data quality and access. A Gartner poll of more than 1,800 executives, from the same year, found 55% of companies with a formal AI oversight board or committee. The new structure grew fast; the question of how it fits into the old one got left for later.

> AI governance born alongside data governance solves the wrong problem twice — once in each committee.

The accountability gap doesn't stop between committees — it climbs to the top. The same McKinsey survey found that only 28% of companies say the CEO takes direct responsibility for AI governance, and just 17% assign it to the board. Even with 62% of boards discussing AI regularly, only 27% formalized the topic in any committee's charter. There's debate about AI in nearly every boardroom — but rarely a single, formal owner who answers when the program fails.

## Why it became an open debate in 2026

The spending confirms the question isn't academic. Gartner projects the AI governance platform market will move US$492 million in 2026 — more than double 2024 — and surpass US$1 billion by 2030, pushed by regulation expected to cover 75% of the world's economies by then. Companies that adopt one of these platforms are 3.4 times more likely to report high effectiveness in their own AI governance, according to a Gartner survey of 360 organizations in the second quarter of 2025 — but buying a tool doesn't resolve the structural question behind it.

At the Gartner Data & Analytics Summit 2026 — in Orlando, London, and Sydney — analysts like Sarah Turkaly and Anurag Raj presented the same thesis in dedicated sessions: companies have reached a tipping point where data and analytics governance can become the single point of failure for the entire AI strategy. The framing repeated across the three editions — "governance of AI, by AI, and for AI" — doesn't treat the two programs as separate worlds; it treats data governance as the foundation any AI governance needs to be built on, not as a sibling discipline evolving in parallel.

## Most agent incidents start on the wrong side of the line

[We've already shown that an agent demands a stricter data standard than a dashboard](/blog/en/dado-pronto-para-ia-arquitetura-agente.html) across four specific axes: freshness, business context, identity-based access control, and end-to-end traceability. When an AI committee investigates an agent that decided wrong and doesn't see those four axes as part of its own scope, it's evaluating the symptom without examining the most likely cause.

> Most incidents that look like model failure are, at the root, data failure nobody catalogued as such.

The same holds on the automation side. [Data governance as code already solves, automatically, the traceability attribute](/blog/en/governanca-dados-como-codigo.html) that any agent-incident investigation needs to check first — where the data came from, when it was updated, what business rule was applied. A company that treats this as the exclusive property of the data program, with no bridge to the AI committee, rebuilds from memory in every investigation a trail that already existed, automated, somewhere else in the same house.

That doesn't mean AI governance is just data governance with a new name. Classification bias, prompt injection attacks, factual hallucination, and the decision of when an agent acts without human review are problems that traditional data instrumentation doesn't cover on its own — [the same gap that shows up when an agent pilot runs under conditions production doesn't reproduce](/blog/en/seguranca-de-agentes-piloto-nao-testa.html). The right question isn't "one program eliminates the other" — it's where the boundary between them sits, and who crosses it when an incident doesn't respect the org chart's division.

## One program, two layers: the design that closes the gap

The design that avoids the gray zone isn't merging both committees into a single meeting, nor keeping two programs that never talk. It's treating AI governance as a second layer that mandatorily inherits the first:

1. **Foundation layer — data governance as an onboarding prerequisite.** No agent goes to production without passing the four AI-ready data attributes already audited by the existing program. This eliminates the scenario where the AI committee approves a use case without knowing the data behind it was never evaluated against that standard.
2. **AI-specific layer — risk that only exists because the consumer decides alone.** Bias, explainability, adversarial testing, the policy for when to require human review before an action. This stays with the AI committee because it demands expertise the data team traditionally doesn't have — not because it's less important.
3. **Single escalation, not double.** When an agent errs, there's one investigation path that crosses both layers in the right order — data first, model second — instead of two parallel investigations that never meet.
4. **A named owner per use case, not just per committee.** [The agent-owner role already answers this at the operational level](/blog/en/dono-do-agente-cargo-2026.html) — the same named-accountability logic needs to exist one level up, in deciding which committee approves what before an agent goes live.
5. **Shared audit trail, not duplicated.** The traceability that data governance as code already produces automatically becomes direct input for any AI investigation — without the AI committee having to rebuild the same information with its own tooling.

Regulatory pressure pushes in the same direction. [Brazil's ANPD already named AI an enforcement axis even with the legal framework stalled in Congress](/blog/en/anpd-fiscalizacao-ia-brasil.html), and Gartner itself projects that, by 2030, half of companies will use autonomous agents to translate governance policy into machine-verifiable data contracts — the kind of automation that only works if both layers already speak the same language today.

## The question isn't which committee wins — it's where the boundary sits

One program or two was never really an org-chart dispute on its own — it's a dispute over who examines what first when something goes wrong. A company that treats AI governance as an extension of data governance, with an explicit boundary and single escalation, enters every incident knowing where to start the investigation. A company that lets the two committees grow in parallel with no formal bridge only discovers the boundary after an incident lands right in the middle of it.

## Questions that keep coming back

To close, the most common doubts about structuring AI governance and data governance.

## Are AI governance and data governance the same thing?

No. Data governance covers data quality, access, and lineage; AI governance covers how a model or agent gets approved, monitored, and shut down — including risk that data alone doesn't cover, such as classification bias, prompt injection, and the decision to require human review before an action. They're distinct disciplines, but most incidents attributed to AI originate from a data problem the data program already had — or should have had — covered.

## Do I need an AI committee separate from the data committee?

It depends on the company's maturity and regulatory exposure, but the bigger risk isn't having two committees — it's having two committees with no formal bridge between them. The more robust design treats AI governance as a second layer that mandatorily inherits the first: no agent goes to production without passing the AI-ready data attributes already audited by the existing program, with a single escalation path when something fails.

## Who should answer when an agent errs because of bad data?

The named owner of that specific agent is the first operational point of contact, but the investigation needs to follow the right boundary: data first, model second. If the data program and the AI program never shared an audit trail, that investigation rebuilds from memory information that already existed, automated, somewhere else in the same company — the most common reason an incident takes weeks to explain instead of minutes.
