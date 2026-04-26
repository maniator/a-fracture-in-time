'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const INITIAL_VOLUME = 0.07;
const CHAPTER_NOTE_SCALES: Record<number, number[]> = {
  1: [196, 220, 246.94, 293.66, 329.63, 392],
  2: [174.61, 196, 220, 261.63, 293.66, 349.23],
  3: [164.81, 196, 220, 246.94, 293.66, 329.63],
};
const POV_BASS_NOTES: Record<'past' | 'future', number[]> = {
  past: [98, 110, 130.81],
  future: [87.31, 98, 116.54],
};
const CUE_FREQUENCIES: Record<string, number[]> = {
  stability: [196, 246.94],
  control: [146.83, 196, 246.94],
  rebellion: [220, 293.66, 440],
  memory: [261.63, 329.63, 493.88],
  entropy: [185, 277.18, 554.36],
  ending: [220, 329.63, 440, 659.25],
  choice: [246.94, 329.63],
};

type SoundscapeNodes = {
  context: AudioContext;
  masterGain: GainNode;
  cueGain: GainNode;
  textureSource: AudioBufferSourceNode;
  textureFilter: BiquadFilterNode;
  delay: DelayNode;
  delayFeedback: GainNode;
};

type SceneMood = {
  chapter: number;
  pov: 'past' | 'future';
  memory: number;
  rebellion: number;
};

function setGain(gain: GainNode, value: number) {
  const now = gain.context.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setTargetAtTime(value, now, 0.18);
}

function createNoiseBuffer(context: AudioContext) {
  const seconds = 6;
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;

  for (let index = 0; index < data.length; index += 1) {
    last = last * 0.985 + (Math.random() * 2 - 1) * 0.015;
    data[index] = last * 0.42;
  }

  return buffer;
}

function playBell(nodes: SoundscapeNodes, frequency: number, when: number, pan: number) {
  const { context, delay, masterGain } = nodes;
  const oscillator = context.createOscillator();
  const overtone = context.createOscillator();
  const gain = context.createGain();
  const toneFilter = context.createBiquadFilter();
  const panner = context.createStereoPanner();

  oscillator.type = 'sine';
  overtone.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, when);
  overtone.frequency.setValueAtTime(frequency * 2.01, when);
  overtone.detune.setValueAtTime(-7, when);

  toneFilter.type = 'lowpass';
  toneFilter.frequency.setValueAtTime(1800, when);
  toneFilter.frequency.exponentialRampToValueAtTime(540, when + 2.8);
  panner.pan.setValueAtTime(pan, when);

  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.105, when + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 3.4);

  oscillator.connect(toneFilter);
  overtone.connect(toneFilter);
  toneFilter.connect(gain);
  gain.connect(panner);
  panner.connect(delay);
  panner.connect(masterGain);

  oscillator.start(when);
  overtone.start(when);
  oscillator.stop(when + 3.6);
  overtone.stop(when + 3.6);
}

function playCue(nodes: SoundscapeNodes, cue: string) {
  const frequencies = CUE_FREQUENCIES[cue] ?? CUE_FREQUENCIES.choice;
  const now = nodes.context.currentTime + 0.02;

  frequencies.forEach((frequency, index) => {
    const oscillator = nodes.context.createOscillator();
    const gain = nodes.context.createGain();
    const filter = nodes.context.createBiquadFilter();
    const panner = nodes.context.createStereoPanner();
    const start = now + index * 0.075;

    oscillator.type = cue === 'entropy' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.detune.setValueAtTime(cue === 'memory' ? -9 + index * 6 : index * 3, start);
    filter.type = cue === 'control' ? 'lowpass' : 'bandpass';
    filter.frequency.setValueAtTime(cue === 'control' ? 700 : frequency * 2.2, start);
    filter.Q.value = cue === 'entropy' ? 1.5 : 0.85;
    panner.pan.setValueAtTime((index - frequencies.length / 2) * 0.22, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(cue === 'ending' ? 0.14 : 0.09, start + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + (cue === 'ending' ? 1.4 : 0.65));

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(nodes.cueGain);
    oscillator.start(start);
    oscillator.stop(start + 1.5);
  });
}

function playBassPulse(nodes: SoundscapeNodes, frequency: number, when: number) {
  const { context, masterGain } = nodes;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, when);
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(220, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.05, when + 0.22);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 5.5);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  oscillator.start(when);
  oscillator.stop(when + 5.7);
}

