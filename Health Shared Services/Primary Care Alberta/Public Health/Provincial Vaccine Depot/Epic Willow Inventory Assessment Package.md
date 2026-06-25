**Epic Willow Assessment Package  
**Alberta Provincial Vaccine Inventory Management System (VIMS)  
Capability Assessment Request

_Prepared for Epic response package | June 04, 2026_

# Cover Letter

Subject: Request for Capability Assessment – Alberta Provincial Vaccine Inventory Management System (VIMS)

Alberta Primary and Preventative Health Services (PPHS) is evaluating whether Epic Willow and associated Epic modules can support provincial vaccine inventory management requirements.

This assessment is not intended to evaluate Epic’s clinical immunization documentation capabilities. Rather, the focus is on evaluating Epic’s ability to function as a province-wide vaccine supply chain management platform supporting:

·       Provincial Vaccine Depot (PVD)

·       Regional Vaccine Depots

·       Community Pharmacies

·       Physician Clinics

·       Public Health Programs

·       Wholesale Distributors

Epic is requested to complete this assessment and provide supporting architecture, implementation, commercial, and reference information.

# Important Context for Epic: EMR vs Provincial Vaccine Inventory Management System

Alberta requests that Epic assess Willow against a provincial public health supply chain operating model rather than a traditional hospital pharmacy inventory model.

The Alberta VIMS is not an EMR, Pharmacy Information System, or Immunization Registry. Its primary purpose is to manage the provincial vaccine supply chain from acquisition through allocation, ordering, distribution, inventory management, redistribution, wastage management, recall management, reporting, and operational accountability.

The VIMS manages approximately $150 million annually in vaccines and biologics and must support inventory accountability across multiple independent organizations.

## Alberta Provincial Operating Model

|                   |                                                                                        |                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Tier**          | **Organizations / actors**                                                             | **Primary responsibilities**                                                                                                          |
| Tier 1            | Provincial Vaccine Depot (PVD)                                                         | Central provincial inventory, allocation, receiving, shipping, recall coordination, shortage response, emergency response inventory.  |
| Tier 2            | 13 Regional Vaccine Depots / PCA Vaccine Depots                                        | Receive inventory from PVD, store inventory, redistribute inventory, support local providers, maintain depot-level stock visibility.  |
| Tier 3            | Community providers including pharmacies, physician clinics, and public health clinics | Order vaccine, receive vaccine, maintain local inventory, return expired/wasted inventory, report inventory and wastage.              |
| External partners | Wholesale distributors and potentially manufacturers                                   | Support distribution logistics, shipment data, product movement, and potential future integration with external supply chain systems. |

## Key Difference from a Traditional Willow / Hospital Pharmacy Inventory Use Case

|   |   |   |
|---|---|---|
|**Dimension**|**Traditional EMR / Willow pharmacy inventory lens**|**Alberta provincial VIMS lens**|
|Primary purpose|Support medication inventory and pharmacy operations within a health delivery organization.|Manage province-wide vaccine logistics, supply chain accountability, allocation, redistribution, and reporting.|
|Inventory scope|Hospital or health-system pharmacy inventory.|Provincial depot, regional depots, pharmacies, physician clinics, and public health inventory.|
|Patient encounter dependency|Often connected to clinical ordering, dispensing, and medication administration workflows.|Must function independently of patient encounters and clinical administration documentation.|
|Users|Pharmacy staff, clinicians, medication management users.|Provincial program staff, depot staff, providers, pharmacies, administrators, public health users, and potentially distributors.|
|Core risk|Medication availability and patient care workflow disruption.|Provincial supply disruption, inability to redistribute inventory, recall exposure, wastage, public accountability failure, emergency response failure.|
|Reporting|Operational pharmacy and medication management reporting.|Province-wide inventory, wastage, allocation, expiry, recall, redistribution, and emergency response reporting.|

## Illustrative Provincial Scenarios Epic Should Assess

**Pandemic Redistribution:** A shortage is identified in Calgary. The Province must identify available inventory across Alberta, locate lots nearing expiry, determine what inventory can be redistributed, initiate transfers, and track inventory in transit. This workflow occurs independently of a patient encounter.

