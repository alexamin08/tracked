# Tracked — Warm Editorial: Pixel-Perfect Build Spec
**Version:** 1.0  
**Date:** April 2026  
**Status:** PRIMARY BUILD REFERENCE — Claude Code must follow this spec exactly.  
**Theme attribute:** `[data-theme="warm-editorial"]`

---

## How to Use This Document

This spec is the **primary build reference** for the Warm Editorial theme. The Stitch HTML files (`warm-editorial-homepage-light.html`, `warm-editorial-homepage-dark.html`, etc. in `stitch-designs/`) are **secondary** (structure verification only). DESIGN.md provides the **token system**.

**Priority order:**
1. This spec (what to build)
2. Stitch HTML (verify structure only)
3. DESIGN.md (token reference)

**NEVER** interpret or normalize. If this spec says `padding: 120px`, use 120px. If it says `gap: 6px`, use 6px. Do not round to "standard" values.

---

## Global Rules

### Design Philosophy

Warm Editorial is a **magazine-grade editorial experience** — not a dashboard, not a utility. It prioritizes typographic hierarchy, cinematic imagery, and pull-quote editorial devices. The design should feel like a premium music publication: Monocle meets Pitchfork meets Criterion Collection. Large serif headlines, italic accents everywhere, generous whitespace, and a unique "Critic's Note" AI explanation pattern using a teal accent.

