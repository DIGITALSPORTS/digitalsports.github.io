---
title: Modular Randomization System
layout: project-text
order: 13
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code and Level Design
game: Rogue Point
discipline: Code and Level Design
date_text: 2026
hero_image: /images/rogue-point/randomisation-01.jpg
card_image: /images/rogue-point/randomisation-01.jpg
excerpt_text: A complex and twisting Oilrig at night.

---

On Rogue Point, I built all the foundational systems for how our levels are populated. I created an entire core suite of actor classes and interconnected tools known as the Modular Randomization System, a complex and incredibly designer-friendly way of building out levels in a quick and re-usable way. Use of this system allowed us to populate Rogue Point with 

Crowbar Collective’s strength as a studio had been in linear and clearly directed level design, and our concept of doing a somewhat randomized rogue-lite shooter seemed at odds with this. Furthermore, we had limited capacity to populate out as many levels as we would have liked, so we needed a way to get more mileage out of the existing levels that we already had.

<div class="image main">
	<img src="{{ '/images/rogue-point/randomisation-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

This gave me the idea of creating a “top-down” modular system for the levels, that would let us create distinct, linear and directed arrangements within a level, but without requiring us to do repetitive and tedious set up for each of these arrangements. Sitting at the top level of this system is an actor class called a Level Layout, which contains all the different areas and randomization data for how one such arrangement can be setup. When you start a mission in Rogue Point, the randomization system picks a random Level Layout that is valid for the current difficulty and map. It then loads up and randomizes this Level Layout using the parameters that are defined within. In this way, we strike a unique balance between randomness/unpredictability and tight direction.

The aspect of this system that makes it incredibly designer-friendly and modular is the way that it is populated. Designers divide the level into small sub-areas, using an actor class called an Area Manager. That Area Manager is given a gameplay tag, which becomes the unique identifier for that area. Designers can then place down relevant gameplay actors such as enemy spawners, objective spawners, blocker spawners (more on those later), doors, etc, and assign them to that Area Manager simply by also giving them the corresponding tag. Setting up an individual area is thus relatively resource efficient.

The system then all comes together in the Level Layout, where the designers simply specify how said Layout should use each area. For example, every Level Layout lets you specify any number of “spawn areas”, and the Level Layout will randomly pick one of these to spawn players at when the game starts. The reason why this is so powerful is because it means that designers need only set up each individual Area Manager once, and then it is suitable for use in any Level Layout in any way possible. Designing the Layout then simply becomes a matter of arranging the Areas, rather than needing to think about slightly more complex implementation details such as what objectives to spawn in an area, how to pick what doors to lock, which enemies to spawn, and things like that.
