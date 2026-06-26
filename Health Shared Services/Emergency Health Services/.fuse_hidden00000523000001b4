---
tags:
  - claude-context
type: Context File
scope: Health Shared Services/Emergency Health Services
parent: "[[CLAUDE-HSS]]"
last-updated: 2026-06-24
timestamp: 2026-06-24T00:00:00Z
---
# CLAUDE-EHS.md — Emergency Health Services Context

> **Purpose**: Context for Alec Blair's enterprise architecture work in the Emergency Health Services (EHS) business area of the IT Community Portfolio. The current focus is integrating Epic (Connect Care) with the Logis computer-aided dispatch (CAD) system for Mobile Integrated Health appointment synchronisation.

---

## Scope

This file governs `Health Shared Services/Emergency Health Services/` and reports to [[CLAUDE-HSS]]. It has no child context files yet. For Epic / Connect Care platform facts that apply across the portfolio (Alberta's Epic licensing, RIE, data residency), see the parent [[CLAUDE-HSS]].

## Business Context — Mobile Integrated Health (MIH)

Alberta EHS Community Paramedics deliver Mobile Integrated Health: scheduled, in-home community-paramedic visits. They use two systems that don't talk to each other:

- **Epic (Connect Care)** — clinical documentation of the encounter.
- **Logis IDS** — computer-aided dispatch (CAD) used for booking and real-time crew scheduling across the wider EHS logistics network.

An earlier attempt to schedule in Epic was abandoned in favour of Logis so MIH could participate in the broader EHS dispatch network. The consequence: because Epic is not used for scheduling, appointments booked in Logis are invisible to patients in Epic and must be **re-keyed** into Epic for clinical documentation — duplicate effort plus a patient-visibility gap. The active initiative aims to close this with system-to-system information exchanges.

## The Epic ↔ Logis Appointment Sync Initiative

Three intended information exchanges (see [[Epic to Logis Appointment Sync]]):

1. **Send Epic Referral Order** — the referral order flows from Epic to Logis.
2. **Book Appointment in Logis** — the MIH Patient Coordinator books the initial appointment in Logis.
3. **Close the Appointment Loop** — the booked appointment is pushed from Logis back to Epic and booked as an inpatient or outpatient appointment depending on patient location.

### Integration architecture

The **Regional Integration Engine (RIE), hosted on IBM ACE**, is the integration hub. The Logis vendor specification expects a single counterpart it calls the **"TransferSchedulingBroker"** — the assessment concludes **RIE = TransferSchedulingBroker**, carrying all protocol/format transformation rather than any point-to-point design. See [[Epic to Logis Appointment Sync Solution Concept Model]].

### Logis IDS TransferSchedulingBroker interface (vendor spec)

Confirmed characteristics from the vendor specification (`Logis IDS TransferSchedulingBroker Interface.docx`):

- **REST/JSON**, not native HL7/FHIR — transformation lives in the RIE.
- **Bidirectional**: broker calls `BookTransport`, `ConfirmTransport`, `AttachFileToTransport`, `CancelTransport`; Logis **pushes** `TransportStatusUpdate` back to a broker-hosted webhook endpoint (push, not polling).
- **HTTP Basic** auth with the Logis-issued **token carried as the password** (empty username); HTTPS must be enforced.

### Recommended Epic pairing

- **#5384 Incoming Appointment Scheduling** — inbound loop closure into Epic (Cadence outpatient / Grand Central-ADT inpatient).
- **#5454 Patient Lookup Web Service** — identity resolution (load-bearing; see data gap below).
- **Epic outbound referral/order interface** — for Exchange 1.

### Key open decisions and the data gap (carry into any revision)

- **Workflow inversion** — the original SCM assumed the coordinator books manually in Logis and Logis pushes to Epic; the interface is built the opposite way (broker-initiated `BookTransport`). The **broker-driven pattern is the cleaner fit** and directly removes the duplicate-entry problem.
- **Transport vs. appointment semantics** — the interface is a patient-*transport* model (A→B locations, pickup/dropoff, ETA). MIH visits are **home visits**, not transports; SMEs must confirm the mapping and whether the separate "Logis IDS Appointments module" is a better fit.
- **No patient identifier in the payload (the real data gap)** — bookings carry demographics but **no PHN/MRN**; they are keyed solely by a `BookingId` assigned by the RIE. The **RIE must own** the `BookingId ↔ Epic patient / referral / encounter` correlation map, making Identity Resolution and Referral Correlation essential, not optional.
- **Status/lifecycle mapping** — Logis dispatch statuses are richer than book/reschedule/cancel/no-show; there is **no native no-show** (must be synthesised), reschedule is only possible until `DrivingToPickup`, and an extra `OnHold → ConfirmTransport` handshake must be implemented in the RIE.

## Key Documents

- [[Epic to Logis Appointment Sync]] — original problem statement and the three exchanges.
- [[Epic to Logis Appointment Sync Solution Concept Model]] — the SCM (RIE on IBM ACE), being revised to reflect the broker interface.
- [[Logis TransferSchedulingBroker Interface Assessment]] — fit assessment of the vendor spec against the SCM (verdict: can satisfy, with three decisions and one data gap).
- [[Epic to Logis Appointment Sync — ArchiMate Update Checklist]] — model elements to add/relabel/remove for the broker-driven design.

## Working Conventions

- Day-job work — keep separate from Stealth EA intellectual property.
- Format markdown so it can be pasted into OneNote without loss of formatting (HSS convention).
- The SCM is mid-revision: when working here, treat the broker-driven pattern and the RIE-owned correlation map as the current direction, but the transport-vs-appointment mapping remains an open SME question.

---

_Last Updated_: 2026-06-24
_Version_: 1.0
