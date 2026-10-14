---
title: "Salesforce technical debt: overlapping automation is the bill"
slug: "divida-tecnica-salesforce-automacao"
pillar: "sf"
date: "2026-10-14"
readMinutes: 7
excerpt: "Salesforce technical debt lives less in Apex and more in overlapping automation. How to find it, prioritize it and pay it down without stopping operations."
tldr: "Technical debt in Salesforce is the accumulation of configuration, automation and code that works today but makes every future change more expensive. In practice it concentrates in overlapping automation — Workflow Rules, Process Builder, Flows and Apex firing on the same object in no defined order — rather than in badly written code. Salesforce Ben's 2026 survey ranks technical debt as the hardest task for 56.3% of admins, and the end of support for Workflow Rules and Process Builder on 12/31/2025 removed the deadline and left only the risk. Paying it down is inventory, risk-based prioritization and wave-by-wave migration, not a rewrite project."
keywords: ["Salesforce technical debt", "Workflow Rules Process Builder end of support", "migrate to Flow", "Salesforce org cleanup", "Salesforce automation", "Salesforce Flow"]
---

**Technical debt in Salesforce** rarely shows up as a code problem. It shows up as a sentence repeated in the steering committee: "touching that is risky." A new required field breaks an integration nobody remembered. A change of opportunity stage fires three automations, two of them from 2019. The admin who knew how everything worked left, and the org is now run by trial and error.

The 2026 [SF Ben survey of more than 1,100 admins](https://www.salesforceben.com/top-10-insights-from-sf-bens-mega-2026-salesforce-admin-survey/) shows this is not an exception: 56.3% name technical debt as the hardest part of the job, about 31% rate their own debt as high or very high, and only 2% describe their org as clean and well maintained. What the survey does not say, and our project experience does, is where that debt usually sits.

## Where the real debt builds up

The popular picture of technical debt is badly written Apex. It exists, but it is the smaller part. In the orgs we review, most of the cost comes from **overlapping automation**: several layers of logic reacting to the same event on the same object, with nobody responsible for the order they run in.

The anatomy is familiar. A Workflow Rule created in 2016 updates a field. A 2019 Process Builder reads that field and creates a task. A 2023 Flow does a similar check because whoever built it did not know about the process. An Apex trigger from a previous partner recalculates the field after everything else. Each piece makes sense on its own. Together they produce behavior you can only predict by running it, and every change becomes a bet.

Three signs your org is already there:

1. **Nobody can say what happens when an opportunity is saved.** If the answer takes five Setup screens, execution order is tribal knowledge.
2. **Intermittent limit errors** (CPU, too many queries, update loops) that vanish when you try to reproduce them. They are the effect of several automations adding cost to the same transaction.
3. **Small changes take weeks.** The time goes into manual regression testing, because nobody trusts their prediction of the impact.

> Technical debt is the cost of every future change. Ugly code nobody touches costs nothing; overlapping automation on a core object costs you every week.

## What changed: the deadline became a risk

Salesforce announced end of support for **Workflow Rules and Process Builder on December 31, 2025**. Nothing was switched off: existing automations keep running. What ended was bug fixing and support cases on those tools. The platform's declarative automation development is concentrated on Flow.

For teams that postponed migration waiting for the deadline, the practical effect is uncomfortable: the deadline passed, nothing broke, and the debt is still there, now without a safety net. It is the kind of risk that triggers no alarm. It shows up the day unexpected behavior lands in an unsupported tool, on a critical object.

Winter '27 also touched the same ground. According to community coverage, the release brings Flow management improvements, such as an unused-resources filter in Flow Manager, and arrives with [Agentforce on by default](/blog/en/agentforce-ligado-por-padrao-winter-27.html). That second point matters for debt: an agent that reads and acts on an org with overlapping automation inherits all of its unpredictability. Cleaning first is cheaper than debugging later.

## How to pay it down without stopping operations

Full rewrite projects tend to fail: they take long, freeze the roadmap and deliver a new org with the same habits two years later. What works is short waves with a risk criterion. The sequence we use fits in six steps:

1. **Inventory everything that fires per object.** For each core object (Lead, Account, Opportunity, Case), list active Workflow Rules, Process Builders, Flows, triggers and validations. In Setup, sorting the Workflow Rules and Process Builder lists by the active column already shows the size of the problem.
2. **Mark what is active but dead.** Automations that have not executed in months, inactive Flows and piled-up old versions. Deactivating is reversible; deleting comes after an observation period.
3. **Prioritize by risk, not age.** The criterion is how much an error costs on this object and how many layers overlap on it. An Opportunity with four layers goes before a low-use object with one old rule.
4. **Migrate per object, consolidating.** The goal is not to translate rule by rule, but to reach one clear flow per object and moment (before save, after save). The Migrate to Flow tool helps in simple cases, but on complex automations it tends to produce partial flows that need manual adjustment and careful testing.
5. **Test in a sandbox with production-like data.** Here the discipline of a [sandbox strategy](/blog/en/sandbox-strategy.html) decides whether the migration is safe or a bet with a date on it.
6. **Document the execution order and name an owner.** Without the last step, the debt grows back in 12 to 18 months, and that window is our own estimate from the projects we follow.

## Flow or Apex: the choice that prevents the next debt

Migrating to Flow does not solve debt if the Flow is built like the old tools: one per requirement, no owner, no convention. Orgs with hundreds of inactive Flows named "Test_2" are the same debt in a new format. The rule from [when code is worth more than clicks](/blog/en/flow-vs-apex.html) still holds: logic with many branches, high volume or a need for automated tests belongs in Apex, and what is simple and visible to the business belongs in Flow.

Before choosing the tool, go back to the origin of the problem. A lot of overlapping automation is born from a badly defined process, and [mapping the process before configuring](/blog/en/mapear-processos-antes-do-salesforce.html) avoids building three solutions to the same question. Two cheap conventions already cut much of the future debt: name Flows by object, moment and purpose, and require a filled-in description before activation.

## What it costs and when it pays off

The board's question is always how much. There is no universal number, but the reasoning is simple: debt is paid in hours of change. If a routine change to Opportunity takes two weeks because of manual regression and should take three days, that difference multiplied by the number of changes in the year is the cost of the debt, and that is the number to compare with the cost of cleanup. In mid-size projects, a cleanup focused on two or three critical objects usually fits in a few weeks, our own estimate, not months.

It is worth paying before any large initiative on the org: a new module, an ERP integration, an AI agent. Building on top of debt is the most expensive path of all.

## Questions that keep coming back

The most frequent doubts from people deciding what to do with Workflow Rules, Process Builder and the automation piled up in their org.

## Did Workflow Rules and Process Builder stop working?

No. According to what Salesforce communicated, existing automations keep executing after December 31, 2025. What ended was support: bugs are not fixed and support cases on those tools are not handled. The risk is running a critical automation without vendor backing, not an immediate outage.

## Is it worth migrating everything to Flow at once?

Rarely. Migrating everything at once freezes the roadmap and concentrates risk in a single cutover. The safer path is to prioritize by object and risk, consolidate the logic instead of translating it rule by rule, and migrate in waves, testing each one in a sandbox. Low-use automation without overlap can wait without harm.

## How do you measure whether technical debt went down?

Measure the cost of change, not the component count. Three indicators are enough: average time between requesting and releasing a routine change, number of limit errors per month on critical objects, and percentage of automations with an owner and a description. If the first two fall and the third rises, debt is going down, even if the total number of Flows does not change.
