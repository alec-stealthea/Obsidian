For any medium to large organization, managing the application portfolio is like trying to herd digital cats. The challenge isn't just knowing which applications exist - it's knowing which ones are actually earning their keep, which ones are potentially a risk to your organization's demise, and which ones disappeared into the cloud without leaving a forwarding address.

The proliferation of software-as-a-service has made this even more interesting. Business areas can now acquire applications faster than a teenager downloads TikTok videos, often bypassing IT entirely. Meanwhile, your CMDB sits there, quietly maintaining records for applications that may have been decommissioned last Tuesday.
## Manage your Application Catalogue
If you're managing your [[Master Architecture Data]], applications form one of the most dynamic and critical dimensions of that catalogue. While the CMDB may be IT's official application of record, treating it as your single source of truth is like relying on Wikipedia for your doctoral thesis - technically possible, but probably not your best strategy 
### Key Application Management Guidelines
Three principles can help you impose some semblance of order on this digital chaos:

- **Identity Management** - Make all applications play nice with your organization's identity management standards. This isn't just about security theatre; it's about creating a choke point where new applications must announce themselves. When business users need access to their shiny new SaaS tool, your identity provisioning process becomes your early warning system. It's like having a bouncer at the digital nightclub of your enterprise.
- **Information Exchanges** - Route all application integrations through centralized information exchange engines. This creates both an additional security layer for APIs, interfaces, and file exchanges, and gives you visibility into the shadow IT ecosystem. When applications need to talk to each other, make them use your translation service. You'll be amazed what conversations you'll overhear.
- **Data Lake Strategy** - Ensure all application data flows into your data lake. This isn't just about analytics and data discovery; it's about creating a paper trail for every application that touches your organization's data. Think of it as the enterprise equivalent of security cameras - you might not need the footage until something goes wrong. 
### [[MAD Application Catalogue]]
What is the key application metadata that you need to be able to assess and manage your application portfolio? First and foremost, map the applications to your [[MAD Business Domains]].
## TIER your Application Portfolio
Classification brings clarity to chaos. The Stealth Enterprise Architect should tier applications as follows:

- **Top Applications** - These are your mission-critical darlings that keep the lights on and the money flowing. They get premium treatment: higher availability, better redundancy, and preferential investment for new business capabilities. These applications are like the star performers in your organization - they get the best dressing rooms and catering.
- **Innovation Applications** - Every organization needs to innovate, which often means experimental IT. These applications need governance that's more "fast lane" than "bureaucratic maze." They should be able to launch quickly and retire gracefully when their functionality graduates to your Key or Enabling applications. Think of these as your organization's R&D lab - some experiments explode, but that's part of the process.
- **Enabling Applications** - The unsung heroes that make your Top applications possible. Despite being numerous and critical, they typically survive on pizza budgets while supporting champagne expectations. This disparity makes them a significant risk if not properly maintained. These are your character actors - not glamorous, but the show doesn't work without them.
- **Retire Applications** - Applications marked for decommission require careful choreography. They need standard records management and separate analytics environments. Ideally, design these repositories into your production environment from the start to enable faster decommissioning. Planning application retirement is like planning a graceful exit from a party - much better to leave while people still want you there.
### Top Enterprise Applications
Most organizations have foundational applications that span multiple domains - typically ERP systems or other enterprise platforms. The appeal lies in simplified integration between modules and common data models across the platform. Some organizations adopt a "top application first" principle: if the enterprise platform can deliver required functionality, use it instead of acquiring or maintaining separate applications.

These applications follow Pareto's principle religiously - less than 10% of your application count but more than 50% of your application spending. A key ongoing activity is evaluating which applications from the rest of your portfolio could migrate to your Top applications. It's like asking which of your scattered tools could fit in one comprehensive toolbox.
### Managing Innovation Applications
Innovation gets blamed for many things, from genuine breakthrough attempts to just being entries on the latest [[Stealth EA/Blog Entries/2024 Buzzword Bingo|buzzword bingo card]]. Sometimes it's legitimate citizen development. Sometimes it's just the latest low-code platform du jour. Excel remains the planet's largest citizen development platform, despite what the marketing materials for modern alternatives might claim.

