import { expect, test } from '@playwright/test';

test('home page loads and links into the game', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /two choices/i })).toBeVisible();
  await page.getByRole('link', { name: /start chapter 1/i }).click();
  await expect(page.getByRole('heading', { name: /you are entering lattice/i })).toBeVisible();
  await expect(page.getByText(/mira vale/i)).toBeVisible();
  await expect(page.getByText(/soren quill/i)).toBeVisible();
});

test('play flow branches from Mira first choice to Soren route', async ({ page }) => {
  await page.goto('/play');
  await expect(page.getByRole('heading', { name: /you are entering lattice/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mira Vale' })).toBeVisible();

  await page.getByRole('button', { name: /look for what feels wrong/i }).click();

  await expect(page.getByRole('heading', { name: 'Soren Quill' })).toBeVisible();
  await expect(page.getByText(/mira was not fully asleep/i)).toBeVisible();
});

test('ambience control is available without a large play button', async ({ page }) => {
  await page.goto('/play');
  await expect(page.getByRole('complementary', { name: /ambience controls/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /mute|enable|unmute/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /^play$/i })).toHaveCount(0);
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

test('can complete the Fracture Path', async ({ page }) => {
  await page.goto('/play');

  const choices = [
    /look for what feels wrong/i,
    /use the bell tower/i,
    /hide the record/i,
    /remember the warning/i,
    /say the impossible word/i,
    /end chapter 1/i,
  ];

  for (const choice of choices) {
    await page.getByRole('button', { name: choice }).click();
  }

  await expect(page.getByText(/chapter 1 complete/i)).toBeVisible();
  await expect(page.getByText(/ending: the fracture path/i)).toBeVisible();
  await expect(page.getByText(/fracture-path/i)).toBeVisible();
});

test('can complete the Rebellion Path', async ({ page }) => {
  await page.goto('/play');

  const choices = [
    /look for what feels wrong/i,
    /follow the childlike voice/i,
    /break protocol and comfort/i,
    /send the child one protected memory/i,
    /stand between the child/i,
    /end chapter 1/i,
  ];

  for (const choice of choices) {
    await page.getByRole('button', { name: choice }).click();
  }

  await expect(page.getByText(/chapter 1 complete/i)).toBeVisible();
  await expect(page.getByText(/ending: the rebellion path/i)).toBeVisible();
  await expect(page.getByText(/rebellion-path/i)).toBeVisible();
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
