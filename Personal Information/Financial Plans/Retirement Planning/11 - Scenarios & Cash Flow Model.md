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
| 6 | **Inheritance overlay** | 2030 | 65 | Scenario 1 + conservative lump sum — see [[14 - Inheritance & Expected Inflows]]. Run low ($200k) / mid ($400k) / high ($1M+) cases. Kept OUT of base scenarios. |

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
| Inflation (CPI) | 2.5% | Standard default — flex 2–3% |
| Investment return (real) | ~3% | Conservative retiree mix (≈5.5% nominal) |
| Pension indexing | 1.5%/yr | 60% of CPI per file 02 |
| Planning-to age | 90 (year 2055) | From file 01 |
| OAS clawback threshold | $95,323 (2026), grows w/ CPI | From file 07 |

> When inputs are ready, I can also build this as an `.xlsx` model so you can flex the assumptions yourself.

## Status: what's ready vs. blocked
- **Ready now:** income lines (pension both dates, CPP at 61/65/70, OAS), indexing, planning age, asset starting balances, **spending floor/phases (file 04 ✅)**, debt run-off timeline, and the assumptions above.
- **Quick read (pre-model):** household income at a 2030 retirement (~$145k gross / ~$115k after-tax) covers the comfortable target even with the mortgage running — see file 06. The full model will pressure-test this against inflation, the mortgage, and CPP-timing choices.
- **Still useful for precision:** TFSA/LIRA/non-registered balances (file 03), the mortgage rate (to fix the payoff year), and Andrea's confirmed pension/CPP/OAS figures and start dates.

> **Next step:** build the year-by-year `.xlsx` for the 5 scenarios. Most decision-relevant: Scenario 1 (retire 2030) — confirmed feasible on a rough basis; the model will show the portfolio path to 90 and how much cushion 2032 actually adds.

---

*Inputs now sufficient for a first full model. This is the synthesis step.*
