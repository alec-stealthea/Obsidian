# User Story: QA Work Queue for AI-Generated Mammography Discrete Results

## User Story

- **As a** Breast Cancer Screener (Radiant QA reviewer),
- **I need** a QA Work Queue that automatically presents a configurable random sample of AI-resulted external mammography exams from a recent time window,
- **so that I can** validate the AI-generated discrete result fields against the source report and confirm the AI is producing accurate, trustworthy results before they are relied upon for screening decisions.

---
## Context

Mammography results arriving in Epic from external radiology clinics are processed by an AI engine that populates discrete result fields (e.g., BI-RADS assessment category, breast density). These AI-resulted external exams carry a source/origin flag, which is the basis for isolating them into the QA pool. Related systems: **Epic Radiant**, the external-clinic results interface (HL7), and the AI discrete-results integration.

---
## Scenarios

**Scenario A — Happy path (daily percentage sample):** The queue is configured to draw 5% of the prior calendar day's AI-resulted external mammography exams. At the start of the day the screener opens the QA Work Queue, sees the randomly selected exams, opens each one, compares the AI-populated BI-RADS and density values to the source report, marks each field Match, and marks the exam QA Complete.

**Scenario B — Discrepancy found (fixed-count sample):** The queue is configured for a fixed count of 20 exams over the prior week. The screener finds an exam where the AI populated BI-RADS 2 but the source report states BI-RADS 4. The screener records a Mismatch, captures the correct value and a discrepancy reason, and the exam is flagged Fail (discrepancy noted) for follow-up — without altering the patient's official result of record.


---

## Acceptance Criteria

### 1. Minimum (MVP — Must Have)

**AC1 — Population filter**
Given an exam exists in Radiant, When the QA Work Queue evaluates eligibility, Then the exam is included only if it is a mammography exam AND originated from an external radiology clinic AND carries the AI-source flag on its discrete results; all other exams are excluded.

**AC2 — Configurable sample size**
Given an analyst is configuring the queue, When they set the sample parameters, Then they can choose EITHER a percentage OR a fixed count of the eligible pool without a code change; fractional percentages round half up to a whole exam (minimum 1 when the pool is non-empty), and a fixed count exceeding the pool returns all eligible exams.

**AC3 — Configurable time window**
Given an analyst is configuring the queue, When they set the look-back window, Then they can choose daily (prior calendar day) OR weekly (prior 7 days) without a code change, applied against a single documented timestamp (e.g., result-verified date/time).

**AC4 — Random, non-duplicating selection**
Given an eligible pool for the configured window, When the sample is drawn, Then selection is random and not biased by clinic, reader, time, or accession order, and an exam already reviewed in a prior window is not re-presented unless intentionally re-queued.

**AC5 — Discrete-field validation**
Given a sampled exam, When the screener reviews it, Then they validate each in-scope AI-populated discrete field (minimum: BI-RADS assessment category and breast density) field-by-field, recording Match or Mismatch; on Mismatch they capture the correct value from the source report, a discrepancy reason from a configurable pick-list, and an optional comment. The exam-level status is Pass only when all in-scope fields Match.

**AC6 — Discrete, auditable capture**
Given a completed review, When the screener marks the exam QA Complete, Then the per-field outcomes, corrected values, reasons, reviewing user, and timestamp are stored as discrete, reportable data, and the QA action does not alter the patient's official result of record (any clinical correction follows the standard amendment/addendum workflow).

**Regulatory / Standards Cross-References**
- **Health Information Act (HIA, Alberta)** — access to and use of health information limited to the QA reviewer's role and purpose (least-privilege; AC1, AC6).
- **ACR BI-RADS Atlas** — authoritative standard for the assessment category and density values being validated (AC5).
- **ACR RADPEER** — informs the concordance-review concept underpinning the QA workflow (AC5).
- **FHIR R4 DiagnosticReport / Observation** — discrete mammography results and QA outcomes should map to standard resources for interoperability (AC6).
- **ISO/IEC 27001** — access control and audit logging for the QA outcome data (AC4, AC6).

### 2. Desirable (Nice to Have)

**AC7 — Carry-over of unreviewed items**
Sampled-but-unreviewed exams remain available when the next period's sample generates (configurable carry-over vs. expire; default carry-over).

**AC8 — Concordance trending**
QA outcomes can be trended over time and by source clinic (e.g., Reporting Workbench / dashboard) to surface clinics or fields with elevated AI discrepancy rates.

**AC9 — Reviewer efficiency**
Side-by-side display of AI discrete values and the source report within the QA activity to minimize context switching.

---

## User Story Metadata

- **Value Stream:** Population & Public Health
- **Value Stream Stage Workflow:** Development
- **User Story ID:** US-2026-0091 *(confirm sequence with backlog owner)*
- **CSD Workflow Status:** Analysis
- **IT Build Team(s):** Epic Connect Care Team – Radiant; Data Integration Team (external results interface); Enterprise Architecture
- **Link to System Design Documentation:** [Link to Design Doc - TBD]
- **Update Comments:**
  * 2026-06-10: Initial story creation (QA Work Queue for AI-generated external mammography discrete results)
- **Link to meeting minutes for Design signoff:** [Link - TBD]

---

## Open Questions / Dependencies

- Confirm the exact discrete field/flag identifying "AI-generated" and "external clinic" origin and that it is reliably present on every in-scope result (dependency on the AI integration build).
- Confirm the authoritative timestamp for the look-back window (result-verified vs. received vs. exam date).
- Confirm the security point/role granting QA Work Queue access.
- Confirm the discrepancy-reason pick-list with clinical leads.
