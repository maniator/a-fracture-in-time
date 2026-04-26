# Narrative Branching Strategy (Scalable)

## Problem
If every choice permanently forks into fully independent chapters, content complexity grows exponentially and quickly becomes unmaintainable.

## Proposed Solution: Braided Narrative Graph

Use a repeating pattern:

1. **Split** at one high-impact irreversible decision.
2. **Echo** consequence for several scenes with meaningful differences.
3. **Merge** at a shared hub where all branches can reconverge.
4. **Re-split** later when a new major decision appears.

This preserves player agency while keeping production linear-to-polynomial instead of exponential.

## Design Rules

- One major irreversible split per route segment between merge hubs.
- Maximum two active branch families at the same chapter depth.
- Minimum 50% shared scene budget per chapter.
- Consequence differences should prioritize:
  - system behavior,
  - social trust,
  - resource access,
  - legal/political pressure,
  not only rewritten dialogue.

## Data Model Recommendation

Represent long-term consequences as compact doctrine/state keys:

- `relayDoctrine`: legitimacy-first vs reach-first
- `familyDoctrine`: due-process-first vs extraction-first
- `memoryDoctrine`: conditional-amnesty vs no-amnesty

Then render modular consequence blocks at shared hubs instead of duplicating full route trees.

## QA Gates

For each chapter release:

1. Verify each irreversible split writes the expected state key.
2. Verify each branch reaches at least one planned merge hub.
3. Verify continuation resolver maps state keys to the correct next packs.
4. Verify no orphan branches exist (unreachable pack IDs or dead-end routes).

## Current Application

- Chapters 3 -> 4 currently use six consequence-driven outcomes.
- Next iteration should merge these into shared Chapter 5 hubs before introducing new irreversible splits.
