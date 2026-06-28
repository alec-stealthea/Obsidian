---
type: Glossary Term
title: "Blank Node"
description: "A blank node (also called an anonymous node) in a knowledge graph is a node that does not have a globally unique identifier (URI or IRI) or a literal value associated with it."
timestamp: 2026-06-26T19:19:05Z
---

A **blank node** (also called an **anonymous node**) in a knowledge graph is a node that does not have a globally unique identifier (URI or IRI) or a literal value associated with it. Instead, it serves as a placeholder for an entity or concept when a unique identifier is not available or necessary.

**Characteristics of Blank Nodes:**

1. **Locally Scoped:** They are identified only within the context of the graph or dataset they belong to, using an internal identifier (e.g., _b1, _b2).

2. **Non-reusable Across Graphs:** Since they lack a unique identifier, they cannot be reliably referred to outside the graph.

3. **Used for Structured Data:** Commonly used to represent intermediary nodes for data structures like lists, nested data, or complex attributes.