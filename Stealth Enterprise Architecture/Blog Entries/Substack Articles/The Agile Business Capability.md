---
type: Blog Draft
title: "The Agile Business Capability"
description: "Your agile user stories are more strategic than you think."
timestamp: 2026-06-26T19:19:05Z
feature: Online Pizza Order Workflow.png
published: 2026-01-21
Channel: Substack
---
---

Your agile user stories are more strategic than you think.

Every sprint planning, you're writing user stories as some variation of: _"As a [role], I need a [tool] to achieve an [outcome]."_ It's become so routine that we forget to ask what we're actually describing. Here's a thought that might change how you see your backlog: that user story template isn't just a requirement format. It's a definition of how you're implementing an organisational business capability.
## The accidental double agents?

Over in the enterprise architecture world, there's a concept called a [[Business Capability]]. The formal definition? _A collection of people, processes, and tools that achieve a business outcome._

Does this sound familiar?

| User Story Component         | Business Capability Instance |
| ---------------------------- | ---------------------------- |
| Role ("As a...")             | People                       |
| Tool ("I need...")           | Tools / Applications         |
| Outcome ("so that I can...") | Business Outcome             |

When you write "As a _pizzeria customer_, I need the _ability to order my pizza online_ so that I can _get my pizza delivered or ready for pickup when expected_," you're not just capturing a requirement[^1]. You're describing who, what and why your organisation is instantiating the Order Management business capability as Online Pizza Order Management.

So now, let's say that you've captured that user story within a business process model with role-based swim lanes. I have used ArchiMate for the business process model, with a specialisation for the Business Capability Instance to define the user stories. This provides a workflow context and also allows you to see potential interactions with other user stories like the available menu, any past order preferences, etc.

![[Online Pizza Order Workflow.png]]

### The business capability value stream connection

What's a [[Value Streams|value stream]]? In business architecture terms, it's the end-to-end flow of activities that delivers value to a stakeholder—broken into stages, each enabled by business capabilities. To link to the user story level of detail, we need to model to the business capability instance level of detail.

For those not familiar with value streams, I am documenting a value stage within an overall value stream. I am using ArchiMate to document the value stream model. There is an overall 'business event' that triggers the value stream to execute. We also have a 'stakeholder' for the value stream who also performs a role within the value stream stage. The value stream stage itself has a number of business capabilities required and a value to the stakeholder that marks the end of the value stage. It also contributes to the overall value stream value to the customer of getting the pizza they ordered.

Below the business capability view, I have expanded it into a role-based view of the same model, but now introduced the concept of the business capability instance that will support the articulation of the business capability within the context of the workflow and the role responsible for the workflow.

An instantiated value stream is essentially a sequence of user stories, flowing from trigger to outcome. To better illustrate how the dots are connecting the value stream to the workflow, I have added the workflow into the model.

![[Create Pizza Order Value Stream Stage - role view.png]]

Think about that next time you're developing stories. That horizontal flow across your story map? It's a value stream broken down into stages. Those vertical columns of related stories? They're capability instances. [Jeff Patton](https://jpattonassociates.com/) may not have used the same terminology, but user story development is business capability planning in disguise[^2].

### Why this matters beyond semantics

"Great," you might say, "another framework I don't need." Fair enough. But consider what happens when you see user stories this way:

- **Your flat backlog suddenly has structure.** Those 200 stories aren't just a prioritised list—they're instances of maybe 15–20 organisational business capabilities. Some business capabilities have dozens of stories linked to them. Others have none. That imbalance tells you something about where your organisation is investing.
- **Strategic conversations become possible.** When the business asks "how are we improving our order management business capability?" you can point to the cluster of stories that instantiate it, show what's been delivered, and identify gaps—all without translating between "business speak" and "agile speak."
- **Dependencies reveal themselves.** Stories that share a capability often have hidden dependencies. If three teams are all writing stories that instantiate Order Management, they're probably stepping on each other's toes whether they know it or not.
- **Process motivation emerges.** A value stream provides what ArchiMate describes as Motivation—the goals, objectives, and value that justify _why_ we're building what we're building. Your user stories gain purpose beyond the sprint.

### Practical application

**For product managers:** Your product roadmap is a business capability investment plan whether you call it that or not. Try mapping your backlog to the value streams they enhance, then ask three questions:

1. **Coverage:** Which business capabilities have active stories? Which are neglected? If customers complain about invoicing but you have zero stories touching Payment Processing, that's your investment gap visualised.
2. **Depth vs. breadth:** Are you spreading thin across many business capabilities or going deep on a few? Neither is wrong, but it should be intentional.
3. **Value stream enhancement:** For each business capability in the value stream, are your stories mostly _establishing_ it (building the foundation), _extending_ it (adding features), or _optimising_ it (improving efficiency)? This reveals your portfolio's strategic posture.

