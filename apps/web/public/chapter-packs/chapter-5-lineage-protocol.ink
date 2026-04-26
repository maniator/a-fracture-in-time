VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch5_lineage_start"
VAR currentPOV = "past"
VAR currentSpeaker = "Xav Reivax"
VAR endingKey = "ledger-trust-path"
VAR chapterFiveComplete = false

-> ch5_lineage_start

=== ch5_lineage_start ===
~ currentSceneId = "ch5_lineage_start"
Chapter 5: Lineage Protocol.
Chapter 4 proved family governance can protect or overreach; Chapter 5 asks who gets to define kinship legitimacy at all.
Archive councils propose a lineage protocol that validates witness continuity without reducing justice to bloodline proof.
+ [Anchor protocol in witness contribution and care labor] # cue:stability
    ~ stability += 1
    -> ch5_lineage_resolution
+ [Anchor protocol in emergency survivorship and rapid protection claims] # cue:control
    ~ controlIndex += 1
    -> ch5_lineage_resolution

=== ch5_lineage_resolution ===
~ currentSceneId = "ch5_lineage_resolution"
~ currentSpeaker = "Zelda Adlez"
The final protocol rejects purity myths and publishes a right-to-contest path any family can use.
Ari records the first training packet herself, reminding every district that inheritance is responsibility, not entitlement.
+ [End Chapter 5] # cue:ending
    ~ chapterFiveComplete = true
    ~ endingKey = "lineage-protocol-path"
    -> DONE
