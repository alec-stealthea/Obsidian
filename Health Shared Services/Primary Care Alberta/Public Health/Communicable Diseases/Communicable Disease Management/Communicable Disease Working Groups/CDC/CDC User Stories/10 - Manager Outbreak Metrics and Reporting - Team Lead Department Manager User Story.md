---
type: User Story
title: Manager Outbreak Metrics and Reporting - Team Lead Department Manager User Story
description: Team Lead / Department Manager capability to review metrics across groups of outbreaks — lifecycle-transition timeliness and AORF submission status and timing against KPIs — so that program performance can be monitored and reported.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - metrics
  - reporting
  - kpi
  - aorf
timestamp: 2026-06-26T00:00:00Z
---

## Background

The Team Lead / Department Manager is accountable not only for staffing an outbreak (see [[03 - Assign Staff to Outbreak - Team Lead Department Manager User Story]], O-M-5) and driving its task list (see [[04 - Maintain Outbreak Task Lists - Team Lead Department Manager User Story]], O-M-6), but for **how the program is performing across many outbreaks at once**. This story captures that oversight need: the ability to look across a *group* of outbreaks and read the metrics that tell the manager whether the program is meeting its timeliness commitments.

The requirement was raised as a review comment (Jessica) on the O-M-6 task-list story and recognised as a distinct capability rather than a part of task maintenance. Two concrete metrics were named:

1. **Lifecycle-transition timeliness** — how long outbreaks take to move between lifecycle states; the example given was the elapsed time from *"pending"* to *"under investigation"* (CDOM language). In the OMRA model this maps to transitions in `OutbreakLifecycleStatus` — **New → Assess → Active → Suspended → Closed → Reopened** — where "pending" aligns to **New** and "under investigation" aligns to **Assess/Active** *([verify] the exact CDOM-to-OMRA status mapping with the working group)*.
2. **AORF submission status and timing** — whether Aggregate Outbreak Reporting Form submissions are made on time, which **connects directly to a program KPI**. This maps to `AORFSubmission`, whose `dueDate` (Initial within 24 hrs of declaration, Final within 48 hrs of close), `submittedDate`, `acknowledgedDate`, and `submissionStatus` fields make on-time-vs-late measurable.

