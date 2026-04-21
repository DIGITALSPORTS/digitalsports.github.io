---
title: Level Layout Types
layout: project-text
order: 8
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/level-layouts-01.jpg
card_image: /images/rogue-point/level-layouts-01.jpg
excerpt_text: A complex and twisting Oilrig at night.

---

As we approached Rogue Point’s Early Access release, we started to find that the Level Layout system, while doing a lot of heavy lifting in terms of giving us many different level configurations across a limited variety of maps, was not doing enough to make a full campaign (a chained playthrough of 7 maps) feel varied and interesting. This led us to come up with the idea of a “Strike mission” and a “Raid mission”. These would be a different type of Level Layout that played fundamentally differently from the bulk of the levels and would inject a bit of spice and variety into a campaign playthrough.

My initial prototype was messy. I simply threw more variables into the existing Level Layout actors, and all the systems that used the Level Layout actors thus needed to understand the differences between the Layout Types. This created lots of aggravating scenarios where, for example, bugs in how I had written the Raid Level Layout would cause standard Level Layouts (the bulk of the game) to behave incorrectly. However, this prototype was sufficient for us to test the concept, and we found it added a lot to the game. We subsequently decided to solidify the system with a refactor.

<div class="image main">
	<img src="{{ '/images/rogue-point/level-layouts-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

## Object-Oriented

To implement the system properly, I went with the expected object-oriented approach. I rewrote the Level Layout actor from scratch, with the intention of subclassing it. We would thus store all the common variables and functions (such as spawn areas, or configuration variables for the Planning Screen) on the base Level Layout actor, and any which were specific to a Level Layout type would be stored on their relevant class instead. This also required me to entirely rewrite how the Randomization System handled randomizing the level. Previously, because we only had 1 unified way of randomizing the level, the Randomization Manager simply pulled variables from a Level Layout and handled everything in a bespoke way. Due to the different Level Layout Types needing to be randomized in different ways, I moved this code over to the Level Layout actor instead, with it simply reporting back to the Randomization Manager what it had randomized.  This worked amazingly well and allowed big changes with very little code.

<div class="image main">
	<img src="{{ '/images/rogue-point/level-layouts-02.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

This was so effective because on the base Level Layout class, I was able to write a single randomization flow that all the levels would share by default. But this flow would call to many virtual functions that could be overridden in the child classes, such as RandomizeStartAreas(), RandomizeExtractionAreas(), RandomizeObjectives(), etc. This meant that, for example, if a new Level Layout Type mostly behaved the same as the default, but randomized its objectives in a different way, you would only need to override the RandomizeObjectives() function, and leave everything else alone, and you would automatically have the expected behaviour. This meant that the child Level Layout classes ended up being incredibly lightweight and easy to understand, which was exactly what I was hoping for. You could easily tell how they behaved differently to a standard Level Layout, simply by looking at which functions were overridden, or which unique functions were written for that class. It was incredibly elegant and is a solution that I am very proud of.

SNIPPET SHOWING A LAYOUT TYPE OVERRIDING
{% include code-snippets/level-layout-01.html %}


## Gameplay Tracking

However, this was only half of the story! Beyond the Level Layouts knowing how to randomize themselves, the game also needed to understand how players progress through and beat each level type too! It felt like it made sense for the Level Layout actors to serve as the static level data, and for dynamic runtime calculations and logic for the mission to be handled elsewhere. The Objective Manager seemed the sensible choice for this. As such, I created a base component class called the MissionComponent, which I would then subclass into a different types of MissionComponent for each Level Layout type. The Objective Manager would then set its ActiveMissionComponent in response to the Chosen Level Layout, picking the appropriate Mission Component type to fit the Level Layout type. This was another rather elegant solution, as it meant that clients only needed to replicate one single variable (the pointer to the ActiveMissionComponent) to be able to start reliably tracking any necessary data about the mission on their UI in the correct way. In previous versions of this system, replicating information to clients was extremely difficult and tedious.

SNIPPET SHOWING A MISSION COMPONENT
{% include code-snippets/level-layout-02.html %}

## New Layout Types

Another major advantage of this system was that it became easy to add new Level Layout types. Designers/programmers only needed to create a new subclass of the Level Layout actor and the Mission Component and then override any appropriate logic while implementing any necessary new logic. This would enable further experimentation and fast prototyping of new Level Layout types as we developed the game further and also allow the community more power in what they create.

I was really proud of this system because it was a shining example of a successful ground-up rebuild incorporating lessons both on the design and the code front!


<div class="image main">
	<img src="{{ '/images/rogue-point/level-layouts-03.jpg' | relative_url }}" alt="Oilrig at night" />
</div>
