---
type: Design Note
title: Communicable Disease Glossary — Category Hierarchy & Design Rationale
description: Starting taxonomy and Atlan glossary category design for the Communicable Disease Glossary, derived from the Alberta disease-management guidelines and notifiable-disease reference set.
tags:
  - claude-context
  - communicable-disease
  - glossary
  - atlan
  - taxonomy
  - data-governance
scope: Health Shared Services/Primary Care Alberta/Public Health/Communicable Diseases/Communicable Disease Glossary
timestamp: 2026-06-23T00:00:00Z
last-updated: 2026-06-23
---
## Purpose

This note proposes a starting taxonomy for the **Communicable Disease Glossary** to be built in **Atlan**. It defines the category hierarchy, explains the design rationale, and maps the design onto Atlan's glossary model so it can be imported and extended. The companion file `Communicable Disease Glossary - Atlan Import.csv` in this folder implements the hierarchy and supporting concept terms in Atlan's bulk-import format.

The taxonomy is derived from two evidence bases already held in the vault:

1. The **104 Alberta Public Health Disease Management Guidelines** (`../Communicable Disease Management/Disease Guidelines/`), each of which follows a consistent section structure (Case Definition, Reporting Requirements, Etiology, Clinical Presentation, Diagnosis, Treatment, Transmission, Incubation Period, Period of Communicability, Public Health Management).
2. The **reference set** (`../Communicable Disease Management/Reference Documents/`): the Reportable Reference List, the Laboratory Reporting Reference, the Public Health Notifiable Disease Management Guidelines (with its Definitions section), the Public Health Act, and the NDR Manual.

## Design Principles

The design follows four principles.

**One home, many lenses.** Each disease should live in exactly one place in the category tree, then be made discoverable along every other axis through Atlan tags and custom metadata rather than by duplicating it across branches. This keeps the tree clean and avoids the maintenance burden of a disease appearing under "respiratory," "viral," and "vaccine-preventable" all at once.

**Stable primary axis.** The primary grouping for the diseases themselves is **causative agent type** (bacterial, viral, parasitic, fungal, prion, toxin-mediated). Agent type is stable, near-mutually-exclusive, and rarely reclassified — which makes it a good backbone. The more fluid and multi-valued facets (transmission route, body system, reportability) become tags and custom metadata.

**Separate the entities from the vocabulary.** A glossary is more than a disease list. The recurring section headings in every guideline (etiology, transmission, period of communicability) and the definitions in the NDM Guidelines are themselves reusable concepts. They are captured as their own categories of terms so that a definition of "Droplet Transmission" or "Confirmed Case" lives once and can be linked from every disease that uses it.

**Faithful to source.** Categories and groupings mirror language already in use in the Alberta references (for example, "Arboviral Infections" and "Viral Haemorrhagic Fevers" are taken directly from the Reportable Reference List) so the glossary stays aligned with how MOHs and surveillance staff already speak.

## Category Hierarchy

The glossary contains seven top-level categories. Category 1 holds the disease entities; categories 2–7 hold the supporting vocabulary.

```
Communicable Disease Glossary  (Atlan glossary)
│
├── 1. Notifiable Diseases & Conditions
│      ├── Bacterial Diseases
│      ├── Viral Diseases
│      ├── Parasitic Diseases
│      ├── Fungal Diseases
│      ├── Prion Diseases
│      ├── Toxin-Mediated Illness
│      └── Syndromes & Conditions   (agent varies / multiple / under investigation)
│
├── 2. Disease Syndrome Groups
│      (Arboviral Infections, Viral Haemorrhagic Fevers, Viral Hepatitis,
│       Coronaviruses, Influenza, Encephalitides, Invasive Bacterial Disease,
│       Sexually Transmitted & Bloodborne Infections)
│
├── 3. Surveillance & Reporting Concepts
│      (Notifiable Disease, Reportable Disease, NDR, AORF, Case classifications,
│       Outbreak, FMP, MOH, CMOH, STI Director, Case Definition)
│
├── 4. Transmission & Epidemiology Concepts
│      (Airborne / Droplet / Contact / Vector-borne / Foodborne-Waterborne /
│       Bloodborne / Sexual / Congenital-Perinatal / Zoonotic transmission,
│       Incubation Period, Period of Communicability, Reservoir, Vector,
│       Endemic / Epidemic)
│
├── 5. Public Health Management Concepts
│      (Airborne / Droplet / Contact Precautions, Isolation, Quarantine,
│       Contact Tracing, Prophylaxis, Exclusion, Case Management, Outbreak Management)
│
├── 6. Clinical & Laboratory Concepts
│      (Etiology, Clinical Presentation, Diagnosis, Laboratory Confirmation,
│       Treatment, PCR, Serology, Culture, DFA, RPP)
│
└── 7. Regulatory & Governance
       (Public Health Act, Notifiable Disease Regulation,
        Notifiable Disease Guidelines, Open Government Licence – Alberta)
```

