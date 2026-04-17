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

On Rogue Point, I built all of the foundational systems for how our levels are populated by designers. I created an entire core suite of actor classes and interconnected tools known as the Modular Randomization System: a complex and designer-friendly way of building layouts in a quick and re-usable way. Designer propogation of this system allowed us to create (at the time of writing) 55 distinct but randomised arrangements out of a mere 4 levels.

Crowbar Collective’s strength has always been in linear and directed level design, and Rogue Point's positioning as a randomized rogue-lite shooter was at odds with this. Various logistical constraints also gave us limited bandwidth to create as many levels as desired, so we needed a way to extract more mileage from existing levels. From this need, I created a “top-down” modular system for our levels, allowing us to create distinct arrangements (called Level Layouts) that were both tightly randomised but also linear and directed. The modularity of the system avoided repetitive and tedious setup for designers, enabling fast creation and iteration. 

Sitting at the top level of this system is an actor class called a Level Layout, which specifies the various areas for a level to utilise, as well as randomisation constraints for said areas. When you start a mission in Rogue Point, the randomization system picks a random Level Layout that is valid for the current difficulty and map. It then loads up and randomizes this Level Layout using its tightly defined parameters. Through this, we strike a unique balance between randomness/unpredictability and curated player direction.

<div class="image main">
	<img src="{{ '/images/rogue-point/randomisation-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

The modular design of the system allows designers divide the level into smaller areas, using an actor class called an Area Manager. Designers assign the Area Manager a custom gameplay tag, which becomes its unique identifier. Designers then place area-relevant gameplay actors such as: enemy spawners, objective spawners, blocker spawners, doors, etc, and allocate them to that Area Manager by setting their tag to match the desired manager. Setting up an individual area is consequently very resource efficient, as setup only needs to be handled once for that area, and it can then be utilised by any layout in any relevant way.

The system then all comes together in the Level Layout actor, within which designers simply specify how that layout should use each given area. For example, every Level Layout allows designers to specify any number of “spawn areas”, and that Level Layout will randomly pick one of these to spawn players at. Designing any Level Layout then simply becomes a matter of specifying and arranging its areas, rather than designers needing to think about implementation details such as what objectives to spawn in an area, how to pick which doors to lock, which enemies to spawn and where, and things like that.

<div class="image main">
	<img src="{{ '/images/rogue-point/randomisation-02.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

Here is an example of the typical setup flow a designer might adopt when building a map using this system:
1) Mentally break the level down into different "areas", create a gameplay tag for each of these
2) Place Area Managers within each area, give them a unique tag identifier
3) Place relevant gameplay actors that you might want to use in that area, give them their manager's tag so they register with the Manager
4) Place a Level Layout actor
5) Specify the different areas to use for that layout - such as a spawn area, extraction area, areas in which to spawn objectives, etc.
6) Refine the layout, adjusting areas or their managers as needed, tightening up parameters, testing and iterating

Creating subsequent layouts becomes very easy because you then only need to repeat steps 4 to 6, assuming the areas in the level have been previously setup already.

I feel this system was a key part of Rogue Point's success and a key point of interest and variety in the game.