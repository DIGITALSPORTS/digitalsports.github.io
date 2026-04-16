---
title: Planning and Markers System
layout: project-text
order: 12
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/planning-01.jpg
card_image: /images/rogue-point/planning-01.jpg
excerpt_text: A complex and twisting Oilrig at night.

---

Rogue Point has a robust system of markers that can be shown to players. About halfway into development, it became clear that our piecemeal approach was inadequate for anything we wanted to do.

I created a component class called the Marker Component. This would serve as the centralised component for the Marker system. The idea would be that the 3 different types of marker system (Planning Screen, Compass, and World) would be able to bind to this centralised component, and all respond to any of its changes in identical ways. This would mean that designers/code would only need to learn and interact with one single API, that of the Marker Component itself, and the way that the individual types of markers responded would be abstracted away as an implementation detail.

<div class="image main">
	<img src="{{ '/images/rogue-point/planning-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

I was also building this in conjunction with the Planning Screen. Initial versions of the Planning Screen calculated the location of the markers on the Planning Screen as the screen was initializing. This caused some strange issues with marker positions being out of sync between clients, and I also did not like this design on principle. The Planning Cameras and all the Marker Components are information that is inherently baked into the level, so it would make sense for their locations to be static information that clients could simply load from disk.

My simple solution to this was for every Marker Component to store a map of “Planning Locations”. When calculating this variable, we would iterate every Planning Camera in the level. For each Planning Camera, we calculated mathematically if it was possible for that Marker to appear within its view. If it was, we used some math to create a 2D screen space position for it, using a range of 0,0 (top left) -> 1,1 (bottom right). We then just had a simple utility within the level’s Planning Phase Manager to run this calculation and save the data from it.

This worked amazingly because it meant that clients loading into the level needed to only replicate and rely on one single variable (the Chosen Level Layout) to be able to fully populate the Planning Screen with the relevant markers. They would also need to populate any spawned actors dynamically (such as objectives), but this was as simple as using another replicated variable within the Chosen Level Layout. Clients already had the location of every objective spawner within the level.
