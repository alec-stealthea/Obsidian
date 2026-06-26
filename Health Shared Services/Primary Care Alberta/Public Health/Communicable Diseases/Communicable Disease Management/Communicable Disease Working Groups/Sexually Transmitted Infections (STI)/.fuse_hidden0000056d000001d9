---
type: Design Specification
title: STI Intake Form Design Specification
description: Redesign of the paper Notification of STI form (AH0332) into a native Epic (Connect Care) digital intake workflow across all notifiable STIs under the Alberta Public Health Act and Communicable Diseases Regulation.
tags:
  - design-specification
  - sti
  - communicable-disease
  - connect-care
  - intake
timestamp: 2026-06-22T00:00:00Z
---

# STI Intake Form — Design Specification

**Document Status:** Draft  
**Version:** 0.1  
**Date:** 2026-05-11  
**Author:** Alec Blair, Enterprise Architecture  
**Program:** Communicable Disease Solution (CDS), Primary Care Alberta — Public Health

---

## 1. Purpose and Scope

This design specification defines the restructured Sexually Transmitted Infection (STI) Intake Form for implementation within Epic (Connect Care). The current "Notification of STI" form is a paper-based artifact submitted by fax or email to STICS (Sexually Transmitted Infection Centralized Services). This redesign re-imagines the intake as a native digital workflow within Epic, supporting three distinct user scenarios while preserving all mandatory data elements required under the Alberta *Public Health Act* and *Communicable Disease Regulation*.

### 1.1 In-Scope STI Diagnoses

All notifiable STIs under the Alberta Communicable Diseases Reportable Reference List:

| STI Diagnosis | ICD-10-CA Range | Notes |
|---|---|---|
| Syphilis (all stages, incl. Congenital) | A50.x – A53.x | Staging required (Primary, Secondary, Early/Late Latent, Neuro, Tertiary, Congenital) |
| Gonorrhea (incl. perinatally acquired) | A54.x | Multiple site-of-infection classification |
| Chlamydia (incl. perinatally acquired) | A55, A56.x | Multiple site-of-infection classification |
| Non-Gonococcal Urethritis (NGU) | N34.1 | Often co-reported with Chlamydia |
| Lymphogranuloma Venereum (LGV) | A55 | Chlamydia trachomatis serovars L1–L3 |
| Chancroid | A57 | Rare in Alberta |
| Muco-Purulent Cervicitis | N72 | Often associated with CT/GC |
| Hepatitis B, Acute | B16.x | When sexually transmitted |
| Hepatitis C, Acute | B17.1 | When sexually transmitted |
| HIV | B20 – B24, Z21 | When reported through STI pathway |

> **Design Note:** The diagnosis value set should be built as an extensible grouper in Epic (EDG master file) so additional STI diagnoses can be added without structural changes.

### 1.2 Out of Scope

- Treatment ordering and medication management (handled by existing Connect Care order sets and the Alberta STI Treatment Guidelines)
- Laboratory result integration (handled by existing ProvLab → Connect Care interfaces)
- NDR (Notifiable Disease Report) submission to CMOH (separate downstream workflow)
- Partner notification nurse (PNN) investigation workflow (downstream of intake)
- Section 29 Public Health Act orders

---

## 2. User Scenarios

The intake form serves three distinct user populations with different Epic access models. The form design must accommodate the constraints of each platform while collecting a consistent minimum data set.

### 2.1 Scenario 1 — Epic Hyperdrive Prescribers (Emergency Department)

**Platform:** Epic Hyperdrive (full client)  
**Typical Users:** ED physicians, ED nurse practitioners, urgent care providers  
**Access Level:** Full Epic functionality — SmartForms, flowsheets, order entry, InBasket, chart review

**Workflow Context:**
- Patient presents to ED with symptoms or positive screening result
- Provider documents encounter using standard ED workflow
- STI intake is completed as part of the encounter documentation
- Provider needs efficient, minimal-click data capture embedded in the existing ED workflow

