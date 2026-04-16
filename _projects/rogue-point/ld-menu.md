---
title: Level Design Menu
layout: project-text
order: 10
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

Rogue Point is a challenging game to playtest using the default Unreal Engine flow. The nature of the Modular Randomization System means that levels must be loaded with a specific set of configured variables across a variety of placed actors. If any of these are setup incorrectly, they can cause a crash or silent misconfiguration that breaks the level in subtle ways for that playthrough. Furthermore, because we had so many Level Layouts within maps, we needed a way to test specific layouts with just a few clicks.

For much of development, our solution was to allow designers to override variables on the Manager classes that would typically be populated by the system at runtime. For example, in a typical gameplay flow, the Randomization Manager’s “Chosen Level Layout” variable would be populated in one of two ways. Either the main menu would pass through a value for that variable ahead of loading the level, or the Randomization Manager would detect that a value hadn’t been set and randomly pick a level layout from the map for the selected difficulty. Level Designers would also need to override certain variables on important blueprints such as Game State and sometimes Player State.

This worked well enough but had several key limitations. It was extremely common for designers to forget they had overridden these variables, due to the fast nature of development and with just how often we were doing it. Even just one forgotten variable could cause a cascading breaking effect. Sometimes overridden variables would make it onto a cooked build. You would think that a good solution would be to ignore overrides in cooked builds, but there were circumstances where we legitimately wanted these to test specific scenarios within a cooked build. Furthermore, as systems kept changing, the blueprints and variables within which designers needed to edit variables kept moving as well, and it became quite confusing. In addition, artists struggled with putting together test levels or checking their work in-game, because they always had to ensure they were playing on a Level Layout that utilised the section of the map they were working on, and had to always play through a typical game flow to check their work (Planning Screen -> spawn -> run over to where they were working).

My eventual solution to this was to build an extension to the editor’s “Play in Editor” (PIE) menu. This brought everything developers would need to configure for testing into one single centralised place; one which they were already using to test the game anyway.
