---
type: Reference
title: CD Coherency Reports — How This Works
description: Explains the overnight Communicable Disease coherency-analysis scheduled task, its resumable design, and where reports land.
tags:
  - communicable-disease
  - coherency
  - scheduled-task
  - quality-assurance
timestamp: 2026-06-26T00:00:00Z
---
# CD Coherency Reports

> **Purpose**: Home for the dated coherency reports produced by the overnight `cd-coherency-overnight` scheduled task, plus the resumable state it uses to grind through the Communicable Disease corpus off-hours.

## Why this exists

The Communicable Disease (CD) body of work spans User Stories, Screen and Interface Specifications, Build Specifications, and ATLAS Architecture Models. As that corpus grows, keeping it internally coherent — consistent terminology, aligned field names, traceable regulatory references, matching system-of-record assertions — becomes real work. This task time-shifts that analysis to overnight so it does not consume capacity during business hours, when that capacity is reserved for interactive create/edit.

## What the task checks

For the CD deliverables (see `deliverable_globs` in `.state/coherency-state.json`), each run looks for:

- **Terminology drift** — e.g. legacy `CD/OM`, `AOMS`, or `OMRA` where new content should say `OMRS`; inconsistent disease or entity naming.
- **Field-name misalignment** — a field named one way in a Screen Specification and differently in the User Story or Interface Specification that drives it.
- **Architecture-to-spec gaps** — entities/relationships in the Architecture Models or OMRS ERD not reflected in the specs, or vice versa.
- **Traceability gaps** — User Stories or specs missing the expected regulatory anchors (HIA, *Public Health Act*, *Communicable Diseases Regulation*).
- **System-of-record contradictions** — statements that conflict with the settled program facts in `CLAUDE-Communicable-Diseases.md` (e.g. who owns CD episodes vs. outbreak coordination).
- **Cross-reference integrity** — broken or dangling WikiLinks between deliverables.

It is **report-only**. It never edits the deliverables. Findings are written here for Alec to review and act on interactively.

## Resumable, usage-limit-tolerant design

The task is built to make forward progress even when a run hits a usage limit:

1. At the start of a run it reads `.state/coherency-state.json`.
2. It processes deliverables in batches, recording each file's `last_checked` time and content hash in the state file as it goes.
3. If a run is cut short, the next scheduled run reads the same state file and continues with the unprocessed/`deferred_queue` items — it does **not** restart the sweep.
4. To maximise the chance that an interrupted run resumes the **same night**, the task is scheduled to fire several times inside the 8 PM–3 AM window. If the first fire is throttled, a later fire picks up the remainder.
5. Once every deliverable has been checked, `last_full_sweep_completed` is stamped, and subsequent runs only re-examine deliverables whose content hash changed (plus a periodic full re-sweep).

## Where things live

- **Reports**: `Coherency Reports/YYYY-MM-DD CD Coherency Report.md` (one per run that produces findings).
- **State**: `Coherency Reports/.state/coherency-state.json` (machine-maintained; do not hand-edit unless resetting the sweep).

## Schedule

`cd-coherency-overnight` — fires nightly inside the 8 PM–3 AM window. Managed via Cowork scheduled tasks; runs only while the Claude desktop app is open (a missed run executes on next launch).

---

_Last Updated_: 2026-06-26
