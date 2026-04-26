VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch2_family_start"
VAR currentPOV = "past"
VAR currentSpeaker = "Xav Reivax"
VAR endingKey = "family-path"
VAR chapterTwoComplete = false
VAR yveReadNotebook = false
VAR zeldaConfirmedLineage = false
VAR ariProtected = false
VAR familyRecordChanged = false

-> ch2_family_start

=== ch2_family_start ===
~ currentSceneId = "ch2_family_start"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Chapter 2: The Firstborn Record.
The family notebook did not sleep.
Every time I looked away, another line appeared in the margins: dates, names, warnings written in hands I almost recognized.
Yve sat on my floor with her back against the desk, refusing to touch the notebook but also refusing to leave it alone.
"Your family has been lying by tradition," she said.
"That feels unfair to tradition."
"Xav. Your future granddaughter is talking through your broken com. Your notebook writes back. This is not a normal family heirloom."
The com lit up before I could answer.
Zelda's voice came through, low and urgent. "The family tree changed again. I need you to tell me every name in that notebook."
+ [Read the firstborn names aloud to Zelda] # cue:memory
    ~ memoryFracture += 2
    ~ familyRecordChanged = true
    -> ch2_family_names
+ [Let Yve inspect the notebook first] # cue:stability
    ~ stability += 2
    ~ yveReadNotebook = true
    -> ch2_family_yve

