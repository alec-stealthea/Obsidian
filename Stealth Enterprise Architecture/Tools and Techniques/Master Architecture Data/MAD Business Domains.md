---
type: Architecture Artifact
title: "MAD Business Domains"
description: "Welcome to the MAD Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain Catalogue - the business architecture foundation that complements!"
timestamp: 2026-06-26T19:19:05Z
---

Welcome to the **MAD [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]] Catalogue** - the business architecture foundation that complements! Unlike that static org chart hanging in the break room (which was outdated before the ink dried), the MAD Business Domain Catalogue actually cares about how work flows through your organization, not just who reports to whom.

Think of it as the difference between a city's political boundaries versus its actual neighbourhoods. The political map tells you who's in charge of what, but the neighbourhood map tells you where people actually live, work, and create value. Neighbourhoods don't change, but political boundaries can.  When you're trying to optimize [[Value Streams]] and understand how business really gets done, you need the neighbourhood perspective.

In our domain-driven world, business domains are supposed to be the stable, logical groupings that transcend organizational reshuffles and the latest management consulting fad. The operative phrase being "supposed to be" - because we all know that one department that somehow touches everything and nobody's quite sure what they actually do.

## Why Business Domains Matter (Beyond Buzzword Bingo)

Business domains provide the **bounded contexts** that Eric Evans wrote about in Domain Driven Design, but applied to your entire enterprise architecture. They're the logical containers where:

- **Ubiquitous language** actually means something (instead of corporate speak that means everything and nothing)
- **Value streams** have clear ownership and accountability
- **Business capabilities** can be properly organized and optimized
- **Applications** can find their true home

Most importantly, domains resist the gravitational pull of organizational restructuring. While departments come and go like fashion trends, domains represent the fundamental ways your organization creates value.

## Core Business Domain Catalogue Attributes

The following is the candidate data model for the **MAD Business Domain Catalogue**. Remember, this isn't about recreating your org chart - it's about creating stable containers for how work actually flows.

| Attribute          | Type   | Values                                                    | Comments                                                                      |
| ------------------ | ------ | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| MAD Domain ID      | number | Unique                                                    |                                                                               |
| Domain Name        | text   |                                                           | The name should reflect the domain's purpose, not the current department name |
| Domain Description | text   |                                                           | What value does this domain create? What's its reason for existence?          |
| Domain Type        | list   | Back Office, Front Office, Extended, Knowledge Management | These pick lists will come from your [[Enterprise Domain Model]]              |
| Parent Domain      | list   | [[MAD Business Domain Catalogue]]                         | Domains can be hierarchical, but keep it simple.                              |

### MAD Domain Location

Because geography still matters, even in our cloud-first world. Some domains are location-specific, others are global, and some exist in that weird in-between space where nobody's quite sure who's responsible for what and more particularly - where. 

| Attribute         | Type   | Values                              | Comments                                                                                     |
| ----------------- | ------ | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| MAD ID            | number | Unique                              |                                                                                              |
| Domain            | list   | [[MAD Business Domain Catalogue]]   |                                                                                              |
| Location          | list   | [[MAD Location]]                    | This may become multiple entries depending on the complexity of your MAD location catalogue. |
| Relationship Type | list   | Primary, Secondary, Shared, Virtual | How is this domain present in this location?                                                 |
| Comments          | text   |                                     | Any special circumstances or historical context                                              |
### MAD Domain Relationships not managed

Remember that, where possible, MAD data exists by getting data from other sources.  MAD Domains is an Enterprise Architecture creation and is rarely propagated to business applications. If your organization is so enlightened - wonderful. Add away.

Similar to mapping capabilities to applications, mapping domains to capabilities is best done in your Enterprise Architecture modelling tool. This is especially true since business capabilities are rarely directly unique to one domain.  Further, if you follow the [[Stealth EA Metamodel]], business capabilities contained by Value Stream Stages. It is a lot of work to manage indirect relationships directly, so don't try. your data will get stale.