# Prompt 008 — Document or Mitigate Publicly Readable Ink Files

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/008-ink-files-public-spoilers.md](../findings/008-ink-files-public-spoilers.md)  
**Task type:** Architecture decision + optional engineering  
**BMAD owner agent:** Engineering + Architect  

---

## Goal

Either formally document the trade-off of publicly readable chapter pack ink files, or implement a mitigation that reduces spoiler risk while preserving the offline-first caching architecture.

---

## Context

All chapter pack `.ink` source files are served at public, predictable URLs (`/chapter-packs/chapter-1.ink`, etc.). They are fetched by the client and cached in CacheStorage for offline play. This is intentional for the offline-first architecture.

However, a player who visits `https://fractureline.vercel.app/chapter-packs/chapter-1.ink` directly can read the full branching narrative, all choice labels, all ending keys, and all variable effects before playing. This is a spoiler risk.

The existing `chapter-pack-cache.ts` fetches with `cache: 'no-store'` and stores in CacheStorage. This architecture works correctly.

---

## Scope

**Option A (document only — fast):**
- Add a section to `ARCHITECTURE.md` or `README.md` acknowledging that ink files are publicly readable
- Document this as an accepted trade-off for the offline-first model
- No code changes required

**Option B (compile to ink JSON — medium effort):**
- Use inkjs's compiler to pre-compile `.ink` files to the binary `.story.json` format during build
- Serve `.story.json` instead of `.ink` source
- The JSON format is less human-readable but is technically decompilable
- Update `chapter-pack-cache.ts` and `narrative-engine` to consume `.story.json`

**Option C (signed URL / CDN token — future, requires backend):**
- Not in scope for current session

---

## Non-Goals

- Do not break the offline caching architecture
- Do not require a backend or authentication for chapter pack access
- Do not change narrative content

---

## Implementation Guidance

**If choosing Option A:**
Add to `docs/ARCHITECTURE.md` (or create it if it doesn't exist):

```markdown
## Chapter Pack Serving

Chapter pack `.ink` files are served from `/public/chapter-packs/` as static assets. 
They are fetched client-side and stored in CacheStorage for offline play.

**Trade-off:** The raw `.ink` source, including all branch paths and ending keys, is 
publicly readable by any user who accesses the URL directly. This is an accepted 
trade-off for the offline-first architecture. A future mitigation could compile packs 
to ink's binary JSON format during build.
```

**If choosing Option B:**
- Run `node-inkstory` or `inkjs` compiler in the Next.js build script to output `.story.json` files
- Update the route paths in `chapter-pack-cache.ts` to use `.story.json`
- Update the narrative engine's `compileInkStory` adapter to accept compiled JSON (inkjs supports this)

---

## Likely Files

```
docs/ARCHITECTURE.md  (Option A or B)
apps/web/lib/chapter-packs/chapter-pack-cache.ts  (Option B)
packages/narrative-engine/src/ink-adapter.ts  (Option B)
```

---

## Acceptance Criteria

**Option A:**
- [ ] `ARCHITECTURE.md` or project README documents the trade-off
- [ ] The entry is clear about what is readable and why it's acceptable

**Option B (if pursued):**
- [ ] `.ink` source files are no longer directly served to browsers
- [ ] `.story.json` compiled files are served instead
- [ ] Offline caching still works
- [ ] All e2e tests pass

---

## Testing Requirements

- Option A: No automated tests needed — review docs
- Option B: `pnpm test:e2e` full pass; verify offline chapter loading still works

---

## Commit Hygiene

Option A:
```
docs: document chapter pack public serving trade-off
```

Option B:
```
feat(engineering): compile ink packs to story JSON for serving
```

---

## Final Response Requirements

- State which option was chosen and why
- If Option A: paste the documentation added
- If Option B: confirm all e2e tests pass and ink files are no longer directly accessible
