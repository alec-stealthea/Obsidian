---
type: User Story
title: Document Facility Outbreak Phone Encounter - PPHST Call Analyst User Story
description: Population and Public Health Support Team (PPHST) Call Analyst capability to document the initial investigation of a facility outbreak phone encounter so the call can be triaged and transitioned to a SHE or CDC Outbreak Investigator.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - pphst
  - call-centre
timestamp: 2026-06-26T00:00:00Z
---

## Background

The **Population and Public Health Support Team (PPHST)** operates the call centre that fields inbound calls from facility operators reporting suspected communicable-disease activity. A PPHST **Call Analyst** (Call Taker) takes the call, confirms whether the facility appears to be in an outbreak situation, provides setting-appropriate guidance from the published outbreak-prevention material for that care setting, and documents what was discussed. The encounter ends in one of two dispositions: advice to the caller that no further Public Health follow-up is required, or a referral to Public Health for further investigation.

This story is the **front-door / intake** capability of the Outbreak Value Stream. It sits at the **Confirm (C)** stage — the call analyst confirms whether the reported event warrants investigation — and feeds the downstream investigator work: the [[Outbreak Assessment - CDC Investigator User Story|Assess (O-A-6)]] and [[02 - Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak (O-A-4)]] stories begin from the referral this encounter produces. It is the first **PPHST Call Analyst** story in the CDC set; the related [[Submit Facility Outbreak Line List - Facility Operator User Story|Submit Facility Outbreak Line List (O-ET-1)]] story covers the operator's own line-list submission, which a call analyst may instead receive and attach on the operator's behalf during the call.

