/**
 * Filter UI structure tests — validates that the tiered filter system is
 * correctly rendered in the build output without requiring Playwright.
 *
 * Run with: node --test tooling/tests/filter-ui.test.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '..', '..', 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

function getIndexHtml() {
  if (!fs.existsSync(INDEX_HTML)) {
    throw new Error('Build output not found. Run `npm run build` first.');
  }
  return fs.readFileSync(INDEX_HTML, 'utf8');
}

test.describe('Filter UI structure', () => {
  let html;

  test.before(() => {
    html = getIndexHtml();
  });

  // ── Tier 1: Status chips ───────────────────────────────────────────────────

  test('Tier 1: Status filter group is present with ARIA label', () => {
    assert.ok(
      html.includes('aria-label="Filter by status"'),
      'Status filter group should have aria-label="Filter by status"'
    );
  });

  test('Tier 1: All four status chips exist (all, live, building, prototype)', () => {
    assert.ok(html.includes('data-status-filter="all"'), 'Missing "all" status chip');
    assert.ok(html.includes('data-status-filter="live"'), 'Missing "live" status chip');
    assert.ok(html.includes('data-status-filter="building"'), 'Missing "building" status chip');
    assert.ok(html.includes('data-status-filter="prototype"'), 'Missing "prototype" status chip');
  });

  test('Tier 1: "All" chip is active by default', () => {
    // The "all" button should have data-active attribute in the static HTML
    const allChipMatch = html.match(/data-status-filter="all"[^>]*data-active/);
    assert.ok(allChipMatch, '"All" status chip should be active by default');
  });

  test('Tier 1: Status chips show counts in parentheses', () => {
    // Look for count pattern like "(1)" or "(0)" near status filters
    const statusSection = html.match(/aria-label="Filter by status"[\s\S]*?<\/div>\s*<\/div>/);
    assert.ok(statusSection, 'Status filter section not found');
    assert.ok(
      statusSection[0].match(/\(\d+\)/g)?.length >= 4,
      'All status chips should show counts'
    );
  });

  // ── Tier 2: Focus filters ──────────────────────────────────────────────────

  test('Tier 2: Focus filter panel exists with toggle button', () => {
    assert.ok(html.includes('id="focus-filter-panel"'), 'Focus filter panel missing');
    assert.ok(html.includes('id="focus-toggle"'), 'Focus toggle button missing');
  });

  test('Tier 2: Focus panel is collapsed by default (aria-expanded="false")', () => {
    assert.ok(
      html.includes('aria-expanded="false"'),
      'Focus panel should be collapsed by default'
    );
  });

  test('Tier 2: Focus content container is hidden by default', () => {
    // Look for the hidden class on the focus filter content (minified: class comes before id)
    const focusContentMatch = html.match(/class="[^"]*hidden[^"]*"[^>]*id="focus-filter-content"/) ||
                              html.match(/id="focus-filter-content"[^>]*class="[^"]*hidden/);
    assert.ok(focusContentMatch, 'Focus content should have "hidden" class by default');
  });

  test('Tier 2: Inline search for focus areas exists', () => {
    assert.ok(
      html.includes('id="focus-search"'),
      'Focus area inline search input missing'
    );
    assert.ok(
      html.includes('placeholder="Search focus areas…"'),
      'Focus search should have appropriate placeholder'
    );
  });

  test('Tier 2: Focus chips container has proper ARIA role', () => {
    assert.ok(
      html.includes('aria-label="Filter by focus area"'),
      'Focus chips container should have aria-label="Filter by focus area"'
    );
  });

  test('Tier 2: Focus chips have data-focus-filter attributes', () => {
    const focusChipMatches = html.match(/data-focus-filter="[^"]+"/g) || [];
    assert.ok(
      focusChipMatches.length > 0,
      'At least one focus filter chip should exist'
    );
  });

  test('Tier 2: Focus chips show counts', () => {
    // Focus chips should have counts like "(1)"
    const focusSection = html.match(/id="focus-chips"[\s\S]*?<\/div>/);
    assert.ok(focusSection, 'Focus chips container not found');
    assert.ok(
      focusSection[0].match(/\(\d+\)/),
      'Focus chips should show counts'
    );
  });

  test('Tier 2: Clear filters button exists (hidden by default)', () => {
    assert.ok(html.includes('id="focus-clear"'), 'Clear filters button missing');
    // Handle minified output: class before id or id before class
    const clearMatch = html.match(/class="[^"]*hidden[^"]*"[^>]*id="focus-clear"/) ||
                       html.match(/id="focus-clear"[^>]*class="[^"]*hidden/);
    assert.ok(clearMatch, 'Clear filters button should be hidden by default');
  });

  // ── Squad cards ────────────────────────────────────────────────────────────

  test('Squad cards have data-status attribute for filtering', () => {
    assert.ok(
      html.includes('data-status="live"') ||
      html.includes('data-status="building"') ||
      html.includes('data-status="prototype"'),
      'Squad cards should have data-status attribute'
    );
  });

  test('Squad cards have data-focus attribute for filtering', () => {
    assert.ok(
      html.includes('data-focus='),
      'Squad cards should have data-focus attribute'
    );
  });

  // ── Discovery-first hierarchy preserved ────────────────────────────────────

  test('Directory section appears before Resources section', () => {
    const browsePos = html.indexOf('id="browse"');
    const resourcesPos = html.indexOf('id="quick-links-title"');
    assert.ok(browsePos > -1, 'Browse section not found');
    assert.ok(resourcesPos > -1, 'Resources section not found');
    assert.ok(
      browsePos < resourcesPos,
      'Browse/Directory section should appear before Resources (discovery-first hierarchy)'
    );
  });
});
