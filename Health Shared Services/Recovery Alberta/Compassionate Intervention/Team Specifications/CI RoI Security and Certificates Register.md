---
type: Interface Specification
title: "CI RoI Security and Certificates Register"
description: "Single register of every credential in the end-to-end flow (CI RoI Proposed Sequence Diagram), who holds it, who trusts it, and rotation expectations."
timestamp: 2026-06-26T19:19:07Z
---
# CI RoI Security and Certificates Register

Single register of every credential in the end-to-end flow ([[CI RoI Proposed Sequence Diagram]]), who holds it, who trusts it, and rotation expectations. Cross-team note — PHIE holds most channel credentials, but RIE signs messages and holds the Snowflake key, and Epic HIM IT issues the client ID, so no single team can own this alone.

## Credential register

| # | Credential | Boundary | Held by | Trusted/validated by | Status (June 10, 2026) |
|---|---|---|---|---|---|
| 1 | CIP client certificate (inbound mTLS) | CIP → external Akana | CIP (AWS) | PHIE trust store | CIP proposes **AWS Private CA**-signed cert; CIP must send the public CA cert for registration. George sending PHIE certificate documentation (key length, requirements) |
| 2 | HSS client certificate (outbound mTLS) | external Akana → CIP webhook | PHIE (GT server) | CIP | Current **DigiCert** cert reusable from MPR/MHAA project; PKI changes may move to HSS self-signed — CIP must confirm trust. Eric to share DigiCert public key |
| 3 | CIP server certificate (pinned) | external Akana → CIP webhook | CIP | PHIE (cert pinning) | TBD — exchange with static endpoint URLs per environment |
| 4 | HMAC shared secret (`X-HSS-Signature`) | message-level, HSS → CIP payloads | RIE (signer) + CIP (verifier) | CIP — constant-time comparison over raw body | TBD — define exchange and rotation with overlapping validity; see [[CI RoI IBM Integration Engine Message Specification#Message-level signing and replay protection]] |
| 5 | Epic client ID | RIE → internal Akana → Epic ROI WS | RIE | Epic authorization framework | Requires Epic app registration — [[CI RoI Spec - Epic Configuration Prerequisites (HIM IT)]] §1 |
| 6 | Internal Akana gateway credentials/policy | RIE → internal Akana | RIE / PHIE | PHIE | TBD between RIE and PHIE |
| 7 | Snowflake RSA key pair (`SVC_IBM_CI_ROI`, KEYPAIR_JWT) | RIE → Snowflake SQL API (no Akana) | RIE (private key on integration engine server) | Snowflake (public key fingerprint) | Per [[CI RoI Snowflake SQL API Configuration]]; JWT lifetime ≤ 60 min |

## Rotation and operational rules

- **Overlapping validity** during rotation for the HMAC secret and mTLS certs — CIP must accept old + new during the window
- **Replay bounding** — CIP rejects deliveries with `X-HSS-Timestamp` outside ±5 minutes (recommended)
- All certificate/secret changes flow through HSS change control; the static webhook endpoint itself is configuration, not runtime input
- Per-environment separation: distinct certs, secrets, client IDs, and endpoints for dev / test / prod

## mTLS toggle (POC only)

The external Akana mTLS policy can be toggled off to confirm raw connectivity (hello-world), then re-enabled. **Must be enforced before any PHI flows.**

## Open actions (from [[CI RoI Meeting Notes - June 10, 2026]])

1. George → send CIP the PHIE certificate documentation
2. CIP → send AWS Private CA public cert for HSS trust store
3. Eric → confirm George received the mTLS guide + key; share DigiCert public key with CIP
4. CIP → confirm they can trust a future HSS self-signed cert

## Related

- [[CI RoI Step Ownership Matrix]]
- [[CI RoI Spec - External Akana Gateway (PHIE)]]
- [[CI RoI IBM Integration Engine Message Specification#Webhook Transport and Security]]
