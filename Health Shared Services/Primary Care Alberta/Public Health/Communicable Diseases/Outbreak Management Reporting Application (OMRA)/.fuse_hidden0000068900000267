---
type: Architecture Decision Request
title: SBAR - Contact CD Episode Creation and Outbreak-Cluster Association
description: Decision request on whether every identified contact in OMRS should have a Communicable Disease Episode created in Connect Care for rule-out traceability, and how such episodes associate to outbreaks versus clusters.
tags:
  - sbar
  - decision-request
  - omrs
  - contact-tracing
  - erd-design
timestamp: 2026-06-22T00:00:00Z
---

# SBAR: Contact CD Episode Creation and Outbreak / Cluster Association

**Date:** June 22, 2026
**Prepared by:** Enterprise Architecture — Health Shared Services, Community Care Services (Communicable Disease Solution)
**For:** Communicable Disease / OMRS design governance (initial review at the TB Working Group, June 2026)
**Status:** Draft for working-group review
**Related design:** [[OMRS Database ERD]] (v2.4); [[Contact Identification Screen Specifications]]

---

## Recommendation Overview

**Create a Communicable Disease (CD) Episode in Connect Care for every uniquely identified contact, with an episode status that clearly distinguishes a contact investigation / rule-out from a confirmed or probable case.** Keep the OMRS `ContactIdentification` record lightweight and link it to the Connect Care episode (`EpicAbstract`) through `ContactInvestigationLifecycle`. This puts the rule-out evidence — which can only be established by a diagnostic test result or, for vaccine-preventable disease such as measles, documented immunity — in the clinical system of record, while preserving the complete exposure picture epidemiologists need.

A coupled design rule follows from this: a CD Episode associates to **exactly one owning Outbreak node**, and a cluster-designated Outbreak may own episodes directly when an exposure belongs to the cluster but not to a single child site. Cluster reporting sums distinct episodes across the cluster subtree without double-counting.

Key implications: higher Connect Care episode volume (most contacts are negative), so a crisp episode-status taxonomy is essential to keep non-case episodes out of notifiable-case and incidence counts; and Client Registry validation should precede episode creation to avoid duplicate patient records.

---

## Situation

The OMRS [[Contact Identification Screen Specifications|Contact Identification screen]] and the [[OMRS Database ERD]] (now at v2.4) are moving from design to build. The data model must settle where the *outcome* of a contact investigation lives — in particular, how a contact is **ruled out**. A contact cannot be ruled out by assertion; it requires evidence: a diagnostic test result, or documented vaccination / immunity for a vaccine-preventable disease. That evidence is clinical and is held in Connect Care.

The decision being requested is whether each identified contact should have a CD Episode created in Connect Care to carry that traceability — even when the contact will not meet the threshold of a notifiable case — or whether the rule-out should be recorded only on the lightweight OMRS contact record. A related, coupled question is whether a cluster-designated Outbreak may hold episodes directly or only its child outbreaks may. Both need resolution before the contact-promotion and outbreak-lineage portions of the build proceed.

---

## Background

- **Two distinct constructs.** OMRS separates the `ContactIdentification` record (a lightweight, high-volume contact-list entry) from the `EpicAbstract` — the Communicable Disease Episode / Abstract in Connect Care. Connect Care is the **system of record for individual cases**; OMRS owns outbreak coordination, line lists, and contact lists. ([[CLAUDE-OMRS]] data-ownership boundaries.)
- **Rule-out needs clinical evidence.** Definitive rule-out depends on a diagnostic test or documented immunity. Both are clinical artefacts that already live in Connect Care; recording them only in OMRS would duplicate clinical data and weaken traceability.
- **Scale.** TB contact lists routinely run 30–50 per source case and are reached ~80% of the time (see [[TB Contact List - TB Nurse User Story]]). Most contacts test negative, yet still require documented follow-up (window-period re-test, LTBI screening / treatment). STI named-partner handling differs (see [[STI Large Exposure User Story]]).
- **Epidemiology need.** An individual episode may not reach the case threshold, but epidemiologists need to see the whole picture of exposures — tested, negative, positive, immune, and lost-to-follow-up — alongside cases.
- **Model support already in place.** ERD v2.3–v2.4 added `ContactIdentification`, `ContactInvestigationLifecycle` (status transitions, carrying the `EpicAbstract` link on promotion), and `ContactOutbreakLink` (preserving outbreak identifiers across escalation and clustering). `EpicAbstract.outbreakID` is single-valued, and cluster grouping rides on the `Outbreak.clusterOutbreak` self-reference.

---

## Assessment

Three alternatives were considered. Each carries the rule-out outcome differently.

### Alternative 1 — Do Nothing: rule-out recorded only in OMRS

Capture the diagnostic / vaccination rule-out on the `ContactIdentification` record; create no Connect Care episode for non-cases.

- **Pro:** Lowest Connect Care episode volume and the smallest clinical footprint for people who were never cases.
- **Pro:** Simplest, fastest contact workflow — no Create Episode step for the majority of contacts.
- **Pro:** Keeps all contact data in one OMRS place for the investigator.
- **Con:** The rule-out evidence (lab result, immunization record) actually lives in Connect Care, so it would be re-keyed or summarized in OMRS — duplication and weak traceability, the opposite of a single clinical system of record.
- **Con:** Window-period re-testing and LTBI follow-up have no clinical episode to attach to.
- **Con:** Epidemiologists cannot see tested-negative exposures as episodes alongside cases without a separate reporting build.

