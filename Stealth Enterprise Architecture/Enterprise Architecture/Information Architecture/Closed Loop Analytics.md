---
type: Reference
title: "Closed Loop Analytics"
description: "The Closed Loop Analytics pattern isn't just about moving data from applications to dashboards."
timestamp: 2026-06-26T19:19:05Z
feature: Closed Loop Analytics.png
---
### Related Reading
- [[When Chloe Became a Better Ontologist Than Me]] — Kurt Cagle on the holon federation model: holons as self-contained graph endpoints that exchange answers rather than syncing data, AI-assisted entity harmonisation compiled into deterministic pipelines, and equivalence assertions stored as provenance-bearing claims rather than bare `owl:sameAs`. Relevant to lake house entity resolution, schema translation, and data provenance design.

The Closed Loop Analytics pattern isn't just about moving data from applications to dashboards. It's about creating a data architecture that provides the ability to trace the way data is created through the execution of value streams within a domain. From there, building a clear chain of data providence not just to the applications of record for that domain's application portfolio. 

![[Closed Loop Analytics.png]]
Welcome to the **Closed Loop Analytics** pattern - because building a data lake house is easy compared to actually knowing where your data came from and what to do when it's wrong. While your data engineering team celebrates another successful ETL pipeline, the business is still wondering why the dashboard numbers don't match the spreadsheet that Finance maintains in secret.

Think of it as the difference between having a warehouse full of ingredients versus running a kitchen where you can trace every dish back to the farm that grew the vegetables. One gives you inventory; the other gives you accountability. When the CEO asks "why does this report say we lost money last quarter when the ERP says we made a profit?" - you need the accountability version.

The Closed Loop Analytics pattern isn't just about moving data from applications to dashboards. It's about creating an architecture where data quality issues can be traced back to their source and - here's the revolutionary part - actually remediated in the applications that created the problem in the first place.
## The Closed Loop Analytics Data Lake House Design

The architecture follows a layered approach that maintains traceability from source systems through to business insights:
![[Closed Loop Analytics Data Lake House Design.png]]
### Domain Application Portfolio Layer

The foundation starts with understanding the domain's application portfolio and bringing in the application team that supports and maintains those applications.  Here's a few reasons why you might want to bring your application teams into the Closed Loop Analytics Conspiracy:
- **User Experience Business Logic** - The data that applications persisted is not a complete representation of the users experience and who the data is persisted in the application database. 
- **Version control** -  Enhancements small and large are made to applications all the time. Sometimes those affect the way that downstream data products perform, and other times they don't.  Having the insight and making sure that the downstream analytics is considered as part of the development lifecycle is the critical component.
- **User Story Acceptance Criteria** - Many, many times, the data products that are being asked for from the analytics teams are from stakeholders who are not regular users of the application. If the application teams are not aware of these user stories, then the application product(s) they manage won't be enhanced to meet these requirements.  This leaves the downstream data engineers to create translate layers that may or may not be able to be derived from the data they have access to.
- **Application Design Specifications** - Finally, having a domain conceptual data model and, if developed, some good domain data mart dimensions, can allow for better design within the application for both individual application functions, but also possibly by having the application both contribute to and subscribe to the data lake dimensions for better overall data quality.
### Domain Data Lake Layer