**Provincial Recall:** A manufacturer issues a recall. The Province must identify every affected lot, every depot, pharmacy, and clinic holding recalled inventory, freeze or flag affected product, coordinate return workflows, and report completion status.

**Cold Chain Incident:** A provider reports a cold chain breach. The system must identify affected product, separate viable from non-viable inventory, capture reason codes, prompt required documentation, and support return or wastage reporting.

**Expiry and Wastage Management:** The Province must monitor near-expiry inventory and wastage by product and location, identify opportunities to redistribute product before expiry, and support audit reporting.

**Provider Ordering Outside Threshold:** A provider submits an order exceeding normal ordering thresholds. The system must allow the order, capture reason codes, route for approval where required, and preserve auditability.

# Section 1 – Assessment Objectives

Epic is requested to assess functional fit, implementation complexity, architectural feasibility, commercial impact, and referenceability.

|   |   |
|---|---|
|**Response**|**Definition**|
|Native|Available today in Epic Willow or an identified Epic module without modification.|
|Configuration|Available through standard Epic configuration, build, security, workflow, reporting, or implementation configuration.|
|Custom Development|Requires Epic development, non-standard customization, custom code, or product enhancement.|
|Third-Party|Requires an external non-Epic product or partner solution.|
|Not Supported|Cannot be supported or is not recommended by Epic.|

|   |   |
|---|---|
|**Complexity rating**|**Definition**|
|Low|Less than 40 hours total effort.|
|Medium|40–200 hours total effort.|
|High|More than 200 hours total effort.|
|Major Enhancement|Product development or major solution extension required.|

## Reference Implementation Expectations

For each major capability, Epic should identify comparable customers or implementation patterns, including customer, jurisdiction, scope, number of sites, number of users, and similarity to Alberta.

# Section 2 – Strategic Questions

**Provincial Supply Chain:** Can Willow function as a province-wide vaccine supply chain platform independent of patient encounters? Describe the architecture, limitations, assumptions, and recommended operating model.

**Public Health Use Case:** Can Willow support PVD, regional depots, community pharmacies, physician clinics, and public health programs without requiring an Epic clinical implementation at each external site? Explain.

**Multi-Organization Model:** Describe how Epic would model PVD, 13 regional depots, approximately 1,500 pharmacies, physician clinics, public health offices, and wholesale distributors.

**External Provider Access:** Describe how external pharmacies and physician clinics would access the solution, authenticate, manage inventory, and submit orders without becoming full Connect Care / Epic clinical users.

**Legal Entity and Data Segregation:** Describe how inventory ownership, facility access, role-based permissions, and reporting boundaries would be managed across multiple organizations and legal entities.

**Recommended Architecture:** Would Epic recommend Willow as the primary VIMS, or a specialized VIMS integrated with Epic? Provide rationale, assumptions, and examples.

# Section 3 – Capability Assessment Matrix with Requirement Descriptions

Epic should complete the following tables. The descriptions explain the Alberta VIMS business intent so Epic can assess the requirements against a provincial supply chain operating model rather than only a hospital pharmacy / EMR model.

