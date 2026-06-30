### Agenda and Context

- Bi-weekly SHE Working Group, June 16, 2026
- Agenda items:
    - Review minutes from June 2, 2026 SHE WG
    - ConnectCare user roles presentation (Jackie Armstrong)
    - User maintenance function specifications for OMRA (Alec)
- No additional agenda items raised; no outstanding action items from facilities discussion

### ConnectCare User Roles (Current State)

- Presenter: Jackie Armstrong (senior trainer, Population Public Health and Healthy Planet)
- Three current roles for the SHE program:
    - Manager: delete/correct staff notes, in-basket management (add/remove staff from pools), case management and Compass Rose tools
    - Public Health Inspector (PHI): full SHE documentation, sign and place orders, flow sheets and notes, case management and targets
    - Communicable Disease Control Clerk: place orders (requires second sign/approval), flow sheets, notes, case management
- Clerk role covers both SHE admin and CDC admin access, as staff often work across both
- PHI role was built from the ground up for ConnectCare at launch
- Clerks can create encounters in a patient’s chart (confirmed in Q&A)
- PHI and investigator used interchangeably; team self-identifies as PHIs but legally are Executive Officers under the Public Health Act
- PowerPoint to be attached to meeting minutes

### Proposed OMRA Role Framework

- Alec presented a straw-model proposal based on CDOM roles, with renamed and added roles
- Proposed roles:
    - Intake: covers PPHST nurses, SHE admin, call center staff receiving referrals; replaces “basic user”
    - Investigator: equivalent to PHI in ConnectCare
    - Team Lead: investigator-plus, for PHI-3s pulling reports and providing oversight; replaces “manager” for non-managers
    - Team Manager: team lead functions plus caseload assignment and case reassignment
    - Department Manager: team manager plus data management functions
    - Read Only: for ministry viewers; MOHs expected here
- “Basic user” label rejected; role names should reflect actual job functions
- Ministry/AH reorganization noted: terminology must reflect “Safe and Healthy Environments” as the new ministry name, not legacy SHE framing (Alec to fix)
- Capturing professional designation (RN, LPN, NP, PHI, EO) as an attribute of the person, separate from their system role, seen as useful for auditing and report clarity

### Key Discussions and Decisions

- IPC (facility-based infection prevention and control) tabled: currently IPC sends data to SHE for manual entry into CDOM; potential future path is automated data feed from Epic rather than direct OMRA access
- Community facility operators also tabled: would require direct entry or Excel submission; needs separate conversation
- Disease-level groupings (e.g. “CD outbreak,” “enteric,” “non-enteric”) flagged as likely attributes of the outbreak record, not access control variables; categories to be reviewed for relevance when migrating
- Access/filtering model: “trust but verify” approach preferred, mirroring Epic
    - Default view filtered to own team’s outbreaks
    - SHE and CDC can see each other’s outbreaks for awareness of co-occurring respiratory/enteric events
    - No cross-visibility needed into TB, STI, or HIV outbreaks
    - All access logged for audit
- Student role: proposed by Alec but pushed back on by Dave Brown; no student role exists in ConnectCare; consensus to table unless CDC or nursing side has a clear need
    - MOH residents have an MD but are not formally MOHs; to be treated as MOH-level for access purposes, pending confirmation
- CDC branch (ministry) needs a create/edit role, not just read-only, to support audit edits and potential exposure record creation
- Analytics/reporting: PHSI will have access via the Snowflake analytics environment; in-system reporting available for standard outbreak reports; report-builder role likely an IT/database admin function

### Next Steps

- Adjust role terminology to reflect ministry reorganization (Alec)
- Circle back with Phi offline on facility privacy/sensitivity flagging process (Alec)
- Send EFIS examples in next review package before marking facilities section complete (Alec)
- Confirm MOH resident access treatment and student role need with CDC and nursing leads
- Next topic in two weeks: disease data management (a large topic; format TBD)

---

Chat with meeting transcript: [https://notes.granola.ai/t/68261178-d295-4977-b8f6-621bb2445d64-00demib2](https://notes.granola.ai/t/68261178-d295-4977-b8f6-621bb2445d64-00demib2)