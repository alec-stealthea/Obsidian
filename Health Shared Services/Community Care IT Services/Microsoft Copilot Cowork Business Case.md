---
type: Screen Specification
title: "Business Case: AI-Assisted Requirements Authoring on GitLab"
description: "I'm requesting approval for a small pilot in which myself and two Business Analysts use an AI assistant (Claude Cowork) to produce our requirements content — user stories, screen specifications, SB..."
timestamp: 2026-06-26T19:19:06Z
---

# Business Case: AI-Assisted Requirements Authoring on GitLab

## Summary

I'm requesting approval for a small pilot in which myself and two Business Analysts use an AI assistant (Claude Cowork) to produce our requirements content — user stories, screen specifications, SBARs and related artefacts — with the content stored and managed in our existing self-hosted **GitLab** server. The aim is to formalise and scale an AI-assisted authoring workflow I've been getting strong results from on my own, while keeping our content open-format, interlinked, and on infrastructure we already own and control.

## The problem

Producing requirements content for the Communicable Disease Solution is currently manual, slow, and inconsistent between authors, and it lives in OneNote — a format that doesn't give us version history, structured review, or proper cross-linking between related artefacts. I've been achieving good results authoring this material with AI assistance personally, but the approach isn't repeatable across the team and the content isn't held in a governed, version-controlled environment.

## Proposed solution

Use our existing **self-hosted GitLab (Community Edition)** as the home for this content, with each project's built-in **GitLab Wiki** as the authoring and browsing surface. The wiki stores everything as Markdown, supports native wiki-style linking between pages, renders in any web browser, and is fully version-controlled. If and when we build code, the coding artefacts live in the normal GitLab project repositories alongside the requirements — one platform for both.

An AI assistant (**Claude Cowork**) accelerates the authoring. Because a GitLab Wiki is itself a Git repository, the assistant works against a local clone of the wiki — reading our standards and source material and drafting consistent artefacts — and changes are pushed back to GitLab. Team members who don't use the AI tooling can still browse and edit the same pages directly in GitLab through the web interface, with access controlled by GitLab's role-based permissions (read-only for reviewers, edit/commit for authors, optional merge-request review for changes).

We would also build a small set of reusable prompt "skills" that encode our house standards for user stories, specifications, SBARs and other recurring artefacts, so output is consistent regardless of who authors it.

## Why this approach

It keeps our content in an **open, portable format** (Markdown) on **infrastructure we already run**, rather than locking it into a proprietary product. GitLab gives us version history, structured review, role-based access and browser-based editing out of the box, and its wiki provides the cross-linking between artefacts that is central to how this content is used — something Word and OneNote do not offer. We considered Microsoft Copilot Cowork (tightly coupled to the Microsoft stack, grounds in SharePoint/OneDrive/Teams rather than Git, and adds per-user Microsoft 365 Copilot licensing) and GitHub Copilot (a coding assistant that does not author from our content), and neither fits this content-authoring need as well as the GitLab-based approach.

## Tooling and licensing

| Item | Detail | Indicative cost |
|---|---|---|
| GitLab Community Edition | Self-hosted, already installed on our local server | No new licence cost |
| AI assistant (Claude) | Cowork capability is on Claude's paid plans; exact seat type and team minimums to be confirmed (see note) | ~$20–$30 USD / user / month range; **to be verified** |

**Licensing note to confirm before committing a figure:** Claude's Cowork capability sits on the higher seat tiers, and the Team plan currently carries a minimum seat count that may exceed our three users. I recommend we confirm the current plan, seat type, and minimums directly with the vendor (and check our own procurement/privacy requirements) before finalising cost. I've deliberately left this as a range rather than a fixed number.

## Data residency and governance

Storing the content in our self-hosted GitLab keeps the source of truth **on premises**, under our existing controls — an advantage for sensitive communicable-disease material. Two items to validate during the pilot: (1) that processing this content through a cloud AI service is acceptable under our privacy obligations (HIA), and whether an enterprise/no-retention arrangement is required; and (2) that local working copies on staff workstations are covered by our existing endpoint controls (e.g. disk encryption), since the GitLab server remains the master copy.

## Migration approach

Treat OneNote as a **one-time source**: export the existing Communicable Disease content to Markdown (using available OneNote-to-Markdown conversion tooling) and import it into the GitLab Wiki, then retire OneNote as the system of record for this material.

## Recommended next step

Approve a short **pilot**: stand up a GitLab project and wiki for the Communicable Disease Solution, migrate the existing OneNote content, build the first authoring skills, and have the three of us produce a defined set of artefacts. Use the pilot to confirm the licensing terms, the privacy position, and the day-to-day workflow before any wider rollout.

## Benefits

- Consistent, standards-based requirements artefacts across the team.
- Open Markdown format, version-controlled, with native cross-linking between artefacts.
- Content stored on infrastructure we already own and control — strong data-residency posture, no new platform dependency.
- One platform (GitLab) for both requirements content and any future coding artefacts.
- Browser-based browse/edit for all stakeholders, with role-based access control.
- A repeatable version of a workflow already proven to save significant time.

---
*Sources: [GitLab Wiki](https://docs.gitlab.com/user/project/wiki/) · [GitLab Web Editor](https://docs.gitlab.com/user/project/repository/web_editor/) · [Claude Team plan](https://support.claude.com/en/articles/9266767-what-is-the-team-plan) · [Copilot Cowork GA](https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/16/copilot-cowork-is-now-generally-available/)*
