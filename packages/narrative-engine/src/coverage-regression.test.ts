import { describe, expect, it } from 'vitest';
import { Compiler } from 'inkjs/compiler/Compiler';
import { initialTimelineState, type SceneGraph } from '@fractureline/shared-types';
import {
  applyEffects,
  conditionsPass,
  enterScene,
  evaluateCondition,
  getAvailableChoices,
  resolveChoice,
} from './index';
import { chooseInkChoice, continueInkStory, createInkStory, restoreInkStory } from './ink-adapter';

describe('narrative engine coverage regression', () => {
  it('evaluates compound conditions and available choices', () => {
    const state = {
      ...initialTimelineState,
      stability: 2,
      rebellion: 1,
      flags: { contactedZelda: true },
      seenScenes: ['start'],
    };

    expect(evaluateCondition({ type: 'eq', key: 'stability', value: 2 }, state)).toBe(true);
    expect(evaluateCondition({ type: 'neq', key: 'rebellion', value: 2 }, state)).toBe(true);
    expect(evaluateCondition({ type: 'gt', key: 'stability', value: 1 }, state)).toBe(true);
    expect(evaluateCondition({ type: 'gte', key: 'stability', value: 2 }, state)).toBe(true);
    expect(evaluateCondition({ type: 'lt', key: 'rebellion', value: 2 }, state)).toBe(true);
    expect(evaluateCondition({ type: 'lte', key: 'rebellion', value: 1 }, state)).toBe(true);
    expect(evaluateCondition({ type: 'flag', key: 'contactedZelda' }, state)).toBe(true);
    expect(evaluateCondition({ type: 'notFlag', key: 'openedNotebook' }, state)).toBe(true);
    expect(evaluateCondition({ type: 'seenScene', sceneId: 'start' }, state)).toBe(true);
    expect(
      conditionsPass(
        [
          { type: 'and', conditions: [{ type: 'eq', key: 'stability', value: 2 }, { type: 'flag', key: 'contactedZelda' }] },
          { type: 'or', conditions: [{ type: 'eq', key: 'rebellion', value: 0 }, { type: 'eq', key: 'rebellion', value: 1 }] },
        ],
        state,
      ),
    ).toBe(true);

    const graph: SceneGraph = {
      start: {
        id: 'start',
        chapter: 1,
        pov: 'past',
        text: ['start'],
        choices: [
          { id: 'open', label: 'Open', nextSceneId: 'next', conditions: [{ type: 'flag', key: 'contactedZelda' }] },
          { id: 'closed', label: 'Closed', nextSceneId: 'next', conditions: [{ type: 'flag', key: 'openedNotebook' }] },
        ],
      },
      next: { id: 'next', chapter: 1, pov: 'future', text: ['next'], choices: [] },
    };

    expect(getAvailableChoices(graph.start, state).map((choice) => choice.id)).toEqual(['open']);
  });

  it('applies effect variants and scene transitions', () => {
    const state = applyEffects(initialTimelineState, [
      { type: 'increment', key: 'stability', value: 1 },
      { type: 'decrement', key: 'stability', value: 1 },
      { type: 'setNumber', key: 'controlIndex', value: 3 },
      { type: 'setFlag', key: 'openedNotebook' },
      { type: 'appendCodex', entry: 'Old Bell' },
      { type: 'appendCodex', entry: 'Old Bell' },
      { type: 'switchPOV', pov: 'future' },
      { type: 'setChapter', chapter: 2 },
      { type: 'markSceneSeen', sceneId: 'ch1_test' },
      { type: 'setEnding', endingKey: 'history-path' },
      { type: 'unsetFlag', key: 'openedNotebook' },
    ]);

    expect(state.controlIndex).toBe(3);
    expect(state.currentPOV).toBe('future');
    expect(state.chapter).toBe(2);
    expect(state.endingKey).toBe('history-path');
    expect(state.codex).toEqual(['Old Bell']);
    expect(state.flags.openedNotebook).toBeUndefined();

    const entered = enterScene(
      {
        id: 'ch2_arrive',
        chapter: 2,
        pov: 'future',
        text: ['arrive'],
        choices: [],
        onEnterEffects: [{ type: 'setFlag', key: 'metAri' }],
      },
      initialTimelineState,
    );
    expect(entered.currentSceneId).toBe('ch2_arrive');
    expect(entered.flags.metAri).toBe(true);

    const graph: SceneGraph = {
      start: {
        id: 'start',
        chapter: 1,
        pov: 'past',
        text: ['start'],
        choices: [{ id: 'go', label: 'Go', nextSceneId: 'end', effects: [{ type: 'increment', key: 'rebellion', value: 1 }] }],
      },
      end: { id: 'end', chapter: 1, pov: 'future', text: ['end'], choices: [] },
    };
    expect(resolveChoice(graph, { ...initialTimelineState, currentSceneId: 'start' }, 'go').rebellion).toBe(1);
  });

  it('compiles, continues, and restores ink stories', () => {
    const source = `
VAR stability = 0
VAR currentSceneId = "open"
VAR currentPOV = "past"
VAR currentSpeaker = "Xav Reivax"
-> start

=== start ===
~ stability = stability + 1
Line one.
+ [Next]
    ~ currentSceneId = "end"
    -> end

=== end ===
~ currentPOV = "future"
~ currentSpeaker = "Zelda Adlez"
Done.
-> DONE
`;
    const compiledStory = new Compiler(source).Compile().ToJson() as unknown as Record<string, any>;
    const story = createInkStory(compiledStory);
    const first = continueInkStory(story);
    expect(first.text.join(' ')).toContain('Line one.');
    expect(first.choices).toHaveLength(1);

    const restored = restoreInkStory(compiledStory, first.stateJson);
    const second = chooseInkChoice(restored, 0);
    expect(second.variables.currentPOV).toBe('future');
    expect(second.variables.currentSpeaker).toBe('Zelda Adlez');
  });
});
