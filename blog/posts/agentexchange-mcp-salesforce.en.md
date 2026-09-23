---
title: "AgentExchange and MCP on Salesforce: the marketplace turned architecture layer"
slug: "agentexchange-mcp-salesforce"
excerpt: "AgentExchange merged AppExchange, Slack Marketplace and the agent storefront into one catalog — 10,000 apps and 1,000+ agents and MCP servers together."
tldr: "AgentExchange is the single marketplace Salesforce launched at TDX 2026 by merging AppExchange, Slack Marketplace and the original agent storefront, bringing together more than 10,000 apps, 2,600+ Slack apps, and 1,000+ agents, tools and MCP servers under one discovery and purchase layer. The shift moves part of the buy-vs-build decision inside the catalog itself — except the speed of assembling a solution from ready-made pieces already outpaces the speed most companies can approve new consumption. An MCP server listed on AgentExchange becomes a permanent architecture piece, not a one-off integration, and inherits the same lock-in vectors as any other ecosystem dependency."
keywords: ["AgentExchange", "MCP on Salesforce", "AppExchange", "agent marketplace", "MCP servers", "AI procurement governance"]
---

**Until** TDX 2026, a Salesforce customer browsed three different places to find an app, a Slack bot or a ready-made agent: AppExchange, Slack Marketplace and the original agent storefront. In April, Salesforce merged all three into a single catalog — AgentExchange — and the old address (appexchange.salesforce.com) now redirects there. The number that sums up the scale of the merger: more than 10,000 apps, 2,600+ Slack apps, and 1,000+ agents, tools and MCP servers, all under the same search.

Merging three storefronts into one looks, at first glance, like a UX decision. It isn't. When an MCP server becomes a catalog item next to a ready-made app, the question every technology decision-maker asks — "buy ready-made or build it?" — changes shape, because both options now show up on the same shelf, with the same install click.

## From three storefronts to one: what the merger actually changes

The unification isn't just brand cosmetics. Salesforce reorganized search around business intent instead of keywords, and promised a conversational search mode for fall 2026 — the customer asks what they need to solve, and the marketplace answers with a combination of app, agent and MCP server, not a list of isolated products. Alongside it came the AgentExchange Builders Initiative, a $50 million commitment to help ISV partners build and scale native AI solutions inside the catalog.

The practical effect: the marketplace stopped being the place to buy an extension for an already-decided system and became the place where agent architecture gets assembled, piece by piece, before a formal project even exists. [Much of what separates serious consulting from disguised resale already ran through the Partner Program and AppExchange](/blog/en/salesforce-partner-program.html) — the AgentExchange merger raises the bar, because now it's not only apps carrying a partner seal, it's autonomous agents and MCP servers too.

> The marketplace that used to sell extensions for a decision already made is now where the architecture decision gets made first.

## An MCP server on the shelf changes the buy-vs-build math

Until recently, adopting the Model Context Protocol meant, in practice, standing up your own server or integrating one of the few open catalogs available. With more than 1,000 agents, tools and MCP servers listed inside AgentExchange — carrying Salesforce's declared trust layer behind them — the decision to build an MCP server from scratch now competes, side by side, with the option of installing one already vetted by the marketplace.

That doesn't eliminate the protocol's technical complexity — it just shifts where it shows up. [What's inside an MCP server's architecture](/blog/en/arquitetura-servidor-mcp.html) — transport, authentication, the risk surface of dynamic tool discovery — still exists even when the server comes ready-made from the marketplace. What changes is that the customer inherits that architecture from a third party, with the security due diligence and long-term maintenance depending on whoever published the item, not on whoever built it internally.

Salesforce describes six layers of MCP integration inside the platform — from Agentforce acting natively as an MCP client to MuleSoft converting an existing API into an MCP server exposed in the catalog. That means an internal API, already built, can literally become an AgentExchange item without a rewrite — which speeds up distribution, but also speeds up the number of automated connections a company needs to audit before it hits production.

1. **Installing a ready-made MCP server from AgentExchange** solves for speed — the server already exists, already got listed, already carries some layer of marketplace review behind it.
2. **Building your own MCP server** solves for control — the company decides transport, the scope of exposed tools, and who audits the risk surface.
3. **Neither option alone solves the governance problem** — installing fast without auditing, or building without following the same security rigor a catalog item promises, both land on the same risk through different paths.

