import Dexie, { type Table } from 'dexie';
import type { TimelineState } from '@fractureline/shared-types';

const LEGACY_SAVE_KEY = 'fractureline:save:v1';
const SAVE_VERSION = 1;
const AUTOSAVE_ID = 'autosave';

export type SavePayload = {
  version: typeof SAVE_VERSION;
  state: TimelineState;
};

export type LocalSaveRecord = {
  id: string;
  slotName: string;
  version: typeof SAVE_VERSION;
  state: TimelineState;
  createdAt: string;
  updatedAt: string;
};

export interface SaveService {
  hasSave(): Promise<boolean>;
  read(): Promise<TimelineState | null>;
  write(state: TimelineState): Promise<void>;
  clear(): Promise<void>;
}

class FracturelineDatabase extends Dexie {
  saves!: Table<LocalSaveRecord, string>;

  constructor() {
    super('fractureline-local');
    this.version(1).stores({
      saves: 'id, slotName, updatedAt',
    });
  }
}

const db = new FracturelineDatabase();

function isBrowser() {
  return typeof window !== 'undefined';
}

function readLegacySave(): TimelineState | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(LEGACY_SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavePayload>;
    return parsed.version === SAVE_VERSION && parsed.state ? parsed.state : null;
  } catch {
    return null;
  }
}

function clearLegacySave() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LEGACY_SAVE_KEY);
}

async function migrateLegacySaveIfNeeded() {
  if (!isBrowser()) return;

  const existing = await db.saves.get(AUTOSAVE_ID);
  if (existing) return;

  const legacy = readLegacySave();
  if (!legacy) return;

  await indexedDbSaveService.write(legacy);
  clearLegacySave();
}

export const indexedDbSaveService: SaveService = {
  async hasSave() {
    if (!isBrowser()) return false;
    await migrateLegacySaveIfNeeded();
    return Boolean(await db.saves.get(AUTOSAVE_ID));
  },

  async read() {
    if (!isBrowser()) return null;
    await migrateLegacySaveIfNeeded();
    const record = await db.saves.get(AUTOSAVE_ID);
    return record?.version === SAVE_VERSION ? record.state : null;
  },

  async write(state) {
    if (!isBrowser()) return;

    const now = new Date().toISOString();
    const existing = await db.saves.get(AUTOSAVE_ID);

    await db.saves.put({
      id: AUTOSAVE_ID,
      slotName: 'Autosave',
      version: SAVE_VERSION,
      state,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    });
  },

  async clear() {
    if (!isBrowser()) return;
    await db.saves.delete(AUTOSAVE_ID);
    clearLegacySave();
  },
};
