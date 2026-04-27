# Prompt 002 — Add Open Graph and Social Share Metadata

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/002-no-og-social-meta.md](../findings/002-no-og-social-meta.md)  
**Task type:** Frontend / SEO  
**BMAD owner agent:** UI  

---

## Goal

Add Open Graph, Twitter Card, and per-page title metadata so that sharing any Fractureline URL on social platforms produces a rich preview card with title, description, and an image.

---

## Context

The app currently has only a basic `<title>Fractureline</title>` and `<meta name="description">` in `apps/web/app/layout.tsx`. There are no `og:*` or `twitter:*` meta tags. All pages share the same title.

When the URL is shared on Discord, Slack, Twitter/X, or iMessage, no preview card appears. This is a significant barrier for organic sharing of a narrative web game where links are shared constantly between players.

---

## Scope

- Add `openGraph` and `twitter` to the root `metadata` export in `layout.tsx`
- Create or export a static OG image asset (1200×630 PNG)
- Add per-page `metadata` exports to `play/page.tsx` and `help/page.tsx`
- Add a canonical URL

---

## Non-Goals

- Do not add dynamic OG images per scene or chapter (that's a future enhancement)
- Do not add JSON-LD structured data (separate task)
- Do not change any game logic or narrative content
- Do not add new dependencies (Next.js metadata API is sufficient)

---

## Implementation Guidance

1. In `apps/web/app/layout.tsx`, extend the `metadata` export:

```ts
export const metadata: Metadata = {
  title: {
    default: 'Fractureline',
    template: '%s · Fractureline',
  },
  description: '...',
  openGraph: {
    type: 'website',
    siteName: 'Fractureline',
    title: 'Fractureline — A Dual Timeline Narrative Game',
    description: 'Play across two eras of Ayker. A utopia in the past. A dystopia in the future. One signal between them.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fractureline' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractureline — A Dual Timeline Narrative Game',
    description: '...',
    images: ['/og-image.png'],
  },
};
```

2. Create a static OG image at `apps/web/public/og-image.png` (1200×630). It can be a simple dark image with the game title and tagline. The existing radial gradient from `globals.css` (purple top-left, amber bottom-right, `#08070b` base) is a good starting point.

3. Add per-page metadata to `play/page.tsx`:

```ts
export const metadata: Metadata = {
  title: 'Play',
  description: 'Start your journey through Ayker. Make choices that reshape two timelines.',
};
```

4. Add per-page metadata to `help/page.tsx`:

```ts
export const metadata: Metadata = {
  title: 'Player Guide',
  description: 'How to play Fractureline — choices, timeline signals, saves, and ambience.',
};
```

---

## Likely Files

```
apps/web/app/layout.tsx
apps/web/app/play/page.tsx
apps/web/app/help/page.tsx
apps/web/public/og-image.png  (new)
```

---

## Acceptance Criteria

- [ ] `og:title`, `og:description`, `og:image`, `og:type` present on all pages
- [ ] `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` present
- [ ] OG image at `/og-image.png` returns HTTP 200 and is 1200×630
- [ ] `/play` title tag reads "Play · Fractureline"
- [ ] `/help` title tag reads "Player Guide · Fractureline"
- [ ] Validated with `pnpm build` — no metadata errors in Next.js output
- [ ] Optionally: verify with `curl -s https://fractureline.vercel.app/ | grep og:` after deploy

---

## Testing Requirements

- `pnpm build` — no errors
- Inspect `view-source:http://localhost:3000/` — confirm og meta tags present
- Test with opengraph.xyz or Twitter card validator after deploy

---

## Commit Hygiene

```
feat(seo): add Open Graph, Twitter Card, and per-page title metadata
```

---

## Final Response Requirements

- Confirm OG image file was created and its dimensions
- Confirm meta tags are present in the built HTML
- Note any title template decisions made
