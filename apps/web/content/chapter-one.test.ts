import { describe, expect, it } from 'vitest';
import { enterScene, resolveChoice, validateSceneGraph } from '@fractureline/narrative-engine';
import { initialTimelineState } from '@fractureline/shared-types';
import { chapterOne } from './chapter-one';

describe('Chapter 1 gameplay graph', () => {
  it('has no broken choice targets', () => {
    expect(validateSceneGraph(chapterOne)).toEqual([]);
  });

  it('starts with the Protector and advances to the Dissenter', () => {
    const entered = enterScene(chapterOne.ch1_p_001, initialTimelineState);
    const next = resolveChoice(chapterOne, entered, 'study_crowd');

    expect(next.currentSceneId).toBe('ch1_d_001');
    expect(next.currentPOV).toBe('dissenter');
    expect(next.stability).toBe(1);
    expect(next.flags['noticed-synchronized-smiles']).toBe(true);
  });

  it('can reach Chapter 1 completion through a deterministic path', () => {
    const choices = [
      'study_crowd',
      'mark_anchor',
      'pocket_record',
      'memorize_warning',
      'comfort_child',
      'reach_through',
      'name_fracture',
      'end_chapter',
    ];

    let state = enterScene(chapterOne.ch1_p_001, initialTimelineState);
    for (const choiceId of choices) {
      state = resolveChoice(chapterOne, state, choiceId);
    }

    expect(state.currentSceneId).toBe('ch1_d_004');
    expect(state.flags['chapter-one-complete']).toBe(true);
    expect(state.codex).toContain('The fractureline is where incompatible histories touch.');
    expect(state.memoryFracture).toBeGreaterThanOrEqual(4);
  });
});
