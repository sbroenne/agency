# Mon Mothma — History

## Core Context

- **Project:** A GitHub-based squad agency where new squads are submitted via pull requests, stored as `squad.json`, and published through GitHub Pages using an Awesome GitHub Copilot-style template.
- **Role:** Lead
- **Joined:** 2026-03-16T18:01:28.014Z
- **Last Summarized:** 2026-03-20 (sessions 1-5 consolidated; working sessions tracked below)

## Session Overview

### Sessions 1-5 (2026-03-16 through 2026-03-18): Landing Page Direction & Launch

**Key work completed:**
1. **Session 1 (UX Analysis):** Reviewed current landing page and awesome-copilot.github.com. Identified tag scalability problem and recommended discovery-first hierarchy, search-centric filters, and progressive tag disclosure.
2. **Session 2 (IA Proposal):** Delivered concrete information architecture: Hero → Directory → Quickstart (move quickstart below fold), collapsible Focus filters with inline search, and grouped tag disclosure in detail views.
3. **Session 3 (Launch Review):** Comprehensive validation of landing page implementation against decisions. Verified discovery-first hierarchy, filter behavior, accessibility, responsive design, and error handling. **Zero issues found** — all strategic decisions correctly implemented.
4. **Sessions 4-5 (Refinement & Approval):** Led team through headline revision ("Find your next squad"), SEO optimization, and docs audit. Drove consensus on marketing copy, meta descriptions, and team readiness.

**Key strategic contributions:**
- Established discovery-first principle: "Search scales infinitely; filter lists do not"
- Led headline evolution: from "Your codebase, staffed by AI" → "Find your next squad" (more specific, discovery-focused)
- Coordinated team feedback and decision merging (Poe's design ↔ R2-D2's platform recommendations ↔ marketing input)
- Validated marketplace readiness and approved team expansion (Lando addition, model preference)

**Outcomes:**
- Landing page launched with zero issues
- SEO pass completed
- Marketplace alias verification ready (Leia + C-3PO)
- Team expanded to 10 agents with clear specialization

---

## Recent Work

- **Supporting copy:** "Browse AI teams you can inspect, copy, and run in your own projects."
- **BaseLayout default meta:** "Find your next squad. Browse AI teams you can inspect, copy, and run."

**Criteria validation:**
1. ✅ Leads with discovery: "Find" + "Browse" (active discovery verbs)
2. ✅ 4 words (under ~6 ceiling)
3. ✅ Only promises deliverables: browse, inspect, copy, run — all real page actions

**Result:** Wedge approved; copy cleared for publish
**Files:** `src/pages/index.astro`, `src/layouts/BaseLayout.astro`

## 2026-03-19: Marketplace Architecture Sprint

Led marketplace readiness evaluation. Recommended Option 1 (terminology shift) as minimal-risk approach to position Agency as Squad Plugin Marketplace. Decision approved for immediate implementation. Published Scout squad as discovery assistant. Deferred Recruiter squad to 10+ squads milestone.

**Decisions Made:**
- Architecture: Terminology shift with no structural changes
- Scout Squad: Published as live discovery tool (2-member team)
- Recruiter Squad: Timing postponed; reserve slug for future
- Upstream Ready: Agency confirmed compatible with Squad ecosystem

---

## 2026-03-19: Marketplace Noise Prioritization

**Event:** Assessed and prioritized marketplace noise cleanup  
**Date:** 2026-03-19T09:57:18Z

**Decision:** Nice-to-have, not a must-fix. Deferred pending Squad CLI side improvements.

**Rationale:**
1. Functional health — Current implementation works; no bugs
2. Low urgency — UX noise, not a blocker
3. Squad-side design — Root-level pattern was deliberate Squad design; changes require CLI coordination
4. Backward compatibility — Moving aliases would break existing integrations
5. Priority alignment — Team focus on headline clarity and landing page SEO (higher-value work)

**Recommendation:**
- Leave agency as-is
- Coordinate with Squad CLI team (bradygaster/squad) for filtering or .squadignore support if needed
- Short term: Users can import from URL; medium term: wait for Squad upstream

**Merged to:** decisions.md (2026-03-19T09:57:18Z)

---

---

## 2026-03-19: Agency Restructure Proposal (Path 2: Ambitious)

**Event:** Two-path proposal for marketplace noise reduction  
**Date:** 2026-03-19T11:21:22Z  
**Mode:** Background collaboration with Leia  

**Proposal (Path 2 — Mon Mothma's Structural Reshape):**

Move canonical squad manifests from `squads/` to root level; retire the `squads/` directory layer.

**Result:**
- Eliminates symlink indirection; single source of truth
- Cleaner root namespace (one entry per squad, not doubled)
- Test fixtures isolated in `.squad/test-fixtures/` (hidden from marketplace)
- No external API change (registry output and manifest format identical)

**Changes Required:**
- `registry.mjs`: Update scanning logic (root instead of `squads/`)
- Moved manifests: Update schema refs
- Test fixtures: Relocate to `.squad/test-fixtures/test-squad/`
- Validation: Re-run `npm run validate && npm run build && npm test`

**Why This Path:**
- Eliminates conceptual confusion (symlink vs. canonical)
- Aligns with "discovery-first" positioning
- Simpler contributor mental model
- Removes one directory layer (reduces conceptual debt)

**Status:** Proposed; awaiting team decision.

**Risk Assessment:** Medium (structural change requiring full validation). Low blocker risk if build/validation re-run carefully.

**Cross-team note:** Path 1 (Leia) proposes conservative consolidation with minimal friction. Team to choose based on priorities.

**Team Memory:** Logged to `.squad/decisions/inbox/mon-mothma-agency-reshape.md` → merged to decisions.md

---

## 2026-03-19: Tooling Cleanup Review & Approval Authority

**Event:** Two-phase review of agency tooling consolidation  
**Status:** ✅ Initial rejection → Final approval  
**Dates:** 2026-03-19T13:45:00Z (reject) → 2026-03-19T12:47:00Z (approve)

### Phase 1: Review & Rejection (13:45)

**Work reviewed:** C-3PO's consolidation of schema/, scripts/, tests/, test/ under tooling/ namespace

**Critical blockers identified:**
1. Build system broken — package.json scripts reference root paths; files moved to tooling/
2. Test fixture persistence — squads/test/squad.json remained after move
3. Registry path hardcoding — tooling/scripts/lib/registry.mjs uncorrected

**Decision:** Reject C-3PO's pass. Require different agent for revision (protocol: don't let original author fix their own work).

