---
title: "Agentforce pricing: six commercial models that don't mix"
slug: "agentforce-pricing-seis-modelos"
pillar: "sf"
date: "2026-08-25"
readMinutes: 7
excerpt: "Agentforce has six pricing models, from a free tier to $550/user — but $2 conversations and Flex Credits never coexist in the same org."
tldr: "Agentforce pricing in 2026 splits into six distinct commercial models — free Salesforce Foundations, $2 per conversation, per-action Flex Credits, a user license, an unlimited-use add-on, and the bundled Agentforce 1 edition — and two of them, conversations and Flex Credits, are mutually exclusive within the same org. Getting that specific choice wrong is not cosmetic: the break-even sits around 20 actions per conversation, and organizations that pick the wrong side pay substantially more for the same usage volume. The other four layers solve different adoption scenarios — from the free pilot to the high-volume employee — and picking the wrong one there costs just as much as getting conversations versus credits wrong."
keywords: ["Agentforce pricing", "Flex Credits", "Agentforce conversations", "Agentforce User License", "Agentforce 1", "Salesforce Foundations"]
---

**Pricing** is the question every decision-maker asks before approving an Agentforce pilot — and it's also the one official documentation answers in the most fragmented way. There is no single "Agentforce price." Six commercial models coexist in Salesforce's 2026 catalog, each built for a different usage pattern, and picking the wrong one costs as much as picking the wrong tool.

The problem isn't scarcity of choice — it's the opposite. With six paths and a mutual-exclusion rule buried in the middle of them, the question that decides the budget isn't "how much does Agentforce cost," it's "which of these six models matches the usage pattern the organization already has."

## Six models, one decision per org

None of the six is hypothetical — all are active in the 2026 commercial catalog. What separates them is what each one measures as its unit of consumption:

1. **Salesforce Foundations (free).** A zero-cost add-on for anyone already on Enterprise Edition of Sales Cloud or Service Cloud. It includes an initial pool of Flex Credits, Data 360 credits, and access to Agent Builder and Prompt Builder — a pilot without an additional license.
2. **$2-per-conversation.** Built for agents facing external customers. A conversation is the interaction window between user and agent — from the first message to resolution, escalation to a human, or 24 hours of inactivity — billed as one closed unit, regardless of how many messages or actions happened inside it.
3. **Flex Credits per action.** Consumption model: $500 buys 100,000 credits, and each standard action the agent performs consumes 20 credits (roughly $0.10). A voice action consumes 30 credits (roughly $0.15).
4. **Agentforce User License.** A per-internal-user license, around $5 per month, that still draws real action consumption from the org's Flex Credits pool.
5. **Agentforce as an unlimited-use add-on.** Between $125 and $150 per user per month, with no action meter — built for the employee with intense, predictable usage, where variable consumption would end up costing more than a fixed license.
6. **Agentforce 1.** A bundled edition that folds the Agentforce add-on together with Flex Credits and Data 360 credits into a single SKU, for an organization consolidating its AI and CRM investment into one contract instead of buying each piece separately.

> Six models isn't menu generosity — it's Salesforce acknowledging that customer-facing and employee-facing agents consume in incompatible ways.

The first filter for any budget decision is simple: models 2 and 3 don't coexist in the same org. The rest — Foundations, license, add-on, Agentforce 1 — resolve different layers of internal adoption. It's the conversation-versus-credit pair that concentrates the real risk of getting the math wrong.

## $2 per conversation or Flex Credits — the mutual exclusion that decides the rest

Conversations and Flex Credits measure the same thing — agent usage — in incompatible ways, and Salesforce doesn't allow running both models in the same org at once. The choice is structural, not tactical: it changes how the entire agent operation gets budgeted going forward.

The math behind the choice is straightforward. A standard action under Flex Credits costs about $0.10. A full conversation, regardless of how many actions happen inside it, costs a flat $2. The break-even falls near 20 actions per conversation — below that, Flex Credits comes out cheaper; above it, the flat-rate conversation wins.

