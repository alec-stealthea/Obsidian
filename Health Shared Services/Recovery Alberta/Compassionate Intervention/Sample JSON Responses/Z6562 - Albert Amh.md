---
type: Interface Specification
title: "Z6562 — Albert Amh — Ambulatory test patient"
description: "Sample CIP webhook payload generated from CI - Connect Care Sample Report Jan 14 2026.xlsx."
timestamp: 2026-06-26T19:19:07Z
---

# Z6562 — Albert Amh — Ambulatory test patient

Sample CIP webhook payload generated from **CI - Connect Care Sample Report Jan 14 2026.xlsx**. See [[CI RoI Sample JSON Responses]] for methodology and the EHS → ED correlation map.

- 41 distinct ambulatory encounters (rows grouped by CSN; encounter 403020177874 had two chief-complaint rows, merged).
- CTO list carries only the CTOFlag='Y' order (2025-12-16, encounter 403020465466); the 141 'N' rows are excluded per the data-model rule.
- Current diagnoses deduplicated to latest entry per Dx_ID (7 of 22 rows).
- summaryPeriod widened so the 2019-2020 encounters are in window; production default is the 3-year lookback.
- No EHS incident — no ED encounter exists for this patient in the sample.

> [!note] Payload file
> The JSON payload for this patient is in **Z6562 - Albert Amh.json** (same folder, parser-valid). Upload it to the Teams channel and link it from the OneNote page for this patient.
