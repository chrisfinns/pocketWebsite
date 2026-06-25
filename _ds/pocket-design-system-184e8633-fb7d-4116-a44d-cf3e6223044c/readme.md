# Pocket — Design System

**Pocket** is a rhythm-training app. The name is the musician's phrase *"in the pocket"* — locking perfectly to the beat. Pocket listens to what you play (MIDI or audio onset detection), grades every hit against its subdivision grid to the millisecond, and scores how tight your timing is. **The brand sells timing *feel*, not "a metronome."** Every word and pixel reinforces one idea: **find the pocket → lock the green beat.**

- **Platforms:** macOS first (the primary surface recreated here), iOS next. Native SwiftUI.
- **Core loop:** pick a groove → press play → play along → each hit drops on the sweep lane (early ↑ / late ↓) and folds into a timing-distribution cloud → stats: bias (rush/drag), σ (consistency), % tight.

## Sources

This system was built from the product's own repository — explore it to design with higher fidelity:

- **GitHub:** [github.com/chrisfinns/Metronome](https://github.com/chrisfinns/Metronome) — SwiftUI app. Key reads: `DESIGN.md` (the timing engine + visual rationale), `design/logo/README.md` (brand & mark), `Sources/PocketKit/ContentView.swift` (macOS panes), `Sources/PocketKit/PracticeView.swift` (iOS), `Sources/PocketKit/Theme.swift` (the continuous grade-color function).
- **Brand assets:** `design/logo/export/` in the repo — 1024² app icons (default/dark/tinted), wordmarks, rounded marketing PNGs. The key ones are copied into `assets/`.
- Uploaded screenshots of the macOS Practice / Patterns / History panes informed the UI-kit recreation.

---

## Content fundamentals

**Voice: precise, player-to-player, unhyped.** The product talks in milliseconds, host clocks, and rush/drag bias — confident and technical without being cold.

- **Concrete numbers over adjectives.** "grades every hit to <5 ms," never "incredibly accurate." Stats are the language: `+3 ms`, `±12 ms`, `57% tight`, `70 BPM`, `σ`.
- **Two registers held in tension** — *precise/technical* (a fixed grid, evenly-spaced beats) and *energetic/rhythmic* (the lit green beat, the groove moving). Good copy alternates: a tight factual claim, then a feel claim. The signature phrase **"in the pocket"** is the feel register; the readouts are the technical one.
- **Casing:** the wordmark and headlines are **lowercase-friendly** (the logo is lowercase `pocket`). UI section labels are **UPPERCASE + tracked** (`LAST HIT`, `TIGHTNESS TREND`, `SWEEP LANE`). Microcopy is sentence case, often lowercase for hints: *"play a note to begin," "find the pocket," "fade the help as you lock it in."*
- **Person:** addresses the player as **you** ("how on-time *you* play," "*your* best on each groove"). No "we."
- **Emoji:** none. Iconography is SF Symbols / unicode glyphs (▶, ★, σ, ♪), never emoji.
- **Vibe:** a precision instrument you practice on — like a tuner or a DAW meter, not a gamified habit app. Encouraging through *data* (the trend bars climbing), not through praise.

---

## Visual foundations

**Dark-first, instrument aesthetic.** Think the meter bridge of a console: near-black surfaces, hairline strokes, glowing data.

- **Color:** structure is the **cyan→green** analogous ramp (always read vertically in the product). The **live beat / "the pocket" is always green** and is *never* recolored — it's the whole concept. Timing error grades **continuously** green (0 ms) → amber → red (≥50 ms) — never bucketed into discrete steps. Purple/magenta is the **patterns/grooves** accent. System **blue** fills the selected segment of a segmented control. Rose marks count-in.
- **Surfaces:** window background is a subtle near-black vertical gradient `#0A0B0D → #06070A`. Cards/panels are flat `#121417` with a **0.5px hairline stroke** (`rgba(255,255,255,0.08)`) — *not* drop shadows. The only glow is reserved for the lit green beat and the green play button.
- **Type:** SF Pro (UI) + SF Mono (every numeric readout — BPM, ms, %, σ). The mono "LCD" treatment is core: if it's a measurement, it's monospaced. Web substitutes: **Inter** + **JetBrains Mono** (flagged below).
- **Wordmark:** lowercase, `font-weight: 600`, tight tracking (`-0.04em` ≈ the brief's letter-spacing −2).
- **Radii:** cards 10–16px, chips/segments fully rounded (pill), pattern cells 2px. Nothing sharp-cornered, nothing pill-everywhere.
- **Spacing:** native macOS metrics — 10–20px panel padding, 10–16px gaps, 44px min hit targets.
- **Backgrounds:** no photography, no illustration, no texture. The "imagery" is the **data visualization itself** — the sweep lane, the distribution cloud, the trend bars, the beat-bar motif. These are the hero visuals and double as loading/empty-state/divider language.
- **Motion:** short, eased (`cubic-bezier(0.4,0,0.2,1)`, 120–320ms). The beat flash fades quickly (opacity). **No bounce on data** — measurements move crisply. Decorative loops are avoided.
- **Hover/press:** hover lightens the tinted fill slightly; press is immediate (no scale on data controls). The green play button stays put — it glows, it doesn't bounce.
- **Transparency/blur:** toolbars and transport bars use a translucent "bar" material over the gradient; sidebar is semi-transparent. Blur is sparing — chrome only, never on data panels.
- **Cards:** flat panel fill + hairline stroke + 10–16px radius. Active/selected cards swap the stroke to a tinted cyan. No colored left-border accents, no gradients on cards (the one exception: the *editor onset cells*, which use the glassy purple gradient from the brand's Liquid-Glass motif).

---

## Iconography

- **System:** the app uses **SF Symbols** natively (`metronome`, `square.grid.2x2`, `clock.arrow.circlepath`, `gearshape`, `play.fill`, `eye.slash`, `hand.tap`, `waveform`, `mic`). In web artifacts, substitute with a matching outline set or the unicode/text glyphs already used here (△ ▦ ◷ ▶ ★ ♪ σ ⚙). **No emoji.**
- **Brand marks (in `assets/`):** `icon-measure.svg` (master mark — the glassy beat-bar arc), `icon-pulse.svg`, `icon-monogram.svg`, plus `pocket-icon-rounded-*.png` (marketing tiles), `pocket-appicon-default.png` (full-bleed iOS), and `pocket-wordmark-{dark,light}.{svg,png}`.
- **Mark rule:** never recolor the live/center beat anything but green. Min legible size ~32px; below that prefer the single green beat or the monogram. Keep one beat-width clear space around the wordmark.
- **Data "icons":** the beat-bar row, mini step-sequencer pattern, sweep lane and distribution cloud *are* the iconographic language — reuse them rather than inventing decorative icons.

---

## Index

**Foundations**
- `styles.css` — global entry (links the four token files). Consumers link this one file.
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/fonts.css`
- `guidelines/*.html` — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**Components** (`components/core/`) — namespace `window.PocketDesignSystem_184e86`
- `Button` — green primary transport · bordered · plain
- `Segmented` — blue-selected subdivision / input picker
- `Chip` — purple groove chip, AUTO/Lvl badges, ★ best %
- `Stat` — tracked label + mono value (BIAS/σ/TIGHT, summary cards)
- `Panel` — the standard hairline surface
- `BeatBars` — live beat indicator row
- `MiniPattern` — tiny step-sequencer pattern preview

**UI kit** (`ui_kits/pocket-mac/`) — interactive macOS app recreation: sidebar + **Practice** (control bar, beat bars, last-hit readout, stats, sweep lane, distribution, guidance fader, transport), **Patterns** (library + rhythm editor), **History** (trend, personal bests, recent sessions). Open `index.html`.

**Assets** (`assets/`) — logos, wordmarks, brand marks.

---

## Caveats / substitutions

- **Fonts:** the native app is **SF Pro + SF Mono** (Apple system fonts, not webfont-licensable). This system substitutes **Inter** (UI) and **JetBrains Mono** (numeric LCD). Swap back to SF Pro / SF Mono for production native builds. *(Flag: substituted fonts.)*
- **Icons:** SF Symbols aren't available on the web; UI-kit chrome uses unicode glyph stand-ins. For production web, wire a real outline icon set matching SF Symbols' weight.
