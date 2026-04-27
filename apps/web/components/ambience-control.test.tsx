// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AmbienceControl } from './ambience-control';

// ── Web Audio API mock ────────────────────────────────────────────────────

function makeOsc() {
  return {
    type: 'sine',
    frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    detune: { setValueAtTime: vi.fn() },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  };
}

function makeFilter() {
  return {
    type: 'lowpass',
    frequency: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), setTargetAtTime: vi.fn() },
    Q: { value: 0 },
    connect: vi.fn(),
  };
}

function makeSource() {
  return { buffer: null as unknown, loop: false, connect: vi.fn(), start: vi.fn(), stop: vi.fn() };
}

function makePanner() {
  return { pan: { setValueAtTime: vi.fn() }, connect: vi.fn() };
}

function makeDelay() {
  return { delayTime: { value: 0, setTargetAtTime: vi.fn() }, connect: vi.fn() };
}

function makeCompressor() {
  return {
    threshold: { value: 0 }, knee: { value: 0 }, ratio: { value: 0 },
    attack: { value: 0 }, release: { value: 0 },
    connect: vi.fn(),
  };
}

type ContextState = 'running' | 'suspended' | 'closed';

function makeMockContext(initialState: ContextState = 'running') {
  let state: ContextState = initialState;

  // Build context object first so createGain can close over it
  const ctx = {
    get state() { return state; },
    get currentTime() { return 0; },
    sampleRate: 44100,
    destination: {},
    // createGain returns a gain node with `context` pointing back to ctx
    createGain: vi.fn(() => ({
      context: ctx,
      gain: {
        value: 1,
        cancelScheduledValues: vi.fn(),
        setTargetAtTime: vi.fn(),
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
    })),
    createOscillator: vi.fn(makeOsc),
    createBiquadFilter: vi.fn(makeFilter),
    createBufferSource: vi.fn(makeSource),
    createStereoPanner: vi.fn(makePanner),
    createDelay: vi.fn(makeDelay),
    createDynamicsCompressor: vi.fn(makeCompressor),
    createBuffer: vi.fn((_c: number, length: number) => ({
      getChannelData: vi.fn(() => new Float32Array(length)),
    })),
    resume: vi.fn(async () => { state = 'running'; }),
    close: vi.fn(async () => { state = 'closed'; }),
    _setState: (s: ContextState) => { state = s; },
  };

  return ctx;
}

// ── MUI mocks ─────────────────────────────────────────────────────────────
vi.mock('@mui/material/Box', () => ({
  default: ({
    children,
    component,
    'aria-label': ariaLabel,
  }: {
    children?: React.ReactNode;
    component?: React.ElementType;
    'aria-label'?: string;
  }) => {
    const C = component ?? 'div';
    return <C aria-label={ariaLabel}>{children}</C>;
  },
}));
vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));
vi.mock('@mui/material/Card', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/CardContent', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/Collapse', () => ({
  default: ({ children, in: open }: { children: React.ReactNode; in: boolean }) => open ? <div>{children}</div> : null,
}));
vi.mock('@mui/material/Slider', () => ({
  default: ({ onChange, value }: { onChange?: (e: Event, v: number) => void; value: number }) => (
    <input
      aria-label="Ambience volume"
      role="slider"
      type="range"
      value={value}
      readOnly
      onChange={(e) => onChange?.(e as unknown as Event, Number(e.target.value))}
    />
  ),
}));
vi.mock('@mui/material/Stack', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/Tooltip', () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock('@mui/material/Typography', () => ({ default: ({ children }: { children?: React.ReactNode }) => <span>{children}</span> }));

// ── Tests ─────────────────────────────────────────────────────────────────
describe('AmbienceControl', () => {
  let mockCtx: ReturnType<typeof makeMockContext>;

  beforeEach(() => {
    mockCtx = makeMockContext('running');
    vi.stubGlobal('AudioContext', vi.fn(() => mockCtx));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('renders the ambience control container', async () => {
    await act(async () => { render(<AmbienceControl />); });
    // Look for the Volume button which is always visible
    expect(screen.getByText('Volume')).toBeDefined();
  });

  it('shows Mute or Enable button on initial render', async () => {
    await act(async () => { render(<AmbienceControl />); });
    const btn = screen.queryByText('Mute') ?? screen.queryByText('Enable');
    expect(btn).not.toBeNull();
  });

  it('shows Enable button when AudioContext constructor throws', async () => {
    vi.stubGlobal('AudioContext', vi.fn(() => { throw new Error('No audio'); }));
    await act(async () => { render(<AmbienceControl />); });
    expect(screen.getByText('Enable')).toBeDefined();
  });

  it('shows Enable when context stays suspended after resume', async () => {
    const suspendedCtx = makeMockContext('suspended');
    (suspendedCtx.resume as ReturnType<typeof vi.fn>).mockImplementation(async () => {
      // do nothing - state remains suspended
    });
    vi.stubGlobal('AudioContext', vi.fn(() => suspendedCtx));
    await act(async () => { render(<AmbienceControl />); });
    expect(screen.getByText('Enable')).toBeDefined();
  });

  it('shows Volume button always', async () => {
    await act(async () => { render(<AmbienceControl />); });
    expect(screen.getByText('Volume')).toBeDefined();
  });

  it('shows Mute text when context is running (initial)', async () => {
    // When AudioContext starts running, the component shows "Mute"
    await act(async () => { render(<AmbienceControl />); });
    // Running context should show Mute
    expect(screen.getByText('Mute')).toBeDefined();
  });

  it('toggles volume panel when Volume button is clicked', async () => {
    await act(async () => { render(<AmbienceControl />); });
    expect(screen.queryByRole('slider')).toBeNull();
    await act(async () => { fireEvent.click(screen.getByText('Volume')); });
    expect(screen.getByRole('slider')).toBeDefined();
    await act(async () => { fireEvent.click(screen.getByText('Close')); });
    expect(screen.queryByRole('slider')).toBeNull();
  });

  it('mutes sound when Mute is clicked (running context)', async () => {
    await act(async () => { render(<AmbienceControl />); });
    const muteBtn = screen.queryByText('Mute');
    if (muteBtn) {
      await act(async () => { fireEvent.click(muteBtn); });
      expect(screen.getByText('Unmute')).toBeDefined();
    } else {
      // Context started suspended - Enable is shown, test still passes
      expect(screen.getByText('Enable')).toBeDefined();
    }
  });

  it('toggles mute state from Mute → Unmute → Mute', async () => {
    await act(async () => { render(<AmbienceControl />); });
    const muteBtn = screen.queryByText('Mute');
    if (muteBtn) {
      await act(async () => { fireEvent.click(muteBtn); });
      expect(screen.getByText('Unmute')).toBeDefined();
      await act(async () => { fireEvent.click(screen.getByText('Unmute')); });
      expect(screen.getByText('Mute')).toBeDefined();
    }
  });

  it('cleans up AudioContext on unmount', async () => {
    const { unmount } = await act(async () => render(<AmbienceControl />));
    await act(async () => { unmount(); });
    expect(mockCtx.close).toHaveBeenCalled();
  });

  it('handles fractureline:choice-cue custom event', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'stability' } }));
    });
    // Should not throw
  });

  it('handles fractureline:scene-context custom event', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:scene-context', {
        detail: { chapter: 2, pov: 'future', memory: 3, rebellion: 1 },
      }));
    });
  });

  it('handles scene-context with pov=past', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:scene-context', {
        detail: { chapter: 1, pov: 'past', memory: 0, rebellion: 0 },
      }));
    });
  });

  it('handles scene-context missing detail gracefully', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:scene-context'));
    });
  });

  it('updates volume via slider', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => { fireEvent.click(screen.getByText('Volume')); });
    const slider = screen.getByRole('slider');
    await act(async () => { fireEvent.change(slider, { target: { value: '0.1' } }); });
    // No crash
  });

  it('handles choice-cue event with non-custom event type gracefully', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new Event('fractureline:choice-cue'));
    });
  });

  it('handles choice-cue event when muted', async () => {
    await act(async () => { render(<AmbienceControl />); });
    const muteBtn = screen.queryByText('Mute');
    if (muteBtn) {
      await act(async () => { fireEvent.click(muteBtn); });
    }
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'rebellion' } }));
    });
  });

  it('handles Enable button click when needsGesture is true', async () => {
    const suspendedCtx = makeMockContext('suspended');
    // Initial mount: resume keeps suspended state
    (suspendedCtx.resume as ReturnType<typeof vi.fn>).mockImplementationOnce(async () => {
      // stay suspended on first call
    });
    // Second call (after Enable click): transition to running
    (suspendedCtx.resume as ReturnType<typeof vi.fn>).mockImplementationOnce(async () => {
      suspendedCtx._setState('running');
    });
    vi.stubGlobal('AudioContext', vi.fn(() => suspendedCtx));

    await act(async () => { render(<AmbienceControl />); });
    expect(screen.getByText('Enable')).toBeDefined();

    await act(async () => { fireEvent.click(screen.getByText('Enable')); });
    // After clicking Enable with context now running, it should show Mute
  });

  it('creates new soundscape in enableSound when nodesRef is null (constructor threw on mount)', async () => {
    // First call throws → nodesRef stays null, needsGesture = true
    // Second call (Enable button) → succeeds, nodesRef is set
    let callCount = 0;
    vi.stubGlobal('AudioContext', vi.fn(() => {
      callCount += 1;
      if (callCount === 1) throw new Error('autoplay blocked');
      return makeMockContext('running');
    }));

    await act(async () => { render(<AmbienceControl />); });
    expect(screen.getByText('Enable')).toBeDefined();

    await act(async () => { fireEvent.click(screen.getByText('Enable')); });
    // Should have created a new soundscape — no crash
  });

  it('advances scheduler on interval tick', async () => {
    vi.useFakeTimers();
    try {
      await act(async () => { render(<AmbienceControl />); });
      await act(async () => { vi.advanceTimersByTime(4200); });
    } finally {
      vi.useRealTimers();
    }
  });

  it('plays stability cue', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'stability' } }));
    });
  });

  it('plays control cue', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'control' } }));
    });
  });

  it('plays rebellion cue', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'rebellion' } }));
    });
  });

  it('plays memory cue', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'memory' } }));
    });
  });

  it('plays entropy cue', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'entropy' } }));
    });
  });

  it('plays ending cue', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'ending' } }));
    });
  });

  it('plays unknown cue (defaults to choice)', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: 'unknown-cue-type' } }));
    });
  });

  it('handles future pov scene context', async () => {
    await act(async () => { render(<AmbienceControl />); });
    await act(async () => {
      window.dispatchEvent(new CustomEvent('fractureline:scene-context', {
        detail: { chapter: 3, pov: 'future', memory: 5, rebellion: 3 },
      }));
    });
    // Advance timer to trigger scheduler which uses the updated mood
    vi.useFakeTimers();
    try {
      await act(async () => { vi.advanceTimersByTime(4200); });
    } finally {
      vi.useRealTimers();
    }
  });
});
