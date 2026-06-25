---
title: Feb 18, 2026 - VWM Weekly Project Team Meeting
date: 2026-02-18
time: 10:34
participants:
  - 
tags:
  - meeting
---

**Date:** February 18, 2026 at 10:34

## Participants

- 

# Meeting Overview & Agenda

- The VWM (Vacancy Waitlist Management) Project Team Meeting was called to review Phase 1 progress, discuss project plan updates, and cover progress reporting for the current phase.
    
- An upcoming Phase 2 messaging discussion (EpicCare messaging) was acknowledged and noted as covered separately in a meeting later that afternoon involving Robert, Jess, and Alec.
    
- Steph was asked to walk through the project plan to flag items coming due or overdue, and the group was invited to raise any additional topics needing discussion before the agenda moved forward.

# Phase 1 Go-Live Status & Issue Resolution

- Overall, the first couple of days post-go-live were described as relatively smooth with minor hiccups; one issue identified that morning had already been resolved and moved to production, with monitoring ongoing.
    
- The PLY environment issue was attributed to a missed step following a data refresh; it was confirmed to be working in the reference environment and expected to be resolved by the following day.
    
- OPS expressed frustration at the director level about not having changes available in the playground environment prior to go-live, which was flagged as a concern likely to be raised at the CSI level and something the team needs to address proactively going forward.
    

# Waitlist Report & Legacy Data Conversion Strategy

- Placement coordinators were confused because the waitlist assessment report name changed in the sidebar, and they were unable to locate the new version for clients already on the waitlist, not realizing these older records had not been automatically converted to the new report format.
    
- The agreed-upon approach is that legacy reports will remain as-is unless a clinical update is required — only when case managers need to make changes will they be expected to convert to the new version; OPS will not support mass conversion of old records absent clinical changes.
    
- It was noted that the readiness materials addressed what to do just prior to and on the day of go-live but did not clearly spell out the post-launch process for handling legacy records; the team agreed this needs to be explicitly communicated to placement coordinators and case managers to avoid ongoing confusion.
    

# Playground Environment & Training Readiness Concerns

- A key lesson learned from Phase 1 is that while some items were placed in the playground environment in advance, the inpatient workspace specifically was not available in time, which directly disrupted staff training sessions before go-live.
    
- A request was made to postpone or reschedule the impacted training to allow staff adequate time to practice in the playground environment, but this request was denied — the team noted this compounded post-launch issues by creating both technical and workflow-related problems simultaneously.
    
- Steph was asked to add a standing action item to the project plan for all future phases: **the playground environment must be updated further in advance** of any go-live or training event, to prevent recurrence of this issue.
    

# Episode Migration Metrics & Workflow Adoption

- The overall episode migration pass rate was 80%, reflecting the operational reality of how many records were successfully converted end-to-end; the technical import success rate was actually 93%, with the gap accounted for by records pre-filtered out due to missing data such as no assigned case manager.
    
- Robert confirmed that 39 new waitlist episodes had been added since go-live (up from approximately 1,975 at launch to 2,014 as of the morning report), which was interpreted as a positive sign that clinicians understood the new workflow and were actively using it within the first 24 hours.
    
- The team discussed adding a column to the existing vacancy waitlist management report to track whether a placement episode exists for a given record, which would serve as an ongoing workflow adoption monitoring tool; Robert confirmed the column spec was already drafted that morning, with the notes activity change to follow (requiring a CCCR change management submission). A deadline of February 27th was set for the column addition.
    

# Project Plan Review – Phase 1 & Phase 2 Updates

- Phase 1 was confirmed as on track overall, with conversion planning due by the 27th; outstanding items include the notes and transition coordinator workspace for inpatient transition coordinators (Robert still investigating) and the strata data mapping work needed for the March 17th strata conversion.
    
- For the strata conversion, Robert indicated the import process logic is understood, but data mapping between strata records and patient MRNs still needs to be completed; the spec document already exists and needs to be sent to Gavin's team for prioritization, with Robert committing to get calendar time scheduled this week.
    
- Phase 2 user story and requirements approval was flagged as incomplete; Alec noted that scope for Phase 2 was not fully confirmed, particularly given developments that occurred while he was on vacation that were difficult to reconstruct from documentation alone — the afternoon scoping meeting was identified as a critical input before any Phase 2 build timeline could be confirmed.
    

# Action Items & Next Steps

- **Steph** to add a standing project plan item across all future phases requiring the playground environment to be updated well in advance of go-live and training events.
    
- **Robert** to send the 80% and 93% migration metrics to Brandy for inclusion in the progress report; manual conversion tracking to be monitored as the team heads into March.
    
- **Steph** to set the reporting column addition (to track placement episode existence on the waitlist report) to a due date of **February 27th**; notes workspace change to follow via CCCR.
    
- **Brandy** to schedule a follow-up call tomorrow with **Alec, Brianne, and Robert (optional)** to align on Phase 2 scope and workflow direction following the afternoon's Phase 4 messaging meeting.
    
- A **lessons learned exercise** with the broader project team is planned for **April** to formally capture Phase 1 retrospective insights.