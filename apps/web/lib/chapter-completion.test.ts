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

  it('returns true for chapter one with hyphenated flag', () => {
    expect(isChapterComplete({ 'chapter-one-complete': true }, 1)).toBe(true);
  });

  it('returns true for chapter one with camelCase flag', () => {
    expect(isChapterComplete({ chapterOneComplete: true }, 1)).toBe(true);
  });

  it('returns false for chapter one when no flag is set', () => {
    expect(isChapterComplete({}, 1)).toBe(false);
  });

  it('returns true for chapter two with hyphenated flag', () => {
    expect(isChapterComplete({ 'chapter-two-complete': true }, 2)).toBe(true);
  });

  it('returns true for chapter two with camelCase flag', () => {
    expect(isChapterComplete({ chapterTwoComplete: true }, 2)).toBe(true);
  });

  it('returns false for chapter two when no flag is set', () => {
    expect(isChapterComplete({}, 2)).toBe(false);
  });

  it('returns true for chapter three with hyphenated flag', () => {
    expect(isChapterComplete({ 'chapter-three-complete': true }, 3)).toBe(true);
  });

  it('returns true for chapter three with camelCase flag', () => {
    expect(isChapterComplete({ chapterThreeComplete: true }, 3)).toBe(true);
  });

  it('returns false for chapter three when no flag is set', () => {
    expect(isChapterComplete({}, 3)).toBe(false);
  });

  it('returns true for chapter five with hyphenated flag', () => {
    expect(isChapterComplete({ 'chapter-five-complete': true }, 5)).toBe(true);
  });

  it('returns true for chapter five with camelCase flag', () => {
    expect(isChapterComplete({ chapterFiveComplete: true }, 5)).toBe(true);
  });

  it('returns false for chapter five when no flag is set', () => {
    expect(isChapterComplete({}, 5)).toBe(false);
  });

  it('returns false for an unknown chapter number', () => {
    expect(isChapterComplete({ 'chapter-six-complete': true }, 6)).toBe(false);
  });

  it('ignores unrelated flags', () => {
    expect(isChapterComplete({ 'chapter-one-complete': true, someOtherFlag: true }, 2)).toBe(false);
  });
});
