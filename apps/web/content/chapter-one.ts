import type { SceneGraph } from '@fractureline/shared-types';

export const chapterOne: SceneGraph = {
  ch1_p_001: {
    id: 'ch1_p_001',
    chapter: 1,
    pov: 'protector',
    speaker: 'Protector',
    text: [
      'The bells did not ring in Lattice unless something had been corrected.',
      'Today they rang three times, and everyone in the square smiled at the exact same moment.',
    ],
    choices: [
      {
        id: 'study_crowd',
        label: 'Study the crowd before speaking',
        effects: [
          { type: 'increment', key: 'stability', value: 1 },
          { type: 'setFlag', key: 'noticed-synchronized-smiles' },
        ],
        nextSceneId: 'ch1_d_001',
      },
      {
        id: 'approach_dais',
        label: 'Go directly to the correction dais',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_d_001',
      },
    ],
  },
  ch1_d_001: {
    id: 'ch1_d_001',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Dissenter',
    text: [
      'From beneath the old rail line, the city above sounded almost kind.',
      'That was how Lattice lied best. It made obedience sound like music.',
    ],
    choices: [
      {
        id: 'mark_anchor',
        label: 'Mark the bell tower as a temporal anchor',
        effects: [
          { type: 'increment', key: 'magicEntropy', value: 1 },
          { type: 'appendCodex', entry: 'Temporal anchors hold revised memories in place.' },
        ],
        nextSceneId: 'ch1_p_002',
      },
      {
        id: 'follow_echo',
        label: 'Follow the child echo into the service tunnels',
        effects: [
          { type: 'increment', key: 'rebellion', value: 1 },
          { type: 'setFlag', key: 'followed-child-echo' },
        ],
        nextSceneId: 'ch1_p_002',
      },
    ],
  },
  ch1_p_002: {
    id: 'ch1_p_002',
    chapter: 1,
    pov: 'protector',
    speaker: 'Protector',
    text: [
      'The Archivist handed you the corrected record. Your name was already signed at the bottom.',
      'You had no memory of signing it. The ink was still wet.',
    ],
    choices: [
      {
        id: 'accept_record',
        label: 'Accept the record and preserve the ceremony',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_d_002',
      },
      {
        id: 'pocket_record',
        label: 'Pocket the record before anyone notices',
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 1 },
          { type: 'setFlag', key: 'stole-corrected-record' },
        ],
        nextSceneId: 'ch1_d_002',
      },
    ],
  },
  ch1_d_002: {
    id: 'ch1_d_002',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Dissenter',
    text: [
      'The stolen page appeared in your hand before you stole it from anyone.',
      'Across the margin, in your own handwriting, were three words: Do not trust me.',
    ],
    choices: [
      {
        id: 'burn_margin',
        label: 'Burn only the warning in the margin',
        effects: [{ type: 'increment', key: 'stability', value: 1 }],
        nextSceneId: 'ch1_p_003',
      },
      {
        id: 'memorize_warning',
        label: 'Memorize the warning and leave the page intact',
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 1 },
          { type: 'appendCodex', entry: 'Some memories arrive before their causes.' },
        ],
        nextSceneId: 'ch1_p_003',
      },
    ],
  },
  ch1_p_003: {
    id: 'ch1_p_003',
    chapter: 1,
    pov: 'protector',
    speaker: 'Protector',
    text: [
      'A child in the crowd pointed at you and began to cry.',
      'When her mother asked why, the child said, "Because they already chose the fire."',
    ],
    choices: [
      {
        id: 'comfort_child',
        label: 'Kneel and comfort the child',
        effects: [{ type: 'increment', key: 'rebellion', value: 1 }],
        nextSceneId: 'ch1_d_003',
      },
      {
        id: 'call_keeper',
        label: 'Call a Keeper to correct the child gently',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_d_003',
      },
    ],
  },
  ch1_d_003: {
    id: 'ch1_d_003',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Dissenter',
    text: [
      'The tunnel wall split open like glass under pressure.',
      'Through it, you saw the Protector kneeling before a child you remembered saving years from now.',
    ],
    choices: [
      {
        id: 'reach_through',
        label: 'Reach through the fractureline',
        effects: [
          { type: 'increment', key: 'magicEntropy', value: 2 },
          { type: 'setFlag', key: 'touched-fractureline' },
        ],
        nextSceneId: 'ch1_p_004',
      },
      {
        id: 'seal_fracture',
        label: 'Seal the fracture before it sees you',
        effects: [{ type: 'increment', key: 'stability', value: 2 }],
        nextSceneId: 'ch1_p_004',
      },
    ],
  },
  ch1_p_004: {
    id: 'ch1_p_004',
    chapter: 1,
    pov: 'protector',
    speaker: 'Protector',
    text: [
      'Your palm burned with a memory that was not yours.',
      'You remembered reaching through a wall. You remembered refusing. You remembered both as if both had already happened.',
    ],
    choices: [
      {
        id: 'name_fracture',
        label: 'Whisper the word fractureline',
        effects: [
          { type: 'increment', key: 'memoryFracture', value: 2 },
          { type: 'appendCodex', entry: 'The fractureline is where incompatible histories touch.' },
        ],
        nextSceneId: 'ch1_d_004',
      },
      {
        id: 'deny_memory',
        label: 'Deny the impossible memory',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_d_004',
      },
    ],
  },
  ch1_d_004: {
    id: 'ch1_d_004',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Dissenter',
    text: [
      'Your device showed a completed choice log.',
      'The first choice was one you never made: Protect the lie until it learns to speak truth.',
    ],
    choices: [
      {
        id: 'end_chapter',
        label: 'End Chapter 1',
        effects: [{ type: 'setFlag', key: 'chapter-one-complete' }],
        nextSceneId: 'ch1_d_004',
      },
    ],
  },
};
