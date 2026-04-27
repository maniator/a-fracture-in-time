VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch4_trial-credibility_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "trial-credibility-path"
VAR chapterFourComplete = false

-> ch4_trial_credibility_start

=== ch4_trial_credibility_start ===
~ currentSceneId = "ch4_trial-credibility_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 4: A City That Remembers Nothing. Trial Credibility.
The conditional amnesty track produced forty-seven defectors. Their testimony filled six evidence rooms and identified the internal architecture of three decades of memory revision policy.
It also divided the movement. Eleven former movement members, whose families appear in evidence that the amnesty defectors helped suppress, have filed formal objections to the conditional terms. They want the people who edited their families' memories to face full accountability before receiving any protection.
Zelda opens the coordination board. Last week's incidents: evidence review sessions running eight hours past schedule, two community moderators stepping back from active facilitator roles, one formal objection hearing scheduled for next month, and a message from a defector who says they are afraid to leave the building where they are staying.
Xav reads all of it without editorializing. He says: "We chose the path that gives us the deepest evidence. We did not fully reckon with what living inside that evidence would require."
Ari asks the question no one can dodge: "How do we hold the truth we asked for without breaking the people who are carrying it?"
+ [Create a formal witness care and accompaniment protocol for defectors and community objectors alike] # cue:stability
    ~ stability += 2
    -> ch4_trial_credibility_accompaniment
+ [Accelerate the evidence review timeline so defectors are no longer in extended liminal status] # cue:control
    ~ controlIndex += 1
    -> ch4_trial_credibility_acceleration

=== ch4_trial_credibility_accompaniment ===
~ currentSceneId = "ch4_trial-credibility_accompaniment"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
The accompaniment protocol is built in seventy-two hours by a working group that includes two objectors, one defector, three community coordinators, and a former Keeper archivist.
It assigns each person in the process a named contact person who is not their attorney or their moderator. Someone who returns messages and is allowed to say I do not know.
It does not solve the moral fracture. It does not reconcile what was done with what was asked for in exchange.
What it does is ensure that no one goes through the process alone. The defector who was afraid to leave the building is assigned an accompanist. The first day she goes outside, the accompanist walks beside her without speaking. She sends a message that night: "It helped."
The chapter closes on one hard truth: accountability is not a transaction that ends when the evidence is filed. It is a relationship that continues as long as any of the people involved are still living.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "trial-credibility-path"
    -> DONE

=== ch4_trial_credibility_acceleration ===
~ currentSceneId = "ch4_trial-credibility_acceleration"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The evidence review timeline is compressed from fourteen months to six.
Three defectors withdraw from the process when the pace outstrips their capacity to review how their own testimony is being used.
The remaining forty-four complete the record. It is the most comprehensive account of Cybol's internal revision apparatus in the city's history.
It is also missing three perspectives that would have made it complete.
Zelda writes: "We chose speed over accompaniment. The record is better than anything we had before. I cannot stop wondering what it would have contained if we had given people time."
The chapter closes on one hard truth: the most legible truth is not always the most complete one.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "trial-credibility-path"
    -> DONE
