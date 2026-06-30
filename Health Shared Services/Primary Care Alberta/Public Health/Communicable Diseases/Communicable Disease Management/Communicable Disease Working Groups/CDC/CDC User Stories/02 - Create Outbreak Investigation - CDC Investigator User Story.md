---
type: User Story
title: Create Outbreak Investigation - CDC Investigator User Story
description: Outbreak Investigator capability to create an outbreak investigation record so an outbreak can be marked Active for stakeholder reporting, the Initial AORF, and standing up the outbreak team.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - create-outbreak
timestamp: 2026-06-26T00:00:00Z
---
## Background

Once an Outbreak Investigator has confirmed (via the [[01 - Outbreak Search - Outbreak Investigator User Story|outbreak search]], O-C-3) that a situation is not already under investigation, the next decision is to **open the outbreak** — to create the investigation record that the rest of the Outbreak Management Reporting Application (OMRA) hangs off. Creating that record is what lets the investigator mark the outbreak **Active**, which in turn triggers the three things that have to happen quickly at the start of an outbreak: reporting to the appropriate stakeholders, sending the **Initial AORF** (Alberta Outbreak Reporting Form, due within 24 hours of declaration), and standing up the **outbreak team** with the right additional CDC staff.

The design intent is a **minimum-viable open**: capture just enough to start the investigation, then enrich the record over time as the situation is understood. The created `Outbreak` row is the parent that the line list, aggregate and AORF reporting, the contact list, and the outbreak team all reference; the Outbreak ID it provisions is also expected to serve as the lab-requisition / Exposure Investigation identifier. Connect Care remains the **system of record for individual cases** (see [[CLAUDE-OMRA]] data-ownership boundaries); OMRA owns the outbreak coordination record. This story sits at the **Assess (A)** stage of the Outbreak Value Stream and is the natural successor to the confirm/search work and predecessor to the manage-and-close work.

The build realisation of this story is the [[Create Outbreak Investigation Screen Specifications]], which maps each field to [[OMRA Database ERD]] v2.5 and flags four ERD gaps (no direct `Outbreak.infectiousDiseaseID`, `Outbreak.outbreakSettingID`, `Outbreak.zoneID`/region columns, or outbreak-level department linkage) to be resolved before build. The acceptance criteria below carry those dependencies rather than restating the field detail.

> **Note on the assessment story.** The source notes flag that this story's acceptance criteria relate to the **Outbreak Assessment — CDC Investigator User Story (O-A-2)**. That story is not yet captured in the vault, so it is referenced in plain text here (no WikiLink) and should be linked from this story once it exists.

> **Note on lifecycle vs. status vocabulary.** "Mark an outbreak as Active" maps to the `Outbreak.outbreakLifecycleStatus` enum (New, Assess, Active, Suspended, Closed, Reopened). This overlaps with two narrower fields the source lists separately: `Outbreak.outbreakStatus` (Open / Closed / Re-opened) and `Outbreak.outbreakProgress` (Tracking / Outbreak / Not an Outbreak). Which field drives the UI is an open question flagged in [[Create Outbreak Investigation Screen Specifications]]; the acceptance criteria below keep all three as the source described them.

## User Story

- **As an** Outbreak Investigator in Communicable Disease Control (CDC)
- **I need** the ability to create an outbreak investigation
- **so that** I can mark an outbreak as **Active** — to report to the appropriate stakeholders, send the Initial AORF, and add additional resources to the outbreak team.

## Scenarios

