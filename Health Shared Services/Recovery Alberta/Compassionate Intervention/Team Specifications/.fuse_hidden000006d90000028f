# CI RoI Spec — Epic Bridges Outbound (Clinician-Prepared Path)

**Owning teams:** Epic HIM IT / Connect Care integration team — producer · RIE (IBM ACE) — consumer
**Release:** Release 2 — only required if human intervention/review is needed. Release 1 covers the automated statutory-authority path only (per [[CI RoI Sequence - CIP to IBM Integration Engine]])
**Sequence steps covered:** Steps 3b–4b — per [[CI RoI Proposed Sequence Diagram]] (Step 5b delivery to CIP reuses the existing webhook mechanism)

## Flow

1. **3b** — Clinician reviews the ROI request in Epic HIM, prepares and attaches the response document (scoped to the approved release)
2. **4b** — On completion in HIM, **Epic Bridges** pushes the document outbound through the Connect Care ROI Interface to IBM ACE; ACE acknowledges
3. **5b** — ACE packages + HMAC-signs the document, logs the disclosure, and hands it to the external Akana gateway for delivery to the static CIP webhook (same mechanism as the automated path — no new CIP-side work)

## To be defined between Epic HIM IT and RIE

| Item | Notes |
|---|---|
| Trigger event | Which HIM action (release completion?) fires the Bridges outbound message |
| Message format | Document format (PDF?), metadata envelope, and how `ReleaseID` is carried for correlation back to the original `requestId` |
| Transport | Bridges interface type and destination ACE endpoint; whether this routes via internal Akana or point-to-point |
| Acknowledgement | ACE ack semantics; Bridges retry behavior on NACK/timeout |
| Correlation | ACE must map `ReleaseID` → original `requestId` (persisted from Step 2) to address the webhook |

## Workflow paths beyond success

These exist in HIM but have no defined integration behavior yet (Key Consideration #5 in [[CI RoI Proposed Sequence Diagram]]):

- **Denial** — clinician denies the request in HIM → CIP must be notified (error/denial webhook)
- **Needs more information** — clinician requests clarification → mechanism back to CIP undefined
- **Timeout** — if clinician review exceeds the SLA, HSS fires a timeout monitor so the Statutory Director can escalate (RIE owns the monitor; SLA value TBD)

## Related

- [[CI RoI Spec - Epic Configuration Prerequisites (HIM IT)]]
- [[CI RoI Spec - External Akana to RIE Handoff]] — delivery handoff reused in Step 5b
- [[CI RoI Step Ownership Matrix]]
