---
title: "Agentforce on by default: what admins must decide in Winter '27"
slug: "agentforce-ligado-por-padrao-winter-27"
pillar: "sf"
date: "2026-10-06"
readMinutes: 7
excerpt: "Winter '27 turns Agentforce on by itself in eligible editions. No agent runs, but who is allowed to build one is now your decision."
tldr: "Agentforce auto-enablement is the Winter '27 change in which Salesforce turns on its agent platform by default in Enterprise, Performance, Unlimited and Agentforce 1 editions, with no admin action and no additional cost. Turning the platform on puts no agent into operation and generates no consumption: what changes is that anyone holding the Manage AI Agents permission can now build agents on the org's data. What is left for the admin is a governance decision — who builds, on which data, and with which owner — and it has to be made before the upgrade window, not after."
keywords: ["Agentforce Winter '27", "Agentforce auto-enablement", "Manage AI Agents", "Salesforce governance", "Salesforce release", "Agentforce admin"]
---

**Agentforce** is no longer something an administrator turns on. In the Winter '27 release, Salesforce enables the agent platform by itself in eligible orgs, and the corresponding toggle leaves Setup. For anyone running an Enterprise, Performance, Unlimited or Agentforce 1 org, the question is no longer "are we adopting this?" but "who is allowed to build an agent from now on?"

The topic has generated more noise than the change deserves, in both directions. Some treat it as the start of uncontrolled AI in the org, others say nothing changes. Neither reading is right. The change is small technically and large for governance, because it removes the last point at which someone had to decide on purpose.

## What auto-enablement turns on — and what it leaves off

Salesforce has been rolling the change out gradually since early September 2026, with Winter '27 production waves running into mid-October. Your org's date is on the Salesforce Trust maintenance tab, not on a public list. According to coverage by [Salesforce Ben](https://www.salesforceben.com/salesforce-to-auto-enable-agentforce-in-winter-27-what-that-means-for-you/) and by partners who tested the preview, what happens and what doesn't is well bounded:

1. **Turns on:** the Agentforce platform becomes available, and Agentforce Builder opens for anyone who already has build permission, in orgs where Einstein generative AI was already active.
2. **Turns on no agent:** every agent stays inactive until someone builds and activates it. No agent starts answering customers on its own.
3. **Activates no channels:** nothing gets published to chat, WhatsApp or email because of the change.
4. **Changes no user permissions and no billing:** Salesforce states that enablement carries no additional cost. Consumption starts when an agent actually performs work.

All of this is true and reassuring. What the list doesn't say is that the adoption bottleneck moves. Before, "we never turned it on" worked as an informal governance policy. Now that policy ceases to exist without anyone having revoked it.

> When the platform arrives turned on by default, the absence of a decision becomes a decision — made by Salesforce, not by you.

## Where the decision now lives

With the toggle out of the way, real control is spread across three layers, and that is where an administrator should look:

**The master switch.** The Einstein setting, on its Setup page, still disables the whole platform. For most companies turning everything off is not the right answer, but it's worth knowing the exit exists and is deliberate.

**The Manage AI Agents permission.** It defines who, besides administrators, can build agents. It is the most important layer and the most neglected: in many orgs, permissions created in earlier cycles were distributed by profile without review. Whoever holds it can assemble an agent that reads and acts on the data that user can see.

**Activation, agent by agent.** No agent works without being activated, and that is where real governance happens, because each activation is an event that can require approval, an owner and acceptance criteria.

There is a fourth point that's easy to forget: the default agent that ships with the platform. It's worth opening it and checking its state before the window, rather than finding out afterward.

## The six-item list for before the upgrade window

Consultancies and partners have published similar checklists in recent weeks. The version we use with clients fits in six steps, in the order they usually pay off most:

1. **Find your org's real date** on Salesforce Trust and treat it as a governance deadline, not an IT one.
2. **Review who holds Manage AI Agents** and cut the list to people you would accept seeing build an agent in production. If nobody holds that profile today, the answer is one named person, not "the admin team".
3. **Decide your position in writing:** "we turn it on and control it through the permission" or "we keep it off until a first use case exists". Both are defensible; indecision is not.
4. **Reopen field-level security** on sensitive fields. An agent inherits the access of whoever builds it and of the context it runs in, so a tax ID or margin field that "nobody looked at" gets an automatic reader.
5. **Test in the preview sandbox** what changed, including the release's other mandatory updates that have nothing to do with AI, such as the new permission requirement for SOAP authentication on integration users.
6. **Pick the first use case with a named owner** before someone picks one on their own. An agent without an owner is the starting point of what we describe in [agent owner](/blog/en/dono-do-agente-cargo-2026.html).

## The cost the change doesn't show

The claim that turning it on costs nothing is correct and incomplete. Enabling generates no consumption, but Agentforce consumption exists and the bill grows with use, not with licensing. Companies that already have [Salesforce Foundations and free access to part of Agentforce](/blog/en/salesforce-foundations-o-que-cobre-de-verdade.html) know how fast the starting credit disappears, and the [variety of Agentforce pricing models](/blog/en/agentforce-pricing-seis-modelos.html) makes the spend of an agent nobody planned hard to predict.

The concrete risk of auto-enablement is not October's invoice. It's an enthusiastic administrator, or an implementation partner with access, building a test agent that stays active, consuming credit and reading data, without budget or security having been consulted. For the same reason, it's worth monitoring AI credit consumption in the first month, even if the expectation is zero.

## A good decision doesn't need to be fast, it needs to be conscious

Nothing here calls for panic, and nothing calls for ignoring it. In mid-sized companies, what works is treating Winter '27 as a deadline for a short, specific conversation between IT, security and the team that owns the process, leaving it with three answers: who builds, on which data, and who answers for the result. An hour of meeting and a permissions review avoid most of the problems the change could bring.

## Questions that keep coming back

The most common questions from people preparing for Agentforce auto-enablement.

## Will Agentforce be billed just because it was turned on automatically?

No. Salesforce states that auto-enablement carries no additional cost and doesn't change existing billing arrangements. Consumption starts when an agent is built, activated and performs work, such as resolving a case or qualifying a lead. So the point of attention isn't enablement itself, but who can activate an agent and whether anyone is tracking credit consumption.

## Can Agentforce be turned off after auto-enablement?

Yes. The Einstein setting, on its Setup page, still works as the master switch and disables the entire platform. It's usually more useful to keep the platform on and restrict the Manage AI Agents permission, which controls who can build agents, but the option to turn it off exists and can be the right choice while the company defines its policy.

## Do I need to do anything before the Winter '27 upgrade window?

Yes, and not much: confirm your org's date on Salesforce Trust, review who holds the Manage AI Agents permission, check field-level security on sensitive data and test the release in the preview sandbox. None of these steps requires a project, but all of them are cheaper before the window than after someone has already built the first agent.
