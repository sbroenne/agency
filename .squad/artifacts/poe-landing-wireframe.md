# Landing Page Wireframe: Awesome Squads Discovery-First Layout

**Author:** Poe, UX Engineer  
**Date:** 2026-03-16  
**Status:** Concrete Recommendation (ready for dev handoff)

---

## Executive Summary

Reorder the landing page to lead with **discovery and search**, not installation. Move Quickstart below the fold. Introduce a searchable, multi-select tag filter for scaling beyond ~20 focus areas. This mirrors the proven pattern from awesome-copilot and unblocks the directory from becoming visually overwhelming as the squad registry grows.

---

## Page Sections (Top to Bottom)

### 1. HERO (Above fold)

**Content:**
```
┌─────────────────────────────────────────────────┐
│  AWESOME SQUADS                                 │
│  Discover GitHub Copilot squad manifests        │
│                                                 │
│  Find the right squad for your team's workflow. │
│  Browse by mission, focus area, or search by    │
│  name or skill.                                 │
│                                                 │
│  [Search: "Search squads, members, focus..." 🔍] │
│                                                 │
│                  ↓ Results inline (optional)   │
│                                                 │
│  Squads: 14 | Members: 42 | Focus areas: 18    │
└─────────────────────────────────────────────────┘
```

**Hero Copy Direction:**
- Lead with **value**: "Discover the right squad"
- Avoid installation language ("Install Squad…")
- Emphasize **discovery pattern**: "Browse" + "Search"
- Stats show scale (counts give credibility)

**Action Buttons:**
- **Primary:** Search input (replaces "Browse squads" button; search is the CTA)
- **Secondary:** Links to "Submit a squad" (PR guide) + "Documentation" (getting started)
- Move "Install Squad" and "Quickstart" buttons below fold

---

### 2. DIRECTORY & FILTERS (Primary content area)

#### 2a. Filter Panel (Left or Collapsible on Mobile)

**Structure:**
```
┌─ FILTERS ─────────────────────────┐
│                                   │
│ STATUS                            │
│  ◉ All squads                     │
│  ○ Live                           │
│  ○ Building                       │
│  ○ Prototype                      │
│                                   │
│ FOCUS AREAS [Expand ▼]            │
│                                   │
│ If collapsed:                     │
│ [18 focus areas available]        │
│                                   │
│ If expanded:                      │
│ [Search tags: "api"]              │
│  ☑ API        (3)                 │
│  ☐ CI/CD      (5)                 │
│  ☐ GitHub Pages (2)               │
│  ☐ Deployment (4)                 │
│  ...                              │
│  [Clear all] [Apply]              │
└─────────────────────────────────────┘
```

**Key UX Details:**
- Status: **Single-select radio** (existing pattern; simple)
- Focus: **Searchable checkbox list** with facet counts
  - Show only top 8–10 tags initially, "Search to find more"
  - Autocomplete as user types (e.g., "git" surfaces "GitHub Pages", "Git Workflow")
  - Facet counts show *available results* for each tag
- "Clear all" button resets both filters
- On mobile: collapse filters into a drawer or tab

**Information Hierarchy:**
- Status first (broad category)
- Focus second (narrow by expertise/domain)
- Both preserve URL state via hash (existing behavior)

---

#### 2b. Results Summary & Card Grid (Right, Below Filters)

**Summary Line:**
```
Showing 8 of 14 squads · Filter by focus to narrow results
```

**Grid Layout:**
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Squad Card      │ Squad Card      │ Squad Card      │
│ (3 per row)     │                 │                 │
├─────────────────┼─────────────────┼─────────────────┤
│ Squad Card      │ Squad Card      │ Squad Card      │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

---

### 3. SQUAD CARD: Information Hierarchy

**Current card structure is good; refine info density:**

```
┌──────────────────────────────────────┐
│ [BADGE] Frontend Squad               │ (status badge, title)
│ React + TypeScript experts           │ (tagline: 1 line max)
│                                      │
│ [API] [CI/CD] [GitHub Pages]        │ (focus chips: 3 max, rest in detail)
│                                      │
│ Members: 3   |   Repo: frontend/core │ (metadata: compact)
│                                      │
│ 👤 Sarah (Lead) 👤 Mike  👤 Alex    │ (member preview: 3 faces)
└──────────────────────────────────────┘
```

