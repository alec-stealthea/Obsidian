---
type: Interface Specification
title: Interface Specification - Open Contact Identification from CD Abstract (Connect Care to OMRA)
description: Architecture-level specification for the inbound interface that lets an investigator working a source case's Communicable Disease Abstract in Connect Care press a button to open a Contact Identification Investigation in OMRA, seeded with the source case Abstract ID and disease context.
tags:
  - interface-specification
  - omra
  - connect-care
  - epic
  - communicable-disease
  - contact-tracing
  - integration
timestamp: 2026-06-23T00:00:00Z
---

# Interface Specification — Open Contact Identification from CD Abstract (Connect Care → OMRA)

> **Direction:** Connect Care (Epic) → OMRA &nbsp;|&nbsp; **Pattern:** Investigator-triggered, near-real-time &nbsp;|&nbsp; **Status:** Draft for working-group review

This is the first of the two information exchanges that connect the source case's **Communicable Disease Abstract** in Connect Care to the **Create Contact Identification Investigation List** in OMRA. It establishes the contact investigation. The companion exchange — [[Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)|Create CD Episode and Draft Contact Abstract (OMRA → Connect Care)]] — closes the loop by promoting an identified contact back into a Connect Care episode and abstract.

> **Naming note.** Per [[CLAUDE-OMRA]], the application is now **OMRA** (Outbreak Management Reporting Application); the earlier names *OMRA* and *AOMS* refer to the same system. OMRA is used throughout this specification.

---

## 1. Purpose and Context

When a Notifiable Disease Investigator is working a confirmed source case inside Connect Care — documenting the case on its [[Communicable Disease Solution Architecture|Communicable Disease Abstract]] — they reach the point in the [[Communicable Disease Solution Concept Model|CD Episode "Investigate" stage]] where exposed contacts must be identified and traced. Today that hand-off is manual: the investigator re-keys the source case and disease context into a separate contact list. This interface replaces that re-keying with a **button on the Communicable Disease Abstract** that opens a Contact Identification Investigation in OMRA, already seeded with the source case's identifiers and disease(s).

The receiving surface in OMRA is the **Create Contact Identification Investigation List** — its list header carries the *Source Case ID*, *Disease*, and outbreak context that this interface populates (see [[Contact Identification Screen Specifications]], list-header fields). By seeding the list from the abstract rather than by hand, the source-case → contact lineage is captured automatically and accurately from the outset.

This exchange operationalizes the **source-case-driven contact investigation** scenario (Scenario Condition 2 in [[Contact Identification Screen Specifications]]) and extends the documented [[Communicable Disease Solution Architecture|Connect Care interface set]] with an explicit "open the contact investigation from the abstract" trigger.

## 2. Interface Summary

| Attribute | Value |
|---|---|
| **Source system** | Connect Care (Epic) — Communicable Disease Abstract (CDC / SHE / TB / STI variant) |
| **Target system** | OMRA — Create Contact Identification Investigation List |
| **Trigger** | Investigator presses a "Start Contact Investigation" button on the source case's CD Abstract |
| **Direction** | Inbound to OMRA |
| **Pattern** | Investigator-triggered message, processed in near-real-time so the investigator can switch to OMRA and continue |
| **Primary actor** | Notifiable Disease Investigator (TB / STI / CDC / SHE), within their disease group |
| **Outcome** | A Contact Identification Investigation List exists (or is reopened) in OMRA, keyed to the source case and disease, ready for contact capture |

## 3. Trigger and Preconditions

The exchange fires when the investigator, on a source case abstract that is already established in Connect Care, chooses to begin contact tracing. Preconditions:

- The source case has a **Communicable Disease Abstract** in Connect Care with a stable **Abstract ID** (this becomes the source/index reference in OMRA).
- The disease (or diseases) under investigation is known on the abstract, since it drives the disease-specific contact questions and the privacy boundary in OMRA.
- The investigator is authorized in OMRA for the relevant **disease group** and team (the HIV/STI disease group is a privacy boundary — see [[User Maintenance Screen Specifications]]).

## 4. Information Exchanged (conceptual)

Architecture-level — field-level payload mapping is deferred to the build. The message conveys enough to seed the OMRA list header and establish the lineage:

- **Source case Abstract ID** — the unique identifier of the exposing person's CD Abstract. In OMRA this lands as the *Source Case ID* and persists as `ContactIdentification.indexCaseAbstractID` → `EpicAbstract`, anchoring every contact to the case that exposed them.
- **Disease(s)** — the notifiable disease(s) on the abstract, which set the OMRA list-header *Disease* and drive the disease-specific question set and privacy handling.
- **Source case / episode context (supporting)** — enough patient/episode reference (e.g., Episode ID, abstract type/variant) for OMRA to label the investigation and, later, to reconcile the return episode. Identifiable demographics are kept to the minimum needed to open the list, consistent with the HIA minimal-collection position noted in the [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association|episode-creation SBAR]].
- **Optional outbreak association** — if the source case is already tied to an outbreak, the Outbreak ID can accompany the message so the contact list is created under that outbreak rather than as a standalone source-case list.

OMRA acknowledges with the **Contact Identification list identifier** it created (or matched), so Connect Care can show the investigator that the investigation is open.

## 5. Process Narrative

