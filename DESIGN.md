---
name: Сюжетная дыра — тренажёр «Ионыч»
description: Один мир «Архив» — печатная архивная карточка в паспарту, где единственный жест руки красный, а смена раздела уносит экран лепестками.
colors:
  ivory: "#f4eee3"
  paper: "#fbf8f2"
  white: "#ffffff"
  ink: "#231b18"
  ink-soft: "#6b5f57"
  wine: "#6b1b24"
  wine-deep: "#3f0e14"
  gold: "#b08d4f"
  blush: "#f0cfda"
  mark-red: "#d1352e"
  hair: "rgba(35, 27, 24, 0.14)"
  wrong-wash: "#f6ecec"
  scrim: "rgba(16, 14, 13, 0.42)"
typography:
  display:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(3.4rem, 19vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2.1rem, 9vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  headline-question:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(1.75rem, 7.4vw, 2.35rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  title-result:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.2
  section:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.625rem"
    fontWeight: 400
    lineHeight: 1.2
  subhead:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.4375rem"
    fontWeight: 400
    lineHeight: 1.2
  numeral:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.2em"
  card-title:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.3
  lead:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.35
  action:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.2
  quote:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-small:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.2
  micro:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.06em"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.12em"
  label-strong:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  none: "0"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "26px"
  2xl: "44px"
  3xl: "60px"
components:
  button-primary:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.ivory}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "52px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.wine-deep}"
    textColor: "{colors.ivory}"
  button-primary-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.wine}"
    typography: "{typography.quote}"
    rounded: "{rounded.none}"
    height: "50px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    padding: "0 0 2px"
  option:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.quote}"
    rounded: "{rounded.none}"
    padding: "17px 18px 15px"
    width: "100%"
  option-idle:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
  option-wrong:
    backgroundColor: "{colors.wrong-wash}"
    textColor: "{colors.ink}"
  slip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.card-title}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.card-title}"
    rounded: "{rounded.none}"
    padding: "15px 17px"
    width: "100%"
  input-answer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.card-title}"
    rounded: "{rounded.none}"
    padding: "9px 4px"
    height: "48px"
    width: "100%"
  input-answer-focus:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 11px"
  tab-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.wine}"
  tab-active:
    backgroundColor: "transparent"
    textColor: "{colors.wine-deep}"
  slot:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.quote}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
    height: "56px"
    width: "100%"
  slot-active:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  bank-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "13px 15px"
    height: "48px"
    width: "100%"
  sheet-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "22px 20px 26px"
---

# Design System: Сюжетная дыра — тренажёр «Ионыч»

## Overview

**Creative North Star: "Архивная карточка под паспарту"**

The shipped product has exactly one world. Earlier the project carried three
parallel visual worlds side by side for comparison; the user resolved that
round in favour of «Архив», and the other two were deleted from the codebase
along with the variant switcher. What remains is the pinned book world of
`Референсы/design-system.md` brought down from a long scrolling story into a
tool a student operates: ivory ground, a hairline passe-partout framing the
viewport, gold rules and Roman numerals for structure, wine for every action,
and a single red mark that reads as a human hand on printed paper.

The density is quiet and typographic. There are no shadows anywhere in the
stylesheet and no corner radius anywhere — not one `box-shadow`, not one
`border-radius`. Separation is done by tone (paper on ivory) and by hairlines;
emphasis is done by a gold rule or a wine fill. Everything else is type: a
high-contrast display serif over a reading serif, with a single sans reserved
for micro-labels that must not be mistaken for prose.

The one theatrical device is the rose-petal transition, and the build treats it
as an event rather than decoration, exactly as §8 of the pinned source demands:
it fires on real scene changes only, drifts slowly on the title screen where
there is no reading text, and does not exist at all under reduced motion.

**Key Characteristics:**
- Ivory ground with a fixed 1px hairline passe-partout inset 8px from the viewport
- Zero shadows, zero radius; separation by paper tone and hairlines
- Gold for structure (rules, Roman numerals, field labels), wine for action
- Red only as a hand-drawn oval, never as type
- Playfair Display + Literata + Inter — a Cyrillic-capable substitution for the pinned Fraunces + EB Garamond + Inter, roles unchanged
- Procedural WebGL petals on scene change, with a 2D canvas fallback and a reduced-motion off switch

## Colors

A warm printed palette: aged ivory paper, two depths of wine, a leaf gold for
rules and numerals, and one open red that belongs to a pen.

### Primary
- **Wine** (`wine`): the only action colour. Filled primary buttons (next
  question, check answers, retake), the active progress numeral, the link
  inside a verdict, the focus ring, the border of a wrongly chosen option, and
  the caption of a filled match slot.
