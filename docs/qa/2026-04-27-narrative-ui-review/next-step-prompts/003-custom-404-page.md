# Prompt 003 — Add Custom 404 Not-Found Page

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/003-missing-custom-404.md](../findings/003-missing-custom-404.md)  
**Task type:** Frontend / UX  
**BMAD owner agent:** UI  

---

## Goal

Create a custom `not-found.tsx` page that matches the Fractureline visual identity and provides navigation back to the game, replacing the bare default Next.js 404.

---

## Context

Any invalid URL (mistyped route, stale bookmark, broken link) currently shows a plain white Next.js 404 page with black text. The contrast with the dark atmospheric game design is jarring. There is no navigation back to the game. The file `apps/web/app/not-found.tsx` does not currently exist.

---

## Scope

- Create `apps/web/app/not-found.tsx` using Next.js App Router's built-in not-found convention
- The page must use the existing MUI theme and SiteNav
- Include a story-world flavoured heading and a link back to `/` and `/play`
- No new dependencies

---

## Non-Goals

- Do not create custom 404 handling for API routes
- Do not add animated effects or particle backgrounds
- Do not change any game logic

---

## Implementation Guidance

Next.js App Router automatically uses `app/not-found.tsx` for all unmatched routes. No configuration needed.

The page should:
1. Import `SiteNav` and `PwaRegister` (same as other pages)
2. Use MUI `Container`, `Box`, `Typography`, `Button`, `Stack`
3. Heading in the world's voice — something like "Signal lost." or "Timeline fracture." (keep to 2–4 words)
4. Sub-heading: "This route doesn't exist in any timeline we know of."
5. Two buttons: "Return to Ayker" (→ `/`) and "Jump to the game" (→ `/play`)
6. Match the dark background (`#08070b`) and warm text palette

Example structure:
```tsx
export default function NotFound() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', color: 'text.primary' }}>
      <PwaRegister />
      <SiteNav />
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography variant="overline" color="secondary">404</Typography>
        <Typography component="h1" variant="h2">Signal lost.</Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary', maxWidth: 560 }}>
          This route doesn't exist in any timeline we know of.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 6 }}>
          <Button component={Link} href="/" variant="contained" color="secondary">Return to Ayker</Button>
          <Button component={Link} href="/play" variant="outlined" color="inherit">Jump to the game</Button>
        </Stack>
      </Container>
    </Box>
  );
}
```

---

## Likely Files

```
apps/web/app/not-found.tsx  (new)
```

---

## Acceptance Criteria

- [ ] `apps/web/app/not-found.tsx` exists
- [ ] Navigating to any unknown route shows the custom page (not the default Next.js 404)
- [ ] Page includes SiteNav
- [ ] Page includes links to both `/` and `/play`
- [ ] Dark background and warm text — matches game aesthetic
- [ ] `pnpm build` passes
- [ ] E2E test in `app.spec.ts` verifies the 404 route shows the custom page

---

## Testing Requirements

- `pnpm build && pnpm start` then visit `http://localhost:3000/does-not-exist`
- Confirm custom page renders with nav and links
- Add one Playwright test: `await page.goto('/not-a-real-route'); await expect(page.getByText(/signal lost/i)).toBeVisible();`

---

## Commit Hygiene

```
feat(ux): add custom 404 not-found page with navigation
```

---

## Final Response Requirements

- Confirm the page renders correctly in production build
- Confirm the E2E test was added and passes
- Show the heading text chosen
