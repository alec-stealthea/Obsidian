---
type: Blog Draft
title: "Stop Building your Business Capability Catalogues Backwards"
description: "Start you business architecture journey in the right place"
timestamp: 2026-06-26T19:19:05Z
published: 2026-02-25
---
Start you business architecture journey in the right place

Every intelligence agency has its playbook for building a dossier. The CIA has its Intelligence Cycle, MI6 has its methods, and the Mossad... well, they're not telling. The Open Group has published not one but three guides on business capabilities — and yes, the Stealth EA may have had a hand in them. The Business Architecture Guild's BIZBOK Guide dedicates entire sections to capability mapping methodology. So why write another article on building a business capability catalogue?

Because none of those guides start where you actually need to start. The Stealth EA might know something about that since he has been a contributor to most of those guides. The TOGAF guides walk you through what business capabilities are, how to structure them, and how to align them with planning processes. The BIZBOK Guide provides principles for decomposition and the role of business objects. Both organisations provide excellent references. You should read them!

That said, they assume you've already done the reconnaissance work that makes a business capability catalogue useful rather than decorative. They start with the business capability. The Stealth EA starts with the mission. If you've been following along, you know where this is headed. We've covered why your business capability map needs a mission briefing, why [[Your Business Capability Catalogue is Too Big!]], and how  with the [[The Agile Business Capability]] your agile user stories are already defining business capability instances whether you realise it or not. 

This post is the one we've been building toward: how to actually construct your first business capability catalogue, starting from the domain model and working through your value streams to arrive at a catalogue that earns its keep.
## Start with the Enterprise Domain Model

If you scan the bulk of the business architecture thinking online, business capability catalogues reign supreme.  From a Stealth Enterprise Architecture perspective, launching into building out a business capability catalogue without context will mean lots of re-work later on.

Like in the article [[Domain Driven Design Needs a Higher Floor]], so does your business capability catalogue.  This one-page view of your organisation provides the context you need to start the analysis to be able to create you business capability catalogue.

![[Pizzeria Enterprise Domain Model]]

To make things somewhat easier, it is useful to start with the Front Office, or, in the case of the Stealth Pizzeria example, Front of House domains.  While Back Office (or Back of House) domains are important, the usual critical value streams that need to be optimised are customer facing.
## Map your key value streams

Using the Domain Enterprise model, you then can map out your key Value Stream (or streams) for a given domain.  At this point, it may also be useful to look at any value steam interactions that create a value stream network.  The Value Stream definition provides the Why of the organisation vs. the What we need to deliver value.  At this point, we're following the guidance that was documented in the [Open Group Business Capability Planning Guide](https://pubs.opengroup.org/togaf-standard/business-architecture/business-capability-planning.html).

Elaborating on the Stealth Pizzeria organisation, one of the key value streams in the Kitchen is the Food Preparation Value Stream.  This value stream is triggered by the Order Pizza Delivery Value Stream and serves the Deliver Pizza Value Stream as well as being triggered by and serving the  Restaurant Order Food Order Value Stream.

![[Food Order Preparation Value Stream Network.png]]

At this level, we have the motivation view of the value stream of focus along with the additional value streams that this value stream interacts with to form the value stream network. When you're first creating a business capability catalogue, it's useful to focus on high volume vs. low volume value streams.
## Associate Business Capabilities to Value Stream Stages

Now that you have some candidate value streams, you're finally at the point where you look to create your business capability inventory by mapping business capabilities to value stream stages. The first value stream will start the raw inventory process — and ideally this work is done by the team, not by an individual working in isolation.

![[Food Order Preparation Value Stream - Capability View.png]]

Each value stream will generate a number of business capabilities that need to be added to a curated business capability catalogue.  Ideally, this will be managed using master data processes so that business capabilities that are deprecated or replaced by other business capabilities can have traceability that shows the evolution of the business capability catalogue[^1].  

The curation and maintenance of the business capability catalogue is not a trivial exercise.  Like any data source, good stewardship is key. Yes, you could point an LLM at your value stream and get a good draft, resist that temptation! Building a business capability catalogue and the associated map is as much about the process as it is about the outcome.  This is an opportunity for multi-disciplinary collaboration. Do not throw that opportunity away.
## Organize the Catalogue into Business Capability Map

Now that you have a business capability catalogue, it is useful to create a business capability map. The business capability map makes the business capability catalogue more readable for the practitioners that want to make use of it. The Business Architecture Guild recommends an initial classification of three top layers.  That approach is reasonable, though the Stealth EA likes to use the Enterprise Domain Model to inform the first and second levels of the groups of business capabilities.  Note that at the second level we're not creating business capabilities that are then decomposed into smaller business capabilities. These are groups of business capabilities associated for readability vs. inheritance from a higher level.

The following is an initial example of a business capability catalogue for the Stealth Pizzeria organisation[^2]. The top three groups align to the domain model with a final level one grouping of Planning and Strategy.  Within the back of house group, there are clear groupings that align to back office domains.  For front of house it's not as straight forward.  This is because many front office business capabilities are shared across multiple value streams. The groupings for Front of House need to reflect key dimensions for your enterprise that make sense to group together.

![[Pizzeria Business Capability Map.png]]
## The Bottom Line

Having a business capability catalogue that earns its keep isn't about following a methodology perfectly. It's about starting in the right place and building collaboratively toward something useful.

Start by understanding the highest level of your organisation by creating your enterprise domain model. From there, look at your domain value streams with a particular focus on high-volume, customer-facing value streams. Then you're prepared to start building out your business capability catalogue. Once you're done with that, you'll be prepared for the real work — building out value streams for your domains so they can be more successful.

The most common mistake? Treating business capability catalogue creation as a solo reconnaissance mission. This is team sport. The conversations you have while building it often matter more than the catalogue itself. Those discussions surface assumptions, expose gaps, and build shared understanding that no perfectly structured catalogue can achieve alone.

**Question for the field**: When you've built (or helped build) a business capability catalogue, what was more valuable — the final catalogue or the conversations you had creating it? And where did you start?

[^1]: This is a key feature that is usually missing from Enterprise Architecture tools.
[^2]: For the most current Pizzeria Business Capability Map along with definitions, go www.stealthea.com
