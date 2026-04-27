VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch5_governance_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "relay-legitimacy-path"
VAR chapterFiveComplete = false

-> ch5_governance_start

=== ch5_governance_start ===
~ currentSceneId = "ch5_governance_start"
Chapter 5: Governance Reckoning.
Whether the relay held through legitimacy or compromise, the question now is the same: who audits the auditors?
The city demands a charter revision with enforcement teeth, not slogans.
Yve proposes rotating review tribunals; district crews argue for permanent civilian oversight.
+ [Codify rotating tribunals with fixed transparency windows] # cue:stability
    ~ stability += 1
    -> ch5_governance_resolution
+ [Codify standing civilian oversight with emergency intervention powers] # cue:rebellion
    ~ rebellion += 1
    -> ch5_governance_resolution

=== ch5_governance_resolution ===
~ currentSceneId = "ch5_governance_resolution"
~ currentSpeaker = "Yve Ettevy"
The debate stretched into evening and past it. By the time the vote landed, everyone in the room had argued themselves quiet.
The revised charter passes only after Ari adds one line no one can dilute: every override must publish a repair plan.
In practice, the city learns that power does not disappear when exposed. It reorganizes.
The chapter closes with a live dashboard showing unresolved harms beside every celebrated metric.
+ [End Chapter 5] # cue:ending
    ~ chapterFiveComplete = true
    ~ endingKey = "governance-reckoning-path"
    -> DONE
