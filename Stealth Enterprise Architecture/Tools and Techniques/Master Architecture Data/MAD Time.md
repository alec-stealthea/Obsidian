---
type: Architecture Artifact
title: "MAD Time"
description: "Welcome to the MAD Time Catalogue - the temporal dimension that transforms your architecture dynamic roadmaps!"
timestamp: 2026-06-26T19:19:05Z
---

Welcome to the **MAD Time Catalogue** - the temporal dimension that transforms your architecture dynamic roadmaps! Unlike your project management timeline (which exists in a parallel universe where everything finishes on schedule), the MAD Time Catalogue actually acknowledges that enterprise architecture evolves in quarterly chunks, not daily sprints.

Think of it as the difference between a photograph and a time-lapse video. Your current state architecture documentation is the photograph - useful for understanding what exists right now. But when you're trying to plan application retirements, facility moves, or organizational transformations, you need the time-lapse perspective to understand what's changing, when it's changing, and how all those changes relate to each other.

The Stealth EA recognizes that precision timing is often the enemy of practical planning. We don't need to know exactly when the new CRM system goes live down to the minute - we need to know it's happening in Q3 2025 so we can plan the data migration, user training, and inevitable "why did everything break" meetings that follow.

## Why Time Matters in MAD (Beyond Project Timelines)

Time in Master Architecture Data isn't about tracking project milestones or sprint velocities. It's about understanding the **temporal relationships** between architectural changes that create either synergies or chaos:

- **Roadmap Dependencies**: Understanding which application retirements must happen before new system implementations
- **Facility Implications**: Knowing when office moves impact which applications and their user communities
- **Technology Refresh Cycles**: Coordinating hardware refreshes with application lifecycle timing
- **Organizational Changes**: Planning how domain restructuring affects application ownership over time

Most importantly, MAD Time provides the **planning horizon** that makes enterprise architecture more than just documentation - it becomes a strategic tool for managing change over time.
## Core MAD Time Catalogue Attributes

The following is the candidate data model for the **MAD Time Catalogue**. Remember, this isn't about project scheduling - it's about creating temporal containers for architectural planning.

| Attribute        | Type   | Values                      | Comments                                                                  |
| ---------------- | ------ | --------------------------- | ------------------------------------------------------------------------- |
| MAD Time ID      | number | Unique                      |                                                                           |
| Time Period Name | text   | Q1 2025, FY2026, etc.       | Human-readable identifier that makes sense in your organizational context |
| Period Type      | list   | Quarter, Year, Half, Custom | The granularity of this time period                                       |
| Start Date       | date   | YYYY-MM-DD                  | Beginning of this time period                                             |
| End Date         | date   | YYYY-MM-DD                  | End of this time period                                                   |
| Calendar Type    | list   | Fiscal, Calendar            | Whether this follows fiscal year, calendar year                           |
## MAD Time Relationships

Time relationships are where MAD Time becomes powerful. These aren't just foreign keys - they represent the temporal context that makes architectural planning possible.

### MAD Application Time

Because application lifecycles don't follow the project management textbook - they follow organizational reality, budget cycles, and the occasional "emergency replacement because the vendor got acquired."

| Attribute        | Type   | Values                                                                | Comments                                                     |
| ---------------- | ------ | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| MAD ID           | number | Unique                                                                |                                                              |
| Application      | list   | [[MAD Application Catalogue]]                                         |                                                              |
| Time Period      | list   | [[MAD Time]]                                                          |                                                              |
| Lifecycle Status | list   | Analysis, Design, Build, Production, Post Production, Archive, Retire | What's happening to this application during this time period |
| Change Type      | list   | New, Major Update, Minor Update, Maintenance, Retirement, Migration   | The nature of change happening in this time period           |
| Comments         | text   |                                                                       | Rationale for timing, dependencies, or constraints           |
### MAD Facility Time

Because real estate doesn't move at digital speed, and somebody needs to plan for when the datacenter lease expires or the new office opens.

