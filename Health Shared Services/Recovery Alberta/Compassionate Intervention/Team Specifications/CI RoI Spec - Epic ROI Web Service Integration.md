---
type: Interface Specification
title: "CI RoI Spec — RIE ↔ Internal Akana ↔ Epic ROI Web Service"
description: "Owning teams: RIE (IBM ACE) — caller · PHIE (Akana, internal instance) — gateway · Epic HIM IT — service owner"
timestamp: 2026-06-26T19:19:07Z
---

# CI RoI Spec — RIE ↔ Internal Akana ↔ Epic ROI Web Service

**Owning teams:** RIE (IBM ACE) — caller · PHIE (Akana, internal instance) — gateway · Epic HIM IT — service owner
**Sequence steps covered:** Step 2 (Create ROI Release Record) and Step 5a (UpdateRelease2 completion) — per [[CI RoI Proposed Sequence Diagram]]

This is the three-way boundary note. Configuration prerequisites that Epic HIM IT can action independently live in [[CI RoI Spec - Epic Configuration Prerequisites (HIM IT)]].

## Scope

IBM ACE translates the CIP REST request into Epic ROI Web Service SOAP calls (open.epic spec #5450, namespace `urn:Epic-com:Access.2018.Services.Patient`), routed through the **internal Akana instance** (pass-through: authentication, rate limiting, no business logic).

## Responsibilities per team

| Concern | RIE | PHIE (internal) | Epic HIM IT |
|---|---|---|---|
| SOAP request construction, REST→SOAP mapping | ✔ | | |
| Epic client ID credential presentation | ✔ | | issues/registers |
| Gateway policy (auth header validation, rate limiting, routing to Epic endpoint) | | ✔ | |
| ROI Web Service endpoint availability, version | | | ✔ |
| Error-code semantics and fault behavior | consumes | | defines/confirms |
| SLA: < 5 s per SOAP call (per [[CI RoI IBM Integration Engine Message Specification#Timing and SLA]]) | ✔ | ✔ | ✔ |

## CreateRelease2 (Step 2)

Field mapping from the CIP request (see [[CI RoI IBM Integration Engine Message Specification#Inbound Trigger (from CIP)]]):

| SOAP element                       | Source / value                                                                                 | Notes                                                                                         |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `PatientRequested` (ID + Type)     | `patientRequested.id` / `EPI`                                                                  | Only field Epic mandates. Identity resolved in advance via Patient Lookup Web Service (#5454) |
| `PatientDemographics`              | CIP demographics                                                                               | Optional validation (FirstName, LastName, DateOfBirth, NationalIdentifier, Sex)               |
| `Purpose`                          | Statutory authority (Compassionate Intervention Act)                                           | Valid values constrained by release type config — confirm with Epic HIM IT                    |
| `ReleaseType` (ID + Type)          | CI-specific release type                                                                       | Must exist in Epic's release type database — see prerequisites note                           |
| `Facility` (ID + Type)             | `facility` from CIP                                                                            | Determines ROI service area; mapping unresolved (June 10 meeting)                             |
| `IsPatientRequester`               | `false`                                                                                        |                                                                                               |
| `InformationStartDate` / `EndDate` | 3-year lookback window                                                                         | YYYY-MM-DD                                                                                    |
| `RequesterName`                    | Statutory Director / authorized requestor                                                      | Requester DB vs. "requester not in system" workflow — see prerequisites note                  |
| `RequestedFormat`                  | e.g. "PDF"                                                                                     |                                                                                               |
| `Comments`                         | Statutory authority reference (e.g. "Compassionate Intervention Act, SA 2024, c C-16.3, s.11") | No native Epic field for statutory ref — carried in Purpose + Comments                        |

**Response:** `CreateRelease2Response` returns `ReleaseID` (ID + Type) on success or `ErrorCodes` on validation failure. Both fields exist in the envelope.

**Error handling (RIE):** on `ErrorCodes` (e.g. `NO-PATIENT-FOUND`, `NO-RELEASE-TYPE-FOUND`, `INVALID-PATIENT-ID-TYPE`, `INVALID-DATE-OF-BIRTH`, `RELEASE-TYPE-RESTRICTION-ERROR`), no release record is created; ACE delivers an error webhook to CIP with `errorSource: EPIC` and the codes. See [[CI RoI IBM Integration Engine Message Specification#Error Webhook]].

## UpdateRelease2 (Step 5a)

Called after successful webhook delivery, to mark the release Complete for HIA audit:

- `ReleaseToUpdate` — requires **both** `AssociatedPatient` (IDType) and `ReleaseID` (IDType)
- `ReleaseStatus` — "Complete" / "Fulfilled"
- `FulfilledDate` — delivery date
- `NumberOfPages` — payload size
- `Comments` — disclosure log reference

**Failure handling:** an `UpdateRelease2` failure (e.g. `RELEASE-REQUEST-LOCKED`) must be logged but must **not** block or roll back CIP delivery — data is already disclosed. A reconciliation process retries the update.

## Open items

1. Epic client ID registration (Epic HIM IT) — see prerequisites note
2. Confirm internal Akana → Epic endpoint URLs per environment
3. Agreed error-code catalog and which codes are retryable
4. Facility / requester ID design — flagged to HIM and privacy group (June 10 meeting)

## Related

- [[CI RoI Step Ownership Matrix]]
- [[CI RoI Spec - Epic Configuration Prerequisites (HIM IT)]]
- [[CI RoI Sequence - All Engines Automated vs Human]] — full flow including error alt-path
- [[CI RoI Security and Certificates Register]]
