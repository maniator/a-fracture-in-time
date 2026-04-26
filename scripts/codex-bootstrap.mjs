import { spawnSync } from 'node:child_process';

const commands = [
  {
    label: 'Install Playwright Chromium binary',
    cmd: 'pnpm',
    args: ['--filter', 'web', 'exec', 'playwright', 'install', 'chromium']
  }
];

for (const step of commands) {
  console.log(`\n==> ${step.label}`);
  const result = spawnSync(step.cmd, step.args, {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: process.env
  });

  if (result.status !== 0) {
    console.error('\nPlaywright bootstrap failed.');
    console.error('If this environment blocks Playwright CDN downloads, run e2e in the official Playwright container:');
    console.error('  pnpm test:e2e:docker');
    process.exit(result.status ?? 1);
  }
}

console.log('\nPlaywright bootstrap complete.');
