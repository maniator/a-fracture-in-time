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
          { type: 'increment', key: 'stability', value: 1 },
          { type: 'setFlag', key: 'noticed-synchronized-smiles' },
        ],
        nextSceneId: 'ch1_d_001',
      },
      {
        id: 'approach_dais',
        label: 'Do your Protector duty and report to the ceremony platform',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_d_001',
      },
    ],
  },
  ch1_d_001: {
    id: 'ch1_d_001',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'Below the old rail line, Soren Quill listened to the city above pretend to be kind.',
      'He had crossed back through a fractured piece of time to find proof that Lattice was not peace. It was control with better music.',
    ],
    choices: [
      {
        id: 'mark_anchor',
        label: 'Use the bell tower as a fixed point in time',
        effects: [
          { type: 'increment', key: 'magicEntropy', value: 1 },
          { type: 'appendCodex', entry: 'Temporal anchors hold revised memories in place.' },
        ],
        nextSceneId: 'ch1_p_002',
      },
      {
        id: 'follow_echo',
        label: 'Follow the childlike voice deeper into the tunnels',
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
    speaker: 'Mira Vale',
    text: [
      'The Archivist handed Mira the corrected record. Her name was already signed at the bottom.',
      'She had no memory of signing it. The ink was still wet.',
    ],
    choices: [
      {
        id: 'accept_record',
        label: 'Accept the record and keep the ceremony moving',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_d_002',
      },
      {
        id: 'pocket_record',
        label: 'Hide the record so you can inspect it later',
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
    speaker: 'Soren Quill',
    text: [
      'The stolen page appeared in Soren’s hand before Mira had stolen it from anyone.',
      'Across the margin, in his own handwriting, were three words: Do not trust me.',
    ],
    choices: [
      {
        id: 'burn_margin',
        label: 'Destroy the warning before it can change anything',
        effects: [{ type: 'increment', key: 'stability', value: 1 }],
        nextSceneId: 'ch1_p_003',
      },
      {
        id: 'memorize_warning',
        label: 'Remember the warning and keep the page intact',
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
    speaker: 'Mira Vale',
    text: [
      'A child in the crowd pointed at Mira and began to cry.',
      'When her mother asked why, the child said, "Because she already chose the fire."',
    ],
    choices: [
      {
        id: 'comfort_child',
        label: 'Break protocol and comfort the child yourself',
        effects: [{ type: 'increment', key: 'rebellion', value: 1 }],
        nextSceneId: 'ch1_d_003',
      },
      {
        id: 'call_keeper',
        label: 'Call a Keeper to calm and correct the child',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_d_003',
      },
    ],
  },
  ch1_d_003: {
    id: 'ch1_d_003',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'The tunnel wall split open like glass under pressure.',
      'Through it, Soren saw Mira kneeling before a child he remembered saving years from now.',
    ],
    choices: [
      {
        id: 'reach_through',
        label: 'Reach through the break in time toward Mira',
        effects: [
          { type: 'increment', key: 'magicEntropy', value: 2 },
          { type: 'setFlag', key: 'touched-fractureline' },
        ],
        nextSceneId: 'ch1_p_004',
      },
      {
        id: 'seal_fracture',
        label: 'Close the break before Lattice notices you',
        effects: [{ type: 'increment', key: 'stability', value: 2 }],
        nextSceneId: 'ch1_p_004',
      },
    ],
  },
  ch1_p_004: {
    id: 'ch1_p_004',
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
        nextSceneId: 'ch1_d_004',
      },
      {
        id: 'deny_memory',
        label: 'Tell yourself the memory is only stress',
        effects: [{ type: 'increment', key: 'controlIndex', value: 1 }],
        nextSceneId: 'ch1_d_004',
      },
    ],
  },
  ch1_d_004: {
    id: 'ch1_d_004',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Soren Quill',
    text: [
      'Soren’s device showed a completed choice log.',
      'The first choice was one he never made: Protect the lie until it learns to speak truth.',
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
