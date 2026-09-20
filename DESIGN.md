---
name: Сюжетная дыра — тренажёр «Ионыч»
description: Три параллельных визуальных мира одного тренажёра по литературе, изолированных атрибутом [data-world] и сравниваемых бок о бок.
colors:
  arhiv-ivory: "#f4eee3"
  arhiv-paper: "#fbf8f2"
  arhiv-ink: "#231b18"
  arhiv-ink-soft: "#6b5f57"
  arhiv-wine: "#6b1b24"
  arhiv-wine-deep: "#3f0e14"
  arhiv-gold: "#b08d4f"
  arhiv-blush: "#f0cfda"
  arhiv-mark-red: "#d1352e"
  arhiv-hair: "rgba(35, 27, 24, 0.14)"
  tetrad-paper: "#fbf9f2"
  tetrad-rule: "rgba(83, 122, 173, 0.19)"
  tetrad-rule-strong: "rgba(83, 122, 173, 0.38)"
  tetrad-pen: "#1f3a6e"
  tetrad-pen-soft: "#56627e"
  tetrad-graphite: "#2f3033"
  tetrad-red: "#d4342a"
  kanon-ground: "#fdf6f1"
  kanon-card: "#ffffff"
  kanon-text: "#241c17"
  kanon-text-soft: "#7a6a60"
  kanon-line: "#efe2d9"
  kanon-action: "#4f46e5"
  kanon-action-deep: "#3f37c9"
  kanon-ok: "#15803d"
  kanon-ok-bg: "#eefaf1"
  kanon-no: "#c8352b"
  kanon-no-bg: "#fdf0ef"
  switcher-ground: "#16161a"
  switcher-ink: "#e8e8ea"
  switcher-ink-dim: "#85858f"
