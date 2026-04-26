'use client';

import { create } from 'zustand';
import { initialTimelineState, type Choice, type POV, type TimelineState } from '@fractureline/shared-types';
import { chooseInkChoice, compileInkStory, continueInkStory, restoreInkStory, type InkStorySnapshot } from '@fractureline/narrative-engine';
import { chapterOnePack, loadChapterPackText } from '@/lib/chapter-packs/chapter-pack-cache';
import { indexedDbSaveService } from '@/lib/persistence/save-service';

type InkRuntimeStory = ReturnType<typeof compileInkStory>;

type GameStore = {
  state: TimelineState;
  speaker: string;
  sceneText: string[];
  choices: Choice[];
  hasSave: boolean;
  isPersistenceReady: boolean;
  isStoryReady: boolean;
  isChoosing: boolean;
  storyLoadError?: string;
  initializeStory: () => Promise<void>;
  choose: (choiceId: string) => Promise<void>;
  hydrateSaveStatus: () => Promise<void>;
  save: () => Promise<void>;
  load: () => Promise<boolean>;
  reset: () => Promise<void>;
};

let chapterOneSourcePromise: Promise<string | null> | null = null;
let activeStory: InkRuntimeStory | null = null;

function getChapterOneSource() {
  chapterOneSourcePromise ??= loadChapterPackText(chapterOnePack);
  return chapterOneSourcePromise;
}

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
  return snapshot.choices.map((choice, currentChoiceIndex) => ({
    id: String(currentChoiceIndex),
    label: choice.text,
    nextSceneId: String(currentChoiceIndex),
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

function createStoreView(snapshot: InkStorySnapshot, previous = initialTimelineState) {
  const state = snapshotToState(snapshot, previous);

  return {
    state,
    speaker: state.currentSpeaker ?? 'Mira Vale',
    sceneText: state.currentText ?? snapshot.text,
    choices: snapshotToChoices(snapshot),
  };
}

async function createInitialSnapshot() {
  const source = await getChapterOneSource();
  if (!source) return null;

  activeStory = compileInkStory(source);
  return continueInkStory(activeStory);
}

async function restoreStoryFromState(state: TimelineState) {
  const source = await getChapterOneSource();
  if (!source) return null;

  activeStory = state.inkStateJson
    ? restoreInkStory(compileInkStory(source), state.inkStateJson)
    : compileInkStory(source);

  return activeStory;
}

async function restoreSnapshotFromState(state: TimelineState) {
  const story = await restoreStoryFromState(state);
  if (!story) return null;
  return continueInkStory(story);
}

async function getActiveStoryForChoice(state: TimelineState) {
  if (activeStory && activeStory.currentChoices.length > 0) {
    return activeStory;
  }

  const restored = await restoreStoryFromState(state);
  if (!restored) return null;

  if (restored.currentChoices.length === 0 && restored.canContinue) {
    continueInkStory(restored);
  }

  return restored;
}

export const useGameStore = create<GameStore>((set, get) => ({
  state: initialTimelineState,
  speaker: initialTimelineState.currentSpeaker ?? 'Mira Vale',
  sceneText: [],
  choices: [],
  hasSave: false,
  isPersistenceReady: false,
  isStoryReady: false,
  isChoosing: false,
  storyLoadError: undefined,
  initializeStory: async () => {
    if (get().isStoryReady || get().isChoosing) return;

    set({ isChoosing: true, storyLoadError: undefined });
    const snapshot = await createInitialSnapshot();
    if (!snapshot) {
      set({
        isChoosing: false,
        isStoryReady: false,
        storyLoadError: 'Chapter 1 is not cached yet. Connect to the internet once to download this chapter for offline play.',
      });
      return;
    }

    set({ ...createStoreView(snapshot), isChoosing: false, isStoryReady: true, storyLoadError: undefined });
  },
  choose: async (choiceId) => {
    if (get().isChoosing) return;

    const current = get().state;
    const choiceIndex = Number(choiceId);
    if (!Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= get().choices.length) {
      set({ storyLoadError: 'That choice is no longer available. Try restarting the chapter.' });
      return;
    }

    set({ isChoosing: true, storyLoadError: undefined });

    try {
      const story = await getActiveStoryForChoice(current);
      if (!story) {
        set({ isChoosing: false, storyLoadError: 'Chapter 1 is not available offline yet. Connect to download it.' });
        return;
      }

      if (choiceIndex >= story.currentChoices.length) {
        set({
          isChoosing: false,
          storyLoadError: 'The story choice list changed before the choice could be applied. Restart the chapter or reload your save.',
        });
        return;
      }

      const snapshot = chooseInkChoice(story, choiceIndex);
      activeStory = story;
      set({ ...createStoreView(snapshot, current), isChoosing: false, storyLoadError: undefined });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Ink runtime error';
      set({ isChoosing: false, storyLoadError: `The choice could not be applied: ${message}` });
    }
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

    const snapshot = await restoreSnapshotFromState(saved);
    if (!snapshot) {
      set({
        hasSave: true,
        isPersistenceReady: true,
        storyLoadError: 'Your save exists, but Chapter 1 must be downloaded before it can be loaded on this device.',
      });
      return false;
    }

    set({ ...createStoreView(snapshot, saved), hasSave: true, isPersistenceReady: true, isStoryReady: true, storyLoadError: undefined });
    return true;
  },
  reset: async () => {
    const snapshot = await createInitialSnapshot();
    if (!snapshot) {
      set({
        state: initialTimelineState,
        sceneText: [],
        choices: [],
        hasSave: await indexedDbSaveService.hasSave(),
        isPersistenceReady: true,
        isStoryReady: false,
        storyLoadError: 'Chapter 1 is not cached yet. Connect to the internet once to download this chapter for offline play.',
      });
      return;
    }

    set({ ...createStoreView(snapshot), hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true, isStoryReady: true, storyLoadError: undefined });
  },
}));
