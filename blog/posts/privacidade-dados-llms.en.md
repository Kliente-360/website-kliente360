---
title: "Data privacy in LLMs: the governance checklist missing from the pilot"
slug: "privacidade-dados-llms"
pillar: "ai"
date: "2026-04-01"
readMinutes: 6
excerpt: "Team pilots LLM with real customer data, without thinking about privacy law. In three months, it becomes a public incident. Seven items to answer before the first prompt."
tldr: "LLM pilots with customer data are run without privacy governance because \"it's just a test\". It isn't just a test for LGPD/GDPR or reputation. Seven checklist items that separate a responsible pilot from a legal liability being born. Applicable regardless of where the model runs."
keywords: ["LGPD", "GDPR", "privacy", "LLM", "AI governance", "compliance"]
---

The typical AI incident story in 2026 follows the same arc. Internal team tests an LLM with real customer data — because "we need realistic data for the POC", "it'll stay internal anyway", "governance comes later". The pilot becomes a project, the project becomes a product. At some point, someone notices that personal data for 15 thousand customers passed through an American vendor's API without explicit consent, without DPIA, without registry. That becomes an incident. Could become news. Could become a fine.

This text is the governance checklist that needs to be resolved *before* the first prompt in any LLM project with real data. It isn't bureaucratic compliance — it's the minimum so the project doesn't become legal liability.

## Why the problem scales silently

LLMs amplify privacy risk in three ways traditional systems didn't.

**Data enters in free format.** Unlike a form with fixed fields, a prompt accepts anything. The operator can paste a customer's email, a call transcript, a full contract. All of that leaves the company perimeter when it hits an external API.

**Vendor logs can retain prompts.** Policy varies by provider, by plan, by region. Without a specific check, sensitive data sits in a third party's log for 30 days — or indefinitely.

**Reuse for training can happen.** OpenAI, Anthropic, Google have policies that separate enterprise API from consumer product. But default config varies, and a company that doesn't verify may be feeding training without knowing.

The three combined create a risk surface that didn't exist in traditional systems. Underestimating that generates incidents in short order.

> An LLM pilot with real data and no governance isn't "agility". It's liability being born. And unlike other liabilities, this one shows up in headlines before it shows up in invoices.

## The seven checklist items

The rule we apply before any AI project with real data. Missing two or more, the project shouldn't leave the drawing board.

1. **Data map: what's going into the prompt?** PII (name, ID, email), sensitive data (health, financial), confidential commercial data. Write explicitly. Without this list, judging risk is impossible.
2. **Legal basis for each data category.** Consent, contract execution, legitimate interest, or another. Each data category needs a mapped legal basis. Without it, regulators will come.
3. **Vendor policy on retention and training.** Written confirmation (not vendor slide) that prompts don't enter training, that retention is zero or X days, that data sits in a specific region. Without a document, it's assumption.
4. **DPIA when applicable.** Data Protection Impact Assessment for high-risk uses — AI making decisions about customers, profiling, predictive analysis. Authorities are actively inspecting this in 2026.
5. **Pseudo-anonymization or redaction in the path.** When possible, remove or mask PII before sending to the LLM. Libraries like Microsoft Presidio do this. Reduces risk surface and simplifies compliance.
6. **Own log of what was sent.** Local registry (not vendor's) of every prompt + response + user + timestamp. Needed for auditing, for incident investigation, for responding to a subject who requests info under privacy law.
7. **Human bypass policy for automated decisions.** Privacy laws guarantee the right to human review on relevant automated decisions. A serious system has an "escalate to human" button from day 1, and a defined process for review.

These seven aren't theory — they're what shows up in the first audit. Companies that have them deliver fast. Companies that don't deliver fast too, but pay later.

## What changes with internal LLMs

For companies running their own LLM (on-prem, [self-hosted open model](/blog/en/open-source-vs-proprietary-llms.html), dedicated instance), part of the checklist changes. Doesn't go away.

**Vendor isn't in the path.** Items 3 and part of 6 (vendor logs) go away. But new ones appear: internal model governance, server access control, hardening.

**PII can be more tolerable.** In well-governed internal models, data sensitivity is lower than in external API. But only "lower" — not zero. Internal leakage is still leakage.

**Regulatory compliance continues.** Privacy law doesn't differentiate where the model runs. Legal basis, DPIA, own log, right to review — all still apply.

[As I argued about LLM as internal agent](/blog/en/llm-como-agente-interno.html), running your own is more secure in one dimension (perimeter) but doesn't waive governance in the others.

## The "let's see what happens" trap

The phrase that kills governance: "it's just a pilot, we'll formalize later". In 2025 it still passed at some companies. In 2026 it doesn't. Three reasons:

**Regulators started inspecting AI specifically.** Not a hypothetical threat anymore. Companies have been fined for LLM use with personal data without legal basis. Public cases. The thing became real.

**Customers started asking.** In B2B contracts, explicit clauses about AI use, sub-processors, retention. Companies that don't answer lose business before getting fined.

**Media pays attention.** AI incidents with personal data leakage become news. Reputation costs more than fines in B2C companies.

The three combined kill the "let's see" argument. Whoever still uses it in 2026 is measuring risk with 2022 calibration.

## How to integrate with [agent evaluation](/blog/en/avaliacao-de-agentes.html) and [costs](/blog/en/custos-reais-de-inferencia.html)

Governance isn't a silo. In mature AI architecture:

**Eval set includes privacy cases.** Questions trying to make the agent reveal sensitive data, leak the system instruction, misbehave. Failing here is as critical as failing accuracy.

**Governance cost enters TCO calculation.** Own log, redaction, monitoring — all costs. Forgetting that is budgeting the pilot with 20–30% invisible cost.

**Periodic audit of what's being sent.** Monthly sample of real prompts, reviewed by DPO or governance team. Without it, behavior drift (users start pasting data they shouldn't) goes unnoticed.

