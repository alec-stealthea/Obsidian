---
tags:
  - claude-context
type: Context File
title: CLAUDE-CDC
scope: Health Shared Services/Primary Care Alberta/Public Health/Communicable Diseases/Communicable Disease Management/Communicable Disease Working Groups/CDC
parent: "[[CLAUDE-Communicable-Diseases]]"
last-updated: 2026-06-26
timestamp: 2026-06-26T00:00:00Z
---
# CLAUDE-CDC.md — Communicable Disease Control (CDC) Working Group Context

> **Purpose**: Context for the CDC (Communicable Disease Control) working-group folder. Unlike the disease-specific working groups (STI / TB), CDC is the **outbreak-management** working group — its stories describe the cross-disease capabilities of the Outbreak Management Reporting System (OMRS) rather than one notifiable disease. Program-wide CD facts live in the parent [[CLAUDE-Communicable-Diseases]]; only CDC-specific context is captured here.

---

## Scope

Governs `Communicable Disease Working Groups/CDC/`, including `CDC User Stories/`. Sits below [[CLAUDE-Communicable-Diseases]] in the context chain. The CDC working group's requirements are realised in the OMRS application — its design specifications live in the OMRS folder and are governed by [[CLAUDE-OMRS]], which this file references rather than duplicates.

## What's Unique to CDC

- **CDC is the outbreak working group.** Its user stories describe generic outbreak-investigation capabilities (search, create, summarise, manage) that apply across diseases and settings, not a single-disease pathway.
- **Value Stream and ID scheme.** CDC stories sit on the **Outbreak (O)** value stream, whose stages are *Exposure Trace → Confirm → Assess → Open → Manage → Close*. Story IDs follow `O-[Stage]-[seq]` — e.g., `O-C-3` is the third story at the **Confirm (C)** stage, and `O-A-4` is the fourth at the **Assess (A)** stage. (The **Assess** stage aligns with the `OutbreakLifecycleStatus` enum value of the same name — New → **Assess** → Active → … — where the investigator creates the investigation record and marks it Active.)
- **Build team.** CDC stories are built by the **Outbreak Application Team**.
- **Design specs are in OMRS, not here.** CDC stories reference the OMRS screen specifications — [[Communicable Disease Search Screen Specifications]] (the build realisation of the O-C-3 search story), [[Create Outbreak Investigation Screen Specifications]], [[Contact Identification Screen Specifications]], [[User Maintenance Screen Specifications]] — and the [[OMRS Database ERD]]. Keep the requirement (the story) here; keep the build spec in the OMRS folder.

## CDC User Stories

- [[Outbreak Search - Outbreak Investigator User Story]] (**O-C-3**) — Outbreak Investigator searches/sorts/filters active and historical outbreaks to confirm whether to declare a new outbreak or update an existing one; launches Create Outbreak and exports filtered results.
- [[Create Outbreak Investigation - CDC Investigator User Story]] (**O-A-4**) — Outbreak Investigator creates the outbreak investigation record and marks it Active so the outbreak can be reported to stakeholders, the Initial AORF sent, and the outbreak team stood up; supports cluster/parent and PHAC links, multiple organisms with case definitions, and Open/Closed + Tracking/Outbreak/Not-an-Outbreak status. Successor to the O-C-3 search story; build spec is [[Create Outbreak Investigation Screen Specifications]].
- [[Outbreak Assessment - CDC Investigator User Story]] (**O-A-6**) — Outbreak Investigator assesses a reported (suspected) facility outbreak to decide whether it meets the outbreak definition and warrants further investigation; documents assessment metadata, receives an initial line list, links parent/cluster outbreaks and external IDs, and dispositions as Outbreak / Not an Outbreak / Tracking.
- [[Submit Facility Outbreak Line List - Facility Operator User Story]] (**O-ET-1**) — Facility Operator notifies Public Health of the individual details of an outbreak at their facility and provides initial and daily line-list updates (new/updated symptomatic or confirmed individuals, hospitalizations, deaths) in a format OMRS can consume. The first CDC **Facility Operator** story (the rest are Investigator stories); supports clients/residents/inmates vs. staff/HCWs, non-mandatory PII, multi-channel submission (auth-free web form / Excel / paper-fax), and Investigator submission-or-correction on the operator's behalf. This is the identifiable-patient line-list feed the O-A-4 Create Outbreak and O-A-6 Assessment stories consume; build spec (line-list screen specification) still to be created.
- [[Submit Aggregate Outbreak Report - Facility Operator User Story]] (**O-M-1**) — Facility Operator submits **summary-level** symptom/absentee counts (split staff/HCW vs. clients/students), severity outcomes, population at risk, and predominant symptom category for settings that report in aggregate rather than by line list (child care facilities, schools). The aggregate counterpart to the O-ET-1 line-list story; maps to `FacilityOutbreakAggregateReport` ([[OMRS Database ERD]] Section 8) with `isManualEntry` distinguishing operator-keyed from line-list-derived snapshots. Sits at the **Manage (M)** stage. Flags ERD gaps (time-varying population-at-risk, predominant-category + onset date, facility contact/affected-unit, adjustment comment); aggregate-report screen spec still to be created.
- [[Create Exposure Incident ID - CDC Investigator User Story]] (**O-C-[TBD]**, _current state_) — CDC Investigator requests generation of an Exposure Incident (EI) ID (ProvLab EI number / zone-specific OI number) so non-patient-specific lab requests can be tracked and results associated to an outbreak. Captures the lab agreement that the OMRS **Outbreak ID** is accepted as the lab-sample identifier for human, food, animal, and environmental samples. **Current-state record, pending the Epic-migration review of Outbreak Identifier creation** (CD-OI-3). Numbering deferred (source draft was O-A-4, now held by the Create Outbreak story); provisionally Confirm (C).

## Open Issues & Pending Dependencies

Open design decisions, ERD gaps, and pending story/note dependencies are **not** tracked here — they live in the cross-folder [[Communicable Disease Open Issues]] register (issues CD-OI-1, CD-OI-2, CD-OI-4, and the CDC story dependencies CD-OI-9 through CD-OI-13). Record new open items there, not in this context file.

One **settled** decision worth keeping in context (so it is not re-litigated): "Pending (untriaged)" is treated as the same state as **Tracking** in `Outbreak.outbreakProgress` (Tracking / Outbreak / Not an Outbreak) — there is no separate Pending value.

## Working Conventions

- Author CDC stories to the HSS user-story standard (Background → User Story → Scenarios → two-tier Given/When/Then Acceptance Testing → Metadata table → Update Comments), matching the pattern stories [[TB Contact List - TB Nurse User Story]] and [[STI Large Exposure User Story]].
- Use **OMRS** (not legacy AOMS/OMRA) in new content; cross-link the relevant OMRS screen spec and the ERD rather than restating field detail.

---

_Last Updated_: 2026-06-26
_Version_: 1.6 (added the O-M-1 Submit Aggregate Outbreak Report Facility Operator story — the aggregate/summary-level counterpart to the O-ET-1 line-list story — to the story list)
