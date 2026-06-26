---
type: User Story
title: Maintain Outbreak Task Lists - Team Lead Department Manager User Story
description: Team Lead / Department Manager capability to create and maintain task lists for outbreak types and for specific organisms so that the work of an outbreak investigation is communicated, tracked, and completed consistently.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - task-management
  - work-queue
  - outbreak-team
timestamp: 2026-06-26T00:00:00Z
---

## Background

Once an outbreak is created (see [[Create Outbreak Investigation - CDC Investigator User Story]], O-A-4) and the team is stood up (see [[Assign Staff to Outbreak - Team Lead Department Manager User Story]], O-M-5), the **Team Lead / Department Manager** needs a way to drive the actual *work* of the investigation: the set of tasks that must be done for that outbreak, who is doing them, and whether they are complete. Today that work is carried in the setting-specific **Outbreak Management Team Checklists** — e.g., the [[Outbreak Management Checklist]] and the CDC *Acute Care* and *Child Care Outbreak Management Team Checklist* guides — which are static PDFs maintained outside any application. This story brings that capability into the Outbreak Management Reporting Application (OMRA) so a manager can stand up, tailor, and track task lists against live outbreaks.

The manager persona here is the same defined **Team Lead / Department Manager** functional role used in O-M-5 — role #4 in the [[User Maintenance Screen Specifications|OMRA access model]], whose capabilities include team/department oversight and accountability for task completion. The capability has two reusable dimensions: task lists tied to an **outbreak type** (respiratory, GI, mixed — the `OutbreakType` reference list) and task lists tied to a **specific organism** (the `OutbreakOrganism` / disease reference data). A manager assembles the right combination for a given outbreak from pre-established templates, then adds, removes, or modifies tasks as the investigation evolves. The point is consistency: every comparable outbreak gets the same baseline set of tasks so nothing is missed and the manager can review completion at a glance.

This requirement introduces a **task / checklist data model that OMRA does not yet have**. The [[OMRA Database ERD]] today carries `Outbreak`, `OutbreakType`, `OutbreakOrganism`, the `OutbreakActivity` + `ActivityType` log (Section 3), the `FacilityLineList` line-list intake (Section 5), and `AORFSubmission` (Section 9) — but there is no `TaskTemplate`, `TaskList`, or `Task` table. Standing up task-list management therefore depends on an ERD extension; this is flagged in Dependencies and recorded in [[Communicable Disease Open Issues]]. Two acceptance criteria, however, map cleanly to **existing** tables: the communication-activity notes (phone, email, letter, other) map to `OutbreakActivity` / `ActivityType`, and the incoming line-list work queue maps to `FacilityLineList` and the O-ET-1 line-list intake.

Connect Care remains the system of record for individual cases; OMRA owns the outbreak coordination record, now including its task lists. This story sits at the **Manage (M)** stage of the Outbreak Value Stream (*Exposure Trace → Confirm → Assess → Open → Manage → Close*).

> **Scope note — manager metrics held out.** A reviewer comment (Jessica) on the source raised a related but distinct need: managers checking *metrics across groups of outbreaks* (e.g., the elapsed time from "pending" to "under investigation") and the *status and timing of AORF submissions* against a KPI. That is **reporting/analytics over many outbreaks**, not task-list maintenance on one. It is moved out of scope here and recommended as a **separate user story (proposed O-M-7, Manager Outbreak Metrics & Reporting)** — see *Moved out of scope* and *Dependencies*. This is the same dedicated manager-reporting story already flagged as to-be-created in O-M-5.

## User Story

- **As a** Team Lead / Department Manager in Communicable Disease Control (CDC)
- **I need** the ability to create and maintain multiple lists of tasks associated with all types of outbreaks as well as tasks associated to specific organisms
- **so that** I can accurately and consistently communicate and review tasks to ensure the listed work is completed.

## Scenarios

> Scenarios reflect where the same role/role type has a different way of working within a specialty, zone, or department. They help determine whether separate user stories are needed, or whether a common practice can reduce build complexity.

