# Post-PR1 Main Branch Stabilization Review (BMAD + Progression Integrity)

## Review Metadata

- Repository: `maniator/a-fracture-in-time` (evaluated from current checked-out source)
- Branch evaluated in this environment: `work` (no local `main` ref configured)
- Source-of-truth assumption used: current checked-out tip reflects post-PR1 merged state
- Latest commit evaluated: `c628d88`
- Review date: 2026-04-26
- Reviewer: Codex (GPT-5.3-Codex)

## Purpose

This is a **stabilization-only** review of the currently merged scope after PR1.

This review focuses on:

1. merged-scope coherence,
2. BMAD/NOM documentation-to-script alignment,
3. Chapter 2/3/4/5 continuation consistency,
4. test coverage honesty for progression behavior,
5. CI validation reliability,
6. generated/filler content quality risks,
7. architecture brittleness or scope creep.

No feature expansion was implemented.

## Commands Run

| Command | Result | Notes |
|---|---|---|
| `git status --short` | Pass | Clean state before editing review doc. |
| `git branch --show-current` | Pass | `work`. |
| `git log --oneline -n 10` | Pass | Post-PR1 continuation commits present through Chapter 5 scaffolding/fixes. |
| `corepack enable && pnpm install --frozen-lockfile` | Pass | Dependencies already up to date. |
| `pnpm lint` | Pass | ESLint + package TS checks pass. |
| `pnpm test` | Pass | Unit/integration suites pass (24 app tests, 6 engine tests). |
| `pnpm build` | Pass | Production build succeeds in current state. |
| `pnpm test:e2e` | Warning | Fails because Playwright browser binary is not installed in this host environment (`pnpm exec playwright install` needed). |
| `python` chapter-pack word count script | Pass | Revealed very short Chapter 4/5 packs relative to Ch2/3 targets. |

## Executive Stabilization Assessment

The merged scope is directionally coherent: Chapter 1 → 2 continuation UX is present, Chapter 3 consequence split logic exists, Chapter 4 divergence and Chapter 5 merge hubs are represented in manifest logic, and CI is configured with separated quality jobs.

However, stabilization work is still needed before next feature PR:

- **Narrative depth mismatch risk**: Chapter 4/5 packs are currently extremely short compared with Chapter 2/3 pacing commitments.
- **Coverage gap risk**: tests validate manifest-level routing behavior well, but runtime playthrough tests do not yet cover Chapter 4/5 progression end-to-end.
- **Local e2e reproducibility gap**: CI likely validates e2e using containerized browsers, but local default `pnpm test:e2e` fails without a browser install step.
- **Review-process drift risk**: environment has no local `main` ref/remotes in this workspace, so branch preflight automation should be hardened for reproducible audits.

Recommendation: **PR2 should be stabilization-focused, not feature-expansion-focused**.

---

## 1) Merged Scope Coherence

### Findings

- Current commits show a coherent narrative of continuation work and fixes after Chapter 2 integration (`fc5fedc` and follow-up gating/restore fixes through current tip).
- Play UI continuation depends on active chapter completion + eligible pack resolution, reducing accidental forward jumps.
- Chapter progression manifest expresses a clear braided model:
  - Chapter 2 routes keyed off Chapter 1 endings,
  - Chapter 3 routes keyed similarly,
  - Chapter 4 diverges on governance outcomes,
  - Chapter 5 merges paired Chapter 4 outcomes.

### Risks

- Scope moved from PR1’s stated Chapter 2 focus into Chapter 3/4/5 routing and content scaffolding quickly, which increases fragility unless tests and quality bars scale at same pace.

### Stabilization Need

- Freeze new route/chapter expansion until late-chapter progression coverage and content quality guardrails catch up.

---

## 2) BMAD/NOM Docs vs Actual Repo Behavior

### Findings

- BMAD/NOM pieces are present and internally linked:
  - `.bmad-core/modules/nom/README.md`
  - script `scripts/bmad-nom-review.mjs`
  - command alias `pnpm bmad:nom:review`
  - output target `docs/reviews/CHAPTERS_1_3_AGENT_REVIEW.md`
- `docs/BMAD_WORKFLOW.md` reflects the same runner and output artifact.

### Risks

- NOM report generator currently writes a fixed summary template, not an evidence-collected runtime audit. This can create a false sense of validation if treated as fully dynamic verification.

### Stabilization Need

- Clarify in docs that NOM script currently produces a structured baseline report and should be paired with explicit command/test evidence when used for release gating.