- **Deep Wine** (`wine-deep`): the darkest ink of the world. Titles, question
  traits, section headings, and the hover state of every filled wine button.

### Secondary
- **Leaf Gold** (`gold`): structure, never action. The rule under the title
  plate and the tab bar, the left edge of a catalogue slip, Roman numerals and
  step numbers, `dt` field labels inside the hero sheet and the spravka facts
  grid, and the hover border of an option or a card.

### Tertiary
- **Mark Red** (`mark-red`): reserved for the hand-drawn oval — the active tab
  and the correct option. It is the only colour in the system that is not
  printed, and the only one that carries no structural job.
- **Blush** (`blush`): the reverse face of a petal in the transition and the
  selection highlight behind selected text.

### Neutral
- **Ivory** (`ivory`): the page ground everywhere, and the text colour that
  sits on a wine fill.
- **Paper** (`paper`): the raised-by-tone surface — catalogue slips, options,
  cards, match slots, the hero sheet panel, the fact cells, and the tab hover.
- **Paper White** (`white`): a second step up, used only to mark the one thing
  currently being acted on: a focused answer field and the active match slot.
- **Ink** (`ink`) / **Soft Ink** (`ink-soft`): body text and its quieter
  register — prompts, sources, counts, disabled and not-yet-answered states.
- **Hairline** (`hair`): every divider, frame and default border, at 1px.
- **Wrong Wash** (`wrong-wash`): the faint wine-tinted fill behind an option the
  student chose and got wrong.
- **Scrim** (`scrim`): the dimmer behind the hero sheet; the only translucent
  overlay in the build.

### Named Rules
**The Reserved Mark Rule.** Mark red draws the oval and nothing else. It is not
a text colour, not a border colour, not a state colour. If something needs to
read as wrong, it gets wine and a strike-through, not red type.

**The Gold Is Structure Rule.** Gold never invites a tap. It rules, numbers and
labels; the moment a gold element becomes the primary action, the surface has
lost its hierarchy.

**The One Action Colour Rule.** Wine is the only colour a student can act on.
A screen carries at most one wine fill at a time.

## Typography

**Display Font:** Playfair Display (with Iowan Old Style, Georgia, serif)
**Body Font:** Literata (with Georgia, Times New Roman, serif)
**Label Font:** Inter (with ui-sans-serif, system-ui)

**Character:** A printed book, not an app. The display serif is high-contrast
and tightly tracked at large sizes; the reading serif is wide-countered and set
generously (root 16px / 1.6) so a four-hundred-character quote stays readable
on a phone. Inter appears only in small uppercase with wide tracking, where it
reads as a catalogue stamp rather than as interface chrome.

The pinned source names Fraunces for display and EB Garamond for body. Neither
covers Cyrillic, so the build substitutes Playfair Display and Literata with the
roles unchanged. Inter is kept as the source pins it, and that keep is recorded
as a narrow ignore in `.impeccable/config.json`.

### Hierarchy
- **Display** (Playfair 500, `clamp(3.4rem, 19vw, 6rem)`, 0.9): the work's title
  on the entry plate. Once per product.
- **Headline** (Playfair 400, `clamp(2.1rem, 9vw, 3rem)`, 1.04): the spravka
  page title.
- **Headline (question)** (Playfair 400, `clamp(1.75rem, 7.4vw, 2.35rem)`,
  1.14, balanced wrap): the character trait — the one thing the screen asks.
- **Title / Section / Subhead** (Playfair 400, 2.25 / 1.75 / 1.625 / 1.4375rem):
  result heading, hero sheet name, spravka section heading over a gold rule,
  entry section link.
- **Numeral** (Playfair, 1.5rem, gold or wine): Roman progress and step numbers.
- **Card title / Lead** (Playfair 400, 1.25 / 1.1875rem): card names, match prompt.
- **Quote** (Literata 400, 1.0625rem / 1.55): every quotation, answer option and
  timeline excerpt, wrapped in guillemets by CSS `quotes`.
- **Body** (Literata 400, 1rem / 1.55; small 0.9375rem / 1.6): explanations,
  verdict reasoning, sheet fields. Measure capped at 44–48ch for prose, 64–68ch
  for a screen.
- **Label** (Inter 500/600, 0.6875 / 0.625rem, uppercase, 0.1–0.22em): sources,
  roles, field names, chapter numbers, imprint.
- **Italic display** is a real voice here, not an accident: notes, leads,
  aliases and "why" lines are set in Playfair italic at body sizes.

### Named Rules
**The Cyrillic Coverage Rule.** A face that cannot render Cyrillic cannot hold a
role in this product, however well it fits the reference. Substitute the face,
keep the role.

**The Quote Is the Object Rule.** Quote text is never smaller than 1.0625rem and
never truncated, clamped or scrolled. Everything around it may shrink first.

