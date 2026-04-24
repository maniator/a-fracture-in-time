import { afterEach, describe, expect, it, vi } from 'vitest';
import { initialTimelineState } from '@fractureline/shared-types';
import { browserSaveService } from './save-service';

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

afterEach(() => {
  storage.clear();
  vi.clearAllMocks();
});

describe('browserSaveService', () => {
  it('writes and reads a versioned save payload', () => {
    const savedState = { ...initialTimelineState, currentSceneId: 'ch1_d_001', memoryFracture: 2 };

    browserSaveService.write(savedState);

    expect(browserSaveService.hasSave()).toBe(true);
    expect(browserSaveService.read()).toEqual(savedState);
  });

  it('returns null for malformed save data', () => {
    window.localStorage.setItem('fractureline:save:v1', '{not-json');

    expect(browserSaveService.read()).toBeNull();
  });

  it('clears saved state', () => {
    browserSaveService.write(initialTimelineState);
    browserSaveService.clear();

    expect(browserSaveService.hasSave()).toBe(false);
  });
});
