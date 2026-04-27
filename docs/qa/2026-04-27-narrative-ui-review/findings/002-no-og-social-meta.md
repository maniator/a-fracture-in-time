# Finding 002 — No Open Graph or Social Share Metadata

**Severity:** High  
**Area:** SEO / Discoverability / Product  
**Owner agent:** PM + UI  
**Related next-step prompt:** [002-add-og-social-meta.md](../next-step-prompts/002-add-og-social-meta.md)

---

## Summary

The app has a basic `<title>` ("Fractureline") and `<meta name="description">` but no Open Graph (`og:`) or Twitter Card metadata. When the URL is shared on social platforms (Slack, Discord, Twitter/X, iMessage, etc.) there is no preview image, no formatted title, and no description card. This is a major barrier to organic word-of-mouth growth.

---

## Evidence

Playwright test captured all meta tags on `/`:

```json
{
  "title": "Fractureline",
  "description": "A dual-perspective narrative web game where choices rewrite time.",
  "ogTitle": null,
  "ogDescription": null,
  "ogImage": null,
  "canonical": null
}
```

Source confirms no OG metadata in the Next.js Metadata export:

```ts
// apps/web/app/layout.tsx
export const metadata: Metadata = {
  title: 'Fractureline',
  description: 'A dual-perspective narrative web game where choices rewrite time.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Fractureline',
  // No openGraph, no twitter, no canonical
};
```

**Source reference:** `apps/web/app/layout.tsx`

---

## Steps to Reproduce

1. Share `https://fractureline.vercel.app/` in a Slack/Discord/Twitter message.
2. Observe: no preview card, no image, plain URL text only.

---

## Expected Behavior

Sharing the URL produces a rich preview with:
- Title: "Fractureline — A Dual Timeline Narrative Game"
- Description: "Play across two eras of Ayker. In 874cy, Xav studies inside Cybol's polished world. In 23ac, Zelda searches the ruins."
- OG image: a custom 1200×630 card image
- Twitter card type: `summary_large_image`

---

## Actual Behavior

No rich preview. Platforms display only the bare URL or a plain link.

---

## Why It Matters

Narrative web games are highly shareable if the link preview is compelling. Discord and Twitter/X are primary vectors for this genre's audience. Without OG tags, every share is a dead link from a marketing perspective. This is a launch-readiness gap.

---

## Recommendation

Add OG and Twitter Card meta to `apps/web/app/layout.tsx` using Next.js `Metadata` type. Create a 1200×630 OG image (can be a static PNG initially). Add per-page titles using Next.js `generateMetadata` or `metadata` exports on each page.

---

## Acceptance Criteria

- [ ] `og:title`, `og:description`, `og:image`, `og:type`, `og:url` present on all pages
- [ ] `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` present
- [ ] OG image asset exists in `/public/` at ≥1200×630
- [ ] Per-page titles: "Play · Fractureline", "Help · Fractureline" etc.
- [ ] Validated with [opengraph.xyz](https://www.opengraph.xyz/) or similar

---

## Suggested GitHub Issue Title

`seo: add Open Graph and Twitter Card metadata for social sharing`

## Suggested Labels

`seo`, `marketing`, `high`, `launch-blocker`
