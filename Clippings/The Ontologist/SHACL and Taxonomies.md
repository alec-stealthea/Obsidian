---
feature: thumbnails/external/123052ac68e5090b9072b3dcf0d02a77.jpg
thumbnail: thumbnails/resized/d8211bcac6bb97eafac12cd062b5c122_b89e22fb.jpg
---
I’ve talked a lot about knowledge graphs, and ontologies in particular, in this column, but I haven’t spent as much time talking about taxonomies. However, understanding the distinction (and especially how these play into SHACL) can make it far easier to design effective knowledge graphs.

When working with knowledge graphs, it’s easy to get overwhelmed by the complexity. However, at a core level, a knowledge graph can be broken down into a few key (albeit somewhat overlapping) sections:

- The **ontology** (the underlying structure, which you can think of as the _**shape**_ of the knowledge graph).
    
- The **taxonomy** (the classifications used to _**organise**_ information into different conceptual knowledge systems).
    
- The **instance data** consists of models of individual _**items**_ that use both the ontology to shape and the taxonomy to classify different facets of those items.
    
- **Annotations** (often described via reifications) that indicate the _**events**_ that the properties of an object participate in or that provide an external description or comments about the items.
    

- **Operational content** can be thought of as both configuration code and the set of queries that are used to access the knowledge graph. This also includes external ontologies such as OWL or SHACL.
    

What is most noteworthy here is that there is a distinction between the top three, and how they are handled, and even defined, varies significantly from one another.

Taxonomies can, at their core, be considered lists of concepts or categories, whereas instance data are lists of things. This is a subtle but important distinction, and one that is not always easy to tell apart. This gets down to some basic grammar, specifically the use of nouns and adjectives. A noun is typically a thing or some assemblage of things (such as a person, a government, a place, a book). What’s most notable about things is that they are generally unique.

An adjective, on the other hand, is qualitative or descriptive, providing characterisations about nouns that help to differentiate one particular set of items from others. We talk about tall people, green books, and fast cars. Each of these terms (_tall_, _green_, _fast_) in terms is a state that a given property (or facet) can take, here _height, colour, speed_. The noun in this case is a set of individuals, while each facet determines a particular characteristic or classification of that individual in some way.

Such facets and their corresponding concepts make up the bulk of taxonomies. In OWL, these are referred to as individuals, with the set of related individuals called an enumeration. in SKOS, each group or set is known as a concept scheme with each individual value known as a concept. In XSD, these same concepts are called enumeration values, with the sets of related enumerations called an enumeration type. In data modeling, the variable (such as color) is often referred to as a facet, while the specific instance of that value (such as green) is referred to as the facet value.

