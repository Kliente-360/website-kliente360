---
title: "Salesforce connected apps: the forgotten OAuth token is the open door"
slug: "seguranca-connected-apps-salesforce"
pillar: "sf"
date: "2026-11-17"
readMinutes: 7
excerpt: "The biggest Salesforce data breaches of 2025–2026 came through already-authorized connected apps. How to audit OAuth tokens without breaking integrations."
tldr: "A connected app is the authorization that lets an external system read and write to a Salesforce org via OAuth, and the token it receives usually stays valid until someone revokes it. Between August 2025 and June 2026, three chained attacks (Salesloft Drift, Gainsight and Klue) reached data at hundreds of organizations (more than 700 in the Salesloft Drift case alone) without exploiting any platform flaw, using tokens from trusted integrations that no login monitoring detected. The defense is to treat every integration as a privileged account: inventory, minimum scope, short token lifetime, a named owner and revocation when the use ends."
keywords: ["Salesforce connected apps", "Salesforce OAuth security", "Salesforce OAuth token", "Salesforce integrations", "Salesloft Drift", "connected app audit"]
---

**Salesforce connected apps** have become the preferred route for anyone trying to steal CRM data. Not because of a platform flaw: because every authorized integration carries an OAuth token that, by default, stays valid until someone remembers to revoke it. Almost nobody remembers. The prospecting tool tested in 2022, the satisfaction-survey connector marketing abandoned, the vendor proof of concept that never became a contract. All of them still have read access to the most complete data the company holds about its customers.

Between August 2025 and June 2026, this stopped being hypothetical. According to the [Cloud Security Alliance research note from July 2026](https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/07/CSA_research_note_shinyhunters_oauth_saas_abuse_20260716-csa-styled.pdf), three successive attacks used tokens from trusted integrations to extract data from Salesforce orgs: more than 700 organizations via Salesloft Drift, more than 200 instances via Gainsight and 195 customers via Klue. None of the three exploited a Salesforce vulnerability. All of them exploited authorization that was granted and forgotten.

## Why the attack never shows up in login monitoring

Most companies' security mental model is still about people logging in. Mandatory MFA, alerts on access from an unusual country, lockout after failed attempts. All of that protects the front door. A connected app comes in through a different one.

When a user authorizes an integration, Salesforce issues an access token and, in most cases, a **refresh token**: the credential that lets the integration request new tokens with no human involved. The default policy is that this refresh token is valid until revoked. Whoever steals the token inherits the integration's access, with no password, no MFA and no new login to trigger an alert.

That is why, according to the CSA, none of the three incidents was detected by authentication monitoring. The queries arrived through already-authorized connected-app sessions, at volumes and times similar to the vendor's legitimate traffic. In the Klue case, automated extraction ran for about 24 hours before detection. In the Salesloft case, the window ran from August 8 to 18, 2025, more than a week.

> The authorized integration is the perimeter nobody audits. The token doesn't ask for MFA, doesn't rotate passwords and never leaves the company.

## Three incidents, the same governance failure

The cases are worth a closer look, because each one shows a different kind of forgotten integration.

**Salesloft Drift (August 2025).** The attackers accessed Salesloft's GitHub as early as March, moved into the company's AWS environment and from there harvested the OAuth tokens the Drift chatbot used to write leads into customers' Salesforce orgs. Salesloft and Salesforce revoked all Drift tokens on August 20. The uncomfortable part: many affected companies used Drift as a website chat without realizing it had read access to the entire CRM.

**Gainsight (November 2025).** Salesforce detected anomalous API activity from applications published by Gainsight and disabled all of them across the ecosystem. Part of the coverage indicates the attackers reused tokens obtained in the previous incident. In other words: a token revoked in one place and not reviewed in another.

**Klue (June 2026).** The most instructive case. Years earlier, Klue had created a credential to prototype an integration that never shipped. Nobody deactivated it. On June 11, 2026, the attackers used that four-year-old credential to push code capable of harvesting customer OAuth tokens and queried the Salesforce REST API for a full day.

The common pattern is not technical, it is managerial. In every case there was a durable credential nobody was actively reviewing. The same CSA note cites its 2025–2026 survey of 420 security professionals: 58% struggle to enforce least privilege across SaaS integrations and 46% lack adequate visibility into non-human identities such as connected apps. In our reading, this matches what we see in real orgs, where the list of authorized integrations is often twice what IT believes exists (our estimate, based on org reviews).

## What a connected app actually grants

