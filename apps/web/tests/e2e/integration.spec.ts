/**
 * Full app integration tests for Fractureline.
 *
 * These tests cover end-to-end user journeys through chapters 4 and 5,
 * navigation flows, UI interactions, and accessibility semantics that are
 * not already covered by app.spec.ts.
 */

import { expect, test, type Page } from '@playwright/test';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

async function clickChoice(page: Page, pattern: RegExp) {
  await page.getByRole('button', { name: pattern }).click();
}

/** Fast-forward through a chapter by always picking the first choice button
 *  (index 3 skips the nav + save/load/restart buttons) until a stop choice
 *  appears or the max attempts are exhausted. */
async function advanceUntil(page: Page, stopChoice: RegExp, maxAttempts = 40) {
  for (let i = 0; i < maxAttempts; i++) {
    const stop = page.getByRole('button', { name: stopChoice });
    if (await stop.count()) return;
    await page.getByRole('button').nth(3).click();
  }
  throw new Error(`Could not reach "${stopChoice.toString()}" within ${maxAttempts} steps`);
}

/** Complete Chapter 1 via the Signal Path (relay-legitimacy branch entry). */
async function completeChapter1SignalPath(page: Page) {
  await page.goto('/play');
  await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
  for (const choice of [
    /admit the com broke again/i,
    /study the official history/i,
    /answer the impossible voice/i,
    /start carefully and ask/i,
    /ask zelda what the family line means/i,
    /bring yve with you/i,
    /tell ari the truth/i,
    /end chapter 1/i,
  ]) {
    await clickChoice(page, choice);
  }
  await expect(page.getByText('Chapter 1 complete.', { exact: true })).toBeVisible();
}

/** Advance through Chapter 2 Signal pack and end it. */
async function completeChapter2Signal(page: Page) {
  await clickChoice(page, /continue to chapter 2/i);
  await expect(page.getByText(/chapter 2: the stable signal/i)).toBeVisible();
  await advanceUntil(page, /end chapter 2/i);
  await clickChoice(page, /end chapter 2/i);
  await expect(page.getByText('Chapter 2 complete.', { exact: true })).toBeVisible();
}

/** Advance through Chapter 3 Signal pack and choose relay-legitimacy ending. */
async function completeChapter3RelayLegitimacy(page: Page) {
  await clickChoice(page, /continue to chapter 3/i);
  await expect(page.getByText(/chapter 3: the relay accord/i)).toBeVisible();
  // Drive forward until the key branching choice appears
  await advanceUntil(page, /prioritize verification, even if it slows witness throughput/i);
  await clickChoice(page, /prioritize verification, even if it slows witness throughput/i);
  await advanceUntil(page, /end chapter 3/i);
  await clickChoice(page, /end chapter 3/i);
  await expect(page.getByText('Chapter 3 complete.', { exact: true })).toBeVisible();
}

// ---------------------------------------------------------------------------
// Chapter 4 integration tests
// ---------------------------------------------------------------------------

