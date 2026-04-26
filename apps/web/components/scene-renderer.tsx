'use client';

import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Choice, TimelineVariable } from '@fractureline/shared-types';
import { getEligibleNextChapterPack } from '@/lib/chapter-packs/chapter-pack-cache';
import { useGameStore } from '@/store/game-store';

const cueByVariable: Record<TimelineVariable, string> = {
  stability: 'stability',
  controlIndex: 'control',
  rebellion: 'rebellion',
  memoryFracture: 'memory',
  magicEntropy: 'entropy',
};

const timelineVariables = new Set<TimelineVariable>([
  'stability',
  'controlIndex',
  'rebellion',
  'memoryFracture',
  'magicEntropy',
]);

function isTimelineVariable(value: unknown): value is TimelineVariable {
  return typeof value === 'string' && timelineVariables.has(value as TimelineVariable);
}

function getChoiceCue(choice: Choice) {
  const cueTag = choice.tags?.find((tag) => tag.startsWith('cue:'));
  if (cueTag) return cueTag.replace('cue:', '');

  const endingEffect = choice.effects?.find((effect) => effect.type === 'setEnding');
  if (endingEffect) return 'ending';

  const variableEffect = choice.effects?.find((effect) => effect.type === 'increment' || effect.type === 'decrement' || effect.type === 'setNumber');
  if (variableEffect && 'key' in variableEffect && isTimelineVariable(variableEffect.key)) {
    return cueByVariable[variableEffect.key];
  }

  return 'choice';
}

function dispatchChoiceCue(choice: Choice) {
  window.dispatchEvent(new CustomEvent('fractureline:choice-cue', { detail: { cue: getChoiceCue(choice) } }));
}

function formatEraLabel(era: string) {
  return era === 'future' ? 'Future' : era === 'past' ? 'Past' : era;
}

const chapterTwoTitleByEnding: Record<string, string> = {
  'signal-path': 'The Stable Signal',
  'family-path': 'The Firstborn Record',
  'history-path': 'The Second Future',
};

const chapterThreeTitleByEnding: Record<string, string> = {
  'signal-path': 'The Relay Accord',
  'family-path': 'The Witness Ledger',
  'history-path': 'The Public Memory Trial',
};

export function SceneRenderer() {
  const {
    state,
    speaker,
    sceneText,
    choices,
    choose,
    continueToNextChapter,
    hydrateSaveStatus,
    initializeStory,
    save,
    load,
    reset,
    hasSave,
    isPersistenceReady,
    isStoryReady,
    isChoosing,
    storyLoadError,
  } = useGameStore();

  useEffect(() => {
    void hydrateSaveStatus();
    void initializeStory();
  }, [hydrateSaveStatus, initializeStory]);

  const chapterOneComplete = state.flags['chapter-one-complete'];
  const chapterTwoComplete = state.flags['chapter-two-complete'];
  const chapterThreeComplete = state.flags['chapter-three-complete'];
  const nextPack = getEligibleNextChapterPack(state);
  const canContinue = Boolean(nextPack);
  const nextChapterTitle = state.endingKey
    ? (nextPack?.chapter === 2 ? chapterTwoTitleByEnding[state.endingKey] : chapterThreeTitleByEnding[state.endingKey])
    : undefined;

  if (storyLoadError) {
    return (
      <Alert
        severity="warning"
        action={<Button color="inherit" onClick={() => void initializeStory()}>Try again</Button>}
      >
        {storyLoadError}
      </Alert>
    );
  }

  if (!isStoryReady || !sceneText.length) {
    return (
      <Card component="section" aria-label="Loading chapter" sx={{ boxShadow: '0 28px 80px rgba(0,0,0,0.45)' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <CircularProgress color="secondary" size={28} />
            <Box>
              <Typography variant="h5">Loading Chapter {state.chapter}</Typography>
              <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
                Preparing the opening chapter. Once it loads, it can be available for offline play.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card component="section" aria-labelledby="scene-title" sx={{ boxShadow: '0 28px 80px rgba(0,0,0,0.45)' }}>
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Stack direction="row" spacing={1.5} sx={{ mb: 4, flexWrap: 'wrap' }}>
          <Chip label={`Chapter ${state.chapter}`} variant="outlined" />
          <Chip label={formatEraLabel(state.currentPOV)} color="primary" variant="outlined" />
          {state.endingKey ? <Chip label={state.endingKey} color="secondary" variant="outlined" /> : null}
          <Chip label={isPersistenceReady ? 'Local save ready' : 'Checking saves'} color={hasSave ? 'secondary' : 'default'} variant="outlined" />
          {isChoosing ? <Chip label="Applying choice" color="secondary" variant="filled" /> : null}
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 4 }}>
          <Button variant="contained" color="secondary" disabled={isChoosing} onClick={() => void save()}>Save progress</Button>
          <Button variant="outlined" color="inherit" disabled={isChoosing || !isPersistenceReady || !hasSave} onClick={() => void load()}>Load progress</Button>
          <Button variant="text" color="inherit" disabled={isChoosing} onClick={() => void reset()}>Restart chapter</Button>
        </Stack>

        <Typography id="scene-title" component="h1" variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          {speaker}
        </Typography>

        <Stack spacing={2.5} sx={{ mt: 4 }}>
          {sceneText.map((paragraph) => (
            <Typography key={paragraph} sx={{ color: 'text.secondary', fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.75 }}>
              {paragraph}
            </Typography>
          ))}
        </Stack>

        {choices.length ? (
          <Stack spacing={2} sx={{ mt: 5 }} aria-label="Choices">
            {choices.map((choice) => (
              <Button
                key={choice.id}
                disabled={isChoosing}
                onClick={() => {
                  dispatchChoiceCue(choice);
                  void choose(choice.id);
                }}
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ justifyContent: 'flex-start', borderRadius: 3, px: 3, py: 2, textAlign: 'left' }}
              >
                {choice.label}
              </Button>
            ))}
          </Stack>
        ) : null}

        {chapterOneComplete || chapterTwoComplete || chapterThreeComplete ? (
          <Alert
            severity="success"
            sx={{ mt: 4 }}
            action={canContinue ? (
              <Button color="inherit" disabled={isChoosing} onClick={() => void continueToNextChapter()}>
                Continue to Chapter {nextPack?.chapter}
              </Button>
            ) : (
              <Button color="inherit" disabled={isChoosing} onClick={() => void reset()}>Replay</Button>
            )}
          >
            <Typography sx={{ fontWeight: 700 }}>Chapter {state.chapter} complete.</Typography>
            <Typography variant="body2">
              {canContinue
                ? `Your ending unlocked Chapter ${nextPack?.chapter}${nextChapterTitle ? `: ${nextChapterTitle}.` : '.'}`
                : 'Your choices will shape which future chapters become available.'}
            </Typography>
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
