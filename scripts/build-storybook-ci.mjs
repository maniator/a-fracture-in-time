import { mkdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const env = {
  ...process.env,
  CI: '1',
  STORYBOOK_DISABLE_TELEMETRY: '1',
};

const reportDir = join(process.cwd(), 'apps/web/storybook-static');
mkdirSync(reportDir, { recursive: true });

const run = spawnSync('pnpm', ['--filter', 'web', 'build-storybook'], {
  env,
  encoding: 'utf8',
});

const combinedOutput = `${run.stdout ?? ''}\n${run.stderr ?? ''}`.trim();
writeFileSync(join(reportDir, 'build.log.txt'), `${combinedOutput}\n`);

if (run.status === 0) {
  process.stdout.write(combinedOutput.length ? `${combinedOutput}\n` : 'Storybook build succeeded.\n');
  process.exit(0);
}

process.stderr.write(combinedOutput.length ? `${combinedOutput}\n` : 'Storybook build failed with no output.\n');
process.exit(1);
