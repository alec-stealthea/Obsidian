---
tags:
  - claude-context
type: Context File
title: CLAUDE-OMRS
scope: Health Shared Services/Primary Care Alberta/Public Health/Communicable Diseases/Communicable Disease Management/Outbreak Management Reporting System (OMRS)
parent: "[[CLAUDE-Communicable-Diseases]]"
last-updated: 2026-06-26
timestamp: 2026-06-26T00:00:00Z
---
# CLAUDE-OMRS.md — Outbreak Management Reporting System Context

> **Purpose**: Context for the design-and-build work on OMRS, the custom Outbreak Management Reporting System for the Communicable Disease Solution. This folder holds the data model, the prototype wireframe deck, and the per-screen build specifications.

---

## What OMRS Is

OMRS is a **custom-built application** that coordinates outbreak investigations, facility line lists, and aggregate/AORF reporting for Alberta's communicable disease program. It **replaces REDCap** (line list and aggregate reporting) and carries forward the data-stewardship functions of the legacy **CD/OM (CDOM)** application.

**Naming caveat**: the application is now named **OMRS** (Outbreak Management Reporting System). Earlier artifacts still carry older names — the prototype deck filename reads *OMRA* (Outbreak Management Reporting Application) and some slide/screen titles read *AOMS* (Alberta Outbreak Management System / Solution). Treat AOMS, OMRA and OMRS as the same system; use **OMRS** in all new authored content.

**Lifecycle stage**: as of March 2026 the work is moving from **Design to Build** (deck slides 2 and 19). The wireframes are deliberately "just enough design" to start iterative build, not final UX.

## Data Ownership Boundaries (from the ERD)

These decisions are settled in [[OMRS Database ERD]] and govern any design discussion:

- **Epic / Connect Care is the system of record for individual cases.** OMRS manages outbreak coordination, line lists, and reporting; the **Data Lakehouse** provides analytics and cluster detection (`ClusterAlert`).
- One outbreak is recorded **per facility**, linked across sites via `clusterOutbreak` (the term *parentOutbreak* was retired).
- **Client Registry (EMPI)** is used for PHN/ULI validation with full transaction tracking.
- `OutbreakID` is expected to eventually serve as the **EI (Exposure Incident) number** (deferred decision).

## Screen Specification Format

Every screen spec in `OMRS Screen Specifications/` follows a common structure — match it when authoring new ones. The worked reference is [[Create Outbreak Investigation Screen Specifications]]:

1. **Design Specification Context** — links to the source user stories and related screens.
2. **Wireframe** — link to the deck slide plus a description of the layout.
3. **Acceptance Criteria Specifications** — seven numbered sections: Scenario Conditions, Functional Behaviour, User Experience Considerations, Data Inputs and Outputs, Business Rules and Validation, Exception Handling, Business Semantics.
4. **Field-mapping table** — columns: *Screen Field · Data Type · Database Field · Data Standard · Default Value · Mandatory? · Comments*. Map every field to an [[OMRS Database ERD]] table/column; flag gaps inline rather than inventing fields.
5. **Technical Implementation Notes** — Access, Security, Performance.
6. **Version History** — Last Update (author/date/comments), Jira link, Specifications Status, Linked SBARs, Linked Enabling Stories.

## Access Model

OMRS uses a **two-layer access model**: one **functional role** per user (RBAC — the verbs) plus **scoping attributes** (ABAC — team, zone, disease group, professional designation). The six functional roles and the attribute dimensions are fully specified in [[User Maintenance Screen Specifications]] — reference it rather than restating. Key rule for spec work: **dictionary/dimension maintenance** (Disease, Location/Facility, Organism, Vaccine, Diagnostic Test) is restricted to the **Business System Manager** role and is distinct from an investigator's in-case **provisional add**. `CDOM User Roles.pdf` is the current-state reference the model maps from.

## Disease Reference Model (resolved in ERD v2.1)

Four gaps surfaced while writing [[Communicable Disease Maintenance Screen Specifications]] are now closed in [[OMRS Database ERD]] v2.1 — use these tables/fields rather than re-proposing them:

- **Associated Vaccine** → `Vaccine` + `DiseaseVaccine` (codes align to the Provincial Vaccine Depot / Connect Care Willow catalogue). `InfectiousDisease.vaccinePreventable` remains only as a quick flag.
- **Lab Procedures** → `DiagnosticTest` + `DiseaseTest` (LOINC/provincial codes; `organismID` for organism-specific tests).
- **Episode Conditions** (Confirmed/Probable) → `DiseaseCaseDefinitionRule`, tiered by `caseClassificationID`, with rule name, condition, AND/OR logic, sequence, effective dating, and comments. Supersedes free-text `OutbreakDefinition.caseDefinitionText`.
- **Setting-specific thresholds** → `OutbreakDefinition` fields `minConfirmedCaseCount`, `minProbableCaseCount`, `absenteeismThresholdPct`, `closureCriteriaText` (school-absenteeism %, congregate-care counts, etc.), scoped per disease + setting + type.

## Contact Identification (resolved in ERD v2.3–v2.4)

The gap surfaced while writing [[Contact Identification Screen Specifications]] — no standalone, promotable contact entity — is now closed in [[OMRS Database ERD]] v2.3 (Section 15), with lineage and lifecycle added in v2.4. Use these tables rather than re-proposing them:

