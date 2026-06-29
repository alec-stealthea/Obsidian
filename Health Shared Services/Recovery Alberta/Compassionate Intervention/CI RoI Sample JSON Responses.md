---
type: Interface Specification
title: "CI RoI Sample JSON Responses"
description: "Sample CIP webhook payloads — one per test patient — generated from CI - Connect Care Sample Report Jan 14 2026.xlsx, formatted per the payload structure in CI RoI IBM Integration Engine Message Sp..."
timestamp: 2026-06-26T19:19:07Z
---
# CI RoI Sample JSON Responses

Sample CIP webhook payloads — one per test patient — generated from **CI - Connect Care Sample Report Jan 14 2026.xlsx**, formatted per the payload structure in [[CI RoI IBM Integration Engine Message Specification]] and the entity attributes in [[Compassionate Intervention Release of Information Data Model]].

## How these were built

- **Three test patients** per the workbook Read Me: David Tasselhoff (IP), Albert Amh (AMB), Kinder Sharpie (ED).
- **ED reassignment:** The ED Visit Summary sheet contained rows for 11 other PAT_IDs and none for Z32030. The extract was evidently not filtered to the test patient, so all 11 distinct ED encounters were reassigned to Kinder Sharpie (decision 2026-06-10). The original PAT_IDs are recorded in her section for traceability.
- **EHS incidents are synthetic.** The workbook has no EHS data (APH Incidents sheet is empty); incidents use the new EHS Incident Summary attributes from the data model (Siren fields: complaint, complaint type, mental health symptom, impressions, procedures, alerts, cause/intent of injury, alcohol/drug use indicators, barriers to care).
- **EHS ↔ ED correlation:** incidents correlate via `emergencyCSN` (= ED `encounterId`), `destinationFacility` (= ED `facility`), and `incidentDateTime` 40-60 minutes before `arrivalDateTime`.
- **Synthetic identifiers:** PHNs (9-prefixed), requestId/releaseId/disclosureLogRef are fabricated.
- **totalEncounters** counts EHS + ED + inpatient + ambulatory encounters (CTOs and current diagnoses are not encounters).
- **summaryPeriod** is the per-request information window supplied by CIP; widened where needed so older sample rows stay in window — noted per patient.

## EHS → ED correlation map (all Z32030)

| EHS Incident | Incident Time | ED Arrival | Facility | Scenario |
|---|---|---|---|---|
| EHS-2025-118734 | 2025-12-18 09:12 | 2025-12-18 09:53 (Ground Ambulance) | UAH | Opioid overdose, naloxone response, Form 10 |
| EHS-2025-118512 | 2025-12-17 15:08 | 2025-12-17 15:57 | Sturgeon | Suicidal ideation, Form 10 |
| EHS-2025-118390 | 2025-12-16 12:38 | 2025-12-16 13:25 (CTAS 2) | Mineral Springs | Meth-induced psychosis, Form 1 |
| EHS-2025-118366 | 2025-12-16 11:04 | 2025-12-16 11:46 | Wetaskiwin | Abdominal pain, alcohol use disorder |

---

## Z9348 — David Tasselhoff — Inpatient test patient

- Single inpatient episode from the workbook (9 problem-list diagnoses; principal = COPD with acute exacerbation).
- Discharge medications: distinct items with reconciliation actions Resume/Order/New/Modify at Discharge ('Do Not…' and 'Released' rows excluded).
- summaryPeriod widened beyond the 3-year default so the 2022 admission is in window.
- No EHS incident — no ED encounter exists for this patient in the sample.

