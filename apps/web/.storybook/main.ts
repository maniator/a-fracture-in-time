import type { StorybookConfig } from '@storybook/nextjs';

process.env.STORYBOOK = 'true';

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
  webpackFinal: async (webpackConfig) => {
    webpackConfig.cache = false;
    return webpackConfig;
  },
};

export default config;
