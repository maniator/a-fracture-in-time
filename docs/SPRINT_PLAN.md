# Sprint Plan

## Delivery Philosophy
Build vertical slices, not isolated systems. Each sprint should end with a playable increment.

## Sprint 0: Foundation
- Initialize pnpm monorepo
- Create Next.js app
- Configure Tailwind, ESLint, Prettier, and Vitest
- Create narrative-engine package
- Add GitHub Actions CI
- Define shared types
- Create placeholder docs

### Exit Criteria
Repo boots, tests run, lint passes, and CI is green.

## Sprint 1: Core Reading Experience
- Build game shell
- Render scene text
- Show speaker metadata
- Add animated text reveal
- Render 2-4 choices
- Wire choices to narrative-engine
- Mobile-first layout

### Exit Criteria
Player can progress through a small static chapter locally.

## Sprint 2: Timeline Logic
- Implement condition evaluator
- Implement effect resolver
- Add POV switching
- Add codex/history panel
- Add chapter progression hooks
- Validate scene graph loading

### Exit Criteria
Branching and variable-driven scene resolution works reliably.

## Sprint 3: Persistence
- Add local save/load/resume
- Version save schema
- Prepare Supabase service boundary
- Add save corruption fallback behavior

### Exit Criteria
Player can leave and resume progress without corruption.

## Sprint 4: Chapter 1 Production Slice
- Write Chapter 1 narrative
- Polish UI
- Add ambient audio toggle placeholder
- Add basic analytics event boundaries
- Add first replay path

### Exit Criteria
Chapter 1 is complete, polished, and testable end to end.

## Sprint 5: Full MVP Narrative Expansion
- Draft and integrate chapters 2-10
- Implement endings
- Codex unlock rules
- Choice history summary
- Tune pacing and branching clarity

### Exit Criteria
Full campaign playable start to finish.

## Sprint 6: QA and Release Prep
- Test matrix
- Bug bash
- Accessibility pass
- Performance pass
- Copy polish
- Deploy preview and production

### Exit Criteria
Release checklist complete and acceptable stability confirmed.
