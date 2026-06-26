Go back far enough in time, and you will eventually reach a stage where all the words for concepts that now seem pervasive did not yet exist. I’ve worked with RDF for about twenty years or so, but the terminology surrounding [[Knowledge Graph 1|knowledge graphs]] didn’t really start showing up until perhaps six or seven years ago, around 2017. Until then, we talked about triples and triple stores, or tuple stores, or semantic graphs, but even though most of us in the field recognized that we were working in the “knowledge” domain, the idea … the concept, if you will, of a knowledge graph didn’t show up until comparatively recently.

Since then, if a company in the knowledge space was not flogging some neural network-based AI, they were selling knowledge graphs, and like many such terms, most people would be hard-pressed to describe what that means. In some of the broadest definitions I’ve seen, a knowledge graph could be any relational database, just as, ten years before, anyone working with cloud computing was somehow involved in Big Data. This term has become conspicuous of late, primarily in its absence.

The purpose of this article is to state what I believe a knowledge graph is, at least for discussion purposes. No doubt there will be some who question why their particular product or favorite development tool didn’t end up qualifying, but as with any other technical terminology, words matter until they don’t.

## What Defines a Knowledge Graph?

So, what is a knowledge graph? I think that to be considered as such, a **knowledge graph** should have the following characteristics:

-   **Canonical**. Internally, it must be describable in a context-free, canonical form.
-   **Addressable.** Resources must be globally identifiable and be referenceable via properties.
-   **Queryable.** It should be possible to retrieve items with a query language.
-   **Normalized.** No duplications of the same concept should exist, but instead, any link should be considered a reference.
-   **Mutable.** Either resource should be updateable, or some versioning system exists to update resources when state changes.
-   **Schematically Transparent.** It should be possible from within the graph to retrieve information metadata about the graph.
-   **Reifiable.** It should be possible to address an assertion as a resource.

Note here that there is no mention of RDF or Turtle or OWL, or GraphQL, GQL, OpenCypher or anything else along those lines. One can have a knowledge graph with none of those things, though whether such a graph is interoperable with any other graph is debatable.

It’s worth digging into this list to understand better what constitutes a knowledge graph.

## Knowledge Graphs Are Hypergraphs