Venture capitalists manage innovation portfolios by spreading investments to diversify risk, banking on one unicorn offsetting losses from the rest. Apply similar thinking to your innovation application ecosystem - reduce corporate risk by enabling application innovation within appropriate software development guardrails. Take a hands-off but eyes-on approach; maintain visibility without strangling innovation in bureaucratic red tape.
### Enabling Applications
Every organization has applications that exist solely to make other applications work better - document management systems, data archiving (distinct from your data lake), information exchange platforms, and others. Many Top applications come with their own recommended ecosystem of partner applications. Regular consolidation reviews are worthwhile since the IT marketplace evolves rapidly. An annual assessment of consolidation opportunities can yield surprising results.
### Retire Applications
Applications eventually reach their expiration date. Managing application retirement requires proactive planning, ideally well before the application's final curtain call. In order to retire an application, you need to 
#### Information Disposition
First question: Do you actually need this data? For many innovation applications, the answer might be no. In fact, retaining unnecessary data might pose business risks. If you do need the data, understand why. Research and business intelligence needs suggest data lake migration. Legal records require document repository solutions. "Just in case" thinking suggests risk management anxiety rather than genuine need.
#### Data Migration
The Stealth EA approach to data migration is - don't.  The effort required to migrate data from one application to another is rarely worth it. The effort to clean and translate the data is probably best left to efforts in setting up the translation rules within a data warehouse or data lake. That said, most of the time, "no" is not an answer is acceptable to stakeholders.

When data migration becomes unavoidable, develop or reuse existing application interfaces. Interfaces typically include built-in data standards and validation rules. Coupled with an integration engine, you can develop translation rules to map from the retiring application. It's like having a diplomatic translator for applications that speak different languages.
#### Application Transition
Depending on the scope and size of the application, there will need to be more options than a big bang approach to application transition.  
1. **Replacement Application Deployment Approach** - Decide how the application will roll out to end users. Faster is generally better than slower, but the largest factor is organizational change management requirements. Some users adapt quickly; others need time to grieve their familiar systems.
2. **Post-Production Approach** - If you've successfully avoided migrating data into the new application, you'll need a work-down approach for existing records. At minimum, legacy users need read-only access to the retired application. Think of it as maintaining access to old photo albums while everyone uses the new digital system.
3. **Application Maintenance Team** - Depending on the team managing the retiring application, you'll need to preserve institutional knowledge while the application winds down. Forensic architecture for applications is expensive. Long-lived custom application teams need active plans for new opportunities while maintaining capacity to support the retirement journey.
#### Data Retention
Ideally, the appropriate data management has been put in place so that the [[Domain Data Lake House]] is in place maintaining all of the data history following a [[Stealth Enterprise Architecture/Tools and Techniques/Glossary/Closed Loop Analytics]] approach.  This can be augmented with a document repository with an appropriate level of records management layered on top.
#### Application Retirement
When transition completes, users embrace the new application, and data finds new homes or gets destroyed, you can finally decommission the remaining application environments. Throw a party, celebrate the success, and remove one application from your portfolio. It's like finally cleaning out that garage you've been meaning to organize for years.
## Portfolio Management Approach

Applications follow predictable lifecycles like aging rock stars - they start hot, plateau in the middle, and eventually need a graceful retirement tour. But certain events can trigger urgent portfolio reviews faster than a celebrity scandal hits social media.

If you've been smart enough to implement your [[MAD Application Catalogue]], congratulations - you're ahead of 90% of organizations still managing applications via spreadsheets and institutional memory. But even the best catalogues need feeding. Without sufficient data feeds, your MAD becomes as stale as last week's donuts. Hopefully you've gone beyond basic application listings and created meaningful links to other MAD entities like [[MAD Business Domains|domains]] and [[MAD Locations|locations]]. These relationships help you slice and dice you application portfolio as needed..

Now, about those pesky application costs - people, direct licenses, enabling application environments. MAD probably isn't your system of record for financial data, nor should it be. You've got other applications handling the money trail, and they should stay in their lane. The trick is making these systems talk to each other without requiring a UN interpreter.

Like most Enterprise Architecture endeavours, you need to [[Stealth EA/Blog Entries/Show me the money - Business Architects need to be financial sleuths|show me the money]] when it comes to application portfolio management. Sure, there are technical factors, strategic considerations, and user satisfaction metrics. But let's be honest - the golden rule applies with ruthless consistency: those who have the gold make the rules. This includes obvious direct costs and those sneaky additional application environment costs that mysteriously appear on invoices like unwanted credit card charges.

The moment budget pressures hit, suddenly everyone becomes very interested in your application portfolio analysis. Funny how financial constraints can transform abstract architecture diagrams into urgent strategic priorities.
### Rationalization Scenarios

#### Mergers and Acquisitions
M&A triggers the fastest and most decisive application portfolio reviews, especially in the private sector. This depends on merger type, but cost savings justifications typically target back-office applications faster than front-office systems. Having proactive data archiving approaches becomes crucial here - data you didn't think was valuable suddenly becomes urgently needed.

