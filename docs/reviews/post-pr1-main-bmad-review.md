# Post-PR1 Main Branch BMAD Review

## Review Metadata

- Repository: `maniator/a-fracture-in-time` (target from prompt; local clone has no `origin` remote configured, so this could not be re-verified from Git metadata)
- Branch reviewed: `work` (requested `main` was not available locally)
- Latest commit reviewed: `4765be07574400d772f04785f1d886557c13a2e6`
- PR1 merge status: **Partially verifiable only**. A likely corresponding commit exists in history (`fc5fedc feat: surface chapter 2 continuation and align workflow tests`), but no remote/main tracking exists to confirm merge state on `origin/main`.
- Review date: 2026-04-26 (UTC)
- Reviewer: Codex (GPT-5.3-Codex)
- Package manager: pnpm (`pnpm@10.0.0`)
- Primary app/package paths:
  - `apps/web`
  - `packages/narrative-engine`
  - `packages/shared-types`
  - `.bmad-core`
  - `docs`

## Executive Summary

The repository is in generally strong working shape for local lint, unit tests, and production build, and the Chapter continuation architecture has progressed to Chapters 4-5 with route-gated pack selection. However, this is **not a valid strict post-PR1-main review run** because the local checkout is on `work`, not `main`, and has no configured remote tracking to confirm PR1 merge status exactly as requested.

Within those constraints, repo quality is good for iterative stabilization, but readiness for a feature-forward PR2 depends on resolving two reliability blockers first: (1) repeatable preflight branch/remote verification in contributor workflow, and (2) deterministic local E2E execution environment (Playwright browsers missing in this environment).

Recommendation: **Ready for PR2 stabilization work only** until preflight branch verification and E2E reliability expectations are normalized.

## Commands Run

| Command | Result | Notes |
|---|---|---|
| `git status --short` | Pass | Clean tracked tree before review actions; later transient tsbuildinfo files appeared from lint/test commands. |
| `git branch --show-current` | Pass | Returned `work` (not `main`). |
| `git remote -v` | Pass | No remotes returned. |
| `git pull --ff-only` | Fail (preflight limitation) | Failed because no tracking branch configured for `work`. |
| `git log --oneline -n 15` | Pass | Showed recent history including continuation and gating fixes. |
| `git branch --contains HEAD` | Pass | Returned only `work`. |
| `git show --stat --oneline HEAD` | Pass | Showed latest chapter-4 knot identifier fix. |
| `ls` | Pass | Confirmed monorepo top-level structure. |
| `find . -maxdepth 3 -type f | sort | sed 's#^./##' | head -200` | Pass | Confirmed BMAD docs, apps, packages, CI, supabase planning files. |
| `cat package.json` | Pass | Confirmed pnpm and top-level scripts. |
| `cat apps/web/package.json` | Pass | Confirmed Next.js, Playwright, Vitest scripts. |
| `cat packages/narrative-engine/package.json` | Pass | Confirmed engine test/lint setup. |
| `corepack enable` | Pass | Corepack available. |
| `pnpm install --frozen-lockfile` | Pass | Already up to date. |
| `pnpm lint` | Pass | All workspace lint/typecheck steps passed. |
| `pnpm test` | Pass | Unit/integration suites passed (including chapter and cache/save tests). |
| `pnpm build` | Pass | Next.js production build completed successfully. |
| `pnpm test:e2e` | Fail (environment setup) | All tests failed because Playwright Chromium executable was not installed in this environment (`pnpm exec playwright install` required). |

## BMAD Agent Execution Checklist

