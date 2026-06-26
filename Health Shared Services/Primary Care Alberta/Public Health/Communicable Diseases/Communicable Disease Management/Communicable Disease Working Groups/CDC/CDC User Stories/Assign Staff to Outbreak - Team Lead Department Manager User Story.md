---
type: User Story
title: Assign Staff to Outbreak - Team Lead Department Manager User Story
description: Team Lead / Department Manager capability to assign people to the defined roles on an outbreak so that the necessary investigation tasks are staffed and completed.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - staffing
  - outbreak-team
timestamp: 2026-06-26T00:00:00Z
---

## Background

Once an outbreak investigation is created and marked Active (see [[Create Outbreak Investigation - CDC Investigator User Story]], O-A-4), the outbreak team has to be **stood up** — the right people attached to the right roles so the investigation work actually gets done. That staffing decision belongs to the person who oversees the program team: a **Team Lead** or **Department Manager**. They decide which roles an outbreak needs, then assign people drawn from the existing Outbreak Management Reporting Application (OMRA) user base to those roles, and they remain accountable for seeing the necessary tasks completed.

This story was originally drafted for a generic "manager" persona. It is restated here against the **OMRA User Roles convention**: the manager persona is the defined **Team Lead / Department Manager** functional role (role #4 in the [[User Maintenance Screen Specifications|OMRA access model]]), whose capabilities explicitly include investigator reassignment, team/department oversight, and user maintenance. The two-layer access model matters for reading this story precisely: the **functional role** (what a user may *do* in the application — Read-Only User, Intake User, Investigator, Team Lead / Department Manager, Business System Manager, IT System Administrator) is distinct from the **outbreak team role** (what a person *is* on a given investigation — Lead Investigator, Medical Officer of Health, Investigator, Outbreak Manager). This story is about assigning people to **outbreak team roles**, performed by someone holding the **Team Lead / Department Manager** functional role.

In the data model, the assignment is recorded in the `OutbreakTeamMember` table — one row per person-on-an-outbreak, carrying the person, the team role, the assigning manager, the assigned/removed dates, and the formal Outbreak Management Team (OMT) member/lead flags. The team-role definitions themselves (MOH, CDC Nurse, IPC, OMT Lead, Site Manager, etc.) live in the `Role` table with their capability flags (`canDeclareOutbreak`, `canCloseOutbreak`, `canEditLineList`, `canSubmitAORF`, `canViewOnly`). See [[OMRA Database ERD]] Section 3 (Stakeholder & Team Management). This addresses the working-group question about where role definitions should live: they are the `Role` reference list, not free text on each outbreak.

Connect Care remains the system of record for individual cases; OMRA owns the outbreak coordination record, including who is on the outbreak team. This story sits at the **Manage (M)** stage of the Outbreak Value Stream (*Exposure Trace → Confirm → Assess → Open → Manage → Close*), with the initial stand-up originating from the create-outbreak work at the **Assess** stage.

## User Story

- **As a** Team Lead / Department Manager in Communicable Disease Control (CDC)
- **I need** the ability to assign people to the roles required on an outbreak investigation
- **so that** I can see that the necessary investigation tasks are being staffed and completed.

## Scenarios

> Scenarios reflect where the same role/role type has a different way of working within a specialty, zone, or department. They help determine whether separate user stories are needed, or whether a common practice can reduce build complexity.

- **Scenario A — Stand up a new outbreak team (happy path).** A Department Manager opens a newly created, Active outbreak in their department, selects the roles the outbreak requires (Lead Investigator, Medical Officer of Health, Investigator), and assigns existing OMRA users to each role. The assignments appear on the outbreak record and in each assignee's workload.
- **Scenario B — Reassign during a surge.** During an IPD or varicella surge, a Team Lead reassigns an Investigator from one outbreak to a higher-priority one, removing them from the first team and adding them to the second, without any change to that person's underlying functional role or department provisioning.
- **Scenario C — Designate the Outbreak Management Team lead.** For a formal facility outbreak, the manager flags one assignee as the Outbreak Management Team (OMT) Lead and others as OMT members, distinguishing the formal management team from ad-hoc contributors.
- **Scenario D — Cross-department assist.** A second department lends an Investigator to an outbreak owned by the CDC department. The Team Lead assigns that person to the outbreak team for the duration; edit scope follows the OMRA department access rules.
- **Scenario E — Vacancy / unassigned role (edge case).** An outbreak needs a Medical Officer of Health but none is available yet. The manager can mark the role as required-but-unfilled so the gap is visible, rather than leaving the requirement undocumented.

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Select the roles an outbreak requires.** *Given* an Active outbreak investigation, *when* the Team Lead / Department Manager opens its team/staffing view, *then* they can select the outbreak team roles the investigation requires from the `Role` reference list (e.g., Lead Investigator, Medical Officer of Health, Investigator, Outbreak Manager / OMT Lead). [[OMRA Database ERD]] Section 3 (`Role`)
2. **Assign existing OMRA users to specific roles.** *Given* a required role on the outbreak, *when* the manager assigns a person, *then* the person is selected from the existing OMRA user base (`AppUser` / `Person`) and written to `OutbreakTeamMember` with `outbreakID`, `personID`, `roleID`, `assignedDate`, and `assignedBy` set to the assigning manager. [[OMRA Database ERD]] Section 3 (`OutbreakTeamMember`)
3. **Support the program-named outbreak team roles.** *Given* role selection, *when* roles are presented, *then* at minimum the roles named by the working group are available — **Lead Investigator, Medical Officer of Health (MoH), Investigator(s), Outbreak Manager** — mapped to `Role` entries with their capability flags (`canDeclareOutbreak`, `canCloseOutbreak`, `canEditLineList`, `canSubmitAORF`, `canViewOnly`). Authoritative role definitions are maintained centrally in `Role` rather than restated per outbreak. *(Resolves the working-group request for role definitions — see Dependencies.)*
4. **Restrict assignment to the Team Lead / Department Manager role.** *Given* the OMRA access model, *when* a user attempts to assign or reassign outbreak team members, *then* the action is available only to a user holding the **Team Lead / Department Manager** functional role (or above); Investigators and other roles cannot reassign staff. [[User Maintenance Screen Specifications]]
5. **Reassign and remove team members.** *Given* an assigned team member, *when* the manager removes or reassigns them, *then* `OutbreakTeamMember.removedDate` is set (assignment history preserved, not destroyed) and the change is auditable. A reassignment does **not** alter the person's functional role or department provisioning. [Health Information Act (HIA), RSA 2000, c H-5 — audit of access changes, [verify section]]
6. **MOH-authority roles map only to MOH-designated people.** *Given* a role that carries Public Health Act authorities (e.g., declaring/closing an outbreak, isolation/exclusion authorities tied to the Medical Officer of Health), *when* it is assigned, *then* it can only be filled by a person eligible for that role, so statutory authorities are not granted by a staffing action. [Public Health Act — Medical Officer of Health authorities, [verify section]]
7. **Assignments are visible on the outbreak and to the assignee.** *Given* completed assignments, *when* the outbreak record is viewed, *then* the current team (person, role, OMT lead/member flags) is displayed, and each assignee can see the outbreaks they are responsible for, scoped to the OMRA department access rules. [[User Maintenance Screen Specifications]]

### Desirable (Nice to Have)

1. **Designate the formal OMT.** Flag `OutbreakTeamMember.isOMTMember` / `isOMTLead` to distinguish the formal Outbreak Management Team and its lead from ad-hoc contributors.
2. **Required-but-unfilled roles.** Mark a required role as vacant so staffing gaps are visible on the outbreak before a person is available to fill them (Scenario E).
3. **Workload-aware assignment.** When assigning, surface each candidate's current outbreak assignment count so managers can balance workload during surges.
4. **Bulk / template stand-up.** Apply a default team template (the typical role set for a given outbreak type/setting) so a manager can stand up a standard team in one action and then adjust.
5. **Suggest candidates by department and designation.** Filter the assignable user list by department (CDC / SHE / TB / STI / HIV / IPC / PPHST) and professional designation (e.g., MD/MOH for the MoH role) to speed correct assignment.

### Moved out of scope (tracked elsewhere)

- **Manager reporting on individual and groups of outbreaks.** Pulling reports across individual and grouped outbreaks is a distinct manager capability and is **not** built by this staffing story. It is partially served today by the filtered export on [[Outbreak Search - Outbreak Investigator User Story]] (O-C-3) and the aggregate reporting in [[Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1), but a dedicated **manager outbreak-reporting** user story does not yet exist. Flagged in Dependencies; when that story is created, link it here. *(Plain-text reference only — no WikiLink, as the note does not yet exist.)*
- **Provisioning OMRA users / functional roles.** Creating users and assigning the *functional* role + department is the separate User Maintenance capability ([[User Maintenance Screen Specifications]]), not this outbreak-team assignment.

## Dependencies

- **Outbreak team role definitions (`Role` reference list).** AC1 and AC3 depend on a maintained `Role` reference list with agreed definitions and capability flags for the outbreak team roles (Lead Investigator, MoH, Investigator, Outbreak Manager / OMT Lead, IPC, Site Manager, etc.). This is the answer to the working-group question "Can we have definitions for these roles somewhere?" — definitions live in `Role` ([[OMRA Database ERD]] Section 3), distinct from the six OMRA **functional** roles in [[User Maintenance Screen Specifications]]. Confirming the canonical role list and any program-specific (NDOB vs. other program) distinctions is an open analysis item.
- **Create Outbreak Investigation (O-A-4).** Team stand-up follows outbreak creation; the assignable team view depends on an Active outbreak record from [[Create Outbreak Investigation - CDC Investigator User Story]].
- **User Maintenance / access model.** Reassignment-without-re-provisioning and the "Team Lead / Department Manager performs assignment" rule depend on the access model in [[User Maintenance Screen Specifications]].
- **Manager outbreak-reporting user story (to be created).** See *Moved out of scope*. When the dedicated reporting story exists, link it here.
- **Team/staffing screen specification (to be created).** This requirement's build realisation (an outbreak team/staffing screen) is not yet specified in the OMRA folder; cross-link it here once authored.

## User Story Metadata

|                              |                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                                      |
| Value Stream Stage Workflow  | Manage (M)                                                                                                                        |
| User Story ID                | O-M-5                                                                                                                             |
| Role                         | Team Lead / Department Manager (Communicable Disease Control / CDC)                                                               |
| Status                       | Analysis                                                                                                                          |
| Build Team(s)                | Outbreak Application Team                                                                                                          |
| Related Design Spec          | [[User Maintenance Screen Specifications]]; [[OMRA Database ERD]] (Section 3 — `OutbreakTeamMember`, `Role`, `PersonRole`)        |
| Related Story                | [[Create Outbreak Investigation - CDC Investigator User Story]] (O-A-4 — outbreak team stood up); [[Outbreak Search - Outbreak Investigator User Story]] (O-C-3) |
| Related Pattern Story        | [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]]                                                      |
| Reference Material           | [[CLAUDE-OMRA]]; [[User Maintenance Screen Specifications]]                                                                       |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation (MOH authorities); Health Information Act (HIA), RSA 2000, c H-5             |
| Link to System Design Doc    | [Link — TBD]                                                                                                                      |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                                      |
| Last Updated                 | June 26, 2026                                                                                                                     |
| Updated by                   | Alec Blair                                                                                                                        |

### Update Comments

- 2025-12-01: Alec Blair — Initial draft for review by the CDC team.
- 2026-01-30: Alec Blair — Updated to add metadata.
- 2026-06-26: Alec Blair — Restructured to the HSS user-story standard and aligned to the OMRA User Roles convention. Replaced the generic "Outbreak Resource Manager" persona with the defined **Team Lead / Department Manager** functional role (per [[User Maintenance Screen Specifications]]). Added Background, five scenarios, two-tier Given/When/Then acceptance criteria with Public Health Act / HIA traceability, and a Dependencies section. Mapped the assignment to the `OutbreakTeamMember` and `Role` tables in [[OMRA Database ERD]] Section 3, clarifying the distinction between OMRA **functional** roles and **outbreak team** roles. Resolved reviewer questions: role definitions live in the `Role` reference list (AC3 / Dependencies); manager outbreak-reporting moved out of scope and flagged for a dedicated story (partially covered today by O-C-3 export and O-M-1 aggregate reporting).
