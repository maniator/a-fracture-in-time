VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch2_history_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "history-path"
VAR chapterTwoComplete = false
VAR zeldaHeldTwoTimelines = false
VAR ariCreatedSecondFuture = false
VAR diderramPatrolAppeared = false
VAR cybolSchoolRemembered = false

-> ch2_history_start

=== ch2_history_start ===
~ currentSceneId = "ch2_history_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 2: The Second Future.
Zelda woke with two childhoods fighting over the same bones.
In one, she learned to read by lantern light while Diderram patrols searched old Cybol shelters overhead.
In the other, she sat in a clean classroom under a Cybol flag, reciting the founding promise of Ayker's civic century.
Both memories hurt. Both felt true. Both could not survive in the same mind for long.
The device beside her pulsed with Xav's voice, distorted by the change Ari had made when she touched the notebook.
"Zelda? Are you still there?"
+ [Force yourself to answer before the old future fades] # cue:memory
    ~ memoryFracture += 2
    ~ zeldaHeldTwoTimelines = true
    -> ch2_history_answer
+ [Write down both childhoods before speaking] # cue:stability
    ~ stability += 2
    ~ zeldaHeldTwoTimelines = true
    -> ch2_history_notes

=== ch2_history_answer ===
~ currentSceneId = "ch2_history_answer"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
"I am here," Zelda said.
The words came out in two accents.
Marek backed away from her. In one memory, he was the shelter elder who taught her to hide from patrols. In the other, he was Professor Marek, instructor of Civic Gratitude at the Brinkton Restoration School.
He looked at her as if he remembered both too, but only for a second.
Then his face settled into fear.
"What did you do?" he asked.
+ [Tell Marek the past changed and he almost remembered] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_marek
+ [Say nothing to Marek and focus on Xav] # cue:control
    ~ controlIndex += 2
    -> ch2_history_xav

=== ch2_history_notes ===
~ currentSceneId = "ch2_history_notes"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Zelda wrote in the dust with both hands.
Left hand: Diderram curfew. Shelter hunger. Cybol ruins sealed by order of public safety.
Right hand: Cybol restoration. Clean uniforms. Diderram integration ceremonies. Morning songs praising the peace.
The two histories overlapped at one point: Ari Reivax touching the notebook.
Zelda underlined Ari's name until the stone snapped.
The device printed a new warning across its cracked screen.
TEMPORAL CONSENSUS FORMING. RESIST OR ACCEPT.
+ [Resist the new consensus and keep both histories alive] # cue:memory
    ~ memoryFracture += 2
    -> ch2_history_xav
+ [Accept enough of the new history to stay functional] # cue:stability
    ~ stability += 2
    -> ch2_history_marek

=== ch2_history_xav ===
~ currentSceneId = "ch2_history_xav"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
I heard Zelda answer in two voices.
Ari stood beside me with one hand wrapped in a towel, even though the notebook had not burned her exactly. It had left a mark shaped like a small branching tree.
Yve looked from Ari to me to the com.
"The future changed," she said.
"Can we change it back?" Ari asked.
No one answered quickly enough.
Zelda's voice cracked through the speaker.
"Do not change it back yet. I need to know what this version hides."
+ [Ask Ari what she felt when she touched the notebook] # cue:memory
    ~ memoryFracture += 1
    ~ ariCreatedSecondFuture = true
    -> ch2_history_ari
+ [Tell Zelda you will try to stabilize the signal first] # cue:stability
    ~ stability += 1
    -> ch2_history_signal

=== ch2_history_marek ===
~ currentSceneId = "ch2_history_marek"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Marek led Zelda through the changed tunnels.
Some corridors still looked like ruins. Others had become clean restoration passages with glowing safety strips and murals of Cybol volunteers helping grateful Diderram families.
At the junction beneath the old library, a patrol checkpoint shimmered in and out of existence.
In the old future, Diderram patrols searched for illegal Cybol relics.
In the new one, Cybol restoration officers searched for Diderram separatists.
The uniforms changed. The fear did not.
+ [Walk through the checkpoint as if you belong to the new future] # cue:control
    ~ controlIndex += 2
    ~ diderramPatrolAppeared = true
    -> ch2_history_checkpoint
+ [Break away from Marek and find the old ruins path] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_oldpath

