---
title: Planning and Markers System
layout: project-text
order: 12
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code (Core Systems)
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/planning-01.jpg
card_image: /images/rogue-point/planning-01.jpg
excerpt_text: A centralised and designer-friendly system for managing the many ways we show Rogue Point's UI markers to players, and display them on the Planning Screen.

---

Rogue Point has a robust system of user interface markers that we show to players, to help them orient themselves in the world and stay aware of the locations of important resources and objectives. These markers are shown to players in 3 "spaces": the <strong>Planning Screen</strong>, the <strong>Compass</strong>, and in the <strong>World</strong>. Initially, we were handling these in a bespoke way (a unique implementation for each space. At roughly the halfway point in development, it became clear that this approach necessitated too high a code cost, as implementing new features and changing marker behaviours became very complex, particularly as we continued to iterate the Planning Screen and Intel system.

## Marker Component

While building the version of the Planning Screen that we would ship with the game, I decided to refactor these disparate systems into a single centralised actor component class called the Marker Component. This meant that the 3 different types of marker widgets would be able to bind to this centralised component in a consistent way, and all respond to any of its changes as they individually needed. This would mean that designers/code would only need to learn and interact with one single API (that of the Marker Component itself) and the way that the individual types of markers responded would be abstracted away as an implementation detail.

For example, here is the core code for changing the basics of a marker's appearance. It is extremely straightforward:

{% include code-snippets/marker-component-01.html %}

To update the basics of a marker's appearance, designers thus only need to call this very simple SetMarkerAppearance() function. The 3 individual marker widgets will be listening for this change, which passes through the new "Appearance" struct in a way that is replicated for clietns too. Here is an example from the Marker Widget base class, which is called when the widget is first instantiated:

{% include code-snippets/marker-component-02.html %}

Individual implementations for the 3 widget spaces then build off this base implementation, allowing flexible handling of the Marker Components, and keeping markers consistent between the 3 spaces. Furthermore, designers could create a marker for any actor simply by adding a Marker Component to it and populating the relevant properties, and it would immediately be fully supported by the Planning Screen, Compass and World.

{% include project-image.html
	src="/images/rogue-point/planning-01.jpg"
	alt="Planning and Markers System"
	title="Planning and Markers System" %}

## Planning Screen

As this system was built in conjunction with the Planning Screen, I also incorporated a statically baked system for calculating the widget location of the markers. Initial versions of the Planning Screen calculated the location of these markers locally as each client's screen was initializing. This caused some issues with marker positions being out of sync between clients, and I also did not like this design in principle. The Planning Cameras and the location of all Marker Components are information that is inherently baked into the level, so it would make sense for their locations to be static information that clients could simply load from disk, saving network traffic and potential for errors.

My simple solution to this was for every Marker Component to store a TMap of “Planning Locations”. When calculating this variable, we would iterate every Planning Camera in the level. For each Planning Camera, we calculated mathematically if it was possible for that Marker Component to appear within its view. If it was, we used some math to create a 2D screen space position for it, using a range of 0,0 (top left) -> 1,1 (bottom right). We then just had a simple utility within the level’s Planning Phase Manager to run this calculation and save the data from it. Here are some simplified excerpts of how I accomplished that:

{% include code-snippets/marker-component-03.html %}

This worked amazingly because it meant that clients loading into the level needed to only replicate and rely on one single variable (the Chosen Level Layout) to be able to fully populate the Planning Screen with the relevant markers for that layout. They would also need to populate any spawned actors dynamically (such as objectives), but this was as simple as using another replicated actor TArray within the Chosen Level Layout.

