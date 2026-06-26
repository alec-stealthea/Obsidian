---
tags:
  - claude-context
type: Context File
title: CLAUDE-Honouring-Life
scope: Health Shared Services/Primary Care Alberta/Honouring Life
parent: "[[CLAUDE-PCA]]"
last-updated: 2026-06-25
timestamp: 2026-06-25T00:00:00Z
---
# CLAUDE-Honouring-Life.md — Honouring Life Grant Program

> **Purpose**: Context for architecture work on the Honouring Life Grant (HLG) program's data-management redesign — a Microsoft Power Platform (Dataverse / Power Apps / Power BI) solution proposed by the program team and under EA review by Alec.

---

## What this folder is

The **Honouring Life** team sits within the **Indigenous Wellness Core**. The HLG program manages 40+ active multi-year grant contracts with Indigenous communities and organisations across Alberta, currently tracked in a single Excel workbook the program is replacing. The folder holds the program's own build specifications plus Alec's EA assessment of them.

Key people: **Kristin Flemons** (Research Associate, schema author and IT-request submitter, Kristin.flemons@primarycarealberta.ca); **Marjorie Luzentales-Simpson** (manager). These are the program team, not HSS — Alec is reviewing their request, not authoring the build.

## Contents

The four program-supplied specs are authoritative source material (do not rewrite them):

- `HL_Schema_Reference_v1.4.docx` — the authoritative build spec: 24 Dataverse tables (20 Admin, 1 Shared, 3 Reporting), relationship map, cascade behaviours, 10 Global Option Sets, Appendix A build notes, and a §7 open-items list.
- `HL_ITRequest_PowerPlatform_v5.docx` — the licensing/environment request to IT (premium environment, Power Apps Premium + Power BI Pro for 4–6 users, governance/privacy pathway). Six-phase, ~14-week build plan.
- `HL Brief Architecture Summary.docx` — one-page table inventory and relationship snapshot.
- `HL Data Model ERD.pdf` — visual ERD grouped by Core Masters / Communities / Contracts / Reporting / HL Program Tracking.

Alec's authored output: [[Honouring Life Initial Assessment Preliminary Analysis]] — EA-orientation assessment (Power Platform primer + architectural read).

## Key facts and decisions

- **Architecture is Dataverse-first (schema v1.4)**, replacing an earlier SharePoint Lists design (v1.0–v1.3) and the current Excel tracker. The migration rationale — SharePoint delegation ceiling (~2,000 rows), platform-level referential integrity, and lower form-build effort via model-driven apps — is sound and documented.
- The core reporting grain is `HL_Activity_Instance` (one row per delivered activity, tied to Contract + Activity Family + Fiscal Year). Tagging uses a shared `Attribute_Registry` plus native Dataverse N:N (junction tables removed in v1.4, except `Contract_Outcome_Links` which carries a Notes field). Files stay in SharePoint/OneDrive; Dataverse stores URLs + metadata only.
- The data model is competent (history-aware tables, an `Admin_Events` audit spine with a single-submission form pattern, deliberate de-normalisation restraint). Overall EA read: "yes, with governance conditions."

## Open governance items (Alec's review findings)

Tracked in full in the assessment note; the load-bearing ones:

1. **Privacy is understated.** The team's "no PII beyond org/staff names" claim is inaccurate — `Community_Contacts` (names/emails/phones), `Staff`, `HL_Qual` excerpts, and `HL_Media_Sets` (consent-flagged photos/video, potentially of youth) are personal information under FOIP. Treat a privacy review as required, and raise **Indigenous data sovereignty (OCAP)** explicitly.
2. **Environment + DLP** provisioning is the real gating dependency (not licensing dollars).
3. **Exit / retirement plan** — the headline governance ask (per Alec). Maker-owned support carries key-person/inheritance risk; design likely LLM-assisted, raising handover stakes. Goal: engineer so outcomes are only *transfer* or *clean decommission*, never IT inheriting an orphaned app. Levers: no-inheritance agreement at intake, service-account (not personal) ownership, managed solution, named co-owner, documented decommission default with Dataverse data export + records-retention compliance. See §5 of the assessment note.
4. **App pattern** — recommend model-driven (not canvas) for the Admin App.

## Working conventions

- Treat the four `HL_*` spec documents as program-owned source material — assess and reference them; don't edit them.
- This is a **citizen-developer / low-code** effort owned by the program team — a different governance posture from HSS-built custom apps like OMRA. Keep that distinction when advising.
- Status: pre-Power-Platform-access. Alec had not used Power Platform at first review; assessment content is preliminary and to be revised after hands-on use.

---

_Last Updated_: 2026-06-25
_Version_: 1.0