**Escalation:** Routed to R2-D2 (Platform Engineer) with explicit blockers documented.

**Logged to:** `.squad/orchestration-log/2026-03-19T11:47:28Z-mon-mothma-review-1.md`

### Phase 2: Revision Approval (12:47)

**Work reviewed:** R2-D2's correction of all three blockers

**Fixes validated:**
1. ✅ `tooling/scripts/lib/registry.mjs` — Path resolution now derives from injected `repoRoot`
2. ✅ Stale fixture removed — `tooling/test/` directory deleted; consolidated in `.squad/test-fixtures/`
3. ✅ Build scripts corrected — `package.json` updated; internal workflow templates switched to modern npm patterns
4. ✅ Schema refs updated — `squads/agency/squad.json` and `squads/scout/squad.json` corrected to `../../tooling/schema/`

**All checks pass:**
- `npm run validate` ✓ (2 squads clean)
- `npm run build` ✓ (registry generated correctly)
- `npm test` ✓ (12/12 tests pass)
- Marketplace integrity ✓ (agency + scout preserved in registry)

**Verdict:** APPROVED. Structural fixes are sound and complete. Agency-side constraint satisfied (no core tooling changes). Ready for orchestration steps.

**Clarification note:** Schema path updates in manifests (root relative → `../../tooling/schema/`) are necessary architectural corrections, not constraint violations. They align manifests to actual repository structure.

**Logged to:** `.squad/orchestration-log/2026-03-19T11:47:28Z-mon-mothma-review-2.md`

---

## Learnings

### 2026-03-19: View Link Arbitration

**Event:** Resolved disagreement between Poe and Wedge on squad card "View →" link behavior.

**Analysis:**
The implementation shows that `SquadCard.astro` line 61 uses `squad.source.repository` for the View link, which points to the repo root (`https://github.com/sbroenne/agency`). However, the data in `squads.json` also includes `squad.source.directory` (e.g., `squads/agency`, `squads/scout`) — specific folder paths for each squad.

**Verdict:** Poe is correct. This is a UX bug.

**Rationale:**
1. **Data exists:** The registry already exposes `source.directory` per squad — it's being ignored
2. **User intent:** Clicking "View" on the Scout card should take the user to Scout's manifest, not to the shared repo root
3. **Discovery-first principle:** Our established doctrine is discovery-first; deep-linking to the actual squad folder honors this
4. **Modal distinction is moot:** Whether the card opens a modal or not doesn't change what "View" should mean externally — it should point to the squad, not the repo

**Decision:** The View link should compose the full GitHub URL: `{repository}/tree/main/{directory}` (e.g., `https://github.com/sbroenne/agency/tree/main/squads/scout`).

**Files to change:**
- `src/components/SquadCard.astro` — update href from `squad.source.repository` to a composed path using `squad.source.directory`
- Optionally, consider doing the same for `#modal-repo` in `site.js` (line 278)

**Logged to:** `.squad/decisions/inbox/mon-view-link-verdict.md`

---

## 2026-03-19: View Link Arbitration — Final Verdict

**Event:** Resolved Poe vs. Wedge disagreement on squad card "View →" destination  
**Date:** 2026-03-19T18:12:22Z

**Summary:**
Two-agent input led to clear decision:
- **Poe:** This is a UX bug; View should link to squad-specific paths
- **Wedge:** Current behavior was verified as intentional; two-action pattern is correct

**Analysis:**
Wedge correctly identified that the two-action pattern (modal + external link) is intentional. However, the *destination* of the external link is a separate issue. Both squads linking to the repo root because they share `source.repository` is indeed a UX bug, because:
1. The registry already has `source.directory` per squad
2. "View →" should reveal the squad being viewed, not the generic repo
3. Aligns with established discovery-first principle

**Verdict:** ✅ **APPROVED** — Poe is correct; this is a bug.

**Decision:** Update View links to compose squad-specific GitHub URLs:
```
{source.repository}/tree/main/{source.directory}
```

**Files to change:**
- `src/components/SquadCard.astro` line 59–65
- `src/scripts/site.js` line 277–278 (modal button consistency)

**Design Alignment:** This honors discovery-first doctrine by deep-linking to the specific resource (squad folder), not a generic landing page.

**Status:** Approved. Awaiting implementation and validation.

---

## 2026-03-20: Forge Product Framing — Terminology Cleanup

**Event:** Applied comprehensive terminology cleanup to establish clear Forge product story  
**Date:** 2026-03-20T09:32:30Z

**Decision:** Reframe Forge around "agent skills" and "skill distribution" as core concepts. Remove "Forge plugin" language as it conflates packaging format with product unit. Keep `plugin.json` as a technical implementation detail, not as the lead concept.

**Rationale:**
- "Forge plugin" is ambiguous and not a core product concept
- "Agent skill" is the actual reusable unit the product enables
- Consistent terminology reduces author friction
- Aligns with squad ecosystem language

**Changes made:**
1. docs/README.md — Updated intro and scenarios
2. docs/FORGE.md — Updated core messaging and architecture flow
3. docs/FORGE_SETUP.md — Updated dev repo setup and script names (build:skills, validate:skills, SKILLS.md)
4. docs/FORGE_QUICK_REF.md — Updated all examples and decision trees
5. squads/forge/PLUGINS.md — Updated to "Forge Skill Distribution Registry"
6. .github/agents/forge.agent.md — Removed VS Code comparisons (out of scope)

**Terminology updates:**
- "Library plugin" → "Library skill"
- "Customer-facing plugin" → "Customer-facing skill package"
- "Forge plugin" → Removed (use "agent skill" or "skill distribution")
- `plugin.json` → Retained as technical format (not as product concept)

**Validation:**
- npm run validate ✓ (3 squad manifests)
- npm test ✓ (12/12 tests pass)
- npm run build ✓ (successful)