## The decision for 2026

If your company is about to pilot an LLM with real data, three moves before the first prompt:

**Checklist of the seven items, answered in writing.** Not verbal in a meeting — 2–3 page document, approved by DPO and technical responsible. Becomes an audit artifact.

**Minimum acceptable use policy.** Who can send what to the LLM. Which data is forbidden. Brief team training. 1 hour of training prevents 80% of incidents.

**Sponsor with mandate to pause the pilot if needed.** When something goes wrong — and something will go wrong in some pilot — someone needs authority to pause before escalation. Without that sponsor, the team will hide the problem until it becomes an incident.

Privacy governance in LLMs in 2026 is part of the project, not an extra phase. Companies that accept this logic deliver responsible AI and grow with confidence. Companies still treating it as optional bureaucracy will be in the headline before being in the business case. The difference isn't having compliance — it's having compliance *from the first prompt*.

## Questions that keep coming back

Three questions that surface in every conversation about privacy and LLMs — answered with what this piece argues.

## Can I use real customer data in an LLM pilot?

You can, but only after governance is settled — using real data "because it's just a test" is exactly how incidents are born. The arc is always the same: pilot becomes project, project becomes product, and at some point someone discovers personal data for thousands of customers passed through an external API without legal basis, without DPIA, without registry.

The responsible path is answering the seven checklist items in writing before the first prompt: data map, legal basis per category, documented vendor policy, DPIA when applicable, redaction in the path, your own log, and human bypass. Missing two or more, the pilot shouldn't leave the drawing board. And where you can mask PII before sending, even better — it shrinks risk and simplifies compliance.

## Does running the LLM on-premise solve the privacy problem?

No — it changes part of the problem, but governance doesn't go away. With your own model, the vendor leaves the path: third-party retention and training concerns disappear. In exchange, new ones appear: internal model governance, server access control, hardening. And an internal leak is still a leak.

The central point is that privacy law doesn't differentiate where the model runs. Legal basis, DPIA, your own log, and the right to human review all still apply. Running your own is more secure in one dimension (perimeter), but it doesn't waive the rest of the checklist.

## How much does governance cost in an LLM project?

Less than it looks, and far less than the alternative — but it has to be budgeted from the start. Your own log, redaction, and monitoring carry real cost: forgetting them means budgeting the pilot with 20–30% invisible cost. On the process side, the effort is modest: a 2–3 page document with the checklist answered, approved by the DPO and technical lead, plus 1 hour of team training — which prevents 80% of incidents.

The counterpoint is the cost of not having it: in 2026, regulators are inspecting AI specifically, B2B customers demand AI clauses in contracts, and media turns leaks into headlines. Companies without governance lose business before getting fined — and reputation costs more than the fine.
