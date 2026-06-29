---
type: Logical Data Model
title: STI Flowsheet Logical Data Model
description: Logical data model (DBML) of the six exported Epic Connect Care STI flowsheets and the NDR reporting bridge, covering 1,744 catalogued fields.
tags:
  - logical-data-model
  - sti
  - communicable-disease
  - connect-care
  - ndr
timestamp: 2026-06-22T00:00:00Z
---
> **Purpose:** Model the Epic Connect Care flowsheet structure for STI clinical documentation, covering all 6 exported flowsheets and the data elements required for Notifiable Disease Report (NDR) submission.
>
> **Modeled by:** Alec Blair / Stealth EA — May 2026
> **Tool:** dbdiagram.io (DBML syntax)
> **Coverage:** 132 Record IDs explicitly referenced (verified against source); 1,744 total fields catalogued via `flowsheet_row` + `flowsheet_template_row`

## Source Flowsheets

| FLT ID | Flowsheet Name | Fields | Export Date |
|---|---|---|---|
| 790 | STI Notification | 417 | 2026-04-20 |
| 792 | Syphilis History | 438 | 2026-04-20 |
| 793 | Sexual Contacts | 603 | 2026-04-20 |
| 2101000028 | STI Clinic Visit | 114 | 2026-04-20 |
| 795 | HIV Case Report | 86 | 2026-04-20 |
| 21030147 | PNN Test Treat | 86 | 2026-04-20 |

## References

- NDR Manual Edition 9 (February 2019), Alberta Health
- Public Health Act RSA 2000 c P-37
- Communicable Diseases Regulation

---

## DBML Model

The model is organized in three layers: core Epic flowsheet metadata, flattened clinical tables (one per flowsheet), and NDR reporting bridge / disease reference tables.

### Core Epic Flowsheet Metadata

```dbml
Table flowsheet_template {
  flowsheet_template_id varchar [pk, note: 'Epic FLT ID (e.g., 790, 792)']
  template_name varchar [not null, note: 'Human-readable flowsheet name']
  record_count int [note: 'Number of flowsheet rows/fields in the template']
  export_date date [note: 'Date of Epic FLO export']
  import_spec varchar [note: 'Epic import specification identifier']
  Note: '''
    Master record for each Epic flowsheet template.
    Each template is a distinct clinical documentation form used in
    STI/CD case investigation workflows within Connect Care.

    Source: Epic FLO export info sheets
  '''
}

Table flowsheet_row {
  record_id varchar [pk, note: 'Epic flowsheet row Record ID (e.g., 52270)']
  record_name varchar [not null, note: 'Epic internal record name (R AHS AMB PPH...)']
  display_name varchar [not null, note: 'User-facing field label shown in flowsheet']
  record_state varchar [note: '0=Original, 1=Overridden, 2=Compiled']
  row_type varchar [not null, note: '1=Data, 2=Group, 3=Custom Formula, 4=Extension']
  value_type varchar [not null, note: 'Custom List | String Type | Date | Category Type | Numeric Type']
  unit varchar [note: 'Unit of measure for numeric fields']
  decimal_places int [note: 'Precision for numeric values']
  min_value decimal [note: 'Minimum valid value (numeric fields)']
  max_value decimal [note: 'Maximum valid value (numeric fields)']
  multi_select boolean [note: 'Whether multiple selections are allowed']
  copy_forward boolean [note: 'Whether value copies to subsequent encounters']
  cross_encounter boolean [note: 'Whether value pulls from prior encounters']
  cross_encounter_interval varchar [note: 'Interval for cross-encounter copy']
  duplicatable boolean [note: 'Whether row can be duplicated within encounter']
  storage_context varchar [note: 'Epic storage context for the data element']
  external_id_type varchar [note: 'External identifier type (e.g., LOINC, SNOMED)']
  external_id varchar [note: 'External identifier value']
  sex_filter varchar [note: 'Sex-based display filter (F, M, U, X, NB)']
  minimum_age int [note: 'Minimum patient age for display']
  maximum_age int [note: 'Maximum patient age for display']
  description text [note: 'Row description / clinical guidance']
  retired boolean [default: false, note: 'Whether the row has been retired']
  Note: '''
    Individual data capture field within an Epic flowsheet.
    Each row represents one clinical data element (question/observation)
    that investigators or clinicians document during STI case management.

    Source: Epic FLO export columns A-K, O-Q + metadata columns
  '''
}

Table flowsheet_template_row {
  flowsheet_template_id varchar [ref: > flowsheet_template.flowsheet_template_id]
  record_id varchar [ref: > flowsheet_row.record_id]
  ordinal int [note: 'Display order within the flowsheet']
  required_status varchar [note: 'Required | Recommended | blank']
  Note: '''
    Junction table linking flowsheet rows to templates.
    A single row (e.g., Ethnicity, record 52229) can appear in
    multiple flowsheet templates.
  '''

  indexes {
    (flowsheet_template_id, record_id) [pk]
  }
}
```

