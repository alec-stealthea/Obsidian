---
type: Glossary Term
title: "Semantic Immutability"
description: "The idea that once an entity is created, it exists over a period of time and changes should take place as the creation of new relationships with new entities rather than the modification of existin..."
timestamp: 2026-06-26T19:19:05Z
---

The idea that once an entity is created, it exists over a period of time and changes should take place as the creation of new relationships with new entities rather than the modification of existing ones. The jobs that a person has, for instance, are immutable - they can be superseded, (which is a back pointer from a new entity), but the entry itself, once created cannot be changed. This notion is also known as concurrency, and while it plays a big part in designing long term systems, semantic immutability is key to transactional systems as well.