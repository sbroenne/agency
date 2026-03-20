# Forge Documentation Index

Complete guide to authoring reusable agent skills and skill distribution for the squad ecosystem.

**Reference Skill:** [Excel MCP Server](https://excelmcpserver.dev) — A library skill example showing how to wrap Windows Excel automation as reusable tools for agents.

## Core Concepts

Forge focuses on helping you author and distribute reusable agent skills:

- **Agent Skill** — A reusable capability with tools, resources, and instructions that can stand alone or be packaged
- **Skill distribution** — How skills are organized and packaged (using `plugin.json` as the implementation format)
- **Library skill** — Reusable utilities with no UI (tools-only packages)
- **Customer-facing skill package** — Complete workflows with agents, prompts, and optionally UI

## In-Repo Reference Surfaces

The canonical Forge knowledge pack in this repository lives under [`/squads/forge`](../squads/forge/README.md):

- [`squads/forge/workflows/excel-mcp-server/workflow.json`](../squads/forge/workflows/excel-mcp-server/workflow.json) — ask-first architecture workflow
- [`squads/forge/workflows/excel-mcp-server/release-plugin-repo.yml`](../squads/forge/workflows/excel-mcp-server/release-plugin-repo.yml) — template workflow that releases only the plugin payload from a dev repo into a dedicated plugin repo
- [`squads/forge/scaffolds/excel-mcp-server/`](../squads/forge/scaffolds/excel-mcp-server/) — standalone-first library plugin scaffold
- [`squads/forge/PLUGINS.md`](../squads/forge/PLUGINS.md) — Markdown tracker for published and in-progress plugins
- [`squads/forge/home/catalog.json`](../squads/forge/home/catalog.json) — lean home tracker for reuse and refactoring visibility

## Getting Started

**Start here if you're new to Forge:**

1. **[FORGE.md](./FORGE.md)** — Overview of agent skill authoring and core concepts
   - Plugin types (library vs customer-facing)
   - Repo topology (dev vs published)
   - Release workflows
   - Architecture recommendations
   - Includes Excel MCP Server as a real-world example

2. **[FORGE_QUICK_REF.md](./FORGE_QUICK_REF.md)** — Quick decision trees and checklists
   - Plugin type decision tree
   - File structure examples (Excel MCP Server)
   - Release checklist
   - Common mistakes

3. **[FORGE_SETUP.md](./FORGE_SETUP.md)** — Step-by-step setup guide
   - Initialize a new dev repo
   - Create validation scripts
   - Build your first plugin (Excel MCP Server example)

## Reference

**Use these for detailed information:**

- **[PLUGIN_MANIFEST.md](./PLUGIN_MANIFEST.md)** — Complete Forge `plugin.json` schema
  - JSON Schema definition
  - Validation rules
  - Library plugin example (Excel MCP Server)
  - Customer-facing plugin example
  - Packaging patterns

- **[FORGE_DESIGN_PHILOSOPHY.md](./FORGE_DESIGN_PHILOSOPHY.md)** — Why Forge was designed this way
  - Core principles
  - Design decisions and rationale
  - Trade-offs explained
  - Future evolution phases

## Decision Paths

**Choose your path based on your question:**

### "What type of plugin should I build?"
→ See [FORGE.md "Plugin Classification"](./FORGE.md#plugin-classification) or [FORGE_QUICK_REF.md "Plugin Type Decision Tree"](./FORGE_QUICK_REF.md#plugin-type-decision-tree)

### "How do I set up a dev repo?"
→ See [FORGE_SETUP.md](./FORGE_SETUP.md)

### "What goes in plugin.json?"
→ See [PLUGIN_MANIFEST.md](./PLUGIN_MANIFEST.md)

### "What's the full workflow from dev to publish?"
→ See [FORGE.md "Release Workflow"](./FORGE.md#release-workflow)

### "When should I add APM (Advanced Plugin Management)?"
→ See [FORGE.md "Architecture Recommendation Flow"](./FORGE.md#architecture-recommendation-flow) or [FORGE_QUICK_REF.md "When to Add APM"](./FORGE_QUICK_REF.md#when-to-add-apm-advanced-plugin-management)

### "Why is Forge designed this way?"
→ See [FORGE_DESIGN_PHILOSOPHY.md](./FORGE_DESIGN_PHILOSOPHY.md)

### "I need a quick checklist before releasing"
→ See [FORGE_QUICK_REF.md "Release Checklist"](./FORGE_QUICK_REF.md#release-checklist)

## Workflows at a Glance

### Create a Plugin

1. Create `plugins/<slug>/` directory in dev repo
2. Write `plugin.json` with manifest
3. Add skills, agents (if customer-facing), prompts
4. Run `npm run validate`
5. Commit and merge

### Update a Plugin

1. Edit `plugins/<slug>/plugin.json` (bump version, update description, etc.)
2. Optionally edit/add skills, agents, prompts
3. Update CHANGELOG.md
4. Run `npm run validate` and `npm test`
5. Commit and merge
6. Build updated `PLUGINS.md` via `npm run build:plugins`

### Release a Plugin

1. Ensure plugin is in `stable` status in plugin.json
2. Run `npm run release:check` (validates + tests)
3. Create Git tag: `git tag plugin-name@X.Y.Z`
4. Push tag to trigger CI release workflow
5. CI publishes to registry (npm, GitHub releases, etc.)
6. Update Agency's Forge registry entry with published URL

### Browse Available Plugins

1. Check `PLUGINS.md` in dev repo for all plugins and versions
2. Visit Agency's Forge registry for the shared catalog
3. Check package manager (npm, GitHub, etc.) for installation

## Document Sizes and Scan Times

| Document | Size | Best For | Read Time |
|----------|------|----------|-----------|
| FORGE.md | 174 lines | Understanding the system | 8 min |
| FORGE_SETUP.md | 307 lines | Setting up first repo | 10 min |
| PLUGIN_MANIFEST.md | 298 lines | Schema details and examples | 10 min |
| FORGE_DESIGN_PHILOSOPHY.md | ~330 lines | Understanding design decisions | 12 min |
| FORGE_QUICK_REF.md | ~150 lines | Quick lookups and checklists | 5 min |

## Common Scenarios

### Scenario 1: "I'm building a reusable code formatter"

You're building a **library skill**.

→ Follow [FORGE_SETUP.md](./FORGE_SETUP.md) to set up dev repo  
→ Reference [PLUGIN_MANIFEST.md library example](./PLUGIN_MANIFEST.md#example-library-skill)  
→ Use [FORGE_QUICK_REF.md "Minimal Library Skill" structure](./FORGE_QUICK_REF.md#minimal-library-skill)  
→ Publish to npm as `@myorg/skill-code-formatter`

### Scenario 2: "I'm building a code review bot"

You're building a **customer-facing skill package**.

→ Determine APM needs using [FORGE.md recommendation flow](./FORGE.md#architecture-recommendation-flow)  
→ Set up dev repo with [FORGE_SETUP.md](./FORGE_SETUP.md)  
→ Reference [PLUGIN_MANIFEST.md customer-facing example](./PLUGIN_MANIFEST.md#example-customer-facing-skill-package)  
→ Publish with agents and system prompts  

### Scenario 3: "I need to understand why Forge is structured this way"

→ Read [FORGE_DESIGN_PHILOSOPHY.md](./FORGE_DESIGN_PHILOSOPHY.md)  
→ Look for relevant decision (e.g., "Decision 1: Two Skill Types")

### Scenario 4: "I have an existing skill repo and want to migrate to Forge"

→ Audit current structure  
→ Classify as library or customer-facing using [FORGE_QUICK_REF.md decision tree](./FORGE_QUICK_REF.md#skill-type-decision-tree)  
→ Restructure to match [FORGE.md dev repo structure](./FORGE.md#dev-repo-structure)  
→ Create plugin.json using [PLUGIN_MANIFEST.md](./PLUGIN_MANIFEST.md)  
→ Set up tooling from [FORGE_SETUP.md](./FORGE_SETUP.md)

## Key Concepts

### Skill Types

- **Library Skill:** Tools and resources only, no agents or UI. Reusable utilities.
- **Customer-Facing Skill Package:** Skills + agents + prompts. Complete workflows.

### Repositories

- **Dev Repo:** Central build location where skills are created and tested.
- **Published Repo:** Distributed, versioned package (npm, GitHub releases, etc.).
- **Skill Home Repo:** Organization-wide registry tracking all skills and distributions.

### Status Lifecycle

- `dev` — Work in progress
- `beta` — Testing, may have breaking changes
- `stable` — Production-ready
- `deprecated` — No longer maintained

### PLUGINS.md

Human-readable registry file showing published skills, versions, status, and maintainers. In larger dev repos it is often generated; in lean repos it can be tracked directly.

## Getting Help

- **"What's the full architecture?"** → [FORGE.md](./FORGE.md)
- **"How do I X?"** → [FORGE_SETUP.md](./FORGE_SETUP.md) or [FORGE_QUICK_REF.md](./FORGE_QUICK_REF.md)
- **"What should plugin.json contain?"** → [PLUGIN_MANIFEST.md](./PLUGIN_MANIFEST.md)
- **"Why is Forge designed this way?"** → [FORGE_DESIGN_PHILOSOPHY.md](./FORGE_DESIGN_PHILOSOPHY.md)
- **"I need a quick checklist"** → [FORGE_QUICK_REF.md](./FORGE_QUICK_REF.md)

## Contributing to Forge Docs

Forge documentation is maintained in `/docs/`. To propose changes:

1. Open an issue describing the gap or problem
2. Reference the relevant doc(s) in `/docs/`
3. Propose updates or new documents
4. Review should focus on clarity and completeness
