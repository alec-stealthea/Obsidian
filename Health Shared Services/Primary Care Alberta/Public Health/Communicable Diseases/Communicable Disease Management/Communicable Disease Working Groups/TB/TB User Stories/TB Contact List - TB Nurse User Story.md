---
type: User Story
title: TB Contact List - TB Nurse User Story
description: TB Nurse capability to capture the exposed contacts for an active TB source case, report total exposures, and track which contacts were identified and reached.
tags:
  - user-story
  - tb
  - tuberculosis
  - communicable-disease
  - contact-tracing
timestamp: 2026-06-22T00:00:00Z
---
## Background

Tuberculosis contact investigation is **source-case driven**: when an active TB case is confirmed, the TB Nurse works outward from that person to identify everyone who shared air space during the infectious period — household members, close social and workplace contacts, and people exposed in congregate settings (shelters, correctional facilities, continuing care, schools) or during air travel. TB contact lists are large by nature — normally **30–50 contacts**, with that range holding roughly **80% of the time** — so the screen must support high-volume capture, not one-record-at-a-time entry.

Today the TB contact list is maintained outside a structured application, which makes it hard to report total exposures for a source case, to show how many contacts could not be identified or reached, and to align consistently with PHAC and Ministry reporting guidelines. This story moves large TB contact identification onto the proposed [[Contact Identification Screen Specifications|Contact Identification Screen]] in the Outbreak Management Reporting Application (OMRA), where the nurse captures the exposed-contact list against the source case, validates identity against the provincial Client Registry, and tracks each contact's investigation status through to identification or closure.

This story follows the same contact-investigation pattern as the [[STI Large Exposure User Story]] and the CDC/SHE "uniquely identify individuals in outbreak" stories referenced in the [[Contact Identification Screen Specifications]]. It differs from the STI case in that TB is driven by a **specific source case** rather than a region outbreak, and it carries TB-specific data needs — guardian details for minors, facility/room context, flight number for air-travel exposures, and a **break-in-contact date** that anchors the follow-up window.

## User Story

- **As a** TB Nurse in Tuberculosis Prevention and Control (TB Services)
- **I need** the ability to capture the exposed contacts for a TB source case on a single contact list
- **so that** I can report the total number of exposures for that source case and track which contacts we were able to identify and reach, in conformance with PHAC and Ministry reporting guidelines.

## Scenarios

- **Scenario A — Source-case contact list (happy path).** A TB Nurse opens a confirmed active TB source case and logs the ring of exposed contacts (household, social, workplace), capturing each contact's Platinum demographic fields and the break-in-contact date that ended the exposure.
- **Scenario B — Minor contact requiring a guardian.** A contact is a minor or otherwise requires a guardian. The nurse records the parent/guardian name, phone, address, and e-mail so notification and follow-up are directed to the responsible adult.
- **Scenario C — Air-travel exposure.** Contacts were exposed aboard a flight. The nurse records the flight number (and seat/section context where known) so the contacts can be traced under PHAC air-travel contact-investigation guidance.
- **Scenario D — Large congregate-setting exposure.** A source case exposed 30–50 contacts at a facility (shelter, correctional facility, continuing care, or school). The nurse captures the facility name, room/department, and the running tally of total exposures versus contacts identified versus unable to contact.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Capture a contact against a source case.** *Given* a confirmed active TB source case, *when* the nurse adds an exposed contact, *then* the contact is logged against that source case capturing at minimum the PHN Platinum demographic fields — name, date of birth, address, phone, and legal sex. [Public Health Act and Communicable Diseases Regulation — notifiable disease reporting]
2. **High-volume contact capture.** *Given* a TB source case that commonly has 30–50 contacts, *when* the nurse works the list, *then* the screen supports logging a large number of contacts against the single source case without performance degradation or one-record-at-a-time friction.
3. **Capture guardian details for minors.** *Given* a contact who is a minor or requires a guardian, *when* the nurse records the contact, *then* parent/guardian name, phone, address, and e-mail can be captured alongside the contact's own identifiers.
4. **Capture exposure-setting context.** *Given* a contact exposed in a facility or in transit, *when* the nurse records the contact, *then* facility name, room/department, and flight number can be captured where applicable. [PHAC air-travel and congregate-setting contact-investigation guidance — [verify]]
5. **Capture the break-in-contact date.** *Given* an exposed contact, *when* the nurse records the contact, *then* the break-in-contact date (the date exposure ended) is captured to anchor the follow-up and screening window. [[Alberta Tuberculosis Policy]]
6. **Track identification and contact status.** *Given* a logged contact, *when* the nurse works the record, *then* the contact's investigation status reflects whether the contact has been identified, contact has been attempted, the contact was reached, the contact is unable to contact, or a CD Episode was created.
7. **Report exposures and unreached contacts for the source case.** *Given* a source case's contact list, *when* the nurse or a reviewer reports on it, *then* the total number of exposures and the number unable to contact are shown for that source case, supporting PHAC and Ministry reporting guidelines. [[hlth-phdmg-tuberculosis-2022-11.pdf|Tuberculosis Prevention and Control Guidelines]]
8. **Privacy-conforming handling of identifiers.** *Given* a contact record containing demographic identifiers, *when* it is viewed, *then* identifiers are exposed only to users with a need-to-know role within the TB disease group. [Health Information Act (HIA), RSA 2000, c H-5 — use and disclosure, [verify section]]
9. **Timeliness of Contact Investigation** - As per [[Chapter 11 of the Canadian Tuberculosis Standards Tuberculosis contact investigation and outbreak management|PHAC TB Contact Investigation and Outbreak Management Standards ]] In section 3.3.1 the following timing is expected:
	1. Completed Contact List created within 3-5 days[^1] from the an infectious TB episode being created.
	2. Clinical Assessment of the 'high priority' contacts be completed within seven days
	3. Contact list is closed 30 days after being created.
