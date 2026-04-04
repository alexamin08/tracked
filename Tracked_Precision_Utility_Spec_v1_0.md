# Tracked — Precision Utility: Pixel-Perfect Build Spec
**Version:** 1.0  
**Date:** April 2026  
**Status:** PRIMARY BUILD REFERENCE — Claude Code must follow this spec exactly.  
**Theme attribute:** `[data-theme="precision-utility"]`

---

## How to Use This Document

This spec is the **primary build reference** for the Precision Utility theme. The Stitch HTML files (`precision-utility-homepage-light.html`, `precision-utility-homepage-dark.html`, etc. in `stitch-designs/`) are **secondary** (structure verification only). DESIGN.md provides the **token system**.

**Priority order:**
1. This spec (what to build)
2. Stitch HTML (verify structure only)
3. DESIGN.md (token reference)

**NEVER** interpret or normalize. If this spec says `padding: 6px`, use 6px. If it says `gap: 1px`, use 1px. Do not round to "standard" values.

---

## Global Rules

### Design Philosophy

Precision Utility is a **clinical data instrument** — not a magazine, not a brand experience. It prioritizes information density, technical precision, and austere brutalist aesthetics. The design should feel like mission control software, a Bloomberg terminal, or a high-end audio engineering DAW: sharp edges, monospace metadata, zero decorative radius, and a single ice-cyan accent color.

