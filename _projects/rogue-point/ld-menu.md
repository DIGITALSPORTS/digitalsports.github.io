---
title: Level Design Menu
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
hero_image: /images/rogue-point/ld-menu-01.jpg
card_image: /images/rogue-point/ld-menu-01.jpg
excerpt_text: An extension of Unreal Engine’s Play in Editor workflow, designed to centralise testing tools and reduce friction when working with Rogue Point’s systems.

---
Rogue Point was difficult to playtest in editor using Unreal’s default workflow. The [Modular Randomization System]({% link _projects/rogue-point/randomization.md %}) requires levels to be initialised with a specific set of variables across multiple systems. If any of these are misconfigured, it can result in crashes or subtle bugs.

As development progressed, designers needed a way to quickly iterate and test specific Level Layouts, as there were many possible ones for each map. My initial system allowed designers to do this by overriding variables directly on Manager classes and key blueprints such as Game State. While functional, this approach quickly became fragile.

{% include project-image.html
	src="/images/rogue-point/ld-menu-02.jpg"
	alt="LD Menu"
	title="LD Menu" %}
	
<hr>

## Drawbacks of Overrides
These overrides introduced several problems:
<ul>
<li>Designers would frequently forget which values had been overridden, leading to confusing bugs</li>
<li>Small mistakes could cause cascading issues across systems, or silent misconfigurations</li>
<li>Overrides could accidentally make their way into cooked builds</li>
<li>The variables required for testing changed over time, making the workflow inconsistent</li>
</ul>

Envrionment artists were also affected. Testing their work required running through the full gameplay flow, often spawning far from the area they were working on and dealing with gameplay systems they didn’t need, or making it hard for them to set up local test maps without crashing.

## PIE Menu
To address this, I built an extension to the existing <em>Play in Editor</em> menu. This centralised all testing configuration into a single, familiar location, allowing developers to quickly set up and launch specific scenarios without modifying blueprints or overriding level actors.

{% include project-image.html
	src="/images/rogue-point/ld-menu-01.jpg"
	alt="LD Menu"
	title="LD Menu" %}
	
<hr>
	
## Extra Features
The menu also introduced several targeted tools to support common testing scenarios. Notably, an artist-friendly “barebones” mode bypasses all gameplay systems entirely, spawning the player directly into the level at the editor camera location. This allows quick iteration without needing to configure layouts or run through the full game flow.

Additional tools included:
<ul>
<li><strong>Spectator Cams Mode:</strong> Instantly transitions into spectator mode for testing camera setups</li>
<li><strong>Extraction Wave Mode:</strong> Skips to the end-of-level extraction sequence for rapid testing</li>
<li><strong>Simulated Players:</strong> Allows designers to fool gameplay systems into behaving as if multiple players are present</li>
<li><strong>Log Randomization:</strong> Outputs gameplay data to a CSV row for level balance analysis</li>
</ul>

This tool significantly accelerated testing and reduced friction across the team, making it easier for both designers and artists to work with Rogue Point’s systems.

Here is an example of a randomization CSV output:

{% include code-snippets/ld-menu-table.html %}