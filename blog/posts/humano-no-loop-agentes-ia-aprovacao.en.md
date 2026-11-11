---
title: "Human in the loop for AI agents: approving everything approves nothing"
slug: "humano-no-loop-agentes-ia-aprovacao"
pillar: "ai"
date: "2026-11-11"
readMinutes: 7
excerpt: "Human in the loop only protects when approvals are rare and informed. How to decide where an agent asks, where it acts alone and how to spot rubber-stamping."
tldr: "Human in the loop is the point where an AI agent stops and waits for a person to approve, correct or reject an action before executing it. It only reduces risk when it is rare, informed and reserved for costly or irreversible actions; approval on every action turns into rubber-stamping through fatigue and automation bias. The right design classifies each action by reversibility and impact, gives the reviewer context to decide and tracks the rejection rate to know whether review is still real."
keywords: ["human in the loop", "human-in-the-loop", "AI agents", "human approval", "automation bias", "agent governance"]
---

**Human in the loop** has become the default answer to any question about AI agents. Can the agent make mistakes? Add a human approving. Legal is uncomfortable? Human approving. The problem is that this answer is usually designed as an "approve" button on every action, and a button pressed 200 times a day stops being a control. It becomes ritual. The person approves because the agent is almost always right, and on the day it is wrong, they approve that too.

