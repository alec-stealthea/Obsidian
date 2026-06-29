---
type: Reference
title: "Multidimensional Data Warehouse Design (Research Paper)"
description: "Journal of Data, Information and Management (2022) 4:371–386"
timestamp: 2026-06-26T19:19:06Z
---
# Multidimensional Data Warehouse Design (Research Paper)

Journal of Data, Information and Management (2022) 4:371–386
https://doi.org/10.1007/s42488-022-00082-6
ORIGINAL ARTICLE
A multidimensional data warehouse design to combat the health
pandemics
Gizem Turcan1 · Serhat Peker1
Received: 26 October 2022 / Accepted: 22 November 2022 / Published online: 20 December 2022
© The Author(s), under exclusive licence to Springer Nature Switzerland AG 2022
Abstract
The Covid-19 pandemic has brought about a new lifestyle for across the globe. Throughout this period, the use of holistic
methods has become indispensable to deal with the enormous amount of data in this regard. It appears that the simplest way
to tackle this issue is to spread the digitalization efforts concerning all data-based applications. Given the significance of
pandemic data management, it is essential to have a data warehouse that collects, associates, and communicates these data.
Containing a significant volume of structured data, warehousing can provide the necessary foundation for data mining and
the development of analytical tools. To this end, the present paper proposes a data warehouse for combatting and managing
pandemics, with the possibility to be enhanced for other personal or public health-related initiatives. In this research, the
bottom-up data warehouse building methodology is used to construct a warehouse. A fact constellation schema model is
utilized to accommodate the information ranging from citizen demographics to physician-prescribed drugs and laboratory
tests. Sample queries are executed based on the proposed data warehouse for different purposes, and desired query results
are obtained within proper response times. The proposed data warehouse contributes to countrywide implementation of
pandemic practices and illuminates research on faster, less expensive, and safer management of citywide, nationwide, or
worldwide health emergencies within a robust technical framework by governments.
Keywords Data warehouse · Covid-19 · Data management · Multidimensional data model · Data mining
1 Introduction
not resist the change since it was simply a matter of life and
death for its citizens.
At the beginning of 2020, the world started to tackle the In the digitalizing world, all movements constitute a
Covid-19 pandemic. Yet, due to its many varieties, the rapid goal and lead to result-representing data, which feeds
spread of the disease gained momentum and continues to meaningful information and knowledge. People in the
do so even now. The world has awoken to take precautions 21st Century societies are being digitalized more due to
against viruses by different means. These efforts cover a ever-increasing data amounts (Pappas et al. 2018). In fact,
wide range of rules and practices, such as the obligation the change is so rapid that the amount of data produced
to wear masks and keep physical distances in public, not to from the beginning of humanity until 2003 can now be
mention the changes in international travel norms and prac- generated in a matter of minutes (Ienca and Vayena 2020;
tices. Moreover, there are several changes in the work and Pappas et al. 2018) and, for the first time in human his-
educational settings, as well as an increase in the workload tory, the volume of digital data has surpassed that of the
intensity of hospitals and pharmacies and in the tendency analog data (Johnson et al. 2017). Considering this hard-
toward online activities (shopping, education, work, con- to-manage amount of data, organizing societies and the
sultancy, etc.) (Ros et al. 2021). In this way, the world could interactions among people has become inevitable (Pap-
pas et al. 2018). Concerning public health, the manage-
ment of pandemics requires such a systematic approach as
well. As to the Covid-19 pandemic, holistic approaches are
* Gizem Turcan required, and the easiest way to do so appears to be more
gizem.turcan@bakircay.edu.tr digitalization of data-based applications. In this respect,
governmental initiatives are a facilitator and mover for
1 Izmir Bakircay University, Izmir, Turkey
Vol.:(0112 33456789)

372 Journal of Data, Information and Management (2022) 4:371–386
citizens to control the virus and to reduce the damage to Given the importance of the pandemic data management,
the country’s economy (Alamo et al. 2020). a warehouse that gathers, associates, and shares the data is
Considering all the sudden changes the public has to get vital for useful mining and developing analytical tools. In
used to, it can be seen that the amount of data has rapidly this manner, the present research is an attempt to develop
increased indirectly proportional to the pandemic. Coun- a pandemic data warehouse for use in time of pandemics.
tries such as the Unites States, Australia, Korea, Singa- The fact constellation schema model, consisting of seven
pore, and Germany use digital technologies to manage the fact tables and several dimension tables, is used in order
pandemic efficiently (Whitelaw et al. 2020). The pandemic to obtain meaningful information regarding medical fea-
management process (Whitelaw et al. 2020) considers ture associations through data querying and analysis. This
technology for tracking, screening for infection, contact schema provides a versatile format for accessing data from
tracing, self-isolation, and clinical care. Apart from this, the warehouse using intricate queries. It can also serve as
health data management enables people to maintain and a reference and guide for countries to manage pandemics,
share their data (Dimitrov 2019). Pandemics have shown leading the way toward further research on faster, less costly,
that we need efficient data management, as the personal and safer management of health emergencies by govern-
data of individuals or patients are constituted differently ments within a technological framework and for use in a
(Blomberg and Lauer 2020) in terms of the contracted variety of ranges. The remainder of this paper is organized as
diseases, demographic information, personal habits, health follows. Section II focuses on the literature review within the
status, and tests. In short, this kind of data consists of a scope of the study. Section III addresses the proposed data
variety of sub-branches, implying that the number of dif- warehouse design with details of the methodology and sam-
ferent types of data is enormous and calls for storage in a ple queries. Finally, Section IV presents concluding remarks
classified way. Therefore, data management is an impera- and future work directions.
tive considering the amount and variety of data.
Naturally, the total amount of data related to the pan-
2 Background
demic – otherwise referred to as “Big Data” in this con-
text—and their type have become unmanageable. The digi-
2.1 Data warehousing
tal world already knows how to handle Big Data in various
contexts, but the need for new storage spaces, concepts,
applications, and information systems has now emerged A data warehouse aims to collect data directly related to
as a consequence of the Covid-19 pandemic. The data a given subject and helps to act upon decision-making.
that cannot be managed is devoid of meaning and sense The nature of the subject or issue has immense importance
for health institutions and organizations. Obtained data in designing the data warehouse as it determines its vari-
need to be stored, organized, processed, transferred, and ous features (Rob and Srubar 2016). Data clearance, easy
analyzed (Sheng et al. 2021; Tavakoli et al. 2006). These access to correct data, and system flexibility support bet-
stages should be planned systematically to avoid any com- ter decision-making through analysis. There are two com-
plexity and, thus, inaccurate analyses. Against this trend, mon data warehouse design methodologies in the literature
data warehouses help manage the data systematically for (Breslin 2004). One of them is Inmon (Inmon 2005)’s top-
acquisition, processing, and dissemination (Gharaibeh down approach, following a path that allows designers to
et al. 2017). In other words, a data warehouse is a system build individual departmental databases sourced by enter-
intended to provide long-term storage and easy access to prise data stores (Breslin 2004). Contrary to the top-down
improve operational value (Mattingly 2020). Building a approach, Kimball et al. (2008) follows the bottom-up
pandemic data warehouse as a part of its management approach, which finds constructing a database for each criti-
gives us the ability to aggregate and view the available cal business process beneficial instead of having a single
daily pandemic data. Considering back-to-front data visu- enterprise database (Breslin 2004). The bottom-up approach
alization, such as presenting statistical charts and graphics consists of four phases, namely, select the business process;
and accurate analysis, a qualified data warehouse estab- declare the grain; choose the dimensions; and identify the
lishes a solid infrastructure for such efforts (Agapito et al. facts.
2020; Sheng et al. 2021). For pandemic data management, As an advantage of the Kimball technique (bottom-up),
which is critical for countries, a well-designed data ware- the data warehouse is transformed into a number of logi-
house makes room for better analyses and improved per- cally self-contained and consistent data marts instead of a
formance in terms of pandemic management. Moreover, a large and frequently complex centralized model (Lawyer
good data warehouse makes the data integrity phase very and Chowdhury 2004). As the data marts are constructed
important for dynamic pandemic data circulation (Agapito initially, reports may be generated rapidly. Analysts can
et al. 2020). accommodate a more significant number of data marts here,
1 3

