# Kitchen Domain — Candidate Vocabulary

## Purpose

This glossary establishes the candidate ubiquitous language for the Kitchen Domain within the Stealth Pizzeria Enterprise Domain Model. In domain-driven design, the ubiquitous language is the shared vocabulary that domain experts and technical teams use to describe the domain without translation or ambiguity. Every term here should mean one thing, consistently, across all conversations, models, and implementations within the Kitchen Domain's bounded context.

This is a *candidate* vocabulary — it is meant to be challenged, refined, and extended as the value streams are analyzed in depth. Terms that survive scrutiny become part of the domain model. Terms that cause confusion get reworked. The goal is precision, not completeness.

The glossary is organized by DDD building block type (Entities, Value Objects, Aggregates, Domain Events, Domain Services) to help shape how these concepts will eventually be modeled. This classification is itself a candidate — some terms may shift categories as understanding deepens.

---

## Entities

Entities have a distinct identity that persists over time. They are tracked, referenced, and their state changes matter.

### Station
A defined physical and functional work area within the kitchen where specific types of preparation occur. Each station has assigned equipment, a position on the line, and a capacity profile. Stations are the primary unit of kitchen organization.

*Examples: Pizza Make Station, Oven Station, Prep Station, Salad/Cold Station, Expediting Station*

### Kitchen Order Ticket (KOT)
The kitchen's authoritative representation of a customer order. A KOT is created when an order enters the kitchen and tracks through preparation, quality check, and completion. It is the unit of work that flows through the kitchen's production system. Note: this is distinct from the customer-facing order — the KOT is the kitchen's interpretation, which may split, combine, or sequence items differently than the customer sees them.

### Recipe
A versioned specification for producing a menu item. Includes ingredient list, quantities, preparation steps, cooking parameters, plating instructions, and portioning standards. A recipe is the kitchen's contract for what a menu item *is*. Recipe changes are significant domain events.

### Menu Item
A product offering that appears on the menu and can be ordered by a customer. A menu item is linked to one or more recipes (accounting for size variations, modifications) and carries pricing, cost, and classification attributes.

### Ingredient
A raw or semi-processed food material used in recipe execution. An ingredient has identity (tracked by type and lot where relevant), a shelf life, storage requirements, and a cost history. Ingredients flow through the kitchen from receiving to station to plate.

### Batch
A quantity of a prep item or ingredient prepared in advance for use during service. Batches are produced during prep periods, have a production timestamp, a shelf life, and a yield. Batch management is a core kitchen planning activity.

### Equipment Asset
A piece of kitchen equipment with an identity, maintenance history, and operational status. Equipment assets are assigned to stations and their availability directly affects kitchen capacity.

### Kitchen Staff Member
A person who works in the kitchen, with defined roles, station certifications, and shift assignments. Staff members are the human capacity of the kitchen.

### Shift
A defined work period with a start time, end time, staffing assignments, and expected demand profile. Shifts are the primary unit of kitchen labor planning.

---

## Value Objects

Value objects are defined by their attributes rather than an identity. Two value objects with the same attributes are interchangeable. They describe characteristics, measurements, or specifications.

### Portion Specification
The defined quantity and presentation standard for a specific ingredient or component within a recipe. Includes target weight/volume, acceptable variance range, and measurement method.

### Temperature Reading
A recorded temperature measurement at a specific point in the food handling chain. Includes the value, measurement location (equipment, food item, storage area), timestamp, and whether it falls within the acceptable range.

### Ticket Time
The elapsed duration from when a KOT enters the kitchen to when it is completed and handed off. Ticket time is the kitchen's primary customer-experience metric.

### Food Cost Ratio
The ratio of ingredient cost to menu price for a given item. Expressed as a percentage. This is a calculated value that connects kitchen operations to financial outcomes.

### Par Level
The target quantity of an ingredient or prep item that should be on hand at the start of a service period. Par levels are set based on demand forecasting and represent the kitchen's inventory policy.

