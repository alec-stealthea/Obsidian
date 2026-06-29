---
type: Skill
name: hss-screen-spec
title: HSS Screen Specification Generator
description: >-
  Generate a consistent Health Shared Services (HSS) Screen Specification,
  matching the format of the Communicable Disease Maintenance and Create Outbreak
  Investigation specs in Alec Blair's HSS vault. Applies across all HSS / Community
  Care Services digital-health work — OMRA/AOMS and any other application screen.
  Use whenever the user asks to create, write, draft, or update a screen spec, a
  build specification for an application screen, a wireframe-to-build mapping, or a
  field-mapping table for an HSS / Public Health / Continuing Care / EHS / Addiction
  & Mental Health screen — even if they don't say "screen specification" explicitly.
  Triggers include: "screen spec", "screen specification", "spec out this screen",
  "build spec", "map this wireframe", "field mapping for [screen]",
  "maintenance screen spec".
tags:
  - skill
  - screen-specification
  - hss
  - omra
timestamp: 2026-06-17T00:00:00Z
---
## Purpose

Produce a screen specification that matches the established HSS format so that every
screen spec across the Health Shared Services portfolio reads consistently and is
ready for working-group review and Design-to-Build hand-off. The worked references
are **Communicable Disease Maintenance Screen Specifications** (the most polished,
OKF-conformant exemplar) and **Create Outbreak Investigation Screen Specifications**
(the original format reference) — both from the OMRA application. The same template
applies to **any** HSS application screen (Continuing Care, Emergency Health Services,
Population & Public Health, Addiction & Mental Health, Primary Care Alberta, etc.).
Match this structure — do not invent a new one.

## When to use

Use this skill whenever Alec asks to create or update a build/screen specification
for any HSS / Community Care Services digital-health application screen. OMRA (a.k.a.
AOMS) is the canonical worked example, but the format is portfolio-wide. The output is
a single Markdown file written to the relevant application's screen-specifications
folder (or wherever the user directs).

## Adapting to the application area

The section structure, the seven Acceptance Criteria, the field table, and the OKF
frontmatter are **constant across all HSS applications**. What varies per application
is the supporting context you read in step "Before you write" — substitute the right
sources for the application at hand:

- **Context file** — the application's `CLAUDE-*.md` (e.g. [[CLAUDE-OMRA]] for OMRA;
  the relevant domain context file otherwise). Always start from the HSS root
  [[CLAUDE-HSS]] if you're unsure which applies.
- **Data model** — that application's authoritative ERD / data model (for OMRA this is
  [[OMRA Database ERD]]). Every field maps to a real table/column in *that* model.
- **Wireframe** — that application's design deck and slide.
- **Access model** — the application's role/access reference (for OMRA,
  [[User Maintenance Screen Specifications]]).

If the application has no established context file or data model yet, flag that to Alec
and capture the gap rather than inventing one.

## Before you write — gather context

Always read the surrounding context first so the spec links correctly and maps to
real data-model fields rather than invented ones. (See "Adapting to the application
area" above for which sources to substitute outside OMRA.)

1. **Root and domain context** — read `CLAUDE.md` (vault root), [[CLAUDE-HSS]], and the
   relevant application `CLAUDE-*.md` context file for current naming, access model, and
   data-ownership boundaries. For OMRA, note the AOMS↔OMRA naming caveat: wireframes still
   say *AOMS*; prefer **OMRA** in new prose.
2. **The data model** — read the application's authoritative ERD (for OMRA,
   [[OMRA Database ERD]]). Every screen field must map to a real table/column. If a field
   has no home in the model, **flag the gap inline** in the Comments column — never invent
   a column silently.
3. **The wireframe** — get the slide reference and layout from the application's design
   deck. Record the slide number, the screen title, the action button(s), and the layout
   zones.
4. **The access model** — read the application's role/access reference (for OMRA,
   [[User Maintenance Screen Specifications]]). Determine which functional role owns the
   screen. For OMRA, remember the key rule: dictionary/dimension maintenance (Disease,
   Location/Facility, Organism, Vaccine, Diagnostic Test) is **Business System Manager**
   stewardship, distinct from an investigator's in-case *provisional add*.
5. **Source user stories / reference data** — link any driving user stories, SBARs,
   and reference lists (e.g. [[Communicable Diseases Reportable Reference List]]).

If any of these are missing or ambiguous, ask Alec rather than guessing. Confirm the
screen name, the wireframe slide, and the owning role before drafting.

## Conventions (non-negotiable)

- **Canadian English** throughout (colour, centre, behaviour, catalogue, defence).
- **OKF-conformant YAML frontmatter** on the output file — `type: Screen Specification`
  is required.
- **WikiLinks** for every internal vault reference. Use standard markdown links only for
  external URLs (SharePoint deck, OneNote). Do **not** create WikiLinks to notes that
  don't exist — flag a missing note to Alec instead.
- **Prose over bullets** in the context and notes sections where it reads naturally;
  the Acceptance Criteria sections use the numbered sub-list structure.
- **Map every field to the data model**; flag gaps inline rather than inventing fields.
- **Versioning, not overwrite** — reference data edits create a new `VersionStatus`
  version; reflect this in Functional Behaviour and Business Rules where relevant.

## Document structure

