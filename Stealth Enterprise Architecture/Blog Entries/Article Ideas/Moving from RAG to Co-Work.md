Over the last year, I have been experimenting with creating my own Retrieval Augmented Generation vector stores as well as trying to use Graph RAG to create my knowledge graph databases. This was a LOT of overhead that meant I was able to discover how amazingly fast Claude Code was in creating working prototypes.  The real effort of creating and maintaining operational code - not quite the same degree of efficiency. It also did not really support how rapidly my own knowledge base gets updated.

Then Claude Cowork came along.  This has changed the way that I think about unstructured data and managing content. The examples that I am going to work through are personal, but I am sure that many of you could see how using a git wiki repository that leverages markdown and other files instead.
## Obsidian Vault Folder Structure

The first things to do is set up your Obsidian folder structure in a way that makes sense for you.  Personally, I maintain just one repository with folders that span the different parts of my life.You could create any hierarchy you want. I have friends that use the Projects, Areas, Resources, Archives (PARA) framework.  This may work within some domains, but I find I am a bit more ad hoc and this is not a good cross domain model.  While this is still a work in progress, I have a working model as follows.
- **Glossary**: A collection of terms that have definitions and examples for terms that I am trying to keep straight. Leveraging a Glossary plugin that allows me to hover over a defined term to get the definition.
- **Hobby**: I have many hobbies, so in general there will be one folder per hobby that can be broken down into further folders based on how much you are invested in that particular hierarchy.
- **Personal**: Folders organized by things like Home, Fitness, Health, etc.
- **Research**: I have folders based on the medium for the content. This includes websites, videos, books, etc.
- **Side Hustle**: I organise this my areas like Blog, Projects, Finances, Legal, and website.
- **Skills**: This is a common folder for maintaining all of my Claude skills where I can edit them directly before I upload to Claude. These skills (usually) can span the repository, but may ultimately 
- **Work**: All work related content of course stays within the approved areas of your own organization's knowledge fabric.  What goes in here is more personal things for the role(s), skills development, etc.
- **Templates**: Leveraging Obsidian templates provide the ability to rapidly create a place for: meeting minutes, daily reflection, etc.  This can then also be linked to skills to ensure you are following whatever template guidance you may have.

## Hierarchy Context

Now to take your Obsidian repository to the next level.  For each level of the directory structure, write a CLAUDE-(foldername).md file that provides an incremental bit of context that can be loaded for that particular dimension.  The nice part about using Obsidian is that it is markdown native. The second reason Obsidian is powerful the directory structure is mirrored within your local file store.  Because of this, you can also put other documents into that folder structure directly.

A factor to influence what you put in these files is the size of the file. While the number of tokens for each context window is steadily increasing, every CLAUDE.md file is cumulative at each level.  Rather than having CLAUDE.md at each level, use that as a prefix and then add the folder name so that I can manage them easily. 

Another big reason for organizing by domain is to allow instructions within the CLAUDE.md context files ensure that some areas cannot be cross pollinated. It can also look for some domains to be treated as confidential.  

Let's go through an example:  

- *repository root*
- ***CLAUDE.md*** - This file only maintains the information that is the context needed across the entire repository. 
	- *Side Hustle*
		- ***CLAUDE-Side Hustle.md***: This file provides just enough context for the side hustle which includes things like the scope, time expectations, goal(s), purpose, etc.
		- ***CLAUDE-Blog Style Guide.md***: For many of my domains, I find that there is a style guide that is unique to that domain. This can include tone, colour scheme, vocabulary like works to avoid or never use, etc. 
			- *Blog*: 
				- ***CLAUDE-Blog.md***: Continue building on the context that you have provided before to have more specific guidance on blogs for the side hustle. It also explains the folders that support the publishing workflow that I have set up.
					- *LinkedIn Blog*
						- ***CLAUDE-LinkedIn Blog.md***: Guidance for the type of persona you are looking to project on LinkedIn and topic areas that you may want to avoid. Finally, there are instructions to see if there's any inconsistencies with previous content that has been published.
						- *Ideas*: Initial ideas with a thesis and links back to research content.
						- *Upcoming*: An idea that has been evolved enough to be in the near term queue for publishing.
						- *Published*: Once an article has been published it is now migrated so as to capture appropriate metadata.
	- *Skills*
		- ***Publish to Personal LinkedIn Skill.md*** - This skill will be used to take the blog content from the Obsidian repository where the post was created and create an export that will work with the limits of LinkedIn posts or articles. It will also provide content instructions where I will have to import content like images or web links where I use wiki links.
		- ***Meeting Minutes Skill.md*** - This is a skill that is used in concert with the Meeting Minutes Template. Initially, when a meeting is called within a 
	- *Templates*
		- ***Meeting Minutes Template.md*** - I maintain a standard meeting template that I use in advance of the meeting that includes: Preamble, Purpose, Process, and Product.  That sets the stage, but after the meeting there's usually a list of key decisions and most important, actions.
## Obsidian Knowledge Structure

So now you have CLAUDE context files that follow your taxonomy and skills that span across your knowledge base. What's missing?  Things that can span across the entire repository.  This is where explicit and automatic links come into plat with my glossary and the built in Obsidian wiki links come into play.

When I am learning a new topic, or come across terms I don't understand, I use the glossary area to write down the terms and where appropriate link to the source that caused me to research the term in the first place. I then usually create folders by domain when the terms for a particular subject area when the number of terms reaches around a dozen.  Using an Obsidian glossary plugin will then automatically tag words and phrases that you have in your glossary in the markdown lies you create.

You also have automatic links to a glossary to link to the terms you have definitions for within your glossary folder.  Now, you have the ability to use wiki links to make your notes into a personal knowledge graph. This provides a way to both connect context to allow Claude to follow the thread and it allows for traversing your knowledge graph.
## So What?

This structure now allows me to much more rapidly ask questions that span my knowledge base. This can be for checking that I am being consistent in what I am saying. More importantly, when I make a revision in a thought or a concept, I can now rapidly re-factor the legacy notes to maintain consistency.  Between the Obsidian templates and template skills, I have a really great editor that can ensure I am following my own standards.  Finally, when I have a new idea, I can see if I may have already gone down that path once before.

