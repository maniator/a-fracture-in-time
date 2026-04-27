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
VAR professorInvolved = false
VAR nalaTrusted = false
VAR archiveProofCopied = false
VAR announcementMapped = false
VAR universityAlarmed = false
VAR cybolMonitorSeen = false

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
+ [Ask Ari whether the notebook changed her dreams] # cue:memory
    ~ memoryFracture += 1
    -> ch2_signal_ari

=== ch2_signal_ari ===
~ currentSceneId = "ch2_signal_ari"
~ currentPOV = "past"
~ currentSpeaker = "Ari Reivax"
Ari sat at the kitchen table drawing the same shape over and over: a circle split by a branch, or maybe a planet cut by a river.
"I dreamed about a school underground," she said. "Everyone was older than me, but they were scared like kids."
Yve stopped writing.
"Did Zelda tell you that?"
Ari shook her head. "The book did. But not with words."
The family notebook snapped open on the table. One blank page filled with a list of names none of us knew.
At the bottom, one name kept rewriting itself.
Nala. Nahlah. Nala Renn.
+ [Ask Zelda if Nala Renn exists in the future] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_nala_future
+ [Ask Yve to keep Ari away from the notebook] # cue:stability
    ~ stability += 2
    -> ch2_signal_protocol
+ [Write Nala Renn into your own notes before the page changes] # cue:rebellion
    ~ rebellion += 1
    -> ch2_signal_nala_past

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
+ [Take the protocol to someone at the university] # cue:control
    ~ controlIndex += 1
    -> ch2_signal_professor

=== ch2_signal_tunnel ===
~ currentSceneId = "ch2_signal_tunnel"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The tunnel wall had rewritten itself while Zelda slept.
Yesterday, it held a Cybol victory slogan: ORDER MADE AYKER WHOLE.
Now the same wall read: IF CYBOL BROUGHT PEACE, WHY DID DIDERRAM BURN?
Zelda ran her fingers over the letters. They were not painted on. They had grown through the stone like roots.
Behind her, Marek — the oldest of the tunnel scavengers, the one who knew which walls had ears — whispered that they should seal the device back in its case and pretend they had found nothing.
Zelda almost understood.
+ [Map the changed tunnel before anyone can erase it] # cue:memory
    ~ memoryFracture += 1
    ~ zeldaMappedTunnels = true
    -> ch2_signal_archive
+ [Broadcast the wall text to the rest of the group] # cue:rebellion
    ~ rebellion += 2
    -> ch2_signal_group
+ [Search for the old route beneath the history wing] # cue:stability
    ~ stability += 1
    -> ch2_signal_archive_door

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
+ [Ask the notebook who built it] # cue:entropy
    ~ magicEntropy += 2
    -> ch2_signal_notebook_answer

=== ch2_signal_notebook_answer ===
~ currentSceneId = "ch2_signal_notebook_answer"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
The notebook answered with a diagram instead of a name.
A circle for Ayker. Two marks for Cybol and Diderram. A third mark beneath them, smaller, hidden, connected to both.
Yve traced the air above the page without touching it.
"That's not a family tree," she said. "That's an infrastructure map."
The ink moved again.
The family carries what institutions destroy.
Then the page went blank.
+ [Copy the diagram before it fades completely] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_university
+ [Ask Zelda whether the hidden mark exists under old Brinkton] # cue:memory
    ~ memoryFracture += 1
    -> ch2_signal_archive_door

=== ch2_signal_professor ===
~ currentSceneId = "ch2_signal_professor"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve did not like involving Professor Halden. That was why she suggested him.
"If I only choose people I trust, I am choosing emotionally," she said. "Halden is cautious, ambitious, and terrified of being wrong in public. Useful qualities."
Professor Halden taught Civic History and smiled with the exact politeness of a man who knew which rooms had listening vents.
He read Yve's protocol. He read the copied phrase from the notebook. Then he locked his office door.
"Where did you get the words peace archive?"
+ [Tell Halden everything and ask for help] # cue:control
    ~ controlIndex += 2
    ~ professorInvolved = true
    -> ch2_signal_halden_help
