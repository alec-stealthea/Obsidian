---
type: Screen Specification
title: Communicable Disease Search Screen Specifications
description: Build specification for the OMRA Communicable Disease Search screen — a unified search-and-triage entry point that, in its first build, lets an investigator find, filter and open outbreak investigations, and is designed to extend to contact and CD-episode search.
tags:
  - screen-specification
  - omra
  - communicable-disease
  - outbreak-management
  - search
timestamp: 2026-06-25T00:00:00Z
---

## Design Specification Context

This screen is the **search-and-triage entry point** into the Outbreak Management Reporting Application (OMRA). Confirming whether a situation is a new outbreak — or part of one already under investigation — is the first decision an investigator makes, so the search screen sits at the **Confirm** stage of the Outbreak Value Stream (*Exposure Trace → Confirm → Open → Manage → Close*) and is the natural predecessor to [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]] and the (forthcoming) Outbreak Summary screen. From a result row the investigator can open an existing investigation, launch the creation of a new outbreak, or export the filtered set for offline review and reporting.

Although it is named the **Communicable Disease Search** screen so it can grow into a single search surface for the program, its **first build is outbreak search**, driven by the [[Outbreak Search - Outbreak Investigator User Story]] (O-C-3). Two further search needs are in scope for the *design* of this screen but staged behind outbreak search for build, and are carried as open questions in the Scenario Conditions below:

- **Contact Identification search** — the same screen should be able to accommodate Contact Identification searches over `ContactIdentification` (ERD Section 15), since Safe and Healthy Environments (SHE) investigators share the outbreak-investigator pattern. See [[Contact Identification Screen Specifications]].
- **Search from a Communicable Disease episode (Disease Abstract)** — a search invoked from a current CD episode in Connect Care, where the disease and the requesting department are passed in so filters can be pre-applied. Not in the imported draft specifications; carried here as a design consideration.

It depends on the Foundation maintenance screens that supply its lookups — [[User Maintenance Screen Specifications|User Maintenance]] (the RBAC/ABAC access model that scopes results), Location / Facility Maintenance, and [[Communicable Disease Maintenance Screen Specifications|Communicable Disease Maintenance]] (the disease/organism dictionary). Connect Care remains the **system of record for individual cases** (see [[CLAUDE-OMRA]] data-ownership boundaries); OMRA owns the outbreak coordination record, so the result grid is a window onto the `Outbreak` entity and its references in [[OMRA Database ERD]].

> **Note on resolution-status vocabulary.** The source listed resolution values as *Outbreak / Not an Outbreak / Tracking (monitoring) / Pending (no human has looked at it)*. These map to the ERD `Outbreak.outbreakProgress` enum **Tracking / Outbreak / Not an Outbreak** — "Pending" is the **same state as Tracking** (received and being monitored / not yet resolved), so no separate Pending value is required.

Source material for this specification:

- **Wireframe** — the search screen is not yet a discrete slide in the deck. The functional source is the *Outbreak Search* draft in [Outbreak Management Application Design (OneNote)](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/_layouts/15/Doc.aspx?sourcedoc=%7B49042283-743a-4bca-ba5d-02b10ecbaa82%7D&action=edit&wd=target%28Outbreak%20Management%20Application%20Design.one%7Cb18cef0a-7f53-4aaa-959d-faa331dcd0fd%2F%29). A wireframe slide in [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx) is to be added — **slide reference outstanding**.
- **Source user story** — [[Outbreak Search - Outbreak Investigator User Story]] (O-C-3).
- **Data model** — [[OMRA Database ERD]] (v2.5), principally the `Outbreak` entity (Section 1) and its `OutbreakType`, `OutbreakOrganism` / `Organism`, `Facility` / `FacilityType`, `Zone`, `Person` and `OutbreakProgress`/`OutbreakStatus` references, plus `DisclosureExportLog` (Section 12) for export auditing and `EpicAbstract` (Section 11) for the Epic round-trip.
- **Access model** — [[User Maintenance Screen Specifications]] (Role-Based / Attribute-Based Access Specification).
- **Related screens** — [[Create Outbreak Investigation Screen Specifications]] (the create target), the forthcoming Outbreak Summary screen (the click-through target), and [[Contact Identification Screen Specifications]] (future search scope).

## Wireframe

There is no finalised wireframe slide for this screen yet; the layout below is taken from the *Outbreak Search* functional draft and is to be replaced by a deck screenshot once one exists (**slide reference outstanding**).

