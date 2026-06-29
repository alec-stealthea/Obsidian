## Situation
At the moment, the Alberta Communicable Disease teams are using or partially using an application called CD/OM for Outbreak reporting. This solution was primarily designed to report data to the Alberta Ministry vs. managing individual Albertan Communicable Disease Episodes or individual Outbreak Cases.
An initiative have been started to look at what Communicable Disease functionality can be migrated to Epic, what functionality will need a separate custom application, and what functionality can be contained within the Alberta Shared Services Analytics Infrastructure
## Background
An initial evaluation has evolved into a high-level application scope as follows.
### Connect Care (Epic Build)
In general, anything to do with individual patients and/or data that needs to be added to the clinical record will be entered in Epic. This is not a green-field environment for adding Communicable Diseases into Epic
#### Current State Build
There's three main areas of build that exists:
- **Primary and Preventive Health Services Lab Reporting** - As part of the current Epic build, there is a Bridges interface that sends lab results that confirm to certain rules directly to the PPSH application
- **Compass Rose Episode Build** - There's four Compass Rose Episodes built out for Communicable Diseases as follows:
	- **Sexually Transmitted Infections (STI)** - There is a build in production, but currently only the HIV team is using the build.  STI is (largely) still using CD/OM for care delivery and Communicable Disease investigations
	- **Tuberculosis (TB)** -  The TB team has a reasonably complete current state build that was based on the legacy workflow.  This workflow has been reviewed for continuous improvement to reduce data duplication for flow sheets for treatment as well as the potential for using the target state design leveraging Epic Abstracts.
	- **Safe and Healthy Environments (SHE)** **and Communicable Disease Control** **(CDC)** - CDC and SHE are leveraging the Compass Rose episode functionality largely for the tracking of Section 29 Individual Isolation and Care Plan orders.
- **Infection Prevention Control (IPC)** - While the CDC and SHE teams manage and track people in the community, the IPC team tracks patients that are in the ED or admitted to and Inpatient setting.  There is a responsibility for the IPC team to send a daily line list report if that facility or department has an outbreak declared.  They have configured the Epic Bugsy application using an IPC Rule Out Infection alert as well as the Infection table to track the status of infections.  They are not using the Bugsy Abstract functionality for reporting individual cases.
- **Population and Public Health Support Team (PPHST)** - The Public Health Support Team leverages the Epic Cheers Call Center Functionality. They are generally the first point of contact for facilities reporting a potential outbreak.  Current process is to document and triage the outbreak and then fax a summary to the appropriate CDC or SHE team to manually enter into CD/OM to continue the investigation.
### ePHIS Public Health Inspection System
There is an electronic Public Health Information System that has been developed to monitor and manage inspections for places like restaurants, day cares, health care facilities. This application is managed and used by the SHE part of the organization.
### RedCap Surveys
RedCap surveys are done for the following activities:
- **Facility Outbreak Line Lists** - 
- **Facility Outbreak Aggregate Reporting** - 
- **Individual Food Surveys** - 
### Genesys Contact Center
Each of the CDC and SHE use the Genesys contact center software to manage phone calls from citizens, incoming faxes from primary care providers and for a few additional scenarios.  This application is not integrated with any other application.
## Proposed Communicable Disease Solution Design

### New Connect Care (Epic) Build
The new Communicable Disease Solution is looking to replace the legacy CD/OM Application with three applications as follows:
- **Outbreak Application** - A new custom outbreak application will be developed to manage the large exposure tracking and reporting associated with outbreaks.
- **Epic Communicable Disease Episode and Abstract** - by configuring Connect Care (Epic) to manage Communicable Disease Episodes and documenting the disease status using Communicable Disease Abstracts and;
- **Communicable Disease Data Lake** - Since the data for managing communicable diseases is spread between two applications, we need to manage the data using the Health Shared Services established tools to develop data assets and products that support overall reporting and supporting data quality workflows that support configuring the source applications in order to reduce errors at the point of data entry.
The Connect Care Communicable Disease Episode Application Context Model is intended for the Connect Care Build teams that will be involved in the development of newor enhancement for existing build.
#### Expanded Healthy Planet Compass Rose Episode Build
For each of the current Compass Rose build, the Episode tasks and targets will be expanded to encompass the entire Communicable Disease Episode.
#### Communicable Disease Abstracts
Think of an Epic Abstract as a supercharged Smart Form. There will be a separate abstract for each of TB, STI, CDC and SHE due to the unique aspects for their workflows. A few of the key elements of the Abstract include: each abstract has a unique ID and a version, each abstract is part of an Epic Registry which if aligned to the episode type makes reporting much easier and, we can leverage Epic Studio to build more complex Epic Extensions if needed to allow for higher data quality. 

