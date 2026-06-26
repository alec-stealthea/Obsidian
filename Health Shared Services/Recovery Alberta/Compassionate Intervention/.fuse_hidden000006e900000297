# Compassionate Intervention — Release of Information
## Functional Test Cases and Test Data Requirements

This document defines the functional test cases for the CI RoI interface and the test data needed to execute them. Test cases are organized by the integration flow: request submission, Epic CreateRelease2, Snowflake data retrieval, webhook delivery, and Epic UpdateRelease2.

---

## 1. ROI Request Submission (CIP → HSS)

### TC-1.1: Valid request — all fields populated
Submit a well-formed `POST /roi-request` with all required and optional fields. Expect `202 Accepted` with a `requestId`.

### TC-1.2: Missing required field — patientRequested
Omit `patientRequested` from the request body. Expect `400 Bad Request` with a descriptive error.

### TC-1.3: Missing required field — callbackUrl
Omit `callbackUrl`. Expect `400` or equivalent validation error.

### TC-1.4: Invalid patientRequested.idType
Send `idType: "MRN"` instead of `"EPI"`. Expect rejection or downstream Epic error (INVALID-PATIENT-ID-TYPE).

### TC-1.5: Invalid date range — startDate after endDate
Send `informationStartDate` later than `informationEndDate`. Expect validation error.

### TC-1.6: Date range exceeds 3 years
Send a date range spanning more than 3 years. Verify the system either rejects or truncates to the 3-year window per business rules.

### TC-1.7: Malformed JSON body
Send invalid JSON. Expect `400 Bad Request`.

### TC-1.8: Duplicate request
Submit the same request twice in rapid succession. Verify idempotency behavior — either both return unique requestIds or the second is rejected.

### TC-1.9: Missing patientDemographics fields
Omit optional demographic fields (address, phoneNumber) while keeping required ones (phn, familyName, firstName, birthDate, gender). Expect `202 Accepted`.

---

## 2. PHN Validation / Patient Identity

### TC-2.1: PHN matches platinum fields
Submit a request where PHN, familyName, firstName, birthDate, and gender all match the patient record. Expect successful processing.

### TC-2.2: PHN does not match platinum fields
Submit a request where the PHN is valid but the familyName or birthDate does not match. Expect an error response indicating identity mismatch — the 3-year summary must not be released.

### TC-2.3: Invalid PHN (non-existent)
Submit a PHN that does not exist in any source system. Expect an error indicating patient not found.

### TC-2.4: PHN maps to multiple EPIs
Submit a PHN that resolves to more than one Epic patient ID (merge scenario). Verify the system handles this correctly — either selects the surviving EPI or returns an error requiring manual resolution.

---

## 3. Epic CreateRelease2 (HSS → Epic via Akana)

### TC-3.1: Successful CreateRelease2
Valid request flows through to Epic. Expect a `ReleaseID` returned, no `ErrorCodes`. Verify a release record exists in Epic HIM.

### TC-3.2: CreateRelease2 returns INVALID-PATIENT-ID-TYPE
Send a patient ID type that Epic doesn't recognize. Expect error webhook delivered to CIP with the ErrorCode.

### TC-3.3: CreateRelease2 returns INVALID-DATE-OF-BIRTH
Send a birthDate that doesn't match the Epic patient record. Expect error webhook.

### TC-3.4: Epic ROI Web Service unavailable
Simulate Epic downtime (or Akana returning 503). Verify HSS retries and eventually delivers an error webhook to CIP.

### TC-3.5: Akana API Gateway timeout
Simulate Akana timeout (no response within SLA). Verify HSS handles the timeout gracefully and delivers an error webhook.

### TC-3.6: CreateRelease2 fields mapping
Verify that all CIP request fields map correctly to the SOAP payload: Purpose, ReleaseType, Facility, IsPatientRequester=false, InformationStartDate/EndDate, RequesterName, Comments (statutory authority reference).

---

## 4. Snowflake Data Retrieval (HSS → Snowflake SQL API)

### TC-4.1: Patient with encounters across all entity types
Query a patient who has EMS incidents, ED visits, inpatient episodes, ambulatory visits, a CTO, and current diagnoses within the 3-year window. Verify all six encounter types appear in the response.

