---
type: Screen Specification
title: Contact Identification Screen Specifications
description: Build specification for the OMRS Contact Identification Investigation List screen, where an investigator captures the exposed-contact list for an outbreak or source case, validates identity against the Client Registry, and promotes uniquely identified contacts into Connect Care episodes.
tags:
  - screen-specification
  - omrs
  - communicable-disease
  - contact-tracing
  - outbreak-management
timestamp: 2026-06-22T00:00:00Z
---

## Design Specification Context

This screen lets an investigator build and work the **exposed-contact list** for a communicable-disease investigation — capturing each contact's identity and exposure context, recording attempts to reach them, validating identity against the provincial Client Registry, and promoting uniquely identified contacts into a Communicable Disease Episode in Connect Care. It is the shared contact-identification surface across four investigation contexts (tuberculosis, sexually transmitted infections, and the CDC and SHE "uniquely identify individuals in outbreak" patterns), so it must serve both **source-case-driven** investigations (a known source person exposes others) and **region/outbreak-driven** investigations (no single source case).

It sits alongside [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]] in the Outbreak Management Reporting System (OMRS): an outbreak (or source case) is created there, and the contacts exposed within it are identified and tracked here. Where a contact is uniquely identified and becomes a case, the screen hands off to Connect Care, which remains the **system of record for individual cases** (see [[CLAUDE-OMRS]] data-ownership boundaries); OMRS retains the contact list, the investigation status, and the returned Episode ID.

Source material for this specification:

- **Wireframe** — *Create Contact Identification Investigation List* (draft), embedded below as `Contact Identification Screen Specifications Draft Wireframe.png`. This screen is **not yet a numbered slide** in [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx) — flagged to fold the draft wireframe into the deck.
- **Data model** — [[OMRS Database ERD]] (v2.4), principally the `ContactIdentification` entity (Section 15) and its `ContactGuardian`, `Ethnicity`, `DiseaseContactQuestion`, `ContactDiseaseQuestionResponse`, `ContactOutbreakLink` (contact↔outbreak/cluster lineage) and `ContactInvestigationLifecycle` (status history linked to the CD Abstract) companions, together with `Outbreak`, `EpicAbstract`, `ContactAttempt`, `ClientRegistryTransaction`, `Facility` / `Room`, `AuditLog` and `VersionStatus`. The contact-identification gap flagged in the first draft is **resolved in ERD v2.3–v2.4** — see §4.
- **Access model** — [[User Maintenance Screen Specifications]] (Role-Based Access Specification); contact identification is investigator activity within a disease group, gated by the HIV/STI privacy boundary.
- **Source user stories** — TB: [[TB Contact List - TB Nurse User Story]]; STI: [[STI Large Exposure User Story]]; and the CDC and SHE "uniquely identify individuals in outbreak" investigator stories (OneNote). A decision is still open on whether to combine the four into a single enabling story or rely on this specification — see §1.

## Wireframe

The draft wireframe is *Create Contact Identification Investigation List*:

![[Contact Identification Screen Specifications Draft Wireframe.png]]

The screen is titled **Create Contact Identification Investigation List** and has two zones:

- **List header (outbreak/source-case context)** — Created (date), Outbreak Name, Outbreak ID, Outbreak Setting, Location, Disease, and Source Case ID. These set the source the contacts are logged against; on a region outbreak there is no Source Case ID, on an source-case investigation there is.
- **Contact grid (one row per contact)** — Demographics (Name, Address, Phone, Gender), Exposure Location, Relationship to Contact, Disease Questions, Contact Attempt/Result, and PHN, with a **Query PHN** action (Client Registry validation) and a **Create Episode** action per row. The grid is designed for high-volume entry — TB contact lists routinely run 30–50 rows.

## Acceptance Criteria Specifications

