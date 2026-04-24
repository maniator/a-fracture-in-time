import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { SceneRenderer } from '../components/scene-renderer';

const meta: Meta<typeof SceneRenderer> = {
  title: 'Game/SceneRenderer',
  component: SceneRenderer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 6 } }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SceneRenderer>;

export const ChapterOneOpening: Story = {};