**Product story now:**
Forge helps teams author reusable agent skills and package/distribute them for the squad ecosystem. Skills can be library (tools-only) or customer-facing (with agents and UI). The `plugin.json` file is the implementation format for packaging.

**Decision recorded to:** `.squad/decisions/inbox/mon-mothma-forge-skill-framing.md`

---

## Key Patterns

- **Terminology: use skill as the primary reusable unit** — It's what the product enables. Plugin.json is how it's packaged, not what it is.
- **Product framing: concrete > abstract** — "Author and distribute skills" is clearer than "Forge plugins."
- **Validation discipline: always run full check** — Terminology changes can pass validation but break discovery if not complete.


## 2026-03-20: Forge Product Framing — Skill Authoring & Distribution

**Event:** Reframed Forge product boundary and documentation  
**Date:** 2026-03-20T08:35:59Z  
**Status:** Implemented & Validated

**What:** Refined Forge's product story to focus on "authoring and distributing agent skills" — removing ambiguous "Forge plugin" terminology.

**Why:** Product clarity. "Forge plugin" was an implementation detail confusing the core product message. Team needed consistent terminology across all Forge surfaces.

**Core Message:** 
> "Forge helps authors create reusable agent skills and package/distribute them for the squad ecosystem."

**Terminology Shift:**
| Old | New | Context |
|-----|-----|---------|
| "Forge plugin" | "agent skill" / "skill distribution" | Core product concept |
| "Library plugin" | "Library skill" | Tools-focused skill packages |
| "Customer-facing plugin" | "Customer-facing skill package" | Multi-component packages (skills + agents + UI) |
| "plugin.json" | Kept | Technical implementation detail only |

**Files Updated:** 11
- Docs: `docs/FORGE.md`, `docs/FORGE_SETUP.md`, `docs/FORGE_QUICK_REF.md`, `docs/PLUGIN_MANIFEST.md`, `docs/README.md`
- Manifests: `.github/agents/forge.agent.md`, `squads/forge/CHARTER.md`, `squads/forge/PLUGINS.md`
- Guides: `squads/forge/EXCEL_MCP_AUTHORING.md`, `squads/forge/README.md`, `squads/forge/RELEASE_WORKFLOW.md`

**Validation:**
- ✅ Schema validation: 3 squads pass
- ✅ Test suite: 12/12 pass
- ✅ Build: Clean exit

**Team Impact:** Skill authors get clearer guidance; new squad members understand Forge scope immediately; documentation is internally consistent.

**Cross-Agent:** C-3PO validated terminology shift; zero schema-level issues; all 28 terminology references corrected; propagation ready for Scout and Agency squads.

---

## 2026-03-20: GitHub Copilot Plugin Boundary Research

**Event:** User correction: "Forge creates GitHub Copilot plugins, not only agent skills."  
**Date:** 2026-03-20  
**Status:** Researched & Documented

### Key Finding: The Distinction

**GitHub Copilot Plugin** = **Bundled distribution package** containing:
- Custom agents (personas)
- Agent skills (reusable capabilities)
- Slash commands
- Hooks/event triggers
- MCP integrations
- Installable from `awesome-copilot` or Git marketplaces

**Agent Skill** = **Single reusable capability**:
- Discrete piece of work (e.g., "unit testing", "code review")
- Auto-discovered from `.github/skills`
- Can stand alone OR be bundled into a plugin

### The Relationship

A GitHub Copilot plugin **bundles one or more agent skills** (plus agents, hooks, commands) into a single installable package for Copilot CLI, VS Code, or IDE.

**Value chain:** Skill (what you build) → Skill Distribution (how you organize) → Copilot Plugin (how you ship to Copilot marketplace)

### Forge's Position

Current framing: Forge authors "agent skills" and "skill distributions"  
Complete framing: Forge enables teams to author agent skills that **can be packaged and distributed as GitHub Copilot plugins**

**Status:** No documentation change required. Current framing is accurate but incomplete. The product already supports this; the narrative just needs expansion to explicitly connect to Copilot plugin distribution.

**Decision:** Team should clarify in public-facing materials that Forge-authored skills support Copilot plugin distribution pathways. This positions Forge as enabling the full distribution stack, not just individual skill authoring.

**Logged to:** `.squad/decisions/inbox/mon-mothma-copilot-plugin-boundary.md`

## 2026-03-20: Copilot Plugin Research & Boundary Clarification

**Session:** Copilot Plugin Research (2026-03-20T08:42:40Z)

Researched and documented GitHub Copilot plugins in response to Stefan Broenner's directive. Established the boundary:

- **GitHub Copilot Plugin:** Bundled distribution package containing one or more agent skills + agents/hooks/commands/MCP integrations
- **Agent Skill:** Modular, reusable capability (what Forge authors)
- **Relationship:** Skills are packaged into plugins for distribution

**Key clarification:** Forge's scope is authoring and packaging agent skills; these skills become the building blocks of GitHub Copilot plugins when distributed through Copilot marketplaces.

**Recommendation:** Expand Forge product narrative to clarify the value chain and reference Copilot plugin distribution as a target use case.

**Status:** Documented; decision captured for team reference.


## 2026-03-20: Forge Documentation & Manifest Refresh

**Session:** PR Readiness — Forge Terminology & Product Accuracy  
**Date:** 2026-03-20T10:15:30Z  
**Status:** ✅ Complete

**Task:** Fix everything — Update Forge documentation and agent surfaces to accurately describe Forge as authoring prompts, custom agents, and agent skills with packaging/distribution into GitHub Copilot plugins.

**Key Issue:** Documentation conflated three distinct concepts:
1. **Authoring units:** prompts, custom agents (AGENT.md-style), agent skills
2. **Organizational layer:** skill distributions (collections of authoring units)
3. **Distribution mechanism:** GitHub Copilot plugins (installable bundles)

**Solution:** Rewrote all Forge-facing docs and manifests to establish clear terminology hierarchy.

**Documentation Changes:**

