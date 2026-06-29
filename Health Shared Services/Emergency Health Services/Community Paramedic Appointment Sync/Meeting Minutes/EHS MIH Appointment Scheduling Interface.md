

Mon, 29 Jun 26

### Purpose and Context

- Long-overdue follow-up on the MIH Appointment Scheduling Interface
- Based on the [[Epic to Logis Appointment Sync Solution Concept Model]]
- Goal: determine art of the possible to inform an SBAR for steering committee prioritization

**Participants:**

- Logan Payne: HSS EHS IT Service Owner
- Kendyl Cooper: EHS Quality Assurance Analyst
- George Ma: HSS Integration Solution Architect
- Dana Dalhamo (noted, role TBC)

### Integration Approach and Workflow

- Referral order in ConnectCare (Epic) triggers the round trip
    - Order type: ambulatory referral to MIH
    - Accepted referral is the trigger to push data to Logis
- Transformation layer required between Epic and Logis Transfer Scheduling Broker interface
    - HL7 v2 vs. FHIR API decision deferred to George
    - Likely HL7 v2 scheduling message inbound (no FHIR API available to create appointments in Logis)
    - May be outgoing orders interface rather than referral notification: needs further analysis
- Patient identifier (PHN) must be accurate
    - If sourced from Epic, confidence is high
    - PHN lookup in Logis carries risk (painful precedent from ePCR project)
- Proposed round trip:
    1. Referral accepted in Epic, triggers send to Logis
    2. Logis coordinator completes missing scheduling parameters (ConnectCare can’t send everything)
    3. Logis sends booked appointment notification back to ConnectCare
    4. ConnectCare coordinator links the two records to close the loop
- Check-in/check-out driven entirely by Logis
    - Appointments can move in Epic until Logis status = “arrived,” then frozen
    - Logis checks in appointments the day ahead; SLAs in Logis can lock them down
    - Paramedic logs into Logis, picks up appointment, self-associates (no vehicle-level resource needed in Epic)
- Patient notifications
    - MyChart shows appointment date only, no time
    - Coordination center calls patient with time window based on Logis schedule
    - Automated notifications turned off
- Resources/vehicles: use a single department-level resource in Epic rather than individual trucks
    - Vehicles were built into Epic for launches 4 and 6 but later removed; agreed not to rebuild them

### Next Steps

- Alec to meet with George (week of July 6th) to confirm interface details
    - Determine appropriate interface type (referral notification vs. outgoing orders)
    - Review Logis interface spec and define minimum spec for what goes back and forth
- Alec to document full end-to-end workflow with all actors and roles (not just interface scope)
- Reconvene with broader group end of week of July 6th to review progress
- Ryan and primary contact staying attached but holding off on formal project/change management until ~August
- Once analysis complete, present to Logan and internal IT to confirm feasibility, then take to appropriate steering committee for prioritization

- **Meet with George to confirm interface details and minimum spec** (Alec)
    - Determine referral notification vs. outgoing orders interface; review Logis spec for what data travels each direction. Target: week of July 6th.
- **Document full end-to-end workflow with all actors and roles** (Alec)
    - Expand beyond interface scope to capture all stakeholders and process steps for SBAR and steering committee submission.
- **Schedule reconvene with broader group** (Alec)
    - Aim for end of week of July 6th to review findings before escalating for prioritization.

---

Chat with meeting transcript: [https://notes.granola.ai/t/78492b9d-3886-4813-b41e-3f6ab469ceb7-00demib2](https://notes.granola.ai/t/78492b9d-3886-4813-b41e-3f6ab469ceb7-00demib2)