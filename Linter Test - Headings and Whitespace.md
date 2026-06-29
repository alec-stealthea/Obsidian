---
type: Note
title: Linter Test - Headings and Whitespace
description: Disposable test fixture for validating Linter rules around blank-line-after-YAML, heading increment, heading blank lines, consecutive blank lines, and trailing spaces. Safe to delete after testing.
tags: [linter, test-fixture]
last-updated: 2026-06-29
timestamp: 2026-06-29T00:00:00Z
---

## Headings and Whitespace Test

This file has no blank line between the YAML frontmatter and the H1 above, which the "Add blank line after YAML" rule should fix.

### Skipped to H4 from H1

The heading above jumps from level 1 to level 4, which Header Increment should correct.

## Back to H2

This line has trailing spaces that should be removed.
This line ends with two trailing spaces that should be PRESERVED if Two Space Linebreak is on.  

There are two consecutive blank lines above this line that should collapse to one.
###No space after the hashes
The heading above is missing a space; Headings Start Line / spacing rules and your review will catch it.

## Heading with trailing punctuation

Content under a heading whose trailing period is removable via Remove Trailing Punctuation in Heading.
