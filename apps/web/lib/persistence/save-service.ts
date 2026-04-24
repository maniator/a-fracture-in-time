import type { TimelineState } from '@fractureline/shared-types';

const SAVE_KEY = 'fractureline:save:v1';
const SAVE_VERSION = 1;

export type SavePayload = {
  version: typeof SAVE_VERSION;
  state: TimelineState;
};

export interface SaveService {
  hasSave(): boolean;
  read(): TimelineState | null;
  write(state: TimelineState): void;
  clear(): void;
}

export const browserSaveService: SaveService = {
  hasSave() {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(SAVE_KEY) !== null;
  },

  read() {
    if (typeof window === 'undefined') return null;

    try {
      const raw = window.localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<SavePayload>;
      return parsed.version === SAVE_VERSION && parsed.state ? parsed.state : null;
    } catch {
      return null;
    }
  },

  write(state) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SAVE_KEY, JSON.stringify({ version: SAVE_VERSION, state } satisfies SavePayload));
  },

  clear() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(SAVE_KEY);
  },
};
