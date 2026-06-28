---
type: Reference
title: "Breast Cancer (Mammography) Screening Key Fields and values"
description: "The final results need to confirm to the following five attributes with the listed acceptable values within Radiant for:"
timestamp: 2026-06-26T19:19:06Z
---

The final results need to confirm to the following five attributes with the listed acceptable values within Radiant for: 

- Recommended Side 
    
- Recommended Action 
    
- Timing 
    
- BI-RADS Category 
    
- Breast Density 
    
- Recommendation Status - Need to confirm with the ABCSP 
    
- Mammography LLM Prompt Product and Version - [AI Product]+[AI Product Version]+[Prompt Version] - need to confirm where this will persist in the Radiant data model. 
    
- Date of last exam – Not required from community message 
    

Recommended Side = Recommendation Side [3003] 

|   |   |   |
|---|---|---|
|Term|External|Internal|
|Bilateral|Bilat|Bilateral [0]|
|Right|Rt|Right [1]|
|Left|Lt|Left [2]|

Recommended Action and Timing = Recommendation Code [3002] 

 Replaced by [ABCSP Breast Screening Action + Timing 'External Code'](onenote:#ABCSP%20Breast%20Screening%20Action%20+%20Timing%20'External%20Code'&section-id={43aa0d00-f286-415f-95b7-5a13347be8a6}&page-id={891403f8-3a5d-4c87-aa5b-60e0baf28e26}&end)  ([Web view](https://albertahealthservices.sharepoint.com/sites/M365TScreeningIndividualPopulationWG/_layouts/15/Doc.aspx?sourcedoc=%7Ba93b9749-4400-4f28-96da-a36371dbd07a%7D&action=edit&wd=target%28Breast+Cancer+Screening+Automation.one%7C43aa0d00-f286-415f-95b7-5a13347be8a6%2FABCSP+Breast+Screening+Action+%2B+Timing+%27External+Code%27%7C891403f8-3a5d-4c87-aa5b-60e0baf28e26%2F%29&wdorigin=703&wdpartid=%7B86635bde-1ef5-40d3-aaba-ddb200b47a0e%7D%7B17%7D&wdsectionfileid=f74f13f7-7659-4bf4-aa0d-2f5831ef1c07&wdpreservelink=1)) 

|                              |                                                                      |
| ---------------------------- | -------------------------------------------------------------------- |
| External (Powerscribe) Value | Internal (Epic) Value                                                |
| Intrvl                       | Short Interval Follow-up [1]                                         |
| US                           | Ultrasound [2]                                                       |
| Biopsy                       | Biopsy [3]                                                           |
| Mamm 1 Yr                    | Routine Screening Mammogram in 1 year [1000]                         |
| Mamm at 40                   | Routine Screening Mammogram at age 40 [1001]                         |
| Additional                   | Additional Imaging [1004]                                            |
| Clinic Exam                  | Clinical Follow-up [1006]                                            |
| Surgery                      | Surgical Consultation [1009]                                         |
| Obtain Prior                 | Obtain Prior Study for Comparison [1010]                             |
| Tech Repeat                  | Technical Repeat [1012]                                              |
| Ductogram                    | Ductogram [1013]                                                     |
| Breast MRI                   | Breast MRI - other [1014]                                            |
| On Sched                     | Back on Schedule 1 year [1016]                                       |
| No Follow Up                 | No Follow-up [1017]                                                  |
| MRI 1 Yr                     | Routine Screening Breast MRI in 1 year [1018]                        |
| Diag 1 Yr                    | Diagnostic Mammogram in 1 year [1019]                                |
| Pathology                    | Waiting for Pathology [1021]                                         |
| Surg Biopsy                  | Surgical Biopsy [1022]                                               |
| Mamm 2 Yrs                   | Routine Screening Mammogram in 2 years [1023]                        |
| US 90 days                   | Breast Ultrasound 3 months [1026]                                    |
| US 180 days                  | Breast Ultrasound 6 months [1027]                                    |
| US 12 months                 | Breast Ultrasound 1 year [1028]                                      |
| MRI 1 year                   | Breast MRI 1 year [1032]                                             |
| US 30 days                   | Breast Ultrasound 1 month [1039]                                     |
| Breast MRI 6                 | Breast MRI 6 months [1040]                                           |
| US other                     | Breast Ultrasound - other [1041]                                     |
| Diagnostic 6                 | Diagnostic Mammogram 6 months [1042]                                 |
| Diagnostic                   | Diagnostic Mammogram - other [1043]                                  |
| US screen                    | Routine Breast Screening Ultrasound 1 year [1044]                    |
| On Sched 2                   | Back On Schedule 2 years [1045]                                      |
| ST tracking                  | AHS ST Return to Screening Tracking [1046]                           |
| ST AI                        | AHS ST Additional Imaging [1047]                                     |
| ST 1 yr                      | AHS ST Screening Mammogram in 1 year [1048]                          |
| ST 2 yr                      | AHS ST Screening Mammogam in 2 years [1049]                          |
| ST BOS 1 yr                  | AHS ST Back on Schedule 1 year [1050]                                |
| ST BOS 2 yr                  | AHS ST Back on Schedule 2 years [1051]                               |
| Surgical PT                  | Surgical Patient [1052]                                              |
| DUS1Y                        | Diagnostic mammography and US in 1 year [1053]                       |
| DUS6M                        | Diagnostic mammography and US in 6 months [1054]                     |
| Second Study                 | See other breast imaging result for follow-up recommendations [1055] |
| ST Cinic FU                  | AHS ST Clinical Follow-up [1056]                                     |
| DUSO                         | Diagnostic mammography  and US other [1057]                          |
| DMRO                         | Diagnostic mammography and MR other [1058]                           |
| DMR6M                        | Diagnostic mammography and MR in 6 months [1059]                     |
| DMR1Y                        | Diagnostic mammography and MR in 1 year [1060]                       |
| SMUS1Y                       | Screening mammogram and US 1 year [1061]                             |
| SMUS2Y                       | Screening mammogram and US 2 years [1062]                            |
| SMMR1Y                       | Screening mammogram and MR 1 year [1063]                             |
| ABUS                         | ABUS [1064]                                                          |
|                              |                                                                      |
|                              |                                                                      |

BI_RADS Category = Assessment [3000] 

|   |   |
|---|---|
|External (PowerScribe) Value|Internal (Epic) Value|
|Addl Img|Need Additional Imaging Evaluation [0]|
|Neg|Negative [1]|
|Benign|Benign [2]|
|Prob Benign|Probably Benign [3]|
|Susp|Suspicious [4]|
|Hi Sug Mal|Highly Suggestive of Malignancy [5]|
|Biop - Malig|Known Biopsy-Proven Malignancy [6]|
|PPM - Marker|Post-Procedure Mammogram for Marker Placement [100]|
|Priors|Need Prior Mammograms for Comparison [200]|
|Wait - Path|Waiting for Pathology [1000]|
|Low Susp|Low Suspicion for Malignancy [4A]|
|Mod Susp|Moderate Suspicion for Malignancy [4B]|
|High Susp|High Suspicion for Malignancy [4C]|

      Breast density [3017] 

- A - Fatty [1] 
    
- B - Scattered fibroglandular density [2] 
    
- C - Heterogeneously Dense [3] 
    
- D - Extremely Dense [4] 
    

- Date of last breast screening exam - Should this even be captured as the community message vs. use what's in Epic. 
    

Recommendation Status  

|                     |                    |                     |
| ------------------- | ------------------ | ------------------- |
| Derived From BIRADS | External RIE Value | Internal Epic Value |
| BIRADS 0,3,4,5      | Need FU            | Needs Follow-up [1] |
| BIRADS 1, 2         | Close              | Closed [99]         |
| BIRADS 6            | Rslvd              | Resolved [100]      |