---
type: Meeting Note
title: "CI RoI Meeting Notes - June 10, 2026"
timestamp: 2026-06-26T19:19:07Z
---

### Certificate Authority Setup

- Both sides confirmed mutual TLS (mTLS) is the end-game authentication approach
- Our side (outbound)
    - Current DigiCert cert on the GT server can be reused from the MPR/MHAA project
    - PKI infrastructure changes may push to a self-signed cert eventually, so CIP should confirm they can trust it
- Their side (inbound)
    - CIP app hosted in AWS; Sasha asked if we can trust an AWS Private CA-signed cert
    - They must send us the public cert for that CA to register in our trust store
- George to send CIP the standard PIE certificate documentation covering key length and details

### Facility and Requester IDs

- CIP’s request payload includes 2 fields: facility ID and requester ID
- Requester database: ROI has its own built-out requester DB, but a “requester not in system” workflow also exists to avoid filtering new requesters
- Provider portal is not used for ROI, so the EAF/facility mapping question needs Epic clarification
- For the POC, CIP can send any dummy value because actual IDs are not yet defined
    - George to flag facility and requester ID design to the HIM and privacy group for future-state resolution
    - Alec: “let’s not complicate this, it’s just a 12-digit number we can make up”

### Hello World Handshake and Timeline

- Sasha wants a live endpoint to hit, misunderstanding mTLS as a 2-step process separate from the web request
- Acana (API gateway) can return a hello-world response without forwarding to RIE, decoupling the handshake test from backend readiness
    - mTLS policy can be toggled on or off to confirm raw connectivity first, then add auth
    - GSR logged with network team to open firewall between DMZ host and internal RIE server; change window is Thursday but security clearance may delay it
- Disclosure record creation is in the full sequence diagram but out of POC scope; will be added once CIP confirms successful payload receipt
- Timeline: technically deliverable by end of day tomorrow, but team agreed to push to Tuesday or Wednesday before noon to avoid over-delivering and setting a precedent

### Next Steps

- Send CIP the PHIE certificate documentation (George)
- Confirm CIP can trust an HSS-signed cert and share our DigiCert public key; ensure George received the MTLS guide and key sent via email (Eric)
- Escalate Thursday firewall change window if security clearance blocks it (George)
- Confirm a specific hello-world delivery date before end of day today and share with the group (Headley)
- Raise facility and requester ID design with HIM representatives and privacy group (George)
- Add Sherlock ticket note on service area routing for patient-initiated requests (Alec)