---
type: Checklist
title: Linter Plugin Configuration Checklist
description: Step-by-step settings to configure the Obsidian Linter plugin so it reinforces this vault's OKF, CommonMark, and WikiLink conventions without damaging frontmatter or managed folders.
tags:
  - vault-optimization
  - linter
  - obsidian
  - checklist
scope: (vault-wide)
last-updated: 2026-06-29
timestamp: 2026-06-29T00:00:00Z
---

# Linter Plugin Configuration Checklist

> **Purpose**: A configuration checklist for the [Obsidian Linter](https://platers.github.io/obsidian-linter/) plugin (Settings → Community plugins → Linter → ⚙). Work top to bottom. Each item names the **tab**, the **rule** (with its alias in backticks), the **value** to set, and the reason. Rule names match the plugin UI as of v1.x. Tick each box as you go.

## Before you start

- [ ] **Back up first.** The Linter edits files in place. Confirm Obsidian Sync is healthy, or copy the vault folder, before running anything vault-wide.
- [ ] **Decide your test target.** You'll validate on a couple of throwaway notes and one `CLAUDE-*.md` before running across folders (see [Rollout](#rollout)).

## General tab (top of the Linter settings)

- [ ] **Lint on save** → **OFF** (for now). Turn this on only after you trust your rule set. With Obsidian Sync publishing live to stealthea.com, you don't want every save silently rewriting files.
- [ ] **Display message on lint** → **ON**. Useful feedback on what changed while you're tuning.
- [ ] **Folders to ignore** → add these, one per line:
    - `Meetings` — Hyprnote-managed; do not restructure.
    - `thumbnails` — auto-generated assets.
    - `.obsidian` — plugin/config; never lint.
    - `Daily Reflections` — private; leave formatting untouched.
    - `Personal Note` — private.
- [ ] **Default Escape Character** → `"` (double quote). Matches typical YAML and avoids breaking apostrophes in titles.
- [ ] **YAML aliases section style** → `multi-line`. Consistent with the block style used across your frontmatter.

## YAML tab — enable

- [ ] **Add blank line after YAML** (`insert-blank-line-after-yaml`) → **ON**. Enforces the CommonMark blank line your `CLAUDE.md` requires after frontmatter.
- [ ] **Escape YAML special characters** (`escape-yaml-special-characters`) → **ON**. Protects `title`/`description` values that contain colons (e.g. "Strings Attached: ...").
- [ ] **Dedupe YAML array values** (`dedupe-yaml-array-values`) → **ON**. Harmless cleanup of duplicate tags.
- [ ] **Format YAML array** (`format-yaml-array`) → **ON**, set tag/alias arrays to multi-line. Keeps `tags` blocks uniform with OKF style.

## YAML tab — configure carefully

- [ ] **YAML Key Sort** (`yaml-key-sort`) → **OPTIONAL**. Only enable if you want a fixed field order. If you do, set **"Remove blank lines"** OFF and verify it preserves `type`, `title`, `description`, `tags`, `scope`, `parent`, `last-updated`, `timestamp`. It reorders but does not drop keys.
- [ ] **YAML Timestamp** (`yaml-timestamp`) → **OFF** (recommended). Your OKF `timestamp` and context-file `last-updated` are updated deliberately, and the `vault-context-sweep` automation manages dates. Auto-stamping on every edit would create Sync churn and could collide with those fields. Only enable if you first repoint its "date modified" key to your actual field and match the ISO format — otherwise it adds duplicate `date modified` / `date created` keys.

## YAML tab — leave OFF / empty

- [ ] **Remove YAML keys** (`remove-yaml-keys`) → keep the key list **EMPTY**, so it never strips Obsidian-specific keys (`parent`, `scope`, `last-updated`).
- [ ] **YAML Title** (`yaml-title`) and **YAML Title Alias** (`yaml-title-alias`) → **OFF**. Your titles are curated in frontmatter, not derived from filenames.
- [ ] **Force YAML escape** (`force-yaml-escape`) → **OFF** unless you hit a specific escaping need.

## Heading tab — enable

- [ ] **Header Increment** (`header-increment`) → **ON**. Catches skipped heading levels without altering text.
- [ ] **Headings Start Line** (`headings-start-line`) → **ON**. Removes stray leading whitespace so `#` headings render.
- [ ] **Remove Trailing Punctuation in Heading** (`remove-trailing-punctuation-in-heading`) → **OPTIONAL**. Tidy, but harmless to skip.

## Heading tab — leave OFF (would cause damage)

- [ ] **Capitalize Headings** (`capitalize-headings`) → **OFF**. Title-casing mangles your acronyms (OMRA, TOGAF, HSS, EA, HIA, ATLAS). If you ever want it, set Style to **First letter** only — never Title Case.
- [ ] **File Name Heading** (`file-name-heading`) → **OFF**. Don't auto-insert an H1 from the filename.

## Spacing tab — enable (these reinforce your CommonMark rules)

- [ ] **Heading blank lines** (`heading-blank-lines`) → **ON**. Set **Bottom = true** and **Empty Line Between YAML and Header = true**. This is the core rule behind "blank line after every heading."
- [ ] **Empty Line Around Tables** (`empty-line-around-tables`) → **ON**. Your context files and OKF docs are table-heavy; this guarantees they render.
- [ ] **Empty Line Around Code Fences** (`empty-line-around-code-fences`) → **ON**. Important for your ```mermaid``` diagram blocks.
- [ ] **Empty Line Around Blockquotes** (`empty-line-around-blockquotes`) → **ON**. Your notes open with `>` Purpose callouts.
- [ ] **Consecutive blank lines** (`consecutive-blank-lines`) → **ON**. Collapses runs of blank lines to one.
- [ ] **Line Break at Document End** (`line-break-at-document-end`) → **ON**. Exactly one trailing newline.
- [ ] **Space after list markers** (`space-after-list-markers`) → **ON**. Single space after `-`/`1.`/checkboxes.
- [ ] **Trailing spaces** (`trailing-spaces`) → **ON**, with **Two Space Linebreak = true**. Removes junk whitespace but preserves any intentional two-space line breaks.

## Spacing tab — decide deliberately

- [ ] **Paragraph blank lines** (`paragraph-blank-lines`) → **OPTIONAL but useful**. Adds the blank line CommonMark wants before/after paragraphs (and therefore before adjacent lists). Caveat: do **not** also enable "Two spaces between lines with content" (Content tab) — they conflict.
- [ ] **Remove Empty Lines Between List Markers and Checklists** (`remove-empty-lines-between-list-markers-and-checklists`) → **OPTIONAL**. Tightens lists; enable only if you prefer compact lists.

## Spacing / Content tabs — leave OFF (risk to links & formatting)

- [ ] **Convert Spaces to Tabs** (`convert-spaces-to-tabs`) → **OFF**. No benefit; risks indentation in nested lists.
- [ ] **Remove Space around Characters** / **Remove Space Before or After Characters** → **OFF**. CJK-oriented; can corrupt normal punctuation spacing.
- [ ] **Remove link spacing** (`remove-link-spacing`) → **OPTIONAL**. Safe (trims spaces inside `[[...|alias]]`), but low value — enable only if you notice the issue.

## Paste tab

- [ ] Review **Paste Rules** separately — they only affect pasted text, not file linting, and are low-risk (trimming whitespace, fixing line breaks on paste). Enable the ones you like; they won't touch existing files.

## Rollout

- [ ] **Test on throwaway notes first.** Create two scratch notes (one with a table and a Mermaid block, one with messy headings/whitespace) and run **Command palette → "Linter: Lint the current file"**. Confirm output looks right.
- [ ] **Test on one `CLAUDE-*.md`.** Run on a single context file and verify the frontmatter (`type`, `parent`, `scope`, `last-updated`, `timestamp`) survives intact and tables still render.
- [ ] **Then lint a folder.** Use **"Lint all files in the current folder"** on one domain (e.g. `Stealth Enterprise Architecture/`) and review the diff in Sync/Git before moving on.
- [ ] **Finally, consider enabling "Lint on save"** once you're confident — or leave it manual and run vault-wide periodically.
- [ ] **Per-file opt-out:** any note can disable specific rules via a `disabled rules:` frontmatter key listing rule aliases (e.g. `yaml-timestamp`). Use this for edge-case notes rather than turning a rule off globally.

---

_Last Updated_: 2026-06-29
_Maintained By_: Alec Blair
_Source_: [Obsidian Linter documentation](https://platers.github.io/obsidian-linter/) — [General Settings](https://platers.github.io/obsidian-linter/settings/general-settings/), [YAML Rules](https://platers.github.io/obsidian-linter/settings/yaml-rules/), [Heading Rules](https://platers.github.io/obsidian-linter/settings/heading-rules/), [Spacing Rules](https://platers.github.io/obsidian-linter/settings/spacing-rules/)
