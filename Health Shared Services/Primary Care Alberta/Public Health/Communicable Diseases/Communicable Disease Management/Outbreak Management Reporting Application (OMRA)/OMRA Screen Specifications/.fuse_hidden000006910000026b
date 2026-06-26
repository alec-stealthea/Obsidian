---
type: Screen Specification
title: Communicable Disease Maintenance Screen Specifications
description: Build specification for the OMRS Communicable Disease (Disease Dictionary) Maintenance screen, mapping the OMRS Disease Maintenance wireframe to the OMRS database model.
tags:
  - screen-specification
  - omrs
  - communicable-disease
  - dictionary-maintenance
timestamp: 2026-06-25T00:00:00Z
---
## Design Specification Context

This screen maintains the **authoritative communicable-disease dictionary** that the rest of the Outbreak Management Reporting System (OMRS) depends on — it supplies the Disease lookup on [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]], the reporting-timing and case-classification logic used throughout an investigation, and the outbreak-definition thresholds that drive automated outbreak assessment.

It is one of the three "Foundation" maintenance functions in the design deck (slides 6–8): [[User Maintenance Screen Specifications|User Maintenance]], Location / Facility Maintenance, and this Disease Maintenance screen. As established in [[User Maintenance Screen Specifications]] (§3.6, AC-3, AC-4), maintaining the Disease dimension is **dictionary/dimension stewardship**, not investigation data entry — it is restricted to the Business System Manager role, distinct from an investigator's "provisional add."

Source material for this specification:

- **Wireframe** — *OMRS Disease Maintenance*, slide 8 of [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx).
- **Data model** — [[OMRS Database ERD]] (v2.5), principally the `InfectiousDisease` (incl. `isProvisional`), `OutbreakDefinition`, `Symptom` / `DiseaseSymptom`, `Organism` / `DiseaseOrganism`, `Vaccine` / `DiseaseVaccine`, `DiagnosticTest` / `DiseaseTest`, `DiseaseCaseDefinitionRule`, and `VersionStatus` tables.
- **Access model** — [[User Maintenance Screen Specifications]] (Role-Based Access Specification).
- **Reference data** — [[Communicable Diseases Reportable Reference List]] for notifiable status and reporting timing; [[Communicable Disease Conceptual Data Model]] and [[Communicable Disease Solution Architecture]] for context.

## Wireframe

The PowerPoint version of this wireframe is *OMRS Disease Maintenance* (slide 8) in [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx).

The screen is titled **Communicable Disease Maintenance** with a **Save** action. Its layout has three zones:

- **Disease attributes (left column)** — Disease Name, Lab Procedures, Associated Vaccine, Associated Symptoms.
- **Reporting / classification (right column)** — ICD-10-CA, Fastest Means Possible?, Report Timing, Closure Criteria.
- **Outbreak Definition (lower section)** — a *Minimum Case Definition Rule* (Probable / Confirmed counts, "with epi-link" toggle), setting-specific thresholds (School Absenteeism %, Congregate Care Cases), and two rule-builder grids — **Confirmed Episode Conditions** and **Probable Episode Conditions** — each with columns *Rule Name · Condition · And/Or · Date · Comments*.

## Acceptance Criteria Specifications

1. **Scenario Conditions** — What scenarios have been defined that may affect the specifications.

   1. *Authoritative maintenance, not investigation entry* — This screen edits the shared disease dictionary. It is governed stewardship (Business System Manager), distinct from an investigator's in-case "provisional add" of a missing reference value (see [[User Maintenance Screen Specifications]] §3.6).
   2. *One disease, many outbreak definitions* — A single disease can carry different outbreak definitions by **setting** and **type** (e.g., influenza in a continuing-care home vs. a school differ in thresholds and closure rules). The Outbreak Definition section must support more than one definition row per disease, keyed on setting + type, consistent with `OutbreakDefinition` being keyed on `infectiousDiseaseID + outbreakSettingID + outbreakTypeID`.
   3. *Disease attributes drive downstream behaviour* — Reporting timing, case classification (Confirmed / Probable), and outbreak thresholds are all consumed elsewhere in OMRS, so edits here ripple into live investigations. Changes are **versioned, not overwritten**.
   4. *Regulatory alignment* — Notifiable status and reporting timing must align to the *Public Health Act* and the provincial notifiable-disease list — see [[Communicable Diseases Reportable Reference List]].

