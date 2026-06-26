# Compassionate Intervention — Release of Information
## Object View Structure

This document defines the individual SQL views in Snowflake for each entity in the [[Compassionate Intervention Release of Information Data Model|CI RoI Data Model]], plus the aggregate view that unions them for the IBM Integration Engine query. The design philosophy per the data model: query existing encounter views and filter using CI RoI data product rules, rather than building dedicated ETL for each entity.

## View Hierarchy

```
VW_CI_ROI_AGGREGATE  ◄── queried by IBM Integration Engine
    │
    ├── VW_CI_ROI_EMS_INCIDENTS
    │       └── Source: ePCR Siren (legacy + new)
    │
    ├── VW_CI_ROI_ED_VISITS
    │       └── Source: Epic Clarity (F_ED_ENCOUNTERS, PAT_ENC_DX)
    │
    ├── VW_CI_ROI_INPATIENT_EPISODES
    │       └── Source: Epic Clarity (PAT_ENC_HSP, PROBLEM_LIST)
    │
    ├── VW_CI_ROI_AMBULATORY_VISITS
    │       └── Source: Epic Clarity (Prelude + ClinDoc)
    │
    ├── VW_CI_ROI_COMMUNITY_TREATMENT_ORDERS
    │       └── Source: Epic Orders
    │
    └── VW_CI_ROI_CURRENT_DIAGNOSES
            └── Source: Epic Clinical Documentation
```

## Common Conventions

All views follow these patterns:

- **Patient identifier:** `patient_id` (Epic EPI) is the join/filter key across all views
- **Date filter column:** `encounter_date` is standardized across all entity views so the aggregate can apply the 3-year lookback uniformly
- **Encounter type tag:** Each view includes a literal `encounter_type` column for downstream grouping
- **Detail JSON:** Entity-specific attributes are packed into a `detail_json` VARIANT column in addition to common columns, allowing the aggregate view to have a uniform schema while preserving all attributes
- **Source views:** These views should query existing analytics/reporting views where possible and layer the CI RoI filter on top

---

## 1. EMS Incident Summary View

Source systems: ePCR Siren (legacy data store) and ePCR Siren (Fall 2025+ new platform).

```sql
CREATE OR REPLACE VIEW CI_ROI.REPORTING.VW_CI_ROI_EMS_INCIDENTS AS
SELECT
    p.patient_id,
    'EMS_INCIDENT'                          AS encounter_type,
    e.incident_id                           AS encounter_id,
    e.incident_date_time::DATE              AS encounter_date,
    e.destination_facility                  AS facility,
    e.chief_complaint,
    e.presenting_complaint,
    NULL                                    AS diagnoses,
    e.disposition,
    OBJECT_CONSTRUCT(
        'incidentId',           e.incident_id,
        'incidentDateTime',     e.incident_date_time,
        'sceneLocation',        e.scene_location,
        'destinationFacility',  e.destination_facility,
        'emergencyCSN',         e.emergency_csn,
        'chiefComplaint',       e.chief_complaint,
        'presentingComplaint',  e.presenting_complaint,
        'disposition',          e.disposition
    )                                       AS detail_json
FROM EMS.REPORTING.VW_EMS_INCIDENTS e       -- existing ePCR view (unify legacy + new)
JOIN CI_ROI.STAGING.PATIENT_XREF p          -- PHN/EPI crosswalk
    ON e.patient_identifier = p.ems_patient_id
;
```

**Notes:**
- The `PATIENT_XREF` table maps ePCR patient identifiers to Epic EPI. This crosswalk is necessary because ePCR Siren is a separate CIS from Epic.
- The existing `VW_EMS_INCIDENTS` view should union legacy and new ePCR Siren data. If that view doesn't exist yet, it needs to be built as a prerequisite.

---

## 2. ED Visit Summary View

Source: Epic Clarity — `F_ED_ENCOUNTERS`, `PAT_ENC_DX`, `CL_RSN_FOR_VISIT`, `CLARITY_EDG`.