### TC-4.2: Patient with no encounters in window
Query a patient who exists but has zero encounters in the 3-year lookback period. Verify the response returns an empty encounter summary (not an error).

### TC-4.3: Patient with only one encounter type
Query a patient who only has ED visits. Verify the other encounter type arrays are empty, not missing.

### TC-4.4: 3-year date boundary — encounter on exact start date
Verify an encounter dated exactly on `informationStartDate` is included.

### TC-4.5: 3-year date boundary — encounter on exact end date
Verify an encounter dated exactly on `informationEndDate` is included.

### TC-4.6: 3-year date boundary — encounter one day before start
Verify an encounter dated one day before `informationStartDate` is excluded.

### TC-4.7: Currently admitted inpatient (null dischargeDateTime)
Query a patient with an active inpatient admission (no discharge date). Verify the encounter appears with `dischargeDateTime: null` and `lengthOfStayDays` calculated to current date or null.

### TC-4.8: Active CTO (no end date)
Query a patient with a CTO that has a start date but no end date. Verify `ctoEndDate` is null and the record appears.

### TC-4.9: Multiple diagnoses on a single encounter
Verify diagnoses are correctly aggregated (semicolon-delimited in common columns, array in detail_json).

### TC-4.10: EMS incident with no linked ED visit
Verify the EMS incident appears independently when there is no matching `emergencyCSN` link.

### TC-4.11: EMS incident linked to an ED visit via emergencyCSN
Verify the link is populated and both records appear.

### TC-4.12: Mental Health Act order on ED visit
Query a patient with an ED visit that has a Mental Health Act order. Verify `mentalHealthActOrder: true`.

### TC-4.13: Mental Health Act order on inpatient episode
Same as above but for an inpatient episode.

### TC-4.14: Discharge medications populated
Verify inpatient episodes include the discharge medication list from the IP Discharge Reconciliation event.

### TC-4.15: Ambulatory visit types — In-person, Virtual, Phone
Verify `encounterVisitType` correctly reflects each type.

### TC-4.16: Current diagnoses — Active, Resolved, Inactive statuses
Verify all three diagnosis statuses appear correctly in the response.

### TC-4.17: Snowflake query timeout
Simulate a Snowflake query exceeding the 10-second target. Verify HSS handles async polling (202 → poll → retrieve) or times out with an error webhook after retries.

### TC-4.18: Snowflake unavailable
Simulate Snowflake downtime. Verify HSS retries (3x with exponential backoff) and delivers an error webhook on failure.

### TC-4.19: Large result set requiring pagination
Query a patient with a very high encounter volume that triggers multi-partition Snowflake results. Verify all partitions are concatenated.

### TC-4.20: ePCR patient crosswalk — legacy and new Siren
Verify EMS incidents from both legacy ePCR Siren and new ePCR Siren (Fall 2025+) appear via the PATIENT_XREF crosswalk.

### TC-4.21: ICD-10 F-block filter (if enabled)
If the decision is made to filter to mental health/addiction diagnoses only, verify that non-F-block encounters are excluded from the response. If not filtered, verify all encounters appear regardless of diagnosis code.

---

## 5. Webhook Delivery (HSS → CIP)

### TC-5.1: Successful webhook delivery — automated response
Verify the webhook payload matches the expected JSON structure with all encounter types, requestId, releaseId, disclosureLogRef, patient demographics, and summaryPeriod.

### TC-5.2: Error webhook — CreateRelease2 failure
Verify the error webhook includes `status: "error"`, `errorSource: "EPIC"`, the ErrorCodes array, and a human-readable errorMessage.

### TC-5.3: Error webhook — Snowflake failure
Verify the error webhook includes `status: "error"`, `errorSource: "SNOWFLAKE"`, the Snowflake error code, and the original request reference.

### TC-5.4: Webhook endpoint unavailable
Simulate the CIP webhook endpoint returning 5xx or being unreachable. Verify HSS retries with exponential backoff.

### TC-5.5: Webhook endpoint returns non-200
Simulate the CIP webhook returning 400. Verify HSS logs the failure and retries or alerts.

### TC-5.6: Verify X-Request-ID and X-Release-ID headers
Confirm both custom headers are present and match the original requestId and the Epic ReleaseID.

