---

## name: obsidian-to-publish description: > Takes an Obsidian markdown file and produces three separate publication-ready outputs: (1) a Substack article, (2) a personal LinkedIn post (Alec's voice), and (3) a Stealth EA organizational LinkedIn post. Designed for enterprise architecture and healthcare data thought leadership content.

# Obsidian to Publish Skill

## Purpose

Convert an Obsidian markdown note into three publication-ready files:

1. **`substack.md`** — A clean Substack article preserving the original heading structure, with all Obsidian-specific syntax removed.
2. **`linkedin-personal.md`** — A conversational, personal LinkedIn post in Alec's voice as an Enterprise Architect and healthcare data specialist, driving readers to the Substack article.
3. **`linkedin-stealthea.md`** — A brand-focused LinkedIn post published as the Stealth EA organization, aimed at potential clients and partners.

---

## Step 1: Parse and Understand the Source Note

Read the full Obsidian markdown file. Identify:

- The **main topic or thesis** of the note
- The **key insights or takeaways** (typically 3–5)
- The **intended audience** (infer from content — e.g., healthcare architects, data engineers, executives)
- Any **calls to action, tools, or frameworks** mentioned
- The **title** (use the H1 heading, or the filename if no H1 exists)

---

## Step 2: Produce `substack.md`

### Rules

- **Preserve all headings** (H1, H2, H3) exactly as written
- **Strip all Obsidian syntax**:
    - Remove `[[wikilinks]]` — replace with just the display text (e.g., `[[Epic Connect Care]]` → `Epic Connect Care`)
    - Remove `#tags` inline (e.g., `#healthcare` → remove entirely)
    - Remove YAML frontmatter (the `---` block at the top)
    - Remove Obsidian callouts (`> [!NOTE]`, `> [!WARNING]`, etc.) — convert to plain blockquotes or inline text
    - Remove `%% comments %%`
    - Remove `^block-references`
    - Convert `![[embedded files]]` references to a placeholder: `[Figure: <filename>]`
- **Do not rewrite prose** — preserve the author's voice and wording
- **Do not add or remove sections** — if there is no intro or conclusion in the original, do not invent one
- Output as clean markdown suitable for pasting directly into Substack's editor

### Format

```
# [Title]

[Body content with headings preserved and Obsidian syntax removed]
```

---

## Step 3: Produce `linkedin-personal.md`

### Voice & Tone

- **Conversational and personal** — written as Alec Blair, Enterprise Architect at AHS and founder of Stealth EA
- First person ("I've been thinking about...", "Something I keep running into...")
- Practitioner-to-practitioner — speaks to peers in architecture, data, and healthcare tech
- Intellectually honest — acknowledges complexity and tradeoffs rather than oversimplifying
- Warm but direct

### Structure

```
[HOOK — 1–2 sentences. A provocative observation, question, or insight that stops the scroll.]

[BODY — 3–5 bullet points or short paragraphs surfacing the key insights from the article.
Each point should feel like something the reader gains value from even without clicking through.]

[CTA — 1–2 sentences inviting the reader to read the full article.
Include the placeholder: [SUBSTACK LINK]]
```

### Rules

- Total length: **150–250 words**
- No corporate jargon or buzzword stacking
- Hashtags: 3–5 relevant hashtags at the end (e.g., `#EnterpriseArchitecture #HealthcareData #FHIR`)
- The hook must NOT start with "I" (LinkedIn algorithm penalizes this)
- Do not use em-dashes as a stylistic crutch — use them sparingly
- **Source fidelity is strict**: Every claim, example, and insight must come directly from the article. Do NOT invent new examples, add elaborations, or introduce context that is not present in the source note. If an insight needs an example, use the one from the article or omit it entirely.

---

## Step 4: Produce `linkedin-stealthea.md`

### Voice & Tone

- **Organizational voice** — this post is published as Stealth EA the organization, not as an individual author
- Use "we" framing throughout ("At Stealth EA, we see...", "We work with organizations that...")
- Do NOT attribute the post or the linked article to Alec Blair or any named individual — the organization is the publisher
- Audience: potential clients, healthcare organization leaders, data and architecture teams considering consulting engagements
- Professional but approachable — not stiff or generic
- Leads with the **business problem or organizational challenge**, not the technical detail

### Structure

```
[HOOK — 1–2 sentences framing a business challenge or organizational pain point the article addresses.]

[BODY — 3–5 bullet points or short paragraphs connecting the article's insights to
real-world enterprise or healthcare architecture challenges.
Frame insights in terms of outcomes and value, not just technical process.]

[CTA — 1–2 sentences inviting the reader to read the full article and/or connect with Stealth EA.
Include the placeholder: [SUBSTACK LINK]]
```

### Rules

- Total length: **150–250 words**
- Hashtags: 3–5 relevant hashtags at the end, including `#StealthEA` and one of `#EnterpriseArchitecture` or `#HealthcareIT`
- Avoid naming specific client organizations unless the source note explicitly includes them
- Do not duplicate the personal post — differentiate the angle (business value vs. practitioner insight)
- **Source fidelity is strict**: Every claim, example, and insight must come directly from the article. Do NOT invent new examples, add elaborations, or introduce context that is not present in the source note.

---

## Step 5: Output Files

Write three separate files to the working directory:

|File|Contents|
|---|---|
|`substack.md`|Clean Substack-ready article|
|`linkedin-personal.md`|Personal LinkedIn post (Alec's voice)|
|`linkedin-stealthea.md`|Stealth EA org LinkedIn post|

After writing all three files, summarize what was produced:

- The article title used
- The 3 key insights surfaced for the LinkedIn posts
- Any Obsidian syntax that was removed or transformed
- Any gaps noted (e.g., "No conclusion section found — none was added per skill rules")

---

## Context: About the Author

Use this context to inform tone calibration across all three outputs:

- **Alec Blair** — Enterprise Architect at Alberta Health Services (AHS), founder of Stealth EA
- Domain expertise: healthcare data systems (Epic Connect Care, Snowflake, Atlan, FHIR APIs), data lineage, enterprise architecture documentation
- Frameworks used: TOGAF, ArchiMate, IT4IT, Scaled Agile
- Personal interests visible in writing: pragmatic problem-solving, bridging technical and business perspectives, knowledge management (Obsidian), and making complex systems understandable
- Stealth EA audience: healthcare organizations, data architecture teams, enterprise teams evaluating consulting support

---

## Example Obsidian Syntax Transformations

| Input                        | Output                  |
| ---------------------------- | ----------------------- |
| `[[Connect Care]]`           | `Connect Care`          |
| `#healthcare #FHIR`          | _(removed)_             |
| `> [!NOTE] Important caveat` | `> Important caveat`    |
| `%% draft note to self %%`   | _(removed)_             |
| `![[diagram.png]]`           | `[Figure: diagram.png]` |
| YAML frontmatter block       | _(removed)_             |