| Agent | Completed | Key Output |
|---|---:|---|
| bmad-orchestrator | Yes | Cross-agent alignment, dependency ordering, readiness call |
| bmad-master | Yes | BMAD process health and artifact-handoff quality |
| analyst | Yes | Product clarity and narrative-direction risk review |
| pm | Yes | MVP/PR2 scope and acceptance-criteria readiness |
| architect | Yes | Package boundaries, runtime coupling, persistence trajectory |
| ux-expert | Yes | User flow clarity, chapter continuation UX, accessibility gaps |
| po | Yes | Backlog conversion quality and DoD proposal |
| sm | Yes | Delivery risk and sprint slicing recommendations |
| dev | Yes | Code quality, coupling, maintainability observations |
| qa | Yes | Test and CI health with command evidence |

## bmad-orchestrator Review

### Findings
- All requested perspectives were executed and synthesized.
- Strong overlap exists between architect/dev/qa on reliability risk concentration around continuation-state complexity and environment-sensitive E2E setup.
- PM/PO/SM all converge on narrowing PR2 to stabilization and acceptance-hardening, not broad feature expansion.

### Risks
- Preflight validity risk: inability to prove review target was `main` with PR1 merged as requested.
- If feature velocity continues without tightening continuation contracts/tests, chapter route regressions become increasingly expensive.

### Recommendations
- Treat preflight verification as a release-gate checklist item (branch, remote, merge evidence).
- Run a stabilization-focused PR2 before adding large narrative scope.

## bmad-master Review

### Findings
- BMAD structure exists and is documented (`.bmad-core`, `docs/BMAD_WORKFLOW.md`) with explicit sequencing and handoffs.
- Repo-level BMAD roster in docs emphasizes 8 agents (PM/Architect/Narrative/UI/Backend/QA/Growth/Producer), while this review request required a 10-agent classic roster.
- Existing docs show strong cross-linking among PRD, architecture, task board, sprint plan, and next steps.

### Risks
- Dual BMAD framing (repo-native 8-agent vs requested 10-agent schema) can cause handoff ambiguity unless mapping is made explicit.
- Some planning docs remain high-level checklist style and lack testable acceptance details per task.

### Recommendations
- Add one explicit BMAD role-mapping table in workflow docs for alternate nomenclature.
- Upgrade key task-board items into acceptance-criteria-backed issue templates.

## analyst Review

### Findings
- Product concept is communicated clearly in README + PRD: dual-perspective, consequence-forward narrative loop.
- Character and route identity (Xav, Yve, Zelda, signal/family/history) is surfaced consistently in UI tests and chapter pack naming.
- Repository now extends beyond Chapter 2 continuation into Chapters 3-5 route structure, indicating direction continuity.

### Risks
- Terminology drift: docs mention protector/dissenter in some places while runtime types/UI model use past/future labels, potentially confusing product communication.
- Product framing emphasizes contradiction/mutual timeline causality, but explicit player-facing causality feedback remains subtle and mostly inferred from stats/endings.

### Recommendations
- Standardize narrative role naming in docs and UI labels.
- Add explicit “why this route unlocked” messaging and stronger cause/effect recap affordances before PR2 feature expansion.

## pm Review

### Findings
- Core scripts and architecture support a playable vertical slice and continuation model.
- Current roadmap docs include broad milestones, but many scope items are not yet issue-ready with measurable acceptance.
- From delivery evidence, stabilization of chapter progression + quality gates is higher value than immediate new feature breadth.

### Risks
- Without tightening acceptance criteria per chapter progression behavior, future branch additions increase regression risk.
- E2E environment dependency can mask actual product health if not normalized across dev/CI expectations.

### Recommendations
- Scope PR2 as stabilization: continuation contract hardening, route unlock assertions, and deterministic E2E execution guidance.
- Defer non-critical feature additions (new systems, Supabase runtime integration) until quality gates are predictable.

## architect Review

### Findings
- Monorepo boundaries are mostly clear: shared types, framework-agnostic narrative engine, app runtime and persistence in web package.
- Chapter packs are treated as data in `public/chapter-packs`, with manifest-driven pack resolution and dependency by ending keys.
- Persistence direction remains correctly local-first with optional future Supabase boundary.