**Epic Build Approach:**
- **SmartForm** embedded within the ED Navigator or launched from a BestPractice Advisory (BPA)
- SmartForm pre-populates Patient Demographics and Provider Details from the encounter context (ADT data, logged-in user)
- Diagnosis section leverages the Epic **Problem List** and **Encounter Diagnosis** (EDG master file) with auto-suggest from the STI diagnosis grouper
- Symptoms captured via SmartData Elements (SDEs) with pick-list values mapped to SNOMED CT
- Exposure contacts entered via a linked **Flowsheet** (separate from the primary SmartForm — see Section 5)
- On completion, the SmartForm fires an InBasket message to the STICS pool

**Key Differentiators for This Scenario:**
- Auto-population of demographics and provider fields reduces data entry
- Full access to patient chart for medication history, lab results, prior STI episodes
- Can attach SmartForm to the encounter note
- Can place orders (lab, medication) directly from the same workflow

### 2.2 Scenario 2 — EpicCare Link Prescribers (Primary Care)

**Platform:** EpicCare Link (web-based provider portal)  
**Typical Users:** Community family physicians, walk-in clinic providers, sexual health clinic providers  
**Access Level:** Limited — can view patient chart, submit referrals, complete portal-enabled SmartForms; cannot place orders directly, limited flowsheet interaction

**Workflow Context:**
- Community provider diagnoses or suspects STI in their clinic
- Provider logs into EpicCare Link to submit the STI notification
- May not have full patient chart context (patient may not be registered in Connect Care)
- Current paper process: provider completes "Notification of STI" form and faxes to STICS

**Epic Build Approach:**
- **EpicCare Link SmartForm** (portal-optimized) accessible from the EpicCare Link referral or "Submit Form" workflow
- Patient Demographics: manual entry or search-and-select from the MPI (Master Patient Index) if patient exists
- Provider Details: pre-populated from EpicCare Link login credentials and provider record (SER master file)
- Diagnosis: drop-down selection from the STI diagnosis grouper (not free-text diagnosis search — portal limitation)
- Symptoms: simplified checkbox list (subset of the full SNOMED-mapped SDE list)
- Exposure contacts: **repeating section** within the SmartForm (since full flowsheet interaction is limited in EpicCare Link)
- Submission triggers a referral order to the STICS work queue

**Key Differentiators for This Scenario:**
- Cannot assume patient is already in the encounter context — may need to create a "stub" patient record or search MPI
- Limited to portal-compatible form elements (no complex flowsheet embedding)
- Provider may need to manually enter demographics that would auto-populate in Hyperdrive
- Referral-based submission model rather than encounter-based

### 2.3 Scenario 3 — Ministry / Out-of-Province Referrers

**Platform:** Either EpicCare Link or Hyperdrive (varies by arrangement)  
**Typical Users:** Out-of-province/country MOH designates, federal public health (FNIHB), interprovincial STICS equivalents  
**Access Level:** Variable — may have limited EpicCare Link access or full Hyperdrive depending on inter-jurisdictional agreements

**Workflow Context:**
- A case or contact is identified in another jurisdiction with an Alberta connection (Alberta resident exposed out-of-province, or out-of-province contact of an Alberta case)
- Ministry user submits referral information to Alberta STICS for follow-up
- Data available may be incomplete (no Alberta PHN, limited demographics)

**Epic Build Approach:**
- Same SmartForm as Scenario 2 (EpicCare Link version) with **conditional sections** that appear when "Out-of-Province/Country Referral" is selected as the referral source
- Additional fields exposed: originating province/territory or country, originating jurisdiction case ID, originating jurisdiction contact information, out-of-province health care number
- Patient demographics may be partial — form allows submission with minimum required fields (name, DOB, and at least one locating identifier)
- Provider details section relabeled as "Referring Jurisdiction Contact"

> **⚠ Open Design Decision:** Whether the Ministry scenario should be a variant of the same form or a completely separate form needs further stakeholder discussion. The current recommendation is a shared form with conditional sections to reduce build and maintenance overhead. This should be validated with STICS operations and the inter-jurisdictional coordination team.

