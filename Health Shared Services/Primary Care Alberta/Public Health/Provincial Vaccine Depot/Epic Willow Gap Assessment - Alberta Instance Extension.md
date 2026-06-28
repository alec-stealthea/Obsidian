---
type: Architecture Assessment
title: "Epic Willow Inventory Gap Assessment: Extending the Alberta (Connect Care) Epic Instance for PVD and Provincial Distribution"
description: "Date: June 5, 2026"
timestamp: 2026-06-26T19:19:06Z
---

# Epic Willow Inventory Gap Assessment: Extending the Alberta (Connect Care) Epic Instance for PVD and Provincial Distribution

**Date:** June 5, 2026  
**Scope:** Analysis of extending the existing Alberta Connect Care Epic instance (Willow Inventory module) to support the Provincial Vaccine Depot (PVD) warehouse operations and multi-tier provincial vaccine distribution  
**Out of scope:** Non-Epic alternatives; new standalone Epic implementations  

This assessment is cross-mapped to the [[VIMS RFP Detailed Requirements]]

---

## Assumptions

- The existing Connect Care Epic instance is the platform. No separate Epic instance would be stood up.
- Extending Willow Inventory means building within the current organizational/facility model in Connect Care, using Epic's standard modules, configuration, and licensing.
- **PVD staff, regional depot staff, and Public Health site staff are all internal Epic users on HyperDrive.** They operate entirely within the Connect Care instance with standard Willow Inventory workflows. No external access mechanism is needed for these groups.
- **Community Connect is not being considered** for this option.
- **The Epic MyChart Provider Portal is not applicable** for ordering workflows — it is patient-centric — but provider portal user accounts can be provisioned for external requestors for identity and audit purposes.
- **External locations requiring the custom portal are limited to community pharmacies and physician clinics.** Public Health sites are already on Epic and are treated as internal users. This materially reduces the external portal scope.
- **Pharmacy and physician clinic locations are already registered as EAF (Place of Service) records** in the Connect Care instance. No bulk location onboarding is required.
- **Portal users (pharmacy and clinic staff submitting requisitions) can be provisioned as provider portal users** linked to their EAF location record. This establishes authenticated Epic user identities, satisfies audit trail requirements, and means API calls through the portal are attributed to a named Epic user — resolving the API write access licensing question.
- **A custom web portal is the confirmed approach** for community pharmacies and physician clinics only. The portal authenticates users against their Epic provider portal credentials and brokers API calls into Connect Care to submit and track orders.
- Outbound purchase ordering from PVD to vaccine suppliers (e.g., manufacturers, wholesalers via EDI/HL7 PO workflows) is **assumed to be achievable** within standard Willow Inventory capability and is not a focus of this assessment.
- The primary distribution flow being assessed: PVD → Regional Depots → Community Providers (pharmacies, physician clinics, public health clinics).

---

## Key Architecture: Custom Provider Portal Brokering Epic APIs

The confirmed architecture splits into two user groups:

**Internal users (PVD, depots, Public Health):** Epic HyperDrive → Willow Inventory directly. No portal required.

**External users (pharmacies, physician clinics):** Custom Web Portal (authenticated via Epic provider portal credentials) → Epic APIs (Interconnect / FHIR) → Willow Inventory

This split significantly reduces the external portal scope. Public Health sites ordering from depots use HyperDrive natively; only community pharmacies and physician clinics require the portal path.

Because pharmacy and clinic locations already exist as EAF records and requestors can be provisioned as Epic provider portal users, several previously identified gaps are now **resolved**:

| Previously Identified Gap | Status |
|--------------------------|--------|
| Identity store for external users | ✅ Resolved — Epic provider portal user accounts tied to EAF records |
| Authentication model for portal | ✅ Resolved — portal authenticates against Epic provider portal credentials |
| Audit trail for who submitted each order | ✅ Resolved — requests attributed to named Epic users |
| API write access licensing concern | ✅ Substantially resolved — API calls made as authenticated Epic users, not anonymous external sessions |
| Location master data for external sites | ✅ Resolved — EAF Place of Service records already exist |
| Public Health ordering workflow | ✅ Resolved — Public Health sites are internal HyperDrive users; no portal needed |
| Multi-organization inventory model (A2, A3, A4) | ✅ Resolved — confirmed that Willow Inventory locations require **no linkage to Epic Departments or Facilities**; community pharmacy, physician, or any external non-Epic location can be created as an inventory location with no real limitations. Inventory ownership segregation by location is handled natively. |

