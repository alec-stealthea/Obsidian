---
aliases:
  - Organization
---
Welcome to the **MAD Organization Catalogue** - the stakeholder ecosystem map that your org chart misses! Unlike that internal directory that stops at your company's front door, the MAD Organization Catalogue recognizes that your enterprise operates within a complex network of suppliers, partners, regulators, and other entities that can make or break your [[Value Streams]].

Think of it as the difference between knowing your family versus understanding your entire neighbourhood. Sure, you know who lives in your house, but when the power goes out, you need to know which neighbour has the generator, which one works for the utility company, and which one stockpiles candles. In the enterprise world, when systems fail or regulations change, you need to know your extended ecosystem.

The Extended Enterprise isn't just consulting jargon - it's the practical reality that most business capabilities span organizational boundaries. Your "simple" customer onboarding process might touch your CRM vendor's servers, your compliance partner's validation services, and three different payment processors before anyone gets a welcome email.

## Why Organizations Matter in MAD (Beyond Contact Lists)

Organizations in Master Architecture Data aren't about maintaining vendor contact information or tracking who to call when the printer breaks. They're about understanding the **entrprise architecture dependencies** that cross organizational boundaries:

- **Interface Ownership**: Which organization controls the APIs that your critical applications depend on
- **Regulatory Authority**: Understanding which organizations can change the rules that your compliance applications must follow
- **Supplier Dependencies**: Knowing which partners provide services that enable your core business capabilities
- **Customer Ecosystems**: Mapping the organizational relationships that affect how value flows to your end customers

Most importantly, organizations provide the **governance context** that makes enterprise architecture more than just internal optimization - it becomes a tool for managing dependencies you don't directly control.

## Core Organization Catalogue Attributes

The following is the candidate data model for the **MAD Organization Catalogue**. Remember, this isn't about recreating your vendor management system - it's about understanding the organizational boundaries that affect your architecture.

| Attribute              | Type   | Values                                                     | Comments                                                                       |
| ---------------------- | ------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| MAD Organization ID    | number | Unique                                                     |                                                                                |
| Organization Name      | text   |                                                            | The legal or commonly recognized name                                          |
| Organization Type      | list   | Partner, Supplier, Regulator, Customer, Subsidiary, Parent | Based on the relationship to your organization                                 |
| Industry Sector        | list   | Financial Services, Healthcare, Manufacturing, etc.        | Helps understand regulatory and compliance contexts                            |
| Regulatory Authority   | list   | Federal, State/Provincial, Municipal, Industry, None       | What level of regulatory power this organization holds                         |
| Data Residency Region  | list   | North America, Europe, Asia Pacific, etc.                  | Critical for understanding data sovereignty and compliance requirements        |
| Business Relationship  | text   |                                                            | Brief description of how this organization relates to your business operations |
| Contract Status        | list   | Active, Pending, Expired, Terminated                       | Current legal relationship status                                              |
| Primary Contact Method | list   | API, Portal, Email, Phone, Manual                          | How your organization typically interfaces with this entity                    |

Additional data sources can be added with unique IDs mapped as part of your MAD Data Pipeline - your vendor management system is probably the starting point.

## MAD Relationships

### Organization Application

Because interface complexity increases exponentially across organizational boundaries. What looks like a simple API call internally becomes a complex dance of authentication, data formats, and SLA management when it crosses organizational lines.

| Attribute           | Type   | Values                                        | Comments                                                                             |
| ------------------- | ------ | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| MAD ID              | number | Unique                                        |                                                                                      |
| Application         | list   | [[MAD Application Catalogue]]                 |                                                                                      |
| Organization        | list   | [[MAD Organization Catalogue]]                |                                                                                      |
| Interface Type      | list   | API, Portal, Batch Transfer, Manual, Embedded | How the application interacts across the organizational boundary                     |
| SLA Requirements    | text   |                                               | Any specific performance or availability requirements for this interface             |
| Comments            | text   |                                               | Special circumstances, historical context, or known issues                           |

### Organization Location

Because geography affects everything from data sovereignty to time zones, and some organizational relationships only make sense in specific geographic contexts.

|Attribute|Type|Values|Comments|
|---|---|---|---|
|MAD ID|number|Unique||
|Organization|list|[[MAD Organization Catalogue]]||
|Location|list|[[MAD Location]]||
|Presence Type|list|Headquarters, Branch, Data Center, Virtual|How this organization exists in this location|
|Service Scope|list|Global, Regional, Local, Limited|What geographic scope this organization serves from this location|
|Regulatory Impact|list|Primary, Secondary, Compliance Only, None|How this location affects regulatory requirements for your interaction|
|Comments|text||Any location-specific considerations or constraints|

### Other MAD Relationships Not Directly Managed

Organizations connect to many other MAD entities through your enterprise architecture modeling tool rather than direct relationships in MAD:

**Organization to Business Capability**: While it's tempting to map which organizations enable which capabilities, this relationship is usually better understood through the applications and information exchanges. Your payment processing capability might involve three different organizations, but tracking that at the MAD level creates maintenance complexity without strategic value.

**Organization to Business Domain**: Similar to capabilities, domain ownership across organizations is better modeled in your EA tool where you can represent the nuanced relationships. A regulatory domain might be influenced by multiple organizations with different scopes of authority.

## Practical Guidance for MAD Curators

**Start with business impact**: Focus on organizations that appear in your 'Top Applications' dependencies or that could single-handedly disrupt major value streams. The office supply vendor probably doesn't need the same level of architectural tracking as your payment processor.

**Embrace the ecosystem perspective**: Don't limit yourself to direct contractual relationships. That regulatory body you've never spoken to might still be the organization that could shut down your entire compliance application with a single rule change.
## When NOT to Catalog Organizations

Sometimes the most strategic thing you can do is know when _not_ to expand the organizational universe:

**Internal departments**: Unless they operate as separate legal entities with their own systems and interfaces, internal organizational units are usually better tracked through your business domain model.

**Commodity suppliers**: If you could easily substitute one organization for another without architectural impact, they probably don't need to be in MAD. Your paper supplier matters to procurement, but rarely to enterprise architecture.

**Indirect relationships**: Organizations that you only interact with through other organizations usually don't need separate tracking. Focus on the direct architectural relationships.

## Stealth EA Perspective

For the Stealth EA, mapping your organizational ecosystem is like understanding the intelligence networks in a good spy thriller. You need to know who has the information, who has the authority to change the rules, and who has the power to cut off your access when things get complicated.

The goal isn't to catalog every organization in your extended universe - it's to identify the key players whose architectural decisions could affect your mission success. Sometimes the most important organization in your architecture is the one that operates completely outside your industry but controls a critical piece of infrastructure you depend on.

***Remember**: In the interconnected world of enterprise architecture, no organization is an island. But that doesn't mean you need to map every grain of sand on every beach.*