There are a number of different kinds of graphs in use in computer science. but in the realm of knowledge representation, only two are relevant: Labeled Directed Cyclic Graphs (LDCGs) and Labeled Directed Acyclic Graphs (LDAGs). Any graph consists of nodes (which usually represent concepts) and edges (representing relationships). A labeled graph indicates that both nodes and edges can have identifiers of some sort (these may be labels in a language sense as well, but usually, what is being represented is a machine-specific id.

```
flowchart LR 
   A --relatesTo--&gt; B;
   B --relatesTo--&gt; C;
```

In a labeled directed acyclic graph, there are no paths that, if followed, will create a loop in the graph. This is usually called a tree or hierarchy and is very typical of object databases in JSON or XML.

```
flowchart LR 
   A --relatesTo--&gt; B;
   A --relatesTo--&gt; C;
   B --relatesTo--&gt; D;
   B --relatesTo--&gt; E;
   C --relatesTo--&gt; F;
   C --relatesTo--&gt; G;
```

A cyclic directed graph, on the other hand, can create loops

```
flowchart LR
A --relatesTo--&gt; B;
A --relatesTo--&gt; C;
B --relatesTo--&gt; D;
B --relatesTo--&gt; E;
C --relatesTo--&gt; E;
E --relatesTo--&gt; G;
```

Both Knowledge Graphs and Relational Graphs are LDCGs.

Note that such cyclical graphs are still generally not repeating, where traversing in the direction of the arrows will eventually take you back to some previously traversed now:

```
flowchart LR
A --relatesTo--&gt; B;
A --relatesTo--&gt; C;
B --relatesTo--&gt; D;
B --relatesTo--&gt; E;
C --relatesTo--&gt; E;
E --relatesTo--&gt; A;
```

Relational graphs (SQL graphs) enforce this condition (you should not have the previous graph in a relational graph). Knowledge graphs, on the other hand, don’t explicitly rule it out.

Another distinction between relational graphs and knowledge graphs is one of referential integrity. In a relational graph, every primary key is local to the table it is created on, while every foreign key must correspond to a row in another table. In a knowledge graph, on the other hand, each primary key is globally unique (a uniform resource identifier or **URI**), and there is no explicit requirement that a referenced foreign key has to be within the database. Instead, that foreign key may exist anywhere. The targeted resource exists somewhere, may exist in multiple places simultaneously, and is not guaranteed to have the same information.

Put another way, in a relational database, the foreign key is always to a row in a known table: information is always wholly known. In a knowledge graph, on the other hand, there is always the possibility that additional information exists for a given foreign key even if there is no concept already defined for it: information is only incompletely known and may change over time as new graphs are encountered. This is frequently called the Open World Assumption, a major differentiator between knowledge and relational graphs. Put another way, knowledge graphs do not have complete referential integrity (this is seen as a feature, by the way, not a bug).

The final distinction is a seemingly trivial one, but it has huge implications. For a specific row in a given table in a relational database, a column can have one and only one foreign key – you have to create a new row with a different foreign key for that property, or the foreign key is, in turn, a link to a table containing primary and foreign key pairs (what’s called third normal form in relational parlance).

On the other hand, in a knowledge graph, for a given resource, an outbound property on that resource can have multiple foreign key targets. A row is not a resource, and a table is not a class, though the two are analogous. This is one definition of a _hypergraph_, by the way – relational databases are not hypergraphs, but knowledge graphs are.

The upshot is that a knowledge graph is a superset of structured hierarchies and relational databases. It is a reasonably straightforward process to represent a JSON, XML, or relational database in a knowledge graph, but not vice versa. In a document structure like XML (with minor changes to the object model, JSON), if you have multiple references to the same object, you will typically have multiple distinct copies of that object. In a knowledge graph, on the other hand, any reference to a distinct object will be a link to that resource – you only have one such resource. Change that resource once, and you change it everywhere.

This is the crux of what makes a knowledge graph a knowledge graph: objects may have specific literal properties (they can be expressed as text in some way or another), but for object foreign keys, every object must have a unique, global URI, and must be referenceable from that URI.

## The Implications of Knowledge Graphs

Some of the oldest knowledge graphs make use of triples following a specific indexing scheme with three keys (the subject, predicate, and object). This approach is very decompositional – you have reduced data to the absolute minimum necessary to express one and only one fact, which is the foundation of the Resource Description Framework. When people talk about knowledge graphs, most likely have this in mind.

However, this is not the only way of implementing such knowledge graphs. RDF-XML, for years, was an XML document format that could encapsulate a knowledge graph. It worked by adding a set of attribute overlays that made linking across object nodes consistent.

The RDF-JSON format can also be used as a graph. While supporting the whole of SPARQL on such a format is likely not performant at scale, it’s surprisingly helpful in doing graph operations in a browser without having to talk to a triple store. JSON-LD can similarly support graph manipulation for small datasets, though the parser and API are more complex because of their implementation.

GraphQL and related solutions can be fully RDF compliant with a certain amount of design work, even if it does not necessarily look like a triple store on the back end. The trade-off in all of these is that such systems give up a certain degree of flexibility for faster access and retrieval of graph objects. This could be done with XML databases or (obviously) JSON databases – make identifiers global and consistent, establish working ontologies, use native tools such as XPath and XQuery on the XML side or GraphQL on the JSON side, and make schema accessible and prescriptive.

The point in all cases is that what determines the nature of a knowledge graph store is not its topical nature – graphs can be anything – so much as a recognition of RDF as a design principle, not just as a technology. As a design principle, RDF showcases deep canonical structures, interoperability across a reasonable set of interchange components, transitive shape rather than the class as a definition language, and the articulation of information at a conceptual level.

## Are LLMs Knowledge Graphs?

If viewed strictly from design principles, Large Language Models (LLMs) are not knowledge graphs, though they are, as my kids would say “knowledge graph adjacent.” I can query an LLM and have it respond with lists of items, filtered by constraints, with additional metadata, in a language that allows for uniquely identifying those resources. It can appear as a hypergraph, with outbound cardinality greater than one. It can generate network graphs and tables and (because Excel can import CSV files), Excel documents.

Over the last several months, I’ve had people tell me that LLMs are not knowledge graphs because knowledge graphs are truthful, and LLMs have been known to hallucinate. This is a very weak argument, easily countered. When you put a “fact” into a knowledge graph, you are putting an assertion into that graph. The assertion (or graph of assertions) that describes data or metadata about a resource is not guaranteed to be true. Rather, you are stating that someone believes this information to be true at a certain time and place under specific conditions. Every statement in that knowledge graph is a belief, albeit one that will likely be supported by provenance. This is as close to “truthiness” as any database can get.

An LLM, on the other hand, has the capacity to absorb a larger body of work, but if that body does not provide some form of provenance (or there is too much inconsistency in the dataset, as is the case with deliberate misinformation) then the LLM will in general hallucinate – it’s garbage in/garbage out, writ large. An LLM that does not practice clean data principles will be just as corrupt as a knowledge graph that does not practice clean data principles.

The difference between knowledge graphs comes primarily from the fact that once information goes into an LLM, there is no way to reconstruct it without rebuilding the whole model. While not _strictly_ accurate, you can think of the information in an LLM as being holographic – the details are smeared into a functional information space optimized for neural network retrieval. I can’t crack open the software and point to where the data is kept like I can with a knowledge graph.

This points to a major point of synergy between knowledge graphs and LLMs. Knowledge graphs become staging areas. They determine what information should go into an LLM, and what information shouldn’t. They provide identifiers for concepts and entities that can then be passed into conceptual models within the LLM, without worrying about erroneous inferencing. This approach also makes it easier to automatically test the knowledge graph prior to the LLM being created.

However, the distinction between knowledge graphs and LLMs will disappear over time. They are symbiotic technologies. As such, I suspect that what will emerge within the next year will be a hybrid product with a knowledge graph front end for editing and LLM back end for human language (and some limited machine language) query, possibly talking some arguably unspecified variant of RDF as a conceptual language.

## Conclusion

Is the Knowledge Graph market about to implode? No. If anything, I think the bigger “danger” to the traditional RDF market is the rise of GraphQL based interfaces, as these end up creating “lite” JSON-based knowledge graphs that may not necessarily have all the core capabilities of traditional quad stores, but that nonetheless provide most of those functions at a lower price point. Implicit inferencing is not necessarily a part of knowledge graphs, though the ability to traverse schemas are.

LLMs, though, will start eating into the query/response part of knowledge graphs, even as LLMs boost the market for tools to create and populate ontologies, LLM reasoners might also go a long way towards providing mappings between complex ontologies, as well as suggesting potential ontological designs. Finally, I believe strongly that the notebook (chat) model for working with knowledge graphs and LLMs both will become a key part of every data analyst’s toolkit.

___

[Kurt Cagle](mailto:kurt.cagle@gmail.com) is a futurist and the managing editor of [The Cagle Report](https://atomic-temporary-163024.wpcomstaging.com/), an exploration of what’s going on in the computational cognitive space. If you have questions about the domain, would like to suggest stories, or just want to shoot the breeze, feel free to set up a meeting in Kurt’s [Calendly page](https://calendly.com/semantical) or find me on [Linked In](https://linkedin.com/in/kurtcagle).