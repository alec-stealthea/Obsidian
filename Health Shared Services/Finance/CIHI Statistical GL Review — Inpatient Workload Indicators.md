---
type: Reference
title: "CIHI Statistical G/L Review — Inpatient Workload Indicators"
description: "Alberta Health reports financial and statistical data to CIHI's Canadian MIS Database (CMDB) using the MIS Standards framework."
timestamp: 2026-06-26T19:19:06Z
tags:
  - hss
  - finance
  - cihi
  - workload
created: 2026-05-15
---
# CIHI Statistical G/L Review — Inpatient Workload Indicators

> **Purpose**: A review of CIHI's MIS Standards guidance on the Statistical General Ledger, focused on identifying inpatient activities that can be mapped to workload indicators. This document supports the new workload and activity reporting initiative with finance.

---

## Context and Objective

Alberta Health reports financial and statistical data to CIHI's Canadian MIS Database (CMDB) using the MIS Standards framework. The Statistical G/L is the mechanism through which activity and workload statistics are captured alongside financial data in the general ledger. This review examines the MIS Standards structure to identify how inpatient activities flow through the statistical reporting framework, and where value stream mapping could clarify the relationship between clinical activities and workload indicators.

The goal is to understand what is being measured, how it is structured in the G/L, and where the seams are between clinical work and statistical reporting — so that architecture can support better alignment between operational reality and what gets reported.

---

## The MIS Standards Framework

The MIS Standards provide a national framework with three integrated dimensions for capturing health service organisation data:

1. **Financial data** — expenses, revenues, and assets tracked through standard financial accounts.
2. **Statistical data** — workload units, service activity counts, and service recipient statistics tracked through statistical accounts.
3. **Functional centre data** — the organisational units where financial and statistical data are recorded.

These three dimensions intersect in the general ledger. A single G/L entry is coded by functional centre (where the work happened), account type (financial or statistical), and secondary account code (what specifically was measured). The Statistical G/L is the subset of this structure that captures the non-financial data — the activity and workload side.

### Primary vs. Secondary Accounts

The MIS Standards use a two-tier account structure. **Primary accounts** are the functional centres themselves — they represent the organisational units doing the work (e.g., a nursing inpatient unit, a laboratory, a pharmacy). **Secondary accounts** carry the detail — they identify the specific type of financial or statistical information being recorded against that functional centre.

For statistical reporting, the secondary account code structure is a seven-digit code:

| Digit(s) | Purpose | Example |
|---|---|---|
| 1 | Broad group of statistical account | 1 = Workload units |
| 2–3 | Nature of the statistic | 02 = Assessment |
| 4–5 | Category and type of service recipient | 12 = Inpatient — rehabilitation |
| 6–7 | Further detail on the activity provided | 10 = Specific activity type |

So a code like **1 02 12 10** would represent workload units for an assessment activity provided to an inpatient rehabilitation service recipient.

---

## Functional Centres Relevant to Inpatient Activities

Functional centres are the backbone of MIS Standards reporting. For inpatient workload analysis, the most relevant functional centre groupings include:

### Nursing Inpatient/Resident Services (7xx series)

The 7xx functional centre series covers nursing inpatient and resident services. The key code is **712 — Nursing Inpatient Services**. This is where the bulk of inpatient nursing workload is captured. Workload in this functional centre includes all activities undertaken on behalf of a service recipient by unit-producing personnel.

### Support Service Functional Centres

Inpatient activities also generate workload in support service functional centres such as clinical laboratory (diagnostic testing), medical imaging (radiology, ultrasound), pharmacy (medication dispensing), and therapeutic services (physiotherapy, occupational therapy, respiratory therapy). Each of these has its own functional centre and captures its own workload statistics, but the service recipient coding on those statistics links back to the inpatient population.

### Ambulatory and Emergency Functional Centres

While the focus of this review is inpatient, it is worth noting that some patients transition through emergency and ambulatory functional centres before becoming inpatients. Understanding the boundary — when a patient "converts" from an emergency or ambulatory service recipient to an inpatient — is relevant to accurate workload attribution.

---

## Key Statistical Measures for Inpatient Workload

The MIS Standards define several categories of statistical measures that apply to inpatient activities. These are the measures that populate the Statistical G/L.

### Workload Units (Secondary Account Group 1)

