import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initialTimelineState } from '@fractureline/shared-types';
import {
  cacheChapterPack,
  chapterOnePack,
  chapterPackManifest,
  ensureEligibleNextChapterPack,
  getChapterPackForState,
  getEligibleNextChapterPack,
  isChapterPackCached,
  loadChapterPackText,
  pruneChapterPackCache,
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
  let cacheApi: {
    match: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    keys: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    cacheStore.clear();
    fetchMock.mockReset();

    cacheApi = {
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

  it('returns null when no endingKey is set', () => {
    expect(getEligibleNextChapterPack({ ...initialTimelineState, endingKey: undefined })).toBeNull();
  });

  it('returns null when endingKey does not match any pack', () => {
    expect(getEligibleNextChapterPack({ ...initialTimelineState, chapter: 1, endingKey: 'nonexistent-path' })).toBeNull();
  });

  it('returns current chapter pack for save restore without jumping ahead', () => {
    const pack = getChapterPackForState({
      ...initialTimelineState,
      chapter: 2,
      endingKey: 'signal-path',
    });

    expect(pack?.id).toBe('chapter-2-signal');
  });

  it('returns chapter 1 pack when chapter is 1 and no endingKey', () => {
    const pack = getChapterPackForState({ ...initialTimelineState, chapter: 1 });
    expect(pack?.id).toBe('chapter-1');
  });

  it('returns chapter 1 pack when endingKey is set but pack has no dependency requirement', () => {
    const pack = getChapterPackForState({ ...initialTimelineState, chapter: 1, endingKey: 'signal-path' });
    expect(pack?.id).toBe('chapter-1');
  });

  it('returns null when no packs exist for the given chapter', () => {
    const pack = getChapterPackForState({ ...initialTimelineState, chapter: 99 });
    expect(pack).toBeNull();
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

  it('returns null text when fetch response is not ok', async () => {
    fetchMock.mockResolvedValue(makeResponse('', false));
    const text = await loadChapterPackText(chapterOnePack);
    expect(text).toBeNull();
  });

  it('returns false from cacheChapterPack when fetch response is not ok', async () => {
    fetchMock.mockResolvedValue(makeResponse('', false));
    expect(await cacheChapterPack(chapterOnePack)).toBe(false);
  });

  it('loadChapterPackText returns null when offline and pack is not in cache', async () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { onLine: false },
      configurable: true,
    });

    const text = await loadChapterPackText(chapterOnePack);
    expect(text).toBeNull();
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

  it('reports pack:null when state has no eligible next chapter', async () => {
    const status = await ensureEligibleNextChapterPack({ ...initialTimelineState });
    expect(status.pack).toBeNull();
    expect(status.cached).toBe(false);
    expect(status.needsInternet).toBe(false);
  });

  it('reports cached:true when eligible next pack is already in cache', async () => {
    const pack = chapterPackManifest.find((candidate) => candidate.id === 'chapter-2-signal');
    expect(pack).toBeDefined();
    cacheStore.set(pack!.route, makeResponse('cached signal text'));

    const status = await ensureEligibleNextChapterPack({
      ...initialTimelineState,
      endingKey: 'signal-path',
    });

    expect(status.pack?.id).toBe('chapter-2-signal');
    expect(status.cached).toBe(true);
    expect(status.downloaded).toBe(false);
  });

  it('reports downloaded:true when it fetches and caches the eligible next pack', async () => {
    fetchMock.mockResolvedValue(makeResponse('signal text'));

    const status = await ensureEligibleNextChapterPack({
      ...initialTimelineState,
      endingKey: 'signal-path',
    });

    expect(status.pack?.id).toBe('chapter-2-signal');
    expect(status.cached).toBe(true);
    expect(status.downloaded).toBe(true);
    expect(status.needsInternet).toBe(false);
  });

  it('isChapterPackCached returns false when pack is not in cache', async () => {
    expect(await isChapterPackCached(chapterOnePack)).toBe(false);
  });

  it('isChapterPackCached returns true when pack is in cache', async () => {
    cacheStore.set(chapterOnePack.route, makeResponse('chapter one'));
    expect(await isChapterPackCached(chapterOnePack)).toBe(true);
  });

  it('pruneChapterPackCache deletes routes not in the keep list', async () => {
    const routeToKeep = '/chapter-packs/chapter-1.ink';
    const routeToDelete = '/chapter-packs/chapter-2-signal.ink';

    cacheApi.keys.mockResolvedValue([
      { url: `https://example.com${routeToKeep}` },
      { url: `https://example.com${routeToDelete}` },
    ]);

    await pruneChapterPackCache(['chapter-1']);

    expect(cacheApi.delete).toHaveBeenCalledTimes(1);
    const deletedRequest = cacheApi.delete.mock.calls[0][0];
    expect(deletedRequest.url).toContain(routeToDelete);
  });

  it('pruneChapterPackCache keeps routes that are in the keep list', async () => {
    const routeToKeep = '/chapter-packs/chapter-1.ink';
    cacheApi.keys.mockResolvedValue([{ url: `https://example.com${routeToKeep}` }]);

    await pruneChapterPackCache(['chapter-1']);

    expect(cacheApi.delete).not.toHaveBeenCalled();
  });

  it('isChapterPackCached returns false when cache storage is unavailable', async () => {
    Object.defineProperty(globalThis, 'window', { value: undefined, configurable: true });
    expect(await isChapterPackCached(chapterOnePack)).toBe(false);
  });

  it('pruneChapterPackCache is a no-op when cache storage is unavailable', async () => {
    Object.defineProperty(globalThis, 'window', { value: undefined, configurable: true });
    await pruneChapterPackCache(['chapter-1']);
    expect(cacheApi.delete).not.toHaveBeenCalled();
  });

  it('loadChapterPackText fetches without a cache write when cache storage is unavailable', async () => {
    Object.defineProperty(globalThis, 'window', { value: undefined, configurable: true });
    fetchMock.mockResolvedValue(makeResponse('text without cache'));

    const text = await loadChapterPackText(chapterOnePack);
    expect(text).toBe('text without cache');
    expect(cacheApi.put).not.toHaveBeenCalled();
  });

  it('loadChapterPackText fetches without navigator guard when navigator is undefined', async () => {
    Object.defineProperty(globalThis, 'window', { value: undefined, configurable: true });
    Object.defineProperty(globalThis, 'navigator', { value: undefined, configurable: true });
    fetchMock.mockResolvedValue(makeResponse('text without navigator'));

    const text = await loadChapterPackText(chapterOnePack);
    expect(text).toBe('text without navigator');
  });
});
