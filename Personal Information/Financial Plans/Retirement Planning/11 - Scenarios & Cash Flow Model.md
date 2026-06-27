# 11 — Scenarios & Cash Flow Model

*Analysis file. The integrated year-by-year projection that ties every other file together. I build this last, once 01–10 are populated. Likely paired with a spreadsheet for the math.*

---

## Scenarios to run

| # | Scenario | Retirement date | CPP start | Key assumption |
|---|---|---|---|---|
| 1 | **Base — Retire 2030** | 2030 | 65 | Pension + savings, no consulting |
| 2 | **Retire 2030, defer CPP to 70** | 2030 | 70 | Tests RRSP drawdown in bridge years |
| 3 | **Base — Work to 2032** | 2032 | 65 | Higher pension, 2 yrs more saving |
| 4 | **Work to 2032, defer CPP to 70** | 2032 | 70 |  |
| 5 | **Stress test** | either | — | Higher inflation, lower returns, longer life |

## Model structure (year-by-year, retirement → age 90+)
Columns to project each year:
- Age (you / spouse)
- Pension income (+ bridge until 65)
- CPP / OAS (once started)
- Investment withdrawals (RRSP/RRIF, TFSA, non-reg)
- **Total gross income**
- Estimated tax (Alberta)
- **After-tax income**
- Spending need (phased, from file 04, inflated)
- **Surplus / (shortfall)**
- Portfolio balance carried forward

## Key outputs
- Does each scenario fund spending to the planning age without running out?
- Portfolio value at age 90 (legacy / cushion)
- Lowest portfolio point and worst year (sequence-of-returns exposure)
- **The headline number:** how much more (after-tax, lifetime) does working to 2032 actually deliver vs. 2030?

## Assumptions to set (with you)
| Assumption | Value | Notes |
|---|---|---|
| Inflation | `__%` | 2–3% typical |
| Investment return (real) | `__%` | conservative for a retiree mix |
| Pension indexing | from file 02 |  |
| Planning-to age | from file 01 |  |

> When inputs are ready, I can also build this as an `.xlsx` model so you can flex the assumptions yourself.

---

*Needs: everything. This is the synthesis step.*
