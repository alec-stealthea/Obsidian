---
type: User Story
title: Update CD Episode Outbreak ID - CDC Investigator User Story
description: Outbreak Investigator capability to update (back-fill) the Outbreak ID on previously-created Communicable Disease Episode abstracts in Connect Care once enough cases meet the outbreak case definition and an outbreak is declared, so every associated patient is accounted for and managed to contain the outbreak. Includes a report to identify associated clients still missing an Outbreak ID, with automated back-fill flagged as a desirable.
tags:
  - user-story
  - cdc
  - communicable-disease
  - outbreak-management
  - omra
  - connect-care
  - epic
  - cd-episode
  - outbreak-id
timestamp: 2026-06-26T00:00:00Z
---

> [!question] Open design question — can this be automated?
> The core open question behind this story is whether the back-fill of the **Outbreak ID** onto already-created Communicable Disease (CD) Episode abstracts can be **automated** rather than performed by hand, episode by episode, after an outbreak is declared. This story specifies a **manual** capability as the Minimum (so investigators are never blocked), and carries the **automated back-fill** as a Desirable to be confirmed with the Connect Care (Epic) and Outbreak Application teams. See Dependencies.

## Background

Individual cases of a communicable disease are worked as **CD Episodes** in Connect Care (Epic) — each client's episode carries a **Communicable Disease Abstract** that is the clinical record of that case (see [[Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)|Create CD Episode and Draft Contact Abstract]]). Per the [[CLAUDE-OMRA]] data-ownership boundaries, Connect Care is the **system of record for individual cases**, while the Outbreak Management Reporting Application (OMRA) owns the **outbreak coordination record** and provisions the **Outbreak ID** when an outbreak is created ([[Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak]], O-A-4, AC1).

The timing problem this story addresses: cases are often created and worked **before** an outbreak is recognised. Only once **enough cases accumulate to meet the outbreak case definition** is an outbreak declared — and at that point the Outbreak ID exists. The abstracts that were created earlier therefore have **no Outbreak ID on them**, even though those clients are part of the now-declared outbreak. To contain the outbreak the investigator has to go **back** and stamp the declared Outbreak ID onto each of those previously-created CD Episode abstracts, so that every affected patient is linked to the outbreak and none is missed.

This is a **Manage (M)** stage activity on the Outbreak Value Stream: the outbreak already exists, and the investigator is keeping the case set complete and accurate as the outbreak is managed and contained. It is the episode-side complement to the lab-side [[Create Exposure Incident ID - CDC Investigator User Story|Exposure Incident ID]] association — both exist so that results and cases resolve to the right outbreak.

> [!note] Note on the Story ID — stage and numbering
> The source working draft carried this as **O-O-2** with the stage labelled *Confirm*. On review, back-filling the Outbreak ID onto already-created episodes to account for all patients **after** declaration is a **Manage (M)** activity, so the ID is carried as **O-M-2** and the stage as **Manage (M)**. Final numbering across the Outbreak stories is still being confirmed (see [[CLAUDE-CDC]]); the O-O-2 lineage is recorded in Update Comments.

## User Story

- **As an** Outbreak Investigator in Communicable Disease Control (CDC)
- **I need** the ability to update any previously-created CD Episode exposure **Abstract** that is associated to a since-declared outbreak, by recording the declared **Outbreak ID** on it
- **so that** I can ensure all patients are accounted for and managed appropriately to **contain the outbreak**.

## Scenarios

