# BMAD Workflow

## Purpose
Define how agents collaborate without stepping on each other.

## Core Rule
Every agent must consume prior artifacts before producing new ones.

## Order of Operations

### Phase 1: Direction
1. Product Manager reads concept and writes backlog, scope, KPIs, and risks.
2. Producer converts backlog into sprint-sequenced workstreams.

### Phase 2: Foundation
3. Architect defines system boundaries and data contracts.
4. Backend defines persistence model from architecture.
5. Frontend defines component plan from architecture and PRD.

### Phase 3: Content
6. Narrative agent creates chapter outlines and schema-valid scene graphs.
7. Architect or engine agent validates narrative content against engine constraints.

### Phase 4: Build
8. Frontend and backend implement in parallel.
9. Narrative content is integrated into fixtures and content loaders.

### Phase 5: Validate
10. QA agent builds automated and manual plans.
11. Producer runs acceptance review against PRD and sprint goals.

### Phase 6: Optimize
12. Growth agent reviews funnel, replayability, and analytics instrumentation.

## Required Handoffs

### PM -> Architect
- PRD
- Priorities
- Non-goals
- KPI expectations

### Architect -> Frontend/Backend
- Contracts
- Data model
- State boundaries
- Testing expectations

### Narrative -> Frontend/QA
- Scene graph schema
- Required UI behaviors
- Critical reveal points
- Branch expectations

### Backend -> QA
- Save/load assumptions
- Schema version behavior
- Failure scenarios

## Artifact Rules
- Every artifact must include assumptions.
- Every artifact must list unresolved questions.
- Every technical artifact must define acceptance criteria.
- Every narrative artifact must identify state keys touched.

## Review Cadence
- Sprint kickoff: scope and dependencies
- Mid-sprint: blockers and artifact alignment
- Sprint close: demo, acceptance check, and doc refresh

## Current Repo Review Checklist (Applied)
- Product Manager: confirm chapter progression goals and Chapter 2 unlock UX copy.
- Producer: verify delivery includes docs refresh, tests, and workflow health.
- Architect: ensure chapter pack loading and ending-based routing stay contract-safe.
- Backend: verify local save/load behavior remains compatible across chapter transitions.
- UI Agent: validate play page presents Chapter 2 continuation clearly after Chapter 1 endings.
- Narrative Designer: check route naming and chapter labels match chapter-pack canon.
- QA: update tests for current story content and chapter progression behavior.
- Growth: keep player-facing copy focused on world/characters and replayable route clarity.