---

## 3) Chapter 2/3/4/5 Continuation Logic Consistency

### Findings

- Continuation selection logic in `chapter-pack-cache.ts` is internally consistent with braided branching intent.
- Tests explicitly verify:
  - Chapter 1 ending → Chapter 2 route,
  - Chapter 2 completion → Chapter 3 route,
  - Chapter 3 governance ending → Chapter 4 divergent route,
  - paired Chapter 4 endings → shared Chapter 5 hub,
  - restore behavior when ending key has advanced beyond prerequisite.

### Risks

- Runtime/UI e2e currently only validates progression through Chapter 3; Chapter 4 and Chapter 5 are covered mainly at manifest function level.
- Completion flag compatibility still carries dual naming forms (kebab + camel), indicating schema migration debt still active.

### Stabilization Need

- Add deterministic runtime progression tests for Chapter 3 → 4 and 4 → 5 to confirm manifest logic matches actual player flow.

---

## 4) Test Coverage Honesty for New Progression Behavior

### What is covered well

- Chapter pack routing utility behavior (including advanced edge cases).
- Chapter 2 and Chapter 3 duration guardrails.
- Chapter 3 foundation assertions for irreversible split markers and completion writes.
- Chapter 1 narrative pack traversal and route completions.

### What is not yet covered enough

- End-to-end runtime completion and continuation across Chapter 4 and Chapter 5.
- Content quality guardrails for Chapter 4/5 comparable to Ch2/3 standards.

### Honesty assessment

Current tests **honestly cover** early-to-mid progression logic, but they **do not yet fully validate** late-branch runtime behavior despite roadmap expansion.

---

## 5) CI Reliability Assessment

### Findings

- Workflow structure is strong: separate lint, unit-tests, build, storybook, and e2e jobs.
- E2E job runs in official Playwright container, improving CI determinism.
- Build currently succeeds in this review run.

### Risks

- Local `pnpm test:e2e` is not self-sufficient without installed browsers, causing developer friction and potential confusion.

### Stabilization Need

- Add a local preflight e2e note/script path that defaults to dockerized e2e or validates browser install first.

---

## 6) Generated / Filler Content Quality Check

### Findings

- Word-count sampling indicates large narrative-depth asymmetry:
  - Chapter 2 packs: ~3,000 words each,
  - Chapter 3 packs: ~5,900–6,100 words each,
  - Chapter 4 packs: ~283 words each,
  - Chapter 5 packs: ~183–204 words each.
- Chapter 4 and Chapter 5 packs read as structural scaffolds (policy framing + 2 choices + immediate close), not parity content with declared route complexity.

### Risks

- If treated as feature-complete narrative progression, this is effectively filler-level depth and may create product quality whiplash.
- It can also hide genuine pacing or continuity defects because tests only assert structural completion, not narrative sufficiency.

### Stabilization Need

- Add explicit “content maturity level” metadata per chapter pack (e.g., scaffold vs production-ready) and corresponding QA gates.

---

## 7) Scope Creep / Architecture Brittleness Review

### Findings

- Some scope creep occurred (Chapter 2 objective expanded into Chapter 3+ branching infrastructure and content stubs).
- Architecture remains serviceable, but progression metadata (titles/routes) and UI continuation copy are still partly embedded in `SceneRenderer`, which can become brittle as branches multiply.

### Risks

- Continued expansion without extracting progression domain logic may increase coupling and regression rate.

### Stabilization Need

- Isolate progression presentation/model metadata from UI component layer before adding more route families.

---

## Blockers (Before Next Feature PR)

### Blocker 1: Late-chapter runtime progression is not e2e-validated

- Evidence: e2e spec currently verifies full runtime flow only through Chapter 3; Chapter 4/5 routing confidence relies mostly on unit-level manifest tests.
- Impact: risk of shipping broken late continuations despite green unit suite.
- Recommended fix: add deterministic e2e/integration checks for Chapter 3→4 and 4→5 continuation paths.
- Priority: Blocker

### Blocker 2: Chapter 4/5 content quality is scaffold-level relative to Chapter 2/3 commitments

- Evidence: chapter-pack word counts show ~283 words for Chapter 4 routes and ~183–204 words for Chapter 5 hubs versus 3k+/5k+ prior route targets.
- Impact: high risk of perceived filler content and product coherence drop.
- Recommended fix: define and enforce chapter-level content maturity policy before exposing as “fully playable progression”.
- Priority: Blocker

---

## High Priority Issues