```json
{
  "requestId": "fbb84dd4-d251-57a7-93fc-fe834dac125e",
  "status": "completed",
  "releaseId": "REL-2026-004401",
  "disclosureLogRef": "HSS-DL-2026-004401",
  "patient": {
    "id": "Z9348",
    "mrn": 1000039212,
    "phn": 900039212,
    "familyName": "Tasselhoff",
    "firstName": "David",
    "birthDate": "1968-10-23"
  },
  "summaryPeriod": {
    "startDate": "2022-01-01",
    "endDate": "2026-01-14"
  },
  "encounterSummary": {
    "totalEncounters": 1,
    "ehsIncidents": [],
    "edVisits": [],
    "inpatientEpisodes": [
      {
        "encounterId": "403020340316",
        "encounterType": "Inpatient",
        "facility": "EDM WMC University of Alberta Hospital",
        "department": "EDM UAH WMC 4F3 AMH PSYCHIATRY",
        "admitDateTime": "2022-01-28T10:49:00",
        "dischargeDateTime": "2025-04-02T09:58:00",
        "chiefComplaint": null,
        "diagnoses": [
          "AKI (acute kidney injury)",
          "Asthma attack",
          "COPD with acute exacerbation",
          "Femur fracture",
          "GERD (gastroesophageal reflux disease)",
          "Gout attack",
          "Pneumonia",
          "Shoulder arthritis",
          "Traumatic rhabdomyolysis"
        ],
        "principalProblem": "COPD with acute exacerbation",
        "lengthOfStayDays": 1160,
        "dischargeMedications": [
          "HYDROmorphone liquid oral 2 mg",
          "HYDROmorphone, short acting tablet 1 mg",
          "acetaminophen tablet 650 mg",
          "allopurinol 300 mg tablet",
          "aluminum hydroxide-magnesium hydroxide 40 mg - 40 mg/mL oral liquid 30 mL",
          "amoxicillin capsule",
          "capTOPRIL tablet",
          "carVEDilol tablet 3.125 mg",
          "celecoxib 100 mg capsule",
          "codeine, long acting tablet",
          "furosemide 20 mg tablet",
          "furosemide tablet",
          "furosemide tablet 20 mg",
          "gabapentin capsule 300 mg",
          "melatonin 1 mg capsule",
          "metFORMIN tablet 500 mg",
          "morphine injection 2 mg",
          "nitrofurantoin, long acting capsule 100 mg",
          "omeprazole magnesium 20 mg tablet enteric-coated",
          "oxyCODONE, long acting tablet 15 mg",
          "pantoprazole magnesium tablet enteric-coated 40 mg",
          "pantoprazole magnesium tablet enteric-coated 80 mg",
          "ramipril 10 mg capsule",
          "ramipril capsule 5 mg",
          "tamsulosin, long acting 0.4 mg capsule",
          "trihexyphenidyl tablet 2 mg",
          "zopiclone 3.75 mg tablet"
        ],
        "disposition": "Home",
        "mentalHealthActOrder": false
      }
    ],
    "ambulatoryVisits": [],
    "communityTreatmentOrders": [],
    "currentDiagnoses": []
  }
}
```

## Z6562 — Albert Amh — Ambulatory test patient

- 41 distinct ambulatory encounters (rows grouped by CSN; encounter 403020177874 had two chief-complaint rows, merged).
- CTO list carries only the CTOFlag='Y' order (2025-12-16, encounter 403020465466); the 141 'N' rows are excluded per the data-model rule.
- Current diagnoses deduplicated to latest entry per Dx_ID (7 of 22 rows).
- summaryPeriod widened so the 2019-2020 encounters are in window; production default is the 3-year lookback.
- No EHS incident — no ED encounter exists for this patient in the sample.

