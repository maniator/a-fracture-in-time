# Product Requirements Document

## Product Name
Fractureline

## Vision
Create a haunting, replayable, emotionally intelligent narrative web game where every choice feels consequential because each protagonist exists inside a reality rewritten by the other.

## Target Audience
- Players who enjoy narrative-heavy games
- Fans of branching fiction, mystery, time travel, and moral ambiguity
- Mobile and desktop web users

## Product Pillars

### Consequence
Choices must have visible or discoverable downstream effects.

### Dual Perspective
Both protagonists must feel valid, intelligent, and emotionally compelling.

### Mystery Through Contradiction
The game should create doubt about what is true, remembered, or manufactured.

### Replayability
Multiple endings and hidden scene variants should reward replays.

## Core Loop
Read scene -> choose action -> apply state change -> switch POV or advance -> unlock altered scene -> continue.

## MVP Scope
- 1 playable campaign
- 10 chapters total
- 2 protagonists
- 5 core timeline variables
- Save/load
- Codex or memory log
- 3 endings
- Responsive UI
- Basic analytics hooks

## Core Mechanics
- Branching scene graph
- Conditional choices
- **Free-form text inputs** (planned: select paths accept open-ended player responses instead of pre-set choices)
- Timeline variables
- POV alternation
- Altered memories and contradiction reveals
- Save state persistence
- Ending determination based on accumulated state

## Functional Requirements

### Narrative
- Scenes support speaker, body text, choices, conditions, and effects.
- Scenes can be hidden or replaced based on state.
- Chapters can force POV switching.
- Endings are selected via deterministic condition resolution.
- **Free-form text inputs** (planned): select scenes present an open-ended text prompt instead of choice buttons. Player responses are persisted, may be echoed in later scenes, and may optionally influence state flags.
- All chapters after Chapter 1 must target a **20–30 minute** play session (**3,000–4,500 words** at ~150 WPM).

### UI
- Readable text-first interface
- Animated text reveal with reduced-motion fallback
- Accessible choice buttons
- **Free-form text input component** (planned): text field with prompt, character limit, and submit action for open-ended player responses
- Codex/history panel
- Save/load menu
- Mobile-first layout

### Persistence
- Anonymous local-first progress for MVP
- Future Supabase-backed save support
- Resume from latest save
- Track completed endings

### Analytics
- Chapter starts and completions
- Choice selection frequency
- Session length
- Ending reached
- Drop-off scene

## Non-Functional Requirements
- Fast load on mobile
- Accessible keyboard navigation
- Stable save serialization
- Deterministic branching resolution
- Testable narrative engine

## Out of Scope for MVP
- Combat mechanics
- Fully procedural narrative generation
- Multiplayer
- Voice acting pipeline
- Browser-based narrative editor

## KPIs
- Average session length greater than 15 minutes
- Chapter 1 completion greater than 70%
- Full campaign completion greater than 40%
- Replay rate greater than 20%
- Day-7 return rate greater than 15%

## Risks
- Branching complexity becomes unmanageable
- Narrative inconsistency across timelines
- Save corruption from schema changes
- Strong premise but weak moment-to-moment pacing
- Too much state opacity for players to understand impact
