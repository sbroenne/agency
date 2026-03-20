---
name: "forge-reference-surfaces"
description: "How to turn a conceptual plugin-authoring system into concrete repo surfaces without overbuilding"
domain: "product-architecture"
confidence: "high"
source: "earned"
---

## Context

Use this when a repo has solid plugin-authoring ideas but the implementation is still mostly conceptual. The goal is to make the system real with the smallest set of durable surfaces that people can inspect, copy, and extend.

## Patterns

### Ship a workflow, scaffold, and tracker together

Do not stop at docs. Add:
- a **workflow** file that captures the ask-first architecture questions,
- a **scaffold** that can actually be copied into a new repo,
- and a **tracker** entry that records what was created and what should later be reused or refactored.

### Use a real reference target

Pick one concrete product as the first proving ground. In this case, Excel MCP Server works because it cleanly demonstrates a library plugin with reusable spreadsheet skills and no required UX layer.

### Keep the first scaffold standalone-first

For the first reference implementation, keep the scaffold focused on the simplest viable architecture. Add APM only when the workflow identifies real orchestration, routing, or persistence needs.

### Validate the surfaces as a set

Add tests that confirm the workflow, scaffold, and tracker agree on the same target and architecture. That prevents the repo from drifting back into disconnected examples.

## Examples

- `forge/workflows/excel-mcp-server/workflow.json`
- `forge/scaffolds/excel-mcp-server/plugin.json`
- `forge/home/catalog.json`
- `tooling/tests/registry.test.mjs`

## Anti-Patterns

- Shipping only conceptual prose with no copyable artifact
- Adding a home repo concept without any tracker file in the actual repo
- Defaulting to customer-facing or APM-heavy architecture before the workflow justifies it