| Attribute        | Type   | Values                                            | Comments                                                         |
| ---------------- | ------ | ------------------------------------------------- | ---------------------------------------------------------------- |
| MAD ID           | number | Unique                                            |                                                                  |
| Location         | list   | [[MAD Location]]                                  |                                                                  |
| Time Period      | list   | [[MAD Time]]                                      |                                                                  |
| Change Type      | list   | Open, Close, Expand, Contract, Relocate, Renovate | What's happening to this facility                                |
| Comments         | text   |                                                   | Lease details, impact on applications, affected user communities |
### MAD Organization Time

Because organizational changes happen with the subtlety of continental drift and the documentation quality of a game of telephone.

| Attribute        | Type   | Values                                                               | Comments                                                         |
| ---------------- | ------ | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| MAD ID           | number | Unique                                                               |                                                                  |
| Organization     | list   | [[MAD Organization]]                                                 |                                                                  |
| Time Period      | list   | [[MAD Time]]                                                         |                                                                  |
| Change Type      | list   | Acquisition, Merger, Divestiture, Restructure, Partnership, Contract | What's changing in the organizational relationship               |
| Relationship     | list   | Parent, Subsidiary, Partner, Vendor, Customer, Regulatory            | The nature of the organizational relationship during this period |
| Comments         | text   |                                                                      | Context about the change and its implications for architecture   |
## When NOT to Track Time in MAD

Sometimes the most strategic thing you can do is know when temporal tracking adds complexity without value:

- **Operational Changes**: Day-to-day application updates and patches don't need MAD Time tracking
- **Tactical Projects**: Short-term fixes and enhancements are better tracked in project management tools
- **Speculative Planning**: Don't create time periods for "someday maybe" initiatives until they have some organizational commitment
- **Over-Precision**: Resist the urge to plan architectural changes down to specific weeks or days

## MAD Time Trap

Before you get excited about building the ultimate architectural time machine, let's have an honest conversation about what you're signing up for. MAD Time is seductive - imagine having perfect visibility into past decisions and future roadmaps! But like most seductive things in enterprise architecture, it can quickly become your most high-maintenance relationship.

**The Reality Check**: MAD Time only works if you have reliable data sources that actually care about time. If your application portfolio management tool thinks "lifecycle status" is a suggestion, or your facilities team tracks moves in Excel spreadsheets that get updated "whenever someone remembers," then MAD Time becomes a beautiful fiction maintained by one very dedicated (and increasingly frustrated) architect.

**The Automation Dependency**: Here's the uncomfortable truth - manual time tracking in enterprise architecture is where good intentions go to die. You'll start with the best of intentions, diligently updating application retirement dates and facility move timelines. Six months later, you'll realize half your "planned for Q2" items are still showing as "planned for Q2" even though Q4 just ended.

**The Strategic Question**: Are you building MAD Time because you have automated feeds from planning tools that actually track temporal changes? Or are you building it because roadmaps sound strategic and executives like timelines? One of these leads to valuable architectural intelligence. The other leads to a very pretty spreadsheet that everyone ignores.

**The Commitment Reality**: If your CMDB doesn't track application lifecycle timing, your facilities management system doesn't integrate with anything, and your project management office changes tools every 18 months, then MAD Time becomes a manual curation exercise. Ask yourself: do you want to be the person who owns the "master timeline" for enterprise architecture? Because that's what you're volunteering for.

**When to Proceed (Cautiously)**: MAD Time makes sense when you have systems that naturally generate temporal data and can feed MAD automatically. If you're manually maintaining time relationships, you're not building enterprise architecture - you're building a very expensive project management database that will be out of date before your next quarterly review.

The Stealth EA motto applies here: **automate or abdicate**. Either your data sources do the work, or you politely decline to be the keeper of enterprise time.
## Conclusion

MAD Time transforms your enterprise architecture from a static inventory into a dynamic roadmap. By understanding not just what exists, but when things change and how those changes relate to each other, you can move from reactive firefighting to proactive architectural planning.

The goal isn't perfect prediction - it's better preparation. When someone asks "what's our roadmap for retiring legacy applications?" or "how does the office move affect our cloud migration timeline?", MAD Time gives you the framework to provide thoughtful, data-driven answers instead of educated guesses.

Remember: Time in enterprise architecture isn't about precision - it's about perspective. The question isn't whether your timing will be exactly right, but whether you're thinking about the right relationships over the right time horizons to make better architectural decisions.