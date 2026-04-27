# Finding 003 — No Custom 404 Page

**Severity:** Medium  
**Area:** UX / Engineering  
**Owner agent:** UI  
**Related next-step prompt:** [003-custom-404-page.md](../next-step-prompts/003-custom-404-page.md)

---

## Summary

When a user navigates to any invalid route (e.g., `/invalid-route-xyz`, a mistyped `/paly`, or a stale bookmark), they see the default bare Next.js 404 page with "404 — This page could not be found." and no navigation. There is no branding, no story-world framing, and no path back to the game.

---

## Evidence

Playwright test visited `/invalid-route-xyz`:

```
URL: http://127.0.0.1:3456/invalid-route-xyz
Body text: "404\nThis page could not be found."
```

Screenshot: `screenshots/09-not-found.png`

No `apps/web/app/not-found.tsx` file exists in the repository.

---

## Steps to Reproduce

1. Navigate to `https://fractureline.vercel.app/any-invalid-path`.
2. Observe: default Next.js 404 page with no Fractureline branding or navigation.

---

## Expected Behavior

A custom 404 page that:
- Is styled in the Fractureline visual identity
- Provides a heading in the world's voice (e.g., "This signal is lost in time.")
- Includes a link back to `/` and to `/play`
- Renders the SiteNav

---

## Actual Behavior

Bare Next.js white-background 404 page with black serif text: "404 — This page could not be found."

---

## Why It Matters

Any broken link, mistyped URL, or stale bookmark leaves the user with a jarring context break. The default Next.js 404 page is visually incompatible with the dark atmospheric design of the game. It provides no recovery path and no brand continuity.

---

## Recommendation

Create `apps/web/app/not-found.tsx` using Next.js App Router's built-in not-found convention. Style it to match the rest of the app using MUI and the existing SiteNav component.

---

## Acceptance Criteria

- [ ] `apps/web/app/not-found.tsx` exists
- [ ] Page includes SiteNav header
- [ ] Page includes a heading (e.g., "Signal lost." or "Timeline fracture.")
- [ ] Page includes links to `/` and `/play`
- [ ] Dark background (#08070b), white text, matching game aesthetic
- [ ] E2E test covers the 404 route

---

## Suggested GitHub Issue Title

`ux: add custom 404 not-found page with navigation`

## Suggested Labels

`ux`, `ui`, `medium`

---

## Screenshot References

- `screenshots/09-not-found.png` — current bare 404 page
