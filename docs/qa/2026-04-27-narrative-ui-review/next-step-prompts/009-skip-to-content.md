# Prompt 009 — Add Skip-to-Content Link for Keyboard Navigation

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/009-no-skip-to-content.md](../findings/009-no-skip-to-content.md)  
**Task type:** Accessibility  
**BMAD owner agent:** UI  

---

## Goal

Add a visually-hidden, focus-visible skip-navigation link as the first focusable element on all pages so keyboard users can reach narrative choices in ≤2 Tab presses. This resolves a WCAG 2.4.1 (Level A) requirement.

---

## Context

The play page requires 7 Tab presses before the first narrative choice button receives focus:

```
Tab 1: Logo link
Tab 2: Play nav link
Tab 3: Help nav link
Tab 4: Save progress button
Tab 5: Load progress button
Tab 6: Restart chapter button
Tab 7: First choice button ← player can finally interact
```

A skip link as the first focusable element would allow:
```
Tab 1: Skip link (activate → jump to main content)
Tab 2: First choice button
```

Tailwind's `sr-only` utility class is already available (`globals.css` imports Tailwind). MUI `Box` can be used with `component="a"`.

---

## Scope

- Add a skip link to `SiteNav` or to each page's layout
- The skip link must be visually hidden by default but visible on focus
- The target anchor must be added to each page's main content container

---

## Non-Goals

- Do not add skip links to every nested section
- Do not change the save/load button order or tab order otherwise
- Do not add ARIA roles that aren't already used

---

## Implementation Guidance

**Step 1:** Add a skip link to `apps/web/components/site-nav.tsx`, as the first rendered element before the `<AppBar>`:

```tsx
<>
  <a
    href="#main-content"
    style={{
      position: 'absolute',
      left: '-9999px',
      top: 'auto',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    }}
    onFocus={(e) => {
      e.currentTarget.style.cssText = 
        'position:fixed;top:16px;left:16px;z-index:9999;background:#7c3aed;color:#fff;padding:8px 16px;border-radius:4px;font-weight:700;text-decoration:none;width:auto;height:auto;overflow:visible;';
    }}
    onBlur={(e) => {
      e.currentTarget.style.cssText = 
        'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;';
    }}
  >
    Skip to main content
  </a>
  <AppBar ...>
```

Or use Tailwind's `sr-only focus:not-sr-only` pattern with `className`.

**Step 2:** Add `id="main-content"` to the `<Container>` in each page:

```tsx
// apps/web/app/play/page.tsx
<Container id="main-content" maxWidth="lg" ...>
```

```tsx
// apps/web/app/page.tsx (home)
<Container id="main-content" maxWidth="lg" ...>
```

```tsx
// apps/web/app/help/page.tsx
<Container id="main-content" maxWidth="lg" ...>
```

---

## Likely Files

```
apps/web/components/site-nav.tsx
apps/web/app/play/page.tsx
apps/web/app/page.tsx
apps/web/app/help/page.tsx
```

---

## Acceptance Criteria

- [ ] Skip link is the first focusable element on `/`, `/play`, and `/help`
- [ ] Skip link is not visible until focused
- [ ] Skip link becomes clearly visible with good contrast when focused
- [ ] Activating the skip link moves focus to `#main-content`
- [ ] After skip link activation, first narrative choice is reachable in ≤1 additional Tab press
- [ ] WCAG 2.4.1 Level A satisfied

---

## Testing Requirements

- Manual keyboard test: Tab → skip link visible → Enter → focus jumps to main content → Tab once → first choice button focused
- Add one Playwright test verifying the skip link is present and functional on `/play`
- `pnpm test:e2e` passes

---

## Commit Hygiene

```
feat(a11y): add skip-to-content link for keyboard navigation (WCAG 2.4.1)
```

---

## Final Response Requirements

- Confirm skip link is present on all three pages
- Confirm keyboard navigation from skip link to first choice takes ≤2 Tab presses
- Confirm Playwright test was added and passes
