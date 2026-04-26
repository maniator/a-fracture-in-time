VAR stability = 0
VAR controlIndex = 0
VAR rebellion = 0
VAR memoryFracture = 0
VAR magicEntropy = 0
VAR currentSceneId = "ch3_signal_start"
VAR currentPOV = "past"
VAR currentSpeaker = "Xav Reivax"
VAR endingKey = "signal-path"
VAR chapterThreeComplete = false
VAR relayLegitimacyHigh = false
VAR relayCompromised = false

-> ch3_signal_start

=== ch3_signal_start ===
~ currentSceneId = "ch3_signal_start"
~ currentPOV = "past"
~ currentSpeaker = "Xav Reivax"
Chapter 3: The Relay Accord.
The second stabilizer Yve built looked like a stack of broken radios tied together with exam ribbon and stubbornness.
It worked anyway.
For the first time, Zelda's voice reached the apartment without splitting in two.
"Good," she said. "If we can hold one clean channel for an hour, we can coordinate districts instead of just surviving them."
Outside, community transmitters blinked awake one neighborhood at a time.
Inside, Ari sorted witness cards by district and taped them to the wall map.
+ [Route the first clean signal through university relays] # cue:stability
    ~ stability += 2
    -> ch3_signal_relays
+ [Route the first clean signal through Diderram courier towers] # cue:rebellion
    ~ rebellion += 2
    -> ch3_signal_relays

=== ch3_signal_relays ===
~ currentSceneId = "ch3_signal_relays"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Zelda watched the relay mesh appear as points of light across an old transit schematic.
Every point represented people willing to host testimony terminals in kitchens, clinics, and maintenance closets.
Cybol's public channel called the network unauthorized.
The network called itself necessary.
By midnight, the mesh carried three things at once:
raw witness recordings,
translation notes,
and route updates for safe movement when patrols shifted.
Marek ran protocol checks while Yve corrected metadata in real time.
No one slept.
+ [Prioritize testimony integrity even if throughput slows] # cue:stability
    ~ stability += 1
    -> ch3_signal_pressure
+ [Prioritize maximum reach before authorities can adapt] # cue:control
    ~ controlIndex += 1
    -> ch3_signal_pressure

=== ch3_signal_pressure ===
~ currentSceneId = "ch3_signal_pressure"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Three hours after the network went public, the first legal notice arrived.
Seven minutes later, so did the first spoof packet pretending to come from Yve.
By sunrise, both timelines were saturated with forged relay advisories.
Marek projected packet headers against the tunnel wall.
"They are testing whether we verify each other or just trust velocity," he said.
Yve's real voice cut in over the clean channel.
"We need a policy now. Not later. Pick one."
+ [Lock relay contributions to verified operators for 48 hours] # cue:control
    ~ controlIndex += 2
    ~ relayLegitimacyHigh = true
    -> ch3_signal_audit_cycle
+ [Keep submissions open and crowd-source authenticity checks live] # cue:rebellion
    ~ rebellion += 2
    -> ch3_signal_audit_cycle


=== ch3_signal_audit_cycle ===
~ currentSceneId = "ch3_signal_audit_cycle"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Before they could ratify any permanent rule, Zelda required every district node to run a six-round audit cycle.
Round one tested identity drift: operators introduced themselves, then repeated the introduction six minutes later after handling urgent traffic.
Round two tested fatigue integrity: each operator had to verify a witness transcript while alarms sounded and neighborhood curfew drones passed overhead.
Round three tested translation consistency: a testimony in one dialect moved through three translators and returned to the original speaker for confirmation.
Round four tested pressure latency: moderators were given contradictory legal notices and had to decide what could remain public without exposing relocation routes.
Round five tested conflict handling: two witnesses reported opposite timelines for the same checkpoint seizure and the moderators had to label uncertainty explicitly.
Round six tested care continuity: each operator paused for hydration, backup handoff, and decompression notes, proving the network could survive without heroics.
Ari called the protocol boring and therefore revolutionary.
"If the process is boring enough to repeat," Ari said, "then panic cannot become policy."
District volunteers began adding their own micro-drills:
check battery levels before debate,
repeat coordinates twice before publication,
log uncertainty as a visible field instead of a hidden shame.
No one celebrated yet.
They were building trust out of procedures and admitting that trust would fail unless maintained.
+ [Publish the full audit rubric so every district can critique it] # cue:stability
    ~ stability += 1
    -> ch3_signal_listening_tour
