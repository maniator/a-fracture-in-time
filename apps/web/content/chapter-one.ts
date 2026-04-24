import type { SceneGraph } from '@fractureline/shared-types';

export const chapterOne: SceneGraph = {
  ch1_p_001: {
    id: 'ch1_p_001',
    chapter: 1,
    pov: 'protector',
    speaker: 'Mira Vale',
    text: [
      'Mira Vale stood at the edge of Bell Square in her blue Protector uniform, one hand resting on the sealed civic record at her side.',
      'In Lattice, the bells did not ring unless something had been corrected. Today they rang three times, and everyone in the square smiled at the exact same moment.',
    ],
    choices: [
      {
        id: 'study_crowd',
        label: 'Look for what feels wrong in the crowd',
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 1 },
          { type: 'setFlag', key: 'noticed-synchronized-smiles' },
        ],
        nextSceneId: 'ch1_d_echo',
      },
      {
        id: 'approach_dais',
        label: 'Do your Protector duty and report to the ceremony platform',
        effects: [
          { type: 'increment', key: 'controlIndex', value: 1 },
          { type: 'setFlag', key: 'reported-to-platform' },
        ],
        nextSceneId: 'ch1_d_duty',
      },
    ],
  },
  ch1_d_echo: {
    id: 'ch1_d_echo',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'Below the old rail line, Soren Quill heard the correction ripple through the city above.',
      'Someone inside the ceremony had noticed the smiles were synchronized. That meant Mira was not fully asleep inside Lattice anymore.',
    ],
    choices: [
      {
        id: 'follow_echo',
        label: 'Follow the childlike voice deeper into the tunnels',
        effects: [
          { type: 'increment', key: 'rebellion', value: 1 },
          { type: 'setFlag', key: 'followed-child-echo' },
        ],
        nextSceneId: 'ch1_p_child',
      },
      {
        id: 'mark_anchor',
        label: 'Use the bell tower as a fixed point in time',
        effects: [
          { type: 'increment', key: 'magicEntropy', value: 1 },
          { type: 'appendCodex', entry: 'Temporal anchors hold revised memories in place.' },
          { type: 'setFlag', key: 'marked-bell-anchor' },
        ],
        nextSceneId: 'ch1_p_record',
      },
    ],
  },
  ch1_d_duty: {
    id: 'ch1_d_duty',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'Soren watched Mira step toward the ceremony platform instead of the crowd.',
      'That route was harder. If Mira stayed loyal, Lattice would use her as the signature on whatever lie came next.',
    ],
    choices: [
      {
        id: 'map_correction',
        label: 'Map the ceremony correction and avoid direct contact',
        effects: [
          { type: 'increment', key: 'stability', value: 1 },
          { type: 'setFlag', key: 'mapped-correction' },
        ],
        nextSceneId: 'ch1_p_authority',
      },
      {
        id: 'sabotage_logs',
        label: 'Quietly corrupt the ceremony logs before Mira signs them',
        effects: [
          { type: 'increment', key: 'rebellion', value: 1 },
          { type: 'increment', key: 'magicEntropy', value: 1 },
          { type: 'setFlag', key: 'corrupted-ceremony-logs' },
        ],
        nextSceneId: 'ch1_p_record',
      },
    ],
  },
  ch1_p_child: {
    id: 'ch1_p_child',
    chapter: 1,
    pov: 'protector',
    speaker: 'Mira Vale',
    text: [
      'A child in the crowd pointed at Mira and began to cry.',
      'When her mother asked why, the child said, "Because she already chose the fire." The phrase struck Mira like a memory from a life she had never lived.',
    ],
    choices: [
      {
        id: 'comfort_child',
        label: 'Break protocol and comfort the child yourself',
        effects: [
          { type: 'increment', key: 'rebellion', value: 2 },
          { type: 'setFlag', key: 'comforted-child' },
        ],
        nextSceneId: 'ch1_d_rebellion',
      },
      {
        id: 'call_keeper',
        label: 'Call a Keeper to calm and correct the child',
        effects: [
          { type: 'increment', key: 'controlIndex', value: 2 },
          { type: 'setFlag', key: 'called-keeper-on-child' },
        ],
        nextSceneId: 'ch1_d_control',
      },
    ],
  },
  ch1_p_record: {
    id: 'ch1_p_record',
    chapter: 1,
    pov: 'protector',
    speaker: 'Mira Vale',
    text: [
      'The Archivist handed Mira the corrected record. Her name was already signed at the bottom.',
      'She had no memory of signing it. The ink was still wet, and one line kept changing whenever she looked away.',
    ],
    choices: [
      {
        id: 'hide_record',
        label: 'Hide the record so you can inspect it later',
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 2 },
          { type: 'setFlag', key: 'stole-corrected-record' },
        ],
        nextSceneId: 'ch1_d_memory',
      },
      {
        id: 'sign_record',
        label: 'Sign the record publicly and preserve the ceremony',
        effects: [
          { type: 'increment', key: 'controlIndex', value: 2 },
          { type: 'increment', key: 'stability', value: 1 },
          { type: 'setFlag', key: 'signed-corrected-record' },
        ],
        nextSceneId: 'ch1_d_control',
      },
    ],
  },
  ch1_p_authority: {
    id: 'ch1_p_authority',
    chapter: 1,
    pov: 'protector',
    speaker: 'Mira Vale',
    text: [
      'The Archivist did not hand Mira a record. He handed her a sealed order.',
      'It named a Dissenter beneath the rail line and asked Mira to authorize a private correction before anyone in the square noticed the disturbance.',
    ],
    choices: [
      {
        id: 'authorize_correction',
        label: 'Authorize the private correction',
        effects: [
          { type: 'increment', key: 'controlIndex', value: 2 },
          { type: 'increment', key: 'stability', value: 1 },
          { type: 'setFlag', key: 'authorized-soren-correction' },
        ],
        nextSceneId: 'ch1_d_control',
      },
      {
        id: 'delay_order',
        label: 'Delay the order and ask why the Dissenter knows your name',
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 1 },
          { type: 'increment', key: 'rebellion', value: 1 },
          { type: 'setFlag', key: 'delayed-correction-order' },
        ],
        nextSceneId: 'ch1_d_memory',
      },
    ],
  },
  ch1_d_rebellion: {
    id: 'ch1_d_rebellion',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'The tunnel wall split open like glass under pressure.',
      'Through it, Soren saw Mira kneeling beside the child instead of handing her to the Keepers. That was not the timeline he came from. It was better, and therefore more dangerous.',
    ],
    choices: [
      {
        id: 'reach_through',
        label: 'Reach through the break in time toward Mira',
        effects: [
          { type: 'increment', key: 'magicEntropy', value: 2 },
          { type: 'setFlag', key: 'touched-fractureline' },
        ],
        nextSceneId: 'ch1_p_fracture',
      },
      {
        id: 'arm_the_child_memory',
        label: 'Send the child one protected memory before the break closes',
        effects: [
          { type: 'increment', key: 'rebellion', value: 2 },
          { type: 'appendCodex', entry: 'Protected memories can survive civic correction.' },
          { type: 'setFlag', key: 'armed-child-memory' },
        ],
        nextSceneId: 'ch1_p_rebellion',
      },
    ],
  },
  ch1_d_memory: {
    id: 'ch1_d_memory',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'The stolen page appeared in Soren’s hand before Mira had finished deciding what to do with it.',
      'Across the margin, in his own handwriting, were three words: Do not trust me.',
    ],
    choices: [
      {
        id: 'memorize_warning',
        label: 'Remember the warning and keep the page intact',
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 2 },
          { type: 'appendCodex', entry: 'Some memories arrive before their causes.' },
          { type: 'setFlag', key: 'trusted-impossible-warning' },
        ],
        nextSceneId: 'ch1_p_fracture',
      },
      {
        id: 'burn_warning',
        label: 'Burn the warning before it can rewrite your mission',
        effects: [
          { type: 'increment', key: 'stability', value: 2 },
          { type: 'setFlag', key: 'burned-impossible-warning' },
        ],
        nextSceneId: 'ch1_p_control',
      },
    ],
  },
  ch1_d_control: {
    id: 'ch1_d_control',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'The city tightened around Soren. Doors remembered being walls. Cameras remembered looking away. The correction was already moving.',
      'Mira had kept the ceremony intact, and Lattice rewarded loyalty by making the next disobedient thought harder to form.',
    ],
    choices: [
      {
        id: 'hide_from_lattice',
        label: 'Hide and preserve the mission for another fracture',
        effects: [
          { type: 'increment', key: 'stability', value: 1 },
          { type: 'setFlag', key: 'soren-hid-from-lattice' },
        ],
        nextSceneId: 'ch1_p_control',
      },
      {
        id: 'force_signal',
        label: 'Force one message through before Lattice seals the tunnels',
        effects: [
          { type: 'increment', key: 'magicEntropy', value: 2 },
          { type: 'setFlag', key: 'forced-soren-signal' },
        ],
        nextSceneId: 'ch1_p_fracture',
      },
    ],
  },
  ch1_p_fracture: {
    id: 'ch1_p_fracture',
    chapter: 1,
    pov: 'protector',
    speaker: 'Mira Vale',
    text: [
      'Mira’s palm burned with a memory that was not hers.',
      'She remembered Soren reaching through a wall. She remembered him refusing. She remembered both as if both had already happened.',
    ],
    choices: [
      {
        id: 'name_fracture',
        label: 'Say the impossible word: fractureline',
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 2 },
          { type: 'appendCodex', entry: 'The fractureline is where incompatible histories touch.' },
        ],
        nextSceneId: 'ch1_end_fracture',
      },
      {
        id: 'seal_memory',
        label: 'Seal the impossible memory before anyone sees your fear',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_end_control',
      },
    ],
  },
  ch1_p_rebellion: {
    id: 'ch1_p_rebellion',
    chapter: 1,
    pov: 'protector',
    speaker: 'Mira Vale',
    text: [
      'The child stopped crying and smiled at Mira without synchronization.',
      'Around them, the crowd’s perfect calm broke into hundreds of different expressions. Lattice had lost the room for three impossible seconds.',
    ],
    choices: [
      {
        id: 'protect_child',
        label: 'Stand between the child and the Keepers',
        effects: [
          { type: 'increment', key: 'rebellion', value: 2 },
          { type: 'setFlag', key: 'mira-protected-child' },
        ],
        nextSceneId: 'ch1_end_rebellion',
      },
      {
        id: 'scatter_crowd',
        label: 'Tell the crowd to run before the correction resumes',
        effects: [
          { type: 'increment', key: 'magicEntropy', value: 1 },
          { type: 'increment', key: 'rebellion', value: 1 },
          { type: 'setFlag', key: 'scattered-crowd' },
        ],
        nextSceneId: 'ch1_end_rebellion',
      },
    ],
  },
  ch1_p_control: {
    id: 'ch1_p_control',
    chapter: 1,
    pov: 'protector',
    speaker: 'Mira Vale',
    text: [
      'The ceremony finished exactly on time.',
      'Only Mira noticed that three minutes had disappeared from the public record. Only Mira noticed she was relieved.',
    ],
    choices: [
      {
        id: 'accept_order',
        label: 'Accept the order and let the missing minutes stay missing',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_end_control',
      },
      {
        id: 'write_private_note',
        label: 'Write yourself a private note before the relief becomes obedience',
        conditions: [{ type: 'gte', key: 'memoryFracture', value: 1 }],
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 1 },
          { type: 'appendCodex', entry: 'Private records can resist public certainty.' },
        ],
        nextSceneId: 'ch1_end_fracture',
      },
    ],
  },
  ch1_end_fracture: {
    id: 'ch1_end_fracture',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'Soren’s device showed a completed choice log, but the first line did not belong to him or Mira.',
      'Ending: The Fracture Path. Mira knows the city lies. Soren knows the timeline can answer back.',
    ],
    choices: [
      {
        id: 'end_chapter',
        label: 'End Chapter 1',
        effects: [
          { type: 'setFlag', key: 'chapter-one-complete' },
          { type: 'setEnding', endingKey: 'fracture-path' },
        ],
        nextSceneId: 'ch1_end_fracture',
      },
    ],
  },
  ch1_end_rebellion: {
    id: 'ch1_end_rebellion',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'The bell tower missed its fourth note. For the first time in years, Lattice had to improvise.',
      'Ending: The Rebellion Path. Mira has publicly broken protocol. Soren has made the future less certain and more alive.',
    ],
    choices: [
      {
        id: 'end_chapter',
        label: 'End Chapter 1',
        effects: [
          { type: 'setFlag', key: 'chapter-one-complete' },
          { type: 'setEnding', endingKey: 'rebellion-path' },
        ],
        nextSceneId: 'ch1_end_rebellion',
      },
    ],
  },
  ch1_end_control: {
    id: 'ch1_end_control',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'Soren woke beneath the rail line with the taste of erased words in his mouth.',
      'Ending: The Control Path. Lattice holds the city, but Mira has become important enough for the city to fear her doubt.',
    ],
    choices: [
      {
        id: 'end_chapter',
        label: 'End Chapter 1',
        effects: [
          { type: 'setFlag', key: 'chapter-one-complete' },
          { type: 'setEnding', endingKey: 'control-path' },
        ],
        nextSceneId: 'ch1_end_control',
      },
    ],
  },
};
