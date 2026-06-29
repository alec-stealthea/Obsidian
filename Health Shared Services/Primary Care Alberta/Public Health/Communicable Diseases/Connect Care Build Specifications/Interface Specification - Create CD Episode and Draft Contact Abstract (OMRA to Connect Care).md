---
type: Interface Specification
title: Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)
description: Architecture-level specification for the outbound interface that, once a contact's Provincial Health Number is validated against the Client Registry, asks Connect Care to open a Compass Rose Episode for the contact and auto-create a draft Communicable Disease Abstract pre-populated and linked to both the OMRA Contact Identification case number and the source case Abstract ID.
tags:
  - interface-specification
  - omra
  - connect-care
  - epic
  - compass-rose
  - communicable-disease
  - contact-tracing
  - integration
timestamp: 2026-06-23T00:00:00Z
---

# Interface Specification — Create CD Episode and Draft Contact Abstract (OMRA → Connect Care)

> **Direction:** OMRA → Connect Care (Epic) &nbsp;|&nbsp; **Pattern:** Investigator-triggered, with ULI validation gate and error queue &nbsp;|&nbsp; **Status:** Draft for working-group review

This is the second of the two information exchanges connecting the Contact Identification Investigation to Connect Care. The first — [[Interface Specification - Open Contact Identification from CD Abstract (Connect Care to OMRA)|Open Contact Identification from CD Abstract (Connect Care → OMRA)]] — establishes the investigation from the source case abstract. This exchange closes the loop: once a contact has a **validated Provincial Health Number**, OMRA asks Connect Care to open a **Compass Rose Episode** for that contact and, where possible, to auto-create a **draft Communicable Disease Abstract** pre-populated and linked back to both the OMRA Contact Identification case number and the source case Abstract ID.

> **Naming note.** Per [[CLAUDE-OMRA]], *OMRA* / *AOMS* / *OMRA* are the same system; **OMRA** is used throughout.

---

## 1. Purpose and Context

In the [[Contact Identification Screen Specifications|Create Contact Identification Investigation List]], the investigator works each contact row, runs **Query PHN** to validate identity against the provincial Client Registry, and — for a uniquely identified contact — presses **Create Episode**. This interface is what Create Episode invokes. It realizes two interfaces already named in the [[Communicable Disease Solution Architecture]]: the *Inbound Create CD Episode and Draft Abstract* interface (Connect Care side) and the *Outbound Communicable Disease Episode information exchange* (Outbreak-application side), here applied to a single identified contact rather than a line-list batch.

The design intent follows the [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association|episode-creation SBAR]]: create a CD Episode in Connect Care for every uniquely identified contact, with an episode status that distinguishes a *contact investigation / rule-out* from a *confirmed / probable case*, so the rule-out evidence (a diagnostic result, or documented immunity for a vaccine-preventable disease) lives in the clinical system of record. **Client Registry validation precedes episode creation** to avoid duplicate Connect Care patient records — which is exactly why this exchange is gated on a validated PHN.

The "if possible, also create a draft Abstract" intent realizes the architecture's **Communicable Disease Abstract Linking** feature: the contact's draft abstract records the identifier of the *exposing* person's abstract, so the exposure chain is captured without putting identifiable exposure information on the contact's own chart.

## 2. Interface Summary

| Attribute | Value |
|---|---|
| **Source system** | OMRA — Create Contact Identification Investigation List (per-contact Create Episode action) |
| **Target system** | Connect Care (Epic) — Compass Rose episode + Communicable Disease Abstract (CDC / SHE / TB / STI) |
| **Trigger** | Investigator presses **Create Episode** on a contact row whose PHN is Registry-validated |
| **Direction** | Outbound from OMRA (inbound to Connect Care) |
| **Pattern** | Investigator-triggered message; ULI/identity check on the Connect Care side; mismatches routed to an **error queue** for monitoring |
| **Gate** | A **validated Provincial Health Number** (`registryValidated = true`) is required before the message is sent |
| **Outcome** | A Compass Rose Episode is created for the contact; a draft CD Abstract is created and linked (target state); Episode ID (and Abstract ID) returned to OMRA |

## 3. Trigger and Preconditions

The exchange fires when the investigator presses **Create Episode** on a contact. Preconditions:

- The contact's **PHN is validated** against the Client Registry — i.e., Query PHN has returned a confirmed match and set `ContactIdentification.registryValidated = true`. This is the hard gate; see §6.
- The contact's disease group and the **target Compass Rose episode type** are determinable (CDC, SHE, TB, or STI), since each team has its own Compass Rose build and abstract variant.
- The **source case Abstract ID** is known from the investigation header (carried in by the [[Interface Specification - Open Contact Identification from CD Abstract (Connect Care to OMRA)|first exchange]]), so the draft abstract can be linked back to the exposing case.

