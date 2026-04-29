---
title: Level Layout Types
layout: project-text
order: 8
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code (Core Systems)
game: Rogue Point
role: Programmer
discipline: Code (Systems)
engine:
  name: Unreal
  icon: /images/icons/ue4-icon.png
date_text: 2026
hero_image: /images/rogue-point/level-layouts-01.jpg
card_image: /images/rogue-point/level-layouts-01.jpg
excerpt_text: An expandable system for defining and running different types of Rogue Point Level Layouts, each with distinct behaviour and gameplay.

---

As we approached Rogue Point’s Early Access release, we found that the existing Level Layout system wasn’t doing enough to establish variety through full campaign runs. To address this, we introduced new Level Layout Types: “Strike” and “Raid” missions that played fundamentally differently from standard layouts.

My initial prototype was messy. I extended the existing Level Layout actor by adding more variables, which led to logic for different layout types being spread throughout the codebase. This created issues where bugs in one layout type could affect others. Despite this, the prototype proved that the concept worked well, so we committed to a proper refactor.

{% include project-image.html
	src="/images/rogue-point/level-layouts-01.jpg"
	alt="Level Layouts"
	title="Level Layouts" %}
	
<hr>

## Object-Oriented Design
To formalise the system, I rebuilt the Level Layout actor around a clean object-oriented structure. The base class contains all shared data and behaviour, while each Level Layout Type is implemented as a derived class with its own specific or overridden behaviour. This allowed different layouts to behave independently without affecting one another.

I also reworked how randomisation was handled. Instead of the Randomization Manager driving all logic as before, each Level Layout became responsible for randomising itself and reporting the results back to the Manager. This made the system far more flexible and reduced the amount of bespoke code required for new layouts.

A key part of this design was defining a shared randomisation flow in the base class, which calls a series of virtual functions:

<ul>
<li><code>RandomizeStartAreas()</code></li>
<li><code>RandomizeExtractionAreas()</code></li>
<li><code>RandomizeObjectives()</code></li>
</ul>

Derived classes can override only the parts they need, allowing new layout types to stay lightweight and easy to reason about. This made it straightforward for coders and designers to see how each layout type differed: simply by looking at what had been added or overridden.

Here is the base class, showing its overridable structure:

{% include code-snippets/level-layout-01a.html %}

And here is a derived Raid Layout class. This is the full header!

{% include code-snippets/level-layout-01b.html %}

<hr>

## Runtime Gameplay Tracking
Beyond randomisation, the game also needed to track mission progress for each layout type. To handle this, I separated static level data (Level Layouts) from runtime state by introducing Mission Components to the Objective Manager. Each layout type was given a corresponding Mission Component class responsible for tracking progress and updating the UI.

At runtime, the Objective Manager simply selects the correct component based on the chosen layout. This approach simplified replication significantly: clients only need a reference to the active Mission Component to correctly display mission state and use the correct HUD layout.

{% include project-image.html
	src="/images/rogue-point/level-layouts-02.jpg"
	alt="Level Layouts"
	title="Level Layouts" %}
	
<hr>

## Extensibility
One of the biggest advantages of this system is how easy it is to extend. Adding a new layout type only requires:

<ol>
<li>A new Level Layout subclass</li>
<li>A corresponding Mission Component subclass</li>
</ol>

From there, behaviour can be customised by overriding only the necessary parts. This made prototyping new mission types fast and low-risk, and also opened the door for future expansion.

I’m particularly proud of this system as it represents a clean refactor that incorporated lessons from both design and engineering. It made the game more flexible, more maintainable, and significantly easier to iterate on.