const chapterCompletionFlagsByChapter: Record<number, string[]> = {
  1: ['chapter-one-complete', 'chapterOneComplete'],
  2: ['chapter-two-complete', 'chapterTwoComplete'],
  3: ['chapter-three-complete', 'chapterThreeComplete'],
  4: ['chapter-four-complete', 'chapterFourComplete'],
  5: ['chapter-five-complete', 'chapterFiveComplete'],
};

export function isChapterComplete(flags: Record<string, unknown>, chapter: number) {
  const completionFlags = chapterCompletionFlagsByChapter[chapter];
  if (!completionFlags) {
    return false;
  }

  return completionFlags.some((completionFlag) => Boolean(flags[completionFlag]));
}
