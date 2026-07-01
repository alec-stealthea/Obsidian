---
tags:
  - claude-context
type: Context File
scope: Health Shared Services
parent: "[[CLAUDE]]"
last-updated: 2026-06-24
---
# CLAUDE-HSS.md — Health Shared Services Context

> **Purpose**: Context for Alec Blair's enterprise architecture work within the IT Community Portfolio at Alberta Health. This folder contains architecture deliverables, solution models, meeting notes, and reference material for several business areas.

---

## Role

Alec is the Enterprise Architect for the IT Community Portfolio. The portfolio covers these business areas:

- **Continuing Care** — under the Assisted Living Alberta organisation. Current work includes a Vacancy and Waitlist Management (VWM) system.
- **Emergency Health Services**
- **Population and Public Health** — reports into Primary Care Alberta. Includes communicable disease management, screening programmes, and outbreak prevention.
- **Addiction and Mental Health** — reports into Recovery Alberta.

## Key Deliverables

- [[Solution Context Model]]
- [[Value Stream Model]]
- [[Architecture Decision (using SBAR)]]

## Folder Structure

```
Health Shared Services/
├── ATLAS/                          ← Solution architecture models (Placement, Compassionate Intervention, Communicable Disease)
├── Assisted Living Alberta/        ← Continuing Care work
│   └── Vacancy and Waitlist Management/  ← VWM project meeting notes
├── Community Care IT Services/     ← Team + GitLab/AI requirements-authoring pilot. See CLAUDE-CCS.md
├── Emergency Health Services/      ← EHS solution work (Mobile Integrated Health: Epic ↔ Logis appointment sync). See CLAUDE-EHS.md
├── Finance/                        ← Workload and activity reporting, CIHI Statistical G/L, finance collaboration. See CLAUDE-HSS-Finance.md
├── Primary Care Alberta/           ← See CLAUDE-PCA.md
│   └── Public Health/
│       ├── Communicable Diseases/   ← Extensive: Disease Guidelines, Outbreak Prevention, Architecture Models, Reference Documents, Research Papers
│       ├── Provincial Vaccine Depot/  ← Epic Willow / VIMS assessment. See CLAUDE-PCA-PH-Vaccine-Depot.md
│       └── Screening/              ← Breast Cancer mammography screening
├── Recovery Alberta/               ← Addiction & Mental Health (Compassionate Intervention ROI, VWM Supported Living). See CLAUDE-HSS-RA.md
│   ├── Compassionate Intervention/  ← Release of Information data model
│   └── VWM Supported Living/
├── Technology and Innovation/      ← Experimental dev capability (Pronghorn AI pipeline pilot). See CLAUDE-Technology-and-Innovation.md
└── [Root-level notes]              ← Outbreak Application ERD, Contracted Vendor Portal SBAR
```

## Epic / Connect Care Platform Context

These facts apply to any build-vs-buy or alternatives analysis touching Epic:

- Alberta has already licensed essentially the entire Epic product line, excluding US-specific modules. New Epic capability is therefore an internal configuration/enhancement effort, not a new software procurement.
- Epic does not respond to Alberta RFPs. Its role is product support: backing the existing internal HSS teams who configure and enhance the platform. Any "Epic alternative" in an assessment is a **build** (internal HSS delivery) rather than a **buy** (vendor bid), and delivery accountability rests with HSS, not Epic.
- Connect Care is HSS-hosted in Alberta data centres, so Canadian data residency requirements are met by default for Epic-based solutions.
- The Connect Care Willow vaccine inventory build is already configured for Canadian vaccines — product master, lot/expiry, and wastage/cold-chain reason codes reflect the Canadian vaccine catalogue, an advantage over US-centric vendor products that would need this localisation.

## Child Context Files

- [[CLAUDE-PCA]] — Primary Care Alberta (Public Health, Communicable Disease Management, Screening)
- [[CLAUDE-EHS]] — Emergency Health Services (Mobile Integrated Health, Epic ↔ Logis appointment sync via the RIE/TransferSchedulingBroker)
- [[CLAUDE-HSS-Finance]] — Workload and activity reporting, CIHI Statistical G/L analysis, finance collaboration
- [[CLAUDE-CCS]] — Community Care IT Services (team, GitLab/AI requirements-authoring pilot)
- [[CLAUDE-Technology-and-Innovation]] — Experimental development capability assessment (Pronghorn AI-assisted pipeline)
- [[CLAUDE-HSS-RA]] — Recovery Alberta (Compassionate Intervention ROI, VWM Supported Living)

## Working Conventions

- Content in this folder is day-job work — do not mix with Stealth EA intellectual property.
- Architecture models in `ATLAS/` are solution-level views (not the same as the case studies in Stealth EA).
- Meeting notes in `Assisted Living Alberta/Vacancy and Waitlist Management/` follow standard meeting note format.
- The `Communicable Disease/` folder at root level contains older/legacy content; the more structured and current communicable disease material lives under `Primary Care Alberta/Public Health/Communicable Diseases/`.
- Disease Guidelines under PCA are reference documents — treat as read-only source material, not Alec's authored content.
- Always format the markdown files for HSS content so that they can be copied into OneNote with no loss of formatting.

---

_Last Updated_: 2026-06-24
_Version_: 2.6