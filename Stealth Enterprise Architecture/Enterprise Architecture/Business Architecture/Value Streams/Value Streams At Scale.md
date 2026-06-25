---
type: Architecture Concept
title: Value Streams At Scale
description: How to assess value streams beyond a single stakeholder journey — operational scaling factors (coverage, network, capacity, demand, competition) and the economic value that emerges only at population scale.
tags:
  - value-streams
  - business-architecture
  - value-streams-at-scale
  - health-economics
  - unit-economics
timestamp: 2026-06-24T00:00:00Z
---

Performing a Value Stream analysis for one stakeholder's journey is useful, but misses the complexity of the value streams at scale. For illustration, let's take a metro area with a population of a million people.  There's four major hospitals in each quadrant of the city combined with 'urban rural' hospitals in the suburbs of the greater metropolitan area. This scenario will look at the ability to scale for the overall capacity of the 
## Factors to consider for Assessing Value Streams at Scale
### Geographical Coverage
A physical location's coverage area is usually defined geographically by factors like population density, existing defined boundaries like postal code, or for mobile units like ambulances - their ability to travel to meet service level agreements for response time. Static boundaries may be artificial in major metro areas. While most people will go to the closest location available, other information if published like Emergency Room wait times may cause people to go significantly out of their way.
### Value Stream Network
There's three ways that a Value Stream's Network can affect the overall performance of a Value Stream at scale:
1. **Value Stream Trigger** - There may be an upstream value stream that can reduce or increase a value stream being triggered. Some healthcare examples:
	1. Lack of primary care in a geography increases EMS and Emergency Department calls that might otherwise be avoided.
	2. Adherence to vaccine recommendations reduce the incidence of more costly care interventions.
2. **Value Stream Wait/Waste** - As we have seen in [[Making Value Streams Leaner]], there are the aspects of the Value Stream that are within the control of the business executing them and then there's wait on Value Streams outside that may not have the same level of control. Some more examples in healthcare:
	1. A primary care physician needs a lab test performed by the patient to be able to complete an assessment.  That result is dependant on the community lab wait time and the patient booking and attending the appointment.
	2. Across healthcare there's examples where there needs to be consults with other medical professionals, insurance organizations, or even regulatory compliance that adds wait and waist to one or more value stages.
3. **Value Stream Blockage** - While there can be wait and waste within a value stream, there unfortunately is the same at the end of a value stream where it is unable to complete for reasons beyond their control. For example:
	1. A crowded emergency room is ready to refer a patient for an inpatient stay or procedure, but the hospital beds are full. they are blocked then at the end of transition due to capacity constraints.
### Value Stream Capacity and Throughput
For most value streams there are ways that capacity and throughput can be affected.
- **Resource constraints** - There are so many different resource constraints that can affect a value stream.
	- ***People*** - 
- **Stakeholder attributes** - In healthcare, the patient's themselves and either the severity of the condition they are presenting for or the extent of treatment required will end up affecting the length of time and the amount of resources required to treat the patient. This ends up effecting overall capacity and/or throughput.
### Value Stream Time-Based Demand
As a planning tool for providing enough resources, there is historical demand that varies by time of day, day of week, major holidays, or based on the weather to name a few.
### Value Stream Competition
While healthcare in Canada is essentially a monopoly, in the United States there can be quite intense competition within a metro area for things like Emergency Services.

## Economic Value at Scale

The factors above scale the *operational* dimensions of a value stream — throughput, capacity, demand, network effects. They do not, on their own, scale the *economic* value the value stream generates. Doing that requires being precise about what "value" means, because there are two distinct constructs hiding under the one word.

**Per-journey value** is what the [[Value Stream Motivation Model]] already captures: a measure of value at each stage from the perspective of the stakeholder receiving the value — one consumer's journey. This is the micro unit, and it is what a single value stream model can see.

**Value at scale is not the per-journey value multiplied by volume.** This is the key evolution. For many value streams — vaccination being the clearest example — value is *non-additive*. Because of herd immunity, the aggregate population value exceeds the sum of the individual journeys: there is a positive externality, and often a *threshold* effect where value jumps non-linearly once coverage crosses the herd-protection point. A per-consumer value stream structurally cannot see this; the emergent, network-level value only appears at the population aggregate. Any assessment of value streams at scale therefore has to model aggregate value as its own thing, not as a scaled-up single journey.

### The unit-economics equation

Bringing the cost and value sides together, the net economic value generated by a value stream at scale can be framed per [[Business Capability]] instance as:

> **Net system value = Σ (volume per delivery pathway × per-unit value, including externalities) − failure-demand cost − fully-loaded delivery cost**

Three different feeds populate this equation, each with an established discipline behind it:

- **Volumes and failure demand** come from value-stream-at-scale analysis itself — the throughput, demand, and exception/variant pathways (e.g. recalls, non-effective doses, adverse events) discussed above and in [[Making Value Streams Leaner]].
- **Per-unit value, including the externality**, comes from health economics — cost-effectiveness analysis (CEA) and cost-benefit analysis, with cost-of-illness-avoided and QALYs/DALYs as units. This is the discipline that owns the herd-immunity and broad-versus-narrow value question.
- **Fully-loaded delivery cost** comes from the costing disciplines (Technology Business Management, activity-based / value stream costing), of which FinOps supplies only the technology-tools layer of the capability-instance cost stack.

### Why the externality matters in practice

Ignoring the non-additive externality materially understates value. In one pneumococcal vaccination study, folding herd-protection into the cost-effectiveness analysis dropped cost-per-QALY from roughly $530,000 to roughly $95,000 — an almost five-fold swing — and across a body of childhood-vaccination CEAs, including herd protection moved interventions from above to below the cost-effectiveness threshold in about 45% of cases.[^cea] This is the quantitative case for modelling value at the population scale rather than per journey.

### Further reading

- [Impact of vaccine herd-protection effects in cost-effectiveness analyses](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5332092/) — source of the pneumococcal example above
- [Capturing the value of vaccination within HTA and health economics — conceptual framework](https://www.sciencedirect.com/science/article/pii/S0264410X2200490X) — broad vs. narrow value
- [Methods for Health Economic Evaluation of Vaccines — European consensus framework](https://pmc.ncbi.nlm.nih.gov/articles/PMC4766233/)
- [Economic evaluations of immunization programs as a tool for policymakers (BMC)](https://link.springer.com/article/10.1186/s12913-023-10071-z)

[^cea]: Figures from the herd-protection cost-effectiveness comparison cited under Further reading. Treat as illustrative of the *direction and magnitude* of the externality effect rather than as transferable point estimates.