---
type: User Story
title: Submit Aggregate Outbreak Report - Facility Operator User Story
description: Facility Operator capability to submit symptom or absentee status at the summary (aggregate) level for staff and clients/students, so the facility can meet Public Health Act notifiable-disease reporting obligations where per-individual line lists are not required (e.g., child care facilities and schools).
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omrs
  - aggregate-report
  - facility-operator
timestamp: 2026-06-26T00:00:00Z
---

## Background

Not every outbreak setting reports at the individual level. For lower-acuity congregate settings — **child care facilities** and **schools** in particular — Public Health asks the **Facility Operator** to report **summary-level** symptom or absentee counts rather than a named line list. The care-setting guides set the trigger and the categories: schools report when there is roughly **10% student absenteeism** due to similar symptoms (or an unusual increase in staff GI illness), and child care facilities report on the basis of **two or more** individuals with new onset of similar symptoms (see [[Guide for Outbreak Prevention & Control in Schools]] and [[Guide for Outbreak Prevention & Control in Child Care Facilities (Full Guide)]]). Both report through the Provincial Public Health Support Team (PPHST), today largely by phone and through REDCap-style forms.

This story captures the Facility Operator's need to **submit an Aggregate Outbreak Report** — a dated snapshot of symptomatic counts (split by staff/HCW and clients/students), severity outcomes (lab-confirmed, hospitalizations, deaths), the population at risk, and the predominant symptom category — in a structured electronic form the Outbreak Management Reporting System (OMRS) can consume directly. It is the **aggregate counterpart** to the identifiable-patient [[Submit Facility Outbreak Line List - Facility Operator User Story|Facility Outbreak Line List story]] (O-ET-1): the line list feeds individual case detail; this story feeds period summary counts where individual detail is neither required nor practical. Aggregate and line-list submission together **replace REDCap** for outbreak reporting (see [[OMRS Database ERD]] Section 8 and the REDCap-replacement note).

Its build realisation maps to the **`FacilityOutbreakAggregateReport`** entity in [[OMRS Database ERD]] Section 8 — which already holds the dated, staff-vs-client split of symptomatic, lab-confirmed, hospitalized, death and recovered counts, with an `isManualEntry` flag distinguishing operator-entered snapshots from aggregates derived from a line list. Connect Care remains the **system of record for individual cases**; OMRS owns the aggregate outbreak-reporting record (see [[CLAUDE-OMRS]] data-ownership boundaries). This story sits at the **Manage (M)** stage of the Outbreak Value Stream.

> **ERD gaps flagged for design.** The source data elements go slightly beyond the current `FacilityOutbreakAggregateReport` columns. Three groups are **not yet in the ERD** and are flagged here rather than invented: (a) **population at risk** — total staff/HCW on affected units, total clients/students on affected units, total facility population, and the ability for these to change over time as the outbreak extends to new units; (b) **predominant symptom category** — viral respiratory / gastrointestinal / rash / other, plus **initial symptom onset date**; and (c) **facility identification beyond `Facility`** — contact person and the specific **unit / floor / area affected**. `Facility` carries name, address and phone; `Room`/`Department` can express affected area. These should be added to Section 8 (or an associated `AggregateReportPopulation` child for the time-varying population) during design — see Dependencies.

> **Two reporting modes, one record.** Because aggregates can be **manually entered** by the operator or **derived from a line list**, the `isManualEntry` flag must be honoured so a setting that later moves to line-list reporting does not double-count. This story covers the **manual aggregate** path; derivation is an OMRS-internal capability noted under Desirable.

## User Story

- **As a** Facility Operator
- **I need** the ability to submit symptom or absentee status at the summary level for employees and clients/students
- **so that** I can be compliant with the Public Health Act and related notifiable-disease policies and guidance.

## Scenarios