### Impact of Vaccines Built as Medications on FHIR vs. Interconnect

If vaccines are built as **medications** in Epic (INR records in the pharmacy formulary) rather than purely as supply catalog items, this meaningfully improves the FHIR API surface for some operations — but does not fully replace Interconnect for the ordering transaction itself.

**Why the distinction matters:** Epic's FHIR R4 implementation is considerably more mature for medication-domain resources (`Medication`, `MedicationRequest`, `MedicationKnowledge`, `MedicationDispense`) than for supply chain resources (`SupplyRequest`, `SupplyDelivery`). Building vaccines as medications means the richer FHIR medication surface becomes available.

**What building vaccines as medications improves:**

| Operation | Without Medication Build | With Medication Build |
|-----------|------------------------|----------------------|
| Product catalog query | Willow supply catalog — not in standard FHIR; Interconnect likely required | `Medication` and `MedicationKnowledge` FHIR resources — well-documented, mature Epic FHIR endpoints; orderable formulary status, lot attributes, and DIN/RxNorm codes queryable via standard FHIR |
| Product identification in X12 EDI | Requires supply item crosswalk | Pharmacy PIS systems already identify products by DIN; medication build aligns naturally with how pharmacies identify vaccine products in Kroll/PharmaClik |
| Lot and expiry tracking reads | Supply-side only; FHIR coverage limited | Medication lot/expiry may be accessible via `Medication` resource extensions; richer query options |

**What building vaccines as medications does NOT resolve:**

The critical gap is in the **ordering transaction** itself. A bulk vaccine requisition from a pharmacy to the depot — "please send us 200 doses of flu vaccine" — is a supply chain transaction, not a patient-specific clinical medication order. This matters because:

- **`MedicationRequest` (FHIR R4) requires a patient context** (`subject` field referencing a Patient resource). It models a prescription or clinical medication order for an individual patient. It cannot represent a bulk inventory requisition without a patient — using it this way would be a misuse of the resource and is not a supported Epic pattern for supply ordering.
- **`SupplyRequest` (FHIR R4)** is the correct resource for this use case. Importantly, `SupplyRequest.item` can reference a `Medication` resource — so if vaccines are medications, the SupplyRequest correctly references the Medication by FHIR resource ID. This is cleaner than a supply catalog reference, but the underlying question of whether Epic supports SupplyRequest **write** operations for Willow Inventory remains the same regardless of whether the item is a medication or a supply catalog item.

**In summary:** Building vaccines as medications upgrades the product catalog and identification side of the API from Interconnect-dependent to FHIR-native, which is a real improvement. But the ordering transaction (`SupplyRequest` write), inventory adjustments, and wastage recording still sit in the same confirmation-needed zone. The medication build doesn't unlock MedicationRequest as a shortcut for bulk ordering.

### Epic API Surface — Remaining Confirmation Needed

The portal authenticates as Epic provider portal users and makes API calls on their behalf. The outstanding question is not licensing — it is whether Willow Inventory exposes the required operations through Epic's API layer. With vaccines built as medications, the table below reflects the updated API picture:

| Portal Function                                            | Required Epic API Capability                                                                                                           | API Maturity / Vaccine-as-Medication Impact                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display orderable products by provider type / EAF location | Medication formulary query by location or role                                                                                         | ✅ **Improved** — `Medication` and `MedicationKnowledge` FHIR R4 resources are mature Epic endpoints; formulary eligibility by location likely queryable                                                                                                                                                                 |
| Submit a vaccine requisition                               | Create `SupplyRequest` in Willow referencing a `Medication` resource — **or** generate a GHX XML file consumed by Batch Template 48016 | `SupplyRequest` via Interconnect still needs confirmation; however, **GHX XML batch import (template 48016) is a documented native alternative** — portal generates XML, batch job imports it into Willow as an internal request. Preferred for routine orders; Interconnect reserved for urgent/real-time submissions. |
| Display on-hand inventory at ordering location             | Query on-hand quantity by medication and EAF location                                                                                  | Marginal improvement — inventory quantity is a Willow data point, not a standard medication FHIR read; Interconnect or reporting extract likely still required                                                                                                                                                          |
| Order status tracking                                      | Read supply order status by order ID                                                                                                   | Interconnect likely required regardless of medication build                                                                                                                                                                                                                                                             |
| Shipment notification to provider                          | Push or poll shipment events from Willow                                                                                               | Not affected by medication build; external event notification confirmation still needed                                                                                                                                                                                                                                 |
| Confirm receipt at provider site                           | `SupplyDelivery` write-back to Willow                                                                                                  | `SupplyDelivery.suppliedItem` can reference `Medication`; whether Epic supports SupplyDelivery writes in Willow still needs confirmation                                                                                                                                                                                |
| Submit wastage / return                                    | Inventory adjustment or return transaction                                                                                             | No standard FHIR resource maps to supply wastage regardless of medication build; Interconnect custom call likely required                                                                                                                                                                                               |
| Cold chain incident report                                 | Adjustment with cold chain reason code                                                                                                 | Same as wastage — not improved by medication build                                                                                                                                                                                                                                                                      |

