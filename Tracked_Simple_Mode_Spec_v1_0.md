# Tracked — Simple Mode: Pixel-Perfect Build Spec
**Version:** 1.0  
**Date:** April 2026  
**Status:** PRIMARY BUILD REFERENCE — Claude Code must follow this spec exactly.
**Theme attribute:** `[data-theme="simple"]`

---

## How to Use This Document

This spec is the **primary build reference** for the Simple Mode theme. The Stitch HTML files (`code1.html`, `code2.html`, `code3.html` in `stitch-designs/`) are **secondary** (structure verification only). DESIGN.md provides the **token system**.

**Priority order:**
1. This spec (what to build)
2. Stitch HTML (verify structure only)
3. DESIGN.md (token reference)

**NEVER** interpret or normalize. If this spec says `padding: 24px`, use 24px. If it says `gap: 6px`, use 6px. Do not round to "standard" values.

---

## Global Rules

### Design Philosophy

Simple Mode is a **utilitarian tool interface**, not a brand experience. It prioritizes information density, scan speed, and functional clarity. The design should feel like a professional SaaS application — think Linear, Notion, or GitHub. No cinematic imagery, no editorial flourishes, no atmospheric effects.

**Key principles:**
- Light mode is the default. Dark mode is a pure palette inversion (identical structure).
- One accent color only: functional blue (`#0053DB`). Used for interactive elements, nothing decorative.
- Sans-serif only: Inter across the entire system. NO serifs, NO italics on display type.
- Borders are OK: clean 1px borders define cards and table rows. This is the opposite of the "no borders" rule on other themes.
- Maximum information density on search results. Every row answers "why this track?" without clicking.
- No background images on any section (except collection card thumbnails).
- No gradients except subtle ones on the primary CTA button.
- Standard border radius (8px cards, 8px buttons). Not brutalist, not pill-shaped. Just normal.

### Token System (Light Mode — Default)

```
--color-surface:                    #F9F9F9   (page background)
--color-surface-container-lowest:   #FFFFFF   (cards, inputs, table body)
--color-surface-container-low:      #F2F4F4   (collections section bg, alternating rows)
--color-surface-container:          #EBEEEF   (footer, query chips, genre pills)
--color-surface-container-high:     #E4E9EA   (filter buttons, hover states)
--color-surface-container-highest:  #DDE4E5   (genre tags in results, scrollbar)

--color-primary:                    #0053DB   (blue — CTAs, links, match scores, play buttons)
--color-primary-dim:                #0048C1   (hover state for primary)
--color-primary-container:          #DBE1FF   (icon containers in how-it-works, toggle badge)
--color-on-primary:                 #F8F7FF   (text on primary buttons)
--color-on-primary-container:       #0048BF   (text/icons on primary-container)

--color-secondary-container:        #E4E2E6   (AS HEARD ON badges, Starter/Team CTAs)
--color-on-secondary-container:     #515155   (text on secondary-container)

--color-on-surface:                 #2D3435   (primary text, headings)
--color-on-background:              #2D3435   (same as on-surface)
--color-on-surface-variant:         #5A6061   (muted text, labels, metadata)
--color-outline:                    #757C7D   (borders, dividers)
--color-outline-variant:            #ADB3B4   (ghost borders at low opacity)

--font-body: 'Inter', system-ui, sans-serif
--font-display: 'Inter', system-ui, sans-serif   (same — NO serifs)

--radius-button:    8px   (rounded-lg)
--radius-card:      12px  (rounded-xl)
--radius-chip:      9999px (rounded-full for query chips)
--radius-tag:       4px   (rounded for genre tags)
```

### Dark Mode Token Overrides

Dark mode is a **pure palette inversion**. Same layout, same spacing, same hierarchy. Only surface and text colors change. Apply via `[data-theme="simple"][data-mode="dark"]`.

```
--color-surface:                    #161616
--color-surface-container-lowest:   #1E1E1E
--color-surface-container-low:      #222222
--color-surface-container:          #2A2A2A
--color-surface-container-high:     #333333
--color-surface-container-highest:  #3D3D3D

--color-primary:                    #618BFF   (slightly lighter blue for contrast on dark)
--color-primary-dim:                #5070E0
--color-primary-container:          #1A2A50
--color-on-primary:                 #F8F7FF   (unchanged)
--color-on-primary-container:       #C7D3FF

--color-secondary-container:        #3A3A3E
--color-on-secondary-container:     #C8C8CC

--color-on-surface:                 #E5E5E5
--color-on-background:              #E5E5E5
--color-on-surface-variant:         #999999
--color-outline:                    #555555
--color-outline-variant:            #3A3A3A
```

