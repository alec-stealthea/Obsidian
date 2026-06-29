![[Communicable Disease Conceptual Data Model.png]] ## **Overview**
The Communicable Disease Conceptual Data Model is a view that will inform the configuration of the application portfolio for communicable diseases across multiple domains.

The conceptual model will also form the basis for the design of the Communicable Disease Data Mart with a focus on the key 'dimensions' that need to be managed across multiple applications. The initial key dimensions include: Locations, Organisms, and Diagnostic Tests (or Procedures). More dimensions may be included. These key terms will be stored in Atlan to be able to associate with Data Assets that are generated within the various applications which may evolve to become 'facts' within the data warehouse.
## **Element details**

### **Communicable Disease Dimension**

_data-object_

A reference classification representing the standardized taxonomy of communicable diseases recognized under Alberta's Public Health Act and related regulations. This dimension serves as the authoritative disease classification used across all communicable disease surveillance and outbreak management systems. It includes attributes such as disease name, ICD codes, notifiable disease status, reporting timelines (e.g., Fastest Means Possible vs. 48-hour), incubation periods, periods of communicability, and transmission modes. The dimension encompasses over 95 diseases defined in Alberta's Public Health Disease Management Guidelines, ranging from respiratory illnesses to enteric diseases, vaccine-preventable diseases, and sexually transmitted infections.
### **Communicable Disease Episode**

_business-object_

A bounded period during which a person experiences infection or illness from a communicable disease, from initial exposure or symptom onset through resolution, recovery, or death. An episode represents the complete clinical and public health journey of an individual case, including diagnosis, treatment, and outcome. Episodes serve as the primary unit of case management and surveillance reporting.
### **Infection Case** — _data-object_

A specific instantiation of a Communicable Disease Episode representing an individual confirmed, probable, or suspect case of communicable disease as defined by case definitions in the Public Health Disease Management Guidelines. An Infection Case includes classification status (confirmed/probable/suspect), onset date, diagnosis date, specimen collection details, hospitalization status, and outcome. Cases are reported via Notifiable Disease Reports (NDR) and form the basis for individual case investigation and contact tracing activities.
### **Infection Abstract** — _data-object_

A summary record of communicable disease episode information derived from clinical encounters, containing key epidemiological and clinical data elements required for public health surveillance and reporting. The abstract captures essential episode metadata without duplicating the full clinical record, enabling efficient data exchange between clinical systems (e.g., Epic) and public health surveillance systems. It includes linkage identifiers such as parent_abstract_id for establishing epidemiological transmission chains.
### **Communicable Disease Location Dimension**

_data-object_

A physical place or geographic area relevant to communicable disease acquisition, transmission, or management. Locations provide spatial context for epidemiological investigation, enabling identification of common exposure sites, determination of where disease was acquired, and targeting of control measures. Location data supports geographic analysis, cluster detection, and jurisdictional reporting requirements.

The Communicable Disease location dimension will be an aggregate of the EPHIS locations, Outbreak Application Locations, and Epic Locations. Having the EPHIS locations as a starting point to pre-populate the Outbreak application. Over time, other data sources may be added.

### **Flight** — _business-object_**Room** — _business-object_

### **Person**

_business-object_

An individual human being relevant to communicable disease surveillance, outbreak management, or healthcare delivery. Persons include patients/residents/clients who may be cases or contacts, healthcare workers who may be exposed or serve as vectors, visitors to healthcare facilities, and members of the general public. Key attributes include demographic information, personal health number (PHN), contact information, residence location, and relationships to healthcare settings. Person records serve as the foundation for case investigation, contact tracing, and immunization tracking.
### **Prescriber** — _business-role_

A healthcare provider authorized to order diagnostic tests, treatments, medications, or vaccinations for communicable disease management. Prescribers include physicians, nurse practitioners, midwives, and other regulated health practitioners as defined under Alberta's Health Professions Act. In the context of communicable disease, prescribers are responsible for ordering appropriate diagnostic tests, initiating treatment, prescribing post-exposure prophylaxis, and fulfilling mandatory reporting obligations to public health authorities.
### **Facility Operator** — _business-role_

