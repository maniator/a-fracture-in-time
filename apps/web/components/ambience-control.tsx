'use client';

import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type AmbienceNodeSet = {
  context: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

export function AmbienceControl() {
  const nodesRef = useRef<AmbienceNodeSet | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.18);

  const start = async () => {
    if (nodesRef.current) {
      await nodesRef.current.context.resume();
      setIsPlaying(true);
      return;
    }

    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.value = volume;
    gain.connect(context.destination);

    const frequencies = [146.83, 220, 329.63];
    const oscillators = frequencies.map((frequency, index) => {
      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      const localGain = context.createGain();

      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index * 3;
      filter.type = 'lowpass';
      filter.frequency.value = 720 + index * 120;
      localGain.gain.value = index === 0 ? 0.42 : 0.18;

      oscillator.connect(filter);
      filter.connect(localGain);
      localGain.connect(gain);
      oscillator.start();
      return oscillator;
    });

    nodesRef.current = { context, gain, oscillators };
    setIsPlaying(true);
  };

  const stop = async () => {
    await nodesRef.current?.context.suspend();
    setIsPlaying(false);
  };

  const updateVolume = (_: Event, nextValue: number | number[]) => {
    const nextVolume = Array.isArray(nextValue) ? nextValue[0] : nextValue;
    setVolume(nextVolume);
    if (nodesRef.current) {
      nodesRef.current.gain.gain.value = nextVolume;
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
        width: { xs: 236, sm: 280 },
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 4,
        p: 2,
        background: 'rgba(8,7,11,0.86)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 18px 55px rgba(0,0,0,0.45)',
      }}
    >
      <Stack spacing={1.25}>
        <Typography variant="caption" sx={{ letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary' }}>
          Ambience
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Button size="small" variant={isPlaying ? 'outlined' : 'contained'} color="secondary" onClick={() => void (isPlaying ? stop() : start())}>
            {isPlaying ? 'Mute' : 'Play'}
          </Button>
          <Slider
            aria-label="Ambience volume"
            min={0}
            max={0.5}
            step={0.01}
            value={volume}
            onChange={updateVolume}
            size="small"
            sx={{ mx: 1 }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
