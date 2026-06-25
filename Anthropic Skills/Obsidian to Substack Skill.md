---

## name: obsidian-to-substack description: Convert Obsidian markdown files to Substack format and generate LinkedIn promotional copy for both personal and company pages. Handles wikilinks, footnotes, and creates thought leadership content.

# Obsidian to Substack Converter with LinkedIn Copy

This skill converts Obsidian markdown files into Substack-ready format and generates accompanying LinkedIn promotional copy optimized for both personal profiles and company pages.

## When to Use This Skill

Use this skill when you need to:

- Convert Obsidian markdown articles to Substack format
- Generate LinkedIn promotional copy for blog posts
- Create differentiated content for personal vs company social media
- Handle Obsidian-specific syntax (wikilinks, footnotes) that isn't Substack-compatible

## Core Capabilities

### 1. Markdown Conversion

- **Wikilinks**: Convert `[[Article Title]]` to plain text or standard markdown links
- **Footnotes**: Preserve or convert inline footnotes to Substack's supported format
- **Metadata**: Strip or preserve YAML frontmatter as needed
- **Formatting**: Maintain headers, lists, emphasis, and code blocks
- **Images**: Convert image links to Substack-compatible format

### 2. LinkedIn Copy Generation

Creates two distinct versions:

**Personal LinkedIn (First-Person)**

- Thought leadership tone with industry insights
- Personal voice: "I explored...", "My latest article..."
- Focus on expertise and professional perspective
- Length: 150-250 words
- Includes relevant hashtags and call-to-action

**Company LinkedIn (Third-Person/Organizational)**

- Organizational voice: "Stealth EA explores...", "Our latest insights..."
- Enterprise architecture and consulting focus
- Professional positioning for the firm
- Length: 100-180 words
- Emphasizes value to potential clients

## Workflow

When the user provides an Obsidian markdown file:

1. **Analyze the Input**
    
    - Identify Obsidian-specific syntax (wikilinks, footnotes, metadata)
    - Determine article topic, key themes, and target audience
    - Extract title and subtitle if present
2. **Convert to Substack Format**
    
    - **Wikilinks**: Replace `[[Article Title]]` with plain text or convert to standard markdown links `[Article Title](url)` if URL provided
    - **Footnotes**: Ensure proper markdown footnote syntax that Substack supports
    - **Metadata**: Remove YAML frontmatter unless user requests preservation
    - **Formatting**: Verify all standard markdown is Substack-compatible
    - **Images**: Convert to `![alt text](image-url)` format
    - **Clean output**: Ensure proper spacing and readability
3. **Generate LinkedIn Copy - Personal** Write 150-250 word post with:
    
    - **Hook**: Compelling first line that captures attention
    - **Insight**: First-person perspective on the topic (thought leadership)
    - **Value**: What readers will gain from the article
    - **Call-to-action**: Link to article with clear reason to read
    - **Hashtags**: 3-5 relevant industry hashtags
    - **Tone**: Professional but conversational, showcasing expertise
4. **Generate LinkedIn Copy - Company** Write 100-180 word post with:
    
    - **Hook**: Industry challenge or insight relevant to EA/consulting
    - **Content**: Third-person description of article value
    - **Positioning**: How this demonstrates Stealth EA's expertise
    - **Call-to-action**: Professional invitation to read
    - **Hashtags**: 3-5 relevant to enterprise architecture and consulting
    - **Tone**: Professional, authoritative, organizational voice
5. **Present Results** Deliver three separate outputs:
    
    - Substack-formatted markdown (ready to paste)
    - Personal LinkedIn copy
    - Company LinkedIn copy

## Handling Edge Cases

### Complex Wikilinks

- Internal links without context: Convert to plain text
- Links with aliases `[[Article|Display Text]]`: Use display text
- Links to specific headers `[[Article#Section]]`: Convert to plain text or standard link

### Footnotes Variations

- Inline footnotes: `^[footnote text]`
- Reference footnotes: `[^1]` with definition elsewhere
- Ensure Substack compatibility (supports reference-style)

### Metadata Handling

- Ask user if they want to preserve any frontmatter as Substack metadata
- Extract title/subtitle for LinkedIn copy creation
- Remove Obsidian-specific fields (tags, aliases, etc.)

### Image Links

- Obsidian format: `![[image.png]]`
- Convert to: `![description](https://image-url.com/image.png)`
- Alert user if images need upload/hosting

## Output Format

Present results clearly with section headers:

```markdown
## Substack-Ready Article
[converted markdown here]

## LinkedIn Copy - Personal
[first-person thought leadership post]

## LinkedIn Copy - Stealth EA Company Page
[third-person organizational post]
```

## Quality Guidelines

### Substack Conversion

- Preserve the author's voice and style
- Maintain article structure and flow
- Ensure all formatting renders correctly in Substack
- Verify no Obsidian syntax remains

### LinkedIn Copy

- **Personal**: Balance authority with approachability
- **Company**: Professional gravitas, client-focused value
- Both should intrigue without revealing everything
- Clear differentiation between the two voices
- Natural integration of hashtags (not spam-like)

## User Interaction

- If article topic is unclear, ask for context to improve LinkedIn copy
- If wikilinks need URLs, ask user for target destinations
- If images are referenced, confirm whether to include placeholder or specific URLs
- Offer to adjust LinkedIn copy length or tone if needed

## Example Transformation

**Input** (Obsidian):

```markdown
---
title: Data Lineage in Healthcare
tags: [healthcare, data, architecture]
---

# Data Lineage in Healthcare

Understanding data lineage is critical for [[FHIR]] implementations...

This becomes especially important when working with [[Epic Connect Care]][^1].

[^1]: Epic's flagship EHR system
```

**Output** (Substack):

```markdown
# Data Lineage in Healthcare

Understanding data lineage is critical for FHIR implementations...

This becomes especially important when working with Epic Connect Care[^1].

[^1]: Epic's flagship EHR system
```

**LinkedIn Personal**: I've been deep in the trenches of healthcare data lineage lately, and the patterns I'm seeing are fascinating. When you're implementing FHIR standards across enterprise health systems, the complexity of tracking data provenance becomes exponentially more critical... [continues with personal insights and CTA]

**LinkedIn Company**: Stealth EA's latest insights explore why data lineage is the foundation of successful FHIR implementations in healthcare. Drawing from real-world enterprise architecture experience, this article examines... [continues with organizational voice and CTA]

## Additional Considerations

- **SEO**: Maintain article structure that works for both Substack's platform and search
- **Readability**: Ensure paragraph breaks and formatting enhance readability
- **Links**: Verify external links are properly formatted
- **Tone Consistency**: Substack article voice should align with personal LinkedIn tone
- **Company Differentiation**: Stealth EA copy should reflect consulting expertise positioning