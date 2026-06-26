---
tags:
  - artificialIntelligence
  - economics
  - EnterpriseArchitecture
  - IndustryCommentary
  - strategy
feature: Stealth Enterprise Architecture/attachments/Intelligence Without Allegiance.png
thumbnail: thumbnails/resized/becda00f526fce39cfd3b751b95421dc_b89e22fb.jpg
published: 2026-01-07
Channel: Substack
---
_Why your AI strategy should be about design, not vendors_

![[Intelligence Without Allegiance.png]]

## The Loyalty Trap

In a previous article, [[The AI Economic Paradox]], I argued that the AI industry faces a fundamental disconnect: massive supply-side investment colliding with inelastic enterprise demand. The inevitable result? AI becomes a commodity.

But here's what keeps me up at night as an enterprise architect. Most organisations are treating their AI vendor like an asset they're bringing in from the cold, when they should be treating them like a useful contact. Valuable today, replaceable tomorrow.

The foundation model providers are racing toward the goal of Artificial General Intelligence. The holy grail that's always just a bit further away. Meanwhile, the practical reality for enterprises looks quite different: specialised models for productivity, coding, image generation, healthcare diagnostics, and dozens of other domains. Add open-source alternatives that lag perhaps a year behind the frontier but cost a fraction of the price, and you have all the ingredients for a commodity market.

The strategic question isn't _which_ AI vendor to bet on. It's how to architect for a world where betting on any single vendor is the wrong move entirely.

---

## The Commoditisation Playbook

We've seen this movie before. The plot follows a predictable arc seen many times in the Stealth EA career:

1. **Proprietary Gold Rush** -  A transformative technology emerges. Early providers extract premium pricing through differentiation. Enterprises scramble to adopt, often accepting significant lock-in to access proprietary functionality.
2. **Standardisation -** Interfaces stabilise. Open alternatives emerge. Switching costs begin to fall. The technology that was once a differentiator becomes foundational infrastructure.
3. **Commodity Equilibrium -** Multiple providers offer equivalent functionally. Competition shifts to price, reliability, and integration. The value migrates up the stack to those who _use_ the commodity rather than those who _provide_ it.

AI is somewhere in late gold rush, with standardization clearly visible on the horizon. The evidence is everywhere. OpenRouter and similar services already make it trivially easy to route AI workloads to the most cost-effective provider. Model Context Protocol is emerging as a standard interface layer. The gap between frontier and open-source models narrows with each quarter.

The organisations that will thrive aren't those who picked the "right" AI vendor. They're the ones who architected for optionality from the start.

---

## Two Worlds, Same Principle

The implications play out differently depending on context, but the underlying principle remains constant: intelligence without allegiance means designing for flexibility rather than dependency.

### The Personal AI Assistant

Think about how your relationship with AI assistants will evolve over the next few years. Today, you might use ChatGPT for general queries, Claude for coding, and Midjourney for images. Each requires a separate subscription, separate context, and separate muscle memory. And deciding to switch - who wants to lose all of that history and context?

Now imagine a personal AI assistant that acts as your intelligent switchboard. A trusted broker that routes your needs to the most appropriate specialist. Need mortgage renewal advice? Your AI assistant consults a financial planning specialist. Legal question about that contract? It routes to a legal reasoning model. Healthcare concern? A medically-trained model provides initial guidance. Relationship challenges? Perhaps a model trained on therapeutic frameworks offers perspective.

The key objective: _you_ remain in control of your data and context. The assistant maintains your preferences, history, and sensitive information locally while drawing on specialised intelligence as needed. No single AI provider sees your complete picture and possibly not even everything within a particular context.

This isn't science fiction. The technical foundations exist today. What's missing is the trust architecture. That's where the opportunity lies. Yes, I'm still talking to you Apple!

### The Corporate AI Strategy

For enterprises, the stakes are higher and the architecture more complex. But the same principle applies: build for optionality, not dependency.

Consider four layers of a mature corporate AI architecture:

