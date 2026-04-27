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
import { chooseInkChoice, compileInkStory, continueInkStory, createInkStory, restoreInkStory, snapshotInkStory, type CompiledInkJson } from './ink-adapter';

const MINIMAL_INK_SOURCE = `
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

  it('compiles, continues, and restores ink stories via createInkStory', () => {
    const compiledJson = JSON.parse(new Compiler(MINIMAL_INK_SOURCE).Compile().ToJson() as string) as CompiledInkJson;
    const story = createInkStory(compiledJson);
    const first = continueInkStory(story);
    expect(first.text.join(' ')).toContain('Line one.');
    expect(first.choices).toHaveLength(1);

    const freshStory = createInkStory(compiledJson);
    const restored = restoreInkStory(freshStory, first.stateJson);
    const second = chooseInkChoice(restored, 0);
    expect(second.variables.currentPOV).toBe('future');
    expect(second.variables.currentSpeaker).toBe('Zelda Adlez');
  });

  it('compileInkStory produces a story that can be continued', () => {
    const story = compileInkStory(MINIMAL_INK_SOURCE);
    const snapshot = continueInkStory(story);
    expect(snapshot.text.join(' ')).toContain('Line one.');
    expect(snapshot.choices).toHaveLength(1);
  });

  it('createInkStory throws when passed an object without inkVersion', () => {
    expect(() => createInkStory({} as CompiledInkJson)).toThrow(
      'createInkStory requires a compiled ink JSON object with an inkVersion field.',
    );
  });

  it('createInkStory applies initial variable overrides', () => {
    const compiledJson = JSON.parse(new Compiler(MINIMAL_INK_SOURCE).Compile().ToJson() as string) as CompiledInkJson;
    const story = createInkStory(compiledJson, { stability: 7 });
    const snapshot = continueInkStory(story);
    // stability starts at 7, then +1 in the ink story → 8
    expect(snapshot.variables.stability).toBe(8);
  });

  it('snapshotInkStory preserves caller-supplied text lines', () => {
    const story = compileInkStory(MINIMAL_INK_SOURCE);
    story.Continue();
    const snapshot = snapshotInkStory(story, ['pre-captured line']);
    expect(snapshot.text).toContain('pre-captured line');
  });

  it('snapshotInkStory handles null currentTags and null choice tags', () => {
    const mockStory = {
      currentTags: null,
      currentChoices: [
        { index: 0, text: 'Choice A', tags: null },
        { index: 1, text: 'Choice B', tags: ['tag1'] },
      ],
      variablesState: {},
      state: { ToJson: () => '{}' },
    };

    const snapshot = snapshotInkStory(mockStory as never, ['line']);
    expect(snapshot.tags).toEqual([]);
    expect(snapshot.choices[0].tags).toEqual([]);
    expect(snapshot.choices[1].tags).toEqual(['tag1']);
  });

  it('continueInkStory treats null return from Continue() as empty and skips it', () => {
    let canContinue = true;
    const mockStory = {
      get canContinue() {
        return canContinue;
      },
      Continue: () => {
        canContinue = false;
        return null as unknown as string;
      },
      currentTags: [],
      currentChoices: [],
      variablesState: {},
      state: { ToJson: () => '{}' },
    };

    const snapshot = continueInkStory(mockStory as never);
    expect(snapshot.text).toEqual([]);
  });
});
