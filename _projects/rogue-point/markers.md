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

Rogue Point has a robust system of user interface markers that we show to players, to help them orient themselves in the world and stay aware of the locations of important resources and objectives. These markers are shown to players in 3 "spaces": the <strong>Planning Screen</strong>, the <strong>Compass</strong>, and in the <strong>World</strong>. Initially, we were handling these in a bespoke way (a unique implementation for each space. At roughly the halfway point in development, it became clear that this approach necessitated too high a code cost, as implementing new features and changing marker behaviours became very complex, particularly as we continued to iterate the Planning Screen and Intel system.

## Marker Component

While building the version of the Planning Screen that we would ship with the game, I decided to refactor these disparate systems into a single centralised actor component class called the Marker Component. This meant that the 3 different types of marker widgets would be able to bind to this centralised component in a consistent way, and all respond to any of its changes as they individually needed. This would mean that designers/code would only need to learn and interact with one single API (that of the Marker Component itself) and the way that the individual types of markers responded would be abstracted away as an implementation detail.

For example, here is the core code for changing the basics of a marker's appearance. It is extremely straightforward:

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

To update the basics of a marker's appearance, designers thus only need to call this very simple SetMarkerAppearance() function. The 3 individual marker widgets will be listening for this change, which passes through the new "Appearance" struct in a way that is replicated for clietns too. Here is an example from the Marker Widget base class, which is called when the widget is first instantiated:

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

Individual implementations for the 3 widget spaces then build off this base implementation, allowing flexible handling of the Marker Components, and keeping markers consistent between the 3 spaces. Furthermore, designers could create a marker for any actor simply by adding a Marker Component to it and populating the relevant properties, and it would immediately be fully supported by the Planning Screen, Compass and World.

<div class="image main">
	<img src="{{ '/images/rogue-point/planning-01.jpg' | relative_url }}" alt="Oilrig at night" />
</div>

## Planning Screen

As this system was built in conjunction with the Planning Screen, I also incorporated a statically baked system for calculating the widget location of the markers. Initial versions of the Planning Screen calculated the location of these markers locally as each client's screen was initializing. This caused some issues with marker positions being out of sync between clients, and I also did not like this design in principle. The Planning Cameras and the location of all Marker Components are information that is inherently baked into the level, so it would make sense for their locations to be static information that clients could simply load from disk, saving network traffic and potential for errors.

My simple solution to this was for every Marker Component to store a TMap of “Planning Locations”. When calculating this variable, we would iterate every Planning Camera in the level. For each Planning Camera, we calculated mathematically if it was possible for that Marker Component to appear within its view. If it was, we used some math to create a 2D screen space position for it, using a range of 0,0 (top left) -> 1,1 (bottom right). We then just had a simple utility within the level’s Planning Phase Manager to run this calculation and save the data from it. Here are some simplified excerpts of how I accomplished that:

<pre class="code-block"><code><span class="code-keyword">void</span> <span class="code-class">ATangoPlanningPhaseManager</span><span class="code-punc">::</span><span class="code-func">CalculateMarkerWidgetLocations</span><span class="code-punc">(</span><span class="code-class">UTangoMarkerComponent</span><span class="code-operator">*</span> <span class="code-var">InComp</span><span class="code-punc">,</span> 
<span class="code-keyword">const</span> <span class="code-class">TArray</span><span class="code-operator">&lt;</span><span class="code-class">ATangoPlanningCamera</span><span class="code-operator">*</span><span class="code-operator">&gt;</span><span class="code-operator">&amp;</span> <span class="code-var">InCameras</span><span class="code-punc">)</span> <span class="code-keyword">const</span>
<span class="code-punc">{</span>
  <span class="code-var">InComp</span><span class="code-operator">-&gt;</span><span class="code-func">ClearPlanningLocations</span><span class="code-punc">();</span>
  <span class="code-keyword">if</span><span class="code-punc">(</span><span class="code-var">InCameras</span><span class="code-punc">.</span><span class="code-func">Num</span><span class="code-punc">()</span> <span class="code-operator">&lt;</span> <span class="code-number">1</span><span class="code-punc">)</span>
  <span class="code-punc">{</span>
    <span class="code-keyword">return</span><span class="code-punc">;</span>	
  <span class="code-punc">}</span>
  <span class="code-keyword">for</span><span class="code-punc">(</span><span class="code-class">ATangoPlanningCamera</span><span class="code-operator">*</span> <span class="code-var">Camera</span> <span class="code-operator">:</span> <span class="code-var">InCameras</span><span class="code-punc">)</span>
  <span class="code-punc">{</span>
    <span class="code-var">InComp</span><span class="code-operator">-&gt;</span><span class="code-func">CalculatePlanningLocationForCamera</span><span class="code-punc">(</span><span class="code-var">Camera</span><span class="code-punc">);</span>
  <span class="code-punc">}</span>
<span class="code-punc">}</span>

<span class="code-keyword">void</span> <span class="code-class">UTangoMarkerComponent</span><span class="code-punc">::</span><span class="code-func">CalculatePlanningLocationForCamera</span><span class="code-punc">(</span><span class="code-class">ATangoPlanningCamera</span><span class="code-operator">*</span> <span class="code-var">InCamera</span><span class="code-punc">)</span>
<span class="code-punc">{</span>
  <span class="code-keyword">if</span><span class="code-punc">(</span><span class="code-operator">!</span><span class="code-func">IsValid</span><span class="code-punc">(</span><span class="code-var">InCamera</span><span class="code-punc">))</span>
  <span class="code-punc">{</span>
    <span class="code-keyword">return</span><span class="code-punc">;</span>
  <span class="code-punc">}</span>
  <span class="code-comment">/* Get our World Location from whatever our attached actor tells us via delegate, if needed. </span>
  <span class="code-comment"> * Otherwise, just use the Marker Component's location */</span>
  <span class="code-keyword">const</span> <span class="code-class">FVector</span> <span class="code-var">Location</span> <span class="code-operator">=</span> <span class="code-member">OnRequestPlanningLocation</span><span class="code-punc">.</span><span class="code-func">IsBound</span><span class="code-punc">()</span> <span class="code-operator">?</span> <span class="code-member">OnRequestPlanningLocation</span><span class="code-punc">.</span><span class="code-func">Execute</span><span class="code-punc">()</span> <span class="code-operator">:</span> <span class="code-func">GetComponentLocation</span><span class="code-punc">();</span>
  <span class="code-class">TOptional</span><span class="code-operator">&lt;</span><span class="code-class">FVector2D</span><span class="code-operator">&gt;</span> <span class="code-var">WidgetLocation</span> <span class="code-operator">=</span> <span class="code-func">CalculatePlanningLocation</span><span class="code-punc">(</span><span class="code-var">Location</span><span class="code-punc">,</span> <span class="code-var">InCamera</span><span class="code-punc">);</span>
  <span class="code-keyword">if</span><span class="code-punc">(</span><span class="code-var">WidgetLocation</span><span class="code-punc">.</span><span class="code-func">IsSet</span><span class="code-punc">())</span>
  <span class="code-punc">{</span>
    <span class="code-member">PlanningLocations</span><span class="code-punc">.</span><span class="code-func">Add</span><span class="code-punc">(</span><span class="code-var">InCamera</span><span class="code-punc">,</span> <span class="code-member">WidgetLocation</span><span class="code-punc">.</span><span class="code-func">GetValue</span><span class="code-punc">());</span>
    <span class="code-var">OnPlanningLocationAdded</span><span class="code-punc">.</span><span class="code-func">ExecuteIfBound</span><span class="code-punc">(</span><span class="code-var">InCamera</span><span class="code-punc">,</span> <span class="code-var">WidgetLocation</span><span class="code-punc">.</span><span class="code-func">GetValue</span><span class="code-punc">());</span>
  <span class="code-punc">}</span>
<span class="code-punc">}</span>

<span class="code-struct">TOptional</span><span class="code-operator">&lt;</span><span class="code-struct">FVector2D</span><span class="code-operator">&gt;</span> <span class="code-class">UTangoMarkerComponent</span><span class="code-punc">::</span><span class="code-func">CalculatePlanningLocation</span><span class="code-punc">(</span><span class="code-keyword">const</span> <span class="code-struct">FVector</span><span class="code-operator">&amp;</span> <span class="code-var">InLocation</span><span class="code-punc">,</span> <span class="code-keyword">const</span> <span class="code-class">ATangoPlanningCamera</span><span class="code-operator">*</span> <span class="code-var">InCamera</span><span class="code-punc">)</span>
<span class="code-punc">{</span>
  <span class="code-struct">TOptional</span><span class="code-operator">&lt;</span><span class="code-struct">FVector2D</span><span class="code-operator">&gt;</span> <span class="code-var">Output</span><span class="code-punc">;</span>
  <span class="code-comment">/* There are 2 tricks here - first we must swap X and Y because in widget space, X = left/right, Y = up/down, but in 3D/world</span>
  <span class="code-comment"> * space relative to a Planning Camera top-down view, X is up/down and Y is left/right. Secondly, we also need to invert the</span>
  <span class="code-comment"> * Y output result. This is because in 3D space relative to the Planning Camera position, moving down = decreasing X, but in</span>
  <span class="code-comment"> * widget space that is represented by increasing X. */</span>
  <span class="code-keyword">const</span> <span class="code-keyword">float</span> <span class="code-var">ResultX</span> <span class="code-operator">=</span> <span class="code-struct">FMath</span><span class="code-punc">::</span><span class="code-func">GetMappedRangeValueUnclamped</span><span class="code-punc">(</span><span class="code-var">InCamera</span><span class="code-operator">-&gt;</span><span class="code-member">YRange</span><span class="code-punc">,</span> <span class="code-member">PlanningSpace</span><span class="code-punc">,</span> <span class="code-var">InLocation</span><span class="code-punc">.</span><span class="code-struct">Y</span><span class="code-punc">);</span>
  <span class="code-keyword">const</span> <span class="code-keyword">float</span> <span class="code-var">ResultY</span> <span class="code-operator">=</span> <span class="code-struct">FMath</span><span class="code-punc">::</span><span class="code-func">GetMappedRangeValueUnclamped</span><span class="code-punc">(</span><span class="code-var">InCamera</span><span class="code-operator">-&gt;</span><span class="code-member">XRange</span><span class="code-punc">,</span> <span class="code-member">PlanningSpaceInverted</span><span class="code-punc">,</span> <span class="code-var">InLocation</span><span class="code-punc">.</span><span class="code-struct">X</span><span class="code-punc">);</span>
  <span class="code-keyword">if</span><span class="code-punc">(</span><span class="code-member">PlanningRange</span><span class="code-punc">.</span><span class="code-func">Contains</span><span class="code-punc">(</span><span class="code-var">ResultX</span><span class="code-punc">)</span> <span class="code-operator">&amp;&amp;</span> <span class="code-member">PlanningRange</span><span class="code-punc">.</span><span class="code-func">Contains</span><span class="code-punc">(</span><span class="code-var">ResultY</span><span class="code-punc">))</span>
  <span class="code-punc">{</span>
    <span class="code-var">Output</span> <span class="code-operator">=</span> <span class="code-struct">FVector2D</span><span class="code-punc">(</span><span class="code-var">ResultX</span><span class="code-punc">,</span> <span class="code-var">ResultY</span><span class="code-punc">);</span> <span class="code-comment">// Check result is within 0 - 1 and then set Output</span>
  <span class="code-punc">}</span>
  <span class="code-keyword">return</span> <span class="code-var">Output</span><span class="code-punc">;</span>
<span class="code-punc">}</span></code></pre>

This worked amazingly because it meant that clients loading into the level needed to only replicate and rely on one single variable (the Chosen Level Layout) to be able to fully populate the Planning Screen with the relevant markers for that layout. They would also need to populate any spawned actors dynamically (such as objectives), but this was as simple as using another replicated actor TArray within the Chosen Level Layout.