```sql
CREATE OR REPLACE VIEW CI_ROI.REPORTING.VW_CI_ROI_ED_VISITS AS
SELECT
    ed.pat_id                               AS patient_id,
    'ED_VISIT'                              AS encounter_type,
    ed.pat_enc_csn_id::VARCHAR              AS encounter_id,
    ed.adt_arrival_dttm::DATE               AS encounter_date,
    COALESCE(loc_ed.loc_name, loc_ucc.loc_name)  AS facility,
    rsn.reason_visit_name                   AS chief_complaint,
    NULL                                    AS presenting_complaint,
    LISTAGG(DISTINCT edg.dx_name, '; ')
        WITHIN GROUP (ORDER BY edg.dx_name) AS diagnoses,
    ed.ed_disposition                       AS disposition,
    OBJECT_CONSTRUCT(
        'encounterId',          ed.pat_enc_csn_id::VARCHAR,
        'encounterType',        'ED',
        'facility',             COALESCE(loc_ed.loc_name, loc_ucc.loc_name),
        'arrivalDateTime',      ed.adt_arrival_dttm,
        'departureDateTime',    ed.ed_departure_dttm,
        'chiefComplaint',       rsn.reason_visit_name,
        'ctasLevel',            ed.acuity_level_c,
        'diagnoses',            ARRAY_AGG(DISTINCT edg.dx_name),
        'disposition',          ed.ed_disposition,
        'mentalHealthActOrder', CASE WHEN mha.order_id IS NOT NULL THEN TRUE ELSE FALSE END
    )                                       AS detail_json
FROM EPIC_CLARITY.DBO.F_ED_ENCOUNTERS ed
LEFT JOIN EPIC_CLARITY.DBO.CL_RSN_FOR_VISIT rsn
    ON ed.first_chief_complaint_id = rsn.reason_visit_id
LEFT JOIN EPIC_CLARITY.DBO.PAT_ENC_DX dx
    ON ed.pat_enc_csn_id = dx.pat_enc_csn_id
    AND dx.dx_ed_yn = 'Y'
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_EDG edg
    ON dx.dx_id = edg.dx_id
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_LOC loc_ed
    ON ed.first_emergency_department_id = loc_ed.loc_id
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_LOC loc_ucc
    ON ed.last_department_id = loc_ucc.loc_id
LEFT JOIN (
    SELECT DISTINCT pat_enc_csn_id, order_id
    FROM EPIC_CLARITY.DBO.ORDER_PROC
    WHERE order_type_c = '<MHA_ORDER_TYPE>'  -- Mental Health Act order type code
) mha
    ON ed.pat_enc_csn_id = mha.pat_enc_csn_id
GROUP BY
    ed.pat_id, ed.pat_enc_csn_id, ed.adt_arrival_dttm, ed.ed_departure_dttm,
    rsn.reason_visit_name, ed.acuity_level_c, ed.ed_disposition,
    loc_ed.loc_name, loc_ucc.loc_name, mha.order_id
;
```

**Notes:**
- `facility` uses `first_emergency_department_id` for ED visits and `last_department_id` for UCC visits, per the data model.
- The Mental Health Act order detection requires the specific `order_type_c` code — to be confirmed with the Epic Connect Care team.
- Diagnoses are aggregated into a semicolon-delimited string for the common column and an array in `detail_json`.

---

## 3. Inpatient Episode Summary View

Source: Epic Clarity — `PAT_ENC_HSP`, `PROBLEM_LIST`, `IP_ORDER_REC`, `CLARITY_ADT`.

