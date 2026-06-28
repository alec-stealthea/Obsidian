---
type: Note
title: "08 — Tax Strategy & Drawdown Order"
description: "Analysis file."
timestamp: 2026-06-28T00:00:00Z
---

# 08 — Tax Strategy & Drawdown Order

*Analysis file. How to withdraw from accounts in the most tax-efficient order, Alberta rates.*

---

## The accounts and their tax treatment
| Account | Tax on withdrawal | Forced withdrawals? |
|---|---|---|
| Pension (DB) | Fully taxable as income | Starts at retirement date |
| RRSP → RRIF | Fully taxable | RRIF minimums begin; must convert by end of year you turn 71 |
| LIRA → LIF | Fully taxable | Min and max annual limits |
| TFSA | Tax-free | None — most flexible |
| Non-registered | Tax on gains/dividends only | None |

## Your numbers (from files 02–03)
- **RRSP (Alec): $200,000**, with **$89,071 unused room** — the employment years to 2030/2032 are the last big chance to use it (top-bracket deduction now, withdraw later at a lower rate). Spouse RRSP: $275,000.
  - **Heads-up: this room will NOT be filled by retirement.** Current paycheck contributions won't max it before 2030/2032, so top-bracket deduction capacity is being left on the table each year. Filling it should be a priority — from any non-registered savings or extra salary, and (as a last resort) via the redirect-early-CPP route in file 07.
- **TFSA (Alec): $109,836 room — but it's a vacation flow-through, not long-term savings.** It's contributed and then withdrawn each year to fund travel, so do **not** count on a meaningful TFSA balance in retirement. The "TFSA as a clawback-free top-up bucket" lever below is therefore largely unavailable unless this changes — another reason to make the RRSP room work hard during the earning years.
- **No classic pre-65 window:** you retire *at* 65 (2030), so there's no 60–65 income gap. The equivalent opportunity is the **65–70 window if you defer CPP** — income would be just pension + OAS (≈ $76,600), leaving bracket room to draw the RRSP down before RRIF minimums and the CPP/OAS layer arrive.
- **OAS clawback threshold $95,323 (2026)** sits right at your projected income — every withdrawal decision should watch net income against it (see file 07).

## Drawdown sequencing questions (to be modelled)
- **65–70 window (if CPP deferred):** these lower-income years are the prime chance to draw RRSP down at low rates ("filling up" low brackets) before RRIF minimums and the CPP/OAS layer stack on — especially relevant under retire-2030-and-defer-CPP.
- Use TFSA to top up spending without raising taxable income (and OAS clawback).
- Order of spend: often non-registered → RRSP/RRIF (managed to bracket) → TFSA last, but the low-income early years can flip this.

## Income splitting with Andrea (the clawback lever)

*Added 2026-06-28. The point Alec raised: "we'll both get similar CPP, so no splitting opportunity." That's aiming at the wrong income source. CPP can't be split on a return anyway, and CPP **sharing** (Service Canada) does nothing when two spouses' CPP is close — so the near-equal CPP (his ~$18,092 vs her ~$17,185 at 65) is correctly a non-event. The real, large opportunity is splitting the **LAPP pension and RRIF income**, where the household is asymmetric.*

**What qualifies.** A LAPP defined-benefit pension is *eligible pension income* and can be split **at any age** — up to 50%, re-elected each year on form **T1032**. RRIF withdrawals qualify once the higher-income spouse is **65+**. CPP and OAS are **never** splittable. So the splittable pool is Alec's LAPP $67,700 (plus his RRIF once he's 65), and Andrea's LAPP $47,480 (validated, Feb 2030 — rarely worth shifting toward Alec).

**Why it matters here.** File 07 flags that Alec's *individual* income sits right at — and, on the deferred-CPP path, just over — the **$95,323 OAS clawback line**, while Andrea (LAPP ~$50k + CPP ~$17k + OAS ~$9k ≈ $76k) has roughly **$19k of headroom below it**. Shifting income from Alec to Andrea moves dollars that would be taxed at ~30.5% **plus** the 15% OAS recovery tax (≈ 45% effective) into Andrea's ~30.5% bracket — the prize is escaping Alec's clawback band, not ordinary bracket arbitrage. Each spouse also keeps their own $2,000 pension income credit and age amount.

