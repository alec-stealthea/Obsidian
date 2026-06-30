# TB CDS Bi-weekly Working Group Meeting

Fri, 12 Jun 26

### Data Submission Elements Review (Abstract Specs)

- Jody walked through updated Excel spreadsheet mapping current vs. future state data elements in Epic
- “In scope for abstract” elements filtered by “yes” will guide build specs
- Registered case number: open question deferred to next meeting
    - Current state: sequential number based on PHAC-suggested formatting
    - IT proposal: use auto-generated Epi abstract ID instead
    - Megan: for all other PHAC reporting, CDRS disease case sequence number is used, no pre-populated format required; question submitted to PHAC
    - Working group to consider whether PHAC format is necessary at all

### Compass Rose Scope Clarification

- Compass Rose is the case management tool; review triggered by TB flow sheet redesign
- Program submitted homework broader than the flow sheet redesign scope
- Confirmed scope for this project: changes directly caused by flow sheet redesign only
    - Continuous improvement items are valid but out of scope for now
- Original meeting ask: cascade of care targets in case management, LTBI treatment status (accepted/refused), and which support and service types these attach to

### Compass Rose Build: What’s Needed

- Analysis tab in spreadsheet = confirmed minimum build list
- New support and service type: surveillance (no targets needed, but checklist task template to auto-populate)
- New service types (rows 93-101 in targets tab): TB screening, immigration, urgent, emergent, semi-urgent, enhanced LTBI, and others
    - Currently missing TB screening as a service type, forcing workarounds that skew data
    - Cascade of care targets (offered LTBI treatment, patient accepts LTBI treatment) must attach to screening and immigration service types, not LTBI
    - If patient refuses, no LTBI service type is added, so capture must happen at screening level
- Two new targets confirmed: rows 67-68 (offered LTBI treatment, patient accepts LTBI treatment)
    - Due date: 60 days from episode enrollment date
    - Known issue: enrollment date is often backdated; system currently won’t allow target due dates before enrollment date, skewing timestamps
- Target templates also needed (grouping of related targets), not just individual targets
- Checklist tasks: tested and resulted to attach to new screening service type

### Contact Service Types and Cascade of Care

- Open question: whether cascade of care targets need to be added to contact service types
- Contact flow sheet data moving to abstract; concern about losing discrete cascade of care data (offered, accepted, refused treatment) for contacts
- Abstract stores data per element (like a flow sheet) but pulling cascade across multiple patients requires a report, not a populated field
- Current contact flow sheet requires re-entry of all elements each visit to track cascade, which is complex
- Decision deferred: need to confirm what can be pulled from the abstract before deciding whether to add targets to contact service types

### Next Steps

- Offline meeting between Compass Rose team (Anne Marie, Kyung Min Kim) and Jody to sequence build work and answer outstanding questions (Irene to arrange)
- Compass Rose team to start with new service types (rows 93-101), then targets and checklist tasks
- Working group to review registered case number question and come prepared to decide at next meeting
- Program team to revisit contact cascade of care question once abstract build is clearer (Manisha/Anne’s team)
- Summary email to be sent to broader group

---

Chat with meeting transcript: [https://notes.granola.ai/t/e564e7f5-711d-4d9c-99ee-db44f93ac730-00demib2](https://notes.granola.ai/t/e564e7f5-711d-4d9c-99ee-db44f93ac730-00demib2)