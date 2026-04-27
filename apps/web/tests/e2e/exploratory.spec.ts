/**
 * Exploratory QA: tests for gaps not covered by the main app.spec.ts suite.
 *
 * Coverage areas:
 * - GameBriefing (show on first visit, dismiss via both buttons)
 * - Site navigation (all nav links)
 * - UI state chips (chapter, POV, save, ending-key)
 * - Restart dialog cancel path
 * - Ambience volume panel toggle
 * - Accessibility landmarks (ARIA roles / labelledby)
 * - Timeline signal level changes (Truth signal)
 * - Family path Chapter 2 & 3 completion
 * - History path Chapter 2 & 3 completion
 */

import { expect, test, type Page } from '@playwright/test';

// ─── helpers ────────────────────────────────────────────────────────────────

async function clickChoiceByPattern(page: Page, pattern: RegExp) {
  await page.getByRole('button', { name: pattern }).click();
}

/** Click the first available choice button until `stopChoice` appears, or throw. */
async function advanceByClickingFirstChoiceUntil(
  page: Page,
  stopChoice: RegExp,
  maxAttempts = 32,
) {
  for (let i = 0; i < maxAttempts; i++) {
    const stop = page.getByRole('button', { name: stopChoice });
    if (await stop.count()) return;
    await page.locator('[aria-label="Choices"] button').first().click();
  }
  throw new Error(`Could not reach choice ${stopChoice.toString()} within ${maxAttempts} steps`);
}

/** Navigate the Signal path through Chapter 1 so tests can start at Chapter 2. */
async function completeChapter1SignalPath(page: Page) {
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
    await clickChoiceByPattern(page, choice);
  }
}

/** Navigate the Family path through Chapter 1. */
async function completeChapter1FamilyPath(page: Page) {
  for (const choice of [
    /joke that cybol technology/i,
    /tell yve exactly what appeared/i,
    /answer zelda before the signal dies/i,
    /tell xav the truth/i,
    /ask what event starts the fall/i,
    /open the notebook before ari/i,
    /end chapter 1/i,
  ]) {
    await clickChoiceByPattern(page, choice);
  }
}

/** Navigate the History path through Chapter 1. */
async function completeChapter1HistoryPath(page: Page) {
  for (const choice of [
    /admit the com broke again/i,
    /ask why diderram needed cybol/i,
    /answer zelda before the signal dies/i,
    /tell xav the truth/i,
    /ask what event starts the fall/i,
    /let ari help/i,
    /end chapter 1/i,
  ]) {
    await clickChoiceByPattern(page, choice);
  }
}

// ─── GameBriefing ──────────────────────────────────────────────────────────

test.describe('GameBriefing', () => {
  test('shows on first visit when localStorage has no dismissal flag', async ({ page }) => {
    // Explicitly remove the dismissal flag so the briefing shows.
    await page.goto('/play');
    await page.evaluate(() => localStorage.removeItem('fractureline:briefing-dismissed'));
    await page.reload();

    await expect(page.getByRole('heading', { name: /you are entering ayker/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /enter the first fracture/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /dismiss/i })).toBeVisible();
  });

  test('"Enter the first fracture" hides the briefing and persists the dismissal', async ({ page }) => {
    await page.goto('/play');
    await page.evaluate(() => localStorage.removeItem('fractureline:briefing-dismissed'));
    await page.reload();

    await page.getByRole('button', { name: /enter the first fracture/i }).click();

    // Briefing should disappear.
    await expect(page.getByRole('button', { name: /enter the first fracture/i })).toHaveCount(0);

    // localStorage flag should be set, so reloading also hides it.
    await page.reload();
    await expect(page.getByRole('button', { name: /enter the first fracture/i })).toHaveCount(0);
  });

  test('"Dismiss" button also hides the briefing', async ({ page }) => {
    await page.goto('/play');
    await page.evaluate(() => localStorage.removeItem('fractureline:briefing-dismissed'));
    await page.reload();

    await page.getByRole('button', { name: /^dismiss$/i }).click();

    await expect(page.getByRole('button', { name: /enter the first fracture/i })).toHaveCount(0);
  });

  test('briefing does not appear when dismissal flag is already set', async ({ page }) => {
    // Pre-set the dismissal flag before the page loads.
    await page.goto('/play');
    await page.evaluate(() => localStorage.setItem('fractureline:briefing-dismissed', '1'));
    await page.reload();

    await expect(page.getByRole('button', { name: /enter the first fracture/i })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: /you are entering ayker/i })).toHaveCount(0);
  });
});

// ─── Site navigation ────────────────────────────────────────────────────────

