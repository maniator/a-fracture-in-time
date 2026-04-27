'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function GameBriefing() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Card component="section" aria-labelledby="briefing-title" sx={{ mb: 4, border: '1px solid rgba(255,255,255,0.14)' }}>
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
          <Chip label="Before you start" color="secondary" variant="outlined" />
          <Chip label="Chapters 1-3" variant="outlined" />
        </Stack>

        <Typography id="briefing-title" component="h1" variant="h3" sx={{ fontSize: { xs: '2rem', md: '3.25rem' } }}>
          You are entering Ayker.
        </Typography>

        <Typography sx={{ mt: 3, color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.8 }}>
          Ayker is a city that calls itself peaceful. Hunger is down. Open war is gone. But peace is held together by managed records, curated memory, and historical narratives that leave whole communities unheard.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Stack spacing={3}>
          <CharacterBrief
            initials="XR"
            name="Xav Reivax"
            role="Past timeline witness"
            tone="Family, duty, and the cost of silence"
            description="Xav is a Brinkton student trying to keep his family safe while impossible messages from the future force him to choose between comfort and truth."
          />
          <CharacterBrief
            initials="YE"
            name="Yve Ettevy"
            role="Analyst and translator"
            tone="Method, skepticism, and public accountability"
            description="Yve turns fragments into evidence, keeps the team grounded, and translates propaganda language into plain terms communities can use."
          />
          <CharacterBrief
            initials="ZA"
            name="Zelda Adlez"
            role="Future timeline witness"
            tone="Memory, survival, and strategic rebellion"
            description="Zelda sends warnings from a fractured future and helps build witness networks that can challenge official history without collapsing into chaos."
          />
          <Box>
            <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>How to read your choices</Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.7 }}>
              Choices are not just good or bad. Some protect stability. Some reveal hidden memories. Some increase magical pressure on the timeline. The timeline signals below each scene show what kind of future your choices are building.
            </Typography>
          </Box>
        </Stack>

        <Button sx={{ mt: 4 }} color="secondary" variant="contained" size="large" onClick={() => setDismissed(true)}>
          Enter the first fracture
        </Button>
      </CardContent>
    </Card>
  );
}

function CharacterBrief({ initials, name, role, tone, description }: { initials: string; name: string; role: string; tone: string; description: string }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ alignItems: { sm: 'center' } }}>
      <Box
        aria-hidden="true"
        sx={{
          width: 78,
          height: 78,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.28), rgba(126,87,194,0.36) 42%, rgba(8,7,11,0.95) 78%)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 18px 48px rgba(0,0,0,0.35)',
        }}
      >
        <Typography sx={{ fontWeight: 800, letterSpacing: '0.08em' }}>{initials}</Typography>
      </Box>
      <Box>
        <Typography component="h2" variant="h6" sx={{ fontWeight: 800 }}>{name}</Typography>
        <Typography sx={{ mt: 0.25, color: 'secondary.main', fontWeight: 700 }}>{role}</Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary', fontStyle: 'italic' }}>{tone}</Typography>
        <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.7 }}>{description}</Typography>
      </Box>
    </Stack>
  );
}
