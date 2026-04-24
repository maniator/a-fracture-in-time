import { expect, test } from '@playwright/test';

test('home page loads and links into the game', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /two choices/i })).toBeVisible();
  await page.getByRole('link', { name: /start chapter 1/i }).click();
  await expect(page.getByRole('heading', { name: 'Protector' })).toBeVisible();
});

test('play flow advances from Protector to Dissenter', async ({ page }) => {
  await page.goto('/play');
  await expect(page.getByRole('heading', { name: 'Protector' })).toBeVisible();
  await page.getByRole('button', { name: /study the crowd/i }).click();
  await expect(page.getByRole('heading', { name: 'Dissenter' })).toBeVisible();
});

test('save and load restores progress', async ({ page }) => {
  await page.goto('/play');
  await page.getByRole('button', { name: /study the crowd/i }).click();
  await expect(page.getByRole('heading', { name: 'Dissenter' })).toBeVisible();

  await page.getByRole('button', { name: /save progress/i }).click();
  await page.getByRole('button', { name: /restart chapter/i }).click();
  await expect(page.getByRole('heading', { name: 'Protector' })).toBeVisible();

  await page.getByRole('button', { name: /load progress/i }).click();
  await expect(page.getByRole('heading', { name: 'Dissenter' })).toBeVisible();
});

test('can complete Chapter 1 through a deterministic path', async ({ page }) => {
  await page.goto('/play');

  const choices = [
    /study the crowd/i,
    /mark the bell tower/i,
    /pocket the record/i,
    /memorize the warning/i,
    /kneel and comfort/i,
    /reach through/i,
    /whisper the word/i,
    /end chapter 1/i,
  ];

  for (const choice of choices) {
    await page.getByRole('button', { name: choice }).click();
  }

  await expect(page.getByText(/chapter 1 complete/i)).toBeVisible();
  await expect(page.getByText(/the fractureline is where incompatible histories touch/i)).toBeVisible();
});

test('help page documents the PWA and testing strategy', async ({ page }) => {
  await page.goto('/help');
  await expect(page.getByRole('heading', { name: /playing fractureline/i })).toBeVisible();
  await expect(page.getByText(/offline play/i)).toBeVisible();
  await expect(page.getByText(/playwright e2e tests/i)).toBeVisible();
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
