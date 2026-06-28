---
type: Glossary Term
title: "Rule Chain"
description: "A rule consists of a specific SPARQL query or SHACL shape in which an inbound or requested outbound RDF record may match, and which, if validated, will generate a report."
timestamp: 2026-06-26T19:19:05Z
---

A rule consists of a specific SPARQL query or SHACL shape in which an inbound or requested outbound RDF record may match, and which, if validated, will generate a report. The report, in turn, will be tied to a specific action or sequence of actions. Rules have associated priorities, with higher priority rules superseding lower priority ones. Rules may absorb test entities, terminating the chain, or may re-emit the test entity for the next lower priority rule in the sequence.