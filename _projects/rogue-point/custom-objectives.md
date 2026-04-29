---
title: Custom Objective System
layout: project-text
order: 11
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
hero_image: /images/rogue-point/custom-objectives-01.jpg
card_image: /images/rogue-point/custom-objectives-01.jpg
excerpt_text: A framework that allows designers to create bespoke mission objectives in a simple and reusable way.

---
As Rogue Point developed, it became clear that our core objective types (Hostages, Bombs, Laptops, etc.) became repetitive across multiple playthroughs. We wanted a way for designers to introduce more bespoke, level-specific scenarios, closer to the kind of “unlocking the level” moments seen in Half-Life, while still fitting within a modular framework.

To solve this, I built the Custom Objective system, which consists of two parts:
<ol>
<li>A Custom Objective actor, which defines the objective itself</li>
<li>A Custom Objective component, which allows other actors to participate in that objective</li>
</ol>

The Objective Manager interacts with the Custom Objective actor, while individual actors communicate through their components.

{% include project-image.html
	src="/images/rogue-point/custom-objectives-01.jpg"
	alt="Custom Objectives"
	title="Custom Objectives" %}

At its core, the system is intentionally simple. The Custom Objective tracks an array of <em>Objective Actors</em>. When activated, it listens for completion signals from those actors' Custom Objective components. Once all required actors are complete, the objective itself is finished.

This lightweight structure makes it easy to build a wide variety of scenarios with minimal setup.

{% include code-snippets/custom-objective.html %}

<hr>

## Example Objectives
Using this system, designers were able to quickly create a range of varied interactions, such as:
<ul>
<li>Activating circuit breakers to power an elevator on the Oilrig</li>
<li>Disabling a security gate in the Mall</li>
<li>Destroying cryptocurrency servers in Office</li>
<li>Searching computers for a file hidden in one at random</li>
</ul>
These added meaningful variation to missions without requiring bespoke systems for each case.

## Networking
Because the system centralises its data, it also simplifies replication. Only a small amount of information needs to be synchronised: the active objective and its completion state, allowing the UI to stay fully up to date across clients.

## Ease of Implementation
Here’s an example of how little work was required to integrate this into existing actors:

{% include project-image.html
	src="/images/rogue-point/custom-objectives-02.jpg"
	alt="Custom Objectives"
	title="Custom Objectives" %}

Implementation required just two nodes!