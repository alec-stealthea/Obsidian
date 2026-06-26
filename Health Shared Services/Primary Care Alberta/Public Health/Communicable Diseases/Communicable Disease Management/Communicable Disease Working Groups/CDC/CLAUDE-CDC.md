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
- **Value Stream and ID scheme.** CDC stories sit on the **Outbreak (O)** value stream, whose stages are *Exposure Trace → Confirm → Open → Manage → Close*. Story IDs follow `O-[Stage]-[seq]` — e.g., `O-C-3` is the third story at the **Confirm (C)** stage.
- **Build team.** CDC stories are built by the **Outbreak Application Team**.
- **Design specs are in OMRS, not here.** CDC stories reference the OMRS screen specifications — [[Communicable Disease Search Screen Specifications]] (the build realisation of the O-C-3 search story), [[Create Outbreak Investigation Screen Specifications]], [[Contact Identification Screen Specifications]], [[User Maintenance Screen Specifications]] — and the [[OMRS Database ERD]]. Keep the requirement (the story) here; keep the build spec in the OMRS folder.

## CDC User Stories

- [[Outbreak Search - Outbreak Investigator User Story]] (**O-C-3**) — Outbreak Investigator searches/sorts/filters active and historical outbreaks to confirm whether to declare a new outbreak or update an existing one; launches Create Outbreak and exports filtered results.

## Open Decisions / Pending Dependencies

Track these so they are not silently re-decided in individual stories:

- **Outbreak `Outbreak` ERD gaps.** Searching/filtering by Disease, Setting and Region depends on `Outbreak` columns not yet modelled (`infectiousDiseaseID`, `outbreakSettingID`, `zoneID`/region) — flagged in [[Create Outbreak Investigation Screen Specifications]] and [[OMRS Database ERD]], to be resolved in a later Create Outbreak / ERD analysis round.
- **Region definitions are an outstanding design decision.** Candidate levels (Zone, Sub-Zone, Corridor, Municipality, Neighbourhood) are carried as placeholders pending the authoritative source and final set.
- **Resolution status.** "Pending (untriaged)" is treated as the same state as **Tracking** in `Outbreak.outbreakProgress` (Tracking / Outbreak / Not an Outbreak) — no separate Pending value.
- **Outbreak Summary user story (to be created).** Re-opening a closed outbreak belongs to the Outbreak Summary story, not the search story; link the two once it exists.

## Working Conventions

- Author CDC stories to the HSS user-story standard (Background → User Story → Scenarios → two-tier Given/When/Then Acceptance Testing → Metadata table → Update Comments), matching the pattern stories [[TB Contact List - TB Nurse User Story]] and [[STI Large Exposure User Story]].
- Use **OMRS** (not legacy AOMS/OMRA) in new content; cross-link the relevant OMRS screen spec and the ERD rather than restating field detail.

---

_Last Updated_: 2026-06-26
_Version_: 1.1 (linked the O-C-3 search story to its build spec, [[Communicable Disease Search Screen Specifications]])
