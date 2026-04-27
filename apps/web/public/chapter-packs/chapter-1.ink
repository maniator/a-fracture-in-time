VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch1_xav_quad"
VAR currentPOV = "past"
VAR currentSpeaker = "Xav Reivax"
VAR endingKey = ""
VAR chapterOneComplete = false
VAR yveNoticedCom = false
VAR studiedCybolHistory = false
VAR skippedStudy = false
VAR zeldaFoundDevice = false
VAR zeldaHeardXav = false
VAR xavOpenedNotebook = false
VAR ariTouchedNotebook = false
VAR firstSignalSent = false
VAR warnedAboutDiderram = false
VAR askedAboutFamily = false

-> ch1_xav_quad

=== ch1_xav_quad ===
~ currentSceneId = "ch1_xav_quad"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
3.14.874cy. University of Brinkton.
The quad looked exactly the way the city brochures said it should: glass lecture towers, clean paths through bright moss, students laughing like Cybol had already solved every serious problem on Ayker.
I sat under the blueleaf trees with my broken com in my lap, trying to decide whether hitting it again counted as repair.
Before class, Ari had asked whether I was still bringing home the old Reivax firstborn notebook for Da's inventory check.
I told her yes, and no, she still could not touch it yet.
At the time it felt like ordinary family routine, not the kind of detail that could fracture history.
"Hey, Xav!"
Yve Ettevy jogged across the quad, hair half out of place, tablet tucked under one arm, expression already suspicious.
"You didn't answer any of my messages," she said. "Again."
+ [Admit the com broke again] # cue:stability
    ~ stability += 1
    ~ yveNoticedCom = true
    -> ch1_yve_exam
+ [Joke that Cybol technology clearly fears you] # cue:rebellion
    ~ rebellion += 1
    ~ skippedStudy = true
    -> ch1_yve_tease

=== ch1_yve_exam ===
~ currentSceneId = "ch1_yve_exam"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
I held up the broken com, the cracked screen tilted toward Yve like a confession. No explanation necessary.
"Again?" Yve dropped beside me and took the com before I could hide the crack across its screen. "Didn't this happen two weeks ago?"
"I am consistent," I said.
"You are impossible. We have a Cybol history exam in forty minutes, and your plan is to sit here committing crimes against handheld technology?"
She opened her tablet. The exam topic glowed across the top: The Unification of Cybol and the Civic Peace of Diderram.
Everyone in Brinkton knew the official story. Cybol rose, Cybol led, Diderram accepted peace, and Ayker prospered.
Yve looked at me over the tablet. "Quiz me. And try not to make the fall of Diderram sound like a sports score."
+ [Study the official history with Yve] # cue:control
    ~ controlIndex += 1
    ~ studiedCybolHistory = true
    -> ch1_exam_exit
