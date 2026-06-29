---
type: Data Model
title: OMRA Database ERD
description: Authoritative DBML-style entity-relationship data model for the Outbreak Management Reporting Application (OMRA), spanning core outbreak entities, line lists, contact identification, reporting, the application user / access model, and disclosure auditing.
tags:
  - data-model
  - erd
  - dbml
  - omra
  - communicable-disease
  - outbreak-management
timestamp: 2026-06-29T00:00:00Z
---

// ============================================================================
// OUTBREAK MANAGEMENT REPORTING APPLICATION (OMRA) - DATABASE ERD
// Version: 2.6
// Date: January 12, 2026
//   v2.6 update June 29, 2026 - submission-side entities imported from the Submit
//     Facility Questionnaire Screen Specifications (Section 16): FacilitySubmissionReceipt
//     (a dated acknowledgement returned to the operator, including a "no updates"
//     confirmation), SubmissionValidation + SubmissionValidationIssue (the result of the
//     Validate quality-check gate, header + per-issue detail), and SubmissionFileUpload
//     (staging for an uploaded Excel/PDF before its rows are mapped into a line list /
//     aggregate snapshot). Resolves the gaps that FacilityLineList (Section 5) and
//     FacilityOutbreakAggregateReport (Section 8) carried no receipt, no validation-result
//     store and no uploaded-file reference. Records the still-open access question (identity
//     attribution for the authentication-free Facility Operator path) via
//     FacilitySubmissionReceipt.submitterToken.
//   v2.5 update June 25, 2026 - prototype design changes imported from the OMRA
//     screen specifications:
//     (a) Disease Maintenance "Add Disease" minimum-viable quick-add - adds
//         InfectiousDisease.isProvisional so a quick-added dictionary entry (Disease
//         Name + Reporting Timeline only) is selectable immediately but flagged as
//         incomplete/pending curation; the steward equivalent of an investigator's
//         provisional add.
//     (b) Contact Identification "Export List" action - adds DisclosureExportLog
//         (Section 12) to audit PHI export/disclosure events (who, when, scope/filter,
//         row count, disease group, format, purpose) since AuditLog models only
//         INSERT/UPDATE/DELETE mutations, not read/export/disclosure. AuditLog.actionType
//         note extended to reference EXPORT/DISCLOSE for completeness.
//   v2.1 update June 17, 2026 - added Vaccine, DiagnosticTest, DiseaseCaseDefinitionRule; setting thresholds
//   v2.2 update June 17, 2026 - added Application User & Access Model (Section 14):
//     AppUser, FunctionalRole, Team/UserTeam, UserZone, DiseaseGroup/UserDiseaseGroup,
//     ProfessionalDesignation, UserMaintenanceActivity - implements the two-layer
//     RBAC + ABAC model in User Maintenance Screen Specifications. Adds user address /
//     postal code and user version-status / change history (gaps flagged by that spec).
//   v2.3 update June 22, 2026 - added Contact Identification (Section 15):
//     ContactIdentification, ContactGuardian, Ethnicity, DiseaseContactQuestion,
//     ContactDiseaseQuestionResponse - resolves the gaps flagged by the Contact
//     Identification Screen Specifications (no standalone, promotable contact entity).
//     Also adds an optional ContactAttempt.contactIdentificationID so attempt history
//     can attach to a contact, not only a line-list person.
//   v2.4 update June 22, 2026 - Contact Identification lineage & lifecycle:
//     ContactIdentification.escalatedToOutbreakID and Outbreak.originatingContactID
//     (a contact may become its own outbreak); ContactOutbreakLink (many-to-many that
//     preserves a contact's association to multiple outbreaks/clusters and the original
//     outbreak identifiers across merges and cluster reorganization); and
//     ContactInvestigationLifecycle (status-transition history that carries the
//     EpicAbstract / Communicable Disease Abstract link once a CD episode is created).
// ============================================================================


// ============================================================================
// SECTION 1: CORE OUTBREAK ENTITIES
// ============================================================================

Table Outbreak {
  outbreakID int [primary key]
  outbreakName varchar(80) [note: 'May be auto-named based on facility + disease + date']
  outbreakLifecycleStatus int [ref: > OutbreakLifecycleStatus.statusID, note: 'New, Assess, Active, Suspended, Closed, Reopened']
  outbreakCreateDate datetime [note: 'System generated time - cannot be altered']
  outbreakStartDate datetime [note: 'Manual entry - date outbreak declared to have met case definition']
  outbreakEndDate datetime [note: 'Manual entry - assisted by pathogen-specific duration guidelines']
  clusterOutbreak int [ref: > Outbreak.outbreakID, note: 'Links to parent cluster for multi-site outbreaks; preserves identifiers across clustered outbreaks']
  originatingContactID int [ref: > ContactIdentification.contactIdentificationID, note: 'v2.4 - set when this outbreak was escalated from a Contact Identification; preserves identifiers across contacts and outbreaks']
  outbreakType int [ref: > OutbreakType.outbreakTypeID]
  outbreakOrganism int [ref: > OutbreakOrganism.outbreakOrganismID, note: 'Junction table for multiple organisms']
  outbreakFacility int [ref: > Facility.facilityID, note: '1:1 - separate outbreak per facility, linked via cluster']
  outbreakInvestigationLead int [ref: > Person.personID, note: 'MOH or designate']
  outbreakStatus varchar(15) [note: 'Open, Closed, Re-opened']
  outbreakProgress varchar(15) [note: 'Tracking, Outbreak, Not Outbreak']
  outbreakHypothesis varchar(500)
  outbreakPHACID varchar(50) [note: 'PHAC ID if referred from federal level']
  outbreakUpdateReason varchar(500)
  createdBy int [ref: > Person.personID]
  createdDate datetime
  modifiedBy int [ref: > Person.personID]
  modifiedDate datetime
  isDeleted bool [default: false, note: 'Soft delete']
}

Table OutbreakLifecycleStatus {
  statusID int [primary key]
  statusName varchar(50) [note: 'New, Assess, Active, Suspended, Closed, Reopened']
  statusDescription varchar(255)
  statusOrder int [note: 'Display/workflow order']
}