### Cascading / Conditional Logic

```dbml
Table cascading_rule {
  cascading_rule_id int [pk, increment]
  parent_record_id varchar [ref: > flowsheet_row.record_id, note: 'Row whose value triggers the cascade']
  child_record_id varchar [ref: > flowsheet_row.record_id, note: 'Row that becomes visible/required']
  comparison_operator varchar [note: 'Equal | NotEqual | GreaterThan | etc.']
  comparison_value varchar [note: 'Value that triggers the cascade']
  condition_group varchar [note: 'Group ID for AND/OR logic combinations']
  evaluation_logic varchar [note: 'AND | OR — how conditions in a group combine']
  cascading_method varchar [note: 'How the child row is shown/hidden']
  jump_logic_done_with_group boolean [note: 'Whether cascade ends at group boundary']
  Note: '''
    Defines conditional display logic between flowsheet rows.
    Example: Ethnicity = "Other" cascades to show "Other (specify)" text field.
    Example: Lives on Reserve = "Yes" cascades to "Name of First Nations Community".

    Source: Epic FLO export cascading condition columns (82-94)
  '''
}
```

### Value Sets (Custom Lists / Category Types)

```dbml
Table value_set {
  value_set_id int [pk, increment]
  record_id varchar [ref: > flowsheet_row.record_id, note: 'Flowsheet row this value set belongs to']
  value_set_name varchar [note: 'Descriptive name for the value set']
  Note: '''
    Container for enumerated value options associated with
    Custom List or Category Type flowsheet rows.
  '''
}

Table value_set_item {
  value_set_item_id int [pk, increment]
  value_set_id int [ref: > value_set.value_set_id]
  item_value varchar [not null, note: 'Display value (e.g., "Chlamydia Trachomatis")']
  internal_id varchar [note: 'Epic internal ID for the list item']
  ordinal int [note: 'Display order']
  is_abnormal boolean [note: 'Whether this value flags as abnormal']
  patient_friendly_name varchar [note: 'MyChart-facing label']
  hide_from_patient boolean [note: 'Whether hidden in patient portal']
  Note: '''
    Individual selectable value within a custom list.

    Source: Epic FLO export column 96 (Custom Cat List) +
    subsequent rows without Record IDs
  '''
}
```

---

### STI Notification (FLT 790)

Captures the core STI notification data for NDR submission. NDR Sections covered: 1 (Personal Identifiers), 2 (Disease Descriptors), 3 (Immigration/Travel), 5 (Non-Enterics: Social Behaviours).

