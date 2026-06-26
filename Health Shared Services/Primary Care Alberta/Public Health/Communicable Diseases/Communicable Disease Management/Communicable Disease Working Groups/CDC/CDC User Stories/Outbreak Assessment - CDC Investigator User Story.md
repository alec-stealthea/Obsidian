---
type: User Story
title: Outbreak Assessment - CDC Investigator User Story
description: Outbreak Investigator capability to assess a reported (suspected) facility outbreak so the investigator can determine whether it meets the outbreak definition and warrants further investigation.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omrs
  - outbreak-assessment
timestamp: 2026-06-26T00:00:00Z
---

## Background

Once a suspected outbreak has been opened — created as an investigation record via the [[Create Outbreak Investigation - CDC Investigator User Story|create-outbreak]] capability (O-A-4) — the Outbreak Investigator's next job is to **assess** it: to gather and document enough about the reported event to decide whether it actually meets the **outbreak definition** for the disease in question and therefore deserves continued investigation, or whether it can be dispositioned as *not an outbreak* / no further action. This story sits at the **Assess (A)** stage of the Outbreak Value Stream, immediately after the confirm/search ([[Outbreak Search - Outbreak Investigator User Story|O-C-3]]) and create-outbreak (O-A-4) work and before the manage-and-close work.

The assessment is where the investigator characterises the event — healthcare vs. non-healthcare setting, facility vs. non-facility, the disease-specific criteria that apply, and the likely exposure source — and where the first evidence (an initial line list, lab results, or external jurisdiction identifiers) is brought onto the record so a defensible "outbreak / not an outbreak / keep tracking" decision can be made. The `Outbreak` row created at open is the parent that this assessment enriches; Connect Care remains the **system of record for individual cases** (see [[CLAUDE-OMRS]] data-ownership boundaries), while OMRS owns the outbreak coordination record and the assessment metadata.

The build realisation of this story is expected to share the [[Create Outbreak Investigation Screen Specifications]] surface and the [[OMRS Database ERD]] `Outbreak` entity and its references; the acceptance criteria below carry the data dependencies (and the known ERD gaps) rather than restating field detail.

> **Note on the disposition vocabulary.** "Meets the outbreak definition" maps to the ERD `Outbreak.outbreakProgress` enum **Tracking / Outbreak / Not an Outbreak**, paired with the `Outbreak.outbreakStatus` (Open / Closed) and the broader `Outbreak.outbreakLifecycleStatus`. Setting the assessment to **Under Investigation** (AC2) is the process state the investigator works the assessment in; the *Outbreak / Not an Outbreak / Tracking* value is the **outcome** of the assessment. Which field drives the UI is the same open question flagged in [[Create Outbreak Investigation Screen Specifications]].

> **Note on the Story ID.** This story is carried as **O-A-6** per the working draft. The [[Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak story (O-A-4)]] currently references the assessment story as *O-A-2*; that cross-reference should be updated to point to **O-A-6** (this note) — flagged in Dependencies rather than silently back-edited.

## User Story

- **As a** CDC Outbreak Investigator (Communicable Disease Control)
- **I need** a tool to investigate a reported (suspected) facility outbreak
- **so that** I can determine whether the reported outbreak meets the outbreak definition and deserves further investigation.

## Scenarios

