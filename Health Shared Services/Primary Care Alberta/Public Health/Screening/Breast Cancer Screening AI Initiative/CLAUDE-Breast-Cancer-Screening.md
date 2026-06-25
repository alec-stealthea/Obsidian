---
tags:
  - claude-context
type: Context File
title: CLAUDE-Breast-Cancer-Screening
description: Context for the Breast Cancer Screening AI Initiative — capturing AI-extracted discrete mammography results into Epic Radiant to drive Health Maintenance reminders.
scope: Health Shared Services/Primary Care Alberta/Public Health/Screening/Breast Cancer Screening AI Initiative
parent: "[[CLAUDE-PCA]]"
last-updated: 2026-06-19
timestamp: 2026-06-19T00:00:00Z
---
# CLAUDE-Breast-Cancer-Screening.md — Breast Cancer Screening AI Initiative Context

> **Purpose**: Context for the Connect Care PPH work to capture **discrete** breast-screening results from **community** mammography into Epic Radiant — so that Epic Health Maintenance reminders can fire for all Albertans — using an AI/LLM engine to extract structured fields from free-text radiology reports.

---

## What This Initiative Is

Community mammography results arrive in Epic as free-text HL7 (ORU) messages from external radiology clinics. An AI engine (Microsoft Copilot-based prompts) reads the report text and extracts **discrete** fields — BI-RADS category, breast density, recommended action, timing, recommended side — which are mapped to Epic/Radiant internal values via the Bridges integration engine. Discrete results are what enable **Health Maintenance reminders**; free-text results cannot drive them. A QA step validates AI accuracy before results are trusted for screening decisions.

## Key Facts

- **Five (now six) target discrete attributes** must conform to accepted Radiant values: Recommended Side, Recommended Action, Timing, BI-RADS Category, Breast Density, and Recommendation Status (the last to be confirmed with the **ABCSP** — Alberta Breast Cancer Screening Program).
- **Systems involved**: Epic Connect Care, **Epic Radiant** (radiology), the external-clinic HL7 results interface, the **Bridges** integration engine (expects an "external value"; stores an "internal value" in Radiant), and the AI discrete-results integration.
- **AI/LLM approach**: prompts persona-framed as a 20-year Alberta mammography/ultrasound specialist; parse only the mammography exam from the HL7 TXT portion (ignore ultrasound/MRI/biopsy), apply fuzzy/partial matching, output a single valid JSON object. Separate mammogram and ultrasound prompt scripts exist.
- **QA Work Queue**: AI-resulted external exams carry a source/origin flag; a configurable random sample is surfaced to a Radiant QA reviewer (Breast Cancer Screener) to validate AI output against the source report before reliance.
- **Economics**: screening improves quality-adjusted life years but carries real program cost; the economic assessment draws on Peter Attia's framework via the linked research clipping [[Beyond the mammogram a framework for smarter breast cancer screening]].

## Folder Contents

- **Breast Cancer (Mammography) Screening Key Fields and values** — the canonical discrete attributes and their accepted Radiant values.
- **Updated Action and Timing Mapping** — the Recommended Action × AI Timing → Epic internal value / external value lookup table (the Bridges mapping), superseding the earlier Mammography Action and Timing Matrix.
- **Community Mammography AI Discrete Results** — the proposed solution/application context model for the discrete-results flow.
- **Mammogram LLM Script** / **Ultrasound LLM Script** — the Copilot extraction prompts.
- **Sample HL7 Messages** — de-identified ORU^R01 examples used to develop and test extraction.
- **QA Work Queue - User Story** — backlog item for the AI-results validation queue.
- **Breast Cancer Screening UAT Script** — UAT for the Community Mammography Discrete Results build (authored by Alec; references the key-fields, mapping, and context-model docs).
- **Breast Cancer Screening Economic Assessment** — cost/benefit narrative for the screening program.

## Working Conventions

- Clinical data — handle terminology precisely (BI-RADS, breast density categories) and respect healthcare data sensitivity; keep HL7 samples de-identified.
- Distinguish **external value** (what Bridges expects on the interface) from **internal value** (what is stored in Radiant) when discussing mappings.
- Confirm Recommendation Status semantics with the ABCSP before treating them as settled.
- Day-job work — keep separate from Stealth EA intellectual property.

---

_Last Updated_: 2026-06-19
_Version_: 1.0
