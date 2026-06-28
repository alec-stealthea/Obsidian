---
type: Reference
title: "Updated Action and Timing Mapping"
description: "The following table lists the possible results coming in from a Mammogram and how those will be mapped to an 'external value' which is what the Bridges integration engine is expecting and the Inter..."
timestamp: 2026-06-26T19:19:06Z
---

The following table lists the possible results coming in from a Mammogram and how those will be mapped to an 'external value' which is what the Bridges integration engine is expecting and the Internal Value that will be stored in Radiant.

| **Recommended Action**            | **AI Recommended Timing** | **Epic Internal Value**                          | **External Value** |
| --------------------------------- | ------------------------- | ------------------------------------------------ | ------------------ |
| Biopsy                            | Immediate                 | Biopsy [3]                                       | Biopsy             |
| Biopsy                            | 3 Months                  | Biopsy [3]                                       | Biopsy             |
| Biopsy                            | 6 Months                  | Biopsy [3]                                       | Biopsy             |
| Biopsy                            | 1year                     | Biopsy [3]                                       | Biopsy             |
| Biopsy                            | 2years                    | Biopsy [3]                                       | Biopsy             |
| Biopsy                            | No Recall                 | Biopsy [3]                                       | Biopsy             |
| Biopsy                            | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Breast MRI                        | Immediate                 | Additional Imaging [1004]                        | Additional         |
| Breast MRI                        | 3 Months                  | Breast MRI - other [1014]                        | Breast MRI         |
| Breast MRI                        | 6 Months                  | Breast MRI 6 months [1040]                       | Breast MRI 6       |
| Breast MRI                        | 1year                     | Breast MRI 1 year [1032]                         | MRI 1 year         |
| Breast MRI                        | 2years                    | Breast MRI - other [1014]                        | Breast MRI         |
| Breast MRI                        | No Recall                 | *Send to error queue                             | NoDataFound        |
| Breast MRI                        | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Breast Ultrasound                 | Immediate                 | Breast Ultrasound - other [1041]                 | US other           |
| Breast Ultrasound                 | 3 Months                  | Breast Ultrasound 3 months [1026]                | US 90 days         |
| Breast Ultrasound                 | 6 Months                  | Breast Ultrasound 6 months [1027]                | US 180 days        |
| Breast Ultrasound                 | 1year                     | Breast Ultrasound 1 year [1028]                  | US 12 months       |
| Breast Ultrasound                 | 2years                    | Breast Ultrasound - other [1041]                 | US other           |
| Breast Ultrasound                 | No Recall                 | Breast Ultrasound - other [1041]                 | US other           |
| Breast Ultrasound                 | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Cancer Treatment                  | Immediate                 | Clinical Follow-up [1006]                        | Clinic Exam        |
| Cancer Treatment                  | 3 Months                  | Clinical Follow-up [1006]                        | Clinic Exam        |
| Cancer Treatment                  | 6 Months                  | Clinical Follow-up [1006]                        | Clinic Exam        |
| Cancer Treatment                  | 1year                     | Clinical Follow-up [1006]                        | Clinic Exam        |
| Cancer Treatment                  | 2years                    | Clinical Follow-up [1006]                        | Clinic Exam        |
| Cancer Treatment                  | No Recall                 | Clinical Follow-up [1006]                        | Clinic Exam        |
| Cancer Treatment                  | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Diagnostic Mammogram              | Immediate                 | Additional Imaging [1004]                        | Additional         |
| Diagnostic Mammogram              | 3 Months                  | Diagnostic Mammogram - other [1043]              | Diagnostic         |
| Diagnostic Mammogram              | 6 Months                  | Diagnostic Mammogram 6 months [1042]             | Diagnostic 6       |
| Diagnostic Mammogram              | 1year                     | Diagnostic Mammogram in 1 year [1019]            | Diag 1 Yr          |
| Diagnostic Mammogram              | 2years                    | Diagnostic Mammogram - other [1043]              | Diagnostic         |
| Diagnostic Mammogram              | No Recall                 | Diagnostic Mammogram - other [1043]              | Diagnostic         |
| Diagnostic Mammogram              | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Screening Mammogram               | Immediate                 | Technical Repeat [1012]                          | Tech Repeat        |
| Screening Mammogram               | 3 Months                  | Short Interval Follow-up [1]                     | Short Intrvl       |
| Screening Mammogram               | 6 Months                  | Short Interval Follow-up [1]                     | Short Intrvl       |
| Screening Mammogram               | 1year                     | Routine Screening Mammogram in 1 year [1000]     | Mamm 1 Yr          |
| Screening Mammogram               | 2years                    | Routine Screening Mammogram in 2 years [1023]    | Mamm 2 Yrs         |
| Screening Mammogram               | No Recall                 | No Follow-up [1017]                              | No Follow Up       |
| Screening Mammogram               | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Screening Mammogram + Ultrasound  | Immediate                 | Technical Repeat [1012]                          | Tech Repeat        |
| Screening Mammogram + Ultrasound  | 3 Months                  | Short Interval Follow-up [1]                     | Short Intrvl       |
| Screening Mammogram + Ultrasound  | 6 Months                  | Short Interval Follow-up [1]                     | Short Intrvl       |
| Screening Mammogram + Ultrasound  | 1year                     | Screening mammogram and US 1 year [1061]         | SMUS1Y             |
| Screening Mammogram + Ultrasound  | 2years                    | Screening mammogram and US 2 years [1062]        | SMUS2Y             |
| Screening Mammogram + Ultrasound  | No Recall                 | No Follow-up [1017]                              | No Follow Up       |
| Screening Mammogram + Ultrasound  | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Diagnostic Mammogram + MRI        | Immediate                 | Additional Imaging [1004]                        | Additional         |
| Diagnostic Mammogram + MRI        | 3 Months                  | Diagnostic mammography and MR other [1058]       | DMRO               |
| Diagnostic Mammogram + MRI        | 6 Months                  | Diagnostic mammography and MR in 6 months [1059] | DMR6M              |
| Diagnostic Mammogram + MRI        | 1year                     | Diagnostic mammography and MR in 1 year [1060]   | DMR1Y              |
| Diagnostic Mammogram + MRI        | 2years                    | Diagnostic mammography and MR other [1058]       | DMRO               |
| Diagnostic Mammogram + MRI        | No Recall                 | Diagnostic mammography and MR other [1058]       | DMRO               |
| Diagnostic Mammogram + MRI        | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Diagnostic Mammogram + Ultrasound | Immediate                 | Additional Imaging [1004]                        | Additional         |
| Diagnostic Mammogram + Ultrasound | 3 Months                  | Diagnostic mammography  and US other [1057]      | DUSO               |
| Diagnostic Mammogram + Ultrasound | 6 Months                  | Diagnostic mammography and US in 6 months [1054] | DUS6M              |
| Diagnostic Mammogram + Ultrasound | 1year                     | Diagnostic mammography and US in 1 year [1053]   | DUS1Y              |
| Diagnostic Mammogram + Ultrasound | 2years                    | Diagnostic mammography  and US other [1057]      | DUSO               |
| Diagnostic Mammogram + Ultrasound | No Recall                 | Diagnostic mammography  and US other [1057]      | DUSO               |
| Diagnostic Mammogram + Ultrasound | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Additional Imaging                | Immediate                 | Additional Imaging [1004]                        | Additional         |
| Additional Imaging                | 3 Months                  | Additional Imaging [1004]                        | Additional         |
| Additional Imaging                | 6 Months                  | Additional Imaging [1004]                        | Additional         |
| Additional Imaging                | 1year                     | Additional Imaging [1004]                        | Additional         |
| Additional Imaging                | 2years                    | Additional Imaging [1004]                        | Additional         |
| Additional Imaging                | No Recall                 | Additional Imaging [1004]                        | Additional         |
| Additional Imaging                | NoDataFound               | *Send to error queue                             | NoDataFound        |
| Waiting for Pathology             | Immediate                 | Waiting for Pathology [1021]                     | Pathology          |
| Waiting for Pathology             | 3 Months                  | Waiting for Pathology [1021]                     | Pathology          |
| Waiting for Pathology             | 6 Months                  | Waiting for Pathology [1021]                     | Pathology          |
| Waiting for Pathology             | 1year                     | Waiting for Pathology [1021]                     | Pathology          |
| Waiting for Pathology             | 2years                    | Waiting for Pathology [1021]                     | Pathology          |
| Waiting for Pathology             | No Recall                 | Waiting for Pathology [1021]                     | Pathology          |
| Waiting for Pathology             | NoDataFound               | *Send to error queue                             | NoDataFound        |
| NoDataFound                       | Immediate                 | *Send to error queue                             | NoDataFound        |
| NoDataFound                       | 3 Months                  | *Send to error queue                             | NoDataFound        |
| NoDataFound                       | 6 Months                  | *Send to error queue                             | NoDataFound        |
| NoDataFound                       | 1year                     | *Send to error queue                             | NoDataFound        |
| NoDataFound                       | 2years                    | *Send to error queue                             | NoDataFound        |
| NoDataFound                       | No Recall                 | *Send to error queue                             | NoDataFound        |
| NoDataFound                       | NoDataFound               | *Send to error queue                             | NoDataFound        |