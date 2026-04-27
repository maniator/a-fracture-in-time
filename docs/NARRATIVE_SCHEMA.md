# Narrative Schema

## Purpose
Provide a single authoring contract for all story content.

## Scene Shape

```json
{
  "id": "ch1_xav_quad",
  "chapter": 1,
  "pov": "past",
  "speaker": "Xav Reivax",
  "text": [
    "The bells did not ring in Lattice unless something had been corrected.",
    "Today they rang three times."
  ],
  "conditions": [],
  "onEnterEffects": [
    { "type": "markSceneSeen", "sceneId": "ch1_xav_quad" }
  ],
  "choices": [
    {
      "id": "observe_crowd",
      "label": "Study the crowd before speaking",
      "effects": [
        { "type": "increment", "key": "stability", "value": 1 }
      ],
      "nextSceneId": "ch1_next_scene"
    }
  ]
}
```

## Free-Form Text Input Scene Shape (planned)

> **Status**: Planned. Do not use until the Architect approves this contract and the engine supports it.

Some scenes will present an open-ended text prompt instead of pre-set choices. The player types a response, which is stored and may appear in later scenes.

```json
{
  "id": "ch2_signal_042",
  "chapter": 2,
  "pov": "past",
  "speaker": "Xav Reivax",
  "text": ["The officer asked you to describe what you saw. In your own words."],
  "freeFormPrompt": {
    "promptKey": "ch2_testimony",
    "placeholder": "Describe what you witnessed...",
    "maxLength": 500
  },
  "onEnterEffects": [
    { "type": "markSceneSeen", "sceneId": "ch2_signal_042" }
  ],
  "choices": [],
  "nextSceneId": "ch2_signal_043"
}
```

- `freeFormPrompt.promptKey` — unique key used to store the response in `TimelineState.playerNotes`.
- `freeFormPrompt.placeholder` — hint text shown in the input field.
- `freeFormPrompt.maxLength` — hard character limit enforced in UI and validated on save.
- `nextSceneId` — still required; free-form input does not fork the scene graph unless an `onSubmitEffects` flag is applied (TBD).
- Later scenes may reference stored text via `{{playerNotes.ch2_testimony}}` token (exact syntax TBD with Architect).

## Supported Effect Types
- increment
- decrement
- setNumber
- setFlag
- unsetFlag
- appendCodex
- switchPOV
- setChapter
- markSceneSeen
- setEnding
- *(planned)* storePlayerNote — saves a free-form text response to `playerNotes`

## Supported Condition Types
- eq
- neq
- gt
- gte
- lt
- lte
- flag
- notFlag
- seenScene
- and
- or

## Chapter Duration Standard
All chapters after Chapter 1 must target a **20–30 minute** play session:
- Minimum: 3,000 words at ~150 WPM (≈ 20 min)
- Target ceiling: 4,500 words at ~150 WPM (≈ 30 min)
- Routes exceeding 4,500 words are flagged for pacing review before release.
- Automated duration tests enforce the 3,000-word floor and `estimatedMinutes <= 30`; the 4,500-word ceiling is a QA review threshold, not a hard automated max-word gate.

## Authoring Rules
- Every scene must have a unique id.
- The `pov` field must be `"past"` or `"future"` — matching the `POV` type in `packages/shared-types/src/game.ts`. Do not use character-role labels such as `"protector"` or `"dissenter"`.
- Every choice must resolve to a valid nextSceneId unless it ends the chapter or game.
- Free-form scenes must also have a valid nextSceneId.
- No orphan scenes.
- Narrative prose must not contain engine logic.
- Variable names must come from approved state keys.
- `freeFormPrompt.promptKey` values must be unique across the full scene graph.

## Validation Rules
- All choice targets must exist.
- All conditions must reference valid keys.
- All effects must reference valid keys.
- All chapter entries must be reachable.
- All `freeFormPrompt.promptKey` values must be unique.
- Stored player-note text must not exceed `maxLength` at save time.