- **Contact record** → `ContactIdentification`, keyed to `Outbreak.outbreakID` and/or the source case (`EpicAbstract`). Holds the Platinum demographics, exposure context (`exposureFacilityID` / `exposureRoomID`, `flightNumber`, `breakInContactDate`), the `investigationStatus` and `recordStatus` enums, the `registryValidated` flag, and the returned `epicEpisodeID`. Distinct from `LineListPerson` (facility line list) and `ContactAttempt` (attempt history). HIV/STI contact records inherit the `DiseaseGroup` privacy boundary (Section 14).
- **Guardian (minors)** → `ContactGuardian` (child of `ContactIdentification`).
- **Disease-specific contact questions** → `DiseaseContactQuestion` + `ContactDiseaseQuestionResponse` (e.g., HIV shared needle Y/N), keyed by disease.
- **Ethnicity** → new `Ethnicity` reference list.
- `ContactAttempt` gains an optional `contactIdentificationID` so attempt history can attach to a contact. The screen is source-case-driven for TB ([[TB Contact List - TB Nurse User Story]]) and region/outbreak-driven for STI ([[STI Large Exposure User Story]]).
- **Lineage & lifecycle (v2.4)** → a contact may become its own outbreak (`ContactIdentification.escalatedToOutbreakID`; `Outbreak.originatingContactID` for the reverse) or link into a cluster (`Outbreak.clusterOutbreak`). `ContactOutbreakLink` is the many-to-many that **preserves the original outbreak identifiers** across contacts, outbreaks, merges and clusters. `ContactInvestigationLifecycle` records the contact's status transitions and carries the `EpicAbstract` (Communicable Disease Abstract) link once a CD episode is created.

## Prototype Design Changes (resolved in ERD v2.5)

Two prototype design modifications were imported back into the screen specs on June 25, 2026 and are now reflected in [[OMRS Database ERD]] v2.5 — use these rather than re-proposing them:

- **Disease "Add Disease" quick-add** → `InfectiousDisease.isProvisional`. The [[Communicable Disease Maintenance Screen Specifications]] quick-add (Disease Name + Reporting Timeline only) writes an **Active** record so it is immediately selectable in lookups, flagged `isProvisional = true` until a steward completes it. The dictionary-steward equivalent of an investigator's provisional add.
- **Contact "Export List"** → `DisclosureExportLog` (Section 12). The [[Contact Identification Screen Specifications]] CSV/Excel export discloses PHI, so each export is audited (who/when/scope/row count/disease group/format/purpose, plus `privacyBoundaryCrossed` for HIV/STI). `AuditLog` was left mutation-only (INSERT/UPDATE/DELETE); disclosure/read events live in `DisclosureExportLog`.

The [[Create Outbreak Investigation Screen Specifications]] was also brought up to the standard screen-spec format (June 25). Its field remap surfaced **open `Outbreak` ERD gaps not yet resolved** — no direct `infectiousDiseaseID` (Disease), `outbreakSettingID` (Setting), `zoneID`/region columns, or department linkage on `Outbreak` — flagged inline in that spec for a future ERD revision rather than auto-added.

## Folder Structure

```
Outbreak Management Reporting System (OMRS)/
├── Alberta Outbreak Management Reporting Application (OMRA) Design.pptx  ← 21-slide prototype deck (wireframes + closing SBAR)
├── OMRS Database ERD.md                ← v2.5 DBML-style ERD (the authoritative data model)
├── SBAR - Contact CD Episode Creation and Outbreak-Cluster Association.md  ← decision request (episode-per-contact; episode↔cluster association)
├── CDOM User Roles.pdf                 ← current-state CD/OM role reference
└── OMRS Screen Specifications/
    ├── Create Outbreak Investigation Screen Specifications.md   ← format reference
    ├── Communicable Disease Maintenance Screen Specifications.md
    ├── Communicable Disease Search Screen Specifications.md     ← search-and-triage entry point (outbreak search first build)
    ├── Contact Identification Screen Specifications.md          ← TB/STI/CDC/SHE contact list (ERD Section 15)
    └── User Maintenance Screen Specifications.md               ← RBAC/ABAC access specification (canonical access-model reference)
```

The deck's wireframe slides each correspond (or will correspond) to a screen spec: User Maintenance (s6), Location/Facility Maintenance (s7), Disease Maintenance (s8), Create Outbreak (s11), Investigation Details (s12), Case Load (s13), Tasks (s14), Questionnaires (s15–17), Case Counts (s18).

## Search Screen (Confirm stage)

The [[Communicable Disease Search Screen Specifications]] is the program's **search-and-triage entry point**, sitting at the **Confirm** stage of the Outbreak Value Stream (*Exposure Trace → Confirm → Open → Manage → Close*) and acting as the natural predecessor to [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]]. It is deliberately named the *Communicable Disease Search* screen so it can grow into a single search surface, but its **first build is outbreak search**, driven by the [[Outbreak Search - Outbreak Investigator User Story]] (O-C-3, governed by [[CLAUDE-CDC]]). Contact Identification search (over `ContactIdentification`, ERD Section 15) and CD-episode search are in scope for the screen's *design* but staged behind outbreak search for build, and carried as open questions in that spec. Search/filter by Disease, Setting and Region depends on the still-open `Outbreak` ERD gaps (`infectiousDiseaseID`, `outbreakSettingID`, `zoneID`/region) flagged above.

---

_Last Updated_: 2026-06-26
_Version_: 1.8 (added the Communicable Disease Search screen — search-and-triage Confirm-stage entry point, outbreak-search first build per O-C-3 — to the folder map and a new Search Screen section)