function createSoundscape(volume: number): SoundscapeNodes {
  const context = new AudioContext();
  const masterGain = context.createGain();
  const cueGain = context.createGain();
  const limiter = context.createDynamicsCompressor();
  const delay = context.createDelay(4);
  const delayFeedback = context.createGain();
  const delayFilter = context.createBiquadFilter();
  const textureGain = context.createGain();
  const textureFilter = context.createBiquadFilter();
  const textureSource = context.createBufferSource();

  masterGain.gain.value = 0;
  cueGain.gain.value = 0.55;
  limiter.threshold.value = -24;
  limiter.knee.value = 18;
  limiter.ratio.value = 6;
  limiter.attack.value = 0.04;
  limiter.release.value = 0.4;

  delay.delayTime.value = 0.72;
  delayFeedback.gain.value = 0.28;
  delayFilter.type = 'lowpass';
  delayFilter.frequency.value = 1450;
  delay.connect(delayFilter);
  delayFilter.connect(delayFeedback);
  delayFeedback.connect(delay);
  delay.connect(masterGain);

  textureSource.buffer = createNoiseBuffer(context);
  textureSource.loop = true;
  textureFilter.type = 'lowpass';
  textureFilter.frequency.value = 260;
  textureFilter.Q.value = 0.45;
  textureGain.gain.value = 0.025;
  textureSource.connect(textureFilter);
  textureFilter.connect(textureGain);
  textureGain.connect(masterGain);
  cueGain.connect(masterGain);
  textureSource.start();

  masterGain.connect(limiter);
  limiter.connect(context.destination);
  setGain(masterGain, volume);

  return { context, masterGain, cueGain, textureSource, textureFilter, delay, delayFeedback };
}

function scheduleMusic(nodes: SoundscapeNodes, step: number, mood: SceneMood) {
  const scale = CHAPTER_NOTE_SCALES[mood.chapter] ?? CHAPTER_NOTE_SCALES[1];
  const bassNotes = POV_BASS_NOTES[mood.pov];
  const now = nodes.context.currentTime + 0.08;
  const noteIndex = (step + mood.memory) % scale.length;
  const harmonyIndex = (noteIndex + 2 + (mood.rebellion % 2)) % scale.length;
  const frequency = scale[noteIndex];
  const harmony = scale[harmonyIndex] * (mood.chapter >= 3 ? 1 : 0.5);
  const pan = mood.pov === 'future' ? 0.22 : -0.22;

  playBell(nodes, frequency, now, pan);
  playBell(nodes, harmony, now + 0.26, -pan * 0.8);

  if (step % 3 === 0) {
    playBassPulse(nodes, bassNotes[(step / 3) % bassNotes.length], now);
  }

  nodes.textureFilter.frequency.setTargetAtTime(180 + mood.chapter * 55 + mood.memory * 4, now, 1.6);
  nodes.delay.delayTime.setTargetAtTime(mood.pov === 'future' ? 0.78 : 0.62, now, 0.9);
  nodes.delayFeedback.gain.setTargetAtTime(0.18 + Math.min(0.2, mood.rebellion * 0.015), now, 1);
}

