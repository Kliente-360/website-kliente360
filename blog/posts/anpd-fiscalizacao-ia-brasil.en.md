---
title: "Brazil's ANPD Is Already Policing AI — Even With the Law Stuck in Congress"
slug: "anpd-fiscalizacao-ia-brasil"
pillar: "ai"
date: "2026-07-21"
readMinutes: 7
excerpt: "Brazil's AI bill is stuck in Congress, but the ANPD made AI a 2026–2027 enforcement priority — what changes for anyone training a model on customer data."
tldr: "The ANPD is the authority already enforcing AI oversight in Brazil even without the country's AI bill (PL 2338/2023) passed — the bill remains stuck in Congress, with no vote expected before the recess that started in July 2026. The agency named AI one of four axes in its own 2026–2027 Regulatory Agenda, has already published technical notes on human review of automated decisions and on synthetic content as personal data, and became a full regulatory agency with more enforcement power. No fine has been issued specifically for model training yet — but the structure to apply one is already in place."
keywords: ["ANPD", "AI regulation Brazil", "PL 2338", "LGPD", "generative AI", "AI compliance"]
---

AI regulation in Brazil isn't waiting for the bill to pass. While PL 2338/2023, the country's AI bill, gets postponed again in Congress — the fourth delay since December 2025 —, Brazil's National Data Protection Authority (ANPD) has already named AI one of four axes in its own 2026–2027 Regulatory Agenda, published two AI-specific technical notes this year, and became a full regulatory agency with more enforcement power. For anyone training a model or running an agent on customer data, the right question is no longer "when does the law pass" — it's "what already applies while it doesn't".

Treating a stalled bill as a regulatory vacuum is a common mistake. It isn't one. Brazil's data protection law (LGPD) already applies to any processing of personal data, model training included, and the ANPD has been showing — through resolution, technical note and a concrete case — that it won't wait for a new text to act on what it already considers within its own scope.

## The AI bill stalls — for the fourth time

The Senate passed PL 2338/2023 unanimously in December 2024, and the text moved to the Chamber of Deputies in March 2025. The Special Committee, chaired by congresswoman Luísa Canziani and reported by congressman Aguinaldo Ribeiro, held 12 public hearings between May and September 2025 — a sign of technical weight, not of delay from lack of interest.

The problem sits in the vote, not the groundwork. It's been announced and postponed at least four times: December 2025, February 2026, May 27 2026, and June 2026. With the Chamber entering recess on July 18 2026, House Speaker Hugo Motta himself tied any progress to prior alignment with the Senate — pushing any real vote past the recess, with no new date confirmed as of this writing.

Part of the added complexity comes from PL 6237/2025, a bill from the Executive branch itself that creates Brazil's National AI System and was attached to PL 2338 to fix a procedural defect — assigning regulatory powers to the ANPD is a matter reserved to the Executive. That bill is what defines the ANPD as **AI's residual regulatory authority**: the body that sets rules, enforces and sanctions in sectors without their own sector regulator (finance has the Central Bank, health has Anvisa, and so on).

## What the ANPD already enforces without waiting for Congress

In December 2025, the ANPD published its Priority Themes Map for the 2026–2027 biennium and updated its own Regulatory Agenda. AI and emerging technologies is one of four enforcement axes defined there — alongside data subject rights, protection of children and teenagers online, and data processing by public agencies. Of the total actions planned for 2027, 20 are specifically about AI.

