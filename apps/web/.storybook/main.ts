import type { Compiler } from 'webpack';
import type { StorybookConfig } from '@storybook/nextjs';

process.env.STORYBOOK = 'true';

/**
 * Webpack plugin that patches `compiler.close()` to suppress the cache-shutdown
 * hook incompatibility between `@storybook/builder-webpack5` 8.6.x and the
 * webpack build bundled with Next.js. During `Cache.shutdown()`, webpack fires
 * a tapable hook whose registered callback tries to call `.tap()` on an
 * undefined hook object, producing:
 *
 *   TypeError: Cannot read properties of undefined (reading 'tap')
 *
 * The compilation itself succeeds (100% progress shown) – only the post-build
 * cleanup crashes. Intercepting and discarding that specific error lets
 * Storybook build the static output correctly.
 */
class StorybookWebpackCacheShutdownPatch {
  apply(compiler: Compiler) {
    const originalClose = compiler.close.bind(compiler);
    compiler.close = function patchedClose(callback) {
      originalClose((err) => {
        if (err?.message?.includes("Cannot read properties of undefined (reading 'tap')")) {
          callback?.(null);
        } else {
          callback?.(err);
        }
      });
    };
  }
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push(new StorybookWebpackCacheShutdownPatch() as never);
    return config;
  },
};

export default config;
