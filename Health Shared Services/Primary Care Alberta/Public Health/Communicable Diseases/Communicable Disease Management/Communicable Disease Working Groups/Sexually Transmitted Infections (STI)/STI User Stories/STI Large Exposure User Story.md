---
type: User Story
title: STI Large Exposure User Story
description: STI Investigator capability to maintain a list of large STI exposures and create STI Communicable Disease Episodes as contacts are uniquely identified.
tags:
  - user-story
  - sti
  - communicable-disease
  - contact-tracing
timestamp: 2026-06-22T00:00:00Z
---

## Background

This is a **future-state** story. Under the current Communicable Disease Solution Architecture, CD/OM (CDOM) is being retired and STI Communicable Disease Episodes are managed in Epic Connect Care — not in CD/OM. Today STI double-documents contacts (first in the Epic [[Sexual Contacts Flowsheet]], then re-logged in CD/OM for notifiable disease reporting), which is error-prone, slows trace-back against statutory reporting timeframes, and leaves two systems of record for the same contact.

Many of these contacts originate from the [[STI Notification Form.pdf|Notification of STI form]] that community physicians submit to STI Centralized Services (STICS). In the future state, that form is processed by a Blue Prism automation that creates the notified patient as a CD Episode in Connect Care, creates the associated Contact Identifications in the Outbreak application, and raises a purchase order for any required medications in the STI pharmacy inventory management application. This story picks up where that automated intake leaves off: the STI Investigator works the seeded contact list, confirms identities, and promotes uniquely identified contacts into episodes. The upstream submission and automation are captured in the [[Community Physician STI Notification User Story]].

The goal is to eliminate the double entry by moving large-exposure contact identification onto the proposed [[Contact Identification Screen Specifications|Contact Identification Screen]] in the Outbreak Management Reporting Application (OMRA). From a single screen the STI Investigator maintains the exposed-contact list, validates identity against the provincial Client Registry, and promotes uniquely identified contacts into STI Communicable Disease Episodes in Connect Care — without re-keying into a separate notifiable-disease system.

This story follows the same contact-investigation pattern used for tuberculosis (the TB Contact List user story) and the CDC/SHE "uniquely identify individuals in outbreak" stories referenced in the [[Contact Identification Screen Specifications]].

## User Story

- **As an** STI Investigator at STI Centralized Services (STICS)
- **I need** the ability to maintain a list of "large STI exposures"
- **so that** I can add new STI Communicable Disease Episodes in Connect Care as contacts are uniquely identified, against statutory reporting timeframes, without double-documenting across separate systems.

## Scenarios

