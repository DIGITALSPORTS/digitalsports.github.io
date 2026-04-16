---
title: Property Customisations
layout: project-text
order: 9
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/oilrig/oilrig-hero.jpg
card_image: /images/oilrig/oilrig-hero.jpg
excerpt_text: A complex and twisting Oilrig at night.

---

Rogue Point had several very commonly used data structures (structs) that we relied on heavily.  For example, FRandomRoll, which represented the random chance for x number of a thing to be picked. We would often nest these properties within up to 2 levels of another struct, or within containers (such as an array or a map), to give designers fine-grained control over randomization.

As our level setups got quite complex and sprawling, it became quite had to understand what was happening at a glance, because you would need to open several levels of menus and read across many lines to understand the values quickly. So I dug into how the engine handles property customisations, to create our own customisations for how these were displayed.

We were thus able to squeeze the FRandomRoll struct down onto one single line, which made it much cleaner to edit when nested or within a container such as a map. This does not sound like much, but it is just one example of making things nicer to work with in the editor for both designers and also for the modding community. Across an entire development, these slight inefficiencies and moments of confusion can add up!
