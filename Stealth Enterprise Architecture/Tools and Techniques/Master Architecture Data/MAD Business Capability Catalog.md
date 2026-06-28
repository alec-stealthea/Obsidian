---
type: Architecture Artifact
artifact-class: Catalog
title: "MAD Business Capability Catalog"
description: "Welcome to the MAD Business Capability Catalogue - because knowing you have capabilities is cute, but understanding which ones actually drive your value streams?"
timestamp: 2026-06-26T19:19:05Z
---

Welcome to the **MAD Business Capability Catalogue** - because knowing you have capabilities is cute, but understanding which ones actually drive your value streams? That's intelligence work. While your strategy team creates aspirational capability heat maps and your process improvement folks document what people _should_ be doing, the MAD Business Capability Catalogue focuses on the capabilities that actually matter for executing value streams every day.

The Stealth EA doesn't believe in capability decomposition - that's what your Enterprise Architecture modelling tool is for. Stealth EA focuses on **business capability instances** - the real capabilities that exist in your actual value streams, not the theoretical ones from consulting frameworks. Think of it as the difference between knowing your organization has "communications capabilities" versus knowing exactly who can actually get a message to the right person when the crisis hits. Capability Instances are modelled in your Enterprise Architecture tool vs. in your MAD Entity Catalogues.

## Why a Business Capability Catalogue?

For any Enterprise Architecture practice, having a [[Business Capability]] catalogue is seen as a minimum mandatory requirement. Indeed, having a business capability catalogue is essential - _**if you are using value streams**_ to design your business architecture.

Business capabilities provide the **foundational building blocks** for value stream design and optimization. They answer the fundamental question: "What must we be able to do to deliver value?" But unlike traditional capability models that decompose into infinite levels of abstraction, the MAD business capability catalogue operates more like a well-trained operative - focused, practical, and mission-critical:

- **High-level**: Ask yourself if this is really more of a capability instance vs. a general business capability that spans across many domains.
- **Limited catalogue size**: If you get to more than one hundred capabilities, you may be going too far. A good agent knows their assets - all of them.
- **Supports Business Architecture**: Are your business capabilities supporting how you model your business architecture? Too often business capabilities are structured to map to application functions or technology product features. This is the wrong way around!

Most importantly, the MAD capability catalogue resists the urge to create recursive decomposition trees that look impressive in PowerPoint but collapse under operational pressure. Instantiation is better managed in an Enterprise Architecture modelling tool versus MAD data.
## Core Business Capability Catalogue Attributes

The following is the candidate data model for the **MAD Business Capability Catalogue**. In fact, your Enterprise Architecture tool can often times be an authoritative source for your business capabilities - if it has the ability to manage the governance around changes in a transparent way.

|Attribute|Type|Values|Comments|
|---|---|---|---|
|MAD Capability ID|number|Unique||
|Capability Name|text||Clear, business-focused name that stakeholders actually understand|
|Capability Definition|text||What this capability does, not how it does it. Focus on business outcomes, not technical implementation|
|L1 Classification|list|Front Office, Back Office, Planning and Strategy|Aligns to the [[Business Domain Architecture]] model top level groupings.|
|L2 Classification|list|Finance, IT, Legal, HR, Sales, Planning, Strategy, etc.|You can get inspiration from your business domains, but in the end the second level is more about groups for people to navigate the catalogue|
|Capability Status|list|Active, Planned, Retiring, Retired|Current lifecycle status of this capability|
|Change Comments|text||Additional context, change rationale, or special circumstances|

### Business Capability Change Request Management

To maintain governance and transparency, all requests for changes to the business capability catalogue should be tracked through a formal change request process.

| Attribute                  | Type   | Values                                                   | Comments                                                                             |
| -------------------------- | ------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Change Request ID          | number | Unique                                                   | Sequential numbering for tracking purposes                                           |
| Request Date               | date   |                                                          | When the change request was submitted                                                |
| Requested By               | text   |                                                          | Name and role of person requesting the change                                        |
| Change Type                | list   | Add, Modify, Delete, Merge, Split                        | Type of change being requested                                                       |
| Affected Capability        | list   | [[MAD Business Capability Catalog]]                      | For modifications/deletions; empty for new additions                                 |
| Proposed Capability Change | text   |                                                          | New name or modified name, definition or classification                              |
| Justification              | text   |                                                          | Business rationale for the change request                                            |
| Impact Assessment          | text   |                                                          | Analysis of potential impacts on value streams, applications, and other MAD entities |
| Request Status             | list   | Submitted, Under Review, Approved, Rejected, Implemented | Current status of the change request                                                 |
| Reviewed By                | text   |                                                          | Name and role of reviewer(s)                                                         |
| Review Date                | date   |                                                          | Date of review decision                                                              |
| Decision Rationale         | text   |                                                          | Explanation for approval or rejection                                                |
| Implementation Date        | date   |                                                          | When approved changes were actually implemented in the catalogue                     |
| Implementation Notes       | text   |                                                          | Any special considerations or additional changes made during implementation          |

**Change Request Workflow:**

1. **Submission**: Stakeholder submits change request with clear justification
2. **Impact Assessment**: EA team evaluates potential impacts on related MAD entities and value streams
3. **Review**: Capability governance board reviews request and supporting analysis
4. **Decision**: Request approved, rejected, or returned for additional information
5. **Implementation**: Approved changes implemented and communicated to stakeholders

## L1 and L2 Classification Guidelines

**L1 Classification** follows the proven domain architecture pattern:

- **Front Office**: Customer-facing capabilities that directly impact customer experience and revenue generation
- **Back Office**: Internal capabilities that support operations, compliance, and organizational management
- **Planning and Strategy**: Capabilities focused on organizational direction, analysis, and long-term planning

**L2 Classification** provides the secondary grouping that aligns with your domain architecture:

**Back Office typically includes:**

- Finance (Accounts Payable, Financial Reporting, Budgeting)
- Information Technology (Application Management, Infrastructure Management)
- Human Resources (Talent Management, Payroll, Recruitment)
- Legal (Contract Management, Compliance Management)
- Purchasing (Vendor Management, Procurement)
- Facilities (Space Management, Security)

**Front Office varies by industry but typically includes:**

- Sales (Customer Acquisition, Account Management)
- Marketing (Brand Management, Campaign Management)
- Customer Service (Support Management, Customer Relationship Management)
- Product/Service Delivery (Order Fulfillment, Service Delivery)

**Planning and Strategy is usually consistent:**

- Strategic Planning (Vision Setting, Strategic Analysis)
- Business Intelligence (Analytics, Reporting)
- Risk Management (Risk Assessment, Compliance Monitoring)
- Innovation Management (R&D, New Product Development)

## The Bottom Line

A business capability catalogue is only as good as its connection to actual value delivery. Focus on capabilities that enable value streams, resist the urge to over-decompose, and remember that the goal is business agility, not architectural purity. Like any good intelligence operation, success is measured by results, not by how impressive your organizational chart looks.