**Card Guidelines:**
- **Title:** Squad name (short)
- **Eyebrow:** Status (Live / Building / Prototype)
- **Tagline:** One-line mission (what does this squad *do*?)
- **Focus chips:** Show top 3 tags; link to filter by that tag
- **Metadata:** Member count + source repo link (compact layout)
- **Member preview:** Avatar tiles (3 max), tap to see full roster in detail panel
- **Click anywhere on card** to open detail panel (existing behavior is good)

---

### 4. DETAIL PANEL (Right sidebar, existing)

**No changes needed.** Responsive panel shows:
- Full squad mission
- Complete member roster + expertise
- Links to source repo
- Copy-link button (existing)

**Mobile:** Stack below card grid (existing responsive behavior)

---

### 5. QUICKSTART / GETTING STARTED (Below the fold, collapsible)

**Two options (recommend Option A for MVP):**

**Option A: Collapsible accordion section**
```
┌──────────────────────────────────────────────┐
│ How to Adopt a Squad [Expand ▼]              │
│                                              │
│ (Collapsed by default; expands to show:)     │
│ 1. Install Squad CLI                         │
│ 2. Initialize your repo                      │
│ 3. Pick a squad from the directory (above)   │
│ 4. Copy or import the manifest               │
│ 5. Open Copilot and select Squad             │
└──────────────────────────────────────────────┘
```

**Option B: Separate page** (`/getting-started`)
- Link from hero: "Need help adopting a squad? [Getting Started Guide](/getting-started)"
- Keeps landing clean, users who need it find it via hero link

**Recommendation:** Start with **Option A** (accordion). Less friction, still discoverable. Test whether users scroll to it; if not, move to separate page later.

---

## What Moves Below the Fold or to Separate Page

| Content | Current | Recommended | Rationale |
|---------|---------|-------------|-----------|
| Installation (`npm install -g`) | Above fold (dominant) | Below fold (accordion) | Blocks discovery; relevant only to ready-to-adopt users |
| 4-step quickstart cards | Prominent section | Accordion or separate page | Too prescriptive; most users just want to browse first |
| "Submit a squad" CTA | In footer or secondary | Hero button | Important for growth; should be visible to prospective authors |
| Global search | Present but not prominent | Hero search input | Mirror awesome-copilot; make it the primary CTA |

---

## Discovery/Filter Model: Handling 20+ Tags

### Problem
- Current: Single-select chip filters in a row
- Breaks at ~8 tags; beyond that, scrolling + cognitive load

### Solution: Multi-Select + Searchable Dropdown

**Interaction Flow:**
1. User clicks "FOCUS AREAS [Expand ▼]"
2. Panel expands, showing:
   - Search input: `[Search tags: "_____"]`
   - Checkboxes for available tags with facet counts
   - Checked tags highlighted
3. User types "git" → filters to tags matching "git"
   - `GitHub` (8), `GitHub Pages` (3), `Git Workflow` (2)
4. User checks 1–3 tags → results update in real time (no "Apply" button needed, or keep it for clarity)
5. "Clear all" resets both Status and Focus to defaults

**Why This Scales:**
- Autocomplete hides irrelevant tags (user sees only ~10 matches, not 20+)
- Facet counts show how many squads match (helps user decide)
- Multi-select allows combos ("GitHub" + "API" = squads covering both)
- Matches GitHub PR filters, npm package filters (familiar pattern)

**Accessibility:**
- ARIA labels on checkboxes + search input
- Keyboard navigation (arrow keys, Enter to toggle)
- Filter changes announce results via `aria-live` (existing)

---

## Text Wireframe: Full Landing Page Layout

