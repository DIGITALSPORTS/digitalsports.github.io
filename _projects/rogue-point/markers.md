---
title: Planning and Markers System
layout: project-text
order: 12
nav_section: portfolio
portfolio_group: rogue-point
subtitle: UE4 - Code
game: Rogue Point
discipline: Code
date_text: 2026
hero_image: /images/rogue-point/planning-01.jpg
card_image: /images/rogue-point/planning-01.jpg
excerpt_text: A complex and twisting Oilrig at night.

---

Rogue Point has a robust system of user interface markers that we show to players, to help them orient themselves in the world and stay aware of the locations of important resources and objectives. These markers are shown to players in 3 "spaces": the Planning Screen, the Compass, and in the World. Initially, we were handling these in a bespoke way (a unique implementation for each of these 3 spaces). At roughly the halfway point in development, it became clear that this approach necessitated too high a code cost, as implementing new features and changing marker behaviours became very complex, particularly as we continued to iterate the Planning Screen and Intel system.

While building the version of the Planning Screen that we would ship with the game, I decided to refactor these disparate systems into a single centralised actor component class called the Marker Component. This meant that the 3 different types of marker widgets would be able to bind to this centralised component in a consistent way, and all respond to any of its changes as they individually needed. This would mean that designers/code would only need to learn and interact with one single API (that of the Marker Component itself) and the way that the individual types of markers responded would be abstracted away as an implementation detail.

<pre class="code-block"><code><span class="code-macro">DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam</span><span class="code-punc">(</span><span class="code-func">FOnMarkerAppearanceChangedSignature</span><span class="code-punc">,</span> <span class="code-keyword">const</span> <span class="code-struct">FMarkerAppearance</span><span class="code-operator">&amp;</span><span class="code-punc">,</span> <span class="code-var">InAppearance</span><span class="code-punc">);</span> 

<span class="code-keyword">void</span> <span class="code-class">UTangoMarkerComponent</span><span class="code-punc">::</span><span class="code-func">SetMarkerAppearance</span><span class="code-punc">(</span><span class="code-keyword">const</span> <span class="code-struct">FMarkerAppearance</span><span class="code-operator">&amp;</span> <span class="code-var">InMarkerAppearance</span><span class="code-punc">)</span>
<span class="code-punc">{</span>
  <span class="code-member">Appearance</span> <span class="code-operator">=</span> <span class="code-var">InMarkerAppearance</span><span class="code-punc">;</span>
  <span class="code-func">OnRep_Appearance</span><span class="code-punc">();</span>
<span class="code-punc">}</span>

<span class="code-keyword">void</span> <span class="code-class">UTangoMarkerComponent</span><span class="code-punc">::</span><span class="code-func">OnRep_Appearance</span><span class="code-punc">()</span>
<span class="code-punc">{</span>
  <span class="code-member">OnAppearanceChanged</span><span class="code-punc">.</span><span class="code-func">Broadcast</span><span class="code-punc">(</span><span class="code-member">Appearance</span><span class="code-punc">);</span>
<span class="code-punc">}</span></code></pre>

Designers thus only need to call SetMarkerAppearance() on the Marker Component. The 3 individual marker widgets will be listening for this change, which passes through the new "Appearance" struct. Here is an example from the Marker Widget base class, which is called when the widget is first instantiated:

<pre class="code-block"><code><span class="code-keyword">void</span> <span class="code-class">UTangoMarkerWidget</span><span class="code-punc">::</span><span class="code-func">MarkerWidgetSetup</span><span class="code-punc">()</span>
<span class="code-punc">{</span>
  <span class="code-comment">// Bind to the marker component's appearance, and then manually update once for the first time</span>
  <span class="code-member">MarkerComponent</span><span class="code-operator">-&gt;</span><span class="code-member">OnAppearanceChanged</span><span class="code-punc">.</span><span class="code-func">AddUniqueDynamic</span><span class="code-punc">(</span><span class="code-keyword">this</span><span class="code-punc">,</span> <span class="code-operator">&amp;</span><span class="code-class">ThisClass</span><span class="code-punc">::</span><span class="code-func">MarkerAppearanceChanged</span><span class="code-punc">);</span>
  <span class="code-func">MarkerAppearanceChanged</span><span class="code-punc">(</span><span class="code-member">MarkerComponent</span><span class="code-operator">-&gt;</span><span class="code-member">Appearance</span><span class="code-punc">);</span>
<span class="code-punc">}</span>

