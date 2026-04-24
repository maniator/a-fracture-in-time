'use client';

import { create } from 'zustand';
import { initialTimelineState, type TimelineState } from '@fractureline/shared-types';
import { resolveChoice } from '@fractureline/narrative-engine';
import { chapterOne } from '@/content/chapter-one';

const SAVE_KEY = 'fractureline:save:v1';

type GameStore = {
  state: TimelineState;
  hasSave: boolean;
  choose: (choiceId: string) => void;
  save: () => void;
  load: () => boolean;
  reset: () => void;
};

function readSavedState(): TimelineState | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { version?: number; state?: TimelineState };
    return parsed.version === 1 && parsed.state ? parsed.state : null;
  } catch {
    return null;
  }
}

function writeSavedState(state: TimelineState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SAVE_KEY, JSON.stringify({ version: 1, state }));
}

function hasSavedState() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(SAVE_KEY) !== null;
}

export const useGameStore = create<GameStore>((set, get) => ({
  state: initialTimelineState,
  hasSave: false,
  choose: (choiceId) => {
    const current = get().state;
    const next = resolveChoice(chapterOne, current, choiceId);
    set({ state: next });
  },
  save: () => {
    writeSavedState(get().state);
    set({ hasSave: true });
  },
  load: () => {
    const saved = readSavedState();
    if (!saved) {
      set({ hasSave: hasSavedState() });
      return false;
    }

    set({ state: saved, hasSave: true });
    return true;
  },
  reset: () => set({ state: initialTimelineState, hasSave: hasSavedState() }),
}));
