import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chapterPackManifest } from '../lib/chapter-packs/chapter-pack-cache';

const WORDS_PER_MINUTE = 150;
const MIN_CHAPTER_THREE_MINUTES = 20;
const MAX_CHAPTER_THREE_MINUTES = 30;
const MIN_CHAPTER_THREE_WORDS = WORDS_PER_MINUTE * MIN_CHAPTER_THREE_MINUTES;

function readChapterPack(route: string) {
  return readFileSync(join(process.cwd(), `public${route}`), 'utf8');
}

function countWords(text: string) {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

describe('Chapter 3 route length guardrail', () => {
  it('keeps every Chapter 3 pack inside the 20-30 minute reading target', () => {
    const chapterThreePacks = chapterPackManifest.filter((pack) => pack.chapter === 3);

    for (const pack of chapterThreePacks) {
      const words = countWords(readChapterPack(pack.route));
      expect(words, `${pack.id} only has ${words} words`).toBeGreaterThanOrEqual(MIN_CHAPTER_THREE_WORDS);
      expect(pack.estimatedMinutes, `${pack.id} estimatedMinutes should advertise 20+ minutes`).toBeGreaterThanOrEqual(
        MIN_CHAPTER_THREE_MINUTES,
      );
      expect(pack.estimatedMinutes, `${pack.id} estimatedMinutes should stay within 20-30 minute target`).toBeLessThanOrEqual(
        MAX_CHAPTER_THREE_MINUTES,
      );
    }
  });
});
