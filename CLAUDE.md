---
tags:
  - linker-exclude
---
# CLAUDE.md — Alec Blair's Obsidian Vault

> **Purpose**: Root-level context file for Claude (and other AI assistants) working across this Obsidian vault. This vault is a single repository spanning multiple facets of Alec Blair's professional and personal life. Read this file first, then read the relevant folder-level CLAUDE files before working in any specific area.

---

## Vault Owner

**Alec Blair**
- Location: Calgary, Alberta, Canada
- 25+ years enterprise architecture experience
- Co-author of TOGAF Business Capability Planning guidance
- Healthcare, Oil and Gas, Financial Services and retail domain expertise
- Founder of Stealth EA (sole proprietorship, est. 2023)
- Board member and marketing committee chair for Revv52
- Enterprise Architect at Alberta Health Shared Services within the Community Care Services digital health portfolio representing Public Health, Emergency Health Services, Continuing Care and Mental Health.

**Working Style**: Practical over theoretical. Results-focused. Collaborative. "Embrace good enough" philosophy. Seriously professional, playfully irreverent.

---

## Memory System

This vault uses a distributed context system built from `CLAUDE-*.md` files. These files serve as persistent memory — they store the context Claude needs to work effectively in each area of the vault, and they evolve over time as new work reveals new context.

### How It Works

The system is hierarchical. This root `CLAUDE.md` file is the entry point. It describes the vault structure, cross-cutting conventions, and points to domain-level context files. Each domain-level context file may in turn reference deeper context files in its subfolders. Claude navigates this tree by reading the root file first, then following references downward into the relevant domain.

The context files form a linked chain: **root → domain → subfolder → topic**. Each file is responsible for knowing about the context files one level below it. This means the root file does not need to enumerate every context file in the vault — it only needs to reference the top-level domain files, and each of those references its own children.

### Naming Convention

All context files follow the pattern `CLAUDE-[Name].md` where `[Name]` uses hyphens for spaces and reflects the folder or topic the file describes. Each context file lives in the folder it describes.

Examples: `CLAUDE-HSS.md` lives in `Health Shared Services/`, `CLAUDE-Marketing.md` lives in `Revv52/Marketing/`, `CLAUDE-Blog.md` lives in `Stealth Enterprise Architecture/Blog Entries/Article Ideas/`.

### Context File Anatomy

Every CLAUDE-*.md file should include, at minimum:

1. **Purpose statement** — one or two sentences describing what this context file covers and why it exists.
2. **Scope** — what folder or topic area this file governs, and any child context files it references.
3. **Key facts** — the essential context Claude needs to work effectively in this area (people, conventions, decisions, preferences, constraints).
4. **Working conventions** — any rules, style guidance, or workflows specific to this area.
5. **Footer** — `_Last Updated_` date so Claude (and Alec) can gauge freshness.

Not every file needs elaborate detail. A show-specific context file might be ten lines; a domain-level file might be several pages. The goal is to capture what's needed, not to write documentation for its own sake.

### Context Update Protocol

Context files are living documents. They should be updated when sessions reveal new context that would be useful in future sessions. The update protocol is:

1. **Detect**: While working in any area of the vault, Claude should notice when it encounters new context that isn't captured in the relevant CLAUDE-*.md file — new preferences, decisions, corrections, structural changes, or learned conventions.
2. **Propose**: Claude proposes the specific update to Alec, quoting the new content and explaining why it should be persisted. Claude does not update context files silently.
3. **Approve**: Alec reviews and approves (or modifies) the proposed update.
4. **Apply**: Claude makes the approved edit and updates the `_Last Updated_` footer.

If a session's work suggests a new CLAUDE-*.md file should be created (e.g., a new subfolder has accumulated enough context to warrant its own file), Claude should propose its creation following the same review-and-approve flow. The parent context file should then be updated to reference the new child.

**Standing exception — the `vault-context-sweep` scheduled task.** Alec has authorized the daily `vault-context-sweep` automation to *auto-apply* (rather than propose) a bounded set of context-maintenance edits for notes changed in roughly the prior 24 hours: updating existing CLAUDE-*.md context files, creating new CLAUDE-*.md files and wiring them into the hierarchy, and adding missing OKF frontmatter to changed content notes. This overrides the Detect → Propose → Approve → Apply flow for those specific edits only. The automation still operates under guardrails — it does not write body content into empty/stub notes, does not bake unresolved or still-draft decisions into context, does not edit or quote personal-folder note bodies (Daily Reflections/, Personal Note/, Personal Information/), does not create dangling WikiLinks, and reports a changelog of every change so Alec can audit or revert. All *interactive* (non-scheduled) sessions continue to follow the standard propose-and-approve protocol.