**Key Differentiators for This Scenario:**
- Out-of-province identifiers and jurisdiction metadata
- Relaxed mandatory field requirements (may not have Alberta PHN)
- "Referring Jurisdiction Contact" replaces "Provider Details"
- May include a free-text narrative field for additional case context from the originating jurisdiction

---

## 3. Data Model — Primary Intake Form (SmartForm)

The primary intake SmartForm is organized into four logical sections. Each section maps to Epic build artifacts (SmartData Elements, value sets, master file records).

### 3.1 Section A — Patient Demographics

Most fields auto-populate in Hyperdrive from the encounter/ADT context. Manual entry required in EpicCare Link if patient is not in MPI.

| Data Element | Epic Build Artifact | Master File / Source | Required | Notes |
|---|---|---|---|---|
| Patient Name (Legal) | Auto-populate from EPT | EPT (Patient) | Yes | Last, First, Middle |
| Preferred Name / Alias | SDE | EPT | No | Important for partner notification |
| Date of Birth | Auto-populate from EPT | EPT | Yes | |
| Alberta PHN (ULI) | Auto-populate from EPT | EPT / IDX | Conditional | Required for AB residents; conditional for out-of-province |
| Out-of-Province Health Card # | SDE (text) | — | Conditional | Required when patient is non-AB resident |
| Issuing Province/Territory or Country | SDE (drop-down) | Province/Territory value set | Conditional | Required with out-of-province health card |
| Sex Assigned at Birth | Auto-populate from EPT | EPT | Yes | |
| Gender Identity | Auto-populate from EPT | EPT | No | Connect Care already captures this |
| Pronouns | Auto-populate from EPT | EPT | No | |
| Date of Birth (estimated if unknown) | SDE (date) | — | Conditional | For cases where exact DOB unavailable |
| Address (Street, City, Province, Postal Code) | Auto-populate from EPT | EPT | Yes | Current residential address |
| Phone Number(s) | Auto-populate from EPT | EPT | Yes | Home, Cell, Work — at least one |
| Email Address | Auto-populate from EPT | EPT | No | |
| Indigenous Identity | SDE (drop-down) | Value set: First Nations (Status/Non-Status), Métis, Inuit, Prefer not to say, Not applicable | No | Required for FNIHB reporting pathway |
| Pregnancy Status | SDE (drop-down) | Value set: Pregnant, Not Pregnant, Unknown | Conditional | Required for female/AFAB patients — triggers congenital syphilis protocol |

### 3.2 Section B — Provider / Referral Source Details

Auto-populates from the logged-in user's SER (Provider) record in Hyperdrive. Manual entry or pre-populated from portal login in EpicCare Link.

| Data Element | Epic Build Artifact | Master File / Source | Required | Notes |
|---|---|---|---|---|
| Referral Source Type | SDE (drop-down) | Value set: Alberta Prescriber, Out-of-Province MOH, Federal (FNIHB), Laboratory (auto-generated), Other | Yes | Drives conditional field display |
| Ordering/Notifying Provider Name | Auto-populate from SER | SER (Provider) | Yes | |
| Provider CPSA/Licensure ID | Auto-populate from SER | SER | Conditional | Required for Alberta prescribers |
| Provider Specialty/Role | Auto-populate from SER | SER | No | |
| Practice/Facility Name | Auto-populate from encounter | DEP/LOC (Department/Location) | Yes | |
| Facility Address | Auto-populate from encounter | DEP/LOC | No | |
| Provider Phone | Auto-populate from SER | SER | Yes | |
| Provider Fax | Auto-populate from SER | SER | No | Legacy field — still needed for some STICS workflows |
| Provider Email | Auto-populate from SER | SER | No | |
| Notification Date | System-generated | — | Yes | Date/time SmartForm is submitted |
| **Out-of-Province Referral Fields** (conditional — visible when Referral Source Type ≠ "Alberta Prescriber") | | | | |
| Originating Province/Territory or Country | SDE (drop-down) | Province/Territory/Country value set | Conditional | |
| Originating Jurisdiction Case/Reference ID | SDE (text) | — | No | Their internal tracking number |
| Originating Jurisdiction Contact Name | SDE (text) | — | Conditional | |
| Originating Jurisdiction Contact Phone | SDE (phone) | — | Conditional | |
| Originating Jurisdiction Contact Email | SDE (email) | — | No | |

