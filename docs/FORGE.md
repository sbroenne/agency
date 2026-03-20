# Forge: Authoring Prompts, Custom Agents, and Agent Skills

Forge is a structured system for creating, tracking, and publishing reusable prompts, custom agents (AGENT.md-style), and agent skills for the Squad ecosystem. This document describes authoring units, distribution types, and release workflows.

## Overview

Forge helps teams author three types of reusable assets and package them as plugins:

- **Prompts** — System prompts, few-shot examples, and conversation starters for agent use cases
- **Custom Agents** — AGENT.md-style agent definitions with instructions, behaviors, and tool bindings
- **Agent Skills** — Reusable capabilities with tools and resources that stand alone or are packaged

These can be organized into two distribution types:
- **Library Distributions** — agent skills only (tools-only packages, no custom agents or prompts)
- **Customer-Facing Distributions** — agent skills + custom agents + prompts (complete workflows)

Forge distinguishes between **dev repos** (where assets are authored and tested) and **published plugins** (where they are versioned and released).

## Terminology

When discussing Forge:
- Use **Prompt** for system prompts and few-shot examples
- Use **Custom Agent** (or **agent**) for AGENT.md-style definitions
- Use **Agent Skill** as the primary unit of reusable capability
- Use **Plugin** for the user-facing deliverable; **distribution type** (library vs. customer-facing) is the internal classification
- Use **`plugin.json`** only when referencing the specific packaging format (it's an implementation detail)
- All Forge plugins are distributed as **GitHub Copilot Plugins** through the marketplace

## Agent Skill Authoring: SKILL.md Format

Forge adopts Anthropic's portable **SKILL.md** format for authoring agent skills. This provides:

- **Portable documentation** — Skills documented as standalone Markdown with optional supporting resources
- **Progressive disclosure** — Minimal frontmatter on first load, full instructions available on demand
- **Cross-agent compatibility** — Skills designed to work with any agent, not tightly coupled to specific personas
- **Industry alignment** — Aligns with Anthropic's agent skills standard and ecosystem conventions

### Three-Layer Architecture

Agent skill development in Forge follows a three-layer model:

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 1: Author Agent Skills (SKILL.md format)                 │
│ ────────────────────────────────────────────────────────────────│
│ • Portable documentation (Markdown-first)                       │
│ • Optional resources/ directory (scripts, templates)            │
│ • Progressive disclosure (summary + full docs)                  │
│ • Example: skills/excel-file-ops/SKILL.md                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 2: Organize into Distributions (plugin.json manifest)    │
│ ────────────────────────────────────────────────────────────────│
│ • Metadata, versioning, distribution type                       │
│ • Lists skills, agents, prompts included                        │
│ • Distinguishes library vs. customer-facing                     │
│ • Example: skills/excel-mcp-server/plugin.json                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 3: Publish as GitHub Copilot Plugin                      │
│ ────────────────────────────────────────────────────────────────│
│ • Installable bundle (npm package or GitHub release)            │
│ • Marketplace registration and discovery                        │
│ • User-facing delivery mechanism                                │
│ • Example: @myorg/excel-mcp-server                              │
└─────────────────────────────────────────────────────────────────┘
```

**Key insight:** These layers serve different concerns. SKILL.md is *what* you build (portable, agent-independent). plugin.json is *how* you organize it (distribution metadata). GitHub Copilot Plugin is *where* you ship it (user-facing bundle).

### Why This Matters

**Without SKILL.md layer:** Skill definitions get buried in plugin.json or code comments. Not discoverable, not portable.

**With SKILL.md layer:** Each skill is self-contained documentation that can be understood independently, used in multiple distributions, or ported to other platforms (Claude, Anthropic's agent skills marketplace, etc.).

**plugin.json still matters:** It coordinates skills, agents, prompts, and metadata for packaging and distribution. SKILL.md doesn't replace it; they serve complementary purposes.

## Canonical Forge Knowledge in This Repo

This repository carries a lean, real Forge starting point using **Excel MCP Server** as the reference distribution inside the canonical squad knowledge pack:

- `squads/forge/workflows/excel-mcp-server/workflow.json`
- `squads/forge/workflows/excel-mcp-server/release-plugin-repo.yml`
- `squads/forge/scaffolds/excel-mcp-server/`
- `squads/forge/PLUGINS.md`
- `squads/forge/home/catalog.json`

That reference keeps Forge standalone-first, tracks published artifacts in Markdown, and includes a dev-repo release template without hiding the core model behind a separate repo.

## Local Working Repo Model

Forge knowledge stays in `agency`, but authoring happens in a working repo on the user's machine once implementation starts.

- `agency` keeps the rules, scaffolds, workflows, and reference catalog.
- Forge can copy or adapt the `squads/forge/` reference assets into a local working repo.
- That working repo is where distribution-specific code, tests, and release automation evolve.

For this repository's lean starter implementation, the tracked reference catalog lives at `squads/forge/home/catalog.json`.

## Repo Topology

### Dev Repo Structure

Assets are developed in the dev repo with an explicit directory structure:

```
dev-repo/
├── skills/                      # Agent skills
│   ├── skill-a/
│   │   ├── plugin.json          # Skill manifest
│   │   ├── index.js             # Skill implementation
│   │   ├── schema.json          # Tool schema
│   │   ├── package.json         # Dependencies
│   │   └── README.md
│   └── skill-b/
│       └── ...
├── agents/                      # Custom agents (customer-facing only)
│   ├── agent-name.md
│   └── ...
├── prompts/                     # System prompts (customer-facing only)
│   ├── system-prompt.txt
│   └── ...
├── package.json                 # Workspace root
├── PLUGINS.md                   # Registry (generated/tracked)
└── tooling/
    ├── scripts/
    │   ├── build-distribution.mjs  # Builds manifests
    │   └── validate-distribution.mjs # Validates structure
    └── tests/
        └── distribution.test.mjs    # Distribution tests
```

### Published Skill Distribution Structure

Published distributions are released as standalone npm packages (or Git repos) with:

```
published-distribution-repo/
├── package.json
├── skills/                      # Agent skills (library or customer-facing)
│   ├── skill-a/
│   │   ├── index.js
│   │   └── schema.json
│   └── skill-b/
│       └── ...
├── agents/                      # Custom agents (customer-facing only)
│   ├── agent-name.md
│   └── ...
├── prompts/                     # System prompts (customer-facing only)
│   ├── system-prompt.txt
│   └── ...
├── plugin.json                  # Distribution manifest
├── README.md
└── CHANGELOG.md
```

## Skill Distribution Registry (PLUGINS.md)

The dev repo includes `PLUGINS.md` — a human-readable registry of all distributions being developed. It acts as:
- **Snapshot** of distribution inventory
- **Status indicator** — which distributions are ready for release
- **Change history** — when distributions are added, deprecated, or updated

### Format

```markdown
# Skill Distribution Registry

> Last updated: 2026-03-20 by CI pipeline

## Library Distributions

| Name | Version | Status | Published | Maintainer |
|------|---------|--------|-----------|-----------|
| distribution-a | 0.1.0 | dev | — | Team A |
| distribution-b | 1.0.0 | stable | npm | Team B |

## Customer-Facing Distributions

| Name | Version | Status | Published | Maintainer |
|------|---------|--------|-----------|-----------|
| distribution-x | 0.2.0 | beta | github-releases | Team X |
| distribution-y | 2.1.0 | stable | npm | Team Y |

## Deprecated

| Name | Deprecated | Reason |
|------|-----------|--------|
| old-distribution | 2026-03-15 | Superseded by distribution-c |
```

In larger dev repos, `PLUGINS.md` is often generated by `npm run build:distributions`. Lean teams can maintain it directly until automation becomes necessary.

## Distribution Classification

### Library Distributions
- **Contents**: Agent skills only (no custom agents, no prompts)
- **Use case**: Reusable, stateless utilities (e.g., Excel automation, API clients, formatters)
- **Publishing**: npm or private registry
- **Dependencies**: Minimal; no framework dependencies
- **Examples**:
  - `excel-mcp-server` (MCP server for Excel operations on Windows)
  - `@myorg/skill-http-client`
  - `@myorg/skill-json-parser`

### Customer-Facing Distributions
- **Contents**: Agent skills + custom agents + prompts/system instructions
- **Use case**: Complete, opinionated workflows (e.g., code review workflow with agent persona, docs generator with specialized agent)
- **Publishing**: Private registry or gated distribution
- **Dependencies**: May depend on Copilot CLI or squad-cli
- **Example**: `@myorg/code-reviewer` (skills + custom agent persona + system prompts), `@myorg/docs-writer` (skills + specialized agent + templates)

## Authoring Workflow: Agency to Working Repo

1. **Start from Forge guidance** in `agency`
2. **Create the local working repo** and copy/adapt the relevant scaffold
3. **Author your assets** — agent skills, and optionally custom agents and prompts
4. **Validate locally** — run the working repo's checks
5. **Publish npm/release** — distribution is published (npm, GitHub releases, etc.)
6. **Update Forge tracking surfaces** — refresh `squads/forge/PLUGINS.md` and `squads/forge/home/catalog.json` when you want discoverability in Agency

## See Also

- `docs/PLUGIN_MANIFEST.md` — detailed `plugin.json` schema
- `docs/FORGE_SETUP.md` — dev-repo setup guide
- `squads/forge/EXCEL_MCP_AUTHORING.md` — Excel-specific reference walkthrough
- `squads/forge/RELEASE_WORKFLOW.md` — release flow details for dev repo to published plugin repo
