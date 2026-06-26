Assertions (or tuples) can be thought of as resources in their own right. Some assertions may be qualified (_Jane wins the lottery_, for instance, may be given a probability of .00001242 %), or may have an authority associated with it (John says that Jane won the lottery). When an assertion is about another assertion, the referenced assertion is called _reification_. The primary distinction between a property graph and a semantic graph is that in a property graph the edge (or relationship) can carry attributes, while in a semantic graph, a reification node has to be set up that points to the individual components of a tuple. A property graph is somewhat more optimized for accessing such relationships (SPARQL can access them, but it's cumbersome). 

For example, 

:statement 1 a rdf:statement;
	rdf:subject :SherlockHolmes
		rdf:predicate