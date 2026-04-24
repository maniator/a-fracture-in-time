import { expect, test } from '@playwright/test';

test('home page loads and links into the game', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /two choices/i })).toBeVisible();
  await page.getByRole('link', { name: /start chapter 1/i }).click();
  await expect(page.getByRole('heading', { name: /you are entering lattice/i })).toBeVisible();
  await expect(page.getByText(/mira vale/i)).toBeVisible();
  await expect(page.getByText(/soren quill/i)).toBeVisible();
});

test('play flow advances from Mira to Soren', async ({ page }) => {
  await page.goto('/play');
  await expect(page.getByRole('heading', { name: /you are entering lattice/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mira Vale' })).toBeVisible();
  await page.getByRole('button', { name: /look for what feels wrong/i }).click();
  await expect(page.getByRole('heading', { name: 'Soren Quill' })).toBeVisible();
});

test('ambience control is available and user initiated', async ({ page }) => {
  await page.goto('/play');
  await expect(page.getByRole('complementary', { name: /ambience controls/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /play/i })).toBeVisible();
});

test('save and load restores progress from IndexedDB', async ({ page }) => {
  await page.goto('/play');
  await expect(page.getByText(/local save ready/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /load progress/i })).toBeDisabled();

  await page.getByRole('button', { name: /look for what feels wrong/i }).click();
  await expect(page.getByRole('heading', { name: 'Soren Quill' })).toBeVisible();

  await page.getByRole('button', { name: /save progress/i }).click();
  await expect(page.getByRole('button', { name: /load progress/i })).toBeEnabled();

  await page.getByRole('button', { name: /restart chapter/i }).click();
  await expect(page.getByRole('heading', { name: 'Mira Vale' })).toBeVisible();

  await page.getByRole('button', { name: /load progress/i }).click();
  await expect(page.getByRole('heading', { name: 'Soren Quill' })).toBeVisible();
});

test('can complete Chapter 1 through a deterministic path', async ({ page }) => {
  await page.goto('/play');

  const choices = [
    /look for what feels wrong/i,
    /use the bell tower/i,
    /hide the record/i,
    /remember the warning/i,
    /break protocol and comfort/i,
    /reach through the break/i,
    /say the impossible word/i,
    /end chapter 1/i,
  ];

  for (const choice of choices) {
    await page.getByRole('button', { name: choice }).click();
  }

  await expect(page.getByText(/chapter 1 complete/i)).toBeVisible();
  await expect(page.getByText(/the fractureline is where incompatible histories touch/i)).toBeVisible();
});

test('help page explains gameplay instead of build process', async ({ page }) => {
  await page.goto('/help');
  await expect(page.getByRole('heading', { name: /how to play fractureline/i })).toBeVisible();
  await expect(page.getByText(/mira vale/i)).toBeVisible();
  await expect(page.getByText(/soren quill/i)).toBeVisible();
  await expect(page.getByText(/stability/i)).toBeVisible();
  await expect(page.getByText(/local saves/i)).toBeVisible();
  await expect(page.getByText(/playwright/i)).toHaveCount(0);
});

test('static PWA assets are available in dev', async ({ page }) => {
  const manifestResponse = await page.goto('/manifest.webmanifest');
  expect(manifestResponse?.ok()).toBeTruthy();
  const manifest = await page.locator('body').textContent();
  expect(manifest).toContain('Fractureline');

  const offlineResponse = await page.goto('/offline.html');
  expect(offlineResponse?.ok()).toBeTruthy();
  await expect(page.getByText(/timeline is offline/i)).toBeVisible();
});
