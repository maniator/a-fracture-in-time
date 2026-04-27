// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppProviders } from './app-providers';

vi.mock('@mui/material/CssBaseline', () => ({ default: () => null }));
vi.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock('@/lib/theme', () => ({
  fracturelineTheme: {},
}));

describe('AppProviders', () => {
  it('renders its children', () => {
    render(
      <AppProviders>
        <div>Test child content</div>
      </AppProviders>,
    );
    expect(screen.getByText('Test child content')).toBeDefined();
  });

  it('renders multiple children', () => {
    render(
      <AppProviders>
        <span>Alpha</span>
        <span>Beta</span>
      </AppProviders>,
    );
    expect(screen.getByText('Alpha')).toBeDefined();
    expect(screen.getByText('Beta')).toBeDefined();
  });

  it('renders nested elements', () => {
    render(
      <AppProviders>
        <section>
          <p>Nested content</p>
        </section>
      </AppProviders>,
    );
    expect(screen.getByText('Nested content')).toBeDefined();
  });
});
