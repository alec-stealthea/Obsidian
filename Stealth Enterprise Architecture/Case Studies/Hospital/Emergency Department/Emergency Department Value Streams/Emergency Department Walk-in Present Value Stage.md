---
type: Case Study
title: "Emergency Department Walk-in Present Value Stage"
description: "If you've followed along with defining a Hospital Enterprise Domain Model and then going to the Emergency Department Domain level where there's an Emergency Department Measures, a Emergency Departm..."
timestamp: 2026-06-26T19:19:05Z
feature: Emergency Department Walk-in Present Value Stage.png
---
If you've followed along with defining a [[Hospital Enterprise Domain Model]] and then going to the Emergency Department Domain level where there's an [[Emergency Department Measures]], a [[Emergency Department Domain Value Stream Network]] and then the [[Emergency Room Walk-in Value Stream - Business Capability View.png]], we're now finally at the part where the rubber hits the road.

The Emergency Room Walk-in Value Stream represents what happens when a person arrives at an Emergency Department seeking care. This is a classic front-office value stream — it's triggered by a stakeholder (the Emergency Room Patient) and delivers measurable value (the patient receives appropriate treatment in a timely manner). But here's where it gets interesting: going to the next level of detail at the Present at ED Value Stage digs into the business capability instances that make the stage actually work.
![[Emergency Department Walk-in Present Value Stage.png]]## Building on the Foundation

## Reading the Value Stream Stage Business Capability Instance Model

The model follows the standard value stream conventions you'll recognize from the [[Stealth Enterprise Architecture ArchiMate Metamodel|metamodel]]:
The triggering event sits at the top left: **Person arrives at Emergency Department**. The outcome (what we're trying to achieve) anchors the bottom right: **Patient receives appropriate treatment in timely manner**. Between those bookends, four value stream stages move the patient through the present-state process.

What makes this model distinctive is the level of detail within each stage. Rather than simply listing which abstract business capabilities serve each stage, we're showing **business capability instances** — the specific implementations of those capabilities within this Emergency Department context. This is where architecture meets operations, where the "what we need to be able to do" transforms into "how we actually do it."
## Walking Through the Stages

### Identity Management

The journey begins with identity management — perhaps the least glamorous but most critical capability in healthcare. The Admission Clerk performs two key activities: verifying patient online and physical identities (because your government ID card and your health system record need to match). The Clinical Information System provides the Patient Identification application function, which in turn serves the Enterprise Master Patient Index (EMPI).

Why does this matter? In healthcare, getting the wrong patient record can be catastrophic. The EMPI is the authoritative source for patient identity across the enterprise — and yes, I deliberately avoided calling it a certain phrase involving "truth" that the style guide forbids.

Notice the information flow: patient identity verification **flows to** the next stage's billing system. This isn't a casual data exchange — it's the foundation for everything that follows.

### Accounts Payable

Here's a stage that might surprise people outside healthcare: before clinical assessment happens, there's an insurance check. The Admission Clerk checks patient payment options, and the Hospital Billing function (within the Clinical Information System) captures Payment Card and Insurance ID data objects. An external Insurance Application validates coverage.

In many healthcare contexts — particularly US-based systems — this stage gates what happens next. It's uncomfortable to admit, but the architecture reflects reality: payment verification happens early in the value stream.

### Clinical Assessment

Now we get to clinical substance. The Admission Clerk completes a registration checklist while the Clinical Information System handles Clinical Documentation. The ED Assessment captures the Chief Complaint — in healthcare parlance, the reason the patient sought care.

The outcome of this stage is captured in that small yellow box at the bottom: **ED Staff knows person's concern**. This incremental value item reflects the reality that value doesn't appear all at once at the end of a value stream. Each stage creates and delivers incremental value — and knowing what's wrong with a patient is genuinely valuable, even if treatment hasn't started yet.

### Waitlist Management

The final stage manages the transition from assessed to treated. The Admission Clerk executes a Room Patient process, the Clinical Information System handles Registration and the Assign to room function, and information flows to a Waitlist (shown in that distinctive green colour indicating it's a business object that crosses application boundaries) which feeds the ED Waiting Room Display.

This is where the present state model hints at improvement opportunities. Waitlist management is often a pain point in emergency departments — and the architecture shows exactly where the bottlenecks live.
## What This Model Enables

This present-state model serves several practical purposes:

- **Analysis foundation.** Like the Acquire Retail Product Value Stream in the [[TOGAF Series Guide - Business Capability Planning|TOGAF Business Capability Planning Guide]], this model enables heat-mapping and gap analysis. Apply your red-yellow-green assessments to each business capability instance to identify where improvements are needed.
- **Conversation starter.** Show this to ED operations staff and they'll either nod knowingly or immediately correct you. Either reaction is valuable intelligence.
- **Future state planning.** Understanding present state at this level of detail makes target state design concrete rather than abstract.