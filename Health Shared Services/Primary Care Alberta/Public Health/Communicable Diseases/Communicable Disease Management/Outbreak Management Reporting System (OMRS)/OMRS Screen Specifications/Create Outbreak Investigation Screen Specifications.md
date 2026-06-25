## Design Specification Context 


## Wireframe 

Note - this will be a screen shot of the most recent wireframe.

## Acceptance Specifications 

1. Scenario Conditions – What scenarios have been defined that may affect the specifications 
    
    1. Minimum Viable Content – Need to be able to quickly open an Outbreak investigation that allows for additional data to be added over time. 
        
    2. Large Exposures vs. Outbreaks – TB in particular, but STIs on the rare occasion will use the outbreak investigation framework even though they rarely have investigations that meet the formal outbreak case definition. 
        
    3. Provisioning Outbreak Investigation ID for Lab Requisitions – To allow for creating lab requisitions where the patient is not known (e.g. Daycare where they want to send a paper lab requisition for family members), the Outbreak ID will function like the Exposure Investigation identifier does now. 
        
2. Functional Behaviour – What (if any) business logic needs to be created for this  
    
    1. Need a button that will launch the [Outbreak Location Maintenance Function Specifications](onenote:#Outbreak%20Location%20Maintenance%20Function%20Specifications&section-id={B18CEF0A-7F53-4AAA-959D-FAA331DCD0FD}&page-id={C8CD4A98-2E42-4AB8-B635-2434F225BEB1}&end&base-path=https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/SiteAssets/M365T%20-%20CC%20Notifiable%20Disease%20Projects%20Notebook/Outbreak%20Management%20Application%20Design.one) window to be to add a new location 
        
3. User Experience Considerations – What (if any) UX options might we have to consider as part of the build. 
    
    1. This function will be part of the overall Outbreak Management collection of functions 
        
    2. May want to have a pop-out window for where an outbreak is a region vs. A physical building. 
        
4. Data Inputs and Outputs – What are the data elements involved for the build object. What test data is needed to support functional testing. 
    
    1. No Data Inputs 
        
    2. Data Outputs  
        
5. Business Rules and Validation – What (if any) business logic governs this application function and what can be done to build in quality checks for data validation? 
    
    1. Need to only allow for an Outbreak to be created if all of the mandatory fields are added 
        
    
6. Exception Handling – How will the application handle edge cases, missing data, time outs, etc.? 
    
7. Business Semantics – What terminology resonates with the business for this application function. 
    

|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|Screen Field|Data Type|Database Field|Data Standard|Default Value|Mandatory?|Comments|
|Outbreak ID|Alpha Numeric|outbreakID|TBD|None – auto generated|Yes||
|Outbreak Name|Alpha Numeric|outbreakName||Is there an established naming convention that could pre-populate the name from other fields|||
|Outbreak Investigator|Lookup|Outbreak_Team_Members:personID|Lookup on the Outbreak User table|Default to the user logged into the application|Yes|May want the ability to click to add a new user|
|Investigation 'Zone'|Lookup|||||Need to confirm what 'zones' need to be captured to facilitate case mamagment.|
|Disease|Lookup|infectiousDiseaseName|List of organisms|None|Yes||
|Created by|Lookup|InfectiousDiseaseName|Lookup on user table|Can only be the person logged in|Yes|Not visible, but created as part of the record|
|Create Date (audit)|Date and Time|outbreakCreateDate|Date and Time component|Logged as part of creation record. No ability to edit|Yes|Not visible on the create screen, but part of the outbreak record|
|Onset Date|Date and Time|outbreakOnsetDate|Date and Time component|Default to the current data with the ability to back-date the creation date|Yes|Need to confirm if this is required|
|Investigation Status|Lookup|outbreakStatus|- Open <br>    <br>- Closed <br>    <br>- Re-opened|Open.|Yes|May be hidden as part of open, but can be updated as part of the create.|
|Investigation Progress|Lookup|outbreakProgress|- Tracking <br>    <br>- Outbreak <br>    <br>- Not an Outbreak|Tracking|Yes|Can be changed to another status|
|Outbreak Type|Lookup|||||Need to make sure this field is consistent with the AORF definitions.|
|Outbreak Setting|Lookup|outbreakSettingName|Outbreak Setting List|None|Yes|Need to decide how to deal with non-building settings e.g. Plane, etc. - if at all|
|Outbreak Region|Lookup|||||Need to decide how many difference region types to consider: <br><br>- Municipality/Community <br>    <br>- Zone/Sub-zone <br>    <br>- Provincial|
|Outbreak Location|Lookup|facility.Name|Lookup on Location Table with filter by Setting type|None|No||
|Outbreak Department|Lookup|facilitySubTypeName|Lookup on Department Table with filter based on Location selected|None|No||

Technical Implementation Notes 

- Access Specifications – What (if any) role-based authorization is required? 
    
    - Need to confirm if only certain roles can create Outbreak Investigations 
        
- Security Specifications – What data sensitivity, audit or compliance considerations are there? 
    
- Performance Expectations – what (if any) response time expectations or other  
    
    - None other than application SLA 
        

Version History 

- Last Update - 
    
    - Mar. 4, 2026 (Alec Blair) - Initial draft 
        
    - March 5, 2026 (Alec and Juliane Mueller) - Updated the specifications to align to the [Outbreak Summary Wireframe](onenote:#Outbreak%20Summary%20Wireframe&section-id={B18CEF0A-7F53-4AAA-959D-FAA331DCD0FD}&page-id={1D89D223-6719-4713-BB03-A8AA4C7E7777}&end&base-path=https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/SiteAssets/M365T%20-%20CC%20Notifiable%20Disease%20Projects%20Notebook/Outbreak%20Management%20Application%20Design.one). Added additional linkages to other screens that will need to be built. 
        
    - May 26, 2026 (Alec) - updated based on the feedback from the [May-26-2026 ND/CDC WG](onenote:..\CDS-Program%20Working%20Group%20Sessions.one#May-26-2026%20ND/CDC%20WG&section-id={d7042e81-fd7b-48fe-a6ab-37de04e77e76}&page-id={84d1bba9-e2e8-40d2-9432-14c6f7ab0307}&end)  ([Web view](https://albertahealthservices.sharepoint.com/teams/M365TCCNotifiableDiseaseProjects/_layouts/15/Doc.aspx?sourcedoc=%7B49042283-743a-4bca-ba5d-02b10ecbaa82%7D&action=edit&wd=target%28CDS-Program%20Working%20Group%20Sessions.one%7Cd7042e81-fd7b-48fe-a6ab-37de04e77e76%2FMay-26-2026%20ND%5C%2FCDC%20WG%7C84d1bba9-e2e8-40d2-9432-14c6f7ab0307%2F%29&wdorigin=703&wdpartid=%7B6f6ad480-82ad-0b1b-0769-17302bd0ebad%7D%7B1%7D&wdsectionfileid=%7Bb2ea1285-bf46-48c3-af59-009355a9dc10%7D&wdpreservelink=1)) including: 
        
        - Added field for Region 
            
        - Updated the field names with some questions that need to be answered when we need to prep for presenting 
            
    - June 25, 2026 (Claude — handoff round-trip test) - Test marker to verify the GitHub sync loop end to end. Safe to delete after confirming.
        
- Specifications Status - Draft 
    
- Linked SBARs -  
    
- Linked Enabling Stories -