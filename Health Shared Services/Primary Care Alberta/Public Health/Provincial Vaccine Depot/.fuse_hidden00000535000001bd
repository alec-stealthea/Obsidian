# Review — Epic Pharmacy Inventory Management Setup and Support Guide

**Source:** [[Pharmacy Inventory Management Setup and Support Guide.pdf]] (Epic official documentation, 192 pages, last updated May 1, 2026)
**Reviewed:** June 11, 2026
**Purpose:** Cross-check the guide against [[Epic Willow Gap Assessment - Alberta Instance Extension]] and [[Epic Willow VIMS Assessment Matrix - Initial Proposed Responses]]. Page numbers cite the guide.

---

## Headline findings

1. **Gap #2 (order approval) narrows further — a native approval mechanism exists.** Inventory Workqueues with Blocking Rules (pp. 135–136) hold a request so it "must be marked as resolved before it can move on to the next status." This is rule-based (e.g., dollar value, item, quantity), governed by security point 711, and since August 2025 supports an "Immediate Sign Off Needed" option requiring a second signoff in-workflow. The approval stage may be achievable through configuration rather than custom workflow build.
2. **Gap #1 import pattern (GHX 48016) confirmed in detail, with a material constraint:** imported external requests close when shipped — there is no native received-confirmation step from the external site (pp. 156–159).
3. **The guide confirms most native-capability claims in the matrix** (lot/expiry tracking, Rebalance Stock, location access restriction, external non-Epic locations as IVL records) and confirms several gaps stand (provincial recall, exception justification capture, operational batch monitoring).

---

## Gap-by-gap detail

### Gap #1 — Inbound requisitions from external providers (C1, A4, SR-02)

The "Import External Inventory Requests" topic (pp. 156–159) documents the exact pattern proposed in the matrix:

- Batch Scheduler template **48016‐GHX Purchase Order Import** ingests XML inventory request files from "inventory locations that don't have access to Epic." Epic flags it as uncommon: "We don't expect many organizations to have a workflow that requires the use of this feature" and requires engagement via parent **SLG 3992958** to agree on XML generation and format (p. 156). This answers part of the matrix residual ("schema/interval confirmation outstanding"): the schema is determined with the Epic representative, not fixed; the import interval is whatever the batch run schedule is set to (e.g., daily; p. 159) — sub-daily frequency should be confirmed with Epic.
- Imported requests land in the **Requests to Fulfill** tab of the depot's Inventory activity (p. 156).
- **Constraint:** "Because the receiving location isn't expected to receive these inventory requests in Epic, the system closes the inventory request when all requested items are shipped" (p. 156). The lifecycle for imported external orders therefore ends at *shipped*. Provider receipt confirmation (A4) and post-ship status visibility (C3) for the external tier must come from the portal/Interconnect layer, not Willow.
- Error handling is per-request: validation issues (unknown balance, non-numeric quantity/price/tax) surface in the Inventory Request activity and the Requests to Fulfill details report (pp. 156–157). There is **no operational error queue or monitoring dashboard** for the import job itself — consistent with keeping Gap #6 (B3 batch processing) open.
- Each external submitting site must be built as an **inventory location (IVL)** even though it is not on Epic (p. 158) — consistent with the June 11, 2026 resolution of the multi-organization separation gap. Fulfilling depots are built as **internal suppliers** with an attached contract used to identify items in the XML (p. 157).
- Security point **725‐Cancel External Fulfillment Requests** lets depot staff cancel bad imported requests; canceled imports can't be reactivated, and partially filled imports can't be canceled (p. 159).

**Implication:** the matrix's proposed workaround is validated by primary documentation. Residual risk wording can now cite the guide directly instead of "documented native import pattern."

### Gap #2 — Order approval routing and status tracking (C2, C3)

**Status lifecycle.** The guide evidences these request statuses by name: *Draft* (a request "in a status of Submitted" follows draft, p. 110 area / purchase-contract rules discussion), *Submitted*, *Shipped* ("the internal request remains at a status of Shipped and needs to be received manually," p. 140), *Received/Completed* (receiving and invoicing workflows, pp. 123–125, 139), and *Closed* (auto-close when received quantity reaches requested, p. 159; imported requests close when shipped, p. 156). **"Picked" appears as an activity, not a named status** — picking happens in the Request Queue (p. 125) and Rover Fill Requests (p. 184), where users mark items complete and tap Send Shipment. The June 11 doc note describing the native set as "submitted → picked → shipped → received" is directionally right but the formal status between submitted and shipped should be confirmed; the guide suggests fulfillment progress is tracked at item level within the request rather than as a distinct "Picked" request status.

**Approval mechanism — the significant finding.** The "Require Users to Monitor Certain Inventory Requests" topic (pp. 135–136) describes Inventory Workqueues:

- Rules identify requests requiring review (example given: requests over $10,000). Rules can be **Blocking** ("the request must be marked as resolved before it can move on to the next status") or **Nonblocking** (appears in the workqueue but proceeds).
- Access is governed by security point **711‐Access Inventory Workqueues**, and individual workqueues can be restricted to named users (p. 135) — supporting tier-specific reviewer roles.
- Starting **August 2025**, "Immediate Sign Off Needed" requires a second signoff in-workflow instead of queueing (p. 136).
- Starting **February 2026**, report models **48073/48074** (Rx Inventory Balances Changes / Search Requests Caught in Workqueue) support turnaround-time and trend monitoring of workqueue actions (p. 136).

