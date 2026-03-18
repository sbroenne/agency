# Padme History

## Project Context

- Project: `agency`
- Requested by: Stefan Broenner
- Current stack: Astro + Tailwind CSS
- Visual references: `https://awesome-copilot.github.com/` for IA/discovery patterns and Bradygaster Squad docs for visual style
- Active UX constraint: local preview is mandatory before any major UX publish

## Learnings

- Joined to own lockout-safe visual revisions after Wedge rejected the current docs-style pass.
- Wedge's acceptance bar requires a lighter docs-style shell, rose-led CTA hierarchy, calmer bordered surfaces, restrained accent usage, and a true hero CTA pair.
- Implemented the light docs-style visual revision addressing all Wedge rejection points:
  - Shifted from dark navy/black composition to white (#ffffff) page chrome with light neutral surfaces
  - Made rose (#dd2d60 / squad-600) the single dominant accent color
  - Removed cyan and navy as competing accents (deleted color-accent and color-navy from theme)
  - Replaced heavy glassmorphism with flat bordered surfaces using subtle 200-level borders
  - Reduced corner radius from 28–32px down to 6–12px (rounded-lg system)
  - Added explicit hero CTA pair: solid rose primary + neutral bordered secondary
  - Removed the self-referential style description sentence
  - Normalized all resource cards to consistent neutral styling
- Key file paths for visual system: `src/styles/global.css`, `src/pages/index.astro`, `src/components/SquadCard.astro`, `src/scripts/site.js`
- Build validation: `npm run build && npm run preview` confirms HTTP 200 on `/agency/`