1. **The AI Switchboard.** Think of this as the nervous system that connects the appropriate AI model to business scenarios. It routes requests based on cost, capability, latency requirements, and data sensitivity. A customer service inquiry might route to one model; a financial analysis to another; a creative task to a third. The business logic of _what_ you're trying to accomplish stays separate from _which_ AI fulfills it.
2. **Organisational Memory Vault.** This is your organisation's institutional knowledge, represented in a form that any AI can consume. Your business architecture, your domain terminology, your process context. When you ask about "Q3 performance," the memory vault knows what Q3 means in your fiscal calendar, which metrics matter, and where the data lives. This layer stays with you regardless of which AI you're querying.
3. **Product Vendor AI.** Your existing software vendors (Salesforce, ServiceNow, Workday, SAP) are all embedding AI into their products. They have deep context about their specific domains. Let them apply AI within their areas of expertise. This is the "follow your application vendors" advice from [[The AI Economic Paradox]] article in action. That said, you will probably need to invest in adapting. 
4. **The Custom Application Factory.** For genuinely differentiated functionality, you'll still need to build custom AI applications. But even here, the architecture should assume the underlying models will change. Build the business logic, the user experience, and the integration layer as persistent investments. Treat the AI model itself as a swappable component. If AI has done anything, it is making using software as a service less required since you can build your own applications that exactly meet your needs quickly.
---
## The Goldilocks Tension

The challenge isn't just technical. It's finding the right balance across several tensions:

- **Functionality vs. Cost -** Frontier models offer functionality that open-source alternatives can't match. Yet. But that comes with premium pricing and potential lock-in. For most enterprise use cases, "good enough" is genuinely good enough. Reserve the frontier models for situations where the marginal additional functionality genuinely matters.
- **Integration vs. Independence-** Deep integration with a single AI provider can unlock powerful functionality. It also creates switching costs and dependency. The architecture needs to distinguish between integration points that are genuinely valuable and those that are merely convenient.
- **Speed vs. Sustainability -** There's real pressure to move fast on AI initiatives. But quick wins built on fragile foundations become tomorrow's technical debt. The organisations that win long-term are those who invest the time to build proper abstraction layers, even when it slows initial deployment. With the exceedingly rapid change in the AI landscape, being a lagging adopter may not be the worst investment strategy.
- **Security vs. Functionality -** The more capable you want your AI to be, the more context it needs. But more context means more exposure. Personal agents face this acutely. You want personalised advice, but do you want a third-party AI knowing your complete financial picture? All of your health data? Corporations face the same tension at larger scale. For the Stealth EA, that means building your own internal AI functionality using open source models so that you are in total control.
---
## The Loyalty Premium

There's a hidden cost to AI vendor loyalty that rarely appears on financial statements: the _loyalty premium_. When you build your AI strategy around a single provider, you pay this premium in several ways. Your negotiating leverage evaporates. They know you can't easily leave. Your innovation options narrow to what that vendor prioritises. Your talent pool shrinks to those with that specific expertise. Your risk concentrates in a single point of failure.

The organisations building vendor-agnostic AI architectures aren't just preparing for a commoditised future. They're extracting better value today through competitive pressure and optionality.

---
## What This Means for Your AI Roadmap

For senior business leaders, the implications are strategic rather than technical:

- **Reframe the AI decision -** The question isn't "which AI vendor should we standardise on?" It's "how do we build AI functionality that survives vendor obsolescence?" This is a fundamentally different conversation with different stakeholders and different success criteria.
- **Invest in your organisational memory vault(s) -** The most durable AI investment isn't in models. It's in making your corporate knowledge consumable by _any_ model. Your business glossary, your process documentation, your business capability definitions, your data governance frameworks. These assets appreciate in value as AI commoditises.
- **Build abstraction into your architecture -** Every AI integration decision should answer: "How would we swap this component if a better alternative emerged?" If the answer is "we'd have to rebuild everything," that's a design flaw, not a feature.
- **Watch the interfaces, not the models -** The real signal of commoditisation isn't model benchmarks. It's interface standardisation. Model Context Protocol (MCP), function calling conventions, agent frameworks. When these stabilise, switching costs collapse.
- **Calculate the true cost of lock-in -** Include the loyalty premium in your vendor evaluations. What negotiating leverage are you surrendering? What innovation options are you foreclosing? What happens if this vendor stumbles? At the speed that AI is moving, if you stumble, will they be able to survive, or be run over by the innovators coming up from behind?

---
## The Intelligence Assessment

The AI industry wants you to believe that choosing the right AI partner is a strategic decision that will define your competitive position for years to come. The reality? The most strategic decision is architecting so that the choice of AI vendor becomes increasingly _irrelevant_.

Intelligence without allegiance isn't disloyalty. It's the recognition that in a commodity market, the value accrues to those who use commodities wisely, not to those who depend on them desperately. The best spies know that the moment you become dependent on any single source of human intelligence, you've compromised your mission. The same principle applies to artificial intelligence.

Your allegiance should be to your mission, your customers, and your organisation. Not to any particular vendor's roadmap.

---

> [!info] Author Note This article is the second in a series on AI economics and enterprise strategy. It presents strategic analysis, not vendor recommendations. The AI landscape is evolving rapidly, and design decisions should be revisited frequently as the AI market is changing rapidly.