- **Scenario A — Meets the definition, continue (happy path).** A continuing-care home reports gastrointestinal illness. The investigator documents the outbreak metadata (healthcare setting, facility outbreak, disease-specific criteria, suspected exposure source), sets the assessment to **Under Investigation**, receives the initial line list, confirms the case counts meet the disease's outbreak definition, and sets the disposition to **Outbreak** so investigation continues.
- **Scenario B — Does not meet the definition, document and close.** A referral comes in that, on assessment, does not meet the outbreak definition (e.g., sporadic cases below threshold). The investigator records **why** the referral does not require further investigation and dispositions it as **Not an Outbreak**.
- **Scenario C — Inconclusive, keep tracking.** The event cannot yet be confirmed or ruled out (e.g., a TB or STI large-exposure situation, or awaiting lab confirmation). The investigator leaves it in a **Tracking** disposition and continues to monitor without declaring or dismissing.
- **Scenario D — Linked / higher-level outbreak.** Assessment reveals the report is one site of a larger event. The investigator creates or links to a **higher-level (parent / cluster) outbreak** so this facility outbreak and others being managed separately can be coordinated together, and records any non-Alberta identifier (PHAC # or international Outbreak ID).
- **Scenario E — Genomic signal as candidate outbreak.** A Whole Genome Sequencing (WGS) report from the provincial or national lab indicates a genomically linked cluster. The investigator brings the WGS report onto the record as a candidate outbreak / line-list input to inform the assessment. *(Scope boundary flagged — see AC6 and Dependencies.)*

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Document the outbreak assessment metadata.** *Given* the assessment screen, *when* the investigator characterises the reported event, *then* the system captures, at minimum: **Healthcare vs. Non-Healthcare** setting; the applicable **disease-specific criteria** (the case/outbreak definition rules for the organism — `OutbreakDefinition` / `DiseaseCaseDefinitionRule`); **Facility Outbreak vs. Non-Facility Outbreak**; and **Exposure Source** (e.g., water, food, person-to-person, environmental). *(Reviewer change incorporated: the exposure attribute is the general* **Source** *— water, food, etc. — not "Food" specifically.)* [Public Health Act & Communicable Diseases Regulation — outbreak definition and reporting; [[Create Outbreak Investigation Screen Specifications]]]
2. **Set the investigation status to Under Investigation.** *Given* a suspected outbreak record, *when* the investigator begins the assessment, *then* the investigation can be set to **Under Investigation** (`Outbreak.outbreakStatus` / process status), distinguishing it from entered-but-not-yet-worked and from dispositioned records. [[Create Outbreak Investigation Screen Specifications]]
3. **Receive an initial line list for assessment.** *Given* the assessment, *when* a facility line list is provided, *then* the investigator can **receive** that line list onto the outbreak record for initial assessment, so case counts can be evaluated against the outbreak definition. *(Reviewer/NDOB note incorporated: from the investigator's perspective this is* **receive** *a line list — the* submit *action belongs to the CDC Facility Operator in the Submit Facility Outbreak Line List story, O-ET-1, not yet captured in the vault — referenced in plain text, to be WikiLinked once it exists.)* [[Create Outbreak Investigation Screen Specifications]]
4. **Add PHAC or international Outbreak IDs to the record.** *Given* the assessment record, *when* the event is referred from or linked to another jurisdiction, *then* the investigator can record an external identifier — PHAC # (`Outbreak.outbreakPHACID`) and/or an international Outbreak ID (`ExternalReportSubmission.reportingAgencyID`). [[OMRS Database ERD]] Section 1, Section 9
5. **Create / link a higher-level (parent) outbreak.** *Given* the assessment, *when* the reported facility outbreak is part of a larger event, *then* the investigator can create a **higher-level outbreak** and link it to this facility outbreak and to other facility or non-facility outbreaks that are being managed separately (`Outbreak.clusterOutbreak`), so related outbreaks can be coordinated under one parent. [[OMRS Database ERD]] Section 1
6. **Bring Whole Genome Sequencing (WGS) results onto the record as a candidate outbreak.** *Given* a WGS report from the provincial lab or National Microbiology Laboratory, *when* it identifies a genomically linked cluster, *then* the investigator can use the WGS report as a **candidate-outbreak / line-list input** to inform the assessment. **Scope flag:** the reviewer noted this may instead belong to the *Create/Update Non-Facility Line List — Investigator* story; the scope boundary is to be confirmed and is tracked in Dependencies. [[Create Outbreak Investigation Screen Specifications]]
7. **Document why a referral does not require further investigation.** *Given* a referral that, on assessment, does not meet the outbreak definition, *when* the investigator dispositions it, *then* the investigator can record a structured **reason / rationale** for why no further investigation is required, and set the disposition to **Not an Outbreak** (`Outbreak.outbreakProgress`), so the decision is auditable. *(Raised by Jessica.)* [[Create Outbreak Investigation Screen Specifications]]
8. **Privacy-conforming assessment and audit.** *Given* the assessment create/edit actions, *when* they are performed, *then* they are scoped to the investigator's authorized team / zone / disease group per the OMRS access model and audited via `AuditLog` (actor, timestamp, before/after). The assessment record is coordination metadata but is the parent of records holding personal health information. [[User Maintenance Screen Specifications]]; [Health Information Act (HIA), RSA 2000, c H-5 — collection, use and disclosure, [verify section]]

### Desirable (Nice to Have)

1. **Definition-threshold prompt.** When the received line-list case counts cross (or fall short of) the disease-specific outbreak-definition threshold, the screen surfaces a prompt to help the investigator confirm the *Outbreak / Not an Outbreak* disposition rather than requiring manual lookup.
2. **Structured non-outbreak reason codes.** The "why no further investigation" rationale (AC7) offers a pick-list of common reason codes (e.g., below threshold, sporadic/unlinked, duplicate of existing outbreak, not a notifiable event) with a free-text note, to support consistent reporting.
3. **Disposition history / timeline.** The record retains a timeline of disposition changes (Tracking → Outbreak, Outbreak → Not an Outbreak, etc.) with actor and timestamp, so the assessment trail is visible without reading the audit log.
4. **Pre-populate disease-specific criteria.** Selecting the organism pre-populates the applicable disease-specific outbreak-definition criteria so the investigator assesses against the right rule set by default.
5. **Carry the assessment into reporting.** A completed assessment can flow its disposition and key metadata into the Initial AORF / stakeholder reporting without re-keying.

## Dependencies

- **Story ID cross-reference (O-A-4 ↔ O-A-6).** The [[Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak story (O-A-4)]] references the assessment story as *O-A-2*; update that reference to **O-A-6** (this note) once confirmed.
- **CDC Facility Operator submission story (O-ET-1).** AC3 (receive a line list) depends on the *Submit Facility Outbreak Line List — CDC Facility Operator* story for the submit side of the exchange. Link here once that note exists.
- **Create/Update Non-Facility Line List — Investigator story (scope boundary for AC6).** Confirm whether bringing WGS results on as a candidate outbreak belongs here or in the non-facility line-list story; move or link accordingly once decided.
- **`Outbreak` ERD gaps (later analysis round).** Disease/criteria, Setting and Zone/Region do not yet have direct columns on `Outbreak` (no `infectiousDiseaseID`, `outbreakSettingID`, `zoneID`/region) — flagged in [[Create Outbreak Investigation Screen Specifications]] and [[OMRS Database ERD]]. The healthcare/non-healthcare, facility/non-facility and exposure-source attributes in AC1 should be confirmed against the resolved data model.
- **CD Episode user stories (to be created).** Assessing whether linked CD episodes in Connect Care meet the outbreak case definitions must be revisited when CD Episode stories are explored. Link here once those stories exist.

## User Story Metadata

|                              |                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                                    |
| Value Stream Stage Workflow  | Assess (A)                                                                                                                                      |
| User Story ID                | O-A-6                                                                                                                                           |
| Role                         | CDC Outbreak Investigator (Communicable Disease Control / CDC)                                                                                  |
| Status                       | Analysis                                                                                                                                        |
| Build Team(s)                | Outbreak Application Team                                                                                                                        |
| Related Design Spec          | [[Create Outbreak Investigation Screen Specifications]]; [[OMRS Database ERD]]                                                                  |
| Related Pattern Story        | [[Create Outbreak Investigation - CDC Investigator User Story]]; [[Outbreak Search - Outbreak Investigator User Story]]                         |
| Reference Material           | [[CLAUDE-OMRS]]; [[User Maintenance Screen Specifications]]                                                                                     |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation; Health Information Act (HIA), RSA 2000, c H-5; PHAC / international reporting              |
| Link to System Design Doc    | [Link — TBD]                                                                                                                                    |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                                    |
| Last Updated                 | June 26, 2026                                                                                                                                   |
| Updated by                   | Alec Blair                                                                                                                                      |

### Update Comments

- 2025-12-01: Updated to latest User Story template and added links to supporting legislation, policy or guidance where appropriate.
- 2026-06-26: Alec Blair — migrated from working draft into the HSS user-story standard. Added Background, five concrete scenarios (meets definition, does-not-meet, tracking, linked/parent, WGS), two-tier Given/When/Then acceptance criteria with Public Health Act / HIA traceability, and a Dependencies section. Incorporated reviewer changes: exposure attribute generalised from "Food" to **Source**; AC3 reframed as **receive** a line list (NDOB note) with submit assigned to O-ET-1; AC7 (document why a referral needs no further investigation) added per Jessica; AC6 WGS kept as a flagged criterion pending the non-facility line-list scope decision. Set stage to **Assess (A)** to match the O-A ID prefix and assessment purpose, and flagged the O-A-2 ↔ O-A-6 cross-reference in the Create Outbreak story.
