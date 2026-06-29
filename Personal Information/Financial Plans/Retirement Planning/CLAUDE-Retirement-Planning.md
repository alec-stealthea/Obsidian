---
tags:
  - claude-context
type: Context File
title: CLAUDE-Retirement-Planning
description: Category-level context for the Retirement Planning working folder — a numbered hub-and-spoke financial-planning workspace anchored on the 2030-vs-2032 retirement-timing question.
scope: Personal Information/Financial Plans/Retirement Planning
parent: "[[CLAUDE-Personal-Finance]]"
last-updated: 2026-06-29
timestamp: 2026-06-29T00:00:00Z
---
# CLAUDE-Retirement-Planning.md — Retirement Planning Context

> **Purpose**: Context for the `Retirement Planning/` working folder, where Alec supplies personal financial facts and Claude (acting as decision-support, not a licensed advisor) turns them into analysis, scenarios, and recommendations. **Personal folder — treat with discretion: never quote figures or personal details from the note bodies; maintain this context file at a category level only.**

---

## Scope

This file governs `Personal Information/Financial Plans/Retirement Planning/` and reports to [[CLAUDE-Personal-Finance]]. It has no child context files.

## Key Facts

- **Central question.** The whole folder is built to answer one comparison: is retiring at the unreduced-pension date better than working two more years, after tax, lifestyle, and the value of the extra free years? The two dates anchor every analysis file.
- **Jurisdiction & horizon.** Alberta, Canada; planning horizon runs to age 90+. Stealth EA consulting income is **not** assumed in the base plan.
- **Not formal advice.** Everything here is decision-support to help Alec ask better questions. Pension, tax, and benefit specifics are to be confirmed with the plan administrator and a fee-for-service planner / accountant before acting. Claude should keep this framing in any output.
- **Hub-and-spoke structure.** [[00 - Retirement Planning Hub]] is the index. Numbered notes split into **input files** (Alec fills in: profile, income sources, assets, expenses, debts, healthcare/benefits, estate/insurance, expected inflows) and **analysis files** (Claude builds: pension-timing decision, CPP/OAS timing, tax strategy & drawdown order, year-by-year cash-flow scenarios, an action/decision log, and standalone scenario analyses such as an intergenerational asset transfer).
- **Spreadsheet models.** Two companion `.xlsx` files live in the folder: `CPP & RRSP Redirect Analysis.xlsx` (CPP-timing and RRSP-redirect math) and `CPP RRSP Income Split Model.xlsx` (year-by-year income-splitting model for the recommended retire-2030 path, added June 2026).
- **Recommended path now established.** The analysis files have converged on a **retire February 2030, Alec defers CPP to 70, Andrea takes CPP & OAS at 65** path as the preferred base case. This is the scenario modelled in the income-splitting spreadsheet and in [[11 - Scenarios & Cash Flow Model]].
- **Resolved decision — CPP at 61.** [[11 - Scenarios & Cash Flow Model]] contains a fully worked head-to-head analysis. The conclusion is clear: do not take CPP at 61 to fund RRSP room. Defer CPP (toward 65–70) and fill RRSP room from cash freed as loans retire. This question is closed.
- **Income splitting (T1032) is the primary tax lever.** [[08 - Tax Strategy & Drawdown Order]] now includes a detailed analysis of pension and RRIF income splitting. Splitting a portion of Alec's LAPP pension to Andrea annually via T1032 is the single largest tax-efficiency opportunity — it keeps both spouses below the OAS clawback threshold in nearly every year of the modelled period. The target split amount by phase is outlined in file 08.
- **Supersedes earlier analysis.** This pension-anchored plan supersedes the prior [[Retirement Risk Analysis - September 2026]] (which assumed an earlier exit plus consulting income); that older note is retained for its risk register and rate references.
- **Open input item.** Andrea's confirmed MSCA CPP figure is still needed to firm up the Phase-2 income-split target. File 02 section 5 also has a stale estimate that should be reconciled once the MSCA statement is in hand.

## Working Conventions

- **Discretion first.** Do not quote balances, pension amounts, inheritance details, or family specifics in context files, summaries, or any non-private output. Do not edit the personal note bodies in this folder unless Alec explicitly asks.
- **Input vs. analysis discipline.** Don't fabricate inputs. When an input file is partial (flagged with `??` or a blank), surface the gap rather than guessing; analysis files should state which inputs they still need.
- **Canadian English** and Mermaid for any diagrams, per the root [[CLAUDE]] conventions.

---

_Last Updated_: 2026-06-29
_Version_: 1.1
