export const chapterOneInkSource = String.raw`
VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch1_p_001"
VAR currentPOV = "protector"
VAR currentSpeaker = "Mira Vale"
VAR endingKey = ""
VAR chapterOneComplete = false
VAR noticedSynchronizedSmiles = false
VAR reportedToPlatform = false
VAR followedChildEcho = false
VAR markedBellAnchor = false
VAR comfortedChild = false
VAR calledKeeperOnChild = false
VAR stoleCorrectedRecord = false
VAR signedCorrectedRecord = false
VAR authorizedSorenCorrection = false
VAR delayedCorrectionOrder = false
VAR touchedFractureline = false
VAR armedChildMemory = false
VAR miraProtectedChild = false
VAR scatteredCrowd = false

-> ch1_p_001

=== ch1_p_001 ===
~ currentSceneId = "ch1_p_001"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Mira Vale stood at the edge of Bell Square in her blue Protector uniform, one hand resting on the sealed civic record at her side.
In Lattice, the bells did not ring unless something had been corrected. Today they rang three times, and everyone in the square smiled at the exact same moment.
+ [Look for what feels wrong in the crowd] # cue:memory
    ~ memoryFracture += 1
    ~ noticedSynchronizedSmiles = true
    -> ch1_d_echo
+ [Do your Protector duty and report to the ceremony platform] # cue:control
    ~ controlIndex += 1
    ~ reportedToPlatform = true
    -> ch1_d_duty

=== ch1_d_echo ===
~ currentSceneId = "ch1_d_echo"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Below the old rail line, Soren Quill heard the correction ripple through the city above.
Someone inside the ceremony had noticed the smiles were synchronized. That meant Mira was not fully asleep inside Lattice anymore.
+ [Follow the childlike voice deeper into the tunnels] # cue:rebellion
    ~ rebellion += 1
    ~ followedChildEcho = true
    -> ch1_p_child
+ [Use the bell tower as a fixed point in time] # cue:entropy
    ~ magicEntropy += 1
    ~ markedBellAnchor = true
    -> ch1_p_record

=== ch1_d_duty ===
~ currentSceneId = "ch1_d_duty"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren watched Mira step toward the ceremony platform instead of the crowd.
That route was harder. If Mira stayed loyal, Lattice would use her as the signature on whatever lie came next.
+ [Map the ceremony correction and avoid direct contact] # cue:stability
    ~ stability += 1
    -> ch1_p_authority
+ [Quietly corrupt the ceremony logs before Mira signs them] # cue:rebellion
    ~ rebellion += 1
    ~ magicEntropy += 1
    -> ch1_p_record

=== ch1_p_child ===
~ currentSceneId = "ch1_p_child"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
A child in the crowd pointed at Mira and began to cry.
When her mother asked why, the child said, "Because she already chose the fire." The phrase struck Mira like a memory from a life she had never lived.
+ [Break protocol and comfort the child yourself] # cue:rebellion
    ~ rebellion += 2
    ~ comfortedChild = true
    -> ch1_d_rebellion
+ [Call a Keeper to calm and correct the child] # cue:control
    ~ controlIndex += 2
    ~ calledKeeperOnChild = true
    -> ch1_d_control

=== ch1_p_record ===
~ currentSceneId = "ch1_p_record"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The Archivist handed Mira the corrected record. Her name was already signed at the bottom.
She had no memory of signing it. The ink was still wet, and one line kept changing whenever she looked away.
+ [Hide the record so you can inspect it later] # cue:memory
    ~ memoryFracture += 2
    ~ stoleCorrectedRecord = true
    -> ch1_d_memory
+ [Sign the record publicly and preserve the ceremony] # cue:control
    ~ controlIndex += 2
    ~ stability += 1
    ~ signedCorrectedRecord = true
    -> ch1_d_control

=== ch1_p_authority ===
~ currentSceneId = "ch1_p_authority"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The Archivist did not hand Mira a record. He handed her a sealed order.
It named a Dissenter beneath the rail line and asked Mira to authorize a private correction before anyone in the square noticed the disturbance.
+ [Authorize the private correction] # cue:control
    ~ controlIndex += 2
    ~ stability += 1
    ~ authorizedSorenCorrection = true
    -> ch1_d_control
+ [Delay the order and ask why the Dissenter knows your name] # cue:memory
    ~ memoryFracture += 1
    ~ rebellion += 1
    ~ delayedCorrectionOrder = true
    -> ch1_d_memory

=== ch1_d_rebellion ===
~ currentSceneId = "ch1_d_rebellion"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
The tunnel wall split open like glass under pressure.
Through it, Soren saw Mira kneeling beside the child instead of handing her to the Keepers. That was not the timeline he came from. It was better, and therefore more dangerous.
+ [Reach through the break in time toward Mira] # cue:entropy
    ~ magicEntropy += 2
    ~ touchedFractureline = true
    -> ch1_p_fracture
+ [Send the child one protected memory before the break closes] # cue:rebellion
    ~ rebellion += 2
    ~ armedChildMemory = true
    -> ch1_p_rebellion

=== ch1_d_memory ===
~ currentSceneId = "ch1_d_memory"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
The stolen page appeared in Soren’s hand before Mira had finished deciding what to do with it.
Across the margin, in his own handwriting, were three words: Do not trust me.
+ [Remember the warning and keep the page intact] # cue:memory
    ~ memoryFracture += 2
    -> ch1_p_fracture
+ [Burn the warning before it can rewrite your mission] # cue:stability
    ~ stability += 2
    -> ch1_p_control

=== ch1_d_control ===
~ currentSceneId = "ch1_d_control"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
The city tightened around Soren. Doors remembered being walls. Cameras remembered looking away. The correction was already moving.
Mira had kept the ceremony intact, and Lattice rewarded loyalty by making the next disobedient thought harder to form.
+ [Hide and preserve the mission for another fracture] # cue:stability
    ~ stability += 1
    -> ch1_p_control
+ [Force one message through before Lattice seals the tunnels] # cue:entropy
    ~ magicEntropy += 2
    -> ch1_p_fracture

=== ch1_p_fracture ===
~ currentSceneId = "ch1_p_fracture"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
Mira’s palm burned with a memory that was not hers.
She remembered Soren reaching through a wall. She remembered him refusing. She remembered both as if both had already happened.
+ [Say the impossible word: fractureline] # cue:memory
    ~ memoryFracture += 2
    -> ch1_end_fracture
+ [Seal the impossible memory before anyone sees your fear] # cue:control
    ~ controlIndex += 1
    -> ch1_end_control

=== ch1_p_rebellion ===
~ currentSceneId = "ch1_p_rebellion"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The child stopped crying and smiled at Mira without synchronization.
Around them, the crowd’s perfect calm broke into hundreds of different expressions. Lattice had lost the room for three impossible seconds.
+ [Stand between the child and the Keepers] # cue:rebellion
    ~ rebellion += 2
    ~ miraProtectedChild = true
    -> ch1_end_rebellion
+ [Tell the crowd to run before the correction resumes] # cue:rebellion
    ~ magicEntropy += 1
    ~ rebellion += 1
    ~ scatteredCrowd = true
    -> ch1_end_rebellion

=== ch1_p_control ===
~ currentSceneId = "ch1_p_control"
~ currentPOV = "protector"
~ currentSpeaker = "Mira Vale"
The ceremony finished exactly on time.
Only Mira noticed that three minutes had disappeared from the public record. Only Mira noticed she was relieved.
+ [Accept the order and let the missing minutes stay missing] # cue:control
    ~ controlIndex += 1
    -> ch1_end_control
* {memoryFracture >= 1} [Write yourself a private note before the relief becomes obedience] # cue:memory
    ~ memoryFracture += 1
    -> ch1_end_fracture

=== ch1_end_fracture ===
~ currentSceneId = "ch1_end_fracture"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren’s device showed a completed choice log, but the first line did not belong to him or Mira.
Ending: The Fracture Path. Mira knows the city lies. Soren knows the timeline can answer back.
+ [End Chapter 1] # cue:ending
    ~ chapterOneComplete = true
    ~ endingKey = "fracture-path"
    -> ch1_complete_fracture

=== ch1_end_rebellion ===
~ currentSceneId = "ch1_end_rebellion"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
The bell tower missed its fourth note. For the first time in years, Lattice had to improvise.
Ending: The Rebellion Path. Mira has publicly broken protocol. Soren has made the future less certain and more alive.
+ [End Chapter 1] # cue:ending
    ~ chapterOneComplete = true
    ~ endingKey = "rebellion-path"
    -> ch1_complete_rebellion

=== ch1_end_control ===
~ currentSceneId = "ch1_end_control"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Soren woke beneath the rail line with the taste of erased words in his mouth.
Ending: The Control Path. Lattice holds the city, but Mira has become important enough for the city to fear her doubt.
+ [End Chapter 1] # cue:ending
    ~ chapterOneComplete = true
    ~ endingKey = "control-path"
    -> ch1_complete_control

=== ch1_complete_fracture ===
~ currentSceneId = "ch1_complete_fracture"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Ending: The Fracture Path. Chapter 1 complete.
-> DONE

=== ch1_complete_rebellion ===
~ currentSceneId = "ch1_complete_rebellion"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Ending: The Rebellion Path. Chapter 1 complete.
-> DONE

=== ch1_complete_control ===
~ currentSceneId = "ch1_complete_control"
~ currentPOV = "dissenter"
~ currentSpeaker = "Soren Quill"
Ending: The Control Path. Chapter 1 complete.
-> DONE
`;