test.describe('site navigation', () => {
  test('nav "Play" link from help page goes to /play', async ({ page }) => {
    await page.goto('/help');
    await page.getByRole('link', { name: /^play$/i }).click();
    await expect(page).toHaveURL(/\/play/);
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
  });

  test('nav "Help" link from play page goes to /help', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    await page.getByRole('link', { name: /^help$/i }).click();
    await expect(page).toHaveURL(/\/help/);
    await expect(page.getByRole('heading', { name: /how to play fractureline/i })).toBeVisible();
  });

  test('"Fractureline" logo link goes to home page', async ({ page }) => {
    await page.goto('/play');
    await page.getByRole('link', { name: /^fractureline$/i }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { name: /a utopia in the past/i })).toBeVisible();
  });

  test('home "How it works" button goes to /help', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /how it works/i }).click();
    await expect(page).toHaveURL(/\/help/);
    await expect(page.getByRole('heading', { name: /how to play fractureline/i })).toBeVisible();
  });
});

// ─── UI state chips ─────────────────────────────────────────────────────────

test.describe('UI state chips', () => {
  test('chapter chip shows "Chapter 1" at the start of play', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    await expect(page.getByText('Chapter 1', { exact: true })).toBeVisible();
  });

  test('POV chip shows "Past" at the start and "Future" when in Zelda scenes', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    // Initial POV is Past.
    await expect(page.locator('[role="status"]').filter({ hasText: 'Past' })).toHaveCount(0);
    // MUI Chip renders as a <div> — check by text content directly.
    const chipText = await page.locator('.MuiChip-label').allTextContents();
    expect(chipText).toContain('Past');

    // Navigate to Zelda.
    await clickChoiceByPattern(page, /admit the com broke again/i);
    await clickChoiceByPattern(page, /ask why diderram needed cybol/i);
    await clickChoiceByPattern(page, /answer zelda before the signal dies/i);

    // Now in a Zelda (future) scene.
    await expect(page.getByRole('heading', { name: 'Zelda Adlez' })).toBeVisible();
    const chipTextAfter = await page.locator('.MuiChip-label').allTextContents();
    expect(chipTextAfter).toContain('Future');
  });

  test('"No save" chip shows initially; "Local save ready" appears after saving', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    // Before any save, "No save" chip should be visible.
    await expect(page.getByText('No save', { exact: true })).toBeVisible();

    // Make a choice to advance, then save.
    await clickChoiceByPattern(page, /admit the com broke again/i);
    await page.getByRole('button', { name: /save progress/i }).click();

    // After save, "Local save ready" chip should appear.
    await expect(page.getByText('Local save ready', { exact: true })).toBeVisible();
  });

  test('ending-key chip appears after chapter 1 completion', async ({ page }) => {
    await page.goto('/play');
    await completeChapter1SignalPath(page);

    await expect(page.getByText('Chapter 1 complete.', { exact: true })).toBeVisible();

    // endingKey "signal-path" → formats to "Signal Path" chip
    const chipLabels = await page.locator('.MuiChip-label').allTextContents();
    expect(chipLabels.some((label) => /signal path/i.test(label))).toBe(true);
  });

  test('chapter chip increments to "Chapter 2" after continuing from Chapter 1', async ({ page }) => {
    await page.goto('/play');
    await completeChapter1SignalPath(page);
    await clickChoiceByPattern(page, /continue to chapter 2/i);

    await expect(page.getByText(/chapter 2: the stable signal/i)).toBeVisible();
    const chipLabels = await page.locator('.MuiChip-label').allTextContents();
    expect(chipLabels).toContain('Chapter 2');
  });
});

// ─── Restart dialog – cancel path ───────────────────────────────────────────

test.describe('restart dialog', () => {
  test('Cancel button closes the dialog without resetting the story', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    // Advance one step so we are not at the very start.
    await clickChoiceByPattern(page, /admit the com broke again/i);
    await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();

    // Open the restart dialog.
    await page.getByRole('button', { name: /restart chapter/i }).click();
    await expect(page.getByRole('dialog', { name: /restart from chapter 1/i })).toBeVisible();

    // Click Cancel — the dialog should close and the story should stay at Yve.
    await page.getByRole('button', { name: /^cancel$/i }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();
  });

  test('restart dialog has accessible ARIA labels', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    await page.getByRole('button', { name: /restart chapter/i }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    // MUI Dialog's aria-labelledby wires up to the title element.
    await expect(dialog.getByText(/restart from chapter 1/i)).toBeVisible();
    await expect(dialog.getByText(/saved progress is not deleted/i)).toBeVisible();
  });
});

// ─── Ambience volume panel ───────────────────────────────────────────────────