The medication build meaningfully reduces Interconnect dependency on the **read/catalog side** while leaving the **write/transaction side** as the remaining confirmation target. This is still a worthwhile architectural improvement — fewer Interconnect dependencies mean a more standards-based integration and lower long-term maintenance risk for the portal.

---

## ANSI X12 EDI — Confirmed Scope and Limitations

The Epic Willow Inventory X12 Interface Setup and Support Guide (May 2, 2025) clarifies the supported X12 architecture definitively. This resolves the earlier question about whether X12 EDI could serve as an alternative ordering interface for pharmacies.

### What the Guide Confirms: X12 is Outbound-Only from Willow

The guide states explicitly: *"In Willow Inventory, X12 interfaces are used to send messages from your pharmacy to your supplier requesting purchase orders."*

Epic Willow is always the **buyer** in the X12 model — it generates outbound 850s to suppliers and receives inbound 855/856/810/832 responses. There is no documented capability for Willow to receive an inbound X12 850 from an external ordering party. The architecture is not reversible within the standard Willow X12 interface design.

This means **X12 EDI cannot be used for pharmacies or physician clinics submitting requisitions to the PVD.** The custom portal and Interconnect API path remains the confirmed approach for all inbound ordering from external providers.

### Confirmed X12 Capability: PVD Ordering from Vaccine Suppliers (Outbound)

The guide confirms the following transaction set for the PVD ordering from vaccine manufacturers and wholesalers — this is fully within standard Willow X12 capability:

| X12 Transaction | Direction | Purpose | Status |
|----------------|-----------|---------|--------|
| 850 Purchase Order | Willow (PVD) → Supplier | PVD submits purchase order to vaccine manufacturer or distributor | ✅ Confirmed native |
| 855 PO Acknowledgment | Supplier → Willow (PVD) | Supplier confirms order received, notes discrepancies | ✅ Confirmed native |
| 856 Advance Ship Notice | Supplier → Willow (PVD) | Supplier notifies PVD of shipment contents and quantities | ✅ Confirmed native |
| 810 Invoice | Supplier → Willow (PVD) | Supplier invoices PVD for delivered product | ✅ Confirmed native |
| 832 Price/Catalog Update | Supplier → Willow (PVD) | Supplier updates item pricing in Willow | ✅ Confirmed native (may require additional license pre-Nov 2024) |

### Useful Automation Features Confirmed in the Guide

The guide identifies several automation capabilities relevant to PVD operations that reduce manual effort for depot staff:

**Automatic shipment creation and receipt from X12 856 (ASN)**  
When a vaccine supplier sends an 856 Advance Ship Notice, Willow can be configured to automatically create and complete the corresponding shipment — bypassing the need for depot staff to manually validate and receive the shipment if the ASN quantities match expectations. This is configurable via profile variables `CREATE_SHIPMENT` and `AUTO_RECEIVE` on the 856 interface specification. Useful for high-volume or routine supplier deliveries to the PVD.

**Automatic inventory balance creation from 855/856/810**  
If an incoming 855, 856, or 810 references a product with no existing inventory balance at the receiving location, Willow can automatically create the balance. Configured via `CREATE_BALS_FOR_UNSTOCKED_ITEMS`. Reduces setup burden when new vaccine products are introduced.

**Automatic PO creation from inbound 810 invoices without a prior request**  
Starting August 2023, if a supplier sends an 810 invoice for which no corresponding purchase request exists in Willow, the system can automatically create the PO. Relevant if vaccine suppliers submit invoices for emergency or ad hoc shipments not initiated through the standard PO workflow.

**Automatic purchase request closure**  
An extension can be configured to automatically close open purchase requests after a specified number of days following 856 receipt, keeping the request queue clean without manual intervention.

### Canada-Specific Note