```sql
CREATE OR REPLACE VIEW CI_ROI.REPORTING.VW_CI_ROI_INPATIENT_EPISODES AS
SELECT
    ip.pat_id                               AS patient_id,
    'INPATIENT'                             AS encounter_type,
    ip.pat_enc_csn_id::VARCHAR              AS encounter_id,
    ip.hosp_admsn_time::DATE                AS encounter_date,
    loc.loc_name                            AS facility,
    ip.chief_complaint_text                 AS chief_complaint,
    NULL                                    AS presenting_complaint,
    LISTAGG(DISTINCT edg.dx_name, '; ')
        WITHIN GROUP (ORDER BY edg.dx_name) AS diagnoses,
    ip.disch_disposition                    AS disposition,
    OBJECT_CONSTRUCT(
        'encounterId',          ip.pat_enc_csn_id::VARCHAR,
        'encounterType',        'Inpatient',
        'facility',             loc.loc_name,
        'admitDateTime',        ip.hosp_admsn_time,
        'dischargeDateTime',    ip.hosp_disch_time,
        'chiefComplaint',       ip.chief_complaint_text,
        'department',           dept.department_name,
        'diagnoses',            ARRAY_AGG(DISTINCT edg.dx_name),
        'lengthOfStayDays',     los.length_of_stay_days,
        'dischargeMedications', med.discharge_meds,
        'disposition',          ip.disch_disposition,
        'mentalHealthActOrder', CASE WHEN mha.order_id IS NOT NULL THEN TRUE ELSE FALSE END
    )                                       AS detail_json
FROM EPIC_CLARITY.DBO.PAT_ENC_HSP ip
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_ADT adt
    ON ip.pat_enc_csn_id = adt.pat_enc_csn_id
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_DEP dept
    ON adt.department_id = dept.department_id
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_LOC loc
    ON dept.rev_loc_id = loc.loc_id
LEFT JOIN EPIC_CLARITY.DBO.PROBLEM_LIST pl
    ON ip.pat_id = pl.pat_id
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_EDG edg
    ON pl.dx_id = edg.dx_id
LEFT JOIN EPIC_CLARITY.DBO.LENGTH_OF_STAY los
    ON ip.pat_enc_csn_id = los.pat_enc_csn_id
LEFT JOIN (
    SELECT pat_enc_csn_id,
           ARRAY_AGG(medication_name) AS discharge_meds
    FROM EPIC_CLARITY.DBO.IP_ORDER_REC
    WHERE rec_action_c = '<DISCHARGE_RECONCILIATION>'
    GROUP BY pat_enc_csn_id
) med
    ON ip.pat_enc_csn_id = med.pat_enc_csn_id
LEFT JOIN (
    SELECT DISTINCT pat_enc_csn_id, order_id
    FROM EPIC_CLARITY.DBO.ORDER_PROC
    WHERE order_type_c = '<MHA_ORDER_TYPE>'
) mha
    ON ip.pat_enc_csn_id = mha.pat_enc_csn_id
WHERE ip.ip_admit_yn = 'Y'
GROUP BY
    ip.pat_id, ip.pat_enc_csn_id, ip.hosp_admsn_time, ip.hosp_disch_time,
    ip.chief_complaint_text, dept.department_name, loc.loc_name,
    los.length_of_stay_days, med.discharge_meds, ip.disch_disposition,
    mha.order_id
;
```

**Notes:**
- `chief_complaint` maps to "Reason for Visit" (EPT 10150) per the data model.
- Discharge medications come from the IP Discharge Reconciliation event — the `rec_action_c` value needs to be confirmed.
- `dischargeDateTime` is NULL for currently admitted patients.

---

## 4. Ambulatory Visit Summary View

Source: Epic Clarity — Prelude + ClinDoc.

```sql
CREATE OR REPLACE VIEW CI_ROI.REPORTING.VW_CI_ROI_AMBULATORY_VISITS AS
SELECT
    amb.pat_id                              AS patient_id,
    'AMBULATORY'                            AS encounter_type,
    amb.pat_enc_csn_id::VARCHAR             AS encounter_id,
    amb.contact_date::DATE                  AS encounter_date,
    loc.loc_name                            AS facility,
    amb.chief_complaint                     AS chief_complaint,
    amb.presenting_complaint                AS presenting_complaint,
    LISTAGG(DISTINCT edg.dx_name, '; ')
        WITHIN GROUP (ORDER BY edg.dx_name) AS diagnoses,
    NULL                                    AS disposition,
    OBJECT_CONSTRUCT(
        'encounterId',          amb.pat_enc_csn_id::VARCHAR,
        'encounterVisitType',   amb.enc_visit_type,     -- In-person, Virtual, Phone
        'facility',             loc.loc_name,
        'department',           dept.department_name,
        'serviceDateTime',      amb.contact_date,
        'chiefComplaint',       amb.chief_complaint,
        'presentingComplaint',  amb.presenting_complaint,
        'diagnoses',            ARRAY_AGG(DISTINCT edg.dx_name)
    )                                       AS detail_json
FROM EPIC_CLARITY.DBO.PAT_ENC amb
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_DEP dept
    ON amb.department_id = dept.department_id
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_LOC loc
    ON dept.rev_loc_id = loc.loc_id
LEFT JOIN EPIC_CLARITY.DBO.PAT_ENC_DX dx
    ON amb.pat_enc_csn_id = dx.pat_enc_csn_id
LEFT JOIN EPIC_CLARITY.DBO.CLARITY_EDG edg
    ON dx.dx_id = edg.dx_id
WHERE amb.enc_type_c IN ('<AMBULATORY_TYPE_CODES>')  -- filter to ambulatory encounter types
GROUP BY
    amb.pat_id, amb.pat_enc_csn_id, amb.contact_date, amb.enc_visit_type,
    loc.loc_name, dept.department_name, amb.chief_complaint, amb.presenting_complaint
;
```

