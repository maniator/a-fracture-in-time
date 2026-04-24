import { describe, expect, it } from 'vitest';
import { enterScene, getAvailableChoices, resolveChoice, validateSceneGraph } from '@fractureline/narrative-engine';
import { initialTimelineState, type TimelineState } from '@fractureline/shared-types';
import { chapterOne } from './chapter-one';

function playPath(choices: string[]): TimelineState {
  let state = enterScene(chapterOne.ch1_p_001, initialTimelineState);
  for (const choiceId of choices) {
    state = resolveChoice(chapterOne, state, choiceId);
  }
  return state;
}

describe('Chapter 1 gameplay graph', () => {
  it('has no broken choice targets', () => {
    expect(validateSceneGraph(chapterOne)).toEqual([]);
  });

  it('branches immediately based on Mira first choice', () => {
    const entered = enterScene(chapterOne.ch1_p_001, initialTimelineState);
    const memoryStart = resolveChoice(chapterOne, entered, 'study_crowd');
    const controlStart = resolveChoice(chapterOne, entered, 'approach_dais');

    expect(memoryStart.currentSceneId).toBe('ch1_d_echo');
    expect(memoryStart.memoryFracture).toBe(1);
    expect(memoryStart.flags['noticed-synchronized-smiles']).toBe(true);

    expect(controlStart.currentSceneId).toBe('ch1_d_duty');
    expect(controlStart.controlIndex).toBe(1);
    expect(controlStart.flags['reported-to-platform']).toBe(true);
  });

  it('can complete the Fracture Path', () => {
    const state = playPath([
      'study_crowd',
      'mark_anchor',
      'hide_record',
      'memorize_warning',
      'name_fracture',
      'end_chapter',
    ]);

    expect(state.currentSceneId).toBe('ch1_end_fracture');
    expect(state.flags['chapter-one-complete']).toBe(true);
    expect(state.endingKey).toBe('fracture-path');
    expect(state.codex).toContain('The fractureline is where incompatible histories touch.');
    expect(state.memoryFracture).toBeGreaterThanOrEqual(5);
  });

  it('can complete the Rebellion Path', () => {
    const state = playPath([
      'study_crowd',
      'follow_echo',
      'comfort_child',
      'arm_the_child_memory',
      'protect_child',
      'end_chapter',
    ]);

    expect(state.currentSceneId).toBe('ch1_end_rebellion');
    expect(state.flags['chapter-one-complete']).toBe(true);
    expect(state.endingKey).toBe('rebellion-path');
    expect(state.flags['mira-protected-child']).toBe(true);
    expect(state.rebellion).toBeGreaterThanOrEqual(5);
  });

  it('can complete the Control Path', () => {
    const state = playPath([
      'approach_dais',
      'map_correction',
      'authorize_correction',
      'hide_from_lattice',
      'accept_order',
      'end_chapter',
    ]);

    expect(state.currentSceneId).toBe('ch1_end_control');
    expect(state.flags['chapter-one-complete']).toBe(true);
    expect(state.endingKey).toBe('control-path');
    expect(state.flags['authorized-soren-correction']).toBe(true);
    expect(state.controlIndex).toBeGreaterThanOrEqual(4);
  });

  it('shows conditional private-note choice only when Mira has enough memory fracture', () => {
    const noMemoryState = playPath(['approach_dais', 'map_correction', 'authorize_correction', 'hide_from_lattice']);
    const noMemoryChoices = getAvailableChoices(chapterOne.ch1_p_control, noMemoryState).map((choice) => choice.id);
    expect(noMemoryChoices).toEqual(['accept_order']);

    const memoryState = playPath(['approach_dais', 'map_correction', 'delay_order', 'burn_warning']);
    const memoryChoices = getAvailableChoices(chapterOne.ch1_p_control, memoryState).map((choice) => choice.id);
    expect(memoryChoices).toContain('write_private_note');
  });
});
