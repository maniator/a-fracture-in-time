import type { StorybookConfig } from '@storybook/nextjs';

process.env.STORYBOOK = 'true';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-docs'],
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: false,
        lazyCompilation: false,
      },
    },
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (webpackConfig) => {
    webpackConfig.cache = { type: 'memory' };
    return webpackConfig;
  },
};

export default config;
