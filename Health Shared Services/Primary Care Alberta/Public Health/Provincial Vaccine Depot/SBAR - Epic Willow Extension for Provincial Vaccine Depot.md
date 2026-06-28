---
type: Architecture Decision
status: Draft
format: SBAR
title: "SBAR: Extending Epic Willow Inventory Vaccine Build to Support the Alberta Provincial Vaccine Depot and Distribution"
description: "Date: June 5, 2026"
timestamp: 2026-06-26T19:19:06Z
---

# SBAR: Extending Epic Willow Inventory Vaccine Build to Support the Alberta Provincial Vaccine Depot and Distribution

**Date:** June 5, 2026  
**Prepared by:** Primary Care Alberta – Public Health / Provincial Vaccine Depot Program  
**For:** Decision-makers considering whether to extend existing Epic Willow vaccine inventory configuration to support the Provincial Vaccine Depot (PVD) and provincial distribution function

---

## Situation

Alberta Primary and Preventative Health Services (PPHS) and Primary Care Alberta (PCA) are evaluating whether the existing Epic Willow Inventory vaccine build — currently configured for vaccine inventory management at Connect Care clinical sites — can be extended to also serve the Alberta Provincial Vaccine Depot (PVD) and its multi-tier provincial vaccine distribution model.

The question is not whether Epic Willow can be implemented from scratch for this purpose. The question is whether the existing build, already live and configured within the Connect Care environment, provides a viable foundation — or whether the differences in operating model, user base, and functional requirements are significant enough that extension would constitute a materially new implementation rather than a configuration expansion.

A decision is needed to determine whether to pursue extension of the existing build, a new Willow implementation scoped to the PVD, or an alternative non-Epic solution, prior to responding to the current VIMS RFP and committing implementation resources.

---

## Background

### Existing Epic Willow Vaccine Inventory Build

The current Epic Willow Inventory vaccine build supports vaccine inventory management at clinical sites within the Connect Care ecosystem. This build is designed to:

- Track vaccine inventory at the facility/department level
- Support clinical ordering and dispensing workflows tied to patient encounters
- Manage lot and expiry tracking within the pharmacy/medication management framework
- Serve pharmacy staff and clinicians operating within the Connect Care security and workflow model

### Provincial Vaccine Depot Operating Model

The PVD operates as the apex of a three-tier provincial vaccine supply chain:

| Tier | Organization | Role |
|------|-------------|------|
| Tier 1 | Provincial Vaccine Depot (PVD) | Central warehouse: receipt, storage, allocation, picking, packing, shipping, recall coordination |
| Tier 2 | 13 Regional Vaccine Depots / PCA Vaccine Depots | Receive from PVD, redistribute to providers, maintain local stock |
| Tier 3 | ~1,500+ community providers (pharmacies, physician clinics, public health clinics) | Order vaccine, receive, manage local inventory, report wastage and returns |

The PVD manages approximately **$150 million** in publicly funded vaccines and biologics annually. Core operations include allocation, redistribution during shortages, recall management, cold chain incident response, wastage tracking, and province-wide inventory accountability reporting — all largely independent of patient clinical encounters.

### Incumbent System: Alberta Vaccine Inventory (AVI)

The current provincial vaccine ordering and inventory system is the Alberta Vaccine Inventory (AVI) application (an STC/STChealth VOMS-based product), used by community providers and vaccine depots today. **The most significant gap in AVI is the absence of interfaces to automate inventory transactions.** All inventory data is manually entered:

- Tier 3 community providers must manually enter orders, receipts, reconciliations, and wastage
- Vaccine depots already operating on Epic Willow Inventory must manually re-enter the same transactions into AVI, creating double data entry between the two systems

Any replacement VIMS that does not address transaction automation and integration would perpetuate this manual burden across ~1,500+ sites and the depot network.

### VIMS RFP Context

An RFP is in progress for a Vaccine Inventory Management System (VIMS). The RFP distinguishes the VIMS explicitly from an EMR, pharmacy information system, or immunization registry. Mandatory requirements include:

- SaaS cloud delivery with web-based access (no local installation)
- Multi-tier ordering and distribution model with at least one comparable production reference client
- Responsive UI/UX compliant with GoA and PPHS standards
- Performance within retail-level ISP bandwidth (≤10 Mbps)

---

## Assessment

### Where the Existing Willow Build Aligns

The current Willow build provides a relevant starting point for several foundational capabilities:

- **Lot and expiry tracking** — Willow already tracks vaccine lots and expiry dates; this is directly applicable to PVD requirements (B1, B2)
- **Inventory receiving** — product receipt, lot capture, and storage management exist within the current build
- **Inventory adjustments and reason codes** — Willow supports on-hand quantity adjustments with audit history (B5)
- **Cold chain and wastage reason codes** — configurable reason codes for wastage and cold chain incidents are within scope of the existing Willow framework (B7, B8)
- **Product master management** — vaccine product master data is already maintained within the system

