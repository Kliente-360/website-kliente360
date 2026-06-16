---
title: "Multi-cloud: myth or strategy — an honest framework for the decision"
slug: "multi-cloud-mito-ou-estrategia"
pillar: "data"
date: "2026-06-16"
readMinutes: 7
excerpt: "Multi-cloud is almost always accidental architecture, not intentional strategy. Five criteria to tell real strategy apart from vendor slide decks."
tldr: "Real multi-cloud — distributing workloads across two providers intentionally — is rare and expensive. Most companies that claim to be multi-cloud are describing an acquisition legacy or lack of governance, not strategy. Before committing, calculate the cost of running two environments; it almost always exceeds the lock-in cost you were trying to avoid."
keywords: ["multi-cloud", "cloud strategy", "lock-in", "data architecture", "AWS GCP Azure"]
---

**Multi-cloud** is the favorite argument of cloud vendors — curiously, all of them simultaneously. AWS, Azure, and GCP each have detailed documentation on how to run multi-cloud architecture with themselves as the primary provider. The logic sounds solid: avoid depending on a single vendor, keep exit options open, negotiate better contracts. The problem is that the premise rarely survives contact with real operations.

Most companies that declare themselves multi-cloud are describing an accident, not an architecture. Salesforce runs on AWS, Google Analytics lives on GCP, Active Directory is in Azure AD. That's SaaS on different clouds — not infrastructure multi-cloud.

## What multi-cloud actually is — and what it isn't

Technical multi-cloud means distributing infrastructure workloads across two or more providers intentionally, with a defined criterion for each allocation. Workload A runs on AWS because the team has proven expertise and production data already lives there. Workload B runs on GCP because ML volume justifies TPUs. Both communicate with defined latency and security, monitored by unified tooling.

That requires:

1. **Two complete sets of operational skills** — different certifications, different security models, separate billing and pricing structures.
2. **Cross-cloud orchestration tooling** — multi-provider Terraform, unified observability (Datadog, Grafana Cloud), cross-cloud IAM and identity management.
3. **Egress cost accounting** — traffic crossing cloud boundaries costs real money. Workloads communicating between AWS and GCP add 20–100ms of latency and real per-GB egress fees.

What appears far more often in practice isn't this. It's a company with ERP on Azure (legacy Microsoft licensing), a Snowflake warehouse running on AWS, and a GCP ML project that started as a PoC and never migrated. Three providers by accident, not by design.

## Why the lock-in argument doesn't close the way it seems

The core pitch for multi-cloud is: "use two providers so you're not locked into either one." The problem is that the lock-in multi-cloud resolves — compute and networking — isn't the lock-in that actually hurts.

The lock-in that hurts is data and proprietary services. Moving 1 PB from S3 to another storage costs egress fees in the range of US$ 20,000–90,000 depending on region. Moving Kubernetes workloads from one cloud to another is a weeks-long operation — expensive but feasible. [The deepest lock-in lives in proprietary services — Redshift, BigQuery, Synapse — that accumulate SQL dialect dependencies and specific integrations](/blog/en/databricks-snowflake-bigquery-lock-in.html). That's the lock-in multi-cloud doesn't resolve, because resolving it would mean giving up exactly what differentiates each provider.

The irony: to get the most out of each cloud, you use its proprietary services. The more you use them, the more you're locked in. Multi-cloud as a lock-in avoidance strategy forces you to use only the common denominators between providers — which are, by definition, the weakest differentiators of each.

> Multi-cloud as a lock-in avoidance strategy is a contradiction: it only works if you don't use what makes each provider worth using.

## Five situations where multi-cloud actually makes sense

There are scenarios where multi-cloud is the right answer. Five, and all have specific technical or regulatory criteria — not vendor bias.

1. **Data sovereignty and regulation.** Customer data subject to contractual territory restrictions, or European data under GDPR with EU data residency requirements. If the primary provider doesn't have an adequate local region, a second provider may be a legal obligation, not an architectural choice.

2. **Best of breed with genuine operational capacity.** GPU compute on GCP (TPUs are genuinely cheaper for certain ML workloads) + AWS for established enterprise workloads. This only makes sense when the team has real operational expertise in both providers — not as a PoC legacy running in production by inertia.

3. **Disaster recovery with contractual SLA.** Primary on AWS São Paulo, failover on Azure East US. Cost justified when the availability SLA required by contract isn't achievable with a single region from a single provider — a scenario that exists in financial and healthcare sectors.

4. **Acquisition inheritance.** You acquired a company running on GCP; you run on AWS. Multi-cloud by inheritance, not design. The real decision is to consolidate or coexist — not to pretend the situation is strategic. If the decision is to coexist, operationalize it rigorously instead of letting it grow into parallel silos without governance.

5. **Contract negotiation with a real pilot.** Having a second provider in active use — even at smaller scale — changes your negotiating position with the primary provider. This works when the pilot is genuinely operational, not a demonstration exercise.

Outside these five, the correct answer is almost always single cloud, well operated and well governed.

## The overhead the slide doesn't show

Estimates from teams that operated real multi-cloud for two or more years point to 30–40% operational overhead compared to an equivalent well-configured single-cloud setup. Measurable cost in engineering hours, cross-environment support tickets, IAM boundary incidents, and onboarding of new engineers who need to learn two operational worlds.

[Warehouse selection in practice almost always depends on organizational context, not isolated technical benchmarks](/blog/en/snowflake-bigquery-databricks.html). The same principle applies to cloud selection: the best provider is the one the team can operate well — not the one with the largest feature set on the comparison slide.

Multi-cloud adds permanent structural complexity. Before deciding, the relevant number is the projected overhead for five years of operation — not the setup cost for month one.

## The question that simplifies the decision

One question resolves 80% of cases: **why isn't it single cloud?**

If the answer is "because our primary provider doesn't have X we need" — that's the only technical reason that closes on its own. Verify whether X actually exists or whether it's a matter of usage maturity before assuming a second provider resolves it.

If the answer is "to avoid lock-in" — calculate the cost of hypothetical lock-in (egress + eventual migration) versus the overhead of multi-cloud over the next five years. In 80% of cases, the real overhead exceeds the estimated lock-in cost.

If the answer is "because the board asked" or "because the competitor does it" — there's a strategic communication problem, not an architecture problem.

Anyone defining [data architecture in 2026](/blog/en/modern-data-stack-2026.html) faces pressure to adopt what sounds modern. Multi-cloud sounds modern — and that is, frequently, the only real reason behind the decision.

Multi-cloud isn't wrong. It's expensive — and the cost is only justified when the specific gain (regulation, proven technical capability, DR with contractual SLA, or real contract leverage) exceeds the permanent overhead of operating two providers with quality. The right question isn't "should we be multi-cloud?" but "what specific problem are we solving that single cloud, well operated, doesn't solve?"