Part of the problem is that the authorization screen looks harmless. "Allow access to your data" doesn't say how much. In practice, three technical decisions define how much damage is possible:

- **OAuth scope.** An integration with `full` or `api` scope reads everything the authorizing user reads. If an admin authorized it, the integration has an admin's view. Narrower scopes exist, but they depend on the vendor supporting them.
- **The user behind the token.** The token inherits the permissions of whoever authorized it. An integration authorized with the sales manager's personal login sees what they see and breaks the day they leave the company, or worse, keeps working.
- **Refresh token lifetime.** "Valid until revoked" is the default. Expiring after a set period, or after a stretch of inactivity, closes the window on forgotten tokens at no cost to active integrations.

That third point connects to [the technical debt of overlapping automation in Salesforce](/blog/en/divida-tecnica-salesforce-automacao.html): integrations nobody remembers are the same phenomenon, with data-leak risk in place of regression risk. And Salesforce has already reacted in the platform itself: since September 2025, using connected apps that are not installed in the org has been blocked for most users, a direct response to phone-phishing campaigns that persuaded employees to authorize a fake Data Loader.

## How to audit connected apps in six steps

A connected app audit requires no new tool and no long project. For a mid-sized org, it fits in two to three weeks of work, our estimate. The sequence we recommend:

1. **Build the real inventory.** In Setup, the connected apps OAuth usage page lists every application with active tokens and how many users authorized it. Export it and cross-check against your software contracts. Anything without a current contract is a revocation candidate.
2. **Revoke what has neither use nor owner.** A finished proof of concept, a replaced tool, a vendor that left. Revoking the token, not just deactivating the user, is what ends persistent access.
3. **Switch from "all users may self-authorize" to "admin-approved users are pre-authorized".** In each installed connected app's policies, restrict access to specific profiles or permission sets. Also limit the permissions that allow approving uninstalled apps to a few admins.
4. **Replace personal logins with integration users.** Each relevant integration gets a dedicated user, with an integration license and minimum permissions. That gives a clear target to monitor and decouples the integration from staff turnover, the same principle behind [giving an AI agent its own credential instead of a borrowed login](/blog/en/identidade-agente-ia-credencial-propria.html).
5. **Shorten token lifetimes.** Configure refresh token expiration by time or by inactivity, and restrict IP ranges when the vendor publishes theirs. An active integration renews without noticing; a forgotten token dies on its own.
6. **Name an owner and a recertification date.** Each connected app has a business owner, a written justification and a twice-yearly review. Without this step, the inventory swells again within a year.

For orgs with Event Monitoring (included in Shield or purchased separately), it pays to go further: monitor query volume per connected app, not just per user, and alert when an integration queries objects it has never queried. That is the layer that would have shortened the attack windows described above.

## What changes when the agent asks for its own token

Pressure on this topic will grow, not shrink. Every AI agent that reads and acts in the CRM needs some authorization, and much of it arrives through the same OAuth mechanism. The [AgentExchange marketplace of agents and MCP servers](/blog/en/agentexchange-mcp-salesforce.html) makes installing an integration as easy as installing a phone app, and every installation is one more token to govern.

The CSA's own recommendation is to extend to agent integrations now the discipline that was missing in all three incidents: owner, justification, recertification and automatic revocation. Whoever runs the connected app audit today will already have the process in place when the number of agents grows.

CRM data is the asset that justifies the Salesforce investment. Leaving access to it scattered across ownerless tokens means accepting that the org's security depends on the credential hygiene of every vendor that ever had access to it.

## Questions that keep coming back

The questions that come up most when leadership asks for a review of Salesforce integrations.

## What is a connected app in Salesforce?

A connected app is the record that authorizes an external system to access a Salesforce org through APIs using OAuth. It defines who can authorize the integration, which access scopes are granted and how long tokens stay valid. Prospecting, chat, e-signature and BI tools usually connect this way.

## Were the Salesloft Drift and Klue breaches a Salesforce failure?

No. According to Salesforce and the Cloud Security Alliance's analysis, none of the incidents exploited a platform vulnerability. The attackers compromised vendors that already held valid OAuth tokens in customers' orgs and used that legitimate authorization. Responsibility for scoping, reviewing and revoking these integrations lies with the customer and the vendor.

## Does revoking a connected app token break the integration?

It does if the integration is in use, which is why revocation comes after the inventory. For active integrations, revocation means reauthorizing with an integration user and the right scope, which takes minutes. For unused integrations, revoking breaks nothing and closes a door that was open for no reason.
