import { describe, expect, it } from 'vitest';
import { initialTimelineState, type SceneGraph } from '@fractureline/shared-types';
import { applyEffect, applyEffects, conditionsPass, evaluateCondition, resolveChoice, validateSceneGraph } from './index';

const graph: SceneGraph = {
  start: {
    id: 'start',
    chapter: 1,
    pov: 'past',
    speaker: 'Xav Reivax',
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
    pov: 'future',
    speaker: 'Zelda Adlez',
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
    expect(nextState.currentPOV).toBe('future');
    expect(nextState.memoryFracture).toBe(1);
    expect(nextState.seenScenes).toContain('next');
  });

  it('validates missing scene targets', () => {
    const invalid: SceneGraph = {
      ...graph,
      broken: {
        id: 'broken',
        chapter: 1,
        pov: 'past',
        text: ['A broken path.'],
        choices: [{ id: 'bad', label: 'Break', nextSceneId: 'missing' }],
      },
    };

    expect(validateSceneGraph(invalid)).toContain('broken.bad points to missing scene missing');
  });

  it('validateSceneGraph returns empty array for valid graph', () => {
    expect(validateSceneGraph(graph)).toEqual([]);
  });

  it('resolveChoice throws when current scene is not found in graph', () => {
    const state = { ...initialTimelineState, currentSceneId: 'nonexistent' };
    expect(() => resolveChoice(graph, state, 'listen')).toThrow('Current scene not found: nonexistent');
  });

  it('resolveChoice throws when choice id is not available', () => {
    const state = { ...initialTimelineState, currentSceneId: 'start' };
    expect(() => resolveChoice(graph, state, 'missing-choice')).toThrow('Choice not available: missing-choice');
  });

  it('resolveChoice throws when next scene is not in graph', () => {
    const brokenGraph: SceneGraph = {
      start: {
        id: 'start',
        chapter: 1,
        pov: 'past',
        text: ['start'],
        choices: [{ id: 'go', label: 'Go', nextSceneId: 'missing-next' }],
      },
    };
    const state = { ...initialTimelineState, currentSceneId: 'start' };
    expect(() => resolveChoice(brokenGraph, state, 'go')).toThrow('Next scene not found: missing-next');
  });

  it('conditionsPass returns true when conditions array is empty', () => {
    expect(conditionsPass([], initialTimelineState)).toBe(true);
  });

  it('conditionsPass returns true when conditions is undefined', () => {
    expect(conditionsPass(undefined, initialTimelineState)).toBe(true);
  });

  it('applyEffects returns same state when effects array is empty', () => {
    const result = applyEffects(initialTimelineState, []);
    expect(result).toEqual(initialTimelineState);
  });

  it('applyEffects returns same state when effects array is undefined', () => {
    const result = applyEffects(initialTimelineState, undefined);
    expect(result).toEqual(initialTimelineState);
  });

  it('evaluateCondition throws on unknown condition type via assertNever', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => evaluateCondition({ type: 'unknown' } as any, initialTimelineState)).toThrow('Unhandled variant');
  });

  it('applyEffect returns same state when markSceneSeen is a duplicate', () => {
    const state = { ...initialTimelineState, seenScenes: ['ch1_intro'] };
    const result = applyEffect(state, { type: 'markSceneSeen', sceneId: 'ch1_intro' });
    expect(result).toBe(state); // strict reference equality — no new object created
  });

  it('applyEffect throws on unknown effect type via assertNever', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => applyEffect(initialTimelineState, { type: 'unknown' } as any)).toThrow('Unhandled variant');
  });
});