typography:
  arhiv-display:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(3.4rem, 19vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  arhiv-headline:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(1.75rem, 7.4vw, 2.35rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  arhiv-title:
    fontFamily: "'Playfair Display', 'Iowan Old Style', Georgia, serif"
    fontSize: "1.4375rem"
    fontWeight: 400
    lineHeight: 1.2
  arhiv-body:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  arhiv-label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.2em"
  tetrad-display:
    fontFamily: "Caveat, 'Segoe Script', cursive"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: "72px"
    letterSpacing: "-0.01em"
  tetrad-headline:
    fontFamily: "'Golos Text', ui-sans-serif, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: "48px"
    letterSpacing: "-0.015em"
  tetrad-hand:
    fontFamily: "Caveat, 'Segoe Script', cursive"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "24px"
  tetrad-body:
    fontFamily: "'Golos Text', ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  tetrad-label:
    fontFamily: "'Golos Text', ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "24px"
    letterSpacing: "0.08em"
  kanon-display:
    fontFamily: "Nunito, ui-rounded, ui-sans-serif, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  kanon-headline:
    fontFamily: "Nunito, ui-rounded, ui-sans-serif, system-ui, sans-serif"
    fontSize: "25px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  kanon-title:
    fontFamily: "Nunito, ui-rounded, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 800
    lineHeight: 1.3
  kanon-body:
    fontFamily: "Nunito, ui-rounded, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  kanon-label:
    fontFamily: "Nunito, ui-rounded, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  arhiv-none: "0"
  tetrad-none: "0"
  kanon-control: "12px"
  kanon-action: "16px"
  kanon-surface: "20px"
  kanon-sheet: "24px"
  kanon-pill: "999px"
  switcher-pill: "999px"
spacing:
  tetrad-cell: "24px"
  tetrad-cell-2: "48px"
  tetrad-cell-3: "72px"
  arhiv-tight: "10px"
  arhiv-inset: "18px"
  arhiv-block: "26px"
  arhiv-section: "44px"
  kanon-gap: "12px"
  kanon-inset: "20px"
  kanon-stack: "22px"
components:
  arhiv-option:
    backgroundColor: "{colors.arhiv-paper}"
    textColor: "{colors.arhiv-ink}"
    typography: "{typography.arhiv-body}"
    rounded: "{rounded.arhiv-none}"
    padding: "17px 18px 15px"
  arhiv-option-wrong:
    backgroundColor: "#f6ecec"
    textColor: "{colors.arhiv-ink}"
  arhiv-next:
    backgroundColor: "{colors.arhiv-wine}"
    textColor: "{colors.arhiv-ivory}"
    rounded: "{rounded.arhiv-none}"
    height: "52px"
    width: "100%"
  arhiv-next-hover:
    backgroundColor: "{colors.arhiv-wine-deep}"
    textColor: "{colors.arhiv-ivory}"
  arhiv-slip:
    backgroundColor: "{colors.arhiv-paper}"
    textColor: "{colors.arhiv-ink}"
    rounded: "{rounded.arhiv-none}"
    padding: "14px 16px"
  tetrad-option:
    backgroundColor: "transparent"
    textColor: "{colors.tetrad-graphite}"
    typography: "{typography.tetrad-body}"
    rounded: "{rounded.tetrad-none}"
    padding: "0 4px"
  tetrad-option-hover:
    backgroundColor: "rgba(31, 58, 110, 0.05)"
    textColor: "{colors.tetrad-graphite}"
  tetrad-next:
    backgroundColor: "{colors.tetrad-pen}"
    textColor: "#ffffff"
    rounded: "{rounded.tetrad-none}"
    height: "48px"
    width: "100%"
  tetrad-next-hover:
    backgroundColor: "#162c55"
    textColor: "#ffffff"
  tetrad-tab:
    backgroundColor: "#ffffff"
    textColor: "{colors.tetrad-pen}"
    rounded: "{rounded.tetrad-none}"
    padding: "0 14px"
    height: "72px"
  tetrad-tab-hover:
    backgroundColor: "{colors.tetrad-pen}"
    textColor: "#ffffff"
  tetrad-progress-cell:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    textColor: "{colors.tetrad-pen-soft}"
    rounded: "{rounded.tetrad-none}"
    size: "24px"
  kanon-option:
    backgroundColor: "{colors.kanon-card}"
    textColor: "{colors.kanon-text}"
    typography: "{typography.kanon-body}"
    rounded: "{rounded.kanon-surface}"
    padding: "16px 18px"
  kanon-option-right:
    backgroundColor: "{colors.kanon-ok-bg}"
    textColor: "{colors.kanon-text}"
  kanon-option-wrong:
    backgroundColor: "{colors.kanon-no-bg}"
    textColor: "{colors.kanon-text}"
  kanon-next:
    backgroundColor: "{colors.kanon-action}"
    textColor: "#ffffff"
    rounded: "{rounded.kanon-action}"
    height: "54px"
    width: "100%"
  kanon-next-hover:
    backgroundColor: "{colors.kanon-action-deep}"
    textColor: "#ffffff"
  kanon-card:
    backgroundColor: "{colors.kanon-card}"
    textColor: "{colors.kanon-text}"
    rounded: "{rounded.kanon-surface}"
    padding: "22px 20px 20px"
  kanon-chip:
    backgroundColor: "#f6efe9"
    textColor: "{colors.kanon-text-soft}"
    rounded: "{rounded.kanon-pill}"
    padding: "5px 12px"
  switcher-item:
    backgroundColor: "transparent"
    textColor: "#b9b9c2"
    rounded: "{rounded.switcher-pill}"
    padding: "5px 11px"
  switcher-item-current:
    backgroundColor: "#f2f2f5"
    textColor: "{colors.switcher-ground}"
---

# Design System: Сюжетная дыра — тренажёр «Ионыч»

## Overview

**Creative North Star: "Три двери в один и тот же текст"**

This build is not one visual world; it is three, shipped in parallel so the
user can stand in front of each and choose. Isolation is the system's first
law: every token, font and component rule is scoped under a `[data-world]`
attribute on `<html>` (`arhiv`, `tetrad`, `kanon`), and no world reads another
world's variables. `src/styles/base.css` and `src/layouts/Shell.astro` hold
only what belongs to none of them — reset, hero-sheet mechanics, and the dark
comparison strip. That strip is a measuring tool, not product chrome; no world
inherits its neutral greys.

**«Архив»** is the user's pinned book world (Референсы/design-system.md)
brought down to an Operate surface: a passe-partout hairline frame around the
viewport, gold rules, Roman numerals, a red oval drawn by hand over the correct
line, and a canvas petal transition reserved for two real scene changes.
**«Тетрадь»** is the assigned direction: a 24px squared page where the grid is
the only alignment system that exists, and red belongs to the teacher alone.
**«Канон»** is the category standard built in earnest — warm ground, white
cards, generous radii, one saturated action colour, a non-overshooting spring
on press.

The three share a spine rather than a look: the same screens (entry, question,
verdict-in-place, hero sheet, result), the same interaction grammar (the option
itself is the primary action; the explanation appears where the mistake was
made, never in a modal), and the same hard content law — every quote, speaker
and chapter is transcribed verbatim from the source text and is never
generated.

**Key Characteristics:**
- Three fully isolated worlds under `[data-world]`; shared scaffolding carries no taste.
- Paper grounds in all three (ivory, unbleached offset, warm cream); no dark mode anywhere.
- One reserved colour per world, spent sparingly and never decoratively.
- The explanation appears in place, under the option that was pressed.
- Mobile-first at 390×844; one content breakpoint at 760px, one desktop breakpoint at 900px.

## Colors

Three separate palettes on three warm paper grounds; they never mix, and each
reserves exactly one colour for a single meaning.

### Primary

- **Wine** (`arhiv-wine`): «Архив»'s only action colour — the Next button, the
  chapter titles, the hover on the back link, the focus ring. Its darker twin
  **Deep Wine** (`arhiv-wine-deep`) carries the biggest display type and the
  button's hover.
- **Ink-Blue Pen** (`tetrad-pen`): «Тетрадь»'s student hand. Headings, progress
  cells, primary buttons, focus rings — everything a pupil would have written or
  that the interface owes the pupil.
- **Indigo Action** (`kanon-action`): «Канон»'s single saturated colour. It
  appears only on things that do something — section buttons, the Next button,
  the progress fill, the verdict link — with **Deep Indigo**
  (`kanon-action-deep`) as the hover.

### Secondary

- **Leaf Gold** (`arhiv-gold`): «Архив»'s structural hairline and numeral
  colour — the plate rules, the left edge of a catalogue slip, Roman numerals,
  the underline of a link. Never a fill.
- **Blue Rule** (`tetrad-rule`, `tetrad-rule-strong`): the printed squared
  lattice itself and every border the world draws, at two strengths — the page
  grid and the line a row sits on.
- **Signal Green / Signal Red** (`kanon-ok`, `kanon-no`, with their tinted
  backgrounds `kanon-ok-bg` and `kanon-no-bg`): «Канон»'s correctness feedback,
  the category-standard pairing used honestly.

### Tertiary

- **Mark Red** (`arhiv-mark-red`): the ink of the hand-drawn oval stroked over
  the correct option in «Архив».
- **Teacher's Red** (`tetrad-red`): the oval, the wavy underline, the margin
  rule, the margin note and the error tally in «Тетрадь». Nothing else in that
  world is red.
- **Blush** (`arhiv-blush`): selection highlight and the lightest petal tone.

### Neutral

- **Ivory / Book Paper** (`arhiv-ivory`, `arhiv-paper`): page ground, and the
  lifted paper of slips, options and the hero sheet.
- **Bistre Ink / Softened Ink** (`arhiv-ink`, `arhiv-ink-soft`): reading text
  and every secondary label; **Hairline** (`arhiv-hair`) is the frame and the
  divider.
- **Offset Paper** (`tetrad-paper`), **Graphite** (`tetrad-graphite`, printed
  text), **Faded Pen** (`tetrad-pen-soft`, captions and unchosen rows).
- **Warm Ground / Card White / Bark / Warm Line** (`kanon-ground`,
  `kanon-card`, `kanon-text`, `kanon-text-soft`, `kanon-line`).
- **Tool Charcoal** (`switcher-ground`, `switcher-ink`, `switcher-ink-dim`):
  the comparison strip only. Off-limits to product surfaces.

### Named Rules

**The Sealed Worlds Rule.** Every colour token belongs to exactly one
`[data-world]`. A new surface picks a world and uses only that world's tokens;
borrowing across worlds, or from the switcher's greys, is a defect.

**The Teacher's Red Rule.** In «Тетрадь», red is the teacher's hand and nothing
else: the oval over the right line, the wavy underline under a wrong choice,
the margin rule, the margin note, the tally. It is never a heading, a button, a
border or an accent.

**The One Action Colour Rule.** In «Канон», indigo appears only where something
is actionable. If it cannot be pressed, it is not indigo.

**The Reserved Mark Rule.** In «Архив», wine is the accent and mark-red is the
mark. The oval's stroke is mark-red; the interface's accents are wine
(design-system.md §8).

## Typography

**Display Font:** Playfair Display (Архив) · Caveat (Тетрадь) · Nunito (Канон)
**Body Font:** Literata (Архив) · Golos Text (Тетрадь) · Nunito (Канон)
**Label Font:** Inter (Архив, micro-labels only)

**Character:** «Архив» is a printed book — a high-contrast display serif over a
screen-cut reading serif, with tiny wide-tracked sans labels for apparatus.
«Тетрадь» is a filled-in exercise book — a hand (Caveat) for anything a person
wrote, a plain grotesque (Golos Text) for anything printed. «Канон» is a single
rounded humanist sans carrying the whole range by weight.

Substitution on the record: Референсы/design-system.md names Fraunces and EB
Garamond, neither of which covers Cyrillic. The build ships Playfair Display
and Literata in those roles with the role structure unchanged; Inter stays as
the micro-label face because §1.1 pins it.

### Hierarchy

- **Display** (Архив 500 / Тетрадь 700 / Канон 800): the work's title on the
  entry screen only — one per page, set to shrink with the viewport.
- **Headline** (Архив 400 / Тетрадь 600 / Канон 800): the character trait on the
  question screen — the object the whole screen is built around, balanced with
  `text-wrap: balance` and focusable for screen-reader hand-off.
- **Title** (Архив 1.4375rem / Тетрадь 38px hand / Канон 19px): chapter tabs,
  hero-sheet name, result heading.
- **Body** (Архив 1.0625rem/1.55 · Тетрадь 16px/24px · Канон 16px/1.5): quote
  text and explanations. Explanation measure is capped at 44ch in «Тетрадь»;
  page measure is capped at 64–68ch in «Архив» and 560–640px in «Канон».
- **Label** (Архив Inter 500, 11px, uppercase, 0.1–0.22em · Тетрадь Golos 600,
  11–13px, uppercase, 0.05–0.09em · Канон Nunito 700, 12–13px): speaker and
  chapter attribution, hero-sheet field names, table headers.

### Named Rules

**The Cyrillic Coverage Rule.** A face that does not render Cyrillic cannot hold
a role here, whatever the reference names. Substitute by role, keep the role
structure, and record the substitution beside the role.

**The Hand and Print Rule.** In «Тетрадь», Caveat means a person wrote it — the
title, the filled table cells, the verdict in the margin, the tally. Golos Text
means it was printed on the page — headers, quotes, buttons. Using one for the
other's content breaks the world's fiction.

**The Quote Is the Object Rule.** Quote text is never smaller than the body size
of its world and is never truncated, clamped or scrolled; a 400-character quote
sets its own height.

## Layout

All three worlds are mobile-first at 390×844 and must survive 360px without
horizontal scroll. Content lives inside `.stage`, offset in every world by the
44px comparison strip plus the top safe-area inset.

**«Тетрадь» — the 24px cell.** `--grid: 24px` is the only alignment system in
the world. Base `line-height` is `24px`; every line box, row height, header band
and vertical gap is a multiple of 24 (measured in the shipped page: entry table
rows at 237/261/285/309, roster rows at 429/453/477/501/525/549). The lattice is
painted on `.stage`, not on `body`, so it starts exactly under the strip.
Content is inset two cells from the left (four from 900px) and a red 1px margin
rule is drawn at that boundary. The container is capped at 30 cells (720px).
Separation between answer blocks is a whole empty cell, never a fractional gap.

**«Архив» — the passe-partout.** A fixed 1px hairline frame is inset 8px from
the viewport inside the strip; the page is inset 14px from it. Measure is capped
at 68ch (entry) and 64ch (question). Rhythm is editorial rather than modular:
10/12/18/26/44px, with 44px between major sections.

**«Канон» — the centred column.** 560px max (640px from 900px), 16px side
padding, 12–22px gaps, no grid beyond the stack.

Two breakpoints exist: 760px turns the entry's cast list and section tabs into
columns, and 900px switches the hero sheet from a bottom sheet to a right rail
(`min(420px, 38vw)`) and widens the worlds' gutters.

### Named Rules

**The Cell Rule.** In «Тетрадь», if a vertical value is not a multiple of 24, it
is wrong. Gaps, row heights and section spacing come from the cell; only
interior horizontal padding (8–14px) is free.

**The Reachable Answer Rule.** On the question screen the options occupy the
lower two-thirds and the sticky footer action is at least 48px tall in every
world. There is no separate submit: pressing the option is the answer.

## Elevation & Depth

The system is overwhelmingly flat and paper-based. «Архив» and «Тетрадь» ship
**no shadows at all**: depth comes from tonal layering (paper on ivory), from
1px hairlines in gold or blue rule, and from a fixed frame that sits visually
above the page. «Канон» owns the only shadow token in the build and uses it as
the material signature of a card.

Motion is likewise scoped. Both paper worlds animate exactly one thing — the red
oval, revealed in stepped frames as though drawn by a hand, and disabled
entirely under `prefers-reduced-motion`. «Архив» adds the canvas petal
transition, bound to two real scene changes (entry → test, last answer → result)
and nowhere else. «Канон» uses a non-overshooting spring on press and on the
progress fill.

### Shadow Vocabulary

- **Card** (`box-shadow: 0 2px 4px rgba(64,40,26,0.05), 0 10px 24px -12px rgba(64,40,26,0.24)`):
  «Канон» only. Every raised surface uses this one value — cards, options,
  buttons, the back control, the hero sheet's field block.

### Named Rules

**The One Shadow Rule.** «Канон» has exactly one shadow. There is no elevation
scale; a surface is either on the ground or on the card shadow.

**The Unlit Paper Rule.** «Архив» and «Тетрадь» never receive a shadow. If a
surface needs to separate, it gets a hairline or a different paper tone.

**The Petals Are an Event Rule.** The petal transition belongs to «Архив» and
fires only on a real change of scene. It is never a click flourish and never
runs over long reading text.

## Shapes

Two of the three worlds have no corner radius whatsoever. «Архив» is built from
squared plates, slips and rules: borders are 1px, the accent border is a single
gold edge on the left of a slip, and the only curve in the world is the
hand-drawn SVG oval. «Тетрадь» is likewise square — table cells, progress cells,
answer rows and buttons are all rectangles sitting on the lattice, with 1.5px
pen borders for live controls and a 1px dashed rule for a disabled one.

«Канон» carries the whole build's radii: 20px for surfaces (cards, options,
section buttons), 16px for actions, 12px for the small back control, 24px for
the sheet's leading corners, and full pills for chips and the switcher's items.
Its option borders are 2px and transparent at rest, so a state change moves
colour rather than geometry.

The recurring silhouette across all three worlds is the horizontal row: a quote
with its attribution beneath, full-bleed to the column, with the verdict stacked
in the same block.

## Components

### Buttons

- **Shape:** square in «Архив» and «Тетрадь» (0 radius); softly rounded in «Канон» (16px actions).
- **Primary:** the sticky Next action — full width, 52px (Архив) / 48px (Тетрадь) / 54px (Канон), filled with the world's action colour, over a footer gradient that fades the page into the ground colour.
- **Hover / Focus:** colour deepens (wine → deep wine, pen → `#162c55`, indigo → deep indigo) over 150–160ms ease-out; «Канон» adds `scale(0.99)` on press with the spring `cubic-bezier(0.25, 1, 0.5, 1)`. Focus is a 2px outline in the world's primary (3px in «Канон») at a 2–3px offset.
- **Secondary:** the result screen's "back" is an outline button — gold border in «Архив», rule border in «Тетрадь», white card with a warm line in «Канон».
- **Disabled:** chapter tabs that are not built yet carry `aria-disabled="true"`, drop to the soft ink colour and lose their fill (dashed border in «Тетрадь», shadowless card in «Канон»).

### Chips

Only «Канон» has them: genre tags on the entry card, warm sand fill (`#f6efe9`),
soft text, full pill, 5px 12px, 13px/600. They are static labels, not filters.

### Cards / Containers

- **«Архив» catalogue slip:** paper on ivory, 1px hairline with a gold left edge, 14px 16px padding, name in display, role in an Inter micro-label. Two columns from 760px.
- **«Тетрадь» row:** not a card. A 24px-tall line with a bottom rule, a handwritten counter hanging in the margin, name left and role right.
- **«Канон» card:** white, 20px radius, the single card shadow, 22px 20px padding, internal dividers as 1px warm lines.

### Inputs / Fields

None. The build takes no typed input; the only controls are buttons and links.

### Navigation

Chapter tabs on the entry screen: one full-width row per section carrying the
section name and a subtitle. «Архив» prefixes each with a gold Roman numeral in
a 46px column and separates rows with hairlines; «Тетрадь» boxes each in a
three-cell-tall pen-bordered rectangle that inverts to filled pen on hover;
«Канон» makes them filled indigo buttons with the card shadow. The back control
on the question screen is a wide-tracked text link in the paper worlds and a
38px rounded card with a CSS-drawn chevron in «Канон».

### Answer Option (signature)

The screen's primary control and its most world-specific component. In every
world it is a full-width `<button>` holding the quote (wrapped in guillemets via
`::before`/`::after`) and, beneath it, a micro-label with speaker and chapter.
States are driven by `data-state` (`idle`, `pending`, `chosen-right`,
`chosen-wrong`, `right`); unchosen options fade to the soft ink colour rather
than disappearing.

- **«Архив»:** paper plate with a hairline; hover raises the border to gold; a wrong choice gets a wine border, a faint wine wash and a struck-through quote.
- **«Тетрадь»:** a line on the ruling — transparent, no border except the bottom rule; a wrong choice gets a red wavy underline at 1.5px with a 4px offset.
- **«Канон»:** white card, 20px radius, transparent 2px border that becomes green or red with a tinted background.

### Hand Mark (signature)

An inline SVG oval, stroked in the world's red, absolutely positioned over the
correct option and revealed by animating `clip-path` in discrete steps (4 steps
/ 520ms in «Архив», 3 steps / 480ms in «Тетрадь») so it reads as drawn rather
than faded. «Архив» rotates it -1.4deg. Under `prefers-reduced-motion` it
appears already complete. «Канон» does not have it: `.opt__mark` is
`display: none` there, deliberately.

### Verdict (signature)

The explanation, rendered in place under the option that was pressed — never a
modal, never a new screen. «Архив» sets it as a block with a gold left rule;
«Тетрадь» pulls it into the margin and writes the verdict word by hand in red;
«Канон» puts it in a small white card with a 16px radius. When the choice was
wrong, the correct quote and its reasoning are appended below a divider inside
the same block.

### Progress

Deliberately different per world, because this is where the worlds argue.
«Тетрадь» renders one 24px cell per question, in place, with the current cell
double-bordered in pen and answered cells filled — position occupies space
rather than being compressed into a bar. «Архив» sets Roman numerals («III из
V»). «Канон» uses the category's track-and-fill bar with a tabular counter.

### Hero Sheet

Shared behaviour, world-specific skin: bottom sheet up to 82dvh on mobile, a
420px right rail from 900px, a 42% dark scrim, and a 260ms
`cubic-bezier(0.22, 0.8, 0.28, 1)` slide that shortens to 1ms under reduced
motion. It always returns to the point it was opened from. «Архив» skins it as
paper with a 2px gold edge and gold field labels; «Тетрадь» continues the
lattice inside the panel behind a pen edge; «Канон» gives it a 24px rounded
leading corner and a white field block.

## Do's and Don'ts

### Do:

- **Do** pick one world and take every token from it; a new surface declares `[data-world]` and stays inside that world's variables.
- **Do** keep «Тетрадь» on the 24px cell: every line box and vertical gap is a multiple of 24, and separation between blocks is a whole empty cell.
- **Do** reserve red in «Тетрадь» for the teacher's hand only — oval, wavy underline, margin rule, margin note, tally.
- **Do** spend «Канон»'s indigo only on things that can be pressed.
- **Do** put the explanation in place, under the option that was chosen, inside the same block.
- **Do** let the quote set its own height; 400 characters render in full at body size.
- **Do** keep the primary action at 48px or taller, in the lower third of the question screen.
- **Do** substitute a font by role when the named face lacks Cyrillic, and record the substitution next to the role.
- **Do** disable the drawn oval and shorten sheet motion under `prefers-reduced-motion`.
- **Do** transcribe every quote, speaker and chapter verbatim from Референсы/ионыч-подлинный-текст.txt; quotes and attributions are never generated.

### Don't:

- **Don't** mix tokens, fonts or components across worlds, and don't let a product surface inherit the comparison strip's charcoal greys.
- **Don't** give «Архив» or «Тетрадь» a shadow or a corner radius; they separate with hairlines and paper tone.
- **Don't** use `arhiv-mark-red` as a general accent — wine is the accent, mark-red is the drawn mark.
- **Don't** add a second elevation level to «Канон»; there is one shadow value.
- **Don't** fire the petal transition on ordinary clicks or scrolls, or over long reading text — only on a real change of scene.
- **Don't** introduce an invented kicker or eyebrow above a heading; the uppercase micro-labels here carry real content (author, speaker, chapter, field name), never a manufactured category line.
- **Don't** put the verdict in a modal, a toast, or on a separate screen.
- **Don't** give «Тетрадь» a progress bar — its position indicator is the row of cells, and it is meant to take up space.
- **Don't** hide, clamp or truncate a quote to make a layout fit.
