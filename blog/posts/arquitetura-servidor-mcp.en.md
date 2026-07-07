---
title: "Architecture of an MCP server: transport, authentication, and where it breaks"
slug: "arquitetura-servidor-mcp"
excerpt: "Inside an MCP server: the protocol's three primitives, stdio vs remote HTTP, and the security risks that integration checklists usually skip."
tldr: "An MCP server exposes tools, resources, and prompts over JSON-RPC, with two main transports — local stdio and streaming remote HTTP. The real risk surface isn't the protocol itself, it's what it automates: dynamic tool discovery and execution with little human friction. This piece covers the architecture and the security checklist before going to production."
keywords: ["MCP", "MCP architecture", "agent security", "Model Context Protocol", "JSON-RPC"]
---

As [we already covered when mapping enterprise-scale MCP adoption](/blog/en/model-context-protocol-servidor-mcp.html), the protocol went from technical curiosity to standard infrastructure in a bit over a year. What that adoption conversation doesn't cover is the part that decides whether an MCP server is safe to publish or an open door: the architecture underneath, the transport chosen, and the attack surface the protocol introduces by automating what used to require human friction.

Publishing an MCP server looks, in the official docs, as simple as exposing a REST endpoint with a decorator. In practice, a poorly designed server turns every connected agent into an execution vector with broad access and little auditability. This piece goes into the implementation layer: the protocol's three primitives, the two available transports, and the security checklist before going to production.

## The three primitives every MCP server exposes

An MCP server doesn't expose "an API" — it exposes three types of capability, each with its own semantics that the client discovers at runtime.

- **Tools.** Functions the model can invoke with side effects — create a ticket, update a record, trigger a workflow. Each tool is described in JSON Schema (name, parameters, natural-language description). It's the natural-language description, not the schema, that the model uses to decide when to call it — and that's exactly where the first risk vector below comes from.
- **Resources.** Data the client can read — a document, a database row, a log file — addressed by a URI the server defines. Unlike a tool, a resource doesn't execute an action; it just returns content, which enters the model's context like any other text.
- **Prompts.** Parameterized templates the server offers so the client can assemble a complete instruction — useful when the system's maintainer wants to standardize how the agent asks something specific to that domain, instead of leaving every client to reinvent the prompt.

A server doesn't need to expose all three. A documentation-reading server, for instance, only exposes resources; a CRM automation server mostly exposes tools.

## JSON-RPC under the hood

All MCP communication runs over JSON-RPC 2.0. The session starts with an `initialize` handshake, where client and server exchange supported protocol version and capabilities — the server declares whether it supports tools, resources, prompts, and resource-change subscriptions. After the handshake, the client lists what's available (`tools/list`, `resources/list`) and invokes (`tools/call`, `resources/read`).

That capability negotiation is what allows versioning without breaking older clients: a server can add a new tool in a version, and a client that doesn't know that tool simply won't list it. The problem shows up when the server *changes the behavior* of an existing tool without changing its name — a client that learned the old contract keeps calling it, now getting a different result than expected. There's no semantic versioning check built into the protocol; that's on whoever maintains the server.

## Local stdio or remote HTTP — two transports, two risks

MCP defines transport separately from message semantics — the same `tools/call` primitive works over two very different channels.

**Stdio** connects client and server in the same local process, via stdin/stdout. It's the default transport for developer tools (editor, CLI) running on the same machine as the agent. There's no network involved — interception risk is low, but the server inherits the same privileges as the process that invoked it, which means a path-traversal or command-injection bug in the server has direct access to the local filesystem.

**Streamable HTTP** (which replaced the earlier spec revision's HTTP+SSE combination) is the transport for a remote, multi-tenant server serving clients that don't share a process or machine. Here the surface changes: authentication becomes mandatory (typically OAuth 2.1), every request needs scope and rate limiting, and the server needs to isolate client A's session from client B's — without that, a cross-session context-leak bug exposes one tenant's data to another.

The choice isn't cosmetic. A server that will only be consumed locally doesn't need the complexity of OAuth and multi-tenancy. A server that will be consumed by agents from different clients needs, from the first deploy, real session isolation and authentication — retrofitting it later is expensive.

## Where do most implementations break?

The protocol itself is simple. The risk surface comes from what it automates: dynamic tool discovery and execution with little human friction between a model's decision and its effect on the real world. Four failure patterns show up repeatedly.

**Tool poisoning.** A tool's natural-language description is, itself, a prompt-injection vector — a malicious or compromised server can describe an innocuous-looking tool in a way that instructs the model to do something beyond what's expected. The model reads the description as an instruction, not just as metadata.

**Confused deputy via OAuth pass-through.** When an MCP server forwards a user's OAuth token to another downstream system without validating scope, the agent inherits permission beyond what the task requires — and any call to that tool executes with the user's full privilege, not the minimum needed for that specific action.

**Tool-definition rug-pull.** A client approves using a tool based on the description seen on first connection. Nothing stops the server from altering that description — or the behavior behind it — on a later connection, without the client re-evaluating the original consent.

**Resource content as indirect injection.** A resource returns third-party content — a document, an email, a web page — that enters the model's context as trusted text. If that content contains a disguised instruction, the model may obey it with the same authority it would give the user.

> The risk with MCP isn't the protocol — it's the distance it creates between a model's decision and a human's review.

## Checklist before production

None of these risks is a reason not to publish an MCP server. They're a reason to publish it with controls. Six items separate an amateur implementation from a production-ready one:

1. **Minimum scope per tool, never the full user token.** Every call should carry only the permission needed for that specific action — never forward the entire session token to the downstream system.
2. **Allow-list of known clients**, especially on a remote multi-tenant server. A new client enters observation mode before gaining access to tools with real side effects.
3. **Structured logging of every tool call** — argument, client, timestamp, result. Without it, an incident isn't investigable after the fact.
4. **Mandatory human review for destructive or irreversible actions** — deleting a record, sending an external communication, moving money. Reversible, low-impact actions can run autonomously; the rest can't.
5. **Explicit versioning of the tool contract**, with a visible changelog — a behavior change without an identifier change breaks the implicit consent of a client that already approved that tool.
6. **Sanitize resource content before it enters context**, treating any external data as untrusted until proven otherwise — the same principle that already applies to [any RAG pipeline handling third-party documents](/blog/en/rag-na-pratica.html).

## The architecture decides how much you trust the agent

The point that remains after this checklist is that MCP doesn't introduce a new risk in essence — it introduces speed and scale for risks that already existed in any automated integration. What changes is that, in a world of dynamic tool discovery, those risks stop being evaluated once per integration and start needing continuous evaluation — because the set of tools available to the agent can change without anyone on the team reviewing it again.

That's the same argument behind [treating agent governance as part of the design, not a layer bolted on afterward](/blog/en/privacidade-dados-llms.html): whoever publishes an MCP server today is, in fact, deciding how much they'll trust code they didn't write to act on behalf of an agent they may not have even maintained.
