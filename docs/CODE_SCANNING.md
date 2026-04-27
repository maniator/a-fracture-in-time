# Code scanning

Fractureline uses a dedicated GitHub Actions workflow at `.github/workflows/codeql.yml` for CodeQL scanning.

## Triggers

CodeQL runs on:

- Pull requests targeting `main`
- Pushes to `main`
- Manual dispatch (`workflow_dispatch`)
- Weekly schedule (Mondays at 08:00 UTC)

## Where results appear

Results are uploaded to GitHub code scanning and appear in:

- **Security** → **Code scanning**
- Pull request checks and annotations

This workflow is intentionally separate from `.github/workflows/ci.yml` so security scanning can be managed independently from build/test CI.
