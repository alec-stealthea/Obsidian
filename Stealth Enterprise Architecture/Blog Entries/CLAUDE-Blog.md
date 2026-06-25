---
tags:
  - claude-context
scope: Stealth Enterprise Architecture/Blog Entries/Article Ideas
parent: "[[CLAUDE-Stealth-Enterprise-Architecture]]"
last-updated: 2026-05-13
---
# CLAUDE-Blog.md - Substack Editorial Guidance

> **Purpose**: This file guides Claude when working in the Blog Entries folder. It covers the editorial workflow, article development process, cross-referencing patterns, and research support for Stealth EA's Substack newsletter. For brand philosophy and operating principles, see **CLAUDE.md**. For writing style, terminology, and quality checklists, see **CLAUDE-StealthEA-Style-Guide.md**.

---

## Editorial Workflow

The Linkedin Posted folder contains the publication log for historical LinkedIn publications.

**Publishing cadence**: Weekly Wednesday Substack posts, targeting 1,000-2,000 words per article.

**Workflow steps**:

1. Draft lives as a `.md` file in `Article Ideas/`
2. When ready for editorial review, check against the process below
3. When approved, move to `Substack Articles/`

---

## Substack Article Development Process

When asked to review or prove out a draft, follow this sequence:

### 1. Assess Readiness

- Is the draft substantially complete (not a stub or placeholder)?
- Does it have a clear thesis and logical flow?
- Is it within the 1,000-2,000 word target range?

### 2. Style Guide Compliance

Run against **StealthEA-Style-Guide.md** (voice, terminology, Canadian English, formatting rules all live there). In addition to the Style Guide, watch for these blog-specific items:

- Known spelling traps: **Pizzeria** (not "pizzaria"), **Organisation** (not "organization")
- "The Stealth EA" third-person voice should appear periodically, not exclusively first-person throughout

### 3. Structural Patterns

Substack posts should follow this pattern:

- **Opening hook**: Pop culture reference, contrarian statement, or personal anecdote
- **Core sections**: 3-5 sections with `##` headers, each making a distinct point
- **Concrete examples**: Pizzeria case study and/or real-world client anecdotes
- **Closing**: The Bottom Line or similar wrap-up section
- **Reader engagement**: Italic question inviting comments (every published post has one)
- **Footnotes**: For references, asides, and links to external resources
- **Frontmatter**: Must include `feature:` (image) and ideally `published:` date

### 4. Analogy and Reference Uniqueness

Check for repeated analogies against all posts in:

- `Substack Articles/` — Published Substack articles
- `Linkedin Posted/` — Published LinkedIn articles

Flag any pop culture reference, metaphor, or signature phrase that has already appeared. The Style Guide specifies: don't repeat analogies within 6 months, vary spy themes across content, one pop culture reference per article maximum unless it's the theme.

### 5. Cross-Reference Vault Content

Link to supporting material using `[[WikiLinks]]` (see Cross-Referencing Guide below for key folders). Validate that all links resolve to actual vault files.

---

## Cross-Referencing Guide

### Key Vault Folders

| Folder | Contains | Use for |
|--------|----------|---------|
| `Case Studies/Stealth Pizzeria/` | Pizzeria domain models, value streams, capability maps | Primary teaching examples |
| `Case Studies/Hospital/` | Healthcare domain models, ED value streams | Healthcare industry examples |
| `Case Studies/Retail/` | Retail domain and capability models | Retail industry examples |
| `Enterprise Architecture/Business Architecture/` | Business architecture concepts and frameworks | Conceptual foundations |
| `Tools and Techniques/Master Architecture Data/` | MAD framework documentation | Methodology references |
| `Tools and Techniques/Glossary/` | Term definitions (Business Capability, Value Stream, etc.) | Terminology precision |
| `Stealth EA Bookshelf/` | Book references and reviews | Citation sources |

### Linking Patterns

- **Internal vault content**: Use `[[WikiLinks]]` for Obsidian cross-references
- **Published website content**: Use full URLs to `stealthea.com` when referencing content that readers can access
- **Prior Substack posts**: Use `[[WikiLinks]]` to the file in `Substack Articles/`
- **External sources**: Use standard markdown links with footnotes for references

---

## Research Support

When asked to find sources or support claims in a draft:

- **Web search** for current statistics, industry reports, and analyst commentary
- **Stealth EA Bookshelf** (`Stealth EA Bookshelf/`) for book citations already in the vault
- **Authoritative sources** to prioritise: TOGAF (The Open Group), ArchiMate specification, Business Architecture Guild, Domain Driven Design (Eric Evans, Vaughn Vernon)
- **Always provide URLs** so the author can verify independently and do additional research
- **Distinguish source types**: Specification/standard vs. analyst opinion vs. blog commentary
- **Flag when claims need citation**: If a draft makes a factual assertion without a reference, note it

---

## Folder Structure Reference

```
Blog Entries/
├── Article Ideas/
│   ├── CLAUDE-Blog.md              ← This file
│   ├── [Draft articles].md         ← Drafts at various stages
│   └── Closed Loop Analytics/      ← In-development numbered series
├── Substack Articles/              ← Published Substack articles
└── Linkedin Posted/                ← Published LinkedIn articles + Linkedin Blog History.md
```

**Substack Articles/**: Published articles. Do not edit without explicit instruction. Use as reference for voice consistency and analogy tracking.

**Linkedin Posted/**: Published LinkedIn articles. Typically shorter (750-1,200 words). Contains `Linkedin Blog History.md` as the publication log. Some topics may be expanded into Substack posts — check for overlap before drafting.

**Closed Loop Analytics/**: Numbered series on value-driven analytics. Files are sequentially dependent. When working on this series, read prior entries for continuity.

---

_Last Updated_: 2026-05-13
_Version_: 1.4