<span class="code-keyword">void</span> <span class="code-class">UTangoMarkerWidget</span><span class="code-punc">::</span><span class="code-func">MarkerAppearanceChanged</span><span class="code-punc">(</span><span class="code-keyword">const</span> <span class="code-struct">FMarkerAppearance</span><span class="code-operator">&amp;</span> <span class="code-var">InAppearance</span><span class="code-punc">)</span>
<span class="code-punc">{</span>
  <span class="code-member">Appearance</span> <span class="code-operator">=</span> <span class="code-var">InAppearance</span><span class="code-punc">;</span>

  <span class="code-comment">// Update our icon and tint if we are able to</span>
  <span class="code-keyword">if</span><span class="code-punc">(</span><span class="code-func">IsValid</span><span class="code-punc">(</span><span class="code-member">Icon</span><span class="code-punc">)</span> <span class="code-operator">&amp;&amp;</span> <span class="code-operator">!</span><span class="code-member">Appearance</span><span class="code-punc">.</span><span class="code-struct">IconTexture</span><span class="code-punc">.</span><span class="code-func">IsNull</span><span class="code-punc">())</span>
  <span class="code-punc">{</span>
    <span class="code-member">Icon</span><span class="code-operator">-&gt;</span><span class="code-func">SetBrushFromLazyTexture</span><span class="code-punc">(</span><span class="code-member">Appearance</span><span class="code-punc">.</span><span class="code-struct">IconTexture</span><span class="code-punc">);</span>
    <span class="code-member">Icon</span><span class="code-operator">-&gt;</span><span class="code-func">SetBrushTintColor</span><span class="code-punc">(</span><span class="code-member">Appearance</span><span class="code-punc">.</span><span class="code-struct">ColorTint</span><span class="code-punc">);</span>
  <span class="code-punc">}</span>

  <span class="code-comment">// Dispatch BP event so BPs can do additional updates if needed</span>
  <span class="code-func">BP_MarkerAppearanceChanged</span><span class="code-punc">(</span><span class="code-member">Appearance</span><span class="code-punc">);</span>
<span class="code-punc">}</span></code></pre>

I was also building this in conjunction with the Planning Screen. Initial versions of the Planning Screen calculated the location of the markers on the Planning Screen as the screen was initializing. This caused some strange issues with marker positions being out of sync between clients, and I also did not like this design on principle. The Planning Cameras and all the Marker Components are information that is inherently baked into the level, so it would make sense for their locations to be static information that clients could simply load from disk.

<div class="image main">
	<img src="{{ '/images/rogue-point/planning-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

My simple solution to this was for every Marker Component to store a map of “Planning Locations”. When calculating this variable, we would iterate every Planning Camera in the level. For each Planning Camera, we calculated mathematically if it was possible for that Marker to appear within its view. If it was, we used some math to create a 2D screen space position for it, using a range of 0,0 (top left) -> 1,1 (bottom right). We then just had a simple utility within the level’s Planning Phase Manager to run this calculation and save the data from it.

This worked amazingly because it meant that clients loading into the level needed to only replicate and rely on one single variable (the Chosen Level Layout) to be able to fully populate the Planning Screen with the relevant markers. They would also need to populate any spawned actors dynamically (such as objectives), but this was as simple as using another replicated variable within the Chosen Level Layout. Clients already had the location of every objective spawner within the level.