2. **Functional Behaviour** — What (if any) business logic needs to be created for this.

   1. **Save** validates the mandatory fields and writes a **new version** of the affected record(s) (new `versionStatus` = Active; the prior version moves to Retired), preserving history rather than hard-overwriting.
   2. The **Episode Conditions** rule builders let a steward compose Confirmed- and Probable-tier case definitions from rows of *Rule Name + Condition*, joined by **And/Or** logic, with an effective **Date** and **Comments**. These persist as `DiseaseCaseDefinitionRule` rows (one per rule, tiered by `caseClassificationID`), added to [[OMRS Database ERD]] in v2.1.
   3. The **Minimum Case Definition Rule** (Probable / Confirmed counts), the **with epi-link** toggle, and the setting thresholds feed **automated outbreak assessment** — the values that move an investigation into the "Assess" lifecycle state.
   4. Need a way to add a **Symptom, Lab Procedure, Vaccine, or Organism** that is not yet in its dictionary. Confirm whether these are inline "+" adds on this screen or launches to separate maintenance screens (the wireframe shows "+" affordances on related Foundation screens).
   5. **Add Disease — minimum-viable quick-add.** A steward can add a new condition to the dictionary from an **Add Disease** action on the Disease list without completing the full record: only **Disease Name** (unique within the active dictionary) and **Reporting Timeline** are mandatory, and on **Add to Dictionary** a new Active version is written with `InfectiousDisease.isProvisional = true` ([[OMRS Database ERD]] v2.5). Writing the record Active keeps it immediately selectable in the Disease lookup on [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]]; the `isProvisional` flag marks it as incomplete/pending curation so stewards can find and finish it (and is cleared when the full record is completed). The remaining attributes (ICD-10-CA, lab procedures, associated symptoms/vaccine, outbreak definitions and the Confirmed/Probable episode conditions) are completed afterward in the full editor. Inline validation blocks a duplicate name or a missing mandatory field. This is the dictionary-steward equivalent of the investigator’s provisional add — fast creation now, full curation later.


3. **User Experience Considerations** — What (if any) UX options might we have to consider as part of the build.

   4. This function is part of the OMRS **Foundation** maintenance set; reuse CDOM UX where appropriate (deck slide 5) and keep it visually consistent with [[User Maintenance Screen Specifications|User Maintenance]] and Location/Facility Maintenance.
   5. **Associated Symptoms, Lab Procedures, and Associated Vaccine** are multi-value — use multi-select pickers with type-ahead and a "+" to add a missing value.
   6. The **Outbreak Definition** section likely needs a sub-grid (one row per setting/type combination) rather than a single set of fields, so a disease's congregate-care, school, and acute-care definitions can coexist.
   7. The two **Episode Conditions** grids should share a common rule-builder component (Confirmed vs. Probable differ only by tier).

8. **Data Inputs and Outputs** — What are the data elements involved for the build object. What test data is needed to support functional testing.

   9. *Inputs* — Steward-entered reference data; likely a one-time bulk import / migration from the existing CDOM disease dictionary to seed the table.
   10. *Outputs* — Disease dictionary entries consumed by the Disease lookup on Create Outbreak Investigation, by case classification, by reporting-timing logic, and by automated outbreak assessment.
   11. *Test data* — (a) a respiratory disease such as **Influenza**: FMP = No, 48-hour reporting, associated symptoms, with two outbreak definitions — continuing care (≥ 2 confirmed, epi-link required) and school (absenteeism % threshold); (b) an FMP disease such as **Measles**: FMP = Yes, with Confirmed and Probable episode-condition rules; (c) a GI disease such as **Norovirus** for congregate-care case thresholds.
   12. **ERD support (resolved in v2.1)** — the four model elements the wireframe needs are now in [[OMRS Database ERD]] (v2.1): the `Vaccine` + `DiseaseVaccine` tables (Associated Vaccine), the `DiagnosticTest` + `DiseaseTest` tables (Lab Procedures), the `DiseaseCaseDefinitionRule` table (structured Confirmed/Probable Episode Conditions, replacing free-text `caseDefinitionText`), and new `OutbreakDefinition` fields `minConfirmedCaseCount`, `minProbableCaseCount`, `absenteeismThresholdPct` and `closureCriteriaText` (setting-specific thresholds). The field table below maps to these tables.

13. **Business Rules and Validation** — What (if any) business logic governs this application function and what can be done to build in quality checks for data validation?

   14. **Disease Name** is mandatory and must be unique in the active dictionary.
   15. **ICD-10-CA** validated against the ICD-10-CA code set.
   16. **Report Timing** is mandatory for notifiable diseases; confirm whether "Fastest Means Possible?" is a distinct flag or simply the most urgent value of Report Timing (see field table — possible consolidation onto `reportingPriority`).
   17. Minimum case counts must be positive integers; a **timeframe** is required whenever a minimum case count is set (`OutbreakDefinition.timeframeDays`).
   18. A disease referenced by an **open outbreak** cannot be retired — warn or block, and require the Business System Manager to reassign or close dependent records first.
   19. Versioning: an edit creates a new version; effective/expiry windows for definitions of the same disease + setting + type must not overlap.

