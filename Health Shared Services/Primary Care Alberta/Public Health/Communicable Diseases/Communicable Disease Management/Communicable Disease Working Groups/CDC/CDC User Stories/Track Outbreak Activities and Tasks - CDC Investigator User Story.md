---
type: User Story
title: Track Outbreak Activities and Tasks - CDC Investigator User Story
description: CDC Outbreak Investigator capability to track their outbreak activities — stakeholder interactions and assigned/recurring tasks — so the team knows what work has been completed and activities can be audited.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - task-management
  - activity-tracking
  - work-queue
timestamp: 2026-06-26T00:00:00Z
---

## Background

Once an outbreak is created (see [[Create Outbreak Investigation - CDC Investigator User Story]], O-A-4), the team is stood up (see [[Assign Staff to Outbreak - Team Lead Department Manager User Story]], O-M-5), and a manager has assembled the task lists for the investigation (see [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]], O-M-6), the **CDC Outbreak Investigator** working the outbreak needs a way to **track their own activities**: who they spoke to and how, what they were told, what documents changed hands, which tasks are still outstanding, and which tasks recur day after day until the outbreak closes. This is the investigator-side, execution-and-tracking counterpart to the manager's task-list-maintenance capability — O-M-6 *creates and maintains* the lists; this story is the investigator *working and recording against* them.

The need is shared across the outbreak team. The source captured it from three perspectives — the **Investigator** (who logs the work), the **Team Lead / Department Manager** (who needs the team to know what has been done), and the **Medical Officer of Health (MOH)** (who needs a defensible audit trail). The capability is written for the Investigator persona because they are the actor who records activity; the manager-oversight and MOH-audit needs are served by the same activity history and audit log this story produces, and by the manager review/metrics capability in O-M-6 and [[Manager Outbreak Metrics and Reporting - Team Lead Department Manager User Story|O-M-7]].

