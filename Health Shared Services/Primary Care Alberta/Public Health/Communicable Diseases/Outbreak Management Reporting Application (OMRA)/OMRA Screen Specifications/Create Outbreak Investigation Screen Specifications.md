---
type: Screen Specification
title: Create Outbreak Investigation Screen Specifications
description: Build specification for the OMRA Create Outbreak Investigation screen, mapping the Outbreak Summary wireframe to the OMRA database model and establishing the minimum-viable record that anchors the rest of an investigation.
tags:
  - screen-specification
  - omra
  - communicable-disease
  - outbreak-management
timestamp: 2026-06-25T00:00:00Z
---

## Design Specification Context

This screen creates the **outbreak investigation record** that the rest of the Outbreak Management Reporting Application (OMRA) hangs off — the line list, aggregate and AORF reporting, the contact list, and the outbreak team all reference the `Outbreak` row created here. The design intent is a **minimum-viable open**: capture just enough to start an investigation, then enrich the record over time as the situation is understood.

It is the entry point to the OMRA investigation set and sits alongside [[Contact Identification Screen Specifications|Contact Identification]] (where the contacts exposed within an outbreak are worked) and the Foundation maintenance screens — [[User Maintenance Screen Specifications|User Maintenance]], Location / Facility Maintenance, and [[Communicable Disease Maintenance Screen Specifications|Communicable Disease Maintenance]] — that supply its lookups. The Disease lookup is supplied by the disease dictionary, including dictionary entries created through the [[Communicable Disease Maintenance Screen Specifications|Disease Maintenance]] **Add Disease** quick-add (which are immediately selectable but flagged `isProvisional` in [[OMRA Database ERD]] v2.5).

Because TB and (occasionally) STI investigations use the outbreak framework even when they do not meet the formal outbreak case definition, and because the Outbreak ID is expected to serve as the lab-requisition / Exposure Investigation identifier, this screen must support **large-exposure** and **region** investigations, not only facility outbreaks. Connect Care remains the **system of record for individual cases** (see [[CLAUDE-OMRA]] data-ownership boundaries); OMRA owns the outbreak coordination record.

Source material for this specification:

- **Wireframe** — *Outbreak Summary* / *Create Outbreak* (slide 11) in [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx).
- **Data model** — [[OMRA Database ERD]] (v2.5), principally the `Outbreak` entity (Section 1) and its `OutbreakType`, `OutbreakOrganism`, `OutbreakLifecycleStatus`, `OutbreakTeamMember`, `Facility` / `Building` / `Department`, `Zone`, `OutbreakSetting` and `InfectiousDisease` references.
- **Access model** — [[User Maintenance Screen Specifications]] (Role-Based Access Specification).
- **Reference data** — [[Communicable Diseases Reportable Reference List]]; [[Communicable Disease Conceptual Data Model]] and [[Communicable Disease Solution Architecture]] for context.

## Wireframe

The PowerPoint version of this wireframe is *Create Outbreak* (slide 11) in [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx). It will be replaced by a screen-shot of the most recent wireframe once folded into the deck.

The screen captures the core outbreak identity and context: Outbreak ID (auto), Outbreak Name, Outbreak Investigator, Investigation Zone, Disease, Onset Date, Investigation Status and Progress, Outbreak Type, Outbreak Setting, Outbreak Region, Outbreak Location and Department. It includes an action to launch **Outbreak Location Maintenance** to add a location that does not yet exist, and is intended to support a pop-out for region (non-building) outbreaks.

## Acceptance Criteria Specifications

1. **Scenario Conditions** — What scenarios have been defined that may affect the specifications.

   1. *Minimum-viable content.* An investigator must be able to open an outbreak investigation quickly, with only the mandatory identity fields, and add the rest of the data over time as the investigation develops.
   2. *Large exposures vs. outbreaks.* TB in particular — and STI on rare occasion — uses the outbreak-investigation framework even when the situation rarely meets the formal outbreak case definition. The screen must support these without forcing a formal-outbreak interpretation (see `Outbreak.outbreakProgress` — Tracking / Outbreak / Not an Outbreak).
   3. *Provisioning an Outbreak ID for lab requisitions.* To allow lab requisitions where the patient is not yet known (e.g., a daycare sending paper requisitions for family members), the **Outbreak ID** functions like the current Exposure Investigation identifier and is expected to become the EI number (deferred, [[OMRA Database ERD]] note 10).
   4. *Region vs. facility outbreak.* An outbreak may be anchored to a physical building (facility/department) or to a region (municipality/community, zone/sub-zone, provincial). The screen must capture both; region outbreaks have no Location.

