// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SceneRenderer } from './scene-renderer';
import { initialTimelineState } from '@fractureline/shared-types';
import type { TimelineState } from '@fractureline/shared-types';

// ── Module mocks ──────────────────────────────────────────────────────────
const mockIsChapterComplete = vi.fn().mockReturnValue(false);
const mockGetEligibleNextChapterPack = vi.fn().mockReturnValue(null);
const mockGetTimelineSignals = vi.fn().mockReturnValue([
  { key: 'order', label: 'Order', value: 0, level: 'Quiet', description: 'Order desc' },
  { key: 'truth', label: 'Truth', value: 0, level: 'Quiet', description: 'Truth desc' },
  { key: 'disruption', label: 'Disruption', value: 0, level: 'Quiet', description: 'Disruption desc' },
]);

vi.mock('@/lib/chapter-packs/chapter-pack-cache', () => ({
  getEligibleNextChapterPack: (...args: unknown[]) => mockGetEligibleNextChapterPack(...args),
}));

vi.mock('@/lib/chapter-completion', () => ({
  isChapterComplete: (...args: unknown[]) => mockIsChapterComplete(...args),
}));

vi.mock('@/lib/timeline-signals', () => ({
  getTimelineSignals: (...args: unknown[]) => mockGetTimelineSignals(...args),
}));

// ── Store mock ────────────────────────────────────────────────────────────
let storeState: Record<string, unknown> = {};

vi.mock('@/store/game-store', () => ({
  useGameStore: () => storeState,
}));

