# Writing Standards: Fractureline

All agents that produce narrative prose, player-facing copy, documentation, or scene content must follow these standards. This is the canonical reference.

---

## No Em Dashes

**Never use em dashes (—) in any narrative prose, scene content, or player-facing copy.**

Em dashes are a strong signal of AI-generated text and undermine the authenticity of the author's original voice. Use natural punctuation instead:

| Instead of | Use |
|---|---|
| Mid-sentence aside `— like this —` | A comma pair: `, like this,` |
| Label separator `Community log — Name:` | Comma or colon: `Community log, Name:` |
| Title separator `Chapter 4 — Subtitle` | Period: `Chapter 4. Subtitle.` |
| List/clarification intro `items — everything except` | Colon: `items: everything except` |
| Sentence break `exposed—it reorganizes` | Period and new sentence: `exposed. It reorganizes.` |

This rule applies to:
- All `.ink` chapter files
- All scene text in TypeScript content files
- All player-facing copy (landing page, help, briefing, codex entries)
- All documentation that will be read by players or used as narrative reference

Em dashes are permitted in agent instruction files and internal technical docs only.

---

## Scene Transitions Must Flow

Every scene that follows a player choice must open with grounding prose before advancing the plot. Readers should always feel the connective tissue between where they were and where they land.

**Required for every destination scene after a choice:**
- At minimum one sentence that acknowledges the preceding moment, grounds the setting, or carries the emotional beat forward
- Physical details, time markers, or character reactions all work
- Do not open mid-action with no setup

**Avoid:**
- Jumping straight to new dialogue with no orientation
- Opening a new POV with no acknowledgment that the perspective has shifted
- Skipping over the passage of time without a single marker

---

## Prose Voice

- Write in the POV character's established voice: the shipped chapters use close first-person ("I sat under the blueleaf trees…"). Close third-person or intimate second-person are also valid where the chapter already uses them. Never switch POV convention mid-chapter.
- Prefer concrete, specific detail over abstract statement
- Avoid repetition of the same sentence structure in consecutive paragraphs
- Avoid over-explaining; trust the reader to carry emotional weight
- Dialogue should feel earned, not expository

---

## Chapter Duration

Every Chapter 2+ route must target a **20–30 minute** play session:
- Minimum: 3,000 words at ~150 WPM (20 min) — enforced by duration tests for Chapters 2–3; Chapters 4+ should follow the same floor
- Maximum guideline: 4,500 words at ~150 WPM (30 min) — routes over this are flagged for pacing review

---

## Agent Git Workflow

All agents working in this repository follow the same git convention:

- **Sub-agents CAN commit** changes locally using `git add` and `git commit`
- **Sub-agents CANNOT push** to GitHub — `git push` is reserved for the root agent only
- The root agent uses the `report_progress` tool to push all commits to the remote branch
- When you finish your work, commit locally and report that the work is done — do not attempt `git push` or `gh` push commands
