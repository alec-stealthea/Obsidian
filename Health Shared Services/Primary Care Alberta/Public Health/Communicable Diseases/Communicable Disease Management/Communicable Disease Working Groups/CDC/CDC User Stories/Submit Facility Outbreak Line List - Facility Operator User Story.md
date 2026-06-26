---
type: User Story
title: Submit Facility Outbreak Line List - Facility Operator User Story
description: Facility Operator capability to notify Public Health of the individual details of an outbreak at their facility and provide initial and daily line-list updates in a form the OMRA outbreak system can consume.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - line-list
  - facility-operator
timestamp: 2026-06-26T00:00:00Z
---

## Background

When an outbreak occurs at a facility — a continuing-care home, acute-care site, correctional facility, shelter, school or child-care setting — the **Facility Operator** is the front-line source of the individual case detail Public Health needs. Today that detail arrives through a mix of phone calls to the Provincial Public Health Support Team (PPHST), direct calls or emails to Communicable Disease Control (CDC), and ad-hoc spreadsheets. This story captures the Facility Operator's need to **submit a Facility Outbreak Line List** — the initial and daily record of who is symptomatic or confirmed at their site — in a structured electronic form that the Outbreak Management Reporting Application (OMRA) can consume directly, so the data lands on the right `Outbreak` record without re-keying.

The line list is the identifiable-patient feed referenced by the [[Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak Investigation story]] (O-A-4, AC3) and received during the [[Outbreak Assessment - CDC Investigator User Story|Outbreak Assessment story]] (O-A-6). Its build realisation maps to the **Line List & Case Management** entities in the [[OMRA Database ERD]] Section 5 (`FacilityLineList`, `LineListPerson`, `LineListPersonType`, `CaseClassification`, `LineListPersonSymptom`, with `Room` for in-facility location and `ClientRegistryTransaction` for PHN/ULI validation). Connect Care remains the **system of record for individual cases**; OMRA owns the outbreak line-list submission and coordination record (see [[CLAUDE-OMRA]] data-ownership boundaries). This story sits at the **Exposure Trace (ET)** stage of the Outbreak Value Stream and is the Facility Operator counterpart to the CDC Investigator outbreak-creation work.

The design intent is **low-friction, flexible submission**. A Facility Operator may not hold complete demographics for every case — particularly for staff and health-care workers, where date of birth or PHN are often unknown — so the system must accept partial records rather than block on mandatory personally identifiable information. Submission must be possible across the channels operators actually use (authentication-free web form, Excel by email or web upload, paper by email or fax), and Investigators must be able to complete or correct a line list on the operator's behalf.

> **Two acceptance-criteria streams.** The source analysis flags that unique identification of **Health Care Facility patients/residents** needs different handling from **all other use cases** (e.g., staff/HCWs, or non-patient settings). The minimum criteria below separate identity capture (AC2) from the structural submission capability (AC1) so this distinction can be carried into design without forcing a single rule across both populations.

> **Note on the EI number.** The source notes "EI # Notification for lab results" — the Exposure Incident (EI / OI) identifier lets non-patient-specific lab requests be associated to an outbreak. EI generation is owned by the [[Create Exposure Incident ID - CDC Investigator User Story|Create Exposure Incident ID story]]; this story consumes the EI number as the key that links submitted specimen results back to the line list (AC4).

## User Story

- **As a** Facility Operator
- **I need** the ability to notify Public Health of the individual details of an outbreak at my facility
- **so that** I can provide initial and daily updates with changes in symptoms or outcomes in previously identified or newly identified individuals, as single individuals or as groups.

## Scenarios

