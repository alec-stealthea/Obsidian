---
tags:
  - claude-context
type: Context File
scope: Health Shared Services/Primary Care Alberta
parent: "[[CLAUDE-HSS]]"
last-updated: 2026-06-25
---
# CLAUDE-PCA.md — Primary Care Alberta Context

> **Purpose**: Context for architecture work under Primary Care Alberta (PCA), a new agency within Alberta responsible for primary care, public health, and community diagnostic services.

---

## Scope

PCA's IT architecture footprint within Alec's portfolio centres on three major areas under Public Health:

### Communicable Disease Management

The largest content area in this folder. Located at `Public Health/Communicable Diseases/Communicable Disease Management/` and containing:

- **Architecture Models/** — Solution concept models and application context models (ATLAS views) for the CD ecosystem, including Data Lakehouse, Episode Connect Care, Outbreak Application, and the overarching CD Solution Concept Model.
- **Disease Guidelines/** — Extensive reference library of ~100 disease-specific public health management guidelines (from Acute Flaccid Paralysis through Zika Virus). These are source reference material, not Alec's authored content.
- **Outbreak Prevention and Control/** — Guides for outbreak management across facility types (acute care, child care, continuing care, correctional centres, schools, shelters, supportive living). Includes checklists and antiviral worksheets.
- **Reference Documents/** — Regulatory and procedural references: Public Health Act, reportable disease lists, NDR manual, TB policy, risk assessment tools, surveillance tracking.
- **Research Papers/** — Data warehouse design research (star schema, snowflake schema) relevant to the CD data architecture.
- **Communicable Disease Working Groups/** — Per-disease working-group artifacts. The **STI** subfolder holds the [[STI Intake Form Design Specification]] (digital redesign of the paper Notification of STI form AH0332), the STI Value Stream, and STI User Stories; the **TB** subfolder holds TB User Stories. These feed the shared contact-identification work in OMRA.
- **Outbreak Management Reporting Application (OMRA)/** — Custom application coordinating outbreak investigations, facility line lists, and aggregate/AORF reporting; replaces REDCap and carries forward the legacy CD/OM (CDOM) data-stewardship functions. Holds the data model, the prototype wireframe deck, and the per-screen build specifications. **Naming caveat**: earlier artifacts carry older names (AOMS, OMRA) — treat AOMS, OMRA and OMRA as the same system and use **OMRA** in new content. See [[CLAUDE-OMRA]].

A sibling folder, **Connect Care Build Specifications/**, sits alongside Communicable Disease Management under `Communicable Diseases/`. Its **Sexually Transmitted Infections/** subfolder holds the Epic (Connect Care) STI flowsheet build analysis — the [[STI Flowsheet Logical Data Model]] (6 exported flowsheets, 1,744 fields), Sexual Contacts flowsheet, STI Workflow Overview, and the supporting Epic exports.

The whole Communicable Disease area now carries its own context file — see [[CLAUDE-Communicable-Diseases]] for the cross-cutting program facts (CD/OM retirement, Connect Care as episode system of record, STICS, the Blue Prism intake automation) and the full folder map.

### Screening

Located at `Public Health/Screening/Breast Cancer Screening AI Initiative/`. Architecture, UAT, and AI-results work for mammography screening — the folder has grown enough to carry its own context file. See [[CLAUDE-Breast-Cancer-Screening]].

### Provincial Vaccine Depot

Located at `Public Health/Provincial Vaccine Depot/`. Enterprise architecture assessment of **Epic Willow Inventory** as the provincial vaccine depot inventory/VIMS solution — gap analysis against the Alberta instance, RFP requirements, vendor market scan, SBAR, and an application context narrative with supporting ArchiMate model. See [[CLAUDE-PCA-PH-Vaccine-Depot]].

### Honouring Life

Located at `Honouring Life/`. EA review of the **Honouring Life Grant** program's proposed Microsoft Power Platform (Dataverse / Power Apps / Power BI) solution, replacing an Excel tracker for 40+ Indigenous community grant contracts. A program-team / citizen-developer effort under Alec's assessment. See [[CLAUDE-Honouring-Life]].

## Working Conventions

- Disease Guidelines are reference material imported from Alberta Health sources — do not modify without explicit instruction.
- Architecture Models use the ATLAS naming convention (e.g., "CD Solution Concept Model (ATLAS)").
- The STI and screening work involves clinical data models — handle terminology precisely and respect healthcare data sensitivity.

## Child Context Files

- [[CLAUDE-Communicable-Diseases]] — Communicable Disease area (cross-cutting program facts, CD tree structure); parent of [[CLAUDE-OMRA]].
- [[CLAUDE-Breast-Cancer-Screening]] — Breast Cancer Screening AI Initiative (mammography key fields, UAT, AI discrete results, LLM scripts, HL7 samples).
- [[CLAUDE-PCA-PH-Vaccine-Depot]] — Provincial Vaccine Depot Epic Willow inventory/VIMS assessment.
- [[CLAUDE-Honouring-Life]] — Honouring Life Grant program Power Platform (Dataverse) solution assessment.

---

_Last Updated_: 2026-06-25
_Version_: 2.4