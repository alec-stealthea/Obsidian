# MAD Location Catalogue

Welcome to the **MAD Location Catalogue** - because even in our increasingly virtual, cloud-first, "location-independent" world, someone still has to know where the actual stuff is. Despite the promises of the metaverse evangelists, most organizations stubbornly insist on occupying physical space and serving real people in actual places.

While we live in an increasingly virtual world, most organizations continue to have a physical presence. That said, knowing the address of a building is usually not enough. Organizations serve regions. It may be across countries, states, municipalities, or some other geospatial boundaries. Having a master location catalogue is essential. Ideally, the Stealth EA would be able to subscribe to an organization's analytics environment and there would be a Location dimension available. Unfortunately, the Stealth EA has to build their own intelligence network.

Think of the MAD Location Catalogue as your organization's GPS system - except instead of getting you to the nearest coffee shop, it helps you navigate the complex web of where your business actually operates, who works where, and why geography still matters in a digital world.

## What is a Location?

Location is deceptively simple until you actually try to catalog it. Is it the building? The region? The floor where Janet from Accounting mysteriously stores seventeen staplers? The answer, like most things in enterprise architecture, is "it depends" - but we can break it down into hierarchical components that even make sense.

### **Region** - The Big Picture

Defining a region can be difficult. Fortunately, the Stealth EA does not have to go undercover to get what they need. Almost all governments provide a means to break their geographies into different regions. This is usually linked to the way that mail was and sometimes still is distributed. Organizations can define their own regions for whatever purpose using what's available as building blocks.

Regions are where strategy meets geography. They're your sales territories, your service areas, your "we deliver here but not there" boundaries. Sometimes they align neatly with governmental divisions, and sometimes they're as arbitrary as "everywhere the regional manager can drive to in a day."

### **Building** - The Foundation

This is a fundamental building block for the MAD Location entity. Absent all of the other tables, this is the key for any organization that has even a few locations. This includes customer-facing buildings, logistics facilities, and back office locations.

Buildings are real estate that either costs you money (rent/ownership) or makes you money (revenue generation). They're where people work, products are stored, customers are served, and where the Wi-Fi mysteriously stops working during important meetings. Each building has its own personality - from the gleaming corporate headquarters to the warehouse that everyone calls "the bunker."

### **Department** - Where Org Charts Meet Floor Plans

This is where the complexity of organizational structure, financial model, and core domains collide. Most often, a department is associated with a MAD Domain.

Departments are organizational constructs that occupy physical space. They're where the abstract concept of "who does what" meets the very concrete reality of "where do they sit." This gets particularly interesting during reorganizations when departments get moved around like furniture - sometimes with about as much planning.

### **Room** - The Atomic Level

Rooms are where work actually happens. Conference rooms named after inspirational concepts that no one remembers ("Innovation Station," "Synergy Space"), the break room where all the real decisions get made, the server room that's somehow both too hot and too cold, and that mysterious storage room that no one has a key to anymore.

### **Digital Object** - Everything Else

Objects are the fixed or moveable end user devices that are connected in some way to your application portfolio. The Stealth EA is not concerned with devices assigned to individuals (usually), but in the context of locations we're tracking strategic digital assets.  Think Point of Sale terminals, huge cost items like MRI machines, etc.  We rely on the CMDB to track every instance, but having a standard of devices for a given room type may be useful.

## Core Location Catalogue Tables and Attributes

The following is the candidate data model for the **MAD Location Catalogue**. This is a catalogue that would need to be broken down into multiple tables to reflect the levels of complexity.

### MAD Location Base Catalogue

| Attribute        | Type    | Values                                     | Comments                                                     |
| ---------------- | ------- | ------------------------------------------ | ------------------------------------------------------------ |
| MAD ID           | number  | Unique                                     |                                                              |
| Location Name    | text    |                                            | The human-readable name that people actually use             |
| Location Code    | text    |                                            | The official code that appears on forms and nobody remembers |
| Location Type    | list    | Region, Building, Department, Room, Object | The hierarchy level of this location                         |
| Parent Location  | list    | [[MAD Location Catalogue]]                 | Where this location sits in the hierarchy                    |
| Physical Address | text    |                                            | The address that GPS can actually find                       |
| Latitude         | integer |                                            | For when addresses aren't enough                             |
| Longitude        | integer |                                            |                                                              |
| Postal Code      | text    |                                            | Because logistics and government still care about these      |
| Status           | list    | Active, Inactive, Planned, Decommissioned  | Lifecycle status of the location                             |
| Comments         | text    |                                            | Special circumstances, historical context, warnings          |
### MAD Postal Code Region Reference Data

Depending on the size and scope of your organization, there may be many country specific instances of this table.  In general there will be a list of postal codes and at a minimum have state and municipality mapped as separate maintained tables.  If your organization is influenced by the government in any way, you may want to add political boundaries for different areas of government.  
## MAD Relationships

