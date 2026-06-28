---
type: Value Stream
title: "Pronghorn Ingestion Plan — Outbreak Management Application"
description: "Pronghorn decomposes unstructured input into a hierarchy of Epics → Features → User Stories → Acceptance Criteria and links every requirement to reusable organisational Standards held in a Global S..."
timestamp: 2026-06-26T19:19:06Z
tags:
  - claude-context
scope: Health Shared Services/Technology and Innovation
parent: "[[CLAUDE-Technology-and-Innovation]]"
last-updated: 2026-06-18
---
# Pronghorn Ingestion Plan — Outbreak Management Application

> **Purpose**: A worked mapping of the existing Outbreak Management Application artifacts — design, governance, user stories and value streams — onto the [[Pronghorn AI Assisted Development|Pronghorn]] Design → Build → Ship framework, so the HSS team can evaluate Pronghorn as the requirements-to-code pipeline for this build. This is an experimental-capability assessment: Pronghorn is in Government of Alberta Alpha and should be treated as a tool to pilot, not a production commitment.

---

## How the pieces line up

Pronghorn decomposes unstructured input into a hierarchy of **Epics → Features → User Stories → Acceptance Criteria** and links every requirement to reusable organisational **Standards** held in a Global Standards Library, so that compliance and traceability propagate automatically. It surfaces four working modes — Design Mode (visual specification on a React Flow canvas), Audit Mode (multi-agent cross-comparison between datasets), Build Mode (autonomous code generation), and Present Mode (generated project artifacts).

The Outbreak Management artifacts already in the vault map cleanly onto that structure. The four source categories Alec named each feed a different part of the Pronghorn pipeline:

| Source category   | Vault artifacts                                                                                                                                                                                       | Pronghorn destination                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Design**        | [[Communicable Disease Solution Architecture]], [[Communicable Disease Solution Concept Model]], [[Communicable Disease Conceptual Data Model]], [[Alberta Outbreak Management System Design]] (deck) | Design Mode canvas (Architect, DBA, API, UX agents); seeds the technical-specification and cloud-architecture specification agents |
| **Governance**    | [[Public Health Act RSA 2000 Chapter P-37]], [[NDR Manual Edition 9]], [[Communicable Diseases Reportable Reference List]], [[Risk Assessment Matrix for MOH Pre-Approval]]                           | Global Standards Library — reusable standards linked to every requirement for HIA / Public Health Act traceability                 |
| **User stories**  | An initial value-stream-mapped story build (partial) plus [[User Maintenance Screen Specifications]]; [[User Story Generator]] used to fill gaps                                                                                                             | Imported as-is into the Epics → Features → Stories → AC tree; Audit Mode then finds coverage + traceability gaps                                            |
| **Value streams** | Outbreak, CD Episode and Treatment value streams defined in the [[Communicable Disease Solution Concept Model]]                                                                                       | Epic-level scaffolding — each value-stream stage becomes a Feature grouping                                                        |

The remainder of this note works each category through in detail and then gives a step-by-step ingestion sequence.

---

## 1. Value streams → Epics (start here)

Pronghorn builds top-down, so the value streams are the right entry point: they give the Epic-level skeleton before any story is written. The [[Communicable Disease Solution Concept Model]] already defines a **Value Stream Network** with three streams, and the Outbreak Management Application owns the first one end-to-end:

- **Outbreak Value Stream** — *Exposure Trace → Confirm → Open → Manage → Close*
- **Communicable Disease Episode Value Stream** — *Confirm → Investigate → Intervene → Close*
- **Communicable Disease Treatment Value Stream** — *Register → Assess → Plan → Treat → Follow-up*

For the Outbreak application, create one **Epic per value-stream stage** of the Outbreak stream. Each stage already has documented swim-lane activities and actors in the Solution Concept Model, which become the Features beneath the Epic:

| Epic (Outbreak stage) | Candidate Features (from documented activities) | Primary actors |
|---|---|---|
| **Confirm** | Search active/inactive outbreaks, assess notifiable, create outbreak + EI#, initial AORF notification, key-contact + MOH notification | Investigator, Regulatory, PPHST, Facility Operator |
| **Open** | Update status to Active, link existing CD Episodes, assign initial resources, receive updated AORF | Investigator, EHS/CDC Manager, MOH |
| **Exposure Trace** | Create/update line list, match to ULI, facility vs non-facility line list, aggregate facility stats, questionnaire upload | Investigator, Facility Operator, Epidemiologist, Albertan |
| **Manage** | Outbreak management tasks, daily situation reports, assign/manage resources, sign orders | Investigator, Manager, MOH |
| **Close** | Document closure communications, complete outbreak summary report, receive final AORF | Investigator, Ministry, EHS/CDC Manager, MOH |

Because the CD Episode value stream is delivered in the Connect Care (Epic) build rather than the custom Outbreak application, its stages should be loaded as a **separate Pronghorn project** (or held as out-of-scope context) to keep the Audit-mode comparisons clean. The interfaces between the two — the three Connect Care interfaces and the three Outbreak Application interfaces in the [[Communicable Disease Solution Architecture]] — become an integration Feature set linking the two projects.

---

## 2. User stories → the requirements tree

The working assumption now is that an **initial user-story build already exists and is mapped to the value-stream stages** — Pronghorn is not decomposing from scratch. The job is to import that build intact and let the platform expose where it is incomplete. Two rules make that work.

**Import the existing tree as-is, with auto-decomposition off.** Load the stories through the structured / hierarchical import path so Pronghorn adopts your Epic → Feature → Story parentage rather than re-deriving its own. Because the stories already carry HSS two-tier acceptance criteria and backlog metadata, map them through a small field crosswalk so nothing is dropped on import:

| HSS story field | Pronghorn field |
|---|---|
| Story statement (As a… I want… so that…) | User Story |
| Tier-1 acceptance criteria (business) | Acceptance Criteria |
| Tier-2 acceptance criteria (technical / build) | Acceptance Criteria (technical) / spec notes |
| Regulatory traceability (HIA, Public Health Act §) | Standard link (Section 4) |
| Value-stream stage | Epic / Feature parent |
| Jira / backlog ID, status | External reference metadata |

**Expect the build to be partial, and treat that as the point.** A complete, fully-traced backlog would make Pronghorn largely redundant for this build; an *incomplete* one is exactly what its Audit and generative gap-fill are for. The two kinds of gap Alec anticipates — stories that aren't finished, and stories that aren't yet mapped to the reference documents — surface through two different audits, covered in the next section.

The **[[User Maintenance Screen Specifications]]** document is a useful test case for the partial-import path. It is a half-finished story already — its structure (role-based access questions, an Acceptance Criteria Specifications block, and Technical Implementation Notes for Access / Security / Performance) maps almost one-to-one onto Pronghorn's User Story + Acceptance Criteria fields — but it carries unresolved working-group questions (Jessica Nooy, Carolyn Hayes, Marilyn Massey). Import it with those questions tagged as open issues; the Audit will otherwise flag the role-model ambiguity (one-role-per-user vs. Connect Care's multi-role reality) as a contradiction rather than a known to-do.

---

## 3. Handling the gaps — coverage and traceability

Pronghorn exposes incompleteness through **Audit Mode**, which runs multi-agent cross-comparison between two datasets at a time. The two gap types Alec expects map onto two different audits.

**Coverage gaps — incomplete user stories.** Run the *Requirements ↔ Canvas* audit (the story tree against the value-stream / design canvas). It flags value-stream stages and design activities with no story beneath them, and stories missing acceptance criteria. This is concrete for the Outbreak stream because every documented swim-lane activity in the [[Communicable Disease Solution Concept Model]] — "Create Daily Sit Reports", "Match Line List to ULI", "Sign Orders" — is a canvas node, so any stage activity without a corresponding story shows up as an orphaned node. Remediation: have Pronghorn generate candidate stories *only for the empty nodes*, then accept, edit, or reject each — you fill holes without disturbing the stories already written. Where house style and regulatory citations matter, run the [[User Story Generator]] against the gap list instead of accepting Pronghorn's raw draft.

