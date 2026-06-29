---
tags:
  - claude-context
type: Context File
title: CLAUDE-Communicable-Diseases
scope: Health Shared Services/Primary Care Alberta/Public Health/Communicable Diseases
parent: "[[CLAUDE-PCA]]"
last-updated: 2026-06-29
timestamp: 2026-06-29T00:00:00Z
---
# CLAUDE-Communicable-Diseases.md — Communicable Diseases Context

> **Purpose**: Context for the Communicable Disease (CD) body of work under Primary Care Alberta — the largest content area in the Public Health portfolio. This file sits between [[CLAUDE-PCA]] and the topic-level [[CLAUDE-OMRA]], and holds the cross-cutting decisions and structure that span the CD subfolders (working-group artifacts, Connect Care build analysis, the outbreak application, and the reference libraries).

---

## Scope

This file governs everything under `Public Health/Communicable Diseases/`. It is the intermediate node in the context chain: **[[CLAUDE-PCA]] → CLAUDE-Communicable-Diseases → [[CLAUDE-OMRA]]**.

The CD area is the Communicable Disease Solution (CDS) — the program redesigning how Alberta captures, investigates, and reports notifiable communicable diseases across Public Health.

## Cross-Cutting Facts (the settled program context)

These hold across the STI, TB, OMRA, and outbreak work — capture decisions here rather than restating them in each note:

- **CD/OM (CDOM) is being retired.** The legacy Communicable Disease and Outbreak Management (CDOM) application — a Visual Basic application — has its data-stewardship functions carried forward by [[CLAUDE-OMRA|OMRA]]; its case-management role moves to Epic Connect Care.
- **The Outbreak Application Team is the build team for the outbreak work.** They currently manage the legacy Communicable Disease and Outbreak Management (CDOM) Visual Basic application and are responsible for building its successor capabilities — OMRA and the CDC outbreak user stories (Outbreak value stream). New CD outbreak stories carry "Outbreak Application Team" as the Build Team.
- **Epic Connect Care is the system of record for individual CD cases / episodes.** STI Communicable Disease Episodes are now managed in Connect Care, not CD/OM. OMRA owns outbreak coordination, line lists, contact identification, and reporting; the Data Lakehouse provides analytics and cluster detection.
- **STICS (STI Centralized Services)** is the program owner for the STI pathway, and the destination for the provincial Notification of STI form (AH0332).
- **Future-state intake is automated via Blue Prism.** The community physician's Notification of STI form is processed by a Blue Prism automation that, from a single submission, creates the notified patient as a CD Episode in Connect Care, seeds the named partners as Contact Identifications in OMRA, and raises a purchase order for any requested medications in the STI pharmacy inventory application. See [[Community Physician STI Notification User Story]] and [[STI Large Exposure User Story]].
- **Contact investigation is a shared pattern** across TB (source-case driven) and STI (region/outbreak driven), surfaced on the common [[Contact Identification Screen Specifications|Contact Identification Screen]] in OMRA. The goal is to eliminate double-documentation (e.g., STI contacts logged once in the Epic Sexual Contacts flowsheet and again in CD/OM).
- **Four priority CD value streams.** STI, TB, Shiga toxin–producing *E. coli* (STEC), and pertussis are the prioritised value streams for investment and digital redesign. The health-economics evidence base for funding them — avertable burden, cost of inaction, and cost-effectiveness, framed with decision-analytic / cost-utility methods (CEA, CUA, CBA, COI) against a willingness-to-pay threshold — is assembled in [[Health Economics Evidence for CD Value Streams]], with an Alberta/Canada-first lens and inline citations.

## Folder Structure

The area was reorganised (June 2026): **Architecture Models** and the **OMRA** application were promoted out of `Communicable Disease Management/` up to the `Communicable Diseases/` root, a new **Communicable Disease Data Lake House** folder was added, and PDF source libraries (`Disease Guidelines/`, `Guide for Outbreak Prevention and Control/`) now sit at the root alongside their authored markdown counterparts under `Communicable Disease Management/`.

