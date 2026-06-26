---
type: Blog Draft
title: Business Capability Planning and Financial Operations
description: Thesis exploring whether Business Capability Planning can decompose value stream networks down to per-capability-instance unit economics, with an assessment of strengths, weaknesses, and further reading.
tags:
  - blog-idea
  - business-capability-planning
  - finops
  - value-streams
  - unit-economics
timestamp: 2026-06-24T00:00:00Z
---

Thesis:  [[Business Capability Planning]] provides the basis to break a [[Value Stream Network]] into [[Value Streams]] and then Value Streams into different [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Value Streams/Business Capability|Business Capabilities]].  From there, you could break that business capability into the people, process, and tools needed to understand what the unit economics per business capability instance might be.

I am not sure how much a site like https://www.finops.org/framework/ can provide some background or context.

I would be interested to apply this to the [[Willow Inventory Provincial Vaccine - Application Context Narrative]] solution. That would mean understanding the whole value stream network that might include:
- Procure Vaccine
- Distribute Vaccine
- Administer Vaccine

While the happy path is good for Value Stream Analysis, I am not quite sure how we would document the cost of vaccine recalls or situations where in administering a vaccine we have a non-effective dose and have to do that step again.

---

## Claude's Assessment (2026-06-24)

### What the thesis is really proposing

Stripped to its core, the thesis says: the [[Value Stream Network]] → [[Value Streams]] → value stage → [[Business Capability]] decomposition gives you a chain of progressively finer **cost objects**, and the [[Closed Loop Analytics/3 - Map the value stream business capability instances|business capability *instance*]] (people + process + tools at a specific stage) is the atomic unit you can attach a cost — and ideally a value — to. That instinct is sound. You have independently arrived at the same unit-of-analysis idea that three established disciplines already formalise: **Activity-Based Costing** (the *activity* as cost object), **value stream / lean accounting** (the *value stream* as unit of analysis), and **Technology Business Management** (the taxonomy that flows general-ledger cost up to *business capabilities* and outcomes). That convergence is the strongest evidence the thesis is on the right track.

### Strengths

- **The decomposition maps cleanly onto costing theory.** A capability instance is, in costing terms, a cost object with identifiable resource consumption (labour, tooling, process steps). This is exactly what ABC needs and what TBM's business layer expresses. The thesis doesn't need to invent a costing model — it needs to *bind* an existing one to your capability model.
- **Right altitude for decision-making.** Per-capability-instance unit cost lets you compare cost-per-outcome across delivery options (e.g. depot-to-clinic vs. depot-to-pharmacy distribution), which is far more decision-useful than department-level budget lines.
- **It extends your existing IP rather than competing with it.** This is the costing layer sitting on top of the Closed Loop / Value Driven Analytics series and the Stealth EA "business capability instance" specialisation. It also dovetails with your separate [[FinOps and Enterprise Architecture]] note on tokenomics — same unit-economics discipline, different cost driver.
- **The Willow case is a genuine testbed.** Procure → Distribute → Administer is a real value stream network with real cost drivers, in a regulated domain where "fully-loaded cost per dose administered" is a number leadership would actually act on. The [[Willow Inventory Provincial Vaccine - Application Context Narrative]] already inventories the systems (Snowflake/Clarity) that could supply transaction volumes.

### Weaknesses and risks

- **A naming collision sits at the centre of the thesis.** The FinOps Foundation's framework (finops.org) is specifically **cloud/technology cost management** — its cost objects are cloud resources, not business capabilities. It will give you excellent *operating-model* vocabulary (Inform/Optimize/Operate phases, allocation, showback/chargeback, unit economics) but it won't map cost to capabilities for you. For capability-level costing the closer-fit discipline is **TBM**, and underneath it **ABC / value stream costing**. Decide early whether "Financial Operations" means the FinOps movement or financial operations in the general sense — the post is muddier until that's pinned down.
- **The hard problem is allocation, not decomposition.** Splitting shared people/tools/process cost across capability instances is the classic ABC cost-driver problem. You'll need to choose drivers (time, transaction count, headcount) and accept allocation error. Without that step, the unit economics are directionally interesting but not auditable.
- **Value, not just cost.** "Unit economics" implies cost *and* value per unit. In a non-revenue public-health setting there's no price, so you need a value proxy (doses administered, coverage achieved, outbreaks averted) or you only ever produce unit *cost*. The denominator needs naming.
- **Data feasibility.** Per-instance numbers need activity/time data at the capability-instance level. Willow gives you transaction volumes via Snowflake, but human process time is rarely instrumented — risk of a beautiful model with no data to feed it. Time-Driven ABC exists precisely to reduce that data-collection burden and is worth a look.
- **Granularity can explode.** Both TBM and ABC literature warn against over-decomposition. Instance-level costing should be pushed only as deep as a real decision requires.

### Your two open questions, answered directly

- **Does finops.org/framework help?** Partly. Use it for the operating model and the unit-economics framing, but pair it with the **TBM taxonomy** for the business-capability mapping it doesn't provide.
- **How do you cost recalls / non-effective doses / rework?** This is the most valuable part of the thesis, not a gap. Model these as **exception (variant) value streams** and as **failure demand** — demand created by a failure to do something right the first time (John Seddon's term). Value stream costing and **cost of poor quality (COPQ)** are the established treatments for exactly this. You already have a precedent in [[Emergency Value Stream Analysis Variations]] for branching off the happy path; the costing extension is to attach failure-demand cost to those variant stages.
- [[Value Streams At Scale]]

### Where to learn more

Technology Business Management (the closest established fit for capability-level costing):

- [TBM Taxonomy — TBM Council](https://www.tbmcouncil.org/taxonomy/) and [What is TBM? — TBM Council](https://www.tbmcouncil.org/learn-tbm/what-is-tbm/)
- [What is TBM? — Apptio](https://www.apptio.com/topics/what-is-tbm/) and [What Is Technology Business Management? — IBM](https://www.ibm.com/think/topics/technology-business-management)

FinOps (operating model and unit-economics vocabulary):

- [FinOps Framework — FinOps Foundation](https://www.finops.org/framework/) (your link)
- [*Cloud FinOps* — Storment & Fuller (O'Reilly)](https://www.finops.org/community/finops-book/) for the unit-economics and maturity-model baseline

Costing methods that supply the missing allocation/exception machinery:

- [Value Stream Costing: A Lean Approach to Process Improvement](https://accountingprofessor.org/value-stream-costing-a-lean-approach-to-process-improvement/)
- [Comparison of Time-Driven ABC and value stream accounting (lean Six Sigma case study)](https://www.researchgate.net/publication/264755572_A_comparison_between_time-driven_activity-based_costing_and_value_stream_accounting_in_a_lean_Six_Sigma_manufacturing_case_study)

Capability-based costing / cost transparency from the EA side:

- [Business Capability Modeling — Capstera](https://www.capstera.com/business-capability-modeling/)
- [What is Business Capability — SAP LeanIX](https://www.leanix.net/en/wiki/ea/business-capability)