VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch3_history_start"
VAR currentPOV = "future"
VAR currentSpeaker = "Zelda Adlez"
VAR endingKey = "history-path"
VAR chapterThreeComplete = false
VAR trialCredibilityHigh = false
VAR amnestyConflictTriggered = false

-> ch3_history_start

=== ch3_history_start ===
~ currentSceneId = "ch3_history_start"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Chapter 3: The Public Memory Trial.
The parallel hearings from Chapter 2 spread faster than anyone expected.
So did the backlash.
By week two, Cybol representatives announced a formal tribunal to "resolve contradictory public records."
Communities heard the word resolve and translated it as bury.
The announcement had come through official transit screens and official legal broadcasts simultaneously, which meant it had been coordinated rather than improvised. The language was careful and administrative and used the phrase contradictory records four times in the first paragraph, which was the kind of repetition that suggested someone had tested the phrase for public response before release. In the square near the old civic hall, people gathered to read the projection on a building wall, and the conversations that followed were not panicked. They were specific. A retired teacher asked what a formal tribunal did with records that were demonstrably fabricated by the institutions running the tribunal. A transit worker asked how contradiction was defined when one record came from an official archive and the other from a grandmother's handwritten notebook. A student asked who decided which records counted as the contradiction that needed resolving and which counted as the baseline truth being disturbed. Nobody in the square had an answer to those questions. That absence was its own kind of answer, the kind that makes people stay in the square longer than they intended.
Zelda proposed a counter-structure instead: a public memory trial where every institutional claim had to face verified witness testimony in open sessions.
Marek called it reckless.
Yve called it overdue.
+ [Accept the official tribunal but livestream every minute] # cue:control
    ~ controlIndex += 2
    -> ch3_history_pressure
+ [Refuse official control and convene an independent trial forum] # cue:rebellion
    ~ rebellion += 2
    -> ch3_history_pressure

=== ch3_history_pressure ===
~ currentSceneId = "ch3_history_pressure"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
By day three, defectors from archival offices began requesting conditional amnesty in exchange for internal evidence.
Some had helped edit public memory logs.
Some had signed the edits.
All claimed they could expose higher command.
The defectors arrived at different times through different approaches, which suggested either prior coordination or shared caution about being seen together. Most were quiet when they first arrived, carrying their evidence in whatever container had been most plausible as ordinary cargo: archive boxes labeled with decommissioned project names, climate-controlled cases that resembled the kind used for medical samples, once a canvas bag that had been someone's school bag for years before it began carrying classified routing logs. None of them looked powerful. That was the thing Zelda kept noticing. The people who had helped erase community memory from inside the system looked tired and middle-aged and careful, and they moved through the room with the specific awareness of someone accustomed to being observed. She could not reconcile that observation with what they had done and had stopped trying. Reconciliation was not the immediate goal. Documentation was. What people had done in the past was a separate question from what they could provide in the present, and the trial needed both kinds of accounting at different stages.
The square split over one question:
can a memory trial stay legitimate if it bargains with architects of erasure?
+ [Offer conditional amnesty only after full sworn disclosure in open session] # cue:stability
    ~ stability += 2
    ~ trialCredibilityHigh = true
    -> ch3_history_evidence_labs
+ [Reject amnesty deals and prioritize uncompromised witness standing] # cue:rebellion
    ~ rebellion += 2
    ~ amnestyConflictTriggered = true
    -> ch3_history_evidence_labs


