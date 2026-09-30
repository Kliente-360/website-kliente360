---
title: "AI agent identity: the borrowed login is the biggest risk"
slug: "identidade-agente-ia-credencial-propria"
excerpt: "AI agent identity is the credential of its own, with scope and an owner, that every agent needs — yet most run today on a login borrowed from a human."
tldr: "AI agent identity is the credential of its own — with minimal scope, an expiry date and a named owner — that lets an agent access systems without impersonating a person or a generic integration user. In 2026 only 16% of companies say they govern AI access to core systems like Salesforce and SAP well, and fewer than a quarter treat the agent as a distinct identity. The risk is not the model: it is the borrowed login the agent uses to enter the CRM, the ERP and the data warehouse."
keywords: ["AI agent identity", "non-human identity", "least privilege", "agent credentials", "agent governance", "Salesforce"]
---

**Every** AI agent that opens Salesforce, queries the ERP or reads the data warehouse comes in through a door — and in most pilots that door is someone else's credential. A personal token from the developer who built the prototype, a shared integration user with a broad profile, a single API key serving every agent. It works in the pilot, it passes the demo, and it becomes the biggest silent risk in the operation once the agent gains volume. AI agent identity — each agent's own credential — is the control that separates a pilot that scales from an incident waiting for a date.

The 2026 numbers show the size of the gap. The *2026 CISO AI Risk Report*, from Cybersecurity Insiders and Saviynt, surveyed 235 security leaders at large US and UK enterprises and [found a mismatch](https://securityledger.com/2026/04/the-ungoverned-workforce-cybersecurity-insiders-finds-92-lack-visibility-into-ai-identities/): 71% say AI tools already access core systems like Salesforce and SAP, but only 16% govern that access effectively. On top of that, 92% lack full visibility into AI identities and only 5% are confident they could contain a compromised agent.

## The agent is an identity, not a feature

A non-human identity is any entity that authenticates to a system without being a person: a service account, an API key, an integration bot. AI agents belong in that category, with one difference that changes the risk calculation — they decide what to do at runtime. A traditional service account runs a predictable script; an agent chooses which tool to call and with which parameters, so the perimeter of what it *can* do must be defined up front, not discovered afterwards.

Gravitee's State of AI Agent Security 2026, which surveyed 919 professionals, shows the same pattern from the engineering side: only 21.9% of organizations treat agents as entities with their own identity, and 45.6% still use shared API keys for agent-to-agent authentication. The dominant mental model is still "the agent is a feature of the system", when for security purposes it behaves like a new hire nobody formally hired.

> An agent without its own identity has no audit trail, no scope and no off switch — only the access of whoever lent out the password.

## The four credential shortcuts that show up in every pilot

In the projects we see, the shortcuts repeat with little variation. None comes from bad faith; all come from the rush to show results:

1. **A personal token from whoever built the prototype.** The agent acts with one specific person's permissions — and stops working, or worse, keeps working with improper access, when that person changes teams or leaves the company.
2. **A shared integration user with a broad profile.** A single user, often with an administrator profile "so the test doesn't block", serves three agents and two legacy integrations. In the log, everything looks like the same person.
3. **One API key across agents.** A leak compromises all of them at once, and revoking the key takes the whole operation down — which in practice means nobody revokes it.
4. **A credential with no expiry.** The secret created for the demo stays in production for years, in a repository or an environment variable nobody audits.

The common effect is lost attribution. When something goes wrong — a deleted record, sensitive data sent to the wrong place — the log shows a generic account, and the investigation starts by working out *which* agent, *which* run and *who* authorized it. It is the same underlying problem that [agent observability](/blog/en/observabilidade-de-agentes.html) tries to solve after the fact; with an identity of its own, much of it stops existing.

## What a decent agent identity looks like

A consultancy specialized in agents ends up repeating the same set of rules. Six of them cover the vast majority of cases:

1. **One identity per agent, never per team.** Each agent has its own credential, named legibly (`hr-triage-agent`, not `svc-integration-02`). That gives attribution and lets you revoke one without taking down the others.
2. **Least privilege per task, not per convenience.** Scope comes from what the agent needs to do: read accounts but not delete them; create cases but not change contracts. An administrator profile for an agent is an exception that needs a written justification.
3. **Short-lived credentials.** Tokens that expire in minutes or hours, renewed automatically, limit the damage window of a leak. Long-lived static secrets are the pattern to avoid.
4. **A named owner.** Every agent identity has a person responsible for it — the same reasoning as [having an agent owner](/blog/en/dono-do-agente-cargo-2026.html), applied to the credential. Without an owner, nobody renews, nobody reviews, nobody switches it off.
5. **Tested revocation.** Shutting down a compromised agent must take minutes, and the company must have rehearsed it at least once. Only 5% are confident they could contain an agent, according to the report cited above; rehearsing is what changes that number.
6. **Attributable logs.** Every agent action recorded with the agent identifier, the run and the origin of the request — which also supports audit and compliance.

## Own identity or user delegation?

There is a legitimate case where the agent acts *on behalf of* a person: the assistant that summarizes a salesperson's emails, for example. The safe rule is that the agent acts with the **intersection** of the two permission sets — what the agent may do and what that user may see — and never with the sum. Delegation without that guard is the pattern [we described in MCP servers as the "confused deputy"](/blog/en/arquitetura-servidor-mcp.html): the agent inherits permissions the user would never have granted to a machine.

In the Salesforce ecosystem, the practical point of attention is the integration user. In an agent project it is tempting to reuse the user that already connects the ERP to the CRM. It tends to accumulate permission sets from years of integrations, and the agent inherits all of them. The older the org, the more likely the real scope exceeds what is needed. Creating a dedicated user for the agent, with minimal, reviewable permission sets, costs a day of work; discovering the excess after an incident costs far more.

## Where to start in 30 days

Regularizing agents already in operation does not require a big project. A lean sequence, in order of return:

1. **Inventory.** List every agent and every credential it uses, including keys in repositories and environment variables. This is the step that surprises most, because the real list almost always exceeds the official one.
2. **Split shared credentials.** Break each shared key or user into one identity per agent.
3. **Cut scope.** Start with the identities that have administrator profiles and reduce them to what the agent actually used in the last 30 days of logs.
4. **Add an expiry and an owner.** Automatic rotation where the platform allows it; quarterly review where it doesn't.

This work is the silent prerequisite for everything that follows. [A security review of the pilot](/blog/en/seguranca-de-agentes-piloto-nao-testa.html) that tests prompt injection but ignores which credential the agent acts with measures the least dangerous part of the problem.

## Questions that keep coming back

To close, the most common questions about agent identity and access.

## What is AI agent identity?

AI agent identity is an agent's own credential — account, token or certificate — with a defined access scope, an expiry date and a named owner. It makes it possible to attribute each action to the right agent, revoke one agent without affecting the others, and limit what it can reach in the company's systems.

## Can the agent use the credential of the user who triggered it?

It can, when the delegation is explicit and limited: the agent acts with the intersection of what it is allowed to do and what that user can access. What should not happen is the agent inheriting a person's full credential, because then it acts with privileges nobody approved for a machine and the audit trail stops distinguishing human from agent.

## How long does it take to regularize agents already in production?

It depends more on the number of shared credentials than on the number of agents. In our experience, the inventory takes one to two weeks, splitting identities and cutting scope another one to three, and automatic rotation depends on what each platform supports. That is our estimate, not a market benchmark: what changes the timeline is whether every credential has an owner.