Workload is measured in standardised units of time. For nursing inpatient services, the MIS Standards' **Nursing Workload Measurement System** is the preferred methodology. It tracks the time related to activities completed by unit-producing personnel in a functional centre. Workload units are the most granular measure of what staff actually do.

Earned hours represent the total time associated with staff who produce the workload: **Earned Hours = Worked Hours + Benefit Hours + Purchased Service Hours**.

### Service Activity Statistics (Secondary Account Group 4)

These are counts of discrete activities or events, not time-based measures. Key inpatient service activity statistics include:

- **Inpatient Admissions** (4 01*) — Count of patients admitted to an inpatient functional centre.
- **Inpatient Days** (4 03*) — Days during which services are provided to an inpatient, counted between census-taking hours on successive days. The day of admission counts; the day of separation does not.
- **Procedures / Exams** — Counts of specific clinical interventions performed.
- **Beds Staffed and In Operation** — The physical capacity measure against which occupancy is calculated.

### Surrogate Workload Measures

Where a full workload measurement system is not implemented, the MIS Standards allow for "surrogate" measures — counts of services provided that stand in for time-based workload. Examples include number of registrations completed, meal days served, records filed, and similar volume indicators. These are less precise than WMS-based workload units but are commonly used in functional centres that have not implemented a minute-based system.

---

## Value Stream Perspective — Mapping Inpatient Activities to Workload Indicators

A value stream view of inpatient care can help clarify how clinical activities translate into the statistical measures captured in the G/L. The following is a high-level value stream for a typical inpatient episode, with the corresponding MIS Standards statistical touchpoints.

### Inpatient Episode Value Stream

**1. Referral and Pre-Admission**
- Activity: Patient referred for admission (from ED, clinic, or external).
- Statistical touchpoint: Not typically captured in inpatient statistical accounts — this activity often sits in ambulatory or emergency functional centres.
- Gap/opportunity: Understanding referral volume could inform upstream workload forecasting.

**2. Admission**
- Activity: Patient admitted, bed assigned, initial assessment completed.
- Statistical touchpoint: **Inpatient Admission** (4 01*) counted. Workload units begin accruing in the nursing inpatient functional centre (712).
- Key indicator: Admission count is a primary volume driver for workload planning.

**3. Assessment and Care Planning**
- Activity: Nursing assessment, physician assessment, interdisciplinary care plan development.
- Statistical touchpoint: **Workload units** (1 02*) captured for assessment activities. Multiple functional centres may record workload (nursing, allied health, social work).
- Key indicator: Assessment workload per admission — a measure of intake complexity.

**4. Ongoing Care and Treatment**
- Activity: Medication administration, monitoring, wound care, therapeutic interventions, diagnostic testing.
- Statistical touchpoint: **Workload units** across nursing (712) and support functional centres (lab, imaging, pharmacy, therapies). **Inpatient Days** (4 03*) accrue daily. **Procedures and exams** counted in respective functional centres.
- Key indicator: Workload units per inpatient day — the core intensity measure. Inpatient days are the volume denominator for most per-diem reporting.

**5. Discharge Planning**
- Activity: Discharge assessment, referral to community services, patient/family education, medication reconciliation.
- Statistical touchpoint: **Workload units** for discharge-related activities. May involve coordination with community functional centres.
- Key indicator: Discharge workload as a proportion of total episode workload — relevant to understanding the "tail" cost of an admission.

**6. Separation**
- Activity: Patient leaves the facility.
- Statistical touchpoint: **Inpatient Separation** recorded. The separation day is not counted as an inpatient day.
- Key indicator: Length of stay (derived from admission and separation dates) is a critical planning and benchmarking metric.

### Value Stream Gaps and Opportunities

Mapping the value stream against the Statistical G/L structure reveals several areas where the current reporting framework may not fully capture operational reality:

- **Transitions of care** — When a patient moves between functional centres (e.g., from ICU to a step-down unit), workload attribution can become fragmented. The value stream sees one patient journey; the G/L sees multiple functional centre entries.
- **Indirect activities** — Documentation, communication, coordination, and quality improvement activities consume significant nursing time but may be inconsistently captured in workload measurement systems.
- **Interdisciplinary workload** — Allied health, social work, and spiritual care workload related to an inpatient may be captured in separate functional centres, making it difficult to see the total workload picture for a single patient episode.
- **Wait times and delays** — The Statistical G/L captures what was done, not what was waited for. Bed-wait time in the ED before admission, for example, does not appear as inpatient workload but represents real operational cost.

