---
type: Case Study
title: "Generic Retail Enterprise Domain Model"
description: "This retail domain model demonstrates how an Enterprise Domain Model provides a complete business context without getting lost in organizational structure."
timestamp: 2026-06-26T19:19:05Z
feature: Retail Enterprise Domain Model.png
thumbnail: thumbnails/resized/2adb867b0b9fdf4cb68a2e1a1ed6a33e_b89e22fb.jpg
created: 2025-11-08
published: 2025-11-09
---
## Retail Enterprise Domain Model
This retail domain model demonstrates how an Enterprise Domain Model provides a complete business context without getting lost in organizational structure. Notice how domain portfolios contain domains (ArchiMate Business Functions) which provide an abstraction for one or more value streams .  Channels show _where_ you connect with customers, and Stakeholders identify _who_ you serve and depend on. This isn't an org chart—it's a business architecture that remains stable even when departments reorganize. Use this pattern for any industry: the specifics change, but the structure remains reasonably consistent.
![[Retail Enterprise Domain Model.png]]
### Back Office
The back office is where the operational machinery runs—the domains that keep the lights on, the lawyers happy, and the pay checks flowing. These are your foundational domains —not customer-facing, but absolutely essential. When back office value streams fail, the front office feels it immediately.
- **Finance** - manages the money (tracking it, reporting it, and occasionally finding some).
- **Human Resources** - handles the people side: hiring, firing, and everything in between that keeps the workforce functional.
- **Information Technology** - keeps the digital infrastructure running—networks, systems, security, and that ticket queue that never seems to empty.
- **Legal and Compliance** - ensures the organization doesn't accidentally break laws or get sued into oblivion.
- **Real Estate and Facilities** - manages the physical footprint—buildings, leases, and making sure the HVAC works.
- **Corporate Planning** - sets the strategic direction and attempts to ensure everyone rows in roughly the same direction.
### Front Office
The front office is where revenue happens and customers interact with your brand. These domains directly generate revenue and shape customer perception. When front office value streams excel, you get sales growth and brand loyalty. When they fail, you get abandoned shopping carts and one-star reviews.
- **Store Operations** - runs the physical retail locations—managing staff, maintaining the shopping environment, and executing in-store sales.
- **eCommerce** - handles the digital storefront—online catalog, shopping cart, checkout, and the entire digital buying experience.
- **Customer Service** - resolves issues, answers questions, and attempts to turn angry customers into satisfied ones (or at least less angry ones).
- **Marketing** - creates demand through campaigns, promotions, brand management, and those emails nobody asked for but everyone gets.
- **Product Management** - decides what to sell—selecting, developing, and positioning products that customers might actually want to buy. 
- **Merchandising** - determines how products are presented, priced, and promoted to maximize sales and margins.
### Supply Chain
Supply chain keeps products moving from manufacturers to customers—the unglamorous logistics that make retail actually work. Supply chain is where operational efficiency lives or dies. Mess up these value streams and you get stockouts, overstock, margin erosion, and customers receiving their orders sometime next quarter.
- **Procurement** - sources and purchases products from suppliers, negotiating terms and managing contracts.
- **Vendor Management** - maintains relationships with suppliers, monitors performance, and handles the inevitable issues.
- **Warehouse Operations** - manages the physical storage facilities—receiving, storing, and preparing products for distribution.
- **Inventory Management** - tracks stock levels across all locations, attempting to balance "enough" with "not too much."
- **Distribution and Logistics** - moves products from warehouses to stores or customers through an orchestrated dance of trucks, routes, and delivery schedules.
- **Fulfillment** - picks, packs, and ships orders—whether to stores or directly to customers.
- **Returns** - handles the reverse flow when products come back (and in retail, they always come back).
### Knowledge Management
Knowledge Management transforms raw data into actionable intelligence—the domains that help you actually understand what's happening in your business. These domains don't sell products directly, but their value streams enable every other domain to work smarter. Good knowledge management means decisions based on facts instead of hunches.
- **Master Data Management** - maintains the golden records for products, customers, locations, and other core entities that everyone needs to reference consistently.
- **Business Intelligence** - turns data into reports, dashboards, and insights that inform decisions. It is usually dependant on Master Data Management.
- **Data Governance** - establishes policies, standards, and stewardship for data quality and usage (and tries to ensure people actually follow them).
- **Information Exchange** - manages the flow of data between systems, partners, and stakeholders—APIs, integrations, and file transfers that keep information moving.
- **Analytics** - applies statistical and predictive techniques to find patterns, forecast trends, and answer questions like "why aren't customers buying this?"
### Channels
Channels are how you connect with customers—the touch points where interaction happens. Channels are where strategy meets execution. Your channel mix determines market reach, customer experience, and operational complexity. The Domains coordinate through value stream networks to ultimately provide products through these channels to reach customers.
- **Digital Channels** - All forms of digital interaction including 
	- **Corporate Website** - serves as your online presence and information hub;
	- **Mobile App** - delivers a native smartphone experience
	- **Social Media** - enables engagement on the ever evolving social media platforms 
	- **Customer Portal** - Gives registered users personalized access to accounts, orders, and preferences.
- **Physical Channels** - For those organizations that still maintain a physical presence, we have the following:
	- **Retail Store** - are your primary brick-and-mortar selling environments
	- **Distribution Center** - serve as fulfillment hubs for online orders
	- **Showroom** - Let customers experience products without full retail inventory
	- **Pop-up Store** - create temporary retail presence for events, testing, or seasonal demand.
### Stakeholders
Stakeholders are the humans (and organizations) who care about, influence, or depend on your retail operation. Understanding your stakeholder ecosystem is essential—these groups have competing interests, different expectations, and varying degrees of influence over your success. Domains and their value streams exist to serve stakeholder needs.

- **Employees** - keep your domains and value streams running. These can be either
	- **Permanent Employees** - people employed full or part time by the organization or
	- **Contractors** - who provide ad hoc, flexible capacity
- **Customers** - This is the reason your organization exists!
	- **Individual Customers** - usually unidentified customers who shop occasionally
	- **Loyalty Program Members** - have identified themselves to be able to get perks depending on how often they buy from you. 
	- **Online Shoppers** - A special sub-classification for people who prefer the digital retail experience.
- **Funders** - provide capital to keep the organization running. This can include:
	- **Public Investors** - For those organizations trading on an established stock exchange who are looking for future returns.
	- **Financial Institutions** - Offering credit usually based on assets of the organization with a pre-defined return on investment.
	- **Private Equity** - which is usually not traded on a public exchange, but operates similarly through investment firms, venture capitalists, or wealthy individuals.
- **Partners** - Are suppliers that are more tightly integrated into your organization's domain value streams.
	- **Third Party Logistics** - usually extending the reach and speed of your Distribution and Logistic Domain. 
	- **Payment Processors** - While this may be an extension of the Finance domain,  a partner here make the value stream networks manifesting at the online and physical channels operate more seamlessly. 
- **Suppliers** - Can be commodity items essential for different aspects of your organization.  For retail, there are a couple of key suppliers.
	- **Product Manufacturers** - Make the goods you sell
	- **Private Label Partners** - Make the goods you sell under your branding.
- **Regulators** - In most countries, there will be rules established to tell organizations what they have to do, and how they have to do it. Compliance with these regulations is usually essential for staying in business. A small sample includes:  
	- **Tax Authorities** - many levels of government want their cut and;
	- **Labour Relations** - specifically regulating employees and usually associated with the Human Resources domain.