```dbml
Table sti_notification {
  notification_id int [pk, increment, note: 'Surrogate key']
  episode_id varchar [note: 'Compass Rose Episode ID linking to CD Abstract']
  patient_id varchar [note: 'Connect Care patient identifier (MRN/PHN)']
  encounter_id varchar [note: 'Epic encounter (CSN) where documented']
  flowsheet_template_id varchar [default: '790', ref: > flowsheet_template.flowsheet_template_id]
  documented_datetime datetime [note: 'When the flowsheet was filed']
  documented_by varchar [note: 'User who documented (PHI, MOH, clinician)']

  // --- Break the Glass ---
  btg_notification boolean [note: 'R57740: Is this a Notification (Requires BTG)']

  // --- NDR Section 1: Personal Identifiers ---
  notifiable_infection varchar [note: 'R52270: Chlamydia|Gonorrhea|NGU|MPC|Syphilis|Chancroid|LGV']
  ethnicity varchar [note: 'R52229: Ethnic group per NDR S1']
  ethnicity_other varchar [note: 'R52232: Free text if ethnicity = Other']
  country_of_birth varchar [note: 'R52266: Country of birth (Category)']
  arrival_date_canada date [note: 'R52267: Date of arrival in Canada']
  lives_on_reserve varchar [note: 'R52223: Yes/No — NDR S1 mandatory']
  first_nations_community varchar [note: 'R52543: Name of reserve (cascades from lives_on_reserve=Yes)']
  reserve_other varchar [note: 'R53337: Free text if reserve = Other']
  homeless_at_diagnosis varchar [note: 'R58822: Homeless at time of diagnosis']

  // --- Pregnancy ---
  pregnant varchar [note: 'R52225: Pregnant (Test of Cure Recommended)']
  edd date [note: 'R52226: Expected Date of Delivery']
  postnatal varchar [note: 'R52227: Post natal (<=6 weeks)']
  delivery_date date [note: 'R52228: Delivery Date']

  // --- NDR Section 2: Disease Descriptors ---
  reason_for_visit varchar [note: 'R52471: STI Screening|Symptoms|Contact|Pre/Postnatal|Sexual Assault']
  reason_other varchar [note: 'R52473: Free text if reason = Other']
  symptomatic varchar [note: 'R50606: Yes/No/Unknown']
  symptom_duration varchar [note: 'R50613: Duration description']
  complications varchar [note: 'R52238: PID|Epididymo-Orchitis|Other']

  // --- Clinical Symptoms ---
  dysuria varchar [note: 'R2101002491: Yes/No/Unknown/Declined/Excluded']
  dysuria_duration varchar [note: 'R2101002492: Duration/Description']
  rectal_symptoms varchar [note: 'R2101002496: Yes/No/Unknown/Declined/Excluded']
  rectal_duration varchar [note: 'R2101002497: Duration/Description']
  chancre varchar [note: 'R21015000063: Yes/No/Unknown/Declined/Excluded']
  chancre_duration varchar [note: 'R50652: Duration/Description']
  urethral_discharge varchar [note: 'R2101002543: Yes/No/Unknown']
  urethral_discharge_duration varchar [note: 'R2101002507: Duration/Description']
  abnormal_vaginal_discharge varchar [note: 'R2101002541: Yes/No/Unknown']
  vaginal_discharge_duration varchar [note: 'R2101002499: Duration/Description']
  rash varchar [note: 'R21015000065: Yes/No/Unknown/Declined/Excluded']
  rash_duration varchar [note: 'R52547: Duration/Description']

  // --- NDR Section 5: Social Behaviours/Risk Factors ---
  injection_drug_user varchar [note: 'R2101600300: Yes/No/Unknown — NDR S5 social behaviours']
  sex_with_select_all varchar [note: 'R2102600030: Multi-select partner gender/sex']
  sex_with_idu varchar [note: 'R2101600059: Sex with injection drug user']
  sex_worker varchar [note: 'R2101600061: Yes/No/Unknown']
  patron_of_sex_worker varchar [note: 'R2101600062: Yes/No/Unknown']
  anonymous_partners varchar [note: 'R2101600063: Yes/No/Unknown']

  // --- Treatment ---
  treatment_prescribed varchar [note: 'Treatment regimen prescribed']
  treatment_date date [note: 'Date treatment administered']

  Note: '''
    Flattened representation of the STI Notification flowsheet (FLT 790).
    This is the primary flowsheet for documenting notifiable STI cases
    and maps directly to NDR Sections 1, 2, 3, and 5.

    417 Epic flowsheet rows; key fields shown here.
    Record IDs reference flowsheet_row.record_id for full metadata.

    Source: STI Notification_Full export.xlsx
    NDR Reference: NDR Manual Edition 9, Sections 1-3, 5
  '''
}
```

### Syphilis History (FLT 792)

Extended clinical documentation for syphilis cases including staging, serology history, treatment history, and pregnancy-specific data.

