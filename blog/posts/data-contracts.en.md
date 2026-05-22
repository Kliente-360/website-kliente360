---
title: "Data contracts: the least painful way to not break production"
slug: "data-contracts"
pillar: "data"
date: "2026-02-25"
readMinutes: 6
excerpt: "Pipeline breaks Wednesday at 5pm because a backend engineer renamed a field on Monday. Data contracts exist to close this loop — and almost no one implements them."
tldr: "Data contracts are versioned agreements between data producers and consumers. They went from fad to concrete tool in 2025. Applied where it hurts (3–5 critical entities), they prevent 80% of pipeline incidents. Applied to everything, they become bureaucracy. How to adopt with the right scope."
keywords: ["data contracts", "data engineering", "data quality", "schema evolution", "production"]
---

The story that repeats at every company operating data: pipeline working for months, executive dashboard trustworthy, product team deciding on top of the number. On a Monday, a backend engineer renames a field in Postgres because "nobody uses that name right anyway". On Wednesday at 5pm, the dashboard breaks. Leadership calls, data team runs, blame lands on whoever has no tool to defend themselves — usually the data team, which found out about the change only when the pipeline broke.

Data contracts exist to close this loop. They're versioned agreements between data producers (source systems) and consumers (warehouse, dashboard, agent, ML). They left the 2022 blog-post world and became a concrete tool in 2025. This text is about what changed, when to adopt them, and how not to turn them into yet another bureaucratic overhead.

## The problem data contract solves

In traditional architecture, data flows from source system (CRM, app, ERP) to the warehouse without any formal agreement on structure. Backend engineer assumes they can change schema freely — "it's just the app's database". Data team finds out when something breaks. The relationship stays chronically reactive.

Data contract inverts that dynamic. The data team (consumer) explicitly declares *which fields it depends on, with what type, with what semantics*. The backend team (producer) commits to versioning changes, giving advance notice, and breaking the contract is a conscious decision — not an accident.

In practice, the contract lives as code: YAML/JSON file in a shared repo, checked in CI, with semantic versioning. A breaking change requires major version + deprecation period. An additive change is trivial. Whoever tries to change without bumping the version has their PR blocked.

> Data contract isn't new tech. It's the old discipline of API contract applied to data — where it always should have been, and never was due to organizational inertia.

## What changed from 2022 to 2026

In 2022, data contracts were a conference-talk concept. Implementing meant building everything from scratch. In 2026, three things changed:

- **Tools matured.** Schema registry (Confluent, AWS Glue), contract validators (Great Expectations, dbt source freshness), event streaming with schema evolution (Avro, Protobuf). The stack is available.
- **dbt source contracts.** dbt 1.5+ has `contract: true` natively — defines model schema, validates in CI. [dbt becomes the natural implementation point](/blog/en/dbt-na-pratica.html), connecting contract with modeling.
- **"Data producer" culture.** Backend engineers started accepting responsibility for downstream data, especially in large companies where the data team rose in hierarchy.

That trio is what shifts the conversation from "should we implement data contracts?" to "at what scope?". The tooling isn't the blocker anymore. The organization is.

## Where data contracts really pay off

The temptation to apply contracts to *everything* is the mistake that kills the project. Everything is heavy overhead, and nobody maintains it. The rule that works: apply to 3–5 critical entities, not to the 200 warehouse models.

Criteria to pick the entities:

1. **Breakage causes the wrong executive dashboard.** Central entities like `customer`, `order`, `subscription`. When they change silently, the number leadership sees comes out wrong. Contract here is insurance against catastrophe.
2. **Multiple downstream consumers.** Entity feeding 5+ dashboards, 2+ ML models, 1+ external integration. Cost of breakage scales with number of consumers.
3. **Crossing between teams with low communication.** When producer and consumer live in different teams that don't talk much, the contract substitutes for the conversation. When they live in the same squad, the contract can be overhead.

Applying outside these three criteria is over-engineering. Applying inside them and ignoring is generating recurring incidents nobody understands.

## Four elements of a useful contract

Not a tool checklist — the minimum content of the agreement. Without these four, "contract" is just a nice name.

**Explicit schema.** Field list, types, nullability, accepted values when enum. Same as a REST API contract. Without it, "contract" is free text nobody enforces.

**Documented semantics.** Knowing that `status` is a string isn't enough. You need to know which values exist (active, paused, cancelled), what each value means, when it changes. Without semantics, schema is empty.

**Freshness and availability SLO.** "Data refreshed within 1h", "uptime 99.5%". Operational commitment from the producer. Without it, the contract covers structure but not reliability.

**Versioned change policy.** How breaking changes get communicated, what deprecation period, who approves. Without it, the contract freezes instead of evolving.

Those four fit in a 30–80 line file. It's not a six-month project — it's two weeks of discipline to write, then ongoing routine to maintain.

## How to start without turning bureaucratic

Whoever implements data contracts correctly follows a specific sequence:

**Week 1–2: pick 3 critical entities.** Not 10. Not 30. Three. The ones that break most, or that would hurt most to break. Discussion clears in one meeting between product, data and backend.

**Week 3–4: write the contracts.** As code, in a shared repo. Schema, semantics, SLO, change policy. Cross-review between producer and consumer. Outcome is a contract approved in writing.

**Week 5–8: CI blocking breaking changes.** PR that changes the schema of a contracted entity fails CI if the version wasn't bumped. Producer team learns the new workflow fast.

**Week 9–12: freshness and violations dashboard.** Visibility for both teams. Producer sees when their system fell behind; consumer sees what's at risk.

From there, expanding to more entities is incremental — one at a time, as pain shows up. Whoever tries to do 50 entities at once fails; whoever does 3 well and grows from pain reaches useful coverage in 6 months.

## The argument against (and why it's usually wrong)

The predictable objection: "it'll lock up the backend team". Worth addressing.

It doesn't lock additive change — new column, new enum, new field. Those are trivial. It locks breaking change — rename, remove, type change. And it locks on purpose, because those are exactly the changes that need advance notice.

Whoever complains about contracts without having felt the impact of a break usually has never been the team called at 6pm to explain the wrong dashboard. The discomfort of changing with versioning is smaller than the discomfort of explaining an incident to the CFO.

[As I argued about clean data](/blog/en/dado-limpo-e-um-mito.html), the right rule isn't "absolute perfection". It's "good enough for the use case". A data contract applied to the 3 cases where it hurts pays back a six-month ROI on the first prevented incident.

## The decision for 2026

If your company has a data team that fights fires often, and the root cause shows up in "change to source schema", data contracts are the path. Not as a 12-month project; as incremental adoption over 3 critical entities, with tooling [dbt already offers natively](/blog/en/dbt-na-pratica.html).

If your company doesn't have a mature data team yet, contract is premature. Other disciplines need to come first — basic observability, clear model ownership, quality eval set. Implementing contract on top of chaos just formalizes the chaos.

Contracts don't create a quality culture — they only crystallize the one that already exists or has started to. That's the real test before adopting.
