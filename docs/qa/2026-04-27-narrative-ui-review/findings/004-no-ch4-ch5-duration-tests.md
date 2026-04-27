# Finding 004 — No Duration Guardrail Tests for Chapters 4 and 5

**Severity:** Medium  
**Area:** Engineering / QA / Process  
**Owner agent:** QA + Engineering  
**Related next-step prompt:** [004-ch4-ch5-duration-tests.md](../next-step-prompts/004-ch4-ch5-duration-tests.md)

---

## Summary

The project has duration guardrail tests for Chapters 2 and 3 (`chapter-two-duration.test.ts`, `chapter-three-duration.test.ts`) that enforce the 20–30 minute word count standard. No equivalent tests exist for Chapters 4 or 5. Combined with Finding 001 (Ch4/Ch5 content stubs), this means undersized chapters can be shipped without any CI failure.

---

## Evidence

Existing guardrail tests:
- `apps/web/content/chapter-two-duration.test.ts` — enforces ≥3,000 words, 20–30 min, for all Ch2 packs
- `apps/web/content/chapter-three-duration.test.ts` — enforces ≥3,000 words, 20–30 min, for all Ch3 packs

Missing:
- No `chapter-four-duration.test.ts`
- No `chapter-five-duration.test.ts`

Current Ch4/Ch5 word counts are 195–633 words each (~1–4 min). None would pass the Ch2/Ch3 standard.

**Source reference:**
- `apps/web/content/chapter-two-duration.test.ts`
- `apps/web/content/chapter-three-duration.test.ts`

---

## Steps to Reproduce

1. Run `pnpm test` from the repo root.
2. Observe: 70 tests pass, zero failures on Ch4/Ch5 duration because no such tests exist.
3. Open any `chapter-4-*.ink` file — word count is well below 3,000.

---

## Expected Behavior

CI fails if any Chapter 4 or Chapter 5 pack is below the word-count floor, preventing undersized content from shipping.

---

## Actual Behavior

No tests check Ch4/Ch5 word counts. Short chapters pass CI undetected.

---

## Why It Matters

The guardrail test pattern was specifically built to protect chapter duration standards. Not extending it to Ch4/Ch5 creates a blind spot that has already allowed sub-standard content to enter the repository. This will recur on any future chapter unless the guardrails are extended.

---

## Recommendation

Create `apps/web/content/chapter-four-duration.test.ts` and `chapter-five-duration.test.ts` following the existing pattern. These tests will initially fail (correctly) until Finding 001 is resolved. The tests should be written first, then the content expanded to pass them.

---

## Acceptance Criteria

- [ ] `apps/web/content/chapter-four-duration.test.ts` exists
- [ ] `apps/web/content/chapter-five-duration.test.ts` exists
- [ ] Both tests follow the same structure as `chapter-two-duration.test.ts`
- [ ] Both tests fail until Finding 001 is resolved (content expanded)
- [ ] After Finding 001 is resolved, all duration tests pass in CI

---

## Suggested GitHub Issue Title

`test: add duration guardrail tests for Chapter 4 and Chapter 5 packs`

## Suggested Labels

`testing`, `ci`, `medium`, `narrative`, `engineering`