M&A scenarios demand speed. Start with productivity infrastructure for identity, access, and email. Focus on big-ticket items affecting near-term cash flow. It's like emergency room triage - address the bleeding first, then worry about the bruises.

*N.B.* in M&A scenarios, redundant applications are features, not bugs. Having two ERP systems isn't inefficient - it's an opportunity to choose the best one and decommission the other.
#### Annual Budget Review
Annual budget cycles create natural inflection points for application portfolio assessment. Unlike M&A scenarios, these reviews allow for more strategic, less urgent decision-making. That is unless there is an end of year fire drill where suddenly roll-over budgets with an inflation adjustment is not an option.

- **Cost Optimization Focus** - Budget reviews emphasize total cost of ownership analysis. Direct licensing costs are obvious, but indirect costs often surprise stakeholders. Factor in integration maintenance, data storage, security compliance, training, and support resources. That "free" open-source application might cost more than the commercial alternative when you account for the full ecosystem.
- **Functionality Redundancy Analysis** - Budget constraints force hard questions about functional overlap. Do you really need three different project management tools? Can your CRM system handle marketing automation, or do you need a separate platform? 
- **Innovation Investment Prioritization** - Budget planning requires balancing innovation with operational stability. Allocate specific budget percentages for innovation applications, enabling applications, and top applications. Consider innovation applications as venture capital investments - expect some failures but plan for breakthrough successes.
- **Vendor Relationship Optimization** - Annual renewals provide leverage for contract renegotiation. Consolidate vendors where possible to improve negotiating position. Enterprise agreements often provide better unit economics than individual application licenses.
#### Business Disruption
Disruptions force rapid portfolio reassessment, but the nature of disruption determines response strategy.

- **Legislative and Regulatory Changes** - New compliance requirements often necessitate application upgrades, replacements, or additions. GDPR, SOX compliance, industry-specific regulations, and data localization requirements can trigger significant portfolio changes. The key is anticipating regulatory trends rather than reacting after implementation deadlines.
	- _Assessment Approach_: Evaluate current applications' compliance capabilities, identify gaps, and determine whether upgrade, replacement, or augmentation provides the most cost-effective path to compliance.
	- _Timeline Management_: Regulatory changes typically provide 12-24 month implementation windows. Use this time for strategic planning rather than panic purchasing.
	
- **Partner and Vendor Disruptions** - When key technology partners experience disruption - acquisition, business model changes, end-of-life announcements - your application portfolio faces forced changes.
	- _Vendor Acquisition Scenarios_: When your preferred vendor gets acquired, expect changes in product direction, pricing models, and support structures. Develop contingency plans for critical applications before disruption occurs.
	- _End-of-Life Announcements_: Software vendors eventually sunset products. Monitor vendor roadmaps and maintain relationships that provide early warning of product lifecycle changes.
	- _Supply Chain Disruptions_: Cloud service outages, data center issues, or geopolitical events can force rapid application architecture changes. Maintain disaster recovery plans that include alternative application hosting strategies.

- **Market Disruption and Digital Transformation** - Competitive pressure or market evolution can require rapid application portfolio pivots.
	- _Customer Expectation Changes_: When customer expectations shift - mobile-first interactions, real-time service delivery, omnichannel experiences - your application portfolio must adapt quickly.
	- _Competitive Pressure_: When competitors introduce superior digital capabilities, you may need to accelerate application modernization or acquire new platforms.

	- _Business Model Evolution_: Shifts from product to service delivery, subscription models, or platform business strategies require corresponding application architecture changes.

- **Crisis Response** - Pandemic, natural disasters, or economic disruption can force immediate application portfolio changes.
	- _Remote Work Enablement_: Sudden remote work requirements expose applications designed for on-premises access. Cloud migration becomes urgent rather than strategic.
	- _Capacity Scaling_: Crisis scenarios may require rapid application scaling - up or down. Applications designed for predictable load patterns may need emergency architecture changes.
	- _Cost Management_: Economic pressure forces rapid application portfolio optimization. Non-essential applications get scrutinized, and cost reduction becomes the primary driver for portfolio decisions.

---

_The Stealth EA approach to application portfolio management isn't about achieving perfection - it's about maintaining enough visibility and control to make informed decisions when they matter most. Whether you're dealing with the slow burn of annual budget cycles or the fire drill of crisis response, having a clear view of your application landscape makes the difference between strategic response and panic purchasing._