### **Outbreak**

_business-object_

A distribution of cases of a communicable disease that is unusual in terms of time, place, or persons affected, as defined under Alberta's Communicable Diseases Regulation. An outbreak represents a coordinated public health response event requiring declaration by a Medical Officer of Health, assignment of an Exposure Investigation (EI) Number, and systematic management through an Outbreak Management Team. Outbreaks have defined thresholds (e.g., two or more epidemiologically linked cases within a specified timeframe), duration criteria, and require reporting via the Alberta Outbreak Reporting Form (AORF). The entity captures outbreak metadata including declaration date, pathogen type, affected facility/unit, outbreak status (open/restricted/closed), case counts, and control measures implemented.
### **Vaccine Inventory**

_business-object_

A managed collection of vaccine products available for administration, including current stock levels, lot numbers, expiration dates, storage requirements, and allocation status. Vaccine inventory management is critical during outbreak response when targeted immunization campaigns may be deployed. The inventory tracks vaccines relevant to communicable disease prevention, including those for measles, influenza, hepatitis, pertussis, and other vaccine-preventable diseases covered under the Alberta Immunization Policy.
### **Preventive Measure**

_business-object_

An intervention implemented to reduce the risk of communicable disease transmission or acquisition. Preventive measures encompass a broad range of activities including immunization, post-exposure prophylaxis (vaccines or antivirals), isolation and quarantine protocols, personal protective equipment use, environmental cleaning and disinfection, visitor restrictions, and public health advisories. During outbreaks, preventive measures may include antiviral chemoprophylaxis for influenza, enhanced cleaning protocols, cohorting of staff and patients, and restriction of admissions and transfers.
### **Notifiable Disease Test**

_grouping_

A laboratory or diagnostic examination performed to detect evidence of a notifiable communicable disease. This abstract grouping encompasses various test modalities used for disease confirmation including molecular tests (PCR, NAAT), antigen tests, antibody serology, and culture-based methods. Test results determine case classification (confirmed/probable/suspect) and trigger mandatory reporting timelines to the Medical Officer of Health and Chief Medical Officer of Health as specified in laboratory reporting requirements.\
#### **Diagnostic Imaging Test** — _business-object_

A radiological or imaging examination used to support diagnosis or assess disease progression in communicable disease cases. Examples include chest X-rays for tuberculosis or pneumonia assessment, CT scans for complications, or other imaging modalities relevant to specific disease presentations. While not typically confirmatory for communicable disease diagnosis, imaging tests provide important clinical context for case management.
#### **Laboratory Test** — _business-object_

A specimen-based examination conducted by a clinical or public health laboratory to detect the presence of communicable disease pathogens or immune response markers. Laboratory tests include molecular detection (PCR, LAMP), antigen detection, antibody serology (IgM, IgG), culture and isolation, and specialized testing such as genotyping or whole genome sequencing. Test results include specimen collection date, result date, test methodology, and quantitative or qualitative findings. Positive results for notifiable diseases trigger mandatory reporting through ProvLab to public health authorities.
### **Object**

_business-object_

A physical item or fomite that may serve as a vehicle for communicable disease transmission through contamination with infectious organisms. Objects include medical equipment, personal items, food products, water sources, and environmental surfaces. Object contamination is relevant for enteric disease investigations, healthcare-associated infections, and food-borne outbreak investigations. The entity supports documentation of potential transmission vehicles and targeted disinfection or recall activities.
### **Vaccination Event**

_business-event_

A documented instance of vaccine administration to an individual, capturing the complete record of immunization delivery. The event includes vaccine product details (name, manufacturer, lot number), dose number in series, administration date, site, route, administering provider, and any adverse events observed. Vaccination events are essential for determining immunization status, vaccine effectiveness analysis, and post-exposure prophylaxis decisions during outbreak management.
### **Communicable Disease Organism Dimension**

_data-object_

The organism dimension brings together information from:

