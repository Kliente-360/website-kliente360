---
title: "Salesforce Flow vs Apex: when code is worth more than clicks"
slug: "flow-vs-apex"
pillar: "sf"
date: "2026-03-04"
readMinutes: 6
excerpt: "Salesforce says to use Flow whenever possible. The rule is good — until it becomes dogma and the team configures a giant Flow where 30 lines of Apex would solve it in half the time."
tldr: "Flow won as the default automation tool in Salesforce, with reason. But \"low-code first\" became dogma that costs dearly in specific cases. Four patterns where Apex is still the right choice, three Flow-gigante traps nobody mentions in the pitch."
keywords: ["Salesforce", "Flow", "Apex", "automation", "low-code"]
---

Salesforce's official guidance since 2022 is simple: use Flow whenever possible, Apex only when there's no way. In theory, makes sense — Flow is declarative, easier to maintain, survives upgrades, any admin understands. But in 2026, at almost every mature Salesforce customer, I see the same pattern repeat: a 40-element giant Flow trying to solve a problem that 30 lines of well-written Apex would solve in half the time, with half the visual complexity, and with better governance.

The "Flow first" guideline became dogma. And dogma in Salesforce architecture costs dearly. This text is about when it works, and the four patterns where Apex is still the right choice in 2026.

## Why Flow won (and the gain is real)

The advantage Flow brought is structural. Four concrete things:

- **Maintenance without dev dependency.** A senior admin can read, change and debug Flow. Apex requires a consultant with a developer license or external hire.
- **Survives releases.** Flow is declarative; Salesforce migrates it automatically on upgrades. Apex needs revalidation on each major release, especially API version.
- **Automatic test coverage.** Flow doesn't require 75% manual coverage like Apex. In small projects, that saves weeks.
- **Visually auditable.** Looking at Flow and understanding what it does is faster than reading 200 lines of well-written Apex (and infinitely faster than reading bad Apex).

These four are real. In 60–70% of typical automation cases — update field when another changes, create related record, send email, validate data — Flow is the right choice. No debate.

The problem starts in the other 30–40%.

## Four patterns where Apex still wins

The contexts where insisting on Flow costs more than the pitch admits.

1. **Complex logic with many conditional paths.** When the process has 8–15 branches, each with 3–5 conditional actions, Flow becomes a giant visual tree. 40+ elements on a screen nobody understands. The same logic in Apex fits in 80–150 readable lines. Maintenance becomes easier in code than in a visual tree above a certain size.
2. **Mass operation with performance critical.** Flow is optimized for single records or few. When you need to process 10k+ records in batch, Apex with optimized SOQL is 10–50× faster — and fits within governor limits without hacks. Trying to do large batches in Flow is the #1 source of "Too many SOQL queries" in logs.
3. **Integration with external system via callout.** Flow has HTTP callout, but the interface is primitive for error handling, retry, complex parsing, non-trivial authentication. Apex with well-designed classes encapsulates this well. Trying serious integration via Flow generates non-code that's hard to test.
4. **Logic other systems will consume.** When the logic will be called by Sales Cloud, Service Cloud, Marketing Cloud and an external API — Apex with Invocable Methods is cleaner. Each caller invokes the same method, no duplication. In Flow, the logic ends up copied into 3 different flows that diverge over time.

These four patterns cover most of the cases where teams fall into the "let's do it in Flow because it's the guideline" trap.

## Three traps of Flow gigante

When Flow exceeds its natural scope, three problems show up. Worth cataloging.

**Invisible governor limits.** Flow counts SOQL, DML, CPU exactly like Apex. But the count isn't transparent — you don't know how many queries your Flow is running until the error hits production. Apex forces you to be explicit; Flow hides it until it breaks.

**Performance that degrades silently.** Flow is interpreted, not compiled. In a loop with 1,000 iterations, each element adds overhead that in Apex would be zero. An operation that ran in 2s now takes 12s, and nobody knows why. Diagnosing requires Flow Debug, which doesn't give comparable metrics.

**Maintenance that becomes a maze.** A 5-element visual Flow is better than 50 lines of Apex. A 40-element visual Flow is worse than 200 lines of Apex. The tipping point sits between 15 and 20 elements. When Flow grows past that, maintaining becomes a nightmare — and the temptation to copy a whole Flow for a small variation accelerates the chaos.