### Risks
- UI-level mapping table for chapter titles mirrors manifest semantics, creating duplication risk when packs/routes scale.
- State derivation depends on ad hoc variable names from ink snapshots; drift risk increases with chapter count.
- Some architecture docs reference protector/dissenter while runtime uses past/future POV labels.

### Recommendations
- Centralize chapter metadata (title/chapter/route/dependency) into one source consumed by both UI and progression logic.
- Add stronger schema/version validation for runtime Ink variable expectations.
- Capture an ADR for “continuation metadata ownership and chapter-pack contract evolution” before PR3.

## ux-expert Review

### Findings
- First-run and loading states are present with clear in-flow messaging.
- Continue-to-next-chapter CTA is integrated into completion alert and shows unlocked chapter title.
- Choice list, save/load/restart controls, and chapter chips provide useful orientation.

### Risks
- Current chapter completion messaging can still be cognitively heavy for first-time users (multiple chips + metric panel + codex in one frame).
- POV labeling (“Past/Future”) may be less intuitive than character-based or role-based continuity cues.
- No evidence yet of explicit empty/error microcopy coverage beyond generic retry messages.

### Recommendations
- Add concise “route unlocked because …” secondary text in completion module.
- Add explicit visual hierarchy for speaker vs timeline vs chapter vs ending.
- Expand screenshot/visual regression coverage to key continuation states (Chapter complete with/without unlock, offline missing pack, load-failure state).

## po Review

### Findings
- There is enough structure to convert current stabilization needs into concrete backlog items.
- Existing docs describe workstreams but often as bullet tasks without strict pass/fail acceptance framing.

### Risks
- Ambiguous task phrasing can create inconsistent implementation by different coding agents.
- Definition of Done is implied, not explicit per issue class.

### Recommendations
- Adopt issue template with Goal/Background/Scope/Acceptance/Out-of-scope/Notes for all PR2 tasks.
- Define DoD baseline: lint+unit+build pass, changed behavior covered by tests, docs updated when contracts change.

## sm Review

### Findings
- Work has been shipped incrementally across multiple focused commits.
- Technical trajectory indicates prudent stabilization commits around continuation gating and restore behavior.

### Risks
- Starting large feature PR2 before stabilizing continuation contracts may cause sprint spillover.
- E2E environment fragility can block predictable sprint closure unless standardized.

### Recommendations
- Next sprint should prioritize 1-week stabilization slice: continuation contract consolidation, test hardening, docs alignment.
- Sequence: (1) contract clarity, (2) test uplift, (3) UX copy polish, then feature additions.

## dev Review

### Findings
- TypeScript and package organization are generally clean; lint/typecheck and tests pass for unit/build paths.
- Narrative engine remains pure and framework-agnostic, while web store handles runtime concerns.
- Continuation and restore code includes sensible safeguards for invalid choice indices and missing chapter packs.

### Risks
- Metadata duplication (`chapterTitleByPackId` in renderer vs manifest data in chapter-pack cache) will become maintenance debt.
- Some global mutable runtime state in store module (active pack/source/story singletons) complicates parallelism and test isolation over time.
- Generated build/test artifacts can appear during local runs; hygiene depends on `.gitignore` and cleanup discipline.

### Recommendations
- Move chapter-title metadata into manifest and derive UI labels from shared data.
- Encapsulate active-story runtime context behind a small service object to reduce module-global state coupling.
- Add lightweight invariants/tests for chapter-pack metadata coherence.

## qa Review

### Findings
- Lint, unit tests, and build all pass locally.
- E2E command fails entirely in this environment due to missing Playwright browser binaries, not due to app assertion failures.
- CI includes dedicated jobs for lint/unit/build/storybook/e2e and artifact uploads.

### Risks
- Local inability to run Playwright by default can reduce developer confidence in pre-PR checks unless clearly documented and scripted.
- As chapter count grows, branch-route progression coverage needs stronger deterministic path fixtures.

