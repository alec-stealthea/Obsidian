---
type: Reference
title: "Business Architecture Enterprise Domain Models"
description: "Every good intelligence operation starts with understanding the territory."
timestamp: 2026-06-26T19:19:05Z
Publish Status: Published
Improvements Needed: Change the PowerPoint Model into an ArchiMate model
feature: ArchiMate Enterprise Domain Model Template.png
thumbnail: thumbnails/resized/8152d253682ea05889d194c4504edb8d_b89e22fb.jpg
published: 2025-11-17
---
# Business Architecture Enterprise Domain Models

Every good intelligence operation starts with understanding the territory. Not the org chart on the wall - that's just the cover story that changes every eighteen months when leadership brings in the next consultants. The real question for understanding your organization's business architecture: what does your enterprise actually _do_? Not the mission statement fluff, but the real work that creates value. This is where domain modelling becomes your secret weapon.
## The Domain Portfolio Model

Think of this as your reconnaissance map of the organization. We need a model that will work across industries - from banking to healthcare to manufacturing. Coming up with a model that proposes to classify any enterprise is ambitious and like any abstraction risks being academic rather than useful. 

![[ArchiMate Enterprise Domain Model Template.png]]

### The Five Core Elements

- **Back Office Domains: Your Mission Support** - These are the folks who make sure the lights stay on and people get paid. Human Resources, Finance, Information Technology and whatever regulatory compliance nightmares your industry throws at you. Unglamorous? Perhaps. Essential? Absolutely.
- **Front Office Domains: Field Operations** - This is where the action happens - all those customer-facing functions like sales, physical locations, product management, and service delivery. If your customers see it, it's probably Front Office.
- **Supply Chain Domains: The Assembly Line** - Whether you're manufacturing widgets or delivering digital services, you've got transformation processes. These value streams take raw resources managed by the back office and convert them into the products or services that flow through your front office to customers. Think of it as your enterprise's assembly line - just don't let the manufacturing metaphor limit your thinking if you're in a service industry.
- **Knowledge Management Domain: Your Intelligence Network** - The foundation of Domain Driven Design is that domains have their own semantics, terminology, etc. Here's where it gets interesting: Knowledge Management typically doesn't show up as a standalone domain in your model. Instead, it manifests as capabilities embedded within your operational domains—the intelligence infrastructure that supports specific value streams. You might have Master Data Management capabilities in Finance, Analytics capabilities in Sales, Information Exchange capabilities wherever domains need to communicate.Knowledge Management provides the intelligence infrastructure - Master Data Management, information exchange, analytics, and most importantly, context. It positions information within your [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain|domains]] so people can actually find and use it.
- **Channels**: **Communicating with Stakeholders** - Domains show what you do inside your enterprise. Channels show how you reach outside it—the digital and physical touch points where you interact with your stakeholders.  Channels are divided into digital and physical.  Some organizations may only be digital, but few large organizations are only physical anymore.
- **Stakeholders: Your Network** - Every good operative needs contacts. Your organization has five key types:
	- **Customers**: The people (internal or external) who actually use what you create. Sometimes organized by [[Customer Personas]] if you want to get fancy.
	- **Regulators**: The folks with clipboards and legislation who ensure you're playing by the rules. They're not the enemy - they're just doing their job.
	- **Funders** (those who fund the services): Often the customer, but not always. In healthcare, think insurance companies. In internal IT, think whoever controls the budget. In startups, think venture capitalists.  This is a key part of the enterprise since (usually) the golden rule applies.  They who have the gold, make the rules. 
	- **Partners**: Third parties you've recruited for specific missions - outsourcing [[Value Stream|value streams]] or [[Business Capability|capabilities]] because they do it better than you could.
	- **Suppliers**: Your Supply Chain connections, typically engaged through procurement. They're part of your extended team whether you think of them that way or not.
## Why This Actually Matters

Here's where it gets interesting. This pattern creates compelling one-page visuals that bridge the gap between executive strategy and the other enterprise architecture domains. It's not just pretty pictures for PowerPoint - it's a practical communication tool that creates [[One-Page Models]] executives can actually understand without a decoder ring.
## Building Out the Architecture

Business domain models become your foundation for the other [[Architecture Domain|architecture domains]]. Applications map to [[Business Capability|business capabilities]] within domains. Information flows respect domain boundaries. Technology components support capabilities across your enterprise.

It's not about creating perfect models that gather dust. It's about creating useful models that enable better decisions.
### Quick Start: Your First Domain Model

Ready to try this yourself? Here's the practical approach:

1. **Start with a blank copy** of the Extended Enterprise pattern and adapt the top level to your organization.
2. **Do your homework** - You may think you know everything about your organization, but there's probably more that you don't. Start by looking at the following:
	1. **Organization Structure** - While a Domain Model is not your organizational structure, there is a high degree of affinity between the two.
	2. **Financial Chart of Accounts** - Certainly looking at your organization's financial statements and balance sheet is informative.  Your ability to [[Stealth EA/Blog Entries/Show me the money - Business Architects need to be financial sleuths|follow the money]] is an important skill overall, but is useful for checking your domain model
	3. **Strategic Plan** - Review the strategic plan for any key focus areas that should be highlighted.  This could be a sub-domain, a particular client group, maybe a new channel.
3. **Rename/Change your Domain Portfolios** - The Stealth EA model is just for reference.  Stay tuned for industry specific model that will be added over time. Remember your domain portfolios include: Back Office, Front Office, Supply Chain, Knowledge Management. You can subdivide or create new ones as needed.
4. **Add Domains** - Now add your domains to the domain portfolios for back office, front office, supply chain, and knowledge management.
5. **Add Channels and Stakeholders** - This should be straight forward. Remember again that this is the enterprise level, so in general any stakeholders listed apply to the whole organization.  You also have very limited space, so choose wisely.
	1. **Channels** - 
		1. **Digital** - and include the website, social media, apps, portals, etc. Note that at the top level, these should be enterprise channels. When you build out your Domain Models you can get to the specific channels that may be part of the enterprise channels or be independent.
		2. **Physical** - In general, customer facing physical channels are added at the enterprise level.  While warehouses and corporate offices may be important they would typically be added at the domain level model.
	2. **Stakeholders** - 
6. **Test the one-page rule** - if it doesn't fit readably on one page, you're probably mixing levels of detail

Total time investment: 2-4 hours for first draft. The conversations it enables? Priceless. in fact, take your new model on a tour and ask for feedback. Do this at as many levels of the organizations as you can to gain different perspectives.

## Using ArchiMate for Enterprise Domains Modelling
The first version of any Enterprise Domain Model is usually generated as a slide in a presentation. Having this version is an essential first step since everyone in the organization has access to be able to edit and adapt the model - for better or worse.  But now - what if you wanrt to make this model 
### Why ArchiMate for Domain Models?

Remember [[The Great Divide of EA Modelling|Marchitecture vs. Rule-Based Models]]? Your conceptual domain model on a slide is excellent Marchitecture - it communicates strategy and structure to executives. But ArchiMate using an architecture modelling tool like Archi gives you:
- **Traceability**: Connect domains to value streams, applications, and roles
- **Analysis**: Understand dependencies and impact of changes
- **Reusability**: Build once, reuse the same concepts across multiple views
- **Precision**: Unambiguous element definitions and relationships - if you're consistent in how you use your ArchiMate elements!

The trick is maintaining both perspectives - the executive-friendly visual AND the architecture-rigorous ArchiMate model. You need both to be effective.
### The Stealth EA ArchiMate Elements for the Enterprise Domain Model

| ArchiMate Element     | Enterprise Domain View Usage                                                                     | Example                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Grouping              | This forms the basis for the Enterprise Domain Framework                                         | All of the Domain Portfolios, Channels and Stakeholders |
| Business Function     | These are your Domains within the domain portfolios.                                             | Finance, Logistics, etc.                                |
| Application Component | These are the specific applications from your organization's application portfolio.              | corporate website, vendor portal, mobile apps           |
| Facility              | May be better illustrated as a grouping, but eventually would be modelled as physical Facilities | Store, Warehouse, Manufacturing Plant                   |
| Stakeholder           | Added as Stakeholders within the Stakeholder grouping                                            | Employee, customer, financial institution               |
A word of warning: ArchiMate precision is a double-edged sword. Yes, you get traceability and analysis capabilities. But you also get the temptation to model everything to death. Remember—your conceptual slide model that executives actually use beats your beautifully rigorous ArchiMate model that nobody looks at. Build both, but know which one is doing the real work and invest your time appropriately.
### [[MAD Business Domains]]

Business Domain is one of the [[Master Architecture Data]] key entities.  That means that if you are using an Architecture tool like Archi, that that this is a managed data set. This should mean that rather than adding your own elements that these domains are pulled from the model inventory of global Business Function domain definitions.
## What's Next

Business architecture domain models set the stage. Once you understand the domains, you can define [[Value Stream Mapping|value streams]] and the underlying [[business capability instance]] that bring those value streams alive. This forms the basis to be able to make informed decisions about where to invest, consolidate, or transform.

The goal isn't theoretical perfection. It's practical utility. After all, a model shared and used is worth infinitely more than a perfect model that never leaves your laptop.

