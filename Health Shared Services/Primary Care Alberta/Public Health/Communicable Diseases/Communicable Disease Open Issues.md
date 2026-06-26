---
type: Issue Register
title: Communicable Disease Open Issues
description: Cross-folder register of open design decisions, data-model gaps, and pending story/note dependencies across the Communicable Disease body of work.
tags:
  - issue-register
  - communicable-disease
  - open-issues
  - omra
  - outbreak-management
timestamp: 2026-06-26T00:00:00Z
---
# Communicable Disease Open Issues

> **Purpose**: A single place to track the *genuinely open* issues across the Communicable Disease (CD) sub-folders — design decisions still to be made, data-model gaps awaiting a revision, and stories or notes that need to be created and then linked. Context files (`CLAUDE-*.md`) capture *settled* context; open items live here so they are not silently re-decided inside individual stories or specs.
>
> **Scope**: spans `Communicable Diseases/` and its sub-folders — the CDC working group ([[CLAUDE-CDC]]), the Outbreak Management Reporting Application ([[CLAUDE-OMRA]]), and the Connect Care CD Episode work. Governed by [[CLAUDE-Communicable-Diseases]].
>
> **Conventions**: each issue has a short ID (`CD-OI-n`), an area, a status (Open / In progress / Blocked / Resolved), and where it surfaced. When an issue is resolved, record the outcome and date, then move it to *Resolved* (or fold the decision into the relevant context file and delete the row). Settled decisions do **not** belong here.

---

## Design decisions & data-model gaps

| ID | Area | Issue | Status | Surfaced in |
|---|---|---|---|---|
| CD-OI-1 | OMRA / CDC | **`Outbreak` ERD gaps.** `Outbreak` has no direct `infectiousDiseaseID` (Disease), `outbreakSettingID` (Setting), `zoneID`/region columns, or outbreak-level department linkage — Disease/Setting/Region/Department attach only indirectly. To be resolved in a future Create Outbreak / ERD revision before build. Affects search/filter (O-C-3) and create (O-A-4). | Open | [[Create Outbreak Investigation Screen Specifications]]; [[OMRA Database ERD]] |
| CD-OI-2 | OMRA / CDC | **Region definitions.** The authoritative source and final set of region levels — candidate levels Zone, Sub-Zone, Corridor, Municipality, Neighbourhood — is an outstanding design decision. Carried as placeholders in the search and create work. | Open | [[Outbreak Search - Outbreak Investigator User Story]]; [[Create Outbreak Investigation Screen Specifications]] |
| CD-OI-3 | OMRA | **Outbreak ID as the EI number.** Whether/when the system-generated `Outbreak.outbreakID` becomes the **Exposure Incident (EI) / lab-requisition** identifier (so requisitions can be raised before patients are known). Deferred decision (ERD note 10). **Direction (2026-06-26):** the lab has agreed to accept the Outbreak ID from the Outbreak Application as the lab-sample identifier for **human, food, animal, and environmental (e.g., sewer)** samples, carried back on results so they can be associated to an outbreak — captured in [[Create Exposure Incident ID - CDC Investigator User Story]] (ID TBD; numbering deferred). Remains **Open** pending the review of whether the Epic / Connect Care migration will simplify Outbreak Identifier creation versus current EI/OI-board practice. | Open | [[OMRA Database ERD]]; [[Create Outbreak Investigation Screen Specifications]]; [[Create Exposure Incident ID - CDC Investigator User Story]] |
| CD-OI-4 | OMRA / CDC | **Lifecycle vs. status vocabulary.** Which field drives the Create Outbreak UI — `outbreakLifecycleStatus` (New, Assess, Active, Suspended, Closed, Reopened) vs. the narrower `outbreakStatus` (Open/Closed/Re-opened) and `outbreakProgress` (Tracking/Outbreak/Not an Outbreak). Overlap needs reconciling. | Open | [[Create Outbreak Investigation Screen Specifications]]; [[Create Outbreak Investigation - CDC Investigator User Story]] |
| CD-OI-5 | OMRA | **Outbreak-creation role restriction.** Confirm whether creating an outbreak investigation is restricted to specific functional roles (e.g., Investigator and above), scoped by team/zone/disease group, or open to all intake users. | Open | [[Create Outbreak Investigation Screen Specifications]]; [[User Maintenance Screen Specifications]] |
| CD-OI-6 | OMRA | **Search surface staging.** Contact Identification search (over `ContactIdentification`) and CD-episode search are in scope for the *design* of the Communicable Disease Search screen but staged behind outbreak search for build; the consolidation approach is an open question. | Open | [[Communicable Disease Search Screen Specifications]] |
| CD-OI-7 | OMRA / Connect Care CD Episode | **Episode-per-contact & episode↔cluster association.** Decision request on creating a CD episode per contact and how episodes associate to outbreaks/clusters. | Open | [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association]] |
| CD-OI-8 | CDC / Connect Care CD Episode | **CD episodes must meet outbreak case definitions.** Ensuring linked CD episodes in Connect Care (Epic) satisfy the outbreak case definitions (`OutbreakDefinition` / `DiseaseCaseDefinitionRule`), and confirming which organism/definition candidates remain valid after a change. Revisit when CD Episode user stories are explored. | Open | [[Create Outbreak Investigation - CDC Investigator User Story]] (AC5) |
| CD-OI-14 | CDC / OMRA / Call Centre | **Referral mechanism from Genesys / Epic Cheers.** How a PPHST call encounter and any attached line list transition from the call-centre tooling (Genesys telephony + Epic Cheers CRM) into OMRA and on to the **SHE (Safe and Healthy Environments)** or **CDC** investigator teams — manual hand-off, interface, or shared record — and where the structured referral, teaching status, and disposition are persisted. Determines whether the PPHST encounter's acceptance criteria (call log, document investigation, assessment/teaching, refer-vs-close, share, attach line list, advise response time) are built in the CRM, in OMRA, or split. May require a PPHST encounter / referral entity in the ERD. | Open | [[Document Facility Outbreak Phone Encounter - PPHST Call Analyst User Story]] (AC1, AC5, AC6); [[OMRA Database ERD]] |
| CD-OI-15 | OMRA / CDC | **Task / template data model (ERD extension).** OMRA has no `TaskTemplate`, `TaskList`, or `Task` tables. Maintaining outbreak task lists from pre-established templates (keyed to `OutbreakType` and/or `OutbreakOrganism`), instantiated per `Outbreak`, with add/remove/modify and soft-delete on individual tasks, requires new entities before build. Seed templates from the published CDC *Outbreak Management Team Checklists*. | Open | [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]] (O-M-6, AC2/AC4); [[OMRA Database ERD]] |
| CD-OI-16 | OMRA | **`ActivityType` reference data — Letter / Other.** Confirm the `ActivityType` reference list (Section 3) includes **Letter** and **Other** alongside the existing Phone Call / Email entries, so communication-activity notes can be typed correctly. Minor reference-data seed. | Open | [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]] (O-M-6, AC7); [[OMRA Database ERD]] |
| CD-OI-17 | OMRA / CDC | **Lifecycle-status change history for metrics.** Manager transition-timeliness metrics (e.g., New "pending" → Assess/Active "under investigation" elapsed time) need a reliable history of `OutbreakLifecycleStatus` changes. Decide whether to derive this from the generic `AuditLog` (Section 12) at query time or introduce a purpose-built `OutbreakStatusHistory` table for performant reporting. | Open | [[Manager Outbreak Metrics and Reporting - Team Lead Department Manager User Story]] (O-M-7, AC2); [[OMRA Database ERD]] |
| CD-OI-18 | OMRA / CDC | **CDOM-to-OMRA status mapping.** Confirm how CDOM lifecycle language ("pending", "under investigation") maps to the OMRA `OutbreakLifecycleStatus` enum (New / Assess / Active / Suspended / Closed / Reopened) so transition metrics measure the intended states. Related to the broader status-vocabulary reconciliation in CD-OI-4. | Open | [[Manager Outbreak Metrics and Reporting - Team Lead Department Manager User Story]] (O-M-7, AC2) |

