---
title: Checkpoint Mall
layout: project-image
order: 14
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Cooperative Level Design
game: Rogue Point
role: Level Designer
discipline: Multiplayer Level Design
engine:
  name: Unreal
  icon: /images/icons/ue4-icon.png
date_text: 2026
hero_image: /images/mall/mall-hero.jpg
card_image: /images/mall/mall-hero.jpg
excerpt_text: A sprawling Mall complex that functions as several maps rolled into one. It supports the widest variety of level configurations in Rogue Point and showcases the game's arena combat at its most flexible.

mall_gallery_1:
  - image: /images/mall/mall-02.jpg
  - image: /images/mall/mall-03.jpg
  - image: /images/mall/mall-04.jpg
  - image: /images/mall/mall-05.jpg
  - image: /images/mall/mall-06.jpg
  - image: /images/mall/mall-07.jpg
  - image: /images/mall/mall-08.jpg

mall_gallery_2:
  - image: /images/mall/mall-09.jpg
  - image: /images/mall/mall-10.jpg
  - image: /images/mall/mall-11.jpg
  - image: /images/mall/mall-12.jpg
  - image: /images/mall/mall-13.jpg
---

Checkpoint Mall is Rogue Point’s largest and most expansive map, and one of its oldest. I was responsible for the map across its many iterations, from the initial blockouts through several rebuilds as the shape of the game evolved.

In many ways, Mall is the quintessential Rogue Point map. Due to its scale, it effectively operates as several smaller maps stitched together, and that is exactly how we use it. Each shop and major area functions as a standalone space, allowing Easy missions to focus on these contained environments. On higher difficulties, these spaces are connected in more complex and directed ways, creating varied and unpredictable layouts.

{% include gallery.html items=page.mall_gallery_1 gallery_name="mall1" %}

Originally, the map was built as a linear journey from the Car Park through the Mall, with higher difficulties pushing players further along the same route. In testing, this proved repetitive: Medium difficulty was effectively just replaying the Easy mission with an extra segment added on.

This led to a shift in approach, and was where my [Modular Randomization System]({% link _projects/rogue-point/randomization.md %}) began to take shape. We reconceptualised the Mall as a space that could be approached from many different angles, allowing designers to construct a wide variety of layouts. This opened up much more creative freedom in how missions were structured.

One downside of this change was the subsequent need to introduce a network of “back hallways” and “back rooms” to support spawning and traversal between these spaces. These weren’t part of the original design, and their addition created some friction between design and art, as well as slowing development. Despite this, the system ultimately paid off, and Mall became one of the most varied and well-received maps in the game.

{% include gallery.html items=page.mall_gallery_2 gallery_name="mall2" %}

One aspect I’m particularly happy with is how distinct each arena feels, especially visually. Each space offers different combat dynamics, while also giving players opportunities to approach encounters more carefully or avoid them entirely.

The stealth side of the game didn’t fully come together in the end, but the map was designed to support it, and those options are still present in how spaces are structured.