## 4. Information Exchanged (conceptual)

Architecture-level — field-level payload and flowsheet mapping are deferred to the build. The outbound message conveys:

- **Validated PHN / ULI** and the **Platinum demographic set** (name, date of birth, address, etc.) that the Client Registry confirmed, so Connect Care can resolve the patient without re-validating from scratch.
- **Disease(s) and target episode type** — enough to select the correct CDC / SHE / TB / STI **Compass Rose episode type** and the matching abstract variant.
- **OMRA Contact Identification case number** — `ContactIdentification.contactIdentificationID`, written onto the draft abstract so the episode points back to the originating contact record.
- **Source case Abstract ID** — the exposing person's abstract identifier (the OMRA *Source Case ID* / `indexCaseAbstractID`), written onto the contact's draft abstract to realize abstract-to-abstract exposure linking.
- **Optional Outbreak ID** — if the contact list is under an outbreak, so the resulting episode/abstract can carry the outbreak association.
- **Initial episode status hint** — *contact investigation / rule-out*, per the SBAR taxonomy, so the new episode is not counted as a notifiable case until evidence warrants.

Connect Care returns, on success: the **Episode ID** and (target state) the **draft Abstract ID**, plus identity-resolution status. OMRA stores the Episode ID in `ContactIdentification.epicEpisodeID`, the abstract in `promotedAbstractID` → `EpicAbstract`, advances **Investigation Status** to *CD Episode Created*, and logs the transition in `ContactInvestigationLifecycle` carrying the `EpicAbstract` link.

## 5. Process Narrative

With the contact's PHN already validated, the investigator presses **Create Episode**. OMRA assembles the message (validated PHN/ULI and Platinum fields, disease/episode type, the Contact Identification case number, the source case Abstract ID, optional Outbreak ID, and the rule-out status hint) and sends it to Connect Care. Connect Care performs its **ULI / identity check**: on a clean match it resolves (or creates, pending positive identification) the patient, opens the appropriate **Compass Rose Episode** for the contact, and — in the target state — auto-creates a **draft Communicable Disease Abstract** pre-populated from the message, stamping it with the Contact Identification case number and the source case Abstract ID for full linking. When the episode is created, its configured Compass Rose **Targets and Tasks are added automatically** per the episode type (see the *Compass Rose Tasks Setup and Support Guide* in this folder). Connect Care returns the Episode ID (and draft Abstract ID); OMRA records them against the contact, sets Investigation Status to *CD Episode Created*, and writes the lifecycle transition with the abstract link. If the identity check does not cleanly resolve, the message is routed to an **error queue** for the build/integration team to reconcile (see §7).

## 6. Business Rules

- **Validated-PHN gate.** Create Episode is available only when `registryValidated = true`. A contact without a confirmed PHN (e.g., a new Albertan) cannot be promoted until Query PHN succeeds — this enforces the SBAR rule that Client Registry validation precedes episode creation, preventing duplicate Connect Care patient records.
- **One episode per uniquely identified contact**, with status distinguishing *contact investigation / rule-out* from *case* (SBAR Alternative 2). The non-case status keeps the new episode out of notifiable-case and incidence counts.
- **No duplicate promotion.** A contact already at *CD Episode Created* is not re-promoted; duplicates are handled as *Closed – Duplicate* in OMRA rather than creating a parallel episode.
- **Episode-to-outbreak association.** A CD Episode associates to exactly one owning Outbreak node; cluster-direct ownership and identifier preservation follow the SBAR's coupled design rule and `ContactOutbreakLink`.
- **Abstract linking.** Where the draft abstract is created, it must carry both the Contact Identification case number and the source case Abstract ID, so the exposing-case → contact chain is complete and auditable.
- **Privacy.** For HIV/STI contacts, the disease-group privacy boundary applies; confirm the HIA minimal-collection position for creating clinical episodes on contacts who are not yet cases (SBAR open item).

## 7. Exception Handling

- **ULI / identity mismatch on the Connect Care side** → the message is routed to a monitored **error queue** rather than silently creating a mismatched or duplicate patient; the OMRA contact stays unpromoted (Investigation Status unchanged) until reconciled. This error queue is explicitly anticipated in the [[Communicable Disease Solution Architecture|Inbound Create CD Episode interface]].
- **Create Episode interface failure / timeout** → do not lose the contact; surface the error in OMRA, leave Investigation Status unchanged, and allow retry without creating a duplicate episode ([[Contact Identification Screen Specifications]], §6).
- **Episode created but draft Abstract creation fails** → the "create episode" and "create draft abstract" outcomes should be separable so a successful episode is not rolled back; OMRA records the Episode ID and flags the abstract as pending, allowing the abstract to be created or completed manually in Connect Care.
- **Patient not positively identified** → the architecture allows using the Epic MRN to create a patient ID pending final positive identification; confirm whether OMRA should mark such episodes provisional until identification is confirmed.
- **PHN gate not met** (validation lost or stale) → Create Episode is blocked; the investigator must re-run Query PHN.

