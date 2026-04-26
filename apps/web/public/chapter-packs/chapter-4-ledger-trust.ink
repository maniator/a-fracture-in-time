VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch4_ledger-trust_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "ledger-trust-path"
VAR chapterFourComplete = false

-> ch4_ledger_trust_start

=== ch4_ledger_trust_start ===
~ currentSceneId = "ch4_ledger-trust_start"
Chapter 4: Consequences of ledger trust.
The city no longer debates whether memory infrastructure exists; it now debates who carries its cost every day.
Zelda opens the coordination board and reads last week's incidents out loud: one legal victory, three fragile ceasefires, and dozens of unresolved repair requests.
Xav reminds the room that Chapter 3 choices are now policy precedent, not temporary experiments.
Ari asks the question no one can dodge: "What do we protect first when every option hurts someone?"
+ [Invest in district care teams before expanding public operations] # cue:stability
    ~ stability += 1
    -> ch4_ledger_trust_resolution
+ [Expand operations now and patch care systems in parallel] # cue:rebellion
    ~ rebellion += 1
    -> ch4_ledger_trust_resolution

=== ch4_ledger_trust_resolution ===
~ currentSceneId = "ch4_ledger-trust_resolution"
~ currentSpeaker = "Yve Ettevy"
Yve publishes a "living obligations" bulletin: every promise gets an owner, a deadline, and a public review window.
Communities can now see not only what was promised, but what slipped, why it slipped, and what compensation follows.
Some districts praise the transparency and patience it requires.
Others call it too slow for active harm zones and demand emergency acceleration channels.
Both reactions are valid; both become input for the next governance cycle.
The chapter closes on one hard truth: branches did not disappear after Chapter 3—branches became institutions.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "ledger-trust-path"
    -> DONE