Remember, [[MAD Relationships]] are not just foreign keys in the [[MAD ERD]]. They have context and meaning that needs to be maintained and curated. Location relationships are particularly rich because geography intersects with virtually every other aspect of the enterprise.

### MAD Location Organization

Because someone needs to be responsible for these places, and accountability in physical space is just as important as accountability in digital space.

| Attribute         | Type   | Values                                    | Comments                                      |
| ----------------- | ------ | ----------------------------------------- | --------------------------------------------- |
| MAD ID            | number | Unique                                    |                                               |
| Location          | list   | [[MAD Location Catalogue]]                |                                               |
| Organization      | list   | [[MAD Organization]]                      |                                               |
| Relationship Type | list   | Owns, Leases, Manages, Operates, Services | How the organization relates to this location |
| Start Date        | list   | [[MAD Time]]                              | When this relationship began                  |
| End Date          | list   | [[MAD Time]]                              | When this relationship ends (if known)        |
| Comments          | text   |                                           | Contract details, special arrangements        |

### MAD Location Domain

Because geography influences how business domains operate, and some domains are inherently location-specific while others pretend to be global.

| Attribute         | Type   | Values                                          | Comments                                            |
| ----------------- | ------ | ----------------------------------------------- | --------------------------------------------------- |
| MAD ID            | number | Unique                                          |                                                     |
| Location          | list   | [[MAD Location Catalogue]]                      |                                                     |
| Domain            | list   | [[MAD Business Domain Catalogue]]               |                                                     |
| Relationship Type | list   | Primary, Secondary, Shared, Virtual, Restricted | How the domain operates in this location            |
| Comments          | text   |                                                 | Local variations, exceptions, special circumstances |

### MAD Location Time

Because locations change over time - buildings get renovated, regions get reorganized, and departments get shuffled around like deck chairs.

| Attribute     | Type   | Values                                      | Comments                                    |
| ------------- | ------ | ------------------------------------------- | ------------------------------------------- |
| MAD ID        | number | Unique                                      |                                             |
| Time          | list   | [[MAD Time]] List                           | Usually quarterly to avoid constant updates |
| Location      | list   | [[MAD Location Catalogue]]                  |                                             |
| Status        | list   | Planned, Active, Renovating, Decommissioned | What was/will be happening at this time     |
| Capacity      | number |                                             | Planned or actual capacity at this time     |
| Change Reason | text   |                                             | Why the change occurred or is planned       |
| Comments      | text   |                                             | Details about the change                    |
## Practical Guidance for MAD Location Curators

- **Start with business impact**: Focus on locations that matter to your key value streams. That usually means customer-facing locations, major operational facilities, and anywhere that regulatory compliance depends on geography.
- **Embrace the hierarchy**: Don't try to flatten everything into one big table. The hierarchical nature of location data is a feature, not a bug. Regions contain buildings, buildings contain departments, and so on.
- **Track what changes**: Locations are surprisingly dynamic. Buildings get renovated, departments move, regions get reorganized. Your catalogue should reflect these changes over time, not just the current state.
- **Connect to other MAD entities**: Location data becomes powerful when connected to applications (which systems are available where?), organizations (who operates where?), and business capabilities (what can we do where?).
- **Don't overthink precision**: You need enough detail to support business decisions, not enough to navigate a drone. Sometimes "Northwest Region" is sufficient; sometimes you need the exact conference room.
## When NOT to Catalog Locations

Sometimes the most strategic thing a Stealth EA can do is know when _not_ to go down the location rabbit hole:

- **Virtual-only operations**: If your entire business operates in the cloud and has no physical presence, a location catalogue might be overkill.
- **Highly dynamic locations**: If your organization changes locations more often than people change jobs, you might want to focus on the business processes that enable that flexibility rather than cataloging every temporary space.
- **Micro-locations**: Unless you're running a warehouse or manufacturing operation, [[Master Architecture Data]]  is not intended to catalog every desk and filing cabinet.
## The Reality Check

Here's the thing about location data: it's messier than you think, more important than your digital-first strategy suggests, and surprisingly political. Facilities management, HR, Finance, and Legal all have opinions about location data, and they rarely agree on the details. MAD can connect the dots for them - if you user their applications of record as sources for possible locations of record tied to your MAD Location Identifier.

Your MAD Location Catalogue isn't just about documenting where things are - it's about creating an authoritative source that everyone can live with, even if it's not exactly what anyone initially wanted. It's the Switzerland of enterprise data: neutral, useful, and occasionally the only thing preventing interdepartmental warfare.

Whether you're supporting a facilities consolidation, planning for business continuity, or just trying to figure out why the Seattle office has three times the coffee budget of comparable locations (never mind, we know already), your MAD Location Catalogue is the foundation that makes those conversations possible.

After all, in a world where "location-independent" is the dream, someone still needs to know where everything actually is.
