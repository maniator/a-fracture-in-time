import { describe, expect, it } from 'vitest';
import { isChapterComplete } from './chapter-completion';

describe('isChapterComplete', () => {
  it('returns true for chapter four when chapter-four-complete flag is set', () => {
    expect(isChapterComplete({ 'chapter-four-complete': true }, 4)).toBe(true);
  });

  it('returns true for chapter four when chapterFourComplete flag is set', () => {
    expect(isChapterComplete({ chapterFourComplete: true }, 4)).toBe(true);
  });

  it('returns false for chapter four when no completion flag is set', () => {
    expect(isChapterComplete({}, 4)).toBe(false);
  });
});
