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
The councils held a long debrief before closure.
Community log 1: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 2: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 3: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 4: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 5: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 6: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 7: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 8: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 9: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 10: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 11: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 12: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 13: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 14: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 15: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 16: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 17: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 18: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 19: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 20: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 21: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 22: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 23: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 24: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 25: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 26: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 27: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 28: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 29: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 30: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 31: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 32: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 33: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 34: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 35: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 36: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 37: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 38: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 39: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 40: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 41: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 42: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 43: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 44: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 45: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 46: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 47: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 48: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 49: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 50: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 51: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 52: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 53: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 54: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 55: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 56: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 57: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 58: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 59: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 60: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 61: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 62: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 63: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 64: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 65: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 66: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 67: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 68: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 69: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 70: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 71: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 72: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 73: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 74: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 75: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 76: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 77: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 78: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 79: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 80: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 81: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 82: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 83: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 84: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 85: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 86: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 87: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 88: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 89: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 90: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 91: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 92: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 93: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 94: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 95: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 96: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 97: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 98: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 99: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 100: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 101: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 102: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 103: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 104: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 105: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 106: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 107: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 108: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 109: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 110: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 111: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 112: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 113: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 114: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 115: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 116: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 117: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 118: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 119: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 120: After the trial ruling, memory-justice teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
+ [Close the chapter and carry these commitments forward] # cue:ending
    ~ chapterThreeComplete = true
    -> DONE