The market is learning this in practice. A [VentureBeat Intelligence survey](https://venturebeat.com/orchestration/the-share-of-enterprises-trusting-ai-agents-to-make-production-changes-on-their-own-has-fallen-from-75-to-56-vb-intelligence-finds) published in October 2026, with 140 respondents, showed that the share of companies with agents in production expecting to keep human review for the foreseeable future rose from 20% in July to 42% in August. In the same sample, 61% of those using pre-deployment evaluation reported at least one customer-facing failure after the agent passed internal tests. Companies want more human in the loop. The question is whether that human will decide anything.

## Why approval on every action becomes rubber-stamping

Approving everything looks like the safest design, and it is the one that fails most. Three mechanisms explain it.

**Approval fatigue.** When 98% of requests are correct, the reviewer learns that approving is the right behavior. After a few weeks, they read the title, not the content. The review is still recorded in the log, but attention has left it. It is the same phenomenon as a hospital alarm that rings too often: nobody runs anymore.

**Automation bias.** People tend to accept what an automated system proposes, especially when it sounds confident and well formatted. An agent that writes its justification in an assured tone makes rejection socially more expensive for the reviewer. The [TechTarget piece from June 2026](https://www.techtarget.com/searchcio/feature/Human-in-the-loop-shouldnt-rubber-stamp-decisions) on the topic sums up the analysts it heard: reviewing large volumes of AI output is not cognitively engaging for anyone.

**Reviewer without context.** Many approval screens show the action ("send email to customer X", "apply a 12% discount") without showing the why: what data the agent used, which policy it invoked, what happens if the action is wrong. Without that, the human has no grounds to disagree. They can only trust or block everything.

> An approval that is never rejected is not a control; it is a delay with a signature.

## Where the human needs to enter an agent's loop

The useful question is not "does the agent need a human?" but "which actions do?". Two axes settle most cases: **reversibility** (can it be undone in minutes, at no cost?) and **impact** (how much does a mistake cost in money, customers or compliance?).

Crossing the two gives four treatment tiers:

1. **Reversible and low impact: the agent acts alone.** Classifying a ticket, drafting an internal reply, updating a status field. The control here is observability and after-the-fact sampling, not prior approval.
2. **Reversible and high impact: the agent acts, a human reviews afterwards.** Rescheduling a delivery, changing a case priority. The agent executes, the action enters a review queue with a deadline, and the human corrects it if needed. This is what some call *human on the loop*.
3. **Irreversible and low impact: the agent acts within a fixed limit.** Sending a standard message, issuing a small-value coupon. The control is a coded ceiling (value, quantity, frequency), not a human.
4. **Irreversible and high impact: a human approves first.** A refund above a threshold, a contract change, data deletion, communication outside the template. Only here does prior approval make sense, and precisely because it is rare it tends to get read.

It is the same logic we used when discussing [when Agentforce Commerce can sell without a human in the loop](/blog/en/agentforce-commerce-vender-sem-humano.html): low ticket and standard SKUs tolerate autonomy; price exceptions and contracts call for sign-off. The criterion changes by domain, but the matrix repeats.

One point that often goes unnoticed: the tier 3 limit only really exists if the agent lacks the technical permission to exceed it. A ceiling written in the prompt is a suggestion. A ceiling enforced on the credential and on the tool's scope is a control, as we detailed when covering [giving an AI agent its own identity instead of a borrowed login](/blog/en/identidade-agente-ia-credencial-propria.html).

## How to design an approval someone actually reads

Once you decide where approval goes, the design of the approval itself determines whether it works. The sequence we apply in projects:

1. **Show the decision, not just the action.** The approval screen shows what the agent wants to do, the data it used, the rule or policy it relied on and the effect if it is wrong. If the reviewer has to open three systems to understand it, they will approve without opening them.
2. **Make rejection cheap.** Rejecting must be as fast as approving, with a one-click reason ("stale data", "outside policy", "sensitive customer"). Expensive rejection becomes approval by exhaustion.
3. **Cap the volume per reviewer.** If an analyst gets more approvals a day than they can read carefully, the design has failed. A practical reference of ours (an estimate, not a market benchmark): above 30 to 50 approvals per person per day, review quality drops visibly.
4. **Name who approves what.** Refund approval belongs to finance; customer communication, to the process owner. A generic "for the team" queue has no owner and piles up.
5. **Define what happens on silence.** If nobody approves within X hours, does the action expire, escalate or proceed? For tier 4 actions, silence should never mean "approved".
6. **Insert test cases.** From time to time, put a deliberately wrong action in the queue and see whether it gets rejected. It is the most direct way to know whether the reviewer is reading.

## Rejection rate: the metric that shows whether review is real

Every human-in-the-loop flow should publish one number: **the rejection or edit rate** of submitted actions. It says more about the health of the control than any written policy.

A rate near zero for weeks on end has two possible readings. Either the agent is so good at that action that prior approval has become waste and it should move down a tier, or the reviewer has stopped looking. The test cases from step 6 tell one reading from the other. A high, stable rate means the opposite: the agent is not ready for that action, and the human is doing the work the agent should be doing.

The healthy movement is for the action to move down tiers over time, with evidence. It starts in tier 4, builds weeks of history with a low rejection rate and caught test cases, and moves to tier 2 with sampled after-the-fact review. That history is the argument for giving the agent more autonomy, and it only exists if review was measured from the start. It is the same principle as [reserving the human for borderline cases when one LLM evaluates another](/blog/en/llm-como-juiz-validar-o-avaliador.html): human attention is scarce and should go where the machine hesitates or the error is expensive.

> Agent autonomy is earned action by action, with a measured review history, never by decree.

## What changes in agent governance

Treating human in the loop as design, not as a button, has organizational consequences. Someone has to own the tier matrix, revise it when the agent gains new tools and answer for the rejection rate like any other operational indicator. Without that, the matrix freezes on go-live day and the agent gains permissions without any action changing tier.

The gain is twofold. Risk drops on the actions that matter, because human attention is no longer diluted across hundreds of trivial approvals. And the agent delivers more value, because low-risk actions stop waiting in a queue nobody reads carefully. A well-designed human in the loop decides less often and decides for real.

## Questions that keep coming back

Common questions from teams putting AI agents into production with human approval.

## What is human in the loop for AI agents?

Human in the loop is the point in a workflow where the AI agent stops and waits for a person to approve, correct or reject an action before executing it. It differs from human *on* the loop, where the agent acts and the person reviews afterwards, with the power to correct. Both are valid controls, for different risk tiers.

## Does every agent action need human approval?

No, and requiring approval on everything tends to reduce safety rather than increase it. Prior approval makes sense for irreversible, high-impact actions; reversible or low-impact actions are better served by technical limits, sampled after-the-fact review and observability. Concentrating approval on what matters is what keeps the reviewer attentive.

## How do you tell whether human approval has become rubber-stamping?

Track the rejection or edit rate of submitted actions and periodically insert deliberately wrong cases into the queue. If the rate stays near zero and the test cases get approved, review has become rubber-stamping. If the test cases are rejected and the rate stays low, the action can move down a tier and gain autonomy.
