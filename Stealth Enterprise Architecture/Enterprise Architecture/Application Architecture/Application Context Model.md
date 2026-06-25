---
feature: Application Context Model Legend.png
---
Every application has a cover story. The official vendor pitch, the project charter that justified the funding, maybe even some dusty requirements documentation - if you're lucky. But what does it _actually_ do? Who _really_ uses it? And which other systems is it quietly exchanging information with at 2 AM?

The Application Context Model is your technique for building the real dossier. It's a functional decomposition of one application's screens, data objects, and information exchanges—complete with the events that trigger them. More importantly, it identifies the stakeholders, roles, and actors who interact with the application day-to-day. Think of it as the difference between an application's passport photo and its actual surveillance file.
### Application Context Model ArchiMate Legend
The following legend shows the ArchiMate concepts that would be typically seen as part of the Application Context Model. See the end of this post for a list of definitions both from ArchiMate as well as general guidance for usage within this model.
![[Application Context Model Legend.png]]

## Application Context Model Content
It is useful to organize your Application Context Model into zones to make the model more readable as follows:
![[Application Context Model Framework.png]]
If your application model needs some narrative, it is useful to combine components into sections as follows:
- **End Users** - Typically the Stakeholder groups the roles on the left hand side of the model. Each end user is added to the appropriate Domain.
- **End User Devices** (Optional) - There are times it may be useful to add the devices that are used to interact with the application.
- **Application Functional Decomposition** - This is usually the largest part of the application narrative.  The functionality of the application and how the data is represented or exposed is the key aspect of the supporting text.
- **Information Exchanges** - Information exchanges can usually have an [[Application Information Exchange Model]] model to themselves as this usually is the biggest aspect of complexity within the application design.  At the application level, just calling out specifically the application interfaces that are supported by the application and which application components they interact with is key for this view.  Information exchanges themselves can be broken down into three categories:
	- **Defined Interfaces** - This can be APIs or HL7 interfaces that have a trigger and share information on demand.
	- **Extracts/Imports** - A large amount of data is exposed through extracts and imports from other applications. This is usually a bulk load performed on a weekly, monthly, or annual basis.
	- **Swivel Chair** - Unfortunately, too many times data is transferred from one application to another with a human actor transcribing data from one screen to another.
	- **Analytic Pipelines** - This can be either an extract and load into a data lake, a full extract, translate, and load (ETL) into a data warehouse, or a specific extract for a defined one of report.
- **Stakeholder Applications** - In many situations, there a key stakeholder applications that require some form of information exchange with the organization's applications.
- **Stakeholders** - On the right hand side of the model are stakeholders who (usually) receive data through an information exchange into one of their own applications and the roles within those organizations.
### Application Context Model Use Cases
The application context model can be used in a large variety of use cases including:
- **Architecture Decision Request or SBAR** - This may require multiple models for each alternative being assessed.
- **Project Charter/Statement** - Usually this is tailored to highlight the aspects that are in or out of scope for that initiative. Modification of an existing model may be useful. This may also bring adding concepts from other models to reflect the overall scope.
- **Operational Documentation** - Ideally, each major application should have a current set of models that show the current scope and functionality. At a minimum would be the application concept model, technology environments model and, the Privacy Impact Assessment (PIA) Information Flow model.
- **Application Portfolio Model** - For a given business domain or specialty, if is useful to also have an Application Portfolio Model
### Model Guidelines
Creating a compelling model will depend on your audience.  
1. **Keep it simple** - Use clear, concise and elegant diagrams that convey the necessary complex ideas without unnecessary extras. If you're using Archi, that may mean hiding the concept symbols and re-labelling components with simpler names. The model needs to fit clearly in one screen.
2. **Details Matter** - Add labels to lines, annotations, and descriptions to your architecture diagrams. Finally, make sure you add your name and your other collaborators and the last edit date to your model.
3. **Show your work off**: Present your models with confidence. Actively use your models to provide context within meetings.  Bring them up on the screen and, edit them to reflect feedback.  Nothing brings more buy-in to your models than having a hand at updating them.

### Using the Application Context Model
The Application Context Model is just one view. It doesn't connect to value streams or map business capabilities. That's not its job. Its job is to answer the questions that matter when someone's staring at an application and asking "what is this thing and who cares about it?"

Build one for each of your critical applications. Keep it current. Bring it to meetings and update it in real-time when someone corrects you. Nothing builds credibility faster than an architect who says "you're right, let me fix that now."

And when the inevitable question comes—"what breaks if we change this?"—you'll have the answer ready. That's the Stealth EA way: less documentation theatre, more operational intelligence.
## Archimate Elements within the Application Context
Follow the links in the term for the ArchiMate definitions and the way that these are used within the Stealth EA framework.

| Term                        | Application Context Model Usage                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stakeholder**             | Typically used to link to the users of the application. If the Stakeholder is linked to the [[Master Architecture Data]] [[Stealth Enterprise Architecture/Enterprise Architecture/Business Architecture/Domain Architecture/Business Domain]], then it assists in defining the application's business usage analysis.                                                                                                                                                               |
| **Business Role**           | A [[Business Roles\|business role]] is used to identify a generic role that is being played in the context of that application. This role is distinct and independent of the title or discipline of the actor who is performing that role.                                                                                                                                         |
| **Actor**                   | Most application context models will stay at the role level.  That said, sometimes it is useful to add the different actors that may be performing the same role. This level of detail may be required to support security, demonstrate organizational variation of practice,                                                                                                      |
| **Application Component**   | Ideally, the application will be pulled from the Master Architecture Data Application Catalogue (applications with a (G) associated with them). Within ServiceNow, the Application Component = Business Application                                                                                                                                                                |
| **Application Function**    | The application function is used to represent a screen that an end user interacts with. Depending on the size of the application, it may also represent a module within an application.                                                                                                                                                                                            |
| **Application Data Object** | The use of Data Object will vary depending on the use case.  It can represent the overall database.  For Information exchange examples, it could be the payload of the interface. If could also represent a report or some other analytic data product.                                                                                                                            |
| **Application Interface**   | Within an application context model, an interface is usually shown as just a 'Flow' relationship between to applications. The next level of detail would be to add the Application Interface component on both sides of the information exchange.  For naming convention, use the following naming approach in/outbound + Application Component Name form/to Application Component |
| **Business Domain**         | While most times the Business Role is clear enough for the application end users, sometimes you may need to highlight the Business Domains those end users are associated with.                                                                                                                                                                                                    |
| **Technology Node**         | In this model the Technology Node represents an end user device that acts as an intermediary between the end user and the application of interest.  The supporting technology environments are usually modelled in the Application Technology Environments model.                                                                                                                  |
| **Stakeholder**             | Within the Application Context model, external stakeholders (if required) are usually organizations and may have roles if there's a more direct interaction. Usually these stakeholders are identified to group the applications they have that have some form of information exchange with the application of concern.                                                            |
