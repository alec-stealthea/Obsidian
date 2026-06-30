---
type: Screen Specification
title: Facility Questionnaire Maintenance Screen Specifications
description: Build specification for the OMRA Facility Questionnaire Maintenance screen, where a steward maintains the library of facility questionnaire templates — a generic baseline plus extensible named templates that are applied to outbreaks — mapping to the OMRA database model and flagging the questionnaire-template ERD gap.
tags:
  - screen-specification
  - omra
  - communicable-disease
  - outbreak-management
  - facility-questionnaire
  - dictionary-maintenance
  - template-maintenance
timestamp: 2026-06-29T00:00:00Z
---
## Design Specification Context

This screen maintains the **library of facility questionnaire templates** that the [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]] screen draws on. It holds a **generic baseline template** — the default line-list and aggregate column sets every facility outbreak starts from — and supports **creating additional named templates** that **extend** the baseline (adding outbreak-, disease- or setting-specific columns and questions) so a fit-for-purpose instrument can be **applied to different outbreaks** without rebuilding it each time. Where [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]] instantiates and tunes an instrument for **one** outbreak, this screen curates the **reusable** definitions behind it.

It is a **Foundation maintenance** function, alongside [[User Maintenance Screen Specifications|User Maintenance]], Location / Facility Maintenance, and [[Communicable Disease Maintenance Screen Specifications|Communicable Disease Maintenance]] (deck slides 6–8). As established in [[User Maintenance Screen Specifications]] (§3.6, AC-3/AC-4), maintaining a shared, authoritative definition like a questionnaire template is **dictionary/dimension stewardship**, restricted to the **Business System Manager** role — distinct from an investigator's per-outbreak **instantiation** of a template on [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]], and distinct again from an investigator's in-case **provisional add**. The closest existing pattern in the model is the per-disease question library `DiseaseContactQuestion` (Section 15), which is effectively a contact-side template already.

> **Scope — facility templates only.** Like [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]], this screen governs **facility** (line-list / aggregate) instruments only. **Individual / per-case questionnaires are entered into the Epic Communicable Disease episode** (Connect Care is the system of record for individual cases — see [[CLAUDE-OMRA]]). The contact-investigation equivalent is specified in [[Contact Identification Screen Specifications]].

> **Central ERD gap — no questionnaire-template entity.** As flagged in [[Create Facility Questionnaire Screen Specifications]], the [[OMRA Database ERD]] (v2.5) has **no questionnaire-definition tables**. This screen makes that gap concrete: it presumes a reusable **template** layer — provisionally a `QuestionnaireTemplate` (the named definition: mode, generic/default flag, applicability scope, version) and `QuestionnaireTemplateItem` (the ordered columns/questions, response type, source binding, core-vs-extended flag). The per-outbreak `OutbreakQuestionnaire` created on [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]] then references the `QuestionnaireTemplate` it was instantiated from. These tables are **flagged for design, not invented in the model**; the field table maps each maintained element to the line-list/aggregate column it ultimately configures and marks the template layer as a gap. See Dependencies.

Source material for this specification:

