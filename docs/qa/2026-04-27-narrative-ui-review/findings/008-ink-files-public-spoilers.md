# Finding 008 — Chapter Pack Ink Files Are Publicly Readable (Full Narrative Spoilers)

**Severity:** Medium  
**Area:** Engineering / Narrative Integrity  
**Owner agent:** Engineering + Narrative Designer  
**Related next-step prompt:** [008-ink-files-spoiler-risk.md](../next-step-prompts/008-ink-files-spoiler-risk.md)

---

## Summary

All chapter pack `.ink` files are served directly from the `/chapter-packs/` public route. Any user can navigate to `https://fractureline.vercel.app/chapter-packs/chapter-1.ink` and read the full branching narrative including all choice paths, ending keys, variable assignments, and chapter outcomes — before playing through them. This is a spoiler risk for all content from Chapter 1 through Chapter 5.

---

## Evidence

Playwright confirmed all chapter pack files return HTTP 200:

```
chapter-1.ink        → 200 (19,013 bytes)
chapter-2-signal.ink → 200
chapter-2-family.ink → 200
chapter-2-history.ink → 200
chapter-3-signal.ink → 200
chapter-3-family.ink → 200
chapter-3-history.ink → 200
chapter-4-*.ink      → 200 (all 6 routes)
chapter-5-*.ink      → 200 (all 3 routes)
```

Sample content from a direct fetch of `chapter-1.ink`:

```ink
VAR stability = 0
VAR endingKey = ""
...
+ [Ask Zelda what the family line means]
    -> ch1_zelda_family
+ [Focus on Diderram and ignore the family warning]
    -> ch1_zelda_history
```

This reveals all branch points, all choice labels, all scene IDs, all ending keys, and all variable effects.

**Source reference:**
- `apps/web/public/chapter-packs/` (all `.ink` files)
- `apps/web/lib/chapter-packs/chapter-pack-cache.ts` (fetch strategy: `fetch(pack.route, { cache: 'no-store' })`)

---

## Steps to Reproduce

1. Navigate to `https://fractureline.vercel.app/chapter-packs/chapter-1.ink` in any browser.
2. Read the full branching narrative including all choices, endings, and variable logic.

---

## Expected Behavior

**Option A (preferred):** Chapter pack content is not directly readable as plain text. It could be obfuscated, served from a signed URL, or compiled to a binary format.

**Option B (acceptable):** Files remain public but this is documented as an intentional trade-off for the offline-first caching architecture. A note is added to the project README acknowledging that the raw narrative source is publicly readable.

---

## Actual Behavior

Full narrative source is readable at predictable, un-authenticated public URLs.

---

## Why It Matters

Players who discover these URLs (intentionally or via devtools) can read all spoilers without playing. For a story-driven game where mystery and discovery are core mechanics, this is a meaningful design compromise. The risk is low for casual players but high for curious ones. The `.ink` format also reveals all variable names and scoring logic, which could be used to "game" the ending system.

---

## Recommendation

Short-term: Accept as a known trade-off and document it. The offline-first caching model requires the client to fetch the full ink source, making true obfuscation complex. Document in `ARCHITECTURE.md` or the project README.

Long-term: Compile `.ink` to a binary JSON format (Ink's `story.json` compiled output), which is harder to read but still technically decompilable. Alternatively, use a signed download token if a backend is introduced.

---

## Acceptance Criteria

- [ ] Either: A documented decision acknowledging ink files are public and explaining the trade-off
- [ ] Or: A technical approach that meaningfully reduces spoiler risk (compiled format, etc.)

---

## Suggested GitHub Issue Title

`engineering: document or mitigate publicly readable chapter pack ink files`

## Suggested Labels

`engineering`, `narrative`, `medium`, `architecture`
