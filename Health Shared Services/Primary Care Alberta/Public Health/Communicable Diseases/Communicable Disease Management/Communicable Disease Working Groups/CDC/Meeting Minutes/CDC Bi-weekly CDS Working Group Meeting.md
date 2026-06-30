# CDC Biweekly CDS Working Group Meeting

Tue, 23 Jun 26

### Context and Meeting Purpose

- CDC CDS Working Group biweekly session, June 23, 2026
- Focus: [[Communicable Disease Maintenance Screen Specifications]] specifications for OMRA
- Alec presented a higher-fidelity prototype of proposed disease data model
- Previous sessions covered users and facilities; this session moves to disease as a data entity

### Proposed Disease Maintenance Module

- Goal: make disease guidelines machine-readable and maintainable as discrete data within the outbreak application
- Data would live in the outbreak app and replicate to Snowflake for analytics
- LLM used to pre-populate a spreadsheet from all 100+ published disease guidelines
    - Human validation still required, but significantly reduces manual effort
    - Accuracy would improve if source documents were text-based rather than PDFs
- Fields include: confirmed/probable case definitions, outbreak thresholds, care setting rules, ICD-10 codes, treatments, vaccinations
    - Some fields (e.g. disease-to-symptom mapping, lab procedure links) may be sourced directly from Epic rather than maintained manually

### Key Concerns Raised

- Duplication risk: case definitions already live in Notifiable Disease Guidelines (NDGs) and DSOPs, which contain far more than just case definitions
    - Concern that maintaining a parallel copy introduces sync errors and translation drift
    - Consensus: NDGs and DSOPs remain the authoritative source; this module captures only the discrete fields needed for operations and analytics
- Maintenance burden: significant upfront effort to input notifiable disease and DSOP data; ongoing maintenance needed whenever source documents change
- Scope uncertainty: unclear whether this solves a real operational problem (e.g. missed outbreaks) vs. adding another resource to maintain
    - Reporting timelines and task/target tracking flagged as genuinely useful functionality
    - Case definitions in-system seen as lower priority unless fully replacing source docs

### Surveillance and Analytics Logic

- Vision: system scans for patterns (e.g. two confirmed/probable cases meeting outbreak threshold) and alerts investigators, without requiring a manual outbreak investigation to be opened first
    - Outbreak thresholds are often low (sometimes a single case), so automated flagging is feasible
    - Confirmed/probable definitions and thresholds vary by care setting, hence the need for discrete structured data
- EpiLink discussion: epi-linking still requires investigator judgment and human confirmation
    - System can surface candidate clusters, but investigator makes the final call to open an outbreak investigation
    - Once opened, outbreak ID links back to Connect Care episodes
- Facility reporting: two scenarios to work through separately
    - Aggregate reporting (facility reports when outbreak threshold met)
    - Line-list reporting (individual-level data)
- Analytics as a safety net, not a replacement for investigator decision-making

### Next Steps and Upcoming Sessions

- Disease maintenance module stays in the prototype for now; value to be validated as actual workflow screens are built out
- Next sessions will shift from back-end foundational work to actual user-facing screens: search, create outbreak, manage tasks, facility questionnaires
- Next meeting: July 7 (agenda sent three days in advance, minutes circulated for review beforehand)

### Action Items

- **Validate LLM-populated disease spreadsheet against source documents**
    - Spreadsheet was auto-generated from published guidelines; human review needed before data is used in the prototype.
- **Review DSOPs to understand scope beyond case definitions** (Alec)
    - Clarify which DSOP fields are relevant for discrete capture vs. what should remain linked source documents only.
- **Consult analytics team on automated outbreak detection logic** (Alec)
    - Define how the system would scan for patterns and trigger alerts without requiring an open investigation first.