**The Micro-Label Rule.** Inter appears only at 0.625–0.6875rem, uppercase, with
at least 0.1em tracking. Inter at reading size is out of the world.

## Layout

Mobile-first from 390px with a 360px floor: no horizontal scroll at 360px, and
the primary action is always reachable in the bottom third.

The stage is a passe-partout. `.stage` runs the full dynamic viewport height as
a column with 14px inline padding, and a fixed 1px hairline frame sits inset 8px
from all four edges, above the content but transparent to pointer events. Safe
area insets are added top and bottom.

Content sits in one centred column: 68ch for the entry, spravka, tabs and exam;
64ch for the question screen. Vertical rhythm is loose and typographic rather
than gridded — sections open at 44–60px, blocks breathe at 18–26px, and rows sit
10–16px apart.

Three breakpoints: **560px** (tabs tighten — smaller label size, less tracking,
narrower padding), **760px** (two-column catalogue slips, character cards, places,
and the match board splitting into slots-and-bank side by side), **900px**
(entry gets more head room and the hero sheet changes from a bottom sheet to a
right-hand panel of `min(420px, 38vw)`).

Two elements are sticky: the tab bar at the top and the primary-action footer at
the bottom, each fading into the ivory ground with a one-colour gradient rather
than a border.

### Named Rules
**The Reachable Answer Rule.** The thing the student taps lives in the lower
third and is at least 48px tall — 52px for a full-width primary action.

**The One Column Rule.** Below 760px there is exactly one column. Multi-column
layout is an enhancement, never the thing that makes a screen work.

## Elevation & Depth

The system is flat and paper-based. There is not a single `box-shadow` in the
build. Depth is tonal: ivory ground, paper surfaces on it, paper-white for the
one element being acted on, and hairlines for every edge. The only true overlay
is the hero sheet, which earns its layer with a translucent scrim rather than a
shadow.

Motion is the other depth cue, and it is rationed. The petal transition is a
procedural WebGL scene (Three.js `InstancedMesh`; the petal is a parametric
surface built in code — tapering width, a lengthwise bend and a cross-wise cup —
shaded two-sided so the reverse reads blush and the face reads wine, with no
`.glb` asset anywhere). It degrades to a 2D canvas field on low-core or
low-memory devices and when WebGL is unavailable, and it is not mounted at all
under `prefers-reduced-motion`. It fires only on real scene changes — entering a
section, finishing a test set — plus a slow ambient drift on the title screen,
which is the only screen with no reading text.

Everything else moves at 160ms ease-out (colour and border state), 200–260ms for
the sheet and the petal canvas fade, and the hand mark draws in 520ms as four
discrete steps.

### Named Rules
**The Unlit Paper Rule.** Nothing in this world casts a shadow. If an element
needs to separate, give it paper tone and a hairline.

**The Petals Are an Event Rule.** The petal transition belongs to a change of
scene. It never fires on an ordinary click, never over a block of reading text,
and never at all under reduced motion.

**The Four Steps Rule.** The red oval animates in `steps(4)`, not smoothly. A
mark that fades in reads as a graphic; a mark that lands in steps reads as drawn.

## Shapes

There is no corner radius in this system — every surface, button, field, card
and sheet is a square-cornered rectangle. The form language is entirely rules
and edges: a 1px hairline for ordinary borders and dividers; a gold left edge
(1–2px) to mark a catalogue slip, a filled slot or a quotation; a gold border
block above and below the title plate and under section headings; a dashed
border for a bank option already used; a 38×38px squared numeral box on the
timeline, connected by a 1px vertical hairline.

Against all of that straightness, the only curve in the world is the hand-drawn
oval: an inline SVG stroke in mark red, 1.8–2.2px, rotated -1.4deg over an
answer and drawn tight around the active tab. It is the system's signature
precisely because nothing else bends.

## Components

### Buttons
- **Shape:** square (0 radius) without exception.
- **Primary:** full width, 52px minimum height, wine fill on a wine border, ivory
  label in Playfair 1.125rem. Used for "next question" in a sticky footer over an
  ivory gradient, and for "check" on the exam.
- **Hover:** fill deepens to deep wine over 160ms.
- **Disabled:** transparent fill, soft ink label, hairline border, `not-allowed`.
- **Outline (secondary):** transparent fill, wine label, gold border, 50px, used
  beside the primary on the result screen.
- **Quiet (tertiary):** bare text with a 1px gold or hairline underline and a
  micro-label typeface — "skip the warm-up", "open the character", "back".

### Cards / Containers
- **Corner style:** square.
- **Catalogue slip (entry):** paper on ivory, hairline border with a gold left
  edge, 14px 16px, display name over an Inter micro-label role. Two columns from
  760px. A minor character's slip drops to 1.0625rem soft ink.
