---
type: Coherency Report
title: CD Coherency Report — 2026-06-26
description: Overnight coherency analysis of the Communicable Disease deliverables — terminology, field-name, architecture-to-spec, traceability, system-of-record, and cross-reference integrity.
tags:
  - coherency
  - communicable-disease
  - quality-assurance
  - omra
timestamp: 2026-06-27T02:35:46Z
---
# CD Coherency Report — 2026-06-26

> Report-only output of the `cd-coherency-overnight` task. Findings are for [[CLAUDE-Communicable-Diseases|Alec]] to review and act on interactively — nothing in the deliverables, the [[Communicable Disease Open Issues]] register, or the context files was edited.

## Run 1 — 2026-06-27T02:35:46Z (20:35 MDT)

**Sweep:** first full sweep of this state file (was empty/fresh). **Files checked this run:** 34 of 34 deliverables (full sweep completed). **Queue remaining:** 0. Hashes and `last_checked` recorded in `.state/coherency-state.json`.

**Method:** read the four program context files ([[CLAUDE-Communicable-Diseases]], [[CLAUDE-OMRA]], [[CLAUDE-CDC]], [[CLAUDE-CDC-User-Stories]]) and the [[Communicable Disease Open Issues]] register as ground truth, then scanned all 34 deliverables for the six coherency dimensions (terminology drift, field-name misalignment, architecture-to-spec gaps, traceability gaps, system-of-record contradictions, cross-reference integrity).

**Overall:** the corpus is in good shape. System-of-record assertions are uniform, WikiLinks resolve, and the retired `parentOutbreak` term has been cleanly replaced by `clusterOutbreak` everywhere. Findings below are mostly questions and one genuine new enumeration gap; the larger structural items are already captured in the Open Issues register and are only cross-referenced here, not re-raised.

---

### 1. Terminology drift

**Finding 1.1 — `OMRA` vs `OMRS` naming, and a self-referential garble in the naming notes (QUESTION — for Alec to settle).**
This run's task specification asserts that new content should read **`OMRS`** and refers to a `CLAUDE-OMRS.md`. Neither exists in the vault: the settled program name is **OMRA** (Outbreak Management Reporting Application), used 450 times across the deliverables with **zero** uses of `OMRS`, and the governing context file is [[CLAUDE-OMRA]]. Per the task's own instruction to treat the program context as ground truth, **OMRA is treated as correct** and the 450 usages are *not* flagged. Flagging the discrepancy in the task spec for reconciliation.

Separately, the naming notes themselves contain a self-referential garble that should be cleaned up:
- [[CLAUDE-OMRA]] (line 21): *"Treat AOMS, OMRA and OMRA as the same system"* — lists OMRA twice as if it were its own legacy alias.
- [[Interface Specification - Create CD Episode and Draft Contact Abstract (OMRA to Connect Care)]] (line 23): *"OMRA / AOMS / OMRA are the same system"* — same doubling.
- [[Interface Specification - Open Contact Identification from CD Abstract (Connect Care to OMRA)]] (line 22): *"the earlier names OMRA and AOMS refer to the same system"*.

*Suggested resolution:* decide the canonical name once (the evidence says **OMRA**), correct the task spec's `OMRS`/`CLAUDE-OMRS.md` reference, and fix the doubled acronym in the three naming notes so the legacy-alias list reads cleanly (e.g. "AOMS and OMRA are earlier names for OMRA"). If `OMRS` was ever an intended rename, that is a program decision that needs to be recorded in [[CLAUDE-OMRA]] before any content changes.

**Legacy terms checked and found legitimate:** `CDOM` / `CD/OM` (83 uses) and `AOMS` (6 uses) all appear in correct historical context — describing the legacy Visual Basic application being retired, or in explicit naming notes — not as drift. No action.

### 2. Field-name misalignment

**Finding 2.1 — `ActivityType` enumeration is inconsistent across the two activity stories, and the register entry is now too narrow (NEW — genuine gap).**
The same `ActivityType` reference list is described with different values and labels in two stories:
- [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]] (O-M-6, AC7): *"an `ActivityType` of **Phone Call, Email, Letter, or Other**"*.
- [[Track Outbreak Activities and Tasks - CDC Investigator User Story]] (O-M-8, AC2): *"set the interaction type to **Phone, Email, Verbal, or Fax**"*.

Two mismatches: (a) **"Phone Call"** (O-M-6) vs **"Phone"** (O-M-8) for the same enum value; and (b) O-M-8 introduces **Verbal** and **Fax**, which the register's reference-data issue **CD-OI-16 does not cover** — that issue only tracks **Letter** and **Other**. The union of required values (Phone Call/Phone, Email, Letter, Other, Verbal, Fax, plus the existing Report Review) is not reconciled in any one place.

*Suggested resolution:* reconcile the `ActivityType` seed list once against [[OMRA Database ERD]] Section 3 with a single canonical label per value (settle "Phone Call" vs "Phone"), and broaden **CD-OI-16** in [[Communicable Disease Open Issues]] to include **Verbal** and **Fax** (currently only Letter/Other). O-M-8 already notes the Verbal/Fax dependency in its own Dependencies section, so the gap is the register lagging the story, not the story.

