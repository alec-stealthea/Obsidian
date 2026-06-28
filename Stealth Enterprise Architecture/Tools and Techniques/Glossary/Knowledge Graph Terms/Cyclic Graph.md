---
type: Glossary Term
title: "Cyclic Graph"
description: "In a cyclic graph, it is possible to traverse a path that will result in a contained loop, while in an acyclic graph, no such loop traversals are possible."
timestamp: 2026-06-26T19:19:05Z
---

In a cyclic graph, it is possible to traverse a path that will result in a contained loop, while in an acyclic graph, no such loop traversals are possible. Relational databases are constrained by convention to be acyclic, and (so long as there is no possibility for linkages between documents) document graphs are normally considered acyclic as well. In RDF it is possible to have cycles, but the database generally warns when such cycles occur, as they can have a significant negative impact upon performance. Property graphs are cyclic.