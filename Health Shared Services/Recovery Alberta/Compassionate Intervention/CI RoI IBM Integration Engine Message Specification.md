---
type: Interface Specification
title: "Compassionate Intervention — Release of Information"
description: "This document defines how IBM ACE (the RIE integration engine) calls the Snowflake SQL API to retrieve the CI RoI encounter summary for a given patient, and how it formats the response payload for..."
timestamp: 2026-06-26T19:19:06Z
---

# Compassionate Intervention — Release of Information
## IBM Integration Engine Message Specification

This document defines how IBM ACE (the RIE integration engine) calls the Snowflake SQL API to retrieve the CI RoI encounter summary for a given patient, and how it formats the response payload for delivery to the CIP Application via webhook.

The CIP webhook is delivered to a **static, per-environment endpoint** that is configured in HSS (held on the external Akana gateway), not supplied per request. The channel is secured with **mutual TLS (mTLS)** and the payload is signed at the message level. See [[#Webhook Transport and Security]] for the rationale and full requirements.

## Context in the Integration Flow

Per the [[CI RoI Sequence - CIP to IBM Integration Engine|CIP-to-IBM sequence]], the Snowflake query occurs at step 3a of the automated path — after a successful `CreateRelease2` call returns a `ReleaseID` from Epic, and before the webhook delivery to CIP. The Akana API Gateway is the primary connection point between CIP and HSS.

```
CIP POST /roi-request → Akana (External)
        │
        ▼
Akana (External) → IBM ACE / RIE (pass-through)
        │
        ▼
IBM ACE: CreateRelease2 → Akana (Internal) → Epic
        │
        ├── Failure → webhook error to CIP
        │
        └── Success (ReleaseID returned)
                │
                ▼
        ┌─── IBM ACE: Query Snowflake SQL API ◄── THIS DOCUMENT
        │
        ▼
IBM ACE: Format + sign payload, log disclosure
        │
        ▼
IBM ACE → Akana (External) → POST to static CIP webhook (mTLS, encounter summary)
        │
        ▼
IBM ACE: UpdateRelease2 → Akana (Internal) → Epic (mark Complete)
```

## Inbound Trigger (from CIP)

IBM ACE receives the ROI request from CIP (routed via Akana) as:

```
POST /roi-request
Content-Type: application/json
```

```json
{
  "patientRequested": {
    "id": "<EPIC_PATIENT_ID>",
    "idType": "EPI"
  },
  "patientDemographics": {
    "phn": "<PHN>",
    "familyName": "Smith",
    "firstName": "Jane",
    "birthDate": "1985-03-15",
    "gender": "Female"
  },
  "purpose": "Compassionate Intervention Act - Statutory Authority",
  "releaseType": "CI_ROI",
  "facility": "<REQUESTING_FACILITY>",
  "informationStartDate": "2023-06-03",
  "informationEndDate": "2026-06-03",
  "isPatientRequester": false,
  "requesterName": "Dr. A. Clinician",
  "comments": "Compassionate Intervention Act, SA 2024, c C-16.3, s.11"
}
```

> **No `callbackUrl` in the request.** The response destination is a static, per-environment CIP webhook endpoint configured in HSS — it is not supplied by the caller. This removes the SSRF/exfiltration surface of accepting an arbitrary destination for a PHI payload and aligns with the single, mTLS-pinned trust relationship between HSS and CIP. See [[#Webhook Transport and Security]].

The Integration Engine immediately returns `202 Accepted` with a `requestId` before proceeding.

## Snowflake SQL API Call

After `CreateRelease2` succeeds, the Integration Engine queries Snowflake. The patient ID from `patientRequested.id` and the date range from `informationStartDate`/`informationEndDate` are passed as bind variables.

### JWT Generation

The Integration Engine generates a JWT for the `SVC_IBM_CI_ROI` service account using key-pair authentication:

**JWT Header:**
```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

**JWT Payload:**
```json
{
  "iss": "<ACCOUNT_IDENTIFIER>.SVC_IBM_CI_ROI.SHA256:<PUBLIC_KEY_FINGERPRINT>",
  "sub": "<ACCOUNT_IDENTIFIER>.SVC_IBM_CI_ROI",
  "iat": <CURRENT_UNIX_TIMESTAMP>,
  "exp": <CURRENT_UNIX_TIMESTAMP + 3600>
}
```

The JWT is signed with the RSA private key held on the Integration Engine server. Token lifetime should not exceed 60 minutes; the engine should cache and refresh tokens before expiry.

### HTTP Request

```
POST https://<account_identifier>.snowflakecomputing.com/api/v2/statements
Authorization: Bearer <jwt_token>
Content-Type: application/json
Accept: application/json
User-Agent: HSS-IBM-IntegrationEngine/1.0
X-Snowflake-Authorization-Token-Type: KEYPAIR_JWT
```

```json
{
  "statement": "SELECT * FROM CI_ROI.REPORTING.VW_CI_ROI_AGGREGATE WHERE patient_id = :1 AND encounter_date >= :2 AND encounter_date <= :3 ORDER BY encounter_date DESC",
  "timeout": 60,
  "database": "CI_ROI",
  "schema": "REPORTING",
  "warehouse": "CI_ROI_INTEGRATION_WH",
  "role": "CI_ROI_INTEGRATION_ROLE",
  "bindings": {
    "1": { "type": "TEXT", "value": "<EPIC_PATIENT_ID>" },
    "2": { "type": "TEXT", "value": "<informationStartDate from CIP>" },
    "3": { "type": "TEXT", "value": "<informationEndDate from CIP>" }
  }
}
```

### Response Handling

**Success (HTTP 200):**

```json
{
  "resultSetMetaData": {
    "numRows": 42,
    "format": "jsonv2",
    "rowType": [
      { "name": "PATIENT_ID", "type": "text" },
      { "name": "ENCOUNTER_TYPE", "type": "text" },
      { "name": "ENCOUNTER_ID", "type": "text" },
      { "name": "ENCOUNTER_DATE", "type": "date" },
      { "name": "FACILITY", "type": "text" },
      { "name": "CHIEF_COMPLAINT", "type": "text" },
      { "name": "PRESENTING_COMPLAINT", "type": "text" },
      { "name": "DIAGNOSES", "type": "text" },
      { "name": "DISPOSITION", "type": "text" },
      { "name": "DETAIL_JSON", "type": "variant" }
    ]
  },
  "data": [
    ["EPI12345", "ED_VISIT", "CSN98765", "2025-11-14", "Foothills Medical Centre", "Suicidal ideation", "Patient found by EMS...", "F32.1 - Major depressive disorder", "Admitted", "{...}"],
    ["EPI12345", "INPATIENT", "HAR55432", "2025-11-14", "Foothills Medical Centre", "MDD with SI", null, "F32.1, F10.20", "Discharged home", "{...}"]
  ],
  "code": "090000",
  "statementStatusUrl": "/api/v2/statements/<handle>?requestId=<id>",
  "statementHandle": "<handle>"
}
```

**Async (HTTP 202):**
- Poll `GET /api/v2/statements/<statementHandle>` every 2 seconds
- Maximum 10 retries (20 seconds total) before treating as timeout
- On `"status": "succeeded"`, retrieve data from the response

**Error (HTTP 4xx/5xx):**
- Log the error
- Do NOT deliver a partial response to CIP
- Retry up to 3 times with exponential backoff (1s, 2s, 4s)
- If all retries fail, deliver an error webhook to CIP with the Snowflake error code

### Pagination Handling

If `resultSetMetaData.partitionInfo` contains more than one partition:

```
GET /api/v2/statements/<statementHandle>?partition=1
Authorization: Bearer <jwt_token>
```

Concatenate `data` arrays from all partitions before formatting the payload. For a single patient's 3-year window, multi-partition responses are unlikely but must be handled.

## Outbound Payload to CIP (Webhook)

After retrieving and assembling the Snowflake results, the Integration Engine formats and signs the encounter summary, then hands it to the external Akana gateway for mTLS delivery to the statically configured CIP webhook endpoint.

### Payload Structure

```
POST https://<static CIP webhook endpoint — per-environment HSS config>
Content-Type: application/json
X-Request-ID: <original requestId>
X-Release-ID: <ReleaseID from CreateRelease2>
X-HSS-Signature: sha256=<HMAC of raw body using shared secret>
X-HSS-Timestamp: <unix timestamp, for replay-window check>
```

```json
{
  "requestId": "<original requestId>",
  "status": "completed",
  "releaseId": "<ReleaseID from Epic>",
  "disclosureLogRef": "<HSS audit log reference>",
  "patient": {
    "id": "<EPIC_PATIENT_ID>",
    "phn": "<PHN>",
    "familyName": "Smith",
    "firstName": "Jane",
    "birthDate": "1985-03-15"
  },
  "summaryPeriod": {
    "startDate": "2023-06-03",
    "endDate": "2026-06-03"
  },
  "encounterSummary": {
    "totalEncounters": 42,
    "emsIncidents": [
      {
        "incidentId": "EMS-2024-44321",
        "incidentDateTime": "2024-08-12T03:45:00",
        "sceneLocation": "1234 Street SW, Calgary",
        "destinationFacility": "Foothills Medical Centre",
        "chiefComplaint": "Overdose",
        "presentingComplaint": "Found unresponsive",
        "disposition": "Transported to ED"
      }
    ],
    "edVisits": [
      {
        "encounterId": "CSN98765",
        "facility": "Foothills Medical Centre",
        "arrivalDateTime": "2024-08-12T04:10:00",
        "departureDateTime": "2024-08-12T18:30:00",
        "chiefComplaint": "Overdose - opioid",
        "ctasLevel": 1,
        "diagnoses": ["T40.1 - Heroin poisoning", "F11.20 - Opioid dependence"],
        "disposition": "Admitted",
        "mentalHealthActOrder": false
      }
    ],
    "inpatientEpisodes": [
      {
        "encounterId": "HAR55432",
        "facility": "Foothills Medical Centre",
        "admitDateTime": "2024-08-12T18:30:00",
        "dischargeDateTime": "2024-08-16T11:00:00",
        "chiefComplaint": "Opioid use disorder",
        "department": "Unit 47 - Addiction Medicine",
        "diagnoses": ["F11.20 - Opioid dependence", "F32.1 - MDD"],
        "lengthOfStayDays": 4,
        "dischargeMedications": ["Suboxone 8mg/2mg", "Sertraline 50mg"],
        "disposition": "Discharged to community follow-up",
        "mentalHealthActOrder": false
      }
    ],
    "ambulatoryVisits": [
      {
        "encounterId": "AMB-2024-8899",
        "facility": "Addiction Recovery Clinic",
        "serviceDateTime": "2024-08-30T10:00:00",
        "encounterVisitType": "In-person",
        "department": "Outpatient Addiction Services",
        "chiefComplaint": "OUD follow-up",
        "diagnoses": ["F11.20 - Opioid dependence"]
      }
    ],
    "communityTreatmentOrders": [
      {
        "ctoFlag": true,
        "ctoStartDate": "2024-09-01",
        "ctoEndDate": "2025-03-01"
      }
    ],
    "currentDiagnoses": [
      {
        "code": "F11.20",
        "description": "Opioid dependence, uncomplicated",
        "diagnosedDate": "2024-08-12",
        "status": "Active"
      },
      {
        "code": "F32.1",
        "description": "Major depressive disorder, single episode, moderate",
        "diagnosedDate": "2024-08-14",
        "status": "Active"
      }
    ]
  }
}
```

### Error Webhook

If the Snowflake query fails after retries, or if `CreateRelease2` returned errors:

```json
{
  "requestId": "<original requestId>",
  "status": "error",
  "errorSource": "SNOWFLAKE | EPIC",
  "errorCodes": ["<error codes>"],
  "errorMessage": "Human-readable description",
  "originalRequest": {
    "patientId": "<EPIC_PATIENT_ID>",
    "dateRange": "2023-06-03 to 2026-06-03"
  }
}
```

## Webhook Transport and Security

The webhook that delivers the PHI payload to CIP is an HSS-side architectural choice — Epic's ROI Web Service API (spec #5450) defines no callback or outbound delivery mechanism, so the transport below is defined entirely by HSS.

### Static endpoint (not per-request)

The destination is a **static URL configured per environment** (dev / test / prod) and held in HSS configuration on the external Akana gateway. CIP does **not** supply a `callbackUrl` in the request body.

Rationale:

- **One known counterparty.** CIP is a single application; the trust relationship is established once, not negotiated per request. A dynamic destination would add flexibility that this integration does not need.
- **PHI safety.** Accepting an arbitrary destination from the request body and POSTing a PHI payload to it is an SSRF/exfiltration surface. A static, pre-agreed endpoint means a disclosure can only ever land where HSS deliberately configured it.
- **Auditability and change control.** A fixed destination is trivial to evidence for HIA audit, and destination changes flow through HSS change control rather than runtime input.
- **mTLS alignment.** With mTLS the destination host must present a pinned certificate anyway, so a dynamic URL would have to resolve to an allow-listed, cert-matching host — i.e. a static endpoint with extra steps. (If per-request routing is ever required, constrain it to a path/correlation segment under the fixed, cert-pinned base host — never a free-form host.)

### Mutual TLS (mTLS)

Both directions of the CIP ↔ HSS boundary use mTLS, terminated at the external Akana gateway:

- **Inbound (CIP → HSS):** CIP presents a client certificate; the external Akana gateway validates it before passing the request through to IBM ACE. This replaces the previously-`TBD` inbound authentication.
- **Outbound (HSS → CIP webhook):** the external Akana gateway presents an HSS client certificate to the static CIP endpoint and pins the CIP server certificate. IBM ACE formats and signs the payload; Akana performs the mTLS delivery.

### Message-level signing and replay protection

mTLS authenticates the channel and host identity, not the message — so the payload is additionally signed:

- **`X-HSS-Signature`** — HMAC-SHA256 over the **raw response body** using a shared secret. CIP must verify it against the raw bytes (before JSON parsing) using a constant-time comparison.
- **`X-HSS-Timestamp`** — CIP rejects deliveries outside a tight acceptance window (recommended ±5 minutes) to bound replay.
- **Secret rotation** — the HMAC secret and the mTLS certificates are rotated on a defined schedule; CIP should support overlapping (old + new) validity during rotation.

### Idempotency and delivery durability

- **Idempotent consumer.** Because failed deliveries are retried, CIP must treat `X-Request-ID` (equivalently `requestId`) as an idempotency key — dedup/upsert on it so a duplicate delivery is a no-op.
- **Retry with backoff.** If the webhook POST fails, IBM ACE / Akana retries with exponential backoff and jitter.
- **Dead-letter / reconciliation.** Deliveries that exhaust retries are written to a dead-letter store for operator replay. The Epic release record remains the system of record regardless of webhook delivery status, so a failed webhook never loses the disclosure.

## Data Transformation: Snowflake Rows → Webhook JSON

The Integration Engine must transform the flat row-based Snowflake response into the nested JSON structure above. The mapping logic:

1. Group rows by `encounter_type` (EMS_INCIDENT, ED_VISIT, INPATIENT, AMBULATORY, CTO, CURRENT_DIAGNOSIS)
2. For each row, parse the `detail_json` VARIANT column which contains encounter-type-specific fields (e.g., `ctasLevel` for ED visits, `lengthOfStayDays` for inpatient)
3. Map common columns (`encounter_id`, `encounter_date`, `facility`, `chief_complaint`, `presenting_complaint`, `diagnoses`, `disposition`) directly
4. Assemble into the nested `encounterSummary` structure

## Audit and Disclosure Logging

Before delivering the webhook, the Integration Engine must:

1. Generate a `disclosureLogRef` (unique identifier for this disclosure event)
2. Log: requestId, releaseId, patientId, date/time, number of encounters returned, requester identity, statutory authority reference
3. This log serves as the HSS audit trail complementing the Epic HIM release record

## Timing and SLA

Target end-to-end for the automated path (from `POST /roi-request` to webhook delivery):

| Step | Target |
|------|--------|
| CreateRelease2 (Epic via Akana) | < 5 seconds |
| Snowflake SQL API query | < 10 seconds |
| Payload formatting + disclosure log | < 1 second |
| Webhook delivery to CIP | < 2 seconds |
| UpdateRelease2 (Epic via Akana) | < 5 seconds |
| **Total** | **< 23 seconds** |

## Related Documents

- [[CI RoI Snowflake SQL API Configuration]] — Snowflake-side setup (warehouse, role, grants, network)
- [[CI RoI Object View Structure]] — SQL views that feed the aggregate
- [[CI RoI Sequence - CIP to IBM Integration Engine]] — Integration sequence diagram
- [[Compassionate Intervention Release of Information Data Model]] — Entity definitions and attributes