### Recommendations
- Add explicit local bootstrap command (`pnpm exec playwright install`) to README/E2E docs near test command examples.
- Add route progression matrix tests for Chapter 1->2->3 and Chapter 3->4->5 unlock transitions.
- Keep CI e2e in container (already present) and ensure local fallback path remains documented.

## Cross-Agent Synthesis

Top shared concerns:
1. Preflight reproducibility (branch/remote/merge proof) and command evidence discipline.
2. Continuation metadata and route-unlock logic maintainability as chapters expand.
3. E2E determinism and environment bootstrapping clarity.
4. Documentation/acceptance criteria specificity for PR2-ready issue slicing.

Conflicts between recommendations:
- Minor tension between fast feature continuation and stabilization-first discipline.

Resolution:
- Prioritize stabilization PR2 with narrow scope and explicit acceptance gates, then resume feature expansion.

Dependency order for next work:
1. Contract/metadata consolidation.
2. Test matrix extension and local E2E bootstrap clarity.
3. UX copy polish for route unlock feedback.
4. Additional content/feature increments.

## Blockers

### Blocker: Review target preflight cannot be fully verified against `main`

- Evidence: local branch is `work`; no `main` checkout in this clone and no remotes configured; `git pull --ff-only` failed for missing tracking.
- Impact: strict “post-PR1 merged to main” audit validity cannot be guaranteed.
- Recommended fix: require contributor preflight to set upstream remote and run review from `main` with explicit merge commit evidence.
- Suggested owner agent: bmad-orchestrator / producer
- Suggested priority: Blocker

### Blocker: Local E2E suite cannot execute without Playwright browser install step

- Evidence: `pnpm test:e2e` failed 32 tests immediately with missing Chromium executable and install guidance.
- Impact: developers may incorrectly interpret environment setup failures as product regressions; reduces local confidence gate.
- Recommended fix: document/bootstrap Playwright browser install in local setup and optionally add script guard/check.
- Suggested owner agent: qa / dev
- Suggested priority: Blocker

## High Priority Issues

### High Priority: Consolidate chapter metadata into one canonical source

- Evidence: chapter titles are duplicated in renderer while chapter routing metadata is separately defined in chapter-pack manifest.
- Impact: drift risk and inconsistent route labeling as chapters scale.
- Recommended fix: extend manifest with display metadata and use it in renderer and progression UI.
- Suggested owner agent: architect / dev
- Suggested priority: High

### High Priority: Strengthen continuation progression coverage across multi-chapter routes

- Evidence: tests cover several paths and chapter transitions, but chapter growth to 4/5 increases branching combinations.
- Impact: regressions in unlock logic or restore routing could slip into future merges.
- Recommended fix: add deterministic matrix tests for route unlock and restore behavior per ending key.
- Suggested owner agent: qa / dev
- Suggested priority: High

### High Priority: Align terminology for POV roles across docs and runtime

- Evidence: architecture/examples reference protector/dissenter while runtime types/chips use past/future labels.
- Impact: onboarding friction and requirement ambiguity across agents.
- Recommended fix: standardize canonical terms and include mapping table if narrative reasons require both.
- Suggested owner agent: analyst / pm / ux-expert
- Suggested priority: High

## Medium Priority Issues

### Medium Priority: Formalize Definition of Done for BMAD issue handoffs

- Evidence: task/sprint docs are useful but largely checklist style without issue-grade acceptance statements.
- Impact: uneven quality in future delegated implementation.
- Recommended fix: add DoD checklist to docs and issue templates.
- Suggested owner agent: po / bmad-master

### Medium Priority: Reduce module-global runtime state in game store

- Evidence: active story/pack/source use module-scoped mutable variables.
- Impact: potential complexity for concurrent sessions/test isolation.
- Recommended fix: encapsulate runtime state in dedicated service and inject into store.
- Suggested owner agent: dev / architect

## Low Priority / Later

### Later: Introduce Supabase runtime integration