Two halves of the capability map differently to the [[OMRA Database ERD]]. The **interaction / communication log** maps cleanly to the **existing** `OutbreakActivity` + `ActivityType` tables (Section 3) — the same entities O-M-6 AC7 writes communication notes to — with a small reference-data gap (the source's **Verbal** and **Fax** interaction types, alongside the **Letter** / **Other** gap already flagged on O-M-6). The **task tracking and reminders** half depends on the **task / checklist data model OMRA does not yet have** — the `TaskTemplate` / `TaskList` / `Task` extension flagged as an open issue on O-M-6 — plus a further extension for **reminders and recurring tasks**. These dependencies are carried in the Dependencies section and recorded in [[Communicable Disease Open Issues]] rather than restated as field detail.

Connect Care remains the system of record for individual cases (see [[CLAUDE-OMRA]] data-ownership boundaries); OMRA owns the outbreak coordination record, including its activity log and task tracking. This story sits at the **Manage (M)** stage of the Outbreak Value Stream (*Exposure Trace → Confirm → Assess → Open → Manage → Close*).

> **Note on Jessica's daily-task examples and the design intent to eliminate Excel.** The source records two concrete recurring daily tasks an investigator performs today through external/manual channels: (1) **checking for new lab results** for outbreak specimens — currently via the **ProvLab portal** — and (2) **checking for new reports** of resident or staff cases — currently by checking the **Master Tracking Spreadsheet**. The new design intent is to **replace the ProvLab-portal check with an Epic Compass Rose Case Load report and Alerts**, and the **combined solution is to eliminate the Excel Master Tracking Spreadsheet** — so both of these recurring manual checks become reviews of pushed Connect Care / Epic data rather than tasks the investigator has to remember and perform by hand. These illustrate the *recurring task* requirement (AC5) today and the *work-queue* desirables (Desirable 4 and 5) as the target state, both tracked in Dependencies.

> **Note on the Story ID.** The source draft carried this story as **CDC-O-2**. It is reassigned to **O-M-8** to fit the `O-[Stage]-[seq]` scheme defined in [[CLAUDE-CDC]], on the **Manage (M)** stage, after the existing Manage stories O-M-1/2/5/6/7. The legacy CDC-O-2 identifier is preserved in the Update Comments for traceability.

## User Story

- **As a** CDC Outbreak Investigator (Communicable Disease Control)
- **I need** the ability to track my outbreak activities — my interactions with stakeholders and the tasks assigned to me, including recurring tasks
- **so that** I can ensure the team knows what work has been completed and so my activities can be audited if needed.

## Scenarios

> Scenarios reflect where the same role/role type has a different way of working within a specialty, zone, or department. They help determine whether separate user stories are needed, or whether a common practice can reduce build complexity.

- **Scenario A — Log a stakeholder interaction (happy path).** Following a phone call to a continuing-care facility operator, the investigator records an interaction on the outbreak: type **Phone**, the facility operator as the stakeholder, the date and time (defaulted to now), and free-text notes on what was discussed, building an auditable communication history the rest of the team can see.
- **Scenario B — Attach a document to an interaction.** The facility emails an updated line list during the call. The investigator attaches that document to the interaction record so the artefact travels with the activity it relates to.
- **Scenario C — Record interactions across stakeholder types.** Over the course of the outbreak the investigator logs interactions with a **facility operator**, an **other agency** (e.g., a partner jurisdiction or lab), and **team members**, each tagged with the correct stakeholder type so the activity history distinguishes who was contacted.
- **Scenario D — Back-date an interaction.** The investigator logs a verbal hallway briefing that happened earlier in the day; the default current date/time is edited back to when the conversation actually occurred.
- **Scenario E — Work assigned tasks and mark them complete.** The investigator opens the tasks assigned to them for an outbreak (instantiated by the manager via O-M-6), completes one, and marks it done so the team's completion view reflects the work.
- **Scenario F — Set a reminder for a future / recurring task.** The investigator sets a reminder for a task due later in the week, and a **recurring daily** reminder for the standing tasks — checking the ProvLab portal for new outbreak-specimen lab results and checking for new reports of resident or staff cases — so the routine work is prompted rather than remembered.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Track interactions with outbreak stakeholders by stakeholder type.** *Given* an outbreak, *when* the investigator records an interaction, *then* the system captures the interaction against the outbreak and identifies the stakeholder as a **Facility Operator**, an **Other Agency**, or a **Team Member**. Maps to `OutbreakActivity` with the stakeholder/party recorded; confirm the party reference (facility contact `→ Facility`, team member `→ Person`, and an external-agency reference) against the data model. [[OMRA Database ERD]] Section 3 (`OutbreakActivity`); Section 4 (`Facility`)
2. **Indicate the type of interaction.** *Given* an interaction record, *when* the investigator classifies it, *then* they can set the interaction type to **Phone, Email, Verbal, or Fax**. Maps to `ActivityType`; the reference list must include **Verbal** and **Fax** (alongside the **Letter** / **Other** additions already flagged on O-M-6) — a reference-data gap, see Dependencies. [[OMRA Database ERD]] Section 3 (`ActivityType`)
3. **Attach documents to an interaction record.** *Given* an interaction, *when* the investigator has a related artefact (e.g., an emailed line list, a faxed form, a letter), *then* they can attach one or more documents to that interaction so the artefact is retained with the activity. Confirm the document-attachment entity in the ERD. [[OMRA Database ERD]]
4. **Capture date and time, defaulting to now and editable.** *Given* a new interaction or activity, *when* it is created, *then* the **date and time default to the current date and time** and the investigator can **edit** them (e.g., to back-date a verbal interaction). Maps to `OutbreakActivity.activityDate` (date-time). [[OMRA Database ERD]] Section 3
5. **Set reminders on future and recurring tasks.** *Given* a task that must be completed in the future, *when* the investigator sets a reminder, *then* the system records a reminder for that task, and supports **recurring** reminders for standing tasks (e.g., daily checks). *(Depends on the task/template data model that OMRA does not yet have — `TaskTemplate` / `TaskList` / `Task` — plus a reminder/recurrence extension; see Dependencies. The recurring-daily examples are checking the ProvLab portal for new outbreak-specimen lab results and checking for new reports of resident or staff cases — see Background note.)* [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]]
6. **View and update the tasks assigned to me.** *Given* tasks instantiated for an outbreak by the Team Lead / Department Manager (O-M-6), *when* the investigator works the outbreak, *then* they can see the tasks assigned to them and **mark a task complete** (with completed-by and completed-date), so the team's completion view reflects the work done. *(Same task data-model dependency as AC5.)* [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]]
7. **Privacy-conforming activity tracking and audit.** *Given* the create/edit actions on interactions, attachments, and tasks, *when* they are performed, *then* they are scoped to the investigator's authorized team / zone / disease group per the OMRA access model and audited via `AuditLog` (actor, timestamp, before/after), so the team can see what has been completed and the MOH / manager can audit the activity trail. The activity record is coordination metadata but may carry personal and personal-health information. [[User Maintenance Screen Specifications]]; [Health Information Act (HIA), RSA 2000, c H-5 — collection, use, disclosure and audit, [verify section]]