1. **Simple support agent, few back-and-forths.** An order-tracking question resolved in 3–5 actions consumes well under $2 in Flex Credits. Here, per-action credit is the rational choice.
2. **Complex service agent, multiple tools per session.** A case that requires pulling history, crossing systems, and carrying context easily clears 20 actions. Here, the flat $2 conversation protects against accumulated credit spend.
3. **High, predictable volume of simple conversations.** When the usage pattern is stable and actions per conversation stay consistently low, Flex Credits gives fine-grained control — but it demands constant consumption monitoring that the flat conversation skips.

> Choosing between conversation and credit isn't choosing the cheaper one — it's choosing the model that matches the real variance of the use case, not its most optimistic scenario.

It's the same risk pattern that [already showed up in Data Cloud's pricing overhaul](/blog/en/data-cloud-pricing-creditos-2026.html): a variable-consumption model looks cheaper on the proposal and turns unpredictable in operation when the organization doesn't map its real volume beforehand.

## The three layers built for the employee, not the customer

Conversations and Flex Credits solve for the outward-facing agent — customer, prospect, external user. But Agentforce also sells for internal use, and that's where the other three layers of the model come in:

**Agentforce User License** covers the employee who uses the agent occasionally, with real action consumption still debited from the org's Flex Credits pool. It's the cheapest way to give a large number of users access without committing to a high per-seat budget.

**The unlimited-use add-on** trades the meter for a fixed price per user — between $125 and $150 per month. It makes sense when the employee uses the agent with predictable intensity: a salesperson who checks the agent on every opportunity, a support analyst clearing case after case. Paying per action for that usage profile usually costs more than the fixed license.

**Agentforce 1** is the bet for those who've already decided to consolidate. By bundling the add-on, Flex Credits, and Data 360 credits into a single SKU, it eliminates managing three separate contracts — at the cost of a larger up-front commitment, [the same ROI yardstick that decides any larger Salesforce investment](/blog/en/salesforce-roi-matriz.html).

## Three questions to decide without burning budget

Before signing any of the six models, three questions settle most of the budget risk:

1. **Does the agent talk to an external customer or an internal employee?** That answer already eliminates half the options — conversations and Flex Credits compete for the external case; license, add-on, and Agentforce 1 compete for the internal case.
2. **Does the average number of actions per conversation land above or below 20?** If the organization doesn't know yet, a pilot inside [free Foundations](/blog/en/salesforce-foundations-o-que-cobre-de-verdade.html) is the right place to measure before committing to one of the two mutually exclusive models.
3. **Is per-employee usage occasional or intense and predictable?** Occasional usage favors the license with Flex Credits; intense usage favors the fixed-price add-on — flipping the choice pays for the worst of both worlds.

None of the three questions trade real data for a salesperson's estimate. The right answer lives in the operation's own usage pattern, not in an isolated price sheet.

## Six models solve six scenarios — not just one of them

Agentforce's pricing fragmentation isn't a communication accident — it reflects the fact that AI agents in production don't share a single consumption pattern. External customers consume differently from internal employees; simple cases consume differently from complex ones; a pilot consumes differently from mature operations.

The costliest mistake isn't picking a specific model — it's signing whichever one the salesperson recommends first without measuring, beforehand, which of the six scenarios the operation actually fits. Whoever maps the usage pattern before buying walks into the sales conversation already knowing which of the six questions to ask first.

## Questions that keep coming back

To close, the most common doubts about what Agentforce actually costs.

## How much does Agentforce cost per conversation?

The conversation model charges $2 per complete conversation, regardless of how many actions or messages happen inside it. A conversation is defined as the interaction window between user and agent — from the first message to resolution, escalation to a human, or 24 hours of inactivity. It's the recommended model for customer-facing agents with cases that involve multiple actions per session.

## Can I use Flex Credits and conversations at the same time in Agentforce?

No. Conversations and Flex Credits are mutually exclusive within the same org — Salesforce requires choosing one of the two models, not switching case by case. The decision depends on the average number of actions per conversation: below roughly 20 actions, Flex Credits (about $0.10 per standard action) tends to be cheaper; above that, the flat $2 conversation protects against accumulated consumption.

## Is there a free way to try Agentforce?

Yes, inside Salesforce Foundations — a zero-cost add-on for Sales Cloud or Service Cloud customers on Enterprise Edition or above, which includes an initial pool of Flex Credits, Data 360 credits, and access to Agent Builder and Prompt Builder. It's the right path to measure the real usage pattern — actions per conversation, employee volume — before committing to one of the paid models.
