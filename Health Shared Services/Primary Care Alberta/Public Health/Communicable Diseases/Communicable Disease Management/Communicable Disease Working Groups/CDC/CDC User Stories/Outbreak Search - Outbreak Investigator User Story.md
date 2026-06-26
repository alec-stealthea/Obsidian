---
type: User Story
title: Outbreak Search - Outbreak Investigator User Story
description: Outbreak Investigator capability to search, sort and filter active and historical outbreak investigations so a new outbreak can be confirmed and opened or an existing one updated.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - search
timestamp: 2026-06-25T00:00:00Z
---

## Background

Confirming whether a situation is a new outbreak — or part of one already under investigation — is the first decision an Outbreak Investigator makes. Before declaring and opening a new outbreak, the investigator needs to see what is already active, what has recently closed, and whether the facility, region, organism or PHAC identifier in front of them already maps to an existing investigation. Without a reliable search, the program risks opening duplicate outbreaks for the same event or missing that a "new" report is really an update to an open one.

This story gives the Outbreak Investigator a **search-and-triage entry point** into the Outbreak Management Reporting Application (OMRA), the custom application that replaces REDCap line-list/aggregate reporting and carries forward the CD/OM (CDOM) data-stewardship functions (see [[CLAUDE-OMRA]]). From the search results the investigator can open an existing [[Create Outbreak Investigation Screen Specifications|outbreak investigation]], launch the creation of a new one, or export the filtered set for offline review and reporting. It sits at the **Confirm** stage of the Outbreak Value Stream (*Exposure Trace → Confirm → Open → Manage → Close*) and is the natural predecessor to the create-outbreak and outbreak-summary work.

Search is filtered on the same outbreak attributes the rest of OMRA records — outbreak type, process/lifecycle status, resolution progress, organism, setting, facility/location, assigned investigator and Alberta region — so the result grid is a window onto the `Outbreak` entity and its references in [[OMRA Database ERD]]. Connect Care remains the system of record for individual cases; OMRA owns the outbreak coordination record.

> **Note on resolution-status vocabulary.** The pasted source listed resolution values as *Outbreak / Not an Outbreak / Tracking (monitoring) / Pending (no human has looked at it)*. These map to the ERD `Outbreak.outbreakProgress` enum **Tracking / Outbreak / Not an Outbreak** — "Pending" is treated as the **same state as Tracking** (received and being monitored / not yet resolved), so no separate Pending value is required.

## User Story

- **As an** Outbreak Investigator in Communicable Disease Control (CDC)
- **I need** the ability to search, sort and filter active and historical outbreak investigations
- **so that** I can confirm whether a new outbreak needs to be declared and opened, or whether an existing outbreak should be updated, rather than opening a duplicate.

## Scenarios