|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|**ID**|**Requirement**|**Alberta VIMS requirement description / business intent**|**RFP traceability**|**Epic response: Native / Config / Custom / 3rd Party / Not Supported**|**Epic proposed approach**|**Complexity / effort**|**Assumptions, dependencies, reference sites**|
|A1|Provincial warehouse inventory management|Ability to manage the Provincial Vaccine Depot as the central warehouse for publicly funded vaccines and biologics, including receipt, storage, allocation, picking, packing, shipping, adjustments, and reporting. The intent is province-wide inventory control, not site-level medication inventory only.|Project objectives; SR-02; SR-09; SR-10|||||
|A2|Multi-tier distribution model|Ability to model and operate a three-tier distribution hierarchy: PVD → regional depots → community providers. The system must support different workflows, permissions, ordering rules, product lists, and visibility at each tier.|Project stakeholders; SR-02; SR-03; SR-04|||||
|A3|Depot-to-depot transfers|Ability to transfer inventory between PVD and regional depots, and potentially between depots, while preserving lot, expiry, quantity, shipment, receipt, and audit history.|SR-02; SR-10; RNA-02|||||
|A4|Depot-to-provider distribution|Ability for depots to distribute vaccine to pharmacies, physician clinics, and public health providers, including order approval, picking, packing, shipment, and receipt confirmation.|SR-02; SR-09; SR-15|||||
|A5|Inventory receiving|Ability to receive product into inventory from suppliers, PVD, regional depots, wholesalers, or transfers, including product, lot, expiry, quantity, and holding location capture.|SR-02; SR-03; E barcode requirements|||||
|A6|Inventory returns|Ability for providers and depots to return expired, wasted, recalled, or otherwise non-viable product to the appropriate depot or PVD with reason codes and supporting documentation prompts.|SR-16|||||
|A7|Recall management|Ability to identify all locations holding a recalled product or lot, notify users, freeze/flag affected inventory, coordinate returns, and report recall completion status across the province.|SR-16; RNA-01; RNA-02|||||
|A8|Redistribution during shortages|Ability to identify inventory available for redistribution, including near-expiry product, and support transfers during supply shortages, recalls, or public health emergencies.|Project background/objectives; RNA-02; SR-10|||||
|A9|Emergency response inventory management|Ability to support urgent public health events requiring rapid visibility, allocation, shipment, and tracking of vaccine inventory across multiple organizations and regions.|Project objectives; AD-07; AD-08|||||
|A10|Pandemic response inventory management|Ability to scale and operate during pandemic response, including high-volume ordering, allocation, inventory visibility, redistribution, reporting, and multi-stakeholder coordination.|Project background/objectives; AD-07; AD-08|||||

|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|**ID**|**Requirement**|**Alberta VIMS requirement description / business intent**|**RFP traceability**|**Epic response: Native / Config / Custom / 3rd Party / Not Supported**|**Epic proposed approach**|**Complexity / effort**|**Assumptions, dependencies, reference sites**|
|B1|Lot tracking|Track vaccine inventory by lot number at every holding location. Lot tracking must persist across receiving, transfers, ordering, returns, wastage, and recall workflows.|SR-03; RNA-02|||||
|B2|Expiry tracking|Track expiry dates for every vaccine lot and support near-expiry alerts, reporting, redistribution decisions, and wastage prevention.|RNA-04; SR-03; SR-12|||||
|B3|Batch management|Support batch upload, validation, and processing for vaccine and transfer data, including lot validation, mandatory review flags, error handling, retries, and operational monitoring.|SR-06|||||
|B4|Product master management|Maintain vaccine product master data, including generic vaccine type, trade name, manufacturer, lot attributes, dose format, funding type, and product list eligibility by tier or provider group.|SR-03; SR-07; SR-08|||||
|B5|Inventory adjustments|Allow authorized users to increase or decrease on-hand quantities using configurable reason codes, while preserving audit history and preventing unauthorized changes.|SR-19; SR-04|||||
|B6|Inventory reconciliation|Support physical counts, count sheets, inventory reconciliation reports, discrepancy resolution, and audit-ready reconciliation documentation.|RNA-03; Appendix D supplements|||||
|B7|Wastage tracking|Track wasted vaccine quantities in doses by product, location, reason, and inventory tier. Supports provincial wastage reporting and cost-effectiveness monitoring.|SR-12; SR-16|||||
|B8|Cold chain incident management|Capture cold chain breach reason codes, prompt required documentation, separate viable from non-viable inventory, and support return/wastage workflows.|SR-16|||||
|B9|Multi-location storage|Manage inventory across multiple holding points and storage levels such as fridge, cart, shelf, depot, provider site, and other configured locations.|SR-09; SR-10|||||
|B10|Holding point management|Restrict where products may be picked from and display holding locations on picking/packing slips to support efficient warehouse and depot operations.|SR-09; SR-10|||||

