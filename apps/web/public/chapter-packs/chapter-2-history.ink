VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch2_history_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "history-path"
VAR chapterTwoComplete = false
VAR zeldaHeldTwoTimelines = false
VAR ariCreatedSecondFuture = false
VAR diderramPatrolAppeared = false
VAR cybolSchoolRemembered = false

-> ch2_history_start

=== ch2_history_start ===
~ currentSceneId = "ch2_history_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 2: The Second Future.
Zelda woke with two childhoods fighting over the same bones.
In one, she learned to read by lantern light while Diderram patrols searched old Cybol shelters overhead.
In the other, she sat in a clean classroom under a Cybol flag, reciting the founding promise of Ayker's civic century.
Both memories hurt. Both felt true. Both could not survive in the same mind for long.
The device beside her pulsed with Xav's voice, distorted by the change Ari had made when she touched the notebook.
"Zelda? Are you still there?"
+ [Force yourself to answer before the old future fades] # cue:memory
    ~ memoryFracture += 2
    ~ zeldaHeldTwoTimelines = true
    -> ch2_history_answer
+ [Write down both childhoods before speaking] # cue:stability
    ~ stability += 2
    ~ zeldaHeldTwoTimelines = true
    -> ch2_history_notes

=== ch2_history_answer ===
~ currentSceneId = "ch2_history_answer"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
"I am here," Zelda said.
The words came out in two accents.
Marek backed away from her. In one memory, he was the shelter elder who taught her to hide from patrols. In the other, he was Professor Marek, instructor of Civic Gratitude at the Brinkton Restoration School.
He looked at her as if he remembered both too, but only for a second.
Then his face settled into fear.
"What did you do?" he asked.
+ [Tell Marek the past changed and he almost remembered] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_marek
+ [Say nothing to Marek and focus on Xav] # cue:control
    ~ controlIndex += 2
    -> ch2_history_xav

=== ch2_history_notes ===
~ currentSceneId = "ch2_history_notes"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Zelda wrote in the dust with both hands.
Left hand: Diderram curfew. Shelter hunger. Cybol ruins sealed by order of public safety.
Right hand: Cybol restoration. Clean uniforms. Diderram integration ceremonies. Morning songs praising the peace.
The two histories overlapped at one point: Ari Reivax touching the notebook.
Zelda underlined Ari's name until the stone snapped.
The device printed a new warning across its cracked screen.
TEMPORAL CONSENSUS FORMING. RESIST OR ACCEPT.
+ [Resist the new consensus and keep both histories alive] # cue:memory
    ~ memoryFracture += 2
    -> ch2_history_xav
+ [Accept enough of the new history to stay functional] # cue:stability
    ~ stability += 2
    -> ch2_history_marek

=== ch2_history_xav ===
~ currentSceneId = "ch2_history_xav"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
I heard Zelda answer in two voices.
Ari stood beside me with one hand wrapped in a towel, even though the notebook had not burned her exactly. It had left a mark shaped like a small branching tree.
Yve looked from Ari to me to the com.
"The future changed," she said.
"Can we change it back?" Ari asked.
No one answered quickly enough.
Zelda's voice cracked through the speaker.
"Do not change it back yet. I need to know what this version hides."
+ [Ask Ari what she felt when she touched the notebook] # cue:memory
    ~ memoryFracture += 1
    ~ ariCreatedSecondFuture = true
    -> ch2_history_ari
+ [Tell Zelda you will try to stabilize the signal first] # cue:stability
    ~ stability += 1
    -> ch2_history_signal

=== ch2_history_marek ===
~ currentSceneId = "ch2_history_marek"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Marek led Zelda through the changed tunnels.
Some corridors still looked like ruins. Others had become clean restoration passages with glowing safety strips and murals of Cybol volunteers helping grateful Diderram families.
At the junction beneath the old library, a patrol checkpoint shimmered in and out of existence.
In the old future, Diderram patrols searched for illegal Cybol relics.
In the new one, Cybol restoration officers searched for Diderram separatists.
The uniforms changed. The fear did not.
+ [Walk through the checkpoint as if you belong to the new future] # cue:control
    ~ controlIndex += 2
    ~ diderramPatrolAppeared = true
    -> ch2_history_checkpoint
+ [Break away from Marek and find the old ruins path] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_oldpath

