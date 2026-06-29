---
tags:
  - claude-context
type: Context File
title: CLAUDE-Communicable-Disease-Data-Lake-House
scope: Health Shared Services/Primary Care Alberta/Public Health/Communicable Diseases/Communicable Disease Data Lake House
parent: "[[CLAUDE-Communicable-Diseases]]"
last-updated: 2026-06-29
timestamp: 2026-06-29T00:00:00Z
---
# CLAUDE-Communicable-Disease-Data-Lake-House.md — CD Data Lake House Context

> **Purpose**: Context for the Communicable Disease **Data Lake House** — the analytics and data-governance platform for the CD Solution. This folder holds the data-platform design work: the Atlan glossary taxonomy and its import files, the curated-dimension pipeline specifications, and the data-warehouse design research that underpins the architecture. Program-wide CD facts live in the parent [[CLAUDE-Communicable-Diseases]]; only Data-Lake-House-specific context is captured here.

---

## Scope

Governs `Communicable Diseases/Communicable Disease Data Lake House/`. Sits below [[CLAUDE-Communicable-Diseases]] in the context chain. The Data Lake House is the **analytics and cluster-detection** half of the CD data-ownership split: where [[CLAUDE-OMRA|OMRA]] owns outbreak coordination, line lists, and reporting, and Connect Care is the system of record for individual cases, the Data Lake House provides cross-source analytics, the curated master dimensions, and the `ClusterAlert` cluster detection referenced in the [[OMRA Database ERD]].

## What the Data Lake House Is

A **Snowflake** platform built on a **medallion architecture**, orchestrated with **Coalesce** (ETL pipeline tooling) and governed/catalogued in **Atlan**. The three layers are settled vocabulary — use them rather than re-defining:

- **Bronze** — raw extract-and-load replicas of source tables, one schema per source system, schema mirrors source.
- **Silver** — cleansed, conformed, standardised per-source views (`stg_*`); where source-specific data-quality rules and the Atlan Source System Glossary are applied.
- **Gold** — curated master dimensions and (future) fact tables; cross-source matching, deduplication, and enrichment happen here.

Each Coalesce node is registered as an Atlan data asset with full lineage from source through to the Gold output ports.

## Key Contents

- **Atlan CD Glossary** — [[Communicable Disease Glossary — Category Hierarchy & Design Rationale]] is the design note for the glossary to be stood up in Atlan, with two companion bulk-import CSVs: `Communicable Disease Glossary - Atlan Import.csv` (category tree + concept/definition terms) and `Communicable Disease Glossary - Disease Terms Atlan Import.csv` (the 104 disease terms with per-disease custom-metadata facts).
- **Facility Location Dimension pipeline** — [[Facility Location Dimension Pipeline Specification]] specifies the Gold `dim_facility_location` master dimension built from three source systems. Child of the [[Communicable Disease Conceptual Data Model]] (in `Architecture Models/`).
- **Design research (PDF, read-only)** — `Star vs. Snowflake Data Warehouse Design.pdf` and `Pandemic Multi-dimentional Data Warehouse Design.pdf`. The authored markdown write-ups of this research live in `Communicable Disease Management/Research Papers/`.

## Settled Design Facts

These hold across the Data Lake House work — reference rather than re-litigate:

- **Glossary taxonomy: one home, many lenses.** Seven top-level Atlan categories. Category 1 (Notifiable Diseases & Conditions) holds the **104 disease entities**, sub-grouped by **causative agent type** (the stable primary axis: bacterial, viral, parasitic, fungal, prion, toxin-mediated, plus a *Syndromes & Conditions* catch-all). Categories 2–7 hold the supporting vocabulary (syndrome groups, surveillance/reporting, transmission/epidemiology, public-health management, clinical/laboratory, regulatory/governance). Fluid, multi-valued facets (transmission route, body system, reportability) are **Atlan tags** and **custom metadata**, not extra tree branches. Disease distribution: 42 bacterial, 41 viral, 8 parasitic, 8 syndromes/conditions, 2 fungal, 2 toxin-mediated, 1 prion.
- **Glossary is sourced from the vault evidence base** — the 104 Alberta PH Disease Management Guidelines (`Communicable Disease Management/Disease Guidelines/`) and the reference set (`Communicable Disease Management/Reference Documents/`). Categories mirror language already in the Alberta references (e.g., "Arboviral Infections", "Viral Haemorrhagic Fevers").
- **Atlan import conventions.** CSV rows are either `Category` or `Term`; the `Categories` column expresses depth with `@`; missing categories auto-create on import. The **Tags column is intentionally empty** because Atlan tags must pre-exist. Custom-metadata columns use the `Custom Metadata Name::Attribute` convention under a metadata set named `Communicable Disease`, which must be created in Atlan before those columns import. Pathogen / transmission-route / vaccine-preventable values are first-pass classifications and need SME review.
- **Facility Location Dimension — three sources.** `dim_facility_location` (Gold) conforms facility/department data from **Connect Care (Epic Clarity)** (nightly ETL, already replicated into Snowflake), **ePHIS** (electronic Public Health Inspection System; cadence TBD), and the **Outbreak Application** (near-real-time + write-back). The Outbreak App both **publishes** facility data and **subscribes** to the conformed dimension (Gold → Bronze write-back).

## Working Conventions

- Use the medallion layer names (Bronze / Silver / Gold) and the toolchain names (Snowflake, Coalesce, Atlan) consistently.
- The two design PDFs and the source CSVs are reference/import artifacts — treat the CSVs as generated outputs of the glossary design note; if the taxonomy changes, update the design note and regenerate the CSVs rather than hand-editing them in isolation.
- Open design decisions belong in the cross-folder [[Communicable Disease Open Issues]] register, not in this context file or in individual specs.

---

_Last Updated_: 2026-06-29
_Version_: 1.0 (initial context file for the new Communicable Disease Data Lake House folder, created during the June 2026 CD reorg)
