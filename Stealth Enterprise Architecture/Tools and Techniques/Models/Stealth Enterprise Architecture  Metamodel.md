---
feature: Stealth Enterprise Architecture Metamodel.png
Publish Status: Draft
created: 2025-10-01
---
# Stealth EA Metamodel

While most enterprise architects get lost in debates about which framework reigns supreme, at Stealth EA we've taken a different approach. Instead of getting caught up in methodology wars, we've focused on creating something that actually works based on open standards — namely ArchiMate. Combined with the open source [ArchiMate tool - Archi](https://www.archimatetool.com/) you have the base for your own Stealth EA practice. If you have a whole field office, adding coArchi will provide you with the ability to share your spycraft investigations. But to do that, you need the cipher to be able to understand each other. Enter the Enterprise Architecture Metamodel.
## Why a Metamodel Matters

A metamodel is essentially a model of models — it defines the rules, relationships, and constraints that govern how we build our architectural representations. It's like having a style guide for your architecture practice, but with the added benefit of ensuring consistency, enabling automation, and making your models actually useful instead of just [[Do your enterprise architecture models look 'marvellous'|looking good]].

- **Ensure Consistency**: Every model we create follows the same logical structure, making them easier to understand and maintain
- **Enable Scalability**: As your architecture practice grows, the metamodel provides guardrails that prevent [KAOS](https://en.wikipedia.org/wiki/Get_Smart)
- **Support Automation**: Tools can work with standardized structures to generate insights, reports, and even other models
- **[[The Great Divide of EA Modelling|Bridge the Great Divide]]**: Create both detailed ArchiMate models and executive-friendly "marchitecture" from the same underlying structure

## The Stealth EA Metamodel

![[Stealth Enterprise Architecture Metamodel.png]]

This metamodel is deliberately minimalist. We're not trying to model everything ArchiMate can express — we're focusing on the concepts that actually matter for business architecture and capability-based planning. Like any good operative, we travel light and carry only what we need for the mission.
## The Core Stealth EA Guidance within the Metamodel

This metamodel embodies three key Stealth EA concepts:
1. **Business Capabilities without value streams are ingredients without recipes.** You know what you have, but not how it creates value. That's why Business Capability connects to Value Stream Stage, not floating in abstract space.
2. **Domains provide context, not just containers.** Business Domain isn't just an org chart proxy — it realizes its purpose through the value streams it delivers. Front-office domains organize around value streams; back-office domains are more capability-centric but still own value streams.
3. **Instantiation happens in the real world.** The distinction between Business Capability (what we need to be able to do) and Business Capability Instance (the actual implementation serving a specific context) is where architecture meets operations.
## Stealth EA Specializations

The Stealth EA metamodel builds upon the solid foundation of ArchiMate while introducing strategic specializations that reflect how modern organizations actually work. We're not reinventing the wheel; we're adding racing stripes and a turbo engine. Note that specializing an ArchiMate element is something supported within Archi. 
### Business Domain (Business Function Specialization)

<div align="center"><em>The organizational equivalent of architectural neighbourhoods</em></div>

In ArchiMate, Business Function represents "a collection of business behaviour based on a chosen set of criteria." Our [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]] specialization sharpens this into the bounded contexts that Eric Evans wrote about in Domain Driven Design, but applied to your entire enterprise architecture.

Domains represent logical groupings that typically align with organizational boundaries or major business areas. Unlike generic business functions, domains in our metamodel serve as containers that realize value through their value streams. They provide the context for governance, funding, and strategic decision-making. Think of them as the architectural equivalent of city districts — each with its own character, rules, and local governance.

The key relationship: **Business Domain realizes Value Stream**. A domain doesn't exist in isolation — it exists because it delivers value through the streams it owns.
### Business Capability Instance (Business Capability Specialization)

<div align="center"><em>Where the rubber meets the road</em></div>

While ArchiMate's business capabilities are abstract concepts representing what an organization must be able to do, our Capability Instances represent the actual implementations of those capabilities within specific organizational contexts. This is where we bridge the gap between the "what" (capability) and the "how" (implementation).

It's the difference between having a capability for "Customer Service" and actually implementing "Customer Service for Premium Healthcare Members in the Pacific Northwest." The abstract capability appears once in your catalogue; the instances appear wherever that capability is actually deployed to serve value streams.

Key relationships: **Business Capability Instance** specializes **Business Capability**, is realized by **Business Process** and **Business Object**, and is associated to **Product Release** for temporal planning.

### Value Stream Stage (Value Stream Specialization)

<div align="center"><em>Breaking down value delivery into actionable chunks</em></div>

Value streams in ArchiMate can be somewhat monolithic. Our Value Stream Stage allows us to decompose value streams into discrete, measurable stages that align with how work actually flows through an organization. Each stage can be analysed, optimised, and governed independently while maintaining its connection to the overall value delivery chain.

Key relationships: **Value Stream** is composed of **Value Stream Stages**, which are served by **Business Capabilities** and associated to **Locations** where value delivery happens.

## Metamodel Elements by ArchiMate Layer

### Motivation Layer (Purple)

The "why" behind everything else. These elements connect business direction to architectural decisions.

| Element     | Purpose                                                         | Key Relationships                                             |
| ----------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| **Driver**  | External or internal conditions that create the need for change | Influences Goal                                               |
| **Goal**    | A desired end state the organization wants to achieve           | Realized by Value Stream, Realized by Outcome                 |
| **Outcome** | A measurable result that demonstrates goal achievement          | Realized by Value Stream                                      |
| **Value**   | The worth or importance of something to a stakeholder           | Influenced by Business Service, Associated to Business Domain |

### Strategy Layer (Gold/Orange)

The heart of business architecture — where value gets created and delivered

| Element                              | Purpose                                                                                                    | Key Relationships                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **[[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]]**              | A bounded context that realizes value through its value streams. _Specializes Business Function._          | Realizes Value Stream, Influenced by Stakeholder                                                     |
| **[[Value Stream]]**                 | An end-to-end sequence of activities that delivers value to a stakeholder                                  | Triggered by Business Event, Composed of Value Stage, Realizes Outcome, Realized by Business Service |
| **Value Stage**                      | A discrete phase within a value stream that creates incremental value. _Specializes Value Stream._         | Served by Business Capability, Associated to Location                                                |
| **[[Business Capability]]**          | What the organization must be able to do to deliver value — the "what" not the "how"                       | Serves Value Stage, Specialized by Business Capability Instance                                      |
| **[[Business Capability Instance]]** | A specific implementation of a capability serving a particular context. _Specializes Business Capability._ | Realized by Business Process, Realized by Business Object, Associated to Product Release             |
| **Business Event**                   | A trigger that initiates a value stream                                                                    | Triggers Value Stream                                                                                |

### Business Layer (Yellow)

The operational elements that execute business architecture.

|Element|Purpose|Key Relationships|
|---|---|---|
|**Business Actor**|A person or organizational unit that performs business roles|Performs Business Role|
|**Business Role**|A responsibility for specific behaviour assigned to an actor|Assigned to Stakeholder, Assigned to Business Process|
|**Stakeholder**|A party with an interest in the organization's activities|Influences Business Domain, Composed of Location, Assigned to Business Role|
|**Business Process**|A sequence of behaviours that achieves a specific result|Realizes Business Capability Instance|
|**Business Object**|A concept relevant from a business perspective|Realizes Business Capability Instance, Represented by Data Object|
|**Business Service**|Externally visible functionality offered to stakeholders|Influences Value, Realized by Value Stream|
|**Location**|A physical place or position|Associated to Value Stage, Composed into Stakeholder|

### Application Layer (Cyan)

The digital enablement of business capabilities.

|Element|Purpose|Key Relationships|
|---|---|---|
|**Application Component**|A modular, deployable unit of application functionality|Serves Node, Serves Business Process|
|**Application Function**|Application behaviour that serves business needs|Serves Application Component|
|**Data Object**|Data structured for automated processing|Represents Business Object, Accessed by Application Function|
|**Node**|A computational resource hosting application components|Served by Application Component, Associated to Location|

### Implementation Layer (Pink)

The bridge between architecture and delivery.

| Element             | Purpose                                            | Key Relationships                          |
| ------------------- | -------------------------------------------------- | ------------------------------------------ |
| **Product Release** | A specific version of deployed business capability | Associated to Business Capability Instance |

## The Art of Metamodel Abstraction

Here's where the Stealth EA philosophy really shines. This metamodel gives us the precision of a Swiss engineer but the presentation flexibility of a master storyteller. We can use the same underlying structure to create:

- **Detailed ArchiMate Models**: For the architects and analysts who need to see every relationship and constraint
- **Executive Dashboards**: One-page visualizations that highlight strategic insights without overwhelming decision-makers
- **Domain-Specific Views**: Focused models that show just what each stakeholder needs to see

It's the architectural equivalent of having one dataset that can generate both a comprehensive financial statement and a simple profit-and-loss summary.

## From Metamodel to Reality: The Stealth EA Model Ecosystem

This metamodel serves as the foundation for an expanding ecosystem of specialized models that address real-world architectural challenges:

- **[[Enterprise Domain Model]]**: The domain portfolio pattern for understanding your organization
- **[[Application Context Model]]**: Connecting business capabilities to application landscapes
- **[[Application Environments Model]]**: Mapping deployment patterns and technical constraints
- **[[Solution Concept Model]]**: Bridging from current state through transition to target state

## Why This Matters for Your Practice

Whether you're a solo consultant like our fearless leader or part of a large enterprise architecture team, having a well-defined metamodel is like having a good suit — it makes everything else look better and work more smoothly.

- **For Solo Practitioners**: It ensures consistency across client engagements and enables you to build reusable assets and accelerators.
- **For Enterprise Teams**: It provides the framework for collaboration, knowledge sharing, and tool integration that prevents your architecture practice from becoming a Tower of Babel.
- **For Stakeholders**: It means they get models that actually make sense together, tell a coherent story, and support decision-making rather than just checking compliance boxes.

## Implementing in Archi

For those using Archi as their modelling tool:

1. **Create Specializations** — Define Business Domain as a specialization of Business Function, Value Stream Stage as a specialization of Value Stream, and Business Capability Instance as a specialization of Business Capability
2. **Custom Icons** — Consider creating distinct icons for your specializations to visually differentiate them in views
3. **Property Definitions** — Add custom properties aligned with your [[MAD Business Capability|MAD catalogues]] for consistent metadata
4. **Viewpoints** — Create viewpoints that show specific relationship patterns (Value Delivery, Domain Architecture, Capability Planning)

## Related Concepts

- [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]] — Deep dive into domain modelling
- [[Value Stream]] — How to identify and model value streams
- [[Business Capability]] — Capability catalogue guidance
- [[Business Capability Instance]] — When and how to instantiate capabilities
- [[MAD Business Capability|MAD Business Capability Catalogue]] — Master data management for capabilities
- [[Enterprise Domain Model]] — The domain portfolio pattern

## The Road Ahead

This metamodel isn't a monument to perfection — it's a living framework that evolves with the practice. As we extend it to cover application landscapes, technology architecture, and solution design, we'll maintain the same principles that guide all Stealth EA work:

1. **Apply what works best** for where you and your organization are at
2. **Use the tools you have** at your disposal
3. **Stay relevant** to your stakeholders

Because at the end of the day, the best metamodel is the one that helps people make better decisions and build better systems.

And remember — while other architects are still arguing about which framework to use, we're busy building something that actually works. That's the Stealth EA way: less arguing, more doing, and always with just enough humour to keep it interesting.

Think of this metamodel as the backstage blueprint that makes the magic happen. While your stakeholders see our beautifully crafted one-page models (because yes, we're still obsessed with keeping things digestible), this metamodel is the Swiss watchmaker's precision that ensures every gear, every relationship, and every abstraction layer works in perfect harmony.