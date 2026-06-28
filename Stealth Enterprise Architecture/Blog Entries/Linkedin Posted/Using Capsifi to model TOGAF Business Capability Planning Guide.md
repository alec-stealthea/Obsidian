---
type: Blog Draft
title: "Using Capsifi to model TOGAF Business Capability Planning Guide"
description: "A colleague of mine had the opportunity to witness a Capsifi demonstration at a trade show this past summer."
timestamp: 2026-06-26T19:19:05Z
feature: Capsify Data Model.png
---
A colleague of mine had the opportunity to witness a Capsifi demonstration at a trade show this past summer. Upon seeing the demonstration, he promptly sent me an email stating, 'Capsifi is your spirit animal.' Intrigued, I immediately visited the website to understand what he meant and delved into research about the founder, [Terry Roach](https://www.linkedin.com/in/terryroach/).. I even managed to find and read his PhD thesis before introducing myself on LinkedIn.

As one of the co-authors of [The Open Group](https://www.linkedin.com/groups/1125667/) Architecture Forum's [Business Capability Planning Guide](https://pubs.opengroup.org/togaf-standard/business-architecture/business-capability-planning.html), which was published in April 2023, I inquired about the possibility of using Capsifi to model the content from the guide. Initially, I thought this transition from ArchiMate to a true business modeling application would be straightforward. However, as I delved deeper, I realized that Capsifi offered the potential to create an effective digital twin for an organization.

I had the opportunity to engage in a conversation with Terry, who generously created my own instance of Capsifi for this review. What follows are my findings as I worked on transcribing the Business Capability Planning Guide into Capsifi. Please note that this review represents my independent analysis, separate from my role at my current company or The Open Group.

To challenge myself, I decided to start using Capsifi without referring to tutorials, assessing how intuitive the tool was. With some experience in other modeling tools, I found it relatively easy to navigate. However, I did encounter some challenges, primarily because I needed to review the Capsifi conceptual data model.

  
![](Capsify%20Data%20Model.png)  

Upon reviewing the data model, it became clear that it offered a level of detail that surpassed the focus of the Business Capability Guide. I was able to have a quick review session with a Capsifi analyst for some specific items from the guide I could not locate within Capsifi which helped immensely. While it caters to Enterprise Architects, its emphasis leans heavily towards Business Architecture.

  

Here are my top three findings from using Capsifi for Business Capability Planning:

  

1. **Business Capability Instances**: My most significant discovery was the ability to effectively model business capability instances within the context of value stream stages. Furthermore, adding attributes for current and future states allowed for planning capability increments for value stream enhancements. It even facilitated assessments of capability instance maturity by different individuals at different points in time. While this concept is possible to represent in ArchiMate, Capsifi simplifies this in a way that a modelling language just can't.
2. **Deriving Journey Maps from Value Streams**: The functionality of generating Journey Maps from Value Streams in Capsifi is impressive. In the Business Capability Planning Guide, we demonstrated how Value Streams could be utilized when built out to the business capability instance level, particularly concerning roles assigned to capability instances. Capsifi provides a tight coupling, enabling Journey Map analysis that can be traced back to plan improvements at the business capability instance level.
3. **Enabling Enterprise Agile**: For those exploring Enterprise Agile, especially [Scaled Agile for Enterprises (SAFe)](https://www.linkedin.com/company/scaled-agile-inc-/), Capsifi offers significant advantages. By documenting value streams down to the granularity of business capability instances, it becomes straightforward to create the necessary user stories for individual capability increments. Multiple capability increments across a value stream can be aggregated into an agile Epic and incorporated into release roadmaps for various applications. It also allows for documenting the required skills for a role or any process enhancements associated with the capability increment. It takes requirements traceability to the next level!

  

Given the limited scope of my usage of Capsifi, I acknowledge that I have only scratched the surface. If you are serious about creating a dynamic digital twin of your organization's business model, I encourage you to book a Capsifi demo. Like any enterprise tool, it requires discipline and, to some extent, a foundation to be truly effective. However, having the Capsifi metamodel as a guide can streamline early adoption of business architecture more effectively than attempting to develop your own.

  

**N.B** My review is based on the older version of Capsifi, and the product has since been upgraded with a new user experience and domains.