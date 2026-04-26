'use client';

import { create } from 'zustand';
import { initialTimelineState, type Choice, type POV, type TimelineState } from '@fractureline/shared-types';
import { chooseInkChoice, compileInkStory, continueInkStory, restoreInkStory, type InkStorySnapshot } from '@fractureline/narrative-engine';
import { chapterOneInkSource } from '@/content/chapter-one-ink';
import { indexedDbSaveService } from '@/lib/persistence/save-service';

type GameStore = {
  state: TimelineState;
  speaker: string;
  sceneText: string[];
  choices: Choice[];
  hasSave: boolean;
  isPersistenceReady: boolean;
  choose: (choiceId: string) => void;
  hydrateSaveStatus: () => Promise<void>;
  save: () => Promise<void>;
  load: () => Promise<boolean>;
  reset: () => Promise<void>;
};

const initialInkSnapshot = continueInkStory(compileInkStory(chapterOneInkSource));

function toNumber(value: unknown) {
  return typeof value === 'number' ? value : 0;
}

function toStringValue(value: unknown) {
  return typeof value === 'string' ? value : undefined;
}

function toBoolean(value: unknown) {
  return value === true;
}

function toPOV(value: unknown): POV {
  return value === 'dissenter' ? 'dissenter' : 'protector';
}

function snapshotToChoices(snapshot: InkStorySnapshot): Choice[] {
  return snapshot.choices.map((choice) => ({
    id: String(choice.index),
    label: choice.text,
    nextSceneId: String(choice.index),
    tags: choice.tags,
  }));
}

function snapshotToState(snapshot: InkStorySnapshot, previous: TimelineState = initialTimelineState): TimelineState {
  const currentSceneId = toStringValue(snapshot.variables.currentSceneId) ?? previous.currentSceneId;
  const endingKey = toStringValue(snapshot.variables.endingKey);
  const seenScenes = previous.seenScenes.includes(currentSceneId)
    ? previous.seenScenes
    : [...previous.seenScenes, currentSceneId];

  return {
    ...previous,
    stability: toNumber(snapshot.variables.stability),
    controlIndex: toNumber(snapshot.variables.controlIndex),
    rebellion: toNumber(snapshot.variables.rebellion),
    memoryFracture: toNumber(snapshot.variables.memoryFracture),
    magicEntropy: toNumber(snapshot.variables.magicEntropy),
    chapter: 1,
    currentSceneId,
    currentPOV: toPOV(snapshot.variables.currentPOV),
    currentSpeaker: toStringValue(snapshot.variables.currentSpeaker) ?? previous.currentSpeaker ?? 'Mira Vale',
    currentText: snapshot.text.length ? snapshot.text : previous.currentText,
    flags: {
      ...previous.flags,
      'chapter-one-complete': toBoolean(snapshot.variables.chapterOneComplete),
    },
    seenScenes,
    endingKey: endingKey && endingKey.length > 0 ? endingKey : previous.endingKey,
    inkStateJson: snapshot.stateJson,
  };
}

function createInitialState() {
  return snapshotToState(initialInkSnapshot, initialTimelineState);
}

function createStoreView(snapshot: InkStorySnapshot, previous = initialTimelineState) {
  const state = snapshotToState(snapshot, previous);

  return {
    state,
    speaker: state.currentSpeaker ?? 'Mira Vale',
    sceneText: state.currentText ?? snapshot.text,
    choices: snapshotToChoices(snapshot),
  };
}

function restoreSnapshotFromState(state: TimelineState) {
  if (!state.inkStateJson) return initialInkSnapshot;
  return continueInkStory(restoreInkStory(compileInkStory(chapterOneInkSource), state.inkStateJson));
}

export const useGameStore = create<GameStore>((set, get) => {
  const initialView = createStoreView(initialInkSnapshot);

  return {
    ...initialView,
    hasSave: false,
    isPersistenceReady: false,
    choose: (choiceId) => {
      const current = get().state;
      const story = current.inkStateJson
        ? restoreInkStory(compileInkStory(chapterOneInkSource), current.inkStateJson)
        : compileInkStory(chapterOneInkSource);
      const snapshot = chooseInkChoice(story, Number(choiceId));
      set(createStoreView(snapshot, current));
    },
    hydrateSaveStatus: async () => {
      set({ hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true });
    },
    save: async () => {
      await indexedDbSaveService.write(get().state);
      set({ hasSave: true, isPersistenceReady: true });
    },
    load: async () => {
      const saved = await indexedDbSaveService.read();
      if (!saved) {
        set({ hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true });
        return false;
      }

      const snapshot = restoreSnapshotFromState(saved);
      set({ ...createStoreView(snapshot, saved), hasSave: true, isPersistenceReady: true });
      return true;
    },
    reset: async () => {
      set({ ...createStoreView(initialInkSnapshot, createInitialState()), hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true });
    },
  };
});
