import 'fake-indexeddb/auto';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { initialTimelineState } from '@fractureline/shared-types';
import { indexedDbSaveService } from './save-service';

const storage = new Map<string, string>();

const browserWindow = {
  localStorage: {
    getItem: vi.fn((key: string) => storage.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => storage.set(key, value)),
    removeItem: vi.fn((key: string) => storage.delete(key)),
  },
};

Object.defineProperty(globalThis, 'window', {
  value: browserWindow,
  configurable: true,
  writable: true,
});

function withoutBrowser<T>(fn: () => T): T {
  Object.defineProperty(globalThis, 'window', { value: undefined, configurable: true, writable: true });
  try {
    return fn();
  } finally {
    Object.defineProperty(globalThis, 'window', { value: browserWindow, configurable: true, writable: true });
  }
}

afterEach(async () => {
  await indexedDbSaveService.clear();
  storage.clear();
  vi.clearAllMocks();
});

describe('indexedDbSaveService', () => {
  it('writes and reads a versioned save payload from IndexedDB', async () => {
    const savedState = { ...initialTimelineState, currentSceneId: 'ch1_d_001', memoryFracture: 2 };

    await indexedDbSaveService.write(savedState);

    expect(await indexedDbSaveService.hasSave()).toBe(true);
    expect(await indexedDbSaveService.read()).toEqual(savedState);
  });

  it('returns false for hasSave when no save exists', async () => {
    expect(await indexedDbSaveService.hasSave()).toBe(false);
  });

  it('returns null for read when no save exists', async () => {
    expect(await indexedDbSaveService.read()).toBeNull();
  });

  it('migrates an existing legacy localStorage save into IndexedDB', async () => {
    const savedState = { ...initialTimelineState, currentSceneId: 'ch1_d_001', rebellion: 2 };
    window.localStorage.setItem('fractureline:save:v1', JSON.stringify({ version: 1, state: savedState }));

    expect(await indexedDbSaveService.read()).toEqual(savedState);
    expect(window.localStorage.getItem('fractureline:save:v1')).toBeNull();
  });

  it('ignores legacy localStorage save with wrong version number', async () => {
    const savedState = { ...initialTimelineState, currentSceneId: 'ch1_d_001' };
    window.localStorage.setItem('fractureline:save:v1', JSON.stringify({ version: 99, state: savedState }));

    expect(await indexedDbSaveService.read()).toBeNull();
  });

  it('ignores legacy localStorage save missing state field', async () => {
    window.localStorage.setItem('fractureline:save:v1', JSON.stringify({ version: 1 }));

    expect(await indexedDbSaveService.read()).toBeNull();
  });

  it('ignores malformed legacy localStorage save data', async () => {
    window.localStorage.setItem('fractureline:save:v1', '{not-json');

    expect(await indexedDbSaveService.read()).toBeNull();
  });

  it('overwrites an existing save on subsequent writes', async () => {
    await indexedDbSaveService.write({ ...initialTimelineState, rebellion: 1 });
    await indexedDbSaveService.write({ ...initialTimelineState, rebellion: 5 });

    const saved = await indexedDbSaveService.read();
    expect(saved?.rebellion).toBe(5);
    expect(await indexedDbSaveService.hasSave()).toBe(true);
  });

  it('clears saved state from IndexedDB and legacy localStorage', async () => {
    await indexedDbSaveService.write(initialTimelineState);
    window.localStorage.setItem('fractureline:save:v1', JSON.stringify({ version: 1, state: initialTimelineState }));

    await indexedDbSaveService.clear();

    expect(await indexedDbSaveService.hasSave()).toBe(false);
    expect(window.localStorage.getItem('fractureline:save:v1')).toBeNull();
  });

  it('hasSave returns false in a non-browser (SSR) environment', async () => {
    expect(await withoutBrowser(() => indexedDbSaveService.hasSave())).toBe(false);
  });

  it('read returns null in a non-browser (SSR) environment', async () => {
    expect(await withoutBrowser(() => indexedDbSaveService.read())).toBeNull();
  });

  it('write is a no-op in a non-browser (SSR) environment', async () => {
    await withoutBrowser(() => indexedDbSaveService.write(initialTimelineState));
    expect(await indexedDbSaveService.hasSave()).toBe(false);
  });

  it('clear is a no-op in a non-browser (SSR) environment', async () => {
    await indexedDbSaveService.write(initialTimelineState);
    await withoutBrowser(() => indexedDbSaveService.clear());
    expect(await indexedDbSaveService.hasSave()).toBe(true);
  });
});
