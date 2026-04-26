import { expect, test } from '@playwright/test';

test('home page loads setup and links into the game without prefetching play', async ({ page }) => {
  const chapterPackRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/chapter-packs/')) {
      chapterPackRequests.push(request.url());
    }
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: /a utopia in the past/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /you are entering ayker/i })).toBeVisible();
  await expect(page.getByText(/xav reivax/i)).toBeVisible();
  await expect(page.getByText(/yve ettevy/i)).toBeVisible();
  await expect(page.getByText(/zelda adlez/i)).toBeVisible();
  expect(chapterPackRequests).toHaveLength(0);

  await page.getByRole('link', { name: /start chapter 1/i }).click();
  await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /you are entering ayker/i })).toHaveCount(0);
});

test('play route downloads Chapter 1 pack and first choice advances without runtime errors', async ({ page }) => {
  const chapterPackResponses: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/chapter-packs/chapter-1.ink')) {
      chapterPackResponses.push(response.url());
    }
  });

  await page.goto('/play');
  await expect(page.getByText(/loading chapter 1/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
  expect(chapterPackResponses.some((url) => url.includes('/chapter-packs/chapter-1.ink'))).toBeTruthy();

  await page.getByRole('button', { name: /admit the com broke again/i }).click();

  await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();
  await expect(page.getByText(/we have a cybol history exam/i)).toBeVisible();
  await expect(page.getByText(/choice could not be applied/i)).toHaveCount(0);
  await expect(page.getByText(/choice out of range/i)).toHaveCount(0);
});

test('play flow branches from Xav to Yve and then Zelda', async ({ page }) => {
  await page.goto('/play');
  await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

  await page.getByRole('button', { name: /admit the com broke again/i }).click();
  await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();

  await page.getByRole('button', { name: /ask why diderram needed cybol/i }).click();
  await page.getByRole('button', { name: /answer zelda before the signal dies/i }).click();

  await expect(page.getByRole('heading', { name: 'Zelda Adlez' })).toBeVisible();
  await expect(page.getByText(/ruins of old brinkton/i)).toBeVisible();
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

  await page.getByRole('button', { name: /admit the com broke again/i }).click();
  await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();

  await page.getByRole('button', { name: /save progress/i }).click();
  await expect(page.getByRole('button', { name: /load progress/i })).toBeEnabled();

  await page.getByRole('button', { name: /restart chapter/i }).click();
  await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();

  await page.getByRole('button', { name: /load progress/i }).click();
  await expect(page.getByRole('heading', { name: 'Yve Ettevy' })).toBeVisible();
});

test('can complete the Signal Path', async ({ page }) => {
  await page.goto('/play');

  const choices = [
    /admit the com broke again/i,
    /study the official history/i,
    /answer the impossible voice/i,
    /start carefully and ask/i,
    /ask zelda what the family line means/i,
    /tell ari the truth/i,
    /end chapter 1/i,
  ];

  for (const choice of choices) {
    await page.getByRole('button', { name: choice }).click();
  }

  await expect(page.getByText(/chapter 1 complete/i)).toBeVisible();
  await expect(page.getByText(/ending: the signal path/i)).toBeVisible();
  await expect(page.getByText(/signal-path/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /continue to chapter 2/i })).toBeVisible();
  await expect(page.getByText(/chapter 2: the stable signal/i)).toBeVisible();
});

test('can continue from Chapter 1 into Chapter 2 Signal route', async ({ page }) => {
  await page.goto('/play');

  const choices = [
    /admit the com broke again/i,
    /study the official history/i,
    /answer the impossible voice/i,
    /start carefully and ask/i,
    /ask zelda what the family line means/i,
    /tell ari the truth/i,
    /end chapter 1/i,
  ];

  for (const choice of choices) {
    await page.getByRole('button', { name: choice }).click();
  }

  await page.getByRole('button', { name: /continue to chapter 2/i }).click();
  await expect(page.getByRole('heading', { name: 'Xav Reivax' })).toBeVisible();
  await expect(page.getByText(/chapter 2: the stable signal/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /let yve create a careful contact protocol/i })).toBeVisible();
});

test('can complete the Family Path', async ({ page }) => {
  await page.goto('/play');

  const choices = [
    /joke that cybol technology/i,
    /tell yve exactly what appeared/i,
    /answer zelda before the signal dies/i,
    /tell xav the truth/i,
    /ask what event starts the fall/i,
    /open the notebook before ari/i,
    /end chapter 1/i,
  ];

  for (const choice of choices) {
    await page.getByRole('button', { name: choice }).click();
  }

  await expect(page.getByText(/chapter 1 complete/i)).toBeVisible();
  await expect(page.getByText(/ending: the family path/i)).toBeVisible();
  await expect(page.getByText(/family-path/i)).toBeVisible();
});

test('can complete the History Path', async ({ page }) => {
  await page.goto('/play');

  const choices = [
    /admit the com broke again/i,
    /ask why diderram needed cybol/i,
    /answer zelda before the signal dies/i,
    /tell xav the truth/i,
    /ask what event starts the fall/i,
    /let ari help/i,
    /end chapter 1/i,
  ];

  for (const choice of choices) {
    await page.getByRole('button', { name: choice }).click();
  }

  await expect(page.getByText(/chapter 1 complete/i)).toBeVisible();
  await expect(page.getByText(/ending: the history path/i)).toBeVisible();
  await expect(page.getByText(/history-path/i)).toBeVisible();
});

test('help page explains gameplay instead of build process', async ({ page }) => {
  await page.goto('/help');
  await expect(page.getByRole('heading', { name: /how to play fractureline/i })).toBeVisible();
  await expect(page.getByText(/xav reivax/i)).toBeVisible();
  await expect(page.getByText(/zelda adlez/i)).toBeVisible();
  await expect(page.getByText(/stability/i)).toBeVisible();
  await expect(page.getByText(/local saves/i)).toBeVisible();
  await expect(page.getByText(/playwright/i)).toHaveCount(0);
});

test('static PWA assets and chapter packs are available in dev', async ({ page }) => {
  const manifestResponse = await page.goto('/manifest.webmanifest');
  expect(manifestResponse?.ok()).toBeTruthy();
  const manifest = await page.locator('body').textContent();
  expect(manifest).toContain('Fractureline');

  const chapterPackResponse = await page.goto('/chapter-packs/chapter-1.ink');
  expect(chapterPackResponse?.ok()).toBeTruthy();
  const chapterPack = await page.locator('body').textContent();
  expect(chapterPack).toContain('VAR stability');
  expect(chapterPack).toContain('Xav Reivax');
  expect(chapterPack).toContain('Zelda Adlez');
  expect(chapterPack).not.toContain('Mira Vale');
  expect(chapterPack).not.toContain('Soren Quill');

  for (const pack of ['chapter-2-signal.ink', 'chapter-2-family.ink', 'chapter-2-history.ink']) {
    const response = await page.goto(`/chapter-packs/${pack}`);
    expect(response?.ok()).toBeTruthy();
    const body = await page.locator('body').textContent();
    expect(body).toContain('Chapter 2');
    expect(body).not.toContain('Mira Vale');
    expect(body).not.toContain('Soren Quill');
  }

  const offlineResponse = await page.goto('/offline.html');
  expect(offlineResponse?.ok()).toBeTruthy();
  await expect(page.getByText(/timeline is offline/i)).toBeVisible();
});