---

## 5. Community Treatment Order View

Source: Epic Orders.

```sql
CREATE OR REPLACE VIEW CI_ROI.REPORTING.VW_CI_ROI_COMMUNITY_TREATMENT_ORDERS AS
SELECT
    cto.pat_id                              AS patient_id,
    'CTO'                                   AS encounter_type,
    cto.order_id::VARCHAR                   AS encounter_id,
    cto.start_date::DATE                    AS encounter_date,
    NULL                                    AS facility,
    NULL                                    AS chief_complaint,
    NULL                                    AS presenting_complaint,
    NULL                                    AS diagnoses,
    NULL                                    AS disposition,
    OBJECT_CONSTRUCT(
        'ctoFlag',      TRUE,
        'ctoStartDate', cto.start_date,
        'ctoEndDate',   cto.end_date
    )                                       AS detail_json
FROM EPIC_CLARITY.DBO.ORDER_PROC cto
WHERE cto.order_type_c = '<CTO_ORDER_TYPE>'  -- Community Treatment Order type code
;
```

**Notes:**
- `ctoFlag` is always TRUE in this view since its existence implies a CTO is/was in place.
- `encounter_date` uses `start_date` so the 3-year lookback filter captures CTOs that started within the window.

---

## 6. Current Mental Health Diagnoses View

Source: Epic Clinical Documentation (Problem List).

```sql
CREATE OR REPLACE VIEW CI_ROI.REPORTING.VW_CI_ROI_CURRENT_DIAGNOSES AS
SELECT
    pl.pat_id                               AS patient_id,
    'CURRENT_DIAGNOSIS'                     AS encounter_type,
    pl.problem_list_id::VARCHAR             AS encounter_id,
    pl.date_of_entry::DATE                  AS encounter_date,
    NULL                                    AS facility,
    NULL                                    AS chief_complaint,
    NULL                                    AS presenting_complaint,
    edg.dx_name                             AS diagnoses,
    NULL                                    AS disposition,
    OBJECT_CONSTRUCT(
        'code',          icd.code,
        'description',   edg.dx_name,
        'diagnosedDate', pl.date_of_entry,
        'status',        CASE pl.problem_status_c
                             WHEN 1 THEN 'Active'
                             WHEN 2 THEN 'Resolved'
                             WHEN 3 THEN 'Inactive'
                             ELSE 'Unknown'
                         END
    )                                       AS detail_json
FROM EPIC_CLARITY.DBO.PROBLEM_LIST pl
JOIN EPIC_CLARITY.DBO.CLARITY_EDG edg
    ON pl.dx_id = edg.dx_id
LEFT JOIN EPIC_CLARITY.DBO.EDG_CURRENT_ICD10 icd
    ON edg.dx_id = icd.dx_id
WHERE pl.problem_status_c IN (1, 2, 3)      -- Active, Resolved, Inactive
-- Optional: filter to mental health / addiction ICD-10 codes (F-block)
-- AND icd.code LIKE 'F%'
;
```

**Notes:**
- The data model notes that it is TBD whether to filter to only mental health / addiction diagnoses. The `F%` ICD-10 filter is commented out and can be enabled once that decision is made.
- This is a current-state snapshot, not encounter-based. The `encounter_date` uses `date_of_entry` for the 3-year filter, but active diagnoses diagnosed before the window may still be clinically relevant. This filtering decision should be confirmed.

---

## Aggregate View

This view unions all entity views into a single queryable interface for the IBM Integration Engine.

