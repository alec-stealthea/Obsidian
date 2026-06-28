---
type: Reference
title: "Knowledge Graph"
description: "A knowledge graph is an organized representation of real-world entities and their relationships."
timestamp: 2026-06-26T19:19:05Z
---

A knowledge graph is an organized representation of real-world entities and their relationships.  [[Master Architecture Data]] is an example of a knowledge graph. The key characteristics of a knowledge graph are as follows:
- **Nodes** - Entities like buildings, applications, business objects, etc.
- **Relationships** - Relationships link two nodes together and have attributes about that relationship. 
- **Organizing Principles** - A framework for organizing nodes and relationships according to fundamental concepts essential to the use case being modelled.

Another form of knowledge graph is the [[ArchiMate EA Modelling Language]]. The nodes in this case becomes the elements within the ArchiMate palate and the relationships the kinds of relationships that are able to exist within a given model.

[[Ontologies]] are a formal specification of concepts and relationships between them for a given subject area.

**When to Use Each:**

| Feature                       | Property Graph                | RDF                                 |
| ----------------------------- | ----------------------------- | ----------------------------------- |
| Ease of use                   | Easy for developers           | Requires semantic knowledge         |
| Schema Flexibility            | High                          | Medium                              |
| Semantic Richness             | Low                           | High                                |
| Query Language                | Cypher/Gremlin                | SPARQL                              |
| Interoperability              | Limited                       | High                                |
| Reasoning Support             | Adsent                        | Supported                           |
| Performance                   | Optimized for graph traversal | May lag for traversal-heavy queries |
| Integration with limited data | Limited                       | Strong                              |
#### **Property Graph**:
• Use for **developer-focused applications** like recommendation systems, network analysis, or when you need rapid development with flexible schemas.
• Ideal for use cases prioritizing performance in graph algorithms over semantic reasoning.
#### **RDF**:
• Use for **interoperability and linked data scenarios**, or when detailed semantic representation and reasoning are critical.
• Suitable for data integration, ontology-driven applications, and research environments.

GraphRAG is a technique that grounds Large Language Models with Knowledge Graphs using (usually) proprietary domain data.