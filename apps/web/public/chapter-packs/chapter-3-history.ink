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
VAR trialCredibilityHigh = false
VAR amnestyConflictTriggered = false

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
    -> ch3_history_pressure
+ [Refuse official control and convene an independent trial forum] # cue:rebellion
    ~ rebellion += 2
    -> ch3_history_pressure

=== ch3_history_pressure ===
~ currentSceneId = "ch3_history_pressure"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
By day three, defectors from archival offices began requesting conditional amnesty in exchange for internal evidence.
Some had helped edit public memory logs.
Some had signed the edits.
All claimed they could expose higher command.
The square split over one question:
can a memory trial stay legitimate if it bargains with architects of erasure?
+ [Offer conditional amnesty only after full sworn disclosure in open session] # cue:stability
    ~ stability += 2
    ~ trialCredibilityHigh = true
    -> ch3_history_irreversible
+ [Reject amnesty deals and prioritize uncompromised witness standing] # cue:rebellion
    ~ rebellion += 2
    ~ amnestyConflictTriggered = true
    -> ch3_history_irreversible

=== ch3_history_irreversible ===
~ currentSceneId = "ch3_history_irreversible"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve put both options on the public board and read them aloud twice.
"This is the irreversible branch," she said. "Whatever we choose becomes precedent."
If they took amnesty testimony, they could expose deeper systems faster at the risk of moral fracture.
If they rejected amnesty testimony, they could preserve purity at the risk of slower truth recovery.
+ [Codify conditional amnesty protocol with strict disclosure and victim veto windows] # cue:control
    ~ controlIndex += 2
    ~ trialCredibilityHigh = true
    -> ch3_history_forum
+ [Codify no-amnesty protocol and build a longer witness-led evidence pipeline] # cue:memory
    ~ memoryFracture += 1
    ~ amnestyConflictTriggered = true
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
Where conditional amnesty passed, archives yielded faster but hearings spent more time on accountability arguments.
Where amnesty failed, public trust consolidated around witness purity but institutional disclosures came slower and with heavier resistance.
Neither path solved legitimacy in a day.
Both forced the city to practice it in public.
For the first time since the timelines split, "incomplete" felt like progress rather than failure.
Zelda archived the ruling as Version 0.1 and added a footer line:
PUBLIC MEMORY IS A PROCESS, NOT A DECREE.
This Chapter 3 route now includes an irreversible amnesty-precedent split and seeds Chapter 4 with a persistent trial credibility condition.
+ [End Chapter 3] # cue:ending
    ~ chapterThreeComplete = true
    ~ endingKey = "history-path"
    -> DONE
