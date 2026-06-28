---
type: Data Model
title: "Compassionate Intervention Release of Information Data Model"
description: "The CI ROI data model centers on the CI Candidate entity, which aggregates healthcare encounters and clinical information from multiple source systems."
timestamp: 2026-06-26T19:19:07Z
---

The CI ROI data model centers on the CI Candidate entity, which aggregates healthcare encounters and clinical information from multiple source systems. 

|   |   |   |
|---|---|---|
|Entity|Definition|Source Systems|
|CI RoI Data Product|This data product aggregates the underlying data assets to filter and only supply the data elements specific to the CO RoI specifications|All listed below|
|CI Candidate Patient Demographics|Individual subject to CI application|Sent by the Ministry|
|EMS Incident|Pre-hospital emergency medical service event|ePCR Siren (Fall 2025+), ePCR Legacy Data Store|
|ED Visit|Emergency department encounter|Epic Clarity (ASAP module)|
|Inpatient Episode|Hospital admission with overnight stay|Epic Grand Central + ClinDoc|
|Ambulatory Encounter|Outpatient clinic or virtual visit|Epic Prelude + ClinDoc|
|Current Diagnoses|Clinical diagnosis (ICD-10-CA coded)|Epic Clinical Documentation|
|Community Treatment Order|Documents if there has been a CTO in place and when it started and ended.|Epic Orders|

Note that the hope would be to query existing views and then filter using the Compassionate Intervention Release of Information data product rules vs. having a dedicated for each of the views. 

Entities and Attributes 

 The following are the proposed entities and attributes that are currently envisioned in the Compassionate Intervention Release of Information initiative. 

Compassionate Intervention (CI) Release of Information (RoI) Data Product 

The CI RoI data product will be querying the generic encounter summaries and other data assets with a filter for the proposed candidate for the Compassionate Intervention program.  To be determined is still if there needs to be another filter for only those encounters that are associated with a Mental Health of Addiction diagnosis, presenting Complaint or chief complaint.  This data product will support the Compassionate Intervention RoI Tableau Wireframe (see image below) as an output port. It will also be the query that will become the CI RoI payload for the interface to the Compassionate Intervention application. 

CI Candidate Demographics 

The candidate's demographics will come from the incoming request from the Compassionate Intervention application. There will need to be a validation of the PHN to the supporting 'platinum fields' to ensure that the PHN matches before the Compassionate Intervention Release of Information three-year mental health summary can be released. 

|   |   |   |   |   |
|---|---|---|---|---|
|Attribute|Data Type|Description|Chronicles|Clarity|
|phn|Integer|Provincial Health Number|||
|familyName|Text|Candidate’s legal surname|||
|firstName|Text|Candidate’s given first name|||
|birthDate|Date|Date of birth (YYYY-MM-DD)|||
|gender|Text|Administrative gender|||
|address|Text|Current or last known address|||
|phoneNumber|Integer|Usually home, though increasingly most only have a mobile phone number.|||

EHS Incident Summary 

This data model reflects only the elements for the EMS incident summary that will be required for the Compassionate Intervention Release of Information. Of note is that for the three year summary, there will be a query of two underlying data assets. One for the view from the legacy version of ePCR Siren and the other for the new version of ePCR Siren being implemented early in 2026. 

