import type { TimelineState } from '@fractureline/shared-types';

const CHAPTER_PACK_CACHE = 'fractureline-chapter-packs-v2';

export type ChapterPackId =
  | 'chapter-1'
  | 'chapter-2-signal'
  | 'chapter-2-family'
  | 'chapter-2-history'
  | 'chapter-3-signal'
  | 'chapter-3-family'
  | 'chapter-3-history'
  | 'chapter-4-relay-legitimacy'
  | 'chapter-4-relay-compromised'
  | 'chapter-4-ledger-trust'
  | 'chapter-4-emergency-custody'
  | 'chapter-4-trial-credibility'
  | 'chapter-4-amnesty-conflict'
  | 'chapter-5-governance-reckoning'
  | 'chapter-5-lineage-protocol'
  | 'chapter-5-memory-settlement';

export type ChapterPackManifestItem = {
  id: ChapterPackId;
  chapter: number;
  route: string;
  dependsOnEnding?: string | string[];
  estimatedMinutes: number;
};

export const chapterOnePack: ChapterPackManifestItem = {
  id: 'chapter-1',
  chapter: 1,
  route: '/chapter-packs/chapter-1.ink',
  estimatedMinutes: 10,
};

export const chapterPackManifest: ChapterPackManifestItem[] = [
  chapterOnePack,
  {
    id: 'chapter-2-signal',
    chapter: 2,
    route: '/chapter-packs/chapter-2-signal.ink',
    dependsOnEnding: 'signal-path',
    estimatedMinutes: 22,
  },
  {
    id: 'chapter-2-family',
    chapter: 2,
    route: '/chapter-packs/chapter-2-family.ink',
    dependsOnEnding: 'family-path',
    estimatedMinutes: 22,
  },
  {
    id: 'chapter-2-history',
    chapter: 2,
    route: '/chapter-packs/chapter-2-history.ink',
    dependsOnEnding: 'history-path',
    estimatedMinutes: 22,
  },
  {
    id: 'chapter-3-signal',
    chapter: 3,
    route: '/chapter-packs/chapter-3-signal.ink',
    dependsOnEnding: 'signal-path',
    estimatedMinutes: 26,
  },
  {
    id: 'chapter-3-family',
    chapter: 3,
    route: '/chapter-packs/chapter-3-family.ink',
    dependsOnEnding: 'family-path',
    estimatedMinutes: 26,
  },
  {
    id: 'chapter-3-history',
    chapter: 3,
    route: '/chapter-packs/chapter-3-history.ink',
    dependsOnEnding: 'history-path',
    estimatedMinutes: 26,
  },
  {
    id: 'chapter-4-relay-legitimacy',
    chapter: 4,
    route: '/chapter-packs/chapter-4-relay-legitimacy.ink',
    dependsOnEnding: 'relay-legitimacy-path',
    estimatedMinutes: 24,
  },
  {
    id: 'chapter-4-relay-compromised',
    chapter: 4,
    route: '/chapter-packs/chapter-4-relay-compromised.ink',
    dependsOnEnding: 'relay-compromised-path',
    estimatedMinutes: 24,
  },
  {
    id: 'chapter-4-ledger-trust',
    chapter: 4,
    route: '/chapter-packs/chapter-4-ledger-trust.ink',
    dependsOnEnding: 'ledger-trust-path',
    estimatedMinutes: 24,
  },
  {
    id: 'chapter-4-emergency-custody',
    chapter: 4,
    route: '/chapter-packs/chapter-4-emergency-custody.ink',
    dependsOnEnding: 'emergency-custody-path',
    estimatedMinutes: 24,
  },
  {
    id: 'chapter-4-trial-credibility',
    chapter: 4,
    route: '/chapter-packs/chapter-4-trial-credibility.ink',
    dependsOnEnding: 'trial-credibility-path',
    estimatedMinutes: 24,
  },
  {
    id: 'chapter-4-amnesty-conflict',
    chapter: 4,
    route: '/chapter-packs/chapter-4-amnesty-conflict.ink',
    dependsOnEnding: 'amnesty-conflict-path',
    estimatedMinutes: 24,
  },
  {
    id: 'chapter-5-governance-reckoning',
    chapter: 5,
    route: '/chapter-packs/chapter-5-governance-reckoning.ink',
    dependsOnEnding: ['relay-legitimacy-path', 'relay-compromised-path'],
    estimatedMinutes: 24,
  },
  {
    id: 'chapter-5-lineage-protocol',
    chapter: 5,
    route: '/chapter-packs/chapter-5-lineage-protocol.ink',
    dependsOnEnding: ['ledger-trust-path', 'emergency-custody-path'],
    estimatedMinutes: 24,
  },
  {
    id: 'chapter-5-memory-settlement',
    chapter: 5,
    route: '/chapter-packs/chapter-5-memory-settlement.ink',
    dependsOnEnding: ['trial-credibility-path', 'amnesty-conflict-path'],
    estimatedMinutes: 24,
  },
];

function canUseCacheStorage() {
  return typeof window !== 'undefined' && 'caches' in window;
}

export function getEligibleNextChapterPack(state: TimelineState) {
  if (!state.endingKey) return null;
  return (
    chapterPackManifest
      .filter((pack) => {
        if (!pack.dependsOnEnding || pack.chapter <= state.chapter) return false;
        return Array.isArray(pack.dependsOnEnding)
          ? pack.dependsOnEnding.includes(state.endingKey as string)
          : pack.dependsOnEnding === state.endingKey;
      })
      .sort((left, right) => left.chapter - right.chapter)[0] ?? null
  );
}

export function getChapterPackForState(state: TimelineState) {
  if (state.chapterPackId) {
    const matchedById = chapterPackManifest.find((pack) => pack.id === state.chapterPackId);
    if (matchedById) return matchedById;
  }

  const chapterCandidates = chapterPackManifest.filter((pack) => pack.chapter === state.chapter);
  if (chapterCandidates.length === 0) return null;

  if (!state.endingKey) {
    return chapterCandidates[0] ?? null;
  }

  const matchedByEnding = chapterCandidates.find((pack) => {
    if (!pack.dependsOnEnding) return true;
    return Array.isArray(pack.dependsOnEnding)
      ? pack.dependsOnEnding.includes(state.endingKey as string)
      : pack.dependsOnEnding === state.endingKey;
  });

  if (matchedByEnding) return matchedByEnding;

  if (state.endingKey) {
    const endingRouteKey = state.endingKey.replace(/-path$/, '');
    const matchedByRouteKey = chapterCandidates.find((pack) => pack.id.includes(endingRouteKey));
    if (matchedByRouteKey) return matchedByRouteKey;
  }

  // endingKey may have advanced beyond this chapter's prerequisite key; keep restore on same chapter.
  return chapterCandidates[0] ?? null;
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

  if (typeof navigator !== 'undefined' && navigator.onLine === false) return null;

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