10. Priority of the Contact - As per the  [[Chapter 11 of the Canadian Tuberculosis Standards Tuberculosis contact investigation and outbreak management|PHAC TB Contact Investigation and Outbreak Management Standards ]] In section 4, contacts will be prioritized as high, medium or low based on the criteria elaborated in that section.

### Desirable (Nice to Have)

1. **Client Registry validation and auto-population.** When a valid PHN is entered, the system validates it against the provincial Client Registry and auto-populates the Platinum demographic fields rather than requiring manual entry.
2. **Promote a confirmed contact to an episode.** A uniquely identified contact who becomes a case can be promoted to a TB Communicable Disease Episode in Connect Care, with the returned Episode ID recorded against the contact, without re-keying into a separate system.
3. **Running exposure tally.** The screen surfaces a live count of total exposures, contacts identified, contacts reached, and contacts unable to contact for the source case, so the nurse can see investigation completeness at a glance.
4. **Follow-up window prompts.** Contacts whose screening or follow-up is due relative to their break-in-contact date are surfaced in a work queue so none lapse silently.
5. **Duplicate detection.** When a contact matches an existing contact or case, the record is flagged for review rather than creating a duplicate.

## User Story Metadata

|                              |                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Value Stream                 | TB Communicable Disease Episode Value Stream (TB)                                                                                                                  |
| Value Stream Stage Workflow  | Investigate Stage Workflow (I)                                                                                                                                     |
| User Story ID                | TB-I-1                                                                                                                                                             |
| Role                         | TB Nurse (Tuberculosis Prevention and Control / TB Services)                                                                                                       |
| Status                       | Analysis                                                                                                                                                           |
| Connect Care Build Team Link | Connect Care PPH Build Team                                                                                                                                        |
| Related Design Spec          | [[Contact Identification Screen Specifications]]                                                                                                                   |
| Related Pattern Story        | [[STI Large Exposure User Story]]                                                                                                                                  |
| Reference Material           | [[Alberta Tuberculosis Policy]]; [[hlth-phdmg-tuberculosis-2022-11.pdf\|Tuberculosis Prevention and Control Guidelines]]; [[Active Tuberculosis Case Report Form]] |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation; Health Information Act (HIA), RSA 2000, c H-5; PHAC contact-investigation guidance                           |
| Last Updated                 | June 22, 2026                                                                                                                                                      |
| Updated by                   | Alec Blair                                                                                                                                                         |

### Update Comments

- 2026-06-22: Upgraded the rough draft to the HSS user-story standard — specific TB Nurse persona, four concrete scenarios (source-case list, minor/guardian, air-travel, large congregate-setting), two-tier Given/When/Then acceptance criteria with Public Health Act / HIA / PHAC traceability, and links to the [[Contact Identification Screen Specifications]] design spec and the STI pattern story (Alec Blair).

[^1]: Note that for PHAC there is up to a 48 hour notification of a positive TB test to public health. Within Alberta and because of Connect Care access, this notice is essentially immediate.
