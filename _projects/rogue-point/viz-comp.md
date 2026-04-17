---
title: Editor Visualization Component
layout: project-text
order: 10
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/viz-comp-01.jpg
card_image: /images/rogue-point/viz-comp-01.jpg
excerpt_text: A complex and twisting Oilrig at night.

---

There were several actors Level Designers would set up on Rogue Point that proved challenging to configure appropriately. The blueprint tools that Unreal provides for allowing designers to visualize their work is insufficient, but this is where diving into the editor code and C++ really shines.

As we progressed through development this issue became more apparent, so I did some exploration into how the editor handles things like the guide cones on Spot Light actors.

I thought it would be handy for designers to be able to add custom visualizations to things they created too, if so they desired, so I turned our version of this component into something that could be added to blueprint. I gave it a generic set of implementations so that it was as versatile as possible. The component simply stored several arrays of points, lines, boxes, grids and spheres. Designers could thus easily just pass their desired variables into these arrays, to easily setup editor visualization for their class.

<div class="image main">
	<img src="{{ '/images/rogue-point/viz-comp-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

You could also specify a colour to draw the shape if so you desired, and if you didn’t, the system would randomly cycle through the colours of the rainbow!

We used this visualisation to help with lots of things that otherwise would prove hard to understand at a glance in the editor. For example:
- Spawners have a “Linked Spawners” property, which are other Spawners that will automatically be triggered. The visualizer would draw a line to these for ease of understanding.
- Squad Managers have an array of “Squad Triggers” which are used to wake that Squad up, so we do not end up calculating AI when no players can possibly encounter them. A level could have hundreds of these, and they could be shared between squads, so it became very hard to know for any given squad where it could be woken up from. The visualiser would draw pink boxes around its own Squad Triggers.
- It was hard to tell at a glance what a given Planning Camera could see. The visualiser would thus draw a grid which corresponded to the view of the camera, and the floors it could see from.
- Spectator Cameras had a constrained cone of view, to prevent clipping the camera into nearby ceilings / surfaces. We used a visualizer cone to represent this.
