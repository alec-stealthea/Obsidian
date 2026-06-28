---
type: Glossary Term
title: "ArchiMate Grouping"
description: "Within Archimate a grouping is used to \"element aggregates or composes concepts that belong together based on some common characteristic.\""
timestamp: 2026-06-26T19:19:05Z
aliases:
  - Grouping
created: 2025-11-08
published: 2025-11-08
---
### ArchiMate Definition
Within Archimate a grouping is used to "element aggregates or composes concepts that belong together based on some common characteristic."
### Stealth EA Usage

As a Stealth EA, we try to use this vs. using other element types to group elements of the same type. A few examples,
- **Stakeholders** - Within the [[Enterprise Domain Model]] we have Back Office as a Grouping vs. aggregating all of the domains (aka Business Functions) within an ArchiMate Element
- [[Business Capability Map]] - Within the Business Capability Map (or catalogue) there are usually high-level groupings and also lower level groupings that are not capabilities themselves.
### When shouldn't you use groupings? 
In general, you do not want to use groupings where you have real relationships to model.  In general, a Grouping is only relevant to a particular view and is difficult to model across different views.