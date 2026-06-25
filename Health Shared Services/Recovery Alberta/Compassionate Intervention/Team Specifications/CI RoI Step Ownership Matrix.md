# CI RoI Step Ownership Matrix

Maps every interaction in [[CI RoI Proposed Sequence Diagram]] (and the error path from [[CI RoI Sequence - All Engines Automated vs Human]]) to its producer, consumer, and the spec note that owns the contract. Use this as the index for cross-team coordination — each boundary spec is co-owned by the two teams on either side of the arrow.

**Teams:** CIP (vendor, AWS-hosted CMI app) · **PHIE** (Akana gateways, external + internal) · **RIE** (IBM ACE) · **Epic HIM IT** (Connect Care ROI Web Service, HIM module, Bridges) · **Data Platform** (Snowflake)

## Precondition

| Interaction | Producer | Consumer | Spec |
|---|---|---|---|
| PHN → Epic patient ID (Patient Lookup Web Service #5454) | CIP (or upstream resolution service) | Epic | Out of scope of these notes — resolved before any ROI call |

## Step 1 — ROI Request Submission

| Interaction | Producer | Consumer | Spec |
|---|---|---|---|
| `POST /roi-request` (mTLS) | CIP | PHIE (external Akana) | [[CI RoI Spec - External Akana Gateway (PHIE)]] |
| Pass-through to ACE | PHIE | RIE | [[CI RoI Spec - External Akana to RIE Handoff]] |
| `202 Accepted` + Request ID | RIE | PHIE → CIP | [[CI RoI Spec - External Akana to RIE Handoff]] |

## Step 2 — Create ROI Release Record

| Interaction | Producer | Consumer | Spec |
|---|---|---|---|
| `CreateRelease2` SOAP | RIE | PHIE (internal Akana) | [[CI RoI Spec - Epic ROI Web Service Integration]] |
| Pass-through to Epic ROI WS | PHIE | Epic HIM IT | [[CI RoI Spec - Epic ROI Web Service Integration]] |
| Release record creation in HIM | Epic ROI WS | Epic HIM | Epic-internal — prerequisites in [[CI RoI Spec - Epic Configuration Prerequisites (HIM IT)]] |
| `CreateRelease2Response` (ReleaseID / ErrorCodes) | Epic HIM IT | PHIE → RIE | [[CI RoI Spec - Epic ROI Web Service Integration]] |

## Error path — CreateRelease2 failure

| Interaction | Producer | Consumer | Spec |
|---|---|---|---|
| Format + sign error payload | RIE | — | [[CI RoI IBM Integration Engine Message Specification#Error Webhook]] |
| Error webhook delivery (mTLS, signed) | RIE → PHIE | CIP | [[CI RoI Spec - External Akana Gateway (PHIE)]] |

## Steps 3a–5a — Automated path (Release 1)

| Interaction | Producer | Consumer | Spec |
|---|---|---|---|
| Snowflake SQL API query (key-pair JWT; does **not** route via Akana) | RIE | Data Platform | [[CI RoI IBM Integration Engine Message Specification]] · [[CI RoI Snowflake SQL API Configuration]] |
| Format + sign payload, disclosure log | RIE | — | [[CI RoI IBM Integration Engine Message Specification]] |
| Hand signed payload for delivery | RIE | PHIE | [[CI RoI Spec - External Akana to RIE Handoff]] |
| Webhook POST to static CIP endpoint (mTLS, signed) | PHIE | CIP | [[CI RoI Spec - External Akana Gateway (PHIE)]] |
| `UpdateRelease2` (mark Complete) | RIE → PHIE | Epic HIM IT | [[CI RoI Spec - Epic ROI Web Service Integration]] |

## Steps 3b–5b — Clinician-prepared path (Release 2)

| Interaction | Producer | Consumer | Spec |
|---|---|---|---|
| Clinician review + document prep in HIM | Epic HIM (clinician) | — | [[CI RoI Spec - Epic Configuration Prerequisites (HIM IT)]] |
| Bridges outbound message (document + ReleaseID) | Epic HIM IT | RIE | [[CI RoI Spec - Epic Bridges Outbound (Clinician Path)]] |
| Package + sign + disclosure log | RIE | — | [[CI RoI IBM Integration Engine Message Specification]] |
| Webhook POST to static CIP endpoint | PHIE | CIP | [[CI RoI Spec - External Akana Gateway (PHIE)]] |

## Cross-cutting

| Concern | Owner(s) | Spec |
|---|---|---|
| Certificates, HMAC secret, Epic client ID, Snowflake key pair | PHIE / RIE / Epic HIM IT / Data Platform | [[CI RoI Security and Certificates Register]] |
| Disclosure/audit logging (HIA) | RIE (HSS log) + Epic HIM IT (release record) | [[CI RoI IBM Integration Engine Message Specification#Audit and Disclosure Logging]] |
| End-to-end SLA (< 23 s automated path) | All | [[CI RoI IBM Integration Engine Message Specification#Timing and SLA]] |
| Test cases and test data | All | [[CI RoI Functional Test Cases and Test Data]] |
