---
type: Reference
title: "Business Architecture Motivation Measures"
description: "A key aspect of any business architecture are the measures that leaders choose to manage the business."
timestamp: 2026-06-26T19:19:05Z
feature: Business Architecture Motivation Legend.png
thumbnail: thumbnails/resized/6452b051a5a2773fe8fcff9e35622a61_b89e22fb.jpg
---
A key aspect of any business architecture are the measures that leaders choose to manage the business. "If you can't measure it, you can't manage it." is not a direct quote from Peter Drucker (see [Measurement Myopia from the Drucker Institute](https://drucker.institute/thedx/measurement-myopia/)). That said, measurements are an invaluable part of business architecture. Usually they come in the form of a scorecard. This may be using the [[Balanced Scorecard - Translating Strategy to Action]] approach to cascading measures through the organization. It may be more tactical for a specific initiative. It may also be in the way you're managing continuous improvement using [[Lean Six Sigma]].

So as the Stealth Enterprise Architect, what does that mean for you?  First of all, we need to confirm how we want to represent the different aspects of measures in scorecards. Using [[ArchiMate EA Modelling Language]] we can look in the Motivation layer and see four key elements that will assist us.

![[Business Architecture Motivation Legend.png]]
- **Assessment**  - Assessment of a particular driver for one of the stakeholders in your organization. It could also be an assessment of one of the goals (commonly referred to as an objective) or one of the outcomes (or results to complete the Objective and Key Result (OKR)).
- **Driver** - Something that is motivating one or more stakeholders in your organization to do something. 
- Goal - A high-level statement of intent or direction for one or more stakeholders
- Outcome - The end result of a situation. For the measurement framework this is usually something that can be measured.
Using these ArchiMate elements we can now start to construct scorecard model template. Using the Balanced Scorecard as our example, we would have 'drivers' represent each of dimensions of the balanced scorecard. Populating each of these drivers with goals and outcomes is usually part of what Stealth EA calls archeological architecture. You are confirming what measures are being tracked and how the relate to the goals and drivers for the organization.

When the one or more scorecards are completed, they become a catalogue that is useful across other models, most particularly the [[Value Streams]]. 