- **Wireframe** — *no wireframe slide exists yet.* The questionnaire slides in [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx) cover the per-outbreak *Create Questionnaire* (slide 15) and *Submit Questionnaire* (slide 17), not template maintenance. A maintenance wireframe is to be added to the deck; the layout below is proposed against the Foundation-maintenance pattern.
- **Data model** — [[OMRA Database ERD]] (v2.5): the line-list entities `FacilityLineList`, `LineListPerson`, `LineListPersonType`, `CaseClassification`, `LineListPersonSymptom` (Section 5) and `FacilityOutbreakAggregateReport` (Section 8) that templates configure; the disease-reference entities `InfectiousDisease`, `Organism` / `DiseaseOrganism`, `Symptom` / `DiseaseSymptom`, `Vaccine` / `DiseaseVaccine`, `DiagnosticTest` / `DiseaseTest` (Section 10) that seed default columns; and `DiseaseContactQuestion` / `ContactDiseaseQuestionResponse` (Section 15) as the analogue template pattern.
- **Access model** — [[User Maintenance Screen Specifications]] (Role-Based Access Specification); template stewardship is Business System Manager.
- **Related screens** — [[Create Facility Questionnaire Screen Specifications]] (instantiates a template per outbreak); [[Communicable Disease Maintenance Screen Specifications]] (the dictionary-maintenance exemplar this screen mirrors).
- **Source user stories** — [[08 - Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1) and [[07 - Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1), whose instruments these templates define.

## Wireframe

There is **no PowerPoint wireframe for this screen yet** — it is a proposed addition to the OMRA Design deck. The intended layout follows the Foundation-maintenance pattern of [[Communicable Disease Maintenance Screen Specifications|Communicable Disease Maintenance]], with a **Save** action and two zones:

- **Template list / header** — a selectable list of templates with a **New Template** action; for the selected template, its **Template Name**, **Mode** (Line List / Aggregate), a **Generic baseline?** indicator, an optional **Extends** (parent template), a **Description**, and the **applicability** scope (disease / setting / type) that governs which outbreaks it is offered for.
- **Template item builder** — an ordered grid of the template's columns/questions mirroring the *Create Questionnaire* core set (*Demographics / Role · Signs / Symptoms · Lab · Result · Prophylaxis · Vaccinated · Hospital · Admitted · Cause of Death · Date*), each row carrying a label, **response type**, **sequence**, a **core vs. extended** flag, and an optional **source binding** to the disease-reference data that pre-populates it. An **Additional Questions** affordance adds extended items beyond the core columns.

## Acceptance Criteria Specifications

1. **Scenario Conditions** — What scenarios have been defined that may affect the specifications.

   1. *Generic baseline plus extensible templates.* The library holds one **generic baseline** template (the default columns every facility instrument starts from) and any number of **named templates** that **extend** it for specific needs. Confirm whether extension is **inheritance** (a child template inherits the baseline's items and adds/overrides) or **copy-on-create** (a new template is seeded from the baseline and thereafter independent) — this materially shapes the model (see Business Rules and Dependencies).
   2. *Line list vs. aggregate.* As on [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]], a template is built for one **mode** — an identifiable **line list** or a summary **aggregate** — and its item set differs accordingly.
   3. *Applied across outbreaks, not to one.* A template is a reusable definition; editing it must not silently change instruments already generated for outbreaks under a prior version (versioning, not overwrite).
   4. *Stewardship, not investigation entry.* This is authoritative template maintenance (Business System Manager), distinct from the investigator instantiating and tuning an instrument for a single outbreak on [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]].

2. **Functional Behaviour** — What (if any) business logic needs to be created for this.

   1. **New Template** creates a named template in a chosen **mode**, optionally **extending** an existing template (the generic baseline by default), seeded with that parent's items.
   2. **Core item pre-definition** reuses the [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]] logic: core columns and their source bindings derive from disease/organism/vaccine-preventable/symptom/setting reference data, so the baseline stays consistent with the dictionary.
   3. **Add / reorder / remove items**, including **Additional Questions** (label + response type — Boolean, Lookup, Free text, Date — + sequence + optional source binding), reusing the `DiseaseContactQuestion.responseType` pattern.
   4. **Applicability scope** — a template may be scoped by disease, outbreak setting and/or type so [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]] can offer the right templates (or default to the generic baseline) for a given outbreak.
   5. **Save** validates the template and writes a **new `VersionStatus` version** rather than overwriting, so previously instantiated instruments remain interpretable. Exactly one **generic baseline** per mode may be flagged active at a time.
   6. **Retire** a template that should no longer be offered, without deleting history; a template referenced by instruments under an open outbreak cannot be hard-deleted (warn/block, BR 5).

3. **User Experience Considerations** — What (if any) UX options might we have to consider as part of the build.

   1. Reuse a **common item-builder component** with [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]] so the maintenance grid and the per-outbreak builder behave identically (the per-outbreak screen is the same component seeded from a template).
   2. Make the **generic baseline** clearly distinguished and protected (e.g., editable only with elevated confirmation), since every facility instrument inherits from it.
   3. Show the **extends / inheritance** relationship visibly so a steward understands which items are inherited vs. locally added, and the impact of editing a parent.
   4. Keep the screen visually consistent with [[Communicable Disease Maintenance Screen Specifications|Communicable Disease Maintenance]] and the other Foundation maintenance screens.

4. **Data Inputs and Outputs** — What are the data elements involved for the build object. What test data is needed to support functional testing.

   1. *Inputs* — Steward-defined template metadata and items; disease-reference lookups (Symptom, Test, Vaccine, Setting) that seed core items; the generic baseline as the default parent.
   2. *Outputs* — Reusable `QuestionnaireTemplate` definitions consumed by [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]] when an investigator instantiates an instrument for an outbreak; the generated Excel/PDF/web outputs ultimately inherit their column set from the chosen template.
   3. *Test data* — (a) the **generic line-list baseline** (the full core column set); (b) a **respiratory continuing-care** template extending the baseline with vaccination status and a respiratory symptom set; (c) an **aggregate school/child-care** template (counts split staff/student, no identifiable columns); (d) a template extended with **Additional Questions** (e.g., a setting-specific exposure question) to verify extension and ordering.

