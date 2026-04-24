import { expect, test } from '@playwright/test';

test.describe('documentation screenshots', () => {
  test('captures home page', async ({ page }, testInfo) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /two choices/i })).toBeVisible();
    await page.screenshot({ path: `test-results/screenshots/${testInfo.project.name}-home.png`, fullPage: true });
  });

  test('captures play page', async ({ page }, testInfo) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Protector' })).toBeVisible();
    await page.screenshot({ path: `test-results/screenshots/${testInfo.project.name}-play.png`, fullPage: true });
  });

  test('captures help page', async ({ page }, testInfo) => {
    await page.goto('/help');
    await expect(page.getByRole('heading', { name: /playing fractureline/i })).toBeVisible();
    await page.screenshot({ path: `test-results/screenshots/${testInfo.project.name}-help.png`, fullPage: true });
  });
});