```
Communicable Diseases/
├── Communicable Disease Definitions.xlsx     ← loose CD definitions workbook (root)
├── Communicable Disease Open Issues.md       ← cross-folder open-issues register (root)
├── Architecture Models/                ← ATLAS solution/application context models for the CD ecosystem:
│                                          Conceptual Data Model, Solution Concept Model, Solution
│                                          Architecture, Lambda Architecture (Real-Time Lab Surveillance),
│                                          AOMS Design deck
├── Communicable Disease Data Lake House/  ← Snowflake/Coalesce/Atlan analytics platform. See
│                                             [[CLAUDE-Communicable-Disease-Data-Lake-House]]
├── Outbreak Management Reporting Application (OMRA)/  ← Custom outbreak app. See [[CLAUDE-OMRA]]
├── Connect Care Build Specifications/  ← Epic (Connect Care) build analysis & interface specs
│   ├── Build Specification - TB CD Episode Compass Rose, Compass Rose Tasks Setup guide,
│   │   OMRA↔Connect Care interface specs (Create CD Episode; Open Contact Identification)
│   └── Sexually Transmitted Infections/  ← Epic flowsheet build analysis feeding the CC build
│       ├── Sexual Contacts Flowsheet, STI Workflow Overview
│       └── STI Epic Build Analysis/      ← STI Flowsheet Logical Data Model (DBML), Epic flowsheet
│                                            exports (.xlsx), Family Planning Registry data
├── Disease Guidelines/                 ← PDF source library: ~100 disease guideline PDFs (read-only;
│                                          markdown versions live under CD Mgmt/Disease Guidelines/)
├── Guide for Outbreak Prevention and Control/  ← PDF source library: CDC outbreak guides, checklists,
│                                                  worksheets, Notice-of-Change docs (read-only)
└── Communicable Disease Management/
    ├── Disease Guidelines/             ← ~100 disease-specific PH management guidelines, markdown (reference)
    ├── Outbreak Prevention and Control/← Outbreak management guides by facility type, markdown
    ├── Reference Documents/            ← Public Health Act, reportable disease lists, NDR manual, TB policy
    ├── Research Papers/                ← Data-warehouse design research (star/snowflake schema)
    ├── Health Economics Evidence for CD Value Streams.md
    └── Communicable Disease Working Groups/  ← Per-disease working-group artifacts
        ├── Sexually Transmitted Infections (STI)/  ← STI Intake Form Design Spec, STI Value Stream,
        │                                              Notification Form (AH0332), STI User Stories/
        ├── TB/                                       ← TB User Stories/ (TB Contact List)
        └── CDC/                                      ← Outbreak-management working group. See [[CLAUDE-CDC]]
```

Note the parallel reference libraries: the **markdown** disease guidelines and outbreak guides live under `Communicable Disease Management/`, while the original **PDF** source documents live in the root-level `Disease Guidelines/` and `Guide for Outbreak Prevention and Control/` folders. Both are read-only source material. (The root PDF folder and the `Communicable Disease Management/Disease Guidelines/` markdown folder share a name but sit at different levels.)

## Key Authored Work

- **STI digital intake** — [[STI Intake Form Design Specification]] redesigns the paper Notification of STI form (AH0332) into a native Epic (Connect Care) workflow covering all notifiable STIs under the Alberta *Public Health Act* and *Communicable Diseases Regulation*.
- **STI Epic build analysis** — [[STI Flowsheet Logical Data Model]] models the 6 exported Connect Care STI flowsheets (1,744 fields catalogued) and the NDR reporting bridge.
- **User stories** — [[Community Physician STI Notification User Story]], [[STI Large Exposure User Story]], [[TB Contact List - TB Nurse User Story]]; all feed the shared [[Contact Identification Screen Specifications|Contact Identification Screen]].
- **Connect Care CD Episode design** — [[Build Specification - TB CD Episode Compass Rose (Tasks Targets Automation)]] models the TB episode as a single Epic Compass Rose episode whose Active/Latent path, stage tasks/targets, and just-in-time task generation are driven by tracking status and auto-resolution. The OMRA↔Connect Care round trip is specified in [[Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)]] and [[Interface Specification - Open Contact Identification from CD Abstract (Connect Care to OMRA)]].
- **Health-economics evidence** — [[Health Economics Evidence for CD Value Streams]] assembles the funding/business-case evidence for the four priority CD value streams (see cross-cutting facts above).

## Working Conventions

- Disease Guidelines and the Notification Form are imported source material — do not modify without explicit instruction.
- STI and TB work involves clinical data models and named-contact data — handle terminology precisely and respect healthcare data sensitivity, including the HIV/STI privacy boundary.
- Use **OMRA** (not the legacy AOMS/OMRA names) in new authored content. See [[CLAUDE-OMRA]] for the naming caveat.
- Format CD markdown so it copies into OneNote with no loss of formatting (per [[CLAUDE-HSS]]).

## Open Issues

Open design decisions, data-model gaps, and pending story/note dependencies across the CD sub-folders are tracked in one cross-folder register: [[Communicable Disease Open Issues]]. Context files capture *settled* context; open items belong in the register, not in individual stories, specs, or `CLAUDE-*.md` files.

## Child Context Files

- [[CLAUDE-OMRA]] — Outbreak Management Reporting Application build (data model, screen specifications, RBAC/ABAC access model).
- [[CLAUDE-CDC]] — Communicable Disease Control working group (outbreak-management user stories on the Outbreak value stream; e.g., [[Outbreak Search - Outbreak Investigator User Story]], [[Create Outbreak Investigation - CDC Investigator User Story]]).
- [[CLAUDE-Communicable-Disease-Data-Lake-House]] — CD Data Lake House (Snowflake medallion platform, Coalesce ETL, Atlan glossary taxonomy, the Facility Location master dimension).

---

_Last Updated_: 2026-06-29
_Version_: 1.6 (updated folder map for the June 2026 reorg — Architecture Models and OMRA promoted to the CD root; new Communicable Disease Data Lake House folder with its own [[CLAUDE-Communicable-Disease-Data-Lake-House]] context file; root-level PDF source library Disease Guidelines/ (typo corrected from "Guildelines") and Guide for Outbreak Prevention and Control/; Connect Care CD Episode build specs consolidated into the root Connect Care Build Specifications/; loose root files Definitions.xlsx and Open Issues.md)
