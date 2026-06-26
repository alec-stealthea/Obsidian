---
feature: Pizzaria Enterprise Domain Model.png
created: 2026-01-11
published: 2026-01-28
Channel: Substack
---
Every spy knows the first rule of reconnaissance: understand the territory before you go deep cover. Yet, the Domain Driven Design community parachutes developers into bounded contexts without first mapping the enterprise landscape. It's like dropping James Bond into a foreign city without a briefing. Sure, he'll figure it out eventually, but there's going to be a lot of unnecessary car chases.

[Eric Evans](http://domainlanguage.com) gave us a gift when he wrote the 'blue book' [_Domain Driven Design_](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) back in 2003. The concepts of bounded contexts, ubiquitous language, and domain models have transformed how we think about building software. But here's the thing Evans himself acknowledged: DDD is fundamentally an application development approach. It assumes you already know where your domains are. It assumes someone has done the reconnaissance.

That someone should be the enterprise architect. And that reconnaissance? It starts with an Enterprise Domain Model.

## The missing floor in the DDD building

Picture a building. The DDD community has done brilliant work on the ground floors. Aggregate roots, domain events, anti-corruption layers. The whole beautiful apparatus. But they've largely skipped the upper floors: the enterprise-level view that tells you which bounded contexts actually matter, how they relate to each other, and where value flows between them.

Without this perspective, teams end up discovering their bounded contexts through trial and error. They build microservices that turn out to need constant coordination. They create "ubiquitous languages" that conflict with three other teams' ubiquitous languages. They implement patterns beautifully while possibly missing the value required by the business domains they are creating products for.

The Enterprise Domain Model provides that missing floor. It's not about perfecting every detail—it's about establishing the landscape before diving into any single domain.

## What an Enterprise Domain Model actually looks like

Let me make this concrete. Rather than using a complex healthcare or financial services example, let's use something most people understand: a pizzeria.

![[Pizzeria Enterprise Domain Model - Legacy.png]]

The Stealth Pizzeria Enterprise Domain Model divides the business into recognisable territories. The Back of House contains Finance (keeping the books, managing cash flow), Human Resources (hiring, scheduling, training), and Purchasing (sourcing ingredients, managing suppliers). These domains exist in virtually every business—they're the mission support that keeps the lights on.

The Front of House tells a different story. Here's where customer value gets created: Reception (greeting customers, managing reservations), Bar (beverages, pre-dinner drinks), and Dining Room (the customer experience, table service). These are your field operations—where the action happens.

Notice that Kitchen spans both Back and Front of House. That's intentional. The Kitchen is where ingredients from Purchasing transform into value for the Dining Room. It's the operational heart that connects support functions to customer-facing delivery.

Domains don't operate in isolation. They connect to the outside world through Extended Functions—the Website, Food Delivery App, Reservation App, and the physical Restaurant location itself. And they interact with Stakeholders: Customers obviously, but also Employees, Suppliers, Partners, Regulators (hello, health inspectors), and Owners.

Finally, spanning across everything, you've got Knowledge Management: Master Data Management, Information Exchange, Terminology, and Analytics. These are the information foundations that enable consistent understanding across the enterprise.

One page. The whole business (almost). Not perfect, but useful[^1].

## Why this matters for DDD practitioners

Here's where it gets interesting for the DDD crowd. That Enterprise Domain Model you just created? It's your map for identifying bounded contexts.

Each domain on your enterprise model is a candidate for a bounded context. The Kitchen domain has its own language (prep time, ticket, station, expo), its own rules (food safety, cooking sequences), and its own concerns (throughput, quality, timing). Same goes for Reception, Dining Room, Finance—each has a distinct vocabulary and set of behaviours.

But the enterprise view reveals something the bottom-up approach often misses: how domains relate through value streams. In our pizzeria, when a customer places an order, value flows from Reception through Kitchen to the Dining Room. That flow crosses domain boundaries. Those boundaries become your integration points—your anti-corruption layers, your domain events, your shared kernels.

Without the enterprise view, you might build a perfect Kitchen bounded context that doesn't integrate cleanly with the Dining Room. You might create an Order aggregate that doesn't account for how Finance needs to see it. You might implement domain events that nobody's listening for.

The enterprise model doesn't replace the detailed DDD work. It informs it.

## The two-pizza test for your Enterprise Domain Model

How do you know if something is really a domain? Since we're modelling a pizzeria and Stealth EA likes Agile, let's borrow from Amazon's rule: a team should be no bigger than can be fed with two pizzas.

A domain exists if you have a multidisciplinary team that can be fed with two large pizzas (let's say 5–9 people) who are collectively responsible for that domain's success. This team includes business subject-matter experts, operations managers, analysts, maybe trainers. They share vocabulary. They have ownership.

Look at the Kitchen domain. The Kitchen Business Domain Model shows Chef, Cook, and Dishwasher roles, plus interactions with Server and Receptionist from adjacent domains, and oversight from Health Inspector and Building Inspector as regulators. That's a natural team boundary—enough people to maintain expertise, small enough to share understanding.

![[Pizzeria Kitchen Business Domain Model.png]]

Less than five people? You probably don't have enough capacity or insight to create and maintain the domain models necessary. More than nine? The domain might benefit from subdivision, or from the optimisation that proper domain-driven design will achieve.

This rule keeps your enterprise model at the right level of abstraction. Not so granular that it becomes unwieldy, not so abstract that it loses meaning.

## From domains to value streams to bounded contexts

Once you have your enterprise domains mapped, the next step isn't jumping straight to code. It's understanding how those domains deliver value.

This is where value streams come in. A value stream shows the end-to-end sequence of activities that delivers something a customer cares about. For our pizzeria, when a food order arrives from the Front of House, it triggers the Order Preparation Value Stream.

The value stream flows through four stages: Confirm Order (with an estimated time to completion), Prepare Pizza, Cook Pizza, and Plate Pizza (where plating differs based on take-out versus dine-in). Each stage has goals that guide execution—"Prepare food order with least waste," "Order meets recipe standards," "Prepare food order heeding dietary restrictions," "Food order meets customer's expectations."

But value streams don't exist in isolation. Look at the ArchiMate 'Motivation' view of the Order Preparation Value Stream:

![[Pizzeria Order Preparation Value Stream.png]]

Here you see how stakeholders influence the value stream at different stages. The Server triggers the process and serves the customer. The Customer's needs influence preparation (dietary restrictions) and cooking (timing). The Head Chef ensures waste minimisation. The Owners care about overall efficiency. Each influence relationship becomes a potential integration point—a place where bounded contexts need to communicate.

This is the insight DDD practitioners often miss: the bounded context isn't just the domain, it's the domain _in the context of the value streams for that domain as well as the value stream network from other domains.
## Starting your own Enterprise Domain Model

Ready to try this yourself? Here's the practical approach:

Start with a blank template using the pattern I've described: Back of House domains, Front of House domains, Extended Functions (your channels), Stakeholders, and Knowledge Management foundations. Don't overthink it—this first version should take 2–4 hours, not weeks.

Do your homework first. Your organisation chart provides hints (though domains aren't org structures—they're more stable). Your financial chart of accounts reveals where money flows. Your strategic plan highlights focus areas that might deserve their own domain visibility.

Apply the one-page rule ruthlessly. If your Enterprise Domain Model doesn't fit readably on a single page, you're probably mixing levels of detail. The constraint breeds clarity.

Then take your model on tour. Show it to people at different levels of the organisation. Ask for feedback. The conversations it generates are often more valuable than the model itself.

## The foundation for everything else

The Enterprise Domain Model isn't the destination—it's the starting point. Once you understand your domains, you can drill down into domain-specific views like the Kitchen Business Domain Model, showing value streams, roles, and business objects specific to that domain. Once you understand value streams, you can map the goals and stakeholder influences that shape execution. And once you understand those relationships, you can make informed decisions about applications, investments, and transformations.

This is the floor that DDD has been missing. Not a replacement for bounded contexts and aggregates and domain events, an enabling view of the whole enterprise.

Just like the Stealth EA perspective that business capabilities without value streams are just ingredients without recipes. Domain bounded contexts without an enterprise view are just floors without a building plan.

Build the enterprise domain model floor first. Then go deep cover.

---

_What does your Enterprise Domain Model look like? Have you tried mapping domains before diving into bounded contexts? I'd love to hear how this approach works—or doesn't—in your organisation._

[^1]: Shout out to George Box who (to paraphrase) said all models are wrong, some are useful.