=== ch3_history_evidence_labs ===
~ currentSceneId = "ch3_history_evidence_labs"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Before anyone voted on precedent, Yve established neighborhood evidence labs so claims could be tested in public before reaching the trial floor.
Each lab paired archivists, translators, and witnesses from different districts.
No single institution could submit evidence without passing three checks:
provenance, where chain-of-custody was reconstructed from physical logs and transmission metadata;
context, where the surrounding events were narrated by at least two independent witnesses;
and harm review, where publication risks were documented with mitigation plans.
The labs ran from dawn to curfew.
People brought boxes, memory sticks, paper scraps, old classroom rosters, maintenance logs, and hand-copied testimonies.
Some records contradicted everything the official timeline claimed.
Some records contradicted each other.
The protocol did not hide contradiction.
It labeled contradiction and required explicit follow-up.
Ari helped standardize discrepancy tags so youth volunteers could participate without pretending certainty they did not have.
Marek built a projection wall where every claim moved through visible states:
submitted,
triaged,
validated,
contested,
reopened.
By night, that wall looked like a breathing organism.
No one called it clean.
Everyone called it real.
The afternoon sessions ran long because witnesses kept arriving with additional context that changed the significance of items already in process. A single maintenance log from twelve years ago became more legible once a former route supervisor explained the internal shorthand used for incident classification. A classroom roster that appeared routine contained a column heading that, once translated by a retired administrator, indicated which students had been flagged for compliance screenings. The archivists had begun keeping a secondary log of secondary discoveries: items whose meaning only emerged in relation to something else already in the system. That secondary log was already longer than the primary evidence catalog. Yve had worked in document systems before and knew that the secondary log was usually where the real pattern lived, not in the item that had been hidden, but in the system that had decided what to hide and what to leave visible as misdirection or noise.
+ [Require all tribunal submissions to pass lab validation first] # cue:stability
    ~ stability += 1
    -> ch3_history_witness_safeguards
+ [Allow emergency submissions with post-hoc lab validation] # cue:control
    ~ controlIndex += 1
    -> ch3_history_witness_safeguards

=== ch3_history_witness_safeguards ===
~ currentSceneId = "ch3_history_witness_safeguards"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
As the labs scaled, retaliation attempts escalated.
Anonymous threats targeted witnesses scheduled for high-impact sessions.
Doxxing attempts surfaced within minutes of public docket updates.
Zelda paused expansion and redirected resources into witness safeguards.
She launched a rotating escort network, encrypted pre-brief channels, and temporary identity shielding for high-risk testimonies.
Support crews rehearsed arrival and departure routes repeatedly.
Legal volunteers prepared immediate filings to challenge harassment injunctions.
Therapists and peer counselors staffed decompression rooms adjacent to every hearing site.
The trial stopped pretending that testimony was only a legal act.
It treated testimony as social labor requiring infrastructure.
In one briefing, a survivor said,
"I can tell the truth if someone else carries the fear with me for an hour."
That sentence became policy language.
Ari insisted youth witnesses receive a separate briefing process with plain-language scripts and no cameras by default.
The council approved it unanimously.
The separate briefing process for youth witnesses used a different room entirely, one chosen because it had two exits, natural light, and no podium. The plain-language scripts had been tested with three youth volunteers before the trial began, revised twice based on their feedback, and annotated with timing notes so adult facilitators would know where to pause and where to slow down further. No cameras by default had required a specific policy amendment because the original trial framework had assumed all sessions were subject to identical documentation rules. The amendment passed on the second reading after a youth delegate testified in a closed preparatory session about the difference between speaking truth and speaking truth while a recording device is present in the room. That distinction had not appeared anywhere in the original framework design. It had come entirely from the people the framework was meant to protect, which was why it had been missing until they were asked directly.
+ [Make witness care infrastructure a non-negotiable trial requirement] # cue:stability
    ~ stability += 1
    -> ch3_history_precedent_debate
+ [Keep witness care recommended but leave implementation to districts] # cue:rebellion
    ~ rebellion += 1
    -> ch3_history_precedent_debate