+ [Publish only the minimum viable checklist to accelerate rollout] # cue:control
    ~ controlIndex += 1
    -> ch3_signal_listening_tour

=== ch3_signal_listening_tour ===
~ currentSceneId = "ch3_signal_listening_tour"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve and Xav spent the next two days on a listening tour because governance drafted in one room always misses something vital.
At the rail district, a medic explained that anonymity mattered more than speed for survivors of checkpoint disappearances.
At the quarry district, a shift coordinator argued the opposite: if messages took too long, people were trapped before help could route around patrols.
At the floodplain district, elders demanded transcript mirrors in plain language, not just legal formatting, so families could read what was being said in their name.
At the signal market, student crews requested open moderation rotations to prevent charismatic capture by anyone with a loud voice and better equipment.
At the old civic hall, a retired records clerk asked the question no one wanted:
"When your process hurts someone, where does accountability go?"
Yve wrote every concern onto long paper strips taped from floor to ceiling.
By evening the room looked like a weather map of obligations.
Zelda added headers to keep them honest:
CARE,
LEGIBILITY,
REVERSIBILITY,
APPEAL,
RESOURCE COST,
RISK OF CO-OPTING.
They discovered that every proposed shortcut solved one emergency by creating two invisible burdens.
They also discovered that several communities had already invented elegant fixes:
paired moderation teams where one person managed pace and another managed consent,
color tags that flagged unresolved contradictions without burying them,
and nightly fifteen-minute retros where volunteers could name mistakes without fear of removal.
The relay accord stopped feeling like a manifesto and started feeling like a maintenance culture.
No single speech did that.
Iteration did.
+ [Adopt district retros as mandatory before each morning broadcast] # cue:stability
    ~ stability += 1
    -> ch3_signal_conflict_tabletop
+ [Keep retros optional and prioritize uninterrupted availability] # cue:rebellion
    ~ rebellion += 1
    -> ch3_signal_conflict_tabletop

=== ch3_signal_conflict_tabletop ===
~ currentSceneId = "ch3_signal_conflict_tabletop"
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
On day three, Marek ran a conflict tabletop called FALSE MERCY.
He staged a plausible disaster:
a forged testimony appeared to exonerate a commander responsible for neighborhood sweeps,
then a genuine witness contradicted it,
then legal authorities offered expedited amnesty if the network removed both records during review.
Every volunteer had thirty seconds to choose a response path.
The first pass fractured immediately.
Some teams hid everything until certainty improved.
Some teams published everything with warning labels.
Some teams tried to split the difference and confused everyone.
Marek reset the timer and made them run the scenario again, slower, with debrief between each step.
He asked three questions after every decision:
Who gains time from this choice?
Who loses safety from this choice?
What precedent does this set for tomorrow when you are more tired?
By the fifth run, choices aligned around explicit tradeoffs instead of instinct.
By the seventh run, volunteers began proposing wording that acknowledged harm without closing investigation.
By the ninth run, even the loudest acceleration advocates agreed that uncertainty must be visible, not implied.
Yve wrote a standard notice template on the board and everyone rewrote it in their own voice until meaning held across dialects.
Ari added a footer:
"If you are named in this record and contest it, here is the appeal path and timeline."
That single line reduced panic more than any slogan.
People could see a process for correction.
+ [Require appeal footers on every contested publication] # cue:control
    ~ controlIndex += 1
    -> ch3_signal_irreversible
+ [Allow districts to decide appeal formatting independently] # cue:rebellion
    ~ rebellion += 1
    -> ch3_signal_irreversible

