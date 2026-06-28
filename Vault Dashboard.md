---
type: Dashboard
title: Vault Dashboard
description: Live Dataview registry of CLAUDE context files, a stale-context report, and a skills index — regenerates itself from OKF frontmatter.
tags:
  - dashboard
timestamp: 2026-06-28T00:00:00Z
---

# Vault Dashboard

> [!info] How this works
> Every table below is a live [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) query that reads the OKF frontmatter (`type`, `tags`, `last-updated`, `timestamp`) across the vault and regenerates on open. Nothing here is hand-maintained — to add a context file or skill to these lists, just give the new note the right frontmatter. These blocks render only in Obsidian's Reading/Live Preview view; in raw markdown they appear as code.
>
> The hand-maintained structure tables in `CLAUDE.md` are intentionally left in place — this dashboard is a companion view, not a replacement.

---

## Context-File Registry

All `CLAUDE-*.md` context files (tagged `claude-context`), most-recently-updated first.

```dataview
TABLE WITHOUT ID
  file.link AS "Context File",
  scope AS "Scope",
  parent AS "Parent",
  row["last-updated"] AS "Updated"
FROM #claude-context
SORT row["last-updated"] DESC
```

---

## Stale-Context Report

Context files not updated in **60+ days**, oldest first. These are the candidates for a freshness review. Adjust the `dur(60 days)` threshold to taste.

```dataview
TABLE WITHOUT ID
  file.link AS "Context File",
  scope AS "Scope",
  row["last-updated"] AS "Last Updated",
  (date(today) - row["last-updated"]) AS "Age"
FROM #claude-context
WHERE row["last-updated"] < date(today) - dur(60 days)
SORT row["last-updated"] ASC
```

---

## Skills Registry

Everything in `Anthropic Skills/`. The **Type** column flags any skill file missing an OKF `type` field (`⚠️ no type`).

```dataview
TABLE WITHOUT ID
  file.link AS "Skill",
  default(title, file.name) AS "Title",
  default(type, "⚠️ no type") AS "Type",
  default(timestamp, default(row["last-updated"], "—")) AS "Updated"
FROM "Anthropic Skills"
WHERE file.name != "index"
SORT file.name ASC
```

### Frontmatter health — skills missing a `type` field

```dataview
LIST FROM "Anthropic Skills"
WHERE !type AND file.name != "index"
```

---

_Generated_: 2026-06-28 · _Maintained by_: Dataview queries (self-updating)
