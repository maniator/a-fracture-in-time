import type { Preview } from '@storybook/react';
import { AppProviders } from '../components/app-providers';
import '../app/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Fractureline dark',
      values: [{ name: 'Fractureline dark', value: '#08070b' }],
    },
  },
};

export default preview;
