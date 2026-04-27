import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chooseInkChoice, compileInkStory, continueInkStory } from '@fractureline/narrative-engine';

const chapterOneInkSource = readFileSync(
  join(process.cwd(), 'public/chapter-packs/chapter-1.ink'),
  'utf8',
);

function advanceByChoiceLabels(labels: string[]) {
  const story = compileInkStory(chapterOneInkSource);
  let snapshot = continueInkStory(story);

  for (const label of labels) {
    const index = snapshot.choices.findIndex((choice) => choice.text === label);
    expect(index, `Missing choice "${label}". Available: ${snapshot.choices.map((choice) => choice.text).join(' | ')}`).toBeGreaterThanOrEqual(0);
    snapshot = chooseInkChoice(story, index);
  }

  return snapshot;
}

describe('Chapter 1 ink pack', () => {
  it('starts in the expected opening scene and speaker', () => {
    const story = compileInkStory(chapterOneInkSource);
    const snapshot = continueInkStory(story);

    expect(snapshot.variables.currentSceneId).toBe('ch1_xav_quad');
    expect(snapshot.variables.currentPOV).toBe('past');
    expect(snapshot.variables.currentSpeaker).toBe('Xav Reivax');
    expect(snapshot.choices.length).toBe(2);
    expect(snapshot.text.join(' ')).toContain('Ari');
    expect(snapshot.text.join(' ')).toContain('firstborn notebook');
  });

  it('can complete the Signal Path ending', () => {
    const snapshot = advanceByChoiceLabels([
      'Admit the com broke again',
      'Study the official history with Yve',
      'Answer the impossible voice',
      'Start carefully and ask what Xav knows about Diderram',
      'Ask Zelda what the family line means',
      'Go home for the family notebook immediately',
      'Tell Ari the truth and ask her not to touch it',
      'End Chapter 1',
    ]);

    expect(snapshot.variables.chapterOneComplete).toBe(true);
    expect(snapshot.variables.endingKey).toBe('signal-path');
    expect(snapshot.variables.currentSceneId).toBe('ch1_complete_signal');
    expect(snapshot.choices.length).toBe(0);
  });

  it('can complete the Family Path ending', () => {
    const snapshot = advanceByChoiceLabels([
      'Joke that Cybol technology clearly fears you',
      'Tell Yve exactly what appeared on the screen',
      'Answer Zelda before the signal dies',
      'Tell Xav the truth: Cybol falls',
      'Ask what event starts the fall',
      'Open the notebook before Ari can reach it',
      'End Chapter 1',
    ]);

    expect(snapshot.variables.chapterOneComplete).toBe(true);
    expect(snapshot.variables.endingKey).toBe('family-path');
    expect(snapshot.variables.currentSceneId).toBe('ch1_complete_family');
    expect(snapshot.choices.length).toBe(0);
  });
});
