# Forge Plugin Release Workflow

This guide describes the release process for skill distributions from development through publication and registry updates. Here, **plugin** means the Forge package model tracked in `plugin.json`.

## Release Phases

All skill distributions follow three phases:

1. **Development** — Plugin development in dev repo
2. **Publishing** — Release to public npm/GitHub registry
3. **Registration** — Update Forge PLUGINS.md registry

## Phase 1: Development

### Environment

Plugins are developed in a dedicated dev repository with a Forge-compliant structure:

```
my-forge-dev/
├── plugins/
│   ├── plugin-a/
│   │   ├── plugin.json
│   │   ├── package.json
│   │   ├── skills/
│   │   ├── tests/
│   │   └── README.md
│   └── plugin-b/
│       └── ...
├── package.json (workspace root)
└── tooling/
    ├── validate.mjs
    └── scripts/
```

### Validation

Before moving to publication, ensure:

1. **Structure validation** — Plugin files follow Forge layout
2. **Manifest validation** — `plugin.json` is complete and valid
3. **Unit tests** — All skills have passing tests
4. **Documentation** — README covers all skills with examples

Run validation locally:

```bash
npm run validate:plugins
npm test
npm run docs
```

Example validation script (in `tooling/validate.mjs`):

```javascript
import { readFileSync } from "fs";
import path from "path";

const pluginPath = process.argv[2];
if (!pluginPath) throw new Error("Usage: validate.mjs <plugin-path>");

const manifest = JSON.parse(readFileSync(path.join(pluginPath, "plugin.json")));

// Validate required fields
["id", "name", "version", "type", "skills"].forEach(field => {
  if (!manifest[field]) throw new Error(`Missing ${field}`);
});

// Validate skills array
if (!Array.isArray(manifest.skills) || manifest.skills.length === 0) {
  throw new Error("No skills defined");
}

console.log(`✅ ${manifest.name} v${manifest.version} validated`);
```

### Version Numbering

Use semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR** — Breaking changes to skill APIs
- **MINOR** — New skills, backward-compatible changes
- **PATCH** — Bug fixes, documentation updates

Example progression:
- `1.0.0` — Initial stable release
- `1.1.0` — New skill added, all existing compatible
- `1.1.1` — Bug fix in formatting skill
- `2.0.0` — Redesigned file operations API (breaking)

## Phase 2: Publishing

### Pre-Publication Checklist

- [ ] All tests passing: `npm test`
- [ ] Linting complete: `npm run lint` (if applicable)
- [ ] Version bumped in `plugin.json` and `package.json`
- [ ] CHANGELOG updated with release notes
- [ ] README reflects current capabilities
- [ ] GitHub release drafted with version tag

### Publication Steps

#### For Library Plugins (npm)

1. **Build the plugin:**
   ```bash
   npm run build
   ```

2. **Create npm package:**
   ```bash
   npm pack
   ```

3. **Publish to npm:**
   ```bash
   npm publish
   ```
   
   Or as a scoped package (recommended):
   ```bash
   npm publish --access public
   ```

4. **Verify published package:**
   ```bash
   npm view @organization/plugin-name
   ```

#### For Customer-Facing Plugins (GitHub Pages or Static Hosting)

1. **Build the plugin:**
   ```bash
   npm run build
   ```

2. **Generate documentation site:**
   ```bash
   npm run docs:site
   ```

3. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

4. **Verify accessibility:**
   - Visit published documentation URL
   - Test agent installation/import workflow

### GitHub Release

Create a GitHub release for version tracking:

```bash
git tag v1.0.0
git push origin v1.0.0
gh release create v1.0.0 --title "Release v1.0.0" --notes "See CHANGELOG.md"
```

Release notes should include:
- Version number
- Release date
- New features/skills added
- Bug fixes
- Breaking changes (if any)
- Migration guide (for major versions)

## Phase 3: Registration

### Update PLUGINS.md

After publication, register your plugin in Agency's Forge registry surfaces:

1. **Create a pull request** to `squads/forge/PLUGINS.md` with:
   - Plugin entry in appropriate section (Library or Customer-Facing)
   - Status set to "stable" (or "beta" for early releases)
   - npm package name or docs URL
   - Brief description of skills/functionality