## The speed of assembling has already outpaced the speed of approving

The point that the most technical TDX 2026 coverage missed — and that independent analysis of the event captured well — is organizational, not about product: AgentExchange exposes a gap between how fast a working solution can now be assembled, combining ready-made app, agent and MCP server, and how fast most companies can formally approve the consumption that solution generates. A technical team assembles a functional prototype in a day. Purchase approval, security review and recurring budget take weeks — when they happen at all.

This gap isn't exclusive to AgentExchange. [The same four lock-in vectors that apply to any agent platform](/blog/en/lock-in-plataforma-de-agentes.html) — API dependency, framework capture, data gravity, ecosystem entanglement — apply here with extra force: every agent or MCP server installed from the marketplace deepens entanglement with the rest of the Salesforce stack, and the cost of switching grows right along with the convenience of installing fast.

Salesforce responded, in part, with governance built into the platform itself — AI Gateway gained centralized control over token usage, permissions and approval. But platform control solves the technical problem, not the organizational one: someone inside the company still needs to decide, catalog item by catalog item, what can be installed without going through a committee and what requires formal review before its first use in production.

## Four questions before installing an agent or MCP server from AgentExchange

Before clicking "install" on a catalog item, four questions separate an informed decision from a bet on speed:

1. **Who published the item, and what review level did it go through?** A Salesforce partner seal isn't a uniform guarantee — as with the old AppExchange, there's a gradient of rigor between a Crest partner and a newly credentialed one.
2. **What does this agent or MCP server access, and does that need formal approval before its first execution?** The tool scope exposed via MCP is usually broader than the commercial description suggests.
3. **How much entanglement with the rest of the stack does this item create?** Every native integration raises the cost of switching later — worth asking before installing, not three months into use.
4. **Who, inside the company, owns the decision to keep this item installed?** Without that answer, the catalog grows faster than governance can keep up — and nobody notices until the first incident.

None of these four questions require a new platform feature. They require the same organizational habit that already separates the companies that scale an agent from the ones that stall at the pilot stage: a decision made before installing, not after the item is already running in production.

## The marketplace became an architecture layer, not a shopping tab

AgentExchange isn't just AppExchange with a new name and a bigger catalog. It's Salesforce's own recognition that apps, agents and MCP servers now compete for the same budget and the same architecture decision — and that keeping those three things in separate storefronts no longer reflected how companies actually assemble solutions. For technology decision-makers, that means treating every marketplace install as an architecture decision, with an owner, a scope and an exit criterion defined — not as buying an app that merely extends an already-closed system.

The consultancy that helps a customer navigate this catalog with judgment — without a commission incentive from any specific vendor on the other side of the table — is the one that can tell the item that solves the real problem from the item that only looks like it does because it ranks well in search.

## Questions that keep coming back

To close, the most common questions about AgentExchange and MCP's role inside it.

## What is Salesforce's AgentExchange?

AgentExchange is the single marketplace Salesforce created at TDX 2026 by merging AppExchange, Slack Marketplace and the original agent storefront into one catalog, bringing together more than 10,000 apps, 2,600+ Slack apps, and 1,000+ agents, tools and MCP servers under the same search. The old AppExchange address now redirects there, and search was reorganized around business intent, with a conversational mode planned for fall 2026.

## Is an MCP server listed on AgentExchange safer than building one from scratch?

Not necessarily — it depends on the review level the publisher went through and the tool scope the server exposes, which is usually broader than the commercial description suggests. Installing a ready-made item solves for speed, but doesn't replace your own audit of transport, authentication and risk surface before putting the server into production. Security due diligence remains the installer's responsibility, not just the publisher's.

## How do you decide between buying a ready-made agent from AgentExchange or building one internally?

With four objective questions before installing: who published the item and what review rigor it went through, what it accesses and whether that needs formal approval, how much entanglement with the rest of the stack it creates, and who inside the company owns the decision to keep it installed. Buying ready-made solves for speed; building solves for control — neither option alone solves the governance problem if the decision has no defined owner before installation.