```sql
CREATE OR REPLACE VIEW CI_ROI.REPORTING.VW_CI_ROI_AGGREGATE AS

SELECT patient_id, encounter_type, encounter_id, encounter_date,
       facility, chief_complaint, presenting_complaint, diagnoses,
       disposition, detail_json
FROM CI_ROI.REPORTING.VW_CI_ROI_EMS_INCIDENTS

UNION ALL

SELECT patient_id, encounter_type, encounter_id, encounter_date,
       facility, chief_complaint, presenting_complaint, diagnoses,
       disposition, detail_json
FROM CI_ROI.REPORTING.VW_CI_ROI_ED_VISITS

UNION ALL

SELECT patient_id, encounter_type, encounter_id, encounter_date,
       facility, chief_complaint, presenting_complaint, diagnoses,
       disposition, detail_json
FROM CI_ROI.REPORTING.VW_CI_ROI_INPATIENT_EPISODES

UNION ALL

SELECT patient_id, encounter_type, encounter_id, encounter_date,
       facility, chief_complaint, presenting_complaint, diagnoses,
       disposition, detail_json
FROM CI_ROI.REPORTING.VW_CI_ROI_AMBULATORY_VISITS

UNION ALL

SELECT patient_id, encounter_type, encounter_id, encounter_date,
       facility, chief_complaint, presenting_complaint, diagnoses,
       disposition, detail_json
FROM CI_ROI.REPORTING.VW_CI_ROI_COMMUNITY_TREATMENT_ORDERS

UNION ALL

SELECT patient_id, encounter_type, encounter_id, encounter_date,
       facility, chief_complaint, presenting_complaint, diagnoses,
       disposition, detail_json
FROM CI_ROI.REPORTING.VW_CI_ROI_CURRENT_DIAGNOSES
;
```

## Common Column Schema

| Column | Type | Description |
|--------|------|-------------|
| patient_id | VARCHAR | Epic EPI — filter key for patient-specific queries |
| encounter_type | VARCHAR | EMS_INCIDENT, ED_VISIT, INPATIENT, AMBULATORY, CTO, CURRENT_DIAGNOSIS |
| encounter_id | VARCHAR | Source system encounter/record identifier |
| encounter_date | DATE | Standardized date for 3-year lookback filtering |
| facility | VARCHAR | Facility name (NULL for CTOs and diagnoses) |
| chief_complaint | VARCHAR | Primary complaint/reason (NULL where not applicable) |
| presenting_complaint | VARCHAR | Brief presenting complaint (NULL where not applicable) |
| diagnoses | VARCHAR | Semicolon-delimited diagnosis names (or single diagnosis) |
| disposition | VARCHAR | Outcome/discharge disposition (NULL where not applicable) |
| detail_json | VARIANT | Entity-specific attributes as JSON — parsed by IBM Integration Engine |

## Open Items

1. **Mental health / addiction filter** — the data model notes it is TBD whether the CI RoI data product should filter to only encounters associated with a mental health or addiction diagnosis, presenting complaint, or chief complaint. If yes, a filter on ICD-10 F-block codes and/or complaint keyword matching would be applied at the individual view level or in the aggregate.

2. **ePCR patient crosswalk** — the `PATIENT_XREF` table mapping ePCR Siren identifiers to Epic EPI needs to be built or sourced. This is a prerequisite for the EMS view.

3. **Epic Clarity table/column names** — the SQL references standard Clarity table names. Actual table and column names should be validated against the local Epic Clarity data dictionary, as customizations may exist.

4. **Mental Health Act order type code** — the `order_type_c` value for Mental Health Act orders in ED and Inpatient views needs to be confirmed with the Connect Care team.

5. **CTO order type code** — the `order_type_c` for Community Treatment Orders needs to be confirmed.

6. **Discharge medication reconciliation action code** — the `rec_action_c` value for the IP Discharge Reconciliation event needs to be confirmed.

7. **Ambulatory encounter type codes** — the `enc_type_c` values that define ambulatory visits (vs. other encounter types) need to be confirmed.

## Related Documents

- [[Compassionate Intervention Release of Information Data Model]] — Entity definitions, attributes, and source system mapping
- [[CI RoI Snowflake SQL API Configuration]] — Snowflake infrastructure (warehouse, role, grants)
- [[CI RoI IBM Integration Engine Message Specification]] — How the Integration Engine queries and transforms the data
- [[CI RoI Sequence - CIP to IBM Integration Engine]] — Integration sequence diagram
