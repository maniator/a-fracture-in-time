'use client';

import { create } from 'zustand';
import { initialTimelineState, type Choice, type POV, type TimelineState } from '@fractureline/shared-types';
import { chooseInkChoice, compileInkStory, continueInkStory, restoreInkStory, type InkStorySnapshot } from '@fractureline/narrative-engine';
import {
  chapterOnePack,
  getChapterPackForState,
  getEligibleNextChapterPack,
  loadChapterPackText,
  type ChapterPackManifestItem,
} from '@/lib/chapter-packs/chapter-pack-cache';
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
  continueToNextChapter: () => Promise<void>;
  hydrateSaveStatus: () => Promise<void>;
  save: () => Promise<void>;
  load: () => Promise<boolean>;
  reset: () => Promise<void>;
  clearStoryLoadError: () => void;
};

let activeChapterPack: ChapterPackManifestItem = chapterOnePack;
let activeStorySourcePromise: Promise<string | null> | null = null;
let activeStory: InkRuntimeStory | null = null;

function setActiveChapterPack(pack: ChapterPackManifestItem) {
  activeChapterPack = pack;
  activeStorySourcePromise = null;
  activeStory = null;
}

function getActiveStorySource() {
  activeStorySourcePromise ??= loadChapterPackText(activeChapterPack);
  return activeStorySourcePromise;
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
  return value === 'future' ? 'future' : 'past';
}

function snapshotToChoices(snapshot: InkStorySnapshot): Choice[] {
  return snapshot.choices.map((choice, currentChoiceIndex) => ({
    id: String(currentChoiceIndex),
    label: choice.text,
    nextSceneId: String(currentChoiceIndex),
    tags: choice.tags,
  }));
}

function applyTimelineVariables(story: InkRuntimeStory, state: TimelineState) {
  story.variablesState.stability = state.stability;
  story.variablesState.controlIndex = state.controlIndex;
  story.variablesState.rebellion = state.rebellion;
  story.variablesState.memoryFracture = state.memoryFracture;
  story.variablesState.magicEntropy = state.magicEntropy;
  if (state.endingKey) story.variablesState.endingKey = state.endingKey;
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
    chapter: activeChapterPack.chapter,
    currentSceneId,
    currentPOV: toPOV(snapshot.variables.currentPOV),
    chapterPackId: activeChapterPack.id,
    currentSpeaker: toStringValue(snapshot.variables.currentSpeaker) ?? previous.currentSpeaker ?? 'Xav Reivax',
    currentText: snapshot.text.length ? snapshot.text : previous.currentText,
    flags: {
      ...previous.flags,
      'chapter-one-complete': previous.flags['chapter-one-complete'] || toBoolean(snapshot.variables.chapterOneComplete),
      'chapter-two-complete': previous.flags['chapter-two-complete'] || toBoolean(snapshot.variables.chapterTwoComplete),
      'chapter-three-complete': previous.flags['chapter-three-complete'] || toBoolean(snapshot.variables.chapterThreeComplete),
      'chapter-four-complete': previous.flags['chapter-four-complete'] || toBoolean(snapshot.variables.chapterFourComplete),
      'chapter-five-complete': previous.flags['chapter-five-complete'] || toBoolean(snapshot.variables.chapterFiveComplete),
      'relay-legitimacy-high': previous.flags['relay-legitimacy-high'] || toBoolean(snapshot.variables.relayLegitimacyHigh),
      'relay-compromised': previous.flags['relay-compromised'] || toBoolean(snapshot.variables.relayCompromised),
      'ledger-trust-high': previous.flags['ledger-trust-high'] || toBoolean(snapshot.variables.ledgerTrustHigh),
      'emergency-custody-triggered':
        previous.flags['emergency-custody-triggered'] || toBoolean(snapshot.variables.emergencyCustodyTriggered),
      'trial-credibility-high': previous.flags['trial-credibility-high'] || toBoolean(snapshot.variables.trialCredibilityHigh),
      'amnesty-conflict-triggered':
        previous.flags['amnesty-conflict-triggered'] || toBoolean(snapshot.variables.amnestyConflictTriggered),
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
    speaker: state.currentSpeaker ?? 'Xav Reivax',
    sceneText: state.currentText ?? snapshot.text,
    choices: snapshotToChoices(snapshot),
  };
}

async function createInitialSnapshot() {
  setActiveChapterPack(chapterOnePack);
  const source = await getActiveStorySource();
  if (!source) return null;

  activeStory = compileInkStory(source);
  return continueInkStory(activeStory);
}

