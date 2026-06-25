---
tags:
  - claude-context
scope: Stealth Enterprise Architecture
parent: "[[CLAUDE]]"
last-updated: 2026-05-13
---
# CLAUDE-Stealth-Enterprise-Architecture.md - Stealth EA Context & Guidance

> **Purpose**: This file provides Claude (and other AI assistants) with essential context about Stealth EA, its methodology, philosophy, and key principles. Read this file first when working on any Stealth EA content or deliverables.

---

## About Stealth EA

### Mission Statement

Navigate the labyrinth of enterprise architecture without losing our minds – or our sense of humour. We demystify EA, cut through jargon, and inject much-needed personality into this noble profession.

### Core Tagline

**"Be very, very quiet - we're modelling an enterprise's architecture"**

This captures our stealth approach: influence through expertise rather than authority. We're tactical, subtle, and effective - like spies operating in the business architecture domain.

---
## Philosophy & Principles

### Serious Work, Seriously Fun

We are dead serious about enterprise architecture, but we refuse to take ourselves too seriously. The industry can feel like buzzword bingo - we cut through that with clarity, humour, and practical wisdom.
### Why "Stealth"?

Enterprise Architects succeed through **influence rather than authority**:

- Use persuasion and relationship management alongside design expertise
- Accept that project managers and leaders will represent our work as theirs
- Tactfully and subtly say "I told you so" when rejected recommendations become the path forward
- Focus on making others more successful, not on claiming credit

**Key Insight**: Most people don't care HOW we create designs, just that they work. We get nowhere explaining our process. People care about how we make them more successful.
### Core Operating Principles

1. **Make Others More Successful**  
    EA should enable, not constrain. Architecture exists to help stakeholders achieve their goals.
2. **Embrace "Good Enough"**  
    Perfect models shared late are less valuable than useful models shared early. Aim for 80% accuracy with continuous refinement.
3. **Stay Relevant**  
    Always consider your audience and their needs. Architecture that doesn't connect to business decisions is just expensive art.
4. **Show, Don't Tell**  
    Demonstrate value through results, not rhetoric. Let the work speak for itself.
5. **Influence Through Expertise**  
    Build credibility through deep knowledge and practical solutions, not through organizational authority.

---

## What Stealth EA Is NOT About

### 1. Foundational Learning

This practice assumes practitioners are experienced Enterprise Architects seeking next-level content. We don't teach EA basics - we advance the practice.

Where foundational concepts are needed, we provide links to freely available resources rather than rehashing introductory material.

### 2. Framework Wars

We don't care if you like or don't like TOGAF, FEAF, OMG, or any other EA framework. We appreciate people trying to apply enterprise architecture successfully within their organizations.

**Our Position**: Use whatever framework helps you succeed. We happen to work with TOGAF and ArchiMate because they're widely adopted and we've contributed to their development, but the framework is a tool, not a religion.

### 3. Theoretical Purity

We're not academics building perfect theoretical models. We're practitioners solving real business problems in messy organizations with limited time and resources.

---

## Content Strategy

### Target Audience

**NOT Beginners**: Assume experienced EA practitioners who want to advance their practice.

**Primary Personas**:

1. **Seasoned Practitioners**: 10+ years, looking for fresh perspectives
2. **EA Leaders**: Building or maturing EA practices
3. **Business Architects**: Focused on capabilities and value streams
4. **Solution Architects**: Connecting solution design to business architecture

### Content Channels

**Substack Newsletter**: Long-form thought leadership (primary platform)  
**LinkedIn Articles**: Professional visibility and community engagement  
**Obsidian Knowledge Base**: Methodology documentation and reference material that is published using Obsidian Sync to the www.stealthea.com website 
**Client Deliverables**: Templates, frameworks, and practical guides

### Content Themes

1. **Practical Methods**: How-to guidance for real EA work
2. **Communication & Influence**: Making architecture compelling to stakeholders
3. **Professional Development**: Growing as an EA practitioner
4. **Industry Commentary**: Observations on the EA profession and community

---

## Technical Stack & Tools

### Core EA Tools

- **Archi**: Primary ArchiMate modeling tool (open source) www.archimatetool.com
- **jArchi**: JavaScript scripting for Archi automation
- **coArch:** for sharing Archi models into a Git repository
- **ArchiMate**: Modeling notation standard
### Knowledge Management

