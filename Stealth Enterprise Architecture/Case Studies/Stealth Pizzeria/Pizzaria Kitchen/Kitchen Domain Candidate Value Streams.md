---
type: Case Study
title: "Kitchen Domain — Candidate Value Streams"
description: "This document expands the Kitchen Domain within the Stealth Pizzeria Enterprise Domain Model by identifying candidate value streams beyond the existing modeled streams."
timestamp: 2026-06-26T19:19:05Z
---

# Kitchen Domain — Candidate Value Streams

## Context

This document expands the Kitchen Domain within the Stealth Pizzeria Enterprise Domain Model by identifying candidate value streams beyond the existing modeled streams. The intent is to surface where value is created, consumed, or transformed within the kitchen — and to set the stage for value-driven analytics by identifying measurable flows of work that connect kitchen activities to business outcomes.

This follows the approach outlined in *The Case for Value-Driven Analytics*: starting from value streams to discover what data matters, rather than starting from data and hoping to find value.

### Existing Value Streams (Already Modeled)

For reference, the following value streams are already captured in the Kitchen Domain:

- **Food Order Value Stream** — The end-to-end flow from order receipt through kitchen acknowledgment and routing
- **Order Preparation Value Stream** — The transformation of raw ingredients into completed menu items against a specific order
- **Order for Delivery Value Stream** — The handoff from kitchen completion through packaging and dispatch
- **Food Preparation Value Stream Network** — The broader network view connecting preparation activities across stations and dependencies

---

## Candidate Value Streams

The following candidate value streams represent flows of value creation within the Kitchen Domain that are not yet explicitly modeled. Each is described with its triggering event, value delivered, and the stakeholders it serves. These are candidates — meant to be validated, refined, or merged as deeper analysis proceeds.

---

### 1. Ingredient Procurement-to-Station Value Stream

**Trigger:** Ingredient demand signal (par level breach, prep list generation, or purchase order cycle)
**Value Delivered:** Right ingredient, right quantity, right station, right time
**Stakeholders:** Kitchen Manager, Line Cooks, Purchasing/Vendor Relations

This value stream traces the flow from recognizing an ingredient need through procurement, receiving, quality inspection, storage, and staging at the appropriate kitchen station. It bridges the gap between the Supply Chain Domain and the Kitchen Domain and is where waste, spoilage, and stockout risk are either managed or compounded.

**Why it matters for analytics:** Ingredient cost variance, spoilage rates, vendor lead time reliability, and par level accuracy are all measurable along this stream. Understanding this flow is foundational to food cost management.

**Key questions this stream surfaces:**
- What is the true cost-to-station for each ingredient, including waste?
- Where do bottlenecks occur between receiving and station readiness?
- How accurate are par levels relative to actual consumption patterns?

---

### 2. Recipe Standardization & Portioning Value Stream

**Trigger:** Menu item definition, menu change event, or quality deviation incident
**Value Delivered:** Consistent product quality and predictable food cost per item
**Stakeholders:** Head Chef, Kitchen Manager, Line Cooks, Finance

This stream covers the lifecycle of a recipe from creation through standardization, portioning specification, costing, training, and ongoing compliance monitoring. It is the Kitchen Domain's primary mechanism for ensuring that what the customer receives matches what the business promised — and what the P&L assumed.

**Why it matters for analytics:** Portion drift is one of the most common and invisible sources of margin erosion in food service. This value stream makes that drift measurable and traceable to specific stations, shifts, or individuals.

**Key questions this stream surfaces:**
- What is the actual vs. standard portion variance by item, station, and shift?
- How long does it take for a recipe change to reach full compliance across the line?
- Which recipes have the highest variability in execution?

---

### 3. Kitchen Quality Assurance & Food Safety Value Stream

**Trigger:** Continuous (temperature checks, prep protocols) and event-driven (inspection, incident, complaint)
**Value Delivered:** Safe food, regulatory compliance, brand protection
**Stakeholders:** Kitchen Manager, Health & Safety Officer, All Kitchen Staff, Customers

This value stream encompasses the continuous and event-driven activities that ensure food safety and quality. It includes temperature monitoring (cold chain, cooking temps, holding temps), sanitation protocols, allergen management, HACCP compliance, and incident response. This stream runs in parallel with preparation activities and represents a cross-cutting concern.

**Why it matters for analytics:** Food safety failures are low-probability, high-impact events. The analytics opportunity here is in leading indicators — temperature deviations, missed check-ins, protocol shortcuts — that predict risk before incidents occur.

**Key questions this stream surfaces:**
- What is the compliance rate for time-temperature protocols by station and shift?
- Are there patterns in near-miss events that predict actual safety incidents?
- How does sanitation cycle time affect throughput at each station?

---

### 4. Kitchen Capacity & Throughput Management Value Stream

**Trigger:** Order volume signals, shift planning cycle, peak demand events
**Value Delivered:** Optimized throughput relative to demand, balanced station loading
**Stakeholders:** Kitchen Manager, Head Chef, Front-of-House Manager, Operations

This value stream addresses the kitchen's ability to match its productive capacity to demand. It covers station staffing, equipment utilization, order sequencing, batch sizing, and the real-time balancing act of managing multiple orders across stations with different cycle times. It is where the kitchen functions as a production system.