### TC-5.7: Disclosure log reference generated
Verify `disclosureLogRef` is unique per request and an audit log entry exists with the correct details (requestId, releaseId, patientId, timestamp, encounter count, requester, statutory authority ref).

---

## 6. Epic UpdateRelease2 (HSS → Epic)

### TC-6.1: Successful UpdateRelease2 after webhook delivery
Verify HSS calls UpdateRelease2 with the correct ReleaseToUpdate (AssociatedPatient + ReleaseID), ReleaseStatus=Complete, FulfilledDate, and NumberOfPages. Verify Epic returns `UpdateSuccessful: true`.

### TC-6.2: UpdateRelease2 failure
Simulate Epic returning an error on UpdateRelease2. Verify HSS logs the failure — the webhook has already been delivered, so the CIP response is unaffected, but the release record in Epic should be flagged for manual follow-up.

---

## 7. End-to-End Scenarios

### TC-7.1: Happy path — full automated flow
Submit a valid request for a patient with encounters across all types. Verify: 202 Accepted → CreateRelease2 succeeds → Snowflake returns data → webhook delivered with complete encounter summary → UpdateRelease2 marks release Complete. Verify total time < 23 seconds.

### TC-7.2: Patient with only mental health encounters
Verify the response contains only mental health/addiction-related encounters if the F-block filter is active, or all encounters if not.

### TC-7.3: Patient who left against medical advice
Verify the `disposition` field correctly shows "Leaving against medical advice" for both ED and inpatient encounters.

### TC-7.4: Request with statutory authority reference
Verify the `Comments` field in CreateRelease2 contains the statutory reference ("Compassionate Intervention Act, SA 2024, c C-16.3, s.11") and `Purpose` is set correctly.

### TC-7.5: Concurrent requests for different patients
Submit multiple ROI requests simultaneously. Verify each is processed independently with correct patient data — no cross-contamination.

### TC-7.6: Concurrent requests for the same patient
Submit two ROI requests for the same patient at the same time. Verify both complete correctly (or one is deduplicated per business rules).

---

## 8. Security and Access Control

### TC-8.1: JWT authentication — valid token
Verify the Snowflake SQL API accepts the JWT signed by the SVC_IBM_CI_ROI service account.

### TC-8.2: JWT authentication — expired token
Submit a request with an expired JWT. Verify Snowflake returns 401 and HSS refreshes the token and retries.

### TC-8.3: Unauthorized role
Attempt to query VW_CI_ROI_AGGREGATE with a role other than CI_ROI_INTEGRATION_ROLE. Verify access denied.

### TC-8.4: PHN not released without platinum field match
Verify that if the PHN validation fails (TC-2.2), no clinical data is returned — even partially.

---

## Test Data Requirements

### Test Patients

The following synthetic test patients are needed in the test environment across Epic, ePCR Siren, and Snowflake. All PHNs and EPIs must be synthetic/test values that cannot collide with production data.

| Patient ID | Alias | PHN | EPI | Description |
|---|---|---|---|---|
| TP-01 | Full Encounters | 9000000001 | EPI-TEST-001 | Has at least one of every encounter type (EMS, ED, IP, Ambulatory, CTO, current diagnoses) within the 3-year window. Includes MHA orders on one ED and one IP visit. Has discharge medications. Has encounters from both legacy and new ePCR Siren. |
| TP-02 | No Encounters | 9000000002 | EPI-TEST-002 | Valid patient with zero encounters in the 3-year window. Has old encounters outside the window to test boundary filtering. |
| TP-03 | ED Only | 9000000003 | EPI-TEST-003 | Only ED visits. Multiple visits with varying CTAS levels (1-5). One visit with "Leaving against medical advice" disposition. |
| TP-04 | Currently Admitted | 9000000004 | EPI-TEST-004 | Active inpatient admission (no discharge date). Also has an active CTO with no end date. |
| TP-05 | Boundary Dates | 9000000005 | EPI-TEST-005 | Has encounters on exact start date, exact end date, one day before start, and one day after end of a standard 3-year window. |
| TP-06 | High Volume | 9000000006 | EPI-TEST-006 | Very high encounter count (100+ encounters) to test pagination and performance. |
| TP-07 | PHN Mismatch | 9000000007 | EPI-TEST-007 | Valid PHN but platinum fields (familyName, birthDate) deliberately do not match. Used for negative identity validation tests. |
| TP-08 | Non-Existent PHN | 9000000099 | — | PHN that does not exist in any system. |
| TP-09 | Multiple Diagnoses | 9000000009 | EPI-TEST-009 | Single ED visit with 5+ diagnoses. Inpatient episode with 3+ diagnoses. Current diagnoses in Active, Resolved, and Inactive status. |
| TP-10 | Ambulatory Types | 9000000010 | EPI-TEST-010 | Ambulatory visits of each type: In-person, Virtual, Phone. |
| TP-11 | AMA Dispositions | 9000000011 | EPI-TEST-011 | Both an ED visit and an inpatient episode with "Leaving against medical advice" disposition. |
| TP-12 | Merged Patient | 9000000012 | EPI-TEST-012a / EPI-TEST-012b | PHN that maps to two EPIs (merge scenario). |