### 1. Notifiable Diseases & Conditions

The core of the glossary: one term per disease (104 to start, matching the guideline set). Sub-grouped by causative agent. Agent type was chosen as the backbone because it partitions the diseases cleanly and changes rarely. A seventh sub-category, **Syndromes & Conditions**, holds the entries whose causative agent varies, is multiple, or is under investigation (for example Acute Flaccid Paralysis, Haemolytic Uremic Syndrome, MIS-C, SARI, Disease in Unusual Form, Rare or Emerging Communicable Disease, Cerebrospinal Fluid Isolates), since forcing these into a single agent type would be misleading.

The 104 disease terms are delivered in a second file, `Communicable Disease Glossary - Disease Terms Atlan Import.csv`, with their facts parsed from the guideline set. The current distribution is 42 bacterial, 41 viral, 8 parasitic, 8 syndromes/conditions, 2 fungal, 2 toxin-mediated, and 1 prion.

### 2. Disease Syndrome Groups

Umbrella terms that bundle several individual diseases under a clinically or epidemiologically meaningful heading. These are taken directly from the groupings already used in the Reportable Reference List and Laboratory Reporting Reference. In Atlan they function as parent terms: each individual disease links to its syndrome group through a "related term" relationship, so a user browsing "Arboviral Infections" can navigate to West Nile Virus, Dengue, Zika, and the encephalitides.

### 3. Surveillance & Reporting Concepts

The vocabulary of notification and reporting — the part of the domain that is unique to public-health surveillance and most valuable to standardise. Definitions are drawn from the Reportable Reference List, the Laboratory Reporting Reference, and the NDR Manual. This category disambiguates terms that are routinely conflated, such as *reportable* versus *notifiable*, and the case classifications (*confirmed*, *probable*, *suspect*) that drive surveillance counts.

### 4. Transmission & Epidemiology Concepts

The mechanisms and measures that recur in every guideline's Transmission, Incubation Period, and Period of Communicability sections. Most of these terms are already defined verbatim in the Definitions section of the Public Health Notifiable Disease Management Guidelines, which is used as the source of record.

### 5. Public Health Management Concepts

The intervention vocabulary from each guideline's Public Health Management section, plus the precaution definitions (airborne, droplet, contact) from the NDM Guidelines. These terms connect the glossary to operational practice — isolation, quarantine, contact tracing, prophylaxis, exclusion.

### 6. Clinical & Laboratory Concepts

The clinical and diagnostic vocabulary common to every guideline, including the diagnostic test types referenced throughout the Laboratory Reporting Reference (PCR, serology, culture, DFA, respiratory pathogen panel).

### 7. Regulatory & Governance

The legislative and policy instruments that govern the domain — the Public Health Act, the Notifiable Disease Regulation, the guideline series itself, and the Open Government Licence under which the guidelines are published.

## Beyond the Tree: Tags and Custom Metadata

The category tree is deliberately single-axis. The other ways people need to slice the diseases are handled by Atlan's two complementary mechanisms.

**Atlan Tags** (cross-cutting flags, applied to disease terms): `FMP-reportable`, `STI`, `Enteric`, `Respiratory`, `Vector-borne`, `Zoonotic`, `Vaccine-preventable`, `Congenital/Perinatal`, `Outbreak-prone`, `Bioterrorism agent`. Tags are the right tool here because they are boolean, cross-cutting, and filterable. Note that **tags must be created in Atlan before they can be applied** — the import CSV therefore leaves the Tags column empty, and tags should be created and applied in a follow-up pass.

