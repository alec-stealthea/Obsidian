---
tags:
  - claude-context
type: Context File
title: CLAUDE-CDC-User-Stories
scope: Health Shared Services/Primary Care Alberta/Public Health/Communicable Diseases/Communicable Disease Management/Communicable Disease Working Groups/CDC/CDC User Stories
parent: "[[CLAUDE-CDC]]"
last-updated: 2026-06-26
timestamp: 2026-06-26T00:00:00Z
---
# CLAUDE-CDC-User-Stories.md — CDC User Story Catalogue

> **Purpose**: The catalogue of CDC (Communicable Disease Control) outbreak-management user stories. This file holds the per-story annotations — ID, persona, what the story does, and its key relationships — so the parent [[CLAUDE-CDC]] can carry the *settled cross-cutting context* (what CDC is, the Outbreak value stream, the ID scheme, the build team) without the story list bloating it. The story set is large and still growing, which is why the catalogue lives one level down, adjacent to the stories it describes.

---

## Scope

Governs `CDC/CDC User Stories/`. Sits below [[CLAUDE-CDC]] in the context chain: **[[CLAUDE-Communicable-Diseases]] → [[CLAUDE-CDC]] → CLAUDE-CDC-User-Stories**. The cross-cutting facts these stories share — the **Outbreak (O)** value stream and its stages (*Exposure Trace → Confirm → Assess → Open → Manage → Close*), the `O-[Stage]-[seq]` ID scheme, and the **Outbreak Application Team** as build team — are defined in [[CLAUDE-CDC]] and are not repeated here.

The stories are *requirements*; their build realisations are the OMRS screen specifications governed by [[CLAUDE-OMRS]]. Keep the requirement here; keep the build spec in the OMRS folder. Open design decisions and ERD gaps are tracked in the cross-folder [[Communicable Disease Open Issues]] register, not in individual stories.

## Catalogue (by value-stream stage)

### Confirm (C)

- [[Outbreak Search - Outbreak Investigator User Story]] (**O-C-3**) — Outbreak Investigator searches/sorts/filters active and historical outbreaks to confirm whether to declare a new outbreak or update an existing one; launches Create Outbreak and exports filtered results.
- [[Document Facility Outbreak Phone Encounter - PPHST Call Analyst User Story]] (**O-C-[TBD]**) — Population and Public Health Support Team (PPHST) **Call Analyst** documents the initial investigation of a facility outbreak phone encounter so it can be triaged and transitioned to a **SHE (Safe and Healthy Environments / Environmental and Public Health)** or **CDC** Outbreak Investigator, or closed with advice. The first **PPHST Call Analyst** story — the front-door/intake that feeds the O-A-4 Create Outbreak and O-A-6 Assessment work. Captures the Genesys / Epic Cheers call log, assessment + status of PPHST teaching, refer-vs-close disposition, line-list attach (the call-taker-mediated counterpart to O-ET-1), and investigator-response-time advice; links the seven setting-specific Outbreak Prevention & Control guides as the guidance source. Referral mechanism from Genesys / Epic Cheers into OMRS / SHE / CDC is open (CD-OI-14).
- [[Create Exposure Incident ID - CDC Investigator User Story]] (**O-C-[TBD]**, _current state_) — CDC Investigator requests generation of an Exposure Incident (EI) ID (ProvLab EI number / zone-specific OI number) so non-patient-specific lab requests can be tracked and results associated to an outbreak. Captures the lab agreement that the OMRS **Outbreak ID** is accepted as the lab-sample identifier for human, food, animal, and environmental samples. **Current-state record, pending the Epic-migration review of Outbreak Identifier creation** (CD-OI-3). Numbering deferred (source draft was O-A-4, now held by the Create Outbreak story); provisionally Confirm (C).

### Exposure Trace (ET)

- [[Submit Facility Outbreak Line List - Facility Operator User Story]] (**O-ET-1**) — Facility Operator notifies Public Health of the individual details of an outbreak at their facility and provides initial and daily line-list updates (new/updated symptomatic or confirmed individuals, hospitalizations, deaths) in a format OMRS can consume. The first CDC **Facility Operator** story (the rest are Investigator stories); supports clients/residents/inmates vs. staff/HCWs, non-mandatory PII, multi-channel submission (auth-free web form / Excel / paper-fax), and Investigator submission-or-correction on the operator's behalf. This is the identifiable-patient line-list feed the O-A-4 Create Outbreak and O-A-6 Assessment stories consume; build spec (line-list screen specification) still to be created.

### Assess (A)

- [[Create Outbreak Investigation - CDC Investigator User Story]] (**O-A-4**) — Outbreak Investigator creates the outbreak investigation record and marks it Active so the outbreak can be reported to stakeholders, the Initial AORF sent, and the outbreak team stood up; supports cluster/parent and PHAC links, multiple organisms with case definitions, and Open/Closed + Tracking/Outbreak/Not-an-Outbreak status. Successor to the O-C-3 search story; build spec is [[Create Outbreak Investigation Screen Specifications]].
- [[Outbreak Assessment - CDC Investigator User Story]] (**O-A-6**) — Outbreak Investigator assesses a reported (suspected) facility outbreak to decide whether it meets the outbreak definition and warrants further investigation; documents assessment metadata, receives an initial line list, links parent/cluster outbreaks and external IDs, and dispositions as Outbreak / Not an Outbreak / Tracking.

### Manage (M)

- [[Submit Aggregate Outbreak Report - Facility Operator User Story]] (**O-M-1**) — Facility Operator submits **summary-level** symptom/absentee counts (split staff/HCW vs. clients/students), severity outcomes, population at risk, and predominant symptom category for settings that report in aggregate rather than by line list (child care facilities, schools). The aggregate counterpart to the O-ET-1 line-list story; maps to `FacilityOutbreakAggregateReport` ([[OMRS Database ERD]] Section 8) with `isManualEntry` distinguishing operator-keyed from line-list-derived snapshots. Flags ERD gaps (time-varying population-at-risk, predominant-category + onset date, facility contact/affected-unit, adjustment comment); aggregate-report screen spec still to be created.

### Deprecated / superseded

- [[Set Outbreak Status (Deprecated) - CDC Investigator User Story]] — deprecated as redundant: too much overlap with the other outbreak stories (notably Create Outbreak O-A-4 and Assessment O-A-6, which already carry the status/disposition handling). Retained for traceability.
- [[Update CD Episode Outbreak ID - CDC Investigator User Story]] — Investigator associates a Connect Care CD episode to an outbreak via the Outbreak ID. Cross-reference with the Connect Care CD Episode work and CD-OI-7 / CD-OI-8.

## Working Conventions

- Author CDC stories to the HSS user-story standard (Background → User Story → Scenarios → two-tier Given/When/Then Acceptance Testing → Dependencies → Metadata table → Update Comments), matching the pattern stories [[TB Contact List - TB Nurse User Story]] and [[STI Large Exposure User Story]].
- Use **OMRS** (not legacy AOMS/OMRA) in new content; cross-link the relevant OMRS screen spec and the [[OMRS Database ERD]] rather than restating field detail.
- When adding a new story, add its row to the catalogue above under the correct value-stream stage, and record any new open design decision in [[Communicable Disease Open Issues]] (not here).

---

_Last Updated_: 2026-06-26
_Version_: 1.0 (catalogue migrated out of [[CLAUDE-CDC]] into a dedicated child context file)
