# Next-Step Prompts Index

This folder contains standalone, copy-paste-ready prompts for each Critical, High, and Medium finding, plus one grouped polish prompt for Low findings.

| Prompt | Finding | Severity | BMAD Owner |
|---|---|---|---|
| [001-expand-chapters-4-5-content.md](001-expand-chapters-4-5-content.md) | Ch4/Ch5 content stubs | Critical | Narrative Designer |
| [002-add-og-social-meta.md](002-add-og-social-meta.md) | No OG/social meta | High | UI |
| [003-custom-404-page.md](003-custom-404-page.md) | No custom 404 | Medium | UI |
| [004-ch4-ch5-duration-tests.md](004-ch4-ch5-duration-tests.md) | No Ch4/Ch5 duration tests | Medium | QA + Engineering |
| [005-briefing-re-access.md](005-briefing-re-access.md) | Briefing no re-access | Medium | UI |
| [006-text-contrast-opacity.md](006-text-contrast-opacity.md) | Text contrast opacity | Medium | UI |
| [007-pwa-png-icons.md](007-pwa-png-icons.md) | PWA no PNG icons | Medium | Engineering |
| [008-ink-files-spoiler-risk.md](008-ink-files-spoiler-risk.md) | Ink files public | Medium | Engineering |
| [009-skip-to-content.md](009-skip-to-content.md) | No skip-to-content | Medium | UI |
| [010-polish-improvements.md](010-polish-improvements.md) | Polish group (Low) | Low | UI |

## Recommended Run Order

1. `004` — Add duration tests first (test-driven; they will fail correctly until `001` is done)
2. `001` — Expand Ch4/Ch5 content (major narrative work; depends on `004` existing)
3. `002` — Add OG meta (small, high-return)
4. `003` — Custom 404 (small, standalone)
5. `009` — Skip-to-content link (quick accessibility win)
6. `006` — Text contrast (theme tweak)
7. `005` — Briefing re-access (UX component work)
8. `007` — PWA PNG icons (asset generation)
9. `008` — Ink spoiler mitigation (decision + optional implementation)
10. `010` — Polish group (small UX improvements)