The screen is a **search-and-results layout**. A persistent **free-text search** box runs an overall search across the outbreak context of a record. Below or beside it a **filter panel** exposes the structured filters (Organism, Region, Investigator, Date Started, Date Closed, Location, Facility Type, Status, plus Outbreak ID, PHAC #, Outbreak Type, Outbreak Setting and Resolution Progress carried from the user story). The **result grid** defaults to **active investigations sorted by creation date, newest first**, with an open/closed indicator so recently closed outbreaks are distinguishable. The screen carries a **Create Outbreak** action button (opens [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]]), an **Export** action, and each result row is a link to that outbreak's Outbreak Summary screen. When the screen is opened from an Epic deep link carrying an Encounter ID (or PHN / ULI), a **Select / send to Epic** affordance returns the chosen Outbreak ID to populate the patient's Communicable Disease Abstract.

The two navigation targets named in the source are:

- **Create Outbreak** button → [Create Outbreak Functional Specifications (OneNote)](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/_layouts/15/Doc.aspx?sourcedoc=%7B49042283-743a-4bca-ba5d-02b10ecbaa82%7D&action=edit&wd=target%28Outbreak%20Management%20Application%20Design.one%7Cb18cef0a-7f53-4aaa-959d-faa331dcd0fd%2FCreate%20Outbreak%20Functional%20Specifications%7C8d0409d9-79c6-4a87-8987-da7be47fd26f%2F%29) → built as [[Create Outbreak Investigation Screen Specifications]].
- **Open an outbreak row** → [Outbreak Summary Functional Specifications (OneNote)](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/_layouts/15/Doc.aspx?sourcedoc=%7B49042283-743a-4bca-ba5d-02b10ecbaa82%7D&action=edit&wd=target%28Outbreak%20Management%20Application%20Design.one%7Cb18cef0a-7f53-4aaa-959d-faa331dcd0fd%2FOutbreak%20Summary%20Functional%20Specifications%7Ca81daf0e-18d7-464e-98a8-0aae13edb8ef%2F%29) → Outbreak Summary screen spec **not yet created** (plain-text reference only; no WikiLink until it exists).

## Acceptance Criteria Specifications

1. **Scenario Conditions** — What scenarios have been defined that may affect the specifications.

   1. *User group affiliation.* Should the search default to the investigations for the group the logged-in user is assigned to — e.g., CDC sees CDC — while users assigned to multiple departments see more? This maps to the OMRA ABAC scoping attributes (`UserTeam`, `UserZone`, `UserDiseaseGroup` in [[OMRA Database ERD]] Section 14). **Open question:** confirm whether the default *filter* is the user's group affiliation, separate from the *privacy* scoping (HIV/STI disease-group boundaries) that is always enforced regardless of role.
   2. *Search from Epic.* Especially early in an investigation there is a need to look up an outbreak from a Communicable Disease Abstract in Epic and associate its Outbreak ID back to that abstract. The search may be opened by an Epic web link carrying an **Encounter ID** (or possibly PHN / ULI); the investigator selects an outbreak and the Outbreak ID is returned to populate the patient's CD Abstract. **Open question / ERD gap** — see Functional Behaviour 5 and the field table.
   3. *Include closed outbreaks.* The result set must include closed outbreaks, distinguishable from open ones, so an investigator can confirm a new report is not an update to a recently closed event (resolves the source "do we need a closed column?" question — yes).
   4. *Unified-search staging (design only).* The screen is named **Communicable Disease Search** so it can later serve **Contact Identification** searches (SHE investigators share the outbreak-investigator pattern; `ContactIdentification`, ERD Section 15) and **search-from-a-CD-episode** (disease + requesting department passed in to pre-apply filters). These are designed for but **not in the first (outbreak-search) build** — carried as open questions for a future unified-search decision.
   5. *Region definitions outstanding.* The Region filter levels are not yet decided — candidate levels are Corridor, Zone, Sub-Zone, Municipality, Neighbourhood. The authoritative source and final set remain an **outstanding design decision** (mirrors the same gap in [[Create Outbreak Investigation Screen Specifications]]).

2. **Functional Behaviour** — What (if any) business logic needs to be created for this.

   1. The search page **defaults to active investigations sorted by creation date**, newest outbreaks at the top (`Outbreak.outbreakCreateDate` / `createdDate` descending, `outbreakStatus` = Open).
   2. An **overall free-text search** searches the outbreak context within an outbreak record (at minimum `outbreakName`, `outbreakHypothesis` and `outbreakUpdateReason`); broadening this to a full keyword search across prior-outbreak narrative and structured fields is a *desirable* enhancement (user story Desirable AC2).
   3. The screen **filters** on: Organism (`Organism` via `OutbreakOrganism`), Region (Zone/region lookup), Investigator (`Person`, optionally filtered by department/team), Date Started (`outbreakStartDate`), Date Closed (`outbreakEndDate`), Location (`Facility`), Facility Type (`FacilityType`), and Status (`outbreakStatus` / `outbreakProgress`). The user story adds Outbreak ID, PHAC #, Outbreak Type, Outbreak Setting and Resolution Progress.
   4. A **Create Outbreak** button opens the [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]] flow directly from the search context, so the investigator can open a new outbreak once they confirm none exists.
   5. **Clicking an outbreak row** opens that outbreak's **Outbreak Summary** screen (spec to be created).
   6. **Epic round-trip.** When the screen is opened by an Epic web link carrying an Encounter ID (or PHN / ULI), the investigator can **select an outbreak and return its Outbreak ID to Epic** to populate the Communicable Disease Abstract for that patient. The returned association is the `EpicAbstract.outbreakID` link; the inbound Encounter ID / PHN / ULI parameter handling is **not yet modelled** (see field table — ERD gap).
   7. **Export.** A filtered result set can be exported to Excel / CSV. Because the export may disclose PHI, each export is recorded in `DisclosureExportLog` (who / when / scope / row count / disease group / format / purpose).

