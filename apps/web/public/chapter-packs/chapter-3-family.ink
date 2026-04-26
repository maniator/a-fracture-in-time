VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch3_family_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "family-path"
VAR chapterThreeComplete = false

-> ch3_family_start

=== ch3_family_start ===
~ currentSceneId = "ch3_family_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 3: The Witness Ledger.
The firstborn vault was no longer hidden, but that did not make it safe.
By morning, three community teams had arrived to copy records while two legal groups argued over how much to publish without exposing living families.
Zelda stood between shelves of stolen lineage and tried to choose speed without sacrificing care.
Marek placed a kettle on an old maintenance coil and called an emergency governance session right there in the archive room.
"We need rules before panic becomes policy," he said.
+ [Publish the full ledger immediately to prevent selective leaks] # cue:rebellion
    ~ rebellion += 2
    -> ch3_family_rules
+ [Create redaction rules with family consent before publication] # cue:stability
    ~ stability += 2
    -> ch3_family_rules

=== ch3_family_rules ===
~ currentSceneId = "ch3_family_rules"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
From the apartment table, Xav listened to district delegates negotiate witness protections line by line.
Yve moderated.
Ari kept score.
The new ledger council drafted three immediate constraints:
No child identifiers in public feeds.
All coercion records mirrored in at least three jurisdictions.
Any institution named in testimony must receive the same unedited transcript the public receives.
It was imperfect and unfinished and still better than the closed systems that came before.
When Cybol spokespeople demanded a private "verification review," the council voted no.
"Verification without public parity is just delay," Yve said.
+ [Open council sessions to rotating neighborhood observers] # cue:stability
    ~ stability += 1
    -> ch3_family_closing
+ [Create a rapid response team for families named in new records] # cue:control
    ~ controlIndex += 1
    -> ch3_family_closing

=== ch3_family_closing ===
~ currentSceneId = "ch3_family_closing"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
By nightfall, the ledger council published its first bulletin with signatures from students, transit workers, archivists, and three grandparents who refused to be anonymized into silence.
The bulletin did not promise safety.
It promised procedure, witnesses, and shared accountability.
The vault lights flickered as backup power switched over, and Zelda laughed because even the infrastructure seemed surprised this much truth was moving at once.
"Chapter 3 isn't about discovering the family system," she told Xav over coms. "It's about refusing to inherit it unchanged."
Xav answered with Ari in the background, reciting the council rules like multiplication tables.
The witness ledger had started to become culture.
This Chapter 3 route is now available in a foundation pass and will expand into custody fights, forged-record incidents, and succession disputes under public oversight.
+ [End Chapter 3] # cue:ending
    ~ chapterThreeComplete = true
    -> DONE
