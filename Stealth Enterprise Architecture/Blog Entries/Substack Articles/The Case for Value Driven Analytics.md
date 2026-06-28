---
type: Blog Draft
title: "The Case for Value Driven Analytics"
description: "Enterprise Architecture techniques for creating better data products."
timestamp: 2026-06-26T19:19:05Z
---

*Enterprise Architecture techniques for creating better data products.*

Ever notice how every detective show has that scene — the case board covered in photos, red string connecting suspects to events? Your ability to perform any meaningful investigation depends on collecting facts in a way that connects the dots. Creating your case board is a form of link analysis that connects people to events and other people to try and track the suspect and break the case. Organisations increasingly apply these same link analysis techniques to their data — connecting business events, systems, and stakeholders to understand how the enterprise actually operates.

Too often, the current data product approaches lack the ability to provide data provenance, let alone data context.  Why does this matter? Context is essential to develop the appropriate data products that provide the insight the organisation needs.  Have you ever ended up delivering a data product which is exactly what your business owners asked for, but not in the end what they needed? As for data provenance, how many times do your data products break due to an upgrade or enhancement made to the application that was being used as a part of your data pipeline?

This is the first in a series exploring how enterprise architecture techniques can bridge that gap through what I'm calling Value Driven Analytics. I'll be using the Stealth Pizzeria[^1] as our running case study throughout.

We'll start in this article by scoping an analytic domain using the Enterprise Domain Model. You can't model everything at once, so picking your focus while keeping the big picture in mind is step one. From there, we'll model the domain's value streams, which are the real key to this approach. Value streams connect directly to stakeholder motivation and — if your organisation has a balanced scorecard — either appear explicitly on it or contribute to it. That makes them the natural starting point for data product development.

The series then digs into the details: mapping business capability instances within each value stream stage, building out a closed loop analytics foundation where your data lake becomes part of the overall application environment, curating the domain "facts" that connect data sets across applications, and finally assembling your data products with full business context and provenance. The last instalment explores where Large Language Models (LLMs) fit into this lifecycle — particularly for self-service queries that the business can answer in context.
## Why Start with the Enterprise Domain Model?

The Enterprise Domain Model gives you four things before you touch a single data asset.

1. **Domain portfolio** - For the Stealth Pizzeria: Kitchen, Dining Room, Bar, and Delivery as front-of-house; Finance, Purchasing, Human Resources, and Marketing as back-of-house; and the Kitchen bridging into the supply chain as the core value-creating engine. These boundaries tell you where language changes. The Kitchen doesn't talk about customer acquisition funnels or accounts receivable aging. It talks about ticket times, par levels, and portion specs. When you cross a domain boundary, you cross a vocabulary boundary — and that matters enormously for analytics.
2. **Knowledge Management business capabilities** - will span across domains. Notice that the Enterprise Domain Model doesn't list specific data entities at this level — it identifies the capabilities the enterprise needs for managing its knowledge. For the Pizzeria, these include Master Data Management, Analytics, and Information Exchange.
3. **Stakeholders and channels** - For analytics, knowing who receives value and through what mechanisms tells you who will eventually consume your data products and how. The Pizzeria's dine-in vs. delivery customer generate different data patterns and care about different outcomes.
4. **Domain relationships** - The Enterprise Domain Model makes visible which domains will show up in each other's value stream networks. The Kitchen domain doesn't operate in isolation — it depends on Purchasing for ingredients, interacts with the Dining Room and Delivery for order handoff, and feeds Finance with transaction data. These relationships become the integration challenges that your analytics platform must eventually navigate.

For our example, we will start with the Stealth Pizzeria.  An initial Enterprise Domain Model is illustrated below.

![[Pizzeria Enterprise Domain Model.png]]

## Pick Your Domain
For any medium to large organisation, looking to model the entire organisation is a daunting thought. There's also zero benefit in any full current-state modelling exercise. The Stealth EA likes to always start with an opportunity or problem state that is a current priority. Create your target state before you start looking at current state. So with that in mind — what is your current highest priority domain? Choose to focus on that.

There's a practical reason for this beyond project management sanity. Each domain in your enterprise has its own language, its own way of describing what matters, and its own cast of stakeholders who care about the answers. Trying to build a cross-domain analytics platform without first understanding each domain's language is how you end up with dashboards that are technically correct and operationally useless.

So, let's narrow our focus by looking at the Kitchen domain. We've all seen a busy kitchen at least if you've watched Ratatouille or possibly The Bear.  Orders flying in, stations working in parallel, the expediter orchestrating the whole thing like air traffic control. It's a contained production environment with clear inputs, outputs, and quality gates. That makes it an ideal first domain for our analytics approach because the value flows are visible and the vocabulary is tangible.
## The Kitchen Business Domain
	
Once you've selected your domain, the next step is understanding what that domain looks like from the inside. The [[Stealth Pizzeria Kitchen Business Domain|Kitchen Business Domain Model]] gives you the next level of context:

![[Pizzeria Kitchen Business Domain Model.png]]

The Kitchen Business Domain Model shows you three things that set the stage for analytics.

**Value Streams** — The Kitchen has three primary value streams: the Order Preparation Value Stream (the main production flow from order receipt to plated food), the Mise en Place Value Stream (the prep work that makes service possible), and the Kitchen Cleaning Value Stream (the hygiene and maintenance work that bookends and runs throughout the day). Each value stream is a candidate for analytics — a flow of work where measuring what happens can improve outcomes.

**Business Roles** — The Chef, Cook, and Dishwasher are the actors within the domain. The Server and Receptionist appear at the boundary — they trigger kitchen value streams but belong to the front-of-house. Health Inspectors and Building Inspectors are regulatory stakeholders whose requirements shape how the kitchen operates. These roles matter for analytics because they tell you who generates data, who needs data, and who governs data quality.

**Knowledge Management** — At the enterprise domain level, the Kitchen's knowledge management section shows the business capabilities that govern how the kitchen manages its operational knowledge. At the Kitchen Domain level, we have identified some of the key business objects or entities that relate to the Kitchen Domain. These connect back to the enterprise-level Knowledge Management capabilities but are scoped to the kitchen's concerns. When we get to modelling Value Streams to the Business Capability instance level, we will be able to see what a Recipe looks like in the context of the Mise en Place value stream versus the Order Preparation value stream. For now, the business objects tell us what *kinds* of knowledge the kitchen needs to manage without dictating the specific data structures or how they have been instantiated within the domain's application portfolio.
### Conclusion
Does your organisation struggle to connect the dots between your data products and the business context they're supposed to serve? I'd love to hear how you're tackling it — what's worked, what hasn't, and where the pain points are. If this approach resonates, subscribe to follow along as I build it out step by step with the Stealth Pizzeria. Next up: modelling a Kitchen Domain Value Stream.

[^1]: Note that the Stealth EA is using the Pizzeria as an example inspired by Kurt Kagle in his article [A Writer's Guide to Ontology Design](https://ontologist.substack.com/p/a-writers-guide-to-ontology-design) in his publication, [The Ontologist](https://ontologist.substack.com). as well as the [Protégé Pizza example](https://protegeproject.github.io/protege/getting-started/) for modelling an ontology. This is a theoretical example to explain the key concepts vs. a real case study. The Stealth EA has more knowledge about consuming pizzas vs. modelling a pizzeria!