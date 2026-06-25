---
feature: Emergency Walk-in Value Stream - Motivation View.png
created: 2025-12-01
---
Your mission, should you choose to accept it, is to understand why this value stream exists before we worry about how it works. The [[Value Stream Motivation Model]] is your reconnaissance — it tells us who we're serving, what they care about, and what "success" actually looks like. Without this intel, you're just moving boxes around on a diagram.
### The Value Stream Motivation Model Mission Brief

Every value stream needs four things nailed down before anyone should touch a capability map: who's the stakeholder, what triggers the value stream, what value do they receive, and what's the overall outcome we're shooting for?

![[Emergency Walk-in Value Stream - Motivation View.png]]

For our Emergency Room Walk-in, the stakeholder is the **Emergency Room Patient** — someone who just showed up with a health concern and needs help. Not a scheduled appointment, not a referral, just someone who walked through the door because something's wrong. The triggering event is equally straightforward: **Person arrives at Emergency Department**. No complexity here — they showed up, and now we need to deliver value.

That value? **Patient receives appropriate treatment in timely manner**. Notice those two carefully chosen words: "appropriate" and "timely." Not "fastest possible" (that would be reckless), not "most comprehensive" (that would be wasteful), but appropriate. And timely — because in emergency medicine, the clock isn't just ticking, it's judging you.
### Walking Through the Stages

Here's where it gets interesting. Each stage in this value stream delivers incremental value to that patient — little deposits in the trust account, if you will.

- **Present** is where it all starts. The patient makes their presence and concern known to the ED staff. Simple, right? But the value delivered here matters: _ED Staff knows person's concern_. Until that happens, nothing else can. It's the Stealth Agent equivalent of establishing a secure channel before transmitting classified information.
- **Triage** is the sorting hat of emergency medicine. Clinical staff assess acuity, assign priority, and — critically — tell the patient what to expect. The goal here is to ensure that we meet the service time expectations set out by the [[Emergency Department Measures]] for _Time to triage registered ED patient_, and the value delivered is _Patient knows wait time estimate_. That second part is underrated. Uncertainty is miserable; informed waiting is merely uncomfortable, yet somehow many people have comfort just knowing what to expect.
- **Assess** is where diagnosis happens. The clinical team figures out what's actually going on and develops a plan. This stage concludes when _Patient consents to care plan_ — that's the goal — and the value is _Patient understands diagnosis and plan_. Note the distinction: consent is a goal (measurable, binary), while understanding is value (experienced by the patient). The metamodel cares about these differences.
- **Treat** delivers on the plan. Medications administered, procedures performed, interventions executed. The value here is _Patient ready for next step in care journey_. Not "cured" — emergency medicine often stabilizes rather than resolves. The mission is preparing the patient for whatever comes next.
- **Transfer or Discharge** finishes the value stream. Two very different outcomes from a clinical perspective, but from a value stream perspective, they're the same stage: completing the episode and ensuring continuity. The goals are _Time to treat ED patient_ (the overall efficiency measure) and the value is _Patient transitioned to appropriate care setting_.

### What the Motivation View Tells Us

A few things jump out when you look at this view through a Stealth EA lens.

1. First, every value item is expressed from the patient's perspective. This isn't accidental — it's fundamental to how value streams work. We're not measuring what we do; we're measuring what value they receive. 
2. Second, the goals are operational metrics that connect directly to business capability performance. When we eventually map business capabilities to these stages, we'll know exactly what "good enough" looks like for each capability instance. Triage time not meeting targets? That tells you where to focus your capability investment.
3. Third, this is a classic front-office, externally-triggered value stream. The patient initiates; the organization responds. This has implications for how we structure the owning domain and how we think about governance. Back-office value streams feel different — they're more capability-centric. But that's a topic for another briefing.
### The Bottom Line

As I presented in the blog post [[Your Business Capability Map is Missing its Mission Briefing]], business capabilities without value streams are ingredients without recipes. This motivation view gives us the recipe — or at least the dish we're trying to cook. Now we know what success looks like for the Emergency Room Patient, we can start asking which capabilities need to be instantiated and to what standard of performance.

The [[Value Stream Capability Model]] comes next. But that would be telling.

---