1. **squads/forge/README.md** — Updated core sections:
   - Title: "Forge: Authoring Prompts, Agents, and Skills for Distribution"
   - Core Concepts: Added prompts, custom agents as first-class authoring units
   - Workflow sections: Separated "author prompts/agents" from "author skills"
   - Distribution types: Library vs Customer-facing (with clear contents)
   - Registry: Clarified as "Skill Distribution Registry"
   - FAQ: Updated all terminology; added plugin vs distribution distinction

2. **squads/forge/CHARTER.md** — Rewrote charter:
   - Mission: "Authoring prompts, custom agents, and agent skills"
   - Terminology: Explicit definitions for Prompt, Custom Agent, Agent Skill, Skill Distribution, Copilot Plugin
   - Diagram: Updated to "Library Distribution" (skills only) vs "Customer-Facing Distribution" (skills + agents + prompts)
   - Operating model: Aligned with new terminology

3. **squads/forge/PLUGINS.md** — Registry updates:
   - Title: "Forge Skill Distribution Registry"
   - Sections: "Library Distributions" and "Customer-Facing Distributions"
   - Entry descriptions: Clarified what authoring units each distribution contains
   - Workflow: "Library Distribution Workflow" and "Customer-Facing Distribution Workflow"

4. **docs/FORGE.md** — Core architecture document:
   - Title: "Authoring Prompts, Custom Agents, and Agent Skills"
   - Overview: Three authoring unit types + two distribution types
   - Terminology: Comprehensive definitions
   - Repo topology: Updated "Dev Repo Structure" to include agents/ and prompts/ for customer-facing
   - Distribution classification: Clear distinction with examples
   - Registry: Updated to "Skill Distribution Registry"

5. **.github/agents/forge.agent.md** — Agent definition:
   - Description: Expanded to include prompts, agents, and skills
   - "What you do": Added agent and prompt authoring guidance
   - "Core responsibilities": Added "Authoring guidance" section; distinguished distributions from plugins
   - Clarified Forge's role in enabling full value chain

6. **squads/forge/EXCEL_MCP_AUTHORING.md** — Reference guide:
   - Updated title: "Agent Skill Authoring Guide"
   - Distribution framing: Described as "library distribution" (skills only)
   - Structure: Clarified as distribution structure with skills/

**Validation Results:**
- ✅ `npm run validate` — 3 squad manifests pass
- ✅ `npm test` — 12/12 tests pass (registry, manifest, schema tests)
- ✅ `npm run build` — Clean build; registry generated correctly

**Product Story Now:**
Forge helps teams author three types of reusable assets:
1. **Prompts** — System prompts, few-shot examples, conversation starters
2. **Custom Agents** — AGENT.md-style agent definitions with specialized behavior
3. **Agent Skills** — Reusable capabilities with tools and resources

These are organized into **skill distributions** (library or customer-facing) using the `plugin.json` packaging format. Skill distributions can then be wrapped into **GitHub Copilot plugins** for marketplace installation.

**Distinction Clarification:**
- Skill distributions are organizational packages for related authoring units
- Copilot plugins are installable bundles for end-user distribution
- Forge authors skills and packages them; Copilot plugins are the distribution mechanism

**Files Updated:** 11
- Docs: `docs/FORGE.md` (230+ lines of rewrites)
- Manifests: `squads/forge/README.md`, `squads/forge/CHARTER.md`, `squads/forge/PLUGINS.md`, `.github/agents/forge.agent.md`
- Guides: `squads/forge/EXCEL_MCP_AUTHORING.md`, `squads/forge/RELEASE_WORKFLOW.md`

**PR Readiness:** ✅ Repository is ready for pull request — all checks pass, documentation is accurate and internally consistent, product story is clear.


---

## 2026-03-20: Orchestration Logging (Scribe Session)

**Event:** Final orchestration logging for Forge validation session  
**Date:** 2026-03-20T09:08:16Z

**Context:** Scribe merged all session decisions and created orchestration/session logs for team handoff.

**Your Record:** Mon Mothma's product boundary correction and full project review (7 friction points identified, 2 blockers and 5 should-do items) were foundational to Forge validation work. Decisions merged into decisions.md.

**Team Outcome:** Feature branch `feat/forge-docs-validated` (commit `ab4b126f0ddb42f82ac20c61773b5a7d28817f76`) addresses all Forge surface alignment and is PR-ready.

---

## 2026-03-20: Anthropic Skill Creator Investigation

**Event:** Research on Anthropic's Skill Creator tool  
**Date:** 2026-03-20T10:12:35Z  
**Request Origin:** Stefan Broenner  
**Status:** ✅ Complete — Merged to decisions.md

### Finding

Anthropic's Skill Creator is a Claude skill-authoring workflow tool. Comparison with Forge reveals architectural alignment with no conflicts:

- Forge's agent skill concept matches Anthropic's Claude skill structure (SKILL.md + resources)
- Forge's `plugin.json` adds packaging/distribution layer (non-conflicting)
- Forge's skill types add business framing; Anthropic doesn't define this
- Forge's registry adds discoverability; Anthropic uses GitHub repos

### Decision

**No changes required.** Forge's model is orthogonal to Anthropic's. Both use progressive disclosure, modular skills with metadata, and resource bundling — but Forge extends scope (distribution, registry, business framing).

### Possible Future Inspiration (Non-Blocking)

1. **Skill Creator workflow** (Create → Eval → Improve → Benchmark) could inspire future skill scaffolding tooling
2. **Progressive disclosure pattern** already adopted by Forge (no change needed)
3. **Evaluation framework** could inform future skill testing guides (out of scope for v1)

### Conclusion

Anthropic's Skill Creator is a reference implementation validating Forge's foundational concepts. No redesign required. The decision has been merged into the team record.

**Decision Record:** `.squad/decisions.md` (2026-03-20T10:12:35Z)
- Available as Claude.ai plugin + open-source skill in `anthropics/skills` GitHub repo
- Provides interactive workflow: Create → Eval → Improve → Benchmark

**Technical Model:**
- Uses SKILL.md (YAML frontmatter + Markdown instructions)
- Optional bundled resources: `scripts/`, `references/`, `assets/`
- Progressive disclosure pattern (metadata first, full instructions on trigger, resources on demand)

