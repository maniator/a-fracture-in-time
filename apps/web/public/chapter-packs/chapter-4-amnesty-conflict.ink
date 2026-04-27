VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch4_amnesty-conflict_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "amnesty-conflict-path"
VAR chapterFourComplete = false

-> ch4_amnesty_conflict_start

=== ch4_amnesty_conflict_start ===
~ currentSceneId = "ch4_amnesty-conflict_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 4: A City That Remembers Nothing — Amnesty Conflict.
The no-amnesty vote kept the movement's testimony record clean and uncontested. No defectors received conditional terms. No evidence was filtered through negotiated exceptions.
Three potential defectors who had been in preliminary contact with the movement's legal team have since returned to Cybol employment. One of them sent a single message before going silent: "You chose purity over information. I hope the information you don't have doesn't matter later."
Zelda opens the coordination board. Last week's incidents: two successful precedent rulings using community testimony, fourteen ongoing cases stalled on evidence gaps that defector records would have filled, and one district hearing delayed indefinitely because the only available corroboration came from a source that will not testify without amnesty consideration.
Xav reads the message from the defector who returned. He says: "I think she was right. I also think we were right. Those two things do not resolve."
Ari asks the question no one can dodge: "What do we owe the people we chose not to make deals with?"
+ [Open a limited disclosure pathway for defectors who come forward now, without retroactive amnesty terms] # cue:stability
    ~ stability += 1
    ~ rebellion += 1
    -> ch4_amnesty_conflict_disclosure
+ [Stay the course: pursue the evidence gaps through community testimony and alternative documentation] # cue:control
    ~ controlIndex += 2
    -> ch4_amnesty_conflict_integrity

=== ch4_amnesty_conflict_disclosure ===
~ currentSceneId = "ch4_amnesty-conflict_disclosure"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
The limited disclosure pathway offers nothing in exchange — no immunity, no protective terms — only a structure for delivering information and a named contact who will receive it without judgment.
Two people come forward in the first month. Both of them say the same thing: they do not want protection. They want someone to know what they know before they forget why it matters.
One provides routing logs that confirm a twenty-year edit policy applied to Diderram settlement records.
The other provides nothing actionable. She sits with a movement legal observer for three hours and talks. At the end she says: "I did not know what I was doing when I was doing it. That is the worst thing I can tell you and the most true."
The chapter closes on one hard truth: not every disclosure needs to be leverage. Some disclosures are just the record becoming honest.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "amnesty-conflict-path"
    -> DONE

=== ch4_amnesty_conflict_integrity ===
~ currentSceneId = "ch4_amnesty-conflict_integrity"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The movement pursues the evidence gaps through existing community testimony.
It is slower. Some cases do not move. Some cases are dismissed for insufficient corroboration.
But the testimony that does prevail is untainted by negotiated exception. Three precedent rulings stand through appeal because no opposing attorney can argue that the evidence chain was compromised by conditional terms.
Zelda writes in her tunnel log: "We are building a record that can survive scrutiny. We are also building a record that has gaps. I am choosing to believe that future witnesses will fill what we cannot reach. I am doing that on faith. I want to be honest about that."
The chapter closes on one hard truth: integrity is a choice with costs, and the costs are borne by specific people in specific cases, not abstractly, not equally.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "amnesty-conflict-path"
    -> DONE
