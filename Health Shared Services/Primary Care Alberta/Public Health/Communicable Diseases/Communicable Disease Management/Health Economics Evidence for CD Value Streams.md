---
type: Architecture Background
title: Health Economics Evidence for Communicable Disease Value Streams
description: Background section summarising the health-economics evidence for funding the top communicable disease value streams — STI, TB, E. coli (STEC), and pertussis — with an Alberta/Canada-first lens.
tags:
  - communicable-disease
  - health-economics
  - value-stream
  - business-case
  - sti
  - tuberculosis
  - e-coli
  - pertussis
timestamp: 2026-06-24T00:00:00Z
parent: "[[CLAUDE-Communicable-Diseases]]"
---
> **Purpose**: Background section assembling the health-economics evidence base for investing in the highest-priority communicable disease (CD) value streams. It focuses on the four streams identified as priorities — sexually transmitted infections (STI), tuberculosis (TB), Shiga toxin–producing *E. coli* (STEC/verotoxigenic *E. coli*), and pertussis. The lens is Alberta/Canada first, with international evidence used to fill gaps. Figures are drawn from peer-reviewed and government sources, with citations inline so each claim can be traced to its origin.

---

## Why a Health-Economics Background Matters

Communicable disease investment competes for the same capital and operating dollars as every other portfolio. The strongest funding cases for public-health interventions rest on three economic arguments: the **avertable burden** (cases, hospitalisations, deaths, and downstream sequelae that the intervention prevents), the **cost of inaction** (direct medical and societal costs of letting incidence rise), and **demonstrated cost-effectiveness or cost savings** (favourable cost per quality-adjusted life-year, or net savings). For the four priority value streams, the published evidence supports all three arguments, though the strength and Canadian specificity of the evidence varies by disease.

A recurring theme across all four streams: the **direct healthcare cost is only part of the picture**. Cost-of-illness studies that include intersectoral and societal costs — lost productivity, long-term sequelae, contact-tracing labour — consistently find the true burden is several times higher than treatment costs alone. This matters for value-stream design, because the digital and process investments (faster case identification, automated intake, shared contact identification) act on exactly those high-cost downstream pathways.

---

## How Health Economists Frame This (and Where the Insurance Analogy Holds)

It is tempting — and partly correct — to treat communicable disease control as an **insurance policy with actuarial pricing**: pay a premium (prevention spending) to buy down the expected cost of a future loss (an outbreak). Health economists do use machinery that resembles this, but they reach for a discipline-specific toolkit rather than insurance underwriting. Understanding the framing matters here because it tells a funding audience *why the numbers in this document are a legitimate basis for a decision*, not just illustrative.

**What the disciplines actually use.** The core method is **decision-analytic modelling**, built on expected value — the probability of an event multiplied by its cost. "Should we fund this control programme?" becomes "what expected loss do we avert, versus the cost to avert it?" — the same arithmetic that prices insurance. The standard analytical families are:

- **Cost-effectiveness analysis (CEA)** — cost per case (or death) averted.
- **Cost-utility analysis (CUA)** — cost per quality-adjusted life-year (QALY) or disability-adjusted life-year (DALY) gained; this is the $44,301/QALY pertussis figure and the $100,000/QALY thresholds used in the TB studies above.
- **Cost-benefit analysis (CBA)** — all costs and benefits monetised, yielding a net benefit or benefit-cost ratio.
- **Cost-of-illness (COI) studies** — the total economic burden of a disease (the $26.7M E. coli and $51.4M chlamydia figures).

The decision rule is a **willingness-to-pay threshold** rather than an insurance premium, and the underlying models — Markov cohort models, microsimulation (as in the pertussis study), and **probabilistic sensitivity analysis** (Monte Carlo runs over uncertain inputs) — are close cousins of actuarial technique. The insurance framing is most explicit in **pandemic-preparedness economics**, which openly treats public-health investment as insurance against catastrophic tail risk, priced much like catastrophe reinsurance.

**Where the analogy breaks down — and why it matters for the business case.** Classic actuarial pricing assumes risks are roughly **independent**: my house fire does not raise your fire probability. Communicable disease is the opposite. Risks are **correlated and self-amplifying** — one untreated case generates secondary cases exponentially (R₀), and one person's protection lowers everyone else's risk (herd immunity, a positive externality). Two consequences follow:

1. CD control behaves less like *indemnity insurance* (transferring a fixed risk) and more like **loss prevention / risk engineering** — the premium actually changes the probability of the loss, and the payoff is non-linear.
2. *Where* prevention dollars are spent matters more than *how much* — which is exactly why "untargeted screening had disappointing impact" recurs in the STI and TB sections. A flat actuarial table would miss this; a transmission-dynamic model captures it.

**The headline investment argument.** Beyond disease-specific cost-effectiveness, the public-health economics literature supports a general return-on-investment case: a systematic review of local and national public-health interventions reported a **median return on investment of roughly 14:1** ([Masters et al., 2017, *J Epidemiol Community Health*](https://jech.bmj.com/content/71/8/827)). The **WHO "investment case" methodology** formalises this avertable-burden-versus-cost argument and is the standard template for TB, HIV, and immunisation business cases. For deeper reading, the relevant search terms are *decision-analytic modelling*, *dynamic transmission model*, *value of a statistical life (VSL)*, and *expected value of perfect information (EVPI)* — the last being the purest "what is it worth to reduce our uncertainty before we commit?" calculation, very much an underwriting mindset.

> **Caveat for any business case built on this note**: present the insurance framing as an intuition pump, not a literal pricing model. The independence assumption that makes ordinary insurance tractable does not hold for transmissible disease, and over-stating the metaphor invites a fair critique from anyone with an actuarial or epidemiological background. The defensible claim is narrower and stronger: prevention spending is an *investment that changes the probability and scale of future loss*, evaluated with established cost-utility methods against a willingness-to-pay threshold.

---

## STI Value Stream

**Burden and cost of inaction.** STI rates in Canada have risen sharply over the past decade — gonorrhea roughly doubled since 2012 and infectious syphilis rose several-fold ([Public Health Agency of Canada, *STBBI Action Plan 2024–2030*](https://www.canada.ca/en/public-health/news/2024/02/government-of-canada-releases-2024-2030-action-plan-on-sexually-transmitted-and-blood-borne-infections.html)). Genital chlamydia alone was estimated to cost Canada roughly **$51.4 million per year** in burden-of-disease terms ([Tuite et al., 2012, *Sex Transm Dis* — PubMed 22421691](https://pubmed.ncbi.nlm.nih.gov/22421691/)). Cost-of-illness reviews stress that once intersectoral costs (productivity, long-term reproductive sequelae such as pelvic inflammatory disease and infertility) are added, the societal burden of STIs and HIV is substantially higher than direct healthcare costs alone ([BMC Health Services Research, 2021](https://bmchealthservres.biomedcentral.com/articles/10.1186/s12913-021-07147-z)).

**The Alberta case.** Alberta declared a **syphilis outbreak in July 2019** after reported cases jumped from 161 in 2014 to 2,330 in 2019, with congenital syphilis rising in step — 38 infants born with congenital syphilis in 2019 versus 8 the prior year ([Alberta Health Services, *Syphilis Outbreak*](https://www.albertahealthservices.ca/srh/Page17087.aspx)). Between 2015 and March 2024 Alberta recorded roughly **350 cases of congenital syphilis, including 61 stillbirths**. Alberta Health funds the outbreak response at about **$3.2 million annually** ([Frontiers in Public Health, 2024 — congenital syphilis in Canada](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2024.1522698/full)). Notably, the introduction of **rapid testing with same-day treatment** was associated with a sharp drop in new cases, reversing years of increase — direct evidence that faster identify-and-treat pathways (the heart of the STI value stream) pay off ([University of Alberta Folio, Dec 2025](https://www.ualberta.ca/en/folio/2025/12/new-cases-syphilis-in-alberta-drop-after-introduction-of-rapid-testing-immediate-treatment.html)).

**Cost-effectiveness of the interventions.** Chlamydia screening in younger women is widely assessed as cost-effective or cost-saving, and screening plus partner notification in the US over 2000–2015 delivered good value for money on a population-health basis ([US modelling analysis, *Sex Transm Dis* — PMC10184801](https://pmc.ncbi.nlm.nih.gov/articles/PMC10184801/)). Partner-notification services in particular are identified as cost-effective strategies for extending STI/HIV testing ([Ontario HIV Treatment Network, Rapid Response](https://www.ohtn.on.ca/rapid-response-cost-effective-strategies-of-testing-for-hiv-and-sexually-transmitted-infections-stis/)). A cautionary Canadian note: broad untargeted screening has shown disappointing impact on falling rates, with the burden shifting to contact tracing and partner notification at the local level ([*STIs in Canada: A sticky situation* — PMC3200369](https://pmc.ncbi.nlm.nih.gov/articles/PMC3200369/)). This strengthens the case for the value stream's emphasis on **efficient, automated contact identification** (the shared OMRS Contact Identification pattern and the Blue Prism intake automation) rather than untargeted volume.

---

## TB Value Stream

**Cost per case.** TB is the clearest "high cost per case" argument in the portfolio. A study of three Canadian treatment centres (2010–2016) put median per-patient costs (2020 CAD) at **$804 for TB infection (LTBI), $12,148 for drug-susceptible active TB, $19,319 for isoniazid-resistant TB, and $119,014 for multidrug-resistant TB** ([Ronald et al., *Emerg Infect Dis* — PMC9423918](https://pmc.ncbi.nlm.nih.gov/articles/PMC9423918/)). More than half the cost of managing drug-susceptible disease was hospitalisation, and roughly **one-third reflected contact investigation and directly observed therapy** — precisely the activities a TB value stream optimises. An older national assessment estimated total TB expenditures of about **$47,290 per active case** (2004), with the highest per-case costs in the Northern Territories ($72,441) and Western provinces ($35,914) ([Menzies et al., *Costs for TB Care in Canada* — PMC6976239](https://pmc.ncbi.nlm.nih.gov/articles/PMC6976239/)).

**Cost-effectiveness — the targeting argument.** Canadian modelling shows that **targeted** LTBI screening is cost-saving while **universal** screening is not. In new migrants under surveillance, screening with an interferon-gamma release assay (IGRA) followed by rifampin was *dominant* over the tuberculin-skin-test/isoniazid approach — preventing cases, adding QALYs, and saving roughly **$353,013 over ten years** in the modelled cohort — yet universal LTBI screening was found cost-prohibitive ([Mongkolsapaya / PLOS One, 2017 — post-landing LTBI strategies](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0186778); [CDC EID, 2019](https://wwwnc.cdc.gov/eid/article/25/4/17-1630_article)). The analyses used a willingness-to-pay threshold of **$100,000 CAD per QALY**. The economic lesson for the value stream is the same as for STI: the return comes from **risk-targeted case finding and efficient contact investigation**, not blanket screening.

---

## E. coli (STEC / Verotoxigenic E. coli) Value Stream

**Canadian cost of illness.** The most directly relevant Canadian figure: verotoxigenic *E. coli* O157 was estimated at about **22,344 primary infections per year, costing $26.7 million**, when eight long-term health outcomes are included using National Notifiable Diseases Registry data ([Tarrant et al., *Verotoxigenic E. coli: costs of illness in Canada* — PubMed 24490915](https://pubmed.ncbi.nlm.nih.gov/24490915/)). Acute bacterial foodborne illness overall has been estimated in the order of **$1.1 billion annually** in Canada (older estimate, ~1 million cases) ([Preliminary Estimates of Costs of Foodborne Disease in Canada — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0362028X22091517)).

**Severity drives cost — the HUS tail.** STEC's economic profile is dominated by a small number of catastrophic outcomes. US cost-of-illness work found the annual O157 STEC burden was about **US$405 million** (2003), of which **$370 million was premature death** and only $30 million direct medical care; per-case cost ranged from **$26 (no medical care) to $6.2 million (death from haemolytic uraemic syndrome, HUS)** ([Frenzen et al., *J Food Prot* — PubMed 16355834](https://pubmed.ncbi.nlm.nih.gov/16355834/)). HUS is the leading cause of acute kidney injury in children under 10 and can cause lifelong morbidity ([CDC, *Signs of HUS*](https://www.cdc.gov/ecoli/signs-symptoms/hus.html)). Because the cost is concentrated in rare severe paediatric outcomes, the value-stream return comes from **rapid outbreak detection and source control** that prevents the secondary cases most likely to include a HUS event — directly relevant to Alberta given the scale and public profile of recent childcare-associated STEC outbreaks. *(Alberta-specific outbreak cost data is thin in the published literature; the Canadian national cost-of-illness figure above is the best available transferable estimate and should be flagged as such in any business case.)*

---

## Pertussis Value Stream

**National burden.** A Canadian microsimulation estimated total economic costs of pertussis at **$79.6–$241.3 million annually**, with cost heavily concentrated in infants — mean cost per case of **$22,768 for infants under six months**, declining with age but rising again in seniors (~$1,920 for 65+). Infants also bear the greatest health loss, ~0.58 QALYs lost per case versus ~0.05 for adults ([Janssen / *Vaccine*, 2019 — microsimulation, PubMed 31585727](https://pubmed.ncbi.nlm.nih.gov/31585727/)). Total medical costs were modelled at roughly **CAD $26 million in a non-outbreak year and $72 million in an outbreak year** — quantifying the swing the value stream's outbreak-response capability acts on.

**Cost-effectiveness of the interventions.** Several intervention pathways within the pertussis stream have favourable economics:

- **Maternal (pregnancy) Tdap**: a Canadian cost-utility analysis found an incremental cost of **$44,301 per QALY gained**, cost-effective in 6 of 10 study years against a $50,000/QALY threshold; NACI recommends universal vaccination in pregnancy ([Fakih et al., *CMAJ Open*, 2020 — PMC7588263](https://pmc.ncbi.nlm.nih.gov/articles/PMC7588263/)).
- **Post-exposure prophylaxis (contact management)**: PEP is cost-effective versus no intervention, with azithromycin ICERs of **$16,963/QALY in children and $2,415/QALY in adults** — strong support for the contact-management activity in the value stream ([*Pertussis PEP among Household Contacts* — PMC4352053](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4352053/)).
- **Programme-level vaccine switch**: moving to acellular pertussis vaccine produced a **net societal saving of ~CAD $184 per case avoided** ([Economic impact of acellular pertussis vaccine in Canada — PubMed 19895923](https://pubmed.ncbi.nlm.nih.gov/19895923/)).

---

## Cross-Stream Summary

| Value Stream | Headline Canadian cost figure | Key cost-effectiveness finding | Where the value stream creates return |
|---|---|---|---|
| **STI** | Chlamydia ~$51.4M/yr (Canada); Alberta syphilis response ~$3.2M/yr | Screening + partner notification good value; rapid test-and-treat cut Alberta syphilis cases | Efficient, automated contact identification and intake |
| **TB** | $12,148 (drug-susceptible) to $119,014 (MDR) per case | Targeted LTBI screening cost-saving; universal not | Risk-targeted case finding; efficient contact investigation |
| **E. coli (STEC)** | ~$26.7M/yr (verotoxigenic O157, Canada) | Cost concentrated in rare HUS/death; per case up to $6.2M | Rapid outbreak detection and source control |
| **Pertussis** | $79.6–$241.3M/yr (Canada); +$46M swing in outbreak years | Maternal Tdap ~$44,301/QALY; PEP highly cost-effective | Outbreak response and contact prophylaxis |

**Common thread.** In every stream the economic return is concentrated not in routine case treatment but in the **downstream sequelae and secondary transmission** that faster identification, targeted screening, and efficient contact management prevent. This is the economic logic underpinning the [[CLAUDE-Communicable-Diseases|CD Solution]] design — shared contact identification in [[CLAUDE-OMRS|OMRS]], automated intake, and Connect Care as the episode system of record all act on the high-cost downstream pathways the evidence above quantifies.

**Evidence caveats.** Canadian-specific cost-effectiveness data is strongest for TB and pertussis, moderate for STI, and weakest for STEC outbreak response (where the transferable national cost-of-illness figure substitutes for Alberta outbreak-cost data). US and international figures are flagged inline where Canadian data is unavailable; they indicate direction and magnitude but should not be presented as Alberta costs without adjustment. Where dollar figures span multiple study years, the base year is noted in the source.

---

_Last Updated_: 2026-06-24
_Maintained By_: Alec Blair
