import { expect, test } from '@playwright/test';

test.describe('documentation screenshots', () => {
  test('captures home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /two choices/i })).toBeVisible();
    await page.screenshot({ path: 'test-results/screenshots/home.png', fullPage: true });
  });

  test('captures play page', async ({ page }) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Protector' })).toBeVisible();
    await page.screenshot({ path: 'test-results/screenshots/play.png', fullPage: true });
  });

  test('captures help page', async ({ page }) => {
    await page.goto('/help');
    await expect(page.getByRole('heading', { name: /playing fractureline/i })).toBeVisible();
    await page.screenshot({ path: 'test-results/screenshots/help.png', fullPage: true });
  });
});
