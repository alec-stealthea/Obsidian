---
type: Blog Draft
title: "Business Architecture and Domain Driven Design"
description: "Domain Driven Design is an approach to application design that looks to provide a focus for a particular business domain."
timestamp: 2026-06-26T19:19:05Z
---

Domain Driven Design is an approach to application design that looks to provide a focus for a particular business domain. The goal is to provide a focus by using the 'ubiquitous language' for that business domain and by breaking the domain into 'bounded contexts'. So how can Business Architecture help?
### What are your enterprise domains?

Start with the one-page [[Enterprise Domain Model]] template. For most organizations this is a reasonably simple task and quickly done by looking at the organization chart.  That said, [[Show me the money - Business Architects need to be financial sleuths|following the money]] will also provide insight into the business domains. By sticking to the one-page model, you will typically end up with twenty to thirty business domains.

Depending on the size of your organization, that may be not enough, or too many.  Small businesses may really only need to be one domain for the purposes of domain-driven design.  For large organizations, that may not be enough.  So what's right for your organization?

I like the two-pizza rule.  It's a domain if you have a multidisciplinary team of business subject-matter experts, business operations managers, analysts, trainer, etc. that exists for a particular domain that can be fed with two large pizzas. That could very well depend on your appetite, so let's say 9–12 people. Less than nine will probably mean you don't have the capacity or insight to create and maintain the domain models necessary. More than twelve may mean the domain could be subdivided, or could benefit from the optimization that using domain-driven design will achieve.
### I know my domains, now what?

How do you go about creating the 'ubiquitous language' and 'bounded contexts'? My recommendation is to start with [[Value Streams]]. Value Streams will create the boundaries for a particular aspect of the domain, as well as highlighting the 'Value Objects' that are important - from the customer's perspective! Each domain will usually have a few value streams - though depending on variance in practice within the domain due to geography or organizational design may make this much more complicated.

I will highlight two examples that come from the [TOGAF Business Capability Planning Guide](https://pubs.opengroup.org/togaf-standard/business-architecture/business-capability-planning.html) that may be illustrative:
#### Online Retail Product Value Stream
![[Online Retail Value Stream 1.png]]
#### Hire Employee Value Stream
![[Hire Employee Value Stream 1.png]]
Using the value stream as the 'bounded context' provides a value context from the customer's perspective. It also provides a starting point for establishing the domain language. In the next post, I will look at how mapping these value stages to business capability instances continues the domain design journey.