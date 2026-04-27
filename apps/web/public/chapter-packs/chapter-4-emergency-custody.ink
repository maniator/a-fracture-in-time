VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch4_emergency-custody_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "emergency-custody-path"
VAR chapterFourComplete = false

-> ch4_emergency_custody_start

=== ch4_emergency_custody_start ===
~ currentSceneId = "ch4_emergency-custody_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 4: A City That Remembers Nothing. Emergency Custody.
The extraction-first vote moved fourteen families out of Cybol reach inside seventy-two hours. Thirteen of them are still safe. One family was traced to the relay station they sheltered at and reported to Cybol district monitors within four hours of arrival.
Cybol's official statement does not mention the family. It mentions unauthorized custody operations, disruption of child welfare protocols, and coordinated interference with registered social services. The movement is now a legal target.
Zelda opens the coordination board. Last week's incidents: two families successfully transitioned to long-term shelter, three relay stations flagged as potentially surveilled, one citation from a district magistrate demanding accounting of who authorized the emergency transfers.
Xav reads the magistrate's citation out loud. He does not say whether it is fair. He says: this is the cost the people in those fourteen households did not pay so that we would.
Ari asks the question no one can dodge: "If we stop because we are afraid of what comes next, was it worth doing the first time?"
+ [Respond to the magistrate with full documentation of imminent harm justification] # cue:stability
    ~ stability += 1
    ~ controlIndex += 1
    -> ch4_emergency_custody_transparent
+ [Refuse to provide documentation that could expose family locations and challenge jurisdiction] # cue:rebellion
    ~ rebellion += 2
    -> ch4_emergency_custody_resist

=== ch4_emergency_custody_transparent ===
~ currentSceneId = "ch4_emergency-custody_transparent"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
The documentation package takes three days to prepare. It includes risk assessments, consent records, and intake timelines: everything except current shelter locations, which are submitted under a sealed protocol that three district court precedents support.
The magistrate reviews the package for two weeks. Her ruling does not endorse the movement's methods. It does not condemn them either. It says the evidence of imminent harm changes the legal calculus and schedules a full review hearing in sixty days.
Sixty days is not safety. Sixty days is a window. The movement builds inside it.
The chapter closes on one hard truth: transparency is not the same as safety. But without transparency, there is no legal floor left to stand on.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "emergency-custody-path"
    -> DONE

=== ch4_emergency_custody_resist ===
~ currentSceneId = "ch4_emergency-custody_resist"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The movement challenges jurisdiction and refuses documentation.
The magistrate responds with an asset freeze order covering two relay stations.
The freeze does not end operations. Three district communities reroute relay traffic through informal nodes that have no listed addresses and no registered ownership.
The informal network is faster and more dangerous. It has no charter. It has no care rotation. It runs on people who are too angry to stop.
Zelda writes in her tunnel log: "I understand why they are angry. I am not sure understanding is enough. We may have handed the next generation a weapon instead of a tool, and we called it a victory because we did not see anyone get hurt today."
The chapter closes on one hard truth: resistance without structure does not disappear. It continues without the safeguards that made the first extraction worth defending.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "emergency-custody-path"
    -> DONE