test.describe('ambience volume panel', () => {
  test('volume panel opens and exposes the volume slider', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('complementary', { name: /ambience controls/i })).toBeVisible();

    // Panel should be collapsed by default (no slider visible).
    await expect(page.getByRole('slider', { name: /ambience volume/i })).toHaveCount(0);

    // Click "Volume" to expand the panel.
    await page.getByRole('button', { name: /^volume$/i }).click();
    await expect(page.getByRole('slider', { name: /ambience volume/i })).toBeVisible();

    // Click "Close" to collapse.
    await page.getByRole('button', { name: /^close$/i }).click();
    await expect(page.getByRole('slider', { name: /ambience volume/i })).toHaveCount(0);
  });
});

// ─── Accessibility landmarks ─────────────────────────────────────────────────

test.describe('accessibility landmarks', () => {
  test('scene card is labelled by the scene title element', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    // The card has aria-labelledby="scene-title" and the h1 has id="scene-title".
    const card = page.locator('[aria-labelledby="scene-title"]');
    await expect(card).toBeVisible();
    await expect(card.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
  });

  test('choices region has aria-label "Choices"', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    const choicesRegion = page.locator('[aria-label="Choices"]');
    await expect(choicesRegion).toBeVisible();
    // Choices should be inside this region.
    await expect(choicesRegion.getByRole('button').first()).toBeVisible();
  });

  test('timeline signals section has correct ARIA heading', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    // The section heading "Timeline Signals".
    await expect(page.getByRole('heading', { name: /timeline signals/i })).toBeVisible();

    // The section is labelled by that heading.
    const signalsSection = page.locator('[aria-labelledby="timeline-signals-title"]');
    await expect(signalsSection).toBeVisible();
  });

  test('ambience aside has aria-label "Ambience controls"', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('complementary', { name: /ambience controls/i })).toBeVisible();
  });

  test('all three choice buttons are focusable via keyboard', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    const firstChoice = page.locator('[aria-label="Choices"] button').first();
    await firstChoice.focus();
    await expect(firstChoice).toBeFocused();
  });
});

// ─── Timeline signal levels ──────────────────────────────────────────────────

test.describe('timeline signal levels', () => {
  test('Truth signal rises from Quiet after choices that increase memoryFracture', async ({
    page,
  }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    // Initial state: all signals at "Quiet".
    const signalSection = page.locator('[aria-labelledby="timeline-signals-title"]');
    await expect(signalSection.getByText('Quiet').first()).toBeVisible();

    // "Ask why Diderram needed Cybol" has # cue:memory and adds memoryFracture +1.
    // Continuing with "Answer Zelda before the signal dies" adds memoryFracture +1 more.
    await clickChoiceByPattern(page, /admit the com broke again/i);
    await clickChoiceByPattern(page, /ask why diderram needed cybol/i);
    await clickChoiceByPattern(page, /answer zelda before the signal dies/i);

    // Truth signal should now be Rising (memoryFracture >= 1).
    // The SignalCard renders a <dd aria-label="{label} signal {level} ({value})"> element.
    await expect(page.getByLabel(/truth signal rising/i)).toBeVisible();
  });

  test('Disruption signal rises after choices that increase rebellion', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    // "Joke that Cybol technology clearly fears you" has # cue:rebellion and adds rebellion +1.
    await clickChoiceByPattern(page, /joke that cybol technology/i);

    // Disruption signal should now be Rising.
    // The SignalCard renders a <dd aria-label="{label} signal {level} ({value})"> element.
    await expect(page.getByLabel(/disruption signal rising/i)).toBeVisible();
  });
});

// ─── Family path Chapter 2 and 3 completion ─────────────────────────────────

test.describe('family path Chapter 2 and 3', () => {
  test('can complete Chapter 2 on the Family path', async ({ page }) => {
    await page.goto('/play');
    await completeChapter1FamilyPath(page);

    await expect(page.getByText('Chapter 1 complete.', { exact: true })).toBeVisible();
    await expect(page.getByText(/family path/i)).toBeVisible();

    await clickChoiceByPattern(page, /continue to chapter 2/i);
    await expect(page.getByText(/chapter 2: the firstborn record/i)).toBeVisible();

    await advanceByClickingFirstChoiceUntil(page, /end chapter 2/i);
    await clickChoiceByPattern(page, /end chapter 2/i);

    await expect(page.getByText('Chapter 2 complete.', { exact: true })).toBeVisible();
  });

  test('can continue from Chapter 2 Family path into Chapter 3', async ({ page }) => {
    await page.goto('/play');
    await completeChapter1FamilyPath(page);

    await clickChoiceByPattern(page, /continue to chapter 2/i);
    await expect(page.getByText(/chapter 2: the firstborn record/i)).toBeVisible();

    await advanceByClickingFirstChoiceUntil(page, /end chapter 2/i);
    await clickChoiceByPattern(page, /end chapter 2/i);

    await clickChoiceByPattern(page, /continue to chapter 3/i);
    await expect(page.getByText(/chapter 3: the witness ledger/i)).toBeVisible();
  });

  test('can complete Chapter 3 on the Family path', async ({ page }) => {
    await page.goto('/play');
    await completeChapter1FamilyPath(page);

    await clickChoiceByPattern(page, /continue to chapter 2/i);
    await advanceByClickingFirstChoiceUntil(page, /end chapter 2/i);
    await clickChoiceByPattern(page, /end chapter 2/i);

    await clickChoiceByPattern(page, /continue to chapter 3/i);
    await expect(page.getByText(/chapter 3: the witness ledger/i)).toBeVisible();

    await advanceByClickingFirstChoiceUntil(page, /end chapter 3/i);
    await clickChoiceByPattern(page, /end chapter 3/i);

    await expect(page.getByText('Chapter 3 complete.', { exact: true })).toBeVisible();
  });
});

