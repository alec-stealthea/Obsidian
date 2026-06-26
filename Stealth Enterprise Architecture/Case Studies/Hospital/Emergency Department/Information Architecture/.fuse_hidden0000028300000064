---
feature: ED Business Object ERD.png
thumbnail: thumbnails/resized/b954fed1c03c57d461a8765d30257475_b89e22fb.jpg
---
One of the key aspects of an overall business architecture is understanding the different business objects that apply within the particular domain. Like all stealth architecture models, the aim is for a model that fits on one page.  Business bjects have a close correlation to business capabilities and so it's important to reflect on the overall value stream network that was developed for the overall [[Emergency Department Domain Model]].

- - **Who & Why** - The key stakeholders for the business object model can be as follows:
	- **Clinical Operations** - many business objects related to application functionality seen as screening within the various clinical applications or modules of applications used within a hospital organization. More particularly, it also adds any business objects that have not or cannot be represented within a given application. Finally, it provides the business definitions for the terms for the business objects.
	- **Analytics Professionals** - A business object model provides the high-level framework that will form the basis for aggregating the data that is generated from multiple applications. The model forms the basis for understanding the translation that needs to be completed.
	- **System Analysts** - System analysts will be able to use the Business Object Model to be able to determine the high-level structure of the applications either through configuration of a package application or designing the database for a custom application. If the system analysts follow the conceptual business object model and where it is defined the logical data model, then the ability for the analytics and operations users of the data will be made much easier.
- **What** - The Business Object Model is a form of Enterprise Relationship Diagram (ERD) that allows the domain architecture to both draw from the overall enterprise business object catalogue and to contribute to it. What the business object model is not intended to do is get down to the logical or physical data model that may have been instantiated in one or more applications.
- **When** - If the model does not currently exit, then there is a degree of an archaeological architecture needs to be completed.
- **How and Where** - Like all Stealth EA models, we're using the open-source tool Archi which supports the ArchiMate language. The degree that these models and the associated narrative are available to the people who need it within both the central architecture repository and federated using [[Master Architecture Data]].
![[ED Business Object ERD.png]]
## Emergency Department Business Object Definitions

- **Patient Triage Assessment** - A record of the triage assessment over time, but especially upon presentation at the emergency department.  For example in Canada the goal is to have the first triage assessment within 15 minutes from a person presenting at the emergency department and reassessed by a care provider based on the assessed acuity. as indicated in the table below.

| Triage Level  |       1       |     2      |     3      |      4      |      5      |
| ------------- | :-----------: | :--------: | :--------: | :---------: | :---------: |
| Triage Name   | Resuscitation |  Emergent  |   Urgent   | Less Urgent |  Non-urget  |
| Triage Timing |   Immediate   | 15 minutes | 15 minutes | 15 minutes  | 15 minutes  |
| Reassessment  |   Constant    | 15 Minutes | 30 minutes | 60 minutes  | 120 minutes |

- **Registration Record** - captures the patient’s personal and demographic information, such as name, date of birth, contact details, and insurance information, at the point of entry into the emergency room. It also includes
- information such as the reason for visit and the time of arrival. This forms the basis for their hospital record and billing.
	- **Presenting Complaint** - The Presenting Complaint refers to the reason the patient seeks medical care in the ER, based on their symptoms or the problem they are experiencing at the time of admission.
- **Specialty Consults** - Requests made by the ER team for evaluations by specialists, such as cardiologists, neurologists, or surgeons, to assist in diagnosing and managing specific patient conditions.
- **Diagnostic Orders** - Diagnostic Orders refer to requests made by healthcare providers for tests such as blood work, imaging (X-rays, CT scans), or other medical diagnostics to aid in diagnosing the patient’s condition.
- **Diagnostic Results** - The Diagnostic Results are the findings or interpretations from the ordered diagnostic tests. These results help guide clinical decisions about the patient’s treatment plan in the ER.
- **Patient Consent Form** - The Patient Consent Form is a legal document that the patient signs to give permission for medical treatments, diagnostic tests, or procedures to be carried out. It is important for ensuring the patient’s informed consent.
- **Vital Sign Log** - The Vital Sign Log is a record of the patient’s key vital signs, such as heart rate, blood pressure, respiratory rate, and temperature, which are monitored throughout their stay in the ER sometimes by readings by the care provider and others with biometric medical devices.
- **Incident Report**: An Incident Report documents any unusual or adverse event that occurs in the ER, such as patient falls, medication errors, or equipment malfunctions. It is used for internal review and to improve safety protocols.
- **Encounter Record**: The Encounter Record is a comprehensive record of the patient’s visit to the emergency room, documenting the treatments provided, diagnoses made, and interactions with care providers during the visit.
- **Care Provider**: The Care Provider refers to any healthcare professional involved in the patient’s care, such as doctors, nurses, paramedics, and specialists.
- **Patient Care History**: The Patient Care History includes a record of the patient’s previous healthcare interactions and treatments, which may be relevant to their current condition. It includes:
	- **Allergies**: known adverse reactions or events related to medications, food, or substances.
	- **Medication History**: A list of medications is currently taking, has taken in the past or has been prescribed.
	- **Immunizations**: A history of the vaccinations that have been administered over the patient's life.
	- **Recent Treatments** - Any therapies or treatments the patient has undergone recently, such as physical therapy or chemotherapy.
- **Care Plan:** The care plan outlines the medical interventions planned or a documentation of the interventions that were performed during the encounter.
	- **Medication Orders**: prescriptions for medications the patient needs during their emergency department encounter.
	- **Medication Administration Record** - A record of when medications were administered and the care provider that provided them. Where possible, the Medication Administration Record is a closed loop from the order through to administration. When tightly coupled to the Pharmacy Value Stream a further audit trail for the medications is available.
	- **Referrals**: Recommendations for the patient to see specialists or follow up with healthcare services after discharge.
	- **Treatment**: 
- **Facility**: the healthcare building, usually a hospital, where the emergency room is located.
	- **Department**: The specific designation of the care setting usually associated with the specialty like pediatric emergency, urgent care, or emergency department.
		- **Room**: The physical space where the patient might me within the emergency room during the length of their stay.