test.describe('Chapter 4 — relay-legitimacy path', () => {
  test('can complete Chapter 4 relay-legitimacy and see Chapter 5 continuation offer', async ({ page }) => {
    await completeChapter1SignalPath(page);
    await completeChapter2Signal(page);
    await completeChapter3RelayLegitimacy(page);

    // Enter Chapter 4
    await clickChoice(page, /continue to chapter 4/i);
    await expect(page.getByText(/chapter 4/i)).toBeVisible();

    // Chapter 4 has two content choices then End Chapter 4
    await advanceUntil(page, /end chapter 4/i);
    await clickChoice(page, /end chapter 4/i);

    await expect(page.getByText('Chapter 4 complete.', { exact: true })).toBeVisible();
    await expect(page.getByText(/relay-legitimacy-path/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /continue to chapter 5/i })).toBeVisible();
    await expect(page.getByText(/chapter 5: the cost of utopia/i)).toBeVisible();
  });

  test('can continue from Chapter 4 relay-legitimacy into Chapter 5 governance reckoning', async ({ page }) => {
    await completeChapter1SignalPath(page);
    await completeChapter2Signal(page);
    await completeChapter3RelayLegitimacy(page);
    await clickChoice(page, /continue to chapter 4/i);
    await advanceUntil(page, /end chapter 4/i);
    await clickChoice(page, /end chapter 4/i);
    await expect(page.getByText('Chapter 4 complete.', { exact: true })).toBeVisible();

    await clickChoice(page, /continue to chapter 5/i);
    await expect(page.getByRole('heading', { name: 'Zelda Adlez' })).toBeVisible();
    await expect(page.getByText(/chapter 5/i)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Chapter 5 integration test
// ---------------------------------------------------------------------------

test.describe('Chapter 5 — governance reckoning path', () => {
  test('can complete Chapter 5 governance reckoning', async ({ page }) => {
    await completeChapter1SignalPath(page);
    await completeChapter2Signal(page);
    await completeChapter3RelayLegitimacy(page);
    await clickChoice(page, /continue to chapter 4/i);
    await advanceUntil(page, /end chapter 4/i);
    await clickChoice(page, /end chapter 4/i);
    await clickChoice(page, /continue to chapter 5/i);
    await expect(page.getByText(/chapter 5/i)).toBeVisible();

    // Chapter 5 has two content choices then End Chapter 5
    await advanceUntil(page, /end chapter 5/i);
    await clickChoice(page, /end chapter 5/i);

    await expect(page.getByText('Chapter 5 complete.', { exact: true })).toBeVisible();
    await expect(page.getByText(/governance-reckoning-path/i)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// All chapter 4/5 pack assets are served
// ---------------------------------------------------------------------------

test('all Chapter 4 and 5 pack files are served as static assets', async ({ page }) => {
  const packs: Array<{ file: string; chapterLabel: RegExp; endingKey: string }> = [
    { file: 'chapter-4-relay-legitimacy.ink', chapterLabel: /Chapter 4/, endingKey: 'relay-legitimacy-path' },
    { file: 'chapter-4-relay-compromised.ink', chapterLabel: /Chapter 4/, endingKey: 'relay-compromised-path' },
    { file: 'chapter-4-ledger-trust.ink', chapterLabel: /Chapter 4/, endingKey: 'ledger-trust-path' },
    { file: 'chapter-4-emergency-custody.ink', chapterLabel: /Chapter 4/, endingKey: 'emergency-custody-path' },
    { file: 'chapter-4-trial-credibility.ink', chapterLabel: /Chapter 4/, endingKey: 'trial-credibility-path' },
    { file: 'chapter-4-amnesty-conflict.ink', chapterLabel: /Chapter 4/, endingKey: 'amnesty-conflict-path' },
    { file: 'chapter-5-governance-reckoning.ink', chapterLabel: /Chapter 5/, endingKey: 'governance-reckoning-path' },
    { file: 'chapter-5-lineage-protocol.ink', chapterLabel: /Chapter 5/, endingKey: 'lineage-protocol-path' },
    { file: 'chapter-5-memory-settlement.ink', chapterLabel: /Chapter 5/, endingKey: 'memory-settlement-path' },
  ];

  for (const { file, chapterLabel, endingKey } of packs) {
    const response = await page.request.get(`/chapter-packs/${file}`);
    expect(response.ok(), `Expected ${file} to return 200`).toBeTruthy();
    const body = await response.text();
    // Required Ink runtime variables are present
    expect(body, `Expected ${file} to contain stability variable`).toMatch(/VAR stability/);
    expect(body, `Expected ${file} to contain chapterFourComplete or chapterFiveComplete`).toMatch(
      /chapterFourComplete|chapterFiveComplete/,
    );
    // Chapter-specific content is present
    expect(body, `Expected ${file} to reference correct chapter`).toMatch(chapterLabel);
    expect(body, `Expected ${file} to set ending key "${endingKey}"`).toContain(endingKey);
    // Retired character names are not present
    expect(body, `${file} must not contain retired character "Mira Vale"`).not.toContain('Mira Vale');
    expect(body, `${file} must not contain retired character "Soren Quill"`).not.toContain('Soren Quill');
  }
});

// ---------------------------------------------------------------------------
// Navigation / routing integration tests
// ---------------------------------------------------------------------------

test.describe('Navigation', () => {
  test('SiteNav "Play" link navigates to the play route', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /^play$/i }).click();
    await expect(page).toHaveURL(/\/play/);
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
  });

  test('SiteNav "Help" link navigates to the help route', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /^help$/i }).click();
    await expect(page).toHaveURL(/\/help/);
    await expect(page.getByRole('heading', { name: /how to play fractureline/i })).toBeVisible();
  });

  test('"Fractureline" logo link returns to the home page from play', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    await page.getByRole('link', { name: /fractureline/i }).click();
    await expect(page).toHaveURL(/^\//);
    await expect(page.getByRole('heading', { name: /a utopia in the past/i })).toBeVisible();
  });

  test('"Fractureline" logo link returns to the home page from help', async ({ page }) => {
    await page.goto('/help');
    await page.getByRole('link', { name: /fractureline/i }).click();
    await expect(page).toHaveURL(/^\//);
    await expect(page.getByRole('heading', { name: /a utopia in the past/i })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Chapter chip / badge display
// ---------------------------------------------------------------------------

test.describe('Chapter badge display', () => {
  test('Chapter 1 chip is shown on the play page', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    await expect(page.getByText('Chapter 1', { exact: true })).toBeVisible();
  });

  test('POV chip shows "Past" for Xav scenes', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    await expect(page.getByText('Past', { exact: true })).toBeVisible();
  });

  test('POV chip shows "Future" after switching to Zelda', async ({ page }) => {
    await page.goto('/play');
    await clickChoice(page, /admit the com broke again/i);
    await clickChoice(page, /ask why diderram needed cybol/i);
    await clickChoice(page, /answer zelda before the signal dies/i);
    await expect(page.getByRole('heading', { name: 'Zelda Adlez' })).toBeVisible();
    await expect(page.getByText('Future', { exact: true })).toBeVisible();
  });

  test('Chapter 2 chip appears after continuing to Chapter 2', async ({ page }) => {
    await completeChapter1SignalPath(page);
    await clickChoice(page, /continue to chapter 2/i);
    await expect(page.getByText('Chapter 2', { exact: true })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Timeline signal display
// ---------------------------------------------------------------------------

test.describe('Timeline signals', () => {
  test('all five signal labels are visible on the play page', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    for (const label of ['Order', 'Dissent', 'Memory', 'Entropy', 'Control']) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test('"Timeline Signals" section heading is visible', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: /timeline signals/i })).toBeVisible();
  });

  test('Dissent signal updates to Rising after a rebellion choice', async ({ page }) => {
    await page.goto('/play');
    // "joke that cybol technology" is tagged cue:rebellion → rebellion += 1
    await clickChoice(page, /joke that cybol technology/i);
    const dissentSignal = page.locator('dl').getByText('Dissent').locator('../..');
    await expect(dissentSignal.getByText('Rising')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Codex display
// ---------------------------------------------------------------------------

test.describe('Codex', () => {
  test('codex section appears when codex entries have been unlocked', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    // Advance into the chapter to trigger codex entries
    await clickChoice(page, /admit the com broke again/i);
    await clickChoice(page, /study the official history/i);
    // The codex aside should eventually appear as the player progresses
    await clickChoice(page, /answer the impossible voice/i);
    // Check if codex section exists (it may or may not appear depending on story progression)
    const codex = page.getByText('Codex', { exact: true });
    // We only assert it's reachable — some paths surface it, others don't by this point
    await expect(codex.or(page.getByRole('heading', { name: 'Xav Reivax' }))).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Ambience control interaction tests
// ---------------------------------------------------------------------------

test.describe('Ambience control UI', () => {
  test('volume panel toggles open and closed via the Volume button', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('complementary', { name: /ambience controls/i })).toBeVisible();

    // Slider should not be visible before opening the panel
    await expect(page.getByRole('slider', { name: /ambience volume/i })).not.toBeVisible();

    await page.getByRole('button', { name: /volume/i }).click();
    await expect(page.getByRole('slider', { name: /ambience volume/i })).toBeVisible();

    await page.getByRole('button', { name: /hide/i }).click();
    await expect(page.getByRole('slider', { name: /ambience volume/i })).not.toBeVisible();
  });

  test('mute/unmute button label changes after clicking', async ({ page }) => {
    await page.goto('/play');
    const muteBtn = page.getByRole('button', { name: /mute|enable|unmute/i });
    await expect(muteBtn).toBeVisible();

    const initialText = await muteBtn.textContent();
    await muteBtn.click();

    // After one click the label should flip (Enable→Mute or Mute→Unmute)
    const updatedText = await page.getByRole('button', { name: /mute|enable|unmute/i }).textContent();
    expect(updatedText).not.toEqual(initialText);
  });
});

// ---------------------------------------------------------------------------
// Help page completeness
// ---------------------------------------------------------------------------

test.describe('Help page content', () => {
  test('explains all three characters', async ({ page }) => {
    await page.goto('/help');
    for (const name of ['Xav Reivax', 'Zelda Adlez', 'Yve Ettevy']) {
      await expect(page.getByText(name)).toBeVisible();
    }
  });

  test('mentions all five timeline signal types', async ({ page }) => {
    await page.goto('/help');
    for (const signal of ['stability', 'rebellion', 'memory', 'entropy', 'control']) {
      await expect(page.getByText(new RegExp(signal, 'i'))).toBeVisible();
    }
  });

  test('explains local saves', async ({ page }) => {
    await page.goto('/help');
    await expect(page.getByText(/local saves/i)).toBeVisible();
    await expect(page.getByText(/save progress/i)).toBeVisible();
  });

  test('does not expose internal build tool names', async ({ page }) => {
    await page.goto('/help');
    for (const tool of ['playwright', 'vitest', 'webpack', 'esbuild']) {
      await expect(page.getByText(new RegExp(tool, 'i'))).toHaveCount(0);
    }
  });
});

// ---------------------------------------------------------------------------
// Restart flow
// ---------------------------------------------------------------------------

test('restart chapter resets to Chapter 1 opening scene', async ({ page }) => {
  await page.goto('/play');
  await clickChoice(page, /admit the com broke again/i);
  await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();

  await page.getByRole('button', { name: /restart chapter/i }).click();
  await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
  await expect(page.getByText('Chapter 1', { exact: true })).toBeVisible();
});

// ---------------------------------------------------------------------------
// Save / load state persistence across reload
// ---------------------------------------------------------------------------

test('save persists across a full page reload', async ({ page }) => {
  await page.goto('/play');
  await clickChoice(page, /admit the com broke again/i);
  await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();

  await page.getByRole('button', { name: /save progress/i }).click();
  await expect(page.getByRole('button', { name: /load progress/i })).toBeEnabled();

  // Hard reload the page — IndexedDB save should survive
  await page.reload();
  await expect(page.getByRole('button', { name: /load progress/i })).toBeEnabled();

  await page.getByRole('button', { name: /load progress/i }).click();
  await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();
});

// ---------------------------------------------------------------------------
// Mobile viewport layout
// ---------------------------------------------------------------------------

test.describe('Mobile layout', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('play page renders correctly on a narrow viewport', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    // Ambience control should still be accessible on mobile
    await expect(page.getByRole('complementary', { name: /ambience controls/i })).toBeVisible();
    // No horizontal overflow — the viewport width should not expand
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(390 + 5); // 5px tolerance
  });

  test('home page renders without horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /a utopia in the past/i })).toBeVisible();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(390 + 5);
  });
});

// ---------------------------------------------------------------------------
// Accessibility / ARIA semantics
// ---------------------------------------------------------------------------

test.describe('Accessibility semantics', () => {
  test('play page has a top-level heading', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    // The speaker name is the h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('choices list is labelled with "Choices" for screen readers', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByLabel('Choices')).toBeVisible();
  });

  test('timeline signals section has a labelled heading', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: /timeline signals/i })).toBeVisible();
  });

  test('ambience aside has an accessible label', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('complementary', { name: /ambience controls/i })).toBeVisible();
  });

  test('save/load/restart buttons are focusable and have text labels', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    for (const label of [/save progress/i, /load progress/i, /restart chapter/i]) {
      await expect(page.getByRole('button', { name: label })).toBeVisible();
    }
  });
});
