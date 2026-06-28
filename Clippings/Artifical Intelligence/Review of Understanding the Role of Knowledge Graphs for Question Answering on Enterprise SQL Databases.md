---
type: Research Clipping
title: "Review of Understanding the Role of Knowledge Graphs for Question Answering on Enterprise SQL Databases"
description: "Thesis -"
timestamp: 2026-06-26T19:19:05Z
---

Thesis - 

This is a review of the paper titled [A Benchmark to Understanding the Role of Knowledge Graphs for Question Answering on Enterprise SQL Databases.](Understanding the Role of Knowledge Graphs for Question Answering on Enterprise SQL Databases)

Initial assumptions about the real-world assumptions for SQL databases:
1. Large scale enterprise applications are large and complicated
2. There is no ability to link to a measurement framework related to the OKR and KPI
3. There is a business context layer that is missing that provides both the semantics for the  [[MAD Business Domains]] that we are trying to model.

There is an interesting assessment that uses insurance SQL Schema from the [OMG Property and Casualty Data Model](https://www.omg.org/spec/PC/1.0/About-PC) combined with a series of enterprise questions that fall into the following 2x2 Matrix. The results from running the query are as follows:

|                   | Low Schema    | High Schema |
| ----------------- | ------------- | ----------- |
| **High Question** | 37.4% - 66.9% | 0% - 35.7%  |
| **Low Question**  | 25.4% - 71.1% | 0% - 38.7%  |
There's two big efforts that need to be completed in order to be able to complete this modelling:
1. The creation of the domain ontology.
2. Having access to the overall database schema, or possible a sub-set of the overall database in the form of data objects that represent a particular application function's data model.
	1. Infection Abstract (or infection case) - 