# CI RoI Spec — Epic Configuration Prerequisites (Epic HIM IT Team)

**Owning team:** Epic HIM IT (Connect Care)
**Type:** Build/configuration checklist — not a sequence boundary. These items can proceed independently of the integration build and are prerequisites for [[CI RoI Spec - Epic ROI Web Service Integration]].

## 1. Client ID registration

HSS needs a registered client ID through Epic's app creation process to call the ROI Web Service (#5450). See [Creating, Activating, and Licensing an App](https://fhir.epic.com/Documentation?docId=epiconfhirrequestprocess&section=creating). The full #5450 spec requires an open.epic login.

- One client ID per environment (non-prod / prod)
- Credential held by RIE (caller) — record in [[CI RoI Security and Certificates Register]]

## 2. CI release type

A CI-specific release type (working ID: `CI_ROI`) must be built in Epic's release type database.

- `CreateRelease2`'s `ReleaseType` parameter references this record by ID + Type
- The release type constrains valid `Purpose` values, requested formats, and information types — a mismatch returns `RELEASE-TYPE-RESTRICTION-ERROR`
- Confirm the `Purpose` value that maps to statutory authority under the Compassionate Intervention Act

## 3. Facility / department mapping

`CreateRelease2` requires a `Facility` or `Department` IDType to determine the ROI service area.

- **Unresolved (June 10, 2026):** provider portal is not used for ROI, so the EAF/facility mapping question needs Epic clarification
- For the POC, CIP sends a dummy value; actual IDs not yet defined
- Flagged to the HIM and privacy group for future-state resolution (George)
- Related: service area routing for patient-initiated requests (Sherlock ticket — Alec)

## 4. Requester identity

- ROI has its own requester database; a **"requester not in system" workflow** exists so new requesters aren't filtered out
- Decide whether the Statutory Director / CI requesters are pre-registered in the requester DB or flow through the not-in-system path

## 5. Release record behavior under statutory authority (Release 1 — automated path)

- For the automated path, the Epic release record is an **audit trail, not an approval gate** — no clinician work queue action is expected
- Confirm the release record can sit in a status that doesn't generate HIM work-queue noise, then be marked Complete by `UpdateRelease2` (ReleaseStatus, FulfilledDate, NumberOfPages)
- Confirm `RELEASE-REQUEST-LOCKED` scenarios (e.g. record open in HIM while the update arrives)

## 6. Clinician path (Release 2 — only if intervention is needed)

Deferred to [[CI RoI Spec - Epic Bridges Outbound (Clinician Path)]]:

- HIM ROI workflow for clinician review / document preparation / attachment
- Epic Bridges outbound interface configuration
- Denial and "needs more information" workflow back to CIP

## Related

- [[CI RoI Spec - Epic ROI Web Service Integration]] — how these config items are exercised at runtime
- [[CI RoI Step Ownership Matrix]]
- [[CI RoI Meeting Notes - June 10, 2026]]
