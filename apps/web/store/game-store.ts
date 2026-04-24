'use client';

import { create } from 'zustand';
import { initialTimelineState, type TimelineState } from '@fractureline/shared-types';
import { resolveChoice } from '@fractureline/narrative-engine';
import { chapterOne } from '@/content/chapter-one';
import { indexedDbSaveService } from '@/lib/persistence/save-service';

type GameStore = {
  state: TimelineState;
  hasSave: boolean;
  isPersistenceReady: boolean;
  choose: (choiceId: string) => void;
  hydrateSaveStatus: () => Promise<void>;
  save: () => Promise<void>;
  load: () => Promise<boolean>;
  reset: () => Promise<void>;
};

export const useGameStore = create<GameStore>((set, get) => ({
  state: initialTimelineState,
  hasSave: false,
  isPersistenceReady: false,
  choose: (choiceId) => {
    const current = get().state;
    const next = resolveChoice(chapterOne, current, choiceId);
    set({ state: next });
  },
  hydrateSaveStatus: async () => {
    set({ hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true });
  },
  save: async () => {
    await indexedDbSaveService.write(get().state);
    set({ hasSave: true, isPersistenceReady: true });
  },
  load: async () => {
    const saved = await indexedDbSaveService.read();
    if (!saved) {
      set({ hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true });
      return false;
    }

    set({ state: saved, hasSave: true, isPersistenceReady: true });
    return true;
  },
  reset: async () => {
    set({ state: initialTimelineState, hasSave: await indexedDbSaveService.hasSave(), isPersistenceReady: true });
  },
}));