3. **User Experience Considerations** — What (if any) UX options might we have to consider as part of the build.

   1. Keep the screen visually consistent with the other OMRA investigation screens ([[Create Outbreak Investigation Screen Specifications]], [[Contact Identification Screen Specifications]]) — shared filter-panel and result-grid patterns.
   2. *Desirable:* partial / fuzzy match so a partial facility name, common abbreviation or mis-spelling still returns candidates (user story Desirable AC1).
   3. *Desirable:* saved / default filters per investigator, so triage starts from the user's working view (e.g., their zone + open status); a result-grid column chooser to show/hide and reorder columns including the closed indicator.
   4. *Desirable:* when search criteria closely match an existing open outbreak, surface the likely duplicate before the investigator launches Create Outbreak.
   5. Make the open/closed state obvious in the grid (indicator column and/or styling) rather than relying only on the Status filter.

4. **Data Inputs and Outputs** — What are the data elements involved for the build object. What test data is needed to support functional testing.

   1. *Inputs* — investigator-entered search text and filter selections; lookups from the organism dictionary, Facility / FacilityType, Zone/region, Person (investigators) and the outbreak type/setting/status reference data; optionally an inbound Epic Encounter ID / PHN / ULI when launched from a CD Abstract.
   2. *Outputs* — a filtered, sortable result grid over the `Outbreak` entity; navigation to Create Outbreak or to an outbreak's summary; an exported CSV / Excel file with a corresponding `DisclosureExportLog` row; and, in the Epic scenario, the selected Outbreak ID written back as an `EpicAbstract.outbreakID` association.
   3. *Test data* — (a) several **active outbreaks** with varied creation dates to verify default newest-first sort; (b) at least one **recently closed** outbreak to verify it is returned and flagged closed; (c) outbreaks spanning **different organisms, facility types, regions/zones and investigators** to exercise each filter; (d) a **multi-department user** vs. a **single-department (CDC-only) user** to test group-affiliation default scoping; (e) a launch **from an Epic link** carrying an Encounter ID to verify the select-and-return-to-Epic path; (f) a privacy-bounded (**HIV/STI**) outbreak to verify disease-group result scoping and export auditing.

5. **Business Rules and Validation** — What (if any) business logic governs this application function and what can be done to build in quality checks for data validation.

   1. The source states **no business rules** for search itself. The only governing logic is **result visibility** — results are scoped to the user's authorized team / zone / disease group per the OMRA access model, and disease-group privacy boundaries (e.g., HIV/STI) are always respected ([[User Maintenance Screen Specifications]]). Whether the *default* filter additionally narrows to the user's group affiliation is the open question in Scenario Conditions 1.
   2. Export of results writes a `DisclosureExportLog` entry; exports that include privacy-bounded rows set `privacyBoundaryCrossed = true` and require steward authorization (ERD Section 14).

6. **Exception Handling** — How will the application handle edge cases, missing data, time outs, etc.

   1. The source marks this **not applicable** for search. Reasonable defaults to confirm at build: a **no-results** state returns an empty grid with a clear message (and offers Create Outbreak); a **lookup/interface timeout** (e.g., organism or facility list) lets the user retry or search on cached values; an **Epic launch with an unrecognised / missing Encounter ID** still opens the search but disables the send-to-Epic action and surfaces a notice.

