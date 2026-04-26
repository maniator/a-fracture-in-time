# Chapter Packs and Offline Policy

## Principle

Do not make users download story content unless they are actually playing the game.

The home page and app shell should stay lightweight. Story content should load when a user enters a play flow, not when they merely visit the landing page.

## Chapter 1

Chapter 1 is the entry chapter. It should load when the player presses **Start Chapter 1** and reaches `/play`.

Current policy:

- Do not prefetch `/play` from the home page.
- Load Chapter 1 only when the play route initializes.
- After Chapter 1 has loaded successfully, allow the PWA/service worker/browser cache to keep the play route and chapter assets available for offline replay.
- Save state stays in IndexedDB, not in the service worker cache.

Target playtime:

- Chapter 1 should feel like a real pilot chapter.
- A first casual playthrough should target roughly 8 to 12 minutes.
- Repeat playthroughs can be faster because the player already understands the world and choices.

## Future Chapters

Future chapters should be delivered as chapter packs.

A chapter pack is a cacheable file or bundle that contains story content for a specific chapter route. Route-specific packs are preferred when previous choices substantially change the story.

Example Chapter 2 packs:

- `chapter-2-fracture`, selected by `endingKey = fracture-path`
- `chapter-2-rebellion`, selected by `endingKey = rebellion-path`
- `chapter-2-control`, selected by `endingKey = control-path`

Future packs can also depend on more granular variables and flags, such as `memoryFracture`, `rebellion`, `magicEntropy`, or whether Mira comforted the child.

Target playtime:

- Future chapters should target roughly 15 to 20 minutes for a first playthrough.
- Branches do not need equal length, but each route should feel complete.
- Chapter 2 should be longer than Chapter 1 because it carries consequences from the first ending.

## Offline Behavior

The app should support offline play for chapters already loaded or cached.

Rules:

1. The app shell should be installable as a PWA.
2. The current chapter should be cached after it is loaded.
3. The next eligible chapter should be cached when the player is close to needing it.
4. If the user is offline and the required next chapter is not cached, show a clear message asking them to connect to download it.
5. The player save must remain durable in IndexedDB even if chapter packs are evicted by browser storage pressure.

## Cache Retention

Cache Storage should be treated as replaceable. IndexedDB save state is more important than cached story packs.

Keep by default:

- app shell
- current chapter pack
- next eligible chapter pack
- player save state in IndexedDB

Older completed chapter packs may stay cached, but they can be pruned if needed. The player should be able to re-download old packs later when online.

## Implementation Notes

`apps/web/lib/chapter-packs/chapter-pack-cache.ts` contains the first chapter-pack cache helper.

The helper can:

- identify the next eligible pack from the current `TimelineState`
- check if that pack is cached
- download/cache it while online
- report `needsInternet` when the user is offline and the needed pack is missing
- prune old chapter packs while preserving selected pack IDs

## Acceptance Criteria

Before shipping a new chapter pack system:

- The home page does not prefetch story content for users who never press play.
- `/play` shows a loading or unavailable state if its story pack is not ready.
- Chapter packs are selected from prior Ink state, not from a hardcoded linear chapter number alone.
- Offline tests cover the current cached chapter and the missing-next-chapter offline state.
- Vercel build, lint, unit tests, Storybook, and Playwright e2e remain green.