1. **Scenario Conditions** — What scenarios have been defined that may affect the specifications.

   1. *Region outbreak — no source case.* Contact identifications captured against an existing Outbreak ID where there is no single source person, typical of a region or congregate-setting outbreak.
   2. *Source-case contact investigation.* A specific person is known to have exposed others; contacts are logged against that source case (its Abstract / Source Case ID), and positive identification may not yet be possible.
   3. *TB large contact list.* A confirmed active TB source case commonly yields 30–50 contacts (~80% of the time), spanning household, congregate-setting, and air-travel exposures — driving high-volume capture and a break-in-contact date. See [[TB Contact List - TB Nurse User Story]].
   4. *Minor contact requiring a guardian.* A contact is a minor; parent/guardian name, phone, address, and e-mail are captured for notification and follow-up.
   5. *New Albertan with no PHN.* A contact has no Provincial Health Number; the investigator captures PHN Platinum demographics, flags the record as not yet Registry-validated, and proceeds with trace-back. See [[STI Large Exposure User Story]].
   6. *Contact list seeded from automated intake.* For STI, a physician [[STI Notification Form.pdf|Notification of STI form]] processed by Blue Prism pre-populates contacts already linked to a Connect Care episode; the investigator continues identity confirmation rather than keying from scratch (see [[Community Physician STI Notification User Story]]).
   7. *Cross-disease reuse.* One screen serves TB, STI, CDC and SHE contact investigation; disease-specific questions and the privacy boundary (HIV/STI) vary by disease group while the core capture, status tracking, and episode promotion are shared.
   8. *Contact escalates to an outbreak or links to a cluster.* A contact (or its exposure) may itself become an outbreak, or be linked to another outbreak grouped under a **cluster** that connects multiple outbreaks. The original outbreak identifiers must be preserved across the contact and the related outbreaks, even after merges or cluster reorganization.

2. **Functional Behaviour** — What (if any) business logic needs to be created for this.

   1. **Query PHN** calls the provincial Client Registry to validate the entered PHN against the Platinum demographic fields, returns the match result, and sets the Registry-validated flag; the transaction is recorded in `ClientRegistryTransaction`.
   2. **Create Episode** promotes a uniquely identified contact into a Communicable Disease Episode in Connect Care, returns the **Episode ID**, records it against the contact, and advances Investigation Status to *CD Episode Created* — with no re-keying into a separate system.
   3. **Investigation Status** is a workflow lookup (No Attempts → Attempts in progress → Unable to contact → CD Episode Created / No Exposure Determined) that the investigator advances as the contact is worked; **Record Status** (Open / Closed / Closed – Duplicate) governs the record lifecycle.
   4. The screen maintains, per source case or outbreak, a running tally of **total exposures**, **contacts identified/reached**, and **number unable to contact**, to support PHAC and Ministry reporting (see §4 outputs).
   5. Confirm whether contacts seeded by the STI Blue Prism automation arrive through the same write path as manual entry so they can be edited, confirmed, promoted, or closed identically.
   6. **Outbreak lineage** — When a contact escalates into its own outbreak, the new outbreak records its origin (`Outbreak.originatingContactID`) and the contact records the escalation (`ContactIdentification.escalatedToOutbreakID`). A contact's associations to multiple outbreaks and to a cluster head are held in `ContactOutbreakLink`, which **preserves the original outbreak identifiers** (`preservedOutbreakIdentifier`) across merges and cluster reorganization; cluster grouping continues to use `Outbreak.clusterOutbreak`.
   7. **Investigation lifecycle to the CD Abstract** — Each status transition is recorded in `ContactInvestigationLifecycle`; on promotion (status *CD Episode Created*) the transition carries the **Communicable Disease Abstract** link (`EpicAbstract`), tying the contact's investigation lifecycle to the case record created in Connect Care.

3. **User Experience Considerations** — What (if any) UX options might we have to consider as part of the build.

   1. Provide a PHN entry that can be **typed and then validated** against the Client Registry, with Query PHN exposing the match result rather than silently overwriting investigator-entered values.
   2. Optimize the grid for **high-volume entry** (30–50 rows for TB) — inline add, keyboard-first row entry, and no per-row page reloads.
   3. Surface disease-specific **Disease Questions** dynamically based on the header Disease (e.g., HIV shared-needle Y/N) rather than a fixed column.
   4. Make **guardian** and **facility/room/flight** details progressively disclosed (shown when relevant) so the common row stays compact.
   5. Keep the screen visually consistent with [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]] and the rest of the OMRS investigation set.

