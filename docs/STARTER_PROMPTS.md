# Starter Prompts

## New Repo Setup Prompt

```md
Create a production-ready monorepo for Fractureline using pnpm workspaces with:

- Next.js TypeScript app in apps/web
- Shared package for types
- Narrative engine package
- ESLint and Prettier
- Tailwind CSS
- Material UI as the standard component library
- Storybook style guide
- Vitest
- Playwright e2e tests
- GitHub Actions CI
- Vercel deployment config
- PWA install/offline support

Return all files.
```

## First Coding Prompt

```md
Build the Chapter Scene Renderer.

Requirements:
- Show speaker name
- Show current POV and chapter
- Render 2-4 choices
- Apply effects to Zustand state
- Navigate to the next scene through narrative-engine
- Use Material UI components
- Mobile first
- Keyboard accessible
- Include tests
```

## First Narrative Prompt

```md
Write Chapter 1 for Fractureline with 8 scenes.

Requirements:
- Alternate POV between past (Xav Reivax, 874cy Brinkton) and future (Zelda Adlez, 23ac ruins)
- End with a reveal about the family notebook and how it connects the two timelines
- Return a schema-valid scene graph
- Use the approved timeline variables
```

## Follow-Up Agent Prompt Protocol

For large agent tasks, split prompts into numbered parts and state how many parts are coming. Keep the most important blockers at the top so partial context still preserves the highest-risk work.