export function AmbienceControl() {
  const nodesRef = useRef<SoundscapeNodes | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const moodRef = useRef<SceneMood>({ chapter: 1, pov: 'past', memory: 0, rebellion: 0 });

  const startScheduler = useCallback(() => {
    if (schedulerRef.current !== null || !nodesRef.current) return;

    scheduleMusic(nodesRef.current, stepRef.current, moodRef.current);
    stepRef.current += 1;

    schedulerRef.current = window.setInterval(() => {
      if (!nodesRef.current || nodesRef.current.context.state !== 'running') return;
      scheduleMusic(nodesRef.current, stepRef.current, moodRef.current);
      stepRef.current += 1;
    }, 4200);
  }, []);

  useEffect(() => {
    const startAutomatically = async () => {
      try {
        nodesRef.current = createSoundscape(INITIAL_VOLUME);
        await nodesRef.current.context.resume();
        const running = nodesRef.current.context.state === 'running';
        setNeedsGesture(!running);
        if (running) startScheduler();
      } catch {
        setNeedsGesture(true);
      }
    };

    const handleChoiceCue = (event: Event) => {
      const cue = event instanceof CustomEvent ? event.detail?.cue : undefined;
      const nodes = nodesRef.current;
      if (!nodes || isMuted || nodes.context.state !== 'running') return;
      playCue(nodes, typeof cue === 'string' ? cue : 'choice');
    };

    const handleSceneContext = (event: Event) => {
      const detail = event instanceof CustomEvent ? event.detail : undefined;
      if (!detail) return;
      moodRef.current = {
        chapter: typeof detail.chapter === 'number' ? detail.chapter : moodRef.current.chapter,
        pov: detail.pov === 'future' ? 'future' : 'past',
        memory: typeof detail.memory === 'number' ? detail.memory : moodRef.current.memory,
        rebellion: typeof detail.rebellion === 'number' ? detail.rebellion : moodRef.current.rebellion,
      };
    };

    void startAutomatically();
    window.addEventListener('fractureline:choice-cue', handleChoiceCue);
    window.addEventListener('fractureline:scene-context', handleSceneContext);

    return () => {
      window.removeEventListener('fractureline:choice-cue', handleChoiceCue);
      window.removeEventListener('fractureline:scene-context', handleSceneContext);
      if (schedulerRef.current !== null) {
        window.clearInterval(schedulerRef.current);
      }
      const nodes = nodesRef.current;
      if (!nodes) return;
      nodes.textureSource.stop();
      void nodes.context.close();
    };
  }, [isMuted, startScheduler]);

  const enableSound = async () => {
    if (!nodesRef.current) {
      nodesRef.current = createSoundscape(volume);
    }
    await nodesRef.current.context.resume();
    setGain(nodesRef.current.masterGain, isMuted ? 0 : volume);
    const running = nodesRef.current.context.state === 'running';
    setNeedsGesture(!running);
    if (running) startScheduler();
  };

  const toggleMute = async () => {
    if (needsGesture) {
      await enableSound();
      return;
    }

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nodesRef.current) {
      setGain(nodesRef.current.masterGain, nextMuted ? 0 : volume);
    }
  };

  const updateVolume = (_: Event, nextValue: number | number[]) => {
    const nextVolume = Array.isArray(nextValue) ? nextValue[0] : nextValue;
    setVolume(nextVolume);
    if (nodesRef.current && !isMuted) {
      setGain(nodesRef.current.masterGain, nextVolume);
    }
  };

  return (
    <Box
      component="aside"
      aria-label="Ambience controls"
      sx={{
        position: 'fixed',
        left: '50%',
        bottom: { xs: 12, sm: 20 },
        zIndex: 30,
        width: { xs: 'calc(100vw - 24px)', sm: 430 },
        transform: 'translateX(-50%)',
      }}
    >
      <Card variant="outlined" sx={{ background: 'rgba(8,7,11,0.82)', backdropFilter: 'blur(18px)', boxShadow: '0 18px 55px rgba(0,0,0,0.38)' }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
            <Tooltip title={needsGesture ? 'Enable ambience' : isMuted ? 'Unmute ambience' : 'Mute ambience'}>
              <Button size="small" variant={needsGesture ? 'contained' : 'outlined'} color={needsGesture ? 'secondary' : 'inherit'} onClick={() => void toggleMute()} sx={{ minWidth: 96 }}>
                {needsGesture ? 'Enable' : isMuted ? 'Unmute' : 'Mute'}
              </Button>
            </Tooltip>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', lineHeight: 1.2 }}>
                {needsGesture ? 'Sound needs one tap' : isMuted ? 'Ambience muted' : 'Generative ambience'}
              </Typography>
              <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.disabled', lineHeight: 1.2 }}>
                Branch cues, bell notes, soft delay
              </Typography>
            </Box>
            <Button size="small" color="inherit" variant="text" onClick={() => setIsOpen((value) => !value)} sx={{ minWidth: 76 }}>
              {isOpen ? 'Hide' : 'Volume'}
            </Button>
          </Stack>
          <Collapse in={isOpen} unmountOnExit>
            <Box sx={{ px: 1, pt: 1.5 }}>
              <Slider aria-label="Ambience volume" min={0} max={0.22} step={0.005} value={volume} onChange={updateVolume} size="small" />
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
}
