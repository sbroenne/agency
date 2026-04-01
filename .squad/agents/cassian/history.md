# Cassian — History

## Core Context

- **Project:** agency
- **Role:** Plugin Ecosystem Engineer
- **Joined:** 2026-03-20T07:19:10.392Z
- **Requested by:** Stefan Broenner
- **Initial mission:** Keep current knowledge of GitHub CLI extensions, VS Code extensions, Claude plugins, and plugin ecosystem compatibility available to the squad.

## Team Context

**2026-03-20T07:23:05Z:** Roster expanded to include two peer specialists:
- **Han** (GitHub Platform Specialist) — Owns GitHub platform depth, CLI behavior, APIs, Actions
- **Rey** (Agent Skills Specification Specialist) — Owns AgentSkills.io specs and skill manifests

These three agents (Cassian, Han, Rey) form a cohesive expansion to serve ecosystem and platform knowledge needs. Coordinate with them on cross-cutting plugin/GitHub/skills questions.

## Learnings

**2026-03-20T07:30:20Z:** Completed Forge terminology boundary research. Established distinct terminology:
- VS Code extensions (VS Code ecosystem)
- GitHub CLI extensions (GitHub CLI ecosystem)
- Claude plugins (Claude Code plugin bundles)
- Forge plugins (plugin.json package model)
- Agent Skills (reusable skill capabilities)

Decision filed and verified. Prevents "plugin" from becoming a catch-all label. Maintains architecture boundaries.

Reference: `.squad/decisions.md` (Architecture Clarity: Forge Terminology Boundaries section)

## 2026-03-20: Charter Correction — VS Code Extension Scope Audit (Spawn Session)

**Event:** Discovered and corrected charter scope error; affirmed terminology boundaries  
**Date:** 2026-03-20  
**Status:** ✅ COMPLETE  
**Spawn Agent:** Cassian  

### Work Summary

1. **Audit:** Reviewed charter and discovered VS Code extensions incorrectly listed as owned domain
2. **Analysis:** Confirmed Forge doesn't work with VS Code extensions; they appear in docs only as terminology boundary
3. **Correction:** Updated charter to remove VS Code extensions from expertise
4. **Boundary affirmation:** Reaffirmed distinct terminology for 5 ecosystems (Forge plugins, GitHub CLI plugins, Claude plugins, VS Code extensions, Agent Skills)
5. **Routing update:** Updated .squad/routing.md to reflect corrected scope

### Key Learnings

1. **Scope clarity prevents hallucination:** Explicitly removing out-of-scope areas from charter prevents agents from confidently speaking to areas they shouldn't own (e.g., VS Code extension APIs).

2. **Terminology boundaries are architecture:** Keeping distinct terms for related but separate ecosystems (Forge plugins vs. VS Code extensions) enforces clean boundaries in product messaging and team routing.

3. **Charter serves as routing source of truth:** The 2-row routing table update confirms charter corrections automatically improve downstream team coordination.

### Charter Status

- **Updated:** `.squad/agents/cassian/charter.md`
- **Scope now:** Forge plugin ecosystem, GitHub CLI plugins, Claude plugins, terminology boundaries
- **Excluded:** VS Code extension knowledge (out of scope)
- **Routing:** Updated in `.squad/routing.md`