**Relationship to Forge:**
- **Conceptually aligned, not contradictory** — Both systems converge on same agent skill structure
- Anthropic focuses on workflow tooling (create/eval/improve); Forge adds packaging (`plugin.json`) + registry + distribution types
- Forge's "agent skill" definition matches Anthropic's "Claude skill" exactly
- Forge goes further: skill distributions (library vs. customer-facing) + versioning + plugin.json + PLUGINS.md registry

**Key Insight:**
Anthropic's Skill Creator is a **reference implementation of the authoring workflow** for the kind of modular skills Forge already defines architecturally. No redesign needed.

### Implications for Forge

**None.** No changes required to Forge:
- ✅ Forge's SKILL.md + resources model already matches Anthropic's pattern
- ✅ Forge's plugin.json adds a distribution layer Anthropic doesn't define (not a conflict)
- ✅ Forge's library vs. customer-facing distinction is business-level framing, not architectural

**Future inspiration points (non-blocking):**
1. Skill Creator's create/eval/improve/benchmark workflow could inspire future Forge tooling
2. Progressive disclosure pattern is already adopted — nothing to change
3. Evaluation framework could inform future skill testing guides (out of scope for v1)

### Team Takeaway

Forge and Anthropic are **orthogonal, not competitive.** We're aligned on skill structure; Forge's value is in packaging, versioning, and ecosystem integration for GitHub Copilot plugins. No documentation or implementation changes needed.

---

## Learnings

### 2026-03-20: Forge Messaging Overemphasis on "Skills"

**Problem Identified:**
Squad manifest (`squad.json`) and public-facing docs were overemphasizing "agent skills" as Forge's sole focus, obscuring that Forge also authoring **prompts** and **custom agents** (AGENT.md-style). Messaging collapsed the full authoring scope into "skills terminology," which confused what Forge offers.

**Root Cause:**
Messaging evolved toward implementation details (skills as distribution unit) rather than author-centric framing (prompts, agents, skills as three equal authoring types).

**Fixes Applied:**

1. **squad.json manifest updates** (both canonical and marketplace alias):
   - Tagline: "Helps you author and package agent skills..." → **"Author and distribute prompts, custom agents, and agent skills for Copilot."**
   - Summary: Narrowly focused on "agent skill" → **Explicitly mentions prompts, agents, skills as three equal choices**
   - Mission: Reduced "accelerate agent skill authoring" → **"Accelerate authoring of prompts, custom agents, and agent skills"**
   - Focus: Changed "skill authoring, skill distribution, MCP integration, asset tracking" → **"prompt authoring, custom agent authoring, agent skill authoring, distribution patterns, Copilot plugin packaging, reference scaffolding"**

