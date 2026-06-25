---
author: Emil Eifrem
source: https://youtu.be/knDDGYHnnSI?si=8zzErFWSzNt9lIZd
clipped: 2025-01-03
category: YouTube Video
---
This was a great dissertation on the evolution of the web that was broken down into the following stages:
1. **Full text era (1994 - 2000)** - this is the time of Alta Vista, Yahoo, and Lycos where each site was searched for full text.  As the number of sites exploded and content was generated.
2. **Google PageRank (2000 - 2012)** - Applied a knowlegde graph that used eigen vector weighting to start ranking the pages based on the search terms.
3. **Things, not Strings (2012 - 2024)** -  [[Introducing the Knowledge Graph. Things, not Strings.]] This is evidenced when you do a google search that includes a whole bunch of structured text in a box that allows for the nodes and the 
4. **GraphRAG + LLM (2024 - )** - He then expanded on the recent publications as follows:
	1. [[Review of Understanding the Role of Knowledge Graphs for Question Answering on Enterprise SQL Databases]]
	2. [[RAG with Knowledge Graphs for LinkedIn Customer Service Question Answering]]
	3. GraphRAG: Unlocking LLM discovery on narrative private data (Microsoft) - which has the conclusion that, "By combining LLM-generated graphs and graphs maching learning, GraohRAG enables us to answer important classes of questions that we cannot attempt with baseline RAG alone." This has now been made available as a [Microsoft GraphRAG tool on Github.](https://www.microsoft.com/en-us/research/blog/graphrag-new-tool-for-complex-data-discovery-now-on-github/)

**Thesis** - It's easier to develop using GraphRAG vs. RAG - *once they have pushed through the initial learning curve*! Vector space LLM models are opaque vs. the Knowledge Graph representation.

 There is then an analysis of how knowledge graphs are constructed from different data sources as follows:

|                                                Unstructured Data                                                |                                    Mixture                                    |             Structured Data             |
| :-------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :-------------------------------------: |
| Intrisically hard, yet is the way that the bulk of the Internet and LLM firms are approaching Knowledge Graphs. | good methodology, good tools and the majority of the use cases in enterprises | Good methodology, tools and commonplace |
