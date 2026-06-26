---
title: "Building the Agentic Platform - Avoiding Accidental Architecture"
source: "https://substack.com/inbox/post/203098529?utm_source=unread-posts-digest-email&inbox=true&utm_medium=email&triedRedirect=true"
author:
  - "[[Eric Broda]]"
published: 2026-06-23
created: 2026-06-26
description: "A Collaborative Article with Eric Broda and Vikas Shreedhar"
tags:
  - "clippings"
---
If you enjoy our content, please consider subscribing to support our work and receive quality articles from industry professionals delivered every week.

---

Explore the latest articles contributing to the discussion around agents, agent ecosystems, and enterprise AI:

**Agent Identity - The Foundation for Secure Agents:** [https://agenticmesh.substack.com/p/agent-identity-the-foundation-for](https://agenticmesh.substack.com/p/agent-identity-the-foundation-for)

**Anthropic’s Zero Trust Agents: Authenticated, Sandboxed, and Still Dangerous:** [https://agenticmesh.substack.com/p/anthropics-zero-trust-agents-authenticated](https://agenticmesh.substack.com/p/anthropics-zero-trust-agents-authenticated)

---

![](https://substackcdn.com/image/fetch/$s_!gjge!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F800989ee-44bf-443b-91ef-dc824849c6a9_1456x971.png)

Our clients are building enterprise agentic platforms now, into a vendor environment where every hyperscaler and specialist is offering to own the whole stack. This piece organises our practitioner view into two parts: five genuine platform decisions where the trade-off is live and regional context changes the answer, and seven design principles where production experience has largely closed the space.

*This article is a collaboration with **Eric Broda**, Broda Group Software | The Agentic Mesh Company, and **Vikas Shreedhar**, Accenture, Managing Director - Tech Strategy & Advisory Southeast Asia Lead, Singapore*

## Executive Summary

- **The distinction:** In most platform conversations we have been in, the two get conflated. Vendors present settled patterns as open choices, and open choices get closed prematurely. The architectures that result tend to carry that cost for a while before anyone names what happened.
- **The five decisions:** Enterprise control plane ownership, MCP authorisation model, agent identity and authorisation, state and memory ownership, and inference cost governance. Each has a live trade-off and a Speed-Control-Optionality read that looks different for organisations operating under Southeast Asia’s sovereignty and regulatory environment.
- **The seven principles:** Define agents as task actors inside governed processes, use supervisor orchestration, invest in conversational observability across the full agent lifecycle, default to deterministic fallback, contain blast radius through task-scoped grants, build toward a governed knowledge fabric, and build evaluation processes before they are mandated.
- **The bonus principle:** Composability and deprecation are paired properties that allow the platform to evolve toward its target architecture. Reuse optimises for today. A protected spend envelope with an explicit deprecation registry is the governance mechanism that keeps the platform moving.
- **The invitation:** This is a working draft. If you are building these platforms, we would like your perspective on what is missing and what your experience suggests is harder than this treatment implies.

![](https://substackcdn.com/image/fetch/$s_!m77M!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6b5411bf-d74d-41bd-915e-12ae507dd12b_2048x1152.png)

## What the Framework Is Trying to Do

The previous pieces in this series built a connected argument. Without strategic clarity, AI-accelerated delivery builds in the wrong direction. Without a closed value loop, investment does not translate into outcomes. Without human readiness, the platform sits underused. Without a trust network, the composable agentic economy that Series 13 and 14 described cannot function. And without clarity on what AI-native means structurally, investment decisions are shaped by aspiration rather than architecture.

This piece is the practitioner’s turn. Assume the organisation has made a decision in principle to build an enterprise agentic platform. What are the choices that follow? Which ones are open, and which ones has production experience in 2026 largely resolved?

In most of the platform conversations we have been in, the two tend to get conflated. Vendors present settled patterns as open choices because optionality keeps you in the room longer. And open choices sometimes get closed prematurely because making a decision feels like progress, even when the constraints are not yet clear enough to decide well. The architectures that result from both patterns tend to carry the cost for a while before anyone names what happened.

## Part One: The Five Platform Decisions

These are the choices where different organisations with different constraints can legitimately land in different places. The regional context changes the weighting. Each one requires a deliberate answer before significant build begins.

![](https://substackcdn.com/image/fetch/$s_!jj9V!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6408e57f-1cf0-4df7-83a4-c1ff65fba57a_2048x1152.png)

### Decision 1: Enterprise Control Plane Ownership

**Question:** Will the enterprise own the agent control plane, keeping task authority, capability contracts, evidence, cost policy, and release controls outside any one vendor runtime? Or will it standardise on a single hyperscaler’s native agent tooling, accepting vendor lock-in in exchange for deployment speed and integration depth?

The more specific question here is who controls the layer that determines what agents are authorised to do, what evidence they produce, and how they are released and retired, rather than the abstract question of cloud agnosticism. Most hyperscalers will offer to own this layer on the enterprise’s behalf. The practical hedge is to keep those controls in an enterprise-owned layer even if the first implementation still runs mostly on a single hyperscaler’s infrastructure.

**Speed-Control-Optionality read:** This is the decision where Southeast Asia’s sovereignty context is most acute. If data residency requirements, national AI policy, or regulatory expectations eventually mandate local cloud or sovereign infrastructure, a control plane built entirely within a single foreign hyperscaler becomes difficult and expensive to migrate. An enterprise-owned control plane, even a thin one defined initially by policy and contracts rather than custom infrastructure, preserves the flexibility to change the runtime underneath it as the policy environment shifts.

### Decision 2: MCP Authorisation Model

The Model Context Protocol is becoming the de facto standard for tool integration. But MCP is a tool connection protocol, not a complete authorisation model. Its OAuth-based specification supports scopes and permissions, but standing scope access leaves too much authority available for higher-risk tool use. The decision is whether to rely on OAuth scopes alone, or to layer task-scoped grants on top of MCP, requiring a live grant check before execution for destructive, financial, regulated, or customer-facing actions.

OAuth scopes are faster to implement and adequate for many integrations. Task-scoped grants, where authority is issued as a short-lived or single-use grant per task rather than broad role access, provide significantly stronger containment but require a grant-checking service sitting between the agent and every high-risk tool call. The right answer depends on the risk profile of the tools the platform is integrating and the regulatory obligations attached to the workflows running through them.

For legacy enterprise systems, the path to MCP also runs through traditional middleware first. On-premise ERPs, mainframes, and proprietary platforms cannot speak a dynamic agent protocol natively. The integration fabric decision is inseparable from the legacy modernisation question.

**Speed-Control-Optionality read:** For organisations in Southeast Asia integrating agents with regulated workflows, financial transaction tools, or customer data systems, standing OAuth scope access is insufficient. The Control requirement for those tool categories demands live grant checks with short expiry. MCP gives the agent a standard way to reach tools; enterprise governance still has to decide whether this agent may use this tool for this task, right now.

### Decision 3: Agent Identity and Authorisation

**Question:** When an agent executes a tool on behalf of a user, will it operate under a generic service principal with broad-scoped permissions, or use a delegated token that inherits the runtime permissions of the initiating human?

A further distinction matters before the trade-off: personal or coding agents, which typically operate under an individual’s identity and workspace, are a different architecture problem from headless enterprise agents that execute business workflows autonomously. Headless enterprise agents need their own identity, lifecycle, owner, version, and audit record independent of any individual user. The decision below concerns the latter.

The service principal approach is simpler to configure and faster to deploy. The delegated token approach is architecturally correct from a least-privilege perspective but requires sophisticated OAuth and OIDC infrastructure capable of passing token exchanges down a multi-agent chain. Most organisations are currently using broad service accounts because the delegated token architecture is difficult to engineer in a multi-agent context. This is a significant security risk and an audit risk that will surface when regulatory scrutiny arrives.

The direction of travel is toward delegated authorisation using OIDC and On-Behalf-Of patterns that preserve a clear chain of accountability from the initiating human through any agent delegation chain. The architecture should be designed with that migration path in mind even if the full implementation is phased.

**Speed-Control-Optionality read:** This is where the gap between Speed and Control is most dangerous. The service account shortcut is fast, and the vulnerability it creates is invisible until an audit or an incident surfaces it. For organisations in financial services, healthcare, or government-adjacent industries across Southeast Asia, building toward delegated authorisation from the start, even if it slows the initial deployment, is the decision that holds up when regulators examine the identity model.

### Decision 4: State and Memory Ownership

**Question:** Where will short-term execution state and long-term episodic memory live, and who controls the layer that assembles context for each task?

Memory is not a single thing. Execution state, the working data for a running task, differs from conversational state, the accumulated context of an ongoing interaction, which differs from long-term knowledge, the enterprise’s accumulated domain information. The most consequential control point is the governed context assembly layer: the retrieval, ontology, provenance, policy, and filtering logic that decides what enters the agent’s context window for each task. For long-running multi-agent conversations spanning minutes, days, or longer, the traceability requirement extends across messages, assumptions, decisions, and unresolved commitments, because later actions may depend on context established much earlier.

The vendor-managed option is faster to deploy but fragments context and cedes ownership of the assembly layer to the vendor. The enterprise-owned option preserves sovereignty over what the agent knows and how that knowledge is assembled, and requires meaningful infrastructure investment.

**Speed-Control-Optionality read:** Memory and context that live in a foreign vendor’s managed service are memory and context the enterprise does not fully control. For any organisation where customer data is involved, where data carries regulatory classification, or where future localisation requirements are plausible, keeping the context assembly layer enterprise-owned from the start is the lower-risk path. Retrofitting data ownership after it has been established in a vendor’s system is considerably harder than designing it in at the start.

### Decision 5: Inference Cost Governance

**Question:** Will the variable cost of inference be governed through hard quotas and concurrency limits, or through cost envelopes attached to task definitions that govern model tier, token budget, context size, retries, tool calls, and escalation behaviour?

The shift in framing matters. Managing inference cost at the model routing layer, directing tasks to cheaper models, is one lever. But the more durable control point is the governed task session: attaching cost envelopes to task definitions before the agent starts work, so the enterprise decides which work deserves expensive inference before the agent spends it. Measuring cost per valid business outcome rather than raw token burn gives a more actionable signal for governance.

Hard quotas prevent cost overruns but create friction when limits are set incorrectly, as they almost inevitably are given how rapidly model capabilities and pricing are shifting. Task-level cost envelopes combined with dynamic routing provide stronger control with more operational flexibility.

**Speed-Control-Optionality read:** For organisations in Southeast Asia routing inference through frontier models hosted in US or European data centres, there is a latency and data residency consideration alongside the cost one. Open-weight models deployed locally can now reach performance parity with proprietary frontier models on many enterprise tasks at a fraction of the cost, with no cross-border data transfer. Routing to local open-weight models for appropriate tasks is simultaneously cheaper, faster for latency-sensitive workflows, and more defensible from a data governance perspective.

## Part Two: The Seven Design Principles

These are areas where production experience in 2026 has largely resolved the question. The value is not in relitigating the trade-off but in understanding why the evidence points in the direction it does, so the organisation does not spend time and vendor budget rediscovering what the field has already learned.

![](https://substackcdn.com/image/fetch/$s_!Qzkp!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7d94f3e4-4cd9-4acc-91ea-9153a1b16f48_2048x1152.png)

### Principle 1: Define Agents as Task Actors Inside Governed Processes

Enterprise platforms that treat autonomy as a dial to be turned up or down create a false architectural choice. The more precise question is whether agents sit beside a process or inside it. In the task actor model, agents are assigned defined tasks within a business process, with declared permissions, required evidence, escalation conditions, and human approval gates specified in the task definition itself. Human involvement is a design property of the process: missing data creates a hold, policy thresholds trigger escalation, and regulated decisions require explicit approval before release.

A platform can automate routine task execution while preserving human authority at exactly the points where judgment, regulation, or institutional accountability require it. For regulated enterprises, the defensible architecture is declared human intervention criteria, enforced task boundaries, and evidence that the agent stayed inside the process it was assigned to run.

This principle applies to enterprise process agents. Coding agents and personal productivity agents operate under different patterns, and orchestration for those contexts is already addressed by purpose-built tooling.

### Principle 2: Use Supervisor Orchestration Patterns

Multi-agent workflows coordinated through decentralised choreography produce execution paths that are difficult to trace and hard to debug when something goes wrong. Process orchestration should function as the coordination layer that assigns tasks to agents, controls delegation, preserves state, records evidence, and manages exception and release paths. That requires a supervisor pattern, not a choreographed peer-to-peer mesh.

Organisations building for reliability in regulated workflows are using rigid, deterministic, hierarchical supervisor patterns, often implemented through state machine frameworks. Lower-risk, internal workflows with bounded scope may accommodate hybrid approaches, but supervisor patterns should be the default wherever the audit trail matters. For regulated industries in Southeast Asia, that covers most of what is being built first.

### Principle 3: Invest in Conversational Observability Across the Full Agent Lifecycle

Traditional monitoring, tracking latency, errors, and token cost, does not provide insight into the reasoning behaviour of agentic systems. Semantic tracing, storing and versioning the deterministic reasoning steps and prompt payloads for each execution, is necessary but not sufficient for enterprise platforms.

Enterprise platforms also need observability across the full conversation: parent task, child agents, messages, tool calls, context transfers, assumptions, decisions, human interventions, and release outcomes. Some agent conversations will span minutes, days, or longer. Without durable conversation state and cross-agent correlation, the organisation can debug a single agent turn but cannot reconstruct how a long-running multi-agent conversation produced a business result. Standard APM tooling does not handle this. Dedicated LLM observability tooling is required alongside the existing monitoring stack, and for organisations in regulated environments, the conversation trace is also the governance evidence.

### Principle 4: Default to Deterministic Fallback on Failure

When a tool call fails or an agent produces an unreliable output, LLM-driven self-correction tends to produce compounding errors, infinite retry loops, and accumulating inference costs in production environments, particularly in implementations without circuit breakers or bounded retries. Production systems that have learned from experience route failures to a human queue through explicit code-level error handling.

Scoped reflection with bounded retries has a place in lower-risk, internal workflows where the cost of an error is contained. The default posture for regulated enterprise workflows should be deterministic fallback, with self-correction applied deliberately and narrowly rather than as a platform-wide assumption.

### Principle 5: Contain Blast Radius Through Task-Scoped Grants, Not Input-Layer Filtering

There is no complete defence against prompt injection at the input layer. Application-layer sanitisation is bypassed by semantically sophisticated attacks. An LLM-based security gateway provides more robust defence but doubles latency and inference cost for every request.

The reliable approach is structural: make every tool execution depend on a grant that defines the task, allowed tools, allowed actions, data domains, expiry, and release conditions. When a tool call arrives, the Tool Service checks the grant before execution and denies actions outside the approved task boundary rather than relying on the agent to police itself. This connects directly to Decisions 2 and 3: an agent operating under a properly scoped delegated token and a task-level grant cannot exceed its authorised scope even if hostile content influences its reasoning. The three reinforce each other and make tool execution manageable, explicit, and auditable rather than a side effect of broad runtime access.

### Principle 6: Build Toward a Governed Enterprise Knowledge Fabric

Standard semantic vector search is fast to implement and adequate for early pilots. It degrades when agents navigate complex business rules, policy hierarchies, cross-departmental relationships, or multi-hop reasoning chains. The production experience in 2026 is that basic vector RAG hits a ceiling quickly in genuine enterprise contexts.

The stronger pattern combines semantic models, ontology, knowledge graphs, metadata, deterministic lookup, access policy, provenance, and task-scoped context assembly. That gives agents the right context for the task rather than merely the nearest text. Token budgets are also a real constraint: as token usage grows, retrieval architecture needs to be token-aware, assembling context within cost envelopes rather than returning everything that matches a query. The knowledge fabric decision connects directly to Decision 5: cost per valid outcome requires that the context assembled for each task is appropriate to the task, not maximised for coverage.

### Principle 7: Build Evaluation Processes Before They Are Mandated

The current reality in most enterprises is that evaluation rigour is thin: testing against a small set of representative prompts and reviewing for obvious failures is common. For organisations in regulated industries, the evaluation and release governance model is likely to come under explicit regulatory scrutiny as AI accountability frameworks develop across Southeast Asia. Singapore’s Model AI Governance Framework for Agentic AI, published by IMDA in January 2026, and the CSA Agentic Trust Framework, published in February 2026, both emphasise traceability and accountable release processes as foundational requirements. Building toward a documented, auditable evaluation process early, even a manual one that is later automated, creates the evidentiary trail that regulators will eventually ask for.

## Bonus Design Principle: Composability and Deprecation Over Reuse

On immature platforms, the instinct to pack functionality into shared constructs, a reusable orchestration layer, a shared memory module, a universal tool registry, produces tight coupling through dependencies that nobody quite owns. When something needs to change, and on an agentic platform in 2026 something will need to change, the shared construct becomes the thing that blocks it. Every team that has built against it now has a migration problem. TCO compounds, and the ability to evolve is constrained by the decisions made early to avoid duplication.

Composability paired with deprecation is the more durable design property. Build small, bounded, independently deployable components with clean contracts at their edges, and design each one with the assumption that it will eventually be replaced. The components that can be retired cleanly, without cascading dependencies spreading the change across the estate, allow the platform to move toward its target architecture as the technology around it evolves: a platform that keeps moving rather than one that hardens in place.

One caution to name directly. The microservices era demonstrated what happens when composability is applied without discipline: components proliferate, ownership fragments, and what started as a decomposition strategy becomes an estate harder to govern than the monolith it replaced. Composability without active deprecation produces the same problem from a different direction. This is why the team needs a protected spend envelope for continuous improvement, not a one-time modernisation budget, and an explicit deprecation registry: agents, skills, tools, task definitions, schemas, prompts, and context sources versioned, owned, policy-bound, and retired through controlled lifecycle states. A registry is what turns composability from a design philosophy into a governed operational capability.

**Speed-Control-Optionality read:** The reuse instinct optimises for short-term Speed. Composability paired with deliberate deprecation capability invests in long-term Optionality, the ability to evolve the platform toward wherever the target architecture needs to go, without the accumulated weight of early decisions becoming the constraint. The architectural choices made in 2026 will determine how much room there is to move in 2028.

## Publishing This as a Conversation

That is five decisions and seven principles, with a bonus design principle on platform evolution. Together they describe what we are observing as the gap between agentic architecture as a strategy document and agentic architecture as a production engineering problem.

What this framework does not yet have is a clear sequencing and maturity model for moving from assistive to calibrated autonomous execution, and a more detailed treatment of how the five decisions interact and constrain each other over time. Those gaps are deliberate. We would particularly value perspectives from practitioners who are building these platforms on sequencing priorities, maturity gates, and where the decisions and principles create friction in real environments.

If you are building agentic platforms, or have tried to, we would value your perspective on what is missing, what the framework gets wrong, and whether the decisions we have identified as open are the right ones. The goal is to evolve this into something more rigorous than any one practitioner’s starting point.

## Four Questions to Open the Conversation

These are best examined together, by the people who own architecture, security, operations, and delivery, not separately.

1. Of the five decisions above, which ones has your organisation made explicitly, and which have been settled by default through choices made during pilot phases, with the implications of those defaults not yet visible at the platform level?
2. On the MCP authorisation and identity decisions specifically: what governance infrastructure, grant-checking capability, and audit mechanisms would need to be in place before your organisation could responsibly expand agent tool access beyond low-risk workflows, and how far along is that infrastructure today?
3. Looking at the seven design principles, where is your current platform build running against the grain of what production experience suggests, and what is the rationale for that divergence?
4. For each decision where you have prioritised Speed over Control, what is the explicit condition under which you would revisit that choice, and who owns the responsibility for monitoring whether that condition is being approached?

Authors: Eric Broda and Vikas Shreedhar, Accenture, Managing Director - Tech Strategy & Advisory Southeast Asia Lead, Singapore

---

**Looking for more?  
**👉 Discover the full **[O’Reilly](https://www.oreilly.com/library/view/agentic-mesh/9798341621633/)** ***[Agentic Mesh](https://www.oreilly.com/library/view/agentic-mesh/9798341621633/)*** **[book](https://www.oreilly.com/library/view/agentic-mesh/9798341621633/)** by **[Eric Broda](https://www.linkedin.com/in/ericbroda/)** and **[Davis Broda](https://www.linkedin.com/in/davisbroda/)**

🎧 Follow **The Agentic Mesh Podcast** on **[Youtube](https://www.youtube.com/@TheAgenticMeshPodcast), [Spotify](https://open.spotify.com/show/6C6U2fmVdxNMdo1bZpVASy?si=3cyoAireSZiBaKJ-1FtJlA)** and **[Apple Podcasts](https://podcasts.apple.com/us/podcast/the-agentic-mesh-podcast/id1874331081)**. A new video every week!