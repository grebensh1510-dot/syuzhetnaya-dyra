// Сборка для предпросмотра в подпапке чужого домена: npm run build:preview
//
// Отдельный скрипт, а не строка в package.json, потому что переменную
// окружения в npm-скрипте на Windows и на Unix задают по-разному.
import { spawnSync } from 'node:child_process';

const env = { ...process.env, PUBLIC_PREVIEW: '1' };
const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', env, shell: true });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run('npx', ['astro', 'build']);
run('node', ['scripts/build-preview.mjs']);