[

![](https://substackcdn.com/image/fetch/$s_!xehZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbabbe78c-a419-4782-9ca4-53ce818479c9_1494x2078.png)



](https://substackcdn.com/image/fetch/$s_!xehZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbabbe78c-a419-4782-9ca4-53ce818479c9_1494x2078.png)

This diversity of terms derives from the fact that different domains of interest have typically had to describe the same fundamental concept (a finite and relatively small set of related classes) in different ways.

What makes this complicated is that RDFS treats everything as classes, but in many respects this tends to overload what should be two (or even three) different kinds of relationships as a single `rdf:type`. Indeed, if you assume that a facet “group” is itself a conceptual facet, (in effect, what happens with `skos:concept`), then you eliminate the need to create an “overseer” class and can just use the facets as the cornerstone for a taxonomy.

## Creating a SHACL Taxonomy Term Shape

Shapes are more generalised than classes, allowing for some interesting applications when finding a good balance for modelling various concepts within taxonomies.

SKOS, or the Simple Knowledge Ontology System, is a taxonomy system that was first formalised in 2003, shortly after RDF became a standard. It has a number of features that make it suitable for the kind of taxonomies discussed above, but it is also a fixed standard that could use additional enhancements. To illustrate alternatives that nonetheless share many of the same characteristics, I’ll create a new namespace called tax: that illustrates a generalised structure for a taxonomy language. The following is a sample showing a simple colour taxonomy.

```
# Define the Comprehensive Color Taxonomy
color:ColorTaxonomy
    a tax:Taxonomy ;
    tax:identifier "COMPREHENSIVE_COLOR_SYSTEM" ;
    tax:defaultLanguage "en" ;
    tax:supportedLanguages "en", "fr", "es", "de", "it", "pt" ;
    tax:label "Comprehensive Color Classification System"@en ;
    tax:alternativeLabel "Advanced Color Taxonomy"@en, "Système de Classification Chromatique"@fr, "Sistema de Clasificación de Colores"@es, "Umfassendes Farbklassifikationssystem"@de ;
    tax:acronym "CCCS" ;
    tax:description "Complete hierarchical organization of colors including primary, secondary, tertiary, neutral, warm, cool, and specialized color categories with international naming conventions"@en ;
    tax:version "2.0" .

# Level 0 - Major Color Categories
color:PRIMARY_COLORS
    a tax:Node ;
    tax:identifier "PRIMARY_COLORS" ;
    tax:defaultLanguage "en" ;
    tax:supportedLanguages "en", "fr", "es", "de", "it", "pt" ;
    tax:label "Primary Colors"@en ;
    tax:alternativeLabel "Base Colors"@en, "Fundamental Colors"@en, "Couleurs Primaires"@fr, "Colores Primarios"@es, "Grundfarben"@de, "Colori Primari"@it, "Cores Primárias"@pt ;
    tax:synonym "Elementary Colors"@en, "Pure Colors"@en, "Couleurs Pures"@fr ;
    tax:acronym "PC" ;
    tax:antonym color:NEUTRAL_COLORS ;
    tax:description "Base colors that cannot be created by mixing other colors in traditional color theory"@en ;
    tax:belongsToTaxonomy color:ColorTaxonomy ;
    tax:level 0 ;
    tax:status "ACTIVE" ;
    tax:sortOrder 1 .

# Level 1 - Secondary Colors
color:GREEN
    a tax:Node ;
    tax:identifier "GREEN" ;
    tax:defaultLanguage "en" ;
    tax:supportedLanguages "en", "fr", "es", "de", "it", "pt" ;
    tax:label "Green"@en ;
    tax:alternativeLabel "Vert"@fr, "Verde"@es, "Grün"@de, "Verde"@it, "Verde"@pt ;
    tax:synonym "Jade"@en, "Emerald Green"@en, "Vert Émeraude"@fr, "Verde Esmeralda"@es ;
    tax:antonym color:RED ;
    tax:description "Secondary color created by mixing blue and yellow, symbol of nature and growth"@en ;
    tax:belongsToTaxonomy color:ColorTaxonomy ;
    tax:parentNode color:SECONDARY_COLORS ;
    tax:level 1 ;
    tax:status "ACTIVE" ;
    tax:sortOrder 1 .

# Level 2 - Shades of Color
color:EMERALD
    a tax:Node ;
    tax:identifier "EMERALD" ;
    tax:defaultLanguage "en" ;
    tax:supportedLanguages "en", "fr", "es", "de", "it" ;
    tax:label "Emerald"@en ;
    tax:alternativeLabel "Emerald Green"@en, "Jewel Green"@en, "Vert Émeraude"@fr, "Verde Esmeralda"@es, "Smaragdgrün"@de, "Verde Smeraldo"@it ;
    tax:synonym "Brilliant Green"@en, "Gem Green"@en, "Vert Brillant"@fr ;
    tax:description "Vivid green with blue undertones, precious and luxurious"@en ;
    tax:belongsToTaxonomy color:ColorTaxonomy ;
    tax:parentNode color:GREEN ;
    tax:level 2 ;
    tax:status "ACTIVE" ;
    tax:sortOrder 1 .
```

A more robust example of the taxonomy can be seen below :[1](https://ontologist.substack.com/p/shacl-and-taxonomies?utm_source=substack&utm_medium=email#footnote-1-173117561)

This particular taxonomy can be illustrated via a mermaid diagram:

[

![](https://substackcdn.com/image/fetch/$s_!2lEi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbeb2f3c8-1934-4c3a-96c3-77328700b80a_3209x3840.png)



](https://substackcdn.com/image/fetch/$s_!2lEi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbeb2f3c8-1934-4c3a-96c3-77328700b80a_3209x3840.png)

Each entry has roughly the same properties, which are in many cases analogous to SKOS properties. For instance, the color “Emerald Green” can be rendered as follows:

```
color:EMERALD
    a tax:Node ;
    tax:identifier "EMERALD" ;
    tax:defaultLanguage "en" ;
    tax:supportedLanguages "en", "fr", "es", "de", "it" ;
    tax:label "Emerald"@en ;
    tax:alternativeLabel "Emerald Green"@en, "Jewel Green"@en, "Vert Émeraude"@fr, "Verde Esmeralda"@es, "Smaragdgrün"@de, "Verde Smeraldo"@it ;
    tax:synonym "Brilliant Green"@en, "Gem Green"@en, "Vert Brillant"@fr ;
    tax:description "Vivid green with blue undertones, precious and luxurious"@en ;
    tax:belongsToTaxonomy color:ColorTaxonomy ;
    tax:parentNode color:GREEN ;
    tax:level 2 ;
    tax:status "ACTIVE" ;
    tax:sortOrder 1 .
```

There are a few properties that are distinct from SKOS however:

- **tax:level**. This indicates the distance of the given node from its root concept ( indicated by `tax:belongsToTaxonomy`). This makes it possible to determine the level of specificity of the taxonomy, rather than attempting to compute this on the fly (for instance, tax:level 0 would be Secondary Colours, tax:level 1 would be Green, and tax:level 2 would be Emerald Green).
    
- **tax:status.** This is used to indicate whether the node in question is active or deprecated.
    
- **tax:sortOrder.** This is used both to indicate a fixed ordering of child nodes for a given parent node, as well as a way to create an associated weight for a term (the sortOrder / the total number of siblings for that parent).
    
- **tax:antonym.** This, in general, indicates an opposition to the term in question. For instance, the opposite of red will typically be its complementary colour, green. Note that with respect to colours, this is subject to a certain degree of interpretation.
    
- **tax:defaultLanguage.** This is typically used to indicate the language used for interfaces if not otherwise specified.
    

The sort order and taxonomy levels provide a way to provide distance and weighting within the taxonomy, which makes them especially useful for mapping to neural network features. For instance, there are four shades of green from emerald green (with a sort order of 1) to olive green (with a sort order of 4). This means that you can create a “green feature” for forest green (3) with a weight of 0.75 (3/4).

Suppose you had the above taxonomy for cars (the Car shape) and wanted to create a specific constraint that the car had an exterior colour from a level two colour, such as emerald green. Such a usage might be part of a car declaration, such as:

```
car:Vehicle2024_001
    a car:Vehicle ;
    car:vin "1HGBH41JXMN109186" ;
    car:make "Honda" ;
    car:model "Civic" ;
    car:year 2024 ;
    car:hasExteriorColor color:EMERALD . #Here's the exterior color
```

The specific definition for the property shape car:hasExteriorColor would then look like the following (with the added constraint that it must be from one of four primary colour blocks of red, blue, green or grey):

```
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix car: <http://example.org/automotive#> .
@prefix tax: <http://example.org/taxonomy#> .
@prefix color: <http://example.org/color#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix dash: <http://datashapes.org/dash#> .

# Car Shape with Exterior Color Property
:CarShape
    a sh:NodeShape ;
    sh:targetClass car:Vehicle ;
    sh:name "carShape" ;
    sh:label "Automotive Vehicle Validation Shape" ;
    sh:description "Validates properties of automotive vehicles including color specifications" ;
    
    sh:property [
        sh:name "exteriorColor" ;
        sh:label "Exterior Color Property" ;
        sh:description "Validates that exterior color references a specific level 2 color from the color taxonomy" ;
        sh:path car:hasExteriorColor ;
        sh:nodeKind sh:IRI ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:class tax:Node ;
        sh:message "Exterior color must reference exactly one level 2 color node from the color taxonomy" ;
        
        # Constraint to ensure it's a level 2 color
        sh:sparql [
            sh:name "exteriorColorLevelConstraint" ;
            sh:label "Exterior Color Level Constraint" ;
            sh:description "Ensures exterior color is a level 2 color from the active color taxonomy" ;
            sh:message "Exterior color must be a level 2 color (specific shade) from the color taxonomy" ;
            sh:select """
                SELECT $this WHERE {
                    $this car:hasExteriorColor ?color .
                    FILTER NOT EXISTS {
                        ?color tax:level 2 ;
                               tax:status "ACTIVE" ;
                               tax:belongsToTaxonomy color:ColorTaxonomy .
                    }
                }
            """
        ] ;
        
        # Additional constraint to ensure color is from approved categories
        sh:sparql [
            sh:name "exteriorColorCategoryConstraint" ;
            sh:label "Exterior Color Category Constraint" ;
            sh:description "Ensures exterior color belongs to an approved parent color category" ;
            sh:message "Exterior color must belong to Red, Blue, Green, or Gray color families" ;
            sh:select """
                SELECT $this WHERE {
                    $this car:hasExteriorColor ?color .
                    ?color tax:level 2 ;
                           tax:parentNode ?parentColor .
                    FILTER NOT EXISTS {
                        ?parentColor tax:identifier ?parentId .
                        FILTER(?parentId IN ("RED", "BLUE", "GREEN", "GRAY"))
                    }
                }
            """
        ]
    ] ;
```

The property first identifies that the property will be of type `tax:Node` , which doesn’t necessarily tell you a lot, but does indicate that the property should be a taxonomy node. This is actually pretty useful, because it segregates your knowledge graph into either entities (such as cars) or taxonomy terms (colours).

The second part of the `Car:hasExteriorColor` Property, however, provides a more nuanced definition by establishing two distinct constraints, which are specified as SPARQL constraints. The first constraint identifies that the colour must be from the set of _shades_ (aka level two colours), while the second limits those to shades within the RED, BLUE, GREEN or GRAY level 1 colours (in other words, no orange or purple cars here).

Significantly, each of these provides secondary messages that can be used both for validation and for documentation (as these messages essentially correspond to MUST, SHOULD, or CAN have clauses within a requirements document. Put another way:

> You can think of a SHACL graph as being the encoding of a requirements specification document.

One additional consequence of this structure is that taxonomies themselves can be seen not as one giant hierarchy, but rather a collection of independent collections of concepts, such as roles (various job titles), types (engine type, for instance), geofeatures (rivers, countries, cities, continents, etc.), genera (cats, dogs, gerbils) and similar breakdowns. Such taxonomy terms may have additional properties - units provide a good example of this - but the core terms remain the same.

The full taxonomy schema is quite extensive, but it should be noted that it is also mostly straightforward. For instance, the property shape for the path `tax:synonym` provides a fair amount of metadata for that particular predicate, metadata that often tends to get lost in OWL models:

```
    sh:property [
        sh:name "synonyms" ;
        dash:label "Synonyms Property" ;
        sh:description "Validates synonymous terms that have equivalent meaning to the primary label" ;
        sh:path tax:synonym ;
        sh:nodeKind sh:Literal ;
        sh:datatype rdf:langString ;
        sh:maxLength 100 ;
        sh:message "Synonyms are terms with equivalent meaning with language tags (max 100 characters each)" ;
        dash:analog skos:altLabel
    ] ;
```

The `dash:label` and `sh:description` properties obviously provide a way of identifying the properties (`dash:label` will likely become s`h:label` at some point, as the semantics for `sh:name` seem increasingly to use it as a variable or programmatic name. Additionally, synonyms are restricted to being of a certain length, which may be a constraint requirement for their inclusion in relational database fields.

The `dash:analog` property is worth especially noting here. An **analog** property is a property in a different namespace that serves a similar function to the indicated property, albeit not necessarily in an identical manner. The `tax:synonym` properties and the `skos:altLabel` properties, for instance, both obviously serve similar purposes in their respective ontologies, even if the way that they do it may vary somewhat. Analogs are useful primarily in intelligent systems where there is a clear transformation from one ontological property in one system to the analog in another. This can make for far more targeted mappings.

## Summary

This document is not a formal proposal for a taxonomy system; instead, it illustrates how to define taxonomy systems that integrate well with SHACL. Taxonomies play a very important role in knowledge graphs - they help to qualify (and to some extent quantify) the properties of entities, and as such can be seen as intermediate objects. All concepts are tax:Node terms in this particular view, making it easier to write queries for searching the taxonomy space. It should be noted that taxonomies are not SHACL, but they weave through SHACL definitions, providing context, flavour, and classification to your data.