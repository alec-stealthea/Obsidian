---
type: Solution Concept Model
title: "Solution Concept Model"
description: "A Solution Concept Model is a structural decomposition of an initiative's application landscape showing the applications, conceptual components, information exchanges, and stakeholders within the s..."
timestamp: 2026-06-26T19:19:05Z
---

A Solution Concept Model is a structural decomposition of an initiative's application landscape showing the applications, conceptual components, information exchanges, and stakeholders within the solution boundary. Where an [[Application Context Model]] zooms into a single application, the Solution Concept Model zooms out to show how multiple applications and components work together to address a business need.

Think of it as the "ensemble cast" view versus the "character study." The Application Context Model is a deep dive into one protagonist; the Solution Concept Model shows how the whole team operates together.
The following legend shows the ArchiMate concepts typically seen as part of the Solution Concept Model. See the end of this article for a list of definitions from ArchiMate as well as guidance for usage within this model.
## Solution Concept Model Content

If your solution model needs narrative, organize it into these sections:

- **Stakeholders & Actors** — Who initiates, uses, or receives value from this solution? At this level, group by organizational unit or stakeholder class rather than individual roles. Detailed role breakdowns belong in the [[Application Context Model]] for each application.
- **Solution Boundary** — What's in scope for this initiative? Use a grouping element to clearly delineate what you're proposing versus what already exists. This is the most important visual element in the model—without it, you have an accidental application portfolio diagram.
- **Application Components** — The applications (existing or proposed) that comprise the solution. Existing applications should reference the [[MAD Application Catalogue]] where possible. Proposed components may be conceptual (no product selected yet) or named candidates under evaluation.
- **Information Exchanges** — The critical data flows between components. At this level, focus on the _what_ and _why_, not the _how_. Detailed interface specifications belong in the [[Application Context Model]] for each application. Information exchanges can be further categorized as:
    - **New Interfaces** — Integration points that don't exist today and would be created by this initiative.
    - **Modified Interfaces** — Existing exchanges that would change in scope, frequency, or payload.
    - **Existing Interfaces** — Current integrations that the solution depends on but doesn't change. Include these for context but visually distinguish them.
- **External Touchpoints** — Systems outside the solution boundary that the solution must integrate with. These are usually existing applications that won't change but must be accommodated. Position these outside the solution boundary grouping.
- **Gaps & Drivers** (Optional) — Include Gap elements or annotations showing what current-state limitations this solution addresses. Particularly useful for [[March 6, 2024 LinkedIN Article - Decision-based Evidence Making|Architecture Decision Requests]] where you want to connect the solution back to the problem statement.
## Solution Concept Model Use Cases

The Solution Concept Model can be used across a variety of contexts including:

- **Architecture Decision Request (SBAR)** — Each alternative typically gets its own Solution Concept Model. This allows side-by-side comparison of different approaches. The "do nothing" option may not need a model, but each viable alternative should have one.
- **Project Charter / Statement of Work** — Establishes the technical scope boundary for an initiative. Useful for showing what's in and out of scope before detailed planning begins. This may bring in concepts from other models to reflect overall scope.
- **Investment Proposal** — Provides visual context for funding requests, showing the breadth of change being proposed. Executives can quickly grasp what they're being asked to fund.
- **Vendor Evaluation** — When assessing products, a Solution Concept Model can show how each candidate would fit into the broader application landscape. Each vendor option gets its own model variant.
- **Program Increment Planning** — For larger initiatives spanning multiple releases, shows the target state the teams are working toward. Individual sprints or releases deliver portions of what's shown in the Solution Concept Model.

## Model Guidelines

Creating a compelling model depends on your audience and purpose.

1. **Keep it one page** — If you can't fit it on one screen at readable scale, your initiative scope may be too broad or you're including too much detail. Consider decomposing into multiple [[Solution Concept Model]] (by phase or workstream) or pushing internal application detail down to [[Application Context Model|Application Context Models]].
2. **Show the boundary** — Use a grouping element to clearly distinguish "the solution" from "the surrounding landscape." This is especially important for SBAR alternatives where you want to highlight what's actually changing. Everything inside the boundary is what the initiative delivers; everything outside is context.
3. **Name things consistently** — Existing applications should use names from your [[MAD Application Catalogue]]. Proposed components should follow a "[Verb] [Noun]" or "[Domain] [Function]" pattern until a product is selected. Avoid vendor product names until a selection decision is made.
4. **Label your flows** — Information exchanges at this level should have meaningful labels: what data, what trigger, what direction. Save the technical protocol details (REST, HL7, batch frequency) for lower-level models.
5. **Distinguish current from proposed** — Use clear visual conventions to separate existing applications from proposed components. Options include:
    - Color coding (existing in one color, proposed in another)
    - Annotations or stereotypes
    - Separate groupings within the solution boundary
