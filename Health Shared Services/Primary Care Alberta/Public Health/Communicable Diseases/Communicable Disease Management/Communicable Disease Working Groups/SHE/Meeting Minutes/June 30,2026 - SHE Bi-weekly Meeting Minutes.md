At this week's meeting we reviewed outstanding actions from the last meeting which vovered the [[User Maintenance Screen Specifications]].  This meeting was to review the [[Communicable Disease Maintenance Screen Specifications]] and the associated wireframe.

The following was transcribed from that meeting

Tue, 30 Jun 26

### User Roles and Permissions

- Role structure updated: Team Lead and Department Manager retained; Business System Manager removed
- Team leads requested ability to add and inactivate records (not delete; system uses inactivation with reason codes)
- Clarification: “delete” = inactivate with a reason (duplicate, etc.), not hard delete
- Open question: whether team lead privileges should vary by group (e.g., CDC STI vs. other zones)
    - If group-specific privileges needed, each must be documented separately rather than using generic role settings
- Five team leads in current structure; all requested inactivation/add rights

### Disease Library: Overview and Purpose

- LLM-assisted scan of all 110 notifiable diseases used to populate prototype data
    - Data is illustrative only; human review required before go-live
- Disease panel intended as a foundation layer, supporting:
    - Reporting timelines and SLA alerts
    - Links to authoritative source documents (not hosted internally)
    - Setting-specific outbreak thresholds
    - Future: symptoms, vaccination/treatment info, disease-specific questionnaire flags
- ICD-10 codes included for reporting; likely hidden from main view

### Outbreak Definitions: Concerns and Feedback

- Current outbreak definitions in the Excel sheet flagged as too rigid
    - Example: “two or more epi-linked cases” doesn’t universally apply (e.g., norovirus at a work camp requires ~10% attack rate)
    - MOH often dictates when outbreaks open and close on a case-by-case basis
- Consensus: keep definitions as a guiding tool, not a hard rule
    - Add a disclaimer (e.g., “majority of situations”)
    - SHE team to review and provide preferred outbreak definitions per organism they manage
- Setting-specific thresholds already built into the design

### Reference Links and Resource Fields

- Suggestion: single link to outbreak guidance management documents for GVP panel organisms, rather than listing each setting type separately
    - Avoids duplication; guidelines already published and updated periodically
- Agreed to add a generic “reference document” field: free-form URL + name, usable for any relevant resource
    - Scope: external/public-facing links only (e.g., [ahs.ca/outbreaks](http://ahs.ca/outbreaks)), not internal SharePoint docs
- Note added: not every disease needs every link; avoid clutter, especially for routine GI outbreaks of unknown cause
- Suggestion to add which group (CDC vs. SHE) is responsible for each disease; a listing already exists and will be incorporated

### Next Steps and Upcoming Sessions

- SHE team to review disease list and provide correct outbreak definitions and criteria per organism
- Next two meetings will shift from master data to operational screens:
    1. Search
    2. Create outbreak
- These sessions will cover the core mechanics of managing and maintaining outbreaks

### Action Items

- **Remove Business System Manager from role options in wireframes**
    - Update prototype to reflect final role structure: Team Lead and Department Manager only.
- **Add disease-to-responsible-group mapping to the disease panel**
    - A listing of which diseases belong to CDC vs. SHE already exists and can be incorporated.
- **SHE team to review disease list and supply preferred outbreak definitions per organism**
    - Current Excel data is inaccurate; definitions should include setting-specific criteria and a disclaimer for case-by-case MOH decisions.
- **Add generic reference document field to disease panel prototype**
    - Free-form URL and name; supports external links without hosting documents internally.