- The Connect Care (Epic) identified communicable disease organisms that are identified in the LLO - Organism table largely by the Beaker (Laboratory Team)
- The notifiable disease organisms from the Public Health Act that will be configured within the Outbreak Application.

A biological agent capable of causing communicable disease in humans, including bacteria, viruses, parasites, fungi, and prions. The organism entity captures taxonomic classification, strain or variant information, antimicrobial resistance profiles, and virulence characteristics. Organism identification through laboratory testing is essential for case confirmation, outbreak characterization, and selection of appropriate treatment and prevention measures. Examples include SARS-CoV-2 variants, influenza subtypes, Salmonella serotypes, and antimicrobial-resistant organisms such as carbapenemase-producing organisms.
### **Diagnostic Test Series**

_business-process_

A longitudinal collection of related diagnostic tests performed over time to monitor disease progression, treatment response, or resolution. A test series groups individual tests that share a clinical purpose, such as serial viral load measurements, repeat cultures to confirm clearance, or convalescent serology to document seroconversion. Series tracking enables assessment of treatment efficacy and determination of when isolation or exclusion criteria have been met.
### **Visit**

_business-event_

A documented interaction between a person and a location during a defined time period, relevant to disease exposure assessment or transmission investigation. Visits capture the presence of individuals at specific locations during timeframes relevant to incubation periods or communicable periods. Visit data supports epidemiological linkage, source investigation, and contact tracing by establishing who was present at potential exposure locations and when.
### **Supply Chain Stage**

_business-event_

A discrete phase in the movement of goods from origin to consumption, relevant to tracking potential contamination points in food-borne or product-related disease investigations. Supply chain stages may include production, processing, distribution, retail, and consumption. While relevant for certain outbreak investigations (particularly enteric diseases), detailed supply chain tracking is typically managed by food safety regulators rather than the communicable disease surveillance system. This element is marked out of scope for the current solution.
### **Organization**

_business-object_

A formally constituted entity with defined boundaries, governance, and purpose relevant to communicable disease surveillance or healthcare delivery. Organizations provide the institutional context for outbreak management, reporting hierarchies, and jurisdictional responsibilities.
### **Health Organization** — _business-object_**Non-Health Organization** — _business-object_

### **Outbreak Investigation**

_business-process_

A systematic process of inquiry conducted to determine the source, extent, and transmission dynamics of an outbreak. The investigation encompasses case finding, contact tracing, epidemiological analysis, laboratory testing coordination, and identification of control measures. It involves documenting the epidemiological curve, identifying common exposures, and establishing epidemiological linkages between cases. Investigation activities are coordinated through the Outbreak Management Team and documented for regulatory compliance and future reference.
### **Contact Attempt**

_business-event_

A documented effort to reach and communicate with an individual identified as a contact of a communicable disease case or outbreak. Contact attempts track the systematic process of notifying exposed individuals, assessing their risk level, providing post-exposure prophylaxis recommendations, and monitoring for symptom development. Each attempt records the date, method (phone, email, in-person), outcome (successful/unsuccessful), and any follow-up actions required. This element supports compliance with contact tracing timelines and documentation requirements.
### **Department**

_business-object_

### **Group**

_business-object_

A defined collection of persons sharing a common characteristic, location, or exposure relevant to communicable disease management. Groups may represent cohorts such as residents of a specific unit during an outbreak, attendees at a common event, passengers on a flight, children in a daycare facility, or healthcare workers assigned to an outbreak area. Group identification supports targeted interventions, contact tracing, and outbreak investigation by establishing epidemiological linkages among potentially exposed individuals.

### **Outbreak Assessment**

_data-object_

### **Diagnostic Test Order**

_data-object_

A clinical request for laboratory or imaging studies to diagnose, confirm, or rule out communicable disease. The order initiates the diagnostic workflow and includes ordering provider, clinical indication, priority level, and specimen requirements. Orders link to resulting Notifiable Disease Tests and are associated with specific Communicable Disease Episodes when results are positive or clinically significant.