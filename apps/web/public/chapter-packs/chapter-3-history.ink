VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch3_history_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "history-path"
VAR chapterThreeComplete = false

-> ch3_history_start

=== ch3_history_start ===
~ currentSceneId = "ch3_history_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 3: The Public Memory Trial.
The parallel hearings from Chapter 2 spread faster than anyone expected.
So did the backlash.
By week two, Cybol representatives announced a formal tribunal to "resolve contradictory public records."
Communities heard the word resolve and translated it as bury.
Zelda proposed a counter-structure instead: a public memory trial where every institutional claim had to face verified witness testimony in open sessions.
Marek called it reckless.
Yve called it overdue.
+ [Accept the official tribunal but livestream every minute] # cue:control
    ~ controlIndex += 2
    -> ch3_history_forum
+ [Refuse official control and convene an independent trial forum] # cue:rebellion
    ~ rebellion += 2
    -> ch3_history_forum

=== ch3_history_forum ===
~ currentSceneId = "ch3_history_forum"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve converted the old amphitheater into a procedural maze that favored transparency over theatrics.
Every testimony station had three clocks:
speaker time,
cross-check time,
and public clarification time.
If institutions submitted archival documents, community archivists reviewed provenance on-site before admission.
If witnesses were challenged, support teams could pause proceedings without losing their slot.
Ari sat in the front row with a stack of colored cards used to request plain-language restatements whenever legal jargon appeared.
She used them often.
+ [Prioritize legal durability of evidence even when sessions slow] # cue:stability
    ~ stability += 1
    -> ch3_history_resolution
+ [Prioritize broad participation and multilingual summaries] # cue:memory
    ~ memoryFracture += 1
    -> ch3_history_resolution

=== ch3_history_resolution ===
~ currentSceneId = "ch3_history_resolution"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The first week ended without a single unified verdict.
That was the point.
Instead of one authoritative conclusion, the trial published a layered ruling:
which claims were verified,
which remained disputed,
which required additional witness collection,
and which institutional records were provably fabricated.
Cybol officials called the ruling incomplete.
Neighborhood assemblies called it honest.
For the first time since the timelines split, "incomplete" felt like progress rather than failure.
Zelda archived the ruling as Version 0.1 and added a footer line:
PUBLIC MEMORY IS A PROCESS, NOT A DECREE.
This Chapter 3 route now opens the governance phase and will expand with evidence sabotage arcs, amnesty debates, and cross-district constitutional work.
+ [End Chapter 3] # cue:ending
    ~ chapterThreeComplete = true
    -> DONE
