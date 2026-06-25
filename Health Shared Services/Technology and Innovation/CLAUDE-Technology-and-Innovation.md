---
tags:
  - claude-context
type: Context File
title: CLAUDE-Technology-and-Innovation
description: Context for the Technology and Innovation folder — HSS assessments of experimental development capabilities, currently the Pronghorn AI-assisted pipeline pilot.
scope: Health Shared Services/Technology and Innovation
parent: "[[CLAUDE-HSS]]"
last-updated: 2026-06-19
timestamp: 2026-06-19T00:00:00Z
---
# CLAUDE-Technology-and-Innovation.md — Technology and Innovation Context

> **Purpose**: Context for the Technology and Innovation folder, which holds HSS assessments of emerging or experimental development capabilities. The current focus is evaluating Pronghorn as a requirements-to-code pipeline for HSS builds.

---

## Pronghorn

Pronghorn is an open-source, AI-powered software development platform built by the **Government of Alberta, Ministry of Technology and Innovation** — a "standards-first, agentic AI platform that transforms unstructured requirements into production-ready code with complete traceability." It is **MIT-licensed**, runs at [pronghorn.red](https://pronghorn.red), and is published on GitHub under the pronghorn-red organisation.

Key facts that govern any assessment work here:

- **Stage**: Government of Alberta **Alpha** testing, released "as is." Treat it as an experimental capability to pilot and watch, **not** a production commitment.
- **Model**: a Design → Build → Ship workflow, surfaced as four modes — Design (visual specification on a React Flow canvas), Audit (multi-agent cross-comparison between datasets), Build (autonomous code generation), and Present (generated project artifacts).
- **Requirements structure**: decomposes unstructured input into **Epics → Features → User Stories → Acceptance Criteria**, linking every requirement to reusable organisational **Standards** in a Global Standards Library so compliance and traceability propagate automatically. This maps closely to the HSS [[User Story Generator]] approach and to the regulatory traceability (HIA, Public Health Act) HSS deliverables require.
- **Stack**: React 18/TypeScript front end; **Supabase** (PostgreSQL with Row Level Security, Deno edge functions) back end; model-agnostic across Google Gemini, Anthropic Claude, and xAI Grok. Self-hostable, which is relevant to Alberta data-residency evaluation.
- **Why HSS cares**: a Government of Alberta-built, openly licensed asset from a sister ministry whose standards-first, traceability-driven model is conceptually compatible with HSS architecture practice.

## Folder Contents

```
Technology and Innovation/
├── Pronghorn AI Assisted Development.md                          ← Overview / capability summary of Pronghorn
└── Pronghorn Ingestion Plan - Outbreak Management Application.md  ← Worked mapping of OMRS artifacts onto the Pronghorn pipeline
```

The [[Pronghorn Ingestion Plan - Outbreak Management Application|Ingestion Plan]] is the worked example: it maps existing Outbreak Management artifacts (design, governance, user stories, value streams) onto the Pronghorn Epics → Features → Stories → AC structure, starting from the Outbreak value stream as the Epic-level skeleton. It draws on the OMRS design deck, ERD, and screen specs — see [[CLAUDE-OMRS]] for that source material. (The note's filename retains the legacy "Outbreak Management Application" wording; the system is now OMRS.)

## Working Conventions

- Day-job work — do not mix with Stealth EA intellectual property.
- Assessments here are exploratory; frame Pronghorn (and similar tools) as pilots, not production decisions, until status changes.

---

_Last Updated_: 2026-06-19
_Version_: 1.1