**Why it matters for analytics:** Ticket time, station idle time, order queue depth, and throughput per labor hour are the metrics that connect kitchen operations to customer experience and labor cost. This stream makes the kitchen legible as a production environment.

**Key questions this stream surfaces:**
- What is the actual throughput ceiling by station, and what constrains it?
- How does order mix (not just volume) affect total kitchen cycle time?
- Where are the bottleneck stations, and how do they shift across dayparts?

---

### 5. Waste Tracking & Reduction Value Stream

**Trigger:** End-of-shift waste measurement, spoilage event, menu performance review
**Value Delivered:** Reduced food cost, sustainability outcomes, operational insight
**Stakeholders:** Kitchen Manager, Finance, Sustainability Lead (if applicable)

This stream captures the identification, measurement, categorization, and root-cause analysis of food waste. It distinguishes between prep waste (trim, scraps), overproduction waste, spoilage waste, and plate waste — each of which has different causes and different intervention strategies.

**Why it matters for analytics:** Waste is the negative image of value. Measuring it by category and tracing it back to its origin point in the production process is one of the highest-ROI analytics activities in any kitchen operation.

**Key questions this stream surfaces:**
- What is the waste-to-production ratio by category, station, and menu item?
- Which menu items generate the most prep waste, and can recipe or technique changes reduce it?
- What is the relationship between batch sizing decisions and overproduction waste?

---

### 6. Menu Engineering & Innovation Value Stream

**Trigger:** Periodic menu review cycle, seasonal change, customer feedback signal, cost pressure
**Value Delivered:** Menu items optimized for customer demand, margin, and kitchen capability
**Stakeholders:** Head Chef, Kitchen Manager, Marketing, Finance

This stream covers the lifecycle of a menu item from ideation through prototyping, costing, testing, launch, performance monitoring, and eventual retirement. It is the Kitchen Domain's innovation pipeline and its primary interface with the Customer and Marketing Domains.

**Why it matters for analytics:** Menu engineering matrices (popularity vs. profitability) are a well-established analytical tool, but they're typically done quarterly at best. Connecting this to real-time kitchen data makes it a continuous optimization capability.

**Key questions this stream surfaces:**
- Where does each menu item sit on the popularity-profitability matrix, and how is that trending?
- What is the kitchen complexity cost of adding a new item (impact on station loading, ingredient count, training)?
- How quickly can the kitchen validate a new item from prototype to production-ready?

---

### 7. Kitchen Equipment Lifecycle & Readiness Value Stream

**Trigger:** Equipment failure, maintenance schedule, capacity planning event, new menu requirement
**Value Delivered:** Equipment availability, predictable maintenance cost, production continuity
**Stakeholders:** Kitchen Manager, Maintenance, Finance, Operations

This stream tracks kitchen equipment from acquisition through daily readiness checks, preventive maintenance, repair, and eventual replacement. Equipment availability directly gates kitchen capacity — a down oven or a malfunctioning mixer doesn't just cost repair dollars, it reshapes what the kitchen can produce.

**Why it matters for analytics:** Unplanned equipment downtime is a hidden cost driver. Predictive maintenance, informed by usage patterns and failure history, is a practical analytics use case that connects directly to throughput and food cost.

**Key questions this stream surfaces:**
- What is the mean time between failures for critical equipment?
- How does equipment age and utilization correlate with quality deviations?
- What is the true cost of equipment downtime (including lost throughput and workarounds)?

---

## Value Stream Relationships

These candidate value streams don't operate in isolation. Several key relationships are worth noting as the analysis deepens:

- **Ingredient Procurement-to-Station** feeds directly into **Order Preparation** (existing) and **Recipe Standardization**. Ingredient availability constraints propagate through both.
- **Recipe Standardization** is a governance stream — it sets the rules that **Order Preparation** follows and that **Quality Assurance** monitors.
- **Kitchen Capacity & Throughput** is the operational orchestration layer that sequences and balances work across all preparation-related streams.
- **Waste Tracking** is a measurement stream that draws data from nearly every other stream — it reveals where value leaks out of the system.
- **Menu Engineering** is the strategic stream that shapes what flows through all the others. Changes here cascade everywhere.
- **Equipment Lifecycle** is an enabling stream — it doesn't produce customer value directly, but its failures constrain every stream that does.

---

## Next Steps

1. **Validate** these candidates against the existing Kitchen Business Domain Model and Food Preparation Value Stream Network
2. **Prioritize** which streams to model in detail based on analytics value potential
3. **Map** the data entities and events that flow through each stream (using the companion glossary)
4. **Connect** these streams to the broader Enterprise Domain Model and Business Capability Map

---

## References

- Stealth Pizzeria Enterprise Domain Model
- Stealth Pizzeria Kitchen Business Domain
- Pizzeria Food Order Value Stream
- Pizzeria Food Preparation Value Stream Network
- Pizzeria Business Capability Map
- *The Case for Value-Driven Analytics* — Value stream identification methodology
- Eric Evans, *Domain-Driven Design: Tackling Complexity in the Heart of Software* (Addison-Wesley, 2004) — Foundational DDD concepts including bounded contexts and ubiquitous language
- Vaughn Vernon, *Implementing Domain-Driven Design* (Addison-Wesley, 2013) — Practical DDD patterns for value objects, aggregates, and domain events
- TOGAF Value Streams guidance — Enterprise architecture value stream methodology
