// @vitest-environment jsdom
import 'fake-indexeddb/auto';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { initialTimelineState } from '@fractureline/shared-types';
import type { InkStorySnapshot } from '@fractureline/narrative-engine';

// ── Mock dependencies before importing the store ──────────────────────────
const mockContinueInkStory = vi.fn();
const mockChooseInkChoice = vi.fn();
const mockCompileInkStory = vi.fn();
const mockRestoreInkStory = vi.fn();

vi.mock('@fractureline/narrative-engine', () => ({
  compileInkStory: (...args: unknown[]) => mockCompileInkStory(...args),
  continueInkStory: (...args: unknown[]) => mockContinueInkStory(...args),
  chooseInkChoice: (...args: unknown[]) => mockChooseInkChoice(...args),
  restoreInkStory: (...args: unknown[]) => mockRestoreInkStory(...args),
}));

const mockLoadChapterPackText = vi.fn();
const mockGetEligibleNextChapterPack = vi.fn();
const mockGetChapterPackForState = vi.fn();

vi.mock('@/lib/chapter-packs/chapter-pack-cache', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/chapter-packs/chapter-pack-cache')>();
  return {
    ...original,
    loadChapterPackText: (...args: unknown[]) => mockLoadChapterPackText(...args),
    getEligibleNextChapterPack: (...args: unknown[]) => mockGetEligibleNextChapterPack(...args),
    getChapterPackForState: (...args: unknown[]) => mockGetChapterPackForState(...args),
  };
});

const mockSaveServiceRead = vi.fn();
const mockSaveServiceWrite = vi.fn();
const mockSaveServiceHasSave = vi.fn();
const mockSaveServiceClear = vi.fn();

vi.mock('@/lib/persistence/save-service', () => ({
  indexedDbSaveService: {
    read: (...args: unknown[]) => mockSaveServiceRead(...args),
    write: (...args: unknown[]) => mockSaveServiceWrite(...args),
    hasSave: (...args: unknown[]) => mockSaveServiceHasSave(...args),
    clear: (...args: unknown[]) => mockSaveServiceClear(...args),
  },
}));

// ── Helpers ────────────────────────────────────────────────────────────────
function makeSnapshot(overrides: Partial<InkStorySnapshot> = {}): InkStorySnapshot {
  return {
    text: ['Scene text'],
    choices: [{ text: 'Choice A', tags: [] }],
    variables: {
      currentSceneId: 'scene-1',
      currentSpeaker: 'Xav Reivax',
      currentPOV: 'past',
      stability: 0,
      controlIndex: 0,
      rebellion: 0,
      memoryFracture: 0,
      magicEntropy: 0,
      endingKey: '',
      chapterOneComplete: false,
      chapterTwoComplete: false,
      chapterThreeComplete: false,
      chapterFourComplete: false,
      chapterFiveComplete: false,
      relayLegitimacyHigh: false,
      relayCompromised: false,
      ledgerTrustHigh: false,
      emergencyCustodyTriggered: false,
      trialCredibilityHigh: false,
      amnestyConflictTriggered: false,
    },
    stateJson: '{}',
    canContinue: false,
    ...overrides,
  };
}

function makeFakeStory(overrides: Record<string, unknown> = {}) {
  return {
    currentChoices: [{ text: 'Choice A', tags: [] }],
    canContinue: false,
    variablesState: {} as Record<string, unknown>,
    ...overrides,
  };
}

