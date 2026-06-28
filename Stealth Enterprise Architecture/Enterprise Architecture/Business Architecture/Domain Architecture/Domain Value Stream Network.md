---
type: Reference
title: "Domain Value Stream Network"
description: "Every spy knows that no mission happens in isolation."
timestamp: 2026-06-26T19:19:05Z
feature: Emergency Department Domain Value Stream Network.png
---
Every spy knows that no mission happens in isolation. That said, sometimes different Domains compartmentalize their domain knowledge like they are trying to prevent their data from being discovered though espionage. Within an organization, domain value stream interoperability should not require the skills of the IMF to infiltrate Langley to gain access to the NOC list.

A Value Stream Network is a [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]] model that reveals the interconnected web of value streams that must coordinate to deliver the outcomes for a particular domain's valuue stream. While a single [[Value Streams|Value Stream]] shows how value flows from triggering event to stakeholder value, the Value Stream Network shows how that value stream triggers, informs, and depends on other value streams across [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain|domain]] boundaries.

Think of it as the difference between watching one agent complete a mission versus seeing the entire intelligence operation unfold across multiple teams, agencies, and even partner organizations.
## Why Value Stream Networks Matter

Here's the uncomfortable truth: optimizing a single value stream in isolation can actually make things worse. You speed up your emergency department triage process, but now the laboratory is overwhelmed. You streamline customer onboarding, but the fraud detection team can't keep up. The bottleneck just moves downstream — or worse, into someone else's domain where you have no visibility.

Value Stream Networks solve this by making the interdependencies explicit. They answer questions like:

- When this value stream executes, what other value streams get triggered?
- Which domains need to coordinate to deliver end-to-end value?
- Where are the handoffs that create delays, errors, or frustration?
- If we change this process, who else needs to know?

## The Model Pattern

![[Emergency Department Domain Value Stream Network.png]]

A Value Stream Network model follows the [[Stealth EA Metamodel]] by combining several key elements:

### Organizational Context

The outermost boundary represents your enterprise or the scope of organizational ownership. Within this, you'll typically see [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain|domains]] that own specific value streams. The containment hierarchy matters — it shows accountability and where governance decisions get made.

In the example above, the Hospital Organization contains multiple domains (Emergency Department, Clinical Support Services, Corporate Services, Inpatient), while Emergency Medical Services sits outside the organizational boundary as a partner.
### The Primary Value Stream

Every Value Stream Network has a protagonist — the primary value stream you're analysing. This is usually decomposed into its [[Value Stream Stage|value stream stages]] to show the progression from trigger event through to value delivery.

The primary value stream sits within its owning domain, making clear who's accountable for its performance. In our example, the Emergency Department Value Stream shows stages from Present through Transfer or Discharge.
### Supporting Value Streams

Here's where it gets interesting. Radiating outward from the primary value stream, you'll see relationships to supporting value streams owned by other domains. These aren't just nice-to-have connections — they're the infrastructure that makes the primary value stream possible.

Supporting value streams typically fall into three categories:

- **Triggered Value Streams**: When a stage in your primary value stream completes, it kicks off a value stream somewhere else. The ED's Assess stage triggers the Laboratory Value Stream. Transfer or Discharge triggers Critical Care or Inpatient value streams.
    
- **Flow Relationships**: Information or work products flow between value streams without necessarily triggering a full value stream execution. Assess might flow information to Pharmacy or Imaging value streams as needed.
    
- **Informing Relationships**: Some value streams don't get triggered but need to be kept informed for continuity or compliance purposes. The Transfer or Discharge stage informs Primary Care so the patient's regular provider knows what happened.
### Extended Enterprise Connections

The model should extend beyond your organizational boundary to show partner value streams that feed into or receive from your primary value stream. Emergency Medical Services in our example operates their own EMS Value Stream that triggers the entire Emergency Department journey.

This is where Domain Driven Design meets business architecture. Your [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]] isn't an island — it exists within a network of collaborating domains, some of which you don't control.

## Key Relationships in the Model

The ArchiMate relationships you'll use most frequently:

|Relationship|Usage|Example|
|---|---|---|
|**Triggers**|One value stream stage causes another value stream to start|Triage triggers Shift Scheduling Value Stream|
|**Flows to**|Work products or information move between value streams|Assess flows to Inpatient Imaging Value Stream|
|**Informs**|One value stream provides information without triggering action|Transfer or Discharge informs Primary Care|
|**Composition**|Domain contains its value streams; Organization contains domains|Hospital Organization contains Emergency Department|