Journal of Data, Information and Management (2022) 4:371–386 373
hence expanding the data warehouse. In addition, the cost branched form of star schemas, and the logic behind them
and effort required to build this model are minimal (Sen and is the same as that of the star schema. When a star schema
Sinha 2005). Additionally, ensuring the dimensional per- dimension has sub-dimensions, the model becomes more
spective of data marts is conformable is a significant task, normalized by the hierarchical design of entities (Moody
because lack of it may be a disadvantage (Breslin 2004). An and Kortink 2000; Ramachandran et al. 2012). It also
excessive amount of input might slow progress and cause allows users to execute more queries (Ramachandran
disorganization. et al. 2012). The fact constellation schemas, also known
Since data marts are built from the data warehouse, the as another type of galaxy schemas, have more than one
top-down method provides a uniform dimensional represen- fact table (Warnars and Randriatoamanana 2017). Distinct
tation of data marts. Additionally, this model is regarded as from the star and snowflake schemas, the fact constella-
the most effective paradigm for company change (Milanovic tion/galaxy schemas are implemented for more complex
et al. 2009). Large organizations choose this technique as and functional data warehouses (Garani and Adam 2020;
a result. Once committed, the data in the data warehouse Warnars and Randriatoamanana 2017) as they are a com-
is static, read-only, and stored for future reporting. A data bination of two or more star schemas (Saxena and Agarwal
warehouse with a top-down architecture may store data 2014); henceforth, more flexible and agile.
from the majority or even all an organization's operating
2.2 Related works
systems, making these data consistent. Since all data marts
are imported from a single source, the top-down design pro-
cess also produces remarkably consistent dimensional rep- Collecting, processing, and sharing health data in a pan-
resentations of data across data marts. Thus, it is relatively demic environment is challenging. Data are vast and
easy to generate new dimensional data models from the data dynamic, in a word, complex. Several studies have explained
contained in the data warehouse (Breslin 2004; Milanovic the importance and benefits of building data warehouses for
et al. 2009). Nevertheless, the primary disadvantage of the such purposes, and they have mentioned certain applica-
top-down approach is that it results in a huge project with tions as well. Complex medical data are time-consuming,
an extensive scope. Implementing a data warehouse utiliz- inclined to error-making, and defective. Quick and correct
ing the top-down paradigm incurs high up-front costs, and access to properly stored data, on the other hand, provides
it might take a considerable amount of time before end users for improved data quality and cost reduction (Roelofs et al.
see early advantages (Milanovic et al. 2009). During imple- 2013). In a pandemic environment, data are required from
mentation, the top-down technique can often be rigid and different resources. Roelofs et al. (Roelofs et al. 2013) state
insensitive to changing departmental demands. The cost, that combining the tools and different data sources in a data
time required for design, and maintenance are all expensive warehouse also improves the data quality and makes the col-
(Milanovic et al. 2009). lection times effective.
A systematic data warehouse consists of fact and dimen- Garani and Adam (Garani and Adam 2020) develop a
sion tables. Fact tables refer to critical processes and hold the data warehouse to improve the efficiency of nursing activi-
data to be analyzed (Alviana and Kurniawan 2018; Parmanto ties. The main metrics of the design are data of different
et al. 2005). These are central tables and store quantitative sizes collected from multiple sources. In that attempt, the
data. Fact tables, on the other hand, work with dimension data defined as raw are converted into valuable information
tables which use the same data structure with a basic entity- that can be utilized for decision-making purposes in many
relationship (ER) but have a higher performance (Parmanto applications, not to mention its benefits and importance for
et al. 2005). The facts are measures, and the dimensions are resource management.
the context for dimensional modeling (Ramachandran et al. With the Covid-19 on the rise, the intensive care units
2012). Dimension tables contain descriptions and explain worldwide also faced an unexpected burden. With the
the fact tables. Hence, the primary keys of dimension tables increasing amount of patient information, the need for
are the foreign keys of the central fact tables (Ramachandran research to keep abreast of all the latest developments of
et al. 2012). Covid-19, describe the potential treatment strategies, and
The combination of the fact tables and dimension tables plot a route for resource utilization all came to the fore and
generates schemas. The star schema, the snowflake schema, became evident more than ever (Fleuren et al. 2021). It is
and the galaxy or fact constellation schema are created by obvious that developing an effective data warehouse should
dimensional data warehouses (Moody and Kortink 2000; include data from as many sources as possible, but it is chal-
Rob and Srubar 2016). The star schema consists of one lenging. Time has to be spent standardizing the datasets that
central fact table and several dimension tables. The shape make up such a warehouse. In a poorly designed relational
of the star schema—as the name implies—looks like a database with tens of thousands of records and multiple lab
star and is simple to use. The snowflake schemas are the measurements per record, data queries can take days instead
1 3

