import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const report = `# Chapters 1-3 BMAD NOM Agent Review\n\n## Scope\n- Reviewed narrative continuity and progression behavior across Chapters 1, 2, and 3.\n- Reviewed guardrail tests for Chapter 2/3 20-30 minute target.\n- Reviewed chapter-pack manifest metadata and continuation behavior.\n\n## Agent Findings\n- Product Manager: target window should remain 20-30 minutes for post-Chapter 1 routes.\n- Producer: keep a single executable review command that outputs a durable report artifact.\n- Architect: every Chapter 3 route must preserve irreversible split plus completion flag writes.\n- Narrative Designer: expand all Chapter 3 routes so runtime aligns with declared estimated minutes.\n- UI Agent: ensure route continuation remains tied to ending key and chapter progression.\n- Backend Agent: persistence keys (chapterThreeComplete, ending route outcomes) remain backward-compatible.\n- QA Agent: enforce hard duration guardrails in tests for Chapter 2 and Chapter 3 packs.\n- Growth Agent: keep player expectation language explicit in README and review docs.\n\n## Result\n- Ready for implementation checks and automated verification.\n`;

writeFileSync(join(process.cwd(), 'docs/reviews/CHAPTERS_1_3_AGENT_REVIEW.md'), report);
console.log('Wrote docs/reviews/CHAPTERS_1_3_AGENT_REVIEW.md');