### Desirable (Nice to Have)

1. **Structured interaction outcome / direction.** Beyond the type, capture the interaction **direction** (inbound/outbound) and a short structured **outcome** code with a free-text note, to support consistent reporting of stakeholder contact.
2. **Reminder delivery and snooze.** Surface due and overdue reminders in the investigator's work queue (and optionally by email/notification), with the ability to snooze or reschedule, so time-sensitive outbreak actions are not missed.
3. **Activity timeline per outbreak.** Present a chronological timeline of all interactions and task completions for an outbreak so the investigation history is visible at a glance without reading the audit log — feeding the manager review in O-M-6 and the metrics view in [[Manager Outbreak Metrics and Reporting - Team Lead Department Manager User Story|O-M-7]].
4. **Lab-results via an Epic Compass Rose Case Load report and Alerts (replace the ProvLab manual check).** The recurring "check ProvLab portal" task (AC5) is replaced by an **Epic Compass Rose Case Load report and Alerts** that surface new outbreak-specimen lab results to the investigator, so the work becomes a review of pushed Connect Care / Epic results rather than a manual portal check. *(Target-state design intent — integration dependency, see Dependencies.)*
5. **New-case-report review replaces the Excel Master Tracking Spreadsheet.** The recurring "check the Master Tracking Spreadsheet" task (AC5) is replaced so new reports of resident or staff cases are reviewed from structured Connect Care / Epic data (Compass Rose report / Alerts and the O-ET-1 line-list / O-M-1 aggregate feeds) rather than an Excel workbook. **The combined design goal is to eliminate the Excel Master Tracking Spreadsheet entirely.** *(Target-state design intent — see Dependencies.)*

## Dependencies