374 Journal of Data, Information and Management (2022) 4:371–386
of seconds, contrary to expectations. For this reason, build- disease detection, and quarantine. After that, the dimensions
ing an open data warehouse for Covid-19 is crucial, and it is and their associated roles are determined. In the third step,
worth the effort to be ready for future pandemics (Whitelaw the facts are discussed (contact locations of patients, vacci-
et al. 2020). It has to be remembered, though, that multi- nation, disease tests, quarantining process, symptoms, and
center data about patients are more significant than single- medication), and fact tables are composed.
center data for the pandemic process (Fleuren et al. 2021).
In Fleuren et al. (Fleuren et al. 2021)'s study, a data-shar- Step 1: Identify the key issues
ing collaboration with the Dutch Data Warehouse (DDW), a Step 2: Determine the dimensions and their associated
multicenter database, is conducted in the Netherlands. In this roles
study, more than 200 million data concerning 3463 patients' Step 3: Compose the facts and fact tables
demographics, clinical observations, medications, laboratory
findings, and life support devices are added to the DDW. The The pandemic data warehouse schema resulting from
built data warehouse is open to clinicians and researchers completing the steps is a multi-dimensional fact constel-
within certain ethical and legal limits. This study encour- lation schema. In total, there are seven fact tables for the
ages researchers to share the electronic health record (EHR) proposed pandemic data warehouse. The fact tables have
data to advance the field of medical data science (Fleuren several dimension tables which, in turn, have sub-dimen-
et al. 2021). sions as well. This multi-dimensional system represents a
Managing the pandemic data also implies managing fact constellation schema that can overcome the complexity
the pandemic itself since they include medical, biological, of the system. Figure 1 is the fact constellation schema of
demographical, and social information (Agapito et al. 2020). the pandemic data warehouse.
Building data warehouses is one of the most well-known The Fact Constellation Schema is one in which the key
technologies used to process and analyze structured data processes represented by fact tables are associated, and
(Salem et al. 2020). Agapito et al. (2020) conduct a study which also shows the sub-dimensions of the main dimen-
with data from Italy's Lombardia and Puglia regions. They sion tables. This schema allows more data to be stored
develop a Covid-19 data warehouse called “Covid-Ware- about the pandemic or disease in question and, thus, more
house” which allows for data collection, harmonization, and detailed queries. The validity and reliability of the analyses
integration issues of Covid-19. It models, integrates, and concerning a pandemic or disease are considerably crucial
stores the Covid-19 data provided by the Italian Protezione for governments. Briefly put, the more multidimensional and
Civile Department and several pollutions and climate data flexible the data warehouse, the greater the utility of analyt-
provided for different regions in Italy. The decision-making ics. Furthermore, several different query examples are given,
authorities in charge of public affairs can also utilize this depending on the date, city, person, etc., to prove the useful-
data warehouse to take action in order to reduce pollution ness of the fact constellation schema and that it is a valuable
and climate conditions for public health (Agapito et al. warehouse design to be used during pandemics.
2020).
3.1 Fact tables
3 Proposed data warehouse design
The fact tables refer to the key processes followed up dur-
ing pandemics in a country. Accordingly, the proposed data
The pandemic environment requires data to be followed up warehouse design consists of seven fact tables as Fact_Citi-
systematically. Reaching the statistics of real-time, daily, zenDiseaseTests, Fact_CitizenQuarantine, Fact_CitizenVac-
monthly, and annual data by the government is the key to cines, Fact_CitizenVenues, Fact_Patient, Fact_PatientDrug
managing the pandemic process. The amount of country- and Fact_PatientSignSymptom. The fact table entities are
based pandemic data is vast to analyze. At this point, a data the integer identifications of the dimension tables. The fact
warehouse can be utilized to make them meaningful. tables are fed from the dimension tables’ primary keys, and
Kimball et al. (Kimball et al. 2008)’s data warehouse the primary keys of the dimension tables are the foreign
development methodology is taken into account to develop a keys of fact tables. In this way, the Fact_CitizenDiseaseTests
warehouse in this study. Considering the complexities asso- table references to the Dim_Citizen, Dim_DiseaseTest,
ciated with the Covid-19 pandemic, the bottom-up approach Dim_Time, and Dim_HealthUnit tables (Fig. 2). The Fact_
and its steps are preferable. Three of the steps of the bot- CitizenQuarantine table’s entities come from Dim_Citizen,
tom-up approach are employed for pandemic data. Initially, Dim_Time and Dim_Quarantine tables (Fig. 3). The Fact_
designing the data warehouse begins with identifying the CitizenVaccines table consists of the foreign keys of the
critical issues of the pandemic, such as contact with healthy Dim_Citizen, Dim_Time, Dim_Vaccine and Dim_HealthU-
individuals by patients, testing and vaccination processes, nit tables (Fig. 4). The Fact_CitizenVenues table references
1 3

Journal of Data, Information and Management (2022) 4:371–386 375
Fig. 1 The fact constellation schema of the pandemic data warehouse
to the Dim_Citizen, Dim_Time and Dim_Venue tables unit. When examining the keys of this table, “citizenId”
(Fig. 5). The Fact_Patient table’s entities come from the represents the individual’s personal information. “disea-
Dim_Citizen, Dim_Time, Dim_PatientStatus and Dim_Dis- seTestId” identifies the type/name of the test that citizens
easeVariant tables (Fig. 6). The Fact_PatientDrug table con- took to have the information about their health status during
sists of the Dim_Citizen, Dim_Time and Dim_Drug tables the pandemic. To have the date information about disease
(Fig. 7). Lastly, the Fact_PatientSignSymptom table’s enti- tests, the attribute “dateId” is used; whereas “healthUnitId”
ties come from the Dim_Citizen, Dim_Time and Dim_Sign- indicates the unit where the citizen had the service carried
Sypmtom tables (Fig. 8). The Fact Constellation Schema of out. The Fact_CitizenDiseaseTests table allows a country or
the Pandemic Data Warehouse is represented in Fig. 8. city-based statistical analysis of the total number of tests for
a certain period of time.
3.1.1 Disease test fact table
3.1.2 Quarantine fact table
The central focus of the Fact_CitizenDiseaseTests table is
identifying the individuals’ testing for disease; it depicts The Fact_CitizenQuarantine table focuses on the quarantine
which patient has which test, when, and in which health period required for citizens or patients; it indicates who is in
1 3

