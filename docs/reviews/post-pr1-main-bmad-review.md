# Post-PR1 Main Branch BMAD Stabilization Review

## Review Metadata

- Repository: `maniator/a-fracture-in-time`
- Branch evaluated: `main` (review assembled on `codex/final-post-pr1-bmad-stabilization-review` from current mainline state)
- Source commits/PRs considered: PR 8 (`codex/perform-post-pr1-bmad-review`), PR 9 (`codex/perform-post-pr1-bmad-review-ag65sl`), and current `main`
- Review date: 2026-04-26
- Reviewer: Codex (BMAD synthesis pass)
- Scope: Post-PR1 stabilization readiness only (progression integrity, BMAD/NOM alignment, chapter continuity, test/CI reliability, scaffold risk)
- Explicit supersedes:
  - PR 8
  - PR 9

## Executive Summary

This combined review intentionally keeps PR 9’s stabilization-first framing while restoring PR 8’s fuller BMAD accountability and per-agent traceability.

This is a review-only artifact.

No feature work should be started from this review until the stabilization risks below are addressed.

Recommendation: **Ready for next stabilization PR work only.**

## Commands and Evidence Reviewed

The following command evidence was considered from PR 8 and PR 9 writeups, plus repository inspection during this consolidation pass:

- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm test:e2e`
- chapter-pack word count script noted in PR 9 context (`wc`/count-based comparison of Chapter 2/3 vs Chapter 4/5 pack content)

Honesty notes:

- Commands above are included because they were reported in PR 8/PR 9 review context and are required evidence categories for this merged review.
- They were **not fully re-run** as part of producing this documentation-only superseding review artifact.
- Known limitation carried forward from prior review context: local Playwright/browser setup can diverge from CI defaults and is a reliability risk that requires explicit preflight.

## BMAD Agent Execution Checklist

| Agent | Included | Key Focus |
|---|---:|---|
| bmad-orchestrator | Yes | Cross-agent sequencing, stabilization dependency order |
| bmad-master | Yes | BMAD process integrity, checklist completeness |
| analyst | Yes | Evidence quality, risk framing, test honesty |
| pm | Yes | Scope guardrails and milestone fit for stabilization |
| architect | Yes | Runtime brittleness and structural risk boundaries |
| ux-expert | Yes | Player-facing continuity confidence and progression clarity |
| po | Yes | Acceptance readiness, release gating, value protection |
| sm | Yes | Deliverable slicing and handoff quality |
| dev | Yes | Implementation feasibility and targeted refactor surface |
| qa | Yes | Coverage gaps, deterministic progression validation, E2E reliability |

## Stabilization Findings by Area

### 1. Merged Scope Coherence

Post-PR1 merged scope is directionally coherent: chapter continuation mechanics, chapter packs, and progression state handling share a unified intent. However, the merged unit still behaves like a partially hardened growth step, not yet a fully stabilized baseline. The current state can support a stabilization pass but should not absorb new feature-heavy scope first.

### 2. BMAD/NOM Docs vs Actual Repo Behavior

BMAD/NOM artifacts and repository behavior are mostly aligned at a workflow level, but reporting language can overstate runtime confidence when validation is predominantly manifest/unit-centered. Documentation should explicitly distinguish: (a) script/report checks, (b) deterministic runtime progression checks, and (c) local E2E operational readiness.

### 3. Chapter 2/3/4/5 Continuation Logic Consistency

Continuation logic across Chapters 2 through 5 is mostly consistent in intent, but confidence drops in later chapter transitions where branch fan-out and completion-state semantics are denser. Late-chapter progression should be treated as stabilization-critical and verified by deterministic transition tests rather than inferred from neighboring coverage.

### 4. Test Coverage Honesty

Current quality signals are meaningful but uneven. Existing tests validate important slices; they do not yet provide high-confidence runtime progression proof for all critical late-chapter handoffs. Coverage claims should remain explicit about this gap until deterministic transition checks are in place for Chapter 3 -> 4 and 4 -> 5 behavior.

### 5. CI and Local E2E Reliability

CI-oriented automation appears stronger than local-default reproducibility. Local E2E execution remains too sensitive to browser/tooling preconditions. Stabilization requires a standard local preflight path that mirrors CI assumptions closely enough to reduce “works in CI, fails locally” friction.

### 6. Content Maturity and Scaffold/Filler Risk

Chapter 4/5 packs remain substantially shorter than Chapter 2/3 packs and should be treated as scaffold-level content unless/until explicit content-maturity metadata indicates otherwise. This is a release-risk classification issue, not a prompt to expand narrative in this pass.

### 7. Scope Creep and Architecture Brittleness

There is manageable but real brittleness risk where progression rules, completion semantics, and presentation metadata overlap. Without tight scope control, the next implementation branch could drift into architecture rewrite territory. Stabilization should isolate small, low-risk structural extractions and avoid broad redesign.

## BMAD Agent Findings

### bmad-orchestrator

The sequencing signal is clear: progression validation, maturity gating, and local E2E preflight should precede new feature expansion. Cross-agent outputs converge on stabilization-first ordering.

### bmad-master

Process completeness improves materially when full-agent traceability is retained. This consolidated review restores explicit accountability coverage while preserving concise stabilization framing.

### analyst

Evidence quality is sufficient to identify high-confidence risks (late progression validation, scaffold maturity mismatch, local E2E variance) but insufficient to claim full runtime stabilization for late chapters.

### pm

Scope for the next stabilization PR should remain narrow and measurable: deterministic progression tests, maturity metadata gates, and reliability preflight—not net-new story scope.

### architect

Targeted extraction of progression presentation metadata from `SceneRenderer` is justified to reduce coupling, but should remain incremental and non-invasive.

### ux-expert

Player trust depends on consistent chapter handoff behavior and accurate progression signals; instability in late transitions can degrade perceived narrative continuity even when content is present.

### po

Release confidence should be gated by explicit maturity and validation criteria. Chapter availability should not imply chapter readiness when content maturity remains scaffold-level.

### sm

Handoffs need tighter Definition of Done around progression integrity and local reproducibility to prevent partial “done” signals crossing role boundaries.

### dev

Implementation path is feasible with contained changes: add deterministic transition tests, move a small metadata concern out of `SceneRenderer`, and wire maturity gates without chapter rewrites.

### qa

Primary test debt remains deterministic runtime/integration coverage for Chapter 3 -> 4 and 4 -> 5 transitions plus a dependable local E2E setup baseline.

## Cross-Agent Synthesis

Where agents agree:

- Stabilization must precede new feature expansion.
- Late-chapter progression confidence is currently insufficient.
- Chapter 4/5 maturity must be explicitly classified and gated.
- Local E2E reliability requires a standardized preflight.

Where recommendations overlap:

- QA + Architect + Dev: deterministic transition tests and focused metadata decoupling.
- PM + PO + SM: tighter scope and acceptance gates before future feature work.
- Analyst + bmad-master: clearer honesty boundaries in BMAD/NOM reporting.

What should happen before the next feature PR:

1. Deterministic progression transition coverage for Chapter 3 -> 4 and 4 -> 5.
2. Chapter-pack maturity metadata and release gating semantics.
3. Local E2E preflight standardization.
4. Small progression metadata extraction from `SceneRenderer`.
5. BMAD NOM report limitation clarifications.

Dependency order for stabilization:

1. Define maturity and progression acceptance criteria.
2. Add deterministic tests and local preflight.
3. Perform minimal structural extraction.
4. Update BMAD/NOM docs to reflect validated confidence boundaries.

## Blockers Before Next Feature PR

### Blocker 1: Late-chapter runtime progression is not sufficiently validated

Chapter 4/5 progression confidence currently appears driven more by manifest/unit-level coverage than deterministic runtime handoff validation. Add deterministic integration/runtime checks for Chapter 3 -> 4 and 4 -> 5 before feature expansion.

### Blocker 2: Chapter 4/5 content maturity is scaffold-level relative to Chapter 2/3

Observed chapter-pack size and maturity mismatch indicates Chapter 4/5 should remain classified as scaffold-level until explicit maturity metadata and release gates say otherwise. Do not expand narrative here; classify and gate readiness.

### Blocker 3: Local E2E execution is not reliable by default

Playwright/browser setup differences between local and CI reduce reproducibility. Add a default local preflight path that makes browser/runtime assumptions explicit and repeatable.

## High Priority Issues

1. Add deterministic progression tests for Chapter 3 -> 4 and 4 -> 5.
2. Add chapter-pack content maturity metadata and release gates.
3. Extract progression presentation metadata out of `SceneRenderer`.
4. Clarify BMAD NOM report limitations.
5. Standardize local E2E preflight.

## Medium Priority Issues

1. Harmonize completion flag naming policy.
2. Add manifest/route/pack consistency audit.
3. Improve acceptance criteria and Definition of Done for BMAD handoffs.

## Recommended Next GitHub Issues

### Issue Template 1 — Deterministic late-chapter progression validation

```md
## Goal
Add deterministic automated coverage for Chapter 3 -> 4 and 4 -> 5 runtime progression.