20. **Exception Handling** — How will the application handle edge cases, missing data, time outs, etc.?

   21. **Duplicate disease name** on save → reject with a merge suggestion (Business System Manager merge/unmerge per [[User Maintenance Screen Specifications]] AC-4).
   22. **Missing dependent dimension** (a symptom, vaccine, or test not yet in its dictionary) → offer inline add or queue for steward review rather than discarding the entry.
   23. **Concurrent edits** → optimistic locking on `versionDate`; second writer is warned and re-prompted.
   24. **Interface/timeout** on any code-set validation (e.g., ICD-10-CA service) → allow save with the value flagged "pending validation."

25. **Business Semantics** — What terminology resonates with the business for this application function.

   - "Communicable Disease Maintenance" / "Disease Dictionary"; "Case Definition" expressed as **Episode Conditions** in two tiers, **Confirmed** and **Probable**; "Outbreak Definition" (disease + setting + type → thresholds); **Fastest Means Possible (FMP)**; "Minimum Case Definition Rule"; **epi-link** (epidemiologically linked cases); "Closure Criteria."

| Screen Field | Data Type | Database Field | Data Standard | Default Value | Mandatory? | Comments |
|---|---|---|---|---|---|---|
| Disease Name | Alpha Numeric | `InfectiousDisease.infectiousDiseaseName` | Provincial notifiable-disease dictionary | None | Yes | Authoritative name; must be unique in the active dictionary. |
| ICD-10-CA | Alpha Numeric | `InfectiousDisease.infectiousDiseaseICD10Code` | ICD-10-CA | None | No | Canadian ICD-10 diagnosis code. Validate against the ICD-10-CA code set. |
| Fastest Means Possible? | Boolean / Lookup | `InfectiousDisease.reportingPriority` | FMP / 24 hours / 48 hours | None | Yes | The "Disease Classification" handling property (see [[User Maintenance Screen Specifications]] §3.4) — governs reporting urgency, not data access. |
| Report Timing | Lookup | `InfectiousDisease.reportingPriority` | FMP / 24 hours / 48 hours | Derived from FMP | Yes | Confirm whether this is distinct from "Fastest Means Possible?" or the same `reportingPriority` attribute. Likely consolidate. |
| Lab Procedures | Lookup (multi) | `DiagnosticTest.diagnosticTestName` via `DiseaseTest` | LOINC / provincial lab test code | None | No | `DiseaseTest.organismID` supports organism-specific tests and `isConfirmatoryTest` distinguishes confirmatory from screening; relates to `LineListPerson.specimenResult`. |
| Associated Vaccine | Lookup (multi) | `Vaccine.vaccineName` via `DiseaseVaccine` | Provincial vaccine catalogue / Connect Care Willow product code | None | No | `InfectiousDisease.vaccinePreventable` remains as a quick flag; the specific associated vaccines now live in the `Vaccine` / `DiseaseVaccine` tables. |
| Associated Symptoms | Lookup (multi) | `Symptom.symptomID` via `DiseaseSymptom` | Symptom dictionary | None | No | Junction carries `isTypicalSymptom`, `isRequiredForCaseDefinition`, `symptomFrequency`. |
| Outbreak Definition | Free text / structured | `OutbreakDefinition.outbreakDefinitionText` | — | None | No | Full outbreak-definition text; one definition per disease + setting + type. |
| Minimum Case Definition Rule — Probable | Numeric | `OutbreakDefinition.minProbableCaseCount` | — | None | No | Minimum probable cases to trigger; pair with `timeframeDays`. (`minCaseCount` retained as a general fallback.) |
| Minimum Case Definition Rule — Confirmed | Numeric | `OutbreakDefinition.minConfirmedCaseCount` | — | None | No | Minimum confirmed cases to trigger. |
| with epi-link | Boolean | `OutbreakDefinition.requiresEpiLink` | — | True | No | Cases must be epidemiologically linked to count toward the threshold. |
| Closure Criteria | Free text / Numeric | `OutbreakDefinition.outbreakDurationDays` + `OutbreakDefinition.closureCriteriaText` | — | None | No | Standard duration from last case (pathogen-specific); `closureCriteriaText` captures narrative closure rules not expressible as a duration or threshold. |
| School Absenteeism % | Numeric (%) | `OutbreakDefinition.absenteeismThresholdPct` | — | None | No | Setting-specific declaration/closure threshold, keyed by `outbreakSettingID` (school setting). |
| Congregate Care Cases | Numeric | `OutbreakDefinition.minConfirmedCaseCount` (congregate-care setting) | — | None | No | Congregate-care threshold; the definition row is scoped via `OutbreakDefinition.outbreakSettingID`. |
| Confirmed Episode Conditions (Rule Name · Condition · And/Or · Date · Comments) | Structured rules | `DiseaseCaseDefinitionRule` (`caseClassificationID` = Confirmed) | — | None | No | One row per rule: `ruleName`, `conditionText`, `logicalOperator` (AND/OR), `ruleSequence`, `effectiveDate`/`expiryDate`, `comments`. |
| Probable Episode Conditions (Rule Name · Condition · And/Or · Date · Comments) | Structured rules | `DiseaseCaseDefinitionRule` (`caseClassificationID` = Probable) | — | None | No | Same rule-builder structure as Confirmed; differs only by the case-classification tier. |
| Provisional? (quick-add) | Boolean | `InfectiousDisease.isProvisional` | — | True on Add Disease quick-add; otherwise False | No | Not a user field; set true by the **Add Disease** quick-add (FB 2.5) to mark an incomplete entry, cleared when the full record is completed (v2.5). |
| Created by / Create Date (audit) | Lookup / Date-Time | `AuditLog.actionBy` / `actionDateTime` | — | Logged on save | Yes | Not visible on screen; part of the maintenance audit record. |
| Version Status / Version Date | Lookup / Date | `InfectiousDisease.versionStatus` & `OutbreakDefinition.versionStatus` → `VersionStatus` (Active, Retired, Merged, Draft) | — | Active on save | Yes | Not visible on screen; supports versioning rather than overwrite. |

