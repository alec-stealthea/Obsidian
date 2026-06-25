# Z32030 — Kinder Sharpie — ED test patient

Sample CIP webhook payload generated from **CI - Connect Care Sample Report Jan 14 2026.xlsx**. See [[CI RoI Sample JSON Responses]] for methodology and the EHS → ED correlation map.

- 11 distinct ED encounters (duplicate rows collapsed per CSN). The workbook's ED Visit Summary sheet carried 11 other PAT_IDs and none for Z32030 — the extract was not filtered to the test patient, so all ED encounters were reassigned to her per review on 2026-06-10. Original PAT_ID → CSN: Z32657→403020498983, Z32656→403020498957, Z32655→403020498916, Z8951→403020498845, Z30913→403020498778, Z32346→403020498777, Z32642→403020498741, Z32569→403020498729, Z32626→403020498617, Z32625→403020498609, Z31672→403020498591.
- Frequent-presenter pattern: 11 ED visits across 6 facilities, 2025-12-16 to 2025-12-19.
- 4 synthetic EHS incidents correlate to ambulance-linked arrivals via emergencyCSN = ED encounterId, matching destination facility, and incident time 40-60 minutes before arrival. The 2025-12-18 UAH visit is the anchor case — its workbook ED row already records Arrival Method = Ground Ambulance.
- EHS clinical content (complaints, impressions, Form 1/Form 10 alerts, alcohol/drug indicators) is fabricated using the new EHS Incident Summary fields in the data model — the workbook's APH Incidents sheet is empty.

> [!note] Payload file
> The JSON payload for this patient is in **Z32030 - Kinder Sharpie.json** (same folder, parser-valid). Upload it to the Teams channel and link it from the OneNote page for this patient.