## Background
Current confidence for late-chapter progression is not sufficiently backed by deterministic runtime/integration checks.

## Scope
- Add targeted tests for canonical transition paths and failure paths.
- Validate completion-state dependencies and continuation routing.

## Acceptance Criteria
- Deterministic tests cover Chapter 3 -> 4 and 4 -> 5 progression.
- Flaky behavior is eliminated in CI and reproducible locally.

## Out of Scope
- New chapter content.
- Narrative expansion.

## Notes
Keep fixtures minimal and aligned with existing chapter-pack structures.
```

### Issue Template 2 — Chapter-pack maturity metadata and gates

```md
## Goal
Introduce content maturity metadata for chapter packs and enforce release/readiness gates.

## Background
Chapter 4/5 are materially shorter than Chapter 2/3 and should be treated as scaffold-level until maturity is explicit.

## Scope
- Define maturity fields and allowed states.
- Add enforcement points in release/readiness workflow.

## Acceptance Criteria
- Chapter packs include maturity metadata.
- Readiness checks prevent scaffold-level packs from being treated as production-mature by default.

## Out of Scope
- Expanding chapter narrative text.

## Notes
Prefer additive metadata and backward-compatible defaults.
```

### Issue Template 3 — Progression metadata extraction from SceneRenderer

```md
## Goal
Reduce coupling by moving progression presentation metadata responsibilities out of `SceneRenderer`.

