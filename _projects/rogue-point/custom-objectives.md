---
title: Custom Objective System
layout: project-text
order: 11
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/custom-objectives-01.jpg
card_image: /images/rogue-point/custom-objectives-01.jpg
excerpt_text: A complex and twisting Oilrig at night.

---

It became clear at a certain point in Rogue Point’s development that the core objective systems (Hostages, Bombs, Laptops, etc) were overly repetitive and lost their lustre after a few playthroughs. We wanted an easy way for designers to recapture a bit of that bespoke “unlocking the level” magic that Half-Life brought to the table, while using some common framework that our game logic could easily understand.

I thus cobbled together the Custom Objective System. It is comprised of two parts, the Custom Objective actor itself, and then a Custom Objective component. The Custom Objective actor is where the bulk of the data for the Custom Objective is stored and setup, and the Objective Manager interacts with it to handle setup and anything else needed. The Custom Objective component is a component that designers can add to any other actor which we would want to use to communicate with a Custom Objective actor at any point in development.

<div class="image main">
	<img src="{{ '/images/rogue-point/custom-objectives-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

The way the Custom Objective actor works is extremely simple on the surface. It simply stores an array of “Objective Actors”, which are other actors that the Custom Objective cares about. When the Custom Objective is activated (which can happen in a variety of ways), it establishes a link with these Objective Actors and sets itself up to await a “completed” signal from them. Upon receipt, it adds them to its “Completed Actors” array and subsequently checks if all its Objective Actors have become completed. If they are, the Objective is thus completed. The Objective Actors themselves handle communication with the Custom Objective via their Custom Objective Component.

Through this simple and reusable framework, we were able to create a variety of basic but interesting level layout specific scenarios that added a bunch of variety to mission structures. Some examples include:
-Activate circuit breakers for an elevator and ride it up to the top floor of the Oilrig
-Deactivate a security gate locking up the Un Denni shop in Mall
-Destroy several crypto currency servers in the tunnel of Office
-Search several computers for a crypto wallet, a randomly chosen one contains it, and once you find it, the objective is complete

The Objective Manager innately understands how a Custom Objective works and can treat it as either a primary or an optional objective, based on how the designer has set it up. Due to centralising and baking all the information into one single actor, we are also able to replicate this information to clients through just two variables (the ActiveCustomObjective on the Objective Manager, and then the CompletedActors on the Custom Objective itself), so we can display up-to-date information about it on their UI.