```dbml
Table syphilis_history {
  syphilis_history_id int [pk, increment]
  episode_id varchar [note: 'Compass Rose Episode ID']
  patient_id varchar
  encounter_id varchar
  flowsheet_template_id varchar [default: '792', ref: > flowsheet_template.flowsheet_template_id]
  documented_datetime datetime
  documented_by varchar

  // --- Break the Glass ---
  btg_notification boolean [note: 'R56565: Is this a Notification (BTG)']

  // --- Locating Information ---
  other_locating_info varchar [note: 'R52286: Facebook, email, etc.']

  // --- Pregnancy/Reproductive ---
  pregnant varchar [note: 'R52633']
  edd date [note: 'R52634']
  date_last_menstrual_period date [note: 'R52287']
  pregnancy_delivery_loss_past_year varchar [note: 'R52288']
  pregnancy_outcome_past_year varchar [note: 'R52289']
  date_delivery_past_year date [note: 'R52290']

  // --- Immigration ---
  location_immigration_medical varchar [note: 'R52347']
  country_of_birth varchar [note: 'R52266']
  arrival_date_canada date [note: 'R52267']
  lives_on_reserve varchar [note: 'R52223']

  // --- Reason for Visit ---
  reason_for_visit varchar [note: 'R52348: Screening|Symptoms|Contact|Prenatal|Immigration Medical|etc.']
  reason_other varchar [note: 'R52357']

  // --- Syphilis-Specific Clinical ---
  syphilis_symptoms varchar [note: 'R50654: Yes/No']
  symptom_duration varchar [note: 'R54707']
  chancre varchar [note: 'R21015000063']
  chancre_duration varchar [note: 'R50652']
  rash varchar [note: 'R21015000065']
  rash_duration varchar [note: 'R52547']
  alopecia varchar [note: 'R21015000066']
  alopecia_duration varchar [note: 'R52550']
  fever_malaise varchar [note: 'R21015000067']
  fever_malaise_duration varchar [note: 'R52552']
  lymphadenopathy varchar [note: 'R2101900530']
  lymphadenopathy_duration varchar [note: 'R52553']
  cns_symptoms varchar [note: 'R21015000069: Central Nervous System Symptoms']
  cns_specific_symptoms varchar [note: 'R21015000070: Specific CNS symptoms']
  cns_duration varchar [note: 'R52655']

  // --- Serology / Lab History ---
  // (438 rows include extensive serology tracking fields)
  // Modeled as child records in syphilis_serology_result

  // --- Drug Allergy ---
  drug_allergy varchar [note: 'R52240: Yes/No']
  drug_allergy_specify varchar [note: 'R52241']

  // --- Risk Factors ---
  injection_drug_user varchar [note: 'R2101600300']
  sex_with_select_all varchar [note: 'R2102600030']
  sex_with_idu varchar [note: 'R2101600059']
  sex_worker varchar [note: 'R2101600061']
  patron_of_sex_worker varchar [note: 'R2101600062']
  hiv_prep_last_12mo varchar [note: 'R52369']
  homeless_at_diagnosis varchar [note: 'R58822']

  // --- Partner Information ---
  anonymous_partners varchar [note: 'R2101600063']
  location_of_partner varchar [note: 'R50621']
  num_partners_2mo int [note: 'R2101600053']
  num_partners_12mo int [note: 'R2101600055']
  most_recent_sexual_contact varchar [note: 'R50876']
  most_recent_contact_date date [note: 'R50617']
  traceable_untraceable varchar [note: 'R2102600031']

  Note: '''
    Syphilis-specific extended clinical documentation (FLT 792).
    Captures staging, serology history, treatment regimens,
    pregnancy details, and CNS involvement.

    438 Epic flowsheet rows; this is the most complex STI flowsheet.
    Serology results tracked as child records.

    Source: Syphilis History_Full export.xlsx
    Clinical Reference: Syphilis Disease Management Guideline
  '''
}

Table syphilis_serology_result {
  serology_result_id int [pk, increment]
  syphilis_history_id int [ref: > syphilis_history.syphilis_history_id]
  test_type varchar [note: 'RPR|VDRL|FTA-ABS|TP-PA|EIA|CLIA']
  test_date date
  result_value varchar [note: 'Reactive|Non-Reactive|titre value']
  titre_value varchar [note: 'e.g., 1:2, 1:4, 1:8, 1:16, 1:32, 1:64']
  specimen_type varchar [note: 'Blood|CSF']
  lab_source varchar [note: 'ProvLab|Other']
  Note: '''
    Syphilis serology test results tracked over time.
    Critical for staging (primary, secondary, early latent, late latent,
    tertiary, neurosyphilis) and monitoring treatment response.

    Titre tracking (4-fold decline = treatment success) is a key
    clinical workflow requirement.
  '''
}
```

### Sexual Contacts (FLT 793)

Partner notification documentation — captures contact demographics, exposure details, and STICS referral status.