=== ch2_history_ari ===
~ currentSceneId = "ch2_history_ari"
~ currentPOV = "past"
~ currentSpeaker = "Ari Reivax"
"It felt like the book was lonely," Ari said.
Yve closed her eyes. "That is not data, but somehow it is worse than data."
Ari ignored her.
"It showed me Zelda. But not the dusty one. Another Zelda. She was in school and everyone kept telling her Cybol saved Ayker. She did not believe them, but she wanted to."
The com whined.
Zelda whispered, "I remember that school. I never went there yesterday."
+ [Ask Ari whether the notebook wanted that future] # cue:memory
    ~ memoryFracture += 2
    -> ch2_history_signal
+ [Keep Ari away from the notebook until Zelda stabilizes] # cue:stability
    ~ stability += 2
    -> ch2_history_checkpoint

=== ch2_history_signal ===
~ currentSceneId = "ch2_history_signal"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve built a stabilizer out of three com relays, a kitchen lamp, and a university access card she claimed she had definitely been allowed to borrow.
"This will not fix time," she said. "It may keep Zelda from being rewritten while we talk."
"May?" I asked.
"Do you want honesty or comfort?"
The stabilizer turned on with a low hum.
For a moment, Zelda's two voices became one.
"I found the new lie," she said. "In this future, Cybol never fell. It rebranded the fall as restoration."
+ [Ask Zelda what happened to Diderram in the new version] # cue:memory
    ~ memoryFracture += 1
    -> ch2_history_checkpoint
+ [Ask Zelda what happened to your family in the new version] # cue:memory
    ~ memoryFracture += 1
    -> ch2_history_oldpath

=== ch2_history_checkpoint ===
~ currentSceneId = "ch2_history_checkpoint"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The checkpoint officer looked at Zelda's device and smiled with practiced pity.
"Relic grief," he said. "Very common in descendants of unintegrated families. Cybol can help you remember safely."
Behind him, a school group marched past in clean uniforms.
Zelda recognized herself among them.
Not a memory. A recording. A future that was trying to recruit her backward.
The younger Zelda in the recording looked straight at the camera and mouthed: run.
+ [Run toward the school recording] # cue:rebellion
    ~ rebellion += 2
    ~ cybolSchoolRemembered = true
    -> ch2_history_school
+ [Let the officer scan the device to learn what he sees] # cue:control
    ~ controlIndex += 2
    -> ch2_history_scan

=== ch2_history_oldpath ===
~ currentSceneId = "ch2_history_oldpath"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The old ruins path was smaller now.
The new future had paved over most of it, but cracks remained where the first timeline refused to die.
Zelda crawled through one with the device pressed to her chest.
Inside the crawlspace, someone had carved a message into the stone before the second future covered it.
ARI WAS NOT THE MISTAKE. THE ANNOUNCEMENT WAS.
Below it was tomorrow's date in Xav's era.
+ [Send the warning to Xav immediately] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_final
+ [Search for what announcement the warning means] # cue:memory
    ~ memoryFracture += 2
    -> ch2_history_school

=== ch2_history_school ===
~ currentSceneId = "ch2_history_school"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The school recording was stored inside a civic archive kiosk that had not existed an hour ago.
Zelda watched the younger version of herself stand at a classroom podium and recite the restoration oath.
Then the recording glitched.
The younger Zelda stopped reciting and leaned toward the lens.
"If you are me," she said, "then listen. Cybol did not fall because of rebellion. It survived by learning how to make every rebellion part of its story."
The kiosk alarm began to scream.
+ [Rip the recording free and send it to Xav] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_oath
+ [Memorize the oath before destroying the kiosk] # cue:stability
    ~ stability += 1
    -> ch2_history_oath

=== ch2_history_scan ===
~ currentSceneId = "ch2_history_scan"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The officer scanned the device.
His smile disappeared.
"This object is pre-restoration," he said. "And post-collapse."
For one second, the new future did not know what category to put Zelda in.
That was all she needed.
She took the device back and ran.
Behind her, the checkpoint announced a contradiction alert across three versions of the same hallway.
+ [Use the contradiction alert to find the hidden archive] # cue:memory
    ~ memoryFracture += 2
    -> ch2_history_archive
+ [Break the scanner so the device cannot be tracked] # cue:rebellion
    ~ rebellion += 1
    -> ch2_history_archive

