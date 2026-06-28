---
type: Screen Specification
title: "<% tp.file.title %>"
description: ""
tags:
  - screen-specification
  - omra
timestamp: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
---

## [Screen Name] Design Specification Context

[What this screen does, who uses it, and where it sits in the application. State the owning functional role and how permissions are read from the access model. AOMS↔OMRA naming caveat: wireframes still say *AOMS*; prefer **OMRA** in new prose.]

Source material for this specification:

- **Wireframe** — [screen title], slide [N] of the OMRA Design deck.
- **Data model** — [[OMRA Database ERD]] (map every field to a real table/column; flag gaps inline).
- **Access model** — [[User Maintenance Screen Specifications]].
- **Reference data / source material** — [driving user stories, SBARs, reference lists].

## Wireframe

[Slide reference, screen title, action button(s), and the layout zones.]

## Field Mapping

| Field (UI label) | ERD table.column | Type / control | Required | Behaviour / validation | Comments |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## Functional Behaviour

[Actions, buttons, and navigation. Note versioning behaviour where reference-data edits create a new `VersionStatus` version rather than overwriting.]

## Business Rules

1. …

## Acceptance Criteria

1. …

> Tip: run the **omra-screen-spec** skill to generate this against the ERD, wireframe, and access model — it starts from the bundled screen-spec skeleton and matches the Communicable Disease Maintenance exemplar.