|                               |           |                               |                                                                                              |                                                                                        |
| ----------------------------- | --------- | ----------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Attribute                     | Data Type | Description                   | Siren Field                                                                                  | Comment                                                                                |
| Patient ID                    |           | Needs to be MRN               |                                                                                              |                                                                                        |
| incidentDateTime              | DateTime  | Date and time of EMS response |                                                                                              |                                                                                        |
| Complaint                     |           |                               | [SirenDA].[DDM].[History > Patient > Complaints > Complaint}.[Complaint]                     |                                                                                        |
| Complaint Type                |           |                               | [SirenDA].[DDM].[History > Patient > Complaints > Complaint}.[Complaint Type]                |                                                                                        |
| Mental Health Symptom         |           |                               | [SirenDA].[DDM].[History > Symptoms].[Mental Health]                                         |                                                                                        |
| Medical/Surgical History      |           |                               | [SirenDA].[DDM].[History > Patient > Past Medical History > Medical / Surgical History].Item |                                                                                        |
| Care Plan Impression Item     |           |                               | [SirenDA].[DDM].[Care Plan > Impressions].[Item]                                             |                                                                                        |
| Care Plan Impressions Detail  |           |                               | [SirenDA].[DDM].[Care Plan > Impressions].[Details]                                          |                                                                                        |
| Procedures                    |           |                               | [SirenDA].[DDM].[AssessPlan > Procedures >                                                   | This one will be interesting as each treatment has it's own table and varying options. |
| Alerts                        |           |                               | [SirenDA].[DDM].[History > Alerts].[Alerts]                                                  | specifically for filtering on Form 1, and Form 10                                      |
| Current Medications           |           |                               | [SirenDA].[DDM].[History > Patient > Current Medications].[Item]                             | May be better to come from Connect Care                                                |
| Cause of Injury               |           |                               | [SirenDA].[DDM].[History > Trauma > Cause of Injury >                                        | This one will be like treatments as multiple tables                                    |
| Intent of Injury              |           |                               | [SirenDA].[DDM].[History > Trauma > Intent of Injury >                                       | This one will be like treatments as multiple tables                                    |
| Alcohol / Drug Use Indicators |           |                               | [SirenDA].[DDM].[ABCD > Scene Findings].[Alcohol / Drug Use Indicators]                      |                                                                                        |
| Barriers to Patient Care      |           |                               | [SirenDA].[DDM].[ABCD > Scene Findings].[Barriers to Patient Care]                           |                                                                                        |
|                               |           |                               |                                                                                              |                                                                                        |

ED Visit Summary 

The Emergency Department Visit will be a query of all visits for that particular ULI. This data model reflects only the elements for the Emergency Department Visit Summary that will be required for the Compassionate Intervention Release of Information. 

|   |   |   |   |   |
|---|---|---|---|---|
|Attribute|Data Type|Description|Chronicles|Clarity|
|arrivalDateTime|DateTime|Arrival timestamp|EPT 10820  <br><br>EPT 10815|F_ED_ENCOUNTERS.ADT_ARRIVAL_DTTM|
|chiefComplaint|String|Presenting complaint at triage or ‘reason for visit’|EPT 18100 line 1|F_ED_ENCOUNTERS.FIRST_CHIEF_COMPLAINT_ID <br><br>CL_RSN_FOR_VISIT.REASON_VISIT_NAME|
|ctasLevel|Integer|Canadian Triage and Acuity Scale (1-5)|EPT 410|F_ED_ENCOUNTERS.ACUITY_LEVEL_C|
|departureDateTime|DateTime|Discharge/transfer timestamp|EPT 49020 <br><br>EPT 49025|F_ED_ENCOUNTERS.ED_DEPARTURE_DTTM|
|diagnoses|List|ED diagnoses|EPT 18400 <br><br>EPT18465|PAT_ENC_DX.DX_ID <br><br>PAT_ENC_DX.DX_ED_YN <br><br>CLARITY_EDG.DX_NAME|
|disposition|Text|This field will show if patient left against medical advice.|||
|encounterId|String|Epic CSN or equivalent|EPT 8|F_ED_ENCOUNTERS.PAT_ENC_CSN_ID|
|encounterType|String|Always ED|||
|facility|String|ED facility name|Link to EAF from ADT 50 (department)|F_ED_ENCOUNTERS.FIRST_EMERGENCY_DEPARTMENT_ID for ED visits and F_ED_ENCOUNTER.LAST_DEPARTMENT_ID for UCC visits|
|MentalHealthActOrder|Y/N|Yes if this order was placed|||
|presentingComplaint|String|Brief presenting complaint from patient|||

Inpatient Visit Summary 

 The Inpatient Visit will be a query of all visits for that particular ULI. This data model reflects only the elements for the Inpatient Visit Summary that will be required for the Compassionate Intervention Release of Information. 

|   |   |   |   |   |
|---|---|---|---|---|
|Attribute|Data Type|Description|Chronicles|Clarity|
|admitDateTime|DateTime|Admission timestamp|EPT 18850, EPT 18851 EPT 10290, EPT 10291|PAT_ENC_HSP.HOSP_ADMSN_TIME PAT_ENC_HSP.INP_ADM_DATE|
|chiefComplaint|Text|This is ‘Reason for Visit’|EPT 10150||
|department|String|Nursing unit or ward|ADT 50|CLARITY_ADT.DEPARTMENT_ID|
|diagnoses|List|Admission/discharge diagnoses|LPL 100|PROBLEM_LIST.DX_ID|
|dischargeDateTime|DateTime|Discharge timestamp (null if current)|EPT 18855, EPT 18856|PAT_ENC_HSP.HOSP_DISCH_TIME|
|dischargeMedications|ListString[]|Medications at discharge|IEV 1020, from IP Discharge Reconciliation event|IP_ORDER_REC.REC_ACTION_C|
|disposition|Text|Contains “Leaving against medical advice” as one of the options|||
|encounterId|String|Epic HAR or equivalent|EPT 8|PAT_ENC_HSP.PAT_ENC_CSN_ID|
|encounterType|String|Always Inpatient|||
|facility|String|Admitting facility|Link to EAF from ADT 50 (department)|CLARITY_LOC|
|lengthOfStayDays|Integer|Calculated LOS in days|EPT 10595|LENGTH_OF_STAY.LENGTH_OF_STAY_DAYS|
|mentalHealthActOrder|Y/N|Yes if this order was placed|||

Ambulatory Visit Summary 

The Ambulatory Visit will be a query of all visits for that particular ULI. This data model reflects only the elements for the Emergency Department Visit Summary that will be required for the Compassionate Intervention Release of Information. 

|   |   |   |   |   |
|---|---|---|---|---|
|Attribute|Data Type|Description|Chronicles|Clarity|
|chiefComplaint|String|Reason for visit|||
|department|String|External ambulatory department name|||
|diagnoses|List|Visit diagnoses|||
|encounterId|String|Encounter identifier|||
|encountervisitType|String|In-person, Virtual, Phone|||
|facility|String|Clinic/facility name|||
|presentingComplaint|String|Brief presenting complaint|||
|serviceDateTime|DateTime|Appointment date/time|||

Community Treatment Order 

|   |   |   |   |   |
|---|---|---|---|---|
|Attribute|Data Type|Description|Chronicles|Clarity|
|ctoEnd Date|Date|End Date|||
|ctoFlag|Yes/No|There is only a flag if they exist vs. does not.|||
|ctoStart Date|Date|Start Date|||

Current Mental Health Diagnoses 

As a current state snapshot of active diagnosis the following table and attributes are being proposed. 

|   |   |   |   |   |
|---|---|---|---|---|
|Attribute|Data Type|Description|Chronicles|Clarity|
|code|String|ICD-10-CA code|||
|description|String|Diagnosis description|||
|diagnosedDate|Date|Date of diagnosis|||
|status|String|Active, Resolved, Inactive|||