### Alternative 2 — Episode per contact, status-distinguished (Silver Bullet, Recommended)

Create a CD Episode in Connect Care for every uniquely identified contact. Episode status distinguishes *contact investigation / rule-out* from *confirmed / probable case*. The OMRS contact record stays lightweight and links to the episode via `ContactInvestigationLifecycle` → `EpicAbstract`.

- **Pro:** Full traceability of the rule-out (diagnostic result or documented immunity) in the clinical system of record, with no clinical duplication in OMRS.
- **Pro:** Complete exposure picture for epidemiology — every exposure is an episode, case or not — and native support for follow-up (re-test, LTBI).
- **Pro:** Keeps the OMRS contact record lean ("without loading the contact investigation with more baggage") and gives a clean contact→case conversion path.
- **Con:** Higher episode volume in Connect Care, the bulk of it negative contacts.
- **Con:** Requires a crisp episode-status taxonomy so non-case episodes are never counted as notifiable cases or incidence — a data-integrity dependency.
- **Con:** Identity / duplicate risk for contacts without a PHN; episode creation should be gated on Client Registry validation, and the Create Episode interface load (≈ one per contact) must be sized.

### Alternative 3 — Threshold-based promotion

Promote only contacts meeting a clinical threshold (positive, or requiring management) to a CD Episode; others remain OMRS contact records with the outcome captured there.

- **Pro:** Balances episode volume against traceability; most episodes correspond to real clinical management.
- **Pro:** Lighter Connect Care footprint than Alternative 2.
- **Pro:** Familiar pattern where "episode" implies "case under management."
- **Con:** For negatives, the rule-out evidence stays split between OMRS and Connect Care — the exact traceability gap this decision is trying to close, since only a test or vaccination truly rules a contact out.
- **Con:** Epidemiologists lose visibility of tested-negative exposures unless separately reported.
- **Con:** Promotion thresholds are disease-specific, adding rules and ambiguity about when an episode is created.

---

## Recommendation

Adopt **Alternative 2**: create a CD Episode in Connect Care for every uniquely identified contact, with episode status clearly separating a contact investigation / rule-out from a case, and keep the OMRS `ContactIdentification` record lightweight and linked to the episode through `ContactInvestigationLifecycle`.

This is recommended because the only credible way to rule a contact out is a diagnostic test result or documented immunity, and both already live in Connect Care. Carrying the episode there gives end-to-end traceability of the rule-out without duplicating clinical data into OMRS, and it preserves the full exposure picture epidemiologists need — including episodes that never reach the case threshold. The principal risk, episode-count inflation, is managed by the episode-status taxonomy (investigation / rule-out vs. case) rather than by withholding episodes; this keeps notifiable-case and incidence reporting clean while still recording every exposure.

### Coupled design rule — episode-to-outbreak / cluster association

A CD Episode associates to **exactly one owning Outbreak node** (`EpicAbstract.outbreakID` is single-valued). A **cluster-designated Outbreak may own episodes directly** when an exposure belongs to the cluster but not to a single child site — common in TB community / social-network transmission with no facility. Cluster-level reporting sums **distinct** episodes across the cluster subtree (child outbreaks plus any cluster-direct episodes), never double-counting, and `ContactOutbreakLink` preserves the original outbreak identifiers across escalation and cluster reorganization. The alternative — forcing every case onto a child outbreak — would require inventing artificial "community" child outbreaks and is not recommended.

### Open items to confirm the final recommendation

- **Link to user stories and scenarios.** Confirm against the TB, STI, CDC and SHE contact-investigation stories and scenarios before finalizing — particularly TB LTBI follow-up, measles vaccination-evidence rule-out, and STI named-partner handling, which may warrant per-disease nuance in the promotion and status rules.
- **Episode-status taxonomy.** Agree the investigation / rule-out vs. case status values with the Connect Care PPH build team and Surveillance / Epidemiology so counts stay correct.
- **Identity gating.** Confirm Client Registry validation precedes episode creation to avoid duplicate Connect Care patient records.
- **Privacy.** Confirm the HIA minimal-collection position for creating clinical episodes on contacts who are not cases.

---

## Participants

- **Alec Blair** — Enterprise Architect, Health Shared Services (Community Care Services) — author.
- **To be consulted (Extended Team):** TB Program (Tuberculosis Prevention and Control); STI Centralized Services (STICS); CDC and SHE investigators; Connect Care PPH Build Team; Surveillance / Epidemiology; Privacy (HIA). _[TBD]_
- **Governance:** Communicable Disease / OMRS design governance. _[TBD]_

---

_References: [[OMRS Database ERD]] (v2.4, Sections 11 and 15); [[Contact Identification Screen Specifications]]; [[TB Contact List - TB Nurse User Story]]; [[STI Large Exposure User Story]]; [[Alberta Tuberculosis Policy]]; Public Health Act and Communicable Diseases Regulation; Health Information Act (HIA), RSA 2000, c H-5. SBAR format per [[Architecture Decision Request (aka SBAR)]]._
