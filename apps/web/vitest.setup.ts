// Vitest setup for jsdom tests
// Registers Testing Library cleanup to run after each test
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
