# Prompt 004 — Add Duration Guardrail Tests for Chapters 4 and 5

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/004-no-ch4-ch5-duration-tests.md](../findings/004-no-ch4-ch5-duration-tests.md)  
**Task type:** Testing / Engineering  
**BMAD owner agent:** QA + Engineering  

---

## Goal

Create duration guardrail tests for Chapters 4 and 5 following the exact pattern established by `chapter-two-duration.test.ts` and `chapter-three-duration.test.ts`. These tests should initially fail (because the content is currently too short), then pass once Prompt 001 (expand Ch4/Ch5 content) is resolved.

---

## Context

The project has a clear, tested standard: every Chapter 2 and Chapter 3 pack must contain ≥3,000 words (~20 minutes). This is enforced by:
- `apps/web/content/chapter-two-duration.test.ts`
- `apps/web/content/chapter-three-duration.test.ts`

These tests are part of the `pnpm test` suite and run in CI. No equivalent tests exist for Chapters 4 or 5. Current word counts:

| Chapter | Avg words | Est. min |
|---|---|---|
| 4 (all 6 routes) | ~590 | ~4 |
| 5 (all 3 routes) | ~210 | ~1.4 |

The `estimatedMinutes` values in `chapter-pack-cache.ts` are also inaccurate (set to 24 for both Ch4 and Ch5 despite the actual reading time being 1–4 minutes).

---

## Scope

- Create `apps/web/content/chapter-four-duration.test.ts`
- Create `apps/web/content/chapter-five-duration.test.ts`
- Both should use the same structure as the existing duration tests
- Do not fix the content itself — that is Prompt 001's job

---

## Non-Goals

- Do not modify the ink files themselves
- Do not change the test for Ch2 or Ch3
- Do not add any new test utilities beyond what the existing tests use

---

## Implementation Guidance

Copy the structure from `chapter-two-duration.test.ts` exactly:

```ts
// apps/web/content/chapter-four-duration.test.ts
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chapterPackManifest } from '../lib/chapter-packs/chapter-pack-cache';

const WORDS_PER_MINUTE = 150;
const MIN_CHAPTER_FOUR_MINUTES = 20;
const MAX_CHAPTER_FOUR_MINUTES = 30;
const MIN_CHAPTER_FOUR_WORDS = WORDS_PER_MINUTE * MIN_CHAPTER_FOUR_MINUTES;

function readChapterPack(route: string) {
  return readFileSync(join(process.cwd(), `public${route}`), 'utf8');
}

function countWords(text: string) {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

describe('Chapter 4 route length guardrail', () => {
  it('keeps every Chapter 4 pack above the 20-minute reading baseline', () => {
    const chapterFourPacks = chapterPackManifest.filter((pack) => pack.chapter === 4);
    for (const pack of chapterFourPacks) {
      const words = countWords(readChapterPack(pack.route));
      expect(words, `${pack.id} only has ${words} words`).toBeGreaterThanOrEqual(MIN_CHAPTER_FOUR_WORDS);
      expect(pack.estimatedMinutes, `${pack.id} estimatedMinutes should advertise 20+ minutes`).toBeGreaterThanOrEqual(MIN_CHAPTER_FOUR_MINUTES);
      expect(pack.estimatedMinutes, `${pack.id} estimatedMinutes should remain within 20-30 minute target`).toBeLessThanOrEqual(MAX_CHAPTER_FOUR_MINUTES);
    }
  });
});
```

Create an identical file for Chapter 5.

---

## Likely Files

```
apps/web/content/chapter-four-duration.test.ts  (new)
apps/web/content/chapter-five-duration.test.ts  (new)
```

---

## Acceptance Criteria

- [ ] `chapter-four-duration.test.ts` exists and matches the structure above
- [ ] `chapter-five-duration.test.ts` exists and matches the structure above
- [ ] Both tests **fail** when run against the current short content (this is expected and correct)
- [ ] The failure messages clearly identify which pack is too short and by how many words
- [ ] Both tests **pass** after Prompt 001 expands the content
- [ ] `pnpm test` reports the failures without crashing CI unrecoverably (test failures are normal — the intent is to surface the problem)

---

## Testing Requirements

- `pnpm test` — new tests appear in output, fail with clear messages about word counts
- No regressions to existing 70 passing tests

---

## Commit Hygiene

```
test: add duration guardrail tests for Chapter 4 and Chapter 5 packs
```

---

## Final Response Requirements

- Confirm both test files were created
- Show the failure output from `pnpm test` confirming they fail correctly with word-count messages
- Confirm existing tests still pass
