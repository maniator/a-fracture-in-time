# Fractureline BMAD Launch Workflow

## Phase 1: Product Direction
Owner: Product Manager Agent

Inputs:
- docs/PRD.md
- docs/STORY_BIBLE.md

Outputs:
- MVP scope updates
- backlog updates
- risk updates

## Phase 2: Technical Foundation
Owner: Architect Agent

Inputs:
- docs/ARCHITECTURE.md
- packages/shared-types
- packages/narrative-engine

Outputs:
- package boundary decisions
- save/versioning strategy
- deployment constraints

## Phase 3: Narrative Build
Owner: Narrative Designer Agent

Inputs:
- docs/NARRATIVE_SCHEMA.md
- docs/STORY_BIBLE.md

Outputs:
- scene graphs
- codex entries
- variable impact notes

## Phase 4: Implementation
Owners: UI Agent and Backend Agent

Inputs:
- app scaffold
- engine contracts
- task board

Outputs:
- MUI app pages
- PWA behavior
- persistence services
- Storybook stories

## Phase 5: Verification
Owner: QA Agent

Inputs:
- docs/TEST_STRATEGY.md
- docs/E2E_TESTING.md
- GitHub workflows

Outputs:
- unit test coverage
- Playwright coverage
- release gate findings

## Phase 6: Growth and Release
Owners: Growth Agent and Producer Agent

Inputs:
- analytics hooks
- release checklist
- next steps

Outputs:
- onboarding improvements
- replayability recommendations
- release notes

## Handoff Rule
Each agent must update the relevant docs when its work changes implementation assumptions.
