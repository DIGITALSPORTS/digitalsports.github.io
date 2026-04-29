---
title: Editor Visualization Component
layout: project-text
order: 10
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code (Editor)
game: Rogue Point
role: Programmer
discipline: Code (Editor)
engine:
  name: Unreal
  icon: /images/icons/ue4-icon.png
date_text: 2026
hero_image: /images/rogue-point/viz-comp-01.jpg
card_image: /images/rogue-point/viz-comp-01.jpg
excerpt_text: A reusable editor visualisation component that allows designers to quickly add debug shapes to actors, making complex properties easier to understand and configure.

---

Some actor classes in Rogue Point were difficult for designers to set up without clear visual feedback in the editor. Unreal’s built-in tools for this are fairly limited, so I built a custom solution in C++, that I nicknamed the <em>Viz Comp</em>.

This started as an exploration into how Unreal handles editor visualisation (such as the guide cones on Spot Lights), and grew into a reusable component that designers could attach to any actor.

The Viz Comp provides a set of generic visualisation primitives: points, lines, boxes, grids, and spheres. Designers can populate these with their own data, and the component will draw them automatically when the actor is selected in the editor.

{% include code-snippets/viz-comp.html %}

Each shape can be assigned a colour manually for clarity, or left unset to cycle through a range of rainbow colours automatically.

{% include project-image.html
	src="/images/rogue-point/viz-comp-01.jpg"
	alt="Viz Comp"
	title="Viz Comp" %}

This made it much easier to understand and debug complex setups at a glance. Some examples include:
<ul>
<li>Visualising links between spawners by drawing lines between them</li>
<li>Highlighting squad triggers with boxes to show where AI can be activated for a squad</li>
<li>Showing Planning Camera coverage using a grid overlay</li>
<li>Representing constrained spectator camera cones</li>
<li>Displaying ranges for various AI-related systems</li>
</ul>

{% include project-image.html
	src="/images/rogue-point/viz-comp-02.jpg"
	alt="Viz Comp"
	title="Viz Comp" %}
	
This tool significantly improved iteration speed and reduced setup errors by making otherwise invisible data immediately visible in the editor.