**Finding 2.2 — Abstract/Episode identifier naming proliferation (QUESTION — likely intentional, low priority).**
Across the two interface specs and [[Update CD Episode Outbreak ID - CDC Investigator User Story]], the abstract identifier appears as prose "Abstract ID" (26x), `AbstractID` (4x), and `promotedAbstractID` (3x); the episode identifier as "Episode ID" (8x) and `epicEpisodeID` (3x), with the entity `EpicAbstract` (6x). The prose-vs-DB-field split is normal, and `promotedAbstractID` vs the source `AbstractID` appears to be a deliberate source-vs-promoted distinction. *No defect asserted* — flagging only so a future ERD/glossary pass can confirm the source abstract, the contact's draft abstract, and the promoted abstract are each named unambiguously.

### 3. Architecture-to-spec gaps

No new findings beyond what the register already carries. The substantive `Outbreak` ERD gaps (no direct `infectiousDiseaseID` / `outbreakSettingID` / `zoneID` / department linkage) and the missing `TaskTemplate` / `TaskList` / `Task` model are already tracked as **CD-OI-1** and **CD-OI-15** and are correctly flagged inline in the specs that depend on them ([[Create Outbreak Investigation Screen Specifications]], [[Maintain Outbreak Task Lists - Team Lead Department Manager User Story]]). No contradiction between the specs and the ERD was found — the gaps are acknowledged, not silently worked around.

### 4. Traceability gaps

**Finding 4.1 — Regulatory anchors missing where peers carry them (QUESTION).**
The User Stories and OMRA screen specs uniformly carry HIA / *Public Health Act* / *Communicable Diseases Regulation* anchors (good). Five deliverables carry none, while their peers in the same category do:
- Architecture Models: [[Communicable Disease Solution Concept Model]] and [[Lambda Architecture - Real-Time Lab Surveillance]] — peers [[Communicable Disease Conceptual Data Model]] and [[Communicable Disease Solution Architecture]] both cite the *Public Health Act*.
- Connect Care STI build analysis: [[Sexual Contacts Flowsheet]], [[STI Encounter Value Stream]], and [[Epic Family Planning Registry Data]] — peer [[STI Flowsheet Logical Data Model]] cites both the *Public Health Act* and the *Communicable Diseases Regulation*.

*Suggested resolution:* this may be acceptable — concept models and low-level Epic build-analysis artifacts can legitimately defer regulatory traceability to the design specs and stories they support. Confirm whether a one-line "Regulatory context" anchor is expected on these five, or whether they are intentionally exempt. ([[Set Outbreak Status (Deprecated) - CDC Investigator User Story]] also has none, which is fine — it is deprecated.)

### 5. System-of-record contradictions

**None.** Every deliverable that asserts ownership states the same boundary consistently: **Connect Care (Epic) is the system of record for individual cases / CD episodes; OMRA owns outbreak coordination, line lists, contact identification, and reporting.** This matches the settled facts in [[CLAUDE-Communicable-Diseases]] and [[CLAUDE-OMRA]]. The PPHST phone-encounter story correctly scopes Genesys / Epic Cheers as the *call-capture* system of record for the encounter (not the case), consistent with the open referral-boundary question CD-OI-14. Clean dimension.

### 6. Cross-reference integrity

**None.** All `[[WikiLinks]]` in the 34 deliverables resolve to existing vault notes or attachments. The one apparent hit — `[[hlth-phdmg-tuberculosis-2022-11.pdf]]` in [[TB Contact List - TB Nurse User Story]] — is a **false positive**: the file exists in `Disease Guildelines/`, and the scanner only tripped on the escaped pipe (`\|`) used correctly to embed the link inside a Markdown table cell. No dangling links.

---

### Carryover for next run

Open findings carried forward in `open_findings_carryover` (state file): **1.1** (OMRA/OMRS naming + garble), **2.1** (ActivityType enum + CD-OI-16 scope), **4.1** (regulatory anchors on five artifacts). These are questions/suggestions for Alec; they are not auto-applied. Structural items remain owned by the [[Communicable Disease Open Issues]] register (CD-OI-1, CD-OI-4, CD-OI-15, CD-OI-16, CD-OI-18) and are not duplicated here.

---

## Run 2 — 2026-06-27T05:32:24Z (23:32 MDT)

**Sweep:** incremental (a full sweep already completed earlier tonight at 02:35:46Z, < 7 days old, so this run checks only changed files). **Files checked this run:** 0. **Queue remaining:** 0.

**No new findings.** All 34 deliverables were re-hashed and every hash matches the value recorded in the last full sweep — no deliverable has been edited, added, or removed since Run 1. The deferred queue was empty and no incremental re-sweep was due. Nothing to re-evaluate.

The three open questions from Run 1 remain carried forward unchanged in `open_findings_carryover`: **1.1** (OMRA/OMRS naming + the doubled-acronym garble in the three naming notes), **2.1** (`ActivityType` enum drift + CD-OI-16 scope), and **4.1** (regulatory anchors on five concept/build-analysis artifacts). These are still awaiting Alec's interactive decision; the overnight task does not auto-apply them. Structural items remain owned by the [[Communicable Disease Open Issues]] register.

---

_Run log:_ 2026-06-27T02:35:46Z — full sweep, 34/34 checked, 0 remaining → `Coherency Reports/2026-06-26 CD Coherency Report.md`
_Run log:_ 2026-06-27T05:32:24Z — incremental, 0/34 changed, 0 remaining, no new findings → `Coherency Reports/2026-06-26 CD Coherency Report.md`
