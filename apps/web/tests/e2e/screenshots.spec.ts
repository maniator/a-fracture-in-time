import { expect, test, type Page } from '@playwright/test';

test.describe('documentation screenshots', () => {
  async function runSignalPathToChapterThree(page: Page) {
    for (const choice of [
      /admit the com broke again/i,
      /study the official history/i,
      /answer the impossible voice/i,
      /start carefully and ask/i,
      /ask zelda what the family line means/i,
      /tell ari the truth/i,
      /end chapter 1/i,
    ]) {
      await page.getByRole('button', { name: choice }).click();
    }

    await page.getByRole('button', { name: /continue to chapter 2/i }).click();

    for (let attempts = 0; attempts < 24; attempts += 1) {
      const chapterTwoEnd = page.getByRole('button', { name: /end chapter 2/i });
      if (await chapterTwoEnd.count()) {
        await chapterTwoEnd.click();
        break;
      }
      await page.getByRole('button').nth(3).click();
    }

    await page.getByRole('button', { name: /continue to chapter 3/i }).click();
  }

  test('captures home page', async ({ page }, testInfo) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /a utopia in the past/i })).toBeVisible();
    await page.screenshot({ path: `test-results/screenshots/${testInfo.project.name}-home.png`, fullPage: true });
  });

  test('captures play page', async ({ page }, testInfo) => {
    await page.goto('/play');
    await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
    await page.screenshot({ path: `test-results/screenshots/${testInfo.project.name}-play.png`, fullPage: true });
  });

  test('captures help page', async ({ page }, testInfo) => {
    await page.goto('/help');
    await expect(page.getByRole('heading', { name: /how to play fractureline/i })).toBeVisible();
    await page.screenshot({ path: `test-results/screenshots/${testInfo.project.name}-help.png`, fullPage: true });
  });

  test('captures chapter 3 play page', async ({ page }, testInfo) => {
    await page.goto('/play');
    await runSignalPathToChapterThree(page);
    await expect(page.getByText(/chapter 3: the relay accord/i)).toBeVisible();
    await page.screenshot({ path: `test-results/screenshots/${testInfo.project.name}-chapter-3.png`, fullPage: true });
  });
});