## 8. Linking and Traceability

This exchange completes the lineage that the [[Interface Specification - Open Contact Identification from CD Abstract (Connect Care to OMRA)|first exchange]] began. The source case Abstract ID seeded into the OMRA investigation header is written back onto the contact's draft abstract, and the OMRA Contact Identification case number ties the new episode to its originating contact record. On the OMRA side, the promotion is recorded across `ContactIdentification` (`epicEpisodeID`, `promotedAbstractID`), `ContactInvestigationLifecycle` (status transition carrying the `EpicAbstract` link), and `AuditLog`. The result is an end-to-end, auditable chain — source case abstract → contact identification → contact episode/abstract — with the clinical record (episode, rule-out evidence) held in Connect Care as the system of record, and the contact list and investigation lifecycle held in OMRA.

## 9. Open Questions

- **Draft Abstract automation feasibility** — confirm with the Connect Care PPH build team whether the abstract can be auto-created and pre-populated at episode creation, or whether the interface creates the episode only and the abstract is created on first documentation. ("If possible" is the stated intent.)
- **Episode-status taxonomy** — agree the *investigation / rule-out* vs. *case* status values with the Connect Care build team and Surveillance / Epidemiology so counts stay correct (SBAR open item).
- **Episode type selection** — confirm the mapping from OMRA disease group to the specific Compass Rose episode type and abstract variant for CDC, SHE, TB and STI.
- **Identity creation policy** — confirm the rule for contacts identified by MRN pending final positive identification, and whether such episodes are flagged provisional.
- **Transport and timing** — confirm whether this is the flowsheet-based inbound interface described in the architecture and whether near-real-time return of the Episode ID is required (vs. the *Sent for CD Episode?* latency flag pattern used for line lists).
- **Promotion authorization** — confirm whether Create Episode is restricted to a subset of investigators ([[Contact Identification Screen Specifications]], Access Specifications).

## 10. Related Architecture and References

- [[Communicable Disease Solution Architecture]] — *Inbound Create CD Episode and Draft Abstract*, *Outbound Communicable Disease Episode information exchange*, *Outbound ULI API*, and the Communicable Disease Abstract Linking concept.
- [[Contact Identification Screen Specifications]] — Query PHN and Create Episode actions, Investigation/Record status, exception handling, and the `epicEpisodeID` / `promotedAbstractID` mappings.
- [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association]] — episode-per-contact decision, status taxonomy, Client-Registry-before-episode rule, and episode-to-outbreak/cluster association.
- [[OMRA Database ERD]] — `ContactIdentification` and `ContactInvestigationLifecycle` (Section 15), `EpicAbstract` (Section 11), `ClientRegistryTransaction` (Section 6).
- `Compass Rose Tasks Setup and Support Guide.pdf` (Epic, this folder) — Compass Rose episode types, Targets and Tasks, and automatic add/resolve behaviour on episode creation/resolution.
- [[Communicable Disease Solution Concept Model]] — CD Episode "Confirm/Investigate" stages (create new CD episode; review new CD episodes).
- [[CLAUDE-OMRA]] — data-ownership boundaries; Client Registry (EMPI) used for PHN/ULI validation.

## 11. Version History

- **Last Update**
  - **June 23, 2026 (Alec Blair / Enterprise Architecture, Health Shared Services)** — Initial architecture-level draft of the OMRA → Connect Care exchange that, on a validated PHN, creates a Compass Rose Episode and auto-populated draft contact abstract linked to the Contact Identification case number and the source case Abstract ID. Drawn from the [[Communicable Disease Solution Architecture]] inbound/outbound interface set, the [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association|episode-creation SBAR]], the [[Contact Identification Screen Specifications]], and the Compass Rose setup guide in this folder.
- **Link to Jira Task** — _to be added_
- **Specifications Status** — Draft for working-group review
- **Linked SBARs** — [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association]]
- **Companion Interface** — [[Interface Specification - Open Contact Identification from CD Abstract (Connect Care to OMRA)]]

---

_Source attribution: inbound/outbound interface definitions and abstract-linking concept from [[Communicable Disease Solution Architecture]]; promotion behaviour, ULI/error-queue handling, and field mappings from [[Contact Identification Screen Specifications]]; episode-per-contact decision and validation-before-episode rule from [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association]]; data model from [[OMRA Database ERD]] (Sections 6, 11, 15); Compass Rose episode/Target/Task setup from `Compass Rose Tasks Setup and Support Guide.pdf` (Epic, May 21 2026) in this folder. Governed by the Health Information Act (HIA) and the Public Health Act._
