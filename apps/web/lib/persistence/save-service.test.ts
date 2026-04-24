import 'fake-indexeddb/auto';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { initialTimelineState } from '@fractureline/shared-types';
import { indexedDbSaveService } from './save-service';

const storage = new Map<string, string>();

Object.defineProperty(globalThis, 'window', {
  value: {
    localStorage: {
      getItem: vi.fn((key: string) => storage.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => storage.set(key, value)),
      removeItem: vi.fn((key: string) => storage.delete(key)),
    },
  },
  configurable: true,
});

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

  it('migrates an existing legacy localStorage save into IndexedDB', async () => {
    const savedState = { ...initialTimelineState, currentSceneId: 'ch1_d_001', rebellion: 2 };
    window.localStorage.setItem('fractureline:save:v1', JSON.stringify({ version: 1, state: savedState }));

    expect(await indexedDbSaveService.read()).toEqual(savedState);
    expect(window.localStorage.getItem('fractureline:save:v1')).toBeNull();
  });

  it('ignores malformed legacy localStorage save data', async () => {
    window.localStorage.setItem('fractureline:save:v1', '{not-json');

    expect(await indexedDbSaveService.read()).toBeNull();
  });

  it('clears saved state from IndexedDB and legacy localStorage', async () => {
    await indexedDbSaveService.write(initialTimelineState);
    window.localStorage.setItem('fractureline:save:v1', JSON.stringify({ version: 1, state: initialTimelineState }));

    await indexedDbSaveService.clear();

    expect(await indexedDbSaveService.hasSave()).toBe(false);
    expect(window.localStorage.getItem('fractureline:save:v1')).toBeNull();
  });
});
