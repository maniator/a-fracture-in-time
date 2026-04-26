import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initialTimelineState } from '@fractureline/shared-types';
import {
  cacheChapterPack,
  chapterPackManifest,
  ensureEligibleNextChapterPack,
  getEligibleNextChapterPack,
  loadChapterPackText,
} from './chapter-pack-cache';

const makeResponse = (body: string, ok = true) =>
  ({
    ok,
    text: async () => body,
    clone() {
      return makeResponse(body, ok);
    },
  }) as Response;

describe('chapter pack cache', () => {
  const cacheStore = new Map<string, Response>();
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    cacheStore.clear();
    fetchMock.mockReset();

    const cacheApi = {
      match: vi.fn(async (route: string) => cacheStore.get(route)),
      put: vi.fn(async (route: string, response: Response) => {
        cacheStore.set(route, response);
      }),
      keys: vi.fn(async () => []),
      delete: vi.fn(async () => true),
    };

    Object.defineProperty(globalThis, 'window', {
      value: {
        caches: {
          open: vi.fn(async () => cacheApi),
        },
      },
      configurable: true,
    });

    Object.defineProperty(globalThis, 'navigator', {
      value: { onLine: true },
      configurable: true,
    });

    Object.defineProperty(globalThis, 'fetch', {
      value: fetchMock,
      configurable: true,
    });
  });

  it('returns eligible Chapter 2 pack from ending key', () => {
    const pack = getEligibleNextChapterPack({
      ...initialTimelineState,
      endingKey: 'signal-path',
    });

    expect(pack?.id).toBe('chapter-2-signal');
  });

  it('returns eligible Chapter 3 pack after finishing Chapter 2', () => {
    const pack = getEligibleNextChapterPack({
      ...initialTimelineState,
      chapter: 2,
      endingKey: 'signal-path',
    });

    expect(pack?.id).toBe('chapter-3-signal');
  });

  it('returns divergent Chapter 4 pack from Chapter 3 governance outcome', () => {
    const pack = getEligibleNextChapterPack({
      ...initialTimelineState,
      chapter: 3,
      endingKey: 'relay-compromised-path',
    });

    expect(pack?.id).toBe('chapter-4-relay-compromised');
  });

  it('downloads and caches a chapter pack response', async () => {
    const pack = chapterPackManifest.find((candidate) => candidate.id === 'chapter-2-family');
    expect(pack).toBeDefined();
    fetchMock.mockResolvedValue(makeResponse('family text'));

    expect(await cacheChapterPack(pack!)).toBe(true);
    expect(await loadChapterPackText(pack!)).toBe('family text');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('reports internet requirement when chapter is not cached and offline', async () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { onLine: false },
      configurable: true,
    });

    const status = await ensureEligibleNextChapterPack({
      ...initialTimelineState,
      endingKey: 'history-path',
    });

    expect(status.pack?.id).toBe('chapter-2-history');
    expect(status.cached).toBe(false);
    expect(status.needsInternet).toBe(true);
  });
});
