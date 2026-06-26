## Abstract

DCAT is an RDF vocabulary designed to facilitate interoperability between data catalogs published on the Web. This document defines the schema and provides examples for its use.

DCAT enables a publisher to describe datasets and data services in a catalog using a standard model and vocabulary that facilitates the consumption and aggregation of metadata from multiple catalogs. This can increase the discoverability of datasets and data services. It also makes it possible to have a decentralized approach to publishing data catalogs and makes federated search for datasets across catalogs in multiple sites possible using the same query mechanism and structure. Aggregated DCAT metadata can serve as a manifest file as part of the digital preservation process.

The namespace for DCAT terms is `http://www.w3.org/ns/dcat#`

The suggested prefix for the DCAT namespace is `dcat`

## Status of This Document

_This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the [W3C technical reports index](https://www.w3.org/TR/) at https://www.w3.org/TR/._

This document was published by the [Dataset Exchange Working Group](https://www.w3.org/2017/dxwg/) as a [Superseded Recommendation](https://www.w3.org/policies/process/#RecsSup). A newer specification exists that is recommended for new adoption in place of this specification.

For purposes of the W3C Patent Policy, this Superseded Recommendation has the same status as an active Recommendation; it retains licensing commitments and remains available as a reference for old -- and possibly still deployed -- implementations, but is not recommended for future implementation. New implementations should follow the [latest version](https://www.w3.org/TR/vocab-dcat/) of the Data Catalog Vocabulary (DCAT) specification.

This document defines a major revision of the original DCAT vocabulary (\[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\]) in response to new use cases, requirements and community experience since that publication. This revision extends the original DCAT standard in line with community practice while supporting diverse approaches to data description and dataset exchange. The main changes to the DCAT vocabulary have been:

-   loosening of constraints in class and property definitions to promote re-use of terms and modularity
-   addition of a [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) class for representing any asset than can be included in the catalog, this is now the super-class of [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset)
-   addition of [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service), as a sub-class of [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource), to support catalog service end-points providing access to data assets
-   addition of ways to represent [loosely structured catalogs](https://www.w3.org/TR/vocab-dcat-2/#examples-bag-of-files), where there is no distinction between a dataset and its distributions
-   more details for the ways of representing [dataset provenance](https://www.w3.org/TR/vocab-dcat-2/#examples-dataset-provenance) and [quality](https://www.w3.org/TR/vocab-dcat-2/#quality-information)
-   an [alignment](https://www.w3.org/TR/vocab-dcat-2/#dcat-sdo) between the DCAT vocabulary and the schema.org vocabulary

This new version of the vocabulary updates and expands the original but preserves backward compatibility. A full list of the significant changes (with links to the relevent github issues) is described in [§ D. Change history](https://www.w3.org/TR/vocab-dcat-2/#changes).

The exit criteria for CR focussed on v2 new features that replicate features that were included in application profiles of v1 as a way of remedying missing and necessary elements. The exit criteria also included recent commitments by organisations such as EC Joinup to [adopt the DCAT v2 model](https://joinup.ec.europa.eu/solution/abr-specification-registry-registries/document/specification-registry-registries-version-meeting-september) in their work. Implementation will be evidenced by showing use of the new properties/classes (or terms with equivalent meaning) in implementations of catalogs.

[Issues, requirements, and features](https://github.com/w3c/dxwg/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Adcat+) that have been considered and discussed by the Data eXchange Working Group but have not been addressed due to lack of maturity or consensus are collected in GitHub. Those believed to be a priority for a future release are in the milestone [DCAT Future Priority Work](https://github.com/w3c/dxwg/milestone/15).

### DCAT history[](https://www.w3.org/TR/vocab-dcat-2/#dcat_history)

The original DCAT vocabulary was developed and [hosted](http://vocab.deri.ie/dcat) at the Digital Enterprise Research Institute (DERI), then refined by the [eGov Interest Group](https://www.w3.org/egov/), and finally standardized in 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] by the [Government Linked Data (GLD)](https://www.w3.org/2011/gld/) Working Group.

This revised version of DCAT was developed by the [Dataset Exchange Working Group](https://www.w3.org/2017/dxwg/) in response to a new set of Use Cases and Requirements \[[DCAT-UCR](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ucr "Dataset Exchange Use Cases and Requirements")\] gathered from peoples' experience with the DCAT vocabulary from the time of the original version, and new applications that were not considered in the first version. A summary of the changes from \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] is provided in [§ D. Change history](https://www.w3.org/TR/vocab-dcat-2/#changes).

### External terms[](https://www.w3.org/TR/vocab-dcat-2/#external_terms)

DCAT incorporates terms from pre-existing vocabularies where stable terms with appropriate meanings could be found, such as [`foaf:homepage`](http://xmlns.com/foaf/0.1/homepage) and [`dct:title`](http://purl.org/dc/terms/title). Informal summary definitions of the externally-defined terms are included in the DCAT vocabulary for convenience, while authoritative definitions are available in the normative references. Changes to definitions in the references, if any, supersede the summaries given in this specification. Note that conformance to DCAT ([§ 4\. Conformance](https://www.w3.org/TR/vocab-dcat-2/#conformance)) concerns usage of only the terms in the DCAT vocabulary specification, so possible changes to other external definitions will not affect the conformance of DCAT implementations.

This document was produced by a group operating under the [W3C Patent Policy](https://www.w3.org/Consortium/Patent-Policy/). W3C maintains a [public list of any patent disclosures](https://www.w3.org/2004/01/pp-impl/99375/status) made in connection with the deliverables of the group; that page also includes instructions for disclosing a patent. An individual who has actual knowledge of a patent which the individual believes contains [Essential Claim(s)](https://www.w3.org/Consortium/Patent-Policy/#def-essential) must disclose the information in accordance with [section 6 of the W3C Patent Policy](https://www.w3.org/Consortium/Patent-Policy/#sec-Disclosure).

This document is governed by the [1 March 2019 W3C Process Document](https://www.w3.org/2019/Process-20190301/).

## Table of Contents

1.  [1\. Introduction](https://www.w3.org/TR/vocab-dcat-2/#introduction)
2.  [2\. Motivation for change](https://www.w3.org/TR/vocab-dcat-2/#motivation)
3.  [3\. Namespaces](https://www.w3.org/TR/vocab-dcat-2/#namespaces)
    1.  [3.1 Normative namespaces](https://www.w3.org/TR/vocab-dcat-2/#normative-namespaces)
    2.  [3.2 Non-normative namespaces](https://www.w3.org/TR/vocab-dcat-2/#non-normative-namespaces)
4.  [4\. Conformance](https://www.w3.org/TR/vocab-dcat-2/#conformance)
5.  [5\. Vocabulary overview](https://www.w3.org/TR/vocab-dcat-2/#vocabulary-overview)
    1.  [5.1 DCAT scope](https://www.w3.org/TR/vocab-dcat-2/#dcat-scope)
    2.  [5.2 RDF considerations](https://www.w3.org/TR/vocab-dcat-2/#dcat-rdf)
    3.  [5.3 Basic example](https://www.w3.org/TR/vocab-dcat-2/#basic-example)
    4.  [5.4 Classifying datasets thematically](https://www.w3.org/TR/vocab-dcat-2/#classifying-datasets)
    5.  [5.5 Classifying dataset types](https://www.w3.org/TR/vocab-dcat-2/#classifying-dataset-types)
    6.  [5.6 Describing catalog records metadata](https://www.w3.org/TR/vocab-dcat-2/#describing-catalog-records-metadata)
    7.  [5.7 Dataset available only behind some Web page](https://www.w3.org/TR/vocab-dcat-2/#example-landing-page)
    8.  [5.8 A dataset available as a download and behind some Web page](https://www.w3.org/TR/vocab-dcat-2/#a-dataset-available-as-download-and-behind-some-web-page)
    9.  [5.9 A dataset available through a service](https://www.w3.org/TR/vocab-dcat-2/#a-dataset-available-from-a-service)
6.  [6\. Vocabulary specification](https://www.w3.org/TR/vocab-dcat-2/#vocabulary-specification)
    1.  [6.1 RDF representation](https://www.w3.org/TR/vocab-dcat-2/#RDF-representation)
    2.  [6.2 Elements from other vocabularies](https://www.w3.org/TR/vocab-dcat-2/#external-vocab)
        1.  [6.2.1 Complementary vocabularies](https://www.w3.org/TR/vocab-dcat-2/#complements)
        2.  [6.2.2 Element definitions](https://www.w3.org/TR/vocab-dcat-2/#dependencies)
    3.  [6.3 Class: Catalog](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog)
        1.  [6.3.1 Property: homepage](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_homepage)
        2.  [6.3.2 Property: themes](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_themes)
        3.  [6.3.3 Property: has part](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_has_part)
        4.  [6.3.4 Property: dataset](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_dataset)
        5.  [6.3.5 Property: service](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_service)
        6.  [6.3.6 Property: catalog](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog)
        7.  [6.3.7 Property: catalog record](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog_record)
    4.  [6.4 Class: Cataloged Resource](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource)
        1.  [6.4.1 Property: access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights)
        2.  [6.4.2 Property: conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_conforms_to)
        3.  [6.4.3 Property: contact point](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_contact_point)
        4.  [6.4.4 Property: resource creator](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator)
        5.  [6.4.5 Property: description](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_description)
        6.  [6.4.6 Property: title](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_title)
        7.  [6.4.7 Property: release date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date)
        8.  [6.4.8 Property: update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date)
        9.  [6.4.9 Property: language](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_language)
        10.  [6.4.10 Property: publisher](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_publisher)
        11.  [6.4.11 Property: identifier](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_identifier)
        12.  [6.4.12 Property: theme/category](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme)
        13.  [6.4.13 Property: type/genre](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_type)
        14.  [6.4.14 Property: resource relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_relation)
        15.  [6.4.15 Property: qualified relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation)
        16.  [6.4.16 Property: keyword/tag](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_keyword)
        17.  [6.4.17 Property: landing page](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_landing_page)
        18.  [6.4.18 Property: qualified attribution](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_attribution)
        19.  [6.4.19 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license)
        20.  [6.4.20 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights)
        21.  [6.4.21 Property: has policy](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_has_policy)
        22.  [6.4.22 Property: is referenced by](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_is_referenced_by)
    5.  [6.5 Class: Catalog Record](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record)
        1.  [6.5.1 Property: title](https://www.w3.org/TR/vocab-dcat-2/#Property:record_title)
        2.  [6.5.2 Property: description](https://www.w3.org/TR/vocab-dcat-2/#Property:record_description)
        3.  [6.5.3 Property: listing date](https://www.w3.org/TR/vocab-dcat-2/#Property:record_listing_date)
        4.  [6.5.4 Property: update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:record_update_date)
        5.  [6.5.5 Property: primary topic](https://www.w3.org/TR/vocab-dcat-2/#Property:record_primary_topic)
        6.  [6.5.6 Property: conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:record_conforms_to)
    6.  [6.6 Class: Dataset](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset)
        1.  [6.6.1 Property: dataset distribution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_distribution)
        2.  [6.6.2 Property: frequency](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_frequency)
        3.  [6.6.3 Property: spatial/geographical coverage](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial)
        4.  [6.6.4 Property: spatial resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial_resolution)
        5.  [6.6.5 Property: temporal coverage](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal)
        6.  [6.6.6 Property: temporal resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution)
        7.  [6.6.7 Property: was generated by](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_was_generated_by)
    7.  [6.7 Class: Distribution](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution)
        1.  [6.7.1 Property: title](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_title)
        2.  [6.7.2 Property: description](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_description)
        3.  [6.7.3 Property: release date](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_release_date)
        4.  [6.7.4 Property: update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_update_date)
        5.  [6.7.5 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_license)
        6.  [6.7.6 Property: access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_rights)
        7.  [6.7.7 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_rights)
        8.  [6.7.8 Property: has policy](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_has_policy)
        9.  [6.7.9 Property: access URL](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_url)
        10.  [6.7.10 Property: access service](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_service)
        11.  [6.7.11 Property: download URL](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url)
        12.  [6.7.12 Property: byte size](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_size)
        13.  [6.7.13 Property: spatial resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_spatial_resolution)
        14.  [6.7.14 Property: temporal resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_temporal_resolution)
        15.  [6.7.15 Property: conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_conforms_to)
        16.  [6.7.16 Property: media type](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_media_type)
        17.  [6.7.17 Property: format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_format)
        18.  [6.7.18 Property: compression format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_compression_format)
        19.  [6.7.19 Property: packaging format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_packaging_format)
    8.  [6.8 Class: Data Service](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service)
        1.  [6.8.1 Property: endpoint URL](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_endpoint_url)
        2.  [6.8.2 Property: endpoint description](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_endpoint_description)
        3.  [6.8.3 Property: serves dataset](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_serves_dataset)
    9.  [6.9 Class: Concept Scheme](https://www.w3.org/TR/vocab-dcat-2/#Class:Concept_Scheme)
    10.  [6.10 Class: Concept](https://www.w3.org/TR/vocab-dcat-2/#Class:Concept)
    11.  [6.11 Class: Organization/Person](https://www.w3.org/TR/vocab-dcat-2/#Class:Organization_Person)
    12.  [6.12 Class: Relationship](https://www.w3.org/TR/vocab-dcat-2/#Class:Relationship)
        1.  [6.12.1 Property: relation](https://www.w3.org/TR/vocab-dcat-2/#Property:relationship_relation)
        2.  [6.12.2 Property: had role](https://www.w3.org/TR/vocab-dcat-2/#Property:relationship_hadRole)
    13.  [6.13 Class: Role](https://www.w3.org/TR/vocab-dcat-2/#Class:Role)
    14.  [6.14 Class: Period of Time](https://www.w3.org/TR/vocab-dcat-2/#Class:Period_of_Time)
        1.  [6.14.1 Property: start date](https://www.w3.org/TR/vocab-dcat-2/#Property:period_start_date)
        2.  [6.14.2 Property: end date](https://www.w3.org/TR/vocab-dcat-2/#Property:period_end_date)
        3.  [6.14.3 Property: beginning](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_beginning)
        4.  [6.14.4 Property: end](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_end)
    15.  [6.15 Class: Location](https://www.w3.org/TR/vocab-dcat-2/#Class:Location)
        1.  [6.15.1 Property: geometry](https://www.w3.org/TR/vocab-dcat-2/#Property:location_geometry)
        2.  [6.15.2 Property: bounding box](https://www.w3.org/TR/vocab-dcat-2/#Property:location_bbox)
        3.  [6.15.3 Property: centroid](https://www.w3.org/TR/vocab-dcat-2/#Property:location_centroid)
7.  [7\. Dereferenceable identifiers](https://www.w3.org/TR/vocab-dcat-2/#dereferenceable-identifiers)
    1.  [7.1 Indicating common identifier types](https://www.w3.org/TR/vocab-dcat-2/#identifiers-type)
8.  [8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights)
9.  [9\. Time and space](https://www.w3.org/TR/vocab-dcat-2/#time-and-space)
    1.  [9.1 Temporal properties](https://www.w3.org/TR/vocab-dcat-2/#temporal-properties)
    2.  [9.2 Spatial properties](https://www.w3.org/TR/vocab-dcat-2/#spatial-properties)
10.  [10\. Versioning](https://www.w3.org/TR/vocab-dcat-2/#dataset-versions)
11.  [11\. Data citation](https://www.w3.org/TR/vocab-dcat-2/#data-citation)
12.  [12\. Quality information](https://www.w3.org/TR/vocab-dcat-2/#quality-information)
    1.  [12.1 Providing quality information](https://www.w3.org/TR/vocab-dcat-2/#quality-example1)
    2.  [12.2 Documenting conformance to standards](https://www.w3.org/TR/vocab-dcat-2/#quality-conformance)
        1.  [12.2.1 Conformance to a standard](https://www.w3.org/TR/vocab-dcat-2/#quality-conformance-statement)
        2.  [12.2.2 Degree of conformance](https://www.w3.org/TR/vocab-dcat-2/#quality-conformance-degree)
        3.  [12.2.3 Conformance test results](https://www.w3.org/TR/vocab-dcat-2/#quality-conformance-test-results)
13.  [13\. Qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms)
    1.  [13.1 Relationships between datasets and agents](https://www.w3.org/TR/vocab-dcat-2/#qualified-attribution)
    2.  [13.2 Relationships between datasets and other resources](https://www.w3.org/TR/vocab-dcat-2/#qualified-relationship)
14.  [14\. DCAT Profiles](https://www.w3.org/TR/vocab-dcat-2/#profiles)
15.  [15\. Security and Privacy](https://www.w3.org/TR/vocab-dcat-2/#security_and_privacy)
16.  [A. Acknowledgments](https://www.w3.org/TR/vocab-dcat-2/#acknowledgments)
17.  [B. Alignment with Schema.org](https://www.w3.org/TR/vocab-dcat-2/#dcat-sdo)
18.  [C. Examples](https://www.w3.org/TR/vocab-dcat-2/#collection-of-examples)
    1.  [C.1 Loosely structured catalog](https://www.w3.org/TR/vocab-dcat-2/#examples-bag-of-files)
    2.  [C.2 Dataset provenance](https://www.w3.org/TR/vocab-dcat-2/#examples-dataset-provenance)
    3.  [C.3 Link datasets and publications](https://www.w3.org/TR/vocab-dcat-2/#examples-dataset-publication)
    4.  [C.4 Data services](https://www.w3.org/TR/vocab-dcat-2/#examples-data-service)
    5.  [C.5 Compressed and packaged distributions](https://www.w3.org/TR/vocab-dcat-2/#examples-compressed-and-packaged-distributions)
19.  [D. Change history](https://www.w3.org/TR/vocab-dcat-2/#changes)
    1.  [D.1 Changes since the W3C Recommendation of 16 January 2014](https://www.w3.org/TR/vocab-dcat-2/#changes-since-20140116)
20.  [E. References](https://www.w3.org/TR/vocab-dcat-2/#references)
    1.  [E.1 Normative references](https://www.w3.org/TR/vocab-dcat-2/#normative-references)
    2.  [E.2 Informative references](https://www.w3.org/TR/vocab-dcat-2/#informative-references)

## 1\. Introduction[](https://www.w3.org/TR/vocab-dcat-2/#introduction)

_This section is non-normative._

Sharing data resources among different organizations, researchers, governments and citizens requires the provision of metadata. This is irrespective of the data being open or not. DCAT is a vocabulary for publishing data catalogs on the Web, which was originally developed in the context of government data catalogs such as [data.gov](https://www.data.gov/) and [data.gov.uk](https://data.gov.uk/), but it is also applicable and has been used in other contexts.

This revision of DCAT has extended the previous version to support further use cases and requirements \[[DCAT-UCR](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ucr "Dataset Exchange Use Cases and Requirements")\]. These include the possibility of cataloging other resources in addition to datasets, such as data services. The revision also supports describing relationships between datasets as well as between datasets and other cataloged resources. Guidance on how to document licenses and rights statements associated with the cataloged items is provided.

DCAT provides RDF classes and properties to allow datasets and data services to be described and included in a catalog. The use of a standard model and vocabulary facilitates the consumption and aggregation of metadata from multiple catalogs, which can:

1.  increase the discoverability of datasets and data services
2.  allow federated search for datasets across catalogs in multiple sites

Data described in a catalog can come in many formats, ranging from spreadsheets, through XML and RDF to various specialized formats. DCAT does not make any assumptions about these serialization formats of the datasets but it does distinguish between the abstract dataset and its different manifestations or distributions.

Data is often provided through a service which supports selection of an extract, sub-set, or combination of existing data, or of new data generated by some data processing function. DCAT allows the description of a data access service to be included in a catalog.

Complementary vocabularies can be used together with DCAT to provide more detailed format-specific information. For example, properties from the VoID vocabulary \[[VOID](https://www.w3.org/TR/vocab-dcat-2/#bib-void "Describing Linked Datasets with the VoID Vocabulary")\] can be used within DCAT to express various statistics about a dataset if that dataset is in RDF format.

This document does not prescribe any particular method of deploying data catalogs expressed in DCAT. DCAT information can be presented in many forms including RDF accessible via SPARQL endpoints, embedded in HTML pages as \[[HTML-RDFa](https://www.w3.org/TR/vocab-dcat-2/#bib-html-rdfa "HTML+RDFa 1.1 - Second Edition")\], or serialized as RDF/XML \[[RDF-SYNTAX-GRAMMAR](https://www.w3.org/TR/vocab-dcat-2/#bib-rdf-syntax-grammar "RDF 1.1 XML Syntax")\], \[[N3](https://www.w3.org/TR/vocab-dcat-2/#bib-n3 "Notation3 (N3): A readable RDF syntax")\], \[[Turtle](https://www.w3.org/TR/vocab-dcat-2/#bib-turtle "RDF 1.1 Turtle")\], \[[JSON-LD](https://www.w3.org/TR/vocab-dcat-2/#bib-json-ld "JSON-LD 1.0")\] or other formats. Within this document the examples use \[[Turtle](https://www.w3.org/TR/vocab-dcat-2/#bib-turtle "RDF 1.1 Turtle")\] because of its readability.

## 2\. Motivation for change[](https://www.w3.org/TR/vocab-dcat-2/#motivation)

_This section is non-normative._

The original Recommendation \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] published in January 2014 provided the basic framework for describing datasets. It made an important distinction between a _dataset_ as an abstract idea and a _distribution_ as a manifestation of the dataset. Although DCAT has been widely adopted, it has become clear that the original specification lacked a number of essential features that were added either through the mechanism of a profile, such as the European Commission's DCAT-AP \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\], or the development of larger vocabularies that to a greater or lesser extent built upon the base standard, such as the Healthcare and Life Sciences Community Profile \[[HCLS-Dataset](https://www.w3.org/TR/vocab-dcat-2/#bib-hcls-dataset "Dataset Descriptions: HCLS Community Profile")\], the Data Tag Suite \[[DATS](https://www.w3.org/TR/vocab-dcat-2/#bib-dats "Data Tag Suite")\] and more. This revision of DCAT has been developed to address the specific shortcomings that have come to light through the experiences of different communities, the aim being to improve interoperability between the outputs of these larger vocabularies. For example, in this new DCAT version we provide classes, properties and guidance to address [identifiers](https://www.w3.org/TR/vocab-dcat-2/#dereferenceable-identifiers), [dataset quality information](https://www.w3.org/TR/vocab-dcat-2/#quality-information), and [data citation](https://www.w3.org/TR/vocab-dcat-2/#data-citation) issues.

This revision includes re-writing of the specification throughout. Significant changes from the 2014 Recommendation are marked within the text using "Note" sections, as well as being described in [§ D. Change history](https://www.w3.org/TR/vocab-dcat-2/#changes).

## 3\. Namespaces[](https://www.w3.org/TR/vocab-dcat-2/#namespaces)

The namespace for DCAT is `http://www.w3.org/ns/dcat#`. DCAT also makes extensive use of terms from other vocabularies, in particular Dublin Core \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\]. DCAT defines a minimal set of classes and properties of its own.

### 3.1 Normative namespaces[](https://www.w3.org/TR/vocab-dcat-2/#normative-namespaces)

Namespaces and prefixes used in normative parts of this recommendation are shown in the following table.

| Prefix   | Namespace                                     |
| -------- | --------------------------------------------- |
| `dc`     | `http://purl.org/dc/elements/1.1/`            |
| `dcat`   | `http://www.w3.org/ns/dcat#`                  |
| `dct`    | `http://purl.org/dc/terms/`                   |
| `dctype` | `http://purl.org/dc/dcmitype/`                |
| `foaf`   | `http://xmlns.com/foaf/0.1/`                  |
| `locn`   | `http://www.w3.org/ns/locn#`                  |
| `odrl`   | `http://www.w3.org/ns/odrl/2/`                |
| `owl`    | `http://www.w3.org/2002/07/owl#`              |
| `prov`   | `http://www.w3.org/ns/prov#`                  |
| `rdf`    | `http://www.w3.org/1999/02/22-rdf-syntax-ns#` |
| `rdfs`   | `http://www.w3.org/2000/01/rdf-schema#`       |
| `skos`   | `http://www.w3.org/2004/02/skos/core#`        |
| `time`   | `http://www.w3.org/2006/time#`                |
| `vcard`  | `http://www.w3.org/2006/vcard/ns#`            |
| `xsd`    | `http://www.w3.org/2001/XMLSchema#`           |

### 3.2 Non-normative namespaces[](https://www.w3.org/TR/vocab-dcat-2/#non-normative-namespaces)

_This section is non-normative._

Namespaces and prefixes used in examples and guidelines in the document and not from normative parts of the recommendation are shown in the following table.

| Prefix | Namespace |
| --- | --- |
| `adms` | `https://www.w3.org/ns/adms#` |
| `dqv` | `http://www.w3.org/ns/dqv#` |
| `earl` | `http://www.w3.org/ns/earl#` |
| `geosparql` | `http://www.opengis.net/ont/geosparql#` |
| `oa` | `http://www.w3.org/ns/oa#` |
| `sdmx-attribute` | `http://purl.org/linked-data/sdmx/2009/attribute#` |
| `sdo` | `https://schema.org/` |
| `w3cgeo` | `http://www.w3.org/2003/01/geo/wgs84_pos#` |

## 4\. Conformance[](https://www.w3.org/TR/vocab-dcat-2/#conformance)

As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

The key words _MAY_, _MUST_, _MUST NOT_, and _SHOULD_ in this document are to be interpreted as described in [BCP 14](https://tools.ietf.org/html/bcp14) \[[RFC2119](https://www.w3.org/TR/vocab-dcat-2/#bib-rfc2119 "Key words for use in RFCs to Indicate Requirement Levels")\] \[[RFC8174](https://www.w3.org/TR/vocab-dcat-2/#bib-rfc8174 "Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words")\] when, and only when, they appear in all capitals, as shown here.

A data catalog conforms to DCAT if:

-   Access to data is organized into datasets, distributions, and data-services.
-   An RDF description of the catalog itself, the corresponding cataloged resources, and distributions is available (but the choice of RDF syntax, access protocol, and access policy are not mandated by this specification).
-   The contents of all metadata fields that are held in the catalog and that contain data about the catalog itself, the corresponding cataloged resources, and distributions are included in this RDF description and are expressed using the appropriate classes and properties from DCAT, except where no such class or property exists.
-   All classes and properties defined in DCAT are used in a way consistent with the semantics declared in this specification.

DCAT-compliant catalogs _MAY_ include additional non-DCAT metadata fields and additional RDF data in the catalog's RDF description.

A **DCAT profile** is a specification for a data catalog that adds additional constraints to DCAT. A data catalog that conforms to the profile also conforms to DCAT. Additional constraints in a profile _MAY_ include:

-   Cardinality constraints, including a minimum set of required metadata fields
-   Sub-classes and sub-properties of the standard DCAT classes and properties
-   Classes and properties for additional metadata fields not covered in DCAT vocabulary specification
-   Controlled vocabularies or URI sets as acceptable values for properties
-   Requirements for specific access mechanisms (RDF syntaxes, protocols) to the catalog's RDF description

## 5\. Vocabulary overview[](https://www.w3.org/TR/vocab-dcat-2/#vocabulary-overview)

_This section is non-normative._

### 5.1 DCAT scope[](https://www.w3.org/TR/vocab-dcat-2/#dcat-scope)

DCAT is an RDF vocabulary for representing data catalogs. DCAT is based around six main classes ([Figure 1](https://www.w3.org/TR/vocab-dcat-2/#UML_DCAT_All_Attr "Overview of DCAT model, showing the classes of resources that can be members of a Catalog, and the relationships between them.")):

-   [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) represents a catalog, which is a dataset in which each individual item is a metadata record describing some resource; the scope of `dcat:Catalog` is collections of metadata about **datasets** or **data services**.
-   [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) represents a dataset, a data service or any other resource that may be described by a metadata record in a catalog. This class is not intended to be used directly, but is the parent class of [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset), [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) and [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog). Member items in a catalog should be members of one of the sub-classes, or of a sub-class of these, or of a sub-class of [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) defined in a DCAT profile or other DCAT application. [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) is effectively an extension point for defining a catalog of any kind of resource. [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) and [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) can be used for datasets and services which are not documented in any catalog.
-   [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) represents a dataset. A dataset is a collection of data, published or curated by a single agent. Data comes in many forms including numbers, words, pixels, imagery, sound and other multi-media, and potentially other types, any of which might be collected into a dataset.
-   [`dcat:Distribution`](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution) represents an accessible form of a dataset such as a downloadable file.
-   [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) represents a data service. A data service is a collection of operations accessible through an interface (API) that provide access to one or more datasets or data processing functions.
-   [`dcat:CatalogRecord`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record) represents a metadata item in the catalog, primarily concerning the registration information, such as who added the item and when.

![UML model of DCAT classes and properties](https://www.w3.org/TR/vocab-dcat-2/images/DCAT-summary-all-attributes.png)

Figure 1 Overview of DCAT model, showing the classes of resources that can be members of a Catalog, and the relationships between them.

A **dataset** in DCAT is defined as a "collection of data, published or curated by a single agent, and available for access or download in one or more serializations or formats". A dataset is a conceptual entity, and can be represented by one or more **distributions** that serialize the dataset for transfer. Distributions of a dataset can be provided via **data services**.

A data service typically provides selection, extraction, combination, processing or transformation operations over datasets that might be hosted locally or remote to the service. The result of any request to a data service is a representation of a part or all of a dataset or catalog. A data service might be tied to specific datasets, or its source data might be configured at request- or run-time. A data distribution service allows selection and download of a distribution of a dataset or subset. A data discovery service allows a client to find a suitable dataset. Other kinds of data service include data transformation services, such as coordinate transformation services, re-sampling and interpolation services, and various data processing services, including simulation and modelling services. Note that a data service in DCAT is a collection of operations or **API** which provides access to data. An interactive user-interface is often available to provide convenient access to API operations, but its description is outside the scope of DCAT. The details of a particular data service endpoint will often be specified through a description conforming to a standard service type, which complement the scope of the DCAT vocabulary itself.

Descriptions of datasets and data services can be included in a **catalog**. A catalog is a kind of dataset whose member items are descriptions of datasets and data services. Other types of things might also be cataloged, but the scope of DCAT is currently limited to datasets and data services. To extend the scope of a catalog beyond datasets and data services it is recommended to define additional sub-classes of [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) in a DCAT profile or other DCAT application. To extend the scope of service descriptions beyond data distribution services it is recommended to define additional sub-classes of [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) in a DCAT profile or other DCAT application.

A **catalog record** describes an entry in the catalog. Notice that while [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) represents the dataset or service itself, [`dcat:CatalogRecord`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record) is the record that describes the registration of an item in the catalog. The use of [`dcat:CatalogRecord`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record) is considered optional. It is used to capture provenance information about entries in a catalog explicitly. If this is not necessary then [`dcat:CatalogRecord`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record) can be safely ignored.

### 5.2 RDF considerations[](https://www.w3.org/TR/vocab-dcat-2/#dcat-rdf)

The DCAT vocabulary is an OWL2 ontology \[[OWL2-OVERVIEW](https://www.w3.org/TR/vocab-dcat-2/#bib-owl2-overview "OWL 2 Web Ontology Language Document Overview (Second Edition)")\] formalized using \[[RDF-SCHEMA](https://www.w3.org/TR/vocab-dcat-2/#bib-rdf-schema "RDF Schema 1.1")\]. Each class and property in DCAT is denoted by an \[[IRI](https://www.w3.org/TR/vocab-dcat-2/#bib-iri "Internationalized Resource Identifiers (IRIs)")\]. Locally defined elements are in the namespace [`http://www.w3.org/ns/dcat#`](https://www.w3.org/ns/dcat#). Elements are also adopted from several external vocabularies, in particular \[[FOAF](https://www.w3.org/TR/vocab-dcat-2/#bib-foaf "FOAF Vocabulary Specification 0.99 (Paddington Edition)")\], \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] and \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\]

RDF allows resources to have global identifiers (IRIs) or to be blank nodes. Blank nodes can be used to denote resources without explicitly naming them with an IRI. They can appear in the subject and object position of a triple \[[RDF11-PRIMER](https://www.w3.org/TR/vocab-dcat-2/#bib-rdf11-primer "RDF 1.1 Primer")\]. For example, in many actual DCAT catalogs, distributions are represented as blank nodes nested inside the related dataset description. While blank nodes can offer flexibility for some use cases, in a Linked Data context, blank nodes limit our ability to collaboratively annotate data. A blank node resource cannot be the target of a link and it can't be annotated with new information from new sources. As one of the biggest benefits of the Linked Data approach is that "anyone can say anything anywhere", use of blank nodes undermines some of the advantages we can gain from wide adoption of the RDF model. Even within the closed world of a single application dataset, use of blank nodes can quickly become limiting when integrating new data \[[LinkedDataPatterns](https://www.w3.org/TR/vocab-dcat-2/#bib-linkeddatapatterns "Linked Data Patterns: A pattern catalogue for modelling, publishing, and consuming Linked Data")\]. For these reasons, it is recommended that instances of the DCAT main classes have a global identifier, and use of blank nodes is generally discouraged when encoding DCAT in RDF.

All RDF examples in this document are written in Turtle syntax \[[Turtle](https://www.w3.org/TR/vocab-dcat-2/#bib-turtle "RDF 1.1 Turtle")\] and many are available from the [DXWG code repository](https://github.com/w3c/dxwg/tree/gh-pages/dcat/examples).

### 5.3 Basic example[](https://www.w3.org/TR/vocab-dcat-2/#basic-example)

This example provides a quick overview of how DCAT might be used to represent a government catalog and its datasets.

First, the catalog description:

The publisher of the catalog has the relative URI `:transparency-office`. Further description of the publisher can be provided as in [Example 2](https://www.w3.org/TR/vocab-dcat-2/#ex-publisher):

The catalog lists each of its datasets via the `dcat:dataset` property. In [Example 1](https://www.w3.org/TR/vocab-dcat-2/#ex-catalog), an example dataset was mentioned with the relative URI `:dataset-001`. A possible description of it using DCAT is shown below:

Five distinct temporal descriptors are shown for this dataset. The dataset publication and revision dates are shown in [`dct:issued`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date) and [`dct:modified`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date). For the frequency of update of the dataset in [`dct:accrualPeriodicity`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_frequency), we use an instance from the [content-oriented guidelines](https://www.w3.org/TR/vocab-data-cube/#dsd-cog) developed as part of the W3C Data Cube Vocabulary \[[VOCAB-DATA-CUBE](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-data-cube "The RDF Data Cube Vocabulary")\] efforts. The temporal coverage or extent is given in [`dct:temporal`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal) using an item from the Interval dataset (originally available from `http://reference.data.gov.uk/id/interval`) from data.gov.uk. The temporal resolution, which describes the minimum spacing of items within the dataset, is given in [`dcat:temporalResolution`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution) using the standard datatype `xsd:duration`.

Additionally, the spatial coverage or extent is given [`dct:spatial`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial) using a URI from [Geonames](http://www.geonames.org/). The spatial resolution, which describes the minimum spatial separation of items within the dataset, is given in [`dcat:spatialResolutionInMeters`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial_resolution) using the standard datatype `xsd:decimal`.

A contact point is provided where comments and feedback about the dataset can be sent. Further details about the contact point, such as email address or telephone number, can be provided using vCard \[[VCARD-RDF](https://www.w3.org/TR/vocab-dcat-2/#bib-vcard-rdf "vCard Ontology - for describing People and Organizations")\].

One representation of the dataset `:dataset-001-csv` can be downloaded as a 5kB CSV file. This is represented as an RDF resource of type `dcat:Distribution`.

### 5.4 Classifying datasets thematically[](https://www.w3.org/TR/vocab-dcat-2/#classifying-datasets)

The catalog classifies its datasets according to a set of domains represented by the relative URI `:themes`. SKOS \[[SKOS-REFERENCE](https://www.w3.org/TR/vocab-dcat-2/#bib-skos-reference "SKOS Simple Knowledge Organization System Reference")\] can be used to describe the domains used:

Notice that this dataset is classified under the domain represented by the relative URI `:accountability`. It is recommended to define the concept as part of the concepts scheme identified by the URI `:themes` that was used to describe the catalog domains. An example SKOS description:

### 5.5 Classifying dataset types[](https://www.w3.org/TR/vocab-dcat-2/#classifying-dataset-types)

The type or genre of a dataset can be indicated using the [`dct:type`](http://purl.org/dc/terms/type) property. It is recommended that the value of the property is taken from a well governed and broadly recognised set of resource types, such as the [DCMI Type Vocabulary](http://dublincore.org/documents/dcmi-terms/#section-7) \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\], the [MARC Genre/Terms Scheme](https://id.loc.gov/vocabulary/marcgt.html), the \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\] [`MD_Scope codes`](https://standards.iso.org/iso/19115/resources/Codelists/gml/MD_ScopeCode.xml), the [DataCite resource types](https://schema.datacite.org/meta/kernel-4.1/include/datacite-resourceType-v4.1.xsd), or the PARSE.Insight content-types from Re3data \[[RE3DATA-SCHEMA](https://www.w3.org/TR/vocab-dcat-2/#bib-re3data-schema "Metadata Schema for the Description of Research Data Repositories: version 3")\].

In the following examples, a (notional) dataset is classified separately using values from different vocabularies.

It is also possible for multiple classifications to be present in a single description.

### 5.6 Describing catalog records metadata[](https://www.w3.org/TR/vocab-dcat-2/#describing-catalog-records-metadata)

If the catalog publisher decides to keep metadata describing its records (i.e. the records containing metadata describing the datasets), `dcat:CatalogRecord` can be used. For example, while `:dataset-001` was issued on 2011-12-05, its description on Imaginary Catalog was added on 2011-12-11. This can be represented by DCAT as in [Example 9](https://www.w3.org/TR/vocab-dcat-2/#ex-catalog-record):

### 5.7 Dataset available only behind some Web page[](https://www.w3.org/TR/vocab-dcat-2/#example-landing-page)

`:dataset-002` is available as a CSV file. However `:dataset-002` can only be obtained through some Web page where the user needs to follow some links, provide some information and check some boxes before accessing the data.

Notice the use of a `dcat:landingPage` and the definition of the `dcat:Distribution` instance.

### 5.8 A dataset available as a download and behind some Web page[](https://www.w3.org/TR/vocab-dcat-2/#a-dataset-available-as-download-and-behind-some-web-page)

On the other hand, `:dataset-003` can be obtained through some landing page but also can be downloaded from a known URL.

Notice that we used `dcat:downloadURL` with the downloadable distribution and that the other distribution accessible through the landing page does not have to be defined as a separate `dcat:Distribution` instance.

### 5.9 A dataset available through a service[](https://www.w3.org/TR/vocab-dcat-2/#a-dataset-available-from-a-service)

`:dataset-004` is distributed in different representations from different services. The `dcat:accessURL` for each `dcat:Distribution` corresponds with the `dcat:endpointURL` of the service. Each service is characterized by its general type using `dct:type` (here using values from the INSPIRE spatial data service type vocabulary), its specific API definition using `dct:conformsTo`, with the detailed description of the individual endpoint parameters and options linked using `dcat:endpointDescription`.

## 6\. Vocabulary specification[](https://www.w3.org/TR/vocab-dcat-2/#vocabulary-specification)

### 6.1 RDF representation[](https://www.w3.org/TR/vocab-dcat-2/#RDF-representation)

The (revised) DCAT vocabulary is [available in RDF](https://www.w3.org/ns/dcat#). The primary artefact [`dcat2.ttl`](https://www.w3.org/ns/dcat2.ttl) is a serialization of the core DCAT vocabulary. Alongside it are a set of other RDF files that provide additional information, including:

1.  non-normative alignments to other vocabularies, provided for guidance
2.  additional axioms, which can be useful in some contexts
3.  the files [dcat2014.ttl](https://www.w3.org/ns/dcat2014.ttl) and [dcat2014.rdf](https://www.w3.org/ns/dcat2014.rdf) that correspond to the 2014 version of DCAT \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\]

### 6.2 Elements from other vocabularies[](https://www.w3.org/TR/vocab-dcat-2/#external-vocab)

DCAT requires use of elements from a number of other vocabularies. Furthermore, DCAT may be augmented by additional elements from external vocabularies, following the usual RDFS \[[RDF-SCHEMA](https://www.w3.org/TR/vocab-dcat-2/#bib-rdf-schema "RDF Schema 1.1")\] and OWL2 \[[OWL2-OVERVIEW](https://www.w3.org/TR/vocab-dcat-2/#bib-owl2-overview "OWL 2 Web Ontology Language Document Overview (Second Edition)")\] rules and patterns.

#### 6.2.1 Complementary vocabularies[](https://www.w3.org/TR/vocab-dcat-2/#complements)

Elements from a number of complementary vocabularies _MAY_ be used together with DCAT to provide more detailed information. For example: properties from the VoID vocabulary \[[VOID](https://www.w3.org/TR/vocab-dcat-2/#bib-void "Describing Linked Datasets with the VoID Vocabulary")\] allow the description of various statistics about a DCAT-described dataset if that dataset is in RDF format; properties from the Provenance ontology \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] can be used to provide more information about the workflow that generated a dataset or service and related activities and agents; classes and properties from the Organization Ontology \[[VOCAB-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-org "The Organization Ontology")\] can be used to explain additional details of responsible agents.

#### 6.2.2 Element definitions[](https://www.w3.org/TR/vocab-dcat-2/#dependencies)

The definitions (including domain and range) of terms outside the DCAT namespace are provided here only for convenience and _MUST NOT_ be considered normative. The authoritative definitions of these terms are in the corresponding specifications, i.e. \[[DC11](https://www.w3.org/TR/vocab-dcat-2/#bib-dc11 "Dublin Core Metadata Element Set, Version 1.1")\], \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\], \[[FOAF](https://www.w3.org/TR/vocab-dcat-2/#bib-foaf "FOAF Vocabulary Specification 0.99 (Paddington Edition)")\], \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\], \[[RDF-SCHEMA](https://www.w3.org/TR/vocab-dcat-2/#bib-rdf-schema "RDF Schema 1.1")\], \[[SKOS-REFERENCE](https://www.w3.org/TR/vocab-dcat-2/#bib-skos-reference "SKOS Simple Knowledge Organization System Reference")\], \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] and \[[VCARD-RDF](https://www.w3.org/TR/vocab-dcat-2/#bib-vcard-rdf "vCard Ontology - for describing People and Organizations")\].

### 6.3 Class: Catalog[](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog)

The following properties are specific to this class: [catalog record](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog_record), [has part](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_has_part), [dataset](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_dataset), [service](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_service), [catalog](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog), [homepage](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_homepage), [themes](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_themes).

The following properties are inherited from the super-class [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset): [distribution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_distribution), [frequency](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_frequency), [spatial/geographic coverage](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial), [spatial resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial_resolution), [temporal coverage](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal), [temporal resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution), [was generated by](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_was_generated_by).

The following properties are inherited from the super-class [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource): [access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights), [conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_conforms_to), [contact point](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_contact_point), [creator](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator), [description](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_description), [has policy](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_has_policy), [identifier](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_identifier), [is referenced by](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_is_referenced_by), [keyword/tag](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_keyword), [landing page](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_landing_page), [license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license), [catalog language](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_language), [relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_relation), [rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights), [qualified relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation), [publisher](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_publisher), [release date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date), [theme/category](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme), [title](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_title), [type/genre](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_type), [update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date), [qualified attribution](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_attribution).

| RDF Class: | [dcat:Catalog](https://www.w3.org/ns/dcat#Catalog) |
| --- | --- |
| Definition: | A curated collection of metadata about resources (e.g., datasets and data services in the context of a data catalog) |
| Sub-class of: | [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) |
| Usage note: | A Web-based data catalog is typically represented as a single instance of this class. |
| See also: | [§ 6.5 Class: Catalog Record](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record), [§ 6.6 Class: Dataset](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) |

#### 6.3.1 Property: homepage[](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_homepage)

| RDF Property: | [foaf:homepage](http://xmlns.com/foaf/0.1/homepage) |
| --- | --- |
| Definition: | A homepage of the catalog (a public Web document usually available in HTML). |
| Range: | [`foaf:Document`](http://xmlns.com/foaf/0.1/Document) |
| Usage note: | [`foaf:homepage`](http://xmlns.com/foaf/0.1/homepage) is an inverse functional property (IFP) which means that it _MUST_ be unique and precisely identify the Web-page for the resource. This property indicates the canonical Web-page, which might be helpful in cases where there is more than one Web-page about the resource. |

#### 6.3.2 Property: themes[](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_themes)

| RDF Property: | [dcat:themeTaxonomy](https://www.w3.org/ns/dcat#themeTaxonomy) |
| --- | --- |
| Definition: | A knowledge organization system (KOS) used to classify catalog's datasets and services. |
| Domain: | [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) |
| Range: | [`rdfs:Resource`](https://www.w3.org/2000/01/rdf-schema#Resource) |
| Usage note: | It is recommended that the taxonomy is organized in a [`skos:ConceptScheme`](https://www.w3.org/2004/02/skos/core#ConceptScheme), [`skos:Collection`](https://www.w3.org/2004/02/skos/core#Collection), [`owl:Ontology`](https://www.w3.org/2002/07/owl#Ontology) or similar, which allows each member to be denoted by an IRI and published as Linked Data. |

#### 6.3.3 Property: has part[](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_has_part)

| RDF Property: | [dct:hasPart](http://purl.org/dc/terms/hasPart) |
| --- | --- |
| Definition: | An item that is listed in the catalog. |
| Domain: | [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) |
| Range: | [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) |
| Usage note: | This is the most general predicate for membership of a catalog. Use of a more specific sub-property is recommended when available. |
| See also: | Sub-properties of `dct:hasPart` in particular [`dcat:dataset`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_dataset), [`dcat:catalog`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog), [`dcat:service`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_service). |

#### 6.3.4 Property: dataset[](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_dataset)

| RDF Property: | [dcat:dataset](https://www.w3.org/ns/dcat#dataset) |
| --- | --- |
| Definition: | A collection of data that is listed in the catalog. |
| Sub-property of: | [`dct:hasPart`](http://purl.org/dc/terms/hasPart) |
| Domain: | [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) |
| Range: | [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) |

#### 6.3.5 Property: service[](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_service)

| RDF Property: | [dcat:service](https://www.w3.org/ns/dcat#service) |
| --- | --- |
| Definition: | A site or end-point that is listed in the catalog. |
| Sub-property of: | [`dct:hasPart`](http://purl.org/dc/terms/hasPart) |
| Domain: | [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) |
| Range: | [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) |

#### 6.3.6 Property: catalog[](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog)

| RDF Property: | [dcat:catalog](https://www.w3.org/ns/dcat#catalog) |
| --- | --- |
| Definition: | A catalog whose contents are of interest in the context of this catalog. |
| Sub-property of: | [`dct:hasPart`](http://purl.org/dc/terms/hasPart) |
| Domain: | [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) |
| Range: | [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) |

#### 6.3.7 Property: catalog record[](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog_record)

| RDF Property: | [dcat:record](https://www.w3.org/ns/dcat#record) |
| --- | --- |
| Definition: | A record describing the registration of a single dataset or data service that is part of the catalog. |
| Domain: | [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) |
| Range: | [`dcat:CatalogRecord`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record) |

### 6.4 Class: Cataloged Resource[](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource)

The following properties are specific to this class: [access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights), [conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_conforms_to), [contact point](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_contact_point), [creator](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator), [description](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_description), [has policy](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_has_policy), [identifier](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_identifier), [is referenced by](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_is_referenced_by), [keyword/tag](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_keyword), [landing page](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_landing_page), [license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license), [resource language](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_language), [relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_relation), [rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights), [qualified relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation), [publisher](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_publisher), [release date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date), [theme/category](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme), [title](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_title), [type/genre](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_type), [update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date), [qualified attribution](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_attribution).

| RDF Class: | [dcat:Resource](https://www.w3.org/ns/dcat#Resource) |
| --- | --- |
| Definition: | Resource published or curated by a single agent. |
| Usage note: | The class of all cataloged resources, the super-class of [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset), [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service), [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) and any other member of a [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog). This class carries properties common to all cataloged resources, including datasets and data services. It is strongly recommended to use a more specific sub-class. When describing a resource which is not a dcat:Dataset or dcat:DataService, it is recommended to create a suitable sub-class of dcat:Resource, or use dcat:Resource with the dct:type property to indicate the specific type. |
| Usage note: | [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) is an extension point that enables the definition of any kind of catalog. Additional sub-classes may be defined in a DCAT profile or other DCAT application for catalogs of other kinds of resources. |
| See also: | [§ 6.5 Class: Catalog Record](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record) |

#### 6.4.1 Property: access rights[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights)

| RDF Property: | [dct:accessRights](http://purl.org/dc/terms/accessRights) |
| --- | --- |
| Definition: | Information about who can access the resource or an indication of its security status. |
| Range: | [`dct:RightsStatement`](http://purl.org/dc/terms/RightsStatement) |
| Usage note: | Information about licenses and rights _MAY_ be provided for the Resource. See also guidance at [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights). |
| See also: | [§ 6.4.20 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights) |

#### 6.4.2 Property: conforms to[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_conforms_to)

| RDF Property: | [dct:conformsTo](http://purl.org/dc/terms/conformsTo) |
| --- | --- |
| Definition: | An established standard to which the described resource conforms. |
| Range: | [`dct:Standard`](http://purl.org/dc/terms/Standard) ("A basis for comparison; a reference point against which other things can be evaluated." \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\]) |
| Usage note: | This property _SHOULD_ be used to indicate the model, schema, ontology, view or profile that the cataloged resource content conforms to. |

#### 6.4.3 Property: contact point[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_contact_point)

| RDF Property: | [dcat:contactPoint](https://www.w3.org/ns/dcat#contactPoint) |
| --- | --- |
| Definition: | Relevant contact information for the cataloged resource. Use of vCard is recommended \[[VCARD-RDF](https://www.w3.org/TR/vocab-dcat-2/#bib-vcard-rdf "vCard Ontology - for describing People and Organizations")\]. |
| Range: | [`vcard:Kind`](https://www.w3.org/TR/vcard-rdf/#Kind) |

#### 6.4.4 Property: resource creator[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator)

| RDF Property: | [dct:creator](http://purl.org/dc/terms/creator) |
| --- | --- |
| Definition: | The entity responsible for producing the resource. |
| Range: | [`foaf:Agent`](http://xmlns.com/foaf/0.1/Agent) |
| Usage note: | Resources of type [`foaf:Agent`](http://xmlns.com/foaf/0.1/Agent) are recommended as values for this property. |
| See also: | [§ 6.11 Class: Organization/Person](https://www.w3.org/TR/vocab-dcat-2/#Class:Organization_Person) |

#### 6.4.5 Property: description[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_description)

| RDF Property: | [dct:description](http://purl.org/dc/terms/description) |
| --- | --- |
| Definition: | A free-text account of the item. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) |

#### 6.4.6 Property: title[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_title)

| RDF Property: | [dct:title](http://purl.org/dc/terms/title) |
| --- | --- |
| Definition: | A name given to the item. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) |

#### 6.4.7 Property: release date[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date)

| RDF Property: | [dct:issued](http://purl.org/dc/terms/issued) |
| --- | --- |
| Definition: | Date of formal issuance (e.g., publication) of the item. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) encoded using the relevant ISO 8601 Date and Time compliant string \[[DATETIME](https://www.w3.org/TR/vocab-dcat-2/#bib-datetime "Date and Time Formats")\] and typed using the appropriate XML Schema datatype \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] ([`xsd:gYear`](https://www.w3.org/TR/xmlschema11-2/#gYear), [`xsd:gYearMonth`](https://www.w3.org/TR/xmlschema11-2/#gYearMonth), [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date), or [`xsd:dateTime`](https://www.w3.org/TR/xmlschema11-2/#dateTime)). |
| Usage note: | This property _SHOULD_ be set using the first known date of issuance. |
| See also: | [§ 6.5.3 Property: listing date](https://www.w3.org/TR/vocab-dcat-2/#Property:record_listing_date) and [§ 6.7.3 Property: release date](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_release_date) |

#### 6.4.8 Property: update/modification date[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date)

| RDF Property: | [dct:modified](http://purl.org/dc/terms/modified) |
| --- | --- |
| Definition: | Most recent date on which the item was changed, updated or modified. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) encoded using the relevant ISO 8601 Date and Time compliant string \[[DATETIME](https://www.w3.org/TR/vocab-dcat-2/#bib-datetime "Date and Time Formats")\] and typed using the appropriate XML Schema datatype \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] ([`xsd:gYear`](https://www.w3.org/TR/xmlschema11-2/#gYear), [`xsd:gYearMonth`](https://www.w3.org/TR/xmlschema11-2/#gYearMonth), [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date), or [`xsd:dateTime`](https://www.w3.org/TR/xmlschema11-2/#dateTime)). |
| Usage note: | The value of this property indicates a change to the actual item, not a change to the catalog record. An absent value _MAY_ indicate that the item has never changed after its initial publication, or that the date of last modification is not known, or that the item is continuously updated. |
| See also: | [§ 6.6.2 Property: frequency](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_frequency), [§ 6.5.4 Property: update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:record_update_date) and [§ 6.7.4 Property: update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_update_date) |

#### 6.4.9 Property: language[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_language)

| RDF Property: | [dct:language](http://purl.org/dc/terms/language) |
| --- | --- |
| Definition: | A language of the item. This refers to the natural language used for textual metadata (i.e. titles, descriptions, etc) of a cataloged resource (i.e. dataset or service) or the textual values of a dataset distribution |
| Range: | 
[`dct:LinguisticSystem`](http://purl.org/dc/terms/LinguisticSystem)

Resources defined by the Library of Congress ([ISO 639-1](http://id.loc.gov/vocabulary/iso639-1.html), [ISO 639-2](http://id.loc.gov/vocabulary/iso639-2.html)) _SHOULD_ be used.

If a ISO 639-1 (two-letter) code is defined for language, then its corresponding IRI _SHOULD_ be used; if no ISO 639-1 code is defined, then IRI corresponding to the ISO 639-2 (three-letter) code _SHOULD_ be used.

 |
| Usage note: | Repeat this property if the resource is available in multiple languages. |
| Usage note: | The value(s) provided for members of a catalog (i.e. dataset or service) override the value(s) provided for the catalog if they conflict. |
| Usage note: | If representations of a dataset are available for each language separately, define an instance of `dcat:Distribution` for each language and describe the specific language of each distribution using `dct:language` (i.e. the dataset will have multiple `dct:language` values and each distribution will have just one as the value of its `dct:language` property). |

#### 6.4.10 Property: publisher[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_publisher)

| RDF Property: | [dct:publisher](http://purl.org/dc/terms/publisher) |
| --- | --- |
| Definition: | The entity responsible for making the item available. |
| Usage note: | Resources of type [`foaf:Agent`](http://xmlns.com/foaf/0.1/Agent) are recommended as values for this property. |
| See also: | [§ 6.11 Class: Organization/Person](https://www.w3.org/TR/vocab-dcat-2/#Class:Organization_Person) |

#### 6.4.11 Property: identifier[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_identifier)

| RDF Property: | [dct:identifier](http://purl.org/dc/terms/identifier) |
| --- | --- |
| Definition: | A unique identifier of the item. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) |
| Usage note: | The identifier might be used as part of the URI of the item, but still having it represented explicitly is useful. |

#### 6.4.12 Property: theme/category[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme)

| RDF Property: | [dcat:theme](https://www.w3.org/ns/dcat#theme) |
| --- | --- |
| Definition: | A main category of the resource. A resource can have multiple themes. |
| Sub-property of: | [`dct:subject`](http://purl.org/dc/terms/subject) |
| Range: | [`skos:Concept`](https://www.w3.org/2004/02/skos/core#Concept) |
| Usage note: | The set of [`skos:Concept`](https://www.w3.org/2004/02/skos/core#Concept)s used to categorize the resources are organized in a [`skos:ConceptScheme`](https://www.w3.org/2004/02/skos/core#ConceptScheme) describing all the categories and their relations in the catalog. |
| See also: | [§ 6.3.2 Property: themes](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_themes) |

#### 6.4.13 Property: type/genre[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_type)

| RDF Property: | [dct:type](http://purl.org/dc/terms/type) |
| --- | --- |
| Definition: | The nature or genre of the resource. |
| Sub-property of: | [`dc:type`](http://purl.org/dc/elements/1.1/type) |
| Range: | [`rdfs:Class`](https://www.w3.org/2000/01/rdf-schema#Class) |
| Usage note: | The value _SHOULD_ be taken from a well governed and broadly recognised controlled vocabulary, such as:
1.  [DCMI Type vocabulary](http://dublincore.org/documents/dcmi-terms/#section-7) \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\]
2.  \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\] [scope codes](https://standards.iso.org/iso/19115/resources/Codelists/gml/MD_ScopeCode.xml)
3.  [Datacite resource types](https://schema.datacite.org/meta/kernel-4.1/include/datacite-resourceType-v4.1.xsd) \[[DataCite](https://www.w3.org/TR/vocab-dcat-2/#bib-datacite "DataCite Metadata Schema")\]
4.  PARSE.Insight content-types used by [re3data.org](https://www.re3data.org/) \[[RE3DATA-SCHEMA](https://www.w3.org/TR/vocab-dcat-2/#bib-re3data-schema "Metadata Schema for the Description of Research Data Repositories: version 3")\] (see item 15 contentType)
5.  [MARC intellectual resource types](http://id.loc.gov/vocabulary/marcgt.html)

Some members of these controlled vocabularies are not strictly suitable for datasets or data services (e.g. DCMI Type _Event_, _PhysicalObject_; \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\] _CollectionHardware_, _CollectionSession_, _Initiative_, _Sample_, _Repository_), but might be used in the context of other kinds of catalogs defined in DCAT profiles or applications. |
| Usage note: | To describe the file format, physical medium, or dimensions of the resource, use the [`dct:format`](http://purl.org/dc/terms/format) element. |

#### 6.4.14 Property: resource relation[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_relation)

| RDF Property: | [dct:relation](http://purl.org/dc/terms/relation) |
| --- | --- |
| Definition: | A resource with an unspecified relationship to the cataloged item. |
| Usage note: | [`dct:relation`](http://purl.org/dc/terms/relation) _SHOULD_ be used where the nature of the relationship between a cataloged item and related resources is not known. A more specific sub-property _SHOULD_ be used if the nature of the relationship of the link is known. The property [`dcat:distribution`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_distribution) _SHOULD_ be used to link from a [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) to a representation of the dataset, described as a [`dcat:Distribution`](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution) |
| See also: | Sub-properties of `dct:relation` in particular [`dcat:distribution`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_distribution), [`dct:hasPart`](http://purl.org/dc/terms/hasPart), (and its sub-properties [`dcat:catalog`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog), [`dcat:dataset`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_dataset), [`dcat:service`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_service) ), [`dct:isPartOf`](http://purl.org/dc/terms/isPartOf), [`dct:conformsTo`](http://purl.org/dc/terms/conformsTo), [`dct:isFormatOf`](http://purl.org/dc/terms/isFormatOf), [`dct:hasFormat`](http://purl.org/dc/terms/hasFormat), [`dct:isVersionOf`](http://purl.org/dc/terms/isVersionOf), [`dct:hasVersion`](http://purl.org/dc/terms/hasVersion), [`dct:replaces`](http://purl.org/dc/terms/replaces), [`dct:isReplacedBy`](http://purl.org/dc/terms/isReplacedBy), [`dct:references`](http://purl.org/dc/terms/references), [`dct:isReferencedBy`](http://purl.org/dc/terms/isReferencedBy), [`dct:requires`](http://purl.org/dc/terms/requires), [`dct:isRequiredBy`](http://purl.org/dc/terms/isRequiredBy) |

Many existing and legacy catalogs do not distinguish between dataset components, representations, documentation, schemata and other resources that are lumped together as part of a dataset. [`dct:relation`](http://purl.org/dc/terms/relation) is a super-property of a number of more specific properties which express more precise relationships, so use of `dct:relation` is not inconsistent with a subsequent reclassification with more specific semantics, though the more specialized sub-properties _SHOULD_ be used to link a dataset to component and supplementary resources if possible.

#### 6.4.15 Property: qualified relation[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation)

| RDF Property: | [dcat:qualifiedRelation](https://www.w3.org/ns/dcat#qualifiedRelation) |
| --- | --- |
| Definition: | Link to a description of a relationship with another resource |
| Sub-property of: | [`prov:qualifiedInfluence`](https://www.w3.org/TR/prov-o/#qualifiedInfluence) |
| Domain: | [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) |
| Range: | [`dcat:Relationship`](https://www.w3.org/TR/vocab-dcat-2/#Class:Relationship) |
| Usage note: | Used to link to another resource where the nature of the relationship is known but does not match one of the standard \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] properties ([`dct:hasPart`](http://purl.org/dc/terms/hasPart), [`dct:isPartOf`](http://purl.org/dc/terms/isPartOf), [`dct:conformsTo`](http://purl.org/dc/terms/conformsTo), [`dct:isFormatOf`](http://purl.org/dc/terms/isFormatOf), [`dct:hasFormat`](http://purl.org/dc/terms/hasFormat), [`dct:isVersionOf`](http://purl.org/dc/terms/isVersionOf), [`dct:hasVersion`](http://purl.org/dc/terms/hasVersion), [`dct:replaces`](http://purl.org/dc/terms/replaces), [`dct:isReplacedBy`](http://purl.org/dc/terms/isReplacedBy), [`dct:references`](http://purl.org/dc/terms/references), [`dct:isReferencedBy`](http://purl.org/dc/terms/isReferencedBy), [`dct:requires`](http://purl.org/dc/terms/requires), [`dct:isRequiredBy`](http://purl.org/dc/terms/isRequiredBy)) or \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] properties ([`prov:wasDerivedFrom`](https://www.w3.org/TR/prov-o/#wasDerivedFrom), [`prov:wasInfluencedBy`](https://www.w3.org/TR/prov-o/#wasInfluencedBy), [`prov:wasQuotedFrom`](https://www.w3.org/TR/prov-o/#wasQuotedFrom), [`prov:wasRevisionOf`](https://www.w3.org/TR/prov-o/#wasRevisionOf), [`prov:hadPrimarySource`](https://www.w3.org/TR/prov-o/#hadPrimarySource), [`prov:alternateOf`](https://www.w3.org/TR/prov-o/#alternateOf), [`prov:specializationOf`](https://www.w3.org/TR/prov-o/#specializationOf)). |

This DCAT property follows the common qualified relation pattern described in [§ 13\. Qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms) .

#### 6.4.16 Property: keyword/tag[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_keyword)

| RDF Property: | [dcat:keyword](https://www.w3.org/ns/dcat#keyword) |
| --- | --- |
| Definition: | A keyword or tag describing the resource. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) |

#### 6.4.17 Property: landing page[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_landing_page)

| RDF Property: | [dcat:landingPage](https://www.w3.org/ns/dcat#landingPage) |
| --- | --- |
| Definition: | A Web page that can be navigated to in a Web browser to gain access to the catalog, a dataset, its distributions and/or additional information. |
| Sub-property of: | [`foaf:page`](http://xmlns.com/foaf/0.1/page) |
| Range: | [`foaf:Document`](http://xmlns.com/foaf/0.1/Document) |
| Usage note: | If the distribution(s) are accessible only through a landing page (i.e. direct download URLs are not known), then the landing page link _SHOULD_ be duplicated as `dcat:accessURL` on a distribution. (see [§ 5.7 Dataset available only behind some Web page](https://www.w3.org/TR/vocab-dcat-2/#example-landing-page)) |

#### 6.4.18 Property: qualified attribution[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_attribution)

| RDF Property: | [prov:qualifiedAttribution](https://www.w3.org/TR/prov-o/#qualifiedAttribution) |
| --- | --- |
| Definition: | Link to an Agent having some form of responsibility for the resource |
| Sub-property of: | [`prov:qualifiedInfluence`](https://www.w3.org/TR/prov-o/#qualifiedInfluence) |
| Domain: | [`prov:Entity`](https://www.w3.org/TR/prov-o/#Entity) |
| Range: | [`prov:Attribution`](https://www.w3.org/TR/prov-o/#Attribution) |
| Usage note: | Used to link to an Agent where the nature of the relationship is known but does not match one of the standard \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] properties ([`dct:creator`](http://purl.org/dc/terms/creator), [`dct:publisher`](http://purl.org/dc/terms/creator)). Use `dcat:hadRole` on the [`prov:Attribution`](https://www.w3.org/TR/prov-o/#Attribution) to capture the responsibility of the Agent with respect to the Resource. See [§ 13.1 Relationships between datasets and agents](https://www.w3.org/TR/vocab-dcat-2/#qualified-attribution) for usage examples. |

This DCAT property follows the common qualified relation pattern described in [§ 13\. Qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms) .

#### 6.4.19 Property: license[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license)

| RDF Property: | [dct:license](http://purl.org/dc/terms/license) |
| --- | --- |
| Definition: | A legal document under which the resource is made available. |
| Range: | [`dct:LicenseDocument`](http://purl.org/dc/terms/LicenseDocument) |
| Usage note: | Information about licenses and rights _MAY_ be provided for the Resource. See also guidance at [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights). |
| See also: | [§ 6.4.20 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights), [§ 6.7.5 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_license) |

#### 6.4.20 Property: rights[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights)

| RDF Property: | [dct:rights](http://purl.org/dc/terms/rights) |
| --- | --- |
| Definition: | A statement that concerns all rights not addressed with [dct:license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license) or [dct:accessRights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights), such as copyright statements. |
| Range: | [`dct:RightsStatement`](http://purl.org/dc/terms/RightsStatement) |
| Usage note: | Information about licenses and rights _MAY_ be provided for the Resource. See also guidance at [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights). |
| See also: | [§ 6.4.19 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license), [§ 6.7.7 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_rights), [§ 6.4.1 Property: access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights) |

#### 6.4.21 Property: has policy[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_has_policy)

| RDF Property: | [odrl:hasPolicy](https://www.w3.org/TR/odrl-vocab/#term-hasPolicy) |
| --- | --- |
| Definition: | An ODRL conformant policy expressing the rights associated with the resource. |
| Range: | [`odrl:Policy`](https://www.w3.org/TR/odrl-vocab/#term-Policy) |
| Usage note: | Information about rights expressed as an ODRL policy \[[ODRL-MODEL](https://www.w3.org/TR/vocab-dcat-2/#bib-odrl-model "ODRL Information Model 2.2")\] using the ODRL vocabulary \[[ODRL-VOCAB](https://www.w3.org/TR/vocab-dcat-2/#bib-odrl-vocab "ODRL Vocabulary & Expression 2.2")\] _MAY_ be provided for the resource. See also guidance at [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights). |
| See also: | [§ 6.4.19 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license), [§ 6.4.1 Property: access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights), [§ 6.4.20 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights) |

#### 6.4.22 Property: is referenced by[](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_is_referenced_by)

| RDF Property: | [dct:isReferencedBy](http://purl.org/dc/terms/isReferencedBy) |
| --- | --- |
| Definition: | A related resource, such as a publication, that references, cites, or otherwise points to the cataloged resource. |
| Usage note: | In relation to the use case of data citation, when the cataloged resource is a dataset, the `dct:isReferencedBy` property allows to relate the dataset to the resources (such as scholarly publications) that cite or point to the dataset. Multiple `dct:isReferencedBy` properties can be used to indicate the dataset has been referenced by multiple publications, or other resources. |
| Usage note: | This property is used to associate a resource with the resource (of type `dcat:Resource`) in question. For other relations to resources not covered with this property, the more generic property [`dcat:qualifiedRelation`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation) can be used. See also [§ 13\. Qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms). |

For examples on the use of this property, see [§ C.3 Link datasets and publications](https://www.w3.org/TR/vocab-dcat-2/#examples-dataset-publication).

### 6.5 Class: Catalog Record[](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record)

The following properties are specific to this class (`dcat:CatalogRecord`): [conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:record_conforms_to), [description](https://www.w3.org/TR/vocab-dcat-2/#Property:record_description), [listing date](https://www.w3.org/TR/vocab-dcat-2/#Property:record_listing_date), [primary topic](https://www.w3.org/TR/vocab-dcat-2/#Property:record_primary_topic), [title](https://www.w3.org/TR/vocab-dcat-2/#Property:record_title), [update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:record_update_date).

| RDF Class: | [dcat:CatalogRecord](https://www.w3.org/ns/dcat#CatalogRecord) |
| --- | --- |
| Definition: | A record in a catalog, describing the registration of a single [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource). |
| Usage note | This class is optional and not all catalogs will use it. It exists for catalogs where a distinction is made between metadata about a _dataset or service_ and metadata about the _entry in the catalog about the dataset or service_. For example, the _publication date_ property of the _dataset_ reflects the date when the information was originally made available by the publishing agency, while the publication date of the _catalog record_ is the date when the dataset was added to the catalog. In cases where both dates differ, or where only the latter is known, the _publication date_ _SHOULD_ only be specified for the catalog record. Notice that the W3C PROV Ontology \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] allows describing further provenance information such as the details of the process and the agent involved in a particular change to a dataset or its registration. |
| See also | [§ 6.6 Class: Dataset](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) |

If a catalog is represented as an RDF Dataset with named graphs (as defined in \[[SPARQL11-QUERY](https://www.w3.org/TR/vocab-dcat-2/#bib-sparql11-query "SPARQL 1.1 Query Language")\]), then it is appropriate to place the description of each dataset (consisting of all RDF triples that mention the `dcat:Dataset`, `dcat:CatalogRecord`, and any of its `dcat:Distribution`s) into a separate named graph. The name of that graph _SHOULD_ be the IRI of the catalog record.

#### 6.5.1 Property: title[](https://www.w3.org/TR/vocab-dcat-2/#Property:record_title)

| RDF Property: | [dct:title](http://purl.org/dc/terms/title) |
| --- | --- |
| Definition: | A name given to the record. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) |

#### 6.5.2 Property: description[](https://www.w3.org/TR/vocab-dcat-2/#Property:record_description)

| RDF Property: | [dct:description](http://purl.org/dc/terms/description) |
| --- | --- |
| Definition: | A free-text account of the record. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) |

#### 6.5.3 Property: listing date[](https://www.w3.org/TR/vocab-dcat-2/#Property:record_listing_date)

| RDF Property: | [dct:issued](http://purl.org/dc/terms/issued) |
| --- | --- |
| Definition: | The date of listing (i.e. formal recording) of the corresponding dataset or service in the catalog. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) encoded using the relevant ISO 8601 Date and Time compliant string \[[DATETIME](https://www.w3.org/TR/vocab-dcat-2/#bib-datetime "Date and Time Formats")\] and typed using the appropriate XML Schema datatype \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] ([`xsd:gYear`](https://www.w3.org/TR/xmlschema11-2/#gYear), [`xsd:gYearMonth`](https://www.w3.org/TR/xmlschema11-2/#gYearMonth), [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date), or [`xsd:dateTime`](https://www.w3.org/TR/xmlschema11-2/#dateTime)). |
| Usage note: | This indicates the date of listing the dataset in the catalog and not the publication date of the dataset itself. |
| See also: | [§ 6.4.7 Property: release date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date) |

#### 6.5.4 Property: update/modification date[](https://www.w3.org/TR/vocab-dcat-2/#Property:record_update_date)

| RDF Property: | [dct:modified](http://purl.org/dc/terms/modified) |
| --- | --- |
| Definition: | Most recent date on which the catalog entry was changed, updated or modified. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) encoded using the relevant ISO 8601 Date and Time compliant string \[[DATETIME](https://www.w3.org/TR/vocab-dcat-2/#bib-datetime "Date and Time Formats")\] and typed using the appropriate XML Schema datatype \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] ([`xsd:gYear`](https://www.w3.org/TR/xmlschema11-2/#gYear), [`xsd:gYearMonth`](https://www.w3.org/TR/xmlschema11-2/#gYearMonth), [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date), or [`xsd:dateTime`](https://www.w3.org/TR/xmlschema11-2/#dateTime)). |
| Usage note: | This indicates the date of last change of a catalog entry, i.e. the catalog metadata description of the dataset, and not the date of the dataset itself. |
| See also: | [§ 6.4.8 Property: update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date) |

#### 6.5.5 Property: primary topic[](https://www.w3.org/TR/vocab-dcat-2/#Property:record_primary_topic)

| RDF Property: | [foaf:primaryTopic](http://xmlns.com/foaf/0.1/primaryTopic) |
| --- | --- |
| Definition: | The [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) (dataset or service) described in the record. |
| Usage note: | [`foaf:primaryTopic`](http://xmlns.com/foaf/0.1/primaryTopic) property is functional: each catalog record can have at most one primary topic i.e. describes one dataset or service. |

#### 6.5.6 Property: conforms to[](https://www.w3.org/TR/vocab-dcat-2/#Property:record_conforms_to)

| RDF Property: | [dct:conformsTo](http://purl.org/dc/terms/conformsTo) |
| --- | --- |
| Definition: | An established standard to which the described resource conforms. |
| Range: | [`dct:Standard`](http://purl.org/dc/terms/Standard) (A basis for comparison; a reference point against which other things can be evaluated.) |
| Usage note: | This property _SHOULD_ be used to indicate the model, schema, ontology, view or profile that the catalog record metadata conforms to. |

### 6.6 Class: Dataset[](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset)

The following properties are specific to this class: [distribution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_distribution), [frequency](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_frequency), [spatial/geographic coverage](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial), [spatial resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial_resolution), [temporal coverage](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal), [temporal resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution), [was generated by](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_was_generated_by).

The following properties are inherited from the super-class [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource): [access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights), [conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_conforms_to), [contact point](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_contact_point), [creator](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator), [description](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_description), [has policy](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_has_policy), [identifier](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_identifier), [is referenced by](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_is_referenced_by), [keyword/tag](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_keyword), [landing page](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_landing_page), [license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license), [resource language](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_language), [relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_relation), [rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights), [qualified relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation), [publisher](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_publisher), [release date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date), [theme/category](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme), [title](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_title), [type/genre](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_type), [update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date), [qualified attribution](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_attribution).

Information about licenses and rights _SHOULD_ be provided on the level of Distribution. Information about licenses and rights _MAY_ be provided for a Dataset in addition to but not instead of the information provided for the Distributions of that Dataset. Providing license or rights information for a Dataset that is different from information provided for a Distribution of that Dataset _SHOULD_ be avoided as this can create legal conflicts.

| RDF Class: | [dcat:Dataset](https://www.w3.org/ns/dcat#Dataset) |
| --- | --- |
| Definition: | A collection of data, published or curated by a single agent, and available for access or download in one or more representations. |
| Sub-class of: | [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) |
| Usage note: | This class describes the conceptual dataset. One or more representations might be available, with differing schematic layouts and formats or serializations. |
| Usage note: | This class describes the actual dataset as published by the dataset provider. In cases where a distinction between the actual dataset and its entry in the catalog is necessary (because metadata such as modification date might differ), the _[catalog record](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog_Record)_ class can be used for the latter. |

#### 6.6.1 Property: dataset distribution[](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_distribution)

| RDF Property: | [dcat:distribution](https://www.w3.org/ns/dcat#distribution) |
| --- | --- |
| Definition: | An available distribution of the dataset. |
| Sub-property of: | [`dct:relation`](http://purl.org/dc/terms/relation) |
| Domain: | [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) |
| Range: | [`dcat:Distribution`](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution) |

#### 6.6.2 Property: frequency[](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_frequency)

| RDF Property: | [dct:accrualPeriodicity](http://purl.org/dc/terms/accrualPeriodicity) |
| --- | --- |
| Definition: | The frequency at which dataset is published. |
| Range: | [`dct:Frequency`](http://purl.org/dc/terms/Frequency) (A rate at which something recurs) |
| Usage note: | The value of `dct:accrualPeriodicity` gives the rate at which the dataset-as-a-whole is updated. This may be complemented by [`dcat:temporalResolution`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution) to give the time between collected data points in a time series. |

Examples showing how `dct:accrualPeriodicity` and [`dcat:temporalResolution`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution) may be combined are given in [§ 9.1 Temporal properties](https://www.w3.org/TR/vocab-dcat-2/#temporal-properties).

#### 6.6.3 Property: spatial/geographical coverage[](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial)

| RDF Property: | [dct:spatial](http://purl.org/dc/terms/spatial) |
| --- | --- |
| Definition: | The geographical area covered by the dataset. |
| Range: | [`dct:Location`](http://purl.org/dc/terms/Location) (A spatial region or named place) |
| Usage note: | The spatial coverage of a dataset may be encoded as an instance of [`dct:Location`](http://purl.org/dc/terms/Location), or may be indicated using a URI reference (link) to a resource describing a location. It is recommended that links are to entries in a well maintained gazetteer such as [Geonames](http://www.geonames.org/). |

Options for expressing the details of a `dct:Location` are provided in [§ 6.15 Class: Location](https://www.w3.org/TR/vocab-dcat-2/#Class:Location).

#### 6.6.4 Property: spatial resolution[](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial_resolution)

| RDF Property: | [dcat:spatialResolutionInMeters](https://www.w3.org/ns/dcat#spatialResolutionInMeters) |
| --- | --- |
| Definition: | Minimum spatial separation resolvable in a dataset, measured in meters. |
| Range: | [`xsd:decimal`](https://www.w3.org/TR/xmlschema11-2/#decimal) |
| Usage note: | If the dataset is an image or grid this should correspond to the spacing of items. For other kinds of spatial datasets, this property will usually indicate the smallest distance between items in the dataset. |

The range of this property is a decimal number representing a length in meters. This is intended to provide a summary indication of the spatial resolution of the data as a single number. More complex descriptions of various aspects of spatial precision, accuracy, resolution and other statistics can be provided using the Data Quality Vocabulary \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\].

#### 6.6.5 Property: temporal coverage[](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal)

| RDF Property: | [dct:temporal](http://purl.org/dc/terms/temporal) |
| --- | --- |
| Definition: | The temporal period that the dataset covers. |
| Range: | [`dct:PeriodOfTime`](http://purl.org/dc/terms/PeriodOfTime) (An interval of time that is named or defined by its start and end dates) |
| Usage note: | The temporal coverage of a dataset may be encoded as an instance of [`dct:PeriodOfTime`](http://purl.org/dc/terms/PeriodOfTime), or may be indicated using a URI reference (link) to a resource describing a time period or interval. |

Options for expressing the details of a `dct:PeriodOfTime` are provided in [§ 6.14 Class: Period of Time](https://www.w3.org/TR/vocab-dcat-2/#Class:Period_of_Time).

#### 6.6.6 Property: temporal resolution[](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution)

| RDF Property: | [dcat:temporalResolution](https://www.w3.org/ns/dcat#temporalResolution) |
| --- | --- |
| Definition: | Minimum time period resolvable in the dataset. |
| Range: | [`xsd:duration`](https://www.w3.org/TR/xmlschema11-2/#duration) |
| Usage note: | If the dataset is a time-series this should correspond to the spacing of items in the series. For other kinds of dataset, this property will usually indicate the smallest time difference between items in the dataset. |

This is intended to provide a summary indication of the temporal resolution of the data distribution as a single value. More complex descriptions of various aspects of temporal precision, accuracy, resolution and other statistics can be provided using the Data Quality Vocabulary \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\].

The distinction between `dcat:temporalResolution` and [`dct:accrualPeriodicity`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_frequency) is illustrated by examples in [§ 9.1 Temporal properties](https://www.w3.org/TR/vocab-dcat-2/#temporal-properties).

#### 6.6.7 Property: was generated by[](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_was_generated_by)

| RDF Property: | [prov:wasGeneratedBy](https://www.w3.org/TR/prov-o/#wasGeneratedBy) |
| --- | --- |
| Definition: | An activity that generated, or provides the business context for, the creation of the dataset. |
| Domain: | [`prov:Entity`](https://www.w3.org/TR/prov-o/#Entity) |
| Range: | [`prov:Activity`](https://www.w3.org/TR/prov-o/#Activity) An activity is something that occurs over a period of time and acts upon or with entities; it may include consuming, processing, transforming, modifying, relocating, using, or generating entities. |
| Usage note: | The activity associated with generation of a dataset will typically be an initiative, project, mission, survey, on-going activity ("business as usual") etc. Multiple `prov:wasGeneratedBy` properties can be used to indicate the dataset production context at various levels of granularity. |
| Usage note: | Use [`prov:qualifiedGeneration`](https://www.w3.org/TR/prov-o/#qualifiedGeneration) to attach additional details about the relationship between the dataset and the activity, e.g. the exact time that the dataset was produced during the lifetime of a project |

Details about how to describe the activity that generated a dataset, such as a project, initiative, on-going activity, mission or survey, are out of scope for this document. [`prov:Activity`](https://www.w3.org/TR/prov-o/#Activity) provides for some basic properties such as begin and end time, associated agents etc. Further details may be provided through classes defined in applications. A number of ontologies for describing projects are available, for example VIVO for academic research projects \[[VIVO-ISF](https://www.w3.org/TR/vocab-dcat-2/#bib-vivo-isf "VIVO-ISF Data Standard")\], DOAP (Description of a Project) for software projects \[[DOAP](https://www.w3.org/TR/vocab-dcat-2/#bib-doap "Description of a Project")\], and DBPedia for general projects \[[DBPEDIA-ONT](https://www.w3.org/TR/vocab-dcat-2/#bib-dbpedia-ont "DBPedia ontology")\] which are expected to be suitable for different applications.

### 6.7 Class: Distribution[](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution)

The following properties are specific to this class: [access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_rights), [access URL](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_url), [access service](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_service), [byte size](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_size), [compression format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_compression_format), [conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_conforms_to), [description](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_description), [download URL](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url), [format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_format), [has policy](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_has_policy), [license](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_license), [media type](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_media_type), [packaging format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_packaging_format), [release date](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_release_date), [rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_rights), [spatial resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_spatial_resolution), [temporal resolution](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_temporal_resolution), [title](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_title), [update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_update_date).

| RDF class: | [dcat:Distribution](https://www.w3.org/ns/dcat#Distribution) |
| --- | --- |
| Definition: | A specific representation of a dataset. A dataset might be available in multiple serializations that may differ in various ways, including natural language, media-type or format, schematic organization, temporal and spatial resolution, level of detail or profiles (which might specify any or all of the above). |
| Usage note: | This represents a general availability of a dataset. It implies no information about the actual access method of the data, i.e. whether by direct download, API, or through a Web page. The use of [`dcat:downloadURL`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url) property indicates directly downloadable distributions. |
| See also: | [§ 6.8 Class: Data Service](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) |

Links between a `dcat:Distribution` and services or Web addresses where it can be accessed are expressed using [`dcat:accessURL`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_url), [`dcat:accessService`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_service), [`dcat:downloadURL`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url), as shown in [Figure 1](https://www.w3.org/TR/vocab-dcat-2/#UML_DCAT_All_Attr "Overview of DCAT model, showing the classes of resources that can be members of a Catalog, and the relationships between them.") and described in the definitions below.

#### 6.7.1 Property: title[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_title)

| RDF Property: | [dct:title](http://purl.org/dc/terms/title) |
| --- | --- |
| Definition: | A name given to the distribution. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) |

#### 6.7.2 Property: description[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_description)

| RDF Property: | [dct:description](http://purl.org/dc/terms/description) |
| --- | --- |
| Definition: | A free-text account of the distribution. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) |

#### 6.7.3 Property: release date[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_release_date)

| RDF Property: | [dct:issued](http://purl.org/dc/terms/issued) |
| --- | --- |
| Definition: | Date of formal issuance (e.g., publication) of the distribution. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) encoded using the relevant ISO 8601 Date and Time compliant string \[[DATETIME](https://www.w3.org/TR/vocab-dcat-2/#bib-datetime "Date and Time Formats")\] and typed using the appropriate XML Schema datatype \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] ([`xsd:gYear`](https://www.w3.org/TR/xmlschema11-2/#gYear), [`xsd:gYearMonth`](https://www.w3.org/TR/xmlschema11-2/#gYearMonth), [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date), or [`xsd:dateTime`](https://www.w3.org/TR/xmlschema11-2/#dateTime)). |
| Usage note: | This property _SHOULD_ be set using the first known date of issuance. |
| See also: | [§ 6.4.7 Property: release date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date) |

#### 6.7.4 Property: update/modification date[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_update_date)

| RDF Property: | [dct:modified](http://purl.org/dc/terms/modified) |
| --- | --- |
| Definition: | Most recent date on which the distribution was changed, updated or modified. |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) encoded using the relevant ISO 8601 Date and Time compliant string \[[DATETIME](https://www.w3.org/TR/vocab-dcat-2/#bib-datetime "Date and Time Formats")\] and typed using the appropriate XML Schema datatype \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] ([`xsd:gYear`](https://www.w3.org/TR/xmlschema11-2/#gYear), [`xsd:gYearMonth`](https://www.w3.org/TR/xmlschema11-2/#gYearMonth), [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date), or [`xsd:dateTime`](https://www.w3.org/TR/xmlschema11-2/#dateTime)). |
| See also: | [§ 6.4.8 Property: update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date) |

#### 6.7.5 Property: license[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_license)

| RDF Property: | [dct:license](http://purl.org/dc/terms/license) |
| --- | --- |
| Definition: | A legal document under which the distribution is made available. |
| Range: | [`dct:LicenseDocument`](http://purl.org/dc/terms/LicenseDocument) |
| Usage note: | Information about licenses and rights _SHOULD_ be provided on the level of Distribution. Information about licenses and rights _MAY_ be provided for a Dataset in addition to but not instead of the information provided for the Distributions of that Dataset. Providing license or rights information for a Dataset that is different from information provided for a Distribution of that Dataset _SHOULD_ be avoided as this can create legal conflicts. See also guidance at [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights). |
| See also: | [§ 6.7.7 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_rights) [§ 6.4.19 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license) |

#### 6.7.6 Property: access rights[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_rights)

| RDF Property: | [dct:accessRights](http://purl.org/dc/terms/accessRights) |
| --- | --- |
| Definition: | A rights statement that concerns how the distribution is accessed. |
| Range: | [`dct:RightsStatement`](http://purl.org/dc/terms/RightsStatement) |
| Usage note: | Information about licenses and rights _MAY_ be provided for the Distribution. See also guidance at [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights). |
| See also: | [§ 6.7.5 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_license), [§ 6.7.7 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_rights), [§ 6.4.1 Property: access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights) |

#### 6.7.7 Property: rights[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_rights)

| RDF Property: | [dct:rights](http://purl.org/dc/terms/rights) |
| --- | --- |
| Definition: | Information about rights held in and over the distribution. |
| Range: | [`dct:RightsStatement`](http://purl.org/dc/terms/RightsStatement) |
| Usage note: | 
`dct:license`, which is a sub-property of `dct:rights`, can be used to link a distribution to a license document. However, `dct:rights` allows linking to a rights statement that can include licensing information as well as other information that supplements the license such as attribution.

Information about licenses and rights _SHOULD_ be provided on the level of Distribution. Information about licenses and rights _MAY_ be provided for a Dataset in addition to but not instead of the information provided for the Distributions of that Dataset. Providing license or rights information for a Dataset that is different from information provided for a Distribution of that Dataset _SHOULD_ be avoided as this can create legal conflicts. See also guidance at [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights).

 |
| See also: | [§ 6.7.5 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_license), [§ 6.4.20 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights) |

#### 6.7.8 Property: has policy[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_has_policy)

| RDF Property: | [odrl:hasPolicy](https://www.w3.org/TR/odrl-vocab/#term-hasPolicy) |
| --- | --- |
| Definition: | An ODRL conformant policy expressing the rights associated with the distribution. |
| Range: | [`odrl:Policy`](https://www.w3.org/TR/odrl-vocab/#term-Policy) |
| Usage note: | Information about rights expressed as an ODRL policy \[[ODRL-MODEL](https://www.w3.org/TR/vocab-dcat-2/#bib-odrl-model "ODRL Information Model 2.2")\] using the ODRL vocabulary \[[ODRL-VOCAB](https://www.w3.org/TR/vocab-dcat-2/#bib-odrl-vocab "ODRL Vocabulary & Expression 2.2")\] _MAY_ be provided for the distribution. See also guidance at [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights). |
| See also: | [§ 6.4.19 Property: license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license), [§ 6.7.6 Property: access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_rights), [§ 6.7.7 Property: rights](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_rights) |

#### 6.7.9 Property: access URL[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_url)

| RDF Property: | [dcat:accessURL](https://www.w3.org/ns/dcat#accessURL) |
| --- | --- |
| Definition: | A URL of the resource that gives access to a distribution of the dataset. E.g. landing page, feed, SPARQL endpoint. |
| Domain: | [`dcat:Distribution`](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution) |
| Range: | [`rdfs:Resource`](https://www.w3.org/2000/01/rdf-schema#Resource) |
| Usage note: | 
[`dcat:accessURL`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_url) _SHOULD_ be used for the URL of a service or location that can provide access to this distribution, typically through a Web form, query or API call.

[`dcat:downloadURL`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url) is preferred for direct links to downloadable resources.

If the distribution(s) are accessible only through a landing page (i.e. direct download URLs are not known), then the landing page URL associated with the `dcat:Dataset` _SHOULD_ be duplicated as access URL on a distribution (see [§ 5.7 Dataset available only behind some Web page](https://www.w3.org/TR/vocab-dcat-2/#example-landing-page)).

 |
| See also | [§ 6.7.11 Property: download URL](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url), [§ 6.7.10 Property: access service](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_service) |

`dcat:accessURL` matches the property-chain `dcat:accessService`/`dcat:endpointURL`. In the RDF representation of DCAT this is axiomatized as an OWL property-chain axiom.

#### 6.7.10 Property: access service[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_service)

| RDF Property: | [dcat:accessService](https://www.w3.org/ns/dcat#accessService) |
| --- | --- |
| Definition: | A data service that gives access to the distribution of the dataset |
| Range: | [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) |
| Usage note: | [`dcat:accessService`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_service) _SHOULD_ be used to link to a description of a [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) that can provide access to this distribution. |
| See also | [§ 6.7.11 Property: download URL](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url), [§ 6.7.9 Property: access URL](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_url) |

#### 6.7.11 Property: download URL[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url)

| RDF Property: | [dcat:downloadURL](https://www.w3.org/ns/dcat#downloadURL) |
| --- | --- |
| Definition: | The URL of the downloadable file in a given format. E.g. CSV file or RDF file. The format is indicated by the distribution's `dct:format` and/or `dcat:mediaType` |
| Domain: | [`dcat:Distribution`](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution) |
| Range: | [`rdfs:Resource`](https://www.w3.org/2000/01/rdf-schema#Resource) |
| Usage note: | [`dcat:downloadURL`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_download_url) _SHOULD_ be used for the URL at which this distribution is available directly, typically through a HTTP Get request. |
| See also | [§ 6.7.9 Property: access URL](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_url), [§ 6.7.10 Property: access service](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_access_service) |

#### 6.7.12 Property: byte size[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_size)

| RDF Property: | [dcat:byteSize](https://www.w3.org/ns/dcat#size) |
| --- | --- |
| Definition: | The size of a distribution in bytes. |
| Domain: | [`dcat:Distribution`](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution) |
| Range: | [`rdfs:Literal`](https://www.w3.org/2000/01/rdf-schema#Literal) typed as [`xsd:decimal`](https://www.w3.org/TR/xmlschema11-2/#decimal). |
| Usage note: | The size in bytes can be approximated (as a decimal) when the precise size is not known. |

#### 6.7.13 Property: spatial resolution[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_spatial_resolution)

| RDF Property: | [dcat:spatialResolutionInMeters](https://www.w3.org/ns/dcat#spatialResolutionInMeters) |
| --- | --- |
| Definition: | The minimum spatial separation resolvable in a dataset distribution, measured in meters. |
| Range: | [`xsd:decimal`](https://www.w3.org/TR/xmlschema11-2/#decimal) |
| Usage note: | If the dataset is an image or grid this should correspond to the spacing of items. For other kinds of spatial datasets, this property will usually indicate the smallest distance between items in the dataset. |
| Usage note: | Alternative spatial resolutions might be provided as different dataset distributions |

The range of this property is a decimal number representing a length in meters. This is intended to provide a summary indication of the spatial resolution of the data distribution as a single number. More complex descriptions of various aspects of spatial precision, accuracy, resolution and other statistics can be provided using the Data Quality Vocabulary \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\].

#### 6.7.14 Property: temporal resolution[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_temporal_resolution)

| RDF Property: | [dcat:temporalResolution](https://www.w3.org/ns/dcat#temporalResolution) |
| --- | --- |
| Definition: | Minimum time period resolvable in the dataset distribution. |
| Range: | [`xsd:duration`](https://www.w3.org/TR/xmlschema11-2/#duration) |
| Usage note: | If the dataset is a time-series this should correspond to the spacing of items in the series. For other kinds of dataset, this property will usually indicate the smallest time difference between items in the dataset. |
| Usage note: | Alternative temporal resolutions might be provided in different dataset distributions |

This is intended to provide a summary indication of the temporal resolution of the data distribution as a single value. More complex descriptions of various aspects of temporal precision, accuracy, resolution and other statistics can be provided using the Data Quality Vocabulary \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\].

#### 6.7.15 Property: conforms to[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_conforms_to)

| RDF Property: | [dct:conformsTo](http://purl.org/dc/terms/conformsTo) |
| --- | --- |
| Definition: | An established standard to which the distribution conforms. |
| Range: | [`dct:Standard`](http://purl.org/dc/terms/Standard) (A basis for comparison; a reference point against which other things can be evaluated.) |
| Usage note: | This property _SHOULD_ be used to indicate the model, schema, ontology, view or profile that this representation of a dataset conforms to. This is (generally) a complementary concern to the media-type or format. |
| See also: | [§ 6.7.17 Property: format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_format), [§ 6.7.16 Property: media type](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_media_type) |

#### 6.7.16 Property: media type[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_media_type)

| RDF Property: | [dcat:mediaType](https://www.w3.org/ns/dcat#mediaType) |
| --- | --- |
| Definition: | The media type of the distribution as defined by IANA \[[IANA-MEDIA-TYPES](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-media-types "Media Types")\]. |
| Sub-property of: | [`dct:format`](http://purl.org/dc/terms/format) |
| Domain: | [`dcat:Distribution`](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution) |
| Range: | [`dct:MediaType`](http://purl.org/dc/terms/MediaType) |
| Usage note: | This property _SHOULD_ be used when the media type of the distribution is defined in IANA \[[IANA-MEDIA-TYPES](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-media-types "Media Types")\], otherwise `dct:format` _MAY_ be used with different values. |
| See also: | [§ 6.7.17 Property: format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_format), [§ 6.7.15 Property: conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_conforms_to) |

#### 6.7.17 Property: format[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_format)

| RDF Property: | [dct:format](http://purl.org/dc/terms/format) |
| --- | --- |
| Definition: | The file format of the distribution. |
| Range: | [`dct:MediaTypeOrExtent`](http://purl.org/dc/terms/MediaTypeOrExtent) |
| Usage note: | [`dcat:mediaType`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_media_type) _SHOULD_ be used if the type of the distribution is defined by IANA \[[IANA-MEDIA-TYPES](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-media-types "Media Types")\]. |
| See also: | [§ 6.7.16 Property: media type](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_media_type), [§ 6.7.15 Property: conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_conforms_to) |

#### 6.7.18 Property: compression format[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_compression_format)

| RDF Property: | [dcat:compressFormat](https://www.w3.org/ns/dcat#compressFormat) |
| --- | --- |
| Definition: | The compression format of the distribution in which the data is contained in a compressed form, e.g. to reduce the size of the downloadable file. |
| Range: | [`dct:MediaType`](http://purl.org/dc/terms/MediaType) |
| Usage note: | This property to be used when the files in the distribution are compressed, e.g. in a ZIP file. The format _SHOULD_ be expressed using a media type as defined by IANA \[[IANA-MEDIA-TYPES](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-media-types "Media Types")\], if available. |
| See also: | [§ 6.7.19 Property: packaging format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_packaging_format). |

For examples on the use of this property, see [§ C.5 Compressed and packaged distributions](https://www.w3.org/TR/vocab-dcat-2/#examples-compressed-and-packaged-distributions).

#### 6.7.19 Property: packaging format[](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_packaging_format)

| RDF Property: | [dcat:packageFormat](https://www.w3.org/ns/dcat#packageFormat) |
| --- | --- |
| Definition: | The package format of the distribution in which one or more data files are grouped together, e.g. to enable a set of related files to be downloaded together. |
| Range: | [`dct:MediaType`](http://purl.org/dc/terms/MediaType) |
| Usage note: | This property to be used when the files in the distribution are packaged, e.g. in a [TAR file](https://en.wikipedia.org/wiki/Tar_(computing)), a [Frictionless Data Package](http://frictionlessdata.io/data-packages/) or a [Bagit](https://tools.ietf.org/html/draft-kunze-bagit-14) file. The format _SHOULD_ be expressed using a media type as defined by IANA \[[IANA-MEDIA-TYPES](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-media-types "Media Types")\], if available. |
| See also: | [§ 6.7.18 Property: compression format](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_compression_format). |

For examples on the use of this property, see [§ C.5 Compressed and packaged distributions](https://www.w3.org/TR/vocab-dcat-2/#examples-compressed-and-packaged-distributions).

### 6.8 Class: Data Service[](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service)

The following properties are specific to this class: [endpoint description](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_endpoint_description), [endpoint URL](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_endpoint_url), [serves dataset](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_serves_dataset).

The following properties are inherited from the super-class [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource): [access rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_access_rights), [conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_conforms_to), [contact point](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_contact_point), [creator](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator), [description](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_description), [has policy](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_has_policy), [identifier](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_identifier), [is referenced by](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_is_referenced_by), [keyword/tag](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_keyword), [landing page](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_landing_page), [license](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license), [resource language](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_language), [relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_relation), [rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights), [qualified relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation), [publisher](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_publisher), [release date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date), [theme/category](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme), [title](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_title), [type/genre](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_type), [update/modification date](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date), [qualified attribution](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_attribution).

| RDF Class: | [dcat:DataService](https://www.w3.org/ns/dcat#DataService) |
| --- | --- |
| Definition: | A collection of operations that provides access to one or more datasets or data processing functions. |
| Sub-class of: | [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) |
| Sub-class of: | [`dctype:Service`](http://purl.org/dc/dcmitype/Service) |
| Usage note: | If a [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) is bound to one or more specified Datasets, they are indicated by the [`dcat:servesDataset`](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_serves_dataset) property. |
| Usage note: | The kind of service can be indicated using the [`dct:type`](http://purl.org/dc/terms/type) property. Its value may be taken from a controlled vocabulary such as the INSPIRE spatial data service type code list \[[INSPIRE-SDST](https://www.w3.org/TR/vocab-dcat-2/#bib-inspire-sdst "INSPIRE Registry: Spatial data service types")\]. |

For examples on the use of this class and related properties, see [§ C.4 Data services](https://www.w3.org/TR/vocab-dcat-2/#examples-data-service).

#### 6.8.1 Property: endpoint URL[](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_endpoint_url)

| RDF Property: | [`dcat:endpointURL`](https://www.w3.org/ns/dcat#endpointURL) |
| --- | --- |
| Definition: | The root location or primary endpoint of the service (a Web-resolvable IRI). |
| Domain: | [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) |
| Range: | [`rdfs:Resource`](https://www.w3.org/2000/01/rdf-schema#Resource) |

#### 6.8.2 Property: endpoint description[](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_endpoint_description)

| RDF Property: | [dcat:endpointDescription](https://www.w3.org/ns/dcat#endpointDescription) |
| --- | --- |
| Definition: | A description of the services available via the end-points, including their operations, parameters etc. |
| Domain: | [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) |
| Range: | [`rdfs:Resource`](https://www.w3.org/2000/01/rdf-schema#Resource) |
| Usage note: | The endpoint description gives specific details of the actual endpoint instances, while [`dct:conformsTo`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_conforms_to) is used to indicate the general standard or specification that the endpoints implement. |
| Usage note: | An endpoint description may be expressed in a machine-readable form, such as an OpenAPI (Swagger) description \[[OpenAPI](https://www.w3.org/TR/vocab-dcat-2/#bib-openapi "OpenAPI Specification")\], an OGC `GetCapabilities` response \[[WFS](https://www.w3.org/TR/vocab-dcat-2/#bib-wfs "Web Feature Service 2.0 Interface Standard")\], \[[ISO-19142](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19142 "Geographic information -- Web Feature Service")\], \[[WMS](https://www.w3.org/TR/vocab-dcat-2/#bib-wms "Web Map Service Implementation Specification")\], \[[ISO-19128](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19128 "Geographic information -- Web map server interface")\], a SPARQL Service Description \[[SPARQL11-SERVICE-DESCRIPTION](https://www.w3.org/TR/vocab-dcat-2/#bib-sparql11-service-description "SPARQL 1.1 Service Description")\], an \[[OpenSearch](https://www.w3.org/TR/vocab-dcat-2/#bib-opensearch "OpenSearch 1.1 Draft 6")\] or \[[WSDL20](https://www.w3.org/TR/vocab-dcat-2/#bib-wsdl20 "Web Services Description Language (WSDL) Version 2.0 Part 1: Core Language")\] document, a Hydra API description \[[HYDRA](https://www.w3.org/TR/vocab-dcat-2/#bib-hydra "Hydra Core Vocabulary")\], else in text or some other informal mode if a formal representation is not possible. |

#### 6.8.3 Property: serves dataset[](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_serves_dataset)

| RDF Property: | [dcat:servesDataset](https://www.w3.org/ns/dcat#servesdataset) |
| --- | --- |
| Definition: | A collection of data that this data service can distribute. |
| Range: | [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) |

### 6.9 Class: Concept Scheme[](https://www.w3.org/TR/vocab-dcat-2/#Class:Concept_Scheme)

| RDF Class: | [skos:ConceptScheme](https://www.w3.org/2004/02/skos/core#ConceptScheme) |
| --- | --- |
| Definition: | A knowledge organization system (KOS) used to represent themes/categories of datasets in the catalog. |
| See also: | [§ 6.3.2 Property: themes](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_themes), [§ 6.4.12 Property: theme/category](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme) |

### 6.10 Class: Concept[](https://www.w3.org/TR/vocab-dcat-2/#Class:Concept)

| RDF Class: | [skos:Concept](https://www.w3.org/2004/02/skos/core#Concept) |
| --- | --- |
| Definition: | A category or a theme used to describe datasets in the catalog. |
| Usage note: | It is recommended to use either `skos:inScheme` or `skos:topConceptOf` on every `skos:Concept` used to classify datasets to link it to the concept scheme it belongs to. This concept scheme is typically associated with the catalog using `dcat:themeTaxonomy`. |
| See also: | [§ 6.3.2 Property: themes](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_themes), [§ 6.4.12 Property: theme/category](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme) |

### 6.11 Class: Organization/Person[](https://www.w3.org/TR/vocab-dcat-2/#Class:Organization_Person)

| RDF Classes: | [`foaf:Person`](http://xmlns.com/foaf/0.1/Person) for people and [`foaf:Organization`](http://xmlns.com/foaf/0.1/Organization) for government agencies or other entities. |
| --- | --- |
| Usage note: | \[[FOAF](https://www.w3.org/TR/vocab-dcat-2/#bib-foaf "FOAF Vocabulary Specification 0.99 (Paddington Edition)")\] provides several properties to describe these entities. |

### 6.12 Class: Relationship[](https://www.w3.org/TR/vocab-dcat-2/#Class:Relationship)

The following properties are specific to this class: [relation](https://www.w3.org/TR/vocab-dcat-2/#Property:relationship_relation), [had role](https://www.w3.org/TR/vocab-dcat-2/#Property:relationship_hadRole).

Examples illustrating use of this class and its properties are given in [§ 13\. Qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms).

| RDF Class: | [dcat:Relationship](https://www.w3.org/ns/dcat#Relationship) |
| --- | --- |
| Definition: | An association class for attaching additional information to a relationship between DCAT Resources |
| Sub-class of: | [`prov:EntityInfluence`](https://www.w3.org/TR/prov-o/#EntityInfluence) |
| Usage note: | Use to characterize a relationship between datasets, and potentially other resources, where the nature of the relationship is known but is not adequately characterized by the standard \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] properties ([`dct:hasPart`](http://purl.org/dc/terms/hasPart), [`dct:isPartOf`](http://purl.org/dc/terms/isPartOf), [`dct:conformsTo`](http://purl.org/dc/terms/conformsTo), [`dct:isFormatOf`](http://purl.org/dc/terms/isFormatOf), [`dct:hasFormat`](http://purl.org/dc/terms/hasFormat), [`dct:isVersionOf`](http://purl.org/dc/terms/isVersionOf), [`dct:hasVersion`](http://purl.org/dc/terms/hasVersion), [`dct:replaces`](http://purl.org/dc/terms/replaces), [`dct:isReplacedBy`](http://purl.org/dc/terms/isReplacedBy), [`dct:references`](http://purl.org/dc/terms/references), [`dct:isReferencedBy`](http://purl.org/dc/terms/isReferencedBy), [`dct:requires`](http://purl.org/dc/terms/requires), [`dct:isRequiredBy`](http://purl.org/dc/terms/isRequiredBy)) or \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] properties ([`prov:wasDerivedFrom`](https://www.w3.org/TR/prov-o/#wasDerivedFrom), [`prov:wasInfluencedBy`](https://www.w3.org/TR/prov-o/#wasInfluencedBy), [`prov:wasQuotedFrom`](https://www.w3.org/TR/prov-o/#wasQuotedFrom), [`prov:wasRevisionOf`](https://www.w3.org/TR/prov-o/#wasRevisionOf), [`prov:hadPrimarySource`](https://www.w3.org/TR/prov-o/#hadPrimarySource), [`prov:alternateOf`](https://www.w3.org/TR/prov-o/#alternateOf), [`prov:specializationOf`](https://www.w3.org/TR/prov-o/#specializationOf)) |

#### 6.12.1 Property: relation[](https://www.w3.org/TR/vocab-dcat-2/#Property:relationship_relation)

| RDF Property: | [dct:relation](http://purl.org/dc/terms/relation) |
| --- | --- |
| Definition: | The resource related to the source resource. |
| Usage note: | In the context of a `dcat:Relationship` this is expected to point to another `dcat:Dataset` or other cataloged resource. |

#### 6.12.2 Property: had role[](https://www.w3.org/TR/vocab-dcat-2/#Property:relationship_hadRole)

| RDF Property: | [dcat:hadRole](https://www.w3.org/ns/dcat#hadRole) |
| --- | --- |
| Definition: | The function of an entity or agent with respect to another entity or resource. |
| Domain: | [`prov:Attribution`](https://www.w3.org/TR/prov-o/#Attribution) or [`dcat:Relationship`](https://www.w3.org/TR/vocab-dcat-2/#Class:Relationship) |
| Range: | [`dcat:Role`](https://www.w3.org/TR/vocab-dcat-2/#Class:Role) |
| Usage note: | May be used in a qualified-attribution to specify the role of an Agent with respect to an Entity. It is recommended that the value be taken from a controlled vocabulary of agent roles, such as \[[ISO-19115](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115 "Geographic information -- Metadata")\] [`CI_RoleCode`](https://standards.iso.org/iso/19115/resources/Codelists/gml/CI_RoleCode.xml). |
| Usage note: | May be used in a qualified-relation to specify the role of an Entity with respect to another Entity. It is recommended that the value be taken from a controlled vocabulary of entity roles. |

This DCAT property complements [`prov:hadRole`](https://www.w3.org/TR/prov-o/#hadRole) which provides the function of an entity or agent with respect to an activity.

### 6.13 Class: Role[](https://www.w3.org/TR/vocab-dcat-2/#Class:Role)

Examples illustrating use of this class are given in [§ 13\. Qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms).

| RDF Class: | [dcat:Role](https://www.w3.org/ns/dcat#Role) |
| --- | --- |
| Definition: | A role is the function of a resource or agent with respect to another resource, in the context of resource attribution or resource relationships. |
| Sub-class of: | [`skos:Concept`](https://www.w3.org/2004/02/skos/core#Concept) |
| Usage note: | Used in a qualified-attribution to specify the role of an Agent with respect to an Entity. It is recommended that the values be managed as a controlled vocabulary of agent roles, such as \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\] [`CI_RoleCode`](https://standards.iso.org/iso/19115/resources/Codelists/gml/CI_RoleCode.xml). |
| Usage note: | 
Used in a qualified-relation to specify the role of an Entity with respect to another Entity. It is recommended that the values be managed as a controlled vocabulary of entity roles such as

-   \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\] [`DS_AssociationTypeCode`](https://standards.iso.org/iso/19115/resources/Codelists/gml/DS_AssociationTypeCode.xml)
-   IANA Registry of Link Relations \[[IANA-RELATIONS](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-relations "Link Relations")\]
-   DataCite metadata schema \[[DataCite](https://www.w3.org/TR/vocab-dcat-2/#bib-datacite "DataCite Metadata Schema")\]
-   [MARC relators](https://id.loc.gov/vocabulary/relators)

 |

This DCAT class complements [`prov:Role`](https://www.w3.org/TR/prov-o/#Role) which provides the function of an entity or agent with respect to an activity.

### 6.14 Class: Period of Time[](https://www.w3.org/TR/vocab-dcat-2/#Class:Period_of_Time)

The following properties are specific to this class: [start date](https://www.w3.org/TR/vocab-dcat-2/#Property:period_start_date), [end date](https://www.w3.org/TR/vocab-dcat-2/#Property:period_end_date). [beginning](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_beginning), [end](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_end).

Examples illustrating use of these options for the temporal coverage of a dataset are given in [§ 9.1 Temporal properties](https://www.w3.org/TR/vocab-dcat-2/#temporal-properties).

| RDF Class: | [dct:PeriodOfTime](http://dublincore.org/documents/dcmi-terms/#terms-PeriodOfTime "http://purl.org/dc/terms/PeriodOfTime") |
| --- | --- |
| Definition: | An interval of time that is named or defined by its start and end. |
| Usage note: | The start and end of the interval _SHOULD_ be given by using properties [`dcat:startDate`](https://www.w3.org/TR/vocab-dcat-2/#Property:period_start_date) or [`time:hasBeginning`](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_beginning), and [`dcat:endDate`](https://www.w3.org/TR/vocab-dcat-2/#Property:period_end_date) or [`time:hasEnd`](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_end), respectively. The interval can also be open - i.e., it can have just a start or just an end. |

#### 6.14.1 Property: start date[](https://www.w3.org/TR/vocab-dcat-2/#Property:period_start_date)

| RDF Property: | [dcat:startDate](https://www.w3.org/ns/dcat#startDate "http://www.w3.org/ns/dcat#startDate") |
| --- | --- |
| Definition: | The start of the period. |
| Domain: | [`dct:PeriodOfTime`](https://www.w3.org/TR/vocab-dcat-2/#Class:Period_of_Time) |
| Range: | [`rdfs:Literal`](https://www.w3.org/TR/rdf-schema/#ch_literal "http://www.w3.org/2000/01/rdf-schema#Literal") encoded using the relevant ISO 8601 Date and Time compliant string \[[DATETIME](https://www.w3.org/TR/vocab-dcat-2/#bib-datetime "Date and Time Formats")\] and typed using the appropriate XML Schema datatype \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] ([`xsd:gYear`](https://www.w3.org/TR/xmlschema11-2/#gYear), [`xsd:gYearMonth`](https://www.w3.org/TR/xmlschema11-2/#gYearMonth), [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date), or [`xsd:dateTime`](https://www.w3.org/TR/xmlschema11-2/#dateTime)). |

#### 6.14.2 Property: end date[](https://www.w3.org/TR/vocab-dcat-2/#Property:period_end_date)

| RDF Property: | [dcat:endDate](https://www.w3.org/ns/dcat#endDate "http://www.w3.org/ns/dcat#endDate") |
| --- | --- |
| Definition: | The end of the period. |
| Domain: | [`dct:PeriodOfTime`](https://www.w3.org/TR/vocab-dcat-2/#Class:Period_of_Time) |
| Range: | [`rdfs:Literal`](https://www.w3.org/TR/rdf-schema/#ch_literal "http://www.w3.org/2000/01/rdf-schema#Literal") encoded using the relevant ISO 8601 Date and Time compliant string \[[DATETIME](https://www.w3.org/TR/vocab-dcat-2/#bib-datetime "Date and Time Formats")\] and typed using the appropriate XML Schema datatype \[[XMLSCHEMA11-2](https://www.w3.org/TR/vocab-dcat-2/#bib-xmlschema11-2 "W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes")\] |

#### 6.14.3 Property: beginning[](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_beginning)

| RDF Property: | [time:hasBeginning](https://www.w3.org/TR/owl-time/#time:hasBeginning "http://www.w3.org/2006/time#hasBeginning") |
| --- | --- |
| Definition: | Beginning of a period or interval. |
| Range: | [`time:Instant`](https://www.w3.org/TR/owl-time/#time:Instant) |
| Usage note: | Use of the property `time:hasBeginning` entails that value of the `dct:temporal` property is a member of the `time:TemporalEntity` class from \[[OWL-TIME](https://www.w3.org/TR/vocab-dcat-2/#bib-owl-time "Time Ontology in OWL")\]. In this context this could be taken to imply that `dct:PeriodOfTime` is equivalent to the sub-class [`time:ProperInterval`](https://www.w3.org/TR/owl-time/#time:ProperInterval) |

#### 6.14.4 Property: end[](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_end)

| RDF Property: | [time:hasEnd](https://www.w3.org/TR/owl-time/#time:hasEnd "http://www.w3.org/2006/time#hasEnd") |
| --- | --- |
| Definition: | End of a period or interval. |
| Range: | [`time:Instant`](https://www.w3.org/TR/owl-time/#time:Instant) |
| Usage note: | Use of the property `time:hasEnd` entails that value of the `dct:temporal` property is a member of the `time:TemporalEntity` class from \[[OWL-TIME](https://www.w3.org/TR/vocab-dcat-2/#bib-owl-time "Time Ontology in OWL")\]. In this context this could be taken to imply that `dct:PeriodOfTime` is equivalent to the sub-class [`time:ProperInterval`](https://www.w3.org/TR/owl-time/#time:ProperInterval) |

### 6.15 Class: Location[](https://www.w3.org/TR/vocab-dcat-2/#Class:Location)

The following properties are specific to this class: [geometry](https://www.w3.org/TR/vocab-dcat-2/#Property:location_geometry), [bounding box](https://www.w3.org/TR/vocab-dcat-2/#Property:location_bbox), [centroid](https://www.w3.org/TR/vocab-dcat-2/#Property:location_centroid).

Examples illustrating use of these options for the spatial coverage of a dataset are given in [§ 9.2 Spatial properties](https://www.w3.org/TR/vocab-dcat-2/#spatial-properties).

| RDF Class: | [dct:Location](http://dublincore.org/documents/dcmi-terms/#terms-Location "http://purl.org/dc/terms/Location") |
| --- | --- |
| Definition: | A spatial region or named place. |
| Usage note: | 
-   For an extensive geometry (i.e., a set of coordinates denoting the vertices of the relevant geographic area), the property [`locn:geometry`](https://www.w3.org/TR/vocab-dcat-2/#Property:location_geometry) \[[LOCN](https://www.w3.org/TR/vocab-dcat-2/#bib-locn "ISA Programme Location Core Vocabulary")\] _SHOULD_ be used.
-   For a geographic bounding box delimiting a spatial area the property [`dcat:bbox`](https://www.w3.org/TR/vocab-dcat-2/#Property:location_bbox) _SHOULD_ be used.
-   For the geographic center of a spatial area, or another characteristic point, the property [`dcat:centroid`](https://www.w3.org/TR/vocab-dcat-2/#Property:location_centroid) _SHOULD_ be used.

 |

#### 6.15.1 Property: geometry[](https://www.w3.org/TR/vocab-dcat-2/#Property:location_geometry)

| RDF Property: | [locn:geometry](https://www.w3.org/ns/locn#geometry "http://www.w3.org/ns/locn#geometry") |
| --- | --- |
| Definition: | Associates any resource with the corresponding geometry. \[[LOCN](https://www.w3.org/TR/vocab-dcat-2/#bib-locn "ISA Programme Location Core Vocabulary")\] |
| Range: | [`rdfs:Literal`](https://www.w3.org/TR/rdf-schema/#ch_literal) |
| Usage note: | The range of this property is intentionally generic, with the purpose of allowing different geometry encodings. E.g., the geometry could be encoded as WKT ([`geosparql:asWKT`](http://www.opengis.net/ont/geosparql#asWKT) \[[GeoSPARQL](https://www.w3.org/TR/vocab-dcat-2/#bib-geosparql "GeoSPARQL - A Geographic Query Language for RDF Data")\]). |

#### 6.15.2 Property: bounding box[](https://www.w3.org/TR/vocab-dcat-2/#Property:location_bbox)

| RDF Property: | [dcat:bbox](https://www.w3.org/ns/dcat#bbox "http://www.w3.org/ns/dcat#centroid") |
| --- | --- |
| Definition: | The geographic bounding box of a resource. |
| Range: | [`rdfs:Literal`](https://www.w3.org/TR/rdf-schema/#ch_literal) |
| Usage note: | The range of this property is intentionally generic, with the purpose of allowing different geometry encodings. E.g., the geometry could be encoded as WKT ([`geosparql:asWKT`](http://www.opengis.net/ont/geosparql#asWKT) \[[GeoSPARQL](https://www.w3.org/TR/vocab-dcat-2/#bib-geosparql "GeoSPARQL - A Geographic Query Language for RDF Data")\]). |

#### 6.15.3 Property: centroid[](https://www.w3.org/TR/vocab-dcat-2/#Property:location_centroid)

| RDF Property: | [dcat:centroid](https://www.w3.org/ns/dcat#centroid "http://www.w3.org/ns/dcat#centroid") |
| --- | --- |
| Definition: | The geographic center (centroid) of a resource. |
| Range: | [`rdfs:Literal`](https://www.w3.org/TR/rdf-schema/#ch_literal) |
| Usage note: | The range of this property is intentionally generic, with the purpose of allowing different geometry encodings. E.g., the geometry could be encoded as WKT ([`geosparql:asWKT`](http://www.opengis.net/ont/geosparql#asWKT) \[[GeoSPARQL](https://www.w3.org/TR/vocab-dcat-2/#bib-geosparql "GeoSPARQL - A Geographic Query Language for RDF Data")\]). |

## 7\. Dereferenceable identifiers[](https://www.w3.org/TR/vocab-dcat-2/#dereferenceable-identifiers)

_This section is non-normative._

The scientific and data provider communities use a number of different identifiers for publications, authors and data. DCAT primarily relies on persistent HTTP URIs as an effective way of making identifiers actionable. Notably, quite a few identifier schemes can be encoded as dereferenceable HTTP URIs, and some of them are also returning machine-readable metadata (e.g., DOIs \[[ISO-26324](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-26324 "Information and documentation -- Digital object identifier system")\] and [ORCIDs](https://orcid.org/)). Regardless, data providers still might need to refer to legacy identifiers, non-HTTP dereferenceable identifiers, locally minted or third-party-provided identifiers. In these cases, \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] and \[[VOCAB-ADMS](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-adms "Asset Description Metadata Schema (ADMS)")\] can be of use.

The property [`dct:identifier`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_identifier) explicitly indicates HTTP URIs as well as legacy identifiers. In the following examples, [`dct:identifier`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_identifier) identifies a dataset, but it can similarly be used with any kind of resources.

Proxy dereferenceable URIs can be used when resources have not HTTP dereferenceable IDs. For example, in [Example 14](https://www.w3.org/TR/vocab-dcat-2/#ex-proxy-id), `https://example.org/proxyid` is a proxy for `id`.

The property [`adms:identifier`](https://www.w3.org/TR/vocab-adms/#adms-identifier) \[[VOCAB-ADMS](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-adms "Asset Description Metadata Schema (ADMS)")\] can express other locally minted identifiers or external identifiers, like DOI, [ELI](https://eur-lex.europa.eu/eli-register/about.html), [arΧiv](https://arxiv.org/) for creative works and [ORCID](https://orcid.org/), [VIAF](https://viaf.org/), [ISNI](http://www.isni.org/) for actors such as authors and publishers, as long as the identifiers are globally unique and stable.

[Example 15](https://www.w3.org/TR/vocab-dcat-2/#ex-adms-identifier) uses [`adms:schemaAgency`](https://www.w3.org/TR/vocab-adms/#schemaAgency) and [`dct:creator`](http://dublincore.org/documents/dcmi-terms/#creator) to represent the authority that defines the identifier scheme (e.g., the [DOI foundation](https://www.doi.org/) in the example), `adms:schemaAgency` is used when the authority has no URI associated. The [CrossRef](https://www.crossref.org/display-guidelines/) and [DataCite](https://support.datacite.org/docs/datacite-doi-display-guidelines) display guidelines recommend displaying DOIs as full URL link in the form `https://doi.org/10.xxxx/xxxxx/`.

[Example 15](https://www.w3.org/TR/vocab-dcat-2/#ex-adms-identifier) does not represent the authority responsible for assigning and maintaining identifiers using that scheme (e.g., [Zenodo](https://zenodo.org/)) as naming the registrant goes against the philosophy of DOI, where the sub-spaces are abstracted from the organization that registers them, with the advantage that DOIs do not change when the organization changes or the responsibility for that sub-space is handed over to someone else. [Example 15](https://www.w3.org/TR/vocab-dcat-2/#ex-adms-identifier) shows a locally minted identifier for the creator of the dataset (e.g., `https://example.org/PoelenJorritHID`) and its correspondent ORCID identifier (e.g., `https://orcid.org/0000-0003-3138-4118`).

When the HTTP dereferenceable ID returns an RDF/OWL description for the dataset, the use of `owl:sameAs` might be considered. For example,

when dereferenced with media type `text/turtle`, `https://doi.org/10.5281/zenodo.1486279` returns a \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\] description for the dataset, which might dynamically enrich the description provided by `https://example.org/id`.

The need to distinguish between primary and alternative (or legacy) identifiers for a dataset within DCAT has been posed as a requirement. However, it is very much application-specific and would be better addressed in DCAT profiles rather than mandating a general approach.

Depending on the application context, specific guidelines such as ["DCAT-AP: How to manage duplicates?"](https://joinup.ec.europa.eu/release/dcat-ap-how-manage-duplicates) can be adopted for distinguishing authoritative datasets from dataset harvested by third parties catalogs.

### 7.1 Indicating common identifier types[](https://www.w3.org/TR/vocab-dcat-2/#identifiers-type)

If identifiers are not HTTP dereferenceable, common identifier types can be served as [RDF datatypes](https://www.w3.org/TR/rdf11-concepts/#dfn-recognized-datatype-iris) \[[RDF11-CONCEPTS](https://www.w3.org/TR/vocab-dcat-2/#bib-rdf11-concepts "RDF 1.1 Concepts and Abstract Syntax")\] or custom [OWL datatypes](https://www.w3.org/TR/owl2-syntax/#Datatype_Definitions) \[[OWL2-SYNTAX](https://www.w3.org/TR/vocab-dcat-2/#bib-owl2-syntax "OWL 2 Web Ontology Language Structural Specification and Functional-Style Syntax (Second Edition)")\] for the sake of interoperability, see `ex:type` in [Example 17](https://www.w3.org/TR/vocab-dcat-2/#ex-identifier-type).

If a registered URI type is used (following \[[RFC3986](https://www.w3.org/TR/vocab-dcat-2/#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax")\], [§ 3.1 Scheme](https://tools.ietf.org/html/rfc3986#section-3.1)), the identifier scheme is part of the URI; thus indicating a separate identifier scheme in 'type' is redundant. For example, DOI is registered as a namespace in the `info` URI scheme \[[IANA-URI-SCHEMES](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-uri-schemes "Uniform Resource Identifier (URI) Schemes")\] (see [DOI FAQ #11](https://www.doi.org/faq.html)), so according to \[[RFC3986](https://www.w3.org/TR/vocab-dcat-2/#bib-rfc3986 "Uniform Resource Identifier (URI): Generic Syntax")\], it should be encoded as in [Example 18](https://www.w3.org/TR/vocab-dcat-2/#ex-identifier-type-in-uri).

Otherwise, examples of common types for identifier scheme ([arXiv](https://arxiv.org/help/arxiv_identifier), etc.) are defined in [DataCite schema](https://schema.datacite.org/meta/kernel-4.1/include/datacite-relatedIdentifierType-v4.xsd) and [FAIRsharing Registry](https://fairsharing.org/standards/?q=&selected_facets=type_exact:identifier%20schema).

## 8\. License and rights statements[](https://www.w3.org/TR/vocab-dcat-2/#license-rights)

_This section is non-normative._

Selecting the right way to express conditions for access to and re-use of resources can be complex. Implementers should always seek legal advice before deciding which conditions apply to the resource being described.

This specification distinguishes three main situations: one where a statement is associated with a resource that is explicitly declared as a 'license'; a second, where the statement is associated with a resource denoting only access rights; a third, covering all the other cases - i.e., statements not concerning licensing conditions and/or access rights (e.g., copyright statements).

To address these scenarios, it is recommended to use the property `dct:rights`, and its sub-properties `dct:license` and `dct:accessRights`. More precisely:

1.  use [`dct:license`](http://dublincore.org/documents/dcmi-terms/#terms-license) to refer to licenses;
    
2.  use [`dct:accessRights`](http://dublincore.org/documents/dcmi-terms/#terms-accessRights) to express statements concerning only access rights (e.g., whether data can be accessed by anyone or just by authorized parties);
    
3.  use [`dct:rights`](http://dublincore.org/documents/dcmi-terms/#terms-rights) for all the other types of rights statements - those which are not covered by `dct:license` and `dct:accessRights`, such as copyright statements.
    

Finally, in the particular case when rights are expressed via [ODRL policies](https://www.w3.org/TR/odrl-vocab/#term-Policy), it is recommended to use the [`odrl:hasPolicy`](https://www.w3.org/TR/odrl-vocab/#term-hasPolicy) property as the link from the description of the cataloged resource or distribution to the ODRL policy, in addition to the corresponding \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] property that matches the same ODRL policy type.

Recommendations on the use of these properties on the different types of resources defined in DCAT are provided in the relevant class descriptions.

## 9\. Time and space[](https://www.w3.org/TR/vocab-dcat-2/#time-and-space)

_This section is non-normative._

### 9.1 Temporal properties[](https://www.w3.org/TR/vocab-dcat-2/#temporal-properties)

Five temporal properties of resources may be described using DCAT.

1.  The release time of a resource is given using [`dct:issued`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_release_date). The value is usually encoded as a [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date).
2.  The revision or update time of a resource is given using [`dct:modified`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_update_date). The value is usually encoded as a [`xsd:date`](https://www.w3.org/TR/xmlschema11-2/#date).
3.  The update schedule for a resource is indicated using [`dct:accrualPeriodicity`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_frequency). The value should be taken from a controlled vocabulary such as [Dublin Core Collection Description Frequency Vocabulary](http://www.dublincore.org/specifications/dublin-core/collection-description/frequency/).
4.  The minimum temporal separation of items in a dataset is given using [`dcat:temporalResolution`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution). The value is encoded as a [`xsd:duration`](https://www.w3.org/TR/xmlschema11-2/#duration). The update schedule and the temporal resolution can be combined to support the description of different kinds of time-series data as shown below.
5.  The temporal extent of a dataset is given using [`dct:temporal`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal). The value is a [`dct:PeriodOfTime`](http://purl.org/dc/terms/PeriodOfTime). A number of options for expressing the details of a `dct:PeriodOfTime` are recommended in [§ 6.14 Class: Period of Time](https://www.w3.org/TR/vocab-dcat-2/#Class:Period_of_Time). Examples of these follow.

### 9.2 Spatial properties[](https://www.w3.org/TR/vocab-dcat-2/#spatial-properties)

Two spatial properties of datasets may be described using DCAT.

1.  The minimum spatial separation of items in a dataset is given using [`dcat:spatialResolutionInMeters`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial_resolution). The value is a decimal number.
    
    An example of the use of [`dcat:spatialResolutionInMeters`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial_resolution) is given in [Example 3](https://www.w3.org/TR/vocab-dcat-2/#ex-dataset).
    
2.  The spatial extent of a dataset is given using [`dct:spatial`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial). The value is a [`dct:Location`](http://purl.org/dc/terms/Location). A number of options for expressing the details of a `dct:Location` are recommended in [§ 6.15 Class: Location](https://www.w3.org/TR/vocab-dcat-2/#Class:Location).
    
    Examples of these follow.
    

## 10\. Versioning[](https://www.w3.org/TR/vocab-dcat-2/#dataset-versions)

_This section is non-normative._

Versioning can be applied to any of the first class citizens DCAT resources including Catalogs, Datasets, Distributions. The notion of version is very much related to the community practices, data management policy and the workflows in place. It is up to data providers to decide when and why a new version should be released. For this reason, DCAT refrains from providing definitions or rules about when changes in a resource should turn in a new release of it.

Versioning may be understood as involving relationships between datasets, which is supported by the [`dcat:qualifiedRelation`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation) and described in [§ 13.2 Relationships between datasets and other resources](https://www.w3.org/TR/vocab-dcat-2/#qualified-relationship). The class [`dcat:Relationship`](https://www.w3.org/TR/vocab-dcat-2/#Class:Relationship) supports providing information about the relationship, and could be extended for versioning information.

## 11\. Data citation[](https://www.w3.org/TR/vocab-dcat-2/#data-citation)

_This section is non-normative._

[Dataset citation](https://www.w3.org/TR/dcat-ucr/#RDSC) is one of the requirements identified for this DCAT revision. Data citation is the practice of referencing data in a similar way as when providing bibliographic references, acknowledging data as a first class output in any investigative process. Data citation offers multiple benefits, such as supporting proper attribution and credit to those producing the data, facilitating data discovery, supporting tracking the impact and reuse of data, allowing for collaboration and re-use of data, and enabling the reproducibility of results based on the data.

To support data citation, the dataset description should include at a minimum: the dataset identifier, the dataset creator(s), the dataset title, the dataset publisher and the dataset publication or release date. These elements are those required by the DataCite metadata schema \[[DataCite](https://www.w3.org/TR/vocab-dcat-2/#bib-datacite "DataCite Metadata Schema")\], which is the metadata associated by the persistent identifiers (Digital Object Identifiers or DOIs) assigned by \[[DataCite](https://www.w3.org/TR/vocab-dcat-2/#bib-datacite "DataCite Metadata Schema")\] to research data.

In order to support data citation, this DCAT revision has added the consideration of [dereferenceable identifiers](https://www.w3.org/TR/vocab-dcat-2/#dereferenceable-identifiers) and support for indicating [the creators of the cataloged resources](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator). The remaining properties necessary for data citation were already available in DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\].

The constraints on the availability of properties required for data citation in the dataset description can be represented as a DCAT data citation profile.

## 12\. Quality information[](https://www.w3.org/TR/vocab-dcat-2/#quality-information)

_This section is non-normative._

The Data Quality Vocabulary (DQV) \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\] offers common modelling patterns for different aspects of Data Quality. It can relate DCAT datasets and distributions with different types of quality information including:

-   [`dqv:QualityAnnotation`](https://www.w3.org/TR/vocab-dqv/#dqv:QualityAnnotation), which represents feedback and quality certificates given about the dataset or its distribution.
-   [`dqv:QualityPolicy`](https://www.w3.org/TR/vocab-dqv/#dqv:QualityPolicy), which represents a policy or agreement that is chiefly governed by data quality concerns.
-   [`dqv:QualityMeasurement`](https://www.w3.org/TR/vocab-dqv/#dqv:QualityMeasurement), which represents a metric value providing quantitative or qualitative information about the dataset or distribution.

Each type of quality information can pertain to one or more quality dimensions, namely, quality characteristics relevant to the consumer. The practice to see the quality as a multi-dimensional space is consolidated in the field of quality management to split the quality management into addressable chunks. DQV does not define a normative list of quality dimensions. It offers the quality dimensions proposed in ISO/IEC 25012 \[[ISO-IEC-25012](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-iec-25012 "ISO/IEC 25012 - Data Quality model")\] and \[[ZaveriEtAl](https://www.w3.org/TR/vocab-dcat-2/#bib-zaverietal "Quality assessment for Linked Data: A Survey")\] as two possible starting points. It also provides an [RDF representation](https://www.w3.org/2016/05/ldqd) for the quality dimensions and categories defined in the latter. Ultimately, implementers will need to choose themselves the collection of quality dimensions that best fits their needs. The following section shows how DCAT and DQV can be coupled to describe the quality of datasets and distributions. For a comprehensive introduction and further examples of use, please refer to \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\].

### 12.1 Providing quality information[](https://www.w3.org/TR/vocab-dcat-2/#quality-example1)

A data consumer (`:consumer1`) describes the quality of the dataset `:genoaBusStopsDataset` that includes a georeferenced list of bus stops in Genoa. He/she annotates the dataset with a DQV quality note (`:genoaBusStopsDatasetCompletenessNote`) about data completeness (`ldqd:completeness`) to warn that the dataset includes only 20500 out of the 30000 stops.

The activity `:myQualityChecking` employs the service `:myQualityChecker` to check the quality of the `:genoaBusStopsDataset` dataset. The metric `:completenessWRTExpectedNumberOfEntities` is applied to measure the dataset completeness (`ldqd:completeness`) and it results in the quality measurement `:genoaBusStopsDatasetCompletenessMeasurement`.

Other examples of quality documentation are available in \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\], including examples about [how to express dataset accuracy and precision](https://www.w3.org/TR/vocab-dqv/#ExpressDatasetAccuracyPrecision).

### 12.2 Documenting conformance to standards[](https://www.w3.org/TR/vocab-dcat-2/#quality-conformance)

This section shows different modelling patterns combining \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\] with \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] and EARL \[[EARL10-Schema](https://www.w3.org/TR/vocab-dcat-2/#bib-earl10-schema "Evaluation and Report Language (EARL) 1.0 Schema")\] to represent the conformance degree to a stated quality standard and the details about the conformance tests.

#### 12.2.1 Conformance to a standard[](https://www.w3.org/TR/vocab-dcat-2/#quality-conformance-statement)

The use of [`dct:conformsTo`](http://dublincore.org/documents/dcmi-terms/#terms-conformsTo) and [`dct:Standard`](http://dublincore.org/documents/dcmi-terms/#terms-Standard) is a well-known pattern to represent the conformance to a standard. [Example 33](https://www.w3.org/TR/vocab-dcat-2/#ex-inspire-conformant-dataset), directly borrowed from \[[SDW-BP](https://www.w3.org/TR/vocab-dcat-2/#bib-sdw-bp "Spatial Data on the Web Best Practices")\] ([Example 51](https://www.w3.org/TR/sdw-bp/#ex-geodcat-ap-dataset-conformance-with-specification)), declares a fictional `a:Dataset` conformant to the EU INSPIRE Regulation on interoperability of spatial data sets and services (["Commission Regulation (EU) No 1089/2010 of 23 November 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards interoperability of spatial data sets and services"](http://data.europa.eu/eli/reg/2014/1312/oj)).

Another example concerns the specification of the coordinate reference system (CRS) used in a dataset - an information which is typically included in geospatial metadata. [Example 34](https://www.w3.org/TR/vocab-dcat-2/#ex-dataset-crs) shows how the CRS of a dataset can be specified in DCAT:

In [Example 34](https://www.w3.org/TR/vocab-dcat-2/#ex-dataset-crs), `http://www.opengis.net/def/crs/EPSG/0/28992` is a URI from the OGC CRS Registry, corresponding to [EPSG:28992](http://www.epsg-registry.org/?display=entity&urn=urn:ogc:def:crs:EPSG::28992) ("Amersfoort / RD New") (see also [Example 28](https://www.w3.org/TR/vocab-dcat-2/#ex-spatial-coverage-geometry-with-crs)).

#### 12.2.2 Degree of conformance[](https://www.w3.org/TR/vocab-dcat-2/#quality-conformance-degree)

Some legal context requires to specify the degree of conformance. For example, INSPIRE metadata adopts a specific controlled vocabulary \[[INSPIRE-DoC](https://www.w3.org/TR/vocab-dcat-2/#bib-inspire-doc "INSPIRE Registry: Degrees of conformity")\] to express non-conformance and non-evaluation beside the full compliance. Similar controlled vocabularies can be defined in other contexts.

[Example 35](https://www.w3.org/TR/vocab-dcat-2/#ex-conformance-degree) specifies some newly minted concepts representing the degree of conformance (i.e., conformant, not conformant) and declares the [`dct:type`](http://dublincore.org/documents/dcmi-terms/#terms-type) for indicating the result of conformance test. Following a pattern used in \[[GeoDCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-geodcat-ap "GeoDCAT-AP: A geospatial extension for the DCAT application profile for data portals in Europe. Version 1.0.1")\], the example uses a `prov:Entity` to model the conformance test (e.g., `a:testResult`), a `prov:Activity` to model the testing activity (e.g., `a:testingActivity`), a `prov:Plan` derived from the Data on the Web Best Practices \[[DWBP](https://www.w3.org/TR/vocab-dcat-2/#bib-dwbp "Data on the Web Best Practices")\] (e.g., `a:conformanceTest`) to check for the whole set of best practices. A qualified PROV association binds the testing activity to the conformance test.

Also, \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\] can be deployed to measure the compliance to a specific standard. In [Example 36](https://www.w3.org/TR/vocab-dcat-2/#ex-conformance-degree-percentage), the `:levelOfComplianceToDWBP` is a quality metrics which measures the compliance of a dataset to \[[DWBP](https://www.w3.org/TR/vocab-dcat-2/#bib-dwbp "Data on the Web Best Practices")\] in terms of the percentage of passed compliance tests. [Example 36](https://www.w3.org/TR/vocab-dcat-2/#ex-conformance-degree-percentage) assumes `iso` as a namespace prefix representing the quality dimensions and categories defined in the ISO/IEC 25012 \[[ISO-IEC-25012](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-iec-25012 "ISO/IEC 25012 - Data Quality model")\].

The quality measurement `:measurement_complianceToDWBP` represents the level of compliance for dataset `a:Dataset`, namely, measurement of the metric `:levelOfComplianceToDWBP`. If only a part of the compliance tests succeeds (e.g. half of the compliance tests), the measurement would look like in [Example 37](https://www.w3.org/TR/vocab-dcat-2/#ex-conformance-test-partial-success).

#### 12.2.3 Conformance test results[](https://www.w3.org/TR/vocab-dcat-2/#quality-conformance-test-results)

Further information about the tests can be provided using EARL \[[EARL10-Schema](https://www.w3.org/TR/vocab-dcat-2/#bib-earl10-schema "Evaluation and Report Language (EARL) 1.0 Schema")\]. EARL provides specific classes to describe the testing activity, which can be adopted in conjunction with \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\]. [Example 38](https://www.w3.org/TR/vocab-dcat-2/#ex-conformance-test-results-earl) describes the Testing activity `a:testingActivity` as an `earl:Assertion` instead of a qualified association on the `prov:Activity`. The `earl:Assertion` states that dataset `a:Dataset` has been tested with the conformance test `a:conformanceTest`, and it has passed the test as described in `a:testResult`.

[Example 39](https://www.w3.org/TR/vocab-dcat-2/#ex-conformance-test-earl-fail) shows how the description would have looked like if the subtest `a:testq1` had failed. In particular, `dct:description` and `earl:info` provide additional warnings or error messages in a human-readable form.

Depending on the details required about tests, \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\] can express the testing activity and errors as well. In [Example 40](https://www.w3.org/TR/vocab-dcat-2/#ex-conformance-test-error), `:error` is a quality annotation that represents the previous error, and `a:testResult` is defined as a `dqv:QualityMetadata` to collect the above annotations and the compliance measurements providing provenance information.

Of course, the above modelling patterns can represent any quality tests, not only conformance to standards.

## 13\. Qualified relations[](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms)

_This section is non-normative._

DCAT includes elements to support description of many aspects of datasets and data-services. Nevertheless, additional information is required in order to fully express the semantics of some relationships. An example is that, while \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] provides the standard roles **creator**, **contributor** and **publisher** for attribution of a resource to a responsible party or agent, there are many other potential roles, see for example the [`CI_RoleCode`](https://standards.iso.org/iso/19115/resources/Codelists/gml/CI_RoleCode.xml) values from \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\]. Similarly, while \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] and \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] provide some properties to capture relationships between resources, including **was derived from**, **was quoted from**, **is version of**, **references** and several others, many additional concerns are seen in the list of \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\] [`DS_AssociationTypeCodes`](https://standards.iso.org/iso/19115/resources/Codelists/gml/DS_AssociationTypeCode.xml), the IANA Registry of Link Relations \[[IANA-RELATIONS](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-relations "Link Relations")\], the DataCite metadata schema \[[DataCite](https://www.w3.org/TR/vocab-dcat-2/#bib-datacite "DataCite Metadata Schema")\] and the [MARC relators](https://id.loc.gov/vocabulary/relators). While these relations could be captured with additional sub-properties of `dct:relation`, `dct:contributor`, etc, this would lead to an explosion in the number of properties, and anyway the full set of potential roles and relationships is unknown.

A common approach for meeting these kinds of requirement is to introduce an additional resource to carry parameters that qualify the relationship. Precedents are the [qualified terms](https://www.w3.org/TR/prov-o/#description-qualified-terms) in \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] and the [sample relations](https://www.w3.org/TR/vocab-ssn/#Sample_Relations) in the Semantic Sensor Network ontology \[[VOCAB-SSN](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-ssn "Semantic Sensor Network Ontology")\]. The general [Qualified Relation pattern](http://patterns.dataincubator.org/book/qualified-relation.html) is described in \[[LinkedDataPatterns](https://www.w3.org/TR/vocab-dcat-2/#bib-linkeddatapatterns "Linked Data Patterns: A pattern catalogue for modelling, publishing, and consuming Linked Data")\].

Many of the qualified terms from \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] are relevant to the description of resources in catalogs but these are incomplete due to the activity-centric viewpoint taken by PROV-O. Addressing some of the gaps, additional forms are included in the DCAT vocabulary to satisfy requirements that do not involve explicit activities. These are summarized in [Figure 5](https://www.w3.org/TR/vocab-dcat-2/#UML-DCAT-Qualified-Relations "Qualified relationships support an extensible set of roles relating resources to agents or to other resources"):

![UML model of DCAT qualified relationships](https://www.w3.org/TR/vocab-dcat-2/images/DCAT-relationships.png)

Figure 5 Qualified relationships support an extensible set of roles relating resources to agents or to other resources

Note that, while the focus of these qualified forms is to allow for additional _roles_ on a relationship, other aspect of the relationships, such as the applicable time interval, are easily attached when a specific node is used to describe the relationship like this (e.g. see the [chart of Influence relations](https://www.w3.org/TR/prov-o/#qualified-terms-figure) in \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\] for some examples).

### 13.1 Relationships between datasets and agents[](https://www.w3.org/TR/vocab-dcat-2/#qualified-attribution)

The standard \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] properties [`dct:contributor`](http://purl.org/dc/terms/contributor), [`dct:creator`](http://purl.org/dc/terms/creator) and [`dct:publisher`](http://purl.org/dc/terms/publisher), and the generic [`prov:wasAttributedTo`](https://www.w3.org/TR/prov-o/#wasAttributedTo) from \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\], support basic associations of responsible agents with a cataloged resource. However, there are many other roles of importance in relation to datasets and services - e.g. funder, distributor, custodian, editor. Some of these roles are enumerated in the [`CI_RoleCode`](https://standards.iso.org/iso/19115/resources/Codelists/gml/CI_RoleCode.xml) values from \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\], in the \[[DataCite](https://www.w3.org/TR/vocab-dcat-2/#bib-datacite "DataCite Metadata Schema")\] metadata schema, and included within the [MARC relators](https://id.loc.gov/vocabulary/relators).

A general method for assigning an agent to a resource with a specified role is provided by using the qualified form [`prov:qualifiedAttribution`](https://www.w3.org/TR/prov-o/#qualifiedAttribution) from \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\]. [Example 41](https://www.w3.org/TR/vocab-dcat-2/#ex-qualified-attribution) provides an illustration:

In [Example 41](https://www.w3.org/TR/vocab-dcat-2/#ex-qualified-attribution) the roles are denoted by IRIs from a (non-normative) [linked data representation](http://registry.it.csiro.au/def/isotc211/CI_RoleCode) of the [`CI_RoleCode`](https://standards.iso.org/iso/19115/resources/Codelists/gml/CI_RoleCode.xml) codelist from \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\].

### 13.2 Relationships between datasets and other resources[](https://www.w3.org/TR/vocab-dcat-2/#qualified-relationship)

The standard \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] properties [`dct:relation`](http://purl.org/dc/terms/relation) and sub-properties such as [`dct:hasPart`](http://purl.org/dc/terms/hasPart) / [`dct:isPartOf`](http://purl.org/dc/terms/isPartOf), [`dct:hasVersion`](http://purl.org/dc/terms/hasVersion) / [`dct:isVersionOf`](http://purl.org/dc/terms/isVersionOf), [`dct:replaces`](http://purl.org/dc/terms/replaces) / [`dct:isReplacedBy`](http://purl.org/dc/terms/isReplacedBy), [`dct:requires`](http://purl.org/dc/terms/requires) / [`dct:isRequiredBy`](http://purl.org/dc/terms/isRequiredBy), [`prov:wasDerivedFrom`](https://www.w3.org/TR/prov-o/#wasDerivedFrom), [`prov:wasQuotedFrom`](https://www.w3.org/TR/prov-o/#wasQuotedFrom), support the description of relationships between datasets and other cataloged resources. However, there are many other relationships of importance - e.g. alternate, canonical, original, preview, stereo-mate, working-copy-of. Some of these roles are enumerated in the [`DS_AssociationTypeCodes`](https://standards.iso.org/iso/19115/resources/Codelists/gml/DS_AssociationTypeCode.xml) values from \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\], the IANA Registry of Link Relations \[[IANA-RELATIONS](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-relations "Link Relations")\], in the \[[DataCite](https://www.w3.org/TR/vocab-dcat-2/#bib-datacite "DataCite Metadata Schema")\] metadata schema, and included within the [MARC relators](https://id.loc.gov/vocabulary/relators).

A general method for relating a resource to another resource with a specified role is provided by using the qualified form [`dcat:qualifiedRelation`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation). [Example 42](https://www.w3.org/TR/vocab-dcat-2/#ex-dataset-resource) provides illustrations:

In [Example 42](https://www.w3.org/TR/vocab-dcat-2/#ex-dataset-resource) the roles are denoted by IRIs from \[[IANA-RELATIONS](https://www.w3.org/TR/vocab-dcat-2/#bib-iana-relations "Link Relations")\] and from a (non-normative) [linked data representation](http://registry.it.csiro.au/def/isotc211/DS_AssociationTypeCode) of the [`DS_AssociationTypeCode`](https://standards.iso.org/iso/19115/resources/Codelists/gml/DS_AssociationTypeCode.xml) codelist from \[[ISO-19115-1](https://www.w3.org/TR/vocab-dcat-2/#bib-iso-19115-1 "Geographic information -- Metadata -- Part 1: Fundamentals")\].

## 14\. DCAT Profiles[](https://www.w3.org/TR/vocab-dcat-2/#profiles)

_This section is non-normative._

The DCAT-2014 vocabulary \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] has been extended for application in data catalogs in different domains. Each of these new specifications constitutes a DCAT profile, i.e. a named set of constraints based on DCAT (see [§ 4\. Conformance](https://www.w3.org/TR/vocab-dcat-2/#conformance)). In some cases, a profile extends one of the DCAT profiles themselves, by adding classes and properties for metadata fields not covered in the reference DCAT profile.

Some of the DCAT profiles are:

-   DCAT-AP \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\]: The DCAT application profile for data portals in Europe
-   GeoDCAT-AP \[[GeoDCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-geodcat-ap "GeoDCAT-AP: A geospatial extension for the DCAT application profile for data portals in Europe. Version 1.0.1")\]: Geospatial profile of \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\]
-   StatDCAT-AP \[[StatDCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-statdcat-ap "StatDCAT-AP – DCAT Application Profile for description of statistical datasets. Version 1.0.1")\]: Statistical profile of \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\]
-   DCAT-AP\_IT \[[DCAT-AP-IT](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap-it "Profilo metadatazione DCAT-AP_IT")\]: Italian profile of \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\]
-   GeoDCAT-AP\_IT \[[GeoDCAT-AP-IT](https://www.w3.org/TR/vocab-dcat-2/#bib-geodcat-ap-it "GeoDCAT-AP in Italy, the national guidelines published")\]: Italian profile of \[[GeoDCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-geodcat-ap "GeoDCAT-AP: A geospatial extension for the DCAT application profile for data portals in Europe. Version 1.0.1")\]
-   DCAT-AP-NO \[[DCAT-AP-NO](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap-no "Standard for beskrivelse av datasett og datakataloger (DCAT-AP-NO)")\]: Norwegian profile of \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\]
-   DCAT-AP.de \[[DCAT-AP.de](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap.de "Vokabulare und Dokumente für DCAT-AP.de")\]: German profile of \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\]
-   DCAT-BE \[[DCAT-BE](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-be "Linking data portals across Belgium.")\]: Belgian profile of \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\]
-   DCAT-AP-SE \[[DCAT-AP-SE](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap-se "DCAT-AP-SE: Swedish recommendation for DCAT-AP1.1")\]: Swedish profile of \[[DCAT-AP](https://www.w3.org/TR/vocab-dcat-2/#bib-dcat-ap "DCAT Application Profile for data portals in Europe. Version 1.2.1")\]

## 15\. Security and Privacy[](https://www.w3.org/TR/vocab-dcat-2/#security_and_privacy)

The DCAT vocabulary supports the attribution of data and metadata to various participants such as resource [creators](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator), [publishers](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_publisher) and other parties or agents via [qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms), and as such defines terms that may be related to personal information. In addition, it also supports the association of [rights](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_rights) and [licenses](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_license) with cataloged Resources and Distributions. These rights and licenses could potentially include or reference sensitive information such as user and asset identifiers as [described](https://www.w3.org/TR/odrl-vocab/#privacy-consideration) in \[[ODRL-VOCAB](https://www.w3.org/TR/vocab-dcat-2/#bib-odrl-vocab "ODRL Vocabulary & Expression 2.2")\]. Implementations that produce, maintain, publish or consume such vocabulary terms must take steps to ensure security and privacy considerations are addressed at the application level.

## A. Acknowledgments[](https://www.w3.org/TR/vocab-dcat-2/#acknowledgments)

The editors gratefully acknowledge the contributions made to this document by [all members of the working group](https://www.w3.org/2000/09/dbwg/details?group=99375&public=1), especially Annette Greiner, Antoine Isaac, Armin Haller, Dan Brickley, Ine de Visser, Jaroslav Pullmann, Lars G. Svensson, Linda van den Brink, Makx Dekkers, Nicholas Car, Rob Atkinson, Tom Baker.

The editors would also like to thank the following for comments received: Addison Phillips, Andreas Kuckartz, Anna Odgaard Ingram, Armando Stellato, Bert van Nuffelen, Chris Little, Chris Sweeney, Chris Wood, Clemens Portele, Daniel Pop, Dave Reynolds, Guillaume Duffes, Ian Davis, Jakob Voß, Jakub Klímek, James Passmore, Leigh Dodds, Luca Trani, Marco Brattinga, Matthias Palmér, Melanie Barlow, Nancy Fallgren, Nuno Freire, Øystein Åsnes, Pano Maria, Peter Parslow, Renato Iannella, Ruth Duerr, Siri Jodha S. Khalsa, Stephane Fellah, Stephen Richard, Stijn Goedertier, Tom Kralidis, Vladimir Alexiev, Wouter Beek, Yves Coene.

The editors also gratefully acknowledge the chairs of this Working Group: Karen Coyle, Caroline Burle and Peter Winstanley — and staff contacts Phil Archer and Dave Raggett.

## B. Alignment with Schema.org[](https://www.w3.org/TR/vocab-dcat-2/#dcat-sdo)

_This section is non-normative._

Schema.org \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\] includes a number of types and properties based on the original DCAT work (see [sdo:Dataset](https://schema.org/Dataset) as a starting point), and the index for Google's [Dataset Search service](https://g.co/datasetsearch) relies on structured description in Web pages about datasets using both [schema.org and DCAT](https://developers.google.com/search/docs/data-types/dataset). A comparison of the DCAT backbone, shown in [Figure 1](https://www.w3.org/TR/vocab-dcat-2/#UML_DCAT_All_Attr "Overview of DCAT model, showing the classes of resources that can be members of a Catalog, and the relationships between them.") above with the related classes from \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\] in [Figure 6](https://www.w3.org/TR/vocab-dcat-2/#UML_SchemaOrg_Data_Cat "schema.org support for dataset catalogs, showing a selection of schema.org properties related to the classes shown") shows the similarity, in particular: .

-   the distinction between (abstract) Dataset and (concrete) DataDownload matches dcat:Dataset / dcat:Distribution
-   the relationship of Datasets to DataCatalogs

![UML model of schema.org classes and properties related to dataset catalogs](https://www.w3.org/TR/vocab-dcat-2/images/schema.org-dataset.png)

Figure 6 schema.org support for dataset catalogs, showing a selection of schema.org properties related to the classes shown

General purpose Web search services that use metadata at all rely primarily on \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\], so the relationship of DCAT to \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\] is of interest for data providers and catalog publishers who wish their datasets and services to be exposed through those indexes.

A [mapping between DCAT 2014 and schema.org](https://www.w3.org/wiki/WebSchemas/Datasets) was discussed on the original proposal to extend \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\] for describing datasets and data catalogs. Partial mappings between DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] and \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\] were provided earlier by the [Spatial Data on the Web Working Group](https://www.w3.org/2015/spatial/wiki/ISO_19115_-_DCAT_-_Schema.org_mapping), building upon previous work.

A recommended mapping from the revised DCAT (this document) to \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\] version 3.4 is [available in an RDF file](https://w3c.github.io/dxwg/dcat/rdf/dcat-schema.ttl). This mapping is axiomatized using the predicates `rdfs:subClassOf`, `rdfs:subPropertyOf`, `owl:equivalentClass`, `owl:equivalentProperty`, `skos:closeMatch`, and also using the annotation properties `sdo:domainIncludes` and `sdo:rangeIncludes` to match \[[SCHEMA-ORG](https://www.w3.org/TR/vocab-dcat-2/#bib-schema-org "Schema.org")\] semantics. The alignment is summarized in the table below, considering the prefix `sdo` as `http://schema.org/`.

| DCAT element | target element from schema.org |
| --- | --- |
| **dcat:Resource** | **sdo:Thing** |
| dct:title | sdo:name |
| dct:description | sdo:description |
| dcat:keyword  
_dcat:keyword is singular, sdo:keywords is plural_ | sdo:keywords |
| dcat:theme | sdo:about |
| dct:identifier | sdo:identifier |
| dct:type | sdo:additionalType |
| dct:issued | sdo:datePublished |
| dct:modified | sdo:dateModified |
| dct:language | sdo:inLanguage |
| dct:relation | sdo:isRelatedTo |
| dcat:landingPage | sdo:url |
| dct:publisher | sdo:publisher |
| dcat:contactPoint | sdo:contactPoint |
| **dcat:Catalog** | **sdo:DataCatalog** |
| dct:hasPart | sdo:hasPart |
| dcat:dataset | sdo:dataset |
| dcat:distribution | sdo:distribution |
| **dcat:Dataset** | **sdo:Dataset** |
| **dcat:Dataset**  
_dct:accrualPeriodicity fixed to  
<http://purl.org/cld/freq/continuous>_ | **sdo:DataFeed** |
| dct:spatial | sdo:spatialCoverage |
| dct:temporal | sdo:temporalCoverage |
| dct:accrualPeriodicity | sdo:repeatFrequency |
| prov:wasGeneratedBy | \[ owl:inverseOf sdo:result \] |
| **dcat:Distribution** | **sdo:DataDownload** |
| dct:format | sdo:encodingFormat |
| dcat:mediaType | sdo:encodingFormat |
| dcat:byteSize | sdo:contentSize |
| dcat:accessURL | sdo:contentUrl |
| dcat:downloadURL | sdo:contentUrl |
| dct:license | sdo:license |
| **dcat:DataService** | **sdo:WebAPI** |
| dcat:endPointURL | sdo:url |
| dcat:endPointDescription | sdo:documentation, sdo:hasOfferCatalog |
| dct:type  
_in context of a dcat:DataService_ | sdo:serviceType |
| dcat:servesDataset | sdo:serviceOutput |
| **dcat:Relationship** | **sdo:Role** |

## C. Examples[](https://www.w3.org/TR/vocab-dcat-2/#collection-of-examples)

_This section is non-normative._

### C.1 Loosely structured catalog[](https://www.w3.org/TR/vocab-dcat-2/#examples-bag-of-files)

In many legacy catalogs and repositories (e.g. CKAN), ‘datasets’ are ‘just a bag of files’. There is no distinction made between part/whole, distribution (representation), and other kinds of relationship (e.g. documentation, schema, supporting documents) from the dataset to each of the files.

If the nature of the relationships between a dataset and component resources in a catalog, repository, or elsewhere are not known, `dct:relation` can be used:

If it is clear that any of these related resources is a proper _representation_ of the dataset, `dcat:distribution` should be used.

This example is available from the [DXWG code repository](https://github.com/w3c/dxwg/tree/gh-pages/dcat/examples) at [`csiro-dap-examples.ttl`](https://w3c.github.io/dxwg/dcat/examples/csiro-dap-examples.ttl).

Additional detail about the nature of the related resources can be given using suitable elements from other RDF vocabularies, along with dataset descriptors from DCAT. For example, the example above might be more fully expressed as follows (embedded comments explain the different resources in the graph):

This example is available from the [DXWG code repository](https://github.com/w3c/dxwg/tree/gh-pages/dcat/examples) at [`csiro-stratchart.ttl`](https://w3c.github.io/dxwg/dcat/examples/csiro-stratchart.ttl).

### C.2 Dataset provenance[](https://www.w3.org/TR/vocab-dcat-2/#examples-dataset-provenance)

The provenance or business context of a dataset can be described using elements from the W3C Provenance Ontology \[[PROV-O](https://www.w3.org/TR/vocab-dcat-2/#bib-prov-o "PROV-O: The PROV Ontology")\].

For example, a simple link from a dataset description to the project that generated the dataset can be formalized as follows (other details elided for clarity):

This example is available from the [DXWG code repository](https://github.com/w3c/dxwg/tree/gh-pages/dcat/examples) at [`csiro-dap-examples.ttl`](https://w3c.github.io/dxwg/dcat/examples/csiro-dap-examples.ttl).

Several properties capture provenance information, including within the citation and title, but the primary link to a formal description of the project is through [`prov:wasGeneratedBy`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_was_generated_by). A terse description of the project is shown as a [`prov:Activity`](https://www.w3.org/TR/prov-o/#Activity), though this would not necessarily be part of the same catalog. Note that as the project is ongoing, the activity has no end date.

Further provenance information might be provided using the other _starting point properties_ from PROV, in particular [`prov:wasAttributedTo`](https://www.w3.org/TR/prov-o/#wasAttributedTo) (to link to an agent associated with the dataset production) and [`prov:wasDerivedFrom`](https://www.w3.org/TR/prov-o/#wasDerivedFrom) (to link to a predecessor dataset). Both of these complement Dublin Core properties already used in DCAT, as follows:

-   `prov:wasAttributedTo` provides a general link to all kinds of associated agents, such as project sponsors, managers, dataset owners, etc which are not correctly characterized using `dct:creator`, `dct:contributor` or `dct:publisher`.
-   `prov:wasDerivedFrom` supports a more specific relationship to an input or predecessor dataset compared with `dct:source`, which is not necessarily a previous dataset.

Further patterns for the use of _qualified properties_ for resource attribution and interrelationships are described in [§ 13\. Qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms).

### C.3 Link datasets and publications[](https://www.w3.org/TR/vocab-dcat-2/#examples-dataset-publication)

Often datasets are associated with publications (scholarly articles, reports, etc) and this version of DCAT relies on the property `dct:isReferencedBy` to provide a way to link publications about a dataset to the dataset

The following example shows how a dataset published in the [Dryad repository](https://datadryad.org/) is linked to a publication available in the Nature Scientific Data journal:

This examples is available from the [DXWG code repository](https://github.com/w3c/dxwg/tree/gh-pages/dcat/examples) at [`dryad-globtherm-sdata.ttl`](https://w3c.github.io/dxwg/dcat/examples/dryad-globtherm-sdata.ttl)

### C.4 Data services[](https://www.w3.org/TR/vocab-dcat-2/#examples-data-service)

Data services may be described using DCAT. The values of the classifiers `dct:type`, `dct:conformsTo`, and `dcat:endpointDescription` provide progressively more detail about a service, whose actual endpoint is given by the `dcat:endpointURL`.

The first example describes a data catalog hosted by the European Environment Agency (EEA). This is classified as a [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) and has the `dct:type` set to "[discovery](http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceType/discovery)" from the INSPIRE classification of spatial data service types \[[INSPIRE-SDST](https://www.w3.org/TR/vocab-dcat-2/#bib-inspire-sdst "INSPIRE Registry: Spatial data service types")\].

This example is available from the [DXWG code repository](https://github.com/w3c/dxwg/tree/gh-pages/dcat/examples) at [`eea-csw.ttl`](https://w3c.github.io/dxwg/dcat/examples/eea-csw.ttl)

[Example 49](https://www.w3.org/TR/vocab-dcat-2/#ex-service-gsa) shows a dataset hosted by Geoscience Australia, which is available from three distinct services, as indicated by the value of the [`dcat:servesDataset`](https://www.w3.org/TR/vocab-dcat-2/#Property:data_service_serves_dataset) property of each of the service descriptions. These are classified as a [`dcat:DataService`](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service) and also have the `dct:type` set to "[download](http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceType/download)" and "[view](http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceType/view)" from the INSPIRE classification of spatial data service types \[[INSPIRE-SDST](https://www.w3.org/TR/vocab-dcat-2/#bib-inspire-sdst "INSPIRE Registry: Spatial data service types")\].

[Example 49](https://www.w3.org/TR/vocab-dcat-2/#ex-service-gsa) is available from the [DXWG code repository](https://github.com/w3c/dxwg/tree/gh-pages/dcat/examples) at [`ga-courts.ttl`](https://w3c.github.io/dxwg/dcat/examples/ga-courts.ttl)

### C.5 Compressed and packaged distributions[](https://www.w3.org/TR/vocab-dcat-2/#examples-compressed-and-packaged-distributions)

The first example is for a distribution with a downloadable file that is compressed into a GZIP file.

The second example is for a distribution with several files packed into a TAR file.

The third example is for a distribution with several files packed into a TAR file which has been compressed into a GZIP file.

These examples are available from the [DXWG code repository](https://github.com/w3c/dxwg/tree/gh-pages/dcat/examples) at [`compress-and-package.ttl`](https://w3c.github.io/dxwg/dcat/examples/compress-and-package.ttl)

## D. Change history[](https://www.w3.org/TR/vocab-dcat-2/#changes)

A full change-log is available on [GitHub](https://github.com/w3c/dxwg/commits/gh-pages/dcat)

### D.1 Changes since the W3C Recommendation of 16 January 2014[](https://www.w3.org/TR/vocab-dcat-2/#changes-since-20140116)

The document has undergone the following changes since the W3C Recommendation of 16 January 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\]:

-   A new property [`dct:isReferencedBy`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_is_referenced_by) was added to the class [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource) to associate the resource described in the catalog with an external resource that references, cites, or points to the cataloged resource. In particular, in the case of datasets, this property supports the data citation use case where a publication references a dataset. For other types of relations not covered by this or other known properties, the specification provides the [qualified relations](https://www.w3.org/TR/vocab-dcat-2/#qualified-forms) pattern. See [Issue #63](https://github.com/w3c/dxwg/issues/63).
-   A new section [§ 9\. Time and space](https://www.w3.org/TR/vocab-dcat-2/#time-and-space) was added to describe how to indicate the temporal and spatial characteristics of a resource. See [Issue #83](https://github.com/w3c/dxwg/issues/83), [Issue #84](https://github.com/w3c/dxwg/issues/84), [Issue #85](https://github.com/w3c/dxwg/issues/85).
-   A new class [`dct:Location`](https://www.w3.org/TR/vocab-dcat-2/#Class:Location) and three new properties ([`locn:geometry`](https://www.w3.org/TR/vocab-dcat-2/#Property:location_geometry), [`dcat:bbox`](https://www.w3.org/TR/vocab-dcat-2/#Property:location_bbox), [`dcat:centroid`](https://www.w3.org/TR/vocab-dcat-2/#Property:location_centroid)) added to support description of the coordinates of a geographical area, to be used for specifying the spatial coverage of a resource. See [Issue #83](https://github.com/w3c/dxwg/issues/83).
-   A new class [`dct:PeriodOftime`](https://www.w3.org/TR/vocab-dcat-2/#Class:Period_of_Time) and four new properties ([`dcat:startDate`](https://www.w3.org/TR/vocab-dcat-2/#Property:period_start_date), [`dcat:endDate`](https://www.w3.org/TR/vocab-dcat-2/#Property:period_end_date), [`time:hasBeginning`](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_beginning), [`time:hasEnd`](https://www.w3.org/TR/vocab-dcat-2/#Property:period_has_end)) added to support description of a temporal interval, to be used for specifying the temporal coverage of a resource. See [Issue #85](https://github.com/w3c/dxwg/issues/85).
-   The global range of the property [`dcat:themeTaxonomy`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_themes) relaxed to allow linking to a taxonomy that is not formalized as a `skos:ConceptScheme`. See [Issue #119](https://github.com/w3c/dxwg/issues/119).
-   A new property [`dcat:spatialResolutionInMeters`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_spatial_resolution) added to support description of the spatial resolution of datasets and distributions. See [Issue #84](https://github.com/w3c/dxwg/issues/84).
-   A new property [`dcat:temporalResolution`](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_temporal_resolution) added to support description of the temporal resolution of datasets and distributions. See [Issue #84](https://github.com/w3c/dxwg/issues/84).
-   Two new properties, [`dcat:packageFormat`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_packaging_format) and [`dcat:compressFormat`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_compression_format), were added to specify packaged and compressed distributions, respectively. See [Issue #54](https://github.com/w3c/dxwg/issues/54).
-   A new section [§ 13.2 Relationships between datasets and other resources](https://www.w3.org/TR/vocab-dcat-2/#qualified-relationship), a new property [`dcat:qualifiedRelation`](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_qualified_relation) and a new class [`dcat:Relationship`](https://www.w3.org/TR/vocab-dcat-2/#Class:Relationship) added to support relationships between datasets or other resources. See [Issue #79](https://github.com/w3c/dxwg/issues/79).
-   A new section [§ 7\. Dereferenceable identifiers](https://www.w3.org/TR/vocab-dcat-2/#dereferenceable-identifiers) was added to describe how to indicate different types of identifiers by using \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] and \[[VOCAB-ADMS](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-adms "Asset Description Metadata Schema (ADMS)")\]. See [Issue #53](https://github.com/w3c/dxwg/issues/53) and [Issue #68](https://github.com/w3c/dxwg/issues/68).
-   A new section [§ 13.1 Relationships between datasets and agents](https://www.w3.org/TR/vocab-dcat-2/#qualified-attribution) was added to recommend a pattern for assigning an agent to a cataloged resource with a qualified relationship. See [Issue #79](https://github.com/w3c/dxwg/issues/79).
-   [Property: had role](https://www.w3.org/TR/vocab-dcat-2/#Property:relationship_hadRole): The property `dcat:hadRole` is added to support the use of [`prov:qualifiedAttribution`](https://www.w3.org/TR/prov-o/#qualifiedAttribution) to associate an agent with a resource, where the role of the agent with relation to the resource is specified, and is something other than the standard \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\] roles: creator, publisher or contributor. See [Issue #79](https://github.com/w3c/dxwg/issues/79)
-   [Property: resource creator](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_creator): The property `dct:creator` is recommended for use in the context of a dataset or other resource to allow the entity responsible for generating the resource to be recorded. See [Issue #61](https://github.com/w3c/dxwg/issues/61)
-   [Property: was generated by](https://www.w3.org/TR/vocab-dcat-2/#Property:dataset_was_generated_by): The property `prov:wasGeneratedBy` is recommended for use in the context of a dataset to allow the provenance or business context to be recorded. See [Issue #71](https://github.com/w3c/dxwg/issues/71)
-   [Property: resource relation](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_relation): The property `dct:relation` is recommended for use in the context of a cataloged resource to capture general relationships, including the case where the package of resources associated with a cataloged item includes a mixture of representations, parts, documentation and other elements which are not strictly 'distributions' of a dataset - see [Issue #253](https://github.com/w3c/dxwg/issues/253). The more general use of `dct:relation` is driven by the requirement documented in [Issue #81](https://github.com/w3c/dxwg/issues/81).
-   [Property: media type](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_media_type): The range of `dcat:mediaType` has been tightened from `dct:MediaTypeOrExtent` to `dct:MediaType`. See [Issue #127](https://github.com/w3c/dxwg/issues/127).
-   [Property: conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_conforms_to): The property `dct:conformsTo` is recommended for use in the context of a `dcat:Distribution` to allow the model or schema used for the representation to be indicated as well as the serialization (which is indicated using `dct:format` and `dcat:mediaType`). See [Issue #55](https://github.com/w3c/dxwg/issues/55).
-   Errors in examples of [`dcat:mediaType`](https://www.w3.org/TR/vocab-dcat-2/#Property:distribution_media_type) usage fixed. See [Issue #170](https://github.com/w3c/dxwg/issues/170).
-   A new section [§ 12\. Quality information](https://www.w3.org/TR/vocab-dcat-2/#quality-information) was added to provie recommendations for how to associate quality information to datasets using elements from the W3C DQV vocabulary \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\]. Since \[[VOCAB-DQV](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dqv "Data on the Web Best Practices: Data Quality Vocabulary")\] is not a rec-track document, these are non-normative. See [Issue #57](https://github.com/w3c/dxwg/issues/57) and [Issue #58](https://github.com/w3c/dxwg/issues/58).
-   [Class: Cataloged resource](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource): In DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] the scope of a [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) was limited to datasets. This has been generalized, and properties common to all cataloged resources are now associated with a super-class [`dcat:Resource`](https://www.w3.org/TR/vocab-dcat-2/#Class:Resource). See [Issue #172](https://github.com/w3c/dxwg/issues/172) and [Issue #116](https://github.com/w3c/dxwg/issues/116).
-   [Class: Data service](https://www.w3.org/TR/vocab-dcat-2/#Class:Data_Service): In DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] the scope of a [`dcat:Catalog`](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog) was limited to datasets. The new class `dcat:DataService` has been added to support cataloging of various kinds of data services. See [Issue #172](https://github.com/w3c/dxwg/issues/172), [Issue #56](https://github.com/w3c/dxwg/issues/56), [Issue #432](https://github.com/w3c/dxwg/issues/432), [Issue #821](https://github.com/w3c/dxwg/issues/821).
-   [Class: Dataset](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset): In DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] [`dcat:Dataset`](https://www.w3.org/TR/vocab-dcat-2/#Class:Dataset) was a sub-class of [`dctype:Dataset`](http://purl.org/dc/dcmitype/Dataset), which is a term of the [DCMI Types vocabulary](http://dublincore.org/documents/dcmi-terms/#section-7) \[[DCTERMS](https://www.w3.org/TR/vocab-dcat-2/#bib-dcterms "DCMI Metadata Terms")\]. This relationship has been removed in the revised DCAT vocabulary. See [Issue #98](https://github.com/w3c/dxwg/issues/98).
-   [Class: Distribution](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution): In DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] the definition of a [`dcat:Distribution`](https://www.w3.org/TR/vocab-dcat-2/#Class:Distribution) allowed a number of alternative interpretations. The definition has been rephrased to clarify that distributions are primarily _representations_ of datasets. See [Issue #52](https://github.com/w3c/dxwg/issues/172) and related use cases.
-   [Property: theme/category](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_theme): In DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] the domain of `dcat:theme` was `dcat:Dataset`, which limited use of this property in other contexts. The domain has been relaxed in this revision. See [Issue #123](https://github.com/w3c/dxwg/issues/123).
-   [Property: type/genre](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_type): Added in DCAT revision. See [Issue #64](https://github.com/w3c/dxwg/issues/64), with examples of usage in overview section.
-   [Property: keyword/tag](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_keyword): In DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] the domain of `dcat:keyword` was `dcat:Dataset`, which limited use of this property in other contexts. The domain has been relaxed in this revision. See [Issue #121](https://github.com/w3c/dxwg/issues/121).
-   [Property: contact point](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_contact_point): In DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] the domain of `dcat:contactPoint` was `dcat:Dataset`, which limited use of this property in other contexts. The domain has been relaxed in this revision. See [Issue #95](https://github.com/w3c/dxwg/issues/95).
-   [Property: landing page](https://www.w3.org/TR/vocab-dcat-2/#Property:resource_landing_page): In DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] the domain of `dcat:landingPage` was `dcat:Dataset`, which limited use of this property in other contexts. The domain has been relaxed in this revision. See [Issue #122](https://github.com/w3c/dxwg/issues/122).
-   [Property: `vann:usageNote`](http://vocab.org/vann/#usageNote): DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] included documentation captured as text using [`vann:usageNote`](http://vocab.org/vann/#usageNote) elements, which is a sub-property of `rdfs:seeAlso` - an `owl:ObjectProperty` that cannot have a Literal value. This revision of DCAT has fixed these issues and replaced the use of `vann:usageNote` with [`skos:scopeNote`](https://www.w3.org/TR/skos-primer/#secdocumentation). See [Issue #233](https://github.com/w3c/dxwg/issues/233).
-   [Property: conforms to](https://www.w3.org/TR/vocab-dcat-2/#Property:record_conforms_to): DCAT 2014 \[[VOCAB-DCAT-20140116](https://www.w3.org/TR/vocab-dcat-2/#bib-vocab-dcat-20140116 "Data Catalog Vocabulary (DCAT)")\] had no way of representing the conformance of a record metadata with a metadata standard. This revision has added the property `dct:conformsTo` for `dcat:CatalogRecord` to cover this requirement. See [Issue #502](https://github.com/w3c/dxwg/issues/502).
-   Each relevant class section was extended with properties to deal with licensing, access rights, other rights and policies associated with the classes, as recommended in [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights).
-   A new section [§ 8\. License and rights statements](https://www.w3.org/TR/vocab-dcat-2/#license-rights) was added to provide guidance and recommendations for the use of [`dct:license`](http://dublincore.org/documents/dcmi-terms/#terms-license), [`dct:accessRights`](http://dublincore.org/documents/dcmi-terms/#terms-accessRights), and [`dct:rights`](http://dublincore.org/documents/dcmi-terms/#terms-rights) in the context of dcat catalogs and distributions. See [Issue #114](https://github.com/w3c/dxwg/issues/114) for the background discussion.
-   [Class: Catalog](https://www.w3.org/TR/vocab-dcat-2/#Class:Catalog): This class has been made a sub-class of `dcat:Dataset`. Moreover, the following properties have been added: [`dct:hasPart`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_has_part), to specify a cataloged resource, irrespective of its type; [`dcat:service`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_service), to specify a cataloged data service; [`dcat:catalog`](https://www.w3.org/TR/vocab-dcat-2/#Property:catalog_catalog), to specify sub-catalogs. See [Issue #172](https://github.com/w3c/dxwg/issues/172).
    

## E. References[](https://www.w3.org/TR/vocab-dcat-2/#references)

### E.1 Normative references[](https://www.w3.org/TR/vocab-dcat-2/#normative-references)

\[DC11\]

[Dublin Core Metadata Element Set, Version 1.1](http://dublincore.org/documents/dces/). DCMI. 14 June 2012. DCMI Recommendation. URL: [http://dublincore.org/documents/dces/](http://dublincore.org/documents/dces/)

\[DCTERMS\]

[DCMI Metadata Terms](http://dublincore.org/documents/dcmi-terms/). DCMI Usage Board. DCMI. 14 June 2012. DCMI Recommendation. URL: [http://dublincore.org/documents/dcmi-terms/](http://dublincore.org/documents/dcmi-terms/)

\[FOAF\]

[FOAF Vocabulary Specification 0.99 (Paddington Edition)](http://xmlns.com/foaf/spec). Dan Brickley; Libby Miller. FOAF project. 14 January 2014. URL: [http://xmlns.com/foaf/spec](http://xmlns.com/foaf/spec)

\[GeoSPARQL\]

[GeoSPARQL - A Geographic Query Language for RDF Data](http://www.opengeospatial.org/standards/geosparql). Matthew Perry; John Herring. OGC. 10 September 2012. URL: [http://www.opengeospatial.org/standards/geosparql](http://www.opengeospatial.org/standards/geosparql)

\[IANA-MEDIA-TYPES\]

[Media Types](https://www.iana.org/assignments/media-types/). IANA. URL: [https://www.iana.org/assignments/media-types/](https://www.iana.org/assignments/media-types/)

\[LOCN\]

[ISA Programme Location Core Vocabulary](https://www.w3.org/ns/locn). Andrea Perego; Michael Lutz. European Commission. 23 March 2015. Second version in w3.org/ns space. URL: [http://www.w3.org/ns/locn](https://www.w3.org/ns/locn)

\[ODRL-MODEL\]

[ODRL Information Model 2.2](https://www.w3.org/TR/odrl-model/). Renato Iannella; Serena Villata. W3C. 15 February 2018. W3C Recommendation. URL: [https://www.w3.org/TR/odrl-model/](https://www.w3.org/TR/odrl-model/)

\[ODRL-VOCAB\]

[ODRL Vocabulary & Expression 2.2](https://www.w3.org/TR/odrl-vocab/). Renato Iannella; Michael Steidl; Stuart Myles; Víctor Rodríguez-Doncel. W3C. 15 February 2018. W3C Recommendation. URL: [https://www.w3.org/TR/odrl-vocab/](https://www.w3.org/TR/odrl-vocab/)

\[OWL-TIME\]

[Time Ontology in OWL](https://www.w3.org/TR/owl-time/). Simon Cox; Chris Little. W3C. 19 October 2017. W3C Recommendation. URL: [https://www.w3.org/TR/owl-time/](https://www.w3.org/TR/owl-time/)

\[OWL2-OVERVIEW\]

[OWL 2 Web Ontology Language Document Overview (Second Edition)](https://www.w3.org/TR/owl2-overview/). W3C OWL Working Group. W3C. 11 December 2012. W3C Recommendation. URL: [https://www.w3.org/TR/owl2-overview/](https://www.w3.org/TR/owl2-overview/)

\[PROV-O\]

[PROV-O: The PROV Ontology](https://www.w3.org/TR/prov-o/). Timothy Lebo; Satya Sahoo; Deborah McGuinness. W3C. 30 April 2013. W3C Recommendation. URL: [https://www.w3.org/TR/prov-o/](https://www.w3.org/TR/prov-o/)

\[RDF-SCHEMA\]

[RDF Schema 1.1](https://www.w3.org/TR/rdf-schema/). Dan Brickley; Ramanathan Guha. W3C. 25 February 2014. W3C Recommendation. URL: [https://www.w3.org/TR/rdf-schema/](https://www.w3.org/TR/rdf-schema/)

\[RFC2119\]

[Key words for use in RFCs to Indicate Requirement Levels](https://tools.ietf.org/html/rfc2119). S. Bradner. IETF. March 1997. Best Current Practice. URL: [https://tools.ietf.org/html/rfc2119](https://tools.ietf.org/html/rfc2119)

\[RFC8174\]

[Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words](https://tools.ietf.org/html/rfc8174). B. Leiba. IETF. May 2017. Best Current Practice. URL: [https://tools.ietf.org/html/rfc8174](https://tools.ietf.org/html/rfc8174)

\[SKOS-REFERENCE\]

[SKOS Simple Knowledge Organization System Reference](https://www.w3.org/TR/skos-reference/). Alistair Miles; Sean Bechhofer. W3C. 18 August 2009. W3C Recommendation. URL: [https://www.w3.org/TR/skos-reference/](https://www.w3.org/TR/skos-reference/)

\[XMLSCHEMA11-2\]

[W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes](https://www.w3.org/TR/xmlschema11-2/). David Peterson; Sandy Gao; Ashok Malhotra; Michael Sperberg-McQueen; Henry Thompson; Paul V. Biron et al. W3C. 5 April 2012. W3C Recommendation. URL: [https://www.w3.org/TR/xmlschema11-2/](https://www.w3.org/TR/xmlschema11-2/)

### E.2 Informative references[](https://www.w3.org/TR/vocab-dcat-2/#informative-references)

\[DataCite\]

[DataCite Metadata Schema](https://schema.datacite.org/). DataCite Metadata Working Group. DataCite e.V. 16 August 2019. URL: [https://schema.datacite.org/](https://schema.datacite.org/)

\[DATETIME\]

[Date and Time Formats](https://www.w3.org/TR/NOTE-datetime). W3C. 27 August 1998. W3C Note. URL: [https://www.w3.org/TR/NOTE-datetime](https://www.w3.org/TR/NOTE-datetime)

\[DATS\]

[Data Tag Suite](https://datatagsuite.github.io/docs/html/). Alejandra Gonzalez-Beltran; Philippe Rocca-Serra. NIH Big Data 2 Knowledge bioCADDIE and NIH Data Commons projects. 2016. URL: [https://datatagsuite.github.io/docs/html/](https://datatagsuite.github.io/docs/html/)

\[DBPEDIA-ONT\]

[DBPedia ontology](http://dbpedia.org/ontology/). URL: [http://dbpedia.org/ontology/](http://dbpedia.org/ontology/)

\[DCAP\]

[Guidelines for Dublin Core Application Profiles](http://dublincore.org/documents/profile-guidelines/). Karen Coyle; Thomas Baker. DCMI. 18 May 2009. DCMI Recommended Resource. URL: [http://dublincore.org/documents/profile-guidelines/](http://dublincore.org/documents/profile-guidelines/)

\[DCAT-AP\]

[DCAT Application Profile for data portals in Europe. Version 1.2.1](https://joinup.ec.europa.eu/solution/dcat-application-profile-data-portals-europe). European Commission. 28 May 2019. URL: [https://joinup.ec.europa.eu/solution/dcat-application-profile-data-portals-europe](https://joinup.ec.europa.eu/solution/dcat-application-profile-data-portals-europe)

\[DCAT-AP-IT\]

[Profilo metadatazione DCAT-AP\_IT](https://docs.italia.it/italia/daf/linee-guida-cataloghi-dati-dcat-ap-it/it/stabile/dcat-ap_it.html). AgID & Team Digitale. URL: [https://docs.italia.it/italia/daf/linee-guida-cataloghi-dati-dcat-ap-it/it/stabile/dcat-ap\_it.html](https://docs.italia.it/italia/daf/linee-guida-cataloghi-dati-dcat-ap-it/it/stabile/dcat-ap_it.html)

\[DCAT-AP-NO\]

[Standard for beskrivelse av datasett og datakataloger (DCAT-AP-NO)](https://doc.difi.no/dcat-ap-no/). URL: [https://doc.difi.no/dcat-ap-no/](https://doc.difi.no/dcat-ap-no/)

\[DCAT-AP-SE\]

[DCAT-AP-SE: Swedish recommendation for DCAT-AP1.1](https://lankadedata.se/spec/DCAT-AP-SE). Matthias Palmér. URL: [https://lankadedata.se/spec/DCAT-AP-SE](https://lankadedata.se/spec/DCAT-AP-SE)

\[DCAT-AP.de\]

[Vokabulare und Dokumente für DCAT-AP.de](https://dcat-ap.de/def/). URL: [https://dcat-ap.de/def/](https://dcat-ap.de/def/)

\[DCAT-BE\]

[Linking data portals across Belgium.](http://dcat.be/). URL: [http://dcat.be/](http://dcat.be/)

\[DCAT-UCR\]

[Dataset Exchange Use Cases and Requirements](https://www.w3.org/TR/dcat-ucr/). Jaroslav Pullmann; Rob Atkinson; Antoine Isaac; Ixchel Faniel. W3C. 17 January 2019. W3C Note. URL: [https://www.w3.org/TR/dcat-ucr/](https://www.w3.org/TR/dcat-ucr/)

\[DOAP\]

[Description of a Project](https://github.com/ewilderj/doap/wiki). Edd Wilder-James. URL: [https://github.com/ewilderj/doap/wiki](https://github.com/ewilderj/doap/wiki)

\[DWBP\]

[Data on the Web Best Practices](https://www.w3.org/TR/dwbp/). Bernadette Farias Loscio; Caroline Burle; Newton Calegari. W3C. 31 January 2017. W3C Recommendation. URL: [https://www.w3.org/TR/dwbp/](https://www.w3.org/TR/dwbp/)

\[EARL10-Schema\]

[Evaluation and Report Language (EARL) 1.0 Schema](https://www.w3.org/TR/EARL10-Schema/). Shadi Abou-Zahra. W3C. 2 February 2017. W3C Note. URL: [https://www.w3.org/TR/EARL10-Schema/](https://www.w3.org/TR/EARL10-Schema/)

\[FAIR\]

[The FAIR Guiding Principles for scientific data management and stewardship](https://doi.org/10.1038/sdata.2016.18). Mark D. Wilkinson et al. Nature. Scientific Data, vol. 3, Article nr. 160018. URL: [https://doi.org/10.1038/sdata.2016.18](https://doi.org/10.1038/sdata.2016.18)

\[GeoDCAT-AP\]

[GeoDCAT-AP: A geospatial extension for the DCAT application profile for data portals in Europe. Version 1.0.1](https://joinup.ec.europa.eu/solution/geodcat-application-profile-data-portals-europe). European Commission. 2 August 2016. URL: [https://joinup.ec.europa.eu/solution/geodcat-application-profile-data-portals-europe](https://joinup.ec.europa.eu/solution/geodcat-application-profile-data-portals-europe)

\[GeoDCAT-AP-IT\]

[GeoDCAT-AP in Italy, the national guidelines published](https://joinup.ec.europa.eu/news/geodcat-apit). URL: [https://joinup.ec.europa.eu/news/geodcat-apit](https://joinup.ec.europa.eu/news/geodcat-apit)

\[HCLS-Dataset\]

[Dataset Descriptions: HCLS Community Profile](https://www.w3.org/TR/hcls-dataset/). Alasdair Gray; M. Scott Marshall; Michel Dumontier. W3C. 14 May 2015. W3C Note. URL: [https://www.w3.org/TR/hcls-dataset/](https://www.w3.org/TR/hcls-dataset/)

\[HTML-RDFa\]

[HTML+RDFa 1.1 - Second Edition](https://www.w3.org/TR/html-rdfa/). Manu Sporny. W3C. 17 March 2015. W3C Recommendation. URL: [https://www.w3.org/TR/html-rdfa/](https://www.w3.org/TR/html-rdfa/)

\[HYDRA\]

[Hydra Core Vocabulary](https://www.hydra-cg.com/spec/latest/core/). Markus Lanthaler. Hydra W3C Community Group. 15 March 2018. Unofficial Draft. URL: [https://www.hydra-cg.com/spec/latest/core/](https://www.hydra-cg.com/spec/latest/core/)

\[IANA-RELATIONS\]

[Link Relations](https://www.iana.org/assignments/link-relations/). IANA. URL: [https://www.iana.org/assignments/link-relations/](https://www.iana.org/assignments/link-relations/)

\[IANA-URI-SCHEMES\]

[Uniform Resource Identifier (URI) Schemes](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml). IANA. URL: [https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)

\[INSPIRE-DoC\]

[INSPIRE Registry: Degrees of conformity](http://inspire.ec.europa.eu/metadata-codelist/DegreeOfConformity/). European Commission. URL: [http://inspire.ec.europa.eu/metadata-codelist/DegreeOfConformity/](http://inspire.ec.europa.eu/metadata-codelist/DegreeOfConformity/)

\[INSPIRE-SDST\]

[INSPIRE Registry: Spatial data service types](http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceType/). European Commission. URL: [http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceType/](http://inspire.ec.europa.eu/metadata-codelist/SpatialDataServiceType/)

\[IRI\]

[Internationalized Resource Identifiers (IRIs)](https://tools.ietf.org/html/rfc3987). M. Duerst; M. Suignard. IETF. January 2005. Proposed Standard. URL: [https://tools.ietf.org/html/rfc3987](https://tools.ietf.org/html/rfc3987)

\[ISO-19115\]

[Geographic information -- Metadata](https://www.iso.org/standard/26020.html). ISO/TC 211. ISO. 2003. International Standard. URL: [https://www.iso.org/standard/26020.html](https://www.iso.org/standard/26020.html)

\[ISO-19115-1\]

[Geographic information -- Metadata -- Part 1: Fundamentals](https://www.iso.org/standard/53798.html). ISO/TC 211. ISO. 2014. International Standard. URL: [https://www.iso.org/standard/53798.html](https://www.iso.org/standard/53798.html)

\[ISO-19128\]

[Geographic information -- Web map server interface](https://www.iso.org/standard/32546.html). ISO/TC 211. ISO. 2005. International Standard. URL: [https://www.iso.org/standard/32546.html](https://www.iso.org/standard/32546.html)

\[ISO-19142\]

[Geographic information -- Web Feature Service](https://www.iso.org/standard/42136.html). ISO/TC 211. ISO. 2010. International Standard. URL: [https://www.iso.org/standard/42136.html](https://www.iso.org/standard/42136.html)

\[ISO-26324\]

[Information and documentation -- Digital object identifier system](https://www.iso.org/standard/43506.html). ISO/TC 46/SC 9. ISO. 2012. International Standard. URL: [https://www.iso.org/standard/43506.html](https://www.iso.org/standard/43506.html)

\[ISO-IEC-25012\]

[ISO/IEC 25012 - Data Quality model](http://iso25000.com/index.php/en/iso-25000-standards/iso-25012). URL: [http://iso25000.com/index.php/en/iso-25000-standards/iso-25012](http://iso25000.com/index.php/en/iso-25000-standards/iso-25012)

\[JSON-LD\]

[JSON-LD 1.0](https://www.w3.org/TR/json-ld/). Manu Sporny; Gregg Kellogg; Markus Lanthaler. W3C. 16 January 2014. W3C Recommendation. URL: [https://www.w3.org/TR/json-ld/](https://www.w3.org/TR/json-ld/)

\[LinkedDataPatterns\]

[Linked Data Patterns: A pattern catalogue for modelling, publishing, and consuming Linked Data](http://patterns.dataincubator.org/book/). Leigh Dodds; Ian Davis. 31 May 2012. URL: [http://patterns.dataincubator.org/book/](http://patterns.dataincubator.org/book/)

\[MDR-AR\]

[Named Authority List: Access rights](https://publications.europa.eu/en/web/eu-vocabularies/at-dataset/-/resource/dataset/access-right). Publications Office of the European Union. URL: [https://publications.europa.eu/en/web/eu-vocabularies/at-dataset/-/resource/dataset/access-right](https://publications.europa.eu/en/web/eu-vocabularies/at-dataset/-/resource/dataset/access-right)

\[N3\]

[Notation3 (N3): A readable RDF syntax](https://www.w3.org/TeamSubmission/2008/SUBM-n3-20080114/). Tim Berners-Lee; Dan Connolly. W3C. 14 January 2008. W3C Team Submission. URL: [https://www.w3.org/TeamSubmission/2008/SUBM-n3-20080114/](https://www.w3.org/TeamSubmission/2008/SUBM-n3-20080114/)

\[netCDF\]

[Network Common Data Form (NetCDF)](https://www.unidata.ucar.edu/software/netcdf/). UNIDATA. URL: [https://www.unidata.ucar.edu/software/netcdf/](https://www.unidata.ucar.edu/software/netcdf/)

\[ODRS\]

[Open Data Rights Statement Vocabulary](http://schema.theodi.org/odrs). Leigh Dodds. ODI. 29 July 2013. URL: [http://schema.theodi.org/odrs](http://schema.theodi.org/odrs)

\[OpenAPI\]

[OpenAPI Specification](https://www.openapis.org/). Darrell Miller; Jeremy Whitlock; Marsh Gardiner; Mike Ralphson; Ron Ratovsky; Uri Sarid; Tony Tam; Jason Harmon. OpenAPI Initiative. URL: [https://www.openapis.org/](https://www.openapis.org/)

\[OpenSearch\]

[OpenSearch 1.1 Draft 6](https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md). DeWitt Clinton. OpenSearch. 17 April 2018. URL: [https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md](https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md)

\[OWL2-SYNTAX\]

[OWL 2 Web Ontology Language Structural Specification and Functional-Style Syntax (Second Edition)](https://www.w3.org/TR/owl2-syntax/). Boris Motik; Peter Patel-Schneider; Bijan Parsia. W3C. 11 December 2012. W3C Recommendation. URL: [https://www.w3.org/TR/owl2-syntax/](https://www.w3.org/TR/owl2-syntax/)

\[RDF-SYNTAX-GRAMMAR\]

[RDF 1.1 XML Syntax](https://www.w3.org/TR/rdf-syntax-grammar/). Dave Beckett. W3C. 25 February 2014. W3C Recommendation. URL: [https://www.w3.org/TR/rdf-syntax-grammar/](https://www.w3.org/TR/rdf-syntax-grammar/)

\[RDF11-CONCEPTS\]

[RDF 1.1 Concepts and Abstract Syntax](https://www.w3.org/TR/rdf11-concepts/). Richard Cyganiak; David Wood; Markus Lanthaler. W3C. 25 February 2014. W3C Recommendation. URL: [https://www.w3.org/TR/rdf11-concepts/](https://www.w3.org/TR/rdf11-concepts/)

\[RDF11-PRIMER\]

[RDF 1.1 Primer](https://www.w3.org/TR/rdf11-primer/). Guus Schreiber; Yves Raimond. W3C. 24 June 2014. W3C Note. URL: [https://www.w3.org/TR/rdf11-primer/](https://www.w3.org/TR/rdf11-primer/)

\[RE3DATA-SCHEMA\]

[Metadata Schema for the Description of Research Data Repositories: version 3](https://doi.org/10.2312/re3.008). Jessika Rücknagel et al. GFZ Potsdam. 17 December 2015. URL: [https://doi.org/10.2312/re3.008](https://doi.org/10.2312/re3.008)

\[RFC3986\]

[Uniform Resource Identifier (URI): Generic Syntax](https://tools.ietf.org/html/rfc3986). T. Berners-Lee; R. Fielding; L. Masinter. IETF. January 2005. Internet Standard. URL: [https://tools.ietf.org/html/rfc3986](https://tools.ietf.org/html/rfc3986)

\[SCHEMA-ORG\]

[Schema.org](https://schema.org/). URL: [https://schema.org/](https://schema.org/)

\[SDW-BP\]

[Spatial Data on the Web Best Practices](https://www.w3.org/TR/sdw-bp/). Jeremy Tandy; Linda van den Brink; Payam Barnaghi. W3C. 28 September 2017. W3C Note. URL: [https://www.w3.org/TR/sdw-bp/](https://www.w3.org/TR/sdw-bp/)

\[SHACL\]

[Shapes Constraint Language (SHACL)](https://www.w3.org/TR/shacl/). Holger Knublauch; Dimitris Kontokostas. W3C. 20 July 2017. W3C Recommendation. URL: [https://www.w3.org/TR/shacl/](https://www.w3.org/TR/shacl/)

\[ShEx\]

[Shape Expressions Language 2.1](http://shex.io/shex-semantics/). Shape Expressions W3C Community Group. 17 November 2018. Draft Community Group Report. URL: [http://shex.io/shex-semantics/](http://shex.io/shex-semantics/)

\[SPARQL11-QUERY\]

[SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/). Steven Harris; Andy Seaborne. W3C. 21 March 2013. W3C Recommendation. URL: [https://www.w3.org/TR/sparql11-query/](https://www.w3.org/TR/sparql11-query/)

\[SPARQL11-SERVICE-DESCRIPTION\]

[SPARQL 1.1 Service Description](https://www.w3.org/TR/sparql11-service-description/). Gregory Williams. W3C. 21 March 2013. W3C Recommendation. URL: [https://www.w3.org/TR/sparql11-service-description/](https://www.w3.org/TR/sparql11-service-description/)

\[StatDCAT-AP\]

[StatDCAT-AP – DCAT Application Profile for description of statistical datasets. Version 1.0.1](https://joinup.ec.europa.eu/solution/statdcat-application-profile-data-portals-europe). European Commission. 28 May 2019. URL: [https://joinup.ec.europa.eu/solution/statdcat-application-profile-data-portals-europe](https://joinup.ec.europa.eu/solution/statdcat-application-profile-data-portals-europe)

\[Turtle\]

[RDF 1.1 Turtle](https://www.w3.org/TR/turtle/). Eric Prud'hommeaux; Gavin Carothers. W3C. 25 February 2014. W3C Recommendation. URL: [https://www.w3.org/TR/turtle/](https://www.w3.org/TR/turtle/)

\[VCARD-RDF\]

[vCard Ontology - for describing People and Organizations](https://www.w3.org/TR/vcard-rdf/). Renato Iannella; James McKinney. W3C. 22 May 2014. W3C Note. URL: [https://www.w3.org/TR/vcard-rdf/](https://www.w3.org/TR/vcard-rdf/)

\[VIVO-ISF\]

[VIVO-ISF Data Standard](https://github.com/vivo-isf/vivo-isf). URL: [https://github.com/vivo-isf/vivo-isf](https://github.com/vivo-isf/vivo-isf)

\[VOCAB-ADMS\]

[Asset Description Metadata Schema (ADMS)](https://www.w3.org/TR/vocab-adms/). Phil Archer; Gofran Shukair. W3C. 1 August 2013. W3C Note. URL: [https://www.w3.org/TR/vocab-adms/](https://www.w3.org/TR/vocab-adms/)

\[VOCAB-DATA-CUBE\]

[The RDF Data Cube Vocabulary](https://www.w3.org/TR/vocab-data-cube/). Richard Cyganiak; Dave Reynolds. W3C. 16 January 2014. W3C Recommendation. URL: [https://www.w3.org/TR/vocab-data-cube/](https://www.w3.org/TR/vocab-data-cube/)

\[VOCAB-DCAT-20140116\]

[Data Catalog Vocabulary (DCAT)](https://www.w3.org/TR/2014/REC-vocab-dcat-20140116/). Fadi Maali; John Erickson. W3C. 16 January 2014. W3C Recommendation. URL: [https://www.w3.org/TR/2014/REC-vocab-dcat-20140116/](https://www.w3.org/TR/2014/REC-vocab-dcat-20140116/)

\[VOCAB-DQV\]

[Data on the Web Best Practices: Data Quality Vocabulary](https://www.w3.org/TR/vocab-dqv/). Riccardo Albertoni; Antoine Isaac. W3C. 15 December 2016. W3C Note. URL: [https://www.w3.org/TR/vocab-dqv/](https://www.w3.org/TR/vocab-dqv/)

\[VOCAB-ORG\]

[The Organization Ontology](https://www.w3.org/TR/vocab-org/). Dave Reynolds. W3C. 16 January 2014. W3C Recommendation. URL: [https://www.w3.org/TR/vocab-org/](https://www.w3.org/TR/vocab-org/)

\[VOCAB-SSN\]

[Semantic Sensor Network Ontology](https://www.w3.org/TR/vocab-ssn/). Armin Haller; Krzysztof Janowicz; Simon Cox; Danh Le Phuoc; Kerry Taylor; Maxime Lefrançois. W3C. 19 October 2017. W3C Recommendation. URL: [https://www.w3.org/TR/vocab-ssn/](https://www.w3.org/TR/vocab-ssn/)

\[VOID\]

[Describing Linked Datasets with the VoID Vocabulary](https://www.w3.org/TR/void/). Keith Alexander; Richard Cyganiak; Michael Hausenblas; Jun Zhao. W3C. 3 March 2011. W3C Note. URL: [https://www.w3.org/TR/void/](https://www.w3.org/TR/void/)

\[W3C-BASIC-GEO\]

[Basic Geo (WGS84 lat/long) Vocabulary](https://www.w3.org/2003/01/geo/). Dan Brickley. W3C Semantic Web Interest Group. 1 February 2006. URL: [https://www.w3.org/2003/01/geo/](https://www.w3.org/2003/01/geo/)

\[WFS\]

[Web Feature Service 2.0 Interface Standard](http://www.opengeospatial.org/standards/wfs). Panagiotis (Peter) A. Vretanos. OGC. 10 July 2014. OGC Interface Standard. URL: [http://www.opengeospatial.org/standards/wfs](http://www.opengeospatial.org/standards/wfs)

\[WMS\]

[Web Map Service Implementation Specification](http://www.opengeospatial.org/standards/wms). Jeff de la Beaujardiere. OGC. 15 March 2006. OpenGIS Implementation Standard. URL: [http://www.opengeospatial.org/standards/wms](http://www.opengeospatial.org/standards/wms)

\[WSDL20\]

[Web Services Description Language (WSDL) Version 2.0 Part 1: Core Language](https://www.w3.org/TR/wsdl20/). Roberto Chinnici; Jean-Jacques Moreau; Arthur Ryman; Sanjiva Weerawarana et al. W3C. 26 June 2007. W3C Recommendation. URL: [https://www.w3.org/TR/wsdl20/](https://www.w3.org/TR/wsdl20/)

\[ZaveriEtAl\]

[Quality assessment for Linked Data: A Survey](https://doi.org/10.3233/SW-150175). Amrapali Zaveri et al. IOS Press. 2015. Semantic Web, vol. 7, no. 1, pp. 63-93. URL: [https://doi.org/10.3233/SW-150175](https://doi.org/10.3233/SW-150175)