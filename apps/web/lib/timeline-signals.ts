import type { TimelineState } from '@fractureline/shared-types';

export type TimelineSignalKey = 'order' | 'truth' | 'disruption';

export type TimelineSignalLevel = 'Quiet' | 'Rising' | 'Strong' | 'Dominant';

export type TimelineSignal = {
  key: TimelineSignalKey;
  label: string;
  value: number;
  level: TimelineSignalLevel;
  description: string;
};

function clampSignalValue(value: number) {
  return Math.max(0, value);
}

export function getSignalLevel(value: number): TimelineSignalLevel {
  const clampedValue = clampSignalValue(value);

  if (clampedValue === 0) return 'Quiet';
  if (clampedValue <= 3) return 'Rising';
  if (clampedValue <= 6) return 'Strong';
  return 'Dominant';
}

export function getTimelineSignals(state: TimelineState): TimelineSignal[] {
  const signalValues: Record<TimelineSignalKey, number> = {
    order: clampSignalValue(state.stability + state.controlIndex),
    truth: clampSignalValue(state.memoryFracture),
    disruption: clampSignalValue(state.rebellion + state.magicEntropy),
  };

  return [
    {
      key: 'order',
      label: 'Order',
      value: signalValues.order,
      level: getSignalLevel(signalValues.order),
      description: 'Process, safety, verification, and institutional pressure.',
    },
    {
      key: 'truth',
      label: 'Truth',
      value: signalValues.truth,
      level: getSignalLevel(signalValues.truth),
      description: 'Recovered memory, hidden history, and witness evidence.',
    },
    {
      key: 'disruption',
      label: 'Disruption',
      value: signalValues.disruption,
      level: getSignalLevel(signalValues.disruption),
      description: 'Resistance, exposure, magical pressure, and unstable change.',
    },
  ];
}