=== ch2_history_ari ===
~ currentSceneId = "ch2_history_ari"
~ currentPOV = "past"
~ currentSpeaker = "Ari Reivax"
"It felt like the book was lonely," Ari said.
Yve closed her eyes. "That is not data, but somehow it is worse than data."
Ari ignored her.
"It showed me Zelda. But not the dusty one. Another Zelda. She was in school and everyone kept telling her Cybol saved Ayker. She did not believe them, but she wanted to."
The com whined.
Zelda whispered, "I remember that school. I never went there yesterday."
+ [Ask Ari whether the notebook wanted that future] # cue:memory
    ~ memoryFracture += 2
    -> ch2_history_signal
+ [Keep Ari away from the notebook until Zelda stabilizes] # cue:stability
    ~ stability += 2
    -> ch2_history_checkpoint

=== ch2_history_signal ===
~ currentSceneId = "ch2_history_signal"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve built a stabilizer out of three com relays, a kitchen lamp, and a university access card she claimed she had definitely been allowed to borrow.
"This will not fix time," she said. "It may keep Zelda from being rewritten while we talk."
"May?" I asked.
"Do you want honesty or comfort?"
The stabilizer turned on with a low hum.
For a moment, Zelda's two voices became one.
"I found the new lie," she said. "In this future, Cybol never fell. It rebranded the fall as restoration."
+ [Ask Zelda what happened to Diderram in the new version] # cue:memory
    ~ memoryFracture += 1
    -> ch2_history_checkpoint
+ [Ask Zelda what happened to your family in the new version] # cue:memory
    ~ memoryFracture += 1
    -> ch2_history_oldpath

=== ch2_history_checkpoint ===
~ currentSceneId = "ch2_history_checkpoint"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The checkpoint officer looked at Zelda's device and smiled with practiced pity.
"Relic grief," he said. "Very common in descendants of unintegrated families. Cybol can help you remember safely."
Behind him, a school group marched past in clean uniforms.
Zelda recognized herself among them.
Not a memory. A recording. A future that was trying to recruit her backward.
The younger Zelda in the recording looked straight at the camera and mouthed: run.
+ [Run toward the school recording] # cue:rebellion
    ~ rebellion += 2
    ~ cybolSchoolRemembered = true
    -> ch2_history_school
+ [Let the officer scan the device to learn what he sees] # cue:control
    ~ controlIndex += 2
    -> ch2_history_scan

=== ch2_history_oldpath ===
~ currentSceneId = "ch2_history_oldpath"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The old ruins path was smaller now.
The new future had paved over most of it, but cracks remained where the first timeline refused to die.
Zelda crawled through one with the device pressed to her chest.
Inside the crawlspace, someone had carved a message into the stone before the second future covered it.
ARI WAS NOT THE MISTAKE. THE ANNOUNCEMENT WAS.
Below it was tomorrow's date in Xav's era.
+ [Send the warning to Xav immediately] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_final
+ [Search for what announcement the warning means] # cue:memory
    ~ memoryFracture += 2
    -> ch2_history_school

=== ch2_history_school ===
~ currentSceneId = "ch2_history_school"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The school recording was stored inside a civic archive kiosk that had not existed an hour ago.
Zelda watched the younger version of herself stand at a classroom podium and recite the restoration oath.
Then the recording glitched.
The younger Zelda stopped reciting and leaned toward the lens.
"If you are me," she said, "then listen. Cybol did not fall because of rebellion. It survived by learning how to make every rebellion part of its story."
The kiosk alarm began to scream.
+ [Rip the recording free and send it to Xav] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_final
+ [Memorize the oath before destroying the kiosk] # cue:stability
    ~ stability += 1
    -> ch2_history_final

=== ch2_history_scan ===
~ currentSceneId = "ch2_history_scan"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The officer scanned the device.
His smile disappeared.
"This object is pre-restoration," he said. "And post-collapse."
For one second, the new future did not know what category to put Zelda in.
That was all she needed.
She took the device back and ran.
Behind her, the checkpoint announced a contradiction alert across three versions of the same hallway.
+ [Use the contradiction alert to find the hidden archive] # cue:memory
    ~ memoryFracture += 2
    -> ch2_history_final
+ [Break the scanner so the device cannot be tracked] # cue:rebellion
    ~ rebellion += 1
    -> ch2_history_final

=== ch2_history_final ===
~ currentSceneId = "ch2_history_final"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Zelda's warning arrived as Yve's stabilizer began to smoke.
Not Ari. The announcement.
Tomorrow, Cybol would announce a new historical partnership with Diderram. In one future, that announcement became the first polite lie before a collapse. In another, it became the foundation of a restoration that never admitted there had been a collapse at all.
Ari looked at the notebook mark on her hand.
"So what do we do?"
The notebook opened by itself and wrote one word.
Attend.
+ [End Chapter 2] # cue:ending
    ~ chapterTwoComplete = true
    -> DONE