7. **Business Semantics** — What terminology resonates with the business for this application function.

   - "Outbreak Search" / "Communicable Disease Search"; "active investigations"; **Open / Closed** (and the open/closed indicator); **Tracking / Outbreak / Not an Outbreak** (resolution progress, where Tracking covers the monitoring / "pending" case); "Investigator"; "Region" (levels TBD); "Setting"; "Organism"; "PHAC #"; "Create Outbreak"; "Outbreak Summary"; "send to Epic" / "associate to the Communicable Disease Abstract."

| Screen Field | Data Type | Database Field | Data Standard | Default Value | Mandatory? | Comments |
|---|---|---|---|---|---|---|
| Free-text search | Free text | Searches `Outbreak.outbreakName`, `Outbreak.outbreakHypothesis`, `Outbreak.outbreakUpdateReason` | — | Empty | No | Overall search of the outbreak context within a record. *Desirable:* broaden to a full keyword search across prior-outbreak narrative and structured fields (user story Desirable AC2). |
| Organism (filter) | Lookup | `Organism.organismID` via `OutbreakOrganism` | Provincial organism reference list | None | No | Suspected / primary / secondary organism attach via the `OutbreakOrganism` junction; not a direct column on `Outbreak`. |
| Region (filter) | Lookup | — (derive via `Facility.zoneID` → `Zone.zoneID`) | Region level TBD — Corridor · Zone · Sub-Zone · Municipality · Neighbourhood | None | No | **ERD gap** — `Outbreak` has no direct `zoneID` / region column; for facility outbreaks region derives via `Facility.zoneID`, and region outbreaks have no anchor. Region-level set is an **outstanding design decision** (same gap as Create Outbreak). |
| Investigator (filter) | Lookup | `Outbreak.outbreakInvestigationLead` → `Person.personID` | Lookup on Person / AppUser | None | No | Source: "Lookup on Role table with possible filter based on department." Department/team filter maps to `Team` / `UserTeam` (ERD Section 14). Wider team via `OutbreakTeamMember`. |
| Date Started (filter) | Date / range | `Outbreak.outbreakStartDate` | Date | None | No | Date the outbreak was declared to have met case definition. |
| Date Closed (filter) | Date / range | `Outbreak.outbreakEndDate` | Date | None | No | **Confirm** — no distinct "closed date" column; `outbreakEndDate` (manual end date) is used. Closed *state* is `outbreakStatus` = Closed. |
| Location (filter) | Lookup | `Outbreak.outbreakFacility` → `Facility.facilityName` | Location / Facility list | None | No | Source: "Lookup on Location Table." Region (non-facility) outbreaks have no Location. |
| Facility Type (filter) | Lookup | `Facility.facilityTypeID` → `FacilityType.facilityTypeName` | Facility Type list | None | No | Filters outbreaks by their facility's type (Continuing Care, Acute Care, School, etc.); reached via `Outbreak.outbreakFacility`. |
| Status (filter) | Lookup | `Outbreak.outbreakStatus` | Open / Closed / Re-opened | Active (Open) | No | Default view = active. Note the overlap with `outbreakLifecycleStatus` (New, Assess, Active, Suspended, Closed, Reopened) — confirm which drives the filter UI. |
| Resolution Progress (filter) | Lookup | `Outbreak.outbreakProgress` | Tracking / Outbreak / Not an Outbreak | None | No | "Pending" is treated as Tracking (no separate value). From user story AC1. |
| Outbreak Type (filter) | Lookup | `Outbreak.outbreakType` → `OutbreakType.outbreakTypeID` | AORF-aligned type list (GI, Respiratory, Mixed, …) | None | No | From user story AC1. |
| Outbreak Setting (filter) | Lookup | `OutbreakSetting.outbreakSettingID` | Outbreak Setting list | None | No | **ERD gap** — no direct `Outbreak.outbreakSettingID`; setting currently lives on `Facility.primaryOutbreakSettingID` / `OutbreakDefinition`. Same gap flagged in Create Outbreak. |
| Outbreak ID (filter) | Alpha Numeric | `Outbreak.outbreakID` | Auto-generated identifier | None | No | Also the EI / lab-requisition identifier (deferred, ERD note 10). |
| PHAC # (filter) | Alpha Numeric | `Outbreak.outbreakPHACID` | PHAC identifier | None | No | From user story AC1; present when referred from federal level. |
| Result grid — default sort key | Date-Time | `Outbreak.outbreakCreateDate` (`createdDate`) | Date-Time | Descending (newest first) | n/a | Drives the default "active investigations, newest at top" ordering (FB 1). |
| Result grid — Open/Closed indicator | Boolean / Lookup | `Outbreak.outbreakStatus` | Open / Closed / Re-opened | — | n/a | Closed outbreaks are returned and visually distinguished (Scenario Conditions 3). |
| Result grid — row columns | n/a | `Outbreak.*` (ID, Name, Organism, Region, Investigator, Date Started, Date Closed, Location, Facility Type, Status) | — | — | n/a | Mirror the filter set; *desirable* column chooser to show/hide/reorder (UX 3). |
| Inbound Epic context (Encounter ID / PHN / ULI) | Alpha Numeric | — (relates to `EpicAbstract.epicEpisodeID` / `epicPatientID`) | Epic Encounter ID; PHN / ULI | None | Conditional | **ERD gap** — no store for inbound deep-link parameters; present only when launched from a CD Abstract. Drives the send-to-Epic action. |
| Selected Outbreak ID → Epic association | Alpha Numeric | `EpicAbstract.outbreakID` (write) | — | None | Conditional | On select-and-send, associates the chosen outbreak to the patient's CD Abstract. Confirm the outbound interface / payload. |
| Export action (audit) | Structured rules | `DisclosureExportLog` (Section 12) | — | System-generated on export | n/a | Not a visible field. On Export, writes who / when / `sourceScreen` / `exportScope` (filter + sort) / `rowCount` / `diseaseGroupID` / `exportFormat` / `purpose`; sets `privacyBoundaryCrossed` for HIV/STI rows. |

