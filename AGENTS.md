# Fractureline — Copilot Agent Guide

## Bootstrap (run at the start of every session)

```bash
pnpm codex:bootstrap
```

This installs the Playwright Chromium binary if missing, so `pnpm test:e2e` works immediately.

## Common Commands

```bash
pnpm install          # install all workspace dependencies
pnpm lint             # lint all packages
pnpm test             # run all unit tests
pnpm test:coverage    # unit tests with coverage thresholds (>90%)
pnpm test:e2e         # Playwright e2e (requires codex:bootstrap first)
pnpm build            # Next.js production build
pnpm storybook        # component style guide dev server
pnpm bmad:nom:review  # cross-agent chapter audit → docs/reviews/
```

---

## BMAD Agent Routing

When working on a task, activate the agent that owns it. Each agent definition embeds its full project context.

### How to activate an agent

In GitHub Copilot: type `@` and select the agent by name, or reference `.github/agents/<agent>.md` directly.

| Agent | File | Activate when you need to… |
|---|---|---|
| **Product Manager** | `.github/agents/product-manager.md` | Update backlog, refine MVP scope, revise KPIs or risk register |
| **Producer** | `.github/agents/producer.md` | Sequence work, map dependencies, run acceptance review |
| **Architect** | `.github/agents/architect.md` | Change package boundaries, update data model, handle deployment constraints |
| **Narrative Designer** | `.github/agents/narrative-designer.md` | Write chapter scenes, plan branches, define merge hubs |
| **UI Agent** | `.github/agents/ui.md` | Build React components, add routes, write Storybook stories |
| **Backend Agent** | `.github/agents/backend.md` | Change save schema, add analytics events, plan Supabase adapter |
| **QA Agent** | `.github/agents/qa.md` | Write tests, audit branch coverage, produce release gate checklist |
| **Growth Agent** | `.github/agents/growth.md` | Improve onboarding, replayability, analytics dashboard spec |

---

## BMAD Workflow Order

```
Phase 1 → Product Manager defines scope + Producer sequences it
Phase 2 → Architect locks contracts + Backend defines persistence
Phase 3 → Narrative Designer authors scenes (validated by Architect)
Phase 4 → UI Agent + Backend Agent build in parallel
Phase 5 → QA Agent validates everything
Phase 6 → Growth Agent + Producer run acceptance review
```

**Core rule**: every agent reads prior artifacts before producing new ones.

---

## Key Standards (all agents must honour these)

### Chapter Duration
All chapters after Chapter 1 must target a **20–30 minute** play session:
- Floor: **3,000 words** at ~150 WPM (≈ 20 min) — enforced by duration tests
- Target ceiling: **4,500 words** at ~150 WPM (≈ 30 min) — routes above this are flagged for pacing review

### Free-Form Text Inputs (planned)
Select paths will accept open-ended player-written text instead of pre-set choice buttons.
- Requires Architect sign-off on schema before any agent implements
- Planned fields: `freeFormPrompt` on scene, `playerNotes: Record<string, string>` in `TimelineState`
- See `docs/NARRATIVE_SCHEMA.md` for the draft contract

### Braided Branching
- Max one irreversible split per route segment between merge hubs
- Max two active branch families per chapter depth
- Every new split requires a planned merge hub before implementation

---

## MCP Servers

`.vscode/mcp.json` configures two MCP servers for VS Code Copilot:

| Server | Use for |
|---|---|
| `github` | PR review, issue tracking, CI status (Producer + QA) |
| `playwright` | Browser automation, visual testing (QA + UI) |

GitHub Copilot coding-agent sessions are pre-configured via `.github/workflows/copilot-setup-steps.yml`, which installs Node 22, pnpm, all workspace dependencies, and the Playwright Chromium binary before Copilot starts.

---

## Repository Map

```
apps/web/                   Next.js app (routes, components, store, content)
packages/narrative-engine/  Pure branching logic (no framework imports)
packages/shared-types/      Shared TypeScript contracts
.github/agents/             Copilot agent personas (BMAD roles)
.github/workflows/          CI jobs + copilot-setup-steps.yml
.bmad-core/agents/          Full BMAD agent definitions
.bmad-core/workflows/       Launch workflow and handoff order
.bmad-core/modules/nom/     NOM cross-agent review runner
docs/                       PRD, architecture, narrative schema, QA, deployment docs
```