Note that "Triggers" implies a more formal handoff — something happens that causes the receiving value stream to execute. "Flows to" is softer — information or work moves, but doesn't necessarily start a new value stream instance. "Informs" is softer still — communication for awareness rather than action.

## Building Your First Value Stream Network

Ready to map your own network of interdependencies? Here's the approach:

1. **Start with your primary value stream** — Pick the value stream you're analysing. If you don't have it modelled yet, you'll need to define its stages first. The [[Value Stream Mapping]] guidance covers this in detail.
2. **Identify the owning domain** — Which [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]] is accountable for this value stream? That domain becomes your central container.
3. **Walk each stage** — For each value stream stage, ask:
    - What other value streams does this stage trigger?
    - What information flows out to other domains?
    - Who needs to be informed when this stage completes?
    - What value streams must complete before this stage can start?
4. **Add supporting domains** — As you identify connected value streams, add the domains that own them. Group related value streams within their domains.
5. **Extend to partners** — Don't stop at your organizational boundary. What external value streams feed yours? What do you trigger externally?
6. **Test the one-page rule** — Yes, even for networks. If it doesn't fit on one page, you're probably trying to show too much scope. Consider creating multiple views: one for internal dependencies, one for external partnerships, or one per major stakeholder group.

Total time investment: 4-8 hours for a complex domain like Emergency Department, less for simpler value streams. The insights it generates? Often worth months of process improvement efforts.
## When to Use a Value Stream Network

|Use a Value Stream Network When...|Consider Alternative Approaches When...|
|---|---|
|You're optimizing a value stream and need to understand downstream impacts|You're documenting a single value stream in isolation|
|Handoffs between domains are causing delays or quality issues|The value stream operates entirely within one domain|
|You're planning a transformation that will affect multiple domains|You need detailed process-level views (use [[Business Process Modelling]])|
|Executives need to see the "big picture" of how work flows across the organization|You need to analyse capability gaps (use [[Business Capability]] mapping)|
|You're onboarding new staff who need to understand organizational interdependencies|You're doing application portfolio analysis (use [[Application Context Model]])|

## Common Pitfalls

- **Modelling everything at once**: Start with your primary value stream and expand outward. Trying to map every value stream in the organization simultaneously leads to analysis paralysis.
- **Ignoring the extended enterprise**: Your value streams don't exist in isolation from partners, suppliers, and customers. If you stop at your organizational boundary, you're missing half the picture.
- **Confusing triggers with flows**: A trigger starts a value stream. A flow moves information or work. An inform updates someone's awareness. Getting these wrong makes your model misleading.
- **Forgetting the domain boundaries**: Value streams should be contained within their owning domains. If you have value streams floating in space, you haven't finished your [[Enterprise Domain Model]].
- **Over-decomposing supporting streams**: The primary value stream gets decomposed into stages. Supporting value streams usually don't need that level of detail — just show them as complete value streams unless you're analysing a specific handoff.
## Connecting to Other Models

The Value Stream Network doesn't stand alone. It connects to several other Stealth EA deliverables:

- **[[Enterprise Domain Model]]**: Provides the domain structure and organizational context
- **[[Value Stream Mapping]]**: Details the stages within each value stream
- **[[Business Capability]]**: Shows what capabilities enable each value stream stage
- **[[Application Context Model]]**: Reveals which applications support the value streams
- **[[MAD Information Exchange]]**: Documents the information flowing between value streams
## What's Next

Value Stream Networks reveal the choreography of your organization. Once you see how value streams interconnect, you can start asking the strategic questions: Where are the bottlenecks? Which domains are overwhelmed with incoming triggers? Where do handoffs fail?

This sets the stage for genuine optimization — not just making one value stream faster, but improving the flow across the entire network. After all, a chain is only as strong as its weakest link, and a value stream network is only as effective as its most constrained handoff.

The goal isn't architectural perfection. It's operational insight. Because understanding how your organization actually delivers value — across all the domains, handoffs, and partner connections — is the first step to making it better.

---

## Related Concepts

- [[Value Stream]] — Individual value stream guidance
- [[Value Stream Stage]] — Decomposing value streams into stages
- [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]] — Domain modelling fundamentals
- [[Enterprise Domain Model]] — The domain portfolio pattern
- [[Business Capability]] — Capability catalogue guidance
- [[Stealth EA Metamodel]] — The underlying model structure