Produce the sections below, in this exact order.

### 0. YAML frontmatter (OKF)

```yaml
---
type: Screen Specification
title: <Screen Name> Screen Specifications
description: <One-sentence build-spec summary: what this screen does and what it maps to.>
tags:
  - screen-specification
  - <application tag, e.g. omra>
  - <screen-specific tags>
timestamp: <ISO 8601, e.g. 2026-06-17T00:00:00Z>
---
```

### 1. Design Specification Context

A short prose paragraph (or two) explaining what the screen is for, where it sits in
the application, and what depends on it. Then a bulleted **"Source material for this
specification"** list linking: the **Wireframe** (deck + slide), the **Data model**
(with version/date), the **Access model**, and any **Reference data** / **source user
stories**. State which "set" of functions the screen belongs to (e.g. the Foundation
maintenance set) and cross-link sibling screens.

### 2. Wireframe

Name the wireframe and link the PowerPoint slide. Then describe the layout in prose —
the screen title, the action button(s) (e.g. **Save** / **Create**), and the layout
zones/columns with the fields each contains.

### 3. Acceptance Criteria Specifications

Seven numbered sections, each with its standard prompt and numbered sub-points. Keep
the prompts verbatim:

1. **Scenario Conditions** — What scenarios have been defined that may affect the
   specifications.
2. **Functional Behaviour** — What (if any) business logic needs to be created for this.
3. **User Experience Considerations** — What (if any) UX options might we have to
   consider as part of the build.
4. **Data Inputs and Outputs** — What are the data elements involved for the build
   object. What test data is needed to support functional testing.
5. **Business Rules and Validation** — What (if any) business logic governs this
   application function and what can be done to build in quality checks for data
   validation?
6. **Exception Handling** — How will the application handle edge cases, missing data,
   time outs, etc.?
7. **Business Semantics** — What terminology resonates with the business for this
   application function.

Populate each with concrete, screen-specific sub-points. It is fine for a section to
hold a single point, or to surface an open question to resolve before build. Section 4
should name concrete **test data** examples.

### 4. Field-mapping table

A Markdown table with exactly these seven columns, in this order:

`| Screen Field | Data Type | Database Field | Data Standard | Default Value | Mandatory? | Comments |`

Rules for the table:

- One row per screen field, in the visual order of the wireframe.
- **Data Type** — Alpha Numeric, Numeric, Boolean / Lookup, Lookup (multi), Date /
  Date-Time, Free text, Structured rules, etc.
- **Database Field** — `Table.column` in code formatting, mapped to the data model. For
  multi-value fields, show the junction (e.g. `Symptom.symptomID` via `DiseaseSymptom`).
- **Data Standard** — code set or dictionary (ICD-10-CA, LOINC, provincial lists), or
  `—` if none.
- **Mandatory?** — Yes / No.
- Include **non-visible audit/version rows** at the end (Created by / Create Date;
  Version Status / Version Date → `VersionStatus`), marked "Not visible on screen" in
  Comments.
- Use the **Comments** column to flag model gaps, consolidation questions, and downstream
  dependencies.

### 5. Technical Implementation Notes

Three bulleted items, each a short prose explanation:

- **Access Specifications** — which role(s) may use the screen; tie to the access model.
- **Security Specifications** — data sensitivity (reference data vs. PHI / HIA platinum
  identifier), audit (`AuditLog`), and compliance considerations (Public Health Act
  where relevant).
- **Performance Expectations** — response-time / caching expectations, or "None other
  than application SLA."

### 6. Version History

- **Last Update** — a nested list of dated entries: `Month D, YYYY (Author) — note`.
  The first entry is normally "Initial draft" describing what was populated and any
  gaps flagged.
- **Link to Jira Task** — `_to be added_` if unknown.
- **Specifications Status** — e.g. *Draft*, *Draft for working-group review*.
- **Linked SBARs** — `_to be added_` if unknown.
- **Linked Enabling Stories** — `_to be added_` if unknown.

## Output and hand-off

1. Default filename: `<Screen Name> Screen Specifications.md`.
2. Default location: the application's screen-specifications folder (for OMRA, the vault
   `OMRA Screen Specifications/` folder). Confirm the path with Alec if it's the first
   spec in a new area.
3. After writing, summarise (a) which data-model tables/columns the fields mapped to and
   (b) any open questions or model gaps flagged for resolution before build.
4. If the spec revealed reusable context (new tables, settled decisions), follow the
   vault's Context Update Protocol: **propose** an update to the application's `CLAUDE-*.md`
   context file for Alec's approval rather than editing it silently.

## Quality checklist (verify before finishing)

- [ ] OKF frontmatter present with `type: Screen Specification`.
- [ ] All seven Acceptance Criteria sections present, prompts verbatim, in order.
- [ ] Field table has the seven columns in the correct order.
- [ ] Every field maps to a real data-model table/column, or the gap is flagged in Comments.
- [ ] Audit and Version Status rows included and marked non-visible.
- [ ] Access / Security / Performance notes present.
- [ ] Version History with dated entry, Status, Jira, SBARs, Enabling Stories.
- [ ] Canadian English; WikiLinks for internal refs; no dangling WikiLinks.

---

_Last Updated_: 2026-06-17
_Maintained By_: Alec Blair
