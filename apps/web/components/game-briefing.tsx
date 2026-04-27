'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const BRIEFING_DISMISSED_KEY = 'fractureline:briefing-dismissed';

export function GameBriefing() {
  // null = hydrating (unknown), true = dismissed, false = not dismissed
  const [dismissed, setDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    setDismissed(localStorage.getItem(BRIEFING_DISMISSED_KEY) === '1');
  }, []);

  const dismiss = () => {
    localStorage.setItem(BRIEFING_DISMISSED_KEY, '1');
    setDismissed(true);
  };

  // Render nothing during SSR and hydration to avoid a mismatch flash.
  if (dismissed !== false) return null;

  return (
    <Card component="section" aria-labelledby="briefing-title" sx={{ mb: 4, border: '1px solid rgba(255,255,255,0.14)' }}>
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
          <Chip label="Before you start" color="secondary" variant="outlined" />
          <Chip label="Chapters 1–3" variant="outlined" />
        </Stack>

        <Typography id="briefing-title" component="h2" variant="h3" sx={{ fontSize: { xs: '2rem', md: '3.25rem' } }}>
          You are entering Ayker.
        </Typography>

        <Typography sx={{ mt: 3, color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.8 }}>
          Ayker is a planet that calls itself at peace. Hunger is down. Open war is gone. That peace is held together by managed records, curated history, and official narratives that leave whole communities out of the story. Two people on opposite sides of that history are about to start pulling on the same thread.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Stack spacing={3}>
          <CharacterBrief
            initials="XR"
            name="Xav Reivax"
            role="Student, University of Brinkton — 874cy"
            tone="Family, duty, and the cost of silence"
            description="Xav is studying for a Cybol history exam when his broken com starts receiving transmissions from the future. He has a family notebook he is not supposed to open yet, a sister who notices everything, and a classmate who will not let him ignore what he is seeing."
          />
          <CharacterBrief
            initials="YE"
            name="Yve Ettevy"
            role="Xav's classmate and collaborator — 874cy"
            tone="Method, skepticism, and accountability"
            description="Yve notices problems in the official history before Xav does. She needs evidence before she will act on them. Once she has evidence, she builds systems. She is the one who will verify Zelda's claims, write the protocols, and make sure what Xav discovers doesn't destroy everything."
          />
          <CharacterBrief
            initials="ZA"
            name="Zelda Adlez"
            role="Survivor, ruins of old Brinkton — 23ac"
            tone="Memory, survival, and the cost of knowing"
            description="Zelda is living fifty-three years after Xav's exam, in the ruins of the city he recognises. She found a device under a lecture hall that can contact the past. She believes she is Xav's descendant. She is trying to understand why Cybol fell — and whether reaching into the past makes her a rescuer or a catastrophe."
          />
          <Box>
            <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>How to read your choices</Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.7 }}>
              Choices are not simply right or wrong. Some protect stability. Some pull hidden records into the open. Some apply pressure to the timeline through memory, evidence, and historical consequence. The timeline signals below each scene describe the kind of future your choices are shaping — not a score, but a direction.
            </Typography>
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
          <Button color="secondary" variant="contained" size="large" onClick={dismiss}>
            Enter the first fracture
          </Button>
          <Button color="inherit" variant="text" size="large" onClick={dismiss}>
            Dismiss
          </Button>
        </Stack>
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
        <Typography component="h3" variant="h6" sx={{ fontWeight: 800 }}>{name}</Typography>
        <Typography sx={{ mt: 0.25, color: 'secondary.main', fontWeight: 700 }}>{role}</Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary', fontStyle: 'italic' }}>{tone}</Typography>
        <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.7 }}>{description}</Typography>
      </Box>
    </Stack>
  );
}