## Background
Mixed responsibilities increase brittleness and raise risk during progression changes.

## Scope
- Extract a small metadata boundary/module.
- Keep behavior identical.

## Acceptance Criteria
- `SceneRenderer` no longer owns extracted metadata logic.
- Existing behavior and tests remain stable.

## Out of Scope
- Major architecture rewrites.

## Notes
Favor incremental extraction and avoid broad refactors.
```

### Issue Template 4 — BMAD NOM report limitation clarity

```md
## Goal
Clarify BMAD NOM report language so confidence claims match actual evidence depth.

## Background
Process/doc checks can be mistaken for deterministic runtime validation if boundaries are not explicit.

## Scope
- Document evidence classes (doc/script/runtime/integration).
- Update report wording and caveats.

## Acceptance Criteria
- Reports clearly state what was and was not validated.
- Reviewers can map confidence statements to evidence type.

## Out of Scope
- Replacing BMAD workflow.

## Notes
Keep wording concise and audit-friendly.
```

### Issue Template 5 — Local E2E preflight standardization

```md
## Goal
Create a default local E2E preflight path that matches CI expectations.

## Background
Local Playwright/browser preconditions are a recurring source of false failures and inconsistent confidence.

## Scope
- Define one recommended local setup flow.
- Add explicit checks for browser/runtime prerequisites.

## Acceptance Criteria
- Contributors can run local E2E with predictable setup steps.
- Preflight catches missing prerequisites before test execution.

## Out of Scope
- CI platform migration.

## Notes
Document known local/CI differences and how preflight neutralizes them.
```

## Recommended Next Stabilization PR Scope

The next PR based on this review should be stabilization-only.

Include:

- progression tests
- content maturity metadata
- NOM documentation clarification
- local E2E preflight
- small progression metadata extraction

Exclude:

- new chapters
- new routes
- narrative expansion
- major architecture rewrites
- new BMAD modules

## Final Recommendation

**Ready for next stabilization PR work only.**

The repository is coherent enough to stabilize, but it is not ready for another feature-heavy PR until progression validation, content maturity gating, and local E2E reliability risks are addressed.
