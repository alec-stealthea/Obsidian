---
type: Note
title: "02 — Income Sources"
description: "Input file."
timestamp: 2026-06-27T20:04:50Z
---

# 02 — Income Sources

*Input file. This is the most important input. The pension estimates at both dates drive the entire 2030-vs-2032 analysis.*

---

## 1. Defined-benefit pension (the backbone)

Request an official estimate from your plan administrator for **both** retirement dates. Most Alberta public-sector plans (e.g. LAPP, PSPP) provide an online estimator and will run custom estimates on request.

### Alec's Pension

| Field                                         | Sept 2026             | Feb 2030            | Feb 2032            |
| --------------------------------------------- | --------------------- | ------------------- | ------------------- |
| Plan name                                     | LAPP                  | LAPP                | LAPP                |
| Annual pension (gross)                        | 45,750                | 67,700              | 77,600              |
| Is it reduced? (early-retirement reduction %) | Yes                   | No                  | No                  |
| Pensionable service years                     | 14.6538 (Dec 31 2025) | ≈18.74 (proj.)      | ≈20.74 (proj.)      |
| Highest-average-salary used                   | 200,000               | ≥200,000 (assume ≥) | ≥200,000 (assume ≥) |
| Bridge benefit to 65 (if any)                 |                       |                     |                     |
| Survivor option chosen (e.g. 60% J&S)         | Unsure                | Unsure              | Unsure              |
|                                               |                       |                     |                     |
### Andrea's Pension


| Field          | Now    | Feb 1, 2030 | Feb 1, 2032 |
| -------------- | ------ | ----------- | ----------- |
| Plan Name      | LAPP   | LAPP        | LAPP        |
| Annual Pension | 31,390 | 47,480      | 51,330      |


**Indexing / inflation protection** (critical):
- Pension is indexed to 60% of the Alberta Consumer Price Index
- Source / confirmation: https://www.lapp.ca/page/cost-of-living-increases

> **Why both dates matter:** the gap between these two columns *is* the financial half of your retire-2030-vs-2032 decision. Get these numbers first.

## 2. CPP (Canada Pension Plan)

*Figures from My Service Canada Account are **monthly**; annual = ×12 (derived below).*

### Alec's CPP

| Start age                           | Monthly   | Annual     |
| ----------------------------------- | --------- | ---------- |
| Now / age 61 (Jun 27 2026, reduced) | $1,109.63 | $13,315.56 |
| 65 (baseline)                       | $1,507.65 | $18,091.80 |
| 70 (enhanced / deferred)            | $2,140.86 | $25,690.32 |

### Andrea's CPP

*Estimate only — confirm via her [My Service Canada Account](https://www.canada.ca/en/employment-social-development/services/my-account.html) Statement of Contributions. At ~$100k/year she earns above the 2026 YMPE (~$74,900), so a long contribution history puts her **at or very near the CPP maximum**. Figures below assume ~95% of max as a planning number; she may well qualify for the full max.*

| Start age                      | Monthly (≈95% max) | Annual     | Full-max ceiling (monthly / annual) |
| ------------------------------ | ------------------ | ---------- | ----------------------------------- |
| 60 (reduced 36%)               | ~$917              | ~$11,000   | $964.90 / $11,578.80                |
| 65 (baseline)                  | ~$1,432            | ~$17,185   | $1,507.65 / $18,091.80              |
| 70 (deferred +42%)             | ~$2,034            | ~$24,405   | $2,140.86 / $25,690.32              |

- Statement of Contributions reviewed? ☐  — [My Service Canada Account](https://www.canada.ca/en/employment-social-development/services/my-account.html)

## 3. OAS (Old Age Security)

- Eligible at 65? Years of Canadian residency after 18: `43` (need 40 for full → eligible for **full** OAS)
- Estimated OAS at 65: **$743.05/month → $8,916.60/year**
- **Andrea's OAS at 65 (2033):** **full OAS — $743.05/month → $8,916.60/year** (in 2026 dollars). **Confirmed: born in Canada, never left → 40+ years residency met, full OAS, no proration risk.**
- Clawback (OAS recovery tax): begins at **$95,323** net income (2026), 15¢ per $1 above; fully eliminated ~$152,062 (age 65–74). **This threshold is per-person, not household** — so Andrea's projected retirement income (LAPP ~$50k + CPP ~$17k + OAS ~$9k ≈ $76k) sits *below* it, meaning **no clawback on her OAS** even though combined household income is higher. See file 07 — Alec's projected income sits right at this threshold, so it's a live consideration for his side, not a theoretical one.

## 4. Other income

| Source | Annual amount | Starts | Indexed? | Notes |
|---|---|---|---|---|
| Consulting (Stealth EA) | $0 (base plan) |  |  | Excluded per current plan; note any floor you'd still pursue |
| Rental / property |  |  |  |  |
| Annuities |  |  |  |  |
| Part-time / phased work |  |  |  |  |
| Other |  |  |  |  |

## 5. Spouse/partner income sources (if applicable)
| Source | Annual amount | Starts   | Notes                                                             |
| ------ | ------------- | -------- | ----------------------------------------------------------------- |
| LAPP   | $50,000       | May 2030 | This is an estimate, need to get the actual numbers from my wife. |

---

*Reference rates to confirm (update annually):*
- *CPP & OAS current rates — [Canada.ca public pensions](https://www.canada.ca/en/services/benefits/publicpensions.html)*
- *OAS clawback threshold — [CRA OAS repayment](https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/old-age-security-payments/repayment-overview.html)*