|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|**ID**|**Requirement**|**Alberta VIMS requirement description / business intent**|**RFP traceability**|**Epic response: Native / Config / Custom / 3rd Party / Not Supported**|**Epic proposed approach**|**Complexity / effort**|**Assumptions, dependencies, reference sites**|
|C1|Provider ordering|Allow community providers, pharmacies, physician clinics, and public health clinics to order vaccine from the appropriate depot based on role, product list, eligibility, and location.|SR-02; SR-04|||||
|C2|Order approval workflows|Support order approval by depot or provincial users, including tier-specific permissions, review rules, variance checks, and order status tracking.|SR-02; SR-04; SR-13; SR-14|||||
|C3|Order status tracking|Display order status throughout lifecycle: submitted, reviewed, approved, picked, packed, shipped, received, partially fulfilled, rejected, or cancelled.|SR-15|||||
|C4|Shipment tracking|Support visibility into shipping status and shipment-related notifications, including recipient alerts when vaccine has shipped.|SR-15|||||
|C5|Variance thresholds|Support ordering thresholds based on expected usage, inventory on hand, product rules, location, or ordering schedule, while allowing authorized exceptions.|SR-13; SR-14|||||
|C6|Exception justification|Capture configurable reason codes when a provider places an order outside variance thresholds. Preserve exception data for review, approval, reporting, and audit.|SR-14|||||
|C7|Automated notifications|Send in-system or email notifications for shipment, low stock, near expiry, user account events, and program administrator communications.|RNA-04; SR-15; SR-20; SR-21|||||
|C8|Inventory-driven ordering|Display on-hand inventory at the ordering location and support ordering decisions based on inventory balance, minimum increments, ordering schedule, and product eligibility.|SR-11|||||
|C9|Forecast-based ordering|Support or integrate with forecasting logic to estimate demand, optimize allocation, reduce wastage, and inform ordering decisions. Epic should indicate whether this is native, analytics-based, or requires external tools.|Project objectives; D8/D9|||||
|C10|Bulk ordering|Support high-volume or batch ordering workflows for large providers, depots, campaign periods, influenza season, or pandemic response.|SR-06; SR-11|||||

|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|**ID**|**Requirement**|**Alberta VIMS requirement description / business intent**|**RFP traceability**|**Epic response: Native / Config / Custom / 3rd Party / Not Supported**|**Epic proposed approach**|**Complexity / effort**|**Assumptions, dependencies, reference sites**|
|D1|Real-time inventory visibility|Provide near real-time visibility into vaccine location, quantity, lot, expiry, and movement across all tiers of the provincial supply chain.|Project objective 1; RNA-02|||||
|D2|Provincial inventory dashboard|Provide dashboard views for provincial users showing inventory by product, lot, region, depot, provider, funding type, expiry horizon, and supply status.|RNA-01; RNA-02|||||
|D3|Near-expiry reporting|Identify products nearing expiry by location and product to support redistribution, wastage prevention, and operational follow-up.|RNA-01; RNA-04|||||
|D4|Wastage reporting|Report vaccine wastage by product, location, reason code, tier, and time period. Support export and audit review.|RNA-01; SR-12; SR-16|||||
|D5|Recall reporting|Report affected locations, quantities, lots, return status, and completion status for recall events.|SR-16; RNA-01|||||
|D6|Ordering trends|Report vaccine ordering and usage trends by tier, product, location, provider group, and time period.|RNA-01|||||
|D7|Utilization trends|Support analysis of inventory movement, use, wastage, and ordering patterns to inform program planning and allocation decisions.|Project objectives; RNA-01|||||
|D8|Forecasting|Provide forecasting or integration with forecasting tools to anticipate vaccine demand and inform procurement, allocation, and redistribution decisions.|Project background/objectives|||||
|D9|Demand planning|Support demand planning across routine programs, seasonal programs, outbreaks, and pandemic campaigns. Epic should explain whether Cogito or other analytics tools are required.|Project objectives|||||
|D10|Pandemic inventory modelling|Support modelling of inventory supply, regional demand, allocation scenarios, and surge distribution during pandemic response. Epic should identify whether this requires external analytics or custom modelling.|Project objectives|||||