+ [Ask why Diderram needed Cybol's peace in the first place] # cue:memory
    ~ memoryFracture += 1
    -> ch1_exam_doubt

=== ch1_yve_tease ===
~ currentSceneId = "ch1_yve_tease"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
"Cybol technology fears greatness," I said.
Yve stared at me for a long second. "Your com fears stairs, rain, your pocket, and possibly basic responsibility."
I laughed, but the com buzzed once in my hand even though the battery indicator was dead.
For a blink, the cracked screen showed a gray sky over ruined buildings. Then it went black.
Yve's smile faded. "Xav. Did you see that?"
+ [Tell Yve exactly what appeared on the screen] # cue:memory
    ~ memoryFracture += 2
    ~ yveNoticedCom = true
    -> ch1_exam_doubt
+ [Pretend it was just the crack catching light] # cue:stability
    ~ stability += 1
    -> ch1_exam_exit

=== ch1_exam_exit ===
~ currentSceneId = "ch1_exam_exit"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Forty minutes. Then the exam hall doors opened.
The exam went fine. Probably. Yve finished early, which meant she either knew everything or had decided the test was beneath her.
I left the lecture hall feeling good enough to be annoying about it.
"We definitely aced that," I said.
Yve adjusted her bag. "Maybe you did. I kept thinking about Diderram."
Brinkton's afternoon transit bells chimed overhead. Students streamed toward the city lines, the campus gates, the floating gardens, all the places a perfect society sent people when the day was done.
My com buzzed again.
This time, a voice came through the dead speaker.
"If anyone can hear this, please answer. My name is Zelda Adlez. I am in the ruins of Brinkton."
+ [Answer the impossible voice] # cue:memory
    ~ memoryFracture += 2
    ~ firstSignalSent = true
    -> ch1_zelda_ruins
+ [Show Yve before saying anything] # cue:stability
    ~ stability += 1
    -> ch1_yve_signal

=== ch1_exam_doubt ===
~ currentSceneId = "ch1_exam_doubt"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
"Careful," Yve said softly. "Questions about Diderram make people boring."
In Brinkton, boring was not an insult. It meant someone stopped getting invited to interviews, internships, scholarship dinners. It meant doors kept opening, just never to anywhere important.
"I thought Cybol valued inquiry," I said.
"Cybol values useful inquiry. Different thing."
My dead com lit up between us.
A girl's voice crackled from the speaker. "This is Zelda Adlez, recording from old Brinkton. If this reaches the past, please tell Xav Reivax not to trust the official history."
Yve went completely still.
+ [Answer Zelda before the signal dies] # cue:memory
    ~ memoryFracture += 2
    ~ firstSignalSent = true
    -> ch1_zelda_ruins
+ [Ask Yve how Zelda knows your name] # cue:control
    ~ controlIndex += 1
    -> ch1_yve_signal

=== ch1_yve_signal ===
~ currentSceneId = "ch1_yve_signal"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve took the com like it might bite her.
"Say nothing yet," she whispered. "If this is a prank, it's targeted. If it isn't a prank, then every word you say could matter."
The voice came again, thinner now.
"Xav, if you are there, the date should be 3.14.874cy. You are at the University of Brinkton. Yve is probably telling you not to answer. She is usually right, but not this time."
Yve looked up at me.
"I hate this," she said.
+ [Trust Zelda because she knows too much] # cue:memory
    ~ memoryFracture += 1
    ~ zeldaHeardXav = true
    -> ch1_zelda_ruins
+ [Ask Zelda to prove she is from the future] # cue:stability
    ~ stability += 1
    -> ch1_zelda_proof

=== ch1_zelda_ruins ===
~ currentSceneId = "ch1_zelda_ruins"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
7.27.23ac. Ruins of old Brinkton.
Zelda Adlez crouched under a collapsed transit arch while dust fell in slow sheets from the city above.
The old maps still called this place the University of Brinkton. In Zelda's time, it was a warning told to children: do not dig too deep under Cybol stone, because Cybol always left something hungry behind.
The device in her hands had been sealed in a metal case beneath a lecture hall. Its screen showed a face for half a second: a boy under blueleaf trees, older than a child, younger than a legend.
Then his voice broke through.
"Zelda? This is Xav. I think. Where are you?"
Her hands shook so badly she almost dropped the device.
+ [Tell Xav the truth: Cybol falls] # cue:rebellion
    ~ rebellion += 2
    ~ zeldaFoundDevice = true
    ~ zeldaHeardXav = true
    -> ch1_xav_future_truth
+ [Start carefully and ask what Xav knows about Diderram] # cue:stability
    ~ stability += 1
    ~ zeldaFoundDevice = true
    -> ch1_xav_diderram

=== ch1_zelda_proof ===
~ currentSceneId = "ch1_zelda_proof"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Zelda knew he would ask for proof. She had practiced the answer in the tunnels, whispering to stone until the others told her to save her breath.
"Your com broke this morning," she said. "Yve found you on the quad. Your history exam was about Diderram. You think you did well. Yve is less convinced."
Static chewed through the next words.
She looked back toward the tunnel mouth. The others were waiting. They had found the device together, but she was the only one whose family name matched the half-burned records inside the case.
Adlez. Reivax. The old family tree had both.
+ [Reveal the family record to Xav] # cue:memory
    ~ memoryFracture += 2
    ~ askedAboutFamily = true
    -> ch1_xav_family
+ [Hide the family link and focus on the collapse] # cue:control
    ~ controlIndex += 1
    -> ch1_xav_future_truth

=== ch1_xav_future_truth ===
~ currentSceneId = "ch1_xav_future_truth"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
"Cybol falls" did not sound like a sentence. It sounded like someone saying gravity had changed its mind.
Yve sat down on the nearest bench.
I looked across the campus: the banners, the transit bells, the lecture towers, the students complaining about exams in a city that had never once seemed breakable.
"How far in the future are you?" I asked.
Zelda's answer arrived in pieces.
"Twenty-three years after the fall. Fifty-three years after your exam. Maybe. Time is... not staying still anymore."
+ [Warn Zelda that changing the past could erase her memories] # cue:stability
    ~ stability += 2
    I told her the truth as I understood it: if the past changed, everything built on it would change too. Her memories. Her name. The fact of her existence.
    Zelda did not answer. The signal held for a breath, then cut out between one word and the next, leaving only the dead weight of the com in my palm.
    I stood there on the campus path for a moment before my feet decided to move, and then I walked home without remembering the walking.
    -> ch1_family_notebook
+ [Ask what event starts the fall] # cue:rebellion
    ~ rebellion += 1
    ~ warnedAboutDiderram = true
    "What starts it?" I asked. "What is the first moment, the thing that breaks first?"
    Zelda began to answer. The static rose over her words before they arrived, and then the connection dropped completely. The screen went dark. Whatever she had been about to say was gone.
    I walked home in the silence her voice had left behind, the question still unanswered and already heavier than I wanted it to be.
    -> ch1_family_notebook

=== ch1_xav_diderram ===
~ currentSceneId = "ch1_xav_diderram"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Zelda's question had crossed fifty years of static to reach me. I gave her the only answer I had been taught.
"Diderram accepted peace," I said, because that was the answer every schoolchild knew.
Zelda laughed once, and the sound was so bitter it made Yve flinch.
"Diderram was decimated. Your histories call it peace because Cybol won the right to write the word."
Yve whispered, "That cannot be true."
But she did not sound certain.
The dead com warmed in my palm. On its cracked screen, letters appeared: FAMILY LINE VERIFIED.
+ [Ask Zelda what the family line means] # cue:memory
    ~ memoryFracture += 2
    ~ askedAboutFamily = true
    -> ch1_xav_family
+ [Focus on Diderram and ignore the family warning] # cue:rebellion
    ~ rebellion += 2
    ~ warnedAboutDiderram = true
    I let the family message go dark on the screen and pressed Zelda for what I actually needed: dates, names, the facts that the official history had buried.
    She gave me two names before the signal fractured and died. Enough to know the official version was wrong. Not enough to know what the right version cost.
    The campus emptied around me while I stared at the dead com. Then I picked up my bag and walked home to find the notebook before anyone else could.
    -> ch1_family_notebook

=== ch1_xav_family ===
~ currentSceneId = "ch1_xav_family"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
I stared at the two words on the cracked screen. FAMILY LINE VERIFIED. The light from it threw cold shadows across my palm, and I stayed very still, the way you do when you are not sure if moving will break something.
"What family line?" I asked.
Zelda went quiet long enough for the campus bells to chime twice.
"I think," she said, "I think you are my grandfather. Or you were. Or you will be. The records are damaged. But your name is there. Xav Reivax. Then a line of names. Then mine. Zelda Adlez."
Yve grabbed my sleeve.
"Xav, stop. Not because I don't believe her. Because I think I do."
My broken com displayed one more instruction: FIND THE NOTEBOOK BEFORE SOMEONE ELSE TOUCHES IT.
+ [Go home for the family notebook immediately] # cue:memory
    ~ memoryFracture += 1
    ~ xavOpenedNotebook = true
    I told Zelda I was going. I left Yve on the bench, broke into a run across the quad, and did not slow down until I hit the residential streets.
    -> ch1_family_notebook
+ [Bring Yve with you and keep Zelda on the line] # cue:stability
    ~ stability += 1
    ~ xavOpenedNotebook = true
    I grabbed Yve's arm and told Zelda to hold the signal as long as she could. We walked fast, then faster. Zelda's voice thinned to static before we reached the transit stop, but it did not fully die.
    -> ch1_family_notebook

=== ch1_family_notebook ===
~ currentSceneId = "ch1_family_notebook"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Home smelled like it always had: old paper, Da's cooking oil, the particular quiet of a building that had stood in the same block since before I was born. The signal was gone. Zelda's voice was gone. The weight of the conversation was not.
The notebook was exactly where Da said it would be: wrapped in brown cloth, locked in the upper drawer, old enough that the air changed when I touched it.
Every firstborn in our family was supposed to write in it from their twentieth birthday until they turned twenty-five.
I was not twenty yet.
Ari, my younger sister, stood in the doorway before I could hide the cloth.
"Is that the weird book Da told you not to let me touch?"
The com buzzed hard enough to slide across the desk.
Zelda's voice cut through the static.
"Xav, listen to me. In my timeline, someone touched it early. No one agrees who. But the first change begins in your house."
+ [Tell Ari the truth and ask her not to touch it] # cue:stability
    ~ stability += 2
    I told her everything I could in thirty seconds: the voice from the future, the family name on a burned record, Zelda's warning. Ari went very still. Then she put her hands behind her back.
    -> ch1_end_signal
+ [Open the notebook before Ari can reach it] # cue:memory
    ~ memoryFracture += 2
    ~ xavOpenedNotebook = true
    I moved before she could cross the room, pulling the cloth away and breaking the lock with my thumbnail the way Da had shown me never to do. The pages fell open on their own.
    -> ch1_end_family
+ [Let Ari help, even if Zelda warned you] # cue:rebellion
    ~ rebellion += 2
    ~ ariTouchedNotebook = true
    I stepped back. I told myself it was because she had the right to know, not because I was afraid to be the one who opened it. Ari reached out and touched the cover.
    -> ch1_end_history

=== ch1_end_signal ===
~ currentSceneId = "ch1_end_signal"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
In the ruins of Brinkton, Zelda watched the tunnel lights flicker from red to gold.
Someone beside her gasped. On the wall, a patch of old Cybol script rewrote itself into a warning instead of a victory slogan.
The future had not changed enough to save them. But it had changed enough to answer.
+ [End Chapter 1] # cue:ending
    ~ chapterOneComplete = true
    ~ endingKey = "signal-path"
    -> ch1_complete_signal

=== ch1_end_family ===
~ currentSceneId = "ch1_end_family"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The notebook opened in Xav's room and Zelda felt it in the future like a door unlocking under her ribs.
A new page appeared in the device case, written in Xav's hand and dated years after his exam.
Zelda read the first line twice.
If my grandchild is reading this, then I failed once and am trying again.
+ [End Chapter 1] # cue:ending
    ~ chapterOneComplete = true
    ~ endingKey = "family-path"
    -> ch1_complete_family

=== ch1_end_history ===
~ currentSceneId = "ch1_end_history"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Ari touched the notebook.
For one impossible second, Zelda remembered two childhoods: one under Diderram patrol curfew, one in a Cybol school that should not exist after the fall.
Then the older memory began to fade.
She dug her nails into her palm and whispered Xav's name until both timelines hurt.
+ [End Chapter 1] # cue:ending
    ~ chapterOneComplete = true
    ~ endingKey = "history-path"
    -> ch1_complete_history

=== ch1_complete_signal ===
~ currentSceneId = "ch1_complete_signal"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Zelda pressed her hand flat against the tunnel wall and let herself breathe. The device was still warm. The connection had held long enough to matter, and it had not broken anything that she could see, not yet.
Somewhere above, the city Cybol had built was continuing its ordinary evening. Below, a bridge now existed between eras that had no right to speak to each other.
Zelda did not know what Xav would do with what she had said. She knew only that he had listened. In her experience, that was never nothing.
Tomorrow the others would want answers she did not have. Tonight she let the silence hold, and tried to remember Brinkton as it might still be.
-> DONE

=== ch1_complete_family ===
~ currentSceneId = "ch1_complete_family"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The page appeared in the device case like a memory she had always had and never reached for. Xav's handwriting. The date was older than her by decades.
She read the first line again: If my grandchild is reading this, then I failed once and am trying again. She had known it intellectually, the connection between them, the records, the burned names. Seeing it in his own hand was different.
Zelda closed the case carefully and told herself to sleep. The others needed a plan by morning, and a plan required her to be something other than undone.
She did not sleep. She sat with the device and memorized his letters, because she did not yet know if the past would let her keep them.
-> DONE

=== ch1_complete_history ===
~ currentSceneId = "ch1_complete_history"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
She dug her nails deeper into her palm and said her own name out loud, testing whether it still belonged to her. It did. Barely.
The older memory was still fading. She could feel it going the way a sound goes when a door closes: present, then muffled, then only a shape left where the noise had been.
Zelda made herself stand, made herself check the exits, made herself act like someone who had expected this. She had not expected this. She had known it was possible. That was not the same thing.
Tomorrow she would have to tell the others that the past had already changed, and that they were now living in what came after. She did not know yet what that meant. She suspected she was about to find out.
-> DONE
