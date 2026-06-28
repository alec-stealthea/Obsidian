---
type: Case Study
title: "Stealth Pizzeria Enterprise Domain Model"
description: "In order to bring the art of business architecture to life, I have drawn inspiration from Kurt Cagle's ontology example using a pizzaria to bring some concepts to life."
timestamp: 2026-06-26T19:19:05Z
feature: Pizzaria Enterprise Domain Model.png
---
In order to bring the art of business architecture to life, I have drawn inspiration from Kurt Cagle's ontology example using a pizzaria to bring some concepts to life. The following model expands on the [[Enterprise Domain Model]] template and looks to bring that pattern to life with a practical example.

![[Pizzaria Enterprise Domain Model.png]]
## The pizzeria enterprise at a glance

For our burgeoning pizzeria enterprise, the business has been split into eight business domains spanning both front and back of house. The model follows the standard Enterprise Domain Model pattern with domain portfolios, channels, stakeholders, and key business objects.

Unlike a large enterprise with dozens of domains, a pizzeria is refreshingly straightforward. If you can't feed the whole team with two large pizzas, you might be overcomplicating things. (And if you're running a pizzeria, you'd better be able to feed them properly!)

## Domain portfolios

### Back of House domains

The back of house keeps the lights on and the ovens fired up. For our pizzeria, this is deliberately lean:

|Domain|Description|
|---|---|
|**Finance**|Manages the money flowing in and out: accounts payable for ingredients and utilities, accounts receivable for catering orders, payroll for staff. For a smaller operation, this might be a spreadsheet and an accountant. For a growing chain, it becomes its own department.|
|**Purchasing**|Managing relationships with ingredient suppliers, beverage distributors, and equipment vendors. Ensuring you never run out of mozzarella on a Friday night.|
|**Human Resources**|Staff scheduling, hiring and onboarding, performance management, and health and safety compliance. In a small operation this may be the owner's job on a Sunday night; in a chain, it warrants its own function.|
|**Marketing**|Promotions, loyalty programmes, social media presence, and the general effort to keep your pizzeria top of mind when hunger strikes. For a small shop, this might be the owner's Instagram account. For a chain, it's a full function.|

### Front of House domains

This is where customers interact with the business directly, whether in person or through an order:

| Domain          | Description                                                                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Delivery**    | The extended reach of your pizzeria, whether through your own drivers or third-party services. Increasingly critical for survival in the modern restaurant landscape. Delivery customers may never see your physical space — their entire experience depends on what arrives at the door.                                                                  |
| **Bar**         | Beverage service from the bar itself: cocktails, beer, wine, and non-alcoholic options. In a licensed operation, this domain carries its own regulatory weight — your relationship with the Liquor Authority lives here. Customers who come for drinks rather than food make the Bar a domain in its own right. |
| **Dining Room** | The physical dine-in experience. Includes table service and the general ambience that keeps people coming back. This is where front-of-house staff spend most of their shift. |

### Supply chain domains

The supply chain for a pizzeria transforms raw ingredients into delicious outcomes:

|Domain|Description|
|---|---|
|**Kitchen**|The heart of any restaurant. This is where the magic happens: dough prep, topping assembly, oven management, and quality control. The Kitchen domain owns the core value streams that deliver your product. This domain deserves its own detailed model. See [[Stealth Pizzeria Kitchen Business Domain]].|

### Knowledge management

For an enterprise domain model, knowledge management typically manifests as capabilities embedded within operational domains rather than as a standalone domain. For our pizzaria:

- **Master Data Management** for our single pizzeria business is managed within a spreadsheet and potentially within the Analytics environment by domain.
- **Information Exchange** - Much of the information exchange within the Pizzaria Enterprise are business capability instances within packaged application and what the Stealth EA calls swivel chair interfaces where people transcribe data from one screen into another.
- **Analytics** - In application analytics provide the majority of the instantiation of the business capabilities for Analytics.  Cross application analytics may be enabled through the use of spreadsheets or possibly artificial intelligence. 
- **Records Management** - This would largely be part of the Finance domain for tax purposes, though the Kitchen domain has some regulatory reporting and records that need to be maintained.