The investigator presses **Start Contact Investigation** on the source case abstract. Connect Care assembles the message (source Abstract ID, disease(s), supporting case context, optional Outbreak ID) and sends it to OMRA. OMRA resolves the target list: if a Contact Identification Investigation already exists for that source Abstract ID it is reopened rather than duplicated; otherwise a new list is created with its header populated from the message — *Source Case ID*, *Disease*, and outbreak context — and *Created* stamped in the audit record. OMRA returns the list identifier, and the investigator moves into OMRA to begin capturing contacts. From there, the per-contact workflow (Query PHN, then Create Episode) is governed by the [[Contact Identification Screen Specifications]] and the companion [[Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)|OMRA → Connect Care exchange]].

## 6. Business Rules

- A contact investigation must be anchored to a valid source — here, a **source case Abstract ID** — consistent with the OMRA rule that a contact be logged against an Outbreak ID and/or a Source Case / Abstract ID ([[Contact Identification Screen Specifications]], §5).
- **Idempotency:** repeated presses for the same source Abstract ID resolve to the same OMRA list, not duplicate lists.
- **Disease drives downstream behaviour:** the disease(s) carried on the message determine the OMRA disease-specific question set and the privacy boundary; a disease must be present.
- **Privacy boundary:** for HIV/STI source cases, the opened list inherits the disease-group privacy boundary and is visible only to authorized investigators.

## 7. Exception Handling

- **OMRA unavailable / message not delivered** → the abstract button surfaces a clear failure and allows retry; no partial list is created. The source case abstract is unchanged.
- **Source Abstract ID already has an open list** → reopen and return the existing list (no duplicate); inform the investigator it already existed.
- **Missing disease on the abstract** → the interface should warn before sending, since the disease is required to seed the list; alternatively OMRA opens the list with disease unset and flags it for the investigator to complete.
- **Authorization mismatch** (investigator not entitled for that disease group in OMRA) → OMRA declines to open the list and returns an authorization error rather than creating an inaccessible record.

## 8. Linking and Traceability

This exchange establishes the **upstream half** of the source-case → contact lineage that the architecture's [[Communicable Disease Solution Architecture|Communicable Disease Abstract Linking]] concept depends on. The source case Abstract ID captured here (`ContactIdentification.indexCaseAbstractID`) is the same identifier that the companion exchange writes onto each promoted contact's draft abstract, so the "who exposed whom" chain is preserved end to end. Every contact subsequently captured on the list inherits this source reference, and the list creation is recorded in the OMRA `AuditLog`.

## 9. Open Questions

- **Source link granularity** — confirm whether the source reference should be the **Abstract ID** or the **Episode ID** (the screen spec flags the same question for the *Source Case ID* field). The abstract is the working assumption here.
- **Single vs. multiple diseases** — confirm whether one abstract can launch a contact investigation spanning more than one disease, or whether each disease opens a separate list.
- **Outbreak vs. standalone** — confirm the default when the source case is not yet tied to an outbreak: standalone source-case list, or auto-create a minimal outbreak shell.
- **Trigger placement** — confirm with the Connect Care PPH build team where the button lives on each abstract variant (TB / STI / CDC / SHE) and whether it is gated by abstract status.
- **Transport** — confirm whether this rides the same flowsheet/interface channel described for the inbound episode interface, or a separate lightweight call.

## 10. Related Architecture and References

- [[Communicable Disease Solution Architecture]] — *Connect Care Interfaces* and *Outbreak Management Application Interfaces* (the documented interface set this exchange extends).
- [[Communicable Disease Solution Concept Model]] — CD Episode "Investigate" stage (add/update new contact) and Outbreak "Exposure Trace" stage.
- [[Contact Identification Screen Specifications]] — the receiving OMRA screen; list-header fields, source-case scenario, and `ContactIdentification.indexCaseAbstractID` mapping.
- [[OMRA Database ERD]] — `ContactIdentification` (Section 15) and `EpicAbstract` (Section 11).
- [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association]] — episode-per-contact decision and HIA minimal-collection position.
- [[User Maintenance Screen Specifications]] — disease-group privacy boundary and investigator authorization.
- [[CLAUDE-OMRA]] — data-ownership boundaries (Connect Care is system of record for individual cases; OMRA owns contact lists).

## 11. Version History

- **Last Update**
  - **June 23, 2026 (Alec Blair / Enterprise Architecture, Health Shared Services)** — Initial architecture-level draft of the Connect Care → OMRA exchange that opens a Contact Identification Investigation from a button on the source case CD Abstract. Drawn from the [[Communicable Disease Solution Architecture]] interface set and the [[Contact Identification Screen Specifications]] source-case scenario.
- **Link to Jira Task** — _to be added_
- **Specifications Status** — Draft for working-group review
- **Linked SBARs** — [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association]]
- **Companion Interface** — [[Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)]]

---

_Source attribution: Connect Care interface set and abstract-linking concept from [[Communicable Disease Solution Architecture]]; receiving-screen behaviour and field mappings from [[Contact Identification Screen Specifications]]; data model from [[OMRA Database ERD]] (Sections 11 and 15); Compass Rose episode concepts from `Compass Rose Tasks Setup and Support Guide.pdf` (Epic, May 21 2026) in this folder. Governed by the Health Information Act (HIA) and the Public Health Act._
