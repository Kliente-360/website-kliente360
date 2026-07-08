---
title: "Sandbox strategy: how to avoid \"the last sandbox refresh was 4 months ago\""
slug: "sandbox-strategy"
pillar: "sf"
date: "2026-03-25"
readMinutes: 6
excerpt: "Salesforce sandboxes are free — in license. Expensive in discipline. A company that doesn't treat sandbox as product ships bugs to production and finds out nobody refreshed the environment in months."
tldr: "Salesforce sandbox isn't just a test environment — it's the OS of any serious rollout. Without a clear strategy (how many sandboxes, for what, who keeps them current), the team will be testing in production without knowing. Four sandbox types, three operating rules, and the sign the strategy is broken."
keywords: ["Salesforce", "sandbox", "DevOps", "test environment", "Salesforce DX"]
---

The question every Salesforce team avoids answering honestly: *when was the last time the sandbox was refreshed from production?* Typical answer: "4 months, maybe 6". Practical translation: nobody is testing in an environment that reflects reality. Bugs reach production, are found by users, the team firefights. Leadership asks what happened and the technical answer is "it passed QA in the sandbox". Incomplete truth — it passed in the sandbox that was 6 months behind production.

This text is about sandbox strategy in Salesforce. Not a tutorial of types — an architectural decision that separates companies delivering with predictability from companies living in firefighting mode.

## The four types and where each one fits

Salesforce offers four sandbox types, with differences a lot of people forget under deadline pressure.

**Developer Sandbox.** Metadata only (no data), 200MB. Ideal for an individual dev doing isolated work. Frequent refresh (weekly). Cost: zero, bundled with licenses.

**Developer Pro Sandbox.** Metadata + 1GB of data. Good for functional unit testing with minimal data. Same use profile as Developer, with more space.

**Partial Copy Sandbox.** Metadata + a data sample (configurable subset). Refresh every 5 days. Ideal for UAT (user acceptance test) with representative data. Where most mid-sized projects should live — balance between realism and maintenance cost.

**Full Sandbox.** Full production copy (metadata + integral data). Refresh every 29 days. The only environment that faithfully reflects production. Expensive in license, but indispensable for load testing, full regression, training requiring a real scenario.

Every serious project uses at least three of these. Whoever uses only Developer Sandbox saves on license and finds bugs in production.

## A strategy that works in mid-market

The configuration I see working at most mid-market Salesforce customers:

**A stack of Developer Sandboxes per developer.** One per dev, refreshed on demand. The dev makes their isolated changes, doesn't block anyone.

**One Partial Copy for continuous integration.** Receives merges from every Developer Sandbox via Git/Salesforce DX. Where feature interactions get tested. Refresh every 5 days with a realistic sample.

**One Full Sandbox for UAT/staging.** Mirrors production. Where the customer tests before approving the deploy. Refresh every 29 days.

**Production.** Where the user works.

That pipeline covers 95% of needs. A company that mixes everything in a single shared sandbox has devs stepping on each other's changes, UAT with stale data, and bugs in production as routine.

> A Salesforce sandbox isn't an operational detail. It's the OS of the rollout. A company without a clear strategy is operating in the dark — and finds out when the user reports the bug in production.

## Three rules that separate a healthy pipeline from theater

Having the right types isn't enough. Three operational disciplines.

1. **Planned, respected refresh cadence.** Partial Copy refresh Thursday morning, every other week. Full Sandbox refresh first Sunday of the month. Calendared, announced, with a defined maintenance window. Without cadence, refresh happens when someone remembers — usually too late.
2. **Named owners per sandbox.** Each sandbox has a human responsible. When it degrades (data ages, metadata diverges, integration breaks), there's a name to call. "Whole team responsible" = no one responsible.
3. **Usage policy per sandbox.** Who can change what. Developer Sandbox = dev free. Partial Copy = only CI/CD or approved change. Full Sandbox = UAT only, no raw dev. Without this policy, anyone overwrites the other's work and reliability drops to zero.

These three combined separate predictably-delivering pipelines from emergency-mode ones.

## Symptoms of a broken strategy

Before full catastrophe, three signs the strategy is dying:

**Sign 1: devs ask for production access "to test something quickly".** When that becomes recurring, the sandbox isn't useful anymore. The dev knows it doesn't reflect reality, so skips it. Investigating this is pipeline diagnosis.