2. **Functional Behaviour** — What (if any) business logic needs to be created for this.

   1. A control launches the **Outbreak Location Maintenance** function ([OneNote: Outbreak Location Maintenance Function Specifications](onenote:#Outbreak%20Location%20Maintenance%20Function%20Specifications&section-id={B18CEF0A-7F53-4AAA-959D-FAA331DCD0FD}&page-id={C8CD4A98-2E42-4AB8-B635-2434F225BEB1}&end&base-path=https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/SiteAssets/M365T%20-%20CC%20Notifiable%20Disease%20Projects%20Notebook/Outbreak%20Management%20Application%20Design.one)) so a new location can be added without leaving the create flow.
   2. **Outbreak ID** is system-generated on create and is immutable thereafter; it is the identifier downstream records (line list, contacts, AORF, lab requisitions) reference.
   3. **Create** validates the mandatory fields and writes the `Outbreak` row with `outbreakCreateDate` (system-generated), the creating user (`createdBy`), and the default lifecycle/status/progress values.
   4. The **Disease** lookup reads the disease dictionary; quick-added (`isProvisional`) entries are selectable, so an investigation is never blocked waiting for full dictionary curation.

3. **User Experience Considerations** — What (if any) UX options might we have to consider as part of the build.

   1. This function is part of the overall OMRA Outbreak Management set; keep it visually consistent with [[Contact Identification Screen Specifications|Contact Identification]] and the other investigation screens.
   2. Provide a pop-out / distinct path for a **region** outbreak vs. a **physical building** outbreak, so the irrelevant location fields are suppressed when the outbreak is regional.
   3. Allow the investigator to **add a new user** inline from the Outbreak Investigator lookup, and a new location inline via the Location Maintenance launch (FB 2.1).

4. **Data Inputs and Outputs** — What are the data elements involved for the build object. What test data is needed to support functional testing.

   1. *Inputs* — Investigator-entered outbreak identity and context; lookups from the disease dictionary, Location/Facility, Zone and Outbreak Setting/Type reference data.
   2. *Outputs* — A new `Outbreak` record that anchors the line list, contact list, aggregate/AORF reporting and lab requisitions; the provisioned Outbreak ID.
   3. *Test data* — (a) a **facility outbreak** (continuing-care home, respiratory, with Location + Department); (b) a **TB large exposure** opened as Tracking with no formal outbreak case definition; (c) a **region outbreak** (no Location, municipality/zone region) for daycare lab-requisition provisioning.

5. **Business Rules and Validation** — What (if any) business logic governs this application function and what can be done to build in quality checks for data validation.

   1. An outbreak can be created only when all **mandatory** fields are present (see field table).
   2. **Outbreak Location** and **Department** are required for a facility outbreak and suppressed for a region outbreak; **Outbreak Region** is required when no Location is given.
   3. **Outbreak Type** must be consistent with the AORF definitions.
   4. Confirm whether only certain roles may create outbreak investigations (see Access Specifications).

6. **Exception Handling** — How will the application handle edge cases, missing data, time outs, etc.

   1. **Missing mandatory field** on create → block with inline validation identifying the field.
   2. **Location not yet in the dictionary** → launch Outbreak Location Maintenance (FB 2.1) rather than discarding entry.
   3. **Interface/timeout** on a lookup (Disease, Facility) → allow the value to be selected from cache or saved as pending where non-mandatory.

7. **Business Semantics** — What terminology resonates with the business for this application function.

   - "Outbreak Investigation"; "Outbreak ID" (doubling as the Exposure Investigation / EI / lab-requisition identifier); **Tracking / Outbreak / Not an Outbreak** (investigation progress); "Setting" and "Region"; "Investigator" (MOH or designate); "Onset Date."

| Screen Field | Data Type | Database Field | Data Standard | Default Value | Mandatory? | Comments |
|---|---|---|---|---|---|---|
| Outbreak ID | Alpha Numeric | `Outbreak.outbreakID` | Auto-generated | None – auto | Yes | Immutable; expected to also serve as the EI / lab-requisition number (deferred, [[OMRA Database ERD]] note 10). |
| Outbreak Name | Alpha Numeric | `Outbreak.outbreakName` | — | May auto-name from facility + disease + date | No | Confirm the naming convention that could pre-populate from other fields. |
| Outbreak Investigator | Lookup | `Outbreak.outbreakInvestigationLead` → `Person.personID` (team via `OutbreakTeamMember`) | Lookup on Person / AppUser | Logged-in user | Yes | MOH or designate; `OutbreakTeamMember` captures the wider team. Inline "add a new user." |
| Investigation 'Zone' | Lookup | `Zone.zoneID` (ABAC scope via `UserZone`) | Calgary, Edmonton, Central, North, South | None | Confirm | **Gap** — `Outbreak` has no direct `zoneID`. For a facility outbreak the zone derives via `Facility.zoneID`; a region outbreak with no facility has no zone anchor. Confirm whether to add `Outbreak.zoneID`. |
| Disease | Lookup | `InfectiousDisease.infectiousDiseaseName` (via `OutbreakOrganism` → `Organism`/`DiseaseOrganism`, and `OutbreakDefinition`) | Provincial notifiable-disease dictionary | None | Yes | **Gap** — no direct `Outbreak.infectiousDiseaseID`; disease attaches only indirectly via organism/definition. Confirm whether to add a direct FK. Quick-added (`isProvisional`, v2.5) diseases are selectable. |
| Created by | Lookup | `Outbreak.createdBy` → `Person.personID` | Lookup on user table | Logged-in user | Yes | Not visible on screen; part of the create record. |
| Create Date (audit) | Date-Time | `Outbreak.outbreakCreateDate` | Date-Time | System-generated, non-editable | Yes | Not visible on the create screen; part of the outbreak record. |
| Onset Date | Date-Time | `Outbreak.outbreakStartDate` | Date-Time | Current date, back-datable | Confirm | The wireframe "Onset Date" maps to `outbreakStartDate` (date the outbreak is declared to have met case definition). Confirm whether a distinct symptom-onset date is also needed. |
| Investigation Status | Lookup | `Outbreak.outbreakStatus` | Open / Closed / Re-opened | Open | Yes | May be hidden under "Open" on create. **Note** the overlap with `outbreakLifecycleStatus` (New, Assess, Active, Suspended, Closed, Reopened) — confirm which drives the UI. |
| Investigation Progress | Lookup | `Outbreak.outbreakProgress` | Tracking / Outbreak / Not an Outbreak | Tracking | Yes | Supports the large-exposure scenario (TB/STI opened as Tracking). |
| Outbreak Type | Lookup | `Outbreak.outbreakType` → `OutbreakType.outbreakTypeID` | AORF-aligned type list | None | No | Must be consistent with the AORF definitions. |
| Outbreak Setting | Lookup | `OutbreakSetting.outbreakSettingID` | Outbreak Setting list | None | Yes | **Gap** — no direct `Outbreak.outbreakSettingID`; setting currently lives on `Facility.primaryOutbreakSettingID` / `OutbreakDefinition`. For non-building settings (plane, region) confirm where it is stored; likely add `Outbreak.outbreakSettingID`. |
| Outbreak Region | Lookup | — | Municipality/Community · Zone/Sub-zone · Provincial | None | Conditional | **Gap** — no `Outbreak.region` column or region-type reference. Required for region (non-facility) outbreaks. Decide region-type granularity and add the field(s). |
| Outbreak Location | Lookup | `Outbreak.outbreakFacility` → `Facility.facilityName` | Location/Facility list, filtered by Setting | None | Conditional | Required for facility outbreaks, absent for region outbreaks. Launches Outbreak Location Maintenance to add a new location (FB 2.1). |
| Outbreak Department | Lookup | `Department.departmentName` (via `Building`/`Department`, filtered by Location) | Department list | None | No | **Gap** — old mapping pointed at `facilitySubTypeName`; `Outbreak` has no department FK. Confirm whether an outbreak-level department is captured here or only at line-list/contact level. |

## Technical Implementation Notes

- **Access Specifications** — Creating an outbreak investigation is investigator activity within the OMRA access model ([[User Maintenance Screen Specifications]]). Confirm whether outbreak creation is restricted to specific functional roles (e.g., Investigator and above) and scoped by team/zone/disease group, or open to all intake users.
- **Security Specifications** — The `Outbreak` record itself is coordination metadata, but it is the parent of records that hold personal health information (line list, contacts). Create/edit actions are audited through `AuditLog` (actor, timestamp, before/after); collection and use are governed by the **Health Information Act (HIA)** and notifiable-disease reporting under the **Public Health Act**.
- **Performance Expectations** — None beyond the application SLA for the create action; the lookups it consumes (Disease, Facility, Zone, Setting) must be cached and index-backed.

## Version History

- **Last Update**
  - **Mar. 4, 2026 (Alec Blair)** — Initial draft.
  - **March 5, 2026 (Alec Blair and Juliane Mueller)** — Aligned the specification to the *Outbreak Summary* wireframe; added linkages to other screens that will need to be built.
  - **May 26, 2026 (Alec Blair)** — Updated from the [May-26-2026 ND/CDC Working Group](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/_layouts/15/Doc.aspx?sourcedoc=%7B49042283-743a-4bca-ba5d-02b10ecbaa82%7D&action=edit&wd=target%28CDS-Program%20Working%20Group%20Sessions.one%7Cd7042e81-fd7b-48fe-a6ab-37de04e77e76%2FMay-26-2026%20ND%5C%2FCDC%20WG%7C84d1bba9-e2e8-40d2-9432-14c6f7ab0307%2F%29&wdorigin=703): added the Region field and flagged open questions for working-group review.
  - **June 25, 2026 (Alec Blair)** — Brought the specification up to the OMRA screen-specification standard used by [[Communicable Disease Maintenance Screen Specifications]] and [[Contact Identification Screen Specifications]]: added OKF frontmatter; rewrote the context and wireframe sections as prose with linked source material; expanded the seven Acceptance Criteria sections; and rebuilt the field table mapped to [[OMRA Database ERD]] v2.5, flagging four ERD gaps inline for resolution before build — no direct `Outbreak.infectiousDiseaseID` (Disease), no `Outbreak.outbreakSettingID` (Setting), no `Outbreak.zoneID`/region columns (Zone/Region), and no outbreak-level department linkage (Department).
- **Link to Jira Task** — _to be added_
- **Specifications Status** — Draft for working-group review
- **Linked SBARs** — _to be added_
- **Linked Enabling Stories** — _to be added_