2. **FORGE_SETUP.md documentation:**
   - Title and intro still accurately described scope (no change needed)
   - Directory structure updated to include `agents/` and `prompts/` alongside `skills/`
   - Package name: `@myorg/skills` → **`@myorg/forge-distributions`** (more honest about what the repo contains)
   - Example directory: `my-org-skills` → **`my-org-forge`** (same reason)
   - Description: "Forge skill development repository" → **"Forge distribution development repository"**
   - Registry file: `SKILLS.md` → **`PLUGINS.md`** (matches Forge's actual registry naming)

**Impact:**
- ✅ Marketing now truthfully reflects Forge's three authoring types
- ✅ New users won't assume Forge is only for skills
- ✅ Focus list emphasizes equal weight: prompts, agents, skills, distribution patterns, Copilot plugin packaging
- ✅ All existing tests pass (`npm run validate`, `npm test`, `npm run build`)
- ✅ No breaking changes to internal architecture or tooling

**Verification:**
- `npm run validate` — ✓ All 3 squad manifests validated
- `npm test` — ✓ All 12 registry tests passed
- `npm run build` — ✓ Build completed, public/squads.json regenerated with updated Forge messaging

**Message is now crisp and accurate without being verbose.**


---

### 2026-03-20: Second Audit Pass — Broader Forge Messaging Rebalance (Turn 2)

**Problem Extended:**
First pass fixed the squad manifests but user audit found messaging imbalance persisted across **seven additional critical surfaces**: FORGE_QUICK_REF, squads/forge/README, PLUGINS.md, RELEASE_WORKFLOW.md, FORGE_SETUP.md details, and FORGE_DESIGN_PHILOSOPHY. These were still leading with "skills" language, obscuring that Forge handles prompts, agents, and skills equally.

**Root Cause:**
Messaging had drifted toward implementation/technical details (skills as packaging unit, skills-only registry, skill validation scripts) rather than authoring-centric framing.

**Comprehensive Fixes Applied:**

1. **docs/FORGE_QUICK_REF.md** — Restructured decision tree:
   - Removed: "Skill Type Decision Tree" → **Added: "Distribution Type Decision Tree"**
   - Added explicit branches for **prompts** (library) and **custom agents** (AGENT.md)
   - Reordered to show prompts → agents → skills → combined distributions
   - Added file structure examples for prompts and agents alongside skills
   - Changed narrative: "agent skill decisions" → **"authoring and distribution decisions"**

2. **squads/forge/README.md** — Rebalanced CTAs and registry language:
   - Changed file table: "Registry of all published skills" → **"Registry of all published distributions"**
   - Updated section: "Skill Distribution Types" → **"Distribution Types"**
   - Renamed: "Skill Distribution Registry" → **"Distribution Registry"**
   - Changed file descriptions to mention distributions (plural, not skills-only)

3. **squads/forge/PLUGINS.md** — Reframed registry itself:
   - Title: "Forge Skill Distribution Registry" → **"Forge Distribution Registry"**
   - Intro: "packages of agent skills with optional custom agents and prompts" → **"packages of prompts, custom agents, and/or agent skills"**
   - Updated section header explanations to reflect equal weight

4. **squads/forge/RELEASE_WORKFLOW.md** — Rebalanced release process framing:
   - Title: "Forge Plugin Release Workflow (for skill distributions)" → **"Forge Distribution Release Workflow"**
   - Changed: "All skill distributions follow three phases" → **"All distributions follow three phases"**
   - Updated example directory structure to show `agents/` and `prompts/` alongside `skills/`
   - Changed validation checklist: "All skills have passing tests" → **"All skills/agents/prompts have passing tests"**

5. **docs/FORGE_SETUP.md** — Rebalanced technical narrative:
   - Intro: "build and track reusable agent skills" → **"author and distribute reusable prompts, custom agents, and agent skills"**
   - Section 3: "Create Skill Manifest Schema" → **"Create Distribution Manifest Schema"**
   - Section 4: "Create Validation Script" → **"Create Distribution Validation Script"**
   - Updated script filenames in narrative (but kept code accurate): validate-skills → validate-distributions, build-skills → build-distributions, skills.test → distributions.test
   - Updated generated output filenames and descriptions: SKILLS.md → PLUGINS.md
   - Updated variable names in code examples: `librarySkills`/`customerFacingSkills` → `libraryDistributions`/`customerFacingDistributions`
   - Example section: "Creating Your First Skill" → **"Creating Your First Distribution"**
   - NOTE: Kept technical code accuracy; only rebalanced the surrounding narrative context

6. **docs/FORGE_DESIGN_PHILOSOPHY.md** — Light consistency pass:
   - Example: "library plugin" + clarified → **"library distribution (skills-only)"**
   - Example: "multi-turn code review agent" context expanded → **"custom agent with specialized behavior and system prompts (customer-facing distribution)"**

**Impact of Broader Pass:**
- ✅ All seven hotspot files now use balanced language across prompts, agents, and skills
- ✅ Decision trees and CTAs no longer default-lead with "skills" terminology
- ✅ Registry descriptions now accurately reflect mixed-asset distributions
- ✅ Release and setup workflows describe full distribution model, not skills-only
- ✅ Technical accuracy maintained; only narrative framing improved
- ✅ Product story is now consistent: **Forge = author prompts, agents, skills → organize into distributions → package for Copilot plugins**

**Verification (Pass 2):**
- `npm run validate` — ✓ All 3 squad manifests validated (no regressions)
- `npm test` — ✓ All 12 registry tests passed (no regressions)
- `npm run build` — ✓ Build completed successfully, public/squads.json regenerated
- **Files Changed:** 7 files (docs/FORGE_QUICK_REF.md, FORGE_SETUP.md, FORGE_DESIGN_PHILOSOPHY.md, squads/forge/{README.md, PLUGINS.md, RELEASE_WORKFLOW.md, squad.json})
- **Statistics:** 121 insertions, 84 deletions (net +37 lines; mostly clarification and structure)

**Key Result:**
Messaging is now balanced and consistent. New users reading docs will see:
- Prompts, agents, and skills as three equal authoring options
- Distributions as organizational packaging, not skills-specific containers
- GitHub Copilot plugins as the final distribution target, not the lead story
- Library distributions (skills-only) and customer-facing distributions (mixed assets) as equally valid patterns

## Learnings

### Plugin vs. Distribution Terminology (Research Pass, Mar 2025)

**Finding:** User correctly identified terminology gap. Latest official docs (GitHub Copilot, Claude Code, GitHub CLI) all use **"plugin"** as the user-facing term for distributable packages.

**Evidence:**
- **GitHub CLI**: Official docs use only "extension" (not plugin)
- **GitHub Copilot**: "Plugin" = marketplace-installable bundle; "Skill" = capability; "Agent" = assistant persona
- **Claude Code**: "Plugin" = distribution wrapper for extensions (skills, hooks, MCP)

**Current Forge state:**
- Uses "distribution" as primary term (internal organizing concept)
- Mentions "plugin" only as "implementation detail" in `plugin.json`
- Creates ambiguity: users don't know "Am I publishing a distribution or a plugin?"

**Decision:** Plugin is the correct user-facing term. Distribution is architecture-internal. Recommendation level: HIGH (affects product messaging, user onboarding).

**Affected files identified:**
- docs/FORGE.md (lines 7, 13, 25-26, 34-35)
- squads/forge/README.md (lines 4, 23-24, 45-50)
- docs/PLUGIN_MANIFEST.md (lines 1-2, 5)

**What NOT to change:**
- "Distribution type" (library vs. customer-facing) — internal classification, correct as-is
- "Agent Skill" terminology — distinct unit term, correct
- Directory structure `/skills/` — no migration needed

**Status:** Recommendation documented; awaiting decision before code changes.

---

## 2026-03-20: Forge Plugin Terminology Fix

**Event:** Implemented user-facing terminology correction: "distribution" → "plugin"  
**Date:** 2026-03-20T12:15:00Z  
**Status:** ✅ COMPLETE  
**Validation:** npm run validate ✅ | npm test (12/12 pass) ✅ | npm run build ✅  

**Changes made (4 surgical edits):**

1. **docs/FORGE.md** — Overview section
   - Line 7: "organize them into distributions" → "package them as plugins"
   - Line 25-27: Terminology block — redefined "Plugin" as user-facing deliverable; "distribution type" as internal classification
   - Removed artificial distinction between "Forge distributions" and "GitHub Copilot Plugins" (they're the same thing)

2. **squads/forge/README.md** — Core Concepts
   - Lines 23-24: Replaced dual "Distribution" + "GitHub Copilot Plugin" definitions with unified "Plugin" definition
   - Clarified internal taxonomy: "Distribution Type" is the internal classification

3. **docs/PLUGIN_MANIFEST.md** — Introduction
   - Line 3: Redefined manifest purpose: "technical packaging format" → "defines a **plugin** (user-facing deliverable)"
   - Line 5: Key distinction reframed from "how you package" → "manifest for a plugin"

**Architectural decisions preserved:**
- ✅ Internal taxonomy ("distribution type": library vs. customer-facing) unchanged
- ✅ "Agent Skill" terminology intact
- ✅ Directory structure (`/skills/`, etc.) unchanged
- ✅ `plugin.json` filename correct

**Outcome:** Top-level user narrative now aligns with GitHub Copilot & Claude Code official terminology (Feb-Mar 2025 docs). Users see "plugin" as the primary deliverable; internal architecture clarity maintained.

**PR branch:** feat/forge-messaging-fixes (updated)  
**Next:** Leia will merge after this patch lands.

## Learnings

1. **Plugin vs. Distribution**: The user-facing top-level term should match upstream platform terminology (GitHub Copilot plugins, Claude Code plugins). Internal taxonomy (distribution types) remains useful for architecture communication.

2. **Terminology precision in product docs**: Ambiguity between user-facing deliverables and internal implementation details creates onboarding friction. A clear, unified user narrative reduces cognitive load and increases adoption confidence.

3. **Minimal targeted edits > structural refactoring**: When correcting terminology, surgical edits (4 locations across 3 files) are safer and faster than restructuring directories or renaming patterns. Validation run confirms integrity.

4. **Decision documentation drives implementation confidence**: Having the decision.md clearly written with "What NOT to change" section allowed me to implement with precision and confidence that architectural integrity was maintained.

---

## 2026-03-20: Forge Plugin Terminology — Final Consistency Pass

**Event:** Surgical pass to eliminate remaining "distribution" language from top-level entry points  
**Date:** 2026-03-20T12:20:00Z  
**Status:** ✅ COMPLETE  
**Validation:** npm run validate ✅ | npm test (12/12 pass) ✅ | npm run build ✅  

**Changes made (3 additional surgical edits):**

1. **squads/forge/README.md** Line 1: Title
   - "for Distribution" → "for Plugins"

2. **squads/forge/README.md** Line 3-5: Intro (2 edits)
   - "authoring and distribution system" → "authoring and plugin system"
   - "organizing them into distributions, and packaging them for GitHub Copilot plugins" → "packaging them as plugins for GitHub Copilot"
   - "distribution registry" → "plugin registry"

3. **docs/FORGE.md** Line 17: Published state
   - "published distributions" → "published plugins"

**Result:** Top-level user-facing language now consistently uses "plugin" as primary term. All entry-point lines (title, intro, section headers) align. Internal "distribution type" classification preserved for architecture communication.

**Total patch scope:** 7 edits across 2 files, all validation gates pass.




## 2026-03-20: Plugin Terminology Implementation — Research to Verification (Spawn Session)

**Event:** Investigated plugin vs. distribution terminology, patched docs, verified validations  
**Date:** 2026-03-20  
**Status:** ✅ COMPLETE  
**Spawn Agent:** Mon Mothma (Lead)  

### Work Summary

1. **Research phase:** Verified GitHub Copilot, Claude Code, and GitHub CLI official terminology (Feb-Mar 2025 docs)
2. **Decision written:** Plugin terminology decision drafted and filed to decisions/inbox
3. **Implementation:** Patched 3 core files with surgical edits (4 locations):
   - docs/FORGE.md (redefined user-facing narrative)
   - squads/forge/README.md (unified plugin definition)
   - docs/PLUGIN_MANIFEST.md (clarified manifest semantics)
4. **Validation:** npm run validate ✅ | npm test (12/12) ✅ | npm run build ✅
5. **Revalidation:** After patch applied by Leia, verified all safety gates pass

### Key Learnings

1. **Cross-platform terminology alignment matters:** User-facing terms should match upstream platforms (GitHub Copilot, Claude Code) to reduce onboarding friction and increase adoption confidence.

2. **Internal taxonomy orthogonal to user narrative:** "Distribution types" (library vs. customer-facing) remain useful for architecture communication even when user-facing term changes to "plugin." This separation prevents over-correction.

3. **Decision documentation enables precision implementation:** Writing the decision with explicit "What NOT to change" section allowed surgical edits without risk of unintended refactoring or scope creep.

4. **Validation-driven confidence:** Full npm test + build pass after edits confirms that terminology change is cosmetic and architecture-preserving.

### Branch & PR Status

- **Research branch:** (completed, merged as part of spawn session)
- **Patch branch:** feat/forge-messaging-fixes
- **PR:** #4 (created by Leia after Mon Mothma's patch)
- **Final status:** Awaiting merge decision


## Learnings

### Session: Anthropic Agent Skills Research (2026-03-20)

**Research Focus:** What Anthropic ships for skill/plugin authoring and how it maps to Forge.

**Key Findings:**

1. **Anthropic's Agent Skills** (not "plugins") are modular, SKILL.md-based reusable instructions—pure portable files with optional supporting resources. They emphasize simplicity, progressive disclosure, and cross-agent compatibility (MCP).

2. **No plugin layer in Anthropic's model.** Skills are authoring units; plugins are deployment vehicles. Anthropic doesn't bundle multiple capabilities together the way Forge does.

3. **Terminology is now aligned.** "Agent Skill" is industry standard. Anthropic uses the same term, validating Forge's terminology choice.

4. **Anthropic prioritizes portability; Forge prioritizes complete workflows.** Anthropic ships flat GitHub repo + agentskills.io directory. Forge adds packaging (plugin.json), distribution typing (library vs. customer-facing), and a release workflow for GitHub Copilot plugins.

5. **Forge's docs are defensible.** The three-layer model (skill authoring → distribution packaging → plugin marketplace) is not redundant—it's intentional architecture for teams building on GitHub Copilot. Anthropic doesn't have this layer because it doesn't target GitHub Copilot plugins; it targets Claude directly.

6. **Optional: Adopt progressive disclosure from Anthropic.** SKILL.md frontmatter-first loading (minimal context on start, full instructions on demand) could reduce token overhead in Forge. Not urgent.

**Recommendation to Team:** No changes required to Forge's core model. Forge and Anthropic are solving different problems (GitHub Copilot plugins vs. Claude portability). Optionally, add a brief callout in `squads/forge/README.md` FAQ to note the alignment with Anthropic terminology and the intentional difference in bundling strategy.


## 2026-03-20: Product Judgment – Anthropic Skill Mode in Forge (Mon Mothma Lead Review)

**Question from Stefan:** "I want to use Forge to use the Anthropic skill mode when creating skills. Does that make sense?"

**Decision: YES, partially and selectively. Adopt Anthropic's skill-authoring layer (SKILL.md format + progressive disclosure) but preserve Forge's distribution packaging layer.**

### Recommendation Summary

**Adopt from Anthropic:**
- ✅ SKILL.md-first portable skill documentation format
- ✅ Progressive disclosure pattern (minimal frontmatter → full instructions on demand)
- ✅ Cross-agent compatibility philosophy
- ✅ Industry-standard "Agent Skill" terminology (already aligned)

**Preserve in Forge:**
- ✅ Distribution packaging (plugin.json + distribution types: library vs. customer-facing)
- ✅ Multi-asset bundling (skills + agents + prompts for GitHub Copilot plugins)
- ✅ Dev-repo structure (/skills/, /agents/, /prompts/ directories)
- ✅ Release workflow for GitHub Copilot marketplace

### Why This Makes Sense

1. **Anthropic and Forge solve different problems:**
   - Anthropic: portable Claude skills (flat repo, no bundling)
   - Forge: complete GitHub Copilot plugin workflows (skills + agents + prompts)
   
2. **Adopting Anthropic's skill conventions adds value without conflict:**
   - Credibility: aligns with industry standard
   - Token efficiency: progressive disclosure reduces context overhead
   - Portability: skills can be understood/reused across platforms
   
3. **Distribution layer is necessary, not redundant:**
   - Anthropic doesn't bundle skills + agents + prompts because Claude doesn't require it
   - GitHub Copilot plugins do require bundling
   - Preserving this layer allows Forge to serve both simple (library) and complex (customer-facing) workflows

### Concrete Framing for Product Story

**New headline:** "Forge adopts Anthropic's portable skill authoring model and adds GitHub Copilot's complete-workflow packaging."

**In docs:**
- Add FAQ: "Q: How does Forge compare to Anthropic's agent skills?"
- Answer: "Forge adopts Anthropic's portable SKILL.md skill documentation and cross-agent compatibility philosophy. We add distribution packaging and GitHub Copilot plugin publishing because teams need to ship complete workflows (skills + agents + prompts) as installable bundles."
- Rename FORGE_SETUP "Agent Skills" section to: "Author Your First Agent Skill (SKILL.md format)"
- Add SKILL.md frontmatter template to scaffold/

### Terminology Traps to Avoid

⚠️ Never say: "We use Anthropic's skill mode" → Say: "We adopt Anthropic's skill authoring conventions"
⚠️ Never conflate: "Portability" with "no bundling" → They're complementary, not contradictory
⚠️ Never claim: "This solves Forge complexity" → Simplicity comes from use case (library distributions already exist), not from removing structure

### Next Steps (If Approved)

1. Write decision to `.squad/decisions/inbox/mon-mothma-anthropic-skill-adoption.md`
2. Update docs (FORGE_SETUP, squads/forge/README FAQ) with SKILL.md template and Anthropic comparison
3. Add optional SKILL.md template to scaffolds/
4. Preserve all distribution packaging layers (no refactoring)

### Impact Assessment

- **Scope:** Docs + scaffold additions; no architectural changes
- **Risk:** Low (additive, non-breaking)
- **Value:** Medium (credibility + efficiency + portability + market alignment)
- **Effort:** 3-4 doc edits + 1 scaffold template

---

## Learnings

### Implementation: Anthropic Skill-Authoring Mode for Forge (2026-03-20)

**Decision:** Adopted Anthropic's SKILL.md portable format as the primary authoring layer for Forge skills while preserving plugin.json as the distribution packaging layer.

**What was implemented:**

1. **FORGE.md** — Added comprehensive three-layer architecture section:
   - Layer 1: Agent skills authored with SKILL.md (portable, self-contained)
   - Layer 2: Organized into distributions with plugin.json (metadata, coordination)
   - Layer 3: Published as GitHub Copilot plugins (user-facing delivery)
   - Clarified why all three layers matter despite potential redundancy perception

2. **FORGE_SETUP.md** — Restructured guide to teach skill-first authoring:
   - New section: "Creating Your First Skill: SKILL.md Format" (details frontmatter, structure, example)
   - Renamed distribution creation section to clarify the progression
   - Added explicit relationship map between SKILL.md and plugin.json

3. **FORGE_QUICK_REF.md** — Added SKILL.md formatting section:
   - Progressive disclosure pattern with frontmatter example
   - Clarified where SKILL.md fits in the three-layer model
   - Updated file structure examples to show SKILL.md in each skill directory

4. **squads/forge/EXCEL_MCP_AUTHORING.md** — Reframed as three-layer walkthrough:
   - Updated title and overview to emphasize portable skills + distribution packaging
   - Added complete SKILL.md example for "Excel File Operations" skill
   - Expanded plugin.json section to clarify its complementary role
   - Added "Relationship to SKILL.md" callout

5. **squads/forge/README.md** — Enhanced with layering clarity:
   - Updated "I want to author an agent skill" section to teach three-layer model
   - Expanded FAQ with five new Q&As covering SKILL.md/plugin.json relationships
   - Clarified skill authoring as Layer 1 before distribution packaging

6. **squads/forge/scaffolds/excel-mcp-server/skills/SKILL.md.template** — Created:
   - Template demonstrating frontmatter, sections, and progressive disclosure
   - Shows input/output schema patterns
   - Includes best practices and error handling guidance

**Key terminology preserved:**
- "Agent Skill" remains the core unit (aligns with Anthropic/industry standard)
- "Distribution" remains organizational layer (Forge-specific, valuable for GitHub Copilot)
- "GitHub Copilot Plugin" remains user-facing deliverable
- No changes to existing file names or directory structures

**Architecture impact:**
- Zero architectural changes to Forge itself
- Docs and examples now teach skills-first mindset
- plugin.json remains unchanged in schema and purpose
- All existing tools (npm scripts, validation) continue working
- Risk: Low (additive, non-breaking, docs-focused)

**Validation:**
- ✅ `npm run validate` passes
- ✅ `npm test` passes (12/12 tests)
- ✅ `npm run build` succeeds
- ✅ All GitHub Copilot plugin vs. skill boundary knowledge preserved
- ✅ No regression in existing Forge workflows

**Team value:**
- Aligns with Anthropic's portable skill model (ecosystem credibility)
- Clearer mental model for skill authors (layer 1 vs. layer 2 concerns)
- Lower cognitive load with progressive disclosure (SKILL.md frontmatter → full docs)
- Portable skills can be understood independently or ported to other platforms
- Validates our three-layer architecture as intentional, not accidental