// ── MUI mocks ─────────────────────────────────────────────────────────────
vi.mock('@mui/material/Alert', () => ({
  default: ({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) => (
    <div role="alert">{children}{action}</div>
  ),
}));
vi.mock('@mui/material/Box', () => ({
  default: ({ children, component }: { children?: React.ReactNode; component?: React.ElementType }) => {
    const C = component ?? 'div';
    return <C>{children}</C>;
  },
}));
vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
    <button onClick={onClick} disabled={disabled}>{children}</button>
  ),
}));
vi.mock('@mui/material/Card', () => ({
  default: ({ children, component }: { children: React.ReactNode; component?: React.ElementType }) => {
    const C = component ?? 'div';
    return <C>{children}</C>;
  },
}));
vi.mock('@mui/material/CardContent', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/Chip', () => ({ default: ({ label }: { label: string }) => <span>{label}</span> }));
vi.mock('@mui/material/CircularProgress', () => ({ default: () => <div role="progressbar" /> }));
vi.mock('@mui/material/Divider', () => ({ default: () => <hr /> }));
vi.mock('@mui/material/Grid', () => ({
  default: ({ children, component }: { children?: React.ReactNode; component?: React.ElementType }) => {
    const C = component ?? 'div';
    return <C>{children}</C>;
  },
}));
vi.mock('@mui/material/Stack', () => ({
  default: ({ children, component }: { children?: React.ReactNode; component?: React.ElementType }) => {
    const C = component ?? 'div';
    return <C>{children}</C>;
  },
}));
vi.mock('@mui/material/Typography', () => ({
  default: ({ children, component }: { children?: React.ReactNode; component?: React.ElementType }) => {
    const C = component ?? 'p';
    return <C>{children}</C>;
  },
}));
vi.mock('@mui/material/Dialog', () => ({
  default: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div role="dialog">{children}</div> : null,
}));
vi.mock('@mui/material/DialogActions', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/DialogContent', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/DialogContentText', () => ({ default: ({ children }: { children: React.ReactNode }) => <p>{children}</p> }));
vi.mock('@mui/material/DialogTitle', () => ({ default: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2> }));

// ── Helpers ───────────────────────────────────────────────────────────────
function makeStore(overrides: Partial<Record<string, unknown>> = {}) {
  storeState = {
    state: { ...initialTimelineState } as TimelineState,
    speaker: 'Xav Reivax',
    sceneText: [],
    choices: [],
    choose: vi.fn().mockResolvedValue(undefined),
    continueToNextChapter: vi.fn().mockResolvedValue(undefined),
    hydrateSaveStatus: vi.fn().mockResolvedValue(undefined),
    initializeStory: vi.fn().mockResolvedValue(undefined),
    save: vi.fn().mockResolvedValue(undefined),
    load: vi.fn().mockResolvedValue(false),
    reset: vi.fn().mockResolvedValue(undefined),
    hasSave: false,
    isPersistenceReady: false,
    isStoryReady: false,
    isChoosing: false,
    storyLoadError: undefined,
    ...overrides,
  };
}

describe('SceneRenderer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsChapterComplete.mockReturnValue(false);
    mockGetEligibleNextChapterPack.mockReturnValue(null);
    makeStore();
  });

  it('shows loading state when story is not ready', async () => {
    makeStore({ isStoryReady: false, sceneText: [] });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByRole('progressbar')).toBeDefined();
  });

  it('shows chapter number in loading state', async () => {
    makeStore({ isStoryReady: false, sceneText: [], state: { ...initialTimelineState, chapter: 1 } });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Loading Chapter 1')).toBeDefined();
  });

  it('shows error alert when storyLoadError is set', async () => {
    makeStore({ storyLoadError: 'Chapter not available' });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Chapter not available')).toBeDefined();
  });

  it('calls initializeStory on "Try again" button click in error state', async () => {
    const initializeStory = vi.fn().mockResolvedValue(undefined);
    makeStore({ storyLoadError: 'Error loading', initializeStory });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Try again')); });
    expect(initializeStory).toHaveBeenCalled();
  });

  it('renders scene text when story is ready', async () => {
    makeStore({
      isStoryReady: true,
      sceneText: ['Once upon a time in Ayker.'],
      state: { ...initialTimelineState, currentPOV: 'past' },
    });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Once upon a time in Ayker.')).toBeDefined();
  });

  it('renders multiple paragraphs of scene text', async () => {
    makeStore({
      isStoryReady: true,
      sceneText: ['Paragraph one.', 'Paragraph two.'],
    });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Paragraph one.')).toBeDefined();
    expect(screen.getByText('Paragraph two.')).toBeDefined();
  });

  it('renders speaker as heading', async () => {
    makeStore({ isStoryReady: true, sceneText: ['Scene.'], speaker: 'Zelda Adlez' });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Zelda Adlez')).toBeDefined();
  });

  it('renders choices list', async () => {
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [
        { id: '0', label: 'Choice A', nextSceneId: '1' },
        { id: '1', label: 'Choice B', nextSceneId: '2' },
      ],
    });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Choice A')).toBeDefined();
    expect(screen.getByText('Choice B')).toBeDefined();
  });

  it('calls choose when a choice button is clicked', async () => {
    const choose = vi.fn().mockResolvedValue(undefined);
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [{ id: '0', label: 'My choice', nextSceneId: '1' }],
      choose,
    });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('My choice')); });
    expect(choose).toHaveBeenCalledWith('0');
  });

  it('dispatches fractureline:choice-cue event when choice clicked', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [{ id: '0', label: 'A choice', nextSceneId: '1', effects: [{ type: 'increment', key: 'stability', amount: 1 }] }],
    });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('A choice')); });
    const cueCalls = dispatchSpy.mock.calls.filter(
      (c) => c[0] instanceof CustomEvent && (c[0] as CustomEvent).type === 'fractureline:choice-cue',
    );
    expect(cueCalls.length).toBeGreaterThan(0);
  });

  it('calls save when Save progress is clicked', async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    makeStore({ isStoryReady: true, sceneText: ['Scene.'], save });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Save progress')); });
    expect(save).toHaveBeenCalled();
  });

  it('calls load when Load progress is clicked (save available)', async () => {
    const load = vi.fn().mockResolvedValue(true);
    makeStore({ isStoryReady: true, sceneText: ['Scene.'], load, hasSave: true, isPersistenceReady: true });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Load progress')); });
    expect(load).toHaveBeenCalled();
  });

  it('calls reset when Restart chapter is clicked', async () => {
    const reset = vi.fn().mockResolvedValue(undefined);
    makeStore({ isStoryReady: true, sceneText: ['Scene.'], reset });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Restart chapter')); });
    await act(async () => { fireEvent.click(screen.getByText('Restart')); });
    expect(reset).toHaveBeenCalled();
  });

  it('renders Timeline Signals section', async () => {
    makeStore({ isStoryReady: true, sceneText: ['Scene.'] });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Timeline Signals')).toBeDefined();
  });

  it('renders signal cards (Order, Truth, Disruption)', async () => {
    makeStore({ isStoryReady: true, sceneText: ['Scene.'] });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Order')).toBeDefined();
    expect(screen.getByText('Truth')).toBeDefined();
    expect(screen.getByText('Disruption')).toBeDefined();
  });

  it('shows chapter-complete alert when chapter is finished', async () => {
    mockIsChapterComplete.mockReturnValue(true);
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, chapter: 1 },
    });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText(/Chapter 1 complete/)).toBeDefined();
  });

  it('shows continue button when next pack available', async () => {
    mockIsChapterComplete.mockReturnValue(true);
    mockGetEligibleNextChapterPack.mockReturnValue({ id: 'chapter-2-signal', chapter: 2, route: '/ch2.ink' });
    const continueToNextChapter = vi.fn().mockResolvedValue(undefined);
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, chapter: 1 },
      continueToNextChapter,
    });
    await act(async () => { render(<SceneRenderer />); });
    const btn = screen.getByText(/Continue to Chapter 2/);
    expect(btn).toBeDefined();
    await act(async () => { fireEvent.click(btn); });
    expect(continueToNextChapter).toHaveBeenCalled();
  });

  it('shows Replay button when chapter complete but no next pack', async () => {
    mockIsChapterComplete.mockReturnValue(true);
    mockGetEligibleNextChapterPack.mockReturnValue(null);
    const reset = vi.fn().mockResolvedValue(undefined);
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, chapter: 1 },
      reset,
    });
    await act(async () => { render(<SceneRenderer />); });
    const replay = screen.getByText('Replay');
    expect(replay).toBeDefined();
    await act(async () => { fireEvent.click(replay); });
    await act(async () => { fireEvent.click(screen.getByText('Restart')); });
    expect(reset).toHaveBeenCalled();
  });

  it('shows codex entries', async () => {
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, codex: ['Cybol History', 'Diderram Records'] },
    });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Cybol History')).toBeDefined();
    expect(screen.getByText('Diderram Records')).toBeDefined();
  });

  it('shows endingKey chip', async () => {
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, endingKey: 'signal-path' },
    });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Signal Path')).toBeDefined();
  });

  it('shows "Applying choice" chip when isChoosing', async () => {
    makeStore({ isStoryReady: true, sceneText: ['Scene.'], isChoosing: true });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Applying choice')).toBeDefined();
  });

  it('shows "Local save ready" when persistence is ready and save exists', async () => {
    makeStore({ isStoryReady: true, sceneText: ['Scene.'], isPersistenceReady: true, hasSave: true });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Local save ready')).toBeDefined();
  });

  it('shows "No save" chip when persistence is ready but no save', async () => {
    makeStore({ isStoryReady: true, sceneText: ['Scene.'], isPersistenceReady: true, hasSave: false });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('No save')).toBeDefined();
  });

  it('shows no save status chip when persistence is not ready', async () => {
    makeStore({ isStoryReady: true, sceneText: ['Scene.'], isPersistenceReady: false });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.queryByText('Local save ready')).toBeNull();
    expect(screen.queryByText('No save')).toBeNull();
  });

  it('shows Past chip for past POV', async () => {
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, currentPOV: 'past' },
    });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Past')).toBeDefined();
  });

  it('shows Future chip for future POV', async () => {
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, currentPOV: 'future' },
    });
    await act(async () => { render(<SceneRenderer />); });
    expect(screen.getByText('Future')).toBeDefined();
  });

  it('calls hydrateSaveStatus and initializeStory on mount', async () => {
    const hydrateSaveStatus = vi.fn().mockResolvedValue(undefined);
    const initializeStory = vi.fn().mockResolvedValue(undefined);
    makeStore({ hydrateSaveStatus, initializeStory });
    await act(async () => { render(<SceneRenderer />); });
    expect(hydrateSaveStatus).toHaveBeenCalled();
    expect(initializeStory).toHaveBeenCalled();
  });

  it('dispatches scene-context event on state changes', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, chapter: 2, currentPOV: 'future', memoryFracture: 3, rebellion: 2 },
    });
    await act(async () => { render(<SceneRenderer />); });
    const contextCalls = dispatchSpy.mock.calls.filter(
      (c) => c[0] instanceof CustomEvent && (c[0] as CustomEvent).type === 'fractureline:scene-context',
    );
    expect(contextCalls.length).toBeGreaterThan(0);
  });

  it('shows chapter title in continue button when available', async () => {
    mockIsChapterComplete.mockReturnValue(true);
    mockGetEligibleNextChapterPack.mockReturnValue({ id: 'chapter-2-signal', chapter: 2, route: '/ch2.ink' });
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, chapter: 1 },
    });
    await act(async () => { render(<SceneRenderer />); });
    // Chapter title for chapter-2-signal should appear
    expect(screen.getByText(/The Stable Signal/)).toBeDefined();
  });

  it('dispatches cue event with ending cue for choice with setEnding effect', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [{ id: '0', label: 'End it', nextSceneId: '1', effects: [{ type: 'setEnding', key: 'signal-path' }] }],
    });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('End it')); });
    const cueCalls = dispatchSpy.mock.calls.filter(
      (c) => c[0] instanceof CustomEvent && (c[0] as CustomEvent).type === 'fractureline:choice-cue',
    );
    const cueDetail = (cueCalls[0]?.[0] as CustomEvent | undefined)?.detail;
    expect(cueDetail?.cue).toBe('ending');
  });

  it('dispatches cue for choice with cue: tag', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [{ id: '0', label: 'Tag choice', nextSceneId: '1', tags: ['cue:rebellion'] }],
    });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Tag choice')); });
    const cueCalls = dispatchSpy.mock.calls.filter(
      (c) => c[0] instanceof CustomEvent && (c[0] as CustomEvent).type === 'fractureline:choice-cue',
    );
    const cueDetail = (cueCalls[0]?.[0] as CustomEvent | undefined)?.detail;
    expect(cueDetail?.cue).toBe('rebellion');
  });

  it('shows chapter number without title when pack id is unknown', async () => {
    mockIsChapterComplete.mockReturnValue(true);
    mockGetEligibleNextChapterPack.mockReturnValue({ id: 'unknown-pack-id', chapter: 99, route: '/unknown.ink' });
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      state: { ...initialTimelineState, chapter: 1 },
    });
    await act(async () => { render(<SceneRenderer />); });
    // nextChapterTitle is undefined → falls back to '.'
    expect(screen.getByText(/Continue to Chapter 99/)).toBeDefined();
  });

  it('dispatches cue for choice with decrement effect', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [{ id: '0', label: 'Dec choice', nextSceneId: '1', effects: [{ type: 'decrement', key: 'stability', amount: 1 }] }],
    });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Dec choice')); });
    const cueCalls = dispatchSpy.mock.calls.filter(
      (c) => c[0] instanceof CustomEvent && (c[0] as CustomEvent).type === 'fractureline:choice-cue',
    );
    const cueDetail = (cueCalls[0]?.[0] as CustomEvent | undefined)?.detail;
    expect(cueDetail?.cue).toBe('stability');
  });

  it('dispatches cue for choice with setNumber effect on timeline variable', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [{ id: '0', label: 'Set choice', nextSceneId: '1', effects: [{ type: 'setNumber', key: 'rebellion', value: 5 }] }],
    });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Set choice')); });
    const cueCalls = dispatchSpy.mock.calls.filter(
      (c) => c[0] instanceof CustomEvent && (c[0] as CustomEvent).type === 'fractureline:choice-cue',
    );
    const cueDetail = (cueCalls[0]?.[0] as CustomEvent | undefined)?.detail;
    expect(cueDetail?.cue).toBe('rebellion');
  });

  it('dispatches default cue for effect with non-timeline variable key', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [{ id: '0', label: 'Custom key', nextSceneId: '1', effects: [{ type: 'increment', key: 'someCustomKey', amount: 1 }] }],
    });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Custom key')); });
    const cueCalls = dispatchSpy.mock.calls.filter(
      (c) => c[0] instanceof CustomEvent && (c[0] as CustomEvent).type === 'fractureline:choice-cue',
    );
    const cueDetail = (cueCalls[0]?.[0] as CustomEvent | undefined)?.detail;
    expect(cueDetail?.cue).toBe('choice');
  });

  it('dispatches default cue for choice with no special effects', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    makeStore({
      isStoryReady: true,
      sceneText: ['Scene.'],
      choices: [{ id: '0', label: 'Plain choice', nextSceneId: '1' }],
    });
    await act(async () => { render(<SceneRenderer />); });
    await act(async () => { fireEvent.click(screen.getByText('Plain choice')); });
    const cueCalls = dispatchSpy.mock.calls.filter(
      (c) => c[0] instanceof CustomEvent && (c[0] as CustomEvent).type === 'fractureline:choice-cue',
    );
    const cueDetail = (cueCalls[0]?.[0] as CustomEvent | undefined)?.detail;
    expect(cueDetail?.cue).toBe('choice');
  });
});