- **Scenario A — Stand up a task list from a template (happy path).** A Department Manager opens an Active respiratory outbreak, applies the pre-established *Respiratory Outbreak* task template, and the standard task set is attached to that outbreak. They then add one organism-specific task drawn from the influenza template.
- **Scenario B — Switch context between outbreaks.** A Team Lead overseeing several concurrent outbreaks switches from one outbreak's task list to another, with each list clearly and uniquely identified (outbreak name, facility, organism) so there is no ambiguity about which outbreak they are acting on.
- **Scenario C — Organism-specific tasks.** A Norovirus GI outbreak requires environmental-cleaning and cohorting tasks that a respiratory outbreak does not. The manager applies the organism-specific task set on top of the GI outbreak-type baseline.
- **Scenario D — Tailor an existing list.** Mid-investigation the manager adds a newly required task, marks an obsolete task as removed, and edits the wording/owner of another, without disturbing the template other outbreaks draw from.
- **Scenario E — Process incoming line lists from a work queue.** New and updated facility line lists arrive for the outbreaks the manager oversees; they appear in a work queue for triage and processing (linking to the O-ET-1 line-list intake) rather than the manager having to hunt for them per outbreak.
- **Scenario F — Record a communication as a note.** Following a phone call to a facility operator, the manager logs a communication activity (Phone) against the outbreak; the same applies to email, letters, and other contact types, building an auditable communication history on the outbreak.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Switch context by outbreak.** *Given* a manager overseeing more than one outbreak, *when* they select an outbreak, *then* the application scopes the task-list view to that outbreak (`Outbreak.outbreakID`) and all task actions apply to it. [[OMRA Database ERD]] Section 1 (`Outbreak`)
2. **Create task lists from pre-established templates.** *Given* a set of maintained task templates keyed to outbreak type and/or organism, *when* the manager applies a template to an outbreak, *then* the template's tasks are instantiated as a task list on that outbreak. Templates resolve against `OutbreakType` (Section 2) and `OutbreakOrganism` / disease reference data (Section 10). *(Depends on a new task/template data model — see Dependencies.)*
3. **Uniquely and clearly identify each task list.** *Given* multiple task lists across multiple outbreaks, *when* a list is displayed or selected, *then* it is unambiguously identified by its outbreak (name, facility, organism, outbreak ID) so the manager cannot act on the wrong outbreak. [[OMRA Database ERD]] Section 1 (`Outbreak`), Section 4 (`Facility`)
4. **Add, remove, and modify tasks on an existing list.** *Given* an existing task list, *when* the manager adds, removes, or edits a task (description, owner, status, due date), *then* the change is persisted against that outbreak's list and is auditable, and removal is a soft delete so history is preserved. *(Depends on a new `Task` / `TaskList` table — see Dependencies.)* [Health Information Act (HIA), RSA 2000, c H-5 — audit of changes, [verify section]]
5. **Restrict task-list maintenance to the Team Lead / Department Manager role.** *Given* the OMRA access model, *when* a user attempts to create or modify task templates/lists, *then* template maintenance and list creation are available to a user holding the **Team Lead / Department Manager** functional role (or above); individual task *completion* may be performed by assigned team members. [[User Maintenance Screen Specifications]]
6. **Work queue for incoming line lists.** *Given* facility line lists submitted for the manager's outbreaks, *when* a new or updated line list is received, *then* it appears in a work queue for processing rather than requiring per-outbreak search. Maps to `FacilityLineList` (Section 5) and the intake in [[Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1). [[OMRA Database ERD]] Section 5 (`FacilityLineList`)
7. **Communication activities recorded as notes by type.** *Given* an outbreak, *when* the manager records a communication, *then* it is written to `OutbreakActivity` with an `ActivityType` of **Phone Call, Email, Letter, or Other**, carrying the person, date, and free-text notes, building an auditable communication history. *(`ActivityType` currently enumerates Phone Call / Email / Report Review etc.; confirm **Letter** and **Other** are present in the reference list — minor ERD reference-data gap, see Dependencies.)* [[OMRA Database ERD]] Section 3 (`OutbreakActivity`, `ActivityType`)

### Desirable (Nice to Have)

1. **Sort / group by facility.** Allow the manager to sort and group task lists (and their outbreaks) by facility so a manager overseeing several facilities can review them facility by facility. [[OMRA Database ERD]] Section 4 (`Facility`)
2. **Template versioning.** Version task templates so updates to a standard checklist do not retroactively alter already-instantiated outbreak task lists, and so the template lineage is traceable.
3. **Task completion roll-up.** Surface a per-outbreak completion summary (e.g., "12 of 18 tasks complete") so the manager can review progress at a glance without opening each task.
4. **Due dates and overdue flags.** Support per-task due dates with an overdue indicator so time-sensitive outbreak actions are visible.
5. **Source the templates from the published checklists.** Seed the pre-established templates from the existing CDC *Outbreak Management Team Checklists* (Acute Care, Child Care, and the setting-specific [[Outbreak Management Checklist|guides]]) so the in-application templates match current published practice.

### Moved out of scope (tracked elsewhere)