- **Scenario A — Back-fill after declaration (happy path).** Several gastrointestinal-illness cases at a continuing-care home were each created as CD Episodes before an outbreak was recognised. Once the case count meets the outbreak case definition and the investigator declares the outbreak (Outbreak ID provisioned in OMRA), the investigator updates each earlier episode's Abstract with that Outbreak ID, so the full case set resolves to the one outbreak.
- **Scenario B — Find the clients still missing an Outbreak ID.** The investigator needs to know **which** clients meet the case definition but do not yet carry the Outbreak ID on their abstract. They run a report (in Connect Care / Epic) that lists those clients so none is overlooked, then works the list to completion.
- **Scenario C — New qualifying case filed after declaration.** After the outbreak is declared, a further case meeting the case definition is filed. The investigator (or, desirably, the system) ensures the new episode's abstract is stamped with the existing Outbreak ID so the late-arriving case is captured.
- **Scenario D — Case that should not be associated.** A candidate case turns out **not** to meet the case definition (e.g., ruled out). The investigator does **not** apply the Outbreak ID — or removes it if previously applied — so the outbreak case set stays accurate.
- **Scenario E — Client linked to more than one event.** A client appears in two related/clustered outbreaks. The investigator can record the correct Outbreak ID(s) so the abstract reflects the right outbreak association(s) (pairs with [[Outbreak Assessment - CDC Investigator User Story|Outbreak Assessment]], O-A-6, on related/cluster outbreaks).

## Acceptance Testing

How will the user be able to say we built what they needed?

### Minimum (MVP — Must Have)

1. **Record an Outbreak ID on a CD Episode abstract.** *Given* a previously-created CD Episode Abstract in Connect Care for a client who meets the outbreak case definition, *when* the investigator records the declared **Outbreak ID** on that abstract, *then* the abstract is associated to the outbreak and the client is counted in the outbreak case set. [Public Health Act & Communicable Diseases Regulation — outbreak investigation and case ascertainment]
2. **Identify associated clients with no Outbreak ID.** *Given* an active outbreak, *when* the investigator runs the "clients meeting the case definition without an Outbreak ID" report (a Connect Care / Epic report or work-queue), *then* the report lists every such client so none is missed. *(Source draft AC2 — "Probably Reports in Epic?".)* [Public Health Act & Communicable Diseases Regulation — complete case ascertainment]
3. **Update is possible at any point after declaration.** *Given* a CD Episode that already exists before the outbreak was declared, *when* the outbreak is subsequently declared and its Outbreak ID provisioned, *then* the investigator can go back into that episode and apply the Outbreak ID without re-creating the episode.
4. **Outbreak ID resolves to a real, declared outbreak.** *Given* an Outbreak ID being applied, *when* it is recorded on an abstract, *then* it must match an existing, declared `Outbreak` record in OMRA (referential integrity), so an abstract cannot be tagged with an invalid or undeclared outbreak.
5. **Remove / correct an association.** *Given* a client whose case is ruled out or was tagged in error, *when* the investigator removes or corrects the Outbreak ID on the abstract, *then* the client is no longer counted in that outbreak's case set, keeping ascertainment accurate.
6. **Privacy-conforming update and audit.** *Given* the update action, *when* it is performed, *then* it is scoped to the investigator's authorized team / zone / disease group per the OMRA / Connect Care access model and audited (actor, timestamp, before/after Outbreak ID value), since the abstract carries personal health information. [[User Maintenance Screen Specifications]]; [Health Information Act (HIA), RSA 2000, c H-5 — collection, use, disclosure and audit, [verify section]]

### Desirable (Nice to Have)

1. **Automated back-fill on declaration.** When an outbreak is declared, the system automatically stamps the new Outbreak ID onto the abstracts of all CD Episodes that already meet the outbreak case definition, presenting the candidate set to the investigator for **confirmation / override** rather than requiring manual entry on each episode. *(This is the automation the story exists to test — confirm feasibility with the Connect Care and Outbreak Application teams.)*
2. **Alert on a new qualifying case after declaration.** When a case meeting the case definition is filed after the outbreak is declared, the system alerts the investigator (or auto-applies the Outbreak ID, subject to confirmation) so late-arriving cases are not missed (Scenario C).
3. **Bulk update from a line list or report.** The investigator can select multiple clients from the "missing Outbreak ID" report and apply the Outbreak ID to all of them in one action, rather than one episode at a time.
4. **Scheduled / standing report.** The "associated clients without an Outbreak ID" report runs on a schedule (or refreshes automatically) for each active outbreak, so gaps surface without the investigator remembering to run it.
5. **Reconciliation between OMRA and Connect Care.** A periodic check confirms that the set of abstracts carrying a given Outbreak ID in Connect Care matches the outbreak's case set / line list in OMRA, flagging discrepancies for the investigator.

## Dependencies

