---
title: Editor Visualization Component
layout: project-text
order: 10
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code (Editor)
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/viz-comp-01.jpg
card_image: /images/rogue-point/viz-comp-01.jpg
excerpt_text: A reusable editor visualization component for Rogue Point that designers can attach to any actor they have built, to have it draw visualisation shapes in the editor. Enables easy visual setup of actor properties.

---

There were certain actor classes on Rogue Point that proved challenging for designers to configure in the editor without appropriate and instantaneous visual feedback. The blueprint tools provided by Unreal for this are woefully insufficient, but this is where being able to write custom editor code in C++ really pays dividends.

This component class started out with me diving into and exploring how the editor natively handles things like the guide cones on Spot Light actors. From that, it grew into a nifty little reusable component. I thought it would be handy for designers to be able to add custom visualizations to things they created too, so I built this component with that in mind. I gave the component a generic set of visualization shapes you could add to it, enabling maximum versatility. The component simply stores arrays of points, lines, boxes, grids and spheres, and attempts to draw these (if any are specified) when its owning actor is selected in the editor. Designers could thus easily just pass their desired variables to visualise into these arrays, to easily setup editor visualization for their class.

{% include code-snippets/viz-comp.html %}

You could also specify a colour to draw the shape if so you desired (for ease of readability), and if you didn’t, the system would randomly cycle through the colours of the rainbow!

{% include project-image.html
	src="/images/rogue-point/viz-comp-01.jpg"
	alt="Viz Comp"
	title="Viz Comp" %}

We used this visualisation to help with lots of things that otherwise would prove hard to understand at a glance in the editor. For example:
<ul>
<li>Spawners have a “Linked Spawners” property, which are other Spawners that will automatically be triggered. The visualizer would draw a line to these for ease of understanding.</li>
<li>Squad Managers have an array of “Squad Triggers” which are used to wake that Squad up, so we do not end up calculating AI when no players can possibly encounter them. A level could have hundreds of these, and they could be shared between squads, so it became very hard to know for any given squad where it could be woken up from. The visualiser would draw pink boxes around its own Squad Triggers.</li>
<li>It was hard to tell at a glance what a given Planning Camera could see. The visualiser would thus draw a grid which corresponded to the view of the camera, and the floors it could see from.</li>
<li>Spectator Cameras had a constrained cone of view, to prevent clipping the camera into nearby ceilings / surfaces. We used a visualizer cone to represent this.</li>
<li>We had several AI points in the world which constrained their behaviour somehow, and needed a way to visualize the ranges of these objects.</li>
</ul>

{% include project-image.html
	src="/images/rogue-point/viz-comp-02.jpg"
	alt="Viz Comp"
	title="Viz Comp" %}