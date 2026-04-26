import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chapterPackManifest } from '../lib/chapter-packs/chapter-pack-cache';

const WORDS_PER_MINUTE = 150;
const MIN_CHAPTER_TWO_MINUTES = 20;
const MIN_CHAPTER_TWO_WORDS = WORDS_PER_MINUTE * MIN_CHAPTER_TWO_MINUTES;

function readChapterPack(route: string) {
  return readFileSync(join(process.cwd(), `public${route}`), 'utf8');
}

function countWords(text: string) {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

describe('Chapter 2 route length guardrail', () => {
  it('keeps every Chapter 2 pack above the 20 minute reading baseline', () => {
    const chapterTwoPacks = chapterPackManifest.filter((pack) => pack.chapter === 2);

    for (const pack of chapterTwoPacks) {
      const words = countWords(readChapterPack(pack.route));
      expect(words, `${pack.id} only has ${words} words`).toBeGreaterThanOrEqual(MIN_CHAPTER_TWO_WORDS);
      expect(pack.estimatedMinutes, `${pack.id} estimatedMinutes should advertise 20+ minutes`).toBeGreaterThanOrEqual(
        MIN_CHAPTER_TWO_MINUTES,
      );
    }
  });
});