**Custom Metadata** (a structured attribute set, attached to each disease term): Causative agent type; Specific pathogen(s); Transmission route(s); Reportable to (MOH / CMOH / STI Director / TB On-call); Reporting timeline (FMP / 24h / 48h); Reporting form (NDR / AORF); Incubation period; Period of communicability; Vaccine-preventable (Y/N); Syndrome group; ICD-10 code (future); Source guideline; Last revised date. This is where the per-disease facts from the Laboratory Reporting Reference and each guideline's Revision History are stored, and it is what makes the glossary queryable ("show me all FMP-reportable enteric pathogens with an incubation period under 72 hours"). A custom metadata structure must be defined in Atlan before values can be imported.

## Term Relationships

Atlan supports native term-to-term relationships, which the design uses for three purposes:

- **Synonyms / aliases** for the many alternate names in this domain — MPOX ↔ Monkeypox; STEC ↔ Verotoxigenic E. coli ↔ VTEC; CJD ↔ Creutzfeldt-Jakob Disease.
- **Related terms** linking diseases that share epidemiology — Salmonellosis ↔ Typhoid ↔ Paratyphoid; STEC ↔ Haemolytic Uremic Syndrome.
- **Parent / child** structure for families — Viral Hepatitis → Hepatitis A / B / C / E; Arboviral Infections → West Nile Virus, Dengue, Zika, and the encephalitides.

## Mapping to the Atlan Import Format

Two companion CSVs follow Atlan's bulk-upload template. Each row is either a **Category** or a **Term** (the mandatory `Type` column), `Name` is mandatory, and the `Categories` column places the row in the hierarchy using `@` to express depth (for example, `Notifiable Diseases & Conditions` is the parent of `Bacterial Diseases`). Categories that do not yet exist are auto-created on import. The Tags column is intentionally empty in both files because Atlan tags must pre-exist.

`Communicable Disease Glossary - Atlan Import.csv` loads the full category tree plus the syndrome-group terms and the concept/definition terms (categories 2–7).

`Communicable Disease Glossary - Disease Terms Atlan Import.csv` loads the 104 disease terms into their agent sub-categories. Its first ten columns are the standard bulk-upload columns; the remaining columns carry the per-disease facts as custom metadata, named using Atlan's documented `Custom Metadata Name::Attribute` convention under a custom metadata set called `Communicable Disease` (Causative Agent Type, Pathogen, Transmission Route, Reportable To, Reporting Timeline, Reporting Form, Incubation Period, Vaccine Preventable, Syndrome Group, Source Guideline). Two prerequisites apply: the `Communicable Disease` custom metadata structure must be created in Atlan before these columns will import, and if importing through the bulk-upload UI rather than the Asset Import app, the `::` columns should be matched to the generated template (or dropped for a first structural-only pass). Incubation Period values are extracted directly from each guideline's Incubation Period section; reporting timelines (FMP / 24h / 48h) and routing (MOH / CMOH / STI Director / TB On-call) are taken from the Laboratory Reporting Reference. The Pathogen, Transmission Route, and Vaccine Preventable values are first-pass classifications and should be reviewed by a subject-matter expert.

## Roadmap

1. **Import the structure CSV** to stand up the category hierarchy and concept vocabulary. *(Ready.)*
2. **Create the Atlan tags and the `Communicable Disease` custom-metadata structure** described above.
3. **Import the disease-term CSV** (104 terms, custom metadata populated). *(Ready — depends on step 2 for the custom-metadata columns.)*
4. **Review the first-pass classifications** (pathogen, transmission route, vaccine-preventable) with a subject-matter expert, and apply tags and term relationships (synonyms, syndrome-group links) in a final pass.

## Sources

- [[Communicable Diseases Reportable Reference List]] — disease groupings and FMP designations
- [[Laboratory Reporting Reference]] — pathogens, reporting timelines (FMP / 24h / 48h), report-to routing
- [[Public Health Notifiable Disease Management Guidelines]] — Definitions section (transmission, precautions, case terms)
- [[Public Health Act RSA 2000 Chapter P-37]] — legislative basis
- [[NDR Manual Edition 9]] — notifiable disease reporting process
- `../Communicable Disease Management/Disease Guidelines/` — 104 disease guidelines (recurring section structure)
- Atlan bulk-upload format: https://docs.atlan.com/product/capabilities/governance/glossary/how-tos/bulk-upload-terms-in-the-glossary

---

_Last Updated_: 2026-06-23
_Maintained By_: Alec Blair