This lens transforms backlog grooming from "what's next" into "what capability are we investing in and why."

**For scrum masters:** When sprint planning feels like Tetris without the picture on the box, business capabilities provide the missing frame. Try this: before the next planning session, group candidate stories by the value stream stage they are aligned to. You'll often discover:

- **Clustering:** Multiple stories touching the same value stage suggest a coherent sprint theme rather than a scattered grab-bag.
- **Hidden dependencies:** Stories sharing a business capability often have integration risks the backlog doesn't surface. If three stories all enhance Order Management, they're probably touching the same application functionality.
- **Team load balancing:** When one business capability dominates the sprint, you're building concentrated expertise but also concentrated risk as you may be impacting multiple value streams at the same time when you go to deploy. When capabilities are scattered, context-switching costs rise.

The business capability lens won't replace your velocity metrics, but it adds a _what are we building_ dimension to _how much are we building_.

**For developers:** Ever wonder why that "simple" story touched fifteen services? It probably crossed multiple value streams that leveraged the same business capability that was instantiated by your product—and those boundaries often (should) align with service boundaries, team boundaries, and data ownership.

Before diving into implementation, ask:

- **Which business capability does this story enhance and what value streams are impacted?** This tells you which domains you're impacting.
- **Does it interact with other business capabilities?** Each additional capability likely means additional services, additional data sources, and additional teams to coordinate with.
- **Who else is working in this business capability space?** If three teams have stories enhancing Order Management this sprint, you're heading for merge conflicts and API version headaches.

The business capability model is essentially a bounded context map with business names. If your architecture follows domain-driven principles, capabilities show you where the seams should be—and where integration complexity lives.

**For anyone doing SAFe:** The Stealth EA has been interested in Scaled Agile for a while now. [Dean Leffingwell](https://www.linkedin.com/in/deanleffingwell/) and the [SAFe Framework](https://framework.scaledagile.com/about) he co-created have developed a well thought out method for larger organisations. If you're using SAFe, you're already halfway there. I will admit that there's a bit of a terminology issue around the term capability. This is why the Stealth EA always differentiates between a business capability and other uses of the term. In general, SAFe is an (IT) product development methodology. In that context, a product capability is what in ArchiMate we would call an Application Component. The SAFe decomposition method would stand as follows:

- **Portfolio Epics** are decomposed into Product Capabilities—what ArchiMate would call Application Functions or Components.
    - **Large Solution Product Capabilities** — These are usually application components that typically span multiple product teams and need to be coordinated as part of one or more Agile Release Trains (ART).
        - **ART Features** — A collection of Stories that fit within one Program Increment[^3] and (should) be sized to deliver incremental value for the value stream(s) that will be enhanced.
            - **Product Team Story** — This is where the product team instantiates the user story in the form of an application function to satisfy the user story (aka business capability instance).

### The dead drop we didn't know we needed

Agile practitioners and enterprise architects have been running parallel operations on the same mission. We've optimised for local coherence. Agile teams perfecting their ceremonies, architects perfecting their models, while the end-to-end picture suffers.

User stories and business capabilities aren't competing concepts. They're the same concept from different perspectives. The user story is the ground-level view: specific, contextual, implementable for an individual role. The business capability is the satellite view: abstract, stable, strategic.

When you connect them, your sprint work has strategic context, and strategic planning has implementation traceability.

No translation layer required.

### Try this tomorrow

Next time you're writing a user story, ask yourself: "What organisational business capability does this enhance?" Better yet, what Value Streams will this business capability enhancement impact?  If you can't answer, you might be building something that doesn't connect to how your organisation actually delivers value.

And if that question seems hard to answer, maybe that's the most valuable insight of all.

---

_Do your user stories connect to something bigger, or do they float in backlog limbo? I'm curious how other teams think about this._

[^1]: For the Stealth EA, requirement is a four-letter word. Mostly because I have seen far too many laundry lists of functional and non-functional 'requirements' with little to no traceability or any structure that makes it easy to understand how they impact the solution. I much prefer acceptance criteria or specifications, but that's for another post.

[^2]: If you haven't read his book _[User Story Mapping: Discover the Whole Story, Build the Right Product](https://www.oreilly.com/library/view/user-story-mapping/9781491904893/)_, it's essential reading for anyone doing product work.

[^3]: Though, in the Stealth EA experience, a Program Increment may develop a new feature that can be tested, most larger organisations end up having a release that is more of an Agile Waterfall. This is a collection of Features across multiple product streams and maybe multiple value streams that need to be tested and have people trained.