=== ch2_family_names ===
~ currentSceneId = "ch2_family_names"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Zelda wrote each name on the tunnel floor with a piece of white stone.
Reivax. Reivax. Reivax. Then a gap burned through three generations. Then Adlez.
The gap was the problem. In the official future records, those missing names had been marked as casualties of the fall. In the new record, they had never existed.
When Xav read the next name, Zelda's hand froze.
Ari Reivax.
The name was written where Xav's should have been.
+ [Tell Xav Ari's name moved into the firstborn line] # cue:memory
    ~ memoryFracture += 2
    ~ zeldaConfirmedLineage = true
    -> ch2_family_ari
+ [Hide Ari's name until you understand why it changed] # cue:control
    ~ controlIndex += 2
    -> ch2_family_gap

=== ch2_family_yve ===
~ currentSceneId = "ch2_family_yve"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve read the notebook the way she read exam questions: quietly, fast, and with increasing anger.
"This is not a diary," she said. "It's a ledger. Every entry begins with a choice and ends with a cost."
She turned a page with the back of a pen.
The ink formed a new sentence as she watched.
The wrong child will inherit if the warning is ignored.
Yve went pale.
"Xav, where is Ari?"
+ [Find Ari before anyone else notices the notebook changed] # cue:stability
    ~ stability += 1
    ~ ariProtected = true
    -> ch2_family_ari
+ [Ask Zelda whether Ari survives in the future] # cue:memory
    ~ memoryFracture += 1
    -> ch2_family_gap

=== ch2_family_ari ===
~ currentSceneId = "ch2_family_ari"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Ari was in the kitchen pretending not to listen.
She had built a tower out of ration fruit, which would have been funny if she had not arranged the pieces into the exact symbol now glowing on the notebook cover.
"I didn't touch it," she said before I asked.
Yve knelt beside her. "Did you dream about it?"
Ari nodded.
"A girl in a tunnel told me not to let Xav be brave alone."
The com hissed. Zelda whispered, "I did not say that. Not yet."
+ [Promise Ari she is not responsible for the future] # cue:stability
    ~ stability += 2
    ~ ariProtected = true
    -> ch2_family_tunnel
+ [Ask Ari what else the dream showed her] # cue:memory
    ~ memoryFracture += 2
    -> ch2_family_dream

=== ch2_family_gap ===
~ currentSceneId = "ch2_family_gap"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Zelda searched the Adlez shelter archive for Ari Reivax.
Nothing.
She searched again using old Cybol spellings. Nothing.
Ari existed in Xav's house and nowhere in Zelda's future, which meant history had not killed her. History had hidden the shape of what happened to her.
Marek stood over Zelda's shoulder.
"Family records are how Cybol tracked inheritance rights," he said. "If your family carried a device, Cybol would have found it through the firstborn line."
Zelda looked at the blank gap in the tree.
"Then someone removed the line to protect us. Or to control us."
+ [Tell Xav the family line may be bait] # cue:control
    ~ controlIndex += 1
    -> ch2_family_tunnel
+ [Search for Ari in the sealed casualty rooms] # cue:rebellion
    ~ rebellion += 2
    -> ch2_family_casualty

=== ch2_family_dream ===
~ currentSceneId = "ch2_family_dream"
~ currentPOV = "past"
~ currentSpeaker = "Ari Reivax"
Ari described the dream in pieces.
A ruined lecture hall. A girl with dust in her hair. A city where the sky had too many patrol lights. A notebook that grew heavier every time someone lied to protect a child.
"The girl was sad," Ari said. "But not at me. At you."
"Why at me?" I asked.
Ari shrugged. "Because you kept trying to save everyone by not telling anyone anything."
Yve made a small sound that was almost a laugh.
+ [Tell Ari the whole truth about Zelda] # cue:rebellion
    ~ rebellion += 2
    ~ ariProtected = true
    -> ch2_family_tunnel
+ [Keep Ari out of the time contact from now on] # cue:control
    ~ controlIndex += 2
    -> ch2_family_casualty

=== ch2_family_tunnel ===
~ currentSceneId = "ch2_family_tunnel"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
In Zelda's tunnel, the device projected a map that had not existed yesterday.
It traced a path from the ruined University of Brinkton to an old residential district labeled FIRSTBORN REGISTRY, then beneath that to a sealed chamber marked PRIVATE CYBOL LINEAGE ASSETS.
Zelda hated every word of that label.
She followed the map anyway.
At the chamber door, the device asked for a voiceprint.
Not Zelda's. Not Xav's.
Ari Reivax.
+ [Ask Xav to have Ari speak the phrase through the com] # cue:memory
    ~ memoryFracture += 1
    -> ch2_family_voiceprint
+ [Try to bypass the lock without involving Ari] # cue:stability
    ~ stability += 1
    -> ch2_family_casualty

=== ch2_family_casualty ===
~ currentSceneId = "ch2_family_casualty"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The casualty rooms were not rooms. They were shelves of names that Cybol had decided were easier to store than explain.
Zelda found Ari's name on a strip of translucent metal, but the date beside it kept changing.
874cy. 882cy. 901cy. Unknown. Protected. Removed.
Under cause of record, the file said: FIRST CONTACT CONTAMINATION.
Zelda's stomach turned.
Ari had not merely touched the family story. The family story had touched back.
+ [Warn Xav that Ari becomes a target] # cue:rebellion
    ~ rebellion += 2
    -> ch2_family_voiceprint
+ [Hide the file until Zelda can verify it] # cue:control
    ~ controlIndex += 1
    -> ch2_family_final

=== ch2_family_voiceprint ===
~ currentSceneId = "ch2_family_voiceprint"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Ari stood on a kitchen chair so she could reach the com.
Yve looked like she wanted to object to everything but could not decide where to begin.
Zelda sent the phrase one word at a time.
Ari repeated it.
"The firstborn is not always the oldest. The firstborn is the one history reaches first."
The notebook snapped shut.
In the future, Zelda shouted. In the past, every window in the house flashed with the same blue light.
+ [Open the notebook again even though it resisted] # cue:memory
    ~ memoryFracture += 2
    -> ch2_family_final
+ [Get Ari away from the notebook and protect the house] # cue:stability
    ~ stability += 2
    -> ch2_family_final

=== ch2_family_final ===
~ currentSceneId = "ch2_family_final"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The chamber opened.
Inside, Zelda found a wall of family records and one message addressed to her by name.
Zelda Adlez, if this record still exists, then Xav chose family over certainty. Good. Certainty is how Cybol wins.
The signature below the message was not Xav's.
It was Ari's.
This Chapter 2 route ends here for now, with the Family Path ready to expand around Ari, the firstborn record, and the hidden lineage mechanism.
+ [End Chapter 2] # cue:ending
    ~ chapterTwoComplete = true
    -> DONE
