import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function StyleGuide() {
  return (
    <Box sx={{ p: 4, maxWidth: 900 }}>
      <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.35em' }}>
        Fractureline Style Guide
      </Typography>
      <Typography variant="h2" sx={{ mt: 2 }}>Narrative UI System</Typography>
      <Typography sx={{ mt: 2, color: 'text.secondary', maxWidth: 720 }}>
        A Material UI foundation for the game shell, choices, status chips, and narrative cards.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="secondary">Primary action</Button>
        <Button variant="outlined" color="inherit">Secondary action</Button>
      </Stack>

      <Stack direction="row" spacing={1.5} sx={{ mt: 4 }}>
        <Chip label="Chapter 1" variant="outlined" />
        <Chip label="Xav Reivax" color="primary" variant="outlined" />
        <Chip label="Zelda Adlez" color="secondary" variant="outlined" />
        <Chip label="Signal Path" color="secondary" variant="outlined" />
      </Stack>

      <Card sx={{ mt: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4">Xav Reivax</Typography>
          <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.8 }}>
            The quad looked exactly the way the city brochures said it should: glass lecture towers, clean paths through bright moss, students laughing like Cybol had already solved every serious problem on Ayker.
          </Typography>
          <Stack spacing={2} sx={{ mt: 4 }}>
            <Button variant="outlined" color="inherit" sx={{ justifyContent: 'flex-start', borderRadius: 3 }}>
              Admit the com broke again
            </Button>
            <Button variant="outlined" color="inherit" sx={{ justifyContent: 'flex-start', borderRadius: 3 }}>
              Joke that Cybol technology clearly fears you
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

const meta: Meta<typeof StyleGuide> = {
  title: 'Design System/Style Guide',
  component: StyleGuide,
};

export default meta;
type Story = StoryObj<typeof StyleGuide>;

export const Default: Story = {};