### Prep List
An ordered set of preparation tasks generated for a specific shift or service period. Derived from par levels, expected demand, and current inventory. The prep list translates forecasted demand into kitchen work.

### Cooking Parameter
A specification for how a food item should be cooked — temperature, duration, technique, and doneness indicator. Cooking parameters are part of a recipe and are monitored as part of quality assurance.

### Waste Category
A classification of food waste by its origin point and cause. The standard categories are: prep waste (trim and byproduct), overproduction waste, spoilage waste, and plate waste (returns). Each category implies different root causes and interventions.

### Station Capacity Profile
A description of a station's throughput capability, including maximum concurrent items, cycle time per item type, and constraints (equipment, labor, space). Used in capacity planning and bottleneck analysis.

### Allergen Profile
The set of allergens present in an ingredient, recipe, or menu item. Allergen profiles flow from ingredients up through recipes to menu items and are a critical food safety data element.

### Yield Percentage
The ratio of usable product to raw product for an ingredient after trimming, cooking, or other processing. Yield percentages are essential for accurate food costing and order quantity calculation.

---

## Aggregates

Aggregates are clusters of entities and value objects that are treated as a unit for data changes. They enforce consistency boundaries.

### Order Fulfillment
The aggregate that groups a KOT with its constituent item preparations, quality checks, and completion status. This is the transactional boundary for "making an order" — all items in an order fulfillment must reach completion before the order can be handed off.

### Recipe Specification
The aggregate that groups a recipe with its ingredient list, portion specifications, cooking parameters, and versioning metadata. Recipe changes are managed as a unit — you don't change a single ingredient in isolation, you publish a new version of the specification.

### Inventory Position
The aggregate that groups a specific ingredient with its current on-hand quantity, batch details, par level, reorder status, and location (storage area or station). The inventory position is the single source of truth for "how much do we have and where is it."

### Station Assignment
The aggregate that combines a station with its current staff assignment, equipment status, active KOTs, and throughput metrics for a given shift. This represents the station as a working production unit.

### Menu Item Profile
The aggregate that combines a menu item with its recipe linkage, food cost ratio, sales performance data, popularity classification, and profitability classification. This is the unit of analysis for menu engineering.

---

## Domain Events

Domain events are significant things that happen in the domain. They are named in past tense because they represent facts — things that have already occurred. Events are the primary mechanism for communication between value streams.

### OrderReceivedInKitchen
A new order has arrived in the kitchen and a KOT has been created. This triggers routing, station assignment, and queue management.

### ItemPreparationStarted
Work has begun on a specific item within a KOT at a specific station. Marks the transition from queued to in-progress.

### ItemPreparationCompleted
A specific item has been finished at its station and is ready for quality check or expediting. Records the station, preparer, and actual preparation time.

### OrderFulfilled
All items in a KOT have been completed, quality-checked, and assembled. The order is ready for handoff to front-of-house or delivery.

### TemperatureDeviationDetected
A temperature reading has fallen outside its acceptable range. This triggers the food safety response protocol and is a leading indicator for the Quality Assurance value stream.

### IngredientStockBelowPar
An ingredient's inventory position has dropped below its par level. Triggers replenishment actions in the Ingredient Procurement-to-Station value stream.

### BatchPrepared
A new batch of a prep item has been completed. Records the item, quantity, yield, preparer, and timestamp. Updates the inventory position.

### BatchExpired
A batch has reached the end of its shelf life without being fully consumed. This is a waste event — it feeds the Waste Tracking value stream and signals potential issues in par level accuracy or demand forecasting.

### RecipeVersionPublished
A new version of a recipe has been approved and published. Triggers training requirements, portioning updates, and food cost recalculation.

### MenuItemLaunched
A new item has been added to the active menu. Cascading event that affects recipes, ingredient procurement, station loading, and staff training.

