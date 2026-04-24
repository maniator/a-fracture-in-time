'use client';

import { create } from 'zustand';
import { initialTimelineState, type TimelineState } from '@fractureline/shared-types';
import { resolveChoice } from '@fractureline/narrative-engine';
import { chapterOne } from '@/content/chapter-one';

type GameStore = {
  state: TimelineState;
  choose: (choiceId: string) => void;
  reset: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  state: initialTimelineState,
  choose: (choiceId) => {
    const current = get().state;
    const next = resolveChoice(chapterOne, current, choiceId);
    set({ state: next });
  },
  reset: () => set({ state: initialTimelineState }),
}));