> Flow is excellent at small and medium scale. At large scale, Apex is more readable, more performant and more auditable. The "Flow first" guideline shouldn't be "Flow always".

## How to decide, case by case

The rule we apply before implementing automation:

1. **How many elements will the Flow have?** Quick estimate. If above 20, consider Apex. Above 35, almost always Apex.
2. **How many records will it process per execution?** Up to ~200, Flow ok. More than that, evaluate serious bulkification — frequently Apex.
3. **Does it need integration with an external system?** Simple callout, Flow. Callout with retry, complex OAuth, heavy parsing, Apex.
4. **Expected change velocity?** If it's a rule changing weekly, Flow (admin edits). If it's a stable long-term rule, well-written Apex wins in readability.
5. **Who will maintain it in 12 months?** Admin = Flow. Dev = Apex. If the company has both, choose by technical criteria, not by role.

Whoever answers the five without hesitating knows how to choose. Whoever follows a single rule (always Flow / always Apex) is optimizing for ideology, not outcome.

## The "let's refactor later" trap

The phrase that looks pragmatic: "we'll start with simple Flow, and if it gets big we'll migrate to Apex". Migrating a production Flow to Apex is a serious project — rewriting logic, updating every invocation point, testing parity, freezing changes during transition. Typically 4–8 weeks for a medium-complexity Flow.

The cheaper version: choose at initial architecture, based on the 5 criteria above. Refactoring Flow to Apex later is expensive; choosing Apex from the start only costs development work, no migration liability.

[As I argued in the Sales Cloud antipatterns](/blog/en/sales-cloud-cinco-antipadroes.html), the temptation to do "the basics" and adjust later is a recurring source of rework. Same applies in Flow vs Apex.

## The decision for 2026

A mature Salesforce architect chooses by need, not by guideline. Flow earned its place — in 60–70% of cases it's the right choice. But treating "Flow first" as dogma is the slowest way to discover those other 30–40% were calling for Apex from the start.

The right question isn't "Flow or Apex". It's: *what's the logic, what's the volume, what's the change cycle, who maintains*. Answered, the choice appears. Without answering, the choice becomes religion — and religion in Salesforce becomes an eternal project.

[As in any serious rollout](/blog/en/mapear-processos-antes-do-salesforce.html), discovery is worth more than the technical choice. A team that does discovery right rarely errs on Flow vs Apex. A team that jumps to implementation discovers the mistake in the third month of production.

## Questions that keep coming back

Before wrapping up, the questions that come up most often when this topic hits the table.

## When should I use Apex instead of Flow?

In four patterns: complex logic with many conditional paths (from 8–15 branches on, the Flow becomes a 40+ element tree nobody understands, while the same logic fits in 80–150 readable lines of Apex); mass operations with critical performance; external integrations that demand retry, complex OAuth, or heavy parsing; and logic that multiple systems will consume — Apex with Invocable Methods avoids the duplication of three Flows drifting apart over time.

Outside those patterns, Flow remains the right choice for 60–70% of typical automation. The quick rule: if the estimate passes 20 elements, consider Apex; past 35, it's almost always Apex.

## Can Flow handle processing thousands of records?

Not well. Flow is optimized for single or few records — up to around 200 per execution works; beyond that, it's time to evaluate serious bulkification. On batches of 10K+ records, Apex with optimized SOQL is 10–50× faster and fits within governor limits without hacks. Large batches in Flow are the number one source of "Too many SOQL queries" in production.

There's an aggravating factor: Flow counts SOQL, DML, and CPU exactly like Apex, but without transparency — you don't know how many queries your Flow is running until the error hits production. Apex forces you to be explicit; Flow hides it until it breaks.

## Can I start with Flow and migrate to Apex later if it grows?

You can, but it's expensive — and "if it gets big we'll migrate" tends to be the expensive part of the project. Migrating a production Flow to Apex means rewriting the logic, updating every invocation point, testing parity, and freezing changes during the transition: typically 4–8 weeks for a Flow of average complexity.

The cheaper path is deciding in the initial architecture, based on five criteria: how many elements, how many records per execution, whether there's external integration, how fast the rule changes, and who maintains it in 12 months. Choosing Apex from the start costs only the development — without the migration liability.