### YAML Frontmatter

Every CLAUDE-*.md context file should carry a standard YAML frontmatter block. This makes context files queryable via Obsidian search and gives Claude structured metadata to work with programmatically.

Standard fields:

```yaml
---
tags:
  - claude-context
scope: Folder/Path/This/File/Governs
parent: "[[CLAUDE-Parent-File]]"
last-updated: YYYY-MM-DD
---
```

- **tags** — always include `claude-context`. Additional tags are optional and domain-specific.
- **scope** — the vault-relative folder path this context file governs (e.g., `Revv52/Marketing`).
- **parent** — a WikiLink to the parent context file in the hierarchy. The root `CLAUDE.md` has no parent. Domain-level files point to the root. Subfolder files point to their domain file.
- **last-updated** — the date this file was last meaningfully updated. This duplicates the footer convention but in a machine-readable format. When updating a context file, update both the frontmatter `last-updated` and the footer `_Last Updated_` date.

The root `CLAUDE.md` uses `linker-exclude` in its tags instead of `claude-context` because it serves a different structural role and should not participate in the Virtual Linker plugin's auto-linking.

### Context Freshness

Every CLAUDE-*.md file carries a `last-updated` date in both its frontmatter and footer. When Claude reads a context file and notices it appears stale (references outdated information, missing recent structural changes, or contradicts what's visible in the folder), it should flag this to Alec and propose updates.

---

## Vault Structure Overview

This vault serves as a unified knowledge base across several distinct life domains. Each major folder has its own purpose and, where noted, its own CLAUDE guidance file that should be read before working in that area. Child context files within each domain are referenced by the parent context file — consult the parent to discover what's below it.

### Professional — Stealth EA (Side Hustle / Consulting Practice)

| Folder | Purpose | Context File |
|---|---|---|
| `Stealth Enterprise Architecture/` | Methodology, blog content, case studies, glossary, tools & techniques for the Stealth EA thought leadership practice. Published to www.stealthea.com via Obsidian Sync. | `CLAUDE-Stealth-Enterprise-Architecture.md` |
| `Stealth EA LLC/` | Business operations — contracts, financials, style guide, trade name declarations, client engagements (e.g. Aberdeen). | `CLAUDE-Stealth-EA-LLC.md` |

Child context files: `CLAUDE-Blog.md` in `Stealth Enterprise Architecture/Blog Entries/Article Ideas/` (referenced by `CLAUDE-Stealth-Enterprise-Architecture.md`).

### Professional — Day Job (Alberta Health Shared Services)

| Folder | Purpose | Context File |
|---|---|---|
| `Health Shared Services/` | Enterprise architecture deliverables for the IT Community Portfolio — Continuing Care, Emergency Health Services, Population & Public Health, Addiction & Mental Health. | `CLAUDE-HSS.md` |
| `Health Shared Services/Primary Care Alberta/` | Context for Primary Care Alberta agency (primary care, public health, community diagnostics). | `CLAUDE-PCA.md` |

### Member — Revv52

| Folder | Purpose | Context File |
|---|---|---|
| `Revv52/` | Strategic planning, board work, and show content for Revv52, a non-profit choral performance group in Calgary. | `CLAUDE-Revv52.md` |
| `Revv52/Marketing/` | Marketing strategy, campaign plans, brand toolkit, and per-season/per-show content. | `CLAUDE-Marketing.md` |

Child context files: `CLAUDE-2025-2026-Season.md`, `CLAUDE-Strings-Attached.md`, `CLAUDE-Classical-Collision.md` (referenced by `CLAUDE-Marketing.md`).

### Personal

| Folder | Purpose | Context File |
|---|---|---|
| `Personal Information/` | Values, motivations, habits, life planning, financial plans, coaching outputs. | `CLAUDE-Personal.md` |
| `Personal Information/Spark for Life Coaching/` | Full outputs from 2023 coaching engagement with Lisa at Spark Consulting. | `CLAUDE-Spark.md` |
| `Daily Reflections/` | Daily journal entries following a gratitude/reflection template. Private and personal. | — |
| `Personal Note/` | Miscellaneous personal notes (meeting notes, analysis). | — |

### Research & Learning

| Folder | Purpose | Context File |
|---|---|---|
| `Research/` | Curated research across multiple domains — architecture industry (IASA, Open Group), healthcare, policy (CD Howe, Canada West Foundation), AI, ontologies, agile methods, productivity. Includes web clippings. | — |
| `Research/Clippings/` | Web clippings organised by topic: Agile Data, Agile Waterfall, AI, Enterprise Architecture, Personal Productivity, Podcast Reviews, The Ontologist. | — |

### Vault Infrastructure

| Folder | Purpose | Context File |
|---|---|---|
| `Health Shared Services/ATLAS/` | Architecture solution models (Communicable Disease, Compassionate Intervention, Placement). Part of the Health Shared Services folder — see `CLAUDE-HSS.md`. | — |
| `Templates/` | Obsidian templates — Daily Plan, Meeting Notes. Used with Templater plugin. | — |
| `Anthropic Skills/` | Skill definitions and documentation for Claude workflows. See the Skills Management section below. | — |
| `Meetings/` | Hyprnote meeting transcriptions, chat logs, and participant data. Managed by the Hyprnote application. | — |
| `thumbnails/` | Auto-generated image thumbnails for the vault. Do not modify. | — |
| `.obsidian/` | Obsidian configuration. Plugins: Featured Image, Importer, Kanban, Paste Image Rename, Templater, Virtual Linker. Do not modify directly. | — |

---

## Skills Management

The `Anthropic Skills/` folder is the vault's canonical home for skill definitions — reusable prompt-driven workflows that Claude can reference and execute. Skills are distinct from context files: context files store *what Claude needs to know*, while skills store *what Claude needs to do*.

### Current Skills

| Skill File | Purpose |
|---|---|
| `Obsidian to Substack Skill.md` | Convert Obsidian markdown to Substack format with LinkedIn promotional copy. |
| `Publish Substack Article.md` | End-to-end Substack publishing workflow. |
| `User Story Generator.md` | Generate user stories from requirements or domain context. |
| `HSS Screen Specification Generator.md` | Generate consistent HSS screen specifications (wireframe-to-build mapping, field-mapping tables) across OMRA and other Community Care Services application screens. |

### Skill Conventions

Skill files should follow a consistent structure: name, description, when to use, step-by-step instructions, and any required inputs or outputs. When Claude builds or refines a skill during a session, the updated definition should be saved back to `Anthropic Skills/`. As with context files, Claude should propose skill changes for Alec's review before writing them.

When a new skill is created or an existing one is substantially revised, Claude should note the change and update this section of the root CLAUDE.md if the skill warrants listing here. Minor refinements to existing skills do not require a root-level update.

---

## Cross-Cutting Conventions

### Open Knowledge Format (OKF) Conformance

Every markdown file created or updated in this vault MUST conform to the [[OKF SPEC|Open Knowledge Format v0.1]] specification stored at the vault root. The conformance rules are:

1. **Frontmatter required** — every `.md` file (except reserved `index.md` and `log.md` files) must open with a parseable YAML frontmatter block delimited by `---`.
2. **`type` field required** — the frontmatter must include a non-empty `type` field describing the kind of concept (e.g., `Journal Entry`, `Architecture Deliverable`, `Blog Draft`, `Meeting Note`, `Reference`, `Context File`, `Skill`, `Research Clipping`).
3. **Recommended frontmatter fields** — include these when applicable:
   - `title` — human-readable display name
   - `description` — one-sentence summary
   - `tags` — YAML list of short categorisation strings
   - `timestamp` — ISO 8601 datetime of last meaningful change (e.g., `2026-06-17T00:00:00Z`)
4. **Reserved filenames** — `index.md` and `log.md` follow the OKF directory listing and update log formats respectively (no frontmatter; specific body structure).
5. **Cross-links** — use OKF bundle-relative links (`/path/to/concept.md`) for references between vault documents in addition to Obsidian WikiLinks where appropriate.

When adding frontmatter to an existing file, preserve all existing YAML fields and add any missing required or recommended OKF fields. Do not remove existing Obsidian-specific frontmatter keys (e.g., `parent`, `scope`, `last-updated`).

### Language & Spelling
- **Canadian English** throughout the vault (colour, centre, catalogue, defence, honour, etc.)
- See the `StealthEA-Style-Guide.md` in `Stealth Enterprise Architecture/` for detailed terminology standards when working on Stealth EA content

### Obsidian Conventions
- Markdown format for all content
- Images and attachments go in `Stealth Enterprise Architecture/attachments/` for Stealth EA content or alongside the referencing note for other areas
- Favicon and logo assets are at the vault root (for website use)

### WikiLinks — Linking Between Notes

WikiLinks are the connective tissue of this vault. They make the knowledge graph navigable in Obsidian's graph view and backlinks panel, and they help Claude discover related context when working in any area. Use `[[WikiLinks]]` for all internal vault references; use standard markdown links (`[text](url)`) only for external URLs.

**Linking within context files.** Each CLAUDE-*.md file should WikiLink to its child context files and to key reference documents within its scope, rather than just mentioning filenames in backticks. For example, `CLAUDE-Marketing.md` should contain `[[CLAUDE-2025-2026-Season]]` so the context chain is clickable inside Obsidian. This makes the memory system navigable both for Claude (who reads the files) and for Alec (who browses the graph).

**Linking when creating or editing content.** When Claude writes a new note or edits an existing one, it should search for related existing notes and link to them. Prefer linking to a specific note over restating its content. Use display aliases when the note title is unwieldy: `[[CLAUDE-Stealth-Enterprise-Architecture|Stealth EA Context]]`. Use heading links to point to a specific section of a longer document: `[[Note Title#Section]]`.

**Link hygiene.** Do not create links to notes that don't exist yet — Obsidian renders these as unresolved links, which creates noise in the graph. If a note *should* exist but doesn't, flag it to Alec rather than creating a dangling link. When renaming or moving notes, check for and update any incoming WikiLinks that would break.

**Note on `linker-exclude`.** The root `CLAUDE.md` carries the `linker-exclude` tag to prevent Obsidian's Virtual Linker plugin from auto-linking every note name that appears in the vault structure tables. Domain-level and subfolder context files should *not* carry this tag — they should participate fully in Obsidian's link graph.

### Diagrams

Use [Mermaid](https://mermaid.js.org/) for diagrams throughout the vault rather than ASCII art, embedded images, or external diagramming tools, so diagrams render natively in Obsidian and stay version-controllable as text.

**Sequence diagrams in particular** must use Mermaid `sequenceDiagram` syntax. This applies to any diagram depicting an ordered exchange of messages, calls, or events between systems, components, or actors — conceptual flows, integration message flows, interface handshakes, and the like. Do not represent sequence/flow diagrams as ASCII boxes-and-arrows. When editing an existing note that contains an ASCII or image-based sequence diagram, convert it to a Mermaid `sequenceDiagram` as part of the edit.

Place Mermaid in a fenced ```mermaid code block. Other Mermaid diagram types (`flowchart`, `classDiagram`, `erDiagram`, etc.) are appropriate for their respective uses; choose `sequenceDiagram` whenever the intent is to show interactions over time.

### Content Sensitivity
- `Daily Reflections/` and `Personal Note/` are private — treat with discretion
- `Health Shared Services/` contains work-related architecture deliverables — do not mix with Stealth EA intellectual property
- `Stealth EA LLC/` may contain contracts and financial documents — handle appropriately
- `Personal Information/` contains personal values, financial plans, and coaching outputs — handle with discretion
- `Meetings/` contains transcription data managed by Hyprnote — do not restructure

### Domain Boundaries
This vault deliberately spans separate professional and personal domains. When working across areas, keep these boundaries clear:

- **Stealth EA content** (methodology, blog, IP) stays in `Stealth Enterprise Architecture/`
- **Stealth EA business operations** (contracts, finance) stay in `Stealth EA LLC/`
- **Day job deliverables** stay in `Health Shared Services/` and `ATLAS/`
- **Revv52 work** stays in `Revv52/`
- **Personal context** stays in `Personal Information/`
- **Research** in `Research/` can feed into any domain but should be attributed when used

---

## Working With This Vault

### Before Creating or Editing Content

1. **Read the root CLAUDE.md** (this file) to orient yourself.
2. **Read the folder-level CLAUDE file** for the area you're working in (if one exists), and any child context files it references.
3. **Check for existing content** on the topic before creating new notes.
4. **Respect the folder structure** — place content in the appropriate domain folder.
5. **Cross-reference** related notes using WikiLinks.
6. **Provide source attribution** for research and external references so Alec can follow up with original sources.

### What Claude Should Always Do

- Add or verify OKF-conformant frontmatter (with at minimum a `type` field) on every markdown file created or edited
- Use Canadian English spelling
- Use Mermaid for diagrams — `sequenceDiagram` for any message/event/call flow between systems or actors (see Diagrams convention above)
- Follow the style and voice guidance specific to each domain (Stealth EA has a detailed style guide; Revv52 has its own brand voice)
- Flag contradictions with existing content
- Cite sources and provide links for further research when applicable
- Maintain the separation between professional domains
- Read relevant CLAUDE context files before starting work in any subfolder
- Propose updates to context files when new persistent context is discovered (see Context Update Protocol above)
- Flag stale context files when noticed

### What Claude Should Avoid

- Mixing content across domain boundaries without explicit instruction
- Modifying vault infrastructure (`.obsidian/`, `thumbnails/`, `Meetings/` internal structure)
- Creating content that contradicts established positions in existing CLAUDE context files
- American English spelling
- Over-formatting with excessive bullets and lists (write in prose where appropriate)
- Updating context files without Alec's explicit approval

---

_Last Updated_: 2026-06-24
_Maintained By_: Alec Blair
_Version_: 2.3