- **Scenario A — Confirm a new outbreak (happy path).** An investigator receives a report of gastrointestinal illness at a continuing-care home. They search by facility name and outbreak type, see no open or recently closed outbreak for that site, and launch **Create Outbreak** to open a new investigation.
- **Scenario B — Update an existing outbreak.** A second report arrives for a facility that already has an open respiratory outbreak. The investigator searches by facility/address, finds the open `Outbreak` row, and clicks through to the existing investigation to update it instead of creating a duplicate.
- **Scenario C — Triage by region and organism.** A zone lead filters by Assigned Region (zone / sub-zone / corridor / municipality), outbreak process status *Under Investigation*, and suspected organism, then sorts by onset date to triage the active workload for their area.
- **Scenario D — Export for reporting.** An investigator filters to all outbreaks of a given type and date range and exports the filtered results to Excel / CSV for an aggregate report, with the export recorded for disclosure auditing.
- **Scenario E — Partial / fuzzy search (desirable).** The exact facility name or spelling is unknown. The investigator enters a partial string or a common abbreviation and the search still returns the candidate outbreaks.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Search, sort and filter on the core outbreak attributes.** *Given* the outbreak search screen, *when* the investigator applies one or more filters, *then* the result grid can be searched, sorted and filtered by, at minimum: Outbreak Identifier (#); date range; **open / closed** status; Outbreak Type (e.g., GI, care / non-care, rash, respiratory); Outbreak **Process / Lifecycle** Status (Entered, Open, Closed, Returned, Under Investigation, Investigation Complete); **Resolution Progress** (Outbreak, Not an Outbreak, Tracking — where Tracking covers the monitoring / not-yet-resolved "pending" case — per `Outbreak.outbreakProgress`); Facility Name and/or Address; Investigator assigned (by name); Assigned Region (candidate levels — Zone, Sub-Zone, Corridor, Municipality, Neighbourhood; authoritative region definitions are an outstanding design decision); Outbreak Setting; Organism Type (suspected, primary and secondary organism — `OutbreakOrganism`); Organism Sub-type; and PHAC #. [Public Health Act and Communicable Diseases Regulation — outbreak identification and reporting]
2. **Include closed outbreaks in the result set.** *Given* the search grid, *when* the investigator searches, *then* closed outbreaks are returned and distinguishable from open ones via the open/closed indicator, so the investigator can confirm a report is not an update to a recently closed event. *(Resolves the source question "do we need a closed column in the search grid?" — yes; closed records are in scope, surfaced by the open/closed filter and column.)*
3. **Click through to the outbreak investigation.** *Given* a row in the search results, *when* the investigator selects it, *then* the corresponding [[Create Outbreak Investigation Screen Specifications|outbreak investigation record]] opens for review or update.
4. **Export the filtered results.** *Given* a filtered result set, *when* the investigator chooses export, *then* the visible/filtered results are exported to Excel or a comma-delimited (CSV) file. Because the export discloses PHI, the disclosure is recorded (who / when / scope / row count / disease group / format / purpose) per `DisclosureExportLog`. [Health Information Act (HIA), RSA 2000, c H-5 — use and disclosure, [verify section]; [[OMRA Database ERD]] Section 12]
5. **Launch create-a-new-outbreak from search.** *Given* the search screen, *when* the investigator confirms no matching active outbreak exists, *then* they can launch **Create Outbreak** directly from the search context. [[Create Outbreak Investigation Screen Specifications]]
6. **Region filter levels (placeholder — design decision outstanding).** *Given* the Assigned Region filter, *when* region values are presented, *then* the identified levels — Zone, Sub-Zone, Corridor, Municipality, Neighbourhood — are available as filter options. The authoritative source and final set of region definitions remain an **outstanding design decision**; these levels are carried as placeholders pending that decision.
7. **Privacy-conforming result visibility.** *Given* search results that include facility, region and organism context, *when* they are displayed, *then* results are scoped to the investigator's authorized team / zone / disease group per the OMRA access model, and disease-group privacy boundaries (e.g., HIV/STI) are respected. [[User Maintenance Screen Specifications]]; [Health Information Act (HIA), RSA 2000, c H-5]

### Desirable (Nice to Have)

1. **Partial-match search.** Where the whole name is not known — or there are spelling errors or abbreviations — the search returns candidate matches on partial input rather than requiring an exact string.
2. **Broad keyword search across prior outbreak text and fields.** A single keyword search runs broadly across prior-outbreak narrative text and structured fields, not just the indexed filter columns.
3. **Saved / default filters per investigator.** An investigator's common filter set (e.g., their zone and open status) can be saved or defaulted so triage starts from their working view.
4. **Result-grid column chooser.** The investigator can show/hide and reorder result columns (including the closed indicator) to suit their triage workflow.
5. **Duplicate-candidate prompt.** When the search criteria closely match an existing open outbreak, the screen surfaces the likely duplicate before the investigator launches Create Outbreak.

### Moved out of scope (tracked elsewhere)

- **Re-open a previously closed outbreak.** Re-opening a closed outbreak is **not** part of this search story; it belongs to the Outbreak Summary user story (to be created). Search surfaces closed outbreaks and links to them; the re-open action lives on the summary/investigation record. *(Plain-text reference only — the Outbreak Summary story note does not yet exist, so no WikiLink is created.)*

## Dependencies

- **Create Outbreak / `Outbreak` ERD revision (later analysis round).** The Disease, Setting and Region filters in AC1 depend on `Outbreak` attributes not yet in the data model — there is no direct `infectiousDiseaseID` (Disease), `outbreakSettingID` (Setting), or `zoneID` / region columns on `Outbreak` (flagged in [[Create Outbreak Investigation Screen Specifications]] and [[OMRA Database ERD]]). These will be addressed in a **later round of Create Outbreak / ERD analysis**. When that note or ERD revision is created, a dependency link from this story must be added here.
- **Outbreak Summary user story (to be created).** The re-open-closed-outbreak action (see *Moved out of scope*) lives on the Outbreak Summary story. When that note exists, link it here.

## User Story Metadata

|                              |                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                                    |
| Value Stream Stage Workflow  | Confirm (C)                                                                                                                                     |
| User Story ID                | O-C-3                                                                                                                                           |
| Role                         | Outbreak Investigator (Communicable Disease Control / CDC)                                                                                      |
| Status                       | Analysis                                                                                                                                        |
| Build Team(s)                | Outbreak Application Team                                                                                                                        |
| Related Design Spec          | [[Create Outbreak Investigation Screen Specifications]]; [[OMRA Database ERD]]                                                                  |
| Related Pattern Story        | [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]]                                                                    |
| Reference Material           | [[CLAUDE-OMRA]]; [[Communicable Disease Maintenance Screen Specifications]]; [[User Maintenance Screen Specifications]]                          |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation; Health Information Act (HIA), RSA 2000, c H-5; PHAC reporting                              |
| Link to System Design Doc    | [Link — TBD]                                                                                                                                    |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                                    |
| Last Updated                 | June 25, 2026                                                                                                                                   |
| Updated by                   | Alec Blair                                                                                                                                      |

### Update Comments

- 2025-12-01: Alec Blair — updated to new user story template and cross-mapped where applicable to legislation or guidance.
- 2026-06-25: Alec Blair — migrated from OneNote into the HSS user-story standard. Added Background, five concrete scenarios, two-tier Given/When/Then acceptance criteria with Public Health Act / HIA / PHAC traceability, and links to the OMRA create-outbreak spec, ERD and access model. Mapped source fields to the ERD `Outbreak` entity, resolved the "closed column" question (AC2), moved "re-open closed outbreak" to the Outbreak Summary story, and flagged the "Pending" resolution-status value and region-definition source for confirmation.
