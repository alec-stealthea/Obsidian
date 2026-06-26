HSS is looking to take the current

---

## What is Pronghorn?

Pronghorn is an open-source, AI-powered software development platform created by the **Government of Alberta, Ministry of Technology and Innovation**. It describes itself as a "standards-first, agentic AI platform that transforms unstructured requirements into production-ready code with complete traceability." Rather than being a single coding library, it is an end-to-end platform that orchestrates teams of AI agents to design, build, and ship software, carrying a thread of traceability from the original idea through to deployed code.

The platform is currently in **Alpha testing** by the Government of Alberta and is released under the permissive **MIT License**. The live application runs at [pronghorn.red](https://pronghorn.red), and the source is published on GitHub under the [pronghorn-red organisation](https://github.com/pronghorn-red/pronghorn).

### The Design → Build → Ship model

Pronghorn frames its workflow around three stages. In **Design**, it transforms ideas into structured requirements using AI decomposition. In **Build**, it generates production code with autonomous AI coding agents. In **Ship**, it deploys to cloud platforms with integrated CI/CD. The application surfaces these as four working modes: Design Mode (visual specification building on a React Flow canvas), Audit Mode (multi-agent cross-comparison between project datasets), Build Mode (autonomous code generation with real-time monitoring), and Present Mode (AI-generated project presentations).

### Standards-first traceability

The feature most relevant to an enterprise architecture practice is the **Global Standards Library** combined with hierarchical requirements. Pronghorn decomposes unstructured input into a tree of **Epics → Features → User Stories → Acceptance Criteria**, and automatically links those requirements to reusable organisational standards so that compliance and traceability propagate across every project. Updates to a standard propagate to all linked projects automatically. This requirements model maps closely to the [[User Story Generator]] approach already used in HSS, and the standards-linking concept aligns with the kind of regulatory traceability (HIA, Public Health Act) that HSS deliverables require.

### Multi-agent orchestration

Pronghorn coordinates specialised AI agents that collaborate via a shared "blackboard" for iterative refinement. Canvas design uses ten agents (Architect, Developer, DBA, Security, QA, DevOps, UX, API, Performance, and Documentation). A separate set of specification agents generates documents such as technical specifications, cloud architecture, API specifications, security analysis, accessibility (WCAG) audits, and project charters. A multi-agent **Audit** capability performs cognitive cross-comparison between datasets (for example, Requirements ↔ Canvas, or Standards ↔ Code) to surface alignment and gaps.

### Technology stack

The front end is built on React 18 with TypeScript, Vite, Tailwind CSS, shadcn/ui, and React Flow, with the Monaco (VS Code) editor for code. The back end runs on **Supabase** — PostgreSQL with Row Level Security, 53 Deno edge functions, real-time WebSocket subscriptions, and storage. The platform is model-agnostic across LLM providers, supporting Google Gemini, Anthropic Claude, and xAI Grok. It also includes full PostgreSQL database lifecycle management (one-click provisioning via Render.com, external database connections, a schema explorer, and an AI-assisted data import wizard) and a GitHub-backed repository workflow (read/edit/commit/push).

### Relevance to HSS

For HSS, Pronghorn is notable as a Government of Alberta-built, openly licensed asset coming from a sister ministry. Its standards-first, traceability-driven model is conceptually compatible with HSS architecture practices, and being MIT-licensed and self-hostable on PostgreSQL/Supabase it could in principle be evaluated against Alberta data-residency requirements. The Alpha status and "as is" liability waiver mean it should be treated as an experimental capability to watch rather than a production-ready tool at this stage.

---

_Sources:_
- [Pronghorn repository — github.com/pronghorn-red/pronghorn](https://github.com/pronghorn-red/pronghorn)
- [Pronghorn README](https://github.com/pronghorn-red/pronghorn/blob/main/README.md)
- [Pronghorn live application — pronghorn.red](https://pronghorn.red)

_Summary compiled: 2026-06-15_