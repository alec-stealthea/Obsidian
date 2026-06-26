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

The per-story catalogue — each story's ID, persona, summary, and relationships, organised by value-stream stage — lives in the dedicated child context file [[CLAUDE-CDC-User-Stories]], adjacent to the stories it describes. It currently spans the Confirm (search, PPHST phone-encounter intake, exposure-incident ID), Exposure Trace (facility line list), Assess (create outbreak, assessment), and Manage (aggregate report) stages, plus deprecated/superseded entries. Add new stories there under the correct stage rather than enumerating them here.

## Open Issues & Pending Dependencies

Open design decisions, ERD gaps, and pending story/note dependencies are **not** tracked here — they live in the cross-folder [[Communicable Disease Open Issues]] register (issues CD-OI-1, CD-OI-2, CD-OI-4, and the CDC story dependencies CD-OI-9 through CD-OI-13). Record new open items there, not in this context file.

One **settled** decision worth keeping in context (so it is not re-litigated): "Pending (untriaged)" is treated as the same state as **Tracking** in `Outbreak.outbreakProgress` (Tracking / Outbreak / Not an Outbreak) — there is no separate Pending value.

## Working Conventions

- Author CDC stories to the HSS user-story standard (Background → User Story → Scenarios → two-tier Given/When/Then Acceptance Testing → Metadata table → Update Comments), matching the pattern stories [[TB Contact List - TB Nurse User Story]] and [[STI Large Exposure User Story]].
- Use **OMRS** (not legacy AOMS/OMRA) in new content; cross-link the relevant OMRS screen spec and the ERD rather than restating field detail.

## Child Context Files

- [[CLAUDE-CDC-User-Stories]] — the per-story catalogue for `CDC User Stories/`, organised by value-stream stage. This file keeps the settled CDC context; the catalogue keeps the churn.

---

_Last Updated_: 2026-06-26
_Version_: 1.8 (migrated the per-story catalogue into the dedicated child context file [[CLAUDE-CDC-User-Stories]]; this file now carries only the settled cross-cutting CDC context and references the catalogue)