**Key principles:**
- Dark mode is the PRIMARY default. Light mode is the secondary variant.
- Navigation bar is ALWAYS dark (#111316) regardless of page mode — the nav never changes.
- Zero border radius everywhere (0px). No rounded corners. No pills. Sharp, brutalist edges. The only exception is `border-radius: 9999px` for full-circle elements (play button, status dots).
- Single accent: ice-cyan (`#C3F5FF` dark, `#00E5FF` or `#006875` light). Used for interactive elements, data highlights, and the "MOST POPULAR" badge. Nothing decorative.
- Geometric sans-serif only: Space Grotesk (headlines/UI labels) + Inter (body/data). NO serifs.
- Track names display in ALL_CAPS with underscores: `KINETIC_FLOW_01`, `VOID_RESONANCE`, `NEURAL_NETWORK_VIBE` — this is the PU voice.
- Technical/clinical UI language: "Protocol v4.0", "Signal Strength", "Process", "Execute", "Initialize", "Select Terminal".
- Visible borders (1px, outline-variant) define all containers, cards, and grid cells. This is the opposite of CI's "no borders" rule.
- Data density: search results use a compact table/row layout, not editorial cards.
- Monospace for metadata values (BPM, Key, timestamps).

### Token System (Dark Mode — Default)

```
--color-surface:                    #111316   (deep charcoal — page background)
--color-surface-container-lowest:   #0C0E11   (deepest layer)
--color-surface-container-low:      #1A1C1F   (track row alternating)
--color-surface-container:          #1E2023   (cards, footer)
--color-surface-container-high:     #282A2D   (search inputs, filter bar, hover states)
--color-surface-container-highest:  #333538   (tags, active states, scrollbar thumb)

--color-primary:                    #C3F5FF   (ice cyan — headings accent, match scores, data highlights)
--color-primary-container:          #00E5FF   (bright cyan — CTA buttons, MOST POPULAR badge, check icons)
--color-on-primary:                 #00363D   (dark teal — text on primary-container fills)

--color-secondary:                  #98D0DA   (muted cyan — secondary text accents)
--color-secondary-container:        #11505A   (dark teal container — AS HEARD ON badges)
--color-on-secondary-container:     #8AC1CC   (text on secondary containers)

--color-tertiary:                   #FFEAC0   (warm gold — used very sparingly, status indicators only)
--color-tertiary-container:         #FEC931   (gold badge — not commonly used)

--color-on-surface:                 #E2E2E6   (primary text, near-white cool)
--color-on-background:              #E2E2E6   (same as on-surface)
--color-on-surface-variant:         #BAC9CC   (muted text, metadata labels)
--color-outline:                    #849396   (borders, grid lines, label text)
--color-outline-variant:            #3B494C   (ghost borders, subtle dividers)

--font-display: 'Space Grotesk', system-ui, sans-serif
--font-body:    'Inter', system-ui, sans-serif

--radius: 0px (EVERYWHERE — no exceptions except full circles)
```

### Light Mode Token Overrides

Light mode is a **palette inversion with identical structure**. Apply via `[data-theme="precision-utility"][data-mode="light"]`. Navigation bar stays dark in light mode.

```
--color-surface:                    #F1F3F5   (cool gray — page background)
--color-surface-container-lowest:   #FFFFFF   (white — cards, inputs)
--color-surface-container-low:      #F7F9FB   (alternating rows)
--color-surface-container:          #F1F3F5   (footer)
--color-surface-container-high:     #E2E4E7   (filter buttons, hover)
--color-surface-container-highest:  #D1D5DB   (tags, toggle tracks)

--color-primary:                    #006875   (dark teal — replaces ice-cyan for readability)
--color-primary-container:          #00E5FF   (bright cyan — CTAs unchanged)
--color-on-primary:                 #FFFFFF   (white text on primary fills)

--color-secondary:                  #006875   (dark teal)
--color-secondary-container:        #CCE8EE   (light teal — AS HEARD ON)
--color-on-secondary-container:     #00363D   (dark text on secondary container)

--color-on-surface:                 #111316   (near-black — primary text, reversed)
--color-on-background:              #111316
--color-on-surface-variant:         #495057   (medium gray — muted text)
--color-outline:                    #ADB5BD   (borders)
--color-outline-variant:            #CED4DA   (ghost borders, subtle dividers)
```

**⚠️ CRITICAL:** The navigation bar is ALWAYS dark (`#111316` bg, `#C3F5FF` text) regardless of page mode. This is a unique PU design decision — the nav acts as a permanent dark chrome bar.

### Typography Scale (Space Grotesk + Inter)

```
display-xl:  72px (text-7xl), Space Grotesk, weight 700, tracking -0.04em, line-height 0.9, uppercase
display-lg:  60px (text-5xl lg:text-7xl), Space Grotesk, weight 700, tracking -0.03em, line-height 0.9
display-md:  48px (text-5xl), Space Grotesk, weight 700, tracking -0.02em, line-height 1.0
headline-lg: 36px (text-3xl), Space Grotesk, weight 700, tracking -0.01em
headline-md: 24px (text-2xl), Space Grotesk, weight 700, tracking -0.01em
headline-sm: 20px (text-xl), Space Grotesk, weight 700, tracking tight
title-lg:    18px, Space Grotesk, weight 700
title-md:    16px, Inter, weight 600
body-lg:     18px, Inter, weight 400, line-height 1.65
body-md:     14px, Inter, weight 400, line-height 1.6
body-sm:     13px, Inter, weight 400, line-height 1.5
label-lg:    12px, Inter, weight 700, uppercase, tracking 0.08em
label-md:    10px, Inter, weight 700, uppercase, tracking 0.1em
label-sm:    9px,  Inter, weight 700, uppercase, tracking 0.15em
mono:        12px, monospace, weight 500 (for BPM, Key, timestamps)
```

### Layout

```
Max content width:  1400px (max-w-7xl)
Page padding:       0 24px (px-6) — tighter than other themes
Section padding:    48px vertical desktop, 32px tablet
Grid gap:           4px–8px default for data grids, 24px for card grids
```

### Critical Rules

- **Zero radius everywhere.** Every button, card, input, badge, image container = 0px border radius. Sharp corners are the PU signature. The ONLY exception is `border-radius: 9999px` for full-circle play buttons and status indicator dots.
- **Navigation bar never changes.** Always `#111316` bg, `#C3F5FF` text, regardless of light/dark mode.
- **Track names are ALL_CAPS_UNDERSCORE.** Display track names as `KINETIC_FLOW_01`, `SILENT_PRESSURE`, etc. Composer/artist names also uppercase but with standard spacing.
- **Monospace for data values.** BPM, key signature, timestamps, match percentages — all use `font-mono`.
- **Borders are structural.** 1px solid `outline-variant` at 10-30% opacity defines grid cells, card edges, and row separators. This is intentional architecture, not decoration.
- **No background images on page sections** (hero right column has image, collection cards have thumbnails — everything else is solid color).
- **No gradients** except: image overlays (`linear-gradient to transparent`) and the hero image bottom fade.
- **CTA button color is `primary-container` (#00E5FF)** with `on-primary` (#00363D) text — NOT `primary` (#C3F5FF). This creates the high-contrast "electric" button.

---

## Shared Component: Navigation (All Pages, All Modes)

**ALWAYS dark. NEVER changes for light mode.**

- `position: fixed, top: 0, width: 100%, z-index: 100`
- Background: `#111316` (solid, no blur, no transparency)
- Height: 64px (h-16)
- Border-bottom: 1px solid `outline-variant` at 10%
- Padding: 0 24px

**Left:** "Tracked" wordmark
- Font: Space Grotesk, 20px (text-xl), weight 700, tracking -0.05em
- Color: `#C3F5FF` (ice cyan)
- Uppercase

**Center** (hidden on mobile, flex gap-32px):
- "Catalog" / "Pricing" / "How It Works"
- Font: Space Grotesk, 14px (text-sm), uppercase, tracking 0.05em
- Color: slate-400 (#94A3B8)
- Hover: `#C3F5FF`
- Active page: `#C3F5FF` text + 1px bottom border in `#C3F5FF`, padding-bottom 4px
- Transition: colors 200ms

**Right** (flex gap-16px):
- "Sign In" — Space Grotesk, 14px, uppercase, tracking 0.05em, slate-400, hover `#C3F5FF`
- "Start Free Trial" — filled button
  - Background: `#C3F5FF` (dark mode) or primary-container `#00E5FF` (consistent)
  - Text: `#111316` (dark text on cyan)
  - Font: Space Grotesk, 14px, uppercase, tracking 0.05em, weight 700
  - Padding: 8px 24px (py-2 px-6)
  - Radius: 0px
  - Hover: opacity 80%
  - Active: scale 95%

---

## Shared Component: Floating Audio Player

**Appears on Homepage and Search Results. Both modes.**

- `position: fixed, bottom: 0, left: 0, right: 0, z-index: 50`
- Height: 80px (h-20)
- Background: `#282A2D` at 85% opacity + backdrop-blur-md
- Border-top: 1px solid `#3B494C` at 15%
- Padding: 0 32px

**Left zone** (width 25%, flex items-center gap-16px):
- Album art: 40x40px, 0px radius, object-fit cover
- "Active Signal" eyebrow: label-md, primary, tracking 0.15em
- Track name: body-md, weight 700, truncate

**Center zone** (width 50%, flex-col items-center gap-8px):
- Transport row (flex gap-32px):
  - Shuffle, skip-prev, play/pause, skip-next, repeat
  - Play/pause: Material Symbols `pause_circle` or `play_circle`, primary (#C3F5FF), 36px, filled
  - Other icons: slate-500, hover `#C3F5FF`, active scale 95%
- Progress row:
  - Time labels: 9px, font-mono, slate-500
  - Progress track: 4px height (h-1), `--color-surface-container-highest` bg
  - Progress fill: `--color-primary` (#C3F5FF)
  - Scrubber: 4px wide, 12px tall (-mt-1), white, shadow-sm

**Right zone** (width 25%, flex items-center justify-end gap-24px):
- Icon + label stacks (flex-col items-center):
  - "Waveform" / "Queue" / "Volume" — label-sm (8px), uppercase, tracking 0.15em
  - Icons: 14px (text-sm), slate-500 default, `#C3F5FF` for active
- Volume slider: 80px wide, 4px height, `--color-surface-container-highest`, primary fill at 75%

---

## PAGE 1: Homepage — Dark Mode (Default)

### Section 1: Navigation
Shared navigation. Dark chrome. "Catalog" has active state.

---

### Section 2: Hero

**Layout:** CSS grid, 12 columns (lg). Left: 7 columns. Right: 5 columns.
**Border-bottom:** 1px solid outline-variant at 20%
**Min-height:** 870px

#### Left Column (col-span-7)

**Background:** `--color-surface-container-lowest` (#0C0E11)
**Border-right:** 1px solid outline-variant at 20%
**Padding:** 64px (lg:p-16)
**Flex column, justify-center**

**Status indicator** (flex items-center gap-8px, margin-bottom 24px):
- Cyan square: 8px, `--color-primary` bg (NOT circle — brutalist)
- Text: "Protocol v4.0 Active" — Space Grotesk, label-lg, primary, tracking 0.15em, weight 700, uppercase

**Headline:**
- "PRECISION" on line 1
- "SONIC UTILITY" on line 2, in `--color-primary` (#C3F5FF)
- Font: Space Grotesk, display-lg (60px at lg:text-7xl), weight 700, tracking -0.04em, line-height 0.9
- Color: `--color-on-surface` (#E2E2E6) for first word
- Margin-bottom: 32px

**Subtext:**
- "AI-driven music licensing for high-performance production. Real-time stem separation, zero-radius clearance, and clinical-grade metadata indexing."
- Inter, body-lg (18px), `--color-on-surface-variant`, max-width 576px, line-height 1.65
- Margin-bottom: 40px

**Search Input:**
- Container: `--color-surface-container-high` (#282A2D), padding 4px (p-1), flex items-center, border 1px outline-variant at 30%, 0px radius
- Search icon: Material Symbols `search`, outline color (#849396), padding 16px
- Input: bg-transparent, no border, no ring, Inter 14px, py-16px
- Placeholder: "Describe the sonic atmosphere (e.g. '808-heavy cinematic glitch at 124 BPM')"
- "Process" button (attached right):
  - Background: primary-container (#00E5FF)
  - Text: on-primary (#00363D)
  - Font: Space Grotesk, label-lg, uppercase, tracking 0.15em, weight 700
  - Padding: 16px 32px (py-4 px-8)
  - 0px radius

#### Right Column (col-span-5)

- Position: relative, overflow: hidden, min-height 400px
- Full-height image: modular synthesizer, dark studio, blue LED accents
- Image: `filter: grayscale(100%)`, opacity 60%
- Gradient overlay: `linear-gradient(to top, #111316 0%, transparent 50%)`

**Data widget overlay** (absolute, bottom 32px, left 32px, right 32px):
- Background: `--color-surface-container-highest` at 90% + backdrop-blur-md
- Border-left: 4px solid `--color-primary`
- Padding: 24px
- 0px radius

**Widget content** (flex, justify-between, items-end):
- Left stack:
  - "Signal Strength" — label-md, primary, tracking 0.15em, weight 700
  - "98.4% MATCH" — Space Grotesk, headline-md (24px), weight 700
- Right: mini waveform bars (5 bars, 4px wide, primary, varying heights 16-32px)

---

### Section 3: Stats Grid

**Layout:** 4-column grid (2 on mobile)
**Border-bottom:** 1px solid outline-variant at 20%
**Background:** `--color-surface-container-low` (#1A1C1F)

Each stat cell:
- Padding: 24px
- Border-right: 1px solid outline-variant at 20% (except last)
- Label: label-md, outline-variant color, weight 700, tracking 0.15em, margin-bottom 8px
- Value: Space Grotesk, headline-md (24px), weight 700, `--color-on-surface`
  - Exception: "0.04ms" latency value uses `--color-primary`

Stats content (⚠️ CORRECTIONS — Stitch fabricated numbers):
1. "42,000+" / "TOTAL ASSETS" (Stitch says "428,091" — use master number)
2. "140,000+" / "PRODUCTION FILES" (Stitch says "12,402 Daily Syntheses" — fabricated)
3. "0.02s" / "SEARCH LATENCY" (Stitch says "0.04ms" — use master number, 0.02s)
4. "100%" / "BROADCAST CLEARANCE" (Stitch has this correct)

---

### Section 4: Catalog Track List

**Padding:** 32px 48px (p-8 lg:p-12)

**Header row** (flex, justify-between, items-end, margin-bottom 48px):
- Left:
  - Heading: "LATEST SIGNAL UPLOADS" — Space Grotesk, headline-lg (36px), weight 700, tracking -0.01em
  - Underline accent: 48px wide, 4px tall, `--color-primary`, margin-top 8px
- Right: "View Full Directory →" — Space Grotesk, label-lg, primary, weight 700, tracking 0.15em, hover opacity 80%

**Track rows** (flex column, gap 4px):

Each track row:
- Layout: CSS grid, 12 columns, gap-16px, items-center
- Background: `--color-surface-container-low` (#1A1C1F)
- Hover: `--color-surface-container-high` (#282A2D)
- Padding: 16px
- Transition: colors

**Row columns:**
1. **Thumbnail (col-span-1):** 48x48px, `--color-surface-container-highest` bg, overflow hidden, 0px radius
   - Image: object-fit cover
   - Play icon overlay on hover: Material Symbols `play_arrow`, white, centered

2. **Track name + artist (col-span-4):**
   - Name: Inter, 14px, weight 700, `--color-on-surface`, ALL_CAPS_UNDERSCORE format
   - Artist: Inter, 12px, `--color-outline`, uppercase, tracking -0.02em

3. **BPM (col-span-2, text-center):**
   - Label: label-md, outline, tracking 0.15em
   - Value: 12px, font-mono, `--color-on-surface`

4. **Key (col-span-2, text-center):**
   - Same structure as BPM

5. **Actions (col-span-3, flex justify-end gap-24px):**
   - Genre tag: `--color-surface-container-highest` bg, border 1px outline-variant at 20%, label-sm (9px), outline text, padding 4px 8px
   - Download icon: outline, hover primary
   - More icon (more_vert): outline, hover primary

**Active row variant** (currently playing):
- Background: `--color-surface-container-high` (#282A2D)
- Border-left: 2px solid primary
- Track name: `--color-primary` instead of on-surface
- All metadata: primary at 50–70%
- Pause icon replaces play overlay

---

### Section 5: Features Bento Grid

**Padding:** 32px 48px (px-8 lg:px-12, py-12)
**Layout:** 3-column grid, gap 4px

Each feature card:
- Background: `--color-surface-container` (#1E2023)
- Border: 1px solid outline-variant at 10%
- Padding: 32px
- 0px radius

**Card content:**
- Icon: Material Symbols, primary, 30px (text-3xl), margin-bottom 16px
- Heading: Space Grotesk, headline-sm (20px), weight 700, uppercase, margin-bottom 16px
- Description: Inter, body-md, `--color-on-surface-variant`, line-height 1.65

Content:
1. Icon `psychology` / "AI SEMANTIC INDEXING" / "Search via emotional descriptor, technical BPM range, or stem-specific attributes."
2. Icon `dynamic_feed` / "STEM SEPARATION" / "Download individual tracks for drums, bass, synths, and FX instantly upon licensing."
3. Icon `verified_user` / "BROADCAST CLEARANCE" / "Automated licensing certificates issued in seconds for worldwide broadcast." (⚠️ Stitch says "Blockchain-backed" and "milliseconds" — corrected to normal language)

---

### Section 6: Floating Audio Player
See Shared Floating Audio Player. Dark mode tokens.

---

## PAGE 2: Homepage — Light Mode

**Background:** `--color-surface` (#F1F3F5)
**Navigation:** STILL DARK (always `#111316` bg)

### Differences from Dark Mode

Light mode homepage has **identical structure** to dark mode. Only colors change.

**Hero:**
- Left bg: `--color-surface-container-lowest` (#FFFFFF)
- Right bg: image with same grayscale treatment
- Status indicator square and text: `--color-primary` (#006875 in light)
- "SONIC UTILITY" text: `--color-primary`
- Search input: `--color-surface-container-high` (#E2E4E7) bg
- "Process" button: primary-container (#00E5FF) bg

**Hero variant** (from second Stitch file): Some structural variation with headline "THE SONIC LABORATORY" with "LABORATORY" in outline color (muted). Search input has glow border on focus (primary at 20% opacity). Left border accent on subtext paragraph (1px primary at 30%).

**Stats grid:** Same structure, `--color-surface-container-low` bg, on-surface text
**Track list:** Same structure, alternating surface-container-low rows
**Features grid:** Same structure, surface-container bg

---

## PAGE 3: Search Results — Dark Mode

### Section 1: Navigation
Shared navigation (dark chrome). No active state highlighted.

---

### Section 2: Search Header

**Padding:** 32px 24px top

**Search input:**
- `--color-surface-container-high` (#282A2D) bg, padding 4px, flex items-center
- Focus-within: ring-1 primary
- Search icon: outline color, focus: primary
- Input: bg-transparent, Inter 18px (text-lg), on-surface text
- Value: "tense interrogation in a true crime doc"
- "Execute" button: `--color-surface-container-highest` bg, primary text, label-lg, padding 8px 24px

**Results meta** (margin-top 16px, flex items-center gap-16px):
- "5 results found" — label-md, outline, tracking 0.1em
- 32px horizontal rule: 1px, outline-variant
- "Optimized for tension & cinematic depth" — label-md, outline

---

### Section 3: Track Results List

**Container:** flex-col, gap 1px, `outline-variant` at 20% bg (creates 1px dividers between rows)

#### Track Result Row (Dark Mode)

**Layout:** CSS grid, columns `[180px 1fr 120px]`, items-center
**Background:** `--color-surface-container-low` (#1A1C1F)
**Hover:** `--color-surface-container-high` (#282A2D)
**Padding:** 16px, gap-24px

**Column 1 — Thumbnail (180px):**
- Aspect-ratio: 16/9 (video format)
- Background: `--color-surface-container-highest`
- Image: object-fit cover, `filter: grayscale(100%)`, hover: `grayscale(0)`, transition 500ms
- Play overlay on hover: 48x48px square, primary bg, on-primary play icon, centered, 0px radius

**Column 2 — Track Info (1fr, flex-col gap-8px):**

- **Title row** (flex, justify-between):
  - Name: Space Grotesk, title-lg (18px), weight 700, `--color-on-surface`, tracking -0.01em
    - ALL_CAPS format (but no underscores in search — e.g., "SILENT PRESSURE")
  - AS HEARD ON badges (flex gap-8px):
    - Background: `--color-surface-container-highest`
    - Border: 1px solid outline-variant at 15%
    - Text: label-md, outline, tracking -0.02em
    - Example: "AS HEARD ON: THE STAIRCASE"

- **Composer:** Inter, body-md, outline, uppercase, tracking 0.15em

- **Waveform row** (flex items-center gap-8px):
  - Waveform bars: 4px wide (w-1), gap 2px, varying heights (8–32px), `--color-primary` at 40%
  - Mood tags: label-md, `--color-surface-container-highest` at 50% bg, `--color-on-surface-variant`, tracking 0.15em, padding 4px 12px

- **AI Match explanation:**
  - Container: primary at 5% bg, border-left 1px primary at 30%, padding 8px
  - "AI MATCH:" prefix — Inter, 11px, weight 700, uppercase, tracking -0.02em
  - Explanation text: Inter, 11px, primary at 80%, line-height 1.4

**Column 3 — Match Score + Actions (120px, flex-col items-end gap-16px):**
- Match percentage: Space Grotesk, display-md (48px at md:text-6xl), weight 700, `--color-primary`
- "%" suffix: headline-md (24px)
- "MATCH" label below: label-md, `--color-on-surface-variant`
- Action icons (flex gap-16px): favorite, download — outline, hover primary

**Active row (matched/playing):**
- Background: `--color-surface-container-high`
- Border-left: 4px solid primary
- Title: primary instead of on-surface
- "98% Match" pill inline with title: primary bg, on-primary text, label-sm (8px), weight 900, padding 2px 6px
- BPM value: primary, weight 700

---

### Section 4: Floating Audio Player
See Shared Floating Audio Player.

---

## PAGE 4: Search Results — Light Mode

### Key Differences from Dark Mode

**Background:** `--color-surface` (#F1F3F5)
**Navigation:** STILL DARK

**Search header:**
- Eyebrow: "Search Query Analysis" — Space Grotesk, label-lg, primary (#006875), tracking 0.15em
- Plus horizontal rule: 1px, outline-variant at 30%, flex-grow
- Query headline: Space Grotesk, display-md (48px at md:text-5xl), weight 700, tracking -0.02em, `--color-on-surface`

**Data chips** (flex-wrap gap-8px):
- Each chip: `--color-surface-container-highest` bg, 0px radius, padding 4px 12px
  - Label: label-md, outline, tracking -0.02em
  - Value: 12px, font-mono, weight 500
- "AI Generated Results" special chip: primary bg, on-primary text, bolt icon

**Track rows (Light Mode):**
- Same grid structure as dark mode
- Row bg: `--color-surface-container-low` (#F7F9FB)
- Hover: `--color-surface-container-high` (#E2E4E7)
- Active row: `--color-surface-container-high` bg + 4px left border primary
- Genre tags: `--color-surface-container-highest` bg, border 1px outline-variant at 10%
- AS HEARD ON: `--color-secondary-container` (#CCE8EE) bg, `--color-on-secondary-container` text
- License button per row: primary bg, on-primary text, label-md, padding 4px 12px, 0px radius

**Table header row:**
- Background: `--color-surface-container-low`
- Grid: same columns as rows
- Text: label-md, outline at 80%, uppercase, tracking 0.1em
- Border-bottom: 1px outline-variant at 20%
- Column labels: [image] | TITLE & ARTIST | BPM | KEY | TAGS & USE CASE | ACTIONS

**Floating player (Light Mode):**
- Glass effect: `rgba(233, 236, 239, 0.85)` + backdrop-blur-20px
- Same structure as dark player
- Scrollbar: 4px wide, #F1F3F5 track, #CED4DA thumb

---

## PAGE 5: Pricing — Dark Mode

### Section 1: Navigation
Shared navigation (dark chrome). "Pricing" has active state.

---

### Section 2: Pricing Hero

**Background:** `--color-surface` (#111316)
**Padding:** 64px 24px
**Text-align:** center

**Headline:**
- "Clinical *Precision* Pricing"
- Font: Space Grotesk, display-lg (60px at md:text-7xl), weight 700, tracking -0.04em, uppercase
- "Precision" word: `--color-primary` (#C3F5FF)
- Margin-bottom: 24px

**Subheadline:**
- "Scale your production with high-fidelity AI music licensing. No complicated royalty tiers. Just pure performance data for the modern curator."
- Inter, body-lg (18px), `--color-on-surface-variant`, max-width 672px, centered, line-height 1.65

**Billing Toggle** (margin-top 48px, flex center gap-16px):
- "Monthly" label: label-lg, `--color-on-surface-variant`, tracking 0.15em
- Toggle track: 56x28px (w-14 h-7), `--color-surface-container-highest` bg, border 1px outline-variant at 30%, 0px radius
  - Active half: `--color-primary-container` fill (half width)
- "Annual" label: label-lg, `--color-primary`, tracking 0.15em
- Badge: "Save 2 months" — primary at 10% bg, primary text, border 1px primary at 20%, label-md, padding 2px 8px

---

### Section 3: Pricing Cards

**Layout:** 3-column grid, gap 0px, border 1px outline-variant at 15%
**Max-width:** 1280px (max-w-7xl), centered

#### Starter Card

- Background: `--color-surface-container-low` (#1A1C1F)
- Padding: 32px
- Border-right: 1px solid outline-variant at 15%

**Header:**
- Eyebrow: "Entry Point" — Space Grotesk, label-lg, outline, tracking 0.2em, margin-bottom 4px
- "STARTER" — Space Grotesk, headline-lg (36px), weight 700, uppercase, tracking -0.01em

**Price:**
- "$15" — Space Grotesk, display-md (48px), weight 700
- "/mo" — Inter label-lg, `--color-on-surface-variant`, tracking 0.15em

**Description:** "Perfect for independent creators and experimental projects." — Inter, body-md, `--color-on-surface-variant`, margin-top 16px

**Features list** (margin-top 32px, flex column gap-16px):
- Each: flex gap-12px items-start
- Check icon: Material Symbols `check_small`, primary, 14px
- Text: Inter, label-lg, uppercase, tracking 0.08em
- Items: "MP3 downloads" / "2 platforms" / "10 AI searches/day" / "50 saved results"

**CTA:** "SELECT STARTER" — ghost, full width, border 1px outline-variant, Space Grotesk label-lg, weight 700, padding 16px, hover surface-container-highest, 0px radius

#### Pro Card (MOST POPULAR — elevated)

- Background: `--color-surface-container-high` (#282A2D)
- Padding: 32px
- Border-x: 4px solid primary
- Shadow: `0 0 40px rgba(195,245,255,0.05)`
- Position: relative, z-index: 10

**MOST POPULAR badge:**
- Absolute top-right (top: 0, right: 0)
- Background: primary-container (#00E5FF)
- Text: on-primary (#00363D), Space Grotesk, label-md, weight 800, tracking 0.2em
- Padding: 4px 12px
- 0px radius

**Header:**
- Eyebrow: "Standard Output" — Space Grotesk, label-lg, primary, tracking 0.2em
- "PRO" — Space Grotesk, headline-lg, weight 700, uppercase

**Price:** "$29" — same styling as Starter

**Features** (primary check icons):
- Items: "WAV + stems included" / "5 platforms" / "30 AI searches/day" / "250 saved results" / "AI Match Previews"

**CTA:** "START 14-DAY FREE TRIAL" — primary-container (#00E5FF) bg, on-primary text, Space Grotesk, label-lg, full width, padding 16px, hover opacity 90%

#### Team Card

- Background: `--color-surface-container-low` (#1A1C1F)
- Same structure as Starter

**Header:** "Scale Force" eyebrow / "TEAM"
**Price:** "$79"
**Features:** "Unlimited everything" / "15 platforms" / "5 team seats" / "Dedicated curator"
**CTA:** "SELECT TEAM" — ghost, same as Starter

---

### Section 4: Trial Note

**Text-align:** center, margin-top 48px
- "All plans include a 14-day free trial" — label-lg, outline, tracking 0.3em

---

### Section 5: FAQ

**Max-width:** 896px (max-w-4xl), centered
**Margin-top:** 128px

**Header:**
- "System Clarification (FAQ)" — Space Grotesk, headline-md (24px), weight 700, uppercase, tracking -0.04em
- Underline accent: 48px wide, 4px tall, primary, margin-top 16px

**FAQ grid:** single column, gap 1px, `outline-variant` at 20% bg (1px dividers), border 1px outline-variant at 20%

Each FAQ item:
- Background: `--color-surface` (#111316)
- Padding: 24px
- Question: Space Grotesk, 14px, weight 700, uppercase, tracking 0.08em, `--color-primary`
- Answer: Inter, body-md, `--color-on-surface-variant`, margin-top 8px

**4 FAQ items:**
1. "Can I cancel my subscription at any time?" / "Yes. Access remains active until the end of your billing cycle. No data lock-ins."
2. "How does the 14-day free trial work?" / "All plans include a 14-day free trial. Credit card required at signup. Cancel anytime during the trial — you won't be charged."
3. "What happens to my licenses if I cancel?" / "All tracks licensed during an active subscription remain cleared for life."
4. "Do you offer educational or non-profit discounts?" / "Contact our support team with valid credentials for specialized pricing modules."

---

### Section 6: Data Visualization Cards (Dark Mode Only)

**Max-width:** 1280px, centered
**Margin-top:** 128px
**Layout:** 2-column grid, gap 32px

**Card 1 — Signal Density:**
- `--color-surface-container-low` bg, border 1px outline-variant at 10%, padding 32px
- Left: heading "Global Signal Density" (Space Grotesk, title-lg, weight 700, uppercase) + "Real-time licensing activity" (label-lg, on-surface-variant, tracking 0.15em) + mini bar chart (12 bars, 4px wide, primary, varying heights)
- Right: "124k+" (Space Grotesk, headline-lg, weight 700, primary) + "Active Tracks" (label-md, outline)
- ⚠️ CORRECTION: "124k+" is a Stitch fabrication — use "42,000+" to match master numbers

**Card 2 — Infrastructure Status:**
- Same container styling
- "Infrastructure Status" heading + "Network Health" subtitle
- Pulsing 8px primary dot + "Operational: 99.98% Uptime" — label-lg, tracking 0.2em
- Abstract decorative: 128px primary square at 10% opacity, rotated 45deg, overflowing top-right

---

### Section 7: Mobile Bottom Nav

**md:hidden, fixed bottom-0**
- Height: 80px
- Background: `#282A2D` at 85% + backdrop-blur
- Border-top: 1px solid `#3B494C` at 15%
- 4 items: Player, Waveform, Queue, Volume
- Each: flex-col items-center, Inter label-sm (10px), uppercase, tracking 0.15em
- Active: `#C3F5FF`, inactive: slate-500
- Hover: `#C3F5FF` at 10% bg

---

## PAGE 6: Pricing — Light Mode

### Key Differences from Dark Mode

**Background:** `--color-surface` (#F1F3F5)
**Navigation:** STILL DARK

**Pricing Hero (Light Mode):**
- Eyebrow chip: "Instrumentation & Licensing" — `--color-surface-container-high` bg, `--color-on-surface-variant` text, label-md, tracking 0.2em, centered
- Headline: "Transparent Utility" — Space Grotesk, display-lg (60px at md:text-7xl), weight 700, tracking -0.02em, `--color-on-surface`
- Subheadline: Inter, body-lg, `--color-on-surface-variant`
- Toggle: same structure, `--color-surface-container-highest` track, primary-container circle

**Background texture:** Subtle dot grid pattern via CSS: `radial-gradient(#C4C7C5 0.5px, transparent 0.5px)`, `background-size: 24px 24px`

**Pricing Cards (Light Mode):**
- Grid: 3-column, gap 0, border 1px outline-variant at 30%
- Starter/Team: `--color-surface-container-low` (#F7F9FB) bg, border-right 1px outline-variant at 30%
- Pro card: `--color-surface-bright` (#FFFFFF) bg, shadow-2xl, ring-1 primary-container
  - "Recommended" badge (not "Most Popular" — ⚠️ CORRECTION: use "MOST POPULAR" per master)
  - Badge position: absolute top-right
- Hover on Starter/Team: bg transitions to surface-bright

**⚠️ PRICING CORRECTIONS (Light Mode):** Stitch hallucinated completely wrong tiers:
- Stitch: Creator/$29 (Tier 01), Professional/$89 (Tier 02), Enterprise/Custom (Tier 03)
- Correct: Starter/$15, Pro/$29, Team/$79

**Feature lists:** Use master tier features (see Corrections table below).

**CTAs (Light Mode):**
- Starter/Team: "SELECT STARTER" / "SELECT TEAM" — `--color-surface-container-highest` bg, on-surface text, hover primary-container bg + on-primary-container text
- Pro: "START 14-DAY FREE TRIAL" — primary-container bg, on-primary-container text (⚠️ Stitch says "Initialize Pro" — corrected)

**FAQ (Light Mode):**
- Title: "Technical Documentation (FAQ)" — Space Grotesk, headline-lg, weight 700, tracking -0.01em
- 2x2 grid layout (different from dark mode accordion — same content):
  - Each: `--color-surface-bright` (#FFFFFF) bg, border 1px outline-variant at 30%, padding 32px
  - Question: Space Grotesk, label-lg, primary, tracking 0.15em, numbered prefix "01." / "02." / etc.
  - Answer: Inter, body-md, `--color-on-surface-variant`, line-height 1.65

**⚠️ STRUCTURAL NOTE:** Light mode FAQ uses a 2x2 bento grid (not an accordion). Dark mode uses a stacked single-column list. Both contain the same 4 questions.

---

## Corrections Applied (Stitch Hallucinations Fixed)

| Stitch Output | Correct Value | Applies To |
|---------------|---------------|------------|
| Creator / Professional / Enterprise | Starter / Pro / Team | Light mode pricing |
| $29 / $89 / Custom | $15 / $29 / $79 | Light mode pricing |
| "Recommended" badge | "MOST POPULAR" | Light mode Pro card |
| "Initialize Pro" | "START 14-DAY FREE TRIAL" | Light mode Pro CTA |
| "Select Terminal" | "SELECT STARTER" | Light mode Starter CTA |
| "Contact Ops" | "CONTACT SALES" | Light mode Team CTA |
| "Save 25%" on annual toggle | "Save 2 months" or "2 months free" | Light mode pricing |
| "Standard Social License" / "Lossless WAV Downloads" / "Up to 3 Channels" | MP3 downloads / 2 platforms / 10 AI searches/day / 50 saved results | Light mode Starter features |
| "Unlimited Channel Whitelisting" / "Full Stem Extraction" / "Commercial Client Clearance" / "Early Catalog Access" | WAV + stems / 5 platforms / 30 AI searches/day / 250 saved results / AI Match Previews | Light mode Pro features |
| "Multi-User Seat Licensing" / "API Access for CMS" / "Dedicated Account Engineer" / "Worldwide Buyout Options" | Unlimited everything / 15 platforms / 5 team seats / Dedicated curator | Light mode Team features |
| "10 Licensed Tracks / Mo" / "Standard AI Mixing" / "Personal Social Media" | MP3 downloads / 2 platforms / 10 AI searches/day / 50 saved results | Dark mode Starter features |
| "Unlimited Licensed Tracks" / "Stem-Level Access" / "Commercial Broadcasting" / "Priority Rendering" | WAV + stems / 5 platforms / 30 AI searches/day / 250 saved results / AI Match Previews | Dark mode Pro features |
| "Up to 10 Member Seats" / "Custom Legal Indemnity" / "API Access (Beta)" | Unlimited everything / 15 platforms / 5 team seats / Dedicated curator | Dark mode Team features |
| "Select Pro" | "START 14-DAY FREE TRIAL" | Dark mode Pro CTA |
| "428,091 Total Assets" | "42,000+ Compositions" | Homepage stats |
| "12,402 Daily Syntheses" | "140,000+ Production Files" | Homepage stats |
| "0.04ms Latency" | "0.02s Search Latency" | Homepage stats |
| "124k+ Active Tracks" | "42,000+ Compositions" | Data viz card |
| "Blockchain-backed licensing" | "Automated licensing certificates" | Features grid |
| "License $299" button | Remove price from button — use "License Track" | Search results |

**Tier feature matrix (MASTER — use this everywhere):**

| Feature | Starter $15 | Pro $29 | Team $79 |
|---------|-------------|---------|---------|
| Downloads | MP3 only | WAV + stems | WAV + stems |
| Platforms | 2 | 5 | 15 |
| AI searches/day | 10 | 30 | Unlimited |
| Saved results | 50 | 250 | Unlimited |
| Team seats | 1 | 1 | 5 |
| Dedicated curator | — | — | ✓ |

---

## Claude Code Implementation Notes

1. **Theme architecture:** Precision Utility is added as `[data-theme="precision-utility"]` with its own CSS variable file. Components use the same semantic tokens as all other themes. Dark mode is the default.

2. **Dark mode is the default.** When `[data-theme="precision-utility"]` is set without a mode attribute, dark mode renders. Light mode is applied via `[data-theme="precision-utility"][data-mode="light"]`.

3. **Navigation bar is always dark.** The nav component should have a hard-coded dark variant when `data-theme="precision-utility"` is active. It does NOT respond to mode toggles. Background is always `#111316`, text always `#C3F5FF`.

4. **Font loading:** Load Space Grotesk (weights 300, 400, 500, 600, 700) and Inter (weights 300, 400, 500, 600, 700) via Google Fonts.

5. **No serifs anywhere.** Unlike CI (Playfair Display) or WE (Newsreader), PU uses Space Grotesk + Inter for everything. The logo is Space Grotesk, not serif.

6. **Zero border radius.** Set `--radius: 0px` at theme level. Every `border-radius` in the component system should resolve to 0px. Exception: `border-radius: 9999px` for circular play buttons and status dots.

7. **Track name formatting:** When `data-theme="precision-utility"` is active, track names should transform to uppercase. Ideally apply `text-transform: uppercase` at the track-name level. The underscore formatting (KINETIC_FLOW_01) is display-only sample data from Stitch — real catalog data will display naturally in uppercase.

8. **Responsive breakpoints:**
   - Desktop: 1280px+
   - Tablet: 768–1279px (single column hero, 2-col features)
   - Mobile: <768px (full single column, mobile bottom nav bar)

9. **Mobile bottom nav:** md:hidden. 4 items: Player, Waveform, Queue, Volume. Dark chrome styling matches desktop player.

10. **Dot grid background texture (Light mode pricing only):** CSS `radial-gradient(#C4C7C5 0.5px, transparent 0.5px)` with `background-size: 24px 24px`. Applied to pricing page main container only.