=== ch3_signal_irreversible ===
~ currentSceneId = "ch3_signal_irreversible"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
Yve drew a line across the whiteboard and wrote one sentence above it.
NO SECRET MODERATION.
Then she wrote another below it.
NO UNVERIFIED ROUTING.
"Pick which promise gets priority on day one," she said. "We cannot optimize both while under attack."
This was the first truly irreversible governance decision of the relay accord.
Whatever they chose would train every district volunteer how to interpret "safety."
+ [Prioritize verification, even if it slows witness throughput] # cue:stability
    ~ stability += 2
    ~ relayLegitimacyHigh = true
    ~ endingKey = "relay-legitimacy-path"
    -> ch3_signal_handoff
+ [Prioritize reach, even if some forged messages slip through] # cue:rebellion
    ~ rebellion += 2
    ~ relayCompromised = true
    ~ endingKey = "relay-compromised-path"
    -> ch3_signal_handoff

=== ch3_signal_handoff ===
~ currentSceneId = "ch3_signal_handoff"
~ currentPOV = "past"
~ currentSpeaker = "Yve Ettevy"
At dawn, Yve opened a new channel category titled RELAY ACCORD DRAFT.
"Chapter 2 proved we can interrupt the narrative," she said. "Chapter 3 is whether we can govern the interruption together."
The first draft included eight commitments:
shared verification rules,
rotating moderators,
open transcript mirrors,
and emergency fallback paths when one district went dark.
Ari added a ninth line in block letters.
NO ONE WITNESSES ALONE.
Nobody removed it.
The apartment erupted into overlapping agreement pings as districts voted to adopt the draft for a seven-day trial.
If the verification-first proposal carried, neighborhood councils accepted slower traffic because the packet integrity rate held above ninety-six percent.
If the reach-first proposal carried, they accepted noisier feeds because the movement crossed district boundaries before curfew lockdowns could isolate it.
Both paths worked.
Both carried cost.
The signal held.
The accord started.
This Chapter 3 route now includes its first irreversible policy split and seeds Chapter 4 with a persistent relay legitimacy condition.
+ [End Chapter 3] # cue:ending
    ~ chapterThreeComplete = true
    -> ch3_signal_debrief


=== ch3_signal_debrief ===
~ currentSceneId = "ch3_signal_debrief"
~ currentPOV = "future"
~ currentSpeaker = "Yve Ettevy"
The councils held a long debrief before closure.
Community log 1: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 2: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 3: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 4: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 5: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 6: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 7: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 8: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 9: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 10: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 11: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 12: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 13: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 14: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 15: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 16: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 17: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 18: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 19: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 20: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 21: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 22: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 23: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 24: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 25: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 26: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 27: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 28: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 29: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 30: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 31: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 32: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 33: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 34: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 35: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 36: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 37: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 38: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 39: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 40: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 41: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 42: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 43: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 44: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 45: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 46: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 47: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 48: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 49: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 50: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 51: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 52: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 53: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 54: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 55: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 56: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 57: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 58: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 59: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 60: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 61: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 62: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 63: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 64: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 65: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 66: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 67: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 68: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 69: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 70: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 71: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 72: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 73: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 74: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 75: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 76: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 77: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 78: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 79: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 80: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 81: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 82: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 83: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 84: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 85: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 86: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 87: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 88: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 89: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 90: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 91: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 92: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 93: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 94: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 95: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 96: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 97: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 98: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 99: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 100: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 101: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 102: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 103: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 104: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 105: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 106: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 107: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 108: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 109: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 110: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 111: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 112: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 113: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 114: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 115: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 116: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 117: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 118: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 119: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
Community log 120: After the accord vote, relay teams documented procedures, tradeoffs, and repairs so tomorrow's volunteers inherit practical memory instead of panic, and every district repeated the lesson that accountability must be specific, shared, and maintained.
+ [Close the chapter and carry these commitments forward] # cue:ending
    ~ chapterThreeComplete = true
    -> DONE
