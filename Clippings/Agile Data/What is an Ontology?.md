[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feee92b74-270e-483c-9a94-a55101df59f9_1024x1024)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feee92b74-270e-483c-9a94-a55101df59f9_1024x1024)

It used to be, not that many years ago that one could clearly define what an ontology was. Such a definition was not T.R. Gruber’s famous quote:

> An ontology is a formal, explicit specification of a shared conceptualization

which sounds suitably impressive and knowledge-focused, but rather, more pragmatically, was the thing that the open-source application Protege produced. This is the working definition of ontologies for an entire generation of semantic professionals, to the extent that even today, some thirty years after Gruber made this remark in his seminal paper on the subject, the Go to app for ontologists is Protege.

However, I’d argue that this view of ontology by application definition is not only getting somewhat hoary, but that it also fails to take into account how ontologies have changed over time. This is understandable - in that period of time, you have seen the rise of the semantic web and linked data, of RDF and SPARQL and SHACL, of XML and JSON, and a plethora of other serializations and tools, all of which have hammered at the definition of ontology in different ways.

At the same time, Protege has become something of a Swiss Army knife, still useful for certain kinds of operations but increasingly questionable as a vehicle for defining ontologies. Thus, when it comes down to defining ontologies, perhaps it is as good a time as any to remove the pragmatic application specifics and get down to a more abstract way of thinking about information, especially given the rise of artificial intelligence.

A good working definition of an ontology can be thought of as follows: _an ontology is a set of schemas that collectively establish the shape of the data held within a named graph._

So what does that mean in practice? A named graph can be thought of as a consistent data collection. Named graphs are typically used in pipeline processing of RDF data, and the triples stored within those named graphs almost invariably follow the same set of rules and utilize the same conceptual vocabularies. A named graph could be an RDF named graph, but it could also be an Excel spreadsheet document, a JSON message, an XML file, even a large language model conceptual space. The point here is that each of these have a consistent structure, and as such it’s reasonable to say that if that structure can be specified as a schema, then translation between their representations become trivial (it’s one to one).

The schema in this case is the _ontology_ for the named graph. Note that the schema in question may actually use shapes from multiple such schemas, with some schemas providing inherited behaviors (such as RDF and RDFS being inherited by SHACL) or concepts and constraints defined in GIST or similar framework being extended, but the key idea here is that the collective set of schema is maximal and fully inclusive over a particular named graph. That set of schema _is_ the ontology for that graph.

Note that an ontology generally does not have to be a part of the named graph in question (and usually won’t be). For instance, if I use SHACL as my language for specifying the ontology, the ontology for the SHACL assertions would be SHACL itself (possibly with some extensions), while the SHACL shapes so described would be the ontology (set of schemas) for the named graph that holds the data.

[

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9ea57e7-9d51-42dd-a2e9-df2025f64430_1884x1468.png)

](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9ea57e7-9d51-42dd-a2e9-df2025f64430_1884x1468.png)

Each of these can (and should) be treated as named graphs. What’s significant here is that the URI of the named graph holding an ontology could also double as the name of that ontology. This means that, if the named graph for the Domain Instance Data has a URI of `https://exemplar.com/data#`, then the following relationships would hold (expressed as SPARQL):

```
#SPARQL
prefix data: &lt;https://exemplar.com/data#&gt;
prefix ontology: &lt;https://exemplar.com/data/ontology#&gt;
prefix shaclplus: &lt;https://exemplar.com/ontology/shaclplus#&gt;

SELECT ?ontology WHERE {
     graph data: {?someElement a data:Element.}
     ?ontology ontology:providesOntologyFor data: .
     }
```

This can also be generalized to retrieve the relevant data named graph:

```
#SPARQL
prefix data: &lt;https://exemplar.com/data#&gt;
prefix ontology: &lt;https://exemplar.com/data/ontology#&gt;
prefix shaclplus: &lt;https://exemplar.com/ontology/shaclplus#&gt;

SELECT ?ontology WHERE {
     graph ?data {?someElement a rdfs:Class.}
     ?ontology ontology:providesOntologyFor ?data .
     }
```

In this particular case, if you know the URI of an element, then you can determine which ontology or ontologies a resource belongs to without ever needing the data graph explicitly.

Furthermore, you can test to see if two resources share any underlying ontologies:

```
<code>#SPARQL
prefix data: &lt;https://exemplar.com/data#&gt;
prefix ontology: &lt;https://exemplar.com/data/ontology#&gt;
prefix shaclplus: &lt;https://exemplar.com/ontology/shaclplus#&gt;

SELECT ?ontology WHERE {
     graph ?data1 {?someElement1 a rdfs:Class.}
     graph ?data2 {?someElement2 a rdfs:Class.}
     ?ontology1 ontology:providesOntologyFor* ?data1 .
     ?ontology2 ontology:providesOntologyFor* ?data2 .
     filter (sameTerm(?ontology1,?ontology2))
     }</code>
```

Here, because you’re dealing with transitive closure on `ontology:providesOntologyFor`, you can find the common definitions, meaning that either they have the same ontology or that they are both expressed in the same schema language (for instance, SHACL). This in turn can tell you how you go about processing the terms relative to one another.

There are several reasons why this is important. If you know, for a given ontology, schematic characteristics, you can use this to store global metadata for that ontology (such as labels, descriptions, or even valid queries, templates, and UI/UX elements). In general you do not want to put this information on an instance or even a class basis, as this can lead to large numbers of unnecessary inbound vectors for ontologies.

This also provides a way of binding graphs with data sources. If you have a named graph (such as `ontology:myOnt1`) that holds an ontology definition, then you can create a record that binds multiple sources to that named graph through its URI. This has a number of potential use cases, most specifically in the case of data catalogs. Moreover, named graph URIs can frequently be passed as parameters to most triple stores and similar knowledge graph engines, providing for everything from orchestration management to discovery.

The final aspect of thinking about named graphs as functionally equivalent to ontologies is in the realm of large language models. An LLM can be thought of as a large, amorphous, but mostly homogenous conceptual space. Much of the current thinking about ontologies in LLM is still at the handwaving stage, as concepts exist primarily as eigenvectors in a very high dimensional space, however, because of the nature of clustering, some things resemble semantic classes in large language models even if they don’t have formal identifiers.

As knowledge graphs increasingly drive the creation of LLMs (i.e., a knowledge graph endpoint becomes either a document producer for ingestion by the LLM trainer or becomes the source for a RAG) this association between a named graph (the channel that drives that endpoint) and an ontology becomes much stronger. This will be worth exploring in greater depth as it happens - TBD.

## Conclusion

By making an explicit connection between a named graph, an associated schema graph, and ontologies, you can provide an operational definition of ontologies that has real-world applications. It’s my belief that named graphs in particular are under-utilized, and represent a level of abstraction that most people are only just beginning to tap into. By acknowledging the equivalency, semantics can move beyond the Protege era and towards a much richer role in the data ecosystem.

[Kurt Cagle](mailto:kurt.cagle@gmail.com) is the Editor of The Ontologist. He lives in Bellevue, Washington.

### Subscribe to The Ontologist

Principles of Metadata Architecture, Graph Theory and AI