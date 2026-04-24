'use client';

import { create } from 'zustand';
import { initialTimelineState, type TimelineState } from '@fractureline/shared-types';
import { resolveChoice } from '@fractureline/narrative-engine';
import { chapterOne } from '@/content/chapter-one';
import { browserSaveService } from '@/lib/persistence/save-service';

type GameStore = {
  state: TimelineState;
  hasSave: boolean;
  choose: (choiceId: string) => void;
  save: () => void;
  load: () => boolean;
  reset: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  state: initialTimelineState,
  hasSave: false,
  choose: (choiceId) => {
    const current = get().state;
    const next = resolveChoice(chapterOne, current, choiceId);
    set({ state: next });
  },
  save: () => {
    browserSaveService.write(get().state);
    set({ hasSave: true });
  },
  load: () => {
    const saved = browserSaveService.read();
    if (!saved) {
      set({ hasSave: browserSaveService.hasSave() });
      return false;
    }

    set({ state: saved, hasSave: true });
    return true;
  },
  reset: () => set({ state: initialTimelineState, hasSave: browserSaveService.hasSave() }),
}));