- Evidence: docs clearly position Supabase as optional future sync and planning artifact only.
- Why defer: local-first loop still evolving; stabilization yields higher immediate value.
- Suggested future timing: after continuation contracts and test matrix are stable for Chapter 5 baseline.

### Later: Expand analytics and growth experiments

- Evidence: growth goals are documented but runtime instrumentation remains early-stage.
- Why defer: core progression reliability should precede funnel optimization.
- Suggested future timing: post-stabilization, once route progression defects are low.

## Architecture Review Summary

The monorepo separation is sound and intentionally keeps branching logic in `packages/narrative-engine`, shared contracts in `packages/shared-types`, and runtime/persistence in `apps/web`. Chapter pack progression is manifest-driven and supports route-dependent continuation. Main architecture concern is metadata duplication and implicit runtime variable contracts that need stronger centralization and validation as chapter scale increases.

## Product Alignment Review Summary

The current repo direction remains aligned with the dual-timeline, consequence-heavy text narrative concept. Chapter 1->2 continuation intent is clear and has expanded into broader multi-chapter branching. Product communication would improve by unifying role terminology and making cause/effect feedback more explicit to players.

## UX Review Summary

A new user can enter and play the flow, with clear loading and continuation affordances. However, better route-unlock explanation, stronger POV context cues, and explicit coverage for edge-state microcopy would improve comprehension and confidence.

## Testing Review Summary

Lint, unit tests, and build are healthy locally. E2E failed due to missing browser binaries in this environment; this is an execution-environment setup gap, not direct evidence of app logic failure. Next milestone should focus on deterministic multi-route progression coverage and normalized local Playwright setup.

## CI Review Summary

CI is well structured into separate jobs (lint, unit, build, storybook, e2e) with useful artifact uploads. This is sufficient as a baseline quality gate. Continued value depends on keeping local and CI test environments behaviorally aligned.

## Documentation Review Summary

Documentation coverage is broad and generally coherent (PRD, architecture, BMAD workflow, test strategy, next steps). Main gaps are acceptance specificity and terminology consistency across product/architecture/runtime expressions.

## Security Review Summary

No obvious committed secrets were observed. `.env.example` exists for future Supabase keys and docs correctly frame Supabase as not active in MVP runtime. Primary security concern is operational discipline (maintaining local-first boundaries and avoiding future key leakage when cloud sync is introduced).

## Recommended Next Issues

### Issue 1: Enforce preflight review validity for branch/merge evidence

```md
## Goal
Establish a repeatable preflight checklist that proves reviews are run on `main` after target PR merge.

## Background
Recent review execution lacked remote tracking and could not verify merge state on `origin/main`.

## Scope
- Add preflight checklist section to docs/review workflow.
- Require command output capture for branch, remote, pull, and merge-commit presence.
- Add a lightweight script or documented command bundle.

## Acceptance Criteria
- Review docs include explicit branch+remote+merge evidence.
- A contributor can run one documented preflight command sequence.
- Invalid preflight state is clearly marked as blocker.

## Out of Scope
- Any gameplay/runtime feature work.

## Notes
Owner: bmad-orchestrator / producer.
```

### Issue 2: Unify chapter pack metadata and continuation display labels

```md
## Goal
Remove duplicated chapter title/route metadata and derive continuation UI from one source.

## Background
Chapter title mapping exists in UI while route/chapter dependencies live in manifest data.

## Scope
- Extend chapter pack manifest metadata (title/subtitle if needed).
- Refactor renderer and continuation UI to consume manifest metadata.
- Add regression tests for metadata lookup.

## Acceptance Criteria
- No standalone title map in SceneRenderer.
- Continuation UI labels come from manifest.
- Tests fail if manifest IDs/titles diverge.

## Out of Scope
- Narrative text rewrites.

## Notes
Owner: architect / dev.
```

### Issue 3: Add deterministic route progression matrix tests through Chapters 3-5

