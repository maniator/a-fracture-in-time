import { describe, expect, it } from 'vitest';
import { initialTimelineState, type SceneGraph } from '@fractureline/shared-types';
import { applyEffect, resolveChoice, validateSceneGraph } from './index';

const graph: SceneGraph = {
  start: {
    id: 'start',
    chapter: 1,
    pov: 'protector',
    speaker: 'Protector',
    text: ['The bells rang three times.'],
    choices: [
      {
        id: 'listen',
        label: 'Listen closer',
        effects: [{ type: 'increment', key: 'memoryFracture', value: 1 }],
        nextSceneId: 'next',
      },
    ],
  },
  next: {
    id: 'next',
    chapter: 1,
    pov: 'dissenter',
    speaker: 'Dissenter',
    text: ['Someone else heard them too.'],
    choices: [],
  },
};

describe('narrative engine', () => {
  it('applies numeric effects', () => {
    const nextState = applyEffect(initialTimelineState, {
      type: 'increment',
      key: 'rebellion',
      value: 2,
    });

    expect(nextState.rebellion).toBe(2);
  });

  it('resolves a choice into the next scene and applies effects', () => {
    const state = { ...initialTimelineState, currentSceneId: 'start' };
    const nextState = resolveChoice(graph, state, 'listen');

    expect(nextState.currentSceneId).toBe('next');
    expect(nextState.currentPOV).toBe('dissenter');
    expect(nextState.memoryFracture).toBe(1);
    expect(nextState.seenScenes).toContain('next');
  });

  it('validates missing scene targets', () => {
    const invalid: SceneGraph = {
      ...graph,
      broken: {
        id: 'broken',
        chapter: 1,
        pov: 'protector',
        text: ['A broken path.'],
        choices: [{ id: 'bad', label: 'Break', nextSceneId: 'missing' }],
      },
    };

    expect(validateSceneGraph(invalid)).toContain('broken.bad points to missing scene missing');
  });
});
