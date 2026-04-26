VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch2_rebellion_start"
VAR currentPOV = "protector"
VAR currentSpeaker = "Mira Vale"
VAR endingKey = "rebellion-path"
VAR chapterTwoComplete = false
VAR protectedChildWitness = false
VAR sparkedPublicMemory = false
VAR madeSorenVisible = false

-> ch2_rebellion_start

=== ch2_rebellion_start ===
~ currentSceneId = "ch2_rebellion_start"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Chapter 2: The Room That Broke.
Bell Square did not recover. Lattice forced the smiles back into place, but for three seconds the city had remembered itself as thousands of separate people.
Mira spent the night in a civic interview room with no corners. Every wall curved gently toward her, as if the room had been designed to keep thoughts from hiding.
Across the table, the child from the ceremony sat wrapped in a gray blanket. No one had asked Mira to protect her. That was how Mira knew she was supposed to give her up.
+ [Tell the child she is not in trouble] # cue:rebellion
    ~ rebellion += 2
    ~ protectedChildWitness = true
    -> ch2_rebellion_child
+ [Ask the interview room what it wants you to confess] # cue:entropy
    ~ magicEntropy += 1
    -> ch2_rebellion_room

=== ch2_rebellion_child ===
~ currentSceneId = "ch2_rebellion_child"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The child said her name was Ilyra, but then corrected herself. "That is the name they let me keep."
Mira felt the sentence land like a key in a lock.
Ilyra held out her hand. In her palm was a memory too large for a child: a tower burning in reverse, Soren Quill laughing through blood, Mira standing in front of a crowd and refusing to ring the bell.
"He told me to give you this if you forgot," Ilyra whispered.
+ [Accept the protected memory from Ilyra] # cue:memory
    ~ memoryFracture += 2
    -> ch2_rebellion_memory
+ [Refuse to make the child carry more danger] # cue:stability
    ~ stability += 2
    -> ch2_rebellion_room

=== ch2_rebellion_room ===
~ currentSceneId = "ch2_rebellion_room"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren watched the interview room from a maintenance crawlspace behind a false vent.
The room had no corners because corners collected unapproved memory. The first regime had learned that by accident. Lattice had made it policy.
He could hear Mira breathing. He could hear the child trying not to cry. He could hear the correction engine below the floor beginning to warm.
If he acted too soon, he would expose himself. If he waited, the child would become calm forever.
+ [Cut power to the interview room] # cue:rebellion
    ~ rebellion += 2
    ~ madeSorenVisible = true
    -> ch2_rebellion_blackout
+ [Send Mira a message through the vent] # cue:memory
    ~ memoryFracture += 1
    -> ch2_rebellion_signal

=== ch2_rebellion_memory ===
~ currentSceneId = "ch2_rebellion_memory"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The protected memory opened inside Mira like a door kicked from the other side.
She saw a future classroom where children practiced smiling in mirrors. She saw Ilyra as an adult, leading people through service tunnels, teaching them how to keep one private thought alive under correction.
Then she saw the future end when Lattice learned to correct rebellion before it began.
Mira fell back into the interview room with Ilyra's hand still in hers.
+ [Promise Ilyra you will get her out] # cue:rebellion
    ~ rebellion += 2
    ~ protectedChildWitness = true
    -> ch2_rebellion_blackout
+ [Ask what Soren gave her besides the memory] # cue:memory
    ~ memoryFracture += 1
    -> ch2_rebellion_signal

=== ch2_rebellion_signal ===
~ currentSceneId = "ch2_rebellion_signal"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren tapped the vent in a pattern Mira should not have known.
Three short. One long. Two short. In the future, it meant: breathe, then lie.
Mira looked up. The room heard her look up.
The correction engine slowed, considering whether recognition counted as evidence.
+ [Tell Mira to lie badly enough that the room doubts itself] # cue:entropy
    ~ magicEntropy += 2
    -> ch2_rebellion_bad_lie
+ [Tell Mira the child is the witness Lattice fears] # cue:memory
    ~ memoryFracture += 2
    -> ch2_rebellion_witness

