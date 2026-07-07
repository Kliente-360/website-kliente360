---
title: "Model Context Protocol: what changes when every tool exposes an MCP server"
slug: "model-context-protocol-servidor-mcp"
excerpt: "MCP went from technical curiosity to standard infrastructure in 2026 — over 10,000 servers change how agents access tools and data."
tldr: "The Model Context Protocol (MCP) has become the de facto standard for connecting AI agents to enterprise tools and data, with more than 10,000 active enterprise servers in 2026. That changes the build-vs-integrate calculus: instead of wiring every agent to every system, you expose one MCP server and any compatible agent can consume it. What's left to decide is when to adopt it and with what access controls."
keywords: ["MCP", "Model Context Protocol", "AI agents", "agent integration", "Agentforce"]
---

Every enterprise tool that matters — CRM, database, ticketing system, spreadsheet, code repository — is deciding, right now, whether to expose a Model Context Protocol (MCP) server. This is no longer an early-adopter question. By April 2026 the ecosystem had already passed 9,400 public MCP servers, with private and enterprise-internal servers conservatively estimated at another 3–4x that — more than 10,000 enterprise servers and over 97 million SDK downloads. Anthropic, OpenAI, Google, Microsoft, and AWS have all adopted the protocol. This stopped being an experiment and became infrastructure.

MCP solves a structural problem that stayed invisible while only a handful of agents were in production: every agent-tool pairing needed its own integration. A support agent that needs to query a CRM, open a ticket, and check inventory had three bespoke integrations. Switching LLM providers meant rewriting all three. The growth was combinatorial: N agents times M tools, with no reuse — the same problem that makes [orchestrating multiple agents more expensive than consolidating into one](/blog/en/multi-agent-systems.html) when nobody plans for connection reuse.

## The problem that existed before MCP

Before the protocol, "connecting an agent to a tool" meant writing a function, describing it in natural language for the model, handling authentication, versioning the contract by hand, and repeating that for every agent-tool pair. Agent frameworks tried to abstract the repetition with their own layers — which solved code duplication, but not integration duplication: the CRM backend still had to expose a specific API for every framework that wanted to consume it.

MCP splits two roles that used to be fused. On one side, the **MCP server** — maintained by whoever knows the system — exposes three standardized primitives: *tools* (functions the agent can call), *resources* (data the agent can read), and *prompts* (reusable templates). On the other, the **MCP client** — inside the agent, from any framework — discovers and consumes those primitives through a common protocol, without needing to know anything about the system's internal implementation.

> Before MCP, every agent had to relearn how to talk to every tool. Now the tool learns to speak MCP once, and any compatible agent already understands it.

## What changes for whoever decides architecture

The practical consequence is that the marginal cost of connecting a new agent to an existing system drops — but the cost of keeping that system exposed goes up. Exposing an MCP server means accepting traffic from clients you don't individually control, with a tool contract that needs serious versioning discipline and a new audit surface.

That has already changed vendor behavior. Thirty percent of enterprise app vendors are launching their own MCP server — including CRM and data layers that today only connect through proprietary REST APIs or webhooks. When [Data Cloud stops being just a CDP and becomes Salesforce's central nervous system](/blog/en/data-cloud-nervo-central.html), exposing that layer via MCP means any compatible external agent — not just the platform's native one — can query the same customer data graph, with governance on the server side, not on the side of each custom integration.

For whoever decides architecture today, the question is no longer "should we adopt MCP" — it's "which of our internal systems are worth exposing as a server, and with what access control". A system with sensitive data and high reuse value justifies the investment of exposing it well. A single-use system, with no candidate for a second consumer, doesn't justify the extra maintenance.

## Does MCP replace native function calling?

No — it solves a different problem. Native function calling (OpenAI's or Anthropic's tool use) already lets a model call a function described in JSON Schema inside a single application. That's still the right layer when you control both sides: the agent and the tool live in the same codebase, with no need for dynamic discovery or reuse by third parties.

MCP matters when the server and the client are maintained by different teams or companies, or when the same server needs to serve multiple agents with different needs over time — without the server's maintainer needing to know, in advance, who will consume it. It's the difference between writing a private function and publishing a versioned API: both solve "my code calls other code", but at different scopes of responsibility.

## When it's worth adopting now

It's not a binary "everyone needs this" decision. Three criteria help decide whether this is the moment to invest in exposing — or consuming — MCP:

1. **Real reuse, not hypothetical.** Is there, today or on a concrete two-quarter roadmap, more than one agent or framework that will need to access the same system? This is the same logic as [validating whether an agent is the right answer before multiplying integrations](/blog/en/quando-agente-e-resposta.html) — before exposing a server, it's worth confirming the process behind it is already mature. If the answer is "just one agent, just one use case", direct integration is still simpler and cheaper to maintain.
2. **Governance on the right side.** Exposing via MCP moves access control inside the server — who can call which tool, with what scope. If that control doesn't exist even in the current API, layering MCP on top doesn't solve the governance problem; it just moves where it shows up.
3. **Ability to version without breaking clients.** An MCP server in production needs a stable contract. If the team responsible still changes API schema without warning, publishing that as an MCP server multiplies the blast radius — from one internal client to any external agent that discovered the tool.

Pass all three, and the investment pays off. Fail two or more, and it's worth fixing the house first before publishing that as a surface for third parties.

## The pattern forming now is the one that will last

The adoption speed — from zero to 10,000 enterprise servers in a bit over a year — suggests MCP has become the common vocabulary between agent and tool, the same way REST became the common vocabulary between frontend and backend. Whoever decides to expose a system as an MCP server today is, in practice, deciding the contract that will govern agent integration for years to come. It deserves the same care any public API would — because, effectively, that's what's being published.