6. **Date and attribute your work** — Include author, collaborators, date, and version. Solution Concept Models evolve as initiatives progress from concept to delivery. A model from six months ago may no longer reflect current thinking.

## Relationship to Other Models

|Related Model|Relationship|
|---|---|
|[[Application Context Model]]|Each significant application component in the Solution Concept Model _could_ have its own Application Context Model showing internal detail. The Solution Concept Model is the parent structural view.|
|[[Value Stream Mapping\|Value Stream Model]]|A separate behavioral viewpoint showing _how_ the solution supports value delivery. The Solution Concept Model shows _what_ exists structurally; the Value Stream Model shows _how_ it participates in creating value for stakeholders. These are complementary, not competing views.|
|Technology Environments Model|Shows the infrastructure supporting the applications in the Solution Concept Model. Usually developed in parallel or after the Solution Concept is approved.|
|[[MAD Information Exchange\|Information Exchange Model]]|Detailed specification of interfaces shown conceptually in the Solution Concept Model. Developed during detailed design phase.|

## Anti-patterns

- **Drowning in detail** — If you're showing screens, database tables, or API endpoints, you've gone too deep. Push that detail to [[Application Context Model|Application Context Models]] for individual applications.
- **Mixing current and future state without distinction** — A model where you can't tell what exists today versus what's proposed creates confusion. Use clear visual conventions or separate models entirely.
- **Forgetting the boundary** — A Solution Concept Model without a clear scope boundary isn't a solution concept—it's an incomplete application portfolio diagram.
- **Orphaned components** — Every application component should connect to something: a stakeholder, another component, or an external system. Floating boxes suggest incomplete analysis.
- **Vendor names too early** — Using product names before selection creates bias and may limit options. Keep it conceptual until you've made a decision.
- **Showing everything** — Not every interface needs to appear. Focus on the exchanges that are _critical to understanding the solution_, not a comprehensive inventory of every possible touchpoint.

## ArchiMate Concept Descriptions

|Term|ArchiMate Definition|Solution Concept Model Usage|
|---|---|---|
|**Stakeholder**|A **Stakeholder** represents the role of an individual, team, or organization (or classes thereof) that represents their interests in the effects of the architecture.|Groups of users or recipients of the solution's outputs. Usually at a higher level of abstraction than the Application Context Model—organizational units or stakeholder classes rather than individual roles. Position on left (initiators/users) and right (downstream recipients).|
|**Business Role**|A **Business Role** represents the responsibility for performing specific behavior, to which an actor can be assigned, or the part an actor plays in a particular action or event.|Used sparingly at this level. Roles typically appear in more detailed [[Application Context Model|
|**Application Component**|An **Application Component** represents an encapsulation of application functionality aligned to implementation structure, which is modular and replaceable.|The primary building block of the Solution Concept Model. Includes both existing applications (from [[MAD Application Catalogue]]) and proposed/conceptual components. Use nested components to show application modules only when relevant to the solution scope.|
|**Application Service**|An **Application Service** represents an explicitly defined exposed application behavior.|Useful for showing what a component _provides_ to other components or stakeholders, especially for proposed components where internal structure isn't yet defined. Shows the "contract" between components.|
|**Application Interface**|An **Application Interface** represents a point of access where application services are made available to a user, another application component, or a node.|Shows integration points between applications. At Solution Concept level, often simplified to flow relationships with the interface implied. Add explicit interface elements when the integration point itself is architecturally significant.|
|**Data Object**|A **Data Object** represents data structured for automated processing.|Represents the payload of information exchanges between components. Keep at aggregate level (e.g., "Customer Record", "Order Payload") rather than individual fields. Detailed data modeling belongs in lower-level views.|
|**Grouping**|A **Grouping** aggregates or composes concepts that belong together based on some common characteristic.|**Essential** for defining solution boundary—this is what distinguishes a Solution Concept Model from a general application landscape. Also useful for grouping applications by domain, deployment zone, or initiative phase.|
|**Gap**|A **Gap** represents a statement of difference between two states of the architecture.|Optional but powerful for SBAR use cases. Shows what current-state limitation or missing capability the solution addresses. Connects the solution back to the business driver.|
|**Location**|A **Location** represents a conceptual or physical place or position.|Use when deployment geography or network zones are relevant to the solution concept (e.g., cloud vs. on-premise, regional data residency requirements, DMZ placement).|
|**Goal**|A **Goal** represents a high-level statement of intent, direction, or desired end state for an organization and its stakeholders.|Optional. Include when you want to explicitly connect the solution to strategic objectives. Particularly useful in investment proposals.|
|**Outcome**|An **Outcome** represents an end result that has been achieved.|Optional. Represents the measurable results the solution enables. Useful for connecting the solution concept to business case metrics.|