### Demographic Data per Test Patient

Each test patient needs the following populated in the test environment so PHN validation can be tested:

- PHN, familyName, firstName, birthDate, gender, address, phoneNumber
- A "correct" set (for positive tests) and a "wrong" set (for negative tests on TP-07)

### Encounter Data Requirements

**EMS Incidents (ePCR Siren — legacy + new):**
- TP-01 needs at least 1 incident from legacy Siren and 1 from new Siren
- Each incident needs: incidentID, incidentDateTime, sceneLocation, destinationFacility, chiefComplaint, presentingComplaint, disposition
- At least one incident linked to an ED visit via emergencyCSN, and one unlinked

**ED Visits (Epic Clarity):**
- CTAS levels 1 through 5 across test patients
- At least one visit with a Mental Health Act order (TP-01)
- At least one visit with "Leaving against medical advice" disposition (TP-03, TP-11)
- Visits with single and multiple diagnoses

**Inpatient Episodes (Epic Clarity):**
- At least one with discharge medications from IP Discharge Reconciliation (TP-01)
- At least one with Mental Health Act order (TP-01)
- At least one currently admitted with null dischargeDateTime (TP-04)
- At least one with "Leaving against medical advice" disposition (TP-11)

**Ambulatory Visits (Epic Clarity):**
- In-person, Virtual, and Phone visit types (TP-10)
- Associated diagnoses

**Community Treatment Orders (Epic Orders):**
- At least one completed CTO with start and end dates (TP-01)
- At least one active CTO with start date only, no end date (TP-04)

**Current Diagnoses (Epic Problem List):**
- ICD-10-CA F-block codes (mental health/addiction): F10.x, F11.x, F32.x, etc.
- At least one non-F-block diagnosis to test filtering behavior
- Statuses: Active, Resolved, Inactive (TP-09)

### Cross-System Data Requirements

| Data Element | Systems | Notes |
|---|---|---|
| PATIENT_XREF crosswalk | Snowflake staging | Maps ePCR Siren patient IDs to Epic EPIs for each test patient with EMS data |
| Epic HIM release records | Epic test environment | Writable — CreateRelease2 and UpdateRelease2 must function |
| Snowflake views | Snowflake test environment | All six entity views (VW_CI_ROI_*) and the aggregate view must be deployed and populated |
| Akana API Gateway | Test instance | Configured to route to Epic test environment |
| CIP webhook endpoint | Test mock | A controllable mock endpoint that can return 200, 400, 5xx, or be made unreachable |

### Environment Configuration

- Snowflake: CI_ROI database, REPORTING schema, CI_ROI_INTEGRATION_WH warehouse, CI_ROI_INTEGRATION_ROLE role — all provisioned in test
- SVC_IBM_CI_ROI service account with valid RSA key pair for JWT auth
- Akana test gateway pointing to Epic non-production ROI Web Service
- IBM Integration Engine test instance configured with test Snowflake and Akana endpoints

---

## Related Documents

- [[Compassionate Intervention Release of Information Data Model]]
- [[CI RoI Object View Structure]]
- [[CI RoI IBM Integration Engine Message Specification]]
- [[CI RoI Sequence - CIP to IBM Integration Engine]]
- [[CI RoI Sequence - All Engines Automated vs Human]]
