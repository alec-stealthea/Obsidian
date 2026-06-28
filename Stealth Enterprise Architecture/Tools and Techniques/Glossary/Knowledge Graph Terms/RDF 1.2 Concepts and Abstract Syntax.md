---
type: Glossary Term
title: "RDF 1.2 Concepts and Abstract Syntax"
description: "The Resource Description Framework (RDF) provides an abstract syntax (a data model) for representing information on the web."
timestamp: 2026-06-26T19:19:05Z
---

The Resource Description Framework (RDF) provides an abstract syntax (a data model) for representing information on the web. There are two key data structures:
- **RDF Graphs** - a set of subject (node)-predicate (arc)-object(node) triples (RDF Triple). These elements may be ILI, blank nodes, or datatyped literals. A note that in the latest [RDF 1.2 Conects and Abstract Syntax Working Draft (Dec. 2023)](https://www.w3.org/TR/rdf12-concepts/), a RDF Triple can be an object within another RDF Triple. There are four types of nodes which represent something in the world:
	- International Resource Identifiers (IRI) - these identifiers once minted should never change it's intended referent.
	- Literals - used for values such as strings, numbers, and dates. By design, a literal should never change value.
	- Blank nodes and;
	- RDF Triple
- **RDF Datasets** - Collections of RDF graphs.
- **RDF Triple** - An RDF Triple is a statement that says that there is a relationship between the subject and object nodes that is defined by the predicate. 