+ [Lie and say it came from an anonymous campus forum] # cue:stability
    ~ stability += 1
    -> ch2_signal_halden_forum
+ [Ask why he recognizes the phrase] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_halden_memory

=== ch2_signal_halden_help ===
~ currentSceneId = "ch2_signal_halden_help"
~ currentPOV = "past"
~ currentSpeaker = "Professor Halden"
Halden listened without interrupting. That made it worse.
When I finished, he opened an old drawer with a mechanical key and removed a paper file so thin it looked ceremonial.
"There is no peace archive," he said. "That is the official answer. The unofficial answer is that every history department in Cybol is trained not to search for it."
Yve stared at him. "You knew our exam topic was false."
"I knew it was incomplete. There is a difference when you want to keep your job."
+ [Ask Halden for access to the restricted exam source] # cue:control
    ~ controlIndex += 1
    -> ch2_signal_university
+ [Tell Zelda Halden knows about the archive] # cue:memory
    ~ memoryFracture += 1
    -> ch2_signal_archive

=== ch2_signal_halden_forum ===
~ currentSceneId = "ch2_signal_halden_forum"
~ currentPOV = "past"
~ currentSpeaker = "Professor Halden"
"Anonymous forum," Halden repeated.
He did not believe me. He did not say so.
Instead, he turned his desk display toward us. A campus security notice glowed on the screen: UNSANCTIONED DIDERRAM REVISION MATERIAL DETECTED.
The timestamp was three minutes after Zelda's first message.
"Whatever you found," Halden said, "it is already looking for you too."
+ [Leave before Halden can report you] # cue:rebellion
    ~ rebellion += 1
    -> ch2_signal_campus_alarm
+ [Ask Halden how to avoid the monitor sweep] # cue:stability
    ~ stability += 2
    -> ch2_signal_university