=== ch3_history_precedent_debate ===
~ currentSceneId = "ch3_history_precedent_debate"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
The amnesty debate became a three-night precedent forum rather than a single vote.
Night one focused on moral hazard:
if architects of erasure receive conditional relief, does the trial reward strategic confession?
Night two focused on evidentiary reach:
without insider testimony, can deeper command structures ever be documented credibly?
Night three focused on civic memory:
what story does the city teach children about accountability if process values speed over repair or purity over disclosure?
Delegates spoke in strict rounds.
After each round, moderators summarized arguments without editorial framing and posted unresolved questions in public view.
By the second night, residents began submitting written reflections that linked policy language to lived consequences.
A transit mechanic described losing promotions because altered records marked his family as unreliable.
A teacher described students who could not reconcile official civics lessons with household memory.
A former clerk admitted to redacting logs under threat and asked whether confession without restitution had any ethical standing.
No speech ended the argument.
Accumulated specificity did.
By the final session, both camps rewrote their proposals to include explicit accountability timelines, victim veto windows, and periodic precedent review triggers.
The debate felt less like a duel and more like constitutional maintenance under pressure.
The amphitheater used for the three-night forum had acoustics that forced speakers to pitch their voices higher than conversational, which changed the register of every argument. By the second night, some delegates had adapted by slowing down rather than projecting louder, and those speakers were generally easier to follow. The moderators had arranged the seating so that the audience could see each other as well as the speakers, a deliberate choice meant to discourage the dynamic where one person addresses a panel while everyone else watches them as individuals. When the transit mechanic finished describing his family's blacklisting, the people around him were visibly affected in the specific way that detail affects people rather than general claim. He had named the year, the district office, and the phrase used in the official record to classify his family as a reliability concern. Specificity was what moved the room, not volume, and by the third night the delegates who had been arriving with prepared speeches were instead arriving with specific dates and named consequences, because they had seen what actually reached people and adjusted accordingly.
+ [Advance the revised amnesty framework to irreversible vote] # cue:control
    ~ controlIndex += 1
    -> ch3_history_irreversible
+ [Advance the revised no-amnesty framework to irreversible vote] # cue:memory
    ~ memoryFracture += 1
    -> ch3_history_irreversible

=== ch3_history_irreversible ===
~ currentSceneId = "ch3_history_irreversible"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve put both options on the public board and read them aloud twice.
"This is the irreversible branch," she said. "Whatever we choose becomes precedent."
If they took amnesty testimony, they could expose deeper systems faster at the risk of moral fracture.
If they rejected amnesty testimony, they could preserve purity at the risk of slower truth recovery.
Yve had spent the previous night going through her notes from the evidence labs. She had done it not to prepare arguments but to remind herself what the decision was actually about, because by the time a vote reached the irreversible stage it had accumulated enough procedural language that the original human stakes could become obscured in formal clarity. The notes brought her back. A woman who had not known her mother's legal name had learned it from a contested archive entry. A child had been enrolled in a school under a fabricated family history that everyone around him had been instructed to treat as official record. A neighborhood had been told for fifteen years that the medical facility that served them had been closed for structural reasons when the actual reason was a population reclassification that no one had ever publicly announced. Yve read those notes and then looked at the two options on the board and understood that whatever they chose, they were choosing for people who were not in this room and could not speak to what the decision would cost them directly. That absence did not make the decision easier. It made it more important to get right.
+ [Codify conditional amnesty protocol with strict disclosure and victim veto windows] # cue:control
    ~ controlIndex += 2
    ~ trialCredibilityHigh = true
    ~ endingKey = "trial-credibility-path"
    -> ch3_history_forum
+ [Codify no-amnesty protocol and build a longer witness-led evidence pipeline] # cue:memory
    ~ memoryFracture += 1
    ~ amnestyConflictTriggered = true
    ~ endingKey = "amnesty-conflict-path"
    -> ch3_history_forum

=== ch3_history_forum ===
~ currentSceneId = "ch3_history_forum"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve converted the old amphitheater into a procedural maze that favored transparency over theatrics.
Every testimony station had three clocks:
speaker time,
cross-check time,
and public clarification time.
If institutions submitted archival documents, community archivists reviewed provenance on-site before admission.
If witnesses were challenged, support teams could pause proceedings without losing their slot.
Ari sat in the front row with a stack of colored cards used to request plain-language restatements whenever legal jargon appeared.
She used them often.
The amphitheater had been used for public address before, under the previous administration, and whoever staged those events had installed a sound system that still functioned but had two dead zones in the mid-section seating where certain frequencies would not carry. Volunteers had mapped the dead zones during the setup day and placed additional speakers on long cords that reached into the gaps. It was an imperfect solution and everyone present knew it was imperfect, which was part of why the public clarification period existed: so that anyone who had missed a word or misheard a legal term could request a restatement without procedural penalty. Community archivists had printed summary sheets in four languages and two symbol-notation versions for participants with different reading needs. The sheets were updated each morning before sessions began. The updating took two hours. Zelda had budgeted for that time from the first planning session, because a trial whose proceedings were only legible to people with specific educational backgrounds was not a public trial, regardless of how many people were allowed to enter the room and sit in the chairs.
+ [Prioritize legal durability of evidence even when sessions slow] # cue:stability
    ~ stability += 1
    -> ch3_history_resolution