### 3.3 Section C — Diagnosis and Clinical Information

This section captures the STI diagnosis, staging (where applicable), clinical presentation, and relevant risk factors.

| Data Element | Epic Build Artifact | Master File / Source | Required | Notes |
|---|---|---|---|---|
| STI Diagnosis | Encounter Diagnosis / Problem List entry | EDG (Diagnosis) master file — STI Grouper | Yes | Mapped to ICD-10-CA. Multiple diagnoses allowed. |
| Syphilis Stage | SDE (drop-down) | Value set: Primary, Secondary, Early Latent (<1yr), Late Latent (>1yr/unknown), Early Neurosyphilis, Late Neurosyphilis, Tertiary (non-neuro), Congenital | Conditional | Required when diagnosis is Syphilis |
| Gonorrhea Site(s) of Infection | SDE (multi-select) | Value set: Genital, Pharyngeal, Rectal, Conjunctival, Disseminated, Other | Conditional | Required when diagnosis is Gonorrhea. Multiple sites per case. |
| Chlamydia Site(s) of Infection | SDE (multi-select) | Value set: Genital, Pharyngeal, Rectal, Conjunctival, Perinatally Acquired, Other | Conditional | Required when diagnosis is Chlamydia |
| Specimen Collection Date | SDE (date) | — | Yes | Date specimen was collected for the confirming test |
| Lab Accession / Requisition Number | SDE (text) | — | No | Links to ProvLab result |
| Confirming Laboratory Test Type | SDE (drop-down) | Value set: NAAT, Culture, Serology (EIA), Serology (RPR), Dark-field Microscopy, Other | No | |
| Symptoms Present | SDE (yes/no) | — | Yes | |
| Symptom Description | SDE (multi-select) | SNOMED CT-mapped value set: Genital ulcer/chancre, Skin rash, Urethral discharge, Vaginal discharge, Dysuria, Pharyngitis, Alopecia, Lymphadenopathy, Arthralgia, Fever, Ano-rectal symptoms, Conjunctivitis, Asymptomatic, Other | Conditional | Required when Symptoms Present = Yes |
| Symptom Onset Date | SDE (date) | — | Conditional | |
| HIV Co-infection Status | SDE (drop-down) | Value set: Positive, Negative, Unknown, Declined testing | No | Relevant for treatment management per guidelines |
| Hepatitis B Status | SDE (drop-down) | Value set: Immune, Susceptible, Acute, Chronic, Unknown | No | |
| Hepatitis C Status | SDE (drop-down) | Value set: Positive, Negative, Unknown | No | |
| Pregnancy Status (repeated from demographics if applicable) | — | — | Conditional | Cross-referenced from Section A |
| Risk Factors | SDE (multi-select) | Value set: New sexual partner in past 12 months, >2 sexual partners in past 12 months, Prior STI history, Injection drug use, Incarceration, Exchange of goods/money for sex, Street-involved, Men who have sex with men (MSM), Travel to endemic area, Sexual assault, Contact with known STI case, Other | No | Per Alberta disease management guidelines |
| Treatment Initiated | SDE (drop-down) | Value set: Yes — at time of notification, Yes — empiric (pending confirmation), No — pending results, No — patient declined, No — referred for treatment | Yes | |
| Treatment Date | SDE (date) | — | Conditional | Required when Treatment Initiated = Yes |
| Additional Clinical Notes | SDE (free text) | — | No | Narrative field for context not captured in structured fields |

### 3.4 Epic Diagnosis Grouper — STI Intake (EDG Master File)

The following ICD-10-CA codes should be configured as an **Epic Diagnosis Grouper** to power the diagnosis pick-list in the SmartForm. This grouper is referenced by the EDG master file and drives conditional logic (e.g., syphilis staging fields appear only when a syphilis diagnosis is selected).