Where possible, a generic standard will apply across all Abstracts. The Abstract Functionality will form the basis for three key things:
1. **Notifiable Disease Reporting** - Where items cannot be automatically imported from the patient's chart, the Notifiable Disease Investigator will have to manually populate those records. 
2. **Communicable Disease Case Information** - Where there is case information for managing the episode is needed, but should not be part of the patient's chart, this can be entered in the abstract.
3. **Communicable Disease Abstract Linking** - The third and arguably best feature of the Communicable Disease Abstract is the ability to link abstracts together. As part of the creation of the abstract, the exposed contacts will be documented as part of the phone encounter. For each of the identified exposed contacts a new encounter will be created as well a a new contact abstract.  The contact abstract will document the exposure abstract by adding the unique identifier for the abstract of the person who exposed the contact identified. By linking the exposed contact to the exposure contact we get the following benefits:
	1. **Unique Patient Identification** -  Before and episode and the subsequent Abstract can be entered, there needs to be a unique patient identified.  There will be the ability to using the Epic MRN to create a patient ID pending final positive identification if needed. 
	2. **Reduce Privacy Risk** - By creating the exposed episode and then linking related exposure abstract ID, we are not risking having patient identifiable information on the patient's chart.
	3. **Improved Data Quality** - Finally, by trying to add patients in the exposure case flowsheet where people manually added the Provincial Health Number, there we a number of data quality issues.
##### Sexually Transmitted Infections (STI) Communicable Disease Abstract
The Sexually Transmitted Infection (STI) Abstract will be somewhat different from the usual Notifiable Disease Reporting (NDR) forms in two ways:
1. **STI-specific Ministry Report** - There is an STI-specific report to the Primary and Preventive Health Services team.
2. **STI Treatment Data** - Unlike most other communicable diseases, STI is one where the treatment plan is a part of the overall reporting. This means the STI Abstract needs to be configured to bring in treatment flowsheet data to support the reporting to the ministry Notifiable Disease Asset Managers.
##### Tuberculosis (TB) Communicable Disease Abstract
The Tuberculosis (STB) Abstract will be somewhat different from the usual Notifiable Disease Reporting (NDR) forms in two ways:
1. **TB-specific Ministry and Canadian Report** - There is an TB-specific report to the Primary and Preventive Health Services team that is based on the Public Health Agency of Canada (PHAC). This report is a weekly summary as well as an annual report that needs to be able to link
2. **STI Treatment Data** - Unlike most other communicable diseases, TB is one where the treatment plan is a part of the overall reporting. This means the STI Abstract needs to be configured to bring in treatment flowsheet data to support the reporting to the ministry Notifiable Disease Asset Managers. There is also the need to report the number of exposures for a particular episode. This latter acceptance criteria means that there will need to be a Clarity report developed vs. having all the data on the Abstract for reporting.
#### Communicable Disease Infection Status Rules
Within Epic there is the ability to enter rules that will automatically take action based on different events. This can include the receipt of lab results, .  These automate many of the rules for updating the Infection table. Care will need to be taken to not overlap with the IPC orders, though in general, all orders can be separated by the ordering department. There's three types of Infection Orders
- Lab Component
- Organism and;
- Procedure

