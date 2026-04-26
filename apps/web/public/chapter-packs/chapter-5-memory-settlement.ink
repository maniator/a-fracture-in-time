VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch5_memory_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "trial-credibility-path"
VAR chapterFiveComplete = false

-> ch5_memory_start

=== ch5_memory_start ===
~ currentSceneId = "ch5_memory_start"
Chapter 5: Memory Settlement.
After amnesty fights and credibility battles, the tribunal now confronts restitution: who repairs the damage done by official erasure?
Marek presents three ledgers: material losses, institutional fraud, and generational trust collapse.
+ [Prioritize material restitution first, with public audit intervals] # cue:stability
    ~ stability += 1
    -> ch5_memory_resolution
+ [Prioritize institutional admissions first, with survivor veto windows] # cue:memory
    ~ memoryFracture += 1
    -> ch5_memory_resolution

=== ch5_memory_resolution ===
~ currentSceneId = "ch5_memory_resolution"
~ currentSpeaker = "Yve Ettevy"
The settlement framework passes as a living document that cannot close while harms remain unresolved.
Its preamble states the core lesson of the last three chapters: memory is a civic utility, and utilities must be maintained.
+ [End Chapter 5] # cue:ending
    ~ chapterFiveComplete = true
    ~ endingKey = "memory-settlement-path"
    -> DONE