## Technical Implementation Notes

- **Access Specifications** — Disease-dictionary maintenance is **dictionary/dimension stewardship**, restricted to the **Business System Manager** role (or a user explicitly granted the Dictionary/dimension maintenance flag) per [[User Maintenance Screen Specifications]] §3.6 and AC-3/AC-4. Investigators and Managers do **not** perform authoritative disease maintenance — an investigator who needs a missing reference value uses a flagged *provisional add* inside a case, not this screen. Read access to the dictionary is broad.
- **Security Specifications** — The records are **reference data, not personal health information**, so the HIA "platinum identifier" controls do not apply to the rows themselves. Integrity, however, is high-stakes: disease definitions govern reporting timelines under the *Public Health Act* and the thresholds that declare an outbreak. All create / edit / retire / merge actions are audited through `AuditLog` with actor, timestamp, and before/after values; history is preserved through `VersionStatus` versioning rather than destructive update.
- **Performance Expectations** — Maintenance is low-frequency, but the dictionary is read on every outbreak creation and assessment. The lookups this screen maintains (Disease, Symptom, Outbreak Definition) must be cached and index-backed so they return within interactive response targets even during surge volumes. No response-time expectation beyond the application SLA for the maintenance actions themselves.

## Version History

- **Last Update**
  - **June 17, 2026 (Alec Blair)** — Initial draft. Populated the specification from the *OMRS Disease Maintenance* wireframe (slide 8 of the OMRS Design deck), mapped each field to the [[OMRS Database ERD]], and aligned the access model to [[User Maintenance Screen Specifications]]. Flagged four ERD gaps for resolution before build: Associated Vaccine dimension, Lab Procedure / Diagnostic Test dimension, structured Episode-Condition rule table (replacing free-text case definitions), and setting-specific closure thresholds (e.g., school-absenteeism %).
  - **June 17, 2026 (Alec Blair)** — Updated the field mapping to the resolved [[OMRS Database ERD]] v2.1: Lab Procedures → `DiagnosticTest`/`DiseaseTest`; Associated Vaccine → `Vaccine`/`DiseaseVaccine`; Confirmed/Probable Episode Conditions → `DiseaseCaseDefinitionRule`; Minimum Case Definition Rule and Closure Criteria → new `OutbreakDefinition` fields (`minConfirmedCaseCount`, `minProbableCaseCount`, `absenteeismThresholdPct`, `closureCriteriaText`). No remaining ERD gaps.
  - **June 25, 2026 (Alec Blair)** — Documented the **Add Disease** minimum-viable quick-add (Disease Name + Reporting Timeline mandatory; “Add to Dictionary” writes a new Active version; remaining attributes completed in the editor) to align the specification with the OMRS prototype. Added Functional Behaviour 2.5.
  - **June 25, 2026 (Alec Blair)** — Synced to [[OMRS Database ERD]] v2.5: the quick-add now sets `InfectiousDisease.isProvisional = true` so the entry is immediately selectable but flagged incomplete/pending curation. Updated FB 2.5 and added a `Provisional? (quick-add)` field row.
- **Link to Jira Task** — _to be added_
- **Specifications Status** — Draft for working-group review
- **Linked SBARs** — _to be added_
- **Linked Enabling Stories** — _to be added_