- **Automation feasibility (the governing question).** Whether the Outbreak ID back-fill can be automated (Desirable AC1/AC2) depends on Connect Care (Epic) build capability and the OMRA↔Connect Care integration pattern. Confirm with the Epic Connect Care and Outbreak Application teams before committing the automated criteria; until then the manual MVP stands.
- **Reporting surface.** The "clients meeting the case definition without an Outbreak ID" report (AC2) is expected to be an **Epic report / work-queue**; confirm ownership, the report platform (Connect Care reporting vs. OMRA), and the case-definition logic that drives membership.
- **Outbreak ID provenance.** The Outbreak ID is provisioned by [[Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak]] (O-A-4, AC1) in OMRA; this story consumes it. Any change to how the Outbreak ID is generated (see the Epic-migration review noted in [[Create Exposure Incident ID - CDC Investigator User Story|Exposure Incident ID]] and [[Communicable Disease Open Issues#Design decisions & data-model gaps|CD-OI-3]]) affects what gets stamped here.
- **Where the Outbreak ID lives on the abstract.** Confirm the field on the Connect Care CD Abstract that holds the Outbreak ID and its cardinality (one Outbreak ID per abstract vs. multiple for clustered outbreaks — Scenario E), and reflect it in the abstract / interface design ([[Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)]]).
- **Case-definition source of truth.** Membership in "meets the outbreak case definition" depends on the outbreak's organism/case-definition configuration ([[Create Outbreak Investigation - CDC Investigator User Story|Create Outbreak]], multi-organism case definitions). Confirm where this is evaluated.

## User Story Metadata

|                              |                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Value Stream                 | Outbreak (O)                                                                                                          |
| Value Stream Stage Workflow  | Manage (M)                                                                                                            |
| User Story ID                | O-M-2 — reassigned from source draft **O-O-2** (stage *Confirm*); numbering being confirmed across Outbreak stories   |
| Role                         | Outbreak Investigator / CDC Investigator (Communicable Disease Control)                                               |
| Status                       | Analysis                                                                                                              |
| Build Team(s)                | Outbreak Application Team; Epic Connect Care Team (for the Connect Care report and abstract field)                    |
| Related Design Spec          | [[Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)]]; [[OMRA Database ERD]] |
| Related Pattern Story        | [[Create Outbreak Investigation - CDC Investigator User Story]]; [[Create Exposure Incident ID - CDC Investigator User Story]]; [[Outbreak Assessment - CDC Investigator User Story]] |
| Reference Material           | [[CLAUDE-OMRA]]; [[CLAUDE-CDC]]; [[User Maintenance Screen Specifications]]; [[Communicable Disease Open Issues]]      |
| Regulatory Drivers           | Public Health Act & Communicable Diseases Regulation; Health Information Act (HIA), RSA 2000, c H-5                    |
| Link to System Design Doc    | [Link — TBD]                                                                                                          |
| Link to Design Sign-off Mins | [Link — TBD]                                                                                                          |
| Last Updated                 | June 26, 2026                                                                                                         |
| Updated by                   | Alec Blair                                                                                                            |

### Update Comments

- 2025-01-30: Alec Blair — updated user story to new template standards and updated based on review of the story within the workflow.
- 2026-06-26: Alec Blair — migrated the working draft into the HSS user-story standard. Reassigned the Story ID from the source **O-O-2** (stage *Confirm*) to **O-M-2** (stage *Manage*), since back-filling the Outbreak ID onto already-created episodes to account for all patients occurs after declaration. Expanded the draft's two acceptance criteria into a Minimum set (record Outbreak ID on an abstract; report to identify associated clients without an Outbreak ID; update possible post-declaration; referential integrity to a declared outbreak; remove/correct an association; privacy-conforming audit) and a Desirable set built around the story's open automation question (automated back-fill on declaration with investigator confirmation; alert on new qualifying cases; bulk update; scheduled report; OMRA↔Connect Care reconciliation). Added scenarios, a Dependencies section, and Public Health Act / HIA traceability. Cross-linked the CD Episode interface spec, Create Outbreak (O-A-4), Exposure Incident ID, and Outbreak Assessment stories.
