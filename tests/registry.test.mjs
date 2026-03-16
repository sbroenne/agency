import test from 'node:test';
import assert from 'node:assert/strict';
import { loadRegistry } from '../scripts/lib/registry.mjs';

test('registry loads the founding squad', () => {
  const registry = loadRegistry();
  assert.equal(registry.counts.squads, 1);
  assert.equal(registry.squads[0].slug, 'agency');
  assert.equal(registry.squads[0].status, 'live');
  assert.match(registry.squads[0].source.repository, /github\.com\/sbroenne\/agency/);
});

test('registry counts members and focus areas', () => {
  const registry = loadRegistry();
  assert.equal(registry.counts.members, registry.squads[0].members.length);
  assert.ok(registry.counts.focusAreas >= 1);
});