```dbml
Table sexual_contact {
  sexual_contact_id int [pk, increment]
  episode_id varchar [note: 'Compass Rose Episode ID of the source case']
  patient_id varchar [note: 'Source case patient ID']
  encounter_id varchar
  flowsheet_template_id varchar [default: '793', ref: > flowsheet_template.flowsheet_template_id]
  documented_datetime datetime
  documented_by varchar
  contact_sequence int [note: 'Contact number (1st, 2nd, 3rd, etc.)']

  // --- Break the Glass ---
  btg_notification boolean [note: 'R57743']

  // --- STICS Referral ---
  submit_to_stics varchar [note: 'R55945: Submit to STI Centralized Services Now']

  // --- Contact Identifying Information ---
  sti_type varchar [note: 'R52396: Which STI this contact relates to']
  first_name varchar [note: 'R52400']
  middle_name varchar [note: 'R52403']
  last_name varchar [note: 'R52401']
  legal_sex varchar [note: 'R52404: Female|Male']
  gender varchar [note: 'R52406: Category type — expanded gender options']
  date_of_birth date [note: 'R52410']
  address varchar [note: 'R52416']
  phone_cell varchar [note: 'R58607']
  social_media_contact varchar [note: 'R52418']

  // --- Contact Demographics ---
  ethnicity varchar [note: 'R52475']
  ethnicity_other varchar [note: 'R52476']

  // --- Exposure Details ---
  location_of_exposure varchar [note: 'R52440: Yes/No — exposure outside Alberta']
  exposure_location_detail varchar [note: 'R53055: If yes, where']

  // --- Contact relationship and sexual history fields ---
  // (603 rows include duplicatable partner blocks with up to 10 contacts)

  Note: '''
    Sexual contact / partner notification flowsheet (FLT 793).
    Captures partner demographics, exposure details, and referral
    to STICS (STI Centralized Services) for partner notification.

    This flowsheet is duplicatable — each contact is a separate
    instance within the encounter. 603 rows reflect the full
    field set across duplicated contact blocks.

    Source: Sexual Contacts_Full export.xlsx
    Workflow: Partner Notification Number (PNN) process
  '''
}
```

### STI Clinic Visit (FLT 2101000028)

Point-of-care clinical assessment during STI clinic encounters.

```dbml
Table sti_clinic_visit {
  clinic_visit_id int [pk, increment]
  episode_id varchar [note: 'Compass Rose Episode ID']
  patient_id varchar
  encounter_id varchar
  flowsheet_template_id varchar [default: '2101000028', ref: > flowsheet_template.flowsheet_template_id]
  documented_datetime datetime
  documented_by varchar

  // --- Site Information ---
  site_type varchar [note: 'R2101900500: Type of STI clinic site']
  specify_location varchar [note: 'R50601']

  // --- Clinical Assessment ---
  symptomatic varchar [note: 'R50606']
  duration varchar [note: 'R50613']
  last_void varchar [note: 'R50614']

  // --- Symptoms ---
  dysuria varchar [note: 'R2101002491']
  dysuria_duration varchar [note: 'R2101002492']
  sores_lesion_rash varchar [note: 'R2101002493']
  rectal_symptoms varchar [note: 'R2101002496']
  rectal_duration varchar [note: 'R2101002497']
  throat_symptoms varchar [note: 'R50615']
  abnormal_vaginal_discharge varchar [note: 'R2101002498']
  vaginal_itch_odor varchar [note: 'R2101002500']
  dyspareunia varchar [note: 'R2101002502']
  abdominal_pain varchar [note: 'R2101002504']

  // --- Syphilis Screen ---
  previously_positive_syphilis varchar [note: 'R2101900505']
  syphilis_symptoms varchar [note: 'R50654']
  syphilis_duration varchar [note: 'R54707']
  rash varchar [note: 'R21015000065']
  rash_duration varchar [note: 'R52547']

  // --- HIV Screen ---
  hiv_prep_last_12mo varchar [note: 'R50628']
  previously_positive_hiv varchar [note: 'R2101900515']
  hiv_diagnosis_date date [note: 'R2101900508']
  sex_with_hiv_positive varchar [note: 'R2101600057']

  // --- Sexual History / Risk Factors ---
  age_sexually_active int [note: 'R2101600048']
  sex_with_select_all varchar [note: 'R2102600030']
  type_of_sexual_activity varchar [note: 'R2102600004']
  history_sexual_assault varchar [note: 'R2102600011']
  sex_with_msm varchar [note: 'R2101600058']
  sex_with_idu varchar [note: 'R2101600059']
  injection_drug_user varchar [note: 'R2101600300']
  non_injection_drug_user varchar [note: 'R2101600301']
  bathhouse_patron varchar [note: 'R2101600302']
  sex_worker varchar [note: 'R2101600061']
  patron_of_sex_worker varchar [note: 'R2101600062']
  sex_outside_canada varchar [note: 'R2101600060']
  sex_outside_alberta varchar [note: 'R2101600064']
  countries varchar [note: 'R2101600065']

  // --- Partner Counts ---
  num_partners_2mo int [note: 'R2101600053']
  num_partners_6mo int [note: 'R2101600054']
  num_partners_12mo int [note: 'R2101600055']
  anonymous_partners varchar [note: 'R2101600063']
  location_of_partner varchar [note: 'R50621']
  body_part_of_partners varchar [note: 'R2102600005']

  // --- Sexual Contact History ---
  most_recent_sexual_contact varchar [note: 'R50876']
  most_recent_contact_date date [note: 'R50617']
  previous_sexual_contact varchar [note: 'R2102600033']
  previous_contact_date date [note: 'R50622']
  additional_contact_details varchar [note: 'R50625']

  // --- Clinical Findings ---
  other_findings_external varchar [note: 'R2101900542']
  other_findings_internal varchar [note: 'R2101900543']

  Note: '''
    STI Clinic Visit flowsheet (FLT 2101000028).
    Used during point-of-care clinical encounters at STI clinics.
    Captures presenting symptoms, sexual history, risk factors,
    clinical examination findings, and partner information.

    114 Epic flowsheet rows.
    Shares many risk factor fields with PNN Test Treat flowsheet.

    Source: STI Clinic Visit_Full export.xlsx
  '''
}
```