async function createChapterSnapshot(pack: ChapterPackManifestItem, previous: TimelineState) {
  setActiveChapterPack(pack);
  const source = await getActiveStorySource();
  if (!source) return null;

  activeStory = compileInkStory(source);
  applyTimelineVariables(activeStory, previous);
  return continueInkStory(activeStory);
}

async function restoreStoryFromState(state: TimelineState) {
  const source = await getActiveStorySource();
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
    // Advance the ink pointer to reach choices. The snapshot text is intentionally
    // discarded here: intermediate paragraphs between a save point and the next
    // choice are not displayed on restore. See F-26 in POST_PR16_QA_REVIEW.md.
    continueInkStory(restored);
  }

  return restored;
}

export const useGameStore = create<GameStore>((set, get) => ({
  state: initialTimelineState,
  speaker: initialTimelineState.currentSpeaker ?? 'Xav Reivax',
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
        storyLoadError: 'Chapter 1 is not available yet. Connect to the internet once to download it for offline play.',
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
        set({ isChoosing: false, storyLoadError: `Chapter ${current.chapter} is not available offline yet. Connect to download it.` });
        return;
      }

      if (choiceIndex >= story.currentChoices.length) {
        set({
          isChoosing: false,
          storyLoadError: 'The story changed before that choice could be applied. Restart the chapter or reload your save.',
        });
        return;
      }

      const snapshot = chooseInkChoice(story, choiceIndex);
      activeStory = story;
      set({ ...createStoreView(snapshot, current), isChoosing: false, storyLoadError: undefined });
    } catch {
      set({ isChoosing: false, storyLoadError: 'That choice could not be applied. Please try again.' });
    }
  },
  continueToNextChapter: async () => {
    if (get().isChoosing) return;

    const current = get().state;
    const pack = getEligibleNextChapterPack(current);
    if (!pack) {
      set({ storyLoadError: 'The next chapter is not available for this route yet.' });
      return;
    }

    set({ isChoosing: true, storyLoadError: undefined });
    const snapshot = await createChapterSnapshot(pack, current);
    if (!snapshot) {
      set({
        isChoosing: false,
        storyLoadError: `Chapter ${pack.chapter} is not available offline yet. Connect to the internet once to download it.`,
      });
      return;
    }

    // inkStateJson is intentionally cleared from `previous` when starting a new
    // chapter so that the next chapter begins from its own opening knot rather than
    // restoring a stale ink state from the prior chapter. See F-29 in POST_PR16_QA_REVIEW.md.
    set({ ...createStoreView(snapshot, { ...current, inkStateJson: undefined }), isChoosing: false, isStoryReady: true, storyLoadError: undefined });
  },
  hydrateSaveStatus: async () => {
    set({ hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true });
  },
  save: async () => {
    await indexedDbSaveService.write(get().state);
    set({ hasSave: true, isPersistenceReady: true });
  },
  load: async () => {
    try {
      const saved = await indexedDbSaveService.read();
      if (!saved) {
        set({ hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true });
        return false;
      }

      setActiveChapterPack(getChapterPackForState(saved) ?? chapterOnePack);
      const snapshot = await restoreSnapshotFromState(saved);
      if (!snapshot) {
        set({
          hasSave: true,
          isPersistenceReady: true,
          storyLoadError: `Your save exists, but Chapter ${saved.chapter} must be downloaded before it can be loaded on this device.`,
        });
        return false;
      }

      set({ ...createStoreView(snapshot, saved), hasSave: true, isPersistenceReady: true, isStoryReady: true, storyLoadError: undefined });
      return true;
    } catch (err) {
      console.error('[game-store] load() failed:', err);
      set({ storyLoadError: 'Could not load save. Please try again.', isPersistenceReady: true });
      return false;
    }
  },
  reset: async () => {
    if (get().isChoosing) return;

    set({ isChoosing: true, storyLoadError: undefined });
    try {
      const snapshot = await createInitialSnapshot();
      if (!snapshot) {
        set({
          isChoosing: false,
          state: initialTimelineState,
          sceneText: [],
          choices: [],
          hasSave: await indexedDbSaveService.hasSave(),
          isPersistenceReady: true,
          isStoryReady: false,
          storyLoadError: 'Chapter 1 is not available yet. Connect to the internet once to download it for offline play.',
        });
        return;
      }

      set({ ...createStoreView(snapshot), isChoosing: false, hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true, isStoryReady: true, storyLoadError: undefined });
    } catch (err) {
      console.error('[game-store] reset() failed:', err);
      set({ isChoosing: false, storyLoadError: 'Could not restart. Please try again.' });
    }
  },
  clearStoryLoadError: () => set({ storyLoadError: undefined }),
}));