=== ch2_signal_halden_memory ===
~ currentSceneId = "ch2_signal_halden_memory"
~ currentPOV = "past"
~ currentSpeaker = "Professor Halden"
Halden sat down as if his legs had stopped being part of the argument.
"My grandmother was Diderram," he said. "Officially she was a Cybol citizen from the western restoration district. Unofficially, she taught me a lullaby in a language the university says no longer exists."
He wrote three words from the lullaby on a scrap of paper.
The family notebook, still in my bag, warmed against my side.
+ [Keep Halden's words for Zelda] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_nala_future
+ [Ask Halden to come with you to the restricted archive] # cue:rebellion
    ~ rebellion += 1
    ~ professorInvolved = true
    -> ch2_signal_university

=== ch2_signal_nala_future ===
~ currentSceneId = "ch2_signal_nala_future"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Zelda knew the name Nala Renn.
Not personally. Nobody knew Nala personally anymore. But future children in the shelters used her name when they wanted to accuse someone of telling an expensive truth.
Don't go Renn on us, they said, when someone wanted to open a sealed door.
The device translated Xav's copied name into an archive coordinate beneath the history wing.
Marek saw it and swallowed.
"Nala Renn recorded the last Diderram objection before the peace vote," he said. "Then Cybol made her into a myth about hysteria."
+ [Search for Nala's original recording] # cue:memory
    ~ memoryFracture += 2
    ~ nalaTrusted = true
    -> ch2_signal_archive_door
+ [Ask Xav to find Nala in the living university records] # cue:stability
    ~ stability += 1
    -> ch2_signal_nala_past
+ [Tell the group Nala was real] # cue:rebellion
    ~ rebellion += 2
    -> ch2_signal_group

=== ch2_signal_nala_past ===
~ currentSceneId = "ch2_signal_nala_past"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Nala Renn was not in the public student directory.
Yve found her in a scholarship ledger by searching for the absence instead of the name.
"Here," she said. "One Diderram exchange fellowship awarded to a student whose identity was later sealed for civic privacy."
"Civic privacy sounds fake."
"It sounds legal," Yve said. "That is worse."
The ledger listed one active sponsor: Professor Halden.
+ [Go to Halden with Nala's sealed record] # cue:control
    ~ controlIndex += 1
    -> ch2_signal_professor
+ [Send the sealed record to Zelda] # cue:memory
    ~ memoryFracture += 1
    -> ch2_signal_archive_door
+ [Publish the record anonymously on campus] # cue:rebellion
    ~ rebellion += 2
    ~ universityAlarmed = true
    -> ch2_signal_campus_alarm

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
+ [Search the door for Nala Renn's mark first] # cue:memory
    ~ memoryFracture += 1
    -> ch2_signal_archive_door

=== ch2_signal_archive_door ===
~ currentSceneId = "ch2_signal_archive_door"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The door did have a mark.
Not a lock. Not a handle. A small carved branch inside a circle, the same shape Ari had drawn in Xav's kitchen.
When Zelda touched it, the door asked for a witness phrase.
The device offered three possible translations from damaged Cybol script. Marek said all of them sounded wrong.
That was when Zelda heard Nala Renn's voice, thin as wire, whispering from the other side.
"A witness does not ask permission to remember."
+ [Speak Nala's phrase to the door] # cue:memory
    ~ memoryFracture += 2
    ~ nalaTrusted = true
    -> ch2_signal_records
+ [Ask Xav to check the phrase in the past first] # cue:stability
    ~ stability += 1
    -> ch2_signal_university
+ [Force the door before it can change the question] # cue:rebellion
    ~ rebellion += 2
    -> ch2_signal_records

=== ch2_signal_university ===
~ currentSceneId = "ch2_signal_university"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
By late afternoon, the University of Brinkton no longer felt like a campus.
It felt like a machine pretending to be a campus.
Every public display repeated tomorrow's announcement schedule. Every announcement used the same phrase: A NEW ERA OF CYBOL-DIDERRAM CIVIC PARTNERSHIP.
Yve hacked a study-room terminal just long enough to find the restricted source list for our exam.
There were twelve sources.
Eleven were public.
The twelfth was marked: RENN OBJECTION, ACCESS REVOKED.
+ [Copy the revoked source to the com] # cue:memory
    ~ memoryFracture += 2
    ~ archiveProofCopied = true
    -> ch2_signal_records
+ [Map tomorrow's announcement security route] # cue:stability
    ~ stability += 1
    ~ announcementMapped = true
    -> ch2_signal_announcement_map
+ [Trip the monitor sweep to see who responds] # cue:rebellion
    ~ rebellion += 2
    ~ universityAlarmed = true
    -> ch2_signal_campus_alarm

=== ch2_signal_campus_alarm ===
~ currentSceneId = "ch2_signal_campus_alarm"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
The campus did not sound an alarm.
That would have been honest.
Instead, the library lights warmed, the doors softened shut, and every display invited students to remain calm during a routine civic verification.
Yve looked at me over the terminal.
"Xav. We are the routine civic verification."
My com buzzed with Zelda's voice at the same time a polite security drone turned into the aisle.
+ [Let Yve talk the drone into a procedural delay] # cue:control
    ~ controlIndex += 2
    ~ cybolMonitorSeen = true
    -> ch2_signal_announcement_map
+ [Run with the copied source file] # cue:rebellion
    ~ rebellion += 2
    -> ch2_signal_records
+ [Use the com signal to confuse the drone sensors] # cue:entropy
    ~ magicEntropy += 2
    -> ch2_signal_records

=== ch2_signal_announcement_map ===
~ currentSceneId = "ch2_signal_announcement_map"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Tomorrow's announcement would happen in the old civic amphitheater, a place built to make every speaker look like they stood at the center of Ayker.
Yve mapped entrances, exits, faculty sections, press sections, and the route assigned to Diderram delegates.
There were no Diderram delegates.
There were Cybol actors assigned to play them for the broadcast.
I read that line three times before it became real.
+ [Send the delegate list to Zelda] # cue:memory
    ~ memoryFracture += 1
    -> ch2_signal_records
+ [Plan to confront Halden with the actor list] # cue:control
    ~ controlIndex += 1
    -> ch2_signal_halden_help
+ [Prepare to expose the list at the announcement] # cue:rebellion
    ~ rebellion += 2
    ~ announcementMapped = true
    -> ch2_signal_final

=== ch2_signal_group ===
~ currentSceneId = "ch2_signal_group"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The others wanted a vote.
That was how future Brinkton survived: no one opened a sealed door alone, no one trusted Cybol tech alone, no one let a single hopeful person doom everyone else.
Marek pointed at the device in Zelda's hand.
"If you change the past," he said, "you may erase the only people who know the future is broken."
Zelda looked at the tunnel wall, at the new question carved through old stone.
"If we do nothing," she said, "we already know what survives."
+ [Convince the group to help open the archive] # cue:rebellion
    ~ rebellion += 1
    -> ch2_signal_records
+ [Promise to share every contact with the group] # cue:stability
    ~ stability += 2
    -> ch2_signal_records
+ [Ask Marek what he knows about Nala Renn] # cue:memory
    ~ memoryFracture += 1
    -> ch2_signal_nala_future

=== ch2_signal_records ===
~ currentSceneId = "ch2_signal_records"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The archive did not hold books. It held rooms.
Each room preserved one official Cybol memory: clean speeches, signing ceremonies, smiling Diderram delegates, children waving two flags under one Ayker sun.
Then Zelda found the uncorrected room.
It was smaller than the others. Darker. At its center, Nala Renn repeated one sentence into a damaged recorder.
Cybol did not bring peace. Cybol brought silence and taught our children to call it peace.
The recorder stamped the date: 3.14.874cy.
The same day as Xav's exam.
Then a second recording started. Nala looked directly at the recorder and said, "Tomorrow they will replace our delegates with actors. If this survives, someone in Cybol helped hide it."
+ [Send both recordings to Xav immediately] # cue:rebellion
    ~ rebellion += 2
    ~ archiveProofCopied = true
    -> ch2_signal_final
+ [Ask Xav and Yve to find the same record in the past] # cue:stability
    ~ stability += 2
    -> ch2_signal_university
+ [Search the archive for the Cybol helper] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_helper

=== ch2_signal_helper ===
~ currentSceneId = "ch2_signal_helper"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The Cybol helper had no name in the archive.
Only initials: H.R.
Zelda found them stamped on access logs, correction seals, and one handwritten note tucked behind Nala's final recording.
I could not stop the announcement. I could only make sure someone in the past could find proof before the second lie.
H.R.
Halden Renn.
Marek exhaled like a man hearing an old door unlock.
"Professor Halden was Nala's grandson," he said. "Cybol let him teach the lie because they thought family shame would keep him obedient."
+ [Tell Xav that Halden is part of Nala's line] # cue:memory
    ~ memoryFracture += 2
    -> ch2_signal_final
+ [Keep searching for what Halden hid in the past] # cue:stability
    ~ stability += 1
    -> ch2_signal_final

=== ch2_signal_final ===
~ currentSceneId = "ch2_signal_final"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
By nightfall, Yve had built a protocol, Zelda had traced the shape of what Cybol had hidden, and my family notebook had stopped pretending to be a notebook.
Nala Renn's recording played once through my broken com.
The actor list glowed on Yve's tablet.
Professor Halden's name sat between Cybol's official history and Diderram's erased objection like a bridge no one wanted to admit existed.
When the recording ended, the page in front of me filled with a new date.
Tomorrow.
Beneath it, one line appeared in my own handwriting, though I had not written it yet.
Do not let Cybol make the announcement uncontested.
+ [End Chapter 2] # cue:ending
    ~ chapterTwoComplete = true
    -> DONE
