---
type: Design Note
title: "Compassionate Intervention — Release of Information"
description: "This diagram shows the full end-to-end flow across all integration components, including both the automated (statutory authority, no clinician review) and clinician-prepared (human review, Epic Bri..."
timestamp: 2026-06-26T19:19:07Z
---

# Compassionate Intervention — Release of Information
## Automated vs. Human Intervention: All Integration Engines

This diagram shows the full end-to-end flow across all integration components, including both the automated (statutory authority, no clinician review) and clinician-prepared (human review, Epic Bridges outbound) response paths, plus error handling.

```mermaid
sequenceDiagram
    autonumber

    box rgb(255,255,224) Compassionate Intervention Program
        participant CIP as CIP Application
        participant WH as Webhook Endpoint
    end

    box rgb(224,240,255) HSS External Gateway
        participant AKAEXT as Akana API Gateway<br/>(External)
    end

    box rgb(224,240,255) HSS Regional Integration Engine
        participant ACE as IBM ACE<br/>(RIE)
    end

    box rgb(224,240,255) HSS Internal Gateway
        participant AKAINT as Akana API Gateway<br/>(Internal)
    end

    box rgb(200,230,200) Epic Connect Care
        participant ROI as Epic ROI<br/>Web Service API
        participant HIM as HIM ROI<br/>Module
        participant BRG as Epic Bridges
    end

    box rgb(230,220,255) HSS Data Platform
        participant SF as Snowflake<br/>Analytics Repository
    end

    Note over CIP,ACE: Precondition: Patient identity resolved<br/>(PHN → Epic Patient ID via Patient Lookup Web Service #5454)

    Note over CIP,AKAEXT: 1. ROI Request Submission

    Note over CIP,AKAEXT: mTLS on both directions of the boundary.<br/>Webhook destination is a static, HSS-configured endpoint<br/>(no callback URL in the request).

    CIP->>AKAEXT: POST /roi-request (mTLS)<br/>(PatientRequested [EPI],<br/>PatientDemographics,<br/>Purpose, ReleaseType, Facility,<br/>InformationStartDate/EndDate,<br/>IsPatientRequester: false,<br/>RequesterName, Comments [statutory ref])
    AKAEXT->>ACE: Pass-through<br/>(mTLS-validated, rate-limited)
    ACE-->>AKAEXT: 202 Accepted (Request ID)
    AKAEXT-->>CIP: 202 Accepted (Request ID)

    Note over ACE,HIM: 2. Create ROI Release Record in Epic HIM

    ACE->>AKAINT: CreateRelease2 SOAP request<br/>(PatientRequested, Purpose,<br/>ReleaseType, Facility,<br/>IsPatientRequester: false,<br/>InformationStartDate/EndDate,<br/>RequesterName, Comments)
    AKAINT->>ROI: Pass-through<br/>(authenticated, rate-limited)
    ROI->>HIM: Create release record
    HIM-->>ROI: Release record created
    ROI-->>AKAINT: CreateRelease2Response<br/>(ReleaseID, ErrorCodes)
    AKAINT-->>ACE: CreateRelease2Response<br/>(ReleaseID, ErrorCodes)

    alt CreateRelease2 Failure (ErrorCodes returned)

        Note over ACE,ACE: Epic returned validation errors<br/>(e.g. INVALID-PATIENT-ID-TYPE,<br/>INVALID-DATE-OF-BIRTH).<br/>No release record created.

        ACE->>AKAEXT: Hand signed error payload for delivery
        AKAEXT->>WH: POST to static webhook (mTLS, signed)<br/>(JSON: error response,<br/>ErrorCodes, original request ref)
        WH-->>AKAEXT: 200 OK
        AKAEXT-->>ACE: Delivery acknowledged

    else Automated Response (Statutory Authority — No Clinician Review)
        Note over ACE,ACE: CreateRelease2 succeeded<br/>(ReleaseID returned, ErrorCodes nil).<br/>Release record serves as audit trail.

        Note over ACE,SF: 3a. Automated Data Retrieval
        ACE->>SF: Query encounter summary<br/>(Patient ID, cross-CIS view,<br/>3-year lookback)
        SF-->>ACE: Encounter summary resultset

        Note over CIP,ACE: 4a. Deliver Automated Response<br/>(static endpoint, mTLS, signed)
        ACE->>ACE: Format + sign payload,<br/>log disclosure for audit
        ACE->>AKAEXT: Hand signed payload for delivery
        AKAEXT->>WH: POST to static webhook (mTLS, signed)<br/>(JSON: encounter summary,<br/>ReleaseID, disclosure log ref)
        WH-->>AKAEXT: 200 OK
        AKAEXT-->>ACE: Delivery acknowledged

        Note over ACE,ROI: 5a. Update Release Record in Epic
        ACE->>AKAINT: UpdateRelease2 SOAP request<br/>(ReleaseToUpdate:<br/>  AssociatedPatient + ReleaseID,<br/>ReleaseStatus: Complete,<br/>FulfilledDate, NumberOfPages)
        AKAINT->>ROI: Pass-through
        ROI-->>AKAINT: UpdateRelease2Response<br/>(UpdateSuccessful: true)
        AKAINT-->>ACE: UpdateRelease2Response

    else Clinician-Prepared Response (Human Review)
        Note over HIM,HIM: 3b. Clinician reviews request,<br/>prepares and attaches<br/>response document in HIM

        Note over BRG,ACE: 4b. Epic Pushes Document Outbound
        BRG->>ACE: Outbound message<br/>(clinician response document,<br/>ReleaseID)
        ACE-->>BRG: Acknowledgement

        Note over CIP,ACE: 5b. Deliver Clinician Response<br/>(static endpoint, mTLS, signed)
        ACE->>ACE: Package + sign document,<br/>log disclosure for audit
        ACE->>AKAEXT: Hand signed payload for delivery
        AKAEXT->>WH: POST to static webhook (mTLS, signed)<br/>(JSON: clinician document,<br/>ReleaseID, disclosure log ref)
        WH-->>AKAEXT: 200 OK
        AKAEXT-->>ACE: Delivery acknowledged
    end

    Note over CIP,WH: 6. CIP processes response<br/>(success, clinician document, or error)
```

