---
type: Research Clipping
title: "Building Your Own Schema.org"
description: "["
timestamp: 2026-06-26T19:19:05Z
---

[

![Tony Seale](https://miro.medium.com/v2/da:true/resize:fill:88:88/0*OKJo5DD8uoUmjWt6)



](https://medium.com/@Tonyseale?source=post_page---byline--7600a90e690a--------------------------------)

How to invert the data integration problem within your organisation

![](https://miro.medium.com/v2/resize:fit:875/1*KRGk4L43WrOMkDywKvTnVA.jpeg)

by Tony Seale

Schema markup is a structured data vocabulary that helps search engines better understand the information on websites. However, this article is not about search engine optimisation; it is about optimising the way that you can integrate your own organisation's internal data.

## Descending into the dark tunnel of data integration

Within most organisations, applications currently hold data hostage. From a birds-eye view, we can see that the organisation's information has become fractured and fragmented (scattered across thousands of separate databases) but it is very hard to see how we can ever put the pieces back together again. The sheer complexity is overwhelming.

![](https://miro.medium.com/v2/resize:fit:841/1*Pwl8N81cmcOxvGk0XBB0Yw.png)

If we are to move forward, we need to challenge some fundamental assumptions. For instance, so far we have assumed that the only way that we can integrate information is to bring it together in one big central store. Underlying this is the assumption that the responsibility for integrating data is always upon the consumer of that data. The problem with this method is that it cannot scale to the size of the modern data landscape.

To be clear, this is not a technical problem, you could quite easily dump all the data into a data lake. Rather it is a _people_ problem: you can’t scale the human effort needed to connect and clean that data when using one central data team.

![](https://miro.medium.com/v2/1*OysQIbxKUyC0CL8D1G1mIw.png)

We appear to be stuck in an unhealthy feedback loop. Organisations have to add new applications whenever business opportunities arise, but as each new application is created the overall integrity of the organisation’s data degrades. The question is how do we escape this downward cycle? Well, perhaps schema.org could just provide the inspiration you are looking for.

## Schema.org: web-scale data integration

[schema.org](https://schema.org/) is a website that models the concepts that are often searched for on the web. For example, it has a model for ‘[people](https://schema.org/Person)’, one for ‘[films](https://schema.org/Movie)’ and another for ‘[flights](https://schema.org/Flight)’.

It also has a definition of what a [recipe](https://schema.org/Recipe) is, with a list of the possible properties that you would like to specify when describing a recipe on the web. For instance, you can specify the time it takes to cook, dietary restrictions and ingredients etc:

![](https://miro.medium.com/v2/resize:fit:875/1*dzzu29KHY-zE5HhL3O9Ziw.png)

This means if I have a website that has recipes on it and I want to elevate its search page ranking, I can use this definition of a recipe to embed some data into the pages of my site using something called [JSON-LD](https://json-ld.org/playground/). [JSON](https://en.wikipedia.org/wiki/JSON) is a way of sharing data on the web and JSON-LD is a special type of JSON that can be linked back to the definition of a shared concept such as those specified on schema.org. Here is an example of how I would add a recipe to my site by using a nugget of JSON-LD:

![](https://miro.medium.com/v2/resize:fit:875/1*HDbPiOoTNoIbj6xEeU_bgw.png)

When the Google [web crawler](https://en.wikipedia.org/wiki/Web_crawler) finds one of these nuggets of JSON-LD it adds it to the [Google Knowledge Graph](https://blog.google/products/search/introducing-knowledge-graph-things-not/). This Knowledge Graph enables Google to return much more specific search results.

For example, let’s say I feel hungry and decide to make myself a spicey snack, so I do a search for a recipe. The results I get back will be VERY specific to my search. The reason that the results are so precise is due to the fact they come from a query to Google’s Knowlege Graph:

![](https://miro.medium.com/v2/resize:fit:875/1*wuPBeOJppzywVFg77-ZsIA.png)

Picking the BBC’s recipe as an example, we can see that the webpage contains a little island of JSON-LD that conforms to the conceptual model of the [recipe](https://schema.org/Recipe) defined on schema.org:

![](https://miro.medium.com/v2/resize:fit:875/1*LQ7KJYWjJXSZ7CcuKu3Z5g.png)

You may be thinking, that all sounds great but how widely is schema markup actually used? At the time of writing [44 per cent of all websites](https://w3techs.com/technologies/details/da-jsonld#:~:text=JSON%2DLD%20is%20used%20by%2044.2%25%20of%20all%20the%20websites.) now contain these little nuggets of JSON-LD.

![](https://miro.medium.com/v2/resize:fit:875/1*4--u21X8OzhIMj4Dq1s1Dw.png)

That is around 80 million websites and it’s growing. Make no mistake: this is data integration working on a global scale.

The magic here is that the cost of integration has been pushed from the organisation collecting the data to the organisation that is providing the data. Search engines have been able to invert the data integration problem by incentivising organisations to do the work by providing them with higher positions in their search engine rankings. This inversion of responsibility enables integration at a huge (perhaps even limitless) scale.

![](https://miro.medium.com/v2/resize:fit:750/0*CxWKjBFH4MHMHgOs.jpg)

## Schema.your.org: organisation-scale integration

When we consider these wonders of the web in the context of the hellscape that is our own internal data integration problems, it begs a vital question: if this method can work at the global scale of the world wide web, can you think of a single good reason why it couldn’t work at the much smaller and more tightly integrated scale of a single organisation?

You may wonder:

\- **Is the technology too complex for your application teams to handle?** If all the developers of 80 million websites are able to do it, why not yours?

\- **Is it unrealistic to think that different teams within your organisation could agree upon a common set of shared concepts?** It is unlikely organisations are less able to cooperate internally than they are able to cooperate externally.

\- **Is the problem that Google and Microsoft are huge tech companies and normal organisations do not have the resources needed to gather the data?** Perhaps there is a point here and this is the most challenging part to tackle so the rest of this article gives pointers to how best it is achieved.

So, what would it take for a normal organisation to mirror the schema.org setup internally? The first thing you would need to do is build an internal version of the schema.org website. The schema.org project is open source, so you can take a look at the code to get some inspiration: [https://github.com/schemaorg/schemaorg](https://github.com/schemaorg/schemaorg).

A good approach is to register an internal schema domain within your organisation and host your site there. Something like this [https://schema.your.org](https://schema.your.org/) works well. This site can host the core concepts that are relevant to your particular organisation. For example, if you are a pharmaceutical you will start adding things like drugs and drug trials here, whereas, if you are an investment bank you will add concepts like trade and risk. As anyone who works in either of those industries will know, this will be a complex process. It is a good idea to use existing industry standards wherever possible and to start small rather than trying to boil the ocean.

You have to remember this is not just a pretty website for people to look at. The concepts are also readable by computer programs such as BI tools, ML models and the applications themselves. The trick to this part is exposing what is called a JSON-LD context. Schema.org exposes its context here: [https://schema.org/docs/jsonldcontext.json](https://schema.org/docs/jsonldcontext.json)

You can see that the context just returns all the concepts and their properties in JSON:

![](https://miro.medium.com/v2/resize:fit:875/1*TUdGdF7iFWQNNW0AR56wRQ.png)

To make this work internally, your own schema.your.org site will have to do the same. So you will have a [https://schema.your.org/docs/jsonldcontext.json](https://schema.yourorg.net/docs/jsonldcontext.json) context that will return all the properties of all of the concepts that you have created.

Now comes the fun part. When applications make their data available, they use the context that you have defined. This allows applications to return data that conforms to the shared models that are hosted in your internal schema.org site.

On a brief technical note, you would not tend to want to include the JSON-LD as nuggets in web pages, rather you would return JSON-LD from the Application Programming Interface (Web API) so that the computer programs can grab the data directly.

To pick an example, it is not uncommon to find information about ‘sales’ scattered across hundreds of databases. With schema.your.org each of those hundred applications would now take on the responsibility of mapping into the shared concept of ‘sale’ that is defined on schema.your.org. Just like the BBC and the other organisations mapped into the shared concept of ‘recipe’ on the web.

![](https://miro.medium.com/v2/resize:fit:795/1*D4M0nXwvM7NN9-lE3u27Ww.png)

Then each application can register its API with the central data team. All the central data team has to do now is pull the pre-integrated data into a central [Knowledge Graph](https://medium.com/@Tonyseale/embrace-complexity-conclusion-fb8be6f39deb).

This is the magic trick. The cost of integration has been inverted because the effort of data integration has been shared out amongst all the applications. We now have an internal data integration model that can scale to the size of the whole organisation!

![](https://miro.medium.com/v2/resize:fit:875/1*Mk2sKiSXcc6RAuHLKAJC9g.png)

## Light at the end of the tunnel

The end state will eventually be the creation of your organisation's Knowledge Graph. There are a few architectural blueprints that need to be set up in order to get the whole [Decentralized Knowledge Graph](https://medium.com/@Tonyseale/embrace-complexity-conclusion-fb8be6f39deb) fully working, but setting up an internal schema.org is the perfect place to start.

![](https://miro.medium.com/v2/resize:fit:875/1*0XbmXtn36xE0no8VusNH_A.jpeg)

Although we are thinking very big here, it is wise to start small. Adding the concept of a ‘dataset’ to schema.you.org is a good place to start. You don’t need to reinvent the wheel here. I would suggest that you load in the concepts defined in [DCAT](https://www.w3.org/TR/vocab-dcat-2/).

Having a shared model of what a dataset looks like will pave the way nicely for another architectural blueprint that I call the Connected Data Catalog.

There is no getting away from the fact that data integration is complex. It would be lovely if an AI fairy could magic all that complexity away. The truth is that we need to teach and train our AI first and that is exactly what a [Knowledge Graph can eventually do](https://medium.com/@Tonyseale/embrace-complexity-part-4-2faf9206917e).

![](https://miro.medium.com/v2/resize:fit:801/1*K5o-vkWPC77lZHGX1U67dw.png)

In the meantime, the example set by schema.org shines some light on the end of the data integration tunnel. To be clear, this is the start of a long journey for most organisations, but at least schema.org proves that data can be integrated at scale. Inverting the responsibility for data integration works, the technology exists, it is open source and it is not mind-bendingly complex.

All that remains then, is the will to engage with the task.

![](https://miro.medium.com/v2/resize:fit:875/1*JFklP5yCK0rS_b6NT430yA.png)