### HIV Case Report (FLT 795)

HIV-specific case reporting — maps to enhanced surveillance requirements and PHAC CTBRS reporting.

```dbml
Table hiv_case_report {
  hiv_case_report_id int [pk, increment]
  episode_id varchar [note: 'Compass Rose Episode ID']
  patient_id varchar
  encounter_id varchar
  flowsheet_template_id varchar [default: '795', ref: > flowsheet_template.flowsheet_template_id]
  documented_datetime datetime
  documented_by varchar

  // --- Break the Glass ---
  btg_notification boolean [note: 'R59421']

  // --- Report Type ---
  interprovincial_transfer varchar [note: 'R52557: Transfer from which province']
  lost_to_followup varchar [note: 'R52558']
  unable_to_contact varchar [note: 'R52559']
  new_case_report varchar [note: 'R52560: Yes/No']
  update_report varchar [note: 'R52561: Yes/No']

  // --- Demographics ---
  pregnant varchar [note: 'R52562']
  date_of_death date [note: 'R52563']
  fatal varchar [note: 'R52564']
  ethnicity varchar [note: 'R52229']
  country_of_birth varchar [note: 'R52266']
  arrival_date_canada date [note: 'R52267']
  lives_on_reserve varchar [note: 'R52962']
  first_nations_community varchar [note: 'R52963']
  reserve_other varchar [note: 'R53329']
  homeless_at_diagnosis varchar [note: 'R58822']

  // --- Immigration ---
  current_immigration_status varchar [note: 'R52566: Canadian citizen|Permanent Resident|etc.']
  immigration_status_other varchar [note: 'R52568']
  ircc_referral varchar [note: 'R52572: Referral from Immigration, Refugees and Citizenship Canada']

  // --- HIV-Specific Clinical ---
  // (80 HIV-specific fields covering CD4 counts, viral load,
  //  antiretroviral history, opportunistic infections, exposure category)
  heterosexual_contact varchar [note: 'R52576: Exposure category']

  Note: '''
    HIV Case Report flowsheet (FLT 795).
    Captures HIV-specific case reporting data including report type
    (new vs update), immigration status, exposure category,
    and clinical indicators (CD4, viral load, ART history).

    Maps to enhanced surveillance requirements and PHAC CTBRS
    national reporting. 86 Epic flowsheet rows.

    Source: HIV Case Report_Full export.xlsx
    Reporting: 48 hours to STI Director per NDR Reporting_Summary
  '''
}
```

### PNN Test & Treat (FLT 21030147)

Partner Notification Number — Test and Treat encounter documentation for contacts who present for testing/treatment after partner notification.

