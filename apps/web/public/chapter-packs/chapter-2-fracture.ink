VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch2_fracture_start"
VAR currentPOV = "protector"
VAR currentSpeaker = "Mira Vale"
VAR endingKey = "fracture-path"
VAR chapterTwoComplete = false
VAR trustedSorenSignal = false
VAR protectedContradiction = false
VAR exposedArchivistLie = false

-> ch2_fracture_start

=== ch2_fracture_start ===
~ currentSceneId = "ch2_fracture_start"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Chapter 2: The Answering Timeline.
Mira woke in her apartment above the west canal with a sentence burning on her tongue: the future can answer back.
The sentence was not hers. It had Soren Quill's fear inside it, and a child's certainty, and the copper taste of Bell Square rain.
Outside her window, Lattice was repairing the morning. Street sweepers moved in synchronized arcs. A civic banner unrolled over the canal: THANK YOU FOR REMEMBERING SAFELY.
Mira pressed her palm against the glass. For one heartbeat, her reflection looked older than she was.
+ [Write down both versions of Bell Square before they fade] # cue:memory
    ~ memoryFracture += 2
    ~ protectedContradiction = true
    -> ch2_fracture_notes
+ [Report for duty and see what Lattice thinks you remember] # cue:control
    ~ controlIndex += 1
    ~ stability += 1
    -> ch2_fracture_duty

=== ch2_fracture_notes ===
~ currentSceneId = "ch2_fracture_notes"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Mira wrote until the pen split between two histories.
In one column, she wrote the official facts: ceremony completed, civic calm preserved, no injuries recorded.
In the other, she wrote what her body knew: the child crying, the crowd unsmiling, Soren's impossible name, the word fractureline hanging in the air like a crack in stained glass.
The ink did not correct itself. That frightened her more than if it had.
A knock came at the door. Three taps. Then two. Not the rhythm of a Keeper. Not quite.
+ [Hide the page and answer the door] # cue:stability
    ~ stability += 1
    -> ch2_fracture_visitor
+ [Leave the page visible as bait] # cue:entropy
    ~ magicEntropy += 1
    -> ch2_fracture_bait

=== ch2_fracture_duty ===
~ currentSceneId = "ch2_fracture_duty"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The Protector barracks smelled of polished brass and softened fear.
No one mentioned Bell Square. That was how Mira knew everyone remembered it.
Captain Orrel greeted her with a smile that had been rehearsed until it became mercy. He slid a sealed tablet across the desk and asked her to confirm a new record.
On the tablet, Soren Quill was not listed as a Dissenter. He was listed as a Protector casualty from eight years ago.
+ [Ask why a dead Protector was under the rail line yesterday] # cue:memory
    ~ memoryFracture += 1
    -> ch2_fracture_orrel
+ [Sign the confirmation and memorize the contradiction] # cue:control
    ~ controlIndex += 1
    ~ memoryFracture += 1
    -> ch2_fracture_visitor

=== ch2_fracture_visitor ===
~ currentSceneId = "ch2_fracture_visitor"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren stood outside Mira's door wearing a city maintenance coat and the expression of a man who had died in too many official records.
"Do not invite me in unless you want the room to remember me," he said.
Mira almost laughed. Instead, she stepped aside.
The walls flickered. For an instant, her apartment became a hospital room, then a prison intake chamber, then a kitchen where someone had once taught her to cut apples into moons.
+ [Let Soren explain the answering timeline] # cue:memory
    ~ trustedSorenSignal = true
    ~ memoryFracture += 2
    -> ch2_fracture_explanation
+ [Demand proof before trusting him] # cue:stability
    ~ stability += 1
    -> ch2_fracture_proof

=== ch2_fracture_bait ===
~ currentSceneId = "ch2_fracture_bait"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
The page stayed visible on Mira's table.
Soren saw it from the hallway and stopped breathing. He recognized his own warning in the margin, though he had not written it in this version of the hour.
Behind him, a Keeper rounded the stairwell with a smile too warm to belong to a stranger.
The bait had worked. It had also caught the wrong hunter.
+ [Pull Mira through the service door before the Keeper arrives] # cue:rebellion
    ~ rebellion += 2
    -> ch2_fracture_escape
+ [Stay visible and force the Keeper to reveal what it knows] # cue:entropy
    ~ magicEntropy += 2
    -> ch2_fracture_keeper

=== ch2_fracture_orrel ===
~ currentSceneId = "ch2_fracture_orrel"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Captain Orrel's smile did not move, but the room around him became colder.
"Questions are healthy," he said. "Unshared questions are symptoms. Which kind is this?"
Mira looked down at the tablet. Soren's file photo blinked once.
The dead man in the image mouthed a word she could not hear.
+ [Tell Orrel the question is official] # cue:control
    ~ controlIndex += 2
    -> ch2_fracture_keeper
