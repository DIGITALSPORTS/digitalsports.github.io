---
title: Level Layout Types
layout: project-text
order: 8
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code (Core Systems)
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/level-layouts-01.jpg
card_image: /images/rogue-point/level-layouts-01.jpg
excerpt_text: An expandable object-oriented system for allowing different types of Rogue Point Level Layouts to be setup and behave in distinct ways.

---

As we approached Rogue Point’s Early Access release, we found that the Level Layout system, was not doing enough to make a full campaign (a chained playthrough of 7 maps) feel varied and interesting. We thus came up with the idea of a “Strike mission” and a “Raid mission”, two different types of Level Layout that played fundamentally differently from the bulk of the levels and would inject a bit of variety into a campaign playthrough.

My initial prototype was messy, as I simply threw more variables into the existing Level Layout actors. This meant that code differentiating the Level Layout types was spread throughout the game, creating aggravating scenarios where, for example, bugs in the Raid Level Layout could cause Standard Level Layouts (the bulk of the game) to behave incorrectly. However, this prototype was sufficient for us to test the concept, and we found it added a lot to the game. We subsequently decided to solidify the system with a refactor.

<div class="image main">
	<img src="{{ '/images/rogue-point/level-layouts-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

## Object-Oriented Design

To implement the system properly, I went with the expected object-oriented approach. I rewrote the Level Layout actor from scratch, with the intention of subclassing it. I stored all the common variables and functions (such as spawn areas, or config variables for the Planning Screen) on the base Level Layout actor, and any which were specific to a Level Layout type would be stored on their relevant derived class instead. 

This also required me to entirely rewrite how the Randomization System randomized the level. Previously, because we only had 1 unified way of doing this, the Randomization Manager simply pulled needed variables from a Level Layout and handled everything in a bespoke way. Due to the different Level Layout Types needing to be randomized in different ways, I subsequently handled this code Level Layout actor instead, with it simply reporting back to the Randomization Manager what it had randomized. This worked amazingly well and allowed big changes with very little code.

On the base Level Layout class, I was able to write a single randomization flow that all the levels would share by default. But this flow would call to many virtual functions that could be overridden in the child classes, such as RandomizeStartAreas(), RandomizeExtractionAreas(), RandomizeObjectives(), etc. This meant that if a new Level Layout Type mostly behaved the same as the default, but randomized its objectives in a different way, you would only need to override its RandomizeObjectives() function, and leave everything else alone. 

Consequently, child Level Layout classes were lightweight and easy to understand, which was the goal. You could easily tell where they behaved differently to a standard Level Layout, simply by looking at which functions were overridden, or which unique functions were written for that class. It was an incredibly elegant and effective solution.

Here is a snippet from the Level Layout base class, showing the variety of ways I set it up to be potentially overridden:

{% include code-snippets/level-layout-01a.html %}

And then here is a derived Raid Level Layout, and this is actually the entire class header! You can immediately tell at a glance that this Level Layout Type only handles the Objectives and Custom Objectives differently:

{% include code-snippets/level-layout-01b.html %}

## Runtime Gameplay Tracking

However, this was only half of the story! Beyond the Level Layouts knowing how to randomize themselves, the game also needed to track and show progress to players for each Level Layout Type! Design-wise, I felt it was logical for the Level Layout actors themselves to serve as static level data, and for runtime tracking of the mission to be handled in a different class: our Objective Manager. 

In a similar vein to how the Level Layout actors are setup, I created a base component class called the MissionComponent, which I then subclassed into a different types of MissionComponent for each Level Layout type. The Objective Manager would then automatically set the appropriate ActiveMissionComponent in response to type of Chosen Level Layout. 

This was another elegant solution, as it meant that clients only needed to replicate one single variable (the pointer to the ActiveMissionComponent) to be able to start reliably tracking any necessary data about the mission on their UI in the correct way. In previous versions of this system, replicating information to clients was extremely difficult and tedious.

Here is a snippet from the base class, looking at the RegisteRandomizationParams() function which is called as the level is randomised on the server:

{% include code-snippets/level-layout-02a.html %}

And here is a derived class, for the Takedown mission (the very final mission of the game). We can see the mission setting its own unique state (TakedownState) and registering the RallyZone, which players must rally at to begin the boss fight. These things are replicated out to clients on their HUD.

{% include code-snippets/level-layout-02b.html %}

## New Layout Types

Another major advantage of this system was that it became easy to add new Level Layout types. Designers/programmers only needed to create a new subclass of the Level Layout actor and the Mission Component and then override any appropriate logic while implementing any necessary new logic. This would enable further experimentation and fast prototyping of new Level Layout types as we developed the game further and also allow the community more power in what they create.

I was really proud of this system because it was a shining example of a successful ground-up rebuild incorporating lessons both on the design and the code front!

<div class="image main">
	<img src="{{ '/images/rogue-point/level-layouts-02.jpg' | relative_url }}" alt="Oilrig at night" />
</div>