**Sign 2: Full Sandbox refresh is traumatic.** Becomes a week-long project, with prep, plan, escalation. A sign it's being done rarely, and everything accumulated. Healthy refresh is a 4–6 hour event, automated, nobody loses sleep.

**Sign 3: the team doesn't know where to test a specific change.** "Do it in sandbox X". "No, do it in Y". "Wait, is Z the current one?". Confusion about which sandbox to use = lack of clear strategy. Resolves by documenting, not improvising.

## How to integrate sandbox with change governance

Sandbox is just one piece. The rest of the governance matters equally:

**Git as source of truth.** Metadata lives in Git, not in the sandboxes. Sandboxes reflect Git state. [As in any serious Salesforce project](/blog/en/sales-cloud-cinco-antipadroes.html), versioning is foundation.

**CI/CD with deploys between sandboxes.** Push to a branch deploys to Partial Copy. Merge to main deploys to Full Sandbox. Final manual approval to production. Automated pipeline avoids the "by-hand maneuver".

**Scratch Orgs for isolated exploration.** When the dev needs to explore a radical change without affecting anyone, Scratch Org (part of Salesforce DX) is cheaper than dedicated sandbox. Short lifespan, created in minutes.

**Clear Flow vs Apex policy.** Applied in sandbox before becoming production rule. [The Flow vs Apex choice](/blog/en/flow-vs-apex.html) is tested first in a realistic environment.

## The decision for 2026

If your Salesforce organization has symptoms of a broken strategy — recurring production bugs, late refresh, team unsure where to test — three practical moves:

**Define the sandbox stack formally.** How many, what type, with what owner, what refresh cadence. 2-page document, approved by the IT sponsor + Salesforce architect.

**Implement Salesforce DX if you don't yet.** Git as source of truth, CI/CD between sandboxes, Scratch Orgs for exploration. Modern standard that eliminates 70% of operational chaos.

**Semi-annual audit.** Every 6 months, the team looks at: active sandboxes, named owner, last refresh, real usage. Retires obsolete ones (each costs license), reorganizes active ones. Without this routine, it becomes a cemetery.

A sandbox in Salesforce is the environment where you're allowed to err. A company that operates well in sandbox delivers with predictability. A company that operates poorly — or skips sandbox in haste — finds the error in the first place where it isn't allowed: production. The difference between the two worlds is strategy, not technical talent.

## Questions that keep coming back

Before wrapping up, the three questions that come up most whenever sandboxes hit the table.

## How many sandboxes does my company actually need?

For a mid-market company, the stack that works has three layers before production: one Developer Sandbox per developer (refreshed on demand, so each dev works in isolation without blocking anyone), one Partial Copy for continuous integration that receives everyone's merges via Git/Salesforce DX, and one Full Sandbox for UAT/staging that mirrors production, where the customer tests before approving the deploy. That pipeline covers 95% of needs.

The common mistake is saving money by cramming everything into a single shared sandbox: devs step on each other's changes, UAT runs on stale data, and bugs in production become routine. Using only Developer Sandboxes saves on license — and finds the bugs in the one place where you're not allowed to err.

## Is a Full Sandbox worth the cost?

Yes, if the project is serious — it's the only environment that faithfully reflects production, with a complete copy of metadata and data. For load testing, full regression, and training that needs a real scenario, there's no substitute: Partial Copy works with a data sample, not the real volume.

The license cost is real, but the cost of not having one is bigger: approving deploys against an environment months behind production is the recipe for "it passed QA in the sandbox" — the incomplete truth leadership hears after the fire. The practical constraint is the 29-day refresh cycle, so it needs disciplined cadence to stay useful.

## How often should sandboxes be refreshed?

On a planned, calendared cadence — not when someone remembers. The reference: Developer Sandboxes weekly, Partial Copy every 5 days (say, Thursday morning, every other week), Full Sandbox on its 29-day cycle — first Sunday of the month, with an announced maintenance window. Without cadence, refresh happens too late and the team is back to "4 months, maybe 6".

A useful thermometer: a healthy Full Sandbox refresh is a 4–6 hour event, automated, nobody loses sleep. When it turns into a week-long project with prep, plan, and escalation, it's a sign it's being done rarely and everything has piled up.
