# Codex Agent Session Setup

To keep end-to-end testing reliable in Codex sessions, run this bootstrap command **at the start of every session in this repo**:

```bash
pnpm codex:bootstrap
```

## What this does
1. Verifies Playwright browser binaries are available for the `web` workspace.
2. Installs the required Chromium binaries if they are missing.
3. Fails fast with actionable output when the current environment cannot download binaries.

## After bootstrap
Run e2e tests with:

```bash
pnpm test:e2e
```

If the host cannot run local browsers, use the containerized fallback:

```bash
pnpm test:e2e:docker
```
