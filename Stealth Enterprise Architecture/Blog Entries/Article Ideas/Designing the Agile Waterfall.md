
![[Designing the Agile Waterfall 1.png]]
It was early in my career when the [Agile Manifesto]([Manifesto for Agile Software Development (agilemanifesto.org)](https://agilemanifesto.org/)) first came out.  Working at an application development IT consultancy at the time meant that there was a lot of debate about Agile vs. Waterfall. In the 25 years since that manifesto came out, I find it unfortunate that the debate seems to continue.

So why is an architect wading into a decade's old project management debate? 

I would really like to see my designs get built faster! To that end, let's agree that it's almost always really an Agile Waterfall.
## What is an Agile Waterfall?

For any larger enterprise, a solution will have many components that will end up spanning across multiple application teams to be able to build out the minimum viable product. Different teams will need to build out their portion of the solution - usually with some form of interdependency that requires sequencing.

A classic pattern would be building an interface between two package applications. At a minimum, there is Application Team A, an integration team (optional, though often necessary) and Application Team B.  Each team can manage their work as an agile team using agile practices, but the enhancement cannot be released until all components are built and tested.

So an enterprise agile waterfall (in Scaled Agile called an [agile release train](https://scaledagileframework.com/agile-release-train/)) looks to build out that minimum viable product in as few iterations or sprints as possible.
## When does is cease to be an Agile Waterfall?

From an enterprise architecture perspective, it ceases to be an agile waterfall when the scope is expanded beyond the minimum valuable product that measurably enhances an organizational value stream.

So let's take the following example. Rather than logging into a medical device manufacturer or value added reseller's website to get the biometric readings for a particular patient, a clinician would rather see those results within their clinical information system. What's the value of having that enhancement? 
- Alerts can be set for readings that go outside of plan
- Readings don't have to be manually transcribed into the clinician's clinical information system
- Clinical decision support rules now can function across all of the information gathered on the patient's chart.
So for this scenario, the minimum valuable product is getting the data in to reduce clinician time, enable faster response when needed and provide better informed care. 
## Enterprise Architecture's Role in Designing the Agile Waterfall

I plan to cover this more in future articles, but from an Enterprise Architecture perspective, Agile Waterfalls start with understanding the Value Stream a particular feature will enhance. From there, a look at what business capability instances need to be enhanced or created to make the [[Value Streams|value stream]] or [[Stealth Enterprise Architecture/attachments/value stage]] perform better.

Since a business capability is by definition, "a collection of role, processes, tools and information that achieve a business outcome", the enhancement planned for one or more business capabilities in a value stream forms the basis of the Agile User or Enabling Story. Using the formula for the Agile story, "As a [role] I need the following enhanced [processes, tools and/or information] at that I can achieve the following [outcome]" you can see how the business capability enhancements can work in an Enterprise Agile Framework.

The minimum viable product would be encapsulated in an Agile Feature. Finally, as a new proposal using Scaled Agile terminology, if the Agile Epic was defined as the Value Stream being enhanced, we would have full traceability. So now the hierarchy would look as follows:
- Epic (aka Value Stream) - Remote Patient Care Value Stream
	- Feature (Minimum Viable Product) - Automatic Patient biometric device readings
		- Story (Business Capability Enhancement) - in the biometric example, many stories.
			- Tasks (work needed to complete the story's enhancements)

If the Enterprise Architect has modelled the Value Stream down tho the business capability instance level identifying the enhancements.