```
────────────────────────────────────────────────────────────────
                        HERO SECTION
────────────────────────────────────────────────────────────────

          AWESOME SQUADS
          Discover GitHub Copilot squad manifests

    Find the right squad for your team's workflow.
    Browse by mission, focus area, or search by name or skill.

    [Search: "Search squads, members, focus..." 🔍        ]

    Squads: 14 | Members: 42 | Focus areas: 18

    [Submit a squad] [Documentation] [GitHub]

────────────────────────────────────────────────────────────────
                     DIRECTORY SECTION
────────────────────────────────────────────────────────────────

┌─ FILTERS              ┬─ RESULTS ────────────────────────────┐
│                       │                                       │
│ STATUS                │ Showing 8 of 14 squads               │
│  ◉ All                │ Filter by focus to narrow results     │
│  ○ Live               │                                       │
│  ○ Building           │ ┌──────────┬──────────┬──────────┐   │
│  ○ Prototype          │ │  Squad   │  Squad   │  Squad   │   │
│                       │ │  Card    │  Card    │  Card    │   │
│ FOCUS AREAS [Expand] │ │ (3 cols) │          │          │   │
│ [18 available]        │ └──────────┴──────────┴──────────┘   │
│                       │ ┌──────────┬──────────┬──────────┐   │
│ [if expanded:]        │ │  Squad   │  Squad   │  Squad   │   │
│ Search: "____"        │ │  Card    │  Card    │  Card    │   │
│                       │ └──────────┴──────────┴──────────┘   │
│ ☑ API (3)            │                                       │
│ ☐ CI/CD (5)          │                      [DETAIL PANEL] │
│ ☐ GitHub Pages (2)   │                      (right sidebar)  │
│ ☐ Deployment (4)     │                                       │
│ ... (search to find) │                                       │
│                       │                                       │
│ [Clear all] [Apply]   │                                       │
└───────────────────────┴───────────────────────────────────────┘

────────────────────────────────────────────────────────────────
                  HOW TO ADOPT A SQUAD (Collapsed)
────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────────┐
│ How to Adopt a Squad [Expand ▼]                                │
│                                                                │
│ Install Squad, initialize your repo, pick a squad above, and  │
│ copy or import the manifest. See [Getting Started] for details.│
└────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────
```

---

## Implementation Notes

### Phase 1: MVP (Highest ROI)
1. **Reorganize hero:** Move Quickstart below fold; emphasize search
2. **Implement multi-select focus filters** with search input
3. **Update hero copy** to avoid "Install" language
4. **Add facet counts** to filter options
5. Result: Unblocks growth to 20+ tags, mirrors awesome-copilot pattern

### Phase 2: Enhancement
1. Add "Browse by Category" cards above directory (if curator defines categories)
2. Make Quickstart a separate page or accordion with better styling
3. Improve mobile responsiveness (filters → drawer)

### Phase 3: Future
1. Advanced search (syntax: `focus:api author:sarah`)
2. Saved filters (bookmarks)
3. Squad recommendations based on selection

---

## Rationale

**Why reorder?**
- Current site leads with **how to install**, not **what's available**
- New visitors bounce if they don't find what they're looking for first
- awesome-copilot leads with browsable content; we should too

**Why multi-select filters?**
- Single-select breaks at scale (20+ tags)
- Multi-select + search is the industry standard (GitHub, npm, Slack)
- Autocomplete reduces cognitive load

**Why move Quickstart below?**
- Installation is a **second-step action** (only after discovery)
- Blocks the primary UX flow (browse → select → learn how → install)
- Collapsible or separate page keeps it accessible

**Why prominent search in hero?**
- Fastest path for power users (search by name, focus area, member)
- Matches competitor pattern (awesome-copilot)
- Reduces friction for "know what I want" users

---

## Success Metrics

After redesign, measure:
1. **Time to first card click** (should decrease)
2. **Directory scroll depth** (should increase; content is more discoverable)
3. **Filter usage** (facet counts help; should see more multi-select combos)
4. **Squad detail panel opens** (key conversion event)
5. **Squad adoption flow** (follow from detail panel → source repo → PR submission)

---

## Open Questions for Team

1. **Should we categorize squads explicitly** (e.g., "Backend", "Frontend", "DevOps") or rely on focus tags?
2. **Quickstart: accordion or separate page?** (Recommend accordion for Phase 1)
3. **Are there "featured squads"** we want to highlight? (Could add a carousel in hero if yes)
4. **Mobile filter UX:** Drawer, tabs, or accordion? (Recommend drawer for discovery-first feel)