+ [Tell Orrel the question is personal] # cue:memory
    ~ memoryFracture += 2
    -> ch2_fracture_escape

=== ch2_fracture_explanation ===
~ currentSceneId = "ch2_fracture_explanation"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren spread three stolen records across Mira's table.
"Lattice does not erase the past," he said. "It assigns the cost of the past to someone who cannot object. A grieving mother becomes calm. A missing son becomes never born. A war becomes a weather event. The pain goes somewhere."
Mira touched the record with her name on it.
"Where did mine go?"
Soren looked away.
+ [Ask Soren what he knows about your erased cost] # cue:memory
    ~ memoryFracture += 2
    -> ch2_fracture_cost
+ [Ask how to break the cost assignment engine] # cue:rebellion
    ~ rebellion += 2
    -> ch2_fracture_engine

=== ch2_fracture_proof ===
~ currentSceneId = "ch2_fracture_proof"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren reached into his coat and removed a cracked badge.
It was Mira's badge. Not a replica. Hers. The back was scratched with dates she had not lived yet.
"In my future," he said, "you gave this to me right before you ordered me to run. You stayed behind to keep Lattice busy."
Mira took the badge. It was warm from a fire she had never chosen.
+ [Keep the badge and accept that Soren knows one future] # cue:memory
    ~ trustedSorenSignal = true
    ~ memoryFracture += 1
    -> ch2_fracture_cost
+ [Reject the badge as manipulation] # cue:control
    ~ controlIndex += 2
    -> ch2_fracture_keeper

=== ch2_fracture_escape ===
~ currentSceneId = "ch2_fracture_escape"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Mira and Soren ran through the canal service corridor while the city calmly rearranged itself behind them.
A door labeled LAUNDRY became a wall. A wall became a civic mural. The mural showed Mira receiving a medal for reporting Soren Quill.
Mira slammed her shoulder into the part of the mural where Soren's face should have been. The wall opened.
+ [Trust the impossible route through the mural] # cue:entropy
    ~ magicEntropy += 1
    -> ch2_fracture_engine
+ [Slow down and mark the route for later] # cue:stability
    ~ stability += 1
    -> ch2_fracture_cost

=== ch2_fracture_keeper ===
~ currentSceneId = "ch2_fracture_keeper"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The Keeper was young. Younger than Mira expected. His eyes were wet.
"Protector Vale," he said, "please stop remembering in public. It makes us correct bystanders first."
Behind him, neighbors opened their doors with blank faces and listening hands.
Mira understood then that Lattice was not only threatening her. It was threatening everyone near her.
+ [Draw the Keeper's attention fully onto yourself] # cue:control
    ~ controlIndex += 1
    ~ rebellion += 1
    -> ch2_fracture_engine
+ [Expose the threat so the neighbors can choose to run] # cue:rebellion
    ~ rebellion += 2
    ~ exposedArchivistLie = true
    -> ch2_fracture_engine

=== ch2_fracture_cost ===
~ currentSceneId = "ch2_fracture_cost"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
The cost assigned to Mira had a name: Eiran Vale.
Soren said it carefully, like a match held near oil.
Mira had no brother. Then she had always had a brother. Then she remembered his laugh and forgot his face and nearly fell from the force of both things being true.
"The future did not send me back to save the world," Soren said. "It sent me back because you once saved me after learning what the world took from you."
+ [Let the grief arrive] # cue:memory
    ~ memoryFracture += 2
    -> ch2_fracture_final
+ [Turn the grief into a plan] # cue:rebellion
    ~ rebellion += 2
    -> ch2_fracture_final

=== ch2_fracture_engine ===
~ currentSceneId = "ch2_fracture_engine"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The cost assignment engine was hidden inside the bell tower.
Not under it. Not behind it. Inside the sound itself.
Every bell tone carried a corrected memory. Every corrected memory carried a cost. Every cost was filed under a name Lattice believed no one would miss.
Mira looked up as the tower prepared its fourth note.
+ [Climb the tower before the fourth note rings] # cue:rebellion
    ~ rebellion += 2
    -> ch2_fracture_final
+ [Use the fourth note as an anchor and listen inside it] # cue:entropy
    ~ magicEntropy += 2
    -> ch2_fracture_final

=== ch2_fracture_final ===
~ currentSceneId = "ch2_fracture_final"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
By dusk, Mira and Soren reached the bell tower with one stolen record, one impossible badge, and one name the city had failed to bury completely.
Lattice rang the fourth note.
This time, Mira heard the voices inside it.
This Chapter 2 route ends here for now, with the Fracture Path ready to expand into the next full chapter segment.
+ [End Chapter 2] # cue:ending
    ~ chapterTwoComplete = true
    -> DONE
