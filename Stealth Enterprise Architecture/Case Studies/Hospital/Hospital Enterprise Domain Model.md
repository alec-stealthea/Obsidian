---
created: 2025-11-12
Publish Status: Draft
Improvements Needed: Need to add narrative
feature: Hospital Enterprise Domain Model.png
---
Every intelligence operation begins with understanding the terrain. Healthcare terrain is notoriously difficult to navigate — a maze of clinical specialties, regulatory bodies, funding models, and competing priorities that would make even the most seasoned operative pause at the mission briefing.

**Healthcare is complex.** This complexity is obvious to anyone who has received healthcare and even more to those who deliver care. Many, many groups define global, national, and regional standards from every perspective. Constant pressure requires leaders to allocate and re-allocate scarce resources. Finally, healthcare is an interconnected ecosystem of many different organizations that struggle to operate their own business effectively let alone interact seamlessly across the care continuum.

The hospital sits at the centre of this complexity. Unlike a [[Generic Retail Enterprise Domain Model|retail organization]] or manufacturing plant, a hospital brings together virtually every aspect of the care continuum under one roof — or across a campus of roofs. Emergency departments receive patients from ambulances and waiting rooms alike. Surgical suites transform lives in hours. Intensive care units monitor patients around the clock. Pharmacies compound medications while laboratories analyze specimens. And increasingly, hospitals extend their reach into homes, clinics, and virtual spaces.

This makes the hospital an ideal proxy for understanding healthcare continuum more broadly. The domains represented here apply with varying emphasis across the healthcare spectrum — from physician practices to long-term care facilities to health insurers. What makes the hospital unique is the degree to which _all_ these domains must coordinate in real time. A medication order flows from the prescriber through the pharmacy to the nurse to the patient, touching multiple information systems and clinical handoffs along the way. A trauma activation brings together emergency medicine, surgery, radiology, laboratory, and intensive care within minutes. It's like coordinating a dozen field agents across multiple time zones — except the stakes are higher and the margin for error is zero.

The [[Enterprise Domain Model]] that follows uses the hospital as its reference point while remaining applicable to the broader healthcare ecosystem. Where your organisation differs — perhaps you operate a network of ambulatory clinics, or a home health agency, or a health plan — the domains may be weighted differently, but the fundamental pattern of clinical services supported by back office functions, enabled by knowledge management, and connected through channels to stakeholders remains consistent.

![[Hospital Enterprise Domain Model.png]]

---

## Back Office Portfolio

The Back Office is your mission support — the folks who ensure the lights stay on, people get paid, and the organisation remains compliant with whatever regulatory alphabet soup your jurisdiction requires. While patients rarely interact directly with these domains, their effectiveness directly impacts the quality and cost of care delivery. In healthcare, back office carries additional weight — regulatory requirements are more extensive, workforce challenges more acute, and the consequences of failure more immediate than in most industries.

