---
type: Checklist
title: Epic to Logis Appointment Sync — ArchiMate Update Checklist
description: Checklist of ArchiMate elements and relationships to add, relabel, or remove in the model to reflect the broker-driven design from the Logis TransferSchedulingBroker interface.
tags:
  - checklist
  - archimate
  - emergency-health-services
  - epic
  - logis
  - integration
timestamp: 2026-06-23T00:00:00Z
---
> **Purpose:** Working checklist of the ArchiMate elements and relationships to update so the model reflects the broker-driven design confirmed by the [[Logis IDS TransferSchedulingBroker Interface]]. Derived from the [[Logis TransferSchedulingBroker Interface Assessment]] and the revised [[Epic to Logis Appointment Sync Solution Concept Model]] (§3.5, §4, §6).

## A. Application Components

- [ ] **Relabel / annotate** `Regional Integration Engine (RIE)` to note it **realises the "TransferSchedulingBroker" role** (the counterpart Logis calls and is called by).
- [ ] **Confirm present:** `Logis IDS PRD` — system of record for MIH scheduling/dispatch (existing; reused).
- [ ] **Confirm present:** `Epic – Bridges`, `Epic – Cadence (Patient Scheduling)`, `Epic – Grand Central (ADT)`, `Epic – EpicCare Inpatient Orders` (existing; reused).
- [ ] **Decision flag:** record open item — whether the separate **Logis IDS Appointments module** is a distinct component to model instead of / alongside the transport broker (SME confirmation, SCM §3.5/§7).

## B. Application Services / Functions (composed into the RIE)

- [ ] Add `Appointment Transformation Service` (REST/JSON ↔ HL7 v2 SIU / FHIR Appointment).
- [ ] Add `Identity Resolution Service` (Logis demographics → Epic IDs; invokes Epic Patient Lookup #5454).
- [ ] Add `Terminology / Code Mapping Service` (Logis transport/status codes ↔ Epic visit types/departments/statuses).
- [ ] Add `Appointment Routing Service` (outpatient → Cadence / inpatient → Grand Central-ADT).
- [ ] Add `Referral Correlation Service` (link returning appointment to originating Epic referral/encounter).
- [ ] Add `Booking Confirmation / Handshake Service` — **new**, implements the OnHold → `ConfirmTransport` (Accept/Reject) handshake.

## C. Technology Layer

- [ ] Add `IBM App Connect Enterprise (ACE)` (Technology Node / System Software).
- [ ] Add **Realisation:** `IBM ACE` *realises* `Regional Integration Engine (RIE)`.

## D. Data Objects

- [ ] Add `Booking Correlation Store` — **new, load-bearing.** Cross-reference `BookingId` ↔ Epic patient / referral order / encounter (Logis payload carries no PHN/MRN).
- [ ] Add `Integration Audit Log` (HIA-compliant record of each exchange).
- [ ] Add `Identity & Terminology Cross-Reference` (mapping tables consumed by the RIE services).
- [ ] **Confirm present:** `MIH Referral Order`, `MIH Appointment (Booked)` (existing; reused).

## E. Application Interfaces

- [ ] Add / keep `Epic Outbound Referral Interface` — Epic (EpicCare Orders / Bridges) → RIE.
- [ ] **Relabel** former `Logis Inbound Referral API` → **`Logis Booking API`** exposing `BookTransport` (POST/PUT), `ConfirmTransport`, `CancelTransport` (DELETE), `AttachFileToTransport`. Provider: Logis IDS; consumer: RIE-as-broker. REST/JSON, HTTP Basic auth.
- [ ] **Relabel** former `Logis Outbound Appointment Interface` → **`Logis Transport Status Callback`** exposing inbound `TransportStatusUpdate` (Logis → RIE broker endpoint), acknowledged by `TransportStatusResponse`.
- [ ] Keep `Epic Incoming Appointment Scheduling` (#5384), RIE → Epic Bridges, HL7 v2 SIU / FHIR Appointment.
- [ ] Keep `Epic Patient Lookup Web Service` (#5454), RIE → Epic.

## F. Relationships / Flows

- [ ] **Flow:** `Epic – EpicCare Inpatient Orders` → `RIE` (Epic Outbound Referral Interface) — *Send Referral*.
- [ ] **Flow:** `RIE` → `Logis IDS PRD` via **`BookTransport`** (Logis Booking API) — *referral creates booking (OnHold)*.
- [ ] **Flow:** `RIE` → `Logis IDS PRD` via **`ConfirmTransport`** — *Accept/Reject the OnHold booking* (**new handshake**).
- [ ] **Serving / Flow:** `Logis IDS PRD` → `RIE` via **`TransportStatusUpdate`** (Logis Transport Status Callback) — *status + ETA events*.
- [ ] **Flow:** `RIE` → `Logis IDS PRD` via **`CancelTransport`** — *cancel before `ArrivedAtPickup`* (and reschedule via `PUT` before `DrivingToPickup`).
- [ ] **Realisation:** `IBM ACE` realises `RIE`.
- [ ] **Composition:** `RIE` composed of the six services in §B.
- [ ] **Access:** RIE services *read/write* `Booking Correlation Store`, `Identity & Terminology Cross-Reference`; *write* `Integration Audit Log`.
- [ ] **Flow:** `RIE` → `Epic – Bridges` (Incoming Appointment Scheduling #5384).
- [ ] **Flow (routing branch):** `Bridges` → `Cadence` (Outpatient) and `Bridges` → `Grand Central/ADT` (Inpatient).
- [ ] **Association:** created Epic appointment ↔ `MIH Referral Order` / encounter (via Booking Correlation Store).

## G. Elements to Re-cast or Remove (from the original placeholder model)

- [ ] Re-cast placeholder `Logis Outbound Epic Appointment Interface` → terminates at the **RIE** (as `Logis Transport Status Callback`), not directly at Bridges.
- [ ] Re-cast placeholder `Appointment Information Exchange` → the **RIE-mediated transformation**, not a point-to-point link.
- [ ] Review placeholder `MIH Logic Appointment Information` — fold into `MIH Appointment (Booked)` / `Booking Correlation Store` or retire.

## H. Model Annotations / Notes to Capture

- [ ] Note **workflow inversion**: broker-driven booking (RIE initiates) vs. coordinator-manual booking — decision pending MIH program (SCM §6).
- [ ] Note **transport-vs-appointment** semantic mapping (home visit → A-location crew base / B-location patient) pending SME confirmation.
- [ ] Note **no-show** has no native Logis status (synthesise as `Cancelled` + reason); **reschedule** allowed only until `DrivingToPickup`.
- [ ] Note **security**: HTTP Basic auth, Logis token as password, enforce HTTPS, secure token storage/rotation in the RIE.

---

_Last Updated_: 2026-06-23
_Author_: Alec Blair (with Claude)
_Related:_ [[Epic to Logis Appointment Sync Solution Concept Model]] · [[Logis TransferSchedulingBroker Interface Assessment]] · [[CLAUDE-HSS]]
