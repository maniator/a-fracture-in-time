# Prompt 001 — Expand Chapter 4 and Chapter 5 Ink Content

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/001-chapters-4-5-content-stubs.md](../findings/001-chapters-4-5-content-stubs.md)  
**Task type:** Narrative content authoring  
**BMAD owner agent:** Narrative Designer  

---

## Goal

Expand all Chapter 4 and Chapter 5 ink files to meet the project's established 20–30 minute reading standard (≥3,000 narrative words per pack), matching the depth, branching complexity, and character consistency of Chapters 1–3.

---

## Context

Chapters 1–3 each contain 3,000–3,310 narrative words (~20–22 minutes). The project enforces this standard with duration guardrail tests for Ch2 and Ch3.

Current state:
- Chapter 4 packs: 544–633 words each (~3–4 min) — all 6 routes
- Chapter 5 packs: 195–227 words each (~1–1.5 min) — all 3 routes

The chapter structures are correct (characters, variables, branch keys, `endingKey` assignments) but scenes are underdeveloped. Players who reach Chapter 4 after 60+ minutes of story are confronted with content that ends in under 5 minutes. Chapter 5 ends in ~90 seconds.

Chapter 4 covers: relay governance decisions, volunteer fatigue, process vs urgency.  
Chapter 5 covers: the "Governance Reckoning" — who audits the auditors after Cybol's fall.

Characters active: Xav Reivax, Yve Ettevy, Zelda Adlez, Ari (Xav's sister).

---

## Scope

- Expand all 6 Chapter 4 ink files to ≥3,000 words each
- Expand all 3 Chapter 5 ink files to ≥3,000 words each
- Each file must have at least 2 meaningful branch points beyond the opening choice
- Each file must end with an `endingKey` assignment and `-> DONE`
- POV switches between past/future should feel narratively motivated (as in Ch1–3)
- The existing characters must speak consistently with their established voice:
  - Xav: thoughtful, cautious, first-person interiority
  - Yve: systemic, skeptical, builds processes
  - Zelda: survivor voice, bitter humour, time-aware
  - Ari: curious, direct, asks the uncomfortable question

---

## Non-Goals

- Do not change Chapter 1, 2, or 3 content
- Do not change chapter pack routing logic or manifest entries
- Do not change `TimelineState` variables or add new ones
- Do not modify the narrative engine or shared-types

---

## Implementation Guidance

1. Read the existing Chapter 4/5 files in full — they establish the scene framing and variable logic to preserve.
2. Extend each scene with additional paragraphs. The current scenes read like outlines; expand each beat into full prose.
3. Add at minimum one intermediate scene per chapter pack between the opening choice and the chapter-complete scene. Each intermediate scene should reveal a consequence of the opening choice.
4. Ensure `currentSpeaker`, `currentPOV`, `currentSceneId` variables are set correctly at each knot.
5. Timeline signals (stability, rebellion, etc.) should be incremented at least twice per chapter, coherent with the choice semantics.
6. Match prose style: past-tense for Xav/Yve scenes, Zelda's POV is often present or near-present tense with deadpan observation.

---

## Likely Files

```
apps/web/public/chapter-packs/chapter-4-relay-legitimacy.ink
apps/web/public/chapter-packs/chapter-4-relay-compromised.ink
apps/web/public/chapter-packs/chapter-4-ledger-trust.ink
apps/web/public/chapter-packs/chapter-4-emergency-custody.ink
apps/web/public/chapter-packs/chapter-4-trial-credibility.ink
apps/web/public/chapter-packs/chapter-4-amnesty-conflict.ink
apps/web/public/chapter-packs/chapter-5-governance-reckoning.ink
apps/web/public/chapter-packs/chapter-5-lineage-protocol.ink
apps/web/public/chapter-packs/chapter-5-memory-settlement.ink
```

---

## Acceptance Criteria

- [ ] Every Chapter 4 pack has ≥3,000 narrative words (verified by `wc -w`)
- [ ] Every Chapter 5 pack has ≥3,000 narrative words
- [ ] `estimatedMinutes` in `chapter-pack-cache.ts` is updated to match actual reading time (20–26 min)
- [ ] Duration guardrail tests from Prompt 004 pass (add those tests first if not already present)
- [ ] All existing e2e tests continue to pass (`pnpm test:e2e`)
- [ ] Narrative content is consistent with established character voices and world lore

---

## Testing Requirements

- Run `pnpm test` — duration tests for Ch4/Ch5 must pass
- Run `pnpm test:e2e` — no regressions
- Manual play-through of at least one Ch4 and one Ch5 route via `pnpm build && pnpm start`
- Verify `endingKey` is correctly set at chapter completion

---

## Commit Hygiene

One commit per chapter pack file, or one combined commit:
```
narrative: expand Chapter 4 and Chapter 5 ink packs to 20-minute standard
```

---

## Final Response Requirements

- Confirm word count for each file in the response
- Confirm all duration tests pass
- Note any narrative design decisions made (e.g., POV choices, new scene IDs added)
- Do not modify non-ink files unless updating `estimatedMinutes` in the chapter pack manifest