Table OutbreakType {
  outbreakTypeID int [primary key]
  outbreakTypeName varchar(100) [note: 'COVID-19, VRI, Influenza, GI, Mixed Pathogen (Respiratory), Mixed Pathogen (GI)']
  outbreakTypeCategory varchar(50) [note: 'Respiratory, Gastrointestinal, Mixed']
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table OutbreakOrganism {
  outbreakOrganismID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  organismID int [ref: > Organism.organismID]
  isPrimaryOrganism bool [default: true]
  confirmedDate date
}


// ============================================================================
// SECTION 2: OUTBREAK DEFINITION & THRESHOLDS
// ============================================================================

Table OutbreakDefinition {
  outbreakDefinitionID int [primary key]
  infectiousDiseaseID int [ref: > InfectiousDisease.infectiousDiseaseID]
  outbreakSettingID int [ref: > OutbreakSetting.outbreakSettingID]
  outbreakTypeID int [ref: > OutbreakType.outbreakTypeID]
  minCaseCount int [note: 'Minimum cases to trigger outbreak (e.g., 2)']
  minConfirmedCaseCount int [note: 'Minimum confirmed cases to trigger outbreak - per Disease Maintenance wireframe']
  minProbableCaseCount int [note: 'Minimum probable cases to trigger outbreak']
  timeframeDays int [note: 'Timeframe for case count (e.g., 7 days)']
  requiresEpiLink bool [default: true, note: 'Cases must be epidemiologically linked']
  outbreakDurationDays int [note: 'Standard duration from last case (e.g., 14 for COVID-19)']
  absenteeismThresholdPct decimal(5,2) [note: 'Setting-specific closure/declaration threshold, e.g., school absenteeism %']
  closureCriteriaText varchar(1000) [note: 'Narrative closure criteria where not expressible as a duration or numeric threshold']
  caseDefinitionText varchar(1000) [note: 'Full case definition text - structured per-tier rules now held in DiseaseCaseDefinitionRule']
  outbreakDefinitionText varchar(1000) [note: 'Full outbreak definition text']
  effectiveDate date
  expiryDate date
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}


// ============================================================================
// SECTION 3: STAKEHOLDER & TEAM MANAGEMENT
// ============================================================================

Table Person {
  personID int [primary key]
  personFirstName varchar(100)
  personAlias varchar(100)
  personLastName varchar(100)
  personEmail varchar(255)
  personPhone varchar(20)
  organizationID int [ref: > Organization.organizationID]
  isActive bool [default: true]
  createdDate datetime
  modifiedDate datetime
  isDeleted bool [default: false]
  // Note that we propose that we have a history of changes to a person's demographics
  // Need to create a similar table for users
}

Table Organization {
  organizationID int [primary key]
  organizationName varchar(255)
  organizationType int [ref: > OrganizationType.organizationTypeID, note: 'AHS, PCA, Covenant, Facility Operator, etc.']
  parentOrganizationID int [ref: > Organization.organizationID]
  isActive bool [default: true]
}

Table OrganizationType {
  organizationTypeID int [primary key]
  organizationTypeName varchar(100) [note: 'AHS, PCA, Covenant Health, Facility Operator, Recovery Alberta, etc.']
}

Table Zone {
  zoneID int [primary key]
  zoneName varchar(100) [note: 'Calgary, Edmonton, Central, North, South']
  zoneAbbreviation varchar(10)
}

Table Role {
  roleID int [primary key]
  roleName varchar(100) [note: 'MOH, IPC, WHS/OHS&W, CDC Nurse, SHE/EPH, Site Manager, OMT Lead, etc.']
  roleCategory varchar(50) [note: 'Clinical, Administrative, Public Health, Site Operations']
  canDeclareOutbreak bool [default: false]
  canCloseOutbreak bool [default: false]
  canEditLineList bool [default: false]
  canSubmitAORF bool [default: false]
  canViewOnly bool [default: true]
}

Table PersonRole {
  personRoleID int [primary key]
  personID int [ref: > Person.personID]
  roleID int [ref: > Role.roleID]
  effectiveDate date
  expiryDate date
}

Table OutbreakTeamMember {
  outbreakTeamMemberID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  personID int [ref: > Person.personID]
  roleID int [ref: > Role.roleID]
  assignedDate datetime
  removedDate datetime
  isOMTMember bool [default: false, note: 'Formal Outbreak Management Team member']
  isOMTLead bool [default: false]
  assignedBy int [ref: > Person.personID]
}

Table OutbreakActivity {
  outbreakActivityID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  personID int [ref: > Person.personID]
  activityTypeID int [ref: > ActivityType.activityTypeID]
  activityDate datetime
  activityNotes varchar(2000)
  createdDate datetime
}

Table ActivityType {
  activityTypeID int [primary key]
  activityTypeName varchar(100) [note: 'OMT Meeting, Site Visit, Phone Call, Email, Report Review, etc.']
  activityCategory varchar(50)
}


// ============================================================================
// SECTION 4: FACILITY & LOCATION MANAGEMENT
// ============================================================================

Table Facility {
  facilityID int [primary key]
  epicFacilityID int [note: 'Reference to Epic/Connect Care facility master']
  facilityName varchar(255)
  facilityAddress varchar(500)
  facilityPostalCode varchar(10)
  facilityPhone varchar(20)
  facilityTypeID int [ref: > FacilityType.facilityTypeID]
  facilitySubTypeID int [ref: > FacilitySubType.facilitySubTypeID]
  primaryOutbreakSettingID int [ref: > OutbreakSetting.outbreakSettingID]
  zoneID int [ref: > Zone.zoneID]
  operatorOrganizationID int [ref: > Organization.organizationID]
  isActive bool [default: true]
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table FacilityType {
  facilityTypeID int [primary key]
  facilityTypeName varchar(100) [note: 'Continuing Care Home, Acute Care, Supportive Living, Correctional, School, Child Care, Shelter']
  facilityTypeCode varchar(20)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
} // need to double-check what the Facility Type is

Table FacilitySubType {
  facilitySubTypeID int [primary key]
  facilityTypeID int [ref: > FacilityType.facilityTypeID]
  facilitySubTypeName varchar(100) [note: 'CCH Type A, CCH Type B, CCH Type C, Urban Hospital, Rural Hospital, etc.']
  facilitySubTypeCode varchar(20)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
} // need to double-check what the Facility Sub Type is

Table OutbreakSetting {
  outbreakSettingID int [primary key]
  outbreakSettingName varchar(100) [note: 'Maps to CDC Guide categories']
  outbreakSettingCode varchar(20)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
  // need to double-check what the Outbreak Setting is
}

Table Building {
  buildingID int [primary key]
  facilityID int [ref: > Facility.facilityID]
  buildingName varchar(100)
  buildingCode varchar(20)
  isActive bool [default: true]
}

Table Department {
  departmentID int [primary key]
  buildingID int [ref: > Building.buildingID]
  departmentName varchar(100) [note: 'Unit, Wing, Floor, Range, Classroom - normalized term']
  departmentCode varchar(20)
  departmentLocalName varchar(100) [note: 'Setting-specific terminology']
  isActive bool [default: true]
  // may also cover floors, etc.
}

Table Room {
  roomID int [primary key]
  departmentID int [ref: > Department.departmentID]
  roomName varchar(50)
  roomNumber varchar(20)
  bedCount int
  isActive bool [default: true]
}


// ============================================================================
// SECTION 5: LINE LIST & CASE MANAGEMENT
// ============================================================================

Table FacilityLineList {
  lineListID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  facilityID int [ref: > Facility.facilityID]
  lineListSubmissionDate datetime
  lineListSubmissionPerson int [ref: > Person.personID]
  reportingPeriodStart date
  reportingPeriodEnd date
  createdDate datetime
  modifiedDate datetime
  isDeleted bool [default: false]
}

Table LineListPerson {
  lineListPersonID int [primary key]
  lineListID int [ref: > FacilityLineList.lineListID]
  // Person Identification
  lineListPersonFirstName varchar(100)
  lineListPersonLastName varchar(100)
  lineListPersonDOB date
  lineListPersonGender varchar(20)
  lineListPersonPHN varchar(20) [note: 'Provincial Health Number']
  lineListPersonULI varchar(20) [note: 'Unique Lifetime Identifier - validated via Client Registry']
  // Contact Information
  lineListPersonAddress varchar(500)
  lineListPersonHomePhone varchar(20)
  lineListPersonMobilePhone varchar(20)
  // Person Type
  personTypeID int [ref: > LineListPersonType.personTypeID, note: 'Client/Resident vs HCW/Staff']
  // Location within Facility
  roomID int [ref: > Room.roomID]
  // Clinical Information
  symptomOnsetDate date [note: 'Distinct from date added to list']
  caseClassificationID int [ref: > CaseClassification.caseClassificationID, note: 'Confirmed, Probable, Suspect']
  isLabConfirmed bool
  specimenCollectionDate date
  specimenResultDate date
  specimenResult varchar(100)
  // Outcome Information
  isHospitalized bool
  hospitalizationDate date
  hospitalName varchar(255)
  dischargeDate date
  isDied bool
  deathDate date
  deathRelatedToOutbreak bool
  // Epic Integration
  epicEpisodeID int [note: 'Populated from Epic interface after case creation']
  epicAbstractID int [ref: > EpicAbstract.epicAbstractID]
  // should this be here, or just a lookup based on ULI?
  // Tracking
  lineListPersonDateAdded datetime
  lineListPersonDateUpdated datetime
  addedBy int [ref: > Person.personID]
  modifiedBy int [ref: > Person.personID]
  isDeleted bool [default: false]
  // Staging attributes - need to consider that people are submitting daily. May be batch uploaded from Excel, may be updated by the Investigator for better data quality
}

Table LineListPersonType {
  personTypeID int [primary key]
  personTypeName varchar(50) [note: 'Client, Resident, HCW, Staff, Visitor']
  personTypeCategory varchar(50) [note: 'Patient/Resident or Worker']
}

Table CaseClassification {
  caseClassificationID int [primary key]
  classificationName varchar(50) [note: 'Confirmed, Probable, Suspect, Not a Case']
  classificationDescription varchar(255)
}

Table LineListPersonSymptom {
  lineListPersonSymptomID int [primary key]
  lineListPersonID int [ref: > LineListPerson.lineListPersonID]
  symptomID int [ref: > Symptom.symptomID]
  symptomOnsetDate date
  symptomResolvedDate date
  reportedDate date
}


// ============================================================================
// SECTION 6: CLIENT REGISTRY INTEGRATION
// ============================================================================

Table ClientRegistryTransaction {
  transactionID int [primary key]
  lineListPersonID int [ref: > LineListPerson.lineListPersonID]
  transactionType varchar(50) [note: 'PHN Validation, ULI Lookup, Demographics Update']
  requestDateTime datetime
  responseDateTime datetime
  requestPayload text [note: 'JSON/XML request sent']
  responsePayload text [note: 'JSON/XML response received']
  transactionStatus varchar(50) [note: 'Success, Failed, Pending, Timeout']
  errorMessage varchar(500)
  validatedPHN varchar(20)
  validatedULI varchar(20)
  matchConfidence varchar(20) [note: 'Exact, Probable, Multiple, NoMatch']
  initiatedBy int [ref: > Person.personID]
}


// ============================================================================
// SECTION 7: COMMUNICATION ATTEMPTS
// ============================================================================

Table ContactAttempt {
  contactAttemptID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  lineListPersonID int [ref: > LineListPerson.lineListPersonID, note: 'The case being investigated (line-list context)']
  contactIdentificationID int [ref: > ContactIdentification.contactIdentificationID, note: 'v2.3 - attempt history for a Contact Identification record (Section 15); optional, alternative to lineListPersonID']
  contactPersonName varchar(200) [note: 'Name of person being contacted']
  contactPersonPhone varchar(20)
  contactPersonEmail varchar(255)
  contactPersonRelationship varchar(100) [note: 'Relationship to case']
  attemptDateTime datetime
  attemptMethod varchar(50) [note: 'Phone, Email, In-Person, Letter']
  attemptOutcome varchar(50) [note: 'Reached, No Answer, Wrong Number, Refused, etc.']
  followUpRequired bool
  followUpDate date
  notes varchar(2000)
  attemptedBy int [ref: > Person.personID]
  createdDate datetime
}


// ============================================================================
// SECTION 8: AGGREGATE REPORTING
// ============================================================================

Table FacilityOutbreakAggregateReport {
  aggregateReportID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  facilityID int [ref: > Facility.facilityID]
  reportDate date [note: 'Date this aggregate snapshot represents']
  // Client/Resident Counts
  clientTotalCases int
  clientNewCasesToday int
  clientSymptomaticCount int
  clientLabConfirmedCount int
  clientHospitalizedCount int
  clientDeathCount int
  clientRecoveredCount int
  // HCW/Staff Counts
  staffTotalCases int
  staffNewCasesToday int
  staffSymptomaticCount int
  staffLabConfirmedCount int
  staffHospitalizedCount int
  staffDeathCount int
  staffRecoveredCount int
  // Derived/Calculated flag
  isManualEntry bool [default: false, note: 'True if manually entered, False if derived from line list']
  submittedBy int [ref: > Person.personID]
  submittedDate datetime
  createdDate datetime
  modifiedDate datetime
}


// ============================================================================
// SECTION 9: AORF & EXTERNAL REPORTING
// ============================================================================

Table AORFSubmission {
  aorfSubmissionID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  submissionType varchar(50) [note: 'Initial, Amendment, Final']
  submissionStatus varchar(50) [note: 'Draft, Submitted, Acknowledged, Rejected']
  // Timing
  dueDate datetime [note: 'Initial within 24hrs of declaration, Final within 48hrs of close']
  submittedDate datetime
  acknowledgedDate datetime
  // Content snapshot at time of submission
  submissionPayload text [note: 'JSON snapshot of AORF data at submission']
  submittedBy int [ref: > Person.personID]
  createdDate datetime
  modifiedDate datetime
}

Table ExternalReportSubmission {
  externalReportID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  reportingAgency varchar(100) [note: 'PHAC, WHO, Other Provincial']
  reportingAgencyID varchar(50) [note: 'ID assigned by external agency']
  submissionType varchar(50) [note: 'Initial, Update, Final']
  submissionDate datetime
  acknowledgedDate datetime
  submissionStatus varchar(50)
  submissionPayload text
  responsePayload text
  submittedBy int [ref: > Person.personID]
  createdDate datetime
}


// ============================================================================
// SECTION 10: DISEASE & ORGANISM REFERENCE DATA
// ============================================================================

Table InfectiousDisease {
  infectiousDiseaseID int [primary key]
  infectiousDiseaseName varchar(255)
  infectiousDiseaseICD10Code varchar(20)
  infectiousDiseaseCategory varchar(100) [note: 'Respiratory, Enteric, Vaccine-Preventable, STI, etc.']
  notifiable bool
  reportingPriority varchar(20) [note: 'FMP, 24 hours, 48 hours']
  incubationPeriodMinDays int
  incubationPeriodMaxDays int
  periodOfCommunicabilityDays int
  transmissionVector varchar(255) [note: 'Airborne, Droplet, Contact, Fecal-Oral, etc.']
  vaccinePreventable bool
  isProvisional bool [default: false, note: 'v2.5 - true when created via the Disease Maintenance "Add Disease" quick-add (Disease Name + Reporting Timeline only). Record is written Active so it is immediately selectable in lookups, but is flagged as incomplete/pending steward curation. Cleared when the full record is completed. Steward equivalent of the investigator provisional add (UserMaintenanceActivity).']
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table Organism {
  organismID int [primary key]
  organismName varchar(255)
  organismAbbreviation varchar(50)
  organismType varchar(50) [note: 'Virus, Bacteria, Parasite, Fungus, Prion']
  organismGroup varchar(100)
  organismGenus varchar(100)
  organismSpecies varchar(100)
  organismSerotype varchar(100)
  organismBiotype varchar(100)
  organismPhageType varchar(100)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table DiseaseOrganism {
  diseaseOrganismID int [primary key]
  infectiousDiseaseID int [ref: > InfectiousDisease.infectiousDiseaseID]
  organismID int [ref: > Organism.organismID]
  isPrimaryOrganism bool [default: true]
}

Table Symptom {
  symptomID int [primary key]
  symptomName varchar(100) [note: 'Fever, Cough, Diarrhea, Vomiting, etc.']
  symptomCategory varchar(50) [note: 'Respiratory, GI, Neurological, Systemic, etc.']
  symptomDescription varchar(500)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table DiseaseSymptom {
  diseaseSymptomID int [primary key]
  infectiousDiseaseID int [ref: > InfectiousDisease.infectiousDiseaseID]
  symptomID int [ref: > Symptom.symptomID]
  isTypicalSymptom bool [default: true]
  isRequiredForCaseDefinition bool [default: false]
  symptomFrequency varchar(50) [note: 'Common, Occasional, Rare']
}

Table Vaccine {
  vaccineID int [primary key]
  vaccineName varchar(255)
  vaccineAbbreviation varchar(50)
  vaccineCode varchar(50) [note: 'Provincial vaccine catalogue / Connect Care Willow product code']
  vaccineType varchar(100) [note: 'Live attenuated, Inactivated, mRNA, Toxoid, etc.']
  manufacturer varchar(255)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table DiseaseVaccine {
  diseaseVaccineID int [primary key]
  infectiousDiseaseID int [ref: > InfectiousDisease.infectiousDiseaseID]
  vaccineID int [ref: > Vaccine.vaccineID]
  isPrimaryVaccine bool [default: true]
}

Table DiagnosticTest {
  diagnosticTestID int [primary key]
  diagnosticTestName varchar(255) [note: 'Lab procedure / test name, e.g., PCR, Culture, Serology']
  diagnosticTestCode varchar(50) [note: 'LOINC or provincial lab test code']
  specimenType varchar(100) [note: 'Nasopharyngeal swab, Stool, Blood, etc.']
  testMethod varchar(100) [note: 'PCR, Culture, Antigen, Serology, etc.']
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table DiseaseTest {
  diseaseTestID int [primary key]
  infectiousDiseaseID int [ref: > InfectiousDisease.infectiousDiseaseID]
  diagnosticTestID int [ref: > DiagnosticTest.diagnosticTestID]
  organismID int [ref: > Organism.organismID, note: 'Optional - test may be organism-specific']
  isConfirmatoryTest bool [default: false, note: 'Distinguishes confirmatory from screening tests']
}

Table DiseaseCaseDefinitionRule {
  caseDefinitionRuleID int [primary key]
  infectiousDiseaseID int [ref: > InfectiousDisease.infectiousDiseaseID]
  caseClassificationID int [ref: > CaseClassification.caseClassificationID, note: 'Tier the rule defines: Confirmed, Probable, Suspect']
  ruleName varchar(100) [note: 'Rule Name column in the Episode Conditions builder']
  ruleSequence int [note: 'Display / evaluation order within the tier']
  conditionText varchar(500) [note: 'Condition expression, e.g., organism isolated from a sterile site']
  logicalOperator varchar(3) [note: 'AND / OR - how this rule joins the next within the tier']
  effectiveDate date
  expiryDate date
  comments varchar(500)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

// Need to also have a table for OutbreakType to Disease


// ============================================================================
// SECTION 11: EPIC / CONNECT CARE INTEGRATION
// ============================================================================

Table EpicAbstract {
  epicAbstractID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  epicEpisodeID int [note: 'Episode ID from Connect Care']
  epicPatientID int [note: 'Patient ID from Connect Care']
  epicInfection varchar(255)
  epicInfectionStatus varchar(50)
  epicOrganism varchar(255)
  epicOrganizationID int
  epicCreateDate datetime
  epicUpdateDate datetime
  lastSyncDate datetime
  syncStatus varchar(50) [note: 'Synced, Pending, Error']
}


// ============================================================================
// SECTION 12: AUDIT & VERSIONING
// ============================================================================

Table VersionStatus {
  versionStatusID int [primary key]
  versionStatusName varchar(50) [note: 'Active, Retired, Merged, Draft']
}

Table AuditLog {
  auditLogID int [primary key]
  tableName varchar(100)
  recordID int
  actionType varchar(20) [note: 'INSERT, UPDATE, DELETE. Read/export/disclosure events (e.g., Contact Identification Export List) are recorded in DisclosureExportLog rather than here, since they have no before/after value pair.']
  actionDateTime datetime
  actionBy int [ref: > Person.personID]
  oldValues text [note: 'JSON of previous values']
  newValues text [note: 'JSON of new values']
  ipAddress varchar(50)
  userAgent varchar(500)
}

// --- v2.5: PHI export / disclosure audit (HIA) -----------------------------
// Records read/export/disclosure events that AuditLog (mutation-only) does not
// capture. Driven by the Contact Identification "Export List" action, but reusable
// for any screen that exports personal health information. Especially important for
// privacy-bounded disease groups (HIV/STI) where disclosure must be auditable.
Table DisclosureExportLog {
  disclosureExportLogID int [primary key]
  exportedBy int [ref: > Person.personID]
  exportDateTime datetime
  sourceScreen varchar(100) [note: 'e.g., Contact Identification Investigation List']
  outbreakID int [ref: > Outbreak.outbreakID, note: 'Source outbreak/source-case context where applicable; null for cross-outbreak exports']
  diseaseGroupID int [ref: > DiseaseGroup.diseaseGroupID, note: 'Disease group of the exported data; flags privacy-bounded (HIV/STI) disclosures']
  exportFormat varchar(20) [note: 'CSV, Excel']
  exportScope varchar(1000) [note: 'Active filter + sort applied at export time, so the disclosed set is reproducible']
  rowCount int [note: 'Number of records disclosed']
  purpose varchar(500) [note: 'Stated purpose, e.g., PHAC reporting, Ministry reporting, partner sharing, offline work']
  privacyBoundaryCrossed bool [default: false, note: 'True when the export includes privacy-bounded (HIV/STI) rows; requires steward authorization per Section 14']
  ipAddress varchar(50)
  userAgent varchar(500)
}


// ============================================================================
// SECTION 13: CLUSTER ALERT (FROM DATA LAKEHOUSE)
// ============================================================================

Table ClusterAlert {
  clusterAlertID int [primary key]
  alertDateTime datetime
  alertSource varchar(100) [note: 'Data Lakehouse, SaTScan, Manual']
  alertType varchar(100) [note: 'Spatial, Temporal, Spatiotemporal']
  infectiousDiseaseID int [ref: > InfectiousDisease.infectiousDiseaseID]
  facilityID int [ref: > Facility.facilityID]
  geographicArea varchar(255)
  caseCount int
  expectedCount float
  statisticalSignificance float
  alertStatus varchar(50) [note: 'New, Under Review, Confirmed Outbreak, Dismissed']
  reviewedBy int [ref: > Person.personID]
  reviewedDate datetime
  linkedOutbreakID int [ref: > Outbreak.outbreakID, note: 'If alert resulted in outbreak']
  alertPayload text [note: 'Full alert details from source system']
  createdDate datetime
}


// ============================================================================
// SECTION 14: APPLICATION USER & ACCESS MODEL (RBAC + ABAC)
// ============================================================================
// Implements the two-layer access model defined in
// "User Maintenance Screen Specifications": exactly ONE functional role per user
// (RBAC - the verbs) plus multi-valued scoping attributes (ABAC - the nouns:
// team, zone, disease group) and a display-only professional designation.
// Distinct from Section 3's Person/Role/PersonRole, which model real-world
// stakeholders and clinical roles (MOH, CDC Nurse) on the outbreak team.

Table AppUser {
  appUserID int [primary key]
  personID int [ref: > Person.personID, note: 'Identity - retrieved via Lookup Person on the User Maintenance screen']
  functionalRoleID int [ref: > FunctionalRole.functionalRoleID, note: 'EXACTLY ONE functional role per user (AC-1) - enforced single, not a junction']
  professionalDesignationID int [ref: > ProfessionalDesignation.professionalDesignationID, note: 'Display/attribution only - grants no function (3.5)']
  organizationID int [ref: > Organization.organizationID]
  userAddress varchar(500) [note: 'From User Maintenance wireframe Address field - not previously on Person']
  userPostalCode varchar(10) [note: 'Canada Post format - from User Maintenance wireframe']
  adAccountName varchar(255) [note: 'Active Directory account; AD groups carry non-selectable entitlements (Surveillance/Report Publisher, MyApps, etc.)']
  isActive bool [default: true, note: 'False = suspended; also occurs when the last team/zone attribute is removed (AC-2, business rule 5)']
  createdBy int [ref: > Person.personID]
  createdDate datetime
  modifiedBy int [ref: > Person.personID]
  modifiedDate datetime
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID, note: 'Versioned, not overwritten - preserves access history']
}

Table FunctionalRole {
  functionalRoleID int [primary key]
  functionalRoleName varchar(100) [note: 'Read-Only User, Intake User, Investigator, Team Lead / Manager, Business System Manager, IT System Administrator, Facility Operator']
  cdomUserGroup varchar(100) [note: 'Maps to current CD/OM user group for migration']
  connectCareAlignment varchar(255) [note: 'Nearest Connect Care (Epic) login-template construct']
  canRead bool [default: true]
  canCreate bool [default: false]
  canEdit bool [default: false]
  canReassign bool [default: false]
  canMerge bool [default: false, note: 'Merge / unmerge / split - Business System Manager only (AC-4)']
  canDelete bool [default: false, note: 'Delete / access-deleted - Business System Manager only (AC-4)']
  canAdminister bool [default: false, note: 'Platform / user provisioning - IT System Administrator']
  roleDescription varchar(500)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

// --- ABAC attribute: Team (3.1) - replaces CD/OM Last Name Prefix routing ---
Table Team {
  teamID int [primary key]
  teamName varchar(100) [note: 'CDC, SHE, TB, STI, HIV, IPC, PPHST']
  teamDescription varchar(255)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table UserTeam {
  userTeamID int [primary key]
  appUserID int [ref: > AppUser.appUserID]
  teamID int [ref: > Team.teamID]
  assignedDate date
  removedDate date
  assignedBy int [ref: > Person.personID]
  // Multi-valued: a user may span teams; scopes data only, does not multiply the role
}

// --- ABAC attribute: Zone (3.2) - user-to-zone junction over existing Zone table ---
Table UserZone {
  userZoneID int [primary key]
  appUserID int [ref: > AppUser.appUserID]
  zoneID int [ref: > Zone.zoneID, note: 'Calgary, Edmonton, Central, North, South; Provincial / Centralized supports cross-zone teams']
  assignedDate date
  removedDate date
  assignedBy int [ref: > Person.personID]
}

// --- ABAC attribute: Disease Group (3.3) - PRIMARY privacy boundary (HIV/STI) ---
Table DiseaseGroup {
  diseaseGroupID int [primary key]
  diseaseGroupName varchar(100) [note: 'CD-OB, STI, HIV, TB, Respiratory/ILI, Enteric/GI, Outbreak (facility), Unassigned (all)']
  isPrivacyBoundary bool [default: false, note: 'True for HIV / STI - crossing requires steward authorization + audit']
  diseaseGroupDescription varchar(255)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table UserDiseaseGroup {
  userDiseaseGroupID int [primary key]
  appUserID int [ref: > AppUser.appUserID]
  diseaseGroupID int [ref: > DiseaseGroup.diseaseGroupID]
  assignedDate date
  removedDate date
  authorizedBy int [ref: > Person.personID, note: 'Required when isPrivacyBoundary = true']
  assignedBy int [ref: > Person.personID]
}

// --- Display attribute: Professional Designation (3.5) - grants no function ---
Table ProfessionalDesignation {
  professionalDesignationID int [primary key]
  designationName varchar(100) [note: 'RN, LPN, NP, MD, MOH, EO, EPI, CHR, Admin Support, Supervisor, Manager, Director, Student, Other (AHS Health Professions Strategy list)']
  designationAbbreviation varchar(20)
}

// --- Privileged capability flag: Maintenance Activities (3.6) ---
Table UserMaintenanceActivity {
  userMaintenanceActivityID int [primary key]
  appUserID int [ref: > AppUser.appUserID]
  maintenanceActivityType varchar(50) [note: 'Provisional add (Investigator+) | Dictionary maintenance (BSM or explicitly granted)']
  grantedDate date
  grantedBy int [ref: > Person.personID]
  isActive bool [default: true]
}

// --- User change history (the Person comment anticipated a parallel users history) ---
Table AppUserHistory {
  appUserHistoryID int [primary key]
  appUserID int [ref: > AppUser.appUserID]
  changeType varchar(50) [note: 'Role change, Attribute add, Attribute remove, Suspend, Reactivate']
  changedField varchar(100)
  oldValue varchar(500)
  newValue varchar(500)
  changeReason varchar(500)
  changedBy int [ref: > Person.personID]
  changedDate datetime
}


// ============================================================================
// SECTION 15: CONTACT IDENTIFICATION
// ============================================================================
// Implements the Contact Identification Screen Specifications. A ContactIdentification
// is a standalone, promotable record of a person exposed within an outbreak (region)
// or by a source case (its EpicAbstract), distinct from LineListPerson (facility line
// list) and ContactAttempt (attempt history). Serves TB, STI, CDC and SHE contact
// investigation. HIV/STI records inherit the DiseaseGroup privacy boundary (Section 14).

Table ContactIdentification {
  contactIdentificationID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID, note: 'Source outbreak; used for region/outbreak-driven contact lists']
  indexCaseAbstractID int [ref: > EpicAbstract.epicAbstractID, note: 'Source case (Abstract ID) for source-case-driven investigations (e.g., TB); null for region outbreaks']
  // Contact identity - PHN Platinum demographic set
  contactFirstName varchar(100)
  contactMiddleName varchar(100) [note: 'Middle name - not held on LineListPerson']
  contactLastName varchar(100)
  contactDOB date
  legalSex varchar(20) [note: 'Provincial legal-sex value - distinct from gender']
  gender varchar(20) [note: 'Gender identity - distinct from legal sex']
  contactAddress varchar(500)
  municipality varchar(100) [note: 'Provincial municipality - separated from free-text address']
  contactPhone varchar(20) [note: '10-digit phone']
  contactEmail varchar(255) [note: 'Validated @ + domain']
  socialMedia varchar(255) [note: 'Optional social-media handle for trace-back']
  ethnicityID int [ref: > Ethnicity.ethnicityID]
  contactPHN varchar(20) [note: 'Provincial Health Number - may be absent for a new Albertan']
  contactULI varchar(20) [note: 'Unique Lifetime Identifier - validated via Client Registry']
  registryValidated bool [default: false, note: 'Set true when Query PHN confirms the PHN against the Platinum fields via ClientRegistryTransaction']
  // Exposure context
  exposureLocation varchar(255) [default: 'Unknown']
  relationshipToContact varchar(100) [note: 'Relationship of the contact to the source case / source']
  exposureFacilityID int [ref: > Facility.facilityID, note: 'Facility where exposure occurred - congregate setting']
  exposureRoomID int [ref: > Room.roomID, note: 'Room/department within the facility']
  flightNumber varchar(20) [note: 'Air-travel exposure - PHAC air-travel contact investigation']
  breakInContactDate date [note: 'Date exposure ended - anchors the follow-up / screening window']
  // Workflow + record lifecycle
  investigationStatus varchar(30) [note: 'No Attempts, Attempts in progress, Unable to contact, CD Episode Created, No Exposure Determined']
  recordStatus varchar(30) [note: 'Open, Closed, Closed - Duplicate']
  duplicateOfContactID int [ref: > ContactIdentification.contactIdentificationID, note: 'Self-ref; set when recordStatus = Closed - Duplicate']
  // Outbreak lineage
  escalatedToOutbreakID int [ref: > Outbreak.outbreakID, note: 'v2.4 - set when this contact/exposure was escalated into its own outbreak; preserves the contact->outbreak lineage. Cluster/multi-outbreak links are held in ContactOutbreakLink']
  // Episode promotion (Connect Care is system of record for the case)
  epicEpisodeID int [note: 'Returned from the Connect Care interface on Create Episode']
  promotedAbstractID int [ref: > EpicAbstract.epicAbstractID, note: 'The Communicable Disease Abstract created when the contact becomes a case; lifecycle transitions captured in ContactInvestigationLifecycle']
  // Audit / version
  createdBy int [ref: > Person.personID]
  createdDate datetime
  modifiedBy int [ref: > Person.personID]
  modifiedDate datetime
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID, note: 'Versioned, not overwritten']
  isDeleted bool [default: false, note: 'Soft delete']
}

Table ContactGuardian {
  contactGuardianID int [primary key]
  contactIdentificationID int [ref: > ContactIdentification.contactIdentificationID]
  guardianName varchar(200)
  guardianRelationship varchar(100) [note: 'Parent, Guardian, etc.']
  guardianPhone varchar(20)
  guardianAddress varchar(500)
  guardianEmail varchar(255)
  // Captured for minor contacts so notification/follow-up is directed to the responsible adult
}

Table Ethnicity {
  ethnicityID int [primary key]
  ethnicityName varchar(100) [note: 'Provincial ethnicity code set']
  ethnicityCode varchar(20)
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table DiseaseContactQuestion {
  diseaseContactQuestionID int [primary key]
  infectiousDiseaseID int [ref: > InfectiousDisease.infectiousDiseaseID, note: 'Disease-specific contact question, e.g., HIV shared needle (Y/N)']
  questionText varchar(500)
  responseType varchar(50) [note: 'Boolean, Lookup, Free text']
  questionSequence int [note: 'Display order']
  effectiveDate date
  expiryDate date
  versionDate date
  versionStatus int [ref: > VersionStatus.versionStatusID]
}

Table ContactDiseaseQuestionResponse {
  contactDiseaseQuestionResponseID int [primary key]
  contactIdentificationID int [ref: > ContactIdentification.contactIdentificationID]
  diseaseContactQuestionID int [ref: > DiseaseContactQuestion.diseaseContactQuestionID]
  responseValue varchar(500)
  respondedDate date
}

// --- v2.4: contact <-> outbreak/cluster lineage (preserve identifiers) ---
Table ContactOutbreakLink {
  contactOutbreakLinkID int [primary key]
  contactIdentificationID int [ref: > ContactIdentification.contactIdentificationID]
  outbreakID int [ref: > Outbreak.outbreakID, note: 'An outbreak this contact is associated with']
  linkType varchar(30) [note: 'Origin (outbreak the contact was logged under), Escalated (outbreak created from this contact), Cluster (linked via Outbreak.clusterOutbreak)']
  clusterOutbreakID int [ref: > Outbreak.outbreakID, note: 'Cluster head outbreak when linkType = Cluster; mirrors Outbreak.clusterOutbreak']
  preservedOutbreakIdentifier varchar(50) [note: 'Original outbreak identifier label, preserved even after merge / cluster reorganization']
  effectiveDate date
  endDate date
  linkedBy int [ref: > Person.personID]
  // Many-to-many: preserves a contact's association to multiple outbreaks and clusters over time
}

// --- v2.4: contact investigation lifecycle, linked to the CD Abstract ---
Table ContactInvestigationLifecycle {
  contactInvestigationLifecycleID int [primary key]
  contactIdentificationID int [ref: > ContactIdentification.contactIdentificationID]
  investigationStatus varchar(30) [note: 'Status at this transition - mirrors ContactIdentification.investigationStatus values']
  statusDate datetime
  epicAbstractID int [ref: > EpicAbstract.epicAbstractID, note: 'v2.4 - the Communicable Disease Abstract created/linked when the contact is promoted (status = CD Episode Created); null for earlier transitions']
  changedBy int [ref: > Person.personID]
  notes varchar(2000)
  // Connects the contact's investigation lifecycle to the CD Abstract once an episode is created
}


// ============================================================================
// SECTION 16: FACILITY QUESTIONNAIRE SUBMISSION (RECEIPT, VALIDATION & UPLOAD)
// ============================================================================
// v2.6 - resolves the submission-side gaps flagged by Submit Facility Questionnaire
// Screen Specifications. A facility submission is persisted as a line list (Section 5)
// or an aggregate snapshot (Section 8); these tables add (a) a dated submission receipt
// returned to the operator (including a "no updates" confirmation), (b) the result of the
// Validate action, and (c) a staging record for an uploaded Excel/PDF before its rows are
// mapped into the line list. None of these existed before: FacilityLineList /
// FacilityOutbreakAggregateReport had no receipt, no validation-result store, and no
// uploaded-file reference.

Table FacilitySubmissionReceipt {
  receiptID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  facilityID int [ref: > Facility.facilityID]
  submissionMode varchar(20) [note: 'Line List, Aggregate']
  lineListID int [ref: > FacilityLineList.lineListID, note: 'Set when the submission is a line list (Section 5); null otherwise']
  aggregateReportID int [ref: > FacilityOutbreakAggregateReport.aggregateReportID, note: 'Set when the submission is an aggregate snapshot (Section 8); null otherwise']
  reportingPeriodDate date [note: 'The reporting period/date the submission represents (mirrors lineListSubmissionDate / reportDate)']
  isNoUpdates bool [default: false, note: '"No updates / no change" confirmation for the period - a valid submission with no new/changed cases']
  submissionChannel varchar(20) [note: 'Web, Excel, PDF, Proxy']
  receiptReference varchar(50) [note: 'Human-readable confirmation reference returned to the operator']
  receiptIssuedDateTime datetime
  confirmationStatus varchar(30) [note: 'Received, Acknowledged, Superseded']
  submittedBy int [ref: > Person.personID, note: 'Operator or proxy (Investigator / PPHST Call Analyst); null for an unauthenticated web submitter']
  submitterToken varchar(100) [note: 'Tokenised, outbreak-scoped identifier for the authentication-free Facility Operator path when submittedBy is null - open access question']
  createdDate datetime
}

Table SubmissionValidation {
  validationID int [primary key]
  lineListID int [ref: > FacilityLineList.lineListID, note: 'Validated line-list submission (Section 5); null if aggregate or pre-ingest upload']
  aggregateReportID int [ref: > FacilityOutbreakAggregateReport.aggregateReportID, note: 'Validated aggregate snapshot (Section 8); null otherwise']
  fileUploadID int [ref: > SubmissionFileUpload.fileUploadID, note: 'Validated pre-ingest upload; null for in-page submissions']
  validationDateTime datetime
  validationStatus varchar(30) [note: 'Passed, PassedWithWarnings, Failed']
  triggeredAction varchar(20) [note: 'Validate (gate before Save) or Save']
  validatedBy int [ref: > Person.personID]
  // Header for one run of the quality checks (duplicate-by-date, mode integrity,
  // mandatory-context, registry checks); one row per Validate/Save action.
}

Table SubmissionValidationIssue {
  validationIssueID int [primary key]
  validationID int [ref: > SubmissionValidation.validationID]
  ruleCode varchar(50) [note: 'DUPLICATE_BY_DATE, MODE_INTEGRITY, MANDATORY_CONTEXT, REGISTRY_CHECK, UPLOAD_MAPPING, etc.']
  severity varchar(10) [note: 'Error (blocks Save), Warning (Save allowed if acknowledged)']
  message varchar(500)
  targetRowRef varchar(100) [note: 'LineListPerson row the issue applies to; null for submission-level issues']
  targetFieldRef varchar(100) [note: 'Field/column the issue applies to']
  isAcknowledged bool [default: false, note: 'Operator/proxy acknowledged a warning to allow Save (BR 5.6)']
}

Table SubmissionFileUpload {
  fileUploadID int [primary key]
  outbreakID int [ref: > Outbreak.outbreakID]
  facilityID int [ref: > Facility.facilityID]
  uploadMode varchar(20) [note: 'Line List, Aggregate']
  fileName varchar(255)
  fileFormat varchar(10) [note: 'XLSX, PDF']
  fileSizeBytes int
  storageRef varchar(500) [note: 'Pointer to the stored file in document storage']
  uploadDateTime datetime
  uploadedBy int [ref: > Person.personID, note: 'Operator or proxy; null for unauthenticated web submitter']
  ingestionStatus varchar(30) [note: 'Uploaded, Mapped, Ingested, Rejected']
  mappingReport text [note: 'Per-column mapping/validation report; populated on a failed/partial map (ESC 6.2)']
  resultingLineListID int [ref: > FacilityLineList.lineListID, note: 'Set once rows are committed to a line list (Section 5)']
  resultingAggregateReportID int [ref: > FacilityOutbreakAggregateReport.aggregateReportID, note: 'Set once an aggregate snapshot is committed (Section 8)']
  createdDate datetime
}


// ============================================================================
// RELATIONSHIP NOTES
// ============================================================================
//
// Key Design Decisions
//
// 1. DATA OWNERSHIP: Epic is system of record for individual cases. Outbreak App
//    manages outbreak coordination, line lists, and reporting. Data Lakehouse
//    provides analytics and cluster detection.
//
// 2. FACILITY MASTER DATA: Outbreak App both consumes and contributes to master
//    data. FacilityID references Epic but can extend with outbreak-specific attributes.
//
// 3. CLIENT REGISTRY: Full transaction tracking for PHN/ULI validation with
//    status and results per their interface specification.
//
// 4. OUTBREAK DEFINITIONS: Disease + Setting + Type determines thresholds,
//    enabling automated outbreak assessment support.
//
// 5. REDCAP REPLACEMENT: Line list and aggregate reporting fully replace REDCap
//    functionality within this application.
//
// 6. SOFT DELETE: All transactional entities use isDeleted flag for audit trail.
//
// 7. VERSIONING: All reference tables include versionDate and versionStatus
//    for historical tracking.
//
// 8. AGGREGATE DERIVATION: Q13 asked if aggregates can be derived -
//    isManualEntry flag supports both derived and manual entry scenarios.
//
// 9. CLUSTER vs PARENT: Terminology changed from parentOutbreak to clusterOutbreak
//    per Q27 decision.
//
// 10. EI NUMBER: Deferred per Q16 - OutbreakID expected to become EI number.
//
// 11. VACCINE DIMENSION: Vaccine + DiseaseVaccine added so a disease can list its
//     associated vaccines (Disease Maintenance wireframe). Supersedes the simple
//     InfectiousDisease.vaccinePreventable flag; align codes to the Provincial Vaccine
//     Depot / Connect Care Willow catalogue.
//
// 12. DIAGNOSTIC TEST DIMENSION: DiagnosticTest + DiseaseTest added for the 'Lab
//     Procedures' field; DiseaseTest.organismID supports organism-specific tests and
//     ties to LineListPerson.specimenResult.
//
// 13. STRUCTURED CASE DEFINITIONS: DiseaseCaseDefinitionRule replaces free-text
//     case definitions with per-tier (Confirmed/Probable) rules - name, condition,
//     AND/OR logic, effective dating - matching the Episode Conditions rule builders.
//
// 14. SETTING THRESHOLDS: OutbreakDefinition gains minConfirmedCaseCount,
//     minProbableCaseCount, absenteeismThresholdPct and closureCriteriaText so
//     declaration/closure thresholds (e.g., school absenteeism %, congregate-care
//     case counts) are held per disease + setting + type.
//
// 15. APPLICATION USER & ACCESS MODEL (Section 14): two-layer RBAC + ABAC, separate
//     from the Section 3 stakeholder Person/Role/PersonRole tables. AppUser carries
//     EXACTLY ONE FunctionalRole (single FK, not a junction - enforces the "one role"
//     rule); Team/Zone/DiseaseGroup are multi-valued ABAC junctions that scope data
//     without changing the role; ProfessionalDesignation is display-only and grants no
//     function. DiseaseGroup.isPrivacyBoundary (HIV/STI) gates authorization + audit.
//     Removing the last UserTeam/UserZone suspends the user (isActive = false) rather
//     than granting all-data. AppUserHistory + versionStatus preserve access history.
//
// 16. CONTACT IDENTIFICATION (Section 15): ContactIdentification is a standalone,
//     promotable contact record keyed to an Outbreak (region) and/or an EpicAbstract
//     (source case), separate from LineListPerson (facility line list) and ContactAttempt
//     (attempt history, now optionally linked to a contact via contactIdentificationID).
//     It carries the Platinum demographics, exposure context (facility/room, flight,
//     break-in-contact date), the Investigation Status and Record Status enums, the
//     Registry-validated flag, and the returned Connect Care Episode ID. ContactGuardian
//     holds parent/guardian details for minors; Ethnicity is a new reference list;
//     DiseaseContactQuestion + ContactDiseaseQuestionResponse model disease-specific
//     contact questions (e.g., HIV shared needle Y/N). HIV/STI contact records inherit
//     the DiseaseGroup privacy boundary from Section 14.
//
// 17. CONTACT LINEAGE & LIFECYCLE (v2.4): A ContactIdentification may escalate into its
//     own Outbreak (ContactIdentification.escalatedToOutbreakID; Outbreak.originatingContactID
//     records the reverse) or be linked to other outbreaks grouped under a cluster
//     (Outbreak.clusterOutbreak). ContactOutbreakLink is the many-to-many that preserves a
//     contact's association to multiple outbreaks/clusters and the original outbreak
//     identifiers across merges and cluster reorganization. ContactInvestigationLifecycle
//     records the contact's status transitions and carries the EpicAbstract (Communicable
//     Disease Abstract) link once a CD episode is created, tying the contact's investigation
//     lifecycle to the case record.
//
// 18. DISEASE QUICK-ADD (v2.5): InfectiousDisease.isProvisional supports the Disease
//     Maintenance "Add Disease" minimum-viable quick-add (Disease Name + Reporting
//     Timeline only). The record is written Active so it is immediately usable in the
//     Disease lookup on Create Outbreak Investigation, but isProvisional = true flags it
//     as incomplete until a steward completes ICD-10-CA, lab procedures, symptoms,
//     vaccines, outbreak definitions and the Confirmed/Probable episode conditions. This
//     is the dictionary-steward equivalent of the investigator provisional add tracked in
//     UserMaintenanceActivity. Status remains versioned (no destructive overwrite).
//
// 19. PHI EXPORT / DISCLOSURE AUDIT (v2.5): DisclosureExportLog (Section 12) records
//     read/export/disclosure events that AuditLog does not - it captures only
//     INSERT/UPDATE/DELETE mutations with a before/after value pair. Driven by the
//     Contact Identification "Export List" action (CSV/Excel export of contact PHI), it
//     logs who exported, when, the source screen/outbreak, disease group, format, the
//     active filter/sort scope, the row count and the stated purpose. privacyBoundaryCrossed
//     marks exports that include HIV/STI rows, which require steward authorization under the
//     Section 14 DiseaseGroup privacy boundary. Reusable by any future PHI-exporting screen.
//
// 20. FACILITY QUESTIONNAIRE SUBMISSION (Section 16, v2.6): a facility submission is still
//     persisted as a FacilityLineList (+ LineListPerson rows, Section 5) or a
//     FacilityOutbreakAggregateReport snapshot (Section 8); Section 16 adds the wrapper the
//     Submit Facility Questionnaire screen needs. FacilitySubmissionReceipt issues a dated,
//     human-readable acknowledgement per reporting period and carries isNoUpdates so a
//     "no change" report is recorded as intentional rather than missed; it points to whichever
//     of lineListID / aggregateReportID the submission produced. SubmissionValidation +
//     SubmissionValidationIssue store the Validate gate's outcome (BR 5.1-5.6) - one header per
//     Validate/Save action with one issue row per rule hit, severity Error/Warning, and an
//     isAcknowledged flag so warnings can be cleared to allow Save. SubmissionFileUpload stages
//     an uploaded Excel/PDF (storageRef, ingestionStatus, mappingReport) before its rows are
//     committed, then records resultingLineListID / resultingAggregateReportID once ingested
//     (ESC 6.2). submittedBy is null for the authentication-free operator path;
//     FacilitySubmissionReceipt.submitterToken holds the tokenised, outbreak-scoped identity -
//     the open access question for that path. All mutations remain audited via AuditLog;
//     correction rationale continues to live in AuditLog (no rationale column added).
//
// ============================================================================