The Domain Data Lake is all about data providence. This is an authoritative application data perspective.  This is broken down into two parts.
#### Application Database Replication or Virtualization
The next step is all about bringing raw data from all source applications within a [[MAD Business Domain Catalogue|domain's]] application portfolio into a unified data lake. This isn't about transformation yet - it's about preservation. Every application's data lands here in its original form, maintaining the ability to trace back to the exact state of each source system. 

It may be useful from an application environments perspective. Many applications create operational data stores separate from the main production database. No application service owner wants to see an application brought down by a rogue report query!  Usually the key issue is data latency into the data lake. Sometimes this can be addressed using data virtualization, but the goal should be to make the data available within the data lake as soon as possible.
#### Application Context Components

This is where the magic of **data provenance** happens. Application context components are views created from the data lake that represent how data is persisted for specific user screens or user stories within an application. These aren't arbitrary data structures - they're architectural artefacts that link directly back to application functions. These could be classified as Data Assets and described as Data Products. Rarely would they have their own Data Visualization Output port. That said, for anyone having to retire an application as part of a larger [[Stealth Enterprise Architecture/Enterprise Architecture/Application Architecture/Application Portfolio Management|application portfolio management]] exercise - if you have these data assets and you do need to develop a view of that data asset for audit purposes, you won't be scrambling if the developer of the application is long retired and no one really knows how the application was built as it's on life support.

An application context component answers the question: "What data supports this specific user interaction in this specific application?"

This layer establishes **data provenance** - the documented trail of where data originated. When a number in a report looks suspicious, provenance lets you trace it back through the application context component to the specific application screen where a user entered it. Provenance is about origin; it's the birth certificate for your data.

There is another aspect of Application Context Components if you decide to implement the Domain Data Lake House.  If an application contributes to one or more of the data mart's dimensions, having a specific view of that entity and as many of the attributes that are being persisted for that particular entity dimension is a key aspect of the application context.
### Insight Layer
The insight layer is where we can take the building blocks that have been developed and turn them into insight and more value for the organization. There's three aspects of the insight layer.
#### Data Pipelines
Many people think that Extract, Translate, and Load (ETL) tools are useful for creating a data warehouse or data mart.  To manage the journey from the data lake these tools can equally support data products derived from creating new data assets vs. data products that can be created by querying the data mart directly vs. having to create intermediate data assets.
#### Data Products
From the foundational application context components, higher-functioning data assets and data products emerge. These combine application context components from potentially multiple applications to create business-meaningful datasets that span application boundaries.

This layer establishes **data lineage** - the documented trail of how data has been transformed. While provenance tells you where data came from, lineage tells you what happened to it along the way. Lineage is about transformation; it's the travel history of your data.
#### Data Mart
While building out Data Products from foundational data components is unavoidable, building out a data lake can make the need be reduced dramatically.  This is where having the data lake is again a useful building block.  Some of the Application Context Component can become part of your facts, but the Stealth EA recommendation is to start with dimensions.

Building out dimensions is a great start to completing the closed loop back to the source applications.  It can also support your ability to create data products that span across multiple applications.
## Making this a Closed Loop Analytics Cycle

The loop closes when data quality issues identified in analytical outputs can be remediated in the source applications. This requires:

Most data architectures are one-way streets - data flows from applications to warehouses to dashboards. Closed Loop Analytics creates a round trip where analytical insights can drive operational improvements in the source systems.
## When to apply closed loop analytics

This pattern works best when:

- Data quality is a known issue affecting business decisions
- Multiple applications contribute to the same analytical outputs
- There's organizational willingness to remediate issues at the source
- The domain has a manageable application portfolio (the "two-pizza team" scale)
It's probably overkill when:
- You have a single application of record or a single data technology stack for a domain
- Analytical needs are simple and well-served by application-native reporting
- There's no governance structure to act on data quality findings
## Practical guidance

- **Start with one value stream**: Don't try to implement Closed Loop Analytics across the entire enterprise. Pick a single value stream where data quality issues are causing real business pain, and prove the pattern there first.
- **Application context components are architectural, not technical**: Resist the temptation to define application context components based on database tables. They should reflect user context - how the business thinks about the data, not how the database stores it.
- **Provenance before lineage**: Get provenance right before you worry about complex transformations. If you can't trace data back to its source, adding transformation layers just compounds the mystery.
- **Design dimensions for remediation**: When building your dimensional model, ask "if this number is wrong, what would I need to know to fix it at the source?" The answer should drive your dimension design.

---

_Remember: The goal isn't a prettier dashboard. It's an architecture where data quality issues get fixed, not just reported. That's the loop that matters._
