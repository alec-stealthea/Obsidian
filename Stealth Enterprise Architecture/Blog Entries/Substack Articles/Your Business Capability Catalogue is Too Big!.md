---
type: Blog Draft
title: "Your Business Capability Catalogue is Too Big!"
description: "Intelligence agencies learned this lesson the hard way: more data doesn't mean better intelligence."
timestamp: 2026-06-26T19:19:05Z
feature: Pasted image 20260216074642.png
thumbnail: thumbnails/resized/51817cf2f6b6f23bc4697316bc19b398_86cf658e.webp
---
Intelligence agencies learned this lesson the hard way: more data doesn't mean better intelligence. When it comes to business capabilities, we often bite off more than we can chew. Hundreds? Thousands? It's easy to get swept away by the promise of comprehensive capability catalogues, some of which boast over a thousand entries! Even managing a couple of hundred capabilities can feel like your searching for your suspect within a crowded stadium with no facial recognition support.

Here's a secret from the world of intelligence work: the best operatives don't carry filing cabinets full of dossiers into the field. They carry what they need to know to complete the mission. Your business capability catalogue should work the same way — focused, actionable, and ruthlessly curated. Every IMF mission briefing fits on a single tape — here's your target, here's your team, here's your window.  Your capability catalogue should have that same economy: only what serves the mission, nothing that lingers past its usefulness.
## The Means to an End

A business capability catalogue is a means to an end, not the end itself. So, what's the true endgame here? It's about enabling your organisation's value streams. If you haven't read them already, look at my previous posts on [[Domain Driven Design Needs a Higher Floor]] and [[Your Business Capability Map is Missing its Mission Briefing]]. 

A thousand business capabilities sitting in a catalogue are just a very expensive pantry if they're not mapped to how your organisation actually delivers value to customers. So, before diving headfirst into cataloguing every conceivable business capability, ask yourself: does your organisation even have a value stream catalogue? If the answer is no, then hold your horses—you might not be quite ready for that business capability deep dive just yet.
## The Rule of 100

Here's a concrete benchmark that I've found invaluable. When a capability catalogue exceeds 100 items, there's a high probability that you're no longer describing business capabilities. Instead, you're likely describing:
- Business capability instances (how a capability is deployed in a specific context)
- Components of a capability instance (people, process, technology)
- Value stream or value stream stages masquerading as capabilities

One hundred might sound restrictive, but remember—these are enterprise-level capabilities. "Order Management" is a business capability. "Pizza Order Management for Delivery Customers Using the Square POS System" is a capability instance. The first belongs in your catalogue. The second belongs in a value stream model showing how that capability gets instantiated.
## A Pizzeria Reality Check

To make this concrete, let me share a business capability map I developed for a pizzaria enterprise. In the prior articles I have already shared a [[Pizzeria Enterprise Domain Model]] as well as an initial draft of the Order Pizza Value Stream from a Motivation Perspective. This pizzaria has seven business domains: Finance, Administration, Dining Room, Delivery, Marketing, Kitchen, and Procurement[^1]. A reasonable-sized operation with front-of-house, back-of-house, and supply chain concerns. How many business capabilities does it need?\
## Thirty-seven Business Capabilities!

This is a first draft of the business capabilities for the Stealth Pizzeria.  Now, this is a first draft based on the initial value streams that have been modelled, so this may increase over time.
 ![[Pizzeria Business Capability Catalogue.png]]

Thirty-seven capabilities organised across Front of House (Customer Experience, Service Delivery, Merchandising), Back of House (Assets, Knowledge, Finance, Security, Supply Chain, Human Resources, Operations, IT), and Planning & Strategy (Performance, Strategic Planning, Marketing).

And honestly? For a single-location pizzaria, even thirty-seven might be overkill. A smaller operation could probably get by with twenty-five. The point is: a complete, functional business—one that handles customers, makes food, manages suppliers, pays employees, and turns a profit—doesn't need hundreds of capabilities. It needs the right capabilities, mapped to the value streams that matter.
## Top Three Reasons for Business Capability Catalogue Bloat

Let's talk about bloat. No, not the kind that happens after too much pizza. I'm talking about business capability catalogue bloat. It's a real issue, and here are the top three culprits:
### 1. Business Capability Instances Run Amok