=== ch2_history_oath ===
~ currentSceneId = "ch2_history_oath"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The restoration oath sounded harmless on first pass.
I acknowledge the peace before me.
I inherit gratitude, not grievance.
I release unstable histories for collective healing.
Zelda replayed the lines until she heard the trap.
Every sentence removed responsibility from institutions and relocated it to memory itself.
If history hurt, the oath implied, then the problem was the person still remembering it.
Marek read over her shoulder and sat down hard on the corridor floor.
"I used to teach this," he said. "Not in the old future. In this one. I told students their grandparents were confused by trauma."
He looked physically smaller after saying it.
Zelda crouched beside him.
"Then help me translate it into plain language for Xav."
Together they rewrote each oath line as tactical warning.
Release unstable histories became surrender witness testimony.
Inherit gratitude became accept official records without challenge.
Collective healing became archival erasure with ceremony music.
"Send it," Marek said. "If they can name the trick, they might resist it."
+ [Send the translation to Xav and Yve now] # cue:stability
    ~ stability += 2
    -> ch2_history_archive
+ [Keep translation local and gather more proof first] # cue:control
    ~ controlIndex += 2
    -> ch2_history_archive

=== ch2_history_archive ===
~ currentSceneId = "ch2_history_archive"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The contradiction alert drew Zelda into a maintenance shaft behind the checkpoint.
At the end was a sealed archive spindle labeled INTERIM CONSENSUS RECORDS.
Inside, she found stacked "transition editions" of Ayker history textbooks.
Edition 1 described Cybol collapse as a cautionary tale.
Edition 2 reframed collapse as a regional misunderstanding.
Edition 3 deleted the word collapse entirely and replaced it with restoration.
Each edition was dated one week apart.
History had not changed once.
It had been edited on schedule.
Tucked between editions was a briefing packet for tomorrow's partnership announcement in Xav's era.
Slide three: introduce firstborn lineage witness as symbol of reconciliation.
Slide four: if witness resists, classify as extremist and proceed with emergency stabilization narrative.
Slide five: deploy school recordings showing successful integration outcomes.
Zelda copied everything and nearly dropped the device when she saw the presenter name.
Director Yve Ettevy.
"That's impossible," Zelda whispered.
Marek read the line and shook his head.
"Not impossible. Coerced futures often recruit the people best able to expose them."
+ [Warn Xav that Yve may be targeted for forced cooperation] # cue:rebellion
    ~ rebellion += 2
    -> ch2_history_counterplan
+ [Ask Xav to keep Yve hidden from all official channels] # cue:stability
    ~ stability += 2
    -> ch2_history_counterplan

=== ch2_history_counterplan ===
~ currentSceneId = "ch2_history_counterplan"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve read Zelda's archive dump twice, then a third time out loud so Xav and Ari heard every word.
The presenter slide made her laugh in the way people laugh when the alternative is panic.
"Apparently I have a distinguished career in helping authoritarian institutions explain themselves," she said.
Ari frowned. "That sounds bad."
"It is extremely bad."
The apartment became a planning room.
Xav mapped where public terminals could intercept the ceremony feed.
Marek sent coded pings to old faculty who still distrusted Cybol sponsorship money.
Ari drew the branching tree mark on scrap paper and circled locations where she said the notebook "felt loudest."
The loudest point was the university amphitheater where the announcement would happen.
Yve stared at Ari's map.
"If they stage the event there, they are not just announcing history. They are anchoring it."
Zelda's voice cut through the com, urgent and clear.
"You need a counter-announcement witnessed by as many people as possible. Not just data dumps. Human testimony that cannot be politely archived away."
+ [Plan a live interruption led by Yve and student witnesses] # cue:rebellion
    ~ rebellion += 1
    -> ch2_history_hearing
+ [Plan a distributed broadcast from multiple terminals as backup] # cue:control
    ~ controlIndex += 1
    -> ch2_history_hearing