```json
{
  "requestId": "ea757b3c-6be0-5ae7-839b-68b770a6352b",
  "status": "completed",
  "releaseId": "REL-2026-004402",
  "disclosureLogRef": "HSS-DL-2026-004402",
  "patient": {
    "id": "Z6562",
    "mrn": 1000013704,
    "phn": 900013704,
    "familyName": "Amh",
    "firstName": "Albert",
    "birthDate": "1980-08-08"
  },
  "summaryPeriod": {
    "startDate": "2019-01-01",
    "endDate": "2026-01-14"
  },
  "encounterSummary": {
    "totalEncounters": 41,
    "ehsIncidents": [],
    "edVisits": [],
    "inpatientEpisodes": [],
    "ambulatoryVisits": [
      {
        "encounterId": "403020490742",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-10-06T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxiety"
        ]
      },
      {
        "encounterId": "403020487810",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-09-15T00:00:00",
        "chiefComplaint": "ANXIETY",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxiety"
        ]
      },
      {
        "encounterId": "403020486318",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-09-08T00:00:00",
        "chiefComplaint": "ANXIETY",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxiety"
        ]
      },
      {
        "encounterId": "403020485166",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-08-27T00:00:00",
        "chiefComplaint": "DISCHARGE",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxiety"
        ]
      },
      {
        "encounterId": "403020479946",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-07-08T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": []
      },
      {
        "encounterId": "403020470693",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-04-04T00:00:00",
        "chiefComplaint": "EATING DISORDER",
        "presentingComplaint": null,
        "diagnoses": [
          "Eating disorder"
        ]
      },
      {
        "encounterId": "403020468619",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-03-18T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020464625",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-02-03T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": []
      },
      {
        "encounterId": "403020462995",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-01-20T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020461619",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2025-01-06T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020459908",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2024-12-09T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020455051",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2024-10-23T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020450508",
        "encounterVisitType": "Collateral",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2024-09-18T00:00:00",
        "chiefComplaint": "ANXIETY",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020437580",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2024-05-17T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020437307",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2024-05-14T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020382943",
        "encounterVisitType": "Clinical Support",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2022-12-07T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020382950",
        "encounterVisitType": "Clinical Support",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2022-12-07T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020383034",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2022-12-07T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Depression"
        ]
      },
      {
        "encounterId": "403020382670",
        "encounterVisitType": "Clinical Support",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2022-12-05T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020377239",
        "encounterVisitType": "Treatment",
        "facility": "COC Cochrane Community Health Centre",
        "department": "Cochrane Addiction & Mental Health Community Clinic",
        "serviceDateTime": "2022-10-26T00:00:00",
        "chiefComplaint": "AUTISM",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020248648",
        "encounterVisitType": "Office Visit",
        "facility": "EDM 108 Street Building",
        "department": "DiverseCity Housing Program, Addiction and Mental Health",
        "serviceDateTime": "2020-06-10T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Anxiety"
        ]
      },
      {
        "encounterId": "403020247510",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2020-06-03T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "ADHD (attention deficit hyperactivity disorder)"
        ]
      },
      {
        "encounterId": "403020228735",
        "encounterVisitType": "Patient Outreach",
        "facility": "EDM Lynnwood Family Medicine Clinic",
        "department": "Lynnwood Family Practice Clinic",
        "serviceDateTime": "2020-04-15T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": []
      },
      {
        "encounterId": "403020224794",
        "encounterVisitType": "Office Visit",
        "facility": "EDM WMC University of Alberta Hospital",
        "department": "Kaye Edmonton Clinic Family Medicine Clinic",
        "serviceDateTime": "2020-03-19T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": []
      },
      {
        "encounterId": "403020216634",
        "encounterVisitType": "Clinical Support",
        "facility": "EDM 108 Street Building",
        "department": "DiverseCity Housing Program, Addiction and Mental Health",
        "serviceDateTime": "2020-02-11T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Depression"
        ]
      },
      {
        "encounterId": "403020215264",
        "encounterVisitType": "Office Visit",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2020-02-03T00:00:00",
        "chiefComplaint": "BIPOLAR",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxiety",
          "Depression"
        ]
      },
      {
        "encounterId": "403020207905",
        "encounterVisitType": "Follow-Up",
        "facility": "EDM 106 Street Building",
        "department": "The Opioid Dependency and Enhanced Addiction Clinic",
        "serviceDateTime": "2019-12-19T00:00:00",
        "chiefComplaint": "ANXIETY",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxiety"
        ]
      },
      {
        "encounterId": "403020206335",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2019-12-15T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": []
      },
      {
        "encounterId": "403020200875",
        "encounterVisitType": "Consult",
        "facility": "EDM 108 Street Building",
        "department": "DiverseCity Housing Program, Addiction and Mental Health",
        "serviceDateTime": "2019-11-18T00:00:00",
        "chiefComplaint": "DEPRESSION",
        "presentingComplaint": null,
        "diagnoses": [
          "Depression"
        ]
      },
      {
        "encounterId": "403020193851",
        "encounterVisitType": "Clinical Support",
        "facility": "EDM 108 Street Building",
        "department": "108 St Clinic Adult Community Services, Addiction and Mental Health",
        "serviceDateTime": "2019-10-22T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": []
      },
      {
        "encounterId": "403020180160",
        "encounterVisitType": "Forensic Legal Encounter",
        "facility": "EDM 105 Street Building",
        "department": "105st Child, Youth and Families Clinic, Addiction and Mental Health",
        "serviceDateTime": "2019-09-09T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "ADHD (attention deficit hyperactivity disorder)"
        ]
      },
      {
        "encounterId": "403020179911",
        "encounterVisitType": "Follow-Up",
        "facility": "EDM 108 Street Building",
        "department": "DiverseCity Housing Program, Addiction and Mental Health",
        "serviceDateTime": "2019-09-06T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": []
      },
      {
        "encounterId": "403020177874",
        "encounterVisitType": "Consult",
        "facility": "EDM 106 Street Building",
        "department": "EDM 106ST AMH CGT CLINICAL",
        "serviceDateTime": "2019-08-27T00:00:00",
        "chiefComplaint": "ANXIETY; CRISIS",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxious (avoidant) personality disorder"
        ]
      },
      {
        "encounterId": "403020177350",
        "encounterVisitType": "Consult",
        "facility": "EDM 106 Street Building",
        "department": "EDM 106ST AMH CLINICAL",
        "serviceDateTime": "2019-08-22T00:00:00",
        "chiefComplaint": "ANXIETY",
        "presentingComplaint": null,
        "diagnoses": [
          "Anxiousness"
        ]
      },
      {
        "encounterId": "403020175851",
        "encounterVisitType": "Clinical Support",
        "facility": "EDM 106 Street Building",
        "department": "EDM 106ST AMH CLINICAL",
        "serviceDateTime": "2019-08-14T00:00:00",
        "chiefComplaint": "GROUP TREATMENT",
        "presentingComplaint": null,
        "diagnoses": [
          "Depression"
        ]
      },
      {
        "encounterId": "403020175237",
        "encounterVisitType": "Consult",
        "facility": "EDM 106 Street Building",
        "department": "EDM 106ST AMH CLINICAL",
        "serviceDateTime": "2019-08-13T00:00:00",
        "chiefComplaint": "GROUP EXERCISE",
        "presentingComplaint": null,
        "diagnoses": [
          "Depression"
        ]
      },
      {
        "encounterId": "403020175201",
        "encounterVisitType": "Office Visit",
        "facility": "EDM 106 Street Building",
        "department": "EDM 106ST AMH CLINICAL",
        "serviceDateTime": "2019-08-09T00:00:00",
        "chiefComplaint": "GROUP TREATMENT",
        "presentingComplaint": null,
        "diagnoses": [
          "Depression"
        ]
      },
      {
        "encounterId": "403020174669",
        "encounterVisitType": "Clinical Support",
        "facility": "EDM 106 Street Building",
        "department": "EDM 106ST AMH CLINICAL",
        "serviceDateTime": "2019-08-07T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Depression"
        ]
      },
      {
        "encounterId": "403020172505",
        "encounterVisitType": "Office Visit",
        "facility": "EDM 106 Street Building",
        "department": "EDM 106ST AMH CLINICAL",
        "serviceDateTime": "2019-07-25T00:00:00",
        "chiefComplaint": null,
        "presentingComplaint": null,
        "diagnoses": [
          "Depression"
        ]
      },
      {
        "encounterId": "403020162094",
        "encounterVisitType": "Office Visit",
        "facility": "EDM 106 Street Building",
        "department": "EDM 106ST AMH CLINICAL",
        "serviceDateTime": "2019-05-31T00:00:00",
        "chiefComplaint": "ADDICTION PROBLEM",
        "presentingComplaint": null,
        "diagnoses": []
      },
      {
        "encounterId": "403020141189",
        "encounterVisitType": "Office Visit",
        "facility": "EDM Royal Alexandra Hospital",
        "department": "Royal Alexandra Hospital Outpatient Infectious Diseases",
        "serviceDateTime": "2019-01-23T00:00:00",
        "chiefComplaint": "IV MEDICATION",
        "presentingComplaint": null,
        "diagnoses": []
      }
    ],
    "communityTreatmentOrders": [
      {
        "ctoFlag": true,
        "ctoStartDate": "2025-12-16",
        "ctoEndDate": null
      }
    ],
    "currentDiagnoses": [
      {
        "code": "F99",
        "description": "Mental health disorder",
        "diagnosedDate": "2025-12-16",
        "status": null
      },
      {
        "code": "F19.999",
        "description": "Substance use disorder",
        "diagnosedDate": "2025-12-16",
        "status": null
      },
      {
        "code": "F41.9",
        "description": "Anxiety",
        "diagnosedDate": "2025-10-06",
        "status": null
      },
      {
        "code": "F50.9",
        "description": "Eating disorder",
        "diagnosedDate": "2025-04-04",
        "status": null
      },
      {
        "code": "F60.6",
        "description": "Anxious (avoidant) personality disorder",
        "diagnosedDate": "2025-03-18",
        "status": null
      },
      {
        "code": "F48.9",
        "description": "Poor mental health",
        "diagnosedDate": "2023-03-14",
        "status": "Active"
      },
      {
        "code": "F32.9",
        "description": "Depression",
        "diagnosedDate": "2022-12-07",
        "status": null
      }
    ]
  }
}
```

