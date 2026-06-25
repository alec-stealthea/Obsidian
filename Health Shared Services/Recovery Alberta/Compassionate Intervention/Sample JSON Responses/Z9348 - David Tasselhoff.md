# Z9348 — David Tasselhoff — Inpatient test patient

Sample CIP webhook payload generated from **CI - Connect Care Sample Report Jan 14 2026.xlsx**. See [[CI RoI Sample JSON Responses]] for methodology and the EHS → ED correlation map.

- Single inpatient episode from the workbook (9 problem-list diagnoses; principal = COPD with acute exacerbation).
- Discharge medications: distinct items with reconciliation actions Resume/Order/New/Modify at Discharge ('Do Not…' and 'Released' rows excluded).
- summaryPeriod widened beyond the 3-year default so the 2022 admission is in window.
- No EHS incident — no ED encounter exists for this patient in the sample.

> [!note] Payload file
> The JSON payload for this patient is in **Z9348 - David Tasselhoff.json** (same folder, parser-valid). Upload it to the Teams channel and link it from the OneNote page for this patient.