+ [Prioritize broad participation and multilingual summaries] # cue:memory
    ~ memoryFracture += 1
    -> ch3_history_resolution

=== ch3_history_resolution ===
~ currentSceneId = "ch3_history_resolution"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The first week ended without a single unified verdict.
That was the point.
Instead of one authoritative conclusion, the trial published a layered ruling:
which claims were verified,
which remained disputed,
which required additional witness collection,
and which institutional records were provably fabricated.
Cybol officials called the ruling incomplete.
Neighborhood assemblies called it honest.
Where conditional amnesty passed, archives yielded faster but hearings spent more time on accountability arguments.
Where amnesty failed, public trust consolidated around witness purity but institutional disclosures came slower and with heavier resistance.
Neither path solved legitimacy in a day.
Both forced the city to practice it in public.
For the first time since the timelines split, "incomplete" felt like progress rather than failure.
The layered ruling occupied three registers that had taken a week of argument to distinguish clearly enough to be useful. Verified claims were those where independent corroboration met the threshold set by the evidence labs. Disputed claims were those where testimony conflicted with archival records in ways that could not yet be resolved but where both sources were considered credible pending additional collection. Provably fabricated records were those where chain-of-custody documentation showed direct tampering, with dates, institutional signatures, and in several cases the names of the individuals who had authorized the changes. That third category had been the hardest to name. Several delegates had argued that provably fabricated was too strong a phrase before the amendment process concluded. Zelda had argued back that if the documentation showed direct tampering and the institution had not contested the documentation, the phrase was not too strong. It was accurate. The distinction between accurate and appropriate was itself a question the trial had been designed to surface, and it had surfaced it in a form that required a public answer. That was what version 0.1 meant: not finished, but honest about what it had found.
Zelda archived the ruling as Version 0.1 and added a footer line:
PUBLIC MEMORY IS A PROCESS, NOT A DECREE.
This Chapter 3 route now includes an irreversible amnesty-precedent split and seeds Chapter 4 with a persistent trial credibility condition.
+ [End Chapter 3] # cue:ending
    ~ chapterThreeComplete = true
    -> ch3_history_debrief


=== ch3_history_debrief ===
~ currentSceneId = "ch3_history_debrief"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
The councils held a long debrief before closure. Short messages arrived from every district that had participated in the public memory trial. They were not uniform. That was the point.
Community log, Transit Mechanic, Amphitheater Session Three: I came to give testimony about my family's blacklisting. I did not expect the moderator to pause the clock so I could collect myself. She said witness care is not a delay, it is the process. I am writing that down because I did not know processes could work that way.
Community log, Former Archivist, Conditional Amnesty Track: I signed the edits. I said so in open session. I cannot give anyone those years back. What I can give is the internal routing logs, the approval chains, and the names of who ordered what and when. I hope the trial is ready for the volume. I have been carrying it alone for too long.
Community log, Teacher, No-Amnesty Track: My students used to contradict official civics lessons and then go silent when I could not verify their families' version of events. Now they bring recorded testimonies from grandparents. They are doing better history than the textbook. I filed a curricular amendment. The review board has thirty days.
Community log, Legal Observer, Precedent Forum: The amnesty debate did not end the trial. It made the trial honest about what it was actually doing: negotiating between speed and repair, between disclosure and purity. Those negotiations never end. The protocol is not a solution. It is a method. Methods require maintenance.
Community log, Marek (post-trial reflection): I taught the lie. I know which classrooms, which years, which students. I cannot unteach those specific people. I can participate in a process that gives them access to better information and lets them decide what to do with it. That is smaller than I wanted to contribute. It is what I have.
+ [Close the chapter and carry these commitments forward] # cue:ending
    ~ chapterThreeComplete = true
    -> DONE