// ─── History path Chapter 2 and 3 completion ────────────────────────────────

test.describe('history path Chapter 2 and 3', () => {
  test('can complete Chapter 2 on the History path', async ({ page }) => {
    await page.goto('/play');
    await completeChapter1HistoryPath(page);

    await expect(page.getByText('Chapter 1 complete.', { exact: true })).toBeVisible();
    await expect(page.getByText(/history path/i)).toBeVisible();

    await clickChoiceByPattern(page, /continue to chapter 2/i);
    await expect(page.getByText(/chapter 2: the second future/i)).toBeVisible();

    await advanceByClickingFirstChoiceUntil(page, /end chapter 2/i);
    await clickChoiceByPattern(page, /end chapter 2/i);

    await expect(page.getByText('Chapter 2 complete.', { exact: true })).toBeVisible();
  });

  test('can continue from Chapter 2 History path into Chapter 3', async ({ page }) => {
    await page.goto('/play');
    await completeChapter1HistoryPath(page);

    await clickChoiceByPattern(page, /continue to chapter 2/i);
    await expect(page.getByText(/chapter 2: the second future/i)).toBeVisible();

    await advanceByClickingFirstChoiceUntil(page, /end chapter 2/i);
    await clickChoiceByPattern(page, /end chapter 2/i);

    await clickChoiceByPattern(page, /continue to chapter 3/i);
    await expect(page.getByText(/chapter 3: the public memory trial/i)).toBeVisible();
  });

  test('can complete Chapter 3 on the History path', async ({ page }) => {
    await page.goto('/play');
    await completeChapter1HistoryPath(page);

    await clickChoiceByPattern(page, /continue to chapter 2/i);
    await advanceByClickingFirstChoiceUntil(page, /end chapter 2/i);
    await clickChoiceByPattern(page, /end chapter 2/i);

    await clickChoiceByPattern(page, /continue to chapter 3/i);
    await expect(page.getByText(/chapter 3: the public memory trial/i)).toBeVisible();

    await advanceByClickingFirstChoiceUntil(page, /end chapter 3/i);
    await clickChoiceByPattern(page, /end chapter 3/i);

    await expect(page.getByText('Chapter 3 complete.', { exact: true })).toBeVisible();
  });
});

// ─── 404 / unknown route ────────────────────────────────────────────────────

test.describe('unknown routes', () => {
  test('navigating to a non-existent route serves a response (no hard crash)', async ({ page }) => {
    const response = await page.goto('/does-not-exist-qa-test');
    // Next.js serves 404 pages — response should be 404, not a server crash (5xx).
    expect(response?.status()).toBeLessThan(500);
  });
});

// ─── Offline fallback page content ──────────────────────────────────────────

test.describe('offline fallback page', () => {
  test('offline.html has a link back to the main app', async ({ page }) => {
    await page.goto('/offline.html');
    await expect(page.getByText(/timeline is offline/i)).toBeVisible();

    // There should be a link back to the home or play page.
    const links = page.getByRole('link');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ─── Save / load chip state after restart ───────────────────────────────────

test.describe('save chip state after restart', () => {
  test('save persists across restart so load button re-enables', async ({ page }) => {
    await page.goto('/play');

    // Advance and save.
    await clickChoiceByPattern(page, /admit the com broke again/i);
    await page.getByRole('button', { name: /save progress/i }).click();
    await expect(page.getByText('Local save ready', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /load progress/i })).toBeEnabled();

    // Restart.
    await page.getByRole('button', { name: /restart chapter/i }).click();
    await page.getByRole('button', { name: /^restart$/i }).click();
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

    // After restart, the save still exists → load button should still be enabled.
    await expect(page.getByRole('button', { name: /load progress/i })).toBeEnabled();

    // The "Local save ready" chip should still be visible.
    await expect(page.getByText('Local save ready', { exact: true })).toBeVisible();
  });
});