- **Task / template / reminder data model (ERD extension — open issue).** AC5 and AC6 depend on the new tables OMRA does not yet have — at minimum `TaskTemplate`, `TaskList`, and `Task` (the same gap flagged on [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]], O-M-6) — **plus** a further extension to model **reminders and recurrence** (due date, reminder lead time, recurrence rule). Record/extend in [[Communicable Disease Open Issues]] and [[OMRA Database ERD]] before build.
- **`ActivityType` reference data (minor).** AC2 depends on the `ActivityType` reference list including **Verbal** and **Fax**, alongside the **Letter** / **Other** additions already flagged on O-M-6 (Section 3). Confirm and seed once.
- **Stakeholder / party reference for interactions.** AC1 depends on being able to record the interaction counterpart as a **Facility Operator** (`→ Facility` / facility contact), an **Other Agency** (an external-agency reference — cf. `ExternalReportSubmission.reportingAgencyID`), or a **Team Member** (`OutbreakTeamMember` / `Person`). Confirm the party model on `OutbreakActivity`.
- **Document-attachment entity.** AC3 depends on confirming (or adding) a document-attachment entity associated with `OutbreakActivity` in the [[OMRA Database ERD]].
- **Manager task-list capability (O-M-6).** AC5/AC6 consume the task lists created in [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]]; this story is the investigator-side counterpart. Keep the two aligned on the shared task model.
- **Epic Compass Rose Case Load report and Alerts (Desirable 4 — design intent).** The recurring ProvLab-portal check (AC5) is intended to be **replaced by an Epic Compass Rose Case Load report and Alerts** rather than a new OMRA lab-results integration; relates to the lab-identifier work in [[Create Exposure Incident ID - CDC Investigator User Story]]. Confirm the Compass Rose report/Alerts scope, ownership (Connect Care / Epic vs. OMRA), and the boundary with this story, and track as a design decision in [[Communicable Disease Open Issues]].
- **Eliminate the Excel Master Tracking Spreadsheet (Desirable 5 — design intent).** The recurring Master-Tracking-Spreadsheet check (AC5) is intended to be **eliminated** as part of the combined solution, with new resident/staff case reports reviewed from structured Connect Care / Epic data (the Compass Rose report / Alerts above) and the [[Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1) and [[Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1) feeds. Confirm whether a consolidated new-case review lives here, in those stories, or in the Compass Rose work; track in [[Communicable Disease Open Issues]].
- **Activity-tracking / task screen specification (to be created).** The build realisation (an activity-log surface and the task/reminder surface) is not yet specified in the OMRA folder; cross-link once authored.

## User Story Metadata

|                              |                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                      |
| Value Stream Stage Workflow  | Manage (M)                                                                                                                        |
| User Story ID                | O-M-8 — reassigned from source draft **CDC-O-2**; numbering per the `O-[Stage]-[seq]` scheme in [[CLAUDE-CDC]]                    |
| Role                         | CDC Outbreak Investigator (Communicable Disease Control / CDC) — capability also serves Team Lead / Department Manager and MOH oversight/audit |
| Status                       | Analysis                                                                                                                          |
| Build Team(s)                | Outbreak Application Team                                                                                                          |
| Related Design Spec          | [[User Maintenance Screen Specifications]]; [[OMRA Database ERD]] (Section 3 — `OutbreakActivity`/`ActivityType`; ERD extension for `TaskTemplate`/`TaskList`/`Task` + reminders/recurrence) |
| Related Story                | [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]] (O-M-6 — manager creates the task lists this story works); [[Assign Staff to Outbreak - Team Lead Department Manager User Story]] (O-M-5 — team stood up); [[Manager Outbreak Metrics and Reporting - Team Lead Department Manager User Story]] (O-M-7 — manager review/metrics); [[Create Outbreak Investigation - CDC Investigator User Story]] (O-A-4) |
| Related Pattern Story        | [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]]                                                      |
| Reference Material           | [[CLAUDE-OMRA]]; [[CLAUDE-CDC]]; [[User Maintenance Screen Specifications]]                                                       |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation (outbreak management); Health Information Act (HIA), RSA 2000, c H-5 (audit of activities) |
| Link to System Design Doc    | [Link — TBD]                                                                                                                      |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                      |
| Last Updated                 | June 26, 2026                                                                                                                     |
| Updated by                   | Alec Blair                                                                                                                        |

### Update Comments

- 2026-01-30: Alec Blair — created this story (as source draft **CDC-O-2**) as it was missing; needs to be reviewed.
- 2026-06-26: Alec Blair — added the design intent that the **ProvLab-portal lab-results check be replaced by an Epic Compass Rose Case Load report and Alerts**, and that the **combined solution eliminate the Excel Master Tracking Spreadsheet**. Reframed Desirable 4 and 5, the Background note, and the related Dependencies to this target state.
- 2026-06-26: Alec Blair — migrated into the HSS user-story standard. Added Background, six scenarios (log interaction, attach document, stakeholder types, back-date, work assigned tasks, future/recurring reminders), two-tier Given/When/Then acceptance criteria with Public Health Act / HIA traceability, and a Dependencies section. Mapped the interaction/communication log to the existing `OutbreakActivity`/`ActivityType` tables and the task-tracking/reminder half to the not-yet-built `TaskTemplate`/`TaskList`/`Task` model (shared with O-M-6) plus a reminder/recurrence extension. Incorporated the source acceptance points (track stakeholder interactions by type; Phone/Email/Verbal/Fax; document attachment; date-time default-to-now and editable; reminders on future and recurring tasks) and Jessica's daily-task examples (ProvLab lab-results check; Master Tracking Spreadsheet case-report check), the latter surfaced as recurring-task drivers and candidate work queues. Reassigned the source **CDC-O-2** ID to **O-M-8** on the Manage (M) stage; positioned the story as the investigator-side counterpart to the manager task-list story O-M-6.
