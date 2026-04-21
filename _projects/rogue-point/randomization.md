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

I built all of Rogue Point's foundational systems for how our levels are populated by designers. I created an entire core suite of actor classes and interconnected tools known as the Modular Randomization System: a designer-friendly way of building complex layouts in a quick and re-usable way. Designer propogation of this system allowed us to create (at the time of writing) 55 distinct but randomised arrangements out of a mere 4 levels.

Crowbar Collective’s strength has always been in linear and directed level design, and Rogue Point's positioning as a randomized rogue-lite shooter was at odds with this. Various logistical constraints also left us with limited bandwidth to create as many levels as desired, so we needed an effective method to extract more mileage from what was available. From this need, I created this “top-down” modular system for our levels, allowing us to create distinct arrangements (called Level Layouts) that were simultaneously randomised and also linear and directed. The system's modularity avoided repetitive and tedious setup for designers, enabling fast creation and iteration. 

Sitting at the top level of this system is the Level Layout actor class, which specifies the arrangement of the level's various areas and how to utilise them, as well as the randomisation constraints for said areas. When you start a mission in Rogue Point, the randomization system picks a random Level Layout from the pool that is valid for the current difficulty and map. It then loads up and randomizes this Level Layout using its designer-defined randomization parameters. Through this, we strike a unique balance between randomness/unpredictability and curated player direction that I haven't really seen any other game manage.

<div class="image main">
	<img src="{{ '/images/rogue-point/randomisation-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

The system's modularity allows designers divide the level into smaller areas, using an actor class called an Area Manager. Designers assign the Area Manager a custom gameplay tag, which becomes its unique identifier. Designers then place area-relevant gameplay actors such as: enemy spawners, objective spawners, blocker spawners, doors, etc, and allocate them to that Area Manager by setting their tag to match the desired manager. Setting up an individual area is consequently very resource efficient, as setup only needs to be handled once for that area, and it can then be utilised by any layout in any relevant way.

Within the Level Layout actor, designers then simply specify how that layout should use each given area. For example, every Level Layout allows designers to specify any number of “spawn areas”, one of which will be randomly selected to spawn players at. Designing any Level Layout then becomes a straightforward matter of specifying and arranging its areas like a set of conceptual building blocks, and putting any required additional constraints on these. Designers do not need to think about implementation details such as which specific spawners to use in an area, how to pick which doors to lock, how many enemies to spawn and where, and things like that. The system handles this logic for them. It avoids bespoke and complex setups.

<div class="image main">
	<img src="{{ '/images/rogue-point/randomisation-02.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

Here is an example of the typical setup flow a designer might adopt when building a map using this system:
<ol>
<li>Mentally break the level up into different "areas", create a gameplay tag for each of these.</li>
<li>Place Area Managers within each area, give them a unique tag identifier.</li>
<li>Place relevant gameplay actors that you might want to use in that area, give them their manager's tag so they automatically register with the Manager.</li>
<li>Place a Level Layout actor and set up its unique properties.</li>
<li>Specify the different areas to use for that layout - such as a spawn area, extraction area, areas in which to spawn objectives, areas in which to spawn enemies, etc.</li>
<li>Refine the layout, adjusting areas or their managers as needed, tightening up parameters, testing and iterating.</li>
</ol>

Creating subsequent layouts becomes very easy because you then only need to repeat steps 4 to 6, assuming the areas in the level have been previously and correctly setup already. I feel this system was a key part of Rogue Point's success and a key point of interest and variety in the game.

As we neared the Early Access release of Rogue Point, I further expanded this system by introducing the concept of different [Level Layout Types]({% link _projects/rogue-point/level-layouts.md %}). This further solidified the Modular Randomization System as a pillar of Rogue Point's gameplay design, and took things to the next level!