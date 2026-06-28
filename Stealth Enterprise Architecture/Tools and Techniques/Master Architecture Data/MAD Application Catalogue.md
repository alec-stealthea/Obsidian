---
type: Architecture Artifact
artifact-class: Catalog
title: "MAD Application Catalogue"
description: "Welcome to the MAD Application Catalogue - the application inventory that your CMDB wishes it could be when it grows up!"
timestamp: 2026-06-26T19:19:05Z
---

Welcome to the **MAD Application Catalogue** - the application inventory that your CMDB wishes it could be when it grows up! Unlike its configuration management cousin (who's obsessed with servers and IP addresses), the MAD Application Catalogue actually cares about what applications _do_ for the business, not just what technology nodes they have been implement on.

Think of it as the difference between a car enthusiast who knows every bolt in the engine versus someone who just wants to know if it'll get them to work on time. Both perspectives matter, but when you're trying to accelerate [[Value Streams]] and optimize business outcomes, you need to focus on the "getting to work on time" part.

In our digital world, applications are supposed to be the key tools that accelerate and optimize value streams through creating or enhancing [[Value Stage Capability Instance Model|business capability instances]]. The operative phrase being "supposed to be" - because we all know that one legacy system that everyone's afraid to touch and somehow still runs the entire billing department.

## Core  Catalogue Attributes

The following is the candidate data model for the [[MAD Application Catalogue]].  

| Attribute              | Type   | Values                               | Comments                                                                                                                                                                                                                     |
| ---------------------- | ------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MAD ID                 | number | Unique                               |                                                                                                                                                                                                                              |
| Application Name       | text   |                                      | Usually the full name, but may need to maintain aliases.                                                                                                                                                                     |
| Application Version    | text   |                                      | Usually a number, but may have names                                                                                                                                                                                         |
| Application Vendor     | list   |                                      | Ideally managed as a list to avoid multiple entries                                                                                                                                                                          |
| Functional Description | text   |                                      | This should be a description of the functionality usually in the way that application was designed. It can also contain a narrative of the end user roles and [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain\|business domains]] that use the application |
| Parent Application     | list   | [[MAD Application Catalogue]]        | Many larger applications have modules or sub-modules that need to be understood.                                                                                                                                             |
| Lifecycle Status       | list   |                                      | Usually aligned to the development lifecycle: Analysis, Design, Build, Production, Post Production, Archive                                                                                                                  |
| Replace Application    | list   | [[MAD Application Catalogue]]        | This documents what application is replacing some or all functionality of a givent application.  For information migration, this is usually documented in the [[MAD Information Exchange]]                                   |
| TIER Classification    | List   | Top, Innovation, Enabling, or Retire | This follows the [[Stealth Enterprise Architecture/Enterprise Architecture/Application Architecture/Application Portfolio Management]] approach.                                                                                                                                                              |
| CMDB ID                | list   | CMDB Business Applicaiton            | This is usually mandatory for most organizations, but may not be the only sources.                                                                                                                                           |
| EA Tool ID             | list   | EA Tool unique ID                    | This is a mapping that can be made explicit, or just managed within your EA tool of choice                                                                                                                                   |
Additional data sources can be added with uniques IDs mapped as part of your MAD Data Pipeline.
## MAD Relationships

Remember, [[MAD Relationships]] are not just a foreign key in the [[MAD ERD]]. They have context and meaning that needs to be maintained and curated. These are usually join tables themselves. 

### MAD Application Time
This is usually recording the point in time the application lifecycle status changed from one status to another or is being planned to move from one state to another. This is not to be confused with incremental application releases. Those are important too, but that's a different story for another time.

This is another list that is usually managed by the Enterprise Architecture team, if they are responsible for [[Stealth Enterprise Architecture/Enterprise Architecture/Application Architecture/Application Portfolio Management]].  

| Attribute           | Type   | Values                                                        | Comments                                                                                                                                                      |
| ------------------- | ------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MAD ID              | number | Unique                                                        |                                                                                                                                                               |
| Time                | list   | [[MAD Time]] List                                             | This may vary depending on the different time horizons you many be looking at.  Usually this is at the quarter level to reduce the amount of updates required |
| Application         | list   | [[MAD Application Catalogue]]                                 |                                                                                                                                                               |
| Application Status  | list   | Analysis, Design, Build, Production, Post Production, Archive | Needs to be the same as in the application catalogue. Can be empty, but there needs to be a change in Application Status and/or TIER.                         |
| TIER Classification | list   | Top, Innovation, Enabling, or Retire                          | Needs to be the same as in the application catalogue.                                                                                                         |
| Comments            | text   | Rational for what the change occurred or will be occurring    |                                                                                                                                                               |
### MAD Application Domain
Since [[MAD Business Domains|mad domain]] is usually a list curated by the Enterprise architecture team

| Attribute    | Type   | Values                        | Comments |
| ------------ | ------ | ----------------------------- | -------- |
| MAD ID       | number | Unique                        |          |
| Application  | list   | [[MAD Application Catalogue]] |          |
| Domain       | list   | [[MAD Business Domains]]      |          |
| Relationship | list   |                               |          |
| Comments     | text   |                               |          |
### MAD Application Organization
The uses for the Application Organization can vary depending on how extensively you model these relationships.  A reminder of a principle for MAD is that where at all possible, this data comes from other sources and is automatically maintained.

| Attribute    | Type   | Values                                      | Comments                                                           |
| ------------ | ------ | ------------------------------------------- | ------------------------------------------------------------------ |
| MAD ID       | number | Unique                                      |                                                                    |
| Application  | list   | [[MAD Application Catalogue]]               |                                                                    |
| Organization | list   | [[MAD Organization]]                       |                                                                    |
| Relationship | list   | Owns, Manages, Governs, Manufactures, Sells | This list of attributes is just a sample of what could be tracked. |
| Comments     | text   |                                             |                                                                    |
### MAD Application Capability

Mapping the [[Business Capability]]  to application relationship sounds like a brilliant idea until you actually try to do it. It's like deciding to catalog every possible way people use duct tape - theoretically interesting, practically maddening.

The reality? There are just too many ways that applications can support, enable, sort-of-help-with, potentially enable, or accidentally-break business capabilities. You've got applications that support multiple capabilities, capabilities instances that need multiple applications, applications that used to support capabilities but now everyone works around them, and capabilities that exist purely because someone built an application and insisted it was solving a business problem.

Add in the fact that these relationships change faster than a teenager's mood, and you've got yourself a full-time job for someone with a very high tolerance for complexity and a very low need for sleep.

This is exactly the kind of detailed modelling that Enterprise Architecture tools like [[Stealth EA/Blog Entries/Archi Tool Review|Archi]] were born to handle. Let the tools track the intricate dance between capabilities and applications, while your MAD catalogues stick to what they do best - providing the stable, business-focused foundation that actually helps people make decisions.

Sometimes the most strategic thing you can do is know when _not_ to go down the rabbit hole.