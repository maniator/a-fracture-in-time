# Finding 009 — No Skip-to-Content Link for Keyboard Users

**Severity:** Medium  
**Area:** Accessibility  
**Owner agent:** UI  
**Related next-step prompt:** [009-skip-to-content.md](../next-step-prompts/009-skip-to-content.md)

---

## Summary

There is no skip-navigation link at the top of any page. Keyboard users must Tab through three nav links (Fractureline logo, Play, Help) and then three save-control buttons (Save progress, Load progress, Restart chapter) before reaching the first narrative choice button. That is 6 Tab keypresses before the player can interact with the story.

---

## Evidence

Playwright keyboard navigation test on `/play`:

```
Tab 1: A "Fractureline" (logo link)
Tab 2: A "Play" (nav link)
Tab 3: A "Help" (nav link)
Tab 4: BUTTON "Save progress"
Tab 5: BUTTON "Load progress"
Tab 6: BUTTON "Restart chapter"
Tab 7: BUTTON "Admit the com broke again"  ← first narrative choice
Tab 8: BUTTON "Joke that Cybol technology clearly fears you"
```

No `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>` visible in source.

**Source reference:**
- `apps/web/components/site-nav.tsx` (no skip link)
- `apps/web/app/play/page.tsx` (no `id="main-content"` anchor)

---

## Steps to Reproduce

1. Open `/play` with keyboard focus at the address bar.
2. Press Tab repeatedly.
3. Count how many presses are required before the first narrative choice receives focus.
4. Observe: minimum 7 Tab presses.

---

## Expected Behavior

A visually hidden skip-navigation link appears as the first focusable element on all pages. When focused (via Tab), it becomes visible and reads "Skip to main content". When activated, it moves focus to the `<main>` element or the first choice button.

---

## Actual Behavior

No skip link. Keyboard users must traverse the full navigation bar and all save controls before reaching choices. On the home page, they must also tab through four character cards before reaching the "Start Chapter 1" link.

---

## Why It Matters

WCAG 2.4.1 (Level A) requires a mechanism to bypass blocks of repeated navigation. While the current navigation is short (3 links), the play page adds 3 save controls as additional repeated overhead. For a text-heavy game, keyboard access to choices is critical. This is a Level A violation.

---

## Recommendation

Add a visually-hidden, focus-visible skip link as the first child of `<body>` or each page's `<main>`:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-secondary ...">
  Skip to main content
</a>
```

Add `id="main-content"` to the `<Container>` in `apps/web/app/play/page.tsx`. Tailwind's `sr-only` utility class is already imported via `globals.css`.

---

## Acceptance Criteria

- [ ] Skip link is the first focusable element on all pages
- [ ] Skip link is visually hidden until focused
- [ ] Skip link becomes visible on focus with clear styling
- [ ] Activating the skip link moves focus to `#main-content`
- [ ] Verified with keyboard-only navigation on `/play` — choices reachable in ≤2 Tab presses after skip link

---

## Suggested GitHub Issue Title

`a11y: add skip-to-content link for keyboard navigation (WCAG 2.4.1)`

## Suggested Labels

`accessibility`, `wcag`, `medium`
