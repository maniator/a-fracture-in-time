'use client';

import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Choice, TimelineVariable } from '@fractureline/shared-types';
import { getEligibleNextChapterPack } from '@/lib/chapter-packs/chapter-pack-cache';
import { isChapterComplete } from '@/lib/chapter-completion';
import { getTimelineSignals, type TimelineSignal } from '@/lib/timeline-signals';
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

const chapterTitleByPackId: Record<string, string> = {
  'chapter-2-signal': 'The Stable Signal',
  'chapter-2-family': 'The Firstborn Record',
  'chapter-2-history': 'The Second Future',
  'chapter-3-signal': 'The Relay Accord',
  'chapter-3-family': 'The Witness Ledger',
  'chapter-3-history': 'The Public Memory Trial',
  'chapter-4-relay-legitimacy': 'The Relay Covenant',
  'chapter-4-relay-compromised': 'The Relay Breach',
  'chapter-4-ledger-trust': 'The Family Guarantee',
  'chapter-4-emergency-custody': 'The Custody Exodus',
  'chapter-4-trial-credibility': 'The Credibility Docket',
  'chapter-4-amnesty-conflict': 'The Amnesty Faultline',
  'chapter-5-governance-reckoning': 'The Cost of Utopia: Governance Reckoning',
  'chapter-5-lineage-protocol': 'The Cost of Utopia: Lineage Protocol',
  'chapter-5-memory-settlement': 'The Cost of Utopia: Memory Settlement',
};

function formatEndingKey(key: string) {
  return key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

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
    clearStoryLoadError,
  } = useGameStore();

  const [restartDialogOpen, setRestartDialogOpen] = useState(false);

  useEffect(() => {
    void hydrateSaveStatus();
    void initializeStory();
  }, [hydrateSaveStatus, initializeStory]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('fractureline:scene-context', {
        detail: {
          chapter: state.chapter,
          pov: state.currentPOV,
          memory: state.memoryFracture,
          rebellion: state.rebellion,
        },
      }),
    );
  }, [state.chapter, state.currentPOV, state.memoryFracture, state.rebellion]);

  const currentChapterComplete = isChapterComplete(state.flags, state.chapter);
  const nextPack = getEligibleNextChapterPack(state);
  const canContinue = currentChapterComplete && Boolean(nextPack);
  const nextChapterTitle = nextPack ? chapterTitleByPackId[nextPack.id] : undefined;
  const timelineSignals = getTimelineSignals(state);

  // Story failed to load at all — show error in place of the loading card.
  if (!isStoryReady && storyLoadError) {
    return (
      <Alert
        severity="warning"
        action={<Button type="button" color="inherit" onClick={() => void initializeStory()}>Try again</Button>}
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
    <>
      <Card component="section" aria-labelledby="scene-title" sx={{ boxShadow: '0 28px 80px rgba(0,0,0,0.45)' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          {/* Inline error alert — story is loaded but a choose/load action failed */}
          {storyLoadError ? (
            <Alert
              severity="warning"
              sx={{ mb: 3 }}
              action={<Button color="inherit" size="small" onClick={clearStoryLoadError} type="button">Dismiss</Button>}
            >
              {storyLoadError}
            </Alert>
          ) : null}

          <Stack direction="row" spacing={1.5} sx={{ mb: 4, flexWrap: 'wrap' }}>
            <Chip label={`Chapter ${state.chapter}`} variant="outlined" />
            <Chip label={formatEraLabel(state.currentPOV)} color="primary" variant="outlined" />
            {state.endingKey ? <Chip label={formatEndingKey(state.endingKey)} color="secondary" variant="outlined" /> : null}
            {isPersistenceReady ? (
              <Chip label={hasSave ? 'Local save ready' : 'No save'} color={hasSave ? 'secondary' : 'default'} variant="outlined" />
            ) : null}
            {isChoosing ? <Chip label="Applying choice" color="secondary" variant="filled" /> : null}
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 4 }}>
            <Button type="button" variant="contained" color="secondary" disabled={isChoosing} onClick={() => void save()} aria-label="Save progress to local storage">Save progress</Button>
            <Button type="button" variant="outlined" color="inherit" disabled={isChoosing || !isPersistenceReady || !hasSave} onClick={() => void load()} aria-label="Load previously saved progress">Load progress</Button>
            <Button type="button" variant="text" color="inherit" disabled={isChoosing} onClick={() => setRestartDialogOpen(true)} aria-label="Restart chapter from the beginning">Restart chapter</Button>
          </Stack>

          <Typography id="scene-title" component="h1" variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            {speaker}
          </Typography>

          <Stack spacing={2.5} sx={{ mt: 4 }}>
            {sceneText.map((paragraph, index) => (
              <Typography key={index} sx={{ color: 'text.secondary', fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.75 }}>
                {paragraph}
              </Typography>
            ))}
          </Stack>

          {choices.length ? (
            <Stack spacing={2} sx={{ mt: 5 }} aria-label="Choices">
              {choices.map((choice) => (
                <Button
                  key={choice.id}
                  type="button"
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

          {currentChapterComplete ? (
            <Alert
              severity="success"
              sx={{ mt: 4 }}
              action={canContinue ? (
                <Button color="inherit" disabled={isChoosing} onClick={() => void continueToNextChapter()} type="button">
                  Continue to Chapter {nextPack?.chapter}
                </Button>
              ) : (
                <Button color="inherit" disabled={isChoosing} onClick={() => setRestartDialogOpen(true)} type="button">Replay</Button>
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

          <Box component="section" aria-labelledby="timeline-signals-title">
            <Typography
              id="timeline-signals-title"
              component="h2"
              variant="overline"
              sx={{ letterSpacing: '0.2em', color: 'text.secondary' }}
            >
              Timeline Signals
            </Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.7 }}>
              These signals are not scores. They describe the kind of timeline your choices are shaping.
            </Typography>
            <Grid container spacing={2} component="dl" sx={{ mt: 1 }}>
              {timelineSignals.map((signal) => (
                <SignalCard key={signal.key} signal={signal} />
              ))}
            </Grid>
          </Box>

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

      <Dialog
        open={restartDialogOpen}
        onClose={() => setRestartDialogOpen(false)}
        aria-labelledby="restart-dialog-title"
        aria-describedby="restart-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="restart-dialog-title" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, pt: 3, px: 3, pb: 1 }}>
          Restart from Chapter 1?
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 1 }}>
          <DialogContentText
            id="restart-dialog-description"
            sx={{ color: 'text.primary', fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.65 }}
          >
            This will return to the very beginning of the story. Your saved progress is not deleted — you can still load it afterwards.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1.5, flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
          <Button
            type="button"
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
            size="large"
            onClick={() => setRestartDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="warning"
            variant="contained"
            size="large"
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
            onClick={() => {
              setRestartDialogOpen(false);
              void reset();
            }}
          >
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function SignalCard({ signal }: { signal: TimelineSignal }) {
  return (
    <Grid size={{ xs: 12, md: 4 }} component="div">
      <Card variant="outlined" sx={{ background: 'rgba(8,7,11,0.32)' }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography component="dt" variant="caption" sx={{ letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary' }}>
            {signal.label}
          </Typography>
          <Typography component="dd" variant="h5" sx={{ m: 0, mt: 0.5 }} aria-label={`${signal.label} signal ${signal.level} (${signal.value})`}>
            {signal.level}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary', lineHeight: 1.6 }}>
            {signal.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
