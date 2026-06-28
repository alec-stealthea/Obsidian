---
type: Glossary Term
title: "Tuple"
description: "A triple is a sequence of three values - a subject, predicate and object, that define an assertion, where each of these are either an identifier to a specific resource or a literal value."
timestamp: 2026-06-26T19:19:05Z
aliases:
  - Triple
---
A triple is a sequence of three values - a subject, predicate and object, that define an assertion, where each of these are either an identifier to a specific resource or a literal value. Triples are usually indexed so that if you have multiple identical triples, they only appear in the index once. Many triple stores actually keep track of additional values, such as a graph identifier differentiating a triple in one collection from a triple in another, as well as reification values that identify the triple as an entity in its own right. As such the term _tuple_ has become more common to describe these assertions.

I = a set of IRIs
L = the set of RDF Literals
B = RDF Blank Node
S = Subject
P = Predicate
O = Object

