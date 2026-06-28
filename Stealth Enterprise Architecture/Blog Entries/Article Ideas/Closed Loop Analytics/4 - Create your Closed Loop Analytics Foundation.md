---
type: Blog Draft
title: "4 - Create your Closed Loop Analytics Foundation"
description: "This is a placeholder for the next in the series of Substack articles with the following text that came from the original article."
timestamp: 2026-06-26T19:19:05Z
---

This is a placeholder for the next in the series of Substack articles with the following text that came from the original article.

This first step for your domain is to take the application portfolio that became evident from modelling the business capability instances. The Stealth EA believes that creating the ability for closed loop analytics starts by making the instance of the application's database essentially one of the environments that is used to enhance and maintain your application.

Creating a Data Lake in many analytic practices stop at replicating the application database into an analytic environment and trying to then describe the data structures, apply cleansing, etc to make the data of higher quality.  An application database is (largely) structured for the developer to better manage the user experience and information exchanges required to make the application function.

Replicating data from production applications into a separate analytic environment that is part of the applicaiton's foundational environment design provides a few advantages:
1. **Insurance** - no organization should every be in the situation where the data from an application is unavailable. That might be because that vendor decides to exit the marketplace, it might be the organization's choice to change suppliers for that software. Whatever the reason, having a copy of an application's data independent from the operational data store is a reasonable insurance policy to have in place,
2. **Security** - managing role-based authentication is tough enough for the production application. The number of people who want access to the underlying data becomes even more challenging.  By provisioning application data in the data lake, governance can be established within a common toolset to support audit and logging of who is accessing which data sets and when.
3. **Reliability** - A production application has a primary responsibility to be available for the operational workflows that it supports.  While at times, analytics within the application can support that use case, much of data analysis is done. This reduces the risk of a rogue analytic query suddenly bringing your application and the associated value streams to a halt.
4. **Scalability** - Most data lake environments are able to massively reduce the data storage required for data sets for the purpose of analysis. They also split out the compute required for data analysis in a way that allows for more complicated data products to be developed.

Having data within the data lake however is not enough. The structure of application databases can be difficult to understand. This is especially true for applications that have a different transactional database structure that needs to be transformed into a more relational operational data store.  Understanding data provenance of data assets that are tightly coupled to the application functions that generated the data is invaluable. Data provenance provides context if you can see the operational workflow where the application function that is used to generate the data.

So, how do you determine the workflow connection to the application function and the associated data?  Business capability planning.  By modelling the value stream down to the business capability instance level you get the explicit association of the actor who's performing the task using an application function to achieve a specific outcome for that step within the value stage.

Now within your data lake, you can build out your foundational data assets.  For each business capability instance that generates data, build out the view from that application that represents the data that's captured within that value stream stage and in which application of record.  Modelling data assets at this level provides a key ability to manage changes as application are enhanced or changed over time. It also is great insurance for when an organization may need to retire an application. (need to see if I want to match this to the data bricks medallion design for a Bronze Level deliverable)