376 Journal of Data, Information and Management (2022) 4:371–386
Fig. 2 The Fact_CitizenDisea-
seTests table and dimensions
Fig. 3 The Fact_CitizenQuaran-
tine table and dimensions
which quarantine and when, and is powered by citizen data, or who have completed their quarantine according to dates
time data, and quarantine data. The quarantine types differ and durations.
according to the number of isolation days and the type of
disease. To clarify, “citizenId” represents the individual’s 3.1.3 Vaccination fact table
personal information. “quarantineId” identifies the quaran-
tine type/name and its duration according to the disease type. The Fact_CitizenVaccines table represents the vaccination pro-
“startDateId” and “endDateId” refer to the start and end cess against a disease or pandemic; it explains which individual
dates of quarantine. Thus, the Fact_CitizenQuarantine table has how many doses of which vaccine, in which health unit,
allows for the analyses of individuals who are in quarantine and when. As one of the foreign keys of the table, “citizenId”
1 3

Journal of Data, Information and Management (2022) 4:371–386 377
Fig. 4 The Fact_CitizenVac-
cines table and dimensions
Fig. 5 The Fact_CitizenVenues
table and dimensions
represents the individual’s personal information. “vaccineId” cases and/or with a high potential to have the disease. As in
refers to the type of vaccine, and “healthUnitId” represents the other tables, “citizenId” represents the individual’s personal
unit where citizens are vaccinated in. Vaccination date and time information. “venueId” indicates the last location of the indi-
data are related to “dateId”. The Fact_CitizenVaccines table pro- vidual, and “dateId” shows the latest date they were there.
vides statistics on vaccination rates according to date by country The Fact_CitizenVenues table is utilized for contact trac-
and city. In this way, it is also possible to identify the vaccinated ing and allows the user to analyze the contact individual’s
and unvaccinated individuals upon further easy analysis. identification.
3.1.4 Venue fact table 3.1.5 Patient fact table
The Fact_CitizenVenues table contains the location informa- The Fact_Patient table permits one to track the citizens
tion of people in the same environment as disease-positive infected by the disease; it shows the disease detection
1 3

378 Journal of Data, Information and Management (2022) 4:371–386
Fig. 6 The Fact_Patient table
and dimensions
Fig. 7 The Fact_PatientDrug
table and dimensions
dates of individuals by “dateId”. “patientId” is equivalent possible to quantify the current status of patients (new
to citizenId, which represents the personal information case, critical, recovered, death) based on time.
about the citizens in point. To learn about the variant of
the disease, the key “diseaseVariantId” can be utilized. 3.1.6 Medication fact table
The course of disease information is provided by “patient-
StatusId”. The Fact_Patient table allows users to analyze The Fact_PatientDrug table makes it possible to store the
the spread of various variants of the disease. It is also records of drugs used by disease-positive cases; it represents
1 3

Journal of Data, Information and Management (2022) 4:371–386 379
Fig. 8 The Fact_PatientSign-
Symptom table and dimensions
which drug(s) (drugId) a patient is using and for how long. table stores the name, surname, gender, date of birth, weight,
“patientId” equals to citizenId, which represents the per- height, phone number, address, and district information of
sonal information about citizens as in the Fact_Patient table. each individual. “districtId” is the foreign key of this table
“drugId” is the primary key of the table, which stores the for situations that require analyzing the cases on the basis
data about drug’s name, and the type of disease that the drug of the city districts. The other dimensions and fact tables
affects. Fact_PatientDrug table can be taken as a reference in can reach all these personal data by means of “citizenId” as
the analysis of the frequency of drug use depending on time a foreign key.
and drug types by disease. The Dim_Citizen table branches out to Dim_CitizenLiv-
ingHabits, Dim_CitizenComorbidities, Dim_Contact, and
3.1.7 Sign/symptom fact table Dim_CitizenDrug. The Dim_CitizenLivingHabits table
represents the individuals’ specific unhealthy habits such
The Fact_PatientSignSymptom table indicates the signs or as smoking, malnutrition, and excessive drinking; it has
symptoms associated with a disease with reference to each two foreign keys, citizenId and livingHabitId, which come
individual and within specified time ranges. “patientId” from the Dim_LivingHabits table that stores the name of
refers to citizenId, which represents the personal informa- those habits and its primary key. The Dim_CitizenComor-
tion about citizens. “startDateId” and “endDateId” point out bidities tables are utilized to store information regarding
the date the symptom began and ended, respectively. Addi- citizen comorbidities. This table also has a foreign key as
tionally, to reach the name of the sign or symptom, the key comorbidityId, which comes from Dim_Comorbidities,
“signSymptomId” is utilized, allowing for the analysis of the excluding citizenId. The names of the comorbidities are
frequency and duration of sign/symptoms according to the stored in the Dim_Comobidities table. Another branch of
course of the disease. the Dim_Citizen table is Dim_Contact, which represents
the sick people having been in contact with healthy people,
3.2 Dimension tables
or vice versa. The table includes citizenId as a foreign key,
contactId, which is also a foreign key and refers to citize-
The dimension tables, which include all the specific records nId and the level of direct contact of people. The last table
about the disease, are the main sources of information with linked to Dim_Citizen is Dim_CitizenDrug table. This table
reference to the critical processes carried out during the pan- has citizenId and drugId, which comes from the Dim_Drug
demic (fact tables). These tables contain primary keys that table and means the medication and its dosage related to the
connect with fact tables; they are also more detailed than the pandemic, or not related to the pandemic but used by the
fact tables. The dimension tables in this study are as follows: person routinely.
3.2.1 Citizen
3.2.2 Health unit
The Dim_Citizen dimension table stores the personal data
about all citizens who are sick or not during the pandemic The Dim_HealthUnit dimension table depicts the place
process. “citizenId” is the primary key/identifier of this where vaccination and testing services are taken. Hence,
table. Therefore, the Dim_Citizen table is related to many its attributes are the health unit name, the unit’s address,
pandemic processes that have to include citizen data. The the district it belongs to, and “healthunitId” as the
1 3