|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|**ID**|**Requirement**|**Alberta VIMS requirement description / business intent**|**RFP traceability**|**Epic response: Native / Config / Custom / 3rd Party / Not Supported**|**Epic proposed approach**|**Complexity / effort**|**Assumptions, dependencies, reference sites**|
|E1|GS1 Data Matrix|Support GS1 Data Matrix barcode standards for vaccine product identification and automated capture of manufacturer barcode data.|SR-05|||||
|E2|WHO AIVP compliance|Align barcode functionality with WHO Automated Identification of Vaccine Products standards for vaccine identification and traceability.|SR-05|||||
|E3|Barcode receiving|Use barcode scanning during receiving to populate product, manufacturer, lot number, expiry date, and other inventory fields to improve accuracy and reduce manual entry.|SR-05; SR-03|||||
|E4|Barcode picking|Use barcode scanning to support picking workflows and verify correct product, lot, quantity, and holding location during order fulfillment.|SR-05; SR-09|||||
|E5|Barcode inventory counts|Support barcode-assisted physical counts and reconciliation to improve count accuracy and reduce manual effort.|SR-05; RNA-03|||||
|E6|Automated lot capture|Automatically capture lot number from vaccine manufacturer barcode where available and map it into inventory records.|SR-05|||||
|E7|Automated expiry capture|Automatically capture expiry date from barcode where available and use it for expiry management, near-expiry alerts, and recall/wastage reporting.|SR-05|||||

|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|**ID**|**Requirement**|**Alberta VIMS requirement description / business intent**|**RFP traceability**|**Epic response: Native / Config / Custom / 3rd Party / Not Supported**|**Epic proposed approach**|**Complexity / effort**|**Assumptions, dependencies, reference sites**|
|F1|REST APIs|Support REST APIs for integration, automation, data exchange, reporting, and future interoperability with provincial systems or external platforms.|AD-09; AD-11; AD-12|||||
|F2|HL7 v2|Support HL7 v2 where needed for healthcare integration patterns, including inbound, outbound, or bidirectional messages where applicable.|AD-10; SR-01|||||
|F3|HL7 v3|Support HL7 v3 where needed for legacy or provincial health information exchange patterns.|AD-10|||||
|F4|FHIR|Identify any FHIR capabilities, scope, limitations, relevant resources, and how FHIR would or would not be used for vaccine inventory versus immunization clinical records.|AD-10; AD-12|||||
|F5|CSV Import/Export|Support standard import/export in CSV and related formats for inventory, reporting, batch processing, reconciliation, and data migration.|AD-09; SR-17|||||
|F6|SFTP|Support secure file transfer patterns for batch data exchange, reporting feeds, migration, or partner integrations.|AD-09|||||
|F7|Provincial immunization repository integration|Describe how VIMS would integrate with Alberta immunization repositories or registries if needed, while preserving the distinction between inventory and clinical immunization records.|AD-12; SR-01|||||
|F8|Connect Care integration|Describe how Willow/VIMS would integrate with Connect Care where inventory, administration, or reporting workflows intersect, including whether all sites must be Epic-enabled.|AD-12; SR-01|||||
|F9|Netcare integration|Describe whether and how inventory-related data would integrate with Netcare, recognizing Netcare is primarily clinical health information infrastructure rather than supply chain infrastructure.|AD-12|||||
|F10|Pharmacy system integration|Describe how independent pharmacy systems could exchange order, shipment, inventory, or administration-related data with Epic/Willow without each pharmacy operating as a full Epic clinical site.|AD-09; AD-12; SR-01|||||

|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|**ID**|**Requirement**|**Alberta VIMS requirement description / business intent**|**RFP traceability**|**Epic response: Native / Config / Custom / 3rd Party / Not Supported**|**Epic proposed approach**|**Complexity / effort**|**Assumptions, dependencies, reference sites**|
|G1|Role-based access control|Support role-based access that restricts ordering, editing, deletion, inventory visibility, and facility access by user role, organization, tier, and assigned facility.|SR-04; PS1-PS5|||||
|G2|Multi-factor authentication|Support strong authentication and MFA for user access, including external users where applicable.|PS7; PS10|||||
|G3|Audit logging|Capture audit logs for user activity, access, configuration changes, privilege changes, inventory adjustments, order actions, and security events. Support administrative audit reporting.|PS13-PS15B; PLAS|||||
|G4|Canadian hosting|Host servers and data stores in Canada to meet Alberta privacy, security, data residency, and operational expectations.|AD-03; PS43|||||
|G5|Data residency|Restrict data storage, processing, backup, recovery, and network traffic to Canadian environments where required.|Contract POPA/HIA clauses; PS43|||||
|G6|Encryption at rest|Encrypt sensitive data and backups at rest using appropriate cryptographic controls and key management.|PS11; PS26|||||
|G7|Encryption in transit|Protect all network communications using secure protocols such as TLS/SSH and appropriate transmission integrity controls.|PS12|||||
|G8|Disaster recovery|Provide disaster recovery with documented plan, annual testing, Canadian facilities, and RTO/RPO commitments. RFP indicates RTO within 24 hours.|Schedule C; PS25; PS26|||||
|G9|Business continuity|Maintain operations during disruptions through business continuity planning, support processes, backups, incident management, and recovery procedures.|Schedule C; OP-01; PS25|||||
|G10|HIA compliance support|Support Alberta Health Information Act obligations, privacy controls, security safeguards, auditability, breach response, and role-based access appropriate to health information handling.|HIA; POPA; ATIA; PS controls|||||