- **Obsidian**: Primary knowledge repository with selected content published using Obsidian Sync to the www.stealthea.com website.
- **Markdown**: All content in portable markdown format
- **Git**: Version control for methodology and content

---

## Working With This Repository

### Vault Structure

```
Stealth Enterprise Architecture/
├── Archi Export/                    ← Exported ArchiMate models from Archi
├── Blog Entries/                   ← Drafts, published Substack & LinkedIn articles (see CLAUDE-Blog.md)
├── Case Studies/                   ← Stealth Pizzeria, Hospital, Retail, Retail Mortgage
├── Enterprise Agile/               ← Agile practices, roadmaps, Jira implementation
├── Enterprise Architecture/        ← Core EA disciplines (Business, Application, Information, Technology, Risk)
├── Glossary/                       ← Term definitions (ArchiMate, Knowledge Graph, Motivation)
├── Professional Skills/            ← EA practitioner development
├── Services/                       ← Stealth EA service offerings
├── Stealth EA Bookshelf/           ← Book references and reviews
├── Tools and Techniques/           ← MAD framework, glossary, key deliverables, languages, models
└── attachments/                    ← Images and media referenced by vault content
```

### Content Cross-References

Follow the WikiLinks and cross-referencing conventions in the root `CLAUDE.md`. Within this folder, link liberally between related concepts — build a web of knowledge, not isolated documents.

---

## Common Anti-Patterns to Avoid

### In Methodology

- ❌ Unlimited model complexity (constraint forces clarity)
- ❌ Capability catalogs over 100 entries (you're modeling instances)
- ❌ Value streams without trigger events (that's a process)
- ❌ Domains based on org structure (they're business context boundaries)
- ❌ Architecture without stakeholder connection (expensive art)

### In Business

- ❌ Competing on price (compete on value and expertise)
- ❌ Scope creep without adjustment (manage boundaries)
- ❌ Promising perfection (promise practical results)
- ❌ Ignoring cross-border implications (Canada-US considerations)
- ❌ Under-valuing IP (frameworks are assets)

---

## Contact & Attribution

Founder and location details are in the root `CLAUDE.md`.

**Professional Affiliations**:

- The Open Group (TOGAF contributor)
- Business Architecture Guild (VBA collaboration)

**Content License**:

- All Stealth EA original content © Stealth EA
- MAD framework and methodologies are proprietary intellectual property
- Client deliverables and templates available under specific licensing
- Published articles and blog posts remain copyrighted unless explicitly stated

**Attribution Requirements**:

- When referencing Stealth EA methodologies, cite source
- When using MAD framework, acknowledge Stealth EA
- When adapting templates, maintain attribution
- When quoting articles, link to original publication

---

## Working With Claude (and Other AI Assistants)

The root `CLAUDE.md` covers universal rules (Canadian English, WikiLinks, source attribution, flagging contradictions, no over-formatting). The following are **additional Stealth EA-specific** guidance.

### What Claude Can Help With

- Content creation following Stealth EA voice and style (see `StealthEA-Style-Guide.md`)
- Technical writing and methodology documentation
- Cross-border compliance research
- Client deliverable development
- Quality checking for consistency and voice

### Additional Rules for This Domain

- **Follow the Style Guide** (`StealthEA-Style-Guide.md`) for voice, tone, formatting, and forbidden terminology
- **Respect the "one-page constraint"** for architectural models
- **Reference authoritative sources** (TOGAF, ArchiMate, DDD) and distinguish between standards and Stealth EA extensions
- **Connect to business value** — show both what to do and what to avoid, with concrete examples
- **No framework evangelism** or methodology wars
- **No theoretical academic writing** without practical grounding
- **No repeating analogies** or pop culture references already used (check prior posts)

### Collaboration Approach

Think of Claude as a **research assistant and content editor** for an experienced EA practitioner, not as the subject matter expert. Claude helps organise thoughts, maintain consistency, research supporting information, and polish writing — but the EA expertise and strategic direction come from the human practitioner.

---

_Last Updated_: 2026-05-13
_Maintained By_: Alec Blair, Stealth EA
_Version_: 1.4

---

**Remember**: Stealth EA exists to make enterprise architecture accessible, actionable, and even enjoyable. We influence through expertise, enable others' success, embrace "good enough", and never lose our sense of humour in the process. If architecture work isn't making someone's job easier or decisions clearer, we're doing it wrong.

_Now get out there and model some architecture - stealthily, of course._