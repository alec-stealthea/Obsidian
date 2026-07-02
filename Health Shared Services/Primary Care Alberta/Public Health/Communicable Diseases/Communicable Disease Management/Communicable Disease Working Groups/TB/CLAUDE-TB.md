---
tags:
  - claude-context
type: Context File
title: CLAUDE-TB
scope: Health Shared Services/Primary Care Alberta/Public Health/Communicable Diseases/Communicable Disease Management/Communicable Disease Working Groups/TB
parent: "[[CLAUDE-Communicable-Diseases]]"
last-updated: 2026-07-02
timestamp: 2026-07-02T00:00:00Z
---
# CLAUDE-TB.md — Tuberculosis (TB) Working Group Context

> **Purpose**: Context for the TB (Tuberculosis) working-group subfolder under the Communicable Disease Solution. Unlike the cross-disease CDC working group, TB is a disease-specific working group focused on the digital redesign of the TB contact investigation and episode management pathway within the CDS program. Program-wide CD facts live in the parent [[CLAUDE-Communicable-Diseases]]; only TB-specific context is captured here.

---

## Scope

Governs `Communicable Disease Working Groups/TB/`, including `TB User Stories/` and `Meeting Minutes/`. Sits below [[CLAUDE-Communicable-Diseases]] in the context chain. TB requirements feed the shared [[Contact Identification Screen Specifications|Contact Identification Screen]] in OMRA and the Connect Care TB CD Episode build — design specs live in the OMRA and Connect Care Build Specifications folders and are governed by [[CLAUDE-OMRA]].

## Key TB-Specific Facts

- **TB contact investigation is source-case driven.** When an active TB case is confirmed, the TB Nurse works outward from that source case to identify all exposed contacts — household, social, workplace, congregate settings, air travel. TB contact lists routinely run **30–50 contacts**, with that range holding roughly **80% of the time** (see [[TB Contact List - TB Nurse User Story]]).
- **TB value stream.** TB stories sit on the **TB Communicable Disease Episode** value stream. Story IDs follow `TB-[Stage]-[seq]` — e.g., `TB-I-1` is the first story at the **Investigate (I)** stage.
- **Build team.** TB stories are built by the **Connect Care PPH Build Team** (for TB CD Episode / Compass Rose) and the **Outbreak Application Team** (for OMRA contact-list functionality).
- **Key timing standards.** Per PHAC TB Standards (Chapter 11): contact list complete within 3–5 days of infectious TB episode creation; high-priority contact clinical assessment within 7 days; contact list closed 30 days after creation. Alberta Connect Care access makes the 48-hour PHAC notification window effectively immediate.
- **LTBI follow-up.** Most TB contacts test negative but require documented follow-up (window-period re-test, LTBI screening/treatment). The episode-per-contact design (see [[SBAR - Contact CD Episode Creation and Outbreak-Cluster Association]]) puts this clinical evidence in Connect Care as the system of record.
- **Compass Rose (TB CD Episode build).** The Compass Rose build is scoped to changes directly caused by the TB flow sheet redesign only; continuous improvement items are valid but out of scope for the current build. Key confirmed build items (June 12, 2026 meeting): new service types (TB screening, immigration, urgent, emergent, semi-urgent, enhanced LTBI), two new cascade-of-care targets (offered LTBI treatment, patient accepts LTBI treatment; due date 60 days from episode enrollment), and checklist tasks attached to the new screening service type.

## Folder Contents

```
TB/
├── CLAUDE-TB.md                          ← this file
├── Chapter 11 of the Canadian Tuberculosis Standards — TB contact investigation and outbreak management.md
│                                          ← PHAC/CTS reference clipping; key source for contact investigation standards
├── Recommendations for tuberculosis infection screening among returned travellers.md
│                                          ← CATMAT May 2026 guidance; travel-TB screening recommendations
├── Meeting Minutes/
│   └── June 12, 2026 - TB CDS Bi-weekly Working Group Meeting.md
│       ← Compass Rose scope, service types, cascade of care targets, registered case number question
└── TB User Stories/
    └── TB Contact List - TB Nurse User Story.md  ← Story TB-I-1; TB Nurse source-case contact list
```

## Key Reference Material

- [[Chapter 11 of the Canadian Tuberculosis Standards Tuberculosis contact investigation and outbreak management|PHAC TB Contact Investigation and Outbreak Management Standards (Chapter 11)]] — the authoritative source for contact-investigation timing, prioritisation, and outbreak definitions. Referenced in the TB Contact List user story acceptance criteria.
- [[Recommendations for tuberculosis infection screening among returned travellers]] — CATMAT May 2026 guidance on post-travel TB screening for Canadian-born and non-Canadian-born travellers.

## Authored Work

- [[TB Contact List - TB Nurse User Story]] (TB-I-1) — TB Nurse capability to capture the exposed contacts for an active TB source case; four scenarios: source-case list, minor/guardian, air-travel exposure, large congregate-setting. Feeds the shared [[Contact Identification Screen Specifications|Contact Identification Screen]].

## Working Conventions

- TB clinical data and named-contact data are sensitive — handle with care; PHN/Platinum demographics in scope under the Health Information Act (HIA) and Public Health Act.
- Story format follows the HSS two-tier Given/When/Then standard; see [[TB Contact List - TB Nurse User Story]] as the TB pattern story.
- Disease-specific facts (timing, clinical thresholds) should cite Chapter 11 of the Canadian Tuberculosis Standards or the Alberta Tuberculosis Policy as the authoritative source.
- Do not capture open design items here — use the [[Communicable Disease Open Issues]] register.

---

_Last Updated_: 2026-07-02
_Version_: 1.0 (initial context file — TB working group folder now contains user stories, PHAC clippings, and meeting minutes)