```dbml
Table pnn_test_treat {
  pnn_test_treat_id int [pk, increment]
  episode_id varchar [note: 'Compass Rose Episode ID']
  patient_id varchar
  encounter_id varchar
  flowsheet_template_id varchar [default: '21030147', ref: > flowsheet_template.flowsheet_template_id]
  documented_datetime datetime
  documented_by varchar

  // --- Site ---
  site_type varchar [note: 'R2101900500']
  specify_location varchar [note: 'R50601']

  // --- Reason ---
  reason_for_test_treat varchar [note: 'R21030155: Reason for Test and Treat Visit']
  reason_specify varchar [note: 'R21030156']

  // --- Clinical Assessment ---
  symptomatic varchar [note: 'R50606']
  duration varchar [note: 'R50613']
  last_void varchar [note: 'R50614']
  dysuria varchar [note: 'R2101002491']
  dysuria_duration varchar [note: 'R2101002492']
  sores_lesion_rash varchar [note: 'R2101002493']
  rectal_symptoms varchar [note: 'R2101002496']
  rectal_duration varchar [note: 'R2101002497']
  throat_symptoms varchar [note: 'R50615']
  abdominal_pain varchar [note: 'R2101002504']

  // --- Syphilis Screen ---
  previously_positive_syphilis varchar [note: 'R2101900505']
  syphilis_symptoms varchar [note: 'R50654']
  syphilis_duration varchar [note: 'R54707']
  rash varchar [note: 'R21015000065']
  rash_duration varchar [note: 'R52547']

  // --- HIV Screen ---
  hiv_prep_last_12mo varchar [note: 'R50628']
  previously_positive_hiv varchar [note: 'R2101900515']
  hiv_diagnosis_date date [note: 'R2101900508']
  sex_with_hiv_positive varchar [note: 'R2101600057']

  // --- Sexual History / Risk Factors ---
  // (shares identical field set with STI Clinic Visit)
  age_sexually_active int [note: 'R2101600048']
  sex_with_select_all varchar [note: 'R2102600030']
  type_of_sexual_activity varchar [note: 'R2102600004']
  history_sexual_assault varchar [note: 'R2102600011']
  sex_with_msm varchar [note: 'R2101600058']
  sex_with_idu varchar [note: 'R2101600059']
  injection_drug_user varchar [note: 'R2101600300']
  non_injection_drug_user varchar [note: 'R2101600301']
  bathhouse_patron varchar [note: 'R2101600302']
  sex_worker varchar [note: 'R2101600061']
  patron_of_sex_worker varchar [note: 'R2101600062']
  sex_outside_canada varchar [note: 'R2101600060']
  sex_outside_alberta varchar [note: 'R2101600064']
  countries varchar [note: 'R2101600065']

  // --- Partner Counts ---
  num_partners_2mo int [note: 'R2101600053']
  num_partners_6mo int [note: 'R2101600054']
  num_partners_12mo int [note: 'R2101600055']
  anonymous_partners varchar [note: 'R2101600063']
  location_of_partner varchar [note: 'R50621']
  body_part_of_partners varchar [note: 'R2102600005']

  // --- Sexual Contact History ---
  most_recent_sexual_contact varchar [note: 'R50876']
  most_recent_contact_date date [note: 'R50617']
  previous_sexual_contact varchar [note: 'R2102600033']
  previous_contact_date date [note: 'R50622']
  additional_contact_details varchar [note: 'R50625']

  Note: '''
    PNN Test & Treat flowsheet (FLT 21030147).
    Documents clinical encounters for contacts who present
    after partner notification (PNN). Nearly identical field set
    to STI Clinic Visit but adds "Reason for Test and Treat Visit".

    86 Epic flowsheet rows.

    Source: PNN Test Treat_Full export.xlsx
    Workflow: Follows from Sexual Contacts → STICS referral → PNN
  '''
}
```

---

### NDR Reporting Bridge

Maps flowsheet data elements to NDR form sections and fields. Enables traceability from clinical documentation to regulatory submission.

```dbml
Table ndr_field_mapping {
  mapping_id int [pk, increment]
  ndr_section varchar [not null, note: 'NDR section (1-7)']
  ndr_field_name varchar [not null, note: 'NDR field name (e.g., "Ethnic Group", "Symptomatic")']
  ndr_reporting_requirement varchar [note: 'Mandatory | Conditional']
  record_id varchar [ref: > flowsheet_row.record_id, note: 'Flowsheet row that captures this data']
  flowsheet_template_id varchar [ref: > flowsheet_template.flowsheet_template_id]
  transformation_notes text [note: 'How flowsheet value maps to NDR value (if not 1:1)']
  Note: '''
    Crosswalk between Epic flowsheet data elements and NDR form fields.
    Enables automated or semi-automated NDR generation from flowsheet data.

    Key mappings:
      NDR S1 Ethnic Group     <- R52229 Ethnicity
      NDR S1 Lives on Reserve <- R52223 Lives on Reserve
      NDR S1 Pregnant         <- R52225 / R52633 / R52562
      NDR S2 Symptomatic      <- R50606 Symptomatic
      NDR S2 Disease Name     <- R52270 Notifiable Infections
      NDR S3 Arrival in Canada<- R52267 Arrival Date in Canada
      NDR S5 Social Behaviours<- R2101600300 IDU, R2101600061 Sex Worker, etc.

    Source: NDR Manual Edition 9, Appendix C: Mandatory Field Reporting Matrix
  '''
}
```

