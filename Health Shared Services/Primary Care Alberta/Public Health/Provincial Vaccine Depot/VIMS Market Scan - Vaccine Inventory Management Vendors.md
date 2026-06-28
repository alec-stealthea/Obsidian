---
type: Reference
title: "VIMS Market Scan - Vaccine Inventory Management Vendors"
description: "0# VIMS Market Scan — Vaccine Inventory Management Vendors"
timestamp: 2026-06-26T19:19:06Z
---

0# VIMS Market Scan — Vaccine Inventory Management Vendors

**Date:** June 12, 2026
**Purpose:** Identify the potential vendor marketplace capable of responding to the VIMS RFP, in support of the alternatives analysis in [[SBAR - Epic Willow Extension for Provincial Vaccine Depot]]. Requirements references are to [[VIMS RFP Detailed Requirements]].
**Method:** Web-based market scan, June 2026. All claims are linked to sources for follow-up verification.

---

## The Defining Requirement: Third-Party Operational Inventory

The hardest requirement in this RFP is not warehouse management — it is managing **operational inventory levels at sites the Province does not own or operate**. Tier 3 is ~1,500 independent community pharmacies and physician clinics holding provincially funded vaccine. The system must let those third parties order (SR-02), receive, count, reconcile, and report wastage on stock they physically possess but do not own, with facility-scoped role-based access (SR-04) and segregation of provincially funded from private inventory (SR-08).

Mainstream inventory and warehouse management products (Manhattan, Blue Yonder, SAP EWM, Oracle, Infor, NetSuite) are built on the opposite assumption: the system owner manages its *own* stock across its *own* locations. Their closest analogue — vendor-managed inventory (VMI) or consignment functionality — assumes a small number of EDI-connected trading partners, not 1,500 self-service external users with web logins. This is the structural reason most inventory applications will fail the RFP's mandatory multi-tier requirement (CR-01, SR-02).

The one market segment built on the *correct* assumption is the public health VIMS niche. These products grew out of the US Vaccines for Children (VFC) program — the same model as Alberta's: publicly funded vaccine held and administered by private providers, with the public authority needing accountability without ownership. That is why the credible respondent pool is narrow but real.

---

## Segment 1 — Purpose-Built Public Health VIMS (Strong Fit on Third-Party Inventory)

### STChealth (VOMS / STC|ONE) — the Alberta incumbent

STC's Vaccine Ordering and Management System (VOMS) manages vaccine ordering and inventory for governments in the US and Canada, designed to give jurisdiction administrators "electronic visibility to all providers in the state/region" ([STChealth Solutions](https://stchealth.com/solutions-2/), [Ohio VOMS module documentation](https://ohioimpactsiis.org/siisprod/help/VOMS_module.htm)).

**Critical context: Alberta's current AVI system is an STC product.** The Alberta Vaccine Inventory system at [vimsavi.alberta.ca](https://vimsavi.alberta.ca/prod/) was "developed by Scientific Technologies Corporation (STC)" per the [AVI Vaccine Ordering and Management Training Guide](https://s3-us-west-2.amazonaws.com/stc-app-ab/pdf/Vaccine%20Ordering%20and%20Management%20Training%20Guide.pdf), and STC published [AVI pharmacy training material as recently as May 2025](https://s3-us-west-2.amazonaws.com/stc-app-ab/pdf/2025-05%20AVI%20Pharmacy%20Training.pdf). AVI already implements community pharmacy/clinic self-registration, ordering, receiving, transfers from wholesalers, and weekly reconciliation ([AHS AVI page](https://www.albertahealthservices.ca/cdc/Page13604.aspx)) — i.e., the third-party operational inventory model the RFP demands.