- **Disaster Management** - Healthcare organizations face unique resilience challenges that would test any field operative. Beyond typical business continuity, this domain encompasses mass casualty event planning, pandemic response protocols, and the critical need to maintain care delivery when everything else fails. When [KAOS](https://en.wikipedia.org/wiki/Get_Smart) arrives, the hospital must keep running.
- **Finance** - The financial machinery of healthcare would baffle even Q Branch. This domain manages the intricate dance of multiple payer relationships, government reimbursement programmes, capital investments in medical equipment, and the constant tension between mission-driven care and financial sustainability. Every jurisdiction has its own funding model — single-payer, multi-payer, hybrid — but the complexity is universal. 
- **Facility Management** - Healthcare facilities are among the most complex built environments on the planet. Specialized requirements for infection control, medical gases, redundant power systems, and regulatory compliance make a hospital more like a submarine than an office building. This domain extends beyond typical building management into clinical environment optimization. A hospital never truly closes — facilities must support 24/7 operations while somehow finding windows for maintenance, renovation, and expansion.
- **Human Resources** - The healthcare workforce represents the organisation's most significant investment and most critical constraint. This domain manages not just typical HR functions but also the unique challenges of clinical credentialing, continuing education requirements, professional development, and maintaining workforce well-being in high-stress environments. 
- **Information Technology** - Healthcare IT operates under extraordinary constraints — patient safety implications, privacy regulations, and the need for 24/7 availability with near-zero tolerance for downtime. This domain provides the technical infrastructure that enables modern healthcare while navigating the legacy systems that still power many clinical operations. The intersection of medical devices, clinical applications, and enterprise systems creates integration challenges unlike any other industry. 
- **Regulatory Compliance** - Few industries face the regulatory scrutiny of healthcare. Every jurisdiction has its alphabet soup — privacy legislation, professional licensing bodies, accreditation organizations, ministry or departmental oversight — and this domain must translate all of it into operational guidance that clinical staff can actually follow. The cost of non-compliance ranges from financial penalties to loss of operating authority. Compliance isn't glamorous, but neither is explaining to the board why you've lost your licence.
- **Risk and Privacy** - Patient safety and privacy form the ethical backbone of healthcare. This domain encompasses clinical risk management, patient safety programmes, privacy protection, and the increasingly complex landscape of healthcare cybersecurity. In an era of ransomware attacks targeting hospitals globally, the line between privacy protection and operational continuity has never been thinner. This is where the stakes are highest — one breach can undermine years of trust.
- **Supply Chain** - Healthcare supply chains manage everything from tongue depressors to implantable devices, with unique requirements around sterility, expiration, lot tracking, and just-in-time delivery to clinical areas. The pandemic exposed both the criticality and fragility of healthcare supply chains worldwide, driving renewed focus on resilience and alternative sourcing strategies. Your supply chain is only as strong as its weakest link — and that link might be on another continent.

---

## Clinical Services Portfolio

This is healthcare's Front Office — where the [[Value Stream|value]] is delivered to patients. The portfolio is structured around three primary care settings that reflect how hospitals organise themselves, plus clinical support services that span across all settings. Unlike a typical front office focused on sales and customer service, clinical services involve licensed professionals delivering care under regulatory oversight with life-and-death implications. This is where the mission actually happens.
### Inpatient Domain

Care delivered when patients require overnight stays in the facility. This domain encompasses the most resource-intensive care settings and represents the traditional core of hospital operations.

- **Intensive Care** — The highest-acuity inpatient setting, requiring specialised equipment, staffing ratios, and protocols for patients whose conditions demand continuous monitoring. ICUs often subspecialise into medical, surgical, cardiac, neurological, and neonatal units. Think of it as the control room for your most critical operations.
- **Medicine** — General medical care for patients requiring hospitalisation but not surgical intervention. Internal medicine serves as the backbone of inpatient care, managing complex patients with multiple co-morbidities.
- **Pediatrics** — Inpatient care specialised for children, with unique considerations for family involvement, developmental appropriateness, and size-specific equipment and dosing. Pediatric patients are not simply small adults — the clinical approach differs fundamentally.
- **Surgery** — Peri-operative care including pre-surgical preparation, operative procedures, and post-surgical recovery. The operating room represents one of the hospital's most capital-intensive and tightly scheduled environments.
- **Transplant** — Highly specialized programmes for organ transplantation, involving complex coordination between donors, recipients, transplant teams, and organ procurement organizations. Transplant programmes require significant infrastructure and regulatory oversight.
### Outpatient Domain

Care delivered without overnight stays, representing the growing global shift toward ambulatory services. Many procedures once requiring hospitalisation now occur in outpatient settings, driven by advances in minimally invasive techniques and payer incentives regardless of the funding model.

- **Emergency Medicine** — The front door for acute, unscheduled care. The emergency department spans the continuum from minor injuries to trauma resuscitation, serving both as a care delivery site and a gateway to inpatient admission. In most jurisdictions, emergency departments cannot turn patients away, creating unique financial and operational dynamics.
- **Specialties** — Ambulatory care organized around medical and surgical specialties:
	- _Cardiology_ — Heart and vascular care including diagnostic testing, interventional procedures, and chronic disease management
	- _Orthopedics_ — Musculoskeletal care spanning sports medicine to joint replacement
	- _Neurology_ — Nervous system care including stroke, epilepsy, and neurodegenerative conditions
- **Obstetrics and Gynecology** — Women's reproductive health, spanning both outpatient care and inpatient delivery services. This domain bridges ambulatory and inpatient settings as patients move through pregnancy and childbirth.
- **Oncology** — Cancer care, including diagnosis, treatment (chemotherapy, radiation, surgery), and survivorship support. Oncology increasingly operates as an outpatient service, with infusion centres delivering complex treatment protocols.

### Community Domain

Healthcare extended beyond facility walls — increasingly important as care shifts toward population health management and value-based models worldwide.

- **Continuing Care** — Long-term care services for patients with chronic conditions or recovery needs, including skilled nursing, rehabilitation, and home health services.
- **Public Health** — Population-focused health promotion, disease prevention, and health surveillance. Hospitals increasingly engage in community health needs assessments and population health initiatives, regardless of whether their funding model explicitly rewards such activities.
- **Emergency Medical Services** — Pre-hospital care and medical transport, bridging community and facility-based care. Many hospitals operate or closely partner with EMS agencies. The ambulance is often the first clinical touchpoint.
- **Telehealth** — Virtual care delivery, which has evolved from convenience to essential infrastructure globally. Telehealth enables specialist consultations, chronic disease monitoring, and expanded access to rural and underserved populations. The pandemic accelerated adoption by a decade — now the challenge is sustaining the gains.
- **Research** — Clinical research programmes that advance medical knowledge while offering patients access to emerging treatments. Academic medical centres maintain extensive research portfolios; community hospitals increasingly participate in clinical trials.
### Clinical Support Services Domain

The enabling domains that span across all clinical settings, providing essential diagnostic and therapeutic services. These are your intelligence-gathering and logistics operations — clinical decisions depend on what these domains deliver.

- **Laboratory** — Diagnostic testing services that inform virtually every clinical decision. Labs range from stat testing in the emergency department to complex molecular diagnostics informing cancer treatment.
- **Diagnostic Imaging** — Radiology and other imaging modalities (CT, MRI, ultrasound, nuclear medicine) that visualize patient conditions. Imaging is central to diagnosis and treatment planning across nearly all specialties.
- **Pharmacy** — Medication management from formulary decisions through dispensing and monitoring. Clinical pharmacists increasingly participate in direct patient care, optimising medication regimens and preventing adverse events.
- **Health Information** — Clinical documentation, medical records, and the information infrastructure that enables coordinated care. The electronic health record has become the central nervous system of clinical operations — for better and sometimes for worse.

---

## Knowledge Management Portfolio

The intelligence infrastructure that positions information within the organization's domains. In healthcare, knowledge management carries particular weight given the volume of clinical data generated and the critical importance of having the right information available at the point of care. This is your signals intelligence — useless if it doesn't reach the right people at the right time. While in the model the Knowledge Management elements are modelled as business capabilities, but due to the mission critical nature of some aspects of knowledge, they may end up becoming domains within your particular hospital organization.

- **Master Data Management** - Healthcare struggles with the challenge of identifying patients, providers, locations, and other entities consistently across systems. A patient may have multiple medical record numbers across facilities; a physician may be credentialed under different identifiers. MDM provides the authoritative reference for these critical data elements, enabling patient matching, provider directories, and accurate reporting. Get this wrong, and you're operating blind. 
- **Information Exchange** - Healthcare is intensely collaborative, requiring information to flow between providers, systems, and organizations. This domain manages the technical and governance aspects of interoperability, including standards like HL7 FHIR, CDA, and various messaging protocols. The ideal of seamless information exchange remains aspirational globally, but progress continues through health information exchanges and national initiatives. 
- **Analytics** - Transforming healthcare's abundant data into actionable intelligence for clinical decision support, population health management, operational improvement, and research. Healthcare analytics ranges from real-time sepsis alerts to longitudinal studies of treatment effectiveness. Data without insight is just noise.
- **Terminology Management** - Healthcare speaks in specialized codes — ICD for diagnoses, procedure codes, SNOMED for clinical concepts, LOINC for laboratory tests, medication terminologies. This domain ensures consistent use of standardized terminologies across the enterprise, enabling accurate billing, quality measurement, and clinical decision support. It's the Rosetta Stone that makes clinical communication possible across systems and borders.

---

## Channels Portfolio

The mechanisms through which the organization connects with its stakeholders. Healthcare channels must accommodate diverse populations, urgent communications, and regulatory requirements around access and privacy. These are your lines of communication with assets in the field.
### Digital Channels

- **Mobile App** — Patient-facing mobile applications for appointment scheduling, health records access, medication reminders, and health tracking. Adoption varies significantly by patient population and digital infrastructure availability.
- **Messaging** — Secure communication channels between patients and care teams, enabling asynchronous consultation and reducing endless games of telephone tag. Must comply with privacy requirements while remaining accessible.
- **Portal** — Web-based patient portal for accessing health information, viewing test results, requesting prescription refills, and communicating with providers.
- **Social Media** — Public engagement channels for health education, community building, and organisational communication. Requires careful governance to protect patient privacy while maintaining authentic engagement.
- **Telehealth** — The digital channel for virtual care delivery. Also appears in Clinical Services, reflecting its dual nature as both a channel and a care delivery model.
- **Website** — Public web presence for organisational information, physician directories, service line information, and increasingly, price transparency details.

### Physical Channels

- **Clinics** — Ambulatory care facilities where outpatient services are delivered. May be hospital-owned, physician-owned, or operated through various partnership arrangements.
- **Hospice** — Specialized facilities for end-of-life care, providing comfort-focused care for patients with terminal conditions.
- **Hospital** — Inpatient care facilities representing the traditional centre of healthcare delivery.
- **Patient Home** — Increasingly important as a site of care delivery through home health services, remote patient monitoring, and hospital-at-home programmes. The home is becoming a clinical venue.

---
## Stakeholders Portfolio

The ecosystem of entities that interact with the healthcare organisation. Healthcare stakeholders are notably complex, with the person receiving services often different from the person or entity paying for them. Understanding your stakeholders is Intelligence 101 — you can't influence what you don't understand.
### Patient and Family

- **Patient** — The primary customer, the reason healthcare exists. Patients range from healthy individuals seeking preventive care to critically ill individuals requiring complex interventions.
- **Family** — Caregivers, decision-makers, and support systems integral to the patient's care journey. Family involvement is particularly important in paediatrics, geriatrics, and end-of-life care.
### Employees

- **Prescribers** — Licensed clinicians with prescriptive authority, including physicians, nurse practitioners, and physician assistants (terminology varies by jurisdiction).
- **Clinicians** — Direct care providers including nurses, therapists (physical, occupational, respiratory, speech), technologists, and other clinical staff.
- **Workers** — Non-clinical staff essential to operations, including food service, environmental services, patient transport, and administrative support.
- **Employees** — General employee category encompassing the full workforce.
### Partners

- **EMS** — Emergency Medical Services providers who deliver pre-hospital care and transport patients to the facility. May be operated by the hospital, local government, or private companies depending on regional models.
### Funders

- **Insurers** — Commercial insurance payers, health funds, or sickness funds depending on your jurisdiction's model.
- **Donors** — Philanthropic supporters, particularly important for non-profit healthcare organizations and capital campaigns.
- **Government** — Public payers and funders. May be the dominant funder (single-payer systems) or one of many (multi-payer systems). Often the largest single payer category for hospitals regardless of system design.
### Regulators

- **Government** — Regulatory bodies at national, regional, and local levels that oversee healthcare operations and ensure compliance. Structure varies significantly by jurisdiction.
### Suppliers

- **Medical** — Vendors providing medical supplies, equipment, pharmaceuticals, and services. Relationships range from commodity purchasing to strategic partnerships with major device and pharmaceutical manufacturers.

---

## Adapting the Model

This Hospital Enterprise Domain Model serves as a reference point for healthcare organisations worldwide. Like any [[One-Page Models|one-page model]], it represents choices about what to include and what to leave for lower-level domain models. Your mission is to adapt it — not adopt it blindly.

- **For Health Systems** — Add domains for system-level functions like regional operations, employed physician groups, and health plan administration if you operate your own insurance products.
- **For Ambulatory Networks** — Reduce emphasis on inpatient domains; expand specialty clinic domains; consider adding domains for ambulatory surgery centres.
- **For Academic Medical Centres** — Elevate Research to greater prominence; add domains for medical education, graduate medical education, and faculty practice.
- **For Post-Acute Care** — Expand Continuing Care into multiple domains (rehabilitation, long-term acute care); add domains for transitions of care.
- **For Payers/Insurers** — Restructure entirely around member services, claims processing, care management, and network development.
- **For Different Jurisdictions** — Adjust stakeholder categories to reflect your funding model (single-payer, multi-payer, hybrid); modify regulatory compliance based on your oversight bodies; adapt terminology to local conventions.

The goal isn't theoretical perfection — it's practical utility. Take this model on a tour of your organization, gather feedback, and adjust based on what you learn. After all, a model shared and used is worth infinitely more than a perfect model that never leaves your laptop. Or as we like to say: embrace "good enough."

---
## What's Next?

Enterprise domain models set the stage. To show how this starting point can move down a level there are examples for the Emergency Department as follows:
- [[Emergency Department Domain Value Stream Network]]
- [[Emergency Walk-in Value Stream - Motivation View]]
- [[Emergency Walk-in Value Stream - Business Capability Model]]
- [[Emergency Department Walk-in Present Value Stage]]

---
_This is an industry-specific implementation of the [[Enterprise Domain Model]] pattern for healthcare organizations globally, with the hospital as the reference point. Adjust domains based on your organization's scope, services, strategic priorities, and jurisdictional requirements._