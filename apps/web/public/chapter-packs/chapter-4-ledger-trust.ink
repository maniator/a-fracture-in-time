VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch4_ledger-trust_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "ledger-trust-path"
VAR chapterFourComplete = false

-> ch4_ledger_trust_start

=== ch4_ledger_trust_start ===
~ currentSceneId = "ch4_ledger-trust_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 4: A City That Remembers Nothing — Ledger Trust.
The process-first vote created a witness ledger with verified consent at every step. It was the slowest path available. It is now the path that Cybol's legal division cannot successfully challenge in three different district courts.
Cybol's attorneys have responded by weaponizing process: they file procedural objections to every ledger entry, not because the objections have merit, but because sustained legal attrition is itself a suppression strategy. The movement's volunteer legal team is burning out.
Zelda opens the coordination board. Last week's incidents: fourteen court filings successfully defended, six stalled on procedural grounds, one intake coordinator who sent a message at 2 a.m. asking how much longer this can go on.
Xav reads the message out loud. He says: this is what winning slowly feels like.
Ari asks the question no one can dodge: "Can we build institutional stamina, or are we asking people to be individually indestructible?"
+ [Establish a legal aid rotation with mandatory rest periods written into the charter] # cue:stability
    ~ stability += 2
    -> ch4_ledger_trust_stamina
+ [Partner with two outside legal organizations to distribute the attrition load] # cue:rebellion
    ~ rebellion += 1
    -> ch4_ledger_trust_coalition

=== ch4_ledger_trust_stamina ===
~ currentSceneId = "ch4_ledger-trust_stamina"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
The mandatory rest charter amendment passes after one hour of debate.
It is the first Fringe governance document that legally prohibits a volunteer from working more than four consecutive weeks in active legal defense without a documented handoff.
Cybol's attorneys notice the handoff protocols immediately. They file an objection arguing that inconsistent representation undermines due process.
The district court dismisses the objection and notes in the ruling that sustainable advocacy is not a procedural weakness. The dismissal is two paragraphs. Yve reads it three times.
The chapter closes on one hard truth: a movement that burns out its people is not winning. A movement that rests and continues is.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "ledger-trust-path"
    -> DONE

=== ch4_ledger_trust_coalition ===
~ currentSceneId = "ch4_ledger-trust_coalition"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The coalition outreach takes two weeks. Two external legal aid organizations agree to absorb parallel filing tracks in exchange for full access to the ledger's procedural documentation.
The partnership is not smooth. One organization has different evidentiary standards. The other moves faster than the movement's consent protocols allow and has to be reminded twice.
But between the three legal teams, Cybol's attrition strategy fails its first major objective: the ledger continues accepting intake, and the backlog shrinks by forty-two percent.
The chapter closes on one hard truth: trust is not only between the movement and the communities it serves. It is also between the movement and the institutions it must sometimes work alongside.
+ [End Chapter 4] # cue:ending
    ~ chapterFourComplete = true
    ~ endingKey = "ledger-trust-path"
    -> DONE
