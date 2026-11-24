---
title: "Shadow AI at work: why banning it fails and what to put in its place"
slug: "shadow-ai-empresa-proibir-nao-funciona"
pillar: "ai"
date: "2026-11-24"
readMinutes: 7
excerpt: "Half of employees already use unapproved AI, and blocking it only pushes usage to personal accounts. How to map it, offer an alternative and protect data."
tldr: "Shadow AI is the use of generative AI tools by employees without the company's approval or visibility, almost always on personal accounts and with corporate data. Banning it does not end that usage: it moves to phones and personal accounts, where the company loses any control. What reduces the risk is inventorying real usage, offering a corporate alternative that is just as good, classifying which data may go into AI, and only then applying technical controls."
keywords: ["shadow AI", "unauthorized AI", "AI governance", "employee AI use", "LGPD", "AI acceptable use policy"]
---

**Shadow AI** is the name the market gave to something almost every manager already knows: the team uses ChatGPT, Gemini, Claude or some AI browser extension to get work done, on personal accounts, without IT knowing what, with which data or for what. It is not a deviation by a few. It is the norm. And the most common company response, blocking the domain and sending a memo, is also the one that works least.

The numbers are consistent across sources. A [Sapio Research survey for BlackFog](https://www.blackfog.com/blackfog-research-shadow-ai-threat-grows/), covering 2,000 employees at companies with more than 500 people in the US and UK, found that 49% use AI tools not sanctioned by their employer, 63% think it is acceptable to use AI without IT oversight when the company offers no approved option, and 51% have already connected AI tools to other work systems without approval. On the governance side, Gartner surveyed 302 security leaders in 2025: 69% suspect or have evidence that employees use prohibited public generative AI.

## Why banning AI at work does not work

Blocking access looks like the prudent answer. In practice, it trades a visible risk for an invisible one. Three reasons explain why.

**Usage moves; it does not disappear.** Blocking ChatGPT on the corporate network does not take the tool off the employee's phone. The contract text, the customer spreadsheet or the code snippet still goes into the AI, now via screenshot, a WhatsApp copy or a personal login at home. The company loses even the partial telemetry it had. Harmonic Security data on 22 million corporate prompts, compiled in a [Cloud Security Alliance research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-shadow-ai-apps-enterprise-20260530-csa-sty/), shows 73.8% of ChatGPT usage in companies happening on personal accounts.

**The demand is real.** Employees do not use AI out of rebellion. They use it because it summarizes a meeting in two minutes, polishes an email in a second language, drafts the first version of a SQL query. Banning it without an alternative asks people to work slower because of a rule nobody explained. They will work around it.

**Those who work around it most are those who decide.** In the same BlackFog survey, 69% of C-level and president respondents said speed outweighs privacy or security, versus 37% in administrative roles. The policy the leadership approves is often the one leadership follows least.

> Banning AI does not eliminate usage; it eliminates visibility into usage, the only control the company had.

## The real shadow AI risk lies in data and access

The debate usually stops at "an employee pasted customer data into ChatGPT." That risk exists, but it is the smallest of three.

The first is, in fact, **sensitive data outside the perimeter**: customer personal data, undisclosed financial information, source code, legal drafts. On a free personal account, the company does not control retention, has no contract with the provider and, depending on the settings, the content may be used to train the model. For anyone processing personal data in Brazil, that is processing without a clear legal basis and without records, and the [ANPD has already made AI an enforcement priority](/blog/en/anpd-fiscalizacao-ia-brasil.html) even without the AI bill passed.

The second is **connections with no owner**. Modern AI tools ask for access to email, drive, calendar, CRM. When 51% of employees have connected AI to work systems without approval, there are OAuth tokens with access to corporate data issued by people who do not know that this is a security decision. It is the same problem we discussed about [AI agents running on borrowed logins instead of their own identity](/blog/en/identidade-agente-ia-credencial-propria.html), only created from the bottom up.

The third is **incident cost**. [IBM's Cost of a Data Breach 2025](https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls), based on 600 organizations that suffered a breach, estimated US$670,000 in additional average breach cost at companies with high levels of shadow AI. Among organizations that had an incident involving AI models or applications, 97% lacked proper AI access controls.

## How to bring shadow AI into the light

The goal is not to drive unauthorized usage to zero, which is impossible. It is to make the approved path easier than the shortcut. The sequence we apply:

1. **Inventory without a witch hunt.** Before any policy, find out what is in use: proxy and DNS logs, browser extensions, connected apps in Google Workspace or Microsoft 365 and, above all, an anonymous internal survey asking what people use and for what. If the inventory comes with punishment, nobody answers honestly.
2. **Offer a corporate alternative that measures up.** An enterprise license for an AI assistant, with SSO, a contract that excludes training on your data and configurable retention, covers most use cases. If the approved tool is visibly worse than the free one, shadow AI continues.
3. **Classify data into three tiers.** Public or low-risk internal data can go into any approved tool. Confidential data (financial, strategic, code) only into the corporate tool. Sensitive personal data and regulated secrets only into flows designed for them, with a legal basis and records. It is the same logic as the [data privacy checklist for LLMs that pilots skip](/blog/en/privacidade-dados-llms.html), applied to day-to-day use.
4. **Write a one-page policy and communicate it.** What is allowed, what is not, which tool to use, whom to ask. A 20-page policy on the intranet does not change behavior; one page explained by the manager in a team meeting does.
5. **Create a request channel with a deadline.** When someone finds a useful new tool, there must be a way to request an evaluation, with an answer in days, not quarters. Without it, the inventory goes stale the following week.
6. **Only then apply technical controls.** With the alternative in place, it makes sense to block personal-account logins to AI services on corporate devices, apply DLP in the browser and periodically review connected OAuth apps. Technical control without an alternative is the ban from the start of this text under another name.

## What to measure to know AI governance worked

A policy without metrics becomes a document. Four numbers tell the story:

1. **Share of usage on corporate accounts.** How much traffic to AI services goes through the approved tool rather than personal accounts. This is the main indicator.
2. **Response time to new-tool requests.** If it goes beyond a few weeks, the official channel has lost to the shortcut.
3. **Connected AI apps with no owner.** How many OAuth tokens from AI tools exist without a named owner, and whether that number falls at each review.
4. **Sensitive-data events blocked.** How many times DLP stopped confidential data from going into AI. A high number at the start shows the control works; a high number for months shows an alternative is missing for that task.

A practical reference of ours, an estimate and not a benchmark: at mid-sized companies that offer a corporate alternative with SSO and communicate the policy in person, most visible usage moves to the corporate account within two to three months. What remains is the long tail of niche tools, and that tail is exactly what the request channel exists to handle.

## Shadow AI is a signal of demand, not just risk

Every shadow AI inventory is also a map of where people are losing time. The analyst secretly using AI to consolidate reports is saying that process should be automated. The sales team pasting meeting notes into a chatbot is asking for an integration the CRM does not have yet.

Companies that treat shadow AI only as a security incident spend energy hunting usage. Those that treat it as demand research use the inventory to decide where to invest in governed AI, with an owner, classified data and an approved tool. Risk falls because usage comes out of the shadows, not because it was banned.

> Every hidden use of AI points to a process the company has not yet solved properly.

## Questions that keep coming back

Common doubts from those who need to decide what to do about unauthorized AI use at their company.

## What is shadow AI?

Shadow AI is the use of artificial intelligence tools, especially generative AI, by employees without approval, contract or visibility from IT and security. It usually happens on free personal accounts with corporate data, and also includes browser extensions and AI apps connected to email, drive or CRM without review.

## Should a company block ChatGPT and other AI tools?

Blocking without offering an alternative does not work: usage moves to phones and personal accounts, and the company loses what little visibility it had. The more effective path is to offer a corporate tool with SSO and a proper contract, classify which data may go into AI and, only afterward, block personal accounts on corporate devices.

## Does an employee using AI with customer data violate data protection law?

It can, when personal data is sent to an AI service without a legal basis, without a contract with the provider and without a record of processing, as happens in most personal-account use. Under Brazil's LGPD, responsibility before the ANPD lies with the company that controls the data, not the employee, so data classification and an approved corporate tool are the practical protection.