## Channels

### Digital channels

|Channel|Purpose|
|---|---|
|**Website**|Online ordering, menu display, location information, and reservation booking. May integrate with third-party ordering platforms.|
|**Mobile App**|For larger operations: loyalty programme tracking, mobile ordering, push notifications for promotions.|
|**Third-Party Platforms**|Aggregator apps (DoorDash, SkipTheDishes, Uber Eats) that extend reach but come with margin implications.|
|**Social Media**|Instagram, TikTok, Facebook: where food photography meets community building.|

### Physical channels

|Channel|Purpose|
|---|---|
|**Restaurant Location**|The bricks-and-mortar presence where dine-in, takeaway, and pickup converge.|
|**Food Trucks** (if applicable)|Mobile extensions for events, festivals, or reaching new markets.|
|**Catering**|Service delivery for events, corporate functions, and private parties.|

## Stakeholders

### Customers

The people who actually consume what you create:

|Stakeholder|Description|
|---|---|
|**Dine-in Customer**|Experiences the full restaurant: ambience, service, and food together. Higher margin, but capacity-constrained.|
|**Takeaway Customer**|Collects food but doesn't require table service. Lower overhead per order.|
|**Delivery Customer**|Receives food at their location. May never see your physical space. Experience depends heavily on food travel quality.|
|**Catering Client**|Orders in bulk for events. Higher volume, different logistics, often requires relationship management.|
### Funders

