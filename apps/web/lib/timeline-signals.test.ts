import { describe, expect, it } from 'vitest';
import { initialTimelineState } from '@fractureline/shared-types';
import { getSignalLevel, getTimelineSignals } from './timeline-signals';

describe('timeline signals', () => {
  it('derives Order, Truth, and Disruption from internal timeline variables', () => {
    const signals = getTimelineSignals({
      ...initialTimelineState,
      stability: 2,
      controlIndex: 3,
      memoryFracture: 4,
      rebellion: 1,
      magicEntropy: 5,
    });

    const order = signals.find((signal) => signal.key === 'order');
    const truth = signals.find((signal) => signal.key === 'truth');
    const disruption = signals.find((signal) => signal.key === 'disruption');

    expect(order?.value).toBe(5);
    expect(truth?.value).toBe(4);
    expect(disruption?.value).toBe(6);
  });

  it('maps signal levels at all boundaries', () => {
    expect(getSignalLevel(0)).toBe('Quiet');
    expect(getSignalLevel(1)).toBe('Rising');
    expect(getSignalLevel(3)).toBe('Rising');
    expect(getSignalLevel(4)).toBe('Strong');
    expect(getSignalLevel(6)).toBe('Strong');
    expect(getSignalLevel(7)).toBe('Dominant');
  });

  it('clamps negative derived signal values to Quiet level', () => {
    const signals = getTimelineSignals({
      ...initialTimelineState,
      stability: -5,
      controlIndex: 1,
      memoryFracture: -2,
      rebellion: -1,
      magicEntropy: 0,
    });

    for (const signal of signals) {
      expect(signal.value).toBe(0);
      expect(signal.level).toBe('Quiet');
    }
  });
});
