# Forge Design Philosophy

This document explains the design principles behind Forge and the decisions that shaped it.

## Core Principles

### 1. Lean by Default, Advanced by Choice

Forge starts simple. Teams authoring plugins should not need to understand or implement advanced features until they actually need them.

**Example:** A team building an Excel MCP Server wrapper (library distribution—skills only) doesn't need to learn about Advanced Plugin Management (APM), stateful workflows, or message queues. They package skills and publish.

A team building a multi-turn code review agent with specialized behavior and system prompts (customer-facing distribution) *does* need APM to manage conversation state — but they're warned upfront, not surprised mid-implementation.

**Design consequence:** The architecture recommendation flow asks explicit questions to determine complexity level. This prevents premature optimization and keeps the plugin authoring experience frictionless for the common case.

### 2. Clear Separation of Concerns

Three distinct repository types, three distinct responsibilities.

**Dev Repo:** Where plugins are built, tested, and validated locally. Single source of truth.

**Published Repos:** Where plugins are distributed (npm, GitHub releases, private registries). Immutable, versioned, discoverable.

**Plugin Home Repo:** Central registry tracking all plugins across the ecosystem. Discovery, metadata, status.

This separation means:
- Dev teams own their plugin dev experience without worrying about distribution
- Published plugins are decoupled from dev workflows—no surprises in production
- Organization has central registry for governance, discovery, and refactoring

**Design consequence:** No single repo does everything. Each has a specific role. This adds a small mental model cost but eliminates confusion about "which repo do I deploy from?"

### 3. Plugin Types Are NOT Packaging Formats

"Library" and "customer-facing" are *architectural distinctions*, not npm package formats.

**Library plugins** might be packaged as:
- Single npm package with multiple skills
- Monorepo with one package per skill
- Private Git repository
- Vendored code in another project

**Customer-facing plugins** might be:
- Single npm package with skills + agents + prompts
- Separate npm packages for skills (shared) + agents (private)
- GitHub Releases (no npm at all)
- Deployed as container images with embedded prompts

The point: **Classification is about *what* the plugin does, not *how* you publish it.** This keeps Forge flexible and language-agnostic.

**Design consequence:** Manifest schema doesn't dictate package format. It describes capabilities. Teams choose distribution.

### 4. Human-First Registry (PLUGINS.md)

Most plugin registries are data stores — hard to read, hard to track changes, hard to discuss in PRs.

PLUGINS.md is a **human-readable table**, auto-generated from plugin.json manifests. It's designed to:
- Be readable in GitHub PRs
- Show diffs clearly when plugins change
- Be discussable with non-technical stakeholders
- Capture version history at a glance

This trades some schema flexibility for readability. When there's a conflict, readability wins.

**Design consequence:** PLUGINS.md is generated, not hand-edited. Changes flow from plugin.json → build script → PLUGINS.md. This prevents drift.

### 5. Architecture Questions, Not Constraints

When a dev team asks "Should I use APM?", Forge doesn't say "APM is required for all customer-facing plugins."

Forge says: "Does your plugin need stateful workflows, message queues, or complex routing? If yes → APM. If no → keep it simple."

This is a **question-based approach**, not a mandate. Teams make informed decisions. Complexity is earned, not imposed.

**Design consequence:** The recommendation flow is a questionnaire. Answers lead to architecture, not vice versa.

## Key Decisions and Their Rationale

### Decision 1: Two Plugin Types (Not a Spectrum)

**Alternative considered:** Plugin tiers (Tier 1 = simple skills, Tier 2 = agents, Tier 3 = advanced state, etc.)

**Why we chose binary (library vs customer-facing):**
- Clearer mental model — no ambiguity about "which tier are we?"
- Simpler validation — "does it have agents?" not "how many tiers?"
- Better for discovery — libraries and agents are fundamentally different use cases
- Easier for new teams — two clear paths instead of five.

