import type { Meta, StoryObj } from '@storybook/react';
import { SiteNav } from '../components/site-nav';

const meta: Meta<typeof SiteNav> = {
  title: 'Navigation/SiteNav',
  component: SiteNav,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SiteNav>;

export const Default: Story = {};
