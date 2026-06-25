# Breast Cancer Screening – User Acceptance Test (UAT) Script

**Project:** Connect Care PPH – Community Mammography Discrete Results
**Author:** Alec Blair
**Version:** 0.3 (Draft)
**Date:** 2026-04-30
**Reference Documents:**
- Breast Cancer Screening Application Context Model (v0.1, Jan 17 2025)
- Breast Cancer (Mammography) Screening Key Fields and Values
- Mammography Action and Timing Matrix
- Updated Action and Timing Mapping
- Community Mammography AI Discrete Results

---

## Change Log

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-02-27 | Initial draft — three-layer end-to-end UAT (Integration, AI, Radiant) |
| 0.2 | 2026-04-30 | Removed Integration (IIB) and Intelligent Automation (Azure AI) layer tests — covered by separate integration testing. Removed Community Imaging workflow functional tests (routing, duplicates). Refocused entirely on Radiant error queue behaviour for missing/null required fields across screening mammogram, diagnostic mammogram, and breast ultrasound exam types. Removed Recommendation Status (no longer a reported field). |
| 0.3 | 2026-04-30 | Updated Recommendation Code [3002] field mapping to reflect the new Action + Timing mapping (27 valid external values derived from AI Recommended Action + AI Recommended Timing). Added `NoDataFound` error queue failure scenarios (SM-F-08, SM-F-09, SM-F-10). |

---

## Scope

This script covers UAT for the **Epic Bridges + Radiant** layer only. The objective is to validate how Radiant and the Bridges Community Mammography Screening interface handle results — both well-formed and malformed — across three breast imaging exam types:

1. **Screening Mammogram** — routed through the new Bridges Community Mammography Screening interface with AI-enriched discrete fields
2. **Diagnostic Mammogram** — routed through the standard Community DI Results interface
3. **Breast Ultrasound** — routed through the standard Community DI Results interface

The primary focus is on **failure scenarios that would surface in Radiant error queues** when required fields are missing or null.

> **Out of Scope:** IIB message routing, Azure AI prompt extraction, Healthy Planet (HMR), Cogito, Netcare, duplicate message handling, and Community Imaging workflow routing logic.

---

## Test Execution Conventions

| Column | Description |
|---|---|
| **Test ID** | Unique identifier (ExamType-Type-Sequence) |
| **Scenario** | Short description of what is being tested |
| **Pre-conditions** | State required before executing the test |
| **Test Steps** | Numbered, reproducible steps |
| **Expected Result** | System behaviour that constitutes a pass |
| **Actual Result** | Tester records what actually happened |
| **Status** | Pass / Fail / Blocked |
| **Notes / Defect Ref** | Observations or linked defect ticket |

**Exam Type Codes:** SM = Screening Mammogram, DM = Diagnostic Mammogram, US = Breast Ultrasound
**Type Codes:** H = Happy Path, F = Failure / Error Queue

---

---

# Happy Path Baseline (Screening Mammogram)

> **Objective:** Confirm that a well-formed enriched screening mammogram result is correctly received by the Bridges Community Mammography Screening interface and all discrete fields are mapped to the correct Epic internal values in Radiant. These baseline tests establish the expected behaviour against which the failure scenarios are measured.

---

## SM-H-01 – All Discrete Fields Received and Mapped in Radiant

| Field              | Detail                                                                                                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test ID**        | SM-H-01                                                                                                                                                                                                          |
| **Scenario**       | A complete enriched screening mammogram HL7 message arrives at the Bridges Community Mammography Screening interface. All key discrete fields should be stored in Radiant with the correct Epic internal values. |
| **Pre-conditions** | New Bridges Community Mammography Screening interface is live. A test patient exists in Epic. A fully enriched HL7 message is ready (all discrete fields populated with valid external values).                  |

**Test Steps:**

1. Send the enriched HL7 message through the new Bridges Community Mammography Screening interface.
2. Open the patient record in Radiant.
3. Confirm the Mammography LLM Prompt Product and Version field is populated (format: `[AI Product]+[AI Product Version]+[Prompt Version]` — confirm field location in Radiant data model with Radiant team).

**Expected Result:**

- All discrete fields are present in the Radiant record.
- All external values are correctly translated to Epic internal values.
- No fields are blank, null, or mapped to an incorrect internal value.
- LLM product/version metadata is persisted.

| Actual Result | Status | Notes / Defect Ref |
| ------------- | ------ | ------------------ |
|               |        |                    |
# NoDataFound for Recommended Action (Error Queue)

| Field              | Detail                                                                                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Test ID**        | SM-F-08                                                                                                                                                                                                                                                                                                |
| **Scenario**       | The AI was unable to extract a Recommended Action from the report text and returned `NoDataFound` for the Action. Per the Updated Action and Timing Mapping, any result where the Recommended Action is `NoDataFound` should be sent to the error queue regardless of the AI Recommended Timing value. |
| **Pre-conditions** | An enriched HL7 message where Recommendation Code [3002] has an external value of `NoDataFound` (derived from Action = `NoDataFound`). All other discrete fields (BI-RADS, Breast Density, Recommendation Side) are valid.                                                                             |

**Test Steps:**

1. Submit the enriched HL7 message with Recommendation Code = `NoDataFound` through the Bridges Community Mammography Screening interface.
2. Confirm the message appears in the Radiant error queue.
3. Record the error queue name and error description.
4. Confirm no record is written to Radiant with a `NoDataFound` recommendation.
5. Confirm the error queue entry includes sufficient context (patient identifier, accession number, report text) for manual review and resubmission.

**Expected Result:**

- Message lands in the Radiant error queue — `NoDataFound` is not a valid Field and must not be filed in Radiant.
- Error description clearly indicates the Recommendation Code could not be resolved.
- No partial record is created in Radiant.

| Actual Result | Status | Notes / Defect Ref |
|---|---|---|
| | | |