**Trade-off:** Some plugins fall into gray areas. Solution: team can choose based on primary use case.

### Decision 2: Separate Dev and Published Repos

**Alternative considered:** Single monorepo for all plugin versions and releases

**Why we chose separation:**
- Dev repos are internal, fast iteration, no semver discipline required
- Published repos are immutable, frozen at release, no surprises for downstream users
- Teams can onboard plugins without "production-ready" pressure — dev status is expected
- Easier to enforce validation/tests in dev without blocking downstream users

**Trade-off:** Teams need to understand two repos. Benefit: clear workflows and expectations.

### Decision 3: PLUGINS.md as the Registry

**Alternative considered:** JSON-only registry (like package.json)

**Why we chose markdown:**
- GitHub renders it by default — no tooling needed to browse
- Diffs are human-readable — you can see what changed at a glance
- PRs can discuss it naturally — non-devs can comment
- Self-documenting — the format itself explains what's tracked
- Easily extensible — add a column without schema migration

**Trade-off:** Not machine-optimized (requires parsing). Benefit: humans can read it.

### Decision 4: Lean Manifest Schema

**Alternative considered:** Highly detailed schema with optional fields for every possible use case

**Why we kept it minimal:**
- Easier to explain to new teams
- Lower barrier to publish a plugin
- Extensible (teams can add `_custom` fields)
- Focuses on essentials: name, type, status, capabilities
- Complex metadata (APM config, state machines, etc.) lives in separate files

**Trade-off:** Some use cases need multiple files. Benefit: schema stays clear and focused.

### Decision 5: APM is Opt-In

**Alternative considered:** All customer-facing plugins include APM infrastructure

**Why we chose opt-in:**
- Most plugins don't need it — imposing it adds unnecessary complexity
- Simpler initial authoring experience
- Clear migration path — add APM when you need it, not before
- Teams learn APM concepts only when relevant
- Less boilerplate, faster time to first published plugin

**Trade-off:** Some teams will build stateful plugins without APM first, then refactor. Solution: clear docs on "when to add APM" help teams predict sooner.

## Implications for Teams

### Plugin Author

✓ **You get:** Simple starting point, clear questions about architecture, opt-in complexity  
✓ **You choose:** Publication format, registry location, governance model  
✗ **You lose:** Flexibility in plugin types (only two options)  
✗ **You lose:** Pre-built state management (add your own when needed)

### Forge Registry Owner

✓ **You get:** Clear, human-readable registry of all plugins and versions  
✓ **You get:** Status tracking without database  
✗ **You lose:** Advanced query capability (use tools on markdown if needed)  
✗ **You lose:** Automatic sync (teams still push updates to the Agency registry)

### Platform Team

✓ **You get:** Clear plugin architecture that teams can learn quickly  
✓ **You get:** Flexibility to extend schema with org-specific fields  
✓ **You get:** Observable plugin ecosystem (PLUGINS.md shows everything)  
✗ **You lose:** Central package management (plugins go to various registries)  
✗ **You lose:** Version resolution (teams manage their own dependencies)

## Future Evolutions

### Phase 2: Interactive Architecture Wizard

The recommendation flow (in docs) could become an interactive CLI or web wizard. After a team answers questions, it scaffolds a dev repo with the right structure.

### Phase 3: Forge Registry UI

PLUGINS.md could be rendered as a searchable, filterable web interface. Same data, better UX for non-technical users.

### Phase 4: Unified Plugin Discovery

Squad CLI could integrate with Forge registries, allowing `squad plugin search` to discover plugins across ecosystems.

### Phase 5: Dependency Management

If plugins depend on each other, define a `dependencies` section in manifest and let tools resolve versions. Currently out of scope.

## See Also

- **FORGE.md** — The architecture itself
- **PLUGIN_MANIFEST.md** — Schema details
- **FORGE_SETUP.md** — How to build
- **FORGE_QUICK_REF.md** — Quick decisions