- **Scenario A — Identifiable-patient (line list) outbreak.** A continuing-care home reports gastrointestinal illness with named residents. The investigator creates the outbreak with its mandatory identity fields (investigator, disease/organism, onset date, type, setting, location/department), marks it Active, and the record is ready to receive the facility line list (O-ET-1) and to generate the Initial AORF.
- **Scenario B — Aggregate-reporting outbreak.** A facility reports case counts without an individual line list. The investigator creates the outbreak and the case count is built from the submitted aggregate report (O-M-1) rather than a line list.
- **Scenario C — Linked / clustered outbreak.** A second site is part of the same event already under investigation. The investigator creates the outbreak and links it to the **parent (cluster) outbreak**, and records a non-Alberta / federal identifier (PHAC #) where the event is referred from another jurisdiction.
- **Scenario D — Multi-organism outbreak that evolves.** An outbreak initially attributed to one organism later adds a second. The investigator adds the additional organism and its associated case definition over time, without re-creating the outbreak.
- **Scenario E — Stand up the outbreak team.** Having created the outbreak, the investigator assigns additional CDC staff to the outbreak team so the right people can work the line list, contacts and reporting.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Create the minimum-viable outbreak record and mark it Active.** *Given* the Create Outbreak Investigation screen, *when* the investigator enters the mandatory identity fields and creates the outbreak, *then* a new `Outbreak` row is written with a system-generated, immutable **Outbreak ID**, `outbreakCreateDate`, `createdBy`, and default lifecycle/status/progress values, and the investigator can set the outbreak to **Active** (`Outbreak.outbreakLifecycleStatus`). [Public Health Act & Communicable Diseases Regulation — outbreak declaration and reporting; [[Create Outbreak Investigation Screen Specifications]]]
2. **Link to a parent (cluster) outbreak and reference non-Alberta outbreak IDs.** *Given* the create flow, *when* the outbreak is part of a multi-site event or referred from another jurisdiction, *then* the investigator can link it to a **parent / cluster outbreak** (`Outbreak.clusterOutbreak`) and record an external identifier — PHAC # (`Outbreak.outbreakPHACID`) and/or an external-agency ID (`ExternalReportSubmission.reportingAgencyID`). [[OMRA Database ERD]] Section 1, Section 9
3. **Capture the specifics available at the point of initiation.** *Given* the create flow, *when* data is available, *then* the investigator can document the outbreak across the Outbreak Investigation, Outbreak Definition, Outbreak Case Count and Outbreak Investigation Progress views, where the **case count** is built from the Submit Facility Outbreak Line List capability (O-ET-1) for identifiable-patient outbreaks and the Submit Facility Outbreak Aggregate Report capability (O-M-1) for aggregate reporting. *(O-ET-1 and O-M-1 are CDC Facility Operator stories not yet captured in the vault — referenced in plain text, to be WikiLinked once they exist.)* [[Create Outbreak Investigation Screen Specifications]]
4. **Assign additional CDC staff to the outbreak team.** *Given* a created outbreak, *when* the investigator adds team members, *then* additional CDC staff are recorded as outbreak team members (`OutbreakTeamMember`, including `isOMTMember` / `isOMTLead`, `assignedDate`, `assignedBy`), so the outbreak team can be stood up and audited. [[Create Outbreak Investigation Screen Specifications]]
5. **Support multiple organisms with associated case definitions, added over time.** *Given* an outbreak, *when* one or more organisms apply, *then* the investigator can associate **multiple organisms** (`OutbreakOrganism` junction, with primary/secondary and confirmed date) and their **case definitions** (`OutbreakDefinition` / `DiseaseCaseDefinitionRule`), and organisms can be added over the life of the outbreak without re-creating it. The requirement that linked CD episodes in Connect Care (Epic) **meet the outbreak case definitions** is a dependency to be worked when CD Episode stories are explored (see Dependencies). [[OMRA Database ERD]] Section 1, Section 2
6. **Record outbreak status and resolution progress.** *Given* the outbreak record, *when* the investigator sets its state, *then* the system captures an **Open / Closed** status (`Outbreak.outbreakStatus`) and a **resolution progress** of Tracking, Outbreak, or Not an Outbreak (`Outbreak.outbreakProgress`), with Tracking covering the monitoring / not-yet-resolved case (e.g., a TB or STI large exposure opened under the outbreak framework). [[Create Outbreak Investigation Screen Specifications]]
7. **Privacy-conforming creation and audit.** *Given* the create/edit actions, *when* they are performed, *then* they are scoped to the investigator's authorized team / zone / disease group per the OMRA access model and audited via `AuditLog` (actor, timestamp, before/after). The `Outbreak` record is coordination metadata, but it is the parent of records holding personal health information. [[User Maintenance Screen Specifications]]; [Health Information Act (HIA), RSA 2000, c H-5 — collection, use and disclosure, [verify section]]

### Desirable (Nice to Have)

1. **Auto-name the outbreak.** The outbreak name pre-populates from facility + disease + date (`Outbreak.outbreakName`), with the convention confirmed, so the investigator can accept or override it.
2. **Inline create of supporting records.** The investigator can add a new user inline from the Outbreak Investigator / team lookup and a new location inline via the Outbreak Location Maintenance launch, without leaving the create flow.
3. **Region vs. facility pop-out.** A distinct path for a **region** (non-building) outbreak suppresses the irrelevant Location/Department fields, while a facility outbreak requires them.
4. **Provision the Outbreak ID as the EI / lab-requisition number.** The Outbreak ID can be provisioned to serve as the Exposure Investigation / lab-requisition identifier so requisitions can be raised before individual patients are known (deferred, [[OMRA Database ERD]] note 10).
5. **Send the Initial AORF from the created outbreak.** Once the outbreak is Active, the investigator can initiate the **Initial AORF** submission directly from the record (`AORFSubmission`, submission type *Initial*, due within 24 hours of declaration). *(AORF generation may be its own story; carried here as a desirable outcome of marking the outbreak Active.)*

## Dependencies

- **`Outbreak` ERD gaps (later analysis round).** Disease, Setting, Zone/Region and outbreak-level Department do not yet have direct columns on `Outbreak` (no `infectiousDiseaseID`, `outbreakSettingID`, `zoneID`/region, or department FK) — flagged in [[Create Outbreak Investigation Screen Specifications]] and [[OMRA Database ERD]]. To be resolved in a later Create Outbreak / ERD analysis round.
- **CD Episode user stories (to be created).** AC5's requirement that linked CD episodes in Connect Care meet the outbreak case definitions must be revisited when CD Episode stories are explored; that work will also confirm which organism/definition candidates remain valid after a change. Link here once those stories exist.
- **Outbreak Assessment — CDC Investigator User Story (O-A-2).** This story's acceptance criteria relate to O-A-2; link the two once that note exists.
- **CDC Facility Operator submission stories (O-ET-1, O-M-1).** The case-count view (AC3) depends on the line-list (O-ET-1) and aggregate-report (O-M-1) submission capabilities. Link here once those notes exist.

## User Story Metadata

|                              |                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                                    |
| Value Stream Stage Workflow  | Assess (A)                                                                                                                                      |
| User Story ID                | O-A-4                                                                                                                                           |
| Role                         | Outbreak Investigator (Communicable Disease Control / CDC)                                                                                      |
| Status                       | Analysis                                                                                                                                        |
| Build Team(s)                | Outbreak Application Team                                                                                                                        |
| Related Design Spec          | [[Create Outbreak Investigation Screen Specifications]]; [[OMRA Database ERD]]                                                                  |
| Related Pattern Story        | [[01 - Outbreak Search - Outbreak Investigator User Story]]; [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]]            |
| Reference Material           | [[CLAUDE-OMRA]]; [[Contact Identification Screen Specifications]]; [[User Maintenance Screen Specifications]]                                    |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation; Health Information Act (HIA), RSA 2000, c H-5; PHAC / AORF reporting                       |
| Link to System Design Doc    | [Link — TBD]                                                                                                                                    |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                                    |
| Last Updated                 | June 26, 2026                                                                                                                                   |
| Updated by                   | Alec Blair                                                                                                                                      |

### Update Comments

- 2025-12-01: Alec Blair — updated user story to new template standards and cross-mapped to appropriate legislation and guidance documents.
- 2026-01-30: Alec Blair — updated based on comments and feedback; adjusted ID.
- 2026-06-26: Alec Blair — migrated from OneNote into the HSS user-story standard. Added Background, five concrete scenarios (identifiable-patient line list, aggregate reporting, clustered, multi-organism, stand-up-team), two-tier Given/When/Then acceptance criteria with Public Health Act / HIA / AORF traceability, and a Dependencies section. Mapped source fields to the OMRA ERD `Outbreak` entity and related tables (`clusterOutbreak`, `outbreakPHACID`, `OutbreakTeamMember`, `OutbreakOrganism`, `OutbreakDefinition`, `outbreakStatus`/`outbreakProgress`/`outbreakLifecycleStatus`, `AORFSubmission`), linked the [[Create Outbreak Investigation Screen Specifications]] and [[OMRA Database ERD]], and flagged the O-A-2, CD Episode, and O-ET-1/O-M-1 dependencies for linking once those notes exist.