5. **Business Rules and Validation** — What (if any) business logic governs this application function and what can be done to build in quality checks for data validation?

   1. **Template Name** is mandatory and unique within mode in the active library.
   2. Exactly **one active generic baseline per mode** (line list, aggregate).
   3. **Mode integrity** — a line-list template must include the identifiers needed to resolve a person; an aggregate template must collect counts only, not identifiable rows.
   4. **Conditional core columns** — *Vaccinated* is offered only when applicability includes a vaccine-preventable disease; *Prophylaxis* only once its model home is confirmed (the open gap carried from [[Create Facility Questionnaire Screen Specifications]]).
   5. **No destructive edit of in-use templates** — a template referenced by instruments under an open outbreak cannot be hard-deleted or have its schema changed in place; edits create a new version and prior instruments stay bound to the version they were generated under. Effective/expiry windows for the same template name must not overlap.
   6. **Extension consistency** — a child template may add or override items but must remain valid for its mode; confirm whether a child may remove an inherited core item (depends on the inheritance-vs-copy decision, SC 1.1).

6. **Exception Handling** — How will the application handle edge cases, missing data, time outs, etc.?

   1. **Duplicate template name** within mode on save → reject with inline validation.
   2. **Editing a baseline with dependent templates/instruments** → warn with the impact (how many child templates / open outbreaks inherit it) and version rather than overwrite.
   3. **Disease-reference lookup unavailable** when seeding core items → allow the template to be saved with the core demographic/outcome columns and flag that disease-specific items were not seeded.
   4. **Retire/delete of an in-use template** → block and direct the steward to retire (version) instead, preserving instruments already issued.

7. **Business Semantics** — What terminology resonates with the business for this application function.

   - "Facility Questionnaire Template"; **Generic baseline** (the default instrument); **Extend** / "based on"; **Line List** vs. **Aggregate** mode; "Applicability" (disease / setting / type); "Core" vs. "Additional" questions; "Template version"; "Apply to outbreak" (the instantiation done on [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]]).

## Field-mapping table

The maintained elements are **template definitions**, not instrument data. Each item maps to the `LineListPerson` / aggregate column it ultimately configures; the **template layer itself is an ERD gap** (provisional `QuestionnaireTemplate` / `QuestionnaireTemplateItem`).

