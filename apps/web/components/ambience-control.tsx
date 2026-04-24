'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const INITIAL_VOLUME = 0.07;
const NOTE_SCALE = [196, 220, 246.94, 293.66, 329.63, 392, 440, 493.88, 587.33];
const BASS_NOTES = [98, 110, 130.81, 146.83];

type SoundscapeNodes = {
  context: AudioContext;
  masterGain: GainNode;
  textureSource: AudioBufferSourceNode;
  textureFilter: BiquadFilterNode;
  delay: DelayNode;
  delayFeedback: GainNode;
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
  const limiter = context.createDynamicsCompressor();
  const delay = context.createDelay(4);
  const delayFeedback = context.createGain();
  const delayFilter = context.createBiquadFilter();
  const textureGain = context.createGain();
  const textureFilter = context.createBiquadFilter();
  const textureSource = context.createBufferSource();

  masterGain.gain.value = 0;
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
  textureSource.start();

  masterGain.connect(limiter);
  limiter.connect(context.destination);
  setGain(masterGain, volume);

  return { context, masterGain, textureSource, textureFilter, delay, delayFeedback };
}

function scheduleMusic(nodes: SoundscapeNodes, step: number) {
  const now = nodes.context.currentTime + 0.08;
  const noteIndex = (step * 2 + Math.floor(Math.random() * 3)) % NOTE_SCALE.length;
  const frequency = NOTE_SCALE[noteIndex] * (Math.random() > 0.82 ? 2 : 1);
  const pan = (Math.random() - 0.5) * 1.2;

  playBell(nodes, frequency, now, pan);

  if (step % 4 === 0) {
    playBassPulse(nodes, BASS_NOTES[(step / 4) % BASS_NOTES.length], now);
  }

  nodes.textureFilter.frequency.setTargetAtTime(220 + Math.random() * 190, now, 1.8);
  nodes.delay.delayTime.setTargetAtTime(0.58 + Math.random() * 0.42, now, 0.8);
  nodes.delayFeedback.gain.setTargetAtTime(0.2 + Math.random() * 0.14, now, 0.9);
}

export function AmbienceControl() {
  const nodesRef = useRef<SoundscapeNodes | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [volume, setVolume] = useState(INITIAL_VOLUME);

  const startScheduler = () => {
    if (schedulerRef.current !== null || !nodesRef.current) return;

    scheduleMusic(nodesRef.current, stepRef.current);
    stepRef.current += 1;

    schedulerRef.current = window.setInterval(() => {
      if (!nodesRef.current || nodesRef.current.context.state !== 'running') return;
      scheduleMusic(nodesRef.current, stepRef.current);
      stepRef.current += 1;
    }, 2800);
  };

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

    void startAutomatically();

    return () => {
      if (schedulerRef.current !== null) {
        window.clearInterval(schedulerRef.current);
      }
      const nodes = nodesRef.current;
      if (!nodes) return;
      nodes.textureSource.stop();
      void nodes.context.close();
    };
  }, []);

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
        width: { xs: 'calc(100vw - 24px)', sm: 420 },
        transform: 'translateX(-50%)',
      }}
    >
      <Stack
        spacing={isOpen ? 1 : 0}
        sx={{
          border: '1px solid rgba(255,255,255,0.16)',
          borderRadius: 4,
          px: 1.25,
          py: 1,
          background: 'rgba(8,7,11,0.78)',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 18px 55px rgba(0,0,0,0.38)',
        }}
      >
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
          <Button
            size="small"
            variant="outlined"
            color={needsGesture ? 'secondary' : 'inherit'}
            onClick={() => void toggleMute()}
            sx={{ borderRadius: 999, minWidth: 104, whiteSpace: 'nowrap' }}
          >
            {needsGesture ? 'Enable sound' : isMuted ? 'Unmute' : 'Mute'}
          </Button>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', lineHeight: 1.2 }}>
              {needsGesture ? 'Browser blocked autoplay' : isMuted ? 'Soundscape muted' : 'Generative ambience'}
            </Typography>
            <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.disabled', lineHeight: 1.2 }}>
              Bell notes, soft delay, filtered texture
            </Typography>
          </Box>
          <Button size="small" color="inherit" onClick={() => setIsOpen((value) => !value)} sx={{ borderRadius: 999, minWidth: 74 }}>
            {isOpen ? 'Close' : 'Volume'}
          </Button>
        </Stack>

        {isOpen ? (
          <Box sx={{ px: 1, pb: 0.5 }}>
            <Slider
              aria-label="Ambience volume"
              min={0}
              max={0.22}
              step={0.005}
              value={volume}
              onChange={updateVolume}
              size="small"
            />
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}