Example PR for Excel MCP Server (already published):

```markdown
## Changes

Added registration for Excel MCP Server library plugin.

### Modified Files
- `squads/forge/PLUGINS.md`

### Details
- Plugin: `excel-mcp-server`
- Type: Library (skills-only)
- Status: Stable
- Published: [@bradygaster/excel-mcp-server](https://npmjs.com/package/@bradygaster/excel-mcp-server)
- Version: 1.0.0

### Skills Included
- Excel File Operations (create, open, close workbooks/sheets)
- Excel Formatting (cells, fonts, borders)
- Power Query (M code generation)
- DAX Formulas (measure/column builder)
```

2. **Pull request checklist:**
   - [ ] Plugin is published (npm/GitHub Pages)
   - [ ] Version matches published package
   - [ ] Status accurately reflects release maturity
   - [ ] All skills described briefly in table
   - [ ] Links to documentation/npm are correct

3. **Approval workflow:**
   - Forge team validates plugin meets standards
   - Merge to main; deploy to squads/forge/PLUGINS.md
   - Update any linked Forge tracking artifacts in `squads/forge/home/`

### CI/CD Validation

The repository includes automated validation for plugin registry updates:

```yaml
# .github/workflows/forge-plugin-validate.yml
on:
  pull_request:
    paths: ["squads/forge/PLUGINS.md"]
  
  jobs:
    validate:
      - Check PLUGINS.md format
      - Validate plugin entries
      - Verify documentation links
      - Confirm npm/GitHub URLs are reachable
```

## Release Timeline Example: Excel MCP Server

**Week 1-2: Development**
- Implement skills (file ops, formatting, Power Query, DAX)
- Write unit and integration tests
- Create comprehensive README with examples
- Tag as v1.0.0-beta in dev repo

**Week 3: Beta Release**
- Build and publish to npm with `@next` tag
- Announce beta in team channels
- Gather feedback on skill APIs
- Address feedback in patch releases (1.0.0-beta.1, beta.2, etc.)

**Week 4: Stable Release**
- Address remaining feedback
- Finalize documentation
- Bump to v1.0.0
- Publish to npm
- Create GitHub release
- Push PR to squads/forge/PLUGINS.md in agency repo

**After Release: Maintenance**
- Monitor npm download stats
- Triage and fix reported issues
- Plan next feature set for v1.1.0
- Keep PLUGINS.md status current

## Plugin Status Over Time

Track plugin maturity through status field:

```
1.0.0-beta.1 (dev)     → Initial implementation, internal testing
1.0.0-beta.2 (dev)     → Feedback addressed
1.0.0 (beta)           → Published, inviting feedback
1.0.1 (stable)         → Bugs fixed, ready for production
1.1.0 (stable)         → New skills, full backward compatibility
2.0.0 (stable)         → Major redesign, breaking changes
2.0.1 (stable)         → Maintenance release
2.0.2 (deprecated)     → Superseded by 3.0.0, migration guide available
```

Update PLUGINS.md as status changes:

```markdown
| `excel-mcp-server` | **stable** | 1.0.1 | Excel Skill Team | ... |
```

## Troubleshooting

### npm publish fails

- Verify npm credentials: `npm whoami`
- Check package name isn't already taken
- Ensure version in `package.json` hasn't been published
- Check npm registry status: `npm ping`

### GitHub Pages deployment fails

- Verify build succeeds: `npm run build`
- Check `dist/` or `docs/` directory is committed/deployed
- Verify GitHub Pages is configured in repository settings
- Check branch protection rules allow deployment

### Validation fails in CI

- Ensure PLUGINS.md format matches template
- Check all referenced URLs are valid
- Verify plugin status is one of: dev, beta, stable, deprecated
- Confirm npm package/GitHub URL is reachable

## Best Practices

1. **Semantic versioning** — Use semver consistently
2. **Changelog discipline** — Update CHANGELOG.md with every release
3. **Testing before release** — Always run full test suite
4. **Documentation updates** — Keep README current with latest skills
5. **Gradual rollout** — Consider beta/next tag before stable
6. **Registry accuracy** — Update PLUGINS.md promptly after publication
7. **Communication** — Announce new plugins and major updates to team

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Forge Overview](../../docs/FORGE.md)