Fit assessment: strongest CR-01 position in the market (multi-tier production references in Alberta itself plus US state programs such as [TennIIS](https://www.tn.gov/health/cedep/immunization-program/ip/tenniis.html)). The RFP reads functionally as an AVI replacement/modernization, which STC will almost certainly bid. Open questions: platform modernity (responsive UI/UX per UE-08), Canadian data hosting (AD-03 — the AVI training assets sit on US-west AWS), and warehouse-grade Tier 1 operations (picking/packing SR-09, GS1 barcode SR-05).

### InductiveHealth / Envision Technology Partners (WebIZ)

WebIZ "tracks vaccine inventory from ordering to delivery through administration," with multi-level inventory tracking and VTrckS API integration for orders, returns, and wastage ([InductiveHealth WebIZ](https://www.inductivehealth.com/webiz/), [Envision Products](https://envisiontechnology.com/products/)). Envision supports 20+ CDC IIS jurisdictions and was [acquired by InductiveHealth in early 2025](https://www.inductivehealth.com/resource/inductivehealth-acquires-envision-technology-partners/); the combined firm serves public health departments in over 40 US states. Fit: proven multi-tier public-sector vaccine ordering at scale; US-centric, so Canadian hosting (AD-03), GoA/PPHS UI standards, and willingness to bid provincially are the questions.

### Panorama Inventory Module (comparator, unlikely proponent)

Panorama's Vaccine Inventory module is used by most other provinces — BC, Saskatchewan, Manitoba, Ontario, Quebec, New Brunswick, Yukon, Nova Scotia ([eHealth Saskatchewan](https://www.ehealthsask.ca/services/panorama/Pages/Immunizations.aspx), [Canada Health Infoway BC benefits evaluation](https://www.infoway-inforoute.ca/en/component/edocman/resources/reports/benefits-evaluation/1707-panorama-vaccine-inventory-module-benefits-evaluation-report-ministry-of-health), [CBC on Nova Scotia](https://www.cbc.ca/news/canada/nova-scotia/digital-database-infectious-disease-outbreaks-1.5121473)). It demonstrates that multi-tier provincial vaccine inventory is a solved problem in Canada, but it is a legacy jurisdiction-hosted platform, not a SaaS product a proponent would bid (UE-01 mandatory), and Ontario has signalled decommissioning activity ([OMA decommission letter, Dec 2025](https://www.oma.org/siteassets/oma/temp-content/decommission-letter-2025-12-29_en.pdf)). Useful as a reference model and for cross-jurisdictional lessons, not as a bidder.

### mSupply / Open mSupply (Sustainable Solutions)

mSupply is medical inventory software widely used in low- and middle-income countries for procurement, distribution, and dispensing across health system levels — central warehouse through primary health facilities — with an integrated cold chain module used for COVID-19 vaccine batch tracking ([DFAT Open mSupply investment profile](https://indopacifichealthsecurity.dfat.gov.au/investments/open-msupply)). Architecturally one of the best matches for multi-tier vaccine logistics anywhere. Practical concerns: corporate scale for a Canadian provincial procurement, local presence, GoA compliance overhead. A possible dark-horse bidder, likely needing a Canadian SI partner.

### CANImmunize (Ottawa)

Canadian firm offering ClinicFlow for immunization clinic operations and government immunization programs ([CANImmunize](https://www.canimmunize.ca/), [For Government](https://app.canimmunize.ca/en/for-government)). Inventory capability is clinic-operations-scoped rather than provincial supply chain depth; multi-tier depot distribution is not their demonstrated core. Plausible as a partner or a stretch bidder; CR-01 (multi-tier production reference ≥1 year) is the hurdle.

---

## Segment 2 — Platform-Configured Solutions (Salesforce, Microsoft + SI)

COVID-era vaccine management offerings built on CRM platforms:

| Offering                                                   | Notes                                                                                                                                                                                                                                                                                                                                                                                            | Sources                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Salesforce Vaccine Cloud                                   | Inventory management, scheduling, outreach; 150+ agencies at 2021 peak. Built for campaign management, not depot logistics. External provider access is a genuine strength (portal/Experience Cloud); warehouse operations (SR-09 picking/packing, SR-05 GS1 barcode) and multi-tier order approval would be custom build. Post-COVID product investment unclear — most references date to 2021. | [Salesforce Vaccine Cloud announcement](https://www.salesforce.com/news/stories/vaccine-cloud-enhancements-updates/), [adoption press release](https://www.salesforce.com/news/press-releases/2021/03/18/vaccine-cloud-vaccinations-momentum/), [capabilities doc](https://help.salesforce.com/s/articleView?id=service.vaccine_mgt_capabilities.htm&language=en_US&type=5) |
| Deloitte VaccineConnect                                    | PHAC's national system: order processing, supply chain visibility, inventory tracking for FPT distribution. A $59.1M custom build with a critical OAG audit (delayed wastage/expiry capabilities), not a commercial SaaS product with a licence model. Deloitte could nonetheless propose a derivative.                                                                                          | [OAG Report 9 — COVID-19 Vaccines](https://www.oag-bvg.gc.ca/internet/English/att__e_44177.html), [PHAC internal audit of VaccineConnect](https://www.canada.ca/en/public-health/corporate/transparency/corporate-kmanagement-reporting/internal-audits/reports/development-vaccineconnect.html)                                                                            |
| Infosys Public Services VAMS, WinWire (Azure), MTX SafeVax | COVID-era vaccine administration/inventory solutions on enterprise platforms; same pattern — registration/administration strength, thin depot logistics.                                                                                                                                                                                                                                         | [Infosys Public Services](https://www.infosyspublicservices.com/health-human-services-enterprise/vaccine-management-solution.html), [WinWire on Azure Marketplace](https://marketplace.microsoft.com/en-us/product/saas/winwire-1937601.vaccine-management-solution?tab=overview)                                                                                           |

Risk pattern for this segment: they can satisfy SaaS, UI/UX, and external access mandatories, but the multi-tier *production reference client* (CR-01, mandatory) is weak post-COVID, and depot warehouse operations are custom work.

---

## Segment 3 — Healthcare Supply Chain / WMS

### Tecsys (Montreal)

Canadian healthcare supply chain vendor whose WMS "powered the CDC's distribution of 125 million H1N1 vaccine doses" in 2009 and runs Canada's largest healthcare 3PL network (Accuristix, eight DCs) ([Tecsys CSC](https://www.tecsys.com/en-ca/consolidated-service-center), [Accuristix press release](https://www.prnewswire.com/news-releases/tecsys-to-power-distribution-center-network-for-canadas-largest-healthcare-logistics-provider-accuristix-301188948.html)). Strongest candidate for Tier 1 PVD warehouse operations: picking/packing slips, holding-point locations, barcode, lot/expiry at warehouse grade. The gap is precisely your concern — its model is owned-network inventory ("total visibility of inventory" *across your network*), not self-service ordering and stock accountability for 1,500 independent third parties. Conceivable as half of a hybrid bid (Tecsys WMS + provider ordering front end), aligning with Path 3 of the SBAR.

### Generic WMS/ERP (Manhattan, Blue Yonder, SAP, Oracle, Infor)

Not individually scanned; structurally poor fit per the analysis above — owned-inventory assumption, EDI-style VMI rather than mass external self-service, no public health vaccine reference clients for CR-01. Expect SI-led bids on these platforms to fail the mandatory multi-tier reference requirement.

---

## Segment 4 — Outsourced Distribution (Operating-Model Alternative, Not an RFP Response)

Innomar Strategies (Cencora/AmerisourceBergen) with FedEx ran national COVID-19 vaccine distribution — 50M+ doses ([PSPC award](https://www.canada.ca/en/public-services-procurement/news/2020/12/government-of-canada-awards-contract-to-distribute-covid-19-vaccine-from-coast-to-coast-to-coast.html), [Innomar](https://www.innomar-strategies.com/news-and-events/press-releases/innomar-supports-covid-19-vaccine-distribution)); McKesson Canada was a cleared bidder ([McKesson Canada](https://www.mckesson.ca/-/mckesson-canada-prepares-to-support-the-distribution-of-a-future-covid-19-vaccine-in-canada)). These firms solve the problem by *operating* the depot and distribution with their own systems rather than licensing software. Out of scope for the VIMS RFP as written, but relevant if the alternatives analysis ever widens to operating model.

---

## Fit Summary Against the Third-Party Inventory Concern

| Vendor / Segment | Multi-tier ordering (SR-02, CR-01) | Third-party Tier 3 inventory | Tier 1 warehouse ops (SR-05, SR-09) | SaaS + Canadian hosting (UE-01, AD-03) | Overall |
|---|---|---|---|---|---|
| STChealth (VOMS/AVI) | Proven — incl. Alberta | Proven — core design | Moderate | SaaS yes; Canadian hosting TBC | **Strong** |
| InductiveHealth/Envision (WebIZ) | Proven (US) | Proven (US VFC model) | Moderate | SaaS yes; Canadian hosting TBC | **Strong, US-centric** |
| mSupply | Proven (national EPI programs) | Proven (facility tiers) | Good | Deployment model TBC | **Capable, procurement-risky** |
| CANImmunize | Limited | Clinic-level only | Weak | Canadian, SaaS | Partner candidate |
| Salesforce-based (SI-led) | Custom build | Portal strength, logic custom | Weak | Yes / yes | Moderate, CR-01 risk |
| Deloitte (VaccineConnect derivative) | Partial (FPT tier only) | Not demonstrated | Weak | Custom | Moderate-weak |
| Tecsys | Owned-network only | **Gap — your concern confirmed** | **Strong** | Yes; Canadian company | Hybrid component |
| Generic WMS/ERP | No reference clients | Structural mismatch | Strong | Varies | Poor |
| Epic Willow (per SBAR) | Not met | Poor fit | Moderate | Met (June 2026) | See [[SBAR - Epic Willow Extension for Provincial Vaccine Depot]] |

---

## Alternatives Assessment: The Two Realistic Paths

The market scan narrows the practical decision to two alternatives: **(A) implement the latest version of the incumbent product** — STChealth's current VOMS/STC|ONE platform, replacing the aging AVI deployment with the vendor's modern release — or **(B) extend Epic** via a new provincial Willow implementation per Path 1 of the [[SBAR - Epic Willow Extension for Provincial Vaccine Depot]]. No other scanned vendor combines a credible CR-01 reference with third-party Tier 3 inventory capability, and the hybrid path inherits the weaknesses of both sides plus an integration burden.

The two alternatives are structurally different transactions. Alternative A is a **buy**: a vendor SaaS procurement through the RFP. Alternative B is a **build**: Alberta has already licensed essentially the entire Epic product line (excluding US-specific modules), so Epic will not respond to the RFP — the Epic path is an internal HSS configuration and enhancement effort, delivered by existing HSS teams with Epic in a product-support role. This is a make-vs-buy decision, not a two-vendor competition.

### Alternative A — Implement Latest STChealth VOMS/STC|ONE (Incumbent Modernization)

**Pros**

- **Only in-province, multi-tier production reference in the market.** Alberta's AVI already runs the RFP's exact operating model on STC's platform ([AHS AVI page](https://www.albertahealthservices.ca/cdc/Page13604.aspx)), so the mandatory CR-01 reference is met by definition — and met *in Alberta*, not by analogy to a US VFC program.
- **Third-party operational inventory is the product's core design.** Ordering, receiving, reconciliation, and wastage reporting by ~1,500 independent providers (SR-02, SR-04, SR-08) is what VOMS was built for, not custom work layered onto an owned-inventory assumption.
- **Lowest transition risk and change-management burden.** Tier 3 providers are already trained on STC workflows (training material current to [May 2025](https://s3-us-west-2.amazonaws.com/stc-app-ab/pdf/2025-05%20AVI%20Pharmacy%20Training.pdf)); data migration stays within one vendor lineage, and the depot network keeps a familiar ordering model.
- **Fits the RFP as written, with vendor accountability.** A SaaS product responding through the open RFP (UE-01 mandatory) comes with contractual delivery commitments, SLAs, and a vendor on the hook for outcomes — accountability the internal-build alternative places entirely on HSS delivery capacity instead.

**Cons**

- **Risks re-buying the incumbent's central weakness.** AVI's most significant gap is the absence of automated transaction interfaces — manual entry at all tiers and double entry at Willow sites (per the SBAR Background). A version upgrade does not fix this unless Willow interface requirements are treated as a non-negotiable evaluation criterion; otherwise the Province pays to modernize the same manual burden.
- **The motivating gaps are unexamined.** Alberta is issuing an RFP *despite* running STC today; whatever AVI lacks that motivated the RFP must be documented explicitly, or the latest version may simply deliver the current dissatisfaction on a newer platform.
- **Platform and compliance unknowns.** Responsive UI/UX against GoA/PPHS standards (UE-08) is unverified, and Canadian data residency (AD-03) is open — STC's Alberta training assets are hosted on US-west AWS, suggesting US-resident infrastructure that would need a Canadian environment commitment probed before evaluation.
- **Tier 1 warehouse operations are only moderate.** Warehouse-grade picking/packing (SR-09) and GS1 barcode handling (SR-05) are not the VOMS heritage; the PVD's $150M physical depot operation may stress the product or push toward the hybrid path.
- **Clinical disconnection persists.** Closed-loop administration, patient notification/follow-up, and AEFI tracking remain in Epic, disconnected from supply chain data — a structural limitation of any non-Epic VIMS, manageable only through the interface investment noted above.

### Alternative B — Extend Epic (Internal HSS Build on Licensed Platform)

**Pros**

- **No new licensing procurement.** Alberta has already licensed essentially the full Epic product line (excluding US-specific modules), so the software cost is largely sunk; the incremental investment is configuration, enhancement, and delivery effort by existing HSS teams with Epic product support — not a new vendor contract.
- **Eliminates double entry for Willow sites.** Depots and departments already transacting in Epic Willow Inventory would operate in a single system — directly resolving the manual re-entry burden that exists today between Willow and AVI, with no interface to build or maintain for those sites.
- **Closed-loop integration with the clinical record.** Supply chain transactions, vaccine administration, patient notification and follow-up, and AEFI surveillance share one platform — capabilities no standalone VIMS can match without cross-system correlation.
- **Leverages existing provincial infrastructure and teams.** Connect Care is HSS-hosted in Alberta data centres (Canadian hosting met as of June 11, 2026), with established support, governance, an experienced internal Epic build organization, and — significantly — existing provincial integrations that already handle Alberta's HL7 v3 Netcare boundary (AD-10), the smallest v3 translation cost of any path.
- **Core inventory mechanics are proven in production — and already localised for Canada.** Lot/expiry tracking, receiving, adjustments with audit history, wastage and cold chain reason codes, and product master management exist in the current build and carry forward. The build is already configured for the Canadian vaccine catalogue and hosted within Alberta — localisation and residency work that US-centric vendor products (WebIZ, and STC's US-hosted infrastructure pending AD-03 confirmation) would still need to do.

**Cons**

- **No comparable multi-tier precedent — anywhere.** The current build is single-tier facility inventory, and per the SBAR fit assessment the PVD → 13 depots → 1,500 providers hierarchy is architecturally absent. Because Epic will not bid, there is also no CR-01-style reference client to point to; HSS would be building a multi-tier provincial distribution model on Willow without a proven exemplar, and some gaps may sit on Epic's product roadmap rather than within HSS configuration reach.
- **External provider access at scale is unsolved.** Bringing ~1,500 community pharmacies and clinics into an Epic access model (MyChart/Community portal or equivalent) carries its own implementation, security, and identity-management burden, and none of Epic's closed-loop advantages reach these Tier 3 users — the majority of the user base — until it is solved.
- **Fundamental operating model decoupling required.** The build is embedded in patient-encounter and medication management workflows; provincial recall coordination, shortage redistribution, order approval with variance thresholds, province-wide reporting, and multi-organization data segregation are all rated poor fit in the SBAR — several may require Epic product development, not configuration.
- **Delivery accountability rests entirely on HSS.** With Epic in a support role rather than a contracted delivery role, there is no vendor SLA, no delivery contract, and no transfer of implementation risk. The build competes for the same internal Epic team capacity as the broader Connect Care programme, and timeline slippage has no commercial remedy.
- **Choosing it requires defensibly closing the RFP.** An RFP for a VIMS is in progress; selecting the internal Epic path means cancelling or not awarding it. That is a legitimate make-vs-buy outcome, but it needs a documented rationale that withstands scrutiny from the respondent pool — the evaluation record (including this scan and the SBAR) becomes that rationale.

### Net Assessment

This is a make-vs-buy decision. Alternative A (buy) carries delivery risk that is *known, bounded, and contractible* — interface gaps, hosting, and warehouse operations can all be made evaluation criteria with a vendor accountable for them. Alternative B (build) avoids new licensing cost and uniquely closes the loop with the clinical record, but concentrates all delivery risk on internal HSS capacity, with no precedent implementation, an unsolved Tier 3 access model, and possible dependency on Epic's product roadmap. The deciding variables are therefore: (1) Epic's formal response to the [[Epic Willow Inventory Assessment Package]] — now important as a *capability and roadmap commitment* from a support partner rather than a bid; (2) honest assessment of HSS team capacity against the Connect Care programme's competing demands; (3) whether Willow interface requirements can be made non-negotiable in the RFP evaluation, which determines how much of Alternative B's integration advantage Alternative A can neutralize; and (4) STC's commitment on Canadian hosting and UI modernization. Per the SBAR recommendation, RFP evaluation should proceed in parallel until Epic's capability response lands.

---

## Observations for the SBAR

1. **Your concern is validated, and it is the market's dividing line.** Third-party operational inventory management is exactly what separates the public health VIMS niche from everything else. Only Segment 1 vendors treat it as a first-class capability; for everyone else it is custom work that puts the mandatory CR-01 reference at risk.

2. **The realistic respondent pool is small — roughly three to six credible bids.** STChealth, InductiveHealth/WebIZ, possibly mSupply, plus one or two SI/platform bids. Evaluation planning should anticipate a thin field rather than a broad competition.

3. **The incumbent dynamic matters.** Alberta already runs the RFP's operating model on STC's AVI. STC enters with the only in-province multi-tier reference, which both de-risks Path 2 of the SBAR (purpose-built VIMS) and raises the question of what AVI lacks that motivated the RFP — worth documenting explicitly, since those gaps become evaluation differentiators.

4. **A hybrid split is commercially plausible.** Niche VIMS for Tiers 2–3 ordering and accountability plus warehouse-grade capability (e.g., Tecsys) for PVD internal operations mirrors SBAR Path 3, though it introduces a two-vendor integration burden the RFP doesn't currently contemplate.

5. **Canadian hosting (AD-03, desirable) will stress US-centric vendors** — the strongest functional fits are American firms; their willingness to stand up Canadian-resident environments should be probed early, ideally before proposal evaluation.

---

*Prepared from a web market scan, June 12, 2026. All sources linked inline for follow-up research. Companion documents: [[SBAR - Epic Willow Extension for Provincial Vaccine Depot]], [[VIMS RFP Detailed Requirements]], [[Epic Willow Inventory Assessment Package]].*