**Key principles:**
- Serif-first: Newsreader is the dominant visual typeface — all display headings, card titles, pull-quotes, and editorial devices use it. Italic is the signature.
- Burnt sienna / terracotta primary (#994123 light, #c05e3e dark logo) — warm, analog, film-stock energy.
- Teal tertiary (#008284 / #006768) is reserved exclusively for "Critic's Note" AI explanations — dashed border boxes with teal accents.
- Dark mode has **significant structural differences** from light mode (hero layout ratios, collection layout patterns, step card designs). This is NOT a simple palette inversion.
- Pull-quote badges with left border accent for "As heard on" show placements.
- Near-zero border radius (2px default, 8px max) — architectural, not rounded.
- Cinematic imagery with desaturation treatments (grayscale-30% on search, grayscale + contrast on hero).

### Token System (Light Mode — Default)

```
--color-surface:                    #FBF9F5   (warm cream page background)
--color-surface-container-lowest:   #FFFFFF   (cards, input backgrounds)
--color-surface-container-low:      #F5F3EF   (collections section bg)
--color-surface-container:          #EFEEEA   (footer bg, tag pills)
--color-surface-container-high:     #EAE8E4   (filter chips, nav bg hover)
--color-surface-container-highest:  #E4E2DE   (Pro card bg, active states)

--color-primary:                    #994123   (burnt sienna — CTAs, logo, accent bars, match scores)
--color-primary-container:          #B95839   (lighter sienna for hover states)
--color-on-primary:                 #FFFFFF   (text on primary fills)

--color-secondary:                  #825243   (muted brown — subdued text, descriptions)
--color-secondary-container:        #FFC0AD   (peach container — "AS HEARD ON" light)

--color-tertiary:                   #006768   (teal — RESERVED for Critic's Note only)
--color-tertiary-container:         #008284   (teal container — Critic's Note bg tint)
--color-on-tertiary:                #FFFFFF   (text on teal fills)

--color-on-surface:                 #1B1C1A   (primary text, near-black warm)
--color-on-background:              #1B1C1A   (same as on-surface)
--color-on-surface-variant:         #56423D   (muted text, metadata, descriptions)
--color-outline:                    #89726B   (borders, dividers)
--color-outline-variant:            #DCC1B9   (ghost borders, light separators)

--font-display: 'Newsreader', Georgia, serif
--font-body:    'Manrope', system-ui, sans-serif

--radius-default: 2px    (0.125rem — buttons, inputs)
--radius-md:      4px    (0.25rem — cards)
--radius-lg:      8px    (0.5rem — image containers, search input)
--radius-xl:      12px   (collection card thumbnails)
```

### Dark Mode Token Overrides

Dark mode uses **different structural layouts** for several sections (documented per-page below). The following are the color overrides only. Apply via `[data-theme="warm-editorial"][data-mode="dark"]`.

```
--color-surface:                    #0C0A09   (stone-950, near-black warm)
--color-surface-container-lowest:   #0C0A09
--color-surface-container-low:      #171513
--color-surface-container:          #1C1917   (stone-900)
--color-surface-container-high:     #292524   (stone-800)
--color-surface-container-highest:  #44403C   (stone-700)

--color-primary:                    #994123   (unchanged — buttons, badges)
--color-primary-container:          #C05E3E   (lighter terracotta — used for logo, link text in dark)

--color-on-surface:                 #FAFAF9   (stone-50, primary text)
--color-on-background:              #E7E5E4   (stone-200)
--color-on-surface-variant:         #A8A29E   (stone-400, muted text)
--color-outline:                    #57534E   (stone-600)
--color-outline-variant:            #292524   (stone-800, ghost borders)
```

### Typography Scale

```
display-xl:  font-size: 6rem (96px),   font-family: display, font-weight: 800, tracking: -0.04em, line-height: 0.9
display-lg:  font-size: 4.5rem (72px), font-family: display, font-weight: 300, tracking: -0.03em, line-height: 0.9
display-md:  font-size: 3rem (48px),   font-family: display, font-weight: 700, tracking: -0.02em, line-height: 1.1
headline-lg: font-size: 2.5rem (40px), font-family: display, font-weight: 700, tracking: -0.01em, line-height: 1.15
headline-md: font-size: 1.875rem (30px), font-family: display, font-weight: 700, line-height: 1.2
headline-sm: font-size: 1.5rem (24px), font-family: display, font-weight: 600, line-height: 1.3
title-lg:    font-size: 1.25rem (20px), font-family: display, italic, font-weight: 400, line-height: 1.4
title-md:    font-size: 1.125rem (18px), font-family: body, font-weight: 500, line-height: 1.5
body-lg:     font-size: 1.125rem (18px), font-family: body, font-weight: 400, line-height: 1.65
body-md:     font-size: 0.875rem (14px), font-family: body, font-weight: 400, line-height: 1.6
body-sm:     font-size: 0.8125rem (13px), font-family: body, font-weight: 400, line-height: 1.55
label-lg:    font-size: 0.75rem (12px),  font-family: body, font-weight: 700, letter-spacing: 0.08em, text-transform: uppercase
label-md:    font-size: 0.6875rem (11px), font-family: body, font-weight: 700, letter-spacing: 0.1em, text-transform: uppercase
label-sm:    font-size: 0.625rem (10px),  font-family: body, font-weight: 900, letter-spacing: 0.15em, text-transform: uppercase
```

### Layout

```
Max content width:  1280px (7xl), centered
Page padding:       0 64px desktop (px-16), 0 32px tablet (px-8), 0 16px mobile
Section padding:    96px–128px vertical desktop, 64px tablet, 48px mobile
Grid gap:           32px default, 24px tight, 64px loose
```

### Critical Rules

- **Newsreader italic is the signature.** Headlines, pull-quotes, collection card names, match scores — all use Newsreader italic. This is the primary visual differentiator from CI (Playfair Display, less italic) and SM (Inter, no italic).
- **Logo is always Newsreader, weight 900, tracking -0.05em, color primary** (light: #994123, dark: #c05e3e). NOT italic for logo.
- **Teal (#008284 / #006768) is reserved exclusively for Critic's Note** — the AI explanation editorial device. Never used for CTAs, badges, or general accent.
- **Critic's Note pattern:** teal background at 5–10% opacity, dashed top and bottom borders in teal at 20–30%, sparkle icon (auto_awesome), italic body text. Always used for AI match explanations.
- **Pull-quote accent bars:** 2px left border in primary (#994123), used for "As heard on" badges and editorial asides.
- **Image treatments:** grayscale(30%) default on search result images, full grayscale + brightness-50% + contrast-125% on hero images. Images animate to full color on hover.
- **Footer is always on light background** in light mode (#EAE8E4 surface-container-high) and dark background in dark mode (#0C0A09 with stone-900 border-top).
- **No pure black (#000000).** Darkest color is #0C0A09 (stone-950).

---

## Shared Component: Navigation

**Applies to all pages, both modes.**

### Light Mode Nav

- `position: sticky, top: 0, z-index: 50`
- Background: `#FBF9F5` at 80% opacity + `backdrop-filter: blur(12px)`
- No border. No shadow. Flat.
- Height: ~76px (py-6 = 24px top + 24px bottom + content)
- Padding: 0 32px

**Left:** "Tracked" wordmark
- Font: `--font-display` (Newsreader), weight 900, font-size 30px (text-3xl), NOT italic
- Color: `#994123` (primary)
- Tracking: -0.05em (tracking-tighter)

**Center** (hidden on mobile, flex gap-40px on desktop):
- "Catalog" / "Pricing" / "How It Works"
- Font: `--font-body` (Manrope), label-lg (12px, uppercase, tracking 0.15em, weight 700)
- Color: stone-600 (#57534E)
- Hover: `#994123` (primary), transition 300ms
- Active page: `#994123` text with 2px bottom border in `#994123`, padding-bottom 4px

**Right** (flex gap-24px, align-center):
- "Sign In" — label-lg, stone-600, hover primary
- "Start Free Trial" — filled button
  - Background: `--color-primary` (#994123)
  - Text: white, label-lg
  - Padding: 10px 20px
  - Radius: 6px (rounded-md)
  - Hover: opacity 90%

### Dark Mode Nav

- Background: stone-950 (#0C0A09) at 80% opacity + backdrop-blur
- Logo color: `#C05E3E` (lighter terracotta)
- Active page link: `#C05E3E` text, Newsreader italic, 18px (not uppercase — editorial style), 2px bottom border in `#994123`
- Non-active links: stone-400, Manrope uppercase 12px
- Nav has grouped logo + links on left side (flex gap-32px), auth on right
- CTA button: `#994123` bg, white text, same styling as light

**⚠️ STRUCTURAL DIFFERENCE:** In dark mode, the active nav link uses Newsreader italic serif (editorial treatment), NOT the Manrope uppercase treatment. This is intentional — it creates the "editor's choice" feel.

---

## Shared Component: Floating Audio Player

**Appears on Search Results and all interior pages. Both modes.**

### Light Mode Player

- `position: fixed, bottom: 0, left: 0, right: 0, z-index: 50`
- Height: 96px (h-24)
- Background: `#FBF9F5` (surface)
- Border-top: 1px solid `#994123` at 10%
- Shadow: `0 -8px 32px rgba(153,65,35,0.06)`
- Padding: 0 32px

**Left zone** (width 33%, flex align-center gap-16px):
- Album art: 48x48px, radius 4px, object-fit cover, shadow-sm
- Track title: Newsreader italic, 18px, primary (#994123)
- Composer: label-sm (10px, uppercase, tracking 0.15em), stone-500

**Center zone** (width 33%, flex-col align-center gap-8px):
- Transport row (flex gap-32px): shuffle, skip-prev, play/pause, skip-next, repeat
  - Play/pause: 40x40px circle, `#994123` bg, white icon
  - Other icons: stone-600 default, hover primary
- Progress row: time labels (10px, label-sm, stone-400), progress track (1px height, surface-container-highest bg, primary fill)

**Right zone** (width 33%, flex items for Player/Queue/Lyrics/Devices icons):
- Icon + label stacks, primary for active, stone-400 at 60% for inactive

### Dark Mode Player

- Background: stone-900 (#1C1917) at 90% + backdrop-blur-xl
- Border-top: 1px solid stone-800
- Track info: Manrope 14px bold (not italic in dark — structural difference)
- Transport play icon: Material Symbols `play_circle` filled, `#994123`, 40px
- All other icons: stone-500, hover stone-100

---

## Shared Component: Critic's Note (AI Explanation)

**The signature editorial device — used everywhere AI explanations appear.**

### Structure
- Container: `--color-tertiary-container` (#008284) at 5–10% opacity background
- Border: top and bottom only, 1px dashed, `--color-tertiary` (#006768) at 20–30%
- Padding: 24px (p-6)
- Layout: flex, gap-12px

### Content
- Icon: Material Symbols `auto_awesome`, `--color-tertiary`, 14px (text-sm)
- Text: body-sm (14px), `--color-on-surface-variant`, line-height 1.65, italic, `--font-body`

### Standalone Variant (Homepage)
When used as a standalone section (not inside a search result):
- Max-width: 896px (max-w-4xl), centered
- Padding: 48px (p-12)
- Add large quote icon (Material Symbols `format_quote`, 96px, tertiary at 10%, absolute top-right)
- Add "Critic's Note" pill badge: `--color-tertiary` bg, white text, label-sm, padding 4px 12px, radius 9999px
- Pull-quote text: Newsreader italic, headline-md (30px), `--color-on-surface-variant`
- Attribution: label-lg, stone-500, with 40px teal bars flanking

---

## PAGE 1: Homepage — Light Mode

### Section 1: Navigation
Shared navigation. Light mode. No active state on nav links (homepage).

---

### Section 2: Hero

**Background:** `--color-surface` (#FBF9F5)
**Layout:** CSS grid, 12 columns. Left: 6 columns. Right: 6 columns.
**Min-height:** 870px
**Stretch:** items-stretch (both columns fill full height)

#### Left Column (col-span-6, flex-col justify-center)

**Padding:** 80px 64px (py-20 px-16)

**Eyebrow text:**
- Text: "Editorial Music Licensing"
- Font: Newsreader italic, 20px (text-xl), `--color-primary`
- Margin-bottom: 16px

**Headline:**
- Text: "The Sound of Modern *Cinema.*"
- "The Sound of" / "Modern" on separate lines via `<br/>`
- "Cinema." in italic + font-weight 300 (light) — contrasts with extrabold rest
- Font: Newsreader, display-xl (96px at md:text-8xl), weight 800 (extrabold), tracking -0.04em, line-height 0.9
- Color: `--color-on-background` (#1B1C1A)
- Margin-bottom: 40px

**Search Input:**
- Container: max-width 576px (max-w-xl)
- Input wrapper: `--color-surface-container-low` (#F5F3EF) bg, no border, radius 12px (rounded-xl), padding 24px (py-6), shadow-sm
- Search icon: Material Symbols `search`, `--color-primary`, positioned absolute left 20px
- Input padding-left: 56px (pl-14)
- Placeholder: "tense standoff, interrogation room, fluorescent light"
- Placeholder style: stone-400, `--font-body`, 18px (text-lg)
- Focus: ring-2 ring-primary at 20%
- Margin-bottom: 16px

**Suggested query chips** (flex-wrap, gap-8px):
- "Try:" label: label-sm (10px, uppercase, tracking 0.15em), stone-400, weight 900
- Each chip: label-sm, `--color-primary`, weight 700, hover underline
- Content: "Dark Ambient" / "1970s Heist" / "Lo-Fi Noir"

#### Right Column (col-span-6)

- Full-height image: cinematic production still, dark atmospheric warehouse
- `object-fit: cover, width: 100%, height: 100%`
- Image filter: `grayscale(100%) brightness(50%) contrast(125%)` — desaturated, high-contrast editorial treatment
- Gradient overlay: `linear-gradient(to right, #FBF9F5 0%, transparent 30%)` — left edge blends into left column (hidden on mobile)

**Floating badge** (absolute, bottom 48px, left 48px, right 48px):
- Background: surface at 10% opacity + backdrop-blur-md
- Padding: 16px
- Radius: 8px (rounded-lg)
- Border: 1px solid white at 10%
- Play button circle: 40x40px, `--color-primary` bg, white play icon filled
- Track name: "Midnight Pulse" — Newsreader italic, 18px, white
- Genre: "Electronic / Suspense" — label-sm, white at 60%, tracking -0.02em

**⚠️ KNOWN ISSUE:** Hero right column currently showing black on WE deploy. The image URL from Stitch must be replaced with a catalog placeholder. Spec the image container as described above — Claude Code should use a placeholder.com image with aspect ratio matching the column height.

---

### Section 3: Collections Scroll

**Background:** `--color-surface-container-low` (#F5F3EF)
**Padding:** 96px 64px top/sides, 32px bottom

**Header row** (flex, justify-between, items-end, margin-bottom 48px):
- Heading: "Curated Collections" — Newsreader, headline-lg (40px), weight 700, tracking -0.01em
- Subtext: "Expertly cataloged stems and full compositions for every narrative arc." — Manrope, body-md (14px), stone-500, max-width 448px, margin-top 8px
- Right link: "View All" + arrow_forward icon — label-lg, primary, weight 900, tracking 0.2em, hover underline

**Horizontal scroll container** (flex, gap-24px, overflow-x-auto, padding-bottom 32px, no scrollbar):

Each card:
- Width: 320px flex-none
- Cursor: pointer
- Thumbnail: aspect-ratio 4/5, overflow hidden, radius 12px (rounded-xl), stone-200 placeholder bg
  - Image: object-fit cover, hover scale 1.05, transition 700ms
- Dark gradient overlay: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)`
- Collection name (absolute, bottom 24px, left 24px): Newsreader italic, headline-sm (24px), white

Content: "Reality Competition" / "True Crime" / "Epic Trailers" / "Neo-Noir"

---

### Section 4: How It Works

**Background:** `--color-surface` (#FBF9F5)
**Layout:** CSS grid, 12 columns. Left: 4 columns (sticky sidebar). Right: 8 columns (steps).
**Padding:** 128px 64px (py-32 px-16)
**Gap:** 64px

#### Left Column (col-span-4, sticky top 128px)

- Heading: "From Concept to *Cue Sheet.*" — Newsreader, display-md (48px), weight 800, tracking -0.04em, line-height 1.0
  - "Cue Sheet." in italic + font-weight 300 (light contrast)
  - Line break after "to"
- Subtext: "We've removed the friction between your vision and the perfect track." — Manrope, body-lg (18px), stone-500, margin-top 24px, margin-bottom 32px
- CTA: "Get Started Now" — primary bg, white text, label-lg, padding 16px 32px, radius 6px, weight 900

#### Right Column (col-span-8, flex column, gap-64px)

Each step:
- Left border: 2px solid primary at 20%, padding-left 48px (pl-12), position relative
- Timeline dot: 16px circle (w-4 h-4), `--color-primary` bg, border-radius full, absolute -left-8px top 0
- Icon: Material Symbols, 36px, `--color-primary`, filled variant, margin-bottom 16px
  - Step 1: `edit_note`
  - Step 2: `graphic_eq`
  - Step 3: `verified`
- Heading: Newsreader, headline-md (30px), weight 700, margin-bottom 16px
- Description: Manrope, body-lg (18px), stone-500, max-width 576px

Content:
1. "Describe" / "Tell our AI what your scene feels like. Use visual adjectives, setting descriptions, or reference moods. No music theory required."
2. "Match" / "Our engine scours 140,000 production files to find not just a track, but the exact stems and elements that fit your edit."
3. "License" / "One-click worldwide rights. Clear for YouTube, Cinema, and Broadcast instantly with automated cue sheet generation."

---

### Section 5: Stats Bar

**Background:** `--color-on-background` (#1B1C1A — dark bar on light page for contrast)
**Text color:** `--color-surface` (#FBF9F5 — inverted)
**Padding:** 64px 64px (py-16 px-16)
**Layout:** grid, 4 columns on desktop (2 on mobile), gap-48px, divide-x (stone-surface at 20%)

Each stat:
- Number: Newsreader italic, headline-lg (40px), weight 700
- Label: label-sm (10px, uppercase, tracking 0.15em), surface at 50%, weight 900

Stats content:
1. "42k+" / "COMPOSITIONS"
2. "140k+" / "PRODUCTION FILES"
3. "Score" / "SINCE 2008"
4. "Global" / "LICENSING RIGHTS"

---

### Section 6: Critic's Note (Standalone)

See Shared Component: Critic's Note (standalone variant).

**Padding:** 96px 64px (py-24 px-16)
**Background:** `--color-surface` (#FBF9F5)

Quote text: "Tracked doesn't just provide background noise; it offers the kind of harmonic intentionality that defines contemporary award-winning cinema."
Attribution: "AI Analytical Engine"

---

### Section 7: Footer

**Background:** `--color-surface-container-high` (#EAE8E4)
**Padding:** 80px 64px top, 32px bottom

**Layout:** 4-column grid, gap-32px, margin-bottom 80px

**Column 1 (brand):**
- "Tracked" wordmark: Newsreader, 30px, weight 900, `#994123`, tracking -0.05em, margin-bottom 24px
- Tagline: Manrope, body-md (14px), stone-500, line-height 1.65, max-width 320px

**Columns 2–4 (links):**
- Column headings: label-sm (10px, uppercase, tracking 0.15em, weight 900), stone-400, margin-bottom 24px
- Links: body-md (14px), stone-600, hover primary, line-height 2.0, cursor pointer

Column headers: PRODUCT / COMPANY / LEGAL
Product: The Catalog, AI Search, Licensing Plans, API Integration
Company: Our Ethos, Manifesto, Journal, Contact
Legal: Master License, Terms of Use, Privacy, Copyright

**Bottom bar** (flex, justify-between, items-center, padding-top 32px, border-top 1px solid stone-300):
- Left: "© 2026 Tracked Music Group. All Rights Reserved." — label-sm, stone-400
- Right: 3 social icons (Material Symbols: brand_awareness, share, podcasts), stone-400, hover primary

---

## PAGE 2: Homepage — Dark Mode

**⚠️ DARK MODE HAS SIGNIFICANT STRUCTURAL DIFFERENCES from light mode. This is NOT a palette swap.**

### Section 1: Navigation
Shared navigation, dark mode variant.

---

### Section 2: Hero

**Background:** stone-950 (#0C0A09)
**Layout:** CSS grid, 12 columns. Left: **7 columns** (wider than light mode). Right: **5 columns**.
**Min-height:** 870px

#### Left Column (col-span-7, flex-col justify-center)

**Padding:** 80px 64px
**Position:** relative, overflow hidden
**Decorative glow:** absolute circle, -top-96px -left-96px, 384px, primary at 10% opacity, blur 120px

**Headline:**
- Text: "The New *Standard* of Sound."
- "The New" on first line, "*Standard*" in italic primary (#994123), "of Sound." continues
- Font: Newsreader, display-lg (72px at lg:text-8xl), weight 300 (LIGHT — different from light mode), tracking -0.04em, line-height 0.9
- "Standard" word: italic, `--color-primary` (#994123)
- Color: stone-100 (#F5F5F4)
- Margin-bottom: 32px

**Subtext:**
- "High-fidelity AI music generation tailored for cinematic storytellers, archivists, and visionary creators."
- Manrope, body-lg (18px at md:text-xl), stone-400, max-width 448px, line-height 1.65
- Margin-bottom: 40px

**⚠️ STRUCTURAL DIFFERENCE:** Dark mode hero has NO search input. Instead, it has an editorial pull-quote with left border accent:
- 2px left border, `--color-primary`
- Padding-left: 16px
- Text: Newsreader italic, title-lg (20px), stone-300
- Example: "The future of licensing is here."

#### Right Column (col-span-5)

- Background: stone-900 (#1C1917)
- Full-height image: vintage reel-to-reel tape recorder, dimly lit studio, amber accents
- Image opacity: 60%, hover scale 1.05, transition 700ms
- Gradient overlay: `linear-gradient(to top, stone-950 0%, transparent 50%)`

**Floating badge** (absolute, bottom 32px, left 32px, right 32px):
- Background: stone-900 at 40% opacity + backdrop-blur-xl
- Border: 1px solid stone-700 at 50%
- Padding: 24px
- Radius: 8px

**Badge content:**
- Eyebrow: "Now Auditioning" — label-sm, `--color-primary`, tracking 0.2em
- Equalizer icon: Material Symbols `equalizer`, stone-500, 14px, float right
- Track name: "Obsidian Echoes" — Newsreader, headline-sm (24px), stone-100
- Genre: "Cinematic / Noir / Ambient" — label-sm, stone-500, tracking 0.15em
- Progress bar: full width, 4px height, stone-800 bg, primary fill at 33%

---

### Section 3: AI Search Section (Dark Mode Only)

**⚠️ This section exists in dark mode ONLY — no light mode equivalent.**

**Background:** stone-950
**Padding:** 96px 64px

**Eyebrow:** "Natural Language Engine" — label-sm, `--color-tertiary` (#008284), tracking 0.3em
**Heading:** "Describe your *sonic vision.*" — Newsreader, display-md (48px at md:text-5xl), weight 300, stone-100
- "sonic vision." in italic, `--color-primary-container` (#B95839)

**Search input:**
- Full width, max-width 960px (max-w-5xl)
- Background: stone-900 (#1C1917)
- No border, radius 12px (rounded-xl)
- Padding: 32px 40px (py-8 px-10)
- Font: Manrope, 20px (text-xl), stone-200
- Placeholder: "Ex: A haunting cello melody recorded in a cathedral with heavy grain..."
- Placeholder color: stone-600
- Focus: ring-1 ring-primary at 50%
- Shadow-2xl

**Search button** (absolute, right 16px, center-vertical):
- Background: primary (#994123)
- Padding: 16px
- Radius: 8px (rounded-lg)
- Icon: Material Symbols `auto_awesome`, white
- Hover: scale 1.05

**Suggested chips** (flex-wrap, gap-12px, margin-top 24px):
- "Try:" label: label-lg, stone-500, tracking 0.15em
- Each chip: Newsreader italic, 12px, stone-400, stone-900 bg, border 1px stone-800, radius 9999px, padding 8px 16px
- Hover: border-primary
- Content: "Wong Kar-wai mood" / "1970s analog funk" / "Minimalist techno"

---

### Section 4: Collections Bento Grid (Dark Mode)

**⚠️ STRUCTURAL DIFFERENCE:** Light mode uses horizontal scroll cards. Dark mode uses a bento grid layout.

**Background:** stone-900 at 30% opacity (#1C1917)
**Padding:** 96px 64px

**Layout:** 4-column grid, auto-rows 300px, gap 24px

**Large card (col-span-2, row-span-2):**
- 600px+ height
- Image: absolute fill, opacity 50%, hover scale 1.05, transition 700ms
- Gradient: `linear-gradient(to top, stone-950, transparent)`
- Badge (absolute bottom-left 40px): "Curated Series" label-sm primary, tracking 0.3em + "The Archives" Newsreader 48px (text-5xl), stone-100

**Medium card (col-span-2):**
- 300px height
- Image: opacity 40%, grayscale default, grayscale-0 on hover
- Title (top-left 32px): Newsreader, headline-md (30px), stone-100
- Subtitle: Manrope, label-sm, stone-400

**Small accent card (col-span-1):**
- Primary at 20% bg, border 1px primary at 20%
- Flex-col justify-end, padding 32px
- Icon: Material Symbols, primary, 36px
- Title: Newsreader, title-lg (20px), stone-100
- Subtext: body-md, stone-400

**Small card (col-span-1):**
- Stone-800 at 50% bg, border 1px stone-700 at 50%
- Flex-col justify-between, padding 32px
- Eyebrow: label-sm, tertiary (#006768), "New Release"
- Title: Newsreader, headline-sm (24px), stone-100
- Bottom link: "Listen" + arrow, label-lg, stone-500, hover stone-100

---

### Section 5: Stats Section (Dark Mode)

**Background:** stone-950
**Padding:** 128px 32px (py-32 px-8)
**Layout:** flex, justify-around, center, gap-48px, text-center on mobile

Each stat:
- Number: Newsreader italic, display-md (48px at md:text-7xl), weight 300, `--color-primary` (#994123)
- Label: label-sm, stone-500, tracking 0.2em, margin-top 16px

**Vertical dividers** (hidden on mobile): 64px tall, 1px, stone-800

Stats content (⚠️ CORRECTIONS NEEDED):
1. "42k+" / "COMPOSITIONS" (Stitch says "420k+" — wrong, master is 42K)
2. "2008" / "SCORING SINCE" (Stitch says "12 Global Awards for AI Ethics" — fabricated, replace)
3. "100%" / "BROADCAST CLEARANCE" (Stitch says "Royalty-Free Licensing" — acceptable but adjust to match brand language)

---

### Section 6: How It Works — Editorial Columns (Dark Mode)

**⚠️ STRUCTURAL DIFFERENCE:** Light mode uses a sticky sidebar + timeline steps. Dark mode uses 3-column editorial cards with oversized decorative numbers.

**Background:** stone-900 at 10%
**Padding:** 96px 64px
**Layout:** 3-column grid, gap-64px, max-width 1280px (7xl), centered

Each column:
- Position: relative

**Decorative number** (absolute, -top-80px, -left-16px):
- Text: "01" / "02" / "03"
- Font: Newsreader, 120px (text-[120px]), weight 900
- Color: stone-800 (#292524) — barely visible, decorative
- line-height: 1, select-none

**Content (position relative, z-10):**
- Heading: Newsreader, headline-md (30px), stone-100, margin-bottom 24px
- Body: Manrope, body-md (14px), stone-400, line-height 1.65

**Step 1 — "Concept Driven":**
- Pull-quote below (margin-top 32px, padding-top 32px, border-top 1px stone-800):
  - 4px wide, 48px tall primary accent bar (w-1 h-12)
  - Newsreader italic, body-lg (18px), stone-300

**Step 2 — "Lossless Generation":**
- ⚠️ **PLACEHOLDER COPY FIX:** Stitch copy mentions "AI models trained on exclusive studio recordings" — this is misleading for a licensing platform. Replace with: "Download full-resolution WAV files and isolated stems instantly. Every track in the catalog is recorded by professional composers with broadcast-grade production standards."
- Critic's Note box below content (see shared Critic's Note component)

**Step 3 — "Perpetual Rights":**
- ⚠️ **PLACEHOLDER COPY FIX:** Stitch copy mentions "Metaverse applications" — not relevant. Replace with: "One license covers worldwide broadcast, streaming, and digital distribution. Automated cue sheet generation means zero paperwork between your edit and air."
- CTA link below: "Learn about licensing" — label-lg, stone-100, border-bottom 1px, hover primary

---

### Section 7: Footer (Dark Mode)

**Background:** stone-950 (#0C0A09)
**Border-top:** 1px solid stone-900
**Padding:** 96px 64px top, 48px bottom

**Layout:** flex, justify-between, gap-64px, margin-bottom 96px

**Left side:**
- "Tracked" wordmark: Newsreader, 36px (text-4xl), weight 900, primary (#994123), tracking -0.05em
- Tagline: Manrope, body-md, stone-500, line-height 1.65, margin-top 32px
- Social links (flex gap-24px, margin-top 32px): "Twitter" / "Instagram" / "Vimeo" — stone-600, hover stone-100

**Right side** (3-column grid, gap-48px):
- Column headings: label-lg, stone-100, weight 700, tracking 0.2em, margin-bottom 24px
- Links: Manrope, body-md, stone-500, hover primary, line-height 2.5

Columns: EXPLORE / COMPANY / NEWSLETTER
Explore: Catalog, Pricing, Collections, Free Assets
Company: Manifesto, Contact, Support
Newsletter: email input (stone-900 bg, stone-300 text, radius 4px) + "Join" button (stone-100 bg, stone-950 text, label-sm)

**Bottom bar** (flex, justify-between, padding-top 32px, border-top 1px stone-900):
- Left: "© 2026 Tracked Music Group. All Rights Reserved." — label-sm, stone-700, tracking 0.15em
- Right: "Privacy Policy" / "Terms of Use" — label-sm, stone-700, hover stone-400

---

## PAGE 3: Search Results — Light Mode

### Section 1: Navigation
Shared navigation, light mode.

---

### Section 2: Search Header

**Background:** `--color-surface` (#FBF9F5)
**Max-width:** 1024px (max-w-6xl), centered
**Padding:** 48px 24px top, 64px bottom (pt-12 pb-16 px-6)

**Search input** (editorial treatment — not a boxed input):
- Bottom border only: 1px solid primary at 10%, group focus-within transitions to primary
- Flex, items-center, gap-16px
- Search icon: Material Symbols `search`, primary, 30px (text-3xl)
- Input: bg-transparent, no border, no ring
  - Value text: Newsreader, display-md (48px at md:text-5xl), weight 300, tracking -0.02em, `--color-on-background`
  - Example: "tense interrogation in a true crime doc"
- Placeholder: stone-300

**Filter chips** (margin-top 24px, flex-wrap, gap-12px):
- "Refined by:" label — Manrope, label-lg, stone-500, tracking 0.15em
- Each chip: `--color-surface-container-high` (#EAE8E4) bg, padding 4px 16px, radius 9999px (pill), label-lg, `--color-primary`
- Content: "Cinematic Suspense" / "High Tempo" / "No Vocals"
- "Reset Filters" link: label-lg, stone-400, border-bottom 1px stone-200, hover primary

---

### Section 3: Track Results List

**Layout:** flex column, gap: 96px (space-y-24 — very generous spacing between results, editorial)
**Padding:** 0 24px, margin-bottom 128px

#### Track Result Card Structure (Light Mode)

**Each card:** CSS grid, 12 columns, gap 32px, items-start

**Grid column 1 — Image (col-span-4):**
- Aspect-ratio: 16/9
- Overflow: hidden, radius 6px (rounded-md), shadow-sm
- Image: object-fit cover, `filter: grayscale(30%)`, hover scale 1.05, transition 700ms
- **Play overlay** (absolute inset, flex items-center justify-center):
  - Visible on hover only (opacity-0 group-hover:opacity-100)
  - Background: primary at 20%
  - Play button: 64x64px circle, white bg, primary play icon filled (36px)
  - Shadow-2xl

**Grid column 2 — Track Info (col-span-8, flex-col):**

- **Row 1 — Title + Actions** (flex, justify-between, items-start, margin-bottom 16px):
  - Title: Newsreader, headline-md (30px), `--color-on-background`
  - Composer line: Manrope, body-md (14px), stone-500, uppercase, tracking -0.02em, margin-top 4px
  - Actions (top-right): flex-col items-end
    - Match score: Newsreader italic, headline-sm (24px), `--color-primary`
    - Action icons (margin-top 16px, flex gap-16px): download + bookmark, stone-400, hover primary

- **Row 2 — Pull-quote "As Heard On"** (position relative, margin-bottom 24px):
  - Left accent bar: absolute, -left-16px (md:-left-32px), top 0, border-left 2px `--color-primary`
  - Padding-left: 16px (pl-4), padding-y 4px
  - Text: Newsreader italic, body-lg (18px), `--color-primary`, line-height 1.3
    - "As heard on" on first line
    - Show name in **bold** on second line (via `<br/>`)

- **Row 3 — Critic's Note (AI Explanation):**
  - Indented: margin-left 48px (md:ml-16)
  - Uses shared Critic's Note component (teal bg tint, dashed borders, auto_awesome icon)

- **Row 4 — Waveform + Tags** (flex, items-center, gap-24px, margin-top 8px):
  - Waveform: flex, items-center, gap 2px, height 32px
    - Bars: 4px wide (w-1), rounded-full, varying heights (8–32px)
    - Played bars: `--color-primary` at 100%
    - Unplayed bars: `--color-primary` at 20–40%
  - Mood tags (flex, gap-8px): `--color-surface-container` bg, label-sm, stone-600, padding 4px 8px, radius 4px
    - Example: "Minimal" / "Ominous"

---

### Section 4: Floating Audio Player
See Shared Floating Audio Player. Light mode.

---

## PAGE 4: Search Results — Dark Mode

### Key Structural Differences from Light Mode

**Background:** stone-950 (#0C0A09)

**Search Header:**
- Layout: CSS grid, 12 columns, items-end, gap 32px
- Left (col-span-8):
  - Eyebrow: "AI Search Results" — label-sm, primary, tracking 0.3em
  - Query as headline: Newsreader, display-lg (48px at md:text-7xl), weight 300, stone-100 (surface-bright)
    - Italicized + primary-container color for key phrase within query
    - Example: "Cinematic *orchestral swells* with a touch of noir."
- Right (col-span-4):
  - Left border: 1px stone-800
  - Padding-left: 32px
  - Status text: "Analyzing 4,200+ stems..." — body-md, stone-400
  - Live indicator: pulsing 8px teal dot + "38 Matches Found" — label-lg, tertiary

**Filter bar:**
- Background: stone-900 at 50%, radius 8px, padding 16px, margin-bottom 48px
- Filters button: tune icon + "Filters" label, stone-300, hover primary
- Active filter pills: stone-800 bg, stone-300 text, label-sm, radius 9999px
- Sort: label-sm, stone-500

**⚠️ STRUCTURAL DIFFERENCE:** Dark mode search results use a COMPLETELY different card layout:

#### Dark Mode Track Result Card

**Layout:** CSS grid, 12 columns, gap 32px, items-start

**Column 1 — Row number (col-span-1):**
- Text: "01" / "02" — Newsreader italic, headline-lg (36px), stone-700
- Hover: transitions to primary

**Column 2 — Image (col-span-4):**
- Aspect-ratio: 4/5 (portrait — different from light mode 16:9)
- Background: stone-900, radius 6px
- Image: grayscale default, grayscale-0 on hover, transition 700ms
- Play overlay: Material Symbols `play_circle` filled, white, 60px

**Column 3 — Track Info (col-span-4, flex-col justify-between):**
- Title: Newsreader, headline-lg (36px), stone-100 (surface-bright)
- Composer: Manrope, body-md, stone-400, uppercase, tracking 0.15em
- Metadata grid (flex-wrap, gap-16px): BPM, Key, Duration — each as label (10px, stone-600, uppercase) + value (body-md, weight 700)
- Action buttons: primary bg CTA "License $299" + add_circle + download icons (⚠️ "$299" is a Stitch hallucination — remove price from button, use "License Track")

**Column 4 — Critic's Note (col-span-3):**
- Vertical primary accent bar: absolute -left-16px, full height, 2px, primary
- "Why this track" heading: Newsreader italic, body-lg, primary-container (#B95839)
- AI explanation: uses shared Critic's Note component (teal bg tint, dashed borders)

---

### Floating Player (Dark Mode)
- Background: stone-900 at 90% + backdrop-blur-xl
- Border-top: 1px stone-800
- Track info: Manrope 14px bold (plain, NOT italic)
- Play icon: Material Symbols `play_circle`, primary, 36px, filled variant
- Volume slider: 80px wide, 4px height, stone-800 bg, stone-400 fill

---

## PAGE 5: Pricing — Light Mode

### Section 1: Navigation
Shared navigation, light mode. "Pricing" has active state (primary color + 2px bottom border).

---

### Section 2: Pricing Hero

**Background:** `--color-surface` (#FBF9F5)
**Padding:** 80px 24px
**Max-width:** 768px (max-w-3xl), centered
**Text-align:** center

**Headline:**
- Text: "Invest in your sound."
- Font: Newsreader, display-md (48px at md:text-7xl), weight 700, `--color-on-background`
- Margin-bottom: 24px

**Subheadline:**
- Text: "Curated AI licensing plans designed for the modern creator, from solo artists to global agencies."
- Font: Newsreader italic, headline-sm (24px), `--color-secondary` (#825243), line-height 1.65

**Billing Toggle** (margin-top 48px, flex center gap-16px):
- "Monthly" label: label-lg, secondary at 60%
- Toggle: 48x24px, `--color-surface-container-high` bg, radius 9999px, 16px circle in primary, translates right when annual
- "Annual" label: label-lg, primary, weight 700
- Badge: "Save 2 months" — primary at 10% bg, primary text, label-sm, padding 2px 8px, radius 4px

---

### Section 3: Pricing Cards

**Layout:** 3-column grid, gap 32px, items-stretch, margin-bottom 128px

#### Starter Card
- Background: `--color-surface-container-low` (#F5F3EF)
- Padding: 40px
- Border-top: 1px solid primary at 5%
- No radius (architectural)

**Header:**
- "Starter" — Newsreader, headline-md (30px), weight 600
- Description: body-md, secondary at 70%, line-height 1.65

**Price:**
- "$15" — Newsreader, display-md (48px), weight 700, `--color-primary`
- "/ month" — Manrope, body-md, secondary at 50%, italic

**Features list** (margin-top 32px, flex column gap-16px):
- Each: flex items-start, gap-12px
- Check icon: Material Symbols `check_circle`, primary, 14px
- Text: body-md, `--color-on-surface-variant`
- Items: "MP3 downloads" / "2 platforms" / "10 AI searches/day" / "50 saved results"

**CTA:** "SELECT STARTER" — ghost, full width, border 1px outline-variant at 30%, no fill, label-lg, padding 16px, hover surface-container-high

#### Pro Card (MOST POPULAR — elevated)
- Background: `--color-surface-container-highest` (#E4E2DE)
- Padding: 40px
- Shadow: `0 32px 64px -12px rgba(153,65,35,0.08)`
- Transform: -translate-y-16px (floats above other cards)
- Position: relative

**MOST POPULAR badge:**
- Absolute top-right (top: 0, right: 0)
- Background: primary (#994123)
- Text: white, label-sm, weight 700, padding 4px 16px, tracking 0.2em

**Header:**
- "Pro" — Newsreader, headline-md, weight 600

**Price:**
- "$29" — Newsreader, display-md, weight 700, primary

**Features** (same structure, but check icons use filled variant):
- Text: body-md, `--color-on-surface`, weight 700
- Items: "WAV + stems included" / "5 platforms" / "30 AI searches/day" / "250 saved results" / "AI Match Previews"

**CTA:** "START 14-DAY FREE TRIAL" — primary bg, white text, full width, label-lg, padding 16px, hover opacity 90%

#### Team Card
- Background: `--color-surface-container-low`
- Same structure as Starter

**Header:** "Team"
**Price:** "$79" — same styling as Starter
**Features:** "Unlimited everything" / "15 platforms" / "5 team seats" / "Dedicated curator"
**CTA:** "CONTACT SALES" — ghost, same as Starter

---

### Section 4: Trial Assurance

**Text-align:** center, margin-bottom 128px
- Inline badge: `--color-tertiary` at 5% bg, border 1px tertiary at 10%, radius 9999px, padding 12px 24px
- Icon: Material Symbols `verified_user`, tertiary, 14px
- Text: "All plans include a 14-day free trial" — label-lg, tertiary, weight 700

---

### Section 5: FAQ

**Max-width:** 896px (max-w-4xl), centered
**Heading:** "Frequently Asked" — Newsreader, headline-lg (40px), weight 700, left-border 4px primary, padding-left 24px, margin-bottom 64px

**FAQ items** (flex column, gap-48px):
Each item:
- Layout: 2-column grid on desktop (1fr 2fr), gap 16px
- Question: Newsreader italic, title-lg (20px), `--color-primary`, line-height 1.3
- Answer: body-md, `--color-on-surface-variant`, line-height 1.65

**4 FAQ items:**
1. "Can I upgrade or downgrade my plan at any time?" / "Yes. You can change plans at any time from your account settings. Changes take effect at the start of your next billing cycle."
2. "How does the 14-day free trial work?" / "All plans include a 14-day free trial. Credit card required at signup. Cancel anytime during the trial — you won't be charged."
3. "What counts as a 'platform' for tracking?" / "A platform is any distinct distribution channel — YouTube, TikTok, podcast feed, broadcast network, etc."
4. "Do you offer educational or non-profit discounts?" / "Contact our team with valid credentials for specialized pricing."

---

### Section 6: Critic's Note (Pricing Insight)

**Margin-top:** 96px
**Max-width:** 768px (max-w-3xl), centered
Uses shared Critic's Note component with:
- Label: "Archivist's Insight" (instead of "Critic's Note")
- Icon: Material Symbols `lightbulb`, teal, 36px
- Text: "Most independent creators find the Pro Annual plan to be the most cost-effective entry point for securing global commercial rights without the overhead of enterprise pricing."

---

### Section 7: Footer

**Background:** `--color-surface-container` (#EFEEEA)
**Border-top:** 1px solid outline-variant at 10%
**Padding:** 80px 32px
**Text-align:** center

- Ghosted logo: "Tracked" — Newsreader italic, headline-sm, primary at 20%, tracking -0.05em
- Copyright: "© 2026 Tracked Music Group. All Rights Reserved." — label-sm, secondary at 40%

---

## PAGE 6: Pricing — Dark Mode

### Key Differences from Light Mode Pricing

**Background:** stone-950 (#0C0A09)

**Pricing Hero (Dark Mode):**

Eyebrow: "The Sound of Curation" — Newsreader italic, title-lg (20px), primary
Headline: "Investment in Atmosphere." — Newsreader, display-xl (72px at md:text-8xl), weight 500, tracking -0.02em, white
- Line break after "in"
Subtext: body-lg, stone-400, max-width 672px, centered

**Billing Toggle:**
- Toggle track: stone-800 bg, 56x28px, primary circle translates on annual
- Badge: "Save 2 months" — ⚠️ Stitch says "Save 20%" — CORRECTED to "Save 2 months"

**Pricing Cards (Dark Mode):**

All cards: stone-900 bg, radius 8px (rounded-lg), padding 40px, border 1px stone-800 at 50%

Pro card (MOST POPULAR): border-2 primary at 30%, scale 1.05, z-10, shadow-2xl. Badge: absolute top-right, primary bg, white text.

**⚠️ PRICING CORRECTIONS (Dark Mode):** Stitch hallucinated completely wrong tiers:
- Stitch: Creator/$19, Agency/$49, Enterprise/Custom
- Correct: Starter/$15, Pro/$29, Team/$79

**Feature lists:** Use master tier features (see Corrections table below).

**CTAs (Dark Mode):**
- Starter: "SELECT STARTER" — ghost, border 1px stone-700, hover stone-800
- Pro: "START 14-DAY FREE TRIAL" — primary bg, white text
- Team: "CONTACT SALES" — ghost, same as Starter

**Pull-quote (Dark Mode only):**
- Margin-top 128px, max-width 896px, centered
- 2px left border primary, padding-left 32px
- Quote: Newsreader italic, headline-md (30px), stone-300, line-height 1.65
- Attribution: label-lg, primary, weight 700, margin-top 24px

**FAQ Section (Dark Mode):**
- 2-column layout: left heading "Common Inquiries" (Newsreader, display-md, white) + subtext, right side FAQ items
- Questions: Newsreader, headline-sm (24px), white
- Answers: Manrope, body-md, stone-400
- Critic's Note box between FAQ items (uses shared component)

**Footer (Dark Mode Pricing):**
- Background: stone-950, border-top 1px stone-900
- Padding-top: 80px, padding-bottom 128px
- Large ghosted wordmark: "TRACKED" — Newsreader, 96px (text-8xl), weight 900, stone-900 (barely visible), tracking -0.04em
- Social links: label-sm, stone-600, hover primary
- Right side: Newsreader italic tagline + copyright, stone-700

---

## Corrections Applied (Stitch Hallucinations Fixed)

| Stitch Output | Correct Value | Applies To |
|---------------|---------------|------------|
| Creator / Agency / Enterprise | Starter / Pro / Team | Dark mode pricing |
| $19 / $49 / Custom | $15 / $29 / $79 | Dark mode pricing |
| "Save 20%" on annual toggle | "Save 2 months" or "2 months free" | Dark mode pricing toggle |
| "Social Media License" / "Unlimited AI Generation" / "Standard Audio Quality" | MP3 downloads / 2 platforms / 10 AI searches/day / 50 saved results | Light mode Starter features |
| "Commercial License" / "Lossless WAV Downloads" / "Clearance for Clients" / "Stems & MIDI Access" | WAV + stems / 5 platforms / 30 AI searches/day / 250 saved results / AI Match Previews | Light mode Pro features |
| "Up to 5 Seat Licenses" / "Centralized Billing" / "Priority Support" | Unlimited everything / 15 platforms / 5 team seats / Dedicated curator | Light mode Team features |
| "Go Pro Now" | "START 14-DAY FREE TRIAL" | Pro CTA (light mode) |
| "Select Plan" | "SELECT STARTER" | Starter CTA (light mode) |
| "Choose Creator" / "Get Agency Access" | "SELECT STARTER" / "START 14-DAY FREE TRIAL" | Dark mode CTAs |
| "License $299" button on search results | "License Track" (no price on button) | Dark mode search |
| "420k+ Unique Master Tracks" | "42k+ Compositions" | Dark mode stats |
| "12 Global Awards for AI Ethics" | "2008 / Scoring Since" | Dark mode stats (fabricated) |
| "© 2024 Tracked Music Media" | "© 2026 Tracked Music Group" | Light mode footer |
| "© 2024 Tracked Music Intelligence" | "© 2026 Tracked Music Group" | Dark mode footer |
| "© 2024 TRACKED INC." | "© 2026 Tracked Music Group" | Dark mode pricing footer |
| "© 2024 Tracked Music AI Licensing" | "© 2026 Tracked Music Group" | Light mode pricing footer |
| Metaverse references in step 3 copy | Replace with broadcast/streaming language | Dark mode How It Works |
| AI generation language throughout | Music licensing language (catalog, not generation) | All pages |

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

1. **Theme architecture:** Warm Editorial is added as `[data-theme="warm-editorial"]` with its own CSS variable file. Components use the same semantic tokens as all other themes. Dark mode overrides via `[data-theme="warm-editorial"][data-mode="dark"]`.

2. **Dark mode is NOT a simple palette swap.** Several sections have different layouts between light and dark:
   - Hero: 6/6 grid (light) vs 7/5 grid (dark), search input present only in light hero
   - AI Search section: dark mode only
   - Collections: horizontal scroll (light) vs bento grid (dark)
   - How It Works: sticky sidebar + timeline (light) vs 3-column editorial with decorative numbers (dark)
   - Search results: 4/8 grid with 16:9 images (light) vs numbered rows with 4/5 portrait images (dark)
   - Pricing FAQ: accordion list (light) vs 2-column editorial split (dark)

3. **Font loading:** Load Newsreader (weights 300, 400, 700, 800, italic for all) and Manrope (weights 300, 400, 500, 600, 700, 800) via Google Fonts.

4. **Critic's Note is a reusable component.** Build it once with variants (inline vs standalone), used on Homepage, Search Results, and Pricing pages.

5. **Nav treatment differs between modes.** Light mode: all-caps Manrope for nav links. Dark mode: active link uses Newsreader italic serif. Build as a variant prop on the nav component.

6. **Image desaturation:** Search result images use CSS `filter: grayscale(30%)` by default, transitioning to `grayscale(0)` on hover. Hero images use `grayscale(100%) brightness(50%) contrast(125%)`.

7. **Pull-quote "As Heard On" badges:** These use a 2px left border accent in primary, with Newsreader italic text. They are NOT pill badges like CI — they are editorial pull-quotes positioned absolutely to the left of content.

8. **Responsive breakpoints:**
   - Desktop: 1280px+
   - Tablet: 768–1279px (hero stacks single column, 2-col pricing)
   - Mobile: <768px (full single column, mobile bottom nav)

9. **Mobile bottom nav:** Shows on mobile only (md:hidden). 4 items: Player, Queue, Lyrics, Devices. Primary for active, stone-400 at 60% for inactive.

10. **Known pre-publish issues resolved in this spec:**
    - Hero right-column image: spec provides placeholder guidance and image container structure
    - Nav styling: dark and light variants documented separately with correct treatments
    - Placeholder copy: "Lossless Generation" and "Perpetual Rights" sections have corrected copy above
