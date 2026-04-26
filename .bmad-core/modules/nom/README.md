# BMAD NOM Module

NOM (Narrative Operations Matrix) is the execution module used to run cross-agent chapter reviews efficiently.

## Install status
- Module is vendored in-repo under `.bmad-core/modules/nom`.
- Review runner is available at `scripts/bmad-nom-review.mjs`.
- Root script alias: `pnpm bmad:nom:review`.

## Workflow
1. Product + Producer: confirm chapter scope and acceptance targets.
2. Architect + Narrative: validate state keys, branch integrity, and pacing.
3. UI + Backend: validate chapter loading, persistence, and route continuity.
4. QA + Growth: validate tests, playtime guardrails, and player-facing expectations.

The command writes `docs/reviews/CHAPTERS_1_3_AGENT_REVIEW.md` for auditability.
