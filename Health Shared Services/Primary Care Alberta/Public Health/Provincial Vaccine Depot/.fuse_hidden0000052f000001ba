---
tags:
  - claude-context
type: Context File
title: CLAUDE-PCA-PH-Vaccine-Depot
description: Context for the Provincial Vaccine Depot folder — the Epic Willow Inventory / VIMS assessment for Alberta's multi-tier provincial vaccine distribution.
scope: Health Shared Services/Primary Care Alberta/Public Health/Provincial Vaccine Depot
parent: "[[CLAUDE-PCA]]"
last-updated: 2026-06-19
timestamp: 2026-06-19T00:00:00Z
---
# CLAUDE-PCA-PH-Vaccine-Depot.md — Provincial Vaccine Depot Context

> **Purpose**: Context for the architecture assessment of how Alberta should manage provincial vaccine inventory and distribution — specifically whether **Epic Willow Inventory** (the module already live in Connect Care) can be extended to serve the **Provincial Vaccine Depot (PVD)**, or whether a purpose-built **VIMS** (Vaccine Inventory Management System) procured through the open RFP is the better fit.

---

## What This Folder Is

This is a day-job enterprise architecture engagement for **Primary Care Alberta (PCA) / Primary and Preventative Health Services (PPHS)**. The central question: extend the existing Connect Care Epic Willow Inventory vaccine build to cover the PVD and provincial distribution, stand up a new Willow implementation, or go to market for a non-Epic VIMS. The work feeds Alberta's response to an active **VIMS RFP** and an internal build-versus-buy decision.

The defining hard requirement is **third-party operational inventory**: tracking provincially funded vaccine held at ~1,500 independent community pharmacies and physician clinics the Province does not own or operate — multi-tier ordering (PVD → Regional Depots → community providers), facility-scoped access, and segregation of provincially funded from private stock.

## Key Facts (settled in the folder's documents)

- **Distribution model**: PVD → Regional Depots → Community Providers (pharmacies, physician clinics, public health clinics). PVD/regional/public-health staff are internal Epic HyperDrive users; only community pharmacies and physician clinics need external access.
- **Incumbent**: Alberta's current AVI (Alberta Vaccine Inventory) system at `vimsavi.alberta.ca` is an **STChealth (STC)** product (VOMS / STC|ONE), grown from the US Vaccines for Children model — the niche genuinely built for the third-party-inventory problem. Mainstream WMS vendors (Manhattan, Blue Yonder, SAP EWM, Oracle, Infor, NetSuite) assume the owner manages its own stock and are expected to fail the multi-tier mandatory requirement.
- **Three Epic Willow functional gaps** (from the Application Context Model): (1) Willow is always the *buyer* in its native X12 model and cannot natively receive an inbound X12 850 from an external ordering party; (2) no standard exists for Pharmacy Information Systems to report on-hand inventory back to a depot; (3) external community ordering. Proposed bridges: a custom **Community Vaccine Portal** (provider-portal-authenticated, brokering API calls into Connect Care), **IBM ACE** middleware to transform inbound 850 messages, and the **ADS / "Medicine Cabinet"** device-inventory pattern to report community on-hand levels back to a Vaccine Storage Unit.
- **Reference material in-folder**: the *Pharmacy Inventory Management Setup and Support Guide* and *Willow Inventory X12 Interface Setup and Support Guide* are downloaded from Epic Galaxy (vendor reference, do not treat as Alec's authored content); the *Vaccine Willow Inventory Movement Matrix* (.xlsx) holds workflow images across tabs.

## Folder Contents

- **Epic Willow Inventory Assessment Package** — the capability-assessment request prepared for Epic's response.
- **Epic Willow Gap Assessment - Alberta Instance Extension** — detailed fit/gap analysis of extending the Connect Care instance, cross-mapped to the RFP requirements.
- **SBAR - Epic Willow Extension for Provincial Vaccine Depot** — decision brief on extend vs. new build vs. non-Epic.
- **VIMS Market Scan - Vaccine Inventory Management Vendors** — sourced market scan of potential RFP respondents (public-health VIMS niche vs. mainstream WMS).
- **VIMS RFP Detailed Requirements** (+ .docx) — the mandatory/desirable requirements list (CR/SR codes) everything is mapped against.
- **Willow Inventory Provincial Vaccine - Application Context Narrative** (+ .archimate) — Stealth EA Application Context Model for the proposed solution, structured for extraction into Archi documentation fields.
- **Epic Willow VIMS Assessment Matrix - Initial Proposed Responses**, **Review - Pharmacy Inventory Management Setup and Support Guide**, and the Epic Galaxy reference PDFs / movement-matrix workbook noted above.

## Working Conventions

- Day-job work — keep separate from Stealth EA intellectual property. (Note the Application Context Narrative uses the *Stealth EA Application Context Model* framework as a method, but the deliverable itself is HSS/PCA work.)
- Requirements are referenced by RFP code (CR-xx corporate, SR-xx solution); cite those codes when mapping capability to requirement.
- Market-scan and vendor claims should stay source-linked for follow-up verification, matching the existing documents' practice.
- Epic Galaxy guides are vendor reference — do not modify or treat as authored content.

---

_Last Updated_: 2026-06-19
_Version_: 1.0