## Pending story / note dependencies (create, then link)

These notes do not exist yet; they are referenced in plain text elsewhere to respect link hygiene. Create them, then add the WikiLinks where flagged.

| ID | Area | Note to create | Needed by |
|---|---|---|---|
| CD-OI-9 | CDC | **Outbreak Assessment — CDC Investigator User Story (O-A-2).** Acceptance criteria relate to the create story. | [[Create Outbreak Investigation - CDC Investigator User Story]] |
| CD-OI-10 | CDC | **Outbreak Summary User Story.** Owns the re-open-a-closed-outbreak action (out of scope for the search story). | [[Outbreak Search - Outbreak Investigator User Story]] |
| CD-OI-11 | CDC | **Submit Facility Outbreak Line List — CDC Facility Operator User Story (O-ET-1).** Feeds the identifiable-patient case count. | [[Create Outbreak Investigation - CDC Investigator User Story]] (AC3) |
| CD-OI-12 | CDC | **Submit Facility Outbreak Aggregate Report — CDC Facility Operator User Story (O-M-1).** Feeds the aggregate case count. | [[Create Outbreak Investigation - CDC Investigator User Story]] (AC3) |
| CD-OI-13 | CDC / Connect Care CD Episode | **CD Episode user stories.** Resolve CD-OI-8 (case-definition conformance) and the organism/definition candidate review. | [[Create Outbreak Investigation - CDC Investigator User Story]] (AC5) |

---

_Last Updated_: 2026-06-26 (added CD-OI-15..18 — task/template data model, ActivityType Letter/Other, lifecycle-status history for metrics, and CDOM-to-OMRA status mapping, from the O-M-6 and O-M-7 manager stories)
_Maintained By_: Alec Blair
