---
type: Reference
title: "Business Process Model"
description: "Business process modelling is an essential skill for Architects and Business Analysts."
timestamp: 2026-06-26T19:19:05Z
---

Business process modelling is an essential skill for Architects and Business Analysts. Business Process Modelling within enterprise architecture means that the business process model aligns to other Enterprise Architecture deliverables and techniques like [[Value Streams]] and [[Application Context Model]].
## Business Process Model and Notation (BPMN)

The most popular modelling language is Business Process Model and Notation (BPMN), the standard maintained by the Object Management Group (OMG). Business process modelling usually starts with a swim lane by actor. Within the swim lane are components for start, stop, tasks, triggers, and decision points[1](#user-content-fn-1).

For Stealth EA, we use [[User Story|user stories]] for each of the tasks. This reflects the Stealth EA premise that a user story represents a specific instance of a business capability.
## The Stealth EA Difference: Boundaries Through Enterprise Architecture

Here's the problem with pure BPMN: you'll find yourself drowning in unlimited detail with no natural boundaries or constraints. I've seen process models that span dozens of pages, with sub-processes that branch into more sub-processes, until nobody remembers what problem they were trying to solve.

By leveraging Business Architecture techniques, you create natural boundaries that make business process models actually useful. There are two main connection points:

1. Constraining a business process within a value stream stage
2. Constraining a process within a Business Capability context
## Three Approaches to EA-Aligned Process Models

### Value Stream Stage Business Process Model
The Value Stream provides the means of aligning the business process to the goals and objectives of the Value Stream. Additionally, the business process inherits the start and stop conditions from the value stream stage definitions.

Here's the magic: this usually means the business process fits on one page at a readable scale. If you find yourself shrinking fonts or expanding across multiple pages, that's your signal. You've probably got multiple value stream stages masquerading as one. Break it up. Similarly, if you can't find enough actors and user stories to fill a meaningful process view, maybe you're looking at something that should be combined with adjacent stages.

The one-page principle isn't arbitrary—it reflects the natural scope of work that flows through a single stage of value creation. Think of it as the [[June 19, 2024 LinkedIn Article - The Power of One Page Models|Power of One Page Models]] in action.
### Business Capability Instance Business Process Model
Some [[User Story|User Stories]] are complicated. Maybe there are multiple scenarios, or the logic to meet the acceptance criteria is gnarly enough that you need to document it as a business process logic model.

Even if the Value Stream Stage has been mapped to [[Business Capability|business capabilities]], the business process model focuses on the specific [[Value Stage Capability Instance Model|business capability instance]] aligned to the actor. This is where you zoom into the "how" of executing a particular capability for a particular role. Think of it as taking one task from the swim lane and exploding it to show all the decision logic underneath.
### Special Case: Application as Actor
Sometimes an application is a person too. The most common example? Information Exchange workflows. There's a complete workflow that starts with a trigger, creates the payload, exchanges information with another application, and ends the transaction.

For information exchanges specifically, you might use Business Process Modeling Language (BPML) rather than BPMN, as BPML is designed for modeling the technical orchestration of system-to-system exchanges. In Scaled Agile terms, this is an enabling story—no explicit human user. The application gets its own swim lane, showing how systems orchestrate work independently.
## Connecting to Application Development
This is where business process models earn their keep with your development teams.
### Application Functions as Tools
If we consider that an Application Function represents a user interface touchpoint[2](#user-content-fn-2), then the 'tool' part of the [[User Story|user story]] is the Application Function. Not every user story needs an application as a tool, but let's be honest—in today's digital world, it usually does.

This means your key conversation as the business process model author is with the application developers building or maintaining the applications that enable the value streams and stages. The business process model becomes your bridge document—business-friendly enough to validate with stakeholders, yet detailed enough to inform application design conversations.
## When to Use Which Approach

| **Use Value Stream Stage Business Process Model**                                                                                                                                                                | **Use Business Capability Instance Business Process Model**                                                                                                                                      | **Include Applications as Actors**                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| - You need to show how multiple actors collaborate to deliver a stage of value<br>- You're designing or optimizing a cross-functional workflow<br>- You want to see the complete picture of a value stream stage | - A single user story has complex logic or multiple scenarios<br>- You need to document detailed acceptance criteria<br>- You're working with developers on a specific capability implementation | - You have system-to-system workflows without human intervention<br>- You need to document enabling stories or technical workflows<br>- Integration patterns are a key part of the value delivery<br>- Consider using BPML for detailed information exchange orchestration |
## Common Pitfalls to Avoid

- **Modelling everything**: Not every process needs a detailed model. Focus on what's complex, new, or being changed. The rest? A simple list might do.
- **Ignoring the one-page test**: If it doesn't fit on one page, you probably haven't found the right boundaries yet. Or you're trying to boil the ocean.
- **Forgetting the EA connections**: A process model without links to capabilities, value streams, or applications is just a pretty diagram—not enterprise architecture. Don't waste your time.
- **Perfect before useful**: Start with good enough and refine based on feedback from both business stakeholders and developers. You're aiming for [[February 28, 2024 LinkedIn Article - All models are wrong, some are useful|useful, not perfect]].

---

## Footnotes

1. BPMN has many more specialized activities that can be used. This is a proposed smaller subset that works in most situations. Don't get fancy unless you need to. [↩](#user-content-fnref-1)
2. This includes traditional screens, but also API endpoints, mobile interfaces, or any point where functionality is accessed. Background batch processes and automated services are typically modelled as application actors rather than application functions. [↩](#user-content-fnref-2)