- **Scenario A — Contact within a larger outbreak.** A contact is part of a broader region outbreak with no single defined facility or source case. The investigator logs the contact against the Outbreak ID rather than a single source episode.
- **Scenario B — Source-case contact investigation, identity unconfirmed.** A specific person is known to have exposed others, but positive identification of a contact is not yet possible. The investigator records partial identifiers and tracks contact attempts until identity is confirmed or the contact is closed as unable to contact.
- **Scenario C — New Albertan with no PHN.** A contact has no Provincial Health Number. The investigator captures PHN Platinum demographic fields, flags the record as not yet Registry-validated, and proceeds with trace-back.
- **Scenario D — Contact list seeded from a physician notification.** A community physician's [[STI Notification Form.pdf|Notification of STI form]] is processed by Blue Prism, which creates the case episode in Connect Care and pre-populates the named partners/contacts as Contact Identifications. The investigator opens the seeded list and continues identity confirmation and trace-back rather than keying contacts from scratch.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Bulk contact capture against a source.** *Given* an open STI Communicable Disease Episode or Outbreak, *when* the investigator adds exposed contacts, *then* the screen allows a large number of contacts to be logged against that source, each capturing at minimum the PHN Platinum demographic fields (legal name, date of birth, legal sex, PHN where available). [Public Health Act and Communicable Diseases Regulation — notifiable disease reporting]
2. **Link to the source person's Abstract.** *Given* a contact list tied to a known source, *when* the investigator records the contact, *then* the Abstract ID of the person who exposed the contacts is captured and associated with each contact entry.
3. **Record contact attempts.** *Given* a logged contact whose identity is not yet confirmed, *when* the investigator works the record, *then* attempts to reach the individual to confirm identity can be recorded, and the Investigation Status reflects the current state (No Attempts, Attempts in progress, Unable to contact, CD Episode Created, No Exposure Determined).
4. **Trace against reporting timeframes.** *Given* an exposed contact, *when* it is tracked, *then* the contact is measured against the applicable reporting timeframe — 7 days or 30 days depending on exposure type — so overdue trace-backs are visible. [Notifiable Disease Report Manual — timeframe by exposure type, [verify section]]
5. **Promote a confirmed contact to an episode.** *Given* a uniquely identified contact, *when* the investigator promotes it, *then* a new STI Communicable Disease Episode is created in Connect Care and the returned Episode ID is recorded against the contact, with no re-keying into a separate notifiable-disease system.
6. **Privacy-conforming identity validation.** *Given* a contact with a PHN, *when* the investigator validates identity, *then* the system queries the provincial Client Registry to confirm the PHN against the Platinum fields, and demographic identifiers are exposed only to users with a need-to-know role. [Health Information Act (HIA), RSA 2000, c H-5 — use and disclosure, [verify section]]
7. **Accept automated intake from a notification.** *Given* an STI Notification Form processed by the Blue Prism automation, *when* the resulting contacts arrive on the Contact Identification Screen, *then* they appear as Contact Identifications already linked to the case episode in Connect Care, and the investigator can work them as if logged manually (edit, confirm identity, promote, close). See [[Community Physician STI Notification User Story]].
8. **Policy and procedure conformance.** *Given* any contact record, *when* it is created or reported, *then* it conforms to the governing policy and procedure:
   - [[Notifiable Disease Report Manual.pdf|Notifiable Disease Report Manual]]
   - [[hlth-phdmg-tuberculosis-2022-11.pdf|Tuberculosis Prevention and Control Guidelines]] (contact-investigation pattern reference)

### Desirable (Nice to Have)

1. **Client Registry auto-population.** When a valid PHN is entered, Platinum demographic fields auto-populate from the Client Registry rather than being keyed by hand.
2. **Overdue trace-back prompts.** Contacts approaching or exceeding their 7- or 30-day reporting timeframe are surfaced in a work queue or daily digest so none lapse silently.
3. **Duplicate detection.** When a contact matches an existing contact or episode, the record is flagged for review (Closed – Duplicate) rather than creating a parallel episode.
4. **Outbreak close-out check.** An outbreak cannot be closed until every contact entry is resolved (CD Episode Created, Unable to contact, or No Exposure Determined).

## User Story Metadata

|                              |                                                                  |
| ---------------------------- | ---------------------------------------------------------------- |
| Value Stream                 | STI Communicable Disease Episode Value Stream (STI)              |
| Value Stream Stage Workflow  | Investigate Stage Workflow (I)                                   |
| User Story ID                | STI-I-2                                                          |
| Role                         | STI Investigator (STI Centralized Services / STICS)             |
| Status                       | Analysis                                                         |
| Connect Care Build Team Link | Connect Care PPH Build Team                                      |
| Related Design Spec          | [[Contact Identification Screen Specifications]]                |
| Upstream Intake Story        | [[Community Physician STI Notification User Story]]             |
| Related Source-of-Truth      | [[Sexual Contacts Flowsheet]] (current Epic state being retired) |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation; Health Information Act (HIA), RSA 2000, c H-5 |
| Last Updated                 | June 22, 2026                                                    |
| Updated by                   | Alec Blair                                                       |

### Update Comments

- 2025-12-08: Initial story creation (Alec Blair).
- 2026-06-22: Reworked to HSS user-story standard — specific STICS persona, concrete scenarios, two-tier Given/When/Then acceptance criteria with Public Health Act / HIA traceability, Client Registry validation criterion, and links to the Contact Identification Screen design spec and Sexual Contacts Flowsheet (Alec Blair).
- 2026-06-22: Reframed as a future-state story per the current CD Solution Architecture — CD/OM is being retired and CD Episodes are managed in Connect Care. Removed the "contact of an existing episode" scenario (Alec Blair).
- 2026-06-22: Added the physician-notification intake pathway — Blue Prism processes the STI Notification Form to seed episodes and Contact Identifications. New scenario D, acceptance criterion 7, and a link to the upstream [[Community Physician STI Notification User Story]] (Alec Blair).