In the absence of value streams to provide business context, there's a tendency to go overboard by describing every possible use case of a capability. It's like seeing your capability catalogue as a never-ending Russian doll, where each capability splits into smaller and smaller components.

Remember: capabilities are not a hierarchy—they're a network. The same "Identity Management" capability serves your Order Pizza value stream, your Pizzeria employee onboarding value stream, and your Pizza Supplier Management value stream. You don't need three separate capabilities; you need one capability with three different instances, each serving its respective value stream stage.

That said, there are times it may be useful to expose a business capability instance as part of your overall catalogue.  That time is when you have a true enterprise business capability instance that has been established as a standard.  The most usual enterprise business capability would be Customer Identity Management. Most organisations want to know their customers and how they are interacting across all value streams. This usually means the enterprise has implemented a customer registry using some form of master data management workflows and (hopefully) tools. 
### 2. Information Technology Product Functionality as Business Capabilities

Ever seen the tail wag the dog? That's what happens when the functionality of a specific application starts dictating business capabilities. Applications and tech products should enable business capabilities, not define them. It's like letting your GPS decide your vacation destination—sure, it'll get you somewhere, but is it really where you wanted to go?

When your capability catalogue starts reading like a software feature list—"Workflow Automation," "Dashboard Reporting," "API Integration"—you've crossed from business architecture into solution architecture territory. Those aren't capabilities your business needs; they're how technology might enable the capabilities your business actually needs, like "Performance Monitoring" or "Information Exchange."

The Stealth EA has seen this in far too many business capability catalogues - especially ones being disseminated by product vendors.  It is not just the product vendors though.  This is especially evident when one of the first things that Information Technology architects start mapping applications to business capabilities absent any business context!
### 3. Domains, Value Streams and Business Capabilities

This last example of a mis-identified business capability is when a business capability is really a domain, a value stream or more probably a value stream stage.  Without a value stream catalogue, business capabilities often get used as a stand-in. It's like using C4 when you really need a lock pick.  Sure, it can work, but it's not ideal if you're looking for stealth. Business Capabilities are supposed to support value streams, not replace them.

That said, the reality is that your version of a business capability catalogue will have some nuance to it that usually has to do with the size of your organisation. Let's start with an example from our Pizzeria.  Is Human Resources really a business capability?  If you look at the Enterprise Domain Model, it is listed as a domain, so probably not.  Now is Human Resources a good way to group some Human Resource business capabilities as part of your business capability catalog map?  Absolutely.  In fact, many back office business capabilities end up being a grouper for business capabilities to make the catalogue easier to read at a glance.  It's the same reason that there's a top level of Front of House and Back of House groups. 

Now let's go down to the Value Stream level. Does almost every business need a Recruit Employee Value Stream? Absolutely.  Is there probably an associated Recruitment business capability? Yes.  Is there a Job Post Management business capability?  Probably not as it's more of a value stream stage rather than a business capability.  It is usually at the value stream stage level where business capabilities can be added that my not be appropriate.

## The Bottom Line

Your business capability catalogue isn't a museum collection, it's your mission loadout. Intelligence agencies learned this the hard way: comprehensive doesn't mean useful. Every business capability in your catalogue should earn its place by connecting to the value streams that actually matter to your organisation. If it doesn't serve the mission, it's just expensive dead weight.

Here's your field guide for business capability catalogue reconnaissance:

**If you're staring at a bloated catalogue right now**, start your pruning operation. Look for business capability instances masquerading as enterprise business capabilities. Hunt down value stream stages that somehow promoted themselves. Question every application feature that snuck into the business architecture side of the house. Your catalogue doesn't need to be perfect, it needs to be useful.

**If you don't have a catalogue yet?** Don't start building one until you've created your Enterprise Domain model and have some understanding of your key customer facing value streams. Next week, we'll crack the code on building your first business capability catalogue from scratch.

**Mission principle**: _A business capability catalogue under 100 entries that maps to your value streams beats a thousand-entry catalogue that maps to nothing. Economy of force isn't just good tacti, it's good enterprise architecture._

Until then, if you're staring at catalogue bloat right now, you know what to do. Time to get ruthless.

[^1]: For a more detailed view of the Pizzeria Enterprise Domain Model go to https://stealthea.com/Stealth+Enterprise+Architecture/Case+Studies/Stealth+Pizza/Stealth+Pizzaria+Enterprise+Domain+Model