---

## Implications for the Finance Initiative

This review suggests several considerations for the workload and activity reporting initiative:

1. **Start with the functional centre map.** Before mapping activities to workload indicators, confirm which functional centres are currently active in the Statistical G/L for the Community Portfolio's facilities. The functional centre structure defines the boundaries of what can be reported.

2. **Distinguish WMS workload from surrogate measures.** The statistical weight of different indicators varies significantly depending on whether a functional centre uses a full workload measurement system or surrogate measures. The initiative should document which approach is used in each functional centre.

3. **Use the value stream to identify reporting gaps.** The value stream mapping exercise can serve as a validation tool — comparing what clinicians describe as their work against what the Statistical G/L actually captures. Gaps between the two are candidates for improved workload measurement.

4. **Clarify the inpatient day definition operationally.** The MIS Standards definition (admission day counts, separation day does not) is precise, but local practice may vary. Aligning operational counting with the CIHI definition is foundational to accurate reporting.

5. **Consider the CMDB submission context.** The data that flows into the Statistical G/L ultimately feeds CIHI's CMDB. Understanding what CIHI does with the data (benchmarking, cost-per-case calculations, indicator reporting) can help prioritise which statistical accounts matter most for the initiative.

---

## Key Reference Sources

- [CIHI MIS Standards](https://www.cihi.ca/en/management-information-system-standards) — The authoritative source for the complete MIS Standards framework, including functional centre definitions, secondary account code structures, and workload measurement guidance.
- [CIHI MIS Standards FAQ](https://www.cihi.ca/en/frequently-asked-questions-about-the-management-information-system-standards) — Answers to common questions about MIS Standards implementation.
- [CMDB User Guide 2021–2022 (PDF)](https://www.cihi.ca/sites/default/files/document/cmdb-user-guide-2021-2022-en.pdf) — Detailed guidance on the Canadian MIS Database, including data submission requirements and variable definitions.
- [CMDB Metadata Dictionary 2024 (PDF)](https://www.cihi.ca/sites/default/files/document/cmdb-metadata-dictionary-2024-en.pdf) — Variable-level metadata for CMDB data elements.
- [CIHI Canadian MIS Database — Key Metrics and Terms](https://www.cihi.ca/en/canadian-mis-database-definitions-of-key-metrics-and-terms) — Definitions of key statistical metrics including inpatient days, earned hours, and workload units.
- [NLCHI MIS Guidelines and Workload Measurement Reference Guide (PDF)](https://www.nlchi.nl.ca/images/PDFs/Reference_Guide_Feb_27_2005_FINAL.pdf) — A detailed provincial reference guide for MIS Standards implementation, including worked examples of statistical account coding.
- [NLCHI Nursing MIS Reference Guide (PDF)](https://nlchi.nl.ca/images/PDFs/Nursing%20MIS%20Reference%20Guide%20-%202011-12-21.pdf) — Nursing-specific workload measurement guidance under MIS Standards.
- [CIHI Canadian Patient Cost Database — MIS Methodology (PDF)](https://www.cihi.ca/sites/default/files/document/mis_patient_cost_meth_en_0.pdf) — How MIS Standards data feeds into patient costing methodologies.
- [Cost of a Standard Hospital Stay — Methodology Notes (PDF)](https://www.cihi.ca/sites/default/files/document/cost-standard-hospital-stay-methodology-notes-en.pdf) — How CIHI uses MIS-reported data to calculate hospital stay costs.
- [MIS Standards in Canadian Health Care (Medisolution)](https://www.medisolution.com/en/flux/nouvelles/?date=1571284800&article=mis-standards-in-canadian-health-care) — An accessible overview of MIS Standards and the Statistical G/L concept.

---

## Next Steps

- [ ] Obtain the current functional centre listing for Community Portfolio facilities from finance
- [ ] Confirm which functional centres use full WMS vs. surrogate workload measures
- [ ] Draft a detailed inpatient value stream map with finance input
- [ ] Map the value stream activities to specific MIS Standards secondary account codes
- [ ] Identify reporting gaps between clinical activities and Statistical G/L capture
- [ ] Review Alberta-specific MIS Standards implementation guidance (if available from Alberta Health)

---

_Created_: 2026-05-15
