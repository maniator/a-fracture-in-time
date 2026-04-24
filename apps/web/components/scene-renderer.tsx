'use client';

import { useEffect, useMemo } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getAvailableChoices } from '@fractureline/narrative-engine';
import { chapterOne } from '@/content/chapter-one';
import { useGameStore } from '@/store/game-store';

export function SceneRenderer() {
  const { state, choose, hydrateSaveStatus, save, load, reset, hasSave, isPersistenceReady } = useGameStore();
  const scene = chapterOne[state.currentSceneId];

  useEffect(() => {
    void hydrateSaveStatus();
  }, [hydrateSaveStatus]);

  const choices = useMemo(() => {
    if (!scene) return [];
    return getAvailableChoices(scene, state);
  }, [scene, state]);

  if (!scene) {
    return (
      <Alert
        severity="error"
        action={<Button color="inherit" onClick={() => void reset()}>Restart</Button>}
      >
        Scene not found: {state.currentSceneId}
      </Alert>
    );
  }

  const chapterComplete = state.flags['chapter-one-complete'];

  return (
    <Card component="section" aria-labelledby="scene-title" sx={{ boxShadow: '0 28px 80px rgba(0,0,0,0.45)' }}>
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Stack direction="row" spacing={1.5} sx={{ mb: 4, flexWrap: 'wrap' }}>
          <Chip label={`Chapter ${scene.chapter}`} variant="outlined" />
          <Chip label={scene.pov} color="primary" variant="outlined" />
          <Chip label={isPersistenceReady ? 'Local save ready' : 'Checking saves'} color={hasSave ? 'secondary' : 'default'} variant="outlined" />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 4 }}>
          <Button variant="contained" color="secondary" onClick={() => void save()}>Save progress</Button>
          <Button variant="outlined" color="inherit" disabled={!isPersistenceReady || !hasSave} onClick={() => void load()}>Load progress</Button>
          <Button variant="text" color="inherit" onClick={() => void reset()}>Restart chapter</Button>
        </Stack>

        <Typography id="scene-title" component="h1" variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          {scene.speaker ?? 'Unknown'}
        </Typography>

        <Stack spacing={2.5} sx={{ mt: 4 }}>
          {scene.text.map((paragraph) => (
            <Typography key={paragraph} sx={{ color: 'text.secondary', fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.75 }}>
              {paragraph}
            </Typography>
          ))}
        </Stack>

        <Stack spacing={2} sx={{ mt: 5 }} aria-label="Choices">
          {choices.map((choice) => (
            <Button
              key={choice.id}
              onClick={() => choose(choice.id)}
              variant="outlined"
              color="inherit"
              size="large"
              sx={{ justifyContent: 'flex-start', borderRadius: 3, px: 3, py: 2, textAlign: 'left' }}
            >
              {choice.label}
            </Button>
          ))}
        </Stack>

        {chapterComplete ? (
          <Alert severity="success" sx={{ mt: 4 }} action={<Button color="inherit" onClick={() => void reset()}>Replay</Button>}>
            <Typography sx={{ fontWeight: 700 }}>Chapter 1 complete.</Typography>
            <Typography variant="body2">The next chapter will build from this state and the contradiction you exposed.</Typography>
          </Alert>
        ) : null}

        <Divider sx={{ my: 5 }} />

        <Grid container spacing={2} component="dl">
          <Metric label="Stability" value={state.stability} />
          <Metric label="Control" value={state.controlIndex} />
          <Metric label="Rebellion" value={state.rebellion} />
          <Metric label="Memory" value={state.memoryFracture} />
          <Metric label="Entropy" value={state.magicEntropy} />
        </Grid>

        {state.codex.length ? (
          <Box component="aside" sx={{ mt: 5, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, p: 3 }}>
            <Typography variant="overline" sx={{ letterSpacing: '0.25em', color: 'text.secondary' }}>Codex</Typography>
            <Stack component="ul" spacing={1} sx={{ mt: 1, pl: 3, color: 'text.secondary' }}>
              {state.codex.map((entry) => <li key={entry}>{entry}</li>)}
            </Stack>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <Grid size={{ xs: 6, md: 2 }} component="div">
      <Card variant="outlined" sx={{ background: 'rgba(8,7,11,0.32)' }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography component="dt" variant="caption" sx={{ letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary' }}>
            {label}
          </Typography>
          <Typography component="dd" variant="h5" sx={{ m: 0, mt: 0.5 }}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