| Diagnosis | ICD-10-CA Code(s) | Grouper Category |
|---|---|---|
| Syphilis, Primary | A51.0, A51.1 | Syphilis |
| Syphilis, Secondary | A51.3, A51.4 | Syphilis |
| Syphilis, Early Latent | A51.5 | Syphilis |
| Syphilis, Late Latent | A52.8 | Syphilis |
| Neurosyphilis, Early | A52.1 | Syphilis |
| Neurosyphilis, Late | A52.1, A52.2, A52.3 | Syphilis |
| Tertiary Syphilis (non-neuro) | A52.0, A52.7 | Syphilis |
| Syphilis, Congenital (Early) | A50.0, A50.1, A50.2 | Syphilis |
| Syphilis, Congenital (Late) | A50.3, A50.4, A50.5, A50.6, A50.7 | Syphilis |
| Syphilis, Unspecified | A53.9 | Syphilis |
| Gonorrhea, Lower GU | A54.0 | Gonorrhea |
| Gonorrhea, Pelvis/GU (other) | A54.1, A54.2 | Gonorrhea |
| Gonorrhea, Eye | A54.3 | Gonorrhea |
| Gonorrhea, Musculoskeletal | A54.4 | Gonorrhea |
| Gonorrhea, Pharyngeal | A54.5 | Gonorrhea |
| Gonorrhea, Ano-rectal | A54.6 | Gonorrhea |
| Gonorrhea, Other/Disseminated | A54.8, A54.9 | Gonorrhea |
| Chlamydia, Lower GU | A56.0 | Chlamydia |
| Chlamydia, Pelvis/Upper GU | A56.1 | Chlamydia |
| Chlamydia, Other GU | A56.2 | Chlamydia |
| Chlamydia, Pharyngeal/Ano-rectal | A56.4 | Chlamydia |
| Chlamydia, Unspecified | A56.8 | Chlamydia |
| Lymphogranuloma Venereum (LGV) | A55 | LGV |
| Chancroid | A57 | Other STI |
| Non-Gonococcal Urethritis | N34.1 | Other STI |
| Muco-Purulent Cervicitis | N72 | Other STI |
| Hepatitis B, Acute (sexually acquired) | B16.x | Other STI |
| Hepatitis C, Acute (sexually acquired) | B17.1 | Other STI |
| HIV (initial diagnosis, sexually acquired) | B20, Z21 | Other STI |
| Unspecified STI | A64 | Other STI |
| STI Exposure (no confirmed diagnosis) | Z20.2 | Screening/Exposure |
| STI Screening Encounter | Z11.3 | Screening/Exposure |

> **Builder Note:** ICD-10-CA codes may have minor differences from ICD-10-CM. Validate all codes against the current Canadian Institute for Health Information (CIHI) ICD-10-CA coding standard and the Connect Care EDG master file before build. Epic's EDG records may use internal DX IDs that map to these ICD-10-CA codes.

---

## 4. Data Model — Exposure Contacts Flowsheet

The exposure contacts are captured on a **separate flowsheet** from the primary intake SmartForm. This design decision supports several requirements: a single source case may have multiple contacts, contacts may need to be updated over time by STICS/PNN staff independently of the original intake, and contact records may need to be linked to their own CD Episodes if they become confirmed cases.

### 4.1 Flowsheet Design Rationale

| Design Consideration | Approach |
|---|---|
| One-to-many relationship | Each flowsheet row represents one contact; multiple rows per patient encounter |
| Separation from intake | Contacts flowsheet is linked to the STI intake encounter but stored as a separate flowsheet template |
| Downstream editability | STICS investigators and PNNs can update contact records without modifying the original intake SmartForm |
| Cross-referencing | Contact records can reference an Epic patient (EPT) record if the contact is known in Connect Care, or store external identifying information if not |
| EpicCare Link compatibility | In the portal scenario, contacts are captured as a repeating section within the SmartForm, then written to the flowsheet via SmartForm-to-flowsheet mapping |