- **Manager metrics across groups of outbreaks (Jessica's comment).** Checking the timeline of lifecycle transitions across many outbreaks (e.g., "pending"/New → "under investigation"/Assess elapsed time) and the **status and timing of AORF submissions against a KPI** is cross-outbreak reporting/analytics, not single-outbreak task maintenance. It is built as a dedicated story — [[Manager Outbreak Metrics and Reporting - Team Lead Department Manager User Story]] (**O-M-7**) — which draws on `OutbreakLifecycleStatus` transition history (Section 1 / Section 12 audit) and `AORFSubmission.dueDate` / `submittedDate` / `acknowledgedDate` / `submissionStatus` (Section 9). This is the same manager-reporting story flagged as to-be-created in [[Assign Staff to Outbreak - Team Lead Department Manager User Story]] (O-M-5).
- **Line-list data capture and validation.** The structure and validation of the line list itself is owned by [[Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1); this story consumes that feed into a work queue (AC6), it does not redefine the line list.
- **Outbreak-team role assignment.** Assigning people to outbreak roles is O-M-5; this story assigns *tasks*, which may be owned by already-assigned team members.

## Dependencies

- **Task / template data model (ERD extension — open issue).** AC2 and AC4 depend on new tables that OMRA does not yet have — at minimum `TaskTemplate` (keyed to `OutbreakType` and/or `OutbreakOrganism`), `TaskList` (instance attached to an `Outbreak`), and `Task` (description, owner `→ Person`, status, due date, soft-delete). Recommend recording this gap in [[Communicable Disease Open Issues]] and extending [[OMRA Database ERD]] before build.
- **`ActivityType` reference data (minor).** AC7 depends on the `ActivityType` reference list including **Letter** and **Other** alongside the existing Phone Call / Email entries (Section 3). Confirm and seed.
- **Line-list intake (O-ET-1).** The work queue in AC6 depends on the `FacilityLineList` feed from [[Submit Facility Outbreak Line List - Facility Operator User Story]].
- **Team stand-up (O-M-5).** Task ownership depends on team members already assigned via [[Assign Staff to Outbreak - Team Lead Department Manager User Story]].
- **User Maintenance / access model.** The "Team Lead / Department Manager performs maintenance" rule (AC5) depends on the access model in [[User Maintenance Screen Specifications]].
- **Manager Outbreak Metrics & Reporting story ([[Manager Outbreak Metrics and Reporting - Team Lead Department Manager User Story|O-M-7]]).** See *Moved out of scope*. The cross-outbreak metrics/KPI capability lives there, not here.
- **Task-list / template screen specification (to be created).** The build realisation (a task-list maintenance screen and a template-maintenance screen) is not yet specified in the OMRA folder; cross-link once authored.

## User Story Metadata

|                              |                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                      |
| Value Stream Stage Workflow  | Manage (M)                                                                                                                        |
| User Story ID                | O-M-6                                                                                                                             |
| Role                         | Team Lead / Department Manager (Communicable Disease Control / CDC)                                                               |
| Status                       | Analysis                                                                                                                          |
| Build Team(s)                | Outbreak Application Team                                                                                                          |
| Related Design Spec          | [[User Maintenance Screen Specifications]]; [[OMRA Database ERD]] (Section 3 — `OutbreakActivity`/`ActivityType`; Section 5 — `FacilityLineList`; ERD extension for `TaskTemplate`/`TaskList`/`Task`) |
| Related Story                | [[Assign Staff to Outbreak - Team Lead Department Manager User Story]] (O-M-5 — team stood up); [[Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1 — line-list feed); [[Create Outbreak Investigation - CDC Investigator User Story]] (O-A-4) |
| Related Pattern Story        | [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]]                                                      |
| Reference Material           | [[CLAUDE-OMRA]]; [[Outbreak Management Checklist]]; [[User Maintenance Screen Specifications]]                                    |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation (outbreak management); Health Information Act (HIA), RSA 2000, c H-5 (audit) |
| Link to System Design Doc    | [Link — TBD]                                                                                                                      |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                      |
| Last Updated                 | June 26, 2026                                                                                                                     |
| Updated by                   | Alec Blair                                                                                                                        |

### Update Comments

- 2025-12-01: Alec Blair — Initial draft for review by the CDC team.
- 2026-01-30: Alec Blair — Updated to add metadata and review of feedback.
- 2026-06-26: Alec Blair — Restructured to the HSS user-story standard and aligned to the OMRA User Roles convention. Restated the generic "manager" persona as the defined **Team Lead / Department Manager** functional role (per [[User Maintenance Screen Specifications]]). Added Background, six scenarios, two-tier Given/When/Then acceptance criteria with HIA/Public Health Act traceability, and a Dependencies section. Mapped communication-activity notes to `OutbreakActivity`/`ActivityType` and the line-list work queue to `FacilityLineList` (O-ET-1); identified the missing task/template data model as an ERD extension and recorded it for the open-issues register. **Moved Jessica's metrics/AORF-KPI comment out of scope and recommended it as a separate story (proposed O-M-7, Manager Outbreak Metrics & Reporting)** — the same dedicated manager-reporting story already flagged in O-M-5.