### MenuItemRetired
An item has been removed from the active menu. Triggers inventory rundown planning and frees station capacity.

### EquipmentFailureReported
A piece of equipment has been reported as non-functional. Triggers maintenance response and capacity rebalancing across stations.

### ShiftStarted
A new shift has begun with its staffing assignments. Establishes the kitchen's available capacity for the upcoming service period.

### WasteMeasurementRecorded
An end-of-shift or end-of-service waste measurement has been taken. Records waste by category, quantity, and estimated cost. Feeds the Waste Tracking value stream.

### QualityCheckFailed
An item or batch has failed a quality check (visual, taste, temperature, portion). Triggers rework or discard and feeds both the Quality Assurance and Waste Tracking value streams.

### ThroughputBottleneckDetected
A station's queue depth has exceeded a threshold relative to its capacity profile, indicating a bottleneck. Triggers real-time rebalancing actions in the Capacity & Throughput value stream.

---

## Domain Services

Domain services represent operations or processes that don't naturally belong to a single entity or value object. They orchestrate behavior across multiple domain concepts.

### Order Routing Service
Determines how a KOT is decomposed into station-level work assignments based on the items ordered, current station loading, and preparation dependencies. This is the intelligence that turns a customer order into a kitchen production plan.

### Capacity Balancing Service
Monitors station queue depths and cycle times in real time and recommends or executes rebalancing actions — redirecting staff, resequencing orders, or adjusting batch sizes to smooth throughput.

### Food Cost Calculation Service
Computes the theoretical and actual food cost for a menu item by aggregating ingredient costs (using current prices and yield percentages) against the recipe specification. Surfaces variance between standard and actual cost.

### Par Level Optimization Service
Analyzes historical consumption data, demand patterns, and waste data to recommend adjustments to par levels. Connects the Waste Tracking and Ingredient Procurement value streams.

### Menu Engineering Analysis Service
Classifies menu items by popularity and profitability (the classic Star/Plow Horse/Puzzle/Dog matrix) and recommends pricing, promotion, or retirement actions. Connects sales data with kitchen cost data.

---

## Bounded Context Notes

The Kitchen Domain's vocabulary intentionally overlaps with adjacent domains at specific integration points. These overlaps are where context mapping becomes critical:

- **Order** means something different in the Customer Domain (what they asked for) vs. the Kitchen Domain (the KOT — the kitchen's interpretation of what to produce). The translation happens at the domain boundary.
- **Ingredient** in the Kitchen Domain is a production input. In the Supply Chain Domain, it's a procurement item with vendor relationships and purchase orders. Same physical thing, different concerns.
- **Menu Item** bridges the Kitchen Domain and the Customer/Marketing Domain. The kitchen cares about producibility and cost; marketing cares about positioning and price. The Menu Item Profile aggregate holds the kitchen's perspective.
- **Delivery** in the Kitchen Domain ends at the expediting window. The Delivery Domain picks up from there. The handoff point is a critical context boundary.

These boundary definitions should be validated as the value streams are mapped in detail — the streams will reveal where the translations actually happen and where they break down.

---

## References

- Kitchen Domain Candidate Value Streams (companion document)
- Stealth Pizzeria Enterprise Domain Model
- Stealth Pizzeria Kitchen Business Domain
- Eric Evans, *Domain-Driven Design: Tackling Complexity in the Heart of Software* (Addison-Wesley, 2004) — Chapters on ubiquitous language, entities, value objects, aggregates, and bounded contexts
- Vaughn Vernon, *Implementing Domain-Driven Design* (Addison-Wesley, 2013) — Practical patterns for aggregates and domain events
- Vaughn Vernon, *Domain-Driven Design Distilled* (Addison-Wesley, 2016) — Accessible introduction to bounded contexts and context mapping
- Alberto Brandolini, *Introducing EventStorming* — Event-driven domain discovery methodology
