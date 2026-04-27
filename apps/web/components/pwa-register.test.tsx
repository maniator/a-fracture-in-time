// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { PwaRegister } from './pwa-register';

const mockMessageSkipWaiting = vi.fn();
const mockRegister = vi.fn().mockResolvedValue(undefined);
const mockWorkboxAddEventListener = vi.fn();

vi.mock('workbox-window', () => ({
  Workbox: vi.fn().mockImplementation(() => ({
    addEventListener: mockWorkboxAddEventListener,
    register: mockRegister,
    messageSkipWaiting: mockMessageSkipWaiting,
  })),
}));

vi.mock('@mui/material/Alert', () => ({
  default: ({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) => (
    <div role="alert">
      {children}
      {action}
    </div>
  ),
}));
vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));
vi.mock('@mui/material/Snackbar', () => ({
  default: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid="snackbar">{children}</div> : null,
}));

describe('PwaRegister', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRegister.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders no snackbar initially (no update pending)', () => {
    render(<PwaRegister />);
    expect(screen.queryByTestId('snackbar')).toBeNull();
  });

  it('does not register service worker when not in production', () => {
    // NODE_ENV is 'test' so the production guard should stop registration
    render(<PwaRegister />);
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('renders the snackbar when waitingWorker state is set (production simulation)', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    // Patch navigator to have serviceWorker
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {},
      configurable: true,
      writable: true,
    });

    let waitingCb: (() => void) | undefined;
    mockWorkboxAddEventListener.mockImplementation((event: string, cb: () => void) => {
      if (event === 'waiting') waitingCb = cb;
    });

    await act(async () => {
      render(<PwaRegister />);
    });

    await act(async () => {
      waitingCb?.();
    });

    expect(screen.getByTestId('snackbar')).toBeDefined();
    expect(screen.getByText('A new Fractureline version is ready.')).toBeDefined();
  });

  it('calls messageSkipWaiting and hides snackbar when Refresh is clicked', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    Object.defineProperty(navigator, 'serviceWorker', {
      value: {},
      configurable: true,
      writable: true,
    });

    let waitingCb: (() => void) | undefined;
    mockWorkboxAddEventListener.mockImplementation((event: string, cb: () => void) => {
      if (event === 'waiting') waitingCb = cb;
    });

    await act(async () => {
      render(<PwaRegister />);
    });

    await act(async () => {
      waitingCb?.();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Refresh'));
    });

    expect(mockMessageSkipWaiting).toHaveBeenCalled();
    expect(screen.queryByTestId('snackbar')).toBeNull();
  });

  it('handles activateUpdate when no waitingWorker', () => {
    // Without production env, Snackbar is closed; clicking nothing should not throw
    render(<PwaRegister />);
    expect(screen.queryByText('Refresh')).toBeNull();
  });
});
