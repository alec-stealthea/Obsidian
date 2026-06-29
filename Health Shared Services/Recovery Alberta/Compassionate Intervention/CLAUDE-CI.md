---
tags:
  - claude-context
type: Context File
title: CLAUDE-CI
description: Context for the Compassionate Intervention Release of Information (CI RoI) architecture work — Alberta's response to Bill 53, integrating CIP, Epic Connect Care, Netcare, and data platforms.
scope: Health Shared Services/Recovery Alberta/Compassionate Intervention
parent: "[[CLAUDE-HSS-RA]]"
last-updated: 2026-06-29
timestamp: 2026-06-29T00:00:00Z
---
# CLAUDE-CI.md — Compassionate Intervention Context

> **Purpose**: Context for the `Compassionate Intervention/` working folder — the enterprise architecture deliverables supporting the CI Release of Information (CI RoI) solution. This is day-job work under the Recovery Alberta / IT Community Portfolio portfolio.

---

## Scope

This file governs `Health Shared Services/Recovery Alberta/Compassionate Intervention/` and reports to [[CLAUDE-HSS-RA]]. It has no child context files.

## Program Context

**Alberta Compassionate Intervention Act (Bill 53)** received royal assent May 15, 2025. It establishes a legal framework for stabilisation, assessment, and treatment of individuals whose severe substance use or addiction is likely to cause substantial harm to themselves or others. Two 150-bed Compassionate Intervention Centres are planned (Edmonton and Calgary). The Compassionate Intervention Commission makes legally binding treatment decisions.

The **CI Release of Information (CI RoI)** initiative is the first technical integration step: when a CI request is received by the Compassionate Intervention Program (CIP), the system must assemble a patient health information summary from Connect Care and other sources to support rapid, evidence-based decision-making.

## Solution Architecture

**Integration flow:**

```
CIP (AWS-hosted CMI app)
  → External Akana API Gateway (PHIE)
  → IBM ACE / RIE (IBM Integration Engine)
  → Internal Akana Gateway (PHIE)
  → Epic ROI Web Service (HIM / Connect Care)
  → Epic Bridges (outbound clinical data)
  → Snowflake Data Platform (supplementary data)
```

**Authentication:** Mutual TLS (mTLS). The GT server DigiCert cert (reused from the MPR/MHAA project) is the current outbound cert; a self-signed cert is a fallback if PKI infrastructure changes. CIP is hosted in AWS and uses an AWS Private CA-signed cert on their side.

**Request pattern:** Asynchronous — CIP submits the ROI request and receives a `202 Accepted` with a Request ID immediately. The actual release record is created in Epic HIM via `CreateRelease2` SOAP, and results are returned out-of-band.

**Facility/Requester IDs:** Design is TBD (HIM and privacy group must weigh in). For the POC, dummy values are acceptable.

**Disclosure record creation** is out of POC scope; it will be added once end-to-end connectivity is confirmed.

## Teams and Key Contacts

| Role | Team | Notes |
|---|---|---|
| Architecture lead | Alec Blair (HSS) | Owns solution concept, sequence diagrams, integration specs |
| PHIE / Akana | George | Sends PHIE certificate documentation; escalates firewall changes |
| Connectivity / mTLS | Eric | mTLS guide and key setup |
| CIP (vendor side) | Sasha | AWS-hosted CMI app; external integration partner |
| Project coordination | Headley | Delivery dates and team communications |

## Folder Contents

- [[Compassionate Intervention Solution Concept Model]] — full architectural narrative; primary reference document
- [[Compassionate Intervention Release of Information Data Model]] — data model for the CI RoI solution
- [[CI RoI Proposed Sequence Diagram]] — master sequence diagram for the end-to-end flow
- [[CI RoI Sequence - All Engines Automated vs Human]] — error-path and human-review branching
- [[CI RoI Sequence - CIP to Akana API Gateway]] — CIP → external PHIE leg
- [[CI RoI Sequence - CIP to IBM Integration Engine]] — Akana → RIE leg
- [[CI RoI IBM Integration Engine Message Specification]] — RIE message contracts
- [[CI RoI IBM Integration Engine Message Specification (OneNote)]] — OneNote-exported version
- [[CI RoI Snowflake SQL API Configuration]] — Snowflake data platform integration
- [[CI RoI Object View Structure]] — data object/view design
- [[CI RoI Sample JSON Responses]] — example JSON for integration testing
- `Team Specifications/` — per-team interface specs indexed by [[CI RoI Step Ownership Matrix]]
- `Sample JSON Responses/` — named test-patient JSON payloads for POC
- `Meeting Notes/` — working-group notes (e.g., June 10, 2026 handshake discussion)

## Working Conventions

- Day-job work — keep separate from Stealth EA intellectual property.
- The Step Ownership Matrix is the index for cross-team coordination; update it when new integration steps are added.
- Sample JSON payloads in `Sample JSON Responses/` contain synthetic test data — do not treat as real patient records.
- mTLS certificate decisions should be confirmed with the PKI/security team before each implementation milestone.
- Follow [[CLAUDE-HSS]] conventions for HSS deliverables (Canadian English, Mermaid diagrams, OKF frontmatter).

---

_Last Updated_: 2026-06-29
_Version_: 1.0