380 Journal of Data, Information and Management (2022) 4:371–386
primary key. Accordingly, it has three branches and is contains the variant names and disease data by diseaseId,
linked to FactCitizenVaccine, Fact_CitizenDiseaseTest, which comes from the Dim_Disease table. diseaseId is the
and Dim_District tables. primary key of the Dim_Disease dimension table, enabling
it to connect with the Dim_DiseaseVariant dimension table.
3.2.3 District With the relationship between these two-dimensional tables,
numerical analyses such as the number of variants of dis-
The Dim_District table provides data for the Dim_HealthU- eases and the distribution of the variants among the citizens
nit and Dim_Citizen tables by its primary key, “districtId”. can be made.
Distinctly, it is fed from the Dim_City table by the foreign
key, cityId, which is the primary key of the Dim_City table.
3.2.8 Patient status
It is essential to determine the city to which the district is
affiliated due to the importance of the Dim_District table for
The patient status shows the stage of the disease in a person.
gathering the statistics on a district, city, or country basis.
For example, he or she may have never contracted the dis-
3.2.4 Vaccine ease, may have just contracted a new variant, or may have
passed away. Since it is a parameter directly related to the
patient, it is linked to the Fact_Patient table with the primary
The Dim_Vaccine table stores the data about vaccination
key, patientStatusId. The Dim_PatientStatus table allows
and feeds the Fact_CitizenVaccine table. It has the name
users to determine how many people are in which condition.
of each vaccine and the primary key, “vaccineId”, per vac-
cine. The Dim_Vaccine table allows users to obtain statis-
tics about the number, type, and date of vaccinations, health
3.2.9 Signs/symptoms
units where they take place, and vaccinated citizens as per
the Fact_CitizenVaccine table. The Dim_Vaccine table also
The Dim_SignSymptom dimension table stores the signs or
helps analyze the distribution of these activities in terms of
symptoms of the disease. Obviously, symptoms vary greatly;
location.
yet those that emerge from the beginning of the outbreak
or contracting should be followed up rigorously until they
3.2.5 Disease test
disappear. For this reason, the start and end dates of the
symptoms can be followed with the Dim_SignSymptom
The data about the disease tests are stored in the Dim_Dis-
table, which is connected to the Fact_PatientSignSymptom
ease dimension table, which covers all types of pandemic
table by signSymptomId.
tests. Therefore, the data provided to the Fact_CitizenDis-
easeTests table can be analyzed from the aspects of disease
tests that citizens have had in different health units where the 3.2.10 Drug
tests take place, and the test dates.
The Dim_Drug table stores the information related to all
3.2.6 Venue
kinds of medication, even if it is irrelevant to the disease.
For example, there might be items that people take routinely
The venue information appears in the Dim_Venue table and not for the disease in question. Doctors should have
with the primary key “venueId”. There are location names enough information about such medication while prescribing
and types in this table. Determining contact with the peo- new ones for any new disease. Thus, the Dim_Drug dimen-
ple at risk of being disease-positive is crucial in prevent- sion table is related to both the Dim_CitizenDrug dimension
ing the spread of the disease and taking precautions. The table and the Fact_PatientDrug fact table. It provides data for
Dim_Venue table provides data to the Fact_CitizenVenues them by drugId. The Dim_Drug table is utilized when keep-
table, accommodating for numerical analyses such as the ing statistics of the medication used against a given disease.
number of sick people in a particular region and the number
of people at high risk of contracting the disease; thus, play-
3.2.11 Quarantine
ing a vital role in determining the risk-prone zones.
3.2.7 Disease variant Actual patients and those in contact with the infected ones
have to be in quarantine if they have the disease or are at
The Dim_DiseaseVariant table depicts the variants of a risk. The types of quarantine can differ according to the dis-
pandemic disease which may be countless and whose treat- ease or its variants. Thus, the Dim_Quarantine dimension
ments can differ according to the variant types. The table table stores the number of days according to the type of
1 3

Journal of Data, Information and Management (2022) 4:371–386 381
quarantine. In addition, it provides data to the Fact_Citizen- combinations of tables. For example, new patients can be
Quarantine table. Analyses such as the number of citizens added to the health system; disease processes can be fol-
in quarantine and its degree of effectiveness in reducing the lowed, case analyses can be made on a city basis, numeri-
number of cases can be made with these tables. cal data can be obtained about disease tests and vaccines,
and so on.
3.2.12 Time Seven different queries are conducted for the proposed
pandemic data warehouse. Each query has a different pur-
The Dim_Time dimension table serves many tables, as the pose, and users can create queries based on the results they
pandemic period is a time-spanned process where each wish to obtain. Queries, which are also very useful in deci-
parameter is time-dependent. The timetable provides data sion-making processes, present concrete, and meaningful
directly to 10 different tables and takes data from 4 sepa- data to the end-user.
rate tables. These are Dim_DayOfWeek, Dim_Week, Dim_
Month, and Dim_Year. The Dim_Time table provides data 3.3.1 Query‑1
to tables that need start–end dates.
Question: What is the number of new cases in a certain city
3.3 Queries
and on a specific date?
Purpose: The purpose of this query is to extract the num-
In the proposed multidimensional data warehouse, each ber of new cases in a city on a given date from the data
datum to be reported is stored in different tables, and the warehouse. The query is carried out to obtain data related to
number of tables is relatively high. Therefore, queries are the case numbers of statistics and to decide on new measures
made to gather the related data in different tables. Such to be taken. Knowing the number of new cases on a given
queries are multifunctional and can answer basic ques- date contributes to the management of the pandemic pro-
tions, perform calculations, combine data from different cess by comparing the number of cases on previous dates.
tables, and add, modify, or delete data. In the pandemic It also helps predict risks by cities. In this case, the date is
data warehouse, many queries can be made as a result of 13.10.2021, and the city is Izmir.
Query:
Select count(patientId) As 'NEW' from Fact_Patient
INNER JOIN Dim_DiseaseVariant ON
Fact_Patient.diseaseVariantId =Dim_DiseaseVariant.diseaseVariantId
INNER JOIN Dim_Time ON
Fact_Patient.dateId =Dim_Time.dateId
INNER JOIN Dim_PatientStatus ON
Fact_Patient.patientStatusId = Dim_PatientStatus.patientStatusId
INNER JOIN Dim_Citizen ON
Fact_Patient.patientId=Dim_Citizen.citizenId
INNER JOIN Dim_District ON
Dim_Citizen.districtId=Dim_District.districtId
INNER JOIN Dim_City ON
Dim_District.cityId=Dim_City.cityId
WHERE patientStatusName='New Case' AND cityName='İzmir' AND date='2021-10-13'
1 3