### Typography Scale (Inter only)

```
display-lg:   48px (3rem),    weight 800, tracking -0.02em, line-height 1.1
display-md:   40px (2.5rem),  weight 800, tracking -0.02em
headline-lg:  32px (2rem),    weight 700, tracking -0.01em
headline-md:  24px (1.5rem),  weight 700, tracking -0.01em
title-lg:     18px (1.125rem),weight 700
title-md:     16px (1rem),    weight 600
body-lg:      18px,           weight 400, line-height 1.65
body-md:      15px,           weight 400, line-height 1.6
body-sm:      14px,           weight 400, line-height 1.5
label-md:     12px,           weight 600, uppercase, tracking 0.06em
label-sm:     11px,           weight 700, uppercase, tracking 0.08em
label-xs:     10px,           weight 800, uppercase, tracking 0.1em
```

---

## Shared Components

### Navigation Bar (All Pages)

- `position: fixed, top: 0, width: 100%, z-index: 50`
- Background: `slate-50` (light gray, nearly white) — NOT transparent, NOT blurred
- Height: 56px (h-14)
- Bottom border: 1px solid `zinc-200`
- Padding: 0 24px (px-6)

**Left zone:**
- Logo: "Tracked" — 20px (text-xl), weight 700, tracking -0.05em, `zinc-900`. NOT italic. NOT serif.
- Nav links (gap-24px from logo, gap-24px between links):
  - "Catalog" / "Pricing" / "How It Works"
  - Font: 14px (text-sm), weight 400, tracking -0.01em, `zinc-600`
  - Hover: `zinc-900`
  - Active page: `blue-600`, font-weight 500, border-bottom 2px `blue-600`

**Right zone** (gap-16px):
- "Sign In" — 14px, weight 500, `zinc-600`, no background
- "Start Free Trial" — 14px, weight 500, `--color-primary` bg, `--color-on-primary` text, padding 6px 16px, border-radius 8px

### Floating Audio Player (Search Results Page Only)

- `position: fixed, bottom: 0, left: 0, right: 0, z-index: 50`
- Height: 80px (h-20)
- Background: white, border-top: 1px solid `outline-variant/30`
- Shadow: `0 -10px 30px rgba(0,0,0,0.03)` — very subtle
- Padding: 0 24px
- Layout: CSS grid, 3 equal columns

**Left zone** (~280px):
- Album art: 48x48px, border-radius 4px, object-fit cover, subtle shadow
- Track name: 14px, weight 700, `zinc-900`
- Composer: 12px, `on-surface-variant`
- Heart icon: 18px, `on-surface-variant`

**Center zone:**
- Transport row (gap-24px): shuffle, skip-back, play/pause, skip-forward, repeat
  - Play/pause: 40x40px circle, `zinc-900` background, white icon 28px
  - Other icons: 20-24px, `on-surface-variant`, hover `zinc-900`
- Progress row: current time (10px bold) | track bar (1.5px height, `primary` fill) | end time

**Right zone:**
- Queue icon, volume icon + slider (80px wide, 1px height), fullscreen icon
- All icons: `on-surface-variant`

---

## PAGE 1: Homepage — Light Mode

### Section 1: Navigation
Shared navigation bar. No active state on nav links (homepage).

### Section 2: Hero

