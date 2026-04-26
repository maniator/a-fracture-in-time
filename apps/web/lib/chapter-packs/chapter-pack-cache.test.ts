import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initialTimelineState } from '@fractureline/shared-types';
import {
  cacheChapterPack,
  chapterPackManifest,
  ensureEligibleNextChapterPack,
  getChapterPackForState,
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

  it('returns current chapter pack for save restore without jumping ahead', () => {
    const pack = getChapterPackForState({
      ...initialTimelineState,
      chapter: 2,
      endingKey: 'signal-path',
    });

    expect(pack?.id).toBe('chapter-2-signal');
  });

  it('returns divergent Chapter 4 pack from Chapter 3 governance outcome', () => {
    const pack = getEligibleNextChapterPack({
      ...initialTimelineState,
      chapter: 3,
      endingKey: 'relay-compromised-path',
    });

    expect(pack?.id).toBe('chapter-4-relay-compromised');
  });

  it('merges Chapter 4 governance outcomes into shared Chapter 5 pack', () => {
    const legitimacyPack = getEligibleNextChapterPack({
      ...initialTimelineState,
      chapter: 4,
      endingKey: 'relay-legitimacy-path',
    });
    const compromisedPack = getEligibleNextChapterPack({
      ...initialTimelineState,
      chapter: 4,
      endingKey: 'relay-compromised-path',
    });

    expect(legitimacyPack?.id).toBe('chapter-5-governance-reckoning');
    expect(compromisedPack?.id).toBe('chapter-5-governance-reckoning');
  });

  it('returns saved Chapter 4 pack for restore lookup', () => {
    const pack = getChapterPackForState({
      ...initialTimelineState,
      chapter: 4,
      endingKey: 'relay-compromised-path',
    });

    expect(pack?.id).toBe('chapter-4-relay-compromised');
  });

  it('prefers saved chapterPackId when endingKey has advanced beyond chapter prerequisite', () => {
    const pack = getChapterPackForState({
      ...initialTimelineState,
      chapter: 4,
      chapterPackId: 'chapter-4-relay-compromised',
      endingKey: 'governance-reckoning-path',
    });

    expect(pack?.id).toBe('chapter-4-relay-compromised');
  });

  it('keeps restore on current chapter when endingKey no longer matches chapter prerequisites', () => {
    const pack = getChapterPackForState({
      ...initialTimelineState,
      chapter: 4,
      endingKey: 'governance-reckoning-path',
    });

    expect(pack?.chapter).toBe(4);
  });

  it('resolves chapter pack from chapter-local route ending when prerequisite ending has already advanced', () => {
    const pack = getChapterPackForState({
      ...initialTimelineState,
      chapter: 5,
      endingKey: 'lineage-protocol-path',
    });

    expect(pack?.id).toBe('chapter-5-lineage-protocol');
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
