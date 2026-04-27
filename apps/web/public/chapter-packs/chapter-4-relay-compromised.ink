VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch4_relay-compromised_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "relay-compromised-path"
VAR chapterFourComplete = false

-> ch4_relay_compromised_start

=== ch4_relay_compromised_start ===
~ currentSceneId = "ch4_relay-compromised_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 4: A City That Remembers Nothing. Relay Compromised.
The reach-first decision opened the relay to unverified submissions. For six days, the network moved testimony across every district faster than Cybol could suppress it.
On day seven, a coordinated spoofing attack flooded the relay with forged witness accounts. By morning, two neighborhoods had acted on false information. Three families were evacuated unnecessarily. One community coordinator received an anonymous threat using language from a testimony she had submitted under her real name.
Zelda opens the coordination board and reads last week's incidents out loud: one legal victory, three fragile ceasefires, a spoofing postmortem that filled eleven pages, and a message from the coordinator who was threatened that says simply: I am still here, but I am not fine.
Xav reminds the room that reach without authenticity is a vector for harm, and that the people most vulnerable to forged information are not the ones who designed the policy.
Ari asks the question no one can dodge: "Can we earn back trust without starting over?"
+ [Institute a retroactive verification sweep and publish corrections publicly] # cue:stability
    ~ stability += 2
    -> ch4_relay_compromised_correction
+ [Build a tiered trust system where verified sources display a visible marker without blocking others] # cue:control
    ~ controlIndex += 1
    -> ch4_relay_compromised_tiered

=== ch4_relay_compromised_correction ===
~ currentSceneId = "ch4_relay-compromised_correction"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
The retroactive sweep takes twelve days and identifies forty-three forged or manipulated submissions.
Every correction is published alongside the original, with a plain-language explanation of what changed and why.
The process is humiliating in the way honest corrections always are: the network had to admit it was weaponized, and the admission was also the weapon's cure.
Some districts blame the original reach-first vote. Others argue the correction process demonstrates that the network can self-repair, which no Cybol institution has ever done publicly.
The coordinator who was threatened returns to active relay work after a month. Her first submission back is a twelve-minute testimony from a Diderram family she had been trying to connect to the network for two years.
The chapter closes on one hard truth: compromised infrastructure does not end a movement. It teaches the movement what it is actually made of.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "relay-compromised-path"
    -> DONE

=== ch4_relay_compromised_tiered ===
~ currentSceneId = "ch4_relay-compromised_tiered"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The tiered trust system launches with three verification levels, each marked with a visible symbol and a short explanation.
Unverified submissions remain visible but carry a caution notation.
Operator-verified submissions carry a community stamp.
Cross-district verified submissions carry a full audit trail.
Within a week, the tiers reveal something unexpected: communities in the most dangerous districts submit at the unverified level because the audit trail poses too great an identity risk. The system that was meant to protect them exposes them unless trust-level assignment is made locally by people who know the context.
The chapter closes on one hard truth: a compromise between reach and trust is possible, but only if the people most at risk help design it.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "relay-compromised-path"
    -> DONE
