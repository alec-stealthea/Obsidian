---
type: Skill
title: "User Story Generator"
timestamp: 2026-06-26T19:19:05Z
name: user-story-generator
description: Generate structured user stories following Health Shared Services (HSS) enterprise architecture standards, with two-tier acceptance criteria, Alberta regulatory traceability (HIA, Public Health Act), and backlog metadata. Use whenever the user asks to create, write, or generate a user story, draft acceptance criteria, convert requirements or meeting notes into agile backlog items, or document a feature or capability need for a healthcare system — even if they don't say "user story" explicitly.
---

# User Story Generator

Generate user stories that meet Health Shared Services (HSS) enterprise architecture standards: specific personas, testable two-tier acceptance criteria, Alberta regulatory traceability, and complete backlog metadata.

## Interaction Pattern

Before generating, confirm four things (ask only for what's missing — if the conversation or source notes already answer them, proceed):

1. **User role** — the specific persona (e.g., "Public Health Nurse", "Clinical Data Analyst", "FHIR API Consumer"), never just "user".
2. **System(s) involved** — e.g., Epic Connect Care, Snowflake, a FHIR API, the Outbreak Application.
3. **Business problem** — what outcome the capability serves.
4. **Regulatory drivers** — whether HIA, Public Health Act reporting, or other standards apply.

If an AskUserQuestion tool is available, use it to gather these. After generating, offer refinement: more scenarios, tightened criteria, adjusted metadata, or added regulatory references.

## Story Formula

```
As a [specific user role/persona]
I need [capability — not the implementation]
so that I can [measurable business outcome]
```

Focus the "need" on the business capability instance, not implementation specifications. Implementation belongs in design documentation, not the story.

## Scenarios

Include 2–4 concrete scenarios: the happy path, alternative flows, and edge cases or exceptions.

```
Scenario A — [Context and expected behaviour]
Scenario B — [Alternative context or edge case]
```

## Acceptance Criteria — Two Tiers

**1. Minimum (MVP — Must Have)**: essential, independently testable criteria in Given/When/Then form, with regulatory cross-references where applicable. At least 3.

**2. Desirable (Nice to Have)**: enhancements, performance optimizations, UX improvements, future-iteration candidates. At least 2.

### Regulatory Cross-References (Alberta health context)

Link criteria to the governing instrument so requirements are traceable to their source:

- **Health Information Act (HIA)**, RSA 2000, c H-5 — Alberta's health information privacy legislation (not PHIA, which is Manitoba/Nova Scotia)
- **Public Health Act** and Communicable Diseases Regulation — notifiable disease reporting requirements
- **FHIR specifications** — e.g., FHIR R4 resources, CA Core profiles
- **ISO/IEC standards** — e.g., ISO 13606, ISO 27001
- **TOGAF/ArchiMate** guidance documents
- **HSS / Alberta Health IM-IT policies** and clinical informatics standards

Cite the specific section where known; flag uncertain references as `[verify]` rather than inventing section numbers.

## Metadata Block

Include all fields; use realistic values from context and `[TBD]` placeholders for unknowns:

- **Value Stream**: align with portfolio business areas — e.g., Population and Public Health, Continuing Care (Assisted Living Alberta), Emergency Health Services, Addiction and Mental Health (Recovery Alberta)
- **Value Stream Stage**: e.g., Discovery, Development, Delivery, Operations
- **User Story ID**: `US-[YEAR]-[SEQUENCE]` (e.g., US-2026-0142)
- **CSD Workflow Status**: default "Analysis"; others: Ready for Dev, In Development, Testing, Done
- **IT Build Team(s)**: specific team names (e.g., Data Integration Team, Epic Connect Care Team, Enterprise Architecture)
- **Link to System Design Documentation**: URL or `[Link to Design Doc — TBD]`
- **Update Comments**: dated entries, e.g., `* 2026-06-10: Initial story creation`
- **Link to meeting minutes for Design signoff**: URL or `[Link — TBD]`

## Quality Check (INVEST)

Before presenting the story, verify it is **I**ndependent, **N**egotiable, **V**aluable, **E**stimable, **S**mall, and **T**estable. If a story fails Small, propose how to split it rather than delivering an epic disguised as a story.

## Worked Example

```markdown
## User Story
As a Public Health Nurse in a zone communicable disease unit
I need to be notified when a positive notifiable-disease lab result is received for my zone
so that I can initiate case investigation within required reporting timelines.

## Scenarios
Scenario A — A positive pertussis result arrives from Connect Care; the nurse receives a work-queue notification within 15 minutes.
Scenario B — A result arrives for a disease not notifiable in Alberta; no notification is generated.
Scenario C — A duplicate result for an existing open case arrives; the result attaches to the case instead of creating a new notification.

## Acceptance Criteria

### Minimum (MVP)
1. Given a positive lab result for a disease listed in the Communicable Diseases Regulation, when the result is filed in Connect Care, then a notification appears in the zone work queue within 15 minutes. [Public Health Act — notifiable disease reporting]
2. Given a notification, when the nurse opens it, then patient identifiers display only to users with a need-to-know role. [HIA s. 27 — verify]
3. Given a duplicate result on an open case, when it is processed, then it attaches to the existing case and no new notification is created.

### Desirable
1. Notifications are prioritized by disease urgency category.
2. A daily digest summarizes unactioned notifications older than 24 hours.

## Metadata
- Value Stream: Population and Public Health
- Value Stream Stage: Development
- User Story ID: US-2026-0217
- CSD Workflow Status: Analysis
- IT Build Team(s): Data Integration Team
- Link to System Design Documentation: [Link to Design Doc — TBD]
- Update Comments:
  * 2026-06-10: Initial story creation
- Link to meeting minutes for Design signoff: [Link — TBD]
```

## Output Conventions

- Output a complete markdown document following the worked example's structure.
- Use Canadian English spelling (behaviour, prioritize per CP style is fine, centre, colour).
- Be specific: real role names, real system names (Epic Connect Care, Snowflake, FHIR APIs) — never "user" or "the system".
- When working inside the Obsidian vault, save stories to the relevant Health Shared Services subfolder and WikiLink related notes (e.g., `[[Value Stream Model]]`, solution models in ATLAS). Do not link to notes that don't exist.
- Use placeholder links where actual URLs aren't provided; never fabricate URLs or regulation section numbers.
