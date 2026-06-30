---
type: Screen Specification
title: Create Facility Questionnaire Screen Specifications
description: Build specification for the OMRA Create Facility Questionnaire screen, where an investigator assembles the line-list or aggregate questionnaire a facility completes for an outbreak, mapping the wireframe to the OMRA database model and flagging the questionnaire-template ERD gap.
tags:
  - screen-specification
  - omra
  - communicable-disease
  - outbreak-management
  - facility-questionnaire
  - line-list
  - aggregate-report
timestamp: 2026-06-29T00:00:00Z
---
## Design Specification Context

This screen lets an investigator **assemble the questionnaire a facility uses to report an outbreak** — either an identifiable **line list** or a summary **aggregate** report. It is launched in-context from an existing outbreak (the wireframe carries the **Outbreak ID**, **Outbreak Name**, **Location**, **Outbreak Setting** and **Disease** through from the investigation), and its product is a reusable reporting instrument: an Excel template, a fillable PDF, and/or an Outbreak Incident web page that the facility operator completes and returns. In the OMRA value stream it sits between **Create Outbreak Investigation** (which establishes the `Outbreak` the questionnaire is built for) and the **facility submission** screen (slide 17, *OMRA Submit Questionnaire*), where the completed instrument is received and validated.

The instrument is **instantiated from a reusable template** maintained on [[Facility Questionnaire Maintenance Screen Specifications]] — a generic baseline or an extended named template the steward has published — which the investigator then tunes for this outbreak. The screen is the **build/design half** of the questionnaire pair. Its counterpart, *Submit Questionnaire* (slide 17), is the facility-facing fill-and-return half. The two are distinct from the contact-tracing equivalent, *Create Contact Investigation* (slide 16), which is specified separately in [[Contact Identification Screen Specifications]] and is backed by the `DiseaseContactQuestion` / `ContactDiseaseQuestionResponse` model.

Because the questionnaire defines **which columns and questions** a facility must answer for this outbreak, it is a configuration instrument rather than a data-entry screen. The design intent is to **pre-populate the instrument from what is already known** about the outbreak — disease attributes, organism, vaccine-preventability, the relevant symptom list and the outbreak setting — so the investigator confirms and tunes a sensible default rather than building a questionnaire from a blank slate. The investigator can then add questions beyond the core set.

> **Scope — facility and non-facility outbreak questionnaires.** This screen covers the **outbreak** questionnaire (the line-list or aggregate instrument completed and returned for an outbreak). It serves both a **facility** outbreak (a continuing-care home, school, etc.) and a **non-facility** outbreak — a community, environmental, or genomically linked (WGS) event with no reporting facility — by treating **Facility as a non-mandatory field** (see Scenario 1.4 and BR 5.5). This decision (2026-06-29) replaces the previously proposed separate "Create/Update Non-Facility Line List" story; the non-facility line list is a scenario of this same instrument, tracked as CD-OI-27 in [[Communicable Disease Open Issues]]. **Individual / per-case questionnaires are entered into the Epic Communicable Disease episode**, consistent with the OMRA data-ownership boundary that **Connect Care (Epic) is the system of record for individual cases** (see [[CLAUDE-OMRA]]). OMRA owns the outbreak-level instrument and its submissions; once a reported case requires an individual CD episode, the per-case questionnaire detail is captured in Epic, not here. The contact-investigation equivalent (slide 16) is specified separately in [[Contact Identification Screen Specifications]].

> **Naming caveat.** The wireframe (slide 15) is titled *OMRA Create Questionnaire*; its on-screen heading reads *Create Facility Investigation (Line List or Aggregate) Questionnaire*. Earlier artifacts use *AOMS*; prefer **OMRA** in new prose. This file is titled *Create Facility Questionnaire* to distinguish it from the contact-investigation and submit-side screens.