**Background:** `--color-surface` (#F9F9F9). No image. No gradient. No split layout.
**Min-height:** 716px
**Layout:** flex column, items-center, justify-center
**Padding:** 0 24px

**Headline:**
- Text: "Find music for your project"
- Font: 48px (text-4xl md:text-5xl), weight 800, tracking -0.02em, `--color-on-background`
- Text-align: center
- Margin-bottom: 24px

**Subheadline:**
- Text: "Search 42,000+ broadcast-proven compositions by scene, mood, or style. AI-powered matching in under 2 seconds."
- Font: 18px (text-lg), weight 400, `--color-on-surface-variant`, line-height 1.65
- Max-width: 672px (max-w-2xl), text-align center
- Margin-bottom: 40px

**Search Input:**
- Container: 80% width on desktop (md:w-[80%]), centered
- Outer wrapper: flex, padding 6px, background `--color-surface-container-lowest` (white), border-radius 12px (rounded-xl), border 1px `outline-variant/20`, subtle shadow-sm
- Focus-within: border transitions to `--color-primary`
- Search icon: Material Symbols "search", `--color-on-surface-variant`, padding-left 16px
- Input: flex-1, no border, no ring, background transparent, padding 16px vertical, 16px (text-base md:text-lg)
- Placeholder: "Describe your scene — tense interrogation, upbeat reality competition, emotional documentary reveal..."
- Placeholder style: `--color-on-surface-variant/60`
- "Search" button: attached right inside wrapper, `--color-primary` bg, `--color-on-primary` text, padding 8px 32px, border-radius 8px, weight 600
- Margin-bottom: 32px

**Suggested query chips** (flex-wrap, justify-center, gap-12px):
- "TRY:" label: 12px, uppercase, tracking 0.1em, weight 700, `--color-on-surface-variant/40`
- Each chip: padding 6px 16px, rounded-full, `--color-surface-container` bg, `--color-on-surface-variant` text, 14px, weight 500
- Hover: `--color-surface-container-high`
- Content: "Tense Noir" / "Reality Bounce" / "Atmospheric Pulse" / "Orchestral Sweep"

**Stats line:**
- Text: "42,000+ compositions · 140,000+ files · Scoring TV since 2008"
- Font: 12px, weight 500, tracking 0.04em, `--color-on-surface-variant/60`
- Center aligned. Subtle. Almost a footnote.

### Section 3: Collections Grid

**Background:** `--color-surface-container-low` (#F2F4F4) — shift from hero bg
**Padding:** 96px 24px (py-24 px-6)

**Header row** (flex, justify-between, items-end, margin-bottom 48px):
- Heading: "Curated Collections" — 24px (text-2xl), weight 700, tracking -0.01em, `--color-on-background`
- Subtext: "High-end thematic groupings for professional editors." — body-md, `--color-on-surface-variant`, margin-top 4px
- Right link: "View All Collections" — 14px, weight 600, `--color-primary`, hover underline

**⚠️ STITCH COPY CORRECTION:** Replace "High-end thematic groupings for professional editors" with "Browse by album. Scored for television." (matches the functional Simple Mode voice)

**Grid:** 4 columns (lg), 2 columns (sm), 1 column (mobile), gap-24px

Each card:
- Cursor: pointer
- Thumbnail: aspect-ratio 4/3, border-radius 8px, overflow hidden, `--color-surface-container` placeholder bg
  - Image: object-fit cover, hover scale 1.05, transition 500ms
- Title: weight 700, `--color-on-background`, margin-top 16px, hover `--color-primary`
- Track count: 14px, `--color-on-surface-variant`

Content: "True Crime Narrative" (1,240) / "Competition Energy" (850) / "Late Night Noir" (412) / "The Lab: Experimental" (2,104)

### Section 4: How It Works

**Background:** `--color-surface-container-lowest` (#FFFFFF)
**Padding:** 96px 24px

**Heading:** "Broadcast Ready in 3 Steps" — 24px, weight 700, tracking -0.01em, center
**Margin-bottom:** 64px

**Grid:** 3 columns (md), gap-48px, max-width 1024px (max-w-5xl)

Each step card:
- Padding: 32px
- Background: `--color-surface` (#F9F9F9)
- Border: 1px solid `outline-variant/10`
- Border-radius: 12px (rounded-xl)
- Icon container: 48x48px, border-radius 8px, `--color-primary-container` bg, `--color-on-primary-container` icon (Material Symbols)
  - Step 1: "auto_awesome" icon
  - Step 2: "filter_list" icon
  - Step 3: "download" icon
- Heading: 18px, weight 700, margin-top 24px, margin-bottom 8px
- Description: 14px, `--color-on-surface-variant`, line-height 1.65

Content:
1. "Describe Your Scene" / "Describe the emotional beat or action in plain English. Our AI understands dramatic subtext."
2. "Refine and Preview" / "Filter by BPM, key, or energy. Audition tracks against your cut with one click."
3. "Instant Stems" / "Download full mixes or separated stems. All tracks are cleared for worldwide broadcast."

### Section 5: Footer

**Background:** `--color-surface-container` (#EBEEEF)
**Padding:** 64px 24px

**Top row** (flex, justify-between, items-center, border-bottom `outline-variant/20`, padding-bottom 48px):
- Logo: "Tracked" — 24px (text-2xl), weight 700, tracking -0.05em, `zinc-900`
- Tagline: "Professional scoring for the modern broadcast era." — 14px, `--color-on-surface-variant`
- Links row (gap-32px): "Catalog" / "Licensing" / "Privacy" / "Terms" — 14px, weight 500, `--color-on-surface-variant`, hover `--color-primary`

**Bottom row** (padding-top 32px, flex justify-between):
- Copyright: "© 2024 Tracked Music Library. All rights reserved." — 12px, `--color-on-surface-variant/60`

**⚠️ STITCH COPY CORRECTION:** Update copyright to "© 2026 Tracked Music Group. All rights reserved."

---

## PAGE 2: Search Results — Light Mode

This is the **most important page**. Maximum information density. Every row answers "why this track?" without clicking.

### Section 1: Navigation
Shared navigation. "Catalog" has active state (blue text, underline).

### Section 2: Filter Bar (Sticky below nav)

- `position: sticky, top: 64px (below nav), z-index: 40`
- Background: `--color-surface-container-lowest` (white)
- Border-bottom: 1px `outline-variant/20`
- Padding: 12px 24px
- Layout: flex, justify-between, items-center

**Left: Filter buttons** (flex, gap-8px):
- Each button: flex items-center gap-8px, padding 6px 12px, border-radius 8px
- Background: `--color-surface-container-high`
- Border: 1px solid `outline-variant/30`
- Text: 12px, weight 500, `--color-on-surface`
- Dropdown icon: Material Symbols "keyboard_arrow_down", 16px
- Filters: Genre / Mood / BPM / Key / Duration
- Divider: 1px vertical, 16px tall, `outline-variant/30`
- "Clear all" link: 12px, weight 700, `--color-primary`, hover underline

**Right: Result count + Sort:**
- "1,248 tracks found" — 12px, weight 500, `--color-on-surface-variant`
- Sort dropdown: "Sort by: Best Match" — 12px, weight 700, `--color-on-surface`, no border, transparent bg

### Section 3: Results Data Table

**Container:** max-width full, padding 0 24px, margin-top 16px
**Table wrapper:** `--color-surface-container-lowest` bg, border-radius 12px, overflow hidden, shadow-sm, border 1px `outline-variant/10`

**Table Header Row:**
- Background: `--color-surface-container-low`
- Grid: `grid-cols-[48px_1fr_100px_60px_60px_80px_140px_160px_120px]`
- Padding: 8px 16px, border-bottom 1px `outline-variant/20`
- Text: 10px, weight 700, uppercase, tracking 0.1em, `--color-on-surface-variant/80`
- Columns: [image icon] | TRACK DETAILS | SCORE | BPM | KEY | TIME | GENRE | AS HEARD ON | ACTIONS

**Track Result Row:**
- Same grid columns as header
- Padding: 16px horizontal, 16px vertical
- Hover: `--color-surface-container/30`
- Alternating rows: even rows get `--color-surface-container-low/20` bg
- Divider: 1px between rows, `outline-variant/10`

**Row content (per column):**

1. **Thumbnail:** 40x40px, border-radius 4px, object-fit cover, centered

2. **Track Details** (flex-col, gap-4px, padding-right 16px):
   - Line 1: Track title (14px, weight 700, `zinc-900`) + "— Composer Name" (12px, weight 400, `--color-on-surface-variant`)
   - Line 2 (AI explanation): italic, 11px, weight 500, `--color-primary`, leading-tight
     - Example: "Matches your query's tense pacing with minor-key string ostinato and restrained percussion."
   - Line 3 (Narrative description): 11px, `--color-on-surface-variant`, leading-tight, margin-top 2px
     - Example: "An undercover agent creeps through a darkened warehouse. High stakes, minimal synth pulse."

3. **Score:** centered, `--color-primary/10` bg pill, `--color-primary` text, 10px, weight 800, padding 2px 8px, rounded-full
   - Example: "98% MATCH"

4. **BPM:** centered, 12px, weight 500, `--color-on-surface`

5. **Key:** centered, 12px, weight 500, `--color-on-surface`

6. **Time:** centered, 12px, weight 500, `--color-on-surface`

7. **Genre tags** (flex-wrap, gap-4px):
   - Each: `--color-surface-container-highest` bg, 10px, weight 700, uppercase, padding 2px 8px, border-radius 4px, `--color-on-surface-variant`
   - Max 2 tags visible

8. **AS HEARD ON badge:**
   - Background: `--color-secondary-container`
   - Text: 10px, weight 700, `--color-on-secondary-container`
   - Padding: 4px 8px, border-radius 6px
   - TV icon (Material Symbols "tv", 14px) before show name
   - Example: "🎬 THE BEAR"
   - If no placement: show "—" in muted text

9. **Actions** (flex, gap-12px, justify-end, padding-right 8px):
   - Heart: Material Symbols "favorite", 20px, `--color-on-surface-variant`, hover `--color-primary`
   - Download: Material Symbols "download", 20px, same colors
   - Play: 32x32px circle, `--color-primary` bg, white play icon 18px filled
   - Hover on play: `--color-primary-dim`

### Section 4: Pagination

- Background: `--color-surface-container-low`
- Border-top: 1px `outline-variant/20`
- Padding: 12px 24px, flex justify-between items-center

**Left:** "SHOWING 1-20 OF 1,248" — 10px, weight 700, uppercase, tracking 0.1em, `--color-on-surface-variant`

**Right:** Page numbers
- Current: `--color-primary` bg, white text, 12px weight 700, padding 4px 8px, border-radius 4px
- Others: hover `--color-surface-container-highest`, same size
- Chevron arrows: Material Symbols, disabled state at opacity 30%

### Section 5: Floating Player
See Shared Components > Floating Audio Player.

---

## PAGE 3: Pricing — Light Mode

### Section 1: Navigation
Shared navigation. "Pricing" has active state.

### Section 2: Pricing Hero

**Background:** `--color-surface` (#F9F9F9)
**Padding:** 96px 24px top, 32px bottom (pt-24 pb-32 px-6)

**Headline:** "Choose Your Plan" — 48px, weight 800, tracking -0.03em, `--color-on-surface`, center
**Margin-bottom:** 24px

**Subheadline:** "Scalable solutions for teams of all sizes. Professional precision for your workflow." — 18px, weight 500, `--color-on-surface-variant`, max-w-2xl, center
**Margin-bottom:** 48px

**Toggle** (flex, center, gap-16px):
- "Monthly" — 14px, weight 600, `--color-on-surface`
- Toggle switch: 48x24px, `--color-surface-container-high` bg, rounded-full, 16x16px `--color-primary` circle
- "Annual" — 14px, weight 600, `--color-on-surface`
- Badge: "2 MONTHS FREE" — 10px, weight 700, `--color-primary-container` bg, `--color-on-primary-container` text, rounded-full, padding 4px 8px, uppercase, tracking 0.06em

### Section 3: Pricing Cards

**Grid:** 3 columns (md), gap-32px, max-w-6xl, margin-bottom 96px

**⚠️ STITCH COPY CORRECTION — Feature lists are completely wrong. Replace with master tier features:**

**Starter ($15/mo):**
- Card: `--color-surface-container-lowest` bg, padding 32px, border-radius 12px, border 1px transparent, hover border `outline-variant/20`
- Title: "STARTER" — 14px, weight 700, uppercase, tracking 0.1em, `--color-on-surface-variant`
- Price: "$15" — 36px (text-4xl), weight 800, tracking -0.03em + "/mo" 16px, weight 500, `--color-on-surface-variant`
- Description: "For individual creators getting started." — 14px, `--color-on-surface-variant`
- Features (with blue check_circle icons):
  - MP3 downloads
  - 2 platforms
  - 10 AI searches/day
  - 50 saved results
- CTA: "Get Started" — full width, padding 12px 16px, `--color-secondary-container` bg, `--color-on-secondary-container` text, weight 700, border-radius 8px

**Pro ($29/mo) — HIGHLIGHTED:**
- Same structure BUT: border-2 `--color-primary`, relative positioning
- "MOST POPULAR" pill: absolute, -top-12px, centered, `--color-primary` bg, `--color-on-primary` text, 10px, weight 700, padding 4px 12px, rounded-full, uppercase
- Title: "PRO" in `--color-primary` instead of on-surface-variant
- Features:
  - WAV + stems included
  - 5 platforms
  - 30 AI searches/day
  - 250 saved results
  - AI Match Previews
- CTA: "Start 14-Day Free Trial" — `--color-primary` bg, `--color-on-primary` text

**Team ($79/mo):**
- Same as Starter structure
- Features:
  - Unlimited everything
  - 15 platforms
  - 5 team seats
  - Dedicated curator
- CTA: "Contact Sales" — same as Starter style

### Section 4: FAQ

**Max-width:** 768px (max-w-3xl), centered
**Heading:** "Frequently Asked Questions" — 24px, weight 700, tracking -0.01em, center, margin-bottom 48px

**Accordion items** (stack, gap-4px):
- Each: `--color-surface-container-lowest` bg, overflow hidden
- Question row: full width, padding 20px 16px, flex justify-between
  - Text: weight 700, `--color-on-surface`
  - Icon: Material Symbols "expand_more", `--color-on-surface-variant`
- Answer (when expanded): padding 0 16px 20px, 14px, `--color-on-surface-variant`, line-height 1.65
- Hover: `--color-surface-container-low`

**⚠️ STITCH COPY CORRECTION — FAQ answer says "without a credit card." Master numbers say credit card required. Fix to:**
"Yes, all plans include a 14-day free trial. Credit card required at signup. Cancel anytime during the trial — you won't be charged."

### Section 5: Footer
Pricing page uses a simpler footer:
- Background: `--color-surface-container-low`, border-top 1px `outline-variant/10`
- Padding: 48px 24px
- Copyright: "© 2026 TRACKED SYSTEMS INC. ALL RIGHTS RESERVED." — 12px, weight 500, uppercase, tracking 0.1em, `zinc-400`
- Links: "PRIVACY" / "TERMS" / "SECURITY" — 12px, weight 700, uppercase, tracking 0.1em, `--color-on-surface-variant`, hover `--color-primary`

---

## Corrections Applied (Stitch Hallucinations Fixed)

| Stitch Output | Correct Value | Applies To |
|---------------|---------------|------------|
| "Up to 3 projects" / "Basic analytics" / "24h support" / "Community access" | MP3 downloads / 2 platforms / 10 AI searches/day / 50 saved results | Starter tier features |
| "Unlimited projects" / "Custom reporting" / "Priority support" / "API integration" / "Team collaboration" | WAV + stems / 5 platforms / 30 AI searches/day / 250 saved results / AI Match Previews | Pro tier features |
| "Everything in Pro" / "SAML SSO" / "Custom training" / "Dedicated account manager" | Unlimited everything / 15 platforms / 5 team seats / Dedicated curator | Team tier features |
| "without a credit card" in FAQ | "Credit card required at signup. Cancel anytime." | Pricing FAQ |
| "© 2024 Tracked Music Library" | "© 2026 Tracked Music Group" | Footer copyright |
| "High-end thematic groupings for professional editors" | "Browse by album. Scored for television." | Collections subhead |
| "Get Started" / "Go Pro" / "Contact Sales" | "Select Starter" / "Start 14-Day Free Trial" / "Contact Sales" | Pricing CTAs |
| Generic SaaS pricing descriptions | Music-specific descriptions | Tier descriptions |

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

1. **Theme architecture:** Simple Mode is added as `[data-theme="simple"]` with its own CSS variable file. Components use the same semantic tokens as all other themes. Zero component changes required — only CSS token values.

2. **Dark mode:** Implemented as `[data-theme="simple"][data-mode="dark"]` overriding surface and text tokens. Identical layout structure. The dark mode token table above is the spec — no Stitch dark mode HTML exists (intentional).

3. **Font loading:** Load Inter via Google Fonts. Weights 400, 500, 600, 700, 800.

4. **No serifs anywhere.** Unlike CI (Playfair Display) or Warm Editorial (Newsreader), Simple Mode uses Inter for everything — headings, body, labels, the logo.

5. **Logo treatment:** "Tracked" in Inter, weight 700, tracking -0.05em. No italic. No serif. This is the only theme where the logo is a plain sans-serif wordmark.

6. **Search results grid:** The 9-column CSS grid (`grid-cols-[48px_1fr_100px_60px_60px_80px_140px_160px_120px]`) is critical to the data density. On tablet (<1024px), collapse to a simplified 2-line card layout. On mobile (<768px), stack into single-column cards.

7. **Responsive breakpoints:**
   - Desktop: 1280px+ (all specs above are desktop)
   - Tablet: 768–1279px (2-col collections, simplified results)
   - Mobile: <768px (single column, bottom nav bar replaces desktop nav)

8. **Mobile bottom nav:** Shows on mobile only (md:hidden). 4 items: Play, Track Info, Progress, Volume. Simple icons + labels, no chrome.

9. **Collection images:** These are the only images in Simple Mode. Use catalog thumbnails from Stitch's Google-hosted URLs for development. Production images come from the catalog.

10. **Build Simple Mode as the 4th theme file.** Add to the theme switcher alongside CI, WE, PU. The theme switcher link label should be "SM" with title "Simple Mode".
