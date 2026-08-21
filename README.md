# Tushika Garg — Portfolio

Scroll-driven 3D portfolio. **React 18 · TypeScript (strict) · Vite.**
No animation library, no router, no UI kit — two runtime dependencies total.
The 3D rig is CSS transforms driven from a `requestAnimationFrame` loop, so
text inside the screens stays real, selectable, crawlable text.

```
Bundle: 48 kB app + 141 kB React  →  61 kB gzipped total
```

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run lint       # eslint, zero warnings tolerated
npm run build      # tsc -b && vite build → dist/
```

`build` type-checks before bundling, so a type error fails the build rather
than shipping.

## ⚠ Before you deploy

1. **Add `public/Tushika-Garg-Resume.pdf`.** The Resume button in the nav is the
   most prominent control on the page. Until the file exists it 404s, which is
   worse than not having the button.
2. **Add `public/tushika.jpg`** (square, ~600×600). Missing → falls back to your
   initials, not a broken image.
3. **Replace the placeholder URLs.** Search `src/data/content.ts` for `REPLACE` —
   three repo links, the Streamlit demo, the LeetCode handle, and the GSSoC
   credential ID. A dead link on the project you're proudest of loses a reviewer
   who was otherwise sold.
4. **Prune `certifications`.** Only list what you actually hold. The section
   hides itself when the array is empty.

## Architecture

```
src/
  types.ts                  every shape on the site
  data/content.ts           ALL copy and links — edit here, never in components
  hooks/
    useScrollStage.ts         scroll progress, stage index, reduced-motion
    useTheme.ts               light/dark, system-aware, persisted
    useCommands.ts            what ⌘K can find and do
  components/
    Chrome.tsx                background, top bar, detail modal (focus-trapped)
    Preloader.tsx             monogram draw-on, once per session
    Logo.tsx                  the mark, static or animated
    CommandPalette.tsx        ⌘K with fuzzy scoring
    ProjectLinks.tsx          GitHub / demo / paper buttons
    ErrorBoundary.tsx         contact-details fallback if render throws
    viz/Viz.tsx               ROC curve, UMAP scatter, sleep wave, heatmap, ETL bar
  screens/Screens.tsx       left / centre / right content per stage
  sections/                 OtherProjects · Certifications · Faq · Contact
  App.tsx                   scroll orchestration and composition
  styles.css                design tokens and all styling
```

### Stage map

Seven stages, all 21 screen cells filled. If you add a stage, add a slab to all
three screens or one panel renders empty.

| # | Left | Centre | Right |
|---|---|---|---|
| 0 | — | hero + photo | — |
| 1 | honours | background | beyond code |
| 2 | skills | Kanha internship | project index |
| 3 | CreditShield stack | CreditShield | ROC → 0.82 |
| 4 | SentinelLabel stack | SentinelLabel | UMAP, 268 flagged |
| 5 | Sleep/T2DM stack | Sleep → T2DM | wearable signal |
| 6 | LeetCode | contact | target roles |

Below the fold: **other projects → certifications → FAQ → contact.**

### Why scroll progress lives in a ref

The non-obvious decision in this codebase. If progress were state, React would
re-render the whole tree ~60×/second. Instead the frame loop writes
`style.transform` directly and only the **stage index** is state — about seven
renders across the entire scroll. Worth knowing if an interviewer asks.

## Accessibility

- Below 1060px or with `prefers-reduced-motion: reduce`, the sticky stage
  becomes a normal stacked document — every slab visible, no scroll hijacking.
  A real fallback, not a hidden one. Test by narrowing the window.
- Modal traps focus, restores it on close, locks body scroll, closes on Escape.
- Command palette is a proper `listbox` with `aria-selected`.
- Skip link, visible `:focus-visible` rings, `aria-expanded` on the FAQ.
- All text and accent colours pass **WCAG AA (4.5:1)** on both themes, against
  both the panel and page backgrounds. Re-check if you change an accent — the
  light-theme colours sit closest to the threshold.

## Theme

Light by default; a recruiter opening this at 11am shouldn't get a black screen.
Dark is one click away and persisted; before a choice is made the site follows
the OS. The light palette is **not** an inversion — accents are darkened
separately to hold contrast on white, glows are ~⅓ opacity because colour fog
that works on black turns light mode muddy, and shadows are two-layer.

## Keyboard

`⌘K` / `Ctrl+K` or `/` opens search — sections, projects, repos, demos, other
work, individual FAQ questions, and actions (copy email, download resume, toggle
theme). `↑ ↓ ↵ Esc` navigate it. No other global shortcuts.

## Deploy

Vercel or Netlify, zero config — it's a single-page site with no router, so no
rewrite rules needed. `npm run build`, publish `dist/`.