#### Communicable Disease Diagnostic Orders
Communicable Disease Diagnostic Orders require some additional configuration to be able to support the Communicable Disease value streams. As part of the Lab Result Definition (LRD) Clarity file, the particular lab result needs to be associated with an Organism (ORG) in Chronicles. With this configuration in place, the Communicable Disease Infection Status rules can be written to automatically update the Infection table. This then allows for alerts on the Communicable Disease Episode and the population of the Communicable Disease Abstract from the Infection Table directly vs. manual update.
#### Epic INF Infection Orders INI
One of the key elements that Bugsy brings to the table is the Infection Table.  This table can be linked to the Episode, the Abstract and the Rule Out Orders. 
#### Additional Flowsheets
- **Food Questionnaire** - need to see if there's existing nutrition questionnaires that can be repurposed. Limitation is that the have to be flowsheets vs. Smartforms to be able to be used with Epic MyChart. 
- **Travel Questionnaire** - Already exists in Epic, need to see what (if any) enhancements need to be made.
#### Connect Care Interfaces
The current plan is to have three interfaces:
1. **Outbound Abstract Summary Interface** - When an investigator wants to send the summary to the Outbreak application, they press a button and the summary report goes to Epic to create the Epic Episode and associated Communicable Disease Abstract.
2. **Inbound Create CD Episode and Draft Abstract** - Ideally, this interface will create the appropriate CDC or SHE Compass Rose Episode and the draft Abstract populated by some of the fields sent though the flowsheet interface. Note that there will be a ULI check that is performed and an error queue that will need to be monitored for possible ULI mis-matches.
3. **Update Abstract with Outbreak ID** - If the Investigator is in the outbreak application and is able to see existing abstracts that are part of an outbreak, we would like to have the ability to send the Outbreak ID for those abstracts and have them automatically updated.
### Outbreak Management Application
#### Outbreak Management
The Outbreak Management will manage:
- Key roles assigned to the case (Lead Investigator, MOH, etc.)
- Interactions with the facility including
	- Daily Reporting
	- Outbreak Correspondence
	- Phone Encounters
	- Facility Isolation Orders (need to confirm Public Health Act Section)
- External Agency Interactions
	- Outbreak Correspondence
	- Phone Encounter
#### Outbreak Facility Daily Reporting
- **Facility Aggregate Reporting** - 	
		-  Number of People reporting symptoms:
			- Staff with Symptoms
			- Guests/Residents/Visitors with symptoms
			- Total Reported Outbreak with symptoms (add prior two items)
		- Number of people lab confirmed
		- Number of people hospitalized
		- Number of people deceased.
- **Facility Line List Reporting** - Facility Line List reporting needs to be completed depending on the type of organism. This is essentially the same details as for summary reporting, but with each individual having their own entry including the core Patient Identification 'Platinum' fields as defined by the Alberta Enterprise Master Patient Index (EMPI) or Patient Registry:
	- **Personal Health Number** - Only allowed for admitted patients to an eligible health care organization. In any situation, there will be a call to the Client Registry (EMPI) for validation.
	- **First Name** - 
	- **Last Name** - 
	- **Address** -
		- Street
		- Municipality
		- Postal Code
	- **Sex** - 
	- **Phone Number** - 
	- **Sent for Communicable Disease Episode?** - This is a flag as there will be latency between the request and the creation of the episode,  the abstract and the message back to the Outbreak application. 
#### Outbreak Application Enabling Dimensions
There are dimension entities that will ultimately be managed within the Communicable Disease Data Lake House as an authoritative application. That said, initially, there will be some key entities where the Outbreak application with be considered a 'trusted application'. A trusted application is one that will perform a check against the 'authoritative dimension' before allowing a new location to be added.  To complete the terminology for application data is the term application of record is for any application that is an identified source application for a particular definition.

