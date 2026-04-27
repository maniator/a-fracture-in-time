import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/tests/e2e/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
    passWithNoTests: true,
    setupFiles: ['./vitest.setup.ts'],
    environmentMatchGlobs: [
      ['components/**', 'jsdom'],
      ['store/**', 'jsdom'],
      ['app/**', 'jsdom'],
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      include: [
        'lib/**/*.ts',
        'components/**/*.{ts,tsx}',
        'store/**/*.ts',
      ],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        'lib/theme.ts',
      ],
      thresholds: {
        lines: 90,
        statements: 90,
        functions: 90,
        branches: 90,
      },
    },
  },
});