*Note — this is a read / search screen: it writes no `Outbreak` records, so there are no Created-by / Create-date or Version-Status rows. The only records it writes are the `DisclosureExportLog` entry on export and the `EpicAbstract.outbreakID` association on send-to-Epic.*

## Technical Implementation Notes

- **Access Specifications** — The source states **all roles have access** to search; what remains to confirm is whether searching is restricted at all, and whether results **default** to the user's group affiliation (CDC sees CDC; multi-department users see more). Regardless of the default, result *visibility* is scoped by the OMRA two-layer access model — functional role plus team / zone / disease-group attributes ([[User Maintenance Screen Specifications]]) — and **disease-group privacy boundaries (HIV/STI) are always enforced**.
- **Security Specifications** — Searching outbreak coordination metadata carries no special sensitivity per the source ("None for searching"). However, the result grid surfaces facility, region and organism context, and the **Export** action discloses PHI: each export is recorded in `DisclosureExportLog` (ERD Section 12), with `privacyBoundaryCrossed` flagging HIV/STI disclosures that require steward authorization. Collection, use and disclosure are governed by the **Health Information Act (HIA), RSA 2000, c H-5** and notifiable-disease reporting under the **Public Health Act**. `AuditLog` remains mutation-only; read/export events live in `DisclosureExportLog`.
- **Performance Expectations** — **Same as the overall application performance criteria** (no screen-specific SLA). The filter lookups (organism, facility, zone, person, type/setting) and the default result query must be index-backed and cached so the default active-outbreak view returns quickly.

## Version History

- **Last Update**
  - **March 5, 2026 (Alec Blair)** — Initial draft.
  - **June 25, 2026 (Alec Blair)** — Brought the stub up to the OMRA screen-specification standard used by [[Create Outbreak Investigation Screen Specifications]] and [[Communicable Disease Maintenance Screen Specifications]]: added OKF frontmatter; wrote the Design Specification Context and Wireframe sections; populated the seven Acceptance Criteria sections from the imported *Outbreak Search* functional draft and the [[Outbreak Search - Outbreak Investigator User Story]]; and built the field-mapping table against [[OMRA Database ERD]] v2.5. Framed the screen as a unified Communicable Disease Search with **outbreak search as the first build** and contact / CD-episode search staged behind it. Flagged ERD gaps for resolution before build — no `Outbreak` region/`zoneID` column, no direct `Outbreak.outbreakSettingID`, no distinct closed-date column, and no store for inbound Epic deep-link parameters (Encounter ID / PHN / ULI) — and carried open questions on group-affiliation default scoping and region-level definitions.
- **Link to Jira Task** — _to be added_
- **Specifications Status** — Draft for working-group review
- **Linked SBARs** — _to be added_
- **Linked Enabling Stories** — [[Outbreak Search - Outbreak Investigator User Story]]
