// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameBriefing } from './game-briefing';

vi.mock('@mui/material/Box', () => ({ default: ({ children }: { children?: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));
vi.mock('@mui/material/Card', () => ({ default: ({ children }: { children: React.ReactNode }) => <section>{children}</section> }));
vi.mock('@mui/material/CardContent', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/Chip', () => ({ default: ({ label }: { label: string }) => <span>{label}</span> }));
vi.mock('@mui/material/Divider', () => ({ default: () => <hr /> }));
vi.mock('@mui/material/Stack', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/Typography', () => ({
  default: ({ children, component }: { children: React.ReactNode; component?: React.ElementType }) => {
    const C = component ?? 'p';
    return <C>{children}</C>;
  },
}));

describe('GameBriefing', () => {
  beforeEach(() => { localStorage.clear(); });
  it('renders the briefing card by default', () => {
    render(<GameBriefing />);
    expect(screen.getByText('You are entering Ayker.')).toBeDefined();
  });

  it('renders the "Before you start" chip', () => {
    render(<GameBriefing />);
    expect(screen.getByText('Before you start')).toBeDefined();
  });

  it('renders "Enter the first fracture" button', () => {
    render(<GameBriefing />);
    expect(screen.getByText('Enter the first fracture')).toBeDefined();
  });

  it('dismisses the card when the button is clicked', () => {
    render(<GameBriefing />);
    fireEvent.click(screen.getByText('Enter the first fracture'));
    expect(screen.queryByText('You are entering Ayker.')).toBeNull();
  });

  it('renders three character names', () => {
    render(<GameBriefing />);
    expect(screen.getAllByText('Xav Reivax').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Yve Ettevy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Zelda Adlez').length).toBeGreaterThan(0);
  });

  it('renders role labels for characters', () => {
    render(<GameBriefing />);
    expect(screen.getByText('Student, University of Brinkton — 874cy')).toBeDefined();
    expect(screen.getByText("Xav's classmate and collaborator — 874cy")).toBeDefined();
    expect(screen.getByText('Survivor, ruins of old Brinkton — 23ac')).toBeDefined();
  });

  it('renders "How to read your choices" section', () => {
    render(<GameBriefing />);
    expect(screen.getByText('How to read your choices')).toBeDefined();
  });

  it('renders initials XR, YE, ZA', () => {
    render(<GameBriefing />);
    expect(screen.getByText('XR')).toBeDefined();
    expect(screen.getByText('YE')).toBeDefined();
    expect(screen.getByText('ZA')).toBeDefined();
  });
});