Who pays the bills (hint: it's not always the person eating the pizza):

| Stakeholder                     | Description                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------- |
| **Owner/Investors**             | Provides capital and expects returns. Sets strategic direction.                   |
| **Banks/Lenders**               | If financed: expects regular payments and covenants met.                          |
| **Franchisors** (if applicable) | For franchised operations: takes royalties, sets standards, provides brand value. |
### Regulators

The folks with clipboards ensuring you're playing by the rules:

|Stakeholder|Description|
|---|---|
|**Health Department**|Regular inspections, food safety standards, kitchen hygiene requirements. Your score goes on the wall.|
|**Liquor Authority** (if applicable)|If you serve alcohol: licensing, hours restrictions, responsible service requirements.|
|**Municipal Government**|Business licensing, zoning compliance, signage regulations, fire safety.|
|**Tax Authorities**|Federal, provincial/state, and sometimes municipal: GST/HST collection, income tax, payroll remittances.|
### Partners

Third parties you've recruited for specific missions:

|Stakeholder|Description|
|---|---|
|**Delivery Aggregators**|DoorDash, Uber Eats, Skip: they extend your reach but own the customer relationship and take a cut.|
|**Payment Processors**|Square, Moneris, Stripe: enable card and digital payments.|
|**Reservation Systems**|OpenTable, Resy: manage table bookings and customer data.|
|**Marketing Partners**|Local sports teams, community organisations, influencers: cross-promotional relationships.|

### Suppliers

Your supply chain connections:

|Stakeholder|Description|
|---|---|
|**Food Distributors**|Sysco, Gordon Food Service, or local equivalents: bulk ingredients, pantry staples.|
|**Specialty Suppliers**|Artisanal cheese makers, local farms, specialty import companies: the ingredients that differentiate your product.|
|**Beverage Suppliers**|Soft drink companies, local breweries, wine distributors.|
|**Equipment Vendors**|Ovens, refrigeration, POS systems: the tools of the trade.|
|**Packaging Suppliers**|Boxes, bags, containers: especially critical for delivery and takeaway operations.|
## Key business objects

At the bottom of the model sit the business objects that span domains across the enterprise. These represent the core information concepts that flow through the pizzaria:

| Business Object           | Description                                                                                                | Primary Domains                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Menu Item**             | The products offered: pizzas, sides, beverages, desserts. Includes pricing, ingredients, and availability. | Kitchen, Dining Room, Marketing         |
| **Order**                 | A customer's request for food: items, quantities, customisations, delivery/dine-in selection.              | All domains                             |
| **Recipe**                | The formulas for creating menu items: ingredients, quantities, procedures. Proprietary knowledge.          | Kitchen, Purchasing                     |
| **Ingredient**            | Raw materials used in production: flour, tomatoes, cheese, toppings. Tracked for inventory and costing.    | Purchasing, Kitchen                     |
| **Customer**              | Information about who's buying: contact details, order history, preferences, loyalty status.               | Dining Room, Delivery, Marketing        |
| **Employee**              | Staff information: schedules, certifications, roles, payroll details.                                      | Human Resources, all operational domains |
| **Supplier**              | Vendor information: contact details, payment terms, product catalogues, performance history.               | Purchasing, Finance                     |
| **Financial Transaction** | Money movement: sales receipts, supplier payments, payroll, taxes.                                         | Finance                                 |
## What makes this model useful

This pizzaria example demonstrates several key principles from the [[Enterprise Domain Model]] template:

1. **Right-sized for the enterprise**: A pizzaria doesn't need thirty domains. Eight is plenty. The two-pizza rule applies literally here.
2. **Front of House organises around customer touchpoints**: Delivery, Bar, and Dining Room represent distinct ways customers physically receive value from the business — each with its own trigger, value stream, and stakeholder experience.
3. **Back of House enables operations**: Finance, Purchasing, Human Resources, and Marketing are essential but not where customer value is created. Keep them lean. Marketing belongs here because it operates between interactions with customers rather than during them.
4. **Supply chain is where transformation happens**: The Kitchen domain is where ingredients become pizzas. This is your core value-creating engine.
5. **Stakeholders reflect reality**: Not just customers, but the regulators, partners, and suppliers who influence how you operate.
6. **Business objects span boundaries**: An Order touches nearly every domain. A Recipe connects Kitchen to Purchasing. These cross-cutting objects are what integration challenges are made of.
## Building out the architecture

This enterprise domain model sets the stage to delve more deeply into the individual [[Business Domain|Business Domains]] for the pizzaria:

- [[Stealth Pizzeria Kitchen Business Domain]] – The heart of any restaurant. This domain owns the primary value streams and deserves detailed capability and value stream modelling.

Future extensions could include:

- **Pizzaria Dining Room Business Domain** – The dine-in customer experience and table service
- **Pizzaria Bar Business Domain** – Beverage service and licensed operations
- **Pizzaria Delivery Business Domain** – The logistics of getting food to customers
- **Pizzaria Purchasing Business Domain** – Supplier relationships and inventory management

## Using ArchiMate for the pizzaria model

The conceptual model shown above is excellent "Marchitecture" for communication. When you're ready to build traceability and enable analysis, translate this into ArchiMate using the following element mappings:

|Model Element|ArchiMate Element|Example|
|---|---|---|
|Domain Portfolio|Grouping|Back of House, Front of House, Supply Chain|
|Business Domain|Business Function (specialised)|Kitchen, Dining Room, Finance|
|Channel (Digital)|Application Component|Website, Mobile App|
|Channel (Physical)|Facility or Grouping|Restaurant Location|
|Stakeholder|Stakeholder|Customer, Health Department|
|Business Object|Business Object|Order, Menu Item, Recipe|

Remember: your conceptual model that gets used beats your beautifully rigorous ArchiMate model that nobody looks at. Build both, but know which one is doing the real work.

## What's next

Business architecture domain models set the stage. Once you understand the domains, you can define [[Value Stream|value streams]] and the underlying [[Business Capability Instance|business capability instances]] that bring those value streams alive.

For the pizzaria, the next step is modelling the **Food Order** value stream that flows from customer order through kitchen production to delivery. This forms the basis for understanding which capabilities are needed at each stage and which applications support them.

The goal isn't theoretical perfection. It's practical utility. After all, a model shared and used is worth infinitely more than a perfect model that never leaves your laptop.

---
_This model is part of the Stealth EA example catalogue demonstrating domain modelling patterns. It's inspired by ontology examples originally developed by Kurt Cagle and adapted to illustrate Stealth EA methodology._