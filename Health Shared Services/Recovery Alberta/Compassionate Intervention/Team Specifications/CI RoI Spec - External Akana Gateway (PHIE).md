---
type: Interface Specification
title: "CI RoI Spec — External Akana Gateway (PHIE Team)"
description: "Owning team: PHIE (Akana)"
timestamp: 2026-06-26T19:19:07Z
---

# CI RoI Spec — External Akana Gateway (PHIE Team)

**Owning team:** PHIE (Akana)
**Counterparty:** CIP application team (AWS-hosted CMI Application)
**Sequence steps covered:** Step 1 (ROI Request Submission, arrows 1–4) and the webhook delivery legs of Steps 4a / 5b / error path — per [[CI RoI Proposed Sequence Diagram]] and [[CI RoI Sequence - All Engines Automated vs Human]]
**Source of contract:** [[CI RoI Sequence - CIP to Akana API Gateway]]

## Scope

The external Akana instance is the **only HSS endpoint CIP communicates with**, in both directions. It is a pass-through gateway: authentication (mTLS), rate limiting, and API governance — **no business logic or message transformation**. All internal components (RIE/IBM ACE, Snowflake, Epic) are abstracted behind it.

## Inbound: POST /roi-request

| Item | Requirement |
|---|---|
| Virtual service | `POST /roi-request`, JSON body (see [[CI RoI IBM Integration Engine Message Specification#Inbound Trigger (from CIP)]] for the payload Akana passes through unmodified) |
| Authentication | mTLS — CIP presents a client certificate; Akana validates against the registered CA before forwarding |
| CIP client cert trust | CIP is AWS-hosted and proposes an **AWS Private CA**-signed cert. CIP must send the public CA cert for registration in the HSS trust store (June 10 meeting) |
| Rate limiting | Throttling policy required; limits TBD with RIE team based on expected CI request volume |
| Routing | Pass-through to IBM ACE (RIE). No transformation. Relay ACE's `202 Accepted` + Request ID back to CIP |
| Backend-down behavior | Defined in [[CI RoI Spec - External Akana to RIE Handoff]] |

## Outbound: Webhook delivery to CIP

Akana performs the mTLS delivery of payloads that IBM ACE has already formatted and HMAC-signed (success, clinician document, or error).

| Item | Requirement |
|---|---|
| Destination | **Static, per-environment URL** (dev/test/prod) held in HSS configuration on this gateway. CIP never supplies a `callbackUrl` — see rationale in [[CI RoI IBM Integration Engine Message Specification#Static endpoint (not per-request)]] |
| Client cert (HSS outbound) | Current DigiCert cert on the GT server, reusable from the MPR/MHAA project. PKI changes may move this to an HSS self-signed cert — CIP must confirm they can trust it (June 10 meeting) |
| Server cert | Pin the CIP server certificate |
| Message headers | Pass through unaltered: `X-Request-ID`, `X-Release-ID`, `X-HSS-Signature`, `X-HSS-Timestamp` (signing is RIE's responsibility, not Akana's) |
| Retry / dead-letter | Retry with exponential backoff + jitter; exhausted deliveries dead-lettered for operator replay (shared mechanism with RIE — see [[CI RoI Spec - External Akana to RIE Handoff]]) |

## POC / Hello-World (current activity)

- Akana can return a **hello-world response without forwarding to RIE**, decoupling the connectivity test from backend readiness
- mTLS policy is **toggleable**: confirm raw connectivity first, then enable mTLS
- Target: Tuesday/Wednesday before noon (per June 10 meeting)

## Open items (June 10, 2026)

1. George to send CIP the standard PHIE certificate documentation (key length etc.)
2. CIP to confirm trust of HSS-signed cert; HSS to share DigiCert public key (Eric)
3. Certificate register and rotation schedule: [[CI RoI Security and Certificates Register]]

## Related

- [[CI RoI Step Ownership Matrix]]
- [[CI RoI Sequence - CIP to Akana API Gateway]] — the CIP-facing contract this gateway implements
- [[CI RoI Meeting Notes - June 10, 2026]]
