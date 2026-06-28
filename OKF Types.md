---
type: Reference
title: OKF Type Vocabulary
description: Controlled vocabulary of allowed `type` frontmatter values for this vault, derived from existing usage.
tags:
  - okf
  - controlled-vocabulary
  - reference
scope: (vault-wide)
parent: "[[OKF SPEC]]"
last-updated: 2026-06-28
timestamp: 2026-06-28T00:00:00Z
---

# OKF Type Vocabulary

> **Purpose**: The canonical, controlled list of allowed values for the OKF `type` frontmatter field across this vault. The [[OKF SPEC]] requires every content note to carry a non-empty `type`. This file constrains *which* values are valid, so the set stays queryable (Dataview/Datacore) and doesn't fragment into near-duplicates.

## How to use this file

When creating or editing a note, set `type` to one of the canonical values below. Match the spelling and capitalisation exactly — `type` values are **Title Case with spaces** (e.g. `Strategic Plan`, not `strategic-plan` or `strategic plan`). If no existing type fits, do not invent a silent variant: add a new canonical entry to this file (proposed for Alec's review per the Context Update Protocol) and *then* use it.

**`type` is deliberately kept coarse.** Standards practice (Dublin Core, TOGAF, ArchiMate) separates *what kind of thing a note is* from its *status, domain, and architectural placement*. Rather than minting an ever-growing flat list of `type` values, express that richness through the optional **[Facets](#facets-cross-cutting)** below. This keeps the vocabulary small and the Dataview/Datacore queries powerful (e.g. "all approved Application-layer artifacts in the HSS domain"). For enterprise-architecture material in particular, prefer the faceted pattern described under [Enterprise Architecture](#enterprise-architecture--models--assessments) over adding new EA-specific `type` values.

This vocabulary was seeded from the 29 distinct `type` values already present in the vault as of 2026-06-28. Where existing files used inconsistent spellings, the canonical form is listed here and the variants are flagged under [Normalizations](#normalizations-pending) for cleanup.

---

## Facets (cross-cutting)

Facets are **optional frontmatter fields** that qualify a note without multiplying `type` values. They are drawn from recognised standards so the vault stays interoperable and queryable. Add only the facets that are meaningful for a given note. All facet values are **Title Case** unless noted.

### `status` — lifecycle state

A note's maturity. Useful for filtering drafts out of "approved" views.

| Value | Meaning |
|---|---|
| `Draft` | In progress, not yet reviewed. |
| `In Review` | Under review. |
| `Approved` | Reviewed and accepted. |
| `Superseded` | Replaced by a newer note (link the successor). |
| `Archived` | Retained for reference, no longer active. |

### `domain` — life/work area

Which vault domain the note belongs to. Mirrors the top-level folder structure and the CLAUDE memory hierarchy.

`Stealth EA` · `Stealth EA LLC` · `Health Shared Services` · `Revv52` · `Personal` · `Research`

### `ea-layer` — ArchiMate layer

For architecture notes, the [ArchiMate 3.2](https://pubs.opengroup.org/architecture/archimate3-doc/) layer the content addresses. Lets you filter artifacts by architectural altitude.

`Motivation` · `Strategy` · `Business` · `Application` · `Technology` · `Physical` · `Implementation & Migration`

### `artifact-class` — TOGAF artifact form

For architecture artifacts, the [TOGAF](https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap30.html) classification of the artifact's form.

| Value | Meaning |
|---|---|
| `Catalog` | A list of building blocks (e.g. an application catalog). |
| `Matrix` | A grid showing relationships between building blocks. |
| `Diagram` | A graphical view of building blocks and their relationships. |

### `adm-phase` — TOGAF ADM phase *(optional)*

Where the artifact originates in the Architecture Development Method: `A` (Vision), `B` (Business), `C` (Information Systems — Data/Application), `D` (Technology), `E` (Opportunities & Solutions), `F` (Migration Planning), `G` (Implementation Governance), `H` (Change Management).

### `data-layer` — data model abstraction *(optional)*

For data models, the [ANSI/SPARC three-schema](https://en.wikipedia.org/wiki/Three-schema_approach) level: `Conceptual` · `Logical` · `Physical`. Prefer this facet over separate `Data Model` / `Logical Data Model` type values.

---

## Memory & System

| Type | Use for |
|---|---|
| `Context File` | `CLAUDE-*.md` files in the distributed memory system. |
| `Skill` | Reusable prompt-driven workflow definitions in `Anthropic Skills/`. |
| `Reference` | Standards, vocabularies, and governance docs (including this file). |

## Enterprise Architecture — Models & Assessments

> **Faceted pattern (preferred for new EA work).** Rather than adding a new `type` for every architectural artifact, use the generic `type: Architecture Artifact` and qualify it with the [Facets](#facets-cross-cutting): `artifact-class` (TOGAF Catalog/Matrix/Diagram), `ea-layer` (ArchiMate), and optionally `adm-phase`. For example, an application inventory becomes `type: Architecture Artifact`, `artifact-class: Catalog`, `ea-layer: Application` — which then answers queries like "all Application-layer catalogs" without a bespoke type. The specific values below are retained for continuity and for notes that are genuinely a distinct *kind* rather than a TOGAF artifact form.

| Type | Use for |
|---|---|
| `Architecture Artifact` | Generic TOGAF artifact; qualify with `artifact-class` + `ea-layer` facets. Preferred for new artifacts. |
| `Architecture Assessment` | Evaluation of a current/target state against criteria. |
| `Architecture Concept` | Early-stage conceptual architecture framing. |
| `Architecture Background` | Context/background note supporting an architecture effort. |
| `Architecture Decision Record` | A captured architecture decision with context, options, decision, and rationale. Aligns to the industry-standard ADR and the [ISO/IEC/IEEE 42010](http://www.iso-architecture.org/42010/templates/42010-ad-template.pdf) decision items. Use `status` to distinguish a proposed decision (`Draft`/`In Review`) from an accepted one (`Approved`). |
| `Solution Concept Model` | Solution-level conceptual model. |
| `Application Context Model` | Application-scoped context model. |
| `Value Stream` | Value stream definition or mapping. |
| `Coherency Report` | Cross-deliverable coherency / consistency analysis. |
| `Logical Data Model` | Logical-level data model. |
| `Data Model` | Data model where the layer (conceptual/logical/physical) is unspecified. Prefer `Logical Data Model` when the layer is known. |

## Specifications

| Type | Use for |
|---|---|
| `Screen Specification` | Wireframe-to-build screen specs (OMRA/HSS application screens). |
| `Build Specification` | Build-oriented specification handed to delivery. |
| `Interface Specification` | Interface / integration specification. |
| `Design Specification` | Detailed design specification. |
| `Design Note` | Lighter-weight design note (not a full spec). |

## Agile & Backlog

| Type | Use for |
|---|---|
| `User Story` | Backlog user stories (HSS standard, two-tier acceptance criteria). |
| `Issue Register` | Running register of issues/risks. |
| `Checklist` | Reusable or task-specific checklists. |

## Business & Planning

| Type | Use for |
|---|---|
| `Strategic Plan` | Strategy documents (Revv52, Stealth EA, etc.). |
| `Marketing Plan` | Marketing strategy / campaign planning docs. |
| `Proposal` | Client or internal proposals. |
| `Budget` | Budget and financial planning sheets. |

## Content & Thought Leadership

| Type | Use for |
|---|---|
| `Blog Draft` | Stealth EA blog/article drafts. |
| `Methodology` | Stealth EA methodology documents. |
| `Research Clipping` | Web Clipper output and curated external research. |

---

## Normalizations (pending)

Existing files use these non-canonical spellings. They should be migrated to the canonical form (candidates for a future backfill / Linter rule):

| Found in vault | → Canonical |
|---|---|
| `reference` | `Reference` |
| `strategic-plan` | `Strategic Plan` |
| `marketing-plan` | `Marketing Plan` |
| `proposal` | `Proposal` |
| `budget` | `Budget` |
| `Architecture Decision Request` | `Architecture Decision Record` (align to ADR standard; `status` carries proposed vs. accepted) |
| `Data Model` | `Logical Data Model` (or keep `Data Model` + set the `data-layer` facet) |

## Spec-referenced types not yet in use

The [[OKF SPEC]] and root `CLAUDE.md` name these types for content that exists in the vault but is not yet frontmattered (notably `Daily Reflections/` and `Meetings/`). Adopt these canonical forms when backfilling those areas:

| Type | Use for |
|---|---|
| `Journal Entry` | Daily reflection / gratitude entries in `Daily Reflections/`. |
| `Meeting Note` | Meeting notes and transcriptions in `Meetings/` and `Personal Note/`. |

`Architecture Deliverable` appears in the spec as a generic umbrella. Prefer a specific type from the Enterprise Architecture sections above; use the umbrella only when no specific type fits.

---

## Standards alignment

This vocabulary borrows from established standards so the vault stays interoperable and the design decisions are traceable:

- **[Dublin Core (DCMI Metadata Terms)](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/)** — the records-metadata baseline. Existing OKF fields map onto it: `title`→`dcterms:title`, `description`→`dcterms:description`, `tags`→`dcterms:subject`, `timestamp`→`dcterms:modified`. DCMI's guidance to keep `type` a small controlled vocabulary is the basis for the faceted approach here.
- **[TOGAF Content Framework](https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap30.html)** — source of the `artifact-class` (Catalog/Matrix/Diagram) and `adm-phase` facets, and the Deliverable/Artifact/Building Block distinction.
- **[ArchiMate 3.2](https://pubs.opengroup.org/architecture/archimate3-doc/)** — source of the `ea-layer` facet values.
- **[ADR / ISO/IEC/IEEE 42010](http://www.iso-architecture.org/42010/templates/42010-ad-template.pdf)** — source of the `Architecture Decision Record` type and its expected content (context, options, decision, rationale, consequences).
- **[ANSI/SPARC three-schema](https://en.wikipedia.org/wiki/Three-schema_approach)** — source of the `data-layer` facet.

When backfilling the `Health Shared Services/` records at scale, the relevant records-management standards are **ISO 15489** (records management) and **ISO 23081** (records metadata); for clinical *subject* tagging (distinct from `type`), HL7 FHIR resource names and SNOMED CT are the controlled vocabularies to draw on.

---

_Last Updated_: 2026-06-28
_Maintained By_: Alec Blair
_Seeded from_: 29 distinct `type` values in vault use as of 2026-06-28
