---
title: Willow Inventory Provincial Vaccine — Application Context Model
type: Application Context Model
description: Component-based application context narrative for the Epic Willow Inventory Provincial Vaccine (VIMS) solution, structured to the ArchiMate model nesting for extraction into Archi Documentation fields.
author: Alec Blair
framework: Stealth EA Application Context Model
tags:
  - architecture-deliverable
  - vaccine-depot
  - epic-willow
  - vims
last_edited: 2026-06-18
timestamp: 2026-06-18T00:00:00Z
---

# Willow Inventory Provincial Vaccine — Application Context Model

## Solution Architecture Background

This solution architecture supports the [[Epic Willow Inventory Assessment Package]] responses, which in turn reference the [[VIMS RFP Detailed Requirements]]. A [[VIMS Market Scan - Vaccine Inventory Management Vendors|VIMS Market Scan]] was developed to determine how competitive an Epic-based solution would be within the Canadian and global marketplace. The detailed fit analysis behind the gaps summarised here is in the [[Epic Willow Gap Assessment - Alberta Instance Extension|Epic Willow Gap Assessment]], with the supporting decision in the [[SBAR - Epic Willow Extension for Provincial Vaccine Depot|SBAR]].

There are three key functional gaps in what Epic Willow Inventory provides out of the box:

- **Inbound requisitions from external locations** — Epic Willow Inventory is always the *buyer* in its native X12 model; it cannot natively receive an inbound X12 850 purchase order from an external ordering party (confirmed in the [[Review - Pharmacy Inventory Management Setup and Support Guide|PIM Setup and Support Guide review]]). External community locations therefore cannot order directly into Willow over X12. The proposal bridges this gap two ways: a [[#Community Vaccine Portal|Community Vaccine Portal]] for staff-entered requisitions, and the [[#IBM ACE Message Oriented Middleware|IBM ACE]] regional integration engine to receive and transform inbound 850 messages from interface-capable pharmacy systems into Willow's internal request workflow (the GHX/XML import path, Batch Template 48016).
- **Reporting inventory on hand from external locations** — There is no published industry standard for Pharmacy Information System vendors to report on-hand inventory back to a depot. The proposal uses the Automated Dispensing System (ADS) interface specification — Epic's "Medicine Cabinet" / device-inventory pattern — to report inventory levels held at a community location back to its associated [[#Vaccine Storage Unit|Vaccine Storage Unit]].
- **Vaccine inventory functions in the Alberta Netcare Portal** — Epic's MyChart provider portal is patient-centric, so it offers no workflow for the non-patient-centric supply-chain functions external providers need. To bridge this gap the proposal builds a [[#Community Vaccine Portal|Community Vaccine Portal]] module within the Netcare Portal, letting Primary Care clinics and Community Pharmacies log in and perform updates the way they do today in the legacy Alberta Vaccine Inventory (AVI) solution.

Because the scope of this Epic assessment is focused on the vaccine supply chain, several adjacent Epic capabilities are noted as relevant to the wider closed-loop medication management context but are out of scope here:

1. **Integrated vaccine administration** — Where vaccine is administered within Connect Care and the administering department uses the configured vaccine inventory, Willow can automatically decrement the inventory on administration and carry the manufacturer and lot numbers onto the administration record. Manual adjustment for shrinkage and wastage is still required.
2. **Adverse Events Following Immunization (AEFI)** — Population and Public Health documents all AEFI within Connect Care. This data is a key input for proactively identifying issues with a particular vaccine or lot.
3. **Imm/ARI gap** — Connect Care currently tracks only vaccinations administered in Connect Care clinics. Vaccinations reported from the community to Imm/ARI are not yet shared into Connect Care.

## Epic VIMS Application Context Model

![[Willow Inventory Provincial Vaccine - Application Context Model.png]]

## Stakeholders

The current stakeholder groups are:

- **Alberta Provincial Vaccine Depot (PVD)** — Tier 1. Responsible for all vaccine procurement and for monitoring distribution throughout the supply chain, including rebalancing inventory already distributed downstream.
- **Regional Vaccine Depots** — Tier 2. The 13 regional (PCA) depots receive supply from the PVD and distribute it to the departments running Connect Care — including Public Health and the pharmacies that support hospital departments. Hospitals continue to manage vaccines using the legacy Lot Manager functionality.
- **Public Health Clinics** — Tier 3 (internal Epic users). Population and Public Health departments support vaccination through many programs including school immunizations and early-childhood visits, and support Workplace Health and Safety (WHS) vaccination in hospitals without dedicated WHS staff.
- **Primary Care** — Tier 3. A small number of Primary Care clinics administer vaccinations. The Epic Willow Inventory configuration already supports distribution from a regional vaccine depot to these locations.
- **Community Pharmacies** — Tier 3. Community pharmacies are supplied directly from the Provincial Depot. All pharmacies are expected to run their own Pharmacy Information System (PIS), but not all can support integration for procurement and inventory-level reporting.
- **Vaccine Suppliers** — External partners. Currently the only vaccine suppliers are distributors, which may be the same distributors the hospital pharmacies use. Within Health Shared Services, hospital pharmacies use Oracle eBusiness Suite for purchasing integration with these distributors.

### Generic Roles

Two generic roles are added to this model based on the [[Review - Pharmacy Inventory Management Setup and Support Guide|Pharmacy Inventory Management Setup and Support Guide]]:

- **Inventory Manager** — Responsible for receiving shipments, controlling stock, allocating vaccine, and recording wastage.
- **Inventory Supply Analyst** — Consumes the application's reporting and the downstream Snowflake analytics for operational reporting and forecasting.

## Application Functional Decomposition

### Epic (Provincial Connect Care) `(G)`

Connect Care is Alberta's provincial Epic instance and the platform on which this solution is built. No separate Epic instance is stood up; the VIMS capability is delivered by extending the existing Connect Care organizational and facility model with standard Epic modules, configuration, and licensing. Connect Care hosts the Willow Inventory module, the Hyperdrive client, the Rover mobile application, and the Bridges integration engine described below.

#### Epic — Willow Inpatient Inventory (Pharmacy) `(G)`

Willow Inpatient Inventory (Pharmacy) is the governed application of record for vaccine inventory — the `(G)` Application Catalogue entry. It maintains the authoritative depot inventory and exposes the supply-chain functions below. Its functional decomposition is shown as a set of Application Functions (each a screen or module) and two key data objects.

##### Vaccine Procurement

Generates purchase orders to vaccine manufacturers and distributors, driven by par levels and reorder points, and processes the inbound supplier responses. Outbound and inbound supplier traffic is carried over the native Epic X12 interfaces in [[#Epic — Bridges|Epic — Bridges]] (850 out; 855 acknowledgement, 856 advance ship notice, 810 invoice, and 832 price/catalogue update inbound). This is the "buyer" side of the X12 model and is native Willow capability.

##### Vaccine Receiving

Receives inbound vaccine shipments against expected purchase orders and advance ship notices and puts stock away to locations, capturing lot and expiry at the door. This is the point where physical product becomes an inventory record. Receiving can be performed at a workstation in Hyperdrive or on a mobile device via [[#Epic — Rover|Rover]] with barcode capture.

##### Stock Management

Maintains on-hand balances, lot and expiry tracking, and cold-chain status, and supports cycle counting to keep the [[#Vaccine Inventory Record|Vaccine Inventory Record]] true to what is physically on the shelf.

##### Distribution

Allocates available vaccine and records distribution outbound from the depot to other depots, clinics, and sites — the outbound half of the inventory lifecycle. Native transfer mechanisms (direct transfer, internal purchase request, and the Rebalance Stock activity) support allocation, depot-to-depot transfers, and near-expiry redistribution within the depot network.
##### PO Import
Ingests externally originated requisitions into Willow's internal request workflow. Requisitions submitted through the [[#Community Vaccine Portal|Community Vaccine Portal]] or by interface-capable pharmacy systems arrive via [[#IBM ACE Message Oriented Middleware|IBM ACE]] as a transformed file (the GHX-format XML / ZPM batch import, Batch Template 48016) and land on the depot's *Requests to Fulfill* queue. This is the proposed bridge for the inbound-requisition gap, since Willow cannot receive an inbound X12 850 natively.
##### Inventory Adjustments
Records wastage (expiry, cold-chain excursions, breakage), returns, and inventory adjustments with configurable reason codes — preserving an auditable account of every dose that does not reach an arm.
##### Vaccine Catalogue
Maintains the vaccine product master and the orderable product lists. Generic vaccine type, trade name, manufacturer, lot attributes, dose format, and funding/eligibility are maintained here, and purchase-contract catalogues define which products each tier or provider group may order. Supplier-driven price and catalogue changes arrive over the [[#Epic X12 — Catalogue Update|Epic X12 — Catalogue Update]] (832) interface.
##### Vaccine Storage Unit
A data object representing a physical storage location (e.g., a depot fridge) within Willow inventory. A Vaccine Storage Unit may contain one or more **Vaccine Sub-units** (e.g., a shelf or compartment) for finer holding-point management. External community locations are associated with a Vaccine Storage Unit so that requisitions and on-hand inventory reports (via the ADS path) resolve to the correct holding point.
##### Vaccine Inventory Record
The underlying inventory data object holding on-hand quantities, lot, expiry, location, and transaction history. It is the authoritative source for depot inventory — read and written by the application functions above, and extracted to [[#Snowflake Cloud Data Warehouse PRD|Snowflake]] for analytics.
#### Epic Hyperdrive PRD `(G)`
Hyperdrive is the web-based Epic client used by internal users. PVD staff, regional depot staff, and Public Health site staff are all internal Epic users on Hyperdrive and operate entirely within Connect Care using standard Willow Inventory workflows — no external access mechanism is required for these groups. The client is already deployed across the province to Connect Care users, so it carries no incremental UI/UX or bandwidth gap for internal depot operations.
#### Epic — Rover `(G)`
Rover is Epic's iOS mobile application, deployed on a [[#Rover Mobile Device|Rover Mobile Device]] for depot warehouse workflows. It supports balance updates, inventory request creation and receiving, counting, fill/pick, and direct transfers, with barcode scanning to support GS1 Data Matrix capture during receiving, picking, and counts.
#### Epic — Bridges `(G)`
Bridges is Epic's native integration engine. For this solution it carries the supplier-facing X12 EDI traffic between Willow (as buyer) and the [[#Vaccine Supplier Application|Vaccine Supplier Application]]. Bridges is where Epic's native X12 capability lives; the inbound requisition and on-hand-reporting traffic from external community locations is handled separately by [[#IBM ACE Message Oriented Middleware|IBM ACE]], because Willow's X12 interfaces do not support an inbound 850 from an ordering party.
##### Epic X12 — Purchase Order Request
Carries the outbound **850 PO Request** from Willow to the supplier and the inbound **855 PO Response** (acknowledgement) back from the supplier.
##### Epic X12 — Catalogue Update
Carries the inbound **832 Price/Catalogue Update** from the supplier, applying price and catalogue changes into the [[#Vaccine Catalogue|Vaccine Catalogue]].
##### Epic X12 — Shipment
Carries the inbound **856 Advance Ship Notice (Shipment)** from the supplier, used by [[#Vaccine Receiving|Vaccine Receiving]] to create and reconcile the incoming shipment (optionally auto-creating and auto-receiving the shipment when ASN quantities match).
### Rover Mobile Device

The handheld device on which [[#Epic — Rover|Epic — Rover]] runs. It is the mobile endpoint for depot floor operations and hosts the integrated barcode scanner.
#### Bar Code Scanner
The barcode capture device on the Rover Mobile Device. It reads GS1 Data Matrix vaccine barcodes to auto-populate product, manufacturer, lot, and expiry during receiving, picking, and counting — reducing manual entry and improving accuracy.
### Alberta Netcare Portal `(G)`
The Alberta Netcare Portal is the governed provincial clinical portal. It provides the security, identity, and presentation foundation that the Community Vaccine Portal extension re-uses, so that external vaccine functions inherit established Netcare authentication and design rather than standing up a new portal platform.
#### Community Vaccine Portal
A proposed extension to the Netcare Portal that re-uses its security and design to deliver the external-facing vaccine functions and the back-end interfaces into Epic. It is the confirmed approach for community pharmacies and physician clinics that cannot support a direct system interface, giving them an authenticated, web-based way to requisition stock, report inventory, and receive notifications — the role AVI plays today.
##### Inventory Notifications
Delivers communications to community locations such as recall notices, expiry notifications, and shipment and low-stock alerts.
##### Create Vaccine Requisition
Front-ends the X12 850 PO Request from a community location. The requisition is associated with the [[#Vaccine Storage Unit|Vaccine Storage Unit]] for that facility and is routed through [[#IBM ACE Message Oriented Middleware|IBM ACE]] into Willow's [[#PO Import|PO Import]] for fulfilment.
##### Update Vaccine Inventory

Allows community vaccine locations to report their current on-hand inventory (the weekly inventory report) for their location, feeding the on-hand picture back to the associated Vaccine Storage Unit.
### IBM ACE Message Oriented Middleware

IBM ACE is the regional integration engine that mediates and transforms traffic between external community systems and Epic, for the flows Willow cannot handle natively. It is the single point where translation and transformation logic lives, so external format changes are absorbed in one place rather than in Epic. ACE handles two inbound flows: requisitions and on-hand inventory reports from community pharmacy systems and the Community Vaccine Portal. (Supplier-facing X12 traffic does **not** flow through ACE — it runs natively over [[#Epic — Bridges|Epic — Bridges]].)

#### Receive PO Request

Receives the inbound **850 PO Request** from interface-capable [[#Community Pharmacy Information Systems|Community Pharmacy Information Systems]] (and from the [[#Create Vaccine Requisition|Create Vaccine Requisition]] portal function), transforms it to the GHX-format XML / ZPM message Willow expects, and delivers it to [[#PO Import|PO Import]]. This is the mechanism that compensates for Willow not accepting an inbound X12 850 directly.

#### Pharmacy Device Inventory ADS Update

Receives the **Local Inventory Report** (on-hand levels) from community pharmacy systems via the Automated Dispensing System (ADS / "Medicine Cabinet") interface, transforms it, and updates the corresponding [[#Vaccine Storage Unit|Vaccine Storage Unit]] balances in Willow — the proposed bridge for reporting external on-hand inventory.

### Snowflake Cloud Data Warehouse PRD `(G)`

The governed provincial Snowflake analytics platform. It separates analytic workloads from the operational Epic system, serving reporting datasets back to the portal and self-serve analytics to the Inventory Supply Analyst for operational reporting and forecasting.

#### Epic Clarity Data Transfer

The ETL transfer that moves Willow inventory data (via Epic Clarity/Caboodle) into Snowflake.

##### Epic Clarity Snowflake Replica

The data object holding the replicated Willow inventory data in Snowflake — on-hand, lot, expiry, location, and transaction history — used as the basis for provincial reporting and analytics.

### Community Pharmacies

External community pharmacy locations supplied directly from the Provincial Depot. They participate either through an interface-capable Pharmacy Information System or, where that is not available, through the [[#Community Vaccine Portal|Community Vaccine Portal]].

#### Community Pharmacy Information Systems

The class of pharmacy information systems (e.g., Kroll, PharmaClik) operated by community pharmacies. Interface-capable systems exchange ordering and inventory messages with Epic via [[#IBM ACE Message Oriented Middleware|IBM ACE]]. This represents a class of systems rather than a single product, and not all pharmacies will be interface-capable.
##### Pharmacy X12 PO Request

Emits an outbound **850 PO Request** from the pharmacy system to [[#Receive PO Request|IBM ACE]] for transformation into Willow. Pharmacies identify products by DIN, so a DIN-to-internal-item crosswalk is required.
##### Weekly Inventory Update
Emits the pharmacy's **Local Inventory Report** (weekly on-hand levels) to [[#Pharmacy Device Inventory ADS Update|IBM ACE]] for transformation and update into the associated Vaccine Storage Unit.
### Primary Care
External Primary Care locations that administer vaccinations. They participate through the [[#Community Vaccine Portal|Community Vaccine Portal]] where their information systems cannot support a direct vaccine inventory interface, submitting requisitions and inventory updates and viewing depot stock.
#### Primary Care Providers
The provider role at Primary Care clinics that requisitions and administers vaccine. Provider portal user accounts can be provisioned for these requestors (linked to their existing EAF Place-of-Service location records) for identity and audit purposes.
### Vaccine Suppliers

External supply-chain partners that fulfil depot purchase orders. Currently these are distributors (wholesalers); manufacturers may be added in future. Their EDI trading-partner configuration is distinct from internal flows, and Canadian-specific EDI requirements (including DIN vs NDC product identification) apply.

#### Vaccine Supplier Application

The distributor's order-management application. It receives X12 850 purchase orders (carried by [[#Epic — Bridges|Epic — Bridges]]) and returns the corresponding acknowledgement, ship-notice, invoice, and catalogue responses. It represents a class of supplier systems rather than a single product. Its key data objects map to the X12 transaction set:

- **Purchase Order** — the inbound 850 PO Request received from Willow (acknowledged by the 855 response).
- **Catalogue** — the product/price catalogue the supplier maintains and pushes to Willow as the 832 price/catalogue update.
- **Shipping** — shipment data the supplier sends to Willow as the 856 advance ship notice.
- **Invoice** — the 810 invoice the supplier sends to Willow for delivered product.
