Note: some parts of the below text are quoted from the Domain-Driven Design [book](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215), [reference](https://www.domainlanguage.com/ddd/reference/), or [domainlanguage.com](https://www.domainlanguage.com/) to maintain accuracy and correctness. Please refer to its original sources if you want to learn more about Domain-Driven Design. Some parts of the material on this page are different from the original text to adjust the terminology, concepts, and instrumentation with Archipeg.

> **_Synopsis_**_: Domain-Driven Design (DDD) is an approach to software development for complex businesses and other domains. DDD tackles that complexity by focusing the team's attention on knowledge of the domain, picking apart the most tricky, intricate problems with models, and shaping the software around those models._

**Tip**: watch a [video tutorial about Domain-Driven Design in Archipeg](https://www.archipeg.com/learn/ddd-v1-metamodel#video).

## Idea Behind Domain-Driven Design

Domain-Driven Design (DDD) helps describe Solution and Application Architecture, aiding the Enterprise Architecture efforts in some cases.

In this Archipeg metamodel, we have captured all DDD concepts and associations between them based on the original source of this knowledge. You will find all patterns and notions as object types in catalog designer.

This metamodel comes in handy if you practice Domain-Driven Design in your projects or want to apply such an approach to your work. Another use that we discovered was possible - understanding and teaching DDD to others using Archipeg. Since the model rigorously follows this metamodel, concepts become intuitively tied to each other, allowing the composition and traversal of this knowledge area with ease.

## DDD Metamodel Diagram

Below is a complete diagram of the DDD metamodel. Please click on the picture to open it in a new window and examine its details.

[![](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-v1-metamodel.jpg)](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-v1-metamodel.jpg)

### How to Read the Diagram

The diagram contains five sections to clarify a large amount of information provided. Each part introduces new concepts (highlighted elements) and puts them in the context of the previous notions (non-highlighted elements). Thus, follow the highlighted boxes to find all unique concepts. We recommend understanding the metamodel and the DDD in pieces, and one way would follow the sections shown in the diagram.

## DDD Metamodel vs. Original Sources

While the metamodel closely repeats the DDD's vocabulary and ideology, in some areas, we had to adjust terminology or apply our subjective interpretation to avoid confusion and make the model expressive and practical. We want to cover the differences below.

### Teams and Applications

While Teams and Applications fall outside the DDD's jargon (they exist outside the DDD, too), we wanted to connect these elements to the metamodel concepts for the holistic picture and put the model in context. Thus, we have included these concepts in the metamodel.

### Shared Kernel

There is no dedicated object type, but there are existing associations between bounded contexts. So, you designate a bounded context as a shared kernel and express it by associating with other BCs.

### Open-host Service

This concept represents a bounded context to which other BCs conform. So, you can express this concept by the conforming bounded contexts, which is part of the metamodel.

### Cohesive Mechanisms

Original sources describe the Cohesive Mechanism as a generic framework. We expressed this intent using two concepts: Cohesive Mechanism and Framework Interface, which should be sufficient to explain the boundaries and operations within it.

### DDD Concepts that are Absent from Metamodel

Some areas from DDD are not in the metamodel intentionally. For example, you will not find Supple Design and Large-Scale Structure concepts. The former describes low-level notions and ideology that does not translate into the structure. The latter is a collection of patterns and behaviors outside the technical workstreams.

Therefore, we believe that the metamodel is complete and allows expressing every detail about Domain-Driven Design that you will want to capture, analyze, or present using Archipeg in real life.

## Example Diagrams

Below, we present example diagrams based on fictitious enterprise assets describing Amazon's DDD approach. This content does not represent Amazon's real-life landscape; we chose Amazon to make the material easier to understand.

### Bounded Context

**Participating object types (starting from top left)**: Bounded Context, Team, Application.

[![](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-bounded-context.png?v=8-8-22)](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-bounded-context.png?v=8-8-22)

### Model-Driven Design: Layers and Modules

**Participating object types (starting from top left)**: Layer, Bounded Context, Module, Aggregate Root, Repository, Value Object.

[![](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-mdd-layers-modules.png?v=8-8-22)](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-mdd-layers-modules.png?v=8-8-22)

### Model-Driven Design: Patterns and Concepts

**Participating object types (starting from top left)**: Domain Event, Value Object, Aggregate, Repository, Service.

[![](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-mdd-patterns-concepts.png?v=8-8-22)](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-mdd-patterns-concepts.png?v=8-8-22)

### Context Mapping

**Participating object types (starting from top left)**: Bounded Context, Publushed Language, Big Ball of Mud.

[![](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-context-mapping.png?v=8-8-22)](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-context-mapping.png?v=8-8-22)

### Core Domain Distillation

**Participating object types (from top left)**: Module, Bounded Context, Cohesive Mechanism, Framework Interface.

[![](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-core-distillation.png?v=8-8-22)](https://www.archipeg.com/learn/ddd-v1-metamodel-files/ddd-core-distillation.png?v=8-8-22)

## DDD v1.0 Metamodel Detailed Description

#### Objects

**Bounded Context**

Explicitly defined context within which a model applies. Bounded Context has set boundaries in terms of team organization, usage within specific parts of the application, and physical manifestations such as code bases and database schemas.

**Team**

A group of people who associate with or are the \`owners\` of Bounded Context(s).

**Application**

Software system of any kind that corresponds to Bounded Context(s).

**Layer**

A horizontal partition of a Bounded Context with an intention to depend only on Layers below and have a loose coupling with Layers above.

**Module**

A cohesive slice of a Bounded Context that groups interrelated concepts and can be understood independently from other Modules.

**Entity**

An object that is distinguished by its identity rather than its attributes; focused on life cycle continuity and identity.

**Value Object**

An object distinguished by its attributes rather than its identity; free of concerns related to life cycle continuity and identity.

**Domain Event**

Full-fledged part of the domain model, a representation of something that happened in the domain; typically something that domain experts want to track or be notified of, or associated with state change in other model objects.

**Service**

Standalone interface that is responsible for a significant process or transformation.

**Aggregate Root**

Entity that is a root of an Aggregate - A cluster of Entities and Value Objects with well-defined boundaries.

**Repository**

A service that provides an illusion of an in-memory collection of a specific Aggregate Root, responsible to store and retrieve its instances.

**Factory**

Encapsulates responsibility of creating instances of complex objects and Aggregates.

**Published Language**

A well-documented shared language that can express the necessary domain information as a common medium of communication, translating as necessary into and out of the language.

**Big Ball of Mud**

A part of a system where models are mixed and boundaries are inconsistent; isolated from the well-defined model elements to separate the mess from organized structures.

**Cohesive Mechanism**

A conceptually cohesive mechanism, partitioned into a separate lightweight framework, containing the intricacies of the solution (\`how\`), leaving the problem (\`what\`) to the domain.

**Framework Interface**

An intention-revealing interface exposed by a Cohesive Mechanism; a complex computation or operation within a framework.

#### Associations

**Team::Owns Bounded Contexts <-> Bounded Context::Owner Teams**

Outgoing: Bounded Contexts that this Team \`owns\`, is responsible for its development or expertise.

Incoming: Teams that \`own\` this bounded context, responsible for its development or expertise.

**Application::Implements Bounded Contexts <-> Bounded Context::Applications Implementing this BC**

Outgoing: Bounded Contexts that this Application implements or corresponds to.

Incoming: Applications that implement or correspond to this Bounded Context.

**Bounded Context::Consists of Layers <-> Layer::Belongs to Bounded Context**

Outgoing: Horizontal Layers that define this Bounded Context.

Incoming: Bounded Context that consists of this and (possibly) other Layers.

**Layer::Depends on Layers <-> Layer::Dependent Layers**

Outgoing: Layers on which this Layer depends. Typically, Layers above depend on Layers below.

Incoming: Layers that depend on this Layer. Typically, Layers above depend on Layers below.

**Layer::Consists of Entities <-> Entity::Belongs to Layer**

Outgoing: Entities that are part of this Layer.

Incoming: Layer to which this Entity belongs.

**Layer::Consists of Value Objects <-> Value Object::Belongs to Layer**

Outgoing: Value Objects that are part of this Layer.

Incoming: Layer to which this Value Object belongs.

**Layer::Consists of Domain Events <-> Domain Event::Belongs to Layer**

Outgoing: Domain Events that are part of this Layer.

Incoming: Layer to which this Domain Event belongs.

**Layer::Consists of Services <-> Service::Belongs to Layer**

Outgoing: Services that are part of this Layer.

Incoming: Layer to which this Service belongs.

**Layer::Consists of Aggregate Roots <-> Aggregate Root::Belongs to Layer**

Outgoing: Aggregate Roots that are part of this Layer.

Incoming: Layer to which this AggregateRoot belongs.

**Layer::Consists of Repositories <-> Repository::Belongs to Layer**

Outgoing: Repositories that are part of this Layer.

Incoming: Layer to which this Repository belongs.

**Layer::Consists of Factories <-> Factory::Belongs to Layer**

Outgoing: Factories that are part of this Layer.

Incoming: Layer to which this Factory belongs.

**Bounded Context::Consists of Modules <-> Module::Belongs to Bounded Context**

Outgoing: Modules that define this Bounded Context.

Incoming: Bounded Context that consists of this and (possibly) other Modules.

**Module::Depends on Modules <-> Module::Dependent Modules**

Outgoing: Modules on which this Module depends.

Incoming: Modules that depend on this Module.

**Module::Consists of Entities <-> Entity::Belongs to Module**

Outgoing: Entities that are part of this Module.

Incoming: Module to which this Entity belongs.

**Module::Consists of Value Objects <-> Value Object::Belongs to Module**

Outgoing: Value Objects that are part of this Module.

Incoming: Module to which this Value Object belongs.

**Module::Consists of Domain Events <-> Domain Event::Belongs to Module**

Outgoing: Domain Events that are part of this Module.

Incoming: Module to which this Domain Event belongs.

**Module::Consists of Services <-> Service::Belongs to Module**

Outgoing: Services that are part of this Module.

Incoming: Module to which this Service belongs.

**Module::Consists of Aggregate Roots <-> Aggregate Root::Belongs to Module**

Outgoing: Aggregate Roots that are part of this Module.

Incoming: Module to which this AggregateRoot belongs.

**Module::Consists of Repositories <-> Repository::Belongs to Module**

Outgoing: Repositories that are part of this Module.

Incoming: Module to which this Repository belongs.

**Module::Consists of Factories <-> Factory::Belongs to Module**

Outgoing: Factories that are part of this Module.

Incoming: Module to which this Factory belongs.

**Entity::Dispatches Domain Events <-> Domain Event::Describes Entities**

Outgoing: Domain Events that describe occurrences to this Entity.

Incoming: Entities that this Domain Event describes.

**Entity::Nested Entities <-> Entity::Parent Entities**

Outgoing:

Incoming: Entities that nest this Entity.

**Entity::Nested Value Objects <-> Value Object::Parent Entities**

Outgoing:

Incoming: Entities that nest this Value Object.

**Value Object::Nested Entities <-> Entity::Parent Value Objects**

Outgoing:

Incoming: Value Objects that nest this Entity.

**Service::Transforms Aggregates <-> Aggregate Root::Is Transformed by Services**

Outgoing: Aggregates that this Service transforms while performing its function.

Incoming: Services that transform this Aggregate while performing its function.

**Aggregate Root::Dispatches Domain Events <-> Domain Event::Describes Aggregate Roots**

Outgoing: Domain Events that describe occurrences to this Aggregate Root.

Incoming: Aggregate Roots that this Domain Event describes.

**Aggregate Root::Nested Entities <-> Entity::Parent Aggregate Roots**

Outgoing:

Incoming: Aggregate Roots that nest this Entity.

**Aggregate Root::Nested Value Objects <-> Value Object::Parent Aggregate Roots**

Outgoing:

Incoming: Aggregate Roots that nest this Value Object.

**Repository::Stores Aggregate Root <-> Aggregate Root::Is Stored by Repository**

Outgoing: Aggregate Root that is stored and managed by this Repository.

Incoming: Repository that stores and manages this Aggregate Root.

**Factory::Assembles Aggregates <-> Aggregate Root::Is Assembled by Factory**

Outgoing: Aggregates that this Factory assembles.

Incoming: Factory that assembles this Aggregate.

**Bounded Context::Partner Bounded Contexts (Outgoing) <-> Bounded Context::Partner Bounded Contexts (Incoming)**

Outgoing: Bounded Contexts that have established a \`partnership\` with this Bounded Context.

Incoming: Bounded Contexts that have established a \`partnership\` with this Bounded Context.

**Bounded Context::Shared Kernels <-> Bounded Context::Is Shared Kernel of BCs**

Outgoing: Shared Kernels that this Bounded Context shares with other Bounded Contexts.

Incoming: Bounded Contexts that share this Shared Kernel.

**Bounded Context::Customer Bounded Contexts <-> Bounded Context::Supplier Bounded Contexts**

Outgoing: Bounded Contexts that have established a \`customer/supplier\` relationship with this Bounded Context and represent customers.

Incoming: Bounded Contexts that have established a \`customer/supplier\` relationship with this Bounded Context and represent suppliers.

**Bounded Context::Conforms to Bounded Contexts <-> Bounded Context::Conformist Bounded Contexts**

Outgoing: Bounded Contexts to which this Bounded Context conforms in a \`conformist\` relationship.

Incoming: Bounded Contexts conforming to this Bounded Context in a \`conformist\` relationship.

**Bounded Context::Has Anti-Corruption Layer for BCs <-> Bounded Context::BCs with Anti-Corruption Layer**

Outgoing: Bounded Contexts for which this Bounded Context has built anti-corruption layer(s).

Incoming: Bounded Contexts that have built anti-corruption layers for this Bounded Context.

**Big Ball of Mud::Consists of Bounded Contexts <-> Bounded Context::Is Part of Big Ball of Mud**

Outgoing: Bounded Contexts that are part of this Big Ball of Mud, possibly due to poorly defined model boundaries and concepts.

Incoming: Bill Ball of Mud part of which this Bounded Context is, possibly due to poorly defined model boundaries and concepts.

**Bounded Context::Understands Published Languages <-> Published Language::Is Understood by Bounded Contexts**

Outgoing: Published Languages that this Bounded Context uses as a communication mechanism.

Incoming: Bounded Contexts that use this Published Language as a communication mechanism.

**Bounded Context::Core Domain Module <-> Module::Is Core Domain of Bounded Context**

Outgoing: Module that contains a Core Domain of this Bounded Context.

Incoming: Bounded Context that owns the Core Domain in this Module.

**Bounded Context::Generic Subdomain Modules <-> Module::Is Generic Subdomain of Bounded Context**

Outgoing: Modules that contain Generic Subdomains of this Bounded Context.

Incoming: Bounded Context that relies on the Generic Subdomain in this Module.

**Bounded Context::Cohesive Mechanisms <-> Cohesive Mechanism::Belongs to Bounded Context**

Outgoing: Cohesive Mechanisms that serve as frameworks to this Bounded Context.

Incoming: Bounded Context that this Cohesive Mechanism serves as a framework.

**Cohesive Mechanism::Exposed Interfaces <-> Framework Interface::Belongs to Cohesive Mechanism**

Outgoing: Framework Interfaces that this Cohesive Mechanism exposes for invocation or use from the Bounded Context.

Incoming: Cohesive Mechanism that exposes this Framework Interface for invocation or use from the Bounded Context.

**Bounded Context::Abstract Core Modules <-> Module::Is Abstract Core of Bounded Context**

Outgoing: Module that contains an Abstract Core of this Bounded Context.

Incoming: Bounded Context for which this Module holds an Abstract Core.

## See Also

-   [Domain-Driven Design - book](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215).
-   [DDD reference](https://www.domainlanguage.com/ddd/reference/)[.](https://www.domainlanguage.com/)
-   [domainlanguage.com](https://www.domainlanguage.com/).
-   [Archipeg's Metamodels](https://www.archipeg.com/learn/metamodels).