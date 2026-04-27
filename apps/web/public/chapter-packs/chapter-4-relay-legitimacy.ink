VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch4_relay-legitimacy_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "relay-legitimacy-path"
VAR chapterFourComplete = false

-> ch4_relay_legitimacy_start

=== ch4_relay_legitimacy_start ===
~ currentSceneId = "ch4_relay-legitimacy_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 4: A City That Remembers Nothing. Relay Legitimacy.
The verification-first relay accord held. Packet integrity stayed above ninety-six percent. The historical record is clean, and no forged testimony has passed undetected.
The cost is visible every morning: districts with urgent relay needs wait longer than comfortable, and two community coordinators resigned last week because the process felt too slow to save anyone specific.
Zelda opens the coordination board and reads last week's incidents out loud: one legal victory, three fragile ceasefires, twenty-two unresolved repair requests, and one note from a riverside coordinator that simply says we are losing people to exhaustion not defeat.
Xav reminds the room that the legitimacy they built is real and fragile in equal measure. Trust requires maintenance. Maintenance requires people. People require rest.
Ari asks the question no one can dodge: "If the relay is trusted but empty of volunteers, who does it serve?"
+ [Create a relay care rotation so no one carries the network alone] # cue:stability
    ~ stability += 2
    -> ch4_relay_legitimacy_care
+ [Open emergency fast-track lanes outside the strict verification process for documented crisis calls] # cue:rebellion
    ~ rebellion += 1
    -> ch4_relay_legitimacy_pressure

=== ch4_relay_legitimacy_care ===
~ currentSceneId = "ch4_relay-legitimacy_care"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve publishes a "living obligations" bulletin paired with volunteer capacity maps: every promise gets an owner, a deadline, a backup, and a public review window.
Communities can now see not only what was promised, but what slipped, why it slipped, who absorbed the gap, and what compensation follows.
The system is slower to build than anyone wanted. It is also the first governance structure in Brinkton that does not require heroism to function.
Some districts see this as progress. One coordinator in the rail district sends a message that becomes the chapter's closing note:
"I slept through the night for the first time in three weeks. I did not save anyone that night. Someone else had the relay. This is what sustainable looks like from the inside. It is quieter than I expected."
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "relay-legitimacy-path"
    -> DONE

=== ch4_relay_legitimacy_pressure ===
~ currentSceneId = "ch4_relay-legitimacy_pressure"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The emergency fast-track lanes are used seventeen times in the first week.
Fourteen of those uses are legitimate crises. Three are unclear.
The unclear cases open a precedent debate: who decides what counts as a documented crisis, and how do you audit a fast-track without defeating its purpose?
Yve convenes an emergency council session. The debate runs five hours. They produce a tiered framework with named decision authorities and mandatory post-case review.
It is imperfect and it is still better than the silence that came before.
The chapter closes on one hard truth: legitimacy is not a destination. It is a discipline, practiced under pressure, with documentation.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "relay-legitimacy-path"
    -> DONE
