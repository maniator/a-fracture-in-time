import type { TimelineState } from '@fractureline/shared-types';

const CHAPTER_PACK_CACHE = 'fractureline-chapter-packs-v1';

export type ChapterPackId = 'chapter-1' | 'chapter-2-fracture' | 'chapter-2-rebellion' | 'chapter-2-control';

export type ChapterPackManifestItem = {
  id: ChapterPackId;
  chapter: number;
  route: string;
  dependsOnEnding?: string;
  estimatedMinutes: number;
  kind: 'ink' | 'json';
};

export const chapterOnePack: ChapterPackManifestItem = {
  id: 'chapter-1',
  chapter: 1,
  route: '/chapter-packs/chapter-1.ink',
  estimatedMinutes: 10,
  kind: 'ink',
};

export const chapterPackManifest: ChapterPackManifestItem[] = [
  chapterOnePack,
  {
    id: 'chapter-2-fracture',
    chapter: 2,
    route: '/chapter-packs/chapter-2-fracture.json',
    dependsOnEnding: 'fracture-path',
    estimatedMinutes: 18,
    kind: 'json',
  },
  {
    id: 'chapter-2-rebellion',
    chapter: 2,
    route: '/chapter-packs/chapter-2-rebellion.json',
    dependsOnEnding: 'rebellion-path',
    estimatedMinutes: 18,
    kind: 'json',
  },
  {
    id: 'chapter-2-control',
    chapter: 2,
    route: '/chapter-packs/chapter-2-control.json',
    dependsOnEnding: 'control-path',
    estimatedMinutes: 18,
    kind: 'json',
  },
];

function canUseCacheStorage() {
  return typeof window !== 'undefined' && 'caches' in window;
}

export function getEligibleNextChapterPack(state: TimelineState) {
  if (!state.endingKey) return null;
  return chapterPackManifest.find((pack) => pack.dependsOnEnding === state.endingKey) ?? null;
}

export async function isChapterPackCached(pack: ChapterPackManifestItem) {
  if (!canUseCacheStorage()) return false;
  const cache = await window.caches.open(CHAPTER_PACK_CACHE);
  return Boolean(await cache.match(pack.route));
}

async function fetchChapterPackResponse(pack: ChapterPackManifestItem) {
  if (canUseCacheStorage()) {
    const cache = await window.caches.open(CHAPTER_PACK_CACHE);
    const cached = await cache.match(pack.route);
    if (cached) return cached;
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return null;
  }

  const response = await fetch(pack.route, { cache: 'no-store' });
  if (!response.ok) return null;

  if (canUseCacheStorage()) {
    const cache = await window.caches.open(CHAPTER_PACK_CACHE);
    await cache.put(pack.route, response.clone());
  }

  return response;
}

export async function loadChapterPackText(pack: ChapterPackManifestItem) {
  const response = await fetchChapterPackResponse(pack);
  return response ? response.text() : null;
}

export async function cacheChapterPack(pack: ChapterPackManifestItem) {
  return Boolean(await fetchChapterPackResponse(pack));
}

export async function ensureEligibleNextChapterPack(state: TimelineState) {
  const pack = getEligibleNextChapterPack(state);
  if (!pack) {
    return { pack: null, cached: false, downloaded: false, needsInternet: false } as const;
  }

  if (await isChapterPackCached(pack)) {
    return { pack, cached: true, downloaded: false, needsInternet: false } as const;
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { pack, cached: false, downloaded: false, needsInternet: true } as const;
  }

  const downloaded = await cacheChapterPack(pack);
  return { pack, cached: downloaded, downloaded, needsInternet: !downloaded } as const;
}

export async function pruneChapterPackCache(keepPackIds: ChapterPackId[]) {
  if (!canUseCacheStorage()) return;

  const keepRoutes = new Set(
    chapterPackManifest.filter((pack) => keepPackIds.includes(pack.id)).map((pack) => pack.route),
  );

  const cache = await window.caches.open(CHAPTER_PACK_CACHE);
  const requests = await cache.keys();

  await Promise.all(
    requests.map((request) => {
      const url = new URL(request.url);
      return keepRoutes.has(url.pathname) ? Promise.resolve(false) : cache.delete(request);
    }),
  );
}