**Target split by phase** (tune annually on the T1032):

| Phase | Years | Alec pre-split | Andrea pre-split | Move ≈ | Result |
|---|---|---|---|---|---|
| 1 — Andrea pre-65, Alec deferring CPP | 2030–~2033 | LAPP $67,700 + OAS $8,917 ≈ **$76,600** | LAPP **$47,480** | **~$14,600** of LAPP → Andrea | both ≈ $62,000; Alec's average rate drops, both far under clawback |
| 2 — both fully stacked (CPP at 70, both OAS on) | ~2035+ | $67,700 + CPP $25,690 + OAS $8,917 = **$102,307** | $47,480 + $17,185 + $8,917 = **$73,582** | **~$14,400** of LAPP → Andrea | both ≈ **$87,900** — **both under $95,323, full OAS retained for both, Alec's clawback eliminated** |
| 3 — RRIF minimums layer on | Alec 71+ (2036), Andrea 71+ (2039) | RRIF minimums push both up | — | re-tune split incl. RRIF income | minimize unavoidable clawback once combined income approaches 2× the threshold |

The Phase-2 move (~$14,400) is well within the 50%-of-$67,700 cap ($33,850), so there's ample room to absorb RRIF income in Phase 3.

**Spousal RRSP — lower priority than I first thought.** Andrea's RRSP ($275k) is *already larger* than Alec's ($200k), and her bigger future RRIF minimums partly offset his bigger pension — the household is already reasonably balanced. So Alec should fill his **own** $89,071 room for the top-bracket deduction now (worth ~36%+ at $200k salary); RRIF splitting at 65 handles the equalization later. A spousal RRSP would only add to the already-heavier side, so skip it.

**Action:**
- [ ] Andrea's LAPP is now **validated** ($47,480 at Feb 2030); still need her MSCA CPP statement to firm up the Phase-2 split. *(Note: file 02 §5 still shows a stale $50,000 estimate — reconcile it to $47,480.)*
- [ ] Build the year-by-year T1032 split into file 11's model (optimal % each year against both spouses' clawback lines).

## RRIF / forced-withdrawal planning
- RRSP must convert to RRIF by Dec 31 of the year you turn 71.
- Large RRSP at 71 → forced taxable minimums → potential OAS clawback. The 2030/2032 → 71 window is when to manage this down.

## Pre-retirement tax moves (the years to 2030/2032)
- [ ] Maximize RRSP room while earning employment income (highest-bracket deduction now, withdraw later at lower rate)
- [ ] Maximize TFSA room (tax-free, no clawback impact) — *currently used as a vacation flow-through, so no long-term balance is building; decide whether to keep some as permanent retirement savings*
- [ ] Pension adjustment may limit RRSP room — check your Notice of Assessment
- [ ] If Stealth EA is incorporated, coordinate any wind-down with personal income timing

## Recommendation (preliminary)
> **Use the remaining working years to load the $90,000 RRSP room** while you're in the top bracket (~$200k salary), then **unwind that RRSP in the 65–70 window if you defer CPP** — keeping net income under the $95,323 OAS-clawback line and shrinking the RRSP before age-71 RRIF minimums force taxable income up. TFSA is the flexible top-up that doesn't count toward clawback; fund it too. **Then run pension/RRIF income splitting (T1032) every year** — splitting ~$14k of LAPP to Andrea once both are fully stacked equalizes you near $88k each and keeps *both* of you under the OAS clawback line, which is the single biggest tax lever in this plan. Full sequencing and the year-by-year tax bill come together in file 11 once expenses (file 04) exist.

---

*Needs: file 02 income sources; file 03 account balances & room; file 07 CPP/OAS timing.*
*Confirm: [CRA tax rates](https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html).*