## Z32030 — Kinder Sharpie — ED test patient

- 11 distinct ED encounters (duplicate rows collapsed per CSN). The workbook's ED Visit Summary sheet carried 11 other PAT_IDs and none for Z32030 — the extract was not filtered to the test patient, so all ED encounters were reassigned to her per review on 2026-06-10. Original PAT_ID → CSN: Z32657→403020498983, Z32656→403020498957, Z32655→403020498916, Z8951→403020498845, Z30913→403020498778, Z32346→403020498777, Z32642→403020498741, Z32569→403020498729, Z32626→403020498617, Z32625→403020498609, Z31672→403020498591.
- Frequent-presenter pattern: 11 ED visits across 6 facilities, 2025-12-16 to 2025-12-19.
- 4 synthetic EHS incidents correlate to ambulance-linked arrivals via emergencyCSN = ED encounterId, matching destination facility, and incident time 40-60 minutes before arrival. The 2025-12-18 UAH visit is the anchor case — its workbook ED row already records Arrival Method = Ground Ambulance.
- EHS clinical content (complaints, impressions, Form 1/Form 10 alerts, alcohol/drug indicators) is fabricated using the new EHS Incident Summary fields in the data model — the workbook's APH Incidents sheet is empty.

```json
{
  "requestId": "5c5b7464-f29e-54c6-8e28-47115c31d593",
  "status": "completed",
  "releaseId": "REL-2026-004403",
  "disclosureLogRef": "HSS-DL-2026-004403",
  "patient": {
    "id": "Z32030",
    "mrn": 1000360691,
    "phn": 900360691,
    "familyName": "Sharpie",
    "firstName": "Kinder",
    "birthDate": "1982-09-29"
  },
  "summaryPeriod": {
    "startDate": "2023-01-14",
    "endDate": "2026-01-14"
  },
  "encounterSummary": {
    "totalEncounters": 15,
    "ehsIncidents": [
      {
        "incidentId": "EHS-2025-118734",
        "incidentDateTime": "2025-12-18T09:12:00",
        "destinationFacility": "EDM WMC University of Alberta Hospital",
        "emergencyCSN": "403020498845",
        "complaint": "Decreased level of consciousness",
        "complaintType": "Primary",
        "mentalHealthSymptom": null,
        "medicalSurgicalHistory": [
          "Opioid use disorder",
          "Hepatitis C"
        ],
        "carePlanImpressions": [
          {
            "item": "Opioid toxicity / overdose",
            "details": "Pinpoint pupils, RR 6, GCS 8 on arrival; responsive to naloxone"
          }
        ],
        "procedures": [
          "Naloxone 4 mg intranasal",
          "Bag-valve-mask ventilation",
          "IV access — 18 ga left AC",
          "Oxygen therapy 15 L NRB"
        ],
        "alerts": [
          "Form 10"
        ],
        "currentMedications": [
          "Methadone 80 mg daily (reported)"
        ],
        "causeOfInjury": "Poisoning by drug",
        "intentOfInjury": "Undetermined",
        "alcoholDrugUseIndicators": "Drug paraphernalia on scene; bystander reports suspected fentanyl use",
        "barriersToPatientCare": "Patient combative on rousal post-naloxone",
        "disposition": "Transported to ED"
      },
      {
        "incidentId": "EHS-2025-118512",
        "incidentDateTime": "2025-12-17T15:08:00",
        "destinationFacility": "STA Sturgeon Community Hospital",
        "emergencyCSN": "403020498778",
        "complaint": "Suicidal ideation",
        "complaintType": "Primary",
        "mentalHealthSymptom": "Suicidal ideation with stated plan",
        "medicalSurgicalHistory": [
          "Major depressive disorder",
          "Previous intentional overdose (2024)"
        ],
        "carePlanImpressions": [
          {
            "item": "Behavioural / psychiatric emergency",
            "details": "Patient expresses active SI with plan; no injury identified on assessment"
          }
        ],
        "procedures": [
          "Patient assessment",
          "Continuous observation during transport"
        ],
        "alerts": [
          "Form 10"
        ],
        "currentMedications": [
          "Sertraline 100 mg daily"
        ],
        "causeOfInjury": null,
        "intentOfInjury": null,
        "alcoholDrugUseIndicators": "Patient reports consuming 6-8 alcoholic drinks earlier today",
        "barriersToPatientCare": "Patient initially refused transport; agreed after family intervention",
        "disposition": "Transported to ED"
      },
      {
        "incidentId": "EHS-2025-118390",
        "incidentDateTime": "2025-12-16T12:38:00",
        "destinationFacility": "BAN Mineral Springs Hospital",
        "emergencyCSN": "403020498617",
        "complaint": "Bizarre behaviour / acute agitation",
        "complaintType": "Primary",
        "mentalHealthSymptom": "Acute psychosis — disorganized thought, paranoia, reported 4 days without sleep",
        "medicalSurgicalHistory": [
          "Stimulant use disorder"
        ],
        "carePlanImpressions": [
          {
            "item": "Substance-induced psychosis",
            "details": "Hypervigilant, tachycardic (HR 128), diaphoretic; reports methamphetamine use this morning"
          }
        ],
        "procedures": [
          "Patient assessment",
          "Verbal de-escalation",
          "IV access — 20 ga right hand"
        ],
        "alerts": [
          "Form 1"
        ],
        "currentMedications": [],
        "causeOfInjury": null,
        "intentOfInjury": null,
        "alcoholDrugUseIndicators": "Patient admits methamphetamine use; pipe located by RCMP on scene",
        "barriersToPatientCare": "RCMP assistance required to approach patient safely",
        "disposition": "Transported to ED"
      },
      {
        "incidentId": "EHS-2025-118366",
        "incidentDateTime": "2025-12-16T11:04:00",
        "destinationFacility": "WET Wetaskiwin Hospital and Care Centre",
        "emergencyCSN": "403020498591",
        "complaint": "Abdominal pain",
        "complaintType": "Primary",
        "mentalHealthSymptom": "Anxiety",
        "medicalSurgicalHistory": [
          "Alcohol use disorder",
          "Pancreatitis (2023)"
        ],
        "carePlanImpressions": [
          {
            "item": "Abdominal pain — suspected pancreatitis",
            "details": "Epigastric pain 8/10 radiating to back; last alcohol intake reported this morning"
          }
        ],
        "procedures": [
          "IV access — 18 ga right AC",
          "Normal saline 500 mL bolus",
          "Pain assessment"
        ],
        "alerts": [],
        "currentMedications": [
          "Pantoprazole 40 mg daily"
        ],
        "causeOfInjury": null,
        "intentOfInjury": null,
        "alcoholDrugUseIndicators": "ETOH odour noted; patient reports daily alcohol use (~12 standard drinks/day)",
        "barriersToPatientCare": null,
        "disposition": "Transported to ED"
      }
    ],
    "edVisits": [
      {
        "encounterId": "403020498983",
        "encounterType": "ED",
        "facility": "RED Red Deer Regional Hospital Centre",
        "department": "RED RDHC EMERGENCY",
        "arrivalDateTime": "2025-12-19T09:54:00",
        "arrivalMethod": "No Ambulance",
        "departureDateTime": null,
        "chiefComplaint": "AHS ED ABDOMINAL PAIN 251",
        "ctasLevel": 3,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498957",
        "encounterType": "ED",
        "facility": "EDM Misericordia Community Hospital",
        "department": "EDM MCH EMERGENCY",
        "arrivalDateTime": "2025-12-18T15:21:00",
        "arrivalMethod": null,
        "departureDateTime": null,
        "chiefComplaint": null,
        "ctasLevel": null,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498916",
        "encounterType": "ED",
        "facility": "STA Sturgeon Community Hospital",
        "department": "STA SCH EMERGENCY",
        "arrivalDateTime": "2025-12-18T13:29:00",
        "arrivalMethod": null,
        "departureDateTime": null,
        "chiefComplaint": "AHS ED ABDOMINAL PAIN 251",
        "ctasLevel": 4,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498845",
        "encounterType": "ED",
        "facility": "EDM WMC University of Alberta Hospital",
        "department": "EDM UAH WMC EMERGENCY",
        "arrivalDateTime": "2025-12-18T09:53:51",
        "arrivalMethod": "Ground Ambulance",
        "departureDateTime": null,
        "chiefComplaint": null,
        "ctasLevel": null,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498778",
        "encounterType": "ED",
        "facility": "STA Sturgeon Community Hospital",
        "department": "STA SCH EMERGENCY",
        "arrivalDateTime": "2025-12-17T15:57:00",
        "arrivalMethod": null,
        "departureDateTime": null,
        "chiefComplaint": null,
        "ctasLevel": null,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498777",
        "encounterType": "ED",
        "facility": "WET Wetaskiwin Hospital and Care Centre",
        "department": "WET WHCC EMERGENCY",
        "arrivalDateTime": "2025-12-17T15:55:00",
        "arrivalMethod": null,
        "departureDateTime": null,
        "chiefComplaint": null,
        "ctasLevel": null,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498741",
        "encounterType": "ED",
        "facility": "EDM WMC University of Alberta Hospital",
        "department": "EDM UAH WMC EMERGENCY",
        "arrivalDateTime": "2025-12-17T11:56:00",
        "arrivalMethod": "No Ambulance",
        "departureDateTime": null,
        "chiefComplaint": null,
        "ctasLevel": null,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498729",
        "encounterType": "ED",
        "facility": "EDM WMC University of Alberta Hospital",
        "department": "EDM UAH WMC EMERGENCY",
        "arrivalDateTime": "2025-12-17T11:15:00",
        "arrivalMethod": "No Ambulance",
        "departureDateTime": null,
        "chiefComplaint": null,
        "ctasLevel": null,
        "diagnoses": [],
        "disposition": "Discharged",
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498617",
        "encounterType": "ED",
        "facility": "BAN Mineral Springs Hospital",
        "department": "BAN MSH EMERGENCY",
        "arrivalDateTime": "2025-12-16T13:25:00",
        "arrivalMethod": null,
        "departureDateTime": null,
        "chiefComplaint": "AHS ED INSOMNIA 354",
        "ctasLevel": 2,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498609",
        "encounterType": "ED",
        "facility": "EDM WMC University of Alberta Hospital",
        "department": "EDM UAH WMC EMERGENCY",
        "arrivalDateTime": "2025-12-16T12:59:00",
        "arrivalMethod": "No Ambulance",
        "departureDateTime": null,
        "chiefComplaint": "AHS ED ABDOMINAL PAIN 251",
        "ctasLevel": null,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      },
      {
        "encounterId": "403020498591",
        "encounterType": "ED",
        "facility": "WET Wetaskiwin Hospital and Care Centre",
        "department": "WET WHCC EMERGENCY",
        "arrivalDateTime": "2025-12-16T11:46:00",
        "arrivalMethod": null,
        "departureDateTime": null,
        "chiefComplaint": "AHS ED ABDOMINAL PAIN 251",
        "ctasLevel": null,
        "diagnoses": [],
        "disposition": null,
        "mentalHealthActOrder": false
      }
    ],
    "inpatientEpisodes": [],
    "ambulatoryVisits": [],
    "communityTreatmentOrders": [],
    "currentDiagnoses": []
  }
}
```
