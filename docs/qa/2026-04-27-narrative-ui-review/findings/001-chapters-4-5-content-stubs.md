# Finding 001 — Chapters 4 and 5 Are Content Stubs

**Severity:** Critical  
**Area:** Narrative Content / Product Completeness  
**Owner agent:** Narrative Designer + PM  
**Related next-step prompt:** [001-expand-chapters-4-5-content.md](../next-step-prompts/001-expand-chapters-4-5-content.md)

---

## Summary

Chapters 4 and 5 each have vastly less content than the established 20–30 minute standard. All six Chapter 4 packs average ~4 minutes of reading; all three Chapter 5 packs average ~1 minute. A player who completes Chapter 3 and continues will hit a chapter that lasts a small fraction of the previous ones, with no warning, and the game ends abruptly.

---

## Evidence

Word counts measured via `wc -w` on public ink files (150 WPM baseline used by the project's own duration tests):

| File | Words | Est. Minutes |
|---|---|---|
| chapter-4-relay-legitimacy.ink | 556 | ~3.7 min |
| chapter-4-relay-compromised.ink | 600 | ~4.0 min |
| chapter-4-ledger-trust.ink | 544 | ~3.6 min |
| chapter-4-emergency-custody.ink | 606 | ~4.0 min |
| chapter-4-trial-credibility.ink | 633 | ~4.2 min |
| chapter-4-amnesty-conflict.ink | 633 | ~4.2 min |
| chapter-5-governance-reckoning.ink | 227 | ~1.5 min |
| chapter-5-lineage-protocol.ink | 209 | ~1.4 min |
| chapter-5-memory-settlement.ink | 195 | ~1.3 min |

**Project standard (enforced by tests for Ch2/Ch3):** 3,000+ words, ≥20 minutes.

Chapters 1–3 all pass this standard (3,000–3,310 words each). Chapters 4/5 fall between 4× and 15× below it.

**Source references:**
- `apps/web/public/chapter-packs/chapter-4-*.ink`
- `apps/web/public/chapter-packs/chapter-5-*.ink`
- `apps/web/lib/chapter-packs/chapter-pack-cache.ts` (estimatedMinutes: 24 for Ch4, 24 for Ch5 — these values are inaccurate)
- `apps/web/content/chapter-two-duration.test.ts` (no equivalent test for Ch4/Ch5)

---

## Steps to Reproduce

1. Complete Chapter 1 Signal Path (choices: Admit → Study → Answer → Start carefully → Ask Zelda → Bring Yve → Tell Ari → End).
2. Continue to Chapter 2 (Signal). Play through.
3. Continue to Chapter 3 (Signal). Play through.
4. Continue to Chapter 4 (relay-legitimacy). Play through.
5. Observe the chapter ends in under 5 minutes.
6. Continue to Chapter 5. Observe the chapter ends in ~90 seconds.

---

## Expected Behavior

Each chapter from 4 onward should meet the project's own standard: ≥3,000 narrative words (~20 minutes), matching the quality and depth of Chapters 1–3.

---

## Actual Behavior

Chapter 4 is roughly 550–633 words (3–4 minutes). Chapter 5 is 195–227 words (~1 minute). The game effectively ends 10–15 minutes into what a player expects to be a 20–30 minute chapter.

---

## Why It Matters

Any player who completes Chapter 3 and continues encounters a dramatically truncated experience with no warning. The `estimatedMinutes` values in `chapter-pack-cache.ts` (set to 24 for both Ch4 and Ch5) are outright inaccurate. This is the most significant gap between product promise and current state and is the primary reason the game is not yet launch-ready beyond Chapter 3.

---

## Recommendation

Expand Ch4 and Ch5 ink files to reach the 3,000+ word floor. The narrative structure (themes, characters, factions) is solid; the scenes are well-framed but lack depth, branching complexity, and consequence scenes. Treat this as a Narrative Designer task with Architect sign-off on ink variable usage.

---

## Acceptance Criteria

- [ ] Every Chapter 4 pack has ≥3,000 narrative words
- [ ] Every Chapter 5 pack has ≥3,000 narrative words
- [ ] `estimatedMinutes` in the manifest accurately reflects actual reading time
- [ ] Duration guardrail tests exist for Ch4 and Ch5 (see Finding 004)
- [ ] CI passes

---

## Suggested GitHub Issue Title

`narrative: expand Chapter 4 and Chapter 5 ink packs to 20-minute standard`

## Suggested Labels

`narrative`, `content`, `critical`, `chapter-4`, `chapter-5`

---

## Screenshot References

- `screenshots/random-02-signal-path-end.png` — Chapter 3 signal path end state showing "Continue to Chapter 4" flow