// ── Tests ──────────────────────────────────────────────────────────────────
describe('game-store', () => {
  let useGameStore: typeof import('@/store/game-store').useGameStore;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Default mock implementations
    const fakeStory = makeFakeStory();
    mockCompileInkStory.mockReturnValue(fakeStory);
    mockContinueInkStory.mockReturnValue(makeSnapshot());
    mockChooseInkChoice.mockReturnValue(makeSnapshot());
    mockRestoreInkStory.mockReturnValue(fakeStory);
    mockLoadChapterPackText.mockResolvedValue(':: ink source ::');
    mockGetEligibleNextChapterPack.mockReturnValue(null);
    mockGetChapterPackForState.mockReturnValue(null);
    mockSaveServiceHasSave.mockResolvedValue(false);
    mockSaveServiceRead.mockResolvedValue(null);
    mockSaveServiceWrite.mockResolvedValue(undefined);
    mockSaveServiceClear.mockResolvedValue(undefined);

    // Reset module between tests to get a fresh store
    vi.resetModules();
    const mod = await import('@/store/game-store');
    useGameStore = mod.useGameStore;
    // Reset store state
    useGameStore.setState({
      state: initialTimelineState,
      speaker: initialTimelineState.currentSpeaker ?? 'Xav Reivax',
      sceneText: [],
      choices: [],
      hasSave: false,
      isPersistenceReady: false,
      isStoryReady: false,
      isChoosing: false,
      storyLoadError: undefined,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ── hydrateSaveStatus ────────────────────────────────────────────────────
  describe('hydrateSaveStatus', () => {
    it('sets hasSave and isPersistenceReady from IndexedDB', async () => {
      mockSaveServiceHasSave.mockResolvedValue(true);
      await useGameStore.getState().hydrateSaveStatus();
      const { hasSave, isPersistenceReady } = useGameStore.getState();
      expect(hasSave).toBe(true);
      expect(isPersistenceReady).toBe(true);
    });

    it('sets hasSave=false when no save exists', async () => {
      mockSaveServiceHasSave.mockResolvedValue(false);
      await useGameStore.getState().hydrateSaveStatus();
      expect(useGameStore.getState().hasSave).toBe(false);
      expect(useGameStore.getState().isPersistenceReady).toBe(true);
    });
  });

  // ── initializeStory ───────────────────────────────────────────────────────
  describe('initializeStory', () => {
    it('loads chapter 1 and marks story ready', async () => {
      await useGameStore.getState().initializeStory();
      const state = useGameStore.getState();
      expect(state.isStoryReady).toBe(true);
      expect(state.isChoosing).toBe(false);
      expect(state.sceneText).toEqual(['Scene text']);
    });

    it('sets storyLoadError when chapter text is unavailable', async () => {
      mockLoadChapterPackText.mockResolvedValue(null);
      await useGameStore.getState().initializeStory();
      const state = useGameStore.getState();
      expect(state.isStoryReady).toBe(false);
      expect(state.storyLoadError).toBeTruthy();
    });

    it('is a no-op when story is already ready', async () => {
      useGameStore.setState({ isStoryReady: true });
      await useGameStore.getState().initializeStory();
      expect(mockLoadChapterPackText).not.toHaveBeenCalled();
    });

    it('is a no-op when isChoosing is true', async () => {
      useGameStore.setState({ isChoosing: true });
      await useGameStore.getState().initializeStory();
      expect(mockLoadChapterPackText).not.toHaveBeenCalled();
    });
  });

  // ── choose ────────────────────────────────────────────────────────────────
  describe('choose', () => {
    beforeEach(async () => {
      // Set up a ready story with one choice
      await useGameStore.getState().initializeStory();
    });

    it('applies a valid choice and advances the story', async () => {
      const nextSnapshot = makeSnapshot({ text: ['Next scene.'], variables: { ...makeSnapshot().variables, currentSceneId: 'scene-2' } });
      mockChooseInkChoice.mockReturnValue(nextSnapshot);

      await useGameStore.getState().choose('0');
      const state = useGameStore.getState();
      expect(state.isChoosing).toBe(false);
      expect(state.sceneText).toEqual(['Next scene.']);
    });

    it('ignores duplicate choose calls while isChoosing', async () => {
      useGameStore.setState({ isChoosing: true });
      await useGameStore.getState().choose('0');
      expect(mockChooseInkChoice).not.toHaveBeenCalled();
    });

    it('sets storyLoadError for out-of-range choiceId', async () => {
      await useGameStore.getState().choose('99');
      expect(useGameStore.getState().storyLoadError).toBeTruthy();
    });

    it('sets storyLoadError for non-integer choiceId', async () => {
      await useGameStore.getState().choose('abc');
      expect(useGameStore.getState().storyLoadError).toBeTruthy();
    });

    it('handles choose when story source is unavailable', async () => {
      mockLoadChapterPackText.mockResolvedValue(null);
      // Reset active story to null by resetting module
      vi.resetModules();
      const mod = await import('@/store/game-store');
      useGameStore = mod.useGameStore;

      await useGameStore.getState().choose('0');
      // choices is empty after module reset, so the bounds check fires
      expect(useGameStore.getState().storyLoadError).toContain('no longer available');
      expect(useGameStore.getState().isChoosing).toBe(false);
    });

    it('sets storyLoadError when getActiveStoryForChoice returns null (offline)', async () => {
      // Reset modules so activeStory is null
      vi.resetModules();
      const mod = await import('@/store/game-store');
      useGameStore = mod.useGameStore;

      // Set a choice so the bounds check passes
      useGameStore.setState({
        choices: [{ id: '0', label: 'test', nextSceneId: '0' }],
      });

      // Make source unavailable → getActiveStoryForChoice returns null
      mockLoadChapterPackText.mockResolvedValue(null);

      await useGameStore.getState().choose('0');
      expect(useGameStore.getState().storyLoadError).toContain('not available offline');
      expect(useGameStore.getState().isChoosing).toBe(false);
    });

    it('sets storyLoadError when chooseInkChoice throws', async () => {
      mockChooseInkChoice.mockImplementation(() => { throw new Error('ink crash'); });
      await useGameStore.getState().choose('0');
      expect(useGameStore.getState().storyLoadError).toContain('could not be applied');
      expect(useGameStore.getState().isChoosing).toBe(false);
    });

    it('sets storyLoadError when choice index is beyond story choices', async () => {
      // Story has 1 choice (index 0), but we try index 5
      const fakeStory = makeFakeStory({ currentChoices: [{ text: 'Only choice', tags: [] }] });
      mockCompileInkStory.mockReturnValue(fakeStory);
      mockRestoreInkStory.mockReturnValue(fakeStory);

      // Force activeStory to null so it restores
      vi.resetModules();
      const mod = await import('@/store/game-store');
      useGameStore = mod.useGameStore;
      useGameStore.setState({
        ...useGameStore.getState(),
        choices: [
          { id: '0', label: 'A', nextSceneId: '0' },
          { id: '1', label: 'B', nextSceneId: '1' },
          { id: '2', label: 'C', nextSceneId: '2' },
          { id: '3', label: 'D', nextSceneId: '3' },
          { id: '4', label: 'E', nextSceneId: '4' },
          { id: '5', label: 'F', nextSceneId: '5' },
        ],
        isStoryReady: true,
      });
      await useGameStore.getState().choose('5');
      expect(useGameStore.getState().storyLoadError).toBeTruthy();
    });
  });

  // ── continueToNextChapter ─────────────────────────────────────────────────
  describe('continueToNextChapter', () => {
    it('sets storyLoadError when no next pack is available', async () => {
      mockGetEligibleNextChapterPack.mockReturnValue(null);
      await useGameStore.getState().continueToNextChapter();
      expect(useGameStore.getState().storyLoadError).toBeTruthy();
    });

    it('loads the next chapter pack and advances', async () => {
      const ch2Pack = { id: 'chapter-2-signal', chapter: 2, route: '/ch2.ink', estimatedMinutes: 22 };
      mockGetEligibleNextChapterPack.mockReturnValue(ch2Pack);
      const ch2Snapshot = makeSnapshot({ text: ['Chapter 2 text.'] });
      mockContinueInkStory.mockReturnValue(ch2Snapshot);

      await useGameStore.getState().continueToNextChapter();
      const state = useGameStore.getState();
      expect(state.isStoryReady).toBe(true);
      expect(state.sceneText).toEqual(['Chapter 2 text.']);
    });

    it('sets storyLoadError when chapter pack text is unavailable', async () => {
      const ch2Pack = { id: 'chapter-2-signal', chapter: 2, route: '/ch2.ink', estimatedMinutes: 22 };
      mockGetEligibleNextChapterPack.mockReturnValue(ch2Pack);
      mockLoadChapterPackText.mockResolvedValue(null);

      await useGameStore.getState().continueToNextChapter();
      expect(useGameStore.getState().storyLoadError).toBeTruthy();
    });

    it('is a no-op when isChoosing is true', async () => {
      useGameStore.setState({ isChoosing: true });
      await useGameStore.getState().continueToNextChapter();
      expect(mockLoadChapterPackText).not.toHaveBeenCalled();
    });
  });

  // ── save ──────────────────────────────────────────────────────────────────
  describe('save', () => {
    it('writes state and sets hasSave=true', async () => {
      await useGameStore.getState().save();
      expect(mockSaveServiceWrite).toHaveBeenCalledWith(useGameStore.getState().state);
      expect(useGameStore.getState().hasSave).toBe(true);
    });
  });

  // ── load ──────────────────────────────────────────────────────────────────
  describe('load', () => {
    it('returns false when no save exists', async () => {
      mockSaveServiceRead.mockResolvedValue(null);
      mockSaveServiceHasSave.mockResolvedValue(false);
      const result = await useGameStore.getState().load();
      expect(result).toBe(false);
    });

    it('restores saved state from IndexedDB', async () => {
      const savedState = { ...initialTimelineState, chapter: 1, currentSceneId: 'scene-saved', inkStateJson: '{}' };
      mockSaveServiceRead.mockResolvedValue(savedState);
      mockGetChapterPackForState.mockReturnValue({ id: 'chapter-1', chapter: 1, route: '/ch1.ink', estimatedMinutes: 10 });
      const restoredSnapshot = makeSnapshot({ text: ['Restored scene.'] });
      mockContinueInkStory.mockReturnValue(restoredSnapshot);

      const result = await useGameStore.getState().load();
      expect(result).toBe(true);
      expect(useGameStore.getState().isStoryReady).toBe(true);
    });

    it('sets storyLoadError when chapter pack is unavailable for restore', async () => {
      const savedState = { ...initialTimelineState, chapter: 2, inkStateJson: '{}' };
      mockSaveServiceRead.mockResolvedValue(savedState);
      mockGetChapterPackForState.mockReturnValue({ id: 'chapter-2-signal', chapter: 2, route: '/ch2.ink', estimatedMinutes: 22 });
      mockLoadChapterPackText.mockResolvedValue(null);

      const result = await useGameStore.getState().load();
      expect(result).toBe(false);
      expect(useGameStore.getState().storyLoadError).toBeTruthy();
    });

    it('handles load errors gracefully', async () => {
      mockSaveServiceRead.mockRejectedValue(new Error('DB error'));
      const result = await useGameStore.getState().load();
      expect(result).toBe(false);
      expect(useGameStore.getState().storyLoadError).toBeTruthy();
    });

    it('restores state without inkStateJson', async () => {
      const savedState = { ...initialTimelineState, chapter: 1, inkStateJson: undefined };
      mockSaveServiceRead.mockResolvedValue(savedState);
      mockGetChapterPackForState.mockReturnValue({ id: 'chapter-1', chapter: 1, route: '/ch1.ink', estimatedMinutes: 10 });
      const restoredSnapshot = makeSnapshot({ text: ['Fresh restore.'] });
      mockContinueInkStory.mockReturnValue(restoredSnapshot);

      const result = await useGameStore.getState().load();
      expect(result).toBe(true);
    });
  });

  // ── reset ─────────────────────────────────────────────────────────────────
  describe('reset', () => {
    it('resets to chapter 1', async () => {
      mockSaveServiceHasSave.mockResolvedValue(false);
      await useGameStore.getState().reset();
      const state = useGameStore.getState();
      expect(state.isStoryReady).toBe(true);
      expect(state.sceneText).toEqual(['Scene text']);
    });

    it('sets storyLoadError when chapter 1 is unavailable', async () => {
      mockLoadChapterPackText.mockResolvedValue(null);
      mockSaveServiceHasSave.mockResolvedValue(false);
      await useGameStore.getState().reset();
      expect(useGameStore.getState().storyLoadError).toBeTruthy();
      expect(useGameStore.getState().isStoryReady).toBe(false);
    });
  });

  // ── snapshotToState / state parsing ──────────────────────────────────────
  describe('state variable parsing', () => {
    it('correctly parses chapterOneComplete flag', async () => {
      const snapshot = makeSnapshot({
        variables: {
          ...makeSnapshot().variables,
          chapterOneComplete: true,
        },
      });
      mockContinueInkStory.mockReturnValue(snapshot);
      await useGameStore.getState().initializeStory();
      expect(useGameStore.getState().state.flags['chapter-one-complete']).toBe(true);
    });

    it('preserves endingKey from snapshot variables', async () => {
      const snapshot = makeSnapshot({
        variables: {
          ...makeSnapshot().variables,
          endingKey: 'signal-path',
        },
      });
      mockContinueInkStory.mockReturnValue(snapshot);
      await useGameStore.getState().initializeStory();
      expect(useGameStore.getState().state.endingKey).toBe('signal-path');
    });

    it('handles empty endingKey string', async () => {
      const snapshot = makeSnapshot({
        variables: { ...makeSnapshot().variables, endingKey: '' },
      });
      mockContinueInkStory.mockReturnValue(snapshot);
      await useGameStore.getState().initializeStory();
      // Empty string endingKey should not overwrite
      expect(useGameStore.getState().state.endingKey).toBeUndefined();
    });

    it('handles future pov', async () => {
      const snapshot = makeSnapshot({
        variables: { ...makeSnapshot().variables, currentPOV: 'future' },
      });
      mockContinueInkStory.mockReturnValue(snapshot);
      await useGameStore.getState().initializeStory();
      expect(useGameStore.getState().state.currentPOV).toBe('future');
    });

    it('accumulates seenScenes', async () => {
      const snapshot = makeSnapshot({
        variables: { ...makeSnapshot().variables, currentSceneId: 'scene-1' },
      });
      mockContinueInkStory.mockReturnValue(snapshot);
      await useGameStore.getState().initializeStory();
      expect(useGameStore.getState().state.seenScenes).toContain('scene-1');
    });
  });
});