The guide explicitly states: *"Organizations outside of the U.S. should contact their EDI and Willow Inventory representatives before doing any interface setup, because there are special requirements for working with non-U.S. suppliers."*

Since the PVD operates in Canada and will work with Canadian vaccine distributors and manufacturers, Epic's Canadian EDI team must be engaged early. Specific considerations include DIN vs. NDC product identification (the guide references NDC throughout; a DIN-to-internal item crosswalk will be required) and any Canadian-specific EDI trading partner requirements.

### Impact on Portal Scope

With X12 confirmed as outbound-only, the portal scope is unchanged — it remains the required interface for all inbound ordering from pharmacies and physician clinics. The portal build requirements are:

- **Order submission for all external providers** (pharmacies and physician clinics): Full ordering workflow required for both groups via Interconnect.
- **Order status and history view**: Providers need live order status visibility. Sourced from Willow via Interconnect API calls.
- **Role-based product catalog display**: Eligibility-from-Epic preferred to avoid dual maintenance.
- **Ordering rules and variance logic at the UI layer**: Threshold and eligibility enforcement in the portal.
- **Responsive, accessible design compliant with GoA/PPHS UI/UX and WCAG standards**: Achievable since the portal is custom-built.
- **ISP bandwidth performance ≤10 Mbps**: Achievable by design.

---

## Manual Transfer Workflows for External Locations

Since X12 cannot receive inbound orders from pharmacies and clinics, and while the portal/Interconnect approach is assessed separately, it is useful to document what Willow Inventory supports natively for pushing stock to external locations — both for the manual fallback case and as context for how depot staff would handle fulfillment regardless of how the requisition arrived.

### Transfer Options Available in Willow Inventory

The guide describes three mechanisms for moving stock between inventory locations, each suited to different scenarios:

**1. Direct Transfer (one-step or two-step)**