> **Central ERD gap — no questionnaire-template entity.** The [[OMRA Database ERD]] (v2.5) has **no table that represents a questionnaire definition**. Today the facility line list is a *fixed-schema* feed (`FacilityLineList` → `LineListPerson` / `LineListPersonSymptom`, Section 5) and the aggregate report is the fixed `FacilityOutbreakAggregateReport` (Section 8). This screen presumes those instruments become **configurable per outbreak**, which requires new template tables — provisionally an `OutbreakQuestionnaire` (the instrument: outbreak + mode + generated outputs) and a `QuestionnaireItem` (the selected/added columns and their order, response type and source binding). The nearest existing analogue is the contact-question pair `DiseaseContactQuestion` / `ContactDiseaseQuestionResponse`. The reusable **parent** of `OutbreakQuestionnaire` — a `QuestionnaireTemplate` / `QuestionnaireTemplateItem` library (the generic baseline and extensible named templates) — is specified on [[Facility Questionnaire Maintenance Screen Specifications]]; `OutbreakQuestionnaire.questionnaireTemplateID` records which template an outbreak's instrument was instantiated from. These tables are **flagged here for design, not invented in the model**; the field table below maps each questionnaire column to the `LineListPerson` / aggregate column it configures and marks the template layer as a gap. See Dependencies.

Source material for this specification:

- **Wireframe** — *OMRA Create Questionnaire* (slide 15) of [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx); the *Submit Questionnaire* counterpart is slide 17.
- **Data model** — [[OMRA Database ERD]] (v2.5): `Outbreak` (Section 1), `Facility` (Section 4), the line-list entities `FacilityLineList`, `LineListPerson`, `LineListPersonType`, `CaseClassification`, `LineListPersonSymptom` (Section 5), `FacilityOutbreakAggregateReport` (Section 8), the disease-reference entities `InfectiousDisease`, `Organism` / `DiseaseOrganism`, `Symptom` / `DiseaseSymptom`, `Vaccine` / `DiseaseVaccine`, `DiagnosticTest` / `DiseaseTest` (Section 10), and — for the analogue pattern — `DiseaseContactQuestion` / `ContactDiseaseQuestionResponse` (Section 15).
- **Access model** — [[User Maintenance Screen Specifications]] (Role-Based Access Specification); the **Facility Operator** login (role 7) consumes the instrument this screen produces.
- **Source user stories** — [[08 - Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1, the line-list instrument), [[07 - Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1, the aggregate instrument), and [[06 - Document Facility Outbreak Phone Encounter - PPHST Call Analyst User Story]] (the PPHST intake that may attach a completed instrument). Anchored by [[02 - Create Outbreak Investigation - CDC Investigator User Story]] (O-A-4) and [[Create Outbreak Investigation Screen Specifications]], from which this screen is launched.
- **Architecture context** — [[Communicable Disease Solution Architecture]] (the Food and Travel questionnaire flowsheets and the REDCap-replacement intent).

## Wireframe

The PowerPoint version is *OMRA Create Questionnaire* (slide 15) in [Alberta Outbreak Management Reporting Application (OMRA) Design.pptx](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/Shared%20Documents/General/Solution%20Design%20Documents/Outbreak%20Management%20Application/Alberta%20Outbreak%20Management%20System%20Design.pptx). It will be replaced by a screen-shot of the most recent wireframe once folded into the deck.

The screen is headed **Create Facility Investigation (Line List or Aggregate) Questionnaire** with a **Build Questionnaire** action. Its layout has three zones:

- **Outbreak context (header, read-only)** — Created (date), Outbreak Name, Location, Outbreak Setting, Outbreak ID, and Disease, carried through from the launching [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]] record.
- **Questionnaire builder (centre)** — two configurable column sets the investigator tunes for this outbreak:
  - a **clinical grid** with columns *Demographics / Role · Signs / Symptoms · Lab · Result · Prophylaxis · Vaccinated* (the wireframe shows the response affordances: Lab = Y/N, Result = +/−, Prophylaxis = Y/N); and
  - an **outcome grid** with columns *Demographics / Role · Hospital · Admitted · Cause of Death · Date*.
- **Extension** — an **Additional Questions** affordance to add outbreak- or disease-specific questions beyond the core columns.

The slide 17 *Submit Questionnaire* counterpart adds the facility-side actions — **Save**, **Download Excel**, **Download .pdf**, **Upload File**, **Submission Date**, **Submission History**, and **Validate** — confirming that the outputs this screen generates are an Excel template, a PDF, and an uploadable/validating web form.

## Acceptance Criteria Specifications

1. **Scenario Conditions** — What scenarios have been defined that may affect the specifications.

   1. *Aggregate vs. Line List.* A single screen produces **either** an identifiable **line-list** questionnaire (one row per person — the [[08 - Submit Facility Outbreak Line List - Facility Operator User Story|O-ET-1]] instrument) **or** a summary **aggregate** questionnaire (period counts split staff vs. client — the [[07 - Submit Aggregate Outbreak Report - Facility Operator User Story|O-M-1]] instrument). The chosen mode determines which columns are offered and which output structure is generated. Confirm whether mode is selected explicitly on this screen or inferred from the outbreak setting (e.g., schools/child care → aggregate per the care-setting guides).
   2. *Launched in context.* The screen is opened from an existing outbreak, so the outbreak identity and facility context are inherited rather than re-entered (see Data Inputs).
   3. *Configurable instrument over fixed schema.* The questionnaire selects and orders columns the facility must answer; this presumes a questionnaire-template layer that does not yet exist in the ERD (see context gap and Dependencies).
   4. *Facility vs. non-facility outbreak.* The instrument supports a **non-facility** outbreak — a community, environmental, or genomically linked (WGS) cluster with no reporting facility. In this scenario **Facility is not required**: the inherited facility context (name, address, phone, contact, affected unit) is optional, the location/area is captured as free text, and the investigator (rather than a facility operator) typically completes or attaches the instrument. This is the home for the non-facility and WGS-candidate line-list path (see [[05 - Outbreak Assessment - CDC Investigator User Story]] O-A-6 AC6; tracked as CD-OI-23 / CD-OI-27 in [[Communicable Disease Open Issues]]).

2. **Functional Behaviour** — What (if any) business logic needs to be created for this.

   1. **Pre-definition of the core questionnaire** from what the outbreak already knows. On launch, the builder proposes a default column set derived from:
      - **Organism attributes** — via `Outbreak` → `OutbreakOrganism` → `Organism` (and `DiseaseOrganism`), shaping the relevant lab tests/results.
      - **Vaccine-preventable** — `InfectiousDisease.vaccinePreventable`; when true, the **Vaccinated** column (and associated vaccine) is included, otherwise suppressed.
      - **Symptom list** — `Symptom` via `DiseaseSymptom` for the disease, seeding the **Signs / Symptoms** options (the [[08 - Submit Facility Outbreak Line List - Facility Operator User Story|O-ET-1]] AC3 requirement to display the outbreak case definition's specific symptoms).
      - **Outbreak Setting** — `OutbreakSetting`, which influences default mode (line list vs. aggregate) and which person types/units apply.
   2. **Build Questionnaire** validates the configuration and generates the selected outputs (see Data Outputs). The instrument is persisted as a versioned template against the outbreak so later submissions resolve against a known column set.
   3. **Lab / Result / Prophylaxis / Vaccinated** are configurable toggles. *Prophylaxis* needs a model home — confirm whether prophylaxis is part of the **Disease Definition** or a new line-list attribute (gap; see field table).
   4. **Newly symptomatic staff / patients** is a **calculated** value derived incrementally from the prior submission rather than a captured field, so the facility is not asked to re-state cumulative counts.
   5. Versioning, not overwrite — re-building the questionnaire for an outbreak creates a new `VersionStatus` version of the instrument so prior submissions remain interpretable against the schema they were collected under.

3. **User Experience Considerations** — What (if any) UX options might we have to consider as part of the build.

   1. **Adding attributes beyond the core columns.** Determine the UX for extending the questionnaire past the pre-populated core set — an **Additional Questions** builder (add a labelled question, pick a response type — Boolean, Lookup, Free text, Date — and an optional source binding), reusing the response-type pattern already modelled on `DiseaseContactQuestion.responseType`.
   2. Keep the builder visually consistent with the other OMRA investigation screens ([[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]], [[Contact Identification Screen Specifications|Contact Identification]]).
   3. Make the **mode** (line list vs. aggregate) and its consequences obvious, since the two produce structurally different instruments and outputs.
   4. Present the inherited outbreak context as read-only, clearly distinct from the editable questionnaire definition.

4. **Data Inputs and Outputs** — What are the data elements involved for the build object. What test data is needed to support functional testing.

   1. *Data inputs.* Because the screen is launched from [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]], it inherits the **Outbreak ID**, **Facility** (name, address, phone), **facility contact**, **Outbreak Setting**, **Location** and **Disease**. The questionnaire is then pre-populated from the Outbreak Investigation details with the core columns:
      - **Demographics** (and role — client/resident vs. staff/HCW, `LineListPersonType`),
      - **Signs and symptoms** (`Symptom` / `LineListPersonSymptom`),
      - **Lab requisition & result** (`DiagnosticTest` / `DiseaseTest`; `LineListPerson.specimenResult`),
      - **Prophylaxis received?** — confirm whether this belongs to the Disease Definition (gap),
      - **Vaccine** (if applicable — `Vaccine` / `DiseaseVaccine`; the model needs **date administered**, a gap),
      - **Deaths / hospitalizations** (`LineListPerson.isHospitalized` / `hospitalizationDate` / `isDied` / `deathDate`),
      - **Newly symptomatic staff / patients** — a calculated increment from the prior submission (FB 2.4).
   2. *Data outputs.* **Build Questionnaire** can produce:
      - **Create Spreadsheet** — an Excel line-list template the facility uploads through the portal, e-mails, or faxes ([[08 - Submit Facility Outbreak Line List - Facility Operator User Story|O-ET-1]] Desirable AC2, the schema-aligned template);
      - **Create PDF** — a fillable/printable PDF for line-list reporting, potentially generated from the Excel form;
      - **Create Web Page** — an Outbreak Incident page supporting daily updates to provided information and the addition of new patients ([[07 - Submit Aggregate Outbreak Report - Facility Operator User Story|O-M-1]] AC8, the accessible web portal).
   3. *Test data* — (a) a **respiratory line-list** questionnaire (continuing-care home, vaccine-preventable disease such as influenza → Vaccinated column present, symptom set seeded, Excel + PDF outputs); (b) an **aggregate** questionnaire (school or child-care, GI symptoms → counts split staff/student, web-page output, no identifiable columns); (c) a **disease without a vaccine** (e.g., norovirus → Vaccinated column suppressed) to verify conditional pre-definition.

5. **Business Rules and Validation** — What (if any) business logic governs this application function and what can be done to build in quality checks for data validation?

   1. The generated output must be **pre-populated with the known fields** from the outbreak data so the facility answers, rather than re-keys, what is already known:
      - **Facility Unit list** (`Building` / `Department` / `Room`) for the affected-area picker,
      - **Gender** drop-down,
      - **Day/month** drop-down where applicable (e.g., onset dates),
      - **Lab results +/−** control,
      - **Specimen collected** checkbox (`LineListPerson.specimenCollectionDate`).
   2. Mode integrity — a line-list instrument must include the identifiers needed to resolve a person; an aggregate instrument must not collect identifiable person rows (it carries counts only).
   3. Conditional columns — **Vaccinated** appears only when the disease is vaccine-preventable; **Prophylaxis** appears only once its model home is confirmed.
   4. Versioning — re-building must not silently change the schema of an outbreak with submissions already received; create a new version and keep prior submissions interpretable.
   5. **Facility is not mandatory.** For a non-facility outbreak (Scenario 1.4), the build must not require a facility identity. Facility name/address/phone/contact and the affected unit are optional; a free-text location/area is accepted in their place. Facility-dependent affordances (the `Building`/`Department`/`Room` unit picker in BR 5.1) gracefully degrade to free text when no facility is attached. The instrument still anchors to the `Outbreak` (Outbreak ID remains mandatory). See CD-OI-27 in [[Communicable Disease Open Issues]].

6. **Exception Handling** — How will the application handle edge cases, missing data, time outs, etc.?

   1. **Missing outbreak context** (screen reached without an Outbreak ID) → block and route the user back to [[Create Outbreak Investigation Screen Specifications|Create Outbreak Investigation]] rather than building an unanchored instrument.
   2. **Disease with no seeded symptom/test/vaccine reference data** → allow the build with the core demographic/outcome columns and surface a notice that disease-specific columns were not pre-populated (the dictionary can be completed via [[Communicable Disease Maintenance Screen Specifications|Disease Maintenance]]).
   3. **Output-generation failure / timeout** (Excel, PDF or web-page generation) → fail the affected output without losing the saved questionnaire definition; allow re-generation.
   4. **Re-build after submissions exist** → warn and version (BR 4) rather than overwrite.

7. **Business Semantics** — What terminology resonates with the business for this application function.

   - "Facility Investigation Questionnaire" (the instrument); **Line List** (identifiable, one row per person) vs. **Aggregate** (summary counts); "Build Questionnaire"; "Additional Questions"; "Demographics / Role"; **Signs / Symptoms**; **Lab** and **Result (+/−)**; **Prophylaxis**; **Vaccinated**; "Outbreak Incident page"; "Submission" / "Submission History" (the slide-17 fill side); "newly symptomatic" (incremental, calculated).

## Field-mapping table

The header fields are inherited read-only from the outbreak. The questionnaire-definition columns are the **instrument the screen configures**; each maps to the `LineListPerson` / aggregate column it will collect, while the *template layer that records which columns were selected and in what order is an ERD gap* (provisional `OutbreakQuestionnaire` / `QuestionnaireItem`).

| Screen Field | Data Type | Database Field | Data Standard | Default Value | Mandatory? | Comments |
|---|---|---|---|---|---|---|
| Outbreak ID | Alpha Numeric | `Outbreak.outbreakID` | Auto-generated | Inherited from launch | Yes | Read-only; anchors the questionnaire to the investigation. |
| Outbreak Name | Alpha Numeric | `Outbreak.outbreakName` | — | Inherited | No | Read-only context. |
| Created | Date | `OutbreakQuestionnaire.createdDate` | Date | System-generated | Yes | **Gap** — no questionnaire-template table; provisional `OutbreakQuestionnaire`. |
| Location | Lookup | `Outbreak.outbreakFacility` → `Facility.facilityName` (+ `facilityAddress`, `facilityPhone`) | Location/Facility list | Inherited | No | Read-only; facility name/address/phone carried for the output header. **Optional in the non-facility scenario** (Scenario 1.4 / BR 5.5) — a community/environmental/WGS outbreak has no facility, so a free-text location/area is used instead (`FacilityLineList.facilityID` nullable). Facility **contact person** is itself an ERD gap (see [[Submit Aggregate Outbreak Report - Facility Operator User Story|O-M-1]]). |
| Outbreak Setting | Lookup | `OutbreakSetting.outbreakSettingName` | CDC Guide setting categories | Inherited | No | Influences default mode (line list vs. aggregate) and unit/person types. |
| Disease | Lookup | `InfectiousDisease.infectiousDiseaseName` | Provincial notifiable-disease dictionary | Inherited | Yes | Drives symptom/test/vaccine pre-definition. |
| Questionnaire Mode (Line List / Aggregate) | Boolean / Lookup | `OutbreakQuestionnaire.questionnaireMode` | Line List / Aggregate | Derived from setting | Yes | **Gap** — provisional `OutbreakQuestionnaire.questionnaireMode`. Determines column set and output structure. |
| Demographics / Role | Lookup | `LineListPersonType.personTypeName` (Client/Resident vs. HCW/Staff) | Person-type list | Both included | Yes | The row/identity dimension; in aggregate mode collapses to the staff-vs-client split (`FacilityOutbreakAggregateReport.staff*` / `client*`). |
| Signs / Symptoms | Lookup (multi) | `Symptom.symptomName` via `DiseaseSymptom` → collected as `LineListPersonSymptom` | Symptom dictionary | Seeded from disease | No | Pre-populated from the disease's symptom list; investigator may trim/extend. |
| Lab (Y/N) | Boolean | `LineListPerson.specimenCollectionDate` (collected?) / `DiseaseTest` for test offered | LOINC / provincial lab code | Included | No | "Lab" toggle = whether a specimen/test is part of this questionnaire; pairs with **Specimen collected** checkbox on the output (BR 5.1). |
| Result (+/−) | Boolean / Lookup | `LineListPerson.specimenResult` | — | Included | No | Wireframe shows +/−; confirm whether a richer result value set is needed. |
| Prophylaxis (Y/N) | Boolean | *No ERD field* | — | Conditional | No | **Gap** — no prophylaxis attribute exists. Confirm whether prophylaxis belongs to the **Disease Definition** (`OutbreakDefinition` / `InfectiousDisease`) or a new `LineListPerson.prophylaxisReceived` (+ date). FB 2.3. |
| Vaccinated | Boolean | `LineListPerson` (vaccination status) ; vaccine from `Vaccine` via `DiseaseVaccine` | Provincial vaccine catalogue / Connect Care Willow | Conditional on `vaccinePreventable` | No | **Gap** — there is no vaccination-status or **date administered** field on `LineListPerson`. The source note "add Vaccine to the data model which includes date administered" applies here. Column suppressed when the disease is not vaccine-preventable. |
| Hospital | Alpha Numeric | `LineListPerson.hospitalName` | — | Included | No | Outcome grid. |
| Admitted | Boolean / Date | `LineListPerson.isHospitalized` / `hospitalizationDate` | Date | Included | No | Outcome grid. |
| Cause of Death | Alpha Numeric / Boolean | `LineListPerson.isDied` / `deathRelatedToOutbreak` | — | Included | No | Outcome grid; `deathRelatedToOutbreak` distinguishes outbreak-related deaths. |
| Date | Date | `LineListPerson.deathDate` (outcome) / `symptomOnsetDate` | Date | Included | No | Date associated with the outcome/onset; day/month drop-down per BR 5.1. |
| Additional Questions | Structured rules | *No ERD field* (analogue: `DiseaseContactQuestion` / `ContactDiseaseQuestionResponse`) | — | None | No | **Gap** — provisional `QuestionnaireItem` rows (questionText, responseType, sequence, sourceBinding). Reuse the contact-question response-type pattern. UX 3.1. |
| Newly symptomatic (staff / patients) | Numeric (calculated) | Derived from prior submission (`FacilityOutbreakAggregateReport` deltas / `LineListPerson.lineListPersonDateAdded`) | — | Calculated | No | Not captured; incremental calculation from the previous submission. FB 2.4. |
| Output: Excel template | — | `OutbreakQuestionnaire.excelTemplateRef` | — | On Build | No | **Gap** — provisional output-reference fields. Schema-aligned to `LineListPerson` ([[Submit Facility Outbreak Line List - Facility Operator User Story|O-ET-1]] Desirable AC2). |
| Output: PDF | — | `OutbreakQuestionnaire.pdfTemplateRef` | — | On Build | No | **Gap** — provisional. Fillable/printable line-list PDF. |
| Output: Web page (Outbreak Incident) | — | `OutbreakQuestionnaire.webFormRef` | — | On Build | No | **Gap** — provisional. Accessible portal ([[Submit Aggregate Outbreak Report - Facility Operator User Story|O-M-1]] AC8). |
| Created by / Create Date (audit) | Lookup / Date-Time | `AuditLog.actionBy` / `actionDateTime` | — | Logged on build | Yes | Not visible on screen; part of the build audit record. |
| Version Status / Version Date | Lookup / Date | `OutbreakQuestionnaire.versionStatus` → `VersionStatus` (Active, Retired, Merged, Draft) | — | Active on build | Yes | Not visible on screen; supports versioning so prior submissions stay interpretable. **Gap** — depends on the provisional template table. |

## Technical Implementation Notes

- **Access Specifications** — Building a facility questionnaire is **investigator** activity within the OMRA access model ([[User Maintenance Screen Specifications]]), scoped by team/zone/disease group to the outbreak being worked; a PPHST Call Analyst may also assemble or attach an instrument during intake ([[06 - Document Facility Outbreak Phone Encounter - PPHST Call Analyst User Story]]). The instrument is **consumed** by the **Facility Operator** login (role 7), whose authentication-free web-form / Excel-upload path is defined on the slide-17 *Submit Questionnaire* screen, not here. Confirm whether questionnaire design is restricted to Investigator-and-above or open to all intake users.
- **Security Specifications** — The questionnaire *definition* is coordination/configuration metadata, but the instruments it generates **collect personal health information** (line-list demographics, the HIA "platinum" identifiers) once a facility completes them. Build/edit/version actions are audited through `AuditLog` (actor, timestamp, before/after); collection and use are governed by the **Health Information Act (HIA)** and notifiable-disease reporting under the **Public Health Act** (ss. 22, 26). Output generation and any disclosure of completed instruments should align with the disclosure-audit approach used elsewhere in OMRA (`DisclosureExportLog`).
- **Performance Expectations** — Questionnaire building is low-frequency; output generation (Excel/PDF/web page) should complete within interactive targets but may be queued for large instruments. No response-time expectation beyond the application SLA. The disease-reference lookups that drive pre-definition (Symptom, Test, Vaccine) must be cached and index-backed.

## Version History

- **Last Update**
  - **June 29, 2026 (Alec Blair)** — Initial draft. Migrated the Create Facility Questionnaire specification from the OneNote repository into the OMRA screen-spec standard: added OKF frontmatter; wrote the context and wireframe sections from *OMRA Create Questionnaire* (slide 15 of the OMRA Design deck); populated the seven Acceptance Criteria sections from the source notes (Aggregate-vs-Line-List scenario; pre-definition from organism/vaccine-preventable/symptom/setting; add-attribute UX; inherited Outbreak Investigation inputs; Excel/PDF/web-page outputs; pre-populated output controls); and built the field-mapping table against [[OMRA Database ERD]] v2.5. Linked the driving Facility Operator stories [[08 - Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1) and [[07 - Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1), the PPHST intake story [[06 - Document Facility Outbreak Phone Encounter - PPHST Call Analyst User Story]], and the launching [[Create Outbreak Investigation Screen Specifications]]. Flagged ERD gaps for resolution before build: **no questionnaire-template entity** (provisional `OutbreakQuestionnaire` / `QuestionnaireItem`, analogue `DiseaseContactQuestion`); **no prophylaxis attribute**; **no vaccination-status / date-administered field** on `LineListPerson`; facility **contact person**; and output-reference storage.
  - **June 29, 2026 (Alec Blair)** — Renamed the screen to **Create Facility Questionnaire** to scope it explicitly to the facility line-list/aggregate instrument, and recorded the data-ownership boundary that **individual / per-case questionnaires are entered into the Epic Communicable Disease episode** (Connect Care is the system of record for individual cases). Added a Scope note in the context section.
  - **June 29, 2026 (Alec Blair)** — Added the **non-facility outbreak scenario** per the 2026-06-29 decision (CD-OI-26 resolved): a community/environmental/WGS-cluster outbreak uses this same instrument with **Facility made a non-mandatory field**, replacing the previously proposed separate Non-Facility Line List story. Updated the Scope note, added Scenario 1.4, BR 5.5, and the Location field-mapping note; this is now the home for the WGS-candidate / non-facility line-list path (CD-OI-23). Build consequence (nullable `FacilityLineList.facilityID`) tracked as CD-OI-27.
- **Link to Jira Task** — _to be added_
- **Specifications Status** — Draft for working-group review
- **Linked SBARs** — _to be added_
- **Linked Enabling Stories** — [[08 - Submit Facility Outbreak Line List - Facility Operator User Story]] (O-ET-1); [[07 - Submit Aggregate Outbreak Report - Facility Operator User Story]] (O-M-1); [[06 - Document Facility Outbreak Phone Encounter - PPHST Call Analyst User Story]] (O-C-[TBD])