# Additional RFP Requirement Groups Epic Should Address

In addition to the capability domains above, Epic should respond to the following Alberta RFP requirement groups.

|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|**ID**|**Requirement**|**Alberta VIMS requirement description / business intent**|**RFP traceability**|**Epic response: Native / Config / Custom / 3rd Party / Not Supported**|**Epic proposed approach**|**Complexity / effort**|**Assumptions, dependencies, reference sites**|
|UX1|SaaS cloud web-based frontend|Browser-based SaaS access with minimal technical requirements for end users. This is especially important for external providers who may not be on Alberta Health Shared Services infrastructure.|UE-01; AD-06|||||
|UX2|Responsive UI and accessibility|Responsive user interface across supported devices, screen sizes, and browsers; alignment with Government of Alberta and PPHS UI/UX expectations.|UE-08|||||
|UX3|Self-help and online education|Contextual help, tutorials, online education, role-based training, and materials that remain current with releases.|UE-05; UE-06; UE-07; Appendix B|||||
|OPS1|Multiple environments|At least production, UAT, sandbox/external interface testing, and training environments, with access to databases where applicable.|AD-02|||||
|OPS2|Scalability|Support at least 5,000 named users and 500–1,000 concurrent users, with scalable architecture and performance expectations.|AD-07|||||
|OPS3|Availability and reliability|24/7 availability, fault tolerance, scheduled maintenance outside business hours, and defined service level commitments.|AD-08; Schedule A|||||
|OPS4|Service desk support|Support approximately 5,000 end users with defined service desk processes, ticketing, escalation, response times, and reporting.|OP-02; OP-06; Schedule A|||||
|OPS5|Training and change management|Provide training plans, materials, virtual/online modules, train-the-trainer where applicable, user readiness, and adoption support.|Appendix B; Attachment #4|||||
|OPS6|Transition and data migration|Transition from existing VIMS, migrate data, validate migration, support cutover, maintain operations, and minimize disruption.|Appendix B; Schedule D; Attachment #4|||||
|OPS7|Service levels and reporting|Provide bi-weekly project reporting and monthly service level reporting for outages, data integrity, security incidents, documentation quality, UAT defects, incidents, and call abandonment.|RFP 3.2; Schedule A|||||
|OPS8|Security controls and SDLC|NIST-informed controls for access, authentication, encryption, logging, incident response, vulnerability management, penetration testing, privacy, SDLC, and change management.|PS1-PS43|||||

# Section 4 – Architecture Assessment

Epic should provide architecture diagrams and narrative descriptions for the following options.

|   |   |
|---|---|
|**Architecture option**|**Required Epic response**|
|Willow as primary VIMS|Show how Willow would support PVD, regional depots, pharmacies, physician clinics, public health programs, and wholesale distributors. Identify required Epic modules, external access model, security model, reporting model, and integration points.|
|Willow plus Epic ecosystem|Show Willow, Healthy Planet if applicable, Cogito, Interconnect, FHIR APIs, reporting, analytics, identity, audit, and integration services.|
|Specialized VIMS integrated with Epic|Show a dedicated provincial VIMS as the supply chain system of record, with Epic integration for clinical immunization or medication workflows where appropriate.|
|Hybrid / phased model|Show how Alberta could start with a specialized or interim VIMS and integrate with Epic over time, including future optional Willow or Cogito integration.|

## Architecture Diagrams Requested

