---
type: Architecture Artifact
title: "MAD Information Exchange"
description: "Welcome to the MAD Information Exchange Catalogue - because knowing your applications have APIs is cute, but understanding which data flows are critical in maintaining your value stream networks?"
timestamp: 2026-06-26T19:19:05Z
---

Welcome to the **MAD Information Exchange Catalogue** - because knowing your applications have APIs is cute, but understanding which data flows are critical in maintaining your value stream networks? That's enterprise architecture. While your integration team maintains detailed sequence diagrams, you need a cipher to translate API code words, and your data architects create entity relationship models, the MAD Information Exchange Catalogue focuses on the business-critical conversations happening between your applications every day.

Think of it as the difference between having a phone directory with everyone's number versus understanding who actually calls whom and what they talk about. You might know all the technical endpoints, but do you know which information flows will bring your business to its knees if they stop working? When push comes to shove and the CEO asks "what breaks if this system goes down," you need the conversation map, not the technical manual.

In between the realm of microservices and monolithic applications, the modern enterprise needs to exchange information between applications inside and outside of their organization. Some of these may be application programmatic interfaces, others might be using batch files. Unfortunately all too often it is through a swivel chair interface where humans act to move data from one screen to the other.

Within [[Master Architecture Data]], Information Exchanges are powerful. In general, Information Exchanges for MAD link entities in the [[MAD Application Catalogue]]. Within ArchiMate this would be represented by the Flow connection between Application Components.

## Core Information Exchange Catalogue Attributes

The following is the candidate data model for the **MAD Information Exchange Catalogue**. Remember, this isn't about documenting every field in every API - it's about understanding the meaningful flows of information that enable business value.

| Attribute               | Type   | Values                                                                    | Comments                                                                                                                                                  |
| ----------------------- | ------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MAD Exchange ID         | number | Unique                                                                    |                                                                                                                                                           |
| Exchange Name           | text   | [Source Application] to [Destination Application] [Frequency] [Data Type] | The formula on the right could be used to make it easy to understand the Information Exchange context without looking at the metadata.                    |
| Source Application      | list   | [[MAD Application Catalogue]]                                             | Where the information originates from a business perspective                                                                                              |
| Destination Application | list   | [[MAD Application Catalogue]]                                             | Where the information lands and gets used                                                                                                                 |
| Information Object      | list   | [[Information Objects]]                                                   | Ideally, having a high-level of key business objects that have associated data objects can be useful.                                                     |
| Exchange Type           | list   | API, Batch File, ATL, Message Queue, Swivel Chair                         | How the information actually moves between the applications (see below)                                                                                   |
| Exchange Frequency      | list   | Real-time, Hourly, Daily, Weekly, Monthly, On-Demand, Ad-hoc              | How often this exchange happens                                                                                                                           |
| Exchange Status         | list   | Active, Planned, Retired, One Time                                        | A one-time information exchange can be useful to document in the context of Application Retirement traceability with [[Stealth Enterprise Architecture/Enterprise Architecture/Application Architecture/Application Portfolio Management]] |
| Business Criticality    | list   | Critical, High, Medium, Low                                               | Follow the [[Risk Architecture 1]] for your organization                                                                                                    |
| Data Volume             | list   | Low (<100 records/day), Medium (100-10K), High (10K-1M), Very High (>1M)  | Approximate scale to understand capacity needs                                                                                                            |
| CMDB ID                 | list   |                                                                           | Hopefully, this is managed within the CMDB so that you know who's responsible when this breaks at 2 AM                                                    |
| Change Comments         | text   |                                                                           | Understand what may have changed and ideally track who made the change.                                                                                   |

## Information Exchange Types (The Reality Spectrum)

- **API**: The promised land where everything happens instantly and nothing ever breaks. Usually works great until someone changes a field name without telling anyone.
- **Batch File**: The reliable workhorse. Predictable, debuggable, and has been moving your data faithfully since 1995. Not sexy, but it gets the job done.
- **Extract Translate and Load** - 
- **Message Queue**: For when you want the benefits of real-time with the complexity of distributed systems. Perfect for architects who miss the good old days when failure modes were simple.
- **Swivel Chair**: The most common integration pattern in enterprise architecture, though rarely documented in the technical specifications. Highly flexible, self-healing, but doesn't scale well.

## MAD Relationships

Information Exchange is somewhat isolated in that it is only associated with MAD Applications and MAD Data Types within the catalogue attributes themselves.  [[Application Information Exchange Model]] maintained within you Enterprise Architecture tool goes to a level that cannot be maintained within Master Architecture Data.

To help identify information exchanges within the Value Stream context, the Stealth EA has Information Exchange within their business capability catalogue.  While at the conceptual level you would know which value stream stages for a particular value stream requires information exchanges, if you model to the business capability instance level, you will see the specific applications and information being exchanged. All of this is within your Enterprise Architecture modelling tool vs. being surfaced in your Master Architecture Data.

As with all MAD Entities, if you want to manage a state change over time, you can add a relationship to MAD Time to reflect past or planned future changes.
## Practical Guidance for MAD Curators

- **Start with business impact**: Focus on your 'Top Applications' that you identified when you TIERed your [[Stealth Enterprise Architecture/Enterprise Architecture/Application Architecture/Application Portfolio Management|application portfolio]].
- **Embrace the swivel chair**: Document manual processes as first-class information exchanges. They're always out there and a prime opportunity for productivity improvement.
- **Track what breaks**: The exchanges that fail regularly are the ones that need attention, not necessarily the ones with the most sophisticated technology.
- **Plan for change**: Information exchanges evolve. Build your catalogue to track these changes over time, not just the current state. Hopefully your CMDB can be one of your data sources - at least for the automated information exchanges.

## When NOT to Catalog Information Exchanges

Sometimes the most strategic thing you can do is know when _not_ to go down the rabbit hole:

- **Internal application flows**: If the information never leaves the application boundary, it's probably not worth cataloging at the MAD level.
- **Temporary workarounds**: That one-time data migration you built six months ago that's somehow still running can probably stay undocumented, but you never know what that will come around to be mission critical.
- **Micro-level API calls**: Not every REST endpoint needs to be in your enterprise architecture model.

Remember, MAD is about enabling decision-making, not creating comprehensive documentation of every data flow in your enterprise. Focus on the exchanges that matter for business value, system reliability, and strategic planning.

The goal is insight, not inventory.