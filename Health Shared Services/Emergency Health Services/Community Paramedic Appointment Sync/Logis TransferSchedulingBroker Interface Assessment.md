---
type: Architecture Assessment
title: Logis IDS TransferSchedulingBroker Interface — Fit Assessment
description: Assessment of whether the Logis IDS TransferSchedulingBroker REST interface, paired with an appropriate Epic interface, can satisfy the proposed Epic↔Logis appointment-sync design.
tags:
  - architecture-assessment
  - emergency-health-services
  - epic
  - logis
  - integration
timestamp: 2026-06-23T00:00:00Z
---

# Logis IDS TransferSchedulingBroker Interface — Fit Assessment

> **Purpose:** Assess whether the newly received [[Logis IDS TransferSchedulingBroker Interface]] specification — paired with an appropriate Epic interface — can satisfy the design proposed in the [[Epic to Logis Appointment Sync Solution Concept Model]]. This is an input to the forthcoming revision of that Solution Concept Model (SCM).

## 1. Verdict

The Logis IDS **TransferSchedulingBroker** interface **can satisfy the SCM design**, paired with **Epic Incoming Appointment Scheduling (#5384)** inbound and an Epic **outbound referral/order** interface, with the **Regional Integration Engine (RIE) acting as the "TransferSchedulingBroker"** role that the Logis specification expects on the far side.

The specification confirms several of the SCM's open architectural assumptions and de-risks its largest unknown. However, it also surfaces **three design decisions** and **one genuine data gap**, because this is a *patient-transport* booking interface rather than a generic clinical-appointment scheduler.

## 2. What the Specification Confirms

The SCM's central architectural bet holds. Specifically, the spec confirms:

- **REST/JSON, not native HL7/FHIR** (spec §2, Communication) — exactly as SCM §3.2 predicted. The protocol/format transformation must therefore live in the RIE, as SCM §3.3 argued. This answers SCM open question #1.
- **Bidirectional exchange** — the broker calls `BookTransport`, `ConfirmTransport`, `AttachFileToTransport`, and `CancelTransport`; Logis pushes `TransportStatusUpdate` back to a broker-hosted endpoint (spec § Transport status; §Interface Operations).
- **Push/webhook delivery, not polling** — status updates are POSTed from Logis to `…/transferschedulingbrokerout/transport/status`. This answers SCM open question #3 (delivery mechanism).
- **The RIE-mediated model is the vendor's expected pattern** — Logis names a single integration counterpart, the "TransferSchedulingBroker," which it both calls and is called by. This validates SCM §3.3 (transformation carried in the RIE) over any point-to-point design. In effect, **RIE = TransferSchedulingBroker**.

## 3. Mapping the Three SCM Exchanges to the Interface

| SCM Exchange | Interface Realisation | Notes |
|---|---|---|
| **1. Send Epic Referral Order** | `BookTransport` (`POST /transferschedulingbroker/transport`, `TransportBookingRequest`) | Epic raises the referral → RIE transforms → creates the booking in Logis. |
| **2. Book Appointment in Logis** | Logis returns `TransportBookingResponse` (negotiated pickup/dropoff + requested time); booking held **OnHold** awaiting `ConfirmTransport` (Accept/Reject) | Exchanges 1 and 2 effectively collapse into the broker-driven booking handshake. |
| **3. Close the Appointment Loop** | Inbound `TransportStatusUpdate` stream → RIE builds **HL7 SIU / FHIR Appointment** → **Epic #5384** → Cadence (outpatient) / Grand Central-ADT (inpatient) | This is precisely the SCM §3.4 flow and is fully supported. |

## 4. Recommended Epic Pairing

The SCM's Epic-side selections remain correct and are unaffected by the Logis spec:

- **#5384 Incoming Appointment Scheduling** (actionable, chartable) — for loop closure into Epic.
- **#5454 Patient Lookup Web Service** — for identity resolution (now load-bearing; see §5.3).
- **Epic outbound referral/order interface** — for Exchange 1 (referral out of Epic into the RIE).

## 5. Decisions and Gaps to Resolve

### 5.1 Workflow inversion (design decision)

The SCM assumes the MIH Patient Coordinator **manually books in Logis** and Logis then pushes the appointment to Epic. This interface is built the **opposite way**: the **broker initiates the booking into Logis** (`BookTransport`) and Logis acts as the dispatch/execution engine returning status. Either pattern is achievable, but the **broker-driven pattern is the cleaner fit** — and it directly eliminates the duplicate-entry problem that motivated the project (Epic referral → RIE → `BookTransport`, no manual re-keying). This choice should be made explicit in the revised SCM.

### 5.2 Transport vs. appointment semantics (SME confirmation)

The interface is a **transport model**: `ALocation`→`BLocation`, pickup/dropoff times, driving statuses, ETA. MIH community-paramedic encounters are **home visits**, not A→B transports. A `TransportBooking.IsAppointment` boolean hints at appointment-style use, but SMEs must confirm how a home visit maps (likely a single destination = patient location, A-location = crew base) — and whether the separate **"Logis IDS Appointments module"** (cited in SCM Appendix B) is a better-fit interface than this transport broker.

### 5.3 No patient identifier in the payload (the real data gap)

The `Patient` data type carries `FirstName`, `LastName`, `DateOfBirth`, `Gender`, `Address`, phones, and physicians — but **no PHN/MRN**. Bookings are keyed solely by `BookingId`, which is **assigned by the broker (RIE)**. Consequences:

- The RIE **must own** the correlation map: `BookingId` ↔ Epic patient / referral order / encounter. There is no independent identity key on the Logis side.
- Loop-closure integrity rests entirely on that RIE cross-reference, reinforcing the SCM's **Identity Resolution** and **Referral Correlation** services as essential, not optional.
- Epic **#5454 Patient Lookup** must match on demographics alone (name/DOB/gender/address), raising the importance of match-quality controls.

### 5.4 Status and lifecycle mapping

Logis statuses (`NotStarted` → `SentToVehicle` → `DrivingToPickup` → `ArrivedAtPickup` → `DrivingToDestination` → `ArrivedAtDestination` → `Finished` / `RemoveFromVehicle` / `Cancelled`) are dispatch-grade — richer than the book / reschedule / cancel / no-show lifecycle the SCM assumed. Mapping notes:

- **Reschedule** → `PUT` to the booking, but **only until `DrivingToPickup`**; later changes require cancel-and-rebook.
- **Cancel** → `CancelTransport` / `Cancelled` status, with optional reason code and comment.
- **No-show** → **no native status**; must be synthesised (likely a `Cancelled` with a designated reason code).
- **Extra handshake** → the OnHold → `ConfirmTransport` step is a workflow stage the RIE must implement; it has no equivalent in the current SCM narrative.
- **ETA events** → `TransportStatusUpdate` with `ETAUpdate=true` fires when ETA shifts beyond a 15-minute default threshold (checked every 60s). Decide whether these propagate to Epic or are filtered at the RIE.

### 5.5 Security (minor)

Authentication is **HTTP Basic**, with the Logis-issued **token carried as the password** and an empty username (spec §2, Security). HTTP vs. HTTPS is a configuration choice — HTTPS must be enforced. The RIE must store and rotate the Logis token securely.

## 6. Recommended SCM Updates (for the forthcoming revision)

1. **§7 Open Questions** — mark #1 (no native HL7/FHIR; REST/JSON confirmed) and #3 (push/webhook delivery confirmed) as **answered** by this specification.
2. **Architecture model** — recast the RIE explicitly as the **TransferSchedulingBroker** counterpart; relabel the Logis interfaces to the actual operations (`BookTransport`, `ConfirmTransport`, `CancelTransport`, `AttachFileToTransport`, inbound `TransportStatusUpdate`).
3. **§6 Risks** — add (a) the **patient-identifier gap** and RIE-owned correlation dependency, and (b) the **workflow-inversion decision** (broker-driven vs. coordinator-manual booking).
4. **§3 Solution Overview** — note the **OnHold → Confirm** handshake and the **transport-vs-appointment** semantic question as items requiring SME/vendor confirmation.

## 7. Source Documents

- [[Logis IDS TransferSchedulingBroker Interface]] — vendor interface specification (the document under assessment).
- [[Epic to Logis Appointment Sync Solution Concept Model]] — the design being tested.
- [[Epic to Logis Appointment Sync]] — original context note.

---

_Last Updated_: 2026-06-23
_Author_: Alec Blair (with Claude)
_Related:_ [[Epic to Logis Appointment Sync Solution Concept Model]] · [[CLAUDE-HSS]]
