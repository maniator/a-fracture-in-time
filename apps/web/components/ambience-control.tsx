'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type SoundscapeNodes = {
  context: AudioContext;
  masterGain: GainNode;
  padGain: GainNode;
  shimmerGain: GainNode;
  noiseGain: GainNode;
  oscillators: OscillatorNode[];
  lfos: OscillatorNode[];
  noiseSource: AudioBufferSourceNode;
};

function setGain(gain: GainNode, value: number) {
  const now = gain.context.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setTargetAtTime(value, now, 0.08);
}

function createNoiseBuffer(context: AudioContext) {
  const seconds = 4;
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < data.length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * 0.32;
  }

  return buffer;
}

function createSoundscape(volume: number): SoundscapeNodes {
  const context = new AudioContext();
  const masterGain = context.createGain();
  const padGain = context.createGain();
  const shimmerGain = context.createGain();
  const noiseGain = context.createGain();
  const masterFilter = context.createBiquadFilter();

  masterGain.gain.value = volume;
  padGain.gain.value = 0.055;
  shimmerGain.gain.value = 0.018;
  noiseGain.gain.value = 0.035;
  masterFilter.type = 'lowpass';
  masterFilter.frequency.value = 1800;
  masterFilter.Q.value = 0.4;

  padGain.connect(masterFilter);
  shimmerGain.connect(masterFilter);
  noiseGain.connect(masterFilter);
  masterFilter.connect(masterGain);
  masterGain.connect(context.destination);

  const chord = [110, 164.81, 220, 277.18];
  const oscillators = chord.flatMap((frequency, index) => {
    const left = context.createOscillator();
    const right = context.createOscillator();
    const leftGain = context.createGain();
    const rightGain = context.createGain();
    const stereo = context.createStereoPanner();

    left.type = 'sine';
    right.type = 'sine';
    left.frequency.value = frequency;
    right.frequency.value = frequency;
    left.detune.value = -4 - index * 1.5;
    right.detune.value = 5 + index * 1.2;
    leftGain.gain.value = 0.18;
    rightGain.gain.value = 0.18;
    stereo.pan.value = index % 2 === 0 ? -0.38 : 0.38;

    left.connect(leftGain);
    right.connect(rightGain);
    leftGain.connect(stereo);
    rightGain.connect(stereo);
    stereo.connect(padGain);
    left.start();
    right.start();

    return [left, right];
  });

  const shimmer = context.createOscillator();
  const shimmerFilter = context.createBiquadFilter();
  shimmer.type = 'triangle';
  shimmer.frequency.value = 659.25;
  shimmer.detune.value = -8;
  shimmerFilter.type = 'bandpass';
  shimmerFilter.frequency.value = 920;
  shimmerFilter.Q.value = 0.7;
  shimmer.connect(shimmerFilter);
  shimmerFilter.connect(shimmerGain);
  shimmer.start();
  oscillators.push(shimmer);

  const noiseSource = context.createBufferSource();
  const noiseFilter = context.createBiquadFilter();
  noiseSource.buffer = createNoiseBuffer(context);
  noiseSource.loop = true;
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 460;
  noiseFilter.Q.value = 0.8;
  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseSource.start();

  const padLfo = context.createOscillator();
  const padLfoGain = context.createGain();
  padLfo.type = 'sine';
  padLfo.frequency.value = 0.045;
  padLfoGain.gain.value = 0.022;
  padLfo.connect(padLfoGain);
  padLfoGain.connect(padGain.gain);
  padLfo.start();

  const filterLfo = context.createOscillator();
  const filterLfoGain = context.createGain();
  filterLfo.type = 'sine';
  filterLfo.frequency.value = 0.018;
  filterLfoGain.gain.value = 420;
  filterLfo.connect(filterLfoGain);
  filterLfoGain.connect(masterFilter.frequency);
  filterLfo.start();

  return {
    context,
    masterGain,
    padGain,
    shimmerGain,
    noiseGain,
    oscillators,
    lfos: [padLfo, filterLfo],
    noiseSource,
  };
}

export function AmbienceControl() {
  const nodesRef = useRef<SoundscapeNodes | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.08);

  useEffect(() => () => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    nodes.oscillators.forEach((oscillator) => oscillator.stop());
    nodes.lfos.forEach((lfo) => lfo.stop());
    nodes.noiseSource.stop();
    void nodes.context.close();
  }, []);

  const start = async () => {
    if (!nodesRef.current) {
      nodesRef.current = createSoundscape(volume);
    }

    await nodesRef.current.context.resume();
    setGain(nodesRef.current.masterGain, volume);
    setIsPlaying(true);
    setIsOpen(true);
  };

  const pause = async () => {
    const nodes = nodesRef.current;
    if (!nodes) return;

    setGain(nodes.masterGain, 0);
    window.setTimeout(() => {
      void nodes.context.suspend();
    }, 120);
    setIsPlaying(false);
  };

  const updateVolume = (_: Event, nextValue: number | number[]) => {
    const nextVolume = Array.isArray(nextValue) ? nextValue[0] : nextValue;
    setVolume(nextVolume);
    if (nodesRef.current && isPlaying) {
      setGain(nodesRef.current.masterGain, nextVolume);
    }
  };

  return (
    <Box
      component="aside"
      aria-label="Ambience controls"
      sx={{
        position: 'fixed',
        right: { xs: 12, sm: 24 },
        bottom: { xs: 12, sm: 24 },
        zIndex: 30,
        maxWidth: 'calc(100vw - 24px)',
      }}
    >
      <Stack
        spacing={isOpen ? 1.5 : 0}
        sx={{
          width: isOpen ? { xs: 276, sm: 320 } : 'auto',
          border: '1px solid rgba(255,255,255,0.16)',
          borderRadius: 999,
          p: isOpen ? 1.5 : 0.75,
          background: 'rgba(8,7,11,0.72)',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 18px 55px rgba(0,0,0,0.38)',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            size="small"
            variant={isPlaying ? 'outlined' : 'contained'}
            color="secondary"
            onClick={() => void (isPlaying ? pause() : start())}
            sx={{ borderRadius: 999, px: 2.25 }}
          >
            {isPlaying ? 'Pause soundscape' : 'Start soundscape'}
          </Button>
          <IconButton
            size="small"
            aria-label={isOpen ? 'Collapse ambience controls' : 'Expand ambience controls'}
            onClick={() => setIsOpen((value) => !value)}
            sx={{ color: 'text.secondary' }}
          >
            {isOpen ? '−' : '♫'}
          </IconButton>
        </Stack>

        {isOpen ? (
          <Box sx={{ px: 1, pb: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Soft Lattice drone. User-started, no autoplay.
            </Typography>
            <Slider
              aria-label="Soundscape volume"
              min={0}
              max={0.22}
              step={0.01}
              value={volume}
              onChange={updateVolume}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}