### Disease Reference Data

```dbml
Table disease_reference {
  disease_code varchar [pk, note: 'Internal code (e.g., CHLAMYDIA, GONORRHEA, SYPHILIS)']
  disease_name varchar [not null]
  category_code varchar [ref: > disease_category.category_code]
  icd10_ca_code varchar [note: 'ICD-10-CA code for NDR reporting']
  confirmed_case_definition text
  probable_case_definition text
  outbreak_definition text
  outbreak_closure_criteria text
  reporting_timeline varchar [note: '48 hours | FMP | 24 hours | 48 hours to STI Director']
  fmp_required boolean [note: 'Whether Fastest Means Possible notification is required']
  reports_to varchar [note: 'STI Director | CMOH | Alberta Health']
  source_document varchar [note: 'Disease management guideline filename']
  Note: '''
    Master reference table for notifiable diseases.
    STI-relevant entries: Chlamydia, Gonorrhea, Syphilis (inc. Congenital),
    NGU, MPC, Chancroid, LGV, HIV.

    All STIs report to STI Director within 48 hours.

    Source: Communicable Disease Outbreak Definitions.xlsx (Disease_Reference sheet)
    Legal: Communicable Diseases Regulation, Public Health Act RSA 2000 c P-37
  '''
}

Table disease_category {
  category_code varchar [pk, note: 'e.g., STI, BLOODBORNE, CONGENITAL']
  category_name varchar [not null, note: 'e.g., Sexually Transmitted Infections']
  disease_count int
  Note: '''
    Disease classification categories.
    STI category (7 diseases): Chlamydia, Gonorrhea, Syphilis,
    Chancroid, LGV, NGU, MPC.
    HIV is classified under BLOODBORNE (5 diseases).
    Congenital Syphilis is under CONGENITAL (7 diseases).
  '''
}
```

---

## Relationships

```dbml
Ref: sti_notification.episode_id - syphilis_history.episode_id
Ref: sti_notification.episode_id < sexual_contact.episode_id
Ref: sti_notification.patient_id - hiv_case_report.patient_id
Ref: sexual_contact.episode_id < pnn_test_treat.episode_id
```

---

## Shared Field Reuse Analysis

The following Record IDs appear across multiple flowsheet templates, confirming they are shared SmartData Elements (SDEs) deployed for data consistency and cross-flowsheet querying in Clarity/Caboodle:

| Record ID | Display Name | Flowsheets |
|---|---|---|
| R52229 | Ethnicity | STI Notification, Syphilis History, HIV Case Report |
| R52266 | Country of Birth | STI Notification, Syphilis History, HIV Case Report |
| R52267 | Arrival Date Canada | STI Notification, Syphilis History, HIV Case Report |
| R52223 | Lives on Reserve | STI Notification, Syphilis History |
| R58822 | Homeless at Diagnosis | STI Notification, Syphilis History, HIV Case Report |
| R50606 | Symptomatic | STI Notification, STI Clinic Visit, PNN Test Treat |
| R50654 | Syphilis Symptoms | Syphilis History, STI Clinic Visit, PNN Test Treat |
| R21015000065 | Rash | STI Notification, Syphilis History, Clinic Visit, PNN |
| R52547 | Rash Duration | STI Notification, Syphilis History, Clinic Visit, PNN |
| R2101600300 | IDU | All (except HIV Case Report) |
| R2102600030 | Sex with (all) | Syphilis History, STI Clinic Visit, PNN Test Treat |
| R2101600061 | Sex worker | All (except HIV Case Report) |
| R50876 | Most Recent Contact | Syphilis History, STI Clinic Visit, PNN Test Treat |
| R2101600053 | Partners 2mo | Syphilis History, STI Clinic Visit, PNN Test Treat |
| R2101600055 | Partners 12mo | Syphilis History, STI Clinic Visit, PNN Test Treat |

---

## Design Notes

- **STI Clinic Visit and PNN Test Treat** share nearly identical field sets (same Record IDs for risk factors, sexual history, symptoms). Could be modeled as a single table with a discriminator column if desired.
- **Sexual Contacts** (603 rows) largely reflects duplicatable contact blocks — modeled as a single table with `contact_sequence`.
- **Flattened tables** surface clinically significant fields; the full 1,744-field catalog is accessible via `flowsheet_row` + `flowsheet_template_row`.
- The `.dbml` source file for dbdiagram.io is co-located at `STI/sti_flowsheet_logical_model.dbml`.
