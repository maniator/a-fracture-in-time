import { Compiler } from 'inkjs/compiler/Compiler';
import { Story } from 'inkjs/engine/Story';

type CompiledInkStory = ConstructorParameters<typeof Story>[0];
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
] as const;

export function compileInkStory(source: string): Story {
  return new Compiler(source).Compile();
}

export function createInkStory(compiledStory: CompiledInkStory, variables: InkVariableMap = {}) {
  const story = new Story(compiledStory);

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

export function restoreInkStory(compiledStory: CompiledInkStory, stateJson: string): Story {
  const story = new Story(compiledStory);
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
