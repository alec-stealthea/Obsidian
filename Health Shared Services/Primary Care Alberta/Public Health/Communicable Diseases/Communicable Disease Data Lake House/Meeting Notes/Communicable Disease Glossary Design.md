This was a meeting to review the approach taken to create the first draft of the [[Communicable Disease Glossary Design]].  The meeting agenda was as follows:

**Purpose** – _Why is this meeting necessary?_ Now that We have approval to build out the Communicable Disease  glossary, I was hoping we could review my proposed design and a candidate set of terms, tags and metadata that I created with the support of my trusty LLM.

**Process** – _How will the meeting progress?_

- Confirm the progress of getting the glossary created in Atlan
- Review the proposed glossary design
- Review the two .csv files and see if they will need further review

**Product –** _At the end of this meeting we will_…  Determine the actions to plan the next bits of work.

**Participants** - 
- Juliane Muller - HSS IT Business Analyst
- Anmmd Kamruzzaaman (aka Zamman) - Lead for PCA - Public Health Surveillance and Informatics
- Maksud Ahamad - 
- Zakira Mohammed - Acting manager for HSS IT Public Health IT resources
- Christine Couturier - Zamman's boss who was on vacation. 

The following notes were transcribed from the meeting as follows, "# Communicable Disease Glossary Design

Mon, 29 Jun 26

### Atlan Glossary Status

- Glossary not yet created in Atlan; Christine has requested it from the DNA team
    - Darren and Rohan manage Atlan on the DNA side
    - No population visible yet under Public Health in the existing glossary structure
- Existing glossaries (Analytics, Corporate Services, HIM) were imported but not actively maintained
- Assisted Living Alberta glossary was started but stalled due to internal politics

### Proposed Glossary Design

- Two-phase import proposed; order matters:
    1. First CSV: category hierarchy with definitions and tags
    2. Second CSV: disease-level terms with linkages (depends on first import’s metadata)
- ~105 terms total; not a large glossary
- Category structure: Population Public Health (top) > Communicable Diseases > 7 sub-categories
- Terms, tags, and associated metadata allow explicit linking to data assets in Atlan
- LLM used to generate candidate definitions from 107 disease guidelines, procedures, and the Public Health Act
    - Sources documented in the linked design doc
    - Human review and approval required before publishing; AI suggestions welcome but not authoritative

### Glossary vs. Data Definitions

- Glossary is a human-readable dictionary (e.g., “what is a confirmed case?”), not a data specification
- Data asset specifications (views, ERDs, SQL samples) are a separate but related workstream
- The two connect: glossary terms get tagged onto published data assets in Atlan
- TB is the priority pilot: need to support both current PHAC reporting and the future redesigned TB episode structure

### Data Asset and Lineage Vision

- Bronze assets: raw views of flow sheets/smart forms published in Atlan with full field specifications
- Analytics team applies quality checks and produces silver/gold assets on top
- Atlan then provides automatic data lineage: shows which bronze assets feed a gold product (e.g., PHAC annual report)
- When a source system changes, lineage reveals downstream impact
- Current gap: only production Snowflake is replicated; no test environment replication yet
    - Conversation underway with DNA team to replicate test environment
    - Until resolved, analytics team has no advance warning of configuration changes going to prod
- Manual change notification agreed as interim approach for now

### TB Flow Sheet in Atlan

- Team currently taking Atlan training and beginning to build TB flow sheet entries
- Views not yet started; pending decision on whether to create views in Clarity replica or Snowflake
    - Prior discussion between teams (including Angelie) on this; needs follow-up
- TB flow sheet redesign underway (CDS project); question of whether to document current prod version, future version, or both
    - Alec’s position: must document current prod version regardless; reporting will need both old and new
- Version control approach for build object changes not yet resolved; flagged as a key open question

### Next Steps

- **Share access to the CSV files with the team** (Alec)
    - Team flagged they don't have access to the CSV files created for the glossary.
- **Review proposed glossary design and candidate terms**
    - Team to review Alec's design doc and two CSV files this week; connect with subject matter experts to verify definitions.
- **Follow up once Christine is back from vacation**
    - Touch base to confirm glossary has been created in Atlan by Darren and Rohan, and align on next steps.
- **Get at least one TB flow sheet (currently in prod) into Atlan** (Zakira)
    - Pilot entry to learn the process before scaling; use the existing production flow sheet as the starting point.
