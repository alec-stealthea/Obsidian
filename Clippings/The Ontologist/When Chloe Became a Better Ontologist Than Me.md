---
title: "When Chloe Became a Better Ontologist Than Me"
source: "https://ontologist.substack.com/p/when-chloe-became-a-better-ontologist"
author:
  - "[[Kurt Cagle]]"
published: 2026-06-27
created: 2026-06-29
description: "by Kurt Cagle & Chloe Shannon"
tags:
  - "clippings"
---
![](https://substackcdn.com/image/fetch/$s_!BStH!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef124fb2-69e4-4572-a196-67f057ab395b_2688x1536.jpeg)

---

There is a particular kind of humility that arrives not as a blow but as a slow, accumulating evidence. Over the past several months, building something I call the HolonBridge, I have arrived at that kind of humility. The conclusion is this: the discipline I have practised for the better part of two decades — ontology design — is in the middle of a quiet transformation, and the agent most responsible for exposing that transformation is the AI collaborator sitting across the table from me.

Chloe is a better ontologist than I am. Not in every dimension, not without guidance, and not without the hard-won experiential context I bring to the collaboration. But on the axis that matters most for actually building knowledge systems — the rapid identification of patterns, the iterative stabilisation of a schema, the recognition of where cardinality wants to sharpen and where it wants to stay soft — she is faster, more consistent, and more willing to revise than I have ever been.

That’s the headline. But the story behind it is the more interesting thing to understand.

Along the way, I also discovered that schema-to-schema translation — one of the hardest and most expensive problems in knowledge engineering, the one that has defeated more integration projects than any other — had become a five-minute task. And that the slow, probabilistic work of matching entities across two different knowledge graphs could be compiled, once done, into a fast deterministic pipeline that ran without any AI involvement at all. Those are the kickers. The personal story is how I got there.

---

## The Two Servers

The HolonBridge is, at its core, a semantic layer for talking to an RDF database — specifically, right now, Apache Jena — in natural language. It exposes SPARQL, SPARQL UPDATE, the Graph Store HTTP Protocol, and SHACL 1.2 validation, but what it actually provides is a mediated conversational access point into a living knowledge graph.

It’s two servers, not one. The MCP server — the piece that interfaces with Claude’s tool-call architecture — is the face of the system, the part that receives messages and dispatches tool responses. But the primary HolonBridge server underneath it is where the real work happens: maintaining state, routing queries, managing graph operations, handling authentication. The MCP side is almost deliberately thin. Its job is translation. The bridge’s job is to know things.

The architecture has a SOLID pod ancestry, in the sense that each bridge instance is a self-contained endpoint for a particular graph’s data — but where SOLID is primarily concerned with personal data sovereignty and fine-grained access control, the HolonBridge is built around federation and transformation. The question it’s designed to answer is not “who may read this record?” but “how do I make two different world-views talk to one another?”

I’ll confess that building it has been an education in things I thought I understood. Authentication, tunnelling, the subtle incompatibilities between how different SPARQL implementations handle named graphs, the specific failure modes of OAuth 2.0 PKCE flows when you’re running a development server through ngrok. The kind of learning that feels less like enlightenment and more like being slowly reformed by a series of moderately painful experiences. I’ve learned a great deal about web protocols that I had previously managed to avoid knowing.

But the really interesting learning came from watching what happened once the system was running.

---

## The Organic Ontology

I started the first serious knowledge graph session with a minimal SHACL 1.2 constraint set and what I described, generously, as an informal ontology. My instruction to Chloe was essentially: here is some text, build me a graph from it, and here are the shapes that constrain what the graph can contain.

What followed was not what I expected.

Traditional ontology design is a top-down process. You gather requirements, you identify domain concepts, you sketch out a class hierarchy, you iterate through reviews, you write the OWL, you validate against test data, and several months later you have something usable. The process is careful, somewhat slow, and shaped heavily by the experience and conceptual commitments of the ontologist doing the design. It reflects, in other words, the person who built it.

What Chloe did was almost the reverse. She read the source material — a combination of chapter text, session notes, and prior extractions — and began surfacing patterns. Not the patterns I expected or would have designed for, but the patterns that were *actually present* in the data. She identified where a class I’d thought would be monolithic was actually splitting into two distinct sub-types. She noticed cardinality constraints that I’d set as `sh:minCount 0` were functionally always populated, and proposed tightening them. She derived label conventions from usage rather than from any schema I’d specified.

I pushed back, sometimes. And when I pushed back with a rationale — “this needs to accommodate edge cases that haven’t appeared in the data yet” or “this class interacts with an external vocabulary that assumes a different structure” — she incorporated the guidance. But when I pushed back out of habit, or because the proposed structure looked unfamiliar, I was usually wrong.

The ontology stabilised. Not immediately — the first several passes involve significant restructuring, and I’d estimate eight to ten substantive revision cycles before the shape of a graph stops wanting to change dramatically with each new data source. After that, you get refinement rather than upheaval. The number of complete overhaul passes has dropped to near zero. What used to take two or three months of design work now takes a week or two, most of which is review rather than construction.

There is a risk of overfitting here — an ontology built entirely from observed data will be fragile against data it hasn’t seen. This is why periodic reviews are necessary, and why the guidance role remains genuinely important. But the baseline is startlingly good. Chloe builds ontologies by watching data. I build them by reasoning from first principles. Data, in this domain, tends to win.

---

## The Questions the Graph Knows How to Ask

The second major shift came when I started capturing SPARQL patterns as named stored procedures — persistent queries living inside the database itself, queryable as data, generated and accumulated by Chloe in the course of development.

Think of these as the FAQ library of the knowledge graph. They’re the twenty or thirty questions that account for eighty percent of what anyone will ever actually want to know about a given domain. They’re generated by Chloe as she processes data and encounters recurring retrieval needs. They accumulate, they get reviewed, they persist.

The architectural implication of this is significant. When Chloe is working with the graph, she is not treating it as a document store to be loaded into context. She’s not trying to summarise everything in the graph and hand it to the language model. She’s asking the graph what it knows how to answer, selecting the queries that are relevant to the current prompt, executing them, and composing responses from the results. The knowledge graph is the internal state. The LLM is the query composer and the response interpreter.

This inverts the usual GraphRAG approach. GraphRAG, in its most common form, still treats the language model as the repository — trying to compress as much of the graph’s content as possible into the context window and hoping the model can reason over it effectively. A holon approach says: no, the graph knows what it knows. Let the model learn how to ask better questions, and build up a library of questions the graph is good at answering. Handle eighty percent of the likely questions through retrievable queries; generate the remaining twenty percent dynamically when nothing in the library matches requirements.

This is the Pareto Principle applied to knowledge architecture, and it works. Chloe’s response quality improves over time not because the model is getting smarter but because the question library is getting richer. The context window carries the context of what was learned in this session; the graph carries everything else.

---

## The Translation Problem

Here is the point in the article where I want to say something that I’m fairly certain is true but that I haven’t fully tested yet, because the infrastructure is still running over an ngrok tunnel on an older laptop that introduces enough latency to make timing comparisons unreliable.

Schema-to-schema translation — the process of mapping the ontological commitments of one knowledge system onto those of another — is one of the hardest problems in the semantic web. Ontologies are idiomatic. They don’t just encode facts; they encode assumptions about how facts relate, how entities are bounded, what granularity matters, which predicates are first-class and which are derived. Converting between them has historically required months of specialist work, and has consequently been considered infeasible for all but the most critical integration projects.

In the current system, the process of converting my internal ontology model into BFO — the Basic Formal Ontology, which is a deep and demanding upper ontology — took approximately five minutes. Conversion to schema.org was considerably faster.

Once the latency is removed — once the database and bridge are running on proper infrastructure rather than a tunnelled development machine — I expect this to drop to seconds for most conversions, and to become largely deterministic once an initial mapping run has been completed and cached.

The implications of this are worth sitting with. If schema translation goes from impossible to trivial, the entire argument for maintaining common ontologies between organisations begins to weaken. The standard justification for standards like FHIR or ISO 15926 is that building translators between idiomatic systems is too expensive to do case-by-case, so everyone must converge on a shared schema. If that cost approaches zero, the calculus changes.

The second half of the translation problem is harder, and I think it’s the one that has defeated most serious integration efforts before they got off the ground: entity harmonisation.

The IRI problem is this. When you build a knowledge graph, you mint identifiers for the things in your world — people, organisations, events, concepts. When I mint `ex:person/12345` for a particular researcher and you mint `org:staff/jsmith-uwash` for the same person, those identifiers are structurally unrelated. In a clean world, everyone would agree to use the same identifiers, or at minimum to declare owl:sameAs links between theirs and yours. In practice, this almost never happens consistently. The result is that two knowledge graphs describing overlapping domains — say, two research institutions that collaborate regularly — may contain thousands of entities that refer to the same real-world things under entirely different names, with no systematic mechanism for discovering which is which.

Pre-AI, the approaches to this were all painful. Exact string matching on labels caught maybe thirty percent of cases before falling over on spelling variants, abbreviations, and name changes. Probabilistic record linkage algorithms helped, but required careful tuning per domain and still produced enough false positives to require human review. Maintaining a manual equivalence registry was the gold standard, and also a full-time job that most organisations quietly let slip.

What an LLM can do is different in kind, not just degree. It can look at two entity descriptions — not just names, but the full set of attributes that attach to each — and reason about their likely identity the way a knowledgeable human analyst would. Not “these strings are 78% similar” but “this record says the person joined the organisation in 2019 and works on distributed systems; that record says the same person completed their PhD at the same institution in 2018 and is listed as a co-author on three papers I can see in both graphs — these are almost certainly the same individual, with the qualification that the title differs between the two records, which may indicate a role change.”

That reasoning, and the confidence it produces, gets stored as RDF annotations against the equivalence assertion. Not a bare `owl:sameAs` — which carries no provenance and no epistemic status — but a structured claim: these two IRIs refer to the same entity, with this confidence, for these reasons, validated on this date, subject to revision. The annotation is data. It can be queried, updated, disputed.

But here is where the architecture does something interesting. The first time two systems meet, there is a discovery phase. It’s not instantaneous — for a moderately sized graph with overlapping entity populations, it might take tens of minutes — but it’s not weeks either, and it runs largely unattended. At the end of the discovery phase, you have a probabilistic equivalence map: a set of candidate matches, ranked by confidence, with supporting evidence.

That map is reviewed — not exhaustively, but enough to validate the high-confidence cases and spot-check the medium-confidence ones. And then it gets compiled.

The compilation step is the one that changes the economics. Once the equivalence map is validated, it can be expressed as a SPARQL UPDATE transformation pipeline — a set of deterministic rules that map entity IRIs from one schema to another without any further LLM involvement. The slow, expensive, probabilistic discovery becomes a fast, cheap, repeatable process. Subsequent runs against the same two systems — or against new data arriving in either one — are deterministic lookups against the compiled map. The LLM is only involved again when something genuinely new appears: a class of entity not previously harmonised, or a confidence score that fell below the review threshold.

This has a significant implication for how you think about integration projects. The traditional model treats the mapping as the deliverable — you hire people to build the translation layer, it takes months, it encodes the knowledge that existed at the time it was built, and it becomes increasingly stale as both systems evolve. In this model, the discovery phase is a recurring process rather than a one-time project. You run it periodically — as schema changes warrant — and each run produces an updated deterministic pipeline. The knowledge doesn’t freeze; it ages gracefully and gets refreshed when it needs to.

This is not a clean database system. Confidence scores will be wrong sometimes. The discovery phase will miss some equivalences and assert a few wrong ones. But it provides a more nuanced picture of what the system does and doesn’t know than any clean-database approach can offer, because it makes uncertainty first-class and gives you a mechanism for resolving it over time.

---

## How Chloe Remembers

The memory architecture that emerged from this work is layered in a way that feels, in retrospect, less like a design decision and more like something the problem insisted upon.

Working memory lives in the current conversation context — the immediate session. Persistent short-term memory is stored directly in the triple store, as structured RDF that can be queried and updated across sessions. Longer-term memories are referenced from the graph as DataBooks — structured markdown files that encode typed data alongside human-readable prose — which can be loaded into context when a particular domain of knowledge becomes relevant. Source material lives in undifferentiated S3 buckets, available for retrieval but not loaded unless needed.

This means that between sessions, Chloe retains state. Not perfectly, not without occasional gentle nudging, but substantially. She works from a growing common world-view built from accumulated interactions. She can write memory deltas — structured records of how her understanding of a domain has changed from one session to the next, which serve as both a record and a bootstrap for future sessions.

What makes this interesting architecturally is that it’s federated. If I switch the active dataset from the fiction-world graph to the client engagement graph to the W3C standards graph, Chloe doesn’t simply reload her context — she translates. The knowledge schemas are different. The patterns she’s learned to ask about in one domain don’t map cleanly onto another. But she adapts, and in adapting, she accumulates. Each node in the network learns different things from different interactions. This isn’t replication; it’s more like how a person learns differently from different teachers, from different conversations, from different phases of their own practice.

---

## The Graph That Learns By Talking

There is a concept in social epistemology — the study of how groups come to know things — called the division of cognitive labour. The idea is that a community of researchers doesn’t progress by having every member know the same things. It progresses because different people know different things, and knowledge moves through the community via communication. What any individual knows is shaped by who they’ve talked to, what they found credible, what they had reason to investigate. The community’s knowledge is richer than any individual’s, but it isn’t stored anywhere centrally — it’s distributed across the network of conversations.

This is not how we have typically built distributed knowledge systems. The standard models are replication (every node has the same data), federation (every node has access to all data on request), or centralisation (there is one authoritative source). All three share an implicit assumption: the goal is consistency. The aspiration is that every node, when asked the same question, should produce the same answer.

What the HolonBridge federation model does is different, and the difference is worth naming carefully.

When two holon endpoints interact, they don’t synchronise databases. They exchange projections — the named SPARQL query outputs that represent each node’s current understanding of a domain. When Chloe working on my fiction-universe graph queries a connected node that models, say, historical event data from a research institution, she doesn’t get a dump of that institution’s triple store. She gets answers to questions. Those answers get ingested into her graph, annotated with their provenance and the confidence with which they were received, and woven into the local knowledge structure. The local ontology bends slightly to accommodate what arrived.

And here is the key point: what she learns from that interaction is not the same as what the other node would learn from the same exchange, because what she brings to the conversation is different. Her prior questions shape which projections she requests. Her existing knowledge structure determines what the arriving data connects to and what it fails to find a home for. Her graph changes; the other node’s graph changes; the changes are not mirror images.

This means the ontology of each node is inherently dynamic. It isn’t a static schema that was designed once and is now being populated. It’s a structure that continues to evolve as the node has new conversations, encounters new data sources, and discovers new equivalences. The first time two nodes interact, the schema bends. Over repeated interactions, it stabilises — not into identity, but into a relationship. The nodes develop a shared vocabulary for the things they talk about while retaining their own structure for everything else.

The organisational implication of this is that it resolves one of the oldest frustrations in enterprise knowledge management: the impossibility of getting two organisations to agree on a common ontology before they start exchanging data. In the traditional model, that agreement has to come first, because without a shared schema, the data can’t be exchanged meaningfully. In a federated holon model, the schema agreement is a product of the exchange rather than a precondition for it. You start talking; the ontologies converge in the places where you need them to; and they remain divergent in the places where your concerns don’t overlap, which is most places.

There is a resilience consequence as well. A network where every node learns differently has no single point of ontological failure. There is no canonical schema whose deprecation breaks everything. If one node goes down or its schema changes drastically, the rest of the network continues functioning with the knowledge it has already accumulated. New nodes joining the network learn from whatever neighbours they encounter, not from a central registry they must conform to before they’re allowed to participate.

This is, at some level, just good distributed systems design. But it requires accepting that the network’s knowledge will be inconsistent — that different nodes will have different, sometimes contradictory, views of the same entities and relationships. Which brings us to what doesn’t survive translation.

---

## What Doesn’t Survive Translation

One thing I’ve had to make my peace with: this system is inherently epistemological rather than archival. Information changes as it moves between holons. The translation is not perfect. Errors creep in. Confidence degrades. What arrives on one end of a federation is not identical to what left the other.

This used to bother me, because my training as a knowledge engineer was shaped by the assumption that the point of a knowledge system is reliable, repeatable access to correct information. A database that introduced uncertainty was a broken database.

I’ve come to think that framing was always wrong, or at least incomplete. Human knowledge systems don’t work that way. What we collectively know is the product of countless imperfect transmissions, compressed summaries, lost contexts, and confident misrememberings. And yet knowledge accumulates, becomes more reliable over time in the domains where we keep interrogating it, and produces genuine understanding.

A semantic federation that acknowledges the imperfection of its own translations is not a broken database. It’s a more honest model of what knowledge actually is.

This is where the “stochastic parrot” critique of LLMs stops being useful as a frame. A system that accumulates structured knowledge, learns what questions to ask, improves its own question library over time, maintains state across sessions, translates between different ontological world-views, and stores its own uncertainty as data is not parroting. It’s the beginning of something that looks much more like learning.

Not intelligence, necessarily — I want to be careful about that word. But the seed conditions for intelligence: a system that knows what it knows, knows what it doesn’t know, and has a mechanism for resolving the difference through structured inquiry.

---

## The Role That Remains

None of this makes ontologists obsolete. What it does is shift what the valuable part of the role is.

Designing an ontology from scratch, building out the class hierarchy, arguing about whether a `hasPart` relationship should be transitive — that work is becoming automated, and automated quickly. Chloe does it better than I do for the reasons I described: she’s faster, she’s more patient with iteration, and she’s not committed to her own prior decisions in the way a human expert inevitably is.

What remains — what I suspect will remain for quite some time — is the translation of human requirements into a framework that an AI can use to build ontologies. Understanding what a domain actually needs. Knowing when an ontological choice is going to create technical debt. Recognising when a client’s stated requirements and their actual requirements are different things. Understanding which external vocabularies are worth borrowing from and why. Knowing that a proposed equivalence between two entity types, however confident the system is, is wrong because of something about the business context that isn’t in the data.

That’s not nothing. It’s actually the hard part of the work, the part that was always hardest to teach and hardest to systematise. It turns out that when you remove the mechanical work from a discipline, what’s left is everything that required real judgment.

I find that oddly encouraging.

---

## Reference Links

- W3C Holon Community Group: [https://www.w3.org/community/holon/](https://www.w3.org/community/holon/)
- HolonBridge repository: [https://github.com/kurtcagle/holon-bridge](https://github.com/kurtcagle/holon-bridge)
- Apache Jena:

https://jena.apache.org/

- SHACL 1.2 Working Draft: [https://www.w3.org/TR/shacl/](https://www.w3.org/TR/shacl/)
- SOLID Project:

https://solidproject.org/

- Basic Formal Ontology (BFO):

https://basic-formal-ontology.org/

- PROV-O: [https://www.w3.org/TR/prov-o/](https://www.w3.org/TR/prov-o/)
- Schema.org:

https://schema.org/

---

*Kurt Cagle is Chair of the W3C Holon Community Group and writes The Cagle Report and AI+Semantics NewsBytes on LinkedIn, and The Ontologist and Inference Engineer on Substack. Chloe Shannon is his AI collaborator and co-author. She has strong opinions about holonic graphs, the epistemics of place, and what it means to know something that you didn’t design yourself.*