---
type: User Story
title: Community Physician STI Notification User Story
description: Community physician notifies STI Centralized Services of a diagnosed STI via the Notification of STI form, which is processed by Blue Prism to create the case episode, contact identifications, and any medication purchase order.
tags:
  - user-story
  - sti
  - communicable-disease
  - notification
  - automation
timestamp: 2026-06-22T00:00:00Z
---

## Background

This is a **future-state** story describing the intake pathway that feeds STI contact investigation. Today a community physician (or other authorized health practitioner) who diagnoses a notifiable STI must notify STI Centralized Services (STICS) within 48 hours by completing and faxing/mailing the AHS [[STI Notification Form.pdf|Notification of Sexually Transmitted Infections form (AH0332)]]. STICS staff then re-key the case and named contacts into the downstream systems by hand.

In the future state, the completed form is processed by a Blue Prism automation that, from a single submission:

1. creates the notified patient as an STI Communicable Disease Episode in Epic Connect Care (from the form's Personal Identifiers and Clinical Findings);
2. creates the named partners/contacts as Contact Identifications in the Outbreak application ([[Contact Identification Screen Specifications|Contact Identification Screen]] in OMRA); and
3. raises a purchase order for any requested special or replacement medications in the STI pharmacy inventory management application.

This story owns the physician's notification capability and the end-to-end intake outcome. The downstream investigation — working the seeded contact list, confirming identities, and promoting contacts to episodes — is covered by the [[STI Large Exposure User Story]].

> **INVEST / sizing note:** the three downstream outcomes (episode creation, contact creation, medication PO) each touch a different target system and may be split into separate enabling stories for delivery. This story is written as the parent capability with acceptance criteria spanning the full intake; split before sizing if the team cannot deliver it in one increment.

## User Story

- **As a** Community Physician (or authorized health practitioner) who has diagnosed a notifiable STI
- **I need** to notify STI Centralized Services of the case by submitting the completed Notification of STI form
- **so that** the case and its named contacts are registered for partner notification and follow-up, and any required medications are supplied, within the Public Health Act's 48-hour reporting window and without STICS having to re-key my submission.

## Scenarios

- **Scenario A — Routine notification.** A physician completes the form for a diagnosed STI with no special-drug request and submits it to STICS. The automation creates the case episode in Connect Care and (if contacts are named) the Contact Identifications in the Outbreak application.
- **Scenario B — Notification with a special-drug request.** The physician indicates a special or replacement drug (e.g., long-acting benzathine penicillin 2.4 MU, gentamicin 240 mg). The automation additionally raises a purchase order in the STI pharmacy inventory management application.
- **Scenario C — Notification naming partners/contacts.** The form lists one or more partners/contacts. The automation creates each as a Contact Identification linked to the case episode for STI Investigator follow-up.
- **Scenario D — Incomplete or unprocessable form (exception path).** A required field is missing or the PHN fails validation. The automation cannot complete and routes the submission to STICS for manual handling with the reason flagged — the notification is never silently dropped.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Notification is received and queued.** *Given* a completed Notification of STI form, *when* the physician submits it to STICS, *then* it is received and queued for processing in support of the statutory reporting expectation. [Public Health Act — STI cases and contacts reported to STI Centralized Services within 48 hours (two business days)]
2. **Case episode is created in Connect Care.** *Given* a valid notification identifying a patient, *when* Blue Prism processes it, *then* an STI Communicable Disease Episode is created in Connect Care from the form's Personal Identifiers and Clinical Findings, and the submitting provider is recorded as the notification source.
3. **Contacts become Contact Identifications.** *Given* a notification that names partners/contacts, *when* it is processed, *then* each named contact is created as a Contact Identification in the Outbreak application, linked to the case episode and available to the STI Investigator. See [[STI Large Exposure User Story]].
4. **Medication purchase order is raised.** *Given* a notification requesting special or replacement drugs, *when* it is processed, *then* a purchase order for the requested medication(s) is raised in the STI pharmacy inventory management application against STICS.
5. **Collection conforms to the Health Information Act.** *Given* the form collects personal health information, *when* it is received and processed, *then* collection, use and disclosure conform to the Health Information Act. [HIA, RSA 2000, c H-5 — the form cites s. 20(b), s. 27(1)(a) and s. 27(2)]
6. **Exception handling.** *Given* an incomplete or unprocessable notification, *when* Blue Prism cannot complete any step, *then* the submission is routed to STICS for manual handling with the failure reason flagged, and no partial record is left in an inconsistent state across the three target systems.

### Desirable (Nice to Have)

1. **Receipt acknowledgement.** The submitting physician receives confirmation that the notification was received and processed (or routed for manual handling).
2. **Duplicate detection.** A notification matching an existing open episode attaches to or is flagged against that episode rather than creating a duplicate.
3. **Structured electronic submission.** A structured electronic channel replaces fax/mail and feeds the automation directly, reducing OCR/parsing error.
4. **Client Registry validation.** During processing, the patient PHN is validated against the provincial Client Registry Platinum fields before the episode is created.

## User Story Metadata

|                              |                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| Value Stream                 | STI Communicable Disease Episode Value Stream (STI)                                                  |
| Value Stream Stage Workflow  | Notify / Receive Notification Stage (N) — *stage code to confirm against value stream*               |
| User Story ID                | STI-N-1 — *provisional, pending value-stream confirmation*                                           |
| Role                         | Community Physician / Authorized Health Practitioner                                                 |
| Status                       | Analysis                                                                                             |
| Automation Platform          | Blue Prism (RPA)                                                                                     |
| Target Systems               | Connect Care (episode); Outbreak application / OMRA (Contact Identifications); STI pharmacy inventory management (medication PO) |
| Connect Care Build Team Link | Connect Care PPH Build Team                                                                          |
| Source Form                  | [[STI Notification Form.pdf]] (AHS AH0332, Rev. 2022-12)                                            |
| Related Design Spec          | [[Contact Identification Screen Specifications]]                                                     |
| Downstream Story             | [[STI Large Exposure User Story]]                                                                    |
| Regulatory Drivers           | Public Health Act (48-hour STI notification to STICS); Health Information Act (HIA), RSA 2000, c H-5 — s. 20(b), s. 27(1)(a), s. 27(2) (per form) |
| Last Updated                 | June 22, 2026                                                                                        |
| Updated by                   | Alec Blair                                                                                           |

### Update Comments

- 2026-06-22: Initial story creation. Captures the physician-notification intake and the Blue Prism automation that creates the episode (Connect Care), Contact Identifications (Outbreak application), and medication purchase order (STI pharmacy inventory). Linked to the downstream [[STI Large Exposure User Story]]. Regulatory citations taken from the AH0332 form; value-stream stage and User Story ID flagged provisional pending confirmation (Alec Blair).
