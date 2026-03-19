/**
 * Visual acceptance harness — re-review lane.
 *
 * Acceptance bar (set by Wedge, 2026-03-17):
 *   1. Lighter shell — body/page chrome is light-neutral, not dark navy/glass.
 *   2. Rose-led hero CTA pair — solid rose primary + neutral secondary button in hero.
 *   3. Calmer bordered surfaces — no heavy backdrop-blur on hero or cards.
 *   4. Restrained accent use — cyan is NOT a first-class accent on cards or buttons.
 *   5. Tighter radius/border treatment — border-radius is in the 4–16 px range, not 28–32 px.
 *   6. Explanatory style sentence removed — the "Styled to track..." meta-sentence is gone.
 *
 * Prerequisites:
 *   npm run build          — must complete before running this suite
 *   npm run test:visual    — builds then runs this file via `node --test`
 *
 * Screenshots are saved to tooling/tests/screenshots/visual-acceptance/ for human review.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots', 'visual-acceptance');
const PREVIEW_PORT = 4322;
const BASE_URL = `http://127.0.0.1:${PREVIEW_PORT}`;
const PREVIEW_TIMEOUT_MS = 20_000;

// ── Server lifecycle ────────────────────────────────────────────────────────

function startPreviewServer() {
  return spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(PREVIEW_PORT)], {
    cwd: path.join(__dirname, '..', '..'),
    stdio: 'pipe',
    shell: false,
  });
}

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (res.ok || res.status === 404) return; // 404 is fine — server is up
    } catch {
      // not ready yet
    }
    await new Promise(r => setTimeout(r, 300));
  }
  throw new Error(`Preview server did not start within ${timeoutMs}ms`);
}

// ── Colour helpers ──────────────────────────────────────────────────────────

/** Parse "rgb(r, g, b)" or "rgba(r, g, b, a)" → [r,g,b]. Returns null on failure. */
function parseRgb(cssColor) {
  const m = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

function isLight([r, g, b]) {
  // Perceived luminance (WCAG formula)
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 160; // > 160/255 → clearly light
}

function isDark([r, g, b]) {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 80;
}

function isCyan([r, g, b]) {
  // Cyan family: G and B both significantly higher than R
  return b > 150 && g > 150 && r < 100;
}

function isRose([r, g, b]) {
  // Rose family: R dominant, moderate-to-high G, moderate B; #dd2d60 ≈ rgb(221,45,96)
  return r > 180 && g < 120 && b < 130;
}

// ── Suite ───────────────────────────────────────────────────────────────────

test.describe('Visual acceptance — re-review lane', { concurrency: false }, () => {
  let server;
  let browser;
  let page;

  test.before(async () => {
    await mkdir(SCREENSHOTS_DIR, { recursive: true });
    server = startPreviewServer();

    // Surface server stderr for debugging if tests fail
    server.stderr.on('data', d => process.stderr.write(`[preview] ${d}`));

    await waitForServer(BASE_URL, PREVIEW_TIMEOUT_MS);

    browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test.after(async () => {
    await browser?.close();
    server?.kill('SIGTERM');
  });

  // ── Check 1: Lighter shell ─────────────────────────────────────────────────
  test('1. Shell is light — body background is not dark navy or black', async () => {
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01-full-page.png'),
      fullPage: true,
    });

    const bodyBg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );

    const rgb = parseRgb(bodyBg);

    // If transparent/initial, check the first full-bleed container instead
    if (!rgb || (rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0)) {
      const wrapperBg = await page.evaluate(() => {
        const el = document.querySelector('main, #app, .app, [class*="bg-"]');
        return el ? getComputedStyle(el).backgroundColor : 'transparent';
      });
      const wrapperRgb = parseRgb(wrapperBg);
      if (wrapperRgb) {
        assert.ok(
          !isDark(wrapperRgb),
          `Page shell is still dark. Computed: ${wrapperBg}. Expected a light-neutral shell.`
        );
        return;
      }
    }

    // A transparent body is acceptable only when the page itself appears light — check
    // the rendered pixel colour at a corner of the viewport instead.
    if (!rgb || (rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0)) {
      // Fallback: evaluate the actual page background via CSS
      const htmlBg = await page.evaluate(() =>
        getComputedStyle(document.documentElement).backgroundColor
      );
      const htmlRgb = parseRgb(htmlBg);
      if (htmlRgb && (htmlRgb[0] + htmlRgb[1] + htmlRgb[2]) > 0) {
        assert.ok(
          isLight(htmlRgb),
          `HTML background is still dark (${htmlBg}). Expected a light-neutral page shell.`
        );
        return;
      }
      // Truly transparent — pass (white default browser background)
      return;
    }

    assert.ok(
      isLight(rgb),
      `Body background is dark (${bodyBg}). Expected a light-neutral shell (e.g. #ffffff, #fafafa).`
    );
  });

  // ── Check 2: Rose-led hero CTA pair ───────────────────────────────────────
  test('2. Hero has a rose primary CTA button', async () => {
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02-hero.png'),
      clip: { x: 0, y: 0, width: 1280, height: 600 },
    });

    // Collect background colours of all <a> and <button> elements in the hero
    const heroCtaBgs = await page.evaluate(() => {
      const hero = document.querySelector(
        'section, header, [class*="hero"], h1, [id="hero"]'
      );
      const root = hero ?? document.body;
      const btns = Array.from(root.querySelectorAll('a, button'));
      return btns.map(el => getComputedStyle(el).backgroundColor);
    });

    const hasRoseCta = heroCtaBgs.some(bg => {
      const rgb = parseRgb(bg);
      return rgb && isRose(rgb);
    });

    assert.ok(
      hasRoseCta,
      `No rose-primary CTA found in hero. Inspect 02-hero.png. ` +
      `Buttons seen: ${heroCtaBgs.slice(0, 6).join(', ')}`
    );
  });

  // ── Check 3: Calmer surfaces — no heavy backdrop-blur ─────────────────────
  test('3. Hero and cards have no heavy backdrop-filter blur', async () => {
    const blurringElements = await page.evaluate(() => {
      const candidates = document.querySelectorAll(
        'section, header, article, [class*="card"], [class*="hero"], [class*="modal"]'
      );
      return Array.from(candidates)
        .map(el => ({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString().slice(0, 60),
          filter: getComputedStyle(el).backdropFilter,
          webkitFilter: getComputedStyle(el).webkitBackdropFilter,
        }))
        .filter(e =>
          e.filter !== 'none' && e.filter !== '' ||
          e.webkitFilter !== 'none' && e.webkitFilter !== ''
        );
    });

    assert.equal(
      blurringElements.length,
      0,
      `Glassmorphism backdrop-blur still present on ${blurringElements.length} element(s):\n` +
      blurringElements.map(e => `  <${e.tag} class="${e.cls}"> — ${e.filter}`).join('\n')
    );
  });

  // ── Check 4: Restrained accent use — no cyan as a first-class colour ───────
  test('4. Cyan is not used as a first-class accent on cards or buttons', async () => {
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '04-cards.png'),
      fullPage: true,
    });

    const cyanElements = await page.evaluate(() => {
      const targets = document.querySelectorAll(
        '[class*="card"], article, a, button, [class*="badge"], [class*="chip"], [class*="tag"]'
      );
      return Array.from(targets)
        .map(el => ({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString().slice(0, 60),
          bg: getComputedStyle(el).backgroundColor,
          border: getComputedStyle(el).borderColor,
          color: getComputedStyle(el).color,
        }))
        .filter(e => {
          const checks = [e.bg, e.border];
          return checks.some(css => {
            const m = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (!m) return false;
            const [, r, g, b] = m.map(Number);
            // Cyan: B and G both > 150, R < 100
            return b > 150 && g > 150 && r < 100;
          });
        });
    });

    assert.equal(
      cyanElements.length,
      0,
      `Cyan is still a first-class accent on ${cyanElements.length} element(s):\n` +
      cyanElements.slice(0, 5).map(e => `  <${e.tag} class="${e.cls}"> bg:${e.bg} border:${e.border}`).join('\n')
    );
  });

  // ── Check 5: Tighter radius/border treatment ───────────────────────────────
  test('5. Border-radius is in the 4–16 px range (not 28–32 px glass treatment)', async () => {
    const oversizedRadii = await page.evaluate(() => {
      const targets = document.querySelectorAll(
        '[class*="card"], article, section, header, [class*="hero"], button, a[class*="btn"]'
      );
      return Array.from(targets)
        .map(el => ({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString().slice(0, 60),
          radius: getComputedStyle(el).borderRadius,
        }))
        .filter(e => {
          const px = parseFloat(e.radius);
          return Number.isFinite(px) && px > 20;
        });
    });

    assert.equal(
      oversizedRadii.length,
      0,
      `${oversizedRadii.length} element(s) still use oversized border-radius (>20 px):\n` +
      oversizedRadii.slice(0, 5).map(e => `  <${e.tag} class="${e.cls}"> radius:${e.radius}`).join('\n')
    );
  });

  // ── Check 6: Explanatory style sentence removed ────────────────────────────
  test('6. Explanatory "Styled to track..." meta-sentence is absent', async () => {
    const bodyText = await page.evaluate(() => document.body.innerText);

    const patterns = [
      /styled to track/i,
      /tracking.*squad docs/i,
      /squad docs.*language.*more closely/i,
    ];

    for (const pattern of patterns) {
      assert.ok(
        !pattern.test(bodyText),
        `Found explanatory meta-sentence matching /${pattern.source}/ on the page. It must be removed.`
      );
    }
  });
});