Supporting controls: second signoff for balance updates and high-cost actions (pp. 93–97), **728‐Pend Inventory Request Invoices** for invoice review (p. 119), segregation-of-duties controls preventing users from receiving shipments for requests they submitted (p. 122), and receive/invoice limits requiring lead/pharmacist approval for unexpected items or quantities (p. 119).

**Open question for Epic TS:** the workqueue topic is framed around reviewing requests "before they're sent to a supplier" — i.e., outbound purchase requests. Whether Blocking Rules can gate **imported external requests on the Requests to Fulfill side** (the depot-approval use case) needs written confirmation. If yes, Gap #2 reduces to configuration plus the external status-visibility channel; if no, the approval step needs the workflow build as currently documented.

**Implication:** Gap #2 severity (already reduced to Medium on June 11) is defensible and possibly conservative. The remaining unknowns are (a) workqueue applicability to inbound fulfillment requests and (b) provider-facing status for external sites, which the import constraint above makes firmly a portal/Interconnect responsibility.

### Tier-based ordering and variance thresholds — Gap #1 in assessment doc (C1, C5, C6)

- Security point **722‐Limit Purchase Requests to Maximum/Optimum/PAR Levels** enforces quantity ceilings against max/optimum/par with documented precedence logic (pp. 121–122). This is a hard block per security class — there is **no override-with-justification path** documented at request time. C6 (capture reason codes for orders outside thresholds, preserve for review and audit) is therefore still unmet natively; reason codes exist for balance updates (p. 83), not order exceptions.
- Workqueue Nonblocking/Routing rules could *flag* threshold exceptions for review, which combined with 722 gives an approximate enforce-or-review model, but configurable variance percentage thresholds with justification capture remain a build.
- **Aggregate locations** (pp. 34–35) let one location order against combined balances of constituent locations — relevant to regional depot tier design.
- Restricting product lists per provider: contracts can be limited by NDC and by requestable items (pp. 72–73), and locations can be restricted (p. 28) — partial machinery for tier-specific product lists.

**Implication:** assessment unchanged (partially achievable; C5/C6 exception capture requires custom development), now with page-level evidence.

### Province-wide recall (A7, RNA-01)

The guide confirms lot/expiry tracking (pp. 38, 60–61), the Lot and Expiration Manager, and — the closest native machinery to recall handling — **DSCSA supply-chain transaction history with container quarantine** (pp. 175–178): EPCIS interface (kind 621), automatic or manual quarantine of non-compliant containers, security point **782‐Edit Container Quarantine**. This is designed for US DSCSA compliance on inbound packages from external suppliers, not multi-organization outbound recall coordination. Nothing in the guide changes the assessment that province-wide recall across ~1,500 external sites is a high-complexity custom build or supplementary tool.

### Redistribution and near-expiry (A8, B2)

**Rebalance Stock** (pp. 126–130) is confirmed: GA February 2026 (November 2025 by SU E11605354/C11605354, earlier by **SLG 9216651**), security point **784**, algorithmic transfer suggestions using Par-and-Optimum or Average-Days-Supply methods, explicitly positioned for shortage redistribution and near-expiry stock found during cycle counts. Suggested transfers appear on the source location's Requests to Fulfill tab. Matches the matrix entry. External-tier limitation stands: external sites built as IVL records for import purposes won't carry tracked balances, so the algorithm cannot see or pull their stock.

### Batch data processing (B3)

Confirmed import paths: GHX 48016 (requests), electronic invoices (X12 810, p. 151), flat-file invoices/acknowledgements/ship notices (X12 855/856, p. 153), Oracle invoice import (template 48091, p. 156), OPTEL barcode import (template 48093, p. 159). All are batch-scheduler jobs with per-record error surfacing; none provide the RFP's operational monitoring, retry management, or error-queue UI. Gap stands.

### Resolved/retired gaps — corroboration

- Multi-org separation: location access restriction (p. 28) and non-Epic IVL build (p. 158) corroborate the June 11 resolution.
- Mobile depot operations: Rover supports balance updates, request creation/receiving, counting, fill/pick, and direct transfers on iOS (pp. 179–185) — useful for depot warehouse workflow design, not previously cited.

---

## Recommended document updates

1. **Gap Assessment §2 and Matrix C2/C3 row:** add the workqueue Blocking Rules + Immediate Sign Off finding (pp. 135–136) as a candidate native approval mechanism; replace "not independently verifiable in public Epic documentation" source note — the capability set is now verified against the official guide in this folder. Correct "picked" from named status to fulfillment activity pending Epic confirmation.
2. **Matrix Gap #1 row (inbound requisitions):** cite pp. 156–159; note the close-on-ship constraint pushes A4 receipt confirmation and post-ship C3 visibility entirely onto the portal path; note SLG 3992958 engagement requirement.
3. **Questions for Epic TS:** (a) Can Inventory Workqueue Blocking Rules gate imported external requests on the Requests to Fulfill side before fulfillment? (b) What is the formal request status model (is there a distinct picked/filling status)? (c) Minimum supported import interval for the 48016 batch run; (d) Can an order-time exception justification (C6) be captured anywhere natively?

---

*All page references are to the PDF in this folder. Guide content is Epic confidential documentation; handle per Epic UserWeb terms.*