4. **Data Inputs and Outputs** — What are the data elements involved for the build object. What test data is needed to support functional testing.

   1. *Inputs* — Investigator-entered contact demographics and exposure context; Client Registry validation responses; for STI, Blue Prism-seeded contacts linked to a Connect Care episode.
   2. *Outputs* — The contact list per outbreak/source case; the Connect Care Episode ID for promoted contacts; and reporting counts (total exposures, number identified/reached, number unable to contact) for PHAC and Ministry guidelines.
   3. **ERD support (resolved in v2.3)** — The first draft flagged that no contact-identification entity existed. This is now resolved in [[OMRS Database ERD]] v2.3 (Section 15): a standalone, promotable `ContactIdentification` entity keyed to `Outbreak.outbreakID` and/or the source `EpicAbstract`, holding the contact's identity, exposure context, Investigation Status, Record Status, Registry-validated flag, returned Episode ID, and the TB-specific facility/room, flight number and break-in-contact date; with `ContactGuardian` for minors, `Ethnicity` as a reference list, and `DiseaseContactQuestion` + `ContactDiseaseQuestionResponse` for disease-specific contact questions. `ContactAttempt` gains an optional `contactIdentificationID` so attempt history attaches to a contact. **v2.4** adds the contact's outbreak lineage and lifecycle: `ContactIdentification.escalatedToOutbreakID` and `Outbreak.originatingContactID` (a contact may become its own outbreak); `ContactOutbreakLink` (the many-to-many that preserves a contact's association to multiple outbreaks/clusters and the original outbreak identifiers); and `ContactInvestigationLifecycle` (status-transition history that carries the `EpicAbstract` / Communicable Disease Abstract link on promotion). The field table below maps to these tables; no remaining ERD gaps.
   4. *Test data* — (a) a **TB source case** with ~40 contacts mixing household, a shelter (facility + room), and an **air-travel** exposure (flight #), including one **minor with guardian** details and one contact with **no PHN**; (b) an **STI region exposure** seeded from a Blue Prism notification, already linked to a Connect Care episode; (c) a **duplicate contact** that should resolve to *Closed – Duplicate*; (d) a contact promoted via Create Episode that returns and stores an Episode ID.

5. **Business Rules and Validation** — What (if any) business logic governs this application function and what can be done to build in quality checks for data validation?

   1. A contact must be logged against a valid source — an **Outbreak ID** (region) or an **Source Case / Abstract ID** (source case); confirm whether both may be present simultaneously.
   2. **PHN** is validated as a well-formed provincial health number and, when present, may be confirmed against the Client Registry; a contact may be saved **without** a PHN (new Albertan) with the Registry-validated flag set false.
   3. **E-mail** must be a valid address (`@` and domain); **Phone** must be a 10-digit number.
   4. **Break-in-contact date** cannot be in the future and (for a source case) should not precede the source case's infectious-period start — confirm the rule with the TB program.
   5. Confirm the outbreak/source-case **close-out rule**: must every contact be resolved (*CD Episode Created*, *Unable to contact*, or *No Exposure Determined*) before the source can be closed?
   6. Duplicate contacts are flagged **Closed – Duplicate** rather than creating a parallel episode.
   7. **Preserve outbreak identifiers.** When a contact escalates into an outbreak, or outbreaks are grouped into a cluster, the original outbreak identifiers are retained (via `ContactOutbreakLink.preservedOutbreakIdentifier` and `Outbreak.clusterOutbreak`) rather than overwritten, so the lineage between contacts, outbreaks, and clusters is auditable.

6. **Exception Handling** — How will the application handle edge cases, missing data, time outs, etc.?

   1. **Client Registry timeout / no match on Query PHN** → allow the contact to be saved with the Registry-validated flag false and a "pending validation" indicator, rather than blocking entry.
   2. **Create Episode interface failure** → do not lose the contact; surface the error, leave Investigation Status unchanged, and allow retry without duplicating the episode.
   3. **Missing identity** (source case known, contact not yet identifiable) → permit partial identifiers and an *Attempts in progress* / *Unable to contact* status until confirmed or closed.
   4. **Duplicate detection** on save → flag for review (*Closed – Duplicate*) instead of creating a parallel record.
   5. **Large list performance** (30–50+ rows) → page or virtualize the grid so capture stays responsive.

7. **Business Semantics** — What terminology resonates with the business for this application function.

   - "Contact Identification" / "Contact List"; "Source Case" and its **Abstract ID**; "Exposure" and **total exposures**; "Break in Contact" (date exposure ended); "Unable to contact"; "CD Episode" (the Connect Care episode a confirmed contact is promoted into); "Platinum fields" (the provincial demographic identity set); "Registry validated" (confirmed against the Client Registry).

| Screen Field | Data Type | Database Field | Data Standard | Default Value | Mandatory? | Comments |
|---|---|---|---|---|---|---|
| **List header — outbreak / source-case context** | | | | | | |
| Created | Date | `AuditLog.actionDateTime` (on list create) | Date | Logged on create | Yes | List creation date; part of the audit record. |
| Outbreak Name | Alpha Numeric | `Outbreak.outbreakName` | — | None | No | Lookup/display from the parent outbreak. |
| Outbreak ID | Lookup | `Outbreak.outbreakID` | Auto-generated | From parent outbreak | Yes | The source the contacts are logged against; expected to also serve as the EI number (deferred, [[OMRS Database ERD]] note 10). |
| Outbreak Setting | Lookup | `OutbreakSetting.outbreakSettingName` via `Facility.primaryOutbreakSettingID` / `OutbreakDefinition.outbreakSettingID` | Outbreak Setting list | None | No | Display from the parent outbreak's setting. |
| Location | Lookup | `Facility.facilityName` via `Outbreak.outbreakFacility` | Location/Facility list | None | No | Physical location for facility-based outbreaks; absent for pure region outbreaks. |
| Disease | Lookup | `InfectiousDisease.infectiousDiseaseName` via `OutbreakOrganism` / `OutbreakDefinition` | Provincial notifiable-disease dictionary | None | Yes | Drives the disease-specific Disease Questions and the privacy boundary. |
| Source Case ID | Lookup | `ContactIdentification.indexCaseAbstractID` → `EpicAbstract.epicAbstractID` | — | None | No | The Abstract ID of the person who exposed the contacts (source-case scenario); blank for region outbreaks. Confirm the source-case link is the Abstract vs the Episode. |
| **Contact grid — one row per contact** | | | | | | |
| Contact ID # | Alpha Numeric | `ContactIdentification.contactIdentificationID` | Auto-generated | None – auto | Yes | Standalone contact record keyed to `Outbreak.outbreakID` and/or the source `EpicAbstract` (ERD v2.3, Section 15). |
| First Name | Alpha Numeric | `ContactIdentification.contactFirstName` | Platinum demographic set | None | No | Platinum field. |
| Middle Name | Alpha Numeric | `ContactIdentification.contactMiddleName` | — | None | No | Added in v2.3 (`LineListPerson` carried first/last only). |
| Last Name | Alpha Numeric | `ContactIdentification.contactLastName` | Platinum demographic set | None | No | Platinum field. |
| Address | Alpha Numeric | `ContactIdentification.contactAddress` | — | None | No | Platinum field. |
| Municipality | Lookup | `ContactIdentification.municipality` | Provincial municipality list | None | No | Separated from free-text address in v2.3. Confirm the code set. |
| Date of Birth | Date | `ContactIdentification.contactDOB` | Date | None | No | Platinum field. |
| Legal Sex | Lookup | `ContactIdentification.legalSex` | Provincial legal-sex values | None | No | Distinct from Gender (v2.3 splits the single attribute into two). |
| Gender | Lookup | `ContactIdentification.gender` | Gender values | None | No | Distinct from Legal Sex. |
| Phone Number | Alpha Numeric | `ContactIdentification.contactPhone` | 10-digit phone | None | No | |
| E-mail | Alpha Numeric | `ContactIdentification.contactEmail` | `@` + domain | None | No | The contact's own e-mail (distinct from attempt-scoped `ContactAttempt.contactPersonEmail`). |
| Social Media | Alpha Numeric | `ContactIdentification.socialMedia` | — | None | No | Optional trace-back handle; confirm MVP scope. |
| Ethnicity | Lookup | `ContactIdentification.ethnicityID` → `Ethnicity` | Provincial ethnicity list | None | No | New `Ethnicity` reference list (v2.3); confirm code set and whether collected at contact stage. |
| PHN | Numeric | `ContactIdentification.contactPHN` | Provincial Health Number | None | No | May be absent (new Albertan); validated via Query PHN. |
| Registry Validated? | Boolean | `ContactIdentification.registryValidated` (set from `ClientRegistryTransaction.matchConfidence`) | Exact / Probable / Multiple / NoMatch | False | No | Defaults false until Query PHN confirms against the Platinum fields. |
| Exposure Location | Alpha Numeric | `ContactIdentification.exposureLocation` | — | Unknown | No | Free-text/lookup exposure point; facility-based exposures also relate to `exposureFacilityID`/`exposureRoomID`. |
| Contact Relationship | Lookup | `ContactIdentification.relationshipToContact` | Relationship list | None | No | "Relationship to Contact" on the wireframe. |
| Disease Questions | Lookup / Structured | `DiseaseContactQuestion` + `ContactDiseaseQuestionResponse` | — | None | No | Disease-specific contact questions (e.g., HIV shared needle Y/N) keyed by Disease (v2.3). |
| Contact Attempt / Result | Structured | `ContactAttempt` (`attemptDateTime`, `attemptMethod`, `attemptOutcome`) via `ContactAttempt.contactIdentificationID` | Reached / No Answer / Refused, etc. | None | No | Attempt history per contact; `ContactAttempt` gains an optional `contactIdentificationID` in v2.3. |
| Investigation Status | Lookup | `ContactIdentification.investigationStatus` | No Attempts / Attempts in progress / Unable to contact / CD Episode Created / No Exposure Determined | No Attempts | Yes | Workflow status enum. |
| Record Status | Lookup | `ContactIdentification.recordStatus` (+ `duplicateOfContactID`) | Open / Closed / Closed – Duplicate | Open | Yes | Record lifecycle; `duplicateOfContactID` self-references the surviving contact on Closed – Duplicate. |
| Episode ID | Numeric | `ContactIdentification.epicEpisodeID` (+ `promotedAbstractID` → `EpicAbstract`) | — | None | No | Returned from the Connect Care interface on Create Episode and stored against the contact; the promotion transition is logged in `ContactInvestigationLifecycle` with the **CD Abstract** (`EpicAbstract`) link. |
| Escalated-to Outbreak | Lookup | `ContactIdentification.escalatedToOutbreakID` → `Outbreak.outbreakID` | — | None | No | Set when the contact/exposure becomes its own outbreak; `Outbreak.originatingContactID` records the reverse. |
| Linked Outbreaks / Cluster | Lookup (multi) | `ContactOutbreakLink` (`outbreakID`, `linkType`, `clusterOutbreakID`, `preservedOutbreakIdentifier`) | — | None | No | Preserves the contact's association to multiple outbreaks and the cluster head, retaining original identifiers across merges. Likely a related-records panel rather than a single field. |
| **Contact grid — TB-specific (progressive disclosure)** | | | | | | |
| Parent / Guardian Name | Alpha Numeric | `ContactGuardian.guardianName` | — | None | No | For minor contacts; `ContactGuardian` is a child of `ContactIdentification` (v2.3). |
| Guardian Phone / Address / E-mail | Alpha Numeric | `ContactGuardian.guardianPhone` / `guardianAddress` / `guardianEmail` | 10-digit phone; `@` + domain | None | No | As above; `guardianRelationship` records Parent/Guardian. |
| Facility Name | Lookup | `ContactIdentification.exposureFacilityID` → `Facility.facilityName` | Location/Facility list | None | No | Where the exposure occurred (congregate setting). |
| Room / Department | Lookup | `ContactIdentification.exposureRoomID` → `Room.roomName` / `Department.departmentName` | — | None | No | Filtered by the selected Facility. |
| Flight # | Alpha Numeric | `ContactIdentification.flightNumber` | — | None | No | Air-travel exposure; PHAC air-travel contact investigation. |
| Break in Contact Date | Date | `ContactIdentification.breakInContactDate` | Date | None | No | Date exposure ended; anchors the follow-up/screening window. |
| **Non-visible audit / version rows** | | | | | | |
| Created by / Create Date (audit) | Lookup / Date-Time | `AuditLog.actionBy` / `actionDateTime` | — | Logged on save | Yes | Not visible on screen; part of the contact audit record. |
| Version Status / Version Date | Lookup / Date | `ContactIdentification.versionStatus` / `versionDate` → `VersionStatus` (Active, Retired, Merged, Draft) | — | Active on save | Yes | Not visible on screen; supports versioning and the Closed – Duplicate / merge path. |

## Technical Implementation Notes

- **Access Specifications** — Contact identification is **investigator activity**, not dictionary stewardship, so it is performed by the Investigator role (and above) scoped to the relevant **disease group** and team per [[User Maintenance Screen Specifications]]. The **HIV/STI disease group is a privacy boundary** (`DiseaseGroup.isPrivacyBoundary`), so STI/HIV contact lists are visible only to authorized users with that group, with steward authorization and audit on crossing it. Confirm whether Create Episode (promotion into Connect Care) is restricted to a subset of investigators.
- **Security Specifications** — Unlike the reference-data maintenance screens, this screen holds **personal health information** — name, date of birth, PHN/ULI and contact details, i.e. HIA "platinum" identifiers — for people who may not yet be cases. Demographic identifiers must be exposed only to need-to-know roles; all create/edit/promote/close actions are audited through `AuditLog` (actor, timestamp, before/after); Client Registry lookups are tracked in `ClientRegistryTransaction`. Collection, use and disclosure are governed by the **Health Information Act (HIA)** and notifiable-disease reporting under the **Public Health Act**.
- **Performance Expectations** — The grid must stay responsive at TB-scale contact lists (30–50+ rows, occasionally more); page or virtualize the list and keep Query PHN and Create Episode within interactive response targets. No response-time expectation beyond the application SLA for individual actions.

## Version History

- **Last Update**
  - **June 22, 2026 (Alec Blair)** — Reworked the initial draft to the OMRS screen-specification format. Added OKF frontmatter; rewrote the context as prose with linked source material; described the *Create Contact Identification Investigation List* wireframe (header context + contact grid); populated all seven Acceptance Criteria sections drawing scenarios from the [[TB Contact List - TB Nurse User Story]] and [[STI Large Exposure User Story]]; rebuilt the field table with best-fit ERD mapping, splitting list-header from per-contact fields and adding audit/version rows. **Flagged the headline ERD gap: no `ContactIdentification` entity exists in [[OMRS Database ERD]] v2.2** — recommended a new `ContactIdentification` table (with `ContactGuardian` and `DiseaseContactQuestion`) to hold the contact record, Investigation/Record status, Registry-validated flag, returned Episode ID, guardian, facility/room/flight context, and break-in-contact date, plus minor field gaps (middle name, municipality, legal-sex/gender split, e-mail, social media, ethnicity).
  - **June 22, 2026 (Alec Blair)** — Updated the field mapping to the resolved [[OMRS Database ERD]] v2.3 (Section 15): the new `ContactIdentification` entity and its `ContactGuardian`, `Ethnicity`, `DiseaseContactQuestion` and `ContactDiseaseQuestionResponse` companions, plus an optional `ContactAttempt.contactIdentificationID`. All previously flagged gaps are now mapped; no remaining ERD gaps.
  - **June 22, 2026 (Alec Blair)** — Added contact–outbreak lineage and lifecycle ([[OMRS Database ERD]] v2.4): `ContactIdentification.escalatedToOutbreakID` and `Outbreak.originatingContactID` (a contact may become its own outbreak); `ContactOutbreakLink` to preserve the contact's association to multiple outbreaks and clusters and the original outbreak identifiers; and `ContactInvestigationLifecycle` to record status transitions and carry the Communicable Disease Abstract (`EpicAbstract`) link on promotion. Added Scenario Condition 8, Functional Behaviour 6–7, Business Rule 7, and three field rows.
- **Link to Jira Task** — _to be added_
- **Specifications Status** — Draft for working-group review (TB Working Group, June 2026)
- **Linked SBARs** — [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association]] (decision request: create a CD Episode per identified contact for rule-out traceability; episode-to-outbreak/cluster association rule)
- **Linked Enabling Stories** — Open decision: combine the TB / STI / CDC / SHE contact-investigation stories into one enabling story, or rely on this specification (see §1). [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]].