- **Scenario A — Authentication-free web form (initial submission).** A continuing-care home declares a respiratory outbreak. The operator opens the public web form (no login required), supplies the outbreak identifier and facility name/address, and enters an initial list of symptomatic residents and staff, using whatever identifying fields are on hand. The records are written to a new `FacilityLineList` against the matching `Outbreak`.
- **Scenario B — Daily update with changes.** The next day the operator returns, marks two existing residents as hospitalized, adds one newly symptomatic staff member, and submits. Existing `LineListPerson` rows are updated and the new person added, with separate dates for "added" versus "updated".
- **Scenario C — No change to report.** On a quiet day the operator submits a "no updates" confirmation for the reporting period so Public Health knows the absence of new cases is intentional, not a missed report.
- **Scenario D — Excel submission.** A larger site maintains its own spreadsheet and submits it by email or web upload; the file is ingested into the line list rather than re-keyed.
- **Scenario E — Paper / fax fallback.** A site without digital tooling submits a paper form by email or fax; an Investigator transcribes it into the line list.
- **Scenario F — Phone call to PPHST / direct to CDC.** The operator phones PPHST (or emails / calls the MoH or a CDC line directly); the Investigator completes the line list on the operator's behalf from the call.
- **Scenario G — Investigator correction.** An Investigator spots a mis-classified case in a submitted list and modifies it, recording a rationale for the change.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Submit individuals and/or groups in a consumable electronic format.** *Given* a declared outbreak, *when* the Facility Operator submits, *then* the operator can record one or more individuals — both **clients / residents / inmates** and **staff / HCWs** — as single individuals or as groups, in an electronic format that OMRA can consume directly against the relevant `Outbreak` (`FacilityLineList` → `LineListPerson`, with `LineListPersonType` separating patient/resident from worker). [Public Health Act s. 22 — notification to the Medical Officer of Health in the prescribed form; s. 26 — notification by the fastest means possible]
2. **Capture as many "platinum" identifiers as are available, without mandating PII.** *Given* the submission, *when* the operator enters person detail, *then* the system uses as many identifying ("platinum") fields as available — First Name, Last Name, Address, Phone Number, Gender, DOB, PHN / ULI — to uniquely identify each individual, while **no field is individually mandatory**, so partial records (e.g., staff without DOB or PHN) are accepted. [Notifiable Disease Reporting Manual — Section 1; [[OMRA Database ERD]] Section 5 `LineListPerson`]
3. **Display outbreak case-definition dates and symptoms.** *Given* the line list for an outbreak, *when* the operator records a case, *then* the system displays the outbreak case-definition basis — including **symptom onset date** and the **specific symptoms** relevant to the outbreak — and aligns the captured detail to Notifiable Disease reporting for the individual Communicable Disease episode. [CDC Outbreak Guidelines by care setting and disease-specific symptoms; [[OMRA Database ERD]] Section 5 `LineListPersonSymptom`]
4. **Confirm specimen collection and results.** *Given* a recorded case, *when* specimen information is known, *then* the operator can confirm whether specimens have been collected and record the specimen result, with results able to be associated via the Exposure Incident (EI) number where the requisition was raised against the outbreak. [[OMRA Database ERD]] Section 5 (`specimenCollectionDate`, `specimenResult`); [[Create Exposure Incident ID - CDC Investigator User Story]]
5. **Daily reporting of new or updated individuals.** *Given* an ongoing outbreak, *when* the operator reports for a period, *then* the operator can add newly symptomatic / newly identified individuals and update previously reported ones per the communicated outbreak case definition, and specifically can: submit a **"no updates"** confirmation; record location **down to room level** where available (`Room`); **update an existing** reported individual; **add a new** individual; and keep **facility-operator staff separate from clients/residents**. [CDC Facility Guides; [[OMRA Database ERD]] Section 5]
6. **Supply the outbreak identifier(s).** *Given* a submission, *when* it is created, *then* the operator supplies (or the form pre-fills) the outbreak identifier so the line list attaches to the correct `Outbreak`. [[OMRA Database ERD]] Section 1
7. **Supply facility name and address.** *Given* a submission, *when* it is created, *then* the facility name and address are captured / confirmed (`Facility.facilityName`, `facilityAddress`). [[OMRA Database ERD]] Section 4
8. **Report hospitalizations.** *Given* a case, *when* outcome changes, *then* the operator can record hospitalization and related detail (`isHospitalized`, `hospitalizationDate`, `hospitalName`). [[OMRA Database ERD]] Section 5
9. **Report deaths.** *Given* a case, *when* an individual dies, *then* the operator can record the death and whether it is related to the outbreak (`isDied`, `deathDate`, `deathRelatedToOutbreak`). [[OMRA Database ERD]] Section 5
10. **Submit across multiple channels.** *Given* the range of operator capabilities, *when* submitting, *then* the operator can use: (a) a **web form with no authentication requirement**; (b) **Excel by email or web upload**; and (c) a **paper form by email or fax**. [Public Health Act s. 26 — fastest means possible]
11. **Investigator submission on the operator's behalf.** *Given* a phone or paper report, *when* the operator cannot submit electronically, *then* an Investigator can complete the line list on the Facility Operator's behalf.
12. **Investigator modification with rationale.** *Given* a submitted line list, *when* an Investigator corrects it, *then* the Investigator can modify the Facility Operator's submission and a **rationale** for the change is recorded (audited via `AuditLog` — actor, timestamp, before/after).
13. **Document facility-acquired vs. community exposure.** *Given* a recorded case, *when* the exposure source is known, *then* the operator can document whether the infection / exposure was **facility-acquired** or **community-acquired**. *(Whether each reported case is ultimately included in or excluded from the outbreak is an Investigator decision and is handled in the Investigator user story, not here.)*
14. **Trigger a PHN check and CD-episode open where required.** *Given* a case that requires an individual Communicable Disease episode, *when* it is recorded, *then* the system can check for a PHN (via `ClientRegistryTransaction` PHN validation / ULI lookup) and support opening the corresponding CD episode. [[OMRA Database ERD]] Section 6; [Health Information Act (HIA), RSA 2000, c H-5 — collection, use and disclosure, [verify section]]

