# Test Strategy

## Goals
Ensure narrative correctness, save integrity, UI accessibility, and regression resistance.

## Test Pyramid

### Unit Tests
- Condition evaluator
- Effect resolver
- Scene progression
- Serializer/deserializer
- Graph validation

### Integration Tests
- Full scene traversal for chapter fixtures
- Save/load with real state payloads
- Codex unlock behavior
- Ending determination

### E2E Tests
- Start new game
- Make choices and progress chapter
- Save and resume
- Reach each ending path via fixture state
- Reduced motion and keyboard navigation flows

## Manual Test Areas
- Readability on small screens
- Branch clarity
- Contradiction reveals land correctly
- Resume flow from interrupted sessions
- Emotional pacing and choice comprehension

## Special Risk Tests
- Invalid scene references
- Impossible condition branches
- State key typos
- Duplicate scene ids
- Partial save payloads
- Future schema version mismatch
