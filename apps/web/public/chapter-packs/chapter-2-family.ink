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
    -> ch2_family_archive
+ [Get Ari away from the notebook and protect the house] # cue:stability
    ~ stability += 2
    -> ch2_family_shelter

=== ch2_family_archive ===
~ currentSceneId = "ch2_family_archive"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Behind the first chamber door was a second vault sealed with mechanical latches instead of code.
The labels on the drawers were dates.
Some dates belonged to known family births. Others belonged to protests, raids, and treaty signings that no one in Xav's time had ever been told were connected to the Reivax line.
Zelda opened one drawer marked 842cy and found letters between Cybol archivists arguing over whether the "firstborn conduit" should be treated as a citizen or a state resource.
Each memo used colder language than the one before it.
Potential leverage.
Inheritance compliance.
Selective orphan transfer.
The last memo ended with a handwritten note.
If Ari manifests early resonance, relocate immediately before public notice.
Zelda copied the note and sent it to Xav.
"They planned for her before she was born," Zelda said. "Not because they cared. Because they were afraid."
+ [Tell Xav to burn every public record tied to Ari] # cue:rebellion
    ~ rebellion += 2
    -> ch2_family_shelter
+ [Tell Xav to keep records but falsify Ari's legal identity] # cue:control
    ~ controlIndex += 2
    -> ch2_family_registry

=== ch2_family_shelter ===
~ currentSceneId = "ch2_family_shelter"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve spread city maps over the kitchen table while Ari slept with the notebook under an upside-down mixing bowl, as if cookware could stop history.
"If we run tonight, Cybol notices," Yve said. "If we stay, they announce tomorrow and the neighborhood turns into a census parade."
Xav traced the old tram tunnels with his fingertip.
Most routes were obvious exits that would be watched first.
One path ran through the collapsed botanical wing at Brinkton University, then into maintenance shafts no civilian registry still tracked.
"This route gets Ari out," Xav said.
"And brings you to Zelda's future relay coordinates," Yve added. "You would be choosing escape and contact at the same time."
The com crackled with Zelda's voice from decades ahead.
"Do not travel alone. The first timeline only survives when people witness each other. Isolation is how the record edits you."
Ari woke and carried the mixing bowl to the table like a helmet.
"Can I keep being me if we move?" she asked.
Yve swallowed hard. "That is the whole assignment."
+ [Travel as a family unit and keep the com open the whole way] # cue:stability
    ~ stability += 2
    ~ ariProtected = true
    -> ch2_family_registry
+ [Split up so one team decoys while Ari hides with the notebook] # cue:control
    ~ controlIndex += 1
    -> ch2_family_promise

=== ch2_family_registry ===
~ currentSceneId = "ch2_family_registry"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The chamber's central console finally accepted Ari's voiceprint and projected a dynamic registry tree across the stone wall.
Every branch changed color based on political pressure.
Blue branches represented "cooperative lineages" integrated into Cybol institutions.
Red branches represented "destabilizing descendants" routed into labor contracts, military drafting programs, or unexplained disappearances.
The Reivax line pulsed between colors faster than Zelda could track.
At the root was a protocol name:
PROJECT FIRST WITNESS.
Below it: Public announcement strategy synchronized to academic partnership ceremonies.
Zelda found a recorded briefing from a Cybol director.
"If the firstborn conduit presents as sympathetic, frame partnership as reconciliation. If resistant, classify as extremist contamination. In either case, control the announcement and history follows."
Zelda forwarded the briefing to Yve.
"Tomorrow is not a ceremony," she said. "It is an identity capture operation."
+ [Instruct Xav to expose the briefing publicly before the ceremony] # cue:rebellion
    ~ rebellion += 2
    -> ch2_family_promise
+ [Instruct Yve to leak the briefing quietly to trusted faculty first] # cue:stability
    ~ stability += 1
    -> ch2_family_promise

=== ch2_family_promise ===
~ currentSceneId = "ch2_family_promise"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
By dawn, the apartment looked normal on purpose.
Breakfast dishes on the counter. Ari's school bag by the door. Yve muttering about exam schedules loud enough for hallway microphones to hear.
Under the table, every plan was moving.
Marek's old contacts mapped patrol rotations.
Three Diderram runners carried duplicate notebooks filled with decoy family entries.
Yve encoded Zelda's briefing into an assignment packet titled Comparative Histories of Civic Repair.
Ari wore the real notebook under her coat like a second heartbeat.
When the public announcement feed began, Xav did not watch the mayor.
He watched Ari.
She did not flinch when Cybol officials said words like harmony and shared future.
She squeezed his hand and whispered, "They sound like people reading someone else's apology."
Xav laughed once, quietly, because it was true.
"Whatever happens next," he said, "no one writes you alone."
The com answered with Zelda's voice.
"I heard that in both timelines."
+ [Move into the announcement crowd and confront the narrative in public] # cue:rebellion
    ~ rebellion += 1
    -> ch2_family_witness
+ [Hold position and protect Ari while allies spread the evidence] # cue:stability
    ~ stability += 1
    -> ch2_family_witness

=== ch2_family_witness ===
~ currentSceneId = "ch2_family_witness"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The announcement reached Zelda as layered echoes.
One version of the crowd applauded politely while Cybol officials praised reconciliation metrics.
Another version shouted as leaked briefing slides spread across handheld projectors and classroom walls.
Between those versions stood a third reality, still unstable, where enough people were listening for the first time that neither script fully held.
Zelda used the chamber console to open a live line into the amphitheater.
She expected static.
Instead she heard Ari's voice, small but steady.
"My name is Ari Reivax. I am not your symbol."
The crowd quieted.
Xav stepped beside Ari and repeated the line.
Then Yve took the microphone and read from the briefing packet with the exact calm she used during exams.
"Slide four proposes classification language for dissenting witnesses. Slide five recommends prerecorded school footage to imply consent where none exists. If this is reconciliation, why was the outcome written before the event?"
The mayor tried to reclaim control with practiced warmth.
"These fragments are being taken out of context by frightened families."
Marek answered from the faculty block before anyone prompted him.
"I taught the context," he shouted. "The context is coercion."
Students began recording everything.
Diderram organizers raised handmade signs showing parallel timelines: one chart of collapse and resistance, one chart of restoration and revision.
People who had lived through both stories saw themselves in both charts and, for the first time, did not have to choose only one to be considered sane.
Security officers moved toward the stage.
Ari reached into her coat, held up the notebook, and opened it.
The pages wrote as the officers approached.
NOT A RELIC. A RECORDING OF WITNESSES.
The sentence repeated in different hands, different inks, different dates.
Some signatures matched names Zelda had seen erased from the firstborn vault.
Others matched living people in the crowd.
The notebook was not predicting who would matter.
It was preserving who refused to disappear.
Zelda pushed the chamber console harder and routed the notebook feed through every surviving archive relay she could find.
She did not ask permission.
"If they close the amphitheater feed, the record continues elsewhere," she told Xav.
Yve heard her and smiled into the microphone.
"For the record," Yve said, "history is not a press release."
The crowd laughed, then roared.
Security stopped advancing. Not out of mercy, Zelda thought, but because the cameras were now too numerous and too distributed.
Cybol officials switched tactics, promising an independent review board.
No one applauded.
Xav stayed crouched near Ari, one hand hovering over the notebook as if it were both fragile and dangerous, which it was.
"Do we run now?" Ari asked.
He shook his head.
"Not yet. We stay long enough to be witnessed."
In Zelda's timeline, the chamber registry tree shifted again.
The Reivax branch stopped pulsing red-to-blue and settled into a new color the old system did not have a label for.
Manual witness branch.
Unclassifiable.
The update triggered alarms across archival nodes.
Zelda muted them all.
This was not victory.
Cybol still held courts, networks, and patrols.
But they had lost the clean launch of tomorrow's narrative, and with it the easiest version of control.
The second vault opened a final compartment.
Inside was a plain message etched into steel:
Control always begins with naming you before you can name yourself.
Counter it with witnesses.
+ [Lock the chamber records open so more families can inspect them] # cue:rebellion
    ~ rebellion += 1
    -> ch2_family_final
+ [Extract copies and distribute them through trusted community nodes] # cue:stability
    ~ stability += 1
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
Next to Ari's signature, later hands had added short field notes from people who survived the announcement cycle.
Witness cluster at amphitheater held for six hours.
Two patrol defections confirmed.
University archive keys mirrored to community radio basements.
Family registry inquiries increased beyond suppression threshold.
One note was written by Yve in a hurry, ink streaked by rain.
Do not romanticize this. We are exhausted and still in danger. But we are no longer narratively alone.
Another note appeared in Zelda's own handwriting from years she had not lived yet.
If you are reading this from before the hearings, protect the translators.
Facts are inert until someone makes them legible under pressure.
Protect the people who do that work.
Zelda read the line three times, then laughed despite herself.
"Future me is bossy," she told Xav.
"Present you earned it," he answered.
By the time the chamber lights dimmed, Zelda had duplicated the entire witness index to three independent relays and one hand-written ledger, because redundancy was now another word for care.
This Chapter 2 route ends here for now, with the Family Path ready to expand around Ari, the firstborn record, and the hidden lineage mechanism.
+ [End Chapter 2] # cue:ending
    ~ chapterTwoComplete = true
    -> DONE
