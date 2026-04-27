// Vitest setup for jsdom tests
// Re-exports testing-library's afterEach cleanup so it works without globals
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
