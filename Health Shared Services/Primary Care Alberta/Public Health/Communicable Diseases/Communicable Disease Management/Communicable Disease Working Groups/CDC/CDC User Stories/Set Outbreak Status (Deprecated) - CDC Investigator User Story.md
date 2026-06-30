---
type: User Story
title: Set Outbreak Status (Deprecated) - CDC Investigator User Story
description: Deprecated CDC Investigator story for setting an outbreak investigation to Active / Not an Outbreak; approved for merge into the Create Outbreak Investigation and Outbreak Assessment stories.
status: Deprecated
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - deprecated
timestamp: 2026-06-26T00:00:00Z
---

> [!warning] DEPRECATED — MERGED
> This user story has been **approved for deprecation**. Its content has been merged into the [[02 - Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak Investigation story (O-A-4)]] and the [[Outbreak Assessment - CDC Investigator User Story|Outbreak Assessment story (O-A-6)]]. It is retained for traceability only and should not be groomed or built as a standalone story.
>
> Source decision: working note "Need to consider merging with the Create Outbreak User Story" — *Jessica: "That makes sense to me!"*

> [!note] ID collision flag (for Alec)
> This deprecated story carries **User Story ID O-A-4**, which is the same ID now assigned to the live [[02 - Create Outbreak Investigation - CDC Investigator User Story]]. The collision is preserved as found in the source rather than reassigned. Resolve when the merge is finalised.

The content below is migrated verbatim from the source working note. Gaps, blanks and outstanding questions in the original have been **preserved, not filled** (per the deprecation/merge scope).

## User Story

- **As an** outbreak investigator
- **I need** the ability to **document / set the outbreak investigation to Not an Outbreak / Active**
- **so that** I can officially start an outbreak investigation to confirm there is an outbreak.

## Scenarios / Use Cases

1. **Not an Outbreak** also will have investigation complete.
2. **Outbreak** — Update existing Disease Episode Abstracts in Epic with Outbreak #.
3. **Outbreak** can follow two paths:
   1. Individual episodes that are tracked in Epic — Communicable Disease Episodes (e.g. pertussis).
   2. Overall Facility Status vs. Individual episode investigations.
4. **Facility outbreak (80%) vs. Non-facility outbreak (20%).**

> Outstanding question on **Pending** and **Tracking** status.

## Acceptance Criteria

1. Document the specifics of the outbreak investigation status.
   1. Outbreak Investigation Screen ([Web view](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/_layouts/15/Doc.aspx?sourcedoc={49042283-743a-4bca-ba5d-02b10ecbaa82}&action=edit&wd=target%28Outbreak%20Management%20Application%20Design.one%7Cb18cef0a-7f53-4aaa-959d-faa331dcd0fd%2FOutbreak%20Investigation%20Screen%7C216b8bc2-04ce-4366-b7e4-ebb040b835cd%2F%29&wdorigin=703&wdpreservelink=1)).
2. Ability to separate populations by:
   1. Health Care Workers.
   2. Hospital organization patients.
      1. Inpatient (IP&C).
      2. Outpatient (Public Health).
3. Report Outbreak Initial Notification to Alberta Health.
4. Maintain Status:
   1. Pending.
   2. Tracking.
   3. *(blank in source)*

## User Story Metadata

|                              |                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                              |
| Value Stream Stage Workflow  | Assess (A)                                                                                |
| User Story ID                | O-A-4 *(collides with live Create Outbreak Investigation — see flag above)*               |
| Status                       | Deprecated (was: Analysis)                                                                |
| Build Team(s)                | Outbreak Management Application Team                                                      |
| Merged Into                  | [[02 - Create Outbreak Investigation - CDC Investigator User Story]]; [[Outbreak Assessment - CDC Investigator User Story]] |
| Link to System Design Doc    | [Link]                                                                                    |
| Link to Design Sign-off Mins | [Link]                                                                                    |
| Last Updated                 | June 26, 2026                                                                             |
| Updated by                   | Alec Blair                                                                                |

### Update Comments

- 2025-12-01: Alec Blair — Updated User Story to new template standards and cross mapped to appropriate legislation and guidance documents.
- 2026-01-30: Alec Blair — Updated based on comments and feedback. Added Metadata. Adjusted ID.
- 2026-06-26: Alec Blair — Approved for **deprecation** and merge into the Create Outbreak Investigation (O-A-4) and Outbreak Assessment (O-A-6) stories. Migrated source content into the HSS user-story standard verbatim; gaps and outstanding questions preserved rather than filled. Flagged the O-A-4 ID collision with the live Create Outbreak Investigation story.
