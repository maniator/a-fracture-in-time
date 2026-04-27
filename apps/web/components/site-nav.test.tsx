// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteNav } from './site-nav';

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@mui/material/AppBar', () => ({ default: ({ children }: { children: React.ReactNode }) => <header>{children}</header> }));
vi.mock('@mui/material/Box', () => ({ default: ({ children }: { children?: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/Button', () => ({
  default: ({
    children,
    component,
    href,
  }: {
    children: React.ReactNode;
    component?: React.ElementType;
    href?: string;
  }) => {
    const C = component ?? 'button';
    return <C href={href}>{children}</C>;
  },
}));
vi.mock('@mui/material/Container', () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock('@mui/material/Toolbar', () => ({ default: ({ children }: { children: React.ReactNode }) => <nav>{children}</nav> }));
vi.mock('@mui/material/Typography', () => ({
  default: ({
    children,
    component,
    href,
  }: {
    children: React.ReactNode;
    component?: React.ElementType;
    href?: string;
  }) => {
    const C = component ?? 'span';
    return <C href={href}>{children}</C>;
  },
}));

describe('SiteNav', () => {
  it('renders the Fractureline brand link', () => {
    render(<SiteNav />);
    expect(screen.getByText('Fractureline')).toBeDefined();
  });

  it('renders Play navigation link', () => {
    render(<SiteNav />);
    expect(screen.getByText('Play')).toBeDefined();
  });

  it('renders Help navigation link', () => {
    render(<SiteNav />);
    expect(screen.getByText('Help')).toBeDefined();
  });

  it('Play link points to /play', () => {
    render(<SiteNav />);
    const link = screen.getByText('Play').closest('a');
    expect(link?.getAttribute('href')).toBe('/play');
  });

  it('Help link points to /help', () => {
    render(<SiteNav />);
    const link = screen.getByText('Help').closest('a');
    expect(link?.getAttribute('href')).toBe('/help');
  });
});