- **Character card (spravka):** same material, 2px gold left edge, 15px 17px,
  tappable, hover raises the border to gold.
- **Facts grid:** a 2-column hairline-gap grid where the grid background *is* the
  hairline colour, so the cells read as a ruled table.

### Inputs / Fields
- **Style:** paper fill, no box — a single 1px soft-ink bottom rule, 48px tall,
  answer set in Playfair 1.25rem so the student's word looks printed.
- **Focus:** underline goes wine, fill goes paper-white, native outline removed.
- **Right / wrong:** the underline takes the state colour and a small uppercase
  verdict appears beneath it.

### Navigation
- **Entry sections:** a rule-bordered list, each row a gold Roman numeral, a wine
  section name in display, and a right-aligned uppercase subtitle; hover washes
  the row to paper.
- **Tab bar:** sticky, the work's name on the left over a gold underline, three
  tabs right-aligned, each a gold Roman numeral plus an Inter uppercase name.
  The current tab is marked by the hand-drawn oval, not by an underline or a
  fill. Below 560px the labels drop to 0.625rem and tighten.

### Answer Option (signature)
A full-width paper plate with a hairline, 17px 18px 15px, quote in Literata
wrapped in guillemets by generated content, source beneath as an uppercase
micro-label. Hover raises the border to gold. Unanswered and pending options go
transparent with soft-ink text so the chosen one stands out. A wrong choice
takes a wine border, the faint wrong wash, and a 1px strike-through in
half-opacity wine. The correct option receives the mark.

### Hand Mark (signature)
An inline SVG oval in mark red, positioned absolutely over the element, revealed
by animating `clip-path: inset(0 100% 0 0)` to zero in `steps(4, end)` over
520ms after a 90ms beat. Over an answer it is rotated -1.4deg and inset to clear
the source line; over the active tab it sits tight at -3px/-6px with a heavier
2.2px stroke. Under reduced motion it appears fully drawn with no animation.

### Verdict (signature)
The explanation appears in place, in the page body, directly under the option
just answered — never a modal and never a new screen. It is a block indented
15px behind a 1px gold left rule: an uppercase lead, the reasoning in soft ink,
and, when the student was wrong, a second block above a hairline carrying the
correct quote, its source and its reason.

### Match Board (signature)
Positions and options, no dragging: tapping a slot arms it, tapping a bank item
fills it, and the same two taps work identically on any screen. A slot is a
paper row with a gold display key, 56px tall; armed it goes paper-white with a
wine border, filled it gains a 2px gold left edge and shows the chosen text in
body type. A used bank item switches its border to dashed and drops to soft ink.
The assembled answer prints as a spaced digit code in display type. From 760px
the two lists sit side by side like a paper answer sheet.

### Hero Sheet
One dialog for the whole product. Bottom sheet up to 82dvh on phones, sliding in
on a 260ms custom ease; from 900px a right-hand panel of `min(420px, 38vw)`. Paper
fill, a 2px gold edge on the entry side (top on mobile, left on desktop), scrim
behind, and gold uppercase `dt` labels over body `dd` values. It always returns
focus to where it was opened from, and its transitions collapse to 1ms under
reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep the passe-partout: a fixed 1px hairline frame inset 8px, above the
  content and transparent to pointer events.
- **Do** separate surfaces with paper tone and hairlines, and mark structure with
  gold rules and Roman numerals.
- **Do** give the screen exactly one wine action, at least 48px tall, in the
  lower third.
- **Do** set every quotation in Literata at 1.0625rem or larger, in guillemets,
  in full.
- **Do** keep Inter small, uppercase and tracked; keep Playfair for anything that
  is read as a name or a heading.
- **Do** treat the petal transition as a scene change, and ship the 2D fallback
  and the reduced-motion path alongside it.
- **Do** quote the source text verbatim — every quote, speaker and chapter comes
  from `Референсы/ионыч-подлинный-текст.txt` (Чехов, ПСС в 30 т., т. 10, Наука
  1986). Nothing about a quote may be generated, including in placeholders,
  demos and examples.

### Don't:
- **Don't** use mark red as a text, border or state colour. It draws the oval and
  nothing else.
- **Don't** add a shadow or a corner radius to anything in this world.
- **Don't** fire the petal transition on an ordinary click, or run the ambient
  drift over a screen with text to be read.
- **Don't** make gold the primary action or let a gold rule stand in for a button.
- **Don't** put an explanation behind a modal or a second screen; it belongs under
  the answer that earned it.
- **Don't** signal right and wrong by colour alone — the mark, the strike-through
  and the wording carry the verdict.
- **Don't** shrink, clamp or scroll a quotation to make a layout fit.