382 Journal of Data, Information and Management (2022) 4:371–386
3.3.2 Query‑2
query to understand which type of vaccine is preferred by
patients. At the same time, the data on the number of vac-
Question: What is the number of different vaccinations cinations made in a day can also be used for vaccine inven-
administered in a certain city and on a specific date? tory analysis. In this way, the number of doses that the
Purpose: This query indicates the distribution of differ- government should provide can be predicted. Once again,
ent types of vaccines administered in a city. It is a useful the date for the query is 13.10.2021 and the city is Izmir.
Query:
Select COUNT(vaccineName) AS 'Sayi' FROM Fact_CitizenVaccines
INNER JOIN Dim_Citizen ON
Fact_CitizenVaccines.citizenId=Dim_Citizen.citizenId
INNER JOIN Dim_Vaccine ON
Fact_CitizenVaccines.vaccineId=Dim_Vaccine.vaccineId
INNER JOIN Dim_Time ON
Fact_CitizenVaccines.dateId=Dim_Time.dateId
INNER JOIN Dim_HealthUnit ON
Fact_CitizenVaccines.healthUnitId=Dim_HealthUnit.healthUnitId
INNER JOIN Dim_District ON
Dim_HealthUnit.districtId=Dim_District.districtId
INNER JOIN Dim_City ON
Dim_City.cityId=Dim_District.cityId
WHERE cityName='İzmir' AND date='2021-10-13'
GROUP BY (vaccineName)
3.3.3 Query‑3 it is decisive for knowing the number of cases. However,
negative test results are just as important as positive ones
Question: What is the total number of negative results from for pandemic management. With this query, the required
the viral tests conducted in a certain city and on a given data can be easily retrieved. The query asks for the number
date? of negative results of the viral tests. For example, the test
Purpose: Since the use of viral tests is the most com- type is determined as viral, the city is Izmir, and the date is
mon way to determine whether someone has the diseases, 13.10.2021.
Query:
Select count(result) AS 'Negative Count' from Fact_CitizenDiseaseTests
INNER JOIN Dim_HealthUnit ON
Fact_CitizenDiseaseTests.healthUnitId = Dim_HealthUnit.healthUnitId
INNER JOIN Dim_Time ON
Fact_CitizenDiseaseTests.dateId =Dim_Time.dateId
INNER JOIN Dim_DiseaseTest ON
Fact_CitizenDiseaseTests.diseaseTestId = Dim_DiseaseTest.diseaseTestId
INNER JOIN Dim_Citizen ON
Fact_CitizenDiseaseTests.citizenId=Dim_Citizen.citizenId
INNER JOIN Dim_District ON
Dim_Citizen.districtId=Dim_District.districtId
INNER JOIN Dim_City ON
Dim_City.cityId=Dim_District.cityId
WHERE diseaseTest='Viral' and result='False' AND date='2021-10-13'
1 3

Journal of Data, Information and Management (2022) 4:371–386 383
3.3.4 Query‑4 and quarantine type constraints. In this way, the number of
individuals in quarantine is obtained. Location and time-
Question: How many people are in different quarantines in based analyses can be made. For instance, the date for the
a certain city and on a certain date? query is 13.10.2021 and the city is Izmir.
Purpose: This query is run to obtain the quarantine sta-
tistics. The query counts citizens, adhering to city, date,
Query:
Select COUNT(citizenId) AS 'Sayi' FROM Fact_CitizenQuarantine
INNER JOIN Dim_Quarantine ON
Fact_CitizenQuarantine.quarantineId=Dim_Quarantine.quarantineId
INNER JOIN Dim_Time ON
Fact_CitizenQuarantine.startDateId=Dim_Time.dateId
INNER JOIN Dim_Citizen ON
Fact_CitizenQuarantine.citizenId=Dim_Citizen.citizenId
INNER JOIN Dim_District ON
Dim_Citizen.districtId=Dim_District.districtId
INNER JOIN Dim_City ON
Dim_City.cityId=Dim_District.cityId
WHERE startDateId=1 AND cityName='İzmir'
GROUP BY (quarantineName)
3.3.5 Query‑5
or those with high risk of having the disease. The query prints
the names of individuals in a venue based on the location
Question: Who are the individuals in a certain venue on a spe- and date constraints. In this case, the date is determined as
cific date? 13.10.2021, and the venueType is determined as venueType1
Purpose: The purpose of this query is to identify those who for the query.
are in the same environment with disease-positive individuals
Query:
Select name AS 'Name' FROM Dim_Citizen
WHERE citizenId IN
(SELECT citizenId FROM Fact_CitizenVenues
INNER JOIN Dim_Venue ON
Fact_CitizenVenues.venueId =Dim_Venue.venueId
INNER JOIN Dim_Time ON
Fact_CitizenVenues.dateId =Dim_Time.dateId
INNER JOIN Dim_Citizen ON
Fact_CitizenVenues.citizenId=Dim_Citizen.citizenId
INNER JOIN Dim_District ON
Dim_Citizen.districtId=Dim_District.districtId
INNER JOIN Dim_City ON
Dim_District.cityId=Dim_City.cityId
WHERE venueType='venueType1' AND date='2021-10-13')
1 3

