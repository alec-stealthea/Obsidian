---
feature: Emergency Room Walk-in Value Stream - Business Capability View.png
---
Business capabilities without value streams are ingredients without recipes. You know what you have, but not how it creates value. The [[Value Stream Capability Model]] fixes that by mapping capabilities directly to the value stream stages they serve — showing exactly what's needed to deliver value at each step of the journey.

The following model builds on top of two other models [[Emergency Department Domain Value Stream Network]] and the [[Emergency Walk-in Value Stream - Motivation View]].  This view add the appropriate business capabilities to each stage and, where appropriate where that business capability may trigger another value stream.
![[Emergency Room Walk-in Value Stream - Business Capability View.png]]Within each stage business capabilities serving that stage come from your [[MAD Business Capability|MAD Business Capability Catalogue]] — stable, technology-independent descriptions of what you need to be able to do. The capability doesn't tell you _how_ it's implemented — that's the [[Business Capability Instance]]. The capability tells you _what_ must exist for this stage to execute successfully.
### Triggered Value Streams

You'll notice some stages contain blue containers with chevron icons — these are value streams, not capabilities. In the Assess stage: Laboratory Value Stream and Imaging Value Stream. In Treat: Pharmacy Value Stream, Surgery Value Stream, and Inpatient Value Stream.

These represent cross-domain dependencies. When Order Management creates a lab order, it triggers the Laboratory Value Stream owned by a different domain. The ED value stream continues executing, but now depends on output from that parallel stream. 
## The Stealth EA Difference

Here's the problem with capability catalogues in isolation: they look comprehensive but don't tell you anything about how value actually gets created. You end up with beautiful taxonomies that gather dust while the organization continues making decisions without architectural input.

By mapping capabilities to value streams, you create something useful:

**Initiative scoping gets precise.** When someone says "we need to improve triage," this model shows exactly which capabilities are in scope: Clinical Assessment, Clinical Documentation, Acuity Management, Waitlist Management, and Bed Management. No more, no less.

**Bottlenecks become visible.** If your time-to-treatment is suffering, you can trace back through the capability mapping to find where the constraint lives. Is it a capability weakness? A handoff between stages? A dependency on another value stream?