Two technical notes have already come out of that axis. Technical Note 12/2025 consolidated 124 contributions from a public consultation on human review of automated decisions (the right under LGPD's Article 20) — still guidance, not yet a binding rule on its own, but it shows where the rulemaking is headed. Technical Note 1/2026, published in February, addressed a concrete case: AI-generated synthetic content (deepfakes) that identifies a person counts as personal data, subject to LGPD's purpose and adequacy principles — a position adopted in coordinated action with Brazil's Federal Prosecutor's Office and the consumer protection agency Senacon.

> A stalled law isn't stalled enforcement — the ANPD decided that on its own, using the LGPD that already exists.

Neither case depended on PL 2338 becoming law. The agency is applying a law already in force to a type of data processing — model training and operation — that it already considers within its own scope.

## From agency to regulator: why Law 15.352/2026 matters

In February 2026, Law 15.352/2026 turned the ANPD from a government body into a full regulatory agency, with functional, technical, decision-making, administrative and financial autonomy, plus 200 new regulatory-specialist positions. The stated motivation was broad — it includes the Digital Statute for Children and Adolescents, in force since March 2026 — but the effect reaches every enforcement axis at the agency, AI included: more staff, more budget, more autonomy to open a case.

The ANPD also ran the country's first AI regulatory sandbox: the call opened in June 2025, the leveling phase wrapped up in February 2026, three companies were selected (Metatext, Synapse Artificial Intelligence and IA Greenworld), and the program runs through December 2026 with a focus on algorithmic transparency and human review of automated decisions. A regulatory sandbox exists precisely to test a rule before publishing it — what's being evaluated there today is a strong candidate to become a formal rule in 2027.

Brazil isn't alone in this pattern of "enforce with what already exists, while the specific law isn't finalized." The European Union has August 2 2026 as the key date for high-risk obligations under the AI Act, despite a recent political agreement discussing delaying part of that deadline. In the United States, the federal vacuum remains filled by a patchwork of state laws. The lesson repeats across every one of these geographies: the rule already in force weighs more in the short term than the one still under debate.

## What changes now for anyone training a model on customer data

The practical checklist, in the order the ANPD has already signaled as priority:

1. **Legal basis documented in writing, now.** Consent, contract execution or legitimate interest — every data category used in training or in a prompt needs a documented legal basis, exactly as [we detailed in the LLM governance checklist](/blog/en/privacidade-dados-llms.html). This doesn't depend on PL 2338; it's a requirement of the LGPD already in force.
2. **Human review of automated decisions is a certain destination, not a hypothesis.** Technical Note 12/2025 shows the ANPD moving toward regulating LGPD's Article 20 specifically for AI. Whoever already has an escalation-to-human process won't have to scramble when the rule lands.
3. **AI-generated content that identifies a person is personal data — no room for doubt.** That's the position the ANPD already applied in the Grok/X case. It applies to deepfakes, but it also applies to any agent output that produces something attributable to a real customer or candidate — [as we discussed in the risk of AI resume screening](/blog/en/ia-para-rh.html), a real, identifiable person's sensitive data doesn't lose protection just because it passed through a model.
4. **International transfer of data for training follows the general rule, with no exception for "it's just training."** ANPD Resolution 19/2024 already sets standard contractual clauses for this kind of transfer — sending a Brazilian customer's data to train a model on a US server falls under that rule, period.
5. **No named fine yet doesn't mean no active enforcement.** In June 2026, the ANPD opened 19 new administrative sanction proceedings — the largest batch in the agency's history — and referred 21 controllers and processors for sanctions review. The legal cap on fines is 2% of revenue, limited to R$ 50 million (roughly US$ 9 million) per violation.

> The first AI fine in Brazil doesn't have a name yet. The structure to hand it down already does.

## No specific law yet isn't a grace period

The "let's wait for the bill" argument confuses two things the ANPD has already separated in practice: regulating AI as a new technology category (that does depend on PL 2338, and it'll still take time) and enforcing personal data processing that happens inside an AI system (that's already happening, under a law already in force for years). Companies that treat both as the same thing keep postponing governance until the day an administrative proceeding arrives with their name on it.

The window that exists now isn't "no rule" — it's "general rule already applying, specific rule still in draft." Whoever uses this window to formalize legal basis, design human review and document international transfers arrives in 2027 with the case already made. Whoever treats the stalled bill as a green light will find out the hard way — when the ANPD decides their own case is the example that was missing.

## Questions that keep coming back

Closing out, the most frequent questions about what actually changes with the ANPD watching AI.

## What is the ANPD's Regulatory Agenda?

The Regulatory Agenda is the document the ANPD publishes periodically listing the priority themes the agency will regulate and enforce over a given period — the current version covers 2025–2026, complemented by the Priority Themes Map for the 2026–2027 biennium, published in December 2025. AI and emerging technologies is one of four axes defined in that map, alongside data subject rights, protection of children and teenagers online, and data processing by public agencies — with 20 AI-specific enforcement actions planned for 2027.

## Do I need to worry about AI if the bill hasn't passed yet?

Yes, because the LGPD already applies regardless of whether PL 2338 becomes law. The specific AI bill will address points the LGPD doesn't cover well — risk classification by system type, algorithmic transparency obligations, its own sanctions regime. But any personal data processing inside an AI system — training, prompts, output that identifies someone — is already subject to the LGPD and to active ANPD enforcement today, as shown by the two technical notes published in 2025 and 2026.

## What fine can the ANPD apply for misusing AI with personal data?

The legal cap is 2% of the company's revenue in Brazil, limited to R$ 50 million (about US$ 9 million) per violation — the same sanctions scale as any other LGPD violation, because there isn't yet an AI-specific fine regime (that depends on the AI bill). As of this writing, there's no public case of a named fine specifically for training or operating an AI model in Brazil. But in June 2026 the ANPD opened 19 new administrative sanction proceedings — the largest batch in the agency's history — which signals growing enforcement capacity, not an absence of risk.
