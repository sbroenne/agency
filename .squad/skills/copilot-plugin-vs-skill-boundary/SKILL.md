---
name: "GitHub Copilot Plugin vs Agent Skill Boundary"
description: "Understand the distinction between agent skills (what you build) and GitHub Copilot plugins (how you distribute them)"
domain: "product-definition, architecture, distribution"
confidence: "high"
source: "researched from official GitHub Copilot documentation and ecosystem analysis"
---

## Context

When working with Forge or designing reusable capabilities for the Copilot ecosystem, it's critical to understand what constitutes an "agent skill" versus a "GitHub Copilot plugin." These are often conflated but serve different purposes in the distribution pipeline.

This distinction matters for:
- **Product messaging** — What do we actually enable teams to create?
- **Architecture decisions** — How much scope should a single unit have?
- **Distribution strategy** — How do we package and ship capabilities?

## Patterns

### Agent Skill

**Definition:** A single, reusable capability with a discrete scope.

**Characteristics:**
- Encapsulates a specific piece of work (e.g., "unit testing", "GitHub Actions debugging", "SQL query optimization")
- Contains instructions, scripts, and resources for that work
- Can stand alone and be used independently
- Auto-discovered by Copilot from `.github/skills` folders
- Loaded on-demand based on relevance to the user's task

**Example structure:**
```
.github/skills/unit-testing/
  ├── index.md (instructions)
  ├── scripts/ (helper scripts)
  └── resources/ (templates, references)
```

**When to create:** You're building a reusable workflow or expertise that other agents (or other teams) should be able to tap into independently.

---

### GitHub Copilot Plugin

**Definition:** A bundled distribution package that installs multiple capabilities into Copilot at once.

**Characteristics:**
- Bundles one or more agent skills together
- Can also include custom agents (personas), slash commands, hooks, MCP server integrations
- Installed from marketplace (`awesome-copilot`) or Git repository
- Once installed, all bundled items become available in user's Copilot setup
- Requires marketplace registration for discovery

**Contents (example):**
```
copilot-test-suite-plugin/
  ├── skills/
  │   ├── unit-testing/
  │   ├── integration-testing/
  │   └── performance-testing/
  ├── agents/
  │   ├── test-runner.md
  │   └── test-reviewer.md
  ├── hooks/
  │   └── pr-check-runner.yml
  └── plugin.json (manifest)
```

**When to create:** You want to deliver a complete testing toolkit to Copilot installations—multiple related skills, a specialized agent persona, and automation hooks all installed together.

---

### The Value Chain

```
┌─────────────────────────────────────────────────────────────────┐
│  You identify a capability that should be reusable              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
          ┌────────────────────────────────────────┐
          │  Craft as an Agent Skill               │
          │  (discrete, focused capability)        │
          └────────────────────────────────────────┘
                               │
                               ▼
          ┌────────────────────────────────────────┐
          │  Package with related skills into a    │
          │  Skill Distribution                    │
          └────────────────────────────────────────┘
                               │
                               ▼
          ┌────────────────────────────────────────┐
          │  Bundle distribution into a GitHub     │
          │  Copilot Plugin for marketplace        │
          │  installation                          │
          └────────────────────────────────────────┘
```

**Key insight:** Not every agent skill needs to become a plugin. But every plugin is built from agent skills (plus supporting infrastructure).

---

## Examples

### Example 1: Excel Skills

**Agent Skills (Copilot CLI):**
- "Excel file operations" (read, write, format)
- "Power Query automation"
- "DAX formula optimization"

**Skill Distribution:**
- `excel-mcp-server` (npm package bundling all three)

**Copilot Plugin (potential):**
- "Excel Analyst" plugin (bundles excel-mcp-server + custom agents for data analysis + hooks for spreadsheet event triggers)

### Example 2: Code Review Workflow

**Agent Skills:**
- "Static code analysis"
- "Performance profiling"
- "Security scanning"
- "Documentation check"

**Skill Distribution:**
- `code-review-toolkit` (npm package with all four)

**Copilot Plugin:**
- "Code Reviewer" plugin (bundles toolkit + reviewer agent persona + PR comment hooks + CI/CD integration)

---

## Anti-Patterns

**Don't do this:**
1. **Conflate skill and plugin in conversation** — Say "we're authoring agent skills" or "we're creating a plugin distribution", not "we're making a Forge plugin"
2. **Assume every skill should be its own plugin** — Group related skills into distributions first; only wrap as plugin if you need to bundle agents/hooks/commands
3. **Hide plugin scope** — If you're building a plugin (toolkit), be explicit about what it installs; don't claim it's "just a skill"
4. **Ignore the distribution layer** — Recognize that "skill distribution" is a distinct architectural layer from "agent skill" and "plugin" (they are not interchangeable)

---

## Key Takeaway

**For product messaging:**
- Forge helps teams author **agent skills**
- These skills can be packaged as **skill distributions** (organized collections)
- Skill distributions can be wrapped as **GitHub Copilot plugins** (installable toolkits)

**For architecture:**
- Start with a single, focused **agent skill** (the reusable unit)
- Group related skills into a **skill distribution** (the packaging unit)
- Only create a **Copilot plugin** when you need to ship custom agents, hooks, or commands alongside skills

---

## Related Team Knowledge

- **Forge Reference:** `squads/forge/README.md`, `squads/forge/CHARTER.md`
- **Decision Log:** `.squad/decisions/inbox/mon-mothma-copilot-plugin-boundary.md`
- **Product Story:** "Forge helps author agent skills that can be packaged and distributed as GitHub Copilot plugins"
