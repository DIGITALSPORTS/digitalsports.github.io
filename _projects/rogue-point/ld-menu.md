---
title: Level Design Menu
layout: project-text
order: 10
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code (Editor)
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/ld-menu-01.jpg
card_image: /images/rogue-point/ld-menu-01.jpg
excerpt_text: A custom menu for Rogue Point which extends UE4 "Play in Editor" menu, to reduce friction in testing Rogue Point and incorporate multiple handy features for designers and artists.

---

Rogue Point is a challenging game to playtest using the default Unreal Engine flow. The nature of the [Modular Randomization System]({% link _projects/rogue-point/randomization.md %}) means that levels must be loaded with a specific set of configured variables across a variety of placed actors. If any of these are setup incorrectly, they can cause a crash or silent misconfiguration that breaks the level in subtle ways for that playthrough. Furthermore, because we had so many Level Layouts within maps, we needed a way to test specific layouts in the editor with just a few clicks.

For much of development, our solution was to allow designers to override variables on the Manager classes that would typically be populated by the system at runtime. For example, in a typical gameplay flow, the Randomization Manager’s “Chosen Level Layout” variable would be populated in one of two ways. Either the main menu would pass through a value for that variable ahead of loading the level, or the Randomization Manager would detect that a value hadn’t been preset and randomly pick a level layout from the map for the selected difficulty. Level Designers would also need to override certain variables on important blueprints such as Game State and sometimes Player State.

<div class="image main">
	<img src="{{ '/images/rogue-point/ld-menu-02.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

## Drawbacks of Overrides

This worked well enough but had several key limitations. It was extremely common for designers to forget they had overridden these variables, due to the fast nature of development and with just how often we were doing it. Even just one forgotten variable could cause a cascading breaking effect. Sometimes overridden variables would make it onto a cooked build for playtesting. You would think that a good solution would be to ignore overrides in cooked builds, but there were circumstances where we legitimately wanted these to test specific scenarios within a cooked build. Furthermore, as systems kept changing, the blueprints and variables that designers needed to edit variables kept changing as well, and it became quite confusing. 

On top of this, our artists often struggled with putting together test levels or checking their own environment work in-game, because they always had to ensure they were playing on a Level Layout that utilised the section of the map they were working on, and had to always play through a typical game flow to check their work (Planning Screen -> spawn -> run over to where they were working, while getting shot by enemies).

My eventual solution to this was to build an extension to the editor’s “Play in Editor” (PIE) menu. This brought everything developers would need to configure for testing into one single centralised place; one which they were already using to test the game anyway. This also meant that if we needed to manually override anything in a level for testing in a cooked build, we could still do so.

<div class="image main">
	<img src="{{ '/images/rogue-point/ld-menu-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

## Extra Features

The menu also featured an artist-friendly "barebones" mode, which would strip out anything related to our game from the initialization flow. The game would not attempt to pick Level Layouts, spawn enemies, or put you in the planning phase, it would just function as a barebones Unreal installation, spawning you into the level instantly at your editor camera location. This allowed artists to play in their test maps without having to do any boilerplate setup, and made testing the live maps much easier.

I also gave the designers a bunch of new tools in this menu to help them test various common scenarios locally. I was very proud of these! Some examples include:
<ul>
<li><strong>Spectator Cams Mode:</strong> Test mode which spawns and immediately kills you without ending the game, so you can test setup for the dead player spectator camera system.</li>
<li><strong>Extraction Wave Mode:</strong> Test mode which immediately wins the game and teleports you to the Extraction Zone, immediately starting the level's ending Extraction horde so you can playtest its balance without playing the whole level.</li>
<li><strong>Simulated Players:</strong> Designers could fool any systems which depend on player count into thinking there were more players than there were. Allowed designers to test multiplayer scenarios locally in an easy way.</li>
<li><strong>Log Randomization:</strong> Would record loads of data about the randomization into a .csv file, which you could aggregate to understand the balance of the Level Layout. Included info about things such as: number of enemies spawned, where objectives spawned.</li>
</ul>

This really helped accelerate testing across development and was an amazing quality of life tool for everyone working on the game. On any future project, I would be sure to build one or have the coders build one!

{% include code-snippets/ld-menu-table.html %}