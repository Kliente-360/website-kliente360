---
title: "Salesforce ↔ ERP integration: projects stall on the contract, not the architecture"
slug: "integracao-salesforce-erp"
pillar: "sf"
date: "2026-03-17"
readMinutes: 6
excerpt: "Almost every late Salesforce-ERP integration is late because of who owns the data — not the tech. The failure is organizational, dressed as architecture."
tldr: "Salesforce ↔ ERP integration rarely stalls on engineering. It stalls in the gray zone of ownership: who owns the customer, the order, inventory, calculation rules. Without that defined up front, any architecture (MuleSoft, middleware, native) delivers the same delay. Five questions that unblock."
keywords: ["Salesforce", "ERP", "integration", "MuleSoft", "middleware"]
---

The status meeting of every late Salesforce-ERP integration has the same shape: tech team shows architecture, leadership asks "why is it late", team shows field map and it looks complex. The implicit explanation is "it's hard technically". In 90% of cases, that's a polite lie. The real delay comes from somewhere else — and until that place is named, the integration won't ship, whatever tool was picked.

This text is about why Salesforce-ERP integration projects stall, and the honest rule to unblock — which has more to do with organizational governance than with technical architecture.

## The real reason for delay

In almost every dragging Salesforce-ERP integration, the problem lies in a small set of specific gray zones:

- **Who owns the customer record?** Salesforce says the customer is born in sales; the ERP says they're born in invoicing. Who controls address, email, tax status? Without an answer, synchronization becomes dispute.
- **Who decides the final price?** Sales Cloud has the pricebook; ERP has a price catalog; CPQ has its own rules. When the three disagree, which wins?
- **Who owns the order?** Sales closes the opportunity; ERP issues the invoice. How long does the order stay in Salesforce? And then?
- **How to handle conflicting data?** Joao Silva in Salesforce, JOAO SILVA in ERP, João Silva somewhere else. Who's the source of truth?
- **Who responds when the integration breaks?** Salesforce team or ERP team or integration team? Without a named owner, it becomes ping-pong.

These five questions, in almost every project, get parked in a "we'll align later" — and the "later" becomes the boundary that delays the rest. Engineers can build a perfect API, middleware can run with no errors, mapping can be 100% correct. If these questions weren't answered first, the project stalls on a pending decision — not on code.

> The technical architecture of Salesforce-ERP integration is the fifth problem. The first four are who decides what — and that doesn't get resolved in Sprint Planning.

## Why this becomes a repeated trap

Three reasons the problem persists at almost every customer.

**Tech team has no organizational mandate.** Salesforce engineer and ERP engineer rarely have authority to decide data governance across areas. They try, fail, become mediators. Without a sponsor with cross-functional authority, the decision doesn't happen.

**The "who owns" question is political.** Customer record is power. Sales wants to own it; finance wants to own it; CX wants to own it. The technical discussion hides the political one. Team will pretend it's "master definition" while it's really power negotiation.

**Insufficient discovery becomes fact accomplished.** [As in any serious Salesforce rollout](/blog/en/mapear-processos-antes-do-salesforce.html), skipping discovery is the #1 source of trouble. In integration, this manifests as "we started building and discovered the pending decisions at test time".

## Five questions to answer before anything

The rule we apply at every Salesforce-ERP integration kickoff, which unblocks 80% of cases.

1. **Who's the system of record for customer?** Not "both" — one. The other becomes a mirror. Executive decision, with authority across all areas.
2. **Who's the system of record for order?** Same rule. Sales in Salesforce up to X; then ERP. X needs to be defined with clear criteria (status, approval, event).
3. **Who decides final price, and what's the override rule?** Salesforce pricebook, ERP table, [CPQ delivering real proposals not just quotes](/blog/en/cpq-saas-b2b.html), manual exception. Explicit hierarchy, no ambiguity.
4. **What's the acceptable sync frequency per entity?** Customer in real time? Order every 15 min? Inventory hourly? Criterion: what the business case requires, not what the tool can do.
5. **Who's the operational owner of the integration in production?** When it breaks, who investigates first? Name in the flow, not "the integration team". Without that, MTTR explodes on the first incident.

Whoever answers the five before the sprint starts delivers on time. Whoever answers during construction is delayed 2–4 months. Whoever answers after go-live enters the eternal living project.

## On architecture — only after the five questions

Once the five are answered, the technical architecture discussion gets trivial. Three patterns cover 90% of cases:

**Native integration (MuleSoft Anypoint, Salesforce Connect, Data Cloud).** Worth it when the company is invested in the Salesforce ecosystem. Higher license cost, lower implementation. [Data Cloud in 2026 absorbs part of what MuleSoft used to do](/blog/en/data-cloud-nervo-central.html), simplifying the architecture.

**Generic middleware (Boomi, Workato, Tray).** Worth it when integration needs to serve multiple systems beyond the Salesforce-ERP pair. Agnostic stack, recurring cost, shared maintenance.

**Custom integration (Lambda, API Gateway, messaging).** Worth it when volume is huge, latency critical, or logic exceeds what standard tools cover. High implementation cost, ongoing maintenance, but full control.

Choice depends more on operational context (team skills, existing ecosystem, volume) than on feature comparison. That technical debate only makes sense after the five questions are resolved.

## Signs the integration will fail

Before starting to build, three signs almost guarantee delay:

**Sign 1: sponsor has no cross-functional authority.** Sales director sponsoring an integration that touches finance = will stall. IT director sponsoring = will become technical project with no business decision. Ideal: sponsor with weight across sales + ops + finance.

**Sign 2: discovery fits in two weeks.** Serious discovery for Salesforce-ERP integration in a mid-market company requires 4–6 weeks. Whoever quotes two will deliver superficial and find the rest costing 10× more during implementation.

**Sign 3: nobody wrote the five questions above.** If at sprint planning the team has no documented answer to these five, any estimate is a guess. It will be delayed — just don't know by how many weeks.

## The decision for 2026

If your company is about to start a Salesforce-ERP integration, three moves before architecture:

**Sponsor with real authority.** A director with weight to cross areas. Without it, stop and fix the sponsor before the project.

**Dedicated 4–6 week discovery focused on the five questions.** Not on architecture. Not on the field map. On the governance decisions that will cross every technical choice.

**Architectural decision only after.** Native, middleware, custom — choose based on context, not fashion. Volume, skills, ecosystem, latency tolerance. Each one weighs differently per company.

Well-implemented Salesforce-ERP integration is one of the most valuable pieces of modern enterprise architecture — it unlocks commercial, accounting and operational predictability. Badly implemented, it's the integration that becomes a living project for two years. The difference rarely sits in the MuleSoft picked. It sits in who owned what from day 1.