384 Journal of Data, Information and Management (2022) 4:371–386
3.3.6 Query‑6 Purpose: This query determines the frequency of using
medication. The data are collected concerning those who
Question: Which individuals have taken a certain medica- take a certain medication to treat the disease in question.
tion within a given date range? It shows who uses what medication, both by name.
Query:
Select name AS 'Name' FROM Dim_Citizen
WHERE patientId IN
(SELECT patientId FROM Fact_PatientDrug
INNER JOIN Dim_Drug ON
Fact_Pa(cid:25)entDrug.drugId =Dim_Drug.drugId
INNER JOIN Dim_Time ON
Fact_PatientSignSymptom.startDateId=Dim_Time.dateId
INNER JOIN Dim_Time ON
Fact_PatientSignSymptom.endDateId=Dim_Time.dateId
INNER JOIN Dim_Citizen ON
Fact_Pa(cid:25)entDrug.patientId=Dim_Citizen.citizenId
WHERE startDateId=1 AND endDateId=3 AND drugId=3
3.3.7 Query‑7 detrimental information about the course of the disease.
Having symptom information that occurs within a given date
range also helps in making sense of the progression a disease
Question: What are the symptoms and their frequency in a
is taking. The query provides the symptom names and the
certain date range?
number of cases showing them.
Purpose: This query specifies the frequency of symp-
toms as one of the parameters that gives some of the most
Query:
Select COUNT(patientId) AS 'Count' FROM Fact_PatientSignSymptom
INNER JOIN Dim_Citizen ON
Fact_PatientSignSymptom.patientId=Dim_Citizen.citizenId
INNER JOIN Dim_SignSymptom ON
Fact_PatientSignSymptom.signSymptomId=Dim_SignSymptom.signSymptomId
INNER JOIN Dim_Time ON
Fact_PatientSignSymptom.startDateId=Dim_Time.dateId
INNER JOIN Dim_Time ON
Fact_PatientSignSymptom.endDateId=Dim_Time.dateId
WHERE startDateId=1 AND endDateId=3
GROUP BY signSymptomId
1 3

Journal of Data, Information and Management (2022) 4:371–386 385
4 Conclusion for advanced analysis. The proposed data warehouse can
even be adjusted for use in the form of a personal mobile
Pandemics are hard-to-manage processes that affect the application or expanded to be applied for other health-
entire world. Since their emergence, there have been related initiatives.
significant rise in the amount of data related to healthy There is no doubt that this research has the potential for
and sick citizens. The main factor that complicates the helping the developers in designing and building a data
management of a pandemic is data volume, which sim- warehouse for health pandemics, however it also brings a
ply means complexity. The proposed data warehouse big concern regarding individual privacy and security. In
design in this study is a major solution to this impedi- addition to standard clinical data such as common clinical
ment. This design, which enables the appropriate use of symptoms and test findings, such a data warehouse also con-
data and accurate analysis, is especially beneficial for tains personal data such as name, address, phone number,
countrywide applications. The data flow is high-speed and medical record number. If these confidential and sensi-
during pandemics and, as such, governments should tive patient data are disclosed to the public or malevolent
make quick decisions to protect the public. An advanced individuals, it might severely affect the patients. Considering
and multi-dimensional data warehouse 0is an urgent the above-mentioned concerns, it is essential to integrate
and fundamental need. This study is carried out to meet certain mechanisms and practices for protecting privacy of
this requirement to manage pandemics and similar other individuals during the implementation of a health data ware-
health-related processes. house. For this purpose, our proposed data warehouse is
The proposed data warehouse contains all the process designed to enforce access control which limit users’ access
data of the Covid-19 pandemic as a case study, from the to confidential and sensitive data. In other words, only users
last location of the contacts to the medication used. The having authorization can access data. In addition to this,
warehouse enables users to make informed decisions. What innovative privacy-aware data analysis procedures together
is more, the implementation of the decision support system with the cryptographic key management system should be
can enhance pandemic research significantly. This data ware- employed to ensure the privacy of individuals in the imple-
house also provides a foundation for carrying out predictive mentation of such a health data warehouse.
analytics on relational, temporal, and/or spatial data (medi-
cal encounter, hospital admission, social media, mobile
Data Availability All relevant data and material are presented in the
apps, etc.) and for utilizing the resulting insights to monitor
main paper.
and analyze a pandemic or disease. With this warehouse,
it is possible to access data related to the number of cases Declarations
throughout the city and the country, test results, medications,
Competing interests The authors declare that they have no known
and quarantine processes. At the same time, the data can be
competing financial interests or personal relationships that could have
stored related to those who are not sick but have chronic
appeared to influence the work reported in this paper.
diseases, routinely take certain medication, or have special
conditions that need attention during the pandemic. In this
way, the proposed system helps in maintain public health
## References
to a great extent. The data warehouse is also suitable for
many other types of queries and users can access accurate
Agapito G, Zucco C, Cannataro M (2020) COVID-warehouse: A data
and complete data by creating queries in many other dimen-
warehouse of Italian COVID-19, pollution, and climate data. Int J
sions regarding the pandemic. Governments can increase Environ Res Public Health 17(15):1–22. https:// doi. org/ 10. 3390/
and improve the necessary measures within the scope of ijerp h1715 5596
Alamo T, Reina DG, Millán P (2020) Data-driven methods to monitor,
a pandemic or choose to start normalization processes
model, forecast and control covid-19 pandemic: Leveraging data
accordingly.
science, epidemiology and control theory, pp 1–65. arXiv preprint
This study provides a detailed example of constructing arXiv:2006.01731
a multi-dimensional data warehouse and the fact constel- Alviana S, Kurniawan B (2018) Design and analysis on data warehouse
of personnel adMinistration system using time series algorithm.
lation schema. The data warehouse, which was created
IOP Conf Ser Mater Sci Eng 407:1. https://d oi.o rg/1 0.1 088/1 757-
for the Covid-19 pandemic as one of the most significant
899X/ 407/1/ 012092
health concerns today across the world, can be enhanced Blomberg N, Lauer KB (2020) Connecting data, tools and people
in subsequent studies. With the discovery of new vac- across Europe: ELIXIR’s response to the COVID-19 pandemic.
Eur J Hum Genet 28(6):719–723. https:// doi. org/ 10. 1038/
cines and the emergence of new variants, the number
s41431- 020- 0637-5
of data added to the warehouse is increasing daily. New
Breslin M (2004) Data warehousing battle of the giants: comparing the
tables can be added, and detailed queries can be made basics of the and inmon models. Bus Intell J 7:6–20
1 3

386 Journal of Data, Information and Management (2022) 4:371–386
Dimitrov DV (2019) Blockchain applications for healthcare data man- Rob MA, Srubar FJ (2016) Information gems from criminal mines: A
agement. Healthc Inform Res 25(1):51–56. https:// doi. org/ 10. data warehouse case study focusing on big-city criminal activity.
4258/ hir. 2019. 25.1. 51 Transform Gov People Process Policy 10(2):297–314. https://d oi.
Fleuren LM et al (2021) The Dutch Data Warehouse, a multicenter org/ 10. 1108/ TG- 03- 2015- 0016
and full-admission electronic health records database for critically Roelofs E, Persoon L, Nijsten S, Wiessler W, Dekker A, Lambin P
ill COVID-19 patients. Crit Care 25(1):1–12. https:// doi. org/ 10. (2013) Benefits of a clinical data warehouse with data mining
1186/ s13054- 021- 03733-z tools to collect data for a radiotherapy trial. Radiother Oncol
Garani G, Adam GK (2020) A semantic trajectory data warehouse 108(1):174–179. https:// doi. org/ 10. 1016/j. radonc. 2012. 09. 019
for improving nursing productivity. Heal Inf Sci Syst 8(1):1–13. Ros F, Kush R, Friedman C, Gil Zorzo E, Rivero Corte P, Rubin JC,
https:// doi. org/ 10. 1007/ s13755- 020- 00117-5 ... Van Houweling D (2021) Addressing the Covid-19 pandemic
Gharaibeh A, Salahuddin MA, Hussini SJ, Khreishah A, Khalil I, and future public health challenges through global collaboration
Guizani M, Al-Fuqaha A (2017) Smart cities: a survey on data and a data-driven systems approach. Learn Heal Syst 5(1):1–12.
management, security, and enabling technologies. IEEE Commun https:// doi. org/ 10. 1002/ lrh2. 10253
Surv Tutorials 19(4):2456–2501. https://d oi.o rg/1 0.1 109/C OMST. Salem SB, Naouali S, Chtourou Z (2020) Scoring a data warehouse
2017. 27368 86 model for homeland security applications
Ienca M, Vayena E (2020) On the responsible use of digital data to Saxena G, Agarwal BB (2014) Data warehouse designing: dimensional
tackle the COVID-19 pandemic. Nat Med 26(4):458. https:// doi. modelling and E-R \nModelling. Int J Eng Invent 3(9):28–34
org/ 10. 1038/ s41591- 020- 0823-6 Sen A, Sinha AP (2005) A comparison of data warehousing meth-
Inmon WH (2005) Building the data warehouse. John Wiley & Sons, odologies. Commun ACM 48(3):79–84. https:// doi. org/ 10. 1145/
New York 10476 71. 10476 73
Johnson J, Denning P, Sousa-Rodrigues D, Delic KA (2017) Big data, Sheng J, Amankwah‐Amoah J, Khan Z, Wang X (2021) COVID-
digitization, and social change: big data (Ubiquity symposium). 19 pandemic in the new Era of big data analytics: methodo-
In: Ubiquity, pp 1–8 logical innovations and future research directions. Br J Manag
Kimball R, Ross M, Thornthwaite W, Mundy J, Becker B (2008) The 32(4):1164–1183. https:// doi. org/ 10. 1111/ 1467- 8551. 12441
data warehouse lifecycle toolkit. John Wiley & Sons, New York Tavakoli AS, Jackson K, Moneyham L, Phillips KD, Murdaugh C,
Lawyer J, Chowdhury S (2004) Best practices in Data Warehousing to Meding G (2006) Data management plans: stages, components,
support business initiatives and needs. Proc Hawaii Int Conf Syst and activities. Appl Appl Math 1(2):141–151
Sci 37:3499–3507. https:// doi. org/ 10. 1109/ hicss. 2004. 12655 15 Warnars HLHS, Randriatoamanana R (2017) Datawarehouser: A data
Mattingly W (2020) Considerations for a COVID-19 research data warehouse artist who have ability to understand data warehouse
warehouse in the time of COVID. J Respir Infect 4(1):1–3. https:// schema pictures. IEEE Reg 10 Annu Int Conf Proceedings/TEN-
doi. org/ 10. 18297/ jri/ vol4/ iss1/ 64 CON 0:2205–2208. https:// doi. org/ 10. 1109/ TENCON. 2016.
Milanovic N, Soskic G, Petkovic A (2009) Data warehouse design for 78484 19
croatian students’ nourishment information system. Proc Int Conf Whitelaw S, Mamas MA, Topol E, Van Spall HG (2020) Applica-
Inf Technol Interfaces ITI:193–198. https:// doi. org/ 10. 1109/ ITI. tions of digital technology in COVID-19 pandemic planning and
2009. 51960 78 response. Lancet Digit Heal 2(8):e435–e440. https:// doi. org/ 10.
Moody D, Kortink MA (2000) From enterprise models to dimensional 1016/ S2589- 7500(20) 30142-4
models: A methodology for data warehouse and data mart design.
Proc Int Work Des Manag Data Warehouses 2000:1–12 Publisher's note Springer Nature remains neutral with regard to
Pappas IO, Mikalef P, Giannakos MN, Krogstie J, Lekakos G (2018) jurisdictional claims in published maps and institutional affiliations.
Big data and business analytics ecosystems: paving the way
towards digital transformation and sustainable societies. Inf Springer Nature or its licensor (e.g. a society or other partner) holds
Syst E-Bus Manag 16(3):479–491. https:// doi. org/ 10. 1007/ exclusive rights to this article under a publishing agreement with the
s10257- 018- 0377-z author(s) or other rightsholder(s); author self-archiving of the accepted
Parmanto B, Scotch M, Ahmad S (2005) A framework for designing a manuscript version of this article is solely governed by the terms of
healthcare outcome data warehouse. Perspect Heal Inf Manag 2:3 such publishing agreement and applicable law.
Ramachandran S, Rajeswari S, Murty SS (2012) Dimensional mod-
eling of Indian materials database. Int J Comput Appl 37(7):1–8.
https:// doi. org/ 10. 5120/ 4617- 4834
1 3
