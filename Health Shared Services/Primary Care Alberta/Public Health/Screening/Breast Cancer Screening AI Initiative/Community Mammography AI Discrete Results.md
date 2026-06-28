---
type: Application Context Model
title: "Community Mammography AI Discrete Results"
description: "The following is the proposed solution context model for getting discrete results for the purpose of being able to enable Epic Health Maintenance Reminders for all Albertans."
timestamp: 2026-06-26T19:19:06Z
---

The following is the proposed solution context model for getting discrete results for the purpose of being able to enable Epic Health Maintenance Reminders for all Albertans. 

![Community Mammography Application Context Model 
G) Epic - rovincial Connect Care 
(G) Epic - Radiant (Radiology) 
Community 
Radiologist 
Clinic 
Administration 
Community -O 
DI Results 
Community Radiology 
Assessment. 
Imaging Systems 
Screening 
Mammogram Result 
Letters 
Sum 
Transcribes* 
gra 
Intecept Breast 
Cancer Screening 
Result 
Mammography Health Maintenance Reminder 
(G) Epic - Healthy Planet (Population Health) 
Breast 
Cancer 
Screening 
HL7 TXT 
Discrete Data 
_O 
Patient Association 
(G) Epic - Bridges 
Mammograpgy 
Discrete Result 
(G) Epic 
Business 
Object 
Described by 
Data Object 
nds — 
Screen Test Rural 
Locations 
A erta Netcare Porta 
Cancer Screening Status 
Alberta Mammograpgy 
Screening Candidate 
Data driving HMR - only screening 
mam mog ram 
Findings 
Birads 
Density 
Date of Last Mammography Exam 
Assess TXT part of HL7 Message for 
Mammography Discrete Results 
icrosoft Azure Al Age 
uanum C 
Mammogram 
Result Letter 
end 
Business Actor 
Stakeholder 
Accesses 
Associated to 
Application 
Has 
Constraint 
Automates 
Realizes 
Application 
Process 
Supported by 
Application 
Function 
---Accesses 
reening QA Repo 
ammo grap 
Correspondance 
Campaign Le 
- Cogito (Analytics) 
Related Views 
Breast Cancer 
Screening Value 
Stream - AHS Screen 
Test Program 
Author: Alec Blair 
ProjectName: Connect Care PPH 
ProjectlD: None 
View Version: 0.1 
Date: Jan 17, 2025]

Build Objects by Team 

- Integration Team 
    
    - Functionality to split out Mammography Screening Results 
        
    - Ability to send HL7 TXT to Azure AI, receive the results and create the new message 
        
    - New Screening Mammograpgy Interface with Epic Bridges 
        
- Intelligent Automation Team – Create Mammography screening prompt using the Microsoft Azure AI API using the Medical Terminology Extensions to return the: 
    
    - Findings 
        
    - BIRADS 
        
    - Density and; 
        
    - Last Mammo Exam Date 
        
- Bridges Team – Create new Community Mammography Screening Discrete Data Result Interface 
    
- Radiant – Quality Assurance on new mammography screening results 
    
- Healthy Planet – Create Mammography Health Maintenance Reminder (HMR) 
    
- Cogito – Create Netcare Cancer Screening Report using HMR 
    
- Netcare – Update intake workflow from PCS to Epic 
    

Process workflow 

See the draft workflow model below that is in the VERY draft [Community Mammography Discrete Results SBAR.pptx](https://albertahealthservices.sharepoint.com/:p:/r/sites/M365TScreeningIndividualPopulationWG/Shared%20Documents/General/Community%20Mammography%20Results/Community%20Mammography%20Discrete%20Results%20SBAR.pptx?d=w16731b23b0a7417b9a03b10625e10276&csf=1&web=1&e=C9BMk0), but the high level steps would be as follows: 

1. Community Radiology Clinic sends the Imaging Result 
    
2. IF Imaging Result = Mammography Screening THEN go to next step ELSE follow normal Community Imaging workflow 
    
3. IBM Integration Bus (IIB) parses the HL7 message to send TXT part of the result with a Screening Mammography AI prompt to interpret text results based on medical terminology and allows values for the four discrete data elements. 
    
4. IIB team create new Breast Cancer Screening Interface that adds the discrete data fields to the result which then gets send to  
    
5. A new  Bridges interface to Connect Care that will send the result into Radiant using the existing AHS Mammography Screening Result. 
    
6. This then allows for the Mammography screening recommendation to be generated using the Epic Healthy Planet Health Maintenance Reminder functionality. This will be available then to send to Netcare, remind clinicians as well as My AHS Connect Users. 
    