### Closed-Loop Advantages of the Epic Platform

Beyond core inventory mechanics, Epic offers integration advantages that a standalone VIMS cannot match without interface development:

- **Elimination of double entry for Willow sites** — depots and departments already on Epic Willow Inventory would transact in a single system, directly addressing the manual re-entry burden that exists today between Willow and AVI
- **Closed-loop administration** — for departments that both manage inventory and administer vaccine, Epic links supply chain transactions to the clinical record, enabling more than supply chain management alone: patient notifications and follow-up are part of the same workflow
- **Adverse Events Following Immunization (AEFI)** — AEFI are tracked in Epic, so inventory, administration, and safety surveillance share one platform rather than requiring cross-system correlation

These advantages apply fully only to sites operating within Connect Care. Tier 3 community providers — the majority of the user base — are outside Epic, so the closed-loop benefit does not extend to them unless they are brought into an Epic access model (see gap 3 below).

### Interoperability Standards Consideration — HL7 v3

The RFP's mandatory data standards requirement (AD-10) asks for HL7 v2 and/or v3 support. This carries an Alberta-specific risk: Alberta's provincial integration layer is one of the few HL7 v3 implementations in active use anywhere. Alberta's immunization messaging into Netcare is HL7 v3-based — including the Immunization Candidate Query used to display immunization information in the Alberta Netcare Portal ([Alberta Immunization HL7 Messaging Specification v1.5](https://open.alberta.ca/publications/immunization-messaging-specifications-version-1-5)) — reflecting the pan-Canadian HL7 v3 standards hosted by Canada Health Infoway ([Infoway HL7 v3/CDA](https://infocentral.infoway-inforoute.ca/en/standards/canadian/hl7-v3)).

