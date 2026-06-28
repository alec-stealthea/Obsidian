---
type: Research Clipping
title: "Changing Knowledge Graph Properties and Other RDF Thoughts"
description: "Copyright 2024 Kurt Cagle / The Cagle Report"
timestamp: 2026-06-26T19:19:05Z
---

Copyright 2024 Kurt Cagle / The Cagle Report

The problem with writing a blog is that eventually, you will reach a stage where you contradict yourself. In most cases, such contradictions are not intentional efforts to deceive but rather the results of digging deeper into a problem.

One of the biggest challenges I have faced in digging deep into RDF is that there aren't very many good books about it. Oh, don't get me wrong. There are tons of books on OWL, semantic data modelling, SPARQL, and even a few useful ones on SHACL (and yes, I've added to my queue an article devoted to listing my favourite books in these areas), but RDF, for most ontologists, is something of an afterthought.

However, the more I dig into RDF, the more I discover that RDF is the _machine language_ of semantics for any graph, not just for knowledge graphs. So, what do I mean by machine language? Simply put, you can express something in RDF if something is a graph. It may not look elegant, and I believe most people should never actually see the RDF because it sits very close to the metal. Still, from the machine's standpoint, if something is a data structure, it can ALWAYS be expressed as RDF.

I've talked about property graphs in some depth (which is usually a short-hand for saying Neo4j). Encoding Neo4J code as RDF turns out to be much simpler than you might expect, but that's primarily because there are hidden variables in Neo4J structures that RDF needs to make explicit.

I've also discussed reification and will go back into reification in this article. I've gone from being sceptical about reification to realizing that it plays a central role in knowledge graphs and may also extend to GraphRAG. However, to go down that path, I'm going to have to say up front that I likely have been making things too complex, primarily because the triple store I had been working on before this couldn't create reifiers.

Lately, I have switched back to Jena as my default "testbed" for my ontology book. The Apache Jena project recently upgraded the Jena engine from 4.9 to 5.1. This seemingly minor jump reflects some major updates at a pretty deep level, including performance and memory paging upgrades, to the extent that as an open-source project with much pedigree, it becomes feasible in various environments as production-ready, even if the UIUX is nowhere near enterprise usable. However, for many purposes, it's the equivalent of a custom drag racer - probably not street legal, but with more power than you might expect under the hood.

Jena supports a (somewhat earlier version) of the RDF-star notation, which means that, unlike with previous articles, the code contained here can be tested now.

## Changes and Reifications

Reification is often described as being a statement about a statement. Still, I believe that this is somewhat misleading in that it suggests that the primary use case for reifiers is in annotation. This is a semantic statement, but reifiers go deeper than just saying when a particular item was published. The bigger use case is for determining when a given statement is _in scope_.

Let me explore this a bit more. Consider a very simple use case: _how old is someone?_

In an imperative model, a person's age is almost invariably calculated. You subtract the current time from the date of birth, convert it to years, and then round it down. However, this becomes much more complex when you say, "Find all people in their 50s. It also makes it harder to iterate through properties, because such a property needs to be calculated relative to an unpredictable current time.

A reification provides a unique identifier for a triple. The notation <<\_>> indicates a reifier on that triple, meaning there there is an identifier that is bound to this particular assertion. For instance,

```
<!---->Person:JaneDoe Person:age 34.
&lt;&lt;Person:JaneDoe Person:age 34&gt;&gt; a Reifier: ;
          Reifier:startDate "2023-10-01"^^xs:date ;
          Reifier:endDate "2024-09-30"^^xs:date ;
          .<!---->
```

Suppose that you had a second statement:

```
<!---->Person:JaneDoe Person:age 35.
&lt;&lt;Person:JaneDoe Person:age 35&gt;&gt; a Reifier: ;
          Reifier:startDate "2024-10-01"^^xs:date ;
          .<!---->
```

Notice what the reifier is doing here - it is saying that the first statement is true from Oct 1, 2023, to Sep 30, 2024, while the second statement is true from Oct 1, 2024.

This is important because a knowledge graph (at least in theory) is a statement of valid statements, but a person cannot be both 34 and 35 simultaneously. In other words, either one statement or the other is true, but they cannot both be true simultaneously (that is to say, at the same time). The reifier makes it possible (as I wrote in a recent post) to create conditionally true statements in the graph.

The SPARQL query to retrieve the relevant age can be listed as:

```
<!---->select ?person ?age where {
  values (?testDate ?person) {(now() ?person}
  ?person Person:age ?age.
  optional  {&lt;&lt; ?person Person:age ?age &gt;&gt; Reifier:startDate ?startDate}
  optional {&lt;&lt; ?person Person:age ?age &gt;&gt; Reifier:endDate ?endDate}
  filter (xs:date(?testDate) &gt;= xs:date(?startDate)) || !bound(?startDate)))
  filter ((xs:date(?testDate) &lt; (xs:date(?endDate)) || !bound(?endDate)))
}<span> </span>
```

In this case, ?person and ?testDate are defined as values (open-ended and now(), respectively) but could be overruled by an external parametric call. The assertion is retrieved, and then all reifications that match this pattern are retrieved, with appropriate start and end dates. The two filter statements then make sure that the reference date is later than the start date where the statement is valid (or if no start date has yet been set, and that the end date is either after the given date or no end date has been set, making it the most current statement.

Put another way, a reifier is a versioning mechanism—it is a way of saying that some constraint must be in place for this statement to be true. Note that in the above example, the reifiers are both contained as optional statements because a given property may not (indeed, most likely will not) have reifiers unless the property has been changed or is only applicable with a given date range or similar constraint.

Let's say you wanted to set a new property for a knowledge graph. This is one of those situations where using SPARQL UPDATE is superior to just trying to manually update a property by deleting a triple and adding another one. For instance, the following illustrates one way that you can update the age from 35 to 36:

```
<!---->insert {
     ?person Person:age ?newAge.
     &lt;&lt;?person Person:age ?oldAge &gt;&gt; Reifier:endDate ?date .
     &lt;&lt;?person Person:age ?newAge &gt;&gt; Reifier:startDate ?date .
} where {
     values (?person ?newAge ?date) {(?person 36 xsd:dateTime(now()))}
    optional {
         ?personal Person:age ?oldAge.
         filter not exists {&lt;&lt;?personal Person:age ?oldAge &gt;&gt; Reifier:endDate ?oldDate )
         filter( ?oldAge != ?newAge)
    }
}<!---->
```

The above SPARQL UPDATE does the following:

Pass in the ?person to which this applies, the new age value you want the property to take. and the date you're updating (defaults to the current date) should usually be set as such). All old age values are retrieved, and any expression that doesn't have an associated reification end date will be referenced. There should be one at most, but all will be retrieved if there are multiple ones. Finally, this value is tested to ensure it doesn't match the new age, as there's no value to update it for otherwise.

Once these have been calculated, the old age-triples are terminated (Reifier:endDate is made non-null), and a new age-triple is constructed (or reconstructed if it already exists).

This can be generalized to any triple, by the way:

```
<!---->insert {
     ?s ?p ?newValue
     &lt;&lt;?s ?p ?oldValue&gt;&gt; Reifier:endDate ?date .
     &lt;&lt;?s ?p ?newValue &gt;&gt; Reifier:startDate ?date .
} where {
     values (?s ?p ?newValue ?date) {(?s ?p ?newValue xsd:dateTime(now()))}
    optional {
         ?s ?p ?oldValue.
         filter not exists {&lt;&lt;?s ?p ?oldValue &gt;&gt; Reifier:endDate ?oldDate )
         filter( ?oldVallue != ?newValue)
    }
}<!---->
```

There are several key points to observe here:

-   At no point were triples ever removed from the graph
-   You do not need to know the old value of the object at the outset to set the new value of the object.
-   It does not matter whether the object of the triple is a literal or a URI.
-   It works regardless of the underlying data model.
-   There are a few proposals for reifier properties, but none that are yet consistent. Use what works for you for now, then you can change over to a standard if needed later.

As I pointed out earlier, knowledge graphs should evolve over time. However, doing so has historically been problematic because you are not generally storing wholely contained objects, only triples. Reifiers seem to be a fairly effective solution to this particular problem, one that (as more platforms support rdf-star notation) should be portable across different systems.

## Adding Context via Reification

One way of thinking about a reifier is that provides a way to set context on a triple. Some of this annotational in nature - why was a change made? who made it? how? - all the quesions that you expect from a journalist and that is significant for provenance. In my experience, this kind of metadata is typically best applied to specific objects (i.e., at the ?s a ?class level), since it usually describes how a given entity first comes into the graph, rather than specific metadata about property changes.

This is especially true for an object that has a long existence in the system. For instance, if I wanted to describe a customer, I may note when that customer first comes into scope:

```
<!---->Person:JaneDoe a Person: .
&lt;&lt; Person:JaneDoe a Person: &gt;&gt; Reifier:startDate "2021-03-02"^^xsd:date.<!---->
```

Note that this is not the same thing as when the person is born, unless the record exists at a hospital:

```
<!---->Person:JaneDoe a Person: ;
     Person:birthDate "1995-09-11"^^xs:date ;
     .
&lt;&lt; Person:JaneDoe a Person: &gt;&gt; Reifier:startDate "2021-03-02"^^xs:date.<!---->
```

The first date is the birthdate of the individual, while the second is the day that the RECORD of the individual was made in the data system. Even when the person dies, the record will likely persist, but it likely will eventually be deprecated, or made to run out of scope.

This is an important point about reifiers - they arent really descriptions of their subjects, but rather provide a way of identifying the relationship between the subject and object given a particular predicate. In my last article on this topic, I talked about the Liz Burton marriage scenario. Here is an example where you can actually use a reification to describe intervals for given marriage, even in the case where a person remarries someone they married and divorced earlier. This is a different approach than the one I discussed previously, but is no less valid (and may actually be simpler):

```
<!---->Marriage: rdfs:subClassOf Reifier: .

Person:Liz Person:married Person:Richard .
Person:Liz Person:married Person:David .
Person:Mary Person:married Person Richard .

&lt;&lt; Person:Liz Person:married Person:Richard &gt;&gt; a Marriage: ;
      Reifier:startDate "1960-01-01"^^xs:date ;
      Reifier:endDate "1969-12-31"^^xs:date ; 
      Marriage:terminationReason MarriageTerminationReason:Divorce ;
      .
&lt;&lt; Person:Liz Person:married Person:David &gt;&gt; a Marriage: ;
      Reifier:startDate "1970-01-01"^^xs:date ;
      Reifier:endDate "1979-12-31"^^xs:date ; 
      Marriage:terminationReason MarriageTerminationReason:DeathOfSpouse;
      .
&lt;&lt; Person:Liz Person:married Person:Richard &gt;&gt; a Marriage: ;
      Reifier:startDate "1980-01-01"^^xs:date ;
      Reifier:endDate "1989-12-31"^^xs:date ; 
      Marriage:terminationReason MarriageTerminationReason:Divorce ;
      .
&lt;&lt; Person:Mary Person:married Person:Richard &gt;&gt; a Marriage: ;
      Reifier:startDate "1970-01-01"^^xs:date ;
      Reifier:endDate "1979-12-31"^^xs:date ; 
      Marriage:terminationReason MarriageTerminationReason:Divorce ;
      .<!---->
```

The relationship described here by the reifier is a marriage relationship, which is given here as a subclass of the Reifier class.

Time for a brief diversion. A reification has an order - the subject has a relationship with the object. In theory this relationship is symmetric - Richard also married Liz, but this can cause a lot of duplication for comparatively little value.

One convention that modellers use is to identify, when you have what appears to be a symmetric relationship, a way of making this asymmetric, so that you can more readily assign one party or another to a role consistently. For instance, in a marriage you have two spouses. At one point, a marriage relationship could be identified by the gender of the spouse, but this (fairly arbitrary) differentiation has not stood the test of time.

I find that it in such a relationship, you can make use of older customs such as talking about courting - who did the asking to be married, and who accepted. In theory one can also talk about marriages between multiple parties, where the modeling can get very complicated, but even there, this can be decomposed into one people asking to marry, and one person accepting. Call it the courter and the courtee.

Thus the convention in the above reification can be stated as "the courtee will always be in the subject position, the courter in the object position" with any given marriage. This is what I'd call the proposer / acceptor pattern in design: the proposer makes the offer, the acceptor chooses to accept (or not accept) the offer. It's a weak pattern, but it comes up often enough in human relationships that it's usually a pretty good way to differentiate between two member of the same class (e.g., Person:).

This is frequently preferable to simply specifying that you have two spouses, without differentiation. When you have an asymmetric relationship, you essentially have a one-to-one relationship. This keeps you cardinality relationships down to four states:

```
<!---->Required: MinCount 1, MaxCount 1
Optional: MinCount  0, MaxCount 1
One or more: MinCount 1, MaxCount Unbounded
Zero or more: MinCount 0, MaxCount Unbounded<span> </span>
```

These four states let you design without having to deal with specialized constraints (MinCount 0, MaxCount 2, for instance).

Indeed, this brings up a related design pattern: **truly bounded lists are rare in modelling**. If you have a situation where you have a requirement for two or three (or twelve) of something as an upper bound, chances are pretty good that the actual list is and should be unbounded, and you are placing a constraint for convenience that will likely incur technical debt down the road. More harm has been done by setting a limit of five items then discovering you have a situation where you need six (a similar pattern is creating variables v1,v2,v3,v4, and v5, and then discovering you need to add another variable v6 after the fact. This is why arrays exist.

Taking this back to the given example, by using a reifier, you are creating an implicit acceptor/proposer relationship, specifically

```
<!---->?acceptor ?action ?proposer.
?subject ?predicate ?object .
Person:Liz Person:married Person:Richard.<!---->
```

Note that if you do not know who proposed and who accepted, you can still find out who was married to whom by using a UNION in the SPARQL statement (this assumes ?refPerson is passed as a parameter.

```
<!---->select ?person ?role WHERE {
values (?refPerson) (?refPerson)}
   {
   ?person Person:married ?refPerson.
   bind ("acceptor" as ?role) 
   } UNION {
   {?refPerson Person:married ?person} 
   bind ("proposer" as ?role)
   }
}<!---->
```

With a reifier, this is only a bit more complicated (?r is the reifier URI).

```
<!---->select ?person ?role WHERE {
values (?r ?refPerson) {(?r ?refPerson})
{
   ?r rdf:subject ?refPerson.
   ?r rdf:object ?person.
   bind("acceptor" as ?role)
} UNION {
   ?r rdf:subject ?person.
   ?r rdf:object ?refPerson.
   bind("proposer" as ?role)
   }
}<!---->
```

There are several lessons here, but perhaps the key one is:

> When possible, avoid symmetric relationships in modeling in favor of asymmetric relationships. It reduces the number of triples by a factor of two at the expense of slightly more complex queries.

A second one, having to do less with RDF and more with modelling in general:

> As an ontologist, your role is to check the cultural assumptions being made, and to ensure that you are not baking biased assumptions into your model. This is what separates a good ontologist from a bad one.

## And Now For Something Completely Different

I am writing a book on ontology development and engineering. I would be interested in hearing from you, o gentle readers, about conundrums that you have come up with in terms of modelling, questions that you may have, use cases that you'd like to see resolved, or observations about RDF, SHACL, SPARQL and so forth. Please feel free to drop me a line either on Linked In or at [kurt.cagle@thecaglereport.com](mailto:kurt.cagle@thecaglereport.com).

In media res,

![](https://media.licdn.com/dms/image/v2/D5612AQGXOhxCF6vwrQ/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1729910756297?e=1741219200&v=beta&t=mv0pzkdQtH1JvFZw3SHbCNWbxcFr-ef6TzTGNGrhI9g)

[Kurt Cagle](https://www.linkedin.com/in/kurtcagle/?lipi=urn%3Ali%3Apage%3Ad_flagship3_pulse_read%3ByK6It3xqRDefz8LSpk2fyw%3D%3D)

Editor, [The Cagle Report](https://www.linkedin.com/newsletters/the-cagle-report-6672594836610252800/?lipi=urn%3Ali%3Apage%3Ad_flagship3_pulse_read%3B9V87OzlATyCZvW0gPCWGrA%3D%3D)

If you want to shoot the breeze or have a cup of virtual coffee, I have a Calendly account at [https://calendly.com/theCagleReport](https://calendly.com/theCagleReport). I am available for consulting and full-time work.