·       Logical application architecture

·       Deployment / hosting architecture

·       Organization and facility model

·       Identity and access management model

·       Data flow and integration architecture

·       Reporting and analytics architecture

·       Disaster recovery and business continuity architecture

·       External provider access model

·       Security and audit logging model

# Section 5 – Gap Assessment

|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|**Gap**|**Requirement impacted**|**Business impact**|**Epic workaround**|**Estimated effort**|**Residual risk**|**Reference implementation**|
||||||||
||||||||
||||||||
||||||||
||||||||
||||||||
||||||||
||||||||

# Section 6 – Implementation Assessment

Epic should provide a realistic implementation plan, not a generic implementation methodology.

|   |   |
|---|---|
|**Implementation phase**|**Epic response required**|
|Discovery|Activities, duration, stakeholders, data required, decisions required.|
|Design|Workflow design, organization/facility model, product master, security, integration, reporting.|
|Build / configuration|Willow build, related Epic module build, security, external access, reporting, interfaces.|
|Data migration|Migration from existing VIMS, data mapping, validation, reconciliation, historical data approach.|
|Testing|System testing, integration testing, performance testing, UAT, regression testing, defect management.|
|Training|Role-based training, external provider training, depot training, support training, training materials.|
|Cutover|Parallel operations, transition, downtime, rollback, support readiness.|
|Go-live support|Hypercare, service desk, issue triage, monitoring, service levels.|
|Operational support|Ongoing support, release management, upgrades, reporting, SLA management.|

## Resource Requirements

|   |   |
|---|---|
|**Resource group**|**Epic should identify required roles and estimated effort**|
|Epic Willow||
|Epic pharmacy / medication management||
|Epic integration / Bridges / Interconnect / APIs||
|Epic Cogito / reporting / analytics||
|Epic security / identity / audit||
|Epic infrastructure / hosting||
|Epic project management||
|Alberta business SMEs||
|Alberta technical SMEs||
|Alberta privacy/security/legal||
|External provider representatives||

# Section 7 – Commercial Assessment

|   |   |
|---|---|
|**Cost category**|**Epic response required**|
|Licensing|Willow, related Epic modules, external user licensing, reporting/analytics, integration components.|
|Infrastructure / hosting|Hosting model, environments, disaster recovery, data residency, storage, networking.|
|Implementation services|Discovery, design, build, configuration, migration, integration, testing, training, go-live.|
|Training|Initial training, online modules, external provider training, ongoing updates.|
|Support|Service desk, application support, incident response, release support, SLA reporting.|
|Ongoing operations|Annual maintenance, upgrades, support model, reporting operations, security operations.|
|Third-party costs|Any non-Epic components needed for warehouse operations, barcode scanning, analytics, forecasting, or external provider access.|

# Section 8 – Executive Summary Template for Epic

Epic should provide an executive summary comparing the following options.

|   |   |   |   |
|---|---|---|---|
|**Assessment dimension**|**Option 1: Willow as Alberta’s primary VIMS**|**Option 2: Specialized VIMS integrated with Epic**|**Epic recommended position**|
|Functional fit||||
|Architecture fit||||
|External provider fit||||
|Provincial supply chain fit||||
|Implementation complexity||||
|Time to implement||||
|Cost profile||||
|Major risks||||
|Dependencies||||
|Referenceability||||
|Epic recommendation||||

# Final Question for Epic

Would Epic recommend Willow as the primary provincial vaccine inventory and distribution platform for Alberta’s vaccine supply chain, or would Epic recommend a specialized VIMS integrated with Epic?

Please provide rationale, assumptions, limitations, reference implementations, architecture implications, implementation timeline, and commercial implications.

# Appendix A – Epic Response Checklist

·       Completed capability assessment tables for all domains.

·       Explicit distinction between native Willow, Epic configuration, other Epic modules, custom development, third-party products, and unsupported requirements.

·       Architecture diagrams for each viable option.

·       Gap analysis with workarounds and residual risk.

·       Reference implementations comparable to Alberta’s public health supply chain model.

·       Implementation plan and staffing model.

·       Commercial estimate and licensing assumptions.

·       Final recommendation: Willow primary VIMS vs specialized VIMS integrated with Epic.