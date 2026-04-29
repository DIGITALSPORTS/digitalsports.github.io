---
title: Xen
layout: project-image
order: 4
nav_section: portfolio
portfolio_group: black-mesa
subtitle: Source Engine - Singleplayer Level Design
game: Black Mesa
role: Level Designer
discipline: Singleplayer Level Design
engine:
  name: Source
  icon: /images/icons/source-icon.png
date_text: 2019
hero_image: /images/xen/xen-hero.jpg
card_image: /images/xen/xen-hero.jpg
excerpt_text: The legendary introduction to Gordon Freeman's singleplayer journey across a mysterious and beautiful alien dimension. Packed with exploration, puzzles, interesting traversal, and environmental storytelling.

islands_gallery:
  - image: /images/xen/xen-02.jpg
  - image: /images/xen/xen-03.jpg
  
puffball_gallery:
  - image: /images/xen/xen-04.jpg
  - image: /images/xen/xen-05.jpg
  - image: /images/xen/xen-06.jpg
  - image: /images/xen/xen-07.jpg
  - image: /images/xen/xen-08.jpg

---

My involvement in the development of Black Mesa’s Xen chapter focused primarily on polish and scripting, though I also contributed to the blockouts and core gameplay design of several levels.

## Islands

For the introductory Islands level, I iterated on several aspects of the blockout throughout development to improve pacing and better teach the player the core gameplay mechanics, which are introduced gradually over time.

I also did extensive work on framing key views and integrating finished VFX into the level, which was more time-consuming than it might seem. This level is in many ways the single biggest standout moment in our version of Xen, and I’m very proud of how it turned out.

{% include gallery.html items=page.islands_gallery gallery_name="islands" %}

<hr>

## Puffball Tree

There had been numerous older versions of the Puffball Tree level prior to my final blockout. Once I made this blockout from the ground-up, I owned its development through to the shipped version. It was designed as a culmination of the Leaf Door mechanic, which is introduced in various ways throughout the earlier Xen Swamp level.

The tree acts as a visually striking central hub with a locked exit, from which the player explores three distinct outer arenas. Each arena presents a mix of puzzles and combat encounters that must be completed to unlock the exit. The structure draws inspiration from classic key-hunting shooters like Descent and Doom.

This level does a lot with relatively little, reusing familiar mechanics but presenting them in interesting spaces and unique combat contexts to keep things engaging. I’m particularly happy with how players are guided through the space; despite its scale and complexity, players rarely get lost.

I ensured this strong player direction by always smoothly returning players to the exit door after each arena, forcing them to immediately see the stacking results of their actions.

{% include gallery.html items=page.puffball_gallery gallery_name="puffball" %}