**Traceability gaps — incomplete mapping to the reference documents.** Run the *Standards ↔ Requirements* audit (the story tree against the Global Standards Library built in Section 4). It flags stories that touch a governed behaviour but carry no link to the relevant reference document: an NDR-reporting story not linked to the [[NDR Manual Edition 9]], a Section 29 isolation story not linked to the [[Public Health Act RSA 2000 Chapter P-37]], a notifiable-assessment story not linked to the [[Communicable Diseases Reportable Reference List]]. Pronghorn proposes the missing requirement-to-standard links from semantic match; you confirm or reject each. This is where partial mapping pays back later — once a story is linked to a reference document as a Standard, future edits to that reference propagate to every linked story automatically, so a gap closed once stays closed.

The loop that ties them together: **import → audit → review the gap report → fill coverage gaps (generate-for-empty-nodes) and traceability gaps (confirm-proposed-links) → re-audit** until the report is empty or every remaining item is a deliberate open issue (the unconfirmed Public Health Act section, the single-role vs. multi-role question, the STI/TB abstract reporting variations). The exit state is a backlog in which every story has both a value-stream parent and at least one governing standard, with exceptions logged explicitly rather than silently missing. That exit state — not generated code — is the recommended success measure for the pilot.

---

## 4. Governance → the Global Standards Library

This is where Pronghorn's standards-first model earns its place, and where the traceability gaps get closed. Rather than embedding compliance text inside individual stories, load the governance documents once as **reusable Standards**, then link them to the Epics and stories they constrain. Because the initial story build already carries some HIA / Public Health Act citations, those become seed links on import; the Standards ↔ Requirements audit in Section 3 finds the stories that still lack them. An update to a standard then propagates to every linked requirement automatically — directly useful given how often reportable-disease scope and surge responsibilities shift.

| Governance source | Standard it becomes | Requirements it links to |
|---|---|---|
| [[Public Health Act RSA 2000 Chapter P-37]] | Statutory authority for isolation/closure | Section 29 order Features (Manage, Intervene); Facility Isolation Orders — *the open question "confirm Public Health Act Section" in the design becomes a standard-level to-do* |
| [[NDR Manual Edition 9]] | Notifiable Disease Reporting data standard | NDR report generation; abstract-to-report mapping |
| [[Communicable Diseases Reportable Reference List]] | Reportable / notifiable scope + classification (e.g. "Fastest Means Possible") | Disease and Disease-Classification access-control attributes in [[User Maintenance Screen Specifications]]; Confirm-stage "assess notifiable" |
| [[Risk Assessment Matrix for MOH Pre-Approval]] | MOH pre-approval gate | Outbreak open/close decision Features; MOH actor activities |
| EMPI / Patient Registry "Platinum" field definition (in [[Communicable Disease Solution Architecture]]) | Patient identification data standard | Line List, ULI API, privacy-risk acceptance criteria |

Loading these as standards also means Pronghorn's WCAG accessibility and security-analysis specification agents have an explicit compliance surface to audit against, which matters for a public-facing facility-reporting component.

---

## 5. Design → the Design Mode canvas and spec agents

The design documents are the richest input and feed two Pronghorn mechanisms at once.