1. **Make local e2e execution reliable by default** (document/install/dockerized path).
2. **Extract progression metadata from UI component layer** into a domain helper.
3. **Document NOM report limitations** (template output vs evidence-driven audit).
4. **Add chapter maturity labels + release gate checks** for content readiness.

## Medium Priority Issues

1. Harmonize completion-flag naming migration policy and deprecation timeline.
2. Add quick consistency audit script for manifest endings ↔ chapter pack files ↔ route labels.

## Low Priority / Later

1. Introduce richer narrative quality tests (style/pacing linting heuristics) after core progression reliability is locked.

---

## Recommended Next GitHub Issues

### Issue 1: Add deterministic progression tests for Chapter 3→4 and 4→5 runtime continuation

```md
## Goal
Validate late-chapter continuation in runtime flow, not only manifest utilities.

## Background
Current progression tests strongly cover manifest logic but runtime e2e flow stops at Chapter 3.

## Scope
- Add integration/e2e tests for at least one route through Chapter 4 and into Chapter 5.
- Verify continuation CTA, loaded pack ID, and chapter completion state transitions.

## Acceptance Criteria
- Tests fail if Chapter 4/5 continuation routing regresses.
- Tests pass in CI Playwright container.

## Out of Scope
- New narrative content creation.

## Notes
Prefer deterministic fixtures and capped step loops.
```

### Issue 2: Introduce chapter-pack content maturity metadata and gating

```md
## Goal
Prevent scaffold-level packs from being represented as production-ready narrative content.

## Background
Chapter 4/5 packs are structurally valid but much shorter than Chapter 2/3 route depth.

## Scope
- Add maturity field (e.g., scaffold, beta, production) in chapter-pack metadata.
- Surface maturity status in docs and optional dev UI/debug output.
- Add release checklist gate for production-tagged chapters.

## Acceptance Criteria
- Every chapter pack has explicit maturity level.
- Release checklist references maturity gate.

## Out of Scope
- Expanding chapter text itself.

## Notes
Align with PM/QA expectations.
```

### Issue 3: Extract progression presentation metadata from SceneRenderer

```md
## Goal
Reduce UI-domain coupling and improve maintainability for branching scale.

## Background
SceneRenderer currently owns chapter title mapping and part of continuation presentation logic.

## Scope
- Move progression labels/maps/helpers to a dedicated domain module.
- Keep player-facing behavior unchanged.

## Acceptance Criteria
- SceneRenderer consumes extracted metadata/helpers.
- Unit tests validate mapping and fallback behavior.

## Out of Scope
- New chapter routes or content.

## Notes
Should be low-risk refactor.
```

### Issue 4: Clarify BMAD NOM script behavior and evidence requirements

```md
## Goal
Ensure BMAD/NOM outputs are interpreted correctly in release decisions.

## Background
Current NOM runner writes a fixed structured report template, which may be mistaken for a live evidence pass.

## Scope
- Update BMAD docs to distinguish template report generation vs command-backed audit evidence.
- Add required evidence checklist for stabilization reviews.

## Acceptance Criteria
- Docs clearly state NOM output semantics.
- Review template includes commands and outcomes table.

## Out of Scope
- Rewriting NOM module architecture.

## Notes
Documentation-only change.
```

### Issue 5: Standardize local e2e preflight (browser install vs docker)

```md
## Goal
Remove ambiguity around local e2e failures caused by host setup.

## Background
`pnpm test:e2e` currently fails in environments without Playwright browser binaries.

## Scope
- Document recommended default local path.
- Add preflight note or wrapper command to detect/install prerequisites.

## Acceptance Criteria
- Contributors can run e2e with one documented reliable flow.
- Error messaging clearly separates infra vs app failures.

## Out of Scope
- New test scenarios.

## Notes
Keep parity with CI container image strategy.
```

---

## Recommended PR2 Scope (Stabilization)

**Goal**
- Lock progression reliability and quality signaling before further feature expansion.

**Include**
- Late-chapter progression test additions (3→4→5).
- Content maturity metadata + docs/release-gate alignment.
- NOM doc clarification and local e2e preflight clarity.
- Small refactor extracting progression metadata from UI component.

**Exclude**
- New chapters/routes/content expansion.
- Major architecture rewrites.
- New BMAD modules or large tooling additions.

## Final Recommendation

**Ready for PR2 stabilization work only.**

Merged scope is coherent enough to stabilize, but not yet robust enough for another feature-heavy PR without raising regression and quality risks.
