---
type: Architecture Artifact
artifact-class: Catalog
title: "MAD Catalogues - Your Survival Guide to Enterprise Complexity"
description: "Welcome to the world of Master Architecture Data (MAD), where we take the Byzantine complexity of modern organizations and try to make sense of it without losing our minds."
timestamp: 2026-06-26T19:19:05Z
---


# MAD Catalogues - Your Survival Guide to Enterprise Complexity

Welcome to the world of Master Architecture Data (MAD), where we take the Byzantine complexity of modern organizations and try to make sense of it without losing our minds. Think of these catalogues as your architectural survival kit - the essential tools that help you navigate the labyrinth of enterprise complexity without needing a PhD in organizational archaeology.

As explored in the [[Stealth EA/Blog Entries/I must be MAD!]] post, maintaining these catalogues properly is like having a really good map in a city where the streets keep changing names and occasionally disappear entirely. The value becomes apparent when you're trying to answer questions like "Why did that change break everything?" or "How exactly are we spending $2 million a year on software nobody can identify?"
## The Essential MAD Catalogues (in order of survival priority)

### **[[MAD Business Domains|Domains]]** - The Foundation That Actually Matters

This should be your first stop on the MAD journey. Think of business domains as the stable organizational DNA that survives management reshuffles, budget cycles, and the latest "transformation initiative." While organization charts change faster than fashion trends, business domains represent what your organization actually _does_ - regardless of who's currently doing it or what they're calling themselves this quarter.

Following the [[Enterprise Domain Model]] approach isn't just academic exercise - it's organizational sanity preservation. Because if you can't figure out what business you're in, good luck explaining anything else.
### **[[MAD Application Catalogue|Applications]]** - Where the Rubber Meets the Digital Road

Usually the first catalogue people maintain because, let's face it, applications are what everyone complains about. This catalogue focuses on _business_ applications - the ones that actually do stuff for the organization, not the seventeen different versions of Office that somehow got installed.

This is where you track the applications that matter, the ones that sort of matter, and the ones that nobody's brave enough to turn off because "what if something breaks?" Spoiler alert: something will break, but at least you'll know what it was supposed to be doing.
### **[[MAD Business Capability Catalog|Business Capability]]** - The Secret Sauce of Business Architecture

Essential if you're serious about [[Business Architecture]] and absolutely critical if you're modelling [[Value Streams]]. This catalogue answers the fundamental question: "What can our organization actually do?"

It's the difference between knowing you have a Human Resources Domain and understanding that you have capabilities for Recruiting new people into the organization, 

### **[[MAD Information Exchange|Information Exchange]]** - The Data Highway (and Its Traffic Jams)

Here's where we track how information actually moves around the organization - the digital equivalent of watching traffic patterns from a helicopter. This captures all the ways applications talk to each other, share data, and occasionally argue about data formats.

Fair warning: this is difficult to maintain and usually only captures the "official" exchanges managed by integration teams. The real challenge is discovering all the creative ways people move data around when the official channels don't work. Think of it as mapping both the highways and the goat paths.

Usually updated when modelling the [[Application Information Exchange Model]] view, which is architect-speak for "we're trying to figure out why the monthly report takes three weeks to generate."

### **[[MAD Organization|Organizations]]** - The Extended Family Tree

No organization is an island (despite what some executives think). This catalogue tracks all the other organizations in your ecosystem - vendors, partners, regulators, and that company you accidentally signed a 10-year contract with in 2015 that expired, yet they are still working with you.

This isn't just about legal compliance (though lawyers love it); it's about understanding your organizational dependencies. When you discover that your critical application is supported by a vendor that was acquired by a company that merged with a firm nobody's heard of, you'll appreciate having this catalogue.

May include drilling down into departments, because sometimes you need to know whether to call "IT" or "Information Systems" or "Digital Solutions" (all different departments, naturally).

### **[[MAD Locations|Locations]]** - Where in the World Is Your Enterprise?

Critical for understanding where stuff actually happens. This ranges from "we have offices in twelve countries" down to "the server is in room 237B, rack 3, and only Janet has the key."

Locations also include virtual regions for applications, because in our cloud-first world, "location" can mean "AWS us-east-1" or "that data center in Virginia that we're pretty sure still exists." Geography matters more than ever when you're dealing with data residency requirements and latency concerns.

### **[[MAD Relationships]]** - Where the Magic Happens (Or Doesn't)

This is the real secret sauce of MAD - tracking how all these entities actually relate to each other. It's not enough to know you have applications, capabilities, and organizations; you need to understand how they're connected, dependent, and occasionally at war with each other.

Can be managed in an Enterprise Architecture tool (if you're lucky enough to have one that people actually use) or through a MAD database with a crowdsourced website (if you're brave enough to trust the crowd). Either way, relationships are where complexity lives, and complexity is where things break in interesting ways.

### **[[MAD Time|Time]]** - The Fourth Dimension of Architecture

Enterprise Architecture is fundamentally about modeling the future - what we want to build, change, or (occasionally) eliminate. But if you maintain MAD data long enough, it becomes invaluable for understanding the past too.

Nothing quite says "I told you so" like being able to show exactly when and why a particular architectural decision was made. Plus, temporal data helps answer questions like "When did we start supporting seventeen different authentication systems?" and "Why do we still have applications from the Clinton administration?"

## The MAD Reality Check

These catalogues aren't academic exercises or compliance theater - they're practical tools for making better decisions about technology, organization, and investment. The goal isn't perfect documentation (which is impossible anyway) but having enough accurate information to avoid expensive mistakes and spot opportunities for improvement.

The Stealth EA gains credibility by having access to data that is current, correct and consistent.  If this data needs to be manually updated, it will rapidly deteriorate if not maintained.  Where possible, MAD Entity or relationships data tables need to be sourced from applications of record, or even better applications of authority.

Remember: the best MAD catalogue is one that people actually use to make real decisions. Everything else is just enterprise architecture archaeology.

_Now go forth and catalog - stealthily, strategically, and with just enough detail to be useful without driving yourself mad._