```md
## Goal
Increase confidence in continuation and unlock logic as branch count grows.

## Background
Route gating now spans multiple chapters and merged hubs; regression blast radius is increasing.

## Scope
- Add tests covering route unlock transitions for representative ending keys.
- Add restore/resume tests for same-chapter pack resolution.
- Verify chapter completion gating only appears for active chapter.

## Acceptance Criteria
- Matrix includes at least one case per Chapter 2/3/4/5 route family.
- Restore tests confirm no incorrect pack jump.
- Tests run in existing unit/integration suites.

## Out of Scope
- New gameplay mechanics.

## Notes
Owner: qa / dev.
```

### Issue 4: Normalize POV and role terminology across docs and UI

```md
## Goal
Eliminate ambiguity between protector/dissenter and past/future terminology.

## Background
Multiple docs and runtime surfaces use different POV naming conventions.

## Scope
- Define canonical terminology in one documentation source.
- Update docs and UI copy to use canonical terms or explicit mapping.
- Add glossary note to help page.

## Acceptance Criteria
- PRD, architecture, and help docs align on terms.
- UI labels are consistent with documented model.
- New contributor can identify protagonist/timeline mapping unambiguously.

## Out of Scope
- Major narrative redesign.

## Notes
Owner: analyst / pm / ux-expert.
```

### Issue 5: Harden local Playwright bootstrap and E2E developer workflow

```md
## Goal
Make local E2E runs deterministic and reduce setup-related false failures.

## Background
Local `pnpm test:e2e` failed due to missing Playwright browser binaries.

## Scope
- Document browser install step in README + E2E guide.
- Optionally add `pnpm test:e2e:setup` helper command.
- Add troubleshooting section for common browser binary errors.

## Acceptance Criteria
- Fresh environment can run documented commands to execute E2E.
- Error guidance points directly to fix.
- CI/local expectation differences are explicit.

## Out of Scope
- Rewriting E2E assertions.

## Notes
Owner: qa / dev.
```

### Issue 6: Define PR2 stabilization Definition of Done and acceptance template

```md
## Goal
Improve BMAD handoff quality with explicit acceptance and done criteria.

## Background
Current task docs are comprehensive but often checklist-level.

## Scope
- Add DoD checklist for feature, stabilization, and doc-only issues.
- Add issue template sections matching BMAD review expectations.
- Update task board references.

## Acceptance Criteria
- New issues use a standard acceptance template.
- DoD includes lint/test/build + doc updates as applicable.
- Producer/PO can use template directly for sprint planning.

## Out of Scope
- Runtime feature implementation.

## Notes
Owner: po / bmad-master / producer.
```

## Recommended PR2 Scope

- **Goal:** Stabilize continuation contracts and quality gates for multi-chapter progression.
- **Proposed files/areas:**
  - `apps/web/lib/chapter-packs/chapter-pack-cache.ts`
  - `apps/web/components/scene-renderer.tsx`
  - `apps/web/store/game-store.ts`
  - `apps/web/lib/chapter-completion.test.ts`
  - `apps/web/tests/e2e/*` (or related test support)
  - `README.md` and `docs/E2E_TESTING.md`
- **Acceptance criteria:**
  - Chapter metadata consumed from one canonical source.
  - Continuation and restore matrix tests added and passing in unit/integration scope.
  - Local E2E setup instructions allow successful browser bootstrap in a fresh environment.
  - No regression to lint/test/build baseline.
- **Testing expectations:** `pnpm lint`, `pnpm test`, `pnpm build`, and E2E execution in a provisioned Playwright environment.
- **What not to include:** New major systems (cloud sync runtime, new core mechanics, broad UI redesign, large narrative expansion).

## Final Recommendation

**Ready for PR2 stabilization work only.**

Rationale: Core local quality gates (lint/unit/build) are healthy and chapter continuation direction is coherent, but strict post-merge preflight validity and local E2E reproducibility need to be resolved before broader feature work should proceed.