=== ch2_history_hearing ===
~ currentSceneId = "ch2_history_hearing"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
When tomorrow arrived in Xav's era, it arrived in Zelda's tunnel as shockwaves.
Each testimony spoken at the amphitheater sent a visible tremor through the archive spindle, as if memory itself were a structure under stress.
Zelda watched official transcripts attempt to auto-correct the event in real time.
Witness says coercion became witness expresses concern.
History edited on schedule became records evolved responsibly.
Yve anticipated it.
She and the students read every sentence twice: once in institutional wording, once in plain language.
The crowd repeated the plain language back until it drowned out the script.
Zelda copied both versions into side-by-side files and broadcast them through maintenance channels, school terminals, and old Diderram relay towers.
Marek coordinated volunteers who tagged each transcript pair with location, time, and speaker verification.
"No single archive can swallow this much distributed testimony quickly," he said. "That buys us days."
"Days are enough for a movement," Zelda answered.
At first, Cybol networks labeled the broadcasts as misinformation loops.
Then a junior records officer leaked internal quality notes proving the "misinformation" flags were automated against keywords like collapse, coercion, and firstborn.
The leak detonated across both timelines.
In one branch, patrols were sent to reclaim terminals.
In another, unionized transit workers refused to transport confiscated equipment.
In both, families began comparing notes on partnership ceremonies they had attended over decades.
Patterns emerged everywhere.
The same smiles.
The same framed gratitude.
The same disappearing names immediately after noncompliance.
Ari's branching tree mark appeared on posters, classroom whiteboards, and improvised projector slides.
Not as a bloodline symbol this time.
As a witness mark.
Zelda received short voice messages from strangers in Xav's era:
I thought I was the only one who remembered the older version.
My grandmother used different words for the same event.
They made us retake civic oaths after we asked questions.
None of those voices knew Zelda personally.
All of them sounded like future allies.
The archive spindle reacted by opening hidden subdirectories labeled DISPUTED CONSENSUS.
Inside were emergency continuity plans written for exactly this scenario.
If distributed witness networks form, flood channels with contradictory autobiographies.
If witness leader emerges, offer institutional role and isolate from peers.
If counter-announcement persists, concede language changes while preserving authority structure.
"They planned for resistance as a stage in their rollout," Marek said.
"Then we deny them predictable staging," Zelda replied.
She contacted Xav and Yve with a three-part counterplan:
Rotate visible speakers every hour so no single person can be neutralized.
Publish raw recordings and human-verified transcripts together.
Pair each testimony with practical instructions: where to meet, how to verify, how to keep each other safe.
Yve adopted the plan immediately.
By evening, the amphitheater had become a rotating public hearing with child care stations, legal aid desks, and projection walls showing parallel timelines.
The event no longer looked like a protest.
It looked like infrastructure.
Cybol representatives arrived with a proposal for mediated dialogue and a request to move proceedings to a "secure historical forum."
No one moved.
An elder from the transit union spoke first.
"Security that requires silence is just custody."
Cheers rolled through the square.
Zelda smiled for the first time all day.
In her tunnel, the device displayed a new status line:
TEMPORAL CONSENSUS FAILURE.
ALTERNATE PUBLIC MEMORY NETWORK STABLE.
It was not a clean win. Contradictions still split neighborhoods, and retaliatory policy would follow.
But the second future was no longer singular.
It had competitors.
And competitors could negotiate.
Or fight.
Or refuse.
Most importantly, they could remember each other while doing it.
Zelda sent one final packet to Xav before the stabilizer dropped again.
Not Ari. The announcement.
Not one witness. Many.
Not private survival. Public memory.
+ [Archive the hearing toolkit so other districts can repeat it] # cue:stability
    ~ stability += 1
    -> ch2_history_final
+ [Use the toolkit to seed parallel hearings before authorities adapt] # cue:rebellion
    ~ rebellion += 1
    -> ch2_history_final

=== ch2_history_final ===
~ currentSceneId = "ch2_history_final"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Zelda's warning arrived as Yve's stabilizer began to smoke.
Not Ari. The announcement.
Tomorrow, Cybol would announce a new historical partnership with Diderram. In one future, that announcement became the first polite lie before a collapse. In another, it became the foundation of a restoration that never admitted there had been a collapse at all.
Ari looked at the notebook mark on her hand.
"So what do we do?"
Yve exhaled and began assigning jobs like she was distributing lab equipment before an exam.
"We document. We translate. We rotate speakers. We feed every district the hearing toolkit before anyone can classify this as an isolated disturbance."
Marek added names of faculty willing to host night sessions for testimony verification.
Xav called neighbors who trusted him enough to keep doors open after curfew.
Ari sat at the center of the table and copied the witness mark onto blank cards until everyone had one.
"If someone gets scared," she said, "show them this and tell them there are more of us."
Outside, patrol sirens rose and fell, uncertain where to focus first.
Inside, the apartment became a dispatch hub.
Not heroic. Not cinematic. Just organized.
Zelda listened from the tunnel and felt both childhoods shift again.
Lantern light and classroom fluorescents no longer fought for dominance.
They overlapped into something harder, less pure, and more useful: a memory with witnesses.
The notebook opened by itself and wrote one word.
Attend.
+ [End Chapter 2] # cue:ending
    ~ chapterTwoComplete = true
    -> DONE
