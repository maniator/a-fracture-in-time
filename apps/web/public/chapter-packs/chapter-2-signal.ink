VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch2_signal_start"
VAR currentPOV = "past"
VAR currentSpeaker = "Xav Reivax"
VAR endingKey = "signal-path"
VAR chapterTwoComplete = false
VAR yveBuiltProtocol = false
VAR zeldaMappedTunnels = false
VAR diderramQuestionLogged = false

-> ch2_signal_start

=== ch2_signal_start ===
~ currentSceneId = "ch2_signal_start"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Chapter 2: The Stable Signal.
The next morning, Yve arrived at my house with three tablets, two legal pads, and the face she made when she had already decided I was going to do something stupid.
"Rules," she said, dropping everything on my desk. "If we are talking to the future, we need rules. No vague warnings. No emotional spirals. No changing anything until we understand what changes cost."
My broken com sat beside the family notebook. The notebook sat beside Ari's untouched breakfast. Nobody in my house was acting normal, but everyone was pretending hard enough to make it worse.
The com buzzed once.
Zelda's voice came through clearer than before.
"Xav? The tunnel wall changed overnight. We need to talk."
+ [Let Yve create a careful contact protocol] # cue:stability
    ~ stability += 2
    ~ yveBuiltProtocol = true
    -> ch2_signal_protocol
+ [Ask Zelda what changed before the signal drops] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_tunnel

=== ch2_signal_protocol ===
~ currentSceneId = "ch2_signal_protocol"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve wrote three rules in the first column.
One: verify every claim across both eras.
Two: never give Zelda names she does not already know.
Three: never assume a better future means Zelda survives it.
I hated rule three immediately.
"That one stays," Yve said, without looking up. "Especially because you hate it."
The family notebook opened by itself. A blank page darkened with a sentence written in a hand I did not recognize.
Ask about the peace archive.
+ [Ask Zelda about the peace archive] # cue:memory
    ~ memoryFracture += 1
    ~ diderramQuestionLogged = true
    -> ch2_signal_archive
+ [Ask Yve why the notebook answered before Zelda did] # cue:stability
    ~ stability += 1
    -> ch2_signal_notebook

=== ch2_signal_tunnel ===
~ currentSceneId = "ch2_signal_tunnel"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The tunnel wall had rewritten itself while Zelda slept.
Yesterday, it held a Cybol victory slogan: ORDER MADE AYKER WHOLE.
Now the same wall read: IF CYBOL BROUGHT PEACE, WHY DID DIDERRAM BURN?
Zelda ran her fingers over the letters. They were not painted on. They had grown through the stone like roots.
Behind her, one of the other scavengers whispered that they should seal the device back in its case and pretend they had found nothing.
Zelda almost understood.
+ [Map the changed tunnel before anyone can erase it] # cue:memory
    ~ memoryFracture += 1
    ~ zeldaMappedTunnels = true
    -> ch2_signal_archive
+ [Broadcast the wall text to the rest of the group] # cue:rebellion
    ~ rebellion += 2
    -> ch2_signal_group

=== ch2_signal_notebook ===
~ currentSceneId = "ch2_signal_notebook"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
The notebook had always been described as a family tradition. Old, strange, maybe sentimental.
It had not been described as an object that could answer questions nobody had asked aloud.
Yve leaned close but did not touch it.
"Your family has been passing down a communication device and calling it a diary," she said.
"That is one theory."
"It wrote back, Xav. I am comfortable upgrading from theory."
The com crackled.
Zelda said, "Whatever you just opened, the ruins felt it."
+ [Tell Zelda the notebook answered] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_archive
+ [Close the notebook until you know more] # cue:stability
    ~ stability += 2
    -> ch2_signal_group

=== ch2_signal_archive ===
~ currentSceneId = "ch2_signal_archive"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The peace archive was not supposed to exist.
In Zelda's history lessons, Cybol's records had either been destroyed in the fall or sealed by Diderram for public safety.
But the new tunnel map pointed under the old University history wing, beneath the exact lecture hall where Xav had taken his exam.
Zelda crawled through a collapsed service duct with the device strapped to her chest. The closer she got, the more voices it caught from Xav's room: Yve arguing, Ari asking questions, Xav trying to sound calm and failing.
At the end of the duct, Zelda found a door with no handle.
It opened when she said Xav's name.
+ [Enter the peace archive alone] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_records
+ [Wait for the scavenger group and risk losing time] # cue:stability
    ~ stability += 1
    -> ch2_signal_group

=== ch2_signal_group ===
~ currentSceneId = "ch2_signal_group"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The others wanted a vote.
That was how future Brinkton survived: no one opened a sealed door alone, no one trusted Cybol tech alone, no one let a single hopeful person doom everyone else.
Marek, the oldest of them, pointed at the device in Zelda's hand.
"If you change the past," he said, "you may erase the only people who know the future is broken."
Zelda looked at the tunnel wall, at the new question carved through old stone.
"If we do nothing," she said, "we already know what survives."
+ [Convince the group to help open the archive] # cue:rebellion
    ~ rebellion += 1
    -> ch2_signal_records
+ [Promise to share every contact with the group] # cue:stability
    ~ stability += 2
    -> ch2_signal_records

=== ch2_signal_records ===
~ currentSceneId = "ch2_signal_records"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The archive did not hold books. It held rooms.
Each room preserved one official Cybol memory: clean speeches, signing ceremonies, smiling Diderram delegates, children waving two flags under one Ayker sun.
Then Zelda found the uncorrected room.
It was smaller than the others. Darker. At its center, a Diderram girl about Zelda's age repeated one sentence into a damaged recorder.
Cybol did not bring peace. Cybol brought silence and taught our children to call it peace.
The recorder stamped the date: 3.14.874cy.
The same day as Xav's exam.
+ [Send the recording to Xav immediately] # cue:rebellion
    ~ rebellion += 2
    -> ch2_signal_final
+ [Ask Xav and Yve to find the same record in the past] # cue:stability
    ~ stability += 2
    -> ch2_signal_final

=== ch2_signal_final ===
~ currentSceneId = "ch2_signal_final"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
By nightfall, Yve had built a protocol, Zelda had found the peace archive, and my family notebook had stopped pretending to be a notebook.
The recording from Diderram played once through my broken com.
When it ended, the page in front of me filled with a new date.
Tomorrow.
Beneath it, one line appeared in my own handwriting, though I had not written it yet.
Do not let Cybol make the announcement.
+ [End Chapter 2] # cue:ending
    ~ chapterTwoComplete = true
    -> DONE