- **Scenario A — School absenteeism threshold reached (initial report).** An elementary school sees student absenteeism cross ~10% with similar viral respiratory symptoms. The operator opens the aggregate web form, supplies the facility identification and the report date, and enters symptomatic counts split by staff and students, the population at risk, and the predominant symptom category. The snapshot is written as a new `FacilityOutbreakAggregateReport` (`isManualEntry = true`) against the matching `Outbreak`.
- **Scenario B — Child care facility, two-or-more rule.** A child care facility reports two or more children with new onset of GI symptoms within 24 hours. The operator submits a dated aggregate snapshot for staff and children, with "gastrointestinal" as the predominant category and the initial symptom onset date recorded.
- **Scenario C — Daily update and trend over time.** The next day the operator returns and submits a new dated snapshot (new symptomatic counts, two newly lab-confirmed, one hospitalization). Each submission carries its own `reportDate` so Public Health can track the outbreak curve over time.
- **Scenario D — Outbreak extends to new units.** The outbreak spreads from one wing/classroom to another; the operator increases the population-at-risk figures (total staff and total clients/students on affected units) and the affected unit/area to reflect the larger denominator.
- **Scenario E — Pre-EI / pre-Outbreak number.** The facility reports before CDC has assigned an Outbreak/EI number; the report is captured and later associated to the `Outbreak` once the identifier is assigned.
- **Scenario F — Investigator submission on the operator's behalf.** The operator phones PPHST; the Outbreak Investigator enters the aggregate snapshot on the facility's behalf from the call.
- **Scenario G — Correction with rationale.** The operator (or an Investigator) realizes a prior count was wrong and adjusts a submitted snapshot, recording a comment explaining the change.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Submit dated aggregate symptomatic counts, split staff vs. client.** *Given* a reportable situation per the care-setting guide, *when* the Facility Operator submits, *then* the operator can record aggregate counts of symptomatic individuals categorized **separately by Staff/HCW and by Residents/Clients/Students/Patients**, each snapshot carrying the **report date** so counts can be tracked over time (`FacilityOutbreakAggregateReport.reportDate`, `staffSymptomaticCount`, `clientSymptomaticCount`, `isManualEntry = true`). [Public Health Act s. 22 — notification to the Medical Officer of Health in the prescribed form; CDC Outbreak Guides] *(Jessica: date associated so we can track over time.)*
2. **Capture the summary severity data elements.** *Given* a snapshot, *when* the operator enters detail, *then* the form captures: symptomatic-by-staff/HCW count, symptomatic-by-clients/students count, **total symptomatic** (staff + client), **lab-confirmed** cases, **hospitalizations**, and **deaths** (`staffSymptomaticCount` + `clientSymptomaticCount`; `*LabConfirmedCount`; `*HospitalizedCount`; `*DeathCount`). [[OMRS Database ERD]] Section 8
3. **Capture facility identification.** *Given* a report, *when* it is created, *then* the system captures/confirms facility **name, address, phone, contact person, facility type, and the unit/floor/area affected** (`Facility.facilityName`, `facilityAddress`, `facilityPhone`, `facilityTypeID`; affected area via `Room`/`Department`). *Contact person and a discrete "unit/floor/area affected" attribute are ERD gaps — see Dependencies.* [Alberta Outbreak Report Form — Definitions and Instructions](https://www.alberta.ca/system/files/hlth-outbreak-report-form-definitions.pdf)
4. **Capture population at risk.** *Given* a report, *when* it is created, *then* the operator can record **total staff/HCW on affected units**, **total residents/clients/students/patients on affected units**, and **total facility population**, and these can **change over time** as the outbreak extends to additional units/rooms/wings. *Population-at-risk fields and their time-variation are an ERD gap — propose a time-varying `AggregateReportPopulation` child in Section 8.* [CDC Outbreak Guides] *(Jessica: ability to have this change over time.)*
5. **Capture onset date and predominant symptom category.** *Given* a report, *when* it is created, *then* the operator can enter the **initial symptom onset date** and the **predominant symptom category** — **viral respiratory, gastrointestinal, rash, or other** — per the Surveillance / Care Tracking Sheet. *Onset date and predominant-category fields are an ERD gap for Section 8.* [[Guide for Outbreak Prevention & Control in Schools]]; [[Guide for Outbreak Prevention & Control in Child Care Facilities (Full Guide)]]
6. **Associate each report with the Outbreak/EI number.** *Given* a snapshot, *when* an Outbreak/EI number has been assigned by CDC, *then* the report attaches to the correct `Outbreak` via that identifier (`FacilityOutbreakAggregateReport.outbreakID`); a report submitted before assignment can be associated once the number exists. [[OMRS Database ERD]] Section 1
7. **Timestamp every submission.** *Given* any submission, *when* it is saved, *then* the system records a submission timestamp and the submitter (`submittedDate`, `submittedBy`), distinct from the snapshot's `reportDate`. [[OMRS Database ERD]] Section 8
8. **Submit via an accessible web portal.** *Given* the range of operator capabilities, *when* submitting, *then* the operator can use an **accessible web portal** that meets accessibility standards. [Public Health Act s. 26 — fastest means possible]
9. **Investigator submission on the operator's behalf.** *Given* a phone or verbal report, *when* the operator cannot submit electronically, *then* an Outbreak Investigator can enter the aggregate report on the Facility Operator's behalf.
10. **Adjust a submission with a comment.** *Given* a submitted aggregate report, *when* a count or field is corrected, *then* the operator (or Investigator) can change the submission and a **comment/rationale** for the adjustment is recorded (audited — actor, timestamp, before/after via `AuditLog`). *Adjustment comment is an ERD gap for Section 8.*

### Desirable (Nice to Have)

1. **Derive aggregates from the line list.** Where a setting also submits an individual line list, OMRS can **derive** the aggregate snapshot from it (`isManualEntry = false`) so the operator does not key counts twice, with no double-counting against manual snapshots.
2. **Trend visualization.** The portal shows the operator a simple time series of their submitted counts so they can see the outbreak curve they are contributing to.
3. **Pre-filled facility and outbreak context.** Where the operator follows a link tied to a specific outbreak, facility identification, the active Outbreak/EI number, and the relevant care-setting symptom categories pre-populate the form.
4. **Threshold prompts by setting.** The form surfaces the care-setting reporting trigger (e.g., school 10% absenteeism, child care two-or-more) so the operator knows when a report is due (`OutbreakDefinition.absenteeismThresholdPct`).
5. **Submission confirmation / receipt.** The operator receives confirmation that the dated report was received for the reporting period, including a "no change" submission.

## Dependencies

- **ERD Section 8 extensions (to be designed).** `FacilityOutbreakAggregateReport` covers the staff/client count split and severity outcomes but does **not** yet hold population-at-risk (with time-variation), predominant symptom category, initial symptom onset date, facility contact person, a discrete affected unit/area attribute, or an adjustment comment. Propose these additions (and a time-varying `AggregateReportPopulation` child) before build; do not create a dangling spec link in the interim.
- **Aggregate-report screen specification (to be created).** No OMRS screen specification for the Aggregate Outbreak Report exists yet; field detail is carried against [[OMRS Database ERD]] Section 8. Create the build spec and link it here once it exists.
- **Care-setting reporting specifications.** The aggregate triggers and symptom categories come from [[Guide for Outbreak Prevention & Control in Schools]] and [[Guide for Outbreak Prevention & Control in Child Care Facilities (Full Guide)]]; align the form's categories and thresholds to these.
- **Create Outbreak Investigation (O-A-4) / Outbreak Assessment (O-A-6).** The `Outbreak` parent (and Outbreak/EI number) must exist for a report to attach; a pre-assignment report associates once the identifier is created. Linked above.
- **Facility Outbreak Line List (O-ET-1).** Desirable AC1's aggregate derivation depends on the line-list feed; `isManualEntry` keeps the two modes from double-counting. Linked above.

## User Story Metadata

|                              |                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                         |
| Value Stream Stage Workflow  | Manage (M)                                                                                                                           |
| User Story ID                | O-M-1                                                                                                                                |
| Role                         | Facility Operator                                                                                                                   |
| Status                       | Analysis                                                                                                                            |
| Build Team(s)                | Outbreak Application Team                                                                                                            |
| Related Design Spec          | [[OMRS Database ERD]] Section 8 (Aggregate report screen specification — TBD)                                                       |
| Related Pattern Story        | [[Submit Facility Outbreak Line List - Facility Operator User Story]]                                                               |
| Reference Material           | [[CLAUDE-OMRS]]; [[Guide for Outbreak Prevention & Control in Schools]]; [[Guide for Outbreak Prevention & Control in Child Care Facilities (Full Guide)]]; [Alberta Outbreak Report Form — Definitions and Instructions](https://www.alberta.ca/system/files/hlth-outbreak-report-form-definitions.pdf) |
| Regulatory Drivers           | Public Health Act s. 22 (notification in prescribed form) & s. 26 (fastest means possible); Health Information Act (HIA), RSA 2000, c H-5; CDC Outbreak Guides |
| Link to System Design Doc    | [Link — TBD]                                                                                                                         |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                         |
| Last Updated                 | June 26, 2026                                                                                                                        |
| Updated by                   | Alec Blair                                                                                                                          |

### Update Comments

- 2025-12-01: Updated with the new user story template and linked acceptance criteria to supporting documentation where appropriate.
- 2026-06-26: Alec Blair — migrated from source notes into the HSS user-story standard. Added Background, seven scenarios (school threshold, child care two-or-more, daily trend, unit extension, pre-EI, Investigator-on-behalf, correction), ten minimum and five desirable Given/When/Then criteria with Public Health Act ss. 22/26, HIA and CDC-guide / Alberta Outbreak Report Form traceability, and a Dependencies section. Mapped source data elements to `FacilityOutbreakAggregateReport` (OMRS ERD Section 8) and flagged ERD gaps (population-at-risk with time-variation, predominant symptom category + onset date, facility contact person / affected-unit attribute, adjustment comment) and the pending aggregate-report screen specification. Retained reviewer (Jessica) notes on date tracking and time-varying population at risk.