### 4.2 Minimum Data Set — Exposure Contact Record

Each contact is one row in the flowsheet. The data set is intentionally minimal for the intake stage; STICS/PNN investigation will add detail during follow-up.

| Flowsheet Row | Data Type | Value Set / Format | Required | Notes |
|---|---|---|---|---|
| Contact Name | Text | Last, First | Yes | May be partial (first name only, alias, online handle) |
| Contact Date of Birth | Date | YYYY-MM-DD | No | May be unknown at intake |
| Contact Estimated Age | Numeric | Integer | No | Alternative when DOB unknown |
| Contact Sex | Drop-down | Male, Female, Other, Unknown | No | |
| Contact Phone Number | Text | Phone format | No | At least one locating identifier required |
| Contact Email | Text | Email format | No | |
| Contact Address (City/Province/Country) | Text | Free text | No | Partial address acceptable |
| Contact Province/Territory or Country | Drop-down | Province/Territory/Country value set | No | Important for interprovincial referrals |
| Exposure Date (estimated) | Date | YYYY-MM-DD | Yes | Per guidelines: date of sexual contact |
| Exposure Date Range End | Date | YYYY-MM-DD | No | For ongoing exposure over a period |
| Exposure Type | Drop-down | Sexual — Vaginal, Sexual — Oral, Sexual — Anal, Sexual — Unknown type, Non-sexual (occupational, perinatal, blood/organ), Unknown | No | |
| Relationship to Source Case | Drop-down | Regular partner, Casual partner, Anonymous contact, Spouse/common-law, Other | No | |
| Contact Already in Connect Care? | Drop-down | Yes (link EPT), No, Unknown | No | If Yes, allows linking to an existing patient record |
| Linked EPT (Patient) ID | Patient link | EPT master file | No | Populated when contact is identified in MPI |
| Contact Aware of Exposure? | Drop-down | Yes, No, Unknown | No | |
| Referred to STICS for Follow-up | Drop-down | Yes, No | Yes | Default = Yes |
| Additional Notes | Text | Free text | No | Locating information, online platform handles, etc. |

### 4.3 Flowsheet Template Configuration

| Configuration Item | Value |
|---|---|
| Flowsheet Template Name | `IP STI EXPOSURE CONTACTS` (suggested) |
| Template Type | Patient-associated, encounter-linked |
| Row Group | Single group — "Exposure Contact Record" |
| Entry Mode | Multiple entries per encounter (one per contact) |
| Security | Restricted — visible to STICS role, MOH role, originating provider; not visible to general clinical staff (sensitive public health data) |
| Audit | Full audit trail required (who entered, who modified, timestamps) |

> **Builder Note:** Flowsheet security should leverage Epic's **Sensitive Data** flagging and role-based row-level security. Contact records contain information about third parties who have not consented to having their data in the chart — this requires careful alignment with Alberta's *Health Information Act (HIA)* and *Freedom of Information and Protection of Privacy Act (FOIP)*.

---

## 5. Platform-Specific Build Mapping

This section maps the logical data model to specific Epic build artifacts for each platform scenario.

### 5.1 Build Artifact Summary

| Component | Hyperdrive (Scenario 1) | EpicCare Link (Scenario 2) | Ministry Variant (Scenario 3) |
|---|---|---|---|
| **Primary Form** | SmartForm (ClinDoc) | EpicCare Link SmartForm | EpicCare Link SmartForm + conditional sections |
| **Patient Demographics** | Auto-populate from EPT/ADT | MPI search or manual entry | Manual entry (may be partial) |
| **Provider Details** | Auto-populate from SER/encounter | Auto-populate from portal login | Manual entry ("Referring Jurisdiction") |
| **Diagnosis** | EDG search (STI grouper) | Drop-down from STI grouper | Drop-down from STI grouper |
| **Symptoms** | SDE multi-select (full list) | Checkbox list (simplified) | Checkbox list (simplified) |
| **Exposure Contacts** | Linked Flowsheet (IP STI EXPOSURE CONTACTS) | Repeating section → flowsheet write-back | Repeating section → flowsheet write-back |
| **Submission Trigger** | InBasket to STICS pool | Referral order to STICS work queue | Referral order to STICS work queue + flag as interprovincial |
| **Order Entry** | Available (labs, meds) | Not available (informational only) | Not available |
| **Chart Access** | Full | Limited (view-only) | Limited or none |