=== ch2_rebellion_blackout ===
~ currentSceneId = "ch2_rebellion_blackout"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The lights died.
For one blessed second, the room had no opinion about what anyone remembered.
Mira moved before duty could catch her. She lifted Ilyra, kicked the table into the door, and heard Soren swear somewhere inside the wall.
The emergency lamps came on red. Red was not a correction color. Red meant Lattice had lost certainty.
+ [Run toward Soren's voice] # cue:rebellion
    ~ rebellion += 1
    ~ madeSorenVisible = true
    -> ch2_rebellion_hall
+ [Use the red lamps to lead other detainees out] # cue:rebellion
    ~ rebellion += 2
    ~ sparkedPublicMemory = true
    -> ch2_rebellion_crowd

=== ch2_rebellion_bad_lie ===
~ currentSceneId = "ch2_rebellion_bad_lie"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Mira looked directly at the listening wall and said, "Nothing unusual happened in Bell Square."
The lie was too clean. Too official. Too much like a sentence the wall had written for her.
The room paused.
Mira continued, "Ilyra cried because she hates bells. Soren Quill is a bedtime story. I am perfectly calm."
The wall began to hum in confusion. Perfect calm was easy to correct. Mockery was harder.
+ [Keep lying until the room contradicts itself] # cue:entropy
    ~ magicEntropy += 2
    -> ch2_rebellion_hall
+ [Turn the lie into a public confession] # cue:rebellion
    ~ rebellion += 2
    -> ch2_rebellion_crowd

=== ch2_rebellion_witness ===
~ currentSceneId = "ch2_rebellion_witness"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Ilyra was not dangerous because she remembered Bell Square.
She was dangerous because the memory had chosen her back.
Every time the correction engine reached for the child, the protected memory split into copies. One settled in Mira. One flickered through the vent toward Soren. One escaped into the wall.
Lattice had built a room with no corners. The memory made corners anyway.
+ [Let the memory spread through the building] # cue:entropy
    ~ magicEntropy += 2
    ~ sparkedPublicMemory = true
    -> ch2_rebellion_crowd
+ [Contain the memory long enough to escape with Ilyra] # cue:stability
    ~ stability += 2
    -> ch2_rebellion_hall

=== ch2_rebellion_hall ===
~ currentSceneId = "ch2_rebellion_hall"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren dropped from the vent into the hall with dust in his hair and a stolen maintenance badge between his teeth.
"This way," he said.
Mira stared at him for half a second too long.
"I know," she said, though she did not.
Behind them, the interview room began politely asking everyone in the building to forget the sound of running feet.
+ [Use Soren's route through the old service spine] # cue:stability
    ~ stability += 1
    -> ch2_rebellion_spine
+ [Break open the public stairwell instead] # cue:rebellion
    ~ rebellion += 2
    -> ch2_rebellion_crowd

=== ch2_rebellion_crowd ===
~ currentSceneId = "ch2_rebellion_crowd"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The public stairwell filled with people who had not planned to rebel.
A clerk with shaking hands. A sanitation worker still wearing civic gray. Two Keepers who looked younger now that they were afraid.
Ilyra lifted her head from Mira's shoulder and began humming the bell note that had failed in the square.
Everyone who heard it remembered one thing Lattice had taken.
+ [Tell the crowd to speak one stolen memory each] # cue:rebellion
    ~ rebellion += 2
    ~ sparkedPublicMemory = true
    -> ch2_rebellion_final
+ [Get the crowd out before Lattice seals the building] # cue:stability
    ~ stability += 2
    -> ch2_rebellion_final

=== ch2_rebellion_spine ===
~ currentSceneId = "ch2_rebellion_spine"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
The old service spine ran beneath three civic buildings and one abandoned theater.
Soren had used it in six timelines. In four, it saved them. In one, it delivered them directly to Lattice. In the last, Mira had collapsed laughing because the future had finally made a joke at its own expense.
This version smelled like dust and oranges.
That was new.
+ [Trust the new detail and follow the orange scent] # cue:memory
    ~ memoryFracture += 1
    -> ch2_rebellion_final
+ [Ignore the anomaly and use Soren's old map] # cue:stability
    ~ stability += 1
    -> ch2_rebellion_final

=== ch2_rebellion_final ===
~ currentSceneId = "ch2_rebellion_final"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
By sunrise, Bell Square was no longer the only room that had broken.
The interview building released thirty-seven people, five impossible memories, and one child who knew how to carry the future without becoming its prisoner.
Lattice did not fall. But it spent the morning correcting rumors, and rumors were slower than witnesses.
This Chapter 2 route ends here for now, with the Rebellion Path ready to expand into the next full chapter segment.
+ [End Chapter 2] # cue:ending
    ~ chapterTwoComplete = true
    -> DONE
