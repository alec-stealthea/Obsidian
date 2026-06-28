---
type: Note
title: "11 — Scenarios & Cash Flow Model"
description: "Analysis file."
timestamp: 2026-06-27T22:07:17Z
---

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
| 7 | **Take CPP at 61, redirect to RRSP** | 2030 or 2032 | 61 | Tests early-CPP-to-RRSP vs defer + fund room from freed loan cash — **resolved below** |

---

## CPP-at-61-redirect vs. defer — head-to-head (resolved)

*Triggered by the file 07 scenario. Question: with RRSP room you won't otherwise fill (file 08) and a break-even monthly cash position, is it worth taking CPP at 61 and redirecting it into the RRSP, vs. deferring CPP and filling the room from cash freed as loans retire? Real $, PV at age 61, real discount/return 3%, planning age 90. Marginal rate assumed 43% now / 33% in retirement.*

**Cash-flow reality (files 04/05).** You're break-even monthly now, but loans free cash on a schedule: Volvo **~$10.3k/yr from Nov 2026**, insurance **~$1.8k/yr ~2027**, Bolt **~$9.5k/yr ~2031**. Redirecting that freed cash (plus your existing ~$2k/yr voluntary RRSP) into the RRSP fills:
- **~$44k by a 2030 retirement** → ~$45k of the $89,071 room left unfilled.
- **~$83k by a 2032 retirement** → only ~$6.5k left. *Working to 2032 nearly fills the room on its own, with no need to touch CPP.*

**Lifetime CPP value (PV at 61, to 90).** Start 61 = **$268,800**; start 65 = **$296,000** (**+$27,200** vs 61); start 70 = **$312,600** (**+$43,800** vs 61). Taking CPP at 61 is the worst pure-CPP outcome by a wide margin.

**The trade, quantified (2030 path).** Using early CPP to fill the ~$45k unfilled room:
- **Gain:** the RRSP-deduction capture is only the bracket spread, ~10% (deduct 43%, withdraw 33%) ≈ **+$4,500** (plus modest tax-sheltered growth).
- **Cost:** the permanent indexed CPP reduction ≈ **−$27,200** (PV, vs deferring to 65).
- **Net ≈ −$22,600.** The deduction saved is nowhere near enough to offset the CPP haircut.

**Longevity check (the early-death hedge).** Even if you only live to **83** (your dad's age), PV still favours taking at 65 ($237k) over 61 ($226k). The 61-vs-65 crossover is ~**age 74** — you'd have to expect death before ~74 for early-61 to win. The hedge argument doesn't rescue it.

**Conclusion.**
> **Don't take CPP at 61 to fund the RRSP.** Defer CPP (toward 65/70) and fill the room from cash freed as your loans retire — which does ~half the job by 2030 and nearly all of it by 2032. The deduction you'd capture (~$4.5k) is dwarfed by the permanent indexed CPP reduction (~$27k PV), and the math holds even under your family-history longevity. Early CPP only wins if you expect to die before ~74, or if you need the cash to *spend* (not to shelter). For the ~$45k of room still unfilled on a 2030 path, fill it — if at all — from any non-registered/surplus cash, not from CPP; the cost of leaving it unfilled is only ~$4.5k of arbitrage.

*Caveats: ignores the small Post-Retirement Benefit from contributing while working 61–64 (nudges early-take up slightly) and the exact tax-sheltered growth on redirected CPP (also small) — neither changes the ranking. Supporting math: `CPP & RRSP Redirect Analysis.xlsx`.*

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