### 5.2 SmartForm Conditional Logic

The SmartForm uses conditional display rules to adapt to the user scenario:

| Condition | Fields Shown/Hidden |
|---|---|
| Referral Source Type = "Alberta Prescriber" | Hide out-of-province referral fields; show standard provider fields |
| Referral Source Type = "Out-of-Province MOH" or "Federal (FNIHB)" | Show originating jurisdiction fields; relabel Provider section as "Referring Jurisdiction Contact"; relax PHN requirement |
| STI Diagnosis grouper category = "Syphilis" | Show Syphilis Stage field |
| STI Diagnosis grouper category = "Gonorrhea" | Show Gonorrhea Site(s) of Infection |
| STI Diagnosis grouper category = "Chlamydia" | Show Chlamydia Site(s) of Infection |
| Symptoms Present = "Yes" | Show Symptom Description multi-select and Symptom Onset Date |
| Treatment Initiated = "Yes" | Show Treatment Date |
| Patient Sex = Female/AFAB | Show Pregnancy Status (if not already captured) |
| Contact Already in Connect Care? = "Yes" | Show EPT (Patient) link search field |

---

## 6. Epic Master File Reference Summary

| Master File | INI | Role in This Build |
|---|---|---|
| EPT (Patient) | EPT | Patient demographics, PHN/ULI, address, phone |
| SER (Provider) | SER | Provider name, licensure ID, specialty, contact info |
| EDG (Diagnosis) | EDG | STI diagnosis grouper, ICD-10-CA mapping |
| DEP (Department) | DEP | Facility/practice name and location |
| LOC (Location) | LOC | Encounter location |
| FLO (Flowsheet) | FLO | Exposure contacts flowsheet template and row definitions |
| SDE (SmartData Element) | LQF/LPG | All structured data capture fields within the SmartForm |
| CMP (Component) | CMP | Lab result components (for cross-reference, not direct capture) |
| LNR (Line) | LNR | Value sets / category lists for drop-downs |

---

## 7. Reporting and Downstream Integration

### 7.1 STICS Notification Workflow

| Step | Actor | System Action |
|---|---|---|
| 1. SmartForm submitted | Prescriber / Referrer | InBasket message (Hyperdrive) or Referral order (EpicCare Link) sent to STICS pool |
| 2. Triage and staging | STICS Medical Consultant | Reviews intake, confirms staging (especially syphilis), assigns to PNN |
| 3. Contact follow-up | Partner Notification Nurse (PNN) | Updates exposure contacts flowsheet with investigation findings |
| 4. NDR generation | STICS Admin | Generates Notifiable Disease Report from SmartForm data + investigation findings for CMOH |
| 5. Out-of-province coordination | STICS | Forwards relevant case/contact data to originating or receiving jurisdiction |

### 7.2 Data Extraction Points

| Data Need | Source |
|---|---|
| CMOH Reporting (NDR) | SmartForm SDEs + Flowsheet rows → Clarity/Caboodle reporting tables |
| STICS Case Management | SmartForm linked to CD Episode; flowsheet rows for contact tracking |
| Surveillance / IHDA | Clarity extract of EDG diagnosis + encounter data |
| Interprovincial Referrals | Filtered by Referral Source Type ≠ "Alberta Prescriber" |

---

## 8. Open Design Decisions

The following items require further stakeholder input before finalizing the build specification:

| # | Decision | Options | Stakeholders | Status |
|---|---|---|---|---|
| 1 | Ministry referral: same form with conditional sections vs. separate form? | A) Shared form (recommended — lower maintenance) B) Separate form (cleaner UX for Ministry users) | STICS Operations, Inter-jurisdictional Coordination, Epic Build Team | **Open** |
| 2 | Should the exposure contacts flowsheet be visible to the index patient via MyChart? | A) No (recommended — third-party privacy) B) Partial (contact count only) | Privacy/HIA Officer, STICS | **Open** |
| 3 | EpicCare Link SmartForm — repeating section for contacts or separate linked form? | A) Repeating section with flowsheet write-back B) Separate linked SmartForm for each contact | Epic Build Team (portal limitations testing) | **Open** |
| 4 | Auto-trigger BPA for STI intake when a positive lab result is filed? | A) Yes — BPA fires when ProvLab STI result files B) No — provider-initiated only | Clinical Informatics, ED Physician Leads, STICS | **Open** |
| 5 | Risk factor capture: at intake or deferred to STICS investigation? | A) At intake (captures provider-observed risk factors) B) Deferred (reduces provider burden) C) Both (optional at intake, completed by STICS) | STICS, ED Physician Leads, Primary Care Leads | **Open** |
| 6 | Under-18 safeguarding flag: should the SmartForm auto-trigger a child protection assessment prompt? | A) Yes — per guideline requirements for all STI cases in minors B) Advisory only (reminder text, no system trigger) | Legal, Child & Family Services liaison, STICS | **Open** |
| 7 | Integration with existing CD Episode workflow (Confirm → Investigate → Intervene → Close): at what stage does the SmartForm submission create or update the CD Episode? | A) Creates new CD Episode at "Confirm" stage B) Updates existing CD Episode if one exists (lab-initiated) C) Configurable | CDS Solution Design team | **Open** |

---

## 9. Alignment to Alberta Disease Management Guidelines

The data elements in this specification are derived from the mandatory reporting requirements across the following Alberta Public Health Disease Management Guidelines:

| Guideline | Key Reporting Requirement Addressed |
|---|---|
| Syphilis | Completed "Notification of STI" form within 48 hours; staging by STICS; partner notification for all contacts within 3–12 months depending on stage; pregnancy screening |
| Gonorrhea | Completed "Notification of STI" form within 48 hours; site-of-infection classification; partner notification |
| Chlamydia | Completed "Notification of STI" form within 48 hours; site-of-infection classification; perinatally acquired reporting |
| Non-Gonococcal Urethritis | Reporting via STICS; partner notification within 60 days |
| All STIs | Out-of-province/country case and contact reporting to CMOH; under-18 assessment for child protection reporting; HIV/STI co-infection screening recommendation |

> **Source:** Alberta Public Health Disease Management Guidelines, available at [open.alberta.ca/publications](https://open.alberta.ca/publications). Specific guidelines: [Syphilis](https://open.alberta.ca/publications/syphilis), [Gonorrhea](https://open.alberta.ca/publications/gonorrhea), [Chlamydia](https://open.alberta.ca/publications/chlamydia), [Non-Gonococcal Urethritis](https://open.alberta.ca/publications/non-gonococcal-urethritis).

---

## 10. Next Steps

1. **Stakeholder review** of open design decisions (Section 8) with STICS Operations, Privacy Officer, and Epic Build Team
2. **EpicCare Link feasibility testing** — validate SmartForm capabilities and repeating section/flowsheet write-back in the portal
3. **EDG grouper build** — create and validate the STI diagnosis grouper with ICD-10-CA code mapping against CIHI standards
4. **SDE and value set build** — create all SmartData Elements and associated value sets (LNR records)
5. **Flowsheet template build** — create the IP STI EXPOSURE CONTACTS flowsheet with row definitions and security configuration
6. **SmartForm wireframes** — create visual mockups for Hyperdrive and EpicCare Link versions for clinical validation
7. **Integration design** — define the InBasket/Referral triggers and CD Episode linkage
8. **Privacy Impact Assessment (PIA)** — required for exposure contact data and interprovincial data sharing

---

*Document maintained in the Communicable Disease Management workspace. For questions contact Alec Blair, Enterprise Architecture — alec@stealthea.com*
