import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadRegistry, readJson, repoRoot } from '../scripts/lib/registry.mjs';

const schemaPath = path.join(repoRoot, 'schema', 'squad.schema.json');
const baseManifestPath = path.join(repoRoot, 'squads', 'agency', 'squad.json');
const baseManifest = readJson(baseManifestPath);
const fixedNow = '2026-03-19T00:00:00.000Z';

function setupRepo(t, manifests) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agency-registry-'));
  t.after(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  fs.mkdirSync(path.join(tempRoot, 'schema'), { recursive: true });
  fs.copyFileSync(schemaPath, path.join(tempRoot, 'schema', 'squad.schema.json'));

  for (const [folder, manifest] of Object.entries(manifests)) {
    const manifestPath = path.join(tempRoot, 'squads', folder, 'squad.json');
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(
      manifestPath,
      typeof manifest === 'string' ? manifest : `${JSON.stringify(manifest, null, 2)}\n`,
    );
  }

  return {
    repoRoot: tempRoot,
    schemaPath: path.join(tempRoot, 'schema', 'squad.schema.json'),
    squadsRoot: path.join(tempRoot, 'squads'),
    now: () => fixedNow,
  };
}

function expectValidationFailure(t, manifests, matcher) {
  assert.throws(() => loadRegistry(setupRepo(t, manifests)), matcher);
}

test('registry loads and normalizes a valid manifest', (t) => {
  const manifest = structuredClone(baseManifest);
  manifest.focus = ['registry', 'GitHub Pages', 'pull requests', 'squad.json'];
  manifest.links = [
    { label: 'Docs', url: 'https://example.com/docs' },
    { label: 'Repository mirror', url: manifest.source.repository },
    { label: 'Pages mirror', url: manifest.source.homepage },
  ];
  manifest.team.members[0].expertise = ['product direction', 'architecture'];

  const registry = loadRegistry(setupRepo(t, { agency: manifest }));

  assert.equal(registry.counts.squads, 1);
  assert.equal(registry.generatedAt, fixedNow);
  assert.deepEqual(registry.squads[0].focus, ['GitHub Pages', 'pull requests', 'registry', 'squad.json']);
  assert.deepEqual(registry.squads[0].members[0].expertise, ['architecture', 'product direction']);
  assert.deepEqual(registry.squads[0].links, [
    { label: 'Repository', url: 'https://github.com/sbroenne/agency' },
    { label: 'Homepage', url: 'https://sbroenne.github.io/agency/' },
    { label: 'Docs', url: 'https://example.com/docs' },
  ]);
});

test('registry counts members and focus areas', () => {
  const registry = loadRegistry();
  const totalMembers = registry.squads.reduce((sum, s) => sum + s.members.length, 0);
  assert.equal(registry.counts.members, totalMembers);
  assert.ok(registry.counts.focusAreas >= 1);
});

test('registry derives a stable source label for non-GitHub repositories', (t) => {
  const manifest = structuredClone(baseManifest);
  manifest.source.repository = 'https://example.com/squads/agency';
  manifest.links = [{ label: 'Reference', url: 'https://example.com/docs/agency' }];

  const registry = loadRegistry(setupRepo(t, { agency: manifest }));

  assert.equal(registry.squads[0].sourceLabel, 'example.com/squads/agency');
});

test('registry rejects invalid JSON manifests', (t) => {
  expectValidationFailure(t, { agency: '{"id": "broken"' }, /invalid JSON/);
});

test('registry rejects malformed repository URLs', (t) => {
  const manifest = structuredClone(baseManifest);
  manifest.source.repository = 'https://github.com';

  expectValidationFailure(
    t,
    { agency: manifest },
    /source\.repository must include an owner and repository path/,
  );
});

test('registry rejects sync imports without path and ref', (t) => {
  const manifest = structuredClone(baseManifest);
  manifest.source.import = { type: 'upstream-sync' };

  expectValidationFailure(t, { agency: manifest }, /source\/import must have required property 'path'/);
});

test('registry rejects repository-relative path escapes', (t) => {
  const manifest = structuredClone(baseManifest);
  manifest.source.directory = '../outside';
  manifest.source.import = { type: 'manual', path: '/tmp/squad.json', ref: 'main' };

  expectValidationFailure(
    t,
    { agency: manifest },
    /source\.directory must stay within the repository|source\.import\.path must be relative/,
  );
});

test('registry rejects slug and directory mismatches', (t) => {
  const manifest = structuredClone(baseManifest);
  manifest.slug = 'different-slug';

  expectValidationFailure(t, { agency: manifest }, /must match directory name "agency"/);
});

test('registry rejects duplicate ids and slugs across manifests', (t) => {
  const secondManifest = structuredClone(baseManifest);
  secondManifest.name = 'Agency Duplicate';

  expectValidationFailure(
    t,
    {
      agency: baseManifest,
      'agency-duplicate': secondManifest,
    },
    /id "agency" already used|slug "agency" already used/,
  );
});

test('registry rejects case-insensitive duplicate focus and expertise values', (t) => {
  const manifest = structuredClone(baseManifest);
  manifest.focus = ['registry', 'Registry'];
  manifest.team.members[0].expertise = ['architecture', 'Architecture'];

  expectValidationFailure(
    t,
    { agency: manifest },
    /duplicate focus value "Registry"|duplicate expertise for member Mon Mothma value "Architecture"/,
  );
});
