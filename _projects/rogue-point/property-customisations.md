---
title: Property Customisations
layout: project-text
order: 9
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
hero_image: /images/rogue-point/property-customisations-01.jpg
card_image: /images/rogue-point/property-customisations-01.jpg
excerpt_text: A set of editor customisations designed to make commonly used data structures easier to read and edit, especially when nested or used in containers.

---
Rogue Point relied heavily on a number of commonly used data structures. One example is <code>FRandomRoll</code>, which defines the chance for a given number of items to be selected.

These structures were often nested inside other structs or containers such as arrays and maps, giving designers fine-grained control over randomisation, but also making them increasingly difficult to read and work with.

As our level setups became more complex, understanding these values at a glance became a challenge. Important information was buried behind multiple layers of dropdowns and spread across several lines. To address this, I implemented a series of custom property layouts using Unreal’s property customisation system.

{% include project-image.html
	src="/images/rogue-point/property-customisations-01.jpg"
	alt="Property Customisations"
	title="Property Customisations" %}

For example, I condensed the <code>FRandomRoll</code> struct into a single-line representation. This made it far easier to read and edit when used in nested structures or containers.

While a small change in isolation, improvements like this significantly reduced friction when working in the editor, especially across large, complex datasets like those used by the [Modular Randomization System]({% link _projects/rogue-point/randomization.md %}).

Here is a function within the <code>FRandomRoll</code> struct customisation:

{% include code-snippets/property-customisations.html %}