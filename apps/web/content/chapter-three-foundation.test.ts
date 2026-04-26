import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function readPack(filename: string) {
  return readFileSync(join(process.cwd(), `public/chapter-packs/${filename}`), 'utf8');
}

describe('Chapter 3 foundation packs', () => {
  it('include irreversible governance splits and chapter-complete exits', () => {
    const packs = ['chapter-3-signal.ink', 'chapter-3-family.ink', 'chapter-3-history.ink'];

    for (const pack of packs) {
      const source = readPack(pack);
      expect(source).toContain('irreversible');
      expect(source).toContain('chapterThreeComplete = true');
      expect(source).toContain('End Chapter 3');
    }
  });
});
