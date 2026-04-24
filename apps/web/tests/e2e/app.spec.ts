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

test('help page documents the PWA and testing strategy', async ({ page }) => {
  await page.goto('/help');
  await expect(page.getByRole('heading', { name: /playing fractureline/i })).toBeVisible();
  await expect(page.getByText(/offline play/i)).toBeVisible();
  await expect(page.getByText(/playwright e2e tests/i)).toBeVisible();
});

test('PWA assets are available', async ({ page }) => {
  const manifestResponse = await page.goto('/manifest.webmanifest');
  expect(manifestResponse?.ok()).toBeTruthy();
  const manifest = await page.locator('body').textContent();
  expect(manifest).toContain('Fractureline');

  const serviceWorkerResponse = await page.goto('/sw.js');
  expect(serviceWorkerResponse?.ok()).toBeTruthy();
});
