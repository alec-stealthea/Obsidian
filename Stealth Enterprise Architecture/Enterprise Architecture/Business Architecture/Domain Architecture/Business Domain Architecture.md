So you now have your [[Enterprise Domain Model]], what’s next?

Now is the time to better understand a particular business domain more fully. Every organization is complicated and interconnected.  Smaller organizations have complexity based on the relatively fewer staff that need to execute all the domains for that industry.  Larger organizations have the size for specialization that can be made complicated due to the financial model they choose to operate in.

[[Research/Clippings/Domain Driven Design|Domain Driven Design]] (DDD) is fundamentally an application development approach. What I think is needed is more of the [[Business Architecture]] to provide the business context for a given domain. So what are the ingredients that go into a Domain Architecture? 
## Business Objects and Value

First off, no matter how tempting, start with the customer-facing [[Value Streams]]. Without defining the customer-facing value streams there is no context for how the back office value streams can be effective.
## Domain Business Stakeholders
Any domain architecture needs to start with identifying the people and organizations that both operate that domain within the organization and outside. Usually identified as [[Business Roles]] or [[Business Stakeholders]] it is usually useful to start with the domain-specific roles. 

- **Domain Roles** - Every domain has some form or role specialization that is indicated in formal or informal titles. This is a key aspect of domain specialization that will help by defining the user context for the people in the organization most responsible for ensuring that all aspects of the domain architecture are effective.
- **Domain Stakeholders** - Following the [[Enterprise Domain Model]], we need to identify the domain ecosystem stakeholders that receive benefit from, regulate, compensate, and partner with that domain to make it successful. 
### Domain Value Streams Network
More fundamentally, a domain has a collection of value streams that exist within a larger [[Value Stream Network]]. An initial [[Value Stream Motivation Model]] will create the basis for understanding the value that is being generated for the customer as well as any goals or objectives that have been identified for any of the value stream overall or stages within the value stream.
### Instantiating Domain Value Stream Capabilities
The ability to bring the Value Streams into existence depends on the fundamental building blocks of a [[Business Capability]] namely people (roles), processes, information, and tools (like applications). While documenting the capability instances for a particular domain is useful, there are other views and associated models that are useful to document domains.
#### Domain Information Architecture

Domains also have their own [[Information Architecture]]. A lot of what defines a domain's information architecture comes from the external stakeholders who regulate the domain. External stakeholder can be a good place to start since in their effort to regulate a particular domain, they usually have some good supporting conceptual information models and data definitions that will be important overall.

- **Domain Business Object Catalogue** - Every business domain will have their collection of Business Objects unique to that domain.  Where possible, look to re-use other domain or enterprise definitions to reduce the amount of maintenance required to maintain the catalogue.
- **Domain Entity Relationship Diagram** - Linking the business objects into a conceptual or logical Entity Relationship Diagram (ERD) is useful within a domain to better understand the data model at the highest level. This is especially useful when there are multiple applications that use an information object to store attributes of that business object in some context.
- **Domain Business Glossary** - Terms in many organizations can get very complicated with a number of synonyms and evolving definitions over time. Creating and maintaining a business glossary is useful and should usually involve an enterprise tool where possible.
- **Domain Terminology Data Sets** -Many domains maintain and industry standard set of terms and codes to uniformly represent concepts for that domain across organizations.
#### Domain Application Portfolio
Every domain within a larger enterprise will have applications or modules of applications that are specific to their successful operations.

- **Application Portfolio** - A domain's application portfolio is a subset of the enterprise application catalogue that may be represented in the Configuration Management Database (CMDB) or within a Master Application Catalogue if the organization maintains [[Master Architecture Data]].
- **Information Exchanges** - Applications will use many mechanisms to exchange information including unfortunately manually data entry between two applications (a swivel chair interface). Domains will sometimes have industry standard interfaces that are adopted by COTS application vendors that will accelerate the ability to integrate applications within and outside of an enterprise.
- **Information Object Catalogue** - The Information Object Catalogue will typically be associated with Business Objects and how that object has been instantiated within a particular application.
#### Domain Locations
While some domains will not have any locations specific to their domain, many will. It can be useful to separate these into the following classifications:
- **Physical Location** - Buildings that have a fixed address. Sometimes these buildings may be divided into organizations.
- **Mobile Locations** - Many organizations deliver products or services directly where they are needed using vehicles. Some like ambulances, police cars, trains are unique to an industry or domain.
- **Virtual Locations** - Increasingly service delivery happens online which can dramatically expand the scope 
#### Domain User Experience Devices
Finally, domains may have different sets of equipment unique to that domains.
**Devices** - 
**Vehicles** - 
**Machines** - 
**Instruments** - 