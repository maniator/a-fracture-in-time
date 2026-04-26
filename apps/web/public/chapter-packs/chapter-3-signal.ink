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
    -> ch3_signal_irreversible
+ [Keep submissions open and crowd-source authenticity checks live] # cue:rebellion
    ~ rebellion += 2
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
    -> ch3_signal_handoff
+ [Prioritize reach, even if some forged messages slip through] # cue:rebellion
    ~ rebellion += 2
    ~ relayCompromised = true
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
    ~ endingKey = "signal-path"
    -> DONE
