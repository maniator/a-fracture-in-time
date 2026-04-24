# BMAD Core

This directory contains the BMAD operating structure for Fractureline.

## Agent Files
Agent definitions live in `.bmad-core/agents` and mirror the docs in `docs/AGENT_PROMPTS.md`.

## Workflow Files
Workflow sequencing and handoff rules live in `.bmad-core/workflows`.

## Usage
1. Start with the Product Manager agent to refine scope.
2. Use the Producer agent to sequence work.
3. Use Architect, Narrative, Frontend, Backend, QA, and Growth agents for specialized execution.
4. Keep generated implementation tasks synchronized with `docs/TASK_BOARD.md` and `docs/NEXT_STEPS.md`.