This is **cross-outbreak reporting and analytics**, which is why it is a separate story from the single-outbreak task work in O-M-6, and why it is the dedicated **manager outbreak-reporting** story already flagged as to-be-created in O-M-5. It is partially served today — [[01 - Outbreak Search - Outbreak Investigator User Story]] (O-C-3) offers a filtered export across outbreaks, and [[07 - Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1) covers aggregate *case* reporting — but neither provides a manager-facing **metrics/KPI** view over a group of outbreaks. That view is what this story specifies.

A note on the data model: the timeliness metric (AC1/AC2) needs the **history of lifecycle-status changes**, not just the current status. OMRA captures status mutations in the generic `AuditLog` (Section 12: `tableName`, `recordID`, `oldValues`/`newValues`, `actionDateTime`), so transition timings can be *derived* from it; whether a purpose-built `OutbreakStatusHistory` table is warranted for performant reporting is an open design decision flagged in Dependencies and recorded in [[Communicable Disease Open Issues]]. The AORF metric (AC3/AC4) is well served by existing `AORFSubmission` fields and needs no new structure.

Connect Care remains the system of record for individual cases; OMRA owns the outbreak coordination record and is the source for these program metrics. This story sits at the **Manage (M)** stage of the Outbreak Value Stream (*Exposure Trace → Confirm → Assess → Open → Manage → Close*).

## User Story

- **As a** Team Lead / Department Manager in Communicable Disease Control (CDC)
- **I need** to review metrics across groups of outbreaks — including lifecycle-transition timeliness and the status and timing of AORF submissions
- **so that** I can monitor program performance against our KPIs and report on it accurately and consistently.

## Scenarios

> Scenarios reflect where the same role/role type has a different way of working within a specialty, zone, or department. They help determine whether separate user stories are needed, or whether a common practice can reduce build complexity.

- **Scenario A — Lifecycle-transition timeliness (happy path).** A Department Manager selects the active outbreaks in their department and reviews the average and per-outbreak elapsed time from New ("pending") to Assess/Active ("under investigation"), and identifies any outbreak that has sat in New beyond an expected threshold.
- **Scenario B — AORF KPI review.** A Team Lead reviews, across a group of outbreaks, which AORF submissions were made on time (`submittedDate` ≤ `dueDate`), which are late, and which are still outstanding, and reads the resulting on-time percentage against the program KPI.
- **Scenario C — Group/filter the cohort.** The manager defines the group of outbreaks to measure — by department, facility, zone, organism, outbreak type, or date range — and the metrics recompute for that cohort.
- **Scenario D — Outstanding / overdue surfacing.** The manager filters to outbreaks with an overdue Initial or Final AORF, or outbreaks awaiting acknowledgement, so attention can be directed where the KPI is at risk.
- **Scenario E — Export for reporting.** The manager exports the metric set (cohort definition + values) for inclusion in a program report, with the export auditable where it includes personal health information.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Define a group of outbreaks to measure.** *Given* a manager with department/zone scope, *when* they select a cohort by department, facility, zone, organism, outbreak type, and/or date range, *then* the metrics are computed over exactly that set of `Outbreak` records. [[OMRA Database ERD]] Section 1 (`Outbreak`), Section 4 (`Facility`)
2. **Lifecycle-transition timeliness.** *Given* a cohort of outbreaks, *when* the manager views transition metrics, *then* the application reports elapsed time between lifecycle states — at minimum New ("pending") → Assess/Active ("under investigation") — per outbreak and as a cohort aggregate (e.g., average, count over threshold), derived from the status-change history. *([verify] CDOM-to-`OutbreakLifecycleStatus` mapping.)* [[OMRA Database ERD]] Section 1 (`OutbreakLifecycleStatus`), Section 12 (`AuditLog` / proposed status history)
3. **AORF submission status and timing.** *Given* a cohort, *when* the manager views AORF metrics, *then* for each outbreak the application shows AORF `submissionStatus` (Draft/Submitted/Acknowledged/Rejected), `dueDate`, `submittedDate`, and whether the submission was on time (`submittedDate` ≤ `dueDate`), for both Initial and Final submissions. [[OMRA Database ERD]] Section 9 (`AORFSubmission`)
4. **AORF KPI roll-up.** *Given* the AORF metrics for a cohort, *when* displayed, *then* the application computes the on-time-submission rate (the program KPI) and flags outstanding/overdue submissions so the manager can see KPI performance at a glance. [[OMRA Database ERD]] Section 9 (`AORFSubmission`)
5. **Restrict the metrics view to the Team Lead / Department Manager role and respect access scope.** *Given* the OMRA access model, *when* a user opens the metrics view, *then* it is available to a user holding the **Team Lead / Department Manager** functional role (or above), and the cohort is constrained to the outbreaks within that user's department/zone access scope. [[User Maintenance Screen Specifications]]
6. **Auditable export of metrics.** *Given* a computed metric set, *when* the manager exports it, *then* the export records the cohort definition (filters applied) so the figures are reproducible, and any export including personal health information is logged. [Health Information Act (HIA), RSA 2000, c H-5 — [verify section]]; [[OMRA Database ERD]] Section 12 (`DisclosureExportLog`)

### Desirable (Nice to Have)

1. **Trend over time.** Show lifecycle-timeliness and AORF on-time rate as a trend across periods (e.g., month over month) so the manager can see whether performance is improving.
2. **KPI target and threshold configuration.** Let the program configure the AORF on-time target and lifecycle-transition thresholds so the flags reflect current commitments rather than hard-coded values.
3. **Drill-through to the outbreak.** From any metric row, open the underlying outbreak (and its task list / team) so a manager can act on an outlier directly.
4. **Additional cohort metrics.** Extend beyond the two named metrics — e.g., time-to-close, time-to-Initial-AORF after declaration, line-list processing turnaround — as the program's KPI set matures.
5. **Scheduled/standing report.** Allow a saved cohort definition to drive a recurring manager report (e.g., weekly program-performance summary).
6. **Purpose-built status-history table.** Introduce `OutbreakStatusHistory` for performant transition reporting rather than deriving every metric from `AuditLog` at query time.

### Out of scope (tracked elsewhere)

- **Single-outbreak task management.** Per-outbreak task lists and completion are O-M-6 ([[04 - Maintain Outbreak Task Lists - Team Lead Department Manager User Story]]); this story measures across outbreaks, it does not manage tasks.
- **Aggregate case reporting by facility operators.** Symptom/absentee aggregate counts are O-M-1 ([[07 - Submit Aggregate Outbreak Report - Facility Operator User Story]]); this story reports on *program/process* metrics (timeliness, KPI), not case aggregates.
- **The investigator-facing search/export.** Cross-outbreak search and filtered export for investigators is O-C-3 ([[01 - Outbreak Search - Outbreak Investigator User Story]]); this story is the manager-facing *metrics* counterpart and may reuse that export plumbing.

## Dependencies

- **Lifecycle-status change history (open design decision).** AC2 depends on a reliable history of `OutbreakLifecycleStatus` transitions. It can be derived from `AuditLog` (Section 12) or served by a purpose-built `OutbreakStatusHistory` table; decide before build and record in [[Communicable Disease Open Issues]].
- **CDOM-to-OMRA status mapping.** AC2's "pending → under investigation" requires confirming how CDOM lifecycle language maps to the OMRA `OutbreakLifecycleStatus` enum (New / Assess / Active / Suspended / Closed / Reopened). Open analysis item — marked `[verify]`.
- **AORF data (`AORFSubmission`).** AC3/AC4 depend on `AORFSubmission` being populated with `dueDate`, `submittedDate`, `acknowledgedDate`, and `submissionStatus` — which in turn depends on the AORF submission capability being built and the Initial/Final due-date rules confirmed. [[OMRA Database ERD]] Section 9
- **KPI definition.** AC4 depends on the program's authoritative definition of the AORF on-time KPI (numerator/denominator, which submission types count, grace periods). Confirm with the CDC working group.
- **User Maintenance / access model.** AC5's role restriction and department/zone scoping depend on the access model in [[User Maintenance Screen Specifications]].
- **Source stories.** Conceptual predecessors: [[03 - Assign Staff to Outbreak - Team Lead Department Manager User Story]] (O-M-5, which first flagged this reporting story) and [[04 - Maintain Outbreak Task Lists - Team Lead Department Manager User Story]] (O-M-6, whose review raised it).
- **Metrics/reporting screen specification (to be created).** The build realisation (a manager metrics/dashboard screen) is not yet specified in the OMRA folder; cross-link once authored.

## User Story Metadata

|                              |                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                      |
| Value Stream Stage Workflow  | Manage (M)                                                                                                                        |
| User Story ID                | O-M-7                                                                                                                             |
| Role                         | Team Lead / Department Manager (Communicable Disease Control / CDC)                                                               |
| Status                       | Analysis                                                                                                                          |
| Build Team(s)                | Outbreak Application Team                                                                                                          |
| Related Design Spec          | [[User Maintenance Screen Specifications]]; [[OMRA Database ERD]] (Section 1 — `OutbreakLifecycleStatus`; Section 9 — `AORFSubmission`; Section 12 — `AuditLog`/`DisclosureExportLog`; proposed `OutbreakStatusHistory`) |
| Related Story                | [[03 - Assign Staff to Outbreak - Team Lead Department Manager User Story]] (O-M-5 — flagged this story); [[04 - Maintain Outbreak Task Lists - Team Lead Department Manager User Story]] (O-M-6 — review raised it); [[01 - Outbreak Search - Outbreak Investigator User Story]] (O-C-3 — investigator export); [[07 - Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1) |
| Related Pattern Story        | [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]]                                                      |
| Reference Material           | [[CLAUDE-OMRA]]; [[User Maintenance Screen Specifications]]                                                                       |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation (outbreak reporting timeliness); Health Information Act (HIA), RSA 2000, c H-5 (export/disclosure audit) |
| Link to System Design Doc    | [Link — TBD]                                                                                                                      |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                      |
| Last Updated                 | June 26, 2026                                                                                                                     |
| Updated by                   | Alec Blair                                                                                                                        |

### Update Comments

- 2026-06-26: Alec Blair — Initial draft. Created to capture the manager metrics/reporting capability raised as a review comment (Jessica) on O-M-6 and previously flagged as to-be-created in O-M-5. Authored to the HSS user-story standard: Background, five scenarios, two-tier Given/When/Then acceptance criteria with HIA / Public Health Act traceability, and a Dependencies section. Mapped lifecycle-transition timeliness to `OutbreakLifecycleStatus` + status-change history (`AuditLog` / proposed `OutbreakStatusHistory`) and AORF status/timing to `AORFSubmission` ([[OMRA Database ERD]] Sections 1, 9, 12). Flagged the status-history design decision and CDOM-to-OMRA status mapping as open items for [[Communicable Disease Open Issues]].
