# Narrative Schema

## Purpose
Provide a single authoring contract for all story content.

## Scene Shape

```json
{
  "id": "ch1_p_001",
  "chapter": 1,
  "pov": "protector",
  "speaker": "Protector",
  "text": [
    "The bells did not ring in Lattice unless something had been corrected.",
    "Today they rang three times."
  ],
  "conditions": [],
  "onEnterEffects": [
    { "type": "markSceneSeen", "sceneId": "ch1_p_001" }
  ],
  "choices": [
    {
      "id": "observe_crowd",
      "label": "Study the crowd before speaking",
      "effects": [
        { "type": "increment", "key": "stability", "value": 1 }
      ],
      "nextSceneId": "ch1_p_002"
    }
  ]
}
```

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

## Authoring Rules
- Every scene must have a unique id.
- Every choice must resolve to a valid nextSceneId unless it ends the chapter or game.
- No orphan scenes.
- Narrative prose must not contain engine logic.
- Variable names must come from approved state keys.

## Validation Rules
- All choice targets must exist.
- All conditions must reference valid keys.
- All effects must reference valid keys.
- All chapter entries must be reachable.