Since outbreaks can become evident well in advance of lab tests, treatments, etc. being available, there needs to be a way to add to the reference entities like:
- Organism
- Location
- Vaccine
- Diagnostic Test
#### Outbreak Management Application Interfaces
The following are the key interfaces
- **Outbound ULI API** - This is a query using the platinum fields that will return a result based on the platinum fields passed.  This includes a the probability of match. This will be a button on the investigator view of the line list to trigger the payload.
- **Outbound Communicable Disease Episode information exchange** - Not all line list cases need to be investigated. There will be another button to send a message to Connect Care to (hopefully) automagically create the Episode and the Abstract
- **Outbound Update Abstract with Outbreak information exchange** - Not sure if this will be an interface or a report.  Biggest factor will be if it needs to be real time.
- I**nbound Notifiable Disease Episode Information Exchange** - In general, any analytics that spans multiple applications will use the Communicable Data Lake House for reporting. There is a latency that needs to be addressed on how quickly the data pipeline can move updates into the data lake.  The usual replication for the Epic Clarity database is every evening.  That said, this interface could also get data from the planned Epic counterpart to this application and then reconciled after the daily replica.
### Communicable Disease Data Lake House

#### Communicable Disease Data Lake
The Communicable Disease Data Lake will pull information from the Communicable Disease Application portfolio where an exact Extract and Load into SnowFlake will occur as fast as the source applications and data pipelines can manage. Each source system data flow will be documented in Atlan as will the final database schema in the Source System Glossary. This will include the following applications:
- **CD/OM** - to be retired
- **Genesys** - Patient and Provider Contact Management
- **Epic Clarity** - Already replicated into the Snowflake Data Lake
- **ePHIS** - Inspection System linked predominantly to Safe and Healthy Environments
- **Provincial Immunization Registry (Imm/ARI)** - 
- **Outbreak Application** - 
- **School Attendance** - 
- others to be added
#### Communicable Disease Source System Closed Loop Analytics
A Communicable Disease Schema will provide the ability for a data asset to be built for each source system.  For each of the key build objects in each of the applications, there will be a Data Product view for that build object (Abstract, Episode, Line List, etc.) as well as a Data Asset View that will be built out using Atlan as well as the ETL tool Coalesce.

The idea for data providence being documented in this way is that when we know the role and build object that is created within a given workflow, we not only understand where the data came from, but also who created and at what point in the workflow.
#### Communicable Disease Reporting Data Lineage
Building on the foundations of the data products and supporting assets, further more sophisticated data products can be built again using Coalesce (data pipeline nodes) and Atlan Data Products with Asset lineage and related output ports.
#### Communicable Disease Data Lake House
Ultimately, there will be an overall data lake house with both facts and dimensions.  For the first version of the Communicable Disease Data Lake House will be focussed on the dimensions for the these key entities within Connect Care, EPHIS and the Outbreak Application. The goal of maintaining these dimensions will be to inform configuration in the original source applications to improve overall data quality in the source system so that it does not have to be remediated after the fact within the data lake house. All of the dimensions will have a unique identifier within that table along with the foreign keys to the tables within the source applications and the necessary attributes that are needed for identifying duplicates and overall quality assurance for the dimension.
- **Dimensions** - the key to success will be in creating and maintaining the key dimensions that will enable cross application integration.
	- **Disease** -  
	- **Location** - The Communicable Disease location dimension will be an aggregate of the EPHIS locations, Outbreak Application Locations, and Epic Locations. Having the EPHIS locations as a starting point to pre-populate the Outbreak application. Over time, other data sources may be added.
	- **Organism** - The organism dimension brings together information from: 
		- The Connect Care (Epic) identified communicable disease organisms that are identified in the LLO - Organism table largely by the Beaker (Laboratory Team)
		- The notifiable disease organisms from the Public Health Act that will be configured within the Outbreak Application.
	- **Vaccine** - For the first version, the authoritative source will be the Imm/ARI vaccine repository.  That said, some historical vaccines can be entered into Connect Care that may need to be reconciled at the dimension level.
- **Facts** - The goal of moving to a fully functioning Continuing Care Data Lake House will be realized in a future stage of the project. These might include:
	- Notifiable Disease Report (NDR)
	- Communicable Disease Abstract
	- Alberta Outbreak Reporting Form
	- Facility Line List
	- Others to be defined