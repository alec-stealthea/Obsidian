---
tags:
  - claude-context
type: Context File
title: CLAUDE-Retirement-Planning
description: Category-level context for the Retirement Planning working folder — a numbered hub-and-spoke financial-planning workspace anchored on the 2030-vs-2032 retirement-timing question.
scope: Personal Information/Financial Plans/Retirement Planning
parent: "[[CLAUDE-Personal-Finance]]"
last-updated: 2026-06-28
timestamp: 2026-06-28T00:00:00Z
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
- **Spreadsheet model.** A companion `.xlsx` cash-flow / contribution-redirect model lives in the folder and backs the scenario analysis notes.
- **Supersedes earlier analysis.** This pension-anchored plan supersedes the prior [[Retirement Risk Analysis - September 2026]] (which assumed an earlier exit plus consulting income); that older note is retained for its risk register and rate references.

## Working Conventions

- **Discretion first.** Do not quote balances, pension amounts, inheritance details, or family specifics in context files, summaries, or any non-private output. Do not edit the personal note bodies in this folder unless Alec explicitly asks.
- **Input vs. analysis discipline.** Don't fabricate inputs. When an input file is partial (flagged with `??` or a blank), surface the gap rather than guessing; analysis files should state which inputs they still need.
- **Canadian English** and Mermaid for any diagrams, per the root [[CLAUDE]] conventions.

---

_Last Updated_: 2026-06-28
_Version_: 1.0