On the **Design Mode canvas**, the [[Communicable Disease Solution Architecture]] gives the application-portfolio shape — the three replacement applications (custom Outbreak Application, Epic CD Episode/Abstract, CD Data Lake House), the trusted-application / authoritative-dimension pattern, and the enabling dimensions (Organism, Location, Vaccine, Diagnostic Test). These become canvas nodes the Architect, DBA and API agents reason over. The [[Communicable Disease Conceptual Data Model]] and the Outbreak Application ERD seed the DBA agent and the PostgreSQL/Supabase schema work that Pronghorn does natively. The [[Alberta Outbreak Management System Design]] deck supplies wireframe and screen intent for the UX agent.

For the **specification agents**, the design content is what Pronghorn turns into technical specifications, cloud-architecture, API specifications and security analysis. One caution worth encoding up front: the Solution Architecture is explicit that several entities are *trusted* rather than *authoritative* (the Outbreak app validates against an authoritative dimension before adding a location), and that the Data Lake House — not the Outbreak app — is the system of record for dimensions. That data-ownership boundary should be stated as a standard so the generated API and schema don't accidentally make the Outbreak application authoritative.

---

## Recommended ingestion sequence

1. **Create the project and load governance first.** Build the Global Standards Library from the five governance sources above before importing any requirement, so links resolve as the stories arrive.
2. **Import the value-stream skeleton.** Create one Epic per Outbreak value-stream stage; add the documented activities as Features. Stand up the CD Episode stream as a separate project for interface context.
3. **Import the existing story build as-is.** Load the value-stream-mapped stories through the structured import path with auto-decomposition off, applying the field crosswalk. Bring in [[User Maintenance Screen Specifications]] with its working-group questions tagged as open issues. Do not regenerate — the point is to preserve what's already written.
4. **Lay in the design on the canvas.** Add the Solution Architecture, Conceptual Data Model / ERD and design deck as canvas nodes; let the Architect/DBA/API/UX agents populate technical and cloud-architecture specs.
5. **Run Audit Mode twice.** Requirements ↔ Canvas to find coverage gaps (stages/activities with no story, stories with no acceptance criteria); Standards ↔ Requirements to find traceability gaps (stories with no link to a reference document). Both runs also surface the known tensions: single-role vs. multi-role, trusted vs. authoritative dimensions, the unconfirmed Public Health Act section, the STI/TB abstract reporting variations.
6. **Close the gap loop.** Generate candidate stories for empty canvas nodes (or run the [[User Story Generator]] against the gap list); confirm or reject Pronghorn's proposed requirement-to-standard links. Re-audit until the gap report is empty or every remaining item is a logged open issue.
7. **Only then consider Build Mode.** Given Alpha status and the "as is" liability waiver, treat any generated code as a throwaway spike to test fidelity of the requirements thread, not as a delivery path. Use Present Mode output (project charter, specs) as the more immediately useful product for stakeholders.

---

## Caveats for this pilot

Pronghorn is Government of Alberta **Alpha** under an MIT licence, self-hostable on PostgreSQL/Supabase — which is what makes an Alberta data-residency evaluation conceivable — but it is not production-ready and ships with an "as is" liability waiver (see [[Pronghorn AI Assisted Development]]). Any real Outbreak data, EMPI/Platinum fields included, must stay out of a hosted Alpha instance; use synthetic test data for the pilot. The genuine near-term value is the **traceability thread** — proving that a governance standard links cleanly through Epic → Feature → Story → Acceptance Criteria — rather than the generated code. That single demonstration is the recommended success criterion for the pilot.

---

_Sources (vault):_
- [[Communicable Disease Solution Architecture]] — proposed CD solution design, Outbreak Management application scope and interfaces
- [[Communicable Disease Solution Concept Model]] — value stream network and per-stage swim-lane activities
- [[User Maintenance Screen Specifications]] — role-based access and acceptance-criteria specification template
- [[Public Health Act RSA 2000 Chapter P-37]], [[NDR Manual Edition 9]], [[Communicable Diseases Reportable Reference List]], [[Risk Assessment Matrix for MOH Pre-Approval]] — governance
- [[Pronghorn AI Assisted Development]] — platform capability summary and sources

_Compiled: 2026-06-15_
