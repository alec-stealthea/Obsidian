---
type: Blog Draft
title: "Your Business Capability Map is Missing its Mission Briefing"
description: "Business Capability Maps are the hot commodity in business architecture."
timestamp: 2026-06-26T19:19:05Z
created: 2025-11-10
Publish Status: Published
Improvements Needed: Add Business Capability Map, Add Domain breakdown
feature: Domain ArchiMate Decomposition into Business Capability Instance Graphic.png
thumbnail: thumbnails/resized/f9d869034e045fc63cb8f65d68220835_b89e22fb.jpg
published: 2026-02-11
Channel: Substack
---
 Business Capability Maps are the hot commodity in business architecture.  Every consulting firm wants to sell you a business capability map, many enterprise architecture tools offer catalogues by the hundreds. Unfortunately, it's like a collection of toys from Q, but you don't know what mission you're on. Business capability maps look perfect from a distance. Clean hierarchies, organization-agnostic, stable over time. It's about 'what the organization does vs. how they do it'. 

But when you try to use them for actual decisions—where should we invest? what's the impact of this system failure? how do we optimize this process?—they shimmer and fade like a mirage. You're left with abstraction soup and stakeholders who can't connect your business capabilities to their operational reality.
## The Seductive Abstraction

The Stealth EA has been there.  Created the Business Capability Map. Sweated the definitions, got the definitions approved, got down to sometimes level five in the hierarchy and.... Great Artwork! The CIO used it in presentations as did many others. We used it for an application request for proposal and the supporting business case. It ended up being a ticky box on a checklist. Got a business capability map and associated catalogue? Yes! Check.  Moving on....

Business Capabilities promise a stable view of "what the business does." The problem? A business capability is the same business problem space viewed from 30,000 feet—too high to see the details that matter for decisions. You can do capability maturity assessments which make the business capability map light up in the usual stop light metaphor. This apparently shows which business capability (instances?) need focus - but why?

Similarly, getting down to the business capability instance level without the full capability instance perspectives of people, process. and tools is incomplete.  For example, link your applications to your business capability catalogue. You've learned almost nothing about how that application creates value and at best have a functional decomposition of what that application does. Put another way, you know the ingredient exists, but you don't know the cooking method, timing, temperature, or what dish you're making.
## The Mission Context

Here's the pattern that may provide more success: **Domain → Value Stream → Stage → Business Capability - Business Capability Instance**
![[Domain ArchiMate Decomposition into Business Capability Instance Graphic.png]]
- **Domains** bound the context of value streams along with domain specific semantics and other [[Stealth Enterprise Architecture/Stealth EA Bookshelf/Domain Driven Design|Domain Driven Design]] concepts.
- **Value streams** and the associated value stream stages provide the link between value and the business capabilities required
- **Business Capabilities** can be mapped at the highest level of abstraction, but eventually they can be mapped to the Business Capability instances level to connect specific people, applications, and business objects at each stage

Without the value stream perspective, a business capability is just an abstraction in isolation. With the value stream or the higher level domain perspective, you have context to start building out your business capability catalogue and associated map.
## Why Domain Models Change Everything

In an earlier LinkedIn blog post, there was a review of the usefulness  [[Business Architecture and Domain Driven Design]].  For some additional context, the Stealth EA website has two candidate industry domain models as examples:
- [[Generic Retail Enterprise Domain Model||Retail Enterprise Domain Model]] and the associated [[Retail Business Capability Map]];
- [[Hospital Enterprise Domain Model]] and the associated [[Hospital Business Capability Map]]

Having the Enterprise Domain model allows you to put the Business Capability Catalogue into context.  Since Domains are collections of Value Streams as well as some Knowledge Management specific business capabilities, they help you see if you're getting down too far in your Business Capability Catalogue. If you have a business capability that's unique for a given domain, ask the question - should you bring that up a level and treat that as a business capability instance?

The Stealth EA proposed that while Domains may be groupings of business capabilities - especially for Back Office domains, they should not be business capabilities themselves.  For example, Information Technology Management may be a grouping of business capabilities in the Business Capability Catalogue, but we need to go down a level to get meaningful business capabilities that are unique to the IT Domain.

Another key question to ask is, "Is this really a business capability or a value stream?" To be sure, the answer may be one or the other depending on your business architecture.  The key is - which one is it for your organization?  One example for Human Resources is Hire Employee Value Stream vs. Recruitment Management Business Capability.  In a larger organization it may be a value stream. In a smaller organization, it is a business capability enabled by LinkedIN for a particular hiring Manager following an ad hoc process.

## The Bottom Line

Business capability maps aren't wrong, they're incomplete. It's like having Robin, but no Batman.  The focus on business capability maps persists because abstractions are easier to create than understanding operational models. But abstractions don't help people make decisions.  Stop building business capability hierarchies in isolation. Start with business domains, understand the value streams.  Then you're ready for taking things to the next level. 

Have you built a capability map that actually influenced a major decision by itself? Or is it living in PowerPoint purgatory alongside your org charts from 2019? What made the difference—or what would have? Drop a comment, especially if your experience contradicts ours.