Market adoption of HL7 v3 messaging outside Canada is minimal. The standard failed to gain vendor traction due to its complexity and lack of backward compatibility with v2; HL7 v2 remains the dominant messaging standard (roughly 95% of US healthcare organizations), with FHIR as the recognized successor ([ITR: HL7 v2 vs v3 industry adoption](https://www.itrvn.com/blogs/hl7-v2-vs-hl7-v3-key-differences-and-industry-adoption), [HL7/FHIR comparison](https://build.fhir.org/comparison-v3.html)).

The practical implication: VIMS proponents will almost certainly satisfy AD-10 with HL7 v2 (and possibly FHIR) only. Native HL7 v3 support should not be expected from any vendor, Epic included. Any integration between a VIMS and Alberta's v3-based provincial assets (e.g., Netcare immunization) should be planned as a translation/interface-engine requirement rather than assumed vendor capability — a cost and complexity factor common to all three paths, though smallest for Path 1 where Connect Care's existing provincial integrations already handle the v3 boundary.

### Where Significant Gaps Exist

The following areas represent material functional or architectural gaps between the existing build and PVD/distribution requirements. These gaps are not minor configuration items — several would require Epic development, major configuration extensions, or third-party solutions:

**1. Multi-Tier Distribution Model (A2, A3, A4)**  
The current build is a single-tier facility inventory model. Modeling PVD → 13 regional depots → 1,500+ community providers as a hierarchical ordering and distribution network is architecturally distinct. Depot-to-depot transfers, tier-specific ordering rules, and product list eligibility by provider type are not present in the current build.

**2. Independence from Patient Encounters**  
The existing build is embedded in clinical encounter and medication management workflows. The VIMS must operate without requiring patient encounters to trigger or document vaccine movement. This is a fundamental operating model difference. Workflows, documentation prompts, and reporting that assume an encounter context would need to be decoupled or rebuilt.

**3. External Provider Access at Scale**  
Approximately 1,500 community pharmacies and physician clinics must be able to access the system to place orders, receive shipments, manage inventory, and submit wastage reports — without becoming full Connect Care clinical users. This requires an external access model (such as Epic's MyChart/Community provider portal, or an equivalent) that is not part of the current vaccine inventory build, and which carries its own implementation, security, and licensing considerations.

**4. Recall Management at Provincial Scale (A7)**  
Identifying every affected lot across all tiers, notifying users, freezing inventory, coordinating returns, and reporting recall completion across 1,500+ sites is a province-wide workflow. The current build supports individual site inventory management and does not include a provincial recall coordination workflow.

**5. Redistribution and Shortage Response (A8, A9, A10)**  
Identifying available inventory province-wide, locating near-expiry lots across tiers, and initiating coordinated transfers during shortages or emergencies requires cross-organizational inventory visibility. The current single-entity build does not support cross-organization inventory aggregation for redistribution decisions.

**6. Order Approval Workflows with Variance Thresholds (C2, C5, C6)**  
Depot-level order review, variance threshold enforcement, exception justification and capture, and multi-tier approval routing are not features of the existing Willow vaccine build. These would require significant workflow configuration or custom development.

**7. Province-Wide Reporting (RNA-01, RNA-02, RNA-03, RNA-04)**  
The RFP requires reporting across all three tiers including distribution reports by site, wastage reporting, near-expiry reporting, and inventory reconciliation. The current build produces facility-level pharmacy/medication management reports, not provincial supply chain accountability reports.

**8. Multi-Organization Data and Permission Segregation**  
The PVD, regional depots, and community providers are separate legal entities with distinct inventory ownership, data access boundaries, and accountability requirements. The current build operates within a single Connect Care organization model and does not include the role-based, organization-scoped data segregation needed for a multi-organization provincial model.

### RFP Mandatory Requirements — Compatibility Check

| Mandatory Requirement | Current Build Status |
|-----------------------|---------------------|
| SaaS cloud delivery | Connect Care is an HSS-hosted Epic instance in Alberta data centres (Canadian hosting requirement met — June 11, 2026); organizational and licensing scope would need to be confirmed |
| Web-based frontend, no local install | Satisfied — Epic Hyperdrive / MyChart / Community Access portals are web-based |
| Multi-tier ordering and distribution model with reference client | **Not met** — current build is single-tier facility inventory; no comparable multi-tier provincial reference exists within the current configuration |
| Responsive UI/UX compliant with GoA/PPHS standards | Requires assessment; Epic's standard UI may not have been evaluated against GoA/PPHS UI/UX standards |
| ISP bandwidth performance (≤10 Mbps) | Requires Epic confirmation for community provider access at scale |

### Summary of Fit Assessment

| Dimension | Assessment |
|-----------|-----------|
| Core inventory mechanics (lot, expiry, adjustments) | Good fit — existing build is applicable |
| Single-site warehouse management (PVD internal) | Moderate fit — requires configuration extension |
| Multi-tier distribution and ordering | Poor fit — requires major new build |
| External community provider access | Poor fit — requires a separate access model and significant configuration |
| Patient-encounter independence | Poor fit — fundamental operating model decoupling required |
| Provincial recall and shortage response | Poor fit — province-wide workflows do not exist in current build |
| Multi-organization data segregation | Poor fit — requires architectural extension |
| Province-wide reporting | Poor fit — current reporting is facility-scoped |

---

## Recommendation

**The existing Epic Willow vaccine inventory build cannot be extended to the PVD and provincial distribution function through configuration alone. Proceeding would constitute a materially new implementation, not an extension.**

The core inventory mechanics in the existing build (lot tracking, expiry, adjustments, product master) are a useful foundation. However, the multi-tier distribution model, external provider access for 1,500+ sites, patient-encounter independence, provincial recall management, and cross-organization reporting represent gaps of a different order — they require new architecture, new Epic licensing, new workflows, and potentially Epic product development.

**Three paths forward should be formally evaluated:**

1. **Epic Willow — New Provincial Implementation**  
   Treat the PVD and VIMS as a new Epic implementation that leverages the existing Connect Care platform and licensing infrastructure but is scoped and built as a standalone provincial supply chain solution. Requires a formal Epic capability assessment (the assessment package in this folder has already been prepared for this purpose), Epic commitment on the key capability gaps, and commercial/licensing clarity.

2. **Purpose-Built VIMS (Non-Epic)**  
   Pursue a dedicated vaccine inventory management system through the current RFP process. Better precedent exists for multi-tier provincial vaccine distribution in purpose-built VIMS products. Eliminates Epic architectural constraints but introduces integration complexity with Connect Care for data sharing. A non-Epic VIMS without automated interfaces to Willow would recreate the central weakness of the incumbent AVI system — manual double entry at Willow sites — and would leave patient notification, follow-up, and AEFI tracking in Epic disconnected from supply chain data. Interface requirements to Willow should therefore be treated as a non-negotiable evaluation criterion for this path.

3. **Hybrid Model**  
   Deploy a purpose-built VIMS for the PVD and distribution tiers, with integration back to Epic Willow for site-level inventory visibility at Connect Care clinical sites. This preserves the existing clinical build — including the closed-loop administration, patient follow-up, and AEFI tracking that Epic provides at Connect Care sites — while meeting the VIMS RFP requirements with a fit-for-purpose solution. The viability of this path depends on the automated VIMS-to-Willow interfaces that AVI lacks today.

**Recommended immediate action:** Obtain Epic's formal response to the Capability Assessment Package (already prepared, dated June 4, 2026) before committing to any path. Epic's responses on architecture, complexity ratings, reference clients, and commercial model will determine whether Path 1 is viable within the RFP timeline and budget constraints. Concurrent RFP evaluation of non-Epic options should proceed in parallel to preserve optionality.

---

*References: Epic Willow Alberta VIMS Detailed Assessment Package (June 4, 2026); VIMS RFP Detailed Requirements List (Attachment #1 — Mandatory Requirements and Desirable Provisions)*