The simplest method. A depot staff member in HyperDrive opens the Direct Transfer activity, selects the destination inventory location (e.g., a pharmacy's EAF-linked inventory location), and transfers the stock.

- *One-step*: Balances update immediately at both locations when the sender marks the transfer complete. Appropriate for physically nearby locations or where brief balance inaccuracy is acceptable.
- *Two-step*: Stock decrements at the depot on send, but does not increment at the pharmacy until a user at the receiving location confirms receipt. Appropriate for the PVD-to-pharmacy scenario where vaccines are shipped and physical receipt needs to be confirmed before balance updates.

Configuration requirements: the depot location must have "Allow direct transfers from this location" enabled, and the destination pharmacy locations can be restricted via the "Only Allow Direct Transfers to" list. The guide confirms that EAF-linked inventory locations are the unit of reference for transfer destinations, which aligns with having pharmacies built as EAF records.

The Rebalance Stock activity (available February 2026) builds on direct transfers to identify excess or near-expiry inventory and generate suggested transfers to locations with need — directly relevant to the redistribution and shortage response requirements (A8).

**2. Internal Purchase Request (three-step)**

A full request-and-fulfillment workflow where the pharmacy's inventory location submits a request to the depot (configured as an internal supplier), the depot picks and ships, and the pharmacy receives. This mirrors the external PO workflow but stays entirely within Willow.

The guide notes this is best suited for *large organizations where there are many smaller pharmacies that regularly receive large amounts of stock from a central pharmacy* — which describes the PVD-to-depot-to-pharmacy model well.

Configuration requirements: PVD and regional depots must be configured as internal suppliers with purchase contracts. Pharmacy inventory locations are configured as receiving locations. The receiving step can be set to automatic (skip receiving at destination) or manual, depending on whether the pharmacy location has active HyperDrive users.

**3. Update Balances (ad hoc only)**

A simple manual balance adjustment. Recommended only for organizations with basic inventory needs and not appropriate for the PVD model given GL and audit requirements.

### Manual Fallback Without a Portal

If a pharmacy cannot submit via the portal (e.g., during an outage, onboarding, or for a one-off emergency request), a depot staff member can:

1. Receive the request by phone or email
2. In HyperDrive, create an internal inventory request on behalf of the pharmacy's inventory location, or initiate a direct transfer to that location
3. Pick, pack, and ship with the standard Willow packing list and shipment workflow
4. The system generates a packing list and shipment record; the pharmacy receives and confirms if configured for two-step

This is a fully supported workflow in Willow and requires no portal or API involvement. The audit trail (who created the request, when, for which location, what was shipped) is captured natively in Willow.

### Significant New Finding: Import External Inventory Requests (Batch Template 48016)

The setup guide documents a feature that is directly relevant to the portal integration design and may substantially simplify it:

> *"If your organization supplies medications to certain inventory locations that don't have access to Epic but you still want to use the inventory request workflow to send stock to those locations, you can use Batch Scheduler template 48016‐GHX Purchase Order Import to import XML inventory request files from those locations."*

This feature was designed for exactly the VIMS external ordering use case: locations without Epic access submitting orders that flow into Willow's internal request workflow. Key characteristics from the guide:

- External locations must be built as inventory locations in Epic (satisfied — EAF records already exist and can be linked to inventory locations)
- XML files from external locations are imported via a scheduled batch job (configurable frequency — could run every 15 minutes or hourly)
- Orders appear on the **Requests to Fulfill** tab in the depot's Inventory activity for staff to pick and ship
- The system auto-closes the request when all requested items are shipped
- Error handling surfaces in the Requests to Fulfill tab when issues occur (e.g., missing balance for a product, invalid quantity)
- Users can be given security to cancel incorrectly submitted imported requests (security point 725)

**Architectural implication:** Rather than the portal calling Willow Interconnect APIs in real-time to submit orders, the portal could instead generate a GHX-formatted XML purchase order file per request and deposit it in a monitored file location. The Willow batch scheduler imports these files periodically, creating the inventory request natively inside Willow without any real-time API call. This is a documented, supported Epic pattern and reduces the Interconnect API surface required for the portal significantly.

The trade-off is that order submission is not real-time — there is a delay equal to the batch job interval between when a pharmacy submits via the portal and when the request appears in HyperDrive for depot staff. For routine vaccine ordering this is acceptable; for emergency or pandemic-response orders a shorter interval or a direct Interconnect call for urgent orders could be used as an exception path.

**This finding should be confirmed with Epic and the XML file format specification (GHX schema) obtained before portal development begins.** The guide references Epic representative and parent SLG 3992958 for organizations considering this feature.

| Approach | Real-time? | API complexity | Supported pattern? | Best for |
|---------|-----------|---------------|-------------------|---------|
| XML import via batch 48016 | No (batch interval) | Low — file generation only | ✅ Documented native feature | Routine ordering; most portal submissions |
| Interconnect API call | Yes | High — requires endpoint confirmation | Needs Epic confirmation | Urgent/emergency orders; order status reads |

The recommended portal design should use the XML batch import as the primary order submission mechanism and reserve Interconnect API calls for order status reads and urgent order submission only.

---

## Additional Epic Willow Inventory Gaps Against VIMS Requirements

### 1. Tier-Based Ordering Rules and Product List Eligibility (C1, C5, C6)

*Narrowed June 11, 2026 — Willow purchase contract functionality provides native machinery for the C1 (tier-specific product list) portion of this gap. C5/C6 (variance thresholds with exception justification) remain a custom build.*

The VIMS requires different product lists, ordering thresholds, and ordering schedules depending on provider type (pharmacy vs. physician clinic vs. public health). A pharmacy ordering childhood vaccines has different eligibility rules than a regional depot ordering for redistribution.

**Resolution path — one purchase contract per tier/program (verified against Epic PIM Setup and Support Guide, May 1, 2026):**

- **Tier membership via location restriction.** Contracts can be restricted to specific inventory locations (`Restricted to locations`, I PCO 900, p. 75). Every pharmacy, clinic, and PH site is already an IVL record, so tier assignment = which contracts an IVL may use. Separate contracts per tier (community pharmacy, physician clinic, public health, regional depot) each carry their own location list.
- **Tier-specific product lists via catalog restriction.** `Restrict purchase orders to packages in catalog` (I PCO 405, pp. 72–73) makes the contract's product catalog the orderable list on that contract. Different tier product lists are different contract catalogs — configuration, not custom build.
- **Finer eligibility via rules.** The `Restrict to items satisfying rule` field (p. 73) accepts Inventory Balance context rules for conditional eligibility beyond a static catalog.
- **Per-location contract hierarchy.** Since August 2023, each IVL — or a parent facility location for a group, e.g., a depot region — carries its own ranked contract list (I IVL 225, p. 73). The correct tier contract is selected by default; facility-level lists avoid maintaining 1,500 individual location lists.
- **Ordering schedules, partially.** Contract effective dates and future pricing windows (pp. 71–72) can open/close product availability by date — usable for seasonal program windows (e.g., influenza campaign), though not for day-of-week ordering cadence rules.
- **48016 tie-in.** For imported external requests, the fulfilling depot is built as an internal supplier *with an attached contract used to identify items in the XML* (p. 157). The same tier contract governing internal eligibility therefore defines what an external portal order can contain — and the portal's product catalog display can be sourced from the contract catalog, satisfying the eligibility-from-Epic / no-dual-maintenance preference for the portal design.

**Remaining gap (C5/C6):** Quantity ceilings are enforced by security point 722 against par/max/optimum levels — a hard block per security class with no documented override-with-justification path at request time. Reason-code capture exists for balance updates (p. 83), not order exceptions. Workqueue Nonblocking rules can flag threshold exceptions for review, giving an approximate enforce-or-review model, but configurable variance percentage thresholds with justification capture remain a custom build.

**Assessment:** C1 (tier-specific product lists and default contract selection) largely achievable via purchase contract configuration. C5 variance thresholds approximated via 722 + workqueue flagging; C6 exception justification capture requires custom development.

*Source: Pharmacy Inventory Management Setup and Support Guide (Epic, May 1, 2026), pp. 70–76, 121–122, 157; see [[Review - Pharmacy Inventory Management Setup and Support Guide]].*

---

### 2. Order Approval Routing and Status Tracking (C2, C3)

*Narrowed June 11, 2026 — Willow Inventory natively tracks inventory requests through a documented status lifecycle, and a native rule-based approval mechanism (Inventory Workqueues) exists. Both portions of this gap are substantially reduced.*

**Status lifecycle (verified against Epic PIM Setup and Support Guide, May 1, 2026):** documented request statuses are **Draft → Submitted → Shipped → Received/Completed → Closed**. Picking is a fulfillment *activity* (Request Queue, p. 125; Rover Fill Requests, p. 184) tracked at item level within the request, not a distinct named request status — confirm the formal status model with Epic TS.

**Approval mechanism:** Inventory Workqueues (guide pp. 135–136) support **Blocking Rules** — a matching request "must be marked as resolved before it can move on to the next status." Rules are configurable (e.g., dollar value, item, quantity), reviewer access is governed by security point 711 and per-workqueue user restrictions, and starting August 2025 an "Immediate Sign Off Needed" option requires a second signoff in-workflow. February 2026 report models 48073/48074 support workqueue turnaround monitoring. This is a native, configurable depot review/approval pattern.

**Remaining gap:** (1) The workqueue topic is framed around outbound purchase requests reviewed "before they're sent to a supplier" — whether Blocking Rules can gate **imported external requests on the Requests to Fulfill side** (the depot-approval use case) requires written Epic confirmation. (2) Imported external requests **close when all items are shipped** (guide p. 156), so post-ship status and receipt confirmation for external providers cannot come from Willow — provider-facing status visibility depends entirely on the portal/Interconnect path.

**Assessment:** If workqueue Blocking Rules apply to imported requests, the approval stage is configuration, not custom build. Otherwise, scope remains an approval-step insertion via Epic routing/task tools. External provider-facing status visibility is a portal-layer responsibility either way.

*Source: Pharmacy Inventory Management Setup and Support Guide (Epic, May 1, 2026), pp. 110, 123–125, 135–136, 140, 156, 159; see [[Review - Pharmacy Inventory Management Setup and Support Guide]].*

---

### 3. Province-Wide Recall Management (A7, RNA-01)

The VIMS must identify every organization holding an affected lot, notify users, freeze/flag product, coordinate returns, and report recall completion across all tiers.

**Gap:** Willow Inventory has basic lot-level tracking. However, a multi-organization recall workflow that spans 1,500 external sites — including automated notification, per-site inventory freeze flagging, return tracking, and completion reporting — is not a native Willow capability. Epic's Recall Management tools exist on the clinical/medication side but are not designed for a provincial supply chain recall model involving external non-Epic sites.

**Assessment:** High-complexity custom build or would require a supplementary tool. This is one of the highest-risk gaps.

---

### 4. Redistribution and Near-Expiry Inventory Identification (A8, B2)

The Province must be able to identify near-expiry inventory across all tiers and initiate redistribution to avoid wastage. This requires aggregated inventory visibility across organizations, near-expiry alerting, and the ability to initiate a transfer from any depot or provider back into the supply chain.

**Gap:** Willow supports expiry date tracking and near-expiry alerts within an organization. Cross-organization near-expiry inventory aggregation and the corresponding redistribution workflow (including generating an outbound transfer from a provider site that is not actively managing a Willow inventory) would require custom reporting and workflow build.

**Assessment:** Reporting on near-expiry inventory internally (within PVD and regional depots on Connect Care) is achievable. Extending visibility and redistribution actions to ~1,500 external providers is not.

---

### 5. Cold Chain Incident Workflow (B8)

When a cold chain breach is reported, the system must capture reason codes, separate viable from non-viable inventory, prompt required documentation, and route for return or wastage recording.

**Gap:** Willow Inventory supports inventory adjustment reason codes and can capture wastage with cause. However, a guided cold chain incident workflow — with branching prompts, forced documentation, automatic inventory flagging, and supervisory notification — is not native Willow functionality. This would need to be built as a custom workflow or approximated through a combination of reason codes, manual process, and optional Epic routing tools.

**Assessment:** Partially achievable; guided workflow and forced documentation prompts require custom build.

---

### 6. Batch Data Processing and Validation (B3)

The RFP requires batch upload and validation of vaccine and transfer data, including lot validation, mandatory review flags, error handling, retries, and operational monitoring.

**Gap:** Willow Inventory does not have a general-purpose batch data intake pipeline for external data loads (e.g., bulk receipt uploads, batch transfer records). Epic's standard tools for bulk data intake (Chronicles, ETL tooling) are not provider-facing and are not designed for operational batch management with error queues and monitoring dashboards.

**Assessment:** Would require custom development (ETL pipeline, error handling UI, operational monitoring). Not achievable through Willow configuration alone.

---

### 7. Emergency and Pandemic Response Scaling (A9, A10)

During a pandemic or public health emergency, the VIMS must handle high-volume ordering, rapid allocation changes, multi-stakeholder coordination, and real-time inventory visibility across the province.

**Gap:** The Connect Care instance is sized and configured for clinical operations. A sudden high-volume vaccine ordering event from 1,500 providers simultaneously — outside a clinical encounter workflow — is an untested load scenario on the current instance. Epic would need to confirm the infrastructure can support peak VIMS load without impacting clinical operations running on the same instance.

**Assessment:** Infrastructure impact on Connect Care clinical operations during a high-volume VIMS event is an unresolved risk that needs explicit Epic confirmation.

---

### 8. Forecast-Based Ordering Support (C9)

The RFP identifies forecast-based ordering — using demand estimates to optimize allocation and reduce wastage — as a desirable capability.

**Gap:** Willow Inventory does not include native demand forecasting or AI-driven allocation optimization. This would require either a third-party analytics/forecasting tool integrated with Willow inventory data, or manual forecast processes outside the system.

**Assessment:** Not achievable natively. Third-party integration required if this capability is in scope.

---

## Confirmed Capabilities (Low/No Gap)

These VIMS requirements are well within standard Willow Inventory capability for the PVD's own internal operations:

| Requirement | Willow Capability |
|-------------|------------------|
| Lot tracking at PVD/depot level (B1) | Native |
| Expiry date tracking and near-expiry alerts within PVD (B2) | Native |
| Inventory adjustments with reason codes (B5) | Native |
| Physical count and reconciliation within a facility (B6) | Native |
| Wastage tracking with reason codes (B7) | Native |
| Multi-location storage within a facility (B9, B10) | Native |
| Outbound purchase orders to vaccine suppliers (PO/EDI) | Native |
| Shipment tracking for outbound shipments (C4) | Native with configuration |
| Product master management (B4) | Native |
| Inventory receiving from suppliers (A5) | Native |

### Removed as Gaps (June 11, 2026)

- **GoA/PPHS UI/UX standards compliance (UE-08)** — formerly Gap 8. For internal users, Hyperdrive is a non-issue: the client is already deployed across the province to many thousands of Connect Care users. External provider-facing users access the system through the custom-developed portal, which will be built to GoA/PPHS UI/UX and accessibility standards.
- **Retail-level ISP bandwidth performance (UE-02)** — formerly Gap 9. External providers on ≤10 Mbps retail connections use the custom portal, which will be designed for low-bandwidth operation. Hyperdrive bandwidth performance applies only to internal depot users on the provincial network.

---

## Gap Priority Summary

| Gap | Severity | Likely Resolution |
|-----|----------|------------------|
| Inbound requisitions from pharmacies/clinics | **Critical** | Community Connect (costly) or custom portal (development) |
| Province-wide recall management | **High** | Custom development or supplementary tool |
| Order approval stage (status tracking native; workqueue Blocking Rules are candidate native approval) | **Medium → Low-Medium pending Epic confirmation** | Workqueue configuration (PIM Guide pp. 135–136) if applicable to imported requests; otherwise workflow build. External status visibility via portal path |
| Tier-based ordering rules and variance thresholds | **High → Medium** | C1 product lists via purchase contract configuration (location restriction, catalog restriction, per-location contract hierarchy — PIM Guide pp. 70–76); C5/C6 variance + justification capture remain custom development |
| Redistribution workflow for external providers | **High** | Not achievable for external sites without community connect or portal |
| Infrastructure impact on Connect Care clinical operations | **High** | Requires Epic written confirmation |
| Cold chain incident guided workflow | **Medium** | Custom workflow build |
| Batch data processing pipeline | **Medium** | Custom development |
| Forecast-based ordering | **Low** | Third-party integration or manual process; desirable not mandatory |

---

## Questions to Resolve Before Confirming Extension Viability

1. **What are the specific requirements for configuring the Willow X12 interface with Canadian vaccine suppliers?** The interface guide flags non-US organizations as having special requirements. Confirm DIN support in the X12 850/856/810 product identification fields and whether additional Epic licenses or configuration steps apply for Canadian EDI trading partners.
2. **Confirm the GHX XML schema and configuration requirements for Batch Scheduler template 48016 (Import External Inventory Requests).** Contact Epic representative referencing parent SLG 3992958. *Partially answered by PIM Guide pp. 156–159: XML format is determined jointly with the Epic representative (not a fixed schema); external submitting sites are built as inventory locations with no Epic access; fulfilling depots are built as internal suppliers with an attached contract; security point 725 governs cancellation of imported requests.* Outstanding: minimum supported job scheduling interval (sub-daily?) and volume limits at ~1,500 submitting locations.
2a. **Can Inventory Workqueue Blocking Rules (PIM Guide pp. 135–136) gate imported external requests on the Requests to Fulfill side before fulfillment begins?** If yes, the depot order-approval stage (C2) is achievable through workqueue configuration rather than custom workflow build. Also confirm the formal request status model — is there a distinct picked/filling status between Submitted and Shipped, or is fulfillment progress tracked only at item level?
2b. **Can an order-time exception justification (C6) be captured natively anywhere in the request workflow?** Security point 722 hard-blocks over-threshold requests with no documented override-with-justification path; balance-update reason codes (PIM Guide p. 83) do not apply to orders.
2c. **Can a purchase contract catalog serve as the authoritative source for the portal's per-tier product display?** I.e., is the contract catalog (with I PCO 405 restriction) queryable via API or extract so the portal renders exactly what each tier may order, with no dual maintenance?
2d. **What happens when an imported XML request (batch 48016) contains an item outside the attached contract's catalog?** Confirm it surfaces as a per-request error in Requests to Fulfill rather than importing unrestricted — this determines whether the contract is an enforced eligibility boundary for external orders or display-layer only.
3. **What is the Interconnect API surface for order status reads and urgent order submission?** Specifically: order status query by request ID (so the portal can show live status), and whether a real-time SupplyRequest creation endpoint exists as a fallback for urgent submissions that cannot wait for the batch cycle.
3. **Can the existing Connect Care infrastructure support peak VIMS ordering load (e.g., concurrent portal sessions during a public health event) without impacting clinical operations on the same instance?** What is the isolation model and available capacity headroom?
4. **How does Epic recommend modeling 13 regional depots within the existing Connect Care organizational structure for tier-based reporting?** Inventory location creation is confirmed to be independent of Epic Department/Facility linkage, so depot and external locations can be created freely; the remaining question is the recommended reporting rollup structure across tiers.
5. **Has Epic implemented a Willow Inventory integration where an externally built portal, authenticating as provider portal users, submits supply orders and adjustments via Interconnect?** Is there a reference implementation or supported pattern for this?
6. **For the recall management and redistribution workflows — which have no equivalent in standard Willow Inventory — what is Epic's recommended approach?** Are there Epic modules (e.g., Willow Ambulatory, Supply Chain) that cover these gaps, or would these require custom development?

---

*References: Epic Willow Alberta VIMS Detailed Assessment Package (June 4, 2026); VIMS RFP Detailed Requirements List — Attachment #1; Willow Inventory X12 Interface Setup and Support Guide (Epic, May 2, 2025); Pharmacy Inventory Management Setup and Support Guide (Epic, May 1, 2026)*
