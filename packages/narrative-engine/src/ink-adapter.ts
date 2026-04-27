import { Compiler } from 'inkjs/compiler/Compiler';
import { Story } from 'inkjs/engine/Story';

type InkVariableValue = string | number | boolean;

export type InkChoiceView = {
  index: number;
  text: string;
  tags: string[];
};

export type InkStorySnapshot = {
  text: string[];
  tags: string[];
  choices: InkChoiceView[];
  variables: Record<string, unknown>;
  stateJson: string;
};

export type InkVariableMap = Record<string, InkVariableValue>;

const FRACTURELINE_VARIABLE_KEYS = [
  'stability',
  'controlIndex',
  'rebellion',
  'memoryFracture',
  'magicEntropy',
  'currentSceneId',
  'currentPOV',
  'currentSpeaker',
  'endingKey',
  'chapterOneComplete',
  'chapterTwoComplete',
  'chapterThreeComplete',
  'chapterFourComplete',
  'chapterFiveComplete',
  'relayLegitimacyHigh',
  'relayCompromised',
  'ledgerTrustHigh',
  'emergencyCustodyTriggered',
  'trialCredibilityHigh',
  'amnestyConflictTriggered',
] as const;

export function compileInkStory(source: string): Story {
  return new Compiler(source).Compile();
}

export function createInkStory(compiledJson: Record<string, unknown>, variables: InkVariableMap = {}) {
  const story = new Story(compiledJson as Record<string, any>);

  for (const [key, value] of Object.entries(variables)) {
    story.variablesState[key] = value;
  }

  return story;
}

export function continueInkStory(story: Story): InkStorySnapshot {
  const text: string[] = [];

  while (story.canContinue) {
    const continued = story.Continue();
    const nextLine = typeof continued === 'string' ? continued.trim() : '';

    if (nextLine.length > 0) {
      text.push(nextLine);
    }
  }

  return snapshotInkStory(story, text);
}

export function chooseInkChoice(story: Story, choiceIndex: number): InkStorySnapshot {
  story.ChooseChoiceIndex(choiceIndex);
  return continueInkStory(story);
}

export function restoreInkStory(story: Story, stateJson: string): Story {
  story.state.LoadJson(stateJson);
  return story;
}

export function snapshotInkStory(story: Story, text: string[] = []): InkStorySnapshot {
  return {
    text,
    tags: story.currentTags ?? [],
    choices: story.currentChoices.map((choice) => ({
      index: choice.index,
      text: choice.text,
      tags: choice.tags ?? [],
    })),
    variables: Object.fromEntries(FRACTURELINE_VARIABLE_KEYS.map((key) => [key, story.variablesState[key]])),
    stateJson: story.state.ToJson(),
  };
}