## Notes

1. **Two Akana gateway instances** — There are two separate Akana API Gateway instances. The **external** instance is the primary connection point between CIP and HSS in **both** directions: it terminates mTLS for the inbound `POST /roi-request` and performs the outbound mTLS delivery of the webhook to CIP's static endpoint. The **internal** instance mediates calls from the RIE (IBM ACE) to Epic's ROI Web Service. Both are pass-through gateways — they handle authentication (mTLS), rate limiting, and API governance but perform no business logic or message transformation.

2. **IBM ACE as the RIE** — The Regional Integration Engine (RIE) runs on IBM App Connect Enterprise (ACE). It handles all business logic: REST-to-SOAP translation for Epic calls, Snowflake SQL API connectivity, payload transformation, disclosure logging, and formatting + **HMAC-signing** the webhook payload. ACE hands the signed payload to the external Akana gateway, which performs the mTLS delivery to CIP.

3. **REST-to-SOAP boundary** — CIP sends a REST `POST /roi-request` which the external Akana instance passes through to IBM ACE. IBM ACE translates the request into a `CreateRelease2` SOAP call (namespace `urn:Epic-com:Access.2018.Services.Patient`), which routes through the internal Akana instance to Epic's ROI Web Service. CIP never calls Epic or IBM ACE directly.

4. **CreateRelease2 required fields** — `PatientRequested` (IDType) is the only field Epic mandates. The CI use case should always populate: `Purpose` (mapped from statutory authority), `ReleaseType`, `Facility`, `IsPatientRequester` (false), `InformationStartDate`/`InformationEndDate` (3-year lookback), `RequesterName`, and `Comments` (statutory authority reference). The "statutory authority ref" from CIP maps to `Purpose` + `Comments` since there is no native Epic field for it.

5. **CreateRelease2 response** — returns either a `ReleaseID` (IDType with ID and Type) on success, or an `ErrorCodes` array on validation failure (e.g. `INVALID-PATIENT-ID-TYPE`, `INVALID-DATE-OF-BIRTH`). Both fields are present in the response envelope.

6. **Error path** — if `CreateRelease2` returns ErrorCodes, no release record is created in Epic. IBM ACE delivers the error details to CIP via the webhook callback so CIP can surface them to the user or retry with corrected data.

7. **Automated path (3a–5a)** — successful `CreateRelease2` (ReleaseID returned, no ErrorCodes) triggers IBM ACE to query Snowflake for the cross-CIS encounter summary and deliver it to CIP. After delivery, IBM ACE calls `UpdateRelease2` (via internal Akana) to mark the release Complete.

8. **UpdateRelease2 payload** — requires a `ReleaseToUpdate` element containing both `AssociatedPatient` (IDType) and `ReleaseID` (IDType). The completion update sets `ReleaseStatus`, `FulfilledDate`, and `NumberOfPages`.

9. **Clinician-prepared path (3b–5b)** — clinician reviews within Epic HIM, prepares and attaches a scoped response document. Epic Bridges pushes the completed document outbound to IBM ACE. IBM ACE delivers it to CIP. This path requires coordination with the Connect Care integration team for Bridges configuration.

10. **202 Accepted semantics** — External Akana returns 202 to CIP (relayed from IBM ACE) before the Epic SOAP call is made. The Epic call can fail after CIP already has a Request ID; failure details are delivered via the webhook callback.

11. **Patient identity** — resolved in advance. PHN mapped to Epic patient ID (EPI) via Patient Lookup Web Service (spec #5454).

12. **Epic ROI Web Service API** — uses `CreateRelease2` and `UpdateRelease2` SOAP methods (spec #5450), the recommended methods superseding the deprecated `CreateRelease` and `UpdateRelease`.

13. **Snowflake connectivity** — IBM ACE connects directly to the Snowflake SQL API using key-pair JWT authentication. This connection does not route through either Akana instance — it is an internal HSS data platform call.

14. **Webhook delivery failure** — if the webhook POST to CIP fails, delivery is retried with exponential backoff and jitter; exhausted deliveries are dead-lettered for operator replay. Because retries can produce duplicates, CIP must treat `requestId` as an idempotency key. The Epic release record remains the system of record regardless of webhook delivery status.

15. **Static webhook endpoint + mTLS** — the webhook destination is a static, per-environment URL configured in HSS, not a `callbackUrl` supplied in the request. This removes the SSRF/exfiltration surface of POSTing PHI to a caller-supplied address and matches the single mTLS trust relationship between HSS and CIP. The channel is mTLS; the payload is additionally HMAC-signed (`X-HSS-Signature`) with a replay-bounding timestamp (`X-HSS-Timestamp`), since mTLS authenticates the channel but not the message. See [[CI RoI IBM Integration Engine Message Specification#Webhook Transport and Security]].