### Desirable (Nice to Have)

1. **Per-individual symptom selection.** The operator can select **specific symptoms per individual patient** (`LineListPersonSymptom`). *Note: for certain outbreak types this is **required**, not merely desirable, and should be promoted to a minimum criterion for those outbreak types during design.*
2. **Excel template aligned to the line-list schema.** A downloadable Excel template whose columns map one-to-one to `LineListPerson` fields, so spreadsheet submissions ingest cleanly with minimal mapping.
3. **Inline duplicate / existing-person detection.** On daily submission, the form flags likely matches to already-reported individuals so the operator updates rather than duplicates a record.
4. **Submission confirmation / receipt.** The operator receives a confirmation that the submission (including a "no updates" report) was received for the reporting period.
5. **Pre-filled outbreak context.** Where the operator follows a link tied to a specific outbreak, the outbreak identifier, facility, and active case definition / symptom set pre-populate the form.

## Dependencies

- **Line-list screen specification (to be created).** No OMRA screen specification for the Facility Outbreak Line List exists yet; the field detail above is carried against [[OMRA Database ERD]] Section 5. Create the build spec and link it here once it exists (do not create a dangling link in the interim).
- **Create Outbreak Investigation (O-A-4) and Outbreak Assessment (O-A-6).** This line list is the identifiable-patient feed those stories consume / receive; the `Outbreak` parent must exist before a line list can attach. Linked above.
- **Create Exposure Incident ID (O-C, current state).** AC4's association of specimen results via the EI number depends on the EI/OI identifier generated in that story. Linked above.
- **CD Episode user stories (to be created).** AC14's PHN check and CD-episode open must be revisited when the CD Episode stories are explored; link here once they exist.
- **Investigator include/exclude decision.** AC13 deliberately stops at "facility-acquired vs. community" documentation; the decision to include or exclude each reported case belongs to the Investigator user story.

## User Story Metadata

|                              |                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                         |
| Value Stream Stage Workflow  | Exposure Trace (ET)                                                                                                                  |
| User Story ID                | O-ET-1                                                                                                                               |
| Role                         | Facility Operator                                                                                                                   |
| Status                       | Analysis                                                                                                                            |
| Build Team(s)                | Outbreak Application Team                                                                                                            |
| Related Design Spec          | [[OMRA Database ERD]] (Line list screen specification — TBD)                                                                        |
| Related Pattern Story        | [[Create Outbreak Investigation - CDC Investigator User Story]]; [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]] |
| Reference Material           | [[CLAUDE-OMRA]]; [[Outbreak Assessment - CDC Investigator User Story]]; [[Create Exposure Incident ID - CDC Investigator User Story]] |
| Regulatory Drivers           | Public Health Act ss. 22 & 26 (notifiable disease reporting); Health Information Act (HIA), RSA 2000, c H-5; Notifiable Disease Reporting Manual |
| Link to System Design Doc    | [Link — TBD]                                                                                                                         |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                         |
| Last Updated                 | June 26, 2026                                                                                                                        |
| Updated by                   | Alec Blair                                                                                                                          |

### Update Comments

- 2025-12-01: Alec Blair — updated to new User Story Format with cross-reference to supporting documentation where applicable.
- 2026-06-26: Alec Blair — migrated from source notes into the HSS user-story standard. Removed resolved (struck-through) reviewer notes; retained their resolutions (non-mandatory PII; symptom onset + specific symptoms; include/exclude belongs to the Investigator story; per-individual symptom selection required for certain outbreak types). Added Background, seven concrete scenarios (web form, daily update, no-updates, Excel, paper/fax, phone/Investigator-on-behalf, Investigator correction), fourteen minimum and five desirable Given/When/Then criteria with Public Health Act ss. 22/26, HIA and Notifiable Disease Reporting Manual traceability, and a Dependencies section. Mapped source fields to OMRA ERD Section 5 line-list entities and flagged the pending line-list screen specification.
