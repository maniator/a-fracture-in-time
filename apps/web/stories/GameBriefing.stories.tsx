import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { GameBriefing } from '../components/game-briefing';

const meta: Meta<typeof GameBriefing> = {
  title: 'Game/GameBriefing',
  component: GameBriefing,
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
type Story = StoryObj<typeof GameBriefing>;

export const Default: Story = {};