| Screen Field | Data Type | Database Field | Data Standard | Default Value | Mandatory? | Comments |
|---|---|---|---|---|---|---|
| Template Name | Alpha Numeric | `QuestionnaireTemplate.templateName` | — | None | Yes | **Gap** — provisional template table. Unique within mode in the active library. |
| Mode (Line List / Aggregate) | Boolean / Lookup | `QuestionnaireTemplate.questionnaireMode` | Line List / Aggregate | None | Yes | **Gap** — provisional. Determines the item set and output structure. |
| Generic baseline? | Boolean | `QuestionnaireTemplate.isGeneric` | — | False | Yes | **Gap** — provisional. Exactly one active baseline per mode (BR 5.2). |
| Extends (parent template) | Lookup | `QuestionnaireTemplate.parentTemplateID` → `QuestionnaireTemplate.templateID` | — | Generic baseline | No | **Gap** — provisional self-reference. Confirm inheritance vs. copy-on-create (SC 1.1). |
| Description | Free text | `QuestionnaireTemplate.description` | — | None | No | **Gap** — provisional. |
| Applicability — Disease | Lookup (multi) | `QuestionnaireTemplate` → disease scope (analogue `DiseaseContactQuestion.infectiousDiseaseID`) | Provincial notifiable-disease dictionary | None (all) | No | **Gap** — provisional applicability junction. Governs which templates Create Facility Questionnaire offers. |
| Applicability — Outbreak Setting | Lookup (multi) | `QuestionnaireTemplate` → `OutbreakSetting.outbreakSettingID` | CDC Guide setting categories | None (all) | No | **Gap** — provisional. |
| Applicability — Outbreak Type | Lookup (multi) | `QuestionnaireTemplate` → `OutbreakType.outbreakTypeID` | AORF-aligned type list | None (all) | No | **Gap** — provisional. |
| Item — Label | Alpha Numeric | `QuestionnaireTemplateItem.itemLabel` | — | None | Yes | **Gap** — provisional item table. One row per column/question. |
| Item — Response Type | Lookup | `QuestionnaireTemplateItem.responseType` | Boolean / Lookup / Free text / Date / +/− | Per core column | Yes | **Gap** — provisional. Reuses `DiseaseContactQuestion.responseType` pattern. |
| Item — Sequence | Numeric | `QuestionnaireTemplateItem.itemSequence` | — | Append | Yes | **Gap** — provisional. Display/order on the generated instrument. |
| Item — Core vs. Extended | Boolean / Lookup | `QuestionnaireTemplateItem.isCoreItem` | — | Core for baseline items | Yes | **Gap** — provisional. Distinguishes inherited core columns from added questions. |
| Item — Source Binding | Lookup | `QuestionnaireTemplateItem.sourceBinding` → the configured column (e.g., `LineListPerson.specimenResult`, `Symptom` via `DiseaseSymptom`, `Vaccine` via `DiseaseVaccine`) | — | Per core column | No | **Gap** — provisional. Binds a core item to the line-list/aggregate column it pre-populates; null for free-standing Additional Questions. |
| Item — Mandatory on instrument | Boolean | `QuestionnaireTemplateItem.isMandatory` | — | No | No | **Gap** — provisional. Whether the facility must answer the item. |
| Created by / Create Date (audit) | Lookup / Date-Time | `AuditLog.actionBy` / `actionDateTime` | — | Logged on save | Yes | Not visible on screen; part of the maintenance audit record. |
| Version Status / Version Date | Lookup / Date | `QuestionnaireTemplate.versionStatus` → `VersionStatus` (Active, Retired, Merged, Draft) | — | Active on save | Yes | Not visible on screen; supports versioning so previously instantiated instruments stay interpretable. **Gap** — depends on the provisional template table. |

## Technical Implementation Notes

- **Access Specifications** — Maintaining the facility questionnaire template library is **dictionary/dimension stewardship**, restricted to the **Business System Manager** role (or a user explicitly granted dictionary/dimension maintenance) per [[User Maintenance Screen Specifications]] §3.6 and AC-3/AC-4. Investigators do **not** edit the shared library here — an investigator instantiates and tunes a template for a single outbreak on [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]]. Read access to the templates is broad.
- **Security Specifications** — Templates are **definition/configuration metadata, not personal health information**, so the HIA "platinum identifier" controls do not apply to the template rows themselves. Integrity is high-stakes: a template governs what every facility under it is asked to report. All create / edit / retire / version actions are audited through `AuditLog` (actor, timestamp, before/after); history is preserved through `VersionStatus` versioning rather than destructive update. The **instruments** generated from these templates do collect PHI once completed — that handling lives on [[Create Facility Questionnaire Screen Specifications|Create Facility Questionnaire]] and the submit-side screen.
- **Performance Expectations** — Template maintenance is low-frequency, but the library is read whenever an investigator instantiates an instrument; the templates and the disease-reference lookups that seed them must be cached and index-backed. No response-time expectation beyond the application SLA for the maintenance actions themselves.

## Version History

- **Last Update**
  - **June 29, 2026 (Alec Blair)** — Initial draft. Created the Facility Questionnaire Maintenance specification to hold the **generic baseline** facility questionnaire and **extensible named templates** applied per outbreak, mirroring the Foundation-maintenance pattern of [[Communicable Disease Maintenance Screen Specifications]]. Populated the seven Acceptance Criteria sections, a field-mapping table, and Technical Implementation Notes. Established the template layer as the parent of the per-outbreak instrument created on [[Create Facility Questionnaire Screen Specifications]], and flagged ERD gaps for resolution before build: **no questionnaire-template entity** (provisional `QuestionnaireTemplate` / `QuestionnaireTemplateItem`, analogue `DiseaseContactQuestion`); the **inheritance-vs-copy** extension model (SC 1.1); template **applicability** scoping; and the **Prophylaxis** model home carried from [[Create Facility Questionnaire Screen Specifications]]. Noted that **no wireframe slide exists yet** — a maintenance wireframe is to be added to the OMRA Design deck.
- **Link to Jira Task** — _to be added_
- **Specifications Status** — Draft for working-group review
- **Linked SBARs** — _to be added_
- **Linked Enabling Stories** — [[08 - Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1); [[07 - Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1)