The call is handled in the call-centre tooling — **Genesys** (the telephony / contact-centre platform) and **Epic Cheers** (Epic's CRM module) — which capture the call log; the structured outbreak referral and any attached line list are what transition into **OMRA** for the investigator. Connect Care remains the system of record for individual cases (see [[CLAUDE-OMRA]] data-ownership boundaries); the PPHST encounter record is coordination/triage metadata that becomes the parent context an investigator picks up.

> **Note on "SHE".** The source refers to handoff to a "SHE or CDC Outbreak Investigator." **SHE** is **Safe and Healthy Environments** (also known as **Environmental and Public Health**) — the environmental-health investigator function — distinct from the CDC Outbreak Investigator. The encounter may be referred to either team depending on the suspected exposure source and setting.

> **Note on the Story ID.** This story is provisionally carried as **O-C-[TBD]** on the **Confirm (C)** stage (the same provisional-numbering treatment used for [[Create Exposure Incident ID - CDC Investigator User Story]]). It precedes the Assess-stage stories O-A-4 and O-A-6 in the value-stream flow; the sequence number is to be assigned when the Confirm-stage stories are reconciled.

## User Story

- **As a** Population and Public Health Support Team (PPHST) Call Analyst
- **I need** the ability to document the initial investigation of a facility outbreak phone encounter
- **so that** I can transition that information to a SHE or CDC Outbreak Investigator (or close the call where no further Public Health follow-up is required).

## Scenarios

- **Scenario A — Refer for investigation (happy path).** A continuing-care home operator calls to report a cluster of gastrointestinal illness. The analyst logs the call in Genesys / Epic Cheers, documents the initial investigation details, provides guidance from the [[Guide for Outbreak Prevention & Control in Continuing Care Homes|Continuing Care Homes outbreak guide]], records the assessment and the teaching delivered, attaches the line list the facility emails during the call, advises the operator of the expected investigator response time, and refers the encounter to the appropriate CDC investigator team.
- **Scenario B — Advise, no further follow-up.** A child-care operator calls about a single mild illness that, on assessment, does not meet an outbreak threshold. The analyst documents the assessment and the guidance given (from the [[Guide for Outbreak Prevention & Control in Child Care Facilities|Child Care Facilities outbreak guide]]), records the disposition as **no further Public Health follow-up required**, and closes the call without a referral.
- **Scenario C — Line list provided.** During the call the operator already has a line list ready. The analyst uploads/attaches it to the encounter so it travels with the referral, rather than asking the operator to re-submit through the [[Submit Facility Outbreak Line List - Facility Operator User Story|O-ET-1 operator channel]].
- **Scenario D — Setting-specific guidance.** The caller is from an acute-care site / school / shelter / supportive-living / correctional setting. The analyst surfaces the matching setting-specific outbreak guide and advises accordingly, so the guidance reflects the right care setting.
- **Scenario E — Route to the right investigator team.** The analyst determines the encounter belongs to a specific SHE or CDC investigator team (by zone / setting / disease) and shares the documented encounter with that team so the right investigator picks it up.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Capture the call log in the call-centre tooling.** *Given* an inbound facility outbreak call, *when* the analyst handles it, *then* the call is logged using **Genesys** and **Epic Cheers** (CRM), confirming the call-capture system of record for the encounter. [Confirm Genesys / Epic Cheers integration boundary with OMRA — see Dependencies]
2. **Document the initial investigation of the encounter.** *Given* a facility outbreak call, *when* the analyst works through it, *then* the analyst can record the structured initial-investigation details (facility / care setting, reported signs and onset, who is affected — residents/clients vs. staff, and the caller's contact details) so the encounter can be triaged and handed off. [[Outbreak Assessment - CDC Investigator User Story]]; [Public Health Act & Communicable Diseases Regulation — outbreak reporting]
3. **Document the assessment and the status of teaching delivered by PPHST.** *Given* the encounter, *when* the analyst provides setting-appropriate guidance, *then* the analyst can record the **assessment outcome** and the **status of teaching** given to the caller, drawing on the published material for that care setting: [[Guide for Outbreak Prevention & Control in Continuing Care Homes]], [[Guide for Outbreak Prevention & Control in Acute Care Sites]], [[Guide for Outbreak Prevention & Control in Child Care Facilities]], [[Guide for Outbreak Prevention & Control in Schools]], [[Guide for Outbreak Prevention & Control in Supportive Living Accommodations]], [[Guide for Outbreak Prevention & Control in Shelter Sites]], [[Guide for Outbreak Prevention & Control in Correctional Centres]]. *(Raised by Jessica.)*
4. **Record the call disposition (refer vs. close).** *Given* a completed assessment, *when* the analyst closes the encounter, *then* the analyst can set one of two outcomes — **no further Public Health follow-up required**, or **referral to Public Health for further investigation** — and a closed-with-advice encounter does not generate a referral. *(Raised by Jessica.)* [[Outbreak Assessment - CDC Investigator User Story]]
5. **Share / transition the encounter to the appropriate SHE or CDC investigator team.** *Given* a referral disposition, *when* the analyst routes it, *then* the documented encounter (and any attachment) is shared with the appropriate investigator team — **Safe and Healthy Environments (SHE / Environmental and Public Health)** or the **CDC Outbreak Investigator** team, depending on suspected exposure source and setting — so they can begin the assessment / create-outbreak work. [[02 - Create Outbreak Investigation - CDC Investigator User Story]]; [[Create Outbreak Investigation Screen Specifications]]
6. **Upload or attach a facility-provided line list.** *Given* a facility that supplies a line list during the call, *when* the analyst documents the encounter, *then* the analyst can **upload or attach** that line list to the encounter so it transitions with the referral. *(This is the call-taker-mediated path; the operator-submitted path is [[Submit Facility Outbreak Line List - Facility Operator User Story|O-ET-1]].)* [[OMRA Database ERD]]
7. **Advise the facility of investigator response time.** *Given* a referral, *when* the analyst closes the call, *then* the analyst can advise the facility operator of the expected **investigator response time** for that setting / priority, and that advice is recorded on the encounter.
8. **Privacy-conforming documentation and audit.** *Given* the create/edit and share actions on the encounter, *when* they are performed, *then* they are scoped to the analyst's authorized team / zone per the OMRA access model and audited (actor, timestamp, before/after). The encounter may carry personal and personal-health information collected during the call. [Health Information Act (HIA), RSA 2000, c H-5 — collection, use and disclosure, [verify section]]; [[User Maintenance Screen Specifications]]

### Desirable (Nice to Have)

1. **Setting-driven guidance prompts.** Selecting the care setting surfaces the matching outbreak-prevention guide and a checklist of key teaching points, so the analyst delivers consistent setting-specific guidance without manual lookup.
2. **Structured teaching-status and disposition codes.** The assessment / teaching status (AC3) and the refer-vs-close disposition (AC4) offer pick-lists (e.g., teaching complete / partial / declined; no-follow-up reason codes) with a free-text note, to support consistent reporting.
3. **Pre-populate the referral from the encounter.** A referral disposition pre-populates the downstream [[02 - Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak]] / [[Outbreak Assessment - CDC Investigator User Story|Assessment]] record from the encounter, so the investigator does not re-key the intake details.
4. **Response-time SLA lookup.** The investigator response time advised in AC7 is derived from a configurable SLA table by setting / disease / priority, rather than analyst recall.
5. **Encounter timeline / handoff trail.** The encounter retains a timeline of its key events (logged → assessed → disposition → referred/closed) with actor and timestamp, so the triage trail is visible without reading the audit log.

## Dependencies

- **Referral mechanism from Genesys / Epic Cheers (CD-OI-14).** How the Genesys / Epic Cheers call log and any attached line list transition into OMRA and the SHE / CDC investigator teams (manual hand-off, interface, or shared record), and where the structured referral lives, is an open design decision tracked as **CD-OI-14** in [[Communicable Disease Open Issues]]. This determines whether AC2–AC7 are captured in the CRM, in OMRA, or split.
- **CDC Facility Operator submission story (O-ET-1).** AC6 (attach a line list) is the call-taker-mediated counterpart to the operator-submitted [[Submit Facility Outbreak Line List - Facility Operator User Story|O-ET-1]] channel; keep the two attach paths consistent.
- **Downstream investigator stories (O-A-4 / O-A-6).** The referral produced here feeds [[02 - Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak (O-A-4)]] and [[Outbreak Assessment - CDC Investigator User Story|Assessment (O-A-6)]]; confirm the referral payload matches what those stories expect to consume.
- **Story ID assignment.** Provisional **O-C-[TBD]** (Confirm stage) — assign the sequence number when the Confirm-stage stories are reconciled (tracked alongside [[Create Exposure Incident ID - CDC Investigator User Story]]).
- **Encounter / referral ERD entity.** Confirm whether a PPHST encounter / referral entity exists in the [[OMRA Database ERD]] or must be added to carry the intake metadata, teaching status, disposition, and line-list attachment.

## User Story Metadata

|                              |                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                                    |
| Value Stream Stage Workflow  | Confirm (C)                                                                                                                                     |
| User Story ID                | O-C-[TBD]                                                                                                                                       |
| Role                         | Population and Public Health Support Team (PPHST) Call Analyst                                                                                  |
| Status                       | Analysis                                                                                                                                        |
| Build Team(s)                | Outbreak Application Team                                                                                                                        |
| Related Design Spec          | [[Create Outbreak Investigation Screen Specifications]]; [[OMRA Database ERD]]                                                                  |
| Related Pattern Story        | [[Outbreak Assessment - CDC Investigator User Story]]; [[Submit Facility Outbreak Line List - Facility Operator User Story]]; [[02 - Create Outbreak Investigation - CDC Investigator User Story]] |
| Reference Material           | [[CLAUDE-OMRA]]; [[CLAUDE-CDC]]; [[User Maintenance Screen Specifications]]; setting-specific Outbreak Prevention & Control guides              |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation; Health Information Act (HIA), RSA 2000, c H-5                                              |
| Link to System Design Doc    | [Link — TBD]                                                                                                                                    |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                                    |
| Last Updated                 | June 26, 2026                                                                                                                                   |
| Updated by                   | Alec Blair                                                                                                                                      |

### Update Comments

- 2026-06-26: Alec Blair — created from working notes and migrated into the HSS user-story standard. Added Background, five concrete scenarios (refer, advise-no-follow-up, line-list provided, setting-specific guidance, route to investigator team), two-tier Given/When/Then acceptance criteria with Public Health Act / HIA traceability, and a Dependencies section. Incorporated the source acceptance points (Genesys / Epic Cheers call log; share with SHE or CDC investigator; upload/attach line list; advise investigator response time) and Jessica's additions (document assessment and status of PPHST teaching; refer-vs-close disposition). Linked the seven setting-specific Outbreak Prevention & Control guides as the source material for AC3 guidance. Set stage to **Confirm (C)** with provisional ID **O-C-[TBD]**; flagged the "SHE" role definition and the Genesys/Epic Cheers ↔ OMRA integration boundary as open dependencies.
