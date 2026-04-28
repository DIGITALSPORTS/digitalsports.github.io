---
title: Planning and Markers System
layout: project-text
order: 12
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
hero_image: /images/rogue-point/planning-01.jpg
card_image: /images/rogue-point/planning-01.jpg
excerpt_text: A centralised system for managing Rogue Point’s UI markers across the Planning Screen, Compass, and World, designed to keep behaviour consistent while simplifying iteration.

---
Rogue Point uses a wide range of UI markers to help players navigate the world and track resources and objectives. These markers appear in three spaces: the <em>Planning Screen</em>, the <em>Compass</em>, and the <em>World</em>.

Originally, each of these systems was implemented separately. As development progressed, this became difficult to maintain and extend. Adding new features or adjusting behaviour required changes across multiple systems, and iteration slowed significantly.

## Marker Component
To address this, I refactored the system into a single centralised actor component: the Marker Component. All marker types now bind to this component and respond to its state in their own way. This provides a single, consistent API for both designers and programmers, while keeping implementation details appropriately abstracted away.

Designers can create a fully functional marker simply by adding a Marker Component to an actor and configuring its properties. The system handles how that marker is displayed across all three spaces automatically.

{% include code-snippets/marker-component-01.html %}

{% include code-snippets/marker-component-02.html %}

This approach ensures that marker behaviour remains consistent across the Planning Screen, Compass, and World, while making it much easier to extend or modify.

{% include project-image.html
	src="/images/rogue-point/planning-01.jpg"
	alt="Planning and Markers System"
	title="Planning and Markers System" %}

## Planning Screen
I also built Rogue Point's Planning Screen, in conjunction with this marker system. While doing so, I devised a static method of reliably calculating marker positions for the Planning Screen.

Previously, each client calculated marker positions locally when the Planning Screen was initialised. This led to unreliability as well as inconsistencies between clients and unnecessary runtime work. My baked system allowed each Marker Component to store a set of precomputed “Planning Locations,” representing its screen-space position for each Planning Camera. These are calculated once in-editor and saved as part of the level data.

At runtime, clients simply read this data, avoiding recalculation and ensuring consistency across all players. This data is stored as a (0,1) position, so it will work for any player regardless of their screen resolution.

{% include code-snippets/marker-component-03.html %}

This approach reduced network complexity and ensured that the Planning Screen could be populated reliably using minimal replicated data: requiring only the chosen Level Layout and any dynamically spawned actors.